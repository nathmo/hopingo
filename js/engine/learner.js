// The learner model. Pure functions over a plain profile object.
//
// Per skill:
//   p       probability the skill is known (Bayesian knowledge tracing)
//   level   difficulty 1-5. Rises after a run of fast correct answers,
//           drops after a run of mistakes or slow answers (curriculum style).
//   repair  set when the student keeps failing at level 1: practice moves to
//           the weakest prerequisite until it is solid again.
//   due     spaced review date once mastered; the interval grows on success.
// Traps (known mistakes) activate after repeated evidence and clear after
// correct answers to baiting questions on 3 different days.
// Hints (spec §9.1): a right answer after a hint is not « fast », so it does
// not raise the level; after two hints it counts as wrong for the mastery
// estimate, but not as a mistake for the ladder. Skills with needsSolo are
// mastered only after a level-5 item done without help (st.solo).

import {
  SKILLS, SKILL_BY_ID, UNITS, DEPENDENTS, isOptional, needsSolo, unitPath,
} from '../content/skills.js';
import { RULE_BY_ID } from '../math/malrules.js';
import { now, dayKey, DAY } from './time.js';

const BKT = { slip: 0.1, learn: 0.12 };
export const MASTERY_P = 0.95;
const PROMOTE_AFTER = 2; // fast correct answers in a row
const DEMOTE_AFTER = 2; // mistakes in a row
const SLOW_DEMOTE_AFTER = 3; // slow answers in a row
const SLOW_FACTOR = 1.6;
const TRAP_ACTIVATE = 2;
const TRAP_CLEAR_DAYS = 3;

export function newSkillState() {
  return {
    p: 0.15, level: 1, good: 0, bad: 0, slow: 0,
    attempts: 0, correct: 0, rts: [],
    introduced: false, lastSeen: 0,
    mastered: false, due: 0, interval: 0,
    repair: null, testedOut: false,
  };
}

export function skillState(profile, id) {
  if (!profile.skills[id]) profile.skills[id] = newSkillState();
  return profile.skills[id];
}

export function stars(st) {
  if (!st) return 0;
  if (st.mastered) return 3;
  if (st.p >= 0.8 && st.level >= 3) return 2;
  if (st.p >= 0.5 && st.level >= 2) return 1;
  return 0;
}

// A prerequisite is satisfied with one star, or when the placement test
// counted it as known.
export const isSatisfied = (st) => !!st && (st.testedOut || stars(st) >= 1);

export function isUnlocked(profile, id) {
  return SKILL_BY_ID[id].prereqs.every((p) => isSatisfied(profile.skills[p]));
}

// Test mode: the profile named « nathmo » with the bee avatar can open every
// skill. Nothing else changes: isUnlocked still says what the path would
// have opened (colours, « Continuer », unlock messages), and answers,
// mastery, traps and rewards work as for any student.
export const isTester = (profile) => profile?.name?.trim().toLowerCase() === 'nathmo' && profile?.avatar === '🐝';

// May the student start this skill? Always in test mode.
export const canOpen = (profile, id) => isTester(profile) || isUnlocked(profile, id);

// The prerequisites still missing, for the map.
export const missingPrereqs = (profile, id) => SKILL_BY_ID[id].prereqs.filter((p) => !isSatisfied(profile.skills[p]));

export const isDue = (st, t = now()) => st.mastered && st.due && st.due <= t;

function median(xs) {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}

// Slow compared with the student's own pace on this skill, or the item's
// expected time when there is not enough history yet.
export function isSlow(st, rtSec, expectedSec) {
  const ref = st.rts.length >= 4 ? Math.max(median(st.rts), expectedSec * 0.5) : expectedSec;
  return rtSec > ref * SLOW_FACTOR;
}

function bkt(p, correct, guess) {
  const post = correct
    ? (p * (1 - BKT.slip)) / (p * (1 - BKT.slip) + (1 - p) * guess)
    : (p * BKT.slip) / (p * BKT.slip + (1 - p) * (1 - guess));
  return post + (1 - post) * BKT.learn;
}

// The weakest prerequisite, searched recursively, or null.
function weakestPrereq(profile, id) {
  let best = null;
  for (const pid of SKILL_BY_ID[id].prereqs) {
    const st = skillState(profile, pid);
    if (!best || st.p < best.p) best = { id: pid, p: st.p };
  }
  return best?.id ?? null;
}

// Records one answer and returns events for the UI:
// {type: levelUp|levelDown|mastered|repair|repairDone|trapNew|trapCleared, ...}
//
// a = {skill, level, correct, rtSec, expectedSec, guess, rules, ambiguous,
//      baits, weight, review, hintsUsed, solo, kind}
export function recordAnswer(profile, a) {
  const events = [];
  const st = skillState(profile, a.skill);
  const weight = a.weight ?? 1;
  const t = now();
  const hints = a.hintsUsed || 0;

  // Mastery estimate. Two hints or more: the answer is not evidence of
  // knowing the skill.
  const known = a.correct && hints < 2;
  const p2 = bkt(st.p, known, a.guess ?? 0.05);
  st.p += weight * (p2 - st.p);
  st.attempts += 1;
  if (a.correct) st.correct += 1;
  st.lastSeen = t;
  if (a.solo && a.correct && a.level >= 5) st.solo = true;

  // An exam answer (kind 'exam', spec §10.2) updates the mastery, not the level.
  if (weight >= 1 && a.kind !== 'exam') {
    const slow = isSlow(st, a.rtSec, a.expectedSec);
    if (a.correct && !slow && !hints) st.rts = [...st.rts, a.rtSec].slice(-10);

    // Difficulty ladder, only when practising at the current level.
    const atLevel = a.level >= st.level;
    if (a.correct && hints) {
      // Right with help: neither a step up nor a mistake.
      st.bad = 0;
    } else if (a.correct && !slow) {
      st.bad = 0;
      st.slow = 0;
      if (atLevel) st.good += 1;
    } else if (a.correct) {
      st.slow += 1;
      st.bad = 0;
    } else {
      st.bad += 1;
      st.good = 0;
    }
    if (st.good >= PROMOTE_AFTER && st.level < 5) {
      st.level += 1;
      st.good = 0;
      events.push({ type: 'levelUp', skill: a.skill, level: st.level });
    } else if (st.bad >= DEMOTE_AFTER || st.slow >= SLOW_DEMOTE_AFTER) {
      st.bad = 0;
      st.slow = 0;
      st.good = 0;
      if (st.level > 1) {
        st.level -= 1;
        events.push({ type: 'levelDown', skill: a.skill, level: st.level });
      } else if (!st.repair && SKILL_BY_ID[a.skill].prereqs.length) {
        const target = weakestPrereq(profile, a.skill);
        if (target) {
          st.repair = target;
          const ts = skillState(profile, target);
          ts.level = Math.max(1, ts.level - 1);
          ts.mastered = false;
          events.push({ type: 'repair', skill: a.skill, target });
        }
      }
    }
  }

  // Mastery and its loss.
  if (!st.mastered && st.level >= 4 && st.p >= MASTERY_P && (!needsSolo(a.skill) || st.solo)) {
    st.mastered = true;
    st.interval = 2;
    st.due = t + st.interval * DAY;
    events.push({ type: 'mastered', skill: a.skill });
  } else if (st.mastered && st.p < 0.8) {
    // Two mistakes in a row on a mastered skill: it needs work again.
    st.mastered = false;
    st.interval = 1;
    st.due = t + DAY;
  }

  // A repaired prerequisite releases the skills waiting on it.
  for (const [id, s] of Object.entries(profile.skills)) {
    if (s.repair === a.skill && (st.p >= 0.85 && stars(st) >= 2)) {
      s.repair = null;
      events.push({ type: 'repairDone', skill: id, target: a.skill });
    }
  }

  // A hinted answer does not beat a trap.
  if (!(hints && a.correct)) events.push(...recordTraps(profile, a));
  return events;
}

export function recordTraps(profile, a) {
  const events = [];
  const today = dayKey();
  if (!a.correct) {
    for (const rule of a.rules || []) {
      if (!RULE_BY_ID[rule]) continue;
      const tr = profile.traps[rule] ||= { count: 0, active: false, cleared: false, clearDays: [], seen: 0 };
      tr.count += 1 / (a.ambiguous || 1);
      tr.seen += 1;
      tr.lastAt = now();
      tr.clearDays = [];
      if (!tr.active && tr.count >= TRAP_ACTIVATE) {
        tr.active = true;
        tr.cleared = false;
        tr.activatedAt = now();
        events.push({ type: 'trapNew', rule });
      }
    }
  } else {
    for (const rule of a.baits || []) {
      const tr = profile.traps[rule];
      if (!tr?.active) continue;
      if (!tr.clearDays.includes(today)) tr.clearDays.push(today);
      if (tr.clearDays.length >= TRAP_CLEAR_DAYS) {
        tr.active = false;
        tr.cleared = true;
        tr.count = 0;
        tr.clearedAt = now();
        events.push({ type: 'trapCleared', rule });
      }
    }
  }
  return events;
}

// End of a lesson: how a due review went. Success spaces the next review out.
export function finishReview(profile, skill, ratio) {
  const st = skillState(profile, skill);
  if (!st.mastered && ratio < 0.75) return;
  if (ratio >= 0.75) {
    st.interval = Math.min(120, Math.round((st.interval || 2) * 2.5));
    st.due = now() + st.interval * DAY;
  } else {
    st.interval = 1;
    st.due = now() + DAY;
    st.mastered = false;
    st.level = Math.max(2, st.level - 1);
  }
}

// ---------- the branching path (spec §8.4) ----------
//
// Each unit is a branch. nextFocus picks what « Continuer » practises:
//   1. a skill waiting on repair;
//   2. else the next skill of the branch the student pinned on the map;
//   3. else it keeps at most 3 active branches (units started and not
//      finished) and moves from one to the next at each lesson, so topics
//      mix. In a branch it takes the open, unmastered skill that comes
//      first in the global order. A new branch opens while fewer than 3 are
//      active; it starts with the skill that opens the most others, then the
//      smallest year.
// The year is a hint: a new branch only opens on skills of the student's
// current level (the smallest year among the open skills), so a 5H student
// does mental arithmetic first, and fractions and lengths join it at 6H.

export const MAX_BRANCHES = 3;
const ORDER = Object.fromEntries(SKILLS.map((s, i) => [s.id, i]));
const UNIT_RANK = Object.fromEntries(UNITS.map((u, i) => [u.id, i]));

export const pathState = (profile) => (profile.path ||= { pinned: null, last: null });

// Open, not mastered, on the path (not optional), not counted as known.
function playable(profile) {
  return SKILLS.filter((s) => {
    const st = profile.skills[s.id];
    return !isOptional(s.id) && !st?.mastered && !st?.testedOut && isUnlocked(profile, s.id);
  });
}

// The first playable skill of each unit.
function branchHeads(pool) {
  const heads = {};
  for (const s of pool) if (!heads[s.unit]) heads[s.unit] = s;
  return heads;
}

// Units the student has started and not finished: at most MAX_BRANCHES,
// the most recently practised ones (a profile from the linear path may
// have started more).
export function activeBranches(profile) {
  const heads = branchHeads(playable(profile));
  const lastSeen = (u) => Math.max(0, ...unitPath(u).map((s) => profile.skills[s.id]?.lastSeen || 0));
  return Object.keys(heads)
    .filter((u) => unitPath(u).some((s) => (profile.skills[s.id]?.attempts || 0) > 0))
    .sort((a, b) => lastSeen(b) - lastSeen(a) || UNIT_RANK[a] - UNIT_RANK[b])
    .slice(0, MAX_BRANCHES)
    .sort((a, b) => UNIT_RANK[a] - UNIT_RANK[b]);
}

// How many skills would open once this one has a star.
function unlockCount(profile, id) {
  return DEPENDENTS[id].filter((d) => !isUnlocked(profile, d)
    && SKILL_BY_ID[d].prereqs.every((p) => p === id || isSatisfied(profile.skills[p]))).length;
}

// The skill a new branch would start with, or null.
export function newBranchSkill(profile, { pool = playable(profile), active = activeBranches(profile) } = {}) {
  if (!pool.length) return null;
  const level = Math.min(...pool.map((s) => s.year));
  const heads = Object.values(branchHeads(pool)).filter((s) => !active.includes(s.unit) && s.year <= level);
  if (!heads.length) return null;
  heads.sort((a, b) => unlockCount(profile, b.id) - unlockCount(profile, a.id) || a.year - b.year || ORDER[a.id] - ORDER[b.id]);
  return heads[0].id;
}

// opts.unit: stay in this unit if it still has something to practise.
export function nextFocus(profile, { unit = null } = {}) {
  for (const s of SKILLS) if (profile.skills[s.id]?.repair) return s.id;
  const pool = playable(profile);
  if (!pool.length) return null;
  const heads = branchHeads(pool);
  if (unit && heads[unit]) return heads[unit].id;
  const path = pathState(profile);
  if (path.pinned && heads[path.pinned]) return heads[path.pinned].id;
  const active = activeBranches(profile);
  if (active.length < MAX_BRANCHES) {
    const fresh = newBranchSkill(profile, { pool, active });
    if (fresh) return fresh;
  }
  if (!active.length) return pool[0].id;
  // Rotate: the active branch after the one of the last lesson.
  const i = active.indexOf(path.last);
  return heads[active[(i + 1) % active.length]].id;
}

// Called when a lesson on the path starts: the next one moves on.
export function noteLessonBranch(profile, skillId) {
  if (SKILL_BY_ID[skillId]) pathState(profile).last = SKILL_BY_ID[skillId].unit;
}

export function pinBranch(profile, unitId) {
  const path = pathState(profile);
  path.pinned = path.pinned === unitId ? null : unitId;
  return path.pinned;
}

// Kept for older callers: the next skill of the path.
export const frontier = (profile) => nextFocus(profile);

// The skill actually practised for a focus skill (its repair target if any).
export function practiceSkill(profile, id) {
  let cur = id;
  for (let i = 0; i < 5; i++) {
    const r = profile.skills[cur]?.repair;
    if (!r) break;
    cur = r;
  }
  return cur;
}

export function dueSkills(profile, t = now()) {
  return SKILLS.map((s) => s.id)
    .filter((id) => profile.skills[id] && isDue(profile.skills[id], t))
    .sort((a, b) => profile.skills[a].due - profile.skills[b].due);
}

export const activeTraps = (profile) => Object.entries(profile.traps).filter(([, t]) => t.active).map(([id]) => id);

// Skills added to the app after a student's placement (a new unit) have no
// state yet. Those from earlier school years are treated as the placement
// treats known skills: counted as known but due for review at once, so
// reviews confirm them. The others simply start fresh.
export function adoptNewSkills(profile) {
  if (!profile.placement?.done) return false;
  let changed = false;
  SKILLS.forEach((s, i) => {
    if (profile.skills[s.id]) return;
    changed = true;
    const st = skillState(profile, s.id);
    if (s.year < profile.year) {
      Object.assign(st, {
        p: MASTERY_P, level: 4, introduced: true, testedOut: true, mastered: true, interval: 1, due: now() + i * 1000,
      });
    }
  });
  return changed;
}

// After the placement skim: skills before the boundary count as mastered
// but are due for review at once, so reviews confirm them; a failed review
// sends the skill back onto the path.
function markKnown(profile, id, i) {
  const st = skillState(profile, id);
  Object.assign(st, {
    p: Math.max(st.p, MASTERY_P), level: Math.max(st.level, 4), introduced: true,
    testedOut: true, mastered: true, interval: 1, due: now() + i * 1000,
  });
}

export function applyPlacement(profile, boundary) {
  SKILLS.forEach((s, i) => {
    skillState(profile, s.id);
    if (i < boundary) markKnown(profile, s.id, i);
  });
  profile.placement = { ...(profile.placement || {}), done: true, boundary, at: now() };
}

// The placement of one unit (« Je connais déjà ce module », and the
// university years): its skills before the boundary, in the unit's
// topological order, count as known. They open the skills that depend on
// them even if a prerequisite from another unit is not worked yet.
export function applyUnitPlacement(profile, unitId, boundary) {
  unitPath(unitId).forEach((s, i) => { if (i < boundary) markKnown(profile, s.id, i); });
  const pl = (profile.placement ||= { done: true });
  (pl.units ||= {})[unitId] = { boundary, at: now() };
}
