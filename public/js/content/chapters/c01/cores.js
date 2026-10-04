// Chapter 1 cores. Key: '<guess>-<bucket>'. Bucket 0: no hits · 1: 1-2 hits · 2: 3-4 hits · 3: five hits, wrong order.
// Guess 3 carries the midpoint turn (docs/story/bible.md §6): the coded headline is a job posting. The Lexicon is hiring.

export const CORES = {
'1-0': [
{ id: 'c01.core.1-0.01', chapter: 1, s: `
@set pressroom
> First suspect: {GUESS}. I read it out loud over the noise of the idle press, and nothing in the room flinched.
VERA: Not one letter of that is in his name. I'd stake my red pencil on it.
DASH: Then it's five letters I can cross off. That's a start.
> In a newspaper, you learn more from what got cut than from what got printed.
` },
{ id: 'c01.core.1-0.02', chapter: 1, s: `
@set precinct
BRIGGS: {GUESS}? Five letters and every one of them was home in bed.
DASH: Then they're the only honest letters in the city tonight.
BRIGGS: Don't get poetic, Lexington. Get a name.
> I wrote five alibis on the blotter and drew a line through each one. Neat work, like a proofreader would like it.
` }],
'1-1': [
{ id: 'c01.core.1-1.01', chapter: 1, s: `
@set pressroom
> {GUESS} came apart in my hands. Most of it was clean. {HitsN} wasn't.
VERA: You've got a piece of him. It's like finding one good line in a bad story.
DASH: One good line is all a story needs.
> Down the stairs, Press Number Two sat cold and patient, waiting for six o'clock like everybody else.
` },
{ id: 'c01.core.1-1.02', chapter: 1, s: `
@set street
> Outside the Gazette, the delivery trucks were lining up in the rain like hearses at a cheap funeral.
DASH: {GUESS}. Not him, but {hitsN} ran with his crowd.
DOOLEY: That's something, Dash. We'll shake the rest loose.
!!@DASH I'VE GOT YOUR SCENT.
` }],
'1-2': [
{ id: 'c01.core.1-2.01', chapter: 1, s: `
@set pressroom
> First try, and {GUESS} lit up like a bad conscience. {HitsN} belonged in Pell's name.
VERA: That's not luck, Dash. That's a pattern.
DASH: Don't tell the Captain. He doesn't believe in either.
> Pell's coat still hung by the composing stones. Warm. He hadn't gone far, and he hadn't gone for good.
` },
{ id: 'c01.core.1-2.02', chapter: 1, s: `
@set office
> I put {GUESS} under the lamp and it gave up {hitsN} before I'd lit a cigarette.
DOOLEY: You've been doing this twenty minutes and you've got him half spelled.
DASH: Half spelled is still a misprint, Dooley.
** Half a name. A whole night.
` }],
'1-3': [
{ id: 'c01.core.1-3.01', chapter: 1, s: `
@set pressroom
> Every letter of {GUESS} was in his name. Not one of them was where it belonged.
VERA: It's an anagram. He's hiding in plain type.
DASH: Then I just have to put the furniture back where it goes.
!!@VERA YOU'VE GOT ALL OF HIM, DASH.
` },
{ id: 'c01.core.1-3.02', chapter: 1, s: `
@set precinct
BRIGGS: Five for five on the first try, and you still haven't got him?
DASH: I've got the right men, Captain. They're just standing in the wrong line-up.
BRIGGS: Then rearrange them. You've got till the presses.
> It's a strange feeling, having every piece of a man and still not knowing his face.
` }],
'2-0': [
{ id: 'c01.core.2-0.01', chapter: 1, s: `
@set alley
> The alley behind the Gazette smelled of wet newsprint and ink that never quite dries.
DASH: {GUESS}. Five more alibis. This town has more alibis than citizens.
PETE: You want a paper, Lexington? They're still warm from yesterday.
DASH: I want tomorrow's, Pete. Before anybody reads it.
` },
{ id: 'c01.core.2-0.02', chapter: 1, s: `
@set office
> {GUESS} didn't even make the corrections column. Five strangers, all of them innocent.
> I sat back and listened to the rain proofread the window.
DASH: He's not in those letters. Fine. The city's got twenty-one more.
` }],
'2-1': [
{ id: 'c01.core.2-1.01', chapter: 1, s: `
@set pressroom
> Second suspect, {GUESS}. {HitsN} wouldn't meet my eye.
VERA: Pell sets type upside down and backwards, Dash. He reads the world in mirror.
DASH: Then maybe I'm reading him the wrong way round.
> She went back to the proofs. I went back to the dark.
` },
{ id: 'c01.core.2-1.02', chapter: 1, s: `
@set bar
> Sal had my rye on the bar before I'd sat down. He always does. I've never once had to ask.
SAL: You've got that look. Like you found a hair in the soup and it was yours.
DASH: {GUESS}. {HitsN} in the gang, the rest clean.
SAL: Then you're closer than you were. Drink up and get closer.
` }],
'2-2': [
{ id: 'c01.core.2-2.01', chapter: 1, s: `
@set pressroom
> {GUESS} gave me {hitsN}. Pell's name was coming together like a front page at four in the morning: messy, but real.
VERA: Half the headline's set. Don't rush the other half.
DASH: Rushing is all I've got left, Vera.
VERA: You used to say that about us.
` },
{ id: 'c01.core.2-2.02', chapter: 1, s: `
@set street
DOOLEY: The pressmen clock in at four. If Pell's still in the building, they'll be in his way.
DASH: Or he'll be in theirs. {GUESS} gave us {hitsN}. He's sweating somewhere.
!!@DOOLEY WE'RE CLOSE, DASH.
` }],
'2-3': [
{ id: 'c01.core.2-3.01', chapter: 1, s: `
@set pressroom
> {GUESS}. Every letter guilty. Every letter lying about where it stood.
VERA: A typesetter would love this. All the right sorts in all the wrong slots.
DASH: Then I'll set them right.
` },
{ id: 'c01.core.2-3.02', chapter: 1, s: `
@set precinct
BRIGGS: All five letters, Lexington, and none of them in the right chair.
DASH: That's the trouble with a gang, Captain. They swap coats.
> I laid them out on the blotter, one per square, and started shuffling like a card cheat.
` }],
'3-0': [
{ id: 'c01.core.3-0.01', chapter: 1, s: `
@set pressroom
> {GUESS} was clean. While I stewed, Vera held the page-one proof up to the light.
VERA: Dash, the typo isn't a name. Read the column under it. It's a want ad.
DASH: "Situations vacant. Steady hands. Discreet." In a headline?
VERA: The Lexicon isn't killing anybody tonight. It's hiring.
** Somebody is building an army out of misprints.
` },
{ id: 'c01.core.3-0.02', chapter: 1, s: `
@set office
> Three suspects down and {GUESS} hadn't moved a hair. Then Vera called with the thing that turned the night inside out.
VERA: The coded line on page one. I worked it like a crossword. It's an advertisement, Dash. They're recruiting.
DASH: The witness?
VERA: Is the interview. Whoever kills her gets the job.
` }],
'3-1': [
{ id: 'c01.core.3-1.01', chapter: 1, s: `
@set pressroom
> {GUESS} gave up {hitsN}. Vera wasn't listening. She'd found something worse.
VERA: It's not a death notice. It's a job posting. "Apply in person. Bring proof."
DASH: Proof of what?
VERA: That the witness is dead. Pell isn't the killer, Dash. He's the classifieds.
` },
{ id: 'c01.core.3-1.02', chapter: 1, s: `
@set street
PETE: Lexington! I read the late proofs off the truck. The ad on page one, it's got the wrong word in it.
DASH: You read the ads, Pete?
PETE: It's the only honest part of the paper. Everybody admits what they want.
> {GUESS} had {hitsN} in the gang. Pete had the whole gang's business plan. The Lexicon was hiring killers by the column inch.
` }],
'3-2': [
{ id: 'c01.core.3-2.01', chapter: 1, s: `
@set pressroom
> {GUESS} lit up {hitsN}. We were close. Vera didn't smile. She'd decoded the ad.
VERA: "Position open. Experience preferred. Start at six." It's a hiring notice, Dash.
DASH: They want a new man for the job. Which means somebody's leaving one.
!!@DASH THEY'RE RECRUITING.
` },
{ id: 'c01.core.3-2.02', chapter: 1, s: `
@set precinct
BRIGGS: {GUESS}, {hitsN}. Good. Here's bad: your wife's coded headline is a help-wanted.
DASH: Who's hiring?
BRIGGS: Nobody signs their ads in this town, Lexington. But they pay by the word.
> I had half of Pell's name and none of his employer's. That was the shape of the whole year, if I'd known it.
` }],
'3-3': [
{ id: 'c01.core.3-3.01', chapter: 1, s: `
@set pressroom
> {GUESS}: all five guilty, all five out of place. And Vera had cracked the headline.
VERA: It's a job ad. For killers. And it's set in Pell's own style, his own spacing.
DASH: So he wrote his own recruiting poster.
VERA: Or somebody wrote it for him, and he just set it. Typesetters don't write. They obey.
` },
{ id: 'c01.core.3-3.02', chapter: 1, s: `
@set office
> All the right letters, all the wrong places. {GUESS} sat there like a jigsaw on the wrong table.
~sfx ring
VERA: Dash, the page-one line. It's a hiring notice. The Lexicon wants a new hand, and the witness is the test.
DASH: Then Pell isn't the end of this. He's the front door.
` }],
'4-0': [
{ id: 'c01.core.4-0.01', chapter: 1, s: `
@set pressroom
> Four o'clock. The pressmen came down the stairs with their lunch pails and their union cards. {GUESS} came up empty.
DOOLEY: They'll lock the plates at five, Dash.
DASH: Then I've got one hour to find a man who spells himself in five letters.
` },
{ id: 'c01.core.4-0.02', chapter: 1, s: `
@set phonebooth
> I called {GUESS} in from a phone booth on Ninth. Every letter had an alibi.
~sfx ring
WORD: Wrong word, detective. They're all wrong words tonight.
~sfx hangup
> The line went dead. The rain didn't.
` }],
'4-1': [
{ id: 'c01.core.4-1.01', chapter: 1, s: `
@set street
> {GUESS} gave me {hitsN}. The trucks were idling now, and the drivers were smoking in the rain.
DASH: Pell's going out with the edition. He'll ride a bundle to the street and walk away clean.
DOOLEY: Then we watch the bundles.
` },
{ id: 'c01.core.4-1.02', chapter: 1, s: `
@set pressroom
VERA: {HitsN} in {GUESS}. Pell's in that name somewhere, Dash. I can feel him in the spacing.
DASH: You can feel a man in the spacing?
VERA: I felt you in the margins for ten years.
> I didn't have an answer. The press warmed up behind me like it was clearing its throat.
` }],
'4-2': [
{ id: 'c01.core.4-2.01', chapter: 1, s: `
@set pressroom
> Fourth suspect, {GUESS}: {hitsN} in. The foreman started the press on a test run, and the whole building shook like a guilty man.
DASH: Kill it! Nothing runs until I say so.
FOREMAN: I don't take orders from cops, mister.
> He did after Dooley explained it. Dooley's a good explainer.
` },
{ id: 'c01.core.4-2.02', chapter: 1, s: `
@set alley
> In the alley, I found a red pencil stuck in the gutter grate, snapped clean in half.
DASH: {GUESS} gave me {hitsN}. And Pell's getting careless.
DOOLEY: Or somebody's leaving you a trail.
> I put the pencil in my pocket. It was the kind of red I'd see in my sleep for the next year.
` }],
'4-3': [
{ id: 'c01.core.4-3.01', chapter: 1, s: `
@set pressroom
> {GUESS} had all of Pell's letters, every one in the wrong slot. A typesetter's nightmare.
VERA: Two more tries, Dash. Set it like he would. Backwards, and calm.
!!@DASH ONE WORD FROM THE PRESS.
` },
{ id: 'c01.core.4-3.02', chapter: 1, s: `
@set precinct
BRIGGS: Five out of five. Again. Lexington, I've seen safecrackers with less patience.
DASH: Safecrackers know the numbers. I only know the gang.
BRIGGS: Then make them stand in line. Alphabetical if you have to.
` }],
'5-0': [
{ id: 'c01.core.5-0.01', chapter: 1, s: `
@set pressroom
> Five o'clock. The plates went into the press like bullets into a gun. {GUESS} came up clean, and I came up empty.
VERA: One more, Dash. Make it count.
DASH: I've been making them count all night. They keep counting wrong.
` },
{ id: 'c01.core.5-0.02', chapter: 1, s: `
@set rooftop
> I went up to the roof of the Gazette to think. The city lay below me, still asleep, still trusting the morning paper.
DASH: {GUESS}. Nothing. One shot left.
> The clock on the Tribune tower said a quarter past five. Somewhere under it, a witness was getting dressed for work.
` }],
'5-1': [
{ id: 'c01.core.5-1.01', chapter: 1, s: `
@set pressroom
> {GUESS} gave me {hitsN}, and the foreman gave me a look.
FOREMAN: Ten minutes to six, mister. The paper goes out whether you like it or not.
DASH: The paper goes out when I like it.
** One word left between the city and a dead witness.
` },
{ id: 'c01.core.5-1.02', chapter: 1, s: `
@set street
DOOLEY: The trucks are loaded, Dash. The drivers want to roll.
DASH: {GUESS} gave us {hitsN}. Tell them to wait.
DOOLEY: On whose authority?
DASH: Mine. It's the only authority I've got left tonight.
` }],
'5-2': [
{ id: 'c01.core.5-2.01', chapter: 1, s: `
@set pressroom
> {GUESS} lit {hitsN}. Pell's name was nearly set. Last suspect coming.
VERA: You've almost got him. Don't think. Read.
DASH: You always said I didn't read enough.
VERA: I said you didn't read me. Go on.
` },
{ id: 'c01.core.5-2.02', chapter: 1, s: `
@set phonebooth
~sfx ring
WORD: Close, detective. Close the way a bullet is close.
DASH: Who is this?
WORD: Ask me in an hour. You'll know so much more by then.
~sfx hangup
> {GUESS} had {hitsN}. The voice had all of them. I'd swear it.
` }],
'5-3': [
{ id: 'c01.core.5-3.01', chapter: 1, s: `
@set pressroom
> {GUESS}. Five letters, all of them his, every one in the wrong seat. One last suspect to bring in.
VERA: Set it right, Dash. Just once in your life, set something right.
!!@DASH LAST CALL, PELL.
` },
{ id: 'c01.core.5-3.02', chapter: 1, s: `
@set precinct
BRIGGS: Every letter, Lexington. You've had every letter of this man since four o'clock.
DASH: And he's still standing in the wrong order.
BRIGGS: One more. Then the presses, then the witness, then my badge, then yours.
` }]
};
