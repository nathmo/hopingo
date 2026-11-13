// Generators of module G6, part b (unit `analyse0`, step U2): implicit
// derivatives (g6-deriv-implicit) and imposed tangents (g6-common-tangent).
// Catalogue: docs/universite/G-gymnase-2.md, G6.
//
// The derivative of F(x, y) is judged by `equiv` with cfg.implicit =
// {y: 'p'} (js/judges/equiv.js): y is a function of x, d(…) is the total
// derivative and the student writes y′ (or p). The derived line is
// compared as an identity in x, y, y′ (the catalogue's « compare on the
// curve » is not built: no line needs it, y′ is isolated from the derived
// equation, where the identity holds for every x, y). Isolating y′ is an
// equation in p (`solset` with x and y as parameters, sampled where the
// coefficient of p does not vanish); the slope is a `value`; the tangent
// « y = … » is `equiv` in x. y₀ from x₀ is an equation in y (`solset`,
// x replaced by x₀ through `subst`).
// Imposed tangent (gabarit 1): derive, put y′ = m and y = mx + h (T ∈ t)
// into the derived equation (`solset` in x), choose T, then T ∈ Γ gives
// the parameter p (`solset` in p).

import { Q, gcd } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { paramSamples } from '../../judges/solset.js';
import { templateOf } from '../../judges/lines.js';
import { parseOpts } from '../../judges/common.js';
import { MT, fr, linesItem, mcq, answerItem } from './kit.js';
import {
  q, qText, nz, modeOf, H, E, examOf, seg, xMinus, polyText, polyMul, polyEval, polyTrim,
  blanked, blankWhere, withMenus,
} from './analyse0-b-kit.js';
import { t } from '../../i18n.js';

const KEYS = ['calcx', 'calcfn', 'anal', 'relation'];

// ---------- polynomials in x and y: [{c: Q, i, j}] for c·xⁱyʲ ----------

const mono = (c, i, j) => ({ c: Q.of(c), i, j });
// c·xⁱyʲ as text, the coefficient ±1 written as a sign; × between letters.
function monoText(m, { x = 'x', y = 'y' } = {}) {
  const parts = [];
  if (m.i) parts.push(m.i === 1 ? x : `${x}^${m.i}`);
  if (m.j) parts.push(m.j === 1 ? y : `${y}^${m.j}`);
  const body = parts.join('×');
  const a = m.c.n < 0 ? m.c.neg() : m.c;
  const coef = !body ? qText(a) : a.eq(1) ? '' : `${qText(a)}`;
  return `${m.c.n < 0 ? '-' : ''}${coef}${body}`;
}
const joinTerms = (ts) => ts.filter((x) => x && x !== '0').reduce((s, x) => (s ? (x.startsWith('-') ? `${s}${x}` : `${s}+${x}`) : x), '') || '0';
const polyXY = (ms, names) => joinTerms(ms.filter((m) => m.c.n !== 0).map((m) => monoText(m, names)));
const dX = (ms) => ms.filter((m) => m.i > 0).map((m) => mono(m.c.mul(m.i), m.i - 1, m.j));
const dY = (ms) => ms.filter((m) => m.j > 0).map((m) => mono(m.c.mul(m.j), m.i, m.j - 1));
const evalXY = (ms, x, y) => ms.reduce((s, m) => s.add(m.c.mul(Q.of(x).pow(m.i)).mul(Q.of(y).pow(m.j))), q(0));
// Collect equal monomials.
function collect(ms) {
  const map = new Map();
  for (const m of ms) {
    const k = `${m.i},${m.j}`;
    map.set(k, map.has(k) ? mono(map.get(k).c.add(m.c), m.i, m.j) : m);
  }
  return [...map.values()].filter((m) => m.c.n !== 0);
}
// The polynomial in x obtained with y = m·x + h: coefficients [c0, c1, …].
function onLine(ms, m, h) {
  let out = [q(0)];
  for (const tm of ms) {
    let p = [tm.c];
    for (let k = 0; k < tm.i; k++) p = polyMul(p, [q(0), q(1)]);
    for (let k = 0; k < tm.j; k++) p = polyMul(p, [Q.of(h), Q.of(m)]);
    out = Array.from({ length: Math.max(out.length, p.length) }, (_, k) => (out[k] ?? q(0)).add(p[k] ?? q(0)));
  }
  return polyTrim(out);
}
// A value written in a line: 3, (-2).
const vText = (x) => (Q.of(x).n < 0 ? `(${qText(x)})` : qText(x));
// c·x₀ⁱ·y₀ʲ written out for the slope line: 3×1^2.
function monoAt(m, x0, y0) {
  const fs = [];
  const a = m.c.n < 0 ? m.c.neg() : m.c;
  if (!a.eq(1) || (!m.i && !m.j)) fs.push(qText(a));
  if (m.i) fs.push(m.i === 1 ? vText(x0) : `${vText(x0)}^${m.i}`);
  if (m.j) fs.push(m.j === 1 ? vText(y0) : `${vText(y0)}^${m.j}`);
  return `${m.c.n < 0 ? '-' : ''}${fs.join('×')}`;
}
const polyAt = (ms, x0, y0) => joinTerms(ms.map((m) => monoAt(m, x0, y0)));

// The derived line: for each monomial, its x part, then its y part × y′.
function derivedLine(ms, yp = "y'") {
  const out = [];
  for (const m of ms) {
    if (m.i) out.push(monoText(mono(m.c.mul(m.i), m.i - 1, m.j)));
    if (m.j) {
      const tm = mono(m.c.mul(m.j), m.i, m.j - 1);
      const body = monoText(tm);
      if (yp === '1') out.push(body);
      else out.push(body === '1' ? yp : body === '-1' ? `-${yp}` : `${body}×${yp}`);
    }
  }
  return joinTerms(out);
}

const IMPLICIT = (extra = []) => ({
  kind: 'equiv', vars: ['x', 'y', 'p', ...extra], implicit: { y: 'p' }, target: 'no-prime',
  domain: Object.fromEntries(['x', 'y', 'p', ...extra].map((v) => [v, [-2, 2]])),
});

// Parameter sets for x and y where the coefficient of p never vanishes.
const PARAM_SETS = [['[1;5]', '[2;4]'], ['[-5;-1]', '[2;4]'], ['[1;5]', '[-4;-2]'], ['[-5;-1]', '[-4;-2]'], ['[2;6]', '[-3;-1]']];
function paramsFor(Fy) {
  for (const [a, b] of PARAM_SETS) {
    const cfg = { params: { x: a, y: b } };
    if (paramSamples(cfg).every((env) => evalXY(Fy, env.x, env.y).n !== 0)) return cfg.params;
  }
  return null;
}

// ======================================================================
// g6-deriv-implicit
// ======================================================================

const IM = 'g6-deriv-implicit';
const IM_SUB = [
  { id: 'point', label: t('trouver le point'), skill: 'g0-factor-thm' },
  { id: 'derive', label: t('dériver par rapport à x'), skill: 'g6-deriv-rules' },
  { id: 'isolate', label: t('isoler y′'), skill: IM },
  { id: 'slope', label: t('pente au point'), skill: IM },
  { id: 'tangent', label: t('tangente'), skill: 'g6-tangent' },
];
const IM_CHOICES = [
  { id: 'point', label: t('Trouver y₀ : remplacer x par x₀ dans l\'équation') },
  { id: 'derive', label: t('Dériver chaque terme par rapport à x (× y′ pour les termes en y)') },
  { id: 'isolate', label: t('Isoler y′') },
  { id: 'eval', label: t('Évaluer y′ en (x₀ ; y₀)') },
  { id: 'tangent', label: t('Écrire la tangente y = y₀ + m(x − x₀)') },
  { id: 'forget', label: t('Dériver les termes en y comme si y était x'), rule: 'g6_implicit_yprime_forgot', why: t('y dépend de x : chaque terme en y dérivé donne un facteur y′ (règle de chaîne).') },
];

const MIXED = [[1, 1], [2, 1], [1, 2]];
const OTHERS = [[2, 0], [3, 0], [1, 0], [0, 2], [0, 1]];

function imData(rng) {
  for (let i = 0; i < 300; i++) {
    const x0 = rng.int(-2, 2);
    const y0 = rng.int(-2, 2);
    const shapes = [[0, 3], rng.pick(MIXED), ...rng.shuffle(OTHERS).slice(0, rng.int(1, 2))];
    const ms = shapes.map(([a, b], k) => mono(k === 0 ? rng.pick([1, -1]) : nz(rng, -3, 3), a, b));
    // Order: by total degree, x first (x² + xy + y³).
    ms.sort((u, w) => (u.i + u.j) - (w.i + w.j) || w.i - u.i);
    const c = evalXY(ms, x0, y0);
    if (Math.abs(c.n) > 30) continue;
    // At x = x₀: Q(y) = P(x₀, y) − c = s(y − y₀)(…), the rest without real root.
    const Qy = [q(0), q(0), q(0), q(0)];
    for (const m of ms) Qy[m.j] = Qy[m.j].add(m.c.mul(Q.of(x0).pow(m.i)));
    Qy[0] = Qy[0].sub(c);
    // Synthetic division by (y − y₀).
    const q2 = [Qy[3]];
    q2.push(Qy[2].add(q2[0].mul(y0)));
    q2.push(Qy[1].add(q2[1].mul(y0)));
    const disc = q2[1].mul(q2[1]).sub(q2[0].mul(q2[2]).mul(4));
    if (disc.n >= 0) continue;
    const Fx = dX(ms);
    const Fy = dY(ms);
    const fy0 = evalXY(Fy, x0, y0);
    const fx0 = evalXY(Fx, x0, y0);
    if (fy0.n === 0 || fx0.n === 0) continue;
    const slope = fx0.div(fy0).neg();
    if (slope.d > 6 || Math.abs(slope.valueOf()) > 6) continue;
    const h = Q.of(y0).sub(slope.mul(x0));
    if (h.d > 6) continue;
    const params = paramsFor(Fy);
    if (!params) continue;
    // The lines in y after x = x₀ must not all vanish (a real equation).
    if (Qy.slice(1).every((v) => v.n === 0)) continue;
    return { x0, y0, ms, c, Qy, q2, Fx, Fy, slope, h, params };
  }
  const ms = [mono(1, 2, 0), mono(1, 1, 1), mono(1, 0, 3)];
  return { x0: 1, y0: 1, ms, c: q(3), Qy: [q(-2), q(1), q(0), q(1)], q2: [q(1), q(1), q(2)], Fx: dX(ms), Fy: dY(ms), slope: q(-3, 4), h: q(7, 4), params: { x: '[1;5]', y: '[2;4]' }, fallback: true };
}

function imShape(d) {
  const P = polyXY(d.ms);
  const eq = `${P}=${qText(d.c)}`;
  const derived = derivedLine(d.ms);
  const FxT = polyXY(collect(d.Fx));
  const FyT = polyXY(collect(d.Fy));
  const negFx = polyXY(collect(d.Fx).map((m) => mono(m.c.neg(), m.i, m.j)));
  const pEq = `${derivedLine(d.ms, 'p')}=0`;
  const fyPar = /[+-]/.test(FyT.slice(1)) ? `(${FyT})` : FyT;
  const isolated = `p(${FyT})=${negFx}`;
  const sum = (tm) => /[+-]/.test(tm.slice(1));
  const pFinal = `p=${negFx.startsWith('-') ? (sum(FxT) ? `-(${FxT})` : negFx) : sum(negFx) ? `(${negFx})` : negFx}/${fyPar}`;
  const slopeStart = `${negFx.startsWith('-') ? `-(${polyAt(collect(d.Fx), d.x0, d.y0)})` : `(${polyAt(collect(d.Fx).map((m) => mono(m.c.neg(), m.i, m.j)), d.x0, d.y0)})`}/(${polyAt(collect(d.Fy), d.x0, d.y0)})`;
  // y₀: the equation in y at x = x₀.
  const yEq = `${polyText(d.Qy, 'y')}=0`;
  const lead = d.q2[0];
  const quad = polyText(lead.n < 0 ? d.q2.map((c) => c.neg()).reverse() : [...d.q2].reverse(), 'y');
  const yFactor = `${lead.n < 0 ? '-' : ''}${d.y0 === 0 ? 'y' : `(${xMinus(d.y0, 'y')})`}(${quad})=0`;
  const tangentStart = `${qText(d.y0)}+(${qText(d.slope)})${d.x0 === 0 ? 'x' : `(${xMinus(d.x0)})`}`.replace(/^0\+/, '');
  const tangent = polyText([d.h, d.slope]);
  return { P, eq, derived, FxT, FyT, negFx, pEq, isolated, pFinal, slopeStart, yEq, yFactor, tangentStart, tangent };
}

const imJudge = () => IMPLICIT();
const isoJudge = (d) => ({ kind: 'solset', v: 'p', params: d.params });
const tanJudge = { kind: 'equiv', vars: ['x'], target: 'expanded', domain: { x: [-3, 3] } };

const derivSeg = (s, level) => seg(t('Dérive les deux membres par rapport à x. Le membre de droite est constant : sa dérivée est 0. y dépend de x : écris y′.'), '0 =', `d(${s.P})`, withMenus(imJudge(), level, `d(${s.P})`, [E(s.derived, '', '', 'derive')], IM_CHOICES));

function imHints(s) {
  const holed = blankWhere({ math: s.derived }, (n) => n.t === 'bin' && n.op === '×' && n.r?.t === 'deriv', IMPLICIT(), 1);
  return H(
    t('Dérive chaque terme ; chaque fois que tu dérives une expression en y, multiplie par y′. Puis isole y′.'),
    `${MT(holed.blanks ? templateOf(holed, parseOpts(IMPLICIT())) : s.derived, { vars: ['x', 'y', 'p'] })} = 0`,
    `y′ = ${MT(s.pFinal.replace(/^p=/, ''))}`,
  );
}

function imDecision(d, rng) {
  const mixed = d.ms.find((m) => m.i && m.j);
  if (mixed && rng.chance(0.5)) {
    const tm = monoText(mono(1, mixed.i, mixed.j));
    const right = derivedLine([mono(1, mixed.i, mixed.j)]);
    const xpart = monoText(mono(mixed.i, mixed.i - 1, mixed.j));
    return {
      kind: 'decision', prompt: t('Que vaut la dérivée de {e} par rapport à x ?', { e: MT(tm) }), options: [
        { id: 'prod', label: MT(right), valid: true, ref: true },
        { id: 'xy', label: MT(derivedLine([mono(1, mixed.i, mixed.j)]).replace(`${xpart}+`, '').replace(/^1\+/, '')), valid: false, rule: 'g6_implicit_xy', why: t('{e} est un produit de deux fonctions de x : (uv)′ = u′v + uv′.', { e: MT(tm) }) },
        { id: 'zero', label: MT(xpart), valid: false, rule: 'g6_implicit_yprime_forgot', why: t('y dépend de x : sa dérivée y′ ne disparaît pas.') },
      ],
    };
  }
  return {
    kind: 'decision', prompt: t('Que vaut la dérivée de {e} par rapport à x ?', { e: MT('y^3') }), options: [
      { id: 'chain', label: MT("3y^2×y'"), valid: true, ref: true },
      { id: 'forgot', label: MT('3y^2'), valid: false, rule: 'g6_implicit_yprime_forgot', why: t('y dépend de x : par la règle de chaîne, (y³)′ = 3y²·y′, comme (sin 3x)′ = 3cos 3x.') },
      { id: 'zero', label: MT('0'), valid: false, why: t('y n\'est pas une constante : il dépend de x.') },
    ],
  };
}

function imItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return imMcq(rng);
  if (opts.exam === 'coef') return imCoef(rng);
  const d = imData(rng);
  const s = imShape(d);
  const key = `${IM}:${s.eq}:${d.x0}`;
  const derive = E(s.derived, t('Dériver par rapport à x'), 'derive', 'derive');
  const hints = imHints(s);
  const common = { skill: IM, level, subgoals: IM_SUB, keys: KEYS, hints, fallback: !!d.fallback, declares: { vars: ['x', 'y', 'p'] } };
  const iso = [E(s.isolated, t('Regrouper les termes en p'), 'isolate', 'isolate'), E(s.pFinal, t('Diviser'), 'isolate', 'isolate')];
  if (level === 1 && !opts.exam) {
    const line = blankWhere(derive, (n) => n.t === 'bin' && n.op === '×' && n.r?.t === 'deriv', {}, 2);
    return linesItem({
      ...common, prompt: t('Γ : {e}. y dépend de x : dérive les deux membres par rapport à x.', { e: MT(s.eq) }),
      start: `d(${s.P})`, judge: imJudge(), mode: 'guided',
      script: [{ kind: 'note', html: t('Le membre de droite est constant : sa dérivée est 0. Pour un terme en y, la règle de chaîne donne un facteur y′ : (y³)′ = 3y²·y′.') }, line],
      key, exam: false,
    });
  }
  if (level === 2 && !opts.exam) {
    const line = blankWhere(derive, (n) => n.t === 'bin' && n.op === '×' && n.r?.t === 'deriv', {}, 1);
    return linesItem({
      ...common, prompt: t('Γ : {e}. Calcule y′ en fonction de x et de y.', { e: MT(s.eq) }),
      start: `d(${s.P})`, judge: imJudge(), mode: 'guided',
      script: [
        imDecision(d, rng), line,
        seg(t('On note p = y′. Isole p :'), null, s.pEq, isoJudge(d)),
        blanked(iso[0], [s.FyT]), iso[1],
      ],
      key, exam: false,
    });
  }
  if (level === 3 && !opts.exam) {
    const T = `(${fr(d.x0)} ; ${fr(d.y0)})`;
    return linesItem({
      ...common, prompt: t('Γ : {e}. Le point T{T} est sur Γ. Calcule y′, puis la pente de la tangente à Γ en T.', { e: MT(s.eq), T }),
      start: `d(${s.P})`, judge: withMenus(imJudge(), 3, `d(${s.P})`, [derive], IM_CHOICES), mode: 'tap', tapActions: 'steps',
      script: [
        derive,
        seg(t('On note p = y′. Isole p :'), null, s.pEq, withMenus(isoJudge(d), 3, s.pEq, iso, IM_CHOICES)),
        ...iso,
        seg(t('Pente en T{T} :', { T }), `y′(${fr(d.x0)}) =`, s.slopeStart, withMenus({ kind: 'value', form: 'irreducible' }, 3, s.slopeStart, [E(qText(d.slope), '', '', 'eval')], IM_CHOICES)),
        E(qText(d.slope), t('Calculer'), 'slope', 'eval'),
      ],
      key, exam: false,
    });
  }
  // Levels 4, 5 and the open variant: the whole problem (MAN 2017 Q5).
  const yJudge = { kind: 'solset', v: 'y', subst: { x: String(d.x0) } };
  const yLines = [E(s.yEq, `x = ${fr(d.x0)}`, 'point', 'point'), E(s.yFactor, t('Racine évidente, factoriser'), 'point', 'point'), E(`y=${d.y0}`, t('Le trinôme n\'a pas de racine réelle'), 'point', 'point')];
  const T = `(${fr(d.x0)} ; ${fr(d.y0)})`;
  const prompt = rng.pick([
    t('Γ : {e}. Trouve l\'équation de la tangente à Γ au point d\'abscisse {x}.', { e: MT(s.eq), x: fr(d.x0) }),
    t('La courbe Γ a pour équation {e}. Détermine le point T de Γ d\'abscisse {x}, puis la tangente à Γ en T.', { e: MT(s.eq), x: fr(d.x0) }),
  ]);
  return linesItem({
    ...common, prompt: `${prompt} ${t('(Écris y′ pour la dérivée de y.)')}`,
    start: s.eq, judge: yJudge, mode: 'free',
    script: [
      ...yLines,
      derivSeg(s, level), derive,
      seg(t('On note p = y′. Isole p :'), null, s.pEq, isoJudge(d)),
      ...iso,
      seg(t('Pente en T{T} :', { T }), `y′(${fr(d.x0)}) =`, s.slopeStart, { kind: 'value', form: 'irreducible' }),
      E(qText(d.slope), t('Calculer'), 'slope'),
      seg(t('Tangente en T{T} :', { T }), 'y =', s.tangentStart, tanJudge),
      E(s.tangent, t('Développer'), 'tangent'),
    ],
    noHints: level >= 5 || !!opts.exam,
    key, exam: examOf(opts, 3),
  });
}

function imMcq(rng) {
  const d = imData(rng);
  const s = imShape(d);
  const line = (parts) => `${joinTerms(parts)}=0`;
  const partsOf = (m, how) => {
    const xs = m.i ? monoText(mono(m.c.mul(m.i), m.i - 1, m.j)) : null;
    const yb = m.j ? monoText(mono(m.c.mul(m.j), m.i, m.j - 1)) : null;
    const ys = yb ? (yb === '1' ? "y'" : yb === '-1' ? "-y'" : `${yb}×y'`) : null;
    if (how === 'forgot') return [xs, yb];
    if (how === 'xy') return [ys];
    return [xs, ys];
  };
  const build = (how) => line(d.ms.flatMap((m) => partsOf(m, how(m))));
  const cands = [
    { text: `${s.derived}=0`, correct: true },
    { text: build((m) => (m.j ? 'forgot' : 'right')), rule: 'g6_implicit_yprime_forgot' },
    { text: build((m) => (m.i && m.j ? 'xy' : 'right')), rule: 'g6_implicit_xy' },
    { text: build((m) => (!m.i && m.j ? 'forgot' : 'right')), rule: 'g6_implicit_yprime_forgot' },
    { text: build((m) => (m.i && m.j ? 'forgot' : 'right')), rule: 'g6_implicit_yprime_forgot' },
  ];
  const seen = new Set();
  const options = [];
  for (const c of cands) {
    if (seen.has(c.text) || options.length >= 4) continue;
    seen.add(c.text);
    options.push({ html: MT(c.text), correct: !!c.correct, rule: c.rule || null });
  }
  return mcq({
    skill: IM, level: 4, prompt: t('Γ : {e}, où y dépend de x. En dérivant par rapport à x, on obtient :', { e: MT(s.eq) }), options,
    key: `mcq:${s.eq}`, exam: { format: 'mcq', points: 1 }, fallback: !!d.fallback,
    solution: [{ html: t('{e}, donc y′ = {p}.', { e: MT(`${s.derived}=0`), p: MT(s.pFinal.replace(/^p=/, '')) }), note: '' }],
  }, rng);
}

function imCoef(rng) {
  const d = imData(rng);
  const s = imShape(d);
  // The slope given by a trap.
  const traps = [];
  // (xy)′ = x·y′: the x part of the mixed terms dropped.
  const fxNoMixed = evalXY(dX(d.ms.filter((m) => !m.j)), d.x0, d.y0);
  const fy0 = evalXY(d.Fy, d.x0, d.y0);
  if (fy0.n !== 0) {
    const v = fxNoMixed.div(fy0).neg();
    if (!v.eq(d.slope)) traps.push({ value: qText(v), rule: 'g6_implicit_xy' });
  }
  const T = `(${fr(d.x0)} ; ${fr(d.y0)})`;
  return answerItem({
    skill: IM, level: 4, prompt: t('Le point T{T} est sur la courbe Γ : {e}. Quelle est la pente de la tangente à Γ en T ?', { T, e: MT(s.eq) }),
    expected: qText(d.slope), traps, key: `${s.eq}:${d.x0}`, exam: { format: 'coef', points: 1 }, fallback: !!d.fallback,
    solution: [{ html: t('{e}, donc y′ = {p} ; en T : y′ = {m}.', { e: MT(`${s.derived}=0`), p: MT(s.pFinal.replace(/^p=/, '')), m: MT(qText(d.slope)) }), note: '' }],
  });
}

// ======================================================================
// g6-common-tangent
// ======================================================================

const CT = 'g6-common-tangent';
const CT_SUB = [
  { id: 'derive', label: t('dériver implicitement'), skill: IM },
  { id: 'slope', label: t('égaler la pente, T sur t'), skill: CT },
  { id: 'solve', label: t('résoudre'), skill: 'eq-systems' },
  { id: 'param', label: t('T sur Γ : le paramètre'), skill: CT },
];
const CT_CHOICES = [
  { id: 'derive', label: t('Dériver implicitement') },
  { id: 'slope', label: t('Égaler la pente : y′ = m, et T sur t : y = mx + h') },
  { id: 'solve', label: t('Résoudre l\'équation en x') },
  { id: 'param', label: t('T sur Γ : trouver p') },
  { id: 'forget', label: t('Dériver les termes en y comme si y était x'), rule: 'g6_implicit_yprime_forgot', why: t('y dépend de x : chaque terme en y dérivé donne un facteur y′.') },
];

function ctData(rng) {
  const POOL = [[3, 0], [2, 0], [0, 2], [0, 3], [1, 1], [2, 1], [1, 2]];
  for (let i = 0; i < 400; i++) {
    const x0 = rng.int(-2, 2);
    const y0 = rng.int(-3, 3);
    const m = rng.pick([-2, -1, 1, 2]);
    const h = y0 - m * x0;
    const shapes = rng.shuffle(POOL).slice(0, 3);
    if (!shapes.some(([a, b]) => b > 0)) continue;
    const ms = shapes.map(([a, b]) => mono(nz(rng, -3, 3), a, b));
    // The last coefficient makes E(x₀) = 0, E(x) = F_x + m·F_y on y = mx + h.
    const e = (tm) => evalXY(dX([tm]), x0, y0).add(evalXY(dY([tm]), x0, y0).mul(m));
    const last = ms[2];
    const unit = e(mono(1, last.i, last.j));
    if (unit.n === 0) continue;
    const rest = e(ms[0]).add(e(ms[1]));
    const c = rest.div(unit).neg();
    if (!c.isInt() || c.n === 0 || Math.abs(c.n) > 3) continue;
    ms[2] = mono(c, last.i, last.j);
    ms.sort((u, w) => (w.i + w.j) - (u.i + u.j) || w.i - u.i);
    const E2 = onLine([...dX(ms), ...dY(ms).map((tm) => mono(tm.c.mul(m), tm.i, tm.j))], m, h);
    if (E2.length !== 3) continue;
    // E = (x − x₀)(αx + δ): the other root −δ/α, not a whole number.
    const alpha = E2[2];
    const delta = E2[1].add(alpha.mul(x0));
    if (!alpha.isInt() || !delta.isInt()) continue;
    const x1 = delta.div(alpha).neg();
    if (x1.isInt() || x1.d > 4) continue;
    if (evalXY(dY(ms), x0, y0).n === 0) continue;
    const P0 = evalXY(ms, x0, y0);
    if (Math.abs(P0.n) > 40) continue;
    return { x0, y0, m, h, ms, E2, alpha: alpha.n, delta: delta.n, x1, y1: x1.mul(m).add(h), p: P0.neg() };
  }
  const ms = [mono(1, 3, 0), mono(2, 1, 1), mono(1, 0, 2)];
  return { x0: 0, y0: 3, m: -1, h: 3, ms, E2: [q(0), q(-2), q(3)], alpha: 3, delta: -2, x1: q(2, 3), y1: q(7, 3), p: q(-9), fallback: true };
}

function ctShape(d) {
  const P = polyXY(d.ms);
  const gamma = `${P}+p=0`;
  const tLine = `y=${polyText([q(d.h), q(d.m)])}`;
  const derived = derivedLine(d.ms);
  const withM = `${derivedLine(d.ms, vText(d.m))}=0`;
  const Ex = `${polyText(d.E2)}=0`;
  const g = Math.abs(gcd(d.alpha, d.delta)) * Math.sign(d.alpha);
  const inner = polyText([q(d.delta / g), q(d.alpha / g)]);
  const lead = g === 1 ? '' : g === -1 ? '-' : String(g);
  const fac = `${lead}${d.x0 === 0 ? 'x' : `(${xMinus(d.x0)})`}(${inner})=0`;
  const roots = [{ t: String(d.x0), v: d.x0 }, { t: qText(d.x1), v: d.x1.valueOf() }].sort((a, b) => a.v - b.v);
  const sols = roots.map((r) => `x=${r.t}`).join(' ou ');
  const PT = evalXY(d.ms, d.x0, d.y0);
  return { P, gamma, tLine, derived, withM, Ex, fac, sols, PT };
}

const ctDerivJudge = () => ({ ...IMPLICIT(), vars: ['x', 'y', 'p', 'a'], implicit: { y: 'a' }, domain: { x: [-2, 2], y: [-2, 2], p: [-2, 2], a: [-2, 2] } });

function ctItem(level, rng, profile, opts = {}) {
  const d = ctData(rng);
  const s = ctShape(d);
  const T = `(${fr(d.x0)} ; ${fr(d.y0)})`;
  const T1 = `(${fr(qText(d.x1))} ; ${fr(qText(d.y1))})`;
  const key = `${CT}:${s.gamma}:${s.tLine}`;
  const xJudge = { kind: 'solset', v: 'x', subst: { y: polyText([q(d.h), q(d.m)]) } };
  const pJudge = { kind: 'solset', v: 'p', subst: { x: String(d.x0), y: String(d.y0) } };
  const derive = E(s.derived, t('Dériver implicitement'), 'derive', 'derive');
  const xLines = [E(s.Ex, t('y′ = {m}, et y = {l} (T sur t)', { m: fr(d.m), l: MT(polyText([q(d.h), q(d.m)])) }), 'slope', 'slope'), E(s.fac, t('Factoriser'), 'solve', 'solve'), E(s.sols, t('Produit nul'), 'solve', 'solve')];
  const pLines = [...(s.PT.n === 0 ? [] : [E(`${qText(s.PT)}+p=0`, t('T{T} sur Γ', { T }), 'param', 'param')]), E(`p=${qText(d.p)}`, t('Isoler p'), 'param', 'param')];
  const pickT = {
    kind: 'decision', prompt: t('Quel point T retiens-tu ?'), options: [
      { id: 'int', label: t('x = {x}, donc T{T}', { x: fr(d.x0), T }), valid: true, ref: true },
      { id: 'frac', label: t('x = {x}, donc T{T}', { x: fr(qText(d.x1)), T: T1 }), valid: false, why: t('Ses coordonnées ne sont pas entières : l\'énoncé demande T à coordonnées entières.') },
    ],
  };
  const conditions = {
    kind: 'decision', prompt: t('Quelles conditions écris-tu pour T ?'), options: [
      { id: 'three', label: t('T ∈ Γ, T ∈ t, et la pente de Γ en T est celle de t'), valid: true, ref: true },
      { id: 'two', label: t('T ∈ Γ et T ∈ t seulement'), valid: false, why: t('Une sécante passe aussi par des points de Γ : il faut encore que les pentes soient égales en T.') },
      { id: 'slope', label: t('Seulement : la pente de Γ en T est celle de t'), valid: false, why: t('Il faut aussi que T soit sur t et sur Γ : sinon on trouve une droite parallèle à t.') },
    ],
  };
  const prompt = rng.pick([
    t('Γ : {g} (p ∈ ℝ) et t : {l}. Pour quelle valeur de p la droite t est-elle tangente à Γ en un point T à coordonnées entières ?', { g: MT(s.gamma), l: MT(s.tLine) }),
    t('Trouve p pour que la droite {l} soit tangente à la courbe {g} en un point T dont les coordonnées sont entières.', { g: MT(s.gamma), l: MT(s.tLine) }),
  ]);
  const xSeg = (html) => seg(html, null, s.withM, withMenus(xJudge, level, s.withM, xLines, CT_CHOICES));
  const pSeg = seg(t('T est sur Γ :'), null, s.gamma, withMenus(pJudge, level, s.gamma, pLines, CT_CHOICES));
  const common = { skill: CT, level, subgoals: CT_SUB, keys: KEYS, fallback: !!d.fallback, key, declares: { vars: ['x', 'y', 'p'] } };
  const hints = H(
    t('Trois conditions : T est sur Γ, T est sur t, et les pentes sont égales en T (y′ = pente de t).'),
    t('{e}, donc x = …', { e: MT(s.Ex) }),
    `T${T}, p = ${fr(qText(d.p))}`,
  );
  if (level === 1 && !opts.exam) {
    // y′ given: the conditions with holes.
    return linesItem({
      ...common, prompt: `${prompt}<br>${t('En dérivant : {e}.', { e: MT(`${s.derived}=0`) })}`,
      start: s.withM, judge: xJudge, mode: 'guided', hints,
      script: [
        { kind: 'note', html: t('La pente de t est {m} : on remplace y′ par {m}. T est sur t : on remplace y par {l}.', { m: fr(d.m), l: MT(polyText([q(d.h), q(d.m)])) }) },
        blankWhere(xLines[0], (n) => n.t === 'bin' && n.op === '×' && ['sym'].includes(n.r?.t), {}, 1),
        xLines[1], xLines[2],
        pSeg, pickT,
        ...pLines.map((l, i) => (i === pLines.length - 1 ? blanked(l, [qText(d.p)]) : l)),
      ],
      exam: false,
    });
  }
  const derivJudge = withMenus(ctDerivJudge(), level, `d(${s.P}+p)`, [derive], CT_CHOICES);
  const script = [
    ...(level === 2 && !opts.exam ? [conditions] : []),
    level === 2 && !opts.exam ? blankWhere(derive, (n) => n.t === 'bin' && n.op === '×' && n.r?.t === 'deriv', {}, 1) : derive,
    xSeg(t('La pente de t est {m} : y′ = {m}. T est sur t : y = {l}.', { m: fr(d.m), l: MT(polyText([q(d.h), q(d.m)])) })),
    ...(level === 2 && !opts.exam ? [blanked(xLines[0], [String(d.alpha)]), xLines[1], xLines[2]] : xLines),
    pSeg, pickT,
    ...pLines,
  ];
  // The decision of T comes before the lines of the part « T ∈ Γ ».
  return linesItem({
    ...common, prompt: `${prompt}${level <= 4 && !opts.exam ? ` ${t('(Écris y′ pour la dérivée de y.)')}` : ''}`,
    start: `d(${s.P}+p)`, judge: derivJudge, mode: opts.exam ? 'free' : modeOf(level), tapActions: level === 3 && !opts.exam ? 'steps' : null,
    hints, noHints: level >= 5 || !!opts.exam, script, exam: examOf(opts, 4),
  });
}

export const GEN = {
  [IM]: imItem,
  [CT]: ctItem,
};
