// Chapter 3 cores, suspect 3 (around two). Every one carries the midpoint turn (docs/story/bible.md §6): the confession's seal was
// bought out of the precinct's own evidence locker. Somebody inside helped. (Don't name who: the leak is chapter 7's reveal.)

export const CORES3 = {
'3-0': [
{ id: 'c03.core.3-0.01', chapter: 3, s: `
@set precinct
> {GUESS} came up clean. Then Dooley came up from the basement looking like he'd seen his own name on a tombstone.
DOOLEY: The seal on the Ruiz confession, Dash. It's ours. Seized from a forger in '46. Evidence locker four.
DASH: Seized seals get destroyed.
DOOLEY: This one got signed out. Last month. The signature's a smear.
** Somebody in this building sold Eddie Ruiz to the chair.
` },
{ id: 'c03.core.3-0.02', chapter: 3, s: `
@set morgue
FENN: {GUESS}? Never mind {GUESS}. Look at the seal on the confession under my glass.
DASH: A. Fairweather, Notary Public.
FENN: Look closer. There's a nick in the rim at four o'clock. I've seen that nick before, on an evidence tag in your own precinct.
DASH: Our seal.
FENN: Your seal, Lexington. Somebody rented out the police department.
` },
{ id: 'c03.core.3-0.03', chapter: 3, s: `
@set office
> {GUESS} was five strangers. In Fairweather's safe, behind the wedding photographs, a precinct evidence envelope. Empty. Torn open.
DOOLEY: That's our envelope. That's our tape.
DASH: Then that's our problem, Dooley. He didn't steal it. Somebody handed it to him.
` },
{ id: 'c03.core.3-0.04', chapter: 3, s: `
@set street
DOOLEY: Records says the forger's seal from the '46 raid was signed out of evidence on the twelfth of September. Night shift.
DASH: Signed out by who?
DOOLEY: The name's a smudge, Dash. Like somebody licked a thumb and wiped it.
> {GUESS} had nothing. The precinct had a hole in it, and the rain was coming in.
` },
{ id: 'c03.core.3-0.05', chapter: 3, s: `
@set phonebooth
~sfx ring
BRIGGS: Lexington. Get back here. Don't talk to anybody on the way. Not even Dooley.
DASH: What is it?
BRIGGS: The seal on that confession came out of my evidence locker. Somebody I sign paychecks for sold it.
> {GUESS} had been a bust. The Captain's voice was worse. It was the voice of a man counting his friends.
` }],
'3-1': [
{ id: 'c03.core.3-1.01', chapter: 3, s: `
@set precinct
> {GUESS} gave me {hitsN}. Down in the evidence cage, the logbook was open to September, and one line had been inked over.
DOOLEY: Somebody signed out the seal and blacked out their own name.
DASH: In our own book. In our own building.
DOOLEY: Who'd do that, Dash?
DASH: Somebody who knew nobody reads the evidence log. Which is everybody.
` },
{ id: 'c03.core.3-1.02', chapter: 3, s: `
@set office
> {HitsN} of him in {GUESS}. And under Fairweather's blotter, a receipt on precinct letterhead.
> RECEIVED: one notarial seal, evidence, for "inspection." Fee: two hundred dollars.
DASH: They didn't even bother to steal it. They invoiced it.
` },
{ id: 'c03.core.3-1.03', chapter: 3, s: `
@set morgue
FENN: You want the bad news with or without coffee?
DASH: {GUESS} gave me {hitsN}. I'll take the bad news black.
FENN: The seal on that confession was police evidence. It's in my files from '46. I tagged it myself.
DASH: Then somebody in my house walked it out the door.
` },
{ id: 'c03.core.3-1.04', chapter: 3, s: `
@set penitentiary
EDDIE: The guard says you found something. Says you got a look on you.
DASH: The seal on your confession came out of a police locker, Eddie. A cop helped frame you.
EDDIE: A cop?
DASH: Or somebody with a cop's keys. {GUESS} had {hitsN} of the forger. I'll find the rest of him, and then I'll find the keys.
` },
{ id: 'c03.core.3-1.05', chapter: 3, s: `
@set street
DOOLEY: {GUESS}, {hitsN}. And Dash, the evidence cage key is kept at the front desk. Anybody on nights can borrow it.
DASH: How many on nights?
DOOLEY: Eleven. Twelve if you count the dispatcher.
DASH: Count everybody.
` },
{ id: 'c03.core.3-1.06', chapter: 3, s: `
@set bar
> {GUESS} had {hitsN}. I told Sal about the seal. He set down the glass he was polishing, which he never does.
SAL: Your own precinct.
DASH: Our own precinct.
SAL: Then be careful who you tell, Dash. Starting with me.
DASH: You're the only one I trust, Sal.
SAL: That's what I'm worried about.
` }],
'3-2': [
{ id: 'c03.core.3-2.01', chapter: 3, s: `
@set precinct
> {GUESS} lit up {hitsN}. Then Dooley set the evidence logbook in front of me, open to the page.
DOOLEY: Seal, notarial, one. Signed out September twelfth, two in the morning. Returned: never.
DASH: Two in the morning. Somebody did it on my shift.
!!@DASH WE'VE GOT A RAT IN THE HOUSE.
` },
{ id: 'c03.core.3-2.02', chapter: 3, s: `
@set morgue
FENN: {HitsN}. Good. Now the reason you won't sleep tonight.
DASH: I wasn't going to anyway.
FENN: That seal was my exhibit in the Delacroix forgery trial. It should be scrap metal. Instead it's in your Notary's pocket, and someone with a badge put it there.
` },
{ id: 'c03.core.3-2.03', chapter: 3, s: `
@set office
> {GUESS}: {hitsN}. In Fairweather's diary, in his pretty hand: "Sept. 12. Collected the seal from our friend at the precinct. Lovely person. Wept."
DOOLEY: He wept?
DASH: He weeps at everything, Dooley. He wept at the price.
` },
{ id: 'c03.core.3-2.04', chapter: 3, s: `
@set penitentiary
WARDEN: Your captain called. Says the confession's seal is stolen police property.
DASH: That's right. {GUESS} gave me {hitsN} of the man who used it.
WARDEN: Then the confession's tainted. Fine. But the governor wants a forger in a cell, not a theory on a phone.
` },
{ id: 'c03.core.3-2.05', chapter: 3, s: `
@set street
> {HitsN} in {GUESS}. Briggs met me at the precinct steps in his shirtsleeves, in the rain.
BRIGGS: The seal came out of our cage. I want you to know I didn't sign it out.
DASH: I didn't ask, Captain.
BRIGGS: Everybody's going to ask, Lexington. By morning, everybody in this city is going to ask.
` },
{ id: 'c03.core.3-2.06', chapter: 3, s: `
@set alley
PETE: The fellas at the newsstand say a cop sold a gadget out the back of your station house. A stamp thing.
DASH: Where'd you hear that?
PETE: From a fella who heard it from a fella in a uniform, Lexington. Uniforms talk more than they think.
> {GUESS} had {hitsN} of the Notary. The leak had a uniform. That was all I had on it, and it was more than I wanted.
` }],
'3-3': [
{ id: 'c03.core.3-3.01', chapter: 3, s: `
@set precinct
> {GUESS}: the whole of him, out of order. And the evidence log said the whole precinct was out of order too.
DOOLEY: The seal walked out of our own cage, Dash. On our own night shift.
DASH: Then two people are going to answer for Eddie Ruiz. Fairweather first.
` },
{ id: 'c03.core.3-3.02', chapter: 3, s: `
@set morgue
FENN: Five letters, all present, none in place. And one seal, police property, very much out of place.
DASH: You think it was a cop, Doc?
FENN: I think it was somebody who could walk past a desk sergeant at two in the morning without being asked why.
` },
{ id: 'c03.core.3-3.03', chapter: 3, s: `
@set office
> {GUESS}. All of him, scrambled. In his safe, an evidence tag from my own precinct, initialed by a hand I almost recognized.
DASH: Almost.
> That's the worst word in any language. It means you were close enough to be blamed.
` }]
};
