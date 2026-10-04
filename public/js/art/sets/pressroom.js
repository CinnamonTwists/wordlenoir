import { rng, svg, f } from '../svg.js';
import { figure, smoke } from '../props.js';

// The Morning Gazette's press room at night: the big rotary press, paper rolls, hanging lamps, a red warning light.
export default {
  rain: 'window',
  indoor: true,
  draw(v) {
    const r = rng(53);
    let rollers = '', sheets = '', lamps = '';
    for (let i = 0; i < 7; i++) { const x = 360 + i * 130; rollers += `<circle cx="${x}" cy="430" r="52" fill="#0c0c10" stroke="#2a2a33" stroke-width="6"/><circle cx="${x}" cy="430" r="12" fill="#3a3a44"/>`; }
    for (let i = 0; i < 9; i++) { const x = 330 + r() * 860, y = 300 + r() * 70; sheets += `<path d="M${f(x)},${f(y)} l90,-6 l4,22 l-90,6 Z" fill="#d9d2c0" opacity="${(.25 + r() * .3).toFixed(2)}"/>`; }
    for (const x of [400, 800, 1200]) lamps += `<line x1="${x}" y1="0" x2="${x}" y2="120" stroke="#020203" stroke-width="3"/><path d="M${x - 36},150 L${x - 10},120 L${x + 10},120 L${x + 36},150 Z" fill="#06060a"/><path d="M${x - 36},150 L${x - 150},560 L${x + 150},560 L${x + 36},150 Z" fill="url(#nCone)" opacity=".35"/><circle cx="${x}" cy="154" r="90" fill="url(#nGlow)" opacity=".6"/>`;
    return svg(`<rect width="1600" height="900" fill="#0d0c0f"/>
    <rect x="0" y="0" width="1600" height="560" fill="#111017"/>
    <rect x="80" y="80" width="200" height="300" fill="#1a2032"/><rect x="80" y="80" width="200" height="300" fill="none" stroke="#050507" stroke-width="16"/><rect x="176" y="80" width="8" height="300" fill="#050507"/>
    <g font-family="Special Elite, Courier New, monospace" fill="#c9c1ad" opacity=".55"><text x="1330" y="140" font-size="22">MORNING GAZETTE</text><text x="1330" y="170" font-size="14">PRESS No. 2 · NO SMOKING</text></g>
    <rect x="300" y="250" width="1000" height="300" rx="16" fill="#08080b" stroke="#1d1d24" stroke-width="8"/>
    <rect x="300" y="250" width="1000" height="40" fill="#15151c"/>${rollers}${sheets}
    <path d="M300,330 C600,300 1000,360 1300,320" stroke="#d9d2c0" stroke-width="10" fill="none" opacity=".35"/>
    <circle cx="1270" cy="280" r="9" fill="#ff3a3a"/><circle cx="1270" cy="280" r="60" fill="url(#nGlowR)" opacity=".7"/>
    ${lamps}
    <g fill="#0a0a0d"><ellipse cx="160" cy="640" rx="70" ry="24"/><rect x="90" y="560" width="140" height="80"/><ellipse cx="160" cy="560" rx="70" ry="24" fill="#cfc6b0" opacity=".35"/>
    <ellipse cx="1430" cy="650" rx="70" ry="24"/><rect x="1360" y="570" width="140" height="80"/><ellipse cx="1430" cy="570" rx="70" ry="24" fill="#cfc6b0" opacity=".35"/></g>
    <path d="M0,600 L1600,590 L1600,900 L0,900 Z" fill="#050507"/><path d="M0,600 L1600,590" stroke="#3a3a44" stroke-width="3" opacity=".6"/>
    ${figure(980, 330, 1, 'man')}${smoke(1010, 330)}
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".3"/>`);
  }
};
