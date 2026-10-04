import { rng, svg } from '../svg.js';
import { skyline, lamp, figure, car } from '../props.js';

export default {
  rain: 'heavy',
  indoor: false,
  draw(v) {
    const r = rng(7);
    return svg(`<rect width="1600" height="900" fill="url(#nSky)"/>
    <circle cx="1240" cy="160" r="200" fill="url(#nHalo)"/><circle cx="1240" cy="160" r="56" fill="url(#nMoon)"/>
    ${skyline(r, 640, 430, '#0d1019', .05)}
    ${skyline(r, 702, 330, '#06070c', .1, 90, 230)}
    <g class="flicker" filter="url(#nNeon)" font-family="Limelight, serif" font-size="44" fill="#ff5a6e" text-anchor="middle">${'HOTEL'.split('').map((c, i) => `<text x="300" y="${330 + i * 50}">${c}</text>`).join('')}</g>
    <rect x="0" y="700" width="1600" height="200" fill="url(#nWet)"/><rect x="0" y="694" width="1600" height="12" fill="#030306"/>
    <g filter="url(#nBlur6)"><rect x="1135" y="716" width="30" height="184" fill="#ffd98a" opacity=".3"/><rect x="288" y="716" width="22" height="140" fill="#ff5a6e" opacity=".3"/></g>
    ${lamp(1150, 702, 360)}
    ${car(560, 702, .9)}
    ${figure(1062, 290, .92, 'man')}
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".55"/>`);
  }
};
