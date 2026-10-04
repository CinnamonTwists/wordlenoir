// Chapter 9 outro beats and the interlude. Bible §4, §6, §7.4.
// Catch (fast/slow) sets lola_caught. Every won beat sets up chapter 10's hook: the Proofreader is "correcting" everyone who touched the
// count, and Mrs. Kowalski signed as a witness. She's kept safe in every branch, and the rent thread resolves: Dash pays, and she calls
// him "Detective" for the first time.

export const BEATS = {
fast: [
{ id: 'c09.beat.fast.a', chapter: 9, s: `
~story lola_caught
@set apartment!
@mood warm
> I walked Mrs. Kowalski home myself at dawn. On every door in the building, a neat red line through the nameplate. Every tenant who'd volunteered at the count.
> Hers had a line through it too. She looked at it a long time. Then she took a handkerchief and rubbed it off.
DASH: Mrs. Kowalski. Six months. Here. All of it.
> I put the envelope in her hand. She counted it twice, in front of me, the way she does.
KOW: Thank you, Detective.
> Detective. Eleven years in her building. It was the first time.
@set hearing!
@mood blue
~rain off
RUTH: The Proofreader was marking the witnesses.
DASH: One by one. Alphabetically. I'd have one week to find him. I didn't know that yet.
~paper SESSION NINE · ADJOURNED|Witness to resume. Next: "Final Edition."
` },
{ id: 'c09.beat.fast.b', chapter: 9, s: `
~story lola_caught
@set precinct!
@mood gold
> Lola gave a statement, in full costume, to a typist who'd never had such a good morning. One line in it frightened me more than the rest.
LOLA: "Thorne is correcting everyone who touched the count. Clerks, drivers, witnesses. There's a landlady on his list."
BRIGGS: Kowalski. She's your landlady, Lexington.
DASH: Put a car on her building. Two cars.
> That afternoon I paid her six months' rent. She called me "Detective." I nearly sat down.
@set hearing!
@mood blue
~rain off
RUTH: Miss Vance was helpful, in the end.
DASH: Miss Vance was performing, Ruth. It just happened to be the truth that night.
` }
],
slow: [
{ id: 'c09.beat.slow.a', chapter: 9, s: `
~story lola_caught
@set warehouse!
@mood noir
> The real ballots were counted by dawn. Mrs. Kowalski signed the tally sheet and folded up her chair.
> On the back of her witness badge, somebody had drawn a small red line. Neat. Courteous. She hadn't noticed.
DASH: Mrs. Kowalski, you're coming home with me. And you're staying where I can see you.
KOW: Why?
DASH: Because I owe you six months' rent, and I want to pay it in person.
KOW: Then I come, Detective.
@set hearing!
@mood blue
~rain off
RUTH: She called you Detective.
DASH: First time in eleven years. I nearly asked her to say it again.
` },
{ id: 'c09.beat.slow.b', chapter: 9, s: `
~story lola_caught
@set apartment!
> Mrs. Kowalski's door had a red line through her nameplate when we got home. She looked at it, sniffed, and rubbed it off with her sleeve.
KOW: Somebody wrote on my door.
DASH: Somebody who's correcting everyone who touched the count. There's a car outside now. There'll be one outside all week.
KOW: Good. Then you will pay rent while it is there. The neighbors will see.
> I paid her right there in the hall. She called me "Detective" and went inside. I stood in the hall a while.
@set hearing!
@mood blue
~rain off
RUTH: The Proofreader had a list.
DASH: He always had a list. Lists were how I finally found him.
` }
],
near: [
{ id: 'c09.beat.near.a', chapter: 9, s: `
@set warehouse!
@mood blue
> The count stood. Contested. Lola had bowed and gone. In the loading bay, Eddie's men were still guarding six milk crates nobody would open until spring.
> Mrs. Kowalski packed up her knitting. On the back of her witness badge, a neat red line.
DASH: He's correcting the count, Mrs. Kowalski. Everyone who touched it. You're coming home with me.
KOW: I was coming home anyway, Detective. I live there.
> Detective. Eleven years. I paid her the rent at the bottom of the stairs, all of it, and she counted it twice.
@set hearing!
@mood blue
~rain off
RUTH: The election was contested for months.
DASH: Until the spring. By then it didn't matter. By then everything had already happened.
` },
{ id: 'c09.beat.near.b', chapter: 9, s: `
@set apartment!
@mood sick
> Lola was gone. The count was contested. And when I got home, every door in my building had a red line through the nameplate.
> Mrs. Kowalski was on the stairs in her good hat, looking at her own door.
KOW: My name, Detective. Somebody has crossed out my name.
DASH: He's correcting everyone who touched the count. There's a car outside. I'm not leaving.
> I paid her six months' rent right there on the stairs. She took it without counting, which frightened me more than anything.
@set hearing!
@mood blue
~rain off
RUTH: Miss Vance was never found?
DASH: She sent me a postcard from somewhere warm. A theatre bill. She was the lead.
` }
],
escaped: [
{ id: 'c09.beat.escaped.a', chapter: 9, s: `
@set hearing!
@mood blue
~rain off
> I told it to the end: the certificate signed, the swapped boxes counted, a woman bowing on a table to people who didn't know they were her audience.
> Ruth's hands came off the keys.
RUTH: Detective. The Reform slate took office in January. The Mayor is in the gallery.
DASH: Strike that. That's not how it went.
~paper SESSION NINE · RESUMED|The witness will begin again.
` },
{ id: 'c09.beat.escaped.b', chapter: 9, s: `
@set hearing!
@mood violet
~rain off
RUTH: So the Understudy took the city.
DASH: That's what I said.
RUTH: Miss Vance is in the women's house of detention, Detective. She sends the warden notes on her lighting.
DASH: Strike that. That's not how it went. And she'd have taken a new part by then anyway. They always give runners a new word.
> Ruth threaded a fresh sheet. For a second she almost smiled. Then she didn't.
~paper SESSION NINE · FROM THE TOP|The Count. Again.
` }
]
};

// "Last Call" (bible §7.4, the bottle): the night before the finale. Sal pours without asking. Kept: Dash pushes the glass back.
// Late: he holds it a long time, then drinks. Missed: he drinks Sal's whole bottle, and Sal sits with him till dawn.
// Every variant ends on the same line from Sal.
export const INTERLUDE = {
kept: [
{ id: 'c09.inter.kept', chapter: 9, s: `
~fade
@set hearing!
@mood blue
~rain off
RUTH: That's not in the record, Detective.
DASH: It's the last thing that isn't. Let me have it.
~fade
## LAST CALL | Two weeks later. The night before.
@set bar!
@mood warm
~rain window
> The Last Word, closing time, the night before everything. Sal poured without asking, the way he has since 1946. The good rye.
> I looked at the glass for a while. Then I pushed it back across the bar with two fingers, gently, the way Briggs would.
DASH: Not tonight, Sal. Not anymore.
> He looked at the glass. He looked at me. Something went across his face I'd never seen there, and I've known that face since I was eleven.
SAL: Coffee, then.
> He made it. We drank it. He didn't say anything about the glass. When I got up to go, he put his big hand on my shoulder.
SAL: Whatever happens tomorrow, Dash, you're still my best friend.
` }
],
late: [
{ id: 'c09.inter.late', chapter: 9, s: `
~fade
## LAST CALL | Two weeks later. The night before.
@set bar!
@mood noir
~rain window
> The Last Word, closing time, the night before. Sal set the glass in front of me without asking. The good rye.
> I held it. For a long time. Long enough for the ice to go, and the jukebox to finish, and Sal to polish every glass on the shelf twice.
SAL: You don't have to, Dash.
DASH: I know.
> I drank it. Then I put the glass down very carefully, the way you'd set down something that might go off.
SAL: Whatever happens tomorrow, Dash, you're still my best friend.
` }
],
missed: [
{ id: 'c09.inter.missed', chapter: 9, s: `
~fade
## LAST CALL | Two weeks later. The night before.
@set bar!
@mood blue
~rain heavy
> The Last Word, closing time. Sal poured without asking. I drank it without asking. Then I asked for the bottle.
> He gave it to me. He sat down on my side of the bar, which he never does, and watched me drink his whole bottle of the good rye.
DASH: Sal. Why do you always stay?
SAL: Because somebody has to, Dash. Somebody always has to stay with you.
> I fell asleep on the bar around four. When I woke up, the windows were grey, and Sal was still sitting there with his coat over my shoulders.
SAL: Whatever happens tomorrow, Dash, you're still my best friend.
` }
]
};
