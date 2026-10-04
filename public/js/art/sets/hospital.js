import { rng, svg, f } from '../svg.js';
import { figure } from '../props.js';

// St. Jude's, a ward room in the early morning (Pop's interludes): grey light through blinds, an iron bed, a chair, a clock.
export default {
  rain: 'window',
  indoor: true,
  draw(v) {
    const r = rng(89);
    let blinds = '', drops = '';
    for (let y = 120; y < 470; y += 22) blinds += `<rect x="980" y="${y}" width="420" height="10" fill="#9aa6b8" opacity=".55"/>`;
    for (let i = 0; i < 30; i++) drops += `<circle cx="${f(990 + r() * 400)}" cy="${f(120 + r() * 340)}" r="${(1 + r() * 2).toFixed(1)}" fill="#dfe8ff" opacity=".35"/>`;
    return svg(`<rect width="1600" height="900" fill="#1a1d22"/>
    <rect x="0" y="0" width="1600" height="600" fill="#20242b"/>
    <rect x="980" y="110" width="420" height="370" fill="#6d7a8f"/>${drops}${blinds}<rect x="970" y="100" width="440" height="390" fill="none" stroke="#0e1014" stroke-width="18"/>
    <path d="M980,480 L760,900 L1500,900 L1400,480 Z" fill="#dfe8ff" opacity=".07"/>
    <rect x="200" y="140" width="6" height="60" fill="#3a3f48"/><rect x="186" y="150" width="34" height="6" fill="#3a3f48"/>
    <rect x="560" y="120" width="70" height="70" rx="35" fill="#e6e6e0" opacity=".8"/><path d="M595,155 L595,130 M595,155 L612,162" stroke="#1a1d22" stroke-width="3"/>
    <path d="M0,640 L1600,630 L1600,900 L0,900 Z" fill="#101215"/>
    <g fill="#0b0c0f"><rect x="160" y="500" width="560" height="90" rx="10"/><rect x="160" y="420" width="16" height="300"/><rect x="704" y="470" width="16" height="250"/></g>
    <rect x="176" y="470" width="528" height="40" rx="12" fill="#c9cdd2" opacity=".55"/><ellipse cx="250" cy="472" rx="70" ry="24" fill="#e6e8ea" opacity=".6"/>
    <rect x="800" y="300" width="8" height="380" fill="#0b0c0f"/><rect x="776" y="300" width="56" height="6" fill="#0b0c0f"/><rect x="788" y="306" width="30" height="60" rx="8" fill="#cfe0e8" opacity=".45"/>
    <rect x="860" y="560" width="120" height="16" fill="#0b0c0f"/><rect x="860" y="480" width="16" height="200" fill="#0b0c0f"/><rect x="964" y="576" width="16" height="104" fill="#0b0c0f"/>
    ${figure(470, 300, .9, 'woman')}
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".2"/>`);
  }
};
