// Word lists live in /data/words as plain text, one word per line (blank lines and # comments ignored).
//   answers.txt  words that can be the solution
//   allowed.txt  extra words accepted as guesses (answers are always accepted too)

export const WORDS = { answers: [], allowed: new Set() };

export const parseWordList = text => text.split('\n').map(s => s.trim().toLowerCase()).filter(s => /^[a-z]{5}$/.test(s));

async function fetchList(file) {
  const res = await fetch(new URL(`../../data/words/${file}`, import.meta.url));
  if (!res.ok) throw new Error(`Could not load ${file} (${res.status})`);
  return parseWordList(await res.text());
}

export async function loadWords() {
  const [answers, extra] = await Promise.all([fetchList('answers.txt'), fetchList('allowed.txt')]);
  WORDS.answers = answers;
  WORDS.allowed = new Set(extra); answers.forEach(w => WORDS.allowed.add(w));
  return WORDS;
}
