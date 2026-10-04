// Chapter 3 endings. Catch (bible §6): the governor's call, and Eddie walks out at sunrise. Near miss (guess 5–6, bible amendment):
// Fairweather hears his headword and still gets out a door (story flag notary_free, set in the near beat), but Fenn's evidence alone
// wins Eddie a stay at 5:58. Eddie lives in every won branch.

export const WIN = {
climax: [
{ id: 'c03.win.climax.a', chapter: 3, s: `
@set docks!
@mood gold
> {time}. The ferry stairs at the foot of Pier Nine. A little man in a big coat sat on the bottom step with a seal in his lap like a kitten.
DASH: Mr. Fairweather.
GUS: Detective. I knew it would be you. I hoped it would be someone kind.
DASH: {ANSWER}.
~heart
GUS: Oh. Oh, dear. That's me, isn't it.
%%DASH LEXINGTON | {ANSWER}
?g<5 > He held out his wrists for the cuffs and started to cry. He cried all the way to the car, and he signed the statement in a beautiful hand.
?g>=5 > He dropped the seal in the river, ran up the stairs faster than a weeping man has any right to, and was gone into the fog.
~gstamp CASE CLOSED
` },
{ id: 'c03.win.climax.b', chapter: 3, s: `
@set office!
@mood gold
> {time}. Fairweather and Fairweather. He'd come back for the wedding photographs. He was taking them down one by one and wrapping them in newspaper.
DASH: {ANSWER}.
~heart
> The frame in his hands slipped and broke. A bride and groom smiled up from the glass.
GUS: I notarized their licence, you know. They're very happy. That part was real.
%%DASH LEXINGTON | {ANSWER}
?g<5 !!@DASH YOU'RE STRUCK, GUS.
?g>=5 > He pulled the door shut behind him and turned the key from the outside. By the time Dooley kicked it open, the hall was empty.
~gstamp CASE CLOSED
` },
{ id: 'c03.win.climax.c', chapter: 3, s: `
@set street!
@mood gold
~rain heavy
> {time}. A chapel on the corner of Court and Ninth, lights on, doors open. He was in the back pew with his hat on his knees.
DASH: {ANSWER}.
~heart
GUS: In church, Detective? That's not fair.
DASH: Neither was Eddie's confession.
%%DASH LEXINGTON | {ANSWER}
?g<5 > He nodded, crossed himself, and came quietly. At the door he dipped his fingers in the font, and wept.
?g>=5 > He bowed, very politely, and went out through the vestry while the priest stood in my way asking if I'd come for confession.
~gstamp CASE CLOSED
` }
],
epi: {
1: [
{ id: 'c03.win.epi.1.a', chapter: 3, s: `
@set penitentiary!
@mood warm
WARDEN: The governor's office called, Lexington. A stay. Indefinite. On account of a forger in custody before one in the morning.
DASH: Tell Eddie.
WARDEN: You tell him. I've never been the one to bring good news up here. I wouldn't know how to stand.
> I told him. He finished the crossword first. Then he cried, which is apparently catching tonight.
` },
{ id: 'c03.win.epi.1.b', chapter: 3, s: `
@set precinct!
@mood warm
BRIGGS: One suspect. Fairweather's in the cage, the governor's signing, and Eddie Ruiz is eating his steak.
DASH: I told him to wait for breakfast.
BRIGGS: He said he'd have both. He's got time now, Lexington. Years of it.
` }
],
2: [
{ id: 'c03.win.epi.2.a', chapter: 3, s: `
@set penitentiary!
@mood warm
> By two o'clock the governor's stay came over the wire. Rosa Ruiz was in the warden's office, holding a cup of coffee she'd forgotten how to drink.
ROSA: Is it true?
DASH: It's true. He'll be home by the end of the week, once the paperwork clears.
ROSA: Paperwork. That's what nearly killed him.
` },
{ id: 'c03.win.epi.2.b', chapter: 3, s: `
@set precinct!
DOOLEY: Two suspects. Fairweather's downstairs signing a confession of his own. A real one.
DASH: Who's notarizing it?
DOOLEY: Nobody, Dash. I think that's the first unsealed thing he's ever signed.
` }
],
3: [
{ id: 'c03.win.epi.3.a', chapter: 3, s: `
@set precinct!
> {time}. Fairweather sat in the interview room and asked for a handkerchief. Then another one.
GUS: Will you tell Mr. Ruiz I'm sorry?
DASH: You can tell him at the hearing.
GUS: I'd cry.
DASH: That's the idea, Gus.
` },
{ id: 'c03.win.epi.3.b', chapter: 3, s: `
@set docks!
@mood warm
> When the stay came through, Pier Nine went back to work. Forty men unloading bananas in the rain at three in the morning, and singing.
DOOLEY: What are they singing?
DASH: I don't know. Something in Spanish. Something with Eddie in it.
` }
],
4: [
{ id: 'c03.win.epi.4.a', chapter: 3, s: `
@set penitentiary!
@mood blue
> {time}. The stay came through with two hours to spare. The electrician packed his tools and went home without saying a word.
EDDIE: Detective. I owe you.
DASH: You owe me nothing, Eddie.
EDDIE: On the waterfront, a debt's a debt. You need something on the docks, you ask for me.
` },
{ id: 'c03.win.epi.4.b', chapter: 3, s: `
@set precinct!
BRIGGS: Four. Close enough to make me old.
DASH: You were old already, Captain.
BRIGGS: I was old. Now I'm old and I have a leak in my evidence locker. Go home, Lexington. Somebody ought to.
` }
],
5: [
{ id: 'c03.win.epi.5.a', chapter: 3, s: `
@set penitentiary!
@mood red
> No forger in a cell. Just his name, said out loud, and a doctor's word against a confession. At 5:58 the phone in the warden's office rang.
WARDEN: A stay. On the coroner's affidavit. Thirty days to look again.
DASH: Thirty days.
WARDEN: It's thirty more than he had at five, Lexington. Take it.
` },
{ id: 'c03.win.epi.5.b', chapter: 3, s: `
@set morgue!
@mood sick
FENN: The governor took my affidavit, Lexington. Mine. Not a confession, not a culprit. A dead man's shoulder blade.
DASH: And Fairweather?
FENN: Gone. Struck, you said. Running from both sides now. I almost pity him.
DASH: Don't.
FENN: I said almost.
` }
],
6: [
{ id: 'c03.win.epi.6.a', chapter: 3, s: `
@set penitentiary!
@mood red
> {time}. The last question, and the name came out of me just as they were walking Eddie down the corridor. Fairweather was already gone.
> The phone rang at 5:58. It was Fenn's affidavit that did it. Not me.
EDDIE: Detective. You're shaking.
DASH: So are you, Eddie.
` },
{ id: 'c03.win.epi.6.b', chapter: 3, s: `
@set street!
@mood blue
DOOLEY: Eddie's got thirty days. The Notary's got a head start.
DASH: He's got nothing, Dooley. I said his word. The Lexicon will never touch him again, and neither will anybody else.
DOOLEY: Then where's he going to go?
DASH: Somewhere nobody's ever heard of him. If he finds it, I want the address.
` }
]
}
};

export const LOSS = {
climax: [
{ id: 'c03.loss.climax.a', chapter: 3, s: `
@set penitentiary!
@mood red
~rain heavy
> 6:00 AM. I was at the gate when every light in the State Penitentiary dimmed at once, and came back.
> Somewhere behind three steel doors, a man who could barely spell his own name had been spelled out for good.
~tight
** The Notary's headword was {ANSWER}.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` },
{ id: 'c03.loss.climax.b', chapter: 3, s: `
@set docks!
@mood blue
> 6:00 AM. The ferry stairs were empty. A wet hatbox, a dropped handkerchief, and a seal-shaped hole in the river.
~sfx ring
> A phone was ringing in the dockmaster's shack. I knew the voice before I lifted it.
WORD: Executed. Carried out. Also: signed and made legal. Words have such range, Lexington.
DASH: Tell me his name.
WORD: {ANSWER}. Sworn and sealed.
~sfx hangup
~stamp COLD CASE
` },
{ id: 'c03.loss.climax.c', chapter: 3, s: `
@set street!
@mood red
> 6:00 AM. The bulldog edition was already on the stands. RUIZ DIES AT DAWN. They'd printed it before it happened, and it had happened anyway.
~tight
** It was {ANSWER}. It was always {ANSWER}.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` }
],
epi: {
0: [
{ id: 'c03.loss.epi.0.a', chapter: 3, s: `
@set penitentiary!
@mood blue
> My last suspect didn't have a letter of him. Rosa Ruiz walked past me at the gate without a word. She didn't need one.
` },
{ id: 'c03.loss.epi.0.b', chapter: 3, s: `
@set precinct!
@mood blue
BRIGGS: Your last man was five strangers, Lexington.
DASH: I know.
BRIGGS: The governor's office asked me who the detective was. I told them I'd have to look it up.
` }
],
1: [
{ id: 'c03.loss.epi.1.a', chapter: 3, s: `
@set docks!
> {GUESS} had {hitsN} of him. A corner of a signature. You can't stop an execution with a corner.
DOOLEY: You did everything you could, Dash.
DASH: No, Dooley. I did everything I did.
` },
{ id: 'c03.loss.epi.1.b', chapter: 3, s: `
@set morgue!
@mood sick
FENN: {HitsN}, at the end?
DASH: {HitsN}.
FENN: I've signed a lot of certificates, Lexington. I've never once written "almost" in the cause-of-death box.
` }
],
2: [
{ id: 'c03.loss.epi.2.a', chapter: 3, s: `
@set office!
@mood blue
> {GUESS} had {hitsN} of Augustin Fairweather. Most of a name, the way a forged signature is most of a man.
> On his desk, a wedding photograph, face down. I left it that way.
` },
{ id: 'c03.loss.epi.2.b', chapter: 3, s: `
@set bar!
@mood blue
SAL: {HitsN} in the last one.
DASH: I don't want to talk about it, Sal.
SAL: Then don't. I'll pour, and you sit, and nobody says Eddie's name until you're ready.
` }
],
3: [
{ id: 'c03.loss.epi.3.a', chapter: 3, s: `
@set penitentiary!
@mood red
> {GUESS}. Every letter of the Notary, standing in the wrong places, like witnesses who'd been told what to say.
DASH: I had him. I had all of him.
> The warden didn't answer. He'd heard that one before, too.
` },
{ id: 'c03.loss.epi.3.b', chapter: 3, s: `
@set precinct!
BRIGGS: All five letters, Lexington, and a man in the ground.
DASH: In the wrong order, Captain.
BRIGGS: Tell that to his wife. No. Don't. I'll do it. It's my job to say the things nobody can hear.
` }
]
}
};
