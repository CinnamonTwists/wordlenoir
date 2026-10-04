import { $ } from '../core/dom.js';
import { MOTION, FLASH, TEXT, TEXT_SPEEDS, OS_REDUCED } from '../core/timing.js';
import { AU } from '../audio/audio.js';
import { store } from '../save/store.js';

// Settings (roadmap T2): saved in the save document's `settings` (save/schema.js) and applied live.
// SPEC drives the form; applySettings() pushes values into the engine (audio buses, text pacing, motion/flash flags)
// and onto <html> as data attributes for CSS (data-hc, data-motion, data-flashes).

const FOLLOW = [['os', 'Follow system'], ['full', 'Off'], ['reduced', 'On']];
export const SPEC = [
  { group: 'Sound', items: [
    { k: 'master', type: 'range', label: 'Master volume' },
    { k: 'music', type: 'range', label: 'Music' },
    { k: 'sfx', type: 'range', label: 'Sound effects' },
    { k: 'ambience', type: 'range', label: 'Ambience', hint: 'Rain and rooms.' },
    { k: 'sound', type: 'toggle', label: 'Sound on' },
    { k: 'muteHidden', type: 'toggle', label: 'Mute when the tab is hidden' },
    { k: 'textBlips', type: 'toggle', label: 'Typewriter blips', hint: 'The clicks while dialogue types out.' }
  ] },
  { group: 'Scenes', items: [
    { k: 'textSpeed', type: 'choice', label: 'Text speed', options: [['slow', 'Slow'], ['normal', 'Normal'], ['fast', 'Fast'], ['instant', 'Instant']],
      hint: 'How fast lines type out and how long they stay up.' }
  ] },
  { group: 'Accessibility', items: [
    { k: 'motion', type: 'choice', label: 'Reduce motion', options: FOLLOW, hint: 'Camera shake, slow pans, heavy rain and film grain.' },
    { k: 'flashes', type: 'choice', label: 'Reduce flashes', options: FOLLOW, hint: 'Lightning, white flashes and flickering neon. Turn on if flashing light bothers you.' },
    { k: 'highContrast', type: 'toggle', label: 'High-contrast tiles', hint: 'Orange and blue instead of yellow and green. The share report follows.' }
  ] },
  { group: 'Gameplay', items: [
    { k: 'hardMode', type: 'toggle', label: 'Hard mode', hint: 'Every clue you get must be used in later guesses. Starts with your next case.' }
  ] }
];

let muteHidden = true;
export function applySettings(s = store.get('settings')) {
  MOTION.reduced = s.motion === 'os' ? OS_REDUCED : s.motion === 'reduced';
  FLASH.reduced = s.flashes === 'os' ? OS_REDUCED : s.flashes === 'reduced';
  Object.assign(TEXT, TEXT_SPEEDS[s.textSpeed] || TEXT_SPEEDS.normal, { blips: s.textBlips });
  const R = document.documentElement;
  R.toggleAttribute('data-hc', !!s.highContrast);
  R.dataset.motion = MOTION.reduced ? 'reduced' : 'full';
  R.dataset.flashes = FLASH.reduced ? 'reduced' : 'full';
  AU.setVolumes({ master: s.master, music: s.music, sfx: s.sfx, ambience: s.ambience, on: s.sound });
  muteHidden = s.muteHidden;
}
export const shouldMuteHidden = () => muteHidden;

// Changes one setting, saves it, applies everything. Other screens listen through onChange (e.g. the Sound buttons' labels).
const listeners = new Set();
export const onChange = fn => listeners.add(fn);
export function setSetting(k, v) {
  store.update(d => { d.settings[k] = v; });
  applySettings(); listeners.forEach(f => f(k, v));
}

// ---------- the form ----------
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function itemHTML(it) {
  const id = 'set-' + it.k, hint = it.hint ? `<small id="${id}-h">${esc(it.hint)}</small>` : '', desc = it.hint ? ` aria-describedby="${id}-h"` : '';
  if (it.type === 'range') return `<div class="set range"><label for="${id}">${esc(it.label)}</label><input type="range" id="${id}" data-k="${it.k}" min="0" max="100" step="5"${desc}${it.k === 'master' ? ' data-focus' : ''}><output for="${id}"></output>${hint}</div>`;
  if (it.type === 'toggle') return `<div class="set toggle"><label><input type="checkbox" id="${id}" data-k="${it.k}"${desc}><span>${esc(it.label)}</span></label>${hint}</div>`;
  return `<fieldset class="set choice"${desc}><legend>${esc(it.label)}</legend><div class="seg">${it.options.map(([v, l]) =>
    `<label><input type="radio" name="${id}" data-k="${it.k}" value="${v}"><span>${esc(l)}</span></label>`).join('')}</div>${hint}</fieldset>`;
}

export function buildSettings() {
  const form = $('#setForm');
  form.innerHTML = SPEC.map(g => `<section><h4>${esc(g.group)}</h4>${g.items.map(itemHTML).join('')}</section>`).join('') + `
    <section class="danger"><h4>Data</h4>
      <div class="set"><button type="button" id="clearBtn" class="warn">Clear all data</button>
      <small>Deletes every saved case, record and setting in this browser.</small></div>
      <div class="confirm" id="clearConfirm" hidden>
        <p class="destroy">DESTROY THE FILES?</p>
        <label for="clearType">Type <b>DESTROY</b> to confirm.</label>
        <input id="clearType" autocomplete="off" spellcheck="false" maxlength="7">
        <div class="row"><button type="button" id="clearGo" class="warn" disabled>Burn them</button><button type="button" id="clearCancel">Keep them</button></div>
      </div>
    </section>`;
  form.addEventListener('input', e => {
    const el = e.target, k = el.dataset.k; if (!k) return;
    if (el.type === 'range') { el.nextElementSibling.textContent = el.value + '%'; setSetting(k, el.value / 100); }
    else if (el.type === 'checkbox') setSetting(k, el.checked);
    else if (el.type === 'radio' && el.checked) setSetting(k, el.value);
  });
  // a little sound when a volume slider is let go, so the level can be judged
  form.addEventListener('change', e => { const k = e.target.dataset?.k; if (k === 'sfx' || k === 'master') AU.stamp(); });
  $('#clearBtn').onclick = () => { $('#clearConfirm').hidden = false; $('#clearType').value = ''; $('#clearGo').disabled = true; $('#clearType').focus(); };
  $('#clearCancel').onclick = () => { $('#clearConfirm').hidden = true; $('#clearBtn').focus(); };
  $('#clearType').oninput = e => { $('#clearGo').disabled = e.target.value.trim().toUpperCase() !== 'DESTROY'; };
  $('#clearGo').onclick = () => { store.reset(); location.reload(); };
}

// Puts the saved values into the form (on every visit, so it reflects changes made elsewhere, like the Sound button).
export function syncSettings() {
  const s = store.get('settings');
  for (const el of $('#setForm').querySelectorAll('[data-k]')) {
    const v = s[el.dataset.k];
    if (el.type === 'range') { el.value = Math.round(v * 100); el.nextElementSibling.textContent = el.value + '%'; }
    else if (el.type === 'checkbox') el.checked = !!v;
    else if (el.type === 'radio') el.checked = el.value === v;
  }
  $('#clearConfirm').hidden = true;
}
