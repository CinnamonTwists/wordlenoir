// Chapter 9 cores, suspect 4 (around three). Lola is still in the warehouse, changing parts; the real Fourth Ward boxes are hidden inside.

export const CORES4 = {
'4-0': [
{ id: 'c09.core.4-0.01', chapter: 9, s: `
@set warehouse
> Three o'clock. {GUESS} came up empty. I hadn't given her the ten minutes. She'd taken them anyway, and come back in a new hat.
LOLA: You didn't give me my head start, Detective.
DASH: You didn't give me your word.
LOLA: Touché. Act two.
` },
{ id: 'c09.core.4-0.02', chapter: 9, s: `
@set street
> {GUESS}: five strangers. A black sedan idled across the street from the warehouse. Inside, a man in a grey overcoat was reading a book with a red pencil in his hand.
> When I crossed toward it, the sedan pulled away. Courteously. With its indicator on.
DASH: Thorne.
` },
{ id: 'c09.core.4-0.03', chapter: 9, s: `
@set precinct
?!briggs_out BRIGGS: Nothing in {GUESS}. Lexington, I sent two cars to Mercer Street. The bookbinder's attic was empty. Swept. Not a hair.
?briggs_out BRIGGS: Nothing in {GUESS}. Lexington, first night back, I sent two cars to Mercer Street. The attic was empty. Swept. Not a hair.
DASH: He's tidy.
BRIGGS: He's thorough. Tidy men get caught. Thorough ones don't.
` },
{ id: 'c09.core.4-0.04', chapter: 9, s: `
@set apartment
> {GUESS} was a bust. I went back to Mrs. Kowalski's floor. Her door was locked. Her light was off. She was still at the warehouse.
> On my own door, a note in a beautiful copperplate: "MRS. K. WITNESSED THE FOURTH WARD. HOW CONSCIENTIOUS." No signature. A red pencil line under "witnessed."
DASH: Thorne's been to my building.
` },
{ id: 'c09.core.4-0.05', chapter: 9, s: `
@set bar
SAL: Empty?
DASH: Empty. And the Proofreader's been to my building, Sal. He left a note about Mrs. Kowalski.
SAL: Then go get your landlady, Dash. Old ladies who pay attention don't last long in this city.
` }],
'4-1': [
{ id: 'c09.core.4-1.01', chapter: 9, s: `
@set warehouse
> {GUESS} gave me {hitsN}. Mrs. Kowalski was still in her folding chair by the Fourth Ward boxes, knitting, with her handbag on her lap like a guard dog.
DASH: Mrs. Kowalski, you need to go home.
KOW: I am a witness, Mr. Lexington. I signed. Witnesses do not go home until it is finished.
DASH: Somebody's coming for the witnesses.
KOW: Then they will find me knitting.
` },
{ id: 'c09.core.4-1.02', chapter: 9, s: `
@set street
?vera_saved_herself VERA: {HitsN}. Dash, I've found the real boxes. The milk crates at the back of the loading bay. Six of them, with the Fourth Ward's original seals.
?!vera_saved_herself VERA: {HitsN}. Dash, the milk crates at the back of the loading bay. Six of them, with the Fourth Ward's original seals.
DASH: You found them?
VERA: I read the seals, Dash. Proofreaders read everything. Even wax.
` },
{ id: 'c09.core.4-1.03', chapter: 9, s: `
@set office
MAGS: {HitsN}. Detective, Thorne's list. I've got it from the Index pages we have. Every person who touched the Fourth Ward count tonight. Clerks, drivers, witnesses.
DASH: Names?
MAGS: Six names. Five are Lexicon. The sixth is a witness. A landlady. Signed in at midnight.
` },
{ id: 'c09.core.4-1.04', chapter: 9, s: `
@set precinct
?dooley_hurt DOOLEY: {HitsN}, Dash. I've put the word out on the radio. Every car's watching for a grey sedan with its indicator on. I'd chase it myself if I had two arms.
?!dooley_hurt DOOLEY: {HitsN}, Dash. Every car's watching for a grey sedan with its indicator on. I'd chase it myself, but Briggs says I'm on the radio.
DASH: Stay on the radio, Dooley.
DOOLEY: I'm always on the radio now, Dash. I've got a voice for it.
` },
{ id: 'c09.core.4-1.05', chapter: 9, s: `
@set phonebooth
~sfx ring
THORNE: Detective Lexington. Ellery Thorne. Miss Vance has told you my name. That was a lapse on her part. I've noted it.
DASH: Come in and note it to my face.
THORNE: I don't make appointments, Detective. I keep them. Good night.
~sfx hangup
> {GUESS} had {hitsN} of Lola. Thorne's voice had been perfectly pleasant. That was the worst thing about it.
` },
{ id: 'c09.core.4-1.06', chapter: 9, s: `
@set alley
EDDIE: {HitsN}, Detective? The boys from Pier Nine are at the loading bay. We'll carry whatever boxes you need carried.
DASH: The milk crates, Eddie. Six of them. Don't let anybody near them.
EDDIE: Nobody's getting near a crate on my watch. I've been guarding crates my whole life.
` }],
'4-2': [
{ id: 'c09.core.4-2.01', chapter: 9, s: `
@set warehouse
> {GUESS} lit {hitsN}. Lola climbed onto the tally table in a chorus girl's skirt, of all things, and announced a recount of the Third Ward. Everybody turned to look.
> While they looked, two men moved toward the milk crates. Eddie's men stood up.
!!@DASH NOT THIS TIME, LOLA.
` },
{ id: 'c09.core.4-2.02', chapter: 9, s: `
@set office
LOLA: {HitsN}. You're nearly there, darling. I'll miss this. You and me, and the lies.
DASH: You never lied to me, Lola. You rehearsed.
LOLA: Oh, that's very good. Can I use that?
` },
{ id: 'c09.core.4-2.03', chapter: 9, s: `
@set precinct
?!briggs_out BRIGGS: {HitsN}. Two hours. The board certifies at six whether you've got her or not.
?briggs_out BRIGGS: {HitsN}. Two hours. First night back and the board certifies at six whether you've got her or not.
DASH: Then I'll have her by six.
BRIGGS: Make it a quarter to, Lexington. I'd like a cup of coffee before I make history.
` },
{ id: 'c09.core.4-2.04', chapter: 9, s: `
@set street
> {HitsN} in {GUESS}. The grey sedan was back across the street, with its engine off and its lights out. The man inside was writing in a little book.
> When he saw me, he raised his red pencil like a man raising his hat. Then he wrote something down.
DASH: He's making a list, Dooley.
DOOLEY: Of what?
DASH: Of who's left.
` },
{ id: 'c09.core.4-2.05', chapter: 9, s: `
@set bar
SAL: {HitsN}. You've nearly got her.
DASH: And the Proofreader's out there writing names in a book.
SAL: Then you catch her, Dash, and you leave him for tomorrow. One thing at a time. You always did try to do two.
` },
{ id: 'c09.core.4-2.06', chapter: 9, s: `
@set apartment
> {GUESS}: {hitsN}. I called the warehouse from home and asked for Mrs. Kowalski. The volunteer who answered said she'd gone to the ladies' room.
> I listened to the warehouse noise for a full minute. Then a voice came on the line. Mrs. Kowalski, cross.
KOW: Mr. Lexington. I was in the ladies' room. Is that now also a crime?
DASH: Stay where people can see you, Mrs. Kowalski.
` }],
'4-3': [
{ id: 'c09.core.4-3.01', chapter: 9, s: `
@set warehouse
> {GUESS}. All of Lola's letters, every one in the wrong role. Two questions left. Up in the rafters, a pigeon was watching the count like a poll watcher.
LOLA: Two more tries, darling. Don't flub your lines.
` },
{ id: 'c09.core.4-3.02', chapter: 9, s: `
@set office
LOLA: All five letters. All in the wrong order. It's like opening night, Dash. Everyone knows the words. Nobody remembers the blocking.
DASH: I remember yours.
** Every letter of her. Every part but the real one.
` },
{ id: 'c09.core.4-3.03', chapter: 9, s: `
@set precinct
BRIGGS: Five out of five, scrambled. Lexington, I've seen election results less confused than this.
DASH: Not tonight's.
BRIGGS: Tonight's aren't results, Lexington. They're a performance.
` }]
};
