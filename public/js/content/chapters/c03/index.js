// Chapter 3, "Dead Man's Sentence" (docs/story/bible.md §6): Augustin "Gus" Fairweather, the Notary. Same pack shape as content/random/
// (see content/registry.js), plus outro beats and the interlude. Syntax: docs/scene-scripts.md. Validate with `npm run check`.
import { INTROS, TAIL } from './intros.js';
import { CORES1 } from './cores1.js';
import { CORES2 } from './cores2.js';
import { CORES3 } from './cores3.js';
import { CORES4 } from './cores4.js';
import { CORES5 } from './cores5.js';
import { INFORMANTS } from './informants.js';
import { WIN, LOSS } from './endings.js';
import { BEATS, INTERLUDE } from './beats.js';
import { OPENERS, CLOSERS } from './lines.js';

export default { id: 'c03', chapter: 3, title: 'Dead Man\'s Sentence', intros: INTROS, tail: TAIL,
  cores: { ...CORES1, ...CORES2, ...CORES3, ...CORES4, ...CORES5 }, informants: INFORMANTS, openers: OPENERS,
  win: WIN, loss: LOSS, closers: CLOSERS, beats: BEATS, interlude: INTERLUDE };
