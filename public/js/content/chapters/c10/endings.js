// Chapter 10 endings. Named, Thorne tells them which bundles carry the Final Edition. Catch: every truck is stopped. Near miss (guess 5–6):
// the first trucks have already gone, and the Final Edition partly runs. Either way, every win goes on to Union Station at 5:58 (the beats),
// and then to the ending (content/endings), whose last case scene is at the Last Word.

export const WIN = {
climax: [
{ id: 'c10.win.climax.a', chapter: 10, s: `
@set street!
@mood gold
> {time}. The Gazette loading dock. Ellery Thorne stood at the end of the line of trucks with his clipboard, his red pencil, and his hat on straight.
THORNE: Detective. You've come to make a correction.
DASH: {ANSWER}.
~heart
> He took off his hat. He held it to his chest, the way a man does at a graveside.
THORNE: Every third bundle, trucks one through forty. Bottom of the stack. I'm very consistent. It's my only vanity.
%%DASH LEXINGTON | {ANSWER}
?g<5 > Eddie's forty men had the trucks emptied by five. The Final Edition went into the Gazette's own furnace, bundle by bundle, and Vera watched every one burn.
?g>=5 > The first six trucks had already turned out of Front Street. Six thousand copies of the Final Edition were going to breakfast tables. The rest went into the furnace.
~gstamp CASE CLOSED
` },
{ id: 'c10.win.climax.b', chapter: 10, s: `
@set pressroom!
@mood gold
> {time}. He was in the composing room, at Press Number Two, where it had all begun in October. He was setting one line of type by hand, very slowly.
THORNE: A correction, Detective. For tomorrow's real edition. I thought you'd want it spelled properly.
DASH: {ANSWER}.
~heart
> His hands stopped on the type. He looked at the line he'd set: my name.
THORNE: Every third bundle. Trucks one through forty. It's been an honour, Detective. Truly.
%%DASH LEXINGTON | {ANSWER}
?g<5 !!@DASH STOP THE PRESSES. ALL OF THEM.
?g>=5 > Outside, the first trucks were already pulling away. We stopped thirty-four of forty. Six got through.
~gstamp CASE CLOSED
` },
{ id: 'c10.win.climax.c', chapter: 10, s: `
@set precinct!
@mood gold
> {time}. He walked into the precinct on his own, took off his hat, and sat down across from Briggs's desk like a man come to pay a bill.
THORNE: I prefer to be corrected in person, Detective. It's more courteous.
DASH: {ANSWER}.
~heart
THORNE: Thank you. Every third bundle. Trucks one through forty. I've written it out for you. In my own hand. For once.
%%DASH LEXINGTON | {ANSWER}
?g<5 > Briggs had every car in the city on Front Street in four minutes. Not one truck moved.
?g>=5 > Briggs had every car in the city on Front Street in four minutes. Six trucks had already gone.
~gstamp CASE CLOSED
` }
],
epi: {
1: [
{ id: 'c10.win.epi.1.a', chapter: 10, s: `
@set street!
@mood warm
> One question. By one in the morning every bundle on Front Street had been opened, every Final Edition pulled. Eddie's men stood around the furnace warming their hands on the city's lie.
EDDIE: First word, Detective. First one.
DASH: It was a long time coming, Eddie.
> That left five hours till the train. I spent them waiting at Union Station, beside a man I'd sent Dooley to arrest.
` },
{ id: 'c10.win.epi.1.b', chapter: 10, s: `
@set precinct!
@mood warm
BRIGGS: One. The Proofreader's in my cell, asking for a pencil. A blue one. He says he's retired from red.
DASH: Give him a blue one.
BRIGGS: I did. Now go to the station, Lexington. Dooley's been watching your Professor for an hour. Somebody's meeting him at six.
` }
],
2: [
{ id: 'c10.win.epi.2.a', chapter: 10, s: `
@set pressroom!
@mood warm
> Two questions. Thorne sat on a stool in the composing room with his hat in his lap while Vera read his list of bundles aloud to the drivers.
VERA: Truck nineteen, the bottom three. Truck twenty...
THORNE: You read beautifully, Mrs. Lexington. You'd have made a fine proofreader for us.
VERA: I'm a fine proofreader for them. Truck twenty-one.
` },
{ id: 'c10.win.epi.2.b', chapter: 10, s: `
@set street!
> {time}. The trucks went out at six with the real Gazette and nothing else. By then I was already at Union Station.
DOOLEY: The Professor's still on the bench, Dash. He keeps checking the clock.
DASH: So do I, Dooley.
` }
],
3: [
{ id: 'c10.win.epi.3.a', chapter: 10, s: `
@set precinct!
> {time}. Thorne gave his statement to the typist in a voice like a man dictating a menu. Eleven names. Eleven dates. Eleven methods. He corrected her spelling twice.
THORNE: May I ask one thing, Detective?
DASH: Ask.
THORNE: Is my employer at the station? I'd like to know he got his train. It's only polite.
` },
{ id: 'c10.win.epi.3.b', chapter: 10, s: `
@set street!
@mood warm
> At three in the morning, forty dockworkers carried a hundred thousand copies of a lie to the Gazette furnace, singing. Vera stood by the furnace door with a red pencil, ticking off the trucks.
VERA: Go, Dash. The station. I'll finish here.
DASH: Vera...
VERA: After, Dash. You keep saying after. Go make there be one.
` }
],
4: [
{ id: 'c10.win.epi.4.a', chapter: 10, s: `
@set street!
@mood blue
> {time}. Four questions. The trucks were emptied by five. The city would wake up to its own newspaper, with its own mistakes in it. I'd never loved a misprint more.
> And at Union Station, a train was taking on steam, and a man I'd sent to be arrested was waiting for somebody.
` },
{ id: 'c10.win.epi.4.b', chapter: 10, s: `
@set precinct!
BRIGGS: Four. The Proofreader's downstairs. The Final Edition's in the furnace. Go to the station, Lexington.
DASH: Why do you say it like that?
BRIGGS: Because whoever the Professor's meeting, I've got a feeling you already know him. Go.
` }
],
5: [
{ id: 'c10.win.epi.5.a', chapter: 10, s: `
@set street!
@mood red
> We had Thorne. We didn't have the first six trucks. Six thousand copies of the Final Edition went out to newsstands and doorsteps before Briggs's cars could catch them.
> By breakfast, six thousand families would read that the city's record had been corrected. Some of them would believe it.
DASH: The station, Dooley. I'm going to the station.
` },
{ id: 'c10.win.epi.5.b', chapter: 10, s: `
@set pressroom!
@mood sick
VERA: Six trucks, Dash. Six thousand copies. Some of the records are going to be lost for good. People will cite the Final Edition in court for years.
DASH: I know.
VERA: It isn't your fault. It isn't only your fault. Go to the station. Whatever's there, you should see it.
` }
],
6: [
{ id: 'c10.win.epi.6.a', chapter: 10, s: `
@set street!
@mood red
> {time}. I said his word with the trucks already rolling. Thorne gave me his list with a little bow. We caught thirty-four trucks. Six were gone.
> It was a quarter to six. I ran for Union Station. I'd been running for a train since October.
` },
{ id: 'c10.win.epi.6.b', chapter: 10, s: `
@set precinct!
@mood blue
BRIGGS: Six. You got him at the wire, Lexington. Part of the Final Edition's out there. Part of the city's record is gone.
DASH: And the Editor?
BRIGGS: Is at Union Station, if he's anywhere. Go, Lexington. I'll hold the fort. I always do.
` }
]
}
};

export const LOSS = {
climax: [
{ id: 'c10.loss.climax.a', chapter: 10, s: `
@set street!
@mood red
> 6:00 AM. Forty trucks pulled out of Front Street at once, and the Final Edition went to every doorstep in the city. CITY RECORD CORRECTED.
> On the empty loading dock, a red pencil lay on top of a clipboard, perfectly straight. Thorne had left nothing else.
~tight
** His headword was {ANSWER}.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` },
{ id: 'c10.loss.climax.b', chapter: 10, s: `
@set station!
@mood blue
~sfx whistle
> 6:00 AM. I reached Union Station as the express pulled out of Platform Nine. In a lit window, somebody with a newspaper under his arm didn't look back.
~sfx ring
> The phone in booth four was ringing. Nickel held it out to me without a word.
WORD: Final edition, Lexington. No further corrections. {ANSWER} sends his compliments. So do I.
~sfx hangup
~stamp COLD CASE
` },
{ id: 'c10.loss.climax.c', chapter: 10, s: `
@set pressroom!
@mood red
> 6:00 AM. Press Number Two was cold. Everywhere else in the city, people were opening the Final Edition over breakfast and reading that they had always lived in a different city.
~tight
** It was {ANSWER}. The last correction.
%%DASH LEXINGTON | {ANSWER}
~stamp COLD CASE
~loose
` }
],
epi: {
0: [
{ id: 'c10.loss.epi.0.a', chapter: 10, s: `
@set street!
@mood blue
> My last suspect didn't have a letter of him. Pete stood on his corner with two stacks of papers, and nobody bought either.
` },
{ id: 'c10.loss.epi.0.b', chapter: 10, s: `
@set precinct!
@mood blue
BRIGGS: Five strangers at the end of everything.
DASH: Five strangers.
BRIGGS: Then sit down, Lexington. I'll get the coffee. It's the last thing in this city nobody's corrected.
` }
],
1: [
{ id: 'c10.loss.epi.1.a', chapter: 10, s: `
@set office!
@mood blue
> {GUESS} had {hitsN} of him. A fragment of a name. On my desk, a red pencil that wasn't mine, and a note: CORRECTIONS COMPLETE.
` },
{ id: 'c10.loss.epi.1.b', chapter: 10, s: `
@set morgue!
@mood sick
FENN: {HitsN}, at the end?
DASH: {HitsN}.
FENN: Then he's still out there, Lexington, with a twelfth slip and a razor. Sleep in a chair tonight. Facing the door.
` }
],
2: [
{ id: 'c10.loss.epi.2.a', chapter: 10, s: `
@set pressroom!
@mood blue
> {GUESS}: {hitsN} of him, the last time I asked. Vera stood at the proof desk with a copy of the Final Edition, marking every lie in red. There were a lot of them.
VERA: It'll take me years, Dash.
DASH: Then I'll bring you coffee for years.
` },
{ id: 'c10.loss.epi.2.b', chapter: 10, s: `
@set street!
@mood blue
EDDIE: {HitsN} in the last one, Detective.
DASH: Most of him.
EDDIE: Then we'll keep opening bundles. All day. We'll pull every one we can find. A debt's a debt.
` }
],
3: [
{ id: 'c10.loss.epi.3.a', chapter: 10, s: `
@set street!
@mood red
> {GUESS}. All of Ellery Thorne, every letter in the wrong place. He'd have hated that. He'd have corrected it.
` },
{ id: 'c10.loss.epi.3.b', chapter: 10, s: `
@set precinct!
BRIGGS: All five, wrong order. On the last night.
DASH: I know.
BRIGGS: Then I won't hold up any fingers, Lexington. I haven't got any left that mean anything.
` }
]
}
};
