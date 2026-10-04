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
  LOLA:   { name: 'LOLA VANCE', color: '#ff6f91', bust: { hair: 'bob' } },
  // story mode (docs/story/bible.md §5)
  RUTH:   { name: 'RUTH ABERNATHY', color: '#c8c2b4', bust: { hair: 'bun', glasses: true, build: .95 } },
  POP:    { name: 'POP LEXINGTON', color: '#9fb4c9', bust: { hair: 'bald', build: 1.05, coat: true } },
  NORA:   { name: 'NORA HEALY', color: '#e0a07a', bust: { hair: 'long', build: .92 } },
  PELL:   { name: 'LINUS PELL', color: '#c9b98f', bust: { hair: 'short', glasses: true, build: .88 } },
  FOREMAN: { name: 'THE FOREMAN', color: '#a89a84', bust: { hat: 'cap', build: 1.22, cig: true } },   // the Gazette's press foreman (ch 1 bit part)
  TOMMY:  { name: 'TOMMY HEALY', color: '#f0c27a', bust: { hat: 'cap', build: .7 } },
  WALT:   { name: 'WALT KESSLER', color: '#a9b8a0', bust: { hat: 'fedora', glasses: true, build: 1.04 } },
  MAGS:   { name: 'MAGS DELGADO', color: '#7fd0c8', bust: { hair: 'bob', glasses: true, build: .94 } },
  EDDIE:  { name: 'EDDIE RUIZ', color: '#d9b36a', bust: { hat: 'cap', build: 1.16 } },
  PENNY:  { name: 'OFFICER ASHCROFT', color: '#9fb0d9', bust: { hat: 'cap', hair: 'bun', build: .9 } },
  // chapters 3–10's culprits (docs/story/bible.md §6; Lola Vance, ch 9, is LOLA above)
  GUS:    { name: 'GUS FAIRWEATHER', color: '#b7a6c9', bust: { hair: 'bald', glasses: true, build: 1.05, coat: true } },
  CELESTE: { name: 'CELESTE AVERY', color: '#e07a8f', bust: { hair: 'long', cig: true } },
  BRANDT: { name: 'TOMAS BRANDT', color: '#8fb0c9', bust: { hat: 'fedora', coat: true, build: .95 } },
  PIKE:   { name: 'WENDELL PIKE', color: '#c9a35a', bust: { hat: 'cap', build: 1.15 } },
  QUIST:  { name: 'MIRABEL QUIST', color: '#9fc98f', bust: { hair: 'bob', glasses: true } },
  GREY:   { name: 'SILAS GREY', color: '#a0a0a8', bust: { hair: 'short', build: .9, coat: true } },
  THORNE: { name: 'ELLERY THORNE', color: '#d8d8d8', bust: { hat: 'fedora', coat: true }, sting: 'minor' },
  // bit parts
  WARDEN: { name: 'THE WARDEN', color: '#8d94a3', bust: { hair: 'bald', build: 1.2, coat: true } },
  ROSA:   { name: 'ROSA RUIZ', color: '#e0a0b0', bust: { hat: 'scarf', build: .9 } },
  DELLA:  { name: 'DELLA MARSH', color: '#d49a7a', bust: { hair: 'bun', build: 1.12 } }
};
