// Chapter 2, "Last Call" (docs/story/bible.md §6): Della Marsh, the Bookkeeper. Same pack shape as content/random/ (see
// content/registry.js), plus outro beats and the interlude. Syntax: docs/scene-scripts.md. Validate with `npm run check`.
// The step 8 slice (cores.js, endings.js, ...) plus the step 9 additions (cores-more*.js, more.js), merged slot by slot.
import { INTROS, TAIL } from './intros.js';
import { CORES } from './cores.js';
import { CORES_MORE } from './cores-more.js';
import { CORES_MORE2 } from './cores-more2.js';
import { INFORMANTS } from './informants.js';
import { WIN, LOSS } from './endings.js';
import { BEATS, INTERLUDE } from './beats.js';
import { OPENERS, CLOSERS } from './lines.js';
import { INTRO_MORE, INFORMANTS_MORE, WIN_CLIMAX_MORE, LOSS_CLIMAX_MORE, OPENERS_MORE, CLOSERS_MORE } from './more.js';
import { mergePools } from '../merge.js';

export default { id: 'c02', chapter: 2, title: 'Last Call', intros: [...INTROS, INTRO_MORE], tail: TAIL,
  cores: mergePools(CORES, CORES_MORE, CORES_MORE2), informants: [...INFORMANTS, ...INFORMANTS_MORE], openers: mergePools(OPENERS, OPENERS_MORE),
  win: { ...WIN, climax: [...WIN.climax, WIN_CLIMAX_MORE] }, loss: { ...LOSS, climax: [...LOSS.climax, LOSS_CLIMAX_MORE] },
  closers: mergePools(CLOSERS, CLOSERS_MORE), beats: BEATS, interlude: INTERLUDE };
