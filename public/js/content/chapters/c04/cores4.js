// Chapter 4 cores, suspect 4 (around three). One reads chapter 3's notary_free: the Notary's four o'clock appointment at Studio B.

export const CORES4 = {
'4-0': [
{ id: 'c04.core.4-0.01', chapter: 4, s: `
@set studio
> Three o'clock. {GUESS} came up empty. Celeste was reading a poem on the air, softly, about a man who never came home.
MAGS: She does that when she wants to hurt somebody.
DASH: Who's she hurting?
MAGS: You, Detective. She keeps looking at you.
` },
{ id: 'c04.core.4-0.02', chapter: 4, s: `
@set phonebooth
> I was standing in the booth outside WKRN with the receiver already in my hand, about to call Vera. {GUESS} had come up empty.
> Then the voice came through the earpiece. The bell hadn't rung yet. It rang after, once, like an afterthought.
WORD: Three hours, Lexington. Are you going to say goodbye to her, or am I?
DASH: Which her?
WORD: Ah. That's the question.
~sfx hangup
` },
{ id: 'c04.core.4-0.03', chapter: 4, s: `
@set street
> {GUESS}: nothing. A milk truck went by. The driver had WKRN on, and he was singing along to her song.
DOOLEY: Even the milkman, Dash.
DASH: Especially the milkman. Who else is awake to love her?
` },
{ id: 'c04.core.4-0.04', chapter: 4, s: `
@set precinct
BRIGGS: {GUESS}? Nothing? Three o'clock, Lexington. The Councilman's lawyer found a judge.
DASH: Which judge?
BRIGGS: Judge Haverly. The Councilman's brother. He's issuing an order at five keeping you off the premises entirely.
` },
{ id: 'c04.core.4-0.05', chapter: 4, s: `
@set bar
SAL: Nothing in {GUESS}?
DASH: Five innocent letters.
SAL: There's a lot of innocence going around tonight. Must be the weather.
> He had the radio on low now. She was reading the weather. Clear skies at dawn, she said, like she'd arranged them.
` }],
'4-1': [
{ id: 'c04.core.4-1.01', chapter: 4, s: `
@set studio
> Four o'clock, near enough. {GUESS} had {hitsN}. The Notary's appointment. Studio B, four in the morning.
?!notary_free > Nobody came up the service stairs. Augustin Fairweather was in a cell downtown, crying into a county blanket.
?notary_free > A little man in a big coat came up the service stairs with a seal in his pocket. He saw me, burst into tears, and ran back down.
MAGS: Who was that supposed to be?
DASH: Somebody who swears to things. She was going to have the six o'clock news notarized.
` },
{ id: 'c04.core.4-1.02', chapter: 4, s: `
@set rooftop
MAGS: {GUESS}, {hitsN}. Detective, I can't kill the transmitter without the chief engineer's key. He's in Miami.
DASH: Can you do it without a key?
MAGS: Sure. With a wrench. Then I go to jail and lose my license.
DASH: Would you?
MAGS: Ask me at five fifty-nine.
` },
{ id: 'c04.core.4-1.03', chapter: 4, s: `
@set office
> {HitsN} in {GUESS}. Mags had matched the six o'clock script line by line against her logs.
MAGS: "Traffic will be light this morning on the river bridges." It's never been in the script before. She added it herself, in pencil.
DASH: Who's listening for it?
MAGS: Somebody who needs to know the coast is clear.
` },
{ id: 'c04.core.4-1.04', chapter: 4, s: `
@set apartment
VERA: {HitsN}. Dash, she just said your name. On the air. Not "a gentleman." Your name.
DASH: What did she say?
VERA: "Good morning, Dash Lexington. You look tired." How does she know what you look like?
DASH: She's been watching me through the glass all night.
VERA: That's not what I asked.
` },
{ id: 'c04.core.4-1.05', chapter: 4, s: `
@set street
DOOLEY: {GUESS} had {hitsN}. And I found Halvorsen. The hardware man. He was hiding in his own storeroom behind the paint cans.
DASH: Alive?
DOOLEY: Alive and scared. He said he heard the ad and knew what it meant. He's been waiting for somebody to come.
` },
{ id: 'c04.core.4-1.06', chapter: 4, s: `
@set morgue
FENN: {HitsN}. Here's my contribution: the cable around Benning's neck has her fingerprints on it. Lipstick too.
DASH: That's enough for a jury.
FENN: For a jury, yes. For a court order and a councilman, no. You still need her name, Lexington. The real one.
` }],
'4-2': [
{ id: 'c04.core.4-2.01', chapter: 4, s: `
@set studio
> {GUESS} lit {hitsN}. Celeste came out for a cigarette and stood very close.
CELESTE: You're good, Lexington. I'll give you that. Nobody's ever gotten this close.
DASH: Lou Benning got close.
CELESTE: Lou got close to the wrong cable, darling. I'd hate for you to trip over one.
` },
{ id: 'c04.core.4-2.02', chapter: 4, s: `
@set rooftop
> {HitsN} in {GUESS}. Mags was unscrewing a panel on the transmitter housing with a dime.
MAGS: If I pull this fuse, we go dark for an hour. If I pull this one, we're off for a week.
DASH: And the six o'clock news?
MAGS: Doesn't go anywhere. Neither does the phrase. Give me her name first, Detective. Then I'll pull the right one.
` },
{ id: 'c04.core.4-2.03', chapter: 4, s: `
@set precinct
BRIGGS: {HitsN}. You've got two hours, an engineer with a dime, and a judge's order coming at five.
DASH: I've had worse.
BRIGGS: Name one night.
DASH: Every one of them, Captain.
!!@BRIGGS THEN DON'T STOP.
` },
{ id: 'c04.core.4-2.04', chapter: 4, s: `
@set street
> {GUESS}: {hitsN}. Outside WKRN, the Councilman's car pulled up and a man in a camel-hair coat got out with a paper in his hand.
DOOLEY: That's the lawyer, Dash.
DASH: Then stand between him and the door, Dooley. You're good at standing.
DOOLEY: I'm great at standing.
` },
{ id: 'c04.core.4-2.05', chapter: 4, s: `
@set bar
SAL: {HitsN}. That woman's been on the radio all night saying your name like she owns it.
DASH: She doesn't.
SAL: I know she doesn't, Dash. Nobody owns you. Not even you. Go get her.
` },
{ id: 'c04.core.4-2.06', chapter: 4, s: `
@set office
MAGS: {GUESS} had {hitsN}. Look at June again. And July. Every time she dedicated a song to a target, she smoked a Chesterfield on the air.
DASH: You can hear that?
MAGS: I can hear the match, Detective. Tonight she's lit eleven. That's the most since I started logging.
` }],
'4-3': [
{ id: 'c04.core.4-3.01', chapter: 4, s: `
@set studio
> {GUESS}. All her letters, none in tune. Two questions left. Celeste was reading the farm report like a love letter.
MAGS: She's rattled. She just read the price of hogs twice.
DASH: Then let's rattle her once more.
` },
{ id: 'c04.core.4-3.02', chapter: 4, s: `
@set rooftop
> All five letters, every one in the wrong slot. The tower blinked above me, red, red, red.
MAGS: You've got her whole name. You just don't have it in order.
DASH: Like a dedication with the names switched.
MAGS: Exactly like that. Fix it before she reads the news.
` },
{ id: 'c04.core.4-3.03', chapter: 4, s: `
@set precinct
BRIGGS: Five out of five and she's still talking. Lexington, my wife's been listening all night. She thinks you're romantic.
DASH: Tell her I'm not.
BRIGGS: I told her. She said that's what's romantic about it.
` }]
};
