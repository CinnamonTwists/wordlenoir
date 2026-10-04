# Wordle Noir

Before changing code or content, read [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md): architecture, conventions, and the roadmap with its build order.
Scene language: [docs/scene-scripts.md](docs/scene-scripts.md).

- No build step: everything in `public/` runs as native ES modules. Only `public/` is deployed (Cloudflare Workers Builds via `wrangler.jsonc`).
- Run `npm run check` after touching scenes, cast, sets, or word lists. Run `npm run e2e` after touching game, cinema, audio, or UI code. Run `npm test` after touching `save/` or other DOM-free logic.
- When a roadmap item lands, update DEVELOPMENT.md (move it into Part 1 and tick it off in Part 2).
