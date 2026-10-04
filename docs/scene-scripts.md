# Scene script reference

Every cutscene in Wordle Noir is a plain-text script inside a JavaScript template string
(see `public/js/content/scenes/`). The engine (`public/js/cinema/player.js`) runs it one line at a time.
Blank lines and lines starting with `//` are ignored. Run `npm run check` after editing to catch typos.

## Lines

| Line | Effect |
|---|---|
| `> text` | Narration caption (Dash's voice-over). Any unrecognized line is also treated as narration. |
| `NAME: text` | Dialogue. `NAME` must be a key in `content/cast.js` (e.g. `DASH`, `BRIGGS`, `WORD`). |
| `!!@NAME TEXT` | Anime-style cut-in with that character's eyes. `!!TEXT` without a name shows the band only. |
| `** text` | Heavy line: words slam onto the screen one at a time. |
| `## TITLE \| subtitle` | Full-screen title card. |
| `%%LEFT \| RIGHT` | Versus screen: the detective vs. the word. |
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
| `~sfx name` | Play a sound: `ring` `hangup` `thunder` `whistle` `siren` `telegraph` `foghorn` `sting` `boom` `stamp` ... (any method on `AU` in `audio/audio.js`). |
| `~wait ms` | Pause. |
| `~flag name` | Set a story flag for the rest of the case. |
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
A key can be a flag set by `~flag` or any variable below.

## Variables

Write `{name}` anywhere in a line. Which ones exist depends on where the script plays:

- **Intros** (`intros.js`, `intro-tail.js`): `{caseNo}` `{date}` `{victim}` `{singer}` `{pier}` `{caseTitle}` `{time}` `{time0}`…`{time6}`
- **Rounds and endings** (cores, openers, win, loss): everything above, plus
  `{guess}` `{GUESS}` `{g}` (guess number) `{left}` `{greens}` `{yellows}` `{grays}` `{hits}`,
  word forms `{hitsN}` "two letters", `{greensN}` `{yellowsN}` `{graysN}` `{leftN}` `{leftW}`
  and capitalized versions `{HitsN}` `{GreensN}` ...,
  `{time}` (now) `{nextTime}` `{ANSWER}`
- **Informants** (`informants.js`): everything above, plus
  `{n}` `{nN}` `{NWORDS}` `{FIT}` (words still possible), `{topL}` `{topPct}` (likeliest letter),
  `{posL}` `{posPct}` `{posOrd}` `{POSORD}` `{posArt}` (likeliest letter in a position), `{dblPct}` (chance of a double letter)

## How scenes are chosen

1. **Intro**: one of `INTROS` (never repeats until all have played), then `INTRO_TAIL`.
2. **After each wrong guess** `g` (1–5): a scene from `CORES['g-bucket']`, where bucket is
   0 = no hits, 1 = 1–2 hits, 2 = 3–4 hits, 3 = all five letters in the wrong order.
   Then maybe an informant, then a title card with a line from `CLOSERS`.
3. **Win**: one `WIN_CLIMAX` + one `WIN_EPI[guesses used]`.
4. **Loss**: one `LOSS_CLIMAX` + one `LOSS_EPI[bucket of the last guess]`.
