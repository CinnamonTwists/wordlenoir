// Validates every scene pack and word list without opening a browser: `npm run check` (add `-- --coverage` for slot counts).
// Catches typos that would otherwise only show up mid-scene: unknown locations, moods, speakers, sound effects,
// {vars} that a scene can't see, malformed conditions, and missing scene pools. Also enforces the pack rules (roadmap T1):
// every scene has an id in its pack's scheme and a `chapter` matching its pack, ids are unique, and no text is reused across packs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseScript } from '../public/js/script/parser.js';
import { SETS } from '../public/js/art/sets/index.js';
import { MOOD_MUSIC } from '../public/js/cinema/moods.js';
import { CUES, STINGS } from '../public/js/audio/audio.js';
import { BEDS } from '../public/js/audio/beds.js';
import { CAST } from '../public/js/content/cast.js';
import { parseWordList } from '../public/js/game/words.js';
import { loadPack, packId, scenesOf } from '../public/js/content/registry.js';
import { CHAPTERS, chapterVars } from '../public/js/content/chapters/index.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const COVERAGE = process.argv.includes('--coverage');
const errors = [], warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);

// ---------- vars each kind of scene can reference (see game/case.js and game/informant.js) ----------
const BASE = ['caseNo', 'date', 'victim', 'singer', 'pier', 'caseTitle', 'time', ...Array.from({ length: 7 }, (_, i) => 'time' + i)];
const GUESS = ['guess', 'GUESS', 'g', 'left', 'greens', 'yellows', 'grays', 'hits', 'hitsN', 'greensN', 'yellowsN', 'graysN', 'leftN', 'leftW',
  'HitsN', 'GreensN', 'YellowsN', 'GraysN', 'LeftN', 'LeftW', 'nextTime', 'ANSWER', 'clockH', 'clockM'];
const INFO = ['n', 'nN', 'NWORDS', 'FIT', 'dblPct', 'topL', 'topPct', 'posL', 'posPct', 'posOrd', 'POSORD', 'posArt'];
const SCOPE = { intro: new Set(BASE), round: new Set([...BASE, ...GUESS]), informant: new Set([...BASE, ...GUESS, ...INFO]) };
// story chapters add the chapter's facts to every scope; interludes (the day after, outside any case) get only those
const CHAPTER = Object.keys(chapterVars(1));
const STORY_SCOPE = Object.fromEntries(Object.entries(SCOPE).map(([k, v]) => [k, new Set([...v, ...CHAPTER])]));
STORY_SCOPE.interlude = new Set(CHAPTER);
// endings (content/endings/index.js) see only the ending vars that ui/campaign.js endingVars() supplies (plus story flags in conditions)
STORY_SCOPE.ending = new Set(['popTold', 'popHalf', 'popLetter', 'veraWorst', 'endBad', 'total']);
const SLOT_SCOPE = { intro: 'intro', tail: 'intro', inf: 'informant', inter: 'interlude' };   // everything else (cores, endings, beats) is a round scene

const TILDE = new Set(['fade', 'black', 'shake', 'flash', 'lightning', 'heart', 'rain', 'sfx', 'wait', 'flag', 'story', 'stamp', 'gstamp', 'paper', 'clue', 'legend', 'tight', 'loose', 'push']);
const RAIN = new Set(['off', 'window', 'light', 'heavy']);

// ---------- load packs: Random Case + every chapters/cNN/ that exists ----------
const CH_DIR = path.join(ROOT, 'public/js/content/chapters');
const chapterNos = fs.existsSync(CH_DIR) ? fs.readdirSync(CH_DIR).filter(d => /^c\d\d$/.test(d) && fs.existsSync(path.join(CH_DIR, d, 'index.js'))).map(d => +d.slice(1)) : [];
// the manifest (content/chapters/index.js) must say `written: true` for exactly the chapters that have a pack
for (const c of CHAPTERS) if (!!c.written !== chapterNos.includes(c.n)) err(`chapter ${c.n}`, c.written ? 'marked written but has no pack' : 'has a pack but is not marked written in the manifest');
const PACKS = [];
for (const ch of ['random', ...chapterNos]) {
  try { PACKS.push(await loadPack(ch)); } catch (e) { err(`pack ${packId(ch)}`, `failed to load: ${e.message}`); }
}

// Flags are whatever any script sets with ~flag; conditions may test flags or vars.
const allScripts = [];
const add = (where, src, scope, pack, isScene, slot) => allScripts.push({ where, src, scope, pack, isScene, slot });
const STORY = new Set();   // campaign flags set anywhere with ~story
const FLAGS = new Set();

// ---------- collect and check each pack's structure ----------
const ids = new Map();   // id → pack id
for (const P of PACKS) {
  const pid = packId(P.chapter), at = `pack ${pid}`;
  if (P.id !== pid) err(at, `id "${P.id}" should be "${pid}" for chapter ${P.chapter}`);
  if (!P.title) err(at, 'needs a title');
  const ID_RE = new RegExp(`^${pid}\\.[a-z]+(\\.[a-z0-9-]+)*$`);
  for (const { slot, key, scene: x } of scenesOf(P)) {
    const where = x?.id ? `"${x.id}"` : `${pid} ${slot}${key !== undefined ? `[${key}]` : ''}`;
    if (!x || typeof x !== 'object' || typeof x.s !== 'string' || !x.s.trim()) { err(where, 'needs { id, chapter, s }'); continue; }
    if (!ID_RE.test(x.id || '')) err(where, `id must look like ${pid}.<slot>.<...> (lowercase, dots)`);
    if (ids.has(x.id)) err(where, `duplicate id (also in ${ids.get(x.id)})`); ids.set(x.id, pid);
    if (x.chapter !== P.chapter) err(where, `chapter is ${x.chapter}, but it is in pack ${pid} (chapter ${P.chapter})`);
    if (slot === 'intro' && !x.title) err(where, 'intro needs a title');
    if (slot === 'inf') {
      if (!['n', 'top', 'pos', 'dbl'].includes(x.type)) err(where, `unknown informant type "${x.type}"`);
      if (x.who !== null && !CAST[x.who]) err(where, `who "${x.who}" is not in CAST`);
    }
    add(where, x.s, SLOT_SCOPE[slot] || 'round', pid, true, slot);
  }
  // every pool the game draws from must exist
  if (!P.intros?.length) err(at, 'intros missing or empty');
  if (!P.tail) err(at, 'tail missing');
  for (let g = 1; g <= 5; g++) for (let b = 0; b <= 3; b++) if (!P.cores?.[`${g}-${b}`]?.length) err(at, `cores['${g}-${b}'] missing or empty`);
  if (!P.informants?.length) warnings.push(`${at}: no informants`);
  for (const [end, keys] of [['win', [1, 2, 3, 4, 5, 6]], ['loss', [0, 1, 2, 3]]]) {
    if (!P[end]?.climax?.length) err(at, `${end}.climax missing or empty`);
    for (const k of keys) if (!P[end]?.epi?.[k]?.length) err(at, `${end}.epi[${k}] missing or empty`);
  }
  for (let n = 1; n <= 5; n++) if (!P.closers?.[n]?.length) err(at, `closers[${n}] missing or empty`);
  // story chapters: outro beats by result, and (chapters 1–9) the interlude in three variants (docs/story/bible.md §7)
  if (P.chapter > 0) {
    for (const k of ['fast', 'slow', 'near', 'escaped']) if (!P.beats?.[k]?.length) err(at, `beats.${k} missing or empty`);
    if (P.chapter < 10) for (const k of ['kept', 'late', 'missed']) if (!P.interlude?.[k]?.length) err(at, `interlude.${k} missing or empty`);
  }
  for (const [set, lines] of Object.entries(P.openers || {})) {
    if (!SETS[set]) err(`${at} openers.${set}`, 'not a known set');
    lines.forEach((l, i) => add(`${pid} openers.${set}[${i}]`, l, 'round', pid, false));
  }
}

// ---------- the endings (roadmap T7): ids end.<band> / end.coda.<thread>.<tier> / end.close, every band and coda present ----------
const { ALL_ENDING_SCENES, ENDING_ORDER, THREAD_ORDER, endingScenes } = await import('../public/js/content/endings/index.js');
for (const x of ALL_ENDING_SCENES) {
  const where = x?.id ? `"${x.id}"` : 'an ending scene';
  if (!x || typeof x.s !== 'string' || !x.s.trim()) { err(where, 'needs { id, s }'); continue; }
  if (!/^end\.[a-z]+(\.[a-z]+)*$/.test(x.id)) err(where, 'id must look like end.<band> or end.coda.<thread>.<tier>');
  if (ids.has(x.id)) err(where, `duplicate id (also in ${ids.get(x.id)})`); ids.set(x.id, 'end');
  add(where, x.s, 'ending', 'end', true, 'end');
}
const anyTiers = tier => Object.fromEntries(THREAD_ORDER.map(t => [t, { tier }]));
for (const e of ENDING_ORDER) for (const tier of ['best', 'middle', 'worst']) {
  try { if (endingScenes(e, anyTiers(tier)).some(x => !x?.s)) err(`ending ${e}`, `a scene is missing for tier ${tier}`); } catch (x) { err(`ending ${e}`, x.message); }
}

for (const { src } of allScripts) for (const { line } of parseScript(src)) {
  let m = line.match(/^~flag\s+(\w+)/); if (m) FLAGS.add(m[1]);
  m = line.match(/^~story\s+(\w+)/); if (m) STORY.add(m[1]);
}

// every set names an ambience bed (or null for silence)
for (const [k, v] of Object.entries(SETS)) if (v.ambience !== null && !BEDS[v.ambience]) err(`set ${k}`, `ambience "${v.ambience}" is not a bed in audio/beds.js (use null for silence)`);
for (const [k, v] of Object.entries(CAST)) if (v.sting !== undefined && !STINGS[v.sting]) err(`CAST.${k}`, `unknown sting "${v.sting}"`);

// ---------- text reuse (roadmap T1): no scene is reused across packs; long prose lines shouldn't be either ----------
const norm = s => s.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//')).join('\n').toLowerCase().replace(/\s+/g, ' ');
const seenText = new Map(), seenLine = new Map();
for (const { where, src, pack, isScene } of allScripts) {
  if (!isScene) continue;
  const k = norm(src), prev = seenText.get(k);
  if (prev) (prev.pack === pack ? warnings : errors).push(`${where}: same text as ${prev.where}${prev.pack === pack ? '' : ' (no reuse across packs)'}`);
  else seenText.set(k, { where, pack });
  for (const { line } of parseScript(src)) {
    if (!/^(>|\*\*|!!|[A-Z]+:)/.test(line)) continue;
    const l = norm(line.replace(/^(>|\*\*|!!(@\w+)?|[A-Z]+:)\s*/, ''));
    if (l.length < 40) continue;
    const p = seenLine.get(l);
    if (p && p.pack !== pack) warnings.push(`${where}: reuses a line from ${p.where}: "${line.slice(0, 60)}..."`);
    else if (!p) seenLine.set(l, { where, pack });
  }
}

// ---------- cut-in budget (roadmap T8/T10), per pack: at most one !! per scene, and !! in at most ~20% of scenes ----------
const cutins = {};
for (const { where, src, pack, isScene } of allScripts) {
  if (!isScene) continue;
  const c = cutins[pack] ||= { n: 0, with: 0 }, n = parseScript(src).filter(({ line }) => line.startsWith('!!')).length;
  c.n++; if (n) c.with++;
  if (n > 1) warnings.push(`${where}: ${n} cut-ins (budget is 1 per scene)`);
}
for (const [pack, c] of Object.entries(cutins)) { c.pct = Math.round(100 * c.with / c.n); if (c.pct > 20) warnings.push(`pack ${pack}: cut-ins in ${c.pct}% of scenes (budget is about 20%)`); }

// ---------- coverage (roadmap T8 per-chapter budget) ----------
if (COVERAGE) {
  const T = { intros: 3, tail: 1, core: [5, 6, 6, 3], informants: 12, climax: 3, winEpi: 2, lossEpi: 2, beats: 4, lines: 20 };
  const len = x => x?.length || 0, lines = o => Object.values(o || {}).flat().length;
  const rows = [
    ['openings (intros)', P => len(P.intros), T.intros],
    ['briefing tail', P => P.tail ? 1 : 0, T.tail],
    ...[1, 2, 3, 4, 5].map(g => [`cores ${g}-0/1/2/3`, P => [0, 1, 2, 3].map(b => len(P.cores?.[`${g}-${b}`])), T.core]),
    ['informants', P => len(P.informants), T.informants],
    ['win climax', P => len(P.win?.climax), T.climax],
    ['win epi 1..6', P => [1, 2, 3, 4, 5, 6].map(k => len(P.win?.epi?.[k])), Array(6).fill(T.winEpi)],
    ['loss climax', P => len(P.loss?.climax), T.climax],
    ['loss epi 0..3', P => [0, 1, 2, 3].map(k => len(P.loss?.epi?.[k])), Array(4).fill(T.lossEpi)],
    ['outro beats', P => lines(P.beats), T.beats],
    ['interlude k/l/m', P => (P.chapter === 10 ? 'none' : ['kept', 'late', 'missed'].map(k => (P.interlude?.[k] || []).length)), [1, 1, 1]],   // ch 10 has none (bible §6)
    ['openers (lines)', P => lines(P.openers), T.lines],
    ['closers (lines)', P => lines(P.closers), T.lines],
    ['TOTAL scenes', P => scenesOf(P).length, 146]
  ];
  const fmt = (v, t, story) => { const a = [].concat(v), b = [].concat(t); const s = a.join('/'); return story && a.some((x, i) => x < b[i]) ? s + ' !' : s; };
  const cols = PACKS.map(P => packId(P.chapter)), W = 22;
  console.log(`\nCoverage (target = T8 per-chapter budget; "!" = a story chapter below target; rnd has no target)`);
  console.log('slot'.padEnd(W) + 'target'.padEnd(14) + cols.map(c => c.padEnd(14)).join(''));
  for (const [name, f, t] of rows) console.log(name.padEnd(W) + [].concat(t).join('/').padEnd(14) + PACKS.map(P => fmt(f(P), t, P.chapter > 0).padEnd(14)).join(''));
}

// ---------- validate each line ----------
for (const { where, src, scope, pack, slot } of allScripts) {
  const story = pack !== 'rnd', vars = (story ? STORY_SCOPE : SCOPE)[scope];
  parseScript(src).forEach(({ conds, line }, n) => {
    const at = `${where} line ${n + 1}`;
    for (const c of conds) if (!FLAGS.has(c.key) && !vars.has(c.key) && !(story && STORY.has(c.key))) err(at, `condition on unknown flag/var "${c.key}"`);
    if (slot === 'inter' && /^(!!|%%|\*\*|~clue)/.test(line)) err(at, 'interludes are quiet: no cut-ins, versus, heavy lines or clues');
    if (line.startsWith('?')) err(at, `malformed condition: ${line}`);
    if (/^[A-Z]{2,}\??$/.test(line)) err(at, `"${line}" on its own line looks like an unfinished dialogue line (it would show as narration)`);
    for (const [, k] of line.matchAll(/\{(\w+)\}/g)) if (!vars.has(k)) err(at, `{${k}} is not available in ${scope} scenes`);
    let m;
    if ((m = line.match(/^@set\s+(\w+)/))) { if (!SETS[m[1]]) err(at, `unknown set "${m[1]}"`); }
    else if ((m = line.match(/^@mood\s+(\w+)/))) { if (!(m[1] in MOOD_MUSIC)) err(at, `unknown mood "${m[1]}"`); }
    else if (line.startsWith('@')) err(at, `unknown directive: ${line}`);
    else if ((m = line.match(/^~(\w+)\s*(.*)$/))) {
      const [, cmd, arg] = m;
      if (!TILDE.has(cmd)) err(at, `unknown command ~${cmd}`);
      if (cmd === 'story' && !story) err(at, '~story is for story chapters only (Random Case has no campaign)');
      if (cmd === 'sfx' && !CUES[arg]) err(at, `unknown sound "${arg}"`);
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
console.log('\n' + PACKS.map(P => { const id = packId(P.chapter), c = cutins[id] || { n: 0, with: 0, pct: 0 }; return `${id}: ${c.n} scenes, cut-ins in ${c.with} (${c.pct}%)`; }).join(' · '));
console.log(`Checked ${PACKS.length} pack(s), ${allScripts.length} scripts, ${Object.keys(SETS).length} sets, ${Object.keys(CAST).length} characters, ${words.answers.length} answers, ${words.allowed.length} extra guesses.`);
if (errors.length) { console.error(`${errors.length} error(s).`); process.exit(1); }
console.log('All good.');
