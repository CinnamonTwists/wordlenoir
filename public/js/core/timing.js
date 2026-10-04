// Global pacing. Every scripted delay goes through sleep() so the whole game can be sped up
// for testing: open the page with #speed10 (or set NOIR.speed in the console).

const H = location.hash.slice(1);
export let SPEED = /^speed\d+$/.test(H) ? +H.slice(5) : 1;
export const setSpeed = v => { SPEED = v; };
export const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const VT = { ms: 0 };   // virtual time: total ms of scripted delay, independent of SPEED
export const sleep = ms => { VT.ms += ms; return new Promise(r => setTimeout(r, ms / SPEED)); };
