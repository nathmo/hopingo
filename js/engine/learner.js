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

import { SKILLS, SKILL_BY_ID } from '../content/skills.js';
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

export function isUnlocked(profile, id) {
  return SKILL_BY_ID[id].prereqs.every((p) => {
    const st = profile.skills[p];
    return st && (st.testedOut || stars(st) >= 1);
  });
}

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
//      baits, weight, review}
export function recordAnswer(profile, a) {
  const events = [];
  const st = skillState(profile, a.skill);
  const weight = a.weight ?? 1;
  const t = now();

  // Mastery estimate.
  const p2 = bkt(st.p, a.correct, a.guess ?? 0.05);
  st.p += weight * (p2 - st.p);
  st.attempts += 1;
  if (a.correct) st.correct += 1;
  st.lastSeen = t;

  if (weight >= 1) {
    const slow = isSlow(st, a.rtSec, a.expectedSec);
    if (a.correct && !slow) st.rts = [...st.rts, a.rtSec].slice(-10);

    // Difficulty ladder, only when practising at the current level.
    const atLevel = a.level >= st.level;
    if (a.correct && !slow) {
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
  if (!st.mastered && st.level >= 4 && st.p >= MASTERY_P) {
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

  events.push(...recordTraps(profile, a));
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

// What to practise next: a skill waiting on repair, else the first unlocked
// skill not yet mastered, else null (everything mastered).
export function frontier(profile) {
  for (const s of SKILLS) {
    if (profile.skills[s.id]?.repair) return s.id;
  }
  for (const s of SKILLS) {
    const st = profile.skills[s.id];
    if (isUnlocked(profile, s.id) && !(st?.mastered)) return s.id;
  }
  return null;
}

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

// After the placement skim: skills before the boundary count as mastered
// but are due for review at once, so reviews confirm them; a failed review
// sends the skill back onto the path.
export function applyPlacement(profile, boundary) {
  SKILLS.forEach((s, i) => {
    const st = skillState(profile, s.id);
    if (i < boundary) {
      Object.assign(st, {
        p: Math.max(st.p, MASTERY_P), level: Math.max(st.level, 4), introduced: true,
        testedOut: true, mastered: true, interval: 1, due: now() + i * 1000,
      });
    }
  });
  profile.placement = { done: true, boundary, at: now() };
}
