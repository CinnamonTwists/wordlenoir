// Chapter 6 outro beats and the interlude. Bible §4, §6, §7.2.
// Won beats set up chapter 7's hook: the moved records went to a bank vault, booked under a forger's name. The near beat sets dooley_hurt.

export const BEATS = {
fast: [
{ id: 'c06.beat.fast.a', chapter: 6, s: `
@set precinct!
@mood warm
> Pike's pockets held millet, a photograph of his platoon, and a trucking receipt for two hundred crates, delivered last Tuesday.
DOOLEY: First Municipal Trust. Vault three. Leased to an M. Quist.
DASH: Who's M. Quist?
MAGS: I'll tell you in an hour. Nobody leases a bank vault in their own name unless they want to be found, or they're very good at being somebody else.
@set hearing!
@mood blue
~rain off
RUTH: The canary, Detective. For the record.
DASH: Beatrice. Dooley took her home. She's still singing, in his kitchen, second shelf. She likes the millet.
~paper SESSION SIX · ADJOURNED|Witness to resume. Next: "Wire Transfer."
` },
{ id: 'c06.beat.fast.b', chapter: 6, s: `
@set records!
@mood gold
> Pruitt locked the Hall of Records at six, on the dot, the way he had for thirty-one years. Then he handed me the requisition book.
> The trucking firm's copy was stapled to the back. Two hundred crates. Destination: First Municipal Trust, vault three. Leaseholder: M. Quist.
DASH: A name, Dooley. Finally, a name.
DOOLEY: Somebody signed their work.
@set hearing!
@mood blue
~rain off
RUTH: The Captain was commended, Detective?
DASH: The Captain was blamed. City Hall doesn't commend. It just stops blaming you, eventually.
` }
],
slow: [
{ id: 'c06.beat.slow.a', chapter: 6, s: `
@set office!
@mood noir
> The sun came up over a Hall of Records that was still standing and still empty. Mags sat on my desk with the trucking receipts.
MAGS: Two hundred crates to First Municipal Trust. Vault three. Leased in the name of M. Quist.
DASH: Quist.
MAGS: There's a watercolour painter by that name who sells pictures of banks. Pretty ones. Very exact.
@set hearing!
@mood blue
~rain off
RUTH: And Captain Briggs?
DASH: City Hall drafted his suspension that morning. They signed it a week later, when it was convenient.
` },
{ id: 'c06.beat.slow.b', chapter: 6, s: `
@set precinct!
> Pike asked for millet and his phone call. He used the call to ask the desk sergeant to feed his canary. Then he gave me a receipt.
PIKE: For your records, Detective. Since you seem to be short of them.
> First Municipal Trust. Two hundred crates. Vault three, in the name of M. Quist.
@set hearing!
@mood blue
~rain off
RUTH: Mr. Pike helped you?
DASH: He was a soldier, Ruth. Once the order was void, he just wanted to tidy up.
` }
],
near: [
{ id: 'c06.beat.near.a', chapter: 6, s: `
~story dooley_hurt
@set hospital!
@mood blue
~rain window
> Dooley at St. Jude's: forty stitches, a cracked collarbone, and the canary in a cage on his bedside table. The nurses had given up trying to move it.
DOOLEY: Dash. Before I went in for Pruitt's coat, I saw a receipt on his desk. The trucking firm. Two hundred crates.
DASH: To where?
DOOLEY: First Municipal Trust. Vault three. Some name like Quist.
@set hearing!
@mood blue
~rain off
RUTH: The sergeant gave you the lead from a hospital bed.
DASH: He gave me the lead and asked me to feed the bird. He's always been better at this than me.
` },
{ id: 'c06.beat.near.b', chapter: 6, s: `
~story dooley_hurt
@set records!
@mood red
> The Hall of Records smoked into the morning. They'd taken Dooley away in the first ambulance, awake and swearing, which the doctor said was a good sign.
> Pruitt stood beside me on the wet steps with the requisition book under his coat. He'd saved it. It was the only thing he'd saved.
DASH: First Municipal Trust. Vault three. M. Quist.
> Pruitt nodded. Thirty-one years, and he'd finally been asked a question about his books.
@set hearing!
@mood blue
~rain off
RUTH: Sergeant Dooley recovered?
DASH: He recovered. He never lifted that arm over his head again. He said he'd never needed to.
` }
],
escaped: [
{ id: 'c06.beat.escaped.a', chapter: 6, s: `
@set hearing!
@mood blue
~rain off
> I told it to the end: the blast, the fire, the night clerk with the key in his hand.
> Ruth's hands were in her lap. Outside the windows, the snow was coming down on City Hall, which was still standing.
RUTH: Detective. Mr. Pruitt is in the gallery. He's been here every day.
DASH: Strike that. That's not how it went.
~paper SESSION SIX · RESUMED|The witness will begin again.
` },
{ id: 'c06.beat.escaped.b', chapter: 6, s: `
@set hearing!
@mood violet
~rain off
RUTH: The Hall of Records burned, and the bomber walked away.
DASH: That's what I said.
RUTH: I filed my own marriage licence in that building last spring, Detective. It's on my desk. With a stamp.
DASH: Strike that. That's not how it went. He'd have had a new word by then anyway. They give one to anybody who runs.
> Ruth fed a fresh sheet into the machine and smoothed it flat with one hand, the way you'd calm an animal.
~paper SESSION SIX · FROM THE TOP|Short Fuse. Again.
` }
]
};

// "Two Tickets" (bible §7.2, Vera's thread): Vera buys two train tickets west, for after the election.
// Kept: Dash says he'll think about it, and means it. Late: "after this case." Missed: one ticket on the table; the other is gone.
export const INTERLUDE = {
kept: [
{ id: 'c06.inter.kept', chapter: 6, s: `
~fade
@set hearing!
@mood blue
~rain off
RUTH: That's not in the record, Detective.
DASH: It was in my coat pocket for a month. That's close enough.
~fade
## TWO TICKETS | The next morning
@set apartment!
@mood warm
~rain off
> I was home before the milkman for the second time that autumn. Vera was at the kitchen table in daylight with two pieces of cardboard in front of her.
VERA: Two tickets. San Francisco. The fourteenth of December, after the election.
DASH: Two.
VERA: Two, Dash. I'm not asking you to say yes. I'm asking you to think about it. Really think. Not cop-think.
DASH: I'll think about it.
> She looked at me a long time, the way she looks at copy she doesn't trust. Then she slid one ticket across the table. I put it in my coat. I meant it.
` }
],
late: [
{ id: 'c06.inter.late', chapter: 6, s: `
~fade
## TWO TICKETS | The next afternoon
@set apartment!
@mood noir
~rain window
> I got home at noon and slept till four. When I woke up, Vera was sitting on the end of the bed with two train tickets in her hand.
VERA: San Francisco. December the fourteenth. I bought two.
DASH: Vera...
VERA: I know. There's a case. There's always a case.
DASH: After this case. I'll think about it after this case.
VERA: That's what I wrote on the back of yours.
> She put the ticket on my pillow. On the back, in her neat hand: AFTER THIS CASE.
` }
],
missed: [
{ id: 'c06.inter.missed', chapter: 6, s: `
~fade
## TWO TICKETS | The next night
@set apartment!
@mood blue
~rain window
> I came home at dawn and slept through the day. When I got up, the kitchen was dark and there was one train ticket on the table.
> San Francisco. December the fourteenth. One way. In my name.
> There'd been two. I could see the little tear where she'd separated them. The other one was gone, and so was her good coat.
> She was only at her sister's. She came back on Sunday. Neither of us mentioned the ticket. It stayed on the table for a month, like a dish nobody wanted to wash.
` }
]
};
