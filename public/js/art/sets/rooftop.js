import { rng, svg } from '../svg.js';
import { skyline, figure } from '../props.js';

export default {
  rain: 'light',
  indoor: false,
  ambience: 'rooftop',
  draw(v) {
    const r = rng(41);
    return svg(`<rect width="1600" height="900" fill="url(#nSky)"/>
    <path class="sweepA" d="M318,900 L300,0 L360,0 L342,900 Z" fill="url(#nBeam)"/><path class="sweepB" d="M1368,900 L1340,0 L1420,0 L1392,900 Z" fill="url(#nBeam)"/>
    <circle cx="1150" cy="250" r="260" fill="url(#nHalo)"/><circle cx="1150" cy="250" r="104" fill="url(#nMoon)"/>
    ${skyline(r, 820, 360, '#0b0e17', .09, 40, 120)}
    ${skyline(r, 900, 240, '#06070b', .18, 60, 160)}
    <g fill="#020203"><rect x="180" y="420" width="190" height="170" rx="10"/><path d="M170,420 L275,350 L380,420 Z"/><path d="M200,590 L190,770 M350,590 L360,770 M275,590 L275,770 M200,640 L350,700 M350,640 L200,700" stroke="#020203" stroke-width="9"/></g>
    <rect x="0" y="760" width="1600" height="140" fill="#030304"/><rect x="0" y="750" width="1600" height="18" fill="#0b0b0e"/>
    ${figure(1000, 312, .98, 'man')}
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".3"/>`);
  }
};
