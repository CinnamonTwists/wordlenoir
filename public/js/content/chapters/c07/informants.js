// Chapter 7 informants: type n | top | pos | dbl, three of each. Briggs is suspended and helps from his kitchen; Dooley reads dooley_hurt.

export const INFORMANTS = [
{ id: 'c07.inf.pete', chapter: 7, type: 'n', who: 'PETE', s: `
~fade
@set street!
~rain light
PETE: Lexington. I heard they're selling the city. If they sell my corner, I'm gonna have words. I got a lot of words. I counted 'em.
~clue
?n=1 PETE: One word fits. One. Sell that, Lexington.
?n>1?n<=6 PETE: A handful. Like the change in a banker's pocket.
?n>6?n<=40 PETE: A fair pile. Not the whole bank.
?n>40 PETE: The whole bank. Narrow it down before six.
DASH: Thanks, Pete.
PETE: Don't thank me. Keep my corner.
` },
{ id: 'c07.inf.kow', chapter: 7, type: 'n', who: 'KOW', s: `
~fade
@set apartment!
@mood warm
KOW: Mr. Lexington. The radio says a company is buying the city. Does that mean a company is my landlord now?
DASH: Not if I can help it.
KOW: Then help it. Here. I counted words that can still be the forger.
~clue
?n=1 KOW: One. Good. Arrest her.
?n>1?n<=6 KOW: Few. Faster than a company, please.
?n>6?n<=40 KOW: Many. A company would charge rent on all of them.
?n>40 KOW: Very many. Try harder.
DASH: I'm trying, Mrs. Kowalski.
KOW: A company would not be trying, Mr. Lexington. A company would be collecting. Remember that, and pay your rent.
` },
{ id: 'c07.inf.eddie', chapter: 7, type: 'n', who: 'EDDIE', s: `
~fade
@set docks!
EDDIE: Detective. The lease on Pier Nine's in that vault. Forty families. So we counted, with the crossword dictionary. Every word that fits.
~clue
?n=1 EDDIE: One word. One. Say it, and we keep the pier.
?n>1?n<=6 EDDIE: A few. We can carry a few.
?n>6?n<=40 EDDIE: A crate's worth.
?n>40 EDDIE: A whole ship's worth, Detective. We'll keep counting.
DASH: You've done enough, Eddie.
EDDIE: Nobody's done enough until the pier's ours. Then we'll sleep.
` },
{ id: 'c07.inf.sal', chapter: 7, type: 'top', who: 'SAL', s: `
~fade
@set bar!
@mood warm
SAL: Back room's yours, Dash, but the bar's mine, and I've been doing sums at it.
SAL: Every word that could still be your forger. One letter turns up more than any other. {topL}.
~clue
?topPct=100 SAL: Every last one, Dash. I'd sign my name to it.
?topPct<100 SAL: {topPct} in a hundred. I wouldn't sign. I'd initial.
DASH: Thanks, Sal.
SAL: Go on. You've got a city to unsell.
` },
{ id: 'c07.inf.zero', chapter: 7, type: 'top', who: 'ZERO', s: `
~fade
@set alley!
@mood violet
ZERO: The Forger came to me last month, detective. She wanted me to read her cards. Then she wanted to paint them.
ZERO: She painted every card a little wrong. And on every one, the letter {topL}, hidden in the border.
~clue
?topPct=100 ZERO: Every card. She signs everything, darling. Even her fortune.
?topPct<100 ZERO: {topPct} cards in a hundred. The rest she left blank, for later.
DASH: What did her real cards say?
ZERO: The Magician. Reversed. A trickster who believes her own tricks.
` },
{ id: 'c07.inf.vera', chapter: 7, type: 'top', who: 'VERA', s: `
~fade
@set pressroom!
@mood warm
VERA: Dash. The business desk is holding page one. I'm proofing the Colophon press release so I can hate it properly.
VERA: And your forger. Every word that could be her. {topL} turns up more than anything.
~clue
?topPct=100 VERA: In all of them. Ink it.
?topPct<100 VERA: {topPct} out of a hundred. I'd circle it in red.
DASH: You're at the Gazette at four in the morning?
VERA: Somebody has to read the news before it happens, Dash. That's the job. It's always been the job.
` },
{ id: 'c07.inf.prof', chapter: 7, type: 'pos', who: 'PROF', s: `
~fade
@set office!
@mood warm
PROF: Detective. I'm afraid I once taught Miss Quist how a forger thinks. In a public lecture. I thought it was history.
PROF: To make amends: your evidence against my lists. The {posOrd} letter is {posL}, more often than not.
~clue
?posPct=100 PROF: Without exception. I'd testify. I may have to, about a great many things.
?posPct<100 PROF: {posPct} times in a hundred. I don't round, Detective. Forgers round.
DASH: You teach a lot of people a lot of things, Professor.
PROF: That was the point of a dictionary, Detective. Once.
` },
{ id: 'c07.inf.mags', chapter: 7, type: 'pos', who: 'MAGS', s: `
~fade
@set bar!
MAGS: Detective. Between signatures, I ran your list. The {posOrd} letter of her word: {posL}, more often than not.
~clue
?posPct=100 MAGS: Every time. Like her initials in the eagle.
?posPct<100 MAGS: {posPct} in a hundred. A signal with a little static.
DASH: Is there anything you can't do, Mags?
MAGS: Sleep, Detective. I gave it up in June.
` },
{ id: 'c07.inf.fenn', chapter: 7, type: 'pos', who: 'FENN', s: `
~fade
@set morgue!
@mood sick
FENN: Lexington. A quiet night at the morgue. Nobody's died of forgery yet. So I ran your list.
FENN: Your {posOrd} letter is {posL}, more often than not.
~clue
?posPct=100 FENN: Every time. As certain as a death certificate. Which, I'm told, are in that vault too.
?posPct<100 FENN: {posPct} times in a hundred. Better than the certificates, apparently.
DASH: Thanks, Doc.
FENN: If Colophon owns my morgue at six, Lexington, I'm sending them the bill for every customer.
` },
{ id: 'c07.inf.dooley', chapter: 7, type: 'dbl', who: 'DOOLEY', s: `
~fade
@set precinct!
?dooley_hurt DOOLEY: Dash. One arm, one radio, and Penny's chair. I ran the list in between calls.
?!dooley_hurt DOOLEY: Dash. I've got Penny's chair and her radio. I ran the list in between calls.
DOOLEY: Doubles. Two of a letter.
~clue
?dblPct>=50 DOOLEY: Better than even there's a pair. Like her two sets of books.
?dblPct<50?dblPct>0 DOOLEY: Probably no pairs. Probably. I've stopped trusting probably.
?dblPct=0 DOOLEY: No pairs. Every letter's an original. Funny, for a forger.
DASH: Good work.
DOOLEY: Tell the Captain. When he's the Captain again.
` },
{ id: 'c07.inf.briggs', chapter: 7, type: 'dbl', who: 'BRIGGS', s: `
~fade
@set apartment!
@mood warm
BRIGGS: Sit down. Have soup. I'm suspended, so I've got time, and I did your doubles at the kitchen table.
~clue
?dblPct>=50 BRIGGS: Better than even. Two fingers. Don't tell City Hall I'm still counting.
?dblPct<50?dblPct>0 BRIGGS: Probably all different. One finger.
?dblPct=0 BRIGGS: No doubles. A clean sheet. Like my record, which nobody believes.
> His wife put another bowl in front of me without asking. Suspension had made both of them generous.
` },
{ id: 'c07.inf.nickel', chapter: 7, type: 'dbl', who: 'NICKEL', s: `
~fade
@set street!
NICKEL: Mister Lexington! I heard you're not a cop tonight. That's okay. I'm not a cop either, and I did the doubles thing.
~clue
?dblPct>=50 NICKEL: There's probably a pair, mister. Like a lady's gloves.
?dblPct<50?dblPct>0 NICKEL: Probably no pairs. Probably.
?dblPct=0 NICKEL: No pairs at all. All single shoes.
DASH: Thanks, kid. Go home.
NICKEL: Can't, mister. If they sell the city, I want to see who buys the station.
` }
];
