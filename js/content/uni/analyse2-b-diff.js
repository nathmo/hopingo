// Generators of module A2, part b (step U6): directional derivatives by the
// definition (a2-dir-deriv-def), differentiability by the definition
// (a2-diff-def, whose level 5 is the catalogue's problem E6, 9 points), and
// the implications between C¹, differentiable and partial derivatives
// (a2-diff-implications, counter-examples K1 … K7 checked by knownFn).
//
// D_v f(0, 0): the quotient (f(tv) − 0)/t simplified by `equiv` in t
// (cfg.dirDeriv names a2_dirderiv_power), then its limit by `limit`.
// Differentiability: the partial derivatives by `limit` in h and k, the
// remainder R by `equiv` in (x, y), R/‖(x, y)‖ in polar coordinates by `equiv`
// in (r, φ) (cfg.ratio names a2_diff_no_norm), then `bound` (R/‖(x, y)‖ → 0) or
// a decision and the value of R/‖(x, y)‖ at an angle (`value`).

import {
  q, QS, qsAdd, M, RD, linesItem, mcq, tfItem, examTag, H, E, modeOf, blanked, assemble, problemItem, blocksItem,
  coefText, joinSum, polyXY, polyTrig, absSum, polyAt, subst, toPolar, NOTE, DEC, fq, distinct, A2_KEYS, PV,
  UNIT_VECTORS, E1, E2,
} from './analyse2-b-kit.js';
import { K_LIBRARY } from '../../judges/a2-examples.js';

const DD = 'a2-dir-deriv-def';
const DF = 'a2-diff-def';
const IM = 'a2-diff-implications';
const KEYS = A2_KEYS;
const pw = (b, k) => (k === 0 ? '' : k === 1 ? b : `${b}^${k}`);
const wrap = (t) => (/.[+-]/.test(t.replace(/\([^()]*\)/g, '')) ? `(${t})` : t);
// A number q·√s as a factor of a letter: (3/5)t, (√3/2)t, t, −t.
const vt = (x, letter) => (x.isZero() ? '0' : x.eq(1) ? letter : x.eq(-1) ? `-${letter}` : `(${x.text()})${letter}`);
const qsText = (x) => x.text();

// ======================================================================
// a2-dir-deriv-def
// ======================================================================

const DD_SUB = [
  { id: 'definition', label: 'définition', skill: DD },
  { id: 'substitute', label: 'remplacer par t·v', skill: 'rat-simplify' },
  { id: 'simplify', label: 'simplifier', skill: 'rat-simplify' },
  { id: 'limit', label: 'limite en t', skill: 'a1-fn-limits' },
];
const DD_CHOICES = [
  { id: 'subst', label: 'Remplacer (x, y) par t·v et diviser par t' },
  { id: 'simplify', label: 'Simplifier par la puissance de t' },
  { id: 'limit', label: 'Faire tendre t vers 0' },
  { id: 'grad', label: 'Calculer ∇f(0, 0)·v', rule: 'a2_dirderiv_gradient', why: 'La formule ∇f·v demande que f soit différentiable. Ici, on ne le sait pas encore.' },
];

// The function and its quotient f(tv)/t: hom (K·xⁱyʲ/(x² + y²), i + j = 3),
// k2 (K·x²y/(x⁴ + c·y²)), k3 (K·xy⁴/(x⁴ + c·y⁸)), abs (K·|x|³y/(x² + y²)).
export function ddData(rng, kinds, { axes = true, mcqSafe = false } = {}) {
  for (let n = 0; n < 200; n++) {
    const kind = rng.pick(kinds);
    const K = rng.pick([1, 2, 3, -1, -2, 5]);
    const c = rng.pick([1, 2, 3]);
    const u = axes && kind === 'hom' && rng.chance(0.2) ? rng.pick([E1, E2]) : rng.pick(kind === 'k3' ? UNIT_VECTORS.slice(4) : UNIT_VECTORS);
    const [v1, v2] = u.v;
    const KQ = QS.of(K);
    let d;
    if (kind === 'hom') {
      const i = rng.int(0, 3);
      const j = 3 - i;
      const f = `${coefText(K, `${pw('x', i)}${pw('y', j)}`)}/(x^2+y^2)`;
      const value = KQ.mul(v1.pow(i)).mul(v2.pow(j));
      const grad = (i === 3 ? KQ.mul(v1) : QS.of(0));
      const g2 = (j === 3 ? KQ.mul(v2) : QS.of(0));
      d = { kind, f, value, grad: qsAdd(grad, g2), simp: value.text(), mid: `(${value.fac()}t)/t`, constant: true };
    } else if (kind === 'k2') {
      if (v2.isZero() || v1.isZero()) continue;
      const A = KQ.mul(v1.pow(2)).mul(v2);
      const B = v1.pow(4);
      const C = v2.pow(2).mul(c);
      if (!B.isRational() || !C.isRational()) continue;
      const f = `${coefText(K, 'x^2y')}/(x^4+${coefText(c, 'y^2')})`;
      const simp = `(${A.text()})/(${coefText(B.q, 't^2')}+${C.text()})`;
      d = { kind, f, value: A.div(C), grad: QS.of(0), simp, mid: `((${A.text()})t/(${coefText(B.q, 't^2')}+${C.text()}))/t`, A, B, C };
    } else if (kind === 'k3') {
      if (v1.isZero() || v2.isZero()) continue;
      const A = KQ.mul(v1).mul(v2.pow(4));
      const B = v1.pow(4);
      const C = v2.pow(8).mul(c);
      if (!B.isRational() || !C.isRational()) continue;
      const f = `${coefText(K, 'xy^4')}/(x^4+${coefText(c, 'y^8')})`;
      const simp = `(${A.text()})/(${B.text()}+${coefText(C.q, 't^4')})`;
      d = { kind, f, value: A.div(B), grad: QS.of(0), simp, mid: `((${A.text()})t/(${B.text()}+${coefText(C.q, 't^4')}))/t`, A, B, C };
    } else {
      if (v1.isZero() || v2.isZero()) continue;
      const A = KQ.mul(v1.abs().pow(3)).mul(v2);
      const f = `${K === 1 ? '' : K === -1 ? '-' : `${K}×`}abs(x)^3×y/(x^2+y^2)`;
      d = { kind, f, value: QS.of(0), grad: QS.of(0), simp: `(${A.text()})×abs(t)`, mid: `((${A.text()})t×abs(t))/t`, A };
    }
    if (!d.grad) continue;
    if (d.value.text().length > 9) continue;
    if (mcqSafe && d.value.eq(d.grad)) continue;
    d.u = u;
    d.ftv = subst(d.f, { x: vt(v1, 't'), y: vt(v2, 't') });
    d.raw = `(${d.ftv}-0)/t`;
    return d;
  }
  const u = UNIT_VECTORS[4];
  return {
    kind: 'k3', f: 'xy^4/(x^4+y^8)', value: new QS(q(9, 2)), grad: QS.of(0), u, fallback: true,
    simp: '(9/32)/(1/16+(81/256)t^4)', mid: '((9/32)t/(1/16+(81/256)t^4))/t',
    ftv: subst('xy^4/(x^4+y^8)', { x: '(1/2)t', y: '(√3/2)t' }), raw: `(${subst('xy^4/(x^4+y^8)', { x: '(1/2)t', y: '(√3/2)t' })}-0)/t`,
  };
}

const tCfg = (goal, more = {}) => ({ kind: 'equiv', vars: ['t'], domain: { t: [-2, 2] }, target: 'short', goal, slack: 2, dirDeriv: true, ...more });
const tLim = { kind: 'limit', v: 't', to: '0', dirDeriv: true };
const vText = (u) => u.text;

function ddParts(d, level, rng) {
  const g = level <= 2;
  const o = { vars: ['t'] };
  const pre = [];
  if (level === 3) {
    pre.push(DEC('Comment calculer D_v f(0, 0) ?', [
      { id: 'def', label: 'Par la définition : limite de (f(tv) − f(0, 0))/t', valid: true, ref: true },
      { id: 'grad', label: 'Par la formule ∇f(0, 0)·v', valid: false, rule: 'a2_dirderiv_gradient', why: 'La formule demande que f soit différentiable. Ici, on ne le sait pas encore.' },
    ], rng));
  }
  pre.push(NOTE(`f(tv) = f(${vt(d.u.v[0], 't').replace(/-/g, '−')} ; ${vt(d.u.v[1], 't').replace(/-/g, '−')}), et f(0, 0) = 0 :`));
  const lines = [E(d.mid, 'Simplifier f(tv)', 'substitute', 'subst'), E(d.simp, 'Simplifier par t', 'simplify', 'simplify')];
  if (g && d.A) lines[0] = blanked(lines[0], [d.A.text()], o);
  if (g && d.constant) lines[1] = blanked(lines[1], [d.simp], o);
  if (level === 2 && d.C) lines[1] = blanked(lines[1], [d.kind === 'k2' ? d.C.text() : d.B.text()], o);
  const parts = [{ start: d.raw, judge: tCfg(d.simp), lines, choices: DD_CHOICES, pre }];
  if (!d.constant) {
    const pre2 = level === 2 && d.kind !== 'abs' ? [DEC('Quelle est la limite quand t → 0 ?', [
      { id: 'right', label: `${fq(d.value)} : le terme en t du dénominateur disparaît`, valid: true, ref: true },
      { id: 'zero', label: '0, car t → 0', valid: false, why: 'Le numérateur ne contient plus t : il reste une constante.' },
      { id: 'inf', label: 'La limite n\'existe pas : le dénominateur s\'annule', valid: false, why: 'Le dénominateur tend vers une constante non nulle.' },
    ], rng)] : [];
    let line = E(d.value.text(), d.kind === 'abs' ? '|t| → 0' : 'Remplacer t par 0', 'limit', 'limit');
    if (g) line = blanked(line, [d.value.text()]);
    parts.push({ html: `Quand t → 0 : ${M(`lim(${d.simp},t,0)`)}`, ask: 'Dᵥf(0, 0) =', start: d.simp, judge: tLim, lines: [line], choices: DD_CHOICES, pre: pre2 });
  }
  return parts;
}

function ddLines(level, rng, opts) {
  const kinds = level === 1 ? ['hom', 'k2'] : level === 2 ? ['k2', 'k3', 'k2'] : level === 3 ? ['hom', 'k2', 'k3'] : ['hom', 'k2', 'k3', 'abs'];
  const d = ddData(rng, kinds);
  const as = assemble(ddParts(d, level, rng), level);
  return linesItem({
    skill: DD, level,
    prompt: `Soit f(x, y) = ${M(d.f)} si (x, y) ≠ (0, 0), et f(0, 0) = 0. Calcule D<sub>v</sub>f(0, 0) par la définition, pour v = ${vText(d.u)}.`,
    ...as, mode: modeOf(level),
    hints: H('Applique la définition : remplace (x, y) par t·v, retranche f(0, 0) = 0 et divise par t.', `f(tv)/t = ${M(d.simp)}`, `D<sub>v</sub>f(0, 0) = ${M(d.value.text())}`),
    subgoals: DD_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null, declares: { vars: ['x', 'y', 't'] },
    key: `${DD}:${level}:${d.f}:${d.u.text}`, exam: false, fallback: !!d.fallback, expectedSec: [0, 120, 150, 180, 200][level],
  });
}

// QCM (level 5 and exam): the value, or the regimes of |x|^β·y/(x² + y²).
function ddMcq(level, rng, opts = {}) {
  if (rng.chance(0.2)) {
    const [p, s] = rng.pick([[1, 2], [2, 3], [3, 4]]);
    const options = [
      { html: 'si et seulement si β ≥ 2', correct: true },
      { html: 'si et seulement si β > 2', correct: false },
      { html: 'pour tout β > 0', correct: false, rule: 'a2_dirderiv_gradient' },
      { html: 'si et seulement si β ≤ 2', correct: false },
    ];
    return mcq({
      skill: DD, level, prompt: `Soit f(x, y) = |x|<sup>β</sup>·${p === 1 ? '' : p}y/(x² + ${s === 1 ? '' : s}y²) si (x, y) ≠ (0, 0), f(0, 0) = 0, avec β > 0. La dérivée directionnelle D<sub>v</sub>f(0, 0) existe pour tout v :`,
      options, keepOrder: true, key: `mcq:beta:${p}:${s}`, exam: examTag(opts), expectedSec: 240,
      solution: [{ html: 'f(tv)/t = |t|<sup>β−2</sup>·|v₁|<sup>β</sup>·(…) : la limite existe si β ≥ 2 (constante pour β = 2, 0 pour β > 2), elle est infinie si β < 2 et v₁v₂ ≠ 0. ∇f(0, 0) = 0 pour tout β : la formule ∇f·v ne dit rien.', note: '' }],
    }, rng);
  }
  const d = ddData(rng, ['hom', 'k2', 'k3', 'k2'], { axes: false, mcqSafe: true });
  const options = distinct([
    { html: M(d.value.text()), correct: true },
    { html: M(d.grad.text()), correct: false, rule: 'a2_dirderiv_gradient' },
    { html: 'n\'existe pas', correct: false, rule: 'a2_dirderiv_power' },
    { html: M(d.value.neg().text()), correct: false },
    { html: M(d.value.mul(2).text()), correct: false },
  ]);
  return mcq({
    skill: DD, level, prompt: `Soit f(x, y) = ${M(d.f)} si (x, y) ≠ (0, 0), et f(0, 0) = 0. Pour v = ${vText(d.u)}, D<sub>v</sub>f(0, 0) =`,
    options, key: `mcq:${d.f}:${d.u.text}`, exam: examTag(opts), expectedSec: 240, fallback: !!d.fallback,
    solution: [{ html: `f(tv)/t = ${M(d.simp)} → ${M(d.value.text())}. Attention : ∇f(0, 0)·v = ${M(d.grad.text())}, qui ne convient pas (f n'est pas différentiable en (0, 0)).`, note: '' }],
  }, rng);
}

function ddTf(rng, opts) {
  const kind = rng.pick(['grad', 'grad', 'norm', 'e1', 'scale', 'minus', 'diff']);
  const ex = examTag(opts) || { format: 'tf', points: 1 };
  if (kind === 'grad') {
    // ∇f(a)·v ≠ D_v f(a): f is not differentiable at a (2021 Q21).
    for (;;) {
      const a = rng.int(-3, 3);
      const b = rng.int(-3, 3);
      const c = rng.pick([1, 2, -1, 3]);
      if (a + b === 0) continue;
      const dot = new QS(q(a + b, 2), 2);
      return tfItem({
        skill: DD, level: 4, truth: true, key: `grad:${a}:${b}:${c}`, exam: ex, ruleIfFalse: 'a2_dirderiv_gradient',
        statement: `Si ∇f(1, 0) = (${fq(a)} ; ${fq(b)}) et D<sub>v</sub>f(1, 0) = ${fq(c)} pour v = (1/√2 ; 1/√2), alors f n'est pas différentiable en (1, 0).`,
        explanation: `Vrai : si f était différentiable, D<sub>v</sub>f(1, 0) vaudrait ∇f·v = ${fq(dot)} ≠ ${fq(c)}.`,
      });
    }
  }
  const ask = [{ v: 'f', label: 'f(x, y) =', keys: ['calcx', 'calcfn', 'a2'] }];
  if (kind === 'norm') {
    return tfItem({
      skill: DD, level: 4, truth: false, key: 'norm', exam: ex,
      statement: 'Si f est de classe C¹, la dérivée directionnelle de f en (0, 0) suivant v = (1 ; 1)/√2 vaut lim<sub>(h, k)→(0, 0)</sub> (f(h, k) − f(0, 0))/√(h² + k²).',
      counter: { kind: 'a2', prop: 'normQuotient', params: {}, ask, answer: { f: 'x' } },
      explanation: 'Faux (2016 Q14) : pour f(x, y) = x, ce quotient vaut h/√(h² + k²), qui n\'a pas de limite (1 sur k = 0, 0 sur h = 0). La définition est lim (f(tv) − f(0, 0))/t, sur la droite de direction v.',
    });
  }
  if (kind === 'e1') {
    return tfItem({
      skill: DD, level: 4, truth: true, key: 'e1', exam: ex,
      statement: 'Si ∂f/∂x(a) existe, alors D<sub>v</sub>f(a) existe pour v = (1 ; 0) et vaut ∂f/∂x(a).',
      explanation: 'Vrai : avec v = e₁, (f(a + te₁) − f(a))/t est le taux d\'accroissement de la dérivée partielle en x.',
    });
  }
  if (kind === 'scale') {
    return tfItem({
      skill: DD, level: 4, truth: true, key: 'scale', exam: ex, ruleIfFalse: 'a2_dirderiv_power',
      statement: 'Si D<sub>v</sub>f(a) existe, alors D<sub>2v</sub>f(a) existe et vaut 2·D<sub>v</sub>f(a).',
      explanation: 'Vrai : (f(a + t·2v) − f(a))/t = 2·(f(a + sv) − f(a))/s avec s = 2t → 0.',
    });
  }
  if (kind === 'minus') {
    return tfItem({
      skill: DD, level: 4, truth: false, key: 'minus', exam: ex,
      statement: 'Si D<sub>v</sub>f(0, 0) existe pour v = (1 ; 0), alors D<sub>−v</sub>f(0, 0) = D<sub>v</sub>f(0, 0).',
      counter: { kind: 'a2', prop: 'negDir', params: {}, ask, answer: { f: 'x' } },
      explanation: 'Faux : pour f(x, y) = x, D<sub>v</sub>f(0, 0) = 1 et D<sub>−v</sub>f(0, 0) = −1. En général, D<sub>−v</sub>f(a) = −D<sub>v</sub>f(a).',
    });
  }
  return tfItem({
    skill: DD, level: 4, truth: true, key: 'diff', exam: ex, ruleIfFalse: 'a2_dirderiv_gradient',
    statement: 'Si f est différentiable en a, alors D<sub>v</sub>f(a) = ∇f(a)·v pour tout v.',
    explanation: 'Vrai : c\'est la formule de la dérivée directionnelle d\'une fonction différentiable.',
  });
}

function ddItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return ddTf(rng, opts);
  if (opts.exam === 'mcq' || level === 5) return ddMcq(opts.exam ? 4 : 5, rng, opts);
  return ddLines(level, rng, opts);
}

// ======================================================================
// a2-diff-def
// ======================================================================

const DF_SUB = [
  { id: 'partials', label: 'dérivées partielles', skill: DD },
  { id: 'remainder', label: 'reste', skill: DF },
  { id: 'ratio', label: 'reste divisé par ‖h‖', skill: DF },
  { id: 'polar', label: 'polaires', skill: 'a2-lim-polar' },
  { id: 'conclude', label: 'conclure', skill: DF },
];
const DF_CHOICES = [
  { id: 'limit', label: 'Faire tendre h vers 0' },
  { id: 'remainder', label: 'Retrancher f(0, 0) et ∇f(0, 0)·(x, y)' },
  { id: 'polar', label: 'Passer en polaires et diviser par r' },
  { id: 'bound', label: 'Majorer en r' },
  { id: 'angle', label: 'Fixer un angle φ' },
];

// The classes of the catalogue: nd (homogeneous of degree 1, partial
// derivatives but not differentiable), dpoly (P₄/(x² + y²) + linear part:
// differentiable, C¹), k3 (c(x² + y²)·sin(1/√(x² + y²)) + linear part:
// differentiable, not C¹).
export function dfData(rng, kind) {
  for (let n = 0; n < 200; n++) {
    const C = () => rng.pick([-3, -2, -1, 1, 2, 3]);
    if (kind === 'nd') {
      const P = [[0, 3, 0], [0, 2, 1], [0, 1, 2], [0, 0, 3]];
      const idx = rng.shuffle([0, 1, 2, 3]).slice(0, rng.pick([2, 2, 3]));
      for (const i of idx) P[i][0] = C();
      const [p30, p21, p12, p03] = P.map((t) => t[0]);
      const al = p21 - p03;
      const be = p12 - p30;
      if (al + be === 0 || (p30 === 0 && p03 === 0)) continue;
      const terms = P.filter((t) => t[0] !== 0);
      const f = `${wrap(polyXY(terms))}/(x^2+y^2)`;
      // R = (α·h²k + β·hk²)/(h² + k²), factored hk(αh + βk) when α, β ≠ 0.
      const both = al !== 0 && be !== 0;
      const neg = both && al < 0 && be < 0;
      const sg = neg ? -1 : 1;
      const lin = polyXY([[sg * al, 1, 0], [sg * be, 0, 1]]);
      const Rs = both ? `${neg ? '-' : ''}xy(${lin})/(x^2+y^2)` : `${polyXY([[al, 2, 1], [be, 1, 2]].filter((t) => t[0]))}/(x^2+y^2)`;
      const linT = polyXY([[sg * al, 1, 0], [sg * be, 0, 1]], 'cos(φ)', 'sin(φ)');
      const ratio = both ? `${neg ? '-' : ''}cos(φ)sin(φ)(${linT})` : polyTrig([[al, 2, 1], [be, 1, 2]].filter((t) => t[0]));
      const at = new QS(q(al + be, 4), 2);
      return {
        kind, f, P: terms, px: q(p30), py: q(p03), fx0: p30 ? `${coefText(p30, 't^3')}/t^2` : '0', fy0: p03 ? `${coefText(p03, 't^3')}/t^2` : '0',
        grad: polyXY([[p30, 1, 0], [p03, 0, 1]].filter((t) => t[0])),
        Rraw: `${wrap(polyXY(terms))}/(x^2+y^2)-(${polyXY([[p30, 1, 0], [p03, 0, 1]].filter((t) => t[0]))})`,
        Rmid: `(${polyXY(terms)}-(${polyXY([[p30, 1, 0], [p03, 0, 1]].filter((t) => t[0]))})(x^2+y^2))/(x^2+y^2)`,
        R: Rs, ratio, at, atText: `${ratio.replace(/φ/g, '(π/4)').replace(/\(\(π\/4\)\)/g, '(π/4)')}`, diff: false, c1: false,
      };
    }
    // A linear part a·x + b·y (not both 0).
    const a = rng.int(-3, 3);
    const b = rng.int(-3, 3);
    if (a === 0 && b === 0) continue;
    const linXY = polyXY([[a, 1, 0], [b, 0, 1]].filter((t) => t[0]));
    if (kind === 'dpoly') {
      const j = rng.int(0, 4);
      const c = C();
      const P4 = [[c, 4 - j, j]];
      const g = `${coefText(c, `${pw('x', 4 - j)}${pw('y', j)}`)}/(x^2+y^2)`;
      const f = `${linXY}+${g}`.replace('+-', '-');
      const Rq = g;
      const fx0 = joinSum([a ? coefText(a, 't') : '', j === 0 ? `${coefText(c, 't^4')}/t^2` : '']);
      const fy0 = joinSum([b ? coefText(b, 't') : '', j === 4 ? `${coefText(c, 't^4')}/t^2` : '']);
      return {
        kind, f, px: q(a), py: q(b), fx0, fy0, grad: linXY,
        Rraw: `${f}-(${linXY})`, Rmid: null, R: Rq,
        ratio: coefText(c, `r${pw('cos(φ)', 4 - j)}${pw('sin(φ)', j)}`), M: Math.abs(c), diff: true, c1: true,
      };
    }
    const c = C();
    const g = `${coefText(c, '(x^2+y^2)')}sin(1/√(x^2+y^2))`;
    const f = `${linXY}+${g}`.replace('+-', '-');
    const sq = (v) => `${coefText(c, `${v}^2`)}sin(1/√(${v}^2))`;
    return {
      kind, f, px: q(a), py: q(b), fx0: `${a ? `${coefText(a, 't')}+` : ''}${sq('t')}`.replace('+-', '-'), fy0: `${b ? `${coefText(b, 't')}+` : ''}${sq('t')}`.replace('+-', '-'), grad: linXY,
      Rraw: `${f}-(${linXY})`, Rmid: null, R: g,
      ratio: `${coefText(c, 'r')}sin(1/r)`, M: Math.abs(c), diff: true, c1: false,
    };
  }
  return {
    kind: 'nd', f: 'xy^2/(x^2+y^2)', P: [[1, 1, 2]], px: q(0), py: q(0), fx0: '0', fy0: '0', grad: '0', fallback: true,
    Rraw: 'xy^2/(x^2+y^2)-0', Rmid: null, R: 'xy^2/(x^2+y^2)', ratio: 'cos(φ)sin(φ)^2', at: new QS(q(1, 4), 2), atText: 'cos(π/4)sin(π/4)^2', diff: false, c1: false,
  };
}

const LH = (v) => ({ kind: 'limit', v, to: '0' });
const hkCfg = (goal) => ({ kind: 'equiv', vars: ['x', 'y'], domain: { x: [-2, 2], y: [-2, 2] }, target: 'short', goal, slack: 2 });
const ratioCfg = (goal) => ({ kind: 'equiv', vars: PV, domain: { r: [0.2, 1.5], φ: [0, 6.28] }, target: 'short', goal, slack: 2, ratio: 'polar' });

function dfParts(d, level, rng) {
  const g = level <= 2;
  const parts = [];
  const partials = [
    { html: '∂f/∂x(0, 0) = lim<sub>t→0</sub> (f(t, 0) − f(0, 0))/t :', ask: '∂f/∂x(0, 0) =', start: `(${d.fx0}-0)/t`, judge: LH('t'), lines: [E(d.px.toString(), 'Simplifier, puis t → 0', 'partials', 'limit')], choices: DF_CHOICES },
    { html: '∂f/∂y(0, 0) = lim<sub>t→0</sub> (f(0, t) − f(0, 0))/t :', ask: '∂f/∂y(0, 0) =', start: `(${d.fy0}-0)/t`, judge: LH('t'), lines: [E(d.py.toString(), 'Simplifier, puis t → 0', 'partials', 'limit')], choices: DF_CHOICES },
  ];
  const gradNote = `∂f/∂x(0, 0) = ${fq(d.px)} et ∂f/∂y(0, 0) = ${fq(d.py)}.`;
  const Rlines = [...(d.Rmid ? [E(d.Rmid, 'Même dénominateur', 'remainder', 'remainder')] : []), E(d.R, 'Simplifier', 'remainder', 'remainder')];
  if (g) Rlines[Rlines.length - 1] = blanked(Rlines[Rlines.length - 1], [d.kind === 'dpoly' ? d.R.split('/')[0] : 'x^2+y^2'], { vars: ['x', 'y'] });
  const Rpart = { html: `Reste : R(x, y) = f(x, y) − f(0, 0) − ∇f(0, 0)·(x, y) = f(x, y) − (${RD(d.grad)}) :`, ask: 'R(x, y) =', start: d.Rraw, judge: hkCfg(d.R), lines: Rlines, choices: DF_CHOICES };
  const ratioRaw = `(${toPolar(d.R)})/r`;
  const ratioPart = { html: 'En polaires (x = r cos φ, y = r sin φ, ‖(x, y)‖ = r) : R/‖(x, y)‖ =', ask: 'R/r =', start: ratioRaw, judge: ratioCfg(d.ratio), lines: [E(d.ratio, 'Simplifier par r', 'polar', 'polar')], choices: DF_CHOICES };
  if (g) ratioPart.lines[0] = blanked(ratioPart.lines[0], [d.kind === 'nd' ? 'cos(φ)sin(φ)' : 'r'], { vars: PV });
  // The conclusion.
  const C1 = d.c1
    ? { id: 'c1', label: 'Critère C¹ : les dérivées partielles sont continues en (0, 0)', valid: true, quality: 'poor', why: 'Juste ici, mais il faudrait le montrer ; la majoration de R/‖(x, y)‖ est plus directe.' }
    : { id: 'c1', label: 'Critère C¹ : les dérivées partielles sont continues en (0, 0)', valid: false, why: d.diff ? '∂f/∂x oscille près de (0, 0) : f n\'est pas C¹. Il faut la définition.' : 'Les dérivées partielles ne sont pas continues en (0, 0) : ce critère ne s\'applique pas.' };
  const concl = level === 3 ? [DEC('Pour conclure ?', [
    d.diff ? { id: 'bound', label: 'Majorer |R/‖(x, y)‖| par une fonction de r qui tend vers 0', valid: true, ref: true } : { id: 'bound', label: 'Majorer |R/‖(x, y)‖| par une fonction de r qui tend vers 0', valid: false, why: 'R/‖(x, y)‖ ne contient pas r : aucune borne en r ne tend vers 0.' },
    d.diff ? { id: 'angle', label: 'Fixer un angle φ', valid: false, why: 'Un angle fixé ne prouve pas qu\'une limite vaut 0.' } : { id: 'angle', label: 'Fixer un angle φ : R/‖(x, y)‖ y vaut une constante non nulle', valid: true, ref: true },
    C1,
  ], rng)] : [];
  let last;
  if (d.diff) {
    last = { html: 'Majoration de |R/‖(x, y)‖| sans φ (si elle tend vers 0, f est différentiable en (0, 0)) :', ask: '≤', start: d.ratio, judge: { kind: 'bound', vars: PV }, lines: [E(coefText(d.M, 'r'), '|cos φ|, |sin φ| ≤ 1', 'conclude', 'bound')], choices: DF_CHOICES, pre: concl };
  } else {
    const dec = level === 1 ? [NOTE('R/‖(x, y)‖ ne dépend que de φ : sa limite n\'est pas 0. f n\'est pas différentiable en (0, 0).')] : level === 3 ? concl : [DEC('R/‖(x, y)‖ ne dépend que de φ. Conclusion ?', [
      { id: 'no', label: 'Sa limite n\'est pas 0 : f n\'est pas différentiable en (0, 0)', valid: true, ref: true },
      { id: 'yes', label: 'Les dérivées partielles existent : f est différentiable en (0, 0)', valid: false, rule: 'a2_partials_imply_diff', why: 'Les dérivées partielles ne regardent que deux directions ; ici R/‖(x, y)‖ ne tend pas vers 0.' },
      { id: 'bounded', label: 'R/‖(x, y)‖ est bornée : f est différentiable', valid: false, why: 'Bornée ne suffit pas : il faut R/‖(x, y)‖ → 0.' },
    ], rng)];
    last = { html: 'Valeur de R/‖(x, y)‖ pour φ = π/4 :', ask: '=', start: d.atText, judge: { kind: 'value', expect: d.at.text(), form: 'exact' }, lines: [E(d.at.text(), 'cos(π/4) = sin(π/4) = √2/2', 'conclude', 'angle')], choices: DF_CHOICES, pre: dec };
  }
  if (level === 1) {
    parts.push({ ...Rpart, pre: [NOTE(gradNote), NOTE(Rpart.html)] }, ratioPart, last);
  } else if (level === 2) {
    parts.push({ ...partials[0], pre: [NOTE(partials[0].html)] }, partials[1], Rpart, { ...last, pre: [NOTE(`En polaires, R/‖(x, y)‖ = ${M(d.ratio)}.`), ...(last.pre || [])] });
  } else {
    parts.push({ ...partials[0], pre: [NOTE(partials[0].html)] }, partials[1], Rpart, ratioPart, last);
  }
  return parts;
}

function dfLines(level, rng, opts) {
  const kind = rng.pick(level <= 2 ? ['nd', 'nd', 'dpoly', 'k3'] : ['nd', 'dpoly', 'k3']);
  const d = dfData(rng, kind);
  const as = assemble(dfParts(d, level, rng), level);
  return linesItem({
    skill: DF, level,
    prompt: `Soit f(x, y) = ${M(d.f)} si (x, y) ≠ (0, 0), et f(0, 0) = 0. f est-elle différentiable en (0, 0) ?`,
    ...as, mode: modeOf(level),
    hints: H('Calcule les dérivées partielles par la définition, puis le reste R, puis R/‖(x, y)‖ en polaires.', `R(x, y) = ${M(d.R)}`, d.diff ? `|R/‖(x, y)‖| ≤ ${M(coefText(d.M, 'r'))} → 0 : f est différentiable.` : `R/‖(x, y)‖ = ${M(d.ratio)} vaut ${M(d.at.text())} pour φ = π/4 : f n'est pas différentiable.`),
    subgoals: DF_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null, declares: { vars: ['x', 'y', 't', 'r', 'φ'] },
    key: `${DF}:${level}:${d.f}`, exam: false, fallback: !!d.fallback, expectedSec: [0, 200, 300, 360, 420][level],
  });
}

// ---------- the four phrases (2018 Q7, 2020 Q14, 2021 Q14) ----------

const PH = {
  noCont: 'f n\'est pas continue en (0, 0)',
  partials: 'f est continue et a des dérivées partielles en (0, 0), mais n\'y est pas différentiable',
  diffNotC1: 'f est différentiable en (0, 0), mais n\'est pas de classe C¹',
  c1: 'f est de classe C¹ au voisinage de (0, 0)',
};
export function classMcq(skill, level, rng, opts = {}) {
  const kind = rng.pick(['nd', 'nd', 'dpoly', 'k3', 'k1']);
  let f;
  let right;
  let rules;
  let why;
  if (kind === 'k1') {
    const K = rng.pick(['K1', 'K2']);
    f = K_LIBRARY[K];
    right = 'noCont';
    rules = { partials: 'a2_partials_imply_cont', diffNotC1: 'a2_partials_imply_diff', c1: null };
    why = K === 'K1' ? 'Sur y = x, f vaut 1/2 : pas de limite 0, donc pas continue (les dérivées partielles existent pourtant).' : 'Sur y = x², f vaut 1/2 : pas continue (les dérivées directionnelles existent pourtant).';
  } else {
    const d = dfData(rng, kind);
    f = d.f;
    if (kind === 'nd') { right = 'partials'; rules = { noCont: 'a2_lim_polar_r_forgot', diffNotC1: 'a2_partials_imply_diff', c1: 'a2_dirderiv_gradient' }; why = `|f| ≤ ${absSum(d.P)}r → 0 : continue ; mais R/‖(x, y)‖ = ${M(d.ratio)} dépend de φ : pas différentiable.`; } else if (kind === 'dpoly') { right = 'c1'; rules = { noCont: null, partials: 'a2_diff_no_norm', diffNotC1: null }; why = 'f est une fraction rationnelle homogène de degré 2 plus une partie linéaire : ses dérivées partielles sont continues, même en (0, 0) (|∂f/∂x − ∂f/∂x(0, 0)| ≤ C·r).'; } else { right = 'diffNotC1'; rules = { noCont: null, partials: null, c1: 'a2_diff_imply_c1' }; why = `|R/‖(x, y)‖| ≤ ${d.M}r → 0 : différentiable ; mais ∂f/∂x contient cos(1/r), qui oscille : pas C¹.`; }
  }
  const options = Object.entries(PH).map(([k, html]) => ({ html, correct: k === right, rule: k === right ? null : rules[k] ?? null }));
  return mcq({
    skill, level, prompt: `Soit f(x, y) = ${M(f)} si (x, y) ≠ (0, 0), et f(0, 0) = 0. Alors :`, options, keepOrder: true,
    key: `class:${kind}:${f}`, exam: examTag(opts), expectedSec: 240, solution: [{ html: why, note: '' }],
  }, rng);
}

// ---------- level 5: the problem E6 (9 points) ----------

const E6_VECTORS = [UNIT_VECTORS[6], UNIT_VECTORS[0], UNIT_VECTORS[3]];
function e6Data(rng) {
  for (let n = 0; n < 200; n++) {
    const d = dfData(rng, 'nd');
    if (d.fallback) break;
    const u = rng.pick(E6_VECTORS);
    const val = polyAt(d.P, u.v);
    const grad = qsAdd(QS.of(d.px).mul(u.v[0]), QS.of(d.py).mul(u.v[1]));
    if (!val || !grad || val.eq(grad) || val.text().length > 8) continue;
    return { ...d, u, val, gradV: grad };
  }
  const u = UNIT_VECTORS[6];
  return {
    kind: 'nd', f: 'x^2y/(x^2+y^2)', P: [[1, 2, 1]], px: q(0), py: q(0), fx0: '0', fy0: '0', u, val: new QS(q(1, 4), 2), gradV: QS.of(0), fallback: true,
  };
}

function e6Problem(level, rng) {
  const d = e6Data(rng);
  const polar = polyTrig(d.P);
  const simp = d.P.length === 1 ? coefText(d.P[0][0], `r${pw('cos(φ)', d.P[0][1])}${pw('sin(φ)', d.P[0][2])}`) : `r(${polar})`;
  const M3 = absSum(d.P);
  const common = { level, mode: 'free', noHints: true, hints: [], keys: KEYS, subgoals: DF_SUB, exam: false };
  const pa = linesItem({
    ...common, skill: DF, prompt: '(a) f est-elle continue en (0, 0) ? Écris f en polaires, puis majore |f| par une fonction de r.',
    ...assemble([
      { start: toPolar(d.f), judge: { kind: 'equiv', vars: PV, domain: { r: [0.2, 1.5], φ: [0, 6.28] }, target: 'short', goal: simp, slack: 2 }, lines: [E(simp, 'x = r cos φ, y = r sin φ', 'polar', 'polar')] },
      { html: 'Majoration de |f| sans φ :', ask: '≤', start: simp, judge: { kind: 'bound', vars: PV }, lines: [E(coefText(M3, 'r'), `|f| ≤ ${M3}r → 0 : f est continue en (0, 0)`, 'polar', 'bound')] },
    ], 4), key: `${DF}:e6a:${d.f}`, declares: { vars: ['x', 'y', 'r', 'φ'] },
  });
  const pb = linesItem({
    ...common, skill: DF, prompt: '(b) Calcule ∂f/∂x(0, 0) et ∂f/∂y(0, 0) par la définition.',
    ...assemble([
      { start: `(${d.fx0}-0)/t`, judge: LH('t'), lines: [E(d.px.toString(), 'f(t, 0) − f(0, 0), divisé par t', 'partials', 'limit')], pre: [NOTE('∂f/∂x(0, 0) = lim<sub>t→0</sub> (f(t, 0) − f(0, 0))/t :')] },
      { html: '∂f/∂y(0, 0) = lim<sub>t→0</sub> (f(0, t) − f(0, 0))/t :', ask: '∂f/∂y(0, 0) =', start: `(${d.fy0}-0)/t`, judge: LH('t'), lines: [E(d.py.toString(), 'f(0, t) − f(0, 0), divisé par t', 'partials', 'limit')] },
    ], 4), key: `${DF}:e6b:${d.f}`, declares: { vars: ['t'] },
  });
  const [v1, v2] = d.u.v;
  const ftv = subst(d.f, { x: vt(v1, 't'), y: vt(v2, 't') });
  const pc = linesItem({
    ...common, skill: DF, prompt: `(c) Calcule D<sub>v</sub>f(0, 0) par la définition, pour v = ${d.u.text}.`,
    ...assemble([{ start: `(${ftv}-0)/t`, judge: tCfg(d.val.text()), lines: [E(d.val.text(), 'f(tv) = t·f(v) : f est homogène de degré 1', 'definition', 'subst')] }], 4),
    key: `${DF}:e6c:${d.f}:${d.u.text}`, declares: { vars: ['t'] },
  });
  const options = [
    { html: `Non : si f était différentiable, D<sub>v</sub>f(0, 0) vaudrait ∇f(0, 0)·v = ${fq(d.gradV)} ≠ ${fq(d.val)}. Les dérivées partielles existent, mais f n'est pas différentiable`, correct: true },
    { html: 'Oui : f est continue et ses dérivées partielles existent, donc elle est différentiable', correct: false, rule: 'a2_partials_imply_diff' },
    { html: `Oui : D<sub>v</sub>f(0, 0) = ∇f(0, 0)·v = ${fq(d.gradV)}, rien ne cloche`, correct: false, rule: 'a2_dirderiv_gradient' },
    { html: 'On ne peut pas savoir sans calculer la limite de R/‖(x, y)‖', correct: false },
  ];
  const pd = mcq({ skill: DF, level, prompt: '(d) f est-elle différentiable en (0, 0) ?', options, key: `${DF}:e6d:${d.f}`, expectedSec: 120, solution: [{ html: options[0].html, note: '' }] }, rng);
  return problemItem({
    skill: DF, level,
    prompt: `Soit f(x, y) = ${M(d.f)} si (x, y) ≠ (0, 0), et f(0, 0) = 0. (a) f est-elle continue en (0, 0) ? (b) Calcule ∂f/∂x(0, 0) et ∂f/∂y(0, 0). (c) Calcule D<sub>v</sub>f(0, 0) pour v = ${d.u.text}. (d) f est-elle différentiable en (0, 0) ? (9 points)`,
    parts: [
      { item: pa, points: [1, 1], title: '(a) Continuité' },
      { item: pb, points: [1, 1], title: '(b) Dérivées partielles' },
      { item: pc, points: [2], title: '(c) Dérivée directionnelle' },
      { item: pd, points: 3, title: '(d) Différentiabilité' },
    ],
    key: `${level}:${d.f}:${d.u.text}`, expectedSec: 900, fallback: !!d.fallback,
  });
}

function dfItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return implTf(DF, rng, opts);
  if (opts.exam === 'mcq') return classMcq(DF, 4, rng, opts);
  if (level === 5) return e6Problem(level, rng);
  return dfLines(level, rng, opts);
}

// ======================================================================
// a2-diff-implications
// ======================================================================

const K_SHOW = {
  K1: 'K1 = xy/(x² + y²)', K2: 'K2 = x²y/(x⁴ + y²)', K3: 'K3 = (x² + y²) sin(1/√(x² + y²))',
  K4: 'K4 = xy²/(x² + y²)', K5: 'K5 = √|xy|',
};
// The statements of the exams (catalogue), with the counter-examples that refute the false ones.
const BANK = [
  { id: 'pc', text: 'Si f admet des dérivées partielles en (0, 0), alors f est continue en (0, 0).', truth: false, want: ['K1', 'K2'], rule: 'a2_partials_imply_cont', src: '2020 Q20' },
  { id: 'pc0', text: 'Si ∂f/∂x(0, 0) = ∂f/∂y(0, 0) = 0, alors f est continue en (0, 0).', truth: false, want: ['K1', 'K2'], rule: 'a2_partials_imply_cont', src: '2021 Q26' },
  { id: 'dpc', text: 'Si f est différentiable en tout point de ℝ², alors ses dérivées partielles sont continues.', truth: false, want: ['K3'], rule: 'a2_diff_imply_c1', src: '2020 Q21' },
  { id: 'dc1', text: 'Si f est différentiable sur ℝ², alors f est de classe C¹.', truth: false, want: ['K3'], rule: 'a2_diff_imply_c1', src: '2016 Q12' },
  { id: 'dvd', text: 'Si D<sub>v</sub>f(0, 0) existe pour tout v ≠ 0, alors f est différentiable en (0, 0).', truth: false, want: ['K2', 'K4'], rule: 'a2_dirderiv_imply_diff', src: '2019 Q25' },
  { id: 'dvc', text: 'Si D<sub>v</sub>f(0, 0) existe pour tout v ≠ 0, alors f est continue en (0, 0).', truth: false, want: ['K2'], rule: 'a2_dirderiv_imply_diff' },
  { id: 'pd', text: 'Si f admet des dérivées partielles en (0, 0), alors f est différentiable en (0, 0).', truth: false, want: ['K1', 'K2', 'K4', 'K5'], rule: 'a2_partials_imply_diff' },
  { id: 'cpd', text: 'Si f est continue en (0, 0) et admet des dérivées partielles en (0, 0), alors f est différentiable en (0, 0).', truth: false, want: ['K4', 'K5'], rule: 'a2_partials_imply_diff' },
  { id: 'c2', text: 'Si f est de classe C², alors ∂f/∂x est différentiable.', truth: true, src: '2019 Q28', why: 'Vrai : ∂f/∂x est de classe C¹, donc différentiable.' },
  { id: 'dc', text: 'Si f est différentiable en a, alors f est continue en a.', truth: true, why: 'Vrai : f(a + h) = f(a) + ∇f(a)·h + R(h), et les deux derniers termes tendent vers 0.' },
  { id: 'c1d', text: 'Si f est de classe C¹ sur ℝ², alors f est différentiable en tout point.', truth: true, why: 'Vrai : c\'est le critère C¹.' },
  { id: 'dgrad', text: 'Si f est différentiable en a, alors D<sub>v</sub>f(a) existe pour tout v et vaut ∇f(a)·v.', truth: true, why: 'Vrai : D<sub>v</sub>f(a) = lim (∇f(a)·tv + R(tv))/t = ∇f(a)·v, car R(tv)/t → 0.' },
];
const WHY_K = {
  K1: 'K1 = xy/(x² + y²) : f(h, 0) = f(0, k) = 0, donc les dérivées partielles valent 0 ; mais f(t, t) = 1/2 : pas continue.',
  K2: 'K2 = x²y/(x⁴ + y²) : toutes les D<sub>v</sub>f(0, 0) existent (v₁²/v₂, ou 0), mais f(x, x²) = 1/2 : pas continue, donc pas différentiable.',
  K3: 'K3 = (x² + y²) sin(1/√(x² + y²)) : |R/‖(x, y)‖| ≤ r → 0, différentiable ; mais ∂f/∂x contient cos(1/r)·x/r, qui oscille : pas C¹.',
  K4: 'K4 = xy²/(x² + y²) : continue, D<sub>v</sub>f(0, 0) = v₁v₂², qui n\'est pas linéaire en v : pas différentiable.',
  K5: 'K5 = √|xy| : continue, dérivées partielles nulles, mais pas de dérivée suivant (1, 1)/√2 : pas différentiable.',
};
const DIAGRAM = 'C¹ ⇒ différentiable ⇒ (continue, et D<sub>v</sub>f = ∇f·v pour tout v) ⇒ dérivées partielles.';

function explainOf(s) {
  return s.truth ? s.why : `Faux. ${WHY_K[s.want[0]]}`;
}

export function implTf(skill, rng, opts = {}, { level = 4, pick = null } = {}) {
  const s = pick || rng.pick(BANK);
  const ex = opts.exam ? examTag(opts) : false;
  return tfItem({
    skill, level, truth: s.truth, key: `${s.id}`, exam: ex, ruleIfTrue: s.truth ? null : s.rule,
    statement: s.text,
    counter: s.truth ? null : { kind: 'a2', prop: 'knownFn', params: { want: s.want }, ask: [{ v: 'f', label: 'f(x, y) =', keys: ['calcx', 'calcfn', 'a2'] }], answer: { f: K_LIBRARY[s.want[0]] } },
    explanation: explainOf(s),
    hints: H('Place les deux notions sur le diagramme : la flèche va-t-elle dans ce sens ?', s.truth ? 'C\'est une flèche du diagramme : elle est vraie.' : 'C\'est une réciproque : pense à une fonction du cours (K1 à K5).', s.truth ? s.why : `Contre-exemple : ${K_SHOW[s.want[0]]}.`),
  });
}

// Level 1: the chain of the diagram, strongest first.
function implBlocks(level) {
  const blocks = [
    { id: 'c1', html: 'f est de classe C¹ au voisinage de a', needs: [] },
    { id: 'diff', html: 'f est différentiable en a', needs: ['c1'] },
    { id: 'dir', html: 'D<sub>v</sub>f(a) existe pour tout v et vaut ∇f(a)·v', needs: ['diff'] },
    { id: 'part', html: 'f admet des dérivées partielles en a', needs: ['dir'] },
  ];
  return blocksItem({
    skill: IM, level, prompt: 'Range ces propriétés de la plus forte à la plus faible : chacune implique la suivante, et aucune réciproque n\'est vraie.',
    blocks, goal: 'part', order: ['c1', 'diff', 'dir', 'part'], key: 'chain',
    hints: H('Le critère C¹ sert à prouver la différentiabilité.', 'Une fonction différentiable a toutes ses dérivées directionnelles, et D<sub>v</sub>f = ∇f·v.', 'C¹ ⇒ différentiable ⇒ D<sub>v</sub>f = ∇f·v ⇒ dérivées partielles.'),
  });
}

// Level 2: true or false, with three counter-examples offered; level 3:
// which counter-example refutes the statement (the `match` item is not built).
function implMcq(level, rng) {
  const ks = ['K1', 'K2', 'K3', 'K4', 'K5'];
  if (level === 3) {
    const s = rng.pick(BANK.filter((x) => !x.truth));
    const right = rng.pick(s.want);
    const others = rng.shuffle(ks.filter((k) => !s.want.includes(k))).slice(0, 3);
    const options = [{ html: K_SHOW[right], correct: true }, ...others.map((k) => ({ html: K_SHOW[k], correct: false }))];
    return mcq({
      skill: IM, level, prompt: `L'énoncé « ${s.text} » est faux. Quelle fonction (nulle en (0, 0)) est un contre-exemple ?`,
      options, key: `which:${s.id}:${right}`, expectedSec: 90, solution: [{ html: WHY_K[right], note: '' }],
    }, rng);
  }
  const s = rng.pick(BANK);
  let options;
  if (s.truth) {
    options = [{ html: 'Vrai', correct: true }, ...rng.shuffle(ks).slice(0, 3).map((k) => ({ html: `Faux, contre-exemple : ${K_SHOW[k]}`, correct: false }))];
  } else {
    const right = rng.pick(s.want);
    const others = rng.shuffle(ks.filter((k) => !s.want.includes(k))).slice(0, 2);
    options = [{ html: `Faux, contre-exemple : ${K_SHOW[right]}`, correct: true }, { html: 'Vrai', correct: false, rule: s.rule }, ...others.map((k) => ({ html: `Faux, contre-exemple : ${K_SHOW[k]}`, correct: false }))];
  }
  return mcq({
    skill: IM, level, prompt: `Le diagramme : ${DIAGRAM}<br>Vrai ou faux ? « ${s.text} »`,
    options, key: `vf:${s.id}`, expectedSec: 90, solution: [{ html: explainOf(s), note: '' }],
  }, rng);
}

// Level 5: five true/false in a row, without the diagram.
function implProblem(level, rng) {
  const picks = rng.shuffle([...BANK]).slice(0, 5);
  const parts = picks.map((s, i) => ({ item: implTf(IM, rng, {}, { level, pick: s }), points: 1, title: `Énoncé ${i + 1}` }));
  return problemItem({
    skill: IM, level, prompt: 'Cinq vrai/faux de suite, sans le diagramme. Pour un énoncé faux, donne un contre-exemple.',
    parts, key: `${level}:${picks.map((s) => s.id).join('|')}`, expectedSec: 420,
  });
}

function implItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return implTf(IM, rng, opts);
  if (opts.exam === 'mcq') return classMcq(IM, 4, rng, opts);
  if (level === 1) return implBlocks(level);
  if (level === 2 || level === 3) return implMcq(level, rng);
  if (level === 4) return implTf(IM, rng, {});
  return implProblem(level, rng);
}

export const GEN_DIFF = { [DD]: ddItem, [DF]: dfItem, [IM]: implItem };
