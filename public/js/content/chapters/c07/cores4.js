// Chapter 7 cores, suspect 4 (around three).

export const CORES4 = {
'4-0': [
{ id: 'c07.core.4-0.01', chapter: 7, s: `
@set bar
> Three o'clock. {GUESS} came up empty. Mags had found her fifth signature, in the shading of a fire escape on a deed for the orphanage.
MAGS: She signed an orphanage, Detective. Who signs an orphanage?
DASH: Somebody who wants to be caught by the right person.
` },
{ id: 'c07.core.4-0.02', chapter: 7, s: `
@set street
> {GUESS}: five strangers. Quist had packed up her easel and was standing under the awning, admiring her finished painting.
QUIST: Done. The bank at midnight. I'll give it to the president as a closing gift.
DASH: The sale hasn't closed.
QUIST: It closed the moment I signed it, darling. The rest is just the Federal Reserve catching up.
` },
{ id: 'c07.core.4-0.03', chapter: 7, s: `
@set apartment
BRIGGS: Nothing in {GUESS}? Lexington, I'm getting dressed.
DASH: You're suspended.
BRIGGS: I'm suspended from the precinct. Nobody suspended me from the sidewalk outside the Federal Reserve.
` },
{ id: 'c07.core.4-0.04', chapter: 7, s: `
@set precinct
?dooley_hurt > {GUESS} was nothing. Dooley sat at the dispatch desk with his sling and the radio, listening to Penny Ashcroft's voice come over it from a squad car.
?!dooley_hurt > {GUESS} was nothing. Dooley sat at the dispatch desk with the radio, listening to Penny Ashcroft's voice come over it from a squad car.
DOOLEY: She's telling every car to stay off Exchange Street till six. "Bank escort in progress."
DASH: Then I'll walk.
` },
{ id: 'c07.core.4-0.05', chapter: 7, s: `
@set vault
> {GUESS}: nothing. Fosdick had the attaché case on the table, packed. He'd tied a ribbon around the handle.
DASH: A ribbon?
> "The president likes presentation," Fosdick said. He was close to tears. "He says it's a historic day."
` }],
'4-1': [
{ id: 'c07.core.4-1.01', chapter: 7, s: `
@set bar
> {GUESS} gave me {hitsN}. Sal put a fresh pot on the table and looked at the deeds for a long minute.
SAL: She's good, Dash. You could almost believe them.
DASH: Almost.
SAL: Almost is how every bad thing in this city gets signed.
` },
{ id: 'c07.core.4-1.02', chapter: 7, s: `
@set street
QUIST: {HitsN}. I'm almost flattered. Here, have a painting.
> She handed me a small watercolour: the bank, the street, and a man standing across from it in a hat. Me. She'd painted me in the rain.
DASH: Where did you sign it?
QUIST: Oh, darling. Look.
` },
{ id: 'c07.core.4-1.03', chapter: 7, s: `
@set office
MAGS: {GUESS} had {hitsN}. I've worked out the wire. At six the Federal Reserve opens. The president hands in the deeds. The money moves. Colophon owns the city by 6:05.
DASH: And if the deeds are proved forged at 6:04?
MAGS: Then it's a crime. At 6:06, it's history.
` },
{ id: 'c07.core.4-1.04', chapter: 7, s: `
@set apartment
VERA: {HitsN}. Dash, the Gazette's holding the front page. If the sale goes through, the headline is COLOPHON BUYS CITY. If it doesn't...
DASH: What's the other headline?
VERA: They didn't write one. Nobody at the Gazette thought you'd stop it.
DASH: Did you?
VERA: I wrote one. On my own time. It's in my desk.
` },
{ id: 'c07.core.4-1.05', chapter: 7, s: `
@set phonebooth
~sfx ring
PROF: Detective? Ambrose Thackeray. Forgive me. A woman named Quist came to my lecture in '46. Asked how to forge a historical document. As a joke.
DASH: Did you tell her?
PROF: I told her everything, Detective. I thought she was a scholar. I've been telling the wrong people everything for years.
> {GUESS} had {hitsN}. The Professor's name kept turning up. I kept not liking it.
` },
{ id: 'c07.core.4-1.06', chapter: 7, s: `
@set alley
EDDIE: {HitsN}, Detective? The boys heard about the bank. Pier Nine's in that vault. Our lease is in there.
DASH: Everybody's lease is in there, Eddie.
EDDIE: Then everybody's coming. You say the word, we'll stand in front of the Federal Reserve till noon.
` }],
'4-2': [
{ id: 'c07.core.4-2.01', chapter: 7, s: `
@set bar
> {GUESS} lit {hitsN}. Mags held one of the deeds against the window of Sal's back room as the sky began to pale.
MAGS: Six signatures. Out of six hundred. It's enough for a judge, maybe. It's not enough for a banker.
DASH: Then I'll give the banker her name.
!!@DASH SHE SIGNED THE CITY.
` },
{ id: 'c07.core.4-2.02', chapter: 7, s: `
@set street
> {HitsN} in {GUESS}. Quist was looking at her painting of me with her head tilted.
QUIST: I've got your nose wrong. Everyone does. You've got a very hard nose to copy, Detective.
DASH: Try harder.
QUIST: I never try. That's why I'm so good.
` },
{ id: 'c07.core.4-2.03', chapter: 7, s: `
@set precinct
?dooley_hurt DOOLEY: {HitsN}, Dash. Penny's car just called in. She's picking up the president at a quarter past five. I can't drive, but I can lie on the radio.
?!dooley_hurt DOOLEY: {HitsN}, Dash. Penny's car just called in. She's picking up the president at a quarter past five. I can lie on the radio.
DASH: Lie how?
DOOLEY: I can send every car in the city to the Federal Reserve. "Officer needs assistance." It's what she'd do the other way round.
` },
{ id: 'c07.core.4-2.04', chapter: 7, s: `
@set apartment
BRIGGS: {HitsN}. I'm dressed. I'm going to the Federal Reserve in my civilian hat to stand on the steps.
DASH: What for, Captain?
BRIGGS: Because when you name her, Lexington, somebody with twenty-six years should be standing there to say "arrest that dispatcher." It may as well be me.
` },
{ id: 'c07.core.4-2.05', chapter: 7, s: `
@set vault
> {GUESS}: {hitsN}. Fosdick unlocked the gate and handed me the attaché case.
> "Take it," he said. "The president will kill me, but take it."
DASH: It'll do no good, Mr. Fosdick. They've got copies. She makes copies of everything.
> He sat down on a crate of the city's birth certificates and put his face in his hands.
` },
{ id: 'c07.core.4-2.06', chapter: 7, s: `
@set office
MAGS: {HitsN}. You're close. Want to hear something terrible? The Federal Reserve's clerk on the wire window is an old boyfriend of Quist's.
DASH: How do you know?
MAGS: She painted him. In 1946. It's in the Municipal Gallery. "Clerk, at Rest."
` }],
'4-3': [
{ id: 'c07.core.4-3.01', chapter: 7, s: `
@set bar
> {GUESS}. Every letter of her, every one on the wrong line of the deed. Two questions left.
MAGS: Her whole name, in the wrong order. She'd love that. It's how she signs.
DASH: Then I'll sign her back.
` },
{ id: 'c07.core.4-3.02', chapter: 7, s: `
@set street
QUIST: All of me, darling, and none of it in order. That's the trouble with originals. They're so hard to arrange.
DASH: You're not an original, Miss Quist.
QUIST: No. But I'm the best copy you'll ever meet.
` },
{ id: 'c07.core.4-3.03', chapter: 7, s: `
@set apartment
BRIGGS: Five out of five, wrong order. It's like a forged signature. All the right strokes, none of the right pressure.
DASH: Where did you learn that, Captain?
BRIGGS: Twenty-six years of signing other people's mistakes, Lexington.
** Every letter of the Forger. None of the pressure.
` }]
};
