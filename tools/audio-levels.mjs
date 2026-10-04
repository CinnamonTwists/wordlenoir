// Offline level meter for the procedural audio (roadmap T9/T10): `npm run levels` (add names to filter, e.g. `npm run levels -- sting music`).
// Renders each cue through the game's real chain (bus → compressor → master, at the default Settings volumes) into an
// OfflineAudioContext in headless Chrome/Edge, and prints its level at the master output. Zero dependencies (Node ≥ 22).
//
// Every render starts 2 s of silence first, so the compressor has settled (Chrome's starts in gain reduction, which reads ~4 dB low).
// Columns: peak (dBFS), loud = the loudest 400 ms RMS window, rms = RMS over the whole measured span, >1k = RMS above 1 kHz,
// lufs = K-weighted loudness over the span (BS.1770 filters, no gating) and mLufs = the loudest 400 ms of it: these follow what the
// ear hears, so a sub-heavy drone and a mid-heavy jazz loop can be compared fairly.
// One-shots are measured alone (music and ambience muted); music and beds over 20–30 s.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findBrowser, freePort } from './browser.mjs';
import { BEDS } from '../public/js/audio/beds.js';
import { LOOPS } from '../public/js/audio/music.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const filters = process.argv.slice(2).filter(a => !a.startsWith('--'));
const JSON_OUT = process.argv.includes('--json');
// --parts <loop>: measure each part (instrument) of one music loop alone, to balance the band
const PARTS = process.argv.includes('--parts') ? process.argv[process.argv.indexOf('--parts') + 1] : null;
if (typeof WebSocket === 'undefined') { console.error('levels needs Node 22 or newer (global WebSocket).'); process.exit(1); }

// ---------- what to measure ----------
// code runs with `AU` once the render reaches `at` (2 s). pre runs right after init. mute: Settings sliders set to 0 for the render.
const ONE = ['music', 'ambience'];
const sfx = (name, code, dur = 5) => ({ group: 'sfx', name, code, dur, mute: ONE });
const ITEMS = [
  sfx('tick', `AU.play('tick')`, 2.5), sfx('key', `AU.play('key')`, 2.5),
  sfx('flip gray', `AU.play('flip', 0)`, 3), sfx('flip yellow', `AU.play('flip', 1)`, 3), sfx('flip green', `AU.play('flip', 2)`, 3.5),
  sfx('thud', `AU.play('thud')`, 3), sfx('boom', `AU.play('boom')`), sfx('heart', `AU.play('heart')`, 3.5), sfx('stamp', `AU.play('stamp')`, 3),
  sfx('sting brass', `AU.play('sting', 'brass')`, 7), sfx('sting minor', `AU.play('sting', 'minor')`, 7), sfx('sting sag', `AU.play('sting', 'sag')`, 7),
  sfx('sting soft', `AU.lastSting = AU.now(); AU.lastSoft = false; AU.play('sting')`, 7), sfx('versus', `AU.play('versus')`, 8),
  sfx('paper', `AU.play('paper')`, 3), sfx('ring', `AU.play('ring')`), sfx('hangup', `AU.play('hangup')`, 4), sfx('whistle', `AU.play('whistle')`),
  sfx('siren', `AU.play('siren')`, 7.5), sfx('thunder', `AU.play('thunder')`, 7), sfx('telegraph', `AU.play('telegraph')`), sfx('foghorn', `AU.play('foghorn')`),
  sfx('card', `AU.play('card')`), sfx('lament', `AU.play('lament')`, 7),
  { group: 'music', name: 'riff', code: `AU.play('riff')`, dur: 9, mute: ['ambience'], pre: `AU.music('off')` },
  ...Object.keys(LOOPS).map(m => ({ group: 'music', name: `music ${m}`, code: `AU.music('${m}'); AU.pump(40)`, dur: 40, from: 6, mute: ['sfx', 'ambience'] })),
  ...Object.keys(BEDS).map(b => ({ group: 'beds', name: `bed ${b}`, code: `AU.amb('${b}'); AU.pump(40)`, dur: 40, from: 5, mute: ['sfx', 'music'], pre: `AU.setRain('none'); AU.rainG.gain.value = 0` })),
  ...['off', 'window', 'light', 'heavy'].flatMap(r => [0, 1].map(i => ({ group: 'amb', name: `rain ${r}${i ? ' indoor' : ''}`, code: `AU.setRain('${r}', ${i})`, dur: 12, from: 6, mute: ['sfx', 'music'] })))
];

// ---------- in the page ----------
async function measure(items) {
  const { AU } = await import('/js/audio/audio.js'), M = await import('/js/audio/music.js');
  const RATE = 48000, out = [];
  // RBJ highpass at 1 kHz, for the >1k column
  const hp = (x, fc = 1000) => {
    const w = 2 * Math.PI * fc / RATE, al = Math.sin(w) / (2 * .7071), cs = Math.cos(w), a0 = 1 + al;
    const b0 = (1 + cs) / 2 / a0, b1 = -(1 + cs) / a0, b2 = b0, a1 = -2 * cs / a0, a2 = (1 - al) / a0;
    const y = new Float32Array(x.length); let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    for (let i = 0; i < x.length; i++) { const v = b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2; x2 = x1; x1 = x[i]; y2 = y1; y1 = v; y[i] = v; }
    return y;
  };
  // BS.1770 K-weighting at 48 kHz: a high shelf, then the RLB highpass
  const biq = (x, b, a) => { const y = new Float32Array(x.length); let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    for (let i = 0; i < x.length; i++) { const v = b[0] * x[i] + b[1] * x1 + b[2] * x2 - a[1] * y1 - a[2] * y2; x2 = x1; x1 = x[i]; y2 = y1; y1 = v; y[i] = v; } return y; };
  const kw = x => biq(biq(x, [1.53512485958697, -2.69169618940638, 1.19839281085285], [1, -1.69065929318241, .73248077421585]), [1, -2, 1], [1, -1.99004745483398, .99007225036621]);
  const db = v => v > 0 ? 20 * Math.log10(v) : -Infinity;
  for (const it of items) {
    const ctx = new OfflineAudioContext(2, Math.ceil(RATE * it.dur), RATE), at = 2;
    AU.quiet = false; AU.on = true; AU.vol = { master: 1, music: 1, sfx: 1, ambience: 1 };
    for (const k of it.mute || []) AU.vol[k] = 0;
    AU.init(ctx);
    if (it.pre) new Function('AU', 'M', it.pre)(AU, M);
    let failed = null;   // a cue that throws must still let the render finish, or startRendering() never resolves
    ctx.suspend(at).then(() => { try { new Function('AU', 'M', it.code)(AU, M); } catch (e) { failed = e; } ctx.resume(); });
    const buf = await ctx.startRendering();
    if (it.after) new Function('AU', 'M', it.after)(AU, M);
    if (failed) throw failed;
    const from = Math.floor(RATE * (it.from ?? at)), L = buf.getChannelData(0).subarray(from), R = buf.getChannelData(1).subarray(from);
    const mono = new Float32Array(L.length); for (let i = 0; i < L.length; i++) mono[i] = (L[i] + R[i]) / 2;
    let peak = 0, sum = 0, loud = 0; const W = RATE * .4;
    for (let i = 0; i < L.length; i++) { peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i])); sum += mono[i] * mono[i]; }
    for (let s = 0; s + W <= mono.length; s += W / 4) { let e = 0; for (let i = s; i < s + W; i++) e += mono[i] * mono[i]; loud = Math.max(loud, Math.sqrt(e / W)); }
    const h = hp(mono); let hs = 0; for (const v of h) hs += v * v;
    const kL = kw(L), kR = kw(R); let ks = 0, km = 0; for (let i = 0; i < kL.length; i++) ks += kL[i] * kL[i] + kR[i] * kR[i];
    for (let s = 0; s + W <= kL.length; s += W / 4) { let e = 0; for (let i = s; i < s + W; i++) e += kL[i] * kL[i] + kR[i] * kR[i]; km = Math.max(km, e / W); }
    const lufs = ms => ms > 0 ? -.691 + 10 * Math.log10(ms) : -Infinity;
    out.push({ group: it.group, name: it.name, peak: db(peak), peakLin: peak, loud: db(loud), rms: db(Math.sqrt(sum / mono.length)), hi: db(Math.sqrt(hs / h.length)), lufs: lufs(ks / kL.length), mlufs: lufs(km) });
  }
  AU.ctx = null;
  return out;
}

// ---------- browser plumbing ----------
const wait = ms => new Promise(r => setTimeout(r, ms));
const browser = findBrowser();
if (!browser) { console.error('No Chrome, Edge or Chromium found. Set CHROME=/path/to/browser.'); process.exit(1); }
const LOOP_PARTS = PARTS ? LOOPS[PARTS].parts.length : 0;
const items = PARTS
  ? [...Array(LOOP_PARTS).keys()].map(i => ({ group: `parts of ${PARTS}`, name: `part ${i}`, dur: 40, from: 6, mute: ['sfx', 'ambience'],
      pre: `M.LOOPS.${PARTS}._all ??= M.LOOPS.${PARTS}.parts; M.LOOPS.${PARTS}.parts = [M.LOOPS.${PARTS}._all[${i}]]`, code: `AU.music('${PARTS}'); AU.pump(40)`,
      after: `M.LOOPS.${PARTS}.parts = M.LOOPS.${PARTS}._all` }))
  : ITEMS.filter(it => !filters.length || filters.some(f => it.name.includes(f) || it.group === f));
const port = await freePort(), base = `http://localhost:${port}`;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'wordlenoir-levels-'));
const server = spawn(process.execPath, [path.join(ROOT, 'tools/dev-server.mjs')], { env: { ...process.env, PORT: port }, stdio: 'ignore' });
const chrome = spawn(browser, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--no-first-run', '--disable-extensions', '--mute-audio', 'about:blank'], { stdio: 'ignore' });
let ws, id = 0, code = 0;
const pending = new Map();
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
try {
  let devPort;
  for (let i = 0; i < 100 && !devPort; i++) { await wait(100); try { devPort = +fs.readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0]; } catch {} }
  if (!devPort) throw new Error('browser did not open a DevTools port');
  for (let i = 0; i < 100; i++) { try { if ((await fetch(base + '/')).ok) break; } catch {} await wait(100); }
  const page = (await (await fetch(`http://127.0.0.1:${devPort}/json/list`)).json()).find(t => t.type === 'page');
  ws = new WebSocket(page.webSocketDebuggerUrl);
  ws.onmessage = e => { const m = JSON.parse(e.data); const p = pending.get(m.id); if (p) { pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); } };
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('could not connect to the browser')); });
  await send('Network.enable'); await send('Network.setBlockedURLs', { urls: ['*cloudflareinsights.com*', '*fonts.googleapis.com*', '*fonts.gstatic.com*', '*/cdn-cgi/*'] });
  await send('Page.navigate', { url: base + '/' });
  for (let i = 0; i < 200; i++) { const r = await send('Runtime.evaluate', { expression: '!!window.NOIR', returnByValue: true }); if (r.result.value) break; await wait(50); }
  const rows = [], f = v => (v === null || !isFinite(v) ? '   -∞' : v.toFixed(1).padStart(6));
  if (!JSON_OUT) console.log('cue'.padEnd(22) + 'peak'.padStart(6) + ' (lin)'.padStart(8) + 'loud'.padStart(7) + 'rms'.padStart(7) + '>1k'.padStart(7) + 'lufs'.padStart(7) + 'mLufs'.padStart(7));
  let g;
  for (const it of items) {   // one render per call, so progress shows as it goes
    const r = await send('Runtime.evaluate', { expression: `(${measure})(${JSON.stringify([it])})`, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(`${it.name}: ${r.exceptionDetails.exception?.description || r.exceptionDetails.text}`);
    const x = r.result.value[0]; rows.push(x);
    if (JSON_OUT) continue;
    if (x.group !== g) { g = x.group; console.log(`-- ${g}`); }
    console.log(x.name.padEnd(22) + f(x.peak) + x.peakLin.toFixed(3).padStart(8) + ' ' + f(x.loud) + ' ' + f(x.rms) + ' ' + f(x.hi) + ' ' + f(x.lufs) + ' ' + f(x.mlufs));
  }
  if (JSON_OUT) console.log(JSON.stringify(rows, null, 1));
} catch (e) { console.error('levels failed: ' + e.message); code = 1; }
finally {
  try { await Promise.race([send('Browser.close'), wait(2000)]); } catch {}
  ws?.close(); chrome.kill(); server.kill(); await wait(300);
  try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch {}
}
process.exit(code);
