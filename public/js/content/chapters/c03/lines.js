// Chapter 3 one-liners. OPENERS: an establishing line after the first `@set place` (without `!`) of a core scene.
// CLOSERS: the subtitle of the title card that ends each round, keyed by guesses remaining.

export const OPENERS = {
  office: ['> Fairweather and Fairweather. Two nameplates, one desk, and a smell of lavender and sealing wax.',
    '> The Notary\'s office at {time}. Every certificate on the wall was framed, and every frame was straight.'],
  morgue: ['> The morgue. Doc Fenn kept the radio on low for company. Whose company, he never said.',
    '> Cold tile, cold light, and Harold Mercer under a sheet, waiting for somebody to tell his side.',
    '> {time}. The morgue clock ticked louder than any clock has a right to. Fenn said it kept the customers company.'],
  penitentiary: ['> State Penitentiary. The wall was forty feet high and the rain ran down it like it was trying to escape.',
    '> {time}. The searchlight swept the yard, slow and patient, the way the State does everything except mercy.',
    '> The death house had one light on. It would stay on until six.'],
  docks: ['> Pier Nine. Banana crates stacked to the roof and the smell of fruit going soft in the dark.',
    '> The waterfront at {time}. The river was black, and it wasn\'t talking either.'],
  precinct: ['> The precinct at {time}. Every man on the night shift was suddenly very interested in his own paperwork.',
    '> The squad room. Somebody had pinned Eddie Ruiz\'s mugshot to the board, and somebody else had taken it down.'],
  street: ['> Court Street. Lawyers by day, rats by night. Some of them did both shifts.',
    '> {time}. Rain on the brass plates of every notary on the block.',
    '> A streetcar went by empty, lit up like a parlor, going nowhere anybody needed to be.'],
  bar: ['> The Last Word. Eddie\'s stool was empty, and nobody would sit on it.',
    '> Sal had turned the jukebox off. It felt wrong to play music with a man on the clock.'],
  phonebooth: ['> A phone booth outside the penitentiary gate. The only booth in the state where nobody ever called collect.'],
  alley: ['> The alley behind Court Street, where the lawyers\' wastebaskets end up. Paper everywhere, and none of it innocent.']
};

export const CLOSERS = {
1: ['One left. The electrician is testing the board.', 'Last suspect. Rosa Ruiz has ten minutes at half past five.', 'One question. Then the lights dim.', 'Last suspect. The governor is holding the line.'],
2: ['Two left. They\'ve shaved Eddie\'s head.', 'Two suspects. The warden has put on his good suit.', 'Two left. The bulldog edition is already printed.', 'Two suspects. The chaplain is on his way.'],
3: ['Three left. Eddie is halfway through the crossword.', 'Three suspects. The seal is still missing.', 'Three left. Halfway to the chair.', 'Three suspects. Pier Nine has stopped working.'],
4: ['Four left. They\'ve brought Eddie his last steak.', 'Four suspects. The death house light is still on.', 'Four left. The governor is asleep.', 'Four suspects. A notary is crying somewhere in the city.'],
5: ['Five suspects to go. Eddie Ruiz has six hours.', 'Five left. The State keeps excellent time.', 'Five suspects. The confession is still signed.', 'Five left. Somewhere a seal is still warm.']
};
