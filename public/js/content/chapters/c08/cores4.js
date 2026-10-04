// Chapter 8 cores, suspect 4 (around three). Dash knows she's in the Gazette building; Grey is moving her to the ferry before six.

export const CORES4 = {
'4-0': [
{ id: 'c08.core.4-0.01', chapter: 8, s: `
@set pressroom
> Three o'clock. {GUESS} came up empty. Eight floors of the Gazette, and every door on the sixth floor was locked from the inside.
DASH: Vera!
> The building swallowed it. Paper eats sound. She'd told me that once, about the morgue upstairs, where they keep the old bound files.
` },
{ id: 'c08.core.4-0.02', chapter: 8, s: `
@set street
> {GUESS}: five strangers. A man in a borrowed overcoat came out of the Gazette's loading door carrying a laundry bundle, and got into a cab.
DOOLEY: Is that her?
DASH: It's laundry, Dooley.
DOOLEY: How do you know?
DASH: Because she'd have kicked.
` },
{ id: 'c08.core.4-0.03', chapter: 8, s: `
@set precinct
?!briggs_out BRIGGS: Nothing in {GUESS}? Lexington, three cars are on the Gazette, front and back. Nobody leaves without being looked at.
?briggs_out DOOLEY: Nothing in {GUESS}? Dash, Briggs drove over from his house in his own car and he's parked at the Gazette's back door in his slippers.
DASH: Good.
> It was the only good thing anybody had said all night.
` },
{ id: 'c08.core.4-0.04', chapter: 8, s: `
@set bar
SAL: Empty?
DASH: Empty. She's in that building and I can't find her.
SAL: Then stop looking for her and look for him. She'll be wherever he's being careful, Dash. Ghosts are careful.
` },
{ id: 'c08.core.4-0.05', chapter: 8, s: `
@set ferry
> {GUESS} was a bust. The ferry's boilers were up. The captain stood on the bridge with a cup of coffee, watching Eddie's men sitting on his gangplank.
> "I sail at six with whoever's on board," he called down. "That's the law."
EDDIE: Then the law can sail around us.
` }],
'4-1': [
{ id: 'c08.core.4-1.01', chapter: 8, s: `
@set pressroom
> {GUESS} gave me {hitsN}. On a proof desk in the composing room, under a lamp, a sheet of copy paper in Vera's handwriting.
> "Dear Mother. Don't worry about me. I've gone away for a rest." Her mother died in 1944.
DASH: He's still writing her. Practising.
` },
{ id: 'c08.core.4-1.02', chapter: 8, s: `
@set street
?dooley_hurt DOOLEY: {HitsN}, Dash. I took the fire stairs on the north side with my good arm. Every landing up to five is clear.
?!dooley_hurt DOOLEY: {HitsN}, Dash. I took the fire stairs on the north side. Every landing up to five is clear.
DASH: And six?
DOOLEY: Six is locked, and it's quiet. The kind of quiet that's holding its breath.
` },
{ id: 'c08.core.4-1.03', chapter: 8, s: `
@set office
MAGS: {HitsN}. Detective, the election supplement Vera was proofing. I've got the galleys. The precinct counts are already printed.
DASH: Before the vote?
MAGS: Before the count, Detective. Somebody knows tomorrow's numbers today.
` },
{ id: 'c08.core.4-1.04', chapter: 8, s: `
@set rooftop
> {HitsN} out of {GUESS}. The Gazette roof, the burnt-out E on the sign still dark from October. Below me, the sixth-floor skylight glowed faintly.
> Through the dirty glass I could see shelves of bound newspapers, a chair, and a coil of rope on the floor. No one in the chair.
DASH: She was here.
` },
{ id: 'c08.core.4-1.05', chapter: 8, s: `
@set phonebooth
~sfx ring
GREY: Detective. Silas Grey. I'm sorry to call. I've written a letter for you, too. Would you like to hear it?
DASH: Where is she?
GREY: "To whom it may concern. I could not save her. I tried. Forgive me." It's very moving. You'd never know I wrote it.
~sfx hangup
> {GUESS} had {hitsN}. He'd called from inside the building. The Gazette switchboard light was still blinking.
` },
{ id: 'c08.core.4-1.06', chapter: 8, s: `
@set bar
SAL: {HitsN}, Dash. I sent Pete to sit on the Gazette's coal chute. And Nickel's at the loading door. Nobody's going out of that building in a laundry bag tonight.
DASH: How did you get Pete to sit anywhere?
SAL: I told him it was for Vera. He's sweet on her. Everybody is.
` }],
'4-2': [
{ id: 'c08.core.4-2.01', chapter: 8, s: `
@set pressroom
> {GUESS} lit {hitsN}. In the composing room, the pneumatic tube that carries copy between floors clattered, and spat out a cylinder at my feet.
> Inside, a strip of copy paper. In Vera's real hand, leaning hard: SIX. MORGUE. HE'S MOVING ME AT 5.
!!@DASH HOLD ON, VERA.
` },
{ id: 'c08.core.4-2.02', chapter: 8, s: `
@set street
> {HitsN} in {GUESS}. A cab pulled up to the Gazette's side door and waited with its engine running. Nobody got in. Nobody got out.
DOOLEY: It's for her, Dash. He's going to move her down the back stairs at five.
DASH: Then we'll be on the back stairs at a quarter to.
` },
{ id: 'c08.core.4-2.03', chapter: 8, s: `
@set precinct
?!briggs_out BRIGGS: {HitsN}. Two hours, Lexington. I've got men on every door.
?briggs_out DOOLEY: {HitsN}. Two hours, Dash. Briggs is on the back door in his slippers, and nobody's told him he's suspended. Nobody's going to.
DASH: Every door but one, Captain. There's always one more door in a newspaper.
` },
{ id: 'c08.core.4-2.04', chapter: 8, s: `
@set office
MAGS: {HitsN}. I've got the Gazette's floor plans from the building inspector. Sixth floor: the morgue. Bound files from 1880. One door, one freight lift, and a dumbwaiter to the loading dock.
DASH: A dumbwaiter.
MAGS: Big enough for a woman, Detective. If she's small and he's careful.
` },
{ id: 'c08.core.4-2.05', chapter: 8, s: `
@set ferry
EDDIE: {HitsN}, Detective? The ferry captain just asked me if I'm planning to sit here all morning.
DASH: What did you say?
EDDIE: I said yes. He's gone to call somebody. Let him. Forty of us. He'll have to call a lot of somebodies.
` },
{ id: 'c08.core.4-2.06', chapter: 8, s: `
@set bar
SAL: {HitsN}. You've nearly got him.
DASH: I've nearly got him and he's got her.
SAL: Then get him, Dash. Then go up those stairs and get her. I'll have coffee on for both of you.
> He said "both of you" like it was already settled. I needed somebody to.
` }],
'4-3': [
{ id: 'c08.core.4-3.01', chapter: 8, s: `
@set pressroom
> {GUESS}. All his letters, every one out of order. Two questions left. Somewhere above me, a typewriter stopped.
DASH: He's finished writing.
> That frightened me more than anything else he'd done.
` },
{ id: 'c08.core.4-3.02', chapter: 8, s: `
@set street
DOOLEY: All five letters, Dash. Two questions.
DASH: And two hours. And one wife.
DOOLEY: You've got her, Dash. You've got all of him. Just put him in order.
** Every letter of the man who took her. None in place.
` },
{ id: 'c08.core.4-3.03', chapter: 8, s: `
@set office
MAGS: Five out of five, scrambled. He writes like that, Detective. Every word right, wrong voice.
DASH: Then I'll give him his own voice back.
` }]
};
