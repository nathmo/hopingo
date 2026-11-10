// a1-fn-study (module A1, part b, step U2): study of a function
// f(x) = (x² + bx + c)/(x − d) = x + m + K/(x − d). Parts: vertical
// asymptote (limit at d⁺ and d⁻), division (equiv, partial fractions),
// the oblique asymptote (decision), f′ (equiv), where f′ > 0 (solset),
// a local extremum (value), f″ (equiv) and where f″ > 0 (solset).
// K = s² > 0: extrema at d ± s; K < 0: f increasing on each side.
// The sketch is a multiple choice in words (exam variant): no plot item
// before step U5.

import { Q } from '../../math/rational.js';
import { N, nz, H, E, examOf, kx, joinSum, lin, blanked, partsItem, mcqOf, vfItem, ML, RD } from './analyse1-b-common.js';

const SK = 'a1-fn-study';
const KEYS = ['calcx', 'anal', 'set', 'relation'];
const SUB = [
  { id: 'asym', label: 'asymptotes', skill: SK },
  { id: 'div', label: 'division euclidienne', skill: 'g0-long-div' },
  { id: 'mono', label: 'monotonie et extrema', skill: 'a1-extrema-global' },
  { id: 'conv', label: 'convexité', skill: SK },
];
const CHOICES = [
  { id: 'vert', label: 'Limite au bord du domaine (asymptote verticale)' },
  { id: 'div', label: 'Division euclidienne' },
  { id: 'deriv', label: 'Dériver' },
  { id: 'sign', label: 'Étudier le signe' },
  { id: 'eval', label: 'Calculer la valeur d\'un extremum' },
  { id: 'slope', label: 'Pente de l\'asymptote seulement : m = lim f(x)/x', rule: 'a1_oblique_asymptote_slope_only', why: 'La pente ne suffit pas : il faut aussi p = lim (f(x) − mx).' },
];

function draw(rng, wantK) {
  for (let i = 0; i < 200; i++) {
    const d = nz(rng, -4, 4);
    const m = nz(rng, -4, 4);
    const pos = wantK === 'pos' || (wantK !== 'neg' && rng.chance(0.75));
    const s = rng.int(1, 4);
    const K = pos ? s * s : -rng.int(1, 9);
    const b = m - d;
    const c = K - d * d - b * d;
    if (Math.abs(c) > 20 || c === 0) continue;
    return { d, m, K, s: pos ? s : null, b, c };
  }
  return { d: 1, m: 1, K: 4, s: 2, b: 0, c: 3, fallback: true };
}

function texts(D) {
  const { d, m, K, s } = D;
  const xd = lin(d);
  const f = `(${joinSum(['x^2', kx(D.b), N(D.c)])})/(${xd})`;
  const div = joinSum(['x', N(m), `${K}/(${xd})`]);
  const fp = joinSum(['1', `${-K}/(${xd})^2`]);
  const f2 = `${2 * K}/(${xd})^3`;
  const out = { xd, f, div, fp, f2 };
  if (s) {
    out.r1 = d - s;
    out.r2 = d + s;
    out.fact = `((${lin(out.r1)})(${lin(out.r2)}))/(${xd})^2`;
    out.max = d + m - 2 * s;
    out.min = d + m + 2 * s;
    out.incr = `]-∞;${N(out.r1)}[∪]${N(out.r2)};+∞[`;
  } else out.incr = `]-∞;${N(d)}[∪]${N(d)};+∞[`;
  out.convex = K > 0 ? `]${N(d)};+∞[` : `]-∞;${N(d)}[`;
  return out;
}

const fAt = (D, x) => Q.of(x).add(D.m).add(Q.of(D.K).div(x - D.d));

function obliqueDecision(D) {
  const y = (p) => `y = ${RD(joinSum(['x', N(p)]))}`;
  return {
    kind: 'decision', prompt: 'Asymptote oblique en ±∞ :',
    options: [
      { id: 'ok', label: y(D.m), valid: true },
      { id: 'slope', label: 'y = x', valid: false, rule: 'a1_oblique_asymptote_slope_only', why: `La pente 1 ne suffit pas : f(x) − x → ${RD(N(D.m))}.` },
      { id: 'rest', label: y(D.m + D.K), valid: false, why: `Le reste ${RD(N(D.K))}/(x − ${RD(N(D.d))}) tend vers 0 : il ne compte pas dans l'asymptote.` },
      { id: 'none', label: 'Pas d\'asymptote oblique', valid: false, why: 'f(x) − (x + p) tend vers 0 : il y en a une.' },
    ],
  };
}

function studyItem(level, rng, opts) {
  const D = draw(rng, level <= 2 ? 'pos' : null);
  const T = texts(D);
  const g = level <= 2;
  const vtTo = String(D.d);
  const sideInf = (dir) => ((D.K > 0) === (dir === '+') ? '+∞' : '-∞');
  const P = {
    vplus: { start: T.f, judge: { kind: 'limit', v: 'x', vars: ['x'], to: vtTo, dir: '+' }, html: `Asymptote verticale : limite quand x → ${RD(D.d)}⁺`, ask: `lim f =`, lines: [g ? blanked(E(sideInf('+'), 'Le haut tend vers un nombre ≠ 0, le bas vers 0⁺', 'asym', 'vert'), [sideInf('+')]) : E(sideInf('+'), 'Le bas tend vers 0', 'asym', 'vert')] },
    vminus: { start: T.f, judge: { kind: 'limit', v: 'x', vars: ['x'], to: vtTo, dir: '-' }, html: `Puis quand x → ${RD(D.d)}⁻`, ask: 'lim f =', lines: [E(sideInf('-'), 'Le bas tend vers 0⁻', 'asym', 'vert')] },
    div: { start: T.f, judge: { kind: 'equiv', vars: ['x'], domain: { x: [-5, 5] }, target: 'partial-fractions' }, html: 'Division euclidienne :', ask: 'f(x) =', lines: [level === 2 ? blanked(E(T.div, 'Quotient x + m, reste K', 'div', 'div'), [N(Math.abs(D.K))]) : E(T.div, 'Division euclidienne', 'div', 'div')] },
    fp: { start: `d(${T.div})`, judge: { kind: 'equiv', vars: ['x'], domain: { x: [-5, 5] }, target: 'no-prime' }, html: 'Dérive f (sous la forme divisée) :', ask: 'f′(x) =', lines: [E(T.fp, 'Dériver', 'mono', 'deriv')] },
    mono: { start: `${T.fp}>0`, judge: { kind: 'solset', v: 'x' }, html: 'f est croissante là où f′(x) > 0 :', lines: D.s ? [E(`${T.fact}>0`, 'Même dénominateur, factoriser', 'mono', 'sign'), g ? blanked(E(T.incr, 'Signe des facteurs', 'mono', 'sign'), [N(T.r1), N(T.r2)]) : E(T.incr, 'Signe des facteurs', 'mono', 'sign')] : [E(T.incr, `f′(x) = 1 + ${-D.K}/(x − ${RD(N(D.d))})² > 0`, 'mono', 'sign')] },
    ext: D.s && { start: `${P0(T.r1)}+${P0(D.m)}+${D.K}/(${P0(T.r1)}-${P0(D.d)})`.replace(/\+-/g, '-'), judge: { kind: 'value', form: 'irreducible' }, html: `Maximum local en x = ${RD(N(T.r1))} :`, ask: `f(${RD(N(T.r1))}) =`, lines: [E(N(T.max), 'Calculer', 'mono', 'eval')] },
    f2: { start: `d(${T.fp})`, judge: { kind: 'equiv', vars: ['x'], domain: { x: [-5, 5] }, target: 'no-prime' }, html: 'Dérive encore :', ask: 'f″(x) =', lines: [E(T.f2, 'Dériver', 'conv', 'deriv')] },
    conv: { start: `${T.f2}>0`, judge: { kind: 'solset', v: 'x' }, html: 'f est convexe là où f″(x) > 0 :', lines: [g ? blanked(E(T.convex, `Signe de (x − ${RD(N(D.d))})³`, 'conv', 'sign'), [N(D.d)]) : E(T.convex, `Signe de (x − ${RD(N(D.d))})³`, 'conv', 'sign')] },
  };
  const seq = {
    1: ['mono', 'conv'],
    2: ['div', 'vplus', 'vminus', 'fp'],
    3: ['div', 'fp', 'mono', 'f2', 'conv'],
    4: ['div', 'fp', 'mono', 'f2', 'conv'],
    5: ['div', 'vplus', 'vminus', 'fp', 'mono', 'ext', 'f2', 'conv'],
  }[level].filter((k) => P[k]);
  const parts = seq.map((k) => ({ ...P[k] }));
  // The oblique asymptote, read after the division.
  const iDiv = seq.indexOf('div');
  if (level !== 3 && iDiv >= 0 && iDiv + 1 < seq.length) parts[iDiv + 1].pre = [obliqueDecision(D)];
  if (level === 1) parts[0].html = `f′(x) = ${ML(T.fp)}${D.s ? ` = ${ML(T.fact)}` : ''}. ${P.mono.html}`;
  if (level === 1) parts[1].html = `f″(x) = ${ML(T.f2)}. ${P.conv.html}`;
  const prompt = rng.chance(0.5)
    ? `Étudie f(x) = ${ML(T.f)} : asymptotes, monotonie, convexité.`
    : `Soit f(x) = ${ML(T.f)}, définie sur ℝ ∖ {${RD(N(D.d))}}. Fais son étude${level === 1 ? ' (monotonie et convexité)' : ''}.`;
  return partsItem({
    skill: SK, level, prompt, parts, choices: CHOICES,
    hints: H(`Divise ${RD(T.f.split('/(')[0].slice(1, -1))} par x − ${RD(N(D.d))} : le quotient donne l'asymptote oblique.`, `f(x) = ${RD(joinSum(['x', N(D.m)]))} + ▢/(x − ${RD(N(D.d))})`, `f″(x) = ${ML(T.f2)}`),
    subgoals: SUB, keys: KEYS, key: `${SK}:${T.f}:${level}`, exam: examOf(opts), fallback: D.fallback,
  });
}
// A number inside an expression: 3 or (−2).
const P0 = (k) => (k < 0 ? `(${N(k)})` : N(k));

// ---------- exam variants ----------

function mcqVariant(rng, opts) {
  const D = draw(rng, null);
  const T = texts(D);
  const y = (p) => `y = ${RD(joinSum(['x', N(p)]))}`;
  if (rng.chance(0.5)) {
    return mcqOf({
      skill: SK, level: 4, prompt: `Quelle est l'asymptote oblique de f(x) = ${ML(T.f)} en ±∞ ?`,
      options: [
        { html: y(D.m), correct: true },
        { html: 'y = x', correct: false, rule: 'a1_oblique_asymptote_slope_only' },
        { html: y(D.m + D.K), correct: false },
        { html: y(-D.m), correct: false },
        { html: y(D.m + 1), correct: false },
      ],
      key: `mcq:asym:${T.f}`, expectedSec: 240, exam: examOf(opts),
      solution: [{ html: `Division : f(x) = ${ML(T.div)}. Le reste tend vers 0 : asymptote ${y(D.m)}.`, note: '' }],
      fallback: D.fallback,
    }, rng);
  }
  // The graph in words: convexity and position of the branches.
  const ok = D.K > 0;
  const dd = RD(N(D.d));
  const words = (convexRight) => (convexRight ? `concave sur ]−∞ ; ${dd}[ et convexe sur ]${dd} ; +∞[` : `convexe sur ]−∞ ; ${dd}[ et concave sur ]${dd} ; +∞[`);
  const options = [
    { html: `f est ${words(ok)} ; asymptotes x = ${RD(N(D.d))} et ${y(D.m)}`, correct: true },
    { html: `f est ${words(!ok)} ; asymptotes x = ${RD(N(D.d))} et ${y(D.m)}`, correct: false },
    { html: `f est ${words(ok)} ; asymptotes x = ${RD(N(D.d))} et y = x`, correct: false, rule: 'a1_oblique_asymptote_slope_only' },
    { html: `f est convexe sur ℝ ∖ {${RD(N(D.d))}} ; asymptotes x = ${RD(N(D.d))} et ${y(D.m)}`, correct: false },
  ];
  return mcqOf({
    skill: SK, level: 4, prompt: `Quelle description convient au graphe de f(x) = ${ML(T.f)} ?`,
    options, key: `mcq:graph:${T.f}`, expectedSec: 240, exam: examOf(opts),
    solution: [{ html: `f(x) = ${ML(T.div)}, f″(x) = ${ML(T.f2)} : ${D.K > 0 ? 'positive' : 'négative'} à droite de ${RD(N(D.d))}.`, note: '' }],
    fallback: D.fallback,
  }, rng);
}

const FIXED_TF = [
  { statement: 'f(x) = e^(x⁴/4 + x²/2) a un seul minimum local.', truth: true, why: 'Vrai : f′(x) = (x³ + x)·e^(…) = x(x² + 1)·e^(…) ne s\'annule qu\'en 0, où elle passe de − à +.' },
  { statement: 'Si f est dérivable et f′(x₀) = 0, alors f a un extremum local en x₀.', truth: false, why: 'Faux : f(x) = x³ en 0. f′ doit changer de signe.' },
  { statement: 'f(x) = (x − 1)²(x − 3)⁴·∛(x + 5) possède au moins 4 extrema locaux.', truth: true, why: 'Vrai : f ≥ 0 sur [−5 ; +∞[ et f(1) = f(3) = 0 donnent deux minima ; entre −5 et 1, puis entre 1 et 3, f > 0 atteint un maximum.' },
];

function tfVariant(rng, opts) {
  if (rng.chance(0.4)) {
    const s = rng.pick(FIXED_TF);
    return vfItem({ skill: SK, statement: s.statement, truth: s.truth, why: s.why, key: s.statement, exam: examOf(opts) }, rng);
  }
  const D = draw(rng, null);
  const T = texts(D);
  if (rng.chance(0.5)) {
    const truth = rng.chance(0.5);
    const p = truth ? D.m : 0;
    return vfItem({
      skill: SK, key: `asym:${T.f}:${p}`, exam: examOf(opts), truth, rule: truth ? null : 'a1_oblique_asymptote_slope_only',
      statement: `La droite y = ${RD(joinSum(['x', N(p)]))} est asymptote oblique de f(x) = ${ML(T.f)} en +∞.`,
      why: `${truth ? 'Vrai' : 'Faux'} : f(x) = ${ML(T.div)}, donc f(x) − (x + ${RD(N(D.m))}) → 0.`, fallback: D.fallback,
    }, rng);
  }
  const truth = rng.chance(0.5);
  const set = truth === (D.K > 0) ? `]${RD(N(D.d))} ; +∞[` : `]−∞ ; ${RD(N(D.d))}[`;
  return vfItem({
    skill: SK, key: `conv:${T.f}:${set}`, exam: examOf(opts), truth,
    statement: `f(x) = ${ML(T.f)} est convexe sur ${set}.`,
    why: `${truth ? 'Vrai' : 'Faux'} : f″(x) = ${ML(T.f2)}, ${D.K > 0 ? 'positive' : 'négative'} pour x > ${RD(N(D.d))}.`, fallback: D.fallback,
  }, rng);
}

export function fnStudyItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return mcqVariant(rng, opts);
  if (opts.exam === 'tf') return tfVariant(rng, opts);
  return studyItem(level, rng, opts);
}
export { fAt };
