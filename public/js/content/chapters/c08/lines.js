// Chapter 8 one-liners. OPENERS: an establishing line after the first `@set place` (without `!`) of a core scene.
// CLOSERS: the subtitle of the title card that ends each round, keyed by guesses remaining.

export const OPENERS = {
  apartment: ['> Home. The hall light was off. She always leaves it on.',
    '> The apartment at {time}. Her coffee cup in the sink, washed and turned upside down to dry, the way she does.',
    '> Our bedroom. Her side of the closet open, and the smell of her soap going out of the air.'],
  ferry: ['> The Blackwell Island ferry slip. The sign creaked in the wind like a door nobody wanted to open.',
    '> {time}. The ferry tied up at the pilings, dark except for the engine room, warming up for six.'],
  precinct: ['> The precinct at {time}. Every man on the night shift found a reason not to look at me.',
    '> The squad room. Somebody had put a cup of coffee on my desk. It had gone cold waiting.'],
  office: ['> My office, with her letter under glass and Mags bent over it like a jeweler.',
    '> {time}. The Gazette\'s floor plans spread across my desk, eight floors of places to hide a woman.'],
  street: ['> Front Street, outside the Gazette. The presses were cold. Somewhere above them, so was she.',
    '> {time}. The streetlamps on Clement Street, each one a little circle of nobody.',
    '> Lime Street. A rooming house where a man lived in other men\'s clothes.'],
  pressroom: ['> The Gazette composing room. Press Number Two, cold, and the smell of ink that never comes out.',
    '> {time}. The Gazette at night. Eight floors of paper, and paper eats sound.'],
  bar: ['> The Last Word. Sal had his coat on behind the bar. He\'d had it on all night.',
    '> Sal was standing at the window, looking at Front Street, like he could see the Gazette from here.'],
  docks: ['> The north wharf, where the tugboat men sleep in their cabins and see everything through the portholes.'],
  phonebooth: ['> The phone booth outside the Gazette, where the switchboard girls step out to smoke and gossip about the night.', '> A phone booth on Front Street, with a clear view of the Gazette\'s sixth floor.'],
  rooftop: ['> The Gazette roof. The burned-out E on the sign, still dark, like a missing tooth.']
};

export const CLOSERS = {
1: ['One left. The ferry has its boilers up.', 'Last suspect. He moves her at five.', 'One question. Then the ferry.', 'Last suspect. Somewhere above you, a pencil is tapping.'],
2: ['Two left. The cab is waiting at the side door.', 'Two suspects. Forty dockworkers are sitting on a gangplank.', 'Two left. A typewriter has stopped.', 'Two suspects. The harbor police are coming.'],
3: ['Three left. Her red pencil is on the kitchen table.', 'Three suspects. Halfway to the ferry.', 'Three left. The letter is in her handwriting.', 'Three suspects. The sixth floor is quiet.'],
4: ['Four left. Her coat is gone.', 'Four suspects. The switchboard is listening.', 'Four left. Somebody is wearing another man\'s coat.', 'Four suspects. She never leaves proofs unfinished.'],
5: ['Five suspects to go. The ferry leaves at six.', 'Five left. One passenger, booked by mail.', 'Five suspects. My wife.', 'Five left. "Don\'t look for me."']
};
