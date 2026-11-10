// Generators of module A2, part c (step U6): partial derivatives and
// Jacobians (a2-partials), the tangent plane to a graph (a2-tangent-graph)
// and to a level surface (a2-tangent-level). Catalogue:
// docs/universite/A2-analyse-2.md, « Différentiabilité ».
//
// Judges: equiv in x, y (z) for a partial derivative (start pd(f, x),
// target no-prime); mat with vars for a symbolic Jacobian or gradient, mat
// with numbers for its value at a point; value for f(a, b), f_x(a, b)…;
// geom {object: 'plane'} for a tangent plane (the traps read cfg.tangent
// and cfg.level); system for « where is the tangent plane horizontal ».

import { parse } from '../../cas/parse.js';
import { JUDGES, readWith } from '../../judges/index.js';
import { evalFloat } from '../../cas/numeric.js';
import { ML as MLmat } from './alglin-kit.js';
import { joinSum } from './analyse1-e-kit.js';
import { prim } from './geo-kit.js';
import {
  q, qt, fq, H, nz, ML, RD, polyT, polyD, polyAt, shiftT, termT, ptT, vecT, rowT,
  partsItem, examMcq, vfMcq, tfItem, a2Counter, examTag,
} from './analyse2-c-kit.js';
import { K_LIBRARY } from '../../judges/a2-examples.js';

const VARS = ['x', 'y', 'z'];
// A plane line already in final form (nothing left to develop).
const PLANE = { kind: 'geom', object: 'plane' };
// The two lines of a plane (formula, developed): the formula alone when it is
// already final, the developed line alone when the formula is « right but to tidy ».
function planeLines(formula, developed) {
  const f = JUDGES.geom.isFinal(PLANE, readWith(PLANE, formula.math));
  if (f === true) return [formula];
  if (typeof f === 'string') return [{ ...developed, subgoal: formula.subgoal }];
  return [formula, developed];
}
const isInt = (x) => Number.isFinite(x) && Math.abs(x - Math.round(x)) < 1e-9;
const valAt = (text, vars, p) => evalFloat(parse(text, { vars }), Object.fromEntries(vars.map((v, i) => [v, Number(p[i])])));
const vecML = (xs) => MLmat(`(${xs.join(' ; ')})`);

// ======================================================================
// Components of a map: {f, d: [∂f/∂v per variable]} as texts.
// ======================================================================

function polyComp(rng, n, maxDeg = 3) {
  const terms = [];
  const keys = new Set();
  const count = rng.int(1, 2);
  for (let t = 0; terms.length < count && t < 40; t++) {
    const e = Array.from({ length: n }, () => rng.int(0, 2));
    const deg = e.reduce((s, k) => s + k, 0);
    if (deg === 0 || deg > maxDeg || keys.has(e.join())) continue;
    keys.add(e.join());
    terms.push({ c: q(nz(rng, -3, 3)), e });
  }
  return { f: polyT(terms, VARS), d: VARS.slice(0, n).map((_, i) => polyT(polyD(terms, i), VARS)), kind: 'poly', terms };
}
// sin(k·v_i·v_j), e^(k·v_i·v_j), v_i/v_j, (1 + x²)^y.
function specialComp(rng, n, kind) {
  const [i, j] = rng.shuffle([...Array(n).keys()]).slice(0, 2);
  const vi = VARS[i];
  const vj = VARS[j];
  const k = rng.pick([1, 1, 2]);
  const kk = k === 1 ? '' : String(k);
  const prod = `${kk}${vi}${vj}`;
  const d = Array(n).fill('0');
  if (kind === 'sin') {
    d[i] = `${kk}${vj}cos(${prod})`; d[j] = `${kk}${vi}cos(${prod})`;
    return { f: `sin(${prod})`, d, kind, i, j, k };
  }
  if (kind === 'exp') {
    d[i] = `${kk}${vj}e^(${prod})`; d[j] = `${kk}${vi}e^(${prod})`;
    return { f: `e^(${prod})`, d, kind, i, j, k };
  }
  if (kind === 'quot') {
    d[i] = `1/${vj}`; d[j] = `-${vi}/${vj}^2`;
    return { f: `${vi}/${vj}`, d, kind, i, j };
  }
  // (1 + x²)^y
  d[0] = '2xy(1+x^2)^(y-1)'; d[1] = '(1+x^2)^y×ln(1+x^2)';
  return { f: '(1+x^2)^y', d, kind: 'pow', i: 0, j: 1 };
}
// A sum of components, its partial derivatives as sums.
function sumComp(parts, n) {
  return { f: joinSum(parts.map((c) => c.f)), d: VARS.slice(0, n).map((_, i) => joinSum(parts.map((c) => c.d[i]))), parts };
}

// A map u: ℝⁿ → ℝᵐ at a point with whole values; every variable used.
function mapData(rng, { m, n, kinds = ['poly', 'sin', 'exp', 'quot'], pow = false } = {}) {
  for (let t = 0; t < 200; t++) {
    const p = Array.from({ length: n }, () => rng.int(-2, 2));
    const comps = [];
    for (let r = 0; r < m; r++) {
      const kind = pow && r === 0 ? 'pow' : rng.pick(kinds);
      const c = kind === 'poly' ? polyComp(rng, n) : sumComp([specialComp(rng, n, kind), ...(rng.chance(0.5) ? [polyComp(rng, n, 2)] : [])], n);
      comps.push(c);
    }
    if (pow && (n < 2)) continue;
    const vars = VARS.slice(0, n);
    // Every column is used somewhere; whole values at the point.
    if (vars.some((_, i) => comps.every((c) => c.d[i] === '0'))) continue;
    const J = comps.map((c) => c.d.map((d) => valAt(d, vars, p)));
    if (!J.flat().every((x) => isInt(x) && Math.abs(x) <= 30)) continue;
    const vals = comps.map((c) => valAt(c.f, vars, p));
    if (!vals.every((x) => isInt(x))) continue;
    if (J.every((r) => r.every((x) => Math.round(x) === 0))) continue;
    return { comps, p, J: J.map((r) => r.map((x) => Math.round(x))), m, n, vars };
  }
  // Fallback: u = (xy, x + z) at (1, 2, 1).
  const comps = [{ f: 'xy', d: ['y', 'x', '0'] }, { f: 'x+z', d: ['1', '0', '1'] }];
  return { comps, p: [1, 2, 1], J: [[2, 1, 0], [1, 0, 1]], m: 2, n: 3, vars: VARS, fallback: true };
}

// ======================================================================
// a2-partials
// ======================================================================

const PA = 'a2-partials';
const PA_SUB = [
  { id: 'row', label: 'dérivées partielles', skill: 'g6-deriv-rules' },
  { id: 'evaluate', label: 'évaluer au point', skill: PA },
];
const eqJ = (vars) => ({ kind: 'equiv', vars, domain: { x: [0.3, 2.5], y: [0.3, 2.5], z: [0.3, 2.5] }, target: 'no-prime' });
const uML = (d) => `u(${d.vars.join(', ')}) = (${d.comps.map((c) => ML(c.f)).join(', ')})`;
const allCells = (m, n) => { const out = []; for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) out.push([i, j]); return out; };

function gradItem(level, rng, opts) {
  // f: ℝ² → ℝ, its two partial derivatives, then ∇f at the point.
  const d = mapData(rng, { m: 1, n: 2, kinds: ['poly', 'sin', 'exp', 'quot'] });
  const [c] = d.comps;
  const vars = d.vars;
  const [gx, gy] = d.J[0];
  const firstTerm = (t) => (/^-?[^+-]+/.exec(t) || [''])[0];
  const blank = (t) => [c.parts ? c.parts[0].d[vars.indexOf(t)] : firstTerm(c.d[vars.indexOf(t)])].filter((s) => s && s !== '0');
  const parts = [
    { start: `pd(${c.f},x)`, judge: eqJ(vars), notes: level === 1 ? ['On dérive en x : y est une constante.'] : [],
      lines: [{ math: c.d[0], note: '∂f/∂x : y est une constante', subgoal: 'row', blank: blank('x') }] },
    { html: 'Puis la dérivée par rapport à y :', ask: '∂f/∂y =', start: `pd(${c.f},y)`, judge: eqJ(vars),
      lines: [{ math: c.d[1], note: '∂f/∂y : x est une constante', subgoal: 'row', blank: blank('y') }] },
    { html: `Le gradient au point ${ptT(d.p)} :`, ask: `∇f${ptT(d.p)} =`, start: '∇f', judge: { kind: 'mat', expect: vecT([gx, gy]) },
      lines: [{ math: vecT([gx, gy]), note: 'On remplace x et y par les coordonnées du point', subgoal: 'evaluate', cells: [[0, 0], [1, 0]] }] },
  ];
  return partsItem({
    skill: PA, level, parts, subgoals: PA_SUB, key: `${PA}:grad:${c.f}:${d.p}`, fallback: d.fallback,
    prompt: `Soit f(x, y) = ${ML(c.f)}. Calcule ∂f/∂x et ∂f/∂y, puis ∇f${ptT(d.p)}.`,
    hints: H('∂f/∂x : dérive en x, y étant une constante (et inversement).', `∂f/∂x = ${ML(c.d[0])}`, `∇f${ptT(d.p)} = ${vecML([gx, gy])}`),
  });
}

const NUMBERED = /\[\[\s*-?\d|\(\s*-?\d/;
const SIZE_WHY = 'J_u a une ligne par composante de u et une colonne par variable.';
function sizeOptions(m, n) {
  const cands = [[m, n], [n, m], [m, n + 1], [m + 1, n]];
  const out = [];
  for (const [r, c] of cands) {
    if (out.some((o) => o.r === r && o.c === c)) continue;
    const ok = r === m && c === n;
    out.push({ r, c, id: `${r}x${c}`, label: `${r} lignes, ${c} colonnes`, valid: ok, ...(ok ? { ref: true } : { why: SIZE_WHY }), ...(!ok && r === n && c === m ? { rule: 'a2_jacobian_transposed' } : {}) });
  }
  return out.slice(0, 3).map(({ r, c, ...o }) => o);
}
function jacobianItem(level, rng, opts, { pow = false } = {}) {
  const shape = pow ? { m: 2, n: 3 } : rng.pick([{ m: 2, n: 3 }, { m: 2, n: 3 }, { m: 2, n: 2 }, { m: 3, n: 2 }]);
  // A matrix with a number the content test can change (see wrongLine in tests/uni-check.js).
  let d = mapData(rng, { ...shape, pow });
  const symOf = (x) => `[${x.comps.map((c) => `[${c.d.join(',')}]`).join(',')}]`;
  for (let t = 0; t < 40 && !NUMBERED.test(symOf(d)); t++) d = mapData(rng, { ...shape, pow });
  const { m, n, vars } = d;
  const sym = symOf(d);
  const num = rowT(d.J);
  const size = `${m} × ${n}`;
  const guided = level <= 2;
  const parts = [
    { start: 'J_u', judge: { kind: 'mat', vars, expect: sym },
      decisions: [{ kind: 'decision', prompt: 'Quelle taille a J_u ?', levels: [3], options: sizeOptions(m, n) }],
      notes: level <= 2 ? [`${m} composantes, ${n} variables : J_u est de taille ${size} (une ligne par composante, une colonne par variable).`] : [],
      menu: [
        { id: 'rows', label: 'Ligne i : les dérivées partielles de uᵢ', valid: true },
        { id: 'cols', label: 'Ligne i : les dérivées par rapport à la i-ème variable', valid: false, rule: 'a2_jacobian_transposed', why: SIZE_WHY },
      ],
      lines: [{ math: sym, note: `Une ligne par composante, une colonne par variable (${size})`, subgoal: 'row', cells: guided ? (level === 1 ? allCells(m, n).filter((_, k) => k % 2 === 0) : allCells(m, n)) : undefined }] },
    { html: `Au point ${ptT(d.p)} :`, ask: `J_u${ptT(d.p)} =`, start: 'J_u', judge: { kind: 'mat', expect: num },
      menu: [
        { id: 'eval', label: 'Remplacer les variables par les coordonnées du point', valid: true },
        { id: 'swap', label: 'Transposer la matrice', valid: false, rule: 'a2_jacobian_transposed', why: SIZE_WHY },
      ],
      lines: [{ math: num, note: 'On évalue chaque case au point', subgoal: 'evaluate', cells: guided ? allCells(m, n) : undefined }] },
  ];
  return partsItem({
    skill: PA, level, parts, subgoals: PA_SUB, key: `${PA}:jac:${sym}:${d.p}`, fallback: d.fallback,
    prompt: `Soit ${uML(d)}. Calcule la matrice jacobienne J_u, puis J_u${ptT(d.p)}.`,
    hints: H(`Une ligne par composante, une colonne par variable : J_u est ${size}.`, `Ligne 1 : (${d.comps[0].d.map((t) => ML(t)).join(', ')})`, `J_u${ptT(d.p)} = ${MLmat(num)}`),
  });
}

// Second derivatives and Schwarz (level 4).
function schwarzItem(level, rng) {
  for (let t = 0; t < 200; t++) {
    const P = polyComp(rng, 2, 3);
    const pxy = polyT(polyD(polyD(P.terms, 0), 1), VARS);
    if (P.d.some((x) => x === '0') || pxy === '0') continue;
    const kind = rng.pick(['sin', 'exp']);
    const k = rng.pick([1, 2]);
    const kk = k === 1 ? '' : String(k);
    const k2 = k === 1 ? '' : String(k * k);
    const S = kind === 'sin'
      ? { f: `sin(${kk}xy)`, fx: `${kk}ycos(${kk}xy)`, fxy: `${kk}cos(${kk}xy)-${k2}xysin(${kk}xy)` }
      : { f: `e^(${kk}xy)`, fx: `${kk}ye^(${kk}xy)`, fxy: `${kk}e^(${kk}xy)+${k2}xye^(${kk}xy)` };
    const f = joinSum([P.f, S.f]);
    const fx = joinSum([P.d[0], S.fx]);
    const fxy = joinSum([pxy, S.fxy]);
    const parts = [
      { start: `pd(${f},x)`, judge: eqJ(['x', 'y']), lines: [{ math: fx, note: 'Dérivée en x', subgoal: 'row' }] },
      { html: 'Dérive ∂f/∂x par rapport à y :', ask: '∂²f/∂y∂x =', start: `pd(${f},x,y)`, judge: eqJ(['x', 'y']), lines: [{ math: fxy, note: 'On dérive ∂f/∂x en y', subgoal: 'row' }] },
      { html: 'Puis dans l’autre ordre (∂f/∂y, puis en x) :', ask: '∂²f/∂x∂y =', start: `pd(${f},y,x)`, judge: eqJ(['x', 'y']), lines: [{ math: fxy, note: 'Le même résultat : f est C², le théorème de Schwarz s’applique', subgoal: 'evaluate' }] },
    ];
    return partsItem({
      skill: PA, level, parts, subgoals: PA_SUB, key: `${PA}:schwarz:${f}`,
      prompt: `Soit f(x, y) = ${ML(f)}. Calcule ∂f/∂x, puis les deux dérivées croisées ∂²f/∂y∂x et ∂²f/∂x∂y.`,
      hints: H('∂²f/∂y∂x : on dérive ∂f/∂x par rapport à y.', `∂f/∂x = ${ML(fx)}`, `∂²f/∂y∂x = ${ML(fxy)}`),
    });
  }
  return jacobianItem(level, rng, {});
}

function partialsMcq(level, rng, opts) {
  const d = mapData(rng, { m: 2, n: rng.pick([2, 3]) });
  const { J, m, n } = d;
  const T = J[0].map((_, j) => J.map((r) => r[j]));
  const right = MLmat(rowT(J));
  const wrongs = [];
  if (m !== n || rowT(T) !== rowT(J)) wrongs.push({ html: MLmat(rowT(T)), rule: 'a2_jacobian_transposed' });
  // A column dropped (a variable « absent » from a component forgotten).
  if (n > 2) wrongs.push({ html: MLmat(rowT(J.map((r) => r.slice(0, n - 1)))), rule: null });
  const fillers = [
    { html: MLmat(rowT([J[1], J[0]])), rule: null },
    { html: MLmat(rowT(J.map((r, i) => r.map((x, j) => (i === 0 && j === r.findIndex((y) => y !== 0) ? -x : x))))), rule: null },
    { html: MLmat(rowT(J.map((r) => r.map((x) => x + 1)))), rule: null },
  ];
  return examMcq({
    skill: PA, level, key: `${PA}:mcq:${d.comps.map((c) => c.f).join('|')}:${d.p}`, fallback: d.fallback,
    prompt: `Soit ${uML(d)}. La matrice jacobienne J_u${ptT(d.p)} vaut :`,
    right, wrongs, fillers,
    solution: [{ html: `Une ligne par composante, une colonne par variable : J_u${ptT(d.p)} = ${right}.`, note: '' }],
  }, rng, opts);
}

const K7 = K_LIBRARY.K7;
function partialsTf(level, rng, opts) {
  const which = rng.int(0, 3);
  const exam = examTag(opts) || { format: 'tf', points: 1 };
  if (which === 0) {
    return tfItem({ skill: PA, level: 4, exam, key: 'schwarz', truth: true, statement: 'Si f ∈ C²(ℝ²), alors ∂/∂y(∂f/∂x) = ∂/∂x(∂f/∂y).', explanation: 'C\'est le théorème de Schwarz : pour f ∈ C², les dérivées croisées sont égales.' });
  }
  if (which === 1) {
    return tfItem({ skill: PA, level: 4, exam, key: 'diff', truth: true, statement: 'Si f ∈ C²(ℝ²), alors ∂f/∂x est différentiable.', explanation: 'f ∈ C² : ∂f/∂x est C¹, donc différentiable (2019 Q28).' });
  }
  if (which === 2) {
    return tfItem({
      skill: PA, level: 4, exam, key: 'xx-yy', truth: false,
      statement: 'Si f ∈ C²(ℝ²), alors ∂²f/∂x² = ∂²f/∂y².',
      explanation: 'Faux : pour f = x², ∂²f/∂x² = 2 et ∂²f/∂y² = 0. Schwarz parle des dérivées croisées, pas de celles-ci.',
      counter: a2Counter('fxxNeqFyy', {}, [['f', 'f(x, y) =']], { f: 'x^2' }),
    });
  }
  return tfItem({
    skill: PA, level: 4, exam, key: 'no-c2', truth: false, ruleIfTrue: 'a2_schwarz_no_c2',
    statement: 'Si les dérivées croisées ∂²f/∂y∂x(0, 0) et ∂²f/∂x∂y(0, 0) existent, elles sont égales.',
    explanation: 'Faux : il faut f ∈ C². Pour f = xy(x² − y²)/(x² + y²), prolongée par 0, les deux dérivées croisées en (0, 0) valent −1 et 1.',
    counter: a2Counter('knownFn', { want: ['K7'] }, [['f', 'f(x, y) =']], { f: K7 }),
  });
}

function partialsGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return partialsMcq(4, rng, opts);
  if (opts.exam === 'tf') return partialsTf(4, rng, opts);
  if (level === 5) return partialsMcq(5, rng, opts);
  if (level === 1) return gradItem(level, rng, opts);
  if (level === 4) {
    const t = rng.int(0, 2);
    if (t === 0) return jacobianItem(level, rng, opts, { pow: true });
    if (t === 1) return schwarzItem(level, rng);
  }
  return jacobianItem(level, rng, opts);
}

// ======================================================================
// a2-tangent-graph
// ======================================================================

const TG = 'a2-tangent-graph';
const TG_SUB = [
  { id: 'value', label: 'f(a, b)', skill: PA },
  { id: 'partials', label: 'dérivées partielles au point', skill: PA },
  { id: 'plane', label: 'équation du plan', skill: 'g4-plane' },
  { id: 'simplify', label: 'simplifier', skill: 'g4-plane' },
];
// z = c + p(x − a) + r(y − b), its final form, and its texts.
function graphPlane(c, fx, fy, a, b) {
  let s = q(c).n === 0 ? '' : qt(c);
  s += termT(fx, shiftT('x', a), !s);
  s += termT(fy, shiftT('y', b), !s);
  return `z = ${s || '0'}`;
}
function graphFinal(c, fx, fy, a, b) {
  const d = q(c).sub(q(fx).mul(a)).sub(q(fy).mul(b));
  return `z = ${polyT([{ c: fx, e: [1, 0, 0] }, { c: fy, e: [0, 1, 0] }, { c: d, e: [0, 0, 0] }])}`;
}
// The numbers of f(a, b) as a sum: 2×(1)^2×(−1)−3×(−1)^2+1.
function substT(terms, p) {
  const out = terms.map(({ c, e }) => {
    const fs = e.map((k, i) => (k === 0 ? '' : `(${qt(p[i])})${k > 1 ? `^${k}` : ''}`)).filter(Boolean);
    const C = q(c);
    const absC = C.n < 0 ? C.neg() : C;
    const factors = absC.eq(1) && fs.length ? fs : [qt(absC), ...fs];
    return `${C.n < 0 ? '-' : '+'}${factors.join('×')}`;
  });
  return out.join('').replace(/^\+/, '') || '0';
}

function graphData(rng) {
  for (let t = 0; t < 200; t++) {
    const count = rng.int(3, 4);
    const terms = [];
    const keys = new Set();
    for (let s = 0; terms.length < count && s < 60; s++) {
      const i = rng.int(0, 3);
      const j = rng.int(0, 3 - i);
      if (i + j === 0 || keys.has(`${i},${j}`)) continue;
      keys.add(`${i},${j}`);
      terms.push({ c: q(nz(rng, -3, 3)), e: [i, j, 0] });
    }
    if (!terms.some((x) => x.e[0] > 0 && x.e[1] > 0)) continue;
    const a = rng.int(-2, 2);
    const b = rng.int(-2, 2);
    const p = [a, b, 0];
    const dx = polyD(terms, 0);
    const dy = polyD(terms, 1);
    const c = polyAt(terms, p);
    const fx = polyAt(dx, p);
    const fy = polyAt(dy, p);
    if (fx.n === 0 && fy.n === 0) continue;
    if (Math.abs(c.n) > 30 || Math.abs(fx.n) > 20 || Math.abs(fy.n) > 20) continue;
    return { terms, dx, dy, a, b, c, fx, fy, f: polyT(terms) };
  }
  const terms = [{ c: q(1), e: [2, 0, 0] }, { c: q(1), e: [0, 2, 0] }];
  return { terms, dx: polyD(terms, 0), dy: polyD(terms, 1), a: 1, b: 1, c: q(2), fx: q(2), fy: q(2), f: 'x^2+y^2', fallback: true };
}
const tangentCfg = (d) => ({ p: [d.a, d.b, d.c].map(qt), n: [qt(d.fx), qt(d.fy), '-1'], graph: true });

function graphItem(level, rng, opts = {}) {
  const d = graphData(rng);
  const { a, b, c, fx, fy } = d;
  const P = [a, b, 0];
  const pt = ptT([a, b]);
  const plane = graphPlane(c, fx, fy, a, b);
  const fin = graphFinal(c, fx, fy, a, b);
  const flip = b !== 0 ? [a, -b] : [-a, b];
  const pointDec = {
    kind: 'decision', prompt: 'Par quel point passe le plan tangent ?', levels: [3], options: [
      { id: 'p', label: `(${fq(a)} ; ${fq(b)} ; f${pt})`, valid: true, ref: true },
      { id: 'flip', label: `(${fq(flip[0])} ; ${fq(flip[1])} ; f${ptT(flip)})`, valid: false, rule: 'a2_tangent_point_sign', why: `Le point de contact est au-dessus de ${pt}.` },
      { id: 'zero', label: `(${fq(a)} ; ${fq(b)} ; 0)`, valid: false, why: 'Le point est sur le graphe : sa cote est f(a, b), pas 0.' },
    ],
  };
  const valMenu = [
    { id: 'subst', label: 'Remplacer x et y par les coordonnées du point', valid: true },
    { id: 'plane', label: 'Écrire le plan tout de suite', valid: false, why: 'Il faut d\'abord les trois nombres f(a, b), f_x(a, b), f_y(a, b).' },
  ];
  const parts = [
    { start: 'f', judge: { kind: 'value', expect: qt(c) }, decisions: [pointDec], menu: valMenu,
      lines: [
        { math: substT(d.terms, P), note: `On remplace x par ${fq(a)} et y par ${fq(b)}`, subgoal: 'value', from: level <= 2 ? 1 : 9 },
        { math: qt(c), note: `f${pt} = ${fq(c)}`, subgoal: 'value' },
      ] },
    { html: `∂f/∂x = ${ML(polyT(d.dx))}, au point :`, ask: `∂f/∂x${pt} =`, start: 'f_x', judge: { kind: 'value', expect: qt(fx) }, menu: valMenu,
      lines: [{ math: qt(fx), note: '', subgoal: 'partials' }] },
    { html: `∂f/∂y = ${ML(polyT(d.dy))}, au point :`, ask: `∂f/∂y${pt} =`, start: 'f_y', judge: { kind: 'value', expect: qt(fy) }, menu: valMenu,
      lines: [{ math: qt(fy), note: '', subgoal: 'partials' }] },
    { html: 'Le plan tangent :', ask: 'π :', start: 'π', judge: { kind: 'geom', object: 'plane', ref: fin, tangent: tangentCfg(d) },
      menu: [
        { id: 'formula', label: 'z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)', valid: true },
        { id: 'simplify', label: 'Développer et simplifier', valid: true },
        { id: 'plus', label: 'z = f(a, b) + f_x(a, b)(x + a) + f_y(a, b)(y + b)', valid: false, rule: 'a2_tangent_point_sign', why: 'Le plan doit passer par (a, b, f(a, b)) : en x = a, y = b, il faut z = f(a, b).' },
        { id: 'nof', label: 'z = f_x(a, b)(x − a) + f_y(a, b)(y − b)', valid: false, why: 'Le plan doit passer par (a, b, f(a, b)) : il manque f(a, b).' },
      ],
      lines: planeLines(
        { math: plane, note: 'z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)', subgoal: 'plane', blank: [qt(fx), qt(fy)], blank2: [shiftT('x', a), shiftT('y', b)].filter((s) => s.length > 1) },
        { math: fin, note: 'Développé', subgoal: 'simplify' },
      ) },
  ];
  // The derivatives are given at levels 1 and 2 (the parts ask their value).
  if (level >= 3) { parts[1].html = 'La dérivée partielle par rapport à x, au point :'; parts[2].html = 'La dérivée partielle par rapport à y, au point :'; }
  return partsItem({
    skill: TG, level, parts, subgoals: TG_SUB, key: `${TG}:${d.f}:${a},${b}`, fallback: d.fallback,
    prompt: `Soit f(x, y) = ${ML(d.f)}. Donne une équation du plan tangent au graphe de f au point d'abscisse ${pt}.`,
    hints: H('Il faut f(a, b), f_x(a, b) et f_y(a, b).', `z = ${fq(c)} + (…)(${RD(shiftT('x', a))}) + (…)(${RD(shiftT('y', b))})`, ML(plane)),
  });
}

// « Where is the tangent plane horizontal? » (level 4).
function horizontalItem(level, rng) {
  for (let t = 0; t < 200; t++) {
    const A = nz(rng, -2, 2);
    const B = rng.int(-2, 2);
    const C = nz(rng, -2, 2);
    if (4 * A * C - B * B === 0) continue;
    const x0 = rng.int(-2, 2);
    const y0 = rng.int(-2, 2);
    const D = -(2 * A * x0 + B * y0);
    const E = -(B * x0 + 2 * C * y0);
    const k = rng.int(-3, 3);
    const terms = [{ c: q(A), e: [2, 0, 0] }, { c: q(B), e: [1, 1, 0] }, { c: q(C), e: [0, 2, 0] }, { c: q(D), e: [1, 0, 0] }, { c: q(E), e: [0, 1, 0] }, { c: q(k), e: [0, 0, 0] }].filter((x) => x.c.n !== 0);
    if (terms.length < 4) continue;
    const z0 = polyAt(terms, [x0, y0, 0]);
    const f = polyT(terms);
    const fx = polyT(polyD(terms, 0));
    const fy = polyT(polyD(terms, 1));
    const parts = [
      { start: 'f_x = 0 ; f_y = 0', judge: { kind: 'system', vars: ['x', 'y'], solutions: [[qt(x0), qt(y0)]] },
        lines: [
          { math: `${fx} = 0 ; ${fy} = 0`, note: 'Plan horizontal : ∇f = 0', subgoal: 'partials' },
          { math: `(${qt(x0)} ; ${qt(y0)})`, note: 'On résout le système', subgoal: 'value' },
        ] },
      { html: 'La cote du point :', ask: `f${ptT([x0, y0])} =`, start: 'f', judge: { kind: 'value', expect: qt(z0) }, lines: [{ math: qt(z0), note: '', subgoal: 'value' }] },
      { html: 'Le plan tangent en ce point :', ask: 'π :', start: 'π', judge: { kind: 'geom', object: 'plane', ref: `z = ${qt(z0)}` }, lines: [{ math: `z = ${qt(z0)}`, note: 'f_x = f_y = 0 : z = f(a, b)', subgoal: 'plane' }] },
    ];
    return partsItem({
      skill: TG, level, parts, subgoals: TG_SUB, key: `${TG}:horiz:${f}`,
      prompt: `Soit f(x, y) = ${ML(f)}. En quel point (a, b) le plan tangent au graphe de f est-il horizontal ? Donne ce point, puis l'équation du plan.`,
      hints: H('Le plan z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b) est horizontal si f_x(a, b) = f_y(a, b) = 0.', `${ML(`${fx} = 0`)} et ${ML(`${fy} = 0`)}`, `(a ; b) = ${ptT([x0, y0])}`),
    });
  }
  return graphItem(level, rng);
}

const planeML = (t) => ML(t);
function graphMcq(level, rng, opts) {
  const d = graphData(rng);
  const { a, b, c, fx, fy } = d;
  const right = planeML(graphFinal(c, fx, fy, a, b));
  const wrongs = [
    ...((a !== 0 || b !== 0) ? [{ html: planeML(graphFinal(c, fx, fy, -a, -b)), rule: 'a2_tangent_point_sign' }] : []),
    ...(c.n !== 0 ? [{ html: planeML(graphFinal(0, fx, fy, a, b)), rule: null }] : []),
    { html: planeML(graphFinal(c, fy, fx, a, b)), rule: null },
    { html: planeML(graphFinal(c, fx.neg(), fy.neg(), a, b)), rule: null },
    { html: planeML(graphFinal(c.add(1), fx, fy, a, b)), rule: null },
  ];
  return examMcq({
    skill: TG, level, key: `${TG}:mcq:${d.f}:${a},${b}`, fallback: d.fallback,
    prompt: `Soit f(x, y) = ${ML(d.f)}. Le plan tangent au graphe de f au point (${fq(a)}, ${fq(b)}, f(${fq(a)}, ${fq(b)})) a pour équation :`,
    right, wrongs,
    solution: [{ html: `f${ptT([a, b])} = ${fq(c)}, f_x = ${fq(fx)}, f_y = ${fq(fy)} : ${ML(graphPlane(c, fx, fy, a, b))}, soit ${right}.`, note: '' }],
  }, rng, opts);
}
const TG_TF = [
  { truth: true, key: 'min', s: 'Si f ∈ C¹, f(0, 0) = 3 et f a un minimum local en (0, 0), le plan tangent au graphe de f en (0, 0, 3) est z = 3.', why: 'Vrai : en un minimum local, ∇f(0, 0) = 0, donc z = f(0, 0) + 0 = 3 (2019 Q23).' },
  { truth: false, key: 'normal', s: 'Le vecteur (f_x(a, b), f_y(a, b), 1) est normal au plan tangent au graphe de f en (a, b, f(a, b)).', why: 'Faux : le plan s\'écrit f_x(a, b)(x − a) + f_y(a, b)(y − b) − (z − f(a, b)) = 0 ; une normale est (f_x(a, b), f_y(a, b), −1).' },
  { truth: true, key: 'curve', s: 'Le plan tangent au graphe de f en (a, b, f(a, b)) contient la tangente en x = a à la courbe z = f(x, b) tracée dans le plan y = b.', why: 'Vrai : dans le plan y = b, le plan tangent devient z = f(a, b) + f_x(a, b)(x − a), la tangente de x ↦ f(x, b).' },
];
function graphGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return graphMcq(4, rng, opts);
  if (opts.exam === 'tf') { const t = rng.pick(TG_TF); return vfMcq(TG, t.s, t.truth, rng, { key: t.key, why: t.why }); }
  if (level === 5) return rng.chance(0.5) ? graphMcq(5, rng, opts) : graphItem(5, rng, opts);
  if (level === 4 && rng.chance(0.35)) return horizontalItem(level, rng);
  return graphItem(level, rng, opts);
}

// ======================================================================
// a2-tangent-level
// ======================================================================

const TL = 'a2-tangent-level';
const TL_SUB = [
  { id: 'gradient', label: '∇F', skill: PA },
  { id: 'evaluate', label: '∇F(p)', skill: PA },
  { id: 'plane', label: '∇F(p)·(x − p) = 0', skill: TL },
  { id: 'simplify', label: 'simplifier', skill: 'g4-plane' },
];
// A term of F: {f, d: [3 texts]}.
function levelTerm(rng, p) {
  const kind = rng.pick(['mono', 'mono', 'mono', 'exp', 'cos', 'quart']);
  if (kind === 'exp') {
    const pairs = [[0, 1], [0, 2], [1, 2]].filter(([i, j]) => p[i] * p[j] === 0);
    if (!pairs.length) return null;
    const [i, j] = rng.pick(pairs);
    const k = rng.pick([1, 2]);
    const kk = k === 1 ? '' : String(k);
    const d = ['0', '0', '0'];
    d[i] = `${kk}${VARS[j]}e^(${VARS[i]}${VARS[j]})`;
    d[j] = `${kk}${VARS[i]}e^(${VARS[i]}${VARS[j]})`;
    return { f: `${kk}e^(${VARS[i]}${VARS[j]})`, d };
  }
  if (kind === 'cos') {
    const i = rng.int(0, 2);
    const d = ['0', '0', '0'];
    d[i] = `-πsin(π${VARS[i]})`;
    return { f: `cos(π${VARS[i]})`, d };
  }
  const e = [0, 0, 0];
  if (kind === 'quart') e[rng.int(0, 2)] = 4;
  else {
    const deg = rng.int(2, 3);
    for (let s = 0; s < deg; s++) e[rng.int(0, 2)]++;
  }
  const terms = [{ c: q(nz(rng, -2, 2)), e }];
  return { f: polyT(terms), d: [0, 1, 2].map((i) => polyT(polyD(terms, i))), key: e.join() };
}
function levelData(rng) {
  for (let t = 0; t < 200; t++) {
    const p = [0, 1, 2].map(() => rng.int(-2, 2));
    const count = rng.int(3, 4);
    const terms = [];
    for (let s = 0; terms.length < count && s < 20; s++) {
      const x = levelTerm(rng, p);
      if (x && !terms.some((y) => (y.key ?? y.f) === (x.key ?? x.f))) terms.push(x);
    }
    if (terms.length < 3) continue;
    const F = joinSum(terms.map((x) => x.f));
    const G = [0, 1, 2].map((i) => joinSum(terms.map((x) => x.d[i])));
    if (G.some((g) => g === '0') || !/^-?\d/.test(G[0])) continue;
    const n = G.map((g) => valAt(g, VARS, p));
    const c = valAt(F, VARS, p);
    if (!n.every(isInt) || !isInt(c) || n.every((x) => Math.round(x) === 0) || n.some((x) => Math.abs(x) > 40) || Math.abs(c) > 60) continue;
    if (n.filter((x) => Math.round(x) !== 0).length < 2) continue;
    return { F, G, p, n: n.map(Math.round), c: Math.round(c) };
  }
  return { F: 'x^2+y^2+z^2', G: ['2x', '2y', '2z'], p: [1, 1, 1], n: [2, 2, 2], c: 3, fallback: true };
}
const gcd2 = (a, b) => (b ? gcd2(b, a % b) : Math.abs(a));
const gcdOf = (xs) => xs.reduce((g, x) => gcd2(g, x), 0);
const levelPlane = (n, p) => `${[0, 1, 2].map((i) => termT(n[i], shiftT(VARS[i], p[i]), i === 0)).join('').replace(/^\+/, '')} = 0`;
function levelFinal(n, p, rhsShift = 0) {
  const w = prim(n.map((x) => q(x)));
  const k = q(n.find((x) => x !== 0)).div(w.find((x) => x.n !== 0));
  const rhs = w.reduce((s, x, i) => s.add(x.mul(p[i])), q(0)).add(q(rhsShift).div(k));
  return `${polyT(w.map((x, i) => ({ c: x, e: [0, 1, 2].map((j) => (j === i ? 1 : 0)) })))} = ${qt(rhs)}`;
}

function levelItem(level, rng, opts = {}) {
  const d = levelData(rng);
  const { n, p, c } = d;
  const grad = `(${d.G.join(' ; ')})`;
  const plane = levelPlane(n, p);
  const fin = levelFinal(n, p);
  const guided = level <= 2;
  const S = `${ML(d.F)} = ${fq(c)}`;
  const dec = {
    kind: 'decision', prompt: 'Comment obtenir une normale au plan tangent ?', levels: [3], options: [
      { id: 'level', label: 'S est la surface de niveau F = c : ∇F(p) est normal', valid: true, ref: true },
      { id: 'graph', label: 'Résoudre en z, puis plan tangent au graphe', valid: true, quality: 'poor', why: 'Possible, mais résoudre en z est long (et pas toujours possible) : ∇F(p) donne directement une normale.' },
      { id: 'rhs', label: 'Le plan est ∇F(p)·(x − p) = c', valid: false, rule: 'a2_tangent_level_rhs', why: 'Le plan passe par p : en x = p, ∇F(p)·(x − p) vaut 0, pas c.' },
    ],
  };
  const parts = [];
  if (level >= 2) {
    parts.push({ start: '∇F', judge: { kind: 'mat', vars: VARS, expect: grad }, decisions: [dec],
      menu: [{ id: 'grad', label: 'Dériver F par rapport à x, à y, puis à z', valid: true }, { id: 'eval', label: 'Remplacer par le point d\'abord', valid: false, why: 'On dérive d\'abord, puis on remplace : sinon tout devient constant.' }],
      lines: [{ math: grad, note: '∇F = (∂F/∂x, ∂F/∂y, ∂F/∂z)', subgoal: 'gradient', cells: level === 2 ? [[0, 0], [1, 0], [2, 0]] : undefined }] });
  }
  parts.push({ html: level >= 2 ? `Au point p = ${ptT(p)} :` : '', ask: `∇F${ptT(p)} =`, start: '∇F', judge: { kind: 'mat', expect: vecT(n) },
    menu: [{ id: 'eval', label: 'Remplacer x, y, z par les coordonnées de p', valid: true }],
    lines: [{ math: vecT(n), note: 'On évalue au point', subgoal: 'evaluate', cells: guided ? [[0, 0], [1, 0], [2, 0]] : undefined }] });
  parts.push({ html: 'Le plan tangent :', ask: 'π :', start: 'π', judge: { kind: 'geom', object: 'plane', ref: fin, level: { p: p.map(qt), n: n.map(qt), c: qt(c) }, tangent: { p: p.map(qt), n: n.map(qt) } },
    menu: [
      { id: 'formula', label: '∇F(p)·(x − p) = 0', valid: true },
      { id: 'simplify', label: 'Développer et simplifier', valid: true },
      { id: 'rhs', label: '∇F(p)·(x − p) = c', valid: false, rule: 'a2_tangent_level_rhs', why: 'En x = p, le membre de gauche vaut 0 : le second membre est 0, pas c.' },
      { id: 'plus', label: '∇F(p)·(x + p) = 0', valid: false, rule: 'a2_tangent_point_sign', why: 'Le plan doit passer par p : remplace x par p, tu dois obtenir 0.' },
    ],
    lines: planeLines(
      { math: plane, note: '∇F(p)·(x − p) = 0', subgoal: 'plane', blank: p.map((x, i) => shiftT(VARS[i], x)).filter((s) => s.length > 1), blank2: p.map((x, i) => shiftT(VARS[i], x)).filter((s) => s.length > 1) },
      { math: fin, note: gcdOf(n) > 1 ? `Développé, puis divisé par ${gcdOf(n)}` : 'Développé', subgoal: 'simplify' },
    ) });
  const first = parts[0];
  if (level === 1) first.notes = [`∇F = ${MLmat(grad, { vars: VARS })}`];
  if (level === 1) first.decisions = [dec];
  return partsItem({
    skill: TL, level, parts, subgoals: TL_SUB, key: `${TL}:${d.F}:${p}`, fallback: d.fallback,
    prompt: `Soit S la surface ${S}, et p = ${ptT(p)} ∈ S. Donne une équation cartésienne du plan tangent à S en p.`,
    hints: H('Le gradient de F au point est normal à la surface.', `∇F${ptT(p)} = ${vecML(n.map(qt))}, puis ∇F(p)·(x − p) = 0.`, ML(plane)),
  });
}

function levelMcq(level, rng, opts) {
  const d = levelData(rng);
  const { n, p, c } = d;
  const right = ML(levelFinal(n, p));
  const wrongs = [
    ...(c !== 0 ? [{ html: ML(levelFinal(n, p, c)), rule: 'a2_tangent_level_rhs' }] : []),
    ...(p.some((x) => x !== 0) ? [{ html: ML(levelFinal(n, p.map((x) => -x))), rule: 'a2_tangent_point_sign' }] : []),
  ];
  const fillers = [0, 1, 2].filter((i) => n[i] !== 0).map((i) => ({ html: ML(levelFinal(n.map((x, j) => (j === i ? -x : x)), p)), rule: null }));
  return examMcq({
    skill: TL, level, key: `${TL}:mcq:${d.F}:${p}`, fallback: d.fallback,
    prompt: `Le plan tangent à la surface ${ML(d.F)} = ${fq(c)} au point ${ptT(p)} a pour équation :`,
    right, wrongs, fillers,
    solution: [{ html: `∇F${ptT(p)} = ${vecML(n.map(qt))} ; ${ML(levelPlane(n, p))}, soit ${right}.`, note: '' }],
  }, rng, opts);
}
const TL_TF = [
  { truth: true, key: 'curve', s: 'Si F(g(t)) = c pour tout t (g dérivable, F ∈ C¹), alors ∇F(g(t₀))·g′(t₀) = 0.', why: 'Vrai : on dérive F(g(t)) = c par la règle de chaîne : ∇F(g(t))·g′(t) = 0 (2021 Q25).' },
  { truth: true, key: 'graph2d', s: 'Pour F(x, y) = y − f(x), avec f dérivable, ∇F(x₀, f(x₀)) est orthogonal à la tangente au graphe de f en x₀.', why: 'Vrai : ∇F = (−f′(x₀), 1) et la tangente a pour direction (1, f′(x₀)) : le produit scalaire est nul (2020 Q19).' },
  { truth: false, key: 'tangent', s: 'Si ∇F(p) ≠ 0, le vecteur ∇F(p) est tangent à la surface F = c en p.', why: 'Faux : ∇F(p) est normal (orthogonal) à la surface en p ; le plan tangent est ∇F(p)·(x − p) = 0.' },
];
function levelGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return levelMcq(4, rng, opts);
  if (opts.exam === 'tf') { const t = rng.pick(TL_TF); return vfMcq(TL, t.s, t.truth, rng, { key: t.key, why: t.why }); }
  if (level === 5) return levelMcq(5, rng, opts);
  return levelItem(level, rng, opts);
}

export const GEN = { [PA]: partialsGen, [TG]: graphGen, [TL]: levelGen };
