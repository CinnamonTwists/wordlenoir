import { $ } from '../core/dom.js';
import { savedSummary } from '../game/game.js';
import { RandomMode } from '../game/modes/random.js';
import { campaignSummary } from './campaign.js';

// Main menu (roadmap T2): a case-file folder. refreshMenu() runs every time the menu is shown, so Continue and the record line
// always match the save. Continue offers the story run first, then an open Random Case.

// handlers: { onContinue, onNewGame, onChapters, onRandom, onDossier, onSettings }
export function initMenu(h) {
  for (const [id, fn] of [['#mContinue', h.onContinue], ['#mNewGame', h.onNewGame], ['#mChapters', h.onChapters], ['#mRandom', h.onRandom],
    ['#mDossier', h.onDossier], ['#mSettings', h.onSettings]]) $(id).onclick = () => fn();
}

// What Continue would pick up: { kind: 'story' | 'random', text } or null.
export function continueTarget() {
  const story = campaignSummary(); if (story) return { kind: 'story', text: story };
  const s = savedSummary(RandomMode);
  return s ? { kind: 'random', text: `Random Case No. ${s.caseNo} · ${s.title} · ${s.over ? 'closed, report waiting' : `suspect ${s.suspect} of 6`}${s.hard ? ' · hard' : ''}` } : null;
}

export function refreshMenu(stats) {
  const t = continueTarget();
  $('#mContinue').disabled = !t;
  $('#mContinueSub').textContent = t ? t.text : 'No case open.';
  $('#mRandomSub').textContent = stats?.played
    ? `${stats.played} ${stats.played === 1 ? 'case' : 'cases'} · ${Math.round(100 * stats.won / stats.played)}% closed · streak ${stats.streak}`
    : 'One word. Six suspects. Any night.';
}
