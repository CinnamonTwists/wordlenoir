// Chapter 7 "Wire Transfer": opening variants and the briefing. Facts: docs/story/bible.md §6.
// Mirabel Quist, the Forger, made perfect deeds to the city's moved records (First Municipal Trust, vault three). At 6:00 the Federal
// Reserve wire window opens, the sale clears, and the records belong to Colophon Holdings, a shell. Briggs is suspended; Dash works it
// off the books from Sal's back room. Reads dooley_hurt (chapter 6's near miss).

export const INTROS = [
{ id: 'c07.intro.suspended', chapter: 7, title: 'Wire Transfer', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION SEVEN|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: Session seven. Captain Briggs had been suspended.
DASH: For the leak, the bomb, and the papers. City Hall likes a list.
RUTH: You haven't asked what this record is for, Detective. In seven sessions.
DASH: I know what records are for, Ruth. Somebody always wants to change them.
~fade
## {chapterTitle} | {date}
@set bar!
@mood noir
> {time0}. Sal's back room. The same table the Bookkeeper used, the same green lamp. My badge was in my desk drawer at the precinct, where the acting captain had asked me to leave it.
SAL: Use the room as long as you like, Dash. It's had worse tenants.
?dooley_hurt DOOLEY: I can't run, Dash. But I can sit in a back room. I'm the best sitter on the force now.
?!dooley_hurt DOOLEY: Stitches are out, Dash. Acting Captain says I'm not to help you. I'm not helping. I'm sitting.
` },
{ id: 'c07.intro.vault', chapter: 7, title: 'Wire Transfer', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION SEVEN|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: A bank vault, Detective.
DASH: Vault three, First Municipal Trust. The whole city, in two hundred crates, behind a door eighteen inches thick.
~fade
## {chapterTitle} | {date}
@set vault!
@mood sick
> {time0}. The night manager let us look for exactly one minute. Two hundred crates, every deed and court file in the city, stacked to the ceiling.
> On a steel table under a green lamp: a stack of new deeds, every one transferring a city building to a company called Colophon Holdings. Perfect paper.
MAGS: The wire window at the Federal Reserve opens at six. The sale goes through, and these become real.
DASH: And the city?
MAGS: Becomes a tenant.
` },
{ id: 'c07.intro.watercolour', chapter: 7, title: 'Wire Transfer', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION SEVEN|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: The vault was leased to an M. Quist.
DASH: Mirabel Quist. She painted banks, Ruth. Watercolours. You could hang them in a lobby, and people did.
~fade
## {chapterTitle} | {date}
@set street!
@mood noir
~rain light
> {time0}. Across from First Municipal Trust, a woman in a smart hat had set up an easel under an awning and was painting the bank in the rain, at midnight.
QUIST: Detective Lexington. You've no badge tonight, I hear. How liberating for you.
DASH: You forged the city, Miss Quist.
QUIST: I copied it, darling. Everything's a copy. I just make better ones.
` }
];

// The briefing: who the Forger is, what clears at six, and why Dash is working without his badge.
export const TAIL = { id: 'c07.tail', chapter: 7, s: `
~fade
@set bar!
@mood noir
~rain window
MAGS: Mirabel Quist. Forger. Brilliant, bored, paints watercolours of banks. And she can't resist signing her work somewhere hidden.
DASH: The Lexicon calls her {alias}.
MAGS: The deeds are perfect. At six the Federal Reserve opens its wire window, Colophon Holdings pays the city a dollar, and the deeds go through.
> And with Briggs suspended, the acting captain was a City Hall man who'd told me to go home. I'd gone to Sal's. It was close enough.
SAL: Coffee's on. Back door's unlocked. Nobody's asked me who's in my back room in twenty years, Dash. Nobody's going to start tonight.
@mood blue
%%DASH LEXINGTON | ? ? ? ? ?
## {time1} | The first suspect is in the back room.
` };
