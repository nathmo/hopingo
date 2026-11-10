// Items of the university unit `analyse1`, part k (step U4; helpers and
// checks: tests/uni-check.js), and the engine pieces this part added: the
// factorial, series of factorials, the bisection tables.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-k.skills.js';
import { parse } from '../js/cas/parse.js';
import { toText } from '../js/cas/print.js';
import { evalFloat } from '../js/cas/numeric.js';
import { checkTable } from '../js/judges/iter.js';
import { JUDGES } from '../js/judges/index.js';

test('unit analyse1, part k: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id)));

test('the factorial is read, printed back and evaluated', () => {
  for (const t of ['k!', '(k+1)!', '2^k/k!', '1/(k-1)!', '2×3!', '2^(k!)']) assert.equal(toText(parse(t)), t);
  assert.equal(evalFloat(parse('5!'), {}), 120);
  assert.ok(Number.isNaN(evalFloat(parse('(-1)!'), {})));
  // Σ xᵏ/k! converges although 3ᵏ and k! overflow later.
  assert.ok(Math.abs(evalFloat(parse('sum(3^k/k!,k,0,∞)'), {}) - Math.exp(3)) < 1e-9);
  assert.ok(Math.abs(evalFloat(parse('sum((3^k-2k)/(k-1)!,k,2,∞)'), {}) - (3 * Math.exp(3) - 4 * Math.E - 1)) < 1e-9);
  assert.ok(Number.isNaN(evalFloat(parse('sum(1/k,k,1,∞)'), {})), 'Σ 1/k still diverges');
  const D = { kind: 'definite' };
  assert.equal(JUDGES.definite.judgeLine(D, parse('sum((2^k+k)/k!,k,1,∞)'), 'e^2+e-1').kind, 'done');
  assert.equal(JUDGES.definite.judgeLine(D, parse('sum(2^k/k!,k,1,∞)'), 'e^2').rule, 'a1_pow_sum_index_shift');
});

test('bisection tables are judged from the student\'s rows', () => {
  const rows = [1, 2, 3].map((k) => ({ id: `r${k}`, label: String(k), cells: k === 1 ? [{ given: '0' }, { given: '1' }, { input: true }, { input: true }] : [{ input: true }, { input: true }, { input: true }, { input: true }] }));
  const item = { table: { cols: ['a', 'b', 'm', 'f(m)'], rows }, judge: { kind: 'iter', phi: { kind: 'bisection', f: 'x^3+x-1', a0: '0', b0: '1' } } };
  const right = { r1: ['0', '1', '0,5', '-0,375'], r2: ['0,5', '1', '0,75', '0,1719'], r3: ['0,5', '0,75', '0,625', '-0,1309'] };
  assert.equal(checkTable(item, right).ok, true);
  // The wrong half kept in row 2: row 2 is wrong, row 3 follows the student's row.
  const wrong = { r1: right.r1, r2: ['0', '0,5', '0,25', '-0,7344'], r3: ['0,25', '0,5', '0,375', '-0,5723'] };
  const r = checkTable(item, wrong);
  assert.equal(r.ok, false);
  assert.deepEqual(r.cells.r2.slice(0, 2), [false, false]);
  assert.deepEqual(r.cells.r3, [true, true, true, true]);
  // f(m) far from its value, or with the wrong sign.
  assert.equal(checkTable(item, { ...right, r2: ['0,5', '1', '0,75', '0,18'] }).cells.r2[3], false);
});
