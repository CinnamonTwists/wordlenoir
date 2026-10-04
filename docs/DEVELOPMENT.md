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
| What it is | Single-mode Wordle variant: one five-letter answer, six guesses, a noir cutscene after every guess. |
| Stack | Vanilla JS (native ES modules), CSS, inline SVG art, Web Audio synthesis. No framework, no dependencies, **no build step**. |
| Hosting | Cloudflare Workers Builds, Worker `raspy-term-4561`, domain wordlenoir.com. Push to `main` deploys. |
| Persistence | None yet. Nothing survives a reload. |
| Content | 101 scene scripts + 21 one-line openers, 13 characters, 11 locations, 2,309 answers, 12,546 extra valid guesses. |
| Average scene | ~357 characters of script. |

## 1.2 Run, test, deploy

```sh
npm run dev      # zero-dep static server for public/ on :8788 (tools/dev-server.mjs)
npm run check    # validates all scenes + word lists (tools/check-scenes.mjs), exit 1 on errors
npm run preview  # wrangler dev (Cloudflare's runtime), downloads wrangler on first run
```

- ES modules don't load from `file://`, so always use a server.
- **URL `#speedN`** (e.g. `#speed20`) scales every scripted delay. `#speed400` plays a full case in about a second.
- **Console hook `window.NOIR`**: `S` (state), `speed`, `forceAnswer`, `forceInf` (true = informant every round, false = never),
  `press(key)`, `play(src, ctx)`, `score`, `stats()`, `parseScript`, `ANSWERS`, `ALLOWED`, `VT` (virtual ms played), `MISSING` (unfilled `{vars}`).
- **End-to-end check used so far**: headless Chrome driven over the DevTools Protocol, setting `#speed400`,
  `NOIR.forceAnswer`, and typing guesses via `NOIR.press`, then asserting the win/loss report and that there are no console errors.
  It is not in the repo yet (roadmap F4).
- **Deploy**: `wrangler.jsonc` publishes only `public/`. `name` must stay `raspy-term-4561` or Workers Builds fails.
  The dashboard deploy command must be the default `npx wrangler deploy`.
- The Cloudflare Web Analytics beacon is hard-coded at the bottom of `public/index.html`. Locally it 404s on `/cdn-cgi/rum`. That's expected.

## 1.3 Module map

```
public/js/
  main.js                 Boot: starts rain/grain, title backdrop, button wiring, window.NOIR
  core/
    util.js               R, pick, clamp, cap, nounN, NUMW, ORD, fmtTime, pickUnused        [DOM-free]
    timing.js             SPEED/setSpeed, sleep(ms), VT, REDUCED (prefers-reduced-motion)
    dom.js                $()
  audio/audio.js          AU: the whole Web Audio synth (sfx, drone music, rain bed)        [DOM-free at import]
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
    stage.js              C (DOM refs + state), blackIn/Out, lit, hideText, flashFx, shake, setScene, setMood
    text.js               typeInto (typewriter), narrate, say (portrait + nameplate), emParse (_em_)
    effects.js            cutin, heavy, versus, card, stamp, paper, clue, legend
    player.js             runLine (dispatch), play(src, ctx)
  script/parser.js        parseScript, condOK, fill, MISSING                                 [DOM-free]
  content/                The story                                                          [DOM-free]
    cast.js               CAST: key → { name, color, bust }
    names.js              NAMES_M, NAMES_F (for {victim}/{singer})
    scenes/               intros, intro-tail, openers, cores/suspect-1..5, informants, win, loss, closers, index
  game/
    state.js              S (live binding) + setState, used (no-repeat sets), DEBUG
    words.js              WORDS {answers, allowed}, loadWords() (fetch), parseWordList        [DOM-free at import]
    scoring.js            score, candidates, stats, bucketOf                                [DOM-free]
    board.js              grid/keyboard/clock/cigarettes/memo/toast, revealRow, verdictLine
    case.js               genTimes, genCase, baseVars, guessVars
    informant.js          informant(g, bucket, ctx): maybe returns an informant script + sets ctx.clue
    report.js             showReport(onNewCase), share text
    game.js               press, attachKeyboard, submit, newCase, playScene (play + restore music)
public/css/               base, title, board, cinema, effects, overlays, ambient (link order = cascade order)
public/data/words/        answers.txt, allowed.txt (one word per line, # comments allowed)
tools/                    dev-server.mjs, check-scenes.mjs
```

**Dependency direction:** `main → game → cinema → (art, audio, fx, script, content) → core`. Nothing imports `game/` except `main.js`
(and other `game/` modules). Callbacks avoid cycles: `buildKB(onKey)`, `showReport(onNewCase)`.

**DOM-free rule:** anything `tools/check-scenes.mjs` imports must not touch `document`/`window` at import time. Keep it that way for all
`content/`, `script/`, `art/`, and pure `game/` logic. New Node tools depend on it.

## 1.4 Runtime flow

```
page load ─ main.js: loadWords() (async), startRain/Grain, keyboard listener, street backdrop, heavy rain
   │
"Open the case file" click ─ AU.init() (needs this user gesture), riff, await words, fade title, office backdrop
   │
newCase()  ─ genCase() picks an intro (no repeat until all 12 used) + vars; setState({...}); build grid/kb
   │         play(intro.s + INTRO_TAIL)          ← tail = rules legend + "SIX SUSPECTS" + first title card
   ▼
board: player types ─ press() ─ submit()
   │   invalid length/word → shake + toast (the row keeps its letters)
   │   revealRow (interrogation flip) → S.counts.push(candidates) → memo verdict
   ├─ win  → riff, play(WIN_CLIMAX + WIN_EPI[g]) → report
   ├─ g==6 → play(LOSS_CLIMAX + LOSS_EPI[bucket]) → piano → report
   └─ else → play(core(g,bucket) with opener + maybe informant + "## {nextTime} | closer")
              → back to board, memo "Suspect g+1 of 6"
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

`used.intro` / `used.core` live outside `S`, so no-repeat works across cases in one session. They are not persisted.

**Script context `ctx`:** `{ vars, flags, clue }`. `vars` come from `baseVars()` (intro) or `guessVars()` (rounds).
`informant()` mutates `ctx.vars` and sets `ctx.clue = { label, big, sub }` before `play()`. `flags` is `S.flags` itself, so `~flag` writes into the case.

**Scenes today are bare template strings** (cores, openers, endings) or `{ id, title, s }` (intros) / `{ id, type, who, s }` (informants).
Most have **no stable ID**. That's roadmap F2.

## 1.6 The scene system

Full syntax: [scene-scripts.md](scene-scripts.md). Summary of how scenes are chosen:

| Pool | Count | Selection |
|---|---|---|
| `INTROS` | 12 (crossword, singer, ransom, dying, witness, password, telegram, typewriter, lastwords, dictionary, femme, cipher) | `pickUnused` per session |
| `INTRO_TAIL` | 1 | always |
| `CORES['g-b']` | 56 total; 3 per slot (1-0 has 4, every `-3` slot has 2) | `pickUnused` per session, shared set across slots |
| `OPENERS[set]` | 21 lines over 10 sets | appended after the **first** `@set name` line without `!` in a core (regex in `withOpener`) |
| `INFORMANTS` | 9: pete/n, zero/top, prof/pos, dooley/dbl, sal/top, nickel/pos, telegram/n, fenn/n, lola/top | see below; each at most once per case |
| `CLOSERS[left]` | 2 per count | title card `## {nextTime} \| line` |
| `WIN_CLIMAX` + `WIN_EPI[1..6]` | 2 + 12 | random + by guesses used |
| `LOSS_CLIMAX` + `LOSS_EPI[0..3]` | 2 + 7 | random + by last guess's bucket |

**Informant chance:** `p = [0, .22, .35, .45, .5, .6][g] + (bucket 0 ? .15 : 0)`, ×0.4 if the previous round had one (and g < 5).
Types offered depend on `stats()`: `n` (candidates left) and `dbl` (double-letter odds) always; `top` (likeliest unrevealed letter)
and `pos` (likeliest letter in an unsolved slot) only when computable.

**Vars by scope** (enforced by `npm run check`): intro vars ⊂ round vars ⊂ informant vars. See scene-scripts.md.

**Flags in use:** `warned`, `suspended`, `vera_upset`, `vera_soft`, `vera_gone`, `evicted`. All case-scoped.

**Interpolation happens per line at play time** (`fill`), so vars set mid-way would apply to later lines. Unknown `{vars}` are left
literally in the text and recorded in `NOIR.MISSING`.

## 1.7 Cinema engine

- **Layers** (z-index): `#backdrop` 0 → `#rain` 1 → `#title`/`#board` 2 → `#cinema` 10 (bgA/bgB cross-fade, `#crain`, mood colour layer,
  vignette, letterbox bars, `#narr`, `#dlg`, `#fx` 8, `#black` 20, `#flash` 21) → overlays 30 → `#toast` 40 → `#grain` 60.
- **One `RAIN` instance**, re-attached between `#rain` (board) and `#crain` (cinema).
- **Every delay goes through `sleep()`**, and CSS transitions set in JS divide by `SPEED`. New effects must do both or `#speedN` testing breaks.
- `typeInto` has a fast path when `SPEED > 20` (prints text whole).
- Fixed beat durations (at speed 1): cut-in about 3.1 s, heavy line 2.2 s + per-word, versus about 4.8 s, card 1.6 s + typing + 2.4 s, stamp about 3 s,
  paper 0.6 s + typing + 2.4 s, clue 5.2 s, legend about 10 s. Dialogue holds `clamp(1200 + 30·len, 1900, 5400)` ms after typing.
- `@set` while black swaps instantly; while lit it hides text and cross-fades (900 ms).
- **Moods** (`@mood`): CSS filter on `.bgs` plus `#moodlay` colour blend plus vignette (css/cinema.css), and the drone mode from `MOOD_MUSIC`.
  noir/warm/blue → calm, gold → hope, red → dread, sick/violet → tense.
- `body.stakes-N` (N = guesses + 1) reddens the board vignette from stakes 4 on.

## 1.8 Audio (audio/audio.js)

Graph: `sfx` (0.8) and `mus` (0.55) and `rainG` → `DynamicsCompressor` → `master` (0.85, or 0 when muted) → speakers.
A 2 s noise buffer is shared by rain, bursts and thunder. `AU.init()` must run inside a user gesture. Every method no-ops before init.

| Method | Sound | Triggered by |
|---|---|---|
| `setMusic(mode)` | 4-oscillator drone through LFO lowpass; modes calm/tense/hope/dread | `@mood`, after each scene |
| `setRain(level, indoor)` | filtered noise bed; indoor = 900 Hz lowpass | `@set`, `~rain` |
| `riff()` | 8-note sawtooth "muted trumpet" phrase (G minor) | start button, win |
| `piano(notes, gap)` | triangle+sine notes | every title card (1 note), loss (4-note fall) |
| **`sting()`** | **5 sawtooth oscillators 110–466 Hz, lowpass 3.2 kHz→500 Hz over 1.3 s, plus a 1.8 kHz highpass noise burst** | **every `!!` cut-in (11 in scripts) and every `%%` versus (5)** |
| `boom`, `thud` | low sine drops + noise | heavy lines |
| `heart` | double low thump | `~heart`, reveal |
| `flip(0/1/2)` | gray thunk / yellow dyad / green arpeggio | tile reveals, legend |
| `tick`, `key` | typewriter tick, key press | typing, keyboard |
| `stamp`, `ring`, `hangup`, `whistle`, `siren`, `thunder`, `telegraph`, `foghorn` | one-shots | `~stamp`, `~sfx` |

The sting's harshness comes from the bright sawtooth partials starting at 3.2 kHz and the high-passed noise.
Its overuse comes from being tied to every cut-in and versus with no variety and no cooldown.

## 1.9 Visual conventions

- Sets are **1600×900 SVG** strings (`preserveAspectRatio="xMidYMid slice"`). Use `svg()` from art/svg.js to get the shared `DEFS`
  (ids `nSky nGlow nGlowR nCone nBeam nFog nWet nWater nMoon nHalo nBlur6 nBlur18 nNeon nBrick`).
- Procedural detail uses **seeded** `rng(seed)`, so a set looks identical every time. Pick a new seed per new set.
- Ambient animation classes (css/ambient.css): `flicker`, `swing`, `sweepA/B`, `rise` (+`d2`/`d3`), `shim`.
- Portraits: `bust({ hat: fedora|wide|cap|scarf, hair: short|long|bob|bun|bald, build, coat, cig, glasses, eyes, color })` on a 220×260 viewBox.
- Fonts (Google): Limelight (display), Big Shoulders Display (impact), Cormorant Garamond (narration), Special Elite (typewriter), Courier Prime (dialogue).

## 1.10 Story canon so far (Random Case material)

All current scenes become the Random Case pool (decision D3). Story mode starts fresh with new scenes. Characters, setting and tone
below may carry into the story, but no existing scene text will.


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
- `play()` takes one concatenated script string. Win/loss concatenate climax + epilogue, and rounds concatenate core + informant + closer.
  This will need to change for skip-seen (Part 2, T3).
- CSS `<link>` order in index.html is the cascade order (base → title → board → cinema → effects → overlays → ambient).
- Git is `core.autocrlf=true`. Word-list and script parsing trim lines, so CRLF is harmless. Keep it that way.
- Typing `~sfx` with an unknown name silently does nothing in-game. `npm run check` is what catches it.
- Pickers (`pickUnused`) reset a pool once it is exhausted. With bigger pools, repeats get rarer for free.

---

# Part 2: Roadmap

Requested items are **T1–T10** (in the order they were given). **F1–F4** are foundations several of them need.
Each item has: goal, design notes, tasks, dependencies. The recommended order is in §2.3 and open decisions are in §2.4.

## 2.1 Foundations

### F1. Save system (browser storage)
**Needed by:** T2 (continue, settings, clear data), T3, T4, T6/T7 campaign, dossier.

- [ ] `public/js/save/store.js`: a single namespaced key (`wordlenoir.save`) holding a versioned JSON document. All access goes through
      `load()`, `get(path)`, `update(fn)`, and `reset()`. Debounced writes. Every `localStorage` call wrapped in try/catch (private mode or quota
      errors fall back to in-memory and the UI says progress won't be kept).
- [ ] Schema v1 (draft):
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
- [ ] `migrate(doc)` chain keyed by `v`. Unknown future versions are refused rather than clobbered.
- [ ] **Answer obfuscation (D6):** every stored answer (snapshots, `results`, exports) goes through `hide(word)`/`reveal(str)` (base64 + a fixed salt),
      so the solution isn't readable at a glance in devtools or an exported file.
- [ ] **Snapshot** = serializable case state: `S` minus transient fields (`busy`, `cur`), with Sets converted to arrays. Save at checkpoints:
      after the intro finishes, and after each round's scene finishes. Quitting mid-scene resumes on the board after the last checkpoint.
      That scene is then "seen", so it can be skipped on replay.
- [ ] **Chapter attempts (D1):** a story chapter runs as an *attempt*. Scenes seen during it go to `attempt.pendingSeen` and merge into `seen`
      only when the chapter is won. A loss throws the attempt away: pending seen marks are discarded, story flags revert to `startFlags`,
      the played scene IDs are added to `usedScenes[chapter]`, and the player restarts at the chapter's beginning.
      Random Case commits `seen` as soon as each segment completes.

### F2. Scene registry: stable IDs, chapter tags, lazy loading
**Needed by:** T1, T3, T5, T6, T8.

- [ ] Every scene becomes an object: `{ id, chapter, s }`, plus slot-specific fields (`title` for intros, `type`/`who` for informants).
      **IDs are save-data keys and must never be renumbered or reused.** Scheme: `c01.core.3-2.07`, `c01.open.b`, `c01.inf.ruby`,
      `c01.win.epi.4.b`, `rnd.intro.crossword`, `rnd.core.1-0.03`, `end.best`.
- [ ] Content packs, one per chapter: `content/chapters/c01/index.js` exports
      `{ chapter, title, culprit, intros, tail, cores, informants, openers, win: { climax, epi }, loss: { climax, epi }, closers, beats }`.
      Loaded with `await import(\`../content/chapters/c${nn}/index.js\`)` only when needed. About 150 scenes × ~400 chars is about 60 KB per chapter.
- [ ] `content/registry.js`: `loadPack(chapter | 'random')` and lookup by ID. The game asks the registry for pools and never imports scene files directly.
- [ ] Random Case pack `content/random/index.js` (ID prefix `rnd.`, `chapter: 0`). Same shape as a chapter pack.
- [ ] One-off migration script (`tools/migrate-scenes.mjs`) that assigns IDs to the existing 101 scenes and writes them into the **`rnd` pack** (T1, D3).
      Chapter packs `c01`–`c10` start empty and are written fresh.

### F3. Screens and game modes
**Needed by:** T2, T5, T6.

- [ ] `public/js/ui/screens.js`: a tiny screen manager (`show('menu' | 'settings' | 'dossier' | 'chapters' | 'game')`) handling hidden/visible state,
      focus, and Esc/back. The title section becomes the first screen.
- [ ] Refactor `game/game.js` into a **session runner** parameterized by a **mode** object:
  ```js
  mode = {
    id: 'random' | 'story',
    pickAnswer(), introScript(), roundScript(g, bucket, ctx), endScript(won, g, bucket, ctx),
    vars(), onCheckpoint(snapshot), onComplete(result)
  }
  ```
  The current behavior becomes `modes/random.js`, and story chapters become `modes/story.js`. Board, reveal and report stay shared.
- [ ] Replace the in-game "New case" button with a **Menu** button (resume, settings, sound, quit to main menu with a save).

### F4. Automated smoke test
**Why first:** this roadmap rewrites most of `game/`. A one-command regression check pays for itself immediately.

- [ ] `tools/e2e.mjs` (zero-dep, Node ≥ 22 has a global WebSocket): starts the dev server, launches local Chrome/Edge headless with
      `--remote-debugging-port`, then plays a win and a loss at `#speed400` via `NOIR`. It asserts the report, no console errors, and no `NOIR.MISSING`.
      Add the script `npm run e2e`.
- [ ] Extend as modes land: random mode, a full campaign at speed with forced answers (to reach every ending, including the easter egg), save/resume, import/export round-trip.

## 2.2 Requested items

### T1. Chapter flag on every scene
**Goal:** each scene declares which chapter it belongs to. `chapter: 1`–`10` are story chapters, and `chapter: 0` is the Random Case pool.
All existing scenes go to the Random Case pool from the start (D3). The story starts fresh.

- [ ] Done via F2: the `chapter` field on every scene object, existing content moved into the `rnd` pack with `chapter: 0`.
- [ ] `check-scenes` enforces that every scene has a `chapter` matching its pack, IDs are unique across all packs, and
      **no scene text is reused across chapters** (normalized-text hash comparison).
- [ ] `check-scenes --coverage` prints per-chapter slot counts against targets (see T8 budget).
- [ ] The checker also enforces that no story chapter reuses Random Case text.

### T2. Main menu and settings
**Goal:** Main menu with New Game, Continue, Chapter Select, Random Case, Dossier, Settings.

- [ ] Menu screen styled like a case-file folder on the desk, with the title logo above it. "Open the case file" becomes the gesture that inits audio and opens the menu.
- [ ] **New Game**: starts the campaign at chapter 1. If a campaign exists, confirm before overwriting.
- [ ] **Continue**: disabled when there's no `campaign.active` (or no `random.active`; show whichever exists, campaign first).
- [ ] **Chapter Select**: 10 case folders. Locked chapters are shown stamped "CLASSIFIED". Unlocked = reached in any run. Each shows its best result. Replay rules: decision D2.
- [ ] **Random Case**: T5.
- [ ] **Dossier**: one page per culprit (mugshot via `bust()`, name, alias, crime, M.O., "why six guesses", known associates, a quote,
      and status AT LARGE / APPREHENDED (n guesses) / ESCAPED). Locked entries show a redacted page. Optional extra tabs: allies, and the crime lord
      (who stays redacted until the finale).
- [ ] **Settings** (persisted in F1, applied live):
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

- [ ] `play()` takes **segments** instead of one string: `[{ id, src }]` (for example core, then informant, then closer). Mark each ID seen when its segment completes.
- [ ] **Story chapters only count a scene as watched once the chapter is won (D1).** Until then the mark is pending (F1 `attempt.pendingSeen`),
      so a lost attempt leaves the scene unskippable. Random Case marks scenes seen immediately.
- [ ] Skip control: a "SKIP ▸▸" button in the cinema corner plus Esc/Space. It appears only for seen segments (or always, depending on settings).
      Skipping jumps to the end of the **current segment**. Unseen segments that follow still play.
- [ ] Skip semantics: skipping must not lose state. A skip token makes `sleep()` resolve immediately and puts `runLine` into silent mode.
      Silent mode still applies `~flag` (and story flags) and skips all visuals and audio.
- [ ] **Gameplay info can't be skipped away.** The informant `~clue` card should either still show briefly or be written into a new
      **case notes** panel on the board. Case notes is recommended: it also lets players re-read clues.
- [ ] Generated title cards (closers) count as part of their round segment.
- [ ] The intro tail (rules legend) is seen once per browser, not per case.

### T4. Export and import data
- [ ] Export downloads `wordle-noir-save-YYYY-MM-DD.json` containing the F1 document plus `{ app: 'wordle-noir', exportedAt }`.
      Use a Blob and a temporary `<a download>`. Also offer "copy as text" for mobile browsers that handle downloads poorly.
- [ ] Import: a file picker or pasted text. Validate the `app` marker, version, and shape, then migrate. Show a summary
      ("Chapter 6 in progress · 214 scenes seen · 31 random cases") and confirm before overwriting.
- [ ] Malformed files never partially apply (parse and validate everything first, then write once).
- [ ] e2e: an export → clear → import round-trip must give an identical document.

### T5. Random Case mode
**Goal:** today's game as its own standalone mode: one random answer, random intro, performance-driven scenes.

- [ ] `modes/random.js` wraps the current flow (F3) and uses the `rnd` pack (today's scenes, see D3).
- [ ] Track stats (played, won, guess distribution, streaks) in `random.stats` and show them on the report and in a small stats panel.
- [ ] Resumable via `random.active` checkpoint.
- [ ] Keeps the share report ("WORDLE NOIR · Case No. ####").

### T6. Ten-chapter story with an overarching plot
**Goal:** 10 chapters, each with a different culprit from the same organization fleeing a different crime, each with its own reason the culprit
must be caught within six guesses, plus character arcs for Dash, his allies, and an overarching crime lord. Full creative control has been delegated.

- [ ] **Story bible** `docs/story/bible.md` (write first, get sign-off, then everything else follows it):
  - The organization: name, structure, how it uses words or ciphers, and why each member is effectively "a word on the run".
  - The crime lord: identity hidden until the finale, motive, and how they taunt Dash (the existing `WORD` phone voice is a natural seed).
  - The 10 culprits: name, alias, crime, M.O., personality, **why the 6:00 AM deadline matters in their chapter** (a train, a ship, an execution,
    a printing press, a broadcast, a fuse...), and their thread to the next chapter.
  - Arcs across chapters for Dash, Vera, Dooley, Briggs, Sal, plus new allies. Each chapter must move at least one arc.
  - Chapter-by-chapter beat sheet: opening, midpoint turn, catch/escape outcomes, and the outro hook.
  - **Fiction for a random answer:** the answer word is drawn randomly each play (it must be, or replays are trivial). Scenes therefore can't depend
    on specific letters. The culprit is a character, and the word is the name or alias they're hiding behind.
  - Seeds for the easter egg (T7): Dash's suspicious familiarity with every culprit should be plantable but deniable throughout.
- [ ] **Campaign mechanics** (`modes/story.js`):
  - Chapter = one case. Per-chapter vars available to scripts: `{chapterNo} {chapterTitle} {culprit} {alias} {crime} {deadline}`.
  - **Story flags** persist across chapters (`campaign.storyFlags`). Proposal: keep `~flag` case-scoped, add `~story name` for campaign-scoped flags,
    and let conditions read both. `check-scenes` validates both.
  - Fixed **story beats** per chapter (opening and outro variants by result) wrap the performance-driven round pool.
  - **Losing a chapter (D1):** the culprit escapes (loss climax/epilogue plays), then the story **rolls back to the start of that chapter**.
    The player can't progress until it's won. The rollback discards the attempt's pending seen marks and story flags (F1).
    The retry plays **a different set of scenes**: the picker avoids `usedScenes[chapter]` (scenes from failed attempts, including the opening variant)
    and only reuses a slot's scenes once that slot's pool is exhausted. The checkpoint resumes at the chapter start.
    Bigger pools make retries feel fresh, which is another reason for T8's per-slot counts.
  - Chapter results (written on a win) feed `campaign.results`, the dossier, and the endings. The dossier shows ESCAPED after a loss, until the chapter is won.
  - Answer difficulty can ramp by chapter once difficulty tiers exist (see Backlog B1).

### T7. Endings
**Goal:** the ending depends on the average guesses per solved chapter. A secret ending exists for a perfect run.

- [ ] Compute after chapter 10 from the current run's `results`. Since a chapter must be won to advance (D1), every chapter has a guess count from 1 to 6.
      **Scoring (D7):** each chapter contributes the guesses of its winning attempt. Failed attempts are counted in `results[].attempts` but don't affect the average.
- [ ] **Easter egg condition (D7):** all 10 chapters won on guess 1 **of their first attempt** (`guesses === 1 && attempts === 1` for every chapter).
- [ ] Proposed bands (avg = mean guesses across 10 chapters):

  | Ending | Condition | Gist |
  |---|---|---|
  | **Easter egg: "The Man in the Mirror"** | all 10 chapters solved on guess 1, each on its first attempt | Dash knew every culprit too well because he runs the organization. Caught by his own blatant familiarity with all ten. |
  | A: Clean sweep | avg < 2.5 | Crime lord unmasked and arrested; arcs resolve warmly |
  | B | 2.5 ≤ avg < 3.5 | Crime lord caught at a cost |
  | C | 3.5 ≤ avg < 4.5 | Bittersweet: organization broken, the lord's fate ambiguous |
  | D | 4.5 ≤ avg < 5.5 | Pyrrhic: Dash loses something big (badge, Vera, a friend) |
  | **Bad: "Last Train Out"** | avg ≥ 5.5 | Crime lord gets away on the 6:00 train |

- [ ] Endings live in `content/endings/` as packs (lazy-loaded). Each is a long script and may use story flags for variations.
- [ ] Unlock record per ending in the save (viewable from the menu once seen) and a "fastest run" stat.
- [ ] e2e: forced answers that reach every band, including the easter egg.

### T8. ~150 unique random scenes per chapter
**Goal:** every chapter gets its own full pool, structured like today's Random Case scenes but bigger, all written fresh. No reuse across chapters
or from the Random Case pool. All of it should be noir, funny, and consistent with both the chapter and the overall story.

- [ ] **Per-chapter budget** (about 146 scenes, which hits the ~150 target while weighting common outcomes):

  | Slot | Count | Note |
  |---|---|---|
  | Opening variants | 3 | story beat, all reference the same chapter facts |
  | Briefing tail | 1 | chapter-flavoured rules/stakes recap (legend only in ch1) |
  | Cores, 5 guesses × buckets | 100 | per guess number: bucket 0 ×5, 1 ×6, 2 ×6, 3 ×3 (bucket 3 is rare in play) |
  | Informants | 12 | chapter-specific informants and allies, spread across n/top/pos/dbl |
  | Win climax + epilogues | 3 + 12 | epilogues 2 per guesses-used 1–6 |
  | Loss climax + epilogues | 3 + 8 | epilogues 2 per bucket 0–3 |
  | Outro beats | 4 | by result: fast catch / slow catch / near miss / escaped; sets up next chapter |
  | Openers, closers | ~20 lines each | one-liners, not counted |

  10 chapters is about 1,460 scenes. At today's ~360 chars average, that's roughly 0.5–0.6 MB of scripts total, loaded about 60 KB per chapter.
- [ ] Produce chapter by chapter, in batches (beats → cores per guess number → informants → endings). Run `npm run check` after each batch.
- [ ] **Writing constraints** (enforce in review and partly in the checker):
  - Works for any guess/answer. Use `{GUESS}`, `{hitsN}` etc. and never assume letters.
  - 4–9 lines per core scene, using a spread of sets and moods per chapter.
  - **Cut-in budget:** at most 1 `!!` per scene and in about 20% of scenes (ties into T10). At most 1 `**` heavy line per scene.
  - Recurring cast stays in character. New characters get `CAST` entries and portraits.
  - New locations are welcome. Each is one file in `art/sets/`, plus openers.
- [ ] Checker additions: per-chapter coverage report, cut-in density warning, cross-chapter duplicate detection, and story-flag validation.

### T9. More audio
**Goal:** unique stings, jazzy loops, and more sounds that make the world feel alive.

- [ ] **Bus restructure:** `music`, `sfx`, `ambience` (rain + beds), `ui` (keys, ticks), each with its own gain under master, wired to the T2 sliders.
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

- [ ] Replace `AU.sting()` with a low brass-hit design:
  - sub sine around E1 (41 Hz) with a slow pitch settle, plus 2–3 detuned sawtooths at 82/123 Hz (±6 cents)
  - lowpass starting about 700 Hz and closing to about 200 Hz over 1.5–2 s; 30–60 ms attack (no click); peak roughly half today's level
  - low timpani-style thump (tone 70→45 Hz) under the attack, and **no high-passed noise**
  - a long, soft tail instead of a bright snap
- [ ] **Variety and restraint:** 2–3 low variants chosen at random; a cooldown (a second sting within ~8 s plays a softer variant or none);
      the versus screen gets its own heavier hit instead of reusing the sting; per-character choice via an optional `CAST[key].sting`.
- [ ] Audit current scripts for cut-in density (11 cut-ins + 5 versus across 101 scenes) and keep T8's cut-in budget.
- [ ] Verify by ear at several volumes and on phone speakers (where low frequencies vanish, so keep a 120–200 Hz body so the hit still reads).

## 2.3 Recommended build order

Ordered so each step stands on finished foundations, playtester pain gets fixed first, and the long content effort starts once the
structure that holds it is settled.

| # | Step | Items | Why here |
|---|---|---|---|
| 1 | **Deeper sting + cut-in cooldown** | T10 | Small, isolated, and directly fixes playtester feedback. Ships alone. |
| 2 | **Smoke test in repo** | F4 | Safety net before the big refactors. |
| 3 | **Scene registry + chapter tags** | F2, T1 | Every later feature keys off stable scene IDs and packs. |
| 4 | **Save system** | F1 | Continue, settings, skip-seen, export/import, and the campaign all need it. |
| 5 | **Screens + modes refactor, Random Case mode, main menu shell, settings** | F3, T5, T2 (partial) | Today's game becomes "Random Case" behind a real menu. Story entries show as "coming soon". Settings land with audio buses (start of T9). |
| 6 | **Skip seen scenes + case notes, export/import** | T3, T4 | Both are small once F1/F2 exist, and they make testing long content faster. |
| 7 | **Story bible** (needs your sign-off) | T6 | Can be drafted in parallel from step 3 on. It must be approved before campaign code hard-codes chapter facts. |
| 8 | **Campaign framework + vertical slice** | T6, T7, T2 (rest) | Chapter flow, attempts and loss rollback, retry scene variety, story flags, continue, chapter select, dossier, endings logic with placeholder endings. Chapters 1–2 get fresh minimum coverage (2 scenes per slot, so retries can differ) to prove the whole loop end to end. |
| 9 | **Content production, chapter by chapter** | T8, T7 | Write each chapter fresh to ~146 scenes, in story order, then the 6 endings plus the easter egg. |
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
