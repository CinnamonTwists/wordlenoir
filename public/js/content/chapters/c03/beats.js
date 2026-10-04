// Chapter 3 outro beats and the interlude. Bible §4, §6, §7.3.
// Won beats return to the hearing room and set up chapter 4's hook: the Notary's appointment book says WKRN, studio B, 4 AM.
// The near beat sets notary_free (bible amendment: escape consequences move to the near miss).

export const BEATS = {
fast: [
{ id: 'c03.beat.fast.a', chapter: 3, s: `
@set precinct!
@mood warm
> Fairweather's appointment book was in his coat, wrapped in a lace handkerchief. Every page was in that lovely hand.
DOOLEY: Last entry, Dash. Next Wednesday. "WKRN, studio B, 4 AM."
DASH: A radio station at four in the morning.
DOOLEY: What's a notary doing at a radio station?
DASH: Swearing to something nobody can see.
@set hearing!
@mood blue
~rain off
RUTH: WKRN. For the record, that was the station everyone listened to.
DASH: That was the trouble, Ruth. Everyone listened.
~paper SESSION THREE · ADJOURNED|Witness to resume. Next: "Dead Air."
` },
{ id: 'c03.beat.fast.b', chapter: 3, s: `
@set penitentiary!
@mood gold
> Eddie walked out of the State Penitentiary at sunrise in the suit they'd have buried him in. Rosa was at the gate. So were forty dockworkers.
EDDIE: Detective. The little man. He dropped this in the car.
> An appointment book. One page folded down. WKRN, studio B, 4 AM, next Wednesday.
@set hearing!
@mood blue
~rain off
RUTH: You kept the book, Detective?
DASH: I kept the page. Eddie kept the suit. He said he'd get married in it again.
` }
],
slow: [
{ id: 'c03.beat.slow.a', chapter: 3, s: `
@set office!
@mood noir
> The carbon paper from Fairweather's blotter was still in my hat band. In the grey light I could finally read his last appointment.
DASH: "WKRN, studio B, 4 AM." Next Wednesday.
DOOLEY: The radio?
DASH: Somebody at that station needs things sworn to. At four in the morning, when nobody's awake to object.
@set hearing!
@mood blue
~rain off
RUTH: And Mr. Ruiz?
DASH: Went home to his wife. He sends me a bunch of bananas every Friday. I've never had the heart to tell him I hate bananas.
` },
{ id: 'c03.beat.slow.b', chapter: 3, s: `
@set street!
> The sun was coming up over the river when they let Eddie out. He shook my hand with both of his.
EDDIE: You need anything on the waterfront, Detective, you ask for Eddie Ruiz.
> In my pocket, Fairweather's appointment book, open to a page I'd read twenty times: WKRN, studio B, 4 AM.
@set hearing!
@mood blue
~rain off
RUTH: You'd already decided to go.
DASH: I'd decided before I finished reading it. That's the kind of week it was.
` }
],
near: [
{ id: 'c03.beat.near.a', chapter: 3, s: `
~story notary_free
@set penitentiary!
@mood blue
> Eddie Ruiz got thirty days on Doc Fenn's affidavit and a phone call at 5:58. Augustin Fairweather got the rest of his life, wherever he was spending it.
> All he'd left behind was a carbon on his blotter. WKRN, studio B, 4 AM. Next Wednesday.
DOOLEY: He'll miss that appointment, Dash.
DASH: He will. But somebody else is keeping it.
@set hearing!
@mood blue
~rain off
RUTH: Mr. Fairweather was never found?
DASH: He sent a wedding card, years later. Unsigned. It's the only thing he ever didn't sign.
` },
{ id: 'c03.beat.near.b', chapter: 3, s: `
~story notary_free
@set morgue!
@mood sick
FENN: Thirty days, Lexington. That's what a shoulder blade buys you in this state.
DASH: And the Notary's in the wind.
FENN: Struck and running. He left his appointment book in the chapel. I had a look. I'm nosy. It's a professional hazard.
DASH: And?
FENN: "WKRN, studio B, 4 AM." He keeps late hours for a man who cries at weddings.
@set hearing!
@mood blue
~rain off
RUTH: The record shows Mr. Ruiz was later cleared.
DASH: The record took its time. So did I.
` }
],
escaped: [
{ id: 'c03.beat.escaped.a', chapter: 3, s: `
@set hearing!
@mood blue
~rain off
> I told it to the end: the lights dimming at six, Rosa Ruiz at the gate, the bulldog edition with its headline already dry.
> Ruth's hands were in her lap. She wasn't typing.
RUTH: Detective. Mr. Ruiz testified before this jury last week.
DASH: Strike that. That's not how it went.
> She pulled the page and threaded a clean one, and the radiator knocked twice, the way it does.
~paper SESSION THREE · RESUMED|The witness will begin again.
` },
{ id: 'c03.beat.escaped.b', chapter: 3, s: `
@set hearing!
@mood violet
~rain off
RUTH: You're telling the jury the Notary got away, and the dockworker died.
DASH: That's what I said.
RUTH: Detective, Eddie Ruiz is sitting in the hallway outside this room, eating a banana.
DASH: Strike that. That's not how it went. He'd have had a different word by then, anyway. They give a new one to any man who runs.
> Ruth wound a fresh sheet into the machine. She didn't look up. She never has to.
~paper SESSION THREE · FROM THE TOP|Dead Man's Sentence. Again.
` }
]
};

// "The Slips" (bible §7.3, Nora and Tommy's thread): Nora finds betting slips in Tommy's coat. Kept: the ballgame, talking man to man.
// Late: five minutes of lecture on the stoop, then a call. Missed: Dash sends money, and Tommy spends it on cigarettes.
export const INTERLUDE = {
kept: [
{ id: 'c03.inter.kept', chapter: 3, s: `
~fade
@set hearing!
@mood blue
~rain off
RUTH: That's not in the record, Detective.
DASH: My nephew's in it. That's enough for me.
~fade
## THE SLIPS | The next afternoon
@set ballpark!
@mood warm
~rain off
> Nora found the betting slips in Tommy's coat pocket and called me before she called anyone else. I took him to the last exhibition game of the year.
TOMMY: Mom told you about the slips.
DASH: Your mother tells me everything. That's what sisters are for.
TOMMY: Mr. Moss pays me a quarter a run. That's more than the paper route.
DASH: Mr. Moss pays you a quarter so that someday he can own you for a dollar. That's how they start. I know. I was eleven once, with a friend who ran slips.
TOMMY: Was it Uncle Sal?
> I didn't answer. A man hit a ball over the fence and everybody stood up, and I stood up with them, and so did Tommy.
` }
],
late: [
{ id: 'c03.inter.late', chapter: 3, s: `
~fade
## THE SLIPS | The next evening
@set street!
@mood noir
~rain light
> I didn't make it to Nora's until supper was cold. Tommy was on the stoop, waiting for the lecture like a man waiting for a bus.
DASH: Your mother found the slips.
TOMMY: I know.
DASH: Running numbers is how they get you. First it's a quarter, then it's a favor, then one day it's your name on a paper you never signed.
TOMMY: You sound like Grandpa.
> Five minutes. I'd talked for five minutes, which is about four more than I'd planned. Then Nora leaned out of the window with the phone cord stretched across the room.
NORA: Dash. It's the precinct.
> Tommy watched me go back up the stairs. He didn't look disappointed. That was worse.
` }
],
missed: [
{ id: 'c03.inter.missed', chapter: 3, s: `
~fade
## THE SLIPS | Three days later
@set apartment!
@mood blue
~rain window
> Nora's message sat on my desk for three days under a coffee cup. Betting slips in Tommy's coat. Please talk to him.
> I didn't have the time. I put five dollars in an envelope with a note that said Buy something good, and mailed it.
NORA: He bought cigarettes, Dash. A whole carton. He gave half of them to the boys on the corner.
DASH: I'll talk to him.
NORA: You said that on Tuesday.
> She hung up. On the street below, an eleven-year-old was smoking like a grown man, trying it on for size.
` }
]
};
