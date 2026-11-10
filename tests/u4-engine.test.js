// Step U4 engine: complex numbers (js/cas/complex.js, judge complex), the
// δ(ε) judge, numeric limits (sequences, limits that do not exist), series
// sums in evalFloat, counter-examples that are sequences or functions, and
// the `problem` item saved and resumed (profile.pending).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parse } from '../js/cas/parse.js';
import { CQ, exactComplex, evalComplex, polarParts, algebraicParts } from '../js/cas/complex.js';
import { limit } from '../js/cas/limit.js';
import { evalFloat } from '../js/cas/numeric.js';
import { Q } from '../js/math/rational.js';
import { JUDGES } from '../js/judges/index.js';
import { checkCounter } from '../js/judges/examples.js';
import { ProblemRun, checkProblem, pendingOf, resumeRun, referenceLog } from '../js/judges/problem.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';

const P = (t, o = {}) => parse(t, { complex: true, ...o });

test('ℚ(i): exact values, float values, forms', () => {
  assert.ok(exactComplex(P('(3+4i)/(1-2i)')).eq(new CQ(-1, 2)));
  assert.ok(exactComplex(P('(1+i)^8')).eq(new CQ(16)));
  assert.ok(exactComplex(P('i^2023')).eq(new CQ(0, -1)));
  assert.equal(exactComplex(P('e^(iπ/3)')), null);
  const z = evalComplex(P('2e^(iπ/3)'));
  assert.ok(Math.abs(z.re - 1) < 1e-12 && Math.abs(z.im - Math.sqrt(3)) < 1e-12);
  assert.ok(polarParts(P('√2(cos(π/4)+i sin(π/4))')));
  assert.equal(polarParts(P('cos(π/4)-i sin(π/4)')), null);
  assert.ok(algebraicParts(P('3-2i')) && algebraicParts(P('√3/2+i/2')));
  assert.equal(algebraicParts(P('(1+i)^2')), null);
});

test('judge complex: right line, typical wrong line, final forms', () => {
  const j = JUDGES.complex;
  const cfg = { kind: 'complex' };
  const prev = j.parseLine(cfg, '(3+4i)/(1-2i)');
  assert.equal(j.judgeLine(cfg, prev, '(3+4i)(1+2i)/5').kind, 'ok');
  // (a + bi)/(c + di) = a/c + (b/d)i, a classic mistake.
  assert.equal(j.judgeLine(cfg, prev, '-3-2i').kind, 'wrong');
  assert.equal(j.judgeLine(cfg, prev, '-1+2i').kind, 'done');
  const pol = { kind: 'complex', form: 'exp', arg: 'principal' };
  const p1 = j.parseLine(pol, '1-i');
  assert.equal(j.judgeLine(pol, p1, '√2e^(-iπ/4)').kind, 'done');
  assert.equal(j.judgeLine(pol, p1, '√2e^(7iπ/4)').kind, 'stay');
  assert.equal(j.judgeLine(pol, p1, '√2e^(iπ/4)').kind, 'wrong');
  const set = { kind: 'complex', form: 'set' };
  const eq = j.parseLine(set, 'z^2+2z+5=0');
  assert.equal(j.judgeLine(set, eq, '(z+1)^2=-4').kind, 'ok');
  assert.equal(j.judgeLine(set, eq, 'z=-1+2i ou z=-1-2i').kind, 'done');
  assert.equal(j.judgeLine(set, eq, 'z=-1+2i').kind, 'wrong');
});

test('judge delta: δ(ε), N(ε), x(ε)', () => {
  const j = JUDGES.delta;
  const aff = { kind: 'delta', mode: 'delta', f: '3-4x', a: '-1', L: '7' };
  assert.equal(j.judgeLine(aff, null, 'δ = ε/4').kind, 'done');
  assert.equal(j.judgeLine(aff, null, '4ε').kind, 'wrong'); // δ inverted
  assert.equal(j.judgeLine(aff, null, 'ε/(4x)').kind, 'wrong'); // δ depends on x
  const quad = { kind: 'delta', mode: 'delta', f: 'x^2', a: '3', L: '9' };
  assert.equal(j.judgeLine(quad, null, 'min(1 ; ε/7)').kind, 'done');
  assert.equal(j.judgeLine(quad, null, 'ε/7').kind, 'wrong'); // no min(1 ; …): fails for big ε
  const seq = { kind: 'delta', mode: 'N', f: '(3n+1)/(n+2)', L: '3' };
  assert.equal(j.judgeLine(seq, null, 'N = 5/ε').kind, 'done');
  assert.equal(j.judgeLine(seq, null, '4/ε').kind, 'wrong');
  const sup = { kind: 'delta', mode: 'sup', set: '[0 ; 3[', s: '3' };
  assert.equal(j.judgeLine(sup, null, 'max(3-ε/2 ; 0)').kind, 'done');
  assert.equal(j.judgeLine(sup, null, '3-ε/2').kind, 'wrong'); // not in A for ε = 20
  assert.equal(j.isFinal(aff, parse('ε/4', { vars: ['ε'] })), true);
});

test('numeric limits: sequences, oscillations, bounded × zero', () => {
  const L = (t, v, to, dir, o) => limit(parse(t, { vars: [v] }), v, to, dir, o).value;
  const seq = { discrete: true };
  assert.equal(L('(-1)^n', 'n', '+inf', undefined, seq), 'none');
  assert.equal(L('sin(n)', 'n', '+inf', undefined, seq), 'none');
  assert.equal(L('(-1)^n×n', 'n', '+inf', undefined, seq), 'none');
  assert.ok(L('(-1)^n/n', 'n', '+inf', undefined, seq).eq(0));
  assert.ok(L('n^(1/n)', 'n', '+inf', undefined, seq).eq(1));
  assert.equal(L('ln(n)', 'n', '+inf', undefined, seq), '+inf');
  assert.ok(L('x×cos(1/x)', 'x', new Q(0)).eq(0));
  assert.equal(L('sin(1/x)', 'x', new Q(0)), 'none');
  assert.equal(L('sin(x)', 'x', '+inf'), 'none');
  assert.ok(L('x×ln(x)', 'x', new Q(0), '+').eq(0));
});

test('series in a line: partial sums and extrapolation', () => {
  const S = (t) => evalFloat(parse(t, { vars: ['k'] }), {});
  assert.ok(Math.abs(S('sum(1/k^2,k,1,∞)') - Math.PI ** 2 / 6) < 1e-9);
  assert.ok(Math.abs(S('sum((-1)^(k+1)/k,k,1,∞)') - Math.log(2)) < 1e-9);
  assert.ok(Math.abs(S('sum(k/2^k,k,1,∞)') - 2) < 1e-9);
  assert.ok(Number.isNaN(S('sum(1/k,k,1,∞)')));
  const d = JUDGES.definite;
  assert.equal(d.judgeLine({ kind: 'definite' }, parse('sum(3/2^k,k,1,∞)'), '3', {}).kind, 'done');
  assert.equal(d.judgeLine({ kind: 'definite' }, parse('sum(3/2^k,k,1,∞)'), '6', {}).kind, 'wrong');
});

test('counter-examples: sequences, series, functions', () => {
  const seq = (hyp, concl, a, more = {}) => checkCounter({ kind: 'sequence', hyp, concl, ...more }, a).ok;
  assert.ok(seq([{ p: 'bounded' }], { p: 'converges' }, { a: '(-1)^n' }));
  assert.ok(!seq([{ p: 'bounded' }], { p: 'converges' }, { a: '1/n' }));
  assert.ok(!seq([{ p: 'bounded' }], { p: 'converges' }, { a: 'n' }));
  assert.ok(seq([{ p: 'toZero' }], { p: 'seriesConverges' }, { a: '1/n' }));
  assert.ok(seq([{ p: 'seriesConverges' }], { p: 'absConverges' }, { a: '(-1)^n/n' }));
  assert.ok(seq([{ p: 'converges', of: 'a+b' }], { p: 'converges', of: 'a' }, { a: '(-1)^n', b: '-(-1)^n' }, { seqs: ['a', 'b'] }));
  const fn = (hyp, concl, f) => checkCounter({ kind: 'function', hyp, concl }, { f }).ok;
  assert.ok(fn([{ p: 'continuousAt', at: '0' }], { p: 'differentiableAt', at: '0' }, 'abs(x)'));
  assert.ok(!fn([{ p: 'continuousAt', at: '0' }], { p: 'differentiableAt', at: '0' }, 'x^2'));
  assert.ok(fn([{ p: 'boundedOn', on: ['-1', '1'] }], { p: 'limitAt', at: '0' }, 'sin(1/x)'));
});

test('problem: points per step, a skipped step, save and resume from JSON', () => {
  const it = generate('a1-improper-rational', 5, makeRng(5));
  assert.equal(it.type, 'problem');
  assert.equal(it.points.flat().reduce((a, b) => a + b, 0), 12);
  assert.ok(checkProblem(it).ok);
  const log = referenceLog(it);
  // Half the reference, then the profile is saved and the app closed.
  const run = new ProblemRun(it);
  for (const e of log.slice(0, 5)) run.apply(e);
  const profile = { pending: pendingOf(run) };
  const reloaded = JSON.parse(JSON.stringify(profile));
  const back = resumeRun(reloaded.pending);
  assert.equal(back.part, run.part);
  assert.equal(back.linesRun.seg, run.linesRun.seg);
  for (const e of log.slice(5)) back.apply(e);
  assert.ok(back.done);
  assert.equal(back.score().got, 12);
  assert.equal(back.outcome().correct, true);
  // A skipped step earns nothing; the next steps still count.
  const r2 = new ProblemRun(it);
  r2.skip();
  assert.equal(r2.score().parts[0].steps[0].got, 0);
  assert.equal(r2.linesRun.seg, 1);
});
