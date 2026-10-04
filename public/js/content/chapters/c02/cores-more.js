// Chapter 2 cores added in step 9 (bringing every slot to the T8 budget: bucket 0 ×5, 1 ×6, 2 ×6, 3 ×3), suspects 1–2.
// Merged into CORES by index.js. Ids continue the slice's numbering; never renumber them.

export const CORES_MORE = {
'1-0': [
{ id: 'c02.core.1-0.03', chapter: 2, s: `
@set docks
> First suspect: {GUESS}. I said it into the fog at the foot of Pier {pier}, and the fog didn't so much as shift.
DOOLEY: Five alibis, Dash.
DASH: Five innocent letters on a waterfront, Dooley. That's a first.
` },
{ id: 'c02.core.1-0.04', chapter: 2, s: `
@set alley
> {GUESS} came up empty. Behind the Last Word, the kitchen door was propped with a brick, and a pot of soup was still warm on the back step.
DASH: She left soup out for the cats.
DOOLEY: Who poisons a man and feeds the cats?
DASH: Somebody who keeps very careful accounts, Dooley. The cats were never on the books.
` },
{ id: 'c02.core.1-0.05', chapter: 2, s: `
@set office
> {GUESS}: five strangers. I sat in my office with Benny Fusco's bar tab, the last one he ever ran. Rye, rye, rye, and then nothing.
> The last line was in a woman's hand, very neat. PAID IN FULL.
` }],
'1-1': [
{ id: 'c02.core.1-1.03', chapter: 2, s: `
@set precinct
BRIGGS: {HitsN} out of {GUESS}. And a Varga leftover in my lobby, asking for protection.
DASH: From who?
BRIGGS: From a nice lady who does his books, Lexington. He says she's the most frightening person he's ever met. He used to break legs for a living.
` },
{ id: 'c02.core.1-1.04', chapter: 2, s: `
@set street
> {GUESS} gave me {hitsN}. On Front Street, a coffee cart was setting up for the dock shift. The cook said a lady in a wool coat had paid for six coffees in advance.
DASH: For who?
> "For the boys on the Lindqvist," he said. "She said they'd be working late."
` },
{ id: 'c02.core.1-1.05', chapter: 2, s: `
@set office
> {HitsN} in {GUESS}. I spread Della's ledger paper on my desk. Columns of tabs, every one in that tidy hand. Beer, rye, gin, and names.
DASH: She wrote down every drink in the waterfront for a year.
DOOLEY: Is that a crime?
DASH: Not the drinks, Dooley. The names.
` },
{ id: 'c02.core.1-1.06', chapter: 2, s: `
@set phonebooth
~sfx ring
WORD: Tab. A small account, kept open. Also, Lexington, what a friend keeps on you. Who's keeping yours?
DASH: Nobody's keeping my tab.
WORD: Somebody always is.
~sfx hangup
> {GUESS} had {hitsN}. The voice wanted me to look at my own account. I didn't want to.
` }],
'1-2': [
{ id: 'c02.core.1-2.03', chapter: 2, s: `
@set docks
> First try, and {GUESS} lit {hitsN}. Up on the Lindqvist's deck, a light went out, then came back on, like someone had heard me.
DASH: She's aboard, Dooley.
DOOLEY: Or she wants you to think so.
DASH: That's the trouble with bookkeepers. Everything adds up the way they want it to.
` },
{ id: 'c02.core.1-2.04', chapter: 2, s: `
@set precinct
BRIGGS: {HitsN}. On the first one. Good. Now I'm going to tell you something you won't like. Della Marsh does the precinct's coffee-fund books.
DASH: Ours?
BRIGGS: Ours, Lexington. Eleven years. The fund's never been a penny short. That's how I know she's dangerous.
` },
{ id: 'c02.core.1-2.05', chapter: 2, s: `
@set street
> {GUESS} put {hitsN} in her name. A cab pulled up outside the Last Word and an old woman got out with a carpetbag. She looked up at the sign, smiled, and got back in.
DOOLEY: That her?
DASH: That was her saying goodbye to the bar, Dooley.
!!@DASH SHE'S RUNNING.
` },
{ id: 'c02.core.1-2.06', chapter: 2, s: `
@set alley
> {HitsN} in {GUESS}. In the alley, Pete was sitting on a crate eating a bowl of somebody's soup.
PETE: Mrs. Marsh left it out. She always leaves it out Friday nights.
DASH: Pete, put the spoon down.
PETE: It's just soup, Lexington.
DASH: So was Benny's rye.
` }],
'1-3': [
{ id: 'c02.core.1-3.03', chapter: 2, s: `
@set office
> {GUESS}. Every letter in her, every one in the wrong column. Like a ledger somebody had shaken upside down.
DASH: She's all here, Dooley. She just doesn't balance yet.
` }],
'2-0': [
{ id: 'c02.core.2-0.03', chapter: 2, s: `
@set docks
> {GUESS}: five strangers. The night watchman on Pier {pier} was asleep in his shack with a bowl of soup in his lap.
DOOLEY: Is he...
DASH: Snoring, Dooley. That's the good kind of asleep.
> I took the bowl away from him anyway. You never know what's in the soup on this waterfront.
` },
{ id: 'c02.core.2-0.04', chapter: 2, s: `
@set office
> {GUESS} came up clean. On my desk, the Lindqvist's manifest, borrowed from the harbor master. Cotton, machine parts, office supplies, and one passenger: Mrs. D. Marsh, cook's assistant.
DASH: Cook's assistant.
> Of course. Nobody ever looks twice at the woman with the soup.
` },
{ id: 'c02.core.2-0.05', chapter: 2, s: `
@set precinct
BRIGGS: {GUESS}? Not a letter. Lexington, the Varga leftover in my lobby has started crying. Grown man. Broke legs for twenty years.
DASH: What's he crying about?
BRIGGS: He says she always remembered his birthday. He says nobody else ever did.
` }],
'2-1': [
{ id: 'c02.core.2-1.03', chapter: 2, s: `
@set office
> {GUESS} gave me {hitsN}. I matched the ledger's tabs against the Varga family's old payroll. Half the names were the same men.
DASH: She didn't replace the Vargas, Dooley. She hired them.
DOOLEY: They work for her now?
DASH: They work for a bar tab. Same thing, on the waterfront.
` },
{ id: 'c02.core.2-1.04', chapter: 2, s: `
@set precinct
BRIGGS: {HitsN}. Fenn says Benny Fusco's rye had enough cyanide in it to kill a horse.
DASH: Benny wasn't a horse.
BRIGGS: No. A horse would have smelled the almonds. Benny was drinking on credit, Lexington. You don't sniff a free drink.
` },
{ id: 'c02.core.2-1.05', chapter: 2, s: `
@set street
DOOLEY: {HitsN} out of {GUESS}. And Dash, every bar on Front Street has a woman doing their books. Same woman. Same soup.
DASH: Della Marsh does the books for the whole waterfront.
DOOLEY: Then she knows who owes what to who, all the way down the river.
DASH: That's not a bookkeeper, Dooley. That's a government.
` },
{ id: 'c02.core.2-1.06', chapter: 2, s: `
@set docks
> {HitsN} in {GUESS}. The Lindqvist's bosun came down the gangway for a smoke and talked to me like I was the weather.
> "Nice old lady," he said. "Came aboard at ten with a sea chest. Made the crew soup. The captain wants to adopt her."
DASH: Tell the captain to check his tab.
` }],
'2-2': [
{ id: 'c02.core.2-2.03', chapter: 2, s: `
@set office
> {GUESS} lit {hitsN}. Her name was coming together on my blotter like the bottom line of a long column.
DASH: Nearly balanced.
DOOLEY: You sound like her, Dash.
DASH: You have to, Dooley. You can't catch an accountant without doing the arithmetic.
` },
{ id: 'c02.core.2-2.04', chapter: 2, s: `
@set precinct
BRIGGS: {HitsN}. You've got most of her. The harbor master's on my phone saying the Lindqvist has a schedule to keep.
DASH: So do I.
BRIGGS: His schedule has an ocean on it, Lexington. Yours has me. Keep it.
` },
{ id: 'c02.core.2-2.05', chapter: 2, s: `
@set alley
> {HitsN} in {GUESS}. The cat from the alley had followed me to the docks. It sat on a bollard and watched the Lindqvist like it had money on the outcome.
DASH: You're on her books too, aren't you?
> The cat didn't answer. It had soup on its whiskers.
` },
{ id: 'c02.core.2-2.06', chapter: 2, s: `
@set docks
DOOLEY: {GUESS} had {hitsN}, Dash. The Lindqvist's crew are coming back from the bars. Singing. Every one of them's got a little card in his pocket.
DASH: What card?
DOOLEY: A bar tab, Dash. From the Last Word. Paid in full.
` }],
'2-3': [
{ id: 'c02.core.2-3.03', chapter: 2, s: `
@set office
> {GUESS}. All her letters, in all the wrong columns. A bookkeeper's nightmare. Or a bookkeeper's alibi.
DASH: Add it up again, Lexington. Slower.
** Every figure right. The total wrong.
` }]
};
