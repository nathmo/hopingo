// The branching path (spec §8.4) and the engine changes of §9: hints,
// validation alone, sub-goal credit, lesson length, per-unit placement.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SKILLS, SKILL_BY_ID, unitSkills, unitPath, YEARS } from '../js/content/skills.js';
import { makeRng } from '../js/content/random.js';
import { newProfileData } from '../js/engine/rewards.js';
import {
  recordAnswer, skillState, nextFocus, noteLessonBranch, pinBranch, activeBranches, isUnlocked, MASTERY_P,
  applyPlacement, applyUnitPlacement, missingPrereqs, stars,
} from '../js/engine/learner.js';
import { Lesson, MAX_LESSON_SEC } from '../js/engine/session.js';
import { Skim, placementPlan } from '../js/engine/placement.js';
import { setClock } from '../js/engine/time.js';

const T0 = new Date('2026-11-09T10:00:00').getTime();
setClock(() => T0);
const profile = (year, extra = {}) => ({ id: 'p', name: 'T', year, track: 'unknown', createdAt: T0, ...newProfileData(), placement: { done: true }, ...extra });

const master = (p, id) => Object.assign(skillState(p, id), { p: 0.97, level: 5, mastered: true, attempts: 6, correct: 6 });
const openUnits = (p) => new Set(SKILLS.filter((s) => isUnlocked(p, s.id) && !p.skills[s.id]?.mastered).map((s) => s.unit));

test('a new 7H student sees at least 2 open branches after mental arithmetic', () => {
  const p = profile(7);
  for (const s of unitSkills('calcul')) master(p, s.id);
  const open = openUnits(p);
  open.delete('calcul');
  assert.ok(open.size >= 2, `open branches: ${[...open].join(', ')}`);
  // « Continuer » visits several of them, lesson after lesson.
  const seen = new Set();
  for (let i = 0; i < 4; i++) {
    const id = nextFocus(p);
    seen.add(SKILL_BY_ID[id].unit);
    noteLessonBranch(p, id);
    skillState(p, id).attempts += 1;
  }
  assert.ok(seen.size >= 2, `lessons went to: ${[...seen].join(', ')}`);
  assert.ok(activeBranches(p).length >= 2);
});

test('a 5H student starts with mental arithmetic', () => {
  const p = profile(5, { placement: { done: true } });
  const first = nextFocus(p);
  assert.equal(SKILL_BY_ID[first].unit, 'calcul');
  // Fractions join at the 6H level, not before.
  for (let i = 0; i < 3; i++) {
    const id = nextFocus(p);
    noteLessonBranch(p, id);
    skillState(p, id).attempts += 1;
    assert.equal(SKILL_BY_ID[id].unit, 'calcul');
  }
});

test('at most 3 active branches, taken in turn; a pinned branch wins', () => {
  const p = profile(9);
  applyPlacement(p, SKILLS.findIndex((s) => s.year >= 9));
  const units = [];
  for (let i = 0; i < 9; i++) {
    const id = nextFocus(p);
    units.push(SKILL_BY_ID[id].unit);
    noteLessonBranch(p, id);
    skillState(p, id).attempts += 1;
  }
  const distinct = new Set(units);
  assert.equal(distinct.size, 3, `branches: ${units.join(' ')}`);
  assert.ok(units[3] !== units[4] || units[4] !== units[5], 'they alternate');
  pinBranch(p, 'puissances');
  assert.equal(SKILL_BY_ID[nextFocus(p)].unit, 'puissances');
  assert.equal(SKILL_BY_ID[nextFocus(p)].unit, 'puissances', 'pinned stays');
  pinBranch(p, 'puissances');
  assert.equal(p.path.pinned, null);
});

test('a skill waiting on repair comes first', () => {
  const p = profile(9);
  applyPlacement(p, SKILLS.findIndex((s) => s.year >= 9));
  skillState(p, 'lit-value').repair = 'rel-chain';
  assert.equal(nextFocus(p), 'lit-value');
});

test('the topological order keeps prerequisites first and the closed skill names what it waits for', () => {
  const idx = Object.fromEntries(SKILLS.map((s, i) => [s.id, i]));
  for (const s of SKILLS) for (const q of s.prereqs) assert.ok(idx[q] < idx[s.id], `${q} before ${s.id}`);
  const p = profile(9);
  assert.deepEqual(missingPrereqs(p, 'frac-equiv'), ['frac-read']);
  assert.ok(YEARS.some((y) => y.id === 13 && y.label === 'BA1') && YEARS.some((y) => y.id === 12.5));
});

test('placement of one unit, and the BA placement plan', () => {
  const p = profile(10);
  const order = unitPath('fractions');
  const skim = new Skim(p, makeRng(2), { unit: 'fractions' });
  let item;
  while ((item = skim.next())) skim.answer(item, { correct: order.findIndex((s) => s.id === item.skill) < 6, slow: false });
  const { boundary, unit } = skim.finish();
  assert.equal(unit, 'fractions');
  assert.equal(boundary, 6);
  assert.ok(order.slice(0, 6).every((s) => p.skills[s.id].testedOut));
  assert.ok(!p.skills[order[6].id]?.testedOut);
  assert.equal(p.placement.units.fractions.boundary, 6);
  // A unit placed as known opens its dependents.
  applyUnitPlacement(p, 'relatifs', unitPath('relatifs').length);
  assert.ok(isUnlocked(p, 'fn-read'), 'fn-read waits only for rel-read');
  const ba = placementPlan(profile(13));
  assert.equal(ba[0].unit, null);
  assert.ok(ba[0].order.every((id) => SKILL_BY_ID[id].year < 13));
  assert.equal(placementPlan(profile(9)).length, 1);
});

test('hints: help keeps the level, two hints count as not known (§9.1)', () => {
  const p = profile(12);
  const st = skillState(p, 'frac-read');
  for (let i = 0; i < 6; i++) recordAnswer(p, { skill: 'frac-read', level: st.level, correct: true, rtSec: 2, expectedSec: 20, hintsUsed: 1 });
  assert.equal(st.level, 1, 'no level up with a hint');
  const before = st.p;
  recordAnswer(p, { skill: 'frac-read', level: 1, correct: true, rtSec: 2, expectedSec: 20, hintsUsed: 2 });
  assert.ok(st.p < before + 0.12 && st.p <= Math.max(before, 0.99), 'not evidence of knowing');
  st.level = 2;
  for (let i = 0; i < 3; i++) recordAnswer(p, { skill: 'frac-read', level: 2, correct: true, rtSec: 2, expectedSec: 20, hintsUsed: 2 });
  assert.equal(st.level, 2, 'not a mistake for the ladder');
});

test('a skill with needsSolo is mastered only after level 5 alone (§9.2)', () => {
  const p = profile(12);
  const id = 'g6-deriv-rules';
  const st = skillState(p, id);
  Object.assign(st, { level: 4, p: 0.99 });
  recordAnswer(p, { skill: id, level: 4, correct: true, rtSec: 30, expectedSec: 120 });
  assert.equal(st.mastered, false, 'not without a solo item');
  recordAnswer(p, { skill: id, level: 5, correct: true, rtSec: 30, expectedSec: 120, solo: true });
  assert.ok(st.solo && st.mastered);
  assert.equal(stars(st), 3);
});

test('sub-goals credit their skills, even in a failed item (§9.3, §9.4)', () => {
  const p = profile(12);
  const lesson = new Lesson(p, { kind: 'skill', skill: 'g6-deriv-rules' }, makeRng(1));
  const before = skillState(p, 'lit-monomial').p;
  const item = { skill: 'g6-deriv-rules', level: 4, type: 'lines', expectedSec: 120, baits: [] };
  lesson.answer(item, { correct: false, rtSec: 60, rules: ['g6_chain_forgot'], subgoals: ['lit-monomial', 'g6-deriv-rules', 'zz-unknown'] });
  assert.ok(skillState(p, 'lit-monomial').p > before);
  // A sub-goal credit to a skill id that does not exist (or is not built yet) is ignored.
  assert.equal(p.skills['zz-unknown'], undefined, 'a skill not built yet is ignored');
});

test('a lesson of long items stops after about 15 minutes (§9.7)', () => {
  const p = profile(12);
  for (const q of SKILL_BY_ID['g6-deriv-rules'].prereqs) master(p, q);
  Object.assign(skillState(p, 'g6-deriv-rules'), { level: 4, introduced: true });
  const lesson = new Lesson(p, { kind: 'skill', skill: 'g6-deriv-rules' }, makeRng(3));
  let n = 0;
  let secs = 0;
  let item;
  while ((item = lesson.next()) && n < 30) {
    if (item.type === 'intro') { lesson.answer(item, {}); continue; }
    n++;
    secs += item.expectedSec;
    assert.equal(item.type === 'lines' || item.type === 'mcq', true);
    lesson.answer(item, { correct: true, rtSec: 40, subgoals: [] });
  }
  assert.ok(n < 10, `${n} items`);
  assert.ok(secs >= MAX_LESSON_SEC && secs < MAX_LESSON_SEC + 400, `${secs} s`);
  assert.ok(skillState(p, 'g6-deriv-rules').attempts > 0);
  assert.ok(MASTERY_P > 0.9);
});

test('a profile from the linear path keeps only its 3 most recent branches', () => {
  const p = profile(10);
  const heads = ['frac-read', 'rel-read', 'u-length', 'tab-2510', 'lit-write'];
  heads.forEach((id, i) => Object.assign(skillState(p, id), { attempts: 2, lastSeen: T0 + i }));
  const active = activeBranches(p);
  assert.equal(active.length, 3);
  // u-length waits for tab-2510: the unites branch has nothing open.
  assert.deepEqual(active, ['calcul', 'relatifs', 'algebre']);
});
