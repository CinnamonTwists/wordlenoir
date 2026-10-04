// Chapter 10 cores, suspect 4 (around three). Dooley is on his way to arrest the Professor; the bundles load at four.

export const CORES4 = {
'4-0': [
{ id: 'c10.core.4-0.01', chapter: 10, s: `
@set street
> Three o'clock. {GUESS} came up empty. The Gazette trucks were loading. Eddie's forty men were slitting bundles with pocketknives as fast as the drivers stacked them.
EDDIE: Real paper. Real paper. Real paper. Detective, it could take till Easter.
DASH: Keep going, Eddie.
` },
{ id: 'c10.core.4-0.02', chapter: 10, s: `
@set office
> {GUESS}: five strangers. On the open line, the station's public address, very faint: "The six o'clock express to points north..."
WORD: Can you hear the trains, Lexington? Every one of them leaving on time. Doesn't it make you want to go somewhere?
DASH: No.
WORD: It will.
` },
{ id: 'c10.core.4-0.03', chapter: 10, s: `
@set precinct
?dooley_hurt DOOLEY: Nothing in {GUESS}? Dash, I'm at Union Station. One arm. The Professor's on a bench under the clock, reading. He hasn't seen me.
?!dooley_hurt DOOLEY: Nothing in {GUESS}? Dash, I'm at Union Station. The Professor's on a bench under the clock, reading. He hasn't seen me.
DASH: Wait. Watch who he's waiting for.
DOOLEY: He keeps looking at the clock, Dash. Like a man who's early for something he dreads.
` },
{ id: 'c10.core.4-0.04', chapter: 10, s: `
@set bar
> {GUESS} was a bust. The Last Word was dark, the chairs up. A note on the door in Sal's square hand: CLOSED. BACK SOON.
> In twenty years, I'd never once seen the Last Word closed at three in the morning. I stood there a long time with my hand on the door.
` },
{ id: 'c10.core.4-0.05', chapter: 10, s: `
@set pressroom
?vera_saved_herself VERA: Nothing? Dash, I've read four thousand bundle tops on the Gazette dock. My eyes feel like they've been proofread.
?!vera_saved_herself VERA: Nothing? Dash, I've read four thousand bundle tops. My eyes feel like they've been proofread.
DASH: Go home, Vera.
VERA: Not until it's corrected.
` }],
'4-1': [
{ id: 'c10.core.4-1.01', chapter: 10, s: `
@set street
> {GUESS} gave me {hitsN}. Eddie held up a bundle from the bottom of a truck. Inside the Gazette's own wrapper: FINAL EDITION · CITY RECORD CORRECTED.
EDDIE: One. We found one, Detective.
DASH: There are a hundred thousand of them, Eddie. Hidden in every truck in the city.
EDDIE: Then we've found one percent of a percent. It's a start.
` },
{ id: 'c10.core.4-1.02', chapter: 10, s: `
@set office
MAGS: {HitsN}. Detective, the tap on your open line. I've traced the payphone. Union Station, booth four. Under the big clock.
DASH: The same booth Nickel uses.
MAGS: The same booth everybody uses. Whoever he is, he's ten yards from the Professor's bench.
` },
{ id: 'c10.core.4-1.03', chapter: 10, s: `
@set precinct
?!briggs_out BRIGGS: {HitsN}. I've got the city's lawyers at the Gazette, Lexington, trying to stop the trucks with an injunction.
?briggs_out BRIGGS: {HitsN}. Two weeks back, and I've got the city's lawyers at the Gazette trying to stop the trucks with an injunction.
DASH: Will it work?
BRIGGS: Not before six. Nothing legal ever works before six. That's why crooks love the morning.
` },
{ id: 'c10.core.4-1.04', chapter: 10, s: `
@set station
NICKEL: {HitsN}, Mister Lexington? The man in booth four's been on the phone two hours. He keeps putting nickels in. I'm making a fortune changing his dollars.
DASH: What does he look like?
NICKEL: I never see his face, mister. Just his hat brim and his nickels. He's got a lot of nickels.
` },
{ id: 'c10.core.4-1.05', chapter: 10, s: `
@set apartment
> {HitsN} in {GUESS}. I went home for one minute. On my desk, my typewriter. The key that sticks, with its little smudge.
> Beside it, the red-pencilled note from the Hall of Records night, the one I'd put in a drawer. Somebody had taken it out and left it on top.
` },
{ id: 'c10.core.4-1.06', chapter: 10, s: `
@set phonebooth
~sfx ring
?index_half PROF: Detective? Ambrose Thackeray. I'm at Union Station. I've seen the Index. You have half of it in evidence, I know. I've finally understood it.
?!index_half PROF: Detective? Ambrose Thackeray. I'm at Union Station. I've seen the porter's pages. I've finally understood them.
PROF: I'm waiting for someone. Please don't send anybody to stop me. Not yet.
~sfx hangup
> {GUESS} had {hitsN}. I'd already sent somebody. He was watching the Professor make that call.
` }],
'4-2': [
{ id: 'c10.core.4-2.01', chapter: 10, s: `
@set street
> {GUESS} lit {hitsN}. A man in a grey overcoat was standing on the Gazette loading dock, very still, with a clipboard, counting trucks.
> He saw me. He raised his red pencil. Then he made a little mark on his clipboard, very neat, and walked away between two trucks.
!!@DASH THORNE.
` },
{ id: 'c10.core.4-2.02', chapter: 10, s: `
@set office
> {HitsN} in {GUESS}. On the open line, a long sigh.
WORD: You're so close to him now, Lexington. Close to all of it. Do you want to know who I am?
DASH: Yes.
WORD: No, you don't. You never have.
` },
{ id: 'c10.core.4-2.03', chapter: 10, s: `
@set precinct
?dooley_hurt DOOLEY: {HitsN}, Dash. The Professor just bought a cup of tea and sat back down. He's got a ticket for the six o'clock in one hand and a dictionary in the other. Should I take him?
?!dooley_hurt DOOLEY: {HitsN}, Dash. The Professor just bought a cup of tea. Ticket for the six o'clock in one hand, a dictionary in the other. Should I take him?
DASH: Not yet. Wait for whoever he's meeting.
DOOLEY: I'll wait, Dash. I've got the patience. I've got nothing else left tonight.
` },
{ id: 'c10.core.4-2.04', chapter: 10, s: `
@set morgue
FENN: {HitsN}. Here's a gift. Thorne's twelfth correction slip, the one with no body yet. I've had it under ultraviolet.
DASH: And?
FENN: There's a name under the name. Erased and written over. Very faint. "Lexington."
` },
{ id: 'c10.core.4-2.05', chapter: 10, s: `
@set pressroom
?lola_caught VERA: {HitsN}, Dash. Lola sent another message through the matron. "Thorne counts the trucks before they leave. He never trusts a driver. Front row, darling."
?!lola_caught VERA: {HitsN}, Dash. A telegram for you came to the Gazette, unsigned. "Thorne counts the trucks before they leave. He never trusts a driver. Front row."
DASH: Then he'll be on the dock at a quarter to six.
VERA: Then so will you.
` },
{ id: 'c10.core.4-2.06', chapter: 10, s: `
@set station
> {GUESS}: {hitsN}. I went to Union Station myself for ten minutes. The Professor was on his bench under the clock. Dooley was by the newsstand, pretending to read.
> Booth four was empty. Warm. The receiver was off the hook, swinging, and somebody was still breathing on the other end of my line.
` }],
'4-3': [
{ id: 'c10.core.4-3.01', chapter: 10, s: `
@set street
> {GUESS}. Every letter of Thorne, out of order. Two questions left. The first Gazette truck coughed into life on Front Street.
EDDIE: They're starting the engines, Detective.
DASH: Then I'll start mine.
` },
{ id: 'c10.core.4-3.02', chapter: 10, s: `
@set office
> All five letters, scrambled. On the open line, very gently:
WORD: You have all of him, Lexington. You always have all of them. It's the order you leave till last. Why is that, do you think?
** Every letter. The order, last.
` },
{ id: 'c10.core.4-3.03', chapter: 10, s: `
@set precinct
BRIGGS: Five out of five, wrong order. Two questions. The last night.
DASH: I know, Captain.
BRIGGS: Then I'll hold up the last finger I've got, Lexington. One. Make it count.
` }]
};
