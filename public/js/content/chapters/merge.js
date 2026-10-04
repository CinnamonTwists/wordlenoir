// Merges pool maps slot by slot ({ key: [items] }), in order, for packs written in more than one batch. DOM-free.
export const mergePools = (...maps) => {
  const out = {};
  for (const m of maps) for (const [k, list] of Object.entries(m)) out[k] = [...(out[k] || []), ...list];
  return out;
};
