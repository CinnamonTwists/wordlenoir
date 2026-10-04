// Procedural audio: every sound is synthesized with Web Audio, no files. init() must run from a user gesture.
// Scripts trigger effects with `~sfx <method>` (ring, hangup, thunder, whistle, siren, telegraph, foghorn, ...).

export const AU = {
  ctx: null, on: true,
  init() {
    if (this.ctx) { this.ctx.resume && this.ctx.resume(); return; }
    const C = window.AudioContext || window.webkitAudioContext; if (!C) return;
    try { this.ctx = new C(); } catch (e) { return; }
    const c = this.ctx;
    this.master = c.createGain(); this.master.gain.value = this.on ? .85 : 0; this.master.connect(c.destination);
    this.comp = c.createDynamicsCompressor(); this.comp.connect(this.master);
    this.sfx = c.createGain(); this.sfx.gain.value = .8; this.sfx.connect(this.comp);
    this.mus = c.createGain(); this.mus.gain.value = .55; this.mus.connect(this.comp);
    const len = c.sampleRate * 2, b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
    let last = 0; for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + .02 * w) / 1.02; d[i] = w * .6 + last * 3; }
    this.noise = b;
    // rain bed
    const rs = c.createBufferSource(); rs.buffer = b; rs.loop = true;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2400; bp.Q.value = .45;
    this.rainLP = c.createBiquadFilter(); this.rainLP.type = 'lowpass'; this.rainLP.frequency.value = 6000;
    this.rainG = c.createGain(); this.rainG.gain.value = 0;
    rs.connect(bp); bp.connect(this.rainLP); this.rainLP.connect(this.rainG); this.rainG.connect(this.comp); rs.start();
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
  toggle() { this.on = !this.on; if (this.master) this.master.gain.setTargetAtTime(this.on ? .85 : 0, this.now(), .1); return this.on; },
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
  tone(fq, dur, type = 'sine', vol = .2, at = 0, slideTo) {
    if (!this.ctx) return; const c = this.ctx, t = this.now() + at, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(fq, t); if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    this.env(g, t, .006, vol, dur); o.connect(g); g.connect(this.sfx); o.start(t); o.stop(t + dur + .05);
  },
  burst(dur, type, fq, vol, at = 0, q = .7) {
    if (!this.ctx) return; const c = this.ctx, t = this.now() + at, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = this.noise; f.type = type; f.frequency.value = fq; f.Q.value = q; this.env(g, t, .004, vol, dur);
    s.connect(f); f.connect(g); g.connect(this.sfx); s.start(t, Math.random()); s.stop(t + dur + .05);
  },
  tick() { this.burst(.03, 'highpass', 3200, .05); this.tone(1700, .02, 'square', .012); },
  key() { this.burst(.05, 'bandpass', 2200, .12, 0, 2); this.tone(180, .05, 'sine', .08); },
  thud() { this.tone(80, .35, 'sine', .45, 0, 40); this.burst(.12, 'lowpass', 300, .25); },
  boom() { this.tone(62, 1.4, 'sine', .7, 0, 28); this.burst(1.2, 'lowpass', 180, .5); this.tone(124, .6, 'triangle', .12, 0, 60); },
  heart() { [0, .26].forEach((a, i) => { this.tone(i ? 50 : 58, .2, 'sine', i ? .55 : .75, a, 32); this.burst(.07, 'lowpass', 120, .3, a); }); },
  sting() {
    if (!this.ctx) return; const c = this.ctx, t = this.now(), f = c.createBiquadFilter(), g = c.createGain();
    f.type = 'lowpass'; f.frequency.setValueAtTime(3200, t); f.frequency.exponentialRampToValueAtTime(500, t + 1.3);
    this.env(g, t, .015, .16, 1.5); f.connect(g); g.connect(this.sfx);
    [110, 155.56, 233.08, 329.63, 466.16].forEach(fq => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = fq; o.connect(f); o.start(t); o.stop(t + 1.6); });
    this.burst(.3, 'highpass', 1800, .18);
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
