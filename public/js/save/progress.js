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

// ---------- story results → interludes, endings and records (docs/story/bible.md §7–§8) ----------

// When Dash got home is how many guesses the winning attempt took: 1–2 kept, 3–4 late, 5–6 missed. A chapter that needed a retry
// costs one step. Returns { tier: 'kept' | 'late' | 'missed', mark: 2 | 1 | 0 }.
export function interludeTier({ guesses, attempts = 1 }) {
  const mark = Math.max(0, (guesses <= 2 ? 2 : guesses <= 4 ? 1 : 0) - (attempts > 1 ? 1 : 0));
  return { tier: ['missed', 'late', 'kept'][mark], mark };
}
// Which chapters' interludes (and results) feed each personal thread.
export const THREADS = { pop: [1, 5, 8], vera: [2, 6, 8], nora: [3, 7], bottle: [4, 9] };
// Each thread's total marks and tier: best if ≥ ⅔ of the maximum, worst if ≤ ⅓, else middle. Unplayed chapters count 0.
export function threadTiers(results) {
  const byCh = Object.fromEntries(results.map(r => [r.chapter, r])), out = {};
  for (const [name, chs] of Object.entries(THREADS)) {
    const total = chs.reduce((s, ch) => s + (byCh[ch] ? interludeTier(byCh[ch]).mark : 0), 0), max = chs.length * 2;
    out[name] = { total, max, tier: total * 3 >= max * 2 ? 'best' : total * 3 <= max ? 'worst' : 'middle' };
  }
  return out;
}
// The ending for a finished run (D5, D7): the egg if all ten chapters were won on guess 1 of their first attempt, else a band by average.
export function endingFor(results) {
  if (results.length === 10 && results.every(r => r.guesses === 1 && r.attempts === 1)) return 'egg';
  const avg = results.reduce((s, r) => s + r.guesses, 0) / Math.max(1, results.length);
  return avg < 2.5 ? 'A' : avg < 3.5 ? 'B' : avg < 4.5 ? 'C' : avg < 5.5 ? 'D' : 'bad';
}
// Records that outlive any run (D2): chapters reached, best guesses, and the dossier. Campaign and replay results both feed them.
export function noteChapterStart(doc, chapter) { doc.story.reached = Math.max(doc.story.reached, chapter); return doc; }
export function noteChapterResult(doc, { chapter, won, guesses }, now = Date.now()) {
  const prev = doc.dossier[chapter];
  if (won) {
    doc.dossier[chapter] = { status: 'apprehended', guesses: Math.min(guesses, prev?.guesses ?? 7), at: prev?.status === 'apprehended' ? prev.at : now };
    doc.story.best[chapter] = Math.min(guesses, doc.story.best[chapter] ?? 7);
  } else if (prev?.status !== 'apprehended') doc.dossier[chapter] = { status: 'escaped', at: now };
  return doc;
}
// A finished campaign: the ending is unlocked and the run's total may be the fastest yet.
export function noteRunFinished(doc, ending, results, now = Date.now()) {
  doc.story.endings[ending] ??= now;
  const total = results.reduce((s, r) => s + r.guesses, 0);
  if (doc.story.fastest === null || total < doc.story.fastest) doc.story.fastest = total;
  return doc;
}
// The vars an ending's scripts read (content/endings/index.js, checked by tools/check-scenes.mjs): how chapter 8's interlude went for Pop
// (kept: he confessed; late: he got halfway; missed: the sealed letter), whether Vera's thread ended worst, whether this is the bad ending,
// and the run's total guesses. Flags are 1 or 0.
export function endingVars(ending, results) {
  const r8 = results.find(r => r.chapter === 8), pop = r8 ? interludeTier(r8).tier : 'missed', b = x => (x ? 1 : 0);
  return { popTold: b(pop === 'kept'), popHalf: b(pop === 'late'), popLetter: b(pop === 'missed'), veraWorst: b(threadTiers(results).vera.tier === 'worst'),
    endBad: b(ending === 'bad'), total: String(results.reduce((s, r) => s + r.guesses, 0)) };
}
