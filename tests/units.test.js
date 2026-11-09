// Signed numbers, powers and roots: parsing, solving, diagnosis, catalogue.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Q } from '../js/math/rational.js';
import { parse, evaluate, print, isLiteral, isComputable, tidy } from '../js/math/expr.js';
import { solve } from '../js/math/solver.js';
import { diagnose } from '../js/math/diagnose.js';
import { judgeLine, judgeAnswer } from '../js/math/judge.js';
import { RULES } from '../js/math/malrules.js';
import { SKILL_BY_ID } from '../js/content/skills.js';

const val = (s) => evaluate(parse(s)).toString();
const lines = (s, opts) => solve(parse(s), opts).map((l) => print(l.node));

test('signs, powers and roots parse, print and evaluate', () => {
  for (const s of ['-3^2', '(-3)^2', '√(9+16)', '(3/4)^2', '10^-2', '-(-3)', '3+(-5)', '-√9', '√0,25']) {
    assert.equal(print(parse(s)), s, `round trip ${s}`);
  }
  assert.equal(val('+12'), '12');
  assert.equal(val('-3^2'), '-9');
  assert.equal(val('(-2)^3'), '-8');
  assert.equal(val('10^-2'), '1/100');
  assert.equal(val('√2×√8'), '4');
  assert.equal(val('√50÷√2'), '5');
  assert.equal(val('(√7)^2'), '7');
  assert.equal(val('√((-5)^2)'), '5');
  assert.throws(() => evaluate(parse('√(-9)')));
  assert.equal(isLiteral(parse('-(-3)')), false, '−(−3) is still an operation');
  assert.equal(isComputable(parse('-(-3)')), true);
  assert.equal(print(tidy({ t: 'pow', b: parse('3/4'), e: parse('2') })), '(3/4)^2', 'a fraction base keeps its brackets');
});

test('solver steps for signed numbers, powers and roots', () => {
  assert.deepEqual(lines('5-(-3)'), ['5+3', '8']);
  assert.deepEqual(lines('-3+4×(-2)'), ['-3+(-8)', '-11']);
  assert.deepEqual(lines('-(3-8)+2'), ['-(-5)+2', '5+2', '7']);
  assert.deepEqual(lines('2^3', { expandPowers: true }), ['2×2×2', '4×2', '8']);
  assert.deepEqual(lines('10^-2'), ['1/(10^2)', '1/100']);
  assert.deepEqual(lines('√(9+16)'), ['√25', '5']);
  assert.deepEqual(lines('√2×√8'), ['√(2×8)', '√16', '4']);
  assert.deepEqual(lines('-24÷6'), ['-4']);
  assert.deepEqual(lines('-2/3+1/2'), ['-4/6+3/6', '-1/6']);
});

test('diagnosis names sign, power and root mistakes', () => {
  const cases = [
    ['-3-4', 7, 'minus_minus_positive'],
    ['5-(-3)', 2, 'sub_neg_subtracts'],
    ['-5+7', -12, 'add_sizes_keep_minus'],
    ['-3+8', -5, 'sign_of_first'],
    ['3-5', 2, 'reverse_subtraction'],
    ['-3×(-4)', -12, 'mul_neg_neg_negative'],
    ['-2×5', 10, 'mul_sign_dropped'],
    ['10-(3+2)', 9, 'minus_before_parens'],
    ['3^2', 6, 'pow_times_exponent'],
    ['5^0', 0, 'pow_zero_is_zero'],
    ['10^-2', -100, 'pow_neg_exp_negative'],
    ['-3^2', 9, 'neg_power_brackets'],
    ['(-3)^2', -9, 'neg_power_brackets'],
    ['(1+2)^2', 5, 'pow_distribute_sum'],
    ['(2×5)^2', 50, 'pow_forget_coefficient'],
    ['2×3^2', 36, 'pow_before_product'],
    ['√16', 8, 'sqrt_half'],
    ['√(9+16)', 7, 'sqrt_distribute_sum'],
    ['√9+√16', 5, 'sqrt_combine_sum'],
    ['(2/3)^-2', [3, 2], 'pow_neg_exp_forget_power'],
    ['√(9/16)', [3, 16], 'sqrt_numerator_only'],
  ];
  for (const [expr, wrong, rule] of cases) {
    const d = diagnose(parse(expr), Array.isArray(wrong) ? new Q(...wrong) : new Q(wrong));
    assert.ok(d, `${expr} → ${wrong} not diagnosed`);
    assert.deepEqual(d.rules, [rule], `${expr} → ${wrong}`);
  }
  // Decimals are not read as fractions.
  const d = diagnose(parse('-3,7+3,6'), new Q(-73, 10));
  assert.ok(!d || !d.rules.some((r) => ['add_across', 'mult_rule_for_addition'].includes(r)));
});

test('the judge follows signed work line by line', () => {
  const prev = parse('-3+4×(-2)');
  assert.equal(judgeLine(prev, '-3-8').kind, 'ok');
  assert.equal(judgeLine(prev, '-11').kind, 'done');
  const wrong = judgeLine(prev, '1×(-2)');
  assert.equal(wrong.kind, 'wrong');
  assert.deepEqual(wrong.diag.rules, ['priority_left_to_right']);
  assert.equal(judgeAnswer(new Q(-7), '-7').kind, 'done');
  assert.equal(judgeAnswer(new Q(3), '-(-3)').kind, 'unfinished');
});

test('every trap points to a real skill and explains itself', () => {
  for (const r of RULES) {
    assert.ok(SKILL_BY_ID[r.skill], `${r.id}: unknown skill ${r.skill}`);
    assert.ok(SKILL_BY_ID[r.repair], `${r.id}: unknown repair ${r.repair}`);
    assert.ok(r.example?.length === 2, `${r.id}: needs a wrong and a right example`);
    let general = '';
    try { general = r.explain(); } catch { general = ''; }
    // Rules without a general text fall back to their example in the UI;
    // those added for the new units must have one.
    if (!r.skill.startsWith('frac-')) assert.ok(general, `${r.id}: no general explanation`);
  }
});
