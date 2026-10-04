// Chapter 1 one-liners. OPENERS: an establishing line added after the first `@set place` (without `!`) of a core scene.
// CLOSERS: the subtitle of the title card that ends each round, keyed by guesses remaining.

export const OPENERS = {
  pressroom: ['> The composing room of the Morning Gazette. Hot metal, cold coffee, and the smell of tomorrow being made.',
    '> Press Number Two sat in the middle of the floor like a sleeping animal nobody wanted to wake.',
    '> {time}. The proof-desk lamps burned green, and the type cases stood around like witnesses who wouldn\'t talk.'],
  precinct: ['> The precinct at {time}. The coffee had been on the burner since the war ended.',
    '> Second floor, interrogation. The suspect sat under the lamp and pretended the lamp wasn\'t there.'],
  street: ['> Front Street, outside the Gazette. The rain hit the pavement like it had a deadline too.',
    '> {time}. The delivery trucks sat in a row with their lights off, waiting for news.'],
  office: ['> My office. The radiator was knocking out a message in a code I never learned.',
    '> Back at my desk, with the lamp and the bottle in the drawer, and neither one doing me any good.'],
  alley: ['> The alley behind the Gazette, where the pressmen smoke and the rats read yesterday\'s news.'],
  bar: ['> The Last Word. Sal had the radio low and the lights lower.'],
  phonebooth: ['> The booth on Ninth. Somebody had written a number on the glass in lipstick, then thought better of it.'],
  rooftop: ['> The Gazette roof. The big sign up there read GAZETT, with the last E burned out. Somebody ought to proofread it.']
};

export const CLOSERS = {
1: ['One left. The press is warm. The witness is getting dressed.', 'Last suspect. At six, the Gazette tells the city who dies.'],
2: ['Two left. They\'re locking the plates on Press Number Two.', 'Two suspects. The trucks are lining up at the dock.'],
3: ['Three left. The pressmen clock in at four.', 'Three suspects. Halfway to the morning edition.'],
4: ['Four left. Somebody chalked an outline where the night editor used to be.', 'Four suspects. The coffee in the proof room has gone the color of ink.'],
5: ['Five suspects to go. The presses are cold. For now.', 'Five left. Downstairs, a plate is waiting for its page.']
};
