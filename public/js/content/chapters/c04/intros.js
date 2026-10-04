// Chapter 4 "Dead Air": opening variants and the briefing. Facts: docs/story/bible.md §6.
// Celeste Avery, the Announcer, strangled her engineer Lou Benning with a microphone cable. She hosts WKRN's all-night dedications from
// Studio B and reads the 6:00 news, whose script carries the phrase that sets a Lexicon courier moving. The station's owner has a court
// order keeping police out of a live studio, so until Dash has her word she's untouchable behind the glass.

export const INTROS = [
{ id: 'c04.intro.dedication', chapter: 4, title: 'Dead Air', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION FOUR|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: Session four. You were at home that night, Detective. For once.
DASH: For once. The radio found me anyway.
~fade
## {chapterTitle} | {date}
@set apartment!
@mood noir
~rain window
> {time0}. Vera was asleep. I wasn't. The radio was on low, WKRN, a woman's voice like warm honey poured over a razor.
CELESTE: And this next one goes out to Detective Dash Lexington. From an old friend. Sleep tight, Detective.
~heart
> The bedroom door opened. Vera stood there in my old army shirt.
VERA: Who's the old friend, Dash?
DASH: I don't know.
> It was the truth. I'd find out later it was the only true thing either of us said that week.
` },
{ id: 'c04.intro.cable', chapter: 4, title: 'Dead Air', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION FOUR|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: The Notary's appointment book sent you to a radio station.
DASH: WKRN, studio B, four in the morning. I didn't wait for four.
~fade
## {chapterTitle} | {date}
@set studio!
@mood sick
> {time0}. The engineer's booth at WKRN. Lou Benning was on the floor with a microphone cable around his neck, and the red light on the wall still said ON AIR.
FENN: Strangled with his own equipment. That's a professional's idea of a joke.
> Behind the glass in Studio B, a woman in a silk blouse lit a cigarette off the last one and leaned into the microphone.
CELESTE: Good evening, night owls. This is Celeste, and the night is young.
` },
{ id: 'c04.intro.glass', chapter: 4, title: 'Dead Air', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION FOUR|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: You could see her the whole night, Detective?
DASH: Through two inches of glass. Close enough to read her lipstick. Too far to read her rights.
~fade
## {chapterTitle} | {date}
@set precinct!
@mood noir
BRIGGS: WKRN's owner is Councilman Haverly. He's got a court order: no police in a live studio. Freedom of the airwaves.
DASH: She strangled her engineer, Captain.
BRIGGS: Allegedly. On the air, she's untouchable. Off the air at six, she's a citizen with a lawyer. You want her, you bring me her word.
> Celeste Avery. Two packs a day and a voice the whole city fell asleep to. Tonight the city was going to wake up to it too.
` }
];

// The briefing: what the dedications are, what the 6:00 news carries, and why Dash can't just walk in.
export const TAIL = { id: 'c04.tail', chapter: 4, s: `
~fade
@set studio!
@mood noir
~rain off
DOOLEY: Celeste Avery. Midnight to six on WKRN. Dedications, love songs, and the six o'clock news on her way out the door.
DASH: And the Lexicon calls her {alias}.
DOOLEY: The dedications are orders, Dash. "This one's for the night nurse at St. Jude's." Next week, the night nurse turns up in the river.
> And the sponsors were targets. Every "brought to you by" was a name with a date on it.
DASH: What's in the six o'clock news?
DOOLEY: A phrase. Somebody out there is waiting to hear it before they move.
@mood blue
%%DASH LEXINGTON | ? ? ? ? ?
## {time1} | The first suspect is on the air.
` };
