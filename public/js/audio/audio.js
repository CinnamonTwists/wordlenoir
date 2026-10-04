// Procedural audio: every sound is synthesized with Web Audio, no files. init() must run from a user gesture. DOM-free at import.
//
// Everything is reached by name (roadmap T9, D4), so any voice can later be swapped for a recorded file without touching scripts:
//   AU.play(name, arg)   a one-shot cue from CUES (`~sfx name` in scripts). No-op before init and while a scene is skipped (AU.quiet).
//   AU.music(mode)       the background music (calm/tense/hope/dread, set by `@mood`).
// Buses (each under master, scaled by the Settings sliders): sfx, ui (keys, typewriter ticks; follows the sfx slider), mus, amb (rain).
import { SFX } from './sfx.js';
export { STINGS } from './stings.js';

// Every one-shot cue by name. Scripts may use any of them with `~sfx`.
export const CUES = SFX;

export const AU = {
  ctx: null, on: true, quiet: false, vol: { master: 1, music: 1, sfx: 1, ambience: 1 }, lastSting: -1e9, lastSoft: false, lastLow: null,
  // Builds the graph. `ctx` is for tools/audio-levels.mjs, which renders through the real chain into an OfflineAudioContext.
  init(ctx) {
    if (this.ctx && !ctx) { this.ctx.resume && this.ctx.resume(); return; }
    if (!ctx) {
      const C = globalThis.AudioContext || globalThis.webkitAudioContext; if (!C) return;
      try { ctx = new C(); } catch (e) { return; }
    }
    const c = this.ctx = ctx;
    this.lastSting = -1e9; this.lastSoft = false; this.lastLow = null;
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
    this.music('calm');
  },
  now() { return this.ctx ? this.ctx.currentTime : 0; },

  // ---------- named cues ----------
  play(name, arg) {
    if (!this.ctx || this.quiet) return;
    const cue = CUES[name]; if (cue) cue(this, arg);
  },
  music(mode) {
    if (!this.ctx) return; const t = this.now(), d = this.dr;
    const S = (p, v) => p.setTargetAtTime(v, t, 1.2);
    if (mode === 'dread') { S(d.c.g.gain, .45); S(d.c.o.frequency, 58.27); S(d.b.g.gain, .2); S(d.lp.frequency, 200); S(d.out.gain, .75); }
    else if (mode === 'tense') { S(d.c.g.gain, .3); S(d.c.o.frequency, 58.27); S(d.b.g.gain, .16); S(d.out.gain, .6); }
    else if (mode === 'hope') { S(d.c.g.gain, .28); S(d.c.o.frequency, 69.3); S(d.b.g.gain, .1); S(d.out.gain, .5); }
    else { S(d.c.g.gain, 0); S(d.b.g.gain, .12); S(d.out.gain, .45); }
  },
  setRain(level, indoor) {
    if (!this.ctx) return;
    const v = { off: .015, window: .05, light: .07, heavy: .14 }[level] ?? .04;
    this.rainG.gain.setTargetAtTime(v, this.now(), .8);
    this.rainLP.frequency.setTargetAtTime(indoor ? 900 : 6000, this.now(), .5);
  },

  // ---------- settings ----------
  toggle() { return this.setVolumes({ on: !this.on }); },
  // Settings → bus gains. v: { master, music, sfx, ambience } (0–1) and/or { on }. Safe before init (applied on init). Returns `on`.
  setVolumes(v) { if ('on' in v) this.on = !!v.on; for (const k of Object.keys(this.vol)) if (k in v) this.vol[k] = Math.max(0, Math.min(1, +v[k] || 0)); this.applyVolumes(); return this.on; },
  applyVolumes(now) {
    if (!this.ctx) return; const t = this.now(), V = this.vol;
    const set = (node, g) => now ? (node.gain.value = g) : node.gain.setTargetAtTime(g, t, .05);
    set(this.master, this.on ? .85 * V.master : 0); set(this.sfx, .8 * V.sfx); set(this.ui, .8 * V.sfx); set(this.mus, .55 * V.music); set(this.amb, V.ambience);
  },
  // Settings → "Mute when the tab is hidden": suspends the whole context while the page isn't visible.
  setHidden(hidden, mute) { if (!this.ctx) return; if (hidden && mute) this.ctx.suspend(); else this.ctx.resume(); }
};
