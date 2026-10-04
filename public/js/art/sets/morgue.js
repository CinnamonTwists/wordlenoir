import { svg } from '../svg.js';

// The city morgue (Doc Fenn's): white tile gone grey, a wall of drawers, one sheet on one slab, a lamp on a chain.
export default {
  rain: 'off',
  indoor: true,
  draw(v) {
    let tile = '', drawers = '';
    for (let y = 0; y < 640; y += 40) for (let x = 0; x < 1600; x += 40) tile += `<rect x="${x + 1}" y="${y + 1}" width="38" height="38" fill="#1d2226"/>`;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) drawers += `<rect x="${1040 + j * 130}" y="${200 + i * 120}" width="118" height="104" fill="#2a3036" stroke="#0d0f11" stroke-width="6"/><rect x="${1080 + j * 130}" y="${246 + i * 120}" width="38" height="10" rx="5" fill="#8a929a"/><rect x="${1084 + j * 130}" y="${218 + i * 120}" width="30" height="16" fill="#d8d2c2" opacity=".6"/>`;
    return svg(`<rect width="1600" height="900" fill="#0d1012"/>${tile}
    ${drawers}
    <line x1="560" y1="0" x2="560" y2="230" stroke="#050607" stroke-width="3"/><path d="M500,270 L540,230 L580,230 L620,270 Z" fill="#06080a"/>
    <path d="M500,270 L300,700 L820,700 L620,270 Z" fill="#e6f0f0" opacity=".08"/><circle cx="560" cy="272" r="180" fill="url(#nGlow)" opacity=".55"/>
    <path d="M0,640 L1600,640 L1600,900 L0,900 Z" fill="#090b0c"/>
    <rect x="300" y="560" width="520" height="40" fill="#3a4148"/><rect x="330" y="600" width="18" height="220" fill="#1a1e22"/><rect x="772" y="600" width="18" height="220" fill="#1a1e22"/>
    <path d="M310,562 C330,500 420,480 470,500 C540,470 640,470 700,500 C760,490 810,520 812,562 Z" fill="#d9ddd6" opacity=".85"/>
    <rect x="740" y="548" width="40" height="22" fill="#e9e3c8" transform="rotate(8 760 560)"/>
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".2"/>`);
  }
};
