// Chapter 10 "Final Edition": opening variants and the briefing. Facts: docs/story/bible.md §6.
// Ellery Thorne, the Proofreader: courteous, colourless, a red pencil and a straight razor; eleven corrections. At 6:00 the Final Edition, a
// counterfeit Gazette extra declaring the city's new record, hits the streets; in the same hour the Editor boards the 6:00 train.
// Every opening: the WORD calls one last time and doesn't hang up. Reads the earlier chapters' story flags.

export const INTROS = [
{ id: 'c10.intro.lastchance', chapter: 10, title: 'Final Edition', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION TEN|In re: the Lexicon affair. Witness: Det. D. Lexington. Final session.
RUTH: Session ten, Detective. The last one.
DASH: The last one, Ruth. Type slowly. I'd like it to take a while.
~fade
## {chapterTitle} | {date}
@set apartment!
@mood red
~rain window
> {time0}. The phone rang. I knew the voice before it spoke. It always called when I was alone. Tonight it didn't hang up.
WORD: Last chance to proofread your life, Lexington.
DASH: Who is this?
WORD: Final edition. The last printing, after which no corrections can be made. Six o'clock. I'll stay on the line as long as you like.
> I put the receiver on the table. I could hear him breathing in it, patient, for an hour. I didn't hang up either.
` },
{ id: 'c10.intro.extra', chapter: 10, title: 'Final Edition', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION TEN|In re: the Lexicon affair. Witness: Det. D. Lexington. Final session.
RUTH: The Final Edition.
DASH: A counterfeit extra of the Gazette, Ruth. The whole city's record, rewritten in one morning's paper. And a man with a razor making sure nobody objected.
~fade
## {chapterTitle} | {date}
@set pressroom!
@mood sick
> {time0}. Vera found me in the composing room with a proof in her hand and her face the color of newsprint.
VERA: It's not ours, Dash. It's set in our type, on our paper. "Final Edition. City Record Corrected." Every deed, every court file, every name.
~sfx ring
> The proof-desk phone. Vera picked it up and held it out to me without a word.
WORD: Last chance to proofread your life, Lexington. I'll hold.
> He held. All night, on and off, the line stayed open, like a door somebody had forgotten to close.
` },
{ id: 'c10.intro.razor', chapter: 10, title: 'Final Edition', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION TEN|In re: the Lexicon affair. Witness: Det. D. Lexington. Final session.
RUTH: The Proofreader.
DASH: Ellery Thorne. Eleven corrections, Ruth. I'd met most of them. I'd buried some.
~fade
## {chapterTitle} | {date}
@set office!
@mood noir
~sfx ring
> {time0}. My office phone. I lifted it and the voice was already talking, as if it had started before I picked up.
WORD: Last chance to proofread your life, Lexington. Don't hang up. I won't.
DASH: Then talk.
WORD: I'm a patient man. I'll just listen to you work. I always have.
> On my desk, a red pencil I didn't own, and a note in a very neat hand: CORRECTIONS: 11. REMAINING: 1.
` }
];

// The briefing: who the Proofreader is, what the Final Edition does, and the two six o'clocks.
export const TAIL = { id: 'c10.tail', chapter: 10, s: `
~fade
@set precinct!
@mood noir
BRIGGS: Ellery Thorne. The Proofreader. Courteous. Colourless. A red pencil and a straight razor. He's corrected eleven people, Lexington.
DASH: The Lexicon calls him {alias}.
BRIGGS: The night editor in October. The radio engineer. The porter. Every witness who ever got in the way. All his.
> At six, the Final Edition hits the streets: a counterfeit Gazette, declaring the city's record corrected. And in the same hour, somebody boards the six o'clock train.
DASH: The Editor.
BRIGGS: Whoever he is. One man to catch, Lexington, and one man to watch leave.
@mood red
%%DASH LEXINGTON | ? ? ? ? ?
## {time1} | The first suspect. The line is still open.
` };
