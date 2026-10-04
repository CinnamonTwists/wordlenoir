// The Random Case pack (chapter 0): the original game's scenes. Same shape as a story chapter pack (see content/registry.js).
// Syntax: docs/scene-scripts.md. Validate with `npm run check`.
import { INTROS } from './intros.js';
import { TAIL } from './tail.js';
import { OPENERS } from './openers.js';
import { CORES } from './cores/index.js';
import { INFORMANTS } from './informants.js';
import { WIN } from './win.js';
import { LOSS } from './loss.js';
import { CLOSERS } from './closers.js';

export default { id: 'rnd', chapter: 0, title: 'Random Case', intros: INTROS, tail: TAIL, cores: CORES, informants: INFORMANTS, openers: OPENERS, win: WIN, loss: LOSS, closers: CLOSERS };
