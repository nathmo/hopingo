// The symbolic core js/cas (spec §4, §13): parsing, printing, normal form,
// numeric equivalence, derivatives.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parse, tryParse, ParseError } from '../js/cas/parse.js';
import { toText, toReadable } from '../js/cas/print.js';
import { toMathML } from '../js/cas/mathml.js';
import { equalsStructural, numValue, lit, add, mul, pow, sym, num, fn } from '../js/cas/ast.js';
import { Poly, gcdPoly } from '../js/cas/poly.js';
import { RatFun } from '../js/cas/ratfun.js';
import { equalExact, normalize, pretty, exactValue, canonKey } from '../js/cas/normal.js';
import { evalFloat, sample } from '../js/cas/numeric.js';
import { equivalent } from '../js/cas/equiv.js';
import { diff, expandDerivs, stepDeriv, ruleOf } from '../js/cas/diff.js';
import { makeRng } from '../js/content/random.js';
import { Q } from '../js/math/rational.js';
import { parse as parseSchool, evaluate } from '../js/math/expr.js';

const P = (s, o) => parse(s, o);

test('parse → toText → parse is stable', () => {
  const inputs = [
    '2x+3', 'x^2×sin(3x)', 'd(x^2×sin(3x))', '(2x+1)/(x^2+1)', 'e^(2x)', '1,5x-√(x+1)', '1.5x', 'root(3,x)',
    '|x-1|', 'x_k+x_(k+1)', 'sinx', '3xy', 'x(x+1)', '(x+1)(x-1)', '-x^2', '2×-3', 'Arctg(x)+Log(x)', 'ln(x)/x',
    'd(x^2,x)', 'd(sin(x),x,2)', 'y=2x+1', 'x≤3', '2sin(x)cos(x)', 'x^-1', 'π/6+2π', 'sin(x)^2', "(x^2)'", 'λ+ε',
    '3/4x', '1/(2√x)', 'e^x', 'sh(x)', 'a/b/c',
  ];
  for (const s of inputs) {
    const n = P(s);
    const t = toText(n);
    const again = P(t);
    assert.ok(equalsStructural(again, n, { parens: false }), `round trip ${s} → ${t}`);
    assert.equal(toText(again), t, `toText is a fixed point for ${s}`);
  }
  // Exact for parsed trees, brackets included.
  for (const s of ['2x+3', 'x^2×sin(3x)', '(2x+1)/(x^2+1)', 'x(x+1)', 'd(x^2)']) assert.equal(toText(P(s)), s);
});

test('the grammar of §4.2', () => {
  assert.equal(toText(P('sin^2(x)')), 'sin(x)^2', 'sin^2(x) is (sin x)²');
  assert.equal(P('2x').implicit, true);
  assert.equal(P('3/4x').l.t, 'frac', '/ binds tighter than the product');
  assert.equal(P('1,5').v.toString(), '3/2');
  assert.equal(P('1.5').s, '1,5', 'a decimal point is normalised to a comma');
  assert.equal(P('root(3,8)').n.v.n, 3, 'a comma separates arguments of root');
  assert.equal(P('e^x').b.name, 'e');
  assert.equal(P('i').t, 'sym', 'i is a letter by default');
  assert.equal(P('i', { complex: true }).t, 'const');
  assert.equal(P('d(f)', { dvar: 't' }).v, 't');
  assert.equal(P("y'").t, 'deriv');
  assert.equal(P("f'(x)", { funcs: ['f'] }).t, 'deriv');
  assert.equal(P('f(x)', { funcs: ['f'] }).t, 'fn');
  assert.equal(P('f(x)').t, 'bin', 'without the declaration, f(x) is f·x');
  assert.equal(P('x²+x³').l.e.v.n, 2, 'superscripts are read');
  for (const [bad, part] of [['sin x^2', 'parenthèses'], ['sin^(-1)(x)', 'arcsin'], ['(x+1', 'fermée'], ['x+', 'incomplète'],
    ['x=y=z', 'une seule relation'], ['sin 3x', 'parenthèses'], ['2#3', 'symbole'], [')', 'fermante'], ['x^2^3', 'exposant']]) {
    assert.throws(() => P(bad), (e) => e instanceof ParseError && e.message.includes(part), bad);
  }
  assert.equal(tryParse('(('), null);
});

test('school expressions read the same in expr.js and in the core', () => {
  for (const s of ['2/3+1/4×8/5', '-3^2', '(-2)^3', '√(9+16)', '10^-2', '1,5×4', '(1/2)^2-3/4']) {
    assert.equal(exactValue(P(s)).toString(), evaluate(parseSchool(s)).toString(), s);
  }
});

test('MathML output', () => {
  const m = toMathML(P('d(x^2×sin(3x))'), { display: 'block' });
  assert.match(m, /^<math alttext="[^"]+" display="block">/);
  assert.match(m, /<msup>/);
  assert.match(m, /′/);
  assert.match(toMathML(P('(2x+1)/(x^2+1)')), /<mfrac>/);
  assert.match(toMathML(P('√(x+1)')), /<msqrt>/);
  assert.match(toMathML(P('□+1')), /data-blank="0"/);
  const hl = toMathML(P('x+y'), { highlight: ['r'] });
  assert.match(hl, /mathbackground/);
  assert.equal(toReadable(P('x^2×sin(3x)')), 'x²·sin(3x)');
});

test('polynomials and rational functions over ℚ', () => {
  const x = Poly.variable('x');
  const a = x.add(Poly.const(1)).pow(3);
  assert.equal(a.degreeIn('x'), 3);
  assert.ok(a.equals(x.pow(3).add(x.pow(2).scale(3)).add(x.scale(3)).add(Poly.const(1))));
  const g = gcdPoly(x.pow(2).sub(Poly.const(1)), x.pow(2).add(x.scale(2)).add(Poly.const(1)), 'x');
  assert.ok(g.equals(x.add(Poly.const(1))), 'gcd(x²−1, (x+1)²) = x+1');
  const r = new RatFun(x.pow(2).sub(Poly.const(1)), x.sub(Poly.const(1))).reduce();
  assert.ok(r.d.isConst && r.n.equals(x.add(Poly.const(1))), '(x²−1)/(x−1) = x+1');
  const multi = Poly.variable('x').mul(Poly.variable('y')).add(Poly.variable('λ'));
  assert.equal(multi.vars().size, 3);
});

test('normal form: known pairs equal, different pairs apart', () => {
  const same = [
    ['(x+1)^2', 'x^2+2x+1'], ['2x×sin(3x)+3x^2×cos(3x)', 'x^2×3cos(3x)+sin(3x)×2x'], ['1/x+1/y', '(x+y)/(xy)'],
    ['(x^2-1)/(x-1)', 'x+1'], ['e^(2x)', 'exp(2x)'], ['√x', 'x^(1/2)'], ['Arctg(x)', 'arctan(x)'], ['Log(x)', 'ln(x)'],
    ['(a+b)^3', 'a^3+3a^2b+3ab^2+b^3'], ['x/2+x/3', '5x/6'], ['sin(0)+cos(0)', '1'], ['√8', '2√2'],
  ];
  for (const [a, b] of same) assert.equal(equalExact(P(a), P(b)), a === '√8' ? null : true, `${a} = ${b}`);
  const apart = [['(x+1)^2', 'x^2+1'], ['x/2+x/3', 'x/5'], ['1/x+1/y', '2/(x+y)'], ['x^3', 'x^2']];
  for (const [a, b] of apart) assert.equal(equalExact(P(a), P(b)), false, `${a} ≠ ${b}`);
  assert.equal(equalExact(P('sin(x)^2+cos(x)^2'), P('1')), null, 'undecided exactly');
  assert.equal(toText(normalize(P('(x^2-1)/(x-1)'))), 'x+1');
  assert.equal(canonKey(P('x+1')), canonKey(P('1+x')));
  assert.equal(exactValue(P('e^(2×0)×3')).toString(), '3');
  assert.equal(exactValue(P('π')), null);
});

test('display simplification keeps the shape and tidies', () => {
  const cases = [
    ['x^2×cos(3x)×3+2x×sin(3x)', '3x²·cos(3x) + 2x·sin(3x)'],
    ['3(x^2+1)^2×2x', '6x·(x² + 1)²'],
    ['x^2×(1/x)+2x×ln(x)', 'x + 2x·ln(x)'],
    ['(2(x^2+1)-(2x+1)×2x)/(x^2+1)^2', '(−2x² − 2x + 2)/(x² + 1)²'],
    ['e^(2x)×2', '2e^(2x)'],
  ];
  for (const [a, b] of cases) {
    const p = pretty(P(a));
    assert.equal(toReadable(p), b, a);
    assert.equal(equalExact(p, P(a)) !== false, true);
  }
});

test('numeric evaluation and sampling', () => {
  assert.ok(Math.abs(evalFloat(P('sin(π/6)')) - 0.5) < 1e-12);
  assert.ok(Number.isNaN(evalFloat(P('ln(0-1)'))));
  assert.ok(Number.isNaN(evalFloat(P('1/x'), { x: 0.01 }, { guard: true })), 'near a pole');
  assert.equal(evalFloat(P('root(3,0-8)')), -2);
  const rng = makeRng(3);
  const pts = sample(['x', 'n'], { x: [1, 2], n: { int: [1, 5] } }, rng, 50);
  assert.ok(pts.every((e) => e.x >= 1 && e.x <= 2 && Number.isInteger(e.n) && e.n >= 1 && e.n <= 5));
});

// Pairs that differ somewhere on [−3, 3]: the numeric test must never call them equal.
function differentPairs(rng, count) {
  const atoms = ['x', 'x^2', 'sin(x)', 'cos(x)', 'e^x', '|x|', 'x^3', '√(x^2+1)', 'arctan(x)', '1/(x^2+1)'];
  const out = [];
  while (out.length < count) {
    const a = rng.pick(atoms);
    const k = rng.int(1, 5);
    const kind = rng.int(0, 4);
    if (kind === 0) out.push([`${k}${a.length > 1 ? `(${a})` : a}`, `${k}${a.length > 1 ? `(${a})` : a}+1/${rng.int(2, 1000)}`]);
    else if (kind === 1) out.push([a, `-(${a})`]);
    else if (kind === 2) { const b = rng.pick(atoms); if (b !== a) out.push([a, b]); }
    else if (kind === 3) out.push([`(${a})×(${rng.pick(atoms)})`, `(${a})+(${rng.pick(atoms)})+${k}`]);
    else out.push(['x', '|x|']);
  }
  return out;
}

test('numeric equivalence: no false positive on 500 different pairs', () => {
  const rng = makeRng(11);
  let numeric = 0;
  for (const [a, b] of differentPairs(rng, 500)) {
    const r = equivalent(P(a), P(b), { vars: ['x'], domain: { x: [-3, 3] }, seed: 5 });
    assert.equal(r.equal, false, `${a} vs ${b}`);
    if (r.method === 'numeric') numeric++;
  }
  assert.ok(numeric > 100, 'the numeric path is exercised');
  // And equal pairs that need numbers.
  for (const [a, b] of [['sin(x)^2+cos(x)^2', '1'], ['e^(2x)', '(e^x)^2'], ['√(x^2)', '|x|'], ['tan(x)', 'sin(x)/cos(x)']]) {
    const r = equivalent(P(a), P(b), { vars: ['x'], seed: 2 });
    assert.equal(r.equal, true, `${a} = ${b}`);
  }
  const w = equivalent(P('x'), P('|x|'), { vars: ['x'], seed: 1 });
  assert.ok(w.witness && w.witness.env.x < 0, 'a witness point is kept');
});

test('derivatives agree with finite differences', () => {
  const fs = [
    'x^2×sin(3x)', '(2x+1)/(x^2+1)', 'e^(2x)×cos(3x)', 'ln(x^2+1)', '√(x^2+4)', '(x^2+1)^3', 'x×e^(x^2)',
    'arctan(2x)', 'sin(x)/(x^2+2)', 'cos(x^2+1)', '1/x', 'x^x', '2^x', '|x-1|', 'tan(x)', 'sinh(x)×cosh(2x)',
    'arcsin(x/2)', 'root(3,x^2+1)', 'e^(-x)×(x^3-2x)',
  ];
  const rng = makeRng(9);
  for (const s of fs) {
    const f = P(s);
    const d = diff(f, 'x');
    for (let i = 0; i < 20; i++) {
      const x = 0.3 + 1.4 * rng.next();
      const h = 1e-5;
      const fd = (evalFloat(f, { x: x + h }) - evalFloat(f, { x: x - h })) / (2 * h);
      const v = evalFloat(d, { x });
      assert.ok(Math.abs(fd - v) < 1e-4 * (1 + Math.abs(v)), `${s} at ${x}: ${v} vs ${fd}`);
    }
  }
});

test('one rule at a time, and d(…) expanded', () => {
  assert.equal(ruleOf(P('x^2×sin(3x)'), 'x'), 'product');
  assert.equal(ruleOf(P('(2x+1)/(x^2+1)'), 'x'), 'quotient');
  assert.equal(ruleOf(P('sin(3x)'), 'x'), 'chain');
  assert.equal(ruleOf(P('sin(x)'), 'x'), 'table');
  assert.equal(ruleOf(P('3x^2-2x+1'), 'x'), 'poly');
  assert.equal(ruleOf(P('(x^2+1)^3'), 'x'), 'chain', 'a power of a sum is taught with the chain rule');
  assert.equal(toText(stepDeriv(P('x^2×sin(3x)'), 'x').node), 'd(x^2)×sin(3x)+x^2×d(sin(3x))');
  assert.equal(toText(stepDeriv(P('sin(3x)'), 'x').node), 'cos(3x)×d(3x)');
  assert.equal(equalExact(expandDerivs(P('d(x^2)×sin(3x)+x^2×d(sin(3x))')), P('2x×sin(3x)+3x^2×cos(3x)')), true);
  assert.equal(toText(pretty(diff(P('x^2×sin(3x)'), 'x'))), '2x×sin(3x)+3x^2×cos(3x)');
});

test('constructors fold numbers and drop ·1, +0', () => {
  assert.equal(toText(mul(num(1), sym('x'))), 'x');
  assert.equal(toText(add(sym('x'), num(0))), 'x');
  assert.equal(toText(mul(fn('cos', sym('x')), num(3))), '3cos(x)');
  assert.equal(toText(pow(sym('x'), num(1))), 'x');
  assert.equal(numValue(lit(new Q(-3, 4))).toString(), '-3/4');
});
