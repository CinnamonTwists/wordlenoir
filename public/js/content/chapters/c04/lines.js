// Chapter 4 one-liners. OPENERS: an establishing line after the first `@set place` (without `!`) of a core scene.
// CLOSERS: the subtitle of the title card that ends each round, keyed by guesses remaining.

export const OPENERS = {
  studio: ['> Studio B. The ON AIR light burned red, and behind the glass a woman was talking to the whole city at once.',
    '> WKRN at {time}. Acoustic tile, cold coffee, and a voice coming out of the walls.',
    '> The engineer\'s booth. Lou Benning\'s chair was still pushed back, like he\'d just stepped out.'],
  street: ['> The WKRN building, all chrome and neon. The call letters hummed in the rain like a held note.',
    '> {time}. Every radio on the block was tuned to the same station. It made the street sound like one big room.',
    '> A milk truck idled at the curb, its radio going. Even the milk was listening.'],
  morgue: ['> The morgue. Fenn had a radio on the instrument tray. She was on it.',
    '> {time}. Lou Benning on the slab, a red welt around his neck like a necktie.'],
  precinct: ['> The squad room had the radio on. Nobody admitted to turning it on.',
    '> The precinct at {time}. A councilman\'s lawyer was sitting in the Captain\'s chair, reading the Captain\'s paper.'],
  apartment: ['> Home. Vera had the kitchen radio on the table between two cold cups of coffee.',
    '> The apartment at {time}. The radio glowed orange in the dark, like a coal somebody forgot to put out.'],
  rooftop: ['> The roof of the WKRN building. The tower hummed so loud you could feel it in your fillings.',
    '> Up on the roof, the transmitter light blinked red over the whole city, like a pulse.'],
  bar: ['> The Last Word. Sal had the radio on behind the bar for the first time in a week. I almost wished he hadn\'t fixed it.',
    '> Sal was wiping down the bar to a love song. He wasn\'t listening to it. He was listening to me.'],
  office: ['> My office, covered in WKRN program logs. Six months of dedications, and every one of them a name.',
    '> The desk lamp, the logs, and a cold cup of coffee with a skin on it.'],
  phonebooth: ['> A phone booth across from WKRN, where you could watch the studio window while the line hissed.'],
  alley: ['> The alley behind the station, where the musicians smoke and the engineers hide.']
};

export const CLOSERS = {
1: ['One left. The six o\'clock script is typed.', 'Last suspect. Mags has her hand on the fuse.', 'One question. Then the news.', 'Last suspect. The judge\'s order is on the steps.'],
2: ['Two left. She\'s lit her tenth cigarette.', 'Two suspects. The backup announcer is warming up.', 'Two left. The sky is turning grey over the tower.', 'Two suspects. The lawyer has found a judge.'],
3: ['Three left. She\'s playing a love song.', 'Three suspects. Halfway to the news.', 'Three left. The dedications keep coming.', 'Three suspects. Somebody out there is listening.'],
4: ['Four left. She just said your name on the air.', 'Four suspects. The ON AIR light is still burning.', 'Four left. Lou Benning\'s chair is still empty.', 'Four suspects. The city can\'t sleep.'],
5: ['Five suspects to go. She has six hours of air.', 'Five left. Somebody, somewhere, is waiting for a phrase.', 'Five suspects. The night owls are listening.', 'Five left. This one goes out to you.']
};
