import { svg } from '../svg.js';
import { figure } from '../props.js';

export default {
  rain: 'off',
  indoor: true,
  ambience: null,
  draw(v) {
    return svg(`<rect width="1600" height="900" fill="#000"/>
    <path d="M760,0 L840,0 L1060,800 L540,800 Z" fill="url(#nCone)" opacity=".5"/>
    <ellipse cx="800" cy="800" rx="270" ry="40" fill="#ffe0a0" opacity=".22" filter="url(#nBlur6)"/>
    ${figure(800, 350, 1, 'man')}`);
  }
};
