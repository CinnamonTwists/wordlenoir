// Case state ⇄ save data (roadmap F1). A snapshot is `S` minus the transient fields (busy, cur), with Sets as arrays and the
// answer obfuscated (D6). DOM-free.
import { hide, reveal } from '../save/codec.js';
import { score } from './scoring.js';

const KEEP = ['guesses', 'counts', 'over', 'won', 'g', 'flags', 'times', 'caseVars', 'infLog', 'lastInf', 'title', 'pending', 'recorded', 'hard'];

export function snapshot(S, mode = 'random') {
  const snap = { mode, answer: hide(S.answer), infUsed: [...S.infUsed], savedAt: Date.now() };
  for (const k of KEEP) snap[k] = structuredClone(S[k]);
  return snap;
}

// Rebuilds `S` from a snapshot, or returns null if it doesn't hold together (unknown or tampered answer, bad guesses).
// Feedback is recomputed from the answer rather than trusted. isWord(w) checks guesses against the dictionary.
export function restore(snap, isWord = () => true) {
  try {
    const answer = reveal(snap?.answer);
    if (!answer || !/^[a-z]{5}$/.test(answer)) return null;
    const guesses = snap.guesses;
    if (!Array.isArray(guesses) || guesses.length > 6 || !guesses.every(w => typeof w === 'string' && /^[a-z]{5}$/.test(w) && isWord(w))) return null;
    const fb = guesses.map(w => score(w, answer)), solvedAt = guesses.findIndex(w => w === answer);
    if (solvedAt >= 0 && solvedAt !== guesses.length - 1) return null;
    const won = solvedAt >= 0, over = won || guesses.length === 6;
    if (!Array.isArray(snap.times) || snap.times.length !== 7 || typeof snap.caseVars !== 'object') return null;
    return {
      answer, guesses: [...guesses], fb, counts: Array.isArray(snap.counts) ? snap.counts.slice(0, guesses.length) : [],
      cur: '', busy: false, over, won, g: Number.isInteger(snap.g) ? snap.g : 0, flags: snap.flags || {}, times: snap.times,
      caseVars: snap.caseVars, infUsed: new Set(snap.infUsed || []), infLog: snap.infLog || [], lastInf: !!snap.lastInf,
      title: snap.title || '', pending: Array.isArray(snap.pending) ? snap.pending : [], recorded: !!snap.recorded, hard: !!snap.hard
    };
  } catch { return null; }
}
