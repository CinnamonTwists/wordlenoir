import { rng, svg, f } from '../svg.js';
import { figure } from '../props.js';

// State Penitentiary at night (chapter 3): a high stone wall, a guard tower with a sweeping searchlight, the gate to the death house.
export default {
  rain: 'light',
  indoor: false,
  draw(v) {
    const r = rng(107);
    let stones = '', wire = '';
    for (let y = 330; y < 700; y += 34) for (let x = (y / 34) % 2 ? 0 : 40; x < 1600; x += 80) stones += `<rect x="${x}" y="${y}" width="78" height="32" fill="#14161c" opacity="${(.5 + r() * .5).toFixed(2)}"/>`;
    for (let x = 0; x < 1600; x += 26) wire += `<path d="M${x},318 l13,-14 l13,14" stroke="#05060a" stroke-width="2" fill="none"/>`;
    return svg(`<rect width="1600" height="900" fill="url(#nSky)"/>
    <circle cx="300" cy="170" r="160" fill="url(#nHalo)" opacity=".6"/>
    <path class="sweepA" d="M1210,180 L380,420 L560,520 Z" fill="#e8ecf4" opacity=".1" style="transform-origin:1210px 180px"/>
    <rect x="0" y="320" width="1600" height="400" fill="#0b0d12"/>${stones}${wire}
    <g fill="#05060a"><rect x="1160" y="150" width="110" height="200"/><path d="M1140,150 L1290,150 L1215,90 Z"/><rect x="1180" y="350" width="70" height="380"/></g>
    <rect x="1176" y="170" width="78" height="40" fill="#f3c66b" opacity=".55"/><circle cx="1210" cy="190" r="120" fill="url(#nGlow)" opacity=".6"/>
    <rect x="560" y="470" width="280" height="250" fill="#06070a"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${580 + i * 38}" y="480" width="8" height="240" fill="#1c2028"/>`).join('')}
    <rect x="560" y="430" width="280" height="34" fill="#0d0f14"/><text x="700" y="455" text-anchor="middle" font-family="Big Shoulders Display, sans-serif" font-size="22" letter-spacing="6" fill="#8d94a3" opacity=".7">STATE PENITENTIARY</text>
    <circle cx="700" cy="420" r="90" fill="url(#nGlow)" opacity=".5"/><rect x="692" y="398" width="16" height="16" fill="#ffe7b0"/>
    <path d="M0,720 L1600,720 L1600,900 L0,900 Z" fill="#050608"/><rect x="0" y="720" width="1600" height="180" fill="url(#nWet)" opacity=".5"/>
    ${figure(420, 380, .8, 'man')}
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".45"/>`);
  }
};
