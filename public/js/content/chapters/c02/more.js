// Chapter 2 scenes added in step 9 to reach the T8 budget: a third opening, eight informants, a third win and loss climax, more one-liners.
// Merged by index.js. Ids are new; never renumber them.

export const INTRO_MORE = { id: 'c02.intro.backroom', chapter: 2, title: 'Last Call', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION TWO|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: The plate said "last call," Detective. You went.
DASH: I'd been going there every night for years, Ruth. That night I went in through the back.
~fade
## {chapterTitle} | {date}
@set alley!
@mood noir
~rain light
> {time0}. The alley behind the Last Word. The back-room door was open, and inside, under the green lamp, Benny Fusco was face down on a ledger.
> Sal stood in the kitchen doorway with a dish towel in his hands. He'd been holding it so long it had gone dry.
SAL: They use my back room, Dash. I let them. I'm sorry.
DASH: Who uses it?
SAL: The Lexicon. A year now. I told myself it was just bookkeeping.
` };

export const INFORMANTS_MORE = [
{ id: 'c02.inf.kow', chapter: 2, type: 'n', who: 'KOW', s: `
~fade
@set apartment!
@mood warm
KOW: Mr. Lexington. A woman does books for the bars, I hear. She is poisoning people. I also do books. For this building. I poison nobody.
DASH: I know, Mrs. Kowalski.
KOW: So. I counted the words that fit her. Like rent, I count carefully.
~clue
?n=1 KOW: One. Catch her. Then I count your rent.
?n>1?n<=6 KOW: A few. Like your payments this year.
?n>6?n<=40 KOW: Many. Like your excuses.
?n>40 KOW: Too many. Go and think somewhere quieter.
DASH: Thank you.
KOW: Do not thank me, Mr. Lexington. A bookkeeper should be honest. It is insulting to all of us.
` },
{ id: 'c02.inf.nickel', chapter: 2, type: 'n', who: 'NICKEL', s: `
~fade
@set station!
NICKEL: Mister Lexington! The soup lady comes through the station sometimes. She gave me a bowl once. I counted words for you with the chalk.
~clue
?n=1 NICKEL: Only one left, mister. I circled it.
?n>1?n<=6 NICKEL: A few. Not many.
?n>6?n<=40 NICKEL: A lot. My chalk's nearly gone.
?n>40 NICKEL: Too many, mister. The floor's full.
DASH: Did you eat the soup, kid?
NICKEL: Course I did. It was good soup. Is that bad?
DASH: Not that bowl, Nickel. Not that one.
` },
{ id: 'c02.inf.vera', chapter: 2, type: 'top', who: 'VERA', s: `
~fade
@set pressroom!
@mood warm
VERA: Dash. A bookkeeper's columns are just proofs with numbers in them. I've been through the words that could still be her.
VERA: {topL}. More than any other letter.
~clue
?topPct=100 VERA: Every one. I'd mark it in ink.
?topPct<100 VERA: {topPct} out of a hundred. I'd mark it in pencil.
DASH: You're at the Gazette late.
VERA: I'm always at the Gazette late, Dash. It's the only place I'm sure what time it is.
` },
{ id: 'c02.inf.dooley', chapter: 2, type: 'top', who: 'DOOLEY', s: `
~fade
@set precinct!
DOOLEY: Dash. I took every word that could still be her and tallied the letters, like the coffee fund. One keeps coming up. {topL}.
~clue
?topPct=100 DOOLEY: In every one of them, Dash. Like her soup at every bar.
?topPct<100 DOOLEY: {topPct} out of a hundred. I checked my sums twice. She'd check them three times.
DASH: You did the coffee fund?
DOOLEY: She does the coffee fund, Dash. I just checked her work. It was perfect. That's what scares me.
` },
{ id: 'c02.inf.prof', chapter: 2, type: 'pos', who: 'PROF', s: `
~fade
@set office!
@mood warm
PROF: Detective. A bookkeeper, I'm told. Accounts are the oldest writing in the world, you know. Before poems. Before prayers. Lists of debts.
PROF: Your evidence against my lists: the {posOrd} letter is {posL}, more often than not.
~clue
?posPct=100 PROF: Without exception. Unlike most accounts.
?posPct<100 PROF: {posPct} times in a hundred. I won't round it. Bookkeepers round. Lexicographers don't.
DASH: Thanks, Professor.
PROF: Pay me in a drink at the Last Word sometime, Detective. I've never been. I hear the bartender's never wrong.
` },
{ id: 'c02.inf.briggs', chapter: 2, type: 'pos', who: 'BRIGGS', s: `
~fade
@set precinct!
@mood noir
BRIGGS: Lexington. She did my coffee fund for eleven years. I feel personally robbed, and she never took a penny.
BRIGGS: So I did your arithmetic. Your {posOrd} letter's {posL}, more often than not.
~clue
?posPct=100 BRIGGS: Every time. Like her books.
?posPct<100 BRIGGS: {posPct} times in a hundred. Unlike her books.
> He held up one finger, then took a pencil from behind his ear and looked at it like it had betrayed him.
` },
{ id: 'c02.inf.lola', chapter: 2, type: 'dbl', who: 'LOLA', s: `
~fade
@set bar!
@mood warm
LOLA: Detective. I'm still waiting for you to take my case. I've taken up drinking here in the meantime. It's very educational.
LOLA: I count pairs, you know. Earrings. Gloves. The two pencils that woman wore behind her ears.
~clue
?dblPct>=50 LOLA: Better than even, darling, there's a letter in there twice. Like her pencils.
?dblPct<50?dblPct>0 LOLA: Probably no pairs. Probably. I'd hate to bet.
?dblPct=0 LOLA: No pairs. A word with nobody to talk to.
DASH: Why are you always where I am, Miss Vance?
LOLA: Because you're always where it's interesting, darling.
` },
{ id: 'c02.inf.nora', chapter: 2, type: 'dbl', who: 'NORA', s: `
~fade
@set phonebooth!
NORA: Dash, it's Nora at the exchange. Slow night. I heard your name on a police line, so I did your doubles thing. Tommy taught me. He does it with his spelling words.
~clue
?dblPct>=50 NORA: Better than even there's a letter twice, Dash.
?dblPct<50?dblPct>0 NORA: Probably all different letters. Probably.
?dblPct=0 NORA: No repeats at all.
DASH: How's Pop?
NORA: Eating hospital food and complaining. That's how you know he's better. Come and see him, Dash.
` }
];

export const WIN_CLIMAX_MORE = { id: 'c02.win.climax.c', chapter: 2, s: `
@set gangway!
@mood gold
~sfx foghorn
> {time}. The Lindqvist's galley door, at the top of the gangway. Della Marsh in an apron, ladling soup into tin bowls for the crew.
DELLA: Detective. You look famished. Sit down. There's plenty.
DASH: {ANSWER}.
~heart
> The ladle stopped over the pot. She set it down very gently on a saucer, so it wouldn't mark the stove.
DELLA: Well. That's me written off, then. Somebody else will have to do the washing up.
%%DASH LEXINGTON | {ANSWER}
?g<5 > The sea chest came off the Lindqvist on Dooley's shoulder, the ledger copy inside it, every page of it in her neat hand.
?g>=5 > The sea chest was already locked in the hold, and the Swedish captain had his hand on the bell rope. I had her. I didn't have the book.
~gstamp CASE CLOSED
` };

export const LOSS_CLIMAX_MORE = { id: 'c02.loss.climax.c', chapter: 2, s: `
@set bar!
@mood red
> 6:00 AM. I came back to the Last Word. On the bar, a clean bowl, a clean spoon, and a tab in green pencil with my name on it.
> "One long night. Paid in full. D.M." Out on the river, a ship's horn.
~tight
** Her headword was {ANSWER}. Paid in full.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` };

export const OPENERS_MORE = {
  alley: ['> The alley behind the Last Word. A soup pot on the back step, still warm, and a cat that wouldn\'t touch it.'],
  office: ['> {time}. My office, with Della Marsh\'s ledger paper spread across the desk like a hand of cards I couldn\'t play.'],
  phonebooth: ['> A phone booth on Front Street with a soup stain on the shelf and a coin return that never returns.'],
  bar: ['> The back room of the Last Word. A green lamp, a round table, and the smell of almonds that wouldn\'t go away.'],
  docks: ['> Pier {pier}. The Lindqvist\'s crew were singing in Swedish in the galley, over the smell of onions.'],
  precinct: ['> The precinct at {time}. The coffee fund jar on the front desk, every penny accounted for in a neat green hand.'],
  street: ['> Front Street. Every bar on the block had its lights off, and every one of them had a tab on Della\'s books.']
};

export const CLOSERS_MORE = {
1: ['One left. The pilot is climbing aboard.', 'Last suspect. The galley fire is out.'],
2: ['Two left. The soup pot is empty.', 'Two suspects. The Swedes are very polite about it.'],
3: ['Three left. Pete\'s name is on page four.', 'Three suspects. The ledger balances. That\'s the problem.'],
4: ['Four left. Benny Fusco\'s tab is paid in full.', 'Four suspects. Somebody is keeping score.'],
5: ['Five left. The ledger is on a ship.', 'Five suspects to go. Last call was hours ago.']
};
