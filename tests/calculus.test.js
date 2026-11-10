// Step U2 (spec §13, §14): the calculus core and its judges. Series are
// compared with the known DLs, quadrature and limits with known values;
// each judge accepts a right line, refuses a typical wrong one and knows
// its final form; and every antiderivative of the catalogues (G6 and A1
// corrigés, decisions, exam variants) is checked by differentiation, every
// definite value by quadrature.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Q } from '../js/math/rational.js';
import { parse } from '../js/cas/parse.js';
import { toText } from '../js/cas/print.js';
import { toMathML } from '../js/cas/mathml.js';
import { series, seriesToNode, coefEqual } from '../js/cas/series.js';
import { limit } from '../js/cas/limit.js';
import { evalFloat } from '../js/cas/numeric.js';
import { diff } from '../js/cas/diff.js';
import { equivalent } from '../js/cas/equiv.js';
import { closedNumber } from '../js/cas/closedform.js';
import { JUDGES } from '../js/judges/index.js';

const P = (t) => parse(t);

test('integrals, brackets, limits, ε(x) and o(xⁿ) parse, print and read back', () => {
  for (const t of ['int(x^2,x)', 'int(1/√x,x,0⁺,1)', 'bracket(x^2+3x,x,-1,3)', 'lim(sin(x)/x,x,0)', '1+x+x^3×ε(x)', '3int(x^2,x)-4int(1/x,x)+C']) {
    const n = P(t);
    assert.equal(toText(P(toText(n))), toText(n), t);
    assert.ok(toMathML(n).startsWith('<math'), t);
  }
  assert.equal(toText(P('1+x+o(x^2)')), '1+x+x^2×ε(x)');
  assert.equal(P('point').t, 'bin', 'int is a call only before « ( »');
});

const DL = [
  ['e^x', 5, ['1', '1', '1/2', '1/6', '1/24', '1/120']],
  ['sin(x)', 5, ['0', '1', '0', '-1/6', '0', '1/120']],
  ['cos(x)', 4, ['1', '0', '-1/2', '0', '1/24']],
  ['ln(1+x)', 4, ['0', '1', '-1/2', '1/3', '-1/4']],
  ['√(1+x)', 3, ['1', '1/2', '-1/8', '1/16']],
  ['arctan(x)', 5, ['0', '1', '0', '-1/3', '0', '1/5']],
  ['tan(x)', 5, ['0', '1', '0', '1/3', '0', '2/15']],
  ['e^x×sin(x)', 3, ['0', '1', '1', '1/3']],
  ['1/(1+e^(-x))', 3, ['1/2', '1/4', '0', '-1/48']],
  ['sin(x)/(1+x^2)', 5, ['0', '1', '0', '-7/6', '0', '47/40']],
  ['sin(sin(x))', 5, ['0', '1', '0', '-1/3', '0', '1/10']],
  ['sin(x/(1-x))', 3, ['0', '1', '1', '5/6']],
  ['1/(4+3x)', 2, ['1/4', '-3/16', '9/64']],
  ['(x-sin(x))/(x×(1-cos(x)))', 0, ['1/3']],
];

test('series match the known developments, exactly', () => {
  for (const [f, n, want] of DL) {
    const s = series(P(f), 'x', 0, n);
    want.forEach((c, k) => assert.ok(coefEqual(s.coef(k), Q.fromDecimal(c.replace('-', '').split('/')[0]).mul(c.startsWith('-') ? -1 : 1).div(Number(c.split('/')[1] ?? 1))), `${f}: a${k}`));
    assert.equal(s.exact, true, f);
  }
  const e = series(P('e^(1/(1+x))'), 'x', 0, 2);
  assert.ok(Math.abs(e.coef(2) - 1.5 * Math.E) < 1e-12, 'e^(1/(1+x)) = e − ex + (3e/2)x²');
  // The remainder is tracked.
  const r = series(P('(1+x+x^2ε(x))×(x-x^3/6+x^3ε(x))'), 'x', 0, 8);
  assert.equal(r.order, 3);
  assert.equal(r.remainder, true);
  assert.equal(series(P('x-x^3/6+x×ε(x)'), 'x', 0, 8).order, 1);
  assert.equal(toText(seriesToNode(series(P('x+x^2+x^3/3+x^3ε(x)'), 'x', 0, 8), 'x')), 'x+x^2+1/3×x^3+x^3×ε(x)');
  // At a point, and at infinity.
  assert.ok(coefEqual(series(P('ln(x)'), 'x', 1, 3).coef(2), new Q(-1, 2)));
  assert.ok(coefEqual(series(P('√(x^2+4x)-x'), 'x', '+inf', 2).coef(0), new Q(2)));
});

test('limits by series, and numerically when there is no series', () => {
  const L = (t, to, dir) => limit(P(t), 'x', to, dir).value;
  assert.ok(L('(e^(2x)-1-2x)/x^2', 0).eq(2));
  assert.ok(L('√(x^2+4x)-x', '+inf').eq(2));
  assert.ok(L('√(x^2+4x)+x', '-inf').eq(-2));
  assert.equal(L('1/x', 0, '-'), '-inf');
  assert.equal(L('1/x', 0), 'none');
  assert.ok(L('(1/6+ε(x))/(1/2+ε(x))', 0).eq(new Q(1, 3)));
  assert.ok(L('x×ln(x)', 0, '+').eq(0), 'numeric');
  assert.equal(L('ln(x)', '+inf'), '+inf');
  assert.ok(L('(x+ln(x))/x', '+inf').eq(1));
});

test('quadrature: segments, singular ends, half-lines', () => {
  const I = (t) => evalFloat(P(t));
  const near = (a, b, tol = 1e-7) => assert.ok(Math.abs(a - b) <= tol * (1 + Math.abs(b)), `${a} ≠ ${b}`);
  near(I('int(x^2,x,0,1)'), 1 / 3);
  near(I('int(1/√x,x,0⁺,1)'), 2);
  near(I('int(ln(x),x,0⁺,1)'), -1);
  near(I('int(e^(-x),x,0,∞)'), 1);
  near(I('int(1/(1+x^2),x,-∞,∞)'), Math.PI);
  near(I('bracket(4√t-(2/3)t^(3/2),t,0⁺,1)'), 10 / 3);
  assert.ok(Number.isNaN(I('int(1/x,x,0⁺,1)')), 'a divergent integral has no value');
});

// ---------- the catalogue's primitives, checked by differentiation ----------

// [integrand, primitive, domain]: every ∫ f = F written in the corrigés,
// decisions and exam variants of G6 and A1 (derivatives, DL, integrals).
const PRIMITIVES = [
  ['3x^2-4/x+2e^x+cos(x)', 'x^3-4ln(|x|)+2e^x+sin(x)', [-3, 3]],
  ['2x+3-x^2', 'x^2+3x-x^3/3'],
  ['x/(1+x^4)', '(1/2)arctan(x^2)'],
  ['e^(sin(x))×cos(x)', 'e^(sin(x))'],
  ['x√(x^2+1)', '(x^2+1)^(3/2)/3'],
  ['cos(x)/√(sin(x))', '2√(sin(x))', [0.1, 1.5]],
  ['1/(√x(1+√x))', '2ln(1+√x)', [0.1, 3]],
  ['1/(√x(1+x))', '2arctan(√x)', [0.1, 3]],
  ['ln(x)/(x√(ln(x)^2+1))', '√(ln(x)^2+1)', [0.1, 3]],
  ['x/√(1+x)', '(2/3)(1+x)^(3/2)-2√(1+x)', [-0.9, 3]],
  ['x^2×e^(2x)', 'e^(2x)(2x^2-2x+1)/4'],
  ['x×e^(2x)', 'x×e^(2x)/2-e^(2x)/4'],
  ['x×sin(x)', 'sin(x)-x×cos(x)'],
  ['x×ln(1+x)', '(x^2-1)/2×ln(1+x)-x^2/4+x/2', [-0.9, 3]],
  ['x×arctan(x)', '(x^2+1)/2×arctan(x)-x/2'],
  ['(x+1)^2×e^x', 'e^x(x^2+1)'],
  ['(x+5)/((x-1)(x^2+2x+5))', '(3/4)ln(|x-1|)-(3/8)ln(x^2+2x+5)-(1/4)arctan((x+1)/2)', [-3, 3]],
  ['1/(x(x^2+3))', '(1/3)ln(|x|)-(1/6)ln(x^2+3)', [-3, 3]],
  ['sin(x)^3/(1+cos(x)^2)', 'cos(x)-2arctan(cos(x))'],
  ['1/sin(x)', 'ln(|tan(x/2)|)', [0.2, 3]],
  ['1/√(x^2+4)', 'argsh(x/2)'],
  ['1/√(x^2+4)', 'ln(x+√(x^2+4))'],
  ['e^x/(e^(2x)-1)', '(1/2)ln((e^x-1)/(e^x+1))', [0.2, 3]],
  ['cosh(x)', 'sinh(x)'],
  ['(2-t)/√t', '4√t-(2/3)t^(3/2)', [0.1, 3], 't'],
  ['(x^(3/2)+3)/x^3', '-2x^(-1/2)-(3/2)x^(-2)', [0.5, 3]],
  ['(4x+2)/(x^3+3x^2+4x+2)', '-2ln(x+1)+ln(x^2+2x+2)+4arctan(x+1)', [-0.9, 3]],
  ['(4x+2)/(x^3+3x^2+4x+2)', 'ln((x^2+2x+2)/(x+1)^2)+4arctan(x+1)', [-0.9, 3]],
  ['2/(t^2+3)', '(2/√3)arctan(t/√3)', [-3, 3], 't'],
  ['x^n×e^x', 'x^n×e^x-n×int(x^(n-1)×e^x,x)', null, 'x', true],
];

test('every primitive of the catalogues is verified by differentiation', () => {
  for (const [f, F, dom, v = 'x', skip] of PRIMITIVES) {
    if (skip) continue;
    const r = equivalent(diff(P(F), v), P(f), { vars: [v], domain: { [v]: dom || [-3, 3] }, seed: 7 });
    assert.ok(r.equal, `(${F})′ ≠ ${f} ${JSON.stringify(r.witness)}`);
  }
});

// [integral, exact value]: the definite values of the catalogues.
const VALUES = [
  ['int(2x+3-x^2,x,-1,3)', '32/3'],
  ['int(e^(sin(x))×cos(x),x,0,π/2)', 'e-1'],
  ['int(x√(x^2+1),x,0,1)', '(2√2-1)/3'],
  ['int(cos(x)/√(sin(x)),x,0⁺,π/6)', '√2'],
  ['int(1/(√x(1+√x)),x,1,4)', '2ln(3/2)'],
  ['int(1/(√x(1+x)),x,1,3)', 'π/6'],
  ['int(ln(x)/(x√(ln(x)^2+1)),x,1,e^3)', '√10-1'],
  ['int(x×sin(x),x,-π,π)', '2π'],
  ['int(x×arctan(x),x,0,1)', 'π/4-1/2'],
  ['int((x+1)^2×e^x,x,-1,0)', '1-2/e'],
  ['int(x^3×e^x,x,0,1)', '6-2e'],
  ['int(1/(x(x^2+3)),x,1,2)', '(2/3)ln(2)-(1/6)ln(7)'],
  ['int(e^x/(e^(2x)-1),x,1,∞)', '(1/2)ln((e+1)/(e-1))'],
  ['int(cosh(x),x,0,ln(2))', '3/4'],
  ['int(x/√(2-x),x,1,2⁻)', '10/3'],
  ['int((x+1)/√(2-x),x,1,2⁻)', '16/3'],
  ['int((x^(3/2)+3)/x^3,x,1,∞)', '7/2'],
  ['int(1/(√(x-1)(x+2)),x,1⁺,∞)', 'π/√3'],
  ['int((4x+2)/(x^3+3x^2+4x+2),x,1,∞)', '2π+ln(4/5)-4arctan(2)'],
  ['int(1/√((x-1)(3-x)),x,1⁺,3⁻)', 'π'],
  ['int(x^2×sin(x^3),x,-1,1)', '0'],
  ['int(1/(1+2x^3),x,0,1)', null],
];

test('every definite value of the catalogues matches the quadrature', () => {
  for (const [I, v] of VALUES) {
    if (!v) continue;
    const a = evalFloat(P(I));
    const b = evalFloat(P(v));
    assert.ok(Math.abs(a - b) <= 1e-6 * (1 + Math.abs(b)), `${I} = ${a}, not ${v} = ${b}`);
  }
});

test('closed forms of exact numbers', () => {
  assert.equal(closedNumber(P('2π+ln(4/5)-4arctan(2)')), true);
  assert.equal(closedNumber(P('(2√2-1)/3')), true);
  assert.equal(closedNumber(P('4-2/3')), false);
  assert.match(closedNumber(P('arctan(1)')), /valeur connue/);
  assert.match(closedNumber(P('1+ln(2)+ln(2)')), /Regroupe/);
});

// ---------- the four judges ----------

const J = (cfg, prev, line) => JUDGES[cfg.kind].judgeLine(cfg, P(prev), line, {});

test('series judge: right line, wrong coefficient, order claimed too high, final form', () => {
  const cfg = { kind: 'series', v: 'x', at: 0, order: 3 };
  assert.equal(J(cfg, 'e^x×sin(x)', '(1+x+x^2/2+x^3/6+x^3ε(x))×(x-x^3/6+x^3ε(x))').kind, 'ok');
  assert.equal(J(cfg, 'x+x^2+x^3/2-x^3/6+x^3ε(x)', 'x+x^2+x^3/3+x^3ε(x)').kind, 'done');
  assert.equal(J(cfg, 'x+x^2+x^3/2-x^3/6+x^3ε(x)', 'x+x^2+x^3/3+o(x^3)').kind, 'done');
  assert.equal(J(cfg, 'x+x^2+x^3/2-x^3/6+x^3ε(x)', 'x+x^2+x^3/2+x^3ε(x)').kind, 'wrong');
  assert.equal(J(cfg, 'x+x^2+x^2ε(x)', 'x+x^2+x^3/3+x^3ε(x)').kind, 'wrong', 'more than the previous line allows');
  assert.equal(J(cfg, 'e^x×sin(x)', 'x+x^2+x^2ε(x)').kind, 'stay', 'order too low');
  assert.equal(J(cfg, 'e^x×sin(x)', 'x^3/3+x+x^2+x^3ε(x)').kind, 'stay', 'not ordered');
  assert.equal(J(cfg, 'x+x^2+x^3/3+x^3ε(x)', 'x+x^2+x^3/3').kind, 'stay', 'remainder forgotten');
});

test('antideriv judge: by differentiation, ln|x|, + C, a change of variable', () => {
  const cfg = { kind: 'antideriv', v: 'x', domain: { x: [-3, 3] } };
  const start = 'int(3x^2-4/x+2e^x+cos(x),x)';
  assert.equal(J(cfg, start, '3int(x^2,x)-4int(1/x,x)+2int(e^x,x)+int(cos(x),x)').kind, 'ok');
  assert.equal(J(cfg, start, 'x^3-4ln(|x|)+2e^x+sin(x)+C').kind, 'done');
  assert.equal(J(cfg, start, 'x^3-4ln(|x|)+2e^x+sin(x)+C+5').kind, 'done', 'F + 3 is right too');
  assert.equal(J(cfg, start, 'x^3-4ln(x)+2e^x+sin(x)+C').kind, 'wrong', 'ln x is not defined for x < 0');
  assert.equal(J(cfg, start, 'x^3-4ln(|x|)+2e^x+sin(x)').kind, 'stay', '+ C');
  assert.equal(J(cfg, start, 'x^3-4ln(|x|)+2e^x-sin(x)+C').kind, 'wrong');
  const sub = { kind: 'antideriv', v: 'x', domain: { x: [0.2, 3] }, subst: { t: 'sqrt(x)' } };
  assert.equal(J(sub, 'int(1/(√x(1+√x)),x)', 'int(2/(1+t),t)').kind, 'ok');
  assert.equal(J(sub, 'int(1/(√x(1+√x)),x)', 'int(1/(t(1+t)),t)').kind, 'wrong', 'dx kept');
  assert.equal(J(sub, 'int(2/(1+t),t)', '2ln(1+t)+C').kind, 'ok', 'still in t');
  assert.equal(J(sub, '2ln(1+t)+C', '2ln(1+√x)+C').kind, 'done');
});

test('definite judge: same value, exact or by quadrature; closed form; recurrences', () => {
  const cfg = { kind: 'definite' };
  assert.equal(J(cfg, 'int(1/(√x(1+√x)),x,1,4)', 'int(2/(1+t),t,1,2)').kind, 'ok');
  assert.equal(J(cfg, 'int(1/(√x(1+√x)),x,1,4)', 'int(2/(1+t),t,1,4)').kind, 'wrong', 'bounds kept');
  assert.equal(J(cfg, 'int(2/(1+t),t,1,2)', '2bracket(ln(1+t),t,1,2)').kind, 'ok');
  assert.equal(J(cfg, '2bracket(ln(1+t),t,1,2)', '2ln(3/2)').kind, 'done');
  assert.equal(J(cfg, 'bracket(4√t-(2/3)t^(3/2),t,0⁺,1)', '4-2/3').kind, 'ok', 'a number to compute');
  assert.equal(J(cfg, '4-2/3', '10/3').kind, 'done');
  const rec = { kind: 'definite', seq: { J: 'int(x^n×e^x,x,0,1)' }, param: 'n' };
  assert.equal(J(rec, 'J_n', 'e-n×J_(n-1)').kind, 'ok');
  assert.equal(J(rec, 'J_n', 'e-(n-1)×J_(n-1)').kind, 'wrong');
});

test('limit judge: same limit, an equivalent kept, final value', () => {
  const cfg = { kind: 'limit', v: 'x', to: '+∞' };
  assert.equal(J(cfg, '√(x^2+4x)-x', '4x/(√(x^2+4x)+x)').kind, 'ok');
  assert.equal(J(cfg, '4x/(√(x^2+4x)+x)', '4/(√(1+4/x)+1)').kind, 'ok');
  assert.equal(J(cfg, '4/(√(1+4/x)+1)', '2').kind, 'done');
  assert.equal(J(cfg, '√(x^2+4x)-x', '0').kind, 'wrong');
  assert.equal(J({ kind: 'limit', v: 'x', to: '1', dir: '+' }, '(x^2+3)/(x-1)', '+∞').kind, 'done');
  assert.equal(J({ kind: 'limit', v: 'x', to: '1', dir: '-' }, '(x^2+3)/(x-1)', '+∞').kind, 'wrong');
  assert.equal(J({ kind: 'limit', v: 'x', to: '0' }, '(1/6+ε(x))/(1/2+ε(x))', '1/3').kind, 'done');
  assert.match(JUDGES.limit.show({ kind: 'limit', v: 'x', to: '0' }, P('sin(x)/x')), /lim/);
});
