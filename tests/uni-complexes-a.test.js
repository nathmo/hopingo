// Items of the university unit `complexes`, part a (step U4; helpers and
// checks: tests/uni-check.js), plus the corrected solutions of the
// catalogue (G8, docs/universite/G-gymnase-2.md) replayed through the
// judges, and the counter-examples made of complex numbers.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/complexes-a.skills.js';
import { JUDGES, readWith } from '../js/judges/index.js';
import { checkCounter } from '../js/judges/examples.js';

test('unit complexes, part a: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id)));

// Each list: the start, then the lines of the catalogue's « corrigé type ».
const run = (cfg, start, lines) => {
  const j = JUDGES.complex;
  let prev = j.parseLine(cfg, start);
  lines.forEach((l, k) => {
    const v = j.judgeLine(cfg, prev, l, {});
    assert.equal(v.kind, k === lines.length - 1 ? 'done' : 'ok', `${start} → ${l}: ${v.kind} ${v.message ?? ''}`);
    prev = v.node;
  });
};

test('the corrected solutions of the catalogue pass the complex judge', () => {
  const alg = { kind: 'complex' };
  run(alg, '(3+2i)(1-2i)+(-1+i)', ['3-6i+2i-4i^2-1+i', '3-6i+2i+4-1+i', '6-3i']);
  run(alg, '(4+7i)/(2+i)', ['((4+7i)(2-i))/((2+i)(2-i))', '(8-4i+14i+7)/5', '(15+10i)/5', '3+2i']);
  run({ kind: 'complex', form: 'exp', arg: 'principal' }, '-1+i√3', ['2(-1/2+i√3/2)', '2e^(2iπ/3)']);
  run(alg, '(-1+i)^10', ['(√2e^(3iπ/4))^10', '32e^(15iπ/2)', '32e^(-iπ/2)', '-32i']);
  run({ kind: 'complex', form: 'set' }, 'z^3=-8i', ['{√3-i ; 2i ; -√3-i}']);
  run({ kind: 'complex', form: 'set' }, 'z^2=-5+12i', ['z=2+3i ou z=-2-3i']);
  run(alg, '(3+i)^2-4(4+3i)', ['8+6i-16-12i', '-8-6i']);
  run({ kind: 'complex', form: 'set' }, 'z^2-(3+i)z+4+3i=0', ['{2-i ; 1+2i}']);
  // E6 (MAN 2017 Q6): Δ = 18i, δ = ±(3 + 3i), roots 1 + i and −2 + i.
  run(alg, '(3-i)^2+4(1+i)(2+4i)', ['8-6i+4(-2+6i)', '18i']);
  run({ kind: 'complex', form: 'set', unknown: 'δ' }, 'δ^2=18i', ['{3+3i ; -3-3i}']);
  run(alg, '(-(3-i)+(3+3i))/(2(1+i))', ['4i/(2+2i)', '1+i']);
  run(alg, '(-(3-i)-(3+3i))/(2(1+i))', ['(-6-2i)/(2+2i)', '-2+i']);
  run({ kind: 'complex', form: 'set' }, '(1+i)z^2+(3-i)z-(2+4i)=0', ['{1+i ; -2+i}']);
  run(alg, '-(3-i)/(1+i)', ['-1+2i']);
});

test('the traps of the catalogue are named on a typical wrong line', () => {
  const j = JUDGES.complex;
  const name = (cfg, start, line) => j.judgeLine(cfg, j.parseLine(cfg, start), line, {}).rule;
  assert.equal(name({ kind: 'complex' }, '(3+2i)(1-2i)+(-1+i)', '-2-3i'), 'g8_i_squared');
  assert.equal(name({ kind: 'complex' }, '(4+7i)/(2+i)', '2+7i'), 'g8_div_componentwise');
  assert.equal(name({ kind: 'complex', form: 'real' }, '|5-12i|', '17'), 'g8_modulus_no_square');
  assert.equal(name({ kind: 'complex', form: 'exp', arg: 'principal' }, '-1+i√3', '2e^(-iπ/3)'), 'g8_arg_quadrant');
  assert.equal(name({ kind: 'complex' }, '((1+i)^9)/((1-i)^7)', '1'), 'g8_moivre_modulus');
  assert.equal(name({ kind: 'complex', form: 'set' }, 'z^3=-8i', '{2i}'), 'g8_roots_only_one');
  assert.equal(name({ kind: 'complex', form: 'set', unknown: 'δ' }, 'δ^2=-8-6i', '{1+3i ; -1-3i}'), 'g8_sqrt_signs');
  const s = { kind: 'solset', v: 'θ', vars: ['θ'], periodic: true };
  assert.equal(JUDGES.solset.judgeLine(s, readWith(s, '4θ=2π/3+2kπ'), 'θ=π/6+2kπ', {}).rule, 'g8_roots_spacing');
});

test('counter-examples made of complex numbers', () => {
  const c = { kind: 'complex', vars: ['z', 'w'], pred: '|z+w|=|z|+|w|' };
  assert.ok(checkCounter(c, { z: '1', w: '-1' }).ok);
  assert.ok(checkCounter(c, { z: 'i', w: '-i' }).ok);
  assert.ok(!checkCounter(c, { z: '1', w: '2' }).ok);
  assert.ok(!checkCounter(c, { z: '1' }).ok, 'a missing value');
  const a = { kind: 'complex', vars: ['z'], hyp: 'Re(z)≠0', pred: 'arg(z)=arctan(Im(z)/Re(z))' };
  assert.ok(checkCounter(a, { z: '-1+i' }).ok);
  assert.ok(!checkCounter(a, { z: 'i' }).ok, 'the hypothesis is false');
  const n = { kind: 'complex', vars: ['z', 'n'], doms: { n: 'N*' }, hyp: 'z^n=1', pred: 'z=1 ou z=-1' };
  assert.ok(checkCounter(n, { z: 'i', n: '4' }).ok);
  assert.ok(!checkCounter(n, { z: 'i', n: '1/2' }).ok, 'n is a whole number');
  const opp = { kind: 'complex', vars: ['z'], pred: 'arg(-z)=arg(z)+π' };
  assert.ok(!checkCounter(opp, { z: '1' }).ok, 'arg(−1) = π, not −π');
  assert.ok(checkCounter(opp, { z: 'i' }).ok);
});
