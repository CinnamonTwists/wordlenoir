import { svg, f } from '../svg.js';
import { lamp } from '../props.js';

// The Hall of Records (chapter 6): granite steps, six columns, a carved name, and every window dark but one.
export default {
  rain: 'light',
  indoor: false,
  ambience: 'records',
  draw(v) {
    let cols = '', win = '';
    for (let i = 0; i < 6; i++) { const x = 330 + i * 190; cols += `<rect x="${x}" y="300" width="64" height="380" fill="#1b1f28"/><rect x="${x + 10}" y="300" width="6" height="380" fill="#2a303c"/><rect x="${x + 40}" y="300" width="6" height="380" fill="#10131a"/><rect x="${x - 10}" y="290" width="84" height="18" fill="#232834"/>`; }
    for (let i = 0; i < 5; i++) win += `<rect x="${f(420 + i * 190)}" y="400" width="60" height="120" fill="${i === 3 ? '#f3c66b' : '#0a0c10'}" opacity="${i === 3 ? .7 : 1}"/>`;
    return svg(`<rect width="1600" height="900" fill="url(#nSky)"/>
    <rect x="280" y="220" width="1100" height="470" fill="#0c0e13"/><path d="M260,230 L830,110 L1400,230 Z" fill="#141720"/>
    <text x="830" y="270" text-anchor="middle" font-family="Limelight, serif" font-size="40" letter-spacing="12" fill="#8e97a8" opacity=".6">HALL OF RECORDS</text>
    ${win}${cols}
    ${[0, 1, 2, 3, 4].map(i => `<rect x="${240 - i * 30}" y="${680 + i * 26}" width="${1180 + i * 60}" height="26" fill="${i % 2 ? '#0d0f14' : '#12151c'}"/>`).join('')}
    ${lamp(140, 840, 360)}${lamp(1500, 840, 360)}
    <rect x="0" y="810" width="1600" height="90" fill="url(#nWet)" opacity=".6"/>
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".4"/>`);
  }
};
