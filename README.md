# Wordle Noir

For those who play Wordle for the plot. Live at [wordlenoir.com](https://wordlenoir.com).

No framework and no build step: the browser loads the files in `public/` directly as native ES modules.

## Run it locally

Requires [Node.js](https://nodejs.org) 18+. Nothing to install.

```sh
npm run dev      # http://localhost:8788  (add #speed10 to the URL to fast-forward scenes)
npm run check    # validate every scene pack and word list (add -- --coverage for pool sizes)
npm run e2e      # play a win, a loss and more in headless Chrome/Edge (Node 22+)
npm test         # unit tests for the save system and other DOM-free modules
npm run preview  # optional: run under Cloudflare's real runtime via wrangler
```

Opening `public/index.html` straight from disk won't work, because browsers block ES modules on `file://`.

## Saves

Progress lives in the browser (`localStorage`, key `wordlenoir.save`). A case in progress reopens after a reload or a closed tab.
If the browser won't store anything (some private modes), the game says so and keeps playing without saving.

## Deploying

Push to `main`. Cloudflare Workers Builds runs `npx wrangler deploy`, which reads `wrangler.jsonc` and
publishes only the `public/` folder. Everything outside `public/` stays private.

## Layout

```
public/                     ← everything that gets deployed
  index.html                  page markup
  css/                        one stylesheet per layer (base, title, board, cinema, effects, overlays, ambient)
  data/words/                 answers.txt and allowed.txt, one word per line
  images/                     favicon and social preview
  js/
    main.js                   entry point: title screen, buttons, NOIR console hook
    core/                     shared helpers, timing (sleep/SPEED), DOM lookup
    audio/                    procedural Web Audio synth (all sound effects and music)
    fx/                       rain and film grain canvases
    art/                      hand-built SVG: props, portraits, icons
      sets/                   one file per location
    cinema/                   the cutscene engine: stage, typewriter text, full-screen effects, script player
    script/                   scene-script parser (DOM-free)
    content/                  the story: cast, names, registry.js (loads scene packs, looks up scenes by ID)
      random/                 Random Case pack: intros, tail, rounds (cores/), informants, win/loss endings, openers, closers
      chapters/               story chapter packs (coming)
    game/                     rules and flow: state, scoring, board UI, case generation, informants, report, snapshots
    save/                     browser saves: one versioned localStorage document, migrations, progress rules
tools/                      dev server, scene validator, e2e test (not deployed)
tests/                      unit tests (not deployed)
docs/                       development guide + roadmap (DEVELOPMENT.md), scene-script reference
wrangler.jsonc              Cloudflare config
```

Modules under `script/`, `content/`, `art/`, `save/`, `game/scoring.js`, `game/snapshot.js` and `game/words.js` don't touch the DOM
when imported, so Node tools (like `npm run check`) can load them.

## Adding content

- **A scene**: add `{ id, chapter, s: \`...\` }` to the right pool in `public/js/content/random/` (the Random Case pack). Give it the next
  free ID in that pool and never reuse or renumber one (IDs are save-data keys). Syntax: [docs/scene-scripts.md](docs/scene-scripts.md).
- **A case intro**: add `{ id: 'rnd.intro.<name>', chapter: 0, title, s }` to `random/intros.js`.
- **A location**: create `public/js/art/sets/<name>.js` exporting `{ rain, indoor, draw(vars) }`, then register it in `sets/index.js`.
- **A character**: add them to `public/js/content/cast.js`.
- **Words**: edit `public/data/words/*.txt`.

Run `npm run check` afterwards.

## Testing hooks

In the browser console, `NOIR` exposes the game state:

```js
NOIR.speed = 20;            // fast-forward (or load the page with #speed20)
NOIR.forceAnswer = 'crane'; // the next case uses this answer
NOIR.forceInf = true;       // force an informant every round (false = never)
NOIR.S                      // current case state
NOIR.MISSING                // {vars} a script referenced but nothing supplied
NOIR.scene('rnd.tail')      // any loaded scene by ID; NOIR.pack is the Random Case pack
NOIR.save.get()             // the save document; NOIR.save.reset() wipes it
```
