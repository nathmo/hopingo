import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SKILLS, SKILL_BY_ID, skimStartIndex } from '../js/content/skills.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { parse, evaluate } from '../js/math/expr.js';
import { judgeAnswer } from '../js/math/judge.js';
import { RULE_BY_ID } from '../js/math/malrules.js';
import { Q } from '../js/math/rational.js';
import { CHECKERS } from '../js/math/checkers.js';

test('skill graph: prerequisites exist and come earlier', () => {
  SKILLS.forEach((s, i) => {
    for (const p of s.prereqs) {
      assert.ok(SKILL_BY_ID[p], `${s.id} needs unknown ${p}`);
      assert.ok(SKILL_BY_ID[p].index < i, `${s.id} listed before its prerequisite ${p}`);
    }
  });
});

test('skim starts later for older students', () => {
  assert.equal(skimStartIndex(5, 'unknown'), 0);
  assert.ok(skimStartIndex(7, 'unknown') > 0, '7H skips the 5H-6H mental arithmetic');
  assert.ok(skimStartIndex(11, 'mid') > skimStartIndex(9, 'mid'));
  assert.ok(skimStartIndex(10, 'high') >= skimStartIndex(10, 'base'));
});

test('every generator produces valid, self-consistent items', () => {
  const rng = makeRng(7);
  for (const s of SKILLS) {
    for (let level = 1; level <= 5; level++) {
      for (let i = 0; i < 40; i++) {
        const it = generate(s.id, level, rng);
        const where = `${s.id} L${level}: ${it.key}`;
        assert.equal(it.skill, s.id, where);
        assert.ok(it.prompt, where);
        for (const b of it.baits) assert.ok(RULE_BY_ID[b], `${where} unknown bait ${b}`);
        if (it.type === 'steps') {
          const v = evaluate(parse(it.expr));
          if (s.unit === 'fractions') assert.ok(v.n > 0, `${where} non-positive result`);
          assert.equal(v.toString(), it.answer, where);
          assert.ok(it.solution.length > 0 || parse(it.expr).t === 'num', where);
        }
        if (it.type === 'answer' && it.checker) {
          assert.equal(CHECKERS[it.checker](it, it.expected).kind, 'done', `${where} expected answer rejected by its checker`);
        } else if (it.type === 'answer') {
          const r = judgeAnswer(evaluate(parse(it.expected)), it.expected, { form: it.form });
          assert.equal(r.kind, 'done', `${where} expected answer rejected: ${r.kind}`);
          for (const t of it.traps) assert.ok(!Q.of(evaluate(parse(t.value))).eq(evaluate(parse(it.expected))), where);
        }
        if (it.type === 'fact') {
          assert.match(it.expected, /^\d+$/, `${where} fact answers are whole numbers`);
          for (const t of it.traps) assert.notEqual(t.value, it.expected, where);
          assert.ok(it.strategy, `${where} needs a strategy`);
        }
        if (it.type === 'mcq') {
          assert.equal(it.options.filter((o) => o.correct).length, 1, `${where} needs exactly one right option`);
          const htmls = it.options.map((o) => o.html);
          assert.equal(new Set(htmls).size, htmls.length, `${where} duplicate options`);
        }
        if (it.type === 'shade') assert.ok(it.target.count > 0 && it.target.count < it.figure.n, where);
        if (it.type === 'numberline') {
          const { min = 0, max, den } = it.line;
          const t = evaluate(parse(it.target)).mul(den);
          assert.ok(t.isInt() && t.n >= min * den && t.n <= max * den, `${where} target off the line`);
        }
      }
    }
  }
});
