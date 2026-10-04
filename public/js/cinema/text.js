import { clamp } from '../core/util.js';
import { SPEED, TEXT, sleep } from '../core/timing.js';
import { AU } from '../audio/audio.js';
import { bust } from '../art/portraits.js';
import { CAST } from '../content/cast.js';
import { C, lit } from './stage.js';

// Typewriter text: narration captions (`> line`) and character dialogue (`NAME: line`).
// `_word_` in a line renders as emphasis.

export function emParse(t) { const out = []; const re = /_([^_\s][^_]*?)_/g; let i = 0, m; while ((m = re.exec(t))) { if (m.index > i) out.push([t.slice(i, m.index), 0]); out.push([m[1], 1]); i = re.lastIndex; } if (i < t.length) out.push([t.slice(i), 0]); return out; }
export async function typeInto(el, text, perChar, ticks) {
  el.innerHTML = '';
  const segs = emParse(text).map(([t, em]) => { const sp = document.createElement(em ? 'em' : 'span'); el.appendChild(sp); return [sp, t]; });
  if (SPEED > 20 || !TEXT.type) { segs.forEach(([sp, t]) => sp.textContent = t); await sleep(text.length * perChar * TEXT.type); return; }
  perChar *= TEXT.type;
  let k = 0;
  for (const [sp, t] of segs) for (const ch of t) { sp.textContent += ch; if (ticks && TEXT.blips && ch !== ' ' && (k++ % 2 === 0)) AU.play('tick'); await sleep(ch === '.' || ch === ',' || ch === '?' ? perChar * 4 : perChar); }
}
export const holdFor = t => clamp(1200 + t.length * 30, 1900, 5400) * TEXT.hold;

export async function narrate(text) {
  await lit(); C.dlg.classList.remove('on'); C.speaker = null;
  if (C.narr.classList.contains('on')) { C.narr.classList.remove('on'); await sleep(260); }
  C.narr.innerHTML = ''; C.narr.classList.add('on'); AU.duck(true);
  await typeInto(C.narr, text, 27, false); await sleep(holdFor(text));
}
export async function say(key, text) {
  await lit(); const who = CAST[key] || { name: key, color: '#cfc7b6', bust: {} };
  if (C.narr.classList.contains('on')) { C.narr.classList.remove('on'); await sleep(220); }
  if (C.speaker !== key) {
    C.dlg.classList.remove('on', 'enter'); await sleep(C.speaker ? 200 : 0);
    C.dlg.style.setProperty('--c', who.color);
    C.portrait.innerHTML = bust(Object.assign({ color: who.color }, who.bust));
    C.dname.textContent = who.name; C.dtext.innerHTML = '';
    void C.dlg.offsetWidth; C.dlg.classList.add('on', 'enter'); C.speaker = key; AU.duck(true); await sleep(320);
  }
  await typeInto(C.dtext, text, 24, true); await sleep(holdFor(text));
}
