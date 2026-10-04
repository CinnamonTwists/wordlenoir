import { rng, svg, f } from '../svg.js';
import { figure } from '../props.js';

// The burned-out waterfront warehouse (1931; Tommy's interlude, the endings): charred walls, a broken roof truss against the sky, the river beyond.
export default {
  rain: 'light',
  indoor: false,
  draw(v) {
    const r = rng(139);
    let brick = '', debris = '';
    for (let i = 0; i < 90; i++) brick += `<rect x="${f(r() * 1600)}" y="${f(300 + r() * 380)}" width="${f(20 + r() * 30)}" height="10" fill="#2a1a14" opacity="${(.3 + r() * .5).toFixed(2)}"/>`;
    for (let i = 0; i < 6; i++) debris += `<rect x="${f(380 + i * 150 + r() * 40)}" y="${f(640 + r() * 30)}" width="${f(60 + r() * 80)}" height="12" fill="#140c0a" transform="rotate(${f(-20 + r() * 40)} ${450 + i * 150} 650)"/>`;
    return svg(`<rect width="1600" height="900" fill="url(#nSky)"/>
    <circle cx="1240" cy="220" r="200" fill="url(#nHalo)" opacity=".6"/><circle cx="1240" cy="220" r="60" fill="url(#nMoon)" opacity=".8"/>
    <rect x="0" y="560" width="1600" height="160" fill="url(#nWater)" opacity=".8"/>
    <path d="M60,700 L60,260 L180,240 L200,330 L260,300 L300,700 Z M1260,700 L1280,320 L1360,280 L1420,350 L1500,330 L1520,700 Z" fill="#0b0807"/>
    <path d="M300,240 L560,168" stroke="#0b0807" stroke-width="18"/><path d="M420,207 L470,330 M560,168 L600,300 M1000,160 L1030,290" stroke="#0b0807" stroke-width="10"/>
    <path d="M960,150 L1180,210" stroke="#0b0807" stroke-width="18" transform="rotate(14 1070 180)"/>
    ${brick}
    <path d="M0,690 L1600,680 L1600,900 L0,900 Z" fill="#070505"/>${debris}
    ${figure(860, 380, .66, 'man')}
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".5"/>`);
  }
};
