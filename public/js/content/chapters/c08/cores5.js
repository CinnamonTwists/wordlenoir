// Chapter 8 cores, suspect 5 (around four). One question left after this. Grey moves Vera at five.

export const CORES5 = {
'5-0': [
{ id: 'c08.core.5-0.01', chapter: 8, s: `
@set pressroom
> Four o'clock. {GUESS} came up empty. One question left. The sixth-floor door was steel, and the freight lift had been switched off from somewhere I couldn't find.
DASH: Vera, I'm here. I'm right here.
> Through the door, very faintly, a sound like a pencil tapping on a desk. Three short, three long, three short.
` },
{ id: 'c08.core.5-0.02', chapter: 8, s: `
@set street
> {GUESS}: five strangers. The cab at the Gazette's side door switched off its engine. The driver got out, lit a cigarette, and looked at his watch.
DOOLEY: Five o'clock, he's been told.
DASH: Then we've got an hour.
DOOLEY: We've got less, Dash. Nobody's ever on time but the ones you don't want.
` },
{ id: 'c08.core.5-0.03', chapter: 8, s: `
@set precinct
?!briggs_out BRIGGS: Nothing in {GUESS}. One question. Lexington, I've got a crowbar and a fire axe in the car.
?briggs_out DOOLEY: Nothing in {GUESS}. One question. Dash, Briggs has a crowbar and a fire axe in his own car, and his slippers on.
DASH: The door's wired, Captain. Mags looked. If it's forced, the whole floor of paper goes up.
` },
{ id: 'c08.core.5-0.04', chapter: 8, s: `
@set bar
SAL: Empty?
DASH: Empty. One left.
SAL: Then I'm closing the bar, Dash, and I'm coming with you. I don't care if it's police business.
> He took off his apron and folded it, and put on his coat. Sal's never once left that bar while it was open. Not in twenty years.
` },
{ id: 'c08.core.5-0.05', chapter: 8, s: `
@set phonebooth
~sfx ring
WORD: Ghost. The spirit of the dead. Also, a man who writes in another's name. Also, Lexington, a husband who's never home.
DASH: Shut up.
WORD: Is that any way to talk to an old friend?
~sfx hangup
> {GUESS} had been five strangers. The voice wasn't. It never was.
` }],
'5-1': [
{ id: 'c08.core.5-1.01', chapter: 8, s: `
@set pressroom
> {GUESS} had {hitsN}. The dumbwaiter in the composing room creaked. Something heavy was coming down it from the sixth floor. Slowly.
DASH: Dooley, the loading dock. Now.
> I put my hand on the dumbwaiter cable and felt it shiver, like a fishing line with something on the end.
` },
{ id: 'c08.core.5-1.02', chapter: 8, s: `
@set street
?dooley_hurt DOOLEY: {HitsN}, Dash. Pete's on the coal chute, Nickel's on the loading door, I'm on the side door with one arm. Where's the ghost?
?!dooley_hurt DOOLEY: {HitsN}, Dash. Pete's on the coal chute, Nickel's on the loading door, I'm on the side door. Where's the ghost?
DASH: Somewhere he's comfortable, Dooley. He's always comfortable.
!!@DOOLEY NOBODY GETS PAST ME.
` },
{ id: 'c08.core.5-1.03', chapter: 8, s: `
@set office
MAGS: {HitsN}. Detective, I've found the switch for the freight lift. It's in the fuse room. I can turn it back on.
DASH: Will it go to six?
MAGS: It'll go to six. Whether you want what's waiting on six to come down with it, that's your decision.
` },
{ id: 'c08.core.5-1.04', chapter: 8, s: `
@set ferry
EDDIE: {HitsN}, Detective? The ferry captain's called the harbor police. They're on their way to move us off the gangplank.
DASH: Stay as long as you can, Eddie.
EDDIE: We're dockworkers. Staying put is the one thing nobody can teach us.
` },
{ id: 'c08.core.5-1.05', chapter: 8, s: `
@set rooftop
> {HitsN} in {GUESS}. On the Gazette roof, the sixth-floor skylight was propped open an inch with a pencil. A red pencil.
> Hers. She'd got a hand free. She'd got a hand free and she'd used it to leave me a door.
` },
{ id: 'c08.core.5-1.06', chapter: 8, s: `
@set phonebooth
~sfx ring
NORA: Dash. The Gazette switchboard just lit up again. Somebody tapped on the line. No words. Three short, three long, three short.
DASH: S.O.S.
NORA: She's alive, Dash. Get her.
> {GUESS} had {hitsN}. My sister was crying again. I was too. Neither of us said so.
` }],
'5-2': [
{ id: 'c08.core.5-2.01', chapter: 8, s: `
@set pressroom
> {GUESS} lit {hitsN}. A man came down the composing-room stairs in a borrowed overcoat, too long in the sleeves, carrying a bound volume of the 1931 Gazette.
GREY: Detective. You found the building. Well done. I'm afraid she isn't in it anymore.
DASH: You're lying.
GREY: I'm a writer, Detective. It's the same thing, done properly.
` },
{ id: 'c08.core.5-2.02', chapter: 8, s: `
@set street
DOOLEY: {HitsN}. Dash, the cab at the side door's gone. It went while I was looking at the loading door.
DASH: With her?
DOOLEY: With somebody in a blanket. Nickel's running after it. He's faster than the cab in this traffic.
` },
{ id: 'c08.core.5-2.03', chapter: 8, s: `
@set precinct
?!briggs_out BRIGGS: {HitsN}. Lexington, I've got the harbor police holding the ferry. They'll hold it till five past. Not a minute more.
?briggs_out DOOLEY: {HitsN}. Dash, Briggs called the harbor police himself, from a phone box, as a private citizen. They'll hold the ferry till five past six.
DASH: Five minutes.
> Five minutes is a long time. It isn't long enough.
` },
{ id: 'c08.core.5-2.04', chapter: 8, s: `
@set bar
SAL: {HitsN}. I'm out front of the Gazette, Dash. On the phone box. Go up those stairs. I'll watch the street.
DASH: Since when do you leave the bar?
SAL: Since tonight. Go.
` },
{ id: 'c08.core.5-2.05', chapter: 8, s: `
@set ferry
> {HitsN} in {GUESS}. A cab came screaming down the ferry slip and stopped at Eddie's men. A man in a long coat got out. Then a woman in a blanket.
> The blanket fell. It wasn't Vera. It was a mannequin from a dress shop window, wearing her good coat.
EDDIE: It's a dummy, Detective. He sent us a dummy.
DASH: He's still in the building, Eddie. With her.
` },
{ id: 'c08.core.5-2.06', chapter: 8, s: `
@set office
MAGS: {HitsN}. The freight lift's live. I can send it to six right now. If he's there, he'll hear it coming.
DASH: Let him hear it.
MAGS: Detective, he's had all night to write what happens next. Make sure you're the one who reads it out.
` }],
'5-3': [
{ id: 'c08.core.5-3.01', chapter: 8, s: `
@set pressroom
> {GUESS}. All of Silas Grey, scrambled, the way he scrambles everybody he writes for. One question left.
> Above me, on six, a pencil tapping. Three short, three long, three short.
!!@DASH I HEAR YOU, VERA.
` },
{ id: 'c08.core.5-3.02', chapter: 8, s: `
@set street
DOOLEY: All five letters, Dash. One question.
DASH: One question and one wife.
DOOLEY: Then ask the right one. She'd want you to proofread it first.
` },
{ id: 'c08.core.5-3.03', chapter: 8, s: `
@set office
MAGS: Every letter of him, out of order. Detective, she put two words in order for you tonight with her hands tied.
DASH: I know.
MAGS: Then you can manage five.
` }]
};
