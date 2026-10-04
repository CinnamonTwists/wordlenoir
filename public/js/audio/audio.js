// Procedural audio: every sound is synthesized with Web Audio, no files. init() must run from a user gesture.
// Scripts trigger effects with `~sfx <method>` (ring, hangup, thunder, whistle, siren, telegraph, foghorn, ...).
// Buses (each under master, scaled by the Settings sliders): sfx, ui (keys, typewriter ticks; follows the sfx slider), mus, amb (rain).

// Cut-in stings: low brass hits. A sub sine settling onto its note, detuned sawtooth pairs (±6 cents) through a lowpass that
// closes over the tail, and a timpani thump under a slow attack. No noise, no bright partials. The saws (62–131 Hz) and their
// low harmonics carry the hit on phone speakers that can't reproduce the sub. `slide` bends the whole chord down to that ratio.
// lp: [start, end] Hz · atk: s · dec: tail time constant (s) · vol: peak · thump: [from, to] Hz or null.
export const STINGS = {
  brass:  { sub: 41.2, saws: [82.41, 123.47], lp: [700, 200], atk: .045, dec: .55, vol: .12, thump: [70, 45] },   // E root + fifth
  minor:  { sub: 41.2, saws: [82.41, 98], lp: [620, 190], atk: .05, dec: .62, vol: .135, thump: [66, 44] },        // E + G, darker
  sag:    { sub: 43.65, saws: [87.31, 130.81], slide: .9439, lp: [760, 210], atk: .04, dec: .5, vol: .115, thump: [72, 46] }, // F sinking to E
  soft:   { sub: 41.2, saws: [82.41], lp: [480, 170], atk: .06, dec: .45, vol: .09, thump: null },              // cooldown repeat
  versus: { sub: 41.2, saws: [61.74, 82.41, 123.47], lp: [900, 160], atk: .035, dec: .8, vol: .16, thump: [74, 42], roll: true } // heavier, own hit
};
const LOW = ['brass', 'minor', 'sag'];
const COOLDOWN = 8;   // s: a sting this soon after another plays `soft`, and a third plays nothing

export const AU = {
  ctx: null, on: true, quiet: false, vol: { master: 1, music: 1, sfx: 1, ambience: 1 }, lastSting: -1e9, lastSoft: false, lastLow: null,
  init() {
    if (this.ctx) { this.ctx.resume && this.ctx.resume(); return; }
    const C = window.AudioContext || window.webkitAudioContext; if (!C) return;
    try { this.ctx = new C(); } catch (e) { return; }
    const c = this.ctx;
    this.master = c.createGain(); this.master.connect(c.destination);
    this.comp = c.createDynamicsCompressor(); this.comp.connect(this.master);
    for (const k of ['sfx', 'ui', 'mus', 'amb']) { this[k] = c.createGain(); this[k].connect(this.comp); }
    this.applyVolumes(true);
    const len = c.sampleRate * 2, b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
    let last = 0; for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + .02 * w) / 1.02; d[i] = w * .6 + last * 3; }
    this.noise = b;
    // rain bed
    const rs = c.createBufferSource(); rs.buffer = b; rs.loop = true;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2400; bp.Q.value = .45;
    this.rainLP = c.createBiquadFilter(); this.rainLP.type = 'lowpass'; this.rainLP.frequency.value = 6000;
    this.rainG = c.createGain(); this.rainG.gain.value = 0;
    rs.connect(bp); bp.connect(this.rainLP); this.rainLP.connect(this.rainG); this.rainG.connect(this.amb); rs.start();
    // drone
    this.dr = {};
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 260; lp.Q.value = 4;
    const lfo = c.createOscillator(), lfoG = c.createGain(); lfo.frequency.value = .07; lfoG.gain.value = 110; lfo.connect(lfoG); lfoG.connect(lp.frequency); lfo.start();
    const dg = c.createGain(); dg.gain.value = .0; lp.connect(dg); dg.connect(this.mus);
    const mk = (type, fq, g) => { const o = c.createOscillator(); o.type = type; o.frequency.value = fq; const gg = c.createGain(); gg.gain.value = g; o.connect(gg); gg.connect(lp); o.start(); return { o, g: gg }; };
    this.dr.a = mk('sine', 55, .5); this.dr.b = mk('sawtooth', 82.41, .12); this.dr.c = mk('sine', 58.27, 0); this.dr.d = mk('triangle', 110, .05);
    this.dr.out = dg; this.dr.lp = lp;
    dg.gain.linearRampToValueAtTime(.5, c.currentTime + 4);
    this.setMusic('calm');
  },
  now() { return this.ctx ? this.ctx.currentTime : 0; },
  toggle() { return this.setVolumes({ on: !this.on }); },
  // Settings → bus gains. v: { master, music, sfx, ambience } (0–1) and/or { on }. Safe before init (applied on init). Returns `on`.
  setVolumes(v) { if ('on' in v) this.on = !!v.on; for (const k of Object.keys(this.vol)) if (k in v) this.vol[k] = Math.max(0, Math.min(1, +v[k] || 0)); this.applyVolumes(); return this.on; },
  applyVolumes(now) {
    if (!this.ctx) return; const t = this.now(), V = this.vol;
    const set = (node, g) => now ? (node.gain.value = g) : node.gain.setTargetAtTime(g, t, .05);
    set(this.master, this.on ? .85 * V.master : 0); set(this.sfx, .8 * V.sfx); set(this.ui, .8 * V.sfx); set(this.mus, .55 * V.music); set(this.amb, V.ambience);
  },
  // Settings → "Mute when the tab is hidden": suspends the whole context while the page isn't visible.
  setHidden(hidden, mute) { if (!this.ctx) return; if (hidden && mute) this.ctx.suspend(); else this.ctx.resume(); },
  setRain(level, indoor) {
    if (!this.ctx) return;
    const v = { off: .015, window: .05, light: .07, heavy: .14 }[level] ?? .04;
    this.rainG.gain.setTargetAtTime(v, this.now(), .8);
    this.rainLP.frequency.setTargetAtTime(indoor ? 900 : 6000, this.now(), .5);
  },
  setMusic(mode) {
    if (!this.ctx) return; const t = this.now(), d = this.dr;
    const S = (p, v) => p.setTargetAtTime(v, t, 1.2);
    if (mode === 'dread') { S(d.c.g.gain, .45); S(d.c.o.frequency, 58.27); S(d.b.g.gain, .2); S(d.lp.frequency, 200); S(d.out.gain, .75); }
    else if (mode === 'tense') { S(d.c.g.gain, .3); S(d.c.o.frequency, 58.27); S(d.b.g.gain, .16); S(d.out.gain, .6); }
    else if (mode === 'hope') { S(d.c.g.gain, .28); S(d.c.o.frequency, 69.3); S(d.b.g.gain, .1); S(d.out.gain, .5); }
    else { S(d.c.g.gain, 0); S(d.b.g.gain, .12); S(d.out.gain, .45); }
  },
  env(g, t, a, peak, dec) { g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(.0001, t + a + dec); },
  tone(fq, dur, type = 'sine', vol = .2, at = 0, slideTo, bus = this.sfx) {
    if (!this.ctx) return; const c = this.ctx, t = this.now() + at, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(fq, t); if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    this.env(g, t, .006, vol, dur); o.connect(g); g.connect(bus); o.start(t); o.stop(t + dur + .05);
  },
  burst(dur, type, fq, vol, at = 0, q = .7, bus = this.sfx) {
    if (!this.ctx) return; const c = this.ctx, t = this.now() + at, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = this.noise; f.type = type; f.frequency.value = fq; f.Q.value = q; this.env(g, t, .004, vol, dur);
    s.connect(f); f.connect(g); g.connect(bus); s.start(t, Math.random()); s.stop(t + dur + .05);
  },
  tick() { this.burst(.03, 'highpass', 3200, .05, 0, .7, this.ui); this.tone(1700, .02, 'square', .012, 0, undefined, this.ui); },
  key() { this.burst(.05, 'bandpass', 2200, .12, 0, 2, this.ui); this.tone(180, .05, 'sine', .08, 0, undefined, this.ui); },
  thud() { this.tone(80, .35, 'sine', .45, 0, 40); this.burst(.12, 'lowpass', 300, .25); },
  boom() { this.tone(62, 1.4, 'sine', .7, 0, 28); this.burst(1.2, 'lowpass', 180, .5); this.tone(124, .6, 'triangle', .12, 0, 60); },
  heart() { [0, .26].forEach((a, i) => { this.tone(i ? 50 : 58, .2, 'sine', i ? .55 : .75, a, 32); this.burst(.07, 'lowpass', 120, .3, a); }); },
  // Cut-in sting. `name` picks a STINGS variant (e.g. from CAST[key].sting); otherwise a random low one, never the same twice running.
  sting(name) {
    if (!this.ctx) return; const t = this.now(), recent = t - this.lastSting < COOLDOWN;
    if (recent && this.lastSoft) return;
    if (!recent && !STINGS[name]) { const opts = LOW.filter(k => k !== this.lastLow); name = opts[Math.floor(Math.random() * opts.length)]; }
    if (!recent && LOW.includes(name)) this.lastLow = name;
    this.lastSting = t; this.lastSoft = recent;
    this.hit(STINGS[recent ? 'soft' : name]);
  },
  // The versus screen's heavier hit. Always plays, and restarts the cooldown so a cut-in right after it comes in soft.
  versusHit() { if (!this.ctx) return; this.lastSting = this.now(); this.lastSoft = false; this.hit(STINGS.versus); },
  hit(v) {
    if (!this.ctx || !v) return; const c = this.ctx, t = this.now(), end = t + v.atk + v.dec * 5, f = c.createBiquadFilter(), g = c.createGain();
    f.type = 'lowpass'; f.Q.value = .7; f.frequency.setValueAtTime(v.lp[0], t); f.frequency.exponentialRampToValueAtTime(v.lp[1], t + v.atk + v.dec * 3);
    // slow attack, a quick settle to ~45% (the "hit"), then a long soft tail
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v.vol, t + v.atk);
    g.gain.setTargetAtTime(v.vol * .45, t + v.atk, .12); g.gain.setTargetAtTime(0, t + v.atk + .35, v.dec);
    f.connect(g); g.connect(this.sfx);
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
      o.connect(og); og.connect(this.sfx); o.start(at); o.stop(at + .75);
    });
  },
  flip(v) {
    if (v === 0) { this.tone(130, .18, 'triangle', .22, 0, 90); this.burst(.06, 'lowpass', 500, .2); }
    else if (v === 1) { this.tone(392, .35, 'triangle', .16); this.tone(587, .3, 'sine', .07, .03); }
    else { [523.25, 659.25, 783.99].forEach((fq, i) => this.tone(fq, .7, 'triangle', .13, i * .05)); this.tone(1568, .4, 'sine', .04, .12); }
  },
  stamp() { this.burst(.09, 'lowpass', 900, .7); this.tone(95, .2, 'sine', .55, 0, 50); },
  ring() { for (let k = 0; k < 2; k++) for (let i = 0; i < 18; i++) { const a = k * 1.25 + i * .05; this.tone(440, .025, 'sine', .07, a); this.tone(480, .025, 'sine', .07, a); } },
  hangup() { this.burst(.04, 'bandpass', 1500, .3); this.tone(350, .7, 'sine', .025, .2); this.tone(440, .7, 'sine', .025, .2); },
  whistle() {
    if (!this.ctx) return; const c = this.ctx, t = this.now(), f = c.createBiquadFilter(), g = c.createGain(), v = c.createOscillator(), vg = c.createGain();
    f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 1.2; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.12, t + .25); g.gain.setValueAtTime(.12, t + 1.7); g.gain.exponentialRampToValueAtTime(.0001, t + 2.6);
    v.frequency.value = 5; vg.gain.value = 5; v.connect(vg); f.connect(g); g.connect(this.sfx); v.start(t); v.stop(t + 2.7);
    [330, 415, 494].forEach(fq => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = fq; vg.connect(o.frequency); o.connect(f); o.start(t); o.stop(t + 2.7); });
  },
  siren() {
    if (!this.ctx) return; const c = this.ctx, t = this.now(), o = c.createOscillator(), l = c.createOscillator(), lg = c.createGain(), f = c.createBiquadFilter(), g = c.createGain();
    o.type = 'sine'; o.frequency.value = 700; l.frequency.value = .5; lg.gain.value = 160; l.connect(lg); lg.connect(o.frequency);
    f.type = 'lowpass'; f.frequency.value = 1400; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.035, t + 1.2); g.gain.linearRampToValueAtTime(0, t + 4.5);
    o.connect(f); f.connect(g); g.connect(this.sfx); o.start(t); l.start(t); o.stop(t + 4.6); l.stop(t + 4.6);
  },
  thunder() {
    if (!this.ctx) return; const c = this.ctx, t = this.now(), s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = this.noise; s.loop = true; f.type = 'lowpass'; f.frequency.setValueAtTime(900, t); f.frequency.exponentialRampToValueAtTime(90, t + 3.5);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.55, t + .05); g.gain.exponentialRampToValueAtTime(.0001, t + 4);
    s.connect(f); f.connect(g); g.connect(this.sfx); s.start(t); s.stop(t + 4.1); this.burst(.25, 'highpass', 900, .25);
  },
  telegraph() { let a = 0; for (const d of '.-..-.--.-...-') { const len = d === '.' ? .06 : .18; this.tone(820, len, 'square', .035, a); a += len + .07; } },
  foghorn() { this.tone(98, 2.6, 'sawtooth', .07); this.tone(97, 2.6, 'sawtooth', .06); },
  piano(notes, gap = .45) { notes.forEach((fq, i) => { this.tone(fq, 2.4, 'triangle', .12, i * gap); this.tone(fq * 2, 1.2, 'sine', .03, i * gap); }); },
  riff() {
    if (!this.ctx) return; const c = this.ctx; let t = this.now() + .2;
    const N = { G3: 196, Bb3: 233.08, C4: 261.63, D4: 293.66, Eb4: 311.13, F4: 349.23, G4: 392 };
    const mel = [['G3', .45], ['Bb3', .45], ['C4', .9], ['Eb4', .45], ['D4', .45], ['C4', 1.2], ['Bb3', .45], ['G3', 1.8]];
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1300; f.Q.value = 2; const out = c.createGain(); out.gain.value = .11; f.connect(out); out.connect(this.mus);
    for (const [n, d] of mel) {
      const o = c.createOscillator(), g = c.createGain(), v = c.createOscillator(), vg = c.createGain();
      o.type = 'sawtooth'; o.frequency.value = N[n]; v.frequency.value = 5.2; vg.gain.value = 3; v.connect(vg); vg.connect(o.frequency);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + .08); g.gain.setValueAtTime(.85, t + d * .7); g.gain.linearRampToValueAtTime(0, t + d);
      o.connect(g); g.connect(f); o.start(t); v.start(t); o.stop(t + d + .05); v.stop(t + d + .05); t += d;
    }
  }
};

// While a scene is skipped (AU.quiet, roadmap T3) every one-shot sound is a no-op, so a line that finishes instantly doesn't fire a burst of
// ticks, thuds and stings. Beds and settings (rain, music, volumes) keep working.
const ALWAYS = new Set(['init', 'now', 'toggle', 'setVolumes', 'applyVolumes', 'setHidden', 'setRain', 'setMusic', 'env']);
for (const k of Object.keys(AU)) {
  const f = AU[k];
  if (typeof f === 'function' && !ALWAYS.has(k)) AU[k] = function (...a) { if (this.quiet) return; return f.apply(this, a); };
}
