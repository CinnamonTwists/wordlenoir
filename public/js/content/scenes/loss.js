// LOSS_CLIMAX plays first, then a LOSS_EPI keyed by the last guess's bucket (0-3).

export const LOSS_CLIMAX = [`
@set station!
@mood blue
~rain heavy
~sfx whistle
> 6:00 AM. Union Station. I ran the length of the platform as the train pulled out.
> In the last window of the last car, a shape tipped its hat at me. Five letters. Collar up.
@mood red
~tight
** It was {ANSWER}.
%%DASH LEXINGTON | {ANSWER}
> The word was gone, carrying its meaning to some other city that would never know what it was worth.
~stamp COLD CASE
~loose
`, `
@set station!
@mood blue
~rain heavy
> 6:00 AM. The train left on time. Trains always leave on time when you need them to be late.
~sfx whistle
~sfx ring
> The payphone on the platform rang. I knew who it was before I picked up.
WORD: Goodbye, detective.
DASH: Tell me your name.
WORD: You know it now. You'll know it for the rest of your life.
~sfx hangup
@mood red
~tight
** {ANSWER}.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
`];

export const LOSS_EPI = {
0: [`
@set street!
@mood noir
?suspended > No badge. No case. Just a long walk home in the rain.
?!suspended BRIGGS: Badge, Lexington. For real this time.
?!suspended ~stamp SUSPENDED
?vera_gone > The apartment was dark. I left the light off. It seemed fair.
?!vera_gone > Vera didn't ask how it went. She didn't have to.
** The city forgets its detectives faster than its crimes.
## THE TRAIL WENT COLD | Six suspects, and none of them close. {ANSWER} is still out there.
`, `
@set void!
@mood noir
> I stood in the middle of the empty platform until the sweepers came.
> Six suspects. Not one of them knew the word. Maybe I never did either.
** Some words don't want to be found.
## THE TRAIL WENT COLD | {ANSWER} rode the 6:00 out of town.
`],
1: [`
@set bar!
@mood blue
SAL: You were close, Lexington.
DASH: I was nowhere, Sal. Close is a place they put you when they feel sorry for you.
> They moved me to a desk in Records. Filing other men's solved cases.
** I had pieces. Never the whole.
## COLD CASE | {ANSWER} got away. They say Lexington still checks the train schedules.
`, `
@set office!
@mood blue
> I pinned the scraps to the wall. A letter here. A letter there. Like a face drawn by a witness who only saw the hat.
** Pieces of a stranger.
## COLD CASE | {ANSWER} got away.
`],
2: [`
@set rooftop!
@mood blue
> I knew its shape. I'd had half its letters in my hand.
> That's the thing about almost. It weighs exactly as much as nothing.
** One more hour. That's all I needed.
## SO CLOSE | {ANSWER} slipped through. Lexington can still spell every letter but the last one.
`, `
@set bar!
@mood blue
SAL: Close, huh?
DASH: Close enough to smell its cologne, Sal. Not close enough to put the cuffs on.
** Almost is just a fancy word for lost.
## SO CLOSE | {ANSWER} walked.
`],
3: [`
@set office!
@mood red
> I had every letter. Every single one. They were sitting right there on my desk.
> I just couldn't make them stand in line.
** The right letters in the wrong order is still the wrong answer.
## THE ONE THAT GOT AWAY | Every letter of {ANSWER} was in his hand. In the wrong order.
`]
};
