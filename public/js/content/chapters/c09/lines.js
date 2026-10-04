// Chapter 9 one-liners. OPENERS: an establishing line after the first `@set place` (without `!`) of a core scene.
// CLOSERS: the subtitle of the title card that ends each round, keyed by guesses remaining.

export const OPENERS = {
  warehouse: ['> The election warehouse on Canal Street. Ballot boxes stacked to the rafters, and two hundred volunteers with pencils.',
    '> {time}. The tally tables, the bare bulbs, and somewhere in the crowd, a woman in a costume.',
    '> The Fourth Ward aisle, where a landlady in a good hat sat knitting beside the boxes like a sentry.'],
  office: ['> My office. The client chair was warm. It was always warm, the nights she\'d been in it.',
    '> {time}. A gardenia on the blotter. I hadn\'t bought it.'],
  street: ['> Canal Street. Cars from both parties parked bumper to bumper, every driver asleep under his hat.',
    '> {time}. YOUR VOTE COUNTS, said the poster on the warehouse door. Somebody had added a word in lipstick.',
    '> The street outside the warehouse, where the lawyers argue under umbrellas and the rain argues back.'],
  precinct: ['> The precinct, nearly empty. Every man who could stand was at the count.',
    '> {time}. The radio in the squad room, reading out ward totals like a racing announcer.'],
  morgue: ['> The morgue. Harvey Bloom on the slab, with his good spectacles on.',
    '> {time}. Fenn had the election returns on the radio. He said the dead were entitled to know.'],
  bar: ['> The Last Word. Every precinct captain in the city drinks here when it\'s close. Tonight it was very close.',
    '> Sal had the radio tuned to the count, and a fresh pot on, and the good bottle under the bar.'],
  apartment: ['> My building on Clement Street. Mrs. Kowalski\'s door was locked, and her rent book was on the hall table.',
    '> {time}. The stairs smelled of cabbage and floor wax, the way they always do.'],
  alley: ['> The alley behind the warehouse, by the loading bay, where the milk trucks come in.'],
  phonebooth: ['> The phone booth across from the warehouse, where an actress had been making calls all night in different voices.']
};

export const CLOSERS = {
1: ['One left. The chairman has his pen out.', 'Last suspect. The board certifies at six.', 'One question. Then the count is the law.', 'Last suspect. Somewhere, a red pencil is sharpened.'],
2: ['Two left. The real boxes are in milk crates.', 'Two suspects. A grey sedan is parked across the street.', 'Two left. Mrs. Kowalski is still knitting.', 'Two suspects. The Fourth Ward decides everything.'],
3: ['Three left. She\'s in a new costume.', 'Three suspects. Halfway to certification.', 'Three left. Six boxes have new wax.', 'Three suspects. Somebody signed in three times.'],
4: ['Four left. She\'s at the tally table.', 'Four suspects. A poll watcher is on Fenn\'s slab.', 'Four left. She\'s playing a farm wife.', 'Four suspects. The lawyers have brought umbrellas.'],
5: ['Five suspects to go. The count certifies at six.', 'Five left. She\'s in the client chair again.', 'Five suspects. Every vote counts, eventually.', 'Five left. Places, please.']
};
