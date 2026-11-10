// Items of the university unit `proba`, part b (module P, step U7; helpers
// and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/proba-b.skills.js';
import { GEN } from '../js/content/uni/proba-b.js';
import { RULES } from '../js/cas/rules/pb.js';
import { checkTraps } from './uni-check-stat.js';

// Heavy skills: fewer items per level (never under 15).
const COUNTS = {};
const ONLY = process.env.PB_ONLY ? process.env.PB_ONLY.split(',') : null;
const ids = SKILLS.map((s) => s.id).filter((id) => GEN[id] && (!ONLY || ONLY.includes(id)));

test('unit proba, part b: every skill, 5 levels and exam variants', () => checkSkills(ids, 17, COUNTS));

test('unit proba, part b: the traps name their examples or are offered as baits', () => checkTraps(RULES.filter((r) => !ONLY || ONLY.includes(r.skill))));

// The corrigés of the catalogue replayed through the judges prob and stat.
import assert from 'node:assert/strict';
import { JUDGES } from '../js/judges/index.js';

const run = (cfg, lines, state = {}) => {
  const j = JUDGES[cfg.kind];
  let prev = j.parseLine(cfg, '?');
  lines.forEach((l, k) => {
    const v = j.judgeLine(cfg, prev, l, state);
    assert.equal(v.kind, k === lines.length - 1 ? 'done' : 'ok', `${l}: ${v.kind} ${v.message ?? ''}`);
    prev = v.node;
  });
};

test('unit proba, part b: the corrigés of the catalogue pass their judges', () => {
  run({ kind: 'prob', expect: '1/3' }, ['0-(-1/3)', '1/3']); // p-cont-density: ∫₁^∞ x⁻⁴ dx
  run({ kind: 'prob', expect: '19/208' }, ['(1/8-1/27)/(26/27)', '19/208']);
  run({ kind: 'prob', vars: ['x'], domain: { x: [1.1, 5] }, expect: '1-x^(-3)' }, ['1-x^(-3)']);
  run({ kind: 'stat', expect: '(3/4)^(1/3)' }, ['(3/4)^(1/3)', '0,909']); // p-cont-quantile
  run({ kind: 'stat', expect: 'e^(-1)' }, ['e^(-1,2)/e^(-0,2)', 'e^(-1)', '0,368']); // p-unif-exp
  run({ kind: 'prob', expect: '5/252' }, ['5/7-(5/6)^2', '5/252']); // p-moments
  run({ kind: 'prob', vars: ['θ'], domain: { θ: [0.5, 5] }, expect: '3θ^2' }, ['3θ^2']); // p-family
  run({ kind: 'stat', expect: '0.977-(1-0.841)' }, ['0,977-(1-0,841)', '0,818']); // p-normal-std
  run({ kind: 'stat', expect: '5/1.28', decimals: 1 }, ['5/1,28', '3,9']); // p-normal-inverse
  run({ kind: 'prob', vars: ['x'], domain: { x: [0.1, 3] }, expect: '2e^(-2x)' }, ['1×|-2e^(-2x)|']); // p-transform, λ = 2
  run({ kind: 'prob', expect: '1/2' }, ['0,2/0,4', '1/2']); // p-joint-disc
  run({ kind: 'prob', vars: ['w'], domain: { w: [0.1, 3] }, expect: '3w^2+9w/2' }, ['3w^2+9w/2']); // p-joint-cont
  run({ kind: 'prob', expect: '4/189' }, ['1/(189/4)', '4/189']);
  run({ kind: 'prob', expect: '13' }, ['3+2^2×2+6+2×(0+2×(-2)+2×1)', '13']); // p-lin-combo
  // The traps of the catalogue named on its wrong lines.
  const name = (cfg, line) => JUDGES[cfg.kind].judgeLine(cfg, JUDGES[cfg.kind].parseLine(cfg, '?'), line, {}).rule;
  assert.equal(name({ kind: 'prob', expect: '13', traps: { p_var_sum_cov: ['17'] } }, '17'), 'p_var_sum_cov');
  assert.equal(name({ kind: 'stat', expect: '0.023', traps: { p_upper_tail: ['0.977'] } }, '0,977'), 'p_upper_tail');
});
