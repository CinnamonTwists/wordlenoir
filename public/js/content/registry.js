// Scene packs: the Random Case pool (chapter 0, `random/`) and story chapters 1–10 (`chapters/c01/` …), each loaded on first use.
// The game asks the registry for pools and never imports scene files directly.
//
// A pack: { id, chapter, title, intros, tail, cores: { 'g-b': [] }, informants, openers: { set: [lines] },
//           win: { climax: [], epi: { g: [] } }, loss: { climax: [], epi: { bucket: [] } }, closers: { left: [lines] },
//           beats?: { fast, slow, near, escaped: [] }, interlude?: { kept, late, missed: [] } }   (story chapters, roadmap T6)
// A scene: { id, chapter, s } plus slot fields (intros: title, victimF?; informants: type, who).
// Ids are save-data keys (roadmap F1): never renumber or reuse one. Scheme in docs/DEVELOPMENT.md §1.6.

export const packId = ch => ch === 0 || ch === 'random' || ch === 'rnd' ? 'rnd' : 'c' + String(ch).padStart(2, '0');

const loading = new Map(), loaded = new Map(), byId = new Map();

// Resolves to the pack. Concurrent and repeated calls share one import; a failed import can be retried.
export function loadPack(ch) {
  const id = packId(ch);
  if (!loading.has(id)) {
    const p = (id === 'rnd' ? import('./random/index.js') : import(`./chapters/${id}/index.js`)).then(m => {
      const pack = m.default;
      for (const { scene } of scenesOf(pack)) byId.set(scene.id, scene);
      loaded.set(id, pack); return pack;
    });
    p.catch(() => loading.delete(id));
    loading.set(id, p);
  }
  return loading.get(id);
}
// The pack if it has finished loading, else undefined.
export const getPack = ch => loaded.get(packId(ch));
// Any scene from a loaded pack, by id.
export const sceneById = id => byId.get(id);

// Every scene in a pack with where it lives: { slot, key, scene }. slot is intro | tail | core | inf | win.climax | win.epi |
// loss.climax | loss.epi | beat | inter; key is the pool key ('g-b' for cores, g or bucket for epilogues, the beat or interlude tier).
export function scenesOf(pack) {
  const out = [], put = (slot, list, key) => (list || []).forEach(scene => out.push({ slot, key, scene }));
  put('intro', pack.intros);
  if (pack.tail) put('tail', [pack.tail]);
  for (const [k, list] of Object.entries(pack.cores || {})) put('core', list, k);
  put('inf', pack.informants);
  for (const end of ['win', 'loss']) {
    put(end + '.climax', pack[end]?.climax);
    for (const [k, list] of Object.entries(pack[end]?.epi || {})) put(end + '.epi', list, k);
  }
  for (const [k, list] of Object.entries(pack.beats || {})) put('beat', list, k);
  for (const [k, list] of Object.entries(pack.interlude || {})) put('inter', list, k);
  return out;
}
