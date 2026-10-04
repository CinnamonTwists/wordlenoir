// One-shot sound effects, each a function (au, arg) → void. DOM-free.
// They are reached only through AU.play(name), which no-ops before init and while a scene is skipped (AU.quiet).
// Scripts play them by name with `~sfx name`; `npm run check` validates the name against CUES in audio.js.
import { tone, burst } from './synth.js';
import { sting, versusHit } from './stings.js';

const pick = a => a[Math.floor(Math.random() * a.length)];

export const SFX = {
  // ---------- interface ----------
  tick: au => { burst(au, .03, 'highpass', 3200, .05, 0, .7, au.ui); tone(au, 1700, .02, 'square', .012, 0, undefined, au.ui); },
  key: au => { burst(au, .05, 'bandpass', 2200, .12, 0, 2, au.ui); tone(au, 180, .05, 'sine', .08, 0, undefined, au.ui); },
  // tile reveal: gray thunk / yellow dyad / green arpeggio
  flip: (au, v) => {
    if (v === 0) { tone(au, 130, .18, 'triangle', .22, 0, 90); burst(au, .06, 'lowpass', 500, .2); }
    else if (v === 1) { tone(au, 392, .35, 'triangle', .16); tone(au, 587, .3, 'sine', .07, .03); }
    else { [523.25, 659.25, 783.99].forEach((fq, i) => tone(au, fq, .7, 'triangle', .13, i * .05)); tone(au, 1568, .4, 'sine', .04, .12); }
  },

  // ---------- impacts ----------
  thud: au => { tone(au, 80, .35, 'sine', .45, 0, 40); burst(au, .12, 'lowpass', 300, .25); },
  boom: au => { tone(au, 62, 1.4, 'sine', .7, 0, 28); burst(au, 1.2, 'lowpass', 180, .5); tone(au, 124, .6, 'triangle', .12, 0, 60); },
  heart: au => { [0, .26].forEach((a, i) => { tone(au, i ? 50 : 58, .2, 'sine', i ? .55 : .75, a, 32); burst(au, .07, 'lowpass', 120, .3, a); }); },
  stamp: au => { burst(au, .09, 'lowpass', 900, .7); tone(au, 95, .2, 'sine', .55, 0, 50); },
  sting: (au, name) => sting(au, name),
  versus: au => versusHit(au),
  versusHit: au => versusHit(au),

  // ---------- paper ----------
  paper: au => burst(au, .25, 'bandpass', 1200, .15),

  // ---------- the world ----------
  ring: au => { for (let k = 0; k < 2; k++) for (let i = 0; i < 18; i++) { const a = k * 1.25 + i * .05; tone(au, 440, .025, 'sine', .07, a); tone(au, 480, .025, 'sine', .07, a); } },
  hangup: au => { burst(au, .04, 'bandpass', 1500, .3); tone(au, 350, .7, 'sine', .025, .2); tone(au, 440, .7, 'sine', .025, .2); },
  whistle: au => {
    const c = au.ctx, t = au.now(), f = c.createBiquadFilter(), g = c.createGain(), v = c.createOscillator(), vg = c.createGain();
    f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 1.2; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.12, t + .25); g.gain.setValueAtTime(.12, t + 1.7); g.gain.exponentialRampToValueAtTime(.0001, t + 2.6);
    v.frequency.value = 5; vg.gain.value = 5; v.connect(vg); f.connect(g); g.connect(au.sfx); v.start(t); v.stop(t + 2.7);
    [330, 415, 494].forEach(fq => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = fq; vg.connect(o.frequency); o.connect(f); o.start(t); o.stop(t + 2.7); });
  },
  siren: au => {
    const c = au.ctx, t = au.now(), o = c.createOscillator(), l = c.createOscillator(), lg = c.createGain(), f = c.createBiquadFilter(), g = c.createGain();
    o.type = 'sine'; o.frequency.value = 700; l.frequency.value = .5; lg.gain.value = 160; l.connect(lg); lg.connect(o.frequency);
    f.type = 'lowpass'; f.frequency.value = 1400; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.035, t + 1.2); g.gain.linearRampToValueAtTime(0, t + 4.5);
    o.connect(f); f.connect(g); g.connect(au.sfx); o.start(t); l.start(t); o.stop(t + 4.6); l.stop(t + 4.6);
  },
  thunder: au => {
    const c = au.ctx, t = au.now(), s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = au.noise; s.loop = true; f.type = 'lowpass'; f.frequency.setValueAtTime(900, t); f.frequency.exponentialRampToValueAtTime(90, t + 3.5);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.55, t + .05); g.gain.exponentialRampToValueAtTime(.0001, t + 4);
    s.connect(f); f.connect(g); g.connect(au.sfx); s.start(t); s.stop(t + 4.1); burst(au, .25, 'highpass', 900, .25);
  },
  telegraph: au => { let a = 0; for (const d of '.-..-.--.-...-') { const len = d === '.' ? .06 : .18; tone(au, 820, len, 'square', .035, a); a += len + .07; } },
  foghorn: au => { tone(au, 98, 2.6, 'sawtooth', .07); tone(au, 97, 2.6, 'sawtooth', .06); },

  // ---------- music cues (one-shot phrases on the music bus) ----------
  // piano: { notes: [Hz], gap: s }
  piano: (au, { notes, gap = .45 } = {}) => { (notes || []).forEach((fq, i) => { tone(au, fq, 2.4, 'triangle', .12, i * gap); tone(au, fq * 2, 1.2, 'sine', .03, i * gap); }); },
  // a title card's single low piano note
  card: au => SFX.piano(au, { notes: [pick([196, 174.61, 220])], gap: 0 }),
  // a lost case: four notes falling
  lament: au => SFX.piano(au, { notes: [311.13, 293.66, 261.63, 196], gap: .7 }),
  // 8-note sawtooth "muted trumpet" phrase (G minor): the start button and a win
  riff: au => {
    const c = au.ctx; let t = au.now() + .2;
    const N = { G3: 196, Bb3: 233.08, C4: 261.63, D4: 293.66, Eb4: 311.13, F4: 349.23, G4: 392 };
    const mel = [['G3', .45], ['Bb3', .45], ['C4', .9], ['Eb4', .45], ['D4', .45], ['C4', 1.2], ['Bb3', .45], ['G3', 1.8]];
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1300; f.Q.value = 2; const out = c.createGain(); out.gain.value = .11; f.connect(out); out.connect(au.mus);
    for (const [n, d] of mel) {
      const o = c.createOscillator(), g = c.createGain(), v = c.createOscillator(), vg = c.createGain();
      o.type = 'sawtooth'; o.frequency.value = N[n]; v.frequency.value = 5.2; vg.gain.value = 3; v.connect(vg); vg.connect(o.frequency);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + .08); g.gain.setValueAtTime(.85, t + d * .7); g.gain.linearRampToValueAtTime(0, t + d);
      o.connect(g); g.connect(f); o.start(t); v.start(t); o.stop(t + d + .05); v.stop(t + d + .05); t += d;
    }
  }
};
