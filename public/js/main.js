import { sleep, VT, SPEED, setSpeed } from './core/timing.js';
import { $ } from './core/dom.js';
import { AU } from './audio/audio.js';
import { RAIN, startRain, startGrain } from './fx/rain.js';
import { SETS } from './art/sets/index.js';
import { play } from './cinema/player.js';
import { parseScript, MISSING } from './script/parser.js';
import { S, DEBUG } from './game/state.js';
import { WORDS, loadWords } from './game/words.js';
import { loadPack, getPack, sceneById } from './content/registry.js';
import { score, stats } from './game/scoring.js';
import { board, toast } from './game/board.js';
import { press, attachKeyboard, newCase, resumeCase } from './game/game.js';
import { store } from './save/store.js';

// Entry point: title screen, top-bar buttons, and the NOIR console hook.

const wordsReady = Promise.all([loadWords(), loadPack('random')]);
wordsReady.catch(() => {});   // handled when the player clicks start

// Saves: load now, write out whatever is pending when the page goes away, and say so when progress can't be kept.
store.load();
addEventListener('pagehide', () => store.flush());
document.addEventListener('visibilitychange', () => { if (document.hidden) store.flush(); });
const NO_SAVE = {
  blocked: 'This browser isn\'t keeping case files. Progress ends when the tab closes.',
  quota: 'The file cabinet is full. Progress from here on won\'t be kept.',
  future: 'Your case files are from a newer edition of the game. Reload to get it. Nothing was overwritten.'
};
const saveWarning = () => { if (!store.status.persistent) toast(NO_SAVE[store.status.reason] || NO_SAVE.blocked); };
store.onStatus(() => { if (!board.hidden) saveWarning(); });
if (store.get('random.active')) $('#startBtn').textContent = 'Reopen the case file';

startRain(); startGrain(); attachKeyboard();
$('#backdrop').innerHTML = SETS.street.draw({});
RAIN.attach($('#rain')); RAIN.set('heavy');

$('#startBtn').addEventListener('click', async () => {
  AU.init(); AU.setRain('heavy', 0); AU.riff();
  try { await wordsReady; } catch (e) { $('#title .fine').textContent = 'The case files didn\'t arrive. Check your connection and reload.'; return; }
  $('#title').style.transition = 'opacity .9s'; $('#title').style.opacity = 0; await sleep(900);
  $('#title').hidden = true; $('#backdrop').innerHTML = SETS.office.draw({}); $('#backdrop').className = 'dim'; RAIN.set('light');
  board.hidden = false; saveWarning();
  if (!resumeCase()) newCase();
});
$('#sndBtn').addEventListener('click', () => { AU.init(); const on = AU.toggle(); $('#sndBtn').textContent = on ? 'Sound on' : 'Sound off'; $('#sndBtn').setAttribute('aria-pressed', on); });
$('#newBtn').addEventListener('click', () => { if (S.busy) return; if (S.over || !S.guesses.length) return newCase(); $('#modal').hidden = false; });
$('#mKeep').addEventListener('click', () => { $('#modal').hidden = true; });
$('#mDrop').addEventListener('click', () => { $('#modal').hidden = true; toast(`It was ${S.answer.toUpperCase()}. It always will be.`); newCase(); });

// Console/testing hook. e.g. NOIR.speed = 20; NOIR.forceAnswer = 'crane'; NOIR.forceInf = true;
window.NOIR = {
  get S() { return S; }, VT, MISSING,
  set speed(v) { setSpeed(v); }, get speed() { return SPEED; },
  get forceAnswer() { return DEBUG.forceAnswer; }, set forceAnswer(v) { DEBUG.forceAnswer = v; },
  get forceInf() { return DEBUG.forceInf; }, set forceInf(v) { DEBUG.forceInf = v; },
  press, play, score, parseScript,
  get pack() { return getPack('random'); }, scene: sceneById,   // e.g. NOIR.play(NOIR.scene('rnd.core.1-0.02').s, { vars: {}, flags: {} })
  save: store,                                                  // NOIR.save.get() is the save document
  get ANSWERS() { return WORDS.answers; }, get ALLOWED() { return WORDS.allowed; },
  stats: () => stats(WORDS.answers, S.guesses, S.fb)
};
