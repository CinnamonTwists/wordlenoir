import { rng, svg, f } from '../svg.js';
import { figure } from '../props.js';

export default {
  rain: 'light',
  indoor: false,
  draw(v) {
    const r = rng(71);
    let shim = '';
    for (let i = 0; i < 26; i++) { const y = 620 + r() * 270, x = r() * 1500; shim += `<rect class="shim" x="${f(x)}" y="${f(y)}" width="${f(40 + r() * 160)}" height="2" fill="#dfe6f5" style="animation-delay:${(r() * 3).toFixed(1)}s"/>`; }
    return svg(`<rect width="1600" height="900" fill="url(#nSky)"/>
    <circle cx="420" cy="300" r="220" fill="url(#nHalo)"/><circle cx="420" cy="300" r="70" fill="url(#nMoon)"/>
    <g fill="#060810"><path d="M1000,600 L1000,250 L1020,250 L1020,600 Z M1010,260 L1400,320 L1400,334 L1010,276 Z M1360,330 L1360,470" stroke="#060810" stroke-width="5"/><path d="M1080,610 L1560,610 L1520,560 L1120,560 Z"/><rect x="1200" y="500" width="40" height="60"/><rect x="1300" y="510" width="40" height="50"/></g>
    <rect x="0" y="600" width="1600" height="300" fill="url(#nWater)"/>
    ${shim}
    <polygon points="0,900 0,640 520,640 900,900" fill="#060506"/>${[60, 200, 340, 480].map(x => `<rect x="${x}" y="640" width="22" height="200" fill="#030303"/>`).join('')}
    <rect x="470" y="520" width="12" height="120" fill="#030303"/><circle cx="476" cy="514" r="120" fill="url(#nGlow)"/><rect x="466" y="500" width="20" height="24" fill="#ffd98a"/>
    ${figure(330, 330, .7, 'man')}
    <rect x="0" y="420" width="1600" height="360" fill="url(#nFog)" opacity=".9"/>`);
  }
};
