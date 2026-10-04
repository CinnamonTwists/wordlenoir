import { svg } from '../svg.js';
import { smoke } from '../props.js';

// Pop's kitchen (Pop's interludes): daylight through a lace curtain, an oilcloth table, a pair of old police shoes and a polish tin, a kettle.
export default {
  rain: 'off',
  indoor: true,
  ambience: 'kitchen',
  draw(v) {
    let check = '';
    for (let x = 420; x < 1180; x += 38) for (let y = 610; y < 650; y += 19) if (((x - 420) / 38 + (y - 610) / 19) % 2 < 1) check += `<rect x="${x}" y="${y}" width="38" height="19" fill="#2f4a6a" opacity=".55"/>`;
    return svg(`<rect width="1600" height="900" fill="#2a241c"/>
    <rect x="0" y="0" width="1600" height="560" fill="#3a3226"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<rect x="${i * 160}" y="0" width="80" height="560" fill="#40382a" opacity=".5"/>`).join('')}
    <rect x="1040" y="90" width="380" height="330" fill="#cfd8e0"/><rect x="1040" y="90" width="380" height="330" fill="url(#nBeam)" opacity=".6"/>
    <path d="M1040,90 C1080,200 1060,300 1090,420 L1040,420 Z M1420,90 C1380,200 1400,300 1370,420 L1420,420 Z" fill="#efe9da" opacity=".7"/>
    <rect x="1226" y="90" width="8" height="330" fill="#2a241c"/><rect x="1040" y="252" width="380" height="8" fill="#2a241c"/><rect x="1030" y="80" width="400" height="350" fill="none" stroke="#1e1912" stroke-width="18"/>
    <path d="M1040,420 L760,900 L1500,900 L1420,420 Z" fill="#fff6dc" opacity=".08"/>
    <rect x="180" y="300" width="130" height="90" rx="20" fill="#6a6a6a"/><path d="M310,330 C350,320 360,300 370,290" stroke="#6a6a6a" stroke-width="12" fill="none"/>${smoke(240, 300)}
    <rect x="140" y="390" width="360" height="20" fill="#1e1912"/>
    <path d="M0,660 L1600,650 L1600,900 L0,900 Z" fill="#17120c"/>
    <rect x="400" y="600" width="800" height="54" fill="#d8d0bc"/>${check}<rect x="440" y="654" width="18" height="230" fill="#1e1912"/><rect x="1142" y="654" width="18" height="230" fill="#1e1912"/>
    <path d="M620,590 C620,560 700,556 740,570 L760,598 L620,600 Z" fill="#0a0907"/><path d="M770,592 C770,562 850,558 890,572 L910,600 L770,602 Z" fill="#0a0907"/>
    <ellipse cx="700" cy="572" rx="22" ry="5" fill="#fff" opacity=".35"/><ellipse cx="850" cy="574" rx="22" ry="5" fill="#fff" opacity=".35"/>
    <ellipse cx="990" cy="592" rx="34" ry="12" fill="#b08a3a"/><ellipse cx="990" cy="586" rx="34" ry="10" fill="#d4ad55"/>
    <rect width="1600" height="900" fill="url(#nFog)" opacity=".12"/>`);
  }
};
