// The judges of step U3 (spec §13): for each one, a right line is accepted,
// a typical wrong line is refused (and its trap named when there is one),
// and the final form is recognised. Then the counter-examples of linear
// algebra, and module L is complete (no stand-in left).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JUDGES, readWith } from '../js/judges/index.js';
import { checkCounter } from '../js/judges/examples.js';
import { RULES as L_RULES } from '../js/cas/rules/l.js';
import { UNI_SKILLS } from '../js/content/uni/index.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { parseMatLine, evalAst, valueText } from '../js/cas/matexpr.js';

const J = (cfg, prev, line, state = {}) => JUDGES[cfg.kind].judgeLine(cfg, readWith(cfg, prev), line, state);

test('matexpr reads matrices, vectors, operations, factors and expressions', () => {
  const v = (t, names = {}) => {
    const line = parseMatLine(t, { vars: ['a', 'λ', 't'] });
    const env = Object.fromEntries(Object.entries(names).map(([k, x]) => [k, evalAst(parseMatLine(x, {}).body)]));
    return line.body ? valueText(evalAst(line.body, env, { vars: ['a', 'λ', 't'] })) : line;
  };
  assert.equal(v('[[1,2,-1|3],[2,5,1|7]]'), '[[1,2,-1|3],[2,5,1|7]]');
  assert.equal(v('P·D·P^(-1)', { P: '[[1,1],[2,1]]', D: 'diag(1,3)' }), '[[5,-2],[4,-1]]');
  assert.equal(v('PDP⁻¹', { P: '[[1,1],[2,1]]', D: 'diag(1,3)' }), '[[5,-2],[4,-1]]');
  assert.equal(v('(1;1)/√2'), '(√2/2 ; √2/2)');
  assert.equal(v('√2/2'), '√2/2');
  assert.equal(v('-4·det[[2,3],[3,1]]'), '28');
  assert.equal(v('(2 ; -1 ; 0) + t(3 ; -1 ; 1)'), '(3t+2 ; -t-1 ; t)');
  const ops = v('L2 ← L2 − 2L1 ; L3 <- L3 + aL1 ; L1 ↔ L3 ; L2 ← (1/2)L2 ; L3 ← 2L3 − L1');
  assert.deepEqual(ops.ops.map((o) => o.kind), ['add', 'add', 'swap', 'scale', 'combo']);
  assert.deepEqual(v('L = [[1,0],[2,1]] ; U = [[2,1],[0,3]]').assigns.map((a) => a.name), ['L', 'U']);
});

test('rowops: an operation, its matrix, the goal; traps of row operations', () => {
  const cfg = { kind: 'rowops', goal: 'echelon' };
  const A = '[[1,2,-1|3],[2,5,1|7],[-1,1,4|0]]';
  assert.equal(J(cfg, A, 'L2 ← L2 - 2L1').kind, 'ok');
  assert.equal(J(cfg, A, 'L2 ← L2 - 2L1 : [[1,2,-1|3],[0,1,3|1],[-1,1,4|0]]').kind, 'ok');
  assert.equal(J(cfg, A, '[[1,2,-1|3],[0,1,3|1],[-1,1,4|0]]').kind, 'ok', 'the operation is recognised');
  const w = J(cfg, A, 'L2 ← L2 - 2L1 : [[1,2,-1|3],[0,1,3|7],[-1,1,4|0]]');
  assert.equal(w.kind, 'wrong');
  assert.equal(w.rule, 'l_rhs_forgotten');
  assert.equal(J(cfg, A, '[[1,2,-1|3],[0,1,3|1],[0,3,3|3]]').kind, 'wrong', 'two operations in one line');
  assert.equal(J({ ...cfg, multi: true }, A, '[[1,2,-1|3],[0,1,3|1],[0,3,3|3]]').kind, 'ok');
  assert.equal(J(cfg, '[[1,2,-1|3],[0,1,3|1],[0,3,3|3]]', 'L3 ← L3 - 3L2').kind, 'done');
  assert.equal(J(cfg, A, 'L2 ← 0L2').kind, 'form');
  // A parameter: no division by an expression of a.
  const pc = { kind: 'rowops', vars: ['a'], goal: 'echelon' };
  const P = '[[1,1,a|1],[1,a,1|1],[a,1,1|1]]';
  assert.equal(J(pc, P, 'L3 ← L3 - aL1').kind, 'ok');
  assert.equal(J(pc, P, 'L2 ← (1/(a-1))L2').rule, 'l_param_divide_zero');
  // The determinant follows the operations.
  const dc = { kind: 'rowops', track: 'det' };
  assert.equal(J(dc, 'det[[0,2],[3,4]]', 'L1 ↔ L2 : -det[[3,4],[0,2]]').kind, 'ok');
  const d = J(dc, 'det[[0,2],[3,4]]', 'L1 ↔ L2 : det[[3,4],[0,2]]');
  assert.equal(d.kind, 'wrong');
  assert.equal(d.rule, 'l_det_swap_sign');
  assert.equal(J(dc, '-det[[3,4],[0,2]]', '-6').kind, 'done');
});

test('mat: values, expressions, the final literal, a trap', () => {
  const cfg = { kind: 'mat', names: { A: '[[1,2],[0,-1],[3,1]]', B: '[[2,0,1],[1,-1,4]]' }, expect: 'AB' };
  assert.equal(J(cfg, 'M', 'AB').kind, 'ok');
  assert.equal(J(cfg, 'M', '[[4,-2,9],[-1,1,-4],[7,-1,7]]').kind, 'done');
  assert.equal(J(cfg, 'M', '[[4,-2,9],[-1,1,-4],[7,-1,8]]').kind, 'wrong');
  assert.equal(J(cfg, 'M', '[[2+2,-2,9],[-1,1,-4],[7,-1,7]]').kind, 'stay', 'a case still to compute');
});

test('det: lines with determinants, the cofactor sign, the factored polynomial', () => {
  const cfg = { kind: 'det', target: 'number' };
  const A = 'det[[2,0,1,3],[0,0,4,0],[1,-1,2,0],[3,0,5,1]]';
  assert.equal(J(cfg, A, '-4·det[[2,0,3],[1,-1,0],[3,0,1]]').kind, 'ok');
  const w = J(cfg, A, '4·det[[2,0,3],[1,-1,0],[3,0,1]]');
  assert.equal(w.kind, 'wrong');
  assert.equal(w.rule, 'l_cofactor_sign');
  assert.equal(J(cfg, '-4·(-1)·(2-9)', '-28').kind, 'done');
  const cp = { kind: 'det', vars: ['λ'], target: 'factored' };
  assert.equal(J(cp, 'det[[2-λ,0,0],[1,3-λ,1],[1,1,3-λ]]', '(2-λ)·det[[3-λ,1],[1,3-λ]]').kind, 'ok');
  assert.equal(J(cp, '(2-λ)((3-λ)^2-1)', '(2-λ)(λ^2-6λ+8)').kind, 'ok', 'not factored yet');
  assert.equal(J(cp, '(2-λ)((3-λ)^2-1)', '-(λ-2)^2(λ-4)').kind, 'done');
});

test('eigvec: any non-zero multiple, never 0, complex entries', () => {
  const cfg = { kind: 'eigvec', A: '[[3,1,0],[1,3,0],[0,0,2]]', lambda: '4' };
  assert.equal(J(cfg, 'v', '(1 ; 1 ; 0)').kind, 'done');
  assert.equal(J(cfg, 'v', '(-2 ; -2 ; 0)').kind, 'done');
  assert.equal(J(cfg, 'v', '(1 ; -1 ; 0)').kind, 'wrong');
  assert.equal(J(cfg, 'v', '(0 ; 0 ; 0)').rule, 'l_eigvec_zero');
  const c = { kind: 'eigvec', A: '[[1,-2],[1,3]]', lambda: '2+i', complex: true };
  assert.equal(J(c, 'v', '(-1+i ; 1)').kind, 'done');
  assert.equal(J(c, 'v', '(-1-i ; 1)').kind, 'wrong');
});

test('span: same space, the requirement, nested Gram-Schmidt, affine sets', () => {
  const k = { kind: 'span', basis: ['(-2;1;0;0)', '(1;0;-3;1)'] };
  assert.equal(J(k, 'Ker A', 'Span{(-1;1;-3;1), (1;0;-3;1)}').kind, 'done');
  assert.equal(J(k, 'Ker A', '(2;1;0;0), (1;0;-3;1)').kind, 'wrong');
  assert.equal(J(k, 'Ker A', '(-2;1;0;0), (1;0;-3;1), (-1;1;-3;1)').kind, 'stay', 'linked: not a basis');
  const gs = { kind: 'span', basis: ['(1;1;0;1)', '(4;1;1;1)', '(-1;3;-1;1)'], nested: true, require: 'orthogonal' };
  assert.equal(J(gs, 'x', '(1;1;0;1), (2;-1;1;-1)').kind, 'ok');
  assert.equal(J(gs, 'x', '(1;1;0;1), (2;-1;1;-1), (0;1;0;-1)').kind, 'done');
  assert.equal(J(gs, 'x', '(1;1;0;1), (4;1;1;1)').kind, 'stay', 'not orthogonal');
  const on = { kind: 'span', basis: ['(1;1;1)', '(1;-1;0)'], require: 'orthonormal' };
  assert.equal(J(on, 'x', '(1;1;1)/√3, (1;-1;0)/√2').kind, 'done');
  assert.equal(J(on, 'x', '(1;1;1), (1;-1;0)').kind, 'stay');
  const af = { kind: 'span', basis: ['(3;-1;1)'], affine: '(2;-1;0)' };
  assert.equal(J(af, 'x', 'x = (5 ; -2 ; 1) + s(-3 ; 1 ; -1)').kind, 'done');
  assert.equal(J(af, 'x', '(2 ; 1 ; 0) + t(3 ; -1 ; 1)').kind, 'wrong');
});

test('factor: LU, PDP⁻¹, orthogonal diagonalisation, QR and SVD', () => {
  const lu = { kind: 'factor', A: '[[2,1,-1],[4,1,0],[-2,-4,10]]', of: 'LU' };
  const st = {};
  assert.equal(J(lu, 'A', 'L = [[1,0,0],[2,1,0],[-1,3,1]]', st).kind, 'ok');
  assert.equal(J(lu, 'A', 'U = [[2,1,-1],[0,-1,2],[0,0,3]]', st).kind, 'done');
  const w = J(lu, 'A', 'L = [[1,0,0],[-2,1,0],[1,-3,1]]');
  assert.equal(w.kind, 'wrong');
  assert.equal(w.rule, 'l_lu_sign');
  const pd = { kind: 'factor', A: '[[5,-2],[4,-1]]', of: 'PDP' };
  assert.equal(J(pd, 'A', 'P = [[1,1],[2,1]] ; D = diag(1,3)').kind, 'done');
  assert.equal(J(pd, 'A', 'P = [[1,1],[1,2]] ; D = diag(1,3)').kind, 'wrong', 'columns not in the order of D');
  const od = { kind: 'factor', A: '[[11,-12],[-12,4]]', of: 'orthodiag' };
  assert.equal(J(od, 'A', 'Q = (1/5)[[3,4],[4,-3]] ; D = diag(-5,20)').kind, 'done');
  assert.equal(J(od, 'A', 'Q = [[3,4],[4,-3]] ; D = diag(-5,20)').kind, 'wrong');
  const qr = { kind: 'factor', A: '[[1,2,2],[1,0,4],[1,2,0],[1,0,2]]', of: 'QR' };
  assert.equal(J(qr, 'A', 'Q = (1/2)[[1,1,1],[1,-1,1],[1,1,-1],[1,-1,-1]] ; R = [[2,2,4],[0,2,-2],[0,0,2]]').kind, 'done');
  const sv = { kind: 'factor', A: '[[4,5,2],[0,3,6]]', of: 'SVD' };
  assert.equal(J(sv, 'A', 'U = (1/√2)[[1,1],[1,-1]] ; Σ = [[6√2,0,0],[0,3√2,0]] ; V = (1/3)[[1,2,2],[2,1,-2],[2,-2,1]]').kind, 'done');
  assert.equal(J(sv, 'A', 'Σ = [[72,0,0],[0,18,0]]').kind, 'wrong', 'σ = √λ');
});

test('counter-examples of linear algebra', () => {
  const ok = (counter, answers) => checkCounter(counter, answers).ok;
  assert.ok(ok({ kind: 'matPair', params: { n: 2, test: 'det(A+B)=detA+detB' } }, { A: '[[1,0],[0,1]]', B: '[[1,0],[0,1]]' }));
  assert.ok(!ok({ kind: 'matPair', params: { n: 2, test: 'AB=BA' } }, { A: '[[1,0],[0,1]]', B: '[[1,2],[0,1]]' }));
  assert.ok(ok({ kind: 'matOne', params: { want: 'diagRepeated', n: 3 } }, { A: 'diag(1,1,2)' }));
  assert.ok(!ok({ kind: 'matOne', params: { want: 'diagRepeated', n: 3 } }, { A: '[[1,1,0],[0,1,0],[0,0,2]]' }));
  assert.ok(ok({ kind: 'matOne', params: { want: 'orthCols' } }, { A: '[[2,0],[0,2]]' }));
  assert.ok(ok({ kind: 'vecFamily', params: { want: 'orthNotTransitive' } }, { u: '(1;0)', v: '(0;1)', w: '(1;0)' }));
  assert.ok(ok({ kind: 'setWitness', params: { n: 4, member: 'x_1x_4-x_2x_3=0' } }, { x: '[[1,0],[0,0]]', y: '[[0,0],[0,1]]' }));
  assert.ok(ok({ kind: 'mapWitness', params: { A: '[[1,2],[2,4]]' } }, { x: '(2;-1)', y: '(0;0)' }));
  assert.ok(!ok({ kind: 'dims', params: { conds: ['m<n'] } }, { m: '3', n: '2', r: '1' }));
});

test('module L is complete: every trap defined, every skill built', () => {
  const stubs = L_RULES.filter((r) => r.stub).map((r) => r.id);
  assert.deepEqual(stubs, [], 'traps still to define');
  for (const s of UNI_SKILLS.filter((x) => x.unit === 'alglin')) {
    assert.ok(!generate(s.id, 3, makeRng(1)).stub, `${s.id} is built`);
    assert.ok(!L_RULES.some((r) => r.name?.startsWith('Piège ')), 'every trap has a name');
  }
});
