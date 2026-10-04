// Foley: short sounds of the world, built at an absolute AudioContext time `t` into any node `out`, scaled by `v`. DOM-free.
// Ambience beds (beds.js) scatter them in the distance; the one-shot SFX (sfx.js) play them up close.
import { env, note, noise } from './synth.js';

const R = (a, b) => a + Math.random() * (b - a);
// A stereo panner into `out` (or `out` itself where StereoPanner isn't available).
export function pan(au, out, p) {
  if (!au.ctx.createStereoPanner) return out;
  const s = au.ctx.createStereoPanner(); s.pan.value = Math.max(-1, Math.min(1, p)); s.connect(out); return s;
}

// A wall clock: tick (higher) or tock.
export function tick(au, out, t, v = 1, tock = false) {
  noise(au, out, { t, dur: .018, type: 'bandpass', f: tock ? 2600 : 3300, q: 3, vol: .5 * v, a: .001 });
  note(au, out, { f: tock ? 1350 : 1650, t, dur: .03, type: 'sine', vol: .12 * v, a: .001 });
}
// A typewriter key: the type bar's clack, a dull thunk from the platen, a faint metal ping.
export function typekey(au, out, t, v = 1) {
  noise(au, out, { t, dur: .025, type: 'bandpass', f: R(1800, 2600), q: 2.2, vol: .55 * v, a: .001 });
  note(au, out, { f: R(140, 170), t, dur: .045, type: 'triangle', vol: .3 * v, a: .002 });
  note(au, out, { f: R(3100, 3500), t: t + .004, dur: .02, type: 'sine', vol: .04 * v, a: .001 });
}
// The carriage bell at the end of a typed line.
export function carriageBell(au, out, t, v = 1) {
  [2093, 4290, 6300].forEach((f, i) => note(au, out, { f, t, dur: [.9, .4, .2][i], type: 'sine', vol: [.12, .04, .015][i] * v, a: .002 }));
}
// A stenotype stroke (Ruth): softer and duller than a typewriter, all keys of a chord at once.
export function stroke(au, out, t, v = 1) {
  noise(au, out, { t, dur: .04, type: 'bandpass', f: R(900, 1300), q: 1.4, vol: .4 * v, a: .002 });
  note(au, out, { f: R(110, 130), t, dur: .06, type: 'triangle', vol: .25 * v, a: .003 });
}
// A telephone bell: two gongs hit by a hammer about 20 times a second, for `dur` seconds, then ringing out.
// Each gong is a few inharmonic partials whose level is chopped by the hammer (an inverted sawtooth: sharp strike, quick decay).
export function bell(au, out, t, dur = 1.1, v = 1, f0 = 1190) {
  const c = au.ctx, end = t + dur, g = c.createGain();
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .01); g.gain.setValueAtTime(v, end); g.gain.exponentialRampToValueAtTime(.0001, end + .5);
  g.connect(out);
  [[f0, 0], [f0 * 1.11, .5]].forEach(([f, phase]) => {
    const ham = c.createOscillator(), hg = c.createGain(), amp = c.createGain();
    ham.type = 'sawtooth'; ham.frequency.value = 19.5; hg.gain.value = -.5; amp.gain.value = .5;   // gain swings 1 → 0 each strike
    ham.connect(hg); hg.connect(amp.gain); amp.connect(g);
    [[1, .09], [2.76, .035], [5.4, .012]].forEach(([m, a]) => { const o = c.createOscillator(), og = c.createGain(); o.frequency.value = f * m; og.gain.value = a; o.connect(og); og.connect(amp); o.start(t); o.stop(end + .6); });
    ham.start(t + phase / 19.5); ham.stop(end + .6);
  });
}
// A water drip: a falling plink.
export function drip(au, out, t, v = 1, f = R(900, 1500)) {
  const o = note(au, out, { f, t, dur: .07, type: 'sine', vol: .25 * v, a: .001 });
  o.frequency.exponentialRampToValueAtTime(f * .55, t + .05);
  noise(au, out, { t, dur: .01, type: 'highpass', f: 4000, vol: .05 * v, a: .001 });
}
// Glasses touching.
export function clink(au, out, t, v = 1) {
  const f = R(2300, 3000);
  [[1, .1, .5], [1.58, .05, .35], [2.31, .03, .25]].forEach(([m, a, d]) => note(au, out, { f: f * m, t, dur: d, type: 'sine', vol: a * v, a: .001 }));
  if (Math.random() < .6) [[1, .06, .4], [1.58, .03, .3]].forEach(([m, a, d]) => note(au, out, { f: f * 1.07 * m, t: t + R(.08, .16), dur: d, type: 'sine', vol: a * v, a: .001 }));
}
// A drink poured: a gurgling band of noise rising in pitch as the glass fills.
export function pour(au, out, t, v = 1, dur = 1.4) {
  const c = au.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(), w = c.createOscillator(), wg = c.createGain();
  s.buffer = au.noise; s.loop = true; f.type = 'bandpass'; f.Q.value = 6; f.frequency.setValueAtTime(500, t); f.frequency.linearRampToValueAtTime(1100, t + dur);
  w.frequency.value = 13; wg.gain.value = 140; w.connect(wg); wg.connect(f.frequency);   // the glug
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.35 * v, t + .08); g.gain.setValueAtTime(.35 * v, t + dur - .15); g.gain.linearRampToValueAtTime(0, t + dur);
  s.connect(f); f.connect(g); g.connect(out); s.start(t, Math.random()); s.stop(t + dur + .05); w.start(t); w.stop(t + dur + .05);
}
// A car going by on a wet street: engine rumble and tire hiss swelling and fading, panned across.
export function carPass(au, out, t, v = 1, dur = R(3, 4.5), dir = Math.random() < .5 ? 1 : -1) {
  const c = au.ctx, mid = t + dur * .5;
  const p = c.createStereoPanner ? c.createStereoPanner() : null;
  if (p) { p.pan.setValueAtTime(-.8 * dir, t); p.pan.linearRampToValueAtTime(.8 * dir, t + dur); p.connect(out); }
  const dest = p || out;
  const swell = (node, peak) => { node.gain.setValueAtTime(0, t); node.gain.linearRampToValueAtTime(peak * .25, t + dur * .3); node.gain.linearRampToValueAtTime(peak, mid); node.gain.linearRampToValueAtTime(peak * .2, t + dur * .75); node.gain.linearRampToValueAtTime(0, t + dur); };
  const hiss = c.createBufferSource(), hf = c.createBiquadFilter(), hg = c.createGain();
  hiss.buffer = au.noise; hiss.loop = true; hf.type = 'bandpass'; hf.Q.value = .6; hf.frequency.setValueAtTime(1800, t); hf.frequency.linearRampToValueAtTime(3200, mid); hf.frequency.linearRampToValueAtTime(1500, t + dur);
  swell(hg, .3 * v); hiss.connect(hf); hf.connect(hg); hg.connect(dest); hiss.start(t, Math.random()); hiss.stop(t + dur + .05);
  const eng = c.createOscillator(), ef = c.createBiquadFilter(), eg = c.createGain();
  eng.type = 'sawtooth'; eng.frequency.setValueAtTime(48, t); eng.frequency.linearRampToValueAtTime(52, mid); eng.frequency.linearRampToValueAtTime(41, t + dur);   // a little Doppler
  ef.type = 'lowpass'; ef.frequency.value = 260; swell(eg, .22 * v); eng.connect(ef); ef.connect(eg); eg.connect(dest); eng.start(t); eng.stop(t + dur + .05);
}
// A car horn, two reeds a third apart.
export function horn(au, out, t, v = 1, dur = .45) {
  const c = au.ctx, f = c.createBiquadFilter(), g = c.createGain();
  f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 1.4; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.12 * v, t + .03); g.gain.setValueAtTime(.12 * v, t + dur); g.gain.linearRampToValueAtTime(0, t + dur + .06);
  f.connect(g); g.connect(out);
  [349, 440].forEach(fq => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = fq; o.connect(f); o.start(t); o.stop(t + dur + .1); });
}
// Wood or rope under strain: a raspy stick-slip groan.
export function creak(au, out, t, v = 1, dur = R(.5, 1.1)) {
  const c = au.ctx, o = c.createOscillator(), ch = c.createOscillator(), chg = c.createGain(), amp = c.createGain(), f = c.createBiquadFilter(), g = c.createGain();
  const f0 = R(90, 150); o.type = 'sawtooth'; o.frequency.setValueAtTime(f0, t); o.frequency.linearRampToValueAtTime(f0 * R(1.15, 1.5), t + dur);
  ch.type = 'square'; ch.frequency.value = R(24, 38); chg.gain.value = .5; amp.gain.value = .5; ch.connect(chg); chg.connect(amp.gain);
  f.type = 'bandpass'; f.frequency.value = R(500, 800); f.Q.value = 3;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.2 * v, t + dur * .3); g.gain.linearRampToValueAtTime(0, t + dur);
  o.connect(amp); amp.connect(f); f.connect(g); g.connect(out); o.start(t); ch.start(t); o.stop(t + dur + .05); ch.stop(t + dur + .05);
}
// A heavy metal door or gate, far down a hall.
export function clang(au, out, t, v = 1) {
  [[110, .14, 1.6], [167, .1, 1.3], [241, .07, 1.1], [381, .04, .8], [523, .02, .5]].forEach(([f, a, d]) => note(au, out, { f: f * R(.97, 1.03), t, dur: d, type: 'sine', vol: a * v, a: .002 }));
  noise(au, out, { t, dur: .12, type: 'lowpass', f: 900, vol: .3 * v, a: .002 });
}
// A short dry cough, twice.
export function cough(au, out, t, v = 1) {
  [0, R(.18, .26)].forEach((a, i) => noise(au, out, { t: t + a, dur: .12, type: 'bandpass', f: R(450, 700), q: 1.2, vol: (i ? .2 : .28) * v, a: .01 }));
}
// Steam letting go (the station's engines).
export function steam(au, out, t, v = 1, dur = R(1.2, 2.2)) {
  const c = au.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  s.buffer = au.noise; s.loop = true; f.type = 'highpass'; f.frequency.value = 2400; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.25 * v, t + .15); g.gain.setTargetAtTime(0, t + .3, dur / 3);
  s.connect(f); f.connect(g); g.connect(out); s.start(t, Math.random()); s.stop(t + dur * 2);
}
// The station's three-note PA chime.
export function chime(au, out, t, v = 1) {
  [[392, 0], [329.63, .55], [261.63, 1.1]].forEach(([f, a]) => { note(au, out, { f, t: t + a, dur: 1.6, type: 'sine', vol: .14 * v, a: .004 }); note(au, out, { f: f * 2, t: t + a, dur: .6, type: 'sine', vol: .03 * v, a: .004 }); });
}
// A distant announcer: speech-shaped noise (syllables at ~5 per second through two moving formants). Meant to be heard through reverb.
export function babble(au, out, t, v = 1, dur = R(2.5, 4)) {
  const c = au.ctx, s = c.createBufferSource(), g = c.createGain();
  s.buffer = au.noise; s.loop = true;
  const f1 = c.createBiquadFilter(), f2 = c.createBiquadFilter(); f1.type = f2.type = 'bandpass'; f1.Q.value = 5; f2.Q.value = 6;
  g.gain.setValueAtTime(0, t);
  for (let x = t; x < t + dur; x += R(.13, .26)) {
    const on = Math.random() < .82 ? R(.35, 1) * v * .5 : 0;
    g.gain.linearRampToValueAtTime(on, x + .04); g.gain.linearRampToValueAtTime(on * .3, x + .11);
    f1.frequency.setTargetAtTime(R(450, 800), x, .03); f2.frequency.setTargetAtTime(R(1100, 2000), x, .03);
  }
  g.gain.linearRampToValueAtTime(0, t + dur + .1);
  s.connect(f1); s.connect(f2); f1.connect(g); f2.connect(g); g.connect(out); s.start(t, Math.random()); s.stop(t + dur + .2);
}
// A radiator or pipe knocking.
export function knock(au, out, t, v = 1) {
  [0, R(.12, .2)].slice(0, Math.random() < .5 ? 1 : 2).forEach(a => {
    note(au, out, { f: R(200, 240), t: t + a, dur: .18, type: 'sine', vol: .18 * v, a: .001 }); note(au, out, { f: R(540, 600), t: t + a, dur: .09, type: 'sine', vol: .06 * v, a: .001 });
    noise(au, out, { t: t + a, dur: .02, type: 'bandpass', f: 1500, vol: .1 * v, a: .001 });
  });
}
// A gull, two or three cries.
export function gull(au, out, t, v = 1) {
  const n = Math.random() < .5 ? 2 : 3;
  for (let i = 0; i < n; i++) {
    const a = t + i * R(.32, .45), c = au.ctx, o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
    o.type = 'triangle'; o2.type = 'sine'; const f0 = R(1300, 1600);
    for (const x of [o, o2]) { const m = x === o ? 1 : 2.01; x.frequency.setValueAtTime(f0 * m, a); x.frequency.linearRampToValueAtTime(f0 * 1.45 * m, a + .07); x.frequency.exponentialRampToValueAtTime(f0 * .75 * m, a + .3); }
    f.type = 'bandpass'; f.frequency.value = 1900; f.Q.value = .8; env(g, a, .03, .1 * v, .28);
    o.connect(f); o2.connect(f); f.connect(g); g.connect(out); o.start(a); o2.start(a); o.stop(a + .4); o2.stop(a + .4);
  }
}
// A printing press stroke: the impression thump and the gripper clack.
export function press(au, out, t, v = 1) {
  const o = note(au, out, { f: 75, t, dur: .16, type: 'sine', vol: .5 * v, a: .004 }); o.frequency.exponentialRampToValueAtTime(45, t + .14);
  noise(au, out, { t, dur: .05, type: 'lowpass', f: 400, vol: .3 * v, a: .002 });
  noise(au, out, { t: t + .19, dur: .03, type: 'bandpass', f: 1600, q: 2, vol: .22 * v, a: .001 });
}
// Paper handled: a few quick crackles.
export function rustle(au, out, t, v = 1, dur = R(.3, .6)) {
  for (let x = t; x < t + dur; x += R(.03, .08)) noise(au, out, { t: x, dur: R(.02, .06), type: 'bandpass', f: R(1800, 4200), q: 1.2, vol: R(.1, .3) * v, a: .003 });
}
// A footstep on a hard (and, if `wet`, wet) floor.
export function footstep(au, out, t, v = 1, wet = false) {
  noise(au, out, { t, dur: .03, type: 'bandpass', f: R(1400, 2200), q: 1.5, vol: .35 * v, a: .001 });
  note(au, out, { f: R(80, 100), t, dur: .06, type: 'sine', vol: .3 * v, a: .002 });
  if (wet) noise(au, out, { t: t + .015, dur: .09, type: 'highpass', f: 3500, vol: .14 * v, a: .005 });
}
// A distant foghorn (the close one is SFX.foghorn).
export function foghorn(au, out, t, v = 1, dur = 2.4) {
  const c = au.ctx, f = c.createBiquadFilter(), g = c.createGain();
  f.type = 'lowpass'; f.frequency.value = 380; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.12 * v, t + .4); g.gain.setValueAtTime(.12 * v, t + dur - .5); g.gain.linearRampToValueAtTime(0, t + dur);
  f.connect(g); g.connect(out);
  [98, 97.2].forEach(fq => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = fq; o.connect(f); o.start(t); o.stop(t + dur + .05); });
}
// A siren far across the city.
export function sirenFar(au, out, t, v = 1, dur = 6) {
  const c = au.ctx, o = c.createOscillator(), l = c.createOscillator(), lg = c.createGain(), f = c.createBiquadFilter(), g = c.createGain();
  o.type = 'triangle'; o.frequency.value = 640; l.frequency.value = .45; lg.gain.value = 140; l.connect(lg); lg.connect(o.frequency);
  f.type = 'lowpass'; f.frequency.value = 1100; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.06 * v, t + dur * .4); g.gain.linearRampToValueAtTime(0, t + dur);
  o.connect(f); f.connect(g); g.connect(out); o.start(t); l.start(t); o.stop(t + dur + .05); l.stop(t + dur + .05);
}
// A ship's or station bell: a single struck bell.
export function shipBell(au, out, t, v = 1) {
  [[523, .12, 2.5], [1250, .05, 1.4], [1690, .03, 1], [2730, .015, .6]].forEach(([f, a, d]) => note(au, out, { f, t, dur: d, type: 'sine', vol: a * v, a: .002 }));
}
