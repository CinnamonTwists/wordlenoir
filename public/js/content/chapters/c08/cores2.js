// Chapter 8 cores, suspect 2 (around one in the morning). Still searching blind: the ferry, the waterfront, Grey's rooms.

export const CORES2 = {
'2-0': [
{ id: 'c08.core.2-0.01', chapter: 8, s: `
@set street
> {GUESS} came up empty. Silas Grey's rooming house on Lime Street: an empty closet full of other men's suits, every one a different size.
DOOLEY: He wears what he finds, Dash.
DASH: He wears who he finds, Dooley. That's the job.
` },
{ id: 'c08.core.2-0.02', chapter: 8, s: `
@set ferry
> {GUESS}: five strangers. The ferry captain came down to the slip at one in the morning to check his moorings, and found me sitting on them.
> I showed him the ticket. He read the name and took off his cap.
> "Blackwell takes them in at the north landing," he said. "There's a doctor who meets the boat. He signs whatever they hand him."
` },
{ id: 'c08.core.2-0.03', chapter: 8, s: `
@set apartment
> Nothing in {GUESS}. I went through Vera's desk drawer looking for anything. Copy paper, red pencils, a photograph of us at Luigi's.
> And a note in her handwriting, the real one, leaning hard: "ASK DASH ABOUT THE COUNT." Underlined twice.
DASH: Ask me what, Vera?
` },
{ id: 'c08.core.2-0.04', chapter: 8, s: `
@set precinct
?!briggs_out BRIGGS: {GUESS}? Nothing. Lexington, go home for ten minutes. Eat something.
?briggs_out DOOLEY: {GUESS}? Nothing. Dash, the acting captain went home. Briggs called from his kitchen. He says to eat something.
DASH: I can't go home. She's not there.
` },
{ id: 'c08.core.2-0.05', chapter: 8, s: `
@set alley
PETE: Lexington. I heard. I got nothing to sell you tonight. I'm just standing here in case you need someone standing here.
DASH: {GUESS} came up empty, Pete.
PETE: Then I'll stand here a while longer. No charge.
` }],
'2-1': [
{ id: 'c08.core.2-1.01', chapter: 8, s: `
@set office
> {GUESS} gave me {hitsN}. Mags had Vera's farewell letter flat under glass, reading it like a circuit diagram.
MAGS: It's a beautiful forgery. He learned her loops from her own copy notes at the Gazette.
DASH: She'd have hated it.
MAGS: She'd have marked it up in red. I keep thinking she would have, if she'd had the chance.
` },
{ id: 'c08.core.2-1.02', chapter: 8, s: `
@set docks
EDDIE: {HitsN}, Detective. A tugboat man says a car came down to the north wharf at eleven. A man in an overcoat too big for him. A woman with her hands in a muff.
DASH: In a muff?
EDDIE: He said her hands didn't come out of it once. Like they were tied.
` },
{ id: 'c08.core.2-1.03', chapter: 8, s: `
@set bar
SAL: {HitsN}. A cabbie called me. Picked up a man in a long coat at the Gazette at ten. He had a woman with him who didn't say a word.
DASH: Where'd he take them?
SAL: Around the block, Dash. Three times. Then back to the Gazette. The man paid in coins and said it was a lovely drive.
` },
{ id: 'c08.core.2-1.04', chapter: 8, s: `
@set phonebooth
~sfx ring
WORD: Kin. Those you're bound to by blood. Also by law. Also, Lexington, by guilt. Which binds you tighter?
DASH: Where is she?
WORD: Wherever you've stopped looking.
~sfx hangup
> {GUESS} had {hitsN}. The voice knew where she was. It wanted me to know that it knew.
` },
{ id: 'c08.core.2-1.05', chapter: 8, s: `
@set ferry
> {HitsN} in {GUESS}. Under the bench at the ferry slip, a little folded square of Gazette copy paper, wet.
> I opened it. Nothing written. Just a red pencil mark, a proofreader's caret, the little "insert here" sign.
DASH: She's been here, Dooley. Or something of hers has.
` },
{ id: 'c08.core.2-1.06', chapter: 8, s: `
@set street
?dooley_hurt DOOLEY: {HitsN}, Dash. I went to Grey's rooming house with my one arm. The landlady says he hasn't paid rent since August. He writes her letters from her dead son instead.
?!dooley_hurt DOOLEY: {HitsN}, Dash. Grey's landlady says he hasn't paid rent since August. He writes her letters from her dead son instead.
DASH: That's how he pays.
DOOLEY: She reads them every night, Dash. She doesn't care if they're real.
` }],
'2-2': [
{ id: 'c08.core.2-2.01', chapter: 8, s: `
@set apartment
> {GUESS} lit {hitsN}. I sat on the bed with her letter and read it again, the way she taught me to read copy. Slowly. Every word.
> "Don't come looking at the Gazette. I'll be on the ferry." Between "ferry" and "Gazette", a faint red curl I'd taken for a smudge.
DASH: That's not a smudge.
> But I couldn't remember what it meant. She'd told me once. I hadn't been listening.
` },
{ id: 'c08.core.2-2.02', chapter: 8, s: `
@set office
MAGS: {HitsN}. Detective, the Gazette proof room. Vera was working on the election supplement. Ballot counts, precinct by precinct.
DASH: "Ask Dash about the count."
MAGS: She found something in those proofs. Something the Lexicon wrote into them. That's why she's gone.
` },
{ id: 'c08.core.2-2.03', chapter: 8, s: `
@set precinct
?!briggs_out BRIGGS: {HitsN}. Here's Grey's record: nothing. Not a parking ticket. He's never existed long enough to be fined.
?briggs_out DOOLEY: {HitsN}. Briggs called from home with Grey's record: nothing. Not a parking ticket. He's never existed long enough to be fined.
DASH: He's existed long enough to take my wife.
!!@DASH I'M COMING, VERA.
` },
{ id: 'c08.core.2-2.04', chapter: 8, s: `
@set bar
SAL: {HitsN}. Dash, sit for one minute. Drink this. Water. Then go.
DASH: I don't have a minute.
SAL: You have one. I'm giving it to you. I've always given you one.
> I drank the water. He was right. He was always right. It made me want to break the glass.
` },
{ id: 'c08.core.2-2.05', chapter: 8, s: `
@set ferry
> {GUESS}: {hitsN}. The ferry's engine room lights came on at two, the engineer firing the boilers early. Six o'clock would come no matter what I did.
DASH: Eddie. Can your men hold that boat?
EDDIE: Hold it? Detective, we can sit on it.
` },
{ id: 'c08.core.2-2.06', chapter: 8, s: `
@set phonebooth
~sfx ring
NORA: Dash. An operator at the exchange caught a call from the Gazette building at one. A woman's voice. One word, then cut off.
DASH: What word?
NORA: "Stet." She said "stet," Dash. What does that mean?
DASH: It's a proofreader's mark. It means let it stand. Leave it as it was.
NORA: Leave what?
DASH: I don't know yet, Nora. She does. She's telling me something, and I can't read it.
` }],
'2-3': [
{ id: 'c08.core.2-3.01', chapter: 8, s: `
@set apartment
> {GUESS}. All his letters, every one in the wrong place. Like her letter: every word hers, none of them in her order.
DASH: He rearranges people, Mags. That's all he does.
MAGS: Then rearrange him back.
` },
{ id: 'c08.core.2-3.02', chapter: 8, s: `
@set office
MAGS: All five, scrambled. He'd like that. Ghostwriters never sign their own names.
DASH: Then I'll sign it for him.
` },
{ id: 'c08.core.2-3.03', chapter: 8, s: `
@set precinct
?!briggs_out BRIGGS: Five letters, all in the wrong chairs. You've had worse nights, Lexington.
?briggs_out DOOLEY: Five letters, all in the wrong chairs. You've had worse nights, Dash.
DASH: Name one.
> Nobody could. I couldn't either.
` }]
};
