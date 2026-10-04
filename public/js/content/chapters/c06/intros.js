// Chapter 6 "Short Fuse": opening variants and the briefing. Facts: docs/story/bible.md §6.
// Wendell Pike, the Full Stop, ex-army demolitions, gentle, keeps canaries, has a charge under the Hall of Records timed for 6:00.
// A Full Stop never builds a fuse anybody else can cut: tamper with it and it goes. Only Pike can make it safe, once he's named.

export const INTROS = [
{ id: 'c06.intro.fingers', chapter: 6, title: 'Short Fuse', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION SIX|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: Session six. The Hall of Records.
DASH: The building where this city keeps its memory. Somebody wanted it to forget.
~fade
## {chapterTitle} | {date}
@set precinct!
@mood red
> {time0}. Briggs met me at the top of the stairs with three fingers up and a face like a wet match.
BRIGGS: Three buildings evacuated. Three hours of sleep. Three reasons I'm not in the mood, Lexington.
DASH: Which three buildings?
BRIGGS: The Hall of Records and both its neighbours. There's a charge in the basement, timed for six, and the bomb squad won't go near it.
` },
{ id: 'c06.intro.canary', chapter: 6, title: 'Short Fuse', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION SIX|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: The record mentions a bird, Detective.
DASH: A canary. In a cage, in a basement, next to enough dynamite to move a building. He'd left it water.
~fade
## {chapterTitle} | {date}
@set records!
@mood sick
> {time0}. The Hall of Records, steps empty, every window dark but one. The bomb squad's sergeant came up from the basement white as a sheet.
DOOLEY: There's a canary down there, Dash. Singing. Next to the charge.
DASH: Miners take canaries down to warn them about bad air.
DOOLEY: Then what's this one warning us about?
DASH: That the man who built it loves something. That's always worse.
` },
{ id: 'c06.intro.target', chapter: 6, title: 'Short Fuse', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION SIX|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: The Index had a list of targets.
DASH: The first one was the Hall of Records. "To be corrected by fire." I'd been waiting for it for eleven days.
~fade
## {chapterTitle} | {date}
@set office!
@mood noir
?index_half > The half of the Index we'd taken off the express had a date pencilled beside the target. Tonight. We'd had the building watched for a week.
?!index_half > All I'd had was a porter's page and a target. No date. Tonight the date had found me.
~sfx ring
MAGS: Detective. The city radio band. Every unit is going to the Hall of Records. A device in the basement, timed for six.
DASH: Who built it?
MAGS: A man who signs his work with a period. I'm on my way.
` }
];

// The briefing: who the Full Stop is, why the bomb can't simply be cut, and the deadline.
export const TAIL = { id: 'c06.tail', chapter: 6, s: `
~fade
@set records!
@mood noir
~rain light
DOOLEY: Wendell Pike. Army engineers, the Rhine crossing. Demolitions. Quiet. Raises canaries in a rooming house on Water Street.
DASH: And the Lexicon calls him {alias}.
DOOLEY: The bomb squad says the fuse is booby-trapped six ways. Touch it and it goes. He builds them so only he can stop them.
> A period. The end of a sentence. Everything Pike touched ended there, and nobody got to add a word.
DASH: Then we need him to stop it. And for that, I need his word.
@mood red
%%DASH LEXINGTON | ? ? ? ? ?
## {time1} | The first suspect is on the steps.
` };
