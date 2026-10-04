import { rng, svg, f } from '../svg.js';
import { figure } from '../props.js';

// A cemetery in the snow (the endings): rows of headstones, one bare tree, a low iron fence, snow still falling.
export default {
  rain: 'off',
  indoor: false,
  ambience: 'cemetery',
  draw(v) {
    const r = rng(149);
    let snow = '', stones = '';
    for (let i = 0; i < 160; i++) snow += `<circle cx="${f(r() * 1600)}" cy="${f(r() * 900)}" r="${(1 + r() * 2.4).toFixed(1)}" fill="#eef2f8" opacity="${(.3 + r() * .5).toFixed(2)}"/>`;
    for (let row = 2; row >= 0; row--) for (let i = 0; i < 8; i++) {
      const s = 1 - row * .25, x = 120 + i * 190 + row * 60, y = 640 - row * 70;
      stones += `<path d="M${f(x)},${f(y)} L${f(x)},${f(y - 90 * s)} C${f(x)},${f(y - 130 * s)} ${f(x + 70 * s)},${f(y - 130 * s)} ${f(x + 70 * s)},${f(y - 90 * s)} L${f(x + 70 * s)},${f(y)} Z" fill="#1c2028"/>`
        + `<path d="M${f(x + 4)},${f(y - 98 * s)} C${f(x + 12)},${f(y - 124 * s)} ${f(x + 58 * s)},${f(y - 124 * s)} ${f(x + 66 * s)},${f(y - 98 * s)}" stroke="#e6ebf2" stroke-width="5" fill="none" opacity=".7"/>`;
    }
    return svg(`<rect width="1600" height="900" fill="#5c6472"/><rect width="1600" height="420" fill="#7d8592" opacity=".6"/>
    <path d="M1300,560 L1300,260 M1300,360 L1200,250 M1300,330 L1420,220 M1300,290 L1260,200 M1360,270 L1400,180" stroke="#15171c" stroke-width="16" fill="none" stroke-linecap="round"/>
    <path d="M0,480 C400,450 1100,460 1600,490 L1600,900 L0,900 Z" fill="#c9d0da"/>
    ${stones}
    ${figure(760, 330, .82, 'man')}
    ${Array.from({ length: 16 }, (_, i) => `<rect x="${i * 100}" y="700" width="6" height="90" fill="#15171c"/>`).join('')}<rect x="0" y="720" width="1600" height="6" fill="#15171c"/>
    <path d="M0,780 L1600,770 L1600,900 L0,900 Z" fill="#e3e8ef"/>
    ${snow}`);
  }
};
