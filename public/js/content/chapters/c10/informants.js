// Chapter 10 informants: type n | top | pos | dbl, three of each. Sal is not among them tonight (his bar is closed).
// The Professor's scene reads `g`: after the midpoint, Dash has sent Dooley to arrest him.

export const INFORMANTS = [
{ id: 'c10.inf.pete', chapter: 10, type: 'n', who: 'PETE', s: `
~fade
@set street!
~rain light
PETE: Lexington. Two front pages tomorrow, they say. One's a lie. I sell both, I'm a liar. I sell neither, I'm broke. So I counted for you instead.
~clue
?n=1 PETE: One word. One. Then I sell one paper and sleep like a baby.
?n>1?n<=6 PETE: A few. Pick the right one. For the trade.
?n>6?n<=40 PETE: A crowd. Not the whole city. Not yet.
?n>40 PETE: The whole city, Lexington. Ask him something harder.
DASH: Thanks, Pete. For everything. Since October.
PETE: Don't get sentimental, Lexington. You still owe me.
` },
{ id: 'c10.inf.kow', chapter: 10, type: 'n', who: 'KOW', s: `
~fade
@set apartment!
@mood warm
KOW: Detective. You paid rent. So now I help you for free. I counted, from the dictionary, the words that can still be this razor man.
~clue
?n=1 KOW: One. Go. I keep your soup warm.
?n>1?n<=6 KOW: Few. Quickly.
?n>6?n<=40 KOW: Many. Less than my late husband's debts.
?n>40 KOW: Very many. Sit. Think. Then go.
DASH: Thank you, Mrs. Kowalski.
KOW: Thank you, Detective. You see? Now we both say it.
` },
{ id: 'c10.inf.eddie', chapter: 10, type: 'n', who: 'EDDIE', s: `
~fade
@set street!
EDDIE: Detective. Forty men slitting bundles on the Gazette dock, and one of them still had his crossword. We counted between bundles.
~clue
?n=1 EDDIE: One. Forty men agree.
?n>1?n<=6 EDDIE: A few. Like the honest bundles.
?n>6?n<=40 EDDIE: A bunch. Like the fakes.
?n>40 EDDIE: A truckload, Detective.
DASH: Thanks, Eddie. You've been with me since the chair.
EDDIE: And I'll be with you after, Detective. A debt's a debt. I'm still counting.
` },
{ id: 'c10.inf.zero', chapter: 10, type: 'top', who: 'ZERO', s: `
~fade
@set alley!
@mood violet
ZERO: Detective. I have been waiting all year to turn this card for you. The last one in the deck. Judgement.
ZERO: A trumpet, and the dead sitting up. And under it, the letter {topL}.
~clue
?topPct=100 ZERO: Every time, darling. Judgement does not stutter.
?topPct<100 ZERO: {topPct} in a hundred. Even Judgement leaves a little room for mercy.
DASH: What does Judgement mean?
ZERO: That everyone is called to account, darling. Even the one who reads the cards.
` },
{ id: 'c10.inf.vera', chapter: 10, type: 'top', who: 'VERA', s: `
~fade
@set pressroom!
@mood warm
VERA: I've read four thousand bundle wrappers tonight, Dash. My eyes are done. My head isn't. Every word that could still be him.
VERA: {topL}. More than any other letter.
~clue
?topPct=100 VERA: In every one. Ink it, and send it to press.
?topPct<100 VERA: {topPct} out of a hundred. Mark it. Don't send it yet.
DASH: Vera. After tonight...
VERA: After tonight, Dash. Not before. Go.
` },
{ id: 'c10.inf.nora', chapter: 10, type: 'top', who: 'NORA', s: `
~fade
@set phonebooth!
NORA: Dash, it's Nora. I'm on the night board. Walt's watching Tommy. I did your counting between calls.
NORA: One letter keeps coming up. {topL}.
~clue
?topPct=100 NORA: In every one, Dash.
?topPct<100 NORA: {topPct} in a hundred. Good enough for family.
DASH: How's Tommy?
NORA: Asking if his Uncle Dash is going to be in the newspaper. I said probably. I said I hoped it was the right one.
` },
{ id: 'c10.inf.prof', chapter: 10, type: 'pos', who: 'PROF', s: `
~fade
@set station!
@mood warm
?g<3 PROF: Detective. I'm at Union Station, early for something. Let me be useful while I wait.
?g>=3 PROF: Detective. Your sergeant is watching me from behind the newsstand. I don't mind. Let me be useful anyway.
PROF: The {posOrd} letter of the Proofreader's word: {posL}, more often than not.
~clue
?posPct=100 PROF: Without exception. You may tell the jury I said so.
?posPct<100 PROF: {posPct} times in a hundred. I have never rounded, Detective. Not once. Remember that, whatever you're told tonight.
DASH: Who are you waiting for, Professor?
PROF: The man who bought my dictionary, Detective. I finally know who he is. I'd like to tell him myself.
` },
{ id: 'c10.inf.mags', chapter: 10, type: 'pos', who: 'MAGS', s: `
~fade
@set office!
MAGS: Detective. I've got a tap on your open line, the Index pages, and a pot of coffee. I ran your list.
MAGS: Your {posOrd} letter, for the Proofreader: {posL}, more often than not.
~clue
?posPct=100 MAGS: Every time. Clear signal.
?posPct<100 MAGS: {posPct} in a hundred. A little noise. There's always noise on your line, Detective.
DASH: Thanks, Mags. For all of it.
MAGS: Thank Lou. He kept the first log. I just kept going.
` },
{ id: 'c10.inf.fenn', chapter: 10, type: 'pos', who: 'FENN', s: `
~fade
@set morgue!
@mood sick
FENN: Lexington. Eleven of Thorne's on file. I'd like to keep it at eleven. So I ran your list.
FENN: Position {posOrd}: {posL}, more often than not.
~clue
?posPct=100 FENN: Every time. As certain as the tag on a toe.
?posPct<100 FENN: {posPct} in a hundred. I'd operate on those odds.
DASH: Thanks, Doc.
FENN: Come and see me when it's over, Lexington. Upright. I'd like that for a change.
` },
{ id: 'c10.inf.dooley', chapter: 10, type: 'dbl', who: 'DOOLEY', s: `
~fade
@set station!
?dooley_hurt DOOLEY: Dash. One arm, one list, one Professor on a bench. Doubles.
?!dooley_hurt DOOLEY: Dash. One list, one Professor on a bench. Doubles.
~clue
?dblPct>=50 DOOLEY: Better than even there's a pair.
?dblPct<50?dblPct>0 DOOLEY: Probably no pairs. Probably.
?dblPct=0 DOOLEY: No pairs. Every letter alone.
DASH: Thanks, Dooley.
DOOLEY: Whatever happens tonight, Dash. I'd do it all again. Every night since October.
` },
{ id: 'c10.inf.briggs', chapter: 10, type: 'dbl', who: 'BRIGGS', s: `
~fade
@set precinct!
@mood noir
BRIGGS: Lexington. Last night. Doubles. I did them myself. I wanted to.
~clue
?dblPct>=50 BRIGGS: Better than even. Two fingers. For old times' sake.
?dblPct<50?dblPct>0 BRIGGS: Probably none. One finger. The last one.
?dblPct=0 BRIGGS: None. No fingers. I'm keeping them in my pockets till you're back.
> He held up ten fingers, all of them, for the first time I'd ever seen. Then he put them away and told me to go.
` },
{ id: 'c10.inf.nickel', chapter: 10, type: 'dbl', who: 'NICKEL', s: `
~fade
@set station!
NICKEL: Mister Lexington! I did the doubles thing on the shine box, one last time. I'm getting good at it.
~clue
?dblPct>=50 NICKEL: Probably a pair, mister.
?dblPct<50?dblPct>0 NICKEL: Probably no pairs.
?dblPct=0 NICKEL: No pairs at all.
DASH: You're a real detective, kid.
NICKEL: Then I want a badge, mister. And a raise. And for the bad man to lose.
` }
];
