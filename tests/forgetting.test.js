// Forgetting beyond the clock (js/engine/learner.js): a mistake in a later
// skill, named by a trap of an earlier mastered skill, spoils that skill;
// using a due prerequisite counts as a light review; long intervals = solid.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { newProfileData } from '../js/engine/rewards.js';
import { recordAnswer, skillState, isDue, isSolid, SOLID_DAYS } from '../js/engine/learner.js';
import { DAY } from '../js/engine/time.js';

const profile = () => ({ name: 'T', avatar: '🦊', year: 11, ...newProfileData() });
const master = (p, id, interval = 30) => Object.assign(skillState(p, id), { p: 0.97, level: 5, mastered: true, interval, due: Date.now() + interval * DAY });
const wrong = (skill, rules, more = {}) => ({ skill, level: 3, correct: false, rtSec: 20, expectedSec: 30, rules, ...more });

test('a trap of an earlier chapter, seen in a later skill, spoils that chapter', () => {
  const p = profile();
  // iso_flip_quotient (2ax = c → x = 2a/c) belongs to iso-formula and repairs frac-quotient.
  master(p, 'frac-quotient');
  skillState(p, 'iso-formula').level = 5; // high enough that the mistakes lower the level, not repair
  const events = [];
  events.push(...recordAnswer(p, wrong('iso-formula', ['iso_flip_quotient'])));
  const st = p.skills['frac-quotient'];
  assert.ok(st.mastered, 'one mistake does not spoil the chapter');
  assert.ok(isDue(st), 'but it is due for review at once');
  assert.ok(st.p < 0.97);
  for (let i = 0; i < 3 && st.mastered; i++) events.push(...recordAnswer(p, wrong('iso-formula', ['iso_flip_quotient'])));
  assert.ok(!st.mastered, 'repeated mistakes spoil it');
  assert.ok(events.some((e) => e.type === 'spoiled' && e.skill === 'frac-quotient' && e.from === 'iso-formula'));
});

test('an unclear diagnosis spoils nothing', () => {
  const p = profile();
  master(p, 'frac-quotient');
  skillState(p, 'iso-formula').level = 5;
  for (let i = 0; i < 3; i++) recordAnswer(p, wrong('iso-formula', ['iso_flip_quotient'], { ambiguous: 2 }));
  for (let i = 0; i < 3; i++) recordAnswer(p, wrong('iso-formula', ['iso_flip_quotient', 'iso_wrong_inverse']));
  assert.ok(p.skills['frac-quotient'].mastered);
  assert.equal(p.skills['frac-quotient'].p, 0.97);
});

test('a right answer that uses a due prerequisite counts as a light review', () => {
  const p = profile();
  const pre = master(p, 'eq-brackets', 12);
  pre.due = Date.now() - DAY;
  recordAnswer(p, { skill: 'iso-formula', level: 3, correct: true, rtSec: 10, expectedSec: 60 });
  assert.equal(pre.interval, 18);
  assert.ok(!isDue(pre));
  // Once a day only.
  pre.due = Date.now() - DAY;
  recordAnswer(p, { skill: 'iso-formula', level: 3, correct: true, rtSec: 10, expectedSec: 60 });
  assert.equal(pre.interval, 18);
});

test('a skill is solid once its review interval is long', () => {
  const p = profile();
  assert.ok(!isSolid(master(p, 'frac-read', 30)));
  assert.ok(isSolid(master(p, 'frac-line', SOLID_DAYS)));
});

test('a spoiled chapter is what « Continuer » practises next', async () => {
  const { nextFocus, practiceSkill } = await import('../js/engine/learner.js');
  const p = profile();
  for (const id of ['frac-read', 'frac-line', 'frac-quotient']) master(p, id);
  for (let i = 0; i < 6 && p.skills['frac-quotient'].mastered; i++) recordAnswer(p, wrong('iso-formula', ['iso_flip_quotient']));
  assert.equal(practiceSkill(p, nextFocus(p)), 'frac-quotient');
});
