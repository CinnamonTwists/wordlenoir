// Chapter 4 cores, suspect 3 (around two). Every one carries the midpoint turn (docs/story/bible.md §6): Mags Delgado, the station's
// relief engineer, has been logging the dedications for months, and she wants in.

export const CORES3 = {
'3-0': [
{ id: 'c04.core.3-0.01', chapter: 4, s: `
@set studio
> {GUESS} came up clean. A woman in coveralls and horn-rims came out of the transmitter room with a ledger under her arm.
MAGS: Detective. Margaret Delgado. Relief engineer. Everybody calls me Mags.
MAGS: I've been logging her dedications since June. Every one. Lou was helping me. Now Lou's dead.
DASH: Why didn't you go to the police?
MAGS: I'm a woman with a screwdriver, Detective. Who'd listen? I'm going to the police now. I want in.
` },
{ id: 'c04.core.3-0.02', chapter: 4, s: `
@set rooftop
> {GUESS} was a bust. Up on the roof by the tower, a woman was waiting for me with a thermos and a ledger.
MAGS: Mags Delgado. I keep the transmitter alive. And I keep a list.
DASH: A list of what?
MAGS: Everything Celeste Avery has said into that microphone since June, matched to the obituaries. I want in, Detective. I'm not asking.
` },
{ id: 'c04.core.3-0.03', chapter: 4, s: `
@set office
> {GUESS}: nothing. Then Dooley brought somebody into my office who'd walked across town in coveralls at two in the morning.
MAGS: You're the one she dedicated a song to. I'm the one who logged it.
DASH: Logged it?
MAGS: Six months of logs, Detective. Dates, songs, names, sponsors. Lou and I were going to take it to the papers. I'll take it to you instead. If you let me help.
` },
{ id: 'c04.core.3-0.04', chapter: 4, s: `
@set street
DOOLEY: Dash, there's a dame in coveralls in the back of my car. She says she won't get out until you deputize her.
DASH: We don't deputize people, Dooley.
DOOLEY: I told her. She said, "Then I'll stay in the car." She's got a ledger, Dash. Six months of dedications.
> {GUESS} had come up empty. The ledger hadn't.
` },
{ id: 'c04.core.3-0.05', chapter: 4, s: `
@set bar
> {GUESS}, nothing. At the end of the bar sat a woman with grease on her cuffs, drinking coffee like it owed her money.
SAL: She asked for you by name, Dash. Said she's from the radio station.
MAGS: Delgado. Relief engineer. I've been writing down everything that woman says since June. I need a detective, and you're the only one she's scared of.
` }],
'3-1': [
{ id: 'c04.core.3-1.01', chapter: 4, s: `
@set studio
> {GUESS} gave me {hitsN}. The relief engineer slid her logbook across the console without looking at me.
MAGS: Read June. Then read the obituaries from July. I'll wait.
> I read them. Eleven dedications. Nine funerals. Two missing persons.
MAGS: Lou found the pattern. I found Lou. I want in, Detective.
` },
{ id: 'c04.core.3-1.02', chapter: 4, s: `
@set precinct
BRIGGS: {HitsN}. And who's the woman in the coveralls drinking my coffee?
DASH: Mags Delgado. Engineer at WKRN. She's been logging the dedications for months.
BRIGGS: A civilian.
DASH: A civilian with six months of evidence and a screwdriver, Captain. She's in.
BRIGGS: I didn't hear that.
` },
{ id: 'c04.core.3-1.03', chapter: 4, s: `
@set rooftop
MAGS: {GUESS}? {HitsN}. Not bad for a cop. Here. Look at this.
> A notebook, every page in neat engineer's print: time, song, dedication, sponsor. Six months of murder set to music.
MAGS: Lou and I were going to the Gazette with this on Monday. He didn't make it to Monday.
DASH: Then you're making it with me.
` },
{ id: 'c04.core.3-1.04', chapter: 4, s: `
@set apartment
VERA: There's a woman on the stairs, Dash. Coveralls, glasses, a logbook. She says she's here for the war.
DASH: What war?
MAGS: The one on the radio, Detective. Celeste Avery's. I've been keeping score since June. I want in.
> {GUESS} had {hitsN}. The engineer had everything else, in a ring binder.
` },
{ id: 'c04.core.3-1.05', chapter: 4, s: `
@set street
> {HitsN} out of {GUESS}. A woman stepped out of the WKRN service door and lit a cigarette with a soldering iron.
MAGS: Mags Delgado. I relieve the engineer when he needs to eat. He doesn't need to eat anymore.
MAGS: I've been logging her. Every word. I want in, Detective, or I go to the papers alone.
DASH: Alone gets you a song dedicated to you.
MAGS: I know. That's why I'm here.
` },
{ id: 'c04.core.3-1.06', chapter: 4, s: `
@set morgue
FENN: {HitsN}. And you have a visitor. She's been sitting with Mr. Benning for an hour.
MAGS: He trained me, Doc. I owed him an hour.
MAGS: Detective. He and I logged everything she said for six months. I've got the book. I want in.
` }],
'3-2': [
{ id: 'c04.core.3-2.01', chapter: 4, s: `
@set studio
> {GUESS} lit up {hitsN}. In the transmitter room, Mags Delgado had her logbook open on top of a humming cabinet.
MAGS: She's been doing it since June. Every dedication's a name. Every sponsor's a date.
DASH: You could have been killed, keeping that.
MAGS: Lou was killed for keeping it. So I'm keeping it louder. I want in, Detective.
!!@MAGS I'M IN.
` },
{ id: 'c04.core.3-2.02', chapter: 4, s: `
@set office
> {HitsN} in {GUESS}. Mags spread her logs across my desk like a dealer laying out a hand.
MAGS: June: the bank man. July: the nurse. August: the shipping clerk, Mercer. Remember him?
DASH: The Notary's dead man.
MAGS: She dedicated a song to him a week before he died. "Stand By Me." I want in, Detective. I've earned it.
` },
{ id: 'c04.core.3-2.03', chapter: 4, s: `
@set precinct
BRIGGS: {GUESS}, {hitsN}. Now explain the radio girl in my squad room.
DASH: Engineer, Captain. She logged every dedication since June. Her logs match the morgue.
BRIGGS: Does she know what she's getting into?
DASH: She's already in. She was in before I got there.
` },
{ id: 'c04.core.3-2.04', chapter: 4, s: `
@set rooftop
MAGS: {HitsN}. You're getting close. She's chain-smoking. She only chain-smokes when she's nervous.
DASH: How do you know?
MAGS: Six months of logs, Detective. I log the cigarettes too. I'm thorough. Let me in on this, and I'll show you thorough.
` },
{ id: 'c04.core.3-2.05', chapter: 4, s: `
@set bar
> {GUESS}: {hitsN}. Sal had put Mags Delgado in my booth with a sandwich and her logbook.
SAL: She's been here an hour. She says you two are partners.
DASH: Since when?
MAGS: Since she killed my teacher. I've got six months of her on paper, Detective. You've got the badge. That's a partnership.
` },
{ id: 'c04.core.3-2.06', chapter: 4, s: `
@set street
DOOLEY: {HitsN}, Dash. And the engineer says she can tell you exactly which sentence in the six o'clock news is the order.
DASH: How?
DOOLEY: She's been logging them, she says. For months. She wants in.
DASH: Tell her she's in.
DOOLEY: I already did. She said "obviously."
` }],
'3-3': [
{ id: 'c04.core.3-3.01', chapter: 4, s: `
@set studio
> {GUESS}. Every letter of her, scrambled like a bad signal. Mags turned a dial and Celeste's voice went thin and tinny in the monitor.
MAGS: I can make her sound like anything. I've been listening to her since June. I logged every word.
DASH: Then help me make her sound like her own name.
MAGS: That's why I'm here.
` },
{ id: 'c04.core.3-3.02', chapter: 4, s: `
@set office
> All five, wrong places. Mags had her logs and I had my letters, and between us we had everything but the order.
MAGS: Like a song with the verses shuffled. I log her every night. I know her rhythm.
DASH: Then you're in, Mags. Find me her rhythm.
` },
{ id: 'c04.core.3-3.03', chapter: 4, s: `
@set precinct
BRIGGS: Every letter, and a radio engineer volunteering for a homicide.
DASH: She's been logging the dedications for months, Captain. She wants in.
BRIGGS: Then she's either brave or crazy, Lexington. In this department, that's a promotion.
` }]
};
