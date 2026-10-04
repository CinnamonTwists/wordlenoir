// Chapter 4 informants: type n (candidate count) | top (letter odds) | pos (letter at position) | dbl (double letters). Three of each.
// Mags arrives at the midpoint (guess 3), so her scene reads `g` to know whether Dash has met her yet.

export const INFORMANTS = [
{ id: 'c04.inf.pete', chapter: 4, type: 'n', who: 'PETE', s: `
~fade
@set street!
~rain light
PETE: Lexington. That radio dame sold me hair tonic, so I'm selling her out. Even trade.
PETE: I counted every word in town that still fits your evidence. Here's the figure.
~clue
?n=1 PETE: One. One word. She can't sell her way out of one.
?n>1?n<=6 PETE: A few. Like the hairs I got left.
?n>6?n<=40 PETE: A good number. Not a great number.
?n>40 PETE: A lot. Like the bottles of tonic in my closet.
DASH: I'll get your money back, Pete.
PETE: Get her, and I'll call it square. With her. Not with you.
` },
{ id: 'c04.inf.kow', chapter: 4, type: 'n', who: 'KOW', s: `
~fade
@set apartment!
@mood warm
KOW: Mr. Lexington. That woman on the radio says your name. In my building. At four in the morning.
KOW: I do not like it. So I counted, from the dictionary, how many words can still be her.
~clue
?n=1 KOW: One. Like the one month of rent you paid this year.
?n>1?n<=6 KOW: Few. Arrest her. Then pay rent.
?n>6?n<=40 KOW: Many. Still fewer than the times she said your name.
?n>40 KOW: Too many. Turn off the radio and work.
DASH: Thank you, Mrs. Kowalski.
KOW: Do not thank. Pay.
` },
{ id: 'c04.inf.nickel', chapter: 4, type: 'n', who: 'NICKEL', s: `
~fade
@set station!
NICKEL: Mister Lexington! The radio lady's on at the station too. Everybody's shoes are listening.
NICKEL: I did the counting thing. With chalk, on the floor by my stand. The janitor's gonna kill me.
~clue
?n=1 NICKEL: Only one! I drew a box around it.
?n>1?n<=6 NICKEL: Just a few. I could whistle 'em.
?n>6?n<=40 NICKEL: A bunch. The floor's covered.
?n>40 NICKEL: Too many. The janitor's coming.
DASH: Run, kid.
NICKEL: I'm always running, mister. It's good for business.
` },
{ id: 'c04.inf.sal', chapter: 4, type: 'top', who: 'SAL', s: `
~fade
@set bar!
@mood warm
SAL: Sit. Have a sandwich. I've been listening to her all night, so I did something useful to stay sane.
SAL: Every word that could still be her. One letter turns up more than any other. {topL}.
~clue
?topPct=100 SAL: Every single one, Dash. You can bet the bar.
?topPct<100 SAL: {topPct} in a hundred. I'd bet a sandwich. Not the bar.
DASH: You never used to do sums, Sal.
SAL: I never used to have a radio that worked, either. Times change.
` },
{ id: 'c04.inf.zero', chapter: 4, type: 'top', who: 'ZERO', s: `
~fade
@set alley!
@mood violet
ZERO: The voice on the radio. I know her kind, detective. She sells futures too. Hers are cheaper.
ZERO: My cards say {topL}. They say it the way a song says the chorus.
~clue
?topPct=100 ZERO: Over and over. The cards have never been so sure. It frightens me a little.
?topPct<100 ZERO: {topPct} in a hundred. The rest is static.
DASH: You listen to her?
ZERO: Everybody listens to her, darling. That's the problem with her.
` },
{ id: 'c04.inf.vera', chapter: 4, type: 'top', who: 'VERA', s: `
~fade
@set apartment!
@mood warm
VERA: I couldn't sleep, so I worked. Every word that could still be her name.
VERA: {topL}. It shows up more than anything else. If I were marking her copy, I'd mark {topL} first.
~clue
?topPct=100 VERA: Every one, Dash. I don't even need a red pencil.
?topPct<100 VERA: {topPct} out of a hundred. A good proofreader doesn't trust it. A tired one does.
DASH: Go back to bed.
VERA: When she stops saying your name, I will.
` },
{ id: 'c04.inf.prof', chapter: 4, type: 'pos', who: 'PROF', s: `
~fade
@set office!
@mood warm
PROF: Detective. That voice. It's using a definition of "dedicate" I haven't heard since the Latin. To devote something to the gods. Usually by killing it.
PROF: Your evidence, held against my lists. The {posOrd} letter is {posL}, more often than not.
~clue
?posPct=100 PROF: Every time. Rarely does language behave so well.
?posPct<100 PROF: {posPct} times in a hundred. I refuse to round it. Rounding is what announcers do.
DASH: You listen to her too, Professor?
PROF: I listen to everyone, Detective. It's the only job I have left.
` },
{ id: 'c04.inf.fenn', chapter: 4, type: 'pos', who: 'FENN', s: `
~fade
@set morgue!
@mood sick
FENN: Mr. Benning and I have been listening to the radio together. Well. I've been listening.
FENN: I ran your list between rounds of hers. The {posOrd} letter: {posL}, more often than not.
~clue
?posPct=100 FENN: Every time. Like a heartbeat, which Mr. Benning lacks.
?posPct<100 FENN: {posPct} times in a hundred. Good odds, by the standards of my clientele.
DASH: Thanks, Doc.
FENN: Turn her off when you're done, Lexington. Lou deserves the quiet.
` },
{ id: 'c04.inf.mags', chapter: 4, type: 'pos', who: 'MAGS', s: `
~fade
@set studio!
?g<3 MAGS: Detective. You don't know me. Relief engineer. I keep the logs, and I can't sleep either.
?g>=3 MAGS: Detective. I ran your evidence through my logs. Every word she's ever used, every word that still fits.
MAGS: The {posOrd} position. It's {posL}, more often than not. I'd put it on the meter.
~clue
?posPct=100 MAGS: Every time. Pinned to the right, Detective. No needle wobble.
?posPct<100 MAGS: {posPct} times in a hundred. There's noise. There's always noise.
?g<3 DASH: Who are you?
?g<3 MAGS: Somebody who'll be in your office in an hour. Remember me.
?g>=3 DASH: You're good, Mags.
?g>=3 MAGS: I know. Lou knew too. That's why she killed him.
` },
{ id: 'c04.inf.dooley', chapter: 4, type: 'dbl', who: 'DOOLEY', s: `
~fade
@set street!
DOOLEY: Dash. I sat in the car with the radio off and ran the list. Every name that could still be hers.
DOOLEY: I looked for doubles. Two of a letter.
~clue
?dblPct>=50 DOOLEY: Better than even there's a double. Like her two packs a day.
?dblPct<50?dblPct>0 DOOLEY: Probably no doubles. I wouldn't swear to it. Not after last week.
?dblPct=0 DOOLEY: No doubles at all. Five different letters. Clean as a whistle.
DASH: Why'd you turn the radio off?
DOOLEY: Because I liked her, Dash. And I didn't want to.
` },
{ id: 'c04.inf.briggs', chapter: 4, type: 'dbl', who: 'BRIGGS', s: `
~fade
@set precinct!
@mood noir
BRIGGS: The Councilman's lawyer has been in my office for two hours. So I did your arithmetic, to keep from killing him.
BRIGGS: Repeated letters. Two of the same thing. Like two Haverlys.
~clue
?dblPct>=50 BRIGGS: Better than a coin flip there's a double. I'd hold up two fingers, but I'm too tired.
?dblPct<50?dblPct>0 BRIGGS: Probably no repeats. Probably. In this city, that's a forecast.
?dblPct=0 BRIGGS: No repeats. Every letter different. Unlike the Haverlys.
> He held up one finger, then looked at it like it had disappointed him.
` },
{ id: 'c04.inf.eddie', chapter: 4, type: 'dbl', who: 'EDDIE', s: `
~fade
@set docks!
EDDIE: Detective! Eddie Ruiz. The boys on Pier Nine heard her say your name. We don't like that.
EDDIE: I did the crossword trick. Every word that fits. On the docks we always check twice, so I looked for doubles.
~clue
?dblPct>=50 EDDIE: Good odds there's a letter in there twice. Like a double shift.
?dblPct<50?dblPct>0 EDDIE: Probably every letter's different. I checked twice, like I said.
?dblPct=0 EDDIE: No doubles. Five different fellas. I'd know them anywhere.
DASH: Thanks, Eddie.
EDDIE: You saved my neck, Detective. I'm just paying it forward a letter at a time.
` }
];
