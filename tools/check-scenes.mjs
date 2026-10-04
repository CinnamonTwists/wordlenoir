// Validates every scene script and word list without opening a browser: `npm run check`.
// Catches typos that would otherwise only show up mid-scene: unknown locations, moods, speakers,
// sound effects, {vars} that a scene can't see, malformed conditions, and missing scene pools.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseScript } from '../public/js/script/parser.js';
import { SETS } from '../public/js/art/sets/index.js';
import { MOOD_MUSIC } from '../public/js/cinema/moods.js';
import { AU } from '../public/js/audio/audio.js';
import { CAST } from '../public/js/content/cast.js';
import { parseWordList } from '../public/js/game/words.js';
import * as SC from '../public/js/content/scenes/index.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [], warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);

// ---------- vars each kind of scene can reference (see game/case.js and game/informant.js) ----------
const BASE = ['caseNo', 'date', 'victim', 'singer', 'pier', 'caseTitle', 'time', ...Array.from({ length: 7 }, (_, i) => 'time' + i)];
const GUESS = ['guess', 'GUESS', 'g', 'left', 'greens', 'yellows', 'grays', 'hits', 'hitsN', 'greensN', 'yellowsN', 'graysN', 'leftN', 'leftW',
  'HitsN', 'GreensN', 'YellowsN', 'GraysN', 'LeftN', 'LeftW', 'nextTime', 'ANSWER', 'clockH', 'clockM'];
const INFO = ['n', 'nN', 'NWORDS', 'FIT', 'dblPct', 'topL', 'topPct', 'posL', 'posPct', 'posOrd', 'POSORD', 'posArt'];
const SCOPE = { intro: new Set(BASE), round: new Set([...BASE, ...GUESS]), informant: new Set([...BASE, ...GUESS, ...INFO]) };

const TILDE = new Set(['fade', 'black', 'shake', 'flash', 'lightning', 'heart', 'rain', 'sfx', 'wait', 'flag', 'stamp', 'gstamp', 'paper', 'clue', 'legend', 'tight', 'loose', 'push']);
const RAIN = new Set(['off', 'window', 'light', 'heavy']);

// Flags are whatever any script sets with ~flag; conditions may test flags or vars.
const allScripts = [];
const add = (where, src, scope) => allScripts.push({ where, src, scope });
const FLAGS = new Set();

// ---------- collect ----------
const ids = new Set();
SC.INTROS.forEach((x, i) => {
  if (!x.id || !x.title || typeof x.s !== 'string') err(`INTROS[${i}]`, 'needs id, title and s');
  if (ids.has(x.id)) err(`INTROS[${i}]`, `duplicate id "${x.id}"`); ids.add(x.id);
  add(`intro "${x.id}"`, x.s, 'intro');
});
add('INTRO_TAIL', SC.INTRO_TAIL, 'intro');
for (const [set, lines] of Object.entries(SC.OPENERS)) {
  if (!SETS[set]) err(`OPENERS.${set}`, 'not a known set');
  lines.forEach((l, i) => add(`OPENERS.${set}[${i}]`, l, 'round'));
}
for (let g = 1; g <= 5; g++) for (let b = 0; b <= 3; b++) {
  const k = `${g}-${b}`, list = SC.CORES[k];
  if (!Array.isArray(list) || !list.length) { err(`CORES['${k}']`, 'missing or empty'); continue; }
  list.forEach((s, i) => add(`CORES['${k}'][${i}]`, s, 'round'));
}
const infIds = new Set();
SC.INFORMANTS.forEach((x, i) => {
  if (infIds.has(x.id)) err(`INFORMANTS[${i}]`, `duplicate id "${x.id}"`); infIds.add(x.id);
  if (!['n', 'top', 'pos', 'dbl'].includes(x.type)) err(`informant "${x.id}"`, `unknown type "${x.type}"`);
  if (x.who !== null && !CAST[x.who]) err(`informant "${x.id}"`, `who "${x.who}" is not in CAST`);
  add(`informant "${x.id}"`, x.s, 'informant');
});
SC.WIN_CLIMAX.forEach((s, i) => add(`WIN_CLIMAX[${i}]`, s, 'round'));
SC.LOSS_CLIMAX.forEach((s, i) => add(`LOSS_CLIMAX[${i}]`, s, 'round'));
for (let g = 1; g <= 6; g++) (SC.WIN_EPI[g] || err(`WIN_EPI[${g}]`, 'missing') || []).forEach((s, i) => add(`WIN_EPI[${g}][${i}]`, s, 'round'));
for (let b = 0; b <= 3; b++) (SC.LOSS_EPI[b] || err(`LOSS_EPI[${b}]`, 'missing') || []).forEach((s, i) => add(`LOSS_EPI[${b}][${i}]`, s, 'round'));
for (let n = 1; n <= 5; n++) if (!SC.CLOSERS[n]?.length) err(`CLOSERS[${n}]`, 'missing or empty');

for (const { src } of allScripts) for (const { line } of parseScript(src)) { const m = line.match(/^~flag\s+(\w+)/); if (m) FLAGS.add(m[1]); }

// ---------- validate each line ----------
for (const { where, src, scope } of allScripts) {
  const vars = SCOPE[scope];
  parseScript(src).forEach(({ conds, line }, n) => {
    const at = `${where} line ${n + 1}`;
    for (const c of conds) if (!FLAGS.has(c.key) && !vars.has(c.key)) err(at, `condition on unknown flag/var "${c.key}"`);
    if (line.startsWith('?')) err(at, `malformed condition: ${line}`);
    for (const [, k] of line.matchAll(/\{(\w+)\}/g)) if (!vars.has(k)) err(at, `{${k}} is not available in ${scope} scenes`);
    let m;
    if ((m = line.match(/^@set\s+(\w+)/))) { if (!SETS[m[1]]) err(at, `unknown set "${m[1]}"`); }
    else if ((m = line.match(/^@mood\s+(\w+)/))) { if (!(m[1] in MOOD_MUSIC)) err(at, `unknown mood "${m[1]}"`); }
    else if (line.startsWith('@')) err(at, `unknown directive: ${line}`);
    else if ((m = line.match(/^~(\w+)\s*(.*)$/))) {
      const [, cmd, arg] = m;
      if (!TILDE.has(cmd)) err(at, `unknown command ~${cmd}`);
      if (cmd === 'sfx' && typeof AU[arg] !== 'function') err(at, `unknown sound "${arg}"`);
      if (cmd === 'rain' && !RAIN.has(arg)) err(at, `rain must be one of ${[...RAIN].join('|')}`);
      if (cmd === 'paper' && !arg.includes('|')) err(at, '~paper needs LABEL|TEXT');
    }
    else if ((m = line.match(/^!!@(\w+)\s/))) { if (!CAST[m[1]]) err(at, `cut-in speaker "${m[1]}" is not in CAST`); }
    else if ((m = line.match(/^([A-Z]+):/))) { if (!CAST[m[1]]) err(at, `speaker "${m[1]}" is not in CAST`); }
  });
}

// ---------- words ----------
const words = {};
for (const f of ['answers', 'allowed']) {
  const text = fs.readFileSync(path.join(ROOT, 'public/data/words', f + '.txt'), 'utf8');
  const list = parseWordList(text);
  const raw = text.split('\n').map(s => s.trim()).filter(s => s && !s.startsWith('#'));
  if (raw.length !== list.length) err(`${f}.txt`, `${raw.length - list.length} line(s) are not five lowercase letters`);
  const dupes = list.length - new Set(list).size;
  if (dupes) warnings.push(`${f}.txt: ${dupes} duplicate word(s)`);
  words[f] = list;
}
const overlap = words.allowed.filter(w => words.answers.includes(w)).length;
if (overlap) warnings.push(`allowed.txt repeats ${overlap} word(s) already in answers.txt (harmless)`);

// ---------- report ----------
warnings.forEach(w => console.warn('warn ', w));
errors.forEach(e => console.error('error', e));
console.log(`\nChecked ${allScripts.length} scripts, ${Object.keys(SETS).length} sets, ${Object.keys(CAST).length} characters, ${words.answers.length} answers, ${words.allowed.length} extra guesses.`);
if (errors.length) { console.error(`${errors.length} error(s).`); process.exit(1); }
console.log('All good.');
