import { svg } from '../svg.js';
import { figure } from '../props.js';

// A bank vault after hours (chapter 7): the round door swung open, walls of deposit boxes, a green banker's lamp on a steel table.
export default {
  rain: 'off',
  indoor: true,
  draw(v) {
    let boxes = '';
    for (let y = 80; y < 600; y += 52) for (let x = 40; x < 600; x += 70) boxes += `<rect x="${x}" y="${y}" width="64" height="46" fill="#2a2b2e" stroke="#121315" stroke-width="3"/><circle cx="${x + 32}" cy="${y + 23}" r="4" fill="#9a8a5a"/>`;
    return svg(`<rect width="1600" height="900" fill="#101113"/>${boxes}
    <circle cx="1180" cy="370" r="290" fill="#0a0b0c"/><circle cx="1180" cy="370" r="250" fill="#16181b"/>
    <g transform="translate(1440 370) scale(.35 1)"><circle r="260" fill="#3a3c40" stroke="#1a1b1d" stroke-width="20"/><circle r="70" fill="#5a5c60"/>${[0, 60, 120].map(a => `<rect x="-8" y="-220" width="16" height="440" fill="#7a7c80" transform="rotate(${a})"/>`).join('')}</g>
    <rect x="1000" y="250" width="360" height="240" fill="#1d1f22"/>${[0, 1, 2, 3].map(i => `<rect x="${1020 + i * 86}" y="270" width="70" height="200" fill="#26282c" stroke="#0e0f10" stroke-width="3"/>`).join('')}
    <path d="M0,640 L1600,640 L1600,900 L0,900 Z" fill="#08090a"/>
    <rect x="560" y="600" width="420" height="22" fill="#3a3c40"/><rect x="580" y="622" width="14" height="200" fill="#1a1b1d"/><rect x="946" y="622" width="14" height="200" fill="#1a1b1d"/>
    <path d="M700,560 C710,540 790,540 800,560 Z" fill="#1d5a34"/><rect x="746" y="560" width="8" height="40" fill="#0e0f10"/><circle cx="750" cy="580" r="200" fill="url(#nGlow)" opacity=".55"/>
    <rect x="820" y="580" width="120" height="18" fill="#e6dcc4" opacity=".8" transform="rotate(-4 880 590)"/>
    ${figure(420, 330, .9, 'woman')}
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".18"/>`);
  }
};
