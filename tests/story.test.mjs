// Unit tests for story-mode rules (docs/story/bible.md §7–§8, decisions D1/D2/D7). `npm test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { defaults, migrate, VERSION } from '../public/js/save/schema.js';
import { interludeTier, threadTiers, endingFor, noteChapterStart, noteChapterResult, noteRunFinished, newCampaign, beginAttempt, winAttempt, loseAttempt } from '../public/js/save/progress.js';
import { CHAPTERS, chapterVars, isWritten } from '../public/js/content/chapters/index.js';

const run = gs => gs.map((g, i) => ({ chapter: i + 1, guesses: g, attempts: 1 }));

test('a v1 save migrates to v2 with story records', () => {
  assert.equal(VERSION, 2);
  const d = migrate({ v: 1, seen: { a: 1 }, random: { stats: { played: 3, won: 1, dist: [1, 0, 0, 0, 0, 0], streak: 0, best: 1 } } });
  assert.equal(d.v, 2);
  assert.deepEqual(d.story, { reached: 0, best: {}, endings: {}, fastest: null });
  assert.equal(d.random.stats.played, 3);
});
test('when Dash gets home: guesses → kept / late / missed, and a retry costs a step', () => {
  const t = (guesses, attempts) => interludeTier({ guesses, attempts }).tier;
  assert.deepEqual([1, 2, 3, 4, 5, 6].map(g => t(g, 1)), ['kept', 'kept', 'late', 'late', 'missed', 'missed']);
  assert.deepEqual([1, 3, 5].map(g => t(g, 2)), ['late', 'missed', 'missed']);
});
test('thread tiers follow the bible thresholds', () => {
  const tiers = threadTiers(run([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]));
  assert.deepEqual(Object.fromEntries(Object.entries(tiers).map(([k, v]) => [k, v.tier])), { pop: 'best', vera: 'best', nora: 'best', bottle: 'best' });
  // Pop = chapters 1, 5, 8: marks 2 + 1 + 0 = 3 of 6 → middle. Nora = 3, 7: 0 + 1 = 1 of 4 → worst. Bottle = 4, 9: 1 + 2 = 3 of 4 → best.
  const mixed = threadTiers(run([2, 6, 5, 3, 4, 1, 3, 6, 1, 1]));
  assert.equal(mixed.pop.total, 3); assert.equal(mixed.pop.tier, 'middle');
  assert.equal(mixed.nora.tier, 'worst'); assert.equal(mixed.bottle.tier, 'best');
  assert.equal(threadTiers(run(Array(10).fill(6))).vera.tier, 'worst');
});
test('endings: the egg needs every chapter on guess 1 of the first attempt; otherwise bands by average', () => {
  assert.equal(endingFor(run(Array(10).fill(1))), 'egg');
  const retried = run(Array(10).fill(1)); retried[4].attempts = 2;
  assert.equal(endingFor(retried), 'A');
  assert.equal(endingFor(run([2, 3, 2, 3, 2, 3, 2, 3, 2, 2])), 'A');   // 24 / 10 = 2.4
  assert.equal(endingFor(run([3, 3, 3, 3, 3, 3, 3, 3, 3, 3])), 'B');
  assert.equal(endingFor(run([4, 4, 4, 4, 4, 4, 4, 4, 4, 4])), 'C');
  assert.equal(endingFor(run([5, 5, 5, 5, 5, 5, 5, 5, 5, 5])), 'D');
  assert.equal(endingFor(run([6, 6, 6, 6, 6, 5, 6, 6, 6, 6])), 'bad');   // 5.9
});
test('dossier and best results outlive runs; a loss never undoes an arrest (D2)', () => {
  const d = defaults();
  noteChapterStart(d, 1); noteChapterStart(d, 2); noteChapterStart(d, 1);
  assert.equal(d.story.reached, 2);
  noteChapterResult(d, { chapter: 1, won: false, guesses: 6 }, 5);
  assert.deepEqual(d.dossier[1], { status: 'escaped', at: 5 });
  noteChapterResult(d, { chapter: 1, won: true, guesses: 4 }, 6);
  noteChapterResult(d, { chapter: 1, won: true, guesses: 5 }, 7);
  noteChapterResult(d, { chapter: 1, won: false, guesses: 6 }, 8);
  assert.deepEqual(d.dossier[1], { status: 'apprehended', guesses: 4, at: 6 });
  assert.equal(d.story.best[1], 4);
  noteRunFinished(d, 'C', run(Array(10).fill(4)), 9); noteRunFinished(d, 'A', run(Array(10).fill(2)), 10); noteRunFinished(d, 'C', run(Array(10).fill(5)), 11);
  assert.deepEqual(d.story.endings, { C: 9, A: 10 }); assert.equal(d.story.fastest, 20);
});
test('attempts: a loss retries the same chapter, a win advances and records how many attempts it took', () => {
  const d = defaults(); newCampaign(d); beginAttempt(d);
  loseAttempt(d); assert.equal(d.campaign.attempt.n, 2);
  winAttempt(d, { guesses: 3, answer: 'crane' });
  assert.equal(d.campaign.chapter, 2); assert.equal(d.campaign.results[0].attempts, 2);
});
test('the chapter manifest matches the bible: ten chapters, complete facts, chapters 1–2 written', () => {
  assert.equal(CHAPTERS.length, 10);
  for (const c of CHAPTERS) for (const k of ['title', 'date', 'culprit', 'alias', 'crime', 'mo', 'deadline', 'why', 'associates', 'quote', 'bust']) assert.ok(c[k], `chapter ${c.n} needs ${k}`);
  assert.deepEqual(CHAPTERS.filter(c => c.written).map(c => c.n), [1, 2]);
  assert.deepEqual(Object.keys(chapterVars(1)), ['chapterNo', 'chapterTitle', 'culprit', 'alias', 'crime', 'deadline']);
  assert.equal(isWritten(3), false);
});
test('retries play different scenes: the picker skips avoided ids until a pool runs out (D1)', async () => {
  const { pickFresh } = await import('../public/js/game/modes/story.js');
  const list = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  for (let i = 0; i < 50; i++) assert.equal(pickFresh(list, new Set(['a', 'c'])).id, 'b');
  for (let i = 0; i < 20; i++) assert.ok(list.includes(pickFresh(list, new Set(['a', 'b', 'c']))));   // exhausted: reuse rather than fail
});
test('written chapters have at least two scenes in every slot a retry draws from, and all three interlude variants', async () => {
  const { loadPack } = await import('../public/js/content/registry.js');
  for (const c of CHAPTERS.filter(x => x.written)) {
    const P = await loadPack(c.n), at = `chapter ${c.n}`;
    const pools = { intros: P.intros, 'win.climax': P.win.climax, 'loss.climax': P.loss.climax };
    for (let g = 1; g <= 5; g++) for (let b = 0; b <= 3; b++) pools[`cores ${g}-${b}`] = P.cores[`${g}-${b}`];
    for (let g = 1; g <= 6; g++) pools[`win.epi ${g}`] = P.win.epi[g];
    for (let b = 0; b <= 3; b++) pools[`loss.epi ${b}`] = P.loss.epi[b];
    for (const k of ['fast', 'slow', 'near', 'escaped']) pools[`beats.${k}`] = P.beats[k];
    for (const [k, list] of Object.entries(pools)) assert.ok(list?.length >= 2, `${at}: ${k} has ${list?.length ?? 0} scene(s), needs 2 so a retry can differ`);
    if (c.n < 10) for (const k of ['kept', 'late', 'missed']) assert.equal(P.interlude[k]?.length, 1, `${at}: interlude.${k}`);
  }
});
