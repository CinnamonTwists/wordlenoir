// Chapter 7 cores, suspect 3 (around two). Every one carries the midpoint turn (docs/story/bible.md §6): Mags decodes the precinct's
// dispatch log. Penny Ashcroft, the night dispatcher, is the leak. Briggs is clean. (Ties back to chapter 3's seal: night shift, 2 AM.)

export const CORES3 = {
'3-0': [
{ id: 'c07.core.3-0.01', chapter: 7, s: `
@set bar
> {GUESS} came up clean. Then Mags put the precinct's dispatch log on the table, open to September, with a ruler under one line.
MAGS: Every Lexicon job for a year, the night dispatcher sent the nearest car somewhere else. And September twelfth, 2 AM: she signed the evidence key out.
DASH: The Notary's seal.
MAGS: Officer Penelope Ashcroft. Penny. She's your leak, Detective. Not Briggs. Never Briggs.
** The leak had been answering our phones for a year.
` },
{ id: 'c07.core.3-0.02', chapter: 7, s: `
@set precinct
?dooley_hurt > {GUESS}: nothing. Dooley turned the dispatch log around on the desk with his good hand and tapped one name.
?!dooley_hurt > {GUESS}: nothing. Dooley turned the dispatch log around on the desk and tapped one name.
DOOLEY: Mags worked it out, Dash. The car assignments. Every Lexicon night, Ashcroft sent the cars away.
DASH: Penny Ashcroft. She brought me coffee every night for three years.
DOOLEY: She brought everybody coffee, Dash. That's how she knew where we all were.
` },
{ id: 'c07.core.3-0.03', chapter: 7, s: `
@set apartment
> {GUESS} was a bust. I took the log to Briggs's kitchen. He read the page Mags had marked, and put down his soup spoon.
BRIGGS: Ashcroft. Penny Ashcroft. I gave her a commendation in '47.
DASH: For what?
BRIGGS: For being the most reliable dispatcher in the city, Lexington. She was. Reliably theirs.
` },
{ id: 'c07.core.3-0.04', chapter: 7, s: `
@set office
MAGS: Detective. Forget {GUESS}. I decoded the precinct's dispatch log. It's not a code. It's a pattern. That's worse.
MAGS: Penny Ashcroft, the night dispatcher. Every Lexicon night for a year, she logged the cars away from the job. And she had the evidence key the night the seal walked out.
DASH: And Briggs?
MAGS: Clean as a whistle. City Hall suspended the wrong man.
` },
{ id: 'c07.core.3-0.05', chapter: 7, s: `
@set phonebooth
~sfx ring
MAGS: Detective. It's Ashcroft. Officer Penny Ashcroft. The dispatch log is a map of every job they've done, and her pencil drew it.
DASH: You're sure?
MAGS: I'm an engineer. I'm sure, or I'm quiet. Also, Briggs is clean. Tell him. Somebody should.
> {GUESS} had been five strangers. The sixth stranger had been sitting in my own precinct.
` }],
'3-1': [
{ id: 'c07.core.3-1.01', chapter: 7, s: `
@set bar
> {GUESS} gave me {hitsN}. Mags had the dispatch log open beside the deeds, and the same color in her face she gets near a bad circuit.
MAGS: Penny Ashcroft. Night dispatcher. A year of cars sent the wrong way on Lexicon nights.
DASH: She typed my reports.
MAGS: She read your reports, Detective. Every one. Before you did.
` },
{ id: 'c07.core.3-1.02', chapter: 7, s: `
@set precinct
?dooley_hurt DOOLEY: {HitsN}, Dash. And Mags called. It's Ashcroft. Penny. I'm sitting at her desk with my arm in a sling, in her chair.
?!dooley_hurt DOOLEY: {HitsN}, Dash. And Mags called. It's Ashcroft. Penny. I'm sitting at her desk, in her chair.
DASH: Don't touch anything.
DOOLEY: I already touched everything. There's a key taped under the drawer. Evidence locker four.
` },
{ id: 'c07.core.3-1.03', chapter: 7, s: `
@set apartment
BRIGGS: {HitsN}. And you're telling me it's the dispatcher.
DASH: Mags proved it from the log, Captain. You're clean.
BRIGGS: I know I'm clean, Lexington. I've been clean for twenty-six years. It's just nice to have it in writing.
` },
{ id: 'c07.core.3-1.04', chapter: 7, s: `
@set office
> {HitsN} out of {GUESS}. Mags ruled lines in the dispatch log with a red pencil. One line per Lexicon job: the Gazette, the Last Word, the penitentiary, WKRN, the station, the Hall of Records.
> On every one of those nights, at the hour it happened, Officer P. Ashcroft had sent the nearest car across town.
MAGS: It's not a code. It's a confession in somebody else's handwriting.
` },
{ id: 'c07.core.3-1.05', chapter: 7, s: `
@set street
QUIST: {HitsN}. You look like a man who's just found out something unpleasant about a friend.
DASH: A dispatcher.
QUIST: Oh, Penny. Darling Penny. She has such lovely handwriting. I taught her.
` },
{ id: 'c07.core.3-1.06', chapter: 7, s: `
@set vault
> {GUESS} had {hitsN}. Fosdick let me through the gate for one minute, because I told him the police leak had a name.
DASH: Officer Ashcroft. Does the bank know her?
> Fosdick went white. "She arranged the police escort for the wire," he said. "At a quarter to six. To the Federal Reserve."
` }],
'3-2': [
{ id: 'c07.core.3-2.01', chapter: 7, s: `
@set bar
> {GUESS} lit {hitsN}. Mags slapped the dispatch log on the table so hard the deeds on the wall shivered.
MAGS: Penny Ashcroft. Night dispatch. Every Lexicon job, she moved our cars away. And she signed out the evidence key the night the Notary's seal disappeared.
DASH: Then Briggs is clean.
MAGS: Briggs is the only clean thing in that building.
!!@MAGS IT'S THE DISPATCHER.
` },
{ id: 'c07.core.3-2.02', chapter: 7, s: `
@set precinct
> {HitsN} out of {GUESS}. The acting captain came out of Briggs's office while Dooley was reading the log aloud.
?dooley_hurt DOOLEY: Ashcroft, sir. A year of it. I'd stand up, but they told me not to with the collarbone.
?!dooley_hurt DOOLEY: Ashcroft, sir. A year of it. Every Lexicon night.
> The acting captain looked at the log, then at me, then at Briggs's empty coat hook. He didn't say a word. He went back into the office and shut the door.
` },
{ id: 'c07.core.3-2.03', chapter: 7, s: `
@set apartment
BRIGGS: {HitsN}. Read it to me again. The log.
DASH: Ashcroft. Every Lexicon night. Cars sent away. The evidence key, September twelfth, 2 AM.
BRIGGS: I signed her overtime for that night, Lexington. I thanked her for staying late.
DASH: You're clean, Captain.
BRIGGS: I'm clean and stupid. That's worse in a captain.
` },
{ id: 'c07.core.3-2.04', chapter: 7, s: `
@set office
MAGS: {GUESS}, {hitsN}. The dispatch log, decoded. Your leak is the night dispatcher. Penny Ashcroft.
DASH: How long?
MAGS: Since the Lexicon started. She's in their Index, I'd bet. She's tonight's police escort for the wire, too.
DASH: She's escorting the city to its own sale.
` },
{ id: 'c07.core.3-2.05', chapter: 7, s: `
@set street
> {HitsN} in {GUESS}. A police car pulled up beside Quist's easel. A woman officer got out with two coffees and handed one to the Forger.
> Penny Ashcroft. She saw me across the street, and raised her cup, the way she'd done in the squad room a thousand mornings.
DASH: Penny.
> She got back in the car and drove away. The log in my pocket said she always did.
` },
{ id: 'c07.core.3-2.06', chapter: 7, s: `
@set phonebooth
~sfx ring
PENNY: Detective Lexington? Dispatch. Officer Ashcroft. You've been asking about my log.
DASH: I've been reading it, Penny.
PENNY: Then you know where every car in the city is tonight. Except yours. Good luck finding a ride.
~sfx hangup
> {GUESS} had {hitsN}. The leak had my number. She'd always had it.
` }],
'3-3': [
{ id: 'c07.core.3-3.01', chapter: 7, s: `
@set bar
> {GUESS}. All of Quist, scrambled. And all of Penny Ashcroft, in order, in a dispatch log Mags had laid out on Sal's table.
MAGS: One of them's going to be easy, Detective.
DASH: The dispatcher. She wrote it all down.
MAGS: People who keep logs always do. That's why I keep mine.
` },
{ id: 'c07.core.3-3.02', chapter: 7, s: `
@set precinct
DOOLEY: All five, Dash. And the dispatch log. It's Ashcroft. Mags proved it.
DASH: Then Briggs comes back.
DOOLEY: If we stop the wire. City Hall won't take him back for a log. They'll take him back for a city.
` },
{ id: 'c07.core.3-3.03', chapter: 7, s: `
@set apartment
BRIGGS: All her letters, none in place. And a dispatcher I trusted.
DASH: You're clean, Captain. Mags proved it.
BRIGGS: Clean's what you are when nobody's looked hard enough, Lexington. Go look hard at the Forger.
` }]
};
