// Chapter 6 endings. Catch (bible §6): named, Pike tells them the one safe wire and the fuse is cut. Dooley is hurt in both branches
// (a small charge on the lobby door, a "comma", cuts him bringing Pruitt out). Near miss (guess 5–6): the charge goes off; Dooley has
// cleared the night clerk first and is wounded (dooley_hurt, set in the near beat).

export const WIN = {
climax: [
{ id: 'c06.win.climax.a', chapter: 6, s: `
@set street!
@mood gold
~rain light
> {time}. The river wall, two blocks down. A man in an army surplus coat was feeding millet to gulls that should have been asleep.
DASH: Mr. Pike.
PIKE: Detective. Is Beatrice all right?
DASH: {ANSWER}.
~heart
> He set down the seed bag. He folded his hands in his lap like a man in church.
PIKE: The blue wire. Not the green. The green's the one everybody cuts.
%%DASH LEXINGTON | {ANSWER}
?g<5 > I ran it to the lieutenant myself. Blue. The clock stopped. The canary kept singing.
?g>=5 > I ran. I was still running when the Hall of Records lit up the whole street from underneath.
~gstamp CASE CLOSED
` },
{ id: 'c06.win.climax.b', chapter: 6, s: `
@set records!
@mood gold
> {time}. He was on the steps of the Hall of Records, sitting like a man waiting for a bus, with an empty birdcage on his knees.
PIKE: I came for Beatrice. I couldn't leave her.
DASH: {ANSWER}.
~heart
> He closed his eyes. When he opened them, he was a soldier again.
PIKE: Blue wire. Tell them blue. And the lobby door has a small one. A comma. Mind your sergeant.
%%DASH LEXINGTON | {ANSWER}
?g<5 !!@DASH CUT THE BLUE.
?g>=5 > Too late for blue. The ground under the steps jumped like a heart, once, and the windows went orange.
~gstamp CASE CLOSED
` },
{ id: 'c06.win.climax.c', chapter: 6, s: `
@set rooftop!
@mood gold
> {time}. The roof across the street. He'd come back to the deck chair. He'd brought the field glasses back too.
DASH: {ANSWER}.
~heart
PIKE: Ah. Then it's over. The order's void once the word is spoken. That's the rule.
DASH: The wire, Pike.
PIKE: Blue. Always blue. I'm sentimental. It was my mother's color.
%%DASH LEXINGTON | {ANSWER}
?g<5 > Below us, the lieutenant cut the blue. Nothing happened. It was the best nothing I've ever heard.
?g>=5 > Below us, the lieutenant was still running for the stairs when the basement went. The deck chair skidded six feet across the roof.
~gstamp CASE CLOSED
` }
],
epi: {
1: [
{ id: 'c06.win.epi.1.a', chapter: 6, s: `
@set records!
@mood warm
> The Army carried the charge out in a blanket at one in the morning. The lieutenant carried the canary. Dooley carried old Mr. Pruitt, who was furious.
> The lobby door had a small charge on it. A comma, Pike called it. It put glass in Dooley's hands. Six stitches. He said it was nothing.
DOOLEY: It's nothing, Dash.
DASH: It's six stitches, Dooley.
` },
{ id: 'c06.win.epi.1.b', chapter: 6, s: `
@set precinct!
@mood warm
BRIGGS: One question. Pike's in a cell asking about his bird. The Army's taking the bomb to the river. City Hall is very quiet.
DASH: Quiet's good.
BRIGGS: Quiet is them deciding whether to thank me or suspend me, Lexington. They hate doing both.
` }
],
2: [
{ id: 'c06.win.epi.2.a', chapter: 6, s: `
@set street!
@mood warm
> Two questions. The canary came up the basement stairs in its cage at two in the morning, and the whole street cheered like it was a ballplayer.
> Dooley came out behind it with Pruitt over his shoulder and glass in his hands from the little charge on the lobby door.
DOOLEY: I'm fine, Dash. It's my hands. I've got two.
` },
{ id: 'c06.win.epi.2.b', chapter: 6, s: `
@set precinct!
> {time}. Pike sat in the interview room and asked for millet. Dooley brought him a packet from the all-night grocery, with bandaged hands.
PIKE: Thank you, Sergeant. I'm sorry about the comma.
DOOLEY: It's all right. Everybody's got one.
` }
],
3: [
{ id: 'c06.win.epi.3.a', chapter: 6, s: `
@set records!
> {time}. The blue wire was cut, the clock stopped, and the empty shelves stayed empty. Pruitt went back inside and locked up properly, the way he'd wanted to.
DASH: Dooley, your hands.
DOOLEY: The door had a little one on it. Pike warned you. I didn't listen. I'll listen next time.
` },
{ id: 'c06.win.epi.3.b', chapter: 6, s: `
@set precinct!
BRIGGS: Three. City Hall's issued a statement thanking "the Mayor's prompt action."
DASH: The Mayor was in the suburbs.
BRIGGS: Promptly, Lexington. He was in the suburbs very promptly.
` }
],
4: [
{ id: 'c06.win.epi.4.a', chapter: 6, s: `
@set records!
@mood blue
> {time}. The Army carried the charge to the river in the back of a milk truck. The canary rode up front.
> Dooley sat on the steps with his hands wrapped in a dish towel from the diner, grinning like a man who'd been to a party.
DOOLEY: Four, Dash. And nobody died.
` },
{ id: 'c06.win.epi.4.b', chapter: 6, s: `
@set bar!
SAL: Four. And no fire.
DASH: No fire.
SAL: What time did the bird get out?
DASH: Around three.
SAL: Good. That's all I needed to know.
` }
],
5: [
{ id: 'c06.win.epi.5.a', chapter: 6, s: `
@set records!
@mood red
~sfx boom
> The charge went at a quarter to six. The basement held most of it. The fire took the rest: two floors of empty shelves and a hundred years of dust.
> Dooley had carried Pruitt out the front ten minutes before. He'd gone back in for the old man's coat. The blast caught him in the lobby.
DASH: Dooley!
> They brought him out on a door. He was awake. He asked if the bird was all right.
` },
{ id: 'c06.win.epi.5.b', chapter: 6, s: `
@set street!
@mood red
~sfx siren
> We had Pike on the river wall in cuffs. Behind him, the Hall of Records burned orange against the dawn, and the fire trucks came screaming down Water Street.
PIKE: Is the sergeant all right? The big one?
DASH: You'd better pray he is.
PIKE: I don't pray, Detective. I set charges. It's the same thing, but nobody answers.
` }
],
6: [
{ id: 'c06.win.epi.6.a', chapter: 6, s: `
@set records!
@mood red
~sfx boom
> {time}. I said his word with the clock on its last minute. Too late for blue. The building went, and the street went white.
> Dooley had already got Pruitt and the canary out. He'd turned back for the lieutenant. The blast put him through the lobby glass.
> He lived. The ambulance man said he'd been lucky. Dooley said he'd been slow.
` },
{ id: 'c06.win.epi.6.b', chapter: 6, s: `
@set precinct!
@mood blue
BRIGGS: Six. You got Pike. The building burned. Dooley's at St. Jude's with forty stitches and a cracked collarbone.
DASH: I know.
BRIGGS: City Hall's suspended me. As of six. For the evacuation and the fire both.
DASH: You saved three buildings of people, Captain.
BRIGGS: I lost one building of paper, Lexington. In this city, paper's the one that counts.
` }
]
}
};

export const LOSS = {
climax: [
{ id: 'c06.loss.climax.a', chapter: 6, s: `
@set records!
@mood red
~sfx boom
~shake
> 6:00 AM. The Hall of Records lifted an inch off its foundations and set itself back down on fire.
> Every window lit at once, like the whole building had remembered something terrible.
~tight
** His headword was {ANSWER}.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` },
{ id: 'c06.loss.climax.b', chapter: 6, s: `
@set street!
@mood red
~sfx boom
> 6:00 AM. The blast came up through the pavement and into my shoes. On the river wall, a man in an army coat stood up, dusted off his hands, and walked away.
~sfx ring
> In the phone booth on the corner, the phone was ringing over the sirens.
WORD: Full stop, Lexington. End of sentence. {ANSWER}. Write it down before it burns.
~sfx hangup
~stamp COLD CASE
` },
{ id: 'c06.loss.climax.c', chapter: 6, s: `
@set rooftop!
@mood red
~sfx boom
> 6:00 AM. From the roof across the street I watched the Hall of Records go up through Pike's field glasses, the way he'd wanted me to see it.
> When I put them down, the deck chair beside me was empty.
~tight
** It was {ANSWER}.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` }
],
epi: {
0: [
{ id: 'c06.loss.epi.0.a', chapter: 6, s: `
@set records!
@mood red
> My last suspect didn't have a letter of him in it. The fire burned until noon. They never found the canary.
` },
{ id: 'c06.loss.epi.0.b', chapter: 6, s: `
@set precinct!
@mood blue
BRIGGS: Five strangers, at the end.
DASH: Five strangers.
BRIGGS: City Hall's suspended me, Lexington. They'll get to you after lunch.
` }
],
1: [
{ id: 'c06.loss.epi.1.a', chapter: 6, s: `
@set street!
@mood red
> {GUESS} had {hitsN} of him. A splinter of a name. Behind me, the Hall of Records was a black shell pouring smoke into the sunrise.
DOOLEY: Dash. Pruitt's gone. He went back in.
` },
{ id: 'c06.loss.epi.1.b', chapter: 6, s: `
@set morgue!
@mood sick
FENN: {HitsN}, at the end?
DASH: {HitsN}.
FENN: I had a quiet morning planned, Lexington. Now I've got an old night clerk who wouldn't leave his post. Thirty-one years. He's got the key in his hand.
` }
],
2: [
{ id: 'c06.loss.epi.2.a', chapter: 6, s: `
@set records!
@mood blue
> {GUESS}: {hitsN} of him, the last time I asked. Most of a name, the way the Hall of Records was now most of a building.
> The firemen were still pouring water on empty shelves. Nobody had told them there was nothing left to save.
` },
{ id: 'c06.loss.epi.2.b', chapter: 6, s: `
@set bar!
@mood blue
SAL: {HitsN}, in the last one.
DASH: Most of him.
SAL: Did the bird get out?
DASH: I don't know, Sal.
SAL: Then don't come in here for a while, Dash. I mean it kindly.
` }
],
3: [
{ id: 'c06.loss.epi.3.a', chapter: 6, s: `
@set records!
@mood red
> {GUESS}. All of Wendell Pike, every letter on the wrong post. The building went up anyway. Bombs don't care about spelling.
` },
{ id: 'c06.loss.epi.3.b', chapter: 6, s: `
@set precinct!
BRIGGS: All five letters. Wrong order. Right on time.
DASH: His time, Captain.
BRIGGS: Everybody's time, Lexington. That's what a clock is.
` }
]
}
};
