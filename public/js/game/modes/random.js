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
// interface (modes/story.js, roadmap T6). Every *Script() returns { segments: [{ id, src }] }: the scenes in play order, each marked
// seen (and skippable next time) on its own (roadmap T3).

const P = () => getPack('random');
const withOpener = core => core.replace(/^@set (\w+)\s*$/m, (m, name) => { const o = P().openers[name]; return o ? `${m}\n${pick(o)}` : m; });

export const RandomMode = {
  id: 'random',
  label: 'Random Case',
  load: () => loadPack('random'),
  pack: P,
  pickAnswer: () => DEBUG.forceAnswer || pick(WORDS.answers),
  newCase: () => genCase(),                     // { intro, vars }
  introScript: cs => ({ segments: [{ id: cs.intro.id, src: cs.intro.s }, { id: P().tail.id, src: P().tail.s }] }),
  // the closing title card ("## 2:14 AM | Four left...") belongs to the round, so it rides with the round's last segment
  roundScript(g, b, ctx) {
    const core = pickUnused(P().cores[`${g}-${b}`], used.core, x => x.id), inf = informant(g, b, ctx);
    const closer = `\n## {nextTime} | ${pick(P().closers[6 - g])}`;
    return { segments: inf ? [{ id: core.id, src: withOpener(core.s) }, { id: inf.id, src: inf.s + closer }] : [{ id: core.id, src: withOpener(core.s) + closer }] };
  },
  endScript(won, g, b) {
    const E = won ? P().win : P().loss, climax = pick(E.climax), epi = pick(E.epi[won ? g : b]);
    return { segments: [{ id: climax.id, src: climax.s }, { id: epi.id, src: epi.s }] };
  },
  // saving: the case in progress lives in random.active; seen marks commit immediately
  saved: () => store.get('random.active'),
  onCheckpoint: snap => store.update(d => { d.random.active = snap; }),
  clear: () => store.update(d => { d.random.active = null; }),
  seen: ids => store.update(d => markSeen(d, ids)),
  isSeen: id => !!store.get('seen')[id],
  onComplete: result => store.update(d => recordRandom(d, result)),
  stats: () => store.get('random.stats')
};
