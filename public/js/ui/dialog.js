import { $ } from '../core/dom.js';

// One reusable yes/no dialog (the #modal overlay). ask() resolves true for the red "yes" button (#mDrop), false for the safe
// "no" button (#mKeep), Esc, or a newer question replacing this one.

let pending = null;
export function ask({ title, text, yes, no }) {
  pending?.(false);
  $('#modalH').textContent = title; $('#modalMeta').textContent = text;
  $('#mDrop').textContent = yes; $('#mKeep').textContent = no;
  $('#modal').hidden = false; $('#mKeep').focus();
  return new Promise(res => { pending = v => { pending = null; $('#modal').hidden = true; res(v); }; });
}
export const answer = v => pending?.(v);
export const isOpen = () => !!pending;

$('#mDrop').addEventListener('click', () => answer(true));
$('#mKeep').addEventListener('click', () => answer(false));
