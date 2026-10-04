// Scenes after suspect 5. Key: '5-<bucket>'. Bucket 0: no hits · 1: 1-2 hits · 2: 3-4 hits · 3: five hits, wrong order.

export default {
'5-0': [
{ id: 'rnd.core.5-0.01', chapter: 0, s: `
@set alley
@mood red
~rain heavy
~lightning
~tight
> Five suspects. Five nobodies. The last one, {GUESS}, didn't even know what it was charged with.
?suspended > No badge. No partner. No luck.
?!suspended > The Captain stopped calling an hour ago. That's how you know it's bad.
?vera_gone > No wife. Just a note on a table and a light left on.
> One suspect left. And the sun already clearing its throat behind the bay.
** The city is waiting to watch me fall.
~loose
` },
{ id: 'rnd.core.5-0.02', chapter: 0, s: `
@set bar
SAL: We're closed, Lexington.
DASH: Pour me one anyway.
SAL: You've taken five swings and missed every one.
DASH: Then I'll make the sixth one count.
SAL: That's what they all say at five in the morning.
> He poured coffee instead. Black. Like everything else tonight.
` },
{ id: 'rnd.core.5-0.03', chapter: 0, s: `
@set apartment!
@mood blue
> I sat on the edge of the bed in the dark. {GUESS} hadn't given me a thing.
?vera_gone > Her side of the closet was empty. The hangers clicked together like teeth.
?!vera_gone > Vera was asleep. Or pretending. I couldn't tell anymore, and that scared me more than the word.
> One more. One last suspect before the 6:00 train.
** Make it count, Dash.
` }
],
'5-1': [
{ id: 'rnd.core.5-1.01', chapter: 0, s: `
@set street
~rain heavy
> {GUESS} gave up {hitsN} and nothing else.
> One suspect left. The whole night comes down to one name, said out loud in an empty street.
DOOLEY: Whatever you pick, I'm with you.
DASH: Even if I'm wrong?
DOOLEY: Especially if you're wrong. Somebody's got to carry you home.
` },
{ id: 'rnd.core.5-1.02', chapter: 0, s: `
@set precinct
@mood red
~tight
BRIGGS: Last chance, Lexington. I mean it this time.
DASH: {HitsN} from {GUESS}, Captain. It's in there.
BRIGGS: It's five in the morning, and "in there" doesn't make the papers.
~heart
** One name. One shot.
~loose
` },
{ id: 'rnd.core.5-1.03', chapter: 0, s: `
@set station
> The 6:00 sat on the tracks, steaming like it knew something I didn't.
> {GUESS} gave me {hitsN}. The word was already on the platform. I could feel it.
~sfx whistle
** It's buying its ticket right now.
` }
],
'5-2': [
{ id: 'rnd.core.5-2.01', chapter: 0, s: `
@set station
@mood gold
> {GUESS}. {HitsN}. The word was so close I could read the label in its coat.
~sfx whistle
~sfx ring
WORD: Last call, detective.
DASH: Last call's for amateurs. I'm a professional.
~sfx hangup
!!@DASH ONE MORE. THAT'S ALL I NEED.
` },
{ id: 'rnd.core.5-2.02', chapter: 0, s: `
@set precinct
BRIGGS: Well?
DASH: {HitsN} out of {GUESS}. I know its face, Captain. I just need its name.
BRIGGS: Then say it. And Lexington?
DASH: Yeah?
BRIGGS: Say it right.
` },
{ id: 'rnd.core.5-2.03', chapter: 0, s: `
@set rooftop
@mood gold
> The sky over the bay was going gray at the edges. Dawn, coming in like a creditor.
> {GUESS} gave me {hitsN}. I closed my eyes and saw the word standing in the station, collar up.
** One more name. Make it the right one.
` }
],
'5-3': [
{ id: 'rnd.core.5-3.01', chapter: 0, s: `
@set station
@mood red
~tight
> {GUESS}. Five for five, every letter guilty. Still the wrong word.
> One move left. Rearrange the letters, or lose them all.
~heart
** I have every piece. I just need the picture.
~loose
` },
{ id: 'rnd.core.5-3.02', chapter: 0, s: `
@set office
~sfx ring
WORD: You have all my letters, Lexington. And one guess left.
WORD: Most men would crack.
DASH: I'm not most men.
WORD: No. You're tired.
~sfx hangup
` }
]
};
