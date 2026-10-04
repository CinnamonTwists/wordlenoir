// Export and import of the save document (roadmap T4). DOM-free: the Settings screen does the downloading, copying and file picking.
// An export is the save document plus { app: 'wordle-noir', exportedAt }. Answers inside it are already obfuscated (D6).
// Imports are parsed, migrated and validated completely before anything is written, so a bad file never half-applies.
import { VERSION, migrate } from './schema.js';

export const APP = 'wordle-noir';

export function exportText(doc, now = Date.now()) {
  return JSON.stringify({ app: APP, exportedAt: new Date(now).toISOString(), ...doc }, null, 2);
}
export const exportName = (now = Date.now()) => `wordle-noir-save-${new Date(now).toISOString().slice(0, 10)}.json`;

const isCount = n => Number.isInteger(n) && n >= 0;

// Returns { doc, summary, exportedAt }, or throws an Error whose message can be shown to the player.
export function parseImport(text) {
  let o;
  try { o = JSON.parse(String(text).trim()); } catch { throw new Error('That isn\'t a case file. It doesn\'t read as JSON.'); }
  if (!o || typeof o !== 'object' || Array.isArray(o)) throw new Error('That isn\'t a case file.');
  if (o.app !== APP) throw new Error('That file isn\'t from Wordle Noir.');
  if (Number.isInteger(o.v) && o.v > VERSION) throw new Error('That file is from a newer edition of the game. Update the game first.');
  const { app, exportedAt, ...rest } = o;
  let doc;
  try { doc = migrate(rest); } catch (e) { throw new Error(`That case file is damaged: ${e.message}.`); }
  // migrate() quietly repairs mistyped fields for a local save; an import is held to a stricter standard
  const st = rest.random?.stats;
  if (st !== undefined) {
    const ok = st && isCount(st.played) && isCount(st.won) && st.won <= st.played && isCount(st.streak) && isCount(st.best)
      && Array.isArray(st.dist) && st.dist.length === 6 && st.dist.every(isCount);
    if (!ok) throw new Error('That case file is damaged: the Random Case record doesn\'t add up.');
  }
  if (rest.seen !== undefined && (typeof rest.seen !== 'object' || Array.isArray(rest.seen) || Object.values(rest.seen).some(v => v !== 1)))
    throw new Error('That case file is damaged: the list of seen scenes is malformed.');
  return { doc, summary: summarize(doc), exportedAt: typeof exportedAt === 'string' ? exportedAt : null };
}

// "Chapter 6 in progress · 214 scenes seen · 31 random cases"
export function summarize(doc) {
  const parts = [], c = doc.campaign, st = doc.random.stats;
  if (c) parts.push(c.chapter > 10 ? 'Story finished' : `Chapter ${c.chapter} in progress`);
  const n = Object.keys(doc.seen).length;
  parts.push(`${n} ${n === 1 ? 'scene' : 'scenes'} seen`);
  parts.push(`${st.played} random ${st.played === 1 ? 'case' : 'cases'}${st.played ? ` (${st.won} closed)` : ''}`);
  if (doc.random.active) parts.push('a case open');
  return parts.join(' · ');
}
