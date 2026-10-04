// Chapter 8 informants: type n | top | pos | dbl, three of each. Vera is missing; Nora helps from the telephone exchange.
// Reads briggs_out and dooley_hurt.

export const INFORMANTS = [
{ id: 'c08.inf.pete', chapter: 8, type: 'n', who: 'PETE', s: `
~fade
@set street!
~rain light
PETE: Lexington. Mrs. Lexington always bought a paper from me and never once read it in front of me. Said it was rude to the writers.
PETE: I counted for her. Every word that fits the guy who took her.
~clue
?n=1 PETE: One. One word. Go get her.
?n>1?n<=6 PETE: A handful. Pick quick.
?n>6?n<=40 PETE: A good few. She'd find him faster. She reads quicker than you.
?n>40 PETE: Too many. Ask smarter. For her.
DASH: Thanks, Pete.
PETE: Don't thank me, Lexington. Bring her back to my corner.
` },
{ id: 'c08.inf.kow', chapter: 8, type: 'n', who: 'KOW', s: `
~fade
@set apartment!
@mood warm
KOW: Mr. Lexington. Your wife is a good woman. She paid your rent twice when you forgot. I will not let a ghost take her from my building.
KOW: I counted. Words that can still be the man.
~clue
?n=1 KOW: One. Bring her home. Then we discuss the rent she paid.
?n>1?n<=6 KOW: Few. Hurry.
?n>6?n<=40 KOW: Many. Hurry more.
?n>40 KOW: Too many. Pray, also.
DASH: She paid my rent?
KOW: Twice, Mr. Lexington. She asked me not to tell you. Now I tell you. So you know what you are losing.
` },
{ id: 'c08.inf.nora', chapter: 8, type: 'n', who: 'NORA', s: `
~fade
@set phonebooth!
NORA: Dash. Every girl at the exchange is listening. In between calls, I did your counting. Like Tommy's arithmetic homework, only worse.
~clue
?n=1 NORA: One, Dash. One word. Say it to his face.
?n>1?n<=6 NORA: A few. That's nothing. You've done harder with less.
?n>6?n<=40 NORA: A lot. Not hopeless. I don't do hopeless at four in the morning.
?n>40 NORA: Too many. Ask better.
DASH: Thanks, Nora.
NORA: Bring her back, Dash. Tommy wants her at the wedding.
` },
{ id: 'c08.inf.sal', chapter: 8, type: 'top', who: 'SAL', s: `
~fade
@set bar!
@mood warm
SAL: Sit. Ten seconds. I did the sums. Every word that could still be the man who took Vera.
SAL: One letter turns up more than any other. {topL}.
~clue
?topPct=100 SAL: In every one, Dash. Every single one.
?topPct<100 SAL: {topPct} in a hundred. Good odds. Take them.
DASH: Thanks, Sal.
SAL: Don't thank me. Go get her. I'll be wherever you need me.
` },
{ id: 'c08.inf.zero', chapter: 8, type: 'top', who: 'ZERO', s: `
~fade
@set alley!
@mood violet
ZERO: Detective. I turned one card for your wife. The Queen of Cups. A woman who sees what others write. She's alive, darling.
ZERO: And the cards give me a letter for the man. {topL}.
~clue
?topPct=100 ZERO: Every card. The deck has never been so angry.
?topPct<100 ZERO: {topPct} in a hundred. The rest is fog.
DASH: You're sure she's alive?
ZERO: I'm sure of nothing, darling. But the Queen was upright. Go.
` },
{ id: 'c08.inf.prof', chapter: 8, type: 'top', who: 'PROF', s: `
~fade
@set office!
@mood warm
PROF: Detective. Your wife sent me a letter once correcting my dictionary. Eleven errors. She was right about nine.
PROF: For her, I've run your evidence. The letter {topL} turns up more than any other.
~clue
?topPct=100 PROF: Every time. I'd stake what's left of my name on it.
?topPct<100 PROF: {topPct} in a hundred. I won't round it. She'd know if I did.
DASH: Which two was she wrong about?
PROF: I've never told her, Detective. I'd like the chance.
` },
{ id: 'c08.inf.mags', chapter: 8, type: 'pos', who: 'MAGS', s: `
~fade
@set office!
MAGS: Detective. I'm doing two things at once tonight: the Gazette's floor plans, and your list.
MAGS: The {posOrd} letter of his word. {posL}, more often than not.
~clue
?posPct=100 MAGS: Every time. Clean signal.
?posPct<100 MAGS: {posPct} in a hundred. Some noise. Not much.
DASH: Thanks, Mags.
MAGS: Thank me with your wife in the room, Detective. I've never met her. I'd like to.
` },
{ id: 'c08.inf.fenn', chapter: 8, type: 'pos', who: 'FENN', s: `
~fade
@set morgue!
@mood sick
FENN: Lexington. I want you to know my tables are empty tonight, and I intend to keep one of them that way.
FENN: Here's your {posOrd} letter: {posL}, more often than not.
~clue
?posPct=100 FENN: Every time. As sure as anything I've ever written on a tag.
?posPct<100 FENN: {posPct} times in a hundred. Good enough to act on. Act.
DASH: Thanks, Doc.
FENN: Don't make me meet her down here, Lexington. I'd never forgive you.
` },
{ id: 'c08.inf.eddie', chapter: 8, type: 'pos', who: 'EDDIE', s: `
~fade
@set ferry!
EDDIE: Detective. Forty of us on this gangplank. One of the boys had a crossword in his pocket, so we did your word.
EDDIE: The {posOrd} square. It's {posL}, mostly.
~clue
?posPct=100 EDDIE: Every time. Forty men checked it.
?posPct<100 EDDIE: {posPct} times out of a hundred. Forty men argued about the rest.
DASH: Thanks, Eddie.
EDDIE: Mrs. Lexington brought sandwiches to the pier when I was inside, Detective. For Rosa. I never forgot.
` },
{ id: 'c08.inf.dooley', chapter: 8, type: 'dbl', who: 'DOOLEY', s: `
~fade
@set street!
?dooley_hurt DOOLEY: Dash. I ran the list with one hand on the side door of the Gazette. Doubles.
?!dooley_hurt DOOLEY: Dash. I ran the list standing at the side door of the Gazette. Doubles.
~clue
?dblPct>=50 DOOLEY: Better than even there's a pair. Like him and the man whose coat he's wearing.
?dblPct<50?dblPct>0 DOOLEY: Probably no pairs. Probably.
?dblPct=0 DOOLEY: No pairs. Every letter alone. Like him.
DASH: Hold the door, Dooley.
DOOLEY: Nobody's coming through it, Dash. Not with her.
` },
{ id: 'c08.inf.briggs', chapter: 8, type: 'dbl', who: 'BRIGGS', s: `
~fade
?!briggs_out @set precinct!
?briggs_out @set street!
?!briggs_out BRIGGS: Lexington. I've got every car I own on that building. While they watch, I count. Doubles.
?briggs_out BRIGGS: Lexington. I'm suspended and in my slippers at the Gazette's back door. While I wait, I count. Doubles.
~clue
?dblPct>=50 BRIGGS: Better than even. Two fingers. Two of everything tonight, like my worries.
?dblPct<50?dblPct>0 BRIGGS: Probably none. One finger. Pointed at that building.
?dblPct=0 BRIGGS: None. Not one double. Go.
> He held up no fingers at all. He just pointed at the sixth floor.
` },
{ id: 'c08.inf.nickel', chapter: 8, type: 'dbl', who: 'NICKEL', s: `
~fade
@set street!
NICKEL: Mister Lexington! I'm on the loading door like Sal said. Nobody's getting out in a laundry bag. I did the doubles thing too.
~clue
?dblPct>=50 NICKEL: Probably a pair, mister. Like the cops on the back door.
?dblPct<50?dblPct>0 NICKEL: Probably no pairs.
?dblPct=0 NICKEL: No pairs at all.
DASH: Good work, kid.
NICKEL: Mrs. Lexington gave me a dime once for being polite. I'm being polite to the door. It's not working.
` }
];
