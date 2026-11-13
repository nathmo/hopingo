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
import { t } from '../../i18n.js';

const SK = 'a1-fn-study';
const KEYS = ['calcx', 'anal', 'set', 'relation'];
const SUB = [
  { id: 'asym', label: t('asymptotes'), skill: SK },
  { id: 'div', label: t('division euclidienne'), skill: 'g0-long-div' },
  { id: 'mono', label: t('monotonie et extrema'), skill: 'a1-extrema-global' },
  { id: 'conv', label: t('convexité'), skill: SK },
];
const CHOICES = [
  { id: 'vert', label: t('Limite au bord du domaine (asymptote verticale)') },
  { id: 'div', label: t('Division euclidienne') },
  { id: 'deriv', label: t('Dériver') },
  { id: 'sign', label: t('Étudier le signe') },
  { id: 'eval', label: t('Calculer la valeur d\'un extremum') },
  { id: 'slope', label: t('Pente de l\'asymptote seulement : m = lim f(x)/x'), rule: 'a1_oblique_asymptote_slope_only', why: t('La pente ne suffit pas : il faut aussi p = lim (f(x) − mx).') },
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

const uniqLabels = (opts) => opts.filter((o, i) => opts.findIndex((x) => x.label === o.label) === i);

function obliqueDecision(D) {
  const y = (p) => `y = ${RD(joinSum(['x', N(p)]))}`;
  return {
    kind: 'decision', prompt: t('Asymptote oblique en ±∞ :'),
    options: uniqLabels([
      { id: 'ok', label: y(D.m), valid: true },
      { id: 'slope', label: 'y = x', valid: false, rule: 'a1_oblique_asymptote_slope_only', why: t('La pente 1 ne suffit pas : f(x) − x → {p1}.', { p1: RD(N(D.m)) }) },
      { id: 'rest', label: y(D.m + D.K), valid: false, why: t('Le reste {p1} tend vers 0 : il ne compte pas dans l\'asymptote.', { p1: RD(`${D.K}/(${lin(D.d)})`) }) },
      { id: 'none', label: t('Pas d\'asymptote oblique'), valid: false, why: t('f(x) − (x + p) tend vers 0 : il y en a une.') },
    ]),
  };
}

function studyItem(level, rng, opts) {
  const D = draw(rng, level <= 2 ? 'pos' : null);
  const T = texts(D);
  const g = level <= 2;
  const vtTo = String(D.d);
  const sideInf = (dir) => ((D.K > 0) === (dir === '+') ? '+∞' : '-∞');
  const P = {
    vplus: { start: T.f, judge: { kind: 'limit', v: 'x', vars: ['x'], to: vtTo, dir: '+' }, html: t('Asymptote verticale : limite quand x → {d}⁺', { d: RD(D.d) }), ask: `lim f =`, lines: [g ? blanked(E(sideInf('+'), t('Le haut tend vers un nombre ≠ 0, le bas vers 0⁺'), 'asym', 'vert'), [sideInf('+')]) : E(sideInf('+'), t('Le bas tend vers 0'), 'asym', 'vert')] },
    vminus: { start: T.f, judge: { kind: 'limit', v: 'x', vars: ['x'], to: vtTo, dir: '-' }, html: t('Puis quand x → {d}⁻', { d: RD(D.d) }), ask: 'lim f =', lines: [E(sideInf('-'), t('Le bas tend vers 0⁻'), 'asym', 'vert')] },
    div: { start: T.f, judge: { kind: 'equiv', vars: ['x'], domain: { x: [-5, 5] }, target: 'partial-fractions' }, html: t('Division euclidienne :'), ask: 'f(x) =', lines: [level === 2 ? blanked(E(T.div, t('Quotient x + m, reste K'), 'div', 'div'), [N(Math.abs(D.K))]) : E(T.div, t('Division euclidienne'), 'div', 'div')] },
    fp: { start: `d(${T.div})`, judge: { kind: 'equiv', vars: ['x'], domain: { x: [-5, 5] }, target: 'no-prime' }, html: t('Dérive f (sous la forme divisée) :'), ask: 'f′(x) =', lines: [E(T.fp, t('Dériver'), 'mono', 'deriv')] },
    mono: { start: `${T.fp}>0`, judge: { kind: 'solset', v: 'x' }, html: t('f est croissante là où f′(x) > 0 :'), lines: D.s ? [E(`${T.fact}>0`, t('Même dénominateur, factoriser'), 'mono', 'sign'), g ? blanked(E(T.incr, t('Signe des facteurs'), 'mono', 'sign'), [N(T.r1), N(T.r2)]) : E(T.incr, t('Signe des facteurs'), 'mono', 'sign')] : [E(T.incr, `f′(x) = ${RD(T.fp)} > 0`, 'mono', 'sign')] },
    ext: D.s && { start: T.f.replace(/(\d)x/g, '$1×x').replace(/x/g, P0(T.r1)), judge: { kind: 'value', form: 'irreducible' }, html: t('Maximum local en x = {p1} :', { p1: RD(N(T.r1)) }), ask: `f(${RD(N(T.r1))}) =`, lines: [E(N(T.max), t('Calculer'), 'mono', 'eval')] },
    f2: { start: `d(${T.fp})`, judge: { kind: 'equiv', vars: ['x'], domain: { x: [-5, 5] }, target: 'no-prime' }, html: t('Dérive encore :'), ask: 'f″(x) =', lines: [E(T.f2, t('Dériver'), 'conv', 'deriv')] },
    conv: { start: `${T.f2}>0`, judge: { kind: 'solset', v: 'x' }, html: t('f est convexe là où f″(x) > 0 :'), lines: [g ? blanked(E(T.convex, t('Signe de {p1}', { p1: RD(`(${lin(D.d)})^3`) }), 'conv', 'sign'), [N(D.d)]) : E(T.convex, t('Signe de {p1}', { p1: RD(`(${lin(D.d)})^3`) }), 'conv', 'sign')] },
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
    ? t('Étudie f(x) = {f} : asymptotes, monotonie, convexité.', { f: ML(T.f) })
    : t('Soit f(x) = {f}, définie sur ℝ ∖ {{p1}}. Fais son étude{p2}.', { f: ML(T.f), p1: RD(N(D.d)), p2: level === 1 ? t(' (monotonie et convexité)') : '' });
  return partsItem({
    skill: SK, level, prompt, parts, choices: CHOICES,
    hints: H(t('Divise {p1} par {p2} : le quotient donne l\'asymptote oblique.', { p1: RD(T.f.split('/(')[0].slice(1, -1)), p2: RD(lin(D.d)) }), `f(x) = ${RD(joinSum(['x', N(D.m)]))} + ▢/(${RD(lin(D.d))})`, `f″(x) = ${ML(T.f2)}`),
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
      skill: SK, level: 4, prompt: t('Quelle est l\'asymptote oblique de f(x) = {f} en ±∞ ?', { f: ML(T.f) }),
      options: [
        { html: y(D.m), correct: true },
        { html: 'y = x', correct: false, rule: 'a1_oblique_asymptote_slope_only' },
        { html: y(D.m + D.K), correct: false },
        { html: y(-D.m), correct: false },
        { html: y(D.m + 1), correct: false },
      ],
      key: `mcq:asym:${T.f}`, expectedSec: 240, exam: examOf(opts),
      solution: [{ html: t('Division : f(x) = {div}. Le reste tend vers 0 : asymptote {m}.', { div: ML(T.div), m: y(D.m) }), note: '' }],
      fallback: D.fallback,
    }, rng);
  }
  // The graph in words: convexity and position of the branches.
  const ok = D.K > 0;
  const dd = RD(N(D.d));
  const words = (convexRight) => (convexRight ? t('concave sur ]−∞ ; {dd}[ et convexe sur ]{dd} ; +∞[', { dd }) : t('convexe sur ]−∞ ; {dd}[ et concave sur ]{dd} ; +∞[', { dd }));
  const options = [
    { html: t('f est {ok} ; asymptotes x = {p1} et {m}', { ok: words(ok), p1: RD(N(D.d)), m: y(D.m) }), correct: true },
    { html: t('f est {p1} ; asymptotes x = {p2} et {m}', { p1: words(!ok), p2: RD(N(D.d)), m: y(D.m) }), correct: false },
    { html: t('f est {ok} ; asymptotes x = {p1} et y = x', { ok: words(ok), p1: RD(N(D.d)) }), correct: false, rule: 'a1_oblique_asymptote_slope_only' },
    { html: t('f est convexe sur ℝ ∖ {{p1}} ; asymptotes x = {p2} et {m}', { p1: RD(N(D.d)), p2: RD(N(D.d)), m: y(D.m) }), correct: false },
  ];
  return mcqOf({
    skill: SK, level: 4, prompt: t('Quelle description convient au graphe de f(x) = {f} ?', { f: ML(T.f) }),
    options, key: `mcq:graph:${T.f}`, expectedSec: 240, exam: examOf(opts),
    solution: [{ html: t('f(x) = {div}, f″(x) = {f2} : {p1} à droite de {p2}.', { div: ML(T.div), f2: ML(T.f2), p1: D.K > 0 ? t('positive') : t('négative'), p2: RD(N(D.d)) }), note: '' }],
    fallback: D.fallback,
  }, rng);
}

const FIXED_TF = [
  { statement: 'f(x) = e^(x⁴/4 + x²/2) a un seul minimum local.', truth: true, why: 'Vrai : f′(x) = (x³ + x)·e^(…) = x(x² + 1)·e^(…) ne s\'annule qu\'en 0, où elle passe de − à +.' },
  { statement: 'Si f est dérivable et f′(x₀) = 0, alors f a un extremum local en x₀.', truth: false, rule: 'g6_critical_is_extremum', why: 'Faux : f(x) = x³ en 0. f′ doit changer de signe.' },
  { statement: 'f(x) = (x − 1)²(x − 3)⁴·∛(x + 5) possède au moins 4 extrema locaux.', truth: true, why: 'Vrai : f ≥ 0 sur [−5 ; +∞[ et f(1) = f(3) = 0 donnent deux minima ; entre −5 et 1, puis entre 1 et 3, f > 0 atteint un maximum.' },
];

function tfVariant(rng, opts) {
  if (rng.chance(0.4)) {
    const s = rng.pick(FIXED_TF);
    return vfItem({ skill: SK, statement: t(s.statement), truth: s.truth, rule: s.rule, why: t(s.why), key: s.statement, exam: examOf(opts) }, rng);
  }
  const D = draw(rng, null);
  const T = texts(D);
  if (rng.chance(0.5)) {
    const truth = rng.chance(0.5);
    const p = truth ? D.m : 0;
    return vfItem({
      skill: SK, key: `asym:${T.f}:${p}`, exam: examOf(opts), truth, rule: truth ? null : 'a1_oblique_asymptote_slope_only',
      statement: t('La droite y = {p1} est asymptote oblique de f(x) = {f} en +∞.', { p1: RD(joinSum(['x', N(p)])), f: ML(T.f) }),
      why: t('{p1} : f(x) = {div}, donc f(x) − (x + {p2}) → 0.', { p1: truth ? t('Vrai') : t('Faux'), div: ML(T.div), p2: RD(N(D.m)) }), fallback: D.fallback,
    }, rng);
  }
  const truth = rng.chance(0.5);
  const set = truth === (D.K > 0) ? `]${RD(N(D.d))} ; +∞[` : `]−∞ ; ${RD(N(D.d))}[`;
  return vfItem({
    skill: SK, key: `conv:${T.f}:${set}`, exam: examOf(opts), truth,
    statement: t('f(x) = {f} est convexe sur {set}.', { f: ML(T.f), set }),
    why: t('{p1} : f″(x) = {f2}, {p2} pour x > {p3}.', { p1: truth ? t('Vrai') : t('Faux'), f2: ML(T.f2), p2: D.K > 0 ? t('positive') : t('négative'), p3: RD(N(D.d)) }), fallback: D.fallback,
  }, rng);
}

export function fnStudyItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return mcqVariant(rng, opts);
  if (opts.exam === 'tf') return tfVariant(rng, opts);
  return studyItem(level, rng, opts);
}
export { fAt };
