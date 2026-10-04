// Chapter 8 cores, suspect 1 (just after midnight). Key: '<guess>-<bucket>'. Bucket 0: no hits · 1: 1-2 · 2: 3-4 · 3: five, wrong order.
// Before the midpoint, Dash doesn't know where Vera is held: the docks, her sister's, the ferry slip.

export const CORES1 = {
'1-0': [
{ id: 'c08.core.1-0.01', chapter: 8, s: `
@set apartment
> I said {GUESS} to an empty bedroom. Her side of the closet was open. Three dresses gone, the ones she'd pack for a week.
> Somebody had packed them for her. They'd folded them the way I fold things. Badly.
DASH: Not a letter of him in it.
> Not a letter of her either. Just the one on my pillow.
` },
{ id: 'c08.core.1-0.02', chapter: 8, s: `
@set ferry
> {GUESS} came up empty. The Blackwell Island ferry slip was locked for the night, the boat tied up and dark, the sign swinging in the wind.
DASH: Six o'clock.
> I'd never been to Blackwell Island. Nobody goes. They're sent. The asylum, the workhouse, the hospital for people nobody visits.
` },
{ id: 'c08.core.1-0.03', chapter: 8, s: `
@set precinct
?!briggs_out BRIGGS: {GUESS}? Nothing. Lexington, I've put every car in the city on it. Every one.
?briggs_out DOOLEY: {GUESS}? Nothing. Dash, the acting captain says a wife leaving a husband isn't police business.
DASH: She didn't leave.
> I said it like a fact. It was the only fact I had.
` },
{ id: 'c08.core.1-0.04', chapter: 8, s: `
@set street
> Five strangers. I went to Vera's sister's on Clement Street and knocked until the neighbors came out.
> Her sister came down in a dressing gown. Vera wasn't there. She hadn't been there since the Sunday after the train tickets.
DASH: If she calls...
> Her sister shut the door gently. She'd always thought I'd lose Vera. She hadn't expected it to be like this.
` },
{ id: 'c08.core.1-0.05', chapter: 8, s: `
@set bar
SAL: Dash. Sit down. You look like death.
DASH: Vera's gone, Sal. {GUESS} came up empty.
SAL: Gone where?
DASH: A ferry at six. In a letter she didn't write.
> Sal took off his apron. He didn't say anything. He just started putting on his coat.
` }],
'1-1': [
{ id: 'c08.core.1-1.01', chapter: 8, s: `
@set apartment
> {GUESS} gave me {hitsN}. I read the letter again under the kitchen light. Her handwriting, perfect. Too perfect. Vera's capitals lean when she's angry.
> These didn't lean. Whoever wrote this had copied her on a good day.
DASH: He's never seen her angry, Mags. He's only seen her letters.
` },
{ id: 'c08.core.1-1.02', chapter: 8, s: `
@set ferry
> {HitsN} out of {GUESS}. The ferry's night watchman was asleep in his shack with a bottle of rye and a manifest for six AM.
> One passenger, booked by mail, paid in cash. V. LEXINGTON. Escorted by "a relative."
DASH: She hasn't got a relative who'd put her on this boat.
` },
{ id: 'c08.core.1-1.03', chapter: 8, s: `
@set office
MAGS: {GUESS} had {hitsN}. Detective, Silas Grey. Here's his file: resignation letters for three city councilmen, a farewell note for a banker who jumped, a speech for the Mayor.
DASH: He wrote the Mayor's speech?
MAGS: Every one since '46. The Mayor can't write. He can barely read Grey.
` },
{ id: 'c08.core.1-1.04', chapter: 8, s: `
@set street
?dooley_hurt DOOLEY: {HitsN}, Dash. I've got one arm, but I've got two legs. I've been up and down Clement Street. Nobody saw her.
?!dooley_hurt DOOLEY: {HitsN}, Dash. I've been up and down Clement Street. Nobody saw her.
DASH: Somebody saw her. Somebody always does.
DOOLEY: Then they're not saying, Dash.
` },
{ id: 'c08.core.1-1.05', chapter: 8, s: `
@set docks
EDDIE: Detective. The boys heard. Your wife.
DASH: {GUESS} had {hitsN}. The Blackwell ferry, Eddie. At six.
EDDIE: Then nobody gets on that ferry at six without Pier Nine looking at them first. I promise you that.
` },
{ id: 'c08.core.1-1.06', chapter: 8, s: `
@set phonebooth
~sfx ring
NORA: Dash. I've got every operator at the exchange listening for her voice. Every line in the city.
DASH: {GUESS} had {hitsN} of him. Nora, that's against every rule you've got.
NORA: She's my sister-in-law, Dash. The rules can file a complaint.
` }],
'1-2': [
{ id: 'c08.core.1-2.01', chapter: 8, s: `
@set apartment
> First suspect, {GUESS}, and {hitsN} lit. On the kitchen table, Vera's red pencil, left exactly where she'd put it down. Mid-sentence, on tomorrow's proofs.
> She'd been working at home. Then she'd stopped. She never leaves proofs unfinished. Something had made her get up and go.
DASH: The Gazette night desk says she came in at nine and left at ten, Mags. Left with who?
> Nobody at the night desk remembered. Nobody at the night desk ever remembers anything after nine.
` },
{ id: 'c08.core.1-2.02', chapter: 8, s: `
@set precinct
?!briggs_out BRIGGS: {HitsN}. First try. Good. Lexington, look at me. We'll find her.
?briggs_out DOOLEY: {HitsN}. First try. The acting captain still says it's a domestic, Dash. I told him where to put his domestic.
DASH: Silas Grey.
> I said the name like a curse. It was the only one I had that wasn't five letters.
` },
{ id: 'c08.core.1-2.03', chapter: 8, s: `
@set office
MAGS: {HitsN} of him on the first try. Detective, look at this. The letter on your pillow. The paper's Gazette copy paper.
DASH: So she wrote it at work.
MAGS: Or somebody wrote it at her work, on her paper, with her pen. He likes to write people out on their own stationery.
!!@DASH HE WROTE HER GOODBYE.
` },
{ id: 'c08.core.1-2.04', chapter: 8, s: `
@set ferry
> {GUESS}: {hitsN}. I sat on the ferry slip bench with Vera's letter in one hand and her ticket in the other.
> Same paper. Same ink. One forged by a painter, one by a writer, both for my wife.
DASH: They've been planning this since the Forger, Dooley.
DOOLEY: Since before that, Dash. Since she started reading their mistakes.
` },
{ id: 'c08.core.1-2.05', chapter: 8, s: `
@set bar
SAL: {HitsN}. Good. Dash, I made some calls.
DASH: What calls?
SAL: People who owe me favors. Cabbies. Doormen. Night cooks. Nobody moves a woman across this city without somebody pouring them a coffee.
` },
{ id: 'c08.core.1-2.06', chapter: 8, s: `
@set street
> {HitsN} in {GUESS}. A man in a borrowed overcoat, too long in the sleeves, passed me under the streetlamp on Clement Street and said "good evening" very softly.
> I turned. He was gone. He'd left a smell of somebody else's cologne.
DASH: He's walking around in other people's clothes, Dooley. And other people's names.
` }],
'1-3': [
{ id: 'c08.core.1-3.01', chapter: 8, s: `
@set apartment
> {GUESS}. Every letter of him, all out of order, like a love letter written by someone who's only read about love.
DASH: He's all here.
> On the pillow, the envelope. Vera's name, in Vera's hand, in his.
` },
{ id: 'c08.core.1-3.02', chapter: 8, s: `
@set precinct
?!briggs_out BRIGGS: Five for five on the first try. Out of order. Don't you dare fall apart on me, Lexington.
?briggs_out DOOLEY: Five for five, Dash. Out of order. Don't fall apart on me. Briggs isn't here to put you back together.
DASH: I'm not falling apart.
> I was. Very quietly. In the right order.
` },
{ id: 'c08.core.1-3.03', chapter: 8, s: `
@set office
MAGS: All five, scrambled. He writes like that, Detective. Every word right, every word in somebody else's order.
DASH: Then I'll put him in mine.
** Every letter of the Ghostwriter. None of them his own.
` }]
};
