// Chapter 2, "Last Call" (docs/story/bible.md §6): Della Marsh, the Bookkeeper. Same pack shape as content/random/ (see
// content/registry.js), plus outro beats and the interlude. Syntax: docs/scene-scripts.md. Validate with `npm run check`.
import { INTROS, TAIL } from './intros.js';
import { CORES } from './cores.js';
import { INFORMANTS } from './informants.js';
import { WIN, LOSS } from './endings.js';
import { BEATS, INTERLUDE } from './beats.js';
import { OPENERS, CLOSERS } from './lines.js';

export default { id: 'c02', chapter: 2, title: 'Last Call', intros: INTROS, tail: TAIL, cores: CORES, informants: INFORMANTS, openers: OPENERS,
  win: WIN, loss: LOSS, closers: CLOSERS, beats: BEATS, interlude: INTERLUDE };
