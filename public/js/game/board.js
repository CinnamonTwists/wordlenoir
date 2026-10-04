import { R, cap, nounN, fmtTime } from '../core/util.js';
import { sleep } from '../core/timing.js';
import { $ } from '../core/dom.js';
import { AU } from '../audio/audio.js';
import { cigarette } from '../art/icons.js';
import { S } from './state.js';

// The detective's desk: guess grid, keyboard, clock, cigarettes (guesses left), memo line, toast.

export const grid = $('#grid'), kb = $('#kb'), memo = $('#memo'), board = $('#board');

export function buildGrid() {
  grid.innerHTML = '';
  for (let r = 0; r < 6; r++) { const row = document.createElement('div'); row.className = 'row'; for (let i = 0; i < 5; i++) { const t = document.createElement('div'); t.className = 'tile'; t.style.setProperty('--rot', ((R() - .5) * 2.4).toFixed(2) + 'deg'); row.appendChild(t); } grid.appendChild(row); }
}
const KEYROWS = ['qwertyuiop', 'asdfghjkl', '+zxcvbnm-'];
export function buildKB(onKey) {
  kb.innerHTML = '';
  for (const r of KEYROWS) { const row = document.createElement('div'); row.className = 'krow'; for (const k of r) { const b = document.createElement('button'); b.className = 'key' + (k === '+' || k === '-' ? ' wide' : ''); b.dataset.k = k; b.textContent = k === '+' ? 'ENTER' : k === '-' ? '⌫' : k; if (k === '-') b.setAttribute('aria-label', 'Delete'); b.addEventListener('click', () => onKey(k === '+' ? 'Enter' : k === '-' ? 'Backspace' : k)); row.appendChild(b); } kb.appendChild(row); }
}
export function updateKB() {
  const best = {};
  S.guesses.forEach((g, gi) => S.fb[gi].forEach((v, i) => { best[g[i]] = Math.max(best[g[i]] ?? -1, v); }));
  kb.querySelectorAll('.key').forEach(b => { const v = best[b.dataset.k]; if (v != null) b.dataset.s = ['gray', 'yellow', 'green'][v]; else delete b.dataset.s; });
}
// Fills in every submitted row without animation (used when a saved case is reopened).
export function paintRows() {
  S.guesses.forEach((w, r) => [...grid.children[r].children].forEach((t, i) => { t.textContent = w[i]; t.dataset.s = ['gray', 'yellow', 'green'][S.fb[r][i]]; }));
}
export function renderRow() { const row = grid.children[S.guesses.length]; if (!row) return; [...row.children].forEach((t, i) => { const ch = S.cur[i] || ''; if (t.textContent !== ch) { t.textContent = ch; t.classList.toggle('filled', !!ch); if (ch) { t.classList.remove('pop'); void t.offsetWidth; t.classList.add('pop'); } } }); }
export function updateStatus() {
  const g = S.guesses.length, nt = S.times[Math.min(g + 1, 6)];
  const [hh, mm] = S.over ? (S.won ? S.times[g] : [6, 0]) : nt; const s = fmtTime(hh, mm).split(' ');
  $('#clk').textContent = s[0]; $('#ampm').textContent = s[1];
  $('#smokes').innerHTML = Array.from({ length: 6 }, (_, i) => cigarette(i < g ? 'burnt' : i === g && !S.over ? 'lit' : 'fresh')).join('');
  document.body.className = 'stakes-' + (g + 1);
}
export function setMemo(t) { memo.textContent = t; }
let toastT;
export function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2200); }
export function shakeRow() { const row = grid.children[S.guesses.length]; if (!row) return; row.classList.remove('shake'); void row.offsetWidth; row.classList.add('shake'); AU.play('thud'); }

// The interrogation: dims the other rows and flips one tile at a time.
export async function revealRow(r, fb) {
  const row = grid.children[r];
  board.classList.add('interrogate'); [...grid.children].forEach((x, i) => x.classList.toggle('focus', i === r));
  setMemo('Under the lamp...'); AU.play('heart'); await sleep(1100);
  for (let i = 0; i < 5; i++) {
    if (i === 4) { setMemo('One letter left to talk...'); AU.play('heart'); await sleep(1300); }
    const t = row.children[i]; t.classList.add('flip'); await sleep(320); t.dataset.s = ['gray', 'yellow', 'green'][fb[i]]; t.classList.remove('filled'); AU.play('flip', fb[i]); await sleep(560);
  }
  await sleep(500);
}
export function verdictLine(fb) {
  const g = fb.filter(x => x === 2).length, y = fb.filter(x => x === 1).length, a = 5 - g - y;
  if (g === 5) return 'Every letter in place.';
  const parts = []; if (g) parts.push(`${cap(nounN(g, 'letter', 'letters'))} in the right place`); if (y) parts.push(`${nounN(y, 'letter', 'letters')} in the gang`); if (a) parts.push(`${nounN(a, 'alibi', 'alibis')}`);
  return parts.join(', ') + '.';
}
