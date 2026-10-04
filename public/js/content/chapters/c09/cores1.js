// Chapter 9 cores, suspect 1 (just after midnight). Key: '<guess>-<bucket>'. Bucket 0: no hits · 1: 1-2 · 2: 3-4 · 3: five, wrong order.

export const CORES1 = {
'1-0': [
{ id: 'c09.core.1-0.01', chapter: 9, s: `
@set warehouse
> I said {GUESS} into the warehouse rafters. Two hundred volunteers looked up from their tally sheets, and one of them smiled.
> Lola, in horn-rims and a cardigan, with a clipboard. She waved her pencil at me like a fan.
DASH: Not a letter of her.
` },
{ id: 'c09.core.1-0.02', chapter: 9, s: `
@set office
> {GUESS} came up empty. Lola was still in my client chair, legs crossed, reading my appointment book upside down.
LOLA: You've got nothing on Thursday, darling. Neither do I. Isn't that a coincidence?
DASH: Five strangers.
LOLA: Six, counting me. I'm very strange.
` },
{ id: 'c09.core.1-0.03', chapter: 9, s: `
@set morgue
FENN: {GUESS}? Nothing. Harvey Bloom had a program in his pocket. A play at the Grammatica Theatre, 1946. A cast list, with one name circled.
DASH: Whose?
FENN: The understudy's, Lexington. He'd seen her play. He never forgot a face, and it killed him.
` },
{ id: 'c09.core.1-0.04', chapter: 9, s: `
@set precinct
?briggs_out > {GUESS}: five strangers. The precinct was nearly empty. Every man who could stand was at the warehouse, and Briggs's chair was warm again.
?!briggs_out > {GUESS}: five strangers. The precinct was nearly empty. Every man who could stand was at the warehouse.
?dooley_hurt DOOLEY: I'm minding the radio, Dash. One-armed men count ballots slowly.
?!dooley_hurt DOOLEY: I'm minding the radio, Dash. Somebody has to.
` },
{ id: 'c09.core.1-0.05', chapter: 9, s: `
@set street
> {GUESS} was a dud. Canal Street outside the warehouse, lined with cars from both parties, every driver asleep with his hat over his face.
> On the warehouse door, a poster: YOUR VOTE COUNTS. Somebody had written underneath it, in very good lipstick: EVENTUALLY.
` }],
'1-1': [
{ id: 'c09.core.1-1.01', chapter: 9, s: `
@set warehouse
> {GUESS} gave me {hitsN}. Lola was at the tally table now, reading out numbers in a schoolteacher's voice.
LOLA: Fourth Ward, box nine. Two hundred and twelve for the Reform slate. Ninety-one for the... oh dear, I've lost my place.
> She hadn't lost anything in her life. She was performing a woman who loses her place.
` },
{ id: 'c09.core.1-1.02', chapter: 9, s: `
@set bar
SAL: {HitsN}. Here's a free tip, Dash. It'll come down to one ward. The Fourth. It always does.
DASH: How do you know?
SAL: I've poured for every precinct captain in this city. They all drink in the Fourth when it's close.
> I'd remember that, later. It came down to the Fourth. Sal is never wrong.
` },
{ id: 'c09.core.1-1.03', chapter: 9, s: `
@set office
LOLA: {HitsN}, Detective? I'm flattered you're looking so closely.
DASH: You shot a poll watcher.
LOLA: A poll watcher was shot, darling. The passive voice is an actress's best friend. Nobody did anything. It just happened.
` },
{ id: 'c09.core.1-1.04', chapter: 9, s: `
@set apartment
KOW: Mr. Lexington. You come home at this hour? I am going out.
DASH: At midnight, Mrs. Kowalski?
KOW: I am a witness for the count. Fourth Ward. Thirty years I witness. Nobody cheats while I watch.
> {GUESS} had {hitsN}. Mrs. Kowalski, in her good hat, was going to watch the one ward I wanted nobody near.
` },
{ id: 'c09.core.1-1.05', chapter: 9, s: `
@set street
?vera_saved_herself VERA: {HitsN}, Dash. I've been reading the boxes' seals. Six in the Fourth Ward have new wax. I'd know a re-sealed proof anywhere.
?!vera_saved_herself VERA: {HitsN}, Dash. I've been reading the boxes' seals. Six in the Fourth Ward have new wax.
DASH: She swapped them.
VERA: Somebody did, and did it well. Fresh wax, old string. It's very nearly perfect.
` },
{ id: 'c09.core.1-1.06', chapter: 9, s: `
@set phonebooth
~sfx ring
WORD: Count. To number. Also, to matter. Also, a nobleman. Tonight, Lexington, everything counts but you.
DASH: Then why are you calling?
WORD: To keep you company. It's a long count.
~sfx hangup
> {GUESS} had {hitsN}. The voice wanted company. That was new. I didn't like it.
` }],
'1-2': [
{ id: 'c09.core.1-2.01', chapter: 9, s: `
@set warehouse
> First suspect, and {GUESS} lit {hitsN}. At the tally table, Lola's pencil stopped. She smiled at nothing, and started again.
LOLA: Where was I? Box nine. Two hundred and twelve. Or was it twenty-one? I'm dreadful with numbers.
!!@DASH SHE'S ACTING.
` },
{ id: 'c09.core.1-2.02', chapter: 9, s: `
@set office
LOLA: {HitsN}, on the very first try. You always did know my lines before I said them, Dash.
DASH: You never told me any lines.
LOLA: Didn't I? Then you must have written them yourself.
> She lit a cigarette with my lighter, which she'd taken from my desk without my seeing.
` },
{ id: 'c09.core.1-2.03', chapter: 9, s: `
@set precinct
?!briggs_out BRIGGS: {HitsN}. I'm going to the warehouse myself. Every ballot in this city is in one building, Lexington. That's not a count. That's a target.
?briggs_out BRIGGS: {HitsN}. First night back and it's this. I'm going to the warehouse myself, Lexington. I've missed being shouted at in person.
DASH: She's already in there, Captain. With a clipboard.
` },
{ id: 'c09.core.1-2.04', chapter: 9, s: `
@set morgue
FENN: {HitsN}. Here's my bit. The bullet's a .25, a lady's gun. Fired through a handbag. There's beading in the wound.
DASH: Beading.
FENN: Jet beads, Lexington. An evening bag. She came to a ballot count dressed for the theatre.
` },
{ id: 'c09.core.1-2.05', chapter: 9, s: `
@set street
> {GUESS}: {hitsN}. A cab pulled up to the warehouse and a woman got out in a widow's veil. She went in. She didn't come out.
> Ten minutes later, a woman came out with a clipboard and horn-rims. Same walk.
DASH: Same woman, Vera. Different part.
VERA: Different part, same proofreader's eye. I'd mark both of them.
` },
{ id: 'c09.core.1-2.06', chapter: 9, s: `
@set alley
PETE: {HitsN}, Lexington? I know that dame. Lola Vance. She sold me a raffle ticket in July, for widows and orphans.
DASH: She's not a widow, Pete.
PETE: She said she was. She cried. I bought five. I'd buy five again.
` }],
'1-3': [
{ id: 'c09.core.1-3.01', chapter: 9, s: `
@set warehouse
> {GUESS}. Every letter of her, all in the wrong seats. Like a theater after the interval, everybody back in somebody else's chair.
LOLA: You've got the whole cast, darling. Just not the running order.
` },
{ id: 'c09.core.1-3.02', chapter: 9, s: `
@set office
LOLA: All five! On the first night. You're wasted on the police, Dash. You'd make a marvelous critic.
DASH: I'd give you bad reviews.
LOLA: Everybody does, darling. Then they come back.
` },
{ id: 'c09.core.1-3.03', chapter: 9, s: `
@set precinct
BRIGGS: Five for five and she's still playing a volunteer.
DASH: She's playing all the parts, Captain. I just have to find which one's her.
** Every letter of the Understudy. Every role but her own.
` }]
};
