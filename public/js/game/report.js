import { $ } from '../core/dom.js';
import { S } from './state.js';

// End-of-case file: verdict, answer, guess table, the mode's record (Random Case stats), and the shareable emoji report.

const COLORS = ['gray', 'yellow', 'green'];
// High-contrast tiles (Settings) swap the share emoji too: orange/blue instead of yellow/green.
const emoji = () => document.documentElement.hasAttribute('data-hc') ? ['⬛', '🟧', '🟦'] : ['⬛', '🟨', '🟩'];

function reportText() {
  const E = emoji(), rows = S.fb.map(r => r.map(v => E[v]).join('')).join('\n');
  const where = S.caseVars.chapterNo ? `Chapter ${S.caseVars.chapterNo}` : `Case No. ${S.caseVars.caseNo}`;
  return `WORDLE NOIR · ${where}${S.hard ? ' · Hard case' : ''}\n${S.title}\n${S.won ? `CASE CLOSED ${S.guesses.length}/6` : 'COLD CASE X/6'}\n\n${rows}`;
}

// stats: { played, won, dist[6], streak, best } or undefined. The bar for this case's guess count is highlighted on a win.
function recordHTML(st) {
  if (!st || !st.played) return '';
  const max = Math.max(1, ...st.dist), pct = Math.round(100 * st.won / st.played);
  const bars = st.dist.map((n, i) => `<div class="bar${S.won && S.guesses.length === i + 1 ? ' now' : ''}"><span>${i + 1}</span><i style="--w:${Math.max(6, 100 * n / max)}%">${n}</i></div>`).join('');
  return `<div class="record"><div class="rh">Your record</div>
    <div class="nums"><div><b>${st.played}</b>cases</div><div><b>${pct}%</b>closed</div><div><b>${st.streak}</b>streak</div><div><b>${st.best}</b>best</div></div>
    <div class="dist" aria-label="Cases closed by number of suspects">${bars}</div></div>`;
}

export function showReport(onNewCase, { onMenu, stats, newLabel } = {}) {
  const f = $('#reportFile');
  const tiles = S.answer.split('').map(c => `<div class="tile" data-s="${S.won ? 'green' : 'gray'}" style="--rot:0deg">${c}</div>`).join('');
  const rows = S.guesses.map((g, i) => `<tr><td><span class="mini">${S.fb[i].map(v => `<i data-s="${COLORS[v]}"></i>`).join('')}</span>${g.toUpperCase()}</td><td>${S.counts[i] === 1 ? '1 word fits' : S.counts[i] + ' words fit'}</td></tr>`).join('');
  f.innerHTML = `<div class="verdict ${S.won ? 'win' : 'lose'}">${S.won ? 'CLOSED' : 'COLD'}</div>
    <h3>${S.title}</h3><div class="meta">${S.caseVars.chapterNo ? `CHAPTER ${S.caseVars.chapterNo} · ` : ''}CASE No. ${S.caseVars.caseNo} ·${S.caseVars.date.toUpperCase()}${S.hard ? ' · HARD CASE' : ''}</div>
    <p>${S.won ? `Word apprehended after ${S.guesses.length} ${S.guesses.length === 1 ? 'suspect' : 'suspects'}.` : 'The word left on the 6:00 train. Its name was:'}</p>
    <div class="ans">${tiles}</div>
    <table aria-label="Suspects questioned">${rows}</table>
    ${recordHTML(stats)}
    <div class="acts"><button class="primary" id="rNew"></button><button id="rCopy">Copy report</button><button id="rMenu">Main menu</button></div>
    <div id="rCopyBox"></div>`;
  $('#rNew').textContent = newLabel || 'Open a new case';
  $('#report').hidden = false;
  $('#rNew').onclick = () => onNewCase();
  $('#rMenu').onclick = () => onMenu?.();
  $('#rCopy').onclick = () => {
    const t = reportText();
    const fallback = () => { const box = $('#rCopyBox'); box.innerHTML = '<textarea readonly></textarea>'; const ta = box.querySelector('textarea'); ta.value = t; ta.focus(); ta.select(); };
    try { navigator.clipboard.writeText(t).then(() => { $('#rCopy').textContent = 'Copied'; }, fallback); } catch (e) { fallback(); }
  };
  $('#rNew').focus();
}
