import { svg } from '../svg.js';
import { figure } from '../props.js';

// WKRN, Studio B (chapter 4): the ON AIR light, a ribbon microphone, the control-room glass with an engineer's silhouette, a VU meter.
export default {
  rain: 'off',
  indoor: true,
  ambience: 'studio',
  draw(v) {
    let baffles = '';
    for (let x = 0; x < 1600; x += 64) baffles += `<rect x="${x + 4}" y="0" width="56" height="620" fill="${(x / 64) % 2 ? '#15121a' : '#191520'}"/>`;
    return svg(`<rect width="1600" height="900" fill="#0f0c12"/>${baffles}
    <rect x="900" y="150" width="560" height="300" fill="#1a2430"/><rect x="900" y="150" width="560" height="300" fill="url(#nBeam)" opacity=".35"/>
    ${figure(1180, 220, .62, 'man')}<rect x="960" y="380" width="440" height="70" fill="#0a0d12"/>
    <g transform="translate(1250 410)"><rect x="-60" y="-30" width="120" height="50" rx="6" fill="#e9e0c4"/><path d="M-48,14 A50,50 0 0 1 48,14" fill="none" stroke="#3a3328" stroke-width="2"/><line x1="0" y1="14" x2="26" y2="-18" stroke="#b01a1a" stroke-width="3"/></g>
    <rect x="890" y="140" width="580" height="320" fill="none" stroke="#08060a" stroke-width="20"/>
    <g class="flicker"><rect x="200" y="90" width="240" height="80" rx="10" fill="#4a0a0e"/><text x="320" y="146" text-anchor="middle" font-family="Big Shoulders Display, sans-serif" font-weight="900" font-size="48" letter-spacing="8" fill="#ff3b3b" filter="url(#nNeon)">ON AIR</text></g>
    <circle cx="320" cy="130" r="200" fill="url(#nGlowR)" opacity=".5"/>
    <rect x="556" y="250" width="8" height="500" fill="#050407"/><rect x="520" y="230" width="80" height="120" rx="30" fill="#1c1c22" stroke="#7d7f86" stroke-width="5"/>${[0, 1, 2, 3, 4, 5].map(i => `<line x1="536" y1="${250 + i * 16}" x2="584" y2="${250 + i * 16}" stroke="#56585e" stroke-width="3"/>`).join('')}
    <text x="560" y="380" text-anchor="middle" font-family="Big Shoulders Display, sans-serif" font-size="26" font-weight="900" fill="#c9b98f">WKRN</text>
    <circle cx="560" cy="290" r="220" fill="url(#nGlow)" opacity=".35"/>
    <path d="M0,620 L1600,620 L1600,900 L0,900 Z" fill="#07060a"/><rect x="420" y="740" width="280" height="14" fill="#050407"/>
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".2"/>`);
  }
};
