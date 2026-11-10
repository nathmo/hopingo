// a1-param-curve and a1-polar-curve (module A1, part b, step U2).
// Parametric curves: ẋ and ẏ (equiv in t), the slope ẏ/ẋ, the parameters of
// horizontal and vertical tangents and of the double point (solset in t),
// the points (value). Polar curves ρ = f(φ), a long problem (exam MT
// 2014): limits as φ → π⁻ (judge `limit` in φ), ρ̇ and the slope (equiv
// with target `goal`), the point on Oy (value), horizontal tangents
// (solset on the interval), the sketch as a choice in words (decision).
// The `problem` type arrives in step U4: level 5 and the `open` variant
// are hint-free lines items with parts.

import { parse } from '../../cas/parse.js';
import { exactValue } from '../../cas/normal.js';
import { q, N, H, E, examOf, kx, joinSum, blanked, partsItem, mcqOf, ML, RD } from './analyse1-b-common.js';

// ======================================================================
// a1-param-curve
// ======================================================================

const PC = 'a1-param-curve';
const PC_KEYS = ['calc', 'calcx', 'relation', 'set'];
const PC_SUB = [
  { id: 'deriv', label: 'dériver x et y', skill: 'a1-deriv-rules' },
  { id: 'slope', label: 'pente ẏ/ẋ', skill: PC },
  { id: 'points', label: 'tangentes et points', skill: PC },
];
const PC_CHOICES = [
  { id: 'deriv', label: 'Dériver x(t) et y(t)' },
  { id: 'slope', label: 'Pente : ẏ/ẋ' },
  { id: 'horiz', label: 'Tangente horizontale : ẏ = 0 (et ẋ ≠ 0)' },
  { id: 'vert', label: 'Tangente verticale : ẋ = 0 (et ẏ ≠ 0)' },
  { id: 'double', label: 'Point double : γ(t) = γ(s) avec t ≠ s' },
  { id: 'eval', label: 'Calculer les coordonnées du point' },
];
const T = (s) => ML(s, ['t']);

// x = t² + a, y = t³ − 3b²t + e (or the two exchanged: swap).
function pcData(rng) {
  const a = rng.int(-3, 3);
  const b = rng.pick([1, 1, 2]);
  const e = rng.int(-3, 3);
  const swap = rng.chance(0.35);
  const quad = joinSum(['t^2', N(a)]);
  const cub = joinSum(['t^3', kx(-3 * b * b, 't'), N(e)]);
  const dq = '2t';
  const dc = joinSum(['3t^2', N(-3 * b * b)]);
  const D = { a, b, e, swap, x: swap ? cub : quad, y: swap ? quad : cub, dx: swap ? dc : dq, dy: swap ? dq : dc };
  // The point γ(t) for a whole t (exact coordinates).
  D.at = (t) => [D.x, D.y].map((s) => exactValue(parse(s.replace(/t/g, `(${N(t)})`), { vars: ['t'] })));
  return D;
}
const pt = (xy) => `(${RD(N(xy[0]))} ; ${RD(N(xy[1]))})`;
const subT = (s, t) => s.replace(/(\d)t/g, '$1×t').replace(/t/g, t < 0 || /√/.test(String(t)) ? `(${t})` : String(t));
const root3 = (b) => (b === 1 ? '√3' : `${b}√3`);

function pcParts(D, level) {
  const g = level <= 2;
  const eqT = (extra = {}) => ({ kind: 'equiv', vars: ['t'], dvar: 't', domain: { t: [-2, 2] }, target: 'no-prime', ...extra });
  const tCub = D.swap ? 'x' : 'y';
  const b = D.b;
  const P = {
    dx: { start: `d(${D.x},t)`, judge: eqT(), html: 'Dérive x(t) :', ask: 'ẋ =', lines: [level === 2 ? blanked(E(D.dx, 'Dériver', 'deriv', 'deriv'), [D.dx.startsWith('2t') ? '2t' : '3t^2']) : E(D.dx, 'Dériver', 'deriv', 'deriv')] },
    dy: { start: `d(${D.y},t)`, judge: eqT(), html: 'Dérive y(t) :', ask: 'ẏ =', lines: [E(D.dy, 'Dériver', 'deriv', 'deriv')] },
    slope: { start: `d(${D.y},t)/d(${D.x},t)`, judge: eqT(), html: 'Pente de la tangente :', ask: 'y′ =', lines: [g ? blanked(E(`(${D.dy})/(${D.dx})`, 'ẏ/ẋ', 'slope', 'slope'), [D.dy]) : E(`(${D.dy})/(${D.dx})`, 'ẏ/ẋ', 'slope', 'slope')] },
  };
  // Horizontal tangents: ẏ = 0 (cubic in y: t = ±b; quadratic in y: t = 0).
  const cubZero = { start: `${joinSum(['3t^2', N(-3 * b * b)])}=0`, lines: (act) => [g ? blanked(E(`t=${-b} ou t=${b}`, 'Racines', 'points', act), [String(b)]) : E(`t=${-b} ou t=${b}`, 'Racines', 'points', act)] };
  const quadZero = { start: '2t=0', lines: (act) => [E('t=0', 'Racine', 'points', act)] };
  const hz = D.swap ? quadZero : cubZero;
  const vt = D.swap ? cubZero : quadZero;
  P.horiz = { start: hz.start, judge: { kind: 'solset', v: 't' }, html: 'Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)', lines: hz.lines('horiz') };
  P.vert = { start: vt.start, judge: { kind: 'solset', v: 't' }, html: 'Tangente verticale : ẋ = 0 (ẏ ≠ 0 en ces t)', lines: vt.lines('vert') };
  const tH = D.swap ? 0 : b;
  const H0 = D.at(tH);
  P.hx = { start: subT(D.x, tH), judge: { kind: 'value', form: 'irreducible' }, html: `Point de tangente horizontale pour t = ${tH} :`, ask: `x(${tH}) =`, lines: [E(N(H0[0]), 'Calculer', 'points', 'eval')] };
  P.hy = { start: subT(D.y, tH), judge: { kind: 'value', form: 'irreducible' }, html: P.hx.html, ask: `y(${tH}) =`, lines: [E(N(H0[1]), 'Calculer', 'points', 'eval')] };
  // Double point: γ(t) = γ(−t) (the quadratic coordinate is even), so the
  // odd part of the cubic is 0: t³ − 3b²t = 0 with t ≠ 0.
  P.double = {
    start: `${joinSum(['2t^3', kx(-6 * b * b, 't')])}=0`, judge: { kind: 'solset', v: 't', domain: ']-∞;0[∪]0;+∞[' },
    html: `Point double : ${D.swap ? 'y' : 'x'}(t) = ${D.swap ? 'y' : 'x'}(s) avec s ≠ t donne s = −t ; alors ${tCub}(t) = ${tCub}(−t) donne, pour t ≠ 0 :`,
    lines: [E(`t^2=${3 * b * b}`, 'Diviser par 2t', 'points', 'double'), E(`t=-${root3(b)} ou t=${root3(b)}`, 'Racines', 'points', 'double')],
  };
  const dq = 3 * b * b + D.a;
  P.dpoint = { start: subT(D.swap ? D.y : D.x, root3(b)), judge: { kind: 'value', form: 'irreducible' }, html: `Point double : coordonnée ${D.swap ? 'y' : 'x'} (l'autre vaut ${RD(N(D.e))})`, ask: `${D.swap ? 'y' : 'x'}(${root3(b)}) =`, lines: [E(N(dq), 'Calculer', 'points', 'eval')] };
  return P;
}

function pcItem(level, rng, opts) {
  const D = pcData(rng);
  const open = opts.exam === 'open';
  const P = pcParts(D, open ? 5 : level);
  const seq = open ? ['dx', 'dy', 'horiz', 'hy', 'vert', 'double'] : {
    1: ['slope', 'horiz', 'vert'],
    2: ['dx', 'dy', 'slope', 'horiz', 'hy'],
    3: ['dx', 'dy', 'horiz', 'vert', 'double'],
    4: ['dx', 'dy', 'slope', 'horiz', 'hy', 'vert'],
    5: ['dx', 'dy', 'horiz', 'hx', 'hy', 'vert', 'double', 'dpoint'],
  }[level];
  const parts = seq.map((k) => ({ ...P[k] }));
  if (level === 1 && !open) parts[0].html = `ẋ = ${T(D.dx)}, ẏ = ${T(D.dy)}. ${P.slope.html}`;
  const prompt = rng.chance(0.5)
    ? `Soit la courbe γ(t) = (${T(D.x)} ; ${T(D.y)}), t ∈ ℝ. Trouve ses tangentes horizontales et verticales${level === 5 || open ? ' et son point double' : ''}.`
    : `Étudie la courbe paramétrée x(t) = ${T(D.x)}, y(t) = ${T(D.y)} : pente, tangentes horizontales et verticales${level === 5 || open ? ', point double' : ''}.`;
  const tH = D.swap ? '0' : `±${D.b}`;
  return partsItem({
    skill: PC, level: open ? 4 : level, prompt, parts, choices: PC_CHOICES,
    hints: H('La pente est ẏ/ẋ. Horizontale : le numérateur s\'annule, pas le dénominateur.', `ẏ = 0 ⇔ t = ▢`, `t = ${tH} : tangente horizontale.`),
    subgoals: PC_SUB, keys: PC_KEYS, key: `${PC}:${D.x};${D.y}:${level}`,
    exam: open ? examOf(opts, 4) : false, noHints: open || level === 5, expectedSec: open ? 600 : undefined,
  });
}

function pcMcq(rng, opts) {
  const D = pcData(rng);
  const b = D.b;
  const tsH = D.swap ? [0] : [-b, b];
  const tsV = D.swap ? [-b, b] : [0];
  const list = (ts) => ts.map((t) => pt(D.at(t))).join(' et ');
  const options = [
    { html: list(tsH), correct: true },
    { html: list(tsV), correct: false },
    { html: tsH.map((t) => `t = ${RD(t)}`).join(' et '), correct: false },
    { html: list(tsH.map((t) => -t).concat(tsH.length > 1 ? [] : [b])), correct: false },
    { html: list([...tsH, ...tsV].sort((u, w) => u - w)), correct: false },
  ];
  return mcqOf({
    skill: PC, level: 4, prompt: `En quels points la courbe x(t) = ${T(D.x)}, y(t) = ${T(D.y)} a-t-elle une tangente horizontale ?`,
    options, key: `mcq:${D.x};${D.y}`, expectedSec: 240, exam: examOf(opts),
    solution: [{ html: `ẋ = ${T(D.dx)}, ẏ = ${T(D.dy)}. Horizontale : ẏ = 0 et ẋ ≠ 0, soit t = ${tsH.map((t) => RD(t)).join(' ou ')} ; points ${list(tsH)}.`, note: '' }],
  }, rng);
}

export function paramCurveItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return pcMcq(rng, opts);
  return pcItem(level, rng, opts);
}

// ======================================================================
// a1-polar-curve
// ======================================================================

const PO = 'a1-polar-curve';
const PO_KEYS = ['calcx', 'calcfn', 'greek', 'anal', 'set', 'relation'];
const PO_SUB = [
  { id: 'lim', label: 'limites', skill: 'a1-fn-limits' },
  { id: 'trig', label: 'simplifier (angle moitié)', skill: 'g3-identities' },
  { id: 'slope', label: 'pente', skill: 'a1-param-curve' },
  { id: 'points', label: 'point et tangentes', skill: PO },
];
const PO_CHOICES = [
  { id: 'limx', label: 'Limite de x' },
  { id: 'trig', label: 'Simplifier avec tan(φ/2) = sin φ/(1 + cos φ)' },
  { id: 'lim', label: 'Passer à la limite' },
  { id: 'deriv', label: 'Dériver ρ' },
  { id: 'slope', label: 'Simplifier la pente par 1 + cos φ' },
  { id: 'naive', label: 'Prendre ρ̇ comme pente', rule: 'a1_polar_slope_naive', why: 'ρ̇ dit comment le rayon change, pas la pente dans le plan.' },
];
const F = (s) => ML(s, ['φ']);

// tan: ρ = a·tan(φ/2) on [0 ; π[ (exam MT 2014); para: ρ = a/(1 + cos φ),
// a parabola, on ]−π ; π[.
function poData(rng) {
  const a = rng.pick([2, 3, 4, 5]);
  const kind = rng.chance(0.6) ? 'tan' : 'para';
  if (kind === 'tan') {
    return {
      kind, a, rho: `${a}tan(φ/2)`, dom: '[0 ; π[', domSet: '[0;π[',
      xs: [`${a}tan(φ/2)×cos(φ)`, '-∞'],
      ys: [`${a}tan(φ/2)×sin(φ)`, `${a}sin(φ)^2/(1+cos(φ))`, `${a}(1-cos(φ))`, String(2 * a)],
      rhoDot: { start: `d(${a}tan(φ/2),φ)`, mid: `(${a}/2)(1+tan(φ/2)^2)`, goal: `${a}/(1+cos(φ))` },
      slope: {
        start: `(${a}/(1+cos(φ))×sin(φ)+${a}tan(φ/2)×cos(φ))/(${a}/(1+cos(φ))×cos(φ)-${a}tan(φ/2)×sin(φ))`,
        mid: '(sin(φ)+sin(φ)cos(φ))/(cos(φ)-sin(φ)^2)', goal: 'sin(φ)(1+cos(φ))/(cos(φ)^2+cos(φ)-1)',
      },
      ydot: { start: `d(${a}(1-cos(φ)),φ)`, goal: `${a}sin(φ)` },
      hz: [`${a}sin(φ)=0`, 'φ=0'],
      yAt: `${a}(1-cos(π/2))`,
      asym: 'Asymptote horizontale y = ' + 2 * a,
      sketch: [
        `Part de l'origine, passe par (0 ; ${a}), puis file vers x → −∞ en s'approchant de la droite y = ${2 * a}`,
        `Part de l'origine, passe par (0 ; ${a}), puis file vers x → +∞ en s'approchant de la droite y = ${2 * a}`,
        `Part de l'origine, passe par (0 ; ${a}), puis file vers x → −∞ en s'approchant de la droite y = ${a}`,
        `Courbe fermée qui passe par l'origine et par (0 ; ${a})`,
      ],
    };
  }
  return {
    kind, a, rho: `${a}/(1+cos(φ))`, dom: ']−π ; π[', domSet: ']-π;π[',
    xs: [`${a}cos(φ)/(1+cos(φ))`, '-∞'],
    ys: [`${a}sin(φ)/(1+cos(φ))`, `${a}tan(φ/2)`, '+∞'],
    rhoDot: { start: `d(${a}/(1+cos(φ)),φ)`, mid: null, goal: `${a}sin(φ)/(1+cos(φ))^2` },
    slope: {
      start: `(${a}sin(φ)/(1+cos(φ))^2×sin(φ)+${a}/(1+cos(φ))×cos(φ))/(${a}sin(φ)/(1+cos(φ))^2×cos(φ)-${a}/(1+cos(φ))×sin(φ))`,
      mid: '(sin(φ)^2+cos(φ)(1+cos(φ)))/(sin(φ)cos(φ)-sin(φ)(1+cos(φ)))', goal: '-(1+cos(φ))/sin(φ)',
    },
    ydot: { start: `d(${a}tan(φ/2),φ)`, goal: `${a}/(1+cos(φ))` },
    hz: [`${a}/(1+cos(φ))=0`, '∅'],
    yAt: `${a}sin(π/2)/(1+cos(π/2))`,
    asym: 'Pas d\'asymptote : x → −∞ et y → +∞',
    sketch: [
      `Parabole : passe par (${RD(N(q(a, 2)))} ; 0) et (0 ; ${a}), ses branches filent vers x → −∞`,
      `Parabole : passe par (${RD(N(q(a, 2)))} ; 0) et (0 ; ${a}), ses branches filent vers x → +∞`,
      `Courbe avec l'asymptote horizontale y = ${2 * a}`,
      `Courbe fermée qui passe par (${RD(N(q(a, 2)))} ; 0) et (0 ; ${a})`,
    ],
  };
}

function asymDecision(D) {
  const opts = D.kind === 'tan'
    ? [D.asym, `Asymptote horizontale y = ${D.a}`, `Asymptote verticale x = −${2 * D.a}`, 'Pas d\'asymptote']
    : [D.asym, `Asymptote horizontale y = ${2 * D.a}`, `Asymptote verticale x = −${D.a}`, `Asymptote horizontale y = ${D.a}`];
  return {
    kind: 'decision', prompt: 'Quand φ → π⁻, que dit-on de la courbe ?',
    options: opts.map((label, i) => ({ id: `o${i}`, label, valid: i === 0, why: i ? `Relis les deux limites : x → −∞ et y → ${D.kind === 'tan' ? 2 * D.a : '+∞'}.` : '' })),
  };
}
const SLOPE_DECISION = {
  kind: 'decision', prompt: 'La pente de la tangente, avec x = ρ cos φ et y = ρ sin φ :',
  options: [
    { id: 'ok', label: 'y′ = ẏ/ẋ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ)', valid: true },
    { id: 'rho', label: 'y′ = ρ̇', valid: false, rule: 'a1_polar_slope_naive', why: 'ρ̇ dit comment le rayon change, pas la pente.' },
    { id: 'ratio', label: 'y′ = ρ̇/ρ', valid: false, rule: 'a1_polar_slope_naive', why: 'ρ̇/ρ n\'est pas une pente dans le plan : dérive x et y.' },
    { id: 'inv', label: 'y′ = ẋ/ẏ', valid: false, why: 'La pente est ẏ/ẋ : « monter » divisé par « avancer ».' },
  ],
};
function sketchDecision(D) {
  return { kind: 'decision', prompt: 'Esquisse : quelle description convient ?', options: D.sketch.map((label, i) => ({ id: `s${i}`, label, valid: i === 0, why: i ? 'Compare avec tes limites et le point sur Oy.' : '' })) };
}

function poItem(level, rng, opts) {
  const D = poData(rng);
  const open = opts.exam === 'open';
  const L = open ? 5 : level;
  const g = L <= 2;
  const lim = { kind: 'limit', v: 'φ', vars: ['φ'], to: 'π', dir: '-' };
  const eqP = (goal) => ({ kind: 'equiv', vars: ['φ'], dvar: 'φ', domain: { φ: D.kind === 'tan' ? [0.1, 3] : [-3, 3] }, target: 'goal', goal });
  const yLines = D.ys.slice(1).map((m, i, arr) => {
    const last = i === arr.length - 1;
    const line = E(m, last ? 'Passer à la limite' : 'tan(φ/2) = sin φ/(1 + cos φ)', last ? 'lim' : 'trig', last ? 'lim' : 'trig');
    if (!g) return line;
    if (!last && i === arr.length - 2 && D.kind === 'tan') return blanked(line, ['cos(φ)']);
    if (last && L === 1) return blanked(line, [m.replace('+', '')]);
    return line;
  });
  const P = {
    x: { start: D.xs[0], judge: lim, html: '(b) Limite de x = ρ cos φ quand φ → π⁻ :', lines: [E(D.xs[1], D.kind === 'tan' ? 'tan(φ/2) → +∞, cos φ → −1' : 'cos φ → −1, 1 + cos φ → 0⁺', 'lim', 'limx')] },
    y: { start: D.ys[0], judge: lim, html: '(b) Limite de y = ρ sin φ quand φ → π⁻ :', lines: yLines },
    rd: {
      start: D.rhoDot.start, judge: eqP(D.rhoDot.goal), html: '(a) Dérive ρ et simplifie :', ask: 'ρ̇ =',
      lines: D.rhoDot.mid
        ? [E(D.rhoDot.mid, 'Dériver', 'trig', 'deriv'), g ? blanked(E(D.rhoDot.goal, '1 + tan²(φ/2) = 2/(1 + cos φ)', 'trig', 'trig'), ['1+cos(φ)']) : E(D.rhoDot.goal, '1 + tan²(φ/2) = 2/(1 + cos φ)', 'trig', 'trig')]
        : [g ? blanked(E(D.rhoDot.goal, 'Dériver', 'trig', 'deriv'), [`${D.a}sin(φ)`]) : E(D.rhoDot.goal, 'Dériver', 'trig', 'deriv')],
    },
    sl: {
      start: D.slope.start, judge: eqP(D.slope.goal), html: `(c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = ${F(D.rho)} et ρ̇ = ${F(D.rhoDot.goal)} :`, ask: 'y′ =',
      lines: [E(D.slope.mid, D.kind === 'tan' ? 'Multiplier haut et bas par (1 + cos φ)/' + D.a : 'Multiplier haut et bas par (1 + cos φ)²/' + D.a, 'slope', 'slope'), E(D.slope.goal, 'Simplifier', 'slope', 'slope')],
    },
    yd: { start: D.ydot.start, judge: eqP(D.ydot.goal), html: '(c) Au passage, ẏ (dérive y simplifié) :', ask: 'ẏ =', lines: [E(D.ydot.goal, 'Dériver', 'slope', 'deriv')] },
    py: { start: D.yAt, judge: { kind: 'value', form: 'irreducible' }, html: '(d) Point P sur l\'axe Oy : φ = π/2.', ask: 'y(P) =', lines: [E(String(D.a), 'Calculer', 'points', 'eval')] },
    ps: { start: D.slope.goal.replace(/φ/g, 'π/2'), judge: { kind: 'value', form: 'irreducible' }, html: '(d) Pente en P :', ask: 'y′(P) =', lines: [E('-1', 'Calculer', 'points', 'eval')] },
    hz: { start: D.hz[0], judge: { kind: 'solset', v: 'φ', vars: ['φ'], domain: D.domSet }, html: `(e) Tangentes horizontales : ẏ = 0 sur ${D.dom}`, lines: [E(D.hz[1], D.kind === 'tan' ? 'sin φ = 0 ; ẋ(0) ≠ 0 : l\'origine' : '1/(1 + cos φ) ne s\'annule jamais', 'points', 'eval')] },
  };
  const seq = {
    1: ['rd', 'y'],
    2: ['rd', 'x', 'y', 'sl'],
    3: ['rd', 'x', 'y', 'sl'],
    4: ['rd', 'x', 'y', 'sl', 'yd', 'py', 'ps', 'hz'],
    5: ['rd', 'x', 'y', 'sl', 'yd', 'py', 'ps', 'hz'],
  }[L];
  const parts = seq.map((k) => ({ ...P[k], pre: [] }));
  const at = (k) => parts[seq.indexOf(k)];
  if (L >= 4) at('sl').pre.push(asymDecision(D));
  if (L >= 2) at('sl').pre.push(SLOPE_DECISION);
  if (L >= 5) at('hz').pre.push(sketchDecision(D));
  const before = [{ kind: 'note', html: `x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).` }];
  const prompt = rng.chance(0.5)
    ? `On étudie la courbe polaire ρ = ${F(D.rho)}, φ ∈ ${D.dom}.`
    : `Courbe polaire ρ(φ) = ${F(D.rho)} pour φ ∈ ${D.dom} : limites quand φ → π⁻, ρ̇, pente${L >= 4 ? ', point sur Oy, tangentes horizontales' : ''}.`;
  return partsItem({
    skill: PO, level: open ? 4 : level, prompt, parts, before, choices: PO_CHOICES,
    hints: H('Écris y = ρ sin φ et simplifie avec tan(φ/2) = sin φ/(1 + cos φ).', D.kind === 'tan' ? `y = ${D.a}(1 − ▢)` : `y = ${D.a}·▢`, D.kind === 'tan' ? `y → ${2 * D.a} : asymptote horizontale y = ${2 * D.a}.` : 'x → −∞ et y → +∞ : pas d\'asymptote.'),
    subgoals: PO_SUB, keys: PO_KEYS, key: `${PO}:${D.rho}:${level}`,
    exam: open ? examOf(opts, 12) : false, noHints: open || level === 5, expectedSec: open || level === 5 ? 900 : undefined,
  });
}

export function polarCurveItem(level, rng, profile, opts = {}) {
  return poItem(level, rng, opts);
}
