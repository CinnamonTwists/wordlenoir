import { pick, pickUnused } from '../core/util.js';
import { sleep } from '../core/timing.js';
import { $ } from '../core/dom.js';
import { AU } from '../audio/audio.js';
import { play } from '../cinema/player.js';
import { S, setState, used, DEBUG, pack } from './state.js';
import { WORDS } from './words.js';
import { score, candidates, bucketOf } from './scoring.js';
import { board, buildGrid, buildKB, updateKB, renderRow, updateStatus, setMemo, toast, shakeRow, revealRow, verdictLine } from './board.js';
import { genTimes, genCase, baseVars, guessVars } from './case.js';
import { informant } from './informant.js';
import { showReport } from './report.js';

// The game loop: a case opens with an intro, each guess triggers a scene, a win or the sixth miss ends it.

// Plays a scene, then restores the board's background music.
async function playScene(src, ctx) {
  await play(src, ctx);
  AU.setMusic(S.g >= 4 ? 'tense' : 'calm');
}

export function press(k) {
  if (S.busy || S.over || !$('#modal').hidden) return;
  if (k === 'Enter') return submit();
  if (k === 'Backspace') { if (S.cur.length) { S.cur = S.cur.slice(0, -1); renderRow(); AU.key(); } return; }
  if (/^[a-z]$/i.test(k) && S.cur.length < 5) { S.cur += k.toLowerCase(); renderRow(); AU.key(); }
}
export function attachKeyboard() {
  addEventListener('keydown', e => { if (e.metaKey || e.ctrlKey || e.altKey) return; if (board.hidden) return; if (e.key === 'Enter' || e.key === 'Backspace' || /^[a-zA-Z]$/.test(e.key)) { e.preventDefault(); press(e.key); } });
}

function withOpener(core) {
  return core.replace(/^@set (\w+)\s*$/m, (m, name) => { const o = pack().openers[name]; return o ? `${m}\n${pick(o)}` : m; });
}

async function submit() {
  if (S.cur.length < 5) { shakeRow(); toast('Five letters, Lexington. Count them.'); return; }
  if (!WORDS.allowed.has(S.cur)) { shakeRow(); toast(`No record of ${S.cur.toUpperCase()} in this city.`); return; }
  S.busy = true; $('#newBtn').disabled = true;
  const guess = S.cur, fb = score(guess, S.answer); S.cur = ''; S.guesses.push(guess); S.fb.push(fb);
  const g = S.guesses.length;
  await revealRow(g - 1, fb);
  S.counts.push(candidates(WORDS.answers, S.guesses, S.fb).length);
  updateKB(); setMemo(`${guess.toUpperCase()}: ${verdictLine(fb)}`); await sleep(2200);
  board.classList.remove('interrogate');
  const win = fb.every(x => x === 2), b = bucketOf(fb);
  const ctx = { vars: guessVars(g, guess, fb), flags: S.flags, clue: null };
  if (win) {
    S.over = true; S.won = true; ctx.vars.clockH = S.times[g][0]; ctx.vars.clockM = S.times[g][1];
    const W = pack().win; AU.riff(); await playScene(pick(W.climax).s + pick(W.epi[g]).s, ctx); updateStatus(); showReport(newCase); return;
  }
  if (g === 6) {
    S.over = true; S.won = false; ctx.vars.clockH = 6; ctx.vars.clockM = 0;
    const L = pack().loss; await playScene(pick(L.climax).s + pick(L.epi[b]).s, ctx); AU.piano([311.13, 293.66, 261.63, 196], .7); updateStatus(); showReport(newCase); return;
  }
  const core = pickUnused(pack().cores[`${g}-${b}`], used.core, x => x.id);
  let script = withOpener(core.s);
  script += '\n' + informant(g, b, ctx);
  script += `\n## {nextTime} | ${pick(pack().closers[6 - g])}`;
  S.g = g; updateStatus();
  await playScene(script, ctx);
  S.busy = false; $('#newBtn').disabled = false;
  setMemo(`Suspect ${g + 1} of 6. ${g === 5 ? 'Last chance before the train.' : 'Type a name. ENTER brings it in.'}`);
}

export async function newCase() {
  $('#report').hidden = true; $('#modal').hidden = true;
  const cs = genCase();
  setState({ answer: DEBUG.forceAnswer || pick(WORDS.answers), guesses: [], fb: [], counts: [], cur: '', busy: true, over: false, won: false, g: 0, flags: {}, times: genTimes(), caseVars: cs.vars, infUsed: new Set(), infLog: [], lastInf: false, title: cs.intro.title });
  buildGrid(); buildKB(press); updateStatus(); setMemo('');
  $('#caseNo').textContent = `CASE No. ${cs.vars.caseNo}`; $('#caseTitle').textContent = cs.intro.title;
  $('#newBtn').disabled = true;
  const ctx = { vars: baseVars(), flags: S.flags };
  ctx.vars.time = ctx.vars.time0;
  await playScene(cs.intro.s + '\n' + pack().tail.s, ctx);
  S.busy = false; $('#newBtn').disabled = false;
  setMemo('Suspect 1 of 6. Type a five-letter name. ENTER brings it in.');
}
