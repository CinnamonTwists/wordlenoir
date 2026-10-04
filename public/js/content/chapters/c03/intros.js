// Chapter 3 "Dead Man's Sentence": opening variants (one per attempt, avoiding ones a failed attempt used) and the briefing.
// Facts: docs/story/bible.md §6. Gus Fairweather, the Notary, forged Eddie Ruiz's confession to the Mercer killing.
// Eddie goes to the chair at 6:00; the governor stays it only if the real forger is in custody.

export const INTROS = [
{ id: 'c03.intro.wrongside', chapter: 3, title: 'Dead Man\'s Sentence', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION THREE|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: Session three. A confession, Detective.
DASH: A confession and a dead man. The trouble was, they didn't agree with each other.
~fade
## {chapterTitle} | {date}
@set morgue!
@mood sick
> {time0}. Doc Fenn had Harold Mercer on the slab and Eddie Ruiz's confession clipped to the sheet like a toe tag.
FENN: The dead man didn't die the way the confession says. Confessions don't usually get the knife on the wrong side.
DASH: Ruiz says he did it face to face. Right hand.
FENN: Somebody stood behind Mr. Mercer and used their left. Your dockworker signed a story about a different murder.
> Eddie Ruiz goes to the chair at six. His confession had a notary's seal on it, pressed so hard it went through to the desk.
` },
{ id: 'c03.intro.deathhouse', chapter: 3, title: 'Dead Man\'s Sentence', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION THREE|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: You went to the penitentiary that night?
DASH: I went to see a man who had six hours left and wanted to spend them on the crossword.
~fade
## {chapterTitle} | {date}
@set penitentiary!
@mood blue
> {time0}. The warden walked me to the death house himself, which is what wardens do when they want you to know they disapprove.
EDDIE: Detective. You know a six-letter word for "unfair"?
DASH: I know a five-letter one. I'm here to find it.
EDDIE: I never signed nothing. I can barely write. They showed me a paper with my name on it and a big gold seal.
> A notary's seal. If it's stamped, people believe it. Somebody had stamped Eddie Ruiz all the way to the chair.
` },
{ id: 'c03.intro.seal', chapter: 3, title: 'Dead Man\'s Sentence', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION THREE|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: You had a ledger, Detective, and a name in it.
DASH: Eddie Ruiz. Unloads bananas on Pier Nine. A confession, paid for in full.
RUTH: You never pause before the names. Most witnesses do.
DASH: Most witnesses haven't said them as often as I have.
~fade
## {chapterTitle} | {date}
@set precinct!
@mood noir
BRIGGS: The prosecutor's office says the Ruiz confession is clean. Signed, sealed and notarized.
DASH: The ledger says somebody paid for it.
BRIGGS: The ledger is a bar tab with ambitions, Lexington. A notary's seal is the law.
> The seal read A. FAIRWEATHER, NOTARY PUBLIC. His office was dark. His coat was gone. Eddie Ruiz had until six.
` }
];

// The briefing: who the Notary is, why only his arrest stops the chair, and the deadline.
export const TAIL = { id: 'c03.tail', chapter: 3, s: `
~fade
@set office!
@mood noir
~rain window
DOOLEY: Augustin Fairweather. Gus. Notary public, commissioner of deeds. The sign on his door says Fairweather and Fairweather.
DASH: Who's the other Fairweather?
DOOLEY: Also him. He says two of them looks more established.
> A courtly little man who cries at weddings. Half the weddings he cried at, he'd forged the licence for.
DASH: The Lexicon calls him {alias}. They'll have given him a word by now.
DOOLEY: The governor's office says they'll stay the execution if the forger's in custody. Not before. Not after six.
@mood blue
%%DASH LEXINGTON | ? ? ? ? ?
## {time1} | The first suspect is sworn in.
` };
