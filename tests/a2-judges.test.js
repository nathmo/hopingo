// Step U6 (module A2): the engine. Several variables in `equiv` (∂ notation,
// witnesses), and the judges `ode`, `system`, `bound`, `domain`: a right
// line, a typical wrong line, the final form (spec §13).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parse } from '../js/cas/parse.js';
import { toText, toReadable } from '../js/cas/print.js';
import { toMathML } from '../js/cas/mathml.js';
import { expandDerivs } from '../js/cas/diff.js';
import { JUDGES } from '../js/judges/index.js';
import { checkCounter } from '../js/judges/examples.js';
import { judgeDomainItem } from '../js/judges/domain-item.js';

const run = (cfg, start, lines) => {
  const j = JUDGES[cfg.kind];
  const state = {};
  let prev = j.parseLine ? j.parseLine(cfg, start) : parse(start, { vars: cfg.vars });
  return lines.map((l) => {
    const v = j.judgeLine(cfg, prev, l, state);
    if (v.kind === 'ok' || v.kind === 'done' || v.kind === 'stay') prev = v.node;
    return v.kind;
  });
};

test('partial derivatives: pd(f, x) reads, prints back and expands', () => {
  const n = parse('pd(x^2 y+sin(x y),x)');
  assert.equal(toText(n), 'pd(x^2y+sin(xy),x)');
  assert.equal(toText(parse(toText(n))), toText(n));
  assert.match(toReadable(n), /^∂\/∂x/);
  assert.match(toMathML(n), /∂/);
  const mixed = expandDerivs(parse('pd(x^3 y^2, x, y)'));
  assert.equal(JUDGES.equiv.judgeLine({ kind: 'equiv', vars: ['x', 'y'] }, mixed, '6x^2 y').kind, 'done');
});

test('equiv in several variables: right line, wrong line with its point, final form', () => {
  const cfg = { kind: 'equiv', vars: ['x', 'y', 'z'], domain: { x: [0.2, 3] }, target: 'no-prime' };
  const start = parse('pd(x^2+y z^2,z)');
  assert.equal(JUDGES.equiv.judgeLine(cfg, start, '2y z').kind, 'done');
  const w = JUDGES.equiv.judgeLine(cfg, start, '2z');
  assert.equal(w.kind, 'wrong');
  assert.match(w.message, /En \(x ; y ; z\) = \(/);
  const polar = { kind: 'equiv', vars: ['r', 'φ'], domain: { r: [0.01, 1], φ: [0, 6.28] } };
  assert.equal(run(polar, '(r^3 cos(φ)^3 + r^3 cos(φ) sin(φ)^2)/r^2', ['r cos(φ)'])[0], 'done');
  assert.equal(run(polar, '(r^3 cos(φ)^3)/r^2', ['r cos(φ)'])[0], 'wrong');
});

test('ode: separable, with the separated and implicit lines and the initial condition', () => {
  const cfg = { kind: 'ode', eq: "y'=9-y^2", order: 1, ic: { x: 0, y: 0 }, yRange: [-2.9, 2.9] };
  assert.deepEqual(run(cfg, cfg.eq, ['dy/(9-y^2) = dx', 'int(1/(9-y^2),y) = int(1,x)', '(1/6)ln(|(3+y)/(3-y)|) = x + C', 'C = 0', 'y = 3(e^(6x)-1)/(e^(6x)+1)']), ['ok', 'ok', 'ok', 'ok', 'done']);
  assert.equal(run(cfg, cfg.eq, ['dy = (9-y^2) dx'])[0], 'wrong', 'not separated');
  assert.equal(run(cfg, cfg.eq, ['(1/6)ln(|(3+y)/(3-y)|) = 2x + C'])[0], 'wrong');
  assert.equal(run(cfg, cfg.eq, ['y = 3tanh(3x)+1'])[0], 'wrong');
  assert.equal(run(cfg, cfg.eq, ['y = 3tanh(3x)'])[0], 'done');
});

test('ode: linear, integrating factor, (μy)′ and the constant', () => {
  const cfg = { kind: 'ode', eq: "x*y'+2y=4x^2", order: 1, ic: { x: 1, y: 2 }, mu: '2/x', domain: { x: [0.2, 4] } };
  assert.deepEqual(run(cfg, cfg.eq, ["y'+(2/x)y=4x", 'μ = x^2', 'd(x^2 y) = 4x^3', 'x^2 y = x^4 + C', 'C = 1', 'y = x^2 + 1/x^2']), ['ok', 'ok', 'ok', 'ok', 'ok', 'done']);
  assert.equal(run(cfg, cfg.eq, ['μ = x'])[0], 'wrong');
  assert.equal(run(cfg, cfg.eq, ['y = x^2'])[0], 'wrong', 'initial condition');
  assert.equal(run({ ...cfg, ic: undefined }, cfg.eq, ['y = x^2 + C/x^2'])[0], 'done', 'general solution');
});

test('ode: second order, constants counted, y_h and y_p', () => {
  const cfg = { kind: 'ode', eq: "y''-4y'+13y=0", order: 2, ic: { x: 0, y: 1, dy: 0 } };
  assert.deepEqual(run(cfg, cfg.eq, ['y = e^(2x)(C_1 cos(3x) + C_2 sin(3x))', 'C_1 = 1 ; C_2 = -2/3', 'y = e^(2x)(cos(3x) - (2/3)sin(3x))']), ['ok', 'ok', 'done']);
  assert.equal(run(cfg, cfg.eq, ['y = e^(2x)(C_1 cos(3x) + C_1 sin(3x))'])[0], 'wrong', 'one constant');
  assert.equal(run(cfg, cfg.eq, ['y = e^(3x)(C_1 cos(2x) + C_2 sin(2x))'])[0], 'wrong');
  const nh = { kind: 'ode', eq: "y''-3y'+2y=4e^(2x)", order: 2 };
  assert.deepEqual(run(nh, nh.eq, ['y_h = C_1 e^x + C_2 e^(2x)', 'y_p = 4x e^(2x)', 'y = C_1 e^x + C_2 e^(2x) + 4x e^(2x)']), ['ok', 'ok', 'done']);
  assert.equal(run(nh, nh.eq, ['y_p = 4e^(2x)'])[0], 'wrong', 'resonance');
});

test('system: transformations, cases, a lost solution, an extra one, the point list', () => {
  const cfg = { kind: 'system', vars: ['x', 'y'], solutions: [['2', '1'], ['1', '2'], ['-1', '-2'], ['-2', '-1']] };
  assert.deepEqual(run(cfg, '3x^2+3y^2-15 = 0 ; 6x y - 12 = 0', ['x^2+y^2 = 5 ; x y = 2', '(x+y = 3 ou x+y = -3) ; (x-y = 1 ou x-y = -1)', '(2 ; 1), (1 ; 2), (-1 ; -2), (-2 ; -1)']), ['ok', 'ok', 'done']);
  assert.equal(run(cfg, 'x^2+y^2 = 5 ; x y = 2', ['x+y = 3 ; x-y = 1'])[0], 'wrong', 'lost solutions');
  assert.equal(run(cfg, 'x^2+y^2 = 5 ; x y = 2', ['(2 ; 1), (1 ; 2), (-1 ; -2), (-2 ; -1), (0 ; 0)'])[0], 'wrong', 'extra solution');
  const lg = { kind: 'system', vars: ['x', 'y', 'λ'], elim: ['λ'], solutions: [['2', '1', '1/4'], ['-2', '-1', '1/4'], ['2', '-1', '-1/4'], ['-2', '1', '-1/4']] };
  assert.deepEqual(run(lg, 'y = 2λx ; x = 8λy ; x^2+4y^2 = 8', ['(y = x/2 ou y = -x/2) ; x^2 + 4y^2 = 8', '(2 ; 1), (-2 ; -1), (2 ; -1), (-2 ; 1)']), ['ok', 'done']);
});

test('bound: polar bounds in r, a dependence on φ, a bound that does not tend to 0', () => {
  const cfg = { kind: 'bound', vars: ['r', 'φ'] };
  assert.deepEqual(run(cfg, 'r(2cos(φ)^3-cos(φ)sin(φ)^2)+r^2 sin(φ)^4', ['r×|2cos(φ)^3-cos(φ)sin(φ)^2|+r^2', '3r+r^2']), ['ok', 'done']);
  assert.equal(run(cfg, 'r(2cos(φ)^3-cos(φ)sin(φ)^2)', ['r'])[0], 'wrong');
  assert.equal(run(cfg, 'r(2cos(φ)^3-cos(φ)sin(φ)^2)', ['3'])[0], 'stay');
});

test('domain: types I and II, polar and spherical bounds, an inner letter outside', () => {
  const cfg = { kind: 'domain', coords: 'cart', region: ['y ≥ x^2', 'y ≤ 2x'], box: [[-0.5, 2.5], [-0.5, 4.5]], order: ['y', 'x'], shape: 'typeII' };
  assert.equal(run(cfg, '0 ≤ x ≤ 2 ; x^2 ≤ y ≤ 2x', ['0 ≤ y ≤ 4 ; y/2 ≤ x ≤ √y'])[0], 'done');
  assert.equal(run(cfg, '0 ≤ y ≤ 4 ; y/2 ≤ x ≤ √y', ['0 ≤ x ≤ 2 ; x^2 ≤ y ≤ 2x'])[0], 'stay', 'type I asked as type II');
  assert.equal(run(cfg, '0 ≤ x ≤ 2 ; x^2 ≤ y ≤ 2x', ['0 ≤ y ≤ 4 ; √y ≤ x ≤ y/2'])[0], 'wrong');
  const v = JUDGES.domain.judgeLine(cfg, null, 'x^2 ≤ y ≤ 2x ; 0 ≤ x ≤ 2');
  assert.equal(v.rule, 'a2_fubini_outer_var');
  const polar = { kind: 'domain', coords: 'polar', region: ['x^2+y^2 ≤ 4', 'x^2+y^2 ≥ 1', 'y ≥ 0'], box: [[-2.2, 2.2], [-0.3, 2.2]] };
  assert.equal(JUDGES.domain.judgeLine(polar, null, '0 ≤ φ ≤ π ; 1 ≤ r ≤ 2').kind, 'done');
  assert.equal(JUDGES.domain.judgeLine(polar, null, '0 ≤ φ ≤ π/2 ; 1 ≤ r ≤ 2').kind, 'wrong');
  const sph = { kind: 'domain', coords: 'sph', region: ['x^2+y^2+z^2 ≤ 4', 'z ≥ 0'], box: [[-2.1, 2.1], [-2.1, 2.1], [-0.2, 2.1]] };
  assert.equal(JUDGES.domain.judgeLine(sph, null, '0 ≤ r ≤ 2 ; 0 ≤ θ ≤ π/2 ; 0 ≤ φ ≤ 2π').kind, 'done');
  assert.equal(JUDGES.domain.judgeLine(sph, null, '0 ≤ r ≤ 2 ; 0 ≤ θ ≤ π ; 0 ≤ φ ≤ 2π').kind, 'wrong');
  const item = { type: 'domain', judge: cfg, fields: [{ v: 'y' }, { v: 'x' }] };
  assert.equal(judgeDomainItem(item, { y: ['0', '4'], x: ['y/2', '√y'] }).correct, true);
  assert.equal(judgeDomainItem(item, { y: ['0', '4'], x: ['y/2', 'y'] }).correct, false);
});

test('A2 counter-examples: two solutions of a Cauchy problem, a function of the library', () => {
  const ode = { kind: 'a2', prop: 'odeTwoSolutions', params: { eq: "y'=3y^(2/3)", ic: { x: 0, y: 0 }, domain: { x: [0.1, 2] } } };
  assert.equal(checkCounter(ode, { y1: '0', y2: 'x^3' }).ok, true);
  assert.equal(checkCounter(ode, { y1: '0', y2: 'x^2' }).ok, false);
  const k = { kind: 'a2', prop: 'knownFn', params: { want: ['K1'] } };
  assert.equal(checkCounter(k, { f: '3x y/(x^2+y^2)' }).ok, true);
  assert.equal(checkCounter(k, { f: 'x^2+y^2' }).ok, false);
});
