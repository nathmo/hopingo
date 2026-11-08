import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Q, q } from '../js/math/rational.js';
import { parse, evaluate, print, isIrreducible, nextOperationPath, text } from '../js/math/expr.js';
import { solve } from '../js/math/solver.js';
import { diagnose, wrongAnswers } from '../js/math/diagnose.js';
import { judgeLine, judgeAnswer } from '../js/math/judge.js';

const val = (s) => evaluate(parse(s));

test('rationals reduce and compute exactly', () => {
  assert.equal(q(6, 8).toString(), '3/4');
  assert.equal(q(1, 2).add(q(1, 3)).toString(), '5/6');
  assert.equal(q(2, 3).div(q(4, 5)).toString(), '5/6');
  assert.equal(q(1, 4).toDecimal(), '0,25');
  assert.equal(q(1, 3).toDecimal(), null);
  assert.equal(Q.fromDecimal('2,5').toString(), '5/2');
  assert.equal(q(9, 4).sqrt().toString(), '3/2');
});

test('fraction bar binds tighter than operators', () => {
  assert.equal(val('2/3+1/4×8/5').toString(), '16/15');
  assert.equal(val('(1/2+1/4)×2').toString(), '3/2');
  assert.equal(val('1-3/7').toString(), '4/7');
  assert.equal(val('(2+3)/(2+5)').toString(), '5/7');
  assert.equal(val('-3^2').toString(), '-9');
  assert.equal(val('(-3)^2').toString(), '9');
  assert.equal(print(parse('2/3+1/4×8/5')), '2/3+1/4×8/5');
  assert.equal(text(parse('3/4-1/2')), '3/4 − 1/2');
});

test('next operation respects priority and parentheses', () => {
  assert.deepEqual(nextOperationPath(parse('2/3+1/4×8/5')), ['r']);
  assert.deepEqual(nextOperationPath(parse('(1/2+1/4)×2')), ['l', 'e']);
});

test('solver gives canonical steps ending irreducible', () => {
  const lines = solve(parse('2/3+1/4')).map((l) => print(l.node));
  assert.deepEqual(lines, ['8/12+3/12', '11/12']);
  const lines2 = solve(parse('2/3÷4/5')).map((l) => print(l.node));
  assert.deepEqual(lines2, ['2/3×5/4', '10/12', '5/6']);
  const lines3 = solve(parse('(1/2+1/4)×2')).map((l) => print(l.node));
  assert.equal(lines3.at(-1), '3/2');
  const last = solve(parse('2/3+1/4×8/5')).at(-1).node;
  assert.equal(print(last), '16/15');
});

test('diagnosis names classic mistakes', () => {
  const d = (expr, wrong) => diagnose(parse(expr), val(wrong))?.rules;
  assert.deepEqual(d('1/2+1/3', '2/5'), ['add_across']);
  assert.deepEqual(d('2/7+3/7', '5/14'), ['add_denominators']);
  assert.deepEqual(d('3/4-1/2', '2/2'), ['sub_across']);
  assert.deepEqual(d('1/2+1/3', '2/6'), ['forget_amplify']);
  assert.deepEqual(d('3×2/5', '6/15'), ['int_times_both']);
  assert.deepEqual(d('2/5×3/5', '6/5'), ['keep_common_denominator_mult']);
  assert.deepEqual(d('2/3÷4/5', '8/15'), ['mult_across_division']);
  assert.deepEqual(d('2/3÷4/5', '12/10'), ['invert_first']);
  assert.deepEqual(d('2+3/4', '5/4'), ['int_plus_frac']);
  assert.deepEqual(d('1/2+1/3×3/4', '5/8'), ['priority_left_to_right']);
  assert.deepEqual(d('(1/2+1/3)×3', '3/2'), ['ignore_parentheses']);
  assert.ok(diagnose(parse('(1/2+1/4)×2'), val('1')).ambiguous >= 2);
  assert.equal(d('1/2+1/3', '7/9'), undefined);
});

test('diagnosis works when the student merged steps', () => {
  // 2/3 + 1/4 × 8/5: product done right (8/20), then added across: 10/23
  const r = diagnose(parse('2/3+1/4×8/5'), val('10/23'));
  assert.deepEqual(r.rules, ['add_across']);
});

test('line judge accepts any valid method', () => {
  const prev = parse('2/3+1/4');
  assert.equal(judgeLine(prev, '8/12+3/12').kind, 'ok');
  assert.equal(judgeLine(prev, '16/24+6/24').kind, 'ok');
  assert.equal(judgeLine(prev, '11/12').kind, 'done');
  assert.equal(judgeLine(parse('1/2+1/6'), '4/6').kind, 'simplify');
  const w = judgeLine(prev, '3/7');
  assert.equal(w.kind, 'wrong');
  assert.deepEqual(w.diag.rules, ['add_across']);
  assert.equal(judgeLine(prev, '2/3+').kind, 'parse');
  assert.deepEqual(judgeLine(parse('1/2+1/3×3/4'), '1/2+1/4').ops, ['×']);
});

test('answer judge checks form', () => {
  assert.equal(judgeAnswer(q(3, 4), '6/8', { form: 'irreducible' }).kind, 'simplify');
  assert.equal(judgeAnswer(q(3, 4), '3/4', { form: 'irreducible' }).kind, 'done');
  assert.equal(judgeAnswer(q(1, 4), '0,25', { form: 'decimal' }).kind, 'done');
  assert.equal(judgeAnswer(q(1, 4), '1/4', { form: 'decimal' }).kind, 'form');
  assert.equal(judgeAnswer(q(5, 6), '1/2+1/3').kind, 'unfinished');
  assert.ok(isIrreducible(parse('5')));
});

test('wrong answers feed distractors', () => {
  const w = wrongAnswers(parse('1/2+1/3')).map((x) => x.value.toString());
  assert.ok(w.includes('2/5'));
  assert.ok(w.includes('1/6'));
  assert.ok(!w.includes('5/6'));
});
