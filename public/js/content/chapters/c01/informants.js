// Chapter 1 informants: type n (candidate count) | top (letter odds) | pos (letter at position) | dbl (double letters).
// Each plays at most once per case; the clue card is also written to the case notes.

export const INFORMANTS = [
{ id: 'c01.inf.pete', chapter: 1, type: 'n', who: 'PETE', s: `
~fade
@set street!
~rain light
PETE: Lexington! Over here, under the awning, where it's only half raining.
> Lucky Pete sells the Gazette on the corner of Ninth and Front. He reads every edition before the men who wrote it.
PETE: Classifieds charge by the word, see, so I learned to count 'em. I counted every word in town that still fits your suspects.
~clue
?n=1 PETE: One. If it was an ad, it'd cost you a nickel.
?n>1?n<=6 PETE: That's a short column. You could set it by hand.
?n>6?n<=40 PETE: That's half a page, Lexington. Start cutting.
?n>40 PETE: That's the Sunday edition. Nobody reads the whole Sunday edition.
DASH: Put it on my account, Pete.
PETE: Your account's got its own account.
` },
{ id: 'c01.inf.vera', chapter: 1, type: 'top', who: 'VERA', s: `
~fade
@set pressroom!
@mood warm
VERA: Dash. Come and look at his type case.
> Pell's case: every letter of the alphabet in its own little wooden box, and some boxes a lot emptier than others.
VERA: A compositor's case tells you what he's been setting. I held it up against every name that still fits.
VERA: {topL}. If I were a betting woman, and I'm not, I'd bet on {topL}.
~clue
?topPct=100 VERA: It's in there. I'd mark it in ink.
?topPct<100 VERA: {topPct} in a hundred. A proofreader doesn't guess, Dash. She has hunches, and she checks them.
DASH: When did you get this good?
VERA: I was always this good. You were just home less.
` },
{ id: 'c01.inf.prof', chapter: 1, type: 'pos', who: 'PROF', s: `
~fade
@set office!
@mood warm
~sfx ring
PROF: Detective Lexington? Ambrose Thackeray. Your wife telephoned. She said you were short a dictionary.
DASH: I'm short a lot of things tonight, Professor. A dictionary's a start.
PROF: Then here is a start. The {posOrd} letter of your fugitive is {posL}, more often than not.
~clue
?posPct=100 PROF: Always, in fact. I checked twice. I check everything twice. It's why I'm unemployed.
?posPct<100 PROF: {posPct} times in a hundred. I won't round it up for you. Rounding up is how dictionaries go wrong.
DASH: I owe you one.
PROF: Everyone does, Detective. Nobody ever buys the book.
` },
{ id: 'c01.inf.dooley', chapter: 1, type: 'dbl', who: 'DOOLEY', s: `
~fade
@set precinct!
DOOLEY: Dash, I had Records pull every name that could still be him. Took them an hour. They hate me now.
DOOLEY: I looked for twins. Same letter twice, like a typesetter hitting the key double.
~clue
?dblPct>=50 DOOLEY: Better than a coin toss he's got a letter in there twice. Fussy men like a matched pair.
?dblPct<50?dblPct>0 DOOLEY: Probably no repeats. Probably. I wouldn't bet my shield on it. I don't have a shield yet.
?dblPct=0 DOOLEY: No repeats at all. Five different letters, like a ransom note from a man with standards.
DASH: Good work, Sergeant.
DOOLEY: Say it louder next time the Captain's in the room.
` }
];
