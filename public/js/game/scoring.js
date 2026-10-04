// Pure Wordle logic: feedback, remaining candidates, and the odds informants quote. DOM-free.
// Feedback arrays use 0 = gray (alibi), 1 = yellow (wrong spot), 2 = green (right spot).

export function score(g, a) {
  const res = [0, 0, 0, 0, 0], cnt = {};
  for (let i = 0; i < 5; i++) if (g[i] === a[i]) res[i] = 2; else cnt[a[i]] = (cnt[a[i]] || 0) + 1;
  for (let i = 0; i < 5; i++) if (res[i] !== 2 && cnt[g[i]] > 0) { res[i] = 1; cnt[g[i]]--; }
  return res;
}
const fk = r => r.join('');
export function candidates(answers, guesses, fb) { return answers.filter(w => guesses.every((g, i) => fk(score(g, w)) === fk(fb[i]))); }
export function stats(answers, guesses, fb) {
  const Cn = candidates(answers, guesses, fb), n = Cn.length, present = new Set(), absent = new Set(), greenAt = Array(5).fill(null);
  guesses.forEach((g, gi) => fb[gi].forEach((v, i) => { if (v > 0) present.add(g[i]); if (v === 2) greenAt[i] = g[i]; }));
  guesses.forEach((g, gi) => fb[gi].forEach((v, i) => { if (v === 0 && !present.has(g[i])) absent.add(g[i]); }));
  let top = null;
  for (const L of 'abcdefghijklmnopqrstuvwxyz') { if (present.has(L) || absent.has(L)) continue; const c = Cn.filter(w => w.includes(L)).length; if (c > 0 && (!top || c > top.c)) top = { L, c }; }
  let pos = null;
  for (let i = 0; i < 5; i++) { if (greenAt[i]) continue; const f = {}; Cn.forEach(w => f[w[i]] = (f[w[i]] || 0) + 1); for (const L in f) { const p = f[L] / n; if (!pos || (p < 1 && (pos.p === 1 || p > pos.p))) pos = { i, L, p }; } }
  const dbl = Cn.filter(w => new Set(w).size < 5).length;
  return { n, top: top && { L: top.L.toUpperCase(), pct: Math.round(100 * top.c / n) }, pos: pos && { i: pos.i, L: pos.L.toUpperCase(), pct: Math.round(100 * pos.p) }, dblPct: n ? Math.round(100 * dbl / n) : 0 };
}

// Which scene pool a guess falls into. 0: no hits · 1: 1-2 hits · 2: 3-4 hits · 3: five hits, wrong order
export const bucketOf = fb => { const h = fb.filter(x => x > 0).length; return h === 0 ? 0 : h <= 2 ? 1 : h <= 4 ? 2 : 3; };
