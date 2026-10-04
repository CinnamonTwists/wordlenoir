import { ORD } from '../core/util.js';
import { sleep } from '../core/timing.js';
import { $ } from '../core/dom.js';
import { AU } from '../audio/audio.js';
import { play } from '../cinema/player.js';
import { store } from '../save/store.js';
import { S, setState, mode } from './state.js';
import { WORDS } from './words.js';
import { score, candidates, bucketOf, hardModeMiss } from './scoring.js';
import { board, buildGrid, buildKB, updateKB, renderRow, paintRows, updateStatus, setMemo, toast, shakeRow, revealRow, verdictLine } from './board.js';
import { genTimes, baseVars, guessVars } from './case.js';
import { showReport } from './report.js';
import { snapshot, restore } from './snapshot.js';

// The session runner: a case opens with an intro, each guess triggers a scene, a win or the sixth miss ends it.
// Everything mode-specific (answer, scene picks, where it's saved, what a result updates) comes from the active mode
// (state.js `mode`, e.g. modes/random.js), so story chapters can reuse the board, reveal and report.
//
// Saving (roadmap F1): the case is checkpointed after the intro, the moment a guess is scored (so reloading can't take a guess
// back), when its scenes are chosen (S.pending), and when they finish. Reopening resumes on the board after the last
// checkpoint; scenes that were interrupted count as seen. The result is recorded once, when the final guess is scored.

// Set by main.js: where "Main menu" on the report goes.
export const hooks = { toMenu: () => {} };

// Plays a scene, then restores the board's background music.
async function playScene(src, ctx) {
  await play(src, ctx);
  AU.setMusic(S.g >= 4 ? 'tense' : 'calm');
}

const checkpoint = () => mode.onCheckpoint(snapshot(S, mode.id));
function record() { if (S.recorded) return; S.recorded = true; mode.onComplete({ won: S.won, guesses: S.guesses.length }); }
const report = () => showReport(newCase, { onMenu: () => hooks.toMenu(), stats: mode.stats?.() });

export function press(k) {
  if (S.busy || S.over || !$('#pause').hidden || !$('#modal').hidden) return;
  if (k === 'Enter') return submit();
  if (k === 'Backspace') { if (S.cur.length) { S.cur = S.cur.slice(0, -1); renderRow(); AU.key(); } return; }
  if (/^[a-z]$/i.test(k) && S.cur.length < 5) { S.cur += k.toLowerCase(); renderRow(); AU.key(); }
}
export function attachKeyboard() {
  addEventListener('keydown', e => { if (e.metaKey || e.ctrlKey || e.altKey) return; if (board.hidden) return; if (e.key === 'Enter' || e.key === 'Backspace' || /^[a-zA-Z]$/.test(e.key)) { e.preventDefault(); press(e.key); } });
}

async function submit() {
  if (S.cur.length < 5) { shakeRow(); toast('Five letters, Lexington. Count them.'); return; }
  if (!WORDS.allowed.has(S.cur)) { shakeRow(); toast(`No record of ${S.cur.toUpperCase()} in this city.`); return; }
  const miss = S.hard && hardModeMiss(S.cur, S.guesses, S.fb);
  if (miss) { shakeRow(); toast(miss.kind === 'green' ? `Hard case. The ${ORD[miss.i]} letter stays ${miss.L.toUpperCase()}.` : `Hard case. ${miss.L.toUpperCase()} is in the gang. Bring it in.`); return; }
  S.busy = true; $('#menuBtn').disabled = true;
  const guess = S.cur, fb = score(guess, S.answer); S.cur = ''; S.guesses.push(guess); S.fb.push(fb);
  const g = S.guesses.length, win = fb.every(x => x === 2);
  if (win || g === 6) { S.over = true; S.won = win; record(); }
  checkpoint();
  await revealRow(g - 1, fb);
  S.counts.push(candidates(WORDS.answers, S.guesses, S.fb).length);
  updateKB(); setMemo(`${guess.toUpperCase()}: ${verdictLine(fb)}`); await sleep(2200);
  board.classList.remove('interrogate');
  const b = bucketOf(fb);
  const ctx = { vars: guessVars(g, guess, fb), flags: S.flags, clue: null };
  if (S.over) {
    if (win) { ctx.vars.clockH = S.times[g][0]; ctx.vars.clockM = S.times[g][1]; } else { ctx.vars.clockH = 6; ctx.vars.clockM = 0; }
    const sc = mode.endScript(win, g, b, ctx);
    S.pending = sc.ids; checkpoint();
    if (win) AU.riff();
    await playScene(sc.src, ctx);
    if (!win) AU.piano([311.13, 293.66, 261.63, 196], .7);
    mode.seen(S.pending); S.pending = []; mode.clear();
    updateStatus(); report(); return;
  }
  const sc = mode.roundScript(g, b, ctx);
  S.g = g; S.pending = sc.ids; checkpoint();
  updateStatus();
  await playScene(sc.src, ctx);
  mode.seen(S.pending); S.pending = []; checkpoint();
  S.busy = false; $('#menuBtn').disabled = false;
  setMemo(`Suspect ${g + 1} of 6. ${g === 5 ? 'Last chance before the train.' : 'Type a name. ENTER brings it in.'}`);
}

function setCaseHeader() {
  $('#caseNo').textContent = `CASE No. ${S.caseVars.caseNo}${S.hard ? ' · HARD CASE' : ''}`; $('#caseTitle').textContent = S.title;
}

export async function newCase() {
  $('#report').hidden = true; $('#modal').hidden = true; $('#pause').hidden = true;
  mode.clear();
  const cs = mode.newCase();
  setState({ answer: mode.pickAnswer(), guesses: [], fb: [], counts: [], cur: '', busy: true, over: false, won: false, g: 0, flags: {}, times: genTimes(),
    caseVars: cs.vars, infUsed: new Set(), infLog: [], lastInf: false, title: cs.intro.title, pending: [], recorded: false, hard: !!store.get('settings.hardMode') });
  buildGrid(); buildKB(press); updateStatus(); setMemo(''); setCaseHeader();
  $('#menuBtn').disabled = true;
  const ctx = { vars: baseVars(), flags: S.flags };
  ctx.vars.time = ctx.vars.time0;
  const sc = mode.introScript(cs);
  await playScene(sc.src, ctx);
  mode.seen(sc.ids); checkpoint();
  S.busy = false; $('#menuBtn').disabled = false;
  setMemo(S.hard ? 'Suspect 1 of 6. Hard case: every clue you get must be used.' : 'Suspect 1 of 6. Type a five-letter name. ENTER brings it in.');
}

// Reopens the mode's saved case on the board. Returns false, and drops the save, if there is none or it doesn't hold up.
export function resumeCase() {
  const snap = mode.saved();
  if (!snap) return false;
  const s = restore(snap, w => WORDS.allowed.has(w));
  if (!s) { mode.clear(); return false; }
  setState(s);
  for (let i = S.counts.length; i < S.guesses.length; i++) S.counts.push(candidates(WORDS.answers, S.guesses.slice(0, i + 1), S.fb.slice(0, i + 1)).length);
  S.g = S.over ? S.g : S.guesses.length;
  $('#report').hidden = true; $('#modal').hidden = true; $('#pause').hidden = true;
  buildGrid(); buildKB(press); paintRows(); updateKB(); updateStatus(); setCaseHeader();
  if (S.pending.length) { mode.seen(S.pending); S.pending = []; }   // interrupted mid-scene: it still counts as seen
  AU.setMusic(S.g >= 4 ? 'tense' : 'calm');
  if (S.over) { record(); mode.clear(); S.busy = true; setMemo(''); report(); return true; }
  checkpoint();
  $('#menuBtn').disabled = false;
  const n = S.guesses.length;
  setMemo(`Case reopened. Suspect ${n + 1} of 6. ${n === 5 ? 'Last chance before the train.' : 'Type a name. ENTER brings it in.'}`);
  return true;
}

// Abandons the mode's saved case (Random Case from the menu while one is open). Once a suspect has been questioned it counts as a
// lost case, since the answer is revealed; a case dropped before any guess just goes back in the drawer. Returns the answer if revealed.
export function dropSaved() {
  const snap = mode.saved(); if (!snap) return null;
  const s = restore(snap); mode.clear();
  if (!s || !s.guesses.length) return null;
  if (!s.recorded) mode.onComplete({ won: s.over && s.won, guesses: s.guesses.length });
  return s.answer;
}

// A short description of the saved case for the menu's Continue button, or null.
export function savedSummary() {
  const s = restore(mode.saved() || null);
  return s ? { caseNo: s.caseVars.caseNo, title: s.title, suspect: s.guesses.length + 1, over: s.over, hard: s.hard } : null;
}
