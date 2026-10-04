# Scene script reference

Every cutscene in Wordle Noir is a plain-text script in the `s` field of a scene object, `{ id, chapter, s: \`...\` }`,
inside a **scene pack**: `public/js/content/random/` for Random Case (chapter 0), and `public/js/content/chapters/cNN/` for story chapters (`c01`…`c10`), and `public/js/content/endings/` for the endings.
The engine (`public/js/cinema/player.js`) runs it one line at a time.
Blank lines and lines starting with `//` are ignored. Run `npm run check` after editing to catch typos.

**Scene IDs are permanent.** Save data records scenes by ID, so never renumber, rename or reuse one. A new scene takes the next free number
or letter in its pool (e.g. after `rnd.core.2-1.03` comes `rnd.core.2-1.04`). The full scheme is in [DEVELOPMENT.md §1.5](DEVELOPMENT.md).
The same text can't appear in two packs: story chapters are written fresh.

## Lines

| Line | Effect |
|---|---|
| `> text` | Narration caption (Dash's voice-over). Any unrecognized line is also treated as narration. |
| `NAME: text` | Dialogue. `NAME` must be a key in `content/cast.js` (e.g. `DASH`, `BRIGGS`, `WORD`). |
| `!!@NAME TEXT` | Anime-style cut-in with that character's eyes. `!!TEXT` without a name shows the band only. Plays a low sting (the character's `sting` in `cast.js`, else a random one). A second cut-in within 8 s comes in softer and a third is silent. Budget: at most one per scene, in about 20% of scenes (`npm run check` warns). |
| `** text` | Heavy line: words slam onto the screen one at a time. |
| `## TITLE \| subtitle` | Full-screen title card. |
| `%%LEFT \| RIGHT` | Versus screen: the detective vs. the word. It has its own heavier hit, so a cut-in right after it plays soft. |
| `_word_` | Emphasis inside narration or dialogue. |

## Directives

| Directive | Effect |
|---|---|
| `@set place` | Cut to a location (`public/js/art/sets/`). Inside a core scene, the first `@set` also gets a random establishing line from `openers.js`. |
| `@set place!` | Same, but never adds an establishing line. |
| `@mood name` | Colour grade and music: `noir` `warm` `gold` `blue` `red` `sick` `violet`. |

## Commands

| Command | Effect |
|---|---|
| `~fade` / `~black` | Fade to black (the next visible line fades back in). |
| `~shake` `~flash` `~lightning` `~heart` | Camera shake, white flash, lightning + thunder, heartbeat + red pulse. |
| `~rain heavy\|light\|window\|off` | Override the set's rain. |
| `~sfx name` | Play a sound: `ring` `hangup` `thunder` `whistle` `siren` `telegraph` `foghorn` `sting` `versusHit` `boom` `stamp` ... (any method on `AU` in `audio/audio.js`). |
| `~wait ms` | Pause. |
| `~flag name` | Set a flag for the rest of the case. |
| `~story name` | Story chapters only: set a campaign flag. It's kept if the chapter is won and dropped if the attempt is lost (bible §10 rule 7 lists them). |
| `~stamp TEXT` / `~gstamp TEXT` | Red / green rubber stamp. |
| `~paper LABEL\|TEXT` | A typed sheet of paper. |
| `~clue` | The informant's evidence card (only meaningful in informant scenes). |
| `~legend` | The gray/yellow/green tutorial. |
| `~tight` / `~loose` | Widen / restore the letterbox bars. |
| `~push` | Slow push-in on the current background. |

## Conditions

Prefix a line with one or more conditions; it only plays if all are true.

```
?vera_gone > Her side of the closet was empty.
?!suspended DOOLEY: Five suspects, Dash.
?n>1?n<=6 PETE: That's a short line-up.
```

`?key` (truthy) · `?!key` (falsy) · `?key=3` `?key>3` `?key<3` `?key>=3` `?key<=3`.
A key can be a flag set by `~flag`, a campaign flag set by `~story`, or any variable below. Story endings use `?g>=5` (the near miss) to show
what a late catch still costs.

## Variables

Write `{name}` anywhere in a line. Which ones exist depends on where the script plays:

- **Intros** (`intros.js`, `intro-tail.js`): `{caseNo}` `{date}` `{victim}` `{singer}` `{pier}` `{caseTitle}` `{time}` `{time0}`…`{time6}`
- **Rounds and endings** (cores, openers, win, loss): everything above, plus
  `{guess}` `{GUESS}` `{g}` (guess number) `{left}` `{greens}` `{yellows}` `{grays}` `{hits}`,
  word forms `{hitsN}` "two letters", `{greensN}` `{yellowsN}` `{graysN}` `{leftN}` `{leftW}`
  and capitalized versions `{HitsN}` `{GreensN}` ...,
  `{time}` (now) `{nextTime}` `{ANSWER}`
- **Story chapters** add to every scope: `{chapterNo}` `{chapterTitle}` `{culprit}` `{alias}` `{crime}` `{deadline}`.
- **Endings** (`content/endings/`) get only `{total}` (the run's guesses) and, for conditions, `popTold` `popHalf` `popLetter` (how chapter 8's
  interlude went), `veraWorst`, `endBad`, plus the run's story flags.
  **Interludes** get only those (they happen the day after, outside the case).
- **Informants** (`informants.js`): everything above, plus
  `{n}` `{nN}` `{NWORDS}` `{FIT}` (words still possible), `{topL}` `{topPct}` (likeliest letter),
  `{posL}` `{posPct}` `{posOrd}` `{POSORD}` `{posArt}` (likeliest letter in a position), `{dblPct}` (chance of a double letter)

## Skipping and seen scenes

Each scene plays as its own segment. When it finishes, its ID is marked **seen**, and a seen scene can be skipped next time
(SKIP ▸▸, Esc or Space, or automatically, depending on Settings). A skipped scene still applies its state: `~flag`, `@set`, `@mood`,
`~rain` and `~tight`/`~loose` run silently, and nothing else is shown or heard. So:

- Anything a later scene depends on must be a flag, not something the player only saw.
- An informant's `~clue` card is also written to the board's case notes before the scene plays, so skipping never hides a clue.
- The round's closing title card belongs to the round's last scene and is skipped with it.

## How scenes are chosen

Pools are fields of the pack (file in `content/random/` in brackets):

1. **Intro**: one of `intros` (`intros.js`; never repeats until all have played), then `tail` (`tail.js`).
2. **After each wrong guess** `g` (1–5): a scene from `cores['g-bucket']` (`cores/suspect-g.js`), where bucket is
   0 = no hits, 1 = 1–2 hits, 2 = 3–4 hits, 3 = all five letters in the wrong order.
   Then maybe one of `informants`, then a title card with a line from `closers`.
3. **Win**: one `win.climax` + one `win.epi[guesses used]` (`win.js`).
4. **Loss**: one `loss.climax` + one `loss.epi[bucket of the last guess]` (`loss.js`).

Story chapters (`chapters/cNN/`, files: `intros.js`, `cores.js`, `informants.js`, `endings.js`, `beats.js`, `lines.js`) work the same way, plus:

5. **Outro beat** after the ending: `beats.fast` (won on guess 1–2), `beats.slow` (3–4), `beats.near` (5–6), or `beats.escaped` after a loss.
   Won beats return to the hearing room and set up the next chapter's hook; the escaped beat is the retelling ("Strike that.").
6. **Interlude** after a won chapter (1–9): `interlude.kept`, `.late` or `.missed`, by when Dash got home (bible §7). Interludes are quiet:
   no `!!`, `%%`, `**` or `~clue` (the checker enforces it).
7. **Retries** avoid every scene a failed attempt played, so every slot needs at least two scenes (`npm test` enforces it for written chapters).

To preview a single scene, start a case and run `NOIR.play(NOIR.scene('rnd.core.1-0.02').s, { vars: {}, flags: {} })` in the console.
`npm run check -- --coverage` shows how many scenes each pool has.
