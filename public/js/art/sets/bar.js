import { rng, svg, f } from '../svg.js';
import { figure } from '../props.js';

export default {
  rain: 'off',
  indoor: true,
  draw(v) {
    const r = rng(23);
    let bottles = '';
    for (let x = 330; x < 1280; x += 22 + r() * 18) { const h = 50 + r() * 40, row = r() < .5 ? 380 : 500; bottles += `<rect x="${f(x)}" y="${f(row - h)}" width="16" height="${f(h)}" rx="4" fill="${['#2b1c12', '#14261a', '#251018', '#1c1c24'][f(r() * 3)]}"/><rect x="${f(x + 5)}" y="${f(row - h - 20)}" width="6" height="22" fill="#14100c"/><rect x="${f(x + 3)}" y="${f(row - h + 6)}" width="2" height="${f(h - 14)}" fill="#ffd98a" opacity=".25"/>`; }
    let lamps = '';
    for (const x of [460, 800, 1140]) lamps += `<line x1="${x}" y1="0" x2="${x}" y2="160" stroke="#020203" stroke-width="3"/><path d="M${x - 40},196 L${x - 12},160 L${x + 12},160 L${x + 40},196 Z" fill="#050507"/><path d="M${x - 40},196 L${x - 170},640 L${x + 170},640 L${x + 40},196 Z" fill="url(#nCone)" opacity=".45"/><circle cx="${x}" cy="200" r="110" fill="url(#nGlow)" opacity=".7"/>`;
    return svg(`<rect width="1600" height="900" fill="#110b0f"/>
    <rect x="300" y="250" width="1000" height="290" fill="#07050a"/><rect x="300" y="380" width="1000" height="8" fill="#1d1510"/><rect x="300" y="500" width="1000" height="8" fill="#1d1510"/>
    ${bottles}
    <g class="flicker" filter="url(#nNeon)"><text x="800" y="205" text-anchor="middle" font-family="Limelight, serif" font-size="68" fill="#ff5a9a" letter-spacing="6">THE LAST WORD</text></g>
    ${lamps}
    <path d="M800,470 m-70,0 a70,70 0 0 1 140,0 L760,470 Z" fill="#050407"/><ellipse cx="800" cy="420" rx="36" ry="44" fill="#050407"/><path d="M680,560 C690,490 740,470 800,470 C860,470 910,490 920,560 Z" fill="#050407"/>
    <path d="M0,600 L1600,600 L1600,900 L0,900 Z" fill="#040304"/><rect x="0" y="592" width="1600" height="16" fill="#2a1d12"/><rect x="0" y="592" width="1600" height="3" fill="#ffd98a" opacity=".35"/>
    ${figure(1240, 300, .95, 'man')}
    <g fill="#020203"><rect x="220" y="700" width="90" height="16" rx="8"/><rect x="258" y="716" width="12" height="190"/><rect x="560" y="700" width="90" height="16" rx="8"/><rect x="598" y="716" width="12" height="190"/></g>
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".35"/>`);
  }
};
