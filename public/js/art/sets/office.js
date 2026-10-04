import { rng, svg } from '../svg.js';
import { skyline, figure, smoke, rainStreaks } from '../props.js';

export default {
  rain: 'window',
  indoor: true,
  ambience: 'office',
  draw(v) {
    const r = rng(11);
    let slats = '', stripes = '';
    for (let y = 118; y < 580; y += 26) slats += `<rect x="568" y="${y}" width="504" height="12" fill="#0a0a0d" opacity=".9"/>`;
    for (let k = 0; k < 11; k++) stripes += `<polygon points="1120,${170 + k * 40} 1600,${120 + k * 48} 1600,${140 + k * 48} 1120,${184 + k * 40}"/>`;
    return svg(`<rect width="1600" height="900" fill="#0f0f13"/>
    <rect x="560" y="110" width="520" height="470" fill="url(#nSky)"/>
    <svg x="560" y="110" width="520" height="470" viewBox="560 110 520 470">${skyline(r, 580, 360, '#06070b', .14, 40, 110)}</svg>
    ${rainStreaks(r, 560, 110, 520, 470, 70)}
    ${slats}
    <rect x="560" y="110" width="520" height="470" fill="none" stroke="#030304" stroke-width="20"/><rect x="816" y="110" width="9" height="470" fill="#030304"/>
    <g fill="#ffd98a" opacity=".07">${stripes}</g>
    <rect x="110" y="160" width="270" height="600" fill="#0a0a0d" stroke="#040405" stroke-width="10"/>
    <rect x="146" y="196" width="198" height="250" fill="#2c2e36" opacity=".75"/>
    <g transform="translate(245 0) scale(-1 1)" font-family="Special Elite, Courier New, monospace" text-anchor="middle" fill="#09090c" opacity=".8"><text x="0" y="300" font-size="26">HOMICIDE</text><text x="0" y="336" font-size="16">DET. D. LEXINGTON</text></g>
    <circle cx="356" cy="470" r="9" fill="#26231d"/>
    ${figure(820, 236, 1.05, 'man')}
    <path d="M0,690 L1600,668 L1600,900 L0,900 Z" fill="#050507"/><path d="M0,690 L1600,668" stroke="#4a3b24" stroke-width="3" opacity=".7"/>
    <circle cx="300" cy="610" r="260" fill="url(#nGlow)" opacity=".7"/>
    <path d="M262,686 L338,686 L330,674 L270,674 Z" fill="#06070a"/><rect x="296" y="600" width="8" height="74" fill="#06070a"/>
    <path d="M232,608 C240,580 360,580 368,608 Z" fill="#163a24"/><path d="M240,608 L360,608 L460,700 L140,700 Z" fill="url(#nCone)" opacity=".5"/>
    <rect x="1210" y="590" width="34" height="86" rx="6" fill="#06070a"/><rect x="1220" y="560" width="14" height="34" fill="#06070a"/><rect x="1256" y="640" width="30" height="36" fill="#0d1010" opacity=".9"/>
    <path d="M1360,676 L1370,650 L1460,650 L1470,676 Z" fill="#06070a"/><path d="M1376,650 C1376,630 1454,630 1454,650" fill="none" stroke="#06070a" stroke-width="10"/>
    <ellipse cx="1080" cy="676" rx="44" ry="10" fill="#08080a"/><circle cx="1098" cy="670" r="3" fill="#ff6a2a"/>${smoke(1098, 664)}
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".25"/>`);
  }
};
