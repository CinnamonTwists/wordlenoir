import { sleep } from '../core/timing.js';
import { $ } from '../core/dom.js';
import { AU } from '../audio/audio.js';
import { RAIN } from '../fx/rain.js';
import { getSet } from '../art/sets/index.js';
import { parseScript, condOK, fill } from '../script/parser.js';
import { C, blackIn, lit, hideText, flashFx, shake, setScene, setMood } from './stage.js';
import { narrate, say } from './text.js';
import { cutin, heavy, versus, card, stamp, paper, clue, legend } from './effects.js';

// Runs a scene script line by line. ctx = { vars, flags, clue }.

async function runLine(raw, ctx) {
  const line = fill(raw, ctx);
  if (line.startsWith('@set')) return setScene(line.slice(4).trim().replace('!', ''), ctx);
  if (line.startsWith('@mood')) return setMood(line.slice(5).trim());
  if (line.startsWith('##')) return card(line.slice(2).trim());
  if (line.startsWith('!!')) return cutin(line.slice(2).trim());
  if (line.startsWith('**')) return heavy(line.slice(2).trim());
  if (line.startsWith('%%')) return versus(line.slice(2).trim());
  if (line.startsWith('>')) return narrate(line.slice(1).trim());
  if (line.startsWith('~')) {
    const [cmd, ...rest] = line.slice(1).split(' '); const arg = rest.join(' ');
    switch (cmd) {
      case 'fade': hideText(); await sleep(300); return blackIn(900);
      case 'black': hideText(); return blackIn(900);
      case 'shake': return shake();
      case 'flash': flashFx(); return sleep(300);
      case 'lightning': await lit(); flashFx(.85); await sleep(140); flashFx(.6); await sleep(500); AU.thunder(); return sleep(700);
      case 'heart': AU.heart(); C.vig.classList.remove('pulse'); void C.vig.offsetWidth; C.vig.classList.add('pulse'); return sleep(1300);
      case 'rain': RAIN.set(arg); AU.setRain(arg, getSet(C.set).indoor); return;
      case 'sfx': if (AU[arg]) AU[arg](); return sleep(arg === 'ring' ? 2600 : arg === 'hangup' ? 900 : arg === 'whistle' ? 1400 : arg === 'telegraph' ? 1200 : 400);
      case 'wait': return sleep(+arg || 1000);
      case 'flag': ctx.flags[arg] = 1; return;
      case 'stamp': return stamp(arg, false);
      case 'gstamp': return stamp(arg, true);
      case 'paper': return paper(arg);
      case 'clue': return clue(ctx);
      case 'legend': return legend();
      case 'tight': C.el.classList.add('tight'); return sleep(600);
      case 'loose': C.el.classList.remove('tight'); return;
      case 'push': if (C.front) C.front.classList.add('push'); return;
    }
    return;
  }
  const m = line.match(/^([A-Z]+):\s*(.*)$/);
  if (m) return say(m[1], m[2]);
  return narrate(line);
}

// Takes over the screen, plays the script, then hands back to the board.
export async function play(src, ctx) {
  C.black.style.transition = 'none'; C.black.style.opacity = 1; C.blackOn = true; hideText();
  C.el.classList.remove('tight'); C.el.dataset.mood = 'noir'; C.fx.innerHTML = '';
  C.el.hidden = false; RAIN.attach($('#crain')); await sleep(400);
  for (const { conds, line } of parseScript(src)) {
    if (!conds.every(c => condOK(c, ctx))) continue;
    await runLine(line, ctx);
  }
  hideText(); await blackIn(1000);
  C.el.hidden = true; C.fx.innerHTML = ''; C.bgA.innerHTML = C.bgB.innerHTML = ''; C.front = null;
  RAIN.attach($('#rain')); RAIN.set('light'); AU.setRain('window', 1);
}
