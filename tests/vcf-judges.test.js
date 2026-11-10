// Step U10 engine (modules V, C, F): residues by Laurent series, numeric
// transforms and the tables, and the judges param, boundary, transform and
// the gradient form of antideriv: a right line, a typical wrong line, the
// final form.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parse } from '../js/cas/parse.js';
import { residue, singularityType, zeroOrder, laurentCoefs } from '../js/cas/series.js';
import { fourierAt, laplaceAt, valueAt } from '../js/cas/transforms.js';
import { FOURIER_TABLE } from '../js/cas/tables/fourier.js';
import { LAPLACE_TABLE } from '../js/cas/tables/laplace.js';
import { JUDGES, readWith } from '../js/judges/index.js';

const P = (s) => parse(s, { vars: ['z', 't'], complex: true });
const near = (a, b, tol = 1e-8) => Math.abs(a - b) <= tol * (1 + Math.abs(b));

// Plays lines through a judge; returns the verdict kinds.
function play(cfg, start, lines) {
  const J = JUDGES[cfg.kind];
  let prev = start == null ? null : readWith(cfg, start);
  const state = {};
  return lines.map((l) => {
    const v = J.judgeLine(cfg, prev, l, state);
    if (v.kind !== 'wrong' && v.kind !== 'parse') prev = v.node;
    return v;
  });
}

test('residues against known values (catalogue C)', () => {
  const cases = [
    ['1/(z^4+4)', P('1+i'), -1 / 16, -1 / 16],
    ['e^(2i z)/(z^2+1)', P('i'), 0, -Math.exp(-2) / 2],
    ['1/(z^2(z-1))', 0, -1, 0],
    ['z^2 sin(1/z)', 0, -1 / 6, 0],
    ['sin(1/(2i-3z))', P('2i/3'), -1 / 3, 0],
    ['(z+1)/(z(z-1)(z-3))', 0, 1 / 3, 0],
    ['(z+1)/(z(z-1)(z-3))', 1, -1, 0],
    ['sin(z)/z^2', 0, 1, 0],
    ['1/(z^4-2z^3+2z^2)', 0, 1 / 2, 0],
    ['e^(3i z)z/(z^4+4)', P('1+i'), ...(() => { const e = Math.exp(-3); return [e * Math.sin(3) / 8, -e * Math.cos(3) / 8]; })()],
  ];
  for (const [f, z0, re, im] of cases) {
    const r = residue(P(f), 'z', z0);
    assert.ok(near(r.re, re, 1e-8) && near(r.im, im, 1e-8), `Res(${f}) = ${r.re} + ${r.im}i`);
  }
  // e^(zt)/((z + 1)²(z + 2)) at −1: (t − 1)e^(−t) (Laplace inverse, 2021).
  for (const t of [0.5, 2]) assert.ok(near(residue(P('e^(z t)/((z+1)^2(z+2))'), 'z', -1, { env: { t } }).re, (t - 1) * Math.exp(-t)));
  assert.deepEqual(singularityType(P('(e^(z-π)-1)/sin(z)^2'), 'z', Math.PI), { kind: 'pole', order: 1 });
  assert.deepEqual(singularityType(P('sin(z)/z'), 'z', 0), { kind: 'removable' });
  assert.deepEqual(singularityType(P('e^(1/z)'), 'z', 0), { kind: 'essential' });
  assert.deepEqual(singularityType(P('1/(z^2(z-1))'), 'z', 0), { kind: 'pole', order: 2 });
  assert.equal(zeroOrder(P('1-cos(z)'), 'z', 0), 2);
  // Laurent in the disc |z| < 1 of 1/((z − 1)(z − 2)): aₙ = 1 − 1/2ⁿ⁺¹.
  const a = laurentCoefs(P('1/((z-1)(z-2))'), 'z', 0, { from: 0, to: 3 });
  a.forEach((c, n) => assert.ok(near(c.re, 1 - 1 / 2 ** (n + 1))));
});

test('transform tables: every row against the numeric transform', () => {
  for (const r of FOURIER_TABLE.filter((x) => x.f)) {
    const vars = ['y', 'α', ...Object.keys(r.params)];
    const f = parse(r.f, { vars, funcs: ['H'], complex: true });
    const F = parse(r.F, { vars, funcs: ['H'], complex: true });
    for (const a of [-2.3, 0.7, 3.2]) {
      const n = fourierAt(f, 'y', a, { env: r.params });
      const w = valueAt(F, { ...r.params, α: a });
      assert.ok(Math.hypot(n.re - w.re, n.im - w.im) < 1e-8, `${r.id} at α = ${a}`);
    }
  }
  for (const r of LAPLACE_TABLE) {
    const vars = ['t', 'z', ...Object.keys(r.params)];
    const f = parse(r.f, { vars, funcs: ['H'] });
    const F = parse(r.F, { vars, funcs: ['H'] });
    for (const z of [5.1, 8]) assert.ok(near(laplaceAt(f, 't', z, { env: r.params }), valueAt(F, { ...r.params, z }).re, 1e-9), `${r.id} at z = ${z}`);
  }
});

test('judge param: curves (orientation, bounds) and surfaces (normal)', () => {
  const half = { kind: 'param', curve: { ref: '(2cos(t) ; 2sin(t))', t: [0, 'π'] } };
  assert.equal(play(half, null, ['γ(t) = (2cos(t) ; 2sin(t)), t ∈ [0 ; π]'])[0].kind, 'done');
  const two = play(half, null, ['γ(t) = (2cos(t) ; 2sin(t))', 't ∈ [0 ; 2π]', 't ∈ [0 ; π]']);
  assert.deepEqual(two.map((v) => v.kind), ['ok', 'wrong', 'done']);
  assert.equal(two[1].rule, 'v_param_bounds');
  const rev = play(half, null, ['γ(t) = (-2cos(t) ; 2sin(t)), t ∈ [0 ; π]'])[0];
  assert.equal(rev.kind, 'wrong');
  assert.equal(rev.rule, 'v_orientation_reversed');
  assert.equal(play(half, null, ['γ(t) = (-t ; sqrt(4-t^2)), t ∈ [-2 ; 2]'])[0].kind, 'done');
  const ell = { kind: 'param', curve: { ref: '(3cos(t) ; 2sin(t))', t: [0, '2π'], closed: true } };
  assert.equal(play(ell, null, ['(3cos(t) ; 2sin(t)), t ∈ [0 ; 4π]'])[0].rule, 'v_param_bounds');
  assert.equal(play(ell, null, ['(3cos(t) ; 2sin(t)), t ∈ [-π ; π]'])[0].kind, 'done');
  const cz = { kind: 'param', complex: true, curve: { ref: '(1+i)t', t: [0, 1] } };
  assert.equal(play(cz, null, ['γ(t) = (1+i)t, t ∈ [0 ; 1]'])[0].kind, 'done');
  const hemi = { kind: 'param', surface: { ref: '(3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ))', u: [0, 'π/2'], v: [0, '2π'], params: ['θ', 'φ'] } };
  assert.deepEqual(play(hemi, null, ['σ(θ, φ) = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ))', '(θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]']).map((v) => v.kind), ['ok', 'done']);
  assert.equal(play(hemi, null, ['σ(r, φ) = (r cos(φ) ; r sin(φ) ; sqrt(9-r^2)), (r ; φ) ∈ [0 ; 3] × [0 ; 2π]'])[0].kind, 'done');
  assert.equal(play(hemi, null, ['σ(φ, θ) = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), φ ∈ [0 ; 2π], θ ∈ [0 ; π/2]'])[0].rule, 'v_cross_order');
  assert.equal(play(hemi, null, ['σ(θ, φ) = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), (θ ; φ) ∈ [0 ; π] × [0 ; 2π]'])[0].rule, 'v_surf_domain');
  assert.match(JUDGES.param.templateML(half, 'γ(t) = (□cos(t) ; 2sin(t)), t ∈ [0 ; □]', {}), /data-blank="1"/);
});

test('judge boundary: points, cancelling sides, oriented pieces', () => {
  const hemi = {
    kind: 'boundary', sides: [
      { name: 'Γ1', point: true }, { name: 'Γ2', cancels: 'Γ4', ref: '(3sin(t) ; 0 ; 3cos(t))', t: [0, 'π/2'] },
      { name: 'Γ3', ref: '(3cos(t) ; 3sin(t) ; 0)', t: [0, '2π'], closed: true }, { name: 'Γ4', cancels: 'Γ2', ref: '(3sin(t) ; 0 ; 3cos(t))', t: [0, 'π/2'] },
    ],
  };
  assert.deepEqual(play(hemi, null, ['Γ1 : point', 'Γ2 et Γ4 : s\'annulent', 'Γ3 : (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; 2π]']).map((v) => v.kind), ['ok', 'ok', 'done']);
  assert.equal(play(hemi, null, ['Γ3 : (3cos(t) ; -3sin(t) ; 0), t ∈ [0 ; 2π]'])[0].rule, 'v_boundary_orient');
  assert.equal(play(hemi, null, ['(3sin(t) ; 0 ; 3cos(t)), t ∈ [0 ; π/2]'])[0].rule, 'v_boundary_pieces');
  assert.equal(play(hemi, null, ['Γ3 : point'])[0].rule, 'v_boundary_pieces');
});

test('judge transform: Fourier and Laplace, forward, inverse, equations, half-plane', () => {
  const ft = { kind: 'transform', transform: 'fourier', v: 'x', s: 'α', f: 'e^(-3x^2+6x+6)', F: 'e^9 e^(-iα) e^(-α^2/12)/sqrt(6)', dir: 'forward' };
  assert.deepEqual(play(ft, null, ['e^9 e^(-3(x-1)^2)', 'e^9 e^(-iα) 𝓕(e^(-3x^2))(α)', 'f̂(α) = e^9 e^(-iα) e^(-α^2/12)/√6']).map((v) => v.kind), ['ok', 'ok', 'done']);
  assert.equal(play(ft, null, ['e^9 e^(iα) e^(-α^2/12)/√6'])[0].kind, 'wrong');
  const eq = { kind: 'transform', transform: 'fourier', v: 'x', s: 'α', unknown: 'û', symbols: { 'f̂': 'sqrt(2/π)/(1+α^2)' }, f: 'e^(-2|x|)/4', F: '(1/2)sqrt(2/π)/(α^2+4)', dir: 'inverse' };
  const r = play(eq, null, ['2û + 3√(2π) f̂ û = f̂', '2û + √(2π) f̂ û = f̂', 'û = (1/2)√(2/π)/(α^2+4)', 'u(x) = e^(-2x)/4', 'u(x) = e^(-2|x|)/4']);
  assert.deepEqual(r.map((v) => v.kind), ['ok', 'wrong', 'ok', 'wrong', 'done']);
  const lap = { kind: 'transform', transform: 'laplace', v: 't', s: 'z', f: 'e^(-2t)(4cos(3t)-7sin(5t))', F: '4(z+2)/((z+2)^2+9)-35/((z+2)^2+25)', gamma0: -2, halfPlane: true, dir: 'forward' };
  const l = play(lap, null, ['F(z) = 4(z+2)/((z+2)^2+9)-35/((z+2)^2+25)', 'F(z) = 4(z+2)/((z+2)^2+9)-35/((z+2)^2+25), Re z > 0', 'F(z) = 4(z+2)/((z+2)^2+9)-35/((z+2)^2+25), Re(z) > -2']);
  assert.deepEqual(l.map((v) => v.kind), ['stay', 'wrong', 'done']);
  assert.equal(l[1].rule, 'f_lap_abscissa');
  const ode = { kind: 'transform', transform: 'laplace', v: 't', s: 'z', unknown: 'Y', f: '1+t e^(-t)', F: '1/z+1/(z+1)^2', dir: 'inverse' };
  assert.deepEqual(play(ode, null, ['z^2Y - z - 1 + 2(zY - 1) + Y = 1/z', 'Y = 1/z + 1/(z+1)^2', 'y(t) = 1 + t e^(-t)']).map((v) => v.kind), ['ok', 'ok', 'done']);
  assert.equal(play(ode, null, ['z^2Y - z + 2zY + Y = 1/z'])[0].kind, 'wrong');
});

test('judge antideriv with grad: potentials and harmonic conjugates', () => {
  const cfg = { kind: 'antideriv', grad: ['2x y+z', 'x^2', 'x+2z'], vars: ['x', 'y', 'z'], at: { point: [1, 2, -1], value: 0 } };
  const r = play(cfg, 'φ', ['φ = x^2y + xz + α(y, z)', 'φ = x^2y + xz + C', 'φ = x^2y + xz + β(z)', 'φ = x^2 y + x z + z^2 + C', 'C = 2', 'C = -2', 'φ = x^2y + xz + z^2 - 2']);
  assert.deepEqual(r.map((v) => v.kind), ['ok', 'wrong', 'ok', 'ok', 'wrong', 'ok', 'done']);
  assert.equal(r[4].rule, 'v_pot_final_const');
  const u = { kind: 'antideriv', grad: ['2x+3', '-2y'], vars: ['x', 'y'], name: 'u' };
  assert.deepEqual(play(u, 'u', ['u = x^2 + 3x + α(y)', 'u = x^2+3x-y^2']).map((v) => v.kind), ['ok', 'done']);
  // The old form is unchanged.
  const old = { kind: 'antideriv', v: 'x' };
  assert.equal(JUDGES.antideriv.judgeLine(old, readWith(old, 'int(2x, x)'), 'x^2+C', {}).kind, 'done');
});

test('parse: 2|x| is a product, set-builders keep their bar, hatted letters', () => {
  assert.ok(parse('e^(-2|x|)/4', { vars: ['x'] }));
  assert.equal(parse('{2n | n ∈ ℕ}', { vars: ['n'] }).kind, 'builder');
  assert.ok(parse('2û + 3√(2π)f̂û', { vars: ['α'] }));
});
