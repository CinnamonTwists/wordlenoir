// Chapter 1, "Stop the Presses" (docs/story/bible.md §6): Linus Pell, the Typesetter. Same pack shape as content/random/ (see
// content/registry.js), plus outro beats and the interlude. Syntax: docs/scene-scripts.md. Validate with `npm run check`.
import { INTROS, TAIL } from './intros.js';
import { CORES } from './cores.js';
import { INFORMANTS } from './informants.js';
import { WIN, LOSS } from './endings.js';
import { BEATS, INTERLUDE } from './beats.js';
import { OPENERS, CLOSERS } from './lines.js';

export default { id: 'c01', chapter: 1, title: 'Stop the Presses', intros: INTROS, tail: TAIL, cores: CORES, informants: INFORMANTS, openers: OPENERS,
  win: WIN, loss: LOSS, closers: CLOSERS, beats: BEATS, interlude: INTERLUDE };
