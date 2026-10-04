// The endings (roadmap T7, docs/story/bible.md §8–§9). Loaded on demand by ui/campaign.js after chapter 10.
// An ending plays as segments, each with a save-data id (never renumber or reuse one):
//   the band's case script (end.a … end.bad), the four life codas by thread tier (end.coda.<thread>.<tier>), then end.close.
//   The easter egg (end.egg) replaces all of that: no codas, no close.
// Every case script's last case scene is at the Last Word, then the grand jury's finding. In A–D, Sal's last line is about 1931, and
// Dash's answer depends on chapter 8's interlude ("Last Rites"): popTold (kept: Pop confessed), popHalf (late), popLetter (missed: the
// sealed letter, which he opens at the Last Word).
// Ending vars (see endingVars in ui/campaign.js): popTold popHalf popLetter veraWorst endBad (1 or 0), total (guesses across the run).
// Conditions may also read the run's story flags.
export { ENDING_NAMES, ENDING_ORDER } from './names.js';

const CASE = {
A: { id: 'end.a', s: `
@set bar!
@mood gold
~rain off
> Dawn. I came back from Union Station to the Last Word. The sign said CLOSED. The door was unlocked.
> Sal was behind the bar with two cups of coffee, black, steaming. He pushed one across to me the way he'd pushed a thousand drinks.
SAL: Sit down, Dash. I've been waiting.
DASH: How long?
SAL: Since 1931.
> I sat. I knew. I'd known since the Professor looked at me on the platform. Maybe I'd known a lot longer than that.
DASH: You're the Editor.
SAL: I'm the man who pours. I built the Lexicon out of everybody the record ever wrote off. Me first.
DASH: Why, Sal?
SAL: The city wrote me down once, Dash. It never let me change a word.
SAL: The warehouse. You know whose lantern it was.
?popTold DASH: Mine. Pop told me, before he died. It was my lantern, Sal. I'm sorry. I've been sorry for eighteen years and never once said it.
?popLetter > I took Pop's letter out of my coat, where it had been for two weeks, and opened it on the bar. Three lines. I read them twice.
?popLetter DASH: Mine. Pop wrote it down. It was my lantern, Sal. I'm sorry.
?popHalf DASH: Mine. I've always known. I just never let anybody finish the sentence. I'm sorry, Sal.
SAL: That's all I wanted, Dash. Eighteen years. That's all I ever wanted.
> He came around the bar and held out his wrists. I didn't cuff him. We drank the coffee and talked about the river, and the yards, and the warehouse, until we heard the squad cars on Front Street.
~sfx siren
@set hearing!
@mood gold
~rain off
RUTH: The finding of the grand jury, Detective. For the record.
~paper FINDING OF THE GRAND JURY|The Lexicon is dissolved. Salvatore Bruno, who surrendered, is held for trial. Ambrose Thackeray is cleared of all suspicion.
?!dooley_hurt RUTH: And Sergeant Dooley has been made a detective. The jury asked me to note it.
?dooley_hurt RUTH: And Sergeant Dooley has been made a detective, sling and all. The jury asked me to note it.
DASH: Note it twice, Ruth.
## CLEAN COPY | Ten nights. {total} suspects. Every word accounted for.
` },
B: { id: 'end.b', s: `
@set bar!
@mood blue
~rain off
> Dawn. The Last Word was locked, but the light was on. Sal was behind the bar polishing a glass that was already clean.
> He didn't look up when I came in. He didn't look up once, the whole time.
DASH: Sal.
SAL: I know why you're here, Dash.
DASH: The Professor told me. On the platform.
SAL: The Professor always did know more than he let on. That's what I liked about his dictionary.
> Six thousand copies of the Final Edition had gone to breakfast tables. Somewhere a deed was gone for good. A birth certificate. A court file.
SAL: You'll want to talk about the warehouse.
?popTold DASH: I know about the warehouse. Pop told me. It was my lantern.
?popLetter > I opened Pop's letter on the bar. I'd carried it two weeks. Sal watched me read it, and didn't say a word.
?popLetter DASH: It was mine. He wrote it down. It was mine, Sal.
?popHalf DASH: I know enough, Sal. I've always known enough.
SAL: Then that's something, Dash. It isn't everything. But it's something.
> He set down the glass, came round the bar, and held out his hands to Dooley. Not to me. He went out to the car without once looking at me.
@set hearing!
@mood blue
~rain off
RUTH: The finding of the grand jury, Detective.
~paper FINDING OF THE GRAND JURY|The Lexicon is dissolved. Salvatore Bruno is held for trial. Certain public records are found to be unrecoverable.
RUTH: Errata, the clerk calls it. A list of errors found too late to correct.
DASH: That's the right word for it.
## ERRATA | Ten nights. {total} suspects. Some of the record was lost for good.
` },
C: { id: 'end.c', s: `
@set bar!
@mood blue
~rain off
> Dawn. The Last Word was dark. The door was unlocked. On the bar, one glass, still wet, and a red pencil laid beside it, perfectly straight.
> The suitcase was gone. The good bottle was gone. Sal was gone.
DOOLEY: The Lexicon's done, Dash. Thorne gave us every name. We're picking them up all over the city.
DASH: All but one.
> I sat at the bar until the sun came all the way up. Nobody poured.
?popLetter > I opened Pop's letter there, alone, at the bar. Three lines. I read them until I knew them by heart.
@set hearing!
@mood blue
~rain off
RUTH: The finding of the grand jury, Detective.
~paper FINDING OF THE GRAND JURY|The Lexicon is dissolved. Salvatore Bruno, believed to be its Editor, remains at large.
RUTH: And the postcards?
DASH: They started that spring. One a month, no return address. Every one a picture of a coastline.
DASH: My own reports, clipped out of the Gazette, with corrections in red pencil. Always right. Never signed.
RUTH: And the last one?
DASH: "The warehouse, 1931. You know whose lantern it was. I only ever wanted you to say it."
?popTold DASH: I wrote back, care of the post office at the coast on the picture. "It was mine. Pop told me. I'm sorry." I don't know if it reached him.
?popLetter DASH: I wrote back, care of the post office on the picture. "It was mine. Pop wrote it down. I'm sorry." I don't know if it reached him.
?popHalf DASH: I never wrote back. I didn't know where to send it. I didn't know how to finish the sentence.
## MARGIN NOTES | Ten nights. {total} suspects. One man missing from the record.
` },
D: { id: 'end.d', s: `
@set bar!
@mood blue
~rain off
> Dawn. I went to the Last Word. It was full of police. Not mine. State police, with a warrant, and a captain I'd never met.
> They brought Sal out past me in handcuffs. He looked at me once. Then they put him in a car and drove away, and nobody told me anything.
> I read about it in the Gazette at noon, like everybody else. EDITOR OF LEXICON ARRESTED. Sources close to the inquiry.
?popTold > He'd wanted me to be the one. I'd wanted to tell him what Pop told me. Neither of us got what we wanted.
?popLetter > Pop's letter was still sealed in my coat. I opened it in the street, under the newsstand awning, with the headline beside it.
?popHalf > I'd never said it to his face. Now I'd only ever say it through a lawyer.
@set hearing!
@mood blue
~rain off
RUTH: The finding of the grand jury, Detective.
~paper FINDING OF THE GRAND JURY|The Lexicon is dissolved. Salvatore Bruno is held for trial. The conduct of the investigating officer is referred for review.
?!veraWorst RUTH: The inquiry took your badge.
?!veraWorst DASH: Too many nights, too many rules. They were right about most of them.
?veraWorst RUTH: The inquiry let you keep your badge.
?veraWorst DASH: They let me keep the badge, Ruth. Vera didn't stay to see it. That was the trade.
?!veraWorst?!dooley_hurt DASH: Dooley has my badge now. Detective Dooley. He polishes it every morning. He's better at it than I was.
?veraWorst?!dooley_hurt DASH: Dooley's still my partner. Still waiting on his shield. He says he doesn't mind. He minds.
?dooley_hurt DASH: Dooley left the force in the spring. The arm never came back. He drives a cab now, and he won't take my fare.
## REDACTED | Ten nights. {total} suspects. The city won. Some of me didn't.
` },
bad: { id: 'end.bad', s: `
@set station!
@mood red
~sfx whistle
> 6:00 AM. The express pulled out of Platform Nine. In the last car, at the window, a big man in a good coat, with a newspaper under his arm. The Final Edition.
> He looked at me through the glass. He lifted two fingers off the paper, the way he used to wave from behind the bar. Then the steam took him.
PROF: He's gone, Detective. I'm so sorry.
> Dooley still had his hand on the Professor's arm. Nobody had told him to let go.
@set bar!
@mood blue
~rain off
> I went to the Last Word. The door was open, the chairs up. On the bar, one glass, washed and turned upside down, and the key to the front door.
> He'd left me the key. I sat there with it until it got dark again.
@set hearing!
@mood red
~rain off
RUTH: The finding of the grand jury, Detective.
~paper FINDING OF THE GRAND JURY|Insufficient record.
RUTH: Sergeant Dooley signed a statement accepting responsibility for the errors in your investigation. All of them.
DASH: They weren't his.
RUTH: He knew that, Detective. He signed anyway.
?dooley_hurt > He took the fall and a disability pension both, with an arm that never came back. He never once said a word to me about it.
> The Professor was never charged. He was never cleared, either. His name stayed in the papers until nobody would hire him to teach a child to spell.
## LAST TRAIN OUT | Ten nights. {total} suspects. Insufficient record.
` }
};

// The easter egg (bible §9): every chapter named on the first suspect, first attempt. Replaces the codas and the close.
const EGG = { id: 'end.egg', s: `
@set bar!
@mood gold
~rain off
> Dawn. The Last Word. Sal was behind the bar with two coffees, black, and he pushed one across to me.
> I had the cuffs in my coat. I'd come to use them.
DASH: You're the Editor, Sal.
SAL: Am I?
> He reached behind his ear for the red pencil, laid it on the bar, and slid it across to me with one finger.
SAL: You think I'm the Editor, Dash? I only pour. You always told me what was true.
@mood red
~heart
SAL: 1931. You knocked over the lantern. I did three years for it. I'd have done thirty.
SAL: 1946. You came in here after Vera went to bed, with an idea. A way to fix the record. Every record. Yours first. You drew it on a napkin.
SAL: I built it because you asked, Dash. Every word was yours. You chose them. I just poured.
> I looked at the pencil. It fit my hand. It always had.
SAL: Ten words. You named every one on the first try. Didn't you ever wonder why?
@set hearing!
@mood red
~rain off
> In the hearing room, Ruth read the record back to me. Ten sessions. Ten headwords. Each one named with the first suspect.
> Then the rest of it, read back the same way. The ballgame with Tommy. Coffee instead of rye. Vera laughing at Luigi's. A good son at a bedside. One more thing I'd written.
RUTH: Ten nights, Detective. Ten words. Every one of them on the first try.
RUTH: Nobody is that good, Detective.
DASH: Somebody is.
> I confessed. Quietly and precisely, from the beginning. The warehouse. The lantern. The napkin in 1946. Every headword, and why I chose it.
> Ruth typed every word. She didn't miss one. She never does.
~paper THE RECORD OF DASH LEXINGTON|Statement of the witness. Ten sessions. Read back and confirmed.
RUTH: Spelled correctly.
~stamp THE RECORD IS COMPLETE
` };

// The life (bible §8): one coda per thread, by its tier.
const CODA = {
pop: {
best: { id: 'end.coda.pop.best', s: `
## POP | The grave
@set cemetery!
@mood blue
~rain off
> Pop's grave, the first snow of the year on it. I stood there with my hat in my hands.
?popTold > He'd told me himself, at the end. I owed him the rest of it.
?popLetter > I'd read his letter so many times the folds had gone soft. I owed him an answer.
?popHalf > He'd got halfway, at the end. I owed him the other half.
DASH: It was my lantern, Pop. I said it to Sal. Now I'm saying it to you. Out loud. It was mine.
> The snow didn't answer. It never does. But I'd said it, for the first time in eighteen years, out loud, to somebody who knew it was true.
` },
middle: { id: 'end.coda.pop.middle', s: `
## POP | The letter
@set apartment!
@mood noir
~rain window
> I knew half of it. The half Pop got out, or the half I'd let myself remember. I wrote the rest in a letter to Sal.
> Four pages. I got the warehouse right, and the lantern, and the three years he did for me.
> I never sent it. It's in my desk, under the typewriter with the key that sticks.
` },
worst: { id: 'end.coda.pop.worst', s: `
## POP | The snow
@set cemetery!
@mood blue
~rain off
?popLetter > I read Pop's letter again alone in the snow, after the funeral, after everybody had gone home. Three lines, in his patrolman's capitals.
?popLetter > IT WAS YOUR LANTERN, SON. I PUT IT ON THE BRUNO BOY. I'M SORRY.
?!popLetter > I stood at Pop's grave alone in the snow, after everybody had gone home, with everything he'd tried to tell me and I hadn't let him finish.
> There was nobody left to say anything back to. I stood there till it got dark, and then a while longer.
` }
},
vera: {
best: { id: 'end.coda.vera.best', s: `
## VERA | West
@set station!
@mood warm
~rain off
> December the fourteenth came and went with the trial. We took the train west in March instead. Two tickets. Both used.
> Somewhere past the mountains I fell asleep against the window, in daylight, for the first time in years.
> Vera said I slept like a man who'd finished something. She held my hand the whole way, like a proof she'd finally passed.
` },
middle: { id: 'end.coda.vera.middle', s: `
## VERA | The platform
@set station!
@mood noir
~rain off
> Vera went west in January, alone, to the copy desk in San Francisco. I promised I'd follow when the trial was over.
> She kissed me on the platform and got on the train, and didn't look back, the way she'd always said she wouldn't.
> The trial's been over a while now. The ticket's in my coat. Some days I take it out and look at it.
` },
worst: { id: 'end.coda.vera.worst', s: `
## VERA | One word
@set apartment!
@mood blue
~rain window
> Vera went west alone, after the election, the way she'd said she would.
?vera_saved_herself > She'd always been able to save herself. In the end, she did.
> In March, a postcard. The Golden Gate in fog. One word on the back, circled in red pencil: goodbye.
> It's the only red pencil in this whole story that wasn't his.
` }
},
nora: {
best: { id: 'end.coda.nora.best', s: `
## NORA AND TOMMY | The wedding
@set street!
@mood warm
~rain off
> In April, Nora married Walt Kessler at St. Agnes. I gave her away. Walt cried more than the Notary ever did.
> Tommy stood beside Walt in a borrowed suit two sizes too big, and told me on the church steps what he was going to be.
TOMMY: A reporter, Uncle Dash. A real one. The kind that gets it right the first time.
` },
middle: { id: 'end.coda.nora.middle', s: `
## NORA AND TOMMY | Opening day
@set ballpark!
@mood noir
~rain off
> The wedding happened in April. Tommy stood at the back of the church and watched everything, the way I used to watch everything.
> He didn't say much that spring. I took him to the ballpark anyway, opening day. He kept score in a little book, very neatly, and didn't miss a play.
` },
worst: { id: 'end.coda.nora.worst', s: `
## NORA AND TOMMY | Sundays
@set penitentiary!
@mood blue
~rain off
> Tommy's record caught up with him. Reform school, upstate. The same one Sal did his three years in.
> I visit on Sundays. We sit in the yard and don't say much.
DASH: I'm not going to let you become a record, Tommy. You hear me? Not you.
> He nodded. He'd heard it before. So had I, from a better man than me, a long time ago.
` }
},
bottle: {
best: { id: 'end.coda.bottle.best', s: `
## THE BOTTLE | The sink
@set bar!
@mood warm
~rain off
> After the trial, the Last Word was sold for the licence. Before they took the keys, I went in one last time.
> I took the last bottle of Sal's good rye off the shelf and poured it down the sink behind the bar myself, all of it, slowly.
> It took a long time. I didn't hurry. Sal never hurried with that bottle either.
` },
middle: { id: 'end.coda.bottle.middle', s: `
## THE BOTTLE | The glove box
@set street!
@mood noir
~rain light
> I cut down. Mostly. Coffee at the counter, beer on Sundays, nothing after midnight.
> There's still a flask in the glove box of my car. I don't open it. I don't throw it away either.
` },
worst: { id: 'end.coda.bottle.worst', s: `
## THE BOTTLE | A stranger
@set street!
@mood blue
~rain heavy
> I drink at a place on Water Street now. I don't know its name. The man behind the bar doesn't know mine.
> He pours when I ask. He never pours before I ask. He has never once asked me what time I got home.
` }
}
};

const CLOSE = { id: 'end.close', s: `
@set hearing!
@mood blue
~rain off
RUTH: Is there anything you'd like to add to the record, Detective?
DASH: No, Ruth. That's how it went.
?endBad > She typed the last line. Then her hands stopped on the keys, and stayed there.
?!endBad > She typed the last line, read it back to herself, and drew the sheet out of the machine.
~paper THE RECORD OF DASH LEXINGTON|Ten sessions. Closed, February 1949.
?!endBad ~gstamp THE RECORD IS COMPLETE
?endBad ~stamp INSUFFICIENT RECORD
` };

export const THREAD_ORDER = ['pop', 'vera', 'nora', 'bottle'];

// The scenes of an ending, in play order. tiers: save/progress.js threadTiers() ({ pop: { tier }, ... }).
export function endingScenes(ending, tiers) {
  if (ending === 'egg') return [EGG];
  return [CASE[ending], ...THREAD_ORDER.map(t => CODA[t][tiers[t].tier]), CLOSE];
}
// Every ending scene, for the checker and tests.
export const ALL_ENDING_SCENES = [...Object.values(CASE), EGG, ...THREAD_ORDER.flatMap(t => Object.values(CODA[t])), CLOSE];
