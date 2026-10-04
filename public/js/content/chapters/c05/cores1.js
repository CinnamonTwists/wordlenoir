// Chapter 5 cores, suspect 1 (just after midnight). Key: '<guess>-<bucket>'. Bucket 0: no hits · 1: 1-2 · 2: 3-4 · 3: five, wrong order.

export const CORES1 = {
'1-0': [
{ id: 'c05.core.1-0.01', chapter: 5, s: `
@set station
> I said {GUESS} out loud under the big clock. It echoed off the marble and came back to me unclaimed, like lost luggage.
NICKEL: Was that him, Mister Lexington?
DASH: Not a letter of him, kid.
NICKEL: Then you're warming up. My dad says the first shine's always the worst.
` },
{ id: 'c05.core.1-0.02', chapter: 5, s: `
@set morgue
FENN: {GUESS}? Not a letter in it. Amos Greer would be disappointed, and he was a patient man.
DASH: You knew him?
FENN: Everybody who ever rode the river line knew him, Lexington. He called every passenger "sir," even the dogs.
` },
{ id: 'c05.core.1-0.03', chapter: 5, s: `
@set precinct
BRIGGS: {GUESS}. Five strangers. Do you know how many people go through Union Station on a weeknight?
DASH: A lot, Captain.
BRIGGS: Eleven thousand. Not one of them is wearing a sign. Start reading gloves.
` },
{ id: 'c05.core.1-0.04', chapter: 5, s: `
@set street
> {GUESS} came up empty. Outside the station, the cabs sat in a line with their meters off, like dogs waiting to be fed.
> A man in gloves got out of the third one, paid exactly, and went inside. Not ours. Ours doesn't take cabs. Ours takes trains.
` },
{ id: 'c05.core.1-0.05', chapter: 5, s: `
@set bar
> I stopped at the Last Word for a minute and ordered a gin, which I never do. Sal already had a gin poured.
SAL: You've got a train face on, Dash.
DASH: How'd you know I'd want gin?
SAL: You always want gin before trains. Since we were kids.
> {GUESS} had come up empty. I drank the gin. I didn't remember ever wanting gin before trains.
` }],
'1-1': [
{ id: 'c05.core.1-1.01', chapter: 5, s: `
@set station
> {GUESS} gave me {hitsN}. Over at the left-luggage window, the clerk was asleep on a stack of claim tickets.
DASH: Five suitcases, all checked by the same man today. Which ones?
> The clerk woke up long enough to point at five claim stubs on a nail, five different names, one handwriting, and went back to sleep.
DASH: Every one of them is him, and none of them is.
` },
{ id: 'c05.core.1-1.02', chapter: 5, s: `
@set morgue
FENN: {HitsN} of him. Here's one more thing: Greer's gloves were missing. Pullman porters wear white cotton gloves.
DASH: Somebody took a porter's gloves.
FENN: Somebody who wears gloves indoors, Lexington. He'd have wanted a spare pair.
` },
{ id: 'c05.core.1-1.03', chapter: 5, s: `
@set street
DOOLEY: {GUESS} had {hitsN}. Dash, the ticket office says a man bought three tickets on the six o'clock express. Three names. Same handwriting.
DASH: Same gloves too, I'll bet.
DOOLEY: The clerk said he took them off to count his change. Then put them right back on, like he'd touched something dirty.
` },
{ id: 'c05.core.1-1.04', chapter: 5, s: `
@set station
NICKEL: {HitsN}, Mister Lexington? That's good. That's like getting the heel done.
DASH: How do you know so much about it?
NICKEL: I watch you. You do the same face every time. Squinty.
` },
{ id: 'c05.core.1-1.05', chapter: 5, s: `
@set precinct
BRIGGS: {HitsN}. Fine. Dooley, you're on the station. Every platform, every bench, every men's room.
DOOLEY: Yes, Captain.
BRIGGS: And Dooley, if you find him, you call Lexington. You don't play hero.
DOOLEY: No, Captain.
> He was going to play hero. He'd been waiting four years for a chance.
` },
{ id: 'c05.core.1-1.06', chapter: 5, s: `
@set phonebooth
~sfx ring
MAGS: Detective? Mags. I'm at the station's PA booth. Talked my way in. I can announce anything you want.
DASH: {GUESS} had {hitsN}. Can you page a man with no name?
MAGS: I can page every man with every name. Give me the word and the whole station hears it.
` }],
'1-2': [
{ id: 'c05.core.1-2.01', chapter: 5, s: `
@set station
> First suspect, {GUESS}, and {hitsN} lit up. Across the concourse, a man in grey gloves lowered his newspaper a quarter of an inch.
> Then he raised it again. Polite. Patient. He'd heard me.
DASH: He's here, Dooley.
DOOLEY: Where?
DASH: Everywhere a man can read a paper.
` },
{ id: 'c05.core.1-2.02', chapter: 5, s: `
@set morgue
FENN: {HitsN} on the first try. Good. I've got one more gift. A thread in Greer's fingernail. Grey kid leather. Expensive.
DASH: Gloves.
FENN: He fought, Lexington. Twenty-two years of carrying bags, and the one time he grabbed one back, it killed him.
` },
{ id: 'c05.core.1-2.03', chapter: 5, s: `
@set street
DOOLEY: {HitsN} of him already, Dash. That's two thirds of a courier.
DASH: Couriers don't come in thirds, Dooley. They come in suitcases.
!!@DOOLEY I'LL FIND HIS BAGS.
` },
{ id: 'c05.core.1-2.04', chapter: 5, s: `
@set bar
SAL: {HitsN}, first try? You should switch to gin more often.
DASH: I never drink gin.
SAL: You drink gin before trains, Dash. You always have. You just never noticed.
` },
{ id: 'c05.core.1-2.05', chapter: 5, s: `
@set precinct
> {GUESS}: {hitsN}. Briggs had a railroad map pinned over the duty roster.
BRIGGS: The river line runs north through four states. If he gets on that train, we need four governors and eleven sheriffs to get him off.
DASH: Then he doesn't get on.
BRIGGS: Good plan. Now make it a real one.
` },
{ id: 'c05.core.1-2.06', chapter: 5, s: `
@set station
NICKEL: {HitsN}! I told you. Hey, the glove man walked past my stand again. Didn't stop. Looked at his shoes like they were still shiny.
DASH: Were they?
NICKEL: Course they were, mister. I did 'em.
` }],
'1-3': [
{ id: 'c05.core.1-3.01', chapter: 5, s: `
@set station
> {GUESS}. Every letter of him, all on the wrong platform. Like a man with five tickets and no seat.
DASH: He's all here. He's just boarding in the wrong order.
` },
{ id: 'c05.core.1-3.02', chapter: 5, s: `
@set precinct
BRIGGS: Five for five, first time out. Lexington, if you're psychic, tell me where my car keys are.
DASH: Your coat pocket, Captain.
BRIGGS: ...How?
DASH: They're always in your coat pocket.
` },
{ id: 'c05.core.1-3.03', chapter: 5, s: `
@set morgue
FENN: All five letters, none in place. Greer would have sorted them. He sorted luggage by destination for twenty-two years.
** Every letter of him, waiting to be sorted.
` }]
};
