// Stings: low brass hits for cut-ins (T10) and the sting library (T9). DOM-free. Scripts play any of them with `~sting name`.
//
// Cut-in stings: a sub sine settling onto its note, detuned sawtooth pairs (±6 cents) through a lowpass that closes over the tail,
// and a timpani thump under a slow attack. No noise, no bright partials. The saws (62–131 Hz) and their low harmonics carry the hit
// on phone speakers that can't reproduce the sub. `slide` bends the whole chord down to that ratio.
// lp: [start, end] Hz · atk: s · dec: tail time constant (s) · vol: peak · thump: [from, to] Hz or null.
export const STINGS = {
  brass:  { sub: 41.2, saws: [82.41, 123.47], lp: [700, 200], atk: .045, dec: .55, vol: .12, thump: [70, 45] },   // E root + fifth
  minor:  { sub: 41.2, saws: [82.41, 98], lp: [620, 190], atk: .05, dec: .62, vol: .135, thump: [66, 44] },        // E + G, darker
  sag:    { sub: 43.65, saws: [87.31, 130.81], slide: .9439, lp: [760, 210], atk: .04, dec: .5, vol: .115, thump: [72, 46] }, // F sinking to E
  soft:   { sub: 41.2, saws: [82.41], lp: [480, 170], atk: .06, dec: .45, vol: .09, thump: null },              // cooldown repeat
  versus: { sub: 41.2, saws: [61.74, 82.41, 123.47], lp: [900, 160], atk: .035, dec: .8, vol: .16, thump: [74, 42], roll: true }, // heavier, own hit
  // the library (T9). These don't go soft on a repeat: inside the cooldown they simply don't play.
  word:   { sub: 41.2, saws: [82.41, 87.31, 116.54], lp: [520, 140], atk: .16, dec: .9, vol: .085, thump: null, lib: 20 },  // the Editor: E, F and B-flat, a minor second over a tritone, swelling in under his voice
  hope:   { sub: 43.65, saws: [87.31, 110, 130.81], lp: [260, 900], atk: .38, dec: .8, vol: .085, thump: null, lib: 8 },    // a warm F major swell, the filter opening (CASE CLOSED)
  stamp:  { sub: 41.2, saws: [82.41, 116.54], lp: [820, 170], atk: .02, dec: .38, vol: .1, thump: [82, 40], lib: 8 }       // a short dark tritone hit (COLD CASE, SUSPENDED)
};
const LOW = ['brass', 'minor', 'sag'];
const COOLDOWN = 8;   // s of AudioContext time: a sting this soon after another plays `soft`, and a third plays nothing

// Cut-in sting. `name` picks a STINGS variant (e.g. from CAST[key].sting); otherwise a random low one, never the same twice running.
// A library sting (`lib`) plays only if no sting has sounded within the cooldown and it hasn't played itself within `lib` seconds
// (the Editor's comes in whenever he starts talking, so it's held to once every 20 s); it counts toward the cut-in cooldown.
export function sting(au, name) {
  const t = au.now(), recent = t - au.lastSting < COOLDOWN, L = STINGS[name]?.lib;
  if (name === 'versus') return versusHit(au);
  if (L) {
    au.libLast ??= {};
    if (recent || t - (au.libLast[name] ?? -1e9) < L) return;
    au.libLast[name] = au.lastSting = t; au.lastSoft = false;
    return hit(au, STINGS[name]);
  }
  if (recent && au.lastSoft) return;
  if (!recent && !STINGS[name]) { const opts = LOW.filter(k => k !== au.lastLow); name = opts[Math.floor(Math.random() * opts.length)]; }
  if (!recent && LOW.includes(name)) au.lastLow = name;
  au.lastSting = t; au.lastSoft = recent;
  hit(au, STINGS[recent ? 'soft' : name]);
}
// The versus screen's heavier hit. Always plays, and restarts the cooldown so a cut-in right after it comes in soft.
export function versusHit(au) { au.lastSting = au.now(); au.lastSoft = false; hit(au, STINGS.versus); }

export function hit(au, v) {
  if (!v) return;
  const c = au.ctx, t = au.now(), end = t + v.atk + v.dec * 5, f = c.createBiquadFilter(), g = c.createGain();
  f.type = 'lowpass'; f.Q.value = .7; f.frequency.setValueAtTime(v.lp[0], t); f.frequency.exponentialRampToValueAtTime(v.lp[1], t + v.atk + v.dec * 3);
  // slow attack, a quick settle to ~45% (the "hit"), then a long soft tail
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v.vol, t + v.atk);
  g.gain.setTargetAtTime(v.vol * .45, t + v.atk, .12); g.gain.setTargetAtTime(0, t + v.atk + .35, v.dec);
  f.connect(g); g.connect(au.sfx);
  const saw = (fq, detune) => {
    const o = c.createOscillator(), og = c.createGain(); o.type = 'sawtooth'; o.detune.value = detune; og.gain.value = .32;
    o.frequency.setValueAtTime(fq, t); if (v.slide) o.frequency.setTargetAtTime(fq * v.slide, t + .08, .15);
    o.connect(og); og.connect(f); o.start(t); o.stop(end);
  };
  // sub starts about a whole tone sharp and settles
  const so = c.createOscillator(), sg = c.createGain(); so.frequency.setValueAtTime(v.sub * 1.12, t); so.frequency.setTargetAtTime(v.sub * (v.slide || 1), t, .12);
  sg.gain.value = .45; so.connect(sg); sg.connect(f); so.start(t); so.stop(end);
  v.saws.forEach(fq => { saw(fq, -6); saw(fq, 6); });
  if (v.thump) (v.roll ? [0, .16] : [0]).forEach((a, i) => {
    const o = c.createOscillator(), og = c.createGain(), at = t + a, [hi, lo] = v.thump;
    o.frequency.setValueAtTime(hi * (i ? .9 : 1), at); o.frequency.exponentialRampToValueAtTime(lo, at + .45);
    og.gain.setValueAtTime(0, at); og.gain.linearRampToValueAtTime(v.vol * (i ? .8 : 1), at + .012); og.gain.exponentialRampToValueAtTime(.0001, at + .7);
    o.connect(og); og.connect(au.sfx); o.start(at); o.stop(at + .75);
  });
}
