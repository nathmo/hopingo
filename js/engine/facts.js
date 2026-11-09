// Memory of single number facts (7 × 8, 13², 8 + 5…), used by the times
// tables and mental arithmetic. Each fact is a card in a Leitner system:
//   box 0  new or just missed: comes back in the same lesson
//   box 1  right but slow: not automatic yet, back soon
//   box 2+ right and fast: spaced out over days (1, 3, 8, 21)
// A fact counts as automatic from box 2. Response time is measured but
// never shown to the student.

import { now, DAY } from './time.js';

const MIN = 60 * 1000;
const DUE_AFTER = [0, 10 * MIN, DAY, 3 * DAY, 8 * DAY, 21 * DAY];
export const AUTOMATIC_BOX = 2;
// Share of questions taken from facts already known, so a lesson mixes a few
// new or fragile facts into many easy ones (incremental rehearsal).
const KNOWN_SHARE = 0.7;

export function factState(profile, key) {
  profile.facts ||= {};
  return (profile.facts[key] ||= { box: 0, due: 0, seen: 0, ok: 0, miss: 0, rt: null });
}

export function recordFact(profile, key, correct, rtSec, fluentSec) {
  const s = factState(profile, key);
  const t = now();
  s.seen += 1;
  if (!correct) {
    s.box = 0;
    s.miss += 1;
  } else {
    s.ok += 1;
    s.rt = Math.round(rtSec * 10) / 10;
    if (rtSec <= fluentSec) s.box = Math.min(5, s.box + 1);
    else s.box = Math.max(1, Math.min(s.box, AUTOMATIC_BOX)); // right but slow: not automatic yet
  }
  s.due = t + DUE_AFTER[s.box];
  return s;
}

export const isAutomatic = (profile, key) => (profile.facts?.[key]?.box ?? 0) >= AUTOMATIC_BOX;

// Chooses the next fact among candidates ({fact} objects). Mostly known
// facts, with a weak one (missed, slow, due, or new) now and then; missed
// facts come before brand-new ones.
export function pickFact(profile, cands, rng) {
  const t = now();
  const st = (c) => profile.facts?.[c.fact];
  const weak = cands.filter((c) => { const s = st(c); return !s || s.box < AUTOMATIC_BOX || s.due <= t; });
  const known = cands.filter((c) => !weak.includes(c));
  if (known.length && (!weak.length || rng.chance(KNOWN_SHARE))) return rng.pick(known);
  const rank = (c) => { const s = st(c); return s ? s.box - (s.miss ? 1 : 0) : 1.5; };
  const sorted = [...weak].sort((a, b) => rank(a) - rank(b));
  return rng.pick(sorted.slice(0, 3));
}
