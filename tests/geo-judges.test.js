// Step U5: the judges of analytic geometry (vector, geom, conic), the conic
// analysis, and the `plot` items. For each judge: a right line, a typical
// wrong line, and the final form (spec §13).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JUDGES, readWith } from '../js/judges/index.js';
import { readObject, sameObject } from '../js/cas/geomobj.js';
import { analyzeConic, coefsOfText, conicIn } from '../js/cas/conic.js';
import { checkPlot, referenceAnswer, implicitSegments } from '../js/judges/plot.js';
import { checkCounter } from '../js/judges/examples.js';

const run = (cfg, start, lines) => {
  let prev = readWith(cfg, start);
  const state = {};
  return lines.map((l) => {
    const v = JUDGES[cfg.kind].judgeLine(cfg, prev, l, state);
    if (v.kind === 'ok' || v.kind === 'done') prev = v.node;
    return v.kind;
  });
};

test('vector: points, vectors, dot and cross products, final form', () => {
  const cfg = { kind: 'vector', symbols: { A: '(2 ; 1)', B: '(5 ; -3)', M: '(4 ; 2)' }, expect: '(6 ; 3)' };
  assert.deepEqual(run(cfg, 'C', ['C = 2M − A', 'C = (8 − 2 ; 4 − 1)', '(6 ; 3)']), ['ok', 'ok', 'done']);
  assert.deepEqual(run(cfg, 'C', ['M − A']), ['wrong']);
  assert.equal(JUDGES.vector.judgeLine(cfg, readWith(cfg, 'C'), 'C = 2M - A = (6 ; 4)').kind, 'wrong', 'unequal members');
  const c = { kind: 'vector', symbols: { u: '(2 ; -1 ; 3)', v: '(1 ; 0 ; -2)' }, expect: 'u ∧ v' };
  assert.deepEqual(run(c, 'u ∧ v', ['((-1)(-2) - 3·0 ; 3·1 - 2·(-2) ; 2·0 - (-1)·1)', '(2 ; 7 ; 1)']), ['ok', 'done']);
  assert.deepEqual(run(c, 'u ∧ v', ['(2 ; -7 ; 1)']), ['wrong']);
  const d = { kind: 'vector', symbols: { A: '(1 ; 2 ; 0)', B: '(2 ; 3 ; 0)', C: '(2 ; 2 ; 1)' }, expect: '1/2', angle: true };
  assert.deepEqual(run(d, 'cos θ', ['cos θ = AB·AC/(‖AB‖·‖AC‖)', '1/(√2·√2)', '1/2']), ['ok', 'ok', 'done']);
  // A nonzero multiple (a normal vector).
  const n = { kind: 'vector', expect: '(4 ; -3 ; 5)', multiple: true };
  assert.deepEqual(run(n, 'n', ['(-8 ; 6 ; -10)']), ['done']);
  assert.deepEqual(run(n, 'n', ['(0 ; 0 ; 0)']), ['wrong']);
});

test('geom: lines and planes in all their forms, unions, circles', () => {
  const objs = [
    ['(x ; y) = (1 ; -2) + t(3 ; 2)', '2x - 3y - 8 = 0', 2],
    ['x = 1 + 3t ; y = -2 + 2t', '2x - 3y = 8', 2],
    ['(x - 1)/2 = (y + 2)/1 = (z - 3)/(-1)', 'x - 2y - 5 = 0 ; y + z - 1 = 0', 3],
    ['(x ; y ; z) = (1 ; 0 ; 2) + s(2 ; 1 ; -1) + t(-1 ; 2 ; 2)', '4x - 3y + 5z - 14 = 0', 3],
    ['|3x - 4y + 1|/5 = |4x + 3y - 7|/5', 'x + 7y - 8 = 0 ou 7x - y - 6 = 0', 2],
    ['x^2 + y^2 + z^2 - 2x + 4y - 6z + 5 = 0', '(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 9', 3],
  ];
  for (const [a, b, dim] of objs) assert.ok(sameObject(readObject(a, { dim }), readObject(b, { dim })), `${a} ⇔ ${b}`);
  assert.ok(!sameObject(readObject('2x - 3y + 8 = 0', { dim: 2 }), readObject('2x - 3y - 8 = 0', { dim: 2 })));
  const cfg = { kind: 'geom', object: 'line2', ref: '2x - 3y - 8 = 0' };
  assert.deepEqual(run(cfg, '(x ; y) = (1 ; -2) + t(3 ; 2)', ['2x − 3y = 2 + 6', '2x − 3y − 8 = 0']), ['ok', 'done']);
  assert.equal(JUDGES.geom.judgeLine(cfg, readWith(cfg, 'd'), '4x − 6y − 16 = 0').kind, 'stay', 'whole coprime coefficients');
  assert.equal(JUDGES.geom.judgeLine(cfg, readWith(cfg, 'd'), '2x − 3y + 8 = 0').kind, 'wrong');
  const bis = { kind: 'geom', object: 'line2', ref: 'x + 7y - 8 = 0 ou 7x - y - 6 = 0', count: 2 };
  assert.deepEqual(run(bis, 'b', ['|3x-4y+1|/5 = |4x+3y-7|/5', 'x + 7y - 8 = 0 ou 7x - y - 6 = 0']), ['ok', 'done']);
  assert.equal(JUDGES.geom.judgeLine(bis, readWith(bis, 'b'), 'x + 7y - 8 = 0').kind, 'wrong', 'one bisector only');
  const l3 = { kind: 'geom', object: 'line3', ref: '(x ; y ; z) = (1 ; -2 ; 3) + t(2 ; 1 ; -1)' };
  assert.equal(JUDGES.geom.judgeLine(l3, readWith(l3, 'd'), 'x - 2y - 5 = 0').kind, 'wrong', 'one equation is a plane');
  assert.equal(JUDGES.geom.judgeLine(l3, readWith(l3, 'd'), 'x - 2y - 5 = 0 ; y + z - 1 = 0').kind, 'done');
  const ci = { kind: 'geom', object: 'circle', ref: 'x^2 + y^2 - 4x + 6y - 12 = 0' };
  assert.deepEqual(run(ci, '2x^2 + 2y^2 - 8x + 12y - 24 = 0', ['(x − 2)^2 − 4 + (y + 3)^2 − 9 − 12 = 0', '(x - 2)^2 + (y + 3)^2 = 25']), ['ok', 'done']);
  assert.equal(JUDGES.geom.judgeLine(ci, readWith(ci, 'γ'), '(x - 2)^2 + (y + 3)^2 = 12').kind, 'wrong');
});

test('conic: analysis of the catalogue examples', () => {
  const a = analyzeConic(coefsOfText('x^2 + 6xy + y^2 - 10x + 2y - 31 = 0'));
  assert.equal(a.type, 'hyperbola');
  assert.deepEqual(a.center.map(Math.round), [-1, 2]);
  assert.deepEqual(a.foci.map((P) => P.map((x) => Math.round(x * 1e6) / 1e6)).sort(), [[-4, -1], [2, 5]]);
  assert.ok(Math.abs(a.Delta - 192) < 1e-9 && Math.abs(a.delta + 8) < 1e-9);
  const e = analyzeConic(coefsOfText('4x^2 + 9y^2 - 16x + 54y + 61 = 0'));
  assert.equal(e.type, 'ellipse');
  assert.ok(Math.abs(e.c - Math.sqrt(5)) < 1e-9 && Math.abs(e.e - Math.sqrt(5) / 3) < 1e-9);
  const p = analyzeConic(coefsOfText('x^2 - 6x - 8y + 1 = 0'));
  assert.equal(p.type, 'parabola');
  assert.deepEqual(p.foci[0].map((x) => Math.round(x * 1e9) / 1e9), [3, 1]);
  assert.ok(Math.abs(p.p - 4) < 1e-9);
  assert.equal(analyzeConic(coefsOfText('x^2 + y^2 + 1 = 0')).type, 'empty');
  assert.equal(analyzeConic(coefsOfText('(x - y)(x + 2y) = 0')).type, 'lines');
  // The reduced equation in the frame of the axes.
  const r = analyzeConic(coefsOfText('2x^2 + 4xy - y^2 - 6y - 9 = 0'));
  const c = conicIn(r.coefs, { O: [1, -1], u1: [2 / Math.sqrt(5), 1 / Math.sqrt(5)], u2: [-1 / Math.sqrt(5), 2 / Math.sqrt(5)] });
  assert.deepEqual(c.map((x) => Math.round(x * 1e9) / 1e9), [3, 0, -2, 0, 0, -6]);
});

test('conic judge: completing the squares, elements, reduced equation', () => {
  const ell = { kind: 'conic', equation: '4x^2 + 9y^2 - 16x + 54y + 61 = 0', ask: ['Ω', 'a', 'b', 'F', 'e'] };
  assert.deepEqual(run(ell, '4x^2 + 9y^2 - 16x + 54y + 61 = 0', [
    '4(x − 2)^2 − 16 + 9(y + 3)^2 − 81 + 61 = 0', '(x − 2)^2/9 + (y + 3)^2/4 = 1', 'Ω = (2 ; −3) ; a = 3 ; b = 2',
    'F = (2 + √5 ; −3) ; F\' = (2 − √5 ; −3)', 'e = √5/3',
  ]), ['ok', 'ok', 'ok', 'ok', 'done']);
  assert.equal(JUDGES.conic.judgeLine(ell, readWith(ell, 'E'), 'F = (2 + √13 ; −3)').kind, 'wrong', 'c² = a² + b² is the hyperbola');
  assert.equal(JUDGES.conic.judgeLine(ell, readWith(ell, 'E'), '(x − 2)^2/9 + (y + 3)^2/4 = 2').kind, 'wrong');
  const hyp = { kind: 'conic', equation: '9x^2 - 16y^2 - 18x - 64y - 199 = 0', ask: ['asymptotes'] };
  assert.deepEqual(run(hyp, 'H', ['asymptotes : 3x − 4y − 11 = 0 ou 3x + 4y + 5 = 0']), ['done']);
  assert.equal(JUDGES.conic.judgeLine(hyp, readWith(hyp, 'H'), 'asymptote : 4x − 3y − 11 = 0').kind, 'wrong', 'slope a/b');
  const red = { kind: 'conic', equation: '2x^2 + 4xy - y^2 - 6y - 9 = 0', target: 'reduced', frame: { O: '(1 ; -1)', u1: '(2 ; 1)/√5', u2: '(-1 ; 2)/√5' } };
  assert.equal(JUDGES.conic.judgeLine(red, readWith(red, 'C'), '3X^2 - 2Y^2 - 6 = 0').kind, 'done');
  assert.equal(JUDGES.conic.judgeLine(red, readWith(red, 'C'), 'X^2/2 - Y^2/3 = 1').kind, 'done');
  assert.equal(JUDGES.conic.judgeLine(red, readWith(red, 'C'), '-2X^2 + 3Y^2 - 6 = 0').kind, 'done', 'the axes in the other order');
  assert.equal(JUDGES.conic.judgeLine(red, readWith(red, 'C'), '15X^2 - 10Y^2 - 6 = 0').kind, 'wrong');
  const par = { kind: 'conic', equation: 'x^2 - 6x - 8y + 1 = 0', ask: ['S', 'F', 'directrice'] };
  assert.deepEqual(run(par, 'x^2 - 6x - 8y + 1 = 0', ['(x − 3)^2 = 8(y + 1)', 'S = (3 ; −1) ; F = (3 ; 1)', 'directrice : y = −3']), ['ok', 'ok', 'done']);
  assert.equal(JUDGES.conic.judgeLine(par, readWith(par, 'P'), 'F = (3 ; 3)').kind, 'wrong', 'p instead of p/2');
});

test('plot: elements placed within tolerance, lines by two points', () => {
  const item = {
    type: 'plot', task: 'conic', view: { x: [-6, 6], y: [-6, 6] }, equation: '9x^2 - 16y^2 - 18x - 64y - 199 = 0',
    place: [{ id: 'center', label: 'Ω', kind: 'point', count: 1 }, { id: 'vertices', label: 'sommets', kind: 'point', count: 2 }, { id: 'asymptotes', label: 'asymptotes', kind: 'line', count: 2 }],
    expect: { center: [[1, -2]], vertices: [[5, -2], [-3, -2]], asymptotes: [[0.6, -0.8, -2.2], [0.6, 0.8, 1]] },
    tol: { pos: 0.15, line: 0.25 },
  };
  const ans = referenceAnswer(item);
  assert.ok(checkPlot(item, ans).ok);
  assert.ok(checkPlot(item, { ...ans, vertices: [[-3, -2], [5.1, -2]] }).ok, 'any order, within tolerance');
  const r = checkPlot(item, { ...ans, center: [[1, 2]] });
  assert.equal(r.ok, false);
  assert.equal(r.score, 2 / 3);
  assert.equal(checkPlot(item, { ...ans, asymptotes: [[[1, -2], [5, 1]], [[1, -2], [5, -2]]] }).ok, false, 'the axis is not an asymptote');
  const c = analyzeConic(coefsOfText(item.equation));
  assert.ok(implicitSegments((x, y) => c.P(x, y), item.view).length > 50);
});

test('counter-examples of analytic geometry', () => {
  const counter = { kind: 'geo', want: 'flatParallelogram', ask: ['A', 'B', 'C', 'D'].map((v) => ({ v, text: true })) };
  assert.ok(checkCounter(counter, { A: '(0 ; 0)', B: '(1 ; 1)', C: '(3 ; 3)', D: '(2 ; 2)' }).ok);
  assert.equal(checkCounter(counter, { A: '(0 ; 0)', B: '(1 ; 0)', C: '(1 ; 1)', D: '(0 ; 1)' }).ok, false, 'a true parallelogram');
});
