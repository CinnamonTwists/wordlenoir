// Ending scripts (roadmap T7, docs/story/bible.md §8). PLACEHOLDERS until content production (step 9) writes the real ones:
// each states the bible's gist on title cards. They play without scene IDs, so they leave no seen marks or save keys behind.
// An ending = the band's case script + four life codas (Pop, Vera, Nora and Tommy, the bottle), unless it's the easter egg.

export const ENDING_NAMES = { A: 'Clean Copy', B: 'Errata', C: 'Margin Notes', D: 'Redacted', bad: 'Last Train Out', egg: 'The Man in the Mirror' };
export const ENDING_ORDER = ['A', 'B', 'C', 'D', 'bad', 'egg'];

const CASE = {
  A: 'Sal waits at the Last Word with two coffees and surrenders to his best friend. The Lexicon is broken.',
  B: 'Sal is caught, but the Final Edition partly ran. Some of the record is gone for good.',
  C: 'The Lexicon is broken, but Sal is gone. Postcards arrive for years, corrected in red pencil.',
  D: 'The city wins and Dash loses: the badge, or the marriage. Somebody else arrests Sal.',
  bad: 'Sal boards the 6:00 with the Final Edition under his arm. The grand jury finds insufficient record.',
  egg: '"I only pour, Dash. You always told me what was true." The detective confesses. Ruth types every word: spelled correctly.'
};
const CODA = {
  pop: { best: 'Dash heard it from Pop himself, and says the truth out loud at the grave.', middle: 'Dash knows half, and writes Sal a letter he never sends.', worst: 'Dash reads Pop\'s letter alone in the snow.' },
  vera: { best: 'They go west together. Dash sleeps on a train, in daylight.', middle: 'Vera goes first. Dash promises to follow.', worst: 'Vera goes alone. One word on a postcard, circled in red.' },
  nora: { best: 'Nora marries Walt. Tommy wants to be a reporter.', middle: 'The wedding happens. Tommy watches everything.', worst: 'Tommy is in reform school, the same one as Sal. Dash visits on Sundays.' },
  bottle: { best: 'Dash pours the last bottle from the Last Word down the sink.', middle: 'He cuts down. The flask stays in the car.', worst: 'He drinks alone, with a stranger behind the bar.' }
};
const THREAD_TITLES = { pop: 'POP', vera: 'VERA', nora: 'NORA AND TOMMY', bottle: 'THE BOTTLE' };

// tiers: from save/progress.js threadTiers(). Returns one script string.
export function endingScript(ending, tiers) {
  const lines = ['@set hearing!', '@mood ' + (ending === 'A' || ending === 'B' ? 'gold' : ending === 'egg' ? 'red' : 'blue'),
    `## ENDING: ${ENDING_NAMES[ending].toUpperCase()} | Placeholder until the endings are written.`, `> ${CASE[ending]}`];
  if (ending !== 'egg') for (const [k, t] of Object.entries(THREAD_TITLES)) lines.push(`## ${t} | ${CODA[k][tiers[k].tier]}`);
  lines.push(ending === 'egg' ? '~stamp THE RECORD IS COMPLETE' : '~gstamp THE RECORD IS COMPLETE');
  return lines.join('\n');
}
