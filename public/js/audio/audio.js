// Procedural audio: every sound is synthesized with Web Audio, no files. init() must run from a user gesture. DOM-free at import.
//
// Everything is reached by name (roadmap T9, D4), so any voice can later be swapped for a recorded file without touching scripts:
//   AU.play(name, arg)   a one-shot cue from CUES (`~sfx name` in scripts). No-op before init and while a scene is skipped (AU.quiet).
//   AU.music(mode)       the background music (calm/tense/hope/dread, set by `@mood`).
//   AU.amb(name)         the ambience bed (beds.js), set by `@set` from the set's `ambience` key. Rain is separate (AU.setRain).
// Buses (each under master, scaled by the Settings sliders): sfx, ui (keys, typewriter ticks; follows the sfx slider), mus, ambBus (rain + beds).
//
// Beds and music schedule their notes a little ahead on AudioContext time: a timer calls AU.pump() every 60 ms, which fills each
// active voice up to now + 0.3 s (1.5 s while the tab is hidden, when browsers slow timers to once a second). So #speedN never
// stretches them. They are exempt from AU.quiet, so a skipped scene keeps its room and its music.
import { SFX } from './sfx.js';
import { BEDS, makeBed } from './beds.js';
export { STINGS } from './stings.js';

// Every one-shot cue by name. Scripts may use any of them with `~sfx`.
export const CUES = SFX;

export const AU = {
  ctx: null, on: true, quiet: false, hidden: false, bed: null, bedName: null, timer: null, vol: { master: 1, music: 1, sfx: 1, ambience: 1 }, lastSting: -1e9, lastSoft: false, lastLow: null,
  // Builds the graph. `ctx` is for tools/audio-levels.mjs, which renders through the real chain into an OfflineAudioContext.
  init(ctx) {
    if (this.ctx && !ctx) { this.ctx.resume && this.ctx.resume(); return; }
    const offline = !!ctx;
    if (!ctx) {
      const C = globalThis.AudioContext || globalThis.webkitAudioContext; if (!C) return;
      try { ctx = new C(); } catch (e) { return; }
    }
    const c = this.ctx = ctx;
    this.bed = null; this.bedName = null;
    this.lastSting = -1e9; this.lastSoft = false; this.lastLow = null;
    this.master = c.createGain(); this.master.connect(c.destination);
    this.comp = c.createDynamicsCompressor(); this.comp.connect(this.master);
    for (const k of ['sfx', 'ui', 'mus', 'ambBus']) { this[k] = c.createGain(); this[k].connect(this.comp); }
    this.applyVolumes(true);
    const len = c.sampleRate * 2, b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
    let last = 0; for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + .02 * w) / 1.02; d[i] = w * .6 + last * 3; }
    this.noise = b;
    // the room reverb that beds send their distant sounds to: a dark, generated 2.4 s tail
    this.ambVerb = c.createConvolver(); this.ambVerb.buffer = impulse(c, 2.4, 3.2);
    const vg = c.createGain(); vg.gain.value = .5; this.ambVerb.connect(vg); vg.connect(this.ambBus);
    // rain bed
    const rs = c.createBufferSource(); rs.buffer = b; rs.loop = true;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2400; bp.Q.value = .45;
    this.rainLP = c.createBiquadFilter(); this.rainLP.type = 'lowpass'; this.rainLP.frequency.value = 6000;
    this.rainG = c.createGain(); this.rainG.gain.value = 0;
    rs.connect(bp); bp.connect(this.rainLP); this.rainLP.connect(this.rainG); this.rainG.connect(this.ambBus); rs.start();
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
    if (!offline && !this.timer) this.timer = setInterval(() => this.pump(), 60);
  },
  // Schedules every active bed and music voice up to now + ahead (s). tools/audio-levels.mjs calls it with a long horizon.
  pump(ahead = this.hidden ? 1.5 : .3) {
    if (!this.ctx) return; const until = this.now() + ahead;
    this.bed?.fill(until);
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
  amb(name) {
    if (!this.ctx) return;
    if (!BEDS[name]) name = null;
    if (name === this.bedName) return;
    const t = this.now(); this.bedName = name;
    this.bed?.stop(t); this.bed = name ? makeBed(this, BEDS[name], t) : null;
    this.pump();
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
    set(this.master, this.on ? .85 * V.master : 0); set(this.sfx, .8 * V.sfx); set(this.ui, .8 * V.sfx); set(this.mus, .55 * V.music); set(this.ambBus, V.ambience);
  },
  // Settings → "Mute when the tab is hidden": suspends the whole context while the page isn't visible.
  setHidden(hidden, mute) { this.hidden = hidden; if (!this.ctx) return; if (hidden && mute) this.ctx.suspend(); else this.ctx.resume(); }
};

// A stereo reverb impulse: decaying noise that darkens as it fades.
function impulse(c, secs, decay) {
  const n = Math.floor(c.sampleRate * secs), b = c.createBuffer(2, n, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = b.getChannelData(ch); let lp = 0;
    for (let i = 0; i < n; i++) { const k = i / n, a = .15 + .8 * k; lp = lp * a + (Math.random() * 2 - 1) * (1 - a); d[i] = lp * Math.pow(1 - k, decay) * (1 + k * 2); }
  }
  return b;
}
