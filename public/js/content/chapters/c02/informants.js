// Chapter 2 informants: type n (candidate count) | top (letter odds) | pos (letter at position) | dbl (double letters).
// Sal becomes an informant in this chapter (bible §6). Pete's lines depend on whether he's seen his own page yet (the guess-3 midpoint).

export const INFORMANTS = [
{ id: 'c02.inf.sal', chapter: 2, type: 'top', who: 'SAL', s: `
~fade
@set bar!
@mood warm
SAL: Sit. I did some sums on the back of her ledger paper. Della would kill me. Well. You know what I mean.
SAL: Every word that could still be her, and one letter that turns up more than the rest. {topL}.
~clue
?topPct=100 SAL: Every last one of them, Dash. You can take that to the bank.
?topPct<100 SAL: {topPct} out of a hundred. I wouldn't bet the bar on it. I'd bet a round.
DASH: Since when do you do sums, Sal?
SAL: Since I found out what was going on in my back room. Better late.
` },
{ id: 'c02.inf.pete', chapter: 2, type: 'n', who: 'PETE', s: `
~fade
@set street!
~rain light
?g<3 PETE: Lexington. I heard Sal's got trouble. I been counting for you, on the house.
?g>=3 PETE: Lexington. I'm making it up to you. I been counting.
PETE: Every word in town that still fits what you got. I wrote 'em down in my own book. Like a ledger, but honest.
~clue
?n=1 PETE: One. Even I can't lose count of one.
?n>1?n<=6 PETE: That's a handful. You could fit 'em on a coaster.
?n>6?n<=40 PETE: It's a lot, but it ain't the phone book.
?n>40 PETE: It's the phone book. Sorry, Lexington.
?g<3 DASH: What do I owe you?
?g<3 PETE: Nothing. A nice lady down at the Last Word pays my tab. Isn't that something?
?g>=3 DASH: We're square, Pete.
?g>=3 PETE: We ain't square. We ain't even round. But thanks.
` },
{ id: 'c02.inf.fenn', chapter: 2, type: 'dbl', who: 'FENN', s: `
~fade
@set precinct!
@mood sick
FENN: Benny Fusco is very dead and very cooperative. I like that in a source.
FENN: While he rested, I ran your list of possible words. I look for pairs. Two of the same thing usually means trouble.
~clue
?dblPct>=50 FENN: Better than even odds of a repeated letter. Like a second dose. People always think the first one is enough.
?dblPct<50?dblPct>0 FENN: Probably no repeats. Probably. In my line of work, probably is a long word.
?dblPct=0 FENN: No repeats. Five different letters. A single dose, cleanly given.
DASH: Thanks, Doc.
FENN: Don't drink anything you didn't watch being poured.
` },
{ id: 'c02.inf.zero', chapter: 2, type: 'pos', who: 'ZERO', s: `
~fade
@set alley!
@mood violet
ZERO: Detective. The cards said you would come. They also said you would forget to pay.
> Madame Zero's cards are wrong most nights. Most nights isn't every night.
ZERO: The {posOrd} card. It turns up {posL}. It turns up {posL} again and again.
~clue
?posPct=100 ZERO: Every time, darling. The cards are bored of saying it.
?posPct<100 ZERO: {posPct} times in a hundred. The rest of the time they lie to me. Like men.
DASH: Put it on my tab.
ZERO: Your tab is why I read cards, darling. Nobody pays a fortune teller.
` }
];
