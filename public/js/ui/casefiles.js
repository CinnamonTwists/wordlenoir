import { $ } from '../core/dom.js';
import { bust } from '../art/portraits.js';
import { CHAPTERS } from '../content/chapters/index.js';
import { ENDING_NAMES, ENDING_ORDER } from '../content/endings/index.js';
import { store } from '../save/store.js';
import { toast } from '../game/board.js';

// Chapter Select and the Dossier (roadmap T2). A chapter unlocks once it has been reached in any run (story.reached).

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const reached = n => store.get('story.reached') >= n;

// ---------- Chapter Select ----------
export function renderChapters(onPick) {
  const best = store.get('story.best'), list = $('#chList');
  list.innerHTML = CHAPTERS.map(c => {
    const open = reached(c.n), b = best[c.n];
    const stamp = !open ? 'Classified' : !c.written ? 'Coming soon' : '';
    const sub = !open ? 'Not reached yet.' : b ? `Best: closed on suspect ${b}.` : 'Not closed yet.';
    return `<button class="item${stamp ? ' locked' : ''}" data-ch="${c.n}"${stamp ? ' aria-disabled="true"' : ''}><span class="t">Chapter ${c.n} · ${open ? esc(c.title) : '████████'}</span>
      <span class="s">${sub}</span>${stamp ? `<span class="stamp">${stamp}</span>` : ''}</button>`;
  }).join('');
  for (const b of list.querySelectorAll('.item')) b.onclick = () => {
    const c = CHAPTERS[b.dataset.ch - 1];
    if (!reached(c.n)) toast('Classified. Get there in the story first.');
    else if (!c.written) toast('Still at the typist.');
    else onPick(c.n);
  };
  const st = store.get('story'), found = ENDING_ORDER.filter(k => st.endings[k]);
  $('#chNote').textContent = `Replays don't change your run. Endings found: ${found.length} of ${ENDING_ORDER.length}`
    + (found.length ? ` (${found.map(k => ENDING_NAMES[k]).join(', ')})` : '') + (st.fastest ? ` · Fastest run: ${st.fastest} suspects` : '') + '.';
}

// ---------- Dossier: one page per culprit ----------
let page = 0;
export function renderDossier(to = page) {
  page = (to + CHAPTERS.length) % CHAPTERS.length;
  const c = CHAPTERS[page], open = reached(c.n), rec = store.get('dossier')[c.n];
  const status = !open ? 'Classified' : rec?.status === 'apprehended' ? `Apprehended · ${rec.guesses} ${rec.guesses === 1 ? 'suspect' : 'suspects'}`
    : rec?.status === 'escaped' ? 'Escaped' : 'At large';
  const R = t => open ? esc(t) : '<span class="redact">████████████</span>';
  $('#doPage').innerHTML = `
    <div class="mug${open ? '' : ' hidden-face'}">${bust(open ? c.bust : { hat: 'fedora', coat: true, color: '#222' })}<div class="plate">No. ${String(c.n).padStart(2, '0')}</div></div>
    <div class="facts">
      <h3>${open ? esc(c.culprit) : '████ ██████'}</h3>
      <div class="alias">${open ? esc(c.alias) : 'alias withheld'}</div>
      <dl><dt>Wanted for</dt><dd>${R(c.crime)}</dd><dt>M.O.</dt><dd>${R(c.mo)}</dd>
        <dt>Why six guesses</dt><dd>${R(c.why)}</dd><dt>Known associates</dt><dd>${R(c.associates)}</dd></dl>
      ${open ? `<blockquote>"${esc(c.quote)}"</blockquote>` : ''}
    </div>
    <div class="status ${rec?.status || (open ? 'large' : 'classified')}">${status}</div>`;
  $('#doIdx').textContent = `Chapter ${c.n} of ${CHAPTERS.length}`;
}
export const dossierStep = d => renderDossier(page + d);
