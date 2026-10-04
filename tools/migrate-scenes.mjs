// ONE-OFF (roadmap F2/T1, already run 2026-10-03): moved the original scene modules in public/js/content/scenes/
// into the Random Case pack public/js/content/random/, giving every scene a stable id and `chapter: 0`.
// The source modules were deleted afterwards, so this no longer runs. Kept as the record of how each id was assigned:
//   intros       rnd.intro.<old id>              tail         rnd.tail
//   cores        rnd.core.<g>-<bucket>.<01..>    informants   rnd.inf.<old id>
//   win/loss     rnd.win.climax.<a..>  rnd.win.epi.<g>.<a..>  rnd.loss.climax.<a..>  rnd.loss.epi.<bucket>.<a..>
// Ids are save-data keys: never renumber or reuse them.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'public/js/content/scenes/index.js'), OUT = path.join(ROOT, 'public/js/content/random');
if (!fs.existsSync(SRC)) { console.error('Already migrated: public/js/content/scenes/ no longer exists.'); process.exit(1); }
const SC = await import(pathToFileURL(SRC));

const L = i => String.fromCharCode(97 + i), N = i => String(i + 1).padStart(2, '0');
const q = s => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const tl = s => { if (/[`\\]|\$\{/.test(s)) throw new Error('script needs escaping: ' + s.slice(0, 60)); return '`' + s + '`'; };
const sc = (id, s, extra = '') => `{ id: ${q(id)}, chapter: 0${extra}, s: ${tl(s)} }`;
const write = (file, text) => { fs.mkdirSync(path.dirname(path.join(OUT, file)), { recursive: true }); fs.writeFileSync(path.join(OUT, file), text.trimStart()); };
const map = new Map();   // id → original text, for the round-trip check
const reg = (id, s) => { if (map.has(id)) throw new Error('duplicate id ' + id); map.set(id, s); return id; };

// ---------- build ----------
write('intros.js', `
// Case openings. One is picked per case (never repeating until all have played).
// Available vars: {caseNo} {date} {victim} {singer} {pier} {caseTitle} {time0}..{time6} {time}
// victimF: the case needs a woman's name for {victim}.

export const INTROS = [
${SC.INTROS.map(x => sc(reg('rnd.intro.' + x.id, x.s), x.s, `, title: ${q(x.title)}${x.id === 'singer' ? ', victimF: true' : ''}`)).join(',\n')}
];
`);
write('tail.js', `
// Plays after every intro: the rules briefing and first title card.

export const TAIL = ${sc(reg('rnd.tail', SC.INTRO_TAIL), SC.INTRO_TAIL)};
`);
write('openers.js', `
// Extra establishing line inserted after the first \`@set place\` of a core scene (without \`!\`).

export const OPENERS = {
${Object.entries(SC.OPENERS).map(([k, v]) => `  ${k}: [${v.map(q).join(', ')}]`).join(',\n')}
};
`);
const BK = 'Bucket 0: no hits · 1: 1-2 hits · 2: 3-4 hits · 3: five hits, wrong order.';
for (let g = 1; g <= 5; g++) write(`cores/suspect-${g}.js`, `
// Scenes after suspect ${g}. Key: '${g}-<bucket>'. ${BK}

export default {
${[0, 1, 2, 3].map(b => `'${g}-${b}': [\n${SC.CORES[`${g}-${b}`].map((s, i) => sc(reg(`rnd.core.${g}-${b}.${N(i)}`, s), s)).join(',\n')}\n]`).join(',\n')}
};
`);
write('cores/index.js', `
// CORES['<guess number>-<bucket>'] → list of scenes; one is picked (without repeats) after each wrong guess.
// bucket 0: no hits · 1: 1-2 hits · 2: 3-4 hits · 3: five hits, wrong order
${[1, 2, 3, 4, 5].map(g => `import suspect${g} from './suspect-${g}.js';`).join('\n')}

export const CORES = { ...suspect1, ...suspect2, ...suspect3, ...suspect4, ...suspect5 };
`);
write('informants.js', `
// Informants: type n (candidate count) | top (letter odds) | pos (letter at position) | dbl (double letters)
export const INFORMANTS = [
${SC.INFORMANTS.map(x => sc(reg('rnd.inf.' + x.id, x.s), x.s, `, type: ${q(x.type)}, who: ${x.who === null ? 'null' : q(x.who)}`)).join(',\n')}
];
`);
const ending = (name, CLIMAX, EPI, keyDoc) => `
// ${name.toUpperCase()}.climax plays first, then a ${name.toUpperCase()}.epi scene keyed by ${keyDoc}.

export const ${name.toUpperCase()} = {
climax: [
${CLIMAX.map((s, i) => sc(reg(`rnd.${name}.climax.${L(i)}`, s), s)).join(',\n')}
],
epi: {
${Object.entries(EPI).map(([k, list]) => `${k}: [\n${list.map((s, i) => sc(reg(`rnd.${name}.epi.${k}.${L(i)}`, s), s)).join(',\n')}\n]`).join(',\n')}
}
};
`;
write('win.js', ending('win', SC.WIN_CLIMAX, SC.WIN_EPI, 'the number of guesses used'));
write('loss.js', ending('loss', SC.LOSS_CLIMAX, SC.LOSS_EPI, "the last guess's bucket"));
write('closers.js', `
// Subtitle for the title card that ends each round, keyed by guesses remaining.

export const CLOSERS = {
${Object.entries(SC.CLOSERS).map(([k, v]) => `${k}: [${v.map(q).join(', ')}]`).join(',\n')}
};
`);
write('index.js', `
// The Random Case pack (chapter 0): the original game's scenes. Same shape as a story chapter pack (see content/registry.js).
// Syntax: docs/scene-scripts.md. Validate with \`npm run check\`.
import { INTROS } from './intros.js';
import { TAIL } from './tail.js';
import { OPENERS } from './openers.js';
import { CORES } from './cores/index.js';
import { INFORMANTS } from './informants.js';
import { WIN } from './win.js';
import { LOSS } from './loss.js';
import { CLOSERS } from './closers.js';

export default { id: 'rnd', chapter: 0, title: 'Random Case', intros: INTROS, tail: TAIL, cores: CORES, informants: INFORMANTS, openers: OPENERS, win: WIN, loss: LOSS, closers: CLOSERS };
`);

// ---------- verify: every scene round-trips byte-for-byte, and the one-liners match ----------
const P = (await import(pathToFileURL(path.join(OUT, 'index.js')) + '?v=' + Date.now())).default;
const got = new Map(), add = x => { if (got.has(x.id)) throw new Error('duplicate id in output ' + x.id); if (x.chapter !== 0) throw new Error('chapter not 0: ' + x.id); got.set(x.id, x.s); };
P.intros.forEach(add); add(P.tail); Object.values(P.cores).flat().forEach(add); P.informants.forEach(add);
for (const e of [P.win, P.loss]) { e.climax.forEach(add); Object.values(e.epi).flat().forEach(add); }
const bad = [...map].filter(([id, s]) => got.get(id) !== s).map(([id]) => id);
if (bad.length || got.size !== map.size) throw new Error(`round-trip mismatch: ${bad.join(', ')} (${got.size} vs ${map.size})`);
if (JSON.stringify(P.openers) !== JSON.stringify(SC.OPENERS) || JSON.stringify(P.closers) !== JSON.stringify(SC.CLOSERS)) throw new Error('openers/closers differ');
if (P.intros.find(x => x.id === 'rnd.intro.singer')?.victimF !== true) throw new Error('singer intro lost victimF');
for (const [a, b] of [[SC.INTROS, P.intros], [SC.INFORMANTS, P.informants]]) a.forEach((x, i) => { for (const k of Object.keys(x)) if (k !== 'id' && k !== 's' && x[k] !== b[i][k]) throw new Error(`${b[i].id}.${k} differs`); });
console.log(`Migrated ${map.size} scenes and ${Object.values(SC.OPENERS).flat().length + Object.values(SC.CLOSERS).flat().length} one-liners into public/js/content/random/. Round-trip verified.`);
