// The save document (roadmap F1). One versioned JSON object under one localStorage key. Bump VERSION and add a step to
// MIGRATIONS whenever the shape changes; never edit old steps. A document from a newer version is refused, not clobbered (store.js).

export const VERSION = 2;

// settings: volumes are 0–1. motion/flashes: 'os' follows prefers-reduced-motion, or 'full' / 'reduced'.
// textSpeed: slow | normal | fast | instant. skipSeen: ask | always | never. (Read by the settings screen, roadmap T2.)
export const defaults = (now = Date.now()) => ({
  v: VERSION, createdAt: now, updatedAt: now,
  settings: { master: 1, music: 1, sfx: 1, ambience: 1, sound: true, muteHidden: true, textSpeed: 'normal', motion: 'os', flashes: 'os',
    skipSeen: 'ask', highContrast: false, hardMode: false, textBlips: true },
  seen: {},          // sceneId → 1, committed marks only (story chapters stage theirs in campaign.attempt.pendingSeen)
  campaign: null,    // see progress.js newCampaign()
  random: { stats: { played: 0, won: 0, dist: [0, 0, 0, 0, 0, 0], streak: 0, best: 0 }, active: null },   // active: a case snapshot
  dossier: {},       // chapter number → { status: 'apprehended' | 'escaped', guesses, at } (no entry = at large or unknown)
  // story mode records that outlive any one run (v2): chapters reached in any run (Chapter Select), best guesses per chapter,
  // endings seen (name → first time), and the fastest finished run (fewest total guesses)
  story: { reached: 0, best: {}, endings: {}, fastest: null }
});

// MIGRATIONS[n] turns a version-n document into version n+1.
const MIGRATIONS = {
  1: d => ({ ...d, v: 2 })   // v2 adds `story` (filled from defaults by migrate) and a campaign `pendingInterlude` (step 8)
};

const isObj = x => x !== null && typeof x === 'object' && !Array.isArray(x);
// Fills anything missing or of the wrong type from `def`, keeping unknown keys. null in `def` means "any value or null".
function fill(doc, def) {
  const out = isObj(doc) ? { ...doc } : {};
  for (const [k, d] of Object.entries(def)) {
    const v = out[k];
    if (d === null) { if (v === undefined) out[k] = null; }
    else if (isObj(d)) out[k] = Object.keys(d).length ? fill(v, d) : (isObj(v) ? v : {});
    else if (Array.isArray(d)) out[k] = Array.isArray(v) && v.length === d.length ? v : d.slice();
    else if (typeof v !== typeof d) out[k] = d;
  }
  return out;
}

// Upgrades any version ≤ VERSION to the current shape. Throws on a newer version or something that isn't a save.
export function migrate(doc) {
  if (!isObj(doc) || !Number.isInteger(doc.v) || doc.v < 1) throw new Error('not a Wordle Noir save');
  if (doc.v > VERSION) throw new Error(`save is from a newer version (v${doc.v}, this build reads v${VERSION})`);
  let d = doc;
  while (d.v < VERSION) d = MIGRATIONS[d.v](d);
  const out = fill(d, defaults(d.createdAt ?? Date.now()));
  if (out.random.active !== null && !isObj(out.random.active)) out.random.active = null;
  if (out.campaign !== null && !isObj(out.campaign)) out.campaign = null;
  return out;
}
