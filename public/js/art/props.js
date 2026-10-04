import { f } from './svg.js';

// Reusable scenery pieces. Each returns an SVG fragment string.

export function skyline(r, base, maxH, color, lit, minW = 50, maxW = 170) {
  let x = -40, s = '';
  while (x < 1640) {
    const w = minW + r() * (maxW - minW), h = maxH * (0.3 + r() * 0.7), y = base - h;
    s += `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h + 500)}" fill="${color}"/>`;
    if (r() < .22) s += `<rect x="${f(x + w / 2 - 2)}" y="${f(y - 46)}" width="3" height="46" fill="${color}"/>`;
    if (r() < .14) { const tx = x + w * .3; s += `<path d="M${f(tx)},${f(y)} L${f(tx + 6)},${f(y - 26)} M${f(tx + 34)},${f(y)} L${f(tx + 28)},${f(y - 26)}" stroke="${color}" stroke-width="4"/><rect x="${f(tx - 2)}" y="${f(y - 58)}" width="38" height="34" fill="${color}"/><path d="M${f(tx - 4)},${f(y - 58)} L${f(tx + 17)},${f(y - 74)} L${f(tx + 38)},${f(y - 58)} Z" fill="${color}"/>`; }
    if (lit > 0) for (let wy = y + 16; wy < base - 12; wy += 23) for (let wx = x + 9; wx < x + w - 12; wx += 17) if (r() < lit) s += `<rect x="${f(wx)}" y="${f(wy)}" width="7" height="11" fill="#f3c66b" opacity="${(.3 + r() * .6).toFixed(2)}"/>`;
    x += w + (r() < .3 ? r() * 24 : 0);
  }
  return s;
}
export function lamp(x, gy, h = 340) {
  const t = gy - h;
  return `<ellipse cx="${x}" cy="${gy + 8}" rx="240" ry="36" fill="#ffd98a" opacity=".16" filter="url(#nBlur6)"/>
  <path d="M${x - 14},${t + 26} L${x - 200},${gy} L${x + 200},${gy} L${x + 14},${t + 26} Z" fill="url(#nCone)" opacity=".6"/>
  <rect x="${x - 5}" y="${t}" width="10" height="${h}" fill="#030305"/><rect x="${x - 15}" y="${gy - 28}" width="30" height="28" fill="#030305"/>
  <path d="M${x - 26},${t + 4} L${x + 26},${t + 4} L${x + 15},${t + 27} L${x - 15},${t + 27} Z" fill="#050507"/>
  <circle cx="${x}" cy="${t + 26}" r="150" fill="url(#nGlow)"/><ellipse cx="${x}" cy="${t + 25}" rx="12" ry="5" fill="#fff3c4"/>`;
}
export function figure(x, y, s = 1, kind = 'man', fill = '#030304') {
  const body = kind === 'woman'
    ? `<ellipse cx="0" cy="44" rx="19" ry="24"/><path d="M-12,62 L12,62 L16,76 C40,80 54,92 56,116 L60,230 L50,232 L46,160 L40,200 L72,360 L-72,360 L-40,200 L-46,160 L-50,232 L-60,230 L-56,116 C-54,92 -40,80 -16,76 Z"/><rect x="-30" y="356" width="14" height="94"/><rect x="16" y="356" width="14" height="94"/>`
    : `<ellipse cx="0" cy="44" rx="21" ry="26"/><path d="M-16,62 L16,62 L22,78 C50,82 66,92 70,120 L80,252 L66,256 L60,172 L60,342 L-60,342 L-60,172 L-66,256 L-80,252 L-70,120 C-66,92 -50,82 -22,78 Z"/><rect x="-42" y="338" width="28" height="112"/><rect x="14" y="338" width="28" height="112"/>`;
  const hat = kind === 'woman'
    ? `<ellipse cx="0" cy="22" rx="64" ry="9" transform="rotate(-7)"/><path d="M-26,20 C-24,0 -10,-6 2,-6 C16,-6 26,2 24,20 Z"/>`
    : `<path d="M-30,22 C-31,2 -16,-6 0,-6 C16,-6 31,2 30,22 Z"/><ellipse cx="0" cy="23" rx="50" ry="9"/>`;
  const eyes = kind === 'word' ? `<g fill="#ff2a35" filter="url(#nNeon)"><ellipse cx="-8" cy="40" rx="6" ry="2.2"/><ellipse cx="8" cy="40" rx="6" ry="2.2"/></g>` : '';
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}">${body}${hat}${eyes}</g>`;
}
export function car(x, gy, s = 1) {
  return `<g transform="translate(${x} ${gy}) scale(${s})"><path d="M-270,-6 L-272,-46 C-262,-74 -214,-82 -160,-84 C-128,-136 -66,-146 0,-146 C64,-146 114,-134 146,-84 C206,-82 258,-70 270,-44 L268,-6 Z" fill="#040406"/><path d="M-120,-88 C-96,-126 -50,-134 -6,-134 L-6,-88 Z M8,-134 C52,-134 92,-126 116,-88 L8,-88 Z" fill="#11141c"/><circle cx="-172" cy="-4" r="40" fill="#020203"/><circle cx="172" cy="-4" r="40" fill="#020203"/><ellipse cx="262" cy="-50" rx="10" ry="8" fill="#ffe7a8"/><path d="M268,-50 L560,-110 L560,10 Z" fill="url(#nCone)" opacity=".35" transform="rotate(0)"/></g>`;
}
export function smoke(x, y) {
  return `<g fill="none" stroke="#cfcac0" stroke-width="3" stroke-linecap="round" filter="url(#nBlur6)"><path class="rise" d="M${x},${y} c-12,-20 14,-34 0,-56 c-12,-20 10,-30 2,-50"/><path class="rise d2" d="M${x + 4},${y} c14,-22 -10,-36 4,-60 c12,-20 -8,-30 0,-48"/><path class="rise d3" d="M${x - 2},${y} c-8,-18 12,-30 -2,-52 c-10,-18 6,-34 -4,-50"/></g>`;
}
export const rainStreaks = (r, x0, y0, w, h, n) => { let s = ''; for (let i = 0; i < n; i++) { const x = x0 + r() * w, y = y0 + r() * h; s += `<path d="M${f(x)},${f(y)} l${f(-2 + r() * 4)},${f(14 + r() * 30)}" stroke="#cfd9ee" stroke-width="1.6" opacity="${(.15 + r() * .3).toFixed(2)}"/>`; } return s; };
