// The current case. `S` is a live binding: importers always see the latest object after setState().
// Saved and restored through game/snapshot.js (roadmap F1): a new field must be added to its KEEP list to survive a reload.
export let S = {};
export const setState = s => { S = s; };

// The active mode (game/modes/*.js): where scenes come from, how they're picked, where the case is saved. Set before a case starts.
export let mode = null;
export const setMode = m => { mode = m; };
// The active mode's scene pack.
export const pack = () => mode.pack();

// Scene ids already played this session, so they don't repeat until the pool is exhausted.
export const used = { intro: new Set(), core: new Set() };

// Test hooks, exposed on window.NOIR (see main.js).
export const DEBUG = { forceAnswer: null, forceInf: null };
