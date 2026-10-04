// WIN.climax plays first, then a WIN.epi scene keyed by the number of guesses used.

export const WIN = {
climax: [
{ id: 'rnd.win.climax.a', chapter: 0, s: `
@set station!
@mood gold
~sfx whistle
> {time}. Union Station. The 6:00 was taking on steam and the platform was full of people pretending not to see me.
> And there it was. Collar up. Hat low. Five letters, trying to look like four.
DASH: {ANSWER}.
~heart
> It stopped. Every letter of it stopped.
%%DASH LEXINGTON | {ANSWER}
** {ANSWER}. You're under arrest.
~gstamp CASE CLOSED
` },
{ id: 'rnd.win.climax.b', chapter: 0, s: `
@set precinct!
@mood gold
> I didn't shout it. I didn't have to. I just said it, quiet, the way you say a name you've known all along.
DASH: {ANSWER}.
~heart
> Every light in the precinct seemed to come on at once.
%%DASH LEXINGTON | {ANSWER}
!!@DASH GOT YOU.
** {ANSWER}. The word that got away. Not tonight.
~gstamp CASE CLOSED
` }
],
epi: {
1: [
{ id: 'rnd.win.epi.1.a', chapter: 0, s: `
@set precinct!
@mood warm
BRIGGS: First suspect. _First._ You walked in and said its name like you'd known it all your life.
DASH: Maybe I have.
BRIGGS: Internal Affairs is going to want a word, Lexington.
DASH: Tell them I've got one. Five letters.
## LEGEND | Solved on the first suspect. Nobody believes it. Nobody ever will.
` },
{ id: 'rnd.win.epi.1.b', chapter: 0, s: `
@set bar!
@mood warm
SAL: One suspect. One. The fellas in the back are saying you made a deal with the devil.
DASH: The devil doesn't deal in words, Sal. Just in time.
** Some nights the city just hands it to you.
## LEGEND | Solved on the first suspect. Don't expect it twice.
` }
],
2: [
{ id: 'rnd.win.epi.2.a', chapter: 0, s: `
@set bar!
@mood warm
SAL: Two suspects. Two. The fellas in here are calling you a psychic.
DASH: I'm not psychic, Sal. I just pay attention.
SAL: Same thing, in this town.
## BRILLIANT | Solved on the second suspect. The papers will spell your name right, for once.
` },
{ id: 'rnd.win.epi.2.b', chapter: 0, s: `
@set rooftop!
@mood gold
> The rain stopped. The searchlights went out one by one, like the city was taking a bow.
> Two suspects. Some nights you're just better than the dark.
## BRILLIANT | Solved on the second suspect.
` }
],
3: [
{ id: 'rnd.win.epi.3.a', chapter: 0, s: `
@set apartment!
@mood warm
VERA: You're home before sunrise. Who are you and what did you do with my husband?
DASH: Closed the case, Vera. Three suspects. Clean.
VERA: Then take off your shoes and stay a while.
> For once, I did.
## SHARP WORK | Solved on the third suspect. Home before the milkman.
` },
{ id: 'rnd.win.epi.3.b', chapter: 0, s: `
@set precinct!
@mood warm
BRIGGS: Three suspects. That's textbook, Lexington.
DASH: I don't read textbooks, Captain. I write them.
BRIGGS: Go home before I change my mind about liking you.
## SHARP WORK | Solved on the third suspect.
` }
],
4: [
{ id: 'rnd.win.epi.4.a', chapter: 0, s: `
@set precinct!
@mood warm
BRIGGS: Four suspects. Not pretty, but it'll play.
DASH: Pretty doesn't make arrests, Captain.
BRIGGS: Go home, Lexington. That's an order. The first good one I've given all night.
## SOLID | Solved on the fourth suspect. A good night's work.
` },
{ id: 'rnd.win.epi.4.b', chapter: 0, s: `
@set street!
@mood blue
~rain light
DOOLEY: Four, Dash. Hairy for a minute there.
DASH: Hair grows back, Dooley.
DOOLEY: Not on you, it won't.
## SOLID | Solved on the fourth suspect.
` }
],
5: [
{ id: 'rnd.win.epi.5.a', chapter: 0, s: `
@set street!
@mood blue
~rain off
> The rain stopped. First time in three days.
?suspended BRIGGS: Here. Your badge. Don't make me regret it.
?suspended DASH: You always regret it, Captain.
?!suspended DOOLEY: Five suspects, Dash. That was too close.
?!suspended DASH: Close is still caught, Dooley.
## CLOSE CALL | Solved on the fifth suspect. Your hands didn't stop shaking until noon.
` },
{ id: 'rnd.win.epi.5.b', chapter: 0, s: `
@set bar!
@mood warm
SAL: Five. My heart can't take you, Lexington.
DASH: Your heart's fine. It's your coffee that's killing people.
?evicted SAL: There's a cot in the back. Until you find a new place.
## CLOSE CALL | Solved on the fifth suspect.
` }
],
6: [
{ id: 'rnd.win.epi.6.a', chapter: 0, s: `
@set station!
@mood gold
~sfx whistle
> The doors were closing. The conductor's hand was on the lever. I said the name with my last breath of night air.
** By a thread.
?vera_gone VERA: I heard it on the radio. I came back for my good scarf.
?vera_gone DASH: Your scarf's on the hook, Vera. Where it always is.
?vera_gone > She didn't take the scarf. She took my arm instead.
?!vera_gone > Dawn came up over the bay like it was apologizing for the night.
## BY A THREAD | Solved on the last suspect, as the doors were closing.
` },
{ id: 'rnd.win.epi.6.b', chapter: 0, s: `
@set street!
@mood gold
~rain off
?suspended BRIGGS: Six suspects and a suspension, Lexington. And you still got it.
?suspended BRIGGS: Badge. Take it before I come to my senses.
?!suspended BRIGGS: Six. You took it to the wire, Lexington.
?!suspended DASH: The wire's where I live, Captain.
> The sun came up. I'd never been so glad to see it.
## BY A THREAD | Solved on the last suspect.
` }
]
}
};
