// Chapter 5 informants: type n | top | pos | dbl, three of each. The Professor's scene reads `g`: after the midpoint (guess 3) Dash has
// seen the Index pages in his style, and takes his help warily.

export const INFORMANTS = [
{ id: 'c05.inf.pete', chapter: 5, type: 'n', who: 'PETE', s: `
~fade
@set street!
~rain light
PETE: Lexington. I sold papers to every train out of that station for ten years. I know a man who's leaving.
PETE: I counted every word that still fits your evidence. Here's your number.
~clue
?n=1 PETE: One. One ticket, one seat, one fella.
?n>1?n<=6 PETE: A handful. Like a hand of cards. Play it right.
?n>6?n<=40 PETE: A good few. That's a dining car's worth.
?n>40 PETE: A whole train of 'em, Lexington. Twelve cars.
DASH: You're a good man, Pete.
PETE: Tell my bookie.
` },
{ id: 'c05.inf.kow', chapter: 5, type: 'n', who: 'KOW', s: `
~fade
@set street!
@mood warm
KOW: Mr. Lexington. I am at the station to meet my sister from Pittsburgh. Her train is late. Yours, I hear, is not.
KOW: While I wait, I count. The words that can still be your man.
~clue
?n=1 KOW: One. Even my sister would find him.
?n>1?n<=6 KOW: Few. Hurry.
?n>6?n<=40 KOW: Many. Hurry more.
?n>40 KOW: Very many. Also, the rent.
DASH: At four in the morning, Mrs. Kowalski?
KOW: Rent does not sleep, Mr. Lexington. Neither do I.
` },
{ id: 'c05.inf.mags', chapter: 5, type: 'n', who: 'MAGS', s: `
~fade
@set station!
MAGS: Detective. I'm in the PA booth with nothing to do but listen, so I did your arithmetic.
MAGS: Every word in the dictionary that fits what you've got. Here's the count.
~clue
?n=1 MAGS: One. Want me to announce it? Every speaker in the building.
?n>1?n<=6 MAGS: A few. I can read them over the PA if you like. Very dramatic.
?n>6?n<=40 MAGS: Plenty. Not hopeless. I don't do hopeless.
?n>40 MAGS: A lot. Ask a sharper question.
DASH: Thanks, Mags.
MAGS: Don't thank me. Bring him in. Lou would have liked trains.
` },
{ id: 'c05.inf.sal', chapter: 5, type: 'top', who: 'SAL', s: `
~fade
@set bar!
@mood warm
SAL: Sit. You're running all over that station on gin and nerves. Here's something better than gin.
SAL: Every word that could still be your Courier. One letter keeps coming up. {topL}.
~clue
?topPct=100 SAL: Every last one, Dash. I'd bet the yards on it.
?topPct<100 SAL: {topPct} in a hundred. I'd bet the gin.
DASH: What yards?
SAL: The freight yards. Where we used to... never mind. Go on. You'll miss your train.
` },
{ id: 'c05.inf.zero', chapter: 5, type: 'top', who: 'ZERO', s: `
~fade
@set alley!
@mood violet
ZERO: Detective. I read a card for a man in grey gloves last week. He tipped me a dollar. Nobody tips a fortune teller a dollar.
ZERO: Unless they don't want the future they paid for. My cards say {topL}.
~clue
?topPct=100 ZERO: Every card. The Chariot, darling. It always means a journey.
?topPct<100 ZERO: {topPct} chances in a hundred. The rest went north on the river line.
DASH: What did you tell him?
ZERO: That he'd meet a tall dark detective. He laughed. He shouldn't have.
` },
{ id: 'c05.inf.vera', chapter: 5, type: 'top', who: 'VERA', s: `
~fade
@set apartment!
@mood warm
VERA: You called to say you'll be late. You've said that every night this week.
VERA: So I did something useful while I waited. Every word that could be him. {topL} turns up more than anything.
~clue
?topPct=100 VERA: In all of them, Dash. Put it on the first line.
?topPct<100 VERA: {topPct} out of a hundred. I'd circle it. I wouldn't ink it.
DASH: I'll be home after the train.
VERA: Which train, Dash? There's always a train.
` },
{ id: 'c05.inf.prof', chapter: 5, type: 'pos', who: 'PROF', s: `
~fade
@set office!
@mood warm
?g<3 PROF: Detective. I heard about the porter on the radio. A man who called everyone "sir." Let me help.
?g>=3 PROF: Detective. You look at me differently tonight. I've no idea why. Let me help anyway.
PROF: I've held your evidence against my lists. The {posOrd} letter: {posL}, more often than not.
~clue
?posPct=100 PROF: Without exception. You may tell a jury I said so.
?posPct<100 PROF: {posPct} times in a hundred. I don't round, Detective. I never have.
?g>=3 DASH: Professor. What happened to your manuscript? The one they pulped in '46.
?g>=3 PROF: It was pulped, Detective. Every copy. I watched. Why do you ask?
?g<3 DASH: Thank you, Professor.
?g<3 PROF: Thank the porter. I only count.
` },
{ id: 'c05.inf.fenn', chapter: 5, type: 'pos', who: 'FENN', s: `
~fade
@set morgue!
@mood sick
FENN: Mr. Greer has his good cap on now. While his widow sat with him, I ran your list.
FENN: The {posOrd} letter is {posL}, more often than not.
~clue
?posPct=100 FENN: Every time. As sure as the river line.
?posPct<100 FENN: {posPct} times in a hundred. Not certain. Death is the only thing I'm certain of, and I'm very busy with it.
DASH: How's his widow?
FENN: Better than you'd think, Lexington. He left her a pension and twenty-two years of being called "sir." She's proud.
` },
{ id: 'c05.inf.eddie', chapter: 5, type: 'pos', who: 'EDDIE', s: `
~fade
@set docks!
EDDIE: Detective. The river line freight comes in past my pier. The boys saw the porter go off the back. We didn't know what we were seeing.
EDDIE: So I did the crossword for you. The {posOrd} square. It's {posL}, mostly.
~clue
?posPct=100 EDDIE: Every word, Detective. Like the 4 AM banana boat. Never misses.
?posPct<100 EDDIE: {posPct} times out of a hundred. I counted twice. I always count twice now.
DASH: Thanks, Eddie.
EDDIE: Mr. Greer used to wave to us from the caboose. Get the guy.
` },
{ id: 'c05.inf.dooley', chapter: 5, type: 'dbl', who: 'DOOLEY', s: `
~fade
@set station!
DOOLEY: Dash. I ran the list between platforms. I'm out of breath, so bear with me.
DOOLEY: Doubles. Same letter twice.
~clue
?dblPct>=50 DOOLEY: Better than even odds of a double. Like two of everything he carries.
?dblPct<50?dblPct>0 DOOLEY: Probably no doubles. Probably. I'm not betting the shield. I don't have it yet.
?dblPct=0 DOOLEY: No doubles. Every letter different, like his names.
DASH: Catch your breath, Dooley.
DOOLEY: No time, Dash. He's got a train.
` },
{ id: 'c05.inf.briggs', chapter: 5, type: 'dbl', who: 'BRIGGS', s: `
~fade
@set precinct!
@mood noir
BRIGGS: Lexington. The FBI asked me to stand down. I'm standing down at my desk, doing your sums.
BRIGGS: Doubles. Two of a letter. Two of anything, like this man's tickets.
~clue
?dblPct>=50 BRIGGS: Better than even there's a twin in there. Two fingers' worth.
?dblPct<50?dblPct>0 BRIGGS: Probably no twins. In my experience, "probably" is how trains leave without you.
?dblPct=0 BRIGGS: No twins. Every letter its own man.
> He held up two fingers, then one, then put his hand in his pocket like it had embarrassed him.
` },
{ id: 'c05.inf.nickel', chapter: 5, type: 'dbl', who: 'NICKEL', s: `
~fade
@set station!
NICKEL: Mister Lexington! I did the doubles thing. You know. Two of the same letter, like a pair of shoes.
NICKEL: I did it on the shine box with the polish. Brown for maybe, black for yes.
~clue
?dblPct>=50 NICKEL: Lotta black, mister. There's probably a pair in there.
?dblPct<50?dblPct>0 NICKEL: Mostly brown. Probably no pairs. Probably.
?dblPct=0 NICKEL: All brown! No pairs at all. Every letter's a single shoe.
DASH: That's good work, kid. That's real detective work.
NICKEL: Does it pay?
DASH: Not even a little.
NICKEL: Then I'll keep the shine stand.
` }
];
