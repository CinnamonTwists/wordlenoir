// Progress rules on the save document (roadmap F1, decisions D1/D7). Pure functions: each takes the doc and mutates it, so call them
// inside store.update(d => ...). DOM-free and unit-tested (tests/save.test.mjs).
//
// Seen marks: Random Case commits them as soon as a scene completes. A story chapter runs as an *attempt*: its marks wait in
// attempt.pendingSeen and only count once the chapter is won. A loss throws the attempt away (D1).
import { hide } from './codec.js';

const uniq = a => [...new Set(a)];

// Marks scenes as watched. During a story attempt they're staged; otherwise they're committed.
export function markSeen(doc, ids, { story = false } = {}) {
  const list = [].concat(ids).filter(Boolean);
  const a = doc.campaign?.attempt;
  if (story && a) a.pendingSeen = uniq([...a.pendingSeen, ...list]);
  else for (const id of list) doc.seen[id] = 1;
  return doc;
}
export const isSeen = (doc, id) => !!doc.seen[id];

// ---------- Random Case record (roadmap T5) ----------

// One finished (or dropped) case: a win adds to the guess distribution and the streak; anything else ends the streak.
export function recordRandom(doc, { won, guesses }) {
  const st = doc.random.stats;
  st.played++;
  if (won) { st.won++; st.dist[Math.min(Math.max(guesses, 1), 6) - 1]++; st.streak++; st.best = Math.max(st.best, st.streak); }
  else st.streak = 0;
  return doc;
}

// ---------- campaign (wired into gameplay by the story mode, roadmap T6) ----------

export function newCampaign(doc, now = Date.now()) {
  doc.campaign = { runId: `${now.toString(36)}${Math.random().toString(36).slice(2, 6)}`, startedAt: now, chapter: 1,
    results: [], storyFlags: {}, attempt: null, usedScenes: {} };
  return doc;
}
// Starts (or restarts) an attempt at the current chapter. `n` counts attempts at this chapter in this run.
export function beginAttempt(doc, n = 1) {
  const c = doc.campaign;
  c.attempt = { chapter: c.chapter, n, startFlags: structuredClone(c.storyFlags), pendingSeen: [], active: null };
  return doc;
}
// The chapter is won: staged seen marks count, the result is recorded (answer obfuscated, D6), and the story moves on.
// Only the winning attempt's guesses feed the ending average; `attempts` is a stat (D7).
export function winAttempt(doc, { guesses, answer }, now = Date.now()) {
  const c = doc.campaign, a = c.attempt;
  for (const id of a.pendingSeen) doc.seen[id] = 1;
  c.results = c.results.filter(r => r.chapter !== a.chapter);
  c.results.push({ chapter: a.chapter, guesses, attempts: a.n, answer: hide(answer), at: now });
  c.chapter = a.chapter + 1;   // 11 = all ten chapters done
  c.attempt = null;
  return doc;
}
// The culprit escaped: story flags roll back, the attempt's scenes go to usedScenes so the retry plays different ones, and
// nothing it showed counts as watched. The player restarts the same chapter as attempt n+1.
export function loseAttempt(doc) {
  const c = doc.campaign, a = c.attempt;
  c.storyFlags = structuredClone(a.startFlags);
  c.usedScenes[a.chapter] = uniq([...(c.usedScenes[a.chapter] || []), ...a.pendingSeen]);
  return beginAttempt(doc, a.n + 1);
}
// Scene ids the retry picker should avoid for a chapter (reused only once a slot's pool runs out).
export const avoidFor = (doc, chapter) => new Set(doc.campaign?.usedScenes?.[chapter] || []);
