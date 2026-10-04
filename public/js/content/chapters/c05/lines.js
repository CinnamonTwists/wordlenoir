// Chapter 5 one-liners. OPENERS: an establishing line after the first `@set place` (without `!`) of a core scene.
// CLOSERS: the subtitle of the title card that ends each round, keyed by guesses remaining.

export const OPENERS = {
  station: ['> Union Station. The big clock over the concourse kept time for eleven thousand people who never once looked at each other.',
    '> {time}. The departures board clacked over, letter by letter, like a typist who never finishes.',
    '> Platform Nine. The express wasn\'t in yet, but the rails were already humming with it.',
    '> The concourse at {time}. Marble floors, brass rails, and a smell of coal smoke and floor wax.'],
  street: ['> The cab rank outside Union Station. Six cabs, six drivers, six newspapers held up like walls.',
    '> {time}. The mail trucks backed into the loading dock, one by one, like cattle into a chute.'],
  morgue: ['> The morgue. Amos Greer lay under the sheet with his porter\'s cap on his chest.',
    '> {time}. Fenn had the river line timetable pinned beside the X-rays. He said it helped him think.'],
  precinct: ['> The precinct, where a railroad map had been pinned over the duty roster and nobody dared take it down.',
    '> {time}. Two FBI men in identical hats sat on the bench by the door, waiting to be told something.'],
  bar: ['> The Last Word. Sal had a gin poured before I sat down.',
    '> Sal was wiping down the bar under a framed photograph of the old freight yards. I\'d never noticed it before.'],
  alley: ['> The alley behind the station, where the railroad bulls and the hobos have a long-running disagreement.',
    '> Steam drifted through the alley from the vents under the tracks, warm and wet as breath.'],
  office: ['> My office, with the river line timetable spread over the desk like a map of somebody else\'s escape.',
    '> {time}. The desk lamp, the porter\'s pages, and a headache with a name.'],
  rooftop: ['> The roof of Union Station. Twelve tracks fanned out below me into the dark, every one of them a way out.',
    '> Up on the station roof, the wind came off the river carrying soot and the smell of the yards.'],
  phonebooth: ['> The phone booths in the station concourse, a row of them, like confessionals for travellers.']
};

export const CLOSERS = {
1: ['One left. The express is taking on steam.', 'Last suspect. The conductor is checking his watch.', 'One question. Then the whistle.', 'Last suspect. Car nine has its blinds down.'],
2: ['Two left. The mail is going aboard.', 'Two suspects. The replacement porters have arrived.', 'Two left. The FBI is on the platform.', 'Two suspects. Nickel is watching the steam.'],
3: ['Three left. The express is backing into Platform Nine.', 'Three suspects. Halfway to the whistle.', 'Three left. Somebody is reading a timetable like a novel.', 'Three suspects. The trunk is still on the cart.'],
4: ['Four left. A polite man is killing time.', 'Four suspects. The big clock doesn\'t care.', 'Four left. Three tickets, three names, one man.', 'Four suspects. Somebody tipped a dollar again.'],
5: ['Five suspects to go. The express leaves at six.', 'Five left. The departures board says ON TIME.', 'Five suspects. Somebody is wearing gloves indoors.', 'Five left. The river line has never been late.']
};
