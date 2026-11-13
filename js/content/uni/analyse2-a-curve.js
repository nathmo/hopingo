// Generators of module A2, part a (step U6): a2-curve-param (curves of
// ℝ³: derivative, point, tangent, continuity) and a2-curve-length (arc
// length). Catalogue: docs/universite/A2-analyse-2.md.
//
// a2-curve-param: one part per component of γ′ (judge `equiv` in t, from
// d(γᵢ, t)), then γ(t₀) and γ′(t₀) (judge `vector`, the expected value),
// then the tangent T(s) = γ(t₀) + s·γ′(t₀) (judge `vector` with the
// parameter s: the vector language of U5 reads π, the `geom` judge wants
// rational coordinates). Level 5 and the exam mcq: which curve has a point
// of discontinuity (2020; sign(t) is written in words, the CAS does not
// read it), or which parametrisation is a given helix (2016, the drawing
// described in words).
//
// a2-curve-length: ‖γ′‖² by `equiv` in t (from Σ d(γᵢ, t)², until the
// square the catalogue asks for, cfg.goal), then L by `definite` (from
// ∫ √(‖γ′‖²) dt); cfg.arc lets a2_arc_sum_components replay ∫ (x′ + y′ + z′) dt.

import { Q } from '../../math/rational.js';
import { MT, mcq, tfItem, linesItem } from './kit.js';
import { modeOf, H, E, tpl, withMenus, SEG, sup } from './analyse1-e-kit.js';
import { blanks } from './geo-kit.js';
import { t } from '../../i18n.js';

const CP = 'a2-curve-param';
const CL = 'a2-curve-length';
const TV = { vars: ['t'] };
const KEYS = ['calcx', 'calcfn', 'anal', 'geo'];
const fr = (s) => String(s).replace(/-/g, '−');

// ---------- exact values a + b·π + c·π² (t₀ ∈ {0, π/2, π, 1}) ----------

const q = (n, d = 1) => new Q(n, d);
const P = (c0 = 0, c1 = 0, c2 = 0) => [q(0).add(Q.of(c0)), q(0).add(Q.of(c1)), q(0).add(Q.of(c2))];
const padd = (a, b) => a.map((x, i) => x.add(b[i]));
const pmul = (a, k) => a.map((x) => x.mul(Q.of(k)));
const ptimes = (a, b) => { const out = P(); for (let i = 0; i < 3; i++) for (let j = 0; i + j < 3; j++) out[i + j] = out[i + j].add(a[i].mul(b[j])); return out; };
// Text: 1 − π/2, π²/4, −π (for the judges).
function pT(p) {
  const terms = [];
  p.forEach((c, i) => {
    if (c.n === 0) return;
    const mono = i === 0 ? '' : i === 1 ? 'π' : 'π^2';
    const abs = c.n < 0 ? c.neg() : c;
    const sign = c.n < 0 ? '-' : terms.length ? '+' : '';
    if (!mono) { terms.push(`${sign}${abs}`); return; }
    const top = abs.n === 1 ? mono : `${abs.n}${mono}`;
    terms.push(`${sign}${abs.d === 1 ? top : `${top}/${abs.d}`}`);
  });
  return terms.length ? terms.join('') : '0';
}
// t₀: {key, text, poly, j (t₀ = jπ/2, trig allowed)}.
const T0 = {
  0: { key: '0', text: '0', poly: P(0), j: 0 },
  'π/2': { key: 'π/2', text: 'π/2', poly: P(0, q(1, 2)), j: 1 },
  π: { key: 'π', text: 'π', poly: P(0, 1), j: 2 },
  1: { key: '1', text: '1', poly: P(1), j: null },
};
const cosJ = (m) => [1, 0, -1, 0][((m % 4) + 4) % 4];
const sinJ = (m) => [0, 1, 0, -1][((m % 4) + 4) % 4];

const coefT = (c) => (c === 1 ? '' : c === -1 ? '-' : String(c));
// Components: text, derivative lines [{math, act}], value and derivative at t₀.
function component(kind, a = 1, b = 1) {
  const A = a === 1 ? '' : a === -1 ? '-' : String(a);
  switch (kind) {
    case 't': return { text: 't', show: 't', d: [{ math: '1', act: 'table' }], f: (t) => t.poly, df: () => P(1), trig: false };
    case 'lin': return { text: `${coefT(a)}t`, show: `${fr(coefT(a))}t`, d: [{ math: String(a), act: 'table' }], f: (t) => pmul(t.poly, a), df: () => P(a), trig: false };
    case 't2': return { text: 't^2', show: 't²', d: [{ math: '2t', act: 'table' }], f: (t) => ptimes(t.poly, t.poly), df: (t) => pmul(t.poly, 2), trig: false };
    case 't3': return { text: 't^3', show: 't³', d: [{ math: '3t^2', act: 'table' }], f: (t) => (t.j === null ? P(1) : null), df: (t) => (t.j === null ? P(3) : null), trig: false, only1: true };
    case 'exp': return { text: 'e^t', show: 'eᵗ', d: [{ math: 'e^t', act: 'table' }], f: () => P(1), df: () => P(1), trig: false, only0: true };
    case 'cos': {
      const Bt = b === 1 ? 't' : `${b}t`;
      const d = b === 1 ? [{ math: `${coefT(-a)}sin(t)`, act: 'table' }]
        : [{ math: `${a === 1 ? '' : `(${a})×`}(-sin(${Bt}))×d(${Bt},t)`, act: 'chain' }, { math: `${coefT(-a * b)}sin(${Bt})`, act: 'simplify' }];
      return { text: `${A}cos(${Bt})`, show: `${fr(A)}cos ${Bt}`, d, f: (t) => P(a * cosJ(b * t.j)), df: (t) => P(-a * b * sinJ(b * t.j)), trig: true };
    }
    case 'sin': {
      const Bt = b === 1 ? 't' : `${b}t`;
      const d = b === 1 ? [{ math: `${coefT(a)}cos(t)`, act: 'table' }]
        : [{ math: `${a === 1 ? '' : `(${a})×`}cos(${Bt})×d(${Bt},t)`, act: 'chain' }, { math: `${coefT(a * b)}cos(${Bt})`, act: 'simplify' }];
      return { text: `${A}sin(${Bt})`, show: `${fr(A)}sin ${Bt}`, d, f: (t) => P(a * sinJ(b * t.j)), df: (t) => P(a * b * cosJ(b * t.j)), trig: true };
    }
    case 'tcos': return {
      text: 't×cos(t)', show: 't cos t', d: [{ math: 'd(t,t)×cos(t)+t×d(cos(t),t)', act: 'product' }, { math: 'cos(t)-t×sin(t)', act: 'table' }],
      f: (t) => pmul(t.poly, cosJ(t.j)), df: (t) => padd(P(cosJ(t.j)), pmul(t.poly, -sinJ(t.j))), trig: true,
    };
    default: return {
      text: 't×sin(t)', show: 't sin t', d: [{ math: 'd(t,t)×sin(t)+t×d(sin(t),t)', act: 'product' }, { math: 'sin(t)+t×cos(t)', act: 'table' }],
      f: (t) => pmul(t.poly, sinJ(t.j)), df: (t) => padd(P(sinJ(t.j)), pmul(t.poly, cosJ(t.j))), trig: true,
    };
  }
}

function drawCurve(rng) {
  for (let i = 0; i < 200; i++) {
    const t0 = T0[rng.pick(['0', 'π/2', 'π', '1', 'π', '0'])];
    const pool = t0.j === null ? ['t', 'lin', 't2', 't3'] : t0.j === 0 ? ['t', 't2', 'exp', 'cos', 'sin', 'tcos', 'tsin', 'lin'] : ['t', 't2', 'cos', 'sin', 'tcos', 'tsin', 'lin'];
    const kinds = rng.shuffle(pool).slice(0, 3);
    if (!kinds.some((k) => ['cos', 'sin', 'tcos', 'tsin', 't2', 't3', 'exp'].includes(k))) continue;
    const comps = kinds.map((k) => component(k, k === 'lin' ? rng.pick([2, 3, -1, -2]) : k === 'cos' || k === 'sin' ? rng.pick([1, 2, 3, -1]) : 1, k === 'cos' || k === 'sin' ? rng.pick([1, 1, 2]) : 1));
    if (new Set(comps.map((c) => c.text)).size < 3) continue;
    const Pt = comps.map((c) => c.f(t0));
    const Vt = comps.map((c) => c.df(t0));
    if (Pt.some((x) => !x) || Vt.some((x) => !x)) continue;
    if (Vt.every((v) => v.every((c) => c.n === 0))) continue; // not smooth at t₀
    return { comps, t0, Pt: Pt.map(pT), Vt: Vt.map(pT) };
  }
  const comps = [component('cos'), component('sin'), component('t')];
  return { comps, t0: T0.π, Pt: ['-1', '0', 'π'], Vt: ['0', '-1', '1'], fallback: true };
}

const vT = (xs) => `(${xs.join(' ; ')})`;
const vR = (xs) => fr(vT(xs)).replace(/\^2/g, '²');
const gammaML = (comps) => `γ(t) = (${comps.map((c) => MT(c.text, TV)).join(' ; ')})`;
const CP_SUB = [
  { id: 'deriv', label: t('dériver chaque composante'), skill: 'g6-deriv-rules' },
  { id: 'evaluate', label: t('évaluer en t₀'), skill: CP },
  { id: 'tangent', label: t('droite tangente'), skill: CP },
];
const CP_CHOICES = [
  { id: 'table', label: t('Dérivée usuelle') },
  { id: 'product', label: t('Règle du produit') },
  { id: 'chain', label: t('Règle de chaîne') },
  { id: 'simplify', label: t('Simplifier') },
];
const vmenu = (label) => [{ id: 'ok', label, valid: true }, { id: 'bad', label: t('Dériver encore une fois'), valid: false, why: t('Il suffit de remplacer t par t₀ dans ce qu\'on a déjà.') }];

function cpLines(level, rng) {
  const d = drawCurve(rng);
  const t0 = d.t0.text;
  const eqj = { kind: 'equiv', vars: ['t'], dvar: 't', domain: { t: [-3, 3] }, target: 'no-prime' };
  const parts = d.comps.map((c, i) => ({
    html: t('γ′ : composante {n}', { n: i + 1 }), ask: `γ′${['₁', '₂', '₃'][i]}(t) =`, start: `d(${c.text},t)`, judge: eqj,
    lines: c.d.map((l, j) => {
      const line = E(l.math, l.act === 'product' ? t('Règle du produit') : l.act === 'chain' ? t('Règle de chaîne') : j ? t('Simplifier') : t('Dérivée usuelle'), 'deriv', l.act);
      if (level === 1 && j === c.d.length - 1 && l.math.length > 2) return { ...line, ...tpl(l.math, [l.math.replace(/^-?\d*/, '').split(/[+-]/)[0] || l.math], TV) };
      return line;
    }),
  }));
  const vjudge = (expect, label, params) => ({ kind: 'vector', expect, form: 'any', ...(params ? { params } : {}), ...(level === 3 ? { menu: vmenu(label) } : {}) });
  const Pv = vT(d.Pt);
  const Vv = vT(d.Vt);
  if (level >= 2) parts.push({ html: t('Le point γ({t0}) :', { t0 }), ask: `γ(${t0}) =`, start: `γ(${t0})`, judge: vjudge(Pv, t('Remplacer t par {t0} dans γ', { t0 })), lines: [{ ...E(Pv, `t = ${t0}`, 'evaluate'), ...(level === 2 ? blanks(Pv, [d.Pt[0]]) : {}) }] });
  parts.push({ html: t('Le vecteur γ′({t0}) :', { t0 }), ask: `γ′(${t0}) =`, start: `γ′(${t0})`, judge: vjudge(Vv, t('Remplacer t par {t0} dans γ′', { t0 })), lines: [{ ...E(Vv, t('t = {t0} dans γ′', { t0 }), 'evaluate'), ...(level <= 2 ? blanks(Vv, [d.Vt[level === 1 ? 0 : 1]]) : {}) }] });
  if (level >= 3) {
    const Tl = `${Pv} + s${Vv}`;
    parts.push({ html: t('La tangente en t = {t0} :', { t0 }), ask: 'T(s) =', start: 'T(s)', judge: vjudge(Tl, 'γ(t₀) + s·γ′(t₀)', ['s']), lines: [E(Tl, t('Le point, plus s fois le vecteur tangent'), 'tangent')] });
  }
  const script = [];
  parts.forEach((p, i) => {
    const judge = p.judge.kind === 'equiv' ? withMenus(p.judge, level, p.start, p.lines, CP_CHOICES) : p.judge;
    if (i === 0) script.push(...p.lines);
    else script.push(SEG(p.html, p.ask, p.start, judge), ...p.lines);
  });
  const g = gammaML(d.comps);
  const prompt = level >= 3 ? t('{g}. Calcule γ′(t), composante par composante, γ({t0}), γ′({t0}) et la tangente T(s) = γ({t0}) + s·γ′({t0}).', { g, t0 })
    : level === 2 ? t('{g}. Calcule γ′(t), composante par composante, le point γ({t0}) et γ′({t0}).', { g, t0 })
      : t('{g}. Calcule γ′(t), composante par composante, puis γ′({t0}).', { g, t0 });
  return linesItem({
    skill: CP, level, mode: modeOf(level), start: parts[0].start, judge: withMenus(parts[0].judge, level, parts[0].start, parts[0].lines, CP_CHOICES), script,
    prompt,
    hints: H(t('Dérive chaque composante séparément ; puis remplace t par t₀.'),
      `γ′(t) = (${d.comps.map((c) => MT(c.d.at(-1).math, TV)).join(' ; ')})`,
      level >= 3 ? `T(s) = ${vR(d.Pt)} + s·${vR(d.Vt)}` : `γ′(${t0}) = ${vR(d.Vt)}`),
    subgoals: CP_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${CP}:${level}:${d.comps.map((c) => c.text).join(',')}:${t0}`, fallback: !!d.fallback,
  });
}

// Continuity: which curve has a point of discontinuity (2020). sign(t) is
// written in words. g0: the other factor at 0 (0: continuous).
const CONT = [
  { show: 't²', ok: true }, { show: 'cos t', ok: true }, { show: 'eᵗ', ok: true }, { show: '|t|', ok: true }, { show: 't³ − t', ok: true }, { show: 'sin 2t', ok: true },
];
const SIGN_OK = [
  { show: 'sign(t)·(eᵗ − 1)', ok: true, g0: 0 }, { show: 'sign(t)·sin t', ok: true, g0: 0 }, { show: 'sign(t)·t²', ok: true, g0: 0 }, { show: 't·sign(t)', ok: true, g0: 0 },
];
const SIGN_BAD = [
  { show: 'sign(t)·cos t', ok: false, at: '0' }, { show: 'sign(t)·(t + 2)', ok: false, at: '0' }, { show: 'sign(t)·eᵗ', ok: false, at: '0' }, { show: 'sign(t − 1)·t', ok: false, at: '1' },
];
function contMcq(level, rng, exam) {
  const bad = rng.pick(SIGN_BAD);
  const right = rng.shuffle([bad, ...rng.shuffle(CONT).slice(0, 2)]);
  const okSigns = rng.shuffle(SIGN_OK);
  const wrongs = [0, 1, 2].map((i) => rng.shuffle([okSigns[i], ...rng.shuffle(CONT).slice(0, 2)]));
  const opt = (cs) => `γ(t) = (${cs.map((c) => c.show).join(' ; ')})`;
  const options = [{ html: opt(right), correct: true }, ...wrongs.map((cs) => ({ html: opt(cs), correct: false, rule: cs.some((c) => c.g0 === 0) ? 'a2_curve_sign_factor' : null }))];
  return mcq({
    skill: CP, level, prompt: t('sign(t) vaut 1 si t > 0, −1 si t < 0 et 0 si t = 0. Laquelle de ces courbes γ : ℝ → ℝ³ a un point de discontinuité ?'), options,
    key: `cont:${bad.show}:${okSigns.slice(0, 3).map((c) => c.show).join(',')}`, expectedSec: 90,
    solution: [{ html: t('{bad} saute en t = {at} : les limites à gauche et à droite diffèrent. Les produits sign(t)·g(t) avec g(0) = 0 (comme {ok}) tendent vers 0 des deux côtés : ils sont continus.', { bad: bad.show, at: bad.at, ok: okSigns[0].show }), note: '' }],
    exam: exam ? { format: 'mcq', points: 1 } : false,
  }, rng);
}

// Which parametrisation is the helix described (the drawing of 2016, in words).
function helixMcq(level, rng, exam) {
  const a = rng.pick([1, 2, 3]);
  const b = rng.pick([1, 2, 3].filter((x) => x !== a));
  const A = a === 1 ? '' : a;
  const B = b === 1 ? '' : b;
  const right = `(${A}cos t ; ${A}sin t ; ${B}t)`;
  const options = [
    { html: `γ(t) = ${right}`, correct: true },
    { html: `γ(t) = (${B}cos t ; ${B}sin t ; ${A}t)`, correct: false },
    { html: `γ(t) = (${A}cos t ; ${B}t ; ${A}sin t)`, correct: false },
    { html: `γ(t) = (t cos t ; t sin t ; ${B}t)`, correct: false },
  ];
  return mcq({
    skill: CP, level, prompt: t('Quelle courbe est une hélice d\'axe Oz, sur le cylindre x² + y² = {r2}, qui monte de {h} à chaque tour ?', { r2: a * a, h: b === 1 ? '2π' : `${b}·2π` }), options,
    key: `helix:${a}:${b}`, expectedSec: 60,
    solution: [{ html: t('x² + y² = {r2}(cos²t + sin²t) = {r2} : le rayon est {a}. Un tour, c\'est t → t + 2π, et z augmente de {h}. (t cos t, t sin t, …) a un rayon qui grandit : c\'est une spirale sur un cône.', { r2: a * a, a, h: b === 1 ? '2π' : `${b}·2π` }), note: '' }],
    exam: exam ? { format: 'mcq', points: 1 } : false,
  }, rng);
}

function vfMcq(skill, statement, truth, rng, { key, why, ruleIfTrue = null, ruleIfFalse = null }) {
  return mcq({
    skill, level: 4, prompt: t('Vrai ou faux ?<br>« {s} »', { s: statement }), keepOrder: true,
    options: [{ html: t('Vrai'), correct: truth, rule: truth ? null : ruleIfTrue }, { html: t('Faux'), correct: !truth, rule: truth ? ruleIfFalse : null }],
    key: `tf:${key}`, solution: [{ html: why, note: '' }], expectedSec: 60, exam: { format: 'tf', points: 1 },
  }, rng);
}

function cpTf(rng) {
  const exam = { format: 'tf', points: 1 };
  const kind = rng.pick(['comp', 'cont', 'c1', 'norm', 'tangent', 'signOk', 'signBad']);
  if (kind === 'c1') {
    return tfItem({
      skill: CP, level: 4, statement: t('Une courbe γ : ℝ → ℝ² de classe C¹ est lisse : γ′(t) ≠ 0 pour tout t.'), truth: false, exam, key: kind,
      counter: { kind: 'a2', prop: 'curveNotSmooth', params: { dim: 2 }, ask: [{ v: 'x', label: 'x(t) =', keys: ['calc'] }, { v: 'y', label: 'y(t) =', keys: ['calc'] }], answer: { x: 't^2', y: 't^3' } },
      explanation: t('Faux : γ(t) = (t², t³) est de classe C¹, mais γ′(0) = (0, 0) : la courbe a un point de rebroussement en 0.'),
    });
  }
  if (kind === 'norm') return vfMcq(CP, t('Si t ↦ ‖γ(t)‖ est continue, alors γ est continue.'), false, rng, { key: kind, why: t('Faux : γ(t) = (1, 0) pour t ≥ 0 et (−1, 0) pour t < 0 ; ‖γ(t)‖ = 1 est continue, mais γ saute en 0.') });
  if (kind === 'signOk') return vfMcq(CP, t('t ↦ sign(t)·(eᵗ − 1) est continue en 0.'), true, rng, { key: kind, ruleIfFalse: 'a2_curve_sign_factor', why: t('Vrai : |sign(t)·(eᵗ − 1)| ≤ |eᵗ − 1| → 0, et la valeur en 0 est 0.') });
  if (kind === 'signBad') return vfMcq(CP, t('t ↦ sign(t)·cos t est continue en 0.'), false, rng, { key: kind, why: t('Faux : elle tend vers 1 à droite et vers −1 à gauche.') });
  const T = {
    comp: [t('Si chaque composante de γ : I → ℝ³ est continue, alors γ est continue.'), t('Vrai : γ est continue si et seulement si chaque composante l\'est.')],
    cont: [t('Si γ : I → ℝ³ est continue, alors chacune de ses composantes est continue.'), t('Vrai : |γᵢ(t) − γᵢ(t₀)| ≤ ‖γ(t) − γ(t₀)‖.')],
    tangent: [t('Si γ est dérivable en t₀ et γ′(t₀) ≠ 0, la droite γ(t₀) + s·γ′(t₀), s ∈ ℝ, est tangente à la courbe en γ(t₀).'), t('Vrai : c\'est la définition de la tangente.')],
  }[kind];
  return tfItem({ skill: CP, level: 4, statement: T[0], truth: true, exam, key: kind, explanation: T[1] });
}

export function curveParamItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return cpTf(rng);
  if (opts.exam === 'mcq') return rng.chance(0.65) ? contMcq(4, rng, true) : helixMcq(4, rng, true);
  if (level === 5) return { ...contMcq(5, rng, false), noHints: true, hints: [] };
  return cpLines(level, rng);
}

// ======================================================================
// a2-curve-length
// ======================================================================

// Families with a « nice » speed: comps (texts in t), d (derivatives), sq
// (‖γ′‖² expanded), goal (the square), speed, a, b, L (texts).
function lengthData(rng, { family = null } = {}) {
  const f = family || rng.pick(['helix', 'helix', 'log', 'exp', 'cyc', 'astro', 'cubic', 'cubic2', 'cusp']);
  if (f === 'helix') {
    const [A, B, C] = rng.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 6, 10]]);
    const [T, Tt] = rng.pick([[2, '2π'], [1, 'π'], [4, '4π']]);
    return {
      f, comps: [`${A}cos(t)`, `${A}sin(t)`, `${B}t`], d: [`-${A}sin(t)`, `${A}cos(t)`, `${B}`],
      sq: `${A * A}sin(t)^2+${A * A}cos(t)^2+${B * B}`, goal: `${C * C}`, speed: `${C}`, a: '0', b: Tt, L: `${C * T === 1 ? '' : C * T}π`,
      sum: `-${A}sin(t)+${A}cos(t)+${B}`, prim: `${C}t`,
    };
  }
  if (f === 'log') {
    const k = rng.pick([1, 1, 2, 3]);
    const [b, L] = rng.pick([['e', k === 1 ? 'e^2' : `${k}e^2`], ['e^2', k === 1 ? 'e^4+1' : `${k}e^4+${k}`], ['2', k === 1 ? '3+ln(2)' : `${3 * k}+${k}ln(2)`]]);
    const K = k === 1 ? '' : k;
    return {
      f, comps: [`${2 * k}t`, `${K}t^2`, `${K}ln(t)`], d: [`${2 * k}`, `${2 * k}t`, `${k}/t`],
      sq: `${4 * k * k}+${4 * k * k}t^2+${k * k}/t^2`, goal: `(${2 * k}t+${k}/t)^2`, speed: `${2 * k}t+${k}/t`, a: '1', b, L,
      sum: `${2 * k}+${2 * k}t+${k}/t`, prim: `${K}t^2+${K}ln(t)`,
    };
  }
  if (f === 'exp') {
    const [b, L] = rng.pick([['1', '√3e-√3'], ['ln(2)', '√3'], ['ln(3)', '2√3']]);
    return {
      f, comps: ['e^t×cos(t)', 'e^t×sin(t)', 'e^t'], d: ['e^t×(cos(t)-sin(t))', 'e^t×(sin(t)+cos(t))', 'e^t'],
      sq: '2e^(2t)+e^(2t)', goal: '3e^(2t)', speed: '√3×e^t', a: '0', b, L,
      sum: 'e^t×(cos(t)-sin(t))+e^t×(sin(t)+cos(t))+e^t', prim: '√3×e^t',
    };
  }
  if (f === 'cyc') {
    const A = rng.pick([1, 2, 3]);
    const K = A === 1 ? '' : A;
    const [b, L] = rng.pick([['2π', `${8 * A}`], ['π', `${4 * A}`]]);
    return {
      f, plane: true, comps: [`${K}(t-sin(t))`, `${K}(1-cos(t))`], d: [`${K}(1-cos(t))`, `${K}sin(t)`],
      sq: `${A * A}(1-cos(t))^2+${A * A}sin(t)^2`, goal: `${4 * A * A}sin(t/2)^2`, speed: `${2 * A}sin(t/2)`, a: '0', b, L,
      sum: `${K}(1-cos(t))+${K}sin(t)`, prim: `-${4 * A}cos(t/2)`,
    };
  }
  if (f === 'astro') {
    const A = rng.pick([1, 2, 4]);
    const K = A === 1 ? '' : A;
    return {
      f, plane: true, comps: [`${K}cos(t)^3`, `${K}sin(t)^3`], d: [`-${3 * A}cos(t)^2×sin(t)`, `${3 * A}sin(t)^2×cos(t)`],
      sq: `${9 * A * A}cos(t)^4×sin(t)^2+${9 * A * A}sin(t)^4×cos(t)^2`, goal: `${9 * A * A}sin(t)^2×cos(t)^2`, speed: `${3 * A}sin(t)×cos(t)`, a: '0', b: 'π/2',
      L: new Q(3 * A, 2).toString(), sum: `-${3 * A}cos(t)^2×sin(t)+${3 * A}sin(t)^2×cos(t)`, prim: `${new Q(3 * A, 2)}sin(t)^2`,
    };
  }
  if (f === 'cubic') {
    const b = rng.pick([1, 2]);
    return {
      f, comps: ['3t', '3t^2', '2t^3'], d: ['3', '6t', '6t^2'], sq: '9+36t^2+36t^4', goal: '(6t^2+3)^2', speed: '6t^2+3', a: '0', b: String(b),
      L: String(2 * b ** 3 + 3 * b), sum: '3+6t+6t^2', prim: '2t^3+3t',
    };
  }
  if (f === 'cubic2') {
    const b = rng.pick([1, 3]);
    return {
      f, comps: ['2t', 't^2', 't^3/3'], d: ['2', '2t', 't^2'], sq: '4+4t^2+t^4', goal: '(t^2+2)^2', speed: 't^2+2', a: '0', b: String(b),
      L: new Q(b ** 3, 3).add(new Q(2 * b)).toString(), sum: '2+2t+t^2', prim: 't^3/3+2t',
    };
  }
  return {
    f: 'cusp', plane: true, comps: ['t^2', 't^3'], d: ['2t', '3t^2'], sq: '4t^2+9t^4', goal: 't^2(4+9t^2)', speed: 't√(4+9t^2)', a: '0', b: '1',
    L: '(13√13-8)/27', sum: '2t+3t^2', prim: '(4+9t^2)^(3/2)/27',
  };
}

const CL_SUB = [
  { id: 'deriv', label: t('dériver γ'), skill: CP },
  { id: 'square', label: t('reconnaître un carré'), skill: 'rat-simplify' },
  { id: 'setup', label: 'L = ∫ ‖γ′‖ dt', skill: CL },
  { id: 'integrate', label: t('primitive et bornes'), skill: 'a1-int-direct' },
];
const CL_CHOICES = [
  { id: 'deriv', label: t('Dériver chaque composante, puis élever au carré') },
  { id: 'expand', label: t('Développer et réduire') },
  { id: 'square', label: t('Reconnaître un carré (ou une constante)') },
  { id: 'root', label: t('Prendre la racine : ‖γ′(t)‖') },
  { id: 'sum', label: t('Remplacer ‖γ′‖ par x′ + y′ + z′'), rule: 'a2_arc_sum_components', why: t('La vitesse est la norme de γ′, pas la somme de ses composantes.') },
  { id: 'nosqrt', label: t('Intégrer ‖γ′‖² sans la racine'), rule: 'a1_arc_length_no_sqrt', why: t('La longueur intègre ‖γ′‖, avec la racine.') },
  { id: 'prim', label: t('Primitive, puis les bornes') },
];
const fmtB = (b) => fr(b).replace(/\^(\d)/g, (m, d) => ({ 2: '²', 4: '⁴' }[d] || m));

function clLines(level, rng, opts = {}) {
  const d = lengthData(rng, { family: level === 5 ? rng.pick(['helix', 'cyc']) : null });
  const lo = Math.min(...[d.a].map(Number).filter(Number.isFinite), 0);
  void lo;
  const dom = { t: d.a === '0' ? [0.05, 1.5] : [1.05, 2.5] };
  const eqj = { kind: 'equiv', vars: ['t'], dvar: 't', domain: dom, target: 'goal', goal: d.goal };
  const start = d.comps.map((c) => `d(${c},t)^2`).join('+');
  const dsq = d.d.map((x) => `(${x})^2`).join('+');
  const sqLines = [
    E(dsq, t('Dériver chaque composante'), 'deriv', 'deriv'),
    E(d.sq, t('Développer'), 'square', 'expand'),
    E(d.goal, d.f === 'helix' ? t('cos² + sin² = 1 : une constante') : t('Un carré'), 'square', 'square'),
  ];
  // Level 1: the first term of the square is left blank (when it is one).
  const first = d.speed.split('+')[0];
  if (level === 1 && first !== d.speed && !/[(√]/.test(first)) Object.assign(sqLines[2], tpl(d.goal, [first], TV));
  const I0 = `int(√(${d.sq}),t,${d.a},${d.b})`;
  const v = sup(d.speed).replace(/×/g, '·');
  const vNote = d.f === 'cyc' ? t('‖γ′(t)‖ = {v} (sin(t/2) ≥ 0 sur l\'intervalle)', { v }) : d.f === 'astro' || d.f === 'cusp' ? t('‖γ′(t)‖ = {v} (positif sur l\'intervalle)', { v }) : `‖γ′(t)‖ = ${v}`;
  const Lp = [E(`int(${d.speed},t,${d.a},${d.b})`, vNote, 'setup', 'root'),
    E(`bracket(${d.prim},t,${d.a},${d.b})`, t('Une primitive'), 'integrate', 'prim'),
    E(d.L, t('Les bornes'), 'integrate', 'prim')];
  if (level === 1) Object.assign(Lp[0], tpl(Lp[0].math, [d.speed], TV));
  if (level <= 2) Object.assign(Lp[2], tpl(d.L, [d.L], TV));
  const defj = { kind: 'definite', arc: { sum: d.sum, a: d.a, b: d.b } };
  const choice = {
    kind: 'decision', prompt: t('La vitesse ‖γ′(t)‖ vaut :'),
    options: [
      { id: 'root', label: sup(d.speed), valid: true },
      { id: 'sum', label: sup(d.sum), valid: false, rule: 'a2_arc_sum_components', why: t('C\'est la somme des composantes de γ′, pas sa norme.') },
      { id: 'nosqrt', label: sup(d.goal), valid: false, rule: 'a1_arc_length_no_sqrt', why: t('C\'est ‖γ′‖² : il manque la racine.') },
    ],
  };
  const parts = [
    { start, judge: eqj, lines: sqLines },
    { html: t('La longueur L :'), ask: 'L =', start: I0, judge: defj, pre: level === 1 ? [{ kind: 'note', html: `‖γ′(t)‖ = ${MT(`√(${d.goal})`, TV)} = ${MT(d.speed, TV)}` }] : level === 2 ? [choice] : [], lines: Lp },
  ];
  const script = [];
  parts.forEach((p, i) => {
    const judge = withMenus(p.judge, level, p.start, p.lines, CL_CHOICES);
    if (i > 0) script.push(SEG(p.html, p.ask, p.start, judge));
    script.push(...(p.pre || []), ...p.lines);
  });
  const ab = `[${fmtB(d.a)} ; ${fmtB(d.b)}]`;
  const pv = { c: d.comps.map((c) => MT(c, TV)).join(' ; '), ab };
  return linesItem({
    skill: CL, level, mode: modeOf(level), start, judge: withMenus(eqj, level, start, sqLines, CL_CHOICES), script,
    prompt: d.f === 'helix' ? t('γ(t) = ({c}), t ∈ {ab}. Calcule ‖γ′(t)‖² et écris-le comme un carré (ici une constante), puis la longueur L de la courbe.', pv)
      : d.f === 'cusp' ? t('γ(t) = ({c}), t ∈ {ab}. Calcule ‖γ′(t)‖² et écris-le comme un carré (ici t² fois un facteur), puis la longueur L de la courbe.', pv)
        : t('γ(t) = ({c}), t ∈ {ab}. Calcule ‖γ′(t)‖² et écris-le comme un carré, puis la longueur L de la courbe.', pv),
    hints: H(t('L = ∫ ‖γ′(t)‖ dt : dérive chaque composante, additionne les carrés, cherche un carré parfait.'),
      `‖γ′(t)‖² = ${MT(d.sq, TV)} = ${MT(d.goal, TV)}`,
      `L = ${MT(Lp[0].math, TV)} = ${MT(d.L, TV)}`),
    subgoals: CL_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    baits: ['a2_arc_sum_components', 'a1_arc_length_no_sqrt'],
    key: `${CL}:${level}:${d.comps.join(',')}:${d.b}`, exam: opts.exam ? { format: opts.exam, points: 1 } : false,
  });
}

// Exam mcq: which integral is the length.
function clMcq(rng) {
  const d = lengthData(rng);
  const I = (f) => MT(`int(${f},t,${d.a},${d.b})`, TV);
  const options = [
    { html: I(d.speed), correct: true },
    { html: I(d.goal), correct: false, rule: 'a1_arc_length_no_sqrt' },
    { html: I(d.sum), correct: false, rule: 'a2_arc_sum_components' },
    { html: I(`√(${d.sum})`), correct: false },
  ];
  return mcq({
    skill: CL, level: 4, prompt: t('γ(t) = ({c}), t ∈ [{a} ; {b}]. Quelle intégrale donne la longueur de la courbe ?', { c: d.comps.map((c) => MT(c, TV)).join(' ; '), a: fmtB(d.a), b: fmtB(d.b) }), options,
    key: `mcq:${d.comps.join(',')}:${d.b}`, expectedSec: 120, exam: { format: 'mcq', points: 1 },
    solution: [{ html: t('γ′(t) = ({d}), ‖γ′(t)‖² = {sq}, donc L = {I} = {L}.', { d: d.d.map((x) => MT(x, TV)).join(' ; '), sq: MT(d.goal, TV), I: I(d.speed), L: MT(d.L, TV) }), note: '' }],
  }, rng);
}

const C3 = [{ v: 'x', label: 'x(t) =', keys: ['calc'] }, { v: 'y', label: 'y(t) =', keys: ['calc'] }, { v: 'z', label: 'z(t) =', keys: ['calc'] }];
function clTf(rng) {
  const exam = { format: 'tf', points: 1 };
  const kind = rng.pick(['param', 'sum', 'chord', 'ineq', 'unit', 'square']);
  if (kind === 'sum') {
    return tfItem({
      skill: CL, level: 4, statement: t('La longueur de γ = (x, y, z) sur [0 ; 1] vaut ∫₀¹ (x′(t) + y′(t) + z′(t)) dt.'), truth: false, exam, key: kind,
      counter: { kind: 'a2', prop: 'arcCurve', params: { test: 'sum', a: '0', b: '1' }, ask: C3, answer: { x: 't', y: '-t', z: '0' } },
      ruleIfTrue: 'a2_arc_sum_components',
      explanation: t('Faux : la vitesse est ‖γ′‖ = √(x′² + y′² + z′²). Pour γ(t) = (t, −t, 0), ∫ (x′ + y′ + z′) dt = 0, mais L = √2.'),
    });
  }
  if (kind === 'square') {
    return tfItem({
      skill: CL, level: 4, statement: t('La longueur de γ sur [0 ; 1] vaut ∫₀¹ ‖γ′(t)‖² dt.'), truth: false, exam, key: kind,
      counter: { kind: 'a2', prop: 'arcCurve', params: { test: 'square', a: '0', b: '1' }, ask: C3, answer: { x: '2t', y: '0', z: '0' } },
      ruleIfTrue: 'a1_arc_length_no_sqrt',
      explanation: t('Faux : il faut la racine. γ(t) = (2t, 0, 0) a la longueur 2 sur [0 ; 1], mais ∫₀¹ ‖γ′‖² dt = 4.'),
    });
  }
  if (kind === 'chord') {
    return tfItem({
      skill: CL, level: 4, statement: t('La longueur de γ sur [0 ; 1] vaut ‖γ(1) − γ(0)‖.'), truth: false, exam, key: kind,
      counter: { kind: 'a2', prop: 'arcCurve', params: { test: 'chord', a: '0', b: '1' }, ask: C3, answer: { x: 't', y: 't^2', z: '0' } },
      explanation: t('Faux : ‖γ(1) − γ(0)‖ est la longueur du segment ; une courbe qui n\'est pas droite est plus longue. Pour (t, t², 0) : L ≈ 1,48 > √2.'),
    });
  }
  const T = {
    param: [t('La longueur d\'une courbe ne dépend pas de sa paramétrisation (injective et régulière).'), t('Vrai : avec t = φ(u), φ′ > 0, ∫ ‖γ′(φ(u))‖·φ′(u) du = ∫ ‖γ′(t)‖ dt.')],
    ineq: [t('La longueur de γ sur [a ; b] est au moins ‖γ(b) − γ(a)‖.'), t('Vrai : ‖γ(b) − γ(a)‖ = ‖∫ γ′‖ ≤ ∫ ‖γ′‖ ; la ligne droite est le plus court chemin.')],
    unit: [t('Si ‖γ′(t)‖ = 1 pour tout t, la longueur de γ sur [a ; b] vaut b − a.'), t('Vrai : L = ∫ₐᵇ 1 dt = b − a (paramétrage par la longueur d\'arc).')],
  }[kind];
  return tfItem({ skill: CL, level: 4, statement: T[0], truth: true, exam, key: kind, explanation: T[1] });
}

export function curveLengthItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return clMcq(rng);
  if (opts.exam === 'tf') return clTf(rng);
  return clLines(level, rng);
}
