// Chapter 10 cores, suspect 2 (around one in the morning). The press under the bindery is found already empty: the Final Edition is printed,
// hidden inside the Gazette's own delivery bundles, and only Thorne knows which.

export const CORES2 = {
'2-0': [
{ id: 'c10.core.2-0.01', chapter: 10, s: `
@set street
> {GUESS} came up empty. Under the bookbinder's on Mercer Street, a cellar press, still warm. Empty. A hundred thousand copies already printed and gone.
DOOLEY: Where'd they go, Dash?
DASH: Into the Gazette's own bundles, Dooley. Every truck in the city will carry them at six and never know.
` },
{ id: 'c10.core.2-0.02', chapter: 10, s: `
@set office
> Five strangers. On the open line, he was humming. A hymn, I think. Something my mother used to sing.
WORD: You're tired, Lexington. You're always tired by now.
DASH: How would you know?
WORD: I've been listening a long time.
` },
{ id: 'c10.core.2-0.03', chapter: 10, s: `
@set precinct
?!records_saved BRIGGS: {GUESS}? Nothing. And Colophon Holdings' lawyers are on my phone. They say the Final Edition is "a lawful notice of ownership."
?records_saved BRIGGS: {GUESS}? Nothing. The real records are back in the Hall of Records, Lexington. The Final Edition says they're forgeries. Which do you think the city will believe at breakfast?
DASH: Whichever it reads first.
` },
{ id: 'c10.core.2-0.04', chapter: 10, s: `
@set bar
> {GUESS} was a bust. The suitcase was gone from behind the bar. Sal was polishing glasses, and there was a train timetable propped against the till.
SAL: Coffee?
DASH: Where's the suitcase?
SAL: Checked it at the station. Saves carrying it later.
` },
{ id: 'c10.core.2-0.05', chapter: 10, s: `
@set alley
PETE: Lexington. I sell papers. You know what happens to me if there's two front pages tomorrow?
DASH: {GUESS} came up empty, Pete.
PETE: Nobody buys either one, that's what. Fix it. For the trade.
` }],
'2-1': [
{ id: 'c10.core.2-1.01', chapter: 10, s: `
@set pressroom
> {GUESS} gave me {hitsN}. Vera had one copy of the Final Edition, smuggled out of the bindery cellar in her stocking. FINAL EDITION · CITY RECORD CORRECTED.
VERA: Every deed transferred. Every court record "amended." Every name of every Lexicon member, erased from every file.
DASH: And mine?
VERA: Yours is in it, Dash. On page six. Spelled correctly.
` },
{ id: 'c10.core.2-1.02', chapter: 10, s: `
@set precinct
?penny_free DOOLEY: {HitsN}, Dash. And Penny Ashcroft was seen at the Gazette loading dock tonight. In uniform. Telling the drivers which bundles were special.
?!penny_free DOOLEY: {HitsN}, Dash. And a woman in a dispatcher's uniform was seen at the Gazette dock. Penny's in a cell, so it's somebody wearing her old coat.
DASH: The Lexicon recycles everything.
DOOLEY: Even uniforms, Dash.
` },
{ id: 'c10.core.2-1.03', chapter: 10, s: `
@set office
MAGS: {HitsN}. Detective, I've been listening to your open line through a tap. I can hear what's behind him.
DASH: What is it?
MAGS: Trains. Shunting. And a public address. He's calling from Union Station.
` },
{ id: 'c10.core.2-1.04', chapter: 10, s: `
@set street
> {HitsN} in {GUESS}. The Gazette delivery trucks were lined up on Front Street, engines cold, bundles stacked to the roofs under tarpaulins.
DOOLEY: Which bundles are his?
DASH: All of them, Dooley. Or none. Only he knows. That's the point of him.
` },
{ id: 'c10.core.2-1.05', chapter: 10, s: `
@set bar
SAL: {HitsN}. Sit. You look like the end of something.
DASH: It's the last night, Sal.
SAL: Of what?
DASH: I don't know yet. That's what's frightening.
SAL: Then don't be frightened. Be early. You've never once been early in your life.
` },
{ id: 'c10.core.2-1.06', chapter: 10, s: `
@set apartment
?vera_saved_herself VERA: {HitsN}, Dash. I'm going to read every bundle on those trucks if I have to. I'm faster than you think.
?!vera_saved_herself VERA: {HitsN}, Dash. I'm going to read every bundle on those trucks if I have to.
DASH: There are a hundred thousand.
VERA: Then I'll need coffee.
` }],
'2-2': [
{ id: 'c10.core.2-2.01', chapter: 10, s: `
@set office
> {GUESS} lit {hitsN}. On the open line, a long silence. Then the voice, closer to the mouthpiece.
WORD: You're closing in on him. Good. He's been very loyal. He'll understand.
DASH: Understand what?
WORD: That everybody gets corrected eventually, Lexington. Even the ones who hold the pencil.
` },
{ id: 'c10.core.2-2.02', chapter: 10, s: `
@set pressroom
VERA: {HitsN}, Dash. Look at page six of the Final Edition. The correction notices. Every one is marked with a little pigtail. A delete sign.
DASH: Thorne's mark.
VERA: And on page one, under the masthead, one more mark. A very small "stet." Let it stand. Somebody else's hand.
` },
{ id: 'c10.core.2-2.03', chapter: 10, s: `
@set precinct
?!briggs_out BRIGGS: {HitsN}. Two thirds of him. Lexington, do you know what it's like to sit in this chair on a night like this?
?briggs_out BRIGGS: {HitsN}. Two thirds of him. Two weeks back in this chair, Lexington, and I've never wanted it less.
DASH: Then why stay?
BRIGGS: Because if I go home, somebody else sits here. That's the whole job.
!!@BRIGGS BRING HIM IN.
` },
{ id: 'c10.core.2-2.04', chapter: 10, s: `
@set station
> {GUESS}: {hitsN}. Union Station at one in the morning. Under the big clock, a man in a grey overcoat was reading a newspaper with a red pencil in his hand.
> He looked up, saw me, folded the paper, and walked into the men's room. When I went in, it was empty, and the window was open.
` },
{ id: 'c10.core.2-2.05', chapter: 10, s: `
@set morgue
FENN: {HitsN}. Thorne's eleven. I've laid their correction slips out on a tray, in order. Look at the dates.
DASH: October. November. December.
FENN: And one slip with no body yet, Lexington. Dated today. He's got one more correction in him.
` },
{ id: 'c10.core.2-2.06', chapter: 10, s: `
@set street
EDDIE: {HitsN}, Detective? The boys are at the Gazette's loading dock. Forty of us. We know bundles. We'll open every one if you say so.
DASH: There are a hundred thousand, Eddie.
EDDIE: Then we'll be quick about it.
` }],
'2-3': [
{ id: 'c10.core.2-3.01', chapter: 10, s: `
@set office
> {GUESS}. Every letter of Thorne, every one out of place. On the line, a soft click of a pencil on a tooth.
WORD: He's all there, Lexington. Just badly edited.
` },
{ id: 'c10.core.2-3.02', chapter: 10, s: `
@set pressroom
VERA: All five letters, Dash. Wrong order. You'd mark that with a transpose.
DASH: Like your letter.
VERA: Like my letter. You learned something. Now use it.
` },
{ id: 'c10.core.2-3.03', chapter: 10, s: `
@set precinct
BRIGGS: Every letter. Wrong order. The last night, and you're five letters from the end.
DASH: In the wrong order.
BRIGGS: Everything's been in the wrong order since October, Lexington. Put one thing right.
` }]
};
