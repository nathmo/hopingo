// Times tables and mental arithmetic: fact memory, fast series, strategies.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { recordFact, pickFact, isAutomatic, factState } from '../js/engine/facts.js';
import { setClock, DAY } from '../js/engine/time.js';
import { makeRng } from '../js/content/random.js';
import { generate } from '../js/content/generators.js';
import { skillFacts, mulStrategy, squareStrategy, fmt } from '../js/content/calcul.js';
import { Lesson, FACT_LENGTH } from '../js/engine/session.js';
import { newProfileData } from '../js/engine/rewards.js';
import { skillState, adoptNewSkills } from '../js/engine/learner.js';
import { SKILLS } from '../js/content/skills.js';

const profile = (year = 6) => ({ id: 't', name: 'T', year, track: 'unknown', ...newProfileData() });

test('a fact becomes automatic only when right and fast', () => {
  const p = profile();
  recordFact(p, 'mul:7x8', true, 6, 3);
  assert.equal(isAutomatic(p, 'mul:7x8'), false, 'right but slow');
  recordFact(p, 'mul:7x8', true, 2, 3);
  recordFact(p, 'mul:7x8', true, 2, 3);
  assert.equal(isAutomatic(p, 'mul:7x8'), true);
  recordFact(p, 'mul:7x8', false, 2, 3);
  assert.equal(factState(p, 'mul:7x8').box, 0, 'a miss sends it back');
});

test('fact choice mixes many known facts with a few weak ones', () => {
  let t = 1e12;
  setClock(() => t);
  const p = profile();
  const cands = Array.from({ length: 10 }, (_, i) => ({ fact: `f${i}` }));
  for (let i = 0; i < 8; i++) { recordFact(p, `f${i}`, true, 1, 3); recordFact(p, `f${i}`, true, 1, 3); }
  const rng = makeRng(1);
  let weak = 0;
  for (let i = 0; i < 400; i++) if (['f8', 'f9'].includes(pickFact(p, cands, rng).fact)) weak += 1;
  assert.ok(weak > 60 && weak < 200, `weak share ${weak}/400`);
  t += 30 * DAY; // everything due again: all count as weak
  assert.ok(cands.includes(pickFact(p, cands, rng)));
  setClock(() => Date.now());
});

test('generators use the fact memory and give whole-number facts', () => {
  const p = profile();
  const rng = makeRng(3);
  const it = generate('tab-678', 3, rng, p);
  assert.equal(it.type, 'fact');
  assert.ok(it.fact.startsWith('mul:'));
  // 2, 5, 10 × 1..10 is 30 facts minus 3 shared (2×5, 2×10, 5×10), plus 27 missing-factor ones.
  assert.equal(skillFacts('tab-2510').length, 27 + 27);
  assert.equal(skillFacts('sq-25').length, 15 + 15, '11²..25² and their reverses');
});

test('strategies give the right numbers', () => {
  assert.match(mulStrategy(7, 8), /= 56\.$/);
  assert.match(mulStrategy(9, 6), /60 − 6 = 54/);
  assert.match(squareStrategy(23), /= 529\./);
  assert.match(squareStrategy(25), /625/);
  assert.equal(fmt(12345.5), '12\u202f345,5');
  assert.equal(fmt(1000), '1000');
});

test('a fact lesson is a long fast series, and a missed fact comes back soon', () => {
  const p = profile(5);
  p.placement = { done: true };
  const lesson = new Lesson(p, { kind: 'skill', skill: 'tab-2510' }, makeRng(5));
  assert.equal(lesson.total, FACT_LENGTH);
  let item = lesson.next();
  if (item.type === 'intro') { lesson.answer(item, {}); item = lesson.next(); }
  lesson.answer(item, { correct: false, rtSec: 4, rules: [] });
  const seen = [lesson.next(), lesson.next(), lesson.next()];
  assert.ok(seen.some((x) => x.retry && x.fact === item.fact), 'missed fact re-asked within 3 questions');
  assert.ok(p.facts[item.fact].miss === 1);
});

test('new skills are adopted by existing profiles', () => {
  const p = profile(9);
  p.placement = { done: true };
  for (const s of SKILLS.filter((x) => x.unit !== 'calcul')) skillState(p, s.id);
  assert.equal(adoptNewSkills(p), true);
  assert.equal(p.skills['tab-678'].mastered, true, 'earlier-year skills count as known, due for review');
  assert.ok(p.skills['tab-678'].due > 0);
  assert.equal(adoptNewSkills(p), false, 'only once');
});
