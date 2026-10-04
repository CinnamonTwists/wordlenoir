// Procedural jazz (roadmap T9): a small band synthesized on the fly and scheduled ahead on AudioContext time. DOM-free.
//
// A loop is a tempo, a swing ratio, a chord chart (one or two chords per bar) and a list of parts. AU.pump() calls fill(until) on the
// playing loop, which schedules every eighth note up to `until`; each part looks at the eighth (k = 0..7 in the bar) and the chord and
// decides what to play. Small random choices (a pickup note, a re-struck chord, whether a phrase comes in) keep it from looping audibly.
//
// LOOPS: the four moods (calm, tense, hope, dread), the set variants (jukebox in the bar, radio in the apartment, bigband in the station),
// the title theme (the menu), and four ending themes (finale, elegy, lasttrain, mirror). AU.music() picks one (see pickLoop) and
// crossfades to it. Everything plays into AU.musIn, which ducks a little while text is on screen.
import { env, midi } from './synth.js';

const R = (a, b) => a + Math.random() * (b - a);
const chance = p => Math.random() < p;
const pickOf = a => a[Math.floor(Math.random() * a.length)];

// ---------- chords ----------
// ch(bass, voicing): bass is a MIDI note (the root, low), voicing the comping chord. Tones (pitch classes) feed walking bass and melodies.
const ch = (b, v, extra = []) => ({ b, v, pcs: [...new Set([b, ...v, ...extra].map(n => n % 12))] });
const near = (pcs, from, lo, hi) => {   // a chord tone near `from`, within [lo, hi]
  const opts = []; for (let n = lo; n <= hi; n++) if (pcs.includes(n % 12) && n !== from) opts.push(n);
  opts.sort((a, b) => Math.abs(a - from) - Math.abs(b - from)); return pickOf(opts.slice(0, 3)) ?? from;
};

// ---------- voices (absolute time t, into `out`) ----------
// Upright bass: a plucked triangle with a sine underneath, the lowpass closing as the note dies.
function bass(au, out, t, n, dur, v = 1) {
  const c = au.ctx, f = c.createBiquadFilter(), g = c.createGain(), fq = midi(n);
  f.type = 'lowpass'; f.Q.value = 1.2; f.frequency.setValueAtTime(1100, t); f.frequency.exponentialRampToValueAtTime(380, t + .25);
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.08 * v, t + .012); g.gain.setTargetAtTime(.035 * v, t + .02, .12); g.gain.setTargetAtTime(0, t + dur * .92, .05);
  f.connect(g); g.connect(out);
  for (const [type, m, a] of [['triangle', 1, 1], ['sine', 1, .9], ['sine', 2, .12]]) { const o = c.createOscillator(), og = c.createGain(); o.type = type; o.frequency.value = fq * m; og.gain.value = a; o.connect(og); og.connect(f); o.start(t); o.stop(t + dur + .3); }
}
// Brushes: a swish (a long soft sweep) and a tap.
function swish(au, out, t, dur, v = 1) {
  const c = au.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  s.buffer = au.noise; s.loop = true; f.type = 'bandpass'; f.frequency.setValueAtTime(3000, t); f.frequency.linearRampToValueAtTime(4800, t + dur); f.Q.value = .8;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.1 * v, t + dur * .55); g.gain.linearRampToValueAtTime(0, t + dur);
  s.connect(f); f.connect(g); g.connect(out); s.start(t, Math.random()); s.stop(t + dur + .05);
}
function tap(au, out, t, v = 1) {
  const c = au.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  s.buffer = au.noise; f.type = 'bandpass'; f.frequency.value = 2600; f.Q.value = .9; env(g, t, .003, .3 * v, .09);
  s.connect(f); f.connect(g); g.connect(out); s.start(t, Math.random()); s.stop(t + .15);
}
// Ride cymbal: six detuned square waves (the classic metallic cluster) through a highpass, plus a stick tick.
const RIDE = [205.3, 304.4, 369.6, 522.7, 540, 800];
function ride(au, out, t, v = 1, dec = .7) {
  const c = au.ctx, f = c.createBiquadFilter(), f2 = c.createBiquadFilter(), g = c.createGain();
  f.type = 'highpass'; f.frequency.value = 6500; f2.type = 'peaking'; f2.frequency.value = 9000; f2.gain.value = 4;
  env(g, t, .002, .07 * v, dec); f.connect(f2); f2.connect(g); g.connect(out);
  for (const fq of RIDE) { const o = c.createOscillator(); o.type = 'square'; o.frequency.value = fq * 1.6; o.connect(f); o.start(t); o.stop(t + dec + .1); }
}
function hat(au, out, t, v = 1) {
  const c = au.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  s.buffer = au.noise; f.type = 'highpass'; f.frequency.value = 7000; env(g, t, .002, .09 * v, .05);
  s.connect(f); f.connect(g); g.connect(out); s.start(t, Math.random()); s.stop(t + .1);
}
function kick(au, out, t, v = 1) {   // a soft feathered bass drum
  const c = au.ctx, o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(90, t); o.frequency.exponentialRampToValueAtTime(48, t + .12);
  env(g, t, .004, .35 * v, .18); o.connect(g); g.connect(out); o.start(t); o.stop(t + .25);
}
// Rhodes: a sine carrier with a sine modulator whose index decays (the bark), and a faint tine an octave and a fifth up.
function rhodes(au, out, t, n, dur, v = 1) {
  const c = au.ctx, fq = midi(n), car = c.createOscillator(), mod = c.createOscillator(), mg = c.createGain(), g = c.createGain();
  mod.frequency.value = fq; mg.gain.setValueAtTime(fq * 1.6, t); mg.gain.exponentialRampToValueAtTime(fq * .15, t + .6);
  mod.connect(mg); mg.connect(car.frequency); car.frequency.value = fq;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.06 * v, t + .008); g.gain.setTargetAtTime(.03 * v, t + .01, .4); g.gain.setTargetAtTime(0, t + dur, .25);
  car.connect(g); g.connect(out); car.start(t); mod.start(t); car.stop(t + dur + 1.2); mod.stop(t + dur + 1.2);
  const tn = c.createOscillator(), tg = c.createGain(); tn.frequency.value = fq * 3; env(tg, t, .002, .006 * v, .35); tn.connect(tg); tg.connect(out); tn.start(t); tn.stop(t + .5);
}
// Piano: triangle and sine octave with a short hammer, decaying.
function piano(au, out, t, n, dur, v = 1) {
  const c = au.ctx, fq = midi(n), g = c.createGain();
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.09 * v, t + .005); g.gain.setTargetAtTime(.03 * v, t + .01, .35); g.gain.setTargetAtTime(0, t + dur, .2); g.connect(out);
  for (const [type, m, a] of [['triangle', 1, 1], ['sine', 2, .25], ['sine', 3, .06]]) { const o = c.createOscillator(), og = c.createGain(); o.type = type; o.frequency.value = fq * m; og.gain.value = a; o.connect(og); og.connect(g); o.start(t); o.stop(t + dur + 1); }
}
// Vibraphone: sine plus a quickly fading fourth partial, with motor tremolo.
function vibes(au, out, t, n, dur, v = 1) {
  const c = au.ctx, fq = midi(n), g = c.createGain(), tr = c.createOscillator(), tg = c.createGain(), amp = c.createGain();
  tr.frequency.value = 5.2; tg.gain.value = .35; amp.gain.value = .65; tr.connect(tg); tg.connect(amp.gain);
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.11 * v, t + .004); g.gain.setTargetAtTime(0, t + .01, Math.min(1.4, dur * .8));
  amp.connect(g); g.connect(out);
  const o = c.createOscillator(); o.frequency.value = fq; o.connect(amp);
  const o4 = c.createOscillator(), g4 = c.createGain(); o4.frequency.value = fq * 4; env(g4, t, .002, .25, .12); o4.connect(g4); g4.connect(amp);
  for (const x of [o, o4, tr]) { x.start(t); x.stop(t + dur + 2); }
}
// Music box (the mirror theme): a pure high sine with a bell partial.
function musicbox(au, out, t, n, dur, v = 1) {
  const c = au.ctx, fq = midi(n);
  for (const [m, a, d] of [[1, .05, 1.6], [3.01, .012, .5], [5.4, .005, .2]]) { const o = c.createOscillator(), g = c.createGain(); o.frequency.value = fq * m; env(g, t, .002, a * v, d); o.connect(g); g.connect(out); o.start(t); o.stop(t + d + .1); }
}
// A horn line: muted trumpet (saw, nasal), clarinet (square, woody) or sax (saw and square, reedy). Legato phrases glide note to note.
const HORNS = {
  trumpet: { waves: [['sawtooth', 1]], lp: 1500, q: 2.5, peak: 1400, vib: [5.4, 3.5], vol: .05 },
  clarinet: { waves: [['square', 1]], lp: 1800, q: 1, peak: 900, vib: [5, 2.5], vol: .04 },
  sax: { waves: [['sawtooth', .7], ['square', .4]], lp: 1700, q: 1.6, peak: 1100, vib: [5.2, 4], vol: .045 },
  section: { waves: [['sawtooth', .5], ['sawtooth', .5]], lp: 2000, q: 1, peak: 1200, vib: [5, 2], vol: .035, spread: 9 }
};
// notes: [[midi, start beat, length in beats]] relative to t
function horn(au, out, t, beat, notes, voice = 'trumpet', v = 1) {
  if (!notes.length) return;
  const H = HORNS[voice], c = au.ctx, f = c.createBiquadFilter(), pk = c.createBiquadFilter(), g = c.createGain();
  f.type = 'lowpass'; f.frequency.value = H.lp; f.Q.value = H.q; pk.type = 'peaking'; pk.frequency.value = H.peak; pk.gain.value = 5; pk.Q.value = 1.5;
  f.connect(pk); pk.connect(g); g.connect(out); g.gain.value = H.vol * v;
  const end = t + Math.max(...notes.map(([, s, l]) => s + l)) * beat + .3;
  const amp = c.createGain(); amp.gain.setValueAtTime(0, t); amp.connect(f);
  const vib = c.createOscillator(), vg = c.createGain(); vib.frequency.value = H.vib[0]; vg.gain.setValueAtTime(0, t); vib.connect(vg);
  const oscs = H.waves.flatMap(([type, a], i) => [-1, 1].slice(0, H.spread ? 2 : 1).map(side => {
    const o = c.createOscillator(), og = c.createGain(); o.type = type; og.gain.value = a; o.detune.value = H.spread ? side * H.spread : i * 4;
    vg.connect(o.frequency); o.connect(og); og.connect(amp); return o;
  }));
  for (const [n, s, l] of notes) {
    const a = t + s * beat, b = a + l * beat * .92;
    oscs.forEach(o => o.frequency.setTargetAtTime(midi(n), a, .018));
    amp.gain.setTargetAtTime(1, a, .025); amp.gain.setTargetAtTime(.8, a + .08, .2); amp.gain.setTargetAtTime(0, b, .04);
    vg.gain.setValueAtTime(0, a); vg.gain.linearRampToValueAtTime(H.vib[1], a + Math.min(.4, l * beat * .6));
  }
  oscs.forEach(o => o.start(t)); vib.start(t); oscs.forEach(o => o.stop(end)); vib.stop(end);
}
// Strings: detuned saws through a soft lowpass, with an optional tremolo (bowed fast).
function strings(au, out, t, notes, dur, v = 1, trem = 0) {
  const c = au.ctx, f = c.createBiquadFilter(), g = c.createGain(), amp = c.createGain();
  f.type = 'lowpass'; f.frequency.value = 1300; f.Q.value = .5;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.04 * v, t + .7); g.gain.setValueAtTime(.04 * v, t + dur - .3); g.gain.linearRampToValueAtTime(0, t + dur + .5);
  amp.connect(f); f.connect(g); g.connect(out);
  const all = [];
  if (trem) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = trem; lg.gain.value = .45; amp.gain.value = .55; l.connect(lg); lg.connect(amp.gain); all.push(l); }
  for (const n of notes) for (const d of [-7, 7]) { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = midi(n); o.detune.value = d; o.connect(amp); all.push(o); }
  all.forEach(o => { o.start(t); o.stop(t + dur + .6); });
}

// ---------- parts ----------
// Each part is (P, k, t) → void, called on every eighth. P: { au, out, chord, next (the chord after this one), bar, beat, k, p (loop state) }.
const brushes = (v = 1) => (P, k, t) => {
  if (k === 0 || k === 4) swish(P.au, P.out, t, P.beat * 1.9, v);
  if (k === 2 || k === 6) tap(P.au, P.out, t, v * R(.7, 1));
  if (k === 7 && chance(.2)) tap(P.au, P.out, t, v * .4);
};
const swingKit = (v = 1, withKick = true) => (P, k, t) => {   // ride: 1, 2, and-of-2, 3, 4, and-of-4; hat on 2 and 4
  if (k % 2 === 0 || k === 3 || k === 7) ride(P.au, P.out, t, v * (k % 2 ? .6 : k === 2 || k === 6 ? 1 : .8), .55);
  if (k === 2 || k === 6) hat(P.au, P.out, t, v * .8);
  if (withKick && k % 2 === 0) kick(P.au, P.out, t, v * .25);
};
// two-feel ballad bass: root on 1, a chord tone on 3, sometimes a pickup into the next chord
const twoFeel = (v = 1) => (P, k, t) => {
  if (k === 0) { P.p.last = P.chord.b; bass(P.au, P.out, t, P.chord.b, P.beat * 1.9, v); }
  if (k === 4) { const n = P.half ? P.chord.b : near(P.chord.pcs, P.chord.b + 7, P.chord.b - 5, P.chord.b + 9); bass(P.au, P.out, t, n, P.beat * (chance(.3) ? 1.4 : 1.9), v * .9); }
  if (k === 7 && chance(.35)) bass(P.au, P.out, t, P.next.b + (chance(.5) ? 1 : -1), P.beat * .45, v * .7);
};
// walking bass: quarter notes, chord tones, a chromatic approach on beat 4
const walking = (v = 1) => (P, k, t) => {
  if (k % 2) return;
  let n;
  if (k === 0 || (P.half && k === 4)) n = P.chord.b;
  else if (k === 6) n = P.next.b + (chance(.6) ? (chance(.5) ? 1 : -1) : 7 - 12 * (P.next.b + 7 > 50));
  else n = near(P.chord.pcs, P.p.last ?? P.chord.b, 31, 50);
  P.p.last = n; bass(P.au, P.out, t, n, P.beat * .95, v * (k === 0 ? 1 : .85));
};
// comping: the chord on 1 (held), sometimes re-struck on the and-of-2; `inst` is rhodes, piano or vibes
const comp = (inst = rhodes, v = 1, busy = .3) => (P, k, t) => {
  if (k === 0 || (P.half && k === 4)) { const d = P.beat * (P.half ? 1.8 : 3.4); P.chord.v.forEach((n, i) => inst(P.au, P.out, t + i * .012, n, d, v * R(.8, 1))); }
  else if (k === 3 && !P.half && chance(busy)) P.chord.v.forEach(n => inst(P.au, P.out, t, n, P.beat * 1.2, v * .55));
};
// Charleston comp for the swing loops: on 1 and the and-of-2
const charleston = (inst = piano, v = 1) => (P, k, t) => {
  if (k === 0 || k === 3 || (P.half && k === 4)) P.chord.v.forEach(n => inst(P.au, P.out, t, n, P.beat * (k === 3 ? .6 : .9), v * (k === 3 ? .8 : 1)));
};
// a short improvised phrase every few bars: steps through chord tones and the key's scale
function improv(P, t, lo, hi, scale, beats = 4) {
  const notes = []; let n = P.p.lead ?? Math.round((lo + hi) / 2), s = R(0, 1) < .5 ? 0 : .5;
  const rhythm = pickOf([[1, .5, .5, 1, 1], [.5, .5, .5, .5, 2], [1.5, .5, 1, 1], [.5, 1, .5, 2], [1, 1, 2]]);
  for (const l of rhythm) {
    if (s >= beats) break;
    const pool = []; for (let x = lo; x <= hi; x++) if ((P.chord.pcs.includes(x % 12) || scale.includes(x % 12)) && Math.abs(x - n) <= 4 && x !== n) pool.push(x);
    n = pool.length ? pickOf(pool) : n;
    if (l >= 1 && !P.chord.pcs.includes(n % 12)) n = near(P.chord.pcs, n, lo, hi);   // land long notes on chord tones
    notes.push([n, s, Math.min(l, beats - s)]); s += l;
  }
  P.p.lead = n; return notes;
}
const lead = (voice, lo, hi, scale, every = 4, p = .4, v = 1) => (P, k, t) => {
  if (k !== 0 || P.bar % every !== every - 2 || !chance(p)) return;
  const notes = improv(P, 0, lo, hi, scale, 6);
  if (voice === 'vibes') notes.forEach(([n, s, l]) => vibes(P.au, P.out, t + s * P.beat, n, l * P.beat, v));
  else if (voice === 'piano') notes.forEach(([n, s, l]) => piano(P.au, P.out, t + s * P.beat, n, l * P.beat, v));
  else horn(P.au, P.out, t, P.beat, notes, voice, v);
};
// A written melody: [[midi, beat, beats], ...] played on bar `at` of every `every` bars.
const tune = (voice, notes, every, at = 0, v = 1) => (P, k, t) => {
  if (k !== 0 || P.bar % every !== at) return;
  if (voice === 'piano' || voice === 'musicbox' || voice === 'vibes') { const f = { piano, musicbox, vibes }[voice]; notes.forEach(([n, s, l]) => f(P.au, P.out, t + s * P.beat, n, l * P.beat, v)); }
  else horn(P.au, P.out, t, P.beat, notes, voice, v);
};
// A riff the horns repeat over the changes: intervals above each chord's root ([semitones, beat, beats]).
const riff = (voice, shape, oct = 60, v = 1, p = .85) => (P, k, t) => {
  if (k !== 0 || !chance(p)) return;
  const root = oct + ((P.chord.b % 12) + 12) % 12, minor = P.chord.pcs.includes((P.chord.b + 3) % 12) && !P.chord.pcs.includes((P.chord.b + 4) % 12);
  horn(P.au, P.out, t, P.beat, shape.map(([i, s, l]) => [root + (minor && i % 12 === 4 ? i - 1 : i), s, l]), voice, v);
};
// brass section shout chords on the off-beats
const shout = (v = 1) => (P, k, t) => {
  if ((k === 3 || k === 7) && chance(k === 7 ? .35 : .5)) horn(P.au, P.out, t, P.beat, P.chord.v.map(n => [n + 12, 0, k === 7 ? .45 : .9]).slice(0, 1), 'section', v);
  if ((k === 3 || k === 7) && chance(.5)) P.chord.v.slice(1).forEach(n => horn(P.au, P.out, t, P.beat, [[n + 12, 0, .8]], 'section', v * .7));
};
// tense: an eighth-note ostinato in the bass and low piano
const ostinato = (seq, v = 1) => (P, k, t) => { const n = seq[(P.bar % 2) * 8 + k]; if (n) { bass(P.au, P.out, t, n, P.beat * .45, v); if (k % 2 === 0) piano(P.au, P.out, t, n + 12, P.beat * .4, v * .35); } };
// tremolo strings holding each bar's chord
const tremPad = (v = 1, trem = 7.5) => (P, k, t) => { if (k === 0) strings(P.au, P.out, t, P.chord.v, P.beat * 4, v, trem); };
const pad = (v = 1, bars = 1) => (P, k, t) => { if (k === 0 && P.bar % bars === 0) strings(P.au, P.out, t, P.chord.v, P.beat * 4 * bars, v); };
const sparseRide = (v = 1) => (P, k, t) => { if ((k === 0 || k === 4) && chance(.75)) ride(P.au, P.out, t, v, .9); if (k === 6 && chance(.2)) ride(P.au, P.out, t, v * .6, .5); };
// dread: low clusters struck every few bars, and a high bowed minor second now and then
const stabs = (v = 1) => (P, k, t) => {
  if (k === 0 && P.bar % 2 === 0 && chance(.7)) [38, 39, 44, 50].forEach((n, i) => piano(P.au, P.out, t + i * .01, n - (P.bar % 4 ? 0 : 2), P.beat * 3, v * (i ? .7 : 1)));
  if (k === 4 && chance(.18)) [81, 82].forEach(n => strings(P.au, P.out, t, [n], P.beat * 6, v * .45));
};

// ---------- the loops ----------
// Riff motif (the title riff, G minor): G Bb C Eb D C Bb G, as beats.
const motif = (root, minor = true) => {
  const s = minor ? [0, 3, 5, 8, 7, 5, 3, 0] : [0, 4, 5, 9, 7, 5, 4, 0];
  const b = [[0, .5], [.5, .5], [1, 1], [2, .5], [2.5, .5], [3, 1.5], [4.5, .5], [5, 2.5]];
  return s.map((i, x) => [root + i, b[x][0], b[x][1]]);
};
const Dm = [2, 4, 5, 7, 9, 10, 0], Cm = [0, 2, 3, 5, 7, 8, 10], F = [5, 7, 9, 10, 0, 2, 4], Gm = [7, 9, 10, 0, 2, 3, 5], Bb = [10, 0, 2, 3, 5, 7, 9], Eb = [3, 5, 7, 8, 10, 0, 2];

// D minor ballad changes (calm, elegy)
const BALLAD = [[ch(38, [53, 57, 60, 64])], [ch(34, [57, 60, 62, 65])], [ch(40, [55, 58, 62, 64])], [ch(45, [55, 61, 65, 70])],
  [ch(38, [53, 57, 60, 64])], [ch(43, [53, 57, 58, 62])], [ch(40, [55, 58, 62, 64]), ch(45, [55, 61, 65, 70])], [ch(38, [53, 59, 62, 64])]];
// F major turnaround (hope, finale)
const TURN = [[ch(41, [48, 57, 64, 67])], [ch(38, [53, 60, 64, 69])], [ch(43, [53, 58, 62, 69])], [ch(36, [52, 58, 62, 69])]];
// C minor over a pedal (tense, lasttrain)
const TENSE = [[ch(36, [55, 60, 63, 74])], [ch(36, [56, 60, 63, 72])], [ch(36, [56, 60, 65, 68])], [ch(35, [55, 59, 62, 65])]];
const OST = [36, 36, 43, 36, 39, 36, 42, 43, 36, 36, 43, 36, 39, 41, 42, 43];
// G minor (title)
const TITLE = [[ch(43, [53, 57, 58, 62])], [ch(39, [55, 58, 62, 65])], [ch(36, [55, 58, 62, 63])], [ch(38, [54, 57, 60, 63])]];
// rhythm-changes-ish swing in Bb (jukebox, bigband)
const SWING = [[ch(46, [55, 58, 62, 65]), ch(43, [53, 59, 62, 65])], [ch(48, [55, 58, 63, 67]), ch(41, [55, 57, 63, 65])],
  [ch(38, [53, 57, 60, 65]), ch(43, [53, 59, 62, 65])], [ch(48, [55, 58, 63, 67]), ch(41, [55, 57, 63, 65])],
  [ch(46, [56, 58, 62, 65])], [ch(39, [55, 58, 60, 63]), ch(40, [55, 58, 61, 64])], [ch(41, [55, 58, 62, 65]), ch(43, [53, 59, 62, 65])], [ch(48, [55, 58, 63, 67]), ch(41, [55, 57, 63, 65])]];
// Eb major dance-band ballad (radio)
const RADIO = [[ch(39, [55, 58, 62, 67])], [ch(36, [55, 58, 63, 67])], [ch(41, [56, 60, 63, 68])], [ch(34, [56, 58, 62, 65])],
  [ch(39, [55, 58, 62, 67])], [ch(36, [55, 58, 63, 67])], [ch(41, [56, 60, 63, 68])], [ch(34, [56, 59, 62, 65])]];
const RIFF = [[7, .5, .5], [12, 1, .5], [16, 1.5, 1], [12, 2.67, .33], [14, 3, .9]];

export const LOOPS = {
  calm: { bpm: 58, swing: .66, bars: BALLAD, vol: 0.68, verb: .3, parts: [brushes(.8), twoFeel(), comp(rhodes, .85), lead('vibes', 67, 81, Dm, 4, .45, .8)] },
  tense: { bpm: 84, swing: .5, bars: TENSE, vol: 0.72, verb: .25, parts: [ostinato(OST, .8), tremPad(.9), sparseRide(.7)] },
  hope: { bpm: 70, swing: .62, bars: TURN, vol: 0.68, verb: .3, parts: [brushes(.7), walking(.85), comp(rhodes, .9, .45), lead('vibes', 65, 81, F, 4, .4, .75)] },
  dread: { bpm: 48, swing: .5, bars: [[ch(26, [50, 51])]], vol: 0.75, verb: .45, drone: [26, 38, 38.5], parts: [stabs(.9)] },
  title: { bpm: 64, swing: .66, bars: TITLE, vol: 0.75, verb: .3, parts: [brushes(.8), twoFeel(), comp(rhodes, .8), tune('trumpet', motif(55), 8, 2, .9), lead('vibes', 67, 79, Gm, 8, .5, .7)] },
  jukebox: { bpm: 132, swing: .64, bars: SWING, vol: 0.34, verb: .15, lp: 1100, crackle: .6,
    parts: [swingKit(1.6), walking(.9), charleston(piano, .55), riff('sax', RIFF, 60, .9)] },
  radio: { bpm: 76, swing: .6, bars: RADIO, vol: 0.16, verb: .1, radio: true, crackle: .35,
    parts: [brushes(.7), twoFeel(.9), comp(piano, .8, .4), lead('clarinet', 63, 79, Eb, 2, .8, .9)] },
  bigband: { bpm: 138, swing: .64, bars: SWING, vol: 0.42, verb: .7, lp: 2300, echo: [.27, .38],
    parts: [swingKit(.7), walking(.9), shout(.9), riff('sax', RIFF, 60, .8, .6)] },
  // ending themes
  finale: { bpm: 66, swing: .62, bars: TURN, vol: 0.72, verb: .35, parts: [brushes(.6), walking(.8), comp(rhodes, .85, .35), pad(.5, 2), tune('trumpet', motif(60, false), 4, 1, .9)] },
  elegy: { bpm: 52, swing: .5, bars: BALLAD, vol: 0.72, verb: .45, parts: [twoFeel(.7), comp(piano, .7, .15), pad(.6, 2), tune('piano', motif(62), 4, 1, 1.1)] },
  lasttrain: { bpm: 80, swing: .5, bars: TENSE, vol: 0.8, verb: .35, parts: [ostinato(OST, .7), tremPad(.8, 6), tune('trumpet', motif(60), 4, 1, .8)] },
  mirror: { bpm: 54, swing: .5, bars: [[ch(26, [50, 51])], [ch(26, [50, 53])]], vol: 0.77, verb: .6, drone: [26, 38, 38.4], parts: [tune('musicbox', motif(74), 4, 0, 1), stabs(.5)] }
};

// Which loop plays for a mood: an ending theme replaces calm and hope; the bar, the apartment and the station have their own calm.
export const MOODS = ['calm', 'tense', 'hope', 'dread'];
const PLACE = { bar: 'jukebox', apartment: 'radio', station: 'bigband' };
export function pickLoop(mode, place, theme) {
  if (mode === 'off' || !mode) return null;
  if (!MOODS.includes(mode)) return LOOPS[mode] ? mode : null;   // a loop by name (~music jukebox)
  if (theme && (mode === 'calm' || mode === 'hope')) return theme;
  if (mode === 'calm' && PLACE[place]) return PLACE[place];
  return mode;
}

// Starts a loop at time t (fading in), into `dest`. Returns { name, fill(until), stop(at, fade), chordAt(t) }.
export function makeLoop(au, name, dest, t, fade = 2) {
  const L = LOOPS[name], c = au.ctx, beat = 60 / L.bpm, barLen = beat * 4;
  const out = c.createGain(); out.gain.setValueAtTime(0, t); out.gain.linearRampToValueAtTime(L.vol, t + fade);
  // effects, last to first: echo, the radio's tin-can band, a "from another room" lowpass, the reverb send
  let into = out;
  out.connect(dest);
  if (L.echo) {
    const d = c.createDelay(1), fb = c.createGain(), lp = c.createBiquadFilter(), mix = c.createGain();
    d.delayTime.value = L.echo[0]; fb.gain.value = L.echo[1]; lp.type = 'lowpass'; lp.frequency.value = 1800; mix.gain.value = .6;
    const inp = c.createGain(); inp.connect(out); inp.connect(d); d.connect(lp); lp.connect(fb); fb.connect(d); lp.connect(mix); mix.connect(out); into = inp;
  }
  if (L.radio) {
    const hp = c.createBiquadFilter(), lp = c.createBiquadFilter(), pk = c.createBiquadFilter(), sh = c.createWaveShaper();
    hp.type = 'highpass'; hp.frequency.value = 420; lp.type = 'lowpass'; lp.frequency.value = 2600; pk.type = 'peaking'; pk.frequency.value = 1300; pk.gain.value = 6;
    const curve = new Float32Array(256); for (let i = 0; i < 256; i++) { const x = i / 128 - 1; curve[i] = Math.tanh(x * 2.2) / Math.tanh(2.2); } sh.curve = curve;
    const pre = c.createGain(); pre.gain.value = 3; const post = c.createGain(); post.gain.value = .45;
    pre.connect(hp); hp.connect(pk); pk.connect(sh); sh.connect(lp); lp.connect(post); post.connect(into); into = pre;
  }
  if (L.lp) { const a = c.createBiquadFilter(), b = c.createBiquadFilter(); a.type = b.type = 'lowpass'; a.frequency.value = b.frequency.value = L.lp; a.Q.value = b.Q.value = .6; a.connect(b); b.connect(into); into = a; }
  const band = c.createGain(); band.connect(into);
  if (L.verb) { const s = c.createGain(); s.gain.value = L.verb; band.connect(s); s.connect(au.musVerb); }
  // continuous voices: a drone (dread, mirror)
  const held = [];
  if (L.drone) {
    const dg = c.createGain(), lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 220; lp.Q.value = 3; dg.gain.value = .12; lp.connect(dg); dg.connect(band);
    const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = .09; lg.gain.value = 80; l.connect(lg); lg.connect(lp.frequency); held.push(l);
    L.drone.forEach((n, i) => { const o = c.createOscillator(), og = c.createGain(); o.type = i ? 'sawtooth' : 'sine'; o.frequency.value = midi(n); og.gain.value = i ? .25 : 1; o.connect(og); og.connect(lp); held.push(o); });
    held.forEach(o => o.start(t));
  }
  const p = {};
  let bar = 0, k = 0, nextCrackle = t;
  const chordOf = (b, kk) => { const cs = L.bars[b % L.bars.length]; return cs[cs.length > 1 && kk >= 4 ? 1 : 0]; };
  const timeOf = (b, kk) => t + .05 + b * barLen + (Math.floor(kk / 2) + (kk % 2 ? L.swing : 0)) * beat;
  return {
    name,
    fill(until) {
      while (timeOf(bar, k) < until) {
        const tt = timeOf(bar, k);
        if (tt > au.now() - .02) {
          const cs = L.bars[bar % L.bars.length], half = cs.length > 1;
          const chord = chordOf(bar, k), next = half && k < 4 ? cs[1] : chordOf(bar + 1, 0);
          const P = { au, out: band, chord, next, bar, beat, k, half, p };
          for (const part of L.parts) part(P, k, tt);
        }
        if (++k === 8) { k = 0; bar++; }
      }
      // record crackle and surface hiss for the jukebox and the radio
      if (L.crackle) while (nextCrackle < until) {
        if (nextCrackle > au.now() - .02) { const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = au.noise; f.type = 'highpass'; f.frequency.value = R(1500, 4000); env(g, nextCrackle, .0005, R(.02, .09) * L.crackle, .006); s.connect(f); f.connect(g); g.connect(into); s.start(nextCrackle, Math.random()); s.stop(nextCrackle + .02); }
        nextCrackle += R(.03, .35);
      }
    },
    stop(at, f = 2.5) {
      out.gain.cancelScheduledValues(at); out.gain.setValueAtTime(out.gain.value, at); out.gain.linearRampToValueAtTime(0, at + f);
      held.forEach(o => o.stop(at + f + .1));
      setTimeout(() => out.disconnect(), (f + 4) * 1000);
    },
    chordAt(time) { const b = Math.max(0, Math.floor((time - t - .05) / barLen)), kk = Math.floor(((time - t - .05) % barLen) / (beat / 2)); return chordOf(b, Math.max(0, kk)); }
  };
}
