// Chapter 7 outro beats and the interlude. Bible §4, §6, §7.3.
// Catch (fast/slow) sets records_saved; the near beat sets briggs_out and penny_free. Every won beat sets up chapter 8's hook: Quist's
// hidden signature is on one more document, a ferry ticket booked for Vera Lexington.

export const BEATS = {
fast: [
{ id: 'c07.beat.fast.a', chapter: 7, s: `
~story records_saved
@set bar!
@mood warm
> Mags went through Quist's handbag at Sal's back-room table, item by item, with tweezers. Lipstick. A brush. A ferry ticket, folded once.
MAGS: Blackwell Island ferry. December first, six AM. One passenger.
DASH: Whose name?
MAGS: Vera Lexington. And there, in the punch hole. Two letters. M.Q. She forged it, Detective. She signed your wife's ticket.
@set hearing!
@mood blue
~rain off
RUTH: You'd never seen that ticket before.
DASH: Neither had Vera. That was the trouble.
~paper SESSION SEVEN · ADJOURNED|Witness to resume. Next: "Next of Kin."
` },
{ id: 'c07.beat.fast.b', chapter: 7, s: `
~story records_saved
@set precinct!
@mood gold
> Briggs got his chair back at eight, ate a peppermint, and signed for Quist's effects himself. One of them made him stop chewing.
BRIGGS: Lexington. A ferry ticket. Blackwell Island, the first of December. "V. Lexington."
DASH: Vera doesn't go to Blackwell Island. Nobody does, unless they're sent.
BRIGGS: There's a tiny M.Q. worked into the ferry company's crest. She made this. For your wife.
@set hearing!
@mood blue
~rain off
RUTH: Captain Briggs was reinstated that morning.
DASH: He was. I'd have traded it for that ticket never existing.
` }
],
slow: [
{ id: 'c07.beat.slow.a', chapter: 7, s: `
~story records_saved
@set vault!
@mood noir
> The crates went back to the Hall of Records on six trucks, with Fosdick riding in the first one. Mags stayed behind with Quist's portfolio.
MAGS: Detective. Her last piece of work. It's not a deed.
> A ferry ticket. Blackwell Island, six AM, the first of December. Passenger: Vera Lexington. Two initials in the ferry company's flag.
@set hearing!
@mood blue
~rain off
RUTH: Did you tell your wife?
DASH: I told her to be careful. She told me she always was. She was right. It didn't help.
` },
{ id: 'c07.beat.slow.b', chapter: 7, s: `
~story records_saved
@set precinct!
> Penny Ashcroft emptied her desk under Dooley's eye. At the bottom of the drawer, under her commendation, a ferry ticket.
DOOLEY: Dash. Blackwell Island ferry. "V. Lexington." There's a little M.Q. in the anchor.
DASH: Who was it for?
DOOLEY: It's a one-way, Dash. Nobody buys a one-way for themselves to Blackwell Island.
@set hearing!
@mood blue
~rain off
RUTH: The dispatcher had it.
DASH: The dispatcher knew where every car in the city was. Including mine. Including my wife's.
` }
],
near: [
{ id: 'c07.beat.near.a', chapter: 7, s: `
~story briggs_out
~story penny_free
@set bar!
@mood blue
> The wire cleared, Penny Ashcroft vanished, and Briggs went back to his kitchen to wait for a hearing nobody would schedule.
> All I had was the Forger's handbag. Mags emptied it on Sal's table. Among the brushes, a ferry ticket.
MAGS: Blackwell Island. December first, six AM. Vera Lexington. Signed in the punch hole.
@set hearing!
@mood blue
~rain off
RUTH: The Captain stayed suspended.
DASH: Until the count. City Hall needed somebody to blame for a city it had just lost on paper.
` },
{ id: 'c07.beat.near.b', chapter: 7, s: `
~story briggs_out
~story penny_free
@set apartment!
@mood sick
BRIGGS: Penny's car's in the river and Penny isn't. I'm still suspended. And you've got that look, Lexington.
DASH: Quist had a ferry ticket in her bag. Blackwell Island. In Vera's name.
BRIGGS: Then forget the city for a week. Watch your wife.
@set hearing!
@mood blue
~rain off
RUTH: Officer Ashcroft was never found?
DASH: Not then. She knew where every car in the city would be. She'd always known.
` }
],
escaped: [
{ id: 'c07.beat.escaped.a', chapter: 7, s: `
@set hearing!
@mood blue
~rain off
> I told it to the end: the stamp, the sale, forty dockworkers walking home.
> Ruth's hands stopped. Through the window, the snow was settling on City Hall, which the city still owned.
RUTH: Detective. Pier Nine's lease is in the exhibits. With the city's seal.
DASH: Strike that. That's not how it went.
~paper SESSION SEVEN · RESUMED|The witness will begin again.
` },
{ id: 'c07.beat.escaped.b', chapter: 7, s: `
@set hearing!
@mood violet
~rain off
RUTH: So the Forger sold the city.
DASH: That's what I said.
RUTH: Then who owns the building we're sitting in, Detective?
DASH: Strike that. That's not how it went. And the Index would have reissued her word by morning. It always does, when somebody runs.
> Ruth threaded a clean sheet. She didn't sign it. She never signs anything.
~paper SESSION SEVEN · FROM THE TOP|Wire Transfer. Again.
` }
]
};

// "Runaway" (bible §7.3, Nora and Tommy): Tommy runs away after Nora announces she's marrying Walt. Kept: Dash finds him at the burned
// waterfront warehouse where Dash and Sal used to play. Late: Nickel finds him. Missed: a patrolman picks him up, the way Pop once picked
// up Sal; Tommy has a record now.
export const INTERLUDE = {
kept: [
{ id: 'c07.inter.kept', chapter: 7, s: `
~fade
@set hearing!
@mood blue
~rain off
RUTH: That's not in the record, Detective.
DASH: Good. I'd like one thing that happened to him to stay out of a record.
~fade
## RUNAWAY | The next evening
@set ruins!
@mood warm
~rain off
> Nora called at five: she'd told Tommy she was marrying Walt, and Tommy had walked out the door without his coat.
> I knew where to look. I don't know how I knew. The old warehouse on the waterfront, burned out since before he was born. Where Sal and I used to play.
TOMMY: How'd you find me?
DASH: I used to come here. When I was your age.
TOMMY: Walt's okay. He's just not my dad.
DASH: Nobody's going to be your dad, Tommy. Walt just wants to stand next to you. Let him.
> We walked home along the river with my coat around his shoulders. He didn't ask what happened to the warehouse. I didn't tell him.
` }
],
late: [
{ id: 'c07.inter.late', chapter: 7, s: `
~fade
## RUNAWAY | The next night
@set street!
@mood noir
~rain light
> Tommy ran away the night Nora told him about Walt. I was asleep. Nora's calls went to the precinct.
> At ten o'clock, Nickel walked into the Last Word with Tommy by the sleeve, both of them soaked.
NICKEL: Found him at the old burned warehouse on the waterfront, mister. Sitting on a beam, throwing rocks.
DASH: How'd you know to look there?
NICKEL: Everybody runs to the warehouse, mister. It's where you go when there's nowhere.
TOMMY: You weren't looking for me, Uncle Dash.
> He was right. I took him home. On the walk, he talked to Nickel the whole way, and not once to me.
` }
],
missed: [
{ id: 'c07.inter.missed', chapter: 7, s: `
~fade
## RUNAWAY | Two nights later
@set precinct!
@mood blue
~rain window
> Tommy ran away when Nora told him about Walt. I didn't hear about it until he was already found.
> A patrolman picked him up at two in the morning, prowling the burned warehouse on the waterfront. He wrote him up. Trespassing.
NORA: He's got a record, Dash. He's eleven, and he's got a record.
DASH: I'll talk to the sergeant.
NORA: It's written down. Talk all you like. It's written down.
> I read the patrolman's report on the precinct counter. The address of the warehouse. The boy's age. It read like another report, an older one, that I'd never been allowed to see.
` }
]
};
