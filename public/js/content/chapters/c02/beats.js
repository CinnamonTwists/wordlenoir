// Chapter 2 outro beats (after the ending) and the interlude (the day after). Bible §4, §6, §7.2.
// Beats by result: fast (won on guess 1–2), slow (3–4), near (5–6), escaped (a loss: the retelling, then the night starts over).
// Every won beat sets up chapter 3's hook: the ledger pays the prosecutor's office for a confession signed by a man due to die at dawn tomorrow.

export const BEATS = {
fast: [
{ id: 'c02.beat.fast.a', chapter: 2, s: `
@set precinct!
@mood warm
> We spread the ledger copy across three desks. Dooley read the names. I read the numbers.
DOOLEY: Here's a strange one. "Prosecutor's office, for services. One confession, signed and sworn."
DASH: Whose confession?
DOOLEY: A dockworker named Ruiz. Says here he goes to the chair tomorrow, at six.
> The Lexicon didn't just pay for murders. It paid for the paperwork afterward.
@set hearing!
@mood blue
~rain off
RUTH: The prosecutor's office, Detective? You're certain?
DASH: I'm certain of the ledger. I was never certain of the prosecutor's office.
~paper SESSION TWO · ADJOURNED|Witness to resume. Next: "Dead Man's Sentence."
` },
{ id: 'c02.beat.fast.b', chapter: 2, s: `
@set bar!
@mood warm
> Sal closed early, which he hadn't done in twenty years. We read the ledger copy at the bar with the lights all the way up.
SAL: Dash. Look at this one. "Prosecutor's office. One confession. Paid in full."
DASH: Signed by who?
SAL: Eddie Ruiz. I know Eddie. He unloads bananas on Pier Nine. They're putting him in the chair tomorrow at six.
@set hearing!
@mood blue
~rain off
RUTH: You were home early that night, Detective?
DASH: Early enough to be in trouble for something else.
` }
],
slow: [
{ id: 'c02.beat.slow.a', chapter: 2, s: `
@set docks!
@mood noir
> The sun wasn't up, but the gulls were. Dooley read the ledger copy in the front seat by flashlight while I tried not to fall asleep.
DOOLEY: Dash. There's an entry here for a confession. Written down like it's groceries.
DASH: Whose?
DOOLEY: Eddie Ruiz. The dockworker in the Mercer killing. He's in the chair tomorrow at six.
DASH: Then we've got a day.
@set hearing!
@mood blue
~rain off
RUTH: And Mrs. Marsh?
DASH: She asked the jailer if he'd eaten. He hadn't. She was right about everybody.
` },
{ id: 'c02.beat.slow.b', chapter: 2, s: `
@set bar!
> Sal made coffee, and I read the ledger the way Della would have, column by column.
SAL: You're doing that thing with your jaw.
DASH: There's a payment here to the prosecutor's office. For a confession.
SAL: Whose?
DASH: Eddie Ruiz. Due to die at six tomorrow morning.
> Sal set the pot down very gently, the way a man sets down something he can't afford to drop.
@set hearing!
@mood blue
~rain off
RUTH: The bartender knew the condemned man?
DASH: Sal knows everybody. That's what bartenders are for.
` }
],
near: [
{ id: 'c02.beat.near.a', chapter: 2, s: `
@set bar!
@mood blue
> The Lindqvist went out past the breakwater with the copy in her hold. Sal poured a shot of the good rye and set it on the windowsill, facing the river.
SAL: One for the river, Dash. It's going to read that book before we do.
> But Della's carpetbag had her working book in it, the green one, in her own neat hand. The ship had a copy. We had the original.
DASH: Sal. There's a payment here to the prosecutor's office. For a confession, signed by an Eddie Ruiz.
SAL: Eddie? Eddie goes to the chair tomorrow.
@set hearing!
@mood blue
~rain off
RUTH: And the copy, Detective?
DASH: Still at sea. Like the rest of us.
` },
{ id: 'c02.beat.near.b', chapter: 2, s: `
@set docks!
@mood red
> The Lindqvist cleared the breakwater at six on the nose, and two hundred names went with her to people who'd pay to know them.
DOOLEY: At least we've got her own book, Dash. The one from her bag.
> I read it by the first gray light. Halfway down a page: "Prosecutor's office. One confession, Ruiz, E. Paid."
DASH: Ruiz. The dockworker they're putting in the chair tomorrow.
DOOLEY: Tomorrow at six.
DASH: Everything in this town happens at six, Dooley. I'm starting to take it personally.
@set hearing!
@mood blue
~rain off
RUTH: You didn't sleep, then.
DASH: I slept in the car. In my good suit. That's the part that mattered.
` }
],
escaped: [
{ id: 'c02.beat.escaped.a', chapter: 2, s: `
@set hearing!
@mood blue
~rain off
> I told it straight: the fog, the foghorn, the Lindqvist going out with the book and the bookkeeper both.
> Ruth's hands lifted off the keys and stayed there.
RUTH: Detective. That isn't what you told the papers, either.
DASH: Strike that. That's not how it went.
> She pulled the sheet, laid it face down on the pile, and threaded a clean one without looking.
~paper SESSION TWO · RESUMED|The witness will begin again.
` },
{ id: 'c02.beat.escaped.b', chapter: 2, s: `
@set hearing!
@mood violet
~rain off
RUTH: The ship sailed, the woman sailed, and the ledger sailed. Is that your testimony?
DASH: That's what I said.
RUTH: The harbor log says otherwise, Detective.
DASH: Strike that. That's not how it went. By then she'd have had a new word anyway. They give a new one to anybody who runs.
> Ruth fed a clean sheet into the machine. The radiator knocked twice, like it was keeping score.
~paper SESSION TWO · FROM THE TOP|Last Call. Again.
` }
]
};

// "Anniversary" (bible §7.2, Vera's thread): their tenth, Luigi's at eight. Kept: he's early, and she laughs for the first time in a year.
// Late: he arrives at dessert and she's already paid. Missed: she eats alone and leaves the offer letter on his pillow. Quiet rules apply.
export const INTERLUDE = {
kept: [
{ id: 'c02.inter.kept', chapter: 2, s: `
~fade
@set hearing!
@mood blue
~rain off
RUTH: That's not in the record, Detective.
DASH: It's the only part I'd want in it.
~fade
## ANNIVERSARY | The next evening, eight o'clock
@set restaurant!
@mood warm
> Ten years. Luigi's, at eight. I was there at a quarter to, in a suit I'd had pressed, with a carnation I'd bought off a boy on the corner.
VERA: You're early.
DASH: I'm early.
VERA: Are you sick?
DASH: I'm married. I looked it up.
> She laughed out loud, with her head back, the way she did before I made detective. It was the first time in a year.
> She didn't mention the letter in her purse from San Francisco. I didn't know about it yet.
` }
],
late: [
{ id: 'c02.inter.late', chapter: 2, s: `
~fade
## ANNIVERSARY | The next evening, twenty to ten
@set restaurant!
@mood noir
> I got to Luigi's at twenty to ten. Vera was at the window table with a cannoli and the check. Already paid.
VERA: Sit down. The cannoli's good. I saved you half.
DASH: Vera, I'm sorry. I fell asleep at the precinct and...
VERA: I know. I called. The desk sergeant said you were on your way. He said it an hour ago.
DASH: Happy anniversary.
VERA: It was. For a while there.
> She gave me the half. It was good. I ate it like evidence.
` }
],
missed: [
{ id: 'c02.inter.missed', chapter: 2, s: `
~fade
## ANNIVERSARY | The next night
@set restaurant!
@mood blue
> Luigi told me later she'd waited until ten. She ordered for two and ate for one, and tipped like a woman who'd made up her mind.
~fade
@set apartment!
@mood blue
~rain window
> When I got home, the bed was made on her side. On my pillow was an envelope from the San Francisco Chronicle. A copy desk, starting after the election.
> Under it, in her neat proofreader's hand: "Happy anniversary. Read this one carefully."
` }
]
};
