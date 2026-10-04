import { rng, svg, f } from '../svg.js';
import { figure } from '../props.js';

// The ferry slip (chapter 8): the Blackwell Island ferry at her pilings before dawn, the wheelhouse lit, a gate and a painted sign.
export default {
  rain: 'light',
  indoor: false,
  draw(v) {
    const r = rng(127);
    let shim = '';
    for (let i = 0; i < 24; i++) shim += `<rect class="shim" x="${f(r() * 1500)}" y="${f(650 + r() * 230)}" width="${f(40 + r() * 150)}" height="2" fill="#dfe6f5" style="animation-delay:${(r() * 3).toFixed(1)}s"/>`;
    return svg(`<rect width="1600" height="900" fill="url(#nSky)"/>
    <rect x="0" y="380" width="1600" height="120" fill="#2a3346" opacity=".35"/>
    <g fill="#070a10"><path d="M640,540 L1560,540 L1500,640 L700,640 Z"/><rect x="760" y="440" width="680" height="100"/><rect x="1000" y="360" width="200" height="80"/><rect x="1080" y="300" width="24" height="60"/></g>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${790 + i * 80}" y="470" width="40" height="30" fill="#f3c66b" opacity="${(.3 + (i % 3) * .2).toFixed(2)}"/>`).join('')}
    <rect x="1020" y="380" width="160" height="40" fill="#f3c66b" opacity=".75"/><circle cx="1100" cy="400" r="160" fill="url(#nGlow)" opacity=".6"/>
    <rect x="0" y="630" width="1600" height="270" fill="url(#nWater)"/>${shim}
    ${[60, 200, 520, 600].map(x => `<rect x="${x}" y="520" width="26" height="260" fill="#030304"/>`).join('')}
    <polygon points="0,900 0,640 640,640 520,900" fill="#060506"/>
    <rect x="80" y="440" width="380" height="70" fill="#d8d0b8" opacity=".85"/><text x="270" y="486" text-anchor="middle" font-family="Big Shoulders Display, sans-serif" font-weight="900" font-size="28" letter-spacing="4" fill="#1a1612">BLACKWELL ISLAND FERRY</text>
    <rect x="110" y="510" width="12" height="130" fill="#030304"/><rect x="420" y="510" width="12" height="130" fill="#030304"/>
    ${figure(560, 400, .62, 'man')}
    <rect x="0" y="420" width="1600" height="360" fill="url(#nFog)" opacity=".8"/>`);
  }
};
