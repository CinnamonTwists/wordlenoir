// CORES['<guess number>-<bucket>'] → list of scenes; one is picked (without repeats) after each wrong guess.
// bucket 0: no hits · 1: 1-2 hits · 2: 3-4 hits · 3: five hits, wrong order
import suspect1 from './suspect-1.js';
import suspect2 from './suspect-2.js';
import suspect3 from './suspect-3.js';
import suspect4 from './suspect-4.js';
import suspect5 from './suspect-5.js';

export const CORES = { ...suspect1, ...suspect2, ...suspect3, ...suspect4, ...suspect5 };
