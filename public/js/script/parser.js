// Scene-script parsing. DOM-free so tools/check-scenes.mjs can validate every scene under Node.
// Full syntax reference: docs/scene-scripts.md
//
// Line syntax:  > narration | NAME: dialogue | !!@NAME cut-in | ** heavy line | ## TITLE | sub | %%LEFT | RIGHT
// @set place[!]  (! = no establishing line)  @mood noir|warm|gold|blue|red|sick|violet
// ~fade ~black ~shake ~flash ~lightning ~heart ~rain heavy|light|window|off ~sfx name ~wait ms ~flag name
// ~stamp TEXT  ~gstamp TEXT (green)  ~paper LABEL|TEXT  ~clue  ~legend  ~tight ~loose ~push  ~story name (campaign flag)
// ?flag / ?!flag / ?var>3 prefixes make a line conditional (stackable). A key is looked up in the case flags, then the
// campaign's story flags (ctx.story), then the vars.

export function parseScript(src) {
  return src.split('\n').map(s => s.trim()).filter(s => s && !s.startsWith('//')).map(line => {
    const conds = []; let m;
    while ((m = line.match(/^\?(!?)([a-zA-Z_]+)(?:(>=|<=|>|<|=)(-?\d+))?(?=\s|\?)\s*/))) { conds.push({ neg: !!m[1], key: m[2], op: m[3], val: m[4] != null ? +m[4] : null }); line = line.slice(m[0].length); }
    return { conds, line };
  });
}
export function condOK(c, ctx) {
  let v = c.key in ctx.flags ? ctx.flags[c.key] : ctx.story && c.key in ctx.story ? ctx.story[c.key] : ctx.vars[c.key], r;
  if (c.op) { v = +v || 0; r = c.op === '>' ? v > c.val : c.op === '<' ? v < c.val : c.op === '>=' ? v >= c.val : c.op === '<=' ? v <= c.val : v === c.val; }
  else r = !!v;
  return c.neg ? !r : r;
}
// {var} names that were referenced but never supplied. Inspect via NOIR.MISSING while testing.
export const MISSING = new Set();
export const fill = (s, ctx) => s.replace(/\{(\w+)\}/g, (m, k) => { if (ctx.vars[k] != null) return ctx.vars[k]; MISSING.add(k); return m; });
