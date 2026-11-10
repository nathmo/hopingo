// Items of the university unit `analyse1`, part f (step U4; helpers and
// checks: tests/uni-check.js), and the small engine additions it uses.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse1-f.skills.js';
import { JUDGES, readWith } from '../js/judges/index.js';
import { checkCounter } from '../js/judges/examples.js';
import { limit } from '../js/cas/limit.js';
import { parse } from '../js/cas/parse.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';

test('unit analyse1, part f: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id)));

test('part f engine: bounds c/nᵖ end a part, closed values, constant from a rank, unbounded oscillation', () => {
  const B = { kind: 'equiv', vars: ['n'], rel: '≤', from: 1, simple: true };
  const prev = readWith(B, '5/(n+2)');
  assert.equal(JUDGES.equiv.judgeLine(B, prev, '5/n').kind, 'done');
  assert.equal(JUDGES.equiv.judgeLine(B, prev, '5/(n+1)').kind, 'ok', 'still a fraction to simplify');
  assert.equal(JUDGES.equiv.judgeLine(B, readWith(B, '3/(n^2+1)'), '3/n^2').kind, 'done');
  assert.equal(JUDGES.equiv.judgeLine({ ...B, simple: false }, prev, '5/n').kind, 'ok', 'without simple: a line in n goes on');
  const V = { kind: 'value', form: 'closed', expect: 'e^(-1/2)' };
  assert.equal(JUDGES.value.judgeLine(V, readWith(V, 'I'), 'e^(-1/2)').kind, 'done');
  const seq = (hyp, concl, a) => checkCounter({ kind: 'sequence', hyp, concl }, { a }).ok;
  assert.ok(seq([{ p: 'converges' }], { p: 'eventuallyConstant' }, '1/n'));
  assert.ok(!seq([{ p: 'converges' }], { p: 'eventuallyConstant' }, '3'));
  assert.equal(limit(parse('n(1+(-1)^n)', { vars: ['n'] }), 'n', '+inf', undefined, { discrete: true }).value, 'none');
  assert.equal(limit(parse('n(2+(-1)^n)', { vars: ['n'] }), 'n', '+inf', undefined, { discrete: true }).value, '+inf');
});

test('part f: N(ε) refuses the classic mistakes', () => {
  const rng = makeRng(9);
  for (let i = 0; i < 10; i++) {
    const it = generate('a1-seq-eps-n', 4, rng);
    const seg = it.script.filter((l) => l.kind === 'segment').at(-1);
    const prev = readWith(seg.judge, 'N');
    // N(ε) that depends on n is named.
    assert.equal(JUDGES.delta.judgeLine(seg.judge, prev, '1/(ε×n)').rule, 'a1_n_depends_on_n');
    // A threshold far too small is refused.
    assert.equal(JUDGES.delta.judgeLine(seg.judge, prev, 'ε').kind, 'wrong', it.key);
  }
});
