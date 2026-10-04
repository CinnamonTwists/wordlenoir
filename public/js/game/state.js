import { getPack } from '../content/registry.js';

// The current case. `S` is a live binding: importers always see the latest object after setState().
// Saved and restored through game/snapshot.js (roadmap F1): a new field must be added to its KEEP list to survive a reload.
export let S = {};
export const setState = s => { S = s; };

// The scene pack the current case draws from (loaded in main.js before the first case). F3's mode object replaces this.
export const pack = () => getPack('random');

// Scene ids already played this session, so they don't repeat until the pool is exhausted.
export const used = { intro: new Set(), core: new Set() };

// Test hooks, exposed on window.NOIR (see main.js).
export const DEBUG = { forceAnswer: null, forceInf: null };
