# Wordle Noir

For those who play Wordle for the plot. Live at [wordlenoir.com](https://wordlenoir.com).

No framework and no build step: the browser loads the files in `public/` directly as native ES modules.

## Run it locally

Requires [Node.js](https://nodejs.org) 18+. Nothing to install.

```sh
npm run dev      # http://localhost:8788  (add #speed10 to the URL to fast-forward scenes)
npm run check    # validate every scene script and word list
npm run e2e      # play a win, a loss and more in headless Chrome/Edge (Node 22+)
npm run preview  # optional: run under Cloudflare's real runtime via wrangler
```

Opening `public/index.html` straight from disk won't work, because browsers block ES modules on `file://`.

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
    content/                  the story: cast, names
      scenes/                 intros, rounds (cores/), informants, win/loss endings, closers
    game/                     rules and flow: state, scoring, board UI, case generation, informants, report
tools/                      dev server, scene validator, e2e test (not deployed)
docs/                       development guide + roadmap (DEVELOPMENT.md), scene-script reference
wrangler.jsonc              Cloudflare config
```

Modules under `script/`, `content/`, `art/`, `game/scoring.js` and `game/words.js` don't touch the DOM
when imported, so Node tools (like `npm run check`) can load them.

## Adding content

- **A scene**: add a script string to the right file in `public/js/content/scenes/`. Syntax: [docs/scene-scripts.md](docs/scene-scripts.md).
- **A case intro**: add `{ id, title, s }` to `intros.js`.
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
```
