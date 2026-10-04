// Chapter 8 endings. Catch (bible §6): Dash finds Vera before the ferry. Near miss (guess 5–6, bible amendment): Grey is named, but Vera
// has already saved herself; she walks into the precinct at 7 AM, furious he was late (vera_saved_herself, set in the near beat).
// The easter-egg seed for this chapter (bible §9) is Vera's: "You talk in your sleep, Dash. Lists. Five letters at a time."

export const WIN = {
climax: [
{ id: 'c08.win.climax.a', chapter: 8, s: `
@set pressroom!
@mood gold
> {time}. The composing room. Silas Grey sat at Vera's proof desk in a borrowed overcoat, writing with her red pencil.
GREY: Detective. I've almost finished your letter. It's the best thing I've ever written.
DASH: {ANSWER}.
~heart
> The pencil stopped. He looked at the page for a long time, like a man reading his own obituary and finding it accurate.
GREY: Sixth floor. Behind the bound volumes for 1931. I'm sorry. I'm always sorry afterwards. It's the only thing I write that's mine.
%%DASH LEXINGTON | {ANSWER}
?g<5 > I took the stairs three at a time. She was there, in a chair, with her hands tied and her red pencil in her teeth. She spat it out to tell me I was late.
?g>=5 > I took the stairs three at a time. The chair was empty. The rope was cut, neatly, with something sharp. The skylight was open.
~gstamp CASE CLOSED
` },
{ id: 'c08.win.climax.b', chapter: 8, s: `
@set rooftop!
@mood gold
> {time}. The Gazette roof, by the dead sign. Grey was standing at the skylight in a coat that wasn't his, looking down at the sixth floor.
DASH: {ANSWER}.
~heart
GREY: Ah. That's me. That's really me. Nobody's ever said it before.
%%DASH LEXINGTON | {ANSWER}
?g<5 !!@DASH VERA, I'M COMING DOWN.
?g>=5 > Below us, through the dirty glass, the chair was empty. A coil of cut rope. A red pencil, broken in two. She'd gone without me.
~gstamp CASE CLOSED
` },
{ id: 'c08.win.climax.c', chapter: 8, s: `
@set street!
@mood gold
~rain light
> {time}. Front Street, outside the Gazette. He came out of the side door with a bundle of copy paper under his arm, in a coat three sizes too large.
SAL: That's him, Dash. The coat. I'd know a borrowed coat anywhere.
DASH: {ANSWER}.
~heart
GREY: I'd prepared a statement. In your voice. Would you like to read it?
%%DASH LEXINGTON | {ANSWER}
?g<5 > "Sixth floor," he said. "The morgue. She's very angry." She was. She was the angriest I'd ever seen her, and I've never been so glad of anything.
?g>=5 > "Sixth floor," he said. "But I think she's left." She had. Nobody knew how. Nobody ever knows how Vera does anything until she tells them.
~gstamp CASE CLOSED
` }
],
epi: {
1: [
{ id: 'c08.win.epi.1.a', chapter: 8, s: `
@set pressroom!
@mood warm
> One question, and she was out of that chair before one in the morning. She rubbed her wrists and looked at me like a proof she didn't trust.
VERA: You read the mark.
DASH: I read the mark.
VERA: You never read anything I mark.
DASH: I read this one.
VERA: You talk in your sleep, you know. Lists. Five letters at a time. I've always wondered whose names they were.
` },
{ id: 'c08.win.epi.1.b', chapter: 8, s: `
@set apartment!
@mood warm
> I took her home at one in the morning. She made tea and wouldn't let me make it. Her hands shook. She hid it by being very precise with the sugar.
VERA: He was going to send me to Blackwell, Dash. With a letter saying I'd lost my mind.
DASH: You never lost anything in your life.
VERA: I lost you, a while ago. I think I'd like you back.
` }
],
2: [
{ id: 'c08.win.epi.2.a', chapter: 8, s: `
@set pressroom!
@mood warm
> Two questions. She was sitting on a stack of bound 1931 Gazettes with her wrists in her lap when I came through the door.
VERA: You took your time.
DASH: Two questions.
VERA: That's a lot of time when you're tied to a chair with a man reading you your own farewell letter.
> She kissed me. She tasted of red pencil. I'll never forget it.
` },
{ id: 'c08.win.epi.2.b', chapter: 8, s: `
@set precinct!
@mood warm
?!briggs_out BRIGGS: Two. She's downstairs giving a statement. She's correcting the typist.
?briggs_out DOOLEY: Two. She's downstairs giving a statement. She's correcting the typist.
DASH: She would.
> Grey sat in the next room in his borrowed coat, writing his own confession. It was the first thing he'd ever signed.
` }
],
3: [
{ id: 'c08.win.epi.3.a', chapter: 8, s: `
@set pressroom!
> {time}. I found her on the sixth floor among the old bound files, her wrists tied with string meant for bundling papers.
VERA: Behind the 1931 volumes, of all things. He said nobody ever reads those.
DASH: Did you?
VERA: I had all night, Dash. I read them. Some of them twice.
> She didn't say what was in them. I didn't ask. I was too busy untying her.
` },
{ id: 'c08.win.epi.3.b', chapter: 8, s: `
@set street!
@mood warm
> At three in the morning, Vera Lexington walked out of the Gazette's front door on my arm, past forty dockworkers who'd come up from the ferry slip.
EDDIE: Mrs. Lexington.
VERA: Mr. Ruiz. You sat on a boat for me.
EDDIE: Forty of us, ma'am. It was very comfortable.
` }
],
4: [
{ id: 'c08.win.epi.4.a', chapter: 8, s: `
@set pressroom!
@mood blue
> {time}. Four questions. I found her in the dark among the bound volumes with her hands tied and the rope half sawn through on a shelf bracket.
VERA: Another hour and I'd have been out without you.
DASH: I know.
VERA: Then why do you look so relieved?
DASH: Because you didn't have to be.
` },
{ id: 'c08.win.epi.4.b', chapter: 8, s: `
@set ferry!
@mood blue
> The Blackwell Island ferry sailed at six with no passengers. The captain waved to Eddie's men as he pulled out, like a man who'd been beaten fairly.
EDDIE: Detective. Is she all right?
DASH: She's furious, Eddie. She's fine.
` }
],
5: [
{ id: 'c08.win.epi.5.a', chapter: 8, s: `
@set precinct!
@mood red
> At seven in the morning, Vera Lexington walked into the precinct on her own, with rope burns on her wrists and a broken red pencil in her hand.
> She'd cut the rope on the edge of a pica rule from the composing room. She'd come down the fire stairs while I was on the roof with Grey.
VERA: You were late, Dash.
DASH: I know.
VERA: You're always late. I just never needed you on time before.
` },
{ id: 'c08.win.epi.5.b', chapter: 8, s: `
@set apartment!
@mood blue
> She was home before me. She'd walked. She was sitting at the kitchen table with the farewell letter, marking it up in red.
VERA: He spelled "anymore" as one word. And "alright." Twice.
DASH: Vera...
VERA: I saved myself, Dash. I want you to know I could. I want you to know I'll always be able to.
> She didn't say it angrily. She said it like a fact she'd proofread.
` }
],
6: [
{ id: 'c08.win.epi.6.a', chapter: 8, s: `
@set precinct!
@mood red
> {time}. I'd named him on the roof with my last question. The chair downstairs was already empty. Vera had cut herself loose an hour before.
> At seven she walked into the precinct and put her red pencil on the desk sergeant's blotter like a weapon.
VERA: Where is my husband?
DASH: Here.
VERA: You're late.
` },
{ id: 'c08.win.epi.6.b', chapter: 8, s: `
@set street!
@mood blue
> She'd walked from the Gazette to the precinct in December without a coat. The ghostwriter had dressed a mannequin in her good one.
VERA: I'd like my coat back, Dash. And my name. He used them both.
DASH: You'll get them back.
VERA: I know. I'll get them back myself.
` }
]
}
};

export const LOSS = {
climax: [
{ id: 'c08.loss.climax.a', chapter: 8, s: `
@set ferry!
@mood red
~sfx whistle
> 6:00 AM. The Blackwell Island ferry pulled away from the slip, past forty dockworkers the harbor police had finally moved.
> At the rail, a woman in a good coat, with a muff over her hands, didn't wave.
~tight
** His headword was {ANSWER}.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` },
{ id: 'c08.loss.climax.b', chapter: 8, s: `
@set pressroom!
@mood blue
> 6:00 AM. The sixth floor was empty. A chair, a cut rope, a broken red pencil. Out on the river, a ferry horn.
~sfx ring
> The phone on her proof desk rang. I already knew who it would be.
WORD: Next of kin. The nearest relation. To be notified, Lexington, in writing. {ANSWER} has already written to you.
~sfx hangup
~stamp COLD CASE
` },
{ id: 'c08.loss.climax.c', chapter: 8, s: `
@set apartment!
@mood red
> 6:00 AM. I came home. On my pillow, a second letter, in her handwriting. In his.
> "Dash. I've gone. Please don't make a fuss. You never did before."
~tight
** It was {ANSWER}. He wrote her out.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` }
],
epi: {
0: [
{ id: 'c08.loss.epi.0.a', chapter: 8, s: `
@set ferry!
@mood blue
> My last suspect didn't have a letter of him. The ferry was a speck on the river. I stood on the slip until it was nothing at all.
` },
{ id: 'c08.loss.epi.0.b', chapter: 8, s: `
@set bar!
@mood blue
SAL: Five strangers?
DASH: Five strangers, Sal.
SAL: Sit down. Don't say anything. I'll sit with you.
` }
],
1: [
{ id: 'c08.loss.epi.1.a', chapter: 8, s: `
@set apartment!
@mood blue
> {GUESS} had {hitsN} of him. A fragment. Her red pencil was still on the kitchen table, mid-sentence on the proofs she'd never finish.
` },
{ id: 'c08.loss.epi.1.b', chapter: 8, s: `
@set precinct!
DOOLEY: {HitsN}, Dash. At the end.
DASH: {HitsN}.
DOOLEY: The harbor police say Blackwell Island admitted a woman this morning, under another name. On a doctor's signature.
` }
],
2: [
{ id: 'c08.loss.epi.2.a', chapter: 8, s: `
@set pressroom!
@mood blue
> {GUESS}: {hitsN} of him, the last time. Most of a ghost, which is still nothing at all.
> On her proof desk, the farewell letter, with her transpose mark in it. She'd read his copy perfectly. I'd read hers too late.
` },
{ id: 'c08.loss.epi.2.b', chapter: 8, s: `
@set phonebooth!
@mood blue
NORA: Dash? Dash, say something.
DASH: {HitsN}, Nora. I had {hitsN} of him.
NORA: I'm coming over. Don't argue. I'm coming over with Tommy.
` }
],
3: [
{ id: 'c08.loss.epi.3.a', chapter: 8, s: `
@set ferry!
@mood red
> {GUESS}. Every letter of Silas Grey, out of order. He'd written her goodbye in her own voice, and I couldn't even spell his.
` },
{ id: 'c08.loss.epi.3.b', chapter: 8, s: `
@set bar!
SAL: All five, Dash.
DASH: Wrong order.
SAL: Then don't go home tonight. Stay here. I'll make up the cot in the back. I don't want you alone with that letter.
` }
]
}
};
