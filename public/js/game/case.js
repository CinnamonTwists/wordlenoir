import { R, pick, cap, nounN, NUMW, fmtTime, pickUnused } from '../core/util.js';
import { NAMES_M, NAMES_F } from '../content/names.js';
import { INTROS } from '../content/scenes/index.js';
import { S, used } from './state.js';

// Case generation and the {vars} every scene script can reference.

// times[0] is the intro (late evening); times[k] is when suspect k is brought in.
export function genTimes() { const t = [[23, 40 + Math.floor(R() * 12)]]; for (let k = 1; k <= 6; k++) t.push([k - 1, k === 1 ? 2 + Math.floor(R() * 10) : 5 + Math.floor(R() * 45)]); return t; }

export function genCase() {
  const intro = pickUnused(INTROS, used.intro, x => x.id);
  const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return { intro, vars: {
    caseNo: String(1000 + Math.floor(R() * 9000)), date: `${pick(MON)} ${1 + Math.floor(R() * 28)}, 194${6 + Math.floor(R() * 4)}`,
    victim: pick(intro.id === 'singer' ? NAMES_F : NAMES_M), singer: pick(NAMES_F), pier: String(9 + Math.floor(R() * 40)), caseTitle: intro.title
  } };
}

export function baseVars() {
  const v = Object.assign({}, S.caseVars);
  S.times.forEach(([h, m], i) => v['time' + i] = fmtTime(h, m));
  return v;
}
export function guessVars(g, guess, fb) {
  const greens = fb.filter(x => x === 2).length, yellows = fb.filter(x => x === 1).length, grays = 5 - greens - yellows, hits = greens + yellows, left = 6 - g;
  const v = baseVars();
  Object.assign(v, {
    guess, GUESS: guess.toUpperCase(), g, left, greens, yellows, grays, hits,
    hitsN: nounN(hits, 'letter', 'letters'), greensN: nounN(greens, 'letter', 'letters'), yellowsN: nounN(yellows, 'letter', 'letters'), graysN: nounN(grays, 'letter', 'letters'),
    leftN: nounN(left, 'guess', 'guesses'), leftW: NUMW[left] || left,
    time: fmtTime(...S.times[g]), nextTime: fmtTime(...S.times[Math.min(g + 1, 6)]), ANSWER: S.answer.toUpperCase()
  });
  ['hitsN', 'greensN', 'yellowsN', 'graysN', 'leftN', 'leftW'].forEach(k => v[cap(k)] = cap(v[k]));
  return v;
}
