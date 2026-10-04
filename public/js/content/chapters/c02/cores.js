// Chapter 2 cores. Key: '<guess>-<bucket>'. Bucket 0: no hits · 1: 1-2 hits · 2: 3-4 hits · 3: five hits, wrong order.
// Guess 3 carries the midpoint turn (docs/story/bible.md §6): Pete's tab is in the ledger. He's been a Footnote for a year without knowing it.

export const CORES = {
'1-0': [
{ id: 'c02.core.1-0.01', chapter: 2, s: `
@set bar
> First suspect: {GUESS}. I said it across the bar like I was ordering it. Nothing in the room so much as blinked.
SAL: Not one letter? That's a clean glass, Dash.
DASH: Then they drink on the house. They're innocent.
SAL: Nobody's innocent on the house. That's why it's on the house.
` },
{ id: 'c02.core.1-0.02', chapter: 2, s: `
@set precinct
BRIGGS: {GUESS}. Every letter of it home in bed with its mother.
DASH: Even the bad ones have mothers, Captain.
BRIGGS: Spare me. Two of these Lexicon cases in two weeks, and City Hall thinks I'm making them up for the overtime.
> He held up two fingers. Then he looked at them like they might be lying too.
` }],
'1-1': [
{ id: 'c02.core.1-1.01', chapter: 2, s: `
@set bar
> {GUESS} gave me {hitsN}. Sal set a coaster down in front of me without being asked and wrote the count on it in pencil.
SAL: {HitsN} on your tab. That's how she'd have done it.
DASH: Della kept score on coasters?
SAL: Della kept score on everything. That's what a bookkeeper is.
` },
{ id: 'c02.core.1-1.02', chapter: 2, s: `
@set docks
> Somewhere out in the fog, the Lindqvist was taking on cargo and pretending not to listen.
DOOLEY: {GUESS}. {HitsN} in the gang, Dash. It's a start.
DASH: It's a down payment, Dooley. She owes us the rest.
` }],
'1-2': [
{ id: 'c02.core.1-2.01', chapter: 2, s: `
@set bar
> {GUESS} lit up {hitsN} on the first try. Sal stopped polishing.
SAL: That's a lot of her for one question.
DASH: She's a lot of woman, Sal.
SAL: She brought me soup. Don't say it like that.
> He went back to the glass. It was the cleanest glass in the city, and it was about to get cleaner.
` },
{ id: 'c02.core.1-2.02', chapter: 2, s: `
@set office
> I wrote {GUESS} on the blotter and circled {hitsN}. A good start. The kind that makes you careless.
~sfx ring
DOOLEY: Dash, the harbor master says the Lindqvist's manifest lists a sea chest of "office supplies." Bound for Lisbon.
DASH: Nobody ships office supplies to Lisbon.
DOOLEY: Somebody does tonight.
` }],
'1-3': [
{ id: 'c02.core.1-3.01', chapter: 2, s: `
@set bar
> {GUESS}. All five letters were in her, and every one of them was sitting on the wrong stool.
SAL: You've got the whole crowd, Dash. They just won't sit where you want them.
DASH: Story of every bar I've ever been in.
** Five letters. Wrong chairs.
` },
{ id: 'c02.core.1-3.02', chapter: 2, s: `
@set precinct
BRIGGS: Five for five, and you're still not holding her?
DASH: I'm holding all of her, Captain. I'm holding her upside down.
BRIGGS: Then turn her over. Gently. She's got a face like somebody's mother.
` }],
'2-0': [
{ id: 'c02.core.2-0.01', chapter: 2, s: `
@set alley
> The alley behind the Last Word: Della's kitchen door, a crate of empties, and a cat that had seen everything and filed none of it.
DASH: {GUESS}. Five more strangers.
> The cat looked at me the way a bookkeeper looks at a man who says the check is in the mail.
` },
{ id: 'c02.core.2-0.02', chapter: 2, s: `
@set bar
SAL: {GUESS}? None of it, Dash. Eat something. You think better with bread in you.
DASH: I think better with rye in me.
SAL: You think louder with rye in you. It's not the same.
> He pushed a plate of bread across the bar. I ate it. Sal is never wrong about bread.
` }],
'2-1': [
{ id: 'c02.core.2-1.01', chapter: 2, s: `
@set bar
> Second suspect, {GUESS}: {hitsN} came up guilty. I took the back room apart while Sal watched from the door.
> Behind a loose board: a box of green ledger paper, and a pencil stub sharpened at both ends.
SAL: She always had a pencil behind each ear. I thought it was a joke.
DASH: It was a system.
` },
{ id: 'c02.core.2-1.02', chapter: 2, s: `
@set docks
DOOLEY: {GUESS} had {hitsN}. And the watchman on Pier {pier} says a woman brought a sea chest aboard the Lindqvist at ten. Nice lady. Brought him soup.
DASH: Everybody gets soup.
DOOLEY: I didn't get soup.
DASH: You're not in the ledger, Dooley. Yet.
` }],
'2-2': [
{ id: 'c02.core.2-2.01', chapter: 2, s: `
@set bar
> {GUESS}: {hitsN}. Her name was filling in like a tab on payday.
SAL: You're getting close. I can tell. You get quiet.
DASH: I'm always quiet.
SAL: You're quiet like a man reading. Right now you're quiet like a man counting.
` },
{ id: 'c02.core.2-2.02', chapter: 2, s: `
@set street
> {GUESS} gave me {hitsN}. Outside the Last Word, the rain was settling up with the gutters.
DOOLEY: The fellas at the Pier {pier} gate say she isn't aboard yet. She'll go up the gangway last thing, with the crew.
DASH: Then we've got a clock and a door. That's more than we usually get.
!!@DASH I'M COMING TO COLLECT.
` }],
'2-3': [
{ id: 'c02.core.2-3.01', chapter: 2, s: `
@set bar
> {GUESS}. All her letters, none in the right column. A bookkeeper would call it a transposition error.
SAL: The most common mistake in the world, Della used to say. Two figures trade places and the whole book's wrong.
DASH: How do you catch it?
SAL: You add it all up again. Slower.
` },
{ id: 'c02.core.2-3.02', chapter: 2, s: `
@set precinct
BRIGGS: All five, Lexington? And not one of them in its seat?
DASH: Ever see a bar fight, Captain? Everybody's there. Nobody's where they started.
BRIGGS: Then break it up.
` }],
'3-0': [
{ id: 'c02.core.3-0.01', chapter: 2, s: `
@set bar
> {GUESS} came up clean. While I cursed it, Sal brought the ledger paper out of the back room and set it in front of me like a bill.
SAL: Read the tabs, Dash. Read whose they are.
> Halfway down page four: PETE (LUCKY). Eleven dollars and forty cents, carried forward. Settled every Friday for a year.
DASH: Pete's not a member. Pete sells newspapers.
SAL: Pete hasn't paid for a drink since last October. Somebody's been paying for him. In errands.
** A year on their payroll, and nobody told Pete.
` },
{ id: 'c02.core.3-0.02', chapter: 2, s: `
@set street
PETE: Lexington! You look like a man who's been reading something he shouldn't.
DASH: {GUESS} was a bust, Pete. But your name wasn't.
> I showed him the line. PETE (LUCKY). Paid in full, every Friday, by errands he thought were favors.
PETE: Them envelopes? I thought I was doing a nice lady a kindness.
DASH: You were, Pete. Fifty-two times.
` }],
'3-1': [
{ id: 'c02.core.3-1.01', chapter: 2, s: `
@set bar
> {GUESS} gave up {hitsN}. Then Sal turned the ledger around so I could read it.
SAL: I didn't want to show you this. Look at the name under Fusco's.
DASH: "Pete (Lucky)." He's a Footnote.
SAL: Footnotes don't know they're footnotes, Dash. That's what makes them footnotes.
` },
{ id: 'c02.core.3-1.02', chapter: 2, s: `
@set alley
PETE: Lexington. I heard you got a ledger. I heard my name's in it.
DASH: {GUESS} had {hitsN} of her. Your page had all of you, Pete. A year of envelopes.
PETE: I carried 'em down to the pier for a lady who paid my tab. That's all. I never opened one.
DASH: That's why she picked you.
` }],
'3-2': [
{ id: 'c02.core.3-2.01', chapter: 2, s: `
@set office
> {GUESS} put {hitsN} in her name. Then I laid the ledger out on my desk, and Pete looked up at me from page four.
DASH: Pete's tab. Never paid, never called in. Settled every Friday with a run to the docks.
> The man who sells me my morning paper had been carrying the Lexicon's mail for a year, for the price of a beer.
!!@DASH THEY BOUGHT PETE FOR A BEER.
` },
{ id: 'c02.core.3-2.02', chapter: 2, s: `
@set precinct
BRIGGS: {GUESS}, {hitsN}. Good. And your newsboy's name is in a murderer's ledger.
DASH: Pete didn't know.
BRIGGS: Nobody ever knows, Lexington. That's how they get a whole city working for them. One errand at a time.
` }],
'3-3': [
{ id: 'c02.core.3-3.01', chapter: 2, s: `
@set bar
> {GUESS}: all of her, every letter out of order. And the ledger had all of Pete.
SAL: He comes in Fridays. Sits at the end. Drinks one beer, talks about horses, never pays.
DASH: And you never asked why.
SAL: I'm a bartender, Dash. If I asked why, I'd have no customers.
` },
{ id: 'c02.core.3-3.02', chapter: 2, s: `
@set docks
PETE: That's my name. Why's my name in a dead man's book?
DASH: {GUESS} had every letter of her, Pete. Your page had every week of you.
PETE: Every week?
DASH: Every Friday for a year. You're a Footnote. You just never read the small print.
` }],
'4-0': [
{ id: 'c02.core.4-0.01', chapter: 2, s: `
@set docks
> Four o'clock. The Lindqvist's deck lights came on one at a time, like somebody counting out change. {GUESS} came up empty.
DOOLEY: Two hours, Dash.
DASH: I can count, Dooley.
DOOLEY: Sorry. It's the docks. Everybody counts down here.
` },
{ id: 'c02.core.4-0.02', chapter: 2, s: `
@set phonebooth
~sfx ring
> {GUESS} had nothing for me, and the phone had something to say about it.
WORD: Ledger. A book in which a debt is remembered long after the debtor has forgotten it.
DASH: Who is this?
WORD: Ask the Bookkeeper, Lexington. She remembers everybody.
~sfx hangup
` }],
'4-1': [
{ id: 'c02.core.4-1.01', chapter: 2, s: `
@set gangway
> The Lindqvist's gangway, under a single bulb. {GUESS} gave me {hitsN}. The bosun gave me a look.
DOOLEY: The captain says he sails at six, with or without a warrant.
DASH: Tell him I'll bring one. It's five letters long.
` },
{ id: 'c02.core.4-1.02', chapter: 2, s: `
@set bar
> {GUESS} gave me {hitsN}. Sal had a red pencil behind his ear and was ticking off the night's tabs, the way he does every night at four.
SAL: Don't look at me like that. It's for the tabs. Della sold me the habit.
DASH: She sold everybody something.
SAL: She sold me soup, Dash. It was good soup.
` }],
'4-2': [
{ id: 'c02.core.4-2.01', chapter: 2, s: `
@set docks
> {GUESS} put {hitsN} in her name. Up the pier, a woman in a good wool coat was buying coffee from a cart and paying in exact change.
DOOLEY: That's her, Dash. Has to be.
DASH: Could be anybody's mother.
DOOLEY: That's what I mean.
> By the time we got there, there was only the cart, a nickel tip, and the steam.
` },
{ id: 'c02.core.4-2.02', chapter: 2, s: `
@set street
~sfx ring
> A pay phone outside the all-night diner rang as I walked past. I picked it up out of habit.
DELLA: You look tired, sugar. Have you eaten?
DASH: Mrs. Marsh.
DELLA: {GUESS}. That one was close. I'll give you it for free.
~sfx hangup
` }],
'4-3': [
{ id: 'c02.core.4-3.01', chapter: 2, s: `
@set gangway
> {GUESS}: every letter hers, every letter on the wrong line. Two tries left, and the crew were singing on deck.
DASH: She's in there. I just have to add her up right.
!!@DASH BALANCE THE BOOKS.
` },
{ id: 'c02.core.4-3.02', chapter: 2, s: `
@set precinct
BRIGGS: All five, again. Lexington, you've got more of this woman than her own husband had.
DASH: She's a widow, Captain.
BRIGGS: I'm not surprised.
` }],
'5-0': [
{ id: 'c02.core.5-0.01', chapter: 2, s: `
@set docks
> Five o'clock. The fog started to lift off the water like a sheet off a body. {GUESS} came up clean.
DOOLEY: One left, Dash.
DASH: One's all I ever need, Dooley. It's the five before it that kill me.
` },
{ id: 'c02.core.5-0.02', chapter: 2, s: `
@set bar
> I went back to the Last Word to think. Sal had the chairs up on the tables and one stool down. Mine.
SAL: {GUESS}? Nothing?
DASH: Nothing.
SAL: Then the next one's yours. The last one usually is.
> I wanted to believe him. Sal's never wrong. That night I needed him to be right, which isn't the same thing.
` }],
'5-1': [
{ id: 'c02.core.5-1.01', chapter: 2, s: `
@set gangway
> {GUESS} had {hitsN}. The Lindqvist's crew started hauling in the mooring lines like they were reeling in the night.
DASH: Hold that gangway!
DOOLEY: On whose say-so?
DASH: The city's. It just doesn't know it yet.
** One suspect left. Then the tide.
` },
{ id: 'c02.core.5-1.02', chapter: 2, s: `
@set docks
PETE: Lexington! I ran every pier from here to the breakwater. She's on the Lindqvist, Pier {pier}. Went aboard with the cook.
DASH: {GUESS} had {hitsN}. Thanks, Pete.
PETE: Don't thank me. Put it on my tab.
DASH: Pete.
PETE: Too soon?
` }],
'5-2': [
{ id: 'c02.core.5-2.01', chapter: 2, s: `
@set gangway
> {GUESS} lit {hitsN}. Della Marsh was at the rail in a shawl, watching me like I was her boy, late for supper.
DELLA: You should have eaten something, sugar.
DASH: One more name, Mrs. Marsh. Then I'll eat.
` },
{ id: 'c02.core.5-2.02', chapter: 2, s: `
@set phonebooth
~sfx ring
WORD: Last call, Lexington.
DASH: The bar's closed.
WORD: Not that one. The other one. The one at six.
~sfx hangup
> {GUESS} had {hitsN}. I had one question left, and a phone that wouldn't stop knowing things.
` }],
'5-3': [
{ id: 'c02.core.5-3.01', chapter: 2, s: `
@set gangway
> {GUESS}. All of Della Marsh, scrambled like the books of a man who's been skimming.
DELLA: You've got every letter of me, sugar. Now say it like you mean it.
!!@DASH TIME TO SETTLE UP.
` },
{ id: 'c02.core.5-3.02', chapter: 2, s: `
@set precinct
BRIGGS: Every letter. All night long. And she's on a boat.
DASH: The boat hasn't left.
BRIGGS: Boats always leave, Lexington. It's the one thing you can count on about a boat.
` }]
};
