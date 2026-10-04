// Chapter 6 one-liners. OPENERS: an establishing line after the first `@set place` (without `!`) of a core scene.
// CLOSERS: the subtitle of the title card that ends each round, keyed by guesses remaining.

export const OPENERS = {
  records: ['> The Hall of Records. Six columns, a carved name, and one lit window where old Mr. Pruitt refused to leave.',
    '> {time}. The steps of the Hall of Records, wet and empty, like a stage after the audience has gone.',
    '> From the basement stairwell, faint and cheerful, a canary was singing to a bomb.'],
  street: ['> The police line on Water Street. Sawhorses, flares, and a crowd that wouldn\'t go home.',
    '> {time}. Three city blocks with nobody in them. You could hear the traffic lights clicking.',
    '> The square across from the Hall of Records. Pigeons asleep on every ledge, and millet on the benches.'],
  precinct: ['> The precinct at {time}. Everybody was being very quiet around the Captain\'s door.',
    '> The squad room. The phone on the Captain\'s desk had been ringing so long nobody heard it anymore.'],
  office: ['> My office, with the Hall of Records floor plan pinned over the window like a blackout curtain.',
    '> {time}. The desk lamp, the requisition book, and a cup of coffee I\'d forgotten to drink an hour ago.'],
  rooftop: ['> The roof across from the Hall of Records. A deck chair, a thermos, and the best seat in the city for a fire.',
    '> Up on the roof, the wind smelled of river and coal smoke and something sweeter. Birdseed.'],
  alley: ['> The alley beside the Hall of Records. The bomb squad truck parked with its lights off, like it was ashamed.',
    '> The coal chute alley, where you could hear the clock through the basement window if you held your breath.'],
  bar: ['> The Last Word. Sal had the radio on to the news. Every station was saying "Hall of Records."',
    '> Sal was wiping down the bar, the way he does when he\'s worried about someone and won\'t say who.'],
  apartment: ['> Home. Vera had left the hall light on. She hadn\'t done that in a long time.'],
  phonebooth: ['> The police call box on Water Street, the only phone in three blocks that still had anyone to talk to.']
};

export const CLOSERS = {
1: ['One left. The clock is winding down to the alarm.', 'Last suspect. The canary has stopped singing.', 'One question. Then the full stop.', 'Last suspect. The Army lieutenant has stopped smoking.'],
2: ['Two left. Old Mr. Pruitt is still at his desk.', 'Two suspects. City Hall has drafted a suspension.', 'Two left. The fire trucks are waiting on Water Street.', 'Two suspects. A deck chair is facing the building.'],
3: ['Three left. The shelves are empty.', 'Three suspects. Halfway to the alarm.', 'Three left. The canary is knocking on its bars.', 'Three suspects. The Army is on its way.'],
4: ['Four left. The bomb squad won\'t go near it.', 'Four suspects. Three buildings, all dark.', 'Four left. Somebody is feeding pigeons.', 'Four suspects. The basement clock is loud.'],
5: ['Five suspects to go. The fuse is set for six.', 'Five left. A canary is singing in the dark.', 'Five suspects. Every job ends in a period.', 'Five left. The Hall of Records is still standing.']
};
