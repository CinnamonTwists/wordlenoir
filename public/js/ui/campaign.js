import { $ } from '../core/dom.js';
import { AU } from '../audio/audio.js';
import { play } from '../cinema/player.js';
import { loadPack } from '../content/registry.js';
import { chapterInfo, chapterVars, isWritten } from '../content/chapters/index.js';
import { ENDING_NAMES } from '../content/endings/names.js';
import { store } from '../save/store.js';
import { markSeen, newCampaign, beginAttempt, interludeTier, threadTiers, endingFor, endingVars, noteRunFinished } from '../save/progress.js';
import { setMode } from '../game/state.js';
import { toast } from '../game/board.js';
import { newCase, resumeCase, skipPolicy } from '../game/game.js';
import { restore } from '../game/snapshot.js';
import { createStoryMode } from '../game/modes/story.js';
import { show } from './screens.js';

// The campaign (roadmap T6): New Game, Continue, chapter → interlude → next chapter, the retelling after a loss (D1),
// Chapter Select replays (D2), and the ending (T7). The board work itself is the session runner (game/game.js) driven by a story mode.

let enterGame = async fn => fn();
export function initCampaign(opts) { enterGame = opts.enterGame; }

const campaign = () => store.get('campaign');
// A run in progress (one that hasn't reached its ending).
export const hasRun = () => { const c = campaign(); return !!c && !c.finished; };
const isSeen = id => !!store.get('seen')[id];

export async function newGame() {
  store.update(d => { newCampaign(d); beginAttempt(d); });
  await startChapter(1);
}

// Picks the run up wherever it stopped: the morning after a won chapter, inside a case, or at the start of a night.
export async function continueGame() {
  const c = campaign(); if (!c || c.finished) return;
  if (c.pendingInterlude) await playInterlude(c.pendingInterlude);
  const ch = campaign().chapter;
  if (ch > 10) return playEnding();
  await startChapter(ch);
}

async function startChapter(n) {
  if (!isWritten(n)) { show('menu'); toast(`Chapter ${n}, "${chapterInfo(n).title}", is still at the typist. Your run is saved right here.`); return; }
  store.update(d => { if (d.campaign.attempt?.chapter !== n) beginAttempt(d); });
  const m = createStoryMode(n);
  m.next = s => (s.won ? afterWin(n) : newCase());   // a loss is retold: the same chapter, a new attempt, different scenes
  m.nextLabel = s => (s.won ? (n < 10 ? `Next: Chapter ${n + 1}` : 'The verdict') : 'Tell it again');
  try { await m.load(); } catch { toast('That chapter\'s file didn\'t arrive. Check your connection and try again.'); return; }
  await enterGame(() => { setMode(m); if (!resumeCase()) newCase(); });
}

async function afterWin(n) {
  $('#report').hidden = true;
  if (campaign().pendingInterlude === n) await playInterlude(n);
  if (n >= 10) return playEnding();
  await startChapter(n + 1);
}

// The day after chapter n (docs/story/bible.md §7): the variant depends on when Dash got home, which is how many guesses it took.
async function playInterlude(n) {
  const pack = await loadPack(n), r = campaign().results.find(x => x.chapter === n);
  const sc = pack.interlude?.[interludeTier(r).tier]?.[0];
  if (sc) {
    await play([{ id: sc.id, src: sc.s }], { vars: chapterVars(n), flags: {}, story: structuredClone(campaign().storyFlags) },
      { skip: id => skipPolicy(id, isSeen), onSegment: id => store.update(d => markSeen(d, [id])) });
    AU.setMusic('calm');
  }
  store.update(d => { d.campaign.pendingInterlude = null; });
}

// After chapter 10: the band (or the egg) plus the four life codas, then the run is closed and the ending unlocked.
export async function playEnding() {
  const c = campaign(), ending = endingFor(c.results);
  try { await runEnding(ending, c.results, structuredClone(c.storyFlags)); }
  catch { toast('The last pages didn\'t arrive. Check your connection; your run is saved.'); show('menu'); return null; }
  store.update(d => { noteRunFinished(d, ending, d.campaign.results); d.campaign.finished = ending; });
  show('menu'); toast(`Ending found: ${ENDING_NAMES[ending]}.`);
  return ending;
}

// Plays an ending's scenes as segments: each is marked seen when it finishes, so a replay can skip it.
async function runEnding(ending, results, story) {
  const { endingScenes } = await import('../content/endings/index.js');
  const scenes = endingScenes(ending, threadTiers(results));
  await play(scenes.map(x => ({ id: x.id, src: x.s })), { vars: endingVars(ending, results), flags: {}, story },
    { skip: id => skipPolicy(id, isSeen), onSegment: id => store.update(d => markSeen(d, [id])) });
  AU.setMusic('calm');
}

// Chapter Select: replay an ending you've found, with the life of the run that found it if that's the current run, else a middling one.
export async function replayEnding(ending) {
  const c = campaign(), own = c?.finished === ending && c.results.length === 10;
  const results = own ? c.results : Array.from({ length: 10 }, (_, i) => ({ chapter: i + 1, guesses: 3, attempts: 1 }));
  try { await runEnding(ending, results, own ? structuredClone(c.storyFlags) : {}); }
  catch { toast('The last pages didn\'t arrive. Check your connection.'); }
  show('chapters');
}

// Chapter Select (D2): a replay never touches the run, only best results and the dossier.
export async function startReplay(n) {
  const m = createStoryMode(n, { replay: true });
  m.next = () => newCase(); m.nextLabel = () => 'Play it again';
  try { await m.load(); } catch { toast('That chapter\'s file didn\'t arrive. Check your connection and try again.'); return; }
  await enterGame(() => { setMode(m); newCase(); });
}

// For the menu's Continue line.
export function campaignSummary() {
  const c = campaign(); if (!c || c.finished) return null;
  if (c.pendingInterlude) return `Chapter ${c.pendingInterlude} closed · the morning after`;
  const info = chapterInfo(c.chapter), s = c.attempt?.active ? restore(c.attempt.active) : null;
  const where = !isWritten(c.chapter) ? 'coming soon' : s ? `suspect ${Math.min(s.guesses.length + 1, 6)} of 6` : c.attempt?.n > 1 ? `telling it again (attempt ${c.attempt.n})` : 'the night begins';
  return `Chapter ${c.chapter}: ${info.title} · ${where}`;
}
