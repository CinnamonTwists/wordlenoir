// Scenes after suspect 4. Key: '4-<bucket>'. Bucket 0: no hits · 1: 1-2 hits · 2: 3-4 hits · 3: five hits, wrong order.

export default {
'4-0': [
{ id: 'rnd.core.4-0.01', chapter: 0, s: `
@set precinct
@mood red
~tight
BRIGGS: Four suspects. Four nobodies. Badge, Lexington.
DASH: Captain...
BRIGGS: Badge. On the desk.
> I put it down. It sounded heavier than it was.
~stamp SUSPENDED
~flag suspended
> Two suspects left, no badge, and a city that didn't want to be saved.
** I'm still a detective. Even if nobody says so.
~loose
` },
{ id: 'rnd.core.4-0.02', chapter: 0, s: `
@set apartment!
@mood blue
> The apartment was quiet. Too quiet. Her coat was gone from the hook.
> There was a note on the table. Five words. Those, I could read just fine.
~paper NOTE ON THE KITCHEN TABLE|I'M DONE WAITING UP, DASH.
~flag vera_gone
> {GUESS} didn't have a single letter. Neither did my marriage, apparently.
** She left the light on. That was the cruelest part.
` },
{ id: 'rnd.core.4-0.03', chapter: 0, s: `
@set apartment!
@mood sick
> Mrs. Kowalski was waiting at my apartment door with a key and a look.
KOW: Three months, Mr. Lexington. Three months of rent.
DASH: I'm in the middle of something.
KOW: You are always in the middle of something. Out.
~stamp EVICTED
~flag evicted
> {GUESS}. Zero for five. I carried my desk lamp down the stairs like a wreath to a funeral.
` }
],
'4-1': [
{ id: 'rnd.core.4-1.01', chapter: 0, s: `
@set alley
@mood blue
> {GUESS}. {HitsN}. Crumbs, at {time}.
> I was running out of night, and the night was running out of patience.
DOOLEY: Dash. Go home.
DASH: Home is where the word isn't.
DOOLEY: That's not how the saying goes.
DASH: It's how mine goes.
` },
{ id: 'rnd.core.4-1.02', chapter: 0, s: `
@set bar
SAL: You look like a man with two bullets left.
DASH: {GUESS} gave me {hitsN}. It's not enough.
SAL: Then make the last two count.
> He poured. I didn't drink it. Some nights you need your hands steadier than your nerves.
` },
{ id: 'rnd.core.4-1.03', chapter: 0, s: `
@set precinct
@mood red
BRIGGS: Four down. You're running on fumes, Lexington.
DASH: I've got {hitsN} out of {GUESS}. I'm building a face.
BRIGGS: Build faster. If that train leaves, the Commissioner wants your badge on his desk by six.
~heart
~flag warned
` }
],
'4-2': [
{ id: 'rnd.core.4-2.01', chapter: 0, s: `
@set street
@mood gold
> {GUESS}. {HitsN}. The word was cornered. I could hear it breathing in the dark.
~fade
@set phonebooth!
~sfx ring
WORD: You're getting warm, detective.
DASH: I'm getting close.
WORD: Warm and close aren't the same thing. Ask anyone who's stood too near a fire.
~sfx hangup
` },
{ id: 'rnd.core.4-2.02', chapter: 0, s: `
@set precinct
> {GUESS} gave up {hitsN} before I even took my coat off.
BRIGGS: Two suspects left, and you've got it boxed in?
DASH: Boxed. Taped. Ready to mail.
BRIGGS: Then mail it, Lexington. Before dawn.
!!@DASH TWO MORE.
` },
{ id: 'rnd.core.4-2.03', chapter: 0, s: `
@set rooftop
@mood blue
> I stood at the edge of the roof and let the wind clear my head.
> {HitsN} from {GUESS}. The rest of the word was down there, in the light between two buildings.
** I know where you're standing.
` }
],
'4-3': [
{ id: 'rnd.core.4-3.01', chapter: 0, s: `
@set precinct
@mood red
> {GUESS}. All five letters, all guilty. All in the wrong seats.
DASH: Two chances left to put you in order.
~heart
** I have you. I just can't hold you.
` },
{ id: 'rnd.core.4-3.02', chapter: 0, s: `
@set office
> I wrote the letters of {GUESS} on five matchbooks and lined them up on the desk.
> Every arrangement looked like a confession. Only one of them was true.
~sfx ring
WORD: Tick tock, detective.
~sfx hangup
` }
]
};
