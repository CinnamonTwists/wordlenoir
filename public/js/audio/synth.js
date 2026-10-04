// Synthesis building blocks shared by every voice (one-shots, stings, music, beds). DOM-free.
// None of these check AU.quiet: one-shots are gated once, in AU.play(); music and beds must keep playing while a scene is skipped.

// Attack to `peak` over `a` seconds, then an exponential fall over `dec`.
export function env(g, t, a, peak, dec) { g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(.0001, t + a + dec); }

// A plain oscillator note. `at` is seconds from now; `slideTo` glides the pitch over the note.
export function tone(au, fq, dur, type = 'sine', vol = .2, at = 0, slideTo, bus = au.sfx) {
  const c = au.ctx, t = au.now() + at, o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(fq, t); if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  env(g, t, .006, vol, dur); o.connect(g); g.connect(bus); o.start(t); o.stop(t + dur + .05);
}

// A filtered slice of the shared noise buffer. `at` is seconds from now.
export function burst(au, dur, type, fq, vol, at = 0, q = .7, bus = au.sfx) {
  const c = au.ctx, t = au.now() + at, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  s.buffer = au.noise; f.type = type; f.frequency.value = fq; f.Q.value = q; env(g, t, .004, vol, dur);
  s.connect(f); f.connect(g); g.connect(bus); s.start(t, Math.random()); s.stop(t + dur + .05);
}

// Absolute-time versions for scheduled voices (music, beds, multi-part effects): `t` is AudioContext time.
// note(): an oscillator with an attack/decay envelope into `out`. Returns the oscillator (for vibrato or glides).
export function note(au, out, { f, t, dur, type = 'sine', vol = .2, a = .006, detune = 0 }) {
  const c = au.ctx, o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t); o.detune.value = detune;
  env(g, t, a, vol, dur); o.connect(g); g.connect(out); o.start(t); o.stop(t + a + dur + .05);
  return o;
}
// noise(): filtered noise with an attack/decay envelope into `out`.
export function noise(au, out, { t, dur, type = 'bandpass', f = 1000, q = .7, vol = .2, a = .004, f2 }) {
  const c = au.ctx, s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
  s.buffer = au.noise; fl.type = type; fl.frequency.setValueAtTime(f, t); fl.Q.value = q;
  if (f2) fl.frequency.exponentialRampToValueAtTime(f2, t + a + dur);
  env(g, t, a, vol, dur); s.connect(fl); fl.connect(g); g.connect(out);
  s.start(t, Math.random() * 1.5); s.stop(t + a + dur + .05);
}
// A gain node into `out` (handy as a per-voice submix).
export function gain(au, out, v = 1) { const g = au.ctx.createGain(); g.gain.value = v; g.connect(out); return g; }
// A biquad into `out`.
export function filter(au, out, type, f, q = .7) { const b = au.ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; b.connect(out); return b; }

export const midi = n => 440 * Math.pow(2, (n - 69) / 12);
