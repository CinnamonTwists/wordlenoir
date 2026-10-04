// Chapter 10 cores, suspect 3 (around two). Every one carries the midpoint turn (docs/story/bible.md §6): the Proofreader's orders are in
// the Professor's handwriting, and Dash sends Dooley to arrest the Professor at Union Station. (They were forged by the Ghostwriter on the
// Editor's orders, but nobody knows that tonight. Don't say it here.)

export const CORES3 = {
'3-0': [
{ id: 'c10.core.3-0.01', chapter: 10, s: `
@set office
> {GUESS} came up clean. Then Mags put a sheaf of papers on my desk: Thorne's orders, found in the bindery cellar. Eleven names. Eleven dates.
> In a small, precise, scholarly hand I'd read a hundred times on dictionary slips. The Professor's.
DASH: Dooley. Union Station. Bring in Ambrose Thackeray.
?dooley_hurt DOOLEY: With one arm, Dash?
?!dooley_hurt DOOLEY: The Professor, Dash?
DASH: Bring him in.
** The orders were in his hand. Every one.
` },
{ id: 'c10.core.3-0.02', chapter: 10, s: `
@set precinct
> {GUESS}: five strangers. Briggs laid the Proofreader's orders on the blotter, one at a time, like cards.
BRIGGS: Look at the handwriting, Lexington.
DASH: The Professor's.
BRIGGS: The man who's been helping you since October. The man whose dictionary is the Index. Send Dooley. Union Station. Now.
> I sent Dooley. I'd never sent anyone anywhere I wanted to go less.
` },
{ id: 'c10.core.3-0.03', chapter: 10, s: `
@set pressroom
> {GUESS} was a bust. Vera found the orders in the bindery's waste bin: correction slips, each one with a name and a date, and an instruction. "Remove."
VERA: Dash, I know this handwriting. He sent me corrections on his dictionary once.
DASH: The Professor.
VERA: He wrote "remove" eleven times. In the same hand he wrote "with compliments" to me.
> I picked up the phone and sent Dooley to Union Station.
` },
{ id: 'c10.core.3-0.04', chapter: 10, s: `
@set street
MAGS: Detective. {GUESS} was empty, but look at this. The bindery's order book. Every correction signed with initials. A.T.
DASH: Ambrose Thackeray.
MAGS: And a note for tonight: "Union Station. Six. Meet the Editor."
DASH: Dooley. Union Station. Bring in the Professor.
` },
{ id: 'c10.core.3-0.05', chapter: 10, s: `
@set office
> Nothing in {GUESS}. On the open line, a dry little cough.
WORD: Have you looked at the handwriting yet, Lexington? On his orders? It's very distinctive. Very scholarly.
DASH: The Professor.
WORD: You said it. Not me.
> I sent Dooley to Union Station to arrest the only man who'd never once lied to me about the odds.
` }],
'3-1': [
{ id: 'c10.core.3-1.01', chapter: 10, s: `
@set precinct
> {GUESS} gave me {hitsN}. Then the bindery orders, spread on Briggs's desk. Eleven corrections, each in the Professor's careful hand.
BRIGGS: Union Station. He's got a ticket on the six o'clock, Lexington.
DASH: Dooley. Bring him in.
?dooley_hurt DOOLEY: I'll bring him in, Dash. One arm's enough for a professor.
?!dooley_hurt DOOLEY: I'll bring him in, Dash.
` },
{ id: 'c10.core.3-1.02', chapter: 10, s: `
@set pressroom
VERA: {HitsN}, Dash. And this. The order for the night editor's correction, in October. Ned Goss. "Remove." In the Professor's handwriting.
DASH: The man who helped me catch his killer.
VERA: Or the man who wanted to look like he was helping.
> I sent Dooley to Union Station. My hand was shaking on the phone.
` },
{ id: 'c10.core.3-1.03', chapter: 10, s: `
@set office
MAGS: {HitsN}. The orders in the bindery, Detective. Professor's handwriting, every one. And a note: he's meeting someone at the 6:00, Union Station.
DASH: Send Dooley.
MAGS: Already done. He took a cab. He said, "Tell Dash I'm sorry," which I didn't understand.
` },
{ id: 'c10.core.3-1.04', chapter: 10, s: `
@set street
?dooley_hurt DOOLEY: {HitsN}, Dash. You want me to arrest the Professor? With my arm in a sling?
?!dooley_hurt DOOLEY: {HitsN}, Dash. You want me to arrest the Professor?
DASH: His handwriting's on every one of Thorne's orders, Dooley. Union Station. Go.
DOOLEY: He gave me a dictionary for my birthday, Dash.
DASH: I know. Go anyway.
` },
{ id: 'c10.core.3-1.05', chapter: 10, s: `
@set bar
SAL: {HitsN}. You've got a face on. What is it?
DASH: The Proofreader's orders. In the Professor's handwriting. I've sent Dooley to arrest him at the station.
SAL: The Professor.
> Sal set down the glass he was polishing and wiped his hands on his apron, slowly, the way he does when he's sorry for somebody.
SAL: Be kind to him, Dash. He's an old man.
` },
{ id: 'c10.core.3-1.06', chapter: 10, s: `
@set morgue
FENN: {HitsN}. The correction slips on my dead. I had a graphologist look. Same hand on every one. The Professor's.
DASH: You're sure?
FENN: The graphologist is sure, Lexington. I'm never sure of anything that isn't lying down. Send your sergeant.
` }],
'3-2': [
{ id: 'c10.core.3-2.01', chapter: 10, s: `
@set precinct
> {GUESS} lit {hitsN}. Then Mags laid the last of the bindery orders on Briggs's blotter. Eleven corrections. One more, unsigned yet. All in the Professor's hand.
BRIGGS: Union Station. He's on the six o'clock.
DASH: Dooley. Go. Bring him in.
!!@DASH IT'S THE PROFESSOR'S HAND.
` },
{ id: 'c10.core.3-2.02', chapter: 10, s: `
@set pressroom
VERA: {HitsN}. Dash. The orders. "Remove," "Remove," "Remove." In his handwriting. Every letter.
DASH: The Professor.
VERA: Then send someone you trust.
DASH: I'm sending Dooley.
VERA: Good. Dooley's the only one of us who'll be kind about it.
` },
{ id: 'c10.core.3-2.03', chapter: 10, s: `
@set office
> {HitsN} in {GUESS}. On the open line, he was laughing softly, a long way off.
WORD: The handwriting. You've seen it. Go on. Send the sergeant. Union Station, six o'clock. Arrest the old man.
DASH: You want me to.
WORD: I want you to see everything, Lexington. At last.
> I sent Dooley. I didn't hang up.
` },
{ id: 'c10.core.3-2.04', chapter: 10, s: `
@set street
MAGS: {HitsN}, Detective. The bindery orders. All in the Professor's hand. And a ticket in his name for the six o'clock express.
DASH: Then Dooley meets him at the platform.
MAGS: And then?
DASH: And then I find out why a man who never rounds up would remove eleven people.
` },
{ id: 'c10.core.3-2.05', chapter: 10, s: `
@set station
> {GUESS}: {hitsN}. I phoned Union Station from the precinct and had them page Ambrose Thackeray. No answer.
> Mags had the orders in front of her. Eleven names. The Professor's handwriting. Dooley was already in a cab, with a warrant in his good hand.
DASH: Arrest him on the platform, Dooley. Gently.
` },
{ id: 'c10.core.3-2.06', chapter: 10, s: `
@set apartment
KOW: {HitsN}. Detective. You look like a man who must arrest a friend.
DASH: How do you know?
KOW: My husband was a policeman in Warsaw. He had this face once. He arrested his own brother. Then he came home and ate nothing.
> I sent Dooley to Union Station, for the Professor. Mrs. Kowalski made me eat a piece of bread anyway.
` }],
'3-3': [
{ id: 'c10.core.3-3.01', chapter: 10, s: `
@set precinct
> {GUESS}. Every letter of Thorne, out of order. And eleven orders in perfect order, in the Professor's hand.
DASH: Dooley. Union Station.
DOOLEY: I'll go, Dash. I don't believe it. But I'll go.
` },
{ id: 'c10.core.3-3.02', chapter: 10, s: `
@set pressroom
VERA: All five letters, and the Professor's handwriting on every order. Dash, one of those things is lying.
DASH: Which one?
VERA: I'm a proofreader, not a priest. Send Dooley to the station and find out.
` },
{ id: 'c10.core.3-3.03', chapter: 10, s: `
@set office
> All five, scrambled. On the open line, a soft voice reading aloud, from the Professor's dictionary.
WORD: "Betrayal, n.: a correction made by a friend." Send the sergeant, Lexington.
> I sent him. I've never forgiven myself for how easily I did it.
` }]
};
