// Chapter 8 "Next of Kin": opening variants and the briefing. Facts: docs/story/bible.md §6.
// Silas Grey, the Ghostwriter, kidnapped Vera, who found the Lexicon's ballot plan in the Gazette's proofs. The 6:00 ferry to Blackwell
// Island will carry her, with a farewell letter in her handwriting that Grey wrote. Every opening starts with Dash unable to begin.
// Reads briggs_out (Briggs still suspended), dooley_hurt, penny_free.

export const INTROS = [
{ id: 'c08.intro.mywife', chapter: 8, title: 'Next of Kin', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION EIGHT|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
> Ruth threaded the paper and waited. I opened my mouth and nothing came out. The radiator knocked. She kept waiting.
RUTH: Whenever you're ready, Detective.
DASH: Session eight. My wife.
~fade
## {chapterTitle} | {date}
@set apartment!
@mood blue
~rain window
> {time0}. I came home and the apartment was dark. Her coat was gone. On my pillow, an envelope, in her handwriting.
> "Dash. I can't do this anymore. I've gone where you won't follow. Don't look for me. V."
> It was her handwriting. Every loop of it. And Vera would never, in her life, have written "anymore" as one word.
` },
{ id: 'c08.intro.letter', chapter: 8, title: 'Next of Kin', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION EIGHT|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
> I sat down in the witness chair and looked at the window for a long time. Ruth didn't type anything. She just waited.
DASH: Session eight. My wife.
~fade
## {chapterTitle} | {date}
@set precinct!
@mood red
?!briggs_out BRIGGS: Lexington. Sit down. A letter came in by the night post, addressed to you, care of the precinct.
?briggs_out DOOLEY: Dash. Sit down. A letter came in by the night post, addressed to you, care of the precinct.
> In Vera's hand. A farewell. She was leaving me, it said, on the morning ferry, and I was not to follow.
> Pinned to it, the ticket I'd seen in the Forger's handbag. Blackwell Island, six AM. One passenger.
` },
{ id: 'c08.intro.switchboard', chapter: 8, title: 'Next of Kin', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION EIGHT|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: Detective?
> I had my hands flat on the rail. Ruth waited. She'd waited for a lot of witnesses. She waited for me the longest.
DASH: Session eight. My wife.
~fade
## {chapterTitle} | {date}
@set phonebooth!
@mood blue
~sfx ring
NORA: Dash, it's Nora, at the exchange. A call just came through for you, from the Gazette, and the line went dead.
DASH: Who was it?
NORA: It was Vera, Dash. She said one word. "Proof." Then a man's voice said "wrong number," very softly, and hung up.
` }
];

// The briefing: who the Ghostwriter is, what Vera found, and the deadline.
export const TAIL = { id: 'c08.tail', chapter: 8, s: `
~fade
@set office!
@mood noir
~rain window
MAGS: Silas Grey. He writes other people's letters, speeches, resignations. And suicide notes. He's been paid for all of them.
DASH: And the Lexicon calls him {alias}.
MAGS: He makes people disappear on paper first. A farewell letter. A ticket. By the time anybody looks, the person's already gone in writing.
> Vera had found something in the Gazette's proofs: the Lexicon's plan for the election count. So they'd written her out.
DASH: The ferry to Blackwell Island leaves at six. She'll be on it.
MAGS: Then you've got till six to find her. And a ghost to name.
@mood red
%%DASH LEXINGTON | ? ? ? ? ?
## {time1} | The first suspect. Her coat is gone.
` };
