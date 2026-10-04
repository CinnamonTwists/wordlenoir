// Speaking characters. Keys are what scripts use (`DASH: line`, `!!@DASH TEXT`).
// bust: options for ART portraits (hat, hair, build, coat, cig, glasses, eyes).
// sting (optional): a STINGS variant in audio/audio.js for this character's cut-ins. Without it, cut-ins pick a random low one.

export const CAST = {
  DASH:   { name: 'DASH LEXINGTON', color: '#d9a441', bust: { hat: 'fedora', cig: true, coat: true } },
  BRIGGS: { name: 'CAPTAIN BRIGGS', color: '#7f9cc7', bust: { hair: 'bald', build: 1.18, coat: true }, sting: 'brass' },
  VERA:   { name: 'VERA LEXINGTON', color: '#d97a90', bust: { hat: 'wide', hair: 'long' } },
  DOOLEY: { name: 'SGT. DOOLEY', color: '#7fb08a', bust: { hat: 'cap', build: 1.08 } },
  SAL:    { name: 'SAL', color: '#e0b25a', bust: { hair: 'bald', build: 1.25 } },
  ZERO:   { name: 'MADAME ZERO', color: '#b08be8', bust: { hat: 'scarf' } },
  PROF:   { name: 'THE PROFESSOR', color: '#d2c9a8', bust: { hair: 'short', glasses: true, build: .9 } },
  PETE:   { name: 'LUCKY PETE', color: '#e08a5a', bust: { hat: 'cap', build: .92 } },
  KOW:    { name: 'MRS. KOWALSKI', color: '#c0aca4', bust: { hair: 'bun', build: 1.1 } },
  FENN:   { name: 'DOC FENN', color: '#93c9c2', bust: { hair: 'bald', glasses: true } },
  WORD:   { name: 'THE WORD', color: '#ff2a35', bust: { hat: 'fedora', eyes: true, coat: true } },
  NICKEL: { name: 'NICKEL', color: '#e6d36a', bust: { hat: 'cap', build: .78 } },
  LOLA:   { name: 'LOLA VANCE', color: '#ff6f91', bust: { hair: 'bob' } }
};
