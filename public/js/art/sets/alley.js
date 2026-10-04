import { rng, svg } from '../svg.js';
import { figure } from '../props.js';

export default {
  rain: 'heavy',
  indoor: false,
  ambience: 'alley',
  draw(v) {
    const r = rng(31);
    let esc = '';
    for (let k = 0; k < 4; k++) { const y = 260 + k * 120; esc += `<path d="M120,${y} L470,${y + 40} M120,${y} L470,${y + 120}" stroke="#040303" stroke-width="5"/><path d="M120,${y + 4} L470,${y + 44}" stroke="#040303" stroke-width="14"/>`; }
    return svg(`<rect width="1600" height="900" fill="#05060a"/>
    <polygon points="560,0 1040,0 1040,200 560,200" fill="url(#nSky)"/>
    <rect x="560" y="180" width="480" height="580" fill="#0b0b10"/>
    <rect x="760" y="560" width="80" height="200" fill="#1a1611"/><rect x="766" y="566" width="68" height="194" fill="#2d2418"/>
    <circle cx="800" cy="540" r="150" fill="url(#nGlow)"/><ellipse cx="800" cy="540" rx="10" ry="6" fill="#fff3c4"/>
    ${figure(800, 610, .33, 'word')}
    <polygon points="0,0 560,180 560,760 0,900" fill="url(#nBrick)"/><polygon points="1600,0 1040,180 1040,760 1600,900" fill="url(#nBrick)"/>
    <polygon points="0,0 560,180 560,760 0,900" fill="#000" opacity=".55"/><polygon points="1600,0 1040,180 1040,760 1600,900" fill="#000" opacity=".62"/>
    ${esc}
    <polygon points="0,900 560,760 1040,760 1600,900" fill="url(#nWet)"/>
    <ellipse cx="800" cy="800" rx="120" ry="14" fill="#ffd98a" opacity=".18" filter="url(#nBlur6)"/>
    <g fill="#030304"><rect x="1150" y="680" width="90" height="120" rx="6"/><ellipse cx="1195" cy="680" rx="50" ry="10"/><rect x="1260" y="700" width="80" height="110" rx="6"/></g>
    <g fill="#bcc3d0" filter="url(#nBlur18)"><ellipse class="rise" cx="930" cy="760" rx="40" ry="30"/><ellipse class="rise d2" cx="950" cy="760" rx="50" ry="34"/><ellipse class="rise d3" cx="915" cy="760" rx="44" ry="28"/></g>
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".4"/>`);
  }
};
