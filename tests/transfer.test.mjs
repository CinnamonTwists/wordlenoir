// Unit tests for save export/import (roadmap T4). `npm test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { APP, exportText, exportName, parseImport, summarize } from '../public/js/save/transfer.js';
import { defaults, VERSION } from '../public/js/save/schema.js';
import { createStore, KEY } from '../public/js/save/store.js';
import { hide } from '../public/js/save/codec.js';

const sample = () => {
  const d = defaults(1000);
  d.seen = { 'rnd.tail': 1, 'rnd.core.1-0.01': 1 };
  d.random.stats = { played: 4, won: 3, dist: [0, 1, 1, 1, 0, 0], streak: 2, best: 2 };
  d.random.active = { mode: 'random', answer: hide('crane'), guesses: ['slate'] };
  d.settings.highContrast = true;
  return d;
};

test('export → import round-trips the document exactly', () => {
  const d = sample(), text = exportText(d, Date.UTC(2026, 9, 4));
  const o = JSON.parse(text);
  assert.equal(o.app, APP); assert.equal(o.exportedAt, '2026-10-04T00:00:00.000Z');
  assert.ok(!text.includes('crane'), 'answers stay obfuscated in exports');
  const r = parseImport(text);
  assert.deepEqual(r.doc, d);
  assert.equal(r.exportedAt, '2026-10-04T00:00:00.000Z');
  assert.equal(r.summary, '2 scenes seen · 4 random cases (3 closed) · a case open');
});
test('file name carries the date', () => {
  assert.equal(exportName(Date.UTC(2026, 0, 9, 12)), 'wordle-noir-save-2026-01-09.json');
});
test('imports that are not ours, newer, or damaged are refused with a readable reason', () => {
  const good = JSON.parse(exportText(sample()));
  const cases = [
    ['{nope', /doesn't read as JSON/],
    ['[]', /isn't a case file/],
    [JSON.stringify({ ...good, app: 'other-game' }), /isn't from Wordle Noir/],
    [JSON.stringify({ ...good, v: VERSION + 1 }), /newer edition/],
    [JSON.stringify({ ...good, v: 0 }), /damaged/],
    [JSON.stringify({ ...good, random: { ...good.random, stats: { ...good.random.stats, won: 9 } } }), /doesn't add up/],
    [JSON.stringify({ ...good, random: { ...good.random, stats: { ...good.random.stats, dist: [1, 2] } } }), /doesn't add up/],
    [JSON.stringify({ ...good, seen: ['rnd.tail'] }), /seen scenes/],
    [JSON.stringify({ ...good, seen: { 'rnd.tail': true } }), /seen scenes/]
  ];
  for (const [text, re] of cases) assert.throws(() => parseImport(text), re, text.slice(0, 60));
});
test('a minimal valid export gets defaults filled in', () => {
  const r = parseImport(JSON.stringify({ app: APP, v: 1 }));
  assert.equal(r.doc.settings.textSpeed, 'normal');
  assert.equal(r.summary, '0 scenes seen · 0 random cases');
});
test('summary mentions the story when there is one', () => {
  const d = defaults(); d.campaign = { chapter: 6 }; assert.match(summarize(d), /^Chapter 6 in progress/);
  d.campaign.chapter = 11; assert.match(summarize(d), /^Story finished/);
});
test('store.replace writes the imported document in one go; a refused import leaves the old one alone', () => {
  const m = new Map(), ls = { getItem: k => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)), removeItem: k => m.delete(k), key: i => [...m.keys()][i], get length() { return m.size; } };
  const s = createStore({ storage: () => ls, now: () => 5 });
  s.load(); s.update(d => { d.seen.old = 1; }); s.flush();
  const before = m.get(KEY);
  assert.throws(() => parseImport('{"app":"wordle-noir","v":1,"seen":[1]}'));
  assert.equal(m.get(KEY), before, 'nothing written for a refused import');
  const { doc } = parseImport(exportText(sample()));
  assert.equal(s.replace(doc), true);
  assert.deepEqual(JSON.parse(m.get(KEY)).seen, sample().seen);
  assert.equal(s.get('settings.highContrast'), true);
});
