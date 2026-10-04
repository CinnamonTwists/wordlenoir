// Global pacing. Every scripted delay goes through sleep() so the whole game can be sped up
// for testing: open the page with #speed10 (or set NOIR.speed in the console).

const H = location.hash.slice(1);
export let SPEED = /^speed\d+$/.test(H) ? +H.slice(5) : 1;
export const setSpeed = v => { SPEED = v; };
export const VT = { ms: 0 };   // virtual time: total ms of scripted delay, independent of SPEED
export const sleep = ms => { VT.ms += ms; return new Promise(r => setTimeout(r, ms / SPEED)); };

// Player preferences the engine reads live (set from Settings by ui/settings.js; both reduce flags default to the OS).
// MOTION.reduced: no camera shake or drift, lighter rain and grain. FLASH.reduced: no white flashes or flicker.
export const OS_REDUCED = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
export const MOTION = { reduced: OS_REDUCED };
export const FLASH = { reduced: OS_REDUCED };
// TEXT.type scales typewriter speed (0 = print instantly) and TEXT.hold scales how long text stays up. Separate from SPEED.
export const TEXT = { type: 1, hold: 1, blips: true };
export const TEXT_SPEEDS = { slow: { type: 1.6, hold: 1.35 }, normal: { type: 1, hold: 1 }, fast: { type: .5, hold: .8 }, instant: { type: 0, hold: .7 } };
