// Chapter 1 scenes added in step 9 to reach the T8 budget: a third opening, eight informants, a third win and loss climax, more one-liners.
// Merged by index.js. Ids are new; never renumber them.

export const INTRO_MORE = { id: 'c01.intro.newsstand', chapter: 1, title: 'Stop the Presses', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION ONE|In re: the Lexicon affair. Witness: Det. D. Lexington.
RUTH: Begin wherever you like, Detective.
DASH: A newsstand, then. That's where most of the trouble in this city starts.
~fade
## {chapterTitle} | {date}
@set street!
@mood noir
~rain light
> {time0}. Pete's newsstand on Ninth and Front, the bulldog edition just off the truck. He waved it at me like a flag.
PETE: Lexington! Page one. Look at the headline. There's a letter wrong. The Gazette don't make mistakes. Your missus sees to it.
DASH: So somebody made one on purpose.
~sfx ring
> The phone in the booth behind him. I knew it was for me before Pete held it out.
VERA: Dash. There's a typo on page one that isn't a typo. And the night editor is dead under Press Number Two.
` };

export const INFORMANTS_MORE = [
{ id: 'c01.inf.kow', chapter: 1, type: 'n', who: 'KOW', s: `
~fade
@set apartment!
@mood warm
KOW: Mr. Lexington. It is midnight. You are home. Does this mean you have rent?
DASH: It means I came for a clean shirt, Mrs. Kowalski.
KOW: Then while you change, I count. My son's school dictionary. Every word that fits your typesetter.
~clue
?n=1 KOW: One. Catch him, then pay me.
?n>1?n<=6 KOW: A few. Like the dollars you owe me.
?n>6?n<=40 KOW: Many. Like the days you are late.
?n>40 KOW: Very many. Go to work.
DASH: Thank you, Mrs. Kowalski.
KOW: Rent is thank you, Mr. Lexington. Words are just words.
` },
{ id: 'c01.inf.nickel', chapter: 1, type: 'n', who: 'NICKEL', s: `
~fade
@set station!
NICKEL: Mister Lexington! A man at the station dropped his newspaper and I read the headline. There's a wrong letter. I counted words for you.
> Nickel had a stub of chalk and a lost-and-found dictionary, and the floor around his shine box was covered in crossed-out words.
~clue
?n=1 NICKEL: Just one, mister. I drew a box around it.
?n>1?n<=6 NICKEL: Only a few. I could shine all their shoes before breakfast.
?n>6?n<=40 NICKEL: A lot. My chalk's getting short.
?n>40 NICKEL: Too many, mister. The janitor's coming with a mop.
DASH: You can read, kid?
NICKEL: I can read anything with a picture on it. And headlines. Headlines are big.
` },
{ id: 'c01.inf.sal', chapter: 1, type: 'top', who: 'SAL', s: `
~fade
@set bar!
@mood warm
SAL: Sit. Your rye's poured. I've been working on the typesetter with the boys from the composing room. They drink here after the late shift.
SAL: Every word that could still be him. One letter turns up more than the rest. {topL}.
~clue
?topPct=100 SAL: In every one of them, Dash. You can take that to the bank.
?topPct<100 SAL: {topPct} in a hundred. The boys argued about the rest. They argue about everything.
DASH: Thanks, Sal.
SAL: Don't thank me. Thank the composing room. And go home before the milk, for once.
` },
{ id: 'c01.inf.zero', chapter: 1, type: 'top', who: 'ZERO', s: `
~fade
@set alley!
@mood violet
> A beaded curtain in a doorway off the Gazette alley. Madame Zero, reading cards by a candle stuck in a wine bottle.
ZERO: Detective. A man who sets type came to me once. He wanted to know if his words would last. I told him nothing lasts.
ZERO: The cards tonight say {topL}. They say it twice.
~clue
?topPct=100 ZERO: Every card, darling. Even the Fool agrees.
?topPct<100 ZERO: {topPct} chances in a hundred. The rest, the cards won't say. They're shy.
DASH: What does it cost?
ZERO: Tonight, a promise. Bring me a copy of tomorrow's paper. The real one.
` },
{ id: 'c01.inf.fenn', chapter: 1, type: 'pos', who: 'FENN', s: `
~fade
@set precinct!
@mood sick
FENN: Lexington. Ned Goss is on my table with a composing stick's corner in his temple. While he rests, I've been playing with your evidence.
FENN: The {posOrd} letter. It's {posL}, more often than not.
~clue
?posPct=100 FENN: Every time. As certain as a death certificate.
?posPct<100 FENN: {posPct} times in a hundred. I'd sign it. I sign worse every day.
DASH: Thanks, Doc.
FENN: Thank Goss. He's been very patient.
` },
{ id: 'c01.inf.briggs', chapter: 1, type: 'pos', who: 'BRIGGS', s: `
~fade
@set precinct!
@mood noir
BRIGGS: Lexington. The Gazette's publisher has called me four times. So I did your homework to keep from calling him back.
BRIGGS: Your {posOrd} letter's {posL}, more often than not. Don't quote me.
~clue
?posPct=100 BRIGGS: Every time. I'd hold up a finger, but I'm holding the phone.
?posPct<100 BRIGGS: {posPct} times in a hundred. Good enough for a captain. Not good enough for a publisher.
> He held up one finger, then pointed it at the door. That meant go.
` },
{ id: 'c01.inf.lola', chapter: 1, type: 'dbl', who: 'LOLA', s: `
~fade
@set office!
@mood warm
LOLA: Detective. I came back for my calling card. I seem to have left it on your desk.
LOLA: And since I'm here, a little parlor trick. I count pairs, darling. Earrings. Gloves. Letters.
~clue
?dblPct>=50 LOLA: Odds are your word has a twin in it. Twins are always trouble. Ask any stage manager.
?dblPct<50?dblPct>0 LOLA: Probably no pairs. Probably. I'd never bet on probably.
?dblPct=0 LOLA: No pairs at all. A lonely little word. I know the type.
DASH: How do you know any of this?
LOLA: I read the papers, Detective. Every word. Next week, then?
` },
{ id: 'c01.inf.foreman', chapter: 1, type: 'dbl', who: 'FOREMAN', s: `
~fade
@set pressroom!
FOREMAN: You the cop who stopped my press? Fine. I don't like you. But I liked Ned Goss.
FOREMAN: Thirty years setting type. I can smell a doubled letter. I ran your list in my head while you were yelling.
~clue
?dblPct>=50 FOREMAN: Better than even there's a pair. A doubled sort. Pell loved those. Said they looked tidy.
?dblPct<50?dblPct>0 FOREMAN: Probably no doubles. Probably. I've been wrong once. In 1922.
?dblPct=0 FOREMAN: No doubles. Clean sort, every letter different.
DASH: Thanks.
FOREMAN: Don't thank me. Get him off my floor.
` }
];

export const WIN_CLIMAX_MORE = { id: 'c01.win.climax.c', chapter: 1, s: `
@set alley!
@mood gold
> {time}. The paper store, behind the newsprint rolls. Pell was sitting on a camp bed in his shirtsleeves, ironing a shirt on a plank with a cold iron.
PELL: I like to be presentable, Detective. Whatever happens.
DASH: {ANSWER}.
~heart
> He put down the iron. He folded the shirt in thirds, the way they do in good shops, and set it on the bed.
PELL: Well. That's a correction I can't argue with.
%%DASH LEXINGTON | {ANSWER}
?g<5 > Upstairs, Vera had the page-one plate off the press and in her arms before the foreman knew what had happened.
?g>=5 > Upstairs, the first bundles were already going out the door. I'd caught him in time to watch it.
~gstamp CASE CLOSED
` };

export const LOSS_CLIMAX_MORE = { id: 'c01.loss.climax.c', chapter: 1, s: `
@set rooftop!
@mood red
~rain heavy
> 6:00 AM. From the Gazette roof, I watched the trucks fan out across the city, carrying the headline to two hundred thousand doorsteps.
> Down in the street, a man in a pressman's cap stood still for a moment and looked up at me. Then he folded his paper and walked away.
~tight
** It was {ANSWER}. It was always going to run.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` };

export const OPENERS_MORE = {
  street: ['> Pete\'s newsstand, shuttered for the night, a bundle of yesterday\'s headlines tied with string.'],
  pressroom: ['> The composing room clock said {time}. The type cases stood around in rows, like a jury that had already decided.'],
  office: ['> {time}. My desk, my lamp, and a page-one proof with a wrong letter I could feel through the paper.'],
  alley: ['> The loading dock alley. Rain on the tarpaulins over the bundles, sounding like applause in another room.'],
  bar: ['> The Last Word. Sal had the bulldog edition spread on the bar, open to page one.'],
  precinct: ['> The squad room, where the night shift reads the bulldog edition aloud to each other, for the jokes.'],
  rooftop: ['> The Gazette roof. Below me, the trucks were already lined up, waiting for the paper and the news in it.']
};

export const CLOSERS_MORE = {
1: ['One left. The plates are locked on Press Number Two.', 'Last suspect. The applicants are getting their coats.'],
2: ['Two left. The foreman wants to run a test sheet.', 'Two suspects. The witness is still asleep.'],
3: ['Three left. The Lexicon is hiring.', 'Three suspects. Pell is somewhere in the building.'],
4: ['Four left. Ned Goss\'s lunch pail is still in the alley.', 'Four suspects. The publisher keeps calling.'],
5: ['Five left. Every letter on page one is in the right place but one.', 'Five suspects to go. The bulldog edition is on the stands.']
};
