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
  const r = await ev(`(() => { const b = document.querySelector(${JSON.stringify(sel)})?.getBoundingClientRect(); return b && b.width ? { x: b.x + b.width / 2, y: b.y + b.height / 2 } : null; })()`);
  if (!r) throw new Error(`${sel} is not visible`);
  for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x: r.x, y: r.y, button: 'left', clickCount: 1 });
}
const KEYS = { Enter: [13, '\r'], Backspace: [8, ''] };
async function key(k) {
  const [vk, text] = KEYS[k] || [k.toUpperCase().charCodeAt(0), k];
  const code = KEYS[k] ? k : 'Key' + k.toUpperCase();
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code, text, windowsVirtualKeyCode: vk });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk });
}
const type = async word => { for (const ch of word) await key(ch); };

// ---------- game helpers ----------
const READY = `!NOIR.S.busy && !NOIR.S.over && !document.querySelector('#board').hidden && document.querySelector('#modal').hidden`;
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
      rows: f.querySelectorAll('tr').length, won: NOIR.S.won, n: NOIR.S.guesses.length, newBtn: !!f.querySelector('#rNew') }; })()`);
  const bad = [];
  if (r.won !== won) bad.push(`S.won is ${r.won}`);
  if (r.n !== n) bad.push(`${r.n} guesses recorded, expected ${n}`);
  if (r.verdict !== `verdict ${won ? 'win' : 'lose'}`) bad.push(`verdict class "${r.verdict}"`);
  if (r.ans !== answer) bad.push(`report shows answer "${r.ans}", expected "${answer}"`);
  if (r.rows !== n) bad.push(`report table has ${r.rows} rows, expected ${n}`);
  if (!r.newBtn) bad.push('no "Open a new case" button');
  if (bad.length) throw new Error('report: ' + bad.join('; '));
}
// Starts a case (from the title screen or the report) with a forced answer.
async function openCase(answer, forceInf) {
  await ev(`NOIR.forceAnswer = ${JSON.stringify(answer)}; NOIR.forceInf = ${forceInf === undefined ? 'undefined' : forceInf}`);
  await click(await ev(`!document.querySelector('#title').hidden`) ? '#startBtn' : '#rNew');
  await until(`NOIR.S.answer === ${JSON.stringify(answer)} && NOIR.S.guesses.length === 0`, 'a new case');
}
// Reloads the page and waits for the new one to boot (a marker on the old window tells them apart).
async function reload() {
  await ev('window.__oldPage = 1'); await send('Page.reload');
  const t = Date.now();
  while (Date.now() - t < WAIT) { try { if (await ev('!window.__oldPage && !!(window.NOIR && NOIR.pack && NOIR.ANSWERS.length)')) return; } catch { /* mid-navigation */ } await wait(50); }
  throw new Error('timed out waiting for the page to reload');
}
const saved = () => ev(`(NOIR.save.flush(), JSON.parse(localStorage.getItem('wordlenoir.save')))`);
const randomWords = async (n, not) => ev(`(() => { const out = []; while (out.length < ${n}) { const w = NOIR.ANSWERS[Math.floor(Math.random() * NOIR.ANSWERS.length)]; if (w !== ${JSON.stringify(not)} && !out.includes(w)) out.push(w); } return out; })()`);

// ---------- scenarios ----------
const tests = [];
const test = (name, fn) => tests.push({ name, fn });

test('title → first case, invalid word is refused', async () => {
  await until('window.NOIR && NOIR.ANSWERS.length > 0 && NOIR.pack', 'the word lists and the Random Case pack to load');
  if (!await ev(`NOIR.pack.id === 'rnd' && NOIR.scene('rnd.tail') === NOIR.pack.tail`)) throw new Error('scene registry: rnd pack or id lookup is wrong');
  const answer = (await randomWords(1, ''))[0];
  await openCase(answer);
  await until(READY, 'the intro to finish');
  await type('zzzzz'); await key('Enter');
  await until(`document.querySelector('#toast').textContent.trim().length > 0`, 'the "not a word" toast');
  const s = await ev(`({ n: NOIR.S.guesses.length, cur: NOIR.S.cur, busy: NOIR.S.busy })`);
  if (s.n !== 0 || s.cur !== 'zzzzz' || s.busy) throw new Error(`invalid word was not refused cleanly: ${JSON.stringify(s)}`);
  for (let i = 0; i < 5; i++) await key('Backspace');
  if (await ev('NOIR.S.cur') !== '') throw new Error('Backspace did not clear the row');
  // finish this case as a quick first-guess win so the report flow is exercised from the title-screen case too
  await guess(answer); await checkReport(answer, true, 1);
  return answer;
});
test('loss, informant every round', async () => {
  const [answer, ...wrong] = await randomWords(7, '');
  await openCase(answer, true);
  for (const w of wrong.slice(0, 6)) await guess(w);
  await checkReport(answer, false, 6);
  const inf = await ev('NOIR.S.infLog.length');
  if (inf < 1) throw new Error('forceInf was on but no informant appeared');
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
  if (await ev(`document.querySelector('#startBtn').textContent`) !== 'Reopen the case file') throw new Error('title button does not offer to reopen');
  await click('#startBtn');
  await until(`NOIR.S.guesses?.length === 2 && ${READY}`, 'the case to reopen');
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
  await click('#startBtn');
  await until(`NOIR.S.guesses?.length === 1 && ${READY}`, 'the case to reopen after the guess');
  const doc = await saved();
  if (!pending.every(id => doc.seen[id])) throw new Error(`interrupted scene not marked seen: ${pending}`);
  if (doc.random.active.pending.length) throw new Error('pending scenes left in the checkpoint');
  await guess(wrong[1]); await guess(answer); await checkReport(answer, true, 3);
  return `${answer}, interrupted ${pending.join(' + ')}`;
});
test('save: blocked storage warns and still plays', async () => {
  const { identifier } = await send('Page.addScriptToEvaluateOnNewDocument', { source: `Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('denied', 'SecurityError'); } });` });
  try {
    await reload();
    if (await ev('NOIR.save.status.reason') !== 'blocked') throw new Error('store did not notice storage is blocked');
    const answer = (await randomWords(1, ''))[0];
    await ev(`NOIR.forceAnswer = ${JSON.stringify(answer)}`);
    await click('#startBtn');
    await until(`/isn't keeping/.test(document.querySelector('#toast').textContent)`, 'the "progress won\'t be kept" warning');
    await until(`NOIR.S.answer === ${JSON.stringify(answer)}`, 'a new case');
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
