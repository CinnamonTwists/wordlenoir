// Ambience beds (roadmap T9): one per kind of place, chosen by the set's `ambience` key (art/sets/*.js) on every `@set`. DOM-free.
// A bed is a few layers on the ambience bus (with the rain, which stays separate):
//   wash   filtered noise whose level and colour drift slowly (room tone, traffic, wind, water)
//   hum    steady low oscillators (refrigeration, mains hum, engines)
//   murmur crowd talk: a few speech-band washes that flicker like voices
//   every  a foley sound (foley.js) scattered at random gaps, panned, softened by distance (lp) and sent to the room reverb (verb)
// Beds crossfade over ~1.5 s. Their scattered events are scheduled ahead on AudioContext time by AU.pump() (audio.js), so #speedN
// never changes them, and AU.quiet (a skipped scene) doesn't silence them.
import * as F from './foley.js';

const R = (a, b) => a + Math.random() * (b - a);
const rr = x => Array.isArray(x) ? R(x[0], x[1]) : x;

// ---------- layers ----------
function wash(au, bed, o) {
  const c = au.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(), p = F.pan(au, bed.dry, o.pan || 0);
  s.buffer = au.noise; s.loop = true; s.playbackRate.value = o.rate || 1;
  f.type = o.type || 'lowpass'; f.frequency.value = o.f; f.Q.value = o.q ?? .7; g.gain.value = o.vol;
  s.connect(f); f.connect(g); g.connect(p); if (o.verb) { const w = c.createGain(); w.gain.value = o.verb; g.connect(w); w.connect(bed.wet); }
  s.start(bed.t0, Math.random() * 1.8);
  let next = bed.t0;
  return {
    stop: t => s.stop(t),
    fill(until) {   // drift: every few seconds, glide toward a new level (and colour)
      if (!o.drift) return;
      while (next < until) {
        const d = R(o.drift[0], o.drift[1]);
        g.gain.setTargetAtTime(o.vol * R(...(o.range || [.7, 1.2])), next, d / 3);
        if (o.fr) f.frequency.setTargetAtTime(o.f * R(...o.fr), next, d / 3);
        next += d;
      }
    }
  };
}
function hum(au, bed, o) {
  const c = au.ctx, g = c.createGain(); g.gain.value = o.vol; g.connect(bed.dry);
  const os = o.f.map((f, i) => { const x = c.createOscillator(); x.type = o.type || 'sine'; x.frequency.value = f; const xg = c.createGain(); xg.gain.value = 1 / (i + 1); x.connect(xg); xg.connect(g); x.start(bed.t0); return x; });
  // an optional slow throb (engines, compressors)
  if (o.throb) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = o.throb; lg.gain.value = o.vol * .5; l.connect(lg); lg.connect(g.gain); l.start(bed.t0); os.push(l); }
  return { stop: t => os.forEach(x => x.stop(t)), fill() {} };
}
// crowd murmur: five speech bands, each flickering a few times a second like overlapping voices
function murmur(au, bed, o) {
  const c = au.ctx, bands = [];
  for (const [f, q, a] of [[300, 2.5, 1], [520, 3, .9], [850, 3.5, .65], [1400, 3, .35], [2300, 2.5, .15]]) {
    const s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain(), p = F.pan(au, bed.dry, R(-.6, .6));
    s.buffer = au.noise; s.loop = true; fl.type = 'bandpass'; fl.frequency.value = f * R(.92, 1.08); fl.Q.value = q; g.gain.value = 0;
    s.connect(fl); fl.connect(g); g.connect(p); if (o.verb) { const w = c.createGain(); w.gain.value = o.verb; g.connect(w); w.connect(bed.wet); }
    s.start(bed.t0, Math.random() * 1.8); bands.push({ s, g, a, fl, f });
  }
  let next = bed.t0;
  return {
    stop: t => bands.forEach(b => b.s.stop(t)),
    fill(until) {
      while (next < until) {
        for (const b of bands) { b.g.gain.setTargetAtTime(o.vol * b.a * R(.35, 1.15), next, R(.04, .12)); if (Math.random() < .3) b.fl.frequency.setTargetAtTime(b.f * R(.85, 1.15), next, .1); }
        next += R(.09, .22);
      }
    }
  };
}
function every(au, bed, o) {
  const c = au.ctx, node = c.createGain(); node.gain.value = 1;
  let into = node;
  if (o.lp) { const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = o.lp; node.connect(f); into = f; }
  into.connect(bed.dry); if (o.verb) { const w = c.createGain(); w.gain.value = o.verb; into.connect(w); w.connect(bed.wet); }
  let next = bed.t0 + (o.first !== undefined ? rr(o.first) : R(0, rr(o.gap))), n = 0;
  return {
    stop() {},
    fill(until) {
      while (next < until) {
        if (next > au.now() - .05) {
          const p = o.pan === undefined ? R(-.7, .7) : rr(o.pan);
          o.play(au, F.pan(au, node, p), next, rr(o.vol), n++);
        }
        next += rr(o.gap);
      }
    }
  };
}
const LAYERS = { wash, hum, murmur, every };

// ---------- event patterns ----------
// someone typing a few words in another room
const typing = (au, out, t, v) => { let x = t; const n = Math.floor(R(6, 18)); for (let i = 0; i < n; i++) { F.typekey(au, out, x, v * R(.6, 1)); x += R(.07, .16) + (Math.random() < .15 ? R(.2, .4) : 0); } if (Math.random() < .25) F.carriageBell(au, out, x + .1, v * .6); };
const steno = (au, out, t, v) => { let x = t; const n = Math.floor(R(3, 8)); for (let i = 0; i < n; i++) { F.stroke(au, out, x, v * R(.6, 1)); x += R(.16, .35); } };
const ringing = (au, out, t, v) => { F.bell(au, out, t, 1.1, v, R(1100, 1300)); if (Math.random() < .5) F.bell(au, out, t + 3, 1.1, v); };
const clinks = (au, out, t, v) => { F.clink(au, out, t, v); if (Math.random() < .3) F.clink(au, out, t + R(.6, 1.4), v * .7); };
const clock = (au, out, t, v, n) => F.tick(au, out, t, v, n % 2 === 1);
const drips = (au, out, t, v) => F.drip(au, out, t, v);
const steps = (au, out, t, v) => { const n = Math.floor(R(4, 9)), gap = R(.42, .55); for (let i = 0; i < n; i++) F.footstep(au, out, t + i * gap, v * (1 - Math.abs(i - n / 2) / n), false); };
const pa = (au, out, t, v) => { F.chime(au, out, t, v); F.babble(au, out, t + 2.2, v * 1.3); };

// ---------- the beds ----------
// Levels were set with `npm run levels -- amb` (DEVELOPMENT.md §1.8): busy rooms around −40 LUFS, quiet ones around −46, before rain.
export const BEDS = {
  // Dash's office, and the board between scenes: room tone, a radiator, the street through the glass.
  office: [
    { wash: { type: 'lowpass', f: 220, vol: .05, drift: [4, 9], range: [.6, 1.1] } },
    { every: { play: F.knock, gap: [18, 40], vol: [.25, .45], lp: 1800, verb: .25 } },
    { every: { play: F.carPass, gap: [25, 55], vol: .25, lp: 700 } },
    { every: { play: clock, gap: 1, vol: .12, pan: .35, first: 0 } }
  ],
  board: [
    { wash: { type: 'lowpass', f: 220, vol: .045, drift: [4, 9], range: [.6, 1.1] } },
    { every: { play: F.knock, gap: [25, 60], vol: [.2, .35], lp: 1800, verb: .25 } },
    { every: { play: F.carPass, gap: [30, 70], vol: .2, lp: 700 } }
  ],
  // the last suspect: the office clock comes up
  'board.last': [
    { wash: { type: 'lowpass', f: 220, vol: .045, drift: [4, 9], range: [.6, 1.1] } },
    { every: { play: clock, gap: 1, vol: .55, pan: .25, first: 0, verb: .15 } }
  ],
  // The precinct: a big room, typewriters and phones somewhere, men talking low.
  precinct: [
    { wash: { type: 'lowpass', f: 380, vol: .05, drift: [3, 7] } },
    { hum: { f: [120, 240, 360], vol: .0035 } },
    { murmur: { vol: .022, verb: .5 } },
    { every: { play: typing, gap: [5, 14], vol: [.12, .22], lp: 3000, verb: .5 } },
    { every: { play: ringing, gap: [28, 60], vol: .1, lp: 2200, verb: .7, first: [6, 20] } },
    { every: { play: F.cough, gap: [30, 70], vol: .25, lp: 1500, verb: .6 } }
  ],
  // The street at night: traffic somewhere, a car going by on wet asphalt, now and then a horn.
  street: [
    { wash: { type: 'lowpass', f: 180, vol: .09, drift: [3, 8], range: [.5, 1.3], fr: [.8, 1.4] } },
    { every: { play: F.carPass, gap: [10, 26], vol: [.12, .28], first: [2, 8] } },
    { every: { play: F.horn, gap: [40, 90], vol: .3, lp: 1200, verb: .6 } },
    { every: { play: F.sirenFar, gap: [70, 150], vol: .5, lp: 900, verb: .8, first: [30, 80] } }
  ],
  // The Last Word: a room full of low talk and glasses. (Its music is the jukebox, music.js.)
  bar: [
    { wash: { type: 'lowpass', f: 300, vol: .04, drift: [3, 6] } },
    { murmur: { vol: .03, verb: .35 } },
    { hum: { f: [120, 240], type: 'sawtooth', vol: .0012 } },   // the neon sign
    { every: { play: clinks, gap: [3, 9], vol: [.15, .3], lp: 6000, verb: .4 } },
    { every: { play: F.cough, gap: [40, 90], vol: .2, lp: 1500, verb: .5 } }
  ],
  // The hearing room: a big hushed room, Ruth's stenotype, the clock on the wall, someone in the gallery.
  hearing: [
    { wash: { type: 'lowpass', f: 260, vol: .035, drift: [5, 10], range: [.8, 1.1] } },
    { every: { play: steno, gap: [4, 10], vol: [.18, .3], lp: 2500, verb: .5, pan: [-.3, .1] } },
    { every: { play: clock, gap: 1, vol: .07, pan: .5, first: 0, verb: .6 } },
    { every: { play: F.cough, gap: [25, 55], vol: .2, lp: 1600, verb: .8 } },
    { every: { play: F.rustle, gap: [15, 35], vol: .12, lp: 4000, verb: .4 } }
  ],
  // Dash's apartment: the icebox hum, a kitchen clock, pipes. (Its music is the radio, music.js.)
  apartment: [
    { wash: { type: 'lowpass', f: 200, vol: .03, drift: [5, 10] } },
    { hum: { f: [60, 120], vol: .004 } },
    { every: { play: clock, gap: 1, vol: .06, pan: -.4, first: 0 } },
    { every: { play: F.knock, gap: [20, 45], vol: [.15, .3], lp: 1500, verb: .3 } },
    { every: { play: F.carPass, gap: [30, 70], vol: .15, lp: 600 } }
  ],
  // Union Station: a huge hall, a crowd, the PA, steam from the platforms, a bell.
  station: [
    { wash: { type: 'lowpass', f: 500, vol: .05, drift: [3, 7], verb: .4 } },
    { murmur: { vol: .025, verb: .8 } },
    { every: { play: steps, gap: [6, 14], vol: [.1, .2], lp: 3000, verb: .6 } },
    { every: { play: pa, gap: [35, 70], vol: .3, lp: 2500, verb: 1.2, first: [8, 20] } },
    { every: { play: F.steam, gap: [18, 40], vol: .18, lp: 5000, verb: .8 } },
    { every: { play: F.shipBell, gap: [50, 110], vol: .2, lp: 2500, verb: 1 } }
  ],
  // The Gazette's press room: the presses running next door, paper.
  pressroom: [
    { wash: { type: 'lowpass', f: 300, vol: .05, drift: [3, 6] } },
    { every: { play: F.press, gap: .48, vol: .14, lp: 1400, verb: .4, pan: [-.2, .2], first: 0 } },
    { every: { play: F.rustle, gap: [6, 15], vol: .15, verb: .3 } },
    { every: { play: typing, gap: [12, 25], vol: .12, lp: 3000, verb: .4 } }
  ],
  // An alley: dripping gutters, the city on the other side of the wall.
  alley: [
    { wash: { type: 'lowpass', f: 160, vol: .06, drift: [4, 9], range: [.5, 1.2] } },
    { every: { play: drips, gap: [.6, 2.6], vol: [.08, .2], verb: .7 } },
    { every: { play: F.carPass, gap: [25, 50], vol: .3, lp: 500 } },
    { every: { play: F.sirenFar, gap: [80, 160], vol: .4, lp: 800, verb: .8, first: [30, 90] } }
  ],
  // The morgue: refrigeration, a cold drip.
  morgue: [
    { wash: { type: 'lowpass', f: 300, vol: .025, drift: [5, 10] } },
    { hum: { f: [60, 120, 180, 300], type: 'sine', vol: .006, throb: .13 } },
    { every: { play: drips, gap: [3, 8], vol: [.06, .12], verb: .8 } },
    { every: { play: F.footstep, gap: [25, 60], vol: .2, lp: 2000, verb: 1 } }
  ],
  // A phone booth on the street: the street, closer and muffled by the glass.
  phonebooth: [
    { wash: { type: 'lowpass', f: 160, vol: .08, drift: [3, 8], range: [.5, 1.3] } },
    { every: { play: F.carPass, gap: [12, 30], vol: [.18, .32], lp: 1200, first: [3, 10] } }
  ],
  // A rooftop: wind, the whole city below.
  rooftop: [
    { wash: { type: 'bandpass', f: 500, q: .8, vol: .07, drift: [2, 5], range: [.3, 1.4], fr: [.7, 1.5] } },
    { wash: { type: 'bandpass', f: 1300, q: 6, vol: .018, drift: [2, 6], range: [.1, 1.3], fr: [.8, 1.3] } },
    { wash: { type: 'lowpass', f: 140, vol: .06, drift: [5, 10] } },
    { every: { play: F.sirenFar, gap: [50, 120], vol: .5, lp: 1000, verb: .8, first: [15, 50] } },
    { every: { play: F.horn, gap: [40, 80], vol: .15, lp: 900, verb: .8 } }
  ],
  // The docks: water against the pilings, ropes and wood, a foghorn out in the bay, a gull that can't sleep.
  docks: [
    { wash: { type: 'lowpass', f: 420, vol: .06, drift: [.8, 2.2], range: [.3, 1.3], fr: [.7, 1.3] } },
    { every: { play: F.creak, gap: [5, 13], vol: [.3, .6], lp: 1500, verb: .4 } },
    { every: { play: F.foghorn, gap: [35, 70], vol: .45, verb: 1, first: [10, 25] } },
    { every: { play: F.gull, gap: [40, 90], vol: .25, lp: 3500, verb: .6 } }
  ],
  // A ship's gangway: the docks, closer to the water.
  gangway: [
    { wash: { type: 'lowpass', f: 500, vol: .09, drift: [.7, 1.8], range: [.3, 1.3], fr: [.7, 1.3] } },
    { every: { play: F.creak, gap: [3, 8], vol: [.4, .7], lp: 1800, verb: .3 } },
    { every: { play: F.foghorn, gap: [30, 60], vol: .5, verb: 1, first: [8, 20] } },
    { every: { play: F.shipBell, gap: [40, 80], vol: .15, lp: 2500, verb: .8 } }
  ],
  // A warehouse: a big empty dark, water dripping somewhere high up, the building settling.
  warehouse: [
    { wash: { type: 'lowpass', f: 200, vol: .04, drift: [4, 9] } },
    { every: { play: drips, gap: [1.5, 5], vol: [.08, .16], verb: 1.2 } },
    { every: { play: F.creak, gap: [12, 30], vol: [.2, .35], lp: 1200, verb: 1 } },
    { every: { play: F.clang, gap: [40, 90], vol: .15, lp: 1200, verb: 1.2 } }
  ],
  // The Hall of Records: quiet, a clock, someone turning pages.
  records: [
    { wash: { type: 'lowpass', f: 240, vol: .03, drift: [5, 10] } },
    { every: { play: clock, gap: 1, vol: .06, pan: -.3, first: 0, verb: .5 } },
    { every: { play: F.rustle, gap: [8, 20], vol: .14, lp: 5000, verb: .4 } },
    { every: { play: steps, gap: [30, 70], vol: .1, lp: 2500, verb: .8 } }
  ],
  // WKRN: equipment hum, a relay clicking, the studio's dead air.
  studio: [
    { wash: { type: 'lowpass', f: 250, vol: .025, drift: [5, 10] } },
    { hum: { f: [60, 120, 180, 240], type: 'sine', vol: .005 } },
    { every: { play: (au, out, t, v) => F.tick(au, out, t, v, true), gap: [6, 18], vol: .2 } }
  ],
  // The penitentiary: long hard halls, doors far away, a guard's steps.
  penitentiary: [
    { wash: { type: 'lowpass', f: 240, vol: .045, drift: [4, 8] } },
    { every: { play: F.clang, gap: [14, 32], vol: [.12, .25], lp: 1400, verb: 1.3 } },
    { every: { play: steps, gap: [12, 28], vol: [.12, .2], lp: 2500, verb: 1 } },
    { every: { play: F.cough, gap: [30, 60], vol: .15, lp: 1200, verb: 1 } }
  ],
  // The ferry: the engine under the deck, water along the hull, the bell.
  ferry: [
    { hum: { f: [36, 72, 108], type: 'triangle', vol: .01, throb: 2.1 } },
    { wash: { type: 'lowpass', f: 600, vol: .05, drift: [1, 2.5], range: [.5, 1.2], fr: [.8, 1.2] } },
    { every: { play: F.creak, gap: [8, 18], vol: .3, lp: 1500, verb: .3 } },
    { every: { play: F.shipBell, gap: [30, 70], vol: .2, verb: .6 } }
  ],
  // The bank vault: almost nothing. The time lock ticking.
  vault: [
    { wash: { type: 'lowpass', f: 160, vol: .025, drift: [6, 12] } },
    { hum: { f: [50, 100], vol: .003 } },
    { every: { play: clock, gap: .5, vol: .045, pan: .2, first: 0, verb: .3 } }
  ],
  // ---------- interludes ----------
  hospital: [
    { wash: { type: 'lowpass', f: 260, vol: .03, drift: [5, 10] } },
    { hum: { f: [120, 240], vol: .002 } },
    { every: { play: clock, gap: 1, vol: .05, pan: .4, first: 0 } },
    { every: { play: steps, gap: [20, 45], vol: .12, lp: 2500, verb: .8 } }
  ],
  restaurant: [
    { wash: { type: 'lowpass', f: 300, vol: .035, drift: [3, 6] } },
    { murmur: { vol: .018, verb: .3 } },
    { every: { play: clinks, gap: [4, 10], vol: [.12, .25], lp: 5000, verb: .3 } }
  ],
  kitchen: [
    { wash: { type: 'lowpass', f: 200, vol: .025, drift: [5, 10] } },
    { hum: { f: [60, 120], vol: .003 } },
    { every: { play: clock, gap: 1, vol: .07, pan: -.3, first: 0 } },
    { every: { play: drips, gap: [6, 15], vol: .08, verb: .2 } }
  ],
  ballpark: [
    { wash: { type: 'bandpass', f: 450, q: .7, vol: .07, drift: [2, 6], range: [.3, 1.3], fr: [.7, 1.4] } },
    { wash: { type: 'lowpass', f: 150, vol: .05, drift: [5, 10] } },
    { every: { play: F.creak, gap: [15, 35], vol: .2, lp: 1200, verb: .8 } }
  ],
  ruins: [
    { wash: { type: 'bandpass', f: 480, q: .8, vol: .07, drift: [2, 5], range: [.3, 1.3], fr: [.7, 1.4] } },
    { every: { play: drips, gap: [1, 4], vol: [.06, .14], verb: .6 } },
    { every: { play: F.creak, gap: [10, 25], vol: .25, lp: 1000, verb: .8 } }
  ],
  cemetery: [
    { wash: { type: 'bandpass', f: 420, q: .7, vol: .06, drift: [2, 6], range: [.3, 1.2], fr: [.7, 1.4] } },
    { every: { play: F.shipBell, gap: [45, 90], vol: .08, lp: 1500, verb: 1.2, first: [10, 30] } }
  ]
};

// Builds a bed at time t: everything into its own gain on the ambience bus (plus a send to the room reverb), fading in.
export function makeBed(au, spec, t, fade = 1.5) {
  const c = au.ctx, out = c.createGain(), send = c.createGain();   // the dry mix and the reverb send, faded together
  for (const g of [out, send]) { g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + fade); }
  out.connect(au.ambBus); send.connect(au.ambVerb);
  const bed = { t0: t, dry: out, wet: send };
  const layers = spec.map(l => { const [k, o] = Object.entries(l)[0]; return LAYERS[k](au, bed, o); });
  return {
    fill: until => layers.forEach(l => l.fill(until)),
    stop(at, f = 1.5) {
      for (const g of [out, send]) { g.gain.cancelScheduledValues(at); g.gain.setValueAtTime(g.gain.value, at); g.gain.linearRampToValueAtTime(0, at + f); }
      layers.forEach(l => l.stop(at + f + .1));
    }
  };
}
