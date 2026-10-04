import { rng, svg, f } from '../svg.js';
import { figure } from '../props.js';

// The election warehouse (chapter 9): stacked ballot boxes with seals, high barred windows, bare bulbs on long cords, a counting table.
export default {
  rain: 'window',
  indoor: true,
  ambience: 'warehouse',
  draw(v) {
    const r = rng(131);
    let boxes = '', bulbs = '';
    for (const [x0, n] of [[60, 5], [1180, 4]]) for (let i = 0; i < n; i++) for (let j = 0; j < 3; j++) { const x = x0 + j * 120, y = 640 - (i + 1) * 70; boxes += `<rect x="${x}" y="${y}" width="112" height="66" fill="${r() < .5 ? '#3a2e20' : '#33281c'}" stroke="#120d08" stroke-width="3"/><rect x="${x + 40}" y="${y + 24}" width="32" height="18" fill="#b8a77a" opacity=".7"/>`; }
    for (const x of [520, 800, 1080]) bulbs += `<line x1="${x}" y1="0" x2="${x}" y2="260" stroke="#030303" stroke-width="2"/><circle cx="${x}" cy="270" r="10" fill="#fff0c0"/><circle cx="${x}" cy="270" r="190" fill="url(#nGlow)" opacity=".55"/>`;
    return svg(`<rect width="1600" height="900" fill="#120f0b"/>
    ${[200, 560, 920, 1280].map(x => `<rect x="${x}" y="60" width="140" height="110" fill="#1e2636"/>${[1, 2, 3].map(i => `<rect x="${x + i * 35}" y="60" width="5" height="110" fill="#0a0806"/>`).join('')}`).join('')}
    ${bulbs}${boxes}
    <rect x="460" y="186" width="680" height="54" fill="#d8ccaa" opacity=".8"/><text x="800" y="224" text-anchor="middle" font-family="Big Shoulders Display, sans-serif" font-weight="900" font-size="32" letter-spacing="10" fill="#5a1418">OFFICIAL COUNT</text>
    <path d="M0,640 L1600,640 L1600,900 L0,900 Z" fill="#080604"/>
    <rect x="480" y="600" width="640" height="24" fill="#2a2016"/><rect x="500" y="624" width="14" height="190" fill="#120d08"/><rect x="1086" y="624" width="14" height="190" fill="#120d08"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${f(530 + i * 95)}" y="586" width="70" height="14" fill="#e6dcc4" opacity=".8"/>`).join('')}
    ${figure(800, 290, .92, 'woman')}
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".25"/>`);
  }
};
