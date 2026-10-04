import { clamp } from '../core/util.js';
import { SPEED, TEXT, sleep } from '../core/timing.js';
import { AU } from '../audio/audio.js';
import { bust, eyes } from '../art/portraits.js';
import { CAST } from '../content/cast.js';
import { C, lit, hideText, flashFx, shake } from './stage.js';
import { typeInto } from './text.js';

// Full-screen beats dropped into #fx. Styles in css/effects.css.

export async function cutin(arg) {
  let key = null, text = arg; const m = arg.match(/^@(\w+)\s+(.*)$/); if (m) { key = m[1]; text = m[2]; }
  await lit(); hideText(); const who = key && CAST[key];
  const el = document.createElement('div'); el.className = 'cutin';
  el.innerHTML = (who ? `<div class="ci-eyes" style="--c:${who.color}">${eyes(who.color, key === 'WORD')}</div>` : '') + `<div class="ci-band"><span></span></div>`;
  el.querySelector('span').textContent = text; C.fx.appendChild(el);
  await sleep(40); el.classList.add('in'); AU.play('sting', who && who.sting); flashFx(.5); shake();
  await sleep(2700); el.classList.add('out'); await sleep(380); el.remove();
}
export async function heavy(text) {
  await lit(); hideText();
  const m = C.el.dataset.mood, el = document.createElement('div');
  el.className = 'heavy' + (m === 'blue' || m === 'noir' ? ' blue' : m === 'gold' || m === 'warm' ? ' gold' : '');
  const p = document.createElement('p'); el.appendChild(p);
  const words = text.split(/\s+/); words.forEach(w => { const s = document.createElement('span'); s.textContent = w; p.appendChild(s); });
  C.fx.appendChild(el); await sleep(30); el.classList.add('on'); await sleep(450);
  const spans = [...p.children];
  for (let i = 0; i < spans.length; i++) { spans[i].classList.add('hit'); if (i === spans.length - 1) { AU.play('boom'); shake(); } else AU.play('thud'); await sleep(clamp(260 + words[i].length * 40, 300, 620)); }
  await sleep(2200); el.classList.remove('on'); await sleep(450); el.remove();
}
export async function versus(arg) {
  const [l, r] = arg.split('|').map(s => s.trim());
  await lit(); hideText();
  const el = document.createElement('div'); el.className = 'versus';
  el.innerHTML = `<div class="vs-half vs-l">${bust(Object.assign({ color: '#7fb2ff' }, CAST.DASH.bust))}<div class="vs-name"><span class="vs-tag">THE DETECTIVE</span></div></div>
    <div class="vs-half vs-r">${bust(Object.assign({ color: '#ff2a35' }, CAST.WORD.bust))}<div class="vs-name"><span class="vs-tag">THE WORD</span></div></div><svg class="vs-line" viewBox="0 0 100 100" preserveAspectRatio="none"><line x1="58" y1="-2" x2="42" y2="102" stroke="#fff" stroke-width="5" vector-effect="non-scaling-stroke"/></svg>`;
  el.querySelector('.vs-l .vs-name').append(l); el.querySelector('.vs-r .vs-name').append(r);
  C.fx.appendChild(el); await sleep(40); el.classList.add('in'); AU.play('versus'); await sleep(500); flashFx(.8); AU.play('thunder'); shake();
  await sleep(3800); el.style.transition = `opacity ${500 / SPEED}ms`; el.style.opacity = 0; await sleep(500); el.remove();
}
export async function card(arg) {
  const [title, sub = ''] = arg.split('|').map(s => s.trim());
  hideText(); const el = document.createElement('div'); el.className = 'card';
  el.innerHTML = `<h2></h2><div class="rule"></div><p></p>`; el.querySelector('h2').textContent = title;
  C.fx.appendChild(el); await sleep(30); el.classList.add('on'); AU.play('card'); await sleep(1600);
  await typeInto(el.querySelector('p'), sub, 34, true); await sleep((2400 + sub.length * 12) * TEXT.hold);
  el.classList.remove('on'); await sleep(750); el.remove();
}
export async function stamp(text, green) {
  await lit(); hideText(); const el = document.createElement('div'); el.className = 'stamp' + (green ? ' green' : ''); el.textContent = text;
  C.fx.appendChild(el); await sleep(30); el.classList.add('in'); await sleep(220); AU.play('stamp'); shake(); await sleep(2300);
  el.style.transition = `opacity ${500 / SPEED}ms`; el.style.opacity = 0; await sleep(500); el.remove();
}
export async function paper(arg) {
  const [label, text] = arg.split('|'); await lit(); hideText();
  const el = document.createElement('div'); el.className = 'paper'; el.innerHTML = `<div class="lbl"></div><div class="txt"></div>`;
  el.querySelector('.lbl').textContent = label; C.fx.appendChild(el); await sleep(30); el.classList.add('on'); AU.play('paper'); await sleep(600);
  await typeInto(el.querySelector('.txt'), text, 42, true); await sleep((2400 + text.length * 20) * TEXT.hold);
  el.classList.remove('on'); await sleep(450); el.remove();
}
export async function clue(ctx) {
  const k = ctx.clue; if (!k) return; await lit(); hideText();
  const el = document.createElement('div'); el.className = 'paper';
  el.innerHTML = `<div class="tag">INFORMATION RECEIVED</div><div class="lbl"></div><div class="big"></div><div class="sub"></div>`;
  el.querySelector('.lbl').textContent = k.label; el.querySelector('.big').textContent = k.big; el.querySelector('.sub').textContent = k.sub || '';
  C.fx.appendChild(el); await sleep(30); el.classList.add('on'); AU.play('stamp'); await sleep(5200); el.classList.remove('on'); await sleep(450); el.remove();
}
export async function legend() {
  await lit(); hideText();
  const el = document.createElement('div'); el.className = 'legend';
  const items = [['A', 'gray', 'Alibi. Not in the word.'], ['R', 'yellow', 'In the gang. Wrong spot.'], ['T', 'green', 'Right place. Right time.']];
  el.innerHTML = items.map(([l]) => `<div><div class="tile filled">${l}</div><label></label></div>`).join('');
  C.fx.appendChild(el); await sleep(30); el.classList.add('on'); await sleep(900);
  const tiles = el.querySelectorAll('.tile'), labels = el.querySelectorAll('label');
  for (let i = 0; i < 3; i++) { tiles[i].classList.add('flip'); await sleep(320); tiles[i].dataset.s = items[i][1]; tiles[i].classList.remove('filled'); AU.play('flip', i); await sleep(500); await typeInto(labels[i], items[i][2], 30, true); await sleep(700); }
  await sleep(3200); el.classList.remove('on'); await sleep(500); el.remove();
}
