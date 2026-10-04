// Chapter 1 endings. A win plays a climax, then an epilogue keyed by guesses used (1–6); a loss plays a climax, then an epilogue
// keyed by the last guess's bucket (0–3). The outro beat (beats.js) follows either one.
// Catch (bible §6): the presses are stopped and Vera holds the plate. A near miss (guess 5–6) still costs the witness (bible amendment).

export const WIN = {
climax: [
{ id: 'c01.win.climax.a', chapter: 1, s: `
@set pressroom!
@mood gold
> {time}. Press Number Two was warm and humming, and Linus Pell stood beside it with ink to the elbows, like a man who had only ever set type.
DASH: Mr. Pell. I've got a word for you.
DASH: {ANSWER}.
~heart
> He set down his composing stick. He took off his apron and folded it square, the way the style manual tells you to.
%%DASH LEXINGTON | {ANSWER}
?g<5 > Vera pulled the page-one plate out of the bed with both hands. It left her inked to the wrists. She didn't care.
?g>=5 > Behind him, the first truck was already pulling away from the dock. I'd caught the man. I hadn't caught the paper.
~gstamp CASE CLOSED
` },
{ id: 'c01.win.climax.b', chapter: 1, s: `
@set street!
@mood gold
~rain heavy
> {time}. The loading dock. Pell was in a driver's cap, sitting on a bundle of tomorrow like it was a park bench.
> I didn't run. Running is for men who aren't sure.
DASH: {ANSWER}.
~heart
PELL: That's not a word anybody is supposed to say out loud.
DASH: I just did. Proofread that.
%%DASH LEXINGTON | {ANSWER}
?g<5 !!@DASH STOP THE PRESSES.
?g>=5 > Over his shoulder, the trucks were already rolling, one after another, out into the rain with the headline.
~gstamp CASE CLOSED
` }
],
epi: {
1: [
{ id: 'c01.win.epi.1.a', chapter: 1, s: `
@set pressroom!
@mood warm
VERA: The first word out of your mouth, Dash. The very first.
DASH: Beginner's luck.
VERA: You're not a beginner.
DASH: Then it was just luck.
> Pell sat on an upturned crate in cuffs and corrected a typo in the Gazette's style book with his thumbnail.
> It was barely past midnight. For once in our marriage, I was going to beat the milkman home.
` },
{ id: 'c01.win.epi.1.b', chapter: 1, s: `
@set precinct!
@mood warm
BRIGGS: One suspect. You brought in one suspect, and it was him.
DASH: Seemed a shame to waste the city's time.
BRIGGS: Don't get used to it, Lexington. A night like this happens once. Then they send you the bill.
> He held up one finger, like he was afraid I'd forget the number. I wouldn't.
` }
],
2: [
{ id: 'c01.win.epi.2.a', chapter: 1, s: `
@set street!
DOOLEY: Two words, Dash. The night's barely started and he's in the back of my car.
DASH: Then drive slow. Let him enjoy the scenery.
> Pell watched the Gazette building out the back window all the way downtown. A man saying goodbye to the only thing he ever loved, and it was made of lead.
` },
{ id: 'c01.win.epi.2.b', chapter: 1, s: `
@set pressroom!
@mood warm
VERA: Second try. I've seen you take longer to pick a tie.
DASH: When have you seen me pick a tie?
VERA: Once. Our wedding. It was the wrong one.
> She almost smiled. I'd take almost. It was more than I'd had all year.
` }
],
3: [
{ id: 'c01.win.epi.3.a', chapter: 1, s: `
@set pressroom!
> Three suspects, and a little after two. Pell gave up his composing stick, his apron, and the name of nobody at all.
PELL: I set what I'm given, Detective. I never read it.
DASH: You set a murder and didn't read it.
PELL: It's called professionalism.
` },
{ id: 'c01.win.epi.3.b', chapter: 1, s: `
@set precinct!
BRIGGS: Three. Three suspects, and three calls from City Hall asking why the Gazette is late.
DASH: Tell them it had a typo.
BRIGGS: I told them it had a homicide. They asked if it would make the late edition.
> It was {time}. The building was quiet enough to hear the coffee get worse.
` }
],
4: [
{ id: 'c01.win.epi.4.a', chapter: 1, s: `
@set street!
@mood blue
> {time}. Dooley took Pell downtown. I stood in the rain outside the Gazette and let it wash the ink off my hands. It didn't take.
DOOLEY: Four suspects, Dash. Not bad for a night with no sleep in it.
DASH: There's still some night left, Dooley. I'm going to go find it.
` },
{ id: 'c01.win.epi.4.b', chapter: 1, s: `
@set pressroom!
VERA: Four tries. The fourth proof is usually the clean one. Ask anybody.
DASH: I'm asking you.
VERA: Then it's clean. Go home, Dash. I'll finish the corrections.
> I didn't go home. I went to the precinct to type it up. Some habits are just a lack of imagination.
` }
],
5: [
{ id: 'c01.win.epi.5.a', chapter: 1, s: `
@set street!
@mood blue
> We had Pell. We didn't have the first truck. It had gone out with three hundred copies of page one before anybody thought to stop it.
DOOLEY: Three hundred papers, Dash. How many killers read the classifieds?
DASH: It only takes one.
** Three hundred doorsteps. One of them was hers.
` },
{ id: 'c01.win.epi.5.b', chapter: 1, s: `
@set pressroom!
@mood sick
VERA: The plate's out. The press is stopped. The first bundles are gone.
DASH: How many?
VERA: Enough. I called the witness's boarding house. Nobody's answering.
> Pell sat in the corner cleaning his glasses, like a man who'd done his job and was waiting to be paid for it.
` }
],
6: [
{ id: 'c01.win.epi.6.a', chapter: 1, s: `
@set street!
@mood red
~rain heavy
> {time}. I got the cuffs on him at the loading dock with the last truck's engine running. The rest were already gone.
PELL: Six o'clock is a promise, Detective. The paper always comes.
DASH: Not all of it.
PELL: Enough of it.
` },
{ id: 'c01.win.epi.6.b', chapter: 1, s: `
@set precinct!
@mood blue
BRIGGS: Six suspects. You took it right to the wire, Lexington.
DASH: We got him.
BRIGGS: We got him. The city got its paper. Somewhere a woman got her morning edition and a knock on the door.
> Briggs didn't hold up any fingers. He looked at his hands like they'd let him down.
` }
]
}
};

export const LOSS = {
climax: [
{ id: 'c01.loss.climax.a', chapter: 1, s: `
@set pressroom!
@mood red
> 6:00 AM. Press Number Two woke up like a train in a tunnel, and the morning edition poured out of it faster than I could read.
> Somewhere in that roar, Linus Pell walked out the back door with the day shift, in a pressman's cap, carrying a lunch pail.
~tight
** His headword was {ANSWER}.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` },
{ id: 'c01.loss.climax.b', chapter: 1, s: `
@set street!
@mood blue
~rain heavy
> 6:00 AM. The trucks rolled off the Gazette dock one after another, and every one of them carried the headline.
~sfx ring
> The phone in the booth across the street was ringing. I already knew who it was.
WORD: You read too slowly, Lexington.
DASH: Give me the name.
WORD: {ANSWER}. Say it all you like now. It's only a word again.
~sfx hangup
~stamp COLD CASE
` }
],
epi: {
0: [
{ id: 'c01.loss.epi.0.a', chapter: 1, s: `
@set rooftop!
@mood blue
> My last suspect didn't have a single letter of him. I'd spent the final question on a stranger.
> From the Gazette roof I watched the newsboys fan out across the city like a rumor.
DASH: Six words. And the last one wasn't even close.
` },
{ id: 'c01.loss.epi.0.b', chapter: 1, s: `
@set precinct!
@mood blue
BRIGGS: Your last man had five alibis, Lexington. Five. You couldn't even get warm.
DASH: I was warm earlier.
BRIGGS: Earlier doesn't print.
` }
],
1: [
{ id: 'c01.loss.epi.1.a', chapter: 1, s: `
@set street!
> {GUESS} had {hitsN} of him. A piece of a man, like a page torn out of the middle. The rest of him was on a streetcar somewhere.
DOOLEY: We'll get him next time, Dash.
DASH: There isn't a next time, Dooley. There's a witness.
` },
{ id: 'c01.loss.epi.1.b', chapter: 1, s: `
@set pressroom!
@mood sick
VERA: {HitsN}. You had {hitsN} of him at the end.
DASH: I had a fragment.
VERA: I mark fragments every night, Dash. You can't print one. Turns out you can't arrest one either.
` }
],
2: [
{ id: 'c01.loss.epi.2.a', chapter: 1, s: `
@set pressroom!
@mood blue
> {GUESS}. {HitsN} of him in the last suspect. I had most of his name and none of his face.
VERA: Most of a headline is still a headline, Dash. It still runs.
` },
{ id: 'c01.loss.epi.2.b', chapter: 1, s: `
@set alley!
> I found his apron in the alley, folded square. {GUESS} had {hitsN} of him. The apron had the rest.
DASH: Neat to the end, Pell.
> Tidy men are the worst kind. They never leave anything behind but the mess.
` }
],
3: [
{ id: 'c01.loss.epi.3.a', chapter: 1, s: `
@set pressroom!
@mood red
> {GUESS}. Every letter of him, in the wrong order. Like a typesetter's private joke.
VERA: You had all of it, Dash. You just set it wrong.
DASH: That's going on my headstone.
VERA: I'll proof it.
` },
{ id: 'c01.loss.epi.3.b', chapter: 1, s: `
@set precinct!
BRIGGS: All five letters. You had the whole gang in one room and let them walk out in the wrong order.
DASH: They looked different in the light.
BRIGGS: Everything looks different at six in the morning, Lexington. Mostly it looks like my fault.
` }
]
}
};
