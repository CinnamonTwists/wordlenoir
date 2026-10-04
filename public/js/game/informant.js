import { R, pick, nounN, ORD } from '../core/util.js';
import { CAST } from '../content/cast.js';
import { INFORMANTS } from '../content/scenes/index.js';
import { S, DEBUG } from './state.js';
import { WORDS } from './words.js';
import { stats } from './scoring.js';

// Maybe returns an informant scene for this round (or ''), filling the clue vars it quotes into ctx.
export function informant(g, b, ctx) {
  if (DEBUG.forceInf === false) return '';
  let p = [0, .22, .35, .45, .5, .6][g] + (b === 0 ? .15 : 0); if (S.lastInf && g < 5) p *= .4;
  if (!DEBUG.forceInf && R() > p) { S.lastInf = false; return ''; }
  const st = stats(WORDS.answers, S.guesses, S.fb); if (st.n < 1) return '';
  const types = ['n', 'dbl']; if (st.top) types.push('top'); if (st.pos) types.push('pos');
  const pool = INFORMANTS.filter(i => types.includes(i.type) && !S.infUsed.has(i.id)); if (!pool.length) return '';
  const inf = pick(pool); S.infUsed.add(inf.id); S.lastInf = true;
  const v = ctx.vars;
  Object.assign(v, { n: st.n, nN: nounN(st.n, 'word', 'words'), NWORDS: `${st.n} ${st.n === 1 ? 'WORD' : 'WORDS'}`, FIT: st.n === 1 ? 'FITS' : 'FIT', dblPct: st.dblPct });
  if (st.top) Object.assign(v, { topL: st.top.L, topPct: st.top.pct });
  if (st.pos) Object.assign(v, { posL: st.pos.L, posPct: st.pos.pct, posOrd: ORD[st.pos.i], POSORD: ORD[st.pos.i].toUpperCase(), posArt: 'AEFHILMNORSX'.includes(st.pos.L) ? 'an' : 'a' });
  const nm = inf.who ? CAST[inf.who].name : 'ANONYMOUS';
  ctx.clue = inf.type === 'n' ? { label: `${nm} · WORDS THAT STILL FIT YOUR EVIDENCE`, big: String(st.n), sub: st.n === 1 ? 'ONE NAME LEFT IN THE CITY' : `OUT OF ${WORDS.answers.length} ON FILE` }
    : inf.type === 'top' ? { label: `${nm} · LETTER ODDS`, big: st.top.L, sub: `${st.top.pct}% CHANCE IT'S IN THE WORD` }
    : inf.type === 'pos' ? { label: `${nm} · ${ORD[st.pos.i].toUpperCase()} LETTER`, big: `${st.pos.L}`, sub: `${st.pos.pct}% CHANCE IN SPOT ${st.pos.i + 1}` }
    : { label: `${nm} · REPEATED LETTERS`, big: `${st.dblPct}%`, sub: 'CHANCE A LETTER SHOWS UP TWICE' };
  S.infLog.push(inf.id);
  return inf.s;
}
