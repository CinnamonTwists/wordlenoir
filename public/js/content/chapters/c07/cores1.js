// Chapter 7 cores, suspect 1 (just after midnight). Key: '<guess>-<bucket>'. Bucket 0: no hits · 1: 1-2 · 2: 3-4 · 3: five, wrong order.

export const CORES1 = {
'1-0': [
{ id: 'c07.core.1-0.01', chapter: 7, s: `
@set bar
> I said {GUESS} across the green lamp in Sal's back room. Nobody flinched. There was nobody in the room to flinch but Mags, and she was busy.
MAGS: Five strangers.
DASH: I know.
MAGS: I'm writing it down anyway. Somebody should keep a record that isn't forged.
` },
{ id: 'c07.core.1-0.02', chapter: 7, s: `
@set street
> {GUESS} came up empty. Across the street, under her awning, Mirabel Quist was painting the bank's front door with a brush the size of an eyelash.
QUIST: Not even warm, darling. Do try harder. I've only got till six.
` },
{ id: 'c07.core.1-0.03', chapter: 7, s: `
@set precinct
> {GUESS}: five strangers. I'd gone to the precinct for my notebook. The acting captain was in Briggs's chair, eating Briggs's peppermints.
> He looked at me like a man who'd been told to look at me that way.
DASH: Just getting my things.
> I took my notebook and left my badge where it was. It looked lonely in the drawer.
` },
{ id: 'c07.core.1-0.04', chapter: 7, s: `
@set apartment
> {GUESS} was a bust. I went home for a clean collar. Briggs was sitting on my front stoop in a civilian hat.
DASH: Captain.
BRIGGS: Not tonight, Lexington. Tonight I'm a taxpayer. I came to ask how my city's doing.
DASH: It's being sold at six.
BRIGGS: Then don't let me keep you.
` },
{ id: 'c07.core.1-0.05', chapter: 7, s: `
@set vault
> {GUESS}: nothing. The night manager let me stand at the vault door for one more minute. Two hundred crates of the city's memory.
> On the top crate, somebody had left a small watercolour of the vault door, very exact. Signed nowhere I could see.
` }],
'1-1': [
{ id: 'c07.core.1-1.01', chapter: 7, s: `
@set bar
> {GUESS} gave me {hitsN}. Sal came into the back room with a pot of coffee and set it down without asking.
SAL: The wire window opens at six, right? At the Federal Reserve?
DASH: Who told you that?
SAL: You did, Dash. Didn't you? Somebody did.
> Nobody had. I hadn't told anybody but Mags, and Mags hadn't left the room.
` },
{ id: 'c07.core.1-1.02', chapter: 7, s: `
@set street
QUIST: {HitsN}, darling? You're getting a little colour in your cheeks.
DASH: You forged every deed in this city.
QUIST: I improved them. The originals had spelling errors. Your City Hall can't spell "easement." I fixed it.
` },
{ id: 'c07.core.1-1.03', chapter: 7, s: `
@set office
> {HitsN} out of {GUESS}. I'd borrowed one of the Colophon deeds from the vault for an hour. Mags held it up to the lamp.
MAGS: Perfect. The watermark, the seal, the clerk's signature. Perfect.
DASH: Then how do we prove it's fake?
MAGS: By finding the place she signed it. She always signs it, Detective. She can't help herself.
` },
{ id: 'c07.core.1-1.04', chapter: 7, s: `
@set phonebooth
~sfx ring
?dooley_hurt DOOLEY: Dash, it's me. I'm on desk duty with my arm in a sling. I hear everything that comes over the dispatch radio.
?!dooley_hurt DOOLEY: Dash, it's me. They've got me on the dispatch desk tonight. Punishment for helping you. I hear everything.
DOOLEY: The acting captain just told every car to stay away from First Municipal Trust. "By order of City Hall."
> {GUESS} had {hitsN}. Somebody wanted that bank lonely tonight.
` },
{ id: 'c07.core.1-1.05', chapter: 7, s: `
@set vault
> {GUESS} gave me {hitsN}. The night manager was a nervous little man named Fosdick who kept wiping his glasses.
DASH: Who signed for this lease, Mr. Fosdick?
> He showed me. M. Quist, in a beautiful hand. And under it, the bank president's own initials.
DASH: The president knows.
> Fosdick wiped his glasses again, very hard, and didn't answer.
` },
{ id: 'c07.core.1-1.06', chapter: 7, s: `
@set apartment
VERA: You're home at one in the morning without your badge. Are you fired?
DASH: Benched. {GUESS} had {hitsN}. I'm working out of Sal's.
VERA: Of course you are. Sal's back room is the only place in this city that's always open for you.
> She didn't say it unkindly. She said it like a proofreader noting a pattern.
` }],
'1-2': [
{ id: 'c07.core.1-2.01', chapter: 7, s: `
@set street
> First suspect, and {GUESS} lit {hitsN}. Across the street, Quist's brush stopped mid-stroke. A drop of grey ran down the bank's painted door.
QUIST: Now look what you've made me do.
DASH: I'll make you do worse by six.
QUIST: Promises, promises.
` },
{ id: 'c07.core.1-2.02', chapter: 7, s: `
@set bar
MAGS: {HitsN} on the first try. I'd shake your hand, but I'm holding a forged deed with tweezers.
DASH: Find her signature yet?
MAGS: Not yet. It's somewhere in the lettering. She hides her initials like other people hide money.
` },
{ id: 'c07.core.1-2.03', chapter: 7, s: `
@set office
> {GUESS}: {hitsN}. Quist's file from the art school she'd been thrown out of in 1938: "Brilliant. Insufferable. Forged the dean's signature on her own diploma, then corrected his spelling."
DASH: She's been doing it her whole life.
!!@DASH SHE ALWAYS SIGNS.
` },
{ id: 'c07.core.1-2.04', chapter: 7, s: `
@set vault
> {HitsN} in {GUESS}. Fosdick finally talked, in a whisper, beside the vault door.
> The president had signed for the crates. The president had arranged the wire. The president would be at the Federal Reserve at six, in his good suit.
DASH: And the president works for?
> Fosdick shook his head. Then he wiped his glasses one more time and said, "A gentleman who corrects things."
` },
{ id: 'c07.core.1-2.05', chapter: 7, s: `
@set apartment
BRIGGS: {HitsN}, first time out. Good. I've been suspended a week, Lexington. I've read every paper in the city. Ask me anything.
DASH: Who owns Colophon Holdings?
BRIGGS: Nobody. That's the beauty of it. A company with an address and no people. Like City Hall.
` },
{ id: 'c07.core.1-2.06', chapter: 7, s: `
@set precinct
?dooley_hurt > {GUESS} had {hitsN}. At the dispatch desk, Dooley was taking calls one-handed, the other arm in a sling.
?!dooley_hurt > {GUESS} had {hitsN}. At the dispatch desk, Dooley was taking calls with a scar across both palms.
DOOLEY: The night dispatcher went home sick, so they gave me her desk. Officer Ashcroft. She keeps it very neat.
DASH: Anything interesting in the log?
DOOLEY: Everything's interesting in the log, Dash, if you read it upside down.
` }],
'1-3': [
{ id: 'c07.core.1-3.01', chapter: 7, s: `
@set street
> {GUESS}. All of her letters, every one in the wrong spot. Like a watercolour of a bank with the windows painted where the doors should be.
QUIST: You've got all of me, darling. You just don't know where I go.
` },
{ id: 'c07.core.1-3.02', chapter: 7, s: `
@set bar
MAGS: Five for five, scrambled. Like her deeds. Every letter right, every one in the wrong place, and still perfect enough to sell a city.
DASH: Then I'll make her sign it properly.
` },
{ id: 'c07.core.1-3.03', chapter: 7, s: `
@set apartment
BRIGGS: All five. Out of order. You know what that's called in a forgery, Lexington?
DASH: What?
BRIGGS: A tell. Good forgers never get it all right. They get it all almost right. Find the almost.
** Every letter of the Forger. All of them almost.
` }]
};
