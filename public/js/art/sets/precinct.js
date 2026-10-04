import { svg } from '../svg.js';
import { figure } from '../props.js';

export default {
  rain: 'off',
  indoor: true,
  ambience: 'precinct',
  draw(v) {
    const g = (v && v.GUESS) || '';
    return svg(`<rect width="1600" height="900" fill="#171a20"/>
    <rect x="0" y="560" width="1600" height="340" fill="#0f1116"/>${[260, 520, 1080, 1340].map(x => `<rect x="${x}" y="0" width="3" height="900" fill="#0c0e12"/>`).join('')}
    <rect x="1080" y="190" width="420" height="330" fill="#080b10" stroke="#040507" stroke-width="12"/><path d="M1110,200 L1220,200 L1120,510 L1090,510 Z" fill="#9fb4d8" opacity=".06"/>
    <g class="swing">
      <line x1="800" y1="0" x2="800" y2="240" stroke="#020203" stroke-width="4"/>
      <path d="M800,520 L470,780 L1130,780 Z" fill="url(#nCone)" opacity=".75"/>
      <path d="M748,300 L770,240 L830,240 L852,300 Z" fill="#050507"/><ellipse cx="800" cy="300" rx="52" ry="8" fill="#fff0c4"/>
      <circle cx="800" cy="300" r="190" fill="url(#nGlow)" opacity=".8"/>
      <path d="M760,300 L470,780 L1130,780 L840,300 Z" fill="url(#nCone)" opacity=".35"/>
    </g>
    <path d="M560,570 L560,486 C570,430 620,412 690,410 L910,410 C980,412 1030,430 1040,486 L1040,570 Z" fill="#050507"/><ellipse cx="800" cy="350" rx="42" ry="50" fill="#050507"/><path d="M772,316 C782,302 818,302 828,316" stroke="#ffe0a0" stroke-width="5" fill="none" opacity=".5"/>
    <path d="M470,550 L1130,550 L1190,690 L410,690 Z" fill="#0a0a0c"/><path d="M470,550 L1130,550 L1140,572 L460,572 Z" fill="#3a3326" opacity=".8"/>
    ${g ? `<g transform="translate(800 528) rotate(-3)"><rect x="-92" y="-26" width="184" height="52" fill="#ddd3bd"/><text x="0" y="12" text-anchor="middle" font-family="Special Elite, Courier New, monospace" font-size="34" letter-spacing="6" fill="#17140f">${g}</text></g>` : ''}
    <path d="M1100,620 L1150,760 M1260,620 L1230,760" stroke="#060608" stroke-width="12"/>
    ${figure(300, 300, 1.25, 'man')}
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".35"/>`);
  }
};
