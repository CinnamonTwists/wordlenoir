import { rng, svg } from '../svg.js';
import { skyline, lamp, figure } from '../props.js';

export default {
  rain: 'heavy',
  indoor: false,
  draw(v) {
    const r = rng(61);
    return svg(`<rect width="1600" height="900" fill="url(#nSky)"/>
    ${skyline(r, 660, 380, '#080a11', .06)}
    <rect x="0" y="700" width="1600" height="200" fill="url(#nWet)"/>
    <circle cx="800" cy="520" r="360" fill="url(#nGlow)" opacity=".7"/>
    <rect x="690" y="330" width="220" height="400" fill="#ffcf7a" opacity=".5"/>
    ${figure(800, 392, .7, 'man')}
    <g fill="none" stroke="#040405" stroke-width="12"><rect x="690" y="330" width="220" height="400"/><path d="M763,330 V730 M837,330 V730 M690,470 H910 M690,600 H910"/></g>
    <rect x="680" y="292" width="240" height="44" fill="#040405"/><text x="800" y="324" text-anchor="middle" font-family="Big Shoulders Display, Impact, sans-serif" font-weight="900" font-size="26" letter-spacing="6" fill="#f3e7c6" filter="url(#nNeon)">TELEPHONE</text>
    <ellipse cx="800" cy="738" rx="300" ry="30" fill="#ffd98a" opacity=".2" filter="url(#nBlur6)"/><rect x="760" y="740" width="80" height="150" fill="#ffd98a" opacity=".18" filter="url(#nBlur6)"/>
    ${lamp(220, 702, 300)}
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".45"/>`);
  }
};
