import { rng, svg } from '../svg.js';
import { rainStreaks } from '../props.js';

export default {
  rain: 'window',
  indoor: true,
  ambience: 'apartment',
  draw(v) {
    const r = rng(53);
    return svg(`<rect width="1600" height="900" fill="#141118"/>
    <rect x="1000" y="140" width="400" height="420" fill="url(#nSky)"/>
    <g class="flicker"><circle cx="1330" cy="330" r="200" fill="url(#nGlowR)"/><g filter="url(#nNeon)" font-family="Limelight, serif" font-size="40" fill="#ff4a5a" text-anchor="middle">${'HOTEL'.split('').map((c, i) => `<text x="1330" y="${220 + i * 46}">${c}</text>`).join('')}</g>
    <polygon points="1000,560 1400,560 1180,900 560,900" fill="#ff4a5a" opacity=".08"/></g>
    ${rainStreaks(r, 1000, 140, 400, 420, 60)}
    <rect x="1000" y="140" width="400" height="420" fill="none" stroke="#050407" stroke-width="18"/><rect x="1196" y="140" width="8" height="420" fill="#050407"/><rect x="1000" y="346" width="400" height="8" fill="#050407"/>
    <line x1="700" y1="0" x2="700" y2="190" stroke="#030303" stroke-width="3"/><circle cx="700" cy="204" r="16" fill="#ffe7b0"/><circle cx="700" cy="204" r="220" fill="url(#nGlow)" opacity=".55"/>
    <rect x="380" y="300" width="120" height="90" fill="none" stroke="#2a2420" stroke-width="8"/><rect x="390" y="310" width="100" height="70" fill="#211d22"/>
    <rect x="0" y="720" width="1600" height="180" fill="#08070a"/>
    <g fill="#030304"><rect x="60" y="560" width="440" height="180"/><rect x="60" y="470" width="30" height="270"/><rect x="760" y="650" width="190" height="110" rx="8"/><rect x="830" y="630" width="50" height="22" rx="8" fill="none" stroke="#030304" stroke-width="9"/>
    <rect x="1460" y="560" width="20" height="200"/><rect x="1390" y="620" width="140" height="18"/><path d="M1420,520 C1400,560 1410,620 1440,640 L1500,640 C1520,600 1510,540 1480,520 Z"/></g>
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".3"/>`);
  }
};
