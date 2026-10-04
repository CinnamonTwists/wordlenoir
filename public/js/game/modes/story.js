import { R, pick } from '../../core/util.js';
import { loadPack, getPack } from '../../content/registry.js';
import { chapterInfo, chapterVars } from '../../content/chapters/index.js';
import { NAMES_M, NAMES_F } from '../../content/names.js';
import { store } from '../../save/store.js';
import { hide, reveal } from '../../save/codec.js';
import { markSeen, winAttempt, loseAttempt, avoidFor, noteChapterStart, noteChapterResult } from '../../save/progress.js';
import { S, DEBUG } from '../state.js';
import { WORDS } from '../words.js';
import { informant } from '../informant.js';

// Story mode (roadmap T6): one chapter of the campaign, or a replay of one from Chapter Select (D2). Same interface as modes/random.js.
//
// A campaign chapter runs as an *attempt* (D1, save/progress.js): seen marks are staged until it's won, story flags (`~story`, kept in
// S.story) are committed only on a win, and a loss rolls the chapter back. The result is noted the moment the final guess is scored
// (attempt.outcome, so a reload can't dodge it), but the win/lose transition happens in clear(), after the ending scenes have played:
// the outro beats may still set story flags, and a lost attempt's ending scenes belong to that attempt.
//
// Retries play different scenes: every pick avoids campaign.usedScenes[chapter] (scenes from failed attempts) until a pool runs out.
// Replays never touch the campaign; their seen marks wait in memory and count only if the replay is won.

export const pickFresh = (list, avoid) => { const fresh = list.filter(x => !avoid.has(x.id)); return pick(fresh.length ? fresh : list); };

export function createStoryMode(chapter, { replay = false } = {}) {
  const P = () => getPack(chapter), info = chapterInfo(chapter);
  const avoid = () => (replay ? new Set() : avoidFor(store.get(), chapter));
  const withOpener = core => core.replace(/^@set (\w+)\s*$/m, (m, name) => { const o = P().openers?.[name]; return o ? `${m}\n${pick(o)}` : m; });
  const replayRun = { seen: [], outcome: null };
  const attempt = d => d.campaign?.attempt?.chapter === chapter ? d.campaign.attempt : null;

  return {
    id: replay ? 'replay' : 'story', chapter, replay,
    label: `Chapter ${chapter}: ${info.title}`,
    load: () => loadPack(chapter),
    pack: P,
    pickAnswer: () => DEBUG.forceAnswer || pick(WORDS.answers),
    newCase() {
      store.update(d => noteChapterStart(d, chapter));
      replayRun.seen = []; replayRun.outcome = null;
      return { intro: pickFresh(P().intros, avoid()), vars: {
        caseNo: String(1000 + Math.floor(R() * 9000)), date: info.date, victim: pick(NAMES_M), singer: pick(NAMES_F),
        pier: String(9 + Math.floor(R() * 40)), caseTitle: info.title, ...chapterVars(chapter)
      } };
    },
    // the campaign's flags as of this attempt's start (a replay borrows them read-only)
    storyFlags: () => structuredClone(store.get('campaign.storyFlags') || {}),
    introScript: cs => ({ segments: [{ id: cs.intro.id, src: cs.intro.s }, { id: P().tail.id, src: P().tail.s }] }),
    roundScript(g, b, ctx) {
      const core = pickFresh(P().cores[`${g}-${b}`], avoid()), inf = informant(g, b, ctx);
      const closer = `\n## {nextTime} | ${pick(P().closers[6 - g])}`;
      return { segments: inf ? [{ id: core.id, src: withOpener(core.s) }, { id: inf.id, src: inf.s + closer }] : [{ id: core.id, src: withOpener(core.s) + closer }] };
    },
    // win: climax, epilogue by guesses, then the outro beat by how close it was; loss: climax, epilogue by bucket, then the retelling
    endScript(won, g, b) {
      const E = won ? P().win : P().loss, av = avoid();
      const beat = won ? (g <= 2 ? 'fast' : g <= 4 ? 'slow' : 'near') : 'escaped';
      return { segments: [pickFresh(E.climax, av), pickFresh(E.epi[won ? g : b], av), pickFresh(P().beats[beat], av)].map(x => ({ id: x.id, src: x.s })) };
    },
    saved: () => (replay ? null : attempt(store.get())?.active ?? null),
    onCheckpoint: snap => { if (!replay) store.update(d => { const a = attempt(d); if (a) a.active = snap; }); },
    clear() {
      if (replay) { if (replayRun.outcome?.won) store.update(d => markSeen(d, replayRun.seen)); replayRun.outcome = null; return; }
      store.update(d => {
        const a = attempt(d); if (!a) return;
        if (!a.outcome) { a.active = null; return; }
        const o = a.outcome;
        if (o.won) {
          d.campaign.storyFlags = structuredClone(S.story || {});
          winAttempt(d, { guesses: o.guesses, answer: reveal(o.answer) });
          d.campaign.pendingInterlude = chapter < 10 ? chapter : null;
        } else loseAttempt(d);
      });
    },
    seen: ids => { if (replay) replayRun.seen.push(...ids); else store.update(d => markSeen(d, ids, { story: true })); },
    isSeen: id => !!store.get('seen')[id],
    onComplete({ won, guesses, answer }) {
      store.update(d => {
        noteChapterResult(d, { chapter, won, guesses });
        if (replay) replayRun.outcome = { won, guesses };
        else { const a = attempt(d); if (a) a.outcome = { won, guesses, answer: hide(answer) }; }
      });
    },
    // set by ui/campaign.js: what the report's main button does next
    next: null, nextLabel: null
  };
}
