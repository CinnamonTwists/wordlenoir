import { $ } from '../core/dom.js';

// Screen manager (roadmap F3): exactly one full-screen section is visible at a time. show() remembers where you came from,
// so back() (the Back buttons and Esc) returns there. Overlays (#pause, #modal, #report) sit on top and aren't screens.
// Each screen may register an onShow hook (refresh the menu, swap the backdrop...).

const SCREENS = { title: '#title', menu: '#menu', settings: '#settings', chapters: '#chapters', dossier: '#dossier', game: '#board' };
const hooks = {};
let current = 'title';
const trail = [];

export const screen = () => current;
export const onShow = (name, fn) => { hooks[name] = fn; };

export function show(name, { remember = true } = {}) {
  if (!SCREENS[name]) throw new Error(`unknown screen "${name}"`);
  if (name === 'menu') trail.length = 0;   // the menu is the hub: arriving there resets the trail
  else if (remember && current !== name) trail.push(current);
  for (const [k, sel] of Object.entries(SCREENS)) $(sel).hidden = k !== name;
  const from = current; current = name;
  hooks[name]?.(from);
  // focus: an explicit [data-focus] target, else the first enabled button
  const el = $(SCREENS[name]), f = el.querySelector('[data-focus]') || el.querySelector('button:not([disabled])');
  el.scrollTop = 0;
  f?.focus({ preventScroll: true });
}
// Returns to the previous screen. Returns false if there's nowhere to go back to.
export function back() {
  const prev = trail.pop(); if (!prev) return false;
  show(prev, { remember: false }); return true;
}
