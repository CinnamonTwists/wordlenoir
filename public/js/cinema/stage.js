import { R } from '../core/util.js';
import { SPEED, MOTION, FLASH, SKIP, sleep } from '../core/timing.js';
import { $ } from '../core/dom.js';
import { AU } from '../audio/audio.js';
import { RAIN } from '../fx/rain.js';
import { getSet } from '../art/sets/index.js';
import { MOOD_MUSIC } from './moods.js';

// The cinema layer: two cross-fading backgrounds, fade-to-black, flash, camera shake.
export const C = {
  el: $('#cinema'), cam: $('#cam'), bgA: $('#bgA'), bgB: $('#bgB'), front: null, narr: $('#narr'), dlg: $('#dlg'), portrait: $('#portrait'), dname: $('#dname'), dtext: $('#dtext'),
  fx: $('#fx'), black: $('#black'), flash: $('#flash'), vig: $('#vig'), blackOn: true, speaker: null, set: null
};

export async function blackIn(ms = 800) { C.black.style.transition = `opacity ${ms / SPEED}ms`; C.black.style.opacity = 1; await sleep(ms); C.blackOn = true; }
export async function blackOut(ms = 900) { C.black.style.transition = `opacity ${ms / SPEED}ms`; C.black.style.opacity = 0; await sleep(ms); C.blackOn = false; }
export async function lit() { if (C.blackOn) await blackOut(); }
export function hideText() { C.narr.classList.remove('on'); C.dlg.classList.remove('on'); C.speaker = null; AU.duck(false); }
// Snaps to black at once (used when a scene is skipped): the next visible line fades back in from black.
export function cutToBlack() { C.black.style.transition = 'none'; C.black.style.opacity = 1; C.blackOn = true; hideText(); C.fx.innerHTML = ''; }
export function flashFx(o = .7) { if (FLASH.reduced || SKIP.on) return; C.flash.style.transition = 'none'; C.flash.style.opacity = o; requestAnimationFrame(() => { C.flash.style.transition = `opacity ${500 / SPEED}ms`; C.flash.style.opacity = 0; }); }
export function shake() { if (MOTION.reduced || SKIP.on) return; C.cam.classList.remove('shake'); void C.cam.offsetWidth; C.cam.classList.add('shake'); }

export async function setScene(name, ctx) {
  const set = getSet(name);
  const back = C.front === C.bgA ? C.bgB : C.bgA;
  back.innerHTML = set.draw(ctx.vars); back.className = 'bg ' + (R() < .5 ? 'kb1' : 'kb2');
  RAIN.set(set.rain); AU.setRain(set.rain, set.indoor); AU.amb(set.ambience); C.set = name;
  if (C.blackOn) { back.classList.add('on'); if (C.front) C.front.classList.remove('on'); C.front = back; await sleep(60); return; }
  hideText(); back.classList.add('on'); if (C.front) C.front.classList.remove('on'); C.front = back; await sleep(900);
}
export function setMood(m) { C.el.dataset.mood = m; AU.music(MOOD_MUSIC[m] || 'calm'); }
