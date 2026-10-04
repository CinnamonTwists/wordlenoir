import { $ } from '../core/dom.js';
import { MOTION, FLASH, TEXT, TEXT_SPEEDS, OS_REDUCED } from '../core/timing.js';
import { AU } from '../audio/audio.js';
import { store } from '../save/store.js';
import { exportText, exportName, parseImport } from '../save/transfer.js';
import { toast } from '../game/board.js';

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
      hint: 'How fast lines type out and how long they stay up.' },
    { k: 'skipSeen', type: 'choice', label: 'Skip scenes you\'ve seen', options: [['ask', 'Ask'], ['always', 'Always'], ['never', 'Never']],
      hint: 'Ask puts a SKIP button (or Esc / Space) on scenes you\'ve already watched. Always skips them for you. Informant clues are kept in your case notes either way.' },
    { type: 'action', id: 'replayBtn', label: 'Replay the briefing', hint: 'The rules briefing at the start of a case plays in full again, even when skipping seen scenes.' }
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
  if (it.type === 'action') return `<div class="set"><button type="button" id="${it.id}" aria-describedby="${it.id}-h">${esc(it.label)}</button><small id="${it.id}-h">${esc(it.hint)}</small></div>`;
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
      <div class="set"><div class="row"><button type="button" id="exportBtn">Export case files</button><button type="button" id="copyBtn">Copy as text</button></div>
      <small>Everything in one file: cases, record, settings and seen scenes. Import it in another browser to carry on there.</small>
      <div id="copyBox" hidden><textarea id="copyText" readonly aria-label="Your case files as text"></textarea></div></div>
      <div class="set"><div class="row"><button type="button" id="importBtn">Import case files</button><button type="button" id="pasteBtn">Paste text instead</button></div>
      <input type="file" id="importFile" accept=".json,application/json" hidden>
      <div id="pasteBox" hidden><textarea id="pasteText" aria-label="Paste exported case files here" placeholder="Paste exported case files here"></textarea>
        <div class="row"><button type="button" id="pasteGo">Read it</button></div></div>
      <p class="err" id="importErr" role="alert" hidden></p>
      <div class="confirm" id="importConfirm" hidden>
        <p class="destroy">Replace your files?</p>
        <p id="importSummary"></p>
        <div class="row"><button type="button" id="importGo" class="warn">Replace them</button><button type="button" id="importCancel">Keep mine</button></div>
      </div></div>
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

  $('#replayBtn').onclick = () => {
    store.update(d => { for (const id of Object.keys(d.seen)) if (/\.tail$/.test(id)) delete d.seen[id]; });
    toast('The briefing will play in full next case.');
  };

  // export (roadmap T4): a dated .json download, or the same text to copy (for browsers that handle downloads poorly)
  const text = () => { store.flush(); return exportText(store.get()); };
  $('#exportBtn').onclick = () => {
    const url = URL.createObjectURL(new Blob([text()], { type: 'application/json' })), a = document.createElement('a');
    a.href = url; a.download = exportName(); document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Case files exported.');
  };
  $('#copyBtn').onclick = () => {
    const t = text(), show = () => { $('#copyBox').hidden = false; $('#copyText').value = t; $('#copyText').focus(); $('#copyText').select(); };
    try { navigator.clipboard.writeText(t).then(() => toast('Case files copied. Paste them somewhere safe.'), show); } catch { show(); }
  };
  // import: read a file or pasted text, validate it completely, show what's in it, and only then replace the save
  let incoming = null;
  const err = msg => { $('#importErr').textContent = msg; $('#importErr').hidden = !msg; };
  function read(t) {
    err(''); $('#importConfirm').hidden = true; incoming = null;
    try {
      const r = parseImport(t); incoming = r.doc;
      $('#importSummary').textContent = r.summary + (r.exportedAt ? ` · exported ${r.exportedAt.slice(0, 10)}` : '') + '. Everything in this browser will be replaced.';
      $('#importConfirm').hidden = false; $('#importGo').focus();
    } catch (e) { err(e.message); }
  }
  $('#importBtn').onclick = () => { $('#importFile').value = ''; $('#importFile').click(); };
  $('#importFile').onchange = async e => { const f = e.target.files?.[0]; if (f) read(await f.text()); };
  $('#pasteBtn').onclick = () => { $('#pasteBox').hidden = false; $('#pasteText').focus(); };
  $('#pasteGo').onclick = () => read($('#pasteText').value);
  $('#importCancel').onclick = () => { $('#importConfirm').hidden = true; incoming = null; };
  $('#importGo').onclick = () => {
    if (!incoming) return;
    if (store.replace(incoming)) location.reload();
    else err('This browser isn\'t keeping files, so the import can\'t be saved here.');
  };
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
  for (const id of ['#clearConfirm', '#importConfirm', '#importErr', '#pasteBox', '#copyBox']) $(id).hidden = true;
}
