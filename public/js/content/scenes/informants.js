// Informants: type n (candidate count) | top (letter odds) | pos (letter at position) | dbl (double letters)
export const INFORMANTS = [
{ id: 'pete', type: 'n', who: 'PETE', s: `
~fade
@set street!
~rain light
PETE: Psst. Lexington. Over here, by the newsstand.
> Lucky Pete. He sells newspapers for a nickel and other people's secrets for a dollar.
PETE: I been doing arithmetic, see. Every word in town that fits what you got so far.
~clue
?n=1 PETE: Just the one, Lexington. You've met it. You just don't know it yet.
?n>1?n<=6 PETE: That's a short line-up. Don't fumble it.
?n>6?n<=40 PETE: Thinning out. Ask the right questions and they'll start tripping over each other.
?n>40 PETE: That's a lot of doors to knock on. Better knock smart.
DASH: Put it on my tab, Pete.
PETE: You don't got a tab, Lexington. You got a debt.
` },
{ id: 'zero', type: 'top', who: 'ZERO', s: `
~fade
@set alley!
@mood violet
> A beaded curtain in a doorway off the alley. A painted sign: MADAME ZERO. SEES ALL. CASH ONLY.
ZERO: Sit, detective. The cards have been waiting for you all night.
ZERO: There is a letter that hangs over your case like smoke. {topL}.
~clue
?topPct=100 ZERO: It is certain, darling. The cards do not lie. Neither do I. Usually.
?topPct<100 ZERO: {topPct} chances in a hundred, the cards say. The rest is up to you.
DASH: What do I owe you?
ZERO: Your soul. But I'll take a dollar.
` },
{ id: 'prof', type: 'pos', who: 'PROF', s: `
~fade
@set office!
@mood warm
PROF: Detective. Forgive the hour. I've been up running the numbers.
PROF: I took every word in my dictionary and held it up against your evidence.
PROF: The {posOrd} letter. It is {posL}, more often than not.
~clue
?posPct=100 PROF: In every single case. Without exception. I'd stake my tenure on it.
?posPct<100 DASH: More often than not isn't a sure thing, Professor.
?posPct<100 PROF: Nothing in language is a sure thing. That's what makes it beautiful.
` },
{ id: 'dooley', type: 'dbl', who: 'DOOLEY', s: `
~fade
@set precinct!
DOOLEY: Dash. I ran every candidate through Records. Thought you'd want to see this.
~clue
?dblPct>=50 DOOLEY: Better than even odds this word's got a twin in it. Same letter, twice.
?dblPct<50?dblPct>0 DOOLEY: Odds are every letter's different. But I wouldn't bet the pension on it.
?dblPct=0 DOOLEY: No twins, Dash. Every letter in it is an only child.
DASH: You're a good cop, Dooley.
DOOLEY: I'm a tired cop. Go get it.
` },
{ id: 'sal', type: 'top', who: 'SAL', s: `
~fade
@set bar!
SAL: Lexington. Got a minute? I got something for you.
SAL: The back room's been running a book on your case all night. Odds on every letter.
SAL: Smart money's on {topL}.
~clue
?topPct=100 SAL: Nobody's taking the other side of that bet. Nobody.
?topPct<100 SAL: {topPct} to a hundred. I'm not saying bet the farm. I'm saying look at the farm.
DASH: Since when do you run numbers, Sal?
SAL: Since never. Drink your coffee.
` },
{ id: 'nickel', type: 'pos', who: 'NICKEL', s: `
~fade
@set street!
NICKEL: Shine, mister? I'll throw in a tip. Free of charge.
NICKEL: Heard two hoods talking by the hydrant. Said your word's got {posArt} {posL} in the {posOrd} spot.
~clue
DASH: They sure about that?
?posPct=100 NICKEL: Sure as Sunday, mister.
?posPct<100 NICKEL: {posPct} cents on the dollar, mister. That's what they said.
> I gave the kid a quarter. He'd earned it. The shine was terrible.
` },
{ id: 'telegram', type: 'n', who: null, s: `
~fade
@set office!
~sfx telegraph
> A telegram under the door. No sender. No return address. Typed in a hurry.
~paper WESTERN WIRE · NO SENDER|{NWORDS} STILL {FIT} YOUR EVIDENCE STOP YOU ARE CLOSER THAN YOU THINK STOP A FRIEND
?n=1 > One word. Somebody out there wanted me to win. That worried me more than losing.
?n>1 > Somebody out there was rooting for me. In this city, that's a reason to check behind you.
` },
{ id: 'fenn', type: 'n', who: 'FENN', s: `
~fade
@set precinct!
@mood blue
FENN: Dash. Coroner's office. I count bodies all day. Tonight I counted words.
FENN: I measured every word in the city against your evidence. Like fitting a coat.
~clue
?n=1 FENN: One coat fits, Dash. Go put it on its owner.
?n>1?n<=10 FENN: A handful. You could fit them all in one elevator.
?n>10 FENN: Still a crowd. But crowds thin out. They always do.
` },
{ id: 'lola', type: 'top', who: 'LOLA', s: `
~fade
@set street!
@mood noir
LOLA: Detective. Don't look at me like that. I'm here to help.
LOLA: My husband used to doodle one letter on every napkin. {topL}. Over and over. I never knew why.
~clue
DASH: You expect me to trust you?
LOLA: I expect you to need me. That's better than trust.
` }
];
