import { R } from '../core/util.js';
import { MOTION } from '../core/timing.js';
import { $ } from '../core/dom.js';

// Canvas rain. One instance, re-attached between the board canvas (#rain) and the cinema canvas (#crain).
export const RAIN = {
  cv: null, cx: null, drops: [], level: 0, target: 0, w: 0, h: 0,
  attach(cv) { this.cv = cv; this.cx = cv.getContext('2d'); this.resize(); },
  resize() { if (!this.cv) return; const d = Math.min(devicePixelRatio || 1, 2); this.w = this.cv.clientWidth; this.h = this.cv.clientHeight; this.cv.width = this.w * d; this.cv.height = this.h * d; this.cx.setTransform(d, 0, 0, d, 0, 0); },
  set(l) { this.target = { off: 0, window: 0, light: .35, heavy: 1 }[l] ?? 0; },
  frame() {
    this.level += (this.target - this.level) * .03;
    const want = Math.floor(this.level * (MOTION.reduced ? 120 : 420) * (this.w * this.h) / (1400 * 800));
    while (this.drops.length < want) this.drops.push(this.mk(true));
    if (this.drops.length > want) this.drops.length = want;
    const c = this.cx; if (!c) return; c.clearRect(0, 0, this.w, this.h);
    c.strokeStyle = 'rgba(200,212,235,.32)'; c.lineWidth = 1; c.beginPath();
    for (const d of this.drops) { c.moveTo(d.x, d.y); c.lineTo(d.x - d.l * .18, d.y + d.l); d.y += d.v; d.x -= d.v * .18; if (d.y > this.h) Object.assign(d, this.mk(false)); }
    c.stroke();
  },
  mk(any) { return { x: R() * (this.w + 200), y: any ? R() * this.h : -40, l: 12 + R() * 26, v: 14 + R() * 12 }; }
};

export function startRain() {
  (function loop() { RAIN.frame(); requestAnimationFrame(loop); })();
  addEventListener('resize', () => RAIN.resize());
}

// Film grain overlay on #grain.
export function startGrain() {
  const g = $('#grain'), c = g.getContext('2d'), img = c.createImageData(160, 100);
  let n = 0;
  setInterval(() => { if (MOTION.reduced && n++ % 4) return; for (let i = 0; i < img.data.length; i += 4) { const v = Math.random() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; } c.putImageData(img, 0, 0); }, 90);
}
