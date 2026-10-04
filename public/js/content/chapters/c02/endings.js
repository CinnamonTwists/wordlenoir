// Chapter 2 endings. A win plays a climax, then an epilogue keyed by guesses used (1–6); a loss plays a climax, then an epilogue
// keyed by the last guess's bucket (0–3). The outro beat (beats.js) follows either one.
// Catch (bible §6): the ledger copy is pulled off the gangway. A near miss (guess 5–6) still lets the Lindqvist sail with it (bible amendment).

export const WIN = {
climax: [
{ id: 'c02.win.climax.a', chapter: 2, s: `
@set gangway!
@mood gold
~sfx foghorn
> {time}. Pier {pier}. Della Marsh was halfway up the Lindqvist's gangway with a carpetbag in one hand and a pencil behind each ear.
DASH: Mrs. Marsh.
DELLA: Detective. You never did eat, did you?
DASH: {ANSWER}.
~heart
> She stopped. She took the pencils from behind her ears, one and then the other, and laid them on the rail like she was closing the books.
%%DASH LEXINGTON | {ANSWER}
?g<5 > Dooley carried the sea chest down off the deck. Inside, wrapped in oilcloth: the ledger copy, every page of it.
?g>=5 > Behind her the crew were already taking in the lines. The sea chest was below decks, and the Lindqvist wasn't waiting for anybody.
~gstamp CASE CLOSED
` },
{ id: 'c02.win.climax.b', chapter: 2, s: `
@set docks!
@mood gold
> {time}. She was sitting on a bollard at the foot of the pier, knitting, like a woman waiting for a bus.
DELLA: I knew you'd come, sugar. You've got that look. Like a man who's added it all up.
DASH: {ANSWER}.
~heart
DELLA: Well. That's me written off.
%%DASH LEXINGTON | {ANSWER}
?g<5 !!@DASH ACCOUNT CLOSED.
?g<5 > The copy was in her knitting bag, under the yarn. She'd never let it out of her sight.
?g>=5 > The copy wasn't in her bag. It was already aboard, in a sea chest marked OFFICE SUPPLIES, and the Lindqvist was casting off.
~gstamp CASE CLOSED
` }
],
epi: {
1: [
{ id: 'c02.win.epi.1.a', chapter: 2, s: `
@set bar!
@mood warm
SAL: First try. You walked in, said her name, and she folded like a napkin.
DASH: She never saw it coming.
SAL: Nobody does, with you. You know what I like about you, Dash? You never look surprised.
> He poured one for me and one for himself, which he never does.
` },
{ id: 'c02.win.epi.1.b', chapter: 2, s: `
@set precinct!
@mood warm
BRIGGS: One suspect. One. Internal Affairs is going to think you're psychic.
DASH: Tell them I'm a good listener.
BRIGGS: Tell them yourself. I'm going home. Some of us have a wife who still waits up.
> He held up one finger at the door, for luck or for counting. With Briggs you never know.
` }
],
2: [
{ id: 'c02.win.epi.2.a', chapter: 2, s: `
@set docks!
DOOLEY: Two suspects, Dash, and we're done before the coffee cart opens.
DASH: Then we'll wait for it. I want something hot that nobody poisoned.
> Della went into the wagon humming. She asked the driver if he'd had his supper.
` },
{ id: 'c02.win.epi.2.b', chapter: 2, s: `
@set bar!
@mood warm
SAL: Two questions. That's all she was worth?
DASH: That's all she needed.
SAL: She brought me soup when I had the flu. Every day for a week.
DASH: What kind?
SAL: The good kind. I hope they let her make it inside.
` }
],
3: [
{ id: 'c02.win.epi.3.a', chapter: 2, s: `
@set precinct!
> {time}. Della sat in the interview room knitting a scarf with no end to it.
DELLA: It's for you, sugar. It gets cold where you're going.
DASH: Where's that?
DELLA: Wherever good men go when they find out who they've been working for.
` },
{ id: 'c02.win.epi.3.b', chapter: 2, s: `
@set street!
DOOLEY: Three tries. The Lindqvist's captain is screaming at the harbor master, the harbor master is screaming at me, and I'm smiling.
DASH: Why are you smiling?
DOOLEY: Nobody ever screamed at me before. Feels like I'm important.
` }
],
4: [
{ id: 'c02.win.epi.4.a', chapter: 2, s: `
@set docks!
@mood blue
> {time}. The ledger copy sat in an evidence box on the hood of Dooley's car, getting rained on. Two hundred names. Ours, theirs, nobody's.
DOOLEY: Four suspects. And the tide's not even out.
DASH: Get it under cover, Dooley. That book's the only honest thing on this waterfront.
` },
{ id: 'c02.win.epi.4.b', chapter: 2, s: `
@set bar!
SAL: Four. You look like four, Dash. Go home.
DASH: After one.
SAL: After none. You've got somewhere to be tonight. I can see it on you.
DASH: Where?
SAL: You tell me. You've got the look of a man who's forgotten an anniversary.
` }
],
5: [
{ id: 'c02.win.epi.5.a', chapter: 2, s: `
@set docks!
@mood blue
> We had Della. We didn't have the sea chest. The Lindqvist's captain wouldn't open his hold without a warrant, and no judge in this city answers his phone before seven.
DOOLEY: Five tries, Dash. We got the woman.
DASH: We got the bookkeeper. The book got away.
` },
{ id: 'c02.win.epi.5.b', chapter: 2, s: `
@set gangway!
@mood sick
> At six on the nose, the deckhands pulled the gangway in from under my feet. I watched the Lindqvist back out into the channel with the ledger copy in her hold.
DELLA: Don't take it hard, sugar. Somebody always gets a copy.
DASH: Who gets this one?
DELLA: People who pay their tabs.
` }
],
6: [
{ id: 'c02.win.epi.6.a', chapter: 2, s: `
@set gangway!
@mood red
> {time}. I put the cuffs on Della Marsh at the top of the gangway while the deckhands were already hauling it in.
DELLA: You're late, sugar. The book's already gone.
DASH: So are you.
DELLA: I've been gone for years. Nobody noticed. That's the trick.
` },
{ id: 'c02.win.epi.6.b', chapter: 2, s: `
@set precinct!
@mood blue
BRIGGS: Six, Lexington. You caught her at the rail and the boat sailed anyway.
DASH: We've got her.
BRIGGS: We've got a nice old lady who knits. The book with the names in it is halfway to Portugal.
> Briggs held up six fingers, then put his hands in his pockets, like he was ashamed of all of them.
` }
]
}
};

export const LOSS = {
climax: [
{ id: 'c02.loss.climax.a', chapter: 2, s: `
@set docks!
@mood blue
~rain heavy
~sfx foghorn
> 6:00 AM. The Lindqvist slid away from Pier {pier}, slow as a hearse, and a woman in a wool coat waved from the rail like she was seeing off a nephew.
~tight
** Her headword was {ANSWER}.
%%DASH LEXINGTON | {ANSWER}
> The ledger went with her. Every tab in the city, carried forward.
~stamp COLD CASE
~loose
` },
{ id: 'c02.loss.climax.b', chapter: 2, s: `
@set phonebooth!
@mood red
> 6:00 AM. The pay phone at the foot of Pier {pier} was ringing when I got there. Out past it, the Lindqvist was a light getting smaller.
~sfx ring
WORD: She's past the breakwater, Lexington.
DASH: Tell me her name.
WORD: {ANSWER}. Write it on your tab. You'll never pay it off.
~sfx hangup
~stamp COLD CASE
` }
],
epi: {
0: [
{ id: 'c02.loss.epi.0.a', chapter: 2, s: `
@set docks!
@mood blue
> My last suspect didn't have a letter of her. I'd spent the night's last question on a stranger.
DOOLEY: It happens, Dash.
DASH: Not at six o'clock it doesn't. At six o'clock it just happened.
` },
{ id: 'c02.loss.epi.0.b', chapter: 2, s: `
@set bar!
@mood blue
SAL: Nothing in the last one?
DASH: Five strangers.
SAL: Sit down. I'll make eggs. You can't arrest anybody on an empty stomach, and you shouldn't lose on one either.
` }
],
1: [
{ id: 'c02.loss.epi.1.a', chapter: 2, s: `
@set gangway!
> {GUESS} had {hitsN} of her. A loose thread on a scarf that ran all the way to Lisbon.
DOOLEY: We'll get her when she comes back.
DASH: They don't come back, Dooley. They get new words.
` },
{ id: 'c02.loss.epi.1.b', chapter: 2, s: `
@set precinct!
BRIGGS: {HitsN}. You had {hitsN} of her when the boat left.
DASH: I know what I had, Captain.
BRIGGS: Then you know what you didn't.
` }
],
2: [
{ id: 'c02.loss.epi.2.a', chapter: 2, s: `
@set docks!
@mood blue
> {GUESS}. {HitsN} of her name in my last question. Most of a woman, sailing away.
> I stood at the end of Pier {pier} until the Lindqvist's lights went small, and then went out.
` },
{ id: 'c02.loss.epi.2.b', chapter: 2, s: `
@set bar!
SAL: {HitsN} in the last one. You were close.
DASH: Close doesn't settle a tab, Sal.
SAL: No. But I'll carry it. I always carry yours.
` }
],
3: [
{ id: 'c02.loss.epi.3.a', chapter: 2, s: `
@set gangway!
@mood red
> {GUESS}. All of her, every letter, in the wrong columns. The books didn't balance, and the ship didn't wait.
DASH: A transposition error.
> The most common mistake in the world. Sal told me that. Della told him.
` },
{ id: 'c02.loss.epi.3.b', chapter: 2, s: `
@set precinct!
BRIGGS: All five, Lexington. You had her whole name and couldn't spell it.
DASH: I spelled it fine, Captain. Just not in order.
BRIGGS: Tell it to the Swedes.
` }
]
}
};
