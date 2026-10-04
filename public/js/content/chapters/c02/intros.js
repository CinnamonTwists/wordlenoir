// Chapter 2 "Last Call": opening variants (one per attempt, avoiding ones a failed attempt used) and the briefing.
// Facts: docs/story/bible.md §6. Vars: {caseNo} {date} {pier} {time0}..{time6} {chapterNo} {chapterTitle} {culprit} {alias} {crime} {deadline}
// Both openings carry Sal's confession (his cover, bible r2): "They use my back room, Dash. I let them. I'm sorry."

export const INTROS = [
{ id: 'c02.intro.confession', chapter: 2, title: 'Last Call', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION TWO|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: Session two. You were on your way to a bar, Detective.
DASH: I'm always on my way to a bar. That night I had a reason.
~fade
## {chapterTitle} | {date}
@set bar!
@mood warm
~rain window
> {time0}. The Last Word, one week after the presses. Sal was polishing a glass that was already clean, which is how Sal worries.
SAL: Benny Fusco died in my back booth an hour ago, Dash. Doc Fenn's in there with him now.
SAL: And there's a word I've been not saying for a year.
SAL: Lexicon. They use my back room, Dash. I let them. I'm sorry.
> Twenty years I've known Sal Bruno. It was the first time I ever heard him apologize to anybody but a glass.
` },
{ id: 'c02.intro.almonds', chapter: 2, title: 'Last Call', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION TWO|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: You had found a bar on a printing plate, Detective.
DASH: I'd found my best friend's bar on a printing plate. That's worse.
~fade
## {chapterTitle} | {date}
@set bar!
@mood sick
FENN: Bitter almonds. Somebody put cyanide in Benny Fusco's rye and wrote it on his tab.
DASH: Benny ran money for the Vargas.
FENN: Benny ran money for whoever was paying. Lately that was somebody who keeps very neat books.
> Sal stood behind the bar with both hands flat on the wood, like he was holding it down.
SAL: Dash. They use my back room. The Lexicon. I let them. I'm sorry.
` }
];

// The briefing: who the Bookkeeper is, what's on the Lindqvist, and the deadline. (The rules legend plays only in chapter 1.)
export const TAIL = { id: 'c02.tail', chapter: 2, s: `
~fade
@set bar!
@mood warm
~rain window
SAL: Her name's Della Marsh. Keeps the books for half the bars on the waterfront. Mine too. Brought me soup when I had the flu.
SAL: Every tab that never gets paid, she writes in a little green ledger. I thought she was soft-hearted.
DASH: And the Lexicon calls her?
SAL: The Bookkeeper. And a word, like your typesetter. Five letters.
> Benny had copied her ledger to sell. Della got it back with a glass of rye. At six, the copy sails on the Lindqvist from Pier {pier}, somewhere no subpoena can swim.
@mood blue
DASH: Then I'll run a tab of my own. One suspect at a time.
%%DASH LEXINGTON | ? ? ? ? ?
## {time1} | The first suspect is on the house.
` };
