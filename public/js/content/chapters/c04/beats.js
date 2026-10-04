// Chapter 4 outro beats and the interlude. Bible §4, §6, §7.4.
// Won beats set up chapter 5's hook: the activation phrase is a timetable. The 6:00 train, tomorrow.

export const BEATS = {
fast: [
{ id: 'c04.beat.fast.a', chapter: 4, s: `
@set studio!
@mood warm
> Mags spread the six o'clock script on the console and read the phrase again, slowly, with a pencil.
MAGS: "Traffic will be light this morning on the river bridges." Detective, the river line is the express out of Union Station.
DASH: And "this morning"?
MAGS: Read the date on the script. It's tomorrow's. She typed it a day early. It's a timetable. The six o'clock train, tomorrow.
@set hearing!
@mood blue
~rain off
RUTH: Miss Delgado became an investigator after that?
DASH: She became a nuisance, Ruth. The best kind.
~paper SESSION FOUR · ADJOURNED|Witness to resume. Next: "Express."
` },
{ id: 'c04.beat.fast.b', chapter: 4, s: `
@set apartment!
@mood warm
> I got home before the milkman. Vera was asleep with the radio in her arms, turned to a station that wasn't there anymore.
> On the kitchen table, Mags had left a note in my coat pocket: THE PHRASE IS A TIMETABLE. 6:00 TRAIN. TOMORROW.
@set hearing!
@mood blue
~rain off
RUTH: And the old friend, Detective? From the dedication?
DASH: I told my wife I didn't know. I told myself the same thing. One of us believed it.
` }
],
slow: [
{ id: 'c04.beat.slow.a', chapter: 4, s: `
@set rooftop!
@mood noir
> Mags and I sat under the dead tower with her thermos and the script between us while the sun came up.
MAGS: It's a timetable. "Light traffic on the river bridges" means the river line is clear. The express. The six o'clock.
DASH: Which six o'clock?
MAGS: The date's on the script. Tomorrow's.
@set hearing!
@mood blue
~rain off
RUTH: The Courier.
DASH: I didn't know to call him that yet. Somebody did.
` },
{ id: 'c04.beat.slow.b', chapter: 4, s: `
@set precinct!
> By four the precinct was full of reporters asking why WKRN had gone off the air. Briggs told them it was a technical fault. He wasn't wrong.
MAGS: Detective. The phrase. It's a timetable. Tomorrow's six o'clock train from Union Station.
DASH: You're sure?
MAGS: I'm an engineer. I'm only ever sure, or quiet.
@set hearing!
@mood blue
~rain off
RUTH: You went home?
DASH: I went home and slept with my shoes on. I'd need them.
` }
],
near: [
{ id: 'c04.beat.near.a', chapter: 4, s: `
@set station!
@mood blue
> At 6:30, a porter at Union Station saw a man in gloves pick up a suitcase from the left-luggage office. Polite, he said. Punctual. Tipped a dollar.
MAGS: The phrase was a timetable, Detective. "Light traffic on the river bridges." The river line's clear. The express.
DASH: This morning's?
MAGS: Tomorrow's. He was picking up the luggage. The ride's tomorrow at six.
@set hearing!
@mood blue
~rain off
RUTH: So the phrase went out.
DASH: It went out. I went after it.
` },
{ id: 'c04.beat.near.b', chapter: 4, s: `
@set studio!
@mood sick
> The chief let Mags out of his office at seven, with an apology and her wrench. She'd been decoding the script on the back of his memo pad.
MAGS: It's a timetable. The express out of Union Station. Six o'clock tomorrow. Whoever heard it this morning has a day to pack.
DASH: Then so do I.
@set hearing!
@mood blue
~rain off
RUTH: Did you sleep, Detective?
DASH: I closed a bar. That's not the same thing, but it's what I had.
` }
],
escaped: [
{ id: 'c04.beat.escaped.a', chapter: 4, s: `
@set hearing!
@mood blue
~rain off
> I told it straight through: the news, the phrase, the woman in silk walking out on a lawyer's arm.
> Ruth's hands stopped. On the bench in the hall, a woman in coveralls was waiting to testify.
RUTH: Detective. Miss Delgado's statement says the station went off the air at 5:59.
DASH: Strike that. That's not how it went.
~paper SESSION FOUR · RESUMED|The witness will begin again.
` },
{ id: 'c04.beat.escaped.b', chapter: 4, s: `
@set hearing!
@mood violet
~rain off
RUTH: So the Announcer read the news, and walked out.
DASH: That's what I said.
RUTH: Half this city remembers waking up to dead air that morning, Detective. My sister among them.
DASH: Strike that. That's not how it went. She'd have had a new word by then anyway. They give one to anybody who runs.
> Ruth threaded a clean sheet, and waited, and the snow kept falling past the windows like static.
~paper SESSION FOUR · FROM THE TOP|Dead Air. Again.
` }
]
};

// "After Hours" (bible §7.4, the bottle): closing time at the Last Word. Sal tells the river story for the first time, and almost says
// something about 1931 before he stops himself. Kept: coffee. Late: two, then home. Missed: Sal puts Dash to bed, like a hundred times before.
export const INTERLUDE = {
kept: [
{ id: 'c04.inter.kept', chapter: 4, s: `
~fade
@set hearing!
@mood blue
~rain off
RUTH: That's not in the record, Detective.
DASH: It should be. It's the only time he ever told it.
~fade
## AFTER HOURS | The next night, closing time
@set bar!
@mood warm
~rain window
~sfx pour
> Closing time at the Last Word. Sal flipped the sign and poured two ryes out of habit. I pushed mine back.
DASH: Coffee, Sal. Tonight just coffee.
SAL: Coffee. Look at you.
> He made it. Then, for no reason I could see, he told me about the river at Volturno, in '43. The current. My pack. His hand on my collar.
SAL: You were heavy, Dash. You were always heavy. Like when we were kids, that night at the...
> He stopped. He picked up a clean glass and polished it.
SAL: Drink your coffee.
> He looked at the cup in my hands like it was a medal. I've never known why.
` }
],
late: [
{ id: 'c04.inter.late', chapter: 4, s: `
~fade
## AFTER HOURS | The next night, closing time
@set bar!
@mood noir
~rain window
~sfx pour
> I made it to the Last Word at a quarter to closing. Sal poured two without asking, and I drank them without arguing.
SAL: You know you never thanked me for the river.
DASH: What river?
SAL: Volturno. October, '43. You went under with a sixty-pound pack. I went in after you.
DASH: I don't remember that.
SAL: No. You don't remember a lot of things, Dash. That's all right. I remember for both of us. Like that night when we were...
> He stopped. He looked at the clock.
SAL: Go home. Vera's waiting.
> She wasn't. But I went.
` }
],
missed: [
{ id: 'c04.inter.missed', chapter: 4, s: `
~fade
## AFTER HOURS | Closing time, and after
@set bar!
@mood blue
~rain heavy
> I closed the Last Word. Then I kept it closed with me inside it, Sal on one side of the bar and the bottle on the other.
SAL: I pulled you out of a river once. Did I ever tell you?
DASH: No.
SAL: Volturno. You were sinking like you meant it. I thought, if I let him go, at least it'll be even. Then I grabbed your collar.
DASH: Even for what?
SAL: Nothing. Forget it. Come on. Up.
> He walked me home with my arm over his shoulders and put me to bed with my shoes off, the way he has a hundred times. He let himself out. He always lets himself out.
` }
]
};
