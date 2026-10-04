// Chapter 10 beats. Bible §6: no outro, and no interlude (chapter 10 hands straight to the ending). The won beats are the moment both
// branches share: Union Station, 5:58, the Professor on the platform, there to meet the Editor himself, having finally worked it out.
// What happens next is the ending's (content/endings). The escaped beats are the retelling, as in every chapter.

export const BEATS = {
fast: [
{ id: 'c10.beat.fast.a', chapter: 10, s: `
@set station!
@mood blue
~sfx whistle
> 5:58. Platform Nine. The express was taking on steam. Dooley stood beside the Professor with a warrant he hadn't served.
PROF: I'm not running, Sergeant. I'm meeting someone. The man who bought my manuscript in 1946. Every page. For cash.
DASH: Who, Professor?
PROF: He paid at a bar, Detective. Across the bar. He didn't count the money. He just poured.
> The Professor looked at me over his spectacles, kindly, the way he looks at a student who already knows the answer.
PROF: I think you know which bar. I think you've always known.
` },
{ id: 'c10.beat.fast.b', chapter: 10, s: `
@set station!
@mood blue
> 5:58. Under the big clock, the Professor was standing at the end of Platform Nine with his dictionary under his arm. Dooley had a hand on his elbow, gently.
DOOLEY: He says he came to meet somebody, Dash.
PROF: The Editor, Detective. The man who bought my dictionary and made it into the Index. I worked it out last night, from a bar tab I found in the manuscript box.
DASH: A bar tab.
PROF: Paid in full. Every one of them, every week, for two years. You'll know the bar.
> The express whistled. Two minutes. I already knew the bar.
` }
],
slow: [
{ id: 'c10.beat.slow.a', chapter: 10, s: `
@set station!
@mood blue
~sfx whistle
> 5:58. The big clock. Platform Nine. Steam and porters and the Professor at the very end, in his good overcoat, waiting.
PROF: Your sergeant has been very patient, Detective. I'll go quietly, if it's still necessary. But I'm waiting for someone first.
DASH: Who?
PROF: The man who bought my life's work and taught the city to speak it in his voice. He was supposed to be on this train.
> He looked at me, and his face was full of something I didn't want to name. Pity.
PROF: I think he's changed his mind, Detective. I think he's waiting somewhere else. Somewhere you'd know.
` },
{ id: 'c10.beat.slow.b', chapter: 10, s: `
@set station!
@mood blue
> 5:58. Platform Nine. Dooley had the Professor by the sleeve, not tightly. The old man didn't seem to mind.
PROF: The orders in my handwriting. A ghostwriter, Detective. He learned my hand from my own manuscript. The man who owned the manuscript asked him to.
DASH: And who owned the manuscript?
PROF: Somebody who's been pouring your drinks for a very long time.
> He said it gently. I heard the whistle. I heard my own heart. I didn't hear anything else for a while.
` }
],
near: [
{ id: 'c10.beat.near.a', chapter: 10, s: `
@set station!
@mood red
~sfx whistle
> 5:58. I came onto Platform Nine at a run, with six thousand copies of the Final Edition already on the streets behind me.
> Dooley had the Professor by the arm at the far end. The old man held up a copy of the Final Edition. Page one, under the masthead: a tiny "stet," in a hand I'd seen on a thousand bar tabs.
PROF: He signs his work too, Detective. They all do. He's just been signing it where you'd never look.
DASH: Where?
PROF: On your tab.
` },
{ id: 'c10.beat.near.b', chapter: 10, s: `
@set station!
@mood sick
> 5:58. The express was steaming. The Final Edition was in six thousand kitchens. The Professor stood on the platform with his ticket in his hand, and he wasn't getting on.
PROF: I bought a ticket so they'd let me onto the platform, Detective. I came to see the Editor board. I wanted to look at him once.
DASH: Did he come?
PROF: Not yet. He may not. I think, in the end, he wants to be found by someone in particular.
> The old man looked at me. I looked at the clock. Two minutes.
` }
],
escaped: [
{ id: 'c10.beat.escaped.a', chapter: 10, s: `
@set hearing!
@mood blue
~rain off
> I told it to the end: the trucks, the Final Edition on every doorstep, a man in a lit window who didn't look back.
> Ruth's hands came off the keys, and stayed in her lap. It was the last session. She let the silence go on a long time.
RUTH: Detective. The Final Edition was never distributed. I have the pulping order in front of me.
DASH: Strike that. That's not how it went.
~paper SESSION TEN · RESUMED|The witness will begin again.
` },
{ id: 'c10.beat.escaped.b', chapter: 10, s: `
@set hearing!
@mood violet
~rain off
RUTH: So the Final Edition ran, and the Proofreader walked away, and the Editor took his train.
DASH: That's what I said.
RUTH: Then why are you still here, Detective? Why is any of us?
DASH: Strike that. That's not how it went. Let me tell it once more. The last time. Properly.
> Ruth threaded a fresh sheet, the last in the box. She smoothed it flat and waited, the way she'd waited for ten sessions.
~paper SESSION TEN · FROM THE TOP|Final Edition. Again.
` }
]
};
