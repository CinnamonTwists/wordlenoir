// Scenes after suspect 3. Key: '3-<bucket>'. Bucket 0: no hits · 1: 1-2 hits · 2: 3-4 hits · 3: five hits, wrong order.

export default {
'3-0': [
{ id: 'rnd.core.3-0.01', chapter: 0, s: `
@set precinct
@mood red
BRIGGS: Three suspects, Lexington. And the last one didn't even know the word existed.
DASH: It's a process, Captain.
BRIGGS: The Commissioner calls every hour. You know what I tell him?
DASH: That I'm the best you've got.
BRIGGS: I tell him I'm looking for someone better.
~stamp FINAL WARNING
~flag warned
> Half the night was gone. The other half was looking for the exit.
` },
{ id: 'rnd.core.3-0.02', chapter: 0, s: `
@set apartment!
@mood blue
> I went home for a clean shirt. Vera was waiting up. That's never good.
VERA: You look like hell.
DASH: {GUESS}. Five letters, five alibis.
VERA: I don't care about the letters, Dash. I care that it's {time} and I'm alone again.
> The door didn't slam when I left. That was worse. Slams mean somebody still cares.
~flag vera_upset
` },
{ id: 'rnd.core.3-0.03', chapter: 0, s: `
@set alley
~rain heavy
~lightning
> {GUESS}. Nothing. The kind of nothing that echoes.
> Three suspects down, and I was further away than when I started.
** The trail is going cold.
> I lit a cigarette. The match went out twice. Even the fire was giving up on me.
` }
],
'3-1': [
{ id: 'rnd.core.3-1.01', chapter: 0, s: `
@set bar
> Halfway through the night. {GUESS} gave me {hitsN}, and I'd take it.
DOOLEY: Three in. What've we got?
DASH: Letters. A few. Pieces of a face.
DOOLEY: And the rest?
DASH: The rest is out there in the rain, laughing at us.
` },
{ id: 'rnd.core.3-1.02', chapter: 0, s: `
@set phonebooth
~sfx ring
WORD: Halfway there, detective. Or halfway to nowhere.
DASH: {GUESS} gave you up. {HitsN}.
WORD: Did it? Or did I let it?
~sfx hangup
> A word that plays games is a word that thinks it can't lose. That's the kind that always slips.
` },
{ id: 'rnd.core.3-1.03', chapter: 0, s: `
@set precinct
> Third suspect. {GUESS}. It gave up {hitsN} and asked for a lawyer.
> I gave it a cigarette and a long look. It didn't give me anything else.
BRIGGS: Three hours, Lexington. Three.
> He held up three fingers like I couldn't count. In fairness, I was struggling with five.
` }
],
'3-2': [
{ id: 'rnd.core.3-2.01', chapter: 0, s: `
@set precinct
@mood gold
> {GUESS} cracked under the lamp. {HitsN}, singing in harmony.
BRIGGS: That's more like it.
DASH: It's close, Captain. I can feel it in my teeth.
BRIGGS: Your teeth don't make arrests.
!!@DASH ALMOST.
` },
{ id: 'rnd.core.3-2.02', chapter: 0, s: `
@set rooftop
@mood blue
> From up here the city looked almost honest.
> {GUESS} gave me {hitsN}. I could see the word's outline now, standing just past the streetlight.
~sfx thunder
** It's standing right in front of me.
` },
{ id: 'rnd.core.3-2.03', chapter: 0, s: `
@set bar
VERA: Sal said I'd find you here.
DASH: {GUESS}. {HitsN}, Vera. I'm close.
VERA: You've been close for eleven years, Dash.
> She took my cigarette and finished it. She always did that right before she forgave me.
~flag vera_soft
` }
],
'3-3': [
{ id: 'rnd.core.3-3.01', chapter: 0, s: `
@set precinct
@mood red
> Every letter in {GUESS} is guilty. And not one of them will tell me the order.
DASH: It's in here. The whole word is in this room.
~heart
** I'm looking right at it.
` },
{ id: 'rnd.core.3-3.02', chapter: 0, s: `
@set office
~sfx ring
WORD: You have all of me now, Lexington. Every letter.
DASH: Then stand still.
WORD: Make me.
~sfx hangup
` }
]
};
