// Chapter 9 cores, suspect 2 (around one in the morning).

export const CORES2 = {
'2-0': [
{ id: 'c09.core.2-0.01', chapter: 9, s: `
@set warehouse
> {GUESS} came up empty. Mrs. Kowalski had taken a folding chair beside the Fourth Ward boxes and was watching them like a cat watches a mousehole.
KOW: Nobody touches these, Mr. Lexington. Nobody.
DASH: Somebody already did, Mrs. Kowalski.
KOW: Then nobody touches them again.
` },
{ id: 'c09.core.2-0.02', chapter: 9, s: `
@set office
> Five strangers. My client chair was empty, but the gardenias weren't. She'd left a single one on my blotter, and my lighter beside it.
> Under the lighter, a theatre ticket. The Grammatica, opening night, 1946. "The Understudy," a comedy in three acts.
` },
{ id: 'c09.core.2-0.03', chapter: 9, s: `
@set street
> {GUESS}: nothing. Outside the warehouse, the two parties' lawyers were arguing under an umbrella about who was allowed to hold the umbrella.
DOOLEY: Who's winning?
DASH: The rain, Dooley.
` },
{ id: 'c09.core.2-0.04', chapter: 9, s: `
@set morgue
FENN: {GUESS}? Nothing. Harvey Bloom's daughter came in. She brought his good glasses. She said he'd want them for the count.
DASH: He's not counting anymore, Doc.
FENN: I know that, Lexington. I put them on him anyway. Some men should be buried with their spectacles.
` },
{ id: 'c09.core.2-0.05', chapter: 9, s: `
@set bar
SAL: Nothing?
DASH: Nothing, Sal.
SAL: Sit. You're going to be up all night counting with the rest of them. Eat this. I won't have you fainting in the Fourth Ward.
` }],
'2-1': [
{ id: 'c09.core.2-1.01', chapter: 9, s: `
@set warehouse
> {GUESS} gave me {hitsN}. Lola walked past me with an armful of tally sheets, in a different dress, with a different walk. A farm wife from the outer wards.
LOLA: Excuse me, Officer. Where's the ladies' room?
DASH: You know where it is, Lola.
LOLA: She doesn't, darling. I'm playing someone who's never been here.
` },
{ id: 'c09.core.2-1.02', chapter: 9, s: `
@set office
MAGS: {HitsN}. Detective, I've been at the Grammatica's archives. Lola Vance understudied four leading ladies between '42 and '47. She went on for all four.
DASH: Lucky.
MAGS: Every one of the four leading ladies had an accident the week before. Nobody noticed. Everybody was too busy saying how wonderful the understudy was.
` },
{ id: 'c09.core.2-1.03', chapter: 9, s: `
@set street
?vera_saved_herself VERA: {HitsN}. Dash, the seals on the Fourth Ward boxes. I've counted six re-sealed. That's six boxes she swapped.
?!vera_saved_herself VERA: {HitsN}. Dash, I've counted six re-sealed boxes in the Fourth Ward. That's six she swapped.
DASH: Where are the real ones?
VERA: Somewhere in that warehouse, Dash. There's no time to take them anywhere else.
` },
{ id: 'c09.core.2-1.04', chapter: 9, s: `
@set precinct
?dooley_hurt DOOLEY: {HitsN}, Dash. I've been reading the warehouse sign-in sheet over the radio. Forty volunteers, and one of them signed in three times in three different hands.
?!dooley_hurt DOOLEY: {HitsN}, Dash. The warehouse sign-in sheet. Forty volunteers, and one of them signed in three times in three different hands.
DASH: All Lola.
DOOLEY: All Lola, Dash. One of them's even signed "Lola." Like she couldn't help it.
` },
{ id: 'c09.core.2-1.05', chapter: 9, s: `
@set apartment
> {HitsN} in {GUESS}. I stopped home for ten minutes. Mrs. Kowalski's door was open, and her rent book lay on the hall table, open to my page.
> Six months behind. And in the margin, in her careful hand: "He is a good boy. He will pay."
DASH: I will, Mrs. Kowalski.
` },
{ id: 'c09.core.2-1.06', chapter: 9, s: `
@set phonebooth
~sfx ring
LOLA: Detective? It's me. I'm in the phone booth by the warehouse door. Look up.
> I looked up. She waved from the booth across the street, with her other hand on the receiver.
LOLA: {GUESS} had {hitsN}, didn't it? I can always tell. You get a little line, right here. I'd play you beautifully.
~sfx hangup
` }],
'2-2': [
{ id: 'c09.core.2-2.01', chapter: 9, s: `
@set warehouse
> {GUESS} lit {hitsN}. Lola dropped a stack of tally sheets in the Fourth Ward aisle. Twelve volunteers bent to pick them up. She didn't.
> She was looking at me over her horn-rims. For one second she wasn't acting at all. She looked frightened.
` },
{ id: 'c09.core.2-2.02', chapter: 9, s: `
@set office
LOLA: {HitsN}. You're getting very warm, Detective.
DASH: Why did you come back, Lola? You could have stayed in the wings.
LOLA: Because I wanted to see your face when you worked it out. That's the thing about understudies. We want to be seen once.
` },
{ id: 'c09.core.2-2.03', chapter: 9, s: `
@set precinct
?!briggs_out BRIGGS: {HitsN}, Lexington. The board says the Fourth Ward decides the whole city. Again.
?briggs_out BRIGGS: {HitsN}, Lexington. First night back and the Fourth Ward decides the whole city. Again.
DASH: Sal said it would.
BRIGGS: Then put Sal on the election board, Lexington. He'd do a better job than the ones we've got.
` },
{ id: 'c09.core.2-2.04', chapter: 9, s: `
@set street
> {HitsN} in {GUESS}. A milk truck backed up to the warehouse loading door at one in the morning. Two men got out and started carrying milk crates in.
DOOLEY: Milk? At a count?
DASH: Look at the crates, Dooley. They're the right size for a ballot box.
!!@DASH THE REAL BOXES.
` },
{ id: 'c09.core.2-2.05', chapter: 9, s: `
@set morgue
FENN: {HitsN}. Harvey Bloom's notebook. Everything he saw tonight, in shorthand. The last line: "Six. Fourth. Wax. The understudy from the Grammatica, God help us."
DASH: He saw her swap them.
FENN: He saw, he wrote it down, and he went to tell somebody. He told the wrong somebody, Lexington.
` },
{ id: 'c09.core.2-2.06', chapter: 9, s: `
@set bar
SAL: {HitsN}. You've got most of her.
DASH: Most of Lola is a lot of Lola.
SAL: She used to come in here, you know. Sat at the end. Ordered a different drink every time, in a different voice.
DASH: Practising.
SAL: On me, I figured. She never once tipped like anybody but herself.
` }],
'2-3': [
{ id: 'c09.core.2-3.01', chapter: 9, s: `
@set warehouse
> {GUESS}. All her letters, every one in the wrong role. Like a play where everybody's learned somebody else's part.
LOLA: You've got the whole company, Detective. Now cast it properly.
` },
{ id: 'c09.core.2-3.02', chapter: 9, s: `
@set office
LOLA: All five, darling. Out of order. It's like rehearsals. Everybody's there, nobody knows where to stand.
DASH: I know where you're going to stand.
LOLA: In the light, I hope.
` },
{ id: 'c09.core.2-3.03', chapter: 9, s: `
@set precinct
BRIGGS: Every letter, Lexington, and she's counting ballots in front of the whole city.
DASH: In front of the whole city is where she likes it, Captain.
` }]
};
