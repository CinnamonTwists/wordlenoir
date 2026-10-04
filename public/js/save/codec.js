// Light obfuscation for answers in saves and exports (decision D6): enough that the solution isn't readable at a glance in
// devtools or an exported file. Not security: anyone determined can read the source. Each letter is shifted by a fixed salt,
// then the result is base64'd with a version tag.

const SALT = 'six suspects, one night, the 6:00 train';
const shift = (s, dir) => [...s].map((ch, i) => {
  const c = ch.charCodeAt(0) - 97; if (c < 0 || c > 25) return ch;
  return String.fromCharCode(97 + (c + dir * (SALT.charCodeAt(i % SALT.length) % 26) + 26) % 26);
}).join('');

export const hide = word => 'n1.' + btoa(shift(String(word), 1));
// Returns the original string, or null if `str` isn't something hide() produced.
export function reveal(str) {
  if (typeof str !== 'string' || !str.startsWith('n1.')) return null;
  try { return shift(atob(str.slice(3)), -1); } catch { return null; }
}
