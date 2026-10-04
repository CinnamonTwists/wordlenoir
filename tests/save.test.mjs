// Unit tests for the save system (roadmap F1): `npm test`. Zero dependencies (node:test).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hide, reveal } from '../public/js/save/codec.js';
import { VERSION, defaults, migrate } from '../public/js/save/schema.js';
import { createStore, KEY } from '../public/js/save/store.js';
import { markSeen, isSeen, newCampaign, beginAttempt, winAttempt, loseAttempt, avoidFor } from '../public/js/save/progress.js';
import { snapshot, restore } from '../public/js/game/snapshot.js';

// A localStorage stand-in. `fail` makes chosen methods throw, like private mode or a full disk.
class FakeStorage {
  constructor(init = {}) { this.m = new Map(Object.entries(init)); this.fail = {}; }
  get length() { return this.m.size; }
  key(i) { return [...this.m.keys()][i] ?? null; }
  getItem(k) { if (this.fail.get) throw new Error('blocked'); return this.m.has(k) ? this.m.get(k) : null; }
  setItem(k, v) { if (this.fail.set) throw new Error('QuotaExceededError'); this.m.set(k, String(v)); }
  removeItem(k) { this.m.delete(k); }
}
const mk = (ls, opts = {}) => createStore({ storage: () => ls, debounceMs: 5, now: () => 1000, ...opts });
const wait = ms => new Promise(r => setTimeout(r, ms));

// ---------- codec (D6) ----------
test('hide/reveal round-trips and hides the word', () => {
  for (const w of ['crane', 'aaaaa', 'zzzzz', 'mummy', 'pizza']) {
    const h = hide(w);
    assert.equal(reveal(h), w);
    assert.ok(!h.includes(w) && !atob(h.slice(3)).includes(w), `${w} readable in ${h}`);
  }
  assert.equal(reveal('crane'), null);
  assert.equal(reveal('n1.%%%'), null);
  assert.equal(reveal(42), null);
});

// ---------- schema ----------
test('migrate fills missing and mistyped fields, keeps the rest', () => {
  const d = migrate({ v: 1, createdAt: 5, settings: { music: 0.3, sfx: 'loud' }, seen: { a: 1 }, random: { stats: { dist: [1, 2] } }, extra: 'kept' });
  assert.equal(d.settings.music, 0.3);
  assert.equal(d.settings.sfx, 1);                       // wrong type → default
  assert.equal(d.settings.textSpeed, 'normal');          // missing → default
  assert.deepEqual(d.seen, { a: 1 });
  assert.deepEqual(d.random.stats.dist, [0, 0, 0, 0, 0, 0]);
  assert.equal(d.random.active, null);
  assert.equal(d.campaign, null);
  assert.equal(d.extra, 'kept');
  assert.equal(d.createdAt, 5);
});
test('migrate refuses newer versions and non-saves', () => {
  assert.throws(() => migrate({ v: VERSION + 1 }), /newer version/);
  for (const bad of [null, [], 'x', {}, { v: 0 }, { v: '1' }]) assert.throws(() => migrate(bad), /not a Wordle Noir save/);
});

// ---------- store ----------
test('fresh load creates and writes a document', () => {
  const ls = new FakeStorage(), s = mk(ls);
  const d = s.load();
  assert.equal(d.v, VERSION);
  assert.equal(JSON.parse(ls.getItem(KEY)).v, VERSION);
  assert.deepEqual(s.status, { persistent: true, reason: null, recovered: null });
});
test('updates are debounced and flushed', async () => {
  const ls = new FakeStorage(), s = mk(ls); s.load();
  s.update(d => { d.seen.x = 1; });
  assert.equal(JSON.parse(ls.getItem(KEY)).seen.x, undefined);   // not yet
  await wait(20);
  assert.equal(JSON.parse(ls.getItem(KEY)).seen.x, 1);
  s.update(d => { d.seen.y = 1; }); s.flush();
  assert.equal(JSON.parse(ls.getItem(KEY)).seen.y, 1);
  assert.equal(s.get('seen.y'), 1);
  assert.equal(s.get('settings.master'), 1);
});
test('reload reads back what was written', () => {
  const ls = new FakeStorage(), a = mk(ls); a.load(); a.update(d => { d.seen.q = 1; }); a.flush();
  const b = mk(ls); assert.equal(b.load().seen.q, 1);
});
test('blocked storage falls back to memory', () => {
  for (const make of [() => { throw new Error('SecurityError'); }, () => undefined, () => { const l = new FakeStorage(); l.fail.get = true; return l; }]) {
    const s = createStore({ storage: make, debounceMs: 5 });
    s.load(); s.update(d => { d.seen.a = 1; }); s.flush();
    assert.equal(s.status.persistent, false); assert.equal(s.status.reason, 'blocked');
    assert.equal(s.get('seen.a'), 1);
  }
});
test('storage that reads but refuses writes is reported as blocked', () => {
  const ls = new FakeStorage(); ls.fail.set = true;
  const s = mk(ls); s.load();
  assert.equal(s.status.reason, 'blocked');
});
test('a failed write reports quota and recovers when writes work again', () => {
  const ls = new FakeStorage(), s = mk(ls), seen = [];
  s.load(); s.onStatus(st => seen.push(st.reason));
  ls.fail.set = true; s.update(d => { d.seen.z = 1; }); s.flush();
  assert.equal(s.status.reason, 'quota'); assert.equal(s.status.persistent, false);
  ls.fail.set = false; s.update(d => { d.seen.w = 1; }); s.flush();
  assert.equal(s.status.persistent, true);
  assert.deepEqual(seen, ['quota', null]);
  assert.equal(JSON.parse(ls.getItem(KEY)).seen.z, 1);
});
test('a corrupt save is backed up, not lost', () => {
  const ls = new FakeStorage({ [KEY]: '{not json' }), s = mk(ls);
  const d = s.load();
  assert.equal(d.v, VERSION);
  assert.equal(ls.getItem(`${KEY}.corrupt.1000`), '{not json');
  assert.equal(s.status.recovered, `${KEY}.corrupt.1000`);
});
test('a save from a newer version is never overwritten', () => {
  const raw = JSON.stringify({ v: VERSION + 1, secret: 'future stuff' });
  const ls = new FakeStorage({ [KEY]: raw }), s = mk(ls);
  s.load(); s.update(d => { d.seen.a = 1; }); s.flush();
  assert.equal(s.status.reason, 'future');
  assert.equal(ls.getItem(KEY), raw);
});
test('reset wipes the save and its backups', () => {
  const ls = new FakeStorage({ [KEY]: '{bad', other: 'keep' }), s = mk(ls);
  s.load(); s.update(d => { d.seen.a = 1; }); s.reset();
  assert.equal(ls.getItem(`${KEY}.corrupt.1000`), null);
  assert.equal(ls.getItem('other'), 'keep');
  assert.deepEqual(JSON.parse(ls.getItem(KEY)).seen, {});
});

// ---------- snapshots ----------
const caseState = () => ({
  answer: 'crane', guesses: ['slate', 'brine'], fb: [[0, 0, 2, 0, 2], [0, 2, 0, 2, 2]], counts: [80, 3], cur: 'cr', busy: true, over: false, won: false,
  g: 2, flags: { warned: 1 }, times: [[23, 45], [0, 5], [1, 10], [2, 15], [3, 20], [4, 25], [5, 30]], caseVars: { caseNo: '1234', date: 'May 1, 1947' },
  infUsed: new Set(['rnd.inf.pete']), infLog: ['rnd.inf.pete'], lastInf: true, title: 'The Crossword Killing', pending: ['rnd.core.2-2.01']
});
test('snapshot → JSON → restore gives back the case', () => {
  const snap = JSON.parse(JSON.stringify(snapshot(caseState())));
  assert.ok(!JSON.stringify(snap).includes('crane'), 'answer must be obfuscated');
  assert.equal(snap.cur, undefined); assert.equal(snap.busy, undefined);
  const s = restore(snap);
  assert.equal(s.answer, 'crane'); assert.deepEqual(s.guesses, ['slate', 'brine']);
  assert.deepEqual(s.fb, caseState().fb);
  assert.ok(s.infUsed instanceof Set && s.infUsed.has('rnd.inf.pete'));
  assert.equal(s.cur, ''); assert.equal(s.busy, false); assert.equal(s.over, false);
  assert.deepEqual(s.pending, ['rnd.core.2-2.01']); assert.deepEqual(s.flags, { warned: 1 });
});
test('restore recomputes the end state from the guesses', () => {
  const won = restore(snapshot({ ...caseState(), guesses: ['slate', 'crane'], counts: [80] }));
  assert.equal(won.over, true); assert.equal(won.won, true); assert.deepEqual(won.counts, [80]);
  const lost = restore(snapshot({ ...caseState(), guesses: ['slate', 'brine', 'pious', 'dumbo', 'fight', 'wreck'] }));
  assert.equal(lost.over, true); assert.equal(lost.won, false);
});
test('restore rejects broken or tampered snapshots', () => {
  const good = snapshot(caseState());
  assert.equal(restore({ ...good, answer: 'crane' }), null);                       // plain answer
  assert.equal(restore({ ...good, guesses: ['slate', 'xx'] }), null);
  assert.equal(restore({ ...good, guesses: ['crane', 'slate'] }), null);          // play after a win
  assert.equal(restore({ ...good, guesses: Array(7).fill('slate') }), null);
  assert.equal(restore({ ...good, times: [] }), null);
  assert.equal(restore(good, w => w !== 'brine'), null);                          // not in the dictionary
  assert.equal(restore(null), null);
});

// ---------- progress: seen marks and chapter attempts (D1, D7) ----------
test('Random Case commits seen marks immediately', () => {
  const d = defaults(); markSeen(d, ['rnd.tail', 'rnd.intro.crossword', null]);
  assert.ok(isSeen(d, 'rnd.tail') && isSeen(d, 'rnd.intro.crossword'));
  assert.deepEqual(Object.keys(d.seen).length, 2);
});
test('a won chapter commits its staged seen marks and records the result', () => {
  const d = defaults(); newCampaign(d, 7); beginAttempt(d);
  markSeen(d, ['c01.intro.a', 'c01.core.1-0.01'], { story: true });
  assert.equal(isSeen(d, 'c01.intro.a'), false);                                 // staged, not watched yet
  d.campaign.storyFlags.met_ruby = 1;
  winAttempt(d, { guesses: 3, answer: 'crane' }, 9);
  assert.ok(isSeen(d, 'c01.intro.a') && isSeen(d, 'c01.core.1-0.01'));
  assert.equal(d.campaign.chapter, 2); assert.equal(d.campaign.attempt, null);
  const r = d.campaign.results[0];
  assert.deepEqual({ ...r, answer: reveal(r.answer) }, { chapter: 1, guesses: 3, attempts: 1, answer: 'crane', at: 9 });
  assert.equal(d.campaign.storyFlags.met_ruby, 1);
});
test('a lost chapter rolls back flags, forgets its scenes, and retries with different ones', () => {
  const d = defaults(); newCampaign(d); d.campaign.storyFlags = { met_ruby: 1 };
  beginAttempt(d);
  markSeen(d, ['c01.intro.a', 'c01.core.1-0.01'], { story: true });
  d.campaign.storyFlags.ruby_dead = 1;
  loseAttempt(d);
  assert.deepEqual(d.campaign.storyFlags, { met_ruby: 1 });
  assert.equal(isSeen(d, 'c01.intro.a'), false);
  assert.deepEqual([...avoidFor(d, 1)], ['c01.intro.a', 'c01.core.1-0.01']);
  assert.equal(d.campaign.attempt.n, 2); assert.equal(d.campaign.attempt.chapter, 1); assert.deepEqual(d.campaign.attempt.pendingSeen, []);
  markSeen(d, ['c01.intro.b'], { story: true }); loseAttempt(d);
  assert.deepEqual([...avoidFor(d, 1)], ['c01.intro.a', 'c01.core.1-0.01', 'c01.intro.b']);
  winAttempt(d, { guesses: 5, answer: 'pious' });
  assert.equal(d.campaign.results[0].attempts, 3);
  assert.equal(isSeen(d, 'c01.intro.a'), false);                                 // only the winning attempt's scenes count
});
