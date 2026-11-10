// g10-conic-from-data and g10-conic-tangent (module G10, part b; step U5).
//
// From the elements: the definition MF = e·d(M, D) is a line of the judge
// `conic` (the equation with √ and |…| is squared by js/cas/geomobj.js), so
// every line from the definition to the reduced form is compared with the
// conic itself; the last one is in standard form. Built from the reduced
// conic: e = 1/2 (a = 2c), e = 2 (c = 4, a = 2), e = 1 (parabola) for F, D, e
// (whole directrix); e ∈ {3/5, 4/5, 5/4, 5/3, 1/2, 2} for centre, focus, e.
//
// Tangents: dedoubling x² → x₀x, xy → (x₀y + xy₀)/2, x → (x + x₀)/2 at a whole
// point T of the conic (judge geom); from a point Q: the polar of Q, the
// points of contact (vector), then both tangents (geom, count 2).

import { Q } from '../../math/rational.js';
import {
  q, qt, fq, nz, H, vt, vr, sumT, eqT, rootT, partsItem, mcqD, examTag, MT, prim, linT, readable,
} from './geo-kit.js';
import { DeltaOf } from './coniques-b-kit.js';

const MTxy = (t) => MT(t, { vars: ['x', 'y'] });
// x − a as text: x, x - 2, x + 3.
const minus = (v, a) => { const r = q(a); return r.n === 0 ? v : r.n > 0 ? `${v} - ${qt(r)}` : `${v} + ${qt(r.neg())}`; };
const sq = (v, a) => (q(a).n === 0 ? `${v}^2` : `(${minus(v, a)})^2`);
const par = (x) => (q(x).n < 0 ? `(${qt(x)})` : qt(x));
const poly6 = (co) => sumT([[co[0], 'x^2'], [co[1], 'xy'], [co[2], 'y^2'], [co[3], 'x'], [co[4], 'y'], [co[5], '']]);
const add6 = (a, b, k = 1) => a.map((x, i) => q(x).add(q(b[i]).mul(k)));
// (v − a)² as [x², xy, y², x, y, 1].
const sq6 = (v, a) => (v === 'x' ? [1, 0, 0, q(a).mul(-2), 0, q(a).mul(q(a))] : [0, 0, 1, 0, q(a).mul(-2), q(a).mul(q(a))]).map((x) => q(x));
const scale6 = (co, k) => co.map((x) => q(x).mul(q(k)));
// Leading coefficient positive, whole and coprime.
function tidy6(co) {
  const den = co.reduce((l, x) => { const d = q(x).d; const g = (a, b) => (b ? g(b, a % b) : a); return (l * d) / g(l, d); }, 1);
  let w = co.map((x) => q(x).mul(den).n);
  const g = w.reduce((s, x) => { const gg = (a, b) => (b ? gg(b, a % b) : Math.abs(a)); return gg(s, x); }, 0) || 1;
  w = w.map((x) => x / g);
  if (w.find((x) => x !== 0) < 0) w = w.map((x) => -x);
  return w.map((x) => q(x));
}

// ======================================================================
// g10-conic-from-data
// ======================================================================

const FD = 'g10-conic-from-data';
const FD_SUB = [
  { id: 'def', label: 'écrire MF = e·d(M, D)', skill: FD },
  { id: 'square', label: 'élever au carré', skill: 'g1-irr-eq' },
  { id: 'recog', label: 'reconnaître la conique', skill: 'g10-ellipse' },
];

const E_FDE = [[1, 2], [2, 1], [1, 1]];

// Focus, directrix, eccentricity: the conic, its lines, its standard form.
export function fdeData(rng, e = null) {
  const [p, qq] = e ?? rng.pick(E_FDE);
  const main = rng.pick(['x', 'y']);
  const other = main === 'x' ? 'y' : 'x';
  const h = rng.int(-3, 3);
  const k = rng.int(-3, 3);
  const dir = rng.pick([1, -1]);
  const C = main === 'x' ? [h, k] : [k, h]; // (centre or vertex) as (x ; y)
  const at = (along, across) => (main === 'x' ? [along, across] : [across, along]);
  let F; let dval; let std; let type; let a2; let b2; let c;
  if (p === qq) {
    const f0 = rng.int(1, 3) * dir;
    F = at(h + f0, k);
    dval = h - f0;
    type = 'par';
    std = `${sq(other, k)} = ${4 * f0}(${minus(main, h)})`;
  } else {
    c = p < qq ? rng.int(1, 3) : 4;
    const a = p < qq ? 2 * c : 2;
    a2 = a * a;
    b2 = p < qq ? 3 * c * c : 12;
    F = at(h + dir * c, k);
    dval = h + (dir * a2) / c;
    type = p < qq ? 'ell' : 'hyp';
    const X = `${sq(main, h)}/${a2}`;
    const Y = `${sq(other, k)}/${b2}`;
    std = type === 'ell' ? (main === 'x' ? `${X} + ${Y} = 1` : `${Y} + ${X} = 1`) : `${X} - ${Y} = 1`;
  }
  // q²((x − Fx)² + (y − Fy)²) − p²(main − d)² = 0.
  const L = add6(sq6('x', F[0]), sq6('y', F[1]));
  const R = sq6(main, dval);
  const co = add6(scale6(L, qq * qq), R, -p * p);
  const eT = p === qq ? '' : qq === 1 ? `${p}` : `(${p}/${qq})·`;
  const def = `√(${sq('x', F[0])} + ${sq('y', F[1])}) = ${eT}|${minus(main, dval)}|`;
  const e2 = new Q(p * p, qq * qq);
  const sqLine = `${sq('x', F[0])} + ${sq('y', F[1])} = ${p === qq ? '' : e2.d === 1 ? qt(e2) : ''}${sq(main, dval)}${e2.d !== 1 ? `/${e2.d}` : ''}`;
  const mult = `${poly6(scale6(L, qq * qq))} = ${poly6(scale6(R, p * p))}`;
  const red = eqT(tidy6(co));
  return { p, qq, main, F, d: dval, co: tidy6(co), def, sqLine, mult, red, std, type, C, a2, b2, c, e: [p, qq] };
}

const eS = (e) => (e[1] === 1 ? String(e[0]) : `${e[0]}/${e[1]}`);
const DNAME = (d) => `${d.main} = ${fq(d.d)}`;
const TYPE_NAME = { ell: 'une ellipse', hyp: 'une hyperbole', par: 'une parabole' };

const recogDecision = (type, e) => ({
  kind: 'decision', prompt: `e = ${e[0] === e[1] ? '1' : eS(e)} : quelle conique ?`, options: [
    { id: 'ell', label: 'e < 1 : une ellipse', valid: type === 'ell', rule: type === 'hyp' ? 'g10_e_inverted' : undefined, why: 'Regarde e : e < 1 ellipse, e = 1 parabole, e > 1 hyperbole.' },
    { id: 'par', label: 'e = 1 : une parabole', valid: type === 'par', why: 'Regarde e : e < 1 ellipse, e = 1 parabole, e > 1 hyperbole.' },
    { id: 'hyp', label: 'e > 1 : une hyperbole', valid: type === 'hyp', rule: type === 'ell' ? 'g10_e_inverted' : undefined, why: 'Regarde e : e < 1 ellipse, e = 1 parabole, e > 1 hyperbole.' },
  ],
});

function fdeItem(level, rng, opts = {}) {
  const d = fdeData(rng);
  const fde = { F: d.F.map(qt), D: { v: d.main, k: qt(d.d) }, e: d.e };
  const judge = { kind: 'conic', equation: d.red, target: 'standard', fde };
  const lines = [
    { math: d.sqLine, note: 'Les deux membres sont positifs : élever au carré', subgoal: 'square', blank: [d.p === d.qq ? sq(d.main, d.d) : sq(d.main, d.d)] },
    { math: d.mult, note: 'Développer', subgoal: 'square', blank: [d.mult.split(' = ')[1]] },
    { math: d.red, note: 'Tout du même côté', subgoal: 'recog', blank: [] },
    { math: d.std, note: 'Forme réduite : compléter les carrés', subgoal: 'recog', blank: d.type === 'par' ? [] : [String(d.a2), String(d.b2)] },
  ];
  const parts = [{
    html: `MF = e·d(M, D) avec M(x ; y), F = ${vr(d.F)}, D : ${DNAME(d).replace(/-/g, '−')}.`, ask: '', start: d.def, judge,
    menu: [
      { id: 'def', label: 'Écrire MF et d(M, D), puis élever au carré', valid: true },
      { id: 'inv', label: 'Écrire e·MF = d(M, D)', valid: false, rule: 'g10_e_inverted', why: 'La définition est MF = e·d(M, D) : le foyer est du côté du e.' },
      { id: 'recog', label: 'Reconnaître la conique (forme réduite)', valid: true },
    ],
    decisions: [
      { levels: [2, 3], kind: 'decision', prompt: 'Quelle méthode ?', options: [
        { id: 'fd', label: 'Foyer-directrice : MF = e·d(M, D)', valid: true, quality: 'good', ref: true },
        { id: 'param', label: 'Forme réduite à paramètres (centre, a, b)', valid: true, quality: 'poor', why: 'Possible, mais il faut d\'abord trouver le centre et a à partir de F, D et e : la définition va plus vite ici.' },
      ] },
      recogDecision(d.type, d.e),
    ],
    lines,
  }];
  return partsItem({
    skill: FD, level, parts, subgoals: FD_SUB,
    prompt: `Trouve l'équation de la conique de foyer F${vr(d.F)}, de directrice D : ${DNAME(d).replace(/-/g, '−')} et d'excentricité e = ${d.e[0] === d.e[1] ? '1' : eS(d.e)}, puis nomme-la.`,
    hints: H(
      'Écris la distance au foyer et la distance à la directrice, puis élève au carré.',
      `${readable(d.sqLine.replace(/\(\d+\/\d+\)·/, ''))}`.replace(/\(([xy][^)]*)\)\^2\/(\d+)$/, '(□)²/$2'),
      readable(d.red),
    ),
    key: `${FD}:fde:${d.def}`, exam: opts.exam ? examTag(opts) : false,
  });
}

// Centre, focus, e (gabarit 2) and centre, vertex, point (gabarit 3).
const CFE = [[3, 5, 5, 4], [4, 5, 5, 3], [5, 4, 4, 3], [5, 3, 3, 4], [1, 2, 2, 0], [2, 1, 1, 0]];
function cfeItem(level, rng, opts = {}) {
  const [cc, , aa, bb] = rng.pick(CFE);
  const half = bb === 0;
  const c = half ? rng.pick([1, 2]) * (aa > cc ? 1 : 2) : cc;
  const a = half ? (aa > cc ? 2 * c : c / 2) : aa;
  const b2 = half ? Math.abs(a * a - c * c) : bb * bb;
  const type = a > c ? 'ell' : 'hyp';
  const main = rng.pick(['x', 'y']);
  const other = main === 'x' ? 'y' : 'x';
  const h = rng.int(-4, 4);
  const k = rng.int(-4, 4);
  const O = main === 'x' ? [h, k] : [k, h];
  const s = rng.pick([1, -1]);
  const F = main === 'x' ? [h + s * c, k] : [k, h + s * c];
  const e = new Q(c, a);
  const X = `${sq(main, h)}/${a * a}`;
  const Y = `${sq(other, k)}/${b2}`;
  const std = type === 'ell' ? (main === 'x' ? `${X} + ${Y} = 1` : `${Y} + ${X} = 1`) : `${X} - ${Y} = 1`;
  // The expanded equation, for the judge.
  const co = add6(scale6(sq6(main, h), b2), scale6(sq6(other, k), type === 'ell' ? a * a : -a * a));
  co[5] = co[5].sub(a * a * b2);
  const red = eqT(tidy6(co));
  const judge = { kind: 'conic', equation: red, target: 'standard' };
  const bT = rootT(b2);
  return partsItem({
    skill: FD, level, subgoals: FD_SUB,
    parts: [{
      html: type === 'ell' ? 'Ellipse : c = ΩF, a = c/e, b² = a² − c².' : 'Hyperbole : c = ΩF, a = c/e, b² = c² − a².', ask: '', start: 'Γ', judge,
      decisions: [recogDecision(type, [e.n, e.d])],
      lines: [
        { math: `c = ${c}`, note: `c = ΩF`, subgoal: 'def', blank: [String(c)] },
        { math: `a = ${a}`, note: `a = c/e = ${c}/(${fq(e)})`, subgoal: 'def', blank: [String(a)] },
        { math: `b = ${bT}`, note: type === 'ell' ? 'b² = a² − c²' : 'b² = c² − a²', subgoal: 'def', blank: [bT] },
        { math: std, note: `Axe ${type === 'ell' ? 'focal' : 'réel'} parallèle à O${main}`, subgoal: 'recog', blank: [String(a * a), String(b2)] },
      ],
    }],
    prompt: `Une conique a pour centre Ω${vr(O)}, pour foyer F${vr(F)} et pour excentricité e = ${fq(e)}. Trouve son équation réduite.`,
    hints: H('c = ΩF et e = c/a donnent a ; puis b² avec la relation de la conique.', `a = ${c}/(${fq(e)}) = □`, std.replace(/\^2/g, '²')),
    key: `${FD}:cfe:${vt(O)}${vt(F)}${e}`, exam: opts.exam ? examTag(opts, 5) : false,
  });
}

// Gabarit 3 (level 5): centre, a vertex on the major axis, a point.
function cvpItem(level, rng, opts = {}) {
  const a = rng.pick([2, 4, 6]);
  const y0 = rng.pick([3, 6]);
  const b2 = (4 * y0 * y0) / 3; // (a/2)²/a² + y0²/b² = 1
  const main = rng.pick(['x', 'y']);
  const other = main === 'x' ? 'y' : 'x';
  const h = rng.int(-3, 3);
  const k = rng.int(-3, 3);
  const at = (along, across) => (main === 'x' ? [along, across] : [across, along]);
  const O = at(h, k);
  const S = at(h + a, k);
  const s = rng.pick([1, -1]);
  const P = at(h + a / 2, k + s * y0);
  const std = main === 'x' ? `${sq('x', h)}/${a * a} + ${sq('y', k)}/${b2} = 1` : `${sq('x', k)}/${b2} + ${sq('y', h)}/${a * a} = 1`;
  const co = add6(scale6(sq6(main, h), b2), scale6(sq6(other, k), a * a));
  co[5] = co[5].sub(a * a * b2);
  const red = eqT(tidy6(co));
  return partsItem({
    skill: FD, level, subgoals: FD_SUB,
    parts: [
      { html: 'a est la distance du centre au sommet. Que vaut b² ?', ask: 'b² =', start: 'b^2', judge: { kind: 'value', expect: String(b2) },
        lines: [{ math: String(b2), note: `${a / 2}²/${a * a} + ${y0}²/b² = 1`, subgoal: 'def' }] },
      { html: 'L\'équation réduite ?', ask: '', start: 'E', judge: { kind: 'conic', equation: red, target: 'standard' },
        lines: [{ math: std, note: '', subgoal: 'recog' }] },
    ],
    prompt: `Une ellipse a pour centre Ω${vr(O)}, son grand axe parallèle à O${main}, un sommet en S${vr(S)}, et elle passe par P${vr(P)}. Trouve son équation réduite.`,
    hints: [], noHints: true,
    key: `${FD}:cvp:${vt(O)}${vt(S)}${vt(P)}`, exam: opts.exam ? examTag(opts, 5) : false,
  });
}

function fromDataItem(level, rng, opts = {}) {
  if (level === 5 || opts.exam === 'open') return rng.chance(0.5) ? cvpItem(5, rng, opts) : fdeItem(5, rng, opts);
  if (level === 4 && rng.chance(0.5)) return cfeItem(level, rng, opts);
  return fdeItem(level, rng, opts);
}

function fromDataExam(rng, exam) {
  if (exam === 'open') return fromDataItem(5, rng, { exam });
  const d = fdeData(rng, rng.pick([[1, 2], [2, 1]]));
  // e inverted: MF = (1/e)·d.
  const L = add6(sq6('x', d.F[0]), sq6('y', d.F[1]));
  const inv = tidy6(add6(scale6(L, d.p * d.p), sq6(d.main, d.d), -d.qq * d.qq));
  const fake = tidy6(add6(scale6(L, d.qq), sq6(d.main, d.d), -d.p));
  return mcqD({
    skill: FD, level: 4, key: `mcq:${d.def}`, exam: examTag({ exam }),
    prompt: `Quelle est l'équation de la conique de foyer F${vr(d.F)}, de directrice D : ${DNAME(d).replace(/-/g, '−')} et d'excentricité e = ${eS(d.e)} ?`,
    right: MTxy(d.red),
    wrongs: [{ html: MTxy(eqT(inv)), rule: 'g10_e_inverted' }, { html: MTxy(eqT(fake)), rule: null }],
    fillers: [{ html: MTxy(eqT(tidy6(add6(d.co, [0, 0, 0, 0, 0, 1])))) }, { html: MTxy(eqT(tidy6([d.co[2], d.co[1], d.co[0], d.co[4], d.co[3], d.co[5]]))) }],
    solution: [{ html: `MF² = e²·d(M, D)² : ${MTxy(d.sqLine)}, donc ${MTxy(d.red)}.`, note: '' }],
  }, rng);
}

// ======================================================================
// g10-conic-tangent
// ======================================================================

const TG = 'g10-conic-tangent';
const TG_SUB = [
  { id: 'pt', label: 'point de contact', skill: 'g10-ellipse' },
  { id: 'polar', label: 'polaire et points de contact', skill: 'g10-pole-polar' },
  { id: 'tan', label: 'dédoubler l\'équation', skill: TG },
];

// The tangent at T (a point of the conic co): x² → x₀x, xy → (x₀y + xy₀)/2,
// x → (x + x₀)/2: the row [X, Y, C], and the dedoubled line as written.
export function dedouble(co, T) {
  const [a, b, c, d, e, f] = co.map((x) => q(x));
  const [x0, y0] = T.map((x) => q(x));
  const row = [a.mul(x0).add(b.div(2).mul(y0)).add(d.div(2)), b.div(2).mul(x0).add(c.mul(y0)).add(e.div(2)), d.div(2).mul(x0).add(e.div(2).mul(y0)).add(f)];
  const terms = [];
  const k = (x) => (x.eq(1) ? '' : x.eq(-1) ? '-' : `${par(x)}·`);
  if (a.n) terms.push(`${k(a)}${par(x0)}·x`);
  if (b.n) terms.push(`${par(b.div(2))}·(${par(x0)}·y + x·${par(y0)})`);
  if (c.n) terms.push(`${k(c)}${par(y0)}·y`);
  const plus = (v, a) => (a.n === 0 ? v : a.n > 0 ? `${v} + ${qt(a)}` : `${v} - ${qt(a.neg())}`);
  if (d.n) terms.push(`${par(d.div(2))}·(${plus('x', x0)})`);
  if (e.n) terms.push(`${par(e.div(2))}·(${plus('y', y0)})`);
  if (f.n) terms.push(qt(f));
  const text = `${terms.join(' + ').replace(/\+ -/g, '- ')} = 0`;
  return { row, text };
}
const rowLine = (row) => linT(prim(row, true));
const onConic = (co, [x, y]) => co[0] * x * x + co[1] * x * y + co[2] * y * y + co[3] * x + co[4] * y + co[5] === 0;

// A conic with whole points: reduced (Ax² ± By² = C), translated, or with xy.
function tangentConic(rng, kind) {
  for (let t = 0; t < 300; t++) {
    let co;
    if (kind === 'xy') {
      co = [nz(rng, -3, 3), nz(rng, -4, 4), nz(rng, -3, 3), rng.int(-4, 4), rng.int(-4, 4), 0];
      const T = [rng.int(-3, 3), rng.int(-3, 3)];
      co[5] = -(co[0] * T[0] ** 2 + co[1] * T[0] * T[1] + co[2] * T[1] ** 2 + co[3] * T[0] + co[4] * T[1]);
      const g = [2 * co[0] * T[0] + co[1] * T[1] + co[3], co[1] * T[0] + 2 * co[2] * T[1] + co[4]];
      if (g[0] === 0 && g[1] === 0) continue;
      if (Math.abs(co[5]) > 30 || co[0] * co[2] * 4 - co[1] * co[1] === 0 || DeltaOf(co).n === 0) continue;
      return { co, pts: [T] };
    }
    const A = rng.int(1, 4);
    const B = rng.int(1, 5);
    if (A === B) continue;
    const hyp = kind === 'hyp';
    const T0 = [nz(rng, -6, 6), nz(rng, -4, 4)];
    const C = A * T0[0] ** 2 + (hyp ? -B : B) * T0[1] ** 2;
    if (C <= 0 || C > 80) continue;
    // Translation (level 2 and the free levels).
    const h = kind === 'shift' ? nz(rng, -3, 3) : 0;
    const k = kind === 'shift' ? rng.int(-3, 3) : 0;
    co = [A, 0, hyp ? -B : B, -2 * A * h, -2 * (hyp ? -B : B) * k, A * h * h + (hyp ? -B : B) * k * k - C];
    const pts = [];
    for (let x = -10; x <= 10; x++) for (let y = -10; y <= 10; y++) if (onConic(co, [x, y])) pts.push([x, y]);
    if (pts.length < 4) continue;
    return { co, pts, A, B, C, h, k, hyp };
  }
  return { co: [1, 0, 3, 0, 0, -28], pts: [[-5, 1], [5, 1], [-5, -1], [5, -1], [4, 2], [-4, 2], [4, -2], [-4, -2], [1, 3], [-1, 3], [1, -3], [-1, -3]], A: 1, B: 3, C: 28, h: 0, k: 0, fallback: true };
}

const TG_MENU = [
  { id: 'dbl', label: 'Dédoubler : x² → x₀x, y² → y₀y, x → (x + x₀)/2', valid: true },
  { id: 'bad', label: 'Remplacer x par x₀ dans les termes du 1er degré', valid: false, rule: 'g10_doubling_wrong', why: 'On dédouble chaque terme en gardant un x : x → (x + x₀)/2, sinon la droite ne passe plus par T.' },
  { id: 'disc', label: 'Discriminant nul de l\'intersection', valid: true },
];

function atTItem(level, rng, opts = {}) {
  const kind = level === 2 ? 'shift' : level >= 4 ? rng.pick(['ell', 'hyp', 'shift', 'xy']) : rng.pick(['ell', 'hyp']);
  const cn = tangentConic(rng, kind);
  const co = cn.co.map((x) => q(x));
  const eq = eqT(co);
  const T = rng.pick(cn.pts).map((x) => q(x));
  const dd = dedouble(co, T);
  const tan = rowLine(dd.row);
  const judge = { kind: 'geom', object: 'line2', ref: tan, dbl: { co: co.map(qt), T: T.map(qt) } };
  const parts = [];
  const giveAbscissa = level === 3 && kind !== 'xy' && !T[1].eq(0) && !(cn.k ?? 0);
  if (giveAbscissa) {
    parts.push({
      html: `Le point de contact T a pour abscisse ${fq(T[0])} et une ordonnée ${T[1].n > 0 ? 'positive' : 'négative'}.`, ask: 'T =', start: 'T',
      judge: { kind: 'vector', expect: vt(T) },
      lines: [{ math: `T = ${vt(T)}`, note: `${cn.A === 1 ? '' : `${cn.A}·`}(${fq(T[0])})² ${cn.hyp ? '−' : '+'} ${cn.B}y² = ${cn.C}`, subgoal: 'pt' }],
    });
  }
  parts.push({
    html: 'La tangente en T : dédouble l\'équation.', ask: 'tangente :', start: eq, judge, menu: TG_MENU,
    lines: [
      { math: dd.text, note: 'x² → x₀x, y² → y₀y, xy → (x₀y + xy₀)/2, x → (x + x₀)/2', subgoal: 'tan', blank: [par(T[0]), par(T[1])], blank2: [par(T[0])] },
      { math: tan, note: `Contrôle : T est sur la tangente`, subgoal: 'tan' },
    ],
  });
  return partsItem({
    skill: TG, level, parts, subgoals: TG_SUB,
    prompt: giveAbscissa
      ? `Trouve la tangente à la conique ${MTxy(eq)} au point d'abscisse ${fq(T[0])} et d'ordonnée ${T[1].n > 0 ? 'positive' : 'négative'}.`
      : `Trouve la tangente à la conique ${MTxy(eq)} au point T${vr(T)}.`,
    hints: H('Dédouble : remplace un x par x₀ et un y par y₀ (x → (x + x₀)/2 dans les termes du 1er degré).', dd.text.split(par(T[0])).join('□').replace(/-/g, '−'), readable(tan)),
    key: `${TG}:T:${eq}:${vt(T)}`, fallback: cn.fallback, exam: opts.exam ? examTag(opts) : false,
  });
}

// From a point Q: the polar, the two points of contact, the tangents.
function fromQItem(level, rng, opts = {}) {
  for (let t = 0; t < 200; t++) {
    const cn = tangentConic(rng, rng.pick(['ell', 'hyp']));
    const co = cn.co.map((x) => q(x));
    const [T1, T2] = rng.shuffle([...cn.pts]).slice(0, 2).map((P) => P.map((x) => q(x)));
    const r1 = dedouble(co, T1).row;
    const r2 = dedouble(co, T2).row;
    const det = r1[0].mul(r2[1]).sub(r1[1].mul(r2[0]));
    if (det.n === 0) continue;
    const Qp = [r1[1].mul(r2[2]).sub(r2[1].mul(r1[2])).div(det), r2[0].mul(r1[2]).sub(r1[0].mul(r2[2])).div(det)];
    if (Qp.some((x) => x.d > 2 || Math.abs(x.valueOf()) > 12)) continue;
    const pol = dedouble(co, Qp);
    const [P1, P2] = [T1, T2].sort((A, B) => A[0].sub(B[0]).valueOf() || A[1].sub(B[1]).valueOf());
    const eq = eqT(co);
    const tans = `${rowLine(dedouble(co, P1).row)} ou ${rowLine(dedouble(co, P2).row)}`;
    return partsItem({
      skill: TG, level, subgoals: TG_SUB,
      parts: [
        { html: 'La polaire de Q (dédoubler avec Q) passe par les points de contact.', ask: 'polaire :', start: eq, judge: { kind: 'geom', object: 'line2', ref: rowLine(pol.row) },
          lines: [{ math: pol.text, note: 'Dédoubler avec Q', subgoal: 'polar' }, { math: rowLine(pol.row), note: '', subgoal: 'polar' }] },
        { html: 'Intersecte-la avec la conique : le point de contact T₁ (le plus à gauche, ou le plus bas) ?', ask: 'T₁ =', start: 'T_1', judge: { kind: 'vector', expect: vt(P1) },
          lines: [{ math: `T_1 = ${vt(P1)}`, note: '', subgoal: 'polar' }] },
        { html: 'Et T₂ ?', ask: 'T₂ =', start: 'T_2', judge: { kind: 'vector', expect: vt(P2) },
          lines: [{ math: `T_2 = ${vt(P2)}`, note: '', subgoal: 'polar' }] },
        { html: 'Les deux tangentes, (QT₁) et (QT₂) ?', ask: 'tangentes :', start: 'τ', judge: { kind: 'geom', object: 'line2', ref: tans, count: 2 },
          lines: [{ math: tans, note: 'Dédoubler en T₁ et en T₂', subgoal: 'tan' }] },
      ],
      prompt: `Trouve les tangentes à la conique ${MTxy(eq)} issues du point Q${vr(Qp)}.`,
      hints: [], noHints: true,
      key: `${TG}:Q:${eq}:${vt(Qp)}`, fallback: cn.fallback, exam: opts.exam ? examTag(opts, 5) : false,
    });
  }
  return atTItem(4, rng, opts);
}

function tangentItem(level, rng, opts = {}) {
  if (level === 5 || opts.exam === 'open') return fromQItem(5, rng, opts);
  return atTItem(level, rng, opts);
}

function tangentExam(rng, exam) {
  if (exam === 'open') return tangentItem(5, rng, { exam });
  const cn = tangentConic(rng, rng.pick(['shift', 'xy']));
  const co = cn.co.map((x) => q(x));
  const T = rng.pick(cn.pts).map((x) => q(x));
  const right = rowLine(dedouble(co, T).row);
  const [a, b, c, d, e, f] = co;
  const [x0, y0] = T;
  const bad = [
    [a.mul(x0), c.mul(y0), b.mul(x0).mul(y0).add(d.mul(x0)).add(e.mul(y0)).add(f)],
    [a.mul(x0).add(b.div(2).mul(y0)).add(d), b.div(2).mul(x0).add(c.mul(y0)).add(e), f],
  ].filter((r) => r[0].n || r[1].n).map((r) => rowLine(r));
  return mcqD({
    skill: TG, level: 4, key: `mcq:${eqT(co)}:${vt(T)}`, exam: examTag({ exam }),
    prompt: `Quelle est la tangente à la conique ${MTxy(eqT(co))} au point T${vr(T)} ?`,
    right: MTxy(right),
    wrongs: bad.map((t) => ({ html: MTxy(t), rule: 'g10_doubling_wrong' })),
    fillers: [{ html: MTxy(rowLine(dedouble(co, T).row.map((x, i) => (i === 2 ? x.add(1) : x)))) }, { html: MTxy(rowLine([dedouble(co, T).row[1].neg(), dedouble(co, T).row[0], q(0)])) }],
    solution: [{ html: `Dédoubler en T : ${MTxy(dedouble(co, T).text)}, soit ${MTxy(right)}.`, note: '' }],
    fallback: cn.fallback,
  }, rng);
}

export const GEN = {
  [FD]: (level, rng, profile, opts = {}) => (opts.exam ? fromDataExam(rng, opts.exam) : fromDataItem(level, rng)),
  [TG]: (level, rng, profile, opts = {}) => (opts.exam ? tangentExam(rng, opts.exam) : tangentItem(level, rng)),
};
