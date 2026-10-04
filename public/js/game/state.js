// The current case. `S` is a live binding: importers always see the latest object after setState().
// This is the natural place to hang save/load once persistence lands.
export let S = {};
export const setState = s => { S = s; };

// Scene ids already played this session, so they don't repeat until the pool is exhausted.
export const used = { intro: new Set(), core: new Set() };

// Test hooks, exposed on window.NOIR (see main.js).
export const DEBUG = { forceAnswer: null, forceInf: null };
