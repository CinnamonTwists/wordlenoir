import { rng, svg, f } from '../svg.js';
import { figure, smoke } from '../props.js';

// Luigi's, a small Italian place (Vera's interludes): checked tablecloths, candles in straw bottles, a neon sign backwards in the window.
export default {
  rain: 'window',
  indoor: true,
  ambience: 'restaurant',
  draw(v) {
    const r = rng(97);
    let check = '', streaks = '';
    for (let x = 520; x < 1080; x += 40) for (let y = 610; y < 660; y += 25) if (((x - 520) / 40 + (y - 610) / 25) % 2 < 1) check += `<rect x="${x}" y="${y}" width="40" height="25" fill="#8a1c22" opacity=".8"/>`;
    for (let i = 0; i < 40; i++) streaks += `<path d="M${f(1000 + r() * 460)},${f(90 + r() * 360)} l${f(-2 + r() * 4)},${f(14 + r() * 26)}" stroke="#cfd9ee" stroke-width="1.5" opacity="${(.15 + r() * .3).toFixed(2)}"/>`;
    const candle = (x, y) => `<path d="M${x - 16},${y} C${x - 22},${y - 40} ${x + 22},${y - 40} ${x + 16},${y} Z" fill="#2c4a22"/><rect x="${x - 4}" y="${y - 62}" width="8" height="26" fill="#e6dcc4"/><ellipse cx="${x}" cy="${y - 70}" rx="4" ry="9" fill="#ffd98a"/><circle cx="${x}" cy="${y - 66}" r="120" fill="url(#nGlow)" opacity=".75"/>`;
    return svg(`<rect width="1600" height="900" fill="#140c0a"/>
    <rect x="0" y="0" width="1600" height="580" fill="url(#nBrick)" opacity=".55"/>
    <rect x="990" y="80" width="480" height="380" fill="#1b2234"/>${streaks}
    <g filter="url(#nNeon)" class="flicker"><text x="1230" y="200" text-anchor="middle" font-family="Limelight, serif" font-size="58" fill="#7bd6a0" transform="translate(2460 0) scale(-1 1)">LUIGI'S</text></g>
    <rect x="980" y="70" width="500" height="400" fill="none" stroke="#0a0605" stroke-width="20"/>
    <g fill="#0a0605"><rect x="120" y="360" width="300" height="360" rx="16"/><rect x="1200" y="520" width="280" height="200" rx="16"/></g>
    <path d="M0,700 L1600,690 L1600,900 L0,900 Z" fill="#070404"/>
    <rect x="500" y="600" width="600" height="70" fill="#e6dcc4" opacity=".85"/>${check}
    <rect x="560" y="670" width="16" height="230" fill="#0a0605"/><rect x="1024" y="670" width="16" height="230" fill="#0a0605"/>
    ${candle(800, 604)}
    ${figure(560, 330, .95, 'woman')}${figure(1040, 330, .95, 'man')}${smoke(1070, 330)}
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".25"/>`);
  }
};
