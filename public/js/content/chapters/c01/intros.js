// Chapter 1 "Stop the Presses": opening variants (one per attempt, avoiding ones a failed attempt used) and the briefing.
// Facts: docs/story/bible.md §6. Vars: {caseNo} {date} {time0}..{time6} {chapterNo} {chapterTitle} {culprit} {alias} {crime} {deadline}

export const INTROS = [
{ id: 'c01.intro.typo', chapter: 1, title: 'Stop the Presses', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION ONE|In re: the Lexicon affair. Witness: Det. D. Lexington.
RUTH: Whenever you're ready, Detective.
DASH: It was raining. It's always raining when somebody lies to me.
~fade
## {chapterTitle} | {date}
@set office!
@mood noir
~rain window
> {time0}. I was alone with a cold coffee and a warm grudge when the phone rang.
~sfx ring
VERA: Dash. It's me. I'm at the proof desk.
DASH: We haven't said ten words this week, and you call me at midnight.
VERA: There's a typo on page one that isn't a typo. And the night editor is dead under Press Number Two.
> My wife reads every word that goes into the Gazette. She'd found the one that got a man killed.
` },
{ id: 'c01.intro.client', chapter: 1, title: 'Stop the Presses', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION ONE|In re: the Lexicon affair. Witness: Det. D. Lexington.
RUTH: State your business for the record, Detective.
DASH: My business was words. Somebody else's business was killing for them.
~fade
## {chapterTitle} | {date}
@set office!
@mood warm
LOLA: I need a man who can find things, Mr. Lexington. Not tonight. Next week.
DASH: Next week I'm wide open. Tonight I'm a detective.
> She left a calling card and a smell of gardenias. The phone rang before either had settled.
~sfx ring
VERA: Dash, it's Vera. Ned Goss is dead in the press room, and somebody changed one letter on the front page.
@set pressroom!
@mood sick
FENN: Struck with a composing stick. Whoever did it set type for a living.
DASH: {alias}. That's what they'd call him, anyway.
` }
];

// The briefing: chapter 1 teaches the rules (legend), the Lexicon's headwords, and the deadline.
export const TAIL = { id: 'c01.tail', chapter: 1, s: `
~fade
@set pressroom!
@mood warm
~rain window
VERA: Linus Pell. Typesetter. Fourteen years at the Gazette, never late, never a mistake. Until tonight.
> Pell was gone. In his locker, a red pencil and a card with five empty boxes.
VERA: It's how they name him, Dash. One word, five letters. Say it to his face and he's finished.
DASH: Then I'll bring in words until one of them sweats.
~legend
> The ones with alibis walk out gray. The ones in his gang but standing in the wrong place go yellow.
> And the ones in the right place at the right time go green. Five greens and I've got his name.
@mood blue
VERA: The presses roll at six. If that headline runs, a witness dies before breakfast.
%%DASH LEXINGTON | ? ? ? ? ?
## {time1} | The first suspect is already on the floor.
` };
