# Wordle Noir: Story Bible (DRAFT, awaiting sign-off)

The source of truth for story mode (roadmap T6, T7, T8). Every chapter pack, ending and dossier entry follows this file.
Nothing here reuses Random Case text (decision D3). Characters, setting and tone carry over from DEVELOPMENT.md §1.10.

**Status:** draft for approval. No story content or campaign code gets written until it's signed off.

---

## 0. Decisions to sign off

These are the calls with the biggest knock-on effects. Everything below assumes the **proposed** answer. Change any of them and
I'll revise the bible before writing a line of story.

| # | Question | Proposed | Main alternative |
|---|---|---|---|
| S1 | Who is the crime lord ("the Editor") in the normal endings? | **The Professor** (Ambrose Thackeray), the lexicographer who has been "helping" Dash with letter odds all along | A new character introduced in chapter 1 as a newspaper publisher |
| S2 | How is the story told? | **A frame story**: in 1949, Dash testifies to a grand jury, and a court stenographer types up his account chapter by chapter | Straight first-person narration with no frame |
| S3 | How does a lost chapter (D1) fit the fiction? | **Dash retells it**: "Strike that. That's not how it went." The stenographer rolls a fresh sheet, the night starts over, and the culprit has a new headword | No fiction: a plain "Case reopened" card |
| S4 | Does Lola Vance (an existing character) join the organization? | **Yes**: she's chapter 9's culprit | Keep Lola an ally; add a new chapter 9 culprit |
| S5 | How dark does the easter egg go? | **Dash is the Editor-in-Chief.** The Professor ran the operation, but the words were Dash's. He confesses calmly, and the stenographer types it. | Ambiguous: Dash only *might* be the Editor-in-Chief, and the last line is the stenographer's |
| S6 | What happens to Dooley in the bad endings? | **D: he inherits the badge Dash loses, or (if he was hurt in ch 6) leaves the force. Bad: he takes the fall for Dash.** He never dies on screen. | Dooley dies in the Bad ending |

---

## 1. The premise in one paragraph

The city runs on paper: newspapers, telegrams, contracts, confessions, ballots. For three years, somebody has been editing it.
The organization is called **the Lexicon**. Its members give up their names and are issued a single five-letter word, their
**headword**. To the Lexicon, that word *is* the person. It's how they're paid, ordered and, when necessary, erased. Detective
Dash Lexington spends one long night per chapter hunting a Lexicon member before 6:00 AM. Then he tells the whole story, ten nights
of it, to a grand jury in the winter of 1949. Above them all sits **the Editor**, whose voice calls Dash in the dark and who seems
to know every word before Dash does. Maybe that's because the Editor is the only person who knows them all. Or maybe it's because
Dash does.

---

## 2. The organization: the Lexicon

**Structure.** The Lexicon is organised like a dictionary, and its members use the vocabulary straight-faced.

| Rank | Title | Role |
|---|---|---|
| Top | **The Editor** | Decides what the city reads, hears, signs and believes. Nobody has seen the Editor. Orders arrive as corrections in red pencil. |
| Second | **The Proofreader** | The Editor's right hand. "Corrects errors": removes people who become problems. (Chapter 10's culprit.) |
| Members | **Entries** | Specialists: typesetters, notaries, announcers, forgers. Each one owns one part of the city's paperwork. |
| Outside | **Footnotes** | Hired help who never learn the Lexicon exists: dockhands, clerks, the Varga family's leftovers. |

**How it uses words.** Every order is hidden in plain sight in the city's own text: a misprinted headline, a radio announcer's
deliberate stumble, a classified ad with one wrong letter, a telegram that costs a cent too much. The Lexicon's master book,
*the Index*, maps every headword to a real identity and every member's crimes. It is the one document that could hang them all.

**Why every member is "a word on the run"** (the fiction for a random answer):
- Joining the Lexicon means giving up your name. You are issued a **headword**, five letters long, drawn from the Index.
  Inside the Lexicon you have no other name.
- The Lexicon's oath: **if the law ever speaks your headword to your face, you are finished.** Your file is "struck", your protection
  ends, and the Proofreader comes for you. So when Dash names the word, the culprit surrenders rather than run from both sides.
  That's why catching the word *is* catching the person.
- Whenever a member is exposed or flees, the Index **reissues their headword**: a new word, drawn blind. So the word is different
  every night, every retry and every replay. Writers never know the word. Scenes must work for any five letters.
- Dash's method stays the same as in Random Case: he brings in candidate words ("suspects"). Letters with alibis walk out gray, letters
  "in the gang" turn yellow, and letters in the right place at the right time turn green.

**Its history.** The Lexicon rose in 1946 by quietly replacing the Varga crime family. The Vargas broke bones; the Lexicon rewrites
records. Several Varga leftovers now work as Footnotes, and they hate it. (This gives writers a source of informants and red herrings.)

---

## 3. The crime lord: the Editor

**Identity (hidden until the finale; see S1):** **Professor Ambrose Thackeray**, emeritus lexicographer, Dash's go-to expert for "letter
odds". Kind, dry, precise, fond of tea and etymology.

**Motive.** Thackeray spent thirty years on the definitive dictionary of the American language. In 1945 the city's newspaper barons
bought the publisher and pulped it, because his definitions were "politically unhelpful". He concluded that whoever controls the words
controls the city, and he built the Lexicon from people the city had erased: forgers, ghostwriters, disgraced clerks.
His endgame is **the Final Edition**: on one morning, replace the city's record (court files, deeds, the election count, the front page)
with his own corrected version. History will then simply say what he wrote.

**How the Editor taunts Dash** (the `WORD` voice and red eyes from Random Case):
- **Phone calls**, always when Dash is alone, always briefly, often just before the deadline. The voice speaks in definitions:
  *"Lexington. Proper noun. A small town where a war began. Also: a man about to lose one."*
- **Red-pencil corrections**: Dash finds his own notes "edited" overnight, with misspellings circled.
- **The Editor always knows the stakes:** the voice names the night's deadline before anyone tells Dash.
- Fair-play clues pointing at Thackeray, one per chapter at most, deniable on their own: tea with a cut of lemon at a crime scene; a
  footnote citing a dictionary that was never published; a correction in the Professor's exact handwriting; the voice pronouncing a word the
  old way, as only a lexicographer would; the Professor's offhand "I'm told" about something only the Editor could know.

**What the Professor does in each chapter:** he appears as an ally in roughly half the chapters, giving useful letter-odds informant
scenes (the existing `pos`/`top` informant role). He must never lie about the *odds*, which keeps him fair, but he steers Dash's
*attention*.

---

## 4. The frame: the record of Dash Lexington (S2, S3)

**Where:** a grand jury hearing room at City Hall, February 1949. Snow outside, radiators knocking. The inquiry is into "the
Lexicon affair". Dash testifies for ten sessions, one night per session.

**Who types it:** **Ruth Abernathy** (`RUTH`, new), the court stenographer. Fifties, unflappable, faster than anyone alive, and she
misses nothing. She speaks rarely, and only in short dry lines. She is the audience for Dash's narration and the reader's stand-in.

**How it's used:**
- Each chapter's **opening** starts in the hearing room. Ruth threads paper, the session number is typed (`~paper`), and Dash begins:
  *"It was raining. It's always raining when somebody lies to me."* Then a cut to the night itself.
- Each chapter's **outro** returns to the room for a line or two before the hook.
- **Losing a chapter (D1) is a retelling.** After the escape, the room again: Ruth stops typing. *"Detective, that isn't what you told
  the papers."* Dash: *"Strike that. That's not how it went."* Ruth pulls the sheet, and the night starts over. Because the Index reissues
  headwords, the culprit's word is new. The retry's scenes are different by design (D1's retry picker), and the frame explains why.
- **The endings** are the grand jury's verdict on the record, plus what happened after (§8).
- **Easter-egg seeds live in the frame** (§9). Ruth's lines are the cleanest place to plant deniable observations.

---

## 5. The cast

### Returning (from Random Case canon; new writing only)

| Key | Character | Role in the story | Arc (see §7) |
|---|---|---|---|
| `DASH` | Dash Lexington | Narrator, detective, witness under oath | Burned out → driven → (in the egg) exposed |
| `VERA` | Vera Lexington | Dash's wife. **New in story: a proofreader at the *Morning Gazette*.** She catches the Lexicon's misprints before Dash does. | Leaving him → working beside him → in danger (ch 8) → her choice |
| `DOOLEY` | Sgt. Dooley | Loyal partner, wants his detective's shield | Sidekick → wounded (ch 6) → the man who carries the badge |
| `BRIGGS` | Captain Briggs | Under pressure from City Hall; suspected of being the leak | Suspicious → suspended (ch 7) → cleared and on Dash's side |
| `SAL` | Sal | Bartender, "never wrong". The Last Word is a Lexicon dead drop and Sal has known for a year. | Silent → confesses (ch 2) → informant → right about the Editor, as always |
| `PROF` | The Professor | Ally and informant; secretly the Editor (S1) | Mentor → the reveal |
| `PETE` | Lucky Pete | Newsie informant; sells papers and secrets; Dash's "debt" gag | Running gag; in ch 1 he's the first to spot a misprint |
| `ZERO` | Madame Zero | Fortune teller; reads "letter odds" in the cards | Comic relief; one true prophecy per act |
| `FENN` | Doc Fenn | Coroner | Bodies, dry jokes, the cause-of-death beat in murder chapters |
| `KOW` | Mrs. Kowalski | Landlady | The eviction thread (rent due every chapter, paid in ch 9) |
| `NICKEL` | Nickel | Shoeshine kid who sees everything at Union Station | Eyes on the trains (ch 5, ch 10) |
| `LOLA` | Lola Vance | Femme fatale; Lexicon "Understudy" (S4) | Client (ch 1 cameo) → betrayal (ch 9) |
| `WORD` | The Word / the Editor | The phone voice, red eyes | §3 |

### New allies and recurring characters

| Key (proposed) | Character | Role |
|---|---|---|
| `RUTH` | Ruth Abernathy | Court stenographer, the frame's listener (§4) |
| `MAGS` | Margaret "Mags" Delgado | Radio engineer and telegraph operator. Introduced ch 4; decodes the Lexicon's broadcast and wire traffic after that. |
| `EDDIE` | Eddie Ruiz | Dockworker framed for murder (ch 3). Spared, he becomes Dash's man on the waterfront. |
| `PENNY` | Officer Penny Ashcroft | Precinct night dispatcher; quietly the Lexicon's leak inside the department (revealed ch 7) |

Each new speaking character needs a `CAST` entry, a `bust()` portrait, and (optionally) a `sting` variant.

---

## 6. The ten chapters

Per-chapter script vars (T6): `{chapterNo} {chapterTitle} {culprit} {alias} {crime} {deadline}`. `{culprit}` is the culprit's real name,
`{alias}` is their Lexicon title ("the Typesetter"), and the **headword is the answer** (`{ANSWER}`), never known to writers.

**Midpoint turn:** every chapter has one, delivered by the chapter's **guess-3 core scenes** (all buckets carry it, flavoured by how the
hunt is going). No new slot is needed. **Outro hooks** are the 4 outro beats (fast catch / slow catch / near miss / escaped) from T8's budget.

### Chapter 1: "Stop the Presses"
- **Culprit:** Linus Pell, *the Typesetter*. Fussy, quotes the style manual, irons his shirts at the office.
- **Crime:** Murdered the *Gazette*'s night editor, who noticed Pell setting coded headlines.
- **M.O.:** Hides orders in typos. One wrong letter in a headline tells a Lexicon member who to silence next.
- **Deadline (6:00 AM):** **the presses roll.** The morning edition carries a coded headline marking a witness for death.
- **Opening:** the hearing room, session one. Vera calls Dash at midnight: "There's a typo on page one that isn't a typo."
- **Midpoint turn:** the coded headline isn't about the witness. It's a *job posting*. The Lexicon is hiring.
- **Catch:** the presses are stopped; Vera holds the plate in her inky hands. **Escape:** the paper runs; the witness is found at dawn.
- **Outro hook:** the plate's misprint spells out a place: *last call*. Sal's bar.
- **Arcs moved:** Vera (first time they've worked together in years), Pete (spots the misprint), Lola (cameo: hires Dash for something else, "next week").

### Chapter 2: "Last Call"
- **Culprit:** Della Marsh, *the Bookkeeper*. Warm, motherly, keeps a pencil behind each ear.
- **Crime:** Runs the Lexicon's ledger out of the Last Word's back room; poisoned a Varga Footnote who tried to sell it.
- **M.O.:** Bar tabs as accounts. Every unpaid tab is a payment.
- **Deadline:** **the freighter *Lindqvist* sails from Pier {pier} at 6:00** with a copy of the ledger.
- **Opening:** Sal, polishing a clean glass, finally says the word *Lexicon* out loud.
- **Midpoint turn:** Pete's tab is in the ledger. He's been a Footnote for a year without knowing it.
- **Catch:** the ledger copy is pulled off the gangway. **Escape:** the ship clears the breakwater; Sal pours one for the river.
- **Outro hook:** the ledger lists a payment to a prosecutor, for a confession signed by a man scheduled to die at dawn tomorrow.
- **Arcs moved:** Sal (confesses he's known, and becomes an informant), Pete (the debt gag turns real).

### Chapter 3: "Dead Man's Sentence"
- **Culprit:** Augustin "Gus" Fairweather, *the Notary*. Courtly, sentimental, cries at weddings he's forged.
- **Crime:** Forged Eddie Ruiz's murder confession, notarised in his best hand.
- **M.O.:** Signatures, seals, sworn statements. If it's stamped, people believe it.
- **Deadline:** **Eddie Ruiz goes to the chair at 6:00** at State Penitentiary. Only the real Notary's arrest gets a stay.
- **Opening:** Fenn: "The dead man didn't die the way the confession says. Confessions don't usually get the knife on the wrong side."
- **Midpoint turn:** the confession's seal was bought from the precinct's own evidence locker. Somebody inside helped.
- **Catch:** the governor's call; Eddie walks out at sunrise. **Escape:** the Notary vanishes, but Fenn's evidence alone wins Eddie a stay
  at 5:58. Eddie lives in both branches (so his ally arc holds); the Notary is free (story flag `notary_free`).
- **Outro hook:** the Notary's last appointment book: *WKRN, studio B, 4 AM*.
- **Arcs moved:** Briggs (the leak points at his precinct), new ally Eddie.

### Chapter 4: "Dead Air"
- **Culprit:** Celeste Avery, *the Announcer*. Velvet voice, terrible manners off-air, two packs a day.
- **Crime:** Strangled her engineer with a microphone cable when he noticed she was reading code.
- **M.O.:** Late-night dedications are orders. Sponsor names are targets.
- **Deadline:** **the 6:00 AM news broadcast.** The script contains the activation phrase for a Lexicon courier.
- **Opening:** a radio hiss in Dash's apartment. The dedication is to *Dash Lexington, from an old friend*.
- **Midpoint turn:** Mags Delgado, the station's relief engineer, has been logging the dedications for months, and she wants in.
- **Catch:** Mags pulls the plug at 5:59, and the city wakes to dead air. **Escape:** the phrase goes out; somewhere a courier picks up a suitcase.
- **Outro hook:** the activation phrase is a timetable: the 6:00 train, tomorrow.
- **Arcs moved:** new ally Mags; Dash and Vera (she hears the dedication too, and asks who the old friend is. He doesn't know. *He says.*)

### Chapter 5: "Express"
- **Culprit:** Tomas Brandt, *the Courier*. Polite, punctual, wears gloves indoors.
- **Crime:** Threw a Pullman porter off the night freight; carries the **Index** itself.
- **M.O.:** Never the same suitcase, never the same name on the ticket.
- **Deadline:** **the 6:00 train out of Union Station** (the series' signature deadline, used straight).
- **Opening:** Nickel at his shoeshine stand: "Man in gloves tipped me a dollar. Nobody tips a dollar unless they're leaving forever."
- **Midpoint turn:** the suitcase holds half the Index. The other half is already in the city, in a vault.
- **Catch:** cuffs on the platform, steam everywhere, half the Index in evidence. **Escape:** the train pulls out; Nickel runs alongside, then stops.
- **Outro hook:** the recovered half lists a target: the Hall of Records, *to be corrected by fire*.
- **Arcs moved:** Nickel (first real case of his own), Dooley (does the running, gets the praise, wants the shield).

### Chapter 6: "Short Fuse"
- **Culprit:** Wendell Pike, *the Full Stop*. Ex-army demolitions, gentle, keeps canaries.
- **Crime:** Planted a charge under the Hall of Records to burn the city's original deeds and court files.
- **M.O.:** Every job ends in a period: something that can't be undone.
- **Deadline:** **the fuse is timed for 6:00.**
- **Opening:** Briggs, three fingers up: "Three buildings evacuated. Three hours of sleep. Three reasons I'm not in the mood."
- **Midpoint turn:** the bomb is real, but the records were already moved out last week. The fire would hide that they're *gone*.
- **Catch:** the fuse is cut. **Escape:** the charge goes off, but Dooley clears the night clerk out first and is **wounded** in the blast.
  (Dooley is hurt in both branches, worse on an escape: story flag `dooley_hurt`.)
- **Outro hook:** the moved records went to a bank vault, booked under a forger's name.
- **Arcs moved:** Dooley (wounded), Briggs (blamed by City Hall for the evacuation).

### Chapter 7: "Wire Transfer"
- **Culprit:** Mirabel Quist, *the Forger*. Brilliant, bored, paints watercolours of banks.
- **Crime:** Forged deeds to the city's moved records, and the wire transfer that sells them.
- **M.O.:** Perfect paper. Her only tell is that she can't resist signing her work somewhere hidden.
- **Deadline:** **the Federal Reserve wire window opens at 6:00.** The sale clears and the city's records legally belong to a shell company.
- **Opening:** Briggs is suspended (the leak, the bomb, the papers). Dash works the case without a badge, out of Sal's back room.
- **Midpoint turn:** Mags decodes the precinct's dispatch log. **Penny Ashcroft**, the night dispatcher, is the leak. Briggs is clean.
- **Catch:** the transfer is frozen and Penny is arrested; Briggs is reinstated. **Escape:** the transfer clears and Briggs stays suspended
  until chapter 9 (story flag `briggs_out`).
- **Outro hook:** Quist's hidden signature is on one more document: a ferry ticket, booked for Vera Lexington.
- **Arcs moved:** Briggs (suspicion → cleared), the mole thread closes, Vera (danger begins).

### Chapter 8: "Next of Kin"
- **Culprit:** Silas Grey, *the Ghostwriter*. Writes other people's letters, speeches and suicide notes. Soft-spoken, wears borrowed clothes.
- **Crime:** Kidnapped Vera, who found the Lexicon's ballot plan in the *Gazette*'s proofs.
- **M.O.:** Makes people disappear on paper first: forged farewell letters, resignations, tickets.
- **Deadline:** **the 6:00 ferry to Blackwell Island** carries Vera, along with a "farewell letter" in her handwriting that Grey wrote.
- **Opening:** the hearing room. Dash can't start. Ruth waits. Then: *"Session eight. My wife."*
- **Midpoint turn:** Vera's farewell letter has a proofreader's mark in it, a message only Dash would read: she isn't on the ferry yet.
  She's being held at the *Gazette*.
- **Catch:** Dash finds Vera before the ferry. **Escape:** Vera saves herself (she always could) and walks into the precinct at 7 AM, furious that he
  was late (story flag `vera_saved_herself`).
- **Outro hook:** the ballot plan: the count certifies at 6:00 the next morning, and the Lexicon has a woman inside the count.
- **Arcs moved:** Vera (her choice: she stays, on her own terms), Dash.

### Chapter 9: "The Count"
- **Culprit:** **Lola Vance**, *the Understudy* (S4). Charming, theatrical, has been playing Dash since chapter 1.
- **Crime:** Swapped ballot boxes in the election warehouse; shot a poll watcher who recognised her.
- **M.O.:** Plays whatever part the job needs: client, widow, volunteer.
- **Deadline:** **the election count certifies at 6:00.** If the swapped boxes are counted, a Lexicon-owned slate takes City Hall.
- **Opening:** Lola, in Dash's office, in the same chair as chapter 1: "I need your help, detective. Again." She's lying. Again.
- **Midpoint turn:** Lola names the Proofreader, in exchange for a head start. It's a real name, which is the most frightening thing she's done.
- **Catch:** the true boxes are counted, and Lola is cuffed mid-performance. **Escape:** she bows and is gone; the count stands, contested.
- **Outro hook:** the Proofreader is "correcting" everyone who touched the count, and Mrs. Kowalski signed as a witness.
  (Kowalski is kept safe in both branches; the rent thread is resolved here: Dash finally pays.)
- **Arcs moved:** Lola (betrayal), Kowalski (rent paid; she calls him "Detective" for the first time), Briggs (back if `briggs_out`).

### Chapter 10: "Final Edition"
- **Culprit:** Ellery Thorne, *the Proofreader*. Courteous, colourless, carries a red pencil and a straight razor. Has removed eleven people.
- **Crime:** Every loose end of the series: the night editor, the engineer, the porter, and the witnesses.
- **M.O.:** Corrections. He never improvises.
- **Deadline:** **the Final Edition hits the streets at 6:00**: a counterfeit extra of the *Gazette* declaring the new city record. In the
  same hour, the Editor boards the 6:00 train.
- **Opening:** the WORD calls one last time and doesn't hang up. *"Last chance to proofread your life, Lexington."*
- **Midpoint turn:** the Proofreader's orders are in the Editor's red pencil, in a handwriting Dash recognises but can't place.
- **Catch / escape:** both end at Union Station at 5:58, with the Professor on the platform. How it ends is decided by the run (§8).
- **Outro:** none. Chapter 10 hands straight to the ending.
- **Arcs moved:** all of them.

---

## 7. Arc map

Every chapter moves at least one arc. ● = a major beat, ○ = a touch.

| Arc | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| Dash (burnout → resolve; the unexplained familiarity) | ● | ○ | ○ | ● | ○ | ○ | ● | ● | ○ | ● |
| Vera (leaving → partner → her own choice) | ● | ○ | | ● | | ○ | ● | ● | ○ | ● |
| Dooley (sidekick → wounded → the badge) | ○ | | ○ | | ● | ● | ○ | | ○ | ● |
| Briggs (suspected → suspended → cleared) | ○ | | ● | | | ● | ● | | ● | ○ |
| Sal (silent → confesses → right about the Editor) | | ● | | ○ | | | ● | | ○ | ● |
| The Professor (mentor → Editor) | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ● |
| Ruth (the record) | ● | ○ | ○ | ○ | ○ | ○ | ○ | ● | ○ | ● |
| New allies: Eddie (3→), Mags (4→), Nickel (5) | | | ● | ● | ● | ○ | ● | | ○ | ○ |

**Running gags to keep (fresh lines, same jokes):** Pete's tab, which becomes a real debt in ch 2. Sal is never wrong, and in the finale he
was right about the Professor in chapter 2 without knowing it. Briggs holds up fingers. Mrs. Kowalski's rent. Madame Zero's cards are useless
until they aren't, once per act.

**Escalating stakes within a chapter** stay as in Random Case (warning → suspension → Vera leaves → eviction), but they are **chapter-scoped**
flags. The campaign-scoped story flags are listed in §10.

---

## 8. Endings (T7)

The grand jury's finding, then an epilogue. Bands use the average guesses of each chapter's winning attempt (D5, D7).

| Ending | Condition | The record says | Epilogue |
|---|---|---|---|
| **A: "Clean Copy"** | avg < 2.5 | The Lexicon is broken. Thackeray is arrested on the platform, red pencil in hand. | Vera and Dash, breakfast, no rain. Dooley gets his shield. Briggs holds up one finger: "One. Good. Night." |
| **B: "Errata"** | 2.5 – 3.5 | Thackeray is caught, but the Final Edition partly ran; some records are lost for good. | Dooley gets his shield; Dash keeps his badge, barely. |
| **C: "Margin Notes"** | 3.5 – 4.5 | The Lexicon is broken. Thackeray steps off the platform into the steam and is never found. | Postcards arrive with corrections in red pencil, unsigned. |
| **D: "Redacted"** | 4.5 – 5.5 | The city wins and Dash loses: his badge (the inquiry) or Vera (she leaves for real), shaped by story flags. | Dooley carries the badge Dash lost (if `dooley_hurt` is unset), or leaves the force (if set). |
| **Bad: "Last Train Out"** | avg ≥ 5.5 | Thackeray boards the 6:00. Dooley takes the fall for Dash's mistakes (S6). | Ruth types the last line and stops. The grand jury finds "insufficient record". |
| **Egg: "The Man in the Mirror"** | every chapter won on guess 1 of its first attempt | See §9. | See §9. |

Ending-specific variations read story flags (`vera_saved_herself`, `dooley_hurt`, `briggs_out`, `notary_free`, `lola_caught`...).

---

## 9. The easter egg: "The Man in the Mirror" (T7, S5)

**What it means in play:** the player named every culprit's word on the first try, ten times, on the first attempt. In the fiction, Dash knew
every word before anyone told him. That's what a man who *wrote* the words would know.

**The reveal:** on the platform, cornered, the Professor laughs. *"You think I'm the Editor? I only check the spelling."* He looks at Dash.
*"Ask him who wrote the words."* Back in the hearing room, Ruth reads the record back: ten headwords, each named by the detective on his first try.
*"Nobody is that good, Detective."* Dash: *"Somebody is."* He confesses to Ruth, quietly and precisely, and she types every word. Last line, Ruth:
*"Spelled correctly."*

**Seeds** (plant at most one per chapter, always deniable, never letter-dependent):
- Dash names a culprit's *alias* a beat before anyone says it ("...the Typesetter. That's what they'd call him, anyway.")
- The WORD calls only when Dash is alone, and once while Dash is *holding the receiver*, before it rings.
- Vera: "You talk in your sleep, Dash. Lists. Five letters at a time."
- Dash's typewriter at home has a sticking key; the Editor's red-pencil notes are typed, with the same smudge. (Visual only, no letter named.)
- Ruth, in the frame: "You haven't asked what the record is for, Detective." / "You never pause before the names."
- Sal, never wrong: "You know what I like about you, Dash? You never look surprised."
- The Professor, warmly: "You and I think alike, Dash. I've always said so."

In normal endings each seed reads as noir texture: Dash is sharp, tired, haunted. Only the egg makes them add up.

---

## 10. Writing rules for story chapters

Everything in DEVELOPMENT.md T8 applies (budget, cut-in budget, any-guess scenes). In addition:

1. **Never depend on letters.** Use `{GUESS}`, `{hitsN}`, `{ANSWER}`... The headword is drawn fresh every attempt.
2. **The culprit is a person; the word is their headword.** Write "her headword", "the word she's hiding behind", never "the word was a noun".
3. **Every chapter's facts are fixed by this bible**: culprit, alias, crime, deadline, set pieces. Opening variants must all agree on them.
4. **Midpoint turns live in the guess-3 cores.** **Outro beats** set up the next chapter's hook (fast catch / slow catch / near miss / escaped).
5. **Story flags** (campaign-scoped, `~story name`), each set by one chapter's result: `notary_free` (3 escape), `index_half` (5 catch),
   `dooley_hurt` (6 escape), `briggs_out` and `penny_free` (7 escape), `records_saved` (7 catch), `vera_saved_herself` (8 escape), `lola_caught` (9 catch). Chapter-scoped `~flag` stays for in-chapter escalation.
6. **One seed (§9) per chapter, at most, and only where it reads naturally.**
7. **No Random Case text.** Same characters, new lines. The checker enforces this.
8. **New locations** needed: the *Gazette* press room, State Penitentiary, WKRN studio, a freighter gangway, Hall of Records, bank vault,
   ferry slip, election warehouse, and the grand jury hearing room. Each is a new file in `art/sets/`.

---

## 11. After sign-off

1. Lock §0's decisions (edit this file: drop "DRAFT", record the answers).
2. Step 8: campaign framework + a vertical slice. Chapters 1–2 get minimum coverage (2 scenes per slot) to prove the loop end to end:
   chapter flow, D1 rollback with the retelling, story flags, Continue, Chapter Select, dossier, and placeholder endings.
3. Step 9: chapters written in story order to the ~146-scene budget, then the six endings and the egg.
