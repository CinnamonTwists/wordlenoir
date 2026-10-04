// Chapter 9 "The Count": opening variants and the briefing. Facts: docs/story/bible.md §6.
// Lola Vance, the Understudy, swapped ballot boxes in the election warehouse and shot a poll watcher (Harvey Bloom) who recognised her.
// The count certifies at 6:00; if the swapped boxes are counted, a Lexicon slate takes City Hall. Reads briggs_out (Briggs comes back
// tonight, bible: "back if briggs_out"), vera_saved_herself, dooley_hurt.

export const INTROS = [
{ id: 'c09.intro.again', chapter: 9, title: 'The Count', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION NINE|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: Session nine. The election.
DASH: The count, Ruth. Elections are for voters. Counts are for whoever's holding the pencil.
~fade
## {chapterTitle} | {date}
@set office!
@mood warm
~rain window
> {time0}. She was sitting in my client chair when I came in. The same chair, the same gardenias, the same gloves as the first night of all this.
LOLA: I need your help, detective. Again.
DASH: You said "next week," back in October.
LOLA: I'm a little late. Actresses always are.
> She was lying. She'd been lying since October. Tonight, for the first time, I was sure of it.
` },
{ id: 'c09.intro.watcher', chapter: 9, title: 'The Count', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION NINE|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: A poll watcher was killed that night.
DASH: Harvey Bloom. A retired schoolteacher. He'd watched every count in the Fourth Ward for thirty years, and he recognised a face.
~fade
## {chapterTitle} | {date}
@set warehouse!
@mood sick
> {time0}. The election warehouse on Canal Street. Ballot boxes stacked to the rafters, sealed and stamped, and an old man on the floor between them with a hole in his cardigan.
FENN: Shot once, close, by somebody he trusted enough to let near.
DASH: Who'd he trust?
FENN: Everybody, Lexington. He was a poll watcher. Trusting nobody was his whole job, and he was terrible at it.
` },
{ id: 'c09.intro.galley', chapter: 9, title: 'The Count', s: `
@set hearing!
@mood blue
~rain off
~paper GRAND JURY · SESSION NINE|In re: the Lexicon affair. Witness: Det. D. Lexington, continuing.
RUTH: Your wife had found the plan in the Gazette's proofs.
DASH: The count, already printed, before it was counted. And a name in the margin: the Understudy.
~fade
## {chapterTitle} | {date}
@set apartment!
@mood noir
?vera_saved_herself VERA: I'm coming to the warehouse, Dash. Don't argue. I got myself out of a sixth floor last night. I can get myself into a count.
?!vera_saved_herself VERA: I'm coming to the warehouse, Dash. You got me out of a sixth floor last night. Let me get you into a count.
> She spread the galley on the kitchen table. Every precinct's numbers, typeset two days before a single ballot was opened.
VERA: Somebody inside the count is going to make these numbers come true. A volunteer. The galley calls her the Understudy.
DASH: I know an understudy. She's been waiting in the wings since October.
` }
];

// The briefing: who the Understudy is, what certifies at six, and (if he was out) Briggs's return.
export const TAIL = { id: 'c09.tail', chapter: 9, s: `
~fade
@set warehouse!
@mood noir
~rain window
?briggs_out > At midnight, City Hall reinstated Captain Briggs. The election board needed a captain at the warehouse who wasn't City Hall's, and nobody could find one but him.
?briggs_out BRIGGS: Lexington. I'm back. Don't make a fuss. I've got a warehouse to watch.
?!briggs_out BRIGGS: Lexington. Every ballot box in the city is in this building, and one of them is lying.
DASH: Lola Vance. The Lexicon calls her {alias}.
BRIGGS: She's been a client, a widow, a hat-check girl, and tonight she's a count volunteer with a clipboard. She swapped the Fourth Ward boxes, and Harvey Bloom saw her do it.
> At six the board certifies the count. Whatever's in those boxes becomes the city's government for four years.
DASH: Then I'll make her take a curtain call.
@mood red
%%DASH LEXINGTON | ? ? ? ? ?
## {time1} | The first suspect takes the stage.
` };
