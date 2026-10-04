// Chapter 5 outro beats and the interlude. Bible §4, §6, §7.1.
// A catch (fast/slow) sets index_half: half the Index is in evidence. Every won beat sets up chapter 6's hook: the Index lists a target,
// the Hall of Records, "to be corrected by fire". The interlude carries this chapter's easter-egg seed (Pop, bible §9).

export const BEATS = {
fast: [
{ id: 'c05.beat.fast.a', chapter: 5, s: `
~story index_half
@set precinct!
@mood warm
> We opened the trunk in the evidence room at seven with the FBI watching. Typed pages, in folders, alphabetical. Half the Index. Volume two.
DOOLEY: There's a list in the back, Dash. "Targets."
DASH: Read the first one.
DOOLEY: "Hall of Records. To be corrected by fire."
@set hearing!
@mood blue
~rain off
RUTH: The Index was entered into evidence that morning?
DASH: Half of it. The other half was still out there somewhere, being written.
~paper SESSION FIVE · ADJOURNED|Witness to resume. Next: "Short Fuse."
` },
{ id: 'c05.beat.fast.b', chapter: 5, s: `
~story index_half
@set station!
@mood gold
> Briggs pinned a commendation to Dooley's coat on Platform Nine, in front of the FBI, the railroad, and a shoeshine boy who clapped louder than anybody.
DOOLEY: Dash. I read the back page of the trunk. There's a list of jobs. The first one's the Hall of Records.
DASH: What kind of job?
DOOLEY: "To be corrected by fire."
@set hearing!
@mood blue
~rain off
RUTH: Sergeant Dooley got his commendation.
DASH: He got the commendation. He wanted the shield. There's always a difference.
` }
],
slow: [
{ id: 'c05.beat.slow.a', chapter: 5, s: `
~story index_half
@set precinct!
@mood noir
> By the time the FBI had signed for the trunk, the sun was up and I'd read every page of it twice. Half the Lexicon, typed, in the Professor's voice.
> On the last page, a list. TARGETS. The first one had a date pencilled next to it, and a word.
DASH: Hall of Records. "To be corrected by fire."
DOOLEY: When?
DASH: Soon enough that they wrote it in pencil.
@set hearing!
@mood blue
~rain off
RUTH: And the Professor?
DASH: I didn't call him. I wanted to. That was the first time I didn't.
` },
{ id: 'c05.beat.slow.b', chapter: 5, s: `
~story index_half
@set station!
> The express left without its trunk. Nickel shined my shoes on the house while Dooley read me the last page of the Index out loud.
DOOLEY: "Hall of Records. To be corrected by fire."
NICKEL: That's a bad one, mister.
DASH: They're all bad ones, kid. This one's just bigger.
@set hearing!
@mood blue
~rain off
RUTH: You went to see your father after that.
DASH: I went to see my father. He wanted his shoes done.
` }
],
near: [
{ id: 'c05.beat.near.a', chapter: 5, s: `
@set station!
@mood blue
> The trunk went north without its Courier. But Greer's pages were still in my coat, and Brandt had a pocket diary, and both of them said the same thing.
DASH: Hall of Records. "To be corrected by fire."
DOOLEY: Whoever took the trunk off at the first stop has the rest of the list.
DASH: Then they've got the date, and we don't.
@set hearing!
@mood blue
~rain off
RUTH: The Index was never recovered?
DASH: Not that half, Ruth. Not by me.
` },
{ id: 'c05.beat.near.b', chapter: 5, s: `
@set precinct!
@mood sick
BRIGGS: The trunk's gone. The Courier's in my cell, very politely refusing coffee.
DASH: The porter's pages had a target. Hall of Records. "To be corrected by fire."
BRIGGS: Then we'd better know when, Lexington.
DASH: Brandt knows.
BRIGGS: Brandt says he never reads what he carries. I'm starting to believe him. That's the worst part.
@set hearing!
@mood blue
~rain off
RUTH: You didn't go home that morning.
DASH: I went to my father's. Late. I always went late.
` }
],
escaped: [
{ id: 'c05.beat.escaped.a', chapter: 5, s: `
@set hearing!
@mood blue
~rain off
> I told it straight: the express, the hat raised in the window, Nickel stopping at the end of the platform.
> Ruth's hands came off the keys.
RUTH: Detective, the trunk from car nine is Exhibit Fourteen. It's in the next room.
DASH: Strike that. That's not how it went.
~paper SESSION FIVE · RESUMED|The witness will begin again.
` },
{ id: 'c05.beat.escaped.b', chapter: 5, s: `
@set hearing!
@mood violet
~rain off
RUTH: So the Courier went north.
DASH: That's what I said.
RUTH: The FBI has him in a federal prison in Lewisburg, Detective. He sends the warden very polite letters.
DASH: Strike that. That's not how it went. He'd have had a new word by then anyway. They give a new one to any man who runs.
> Ruth threaded a clean sheet. Outside, the snow had started again, like somebody shaking out a tablecloth.
~paper SESSION FIVE · FROM THE TOP|Express. Again.
` }
]
};

// "The Good Shoes" (bible §7.1, Pop's thread): Pop is home, weak, and wants his shoes shined. He starts: "About the warehouse..."
// Kept: Dash lets him start, then the phone rings. Late: Dash changes the subject. Missed: Pop tells Tommy instead.
// Every variant carries the egg seed (bible §9): "You always did know how things would turn out, son."
export const INTERLUDE = {
kept: [
{ id: 'c05.inter.kept', chapter: 5, s: `
~fade
@set hearing!
@mood blue
~rain off
RUTH: That's not in the record, Detective.
DASH: Put it in. He'd want it in. He was a cop.
~fade
## THE GOOD SHOES | The next morning
@set kitchen!
@mood warm
~rain off
> Pop was home from St. Jude's, thinner, in his old cardigan. He had his patrolman's shoes on the kitchen table and a tin of polish he couldn't open.
POP: Give me a hand, kid. My fingers have retired.
> I shined them while he watched. He hadn't called me kid since I was ten.
POP: You always did know how things would turn out, son. Even when you were small.
POP: About the warehouse. That night in '31. There's a thing I've been carrying, and I'd like to set it down.
~sfx ring
> The phone in the hall. The precinct. By the time I came back, he'd put the shoes on and was looking out the window, and the moment had gone back wherever it lives.
` }
],
late: [
{ id: 'c05.inter.late', chapter: 5, s: `
~fade
## THE GOOD SHOES | The next afternoon
@set kitchen!
@mood noir
~rain off
> I got to Pop's at four, after sleeping through the morning. He'd tried to do the shoes himself. There was polish on the oilcloth and on his cuffs.
POP: Don't fuss. Just finish them.
> I finished them. He watched my hands the way he used to watch suspects.
POP: You always did know how things would turn out, son. Even when you were small. About the warehouse...
DASH: Pop, did you hear they're putting lights in at the ballpark?
> He looked at me for a long time. Then he talked about the ballpark. We both did, for an hour, and neither of us cared about the ballpark at all.
` }
],
missed: [
{ id: 'c05.inter.missed', chapter: 5, s: `
~fade
## THE GOOD SHOES | The next day
@set kitchen!
@mood blue
~rain off
> I didn't make it to Pop's. Nora sent Tommy over instead, with a sandwich and orders to sit.
> Tommy told me about it a week later, at Sunday dinner, getting half of it wrong.
TOMMY: Grandpa made me shine his cop shoes. He said you always knew how things would turn out, even when you were little. Then he told me a story about a fire.
DASH: What fire?
TOMMY: A warehouse. Somebody went to jail for it, but not the right somebody. I think. He fell asleep in the middle.
> Tommy shrugged and reached for the potatoes. I didn't eat anything else that night.
` }
]
};
