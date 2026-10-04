// Chapter 10 cores, suspect 1 (just after midnight). Key: '<guess>-<bucket>'. Bucket 0: no hits · 1: 1-2 · 2: 3-4 · 3: five, wrong order.
// The finale reads the run's story flags (index_half, lola_caught, notary_free, penny_free, records_saved, dooley_hurt, vera_saved_herself).

export const CORES1 = {
'1-0': [
{ id: 'c10.core.1-0.01', chapter: 10, s: `
@set office
> I said {GUESS} into the open phone line. On the other end, he laughed softly. Not unkindly. Like a teacher.
WORD: Not a letter of him, Lexington. Keep going. I've got all night.
DASH: So do I.
WORD: No. You've got till six.
` },
{ id: 'c10.core.1-0.02', chapter: 10, s: `
@set precinct
BRIGGS: {GUESS}? Five strangers. The last night, Lexington, and you start the way you always do.
DASH: Wrong.
BRIGGS: Wrong. It's tradition. I'd hate to break it now.
> He held up ten fingers. Then he put nine away. One night, one man.
` },
{ id: 'c10.core.1-0.03', chapter: 10, s: `
@set street
> {GUESS} came up empty. Mercer Street, outside the bookbinder's. Every window dark. On the door, a card: CLOSED FOR CORRECTIONS.
DOOLEY: He's got a sense of humor, Dash.
DASH: No, Dooley. He's got a sense of order. It just looks like humor from the outside.
` },
{ id: 'c10.core.1-0.04', chapter: 10, s: `
@set apartment
?vera_saved_herself VERA: {GUESS}? Nothing. Dash, I'm going to the Gazette. If they're printing a fake in our type, I'll find the press. I find things.
?!vera_saved_herself VERA: {GUESS}? Nothing. Dash, I'm going to the Gazette. If they're printing a fake in our type, I'll find the press.
DASH: Vera, he's got a razor.
VERA: I've got a red pencil, Dash. I've won with less.
` },
{ id: 'c10.core.1-0.05', chapter: 10, s: `
@set morgue
FENN: {GUESS}? Not a letter. Lexington, I've pulled every file on every corpse this year. Eleven of them have the same mark. A single thin cut, very neat.
DASH: Thorne.
FENN: Whoever he is, he's the best surgeon in the city. I'd hire him if he weren't so permanent.
` }],
'1-1': [
{ id: 'c10.core.1-1.01', chapter: 10, s: `
@set office
> {GUESS} gave me {hitsN}. On the open line, the breathing stopped for a moment.
WORD: Warmer. You always did warm up slowly, Lexington. Like a radiator.
DASH: You know me.
WORD: Everybody knows you. Some of us have read the whole file.
` },
{ id: 'c10.core.1-1.02', chapter: 10, s: `
@set precinct
?index_half MAGS: {HitsN}. Detective, the half of the Index we took off the express. Thorne's in it. Every correction he's made, dated.
?!index_half MAGS: {HitsN}. Detective, I've got the porter's pages and the Bookkeeper's ledger. Thorne's in both, by date.
DASH: Where is he tonight?
MAGS: Wherever the next date is. He's very punctual.
` },
{ id: 'c10.core.1-1.03', chapter: 10, s: `
@set bar
> {HitsN} in {GUESS}. Sal was behind the bar with a suitcase at his feet. A good one. Leather.
SAL: I'm taking a trip, Dash. After tonight. Somewhere with a coast.
DASH: You've never taken a trip in your life.
SAL: Then it's about time.
> He poured me a coffee. He didn't say where. I didn't ask. That's how we've always been.
` },
{ id: 'c10.core.1-1.04', chapter: 10, s: `
@set street
DOOLEY: {GUESS} had {hitsN}, Dash. And the Gazette's delivery trucks are loading at four. Somebody bribed the dispatcher to carry extra bundles.
DASH: Extra bundles of what?
DOOLEY: Nobody looked, Dash. You know how it is. Nobody ever looks in a bundle.
` },
{ id: 'c10.core.1-1.05', chapter: 10, s: `
@set pressroom
> {GUESS}: {hitsN}. The Gazette composing room. Somebody had been at the type cases. Whole fonts missing. Thirty-point Bodoni, for headlines.
VERA: They took our headline type, Dash. They're setting it somewhere else.
DASH: Where?
VERA: Somewhere with a press big enough for a city.
` },
{ id: 'c10.core.1-1.06', chapter: 10, s: `
@set phonebooth
~sfx ring
?notary_free GUS: Detective? It's... a friend. A sentimental friend. I heard about tonight. The Proofreader once asked me to notarize a list of eleven names. I wept. I signed. Mercer Street. I'm sorry.
?!notary_free GUS: Detective? It's Fairweather, from the county jail. They let me have one call. The Proofreader once asked me to notarize a list of names. I wept. I signed. Mercer Street. I'm sorry.
~sfx hangup
> {GUESS} had {hitsN}. The Notary had called to cry at me. He'd also told me the truth.
` }],
'1-2': [
{ id: 'c10.core.1-2.01', chapter: 10, s: `
@set office
> First suspect, and {GUESS} lit {hitsN}. On the open line, I heard a match strike and a long breath out.
WORD: You're good tonight, Lexington. I almost wish you weren't. It would be easier for both of us.
DASH: Easier for who?
WORD: For the one of us who's leaving.
` },
{ id: 'c10.core.1-2.02', chapter: 10, s: `
@set precinct
BRIGGS: {HitsN}. First time out. Good. I've put a car on every press in the city. Every one.
DASH: Even the Gazette's?
BRIGGS: Especially the Gazette's, Lexington. If they're going to fake my morning paper, they'll have to do it past me.
` },
{ id: 'c10.core.1-2.03', chapter: 10, s: `
@set street
> {GUESS} put {hitsN} in his name. A man in a grey overcoat walked past me on Mercer Street, raised his hat, and said "good evening, Detective."
> By the time I turned around, he'd crossed the street without hurrying and gone into the dark. Courteous. Colourless. Gone.
!!@DASH THAT WAS HIM.
` },
{ id: 'c10.core.1-2.04', chapter: 10, s: `
@set apartment
KOW: Detective. You are home at midnight? This is very unusual.
DASH: {GUESS} had {hitsN}. I came to check on you, Mrs. Kowalski.
KOW: I have a car outside, and a frying pan inside. I am checked.
> She'd called me Detective again. I still wasn't used to it.
` },
{ id: 'c10.core.1-2.05', chapter: 10, s: `
@set pressroom
?lola_caught > {HitsN} in {GUESS}. Lola had sent a message from her cell, through the matron: "The Proofreader prints at the bindery under the bookbinder's. Front row seats. L."
?!lola_caught > {HitsN} in {GUESS}. A postcard had come for me, from somewhere warm. A theatre bill, and on the back: "He prints under the bookbinder's on Mercer. Front row. L."
DASH: Mercer Street. A press under a bindery.
VERA: Then that's where our type went.
` },
{ id: 'c10.core.1-2.06', chapter: 10, s: `
@set morgue
FENN: {HitsN}. Here's something worth having. Every one of Thorne's eleven had a slip of paper in a pocket. A proof-correction slip. With a single mark on it.
DASH: What mark?
FENN: A delete sign, Lexington. Like a little pigtail. He signs his corrections. They all do, in the end.
` }],
'1-3': [
{ id: 'c10.core.1-3.01', chapter: 10, s: `
@set office
> {GUESS}. Every letter of him, out of order. On the open line, a soft, approving hum.
WORD: All of him, wrongly arranged. You see, Lexington? It isn't the letters. It's the order. It's always been the order.
` },
{ id: 'c10.core.1-3.02', chapter: 10, s: `
@set precinct
BRIGGS: Five for five on the first try. The last night, Lexington, and you're scrambling them like eggs.
DASH: I'll unscramble them, Captain.
BRIGGS: Eggs don't unscramble. Men do. Go.
` },
{ id: 'c10.core.1-3.03', chapter: 10, s: `
@set street
> {GUESS}: all five letters, every one in the wrong slot. On Mercer Street, in the bookbinder's window, a single red pencil stood upright in a glass, like a candle.
** Every letter of the Proofreader. Waiting to be corrected.
` }]
};
