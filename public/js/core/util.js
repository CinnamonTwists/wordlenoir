// Small shared helpers. DOM-free so the Node tools in /tools can import anything that uses them.

export const R = Math.random;
export const pick = a => a[Math.floor(R() * a.length)];
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const NUMW = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];
export const ORD = ['first', 'second', 'third', 'fourth', 'fifth'];
export const cap = s => s ? s[0].toUpperCase() + s.slice(1) : s;
export const nounN = (n, a, b) => `${n <= 6 ? NUMW[n] : n} ${n === 1 ? a : b}`;
export const fmtTime = (h, m) => `${h === 0 ? 12 : h > 12 ? h - 12 : h}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;

// Random pick that won't repeat until every item in `list` has been used once.
export function pickUnused(list, set, idf) {
  let pool = list.filter(x => !set.has(idf(x)));
  if (!pool.length) { list.forEach(x => set.delete(idf(x))); pool = list; }
  const c = pick(pool); set.add(idf(c)); return c;
}
