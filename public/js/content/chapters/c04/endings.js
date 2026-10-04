// Chapter 4 endings. Catch (bible §6): Mags pulls the plug at 5:59 and the city wakes to dead air (the backup announcer would have read
// the same script). Near miss (guess 5–6): Celeste is named, but the judge's order gets Mags walked off the roof, the phrase goes out at six,
// and somewhere a courier picks up a suitcase.

export const WIN = {
climax: [
{ id: 'c04.win.climax.a', chapter: 4, s: `
@set studio!
@mood gold
> {time}. I didn't wait for her to come out. I leaned on the talkback switch and said it into her headphones, and into every radio in the city.
DASH: {ANSWER}.
~heart
> On the air, the honey stopped. Fifty thousand kitchens heard the name the Lexicon had given her, and she knew it.
CELESTE: Well. That's me written out of the show.
%%DASH LEXINGTON | {ANSWER}
?g<5 > She took off her headphones, set them down gently, and walked out of the booth with her hands where I could see them.
?g>=5 > She walked out with her hands up. Behind her, the Councilman's lawyer was already waving his court order at the station manager.
~gstamp CASE CLOSED
` },
{ id: 'c04.win.climax.b', chapter: 4, s: `
@set street!
@mood gold
~rain light
> {time}. She came out the service door for a cigarette, the way she did every hour. I was leaning on the wall by the ash can.
CELESTE: Got a light, flatfoot?
DASH: {ANSWER}.
~heart
> The match went out in her fingers. She didn't strike another one.
%%DASH LEXINGTON | {ANSWER}
?g<5 !!@DASH THAT'S A WRAP.
?g>=5 > Up on the roof, somebody was shouting. The station chief had Mags by the arm, and the lawyer had a paper with a judge's name on it.
~gstamp CASE CLOSED
` },
{ id: 'c04.win.climax.c', chapter: 4, s: `
@set rooftop!
@mood gold
> {time}. She came up to the roof herself, in her silk blouse, in the rain. She'd figured out what Mags was doing up there.
CELESTE: Step away from my transmitter, darling.
MAGS: It's not your transmitter.
DASH: {ANSWER}.
~heart
CELESTE: Oh, you rotten man. You absolute rotten man. On my own roof.
%%DASH LEXINGTON | {ANSWER}
?g<5 > She sat down on an upturned cable drum and lit the last cigarette of her career.
?g>=5 > She sat down. It was too late to matter. Below us, the station chief had locked the transmitter room, and Mags was on the wrong side of the door.
~gstamp CASE CLOSED
` }
],
epi: {
1: [
{ id: 'c04.win.epi.1.a', chapter: 4, s: `
@set studio!
@mood warm
> By five fifty-nine the backup announcer had the six o'clock script on his stand. Mags reached past him and pulled the fuse.
> WKRN went silent. All over the city, people woke up to nothing at all, and lay there listening to it.
MAGS: Best thing that station ever broadcast.
` },
{ id: 'c04.win.epi.1.b', chapter: 4, s: `
@set precinct!
@mood warm
BRIGGS: One suspect. The Councilman's lawyer just withdrew his order. Said his client had "no idea."
DASH: Nobody ever has an idea, Captain.
BRIGGS: That's why we have you, Lexington. Go home. Your wife's been listening to you all night. She'll want a word.
` }
],
2: [
{ id: 'c04.win.epi.2.a', chapter: 4, s: `
@set rooftop!
@mood warm
MAGS: Two questions, Detective. I had a wrench in my hand all night for nothing.
DASH: Keep holding it till 5:59. The backup man has the same script.
> At 5:59 she pulled the fuse and sat down under the tower with her thermos, and watched the sun come up on a silent city.
` },
{ id: 'c04.win.epi.2.b', chapter: 4, s: `
@set apartment!
@mood warm
VERA: I heard it. On the radio. You said her word and she just stopped.
DASH: It was a long night.
VERA: It was two hours, Dash. That's the shortest long night you've ever had.
VERA: Who was the old friend?
DASH: I still don't know.
` }
],
3: [
{ id: 'c04.win.epi.3.a', chapter: 4, s: `
@set precinct!
> {time}. Celeste Avery sat in the interview room asking for a cigarette, then a better cigarette, then a lawyer who wasn't the Councilman's.
CELESTE: You'll miss me, you know. All of you. Every night at midnight, you'll turn the dial and I won't be there.
DASH: I'll manage.
` },
{ id: 'c04.win.epi.3.b', chapter: 4, s: `
@set studio!
@mood warm
MAGS: Three. Not bad. I'll keep the wrench until 5:59 anyway.
DASH: You think the backup announcer's one of them?
MAGS: I think a script is a script, Detective. Whoever reads it says the phrase. Better nobody reads it.
` }
],
4: [
{ id: 'c04.win.epi.4.a', chapter: 4, s: `
@set rooftop!
@mood blue
> {time}. Two hours of quiet to go, and Mags Delgado with her hand on the fuse the whole way.
> At 5:59 she pulled it. The tower light went out. The city woke to dead air, and for once it was ours.
` },
{ id: 'c04.win.epi.4.b', chapter: 4, s: `
@set bar!
SAL: Four. You look like four.
DASH: You always say that.
SAL: Because you always look like whatever number it was, Dash. You never once looked like a one.
` }
],
5: [
{ id: 'c04.win.epi.5.a', chapter: 4, s: `
@set studio!
@mood red
> At 6:00 the backup announcer read the news. The chief had Mags in his office with the door locked. Traffic will be light this morning on the river bridges.
> I heard it on the hallway speaker. Somewhere in the city, somebody had heard it too, and put on his gloves.
MAGS: I'm sorry, Detective. They took my wrench.
DASH: You did everything right, Mags. I was late.
` },
{ id: 'c04.win.epi.5.b', chapter: 4, s: `
@set street!
@mood sick
> We had Celeste in the back of the car. The six o'clock news came out of every window on the block, and with it, the phrase.
DOOLEY: She's in cuffs, Dash. Doesn't that count?
DASH: It counts, Dooley. It just doesn't stop anything.
` }
],
6: [
{ id: 'c04.win.epi.6.a', chapter: 4, s: `
@set studio!
@mood red
> {time}. I said her word with the backup announcer already warming up his voice. She went quietly. The script didn't.
> At six, a man with a nice voice and no idea what he was saying told the city traffic would be light on the river bridges.
` },
{ id: 'c04.win.epi.6.b', chapter: 4, s: `
@set precinct!
@mood blue
BRIGGS: Six, Lexington. You got her. The phrase went out anyway.
DASH: I know.
BRIGGS: Somebody's moving because of it.
DASH: I know, Captain. I just don't know where to.
` }
]
}
};

export const LOSS = {
climax: [
{ id: 'c04.loss.climax.a', chapter: 4, s: `
@set studio!
@mood red
> 6:00 AM. Celeste Avery leaned into the microphone, honey and velvet, and read the morning news to the whole city.
CELESTE: Traffic will be light this morning on the river bridges.
> Then she took off her headphones and walked out on the arm of the Councilman's lawyer, and winked at me on the way past.
~tight
** Her headword was {ANSWER}.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` },
{ id: 'c04.loss.climax.b', chapter: 4, s: `
@set rooftop!
@mood blue
> 6:00 AM. The tower light blinked on, red, red, red. Mags sat under it with her wrench in her lap and the chief engineer's padlock on the fuse box.
~sfx ring
> The phone in the transmitter shed rang. I didn't need to guess who.
WORD: And that's the news, Lexington. Here's a dedication: {ANSWER}. For you. From an old friend.
~sfx hangup
~stamp COLD CASE
` },
{ id: 'c04.loss.climax.c', chapter: 4, s: `
@set street!
@mood red
> 6:00 AM. Every radio on the street said the same thing at the same time, and it was the last thing I wanted to hear.
> A cab pulled up to the service door. A woman in a silk blouse got in, and it pulled away. The rain kept the plates.
~tight
** It was {ANSWER}.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` }
],
epi: {
0: [
{ id: 'c04.loss.epi.0.a', chapter: 4, s: `
@set studio!
@mood blue
> My last suspect didn't have a letter of her. I'd spent the final question on a stranger, and a stranger is who went home.
MAGS: You'll get her next time.
DASH: There's no next time on the radio, Mags. Only reruns.
` },
{ id: 'c04.loss.epi.0.b', chapter: 4, s: `
@set apartment!
@mood blue
VERA: She signed off with a song. For "the detective who tried." Then the news.
DASH: Turn it off.
VERA: It's off, Dash. It's been off for an hour. You keep hearing it anyway.
` }
],
1: [
{ id: 'c04.loss.epi.1.a', chapter: 4, s: `
@set street!
> {GUESS} had {hitsN} of her. A fragment of a voice, like a station between stations.
DOOLEY: Where'd she go, Dash?
DASH: Somewhere with a microphone, Dooley. They always find a microphone.
` },
{ id: 'c04.loss.epi.1.b', chapter: 4, s: `
@set morgue!
@mood sick
FENN: {HitsN}. Mr. Benning would have liked you to have the rest.
DASH: Mr. Benning would have liked a lot of things.
FENN: He'd have liked a quieter radio. We all would.
` }
],
2: [
{ id: 'c04.loss.epi.2.a', chapter: 4, s: `
@set rooftop!
@mood blue
> {GUESS}: {hitsN} of her name, the last time I asked. Mags packed up her logbooks under the tower without saying a word.
MAGS: I'll keep logging, Detective. Whoever's on next. Somebody has to.
` },
{ id: 'c04.loss.epi.2.b', chapter: 4, s: `
@set bar!
@mood blue
SAL: {HitsN} in the last one.
DASH: Most of her, Sal.
SAL: Most of a song is still a song, Dash. It gets stuck in your head the same.
` }
],
3: [
{ id: 'c04.loss.epi.3.a', chapter: 4, s: `
@set studio!
@mood red
> {GUESS}. All her letters, scrambled like a dial with no station. The ON AIR light was still glowing when I left.
DASH: I had every word she ever said, and I couldn't put five of them in order.
` },
{ id: 'c04.loss.epi.3.b', chapter: 4, s: `
@set precinct!
BRIGGS: All five. Out of order. On the radio, that's called a remix.
DASH: In here?
BRIGGS: In here, Lexington, it's called a loss. Go home and turn your radio off.
` }
]
}
};
