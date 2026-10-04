import { rng, svg, f } from '../svg.js';
import { figure } from '../props.js';

// The ballpark bleachers on a grey afternoon (Nora and Tommy's interlude): the grandstand roof, a hand-turned scoreboard, the green below.
export default {
  rain: 'off',
  indoor: false,
  draw(v) {
    const r = rng(137);
    let crowd = '';
    for (let y = 250; y < 470; y += 28) for (let x = 20; x < 1580; x += 24) if (r() < .55) crowd += `<circle cx="${f(x + r() * 8)}" cy="${f(y + r() * 6)}" r="8" fill="${['#2a2622', '#3a3028', '#1e1c1a', '#4a3a2a'][Math.floor(r() * 4)]}"/>`;
    return svg(`<rect width="1600" height="900" fill="#8d96a3"/><rect width="1600" height="300" fill="#b6bcc4" opacity=".5"/>
    <path d="M0,160 L1600,120 L1600,180 L0,220 Z" fill="#2a2d33"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${60 + i * 200}" y="${f(170 - i * 5)}" width="14" height="${f(300 + i * 5)}" fill="#2a2d33"/>`).join('')}
    <rect x="0" y="230" width="1600" height="250" fill="#5d6068"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="0" y="${250 + i * 28}" width="1600" height="4" fill="#45474e"/>`).join('')}${crowd}
    <rect x="0" y="480" width="1600" height="40" fill="#2b2e33"/><rect x="0" y="520" width="1600" height="380" fill="#3e6a3a"/><path d="M0,620 C500,580 1100,580 1600,620 L1600,900 L0,900 Z" fill="#8a6a44" opacity=".55"/>
    <rect x="1200" y="40" width="320" height="140" fill="#1e3a24"/><text x="1360" y="80" text-anchor="middle" font-family="Big Shoulders Display, sans-serif" font-weight="900" font-size="24" letter-spacing="6" fill="#e9e3cf">VISITORS · HOME</text>
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${1220 + i * 42}" y="100" width="34" height="56" fill="#e9e3cf" opacity="${i < 5 ? .85 : .3}"/>`).join('')}
    ${figure(640, 380, .62, 'man')}${figure(730, 420, .42, 'man')}
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".15"/>`);
  }
};
