// Chapter 9 endings. Catch (bible §6): the true boxes are counted and Lola is cuffed mid-performance (lola_caught, set in the fast and slow
// beats). Near miss (guess 5–6): named too late to matter, she bows and is gone; the count stands, contested.

export const WIN = {
climax: [
{ id: 'c09.win.climax.a', chapter: 9, s: `
@set warehouse!
@mood gold
> {time}. Lola had climbed onto the tally table, mid-speech, to the whole warehouse. Something about democracy. She was magnificent.
LOLA: And so, ladies and gentlemen, as the curtain falls...
DASH: {ANSWER}.
~heart
> She stopped. The whole warehouse heard it. She looked down at me, and for the first time all year, she was nobody but herself.
LOLA: Oh, darling. You've got my blocking all wrong. That's my exit line.
%%DASH LEXINGTON | {ANSWER}
?g<5 > Briggs put the cuffs on her while she was still standing on the table. She held out her wrists like a woman accepting flowers.
?g>=5 > She bowed, deeply, to the warehouse. Then she stepped off the back of the table into the crowd of volunteers, and was gone.
~gstamp CASE CLOSED
` },
{ id: 'c09.win.climax.b', chapter: 9, s: `
@set office!
@mood gold
> {time}. She came back to my office one last time and sat in the client chair, the same chair, the same gloves.
LOLA: I wanted to end where we started, Dash. It's good structure.
DASH: {ANSWER}.
~heart
LOLA: There it is. The line I've been waiting all year for you to say.
%%DASH LEXINGTON | {ANSWER}
?g<5 !!@DASH THAT'S YOUR CUE, LOLA.
?g>=5 > She stood, kissed my cheek, and walked out the door before the word had finished echoing. By the time I reached the stairs, she was gone.
~gstamp CASE CLOSED
` },
{ id: 'c09.win.climax.c', chapter: 9, s: `
@set street!
@mood gold
~rain light
> {time}. Outside the warehouse, under the YOUR VOTE COUNTS poster. She was in a plain coat, lighting a cigarette, for once not in costume.
LOLA: I was waiting for you. I always am, in the end.
DASH: {ANSWER}.
~heart
LOLA: Mm. Say it again. Nobody's ever said it like you.
%%DASH LEXINGTON | {ANSWER}
?g<5 > I didn't say it again. I put the cuffs on her instead. She laughed, and the laugh was the only true thing she ever gave me.
?g>=5 > I didn't say it again. She laughed, blew me a kiss, and stepped into a cab that had been waiting with its door open since midnight.
~gstamp CASE CLOSED
` }
],
epi: {
1: [
{ id: 'c09.win.epi.1.a', chapter: 9, s: `
@set warehouse!
@mood warm
> One question. At one in the morning, the board opened Eddie's six milk crates and counted the Fourth Ward's real ballots. Out loud.
> Mrs. Kowalski witnessed every one. She signed the tally sheet in a hand so firm it went through to the table.
KOW: Witnessed.
` },
{ id: 'c09.win.epi.1.b', chapter: 9, s: `
@set precinct!
@mood warm
BRIGGS: One. The board's counting the real boxes. Lola's in a cell asking for a mirror.
DASH: Give her one.
BRIGGS: I gave her one. She's rehearsing her statement. It's very good. I almost believe it myself.
` }
],
2: [
{ id: 'c09.win.epi.2.a', chapter: 9, s: `
@set warehouse!
@mood warm
> Two questions. The real Fourth Ward ballots came out of the milk crates and onto the tally table. Two hundred volunteers watched in silence.
EDDIE: My vote's in there, Detective.
DASH: Then it's going to count, Eddie.
EDDIE: First time in my life.
` },
{ id: 'c09.win.epi.2.b', chapter: 9, s: `
@set precinct!
> {time}. Lola sat in the interview room with her gloves in her lap, and asked for the lights to be lowered a little.
LOLA: It's my best side, darling. You'll want the record to be flattering.
DASH: The record will be accurate, Lola.
LOLA: How dreadfully dull.
` }
],
3: [
{ id: 'c09.win.epi.3.a', chapter: 9, s: `
@set warehouse!
> {time}. The board counted the Fourth Ward twice, with Briggs breathing on the chairman's neck the whole time. The numbers matched. The real ones.
KOW: Witnessed, Mr. Lexington.
DASH: Thank you, Mrs. Kowalski.
KOW: Do not thank. I did nothing. I sat. Sitting is underrated.
` },
{ id: 'c09.win.epi.3.b', chapter: 9, s: `
@set street!
@mood warm
?vera_saved_herself VERA: Three. You got her, Dash. And I read the seals. Put that in the record.
?!vera_saved_herself VERA: Three. You got her, Dash. And I read the seals. Put that in the record.
DASH: I'll put it in capital letters.
VERA: You don't know how to use capitals, Dash. Leave it to me.
` }
],
4: [
{ id: 'c09.win.epi.4.a', chapter: 9, s: `
@set warehouse!
@mood blue
> {time}. They led Lola out past the tally tables while the board counted the real boxes. She bowed to the volunteers as she went.
> A few of them clapped. She'd have been hurt if nobody had.
` },
{ id: 'c09.win.epi.4.b', chapter: 9, s: `
@set bar!
SAL: Four. And the Fourth Ward.
DASH: You were right, Sal.
SAL: I'm always right about the Fourth. Sit down. Tell me how it went. All of it.
` }
],
5: [
{ id: 'c09.win.epi.5.a', chapter: 9, s: `
@set warehouse!
@mood red
> At six, the board certified the count with the swapped boxes still in it. The milk crates sat on the tally table, unopened, while the lawyers shouted about procedure.
> The count stood. Contested. The Reform slate would fight it in court until spring.
DASH: We had the real boxes.
BRIGGS: We had them, Lexington. We didn't have her in time to make them matter.
` },
{ id: 'c09.win.epi.5.b', chapter: 9, s: `
@set street!
@mood sick
> She'd bowed and gone. Somewhere in the city, Lola Vance was taking off her last costume, struck from the Lexicon and running from both sides.
> On the warehouse door, under YOUR VOTE COUNTS, someone had added a final line in lipstick: CONTESTED.
` }
],
6: [
{ id: 'c09.win.epi.6.a', chapter: 9, s: `
@set warehouse!
@mood red
> {time}. I said her word with the chairman's pen already on the certificate. She took her bow. The pen came down.
> The Lexicon's slate took City Hall, on paper, contested, for as long as the courts would take to say otherwise.
` },
{ id: 'c09.win.epi.6.b', chapter: 9, s: `
@set precinct!
@mood blue
BRIGGS: Six. You named her and she walked. And the count stands.
DASH: Contested.
BRIGGS: Contested, Lexington. In this city that's just a fancy word for "next year."
` }
]
}
};

export const LOSS = {
climax: [
{ id: 'c09.loss.climax.a', chapter: 9, s: `
@set warehouse!
@mood red
> 6:00 AM. The board chairman signed the certificate. The swapped boxes were counted. The Lexicon's slate took City Hall.
> On the tally table, Lola Vance took a deep bow to two hundred volunteers who didn't know they'd been an audience.
~tight
** Her headword was {ANSWER}.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` },
{ id: 'c09.loss.climax.b', chapter: 9, s: `
@set street!
@mood blue
> 6:00 AM. The count was certified. Lola came out of the warehouse in a fur, arm in arm with the new Mayor's campaign manager.
~sfx ring
> The phone booth on the corner was ringing. She waved to me as I went to answer it.
WORD: Encore. Again, by demand. {ANSWER}, Lexington. She was wonderful, wasn't she?
~sfx hangup
~stamp COLD CASE
` },
{ id: 'c09.loss.climax.c', chapter: 9, s: `
@set office!
@mood red
> 6:00 AM. I came back to my office. The client chair was empty. On the blotter, a single gardenia, and a note in her handwriting.
> "Thank you for watching, darling. You were my favorite audience. L."
~tight
** It was {ANSWER}. It was always her.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` }
],
epi: {
0: [
{ id: 'c09.loss.epi.0.a', chapter: 9, s: `
@set warehouse!
@mood blue
> My last suspect didn't have a letter of her. Mrs. Kowalski packed up her knitting and went home without a word to me.
` },
{ id: 'c09.loss.epi.0.b', chapter: 9, s: `
@set precinct!
@mood blue
BRIGGS: Five strangers, at the end.
DASH: Five.
BRIGGS: The new administration takes office in January, Lexington. I'd start looking for work. We both should.
` }
],
1: [
{ id: 'c09.loss.epi.1.a', chapter: 9, s: `
@set street!
> {GUESS} had {hitsN} of her. A line from a part she'd played once. The milk crates sat in the loading bay, unopened, behind a wall of lawyers.
` },
{ id: 'c09.loss.epi.1.b', chapter: 9, s: `
@set morgue!
@mood sick
FENN: {HitsN}.
DASH: {HitsN}, Doc.
FENN: Mr. Bloom watched counts for thirty years, Lexington. This was the one that counted. I'll tell him gently.
` }
],
2: [
{ id: 'c09.loss.epi.2.a', chapter: 9, s: `
@set warehouse!
@mood blue
> {GUESS}: {hitsN} of her, at the end. Most of an actress. Enough for an understudy. Not enough for the lead.
> The board chairman shook hands with everybody on his way out. He didn't shake mine.
` },
{ id: 'c09.loss.epi.2.b', chapter: 9, s: `
@set bar!
@mood blue
SAL: {HitsN} in the last one.
DASH: Most of her.
SAL: It came down to the Fourth. It always does. Sit, Dash. I'll get the good bottle anyway.
` }
],
3: [
{ id: 'c09.loss.epi.3.a', chapter: 9, s: `
@set warehouse!
@mood red
> {GUESS}. All of Lola Vance, every letter in the wrong role. The swapped boxes were counted in the right order. Hers.
` },
{ id: 'c09.loss.epi.3.b', chapter: 9, s: `
@set precinct!
BRIGGS: All five, wrong order. She played you, Lexington.
DASH: She played everybody.
BRIGGS: Yes. But you were the one she was looking at.
` }
]
}
};
