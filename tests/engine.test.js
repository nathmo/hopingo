import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SKILLS, skillIndex } from '../js/content/skills.js';
import { makeRng } from '../js/content/random.js';
import { newProfileData, finishLesson, currentStreak } from '../js/engine/rewards.js';
import { recordAnswer, skillState, frontier, stars, applyPlacement, dueSkills } from '../js/engine/learner.js';
import { Lesson } from '../js/engine/session.js';
import { Skim } from '../js/engine/placement.js';
import { setClock, DAY } from '../js/engine/time.js';

const T0 = new Date('2026-11-02T10:00:00').getTime();
let t = T0;
setClock(() => t);

const profile = (extra = {}) => ({ id: 'x', name: 'Test', year: 9, track: 'mid', createdAt: T0, ...newProfileData(), ...extra });

// Plays a lesson; `know(item)` decides if the simulated student is right.
// Without `rt`, answers take a bit more than half the item's expected time.
function play(p, lesson, know, { rt } = {}) {
  let item;
  let n = 0;
  while ((item = lesson.next()) && n++ < 40) {
    if (item.type === 'intro') { lesson.answer(item, {}); continue; }
    const correct = know(item);
    lesson.answer(item, { correct, rtSec: rt ?? Math.min(5, item.expectedSec * 0.6), rules: correct ? [] : item.wrongRules || [] });
  }
  return lesson.finish();
}

test('fast correct answers climb the ladder and master a skill', () => {
  const p = profile();
  const events = [];
  for (let i = 0; i < 12; i++) {
    events.push(...recordAnswer(p, { skill: 'frac-read', level: skillState(p, 'frac-read').level, correct: true, rtSec: 3, expectedSec: 12 }));
  }
  const st = skillState(p, 'frac-read');
  assert.ok(st.mastered, 'should be mastered');
  assert.equal(stars(st), 3);
  assert.ok(events.some((e) => e.type === 'mastered'));
  assert.ok(st.due > t, 'review scheduled');
});

test('slow answers lower the difficulty even when correct', () => {
  const p = profile();
  const st = skillState(p, 'frac-equiv');
  st.level = 3;
  st.rts = [5, 5, 6, 5];
  for (let i = 0; i < 3; i++) recordAnswer(p, { skill: 'frac-equiv', level: 3, correct: true, rtSec: 40, expectedSec: 10 });
  assert.equal(st.level, 2);
});

test('repeated failure at level 1 sends practice to a prerequisite', () => {
  const p = profile();
  skillState(p, 'frac-add-same').p = 0.9;
  skillState(p, 'frac-equiv').p = 0.4;
  skillState(p, 'frac-add-multiple');
  const events = [];
  for (let i = 0; i < 4; i++) {
    events.push(...recordAnswer(p, { skill: 'frac-add-multiple', level: 1, correct: false, rtSec: 10, expectedSec: 20, rules: ['ignore_denominators'] }));
  }
  const rep = events.find((e) => e.type === 'repair');
  assert.ok(rep, 'repair event');
  assert.equal(rep.target, 'frac-equiv', 'weakest prerequisite');
  assert.ok(events.some((e) => e.type === 'trapNew' && e.rule === 'ignore_denominators'));
  assert.equal(frontier(p), 'frac-add-multiple');
  // The lesson practises the prerequisite instead.
  const lesson = new Lesson(p, { kind: 'smart' }, makeRng(1));
  const first = lesson.next();
  const firstPractice = first.type === 'intro' ? lesson.next() : first;
  assert.equal(firstPractice.skill, 'frac-equiv');
});

test('a trap clears after correct baited answers on three different days', () => {
  const p = profile();
  for (let i = 0; i < 2; i++) recordAnswer(p, { skill: 'frac-add-any', level: 2, correct: false, rtSec: 9, expectedSec: 20, rules: ['add_across'] });
  assert.ok(p.traps.add_across.active);
  const ok = () => recordAnswer(p, { skill: 'frac-add-any', level: 2, correct: true, rtSec: 9, expectedSec: 20, baits: ['add_across'] });
  ok(); ok();
  t += DAY; ok();
  assert.ok(p.traps.add_across.active, 'two days are not enough');
  t += DAY;
  const ev = ok();
  assert.ok(ev.some((e) => e.type === 'trapCleared'));
  assert.ok(!p.traps.add_across.active);
  t = T0;
});

test('lessons run end to end for a mixed student without errors', () => {
  const p = profile();
  const rng = makeRng(3);
  // Knows the first 6 skills well, struggles after.
  const know = (item) => (skillIndex(item.skill) < 6 ? rng.next() < 0.95 : rng.next() < 0.55);
  for (let day = 0; day < 20; day++) {
    t = T0 + day * DAY;
    const summary = play(p, new Lesson(p, { kind: 'smart' }, rng), know);
    assert.ok(summary.total >= 8, `lesson ${day} too short`);
    finishLesson(p, summary);
  }
  assert.ok(SKILLS.slice(0, 4).every((s) => p.skills[s.id]?.mastered || stars(p.skills[s.id]) >= 2), 'early skills progressed');
  assert.equal(currentStreak(p).count, 20);
  assert.ok(p.badges.first && p.badges.streak7);
  // Review lessons work too.
  t += 5 * DAY;
  assert.ok(dueSkills(p).length > 0);
  const r = play(p, new Lesson(p, { kind: 'review' }, rng), () => true);
  assert.ok(r.total > 0);
  t = T0;
});

test('placement skim finds the boundary of what the student knows', () => {
  const p = profile({ year: 10 });
  const rng = makeRng(5);
  const skim = new Skim(p, rng);
  let item;
  while ((item = skim.next())) skim.answer(item, { correct: skillIndex(item.skill) < 9, slow: false });
  const { boundary } = skim.finish();
  assert.equal(boundary, 9);
  assert.ok(p.skills['frac-read'].mastered && p.skills['frac-read'].testedOut);
  assert.equal(frontier(p), SKILLS[9].id);
});

test('streak survives one missed day with a freeze', () => {
  const p = profile();
  for (let d = 0; d < 7; d++) {
    t = T0 + d * DAY;
    finishLesson(p, { xp: 10, total: 10, correct: 10, perfect: false });
  }
  assert.equal(p.streak.freezes, 1);
  t = T0 + 8 * DAY; // skipped day 7
  const r = finishLesson(p, { xp: 10, total: 10, correct: 10 });
  assert.equal(r.streakEvent.type, 'freezeUsed');
  assert.equal(p.streak.count, 8);
  t = T0;
});

test('applyPlacement makes known skills due for review', () => {
  const p = profile();
  applyPlacement(p, 3);
  t = T0 + 10_000;
  assert.equal(dueSkills(p).length, 3);
  t = T0;
});
