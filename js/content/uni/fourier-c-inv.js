// f-lap-inv-des and f-lap-inv-res (module F, part c, step U10): the
// inverse Laplace transform of a rational F, by real partial fractions and
// the table, or by the residues of F(z)e^(zt) at every pole. Built from
// the answer: the partial fractions are drawn (whole or simple numbers),
// F = N/D is computed exactly (fourier-c-kit.js).

import { partsItem } from './geo-kit.js';
import { asProblem } from './kit-problem.js';
import { CQ } from '../../cas/complex.js';
import { Q } from '../../math/rational.js';
import {
  MT, examTag, H, KEYS, topTerms, TABLE, rd, lap, lapres, opt, mcqMulti, q,
  P, padd, pmul, pscale, ppow, lin, deg, zpoly, zpow, denText, denPoly, pfd, pfdText, inverseText, residueText, cText,
} from './fourier-c-kit.js';

const SKD = 'f-lap-inv-des';
const SKR = 'f-lap-inv-res';
const cq = (a, b = 0) => new CQ(Q.of(a), Q.of(b));

// N = Σ c_{p,j}·D/(z − p)^j from the partial fractions (exact).
function numerator(parts, poles) {
  let N = P(0);
  for (const { p, c } of parts) {
    const m = poles.find((x) => x.p.eq(p)).m;
    const rest = denPoly(poles.filter((x) => !x.p.eq(p)));
    c.forEach((cj, j) => { N = padd(N, pscale(pmul(rest, ppow(lin(p), m - j - 1)), cj)); });
  }
  return N;
}
const realPoly = (N) => N.every((x) => x.im.n === 0);
const smallPoly = (N, max = 20) => N.every((x) => x.re.d === 1 && Math.abs(x.re.n) <= max);

// A real pole p with coefficients [c₁, c₂…] of 1/(z − p)^j.
const realPart = (p, cs) => ({ p: cq(p), m: cs.length, c: cs.map((x) => cq(x)) });
// A conjugate pair a ± bi for f = e^(at)(A cos bt + B sin bt): c = (A − iB)/2.
const pairParts = (a, b, A, B) => {
  const c = new CQ(q(A).div(2), q(B).neg().div(2));
  return [{ p: cq(a, b), m: 1, c: [c] }, { p: cq(a, -b), m: 1, c: [c.conj()] }];
};

// The factors of D as text; a conjugate pair is a trinomial when both are there.
function factorsText(poles) {
  const out = [];
  for (const x of poles) {
    const conj = poles.find((y) => y.p.eq(x.p.conj()) && x.p.im.n !== 0);
    if (conj && x.p.im.n < 0) continue;
    if (conj) out.push(denText([x, conj]));
    else out.push(zpow(x.p, x.m));
  }
  return out.join('');
}

function build(parts) {
  const poles = parts.map(({ p, m }) => ({ p, m }));
  const N = numerator(parts, poles);
  if (!realPoly(N)) return null;
  const D = denPoly(poles);
  const back = pfd(N, poles);
  // Round trip: the drawn partial fractions are those of N/D.
  if (!back.every((b, i) => b.c.every((x, j) => x.eq(parts[i].c[j])))) return null;
  return { parts, poles, N, D, Ntext: zpoly(N), F: `${deg(N) > 0 ? `(${zpoly(N)})` : zpoly(N)}/(${zpoly(D)})`, Ffact: `${deg(N) > 0 ? `(${zpoly(N)})` : zpoly(N)}/(${factorsText(poles)})`, f: inverseText(parts) };
}

// ---------- f-lap-inv-des ----------

function desData(rng, level) {
  for (let i = 0; i < 200; i++) {
    const fam = level === 5 ? 'double' : rng.pick(level === 1 ? ['two', 'real'] : ['two', 'real', 'square', 'two']);
    let parts;
    if (fam === 'two') {
      const [w1, w2] = rng.pick([[1, 2], [2, 3], [1, 3], [2, 5], [1, 4]]);
      const A1 = rng.int(-2, 2); const b1 = rng.int(-3, 3);
      const A2 = rng.int(-2, 2); const b2 = rng.int(-3, 3);
      if ((!A1 && !b1) || (!A2 && !b2)) continue;
      parts = [...pairParts(0, w1, A1, q(b1, w1)), ...pairParts(0, w2, A2, q(b2, w2))];
    } else if (fam === 'real') {
      const ps = [];
      while (ps.length < rng.pick([2, 3])) { const p = rng.int(-3, 3); if (!ps.includes(p)) ps.push(p); }
      parts = ps.map((p) => realPart(p, [rng.pick([1, 2, 3, -1, -2, 4])]));
    } else if (fam === 'square') {
      const a = rng.pick([-2, -1, 1, 2]); const b = rng.pick([1, 2, 3]);
      const A = rng.int(-2, 3); const B = rng.int(-3, 3);
      const c = rng.pick([-2, -1, 0, 1, 3].filter((x) => x !== a));
      if (!A && !B) continue;
      parts = [...pairParts(a, b, A, B), realPart(c, [rng.pick([1, 2, -1, 3])])];
    } else {
      const p = rng.pick([-2, -1, 0, 1]); const w = rng.pick([1, 2, 3]);
      parts = [realPart(p, [rng.int(-2, 2), rng.pick([1, 2, -1, 3])]), ...pairParts(0, w, rng.int(-2, 2), q(rng.pick([1, -1, 2, 3]), w))];
    }
    const d = build(parts);
    if (!d || !smallPoly(d.N) || !smallPoly(d.D, 60) || deg(d.N) < 0) continue;
    return { ...d, fam, id: `${fam}:${d.F}` };
  }
  return { ...build([realPart(-1, [1]), realPart(2, [2])]), fam: 'real', id: 'fallback', fallback: true };
}

// The wrong answers of the traps: sin(bt) not divided by b, e^(−at) for e^(at).
function trapF(d) {
  const out = {};
  const omega = d.parts.map((x) => {
    if (x.p.im.n === 0 || x.p.im.eq(1)) return x;
    // c = (A − iB)/2 with B = b·B′: keep A, take B′·b² … i.e. the student's B is B·b.
    const b = x.p.im.n > 0 ? x.p.im : x.p.im.neg();
    const c = x.c[0];
    return { ...x, c: [new CQ(c.re, c.im.mul(b))] };
  });
  const fo = inverseText(omega);
  if (fo !== d.f) out.f_sin_omega_factor = [fo];
  const shifted = d.parts.map((x) => ({ ...x, p: new CQ(x.p.re.neg(), x.p.im) }));
  const fs = inverseText(shifted);
  if (fs !== d.f && d.parts.some((x) => x.p.re.n !== 0)) out.f_lap_shift_sign = [fs];
  return out;
}

const FORMS = {
  two: { right: '(Az + B)/(z² + ω₁²) + (Cz + D)/(z² + ω₂²)', wrong: 'A/(z² + ω₁²) + B/(z² + ω₂²)', why: 'Sur un trinôme irréductible, le numérateur est de la forme Az + B.' },
  real: { right: 'A/(z − a) + B/(z − b) + …', wrong: 'A/((z − a)(z − b)…)', why: 'Un terme par pôle simple.' },
  square: { right: '(A(z − a) + Bω)/((z − a)² + ω²) + C/(z − c)', wrong: 'A/((z − a)² + ω²) + C/(z − c)', why: 'Sur le trinôme irréductible, le numérateur est de degré 1 : on l\'écrit A(z − a) + Bω pour lire la table.' },
  double: { right: 'A/(z − p) + B/(z − p)² + (Cz + D)/(z² + ω²)', wrong: 'B/(z − p)² + (Cz + D)/(z² + ω²)', why: 'Le pôle double demande deux termes, en 1/(z − p) et 1/(z − p)².' },
};

function desItem(level, rng, opts) {
  const d = desData(rng, level);
  const des = pfdText(d.parts);
  const tab = pfdText(d.parts, { table: true });
  const traps = trapF(d);
  const form = FORMS[d.fam];
  const hasSin = d.parts.some((x) => x.p.im.n > 0 && !x.p.im.eq(1) && x.c[0].im.n !== 0);
  const lines = [
    { math: `F(z) = ${des}`, note: 'Éléments simples', subgoal: 'solve', blank: [topTerms(des).at(-1)], blank2: [des] },
    ...(tab !== des && level <= 4 ? [{ math: `F(z) = ${tab}`, note: 'Forme de la table', subgoal: 'table' }] : []),
    { math: `f(t) = ${d.f}`, note: 'Table, terme à terme', subgoal: 'inverse', blank2: [d.f] },
  ];
  const decisions = [
    { kind: 'decision', prompt: 'Forme de la décomposition ?', levels: [2, 3], options: [
      { id: 'right', label: form.right, valid: true },
      { id: 'wrong', label: form.wrong, valid: false, rule: 'g0_pfd_form', why: form.why },
    ] },
  ];
  if (hasSin) {
    decisions.push({ kind: 'decision', prompt: 'Quelle fonction a pour transformée 1/(z² + ω²) ?', levels: [3], options: [
      { id: 'sin', label: '(1/ω) sin(ωt)', valid: true },
      { id: 'nofac', label: 'sin(ωt)', valid: false, rule: 'f_sin_omega_factor', why: 'ℒ(sin ωt) = ω/(z² + ω²) : il faut diviser par ω.' },
    ] });
  }
  const judge = lap({ dir: 'inverse', f: d.f, F: d.F, traps });
  return partsItem({
    skill: SKD, level, prompt: `Trouve f(t) telle que ℒ(f)(z) = F(z) = ${MT(d.Ffact)}.${TABLE()}`,
    parts: [{ start: `F(z) = ${d.Ffact}`, judge, notes: level === 1 ? [`Forme : ${form.right}.`] : [], decisions, lines }],
    keys: KEYS,
    hints: H(`Décompose F en éléments simples réels (${form.right}), puis lis chaque terme dans la table.`, MT(`F(z) = ${des}`), MT(`f(t) = ${d.f}`)),
    subgoals: [{ id: 'solve', label: 'éléments simples', skill: 'g0-pfd-general' }, { id: 'table', label: 'forme de la table', skill: 'f-lap-table' }, { id: 'inverse', label: 'inverser', skill: SKD }],
    key: `${SKD}:${level}:${d.id}`, exam: examTag(opts, 4), fallback: d.fallback, noHints: level >= 5 || !!opts.exam,
  });
}

function desMcq(rng, opts) {
  const d = desData(rng, rng.pick([2, 4]));
  const traps = trapF(d);
  const des = pfdText(d.parts);
  const wrongDes = pfdText(d.parts.map((x) => ({ ...x, c: x.c.map((c) => c.neg()) })).slice(0, 1).concat(d.parts.slice(1)));
  return mcqMulti({
    skill: SKD, level: 4, key: `mcq:${d.id}`, exam: examTag(opts),
    prompt: `Soit F(z) = ${MT(d.Ffact)} et f = ℒ⁻¹(F). Coche les affirmations justes.${TABLE()}`,
    options: [
      opt(MT(`f(t) = ${d.f}`), true),
      opt(MT(`F(z) = ${des}`), true),
      ...(traps.f_sin_omega_factor ? [opt(MT(`f(t) = ${traps.f_sin_omega_factor[0]}`), false, 'f_sin_omega_factor')] : []),
      ...(traps.f_lap_shift_sign ? [opt(MT(`f(t) = ${traps.f_lap_shift_sign[0]}`), false, 'f_lap_shift_sign')] : []),
      ...(wrongDes !== des ? [opt(MT(`F(z) = ${wrongDes}`), false)] : []),
      opt(MT(`f(t) = -(${d.f})`), false),
    ],
    solution: [{ html: `${MT(`F(z) = ${des}`)}, donc ${MT(`f(t) = ${d.f}`)}`, note: '' }],
    expectedSec: 180,
  }, rng);
}

export function genInvDes(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return desMcq(rng, opts);
  if (opts.exam === 'open') return asProblem(desItem(4, rng, opts), 4);
  return desItem(level, rng, opts);
}

// ---------- f-lap-inv-res ----------

function resData(rng) {
  for (let i = 0; i < 200; i++) {
    const fam = rng.pick(['zq2', 'zq1', 'real2', 'real3', 'zq2']);
    let poles;
    let N;
    if (fam === 'zq2' || fam === 'zq1') {
      const a = rng.pick([-2, -1, 0, 1, 2]); const b = rng.pick([1, 2]);
      if (a === 0 && fam === 'zq2' && b === 1 && rng.chance(0.5)) continue;
      poles = [{ p: cq(0), m: fam === 'zq2' ? 2 : 1 }, { p: cq(a, b), m: 1 }, { p: cq(a, -b), m: 1 }];
      N = P(fam === 'zq1' ? (a * a + b * b) * rng.pick([1, 2]) : rng.pick([1, a * a + b * b]));
    } else if (fam === 'real2') {
      const p = rng.pick([-2, -1, 1, 0]); const r = rng.pick([-3, -2, -1, 0, 1, 2].filter((x) => x !== p));
      poles = [{ p: cq(p), m: 2 }, { p: cq(r), m: 1 }];
      N = P(rng.pick([1, 1, 2]));
    } else {
      const ps = [];
      while (ps.length < 3) { const p = rng.int(-3, 2); if (!ps.includes(p)) ps.push(p); }
      poles = ps.map((p) => ({ p: cq(p), m: 1 }));
      N = rng.chance(0.5) ? P(2) : P(rng.int(-2, 2), 1);
    }
    const parts = pfd(N, poles);
    if (!parts.every((x) => x.c.every((c) => c.re.d <= 8 && c.im.d <= 8 && Math.abs(c.re.n) <= 12 && Math.abs(c.im.n) <= 12))) continue;
    if (parts.some((x) => x.c.every((c) => c.isZero()))) continue;
    const D = denPoly(poles);
    const F = `${deg(N) > 0 ? `(${zpoly(N)})` : zpoly(N)}/(${zpoly(D)})`;
    return { fam, poles, N, D, parts, F, f: inverseText(parts), g0: Math.max(...poles.map((x) => x.p.re.valueOf())), id: `${fam}:${F}` };
  }
  const poles = [{ p: cq(-1), m: 2 }, { p: cq(-2), m: 1 }];
  const parts = pfd(P(1), poles);
  return { fam: 'real2', poles, N: P(1), D: denPoly(poles), parts, F: '1/(z^3+4z^2+5z+2)', f: inverseText(parts), g0: -1, id: 'fallback', fallback: true };
}

const zText = (p) => cText(p);
const polesText = (poles) => poles.map((x) => `z = ${zText(x.p)}`).join(' ou ');
// (z − z₀)^m F(z) e^(zt) as text (the other factors of D).
function stripped(d, x) {
  const others = d.poles.filter((y) => !y.p.eq(x.p));
  const num = deg(d.N) > 0 ? `(${zpoly(d.N)})` : zpoly(d.N) === '1' ? '' : zpoly(d.N);
  return `${num}e^(z t)/(${factorsText(others)})`.replace(/^e/, 'e');
}

function resItem(level, rng, opts) {
  const d = resData(rng);
  const parts = [];
  parts.push({
    start: `${zpoly(d.D)} = 0`, judge: { kind: 'complex', form: 'set' },
    notes: level === 1 ? [`Dénominateur factorisé : ${MT(factorsText(d.poles))}.`] : [],
    lines: [{ math: polesText(d.poles), note: 'Pôles de F', subgoal: 'poles' }],
  });
  const sum = [];
  for (const x of d.poles) {
    const part = d.parts.find((y) => y.p.eq(x.p));
    const value = residueText(part);
    sum.push(value);
    const formula = x.m === 1 ? stripped(d, x) : `d(${stripped(d, x)}, z)`;
    const z0 = zText(x.p);
    parts.push({
      html: `Résidu de F(z)e^(zt) en z = ${rd(z0)} (pôle ${x.m === 1 ? 'simple' : 'double'}) :`, ask: 'Res =', start: `Res(${z0})`,
      judge: lapres({ value, z0 }),
      notes: level === 1 ? [x.m === 1 ? 'Pôle simple : (z − z₀)F(z)e^(zt), pris en z₀.' : 'Pôle double : d/dz[(z − z₀)²F(z)e^(zt)], pris en z₀.'] : [],
      decisions: x.m === 2 ? [{ kind: 'decision', prompt: 'Quelle formule ?', levels: [2, 3], options: [
        { id: 'double', label: 'd/dz[(z − z₀)²F(z)e^(zt)] en z₀', valid: true },
        { id: 'simple', label: 'lim (z − z₀)F(z)e^(zt) quand z → z₀', valid: false, rule: 'c_simple_formula_double', why: `${rd(z0)} est un pôle double : (z − z₀)F(z) tend encore vers l'infini.` },
      ] }] : [],
      lines: [
        { math: formula, note: x.m === 1 ? 'en z = z₀' : 'dériver, puis z = z₀', subgoal: x.m === 1 ? 'res1' : 'res2' },
        { math: value, note: 'Calculer', subgoal: x.m === 1 ? 'res1' : 'res2', blank: value.length < 14 ? [value] : [], blank2: [value] },
      ],
    });
  }
  const conj = d.poles.find((x) => x.p.im.n < 0);
  const traps = {};
  if (conj) {
    const without = d.poles.map((x, i) => (x === conj ? '' : sum[i])).filter(Boolean).join('+').replace(/\+-/g, '-');
    traps.f_lap_conj_pole = [{ line: without, ctx: { zbar: rd(zText(conj.p)) } }];
  }
  parts.push({
    html: 'f(t) est la somme des résidus :', ask: 'f(t) =', start: 'f(t)',
    judge: lap({ dir: 'inverse', f: d.f, F: d.F, traps }),
    decisions: conj ? [{ kind: 'decision', prompt: 'Quels résidus additionner ?', levels: [2, 3], options: [
      { id: 'all', label: 'Ceux de tous les pôles, conjugués compris', valid: true },
      { id: 'upper', label: 'Seulement ceux des pôles de partie imaginaire positive', valid: false, rule: 'f_lap_conj_pole', why: 'Le théorème des résidus compte tous les pôles à gauche de la droite de Bromwich : le conjugué donne le terme conjugué, et f est réelle.' },
    ] }] : [],
    lines: [{ math: `f(t) = ${d.f}`, note: conj ? 'Deux résidus conjugués : 2 Re' : 'La somme', subgoal: 'assemble' }],
  });
  return partsItem({
    skill: SKR, level, prompt: `Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = ${MT(d.F)}.`,
    parts, keys: KEYS,
    hints: H('f(t) est la somme des résidus de F(z)e^(zt) en tous les pôles, y compris les conjugués.',
      `Pôles : ${rd(polesText(d.poles))}. Pôle double : d/dz[(z − z₀)²F(z)e^(zt)] en z₀.`, MT(`f(t) = ${d.f}`)),
    subgoals: [
      { id: 'poles', label: 'pôles', skill: 'c-singularities' },
      { id: 'res1', label: 'résidu en un pôle simple', skill: 'c-res-simple' },
      { id: 'res2', label: 'résidu en un pôle double', skill: 'c-res-multiple' },
      { id: 'assemble', label: 'somme des résidus', skill: SKR },
    ],
    key: `${SKR}:${level}:${d.id}`, exam: examTag(opts, 5), fallback: d.fallback, noHints: level >= 5 || !!opts.exam,
  });
}

function resMcq(rng, opts) {
  const d = resData(rng);
  const conj = d.poles.find((x) => x.p.im.n < 0);
  const x = d.poles.find((y) => y.m === 2) || d.poles[0];
  const part = d.parts.find((y) => y.p.eq(x.p));
  const sum = d.poles.map((y) => residueText(d.parts.find((z) => z.p.eq(y.p))));
  const without = conj ? d.poles.map((y, i) => (y === conj ? '' : sum[i])).filter(Boolean).join('+').replace(/\+-/g, '-') : null;
  const lo = Math.min(...d.poles.map((y) => y.p.re.valueOf()));
  return mcqMulti({
    skill: SKR, level: 4, key: `mcq:${d.id}`, exam: examTag(opts),
    prompt: `Soit F(z) = ${MT(d.F)} et f = ℒ⁻¹(F). Coche les affirmations justes.`,
    options: [
      opt(MT(`f(t) = ${d.f}`), true),
      opt(`Le résidu de F(z)e^(zt) en z = ${rd(zText(x.p))} vaut ${MT(residueText(part))}.`, true),
      ...(without ? [opt(MT(`f(t) = ${without}`), false, 'f_lap_conj_pole')] : [opt(MT(`f(t) = ${sum.slice(1).join('+').replace(/\+-/g, '-')}`), false)]),
      opt(`L'abscisse de convergence de f est ${rd(d.g0)}.`, true),
      ...(lo !== d.g0 ? [opt(`L'abscisse de convergence de f est ${rd(lo)}.`, false, 'f_lap_abscissa')] : [opt(`L'abscisse de convergence de f est ${rd(d.g0 + 1)}.`, false, 'f_lap_abscissa')]),
    ],
    solution: [{ html: `Pôles : ${rd(polesText(d.poles))} ; ${MT(`f(t) = ${d.f}`)}.`, note: '' }],
    expectedSec: 240,
  }, rng);
}

export function genInvRes(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return resMcq(rng, opts);
  if (opts.exam === 'open') return asProblem(resItem(4, rng, opts), 5);
  return resItem(level, rng, opts);
}
