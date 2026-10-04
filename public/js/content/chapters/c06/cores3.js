// Chapter 6 cores, suspect 3 (around two). Every one carries the midpoint turn (docs/story/bible.md §6): the bomb is real, but the records
// were already moved out last week. The fire would hide that they're gone. (Bible r2: one file was pulled separately and never moved,
// juvenile court, 1931. A couple of scenes list it. Nobody remarks on it. Never underline it.)

export const CORES3 = {
'3-0': [
{ id: 'c06.core.3-0.01', chapter: 6, s: `
@set records
> {GUESS} came up clean. Dooley finally got old Mr. Pruitt to unlock the stacks, and Pruitt stood in the doorway and stopped talking.
> The shelves were empty. Aisle after aisle. Deeds, wills, court files: gone. Clean shelves and dust outlines where the boxes had been.
DOOLEY: The bomb's real, Dash. But there's nothing left to burn.
DASH: Then it's not here to burn the records. It's here to hide that somebody took them.
** The fire was never the crime. It was the alibi.
` },
{ id: 'c06.core.3-0.02', chapter: 6, s: `
@set office
> {GUESS}: nothing. Mags brought me the Hall of Records requisition book, borrowed from Pruitt's desk.
MAGS: Last Tuesday. Every original deed and court file in the building, signed out for "rebinding." Six trucks.
DASH: Rebinding where?
MAGS: It doesn't say. It just says "returned: pending." And one more line, separate, by hand: Juvenile court, 1931, one file. Not on the trucks.
DASH: The rest went somewhere. The fire's to make sure nobody ever asks where.
` },
{ id: 'c06.core.3-0.03', chapter: 6, s: `
@set precinct
BRIGGS: {GUESS}? Forget {GUESS}. Pruitt says the stacks are empty. The whole city's paperwork moved out a week ago, on a requisition nobody remembers signing.
DASH: And the bomb?
BRIGGS: Is real, Lexington, and it's sitting under a building full of empty shelves. Somebody wants it to look like the records burned.
` },
{ id: 'c06.core.3-0.04', chapter: 6, s: `
@set alley
> {GUESS} was a bust. Through the basement window, past the canary, I could see the archive shelves behind the charge. Empty.
DOOLEY: Where's all the paper, Dash?
DASH: Gone. Last week, Pruitt says. The fire's only here to make it look like it went up in smoke.
DOOLEY: So the fire's a lie.
DASH: The best lies always burn something real to prove themselves.
` },
{ id: 'c06.core.3-0.05', chapter: 6, s: `
@set street
MAGS: Detective. {GUESS} was nothing, but the Hall of Records is nothing too. I looked through every window with a flashlight.
MAGS: The shelves are bare. Somebody moved the archive out already. The bomb's a cover.
DASH: Then Pike isn't the end of this.
MAGS: Pike's the full stop, Detective. Somebody else wrote the sentence.
` }],
'3-1': [
{ id: 'c06.core.3-1.01', chapter: 6, s: `
@set records
> {GUESS} gave me {hitsN}. Pruitt led me through the stacks with his flashlight, aisle by aisle, saying the names of the files that should have been there.
> Deeds, 1880 to 1920. Probate. Civil court. Every shelf bare.
DASH: When?
> "Last Tuesday," Pruitt said. "For rebinding. Six trucks." His voice broke on "rebinding." He'd known all week that nobody rebinds a whole city.
DASH: The bomb's not for the records, Dooley. It's for the empty shelves.
` },
{ id: 'c06.core.3-1.02', chapter: 6, s: `
@set office
> {HitsN} in {GUESS}. The requisition slip Mags found, under Pruitt's blotter: ALL ORIGINALS, TO BINDERY, signed by a Comptroller's clerk who doesn't exist.
DOOLEY: So the archive's already gone.
DASH: And the bomb's to make it look like it burned. Nobody looks for paper that's been burned, Dooley.
` },
{ id: 'c06.core.3-1.03', chapter: 6, s: `
@set precinct
BRIGGS: {HitsN}. And Pruitt's empty shelves. The records were moved before the bomb was ever planted.
DASH: The bomb is the cover story.
BRIGGS: A cover story with forty pounds of dynamite and a canary, Lexington. I'd hate to see their real stories.
` },
{ id: 'c06.core.3-1.04', chapter: 6, s: `
@set street
DOOLEY: {GUESS} had {hitsN}. Dash, the trucking firm on the requisition. The drivers say they moved two hundred crates last Tuesday to a bank downtown.
DASH: Which bank?
DOOLEY: They don't know. They were paid not to look at the sign.
DASH: The records are gone, and the fire's to bury the fact.
` },
{ id: 'c06.core.3-1.05', chapter: 6, s: `
@set bar
> {GUESS} had {hitsN}. I told Sal the Hall of Records was empty. Every deed, every court file, gone a week before the bomb.
SAL: Everything? Then what's the bomb for?
DASH: To make it look like the paper burned, Sal. Nobody goes looking for ashes.
SAL: Smart. I hate smart. Smart's how you get robbed politely.
` },
{ id: 'c06.core.3-1.06', chapter: 6, s: `
@set alley
MAGS: {HitsN}. Detective, I counted the boxes in the basement window. There are none. The archive's gone. The bomb's under empty shelves.
DASH: Then why the bomb?
MAGS: Because nobody audits ashes.
` }],
'3-2': [
{ id: 'c06.core.3-2.01', chapter: 6, s: `
@set records
> {GUESS} lit {hitsN}. Old Mr. Pruitt unlocked the archive, flipped the lights, and sat down on the floor.
> Thirty-one years he'd guarded those stacks. They'd been empty for a week, and nobody had told him.
DASH: The bomb's not here to destroy the records, Dooley. They're already gone. It's here so nobody ever finds out they were stolen.
!!@DASH THE FIRE'S A COVER.
` },
{ id: 'c06.core.3-2.02', chapter: 6, s: `
@set office
> {HitsN} in {GUESS}. Mags read the requisition aloud while I wrote it on the blotter.
MAGS: "All originals: deeds, wills, court files, 1850 to present. To the bindery." Six trucks, last Tuesday. And one hand-written exception: juvenile court, 1931, pulled separately.
DASH: The rest is gone, and in four hours it'll be "burned."
MAGS: The perfect theft, Detective. Nobody ever asks a fire for a receipt.
` },
{ id: 'c06.core.3-2.03', chapter: 6, s: `
@set precinct
BRIGGS: {GUESS}, {hitsN}. And this. The shelves are empty. The records left a week ago on a forged requisition.
DASH: So the bomb's a cover.
BRIGGS: The bomb's a cover, the evacuation's my fault, and somebody owns the whole city's paperwork. Good night so far, Lexington?
` },
{ id: 'c06.core.3-2.04', chapter: 6, s: `
@set street
> {GUESS} gave me {hitsN}. Pruitt came out onto the steps in his cardigan with a flashlight and a face like a widower.
DOOLEY: He says the stacks are bare, Dash. Moved last Tuesday. He thought it was the bindery.
DASH: There's no bindery, Dooley. There's a bomb that'll make sure nobody ever goes looking for one.
` },
{ id: 'c06.core.3-2.05', chapter: 6, s: `
@set rooftop
> {HitsN}. On Pike's deck chair, a folded newspaper, last Wednesday's. A small item, circled: HALL OF RECORDS SENDS ARCHIVE FOR REBINDING.
DASH: He knew the building was empty when he wired it.
DOOLEY: Then he's not blowing up the records.
DASH: He's blowing up the evidence that they ever left.
` },
{ id: 'c06.core.3-2.06', chapter: 6, s: `
@set alley
MAGS: {HitsN}. I've been down the coal chute. There's no paper in that basement. Just a bomb, a bird, and empty shelves.
DASH: The archive moved out last week.
MAGS: Then whoever owns the city now owns it on paper, Detective, and the fire's the receipt nobody can read.
` }],
'3-3': [
{ id: 'c06.core.3-3.01', chapter: 6, s: `
@set records
> {GUESS}. Every letter of Pike, out of order. And every shelf in the archive, empty.
DOOLEY: You've got all of him, Dash, and they've got all of the city.
DASH: The records left a week ago. The bomb's just there to say they burned.
` },
{ id: 'c06.core.3-3.02', chapter: 6, s: `
@set precinct
BRIGGS: Five letters, all wrong places. Like the city's paperwork. All of it gone somewhere, none of it where it should be.
DASH: Moved last Tuesday, Captain. The fire's the cover.
BRIGGS: Then put the man in order, Lexington. Maybe he'll put the paper back.
` },
{ id: 'c06.core.3-3.03', chapter: 6, s: `
@set office
> All of his letters, scrambled. On the desk, the requisition: every record in the city, signed out a week ago to a bindery that doesn't exist.
> The fire was a full stop on a sentence somebody else had already written.
` }]
};
