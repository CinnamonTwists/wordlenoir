// Unit tests for game rules: hard mode and the Random Case record. `npm test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { score, hardModeMiss } from '../public/js/game/scoring.js';
import { defaults } from '../public/js/save/schema.js';
import { recordRandom } from '../public/js/save/progress.js';
import { snapshot, restore } from '../public/js/game/snapshot.js';

const play = (answer, ...words) => ({ guesses: words, fbs: words.map(w => score(w, answer)) });

test('hard mode: greens must stay in place', () => {
  const { guesses, fbs } = play('crane', 'trace');           // TRACE vs CRANE: R, A, E green; C yellow
  assert.deepEqual(hardModeMiss('brace', guesses, fbs), null);
  assert.deepEqual(hardModeMiss('crime', guesses, fbs), { kind: 'green', i: 2, L: 'a' });
  assert.deepEqual(hardModeMiss('brake', guesses, fbs), { kind: 'gang', L: 'c' });   // the yellow C must come back
});
test('hard mode: repeated hints need repeated letters', () => {
  const { guesses, fbs } = play('error', 'roars');           // ROARS vs ERROR: both Rs and the O are revealed
  assert.equal(hardModeMiss('rotor', guesses, fbs), null);
  assert.deepEqual(hardModeMiss('robot', guesses, fbs), { kind: 'gang', L: 'r' });
});
test('hard mode: nothing revealed, anything goes', () => {
  const { guesses, fbs } = play('crane', 'mommy');
  assert.equal(hardModeMiss('lusty', guesses, fbs), null);
  assert.equal(hardModeMiss('lusty', [], []), null);
});

test('Random Case record: wins build the streak and distribution, losses end the streak', () => {
  const d = defaults();
  recordRandom(d, { won: true, guesses: 3 });
  recordRandom(d, { won: true, guesses: 1 });
  recordRandom(d, { won: true, guesses: 3 });
  assert.deepEqual(d.random.stats, { played: 3, won: 3, dist: [1, 0, 2, 0, 0, 0], streak: 3, best: 3 });
  recordRandom(d, { won: false, guesses: 6 });
  recordRandom(d, { won: true, guesses: 6 });
  assert.deepEqual(d.random.stats, { played: 5, won: 4, dist: [1, 0, 2, 0, 0, 1], streak: 1, best: 3 });
});

test('snapshots keep the hard-mode and recorded flags', () => {
  const S = { answer: 'crane', guesses: ['slate'], fb: [score('slate', 'crane')], counts: [9], cur: '', busy: false, over: false, won: false, g: 1, flags: {},
    times: Array(7).fill([0, 0]), caseVars: {}, infUsed: new Set(), infLog: [], lastInf: false, title: 'T', pending: [], recorded: true, hard: true };
  const s = restore(JSON.parse(JSON.stringify(snapshot(S))));
  assert.equal(s.hard, true); assert.equal(s.recorded, true);
});
