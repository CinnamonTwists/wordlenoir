// Chapter 3 informants: type n (candidate count) | top (letter odds) | pos (letter at position) | dbl (double letters). Three of each.

export const INFORMANTS = [
{ id: 'c03.inf.pete', chapter: 3, type: 'n', who: 'PETE', s: `
~fade
@set street!
~rain light
PETE: Lexington. I ran the numbers for Eddie. Not for you. For Eddie.
PETE: Every word in this city that still fits what you've got. Here's the count.
~clue
?n=1 PETE: One. One word between Eddie and the chair. Say it nice.
?n>1?n<=6 PETE: A handful. You could fit 'em on a betting slip.
?n>6?n<=40 PETE: A lot of words, Lexington, and not a lot of night.
?n>40 PETE: Too many. Ask better questions. Eddie's counting on it.
DASH: Thanks, Pete.
PETE: Don't thank me. Get him out. He owes me two bucks.
` },
{ id: 'c03.inf.nickel', chapter: 3, type: 'n', who: 'NICKEL', s: `
~fade
@set station!
NICKEL: Mister Lexington! I counted, like you showed me. On the shine-box lid, with chalk.
> Nickel had copied out a word list from a dictionary he'd found in the lost and found. He'd crossed out every word that didn't fit.
~clue
?n=1 NICKEL: Just one left. I circled it twice so it can't get away.
?n>1?n<=6 NICKEL: Only a few. I could shine all their shoes before the train.
?n>6?n<=40 NICKEL: That's a lot of shoes, mister.
?n>40 NICKEL: I ran out of chalk.
DASH: You're going to make a good detective, kid.
NICKEL: I'm gonna make a rich one.
` },
{ id: 'c03.inf.kow', chapter: 3, type: 'n', who: 'KOW', s: `
~fade
@set apartment!
@mood warm
KOW: Mr. Lexington. You are home at this hour? Then you are not working, and if you are not working, there is no rent.
DASH: I'm working, Mrs. Kowalski. I came for a clean shirt.
KOW: I listen to the radio. I know about the dockworker. So. I counted words for you, from my son's school dictionary.
~clue
?n=1 KOW: One. You see? Even I can do your job. Pay rent.
?n>1?n<=6 KOW: Few. Like the days until rent.
?n>6?n<=40 KOW: Many. Like the days since rent.
?n>40 KOW: Very many. Like your excuses.
DASH: I'll pay you Friday.
KOW: Every Friday, he says. One day a Friday will believe him.
` },
{ id: 'c03.inf.sal', chapter: 3, type: 'top', who: 'SAL', s: `
~fade
@set bar!
@mood warm
SAL: Sit. Eddie's crew drank here every Friday. They took up a collection, and then they took up the dictionary.
SAL: Forty dockworkers went through every word that could still be your Notary. One letter keeps showing up. {topL}.
~clue
?topPct=100 SAL: In every single one. Forty men can't all be wrong. Usually.
?topPct<100 SAL: {topPct} in a hundred. The boys argued about the rest. One of them threw a stool.
DASH: Tell them thanks.
SAL: Tell them yourself, at Eddie's welcome-home. I'm buying.
` },
{ id: 'c03.inf.zero', chapter: 3, type: 'top', who: 'ZERO', s: `
~fade
@set alley!
@mood violet
ZERO: The condemned man. I dreamed of him, detective. A chair, and a crossword with one word missing.
ZERO: The cards keep giving me {topL}. Over and over, like a stuck clock.
~clue
?topPct=100 ZERO: It is there, darling. Even the Hanged Man agrees, and he is never cheerful.
?topPct<100 ZERO: {topPct} chances in a hundred. The rest, the cards keep to themselves.
DASH: The Hanged Man.
ZERO: Don't look so worried. Tonight it is only a card.
` },
{ id: 'c03.inf.vera', chapter: 3, type: 'top', who: 'VERA', s: `
~fade
@set pressroom!
@mood warm
VERA: Dash. The Gazette is printing RUIZ TO DIE AT DAWN on page three. I'm proofing it so I don't have to think about it.
VERA: So I thought about your Notary instead. Every word that could be his. One letter turns up more than any other: {topL}.
~clue
?topPct=100 VERA: In all of them. I'd bet the headline on it.
?topPct<100 VERA: {topPct} out of a hundred. Not certain. Proofreaders are never certain. That's the job.
DASH: You stayed late for me.
VERA: I stayed late for Eddie. You just happened to be on the phone.
` },
{ id: 'c03.inf.prof', chapter: 3, type: 'pos', who: 'PROF', s: `
~fade
@set office!
@mood warm
PROF: Detective. I read about the dockworker. A confession he could barely have spelled. Disgraceful.
PROF: I've held your evidence against every word I know. The {posOrd} letter: {posL}, more often than not.
~clue
?posPct=100 PROF: Without exception. I would testify to it, if anyone ever asked a lexicographer anything.
?posPct<100 PROF: {posPct} times in a hundred. I won't claim more. Your Notary claims more. That's how you'll know him.
DASH: Thank you, Professor.
PROF: Thank the language, Detective. It hates a liar more than I do.
` },
{ id: 'c03.inf.eddie', chapter: 3, type: 'pos', who: 'EDDIE', s: `
~fade
@set penitentiary!
@mood blue
EDDIE: Detective. They let me have a pencil for the crossword. I been working on your fella instead.
EDDIE: Every word that fits what you told me, I wrote 'em in the margins. The {posOrd} letter. It's {posL}, mostly.
~clue
?posPct=100 EDDIE: Every time, Detective. Like a guy who always takes the same spot on the pier.
?posPct<100 EDDIE: {posPct} times out of a hundred. I counted twice. I got time.
DASH: You're good at this, Eddie.
EDDIE: Five years of the Sunday puzzle. Never thought it'd be the thing that saved me.
` },
{ id: 'c03.inf.fenn', chapter: 3, type: 'pos', who: 'FENN', s: `
~fade
@set morgue!
@mood sick
FENN: I like a puzzle that holds still, Lexington. Mr. Mercer holds very still.
FENN: Meanwhile I ran your word list. The {posOrd} slot is {posL}, more often than not.
~clue
?posPct=100 FENN: Every time. As certain as rigor mortis.
?posPct<100 FENN: {posPct} times in a hundred. Medicine has done worse with better odds.
DASH: You ran a word list between autopsies?
FENN: I ran it during one. Mr. Mercer didn't mind.
` },
{ id: 'c03.inf.dooley', chapter: 3, type: 'dbl', who: 'DOOLEY', s: `
~fade
@set precinct!
DOOLEY: Dash. I didn't trust anybody in Records tonight. Not after the seal. So I ran the list myself.
DOOLEY: Took a pencil and every name that could still be him. I looked for twins.
~clue
?dblPct>=50 DOOLEY: Better than even odds he's got a letter doubled up. Like the Fairweathers on his door.
?dblPct<50?dblPct>0 DOOLEY: Probably no twins. Probably. I'm not betting Eddie on probably.
?dblPct=0 DOOLEY: No repeats. Every letter's its own man.
DASH: You did this by hand?
DOOLEY: I didn't want anybody in this building touching it, Dash. Not tonight.
` },
{ id: 'c03.inf.briggs', chapter: 3, type: 'dbl', who: 'BRIGGS', s: `
~fade
@set precinct!
@mood noir
BRIGGS: Sit down, Lexington. I did something I haven't done since the academy. I did the paperwork myself.
BRIGGS: Every word that fits. I looked for doubles. Two of the same letter. Two of anything makes me suspicious tonight.
~clue
?dblPct>=50 BRIGGS: Better than a coin flip there's a repeat. I'd bet two fingers on it.
?dblPct<50?dblPct>0 BRIGGS: Probably all different. Like the stories I'm getting from my own night shift.
?dblPct=0 BRIGGS: No doubles. Not one. The only clean thing in this building tonight.
> He held up two fingers, then put one away. With Briggs, that's a whole speech.
` },
{ id: 'c03.inf.lola', chapter: 3, type: 'dbl', who: 'LOLA', s: `
~fade
@set street!
@mood warm
LOLA: Detective. You never called about my little job.
DASH: I've been busy saving a man's life.
LOLA: How heroic. Then here's a present for the hero. I count pairs, darling. Earrings, gloves, alibis.
~clue
?dblPct>=50 LOLA: Odds are your little word has a twin in it. Things that come in pairs are always trouble. Ask me.
?dblPct<50?dblPct>0 LOLA: Probably no twins. But I wouldn't stake my reputation on it. I'd stake yours.
?dblPct=0 LOLA: No pairs. A lonely word. I almost feel sorry for it.
DASH: Why are you helping me?
LOLA: Practice.
` }
];
