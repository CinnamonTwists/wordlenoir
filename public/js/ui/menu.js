import { $ } from '../core/dom.js';
import { toast } from '../game/board.js';
import { savedSummary } from '../game/game.js';

// Main menu (roadmap T2): a case-file folder. Story entries stay stamped until the campaign exists (roadmap T6).
// refreshMenu() runs every time the menu is shown, so Continue and the record line always match the save.

const LOCKED = {
  mNewGame: 'The story file is still at the typist. Try a Random Case.',
  mChapters: 'Classified. Nobody gets the chapters before the story.',
  mDossier: 'Classified. The faces come with the story.'
};

// handlers: { onContinue, onRandom, onSettings }
export function initMenu(h) {
  $('#mContinue').onclick = () => h.onContinue();
  $('#mRandom').onclick = () => h.onRandom();
  $('#mSettings').onclick = () => h.onSettings();
  for (const [id, msg] of Object.entries(LOCKED)) $('#' + id).onclick = () => toast(msg);
}

// stats: the Random Case record ({ played, won, streak, ... }), shown under its menu entry.
export function refreshMenu(stats) {
  const s = savedSummary(), c = $('#mContinue');
  c.disabled = !s;
  $('#mContinueSub').textContent = !s ? 'No case open.'
    : `Case No. ${s.caseNo} · ${s.title} · ${s.over ? 'closed, report waiting' : `suspect ${s.suspect} of 6`}${s.hard ? ' · hard' : ''}`;
  $('#mRandomSub').textContent = stats?.played
    ? `${stats.played} ${stats.played === 1 ? 'case' : 'cases'} · ${Math.round(100 * stats.won / stats.played)}% closed · streak ${stats.streak}`
    : 'One word. Six suspects. Any night.';
}
