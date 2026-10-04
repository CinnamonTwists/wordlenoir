import { pick, pickUnused } from '../../core/util.js';
import { loadPack, getPack } from '../../content/registry.js';
import { store } from '../../save/store.js';
import { markSeen, recordRandom } from '../../save/progress.js';
import { used, DEBUG } from '../state.js';
import { WORDS } from '../words.js';
import { genCase } from '../case.js';
import { informant } from '../informant.js';

// Random Case (roadmap T5): a random answer, a random intro, and scenes picked by how each guess went, from the rnd pack.
// A mode is what the session runner (game.js) asks for content, saving and results. Story chapters will implement the same
// interface (modes/story.js, roadmap T6). Every *Script() returns { ids, src }: the scene IDs it used and the script to play.

const P = () => getPack('random');
const withOpener = core => core.replace(/^@set (\w+)\s*$/m, (m, name) => { const o = P().openers[name]; return o ? `${m}\n${pick(o)}` : m; });

export const RandomMode = {
  id: 'random',
  label: 'Random Case',
  load: () => loadPack('random'),
  pack: P,
  pickAnswer: () => DEBUG.forceAnswer || pick(WORDS.answers),
  newCase: () => genCase(),                     // { intro, vars }
  introScript: cs => ({ ids: [cs.intro.id, P().tail.id], src: cs.intro.s + '\n' + P().tail.s }),
  roundScript(g, b, ctx) {
    const core = pickUnused(P().cores[`${g}-${b}`], used.core, x => x.id), inf = informant(g, b, ctx);
    return { ids: inf ? [core.id, inf.id] : [core.id], src: withOpener(core.s) + '\n' + (inf ? inf.s : '') + `\n## {nextTime} | ${pick(P().closers[6 - g])}` };
  },
  endScript(won, g, b) {
    const E = won ? P().win : P().loss, climax = pick(E.climax), epi = pick(E.epi[won ? g : b]);
    return { ids: [climax.id, epi.id], src: climax.s + epi.s };
  },
  // saving: the case in progress lives in random.active; seen marks commit immediately
  saved: () => store.get('random.active'),
  onCheckpoint: snap => store.update(d => { d.random.active = snap; }),
  clear: () => store.update(d => { d.random.active = null; }),
  seen: ids => store.update(d => markSeen(d, ids)),
  onComplete: result => store.update(d => recordRandom(d, result)),
  stats: () => store.get('random.stats')
};
