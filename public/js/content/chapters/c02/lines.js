// Chapter 2 one-liners. OPENERS: an establishing line added after the first `@set place` (without `!`) of a core scene.
// CLOSERS: the subtitle of the title card that ends each round, keyed by guesses remaining.

export const OPENERS = {
  bar: ['> The Last Word at {time}. Three regulars, one jukebox, and a back room with the door shut.',
    '> Sal had the radio on to a ballgame that ended hours ago. Nobody asked him to change it.'],
  docks: ['> The waterfront. Fog came off the river in sheets, and every pier light wore a halo it hadn\'t earned.',
    '> {time}. Out in the fog, a foghorn kept asking the same question and never got an answer.'],
  gangway: ['> Pier {pier}. The Lindqvist sat in the black water like a big iron alibi, lit from bow to stern.',
    '> The gangway creaked under the bulb. Somewhere below decks, somebody was frying onions at four in the morning.'],
  street: ['> Front Street ran down to the river like it was late for something.',
    '> {time}. The streetcars had stopped for the night. The rain hadn\'t.'],
  precinct: ['> The precinct. Somebody had left a ham sandwich on the evidence table. It was evidence now.',
    '> The squad room at {time}. Two typewriters going, and neither one telling the truth.'],
  alley: ['> The alley behind the Last Word, where Sal keeps the empties and the cats keep the books.'],
  office: ['> My office at {time}. The coffee was cold and the case was warm, which is the wrong way round.'],
  phonebooth: ['> A phone booth on the waterfront, lit up like a confessional for people who can\'t afford a priest.']
};

export const CLOSERS = {
1: ['One left. The gangway comes up at six.', 'Last suspect. After this, the tab gets paid one way or the other.'],
2: ['Two left. The crew is drifting back from the bars.', 'Two suspects. The harbor pilot is on his way.'],
3: ['Three left. The Lindqvist has her boilers lit.', 'Three suspects. Halfway to the tide.'],
4: ['Four left. The fog is coming in off the river.', 'Four suspects. Sal has started on the clean glasses again.'],
5: ['Five suspects to go. The Lindqvist is taking on cargo.', 'Five left. The tab is open.']
};
