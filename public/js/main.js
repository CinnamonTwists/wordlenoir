import { sleep, VT, SPEED, setSpeed } from './core/timing.js';
import { $ } from './core/dom.js';
import { AU } from './audio/audio.js';
import { RAIN, startRain, startGrain } from './fx/rain.js';
import { SETS } from './art/sets/index.js';
import { play } from './cinema/player.js';
import { parseScript, MISSING } from './script/parser.js';
import { S, DEBUG } from './game/state.js';
import { WORDS, loadWords } from './game/words.js';
import { score, stats } from './game/scoring.js';
import { board, toast } from './game/board.js';
import { press, attachKeyboard, newCase } from './game/game.js';

// Entry point: title screen, top-bar buttons, and the NOIR console hook.

const wordsReady = loadWords();
wordsReady.catch(() => {});   // handled when the player clicks start

startRain(); startGrain(); attachKeyboard();
$('#backdrop').innerHTML = SETS.street.draw({});
RAIN.attach($('#rain')); RAIN.set('heavy');

$('#startBtn').addEventListener('click', async () => {
  AU.init(); AU.setRain('heavy', 0); AU.riff();
  try { await wordsReady; } catch (e) { $('#title .fine').textContent = 'The case files didn\'t arrive. Check your connection and reload.'; return; }
  $('#title').style.transition = 'opacity .9s'; $('#title').style.opacity = 0; await sleep(900);
  $('#title').hidden = true; $('#backdrop').innerHTML = SETS.office.draw({}); $('#backdrop').className = 'dim'; RAIN.set('light');
  board.hidden = false; newCase();
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
  get ANSWERS() { return WORDS.answers; }, get ALLOWED() { return WORDS.allowed; },
  stats: () => stats(WORDS.answers, S.guesses, S.fb)
};
