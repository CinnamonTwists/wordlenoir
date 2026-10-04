import { pick, pickUnused } from '../core/util.js';
import { sleep } from '../core/timing.js';
import { $ } from '../core/dom.js';
import { AU } from '../audio/audio.js';
import { play } from '../cinema/player.js';
import { store } from '../save/store.js';
import { markSeen } from '../save/progress.js';
import { S, setState, used, DEBUG, pack } from './state.js';
import { WORDS } from './words.js';
import { score, candidates, bucketOf } from './scoring.js';
import { board, buildGrid, buildKB, updateKB, renderRow, paintRows, updateStatus, setMemo, toast, shakeRow, revealRow, verdictLine } from './board.js';
import { genTimes, genCase, baseVars, guessVars } from './case.js';
import { informant } from './informant.js';
import { showReport } from './report.js';
import { snapshot, restore } from './snapshot.js';

// The game loop: a case opens with an intro, each guess triggers a scene, a win or the sixth miss ends it.
//
// Saving (roadmap F1): the case is checkpointed into random.active after the intro, the moment a guess is scored (so reloading
// can't take a guess back), when its scenes are chosen (S.pending), and when they finish. Reopening resumes on the board after
// the last checkpoint; scenes that were interrupted count as seen. A finished case clears random.active.

// Plays a scene, then restores the board's background music.
async function playScene(src, ctx) {
  await play(src, ctx);
  AU.setMusic(S.g >= 4 ? 'tense' : 'calm');
}

const checkpoint = () => store.update(d => { d.random.active = snapshot(S); });
const seen = ids => store.update(d => markSeen(d, ids));
const closeCase = () => store.update(d => { d.random.active = null; });

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
  checkpoint();
  const g = S.guesses.length;
  await revealRow(g - 1, fb);
  S.counts.push(candidates(WORDS.answers, S.guesses, S.fb).length);
  updateKB(); setMemo(`${guess.toUpperCase()}: ${verdictLine(fb)}`); await sleep(2200);
  board.classList.remove('interrogate');
  const win = fb.every(x => x === 2), b = bucketOf(fb);
  const ctx = { vars: guessVars(g, guess, fb), flags: S.flags, clue: null };
  if (win || g === 6) {
    S.over = true; S.won = win;
    if (win) { ctx.vars.clockH = S.times[g][0]; ctx.vars.clockM = S.times[g][1]; } else { ctx.vars.clockH = 6; ctx.vars.clockM = 0; }
    const E = win ? pack().win : pack().loss, climax = pick(E.climax), epi = pick(E.epi[win ? g : b]);
    S.pending = [climax.id, epi.id]; checkpoint();
    if (win) AU.riff();
    await playScene(climax.s + epi.s, ctx);
    if (!win) AU.piano([311.13, 293.66, 261.63, 196], .7);
    seen(S.pending); S.pending = []; closeCase();
    updateStatus(); showReport(newCase); return;
  }
  const core = pickUnused(pack().cores[`${g}-${b}`], used.core, x => x.id), inf = informant(g, b, ctx);
  const script = withOpener(core.s) + '\n' + (inf ? inf.s : '') + `\n## {nextTime} | ${pick(pack().closers[6 - g])}`;
  S.g = g; S.pending = inf ? [core.id, inf.id] : [core.id]; checkpoint();
  updateStatus();
  await playScene(script, ctx);
  seen(S.pending); S.pending = []; checkpoint();
  S.busy = false; $('#newBtn').disabled = false;
  setMemo(`Suspect ${g + 1} of 6. ${g === 5 ? 'Last chance before the train.' : 'Type a name. ENTER brings it in.'}`);
}

function setCaseHeader() {
  $('#caseNo').textContent = `CASE No. ${S.caseVars.caseNo}`; $('#caseTitle').textContent = S.title;
}

export async function newCase() {
  $('#report').hidden = true; $('#modal').hidden = true;
  closeCase();
  const cs = genCase();
  setState({ answer: DEBUG.forceAnswer || pick(WORDS.answers), guesses: [], fb: [], counts: [], cur: '', busy: true, over: false, won: false, g: 0, flags: {}, times: genTimes(), caseVars: cs.vars, infUsed: new Set(), infLog: [], lastInf: false, title: cs.intro.title, pending: [] });
  buildGrid(); buildKB(press); updateStatus(); setMemo(''); setCaseHeader();
  $('#newBtn').disabled = true;
  const ctx = { vars: baseVars(), flags: S.flags };
  ctx.vars.time = ctx.vars.time0;
  await playScene(cs.intro.s + '\n' + pack().tail.s, ctx);
  seen([cs.intro.id, pack().tail.id]); checkpoint();
  S.busy = false; $('#newBtn').disabled = false;
  setMemo('Suspect 1 of 6. Type a five-letter name. ENTER brings it in.');
}

// Reopens the saved case (random.active) on the board. Returns false, and drops the save, if there is none or it doesn't hold up.
export function resumeCase() {
  const snap = store.get('random.active');
  if (!snap) return false;
  const s = restore(snap, w => WORDS.allowed.has(w));
  if (!s) { closeCase(); return false; }
  setState(s);
  for (let i = S.counts.length; i < S.guesses.length; i++) S.counts.push(candidates(WORDS.answers, S.guesses.slice(0, i + 1), S.fb.slice(0, i + 1)).length);
  S.g = S.over ? S.g : S.guesses.length;
  $('#report').hidden = true; $('#modal').hidden = true;
  buildGrid(); buildKB(press); paintRows(); updateKB(); updateStatus(); setCaseHeader();
  if (S.pending.length) { seen(S.pending); S.pending = []; }   // interrupted mid-scene: it still counts as seen
  AU.setMusic(S.g >= 4 ? 'tense' : 'calm');
  if (S.over) { closeCase(); S.busy = true; setMemo(''); showReport(newCase); return true; }
  checkpoint();
  $('#newBtn').disabled = false;
  const n = S.guesses.length;
  setMemo(`Case reopened. Suspect ${n + 1} of 6. ${n === 5 ? 'Last chance before the train.' : 'Type a name. ENTER brings it in.'}`);
  return true;
}
