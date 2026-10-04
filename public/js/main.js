import { sleep, VT, SPEED, setSpeed } from './core/timing.js';
import { $ } from './core/dom.js';
import { AU } from './audio/audio.js';
import { RAIN, startRain, startGrain } from './fx/rain.js';
import { SETS } from './art/sets/index.js';
import { play, skipNow } from './cinema/player.js';
import { parseScript, MISSING } from './script/parser.js';
import { S, DEBUG, setMode } from './game/state.js';
import { WORDS, loadWords } from './game/words.js';
import { getPack, sceneById } from './content/registry.js';
import { score, stats } from './game/scoring.js';
import { toast } from './game/board.js';
import { press, attachKeyboard, newCase, resumeCase, dropSaved, savedSummary, hooks, showNotes } from './game/game.js';
import { RandomMode } from './game/modes/random.js';
import { store } from './save/store.js';
import { show, back, screen, onShow } from './ui/screens.js';
import { initMenu, refreshMenu, continueTarget } from './ui/menu.js';
import { initCampaign, hasRun, newGame, continueGame, startReplay, playEnding } from './ui/campaign.js';
import { renderChapters, renderDossier, dossierStep } from './ui/casefiles.js';
import { ask, answer, isOpen } from './ui/dialog.js';
import { chapterInfo } from './content/chapters/index.js';
import { applySettings, buildSettings, syncSettings, setSetting, onChange, shouldMuteHidden } from './ui/settings.js';

// Entry point: boot, screen wiring (title → menu → game / settings), the in-game menu, and the NOIR console hook.

// ---------- boot ----------
store.load();
applySettings();
setMode(RandomMode);
const ready = Promise.all([loadWords(), RandomMode.load()]);
ready.catch(() => {});   // reported when the player tries to start a case

addEventListener('pagehide', () => store.flush());
document.addEventListener('visibilitychange', () => { if (document.hidden) store.flush(); AU.setHidden(document.hidden, shouldMuteHidden()); });
const NO_SAVE = {
  blocked: 'This browser isn\'t keeping case files. Progress ends when the tab closes.',
  quota: 'The file cabinet is full. Progress from here on won\'t be kept.',
  future: 'Your case files are from a newer edition of the game. Reload to get it. Nothing was overwritten.'
};
const saveWarning = () => { if (!store.status.persistent) toast(NO_SAVE[store.status.reason] || NO_SAVE.blocked); };
store.onStatus(() => { if (screen() !== 'title') saveWarning(); });

startRain(); startGrain(); attachKeyboard();
$('#backdrop').innerHTML = SETS.street.draw({});
RAIN.attach($('#rain')); RAIN.set('heavy');
buildSettings();

// ---------- screens ----------
let backdrop = 'street';
function setBackdrop(name) {
  if (backdrop === name) return; backdrop = name;
  $('#backdrop').innerHTML = SETS[name].draw({}); $('#backdrop').className = name === 'office' ? 'dim' : 'title';
}
const overlaysOff = () => { answer(false); for (const id of ['#pause', '#report', '#notes']) $(id).hidden = true; };
onShow('menu', () => { overlaysOff(); setBackdrop('street'); RAIN.set('heavy'); AU.setRain('heavy', 0); AU.setMusic('calm'); document.body.className = ''; refreshMenu(RandomMode.stats()); });
onShow('settings', () => syncSettings());
onShow('game', () => { setBackdrop('office'); RAIN.set('light'); AU.setRain('window', 1); });

$('#startBtn').addEventListener('click', async () => {
  AU.init(); applySettings(); AU.setRain('heavy', 0); AU.riff();
  $('#title').style.transition = 'opacity .9s'; $('#title').style.opacity = 0; await sleep(900);
  show('menu'); saveWarning();
});

// Starts something on the board once the word lists and scenes have arrived.
async function enterGame(start) {
  try { await ready; } catch (e) { toast('The case files didn\'t arrive. Check your connection and reload.'); return; }
  show('game'); await start();
}
initCampaign({ enterGame });
const openRandom = () => enterGame(() => { setMode(RandomMode); newCase(); });
const continueCase = () => enterGame(() => { setMode(RandomMode); if (!resumeCase()) { toast('That case file was water-damaged. Opening a new one.'); newCase(); } });

initMenu({
  // the story run first, then an open Random Case
  onContinue: () => (continueTarget()?.kind === 'story' ? continueGame() : continueCase()),
  onNewGame: async () => {
    if (hasRun()) {
      const ch = store.get('campaign.chapter');
      const ok = await ask({ title: 'Start over?', text: `Your run is at chapter ${ch}, "${chapterInfo(Math.min(ch, 10)).title}". Starting over closes that record for good. Endings, best results and the dossier are kept.`, yes: 'Start over', no: 'Keep my run' });
      if (!ok) return;
    }
    newGame();
  },
  onChapters: () => { show('chapters'); },
  onDossier: () => { show('dossier'); },
  // a Random Case already open: confirm dropping it first (it goes in the books as a loss once a suspect has been questioned)
  onRandom: async () => {
    const s = savedSummary(RandomMode);
    if (!(s && !s.over && s.suspect > 1)) return openRandom();
    const drop = await ask({ title: 'Drop this case?', text: 'The word walks free. Nobody will ever know what it was. Except you. It goes in the books as a cold case.', yes: 'Drop it', no: 'Keep digging' });
    if (!drop) return continueCase();
    const ans = dropSaved(RandomMode); if (ans) toast(`It was ${ans.toUpperCase()}. It always will be.`);
    openRandom();
  },
  onSettings: () => show('settings')
});
onShow('chapters', () => renderChapters(n => startReplay(n)));
onShow('dossier', () => renderDossier());
$('#chBack').addEventListener('click', () => show('menu'));
$('#doBack').addEventListener('click', () => show('menu'));
$('#doPrev').addEventListener('click', () => dossierStep(-1));
$('#doNext').addEventListener('click', () => dossierStep(1));

// settings: Back returns where you came from (and reopens the in-game menu if that's where Settings was opened)
let settingsFromPause = false;
function leaveSettings() { back(); if (settingsFromPause && screen() === 'game') openPause(); settingsFromPause = false; }
$('#setBack').addEventListener('click', leaveSettings);

// ---------- in-game menu ----------
function openPause() {
  if (S.busy || S.over) return;
  $('#pauseMeta').textContent = `CASE No. ${S.caseVars.caseNo} · SUSPECT ${S.guesses.length + 1} OF 6`;
  $('#pause').hidden = false; $('#pResume').focus();
}
const closePause = () => { $('#pause').hidden = true; $('#menuBtn').focus(); };
$('#menuBtn').addEventListener('click', openPause);
$('#pResume').addEventListener('click', closePause);
$('#pSettings').addEventListener('click', () => { $('#pause').hidden = true; settingsFromPause = true; show('settings'); });
$('#pMenu').addEventListener('click', () => { $('#pause').hidden = true; show('menu'); });   // the case is already checkpointed
hooks.toMenu = () => show('menu');

// case notes (roadmap T3) and skipping a seen scene
$('#notesBtn').addEventListener('click', () => { if (!S.busy) showNotes(); });
$('#notesClose').addEventListener('click', () => { $('#notes').hidden = true; $('#notesBtn').focus(); });
$('#skipBtn').addEventListener('click', () => skipNow());

// sound toggles (top bar and in-game menu) are the `sound` setting
const toggleSound = () => { AU.init(); setSetting('sound', !store.get('settings.sound')); };
function soundLabels() {
  const on = store.get('settings.sound');
  $('#sndBtn').textContent = on ? 'Sound on' : 'Sound off'; $('#sndBtn').setAttribute('aria-pressed', on);
  $('#pSound').textContent = on ? 'Sound: on' : 'Sound: off'; $('#pSound').setAttribute('aria-pressed', on);
}
$('#sndBtn').addEventListener('click', toggleSound);
$('#pSound').addEventListener('click', toggleSound);
onChange(k => { if (k === 'sound') soundLabels(); });
soundLabels();

// During a scene, Esc or Space skips it (if it's been seen). Otherwise Esc closes the top layer: a dialog, the notes, the in-game menu,
// Settings; on the board it opens the in-game menu.
addEventListener('keydown', e => {
  if (!$('#cinema').hidden && (e.key === 'Escape' || e.key === ' ')) { e.preventDefault(); skipNow(); return; }
  if (screen() === 'dossier' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) { dossierStep(e.key === 'ArrowLeft' ? -1 : 1); return; }
  if (e.key !== 'Escape') return;
  if (isOpen()) { answer(false); return; }
  if (screen() === 'chapters' || screen() === 'dossier') { show('menu'); return; }
  if (!$('#notes').hidden) { $('#notes').hidden = true; $('#notesBtn').focus(); return; }
  if (!$('#pause').hidden) { closePause(); return; }
  if (screen() === 'settings') { leaveSettings(); return; }
  if (screen() === 'game' && $('#cinema').hidden && $('#report').hidden) openPause();
});

// ---------- console/testing hook ----------
// e.g. NOIR.speed = 20; NOIR.forceAnswer = 'crane'; NOIR.forceInf = true;
window.NOIR = {
  get S() { return S; }, VT, MISSING,
  set speed(v) { setSpeed(v); }, get speed() { return SPEED; },
  get forceAnswer() { return DEBUG.forceAnswer; }, set forceAnswer(v) { DEBUG.forceAnswer = v; },
  get forceInf() { return DEBUG.forceInf; }, set forceInf(v) { DEBUG.forceInf = v; },
  press, play, score, parseScript,
  get pack() { return getPack('random'); }, scene: sceneById,   // e.g. NOIR.play(NOIR.scene('rnd.core.1-0.02').s, { vars: {}, flags: {} })
  save: store,                                                  // NOIR.save.get() is the save document
  setting: setSetting,                                          // NOIR.setting('textSpeed', 'fast'): saved and applied like the Settings screen
  get screen() { return screen(); },
  campaign: { playEnding, continueGame, newGame },               // e.g. set campaign.results, then NOIR.campaign.playEnding()
  get ANSWERS() { return WORDS.answers; }, get ALLOWED() { return WORDS.allowed; },
  stats: () => stats(WORDS.answers, S.guesses, S.fb)
};
