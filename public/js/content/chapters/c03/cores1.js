// Chapter 3 cores, suspect 1 (just after midnight). Key: '<guess>-<bucket>'. Bucket 0: no hits · 1: 1-2 · 2: 3-4 · 3: five, wrong order.

export const CORES1 = {
'1-0': [
{ id: 'c03.core.1-0.01', chapter: 3, s: `
@set office
> Fairweather and Fairweather, Court Street. I read {GUESS} out loud to an empty office with two nameplates on one desk.
> Nothing answered. Not the filing cabinets, not the wedding photographs, not the fern.
DASH: Five letters, and every one of them has an alibi. Even the fern looks guilty next to them.
` },
{ id: 'c03.core.1-0.02', chapter: 3, s: `
@set morgue
FENN: {GUESS}? Not a letter of him in it.
DASH: You can tell from here?
FENN: I can tell a stranger when I see one, Lexington. I've got a building full of them.
> Mr. Mercer lay under his sheet, patient as only the dead can afford to be.
` },
{ id: 'c03.core.1-0.03', chapter: 3, s: `
@set penitentiary
> I called {GUESS} in from the gatehouse phone while the warden listened in and pretended to read.
WARDEN: That your man?
DASH: That's five innocent letters, Warden.
WARDEN: We get a lot of those up here. They all say the same thing.
` },
{ id: 'c03.core.1-0.04', chapter: 3, s: `
@set docks
> Pier Nine, where Harold Mercer bled out between two crates of bananas. {GUESS} came up clean.
> The night gang watched me from the shadows the way dockworkers watch anybody in a clean collar.
DASH: Eddie Ruiz is going to die for this pier. Somebody here knows that.
> Nobody said so. The river said it for them, slapping the pilings like it was counting.
` },
{ id: 'c03.core.1-0.05', chapter: 3, s: `
@set precinct
BRIGGS: {GUESS}. Not one letter. That's how you start a night when a man's due to fry?
DASH: I start them all the same way, Captain. Wrong.
BRIGGS: Then get it wrong faster. The State doesn't do overtime.
` }],
'1-1': [
{ id: 'c03.core.1-1.01', chapter: 3, s: `
@set office
> {GUESS} gave me {hitsN}. I went through Fairweather's desk drawer and found forty wedding invitations, all of them signed with love.
DASH: He forges marriage licences and keeps the invitations.
DOOLEY: Maybe he's sentimental.
DASH: Maybe he's keeping receipts.
` },
{ id: 'c03.core.1-1.02', chapter: 3, s: `
@set street
> Court Street at {time}. Every brass plate on every door said NOTARY, and every one of them was locked.
DOOLEY: {GUESS} had {hitsN} in the gang. That's a start, Dash.
DASH: It's a signature, Dooley. Just not the whole name yet.
` },
{ id: 'c03.core.1-1.03', chapter: 3, s: `
@set morgue
FENN: {HitsN} out of {GUESS}. You're closer than the district attorney ever got.
DASH: The district attorney didn't try.
FENN: No. He had a confession. Confessions are very restful for a prosecutor.
` },
{ id: 'c03.core.1-1.04', chapter: 3, s: `
@set phonebooth
~sfx ring
ROSA: Detective Lexington? This is Rosa Ruiz. The guard said you came to see my Eddie.
DASH: I'm working on it, Mrs. Ruiz. {GUESS} turned up {hitsN}. It's something.
ROSA: Something is more than anybody else gave us.
> She hung up before I could promise her anything. Smart woman.
` },
{ id: 'c03.core.1-1.05', chapter: 3, s: `
@set docks
> {GUESS} put {hitsN} in the Notary's gang. On Pier Nine, Eddie's crew had built a little shrine out of a banana crate: a candle, a saint, a photograph.
DASH: You boys knew him?
> Nobody answered. One of them took off his cap. That was the answer.
` },
{ id: 'c03.core.1-1.06', chapter: 3, s: `
@set precinct
BRIGGS: {HitsN}. Good. Hold on to them. Here's a fact for you: Fairweather notarized half the documents in this building.
DASH: Including the Ruiz confession.
BRIGGS: Including my pension papers, Lexington. If he's a forger, I'm retiring on a fairy tale.
` }],
'1-2': [
{ id: 'c03.core.1-2.01', chapter: 3, s: `
@set office
> First suspect, and {GUESS} lit up {hitsN}. Fairweather's name was showing through like a watermark.
DASH: You can't hide from a man who reads paper for a living, Gus.
> On the blotter, a perfect circle where the seal had sat. Still warm, if paper can be warm.
` },
{ id: 'c03.core.1-2.02', chapter: 3, s: `
@set morgue
FENN: {HitsN}, first time out. I've seen men take longer to sign for a body.
DASH: I'm in a hurry, Doc.
FENN: So is Eddie Ruiz. Neither of you is going anywhere I'd recommend.
` },
{ id: 'c03.core.1-2.03', chapter: 3, s: `
@set penitentiary
> I phoned it through to the death house. {GUESS}: {hitsN} in the Notary's name.
EDDIE: Is that good, Detective?
DASH: It's good, Eddie.
EDDIE: Then I'm gonna put it in the crossword. Seven across. "Hope."
` },
{ id: 'c03.core.1-2.04', chapter: 3, s: `
@set street
DOOLEY: {GUESS} gave us {hitsN}. That's more than half a man, Dash.
DASH: Half a man can still sign a death warrant.
!!@DOOLEY WE'RE ON HIM.
` },
{ id: 'c03.core.1-2.05', chapter: 3, s: `
@set bar
SAL: {HitsN} on the first one? Sit down before you fall down.
DASH: Can't sit, Sal. There's a man in a chair at six.
SAL: Then stand and drink. I'll allow it this once.
> He slid the glass across. He was rooting for Eddie. Sal roots for everybody who ever took a fall.
` },
{ id: 'c03.core.1-2.06', chapter: 3, s: `
@set precinct
> {GUESS}: {hitsN}. I chalked them on the squad-room board under a photograph of Augustin Fairweather at a policeman's wedding.
BRIGGS: That's the Kelly wedding. He cried through the whole thing.
DASH: Did he notarize the licence?
BRIGGS: Don't, Lexington. Kelly's got four kids.
` }],
'1-3': [
{ id: 'c03.core.1-3.01', chapter: 3, s: `
@set office
> {GUESS}. Every letter in his gang, and not one where it belonged. Like a document signed in all the wrong places.
DASH: He's all here, Dooley. He's just been filed wrong.
DOOLEY: Then let's refile him.
` },
{ id: 'c03.core.1-3.02', chapter: 3, s: `
@set morgue
FENN: All five letters, and you've got them in the wrong order. Like the confession.
DASH: How do you mean?
FENN: Everything in it happened. Just not to Eddie, and not in that order.
** Right story. Wrong man. Wrong order.
` },
{ id: 'c03.core.1-3.03', chapter: 3, s: `
@set precinct
BRIGGS: Five for five out of the gate. You're either brilliant or lucky, Lexington.
DASH: Which would you rather?
BRIGGS: Fast. I'd rather fast.
` }]
};
