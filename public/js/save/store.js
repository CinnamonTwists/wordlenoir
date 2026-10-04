// Browser persistence (roadmap F1): the whole save is one JSON document under one localStorage key. Everything goes through
// load(), get(path), update(fn) and reset(). Writes are debounced; main.js flushes on pagehide. Every storage call is guarded:
// if storage is blocked (private mode, sandboxed iframe) or full, the game keeps running on the in-memory copy and
// `status.persistent` turns false so the UI can say progress won't be kept. DOM-free: nothing touches storage until load().
import { VERSION, defaults, migrate } from './schema.js';

export const KEY = 'wordlenoir.save';

export function createStore({ storage = () => globalThis.localStorage, key = KEY, debounceMs = 300, now = () => Date.now() } = {}) {
  let doc = null, timer = null, dirty = false, ls = null;
  const listeners = new Set();
  // reason: null | 'blocked' (no storage) | 'quota' (a write failed) | 'future' (save is from a newer build; left untouched)
  const status = { persistent: true, reason: null, recovered: null };
  const setStatus = (persistent, reason) => {
    if (status.persistent === persistent && status.reason === reason) return;
    status.persistent = persistent; status.reason = reason; listeners.forEach(f => f(status));
  };

  function write() {
    clearTimeout(timer); timer = null;
    if (!dirty || !ls || status.reason === 'future' || status.reason === 'blocked') return;
    try { doc.updatedAt = now(); ls.setItem(key, JSON.stringify(doc)); dirty = false; if (!status.persistent) setStatus(true, null); }
    catch { setStatus(false, 'quota'); }
  }

  const S = {
    status,
    onStatus(f) { listeners.add(f); return () => listeners.delete(f); },
    // Reads (or creates) the save. Safe to call again: it re-reads storage.
    load() {
      clearTimeout(timer); timer = null; dirty = false; status.recovered = null;
      try { ls = storage(); ls.getItem(key); } catch { ls = null; }
      if (!ls) { doc = defaults(now()); setStatus(false, 'blocked'); return doc; }
      let raw = null; try { raw = ls.getItem(key); } catch { /* treated as empty */ }
      if (raw == null) { doc = defaults(now()); dirty = true; }
      else {
        let parsed;
        try { parsed = JSON.parse(raw); } catch { parsed = undefined; }
        if (parsed?.v > VERSION) { doc = defaults(now()); setStatus(false, 'future'); return doc; }
        try { doc = migrate(parsed); dirty = parsed.v !== VERSION; }
        catch {
          // unreadable: keep a copy next to it rather than losing it, then start fresh
          const backup = `${key}.corrupt.${now()}`;
          try { ls.setItem(backup, raw); status.recovered = backup; } catch { /* nowhere to put it */ }
          doc = defaults(now()); dirty = true;
        }
      }
      // a write probe catches browsers that allow reads but refuse writes
      try { ls.setItem(key + '.probe', '1'); ls.removeItem(key + '.probe'); setStatus(true, null); } catch { setStatus(false, 'blocked'); }
      if (dirty) write();
      return doc;
    },
    // get('settings.music') → value; get() → the whole document. Treat results as read-only: change things through update().
    get(path) {
      if (!doc) S.load();
      return path ? path.split('.').reduce((o, k) => o?.[k], doc) : doc;
    },
    // update(d => { d.seen[id] = 1; }) mutates in place; returning an object replaces the document.
    update(fn) {
      if (!doc) S.load();
      const r = fn(doc); if (r && typeof r === 'object') doc = r;
      dirty = true;
      if (!timer) timer = setTimeout(write, debounceMs);
      return doc;
    },
    flush: write,
    // Swaps in a whole, already-validated document (an import, roadmap T4) and writes it at once. Returns false if it can't be kept.
    replace(next) {
      if (!doc) S.load();
      doc = next; dirty = true; write();
      return status.persistent && !dirty;
    },
    // Wipes the save (Settings → Clear all data). Also clears corrupt-file backups.
    reset() {
      clearTimeout(timer); timer = null;
      if (ls && status.reason !== 'blocked') try {
        for (let i = ls.length - 1; i >= 0; i--) { const k = ls.key(i); if (k === key || k?.startsWith(key + '.')) ls.removeItem(k); }
      } catch { /* nothing to clear */ }
      if (status.reason === 'future') setStatus(true, null);
      doc = defaults(now()); dirty = true; write();
      return doc;
    }
  };
  return S;
}

// The game's store. main.js calls store.load() at boot.
export const store = createStore();
