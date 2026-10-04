// Scenes after suspect 1. Key: '1-<bucket>'. Bucket 0: no hits · 1: 1-2 hits · 2: 3-4 hits · 3: five hits, wrong order.

export default {
'1-0': [`
@set precinct
> First suspect. {GUESS}. I sat it down under the lamp and let it sweat.
DASH: Where were you at eleven o'clock tonight?
> Five letters. Five alibis. Every one of them clean as a choirboy's collar.
BRIGGS: You brought in a nobody, Lexington.
DASH: Nobody's a nobody, Captain. Now I know five letters that aren't in this.
> Cutting suspects is still progress. That's what I told myself. I'd been telling myself a lot of things lately.
`, `
@set street
> {GUESS} didn't even look up when I said its name. Wrong word, wrong night, wrong detective.
> Not one letter stuck. Five gray faces walking off into the rain.
!!@DASH NOT EVEN CLOSE.
> Fine. A cold first lead is still a lead. It tells you where the word isn't.
> The city was big. But tonight it was five letters smaller.
`, `
@set bar
SAL: You look like a man who just struck out.
DASH: {GUESS}. Every letter had an alibi.
SAL: First one's on the house, then.
> He meant the coffee. I took it to mean the mistake.
~sfx ring
> The phone behind the bar rang once. Sal handed it over without a word.
WORD: Cold, detective. Ice cold.
~sfx hangup
> Somewhere out there, the word was laughing. I could hear it over the jukebox.
`, `
@set office
@mood warm
> I wrote {GUESS} on the chalkboard and drew a line through every letter.
> Five alibis. Airtight. The kind of alibis you can't buy, because they're true.
DASH: All right. You're not the word. But you've told me who it isn't.
** The night is young. So is the case.
`],
'1-1': [`
@set precinct
> {GUESS} sat there sweating. Mostly clean. But not all of it.
> {HitsN} wouldn't look me in the eye. That's how you know.
DASH: You know something. Your friends already told me.
> A small crack in a big wall. In my line of work, you take the crack.
!!@DASH GOT YOU.
`, `
@set street
> First suspect, and the street gave something back. {HitsN} in {GUESS} knew the word personally.
DOOLEY: That's not nothing, Dash.
DASH: It's not much, either.
DOOLEY: Most guys get nothing on the first knock.
> He was right. I hated it when Dooley was right. It usually meant I was about to get lucky, and luck always sends a bill.
`, `
@set office
@mood warm
> I wrote {GUESS} on the chalkboard and circled what stuck. {HitsN}.
> A thread. You pull a thread long enough and somebody's coat comes apart.
~sfx ring
WORD: Lucky guess, detective.
DASH: I don't guess. I deduce.
WORD: Then deduce this. You've got {leftN} left.
~sfx hangup
`],
'1-2': [`
@set precinct
@mood gold
> {GUESS}. I knew it the second it sat down. Too calm. Too familiar.
> {HitsN} lit up under the lamp. This suspect ran with the word. Maybe shared a cab with it.
BRIGGS: First suspect and you're already this close? What, did you sleep with the dictionary?
DASH: Wouldn't be the first night.
** I could smell its cologne.
`, `
@set street
@mood blue
> Most cases start cold. This one started with a fever.
> {HitsN} in {GUESS} were in on it.
?greens>0 > {GreensN} standing exactly where the word stands.
~fade
@set phonebooth!
~sfx ring
WORD: You're good, Lexington. I'll give you that.
DASH: Give me the rest of your name while you're at it.
WORD: Where's the fun in that?
~sfx hangup
`, `
@set bar
SAL: You're smiling, Lexington. It's unsettling.
DASH: First suspect, Sal. {GUESS}. {HitsN} talked.
SAL: So the word's got friends.
DASH: The word's got family. And family always gives you up eventually.
!!@DASH I'M ON YOUR TRAIL.
`],
'1-3': [`
@set precinct
@mood red
> {GUESS}. Every letter lit up. All five. And it still wasn't the one.
> The right crowd, standing in the wrong places. Like the word's whole gang had swapped coats.
DASH: You're wearing its letters. Where'd you get them?
** All the right people. All the wrong chairs.
`, `
@set office
> First suspect, and I had every piece of the puzzle on my desk.
> Every letter of {GUESS} lit up under the lamp. Just not in the right order.
~sfx ring
WORD: Close isn't caught, Lexington.
~sfx hangup
> It's never the letters that get you. It's the order you put them in.
`],
};
