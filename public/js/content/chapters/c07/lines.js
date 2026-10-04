// Chapter 7 one-liners. OPENERS: an establishing line after the first `@set place` (without `!`) of a core scene.
// CLOSERS: the subtitle of the title card that ends each round, keyed by guesses remaining.

export const OPENERS = {
  bar: ['> Sal\'s back room. A green lamp, a round table, and six forged deeds pinned to the wall like butterflies.',
    '> The back room of the Last Word. The Bookkeeper used to sit here. Now it was mine, for a night.',
    '> {time}. Through the back-room door I could hear Sal wiping glasses, steady as a metronome.'],
  street: ['> Exchange Street, across from First Municipal Trust. An easel under an awning, and a woman painting in the rain.',
    '> {time}. The bank\'s lobby lights burned behind brass doors, like a church nobody prays in.',
    '> The street outside the Federal Reserve. Too early for anybody but pigeons and crooks.'],
  vault: ['> Vault three. Two hundred crates of the city\'s memory, and a nervous night manager wiping his glasses.',
    '> {time}. The vault gate, the steel table, and the green lamp over a stack of perfect lies.'],
  precinct: ['> The precinct. The acting captain had moved Briggs\'s photographs into a drawer. Somebody had moved them back.',
    '> {time}. The dispatch desk, the radio crackling, and an empty chair that was usually kept very neat.'],
  apartment: ['> Briggs\'s kitchen. Linoleum, soup on the stove, and a captain in his undershirt reading every paper in the city.',
    '> {time}. A suspended captain\'s kitchen. The clock on the wall was running four minutes fast, on purpose.'],
  office: ['> My office. My badge was in a drawer across town. The office didn\'t seem to notice.',
    '> {time}. A forged deed under the desk lamp, with a magnifying glass and Mags\'s fingerprints all over it.'],
  alley: ['> The alley behind First Municipal Trust, where the president\'s chauffeur sleeps in a car worth more than my apartment.',
    '> The alley behind the bank. Even the trash cans looked like they had accounts.'],
  phonebooth: ['> A phone booth across from First Municipal Trust, with a little watercolour of itself taped to the glass.', '> A phone booth on Exchange Street, with a view of the bank\'s one lit window.',
    '> The booth outside the Federal Reserve. Somebody had scratched "SOLD" into the glass.'],
  rooftop: ['> The roof of the bank across the street. From up here, the whole financial district looked like a ledger.']
};

export const CLOSERS = {
1: ['One left. The clerk has set out his stamps.', 'Last suspect. The president has his carnation on.', 'One question. Then the wire.', 'Last suspect. Forty dockworkers are on the steps.'],
2: ['Two left. Penny Ashcroft is driving the escort.', 'Two suspects. The attaché case has a ribbon on it.', 'Two left. The judge is putting on his robe over his pyjamas.', 'Two suspects. The city\'s lease is up at six.'],
3: ['Three left. Six hundred deeds, six signatures.', 'Three suspects. Halfway to the wire.', 'Three left. The dispatch log is open on the table.', 'Three suspects. A captain is eating soup in his kitchen.'],
4: ['Four left. The Forger is painting the bank.', 'Four suspects. The badge is still in the drawer.', 'Four left. Colophon Holdings has three dead directors.', 'Four suspects. Somebody signed the courthouse in an eagle.'],
5: ['Five suspects to go. The wire window opens at six.', 'Five left. The city is for sale.', 'Five suspects. Everything is a copy.', 'Five left. The back room is open.']
};
