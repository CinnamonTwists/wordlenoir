// Ending names and their menu order (roadmap T7, docs/story/bible.md §8). Kept apart from the scripts (endings/index.js, loaded on demand)
// so Chapter Select can list endings found without loading them.

export const ENDING_NAMES = { A: 'Clean Copy', B: 'Errata', C: 'Margin Notes', D: 'Redacted', bad: 'Last Train Out', egg: 'The Man in the Mirror' };
export const ENDING_ORDER = ['A', 'B', 'C', 'D', 'bad', 'egg'];
