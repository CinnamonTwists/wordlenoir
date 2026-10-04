// Chapter 5 "Express": opening variants and the briefing. Facts: docs/story/bible.md §6.
// Tomas Brandt, the Courier, threw Pullman porter Amos Greer off the night freight. He leaves on the 6:00 express from Union Station
// carrying half of the Lexicon's Index. Never the same suitcase, never the same name on the ticket.

export const INTROS = [
{ id: 'c05.intro.dollar', chapter: 5, title: 'Express', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION FIVE|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: Session five. Union Station, Detective.
DASH: Union Station. Where this city keeps its goodbyes.
~fade
## {chapterTitle} | {date}
@set station!
@mood noir
> {time0}. Nickel was packing up his shoeshine stand under the big clock. He had a silver dollar in his fist and he wouldn't let go of it.
NICKEL: Man in gloves tipped me a dollar, Mister Lexington. Nobody tips a dollar unless they're leaving forever.
DASH: What did he look like?
NICKEL: Polite. Real polite. He said "thank you" like he was apologizing for something.
` },
{ id: 'c05.intro.porter', chapter: 5, title: 'Express', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION FIVE|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: A dead man on the tracks, the record says.
DASH: A dead man beside the tracks, Ruth. That's the difference between an accident and a message.
~fade
## {chapterTitle} | {date}
@set morgue!
@mood sick
> {time0}. Amos Greer, Pullman porter, twenty-two years on the night freight. Found by a signalman at mile marker nine.
FENN: Thrown, not fallen. Fallen men land on their hands. Mr. Greer landed on his back, looking up at whoever did it.
DASH: Who'd throw a porter off a train?
FENN: Someone who didn't want his bags carried, Lexington. Or didn't want them looked at.
` },
{ id: 'c05.intro.timetable', chapter: 5, title: 'Express', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION FIVE|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: The phrase on the radio was a timetable.
DASH: The six o'clock express. I'd been listening to trains leave that station all my life. I'd never wanted one to stay so badly.
~fade
## {chapterTitle} | {date}
@set precinct!
@mood noir
MAGS: The river line express. Six o'clock. Whoever was listening has a ticket, and he's had a day to pack.
DOOLEY: And a porter named Greer turned up dead by the tracks last night. Off the freight that comes in from the river line.
DASH: Then the man who killed him came in by freight, and he's leaving by express.
> Somewhere in that station, a polite man in gloves was killing time. I meant to kill it first.
` }
];

// The briefing: who the Courier is, what he's carrying, and the deadline.
export const TAIL = { id: 'c05.tail', chapter: 5, s: `
~fade
@set station!
@mood noir
DOOLEY: Tomas Brandt. That's the name on one ticket. There's a Thomas Brand on another, and a T. Brandeis on a third.
DASH: Never the same name.
DOOLEY: Never the same suitcase either. The left-luggage clerk says he's checked in five today, all different.
> Polite, punctual, gloves indoors. The Lexicon calls him {alias}, and he carries what they can't afford to lose.
DASH: What's in the bags?
DOOLEY: Nobody's looked. The ones who look end up beside the tracks.
@mood blue
%%DASH LEXINGTON | ? ? ? ? ?
## {time1} | The first suspect is on the platform.
` };
