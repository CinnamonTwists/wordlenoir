// Chapter 8 outro beats and the interlude. Bible §4, §6, §7.1.
// The near beat sets vera_saved_herself. Every won beat sets up chapter 9's hook (the ballot plan: the count certifies at 6:00 tomorrow
// morning, and the Lexicon has a woman inside it) and carries the chapter's Sal clue: Dash calls Sal first, and Sal is already on his way.

export const BEATS = {
fast: [
{ id: 'c08.beat.fast.a', chapter: 8, s: `
@set apartment!
@mood warm
> I called Sal first. Before Nora, before Briggs. The phone rang once and his night man answered: Sal had left twenty minutes ago. Said he was going to the Gazette.
> Nobody had told him. I hadn't told him. He was there in ten minutes with a thermos of coffee and a blanket for Vera.
VERA: Dash. The election supplement. They've printed tomorrow's count before it's counted. And there's a woman inside the count, a volunteer, who's going to make the numbers match.
DASH: When does it certify?
VERA: Six o'clock. Tomorrow morning.
@set hearing!
@mood blue
~rain off
RUTH: Mr. Bruno arrived before you'd called him.
DASH: Sal always arrived before anybody called him. I thought it was friendship. It was. That was the worst part.
~paper SESSION EIGHT · ADJOURNED|Witness to resume. Next: "The Count."
` },
{ id: 'c08.beat.fast.b', chapter: 8, s: `
@set pressroom!
@mood gold
> I phoned the Last Word from the composing room to tell Sal she was safe. Nobody answered. Sal was already coming up the stairs.
SAL: Is she all right?
DASH: How'd you know to come?
SAL: I just knew, Dash. I always know with you.
> Vera sat on a stack of bound files and read us the galley she'd been held for. The election count, precinct by precinct, already printed. Certified at six tomorrow. By a woman on the inside.
@set hearing!
@mood blue
~rain off
RUTH: He always knew, Detective?
DASH: He always knew. I used to think that was what a best friend was.
` }
],
slow: [
{ id: 'c08.beat.slow.a', chapter: 8, s: `
@set precinct!
@mood noir
> Vera gave her statement at four, and corrected the typist twice. Then she gave me the galley.
VERA: The ballot plan, Dash. The count certifies at six tomorrow morning. And there's somebody inside it, a woman. A volunteer. The galleys call her "the Understudy."
> I went to the hall phone to call Sal. Before it rang, the desk sergeant waved at the door. Sal was already there, with his coat buttoned wrong, out of breath.
@set hearing!
@mood blue
~rain off
RUTH: Who had told him, Detective?
DASH: Nobody, Ruth. I asked everyone. Nobody had told him.
` },
{ id: 'c08.beat.slow.b', chapter: 8, s: `
@set street!
> We walked out of the Gazette at dawn, Vera on my arm and the galley in her other hand. Sal's car was at the curb with the engine running.
SAL: Get in. Both of you. I'll take you home.
DASH: How long have you been here?
SAL: Long enough. Get in, Dash.
VERA: The count certifies at six tomorrow, Dash. There's a woman inside it. We've got a day.
@set hearing!
@mood blue
~rain off
RUTH: You took the ride.
DASH: I always took the ride, Ruth. That was the arrangement. I just didn't know it was one.
` }
],
near: [
{ id: 'c08.beat.near.a', chapter: 8, s: `
~story vera_saved_herself
@set precinct!
@mood blue
> She'd saved herself. She'd walked in at seven, and she wasn't going to let me forget it, and she was right not to.
VERA: The galley I was held for. The election count, already printed. It certifies at six tomorrow. There's a woman inside the count.
> I went to call Sal. The desk sergeant pointed at the door. Sal was already in the lobby with a blanket over his arm, waiting for her.
@set hearing!
@mood blue
~rain off
RUTH: Your wife rescued herself, Detective. For the record.
DASH: Put it in capital letters, Ruth. She'd want it in capitals.
` },
{ id: 'c08.beat.near.b', chapter: 8, s: `
~story vera_saved_herself
@set apartment!
@mood sick
> Vera sat at the kitchen table in her stocking feet, marking up Grey's letter in red. Sal was making eggs. I hadn't called him yet. I'd been about to.
SAL: She walked here from the precinct, Dash. I saw her on Clement Street and drove her the last block.
VERA: The count certifies at six tomorrow. There's a woman inside it. It's in the galley. I'll be at the warehouse at midnight, Dash, with or without you.
DASH: With.
VERA: We'll see.
@set hearing!
@mood blue
~rain off
RUTH: And Mr. Bruno happened to be on Clement Street.
DASH: Sal happened to be everywhere that year. I never once asked how.
` }
],
escaped: [
{ id: 'c08.beat.escaped.a', chapter: 8, s: `
@set hearing!
@mood blue
~rain off
> I told it to the end: the ferry, the woman at the rail who didn't wave. I didn't say "my wife." I couldn't.
> Ruth stopped typing. She looked at me over her glasses, and then past me, at the gallery.
RUTH: Detective. Mrs. Lexington is in the third row.
DASH: Strike that. That's not how it went.
~paper SESSION EIGHT · RESUMED|The witness will begin again.
` },
{ id: 'c08.beat.escaped.b', chapter: 8, s: `
@set hearing!
@mood violet
~rain off
RUTH: So she was taken to Blackwell Island.
DASH: That's what I said.
RUTH: She proofread the transcript of your first session, Detective. She sent me eleven corrections. She was right about nine.
DASH: Strike that. That's not how it went. And he'd have been writing under another name by then. Ghosts always are.
> Ruth fed a clean sheet into the machine, very gently, as if it might bruise.
~paper SESSION EIGHT · FROM THE TOP|Next of Kin. Again.
` }
]
};

// "Last Rites" (bible §7.1, Pop's thread). Pop is dying. Kept: Dash is at the bedside and Pop confesses: he put the warehouse on Sal
// to save his own son. Late: Pop gets halfway, then a nurse comes. Missed: Pop dies before Dash arrives and leaves a sealed letter,
// which Dash doesn't open yet. (The endings read which of these happened.)
export const INTERLUDE = {
kept: [
{ id: 'c08.inter.kept', chapter: 8, s: `
~fade
@set hearing!
@mood blue
~rain off
RUTH: That's not in the record, Detective.
DASH: It is now. It should have been in it for eighteen years.
~fade
## LAST RITES | The next afternoon
@set hospital!
@mood warm
~rain off
> St. Jude's again. The same ward. Pop was smaller than the bed now. Nora had gone for coffee and left us alone on purpose.
POP: Sit down, son. Close the door. I'm going to say it now, while I've got the breath.
POP: The warehouse. 1931. It wasn't Sal's lantern. It was yours. You knocked it over running. I picked you up out of that smoke, and I put it on the Bruno boy.
POP: Three years he did. He never said your name. Not once. Not to me, not to the judge. I've been ashamed every day since.
> I sat there with my hat in my hands. I'd told myself for eighteen years I didn't remember. I remembered.
DASH: Pop.
POP: Tell him, son. Tell Sal I said so. Somebody in this family should say it to his face.
` }
],
late: [
{ id: 'c08.inter.late', chapter: 8, s: `
~fade
## LAST RITES | The next evening
@set hospital!
@mood noir
~rain window
> I got to St. Jude's at seven. Pop was awake, just. He grabbed my wrist harder than a dying man should be able to.
POP: The warehouse. I need to tell you. It wasn't the Bruno boy who...
> A nurse came in with a tray and a needle and a cheerful voice, and talked to him like a child. By the time she left, his eyes were half shut.
POP: It wasn't... It was...
> He slept. Nora and I sat with him until midnight. He didn't finish. I sat there knowing exactly how the sentence ended, and not letting myself say it.
` }
],
missed: [
{ id: 'c08.inter.missed', chapter: 8, s: `
~fade
## LAST RITES | Two days later
@set hospital!
@mood blue
~rain window
> I got to St. Jude's at noon. The bed was made. Nora was sitting on it in her coat with an envelope in her lap.
NORA: He went at four this morning, Dash. He asked for you. Then he asked for paper.
> The envelope said DASH in his patrolman's block capitals. It was sealed. It was heavy, for one sheet.
NORA: Aren't you going to open it?
DASH: Not yet.
> I put it in my inside pocket. It sat over my heart for two weeks, and I carried it the way you'd carry a summons.
` }
]
};
