// Chapter 9 informants: type n | top | pos | dbl, three of each. Reads briggs_out, dooley_hurt, vera_saved_herself.

export const INFORMANTS = [
{ id: 'c09.inf.pete', chapter: 9, type: 'n', who: 'PETE', s: `
~fade
@set street!
~rain light
PETE: Lexington. That dame sold me five raffle tickets for widows and orphans. I want my money back from the orphans.
PETE: I counted every word in the city that still fits her. Here.
~clue
?n=1 PETE: One. One word. One raffle. You win.
?n>1?n<=6 PETE: A few. Like the tickets she sold me.
?n>6?n<=40 PETE: A decent crowd. Like a matinee.
?n>40 PETE: A full house, Lexington. Opening night.
DASH: Thanks, Pete.
PETE: Tell her I want a refund. In person.
` },
{ id: 'c09.inf.kow', chapter: 9, type: 'n', who: 'KOW', s: `
~fade
@set warehouse!
@mood warm
KOW: Mr. Lexington. I am a witness. I sit. I watch. In between, I count, from my knitting pattern book. It has a dictionary in the back.
KOW: Words that can still be this actress.
~clue
?n=1 KOW: One. She is caught. Good. I did not like her hat.
?n>1?n<=6 KOW: Few. Hurry, before the chairman.
?n>6?n<=40 KOW: Many. Like my stitches.
?n>40 KOW: Very many. Sit, think, then hurry.
DASH: You should go home, Mrs. Kowalski.
KOW: I signed as witness, Mr. Lexington. I go home when it is witnessed.
` },
{ id: 'c09.inf.eddie', chapter: 9, type: 'n', who: 'EDDIE', s: `
~fade
@set warehouse!
EDDIE: Detective. The boys are guarding the milk crates. Somebody had a crossword in his pocket again, so we counted.
~clue
?n=1 EDDIE: One. Forty men agree.
?n>1?n<=6 EDDIE: A few. Like the crates.
?n>6?n<=40 EDDIE: A bunch. We argued.
?n>40 EDDIE: A boatload, Detective.
DASH: Thanks, Eddie.
EDDIE: I've voted in the Fourth Ward my whole life, Detective. I'd like my vote counted. Just once.
` },
{ id: 'c09.inf.sal', chapter: 9, type: 'top', who: 'SAL', s: `
~fade
@set bar!
@mood warm
SAL: Sit. I've done the arithmetic on that actress. Every word that could still be her.
SAL: One letter shows up more than any other. {topL}.
~clue
?topPct=100 SAL: Every last one, Dash. Like the Fourth Ward. It always comes down to one.
?topPct<100 SAL: {topPct} in a hundred. Good odds. Better than most elections.
DASH: Thanks, Sal.
SAL: Come back after, Dash. Whatever happens. I'll have the good bottle out.
` },
{ id: 'c09.inf.zero', chapter: 9, type: 'top', who: 'ZERO', s: `
~fade
@set alley!
@mood violet
ZERO: Detective. I've read for Lola Vance. Twice. Once as a widow, once as a nun. The cards were the same both times.
ZERO: The Moon, darling. Illusion. And under it, the letter {topL}.
~clue
?topPct=100 ZERO: Every card. She can fool anyone but the deck.
?topPct<100 ZERO: {topPct} in a hundred. The Moon is never completely honest.
DASH: What did she ask the cards?
ZERO: Whether you'd be the one. They said yes. She seemed pleased.
` },
{ id: 'c09.inf.vera', chapter: 9, type: 'top', who: 'VERA', s: `
~fade
@set warehouse!
@mood warm
?vera_saved_herself VERA: I got myself out of a sixth floor yesterday. Tonight I'm getting you a letter. Every word that could still be her.
?!vera_saved_herself VERA: You got me off a sixth floor yesterday. Tonight I'm getting you a letter. Every word that could still be her.
VERA: {topL}. More than anything else.
~clue
?topPct=100 VERA: In every one. Ink it, Dash.
?topPct<100 VERA: {topPct} out of a hundred. Pencil it. Lightly.
DASH: You should be home in bed.
VERA: I've spent too many nights home in bed, Dash. I'd rather see how it ends.
` },
{ id: 'c09.inf.prof', chapter: 9, type: 'pos', who: 'PROF', s: `
~fade
@set office!
@mood warm
PROF: Detective. I'm told you've stopped suspecting me. I don't know who told you. I'm grateful anyway.
PROF: Your evidence, against my lists. The {posOrd} letter is {posL}, more often than not.
~clue
?posPct=100 PROF: Without exception. I'll testify to that, and to anything else you need.
?posPct<100 PROF: {posPct} in a hundred. I still don't round, Detective. Not even tonight.
DASH: Professor. Somebody bought your manuscript in '46. Didn't they?
PROF: I've wondered for a year, Detective. I've been too proud to ask. Ask for me.
` },
{ id: 'c09.inf.mags', chapter: 9, type: 'pos', who: 'MAGS', s: `
~fade
@set warehouse!
MAGS: Detective. I've got the Index pages and a pencil and a corner of the warehouse to myself. I ran your list.
MAGS: Your {posOrd} letter comes up {posL}, more often than not.
~clue
?posPct=100 MAGS: Every time. Solid.
?posPct<100 MAGS: {posPct} in a hundred. Strong signal.
DASH: How's the Index?
MAGS: Terrifying, Detective. Half the board's in it. I'm not telling them which half.
` },
{ id: 'c09.inf.fenn', chapter: 9, type: 'pos', who: 'FENN', s: `
~fade
@set morgue!
@mood sick
FENN: Mr. Bloom and I have been sitting up together. He's very good company. Never interrupts.
FENN: Your {posOrd} letter, Lexington. {posL}, more often than not.
~clue
?posPct=100 FENN: Every time. He'd have liked that. He was a schoolteacher.
?posPct<100 FENN: {posPct} times in a hundred. He'd have marked it "good effort."
DASH: Thanks, Doc.
FENN: Get her before six, Lexington. He watched every count for thirty years. He'd like to see this one finished.
` },
{ id: 'c09.inf.dooley', chapter: 9, type: 'dbl', who: 'DOOLEY', s: `
~fade
@set precinct!
?dooley_hurt DOOLEY: Dash. I'm on the radio with one arm and a list. Doubles.
?!dooley_hurt DOOLEY: Dash. I'm on the radio with a list. Doubles.
~clue
?dblPct>=50 DOOLEY: Better than even there's a pair. Like her two faces.
?dblPct<50?dblPct>0 DOOLEY: Probably no pairs. Probably.
?dblPct=0 DOOLEY: No pairs. Every letter different, like every one of her.
DASH: Good work.
DOOLEY: Get her, Dash. Then go get some sleep. You look like the last act.
` },
{ id: 'c09.inf.briggs', chapter: 9, type: 'dbl', who: 'BRIGGS', s: `
~fade
@set warehouse!
@mood noir
?briggs_out BRIGGS: Lexington. First night back, standing behind a board chairman, doing your doubles in my head.
?!briggs_out BRIGGS: Lexington. I'm standing behind the board chairman, doing your doubles in my head.
~clue
?dblPct>=50 BRIGGS: Better than even. Two fingers. Behind the chairman's back.
?dblPct<50?dblPct>0 BRIGGS: Probably none. One finger.
?dblPct=0 BRIGGS: None. No fingers. My hands are busy holding the chairman's chair.
> He held up two fingers, and then folded them, and rested his hand on the back of the chairman's chair.
` },
{ id: 'c09.inf.nickel', chapter: 9, type: 'dbl', who: 'NICKEL', s: `
~fade
@set street!
NICKEL: Mister Lexington! The actress lady gave me a dollar to carry her bag to the warehouse. It was heavy. I did the doubles thing on the way.
~clue
?dblPct>=50 NICKEL: Probably a pair, mister. Like the shoes in her bag. She had three pairs.
?dblPct<50?dblPct>0 NICKEL: Probably no pairs.
?dblPct=0 NICKEL: No pairs at all.
DASH: Did you look in the bag, Nickel?
NICKEL: Course not, mister. Greer looked in a bag once. I learn things.
` }
];
