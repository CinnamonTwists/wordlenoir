import { rng, svg, f } from '../svg.js';
import { figure } from '../props.js';

// The grand jury hearing room, City Hall, February 1949: the story's frame (docs/story/bible.md §4).
// Tall windows full of snow, wood panelling, the witness chair, and Ruth's stenotype under a green lamp.
export default {
  rain: 'off',
  indoor: true,
  draw(v) {
    const r = rng(71);
    let snow = '', panels = '';
    for (let i = 0; i < 140; i++) { const x = 140 + r() * 1320, y = 60 + r() * 420; if ((x > 330 && x < 520) || (x > 700 && x < 900) || (x > 1080 && x < 1270)) snow += `<circle cx="${f(x)}" cy="${f(y)}" r="${(1 + r() * 2.2).toFixed(1)}" fill="#e8edf6" opacity="${(.25 + r() * .5).toFixed(2)}"/>`; }
    for (let x = 0; x < 1600; x += 160) panels += `<rect x="${x + 10}" y="560" width="140" height="120" fill="none" stroke="#2a1a10" stroke-width="4" opacity=".7"/>`;
    const win = x => `<rect x="${x}" y="60" width="190" height="420" fill="#1b2232"/><rect x="${x}" y="60" width="190" height="420" fill="url(#nBeam)" opacity=".5"/>
      <rect x="${x + 92}" y="60" width="6" height="420" fill="#0b0806"/><rect x="${x}" y="268" width="190" height="6" fill="#0b0806"/>
      <rect x="${x - 10}" y="50" width="210" height="440" fill="none" stroke="#120c08" stroke-width="20"/>`;
    return svg(`<rect width="1600" height="900" fill="#150e0a"/>
    <rect x="0" y="0" width="1600" height="560" fill="#1a110b"/>
    ${win(330)}${win(705)}${win(1080)}
    ${snow}
    <path d="M330,480 L250,900 L640,900 L520,480 Z M705,480 L640,900 L960,900 L895,480 Z M1080,480 L1000,900 L1390,900 L1270,480 Z" fill="#cfd9ee" opacity=".05"/>
    <rect x="0" y="540" width="1600" height="20" fill="#2a1a10"/>${panels}
    <rect x="1340" y="110" width="90" height="90" rx="45" fill="#0d0907" stroke="#3a2a18" stroke-width="5"/><path d="M1385,155 L1385,125 M1385,155 L1405,165" stroke="#c9b98f" stroke-width="4"/>
    <rect x="150" y="140" width="10" height="400" fill="#0b0806"/><path d="M160,150 L250,170 L250,280 L160,262 Z" fill="#1d1d2c"/><path d="M160,150 L250,170 L250,200 L160,182 Z" fill="#5a1418"/>
    <path d="M0,700 L1600,690 L1600,900 L0,900 Z" fill="#0a0705"/>
    <rect x="420" y="640" width="760" height="40" fill="#2a1a10"/><rect x="440" y="680" width="20" height="220" fill="#140d08"/><rect x="1140" y="680" width="20" height="220" fill="#140d08"/>
    ${figure(560, 360, .95, 'man')}
    <rect x="1240" y="610" width="70" height="30" rx="4" fill="#0d0d10"/><rect x="1236" y="640" width="78" height="8" fill="#1a1a20"/><rect x="1270" y="648" width="10" height="160" fill="#0d0d10"/>
    <rect x="1250" y="560" width="50" height="52" fill="#e6dcc4" opacity=".85"/>
    <path d="M1150,520 C1160,500 1240,500 1250,520 Z" fill="#163a24"/><rect x="1196" y="520" width="8" height="90" fill="#0d0d10"/><circle cx="1200" cy="560" r="160" fill="url(#nGlow)" opacity=".55"/>
    ${figure(1330, 420, .82, 'woman')}
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".18"/>`);
  }
};
