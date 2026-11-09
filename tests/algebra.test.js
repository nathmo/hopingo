// Algebra with letters: parsing, equivalence, forms, and the checker.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseAlg, equivalent, isReducedForm, factoredProblem, toPoly, polyText } from '../js/math/algebra.js';
import { checkAlg } from '../js/math/checkers.js';

const P = parseAlg;

test('implicit multiplication, powers and fractions parse as expected', () => {
  assert.ok(equivalent(P('2(x+3)'), P('2x+6')));
  assert.ok(equivalent(P('(x+1)(x-1)'), P('x^2-1')));
  assert.ok(equivalent(P('3/4x'), P('0,75x')), 'the fraction bar binds tighter than ×');
  assert.ok(equivalent(P('-x^2'), P('-(x^2)')), '−x² is the opposite of x²');
  assert.ok(!equivalent(P('(a+b)^2'), P('a^2+b^2')));
  assert.ok(equivalent(P('(x^2-9)/(x+3)'), P('x-3')), 'rational expressions compare exactly');
  assert.equal(polyText(toPoly(P('(x+3)(2x-1)'))), '2x^2+5x-3');
});

test('reduced and factored forms', () => {
  assert.ok(isReducedForm(P('2x^2+5x-3')));
  assert.ok(isReducedForm(P('-10x-19')));
  assert.ok(!isReducedForm(P('2x+3x')));
  assert.ok(!isReducedForm(P('3(x+1)')));
  assert.ok(!isReducedForm(P('x×x')));
  assert.equal(factoredProblem(P('2x(x-2)(x+2)')), null);
  assert.equal(factoredProblem(P('(x+1)^2')), null);
  assert.match(factoredProblem(P('2(2x+4)')), /2 en évidence/);
  assert.match(factoredProblem(P('2x(x^2-4)')), /peut encore se factoriser/);
  assert.match(factoredProblem(P('6x+9')), /produit/);
});

test('the algebra checker names traps and asks to finish', () => {
  const dev = { target: '(x+3)^2', form: 'reduced', algTraps: [{ expr: 'x^2+9', rule: 'pow_distribute_sum' }, { expr: 'x^2+3x+9', rule: 'identity_middle_term' }] };
  assert.equal(checkAlg(dev, 'x^2+6x+9').kind, 'done');
  assert.equal(checkAlg(dev, '9+6x+x²').kind, 'done', 'any order, ² typed');
  assert.equal(checkAlg(dev, 'x^2+9').rule, 'pow_distribute_sum');
  assert.equal(checkAlg(dev, 'x^2+3x+9').rule, 'identity_middle_term');
  assert.equal(checkAlg(dev, '(x+3)(x+3)').kind, 'stay');
  const fac = { target: 'x(x+1)', form: 'common', algTraps: [{ expr: 'x(x)', rule: 'fac_forget_one' }] };
  assert.equal(checkAlg(fac, 'x(x+1)').kind, 'done');
  assert.equal(checkAlg(fac, 'x(x)').rule, 'fac_forget_one');
  assert.equal(checkAlg(fac, 'x^2+x').kind, 'stay');
});
