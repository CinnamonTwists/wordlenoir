// Small UI glyphs.

export function cigarette(state) {
  return `<svg viewBox="0 0 64 14" class="${state}" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="3" width="${state === 'burnt' ? 18 : 50}" height="8" fill="${state === 'burnt' ? '#6d6a66' : '#ece6d8'}"/><rect x="0" y="3" width="14" height="8" fill="#c9893a"/>${state === 'burnt' ? '' : `<rect class="ember" x="50" y="3" width="6" height="8" fill="#ff7a2a"/><rect x="56" y="3" width="4" height="8" fill="#5f5a54"/>`}</svg>`;
}
