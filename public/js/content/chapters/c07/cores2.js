// Chapter 7 cores, suspect 2 (around one in the morning).

export const CORES2 = {
'2-0': [
{ id: 'c07.core.2-0.01', chapter: 7, s: `
@set bar
> {GUESS} came up empty. In the back room, Mags had six Colophon deeds pinned to Sal's wall like butterflies.
MAGS: She signs in a different place on every one. A curl in a capital. A dot that isn't a dot. I've found two.
DASH: Two out of six.
MAGS: Two out of six hundred, Detective. There are six hundred deeds.
` },
{ id: 'c07.core.2-0.02', chapter: 7, s: `
@set street
> Five strangers. Quist had moved her easel six feet to get the light from the streetlamp on the bank's columns.
QUIST: Do you know what's wrong with this building, Detective? The proportions. The architect cheated on the cornice. I've fixed it in my painting.
DASH: You fix everything.
QUIST: Somebody has to. It certainly won't be City Hall.
` },
{ id: 'c07.core.2-0.03', chapter: 7, s: `
@set apartment
BRIGGS: {GUESS}? Nothing? Sit down a minute. My wife made soup. She makes soup when I'm suspended.
DASH: How often is that?
BRIGGS: This is the first time in twenty-six years, Lexington. She's very good at it already.
` },
{ id: 'c07.core.2-0.04', chapter: 7, s: `
@set alley
PETE: Lexington! I heard you lost your badge. That makes you a civilian. You know what civilians do? They buy papers.
DASH: {GUESS} came up empty, Pete.
PETE: Buy a paper. Read about yourself. It's very cheering.
` },
{ id: 'c07.core.2-0.05', chapter: 7, s: `
@set vault
> {GUESS}: nothing. Fosdick had stopped letting me in. He'd started letting me look through the bars of the outer gate instead, which he said was a compromise.
DASH: A compromise with what?
> He looked over his shoulder at the dark lobby, where the bank president's portrait hung, and wiped his glasses.
` }],
'2-1': [
{ id: 'c07.core.2-1.01', chapter: 7, s: `
@set bar
> {GUESS} gave me {hitsN}. Mags found the third signature in the seal of a deed for the courthouse: two tiny initials in the eagle's feathers.
MAGS: M.Q. She signed the courthouse in an eagle.
DASH: Will it hold up?
MAGS: With a magnifying glass and a jury that wears glasses, maybe.
` },
{ id: 'c07.core.2-1.02', chapter: 7, s: `
@set street
QUIST: {HitsN}. You're good, Detective. Better than your Captain. Do give him my regards. He's suspended, isn't he?
DASH: How do you know that?
QUIST: Everyone knows everything, darling. Some of us just know it first.
` },
{ id: 'c07.core.2-1.03', chapter: 7, s: `
@set precinct
?dooley_hurt DOOLEY: {HitsN}, Dash. And I've been reading Ashcroft's dispatch log with my good hand. There's a funny pattern.
?!dooley_hurt DOOLEY: {HitsN}, Dash. And I've been reading Ashcroft's dispatch log. There's a funny pattern.
DOOLEY: Every night the Lexicon did something, she logged a car on the other side of town. Every single night.
DASH: Coincidence.
DOOLEY: Eleven times, Dash.
` },
{ id: 'c07.core.2-1.04', chapter: 7, s: `
@set apartment
VERA: {HitsN}. Dash, the Gazette's business desk got a press release tonight. "Colophon Holdings acquires municipal real estate portfolio."
DASH: Tonight? It doesn't close till six.
VERA: It's dated tomorrow, Dash. They've already written the morning's news.
` },
{ id: 'c07.core.2-1.05', chapter: 7, s: `
@set office
> {HitsN} out of {GUESS}. Colophon Holdings, registered office: a lawyer's mail drop on Exchange Street. Directors: three names, all dead.
DASH: A company run by ghosts.
MAGS: Ghosts and one good forger.
` },
{ id: 'c07.core.2-1.06', chapter: 7, s: `
@set phonebooth
~sfx ring
WORD: Transfer. To convey from one person to another. Also, what happens to a city when nobody's looking. Look away, Lexington. You're good at it.
DASH: I'm looking right at her.
WORD: Then you're looking at the wrong thing.
~sfx hangup
> {GUESS} had {hitsN}. The voice wanted me looking at Quist. That made me want to look somewhere else.
` }],
'2-2': [
{ id: 'c07.core.2-2.01', chapter: 7, s: `
@set bar
> {GUESS} lit {hitsN}. Sal came in and looked at the deeds on his wall for a long time.
SAL: Funny thing. A piece of paper says who owns a building. Nobody ever asks who owns the paper.
DASH: Tonight somebody's asking, Sal.
SAL: Good. About time somebody did.
` },
{ id: 'c07.core.2-2.02', chapter: 7, s: `
@set street
> {HitsN} in {GUESS}. Quist had finished the bank's door and started on the windows. She painted one window lit, the rest dark.
DASH: Why that window?
QUIST: That's the president's office. He's in there now, darling. With a cup of cocoa and a very nervous conscience.
!!@DASH THEN I'LL KNOCK.
` },
{ id: 'c07.core.2-2.03', chapter: 7, s: `
@set apartment
BRIGGS: {HitsN}. You're halfway. Here's what I know from my kitchen: somebody's been reading my precinct's mail for a year. Before I was suspended, I couldn't prove it.
DASH: And now?
BRIGGS: Now I can't prove it from further away. But I'd look at the dispatch desk, Lexington. Somebody always knows where every car is.
` },
{ id: 'c07.core.2-2.04', chapter: 7, s: `
@set vault
> {GUESS}: {hitsN}. Through the gate, Fosdick was stacking new deeds into an attaché case with a Colophon tag on the handle.
DASH: Where's that going?
> He didn't look up. "To the Federal Reserve, at a quarter to six. With the president. I'm to carry it." He sounded like a man carrying his own coffin.
` },
{ id: 'c07.core.2-2.05', chapter: 7, s: `
@set office
MAGS: {HitsN}. Four signatures found. A curl, an eagle, a dot over an i that isn't an i, and a line on a map of the waterworks.
DASH: Six hundred deeds. Four signatures.
MAGS: She only needs to be caught once, Detective. She only needs to be named once more than that.
` },
{ id: 'c07.core.2-2.06', chapter: 7, s: `
@set alley
> {HitsN} out of {GUESS}. In the alley behind the bank, the president's car was parked with the engine running and the chauffeur asleep.
> On the back seat: a watercolour of the Federal Reserve. Perfect. With the clock on the front painted at six.
` }],
'2-3': [
{ id: 'c07.core.2-3.01', chapter: 7, s: `
@set bar
> {GUESS}. All five of her letters, all in the wrong places. Mags looked up from the deeds.
MAGS: That's her whole method, Detective. Every piece correct, every piece moved one step to the left.
DASH: Then I'll move them back.
` },
{ id: 'c07.core.2-3.02', chapter: 7, s: `
@set street
QUIST: All of me. Scrambled. How very modern.
DASH: You'll be very old-fashioned by six. In cuffs.
QUIST: Cuffs are so last century, darling.
` },
{ id: 'c07.core.2-3.03', chapter: 7, s: `
@set apartment
BRIGGS: All five, wrong order. Like my precinct right now: everybody in it, nobody where they should be, and a City Hall man in my chair.
DASH: I'll get you your chair back, Captain.
BRIGGS: Get me the city back, Lexington. I'll find my own chair.
` }]
};
