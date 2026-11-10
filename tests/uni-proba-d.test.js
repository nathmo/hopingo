// Items of the university unit `proba`, part d (module P, step U7; helpers
// and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/proba-d.skills.js';
import { GEN } from '../js/content/uni/proba-d.js';
import { RULES } from '../js/cas/rules/pd.js';
import { checkTraps } from './uni-check-stat.js';

// Heavy skills: fewer items per level (never under 15).
const COUNTS = {};

test('unit proba, part d: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => GEN[id]), 17, COUNTS));

test('unit proba, part d: the traps name their examples or are offered as baits', () => checkTraps(RULES));

// The catalogue's corrigés (P-probabilites.md), replayed through the judges.
import assert from 'node:assert/strict';
import { JUDGES } from '../js/judges/index.js';

const play = (cfg, lines, state = {}) => {
  const j = JUDGES[cfg.kind];
  let prev = j.parseLine(cfg, '?');
  return lines.map((l) => { const v = j.judgeLine(cfg, prev, l, state); if (v.kind !== 'wrong') prev = v.node; return v; });
};

test('p-ci-round: the course example (θ̂ = 1,069871, u = 0,002415)', () => {
  const u = { kind: 'stat', expect: '0.0024', decimals: 4, sig: 2 };
  assert.deepEqual(play(u, ['0,002415', '0,0024']).map((v) => v.kind), ['stay', 'done']);
  const ic = { kind: 'stat', expect: ['1.069871-0.002415', '1.069871+0.002415'], ciRule: 'outward', digits: 4, decimals: 6,
    traps: { p_ci_round_nearest: ['[1.0675;1.0723]'] } };
  assert.equal(play(ic, ['[1,0674 ; 1,0723]'])[0].kind, 'done');
  const v = play(ic, ['[1,0675 ; 1,0723]'])[0];
  assert.equal(v.kind, 'wrong');
  assert.equal(v.rule, 'p_ci_round_nearest');
});

test('tests and intervals of the catalogue: t test on javelin throws, coin, Student interval', () => {
  const t = { kind: 'stat', expect: '(88-84)/√(10/5)', decimals: 2 };
  assert.deepEqual(play(t, ['4/√2', '2,83']).map((v) => v.kind), ['ok', 'done']);
  const tc = { kind: 'stat', expect: '#t(4,5)', decimals: 3, traps: { p_t_vs_z: ['1.96'] } };
  assert.equal(play(tc, ['2,776'])[0].kind, 'done');
  assert.equal(play(tc, ['1,96'])[0].rule, 'p_t_vs_z');
  const p = { kind: 'stat', expect: '2*(1-#phi(2))', decimals: 3, traps: { p_pvalue_two_sided: ['1-0.977'] } };
  assert.deepEqual(play(p, ['2(1-Φ(2))', '2·0,023', '0,046']).map((v) => v.kind), ['ok', 'ok', 'done']);
  assert.equal(play(p, ['0,023'])[0].rule, 'p_pvalue_two_sided');
  const ic = { kind: 'stat', expect: ['20-2.306', '20+2.306'], decimals: 3 };
  assert.equal(play(ic, ['[17,694 ; 22,306]'])[0].kind, 'done');
  // Errors carried forward: t_obs from the student's own x̄.
  const tf = { kind: 'stat', expect: '($xbar-84)/√($s2/5)', decimals: 2, ref: { xbar: '88', s2: '10' } };
  const xbar = JUDGES.stat.parseLine(tf, '87');
  assert.equal(play(tf, ['2,12'], { vals: { xbar } })[0].kind, 'done');
  // Power: β = Φ(1,645 − 3) ≈ 0,09.
  const b = { kind: 'stat', expect: 'Φ(1.645-3)', decimals: 2 };
  assert.equal(play(b, ['0,09'])[0].kind, 'done');
});
