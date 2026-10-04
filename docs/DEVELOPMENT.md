# Wordle Noir: Development Reference

Working reference for rewriting and extending the game. Part 1 describes the code **as it exists today**
(the modular restructure of the original single-file build). Part 2 is the **roadmap**: every requested
feature with design notes, tasks, and a recommended build order.

Keep this file current. When a roadmap item lands, move what it built into Part 1 and tick it off in Part 2.

Related docs: [README.md](../README.md) (quick start), [scene-scripts.md](scene-scripts.md) (scene language reference).

---

# Part 1: The project today

## 1.1 Snapshot

| | |
|---|---|
| What it is | Wordle variant: one five-letter answer, six guesses, a noir cutscene after every guess. A main menu leads to the **story campaign** (New Game / Continue; all ten
chapters, nine interludes and six endings plus the easter egg), **Chapter Select** (replays chapters and endings found), the **Dossier**, **Random Case** (with a win record) and
**Settings**. Scenes you've seen can be skipped, informant clues collect in **case notes**, and saves can be exported and imported. |
| Stack | Vanilla JS (native ES modules), CSS, inline SVG art, Web Audio synthesis. No framework, no dependencies, **no build step**. |
| Hosting | Cloudflare Workers Builds, Worker `raspy-term-4561`, domain wordlenoir.com. Push to `main` deploys. |
| Persistence | One localStorage key, `wordlenoir.save` (§1.12): settings, seen scenes, the Random Case in progress, the campaign run (chapter attempts, results, story flags), and records that outlive runs (dossier, best results, endings found). |
| Content | Random Case pack (`rnd`): 101 scenes + 31 one-liners. Story packs `c01`–`c10`: 153 scenes each (150 for chapter 10, which has no interlude), at the T8 budget, with ~40 one-liners each. Endings: 6 case endings + the egg, 12 life codas, 1 close (19 scenes). About 1,650 story scenes in all. 35 characters, 27 locations, 2,309 answers, 12,546 extra valid guesses. |
| Average scene | ~357 characters of script. |

## 1.2 Run, test, deploy

```sh
npm run dev      # zero-dep static server for public/ on :8788 (tools/dev-server.mjs)
npm run check    # validates every scene pack, cast stings, cut-in budget + word lists (tools/check-scenes.mjs), exit 1 on errors
npm run check -- --coverage   # ...plus per-pack slot counts against the T8 chapter budget
npm run e2e      # plays real cases in headless Chrome/Edge (tools/e2e.mjs), exit 1 on failure. Needs Node ≥ 22
npm test         # unit tests (node:test, tests/*.test.mjs): save store, schema, codec, snapshots, chapter attempts, story rules (tiers, endings, retry picker, pack slots)
npm run preview  # wrangler dev (Cloudflare's runtime), downloads wrangler on first run
```

- ES modules don't load from `file://`, so always use a server.
- **URL `#speedN`** (e.g. `#speed20`) scales every scripted delay. `#speed400` plays a full case in about a second.
- **Console hook `window.NOIR`**: `S` (state), `speed`, `forceAnswer`, `forceInf` (true = informant every round, false = never),
  `press(key)`, `play(src, ctx)`, `score`, `stats()`, `parseScript`, `ANSWERS`, `ALLOWED`, `VT` (virtual ms played), `MISSING` (unfilled `{vars}`),
  `pack` (the loaded Random Case pack), `scene(id)` (any loaded scene), `save` (the store: `NOIR.save.get()` is the save document, `NOIR.save.reset()` wipes it),
  `setting(key, value)` (saves and applies a setting like the Settings screen does), `screen` (the visible screen: title, menu, chapters, dossier, settings or game),
  `campaign` (`newGame()`, `continueGame()`, `playEnding()`: set `campaign.results` with `NOIR.save.update`, then `playEnding()` resolves to the ending it played).
  `play()` takes a script string or segments: `NOIR.play([{ id: 'A', src: '> one' }, { id: 'B', src: '> two' }], ctx, { skip: id => 'ask', onSegment: console.log })`. Audition one with `NOIR.play(NOIR.scene('rnd.core.1-0.02').s, { vars: {}, flags: {} })`.
- **End-to-end test (`npm run e2e`, about 30 s)**: zero dependencies. It starts the dev server on a free port and launches local Chrome or Edge
  headless (`CHROME=/path` overrides the browser) with `--remote-debugging-port=0` and a throwaway profile. It drives the page over the
  DevTools Protocol at `#speed400` with real clicks and key presses, using `NOIR` to force answers and informants and to read state.
  - Scenarios: title → menu (fresh menu state, a stamped story entry) → first case (an invalid word is refused, then a first-guess win, stats recorded),
    a loss with an informant every round (streak reset), a win on guess 3; an in-game menu round trip (Esc opens/closes it, Main menu → Continue)
    and dropping an open case from the menu (counted as a loss, answer revealed); settings (four changed on the Settings screen, kept across a reload,
    applied to `<html>` and the tile colours, and hard mode refusing a guess that ignores a green); clear all data (type DESTROY → everything reset);
    and three save scenarios: reopen after a reload (rows repainted, answer not readable in the save, seen marks written, finished case cleared),
    reload in the middle of a cutscene (the guess survives and the interrupted scene counts as seen), and blocked storage (the warning toast shows and the game still plays).
    Reopening goes through the menu's Continue, which must name the right suspect.
    Step 6 added: skipping at the player level (a skipped segment's flags survive, its remaining lines never show, the unseen segment after it plays,
    `auto` shows nothing); the Skip setting end to end (Never: no button and the briefing plays; Always: the seen briefing is skipped silently;
    Replay the briefing un-sees it; Ask: the button appears and Esc skips); case notes (an informant clue is listed and survives a reload);
    and a real export → clear all data → import round trip through the downloaded file (plus a malformed paste being refused).
    Step 8 added four story scenarios: New Game → chapter 1 won on suspect 2 (seen marks staged until the win, then committed; the result, dossier and
    answer obfuscation) → the "kept" interlude → chapter 2; a lost chapter retold (rollback, `usedScenes`, no seen marks, the retry avoiding the failed
    attempt's scenes), then reload → Continue → won on attempt 2 → the "late" interlude → chapter 3; a Chapter Select
    replay that leaves the run untouched (D2) plus the dossier's pages; and New Game's "Start over?" guard plus all six endings from forced results.
    Step 9 added a Chapter Select ending replay and **two full campaigns at speed**: all ten chapters won on the first suspect (every interlude
    kept, the catch flags, the easter egg playing alone) and all ten at dawn on suspect 6 (every interlude missed, every near-miss flag, the bad
    ending with the four worst codas and the close). Between them every story flag is exercised both ways. About 85 s in all.
    `--cases N` adds N random cases (random answer, random win guess or loss, random informant setting) for scene coverage.
  - Every scenario asserts the report (verdict, answer tiles, one table row per guess, the record panel, the Main menu button), no exceptions, no `console.error`, no failed same-origin requests,
    and an empty `NOIR.MISSING`. The first failure stops the run.
  - Google Fonts and the analytics beacon are blocked, so it runs offline. `--headed` shows the browser and `--speed N` slows it down.
  - `click(sel)` scrolls the element into view first (the Settings form is taller than the 1280×800 window).
  - When a new mode or screen lands, add a scenario here (F4's second item).
- **Deploy**: `wrangler.jsonc` publishes only `public/`. `name` must stay `raspy-term-4561` or Workers Builds fails.
  The dashboard deploy command must be the default `npx wrangler deploy`.
- The Cloudflare Web Analytics beacon is hard-coded at the bottom of `public/index.html`. Locally it 404s on `/cdn-cgi/rum`. That's expected.

## 1.3 Module map

```
public/js/
  main.js                 Boot (load save, apply settings, set the mode), screen wiring, in-game menu, Esc, window.NOIR
  core/
    util.js               R, pick, clamp, cap, nounN, NUMW, ORD, fmtTime, pickUnused        [DOM-free]
    timing.js             SPEED/setSpeed, sleep(ms), VT, SKIP (skip token); live preference knobs MOTION, FLASH, TEXT (+ TEXT_SPEEDS, OS_REDUCED)
    dom.js                $()
  audio/audio.js          AU: the whole Web Audio synth (buses, sfx, drone music, rain bed, quiet switch), STINGS [DOM-free at import]
  fx/rain.js              RAIN canvas (attach/set/frame), startRain(), startGrain()
  art/
    svg.js                rng(seed), DEFS (gradients/filters), svg(inner), f()               [DOM-free]
    props.js              skyline, lamp, figure, car, smoke, rainStreaks                     [DOM-free]
    portraits.js          bust(opts) dialogue portrait, eyes(color, evil) cut-in band        [DOM-free]
    icons.js              cigarette(state) guess counter                                    [DOM-free]
    sets/*.js             one location per file: { rain, indoor, draw(vars) }                [DOM-free]
    sets/index.js         SETS registry, getSet(name) (unknown → void)
  cinema/                 The cutscene engine
    moods.js              MOOD_MUSIC: mood → drone mode                                      [DOM-free]
    stage.js              C (DOM refs + state), blackIn/Out, lit, hideText, cutToBlack, flashFx, shake, setScene, setMood
    text.js               typeInto (typewriter), narrate, say (portrait + nameplate), emParse (_em_)
    effects.js            cutin, heavy, versus, card, stamp, paper, clue, legend
    player.js             runLine (dispatch), runQuiet (skipped lines), play(segments, ctx, { skip, onSegment }), skipNow, canSkipNow
  script/parser.js        parseScript, condOK, fill, MISSING                                 [DOM-free]
  content/                The story                                                          [DOM-free]
    cast.js               CAST: key → { name, color, bust, sting? }
    names.js              NAMES_M, NAMES_F (for {victim}/{singer})
    registry.js           packId, loadPack(ch) (lazy import, cached), getPack(ch), sceneById(id), scenesOf(pack)
    random/               the Random Case pack (chapter 0): index (assembles the pack), intros, tail, openers,
                          cores/suspect-1..5, informants, win, loss, closers
    chapters/index.js     CHAPTERS: the ten chapters' fixed facts from the bible (culprit, alias, crime, deadline, dossier text, mugshot),
                          `written` flags, chapterInfo(n), isWritten(n), chapterVars(n)
    chapters/cNN/         story chapter packs c01–c10: index (assembles the pack), intros (openings + tail), cores1..5 (one file per suspect
                          number; c01/c02 instead have the step-8 cores.js plus cores-more*.js and more.js), informants, endings (win/loss),
                          beats (outro beats + interlude), lines (openers/closers)
    chapters/merge.js     mergePools(...maps): joins pool maps slot by slot (packs written in more than one batch)
    endings/names.js      ENDING_NAMES, ENDING_ORDER (what the menu needs, without loading the scripts)
    endings/index.js      the ending scenes (end.a … end.bad, end.egg, end.coda.<thread>.<tier>, end.close), endingScenes(ending, tiers),
                          ALL_ENDING_SCENES; loaded on demand by ui/campaign.js
  save/                   Persistence (§1.12)                                               [DOM-free]
    store.js              createStore(), store: load, get(path), update(fn), flush, replace(doc), reset, status, onStatus
    schema.js             VERSION, defaults(), migrate(doc)
    codec.js              hide(word) / reveal(str): answer obfuscation (D6)
    transfer.js           exportText, exportName, parseImport (validate everything first), summarize (roadmap T4)
    progress.js           markSeen, isSeen, recordRandom; campaign: newCampaign, beginAttempt, winAttempt, loseAttempt, avoidFor (D1/D7);
                          story: interludeTier, THREADS, threadTiers, endingFor, endingVars, noteChapterStart/Result, noteRunFinished
  ui/                     Screens around the game (§1.13)
    screens.js            show(name), back(), screen(), onShow(name, fn): one visible screen, a back trail, focus
    menu.js               initMenu(handlers), refreshMenu(stats), continueTarget(): the case-file main menu
    dialog.js             ask({ title, text, yes, no }) → Promise<boolean>: the one yes/no dialog (#modal)
    campaign.js           newGame, continueGame, startChapter, afterWin → interlude → next chapter, startReplay, playEnding, replayEnding, campaignSummary
    casefiles.js          renderChapters(onPick, onEnding) (Chapter Select, with ending replays), renderDossier / dossierStep (one page per culprit)
    settings.js           SPEC, applySettings(), setSetting(k, v), onChange, buildSettings/syncSettings (the form), shouldMuteHidden
  game/
    state.js              S (live binding) + setState, mode/setMode (the active mode), pack() (its scene pack), used (no-repeat sets), DEBUG
    words.js              WORDS {answers, allowed}, loadWords() (fetch), parseWordList        [DOM-free at import]
    scoring.js            score, candidates, stats, bucketOf, hardModeMiss                  [DOM-free]
    board.js              grid/keyboard/clock/cigarettes/memo/toast, revealRow, paintRows (restore), verdictLine
    snapshot.js           snapshot(S) / restore(snap): case state ⇄ save data                [DOM-free]
    case.js               genTimes, genCase, baseVars, guessVars
    informant.js          informant(g, bucket, ctx): maybe returns an informant scene object + sets ctx.clue
    report.js             showReport(onNewCase, { onMenu, stats }): verdict, table, record panel, share text (high-contrast emoji)
    game.js               the session runner: press, attachKeyboard, submit, newCase, resumeCase, dropSaved, savedSummary, hooks, checkpoints,
                          skip policy, case notes (updateNotes, showNotes)
    modes/random.js       RandomMode: the Random Case mode object (scene picks, saving to random.active, stats)
    modes/story.js        createStoryMode(chapter, { replay }): a campaign chapter attempt or a Chapter Select replay; pickFresh (retry picker)
public/css/               base, title, menu, board, cinema, effects, overlays, ambient, prefs (link order = cascade order)
public/data/words/        answers.txt, allowed.txt (one word per line, # comments allowed)
tools/                    dev-server.mjs, check-scenes.mjs, e2e.mjs, migrate-scenes.mjs (one-off, already run)
tests/                    *.test.mjs unit tests for DOM-free modules (npm test)
```

**Dependency direction:** `main → ui → game → cinema → (art, audio, fx, script, content, save) → core`. Only `main.js`, `ui/` and other `game/`
modules import `game/`. Callbacks avoid cycles: `buildKB(onKey)`, `showReport(onNewCase, { onMenu })`, `hooks.toMenu` (set by main.js).

**DOM-free rule:** anything `tools/check-scenes.mjs` imports must not touch `document`/`window` at import time. Keep it that way for all
`content/`, `script/`, `art/`, and pure `game/` logic. New Node tools depend on it.

## 1.4 Runtime flow

```
page load ─ main.js: store.load(), applySettings(), setMode(RandomMode), loadWords() + RandomMode.load() (async), rain/grain, keyboard,
   │         settings form built, street backdrop, heavy rain
   │
"Open the case file" click ─ AU.init() (needs this user gesture), applySettings() (volumes), riff, fade title → show('menu'),
   │         toast if saves aren't being kept
   │
menu ─ Continue: the story run first (continueGame: a pending interlude, then the chapter, resumed or new; the ending after chapter 10),
   │       else an open Random Case (resumeCase)
   │   New Game → "Start over?" if a run exists → newGame(): newCampaign + beginAttempt → startChapter(1) (story mode, §1.13)
   │   Chapter Select → show('chapters') → startReplay(n) · Dossier → show('dossier')
   │   Random Case → enterGame(newCase); an open case with a guess in it asks "Drop this case?" first (Drop: dropSaved() = a loss)
   │   Settings → show('settings') (Back/Esc returns)
   │   enterGame() awaits words + pack, then show('game') (office backdrop, light rain)
   │
board ─ Menu button / Esc (when no scene is playing) → in-game menu: Back to the case, Settings, Sound, Main menu (the case is already saved)
   │
resumeCase() ─ restore(snapshot) → paint the board → back to typing (or straight to the report if that case had ended)
newCase()  ─ mode.newCase() (genCase: pack().intros, no repeat until all 12 used) + vars; setState({..., hard: settings.hardMode}); build grid/kb
   │         play(mode.introScript().segments)  ← [intro, tail] (tail = rules legend + "SIX SUSPECTS" + first title card)
   │         ✓ seen: each segment as it finishes · ✓ checkpoint
   ▼
board: player types ─ press() ─ submit()
   │   invalid length/word, or (hard case) a revealed clue ignored → shake + toast (the row keeps its letters)
   │   guess recorded → final guess? result recorded once (mode.onComplete → random.stats) → ✓ checkpoint (reloading can't take a guess back)
   │   revealRow (interrogation flip) → S.counts.push(candidates) → memo verdict
   │   scenes picked → S.pending = their IDs; an informant's clue → S.notes (case notes) → ✓ checkpoint
   ├─ win  → riff, play(mode.endScript(): win.climax + win.epi[g] [+ story: beats[fast|slow|near]]) → mode.clear() → report (Random Case: the record panel)
   ├─ g==6 → play(mode.endScript(): loss.climax + loss.epi[bucket] [+ story: beats.escaped]) → piano → mode.clear() → report
   │         (story: the report's main button is mode.next: "Next: Chapter n+1" → interlude → next chapter, or "Tell it again" → a new attempt)
   └─ else → play(mode.roundScript(): [core + opener, informant?] with the "## {nextTime} | closer" card on the last one)
              → each finished segment: ✓ seen, dropped from pending, ✓ checkpoint → back to board, memo "Suspect g+1 of 6"
   (during any segment seen before: SKIP ▸▸ / Esc / Space per Settings → Skip seen scenes; see §1.7)
   (win and loss: ✓ seen: climax + epilogue, then random.active is cleared before the report)
```

`play()` always: black screen → run lines → fade to black → hide cinema → reattach rain to the board canvas.
`playScene()` then restores board music (`tense` from guess 4 on, else `calm`).

## 1.5 Key data structures

**Feedback:** `fb` is an array of 5 values, `0` gray (alibi), `1` yellow (in the gang, wrong spot), `2` green. `score(guess, answer)` handles duplicate letters correctly.

**Bucket** (`bucketOf(fb)`): hits = greens + yellows. `0` none, `1` 1–2, `2` 3–4, `3` all five (wrong order). Scene pools are keyed by bucket.

**Case state `S`** (game/state.js, replaced wholesale by `setState` in `newCase`):

| Field | Meaning |
|---|---|
| `answer` | solution (lowercase) |
| `guesses[]`, `fb[]` | submitted guesses and their feedback |
| `counts[]` | candidates remaining after each guess (shown in report) |
| `cur` | letters typed in the active row |
| `busy` | true while a reveal/scene runs (input blocked) |
| `over`, `won` | end state |
| `g` | guess count as of the last non-final round (drives board music) |
| `flags{}` | story flags set by `~flag` (case-scoped, reset every case) |
| `times[7]` | `[h, m]` pairs: `[0]` intro ~23:40–23:51; `[k]` suspect k at hour k−1 |
| `caseVars` | caseNo, date (1946–49), victim, singer, pier, caseTitle |
| `infUsed` (Set), `infLog[]`, `lastInf` | informant bookkeeping |
| `title` | case title |
| `pending[]` | IDs of the round's scenes while they play; marked seen when they finish (or when an interrupted case is reopened) |
| `recorded` | the result has gone into the mode's record (set when the final guess is scored, so it's counted exactly once) |
| `hard` | a hard case (Settings → Hard mode, fixed when the case starts) |
| `notes[]` | case notes: `{ g, label, big, sub }` for every informant clue, in order |
| `story{}` | campaign flags (`~story`) as of this attempt: a copy of `campaign.storyFlags` taken at the case start, written back only if the chapter is won |

`used.intro` / `used.core` hold scene IDs and live outside `S`, so no-repeat works across cases in one session. They are not persisted.
`busy` and `cur` are transient; every other field is saved by `snapshot()` (game/snapshot.js `KEEP` list).

**Script context `ctx`:** `{ vars, flags, story, clue }`. `vars` come from `baseVars()` (intro) or `guessVars()` (rounds); story chapters add
`chapterVars(n)` (`{chapterNo} {chapterTitle} {culprit} {alias} {crime} {deadline}`) to the case vars.
`informant()` mutates `ctx.vars` and sets `ctx.clue = { label, big, sub }` before `play()`. `flags` is `S.flags` itself, so `~flag` writes into the case;
`story` is `S.story`, so `~story` writes into the attempt. A condition looks a key up in `flags`, then `story`, then `vars`.

**Scenes and packs (F2/T1).** Every scene is an object `{ id, chapter, s }` plus slot fields: intros add `title` (and `victimF: true` when
`{victim}` must be a woman's name), informants add `type` and `who`. Scenes live in **packs**, one per chapter:

```js
{ id: 'rnd' | 'c01'…'c10', chapter: 0…10, title, intros: [], tail: {}, cores: { 'g-b': [] }, informants: [], openers: { set: [lines] },
  win: { climax: [], epi: { 1..6: [] } }, loss: { climax: [], epi: { 0..3: [] } }, closers: { 1..5: [lines] },
  beats?: { fast, slow, near, escaped: [] }, interlude?: { kept, late, missed: [] } }   // story chapters only (interlude: chapters 1–9)
```

Openers and closers are one-line strings, not scenes, so they have no ID (they play as part of their round's segment).
`content/registry.js` loads a pack with a dynamic `import()` the first time it's asked for and indexes its scenes by ID. The game never imports scene
files. It reads the active pack through `pack()` in game/state.js, which is `getPack('random')` until F3's mode object takes over.

**Scene IDs are save-data keys (F1, T3). Never renumber, reuse or rename one.** Add new scenes with the next free number or letter, and
retire a scene by deleting it, never by giving its ID to different text. Scheme (`<pack>` is `rnd` or `c01`…`c10`):

| Slot | ID | Example |
|---|---|---|
| intro / opening variant | `<pack>.intro.<name>` | `rnd.intro.crossword` |
| briefing tail | `<pack>.tail` | `rnd.tail` |
| core | `<pack>.core.<g>-<bucket>.<01…>` | `rnd.core.3-2.02` |
| informant | `<pack>.inf.<name>` | `rnd.inf.pete` |
| win/loss climax | `<pack>.win.climax.<a…>`, `<pack>.loss.climax.<a…>` | `rnd.loss.climax.b` |
| win/loss epilogue | `<pack>.win.epi.<g>.<a…>`, `<pack>.loss.epi.<bucket>.<a…>` | `rnd.win.epi.4.b` |
| outro beat (chapters) | `<pack>.beat.<result>.<a…>` | `c01.beat.fast.a` |
| interlude (chapters 1–9) | `<pack>.inter.<kept\|late\|missed>` | `c02.inter.late` |
| ending (case script, egg, close) | `end.<a\|b\|c\|d\|bad\|egg\|close>` | `end.bad` |
| ending coda | `end.coda.<pop\|vera\|nora\|bottle>.<best\|middle\|worst>` | `end.coda.vera.middle` |

`npm run check` enforces this: IDs match `<pack>.<slot>…`, are unique across all packs, every scene's `chapter` matches its pack, every pool the
game draws from exists, and **no scene text appears in two packs** (normalized-text comparison, an error). A prose line of 40+ characters
reused across packs is a warning. `--coverage` prints each pack's slot counts against the T8 per-chapter budget.
For story packs it also checks: the manifest's `written` flags match the `chapters/cNN/` folders, every beat and interlude slot exists, chapter
vars are in scope (interludes get only the chapter vars), `~story` appears only in story packs, conditions may test `~story` flags, and
interludes stay quiet (no cut-ins, versus, heavy lines or clues). `npm test` adds that every retry-drawn slot of a written chapter has at least 2 scenes.

## 1.6 The scene system

Full syntax: [scene-scripts.md](scene-scripts.md). Summary of how the Random Case pack's scenes are chosen:

| Pool | Count | Selection |
|---|---|---|
| `intros` | 12 (crossword, singer, ransom, dying, witness, password, telegram, typewriter, lastwords, dictionary, femme, cipher) | `pickUnused` per session |
| `tail` | 1 | always |
| `cores['g-b']` | 56 total; 3 per slot (1-0 has 4, every `-3` slot has 2) | `pickUnused` per session (by ID), shared set across slots |
| `openers[set]` | 21 lines over 10 sets | appended after the **first** `@set name` line without `!` in a core (regex in `withOpener`) |
| `informants` | 9: pete/n, zero/top, prof/pos, dooley/dbl, sal/top, nickel/pos, telegram/n, fenn/n, lola/top | see below; each at most once per case |
| `closers[left]` | 2 per count | title card `## {nextTime} \| line` |
| `win.climax` + `win.epi[1..6]` | 2 + 12 | random + by guesses used |
| `loss.climax` + `loss.epi[0..3]` | 2 + 7 | random + by last guess's bucket |

**Informant chance:** `p = [0, .22, .35, .45, .5, .6][g] + (bucket 0 ? .15 : 0)`, ×0.4 if the previous round had one (and g < 5).
Types offered depend on `stats()`: `n` (candidates left) and `dbl` (double-letter odds) always; `top` (likeliest unrevealed letter)
and `pos` (likeliest letter in an unsolved slot) only when computable.

**Vars by scope** (enforced by `npm run check`): intro vars ⊂ round vars ⊂ informant vars. See scene-scripts.md.

**Story chapters** (`game/modes/story.js`) use the same pools with three differences:
- Every pick (opening, core, climax, epilogue, beat) goes through `pickFresh(pool, avoid)`, which skips `campaign.usedScenes[chapter]` (scenes from failed
  attempts) until the pool runs out. There's no per-session `used` set. Informants are picked as in Random Case (at most once per case).
- The ending adds an **outro beat**: `fast` (won on guess 1–2), `slow` (3–4), `near` (5–6), or `escaped` after a loss (the retelling).
- After a won chapter's report, its **interlude** plays (ui/campaign.js): `interlude[interludeTier(result).tier][0]`.

- After chapter 10's report ("The verdict"), the **ending** plays: `endingScenes(endingFor(results), threadTiers(results))` as segments, with the
  vars from `endingVars()` (§1.12). Each is marked seen when it finishes, so a replay from Chapter Select can skip it.

**Flags in use:** `warned`, `suspended`, `vera_upset`, `vera_soft`, `vera_gone`, `evicted` (all case-scoped, Random Case). Story flags (`~story`),
all set in outro beats, so a skipped beat still sets them (bible §10 rule 7 and its amendment):

| Flag | Set by | Read by |
|---|---|---|
| `notary_free` | ch 3 near beat | ch 4 (the Notary's 4 AM appointment), ch 10 (his phone call) |
| `index_half` | ch 5 fast/slow beats | ch 6 (an opening), ch 10 (the Index pages) |
| `dooley_hurt` | ch 6 near beat | ch 7–10 (the sling), endings A, D, bad |
| `records_saved` | ch 7 fast/slow beats | ch 10 |
| `briggs_out`, `penny_free` | ch 7 near beat | ch 8–10 (Briggs suspended until ch 9; Penny at large) |
| `vera_saved_herself` | ch 8 near beat | ch 9–10, the Vera coda |
| `lola_caught` | ch 9 fast/slow beats | ch 10 (her messages from a cell, or a postcard) |

**Interpolation happens per line at play time** (`fill`), so vars set mid-way would apply to later lines. Unknown `{vars}` are left
literally in the text and recorded in `NOIR.MISSING`.

## 1.7 Cinema engine

- **Layers** (z-index): `#backdrop` 0 → `#rain` 1 → `#title`/`#board` 2 → `#cinema` 10 (bgA/bgB cross-fade, `#crain`, mood colour layer,
  vignette, letterbox bars, `#narr`, `#dlg`, `#fx` 8, `#black` 20, `#flash` 21) → overlays 30 → `#toast` 40 → `#grain` 60.
- **One `RAIN` instance**, re-attached between `#rain` (board) and `#crain` (cinema).
- **Every delay goes through `sleep()`**, and CSS transitions set in JS divide by `SPEED`. New effects must do both or `#speedN` testing breaks.
- `typeInto` has a fast path when `SPEED > 20` or text speed is Instant (prints text whole).
- **Player preference knobs** (core/timing.js, set by ui/settings.js, separate from `SPEED`): `TEXT.type` scales typing per character
  (slow 1.6 · normal 1 · fast 0.5 · instant 0) and `TEXT.hold` scales how long dialogue, narration, cards and papers stay up (1.35 / 1 / 0.8 / 0.7).
  `TEXT.blips` gates typewriter ticks. `MOTION.reduced` disables `shake()` and thins rain and grain. `FLASH.reduced` makes `flashFx()` a no-op
  (so cut-in flashes and lightning flashes go). Their CSS halves live in css/prefs.css, keyed on `html[data-motion]`, `html[data-flashes]` and `html[data-hc]`.
- Fixed beat durations (at speed 1): cut-in about 3.1 s, heavy line 2.2 s + per-word, versus about 4.8 s, card 1.6 s + typing + 2.4 s, stamp about 3 s,
  paper 0.6 s + typing + 2.4 s, clue 5.2 s, legend about 10 s. Dialogue holds `clamp(1200 + 30·len, 1900, 5400) × TEXT.hold` ms after typing.
- `@set` while black swaps instantly; while lit it hides text and cross-fades (900 ms).
- **Segments and skipping (T3).** `play(segments, ctx, { skip(id), onSegment(id) })` plays `[{ id, src }]` in order and calls `onSegment` as
  each one finishes. `skip(id)` returns `'ask'` (show the SKIP ▸▸ button; Esc/Space also work), `'auto'` (skip at once) or `false`.
  `skipNow()` turns on `SKIP` (every `sleep()` resolves at once) and `AU.quiet` (one-shot sounds no-op), and cuts to black. The line that was
  playing finishes instantly behind the black, and the rest of the segment runs through `runQuiet()`, which applies only state: `@set`, `@mood`,
  `~flag`, `~rain`, `~tight`/`~loose`. At the segment's end, black is re-asserted so the next segment fades in. `flashFx` and `shake` are
  no-ops while skipping, and the closing title card is part of the round's last segment.
- **Moods** (`@mood`): CSS filter on `.bgs` plus `#moodlay` colour blend plus vignette (css/cinema.css), and the drone mode from `MOOD_MUSIC`.
  noir/warm/blue → calm, gold → hope, red → dread, sick/violet → tense.
- `body.stakes-N` (N = guesses + 1) reddens the board vignette from stakes 4 on.

## 1.8 Audio (audio/audio.js)

Graph: four buses → `DynamicsCompressor` → `master` → speakers. Each bus gain is its base level × its Settings slider (T9 bus restructure):

| Bus | Base | Slider | Carries |
|---|---|---|---|
| `sfx` | 0.8 | Sound effects | every one-shot, stings, flips, booms |
| `ui` | 0.8 | Sound effects | key presses and typewriter ticks (`tone`/`burst` take a bus argument) |
| `mus` | 0.55 | Music | the drone, the riff |
| `amb` | 1 | Ambience | the rain bed (`rainG` → `amb`); location beds will join it (T9) |
| `master` | 0.85 | Master | everything; 0 when Sound is off |

`AU.setVolumes({ master, music, sfx, ambience, on })` stores values (safe before `init()`, which applies them) and ramps gains over ~50 ms.
`AU.setHidden(hidden, mute)` suspends the context while the tab is hidden if "Mute when the tab is hidden" is on.
`AU.quiet = true` (while a scene is skipped) turns every one-shot method into a no-op. Beds, music and volume methods are exempt (the `ALWAYS` list
at the bottom of audio.js, which wraps every other method).
A 2 s noise buffer is shared by rain, bursts and thunder. `AU.init()` must run inside a user gesture. Every method no-ops before init.

| Method | Sound | Triggered by |
|---|---|---|
| `setMusic(mode)` | 4-oscillator drone through LFO lowpass; modes calm/tense/hope/dread | `@mood`, after each scene |
| `setRain(level, indoor)` | filtered noise bed; indoor = 900 Hz lowpass | `@set`, `~rain` |
| `riff()` | 8-note sawtooth "muted trumpet" phrase (G minor) | start button, win |
| `piano(notes, gap)` | triangle+sine notes | every title card (1 note), loss (4-note fall) |
| `sting(name?)` | low brass hit, one of the `STINGS` variants (below), with a cooldown | every `!!` cut-in (11 in scripts), `~sfx sting` |
| `versusHit()` | the heavier `versus` variant (adds a B1 saw and a two-stroke timpani roll); always plays and restarts the sting cooldown | every `%%` versus (5) |
| `hit(variant)` | the shared synth behind both (no-op without an argument) | internal |
| `boom`, `thud` | low sine drops + noise | heavy lines |
| `heart` | double low thump | `~heart`, reveal |
| `flip(0/1/2)` | gray thunk / yellow dyad / green arpeggio | tile reveals, legend |
| `tick`, `key` | typewriter tick, key press | typing, keyboard |
| `stamp`, `ring`, `hangup`, `whistle`, `siren`, `thunder`, `telegraph`, `foghorn` | one-shots | `~stamp`, `~sfx` |

**Stings (T10).** `STINGS` in audio.js is a table of variants: `brass` (E root + fifth), `minor` (E + G), `sag` (F chord sinking to E),
`soft` (the cooldown repeat), and `versus`. Each is a sub sine around E1 (41 Hz) that starts about a whole tone sharp and settles,
detuned sawtooth pairs (±6 cents) at 62–131 Hz through a lowpass that closes from ~700 Hz to ~200 Hz over ~1.5–1.9 s, a 35–60 ms attack,
a timpani thump (about 70→45 Hz) under the attack, and a long soft tail. There is no noise and nothing bright. The 120–200 Hz saw body is what still
reads on phone speakers that drop the sub.
- **Choice:** `sting(name)` plays `name` if it's a variant (cut-ins pass `CAST[key].sting`; today only `BRIGGS: 'brass'`), otherwise a random one of
  `brass`/`minor`/`sag`, never the same as the last.
- **Cooldown** (`COOLDOWN` = 8 s of real AudioContext time, so `#speedN` doesn't change it): a sting within 8 s of the previous one plays `soft`,
  and a third plays nothing. `versusHit()` counts as a sting, so the cut-in right after a versus (intro tail "SIX SUSPECTS", win "GOT YOU.") is soft.
- **Levels** (measured offline through the real sfx → compressor → master chain, with the compressor settled): old sting peak 0.47 (−6.6 dBFS);
  `brass`/`minor`/`sag` 0.23–0.25 (about half); `soft` 0.09; `versus` 0.30. Energy above 1 kHz is about 25 dB lower than the old sting.
  The 120–200 Hz body is about 6 dB lower, which is the cost of halving the peak.
- `npm run check` validates `CAST[key].sting` names and warns when a scene has more than one `!!` or when more than ~20% of scenes have one
  (per pack since step 3; it prints the density: `rnd` 11 of 101 scenes, 11%).

## 1.9 Visual conventions

- Sets are **1600×900 SVG** strings (`preserveAspectRatio="xMidYMid slice"`). Use `svg()` from art/svg.js to get the shared `DEFS`
  (ids `nSky nGlow nGlowR nCone nBeam nFog nWet nWater nMoon nHalo nBlur6 nBlur18 nNeon nBrick`).
- Procedural detail uses **seeded** `rng(seed)`, so a set looks identical every time. Pick a new seed per new set.
- Ambient animation classes (css/ambient.css): `flicker`, `swing`, `sweepA/B`, `rise` (+`d2`/`d3`), `shim`.
- Portraits: `bust({ hat: fedora|wide|cap|scarf, hair: short|long|bob|bun|bald, build, coat, cig, glasses, eyes, color })` on a 220×260 viewBox.
- Fonts (Google): Limelight (display), Big Shoulders Display (impact), Cormorant Garamond (narration), Special Elite (typewriter), Courier Prime (dialogue).

## 1.10 Story canon so far (Random Case material)

All current scenes become the Random Case pool (decision D3). Story mode starts fresh with new scenes. Characters, setting and tone
below may carry into the story, but no existing scene text will. **Story mode's canon is [story/bible.md](story/bible.md) (approved 2026-10-04).**
Where the bible adds to a character (Sal is Dash's best friend and secretly the Editor; Vera is a *Gazette* proofreader), the bible wins in story
chapters, while Random Case scenes keep the lighter versions below. Story-only cast: `RUTH` (the stenographer), `POP`, `NORA`, `TOMMY`, `WALT`, `MAGS`,
`EDDIE`, `PENNY`; the culprits `PELL`, `DELLA`, `GUS`, `CELESTE`, `BRANDT`, `PIKE`, `QUIST`, `GREY`, `THORNE` (Lola is `LOLA`); and three bit parts not in
the bible's cast tables: `FOREMAN` (ch 1's press foreman), `WARDEN` and `ROSA` (Eddie's wife, ch 3). Story-only sets: `hearing`, `pressroom`, `hospital`,
`restaurant` (Luigi's), `gangway`, `penitentiary`, `morgue`, `studio` (WKRN), `records` (Hall of Records), `vault`, `ferry`, `warehouse`, `kitchen`
(Pop's), `ballpark`, `ruins` (the burned waterfront warehouse), `cemetery`.

**Story dates.** The manifest (`content/chapters/index.js`) dates the chapters so the bible's "tomorrow" hooks hold: chapter 3 is the night after
chapter 2 (Eddie dies "at dawn tomorrow"), 5 the night after 4 ("the 6:00 train, tomorrow"), 9 the night after 8 ("certifies the next morning").
Oct 4 · Oct 11 · Oct 12 · Oct 20 · Oct 21 · Nov 1 · Nov 9 · Dec 1 · Dec 2 · Dec 15, 1948. The frame is February 1949.


- **Setting:** an unnamed rain-soaked American city, 1946–1949. Union Station's **6:00 AM train** is the deadline. Bars: The Last Word. Hotel Grammatica. Pier numbers. The Varga crime family.
- **Conceit:** the culprit is **a word**, a five-letter fugitive. Guesses are suspects brought in for interrogation. Gray letters have alibis,
  yellow ones are "in the gang", green ones are "in the right place at the right time".
- **Cast** (key: name): `DASH` Dash Lexington (protagonist detective, narrator) · `BRIGGS` Captain Briggs · `VERA` Vera Lexington (wife, marriage fraying) ·
  `DOOLEY` Sgt. Dooley (loyal partner) · `SAL` (bartender, "never wrong") · `ZERO` Madame Zero (fortune teller) · `PROF` The Professor (lexicographer) ·
  `PETE` Lucky Pete (newsie informant, "you got a debt") · `KOW` Mrs. Kowalski (landlady) · `FENN` Doc Fenn (coroner) · `WORD` The Word (taunting villain voice on the phone, red eyes) ·
  `NICKEL` (shoeshine kid) · `LOLA` Lola Vance (femme fatale client).
- **Tone guide for writers:** hardboiled first-person similes ("The street was wet and shining, like it had been crying and didn't want to talk about it"),
  deadpan running gags (Pete's tab, Sal being right, Briggs holding up fingers), grammar and dictionary puns played completely straight, short lines,
  and punchlines that land on the last sentence. Stakes escalate with each guess (warning → suspension → Vera leaves → eviction).

## 1.11 Conventions and gotchas

- **No build step is a feature.** Anything added must run as native ES modules from `public/`. Use relative imports with `.js` extensions.
  Dynamic `import()` with computed paths works and is the plan for lazy-loading chapters.
- `S` is an `export let` live binding. Never reassign it outside `setState`, and never cache `S` in a local across awaits.
- `play()` takes segments, one per scene ID, so each can be marked seen and skipped on its own. A string still works (one unnamed,
  unskippable segment). Anything a skipped scene must leave behind has to be state that `runQuiet()` applies (flags, set, mood, rain, letterbox)
  or be recorded outside the scene, the way informant clues go into case notes before the scene plays.
- New effects must stay silent and invisible while `SKIP.on`: route delays through `sleep()`, sound through `AU`, and flashes/shakes through
  `flashFx`/`shake`.
- CSS `<link>` order in index.html is the cascade order (base → title → menu → board → cinema → effects → overlays → ambient → prefs).
- Settings that CSS needs go on `<html>` as data attributes (`data-hc`, `data-motion`, `data-flashes`). `<body>`'s class is owned by the stakes
  vignette (`updateStatus` overwrites it), so never put settings there.
- A new setting needs three things: a default in save/schema.js `defaults()`, an entry in ui/settings.js `SPEC` (the form is generated from it),
  and handling in `applySettings()`. Hard mode is the exception: it's read when a case starts (`S.hard`).
- Git is `core.autocrlf=true`. Word-list and script parsing trim lines, so CRLF is harmless. Keep it that way.
- Typing `~sfx` with an unknown name silently does nothing in-game. `npm run check` is what catches it.
- Pickers (`pickUnused`) reset a pool once it is exhausted. With bigger pools, repeats get rarer for free.
- `pack()` / `getPack()` are synchronous and return `undefined` until `loadPack()` has resolved. Anything that starts a case must await the pack first (main.js does this for `random`).
- Scene IDs are permanent (see §1.5). The checker catches duplicate and malformed IDs, but not an ID quietly moved onto new text. Don't do that.
- Change persisted state only through `store.update(fn)`, never by editing `store.get()` results. A new `S` field must join `KEEP` in game/snapshot.js
  to survive a reload. Any change to the save's shape means bumping `VERSION` and adding a `MIGRATIONS` step in save/schema.js.
- Reset local saves while testing with `NOIR.save.reset()` (or clear site data). The e2e test always starts from a fresh browser profile.
- Game code talks to the active **mode** (`mode` in game/state.js), never to a specific pack or save slot. A new mode implements the
  interface in §1.13 and is selected with `setMode()` before `newCase()`/`resumeCase()`.

## 1.12 Save system (save/)

**One document, one key.** `localStorage['wordlenoir.save']` holds a JSON document versioned by `v` (currently 2, save/schema.js):

```js
{ v: 2, createdAt, updatedAt,
  settings: { master, music, sfx, ambience, sound, muteHidden, textSpeed, motion, flashes, skipSeen, highContrast, hardMode, textBlips },
  seen: { [sceneId]: 1 },
  campaign: null | { runId, startedAt, chapter /* 11 = all ten won */, results: [{ chapter, guesses, attempts, answer, at }], storyFlags,
                     attempt: { chapter, n, startFlags, pendingSeen, active, outcome? } | null, usedScenes: { [chapter]: [sceneId] },
                     pendingInterlude: chapter | null, finished?: endingKey },
  random: { stats: { played, won, dist[6], streak, best }, active: Snapshot | null },
  dossier: { [chapter]: { status: 'apprehended' | 'escaped', guesses?, at } },
  story: { reached, best: { [chapter]: guesses }, endings: { [endingKey]: firstTime }, fastest: totalGuesses | null } }
```

`campaign` is the current run (endings read only this, D2). `dossier` and `story` outlive runs: Chapter Select unlocks by `story.reached`, and
replays update `best` and the dossier but never the run. **Migration 1 → 2** only bumps `v`; `migrate()`'s fill adds `story` from defaults.

- **Store** (`store.js`): `load()` at boot, `get('a.b')`, `update(d => …)` (debounced 300 ms), `flush()` (main.js calls it on `pagehide` and when the tab
  is hidden), and `reset()` (also removes corrupt-file backups). Every storage call is guarded. `status = { persistent, reason, recovered }`:
  - `blocked`: no storage, or storage that refuses writes. The game runs on the in-memory copy and the player gets a toast.
  - `quota`: a write failed. It recovers by itself if a later write succeeds.
  - `future`: the save came from a newer build. It is never written over, and the player is told to reload.
  - An unreadable save is copied to `wordlenoir.save.corrupt.<time>` (`recovered`) before a fresh one starts.
- **Schema** (`schema.js`): `migrate(doc)` runs `MIGRATIONS[v]` steps up to `VERSION`, then fills any missing or mistyped field from `defaults()`
  (unknown keys are kept). It throws for newer versions and non-saves.
- **Answers are obfuscated** (`codec.js`, D6): `hide()` shifts each letter by a fixed salt and base64s the result with an `n1.` tag, so neither
  the save nor its base64 decoding shows the word. `reveal()` returns null for anything else.
- **Snapshots** (`game/snapshot.js`): `S` minus `busy`/`cur`, Sets as arrays, answer hidden. `restore()` rejects a snapshot whose answer doesn't
  decode, whose guesses aren't five-letter dictionary words, or that continues after a win. It **recomputes feedback and the end state** from the
  answer instead of trusting the save.
- **Random Case record** (`random.stats`, `recordRandom`): a win adds to `won`, `dist[guesses-1]` and the streak (`best` follows);
  a loss ends the streak. Dropping an open case from the menu counts as a loss once a suspect has been questioned (the answer is revealed),
  while a case dropped before any guess isn't counted.
- **Checkpoints** (game.js, Random Case): after the intro, the moment a guess is scored, when that round's scenes are picked, and when they finish.
  Reopening resumes on the board after the last checkpoint. Interrupted scenes count as seen, and missing candidate counts are recomputed.
  A case that had ended goes straight to its report. Finishing a case clears `random.active`.
- **Seen marks** (`progress.js`): Random Case commits them as soon as each segment completes (per segment since step 6). Story chapters stage them in
  `campaign.attempt.pendingSeen` through `markSeen(d, ids, { story: true })`, and they count only when the chapter is won. Replays hold them in memory
  until the replay is won. Interludes commit theirs at once (they play after the win).
- **Story checkpoints**: the attempt's case lives in `attempt.active` (same snapshots and checkpoints as Random Case). The final guess writes
  `attempt.outcome` (answer hidden) the moment it is scored; the win/lose transition runs in the mode's `clear()`, after the ending scenes, so a
  reload during the ending replays nothing and loses nothing. A win copies `S.story` into `storyFlags`, calls `winAttempt`, and sets
  `pendingInterlude`; a loss calls `loseAttempt`.
- **Chapter attempts (D1/D7)** are pure functions, unit-tested, and driven by the story mode since step 8:
  - `newCampaign` and `beginAttempt` start a run and an attempt.
  - `winAttempt` commits the staged marks, records `{ chapter, guesses, attempts, answer: hide(...) }`, and advances the chapter.
  - `loseAttempt` restores `storyFlags` from `startFlags`, adds the attempt's scenes to `usedScenes[chapter]`, discards its marks, and starts attempt n+1.
  - `avoidFor` gives the retry picker its avoid-set.
- **Story records** (bible §7–§8): `interludeTier({ guesses, attempts })` (1–2 kept, 3–4 late, 5–6 missed, one step worse after a retry),
  `threadTiers(results)` (best ≥ ⅔ of the thread's maximum, worst ≤ ⅓), `endingFor(results)` (egg, then bands A–D/bad by average, D5/D7),
  `noteChapterStart/Result` (reached, best, dossier; an arrest is never undone by a later loss) and `noteRunFinished` (endings found, fastest run).
  `endingVars(ending, results)` gives the ending scripts `popTold` / `popHalf` / `popLetter` (chapter 8's interlude tier: kept, late, missed),
  `veraWorst`, `endBad` and `total` (the run's guesses).
- **Export / import** (`transfer.js`, T4, used by Settings → Data): `exportText(doc)` = the document plus `{ app: 'wordle-noir', exportedAt }`,
  downloaded as `wordle-noir-save-YYYY-MM-DD.json` (Blob + temporary `<a download>`), or copied as text. `parseImport(text)` parses, checks the app
  marker and version, migrates, then checks the Random Case record adds up and the seen list is well-formed. It throws a readable message on any
  failure, and nothing is written until the player confirms the summary ("10 scenes seen · 4 random cases (3 closed) · a case open").
  `store.replace(doc)` then writes the whole document at once and the page reloads.

## 1.13 Screens, modes and settings (ui/, game/modes/)

**Screens** (`ui/screens.js`): `title` → `menu` → `game` (the board), `chapters`, `dossier` or `settings`. One is visible at a time. `show()` keeps a back trail (the menu
resets it), focuses the screen's `[data-focus]` element or first button, and runs its `onShow` hook (main.js: the menu refreshes and switches to the
street backdrop with heavy rain; the game switches to the office). `#pause` (in-game menu), `#modal` ("Drop this case?") and `#report` are overlays.
**Esc** closes the top layer (dialog, in-game menu, Settings). On the board it opens the in-game menu, but only between scenes (T3 will use Esc for skipping).

**Board extras:** a **Notes** button (with the entry count) opens the case notes (`#notes` overlay; Esc closes). Every informant clue is listed
there with the round it came after. It's written when the clue is given, so skipping the informant's scene loses nothing.

**Main menu** (`ui/menu.js`, a manila case folder): Continue (the story run first: "Chapter 2: Last Call · suspect 3 of 6", "the morning after",
"telling it again (attempt 2)", "coming soon"; else the open Random Case; disabled when neither), New Game (asks "Start over?" if a run exists; endings,
best results and the dossier are kept), Chapter Select, Random Case (with a one-line record), Dossier, Settings.

**Chapter Select** (`ui/casefiles.js`): ten folders. A chapter is open once reached in any run (`story.reached`), shows its best result, and replays
with `startReplay(n)` (D2: never touches the run). Unreached chapters are stamped *Classified*, unwritten ones *Coming soon*. The footer lists endings
found and the fastest run, with a "Replay:" button for each ending found. **Dossier**: one page per culprit from `CHAPTERS` (mugshot via `bust()`, name, alias, wanted for, M.O., why six guesses,
associates, a quote) with status At large / Apprehended (best guesses) / Escaped; unreached pages are redacted. ◂ ▸ or the arrow keys page; Esc returns.

**The campaign** (`ui/campaign.js`): `startChapter(n)` begins (or keeps) the attempt, builds a story mode whose `next`/`nextLabel` drive the report's main
button, and resumes or starts the case. A win → "Next: Chapter n+1" → `afterWin`: the interlude, then the next chapter (or the ending after 10).
A loss → "Tell it again" → a new case in the new attempt. (An unwritten chapter would stop at the menu with a "still at the typist" toast; since step 9
every chapter is written.) After chapter 10, `playEnding()` loads `content/endings/index.js`, plays the ending's scenes as segments, records it,
and closes the run (`campaign.finished`). `replayEnding(key)` replays a found ending from Chapter Select: with the current run's life if that run
found it, else a middling one (every chapter on guess 3).

**Modes** (`game/modes/random.js`, `game/modes/story.js`). The session runner (game.js) gets everything mode-specific from `mode`:

| Member | Random Case | Story (campaign chapter / replay) |
|---|---|---|
| `id`, `label`, `load()`, `pack()` | `'random'`, the `rnd` pack | `'story'` / `'replay'`, the `cNN` pack |
| `pickAnswer()` | `DEBUG.forceAnswer` or a random answer | same |
| `newCase()` | `genCase()` → `{ intro, vars }` | an opening via `pickFresh`, the chapter's date and vars; notes the chapter reached |
| `introScript`, `roundScript`, `endScript` | `{ segments }`: intro + tail; core + opener + maybe informant + closer; climax + epilogue | same, with `pickFresh`; the ending adds the outro beat |
| `saved()`, `onCheckpoint(snap)`, `clear()` | `random.active` | `attempt.active`; `clear()` applies a finished attempt's outcome (replay: nothing saved) |
| `seen(ids)` | commits seen marks immediately | stages them (`pendingSeen`; replay: in memory) |
| `onComplete({ won, guesses, answer })`, `stats()` | `recordRandom` → `random.stats`, shown on the report and in the menu | dossier/best, `attempt.outcome`; no stats panel |
| `storyFlags()`, `next(S)`, `nextLabel(S)` | (none: the report offers a new case) | the run's flags; set by ui/campaign.js |

**Settings** (`ui/settings.js`, saved in `settings`, applied live by `applySettings()`):

| Setting | Effect |
|---|---|
| Master / Music / Sound effects / Ambience | bus gains (§1.8); letting go of the effects or master slider plays a stamp so the level can be judged |
| Sound on | master gain (also the top-bar and in-game-menu Sound buttons) |
| Mute when the tab is hidden | `AU.setHidden` on `visibilitychange` |
| Typewriter blips | `TEXT.blips` |
| Text speed | `TEXT.type` / `TEXT.hold` (§1.7) |
| Skip scenes you've seen | Ask (default: SKIP ▸▸ button, Esc, Space) / Always (skipped automatically) / Never. Only committed seen marks count. |
| Replay the briefing | un-sees every `*.tail` scene, so the rules briefing plays in full again |
| Reduce motion / Reduce flashes | Follow system (default) / Off / On → `MOTION`/`FLASH` + `html[data-motion\|data-flashes]` |
| High-contrast tiles | `html[data-hc]`: orange/blue tiles, keys, report minis and share emoji (🟧🟦) |
| Hard mode | every revealed clue must be reused (`hardModeMiss`): greens stay put, revealed letters come back as often as shown. Fixed per case. |
| Export case files / Copy as text | `exportText` download or clipboard (a read-only text box if the clipboard is refused) |
| Import case files / Paste text instead | `parseImport` → summary → "Replace them" → `store.replace` → reload; errors are shown inline |
| Clear all data | "DESTROY THE FILES?": type DESTROY → `store.reset()` → reload |

## 1.14 Change log

What each roadmap step changed, newest first. Details live in the sections above and in each item's **Status** note in Part 2.

| Date | Step | Branch | What changed |
|---|---|---|---|
| 2026-10-04 | 9: T8 + T7 | `step-9-content` | The whole story. Chapters 3–10 written at the full T8 budget and chapters 1–2 grown to it (153 scenes each; 150 for chapter 10), every interlude, the real endings (six case endings + the egg, twelve codas, the close) replacing the placeholders, ending replays in Chapter Select. 16 new characters, 11 new sets. Chapter dates follow the bible's "tomorrow" hooks. The checker validates endings and catches a stray `NAME?` line. 40 unit tests, 19 e2e scenarios including two full campaigns. |
| 2026-10-04 | 8: T6 + T7 (logic) + T2 (rest) | `step-8-campaign-slice` | The campaign: New Game, Continue, chapter attempts with D1 rollback and retry variety, `~story` flags, outro beats, interludes (kept/late/missed), the "Strike that" retelling, Chapter Select replays (D2), the Dossier, ending logic with placeholder endings, save v2. Chapters 1 "Stop the Presses" and 2 "Last Call" written at 2 scenes per slot (82 scenes each), with their interludes; new sets hearing, pressroom, hospital, restaurant, gangway. Bible amendment recorded (escape consequences move to the near miss). The title screen's stale "scenes can't be skipped" fine print is replaced by a fan-game disclaimer (not affiliated with The New York Times). 38 unit tests, 17 e2e scenarios. |
| 2026-10-04 | 7: T6 (bible approved) | `step-7-story-bible` | Owner's final OK; bible marked approved and its §11 folded into T6/T7/T8. Revision 2: the Editor is Sal, Dash's best friend (the Professor becomes the red herring); four personal threads (Pop, Vera, Nora and Tommy, the bottle) in nine interludes with kept/late/missed variants driven by each chapter's guess count, resolved in per-thread ending codas. |
| 2026-10-04 | 7: T6 (bible draft) | `step-7-story-bible` | `docs/story/bible.md` drafted: the Lexicon, the Editor, the grand-jury frame, ten chapters with culprits, deadlines, beats and hooks, the arc map, endings and easter-egg seeds. Not approved yet; no story content or campaign code written. |
| 2026-10-04 | 6: T3 + T4 | `step-6-skip-notes-transfer` | Scenes play as segments: each is marked seen when it finishes, and seen ones can be skipped (SKIP ▸▸ / Esc / Space; Settings: Ask / Always / Never, plus Replay the briefing). Skipping applies only state, silently. Informant clues go into case notes on the board. Export (file or text) and import (file or paste) with full validation and a confirm summary. 29 unit tests, 13 e2e scenarios. |
| 2026-10-04 | 5: F3 + T5 + T2 (part) | `step-5-menu-modes-settings` | Main menu (case-file folder), screen manager, in-game menu (Menu button, Esc), Settings screen (volumes on new audio buses, sound, mute-hidden, blips, text speed, reduce motion/flashes, high contrast, hard mode, clear data). The game loop became a mode-driven session runner, with `RandomMode` and a win record (played/won/streak/best/distribution) on the report and menu. 23 unit tests, 9 e2e scenarios. |
| 2026-10-04 | 4: F1 | `step-4-save-system` | Save system (`save/`): one versioned localStorage document with guarded, debounced writes, migrations, answer obfuscation, snapshots, checkpoints, and resume after reload. Seen marks are recorded, and D1 chapter attempts are built as tested functions. Added `npm test` (18 unit tests) and three save e2e scenarios. |
| 2026-10-04 | 3: F2 + T1 | `step-3-scene-registry` | All 101 scenes became `{ id, chapter, s }` objects in the Random Case pack (`content/random/`, chapter 0). Added `content/registry.js` (lazy pack loading, lookup by ID), the game reads pools only through it, the checker enforces IDs/chapters/no cross-pack reuse, and `--coverage` was added. |
| 2026-10-03 | 2: F4 | `step-2-smoke-test` | `npm run e2e`: zero-dependency headless Chrome/Edge test that plays real cases (invalid word, loss with informants, win, `--cases N`). |
| 2026-10-03 | 1: T10 | `step-1-deeper-sting` | Cut-in sting replaced with low brass-hit variants, an 8 s cooldown, and a heavier versus hit. Per-character `CAST[key].sting`, checker cut-in budget. Verified by ear. |
| 2026-10-03 | 0 | `main` | Restructure into a modular project + development docs (`5a33e1a`). |

---

# Part 2: Roadmap

Requested items are **T1–T10** (in the order they were given). **F1–F4** are foundations several of them need.
Each item has: goal, design notes, tasks, dependencies. The recommended order is in §2.3 and open decisions are in §2.4.

## 2.1 Foundations

### F1. Save system (browser storage)
**Needed by:** T2 (continue, settings, clear data), T3, T4, T6/T7 campaign, dossier.

**Status: done (step 4).** Implementation in §1.12. Deviations from the plan:
- **An extra checkpoint is taken the moment a guess is scored**, plus one when the round's scenes are picked. With only "after the scene finishes",
  reloading during the reveal or cutscene would erase the guess, letting a player see a word's feedback and then take it back.
- **Resume UI is interim:** until the menu (step 5) has Continue, the title button becomes "Reopen the case file" and reopens `random.active`.
  "New case" still drops it. (Replaced in step 5 by the main menu's Continue.)
- **Settings schema** adds `sound` (the existing sound toggle) and `muteHidden` (T2's "mute when the tab is hidden"). `motion` and `flashes`
  are `'os' | 'full' | 'reduced'`, so "follow the OS" is an explicit default.
- `results[]` entries also record `at` (a timestamp, for a future "fastest run"). `attempt` gains `n`, its attempt number in the chapter, which feeds
  `results[].attempts` (D7).
- **Obfuscation:** a salted per-letter shift *then* base64, rather than base64 of salt + word, so decoding the base64 doesn't reveal the answer either.
- **Snapshots** don't store `fb`. It's recomputed from the answer on restore, so a tampered save can't fake feedback.
- **Seen marks** are recorded per round for now, because `play()` still takes one string. Per-segment marking arrives with T3. (Done in step 6.)
- D1 attempts are implemented and unit-tested as save functions. The campaign that calls them is step 8.
- Added `npm test` (`node --test`, zero dependencies) with 18 unit tests. Writing those tests found a bug: storage that reads but refuses
  writes was reported as "full" instead of "blocked". It's fixed.

- [x] `public/js/save/store.js`: a single namespaced key (`wordlenoir.save`) holding a versioned JSON document. All access goes through
      `load()`, `get(path)`, `update(fn)`, and `reset()`. Debounced writes. Every `localStorage` call wrapped in try/catch (private mode or quota
      errors fall back to in-memory and the UI says progress won't be kept).
- [x] Schema v1 (draft):
  ```js
  {
    v: 1, createdAt, updatedAt,
    settings: { master, music, sfx, ambience, textSpeed, motion, flashes, skipSeen, highContrast, hardMode, textBlips },
    seen: { [sceneId]: 1 },
    campaign: null | {
      runId, startedAt, chapter,
      results: [{ chapter, guesses, attempts, answer }],   // one entry per chapter, written when it's won
      storyFlags: {},
      attempt: { chapter, startFlags, pendingSeen: [], active: Snapshot|null } | null,  // discarded on a loss (D1)
      usedScenes: { [chapter]: [sceneId] }                // scenes from failed attempts, avoided on retry (D1)
    },
    random: { stats: { played, won, dist: [0,0,0,0,0,0], streak, best }, active: Snapshot|null },
    dossier: { [culpritId]: { status, unlockedAt } }
  }
  ```
- [x] `migrate(doc)` chain keyed by `v`. Unknown future versions are refused rather than clobbered.
- [x] **Answer obfuscation (D6):** every stored answer (snapshots, `results`, exports) goes through `hide(word)`/`reveal(str)` (base64 + a fixed salt),
      so the solution isn't readable at a glance in devtools or an exported file.
- [x] **Snapshot** = serializable case state: `S` minus transient fields (`busy`, `cur`), with Sets converted to arrays. Save at checkpoints:
      after the intro finishes, and after each round's scene finishes. Quitting mid-scene resumes on the board after the last checkpoint.
      That scene is then "seen", so it can be skipped on replay.
- [x] **Chapter attempts (D1):** a story chapter runs as an *attempt*. Scenes seen during it go to `attempt.pendingSeen` and merge into `seen`
      only when the chapter is won. A loss throws the attempt away: pending seen marks are discarded, story flags revert to `startFlags`,
      the played scene IDs are added to `usedScenes[chapter]`, and the player restarts at the chapter's beginning.
      Random Case commits `seen` as soon as each segment completes.

### F2. Scene registry: stable IDs, chapter tags, lazy loading
**Needed by:** T1, T3, T5, T6, T8.

**Status: done (step 3).** Implementation and the full ID scheme are in §1.5. Deviations from the plan:
- Chapter **opening variants live in `intros`** and get `<pack>.intro.<name>` IDs (not `c01.open.b`), so one slot name works for every pack.
  Ending packs (`end.best`, T7) aren't handled by the registry yet. T7 adds them.
- Packs carry their own `id` (`rnd`, `c01`…), and `beats` is a generic `{ result: [scenes] }` map whose keys T6 will settle.
  `culprit` and the per-chapter vars wait for T6 because the Random Case pack has none.
- Openers and closers stay one-line strings without IDs (they are part of their round's segment, as T3 already planned).
- The singer intro's hard-coded `intro.id === 'singer'` check became a data field, `victimF: true`.
- Until F3's mode object exists, the game reads the active pack through `pack()` in game/state.js (`getPack('random')`).
- The migration verified a byte-for-byte round trip of all 101 scenes and 31 one-liners before the old `content/scenes/` folder was removed.

- [x] Every scene becomes an object: `{ id, chapter, s }`, plus slot-specific fields (`title` for intros, `type`/`who` for informants).
      **IDs are save-data keys and must never be renumbered or reused.** Scheme: `c01.core.3-2.07`, `c01.open.b`, `c01.inf.ruby`,
      `c01.win.epi.4.b`, `rnd.intro.crossword`, `rnd.core.1-0.03`, `end.best`.
- [x] Content packs, one per chapter: `content/chapters/c01/index.js` exports
      `{ chapter, title, culprit, intros, tail, cores, informants, openers, win: { climax, epi }, loss: { climax, epi }, closers, beats }`.
      Loaded with `await import(\`../content/chapters/c${nn}/index.js\`)` only when needed. About 150 scenes × ~400 chars is about 60 KB per chapter.
      (The loader and checker support them. `c01` and `c02` exist since step 8.)
- [x] `content/registry.js`: `loadPack(chapter | 'random')` and lookup by ID. The game asks the registry for pools and never imports scene files directly.
- [x] Random Case pack `content/random/index.js` (ID prefix `rnd.`, `chapter: 0`). Same shape as a chapter pack.
- [x] One-off migration script (`tools/migrate-scenes.mjs`) that assigns IDs to the existing 101 scenes and writes them into the **`rnd` pack** (T1, D3).
      Chapter packs `c01`–`c10` start empty and are written fresh.

### F3. Screens and game modes
**Needed by:** T2, T5, T6.

**Status: done (step 5).** Implementation in §1.13. Deviations from the plan:
- Screens today are `title`, `menu`, `settings` and `game`. `dossier` and `chapters` get added when they have content (T2/T6); for now their menu
  entries are stamped and answer with a toast. The menu resets the back trail.
- The mode interface grew to what the runner actually needs: `load()`, `pack()`, `newCase()` (replaces `vars()`), plus storage members
  (`saved()`, `clear()`, `seen(ids)`, `stats()`). Every `*Script()` returns `{ ids, src }` so the runner can mark scenes seen.
  Modes live in `game/modes/` (not a top-level `modes/`) because they're game logic.
- The in-game menu keeps a Sound toggle *and* the top bar keeps its Sound button (quick access). Esc opens and closes the in-game menu between scenes.
- `body.className` belongs to the stakes vignette, so settings are exposed to CSS as `<html>` data attributes.

- [x] `public/js/ui/screens.js`: a tiny screen manager (`show('menu' | 'settings' | 'dossier' | 'chapters' | 'game')`) handling hidden/visible state,
      focus, and Esc/back. The title section becomes the first screen.
- [x] Refactor `game/game.js` into a **session runner** parameterized by a **mode** object:
  ```js
  mode = {
    id: 'random' | 'story',
    pickAnswer(), introScript(), roundScript(g, bucket, ctx), endScript(won, g, bucket, ctx),
    vars(), onCheckpoint(snapshot), onComplete(result)
  }
  ```
  The current behavior becomes `modes/random.js`, and story chapters become `modes/story.js`. Board, reveal and report stay shared.
- [x] Replace the in-game "New case" button with a **Menu** button (resume, settings, sound, quit to main menu with a save).

### F4. Automated smoke test
**Why first:** this roadmap rewrites most of `game/`. A one-command regression check pays for itself immediately.

**Status: first item done (step 2).** Implementation in §1.2. Deviations from the plan:
- Input goes through real CDP mouse clicks and key events instead of `NOIR.press`, so the keyboard listener and button wiring are covered too.
  `NOIR` is only used to force answers and informants and to read state.
- Beyond the planned win and loss, it also covers an invalid word (toast shown, row kept, Backspace clears) and offers `--cases N` random cases for scene coverage.
- External requests (Google Fonts, the analytics beacon) are blocked so the run doesn't depend on the network.
- `engines` in package.json stays at Node ≥ 18 because `dev` and `check` still run there. Only `e2e` needs Node 22, and it says so if run on older versions.

- [x] `tools/e2e.mjs` (zero-dep, Node ≥ 22 has a global WebSocket): starts the dev server, launches local Chrome/Edge headless with
      `--remote-debugging-port`, then plays a win and a loss at `#speed400` via `NOIR`. It asserts the report, no console errors, and no `NOIR.MISSING`.
      Add the script `npm run e2e`.
- [x] Extend as modes land: random mode, a full campaign at speed with forced answers (to reach every ending, including the easter egg), ~~save/resume~~ (done in step 4), import/export round-trip.
      ~~random mode~~, menu, in-game menu and settings scenarios landed in step 5. ~~import/export round-trip~~, skip and case notes landed in step 6.
      Step 8 added the campaign: chapters 1–2 played for real (win, interlude, loss + retelling + retry, Continue after a reload), Chapter Select,
      the dossier, and every ending (including the egg) reached by forcing `campaign.results` and calling `NOIR.campaign.playEnding()`.
      Step 9 added two full campaigns at speed (all first-suspect wins → the egg; all dawn wins → the bad ending), which also exercise every story flag
      both ways. Every band in between is still reached by forced results, since a real run can't hit a fractional average without many runs.

## 2.2 Requested items

### T1. Chapter flag on every scene
**Goal:** each scene declares which chapter it belongs to. `chapter: 1`–`10` are story chapters, and `chapter: 0` is the Random Case pool.
All existing scenes go to the Random Case pool from the start (D3). The story starts fresh.

**Status: done (step 3).** Checker rules are in §1.5. Deviations from the plan:
- Text reuse is compared on normalized text (trimmed, comments dropped, lowercased, whitespace collapsed) instead of hashes. At this size that's
  equivalent and gives readable error messages. A whole scene reused across packs is an **error**. Within one pack it's a warning.
- Added a stricter **warning** for any prose line of 40+ characters (narration, dialogue, heavy, cut-in) that appears in two packs.
  It's a warning because stock phrases can legitimately recur.
- Verified with a throwaway broken `c01` pack: all seven planted faults were reported (reused text, wrong chapter, duplicate ID,
  wrong ID prefix, bad informant type, missing core slot, reused prose lines).

- [x] Done via F2: the `chapter` field on every scene object, existing content moved into the `rnd` pack with `chapter: 0`.
- [x] `check-scenes` enforces that every scene has a `chapter` matching its pack, IDs are unique across all packs, and
      **no scene text is reused across chapters** (normalized-text hash comparison).
- [x] `check-scenes --coverage` prints per-chapter slot counts against targets (see T8 budget).
- [x] The checker also enforces that no story chapter reuses Random Case text.

### T2. Main menu and settings
**Goal:** Main menu with New Game, Continue, Chapter Select, Random Case, Dossier, Settings.

**Status: done (steps 5, 6 and 8).** Implementation in §1.13. Step 8 deviations: Chapter Select also shows the endings found and the fastest run
(T7's "viewable from the menu"); unwritten chapters are stamped *Coming soon* rather than locked away. The dossier's optional allies tab and crime-lord
page aren't built (the Editor stays off the dossier until the finale is written). Esc leaves Chapter Select and the Dossier; arrow keys page the dossier.
Deviations: Clear all data confirms by **typing DESTROY** (accessible from a keyboard, unlike holding). Settings also has **Sound on** (the existing toggle)
and per-setting hints. Reduce motion/flashes are three-way (Follow system / Off / On) so players on a reduced-motion OS can still opt back in.
**Hard mode is fixed when a case starts**, as in Wordle, so it can't be toggled mid-case to dodge a clue. Changes apply from the next case.

- [x] Menu screen styled like a case-file folder on the desk, with the title logo above it. "Open the case file" becomes the gesture that inits audio and opens the menu.
- [x] **New Game**: starts the campaign at chapter 1. If a campaign exists, confirm before overwriting.
- [x] **Continue**: disabled when there's no `campaign.active` (or no `random.active`; show whichever exists, campaign first).
      (Random Case half done in step 5: the label names the case and suspect. The campaign half came with T6 in step 8.)
- [x] **Chapter Select**: 10 case folders. Locked chapters are shown stamped "CLASSIFIED". Unlocked = reached in any run. Each shows its best result. Replay rules: decision D2.
- [x] **Random Case**: T5.
- [x] **Dossier**: one page per culprit (mugshot via `bust()`, name, alias, crime, M.O., "why six guesses", known associates, a quote,
      and status AT LARGE / APPREHENDED (n guesses) / ESCAPED). Locked entries show a redacted page. Optional extra tabs: allies, and the crime lord
      (who stays redacted until the finale).
- [x] **Settings** (persisted in F1, applied live). Step 5 built everything except Skip seen scenes, Export/Import and Replay tutorial, which step 6 added
      (the tutorial button is "Replay the briefing").
  - Volume sliders: **Master, Music, Sound effects, Ambience** (rain + location beds). These map to gain nodes, and ambience needs its own bus.
  - **Text speed** (slow / normal / fast / instant) as a multiplier on typing and hold times only (separate from `SPEED`).
  - **Skip seen scenes**: Ask (show a skip button) / Always / Never. See T3.
  - **Reduce motion** (camera shake, Ken Burns drift) and **Reduce flashes** (lightning, flash, cut-in flash). Both default to the OS setting.
    The flashes toggle matters for photosensitive players.
  - **High-contrast tiles** (orange/blue instead of yellow/green). This is the standard Wordle accessibility option, and it should also change the report emoji.
  - **Hard mode** (revealed hints must be used in later guesses). It could also feed the dossier and endings later.
  - **Typewriter blips** on/off (the per-letter ticks in dialogue).
  - **Mute when the tab is hidden** (suspend the AudioContext on `visibilitychange`).
  - **Data**: Export, Import (T4), **Clear all data**. The clear button shows a red "DESTROY THE FILES?" confirmation and requires typing or holding
    to confirm. It wipes the key and reloads.
  - Replay tutorial (resets the legend scene's seen flag).

### T3. Skip previously viewed cutscenes
**Goal:** scenes the player has already seen can be skipped. "Seen" is stored in browser data (F1 `seen`).

**Status: done (step 6).** Implementation in §1.7 (player), §1.13 (setting, case notes) and §1.12 (seen marks). Deviations from the plan:
- The setting's three values mean: **Ask** = a SKIP ▸▸ button (plus Esc/Space) on seen segments, **Always** = seen segments are skipped automatically
  (the screen stays black and moves on), **Never** = no skipping.
- Esc/Space only skip; they no longer open the in-game menu while a scene plays (it was never reachable mid-scene anyway).
- Quiet mode also applies `@set`, `@mood`, `~rain` and `~tight`/`~loose`, not just flags, so the next unseen segment starts on the right set and mood.
- `AU.quiet` wraps every one-shot sound method. A skipped line finishing instantly would otherwise fire all its ticks and thuds at once.
- Case notes record the clue **before** the informant's scene plays, so even an interrupted or skipped scene leaves the note. A toast says so after the round.
- "Seen once per browser" for the briefing falls out of `seen` being per browser. Settings → "Replay the briefing" un-sees it.

- [x] `play()` takes **segments** instead of one string: `[{ id, src }]` (for example core, then informant, then closer). Mark each ID seen when its segment completes.
- [x] **Story chapters only count a scene as watched once the chapter is won (D1).** Until then the mark is pending (F1 `attempt.pendingSeen`),
      so a lost attempt leaves the scene unskippable. Random Case marks scenes seen immediately.
- [x] Skip control: a "SKIP ▸▸" button in the cinema corner plus Esc/Space. It appears only for seen segments (or always, depending on settings).
      Skipping jumps to the end of the **current segment**. Unseen segments that follow still play.
- [x] Skip semantics: skipping must not lose state. A skip token makes `sleep()` resolve immediately and puts `runLine` into silent mode.
      Silent mode still applies `~flag` (and story flags) and skips all visuals and audio.
- [x] **Gameplay info can't be skipped away.** The informant `~clue` card should either still show briefly or be written into a new
      **case notes** panel on the board. Case notes is recommended: it also lets players re-read clues.
- [x] Generated title cards (closers) count as part of their round segment.
- [x] The intro tail (rules legend) is seen once per browser, not per case.

### T4. Export and import data
- [x] Export downloads `wordle-noir-save-YYYY-MM-DD.json` containing the F1 document plus `{ app: 'wordle-noir', exportedAt }`.
      Use a Blob and a temporary `<a download>`. Also offer "copy as text" for mobile browsers that handle downloads poorly.
- [x] Import: a file picker or pasted text. Validate the `app` marker, version, and shape, then migrate. Show a summary
      ("Chapter 6 in progress · 214 scenes seen · 31 random cases") and confirm before overwriting.
- [x] Malformed files never partially apply (parse and validate everything first, then write once).
- [x] e2e: an export → clear → import round-trip must give an identical document.

**Status: done (step 6).** Implementation in §1.12. Deviations: imports are held to a stricter standard than a local save (the record must add up
and the seen list must be well-formed) because `migrate()` would otherwise quietly "repair" a hand-edited file. A successful import reloads the page.
The e2e round trip compares documents ignoring `updatedAt`, which every write refreshes.

### T5. Random Case mode
**Goal:** today's game as its own standalone mode: one random answer, random intro, performance-driven scenes.

**Status: done (step 5).** Deviations: the "small stats panel" is a one-line record under Random Case in the menu, plus a full panel (cases, % closed,
streak, best, guess distribution with this case's bar highlighted) on the report. **Dropping an open case counts as a loss** once a suspect has been
questioned, because the answer is revealed and the streak shouldn't be dodgeable. A case dropped before the first guess isn't counted.
Results are recorded when the final guess is scored, so reloading during the ending can't skip or double-count it.

- [x] `modes/random.js` wraps the current flow (F3) and uses the `rnd` pack (today's scenes, see D3).
- [x] Track stats (played, won, guess distribution, streaks) in `random.stats` and show them on the report and in a small stats panel.
- [x] Resumable via `random.active` checkpoint (menu → Continue).
- [x] Keeps the share report ("WORDLE NOIR · Case No. ####"), now marked "Hard case" when it was one.

### T6. Ten-chapter story with an overarching plot
**Goal:** 10 chapters, each with a different culprit from the same organization fleeing a different crime, each with its own reason the culprit
must be caught within six guesses, plus character arcs for Dash, his allies, and an overarching crime lord. Full creative control has been delegated.

- [x] **Story bible** `docs/story/bible.md` (write first, get sign-off, then everything else follows it):
      **Done in step 7: revision 2, approved 2026-10-04.** The Editor is Sal, Dash's best friend (the Professor is the red herring), and Dash's
      personal threads play in interludes between chapters, resolved by performance. Its §11 changes are folded into T6, T7 and T8 below.
  - The organization: name, structure, how it uses words or ciphers, and why each member is effectively "a word on the run".
  - The crime lord: identity hidden until the finale, motive, and how they taunt Dash (the existing `WORD` phone voice is a natural seed).
  - The 10 culprits: name, alias, crime, M.O., personality, **why the 6:00 AM deadline matters in their chapter** (a train, a ship, an execution,
    a printing press, a broadcast, a fuse...), and their thread to the next chapter.
  - Arcs across chapters for Dash, Vera, Dooley, Briggs, Sal, plus new allies. Each chapter must move at least one arc.
  - Chapter-by-chapter beat sheet: opening, midpoint turn, catch/escape outcomes, and the outro hook.
  - **Fiction for a random answer:** the answer word is drawn randomly each play (it must be, or replays are trivial). Scenes therefore can't depend
    on specific letters. The culprit is a character, and the word is the name or alias they're hiding behind.
  - Seeds for the easter egg (T7): Dash's suspicious familiarity with every culprit should be plantable but deniable throughout.
- [x] **Campaign mechanics** (`modes/story.js`). **Done in step 8**: implementation in §1.6, §1.12 and §1.13. Deviations:
  - **Bible amendment (owner-approved 2026-10-04):** under D1 an escape always rolls back, so every "Escape" consequence in bible §6 moves to the
    **near miss** (won on guess 5–6), and §10's story flags are set by near-miss wins. The escaped beat is only the retelling. In chapters 1–2 the near
    miss costs the witness (ch 1) and lets the *Lindqvist* sail with the ledger copy (ch 2). Climaxes branch on `?g>=5` so the cost shows in the catch itself.
  - The result is noted when the final guess is scored (`attempt.outcome`), but the win/lose transition waits for the mode's `clear()` after the
    ending, so the outro beats belong to the attempt and a reload mid-ending neither replays nor loses anything.
  - Opening variants live in `intros` (two per chapter in the slice) and the retry picker covers them, the cores, climaxes, epilogues and beats.
    Informants keep Random Case's once-per-case rule rather than avoiding failed attempts' informants (they're chance-driven anyway).
  - Replays (D2) run the same mode with `{ replay: true }`: no checkpoints, seen marks held in memory and committed only if the replay is won.
  - An unwritten chapter would stop the run at the menu with a "still at the typist" toast (all ten are written since step 9).
  - Bit parts not in the bible's cast tables: `FOREMAN` (ch 1), `WARDEN` and `ROSA` (ch 3).
  - **Step 9:** the near miss also lets some culprits get out a door after being named (the Notary in ch 3, Lola in ch 9), which is how
    `notary_free` and "she bows and is gone" work under the amendment. Chapter dates moved to fit the bible's "tomorrow" hooks (§1.10).
  - Chapter = one case. Per-chapter vars available to scripts: `{chapterNo} {chapterTitle} {culprit} {alias} {crime} {deadline}`.
  - **Story flags** persist across chapters (`campaign.storyFlags`). Proposal: keep `~flag` case-scoped, add `~story name` for campaign-scoped flags,
    and let conditions read both. `check-scenes` validates both.
  - Fixed **story beats** per chapter (opening and outro variants by result) wrap the performance-driven round pool.
  - **Interludes** (bible §7): after chapter k's outro (k = 1–9), play its interlude from the pack's `interlude: { kept, late, missed }` slot
    (IDs `cNN.inter.kept` …). The variant comes from the winning attempt: guess 1–2 = kept, 3–4 = late, 5–6 = missed, one step worse if the chapter
    needed a retry. Each interlude belongs to one personal thread (Pop: 1, 5, 8 · Vera: 2, 6, plus chapter 8's result · Nora and Tommy: 3, 7 ·
    the bottle: 4, 9). The marks are computed from `campaign.results`, so they need no save data of their own.
  - **Losing is a retelling** (bible §4): the escaped outro beat returns to the hearing room ("Strike that. That's not how it went.") before
    the rollback.
  - **Losing a chapter (D1):** the culprit escapes (loss climax/epilogue plays), then the story **rolls back to the start of that chapter**.
    The player can't progress until it's won. The rollback discards the attempt's pending seen marks and story flags (F1).
    The retry plays **a different set of scenes**: the picker avoids `usedScenes[chapter]` (scenes from failed attempts, including the opening variant)
    and only reuses a slot's scenes once that slot's pool is exhausted. The checkpoint resumes at the chapter start.
    Bigger pools make retries feel fresh, which is another reason for T8's per-slot counts.
  - Chapter results (written on a win) feed `campaign.results`, the dossier, and the endings. The dossier shows ESCAPED after a loss, until the chapter is won.
  - Answer difficulty can ramp by chapter once difficulty tiers exist (see Backlog B1).

### T7. Endings
**Goal:** the ending depends on the average guesses per solved chapter. A secret ending exists for a perfect run.

**Status: done (steps 8–9).** Logic in save/progress.js (§1.12), scripts in `content/endings/` (§1.3, §1.6). Deviations:
- The endings are one on-demand module (`endings/index.js`) rather than a pack per ending; `endings/names.js` keeps the names apart so the menu
  never loads the scripts. Each scene still has a permanent ID and plays as its own segment.
- After the four codas comes one more scene, `end.close`: the hearing room, Ruth's last question, and the record closed (stamped INSUFFICIENT
  RECORD in the bad ending). The egg has no codas and no close, as the bible says.
- Sal's last 1931 line in A–D is answered three ways by `popTold` / `popHalf` / `popLetter` (chapter 8's interlude); the Pop codas use them too,
  so "Dash heard it from Pop himself" only says so when he did.
- Ending D chooses badge or marriage by the Vera thread (`veraWorst`: he keeps the badge and loses Vera; otherwise the inquiry takes the badge),
  and Dooley inherits it, stays a sergeant, or leaves the force by `dooley_hurt`.

- [x] Compute after chapter 10 from the current run's `results`. Since a chapter must be won to advance (D1), every chapter has a guess count from 1 to 6.
      **Scoring (D7):** each chapter contributes the guesses of its winning attempt. Failed attempts are counted in `results[].attempts` but don't affect the average.
- [x] **Easter egg condition (D7):** all 10 chapters won on guess 1 **of their first attempt** (`guesses === 1 && attempts === 1` for every chapter).
- [x] Proposed bands (avg = mean guesses across 10 chapters):

  | Ending | Condition | Gist |
  |---|---|---|
  | **Easter egg: "The Man in the Mirror"** | all 10 chapters solved on guess 1, each on its first attempt | Dash knew every culprit too well because he runs the organization. Caught by his own blatant familiarity with all ten. |
  | A: Clean sweep | avg < 2.5 | Crime lord unmasked and arrested; arcs resolve warmly |
  | B | 2.5 ≤ avg < 3.5 | Crime lord caught at a cost |
  | C | 3.5 ≤ avg < 4.5 | Bittersweet: organization broken, the lord's fate ambiguous |
  | D | 4.5 ≤ avg < 5.5 | Pyrrhic: Dash loses something big (badge, Vera, a friend) |
  | **Bad: "Last Train Out"** | avg ≥ 5.5 | Crime lord gets away on the 6:00 train |

- [x] Endings live in `content/endings/` (lazy-loaded). Each is a long script and may use story flags for variations.
      **Bible §8:** an ending = the band's case script + four life codas (Pop, Vera, Nora and Tommy, the bottle), each best / middle / worst
      by the thread's total marks (best ≥ ⅔ of the maximum, worst ≤ ⅓). Codas have IDs `end.coda.pop.best` …. The easter egg replaces the codas.
- [x] Unlock record per ending in the save (viewable from the menu once seen) and a "fastest run" stat. (`story.endings`, `story.fastest`; shown under
      Chapter Select, with a replay button per ending found.)
- [x] e2e: forced answers that reach every band, including the easter egg. (Forced `campaign.results` + `NOIR.campaign.playEnding()` for every band;
      two real ten-chapter runs reach the egg and the bad ending.)

### T8. ~150 unique random scenes per chapter
**Goal:** every chapter gets its own full pool, structured like today's Random Case scenes but bigger, all written fresh. No reuse across chapters
or from the Random Case pool. All of it should be noir, funny, and consistent with both the chapter and the overall story.

**Status: done (step 9).** Every chapter meets every row below (`npm run check -- --coverage` shows no gaps): 153 scenes each (150 for chapter 10,
which has no interlude), with 2 outro beats per result rather than 1 so a retry can differ (enforced by `npm test`). Writing notes: one Sal clue
and at most one easter-egg seed per chapter (bible §10 rule 8), midpoints in every guess-3 core, no case talk in interludes. Lines of 40+
characters reused across packs are varied rather than repeated (the checker warns), including Ruth's retelling refrain.

- [x] **Per-chapter budget** (about 146 scenes, which hits the ~150 target while weighting common outcomes):

  | Slot | Count | Note |
  |---|---|---|
  | Opening variants | 3 | story beat, all reference the same chapter facts |
  | Briefing tail | 1 | chapter-flavoured rules/stakes recap (legend only in ch1) |
  | Cores, 5 guesses × buckets | 100 | per guess number: bucket 0 ×5, 1 ×6, 2 ×6, 3 ×3 (bucket 3 is rare in play) |
  | Informants | 12 | chapter-specific informants and allies, spread across n/top/pos/dbl |
  | Win climax + epilogues | 3 + 12 | epilogues 2 per guesses-used 1–6 |
  | Loss climax + epilogues | 3 + 8 | epilogues 2 per bucket 0–3 |
  | Outro beats | 4 | by result: fast catch / slow catch / near miss / escaped; sets up next chapter |
  | Interlude | 3 | chapters 1–9 only: kept / late / missed variants of the same personal scene (bible §7); no cut-ins |
  | Openers, closers | ~20 lines each | one-liners, not counted |

  Plus 12 ending codas (bible §8). 10 chapters is about 1,460 scenes (+27 interludes). At today's ~360 chars average, that's roughly 0.5–0.6 MB of scripts total, loaded about 60 KB per chapter.
- [x] Produce chapter by chapter, in batches (beats → cores per guess number → informants → endings). Run `npm run check` after each batch.
      Step 8 wrote chapters 1–2 at the slice's minimum; step 9 wrote chapters 3–10 in story order, then the endings, then grew chapters 1–2
      (their additions live in `cores-more*.js` and `more.js`, merged by `chapters/merge.js`, so the step-8 IDs never moved).
- [x] **Writing constraints** (enforce in review and partly in the checker; step 9 added an error for a lone `NAME` or `NAME?` line, which would
      otherwise show as narration):
  - Works for any guess/answer. Use `{GUESS}`, `{hitsN}` etc. and never assume letters.
  - 4–9 lines per core scene, using a spread of sets and moods per chapter.
  - **Cut-in budget:** at most 1 `!!` per scene and in about 20% of scenes (ties into T10). At most 1 `**` heavy line per scene.
  - Recurring cast stays in character. New characters get `CAST` entries and portraits.
  - New locations are welcome. Each is one file in `art/sets/`, plus openers.
- [x] Checker additions: ~~per-chapter coverage report~~ (done in T1: `--coverage`), ~~cut-in density warning~~ (done in T10, per pack since step 3),
      ~~cross-chapter duplicate detection~~ (done in T1), and ~~story-flag validation~~ (step 8: `~story` only in story packs, and a condition must name a
      flag or var that exists; plus beat/interlude slots, chapter vars, quiet interludes and the manifest, §1.5).

### T9. More audio
**Goal:** unique stings, jazzy loops, and more sounds that make the world feel alive.

- [x] **Bus restructure** (step 5; `ui` follows the Sound effects slider, see §1.8): `music`, `sfx`, `ambience` (rain + beds), `ui` (keys, ticks), each with its own gain under master, wired to the T2 sliders.
- [ ] **Music scheduler** (lookahead clock pattern) for procedural jazz loops: walking bass (filtered triangle pluck), brushed snare (filtered noise swishes),
      ride cymbal (high-passed noise ticks), Rhodes/vibraphone chords (sine + light FM), and muted-trumpet licks (the existing `riff` voice). Loops per mood:
  - calm: slow smoky ballad, ii–V–I in D minor, brushes only
  - tense: minor ostinato, tremolo strings pad, sparse ride
  - hope: major-key turnaround, open voicings
  - dread: low pedal tone, cluster stabs, no drums
  - plus set-specific variants: **bar** = jukebox loop low-passed "from another room", **apartment** = tinny radio, **station** = big-band echo.
  - Crossfade on mood change instead of hard switches, and duck music under dialogue slightly.
- [ ] **Sting library** (beyond T10's replacement): `stingLow` (default), `stingWord` (dark minor-second cluster for the villain),
      `stingHope` (warm brass swell for green-heavy moments), `stingStamp` (case closed/suspended), and a title theme plus ending themes.
      Add script commands `~sting name`, `~music name`, `~amb name` (validated by the checker).
- [ ] **New SFX:** wet footsteps, door creak/slam, match strike, lighter clink, glass clink and pour, typewriter clatter (for `~paper`),
      newspaper rustle, record crackle, car pass and tires on wet street, horn, gulls and lapping water (docks), crowd murmur (bar/station),
      station bell and PA, neon buzz (synced with `flicker`), wind (rooftop), clock tick (final guess), handcuff click (win), a distant gunshot (rare).
- [ ] **Location ambience beds:** add an `ambience` key to each set module so `@set` changes the bed automatically.
- [ ] Jazz loops start procedural (D4).
- [ ] **Future: all audio moves to recorded files (D4).** Design every sound behind a named-cue API now (`AU.play('sting.low')`, `AU.music('calm')`,
      `AU.amb('docks')`), so each procedural voice can later be swapped for a file without touching scripts. Recommended formats:
      - Keep **`.wav` masters** outside `public/` (lossless source, not deployed).
      - Ship compressed files under `public/audio/`. Either **`.m4a` (AAC)**, which plays in every browser, or **`.ogg` (Opus)**, which is smaller
        and loops cleanly but only plays on recent Safari. Raw `.wav` is roughly 10× the size, too heavy for loops on mobile data.
      - Decode with Web Audio (`decodeAudioData`) and loop via `AudioBufferSourceNode` with `loopStart`/`loopEnd` to keep loops gapless.
        Lazy-load per chapter, the same way scene packs load.

### T10. Deeper, less frequent intense-moment sting
**Goal:** playtesters find the cut-in sting too sharp and overused. Make it lower and deeper.

**Status: done (step 1). Verified by ear 2026-10-03.** Implementation in §1.8. Deviations from the plan:
- "Peak roughly half today's level" is measured at the master output, after the compressor, with the compressor already settled. A render at t=0
  reads about 4 dB low because Chrome's compressor starts in gain reduction. On that measure the cut-in variants peak at 0.23–0.25 vs the old 0.47.
- Halving the peak also lowered the 120–200 Hz phone-speaker body by about 6 dB. If the hit gets lost on phones, raise the saw level in `hit()`
  (`og.gain` 0.32 per saw) rather than `vol`, since the sub and thump are what drive the peak.
- The cooldown's "softer variant or none" became: the 2nd sting within 8 s plays `soft`, the 3rd plays nothing.
- The versus thunder (`AU.thunder()`, which has a 900 Hz highpassed burst) is unchanged. It's thunder, not the sting, and T9 owns new SFX.
- The cut-in budget check from T8's checker list landed here (warning only).

- [x] Replace `AU.sting()` with a low brass-hit design:
  - sub sine around E1 (41 Hz) with a slow pitch settle, plus 2–3 detuned sawtooths at 82/123 Hz (±6 cents)
  - lowpass starting about 700 Hz and closing to about 200 Hz over 1.5–2 s; 30–60 ms attack (no click); peak roughly half today's level
  - low timpani-style thump (tone 70→45 Hz) under the attack, and **no high-passed noise**
  - a long, soft tail instead of a bright snap
- [x] **Variety and restraint:** 2–3 low variants chosen at random; a cooldown (a second sting within ~8 s plays a softer variant or none);
      the versus screen gets its own heavier hit instead of reusing the sting; per-character choice via an optional `CAST[key].sting`.
- [x] Audit current scripts for cut-in density (11 cut-ins + 5 versus across 101 scenes) and keep T8's cut-in budget.
      Result: 11 of 101 scenes (11%), none with more than one `!!`. The two back-to-back cases (intro tail and win climax 2: versus, then cut-in)
      are handled by the cooldown. `npm run check` now enforces the budget.
- [x] Verify by ear at several volumes and on phone speakers (where low frequencies vanish, so keep a 120–200 Hz body so the hit still reads).
      Measured offline (§1.8) and approved by ear.

## 2.3 Recommended build order

Ordered so each step stands on finished foundations, playtester pain gets fixed first, and the long content effort starts once the
structure that holds it is settled.

| # | Step | Items | Why here |
|---|---|---|---|
| 1 ✓ | **Deeper sting + cut-in cooldown** | T10 | Small, isolated, and directly fixes playtester feedback. Ships alone. |
| 2 ✓ | **Smoke test in repo** | F4 | Safety net before the big refactors. |
| 3 ✓ | **Scene registry + chapter tags** | F2, T1 | Every later feature keys off stable scene IDs and packs. |
| 4 ✓ | **Save system** | F1 | Continue, settings, skip-seen, export/import, and the campaign all need it. |
| 5 ✓ | **Screens + modes refactor, Random Case mode, main menu shell, settings** | F3, T5, T2 (partial) | Today's game becomes "Random Case" behind a real menu. Story entries show as "coming soon". Settings land with audio buses (start of T9). |
| 6 ✓ | **Skip seen scenes + case notes, export/import** | T3, T4 | Both are small once F1/F2 exist, and they make testing long content faster. |
| 7 ✓ | **Story bible** (approved 2026-10-04) | T6 | Can be drafted in parallel from step 3 on. It must be approved before campaign code hard-codes chapter facts. |
| 8 ✓ | **Campaign framework + vertical slice** | T6, T7, T2 (rest) | Chapter flow, attempts and loss rollback, retry scene variety, story flags, continue, chapter select, dossier, endings logic with placeholder endings. Chapters 1–2 get fresh minimum coverage (2 scenes per slot, so retries can differ) to prove the whole loop end to end. |
| 9 ✓ | **Content production, chapter by chapter** | T8, T7 | Write each chapter fresh to ~146 scenes, in story order, then the 6 endings plus the easter egg. |
| 10 | **Audio expansion** | T9 | Runs in parallel with step 9: jazz scheduler, stings, SFX, ambience beds, script commands. |

## 2.4 Decisions

**Decided (2026-10-03):**

| # | Question | Decision |
|---|---|---|
| D1 | What happens when a story chapter is lost (no solve in 6)? | The culprit escapes and the story **rolls back to the start of the chapter**. The player can't progress until the chapter is won. Cutscenes viewed during the failed attempt **do not count as watched**. The next attempt plays **a different set of scenes**. Implementation: F1 chapter attempts, T3 pending seen marks, T6 retry picker. |
| D2 | Do chapter-select replays change the campaign record? | No. Endings use the **current run** only (so the easter egg can't be farmed by replaying chapters). Replays update best-ever stats and the dossier. |
| D3 | What happens to today's scenes? | **All current scenes become the Random Case pool from the start** (`rnd` pack, `chapter: 0`). The story starts fresh: chapters 1–10 are entirely new writing. |
| D4 | Jazz loops: procedural or audio files? | Start procedural. **One day all audio will be replaced with recorded files** (`.wav` masters, shipped as `.m4a`/`.ogg`; see T9). Build the audio API around named cues so that swap is painless. |
| D5 | Ending thresholds | Bands as proposed in T7 (2.5 / 3.5 / 4.5 / 5.5). |
| D6 | Is the answer visible in save/export files? | **Lightly obfuscated** (base64 + salt) in saves and exports, to stop casual peeking. Real secrecy is impossible client-side, and fine for this game. Implementation: F1. |
| D7 | With rollback (D1), do failed attempts affect the ending? | The average uses the guesses from the **winning attempt** of each chapter. Failed attempts are recorded as `attempts` (a stat and dossier flavour) and don't change the average. The easter egg requires every chapter to be won **on guess 1 of its first attempt**, so retrying can't fish for it. Implementation: T7. |

No open decisions right now. Add new ones here as they come up.

## 2.5 Backlog (mentioned earlier, not scheduled)

- **B1. Difficulty levels by word rarity and repeat letters.** Needs frequency data per answer (an annotated `answers.txt`, e.g. `crane 4.2`)
  and a double-letter flag. Tiers could be a player setting in Random Case and a per-chapter ramp in the campaign.
- **B2. "Thousands of generated scenes."** The F2 pack format is the target output for any generator. Keep generated packs as plain JS modules so there's still no build step.
- **B3. Server-side features** (cloud saves, daily case, leaderboards) would add a Worker script (`main` in `wrangler.jsonc`) plus KV/D1.
  Not needed for anything above, since all of T1–T10 is client-side.
