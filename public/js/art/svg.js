// Shared SVG plumbing for every set: seeded RNG, gradient/filter defs, and the 1600x900 wrapper.

export function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export const DEFS = `
<linearGradient id="nSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#03040a"/><stop offset=".62" stop-color="#121829"/><stop offset="1" stop-color="#2b3046"/></linearGradient>
<radialGradient id="nGlow"><stop offset="0" stop-color="#ffd98a" stop-opacity=".9"/><stop offset=".3" stop-color="#ffc760" stop-opacity=".28"/><stop offset="1" stop-color="#ffc760" stop-opacity="0"/></radialGradient>
<radialGradient id="nGlowR"><stop offset="0" stop-color="#ff4a5a" stop-opacity=".8"/><stop offset=".35" stop-color="#ff4a5a" stop-opacity=".22"/><stop offset="1" stop-color="#ff4a5a" stop-opacity="0"/></radialGradient>
<linearGradient id="nCone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe0a0" stop-opacity=".5"/><stop offset="1" stop-color="#ffe0a0" stop-opacity="0"/></linearGradient>
<linearGradient id="nBeam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#dfe8ff" stop-opacity=".28"/><stop offset="1" stop-color="#dfe8ff" stop-opacity="0"/></linearGradient>
<linearGradient id="nFog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8f9ab3" stop-opacity="0"/><stop offset=".55" stop-color="#8f9ab3" stop-opacity=".24"/><stop offset="1" stop-color="#8f9ab3" stop-opacity="0"/></linearGradient>
<linearGradient id="nWet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#161a26"/><stop offset="1" stop-color="#040508"/></linearGradient>
<linearGradient id="nWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2234"/><stop offset="1" stop-color="#020306"/></linearGradient>
<radialGradient id="nMoon"><stop offset="0" stop-color="#f6f2e6"/><stop offset=".75" stop-color="#e6e0cd"/><stop offset="1" stop-color="#e6e0cd" stop-opacity="0"/></radialGradient>
<radialGradient id="nHalo"><stop offset="0" stop-color="#cfd6e6" stop-opacity=".38"/><stop offset="1" stop-color="#cfd6e6" stop-opacity="0"/></radialGradient>
<filter id="nBlur6" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
<filter id="nBlur18" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
<filter id="nNeon" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<pattern id="nBrick" width="64" height="32" patternUnits="userSpaceOnUse"><rect width="64" height="32" fill="#191311"/><path d="M0,16H64M32,0V16M0,16V32M64,16V32M0,0H64" stroke="#080605" stroke-width="3"/></pattern>`;
export const svg = (inner, extra = '') => `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs>${DEFS}${extra}</defs>${inner}</svg>`;
export const f = n => Math.round(n);
