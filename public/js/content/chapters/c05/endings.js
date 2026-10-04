// Chapter 5 endings. Catch (bible §6): cuffs on the platform, steam everywhere, half the Index in evidence (index_half, set in the fast and
// slow beats). Dooley does the running. Near miss (guess 5–6): Brandt is cuffed, but the trunk with the Index is already in car nine when
// the express pulls out; Nickel runs alongside, then stops.

export const WIN = {
climax: [
{ id: 'c05.win.climax.a', chapter: 5, s: `
@set station!
@mood gold
~sfx whistle
> {time}. Platform Nine, in the steam. A polite man in grey gloves was showing the conductor three tickets and choosing between them.
DASH: Mr. Brandt. Or Brand. Or Brandeis.
BRANDT: Detective. You're early.
DASH: {ANSWER}.
~heart
> He took off his gloves, one finger at a time, folded them, and held out his bare hands. They were very clean.
%%DASH LEXINGTON | {ANSWER}
?g<5 > Dooley came running down the platform with a brown trunk on a baggage cart. He'd pulled it off car nine himself.
?g>=5 > Behind him, the conductor waved his lamp. The express started to roll, with a brown trunk in car nine and nobody to claim it.
~gstamp CASE CLOSED
` },
{ id: 'c05.win.climax.b', chapter: 5, s: `
@set station!
@mood gold
> {time}. He was at Nickel's stand, of all places, having his shoes done one last time. Nickel was taking his time.
NICKEL: Almost done, mister.
DASH: {ANSWER}.
~heart
BRANDT: Ah. And I'd tipped so well.
%%DASH LEXINGTON | {ANSWER}
?g<5 !!@DOOLEY I'VE GOT THE TRUNK, DASH!
?g>=5 > On Platform Nine the whistle went. The express pulled out with his trunk aboard, and Nickel dropped his rag and ran after it.
~gstamp CASE CLOSED
` },
{ id: 'c05.win.climax.c', chapter: 5, s: `
@set street!
@mood gold
~rain light
> {time}. Outside the station, by the cab rank. He'd come out to check the weather for his journey, like a man with nothing to worry about.
DASH: {ANSWER}.
~heart
BRANDT: I beg your pardon?
DASH: You heard me, Mr. Brandt. So did the Lexicon.
%%DASH LEXINGTON | {ANSWER}
?g<5 > He nodded. "Car nine," he said, very politely, "the brown trunk." He wanted it on the record that he'd told us.
?g>=5 > He nodded, and looked at his watch. Through the station doors I could hear the express already moving.
~gstamp CASE CLOSED
` }
],
epi: {
1: [
{ id: 'c05.win.epi.1.a', chapter: 5, s: `
@set precinct!
@mood warm
BRIGGS: One suspect, one trunk, one half of a dictionary nobody's supposed to have. And my sergeant carried it up the platform on his back.
DOOLEY: It was on a cart, Captain.
BRIGGS: In the report it's on your back, Dooley. Reports need heroes.
` },
{ id: 'c05.win.epi.1.b', chapter: 5, s: `
@set station!
@mood warm
NICKEL: That was the first one, mister. The first word.
DASH: It was.
NICKEL: I'm gonna tell everybody I helped.
DASH: You did help, kid. You shined his shoes so well he stopped to look at them.
` }
],
2: [
{ id: 'c05.win.epi.2.a', chapter: 5, s: `
@set station!
@mood warm
> The express left at six without its brown trunk and without its polite passenger. The conductor said it was the first time in twelve years it had left lighter than it came in.
DOOLEY: Two questions, Dash. Briggs is going to have to put me in for the shield.
DASH: You earned it.
DOOLEY: I ran, Dash. You talked. I don't know if that's the same.
` },
{ id: 'c05.win.epi.2.b', chapter: 5, s: `
@set precinct!
BRIGGS: Two. And the FBI wants to know how a city detective beat them to an interstate courier.
DASH: Tell them we're local.
BRIGGS: I told them we're lucky. They believed that faster.
` }
],
3: [
{ id: 'c05.win.epi.3.a', chapter: 5, s: `
@set precinct!
> {time}. Brandt sat in the interview room with his gloves in his lap and a cup of tea he'd asked for very politely.
BRANDT: You'll want to know who I deliver to, Detective. I'm afraid I've never met them. That's rather the point of me.
DASH: You threw a man off a train.
BRANDT: He opened a bag that wasn't his. I'm a courier. I can't abide that.
` },
{ id: 'c05.win.epi.3.b', chapter: 5, s: `
@set station!
@mood warm
> At six o'clock the express pulled out on time, a polite man lighter. Nickel stood on his shine box and waved at the conductor.
NICKEL: Bye, train! You don't get him!
> The conductor waved back. He had no idea what for. He waved anyway.
` }
],
4: [
{ id: 'c05.win.epi.4.a', chapter: 5, s: `
@set station!
@mood blue
> {time}. The trunk sat on a baggage cart in the evidence room, padlocked with three locks. Dooley sat on it all night like a hen.
DOOLEY: Four, Dash. Not bad.
DASH: Not bad, Dooley. You can get off the trunk now.
DOOLEY: The FBI's still here. I'll get off it when they leave.
` },
{ id: 'c05.win.epi.4.b', chapter: 5, s: `
@set bar!
SAL: Four. And gin. You look like a man who's been at a station all night.
DASH: I have.
SAL: Did you get your train?
DASH: I got the man who was getting on it.
SAL: Then you got the better half.
` }
],
5: [
{ id: 'c05.win.epi.5.a', chapter: 5, s: `
@set station!
@mood red
~sfx whistle
> We had Brandt. The express had his trunk. It pulled out of Platform Nine at six on the dot, and Nickel ran alongside car nine as far as the end of the platform.
> Then he stopped. He stood at the edge with his hands on his knees, watching it go north into the dark.
NICKEL: I almost had it, mister.
DASH: So did I, kid.
` },
{ id: 'c05.win.epi.5.b', chapter: 5, s: `
@set precinct!
@mood blue
BRIGGS: We've got the Courier and not the courier's bag.
DASH: The FBI will stop it at the state line.
BRIGGS: The FBI stopped it at the state line twenty minutes ago, Lexington. The trunk was empty. Somebody got on at the first stop and took it off.
` }
],
6: [
{ id: 'c05.win.epi.6.a', chapter: 5, s: `
@set station!
@mood red
> {time}. The cuffs went on him as the conductor shouted "board." The trunk went north. Nickel went after it, and stopped at the end of the platform where everything stops.
NICKEL: Who gets it now, mister?
DASH: Whoever's waiting at the other end.
` },
{ id: 'c05.win.epi.6.b', chapter: 5, s: `
@set street!
@mood blue
DOOLEY: I ran, Dash. I ran the whole length of that platform. I couldn't catch the train.
DASH: Nobody catches the train, Dooley. You caught the man.
DOOLEY: Will it count? For the shield?
DASH: It'll count. Everything counts. That's the trouble with it.
` }
]
}
};

export const LOSS = {
climax: [
{ id: 'c05.loss.climax.a', chapter: 5, s: `
@set station!
@mood red
~sfx whistle
> 6:00 AM. The express pulled out of Platform Nine on time, as it had every morning for twelve years.
> In the window of car nine, a polite man in grey gloves raised his hat to me, the way you would to someone you'd once been introduced to.
~tight
** His headword was {ANSWER}.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` },
{ id: 'c05.loss.climax.b', chapter: 5, s: `
@set station!
@mood blue
> 6:00 AM. Nickel ran alongside the express as far as the end of the platform. Then he stopped. The train didn't.
~sfx ring
> The payphone by the shoeshine stand was ringing. Nickel picked it up and held it out to me without a word.
WORD: Departed. Gone away. Also, a polite word for the dead. Mind the gap, Lexington.
DASH: His name.
WORD: {ANSWER}. Punctual to the last.
~sfx hangup
~stamp COLD CASE
` },
{ id: 'c05.loss.climax.c', chapter: 5, s: `
@set rooftop!
@mood red
> 6:00 AM. From the station roof I watched the express go north, a long line of lit windows getting smaller across the river.
> Somewhere in car nine, half the Index and a man with three names were having breakfast.
~tight
** {ANSWER}. Gone north.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` }
],
epi: {
0: [
{ id: 'c05.loss.epi.0.a', chapter: 5, s: `
@set station!
@mood blue
> My last suspect didn't have a letter of him in it. I'd spent the last question on a stranger, and the train didn't wait for me to apologize.
NICKEL: You'll get the next one, mister.
DASH: There's no next one, kid. That was the express.
` },
{ id: 'c05.loss.epi.0.b', chapter: 5, s: `
@set precinct!
@mood blue
BRIGGS: Your last man had five alibis.
DASH: So I'm told.
BRIGGS: The FBI wants to know if you'd like to transfer to the railroad police. They meant it as an insult.
` }
],
1: [
{ id: 'c05.loss.epi.1.a', chapter: 5, s: `
@set street!
> {GUESS} had {hitsN} of him. A fragment of a ticket. You can't board a train with a fragment, and you can't stop one either.
DOOLEY: I ran, Dash.
DASH: I know you did, Dooley. You ran fine. I talked wrong.
` },
{ id: 'c05.loss.epi.1.b', chapter: 5, s: `
@set morgue!
@mood sick
FENN: {HitsN}, at the end?
DASH: {HitsN}.
FENN: Mr. Greer's widow asked me if you got him. I told her you were still working on it. I'm a doctor, Lexington. I'm allowed to lie a little.
` }
],
2: [
{ id: 'c05.loss.epi.2.a', chapter: 5, s: `
@set station!
@mood blue
> {GUESS}: {hitsN} of him, my last time asking. Most of a man in grey gloves, on his way north with most of a dictionary.
> The big clock said 6:04. The cleaners were mopping Platform Nine like nothing had ever stood on it.
` },
{ id: 'c05.loss.epi.2.b', chapter: 5, s: `
@set bar!
@mood blue
SAL: {HitsN} in the last one.
DASH: Most of him, Sal.
SAL: Have a gin. You always want gin after trains.
DASH: I never wanted gin in my life.
SAL: Then have it anyway.
` }
],
3: [
{ id: 'c05.loss.epi.3.a', chapter: 5, s: `
@set station!
@mood red
> {GUESS}. All his letters, all on the wrong tracks. The express doesn't wait for anybody to rearrange the timetable.
DASH: Five tickets, five names. I had every one of them. I just couldn't punch the right one.
` },
{ id: 'c05.loss.epi.3.b', chapter: 5, s: `
@set precinct!
BRIGGS: All five letters. Wrong order. You'd have done better reading his tickets.
DASH: His tickets were in three names, Captain.
BRIGGS: And none of them was the one you needed. Join the club, Lexington. We meet on Tuesdays.
` }
]
}
};
