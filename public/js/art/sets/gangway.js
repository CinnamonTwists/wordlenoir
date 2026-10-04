import { rng, svg, f } from '../svg.js';
import { figure } from '../props.js';

// The freighter Lindqvist at her pier (chapter 2): a black hull with lit portholes, the gangway under one bulb, a cargo boom, fog on the water.
export default {
  rain: 'light',
  indoor: false,
  draw(v) {
    const r = rng(103);
    let ports = '', shim = '', rivets = '';
    for (let x = 800; x < 1580; x += 74) ports += `<circle cx="${x}" cy="430" r="13" fill="${r() < .6 ? '#f3c66b' : '#1c2230'}" opacity="${(.55 + r() * .4).toFixed(2)}"/>`;
    for (let x = 640; x < 1600; x += 22) rivets += `<circle cx="${x}" cy="${f(372 + r() * 2)}" r="2" fill="#1a1f2a"/>`;
    for (let i = 0; i < 22; i++) shim += `<rect class="shim" x="${f(r() * 1500)}" y="${f(700 + r() * 190)}" width="${f(40 + r() * 140)}" height="2" fill="#dfe6f5" style="animation-delay:${(r() * 3).toFixed(1)}s"/>`;
    return svg(`<rect width="1600" height="900" fill="url(#nSky)"/>
    <circle cx="1280" cy="170" r="200" fill="url(#nHalo)" opacity=".7"/>
    <g fill="#05070c"><rect x="1060" y="120" width="16" height="250"/><path d="M1068,140 L1440,240 L1440,252 L1068,156 Z"/><path d="M1430,250 L1430,330" stroke="#05070c" stroke-width="4"/><rect x="1414" y="330" width="34" height="26"/>
      <rect x="1180" y="220" width="210" height="150"/><rect x="1240" y="170" width="70" height="56"/></g>
    <rect x="1196" y="250" width="34" height="22" fill="#f3c66b" opacity=".7"/><rect x="1250" y="250" width="34" height="22" fill="#f3c66b" opacity=".45"/>
    <path d="M620,370 L1600,360 L1600,700 L700,700 C660,640 630,520 620,370 Z" fill="#0a0d14"/>${rivets}${ports}
    <text x="1120" y="560" text-anchor="middle" font-family="Big Shoulders Display, sans-serif" font-size="54" letter-spacing="14" fill="#c9cfdb" opacity=".35">LINDQVIST</text>
    <rect x="0" y="690" width="1600" height="210" fill="url(#nWater)"/>${shim}
    <polygon points="0,900 0,660 560,660 760,900" fill="#060506"/>${[40, 170, 300, 430].map(x => `<rect x="${x}" y="660" width="20" height="200" fill="#030303"/>`).join('')}
    <path d="M380,662 L760,398 L780,412 L404,672 Z" fill="#11141c"/><path d="M380,640 L760,376 M404,652 L780,390" stroke="#2a303c" stroke-width="3"/>
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${f(390 + i * 55)},${f(655 - i * 38)} L${f(390 + i * 55)},${f(633 - i * 38)}" stroke="#2a303c" stroke-width="3"/>`).join('')}
    <rect x="560" y="420" width="6" height="250" fill="#030303"/><circle cx="563" cy="414" r="150" fill="url(#nGlow)"/><ellipse cx="563" cy="416" rx="10" ry="6" fill="#fff3c4"/>
    ${figure(210, 300, .78, 'man')}
    <rect x="0" y="480" width="1600" height="360" fill="url(#nFog)" opacity=".75"/>`);
  }
};
