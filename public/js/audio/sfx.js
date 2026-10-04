// One-shot sound effects, each a function (au, arg) → void. DOM-free.
// They are reached only through AU.play(name), which no-ops before init and while a scene is skipped (AU.quiet).
// Scripts play them by name with `~sfx name`; `npm run check` validates the name against CUES in audio.js.
import { tone, burst, midi } from './synth.js';
import * as F from './foley.js';
import { sting, versusHit } from './stings.js';

const pick = a => a[Math.floor(Math.random() * a.length)];
const R = (a, b) => a + Math.random() * (b - a);
// Somewhere off: a lowpass (lp Hz) into the sfx bus, plus a send (wet) to the shared room reverb. Returns the input.
function far(au, lp, wet) {
  const c = au.ctx, f = c.createBiquadFilter(), s = c.createGain(); f.type = 'lowpass'; f.frequency.value = lp; f.connect(au.sfx);
  s.gain.value = wet; f.connect(s); s.connect(au.sfxVerb); return f;
}

// How long `~sfx name` holds the script (ms at speed 1) so the next line doesn't talk over it. Default 400.
export const SFX_WAIT = { ring: 2600, hangup: 900, whistle: 1400, telegraph: 1200, typing: 1500, steps: 2200, door: 1400, slam: 500, match: 800,
  lighter: 900, pour: 1500, car: 2000, gunshot: 900, cuffs: 600, rustle: 500, siren: 1500, foghorn: 1500 };

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
  // a sheet rolled into the typewriter: a rustle and the platen's ratchet
  paper: au => { const t = au.now(); F.rustle(au, au.sfx, t, .7, .25); for (let i = 0; i < 5; i++) burst(au, .012, 'bandpass', 2600, .12, .2 + i * .045, 4); },
  type: au => F.typekey(au, au.ui, au.now(), .25),                  // one typewriter key (~paper types with these)
  ding: au => F.carriageBell(au, au.sfx, au.now(), .35),             // the carriage bell
  typing: au => { let x = au.now(); for (let i = 0; i < 14; i++) { F.typekey(au, au.sfx, x, R(.3, .5)); x += R(.07, .14); } F.carriageBell(au, au.sfx, x + .08, .35); },
  rustle: au => F.rustle(au, au.sfx, au.now(), .8, .5),             // a newspaper opened
  // ---------- the telephone ----------
  // two rings of a desk phone's bell: two gongs under a hammer (foley.js), a slightly different phone each time
  ring: au => { const t = au.now(), f0 = pick([1150, 1190, 1240]), v = R(.3, .36); F.bell(au, au.sfx, t, .95, v, f0); F.bell(au, au.sfx, t + 1.45, .95, v, f0); },
  // the line goes dead: the receiver hits the cradle (the bell shivers), a click, then a faint dial hum
  hangup: au => {
    const t = au.now(), hard = Math.random() < .5;
    burst(au, .06, 'lowpass', 900, hard ? .35 : .2); tone(au, 120, .12, 'sine', hard ? .2 : .12);
    burst(au, .02, 'bandpass', 2500, .18, .03, 3); F.bell(au, au.sfx, t + .02, .04, hard ? .2 : .09);
    tone(au, 350, .7, 'sine', .02, .25); tone(au, 440, .7, 'sine', .02, .25);
  },
  // ---------- the world ----------
  // the 6:00 train's whistle: three reeds scooping up to pitch, breath in the pipe, the station throwing it back
  whistle: au => {
    const c = au.ctx, t = au.now(), out = far(au, 2600, .5), f = c.createBiquadFilter(), g = c.createGain(), v = c.createOscillator(), vg = c.createGain();
    f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 1.2; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.12, t + .25); g.gain.setValueAtTime(.12, t + 1.7); g.gain.exponentialRampToValueAtTime(.0001, t + 2.6);
    v.frequency.value = 5; vg.gain.value = 5; v.connect(vg); f.connect(g); g.connect(out); v.start(t); v.stop(t + 2.7);
    [330, 415, 494].forEach(fq => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.setValueAtTime(fq * .94, t); o.frequency.exponentialRampToValueAtTime(fq, t + .2); vg.connect(o.frequency); o.connect(f); o.start(t); o.stop(t + 2.7); });
    const s = c.createBufferSource(), sf = c.createBiquadFilter(), sg = c.createGain(); s.buffer = au.noise; s.loop = true; sf.type = 'bandpass'; sf.frequency.value = 1500; sf.Q.value = .8;
    sg.gain.setValueAtTime(0, t); sg.gain.linearRampToValueAtTime(.05, t + .1); sg.gain.setTargetAtTime(.015, t + .2, .3); sg.gain.setTargetAtTime(0, t + 1.9, .2); s.connect(sf); sf.connect(sg); sg.connect(out); s.start(t, Math.random()); s.stop(t + 2.7);
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
  foghorn: au => { const out = far(au, 1200, .7); F.foghorn(au, out, au.now(), .35, 2.6); },
  bell: au => F.shipBell(au, far(au, 4000, .6), au.now(), .45),     // a station or ship's bell
  gull: au => F.gull(au, far(au, 4000, .4), au.now(), .8),
  car: au => F.carPass(au, au.sfx, au.now(), .45, 3.2),             // a car going by on the wet street
  horn: au => F.horn(au, far(au, 2500, .4), au.now(), .6),
  steps: au => { const t = au.now(), n = 6; for (let i = 0; i < n; i++) F.footstep(au, au.sfx, t + i * .46, .35 + .5 * i / n, true); },   // wet footsteps, coming closer
  door: au => F.doorCreak(au, far(au, 5000, .3), au.now(), .9),
  slam: au => F.doorSlam(au, far(au, 6000, .4), au.now(), .65),
  match: au => F.match(au, au.sfx, au.now(), .8),
  lighter: au => F.lighter(au, au.sfx, au.now(), .8),
  clink: au => F.clink(au, au.sfx, au.now(), .8),
  pour: au => { F.pour(au, au.sfx, au.now(), .6, 1.3); F.clink(au, au.sfx, au.now() + 1.35, .35); },
  cuffs: au => F.cuffs(au, au.sfx, au.now(), 1.2),                   // handcuffs closing (every win)
  gunshot: au => F.gunshot(au, far(au, 1800, 1.1), au.now(), .6),   // a shot a few blocks away

  // ---------- music cues (one-shot phrases on the music bus) ----------
  // piano: { notes: [Hz], gap: s }
  piano: (au, { notes, gap = .45 } = {}) => { (notes || []).forEach((fq, i) => { tone(au, fq, 2.4, 'triangle', .12, i * gap); tone(au, fq * 2, 1.2, 'sine', .03, i * gap); }); },
  // a title card's single low piano note: the root of the chord the music is on (C3–B3), else one of three
  card: au => { const ch = au.chordNow?.(); SFX.piano(au, { notes: [ch ? midi(48 + ((ch.b % 12) + 12) % 12) : pick([196, 174.61, 220])], gap: 0 }); },
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
