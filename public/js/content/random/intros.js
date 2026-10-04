// Case openings. One is picked per case (never repeating until all have played).
// Available vars: {caseNo} {date} {victim} {singer} {pier} {caseTitle} {time0}..{time6} {time}
// victimF: the case needs a woman's name for {victim}.

export const INTROS = [
{ id: 'rnd.intro.crossword', chapter: 0, title: 'The Crossword Killing', s: `
~rain heavy
## THE CROSSWORD KILLING | Case No. {caseNo} · {date}
@set street!
@mood noir
~sfx thunder
> The city was coming apart at the seams that night, and the rain was doing the stitching.
> They found {victim} slumped over a drafting table at the _Morning Gazette_, a pencil still in his fist.
~fade
@set precinct!
@mood blue
BRIGGS: Puzzle editor. Thirty years on the job. Never missed a deadline.
BRIGGS: Tomorrow's crossword is finished. Every square filled in. Except one.
DASH: Let me guess. Five across.
BRIGGS: Five letters, Lexington. Somebody erased it clean. Didn't even leave a smudge.
> Nobody killed {victim} for his money. They killed him for a word.
> And the word did what words do best in this town. It ran.
** A word doesn't run unless it's guilty.
BRIGGS: The Gazette goes to press at six. If that square's empty, the whole city wakes up knowing we lost.
!!@BRIGGS FIND IT, LEXINGTON.
` },
{ id: 'rnd.intro.singer', chapter: 0, title: 'The Torch Singer', victimF: true, s: `
~rain heavy
## THE TORCH SINGER | Case No. {caseNo} · {date}
@set bar!
@mood warm
> The Last Word was the kind of club where the smoke had seniority over the customers.
> {singer} sang there every night at eleven. Tonight she stopped halfway through the last chorus.
SAL: She just quit, Lexington. Mouth open. Band still playing. The word she was reaching for was gone.
DASH: Gone where?
SAL: Out the back door. Five letters, in a hurry. Took the end of the song with it.
~fade
@set apartment!
@mood blue
FENN: Physically she's fine, Dash. But she won't sing another note until somebody brings that word home.
DASH: Is that a diagnosis, Doc?
FENN: It's grammar.
** A song with no ending is just a scream with a band behind it.
> I put a dollar on the bar for the coffee I didn't drink and went out into the rain.
` },
{ id: 'rnd.intro.ransom', chapter: 0, title: 'The Ransom Note', s: `
~rain heavy
## THE RANSOM NOTE | Case No. {caseNo} · {date}
@set precinct!
@mood noir
> The note came in at 11:40, slipped under the precinct door like a bad conscience.
~paper EVIDENCE · ITEM 1|BRING THE MONEY TO THE _ _ _ _ _ AT DAWN. COME ALONE. NO COPS.
> Letters cut from newspapers. Glued crooked. A real artist.
BRIGGS: Somebody grabbed {victim} outside the Paramount at nine. Bandleader. Half the city knows his trumpet.
BRIGGS: The note says where to bring the money. Except the place is cut out. Five holes in the paper.
DASH: So the note's missing a word.
BRIGGS: The note's missing _the_ word. The drop's at dawn. No word, no drop.
~heart
> He didn't finish the sentence. In this business, nobody ever has to.
!!@BRIGGS BRING HIM HOME, LEXINGTON.
` },
{ id: 'rnd.intro.dying', chapter: 0, title: 'The Dying Clue', s: `
~rain light
## THE DYING CLUE | Case No. {caseNo} · {date}
@set void!
@mood noir
> {victim} owned half the waterfront and most of the people on it.
> Tonight they found him on the floor of his study, cold as a banker's handshake.
~fade
@set precinct!
@mood blue
FENN: He scratched something into the floorboards before he went. With a cufflink.
FENN: Five letters, Dash. Somebody sanded them down to nothing an hour later.
DASH: Somebody who knew what they said.
> A dying man doesn't waste his last breath on a grocery list. Those five letters were a name.
** He told us who did it. Then the word walked off.
BRIGGS: The will gets read at six in the morning. You know what that means.
DASH: It means somebody's in a hurry.
` },
{ id: 'rnd.intro.witness', chapter: 0, title: 'The Witness', s: `
~rain heavy
## THE WITNESS | Case No. {caseNo} · {date}
@set precinct!
@mood noir
> Every trial needs a witness. The Varga trial had exactly one, and it was a word.
> It saw everything at the docks that night. It was going to say it all on the stand.
DOOLEY: We had it in protective custody at the Hotel Grammatica. Two officers on the door, Dash.
DOOLEY: It went out the window. Five letters, down a drainpipe, in the rain.
DASH: Words don't climb, Dooley.
DOOLEY: This one did.
~fade
@set street!
@mood blue
> Somewhere out there, the only honest thing in this city was running for its life.
> And the Varga family wanted to find it before I did.
~sfx ring
WORD: Catch me if you can, detective.
~sfx hangup
` },
{ id: 'rnd.intro.password', chapter: 0, title: 'The Password', s: `
~rain light
## THE PASSWORD | Case No. {caseNo} · {date}
@set docks!
@mood blue
~sfx foghorn
> Down at Pier {pier}, the Varga family keeps a vault behind a door with no lock.
> Just a slot, and a man behind it who opens up if you say the right word.
PETE: Whole town's buzzing, Lexington. The password's loose. Walked off when old Varga's bookkeeper went in the river.
DASH: Who else knows?
PETE: Everybody who matters. Nobody who'll tell you. It's five letters. That's all I got.
> Whoever finds that word first owns the waterfront by breakfast.
> If it's me, two hundred families get their life savings back. If it's Varga, they get nothing. Again.
** This city belongs to whoever can spell it.
` },
{ id: 'rnd.intro.telegram', chapter: 0, title: 'The Telegram', s: `
~rain heavy
## THE TELEGRAM | Case No. {caseNo} · {date}
@set office!
@mood warm
~sfx telegraph
> 11:52 PM. A telegram for Detective Lexington, from a man who'd been dead for an hour.
~paper WESTERN WIRE · URGENT|LEXINGTON STOP I KNOW WHO STOP THE NAME IS _ _ _ _ _ STOP
> {victim}. My best informant. Fished out of the canal before the ink was dry.
DOOLEY: Wire office says the line went dead mid-word. He paid for five letters. They never came through.
DASH: So somewhere between his mouth and my desk, a word got off the train.
> That's how it goes. A man dies, and his last sentence is missing the only part that mattered.
** He died spelling it for me.
` },
{ id: 'rnd.intro.typewriter', chapter: 0, title: 'The Typewriter', s: `
~rain light
## THE TYPEWRITER | Case No. {caseNo} · {date}
@set office!
@mood noir
> City Hall, 11:30. A confession, typed on the Commissioner's own Underwood.
> Every word of it was there except one. Five keys had been pried off the machine.
BRIGGS: The keys that typed the name of whoever's running this city from the shadows.
DASH: And the keys are where?
BRIGGS: Gone. Along with the word. The Commissioner wants it found before the papers wake up.
> When somebody steals the letters right off the machine, they're not covering their tracks.
> They're scared.
** Somebody in this city is afraid of five letters.
` },
{ id: 'rnd.intro.lastwords', chapter: 0, title: 'Last Words', s: `
~rain heavy
## LAST WORDS | Case No. {caseNo} · {date}
@set apartment!
@mood blue
~sfx siren
> {victim} had been the mayor for twelve years. He spent about twelve minutes dying.
> I was the only one in the room. He grabbed my collar and said it. One word. Five letters.
> And for the first time in my life, I didn't catch it.
VERA: You didn't hear him?
DASH: The rain was loud. The siren was louder. And I was thinking about something else.
VERA: You're always thinking about something else, Dash.
** The only man who heard it was me.
> The word left that room before the doctor came in. I've been chasing it ever since.
` },
{ id: 'rnd.intro.dictionary', chapter: 0, title: 'The Missing Page', s: `
~rain light
## THE MISSING PAGE | Case No. {caseNo} · {date}
@set office!
@mood warm
> The Central Library's big dictionary sits under glass. Two thousand pages. Never one missing.
> Until tonight. Somebody razored out a single entry. Five letters. One word, gone.
PROF: You don't understand, Detective. Without that entry, the word has no meaning. It's loose. Unaccounted for.
DASH: And a word with no meaning?
PROF: Can mean anything it wants. It's the most dangerous thing in this city.
> The Professor's hands were shaking. I'd seen men shake like that over a gun. Never over a dictionary.
** A word with no definition can be anyone.
` },
{ id: 'rnd.intro.femme', chapter: 0, title: 'The Woman in Red', s: `
~rain heavy
## THE WOMAN IN RED | Case No. {caseNo} · {date}
@set office!
@mood noir
> She came in at 11:15 wearing red and trouble, in that order.
LOLA: Detective Lexington? They say you can find anything.
DASH: They say a lot of things. Who's missing?
LOLA: Not who. What. My husband's last word. He wrote it on a matchbook and then someone shot the light out.
LOLA: When the lights came up, the matchbook was ash. And the word was gone.
> She cried the way people cry in the movies. One tear, perfectly timed. I didn't trust her for a second.
** But I took the case. I always take the case.
` },
{ id: 'rnd.intro.cipher', chapter: 0, title: 'The Radio Cipher', s: `
~rain light
## THE RADIO CIPHER | Case No. {caseNo} · {date}
@set rooftop!
@mood blue
~sfx telegraph
> Every night at 11:00, a station with no call sign broadcasts five letters into the dark.
> Tonight it broadcast four, and a scream.
DOOLEY: The transmitter's on the roof of the Merriwether Building. The operator's gone, Dash. So is the fifth letter.
DOOLEY: Except it wasn't just the fifth. When we played the tape back, all five were blank.
DASH: A word that erases itself off a recording.
> I'd heard about words like that. Smart ones. The kind that know you're listening.
** Somebody out there is sending a message. I intend to read it.
` }
];
