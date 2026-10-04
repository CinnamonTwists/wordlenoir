// Chapter 9 cores, suspect 3 (around two). Every one carries the midpoint turn (docs/story/bible.md §6): Lola names the Proofreader,
// in exchange for a head start. It's a real name (Ellery Thorne), the most frightening thing she's done. And, unprompted:
// "You're looking at the wrong old man, detective."

export const CORES3 = {
'3-0': [
{ id: 'c09.core.3-0.01', chapter: 9, s: `
@set warehouse
> {GUESS} came up clean. Lola caught my sleeve between the ballot stacks, and for once she wasn't playing anybody.
LOLA: I'll give you something, Dash. A name. The Proofreader's. In exchange for a head start. Ten minutes.
LOLA: Ellery Thorne. He lives over a bookbinder's on Mercer Street. He has a red pencil and a razor, and he's never once improvised.
> She was telling the truth. That was the most frightening thing she'd done all night.
LOLA: And darling, you're looking at the wrong old man.
` },
{ id: 'c09.core.3-0.02', chapter: 9, s: `
@set office
> {GUESS}: five strangers. Lola came back to my office and sat in the client chair. She took off her horn-rims.
LOLA: A head start. That's my price. For it, the Proofreader. Ellery Thorne. He's the one who corrects people. He corrected Harvey Bloom tonight, not me.
DASH: You shot Bloom.
LOLA: I held the bag, darling. Thorne held the gun inside it. I'm only ever the understudy.
LOLA: And Dash? The old man you've been watching. The Professor. He's the wrong old man.
` },
{ id: 'c09.core.3-0.03', chapter: 9, s: `
@set street
> Nothing in {GUESS}. Lola stepped out of the shadow by the warehouse door in her own face for once.
LOLA: I'll trade you. The Proofreader's name, for a head start. Ellery Thorne. Mercer Street. You'll want to hurry. He's correcting.
DASH: Why give him up?
LOLA: Because he's coming for me next, darling. And because you're looking at the wrong old man. I'd hate you to miss your cue.
` },
{ id: 'c09.core.3-0.04', chapter: 9, s: `
@set bar
~sfx pour
> {GUESS} was a bust. Lola was at Sal's bar, in no disguise at all. Sal poured for her without a word and went into the back.
LOLA: A trade, Dash. A name for a head start. The Proofreader is Ellery Thorne. Real name. Real man. He frightens me, and I'm not easily frightened.
DASH: And the head start?
LOLA: Is mine whether you give it to me or not. I just wanted you to know I asked.
LOLA: Oh, and you're watching the wrong old man. Just so you know.
` },
{ id: 'c09.core.3-0.05', chapter: 9, s: `
@set phonebooth
~sfx ring
LOLA: Dash. Listen. I'm going to say a name, and then I'm going to hang up, and you're going to give me ten minutes.
LOLA: Ellery Thorne. The Proofreader. A bookbinder's attic on Mercer Street.
DASH: Why?
LOLA: Because I'd rather be caught by you than corrected by him. And darling, it's the wrong old man. It always was.
~sfx hangup
` }],
'3-1': [
{ id: 'c09.core.3-1.01', chapter: 9, s: `
@set warehouse
> {GUESS} gave me {hitsN}. Lola walked past the tally table and pressed a folded program into my hand without stopping.
> On the cast list, under "the Proofreader," a name in her handwriting: ELLERY THORNE. And at the bottom: "A head start, please. 10 min. You're watching the wrong old man."
DASH: A trade.
> She'd given me the most dangerous man in the city for ten minutes. I couldn't tell yet which of us got the better deal.
` },
{ id: 'c09.core.3-1.02', chapter: 9, s: `
@set office
LOLA: {HitsN}. Let's make a deal, darling, before you get the rest. The Proofreader's name, for ten minutes' head start.
DASH: Go on.
LOLA: Ellery Thorne. He's real. He's courteous. He's killed eleven people and apologized to every one.
LOLA: And you're watching the wrong old man.
` },
{ id: 'c09.core.3-1.03', chapter: 9, s: `
@set precinct
?!briggs_out BRIGGS: {HitsN}. And she gave you a name, Lexington? Just like that?
?briggs_out BRIGGS: {HitsN}. First night back, and the Understudy gives you a name? Just like that?
DASH: Ellery Thorne. The Proofreader. For a head start.
BRIGGS: Then it's real. Nobody trades a fake name for a real head start. Not even her.
` },
{ id: 'c09.core.3-1.04', chapter: 9, s: `
@set street
?vera_saved_herself VERA: {HitsN}. Dash, she just walked up to me and said a name. Ellery Thorne. She wants you to give her ten minutes.
?!vera_saved_herself VERA: {HitsN}. Dash, she just walked up to me and said a name. Ellery Thorne. She wants ten minutes.
DASH: She told you?
VERA: She said women should tell women things. Then she said you're watching the wrong old man. Then she disappeared into a crowd of two.
` },
{ id: 'c09.core.3-1.05', chapter: 9, s: `
@set morgue
FENN: {HitsN}, and a visitor. She came in as a nurse. She said one name and left.
DASH: Ellery Thorne.
FENN: That's the one. She said it like a prayer. She also said you were looking at "the wrong old man." I assumed she didn't mean me.
` },
{ id: 'c09.core.3-1.06', chapter: 9, s: `
@set alley
> {HitsN} in {GUESS}. In the alley behind the warehouse, Lola was waiting by the coal chute in a plain grey coat.
LOLA: The Proofreader. Ellery Thorne. That's my gift, Dash. Give me ten minutes.
DASH: And the poll watcher?
LOLA: Ask Thorne about the poll watcher. And Dash, stop watching the Professor. You're looking at the wrong old man.
` }],
'3-2': [
{ id: 'c09.core.3-2.01', chapter: 9, s: `
@set warehouse
> {GUESS} lit {hitsN}. Lola stopped in the Fourth Ward aisle and turned to me, and for once in her life she didn't perform it.
LOLA: Ellery Thorne. The Proofreader. That's a real name, Dash, and I'm giving it to you for ten minutes' head start.
LOLA: And you're looking at the wrong old man.
!!@LOLA THE WRONG OLD MAN.
` },
{ id: 'c09.core.3-2.02', chapter: 9, s: `
@set office
> {HitsN}. Lola was in my client chair again, very still, very pale.
LOLA: He's going to correct me, Dash. Thorne. The Proofreader. Ellery Thorne. That's his real name. I'm trading it for ten minutes.
DASH: Why should I give you ten minutes?
LOLA: Because I'm the only one who's ever told you anything true. And because you're looking at the wrong old man.
` },
{ id: 'c09.core.3-2.03', chapter: 9, s: `
@set precinct
?!briggs_out BRIGGS: {GUESS}, {hitsN}. And a name. Ellery Thorne. I've run it. A bookbinder's lodger on Mercer Street. No record at all.
?briggs_out BRIGGS: {GUESS}, {hitsN}. First night back and a name. Ellery Thorne. I've run it. A bookbinder's lodger on Mercer Street. No record at all.
DASH: Lola traded it for a head start.
BRIGGS: Then she's afraid of him, Lexington. And she's never been afraid of anything.
` },
{ id: 'c09.core.3-2.04', chapter: 9, s: `
@set bar
SAL: {HitsN}. That actress was in here an hour ago. She left a name on a coaster.
> ELLERY THORNE, in lipstick. Underneath: "10 minutes, darling? P.S. Wrong old man."
SAL: Who's Thorne?
DASH: The Proofreader, Sal. The one who corrects people.
SAL: Then be careful, Dash. Some corrections you don't get to read.
` },
{ id: 'c09.core.3-2.05', chapter: 9, s: `
@set street
> {HitsN} in {GUESS}. Lola came out of the warehouse in a widow's veil and lifted it just long enough to say a name.
LOLA: Ellery Thorne. Mercer Street. Ten minutes, Dash.
DASH: And the old man?
LOLA: Wrong one. You've been staring at the Professor for a month. Look somewhere else.
` },
{ id: 'c09.core.3-2.06', chapter: 9, s: `
@set apartment
KOW: {HitsN}. Mr. Lexington. A woman came to my door. Very beautiful. Very frightened. She asked me to give you a name.
DASH: What name?
KOW: Ellery Thorne. And she asked for ten minutes. And she said you look at the wrong old man. I said, all my tenants look at the wrong things.
` }],
'3-3': [
{ id: 'c09.core.3-3.01', chapter: 9, s: `
@set warehouse
> {GUESS}. Every letter of Lola, out of order. And then, unbidden, the one thing in order: a name. Ellery Thorne. The Proofreader.
LOLA: Ten minutes, Dash. And it's the wrong old man.
` },
{ id: 'c09.core.3-3.02', chapter: 9, s: `
@set office
LOLA: All five, darling, and the Proofreader for free. Ellery Thorne. Give me ten minutes.
DASH: And the Professor?
LOLA: Is the wrong old man. He's always been the wrong old man. You just like him for it.
` },
{ id: 'c09.core.3-3.03', chapter: 9, s: `
@set precinct
BRIGGS: Five letters, out of order, and a real name in order. Ellery Thorne.
DASH: She traded him for a head start, Captain.
BRIGGS: Then she knows something we don't, Lexington. She always has.
` }]
};
