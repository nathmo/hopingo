// f-lap-ode, f-lap-integro and f-lap-problem (module F, part c, step U10):
// linear ODE with initial conditions by the Laplace transform (ℒ(y″) =
// z²Y − z y(0) − y′(0), isolate Y, partial fractions, table), the
// integro-differential equations of GM (a convolution with e^(at)), and
// the exam problem F3 (10 points: transform, Y, residues, Bromwich arc,
// check). Built from the answer: the roots of the characteristic
// polynomial, the right-hand side and the initial conditions are drawn,
// Y and y are computed exactly (fourier-c-kit.js).

import { partsItem } from './geo-kit.js';
import { asProblem, problemItem } from './kit-problem.js';
import { blocksItem, linesItem } from './kit.js';
import { CQ } from '../../cas/complex.js';
import { Q } from '../../math/rational.js';
import {
  MT, examTag, H, KEYS, TABLE, rd, lap, lapres, opt, mcqMulti, term, sumT, fac, q, qt,
  P, padd, pmul, pscale, deg, lin, zpoly, zpow, fracT, denPoly, pfd, pfdText, inverseText, residueText, factorsText, cText, integroResidual,
} from './fourier-c-kit.js';

const SKO = 'f-lap-ode';
const SKI = 'f-lap-integro';
const SKP = 'f-lap-problem';
const cq = (a, b = 0) => new CQ(Q.of(a), Q.of(b));
const zk = (k) => (k === 0 ? '' : k === 1 ? 'z' : `z^${k}`);
const PRIMES = ['y', "y'", "y''", "y'''", "y''''"];
const PRIMES_H = ['y', 'y′', 'y″', 'y‴', 'y⁽⁴⁾'];

// ---------- an ODE, exactly ----------

// roots: [{p: CQ, m}] of the characteristic polynomial (conjugates both
// listed); rhs: {kind: 'zero' | 'const' | 'exp' | 'cos' | 'sin', k, c, w};
// ics: [y(0), y′(0), …].
function odeBuild(roots, rhs, ics) {
  const chi = denPoly(roots);
  const n = chi.length - 1;
  const a = chi.map((x) => x.re);
  // L(rhs) = Rn/Rd, its poles.
  let Rn = P(0); let Rd = P(1); let rpoles = [];
  if (rhs.kind === 'const') { Rn = P(rhs.k); Rd = P(0, 1); rpoles = [{ p: cq(0), m: 1 }]; }
  if (rhs.kind === 'exp') { Rn = P(rhs.k); Rd = lin(rhs.c); rpoles = [{ p: cq(rhs.c), m: 1 }]; }
  if (rhs.kind === 'cos' || rhs.kind === 'sin') {
    Rn = rhs.kind === 'cos' ? P(0, rhs.k) : P(rhs.k * rhs.w); Rd = P(rhs.w * rhs.w, 0, 1);
    rpoles = [{ p: cq(0, rhs.w), m: 1 }, { p: cq(0, -rhs.w), m: 1 }];
  }
  const poles = roots.map((x) => ({ ...x }));
  for (const r of rpoles) {
    const same = poles.find((x) => x.p.eq(r.p));
    if (same) same.m += r.m; else poles.push({ ...r });
  }
  // I(z) = Σ a_k Σ_{j<k} z^(k−1−j) y_j ; swapped: z^j.
  const icPoly = (swap) => {
    let I = P(0);
    for (let k = 1; k <= n; k++) {
      for (let j = 0; j < k; j++) {
        const e = swap ? j : k - 1 - j;
        const mono = Array.from({ length: e + 1 }, (_, i) => (i === e ? 1 : 0));
        I = padd(I, pscale(P(...mono), a[k].mul(ics[j] ?? 0)));
      }
    }
    return I;
  };
  const N = padd(pmul(icPoly(false), Rd), Rn);
  const parts = pfd(N, poles);
  const Nsw = padd(pmul(icPoly(true), Rd), Rn);
  const Yt = (num) => `${deg(num) > 0 ? `(${zpoly(num)})` : zpoly(num)}/(${factorsText(poles)})`;
  const Nz = Rn;
  return { a, n, rhs, ics, roots, poles, N, parts, Y: Yt(N), Ysw: Nsw.every((x, i) => x.eq(N[i] ?? cq(0))) && Nsw.length === N.length ? null : Yt(Nsw), Y0: ics.some((x) => x) ? Yt(Nz) : null, Nsw, Nz, y: inverseText(parts) };
}

const nice = (parts, d = 6, n = 12) => parts.every((x) => x.c.every((c) => c.re.d <= d && c.im.d <= d && Math.abs(c.re.n) <= n && Math.abs(c.im.n) <= n))
  && parts.every((x) => x.c.some((c) => !c.isZero()));

// Texts of the equation.
function odeText(o) {
  const lhs = sumT(o.a.map((c, k) => [c, k]).reverse().map(([c, k]) => term(c, PRIMES[k])));
  return `${lhs}=${rhsText(o.rhs)}`;
}
function odeHtml(o) {
  const lhs = sumT(o.a.map((c, k) => [c, k]).reverse().map(([c, k]) => term(c, PRIMES_H[k])));
  const ic = o.ics.map((v, j) => `${PRIMES_H[j]}(0) = ${rd(v)}`).join(', ');
  return `${rd(`${lhs}=${rhsText(o.rhs)}`)}, ${ic}`;
}
function rhsText(r) {
  if (r.kind === 'zero') return '0';
  if (r.kind === 'const') return String(r.k);
  if (r.kind === 'exp') return term(r.k, r.c === 1 ? 'e^t' : `e^(${term(r.c, 't')})`);
  return term(r.k, `${r.kind}(${term(r.w, 't')})`);
}
function rhsZ(r) {
  if (r.kind === 'zero') return '0';
  if (r.kind === 'const') return `${r.k}/z`;
  if (r.kind === 'exp') return fracT(r.k, zpow(cq(r.c), 1));
  if (r.kind === 'cos') return `${term(r.k, 'z')}/(z^2+${r.w * r.w})`;
  return `${r.k * r.w}/(z^2+${r.w * r.w})`;
}
// The transformed equation: Σ a_k (z^k Y − Σ z^(k−1−j) y_j) = R(z).
function transformedEq(o, { swap = false } = {}) {
  const pieces = [];
  for (let k = o.n; k >= 0; k--) {
    const c = o.a[k];
    if (c.n === 0) continue;
    const inner = [k === 0 ? 'Y' : `${zk(k)}Y`];
    for (let j = 0; j < k; j++) inner.push(term(-(o.ics[j] ?? 0), zk(swap ? j : k - 1 - j)));
    const body = sumT(inner);
    const multi = inner.filter((x) => x && x !== '0').length > 1;
    pieces.push(multi ? (c.eq(1) ? body : `${fac(c)}(${body})`) : term(c, body));
  }
  return `${sumT(pieces)}=${rhsZ(o.rhs)}`;
}

function odeData(rng, level) {
  for (let i = 0; i < 300; i++) {
    let roots;
    let rhs;
    let ics;
    if (level === 5) {
      const fam = rng.pick(['cube', 'quart']);
      if (fam === 'cube') {
        const c = rng.pick([1, 2]);
        roots = [{ p: cq(-c), m: 3 }];
        rhs = { kind: 'exp', k: rng.pick([2, 6, -6, 3]), c: -c };
        ics = [rng.int(-1, 1), rng.int(-1, 1), rng.int(-1, 1)];
      } else {
        const w = rng.pick([1, 2]);
        roots = [{ p: cq(w), m: 1 }, { p: cq(-w), m: 1 }, { p: cq(0, w), m: 1 }, { p: cq(0, -w), m: 1 }];
        rhs = { kind: 'zero' };
        ics = [rng.int(-1, 2), rng.int(-2, 2) * w, rng.int(-1, 1) * w * w, rng.int(-1, 1) * w ** 3];
      }
    } else {
      const fam = rng.pick(['real', 'real', 'double', 'cplx']);
      if (fam === 'real') { const r1 = rng.int(-3, 1); const r2 = rng.int(-3, 1); if (r1 === r2) continue; roots = [{ p: cq(r1), m: 1 }, { p: cq(r2), m: 1 }]; }
      if (fam === 'double') roots = [{ p: cq(rng.int(-3, -1)), m: 2 }];
      if (fam === 'cplx') { const a = rng.pick([0, -1, -2]); const b = rng.pick([1, 2]); roots = [{ p: cq(a, b), m: 1 }, { p: cq(a, -b), m: 1 }]; }
      const kind = rng.pick(['const', 'exp', 'exp', 'cos', 'const']);
      rhs = kind === 'const' ? { kind, k: rng.pick([1, 2, 3, 4, 6]) } : kind === 'exp' ? { kind, k: rng.pick([1, 2, 3, -2, 4]), c: rng.pick([-3, -2, -1, 1, 2]) } : { kind, k: rng.pick([1, 2, 3]), w: rng.pick([1, 2]) };
      ics = [rng.int(-2, 2), rng.int(-2, 2)];
      // No resonance in the lessons: the poles of the right side are not roots.
      const rp = rhs.kind === 'const' ? [cq(0)] : rhs.kind === 'exp' ? [cq(rhs.c)] : [cq(0, rhs.w)];
      if (rp.some((p) => roots.some((x) => x.p.eq(p)))) continue;
    }
    const o = odeBuild(roots, rhs, ics);
    if (!nice(o.parts) || o.y === '0' || !o.Ysw) continue;
    if (deg(o.N) < 0) continue;
    return { ...o, id: `${odeText(o)}:${ics.join(',')}` };
  }
  const o = odeBuild([{ p: cq(-1), m: 2 }], { kind: 'const', k: 1 }, [1, 1]);
  return { ...o, id: 'fallback', fallback: true };
}

// The wrong answers of the traps, as lines of the judge.
function odeTraps(o) {
  const t = { f_lap_deriv_ic: [o.Ysw, o.Y0].filter(Boolean) };
  const sw = inverseText(pfd(o.Nsw, o.poles));
  if (sw !== o.y) t.f_lap_deriv_ic.push(sw);
  const shifted = inverseText(o.parts.map((x) => ({ ...x, p: new CQ(x.p.re.neg(), x.p.im) })));
  if (shifted !== o.y && o.parts.some((x) => x.p.re.n !== 0)) t.f_lap_shift_sign = [shifted];
  return t;
}

function odeItem(level, rng, opts) {
  const o = odeData(rng, level);
  const traps = odeTraps(o);
  const eq = transformedEq(o);
  const des = pfdText(o.parts);
  const first = eq.split(/(?=[+-])/)[0];
  const lead = o.n === 2 ? 'z²Y − z y(0) − y′(0)' : o.n === 3 ? 'z³Y − z² y(0) − z y′(0) − y″(0)' : 'z⁴Y − z³ y(0) − z² y′(0) − z y″(0) − y‴(0)';
  const parts = [
    {
      start: 'Y = ℒ(y)', judge: lap({ dir: 'inverse', unknown: 'Y', f: o.y, F: o.Y, final: 'transform', traps }),
      notes: level === 1 ? [`ℒ(${PRIMES_H[o.n]}) = ${lead}, ℒ(y′) = zY − y(0).`] : [],
      decisions: [{ kind: 'decision', prompt: `ℒ(${PRIMES_H[o.n]}) = ?`, levels: [3], options: [
        { id: 'right', label: lead, valid: true },
        { id: 'swap', label: o.n === 2 ? 'z²Y − y(0) − z y′(0)' : `z^${o.n}Y − y(0) − … − z^${o.n - 1} y^(${o.n - 1})(0)`, valid: false, rule: 'f_lap_deriv_ic', why: 'La puissance de z la plus haute va avec y(0) : ℒ(y″) = z²Y − z y(0) − y′(0).' },
      ] }],
      lines: [
        { math: eq, note: 'Transformer (LP2)', subgoal: 'transform', blank: [first], blank2: [eq.split('=')[0]] },
        { math: `Y = ${o.Y}`, note: 'Isoler Y', subgoal: 'isolate', blank2: [o.Y] },
      ],
    },
    {
      html: 'Puis on inverse :', ask: 'Y =', start: `Y = ${o.Y}`, judge: lap({ dir: 'inverse', unknown: 'Y', f: o.y, F: o.Y, traps }),
      decisions: [{ kind: 'decision', prompt: 'Comment inverser ?', levels: [3], options: [
        { id: 'des', label: 'Éléments simples, puis la table', valid: true, ref: true },
        { id: 'res', label: 'Somme des résidus de Y(z)e^(zt)', valid: true },
        { id: 'direct', label: 'Inverser le numérateur et le dénominateur séparément', valid: false, why: 'ℒ⁻¹ n\'est pas multiplicative : ℒ⁻¹(N/D) ≠ ℒ⁻¹(N)/ℒ⁻¹(D).' },
      ] }],
      lines: [
        { math: `Y = ${des}`, note: 'Éléments simples', subgoal: 'des', blank2: [des] },
        { math: `y(t) = ${o.y}`, note: 'Table', subgoal: 'inverse', blank2: [o.y] },
      ],
    },
  ];
  return partsItem({
    skill: SKO, level, prompt: `Résous par la transformée de Laplace : ${odeHtml(o)}.${TABLE()}`,
    parts, keys: KEYS,
    hints: H(`ℒ(y″) = z²Y − z y(0) − y′(0) : transforme l'équation, isole Y, décompose et inverse.`, MT(eq), MT(`Y = ${des}`)),
    subgoals: [
      { id: 'transform', label: 'transformer l\'équation', skill: SKO },
      { id: 'isolate', label: 'isoler Y', skill: 'eq-both-sides' },
      { id: 'des', label: 'éléments simples', skill: 'g0-pfd-simple' },
      { id: 'inverse', label: 'inverser', skill: 'f-lap-inv-des' },
    ],
    key: `${SKO}:${level}:${o.id}`, exam: examTag(opts, 6), fallback: o.fallback, noHints: level >= 5 || !!opts.exam,
  });
}

function odeMcq(rng, opts) {
  const o = odeData(rng, 4);
  const t = odeTraps(o);
  return mcqMulti({
    skill: SKO, level: 4, key: `mcq:${o.id}`, exam: examTag(opts),
    prompt: `On résout ${odeHtml(o)} par Laplace (Y = ℒ(y)). Coche les affirmations justes.${TABLE()}`,
    options: [
      opt(MT(transformedEq(o)), true),
      opt(MT(transformedEq(o, { swap: true })), false, 'f_lap_deriv_ic'),
      opt(MT(`Y = ${o.Y}`), true),
      opt(MT(`y(t) = ${o.y}`), true),
      ...(t.f_lap_shift_sign ? [opt(MT(`y(t) = ${t.f_lap_shift_sign[0]}`), false, 'f_lap_shift_sign')] : [opt(MT(`Y = ${o.Ysw}`), false, 'f_lap_deriv_ic')]),
    ],
    solution: [{ html: `${MT(transformedEq(o))}, ${MT(`Y = ${pfdText(o.parts)}`)}, ${MT(`y(t) = ${o.y}`)}`, note: '' }],
    expectedSec: 240,
  }, rng);
}

export function genOde(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return odeMcq(rng, opts);
  if (opts.exam === 'open') return asProblem(odeItem(4, rng, opts), 6);
  return odeItem(level, rng, opts);
}

// ---------- f-lap-integro ----------

// u′ + a u + c ∫₀ᵗ u(s) e^(a(t − s)) ds = K e^(at), u(0) = A, with
// c = ω² + a², K = Aa + Bω: U = (Az + Bω)/(z² + ω²), u = A cos ωt + B sin ωt.
function integroData(rng) {
  for (let i = 0; i < 200; i++) {
    const a = rng.pick([-2, -1, 1, 2, 3]);
    const w = rng.pick([1, 2, 3, 4]);
    const A = rng.pick([1, 2, -1, 3]);
    const B = rng.pick([1, 2, -1, -2, 3]);
    const K = A * a + B * w;
    if (!K || Math.abs(K) > 20) continue;
    const c = w * w + a * a;
    if (integroResidual({ a, c, K, A, B, w }) > 1e-6) throw new Error('f-lap-integro: residual');
    return { a, w, A, B, K, c, id: `${a}:${w}:${A}:${B}` };
  }
  return { a: 2, w: 4, A: 1, B: 2, K: 10, c: 20, id: 'fallback', fallback: true };
}

const expA = (a) => (a === 1 ? 'e^t' : `e^(${term(a, 't')})`);
const zMinus = (a) => zpow(cq(a), 1);

function integroItem(level, rng, opts) {
  const d = integroData(rng);
  const kern = `1/${zMinus(d.a)}`;
  const U = `(${sumT([term(d.A, 'z'), String(d.B * d.w)])})/(z^2+${d.w * d.w})`;
  const u = sumT([term(d.A, `cos(${term(d.w, 't')})`), term(d.B, `sin(${term(d.w, 't')})`)]);
  const eq = `${sumT(['zU', String(-d.A), term(d.a, 'U'), `${d.c}U/${zMinus(d.a)}`])}=${d.K}/${zMinus(d.a)}`;
  const kHtml = d.a === 1 ? 'e^(t − s)' : d.a === -1 ? 'e^(−(t − s))' : `e^(${rd(d.a)}(t − s))`;
  const html = `u′(t) ${d.a > 0 ? '+' : '−'} ${Math.abs(d.a) === 1 ? '' : Math.abs(d.a)}u(t) + ${d.c} ∫₀ᵗ u(s) ${kHtml} ds = ${rd(term(d.K, expA(d.a)))}, u(0) = ${rd(d.A)}`;
  const parts = [
    {
      html: null, start: `ℒ(${expA(d.a)})`, judge: lap({ f: expA(d.a), F: kern, traps: { f_lap_integro_kernel: [`1/${zMinus(-d.a)}`] } }),
      notes: level === 1 ? [`L'intégrale est la convolution (u ∗ g)(t) avec le noyau g(t) = ${rd(expA(d.a))} : ℒ(u ∗ g) = U(z)G(z).`] : [],
      decisions: [{ kind: 'decision', prompt: 'Quel est le noyau g de la convolution ?', levels: [2, 3], options: [
        { id: 'right', label: `g(t) = ${rd(expA(d.a))}`, valid: true },
        { id: 'neg', label: `g(t) = ${rd(expA(-d.a))}`, valid: false, rule: 'f_lap_integro_kernel', why: `L'intégrale est ∫₀ᵗ u(s) g(t − s) ds avec g(t) = ${rd(expA(d.a))}.` },
        { id: 'both', label: `g(t) = ${rd(d.c)}${rd(expA(d.a))}u(t)`, valid: false, why: 'Le noyau est la fonction de t − s seule ; u reste dans la convolution.' },
      ] }],
      lines: [{ math: kern, note: 'Ligne L3', subgoal: 'kernel', blank: [zMinus(d.a).replace(/[()]/g, '')] }],
    },
    {
      html: 'Transforme l\'équation (LP2, LP6), puis isole U :', ask: '', start: 'U = ℒ(u)',
      judge: lap({ dir: 'inverse', unknown: 'U', f: u, F: U, final: 'transform', traps: { f_lap_deriv_ic: [`${d.K}/(z^2+${d.w * d.w})`] } }),
      decisions: [{ kind: 'decision', prompt: 'Que devient l\'intégrale ?', levels: [3], options: [
        { id: 'conv', label: `${d.c}U(z)G(z) (LP6, convolution)`, valid: true },
        { id: 'prim', label: `${d.c}U(z)/z (LP3, primitive)`, valid: false, why: 'LP3 sert pour ∫₀ᵗ u(s) ds seul ; ici il y a le noyau g(t − s) : c\'est une convolution.' },
      ] }],
      lines: [
        { math: eq, note: 'Transformer', subgoal: 'transform', blank: [`zU-${d.A}`.replace('--', '+')], blank2: [eq.split('=')[0]] },
        { math: `U = ${U}`, note: `Isoler U : (z ${d.a > 0 ? '−' : '+'} ${Math.abs(d.a)})(z ${d.a > 0 ? '+' : '−'} ${Math.abs(d.a)}) + ${d.c} = z² + ${d.w * d.w}`, subgoal: 'isolate', blank2: [U] },
      ],
    },
    {
      html: 'Puis on inverse :', ask: 'u(t) =', start: `U = ${U}`, judge: lap({ dir: 'inverse', unknown: 'U', f: u, F: U, traps: { f_sin_omega_factor: [sumT([term(d.A, `cos(${term(d.w, 't')})`), term(d.B * d.w, `sin(${term(d.w, 't')})`)])].filter((x) => d.w !== 1 && x !== u) } }),
      lines: [{ math: `u(t) = ${u}`, note: 'Lignes L5 et L4', subgoal: 'inverse', blank: [u.split(/(?=[+-])/).at(-1).replace(/^\+/, '')], blank2: [u] }],
    },
  ];
  return partsItem({
    skill: SKI, level, prompt: `Résous par la transformée de Laplace : ${html}.${TABLE()}`,
    parts, keys: KEYS,
    hints: H('L\'intégrale est une convolution : ℒ(u ∗ g) = U(z)G(z).', `ℒ(${MT(expA(d.a))}) = ${MT(kern)}`, MT(eq)),
    subgoals: [
      { id: 'kernel', label: 'noyau', skill: SKI }, { id: 'transform', label: 'transformer', skill: SKI },
      { id: 'isolate', label: 'isoler U', skill: SKI }, { id: 'inverse', label: 'inverser', skill: SKI },
    ],
    key: `${SKI}:${level}:${d.id}`, exam: examTag(opts, 3), fallback: d.fallback, noHints: level >= 5 || !!opts.exam,
  });
}

export function genIntegro(level, rng, profile, opts = {}) {
  if (opts.exam === 'open' || level === 5) {
    const it = integroItem(level === 5 && !opts.exam ? 5 : 4, rng, opts);
    return asProblem(it, 3);
  }
  return integroItem(level, rng, opts);
}

// ---------- f-lap-problem (F3) ----------

function problemData(rng) {
  for (let i = 0; i < 200; i++) {
    const a = rng.pick([1, 2, 3]);
    const b = rng.pick([1, 2, 3].filter((x) => x !== a));
    const al = rng.pick([1, 2, -1]);
    const be = rng.pick([0, 0, 1, -1]);
    const ga = rng.pick([1, 2, -1, 3]);
    const k = ga * (a - b);
    if (Math.abs(k) > 6) continue;
    const ics = [al + be, -a * al - b * be + ga];
    if (Math.abs(ics[1]) > 6) continue;
    const o = odeBuild([{ p: cq(-a), m: 1 }, { p: cq(-b), m: 1 }], { kind: 'exp', k, c: -b }, ics);
    if (!o.Ysw) continue;
    return { ...o, A: a, B: b, al, be, ga, k, id: `${a}:${b}:${al}:${be}:${ga}` };
  }
  const o = odeBuild([{ p: cq(-2), m: 1 }, { p: cq(-1), m: 1 }], { kind: 'exp', k: 2, c: -1 }, [1, 0]);
  return { ...o, A: 2, B: 1, al: 1, be: 0, ga: 2, k: 2, id: 'fallback', fallback: true };
}

const numT = (N) => (deg(N) > 0 ? `(${zpoly(N)})` : zpoly(N) === '1' ? '' : zpoly(N));

function residueParts(o, level) {
  const pa = o.parts.find((x) => x.p.eq(cq(-o.A)));
  const pb = o.parts.find((x) => x.p.eq(cq(-o.B)));
  const ra = residueText(pa);
  const rb = residueText(pb);
  const za = String(-o.A);
  const zb = String(-o.B);
  return [
    {
      html: `Résidu de Y(z)e^(zt) en z = ${rd(za)} (pôle simple) :`, ask: 'Res =', start: `Res(${rd(za)})`, judge: lapres({ value: ra, z0: za }),
      lines: [
        { math: `${numT(o.N)}e^(z t)/${zpow(cq(-o.B), 2)}`, note: `(z ${'+'} ${o.A})Y(z)e^(zt) en z = ${rd(za)}`, subgoal: 'residues' },
        { math: ra, note: 'Calculer', subgoal: 'residues', blank: [ra] },
      ],
    },
    {
      html: `Résidu en z = ${rd(zb)} (pôle double) :`, ask: 'Res =', start: `Res(${rd(zb)})`, judge: lapres({ value: rb, z0: zb }),
      decisions: [{ kind: 'decision', prompt: 'Quelle formule ?', levels: [2, 3, 4], options: [
        { id: 'double', label: 'd/dz[(z − z₀)²Y(z)e^(zt)] en z₀', valid: true },
        { id: 'simple', label: 'lim (z − z₀)Y(z)e^(zt) quand z → z₀', valid: false, rule: 'c_simple_formula_double', why: `${rd(zb)} est un pôle double : la formule du pôle simple donne une limite infinie.` },
      ] }],
      lines: [
        { math: `d(${numT(o.N)}e^(z t)/${zpow(cq(-o.A), 1)}, z)`, note: 'Dériver, puis z = z₀', subgoal: 'residues' },
        { math: rb, note: 'Calculer', subgoal: 'residues', blank: level === 1 ? [rb] : [], blank2: [rb] },
      ],
    },
  ];
}

const ARC_DECISION = {
  kind: 'decision', prompt: 'Pourquoi l\'intégrale sur l\'arc gauche C_R de Bromwich tend-elle vers 0 (t > 0) ?', options: [
    { id: 'jordan', label: '|e^(zt)| = e^(γt)e^(tR cos θ), |Y| ≤ C/R et ∫ e^(tR cos θ) dθ ≤ π/(tR) (Jordan) : la borne est en 1/R', valid: true },
    { id: 'triangle', label: '|(z + 1)²(z + 2)| ≤ (R + 1)²(R + 2), donc |Y| ≤ C/(R + 1)³ …', valid: false, rule: 'c_arc_triangle', why: 'Pour majorer |Y|, il faut minorer le dénominateur : |z + a| ≥ R − |a| (inégalité triangulaire inverse).' },
    { id: 'ml', label: 'Longueur πR fois max |Y e^(zt)| ≤ C e^(γt)/R : la borne tend vers 0', valid: false, why: 'πR · C/R ne tend pas vers 0 : ici deg dénominateur = deg numérateur + 1, il faut le lemme de Jordan.' },
  ],
};

function problemLines(level, rng, opts) {
  const o = problemData(rng);
  const traps = odeTraps(o);
  const eq = transformedEq(o);
  const parts = [
    {
      start: 'Y = ℒ(y)', judge: lap({ dir: 'inverse', unknown: 'Y', f: o.y, F: o.Y, final: 'transform', traps }),
      notes: level === 1 ? ['ℒ(y″) = z²Y − z y(0) − y′(0), ℒ(y′) = zY − y(0).'] : [],
      lines: [
        { math: eq, note: 'Transformer', subgoal: 'transform', blank: [eq.split(/(?=[+-])/)[0]] },
        { math: `Y = ${o.Y}`, note: 'Isoler Y', subgoal: 'isolate', blank2: [o.Y] },
      ],
    },
    ...residueParts(o, level),
    {
      html: 'Somme des résidus (contour de Bromwich) :', ask: 'y(t) =', start: 'y(t)',
      judge: lap({ dir: 'inverse', f: o.y, F: o.Y, traps }),
      decisions: [{ ...ARC_DECISION, levels: [2, 3, 4] }],
      notes: level === 1 ? ['Sur l\'arc gauche, Jordan donne une borne en 1/R : l\'intégrale tend vers 0, et y(t) est la somme des résidus.'] : [],
      lines: [{ math: `y(t) = ${o.y}`, note: `Vérifier : y(0) = ${rd(o.ics[0])}, y′(0) = ${rd(o.ics[1])}`, subgoal: 'check' }],
    },
  ];
  return { o, item: partsItem({
    skill: SKP, level, prompt: `Résous ${odeHtml(o)} par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.${TABLE()}`,
    parts, keys: KEYS,
    hints: H('Transforme, isole Y, puis y(t) = somme des résidus de Y(z)e^(zt) : un pôle simple et un pôle double.', MT(eq), MT(`Y = ${o.Y}`)),
    subgoals: SUBP, key: `${SKP}:${level}:${o.id}`, exam: examTag(opts, 10), fallback: o.fallback, noHints: level >= 5 || !!opts.exam,
  }) };
}
const SUBP = [
  { id: 'transform', label: 'transformer', skill: SKO }, { id: 'isolate', label: 'isoler Y', skill: SKO },
  { id: 'residues', label: 'résidus', skill: 'f-lap-inv-res' }, { id: 'arc', label: 'arc de Bromwich', skill: 'c-arc-estimate' },
  { id: 'check', label: 'vérifier', skill: SKP },
];

// The arc of Bromwich in blocks (2 points), with a decoy of c_arc_triangle.
function arcBlocks(o, level, opts, rng) {
  const den = factorsText(o.poles);
  const CR = 'C<sub>R</sub>';
  const E = (x) => `e<sup>${x}</sup>`;
  const INT = '∫<sub>π/2</sub><sup>3π/2</sup>';
  const blocks = [
    { id: 'param', html: `Sur l'arc gauche ${CR} : z = γ + R${E('iθ')}, θ ∈ [π/2 ; 3π/2], avec γ &gt; γ₀.`, needs: [] },
    { id: 'exp', html: `|${E('zt')}| = ${E('γt')}${E('tR cos θ')}, et cos θ ≤ 0 sur l'arc.`, needs: ['param'] },
    { id: 'Y', html: `Chaque facteur de ${rd(den)} vérifie |z + a| ≥ |z| − |a| (inégalité triangulaire inverse) ; le dénominateur a un degré de plus que le numérateur : |Y(z)| ≤ C/R pour R grand.`, needs: ['param'] },
    { id: 'bound', html: `|∫<sub>${CR}</sub> Y(z)${E('zt')} dz| ≤ (C/R) · ${E('γt')} · R ${INT} ${E('tR cos θ')} dθ.`, needs: ['exp', 'Y'] },
    { id: 'jordan', html: `Jordan : ${INT} ${E('tR cos θ')} dθ ≤ π/(tR), donc la borne vaut πC${E('γt')}/(tR) → 0 quand R → ∞ (t &gt; 0).`, needs: ['bound'] },
    { id: 'decoy', html: 'Sur l’arc, |z + a| ≤ |z| + |a|, donc 1/|z + a| ≤ 1/(|z| + |a|) et |Y(z)| ≤ C/R.', needs: [], distractor: 'c_arc_triangle', why: 'Pour majorer |Y|, on minore son dénominateur (|z + a| ≥ R − |a|) : une majoration du dénominateur ne borne pas |Y|.' },
  ];
  const order = ['param', 'exp', 'Y', 'bound', 'jordan'];
  return blocksItem({
    skill: SKP, level, mode: 'order',
    prompt: 'Montre que l\'intégrale de Y(z)e^(zt) sur l\'arc gauche C_R du contour de Bromwich tend vers 0 quand R → ∞ (t > 0). Touche les blocs dans l\'ordre.',
    blocks: rng.shuffle(blocks), goal: 'jordan', order,
    solution: order.map((id) => ({ html: blocks.find((x) => x.id === id).html, note: '' })),
    hints: [], noHints: true,
    subgoals: [{ id: 'arc', label: 'arc de Bromwich', skill: 'c-arc-estimate' }],
    key: `${o.id}:arc`, exam: opts.exam ? examTag(opts, 2) : false,
  });
}

function problemFull(level, rng, opts) {
  const { o, item } = problemLines(5, rng, opts);
  // Part 1: transform and Y, the two residues (4 + 1 + 2 points).
  const segs = item.script;
  const cut = segs.findIndex((l) => l.kind === 'segment' && /Somme des résidus/.test(l.html));
  const first = { ...item, script: segs.slice(0, cut).filter((l) => l.kind !== 'decision' || !l.prompt.startsWith('Pourquoi')), prompt: '' };
  first.solution = undefined;
  const ode = { kind: 'ode', eq: odeText(o), unknown: 'y', v: 't', order: 2, ic: { x: 0, y: o.ics[0], dy: o.ics[1] } };
  const last = {
    ...item, start: { math: 'y' }, judge: ode, script: [{ kind: 'eq', math: `y = ${o.y}`, note: `y(0) = ${rd(o.ics[0])}, y′(0) = ${rd(o.ics[1])}`, subgoal: 'check' }],
    prompt: 'Donne y(t) (la somme des résidus) ; elle doit vérifier l\'équation et les conditions initiales.', key: `${item.key}:y`, baits: [],
  };
  const fix = (it) => ({ ...it, solution: undefined, answerHtml: undefined });
  return problemItem({
    skill: SKP, level, prompt: item.prompt,
    parts: [
      { item: relines(fix(first)), points: [4, 1, 2], title: 'Transformée, Y et résidus' },
      { item: arcBlocks(o, level, opts, rng), points: 2, title: 'Arc de Bromwich' },
      { item: relines(fix(last)), points: 1, title: 'Solution et vérification' },
    ],
    key: o.id, exam: opts.exam ? examTag(opts, 10) : false, expectedSec: 1500, fallback: o.fallback,
  });
}
// Rebuild the derived fields (solution, answer) of a lines item.
function relines(it) {
  return linesItem({ ...it, start: it.start.math, script: it.script, solution: undefined, answerHtml: undefined, baits: it.baits && it.baits.length ? it.baits : undefined });
}

export function genProblem(level, rng, profile, opts = {}) {
  if (opts.exam === 'open' || level === 5) return problemFull(level, rng, opts);
  return problemLines(level, rng, opts).item;
}
void [cText, qt, q];
