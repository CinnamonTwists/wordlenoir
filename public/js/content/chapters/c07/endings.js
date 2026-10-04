// Chapter 7 endings. Catch (bible §6): the transfer is frozen, Penny is arrested, Briggs is reinstated (records_saved, set in the fast and
// slow beats). Near miss (guess 5–6): Quist is named, but the wire has already cleared; Penny drives away from the steps and Briggs stays
// suspended until chapter 9 (briggs_out, penny_free, set in the near beats).

export const WIN = {
climax: [
{ id: 'c07.win.climax.a', chapter: 7, s: `
@set street!
@mood gold
> {time}. The steps of the Federal Reserve. Forty dockworkers, a judge in pyjamas, a captain in a civilian hat, and Mirabel Quist with her painting under her arm.
QUIST: Come to watch history, Detective?
DASH: {ANSWER}.
~heart
> She looked down at the painting. In the corner, among the brushstrokes of my coat, two tiny initials. M.Q. She'd signed me.
%%DASH LEXINGTON | {ANSWER}
?g<5 > Briggs took one step forward with twenty-six years in his voice. "Arrest that dispatcher." Penny Ashcroft was in cuffs before the clerk opened his window.
?g>=5 > Inside, the clerk had already stamped the wire. 6:00 and some seconds. Down the street, a police car pulled away from the curb with Penny Ashcroft at the wheel.
~gstamp CASE CLOSED
` },
{ id: 'c07.win.climax.b', chapter: 7, s: `
@set vault!
@mood gold
> {time}. She came back to the vault for the originals. Fosdick had locked the gate and swallowed the key, or said he had.
QUIST: Open it, little man. I only want to sign them.
DASH: {ANSWER}.
~heart
QUIST: Oh. Oh, that's very good, darling. Where did you find it?
DASH: Where you always sign. Where nobody looks.
%%DASH LEXINGTON | {ANSWER}
?g<5 !!@DASH THE CITY'S NOT FOR SALE.
?g>=5 > Across town, the wire had already cleared. Colophon Holdings owned a city it would now have to fight for in court, and Penny Ashcroft had stopped answering her radio.
~gstamp CASE CLOSED
` },
{ id: 'c07.win.climax.c', chapter: 7, s: `
@set bar!
@mood gold
> {time}. Of all places, she walked into the Last Word. She sat at the bar and asked Sal for a gin and a pencil.
QUIST: I wanted to see the back room where you've been hunting me. It's very poky.
DASH: {ANSWER}.
~heart
> She put the pencil down. Sal set the gin in front of her anyway.
SAL: On the house.
%%DASH LEXINGTON | {ANSWER}
?g<5 > Mags was on the phone to the Federal Reserve before Quist finished the gin. The wire was frozen. Penny Ashcroft was picked up at the bank escort, still holding two coffees.
?g>=5 > Mags was on the phone to the Federal Reserve. The clerk said the wire had cleared at six sharp. Penny Ashcroft hadn't come back from the bank escort.
~gstamp CASE CLOSED
` }
],
epi: {
1: [
{ id: 'c07.win.epi.1.a', chapter: 7, s: `
@set precinct!
@mood warm
> The acting captain cleared out Briggs's desk himself at seven, and left the peppermints. Briggs came in at eight, in uniform, and ate one.
BRIGGS: One question, Lexington. One. City Hall has asked me to accept their apologies.
DASH: Did you?
BRIGGS: I accepted the peppermints. The apologies I'm keeping on file.
` },
{ id: 'c07.win.epi.1.b', chapter: 7, s: `
@set vault!
@mood warm
> Fosdick unlocked the gate with a key he'd had in his shoe the whole time, and stood among the crates of the city's memory like a man in a garden.
DASH: They'll go back to the Hall of Records.
> "Not yet," Fosdick said. "Let them rest a day. They've had a fright."
` }
],
2: [
{ id: 'c07.win.epi.2.a', chapter: 7, s: `
@set precinct!
@mood warm
> Penny Ashcroft sat in the interview room she'd typed a thousand reports outside. She'd asked for coffee. Dooley brought it. Black, the way she always made his.
PENNY: You'll miss me, Sergeant. Nobody makes coffee like I do.
DOOLEY: I know, Penny. That's what I can't forgive.
` },
{ id: 'c07.win.epi.2.b', chapter: 7, s: `
@set bar!
@mood warm
SAL: Two. And the city's still the city. Back room's yours whenever you want it, Dash.
DASH: I'll have my badge back by noon.
SAL: The room doesn't care about the badge. Neither do I.
` }
],
3: [
{ id: 'c07.win.epi.3.a', chapter: 7, s: `
@set precinct!
> {time}. Quist asked for a sketchbook in her cell. They gave her one. By morning she'd drawn every cop in the building, perfectly.
QUIST: And signed them all, Detective. Somewhere. You'll never find where.
DASH: I found it once.
QUIST: Once is all anyone ever gets, darling.
` },
{ id: 'c07.win.epi.3.b', chapter: 7, s: `
@set street!
@mood warm
> At six, the Federal Reserve's clerk opened his window to a wire that never came. Forty dockworkers on the steps cheered like it was a ballgame.
EDDIE: We keep the pier, Detective?
DASH: You keep the pier, Eddie.
EDDIE: Then I owe you twice. I'm keeping count.
` }
],
4: [
{ id: 'c07.win.epi.4.a', chapter: 7, s: `
@set street!
@mood blue
> {time}. The wire was frozen with two hours to spare. Briggs stood on the Federal Reserve steps eating his wife's sandwich while they led Penny Ashcroft to a car.
BRIGGS: Four. I'll be back in my chair by lunch.
DASH: And the acting captain?
BRIGGS: Back at City Hall, Lexington, doing whatever they do there. Nobody's ever found out.
` },
{ id: 'c07.win.epi.4.b', chapter: 7, s: `
@set bar!
MAGS: Four. And six hundred deeds with six signatures, now in evidence.
DASH: You found them all, Mags.
MAGS: I found six. She'll have signed the rest somewhere. I'll find them. I've got time now.
` }
],
5: [
{ id: 'c07.win.epi.5.a', chapter: 7, s: `
@set street!
@mood red
> We had Quist on the steps in cuffs. Inside, at 6:00 and twelve seconds, the clerk had stamped the wire. Colophon Holdings owned the city's paper.
> The city's lawyers would fight it for years. Briggs stayed suspended. Penny Ashcroft's police car turned up in the river two days later, empty.
BRIGGS: Five, Lexington. Close enough to taste it.
` },
{ id: 'c07.win.epi.5.b', chapter: 7, s: `
@set precinct!
@mood blue
DOOLEY: The wire went through, Dash. Penny's gone. The acting captain says Briggs stays out until the hearing.
DASH: When's the hearing?
DOOLEY: After the election. Everything's after the election.
` }
],
6: [
{ id: 'c07.win.epi.6.a', chapter: 7, s: `
@set street!
@mood red
> {time}. I said her word with the clerk's hand already on the stamp. She went quietly. The stamp went down anyway.
> The city belonged to a company with three dead directors, on paper. Penny Ashcroft drove away from the curb, and nobody followed her, because she'd told every car where to be.
` },
{ id: 'c07.win.epi.6.b', chapter: 7, s: `
@set apartment!
@mood blue
BRIGGS: Six. You got the Forger. They got the city. I'm still in my kitchen.
DASH: I'm sorry, Captain.
BRIGGS: Don't be sorry, Lexington. Be quicker. My wife's running out of soup.
` }
]
}
};

export const LOSS = {
climax: [
{ id: 'c07.loss.climax.a', chapter: 7, s: `
@set street!
@mood red
> 6:00 AM. The clerk opened his window, the president handed in the deeds, and the stamp came down like a gavel.
> Mirabel Quist sat on the Federal Reserve steps with her easel, painting it. She'd already signed the painting.
~tight
** Her headword was {ANSWER}.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` },
{ id: 'c07.loss.climax.b', chapter: 7, s: `
@set vault!
@mood blue
> 6:00 AM. The wire cleared. Fosdick sat on the crates in the vault, holding the key to a gate that didn't matter anymore.
~sfx ring
> The bank phone on the steel table rang. Fosdick held it out to me without a word.
WORD: Sold. Also, deceived. The city signed, Lexington. In {ANSWER}'s hand.
~sfx hangup
~stamp COLD CASE
` },
{ id: 'c07.loss.climax.c', chapter: 7, s: `
@set bar!
@mood red
> 6:00 AM. The radio behind Sal's bar read the news: COLOPHON HOLDINGS ACQUIRES MUNICIPAL PORTFOLIO. Sal turned it off.
> On the back-room table, Mags had left the six signatures under a magnifying glass. They didn't matter now.
~tight
** It was {ANSWER}. Signed, sealed, sold.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` }
],
epi: {
0: [
{ id: 'c07.loss.epi.0.a', chapter: 7, s: `
@set street!
@mood blue
> My last suspect didn't have a letter of her in it. Forty dockworkers walked home from the Federal Reserve without a word. Their pier belonged to somebody else now.
` },
{ id: 'c07.loss.epi.0.b', chapter: 7, s: `
@set apartment!
@mood blue
BRIGGS: Five strangers at the end.
DASH: Five strangers.
BRIGGS: Then come in and have soup, Lexington. We're both civilians now, for all the good either of us did.
` }
],
1: [
{ id: 'c07.loss.epi.1.a', chapter: 7, s: `
@set bar!
@mood blue
> {GUESS} had {hitsN} of her. A curl of a signature. Mags packed up the deeds without a word and left them on Sal's table.
MAGS: They're still forgeries, Detective. They're just legal now.
` },
{ id: 'c07.loss.epi.1.b', chapter: 7, s: `
@set precinct!
DOOLEY: {HitsN}, at the end?
DASH: {HitsN}.
DOOLEY: Penny's still on the night shift, Dash. Nobody's arrested her. She brought me coffee this morning.
` }
],
2: [
{ id: 'c07.loss.epi.2.a', chapter: 7, s: `
@set street!
@mood blue
> {GUESS}: {hitsN} of her. Most of a forger, the way the deeds were most of a city.
> Quist waved her brush at me as the president's car pulled away. She'd painted me in. I could see my hat from across the street.
` },
{ id: 'c07.loss.epi.2.b', chapter: 7, s: `
@set bar!
@mood blue
SAL: {HitsN} in the last one.
DASH: Most of her.
SAL: Back room's still yours, Dash. Whoever owns the building now.
` }
],
3: [
{ id: 'c07.loss.epi.3.a', chapter: 7, s: `
@set vault!
@mood red
> {GUESS}. Every letter of Mirabel Quist, out of order. The crates in vault three had a new label by noon: PROPERTY OF COLOPHON HOLDINGS.
` },
{ id: 'c07.loss.epi.3.b', chapter: 7, s: `
@set apartment!
BRIGGS: All five, wrong order. Like a forgery. All the right strokes.
DASH: None of the right pressure.
BRIGGS: You were listening, Lexington. That's something. It's not a city, but it's something.
` }
]
}
};
