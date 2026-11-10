// Items of the university unit `analyse2`, part d (step U6; helpers and
// checks: tests/uni-check.js), and the mathematics of the part: every
// F′(t) of the generators against a finite difference of F (quadrature),
// the catalogue's worked examples and E4.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/analyse2-d.skills.js';
import { ALL_PB, PI_DATA, PI_FALLBACK, E4, PB_FALLBACK } from '../js/content/uni/analyse2-d-param.js';
import { analyse, term } from '../js/content/uni/analyse2-d-implicit.js';
import { parse } from '../js/cas/parse.js';
import { evalFloat } from '../js/cas/numeric.js';
import { quad } from '../js/cas/integrate.js';
import { diff } from '../js/cas/diff.js';

// Skills whose generators are not written yet (emptied when the part is done).
const STUBBED = new Set([]);
// Items per level for heavy skills (never under 15).
const COUNTS = { 'a2-implicit-2var': 20, 'a2-implicit-3var': 20, 'a2-param-int': 20, 'a2-param-int-bounds': 15 };

test('unit analyse2, part d: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => !STUBBED.has(id)), 17, COUNTS));

const K = { vars: ['x', 't'] };
const val = (s, env) => evalFloat(parse(s, K), env);
const PI = Math.PI;
const num = (s) => (s === 'π' ? PI : Number(s));
// F(t) = ∫ from a(t) to b(t) of f(x, t) dx, by quadrature.
function F(f, a, b, t) {
  const fx = parse(f, K);
  return quad((x) => evalFloat(fx, { x, t }), val(a, { t }), val(b, { t }));
}
// F′(t) by a five-point difference (error in h⁴).
function dF(f, a, b, t, h = 1e-3) {
  const at = (s) => F(f, a, b, t + s * h);
  return (8 * (at(1) - at(-1)) - (at(2) - at(-2))) / (12 * h);
}
const close = (x, y, tol = 1e-6) => Math.abs(x - y) <= tol * (1 + Math.abs(x));

test('a2-param-int-bounds: each F′(t) and each trap formula, against F by quadrature', () => {
  for (const d of [...ALL_PB(), PB_FALLBACK(), E4()]) {
    for (const t of [0.6, 1.1, 1.7]) {
      const fd = dF(d.f, d.bd.a, d.bd.b, t);
      assert.ok(close(val(d.final, { t }), fd), `${d.I} at ${t}: ${val(d.final, { t })} vs ${fd}`);
      // The three terms add up to F′, and each trap differs from it.
      assert.ok(close(val(d.up, { t }) - val(d.low, { t }) + val(d.inner, { t }), fd), `${d.I}: terms`);
      for (const w of [d.noInt, d.sign, d.noChain]) assert.ok(!close(val(w, { t }), fd, 1e-4), `${d.I}: trap ${w} is right`);
    }
  }
});

test('a2-param-int: each F′(t), primitive and value, against F by quadrature', () => {
  for (const d of [...PI_DATA, PI_FALLBACK]) {
    const prim = parse(d.prim, K);
    const df = parse(d.df, K);
    for (const t of [0.7, 1.3]) {
      const fd = dF(d.f, d.a, d.b, t);
      assert.ok(close(val(d.Fp, { t }), fd), `${d.f} at ${t}`);
      const x = (num(d.a) + num(d.b)) / 3 + 0.05;
      assert.ok(close(evalFloat(diff(prim, 'x'), { x, t }), evalFloat(df, { x, t })), `${d.f}: primitive`);
      assert.ok(close(evalFloat(diff(parse(d.f, K), 't'), { x, t }), evalFloat(df, { x, t })), `${d.f}: ∂f/∂t`);
    }
    for (const [t0, v] of Object.entries(d.at)) assert.ok(close(val(d.Fp, { t: num(t0.includes('/') ? eval(t0) : t0) }), val(v, {})), `${d.f}: F′(${t0})`);
  }
});

test('the catalogue: E4, the worked examples of the implicit functions', () => {
  const e4 = E4();
  assert.equal(e4.final, '(2+2cos(t^2)-4cos(t^4))/t');
  const opts = [e4.final, e4.noInt, e4.noChain, e4.sign];
  for (const t of [0.6, 1.1, 1.7]) {
    const vs = opts.map((s) => val(s, { t }));
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) assert.ok(!close(vs[i], vs[j], 1e-6), `E4 options ${i} and ${j} at ${t}`);
    // The catalogue's distractors.
    assert.ok(close(val(e4.noInt, { t }), val('(2+cos(t^2)-3cos(t^4))/t', { t })));
    assert.ok(close(val(e4.noChain, { t }), val('(1-cos(t^4))/t^3+(2cos(t^2)-cos(t^4)-1)/t', { t })));
    assert.ok(close(val(e4.sign, { t }), val('(4-4cos(t^4))/t', { t })));
  }
  // x² + xy + y³ − 3 = 0 at (1, 1): g′ = −3/4, g″ = −31/32.
  const d2 = analyse([term(1, [2, 0]), term(1, [1, 1]), term(1, [0, 3]), term(-3)], { x: 1, y: 1 }, 'x', 'y');
  assert.equal(String(d2.g1), '-3/4');
  assert.equal(String(d2.g2), '-31/32');
  // 2021 Q12: z·y⁵ + 4e^(z − x) − 2 = 0 at (2, −1, 2), z = g(x, y): g_y = −10/3.
  const d3 = analyse([term(1, [0, 5, 1]), term(4, [], 1), term(-2)], { x: 2, y: -1, z: 2 }, 'y', 'z', 'x');
  assert.equal(String(d3.g1), '-10/3');
});
