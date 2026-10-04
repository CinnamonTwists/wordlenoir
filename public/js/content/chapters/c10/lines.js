// Chapter 10 one-liners. OPENERS: an establishing line after the first `@set place` (without `!`) of a core scene.
// CLOSERS: the subtitle of the title card that ends each round, keyed by guesses remaining.

export const OPENERS = {
  office: ['> My office. The phone receiver lay on the desk, off the hook, breathing.',
    '> {time}. A red pencil on my blotter that I hadn\'t bought, and an open line I hadn\'t closed.',
    '> The office at {time}. The radiator knocked twice and stopped, like it had decided against saying something.'],
  precinct: ['> The precinct. Briggs in his chair with the door open, for once, so everybody could see him there.',
    '> {time}. Every phone in the squad room was ringing, and every one of them was about the same newspaper.'],
  street: ['> Front Street. Forty Gazette trucks in a row, tarpaulins over the bundles, engines cold.',
    '> Mercer Street. A bookbinder\'s shop, dark, with a card in the window: CLOSED FOR CORRECTIONS.',
    '> {time}. The Gazette loading dock, and forty dockworkers with pocketknives, opening the city\'s mail.'],
  pressroom: ['> The Gazette composing room. Press Number Two, where it began in October, cold and patient.',
    '> {time}. The proof desk lamp. Vera\'s red pencil, and a counterfeit front page under it.'],
  station: ['> Union Station at {time}. The big clock, the empty concourse, and an old man on a bench, reading a dictionary.',
    '> Platform Nine. The six o\'clock express was already in, dark, waiting for its passengers.'],
  bar: ['> The Last Word. For the first time in twenty years, the chairs were up on the tables at this hour.',
    '> Sal was behind the bar with his coat on, and a suitcase at his feet.'],
  apartment: ['> Clement Street. A patrol car outside my building, and Mrs. Kowalski\'s light on behind the curtain.',
    '> Home. My typewriter on the desk, with the key that sticks.'],
  morgue: ['> The morgue. Eleven folders on Fenn\'s desk, squared off, each one with a little pigtail mark on the tab.',
    '> {time}. Fenn had the radio off. He said he wanted to hear himself think, for once.'],
  alley: ['> The alley behind the Gazette, where the pressmen smoke. Tonight nobody was smoking. Everybody was watching the trucks.'],
  phonebooth: ['> Booth four, Union Station. The phone was warm. It was always warm tonight.']
};

export const CLOSERS = {
1: ['One left. The trucks go at six. So does the train.', 'Last suspect. The open line has gone quiet.', 'One question. The last one.', 'Last suspect. Somebody is walking down Platform Nine.'],
2: ['Two left. The engines are running on Front Street.', 'Two suspects. The Professor is watching the clock.', 'Two left. The Last Word is closed.', 'Two suspects. Thorne is counting the trucks.'],
3: ['Three left. The orders are in the Professor\'s hand.', 'Three suspects. Halfway to the final edition.', 'Three left. Dooley has a warrant in his pocket.', 'Three suspects. A hundred thousand bundles.'],
4: ['Four left. The press under the bindery is empty.', 'Four suspects. The line is still open.', 'Four left. A suitcase is checked at the station.', 'Four suspects. Somebody is humming a hymn.'],
5: ['Five suspects to go. The last night.', 'Five left. Last chance to proofread your life.', 'Five suspects. Corrections: eleven. Remaining: one.', 'Five left. The final edition goes to press.']
};
