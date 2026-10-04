import { $ } from '../core/dom.js';
import { S } from './state.js';

// End-of-case file: verdict, answer, guess table, and the shareable emoji report.

function reportText() {
  const rows = S.fb.map(r => r.map(v => ['⬛', '🟨', '🟩'][v]).join('')).join('\n');
  return `WORDLE NOIR · Case No. ${S.caseVars.caseNo}\n${S.title}\n${S.won ? `CASE CLOSED ${S.guesses.length}/6` : 'COLD CASE X/6'}\n\n${rows}`;
}
export function showReport(onNewCase) {
  const f = $('#reportFile');
  const tiles = S.answer.split('').map(c => `<div class="tile" data-s="${S.won ? 'green' : 'gray'}" style="--rot:0deg">${c}</div>`).join('');
  const rows = S.guesses.map((g, i) => `<tr><td><span class="mini">${S.fb[i].map(v => `<i style="background:${['#3a3940', '#c49a2c', '#4e8a55'][v]}"></i>`).join('')}</span>${g.toUpperCase()}</td><td>${S.counts[i] === 1 ? '1 word fits' : S.counts[i] + ' words fit'}</td></tr>`).join('');
  f.innerHTML = `<div class="verdict ${S.won ? 'win' : 'lose'}">${S.won ? 'CLOSED' : 'COLD'}</div>
    <h3>${S.title}</h3><div class="meta">CASE No. ${S.caseVars.caseNo} · ${S.caseVars.date.toUpperCase()}</div>
    <p>${S.won ? `Word apprehended after ${S.guesses.length} ${S.guesses.length === 1 ? 'suspect' : 'suspects'}.` : 'The word left on the 6:00 train. Its name was:'}</p>
    <div class="ans">${tiles}</div>
    <table aria-label="Suspects questioned">${rows}</table>
    <div class="acts"><button class="primary" id="rNew">Open a new case</button><button id="rCopy">Copy report</button></div>
    <div id="rCopyBox"></div>`;
  $('#report').hidden = false;
  $('#rNew').onclick = () => onNewCase();
  $('#rCopy').onclick = () => {
    const t = reportText();
    const fallback = () => { const box = $('#rCopyBox'); box.innerHTML = '<textarea readonly></textarea>'; const ta = box.querySelector('textarea'); ta.value = t; ta.focus(); ta.select(); };
    try { navigator.clipboard.writeText(t).then(() => { $('#rCopy').textContent = 'Copied'; }, fallback); } catch (e) { fallback(); }
  };
}
