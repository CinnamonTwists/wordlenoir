// Chapter 1 outro beats (after the ending) and the interlude (the day after). Bible §4, §6, §7.1.
// Beats by result: fast (won on guess 1–2), slow (3–4), near (5–6), escaped (a loss: the retelling, then the night starts over).
// Every won beat ends in the hearing room and sets up chapter 2's hook: the plate's misprints spell LAST CALL, the Last Word.

export const BEATS = {
fast: [
{ id: 'c01.beat.fast.a', chapter: 1, s: `
@set pressroom!
@mood warm
> Before they took the plate away, Vera held it under the lamp and read it backwards, the way it was set.
VERA: Dash. Take the wrong letter out of every headline on the page, in order.
DASH: L. A. S. T... "Last call."
VERA: It's not a time. It's a place.
> There's only one place in this city where last call is a proper noun.
@set hearing!
@mood blue
~rain off
RUTH: The Last Word, Detective?
DASH: The Last Word. My best friend's bar.
~paper SESSION ONE · ADJOURNED|Witness to resume. Next: "Last Call."
` },
{ id: 'c01.beat.fast.b', chapter: 1, s: `
@set precinct!
@mood warm
DOOLEY: Pell's plate, Dash. Evidence wants it, but you ought to see it first.
> Every headline on page one had one letter wrong. Strung together, the wrong letters made two words.
DASH: "Last call."
DOOLEY: Last call where?
DASH: Where do you think, Dooley? There's one bar in this town with a sense of humor.
@set hearing!
@mood blue
~rain off
RUTH: You went home first, Detective?
DASH: I went home first. It was early. That's the part nobody believes.
` }
],
slow: [
{ id: 'c01.beat.slow.a', chapter: 1, s: `
@set street!
@mood noir
> By the time Pell was booked, the milk trucks were out and the press was cold. Vera walked me to the curb with the plate wrapped in newspaper, like fish.
VERA: There's something on it you should see. The misprints spell something.
DASH: Tell me in the morning.
VERA: It is the morning, Dash. They spell "last call."
> I knew the bar. Everybody in the department knew the bar. I'd been drinking there since before I could legally lie about it.
@set hearing!
@mood blue
~rain off
RUTH: And then you went home?
DASH: Eventually. Eventually is a kind of home.
` },
{ id: 'c01.beat.slow.b', chapter: 1, s: `
@set precinct!
> I typed up the arrest with two fingers while the plate sat on my desk, still tacky with ink.
> Somewhere around the third paragraph, I saw it. Every headline had one bad letter. Read in order, the bad letters said LAST CALL.
DASH: Sal's.
> Not because Sal had anything to do with it. Because Sal's was the only place in town where those two words meant anything.
@set hearing!
@mood blue
~rain off
RUTH: The Last Word. For the record.
DASH: For the record.
` }
],
near: [
{ id: 'c01.beat.near.a', chapter: 1, s: `
@set street!
@mood blue
~rain light
> They found the witness at dawn, on the stairs of her boarding house, with the morning paper still folded under her arm.
> Pell was in a cell. The Lexicon had its new hire. I never did find out which one he was.
DOOLEY: The plate, Dash. Vera says the misprints spell something.
DASH: "Last call." I know. I read it on the way down the stairs.
@set hearing!
@mood blue
~rain off
RUTH: Her name, Detective? For the record.
DASH: Put her down as the witness. She'd have hated being in the paper twice.
` },
{ id: 'c01.beat.near.b', chapter: 1, s: `
@set pressroom!
@mood sick
> The press was cold by six. It didn't matter. The first bundles had made it to the street, and the street had made it to the witness.
VERA: Dawn, Dash. They found her at dawn.
DASH: I know.
VERA: Then why did you ask me to tell you?
> I didn't answer. I picked up the plate and read the bad letter in every headline, one by one. LAST CALL.
@set hearing!
@mood blue
~rain off
RUTH: You went home after that?
DASH: No. I went where the plate told me to.
` }
],
escaped: [
{ id: 'c01.beat.escaped.a', chapter: 1, s: `
@set hearing!
@mood blue
~rain off
> I told it the way it happened: the presses, the trucks, the paper on every doorstep in the city.
> Ruth's hands stopped on the keys.
RUTH: Detective, that isn't what you told the papers.
DASH: Strike that. That's not how it went.
> She pulled the sheet out of the machine, folded it once, and threaded a clean one.
RUTH: From the phone call, then.
~paper SESSION ONE · RESUMED|The witness will begin again.
` },
{ id: 'c01.beat.escaped.b', chapter: 1, s: `
@set hearing!
@mood violet
~rain off
RUTH: The record shows the morning edition ran, Detective. And then?
DASH: And then nothing. Strike that.
RUTH: Strike which part?
DASH: All of it. That's not how it went. He had another word by then. They issue a new one to any man who runs.
> Ruth fed a clean sheet into the machine and waited, the way only stenographers and priests know how.
~paper SESSION ONE · FROM THE TOP|Stop the Presses. Again.
` }
]
};

// "Visiting Hours" (bible §7.1, Pop's thread): Nora calls, Pop has had a heart attack. Kept: Dash is there when he wakes.
// Late: Dash makes it as visiting hours end. Missed: Pop asked for him three times. Quiet rules: no cut-ins, no case talk.
export const INTERLUDE = {
kept: [
{ id: 'c01.inter.kept', chapter: 1, s: `
~fade
@set hearing!
@mood blue
~rain off
RUTH: That's not in the record, Detective.
DASH: Put it in anyway.
~fade
## VISITING HOURS | The next afternoon
@set hospital!
@mood warm
~rain off
> Nora called at eleven. Pop's heart had stopped on his kitchen floor and started again in the ambulance. I was at St. Jude's by noon, shaved and everything.
NORA: He keeps asking for "the boy." There's only the one boy, Dash.
> He woke at half past one, looked at me, then at the tray.
POP: Thirty-one years on the force, and this is how they get me. Creamed chipped beef.
DASH: You should have worn a vest, Pop.
POP: You came.
> He laughed, and it hurt him, and he did it anyway. It was the longest we'd talked since Mom's funeral, and we only talked about the beef.
` }
],
late: [
{ id: 'c01.inter.late', chapter: 1, s: `
~fade
## VISITING HOURS | The next evening
@set hospital!
@mood noir
~rain window
> I slept through Nora's first call, and her second. On the third, she didn't say hello.
NORA: It's his heart, Dash. St. Jude's. Visiting hours end at seven.
> I made it at five to seven with my tie in my pocket. The nurse was already closing his door.
DASH: Pop. It's me.
POP: I know who it is. I'd know that step anywhere. Always running.
DASH: I'll come tomorrow.
POP: Tomorrow, then. There's a thing I've been meaning to tell you. Tomorrow.
> The door clicked shut. Through the little window he looked smaller than a man who once arrested half the waterfront.
` }
],
missed: [
{ id: 'c01.inter.missed', chapter: 1, s: `
~fade
## VISITING HOURS | Two days later
@set hospital!
@mood blue
~rain window
> I didn't get Nora's messages until the next night. There were four of them, each one shorter than the last.
> By the time I got to St. Jude's, Pop was asleep, and Nora was asleep in the chair beside him, still wearing her switchboard headset.
NORA: You're here.
DASH: I'm here.
NORA: He asked for you three times. The third time, he asked the nurse if you were dead.
DASH: What did she tell him?
NORA: That she'd check. She was being kind.
> I sat with them till morning. He never woke while I was there. From the way he snored, I knew he'd pull through. I knew that wasn't the point.
` }
]
};
