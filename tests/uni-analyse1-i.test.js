// Items of the university unit `analyse1`, part i (step U4; helpers and
// checks: tests/uni-check.js).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-i.skills.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { RULE_BY_ID } from '../js/math/malrules.js';
import { checkCounter } from '../js/judges/examples.js';
import { checkProblem } from '../js/judges/problem.js';
import { JUDGES, readWith } from '../js/judges/index.js';

// The problem E6 (a1-ser-param, level 5 and `open`) replays seven parts.
test('unit analyse1, part i: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id), 17, { 'a1-ser-param': 25 }));

// The false statements of the true/false variants: a sequence that does
// not refute them is refused.
test('series: counter-examples that are not ones are refused', () => {
  const rng = makeRng(11);
  const seen = new Map();
  for (const skill of ['a1-ser-necessary', 'a1-ser-compare', 'a1-ser-ratio-root', 'a1-ser-leibniz-abs']) {
    for (let i = 0; i < 40; i++) {
      const it = generate(skill, 4, rng, null, { exam: 'tf' });
      if (it.type === 'tf' && !it.truth && it.counter.kind === 'sequence') seen.set(it.key, it);
    }
  }
  const bad = {
    'a1-ser-necessary:tf:zero1': { a: '1/n^2' },
    'a1-ser-necessary:tf:nan': { a: '1/n^2' },
    'a1-ser-compare:tf:dir': { a: '1/n^3', b: '1/n^2' },
    'a1-ser-ratio-root:tf:lt1': { a: '1/n^2' },
    'a1-ser-leibniz-abs:tf:all': { a: '1/n^2' },
    'a1-ser-leibniz-abs:tf:alt0': { a: '(-1)^n/n' },
  };
  for (const [key, answer] of Object.entries(bad)) {
    const it = seen.get(key);
    assert.ok(it, `${key} generated`);
    assert.equal(checkCounter(it.counter, answer).ok, false, `${key}: ${JSON.stringify(answer)} refused`);
  }
});

test('series: E6 is a 9-point problem, played in full by its reference', () => {
  for (const opts of [undefined, { exam: 'open' }]) {
    const it = generate('a1-ser-param', 5, makeRng(4), null, opts);
    assert.equal(it.type, 'problem');
    assert.equal(it.points.flat().reduce((a, b) => a + b, 0), 9);
    assert.deepEqual(it.points.map((p) => p.reduce((a, b) => a + b, 0)), [2, 1, 1, 2, 1, 1, 1]);
    assert.ok(checkProblem(it).ok);
  }
});

test('series: traps of the part, and the comparison trap moved from step U2', () => {
  assert.equal(RULE_BY_ID.a1_compare_wrong_direction.skill, 'a1-ser-compare');
  assert.equal(RULE_BY_ID.a1_compare_wrong_direction.repair, 'a1-ser-compare');
  const rng = makeRng(2);
  const baits = new Set();
  for (let i = 0; i < 30; i++) for (const b of generate('a1-ser-compare', 4, rng, null, { exam: 'mcq' }).baits) baits.add(b);
  for (const id of ['a1_compare_wrong_direction', 'a1_riemann_p_boundary', 'a1_ipe_in_sum', 'a1_series_term_to_zero']) assert.ok(baits.has(id), id);
  // |2λ| < |λ + 3| ⇒ 2λ < λ + 3 is refused in a solset line (named by the
  // G1 trap that removes the same bars).
  const cfg = { kind: 'solset', v: 'λ' };
  const v = JUDGES.solset.judgeLine(cfg, readWith(cfg, '|2λ|<|λ+3|'), '2λ<λ+3', {});
  assert.equal(v.kind, 'wrong');
  assert.ok(v.rule);
});
