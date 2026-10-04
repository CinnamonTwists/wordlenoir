import { sleep, SKIP } from '../core/timing.js';
import { $ } from '../core/dom.js';
import { AU } from '../audio/audio.js';
import { RAIN } from '../fx/rain.js';
import { getSet } from '../art/sets/index.js';
import { parseScript, condOK, fill } from '../script/parser.js';
import { C, blackIn, lit, hideText, flashFx, shake, setScene, setMood, cutToBlack } from './stage.js';
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
      case 'story': if (ctx.story) ctx.story[arg] = 1; return;   // campaign-scoped (roadmap T6); kept only if the chapter is won
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

// A skipped line still changes state (roadmap T3): flags (case and story), the set, the mood, rain and the letterbox, so the next segment starts right.
// Nothing is shown or heard.
async function runQuiet(raw, ctx) {
  const line = fill(raw, ctx);
  if (line.startsWith('@set')) return setScene(line.slice(4).trim().replace('!', ''), ctx);
  if (line.startsWith('@mood')) return setMood(line.slice(5).trim());
  const [cmd, ...rest] = line.startsWith('~') ? line.slice(1).split(' ') : [];
  const arg = rest.join(' ');
  if (cmd === 'flag') ctx.flags[arg] = 1;
  else if (cmd === 'story') { if (ctx.story) ctx.story[arg] = 1; }
  else if (cmd === 'rain') { RAIN.set(arg); AU.setRain(arg, getSet(C.set).indoor); }
  else if (cmd === 'tight') C.el.classList.add('tight');
  else if (cmd === 'loose') C.el.classList.remove('tight');
}

// ---------- skipping ----------
// The SKIP ▸▸ button (and Esc/Space, wired in main.js) is offered while a skippable segment plays. Skipping cuts to black and
// finishes the current segment quietly; the segments after it still play (unless they're skippable and the setting is "always").
const P = { skippable: false, skipping: false };
const skipBtn = $('#skipBtn');
export const canSkipNow = () => P.skippable && !P.skipping;
export function skipNow() {
  if (!canSkipNow()) return false;
  P.skipping = SKIP.on = AU.quiet = true; skipBtn.hidden = true; cutToBlack();
  return true;
}
const endSkip = () => { P.skipping = SKIP.on = AU.quiet = false; P.skippable = false; skipBtn.hidden = true; };

// Takes over the screen, plays the segments, then hands back to the board.
// segments: a script string, or [{ id, src }] (roadmap T3). opts: { skip(id) → 'ask' | 'auto' | false, onSegment(id) after each one finishes }.
export async function play(segments, ctx, opts = {}) {
  const segs = typeof segments === 'string' ? [{ id: null, src: segments }] : segments.filter(Boolean);
  C.black.style.transition = 'none'; C.black.style.opacity = 1; C.blackOn = true; hideText();
  C.el.classList.remove('tight'); C.el.dataset.mood = 'noir'; C.fx.innerHTML = '';
  C.el.hidden = false; RAIN.attach($('#crain')); await sleep(400);
  try {
    for (const seg of segs) {
      const how = seg.id && opts.skip ? opts.skip(seg.id) : false;
      P.skippable = !!how; skipBtn.hidden = how !== 'ask';
      if (how === 'auto') skipNow();
      for (const { conds, line } of parseScript(seg.src)) {
        if (!conds.every(c => condOK(c, ctx))) continue;
        if (P.skipping) await runQuiet(line, ctx); else await runLine(line, ctx);
      }
      if (P.skipping) cutToBlack();   // a line cut off mid-fade may have marked the screen lit: make sure the next segment fades in
      endSkip();
      opts.onSegment?.(seg.id);
    }
  } finally { endSkip(); }
  hideText(); await blackIn(1000);
  C.el.hidden = true; C.fx.innerHTML = ''; C.bgA.innerHTML = C.bgB.innerHTML = ''; C.front = null;
  RAIN.attach($('#rain')); RAIN.set('light'); AU.setRain('window', 1);
}
