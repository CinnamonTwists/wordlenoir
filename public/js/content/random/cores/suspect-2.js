// Scenes after suspect 2. Key: '2-<bucket>'. Bucket 0: no hits · 1: 1-2 hits · 2: 3-4 hits · 3: five hits, wrong order.

export default {
'2-0': [
{ id: 'rnd.core.2-0.01', chapter: 0, s: `
@set alley
~rain heavy
> Second suspect. {GUESS}. Five alibis again. Five more doors slammed in my face.
> Two suspects in, and nothing to show for it but wet shoes.
DOOLEY: Captain's asking about you.
DASH: Tell him I'm narrowing it down.
DOOLEY: Is that what we're calling this?
> The alley smelled like garbage and rain. So did my case.
` },
{ id: 'rnd.core.2-0.02', chapter: 0, s: `
@set bar
> I ordered a rye and stared at {GUESS} written on a napkin.
> Not one letter. Not one. The kind of whiff that makes a man doubt his instincts.
SAL: You want some advice?
DASH: No.
SAL: Try different letters.
> He wasn't wrong. Sal is never wrong. That's what makes him unbearable.
` },
{ id: 'rnd.core.2-0.03', chapter: 0, s: `
@set office
~sfx ring
VERA: Dash? It's {time}.
DASH: I'm working, Vera.
VERA: You're always working. Did you even find anything?
DASH: I found out what it isn't.
VERA: That's what you always say.
~sfx hangup
> She was right about that too. Everybody was right tonight except me.
` }
],
'2-1': [
{ id: 'rnd.core.2-1.01', chapter: 0, s: `
@set precinct
> {GUESS} gave me {hitsN}. Not a confession. More like a nervous cough.
DASH: You're going to tell me where your friends are standing.
> It didn't say a word. It didn't have to. I wrote down what it gave me and sent it home.
> Two suspects down. The picture was coming in like a radio in a thunderstorm.
` },
{ id: 'rnd.core.2-1.02', chapter: 0, s: `
@set street
@mood blue
> The rain slowed to a drizzle. {GUESS} slowed to a crawl.
> {HitsN}. Something to work with. I've closed cases with less. I've lost cases with more.
~sfx siren
> Somewhere a siren was going somewhere important. I envied it.
` },
{ id: 'rnd.core.2-1.03', chapter: 0, s: `
@set docks
PETE: Heard you brought in {GUESS}.
DASH: News travels fast.
PETE: Bad news travels faster. How'd it go?
DASH: {HitsN} came clean. The rest walked.
PETE: Could be worse.
DASH: It's {time}, Pete. Give it an hour.
` }
],
'2-2': [
{ id: 'rnd.core.2-2.01', chapter: 0, s: `
@set precinct
@mood gold
> Second suspect, {GUESS}, and the lamp lit up like the Fourth of July.
> {HitsN}. The word's whole neighborhood, in one interrogation room.
BRIGGS: Well, I'll be damned.
DASH: Probably, Captain. But not tonight.
!!@DASH CLOSING IN.
` },
{ id: 'rnd.core.2-2.02', chapter: 0, s: `
@set rooftop
> The city spread out below like a crossword nobody finished.
> {GUESS} gave me {hitsN}. The word was down there somewhere. I could feel it breathing.
** I know your shape now.
` },
{ id: 'rnd.core.2-2.03', chapter: 0, s: `
@set bar
SAL: The look on your face. You got something.
DASH: {GUESS}. {HitsN} sang like canaries.
?greens>0 DASH: And {greensN} right where they belong.
SAL: So you're close.
DASH: Close is where most of my cases go to die, Sal.
` }
],
'2-3': [
{ id: 'rnd.core.2-3.01', chapter: 0, s: `
@set precinct
@mood red
> {GUESS}. All five letters, guilty as sin. And somehow, still not the word.
> They were all in the room. They'd just been sitting in each other's seats.
** Right letters. Wrong order.
DASH: Somebody's rearranging the furniture.
` },
{ id: 'rnd.core.2-3.02', chapter: 0, s: `
@set office
> I spread the letters of {GUESS} across the desk like a deck of marked cards.
> Every one of them belonged to the word. I just had to deal them in the right order.
~sfx ring
WORD: Shuffle all you like, detective. The house always wins.
~sfx hangup
` }
]
};
