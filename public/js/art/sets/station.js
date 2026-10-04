import { svg, f } from '../svg.js';
import { figure } from '../props.js';

export default {
  rain: 'light',
  indoor: false,
  ambience: 'station',
  draw(v) {
    const h = (v && v.clockH != null) ? v.clockH : 5, m = (v && v.clockM != null) ? v.clockM : 58;
    const ma = m * 6, ha = (h % 12) * 30 + m * .5;
    let win = '';
    for (let x = 60; x < 1040; x += 92) win += `<rect x="${x}" y="470" width="62" height="60" fill="#f3c66b" opacity="${(.45 + (x % 3) * .15).toFixed(2)}"/>`;
    let lamps = '';
    for (const [x, s] of [[1160, 1], [1360, .8], [1520, .64]]) lamps += `<circle cx="${x}" cy="${f(330 + (1 - s) * 60)}" r="${f(120 * s)}" fill="url(#nGlow)"/><rect x="${x - 4}" y="${f(330 + (1 - s) * 60)}" width="8" height="${f(420 * s)}" fill="#030304"/>`;
    return svg(`<rect width="1600" height="900" fill="#0d0f15"/>
    <path d="M0,0 L1600,0 L1600,130 L0,190 Z" fill="#06070a"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M${i * 220},0 L${i * 220 + 110},170" stroke="#06070a" stroke-width="10"/>`).join('')}
    <g transform="translate(800 230)"><line x1="0" y1="-120" x2="0" y2="-80" stroke="#030304" stroke-width="6"/><circle r="84" fill="#e9e2cf" stroke="#050506" stroke-width="12"/>${Array.from({ length: 12 }, (_, i) => `<rect x="-3" y="-74" width="6" height="14" fill="#1a1714" transform="rotate(${i * 30})"/>`).join('')}<rect x="-5" y="-46" width="10" height="50" fill="#141210" transform="rotate(${ha})"/><rect x="-3" y="-70" width="6" height="74" fill="#141210" transform="rotate(${ma})"/><circle r="7" fill="#141210"/></g>
    <path d="M0,420 L1080,420 C1120,420 1130,440 1130,470 L1130,740 L0,740 Z" fill="#050608"/>${win}<rect x="0" y="420" width="1080" height="10" fill="#14161c"/>
    <g fill="#c9ced8" filter="url(#nBlur18)" opacity=".7"><ellipse class="rise" cx="980" cy="420" rx="90" ry="60"/><ellipse class="rise d2" cx="1040" cy="400" rx="110" ry="70"/><ellipse class="rise d3" cx="900" cy="410" rx="80" ry="54"/></g>
    <polygon points="1000,760 1600,700 1600,900 900,900" fill="#0a0b0f"/><path d="M1000,760 L1600,700" stroke="#c8b27a" stroke-width="4" opacity=".5"/>
    <rect x="0" y="740" width="1130" height="160" fill="#030304"/>
    ${lamps}
    ${figure(1290, 300, .9, 'man')}
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".5"/>`);
  }
};
