// Items of the university unit `analyse1`, part g (step U4; helpers and
// checks: tests/uni-check.js), and the engine pieces part g added:
// factorials, squeeze bounds that end a part, a limit known from the item.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-g.skills.js';
import { parse } from '../js/cas/parse.js';
import { toText } from '../js/cas/print.js';
import { evalFloat } from '../js/cas/numeric.js';
import { JUDGES, readWith } from '../js/judges/index.js';

// The bound lines of the squeeze and of the monotone sums are Σ up to n:
// 20 items per level.
test('unit analyse1, part g: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id), 17, { 'a1-seq-squeeze': 20, 'a1-seq-monotone': 20 }));

test('factorials: n!, (n + 1)!, (2n)! parse, print back and evaluate', () => {
  const o = { vars: ['n'] };
  for (const t of ['n!', '(n+1)!', '(2n)!', '2n!', '(n!)^2', '3^n×n^2/n!', '(2n+2)!/(2n)!']) {
    const s = toText(parse(t, o));
    assert.equal(toText(parse(s, o)), s, t);
  }
  assert.equal(toText(parse('n!^2', o)), '(n!)^2');
  assert.equal(evalFloat(parse('(n+1)!/n!', o), { n: 6 }), 7);
  assert.equal(evalFloat(parse('(2n)!', o), { n: 3 }), 720);
  assert.ok(Number.isNaN(evalFloat(parse('n!', o), { n: 1.5 })));
});

test('squeeze bounds: a bound of the right limit ends the part, another one stays', () => {
  const j = JUDGES.equiv;
  const cfg = { kind: 'equiv', vars: ['n'], from: 1, maxN: 1000, rel: '≤', squeeze: { L: '1' } };
  const S = readWith(cfg, 'sum(n/(n^2+k),k,1,n)');
  assert.equal(j.judgeLine(cfg, S, 'sum(n/(n^2+1),k,1,n)').kind, 'ok', 'a Σ in n is left');
  assert.equal(j.judgeLine(cfg, S, 'n^2/(n^2+1)').kind, 'done');
  assert.equal(j.judgeLine(cfg, S, '2').kind, 'stay', 'a true bound of limit 2');
  assert.equal(j.judgeLine(cfg, S, 'n/(n^2+1)').rule, 'a1_sum_n_terms_as_one');
  const trig = { kind: 'equiv', vars: ['n'], from: 1, rel: '≥', squeeze: { L: '1/2', gone: ['sin', 'cos'] } };
  assert.equal(j.judgeLine(trig, readWith(trig, '(n+3sin(n))/(2n+1)'), '(n-3)/(2n+1)').kind, 'done');
  assert.equal(j.judgeLine(trig, readWith(trig, '(n+3sin(n))/(2n+1)'), '(n+3)/(2n+1)').kind, 'wrong');
});

test('limit with cfg.value: the limit of a sequence with n! is given by the item', () => {
  const j = JUDGES.limit;
  const cfg = { kind: 'limit', v: 'n', to: '+∞', discrete: true, value: '0' };
  const a = readWith(cfg, '3^n×n^2/n!');
  assert.equal(j.judgeLine(cfg, a, '0').kind, 'done');
  assert.equal(j.judgeLine(cfg, a, '+∞').kind, 'wrong');
});
