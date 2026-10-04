// Chapter 6 cores, suspect 1 (just after midnight). Key: '<guess>-<bucket>'. Bucket 0: no hits · 1: 1-2 · 2: 3-4 · 3: five, wrong order.

export const CORES1 = {
'1-0': [
{ id: 'c06.core.1-0.01', chapter: 6, s: `
@set records
> I said {GUESS} on the steps of the Hall of Records. The building didn't answer. Buildings that are about to burn never do.
DOOLEY: Five strangers, Dash.
DASH: Then they can go home. Everybody else already has.
` },
{ id: 'c06.core.1-0.02', chapter: 6, s: `
@set precinct
BRIGGS: {GUESS}? Nothing. And the Mayor's office just called to ask why I've evacuated three city buildings on a Monday.
DASH: Because one of them is going to explode.
BRIGGS: That's what I said. They asked if it could explode on a weekend.
` },
{ id: 'c06.core.1-0.03', chapter: 6, s: `
@set street
> {GUESS}: nothing. Water Street, outside Pike's rooming house. A window on the third floor was full of birdcages, every one covered with a cloth for the night.
DOOLEY: He tucked them in, Dash.
DASH: He's a tender man. That's how he gets close enough to the things he wants to destroy.
` },
{ id: 'c06.core.1-0.04', chapter: 6, s: `
@set office
> {GUESS} came up empty. I spread the Hall of Records floor plan on my desk. Four storeys of deeds, wills, court files, and birth certificates.
DASH: Every person in this city is in that building, Dooley. On paper.
DOOLEY: And the paper's all that proves they're anybody.
` },
{ id: 'c06.core.1-0.05', chapter: 6, s: `
@set alley
> The alley beside the Hall of Records. The bomb squad's truck was parked with its lights off, its men smoking at a respectful distance.
> {GUESS} came up clean. The squad sergeant shook his head at me before I'd even asked.
DASH: Can't you cut it?
> He held up a hand with three fingers missing. That was his whole answer.
` }],
'1-1': [
{ id: 'c06.core.1-1.01', chapter: 6, s: `
@set records
> {GUESS} gave me {hitsN}. From the basement stairwell I could hear it: a canary, singing in the dark beside the charge.
DOOLEY: It sounds happy.
DASH: He fed it before he left. It doesn't know what it's sitting next to.
DOOLEY: Neither did we, until tonight.
` },
{ id: 'c06.core.1-1.02', chapter: 6, s: `
@set street
DOOLEY: {GUESS} had {hitsN}, Dash. And the landlady on Water Street says Mr. Pike left at ten with his good coat and a birdseed bag.
DASH: Birdseed.
DOOLEY: For the basement canary. She thought he was going to visit a friend.
` },
{ id: 'c06.core.1-1.03', chapter: 6, s: `
@set precinct
BRIGGS: {HitsN}. Good. Here's Pike's army record. Silver Star, the Rhine. Blew a bridge with his own platoon still on the far bank, because the order said so.
DASH: Did they make it?
BRIGGS: Half of them. He visits the other half every Sunday. Cemetery on the hill.
` },
{ id: 'c06.core.1-1.04', chapter: 6, s: `
@set rooftop
> {HitsN} in {GUESS}. From the roof across the street, the Hall of Records looked like a wedding cake somebody had left out in the rain.
DASH: If I were Pike, I'd watch from up here.
DOOLEY: Is he up here?
> There was a deck chair, a thermos, and a birdcage cover folded neatly on the chair. Still warm.
` },
{ id: 'c06.core.1-1.05', chapter: 6, s: `
@set bar
SAL: You look like a man who's been near a bomb.
DASH: {GUESS} had {hitsN}. The bomb's at the Hall of Records.
SAL: What time did you get home last night, Dash?
DASH: Three.
SAL: And the night before?
> He never asks who I'm chasing. In twenty years he's never once asked me who. Only when I got home.
` },
{ id: 'c06.core.1-1.06', chapter: 6, s: `
@set phonebooth
~sfx ring
MAGS: Detective. I'm listening to the bomb squad's radio. They've sent for the Army. The Army says six hours from Fort Dix.
DASH: We have five and a half.
MAGS: That's what I told them. They said they'd hurry.
> {GUESS} had {hitsN}. The Army was coming. Pike had been the Army, once.
` }],
'1-2': [
{ id: 'c06.core.1-2.01', chapter: 6, s: `
@set records
> First suspect, and {GUESS} lit {hitsN}. Somewhere below me, the canary stopped singing for exactly three seconds. Then it started again.
DOOLEY: Did it hear you?
DASH: Canaries can hear a mine settle a mile down, Dooley. They can hear a man getting close.
` },
{ id: 'c06.core.1-2.02', chapter: 6, s: `
@set precinct
BRIGGS: {HitsN}, first time out. Don't celebrate. City Hall says if this turns out to be a hoax, they'll have my badge for the evacuation.
DASH: And if it isn't a hoax?
BRIGGS: Then they'll have my badge for not stopping it. Either way, Lexington, I'm buying a new hat.
` },
{ id: 'c06.core.1-2.03', chapter: 6, s: `
@set street
> {GUESS}: {hitsN}. Pike's landlady let us into his room. Six birdcages, all empty. Six little water dishes, all freshly filled.
DOOLEY: Where are the birds?
DASH: He let them go, Dooley. He's not coming back for them.
!!@DASH HE'S FINISHED HERE.
` },
{ id: 'c06.core.1-2.04', chapter: 6, s: `
@set office
> {HitsN} out of {GUESS}. Pike's discharge papers, notarized in 1946. The seal was a Fairweather seal.
DOOLEY: The Notary again.
DASH: Everybody in this thing has been stamped by somebody, Dooley. That's how they get in.
` },
{ id: 'c06.core.1-2.05', chapter: 6, s: `
@set alley
> {GUESS} put {hitsN} in his name. The bomb squad sergeant came out of the basement for a cigarette with his hands shaking.
DASH: How bad?
> He drew it for me on the back of a matchbook. A cylinder, a clock, six wires, and a little circle in the middle. A full stop.
` },
{ id: 'c06.core.1-2.06', chapter: 6, s: `
@set apartment
VERA: You called. You never call from a case.
DASH: There's a bomb under the Hall of Records, Vera. I wanted to hear your voice.
VERA: {HitsN}, you said? Then come home with the rest of him. I'll wait up.
> She'd stopped waiting up a year ago. She said it like she meant to start again.
` }],
'1-3': [
{ id: 'c06.core.1-3.01', chapter: 6, s: `
@set records
> {GUESS}. Every letter of him, every one in the wrong place. Like a fuse wired by somebody who wants you to guess.
DOOLEY: He's all here, Dash.
DASH: So's the bomb. The question's which one goes first.
` },
{ id: 'c06.core.1-3.02', chapter: 6, s: `
@set precinct
BRIGGS: Five for five on the first try. Pike's whole name, scrambled.
DASH: Like his platoon on the wrong side of the river.
BRIGGS: Don't, Lexington. Not tonight.
` },
{ id: 'c06.core.1-3.03', chapter: 6, s: `
@set rooftop
> {GUESS}: all of him, out of order. On the roof, his deck chair faced the Hall of Records like a man waiting for a parade.
** Every letter of him. The fuse still burning.
` }]
};
