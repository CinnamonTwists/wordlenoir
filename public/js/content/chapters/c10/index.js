// Chapter 10, "Final Edition" (docs/story/bible.md §6): Ellery Thorne, the Proofreader. Same pack shape as content/random/ (see
// content/registry.js), plus outro beats; no interlude (it hands straight to the ending). Validate with `npm run check`.
import { INTROS, TAIL } from './intros.js';
import { CORES1 } from './cores1.js';
import { CORES2 } from './cores2.js';
import { CORES3 } from './cores3.js';
import { CORES4 } from './cores4.js';
import { CORES5 } from './cores5.js';
import { INFORMANTS } from './informants.js';
import { WIN, LOSS } from './endings.js';
import { BEATS } from './beats.js';
import { OPENERS, CLOSERS } from './lines.js';

export default { id: 'c10', chapter: 10, title: 'Final Edition', intros: INTROS, tail: TAIL,
  cores: { ...CORES1, ...CORES2, ...CORES3, ...CORES4, ...CORES5 }, informants: INFORMANTS, openers: OPENERS,
  win: WIN, loss: LOSS, closers: CLOSERS, beats: BEATS };
