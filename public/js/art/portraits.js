import { f } from './svg.js';

// Dialogue portraits (bust) and the eye-band used in cut-ins.

export function bust(o) {
  const fl = '#050507', bw = o.build || 1, c = o.color || '#d9a441';
  let s = '';
  if (o.hair === 'long') s += `<path d="M62,104 C56,170 66,220 84,236 L136,236 C154,220 164,170 158,104 Z" fill="${fl}"/>`;
  s += `<path d="M${f(110 - 104 * bw)},262 C${f(110 - 100 * bw)},214 ${f(110 - 72 * bw)},194 76,186 L94,166 L126,166 L144,186 C${f(110 + 72 * bw)},194 ${f(110 + 100 * bw)},214 ${f(110 + 104 * bw)},262 Z" fill="${fl}"/>`;
  if (o.coat) s += `<path d="M86,188 L110,250 L134,188" fill="none" stroke="${c}" stroke-width="2" opacity=".5"/>`;
  if (o.hair === 'bob') s += `<path d="M64,98 C58,148 66,172 80,180 L140,180 C154,172 162,148 156,98 Z" fill="${fl}"/>`;
  s += `<ellipse cx="110" cy="118" rx="38" ry="47" fill="${fl}"/>`;
  if (o.hair === 'short') s += `<path d="M72,110 C68,72 92,62 110,62 C130,62 152,72 148,110 Z" fill="${fl}"/>`;
  if (o.hair === 'bun') s += `<circle cx="110" cy="62" r="20" fill="${fl}"/><path d="M72,108 C70,74 92,66 110,66 C130,66 150,74 148,108 Z" fill="${fl}"/>`;
  if (o.hat === 'fedora') s += `<path d="M74,88 C72,52 92,42 110,44 C130,42 148,52 146,88 Z" fill="${fl}"/><path d="M98,46 L110,58 L122,46" fill="none" stroke="#151518" stroke-width="3"/><rect x="74" y="78" width="72" height="8" fill="#16161a"/><ellipse cx="110" cy="90" rx="74" ry="12" fill="${fl}"/>`;
  if (o.hat === 'wide') s += `<path d="M78,82 C78,52 96,44 112,44 C130,44 144,54 142,80 Z" fill="${fl}"/><ellipse cx="102" cy="84" rx="96" ry="15" transform="rotate(-9 102 84)" fill="${fl}"/>`;
  if (o.hat === 'cap') s += `<path d="M70,98 C70,66 92,56 112,56 C136,56 152,68 154,92 L172,102 C150,108 100,108 70,98 Z" fill="${fl}"/>`;
  if (o.hat === 'scarf') s += `<path d="M64,124 C60,62 92,50 110,50 C130,50 160,62 156,124 L166,176 L140,152 L80,152 L54,176 Z" fill="${fl}"/><circle cx="72" cy="156" r="6" fill="${c}" opacity=".9"/><circle cx="148" cy="156" r="6" fill="${c}" opacity=".9"/>`;
  if (o.glasses) s += `<g fill="none" stroke="${c}" stroke-width="2.6" opacity=".95"><circle cx="94" cy="120" r="11"/><circle cx="126" cy="120" r="11"/><path d="M105,120 H115"/></g>`;
  if (o.cig) s += `<path d="M120,148 L158,141" stroke="#e9e3d6" stroke-width="3.6"/><circle cx="159" cy="141" r="3.4" fill="#ff7a2a"/>`;
  if (o.eyes) s += `<g fill="${c}" filter="url(#pGlow)"><ellipse cx="95" cy="114" rx="9" ry="3"/><ellipse cx="125" cy="114" rx="9" ry="3"/></g>`;
  return `<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg"><defs><filter id="pGlow" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>${s}</svg>`;
}
export function eyes(color, evil) {
  const eye = (cx) => evil
    ? `<path d="M${cx - 110},120 Q${cx},64 ${cx + 110},112 Q${cx},150 ${cx - 110},120 Z" fill="${color}" filter="url(#eGlow)"/>`
    : `<path d="M${cx - 110},122 Q${cx},58 ${cx + 110},116 Q${cx},162 ${cx - 110},122 Z" fill="#d9d2c2"/><circle cx="${cx + 6}" cy="114" r="34" fill="#1c1a17"/><circle cx="${cx + 6}" cy="114" r="15" fill="#000"/><circle cx="${cx + 18}" cy="102" r="7" fill="#fff"/>`;
  return `<svg viewBox="0 0 1600 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="eBand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset=".45" stop-color="${color}" stop-opacity=".35"/><stop offset=".8" stop-color="#000"/></linearGradient><filter id="eGlow" x="-20%" y="-100%" width="140%" height="300%"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <rect width="1600" height="220" fill="#050506"/><rect width="1600" height="220" fill="url(#eBand)"/>
  ${eye(630)}${eye(970)}
  <path d="M500,${evil ? 70 : 64} L760,${evil ? 92 : 80}" stroke="#000" stroke-width="26" stroke-linecap="round"/><path d="M1100,${evil ? 70 : 64} L840,${evil ? 92 : 80}" stroke="#000" stroke-width="26" stroke-linecap="round"/>
  <path d="M0,0 H1600 V58 Q800,30 0,58 Z" fill="#000"/></svg>`;
}
