// Chapter 8 cores, suspect 3 (around two). Every one carries the midpoint turn (docs/story/bible.md §6): Vera's farewell letter has a
// proofreader's mark in it, a message only Dash would read. The transpose mark swaps "ferry" and "Gazette": she isn't on the ferry yet.
// She's being held at the Gazette.

export const CORES3 = {
'3-0': [
{ id: 'c08.core.3-0.01', chapter: 8, s: `
@set apartment
> {GUESS} came up clean. I was reading her letter for the twentieth time when I finally saw the red curl between two words for what it was.
> A transpose mark. Swap these. "Don't come looking on the ferry. I'll be at the Gazette."
DASH: She's not on the boat yet. She's at the Gazette. She proofread her own kidnapping.
** He wrote her goodbye. She corrected it.
` },
{ id: 'c08.core.3-0.02', chapter: 8, s: `
@set office
MAGS: Forget {GUESS}. Look at the letter again, Detective. That red curl between "ferry" and "Gazette." That's not ink from his pen.
DASH: It's a transpose mark. Vera's. Swap the two words.
MAGS: "Don't come looking on the ferry. I'll be at the Gazette."
DASH: She's in the building, Mags. She's been in the building all night.
` },
{ id: 'c08.core.3-0.03', chapter: 8, s: `
@set ferry
> {GUESS}: nothing. On the ferry slip, I held the letter up to the lamp the way she holds proofs, and saw her mark in it. A little red S on its side.
> Transpose. The ghostwriter wrote "ferry" then "Gazette." She swapped them.
DASH: She's at the Gazette. Not here. Not yet.
> I ran. I'd been standing at the wrong end of the night.
` },
{ id: 'c08.core.3-0.04', chapter: 8, s: `
@set bar
> {GUESS} was a bust. I put Vera's letter on the bar. Sal looked at it for a long time, then put his thick finger on a tiny red curl.
SAL: That's hers. Not his. She marks the copy like that. I've seen her do it on menus.
DASH: Transpose. Swap the words. "I'll be at the Gazette."
SAL: Then go to the Gazette, Dash. Why are you still standing in my bar?
` },
{ id: 'c08.core.3-0.05', chapter: 8, s: `
@set precinct
?!briggs_out BRIGGS: {GUESS}? Nothing. Give me that letter, Lexington. What's this red squiggle?
?briggs_out DOOLEY: {GUESS}? Nothing. Give me that letter, Dash. What's this red squiggle?
DASH: A proofreader's transpose mark. She swapped two words. The ferry and the Gazette.
> She'd written it into his lie with the pencil he'd forgotten to take off her. She was being held at the Gazette.
` }],
'3-1': [
{ id: 'c08.core.3-1.01', chapter: 8, s: `
@set apartment
> {GUESS} gave me {hitsN}. Then I saw it in the letter, finally. A proofreader's mark, the size of an eyelash. Transpose.
> Swap "ferry" and "Gazette." She wasn't on the boat. She was in the building where she worked, and he'd written it so nobody would look there.
DASH: Clever girl. Clever, clever girl.
` },
{ id: 'c08.core.3-1.02', chapter: 8, s: `
@set office
MAGS: {HitsN}. And the letter, Detective. There's a mark in it that isn't his. Red pencil. Tiny.
DASH: Transpose. Vera's mark. It swaps "ferry" and "Gazette."
MAGS: So she's at the Gazette.
DASH: She's at the Gazette, and she wanted me to know it before the ghost did.
` },
{ id: 'c08.core.3-1.03', chapter: 8, s: `
@set pressroom
> {HitsN} out of {GUESS}. I came into the Gazette composing room with the letter in my fist. A proofreader's mark, Vera's: the ferry and the Gazette, swapped.
> She was here. Somewhere in eight floors of paper and lead, she was here.
DASH: Vera!
> Press Number Two was cold. Nobody answered but the echo.
` },
{ id: 'c08.core.3-1.04', chapter: 8, s: `
@set phonebooth
~sfx ring
NORA: Dash. "Stet." The operator's sure. A woman's voice from the Gazette switchboard.
DASH: And her letter's got a transpose mark in it. Ferry and Gazette swapped. Nora, she's in the building.
NORA: Then get her out of it.
> {GUESS} had {hitsN}. My sister was crying on a party line. My wife was proofreading her way out of a grave.
` },
{ id: 'c08.core.3-1.05', chapter: 8, s: `
@set street
?dooley_hurt DOOLEY: {HitsN}, Dash. And what's that red mark in the letter?
?!dooley_hurt DOOLEY: {HitsN}, Dash. What's that red mark in the letter?
DASH: Transpose. Vera swapped two words in his forgery. She's not on the ferry, Dooley. She's at the Gazette.
DOOLEY: Then that's where we're going.
` },
{ id: 'c08.core.3-1.06', chapter: 8, s: `
@set bar
SAL: {HitsN}. Show me that letter again, Dash.
> He put on his reading glasses, which I'd never seen him wear, and found it in a second. A little red curl between two words.
SAL: That's a proofreader's mark. She's swapping something.
DASH: The ferry and the Gazette. She's at the Gazette.
` }],
'3-2': [
{ id: 'c08.core.3-2.01', chapter: 8, s: `
@set apartment
> {GUESS} lit {hitsN}. I read the letter one more time, and the red curl between "ferry" and "Gazette" stopped being a smudge.
> Transpose. The first thing she ever taught me about proofs, on our second date, on a napkin at Luigi's.
DASH: "I'll be at the Gazette."
!!@DASH SHE'S AT THE GAZETTE.
` },
{ id: 'c08.core.3-2.02', chapter: 8, s: `
@set office
MAGS: {HitsN}. Detective, I've been staring at this letter for an hour. There's one mark in it that's a different red.
DASH: Vera's pencil. A transpose. "On the ferry" and "at the Gazette," swapped.
MAGS: She's not gone yet. She's in the Gazette, and he's moving her at six.
` },
{ id: 'c08.core.3-2.03', chapter: 8, s: `
@set pressroom
> {GUESS}: {hitsN}. The Gazette at two in the morning. I had her letter in one hand: her transpose mark, the ferry and the Gazette swapped.
> Somewhere above me, a typewriter was going. Slow. Careful. Somebody writing something in somebody else's voice.
DASH: Grey's in the building. And so is she.
` },
{ id: 'c08.core.3-2.04', chapter: 8, s: `
@set precinct
?!briggs_out BRIGGS: {HitsN}. A transpose mark, Lexington? In the letter?
?briggs_out DOOLEY: {HitsN}. A transpose mark, Dash? In the letter?
DASH: Ferry and Gazette, swapped. She's being held at the Gazette.
?!briggs_out BRIGGS: Then I'm sending every car I've got to Front Street.
?briggs_out DOOLEY: The acting captain won't send cars. I'm going anyway. One arm or two.
` },
{ id: 'c08.core.3-2.05', chapter: 8, s: `
@set ferry
> {HitsN} in {GUESS}. Eddie's men were sitting on the ferry's gangplank in a row, smoking, when I came running down the slip with the letter.
DASH: She's not here, Eddie. Look. Her mark. Transpose. She's at the Gazette.
EDDIE: Then we'll sit on this boat anyway, Detective. In case the ghost brings her.
` },
{ id: 'c08.core.3-2.06', chapter: 8, s: `
@set street
> {GUESS} gave me {hitsN}. Front Street, outside the Gazette. Every window dark but one, on the sixth floor, where the old bound files are kept.
> In my pocket, her letter: the ferry and the Gazette, transposed, in her own red.
DASH: Sixth floor. The morgue, they call it. Where old news goes to die.
` }],
'3-3': [
{ id: 'c08.core.3-3.01', chapter: 8, s: `
@set apartment
> {GUESS}. All of him, out of order. And in her letter, one tiny mark that put two words back in order. Transpose. Ferry and Gazette.
DASH: She fixed his copy, Mags. Even with her hands tied.
` },
{ id: 'c08.core.3-3.02', chapter: 8, s: `
@set office
MAGS: All five letters, scrambled, and one red mark in a forged letter. A transpose. She's at the Gazette, Detective.
DASH: She was always going to be the one to tell me.
` },
{ id: 'c08.core.3-3.03', chapter: 8, s: `
@set pressroom
> Every letter of Silas Grey, out of order. Every word of Vera's letter, in his order, except two. Ferry. Gazette. Swapped.
> I stood in the composing room where I'd caught the Typesetter, and listened for her.
` }]
};
