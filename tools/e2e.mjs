// End-to-end smoke test: `npm run e2e`. Zero dependencies (Node ≥ 22 for the global WebSocket).
// Starts the dev server, drives a local headless Chrome/Edge over the DevTools Protocol, and plays real cases at #speed400
// with real clicks and key presses. Fails on a wrong report, any console error or exception, or any unfilled {var} (NOIR.MISSING).
//
//   npm run e2e                      invalid word, a loss (informant every round), a win on guess 3
//   npm run e2e -- --cases 20        ...plus 20 random cases for scene coverage
//   npm run e2e -- --headed          watch it (add --speed 4 to slow it down)
//   CHROME=/path/to/browser npm run e2e    use a specific Chromium-based browser
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf('--' + k); return i < 0 ? d : args[i + 1] === undefined || args[i + 1].startsWith('--') ? true : args[i + 1]; };
const CASES = +opt('cases', 0), SPEED = +opt('speed', 400), HEADED = !!opt('headed', false);
const WAIT = 60000 * Math.max(1, 400 / SPEED);   // per-step timeout, scaled for slow runs

if (typeof WebSocket === 'undefined') { console.error('e2e needs Node 22 or newer (global WebSocket).'); process.exit(1); }

// ---------- browser ----------
function findBrowser() {
  if (process.env.CHROME) return process.env.CHROME;
  const pf = [process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)'], process.env.LOCALAPPDATA].filter(Boolean);
  const list = process.platform === 'win32'
    ? pf.flatMap(p => [path.join(p, 'Google/Chrome/Application/chrome.exe'), path.join(p, 'Microsoft/Edge/Application/msedge.exe')])
    : process.platform === 'darwin'
      ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Chromium.app/Contents/MacOS/Chromium']
      : ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser', 'microsoft-edge'].flatMap(b => ['/usr/bin/', '/usr/local/bin/', '/snap/bin/'].map(d => d + b));
  return list.find(p => fs.existsSync(p));
}
const freePort = () => new Promise(r => { const s = net.createServer().listen(0, () => { const { port } = s.address(); s.close(() => r(port)); }); });
const wait = ms => new Promise(r => setTimeout(r, ms));

// ---------- DevTools Protocol ----------
let ws, msgId = 0;
const pending = new Map(), problems = [];
const send = (method, params = {}) => new Promise((res, rej) => { const id = ++msgId; pending.set(id, { res, rej, method }); ws.send(JSON.stringify({ id, method, params })); });
const IGNORE = /\/cdn-cgi\/|cloudflareinsights|fonts\.(googleapis|gstatic)\.com/;   // analytics beacon (404s locally) and blocked fonts
function onMessage(e) {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(`${p.method}: ${m.error.message}`)) : p.res(m.result); return; }
  const P = m.params;
  if (m.method === 'Runtime.exceptionThrown') problems.push('exception: ' + (P.exceptionDetails.exception?.description || P.exceptionDetails.text));
  if (m.method === 'Runtime.consoleAPICalled' && (P.type === 'error' || P.type === 'assert')) problems.push(`console.${P.type}: ` + P.args.map(a => a.value ?? a.description).join(' '));
  if (m.method === 'Log.entryAdded' && P.entry.level === 'error' && !IGNORE.test(P.entry.url || '')) problems.push('log: ' + P.entry.text + (P.entry.url ? ' ' + P.entry.url : ''));
}
async function ev(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(`page threw evaluating ${expr}: ${r.exceptionDetails.exception?.description || r.exceptionDetails.text}`);
  return r.result.value;
}
async function until(expr, what, ms = WAIT) {
  const t = Date.now();
  while (Date.now() - t < ms) { if (await ev(expr)) return; if (problems.length) throw new Error(`page error while waiting for ${what}`); await wait(50); }
  throw new Error(`timed out waiting for ${what}`);
}
async function click(sel) {
  const r = await ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); el?.scrollIntoView({ block: 'center', inline: 'center' });
    const b = el?.getBoundingClientRect(); return b && b.width ? { x: b.x + b.width / 2, y: b.y + b.height / 2 } : null; })()`);
  if (!r) throw new Error(`${sel} is not visible`);
  for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x: r.x, y: r.y, button: 'left', clickCount: 1 });
}
const KEYS = { Enter: [13, '\r'], Backspace: [8, ''], Escape: [27, ''] };
async function key(k) {
  const [vk, text] = KEYS[k] || [k.toUpperCase().charCodeAt(0), k];
  const code = KEYS[k] ? k : 'Key' + k.toUpperCase();
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code, text, windowsVirtualKeyCode: vk });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk });
}
const type = async word => { for (const ch of word) await key(ch); };

// ---------- game helpers ----------
const READY = `!NOIR.S.busy && !NOIR.S.over && !document.querySelector('#board').hidden && document.querySelector('#modal').hidden && document.querySelector('#pause').hidden`;
const REPORT = `NOIR.S.over && !document.querySelector('#report').hidden`;
async function guess(word) {
  const n = await ev('NOIR.S.guesses.length');
  await until(READY, `the board to accept guess ${n + 1}`);
  await type(word); await key('Enter');
  await until(`NOIR.S.guesses.length === ${n + 1}`, `guess ${n + 1} (${word}) to register`);
}
async function checkReport(answer, won, n) {
  await until(REPORT, 'the case report');
  const r = await ev(`(() => { const f = document.querySelector('#reportFile');
    return { verdict: f.querySelector('.verdict')?.className, ans: [...f.querySelectorAll('.ans .tile')].map(t => t.textContent).join(''),
      rows: f.querySelectorAll('tr').length, won: NOIR.S.won, n: NOIR.S.guesses.length, newBtn: !!f.querySelector('#rNew'),
      menuBtn: !!f.querySelector('#rMenu'), record: !!f.querySelector('.record .dist') }; })()`);
  const bad = [];
  if (r.won !== won) bad.push(`S.won is ${r.won}`);
  if (r.n !== n) bad.push(`${r.n} guesses recorded, expected ${n}`);
  if (r.verdict !== `verdict ${won ? 'win' : 'lose'}`) bad.push(`verdict class "${r.verdict}"`);
  if (r.ans !== answer) bad.push(`report shows answer "${r.ans}", expected "${answer}"`);
  if (r.rows !== n) bad.push(`report table has ${r.rows} rows, expected ${n}`);
  if (!r.newBtn) bad.push('no "Open a new case" button');
  if (!r.menuBtn) bad.push('no "Main menu" button');
  if (!r.record) bad.push('no Random Case record on the report');
  if (bad.length) throw new Error('report: ' + bad.join('; '));
}
// Goes from wherever we are (title, menu, report) to the main menu.
async function toMenu() {
  if (await ev(`NOIR.screen === 'title'`)) { await click('#startBtn'); await until(`NOIR.screen === 'menu'`, 'the main menu'); return; }
  if (await ev(`!document.querySelector('#report').hidden`)) await click('#rMenu');
  else if (await ev(`NOIR.screen === 'game'`)) { await key('Escape'); await until(`!document.querySelector('#pause').hidden`, 'the in-game menu'); await click('#pMenu'); }
  await until(`NOIR.screen === 'menu'`, 'the main menu');
}
// Starts a Random Case with a forced answer: from the report's "Open a new case", or through the menu (dropping an open case).
async function openCase(answer, forceInf) {
  await ev(`NOIR.forceAnswer = ${JSON.stringify(answer)}; NOIR.forceInf = ${forceInf === undefined ? 'undefined' : forceInf}`);
  if (await ev(`NOIR.screen === 'game' && !document.querySelector('#report').hidden`)) await click('#rNew');
  else {
    await toMenu(); await click('#mRandom');
    await wait(50); if (await ev(`!document.querySelector('#modal').hidden`)) await click('#mDrop');
  }
  await until(`NOIR.S.answer === ${JSON.stringify(answer)} && NOIR.S.guesses.length === 0`, 'a new case');
}
// Reloads the page and waits for the new one to boot (a marker on the old window tells them apart).
async function reload() {
  await ev('window.__oldPage = 1'); await send('Page.reload');
  const t = Date.now();
  while (Date.now() - t < WAIT) { try { if (await ev('!window.__oldPage && !!(window.NOIR && NOIR.pack && NOIR.ANSWERS.length)')) return; } catch { /* mid-navigation */ } await wait(50); }
  throw new Error('timed out waiting for the page to reload');
}
// After a reload: title → menu → Continue.
async function continueCase(n) {
  await toMenu();
  if (await ev(`document.querySelector('#mContinue').disabled`)) throw new Error('Continue is disabled with a case open');
  const sub = await ev(`document.querySelector('#mContinueSub').textContent`);
  if (!sub.includes(`suspect ${n + 1} of 6`)) throw new Error(`Continue label is "${sub}"`);
  await click('#mContinue');
  await until(`NOIR.S.guesses?.length === ${n} && ${READY}`, 'the case to reopen');
}
const saved = () => ev(`(NOIR.save.flush(), JSON.parse(localStorage.getItem('wordlenoir.save')))`);
const randomWords = async (n, not) => ev(`(() => { const out = []; while (out.length < ${n}) { const w = NOIR.ANSWERS[Math.floor(Math.random() * NOIR.ANSWERS.length)]; if (w !== ${JSON.stringify(not)} && !out.includes(w)) out.push(w); } return out; })()`);
const toastSays = re => until(`${re}.test(document.querySelector('#toast').textContent)`, `a toast matching ${re}`);

// ---------- scenarios ----------
const tests = [];
const test = (name, fn) => tests.push({ name, fn });

test('title → menu → first case, invalid word is refused', async () => {
  await until('window.NOIR && NOIR.ANSWERS.length > 0 && NOIR.pack', 'the word lists and the Random Case pack to load');
  if (!await ev(`NOIR.pack.id === 'rnd' && NOIR.scene('rnd.tail') === NOIR.pack.tail`)) throw new Error('scene registry: rnd pack or id lookup is wrong');
  await toMenu();
  const m = await ev(`({ cont: document.querySelector('#mContinue').disabled, locked: [...document.querySelectorAll('.item.locked')].length })`);
  if (!m.cont || m.locked !== 3) throw new Error(`fresh menu looks wrong: ${JSON.stringify(m)}`);
  await click('#mNewGame'); await toastSays('/typist/');   // story entries are stamped, not broken
  const answer = (await randomWords(1, ''))[0];
  await openCase(answer);
  await until(READY, 'the intro to finish');
  await type('zzzzz'); await key('Enter');
  await toastSays('/No record of ZZZZZ/');
  const s = await ev(`({ n: NOIR.S.guesses.length, cur: NOIR.S.cur, busy: NOIR.S.busy })`);
  if (s.n !== 0 || s.cur !== 'zzzzz' || s.busy) throw new Error(`invalid word was not refused cleanly: ${JSON.stringify(s)}`);
  for (let i = 0; i < 5; i++) await key('Backspace');
  if (await ev('NOIR.S.cur') !== '') throw new Error('Backspace did not clear the row');
  await guess(answer); await checkReport(answer, true, 1);
  const st = (await saved()).random.stats;
  if (st.played !== 1 || st.won !== 1 || st.dist[0] !== 1 || st.streak !== 1) throw new Error(`stats not recorded: ${JSON.stringify(st)}`);
  return answer;
});
test('loss, informant every round', async () => {
  const [answer, ...wrong] = await randomWords(7, '');
  await openCase(answer, true);
  for (const w of wrong.slice(0, 6)) await guess(w);
  await checkReport(answer, false, 6);
  const inf = await ev('NOIR.S.infLog.length');
  if (inf < 1) throw new Error('forceInf was on but no informant appeared');
  if ((await saved()).random.stats.streak !== 0) throw new Error('a loss did not end the streak');
  return `${answer}, ${inf} informants`;
});
test('win on guess 3', async () => {
  const [answer, ...wrong] = await randomWords(3, '');
  await openCase(answer, false);
  await guess(wrong[0]); await guess(wrong[1]); await guess(answer);
  await checkReport(answer, true, 3);
  return answer;
});
test('save: reopen a case after reload', async () => {
  const [answer, ...wrong] = await randomWords(3, '');
  await openCase(answer, false);
  await guess(wrong[0]); await guess(wrong[1]);
  await until(READY, 'the round to finish');
  const doc = await saved();
  if (doc?.random?.active?.guesses?.length !== 2) throw new Error(`checkpoint missing: ${JSON.stringify(doc?.random?.active)}`);
  if (JSON.stringify(doc).includes(`"${answer}"`)) throw new Error('the answer is readable in the save');
  if (!doc.seen['rnd.tail'] || Object.keys(doc.seen).filter(k => k.startsWith('rnd.core.')).length < 2) throw new Error(`seen marks missing: ${Object.keys(doc.seen)}`);
  await reload();
  await continueCase(2);
  const s = await ev(`({ painted: document.querySelectorAll('#grid .tile[data-s]').length, memo: document.querySelector('#memo').textContent, answer: NOIR.S.answer, counts: NOIR.S.counts.length })`);
  if (s.painted !== 10 || !/reopened/i.test(s.memo) || s.answer !== answer || s.counts !== 2) throw new Error(`bad resume: ${JSON.stringify(s)}`);
  await guess(answer); await checkReport(answer, true, 3);
  if ((await saved()).random.active !== null) throw new Error('finished case was not cleared from the save');
  return answer;
});
test('save: reload mid-scene keeps the guess', async () => {
  const [answer, ...wrong] = await randomWords(3, '');
  await openCase(answer, false);
  await until(READY, 'the intro to finish');
  await ev('NOIR.speed = 2');   // slow the next scene down so the reload lands inside it (the reload restores #speed400)
  await type(wrong[0]); await key('Enter');
  await until('NOIR.S.pending?.length > 0', 'the round scene to start', 20000);
  const pending = await ev('[...NOIR.S.pending]');
  await reload();
  await continueCase(1);
  const doc = await saved();
  if (!pending.every(id => doc.seen[id])) throw new Error(`interrupted scene not marked seen: ${pending}`);
  if (doc.random.active.pending.length) throw new Error('pending scenes left in the checkpoint');
  await guess(wrong[1]); await guess(answer); await checkReport(answer, true, 3);
  return `${answer}, interrupted ${pending.join(' + ')}`;
});
test('menu: in-game menu → main menu → Continue, then dropping the case counts as a loss', async () => {
  const [answer, other, ...wrong] = await randomWords(4, '');
  await openCase(answer, false);
  await guess(wrong[0]);
  await until(READY, 'the round to finish');
  await key('Escape');
  await until(`!document.querySelector('#pause').hidden`, 'Esc to open the in-game menu');
  if (!/SUSPECT 2 OF 6/.test(await ev(`document.querySelector('#pauseMeta').textContent`))) throw new Error('in-game menu shows the wrong suspect');
  await key('Escape');
  await until(`document.querySelector('#pause').hidden && NOIR.screen === 'game'`, 'Esc to close the in-game menu');
  await click('#menuBtn'); await click('#pMenu');
  await until(`NOIR.screen === 'menu'`, 'the main menu');
  await continueCase(1);
  const before = (await saved()).random.stats;
  await toMenu(); await click('#mRandom');
  await until(`!document.querySelector('#modal').hidden`, 'the "drop this case?" dialog');
  await ev(`NOIR.forceAnswer = ${JSON.stringify(other)}`);
  await click('#mDrop');
  await toastSays(`/It was ${answer.toUpperCase()}/`);
  await until(`NOIR.S.answer === ${JSON.stringify(other)}`, 'a new case after dropping');
  const after = (await saved()).random.stats;
  if (after.played !== before.played + 1 || after.won !== before.won || after.streak !== 0) throw new Error(`drop not recorded as a loss: ${JSON.stringify({ before, after })}`);
  await guess(other); await checkReport(other, true, 1);
  return `${answer} dropped`;
});
test('settings: saved, applied, and survive a reload; hard mode enforces clues', async () => {
  await toMenu(); await click('#mSettings');
  await until(`NOIR.screen === 'settings'`, 'the settings screen');
  await click('#set-highContrast'); await click('#set-hardMode');
  await click('input[name="set-textSpeed"][value="fast"]');
  await click('input[name="set-motion"][value="reduced"]');
  await key('Escape');
  await until(`NOIR.screen === 'menu'`, 'Esc to leave settings');
  await reload();
  const p = await ev(`({ s: NOIR.save.get('settings'), hc: document.documentElement.hasAttribute('data-hc'), motion: document.documentElement.dataset.motion,
    green: getComputedStyle(document.documentElement).getPropertyValue('--t-green').trim() })`);
  if (!p.s.highContrast || !p.s.hardMode || p.s.textSpeed !== 'fast' || p.s.motion !== 'reduced' || !p.hc || p.motion !== 'reduced' || p.green !== '#85c0f9')
    throw new Error(`settings not kept or applied: ${JSON.stringify(p)}`);
  // hard mode: find a first guess sharing a letter with the answer, then break the rule
  const answer = (await randomWords(1, ''))[0];
  const first = await ev(`NOIR.ANSWERS.find(w => w !== ${JSON.stringify(answer)} && NOIR.score(w, ${JSON.stringify(answer)}).some(v => v === 2))`);
  const bad = await ev(`(() => { const fb = NOIR.score(${JSON.stringify(first)}, ${JSON.stringify(answer)}); const i = fb.indexOf(2);
    return NOIR.ANSWERS.find(w => w[i] !== ${JSON.stringify(first)}[i] && w !== ${JSON.stringify(answer)}); })()`);
  await openCase(answer, false);
  if (!await ev(`NOIR.S.hard && /HARD/.test(document.querySelector('#caseNo').textContent)`)) throw new Error('hard mode not on for the new case');
  await guess(first);
  await until(READY, 'the round to finish');
  await type(bad); await key('Enter');
  await toastSays('/Hard case/');
  if (await ev('NOIR.S.guesses.length') !== 1) throw new Error('hard mode let a rule-breaking guess through');
  for (let i = 0; i < 5; i++) await key('Backspace');
  await guess(answer); await checkReport(answer, true, 2);
  return `${answer} (${first} then refused ${bad})`;
});
test('settings: clear all data', async () => {
  await toMenu(); await click('#mSettings');
  await click('#clearBtn');
  if (!await ev(`document.querySelector('#clearGo').disabled`)) throw new Error('"Burn them" enabled before typing DESTROY');
  await click('#clearType'); await type('destroy');
  if (await ev(`document.querySelector('#clearGo').disabled`)) throw new Error('"Burn them" still disabled after typing DESTROY');
  await ev('window.__oldPage = 1');
  await click('#clearGo');
  const t = Date.now();
  while (Date.now() - t < WAIT) { try { if (await ev('!window.__oldPage && !!(window.NOIR && NOIR.ANSWERS.length)')) break; } catch { /* reloading */ } await wait(50); }
  const doc = await saved();
  if (doc.random.stats.played !== 0 || Object.keys(doc.seen).length || doc.settings.highContrast || doc.settings.hardMode) throw new Error(`data not cleared: ${JSON.stringify(doc).slice(0, 200)}`);
  if (await ev(`document.documentElement.hasAttribute('data-hc')`)) throw new Error('high contrast still applied after clearing');
});
test('skip: a seen segment can be skipped without losing its flags; the unseen one after it still plays', async () => {
  await toMenu();   // AU and the cinema need the title gesture first
  const r = await ev(`(async () => {
    NOIR.speed = 10;
    const shown = [], done = [], ctx = { vars: {}, flags: {} };
    const mo = new MutationObserver(() => { const t = document.querySelector('#narr').textContent; if (t && !shown.includes(t)) shown.push(t); });
    mo.observe(document.querySelector('#narr'), { childList: true, subtree: true, characterData: true });
    const segs = [{ id: 'A', src: '@set office!\\n> Alpha line one, long enough to take a while to type out.\\n~flag fa\\n> Alpha line two.' },
                  { id: 'B', src: '> Bravo line.\\n~flag fb' }];
    const p = NOIR.play(segs, ctx, { skip: id => id === 'A' ? 'ask' : false, onSegment: id => done.push(id) });
    while (document.querySelector('#skipBtn').hidden) await new Promise(r => setTimeout(r, 20));
    await new Promise(r => setTimeout(r, 120));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await p; mo.disconnect(); NOIR.speed = 400;
    // auto: never shown at all
    const shown2 = [], ctx2 = { vars: {}, flags: {} };
    const mo2 = new MutationObserver(() => { const t = document.querySelector('#narr').textContent; if (t && !shown2.includes(t)) shown2.push(t); });
    mo2.observe(document.querySelector('#narr'), { childList: true, subtree: true, characterData: true });
    await NOIR.play([{ id: 'C', src: '> Charlie line.\\n~flag fc' }, { id: 'D', src: '> Delta line.' }], ctx2, { skip: id => id === 'C' ? 'auto' : false });
    mo2.disconnect();
    return { shown, done, flags: ctx.flags, shown2, flags2: ctx2.flags, quiet: NOIR.save && !document.querySelector('#skipBtn').hidden };
  })()`);
  if (!r.flags.fa || !r.flags.fb) throw new Error(`flags lost by skipping: ${JSON.stringify(r.flags)}`);
  if (r.done.join() !== 'A,B') throw new Error(`segments reported ${r.done}`);
  if (r.shown.some(t => t.startsWith('Alpha line two'))) throw new Error('the rest of the skipped segment was shown');
  if (!r.shown.some(t => t.startsWith('Bravo'))) throw new Error('the unseen segment after a skip did not play');
  if (r.shown2.some(t => t.startsWith('Charlie')) || !r.shown2.some(t => t.startsWith('Delta')) || !r.flags2.fc) throw new Error(`auto-skip wrong: ${JSON.stringify(r)}`);
  if (r.quiet) throw new Error('skip button left showing');
});
test('skip: Never hides the button, Always skips the seen briefing, Replay brings it back', async () => {
  const watch = `(() => { window.__sk = { btn: false, legend: false };
    window.__skObs?.disconnect(); window.__skObs = new MutationObserver(() => { if (!document.querySelector('#skipBtn').hidden) __sk.btn = true; if (document.querySelector('#fx .legend')) __sk.legend = true; });
    __skObs.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['hidden'] }); })()`;
  const intro = async (setting, answer) => {
    await ev(`NOIR.setting('skipSeen', '${setting}')`); await ev(watch);
    await openCase(answer, false); await until(READY, 'the intro to finish');
    return ev('({ ...window.__sk })');
  };
  const [a, b, c, d] = await randomWords(4, '');
  const never = await intro('never', a);   // plays the briefing in full (and marks it seen if it wasn't)
  if (never.btn || !never.legend) throw new Error(`Never: ${JSON.stringify(never)}`);
  if (!(await saved()).seen['rnd.tail']) throw new Error('the briefing was not marked seen');
  const always = await intro('always', b);
  if (always.btn || always.legend) throw new Error(`Always should skip the seen briefing silently: ${JSON.stringify(always)}`);
  await toMenu(); await click('#mSettings'); await click('#replayBtn'); await toastSays('/briefing will play/'); await key('Escape');
  if ((await saved()).seen['rnd.tail']) throw new Error('Replay the briefing did not un-see it');
  const replay = await intro('always', c);
  if (!replay.legend) throw new Error('after Replay the briefing, the legend should play even on Always');
  // Ask: the button shows for the (now seen again) briefing, and Esc skips it
  await ev(`NOIR.setting('skipSeen', 'ask')`); await ev(watch);
  await ev('NOIR.speed = 20'); await ev(`NOIR.forceAnswer = ${JSON.stringify(d)}`);
  await toMenu(); await click('#mRandom'); await wait(50); if (await ev(`!document.querySelector('#modal').hidden`)) await click('#mDrop');
  await until(`!document.querySelector('#skipBtn').hidden`, 'the SKIP button on a seen scene', 30000);
  await key('Escape');
  await until(READY, 'the board after skipping', 15000);
  await ev('NOIR.speed = 400');
  return 'never / always / replay / ask';
});
test('notes: an informant clue goes into the case notes and survives a reload', async () => {
  const [answer, ...wrong] = await randomWords(3, '');
  await openCase(answer, true);
  await guess(wrong[0]);
  await until(READY, 'the round to finish');
  const n = await ev(`({ btn: document.querySelector('#notesBtn').textContent, dis: document.querySelector('#notesBtn').disabled, notes: NOIR.S.notes.length, inf: NOIR.S.infLog.length })`);
  if (n.inf && (n.notes !== n.inf || n.dis || !/Notes \(1\)/.test(n.btn))) throw new Error(`notes not recorded: ${JSON.stringify(n)}`);
  if (!n.inf) return `${answer}: no informant was possible this round (skipped)`;
  await click('#notesBtn');
  await until(`!document.querySelector('#notes').hidden && document.querySelectorAll('#notesList li .big').length === 1`, 'the case notes');
  await key('Escape');
  await until(`document.querySelector('#notes').hidden`, 'Esc to close the notes');
  await reload(); await continueCase(1);
  if (await ev('NOIR.S.notes.length') !== 1) throw new Error('notes lost across a reload');
  await guess(answer); await checkReport(answer, true, 2);
  return answer;
});
test('transfer: export → clear all data → import gives back the same files; a bad paste is refused', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wordlenoir-dl-'));
  try {
    await send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: dir });
    const before = await saved();
    await toMenu(); await click('#mSettings');
    await click('#exportBtn');
    let file; for (let i = 0; i < 100 && !file; i++) { await wait(50); file = fs.readdirSync(dir).find(f => /^wordle-noir-save-\d{4}-\d\d-\d\d\.json$/.test(f)); }
    if (!file) throw new Error('no export file downloaded');
    const exported = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    const strip = d => { const { app, exportedAt, updatedAt, ...rest } = d; return JSON.stringify(rest); };
    if (exported.app !== 'wordle-noir' || strip(exported) !== strip(before)) throw new Error('export does not match the save');
    // bad paste
    await click('#pasteBtn'); await click('#pasteText');
    await send('Input.insertText', { text: '{"app":"wordle-noir", nope' });
    await click('#pasteGo');
    await until(`!document.querySelector('#importErr').hidden && /JSON/.test(document.querySelector('#importErr').textContent)`, 'the bad paste to be refused');
    // clear everything
    await click('#clearBtn'); await click('#clearType'); await type('destroy');
    await ev('window.__oldPage = 1'); await click('#clearGo');
    for (let i = 0; i < 200; i++) { try { if (await ev('!window.__oldPage && !!(window.NOIR && NOIR.ANSWERS.length)')) break; } catch { /* reloading */ } await wait(50); }
    if ((await saved()).random.stats.played !== 0) throw new Error('clear did not clear');
    // import the file
    await toMenu(); await click('#mSettings');
    const { result } = await send('Runtime.evaluate', { expression: `document.querySelector('#importFile')` });
    await send('DOM.setFileInputFiles', { files: [path.join(dir, file)], objectId: result.objectId });
    await until(`!document.querySelector('#importConfirm').hidden`, 'the import summary');
    const summary = await ev(`document.querySelector('#importSummary').textContent`);
    if (!summary.includes(`${before.random.stats.played} random case`)) throw new Error(`import summary: ${summary}`);
    await ev('window.__oldPage = 1'); await click('#importGo');
    for (let i = 0; i < 200; i++) { try { if (await ev('!window.__oldPage && !!(window.NOIR && NOIR.ANSWERS.length)')) break; } catch { /* reloading */ } await wait(50); }
    const after = await saved();
    if (strip(after) !== strip(before)) throw new Error('imported save differs from the exported one');
    return `${file}: ${summary.split('.')[0]}`;
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
test('save: blocked storage warns and still plays', async () => {
  const { identifier } = await send('Page.addScriptToEvaluateOnNewDocument', { source: `Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('denied', 'SecurityError'); } });` });
  try {
    await reload();
    if (await ev('NOIR.save.status.reason') !== 'blocked') throw new Error('store did not notice storage is blocked');
    await toMenu();
    await toastSays(`/isn't keeping/`);
    const answer = (await randomWords(1, ''))[0];
    await openCase(answer);
    await guess(answer); await checkReport(answer, true, 1);
  } finally {
    await send('Page.removeScriptToEvaluateOnNewDocument', { identifier }); await reload();
  }
});
for (let i = 1; i <= CASES; i++) test(`random case ${i}/${CASES}`, async () => {
  const [answer, ...wrong] = await randomWords(7, '');
  const winAt = Math.floor(Math.random() * 7) + 1;   // 7 = never: a loss
  await openCase(answer, Math.random() < .5 ? undefined : Math.random() < .5);
  for (let g = 1; g <= 6; g++) { if (g === winAt) { await guess(answer); break; } await guess(wrong[g - 1]); }
  await checkReport(answer, winAt <= 6, Math.min(winAt, 6));
  return `${answer} ${winAt <= 6 ? 'won on ' + winAt : 'lost'}`;
});

// ---------- run ----------
const browser = findBrowser();
if (!browser) { console.error('No Chrome, Edge or Chromium found. Set CHROME=/path/to/browser.'); process.exit(1); }
const port = await freePort(), base = `http://localhost:${port}`;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'wordlenoir-e2e-'));
const server = spawn(process.execPath, [path.join(ROOT, 'tools/dev-server.mjs')], { env: { ...process.env, PORT: port }, stdio: 'ignore' });
const chrome = spawn(browser, [...(HEADED ? [] : ['--headless=new']), '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--window-size=1280,800',
  '--no-first-run', '--no-default-browser-check', '--disable-extensions', '--mute-audio', 'about:blank'], { stdio: 'ignore' });
let failed = 0;
const t0 = Date.now();
try {
  let devPort;
  for (let i = 0; i < 100 && !devPort; i++) { await wait(100); try { devPort = +fs.readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0]; } catch {} }
  if (!devPort) throw new Error('browser did not open a DevTools port');
  for (let i = 0; i < 100; i++) { try { if ((await fetch(base + '/')).ok) break; } catch {} await wait(100); }
  const page = (await (await fetch(`http://127.0.0.1:${devPort}/json/list`)).json()).find(t => t.type === 'page');
  ws = new WebSocket(page.webSocketDebuggerUrl); ws.onmessage = onMessage;
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('could not connect to the browser')); });
  await send('Runtime.enable'); await send('Log.enable'); await send('Network.enable'); await send('Page.enable');
  await send('Network.setBlockedURLs', { urls: ['*cloudflareinsights.com*', '*fonts.googleapis.com*', '*fonts.gstatic.com*', '*/cdn-cgi/*'] });
  await send('Page.navigate', { url: `${base}/#speed${SPEED}` });
  console.log(`e2e: ${path.basename(browser)} · ${base}/#speed${SPEED}`);
  for (const { name, fn } of tests) {
    const t = Date.now();
    try {
      const note = await fn();
      if (problems.length) throw new Error(problems.splice(0).join('\n       '));
      const missing = await ev('[...NOIR.MISSING]');
      if (missing.length) throw new Error(`scripts referenced unfilled {vars}: ${missing.join(', ')}`);
      console.log(`  ok    ${name}${note ? ` (${note})` : ''}  ${((Date.now() - t) / 1000).toFixed(1)}s`);
    } catch (e) {
      failed++;
      console.log(`  FAIL  ${name}\n       ${e.message}${problems.length ? '\n       ' + problems.splice(0).join('\n       ') : ''}`);
      break;   // later scenarios depend on the page being in a sane state
    }
  }
  if (problems.length) { failed++; console.log('  FAIL  ' + problems.join('\n        ')); }
} catch (e) {
  failed++; console.log('  FAIL  ' + e.message);
} finally {
  try { await Promise.race([send('Browser.close'), wait(2000)]); } catch {}
  ws?.close(); chrome.kill(); server.kill();
  await wait(300);
  try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch {}
}
console.log(failed ? `\ne2e failed (${((Date.now() - t0) / 1000).toFixed(1)}s).` : `\ne2e passed: ${tests.length} scenarios in ${((Date.now() - t0) / 1000).toFixed(1)}s.`);
process.exit(failed ? 1 : 0);
