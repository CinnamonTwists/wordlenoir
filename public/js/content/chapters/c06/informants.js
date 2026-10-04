// Chapter 6 informants: type n | top | pos | dbl, three of each.

export const INFORMANTS = [
{ id: 'c06.inf.pete', chapter: 6, type: 'n', who: 'PETE', s: `
~fade
@set street!
~rain light
PETE: Lexington. They moved me off my corner for the bomb. So I got time. I counted for you.
PETE: Every word in this city that still fits. Here's the number.
~clue
?n=1 PETE: One. One fuse, one fella, one word.
?n>1?n<=6 PETE: A few. Pick fast. I want my corner back.
?n>6?n<=40 PETE: A fair few. Not a stampede.
?n>40 PETE: A stampede, Lexington. Narrow it down.
DASH: You'll get your corner back, Pete.
PETE: If there's a building left next to it.
` },
{ id: 'c06.inf.kow', chapter: 6, type: 'n', who: 'KOW', s: `
~fade
@set apartment!
@mood warm
KOW: Mr. Lexington. My lease is in the Hall of Records. Also my marriage, and my husband's death. If it burns, am I still married? Am I still a widow?
KOW: So. I counted the words that can still be the bomber.
~clue
?n=1 KOW: One. Catch him, and I stay a widow.
?n>1?n<=6 KOW: Few. Quickly, please.
?n>6?n<=40 KOW: Many. My husband would have found him faster. He was a terrible man, but fast.
?n>40 KOW: Very many. I am going to make tea.
DASH: Your lease is safe, Mrs. Kowalski.
KOW: Then so is your rent, Mr. Lexington. Unfortunately for you.
` },
{ id: 'c06.inf.eddie', chapter: 6, type: 'n', who: 'EDDIE', s: `
~fade
@set alley!
EDDIE: Detective. The boys can't help with the bomb, so we did the counting. Every word that fits. Six of us, one dictionary.
~clue
?n=1 EDDIE: One. We counted it six times to be sure.
?n>1?n<=6 EDDIE: A handful. We could carry 'em.
?n>6?n<=40 EDDIE: A crate's worth. Not a ship's worth.
?n>40 EDDIE: A ship's worth. Sorry, Detective.
DASH: Thanks, Eddie. Go home.
EDDIE: Nobody's going home. Not with that bird down there.
` },
{ id: 'c06.inf.sal', chapter: 6, type: 'top', who: 'SAL', s: `
~fade
@set bar!
@mood warm
SAL: Sit for one minute. You've got soot in your eyebrows. I did some sums while you were gone.
SAL: Every word that could be your bomber. One letter keeps showing up. {topL}.
~clue
?topPct=100 SAL: In every one, Dash. You can bet the building on it.
?topPct<100 SAL: {topPct} in a hundred. I wouldn't bet the building. I'd bet the bird.
DASH: Thanks, Sal.
SAL: Now go get that bird out. I mean it, Dash. I won't serve a man who left a bird.
` },
{ id: 'c06.inf.zero', chapter: 6, type: 'top', who: 'ZERO', s: `
~fade
@set alley!
@mood violet
ZERO: Detective. I drew the Tower three times tonight. Lightning, a crown falling, people tumbling from the windows.
ZERO: And underneath it, every time, the letter {topL}.
~clue
?topPct=100 ZERO: Every time, darling. I've never seen the cards so certain, or so frightened.
?topPct<100 ZERO: {topPct} chances in a hundred. The Tower doesn't do maybes. I do.
DASH: The Tower.
ZERO: It isn't always a building, darling. Sometimes it's a life.
` },
{ id: 'c06.inf.vera', chapter: 6, type: 'top', who: 'VERA', s: `
~fade
@set apartment!
@mood warm
VERA: The Gazette has a reporter outside the Hall of Records and nobody to proof his copy. So I'm up. I worked on your bomber instead.
VERA: {topL}. More than any other letter in the words that fit.
~clue
?topPct=100 VERA: All of them, Dash. Ink it.
?topPct<100 VERA: {topPct} out of a hundred. Pencil it.
DASH: Go to sleep, Vera.
VERA: I'll sleep when you come home. I've been saying that for a year. Tonight I mean it.
` },
{ id: 'c06.inf.prof', chapter: 6, type: 'pos', who: 'PROF', s: `
~fade
@set office!
@mood warm
PROF: Detective. My birth certificate is in that building. My degrees. My father's will. If it burns, I am a rumor.
?index_half PROF: I hear you have part of a dictionary in evidence. My dictionary, people are saying. I wrote no such thing.
PROF: The {posOrd} letter of your bomber's word is {posL}, more often than not.
~clue
?posPct=100 PROF: Without exception. I wish I could say the same about my reputation.
?posPct<100 PROF: {posPct} times in a hundred. I won't round it. I never have.
DASH: Thank you, Professor.
PROF: Don't thank me, Detective. Believe me. That's harder.
` },
{ id: 'c06.inf.mags', chapter: 6, type: 'pos', who: 'MAGS', s: `
~fade
@set records!
MAGS: Detective. While I was listening to the clock, I ran your list. I can do two things at once. Most engineers can.
MAGS: The {posOrd} letter. {posL}, more often than not.
~clue
?posPct=100 MAGS: Every time. As steady as the movement downstairs.
?posPct<100 MAGS: {posPct} in a hundred. Noise on the line, but a strong signal.
DASH: How's the clock?
MAGS: Loud, Detective. Louder every hour. Like it wants to be noticed.
` },
{ id: 'c06.inf.fenn', chapter: 6, type: 'pos', who: 'FENN', s: `
~fade
@set morgue!
@mood sick
FENN: I'm told to expect business at six, Lexington. So I'm up, and I ran your list while I sharpened things.
FENN: The {posOrd} letter: {posL}, more often than not.
~clue
?posPct=100 FENN: Every time. Please make it so I have a quiet morning.
?posPct<100 FENN: {posPct} times in a hundred. I'd like a quiet morning either way.
DASH: I'll do my best, Doc.
FENN: Do better than your best. Your best is how I stay employed.
` },
{ id: 'c06.inf.dooley', chapter: 6, type: 'dbl', who: 'DOOLEY', s: `
~fade
@set street!
DOOLEY: Dash. I ran the list while Pruitt was shuffling the cards. Every name that could still be Pike's.
DOOLEY: Doubles. Two of a letter.
~clue
?dblPct>=50 DOOLEY: Better than even there's a pair. Like his matched set of wire cutters.
?dblPct<50?dblPct>0 DOOLEY: Probably no pairs. Probably. He likes things tidy.
?dblPct=0 DOOLEY: No pairs. Five different letters, like five different wires.
DASH: Get Pruitt out of there, Dooley.
DOOLEY: I'm working on it, Dash. He's up two hands.
` },
{ id: 'c06.inf.briggs', chapter: 6, type: 'dbl', who: 'BRIGGS', s: `
~fade
@set precinct!
@mood noir
BRIGGS: City Hall's drafting my suspension, Lexington. While they type, I count.
BRIGGS: Doubles. Two of the same letter.
~clue
?dblPct>=50 BRIGGS: Better than even. Two fingers.
?dblPct<50?dblPct>0 BRIGGS: Probably none. One finger. A tired one.
?dblPct=0 BRIGGS: None. Not one double. No fingers at all. I'm saving them.
> He put his hands flat on the desk, like a man trying to keep the building from moving.
` },
{ id: 'c06.inf.nickel', chapter: 6, type: 'dbl', who: 'NICKEL', s: `
~fade
@set street!
NICKEL: Mister Lexington! I came to see the bomb. The cops won't let me near it. So I did the doubles thing instead, in chalk, on the curb.
~clue
?dblPct>=50 NICKEL: Lotta chalk, mister. There's probably a pair.
?dblPct<50?dblPct>0 NICKEL: Not much chalk. Probably no pairs.
?dblPct=0 NICKEL: No chalk at all. No pairs. Every letter on its own.
DASH: Go home, kid. It's not safe.
NICKEL: Nothing's safe, mister. That's why I like it out here.
` }
];
