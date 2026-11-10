// g10-conic-family, g10-locus, g10-homogeneous (module G10, part b; step U5).
//
// Families: a(m)x² + b(m)xy + … with coefficients of degree ≤ 1 in m. The
// genre follows the sign of δ(m) (equiv in m, then solset in m, one part
// per genre); the centre solves P₁ + mQ₁ = 0, P₂ + mQ₂ = 0, so eliminating m
// gives the locus P₂Q₁ − P₁Q₂ = 0 (conic, then equiv to expand), whose
// nature is read on Δ and δ; the point where Q₁ = Q₂ = 0 is on the locus but
// is the centre of no conic (trap g10_family_division_by_zero).
//
// Loci: the centres of the circles through A tangent inside to a circle of
// centre O (an ellipse of foci O and A), and the points equidistant from a
// point and a line (a parabola). The lines with roots are notes; the squared
// line and what follows are judged by `conic`.
//
// Homogeneous coordinates: x → x/t, y → y/t, times t² (equiv with goal),
// then t = 0 and y = 1: the points at infinity (solset in x).

import { Q } from '../../math/rational.js';
import { asProblem } from './kit-problem.js';
import {
  q, qt, fq, nz, H, vt, vr, sumT, eqT, rootT, partsItem, mcqD, examTag, MT, readable,
} from './geo-kit.js';
import {
  matA, matM, mtQ, deltaOf, DeltaOf, traceOf, detLines, natureOf, NATURE_NAME,
} from './coniques-b-kit.js';

const MTm = (t) => MT(t, { vars: ['x', 'y', 'm'] });
const MTxy = (t) => MT(t, { vars: ['x', 'y'] });
const par = (x) => (q(x).n < 0 ? `(${qt(x)})` : qt(x));

// c₀ + c₁m as text: 1 - m, 2m + 2, -m, 3.
const lin = (c0, c1, v = 'm') => sumT([[c1, v], [c0, '']]);
const linP = (c0, c1, v = 'm') => { const t = lin(c0, c1, v); return /^-?\d+$|^-?\d*[a-z]$/.test(t) ? t : `(${t})`; };
// p·x + r·y + s as text.
const lin2 = ([p, r, s]) => sumT([[p, 'x'], [r, 'y'], [s, '']]);

// ======================================================================
// g10-conic-family
// ======================================================================

const FAM = 'g10-conic-family';
const FAM_SUB = [
  { id: 'delta', label: 'δ(m) et son signe', skill: 'param-quadratic' },
  { id: 'centre', label: 'équations du centre, éliminer m', skill: FAM },
  { id: 'nature', label: 'nature du lieu', skill: 'g10-conic-nature' },
];

// The roots of A m² + B m + C (Q), or null if irrational; [] if none.
function roots2(A, B, C) {
  if (A.n === 0) return B.n === 0 ? null : [C.neg().div(B)];
  const disc = B.mul(B).sub(A.mul(C).mul(4));
  if (disc.n < 0) return [];
  const sn = Math.round(Math.sqrt(disc.n));
  const sd = Math.round(Math.sqrt(disc.d));
  if (sn * sn !== disc.n || sd * sd !== disc.d) return null;
  const s = new Q(sn, sd);
  const r = [B.neg().sub(s).div(A.mul(2)), B.neg().add(s).div(A.mul(2))].sort((a, b) => a.sub(b).valueOf());
  return r[0].eq(r[1]) ? [r[0]] : r;
}

export function familyData(rng, { needLocus = true } = {}) {
  for (let t = 0; t < 600; t++) {
    const [a0, a1, b0, b1, c0, c1] = Array.from({ length: 6 }, () => rng.int(-3, 3));
    const [d0, d1, e0, e1] = Array.from({ length: 4 }, () => rng.int(-3, 3));
    const f0 = rng.int(-3, 3);
    const f1 = rng.int(-2, 2);
    // δ(m) = (a₀ + a₁m)(c₀ + c₁m) − (b₀ + b₁m)².
    const A = q(a1 * c1 - b1 * b1);
    const B = q(a0 * c1 + a1 * c0 - 2 * b0 * b1);
    const C = q(a0 * c0 - b0 * b0);
    if (A.n === 0 && B.n === 0) continue;
    if (a1 === 0 && b1 === 0 && c1 === 0) continue;
    const r = roots2(A, B, C);
    if (r === null) continue;
    // Centre: P₁ + mQ₁ = 0, P₂ + mQ₂ = 0.
    const P1 = [a0, b0, d0];
    const Q1 = [a1, b1, d1];
    const P2 = [b0, c0, e0];
    const Q2 = [b1, c1, e1];
    // Locus P₂Q₁ − P₁Q₂ = 0.
    const prod = (U, W) => [U[0] * W[0], U[0] * W[1] + U[1] * W[0], U[1] * W[1], U[0] * W[2] + U[2] * W[0], U[1] * W[2] + U[2] * W[1], U[2] * W[2]];
    const L = prod(P2, Q1).map((x, i) => x - prod(P1, Q2)[i]).map((x) => q(x));
    let excl = null;
    if (needLocus) {
      if (Q1[0] === 0 && Q1[1] === 0) continue;
      if (L.some((x) => Math.abs(x.valueOf()) > 12) || L.slice(0, 3).every((x) => x.n === 0)) continue;
      const nat = natureOf(L);
      if (!['ell', 'hyp', 'par'].includes(nat)) continue;
      const det = Q1[0] * Q2[1] - Q1[1] * Q2[0];
      if (det === 0) continue;
      excl = [q(Q1[1] * Q2[2] - Q2[1] * Q1[2]).div(det), q(Q2[0] * Q1[2] - Q1[0] * Q2[2]).div(det)];
      const at = (U) => q(U[0]).mul(excl[0]).add(q(U[1]).mul(excl[1])).add(U[2]);
      if (at(P1).n === 0 && at(P2).n === 0) continue;
      if (excl.some((x) => x.d > 2)) continue;
    }
    const co = (m) => [a0 + a1 * m, 2 * (b0 + b1 * m), c0 + c1 * m, 2 * (d0 + d1 * m), 2 * (e0 + e1 * m), f0 + f1 * m];
    const eq = `${[
      [lin(a0, a1), 'x^2'], [lin(2 * b0, 2 * b1), 'xy'], [lin(c0, c1), 'y^2'], [lin(2 * d0, 2 * d1), 'x'], [lin(2 * e0, 2 * e1), 'y'], [lin(f0, f1), ''],
    ].filter(([c]) => c !== '0').map(([c, mono], i) => {
      const single = /^-?\d+$/.test(c) || /^-?\d*m$/.test(c);
      let t = mono ? (c === '1' ? mono : c === '-1' ? `-${mono}` : single ? `${c}${mono}` : `(${c})${mono}`) : c;
      if (i && !t.startsWith('-')) t = `+ ${t}`; else if (i) t = `- ${t.slice(1)}`;
      return t;
    }).join(' ')} = 0`;
    return { a: [a0, a1], b: [b0, b1], c: [c0, c1], d: [d0, d1], e: [e0, e1], f: [f0, f1], A, B, C, r, P1, Q1, P2, Q2, L, excl, co, eq };
  }
  // E3 of the catalogue.
  return familyData(rng, { needLocus: false });
}

// The sets of m where δ(m) > 0, = 0, < 0 (texts), from its roots and sign.
function signSets(d) {
  const lead = d.A.n !== 0 ? Math.sign(d.A.n) : Math.sign(d.B.n);
  const r = d.r;
  const T = (x) => qt(x);
  if (!r.length) return { pos: lead > 0 ? 'ℝ' : '∅', zero: '∅', neg: lead > 0 ? '∅' : 'ℝ' };
  if (r.length === 1 && d.A.n === 0) {
    // Linear: sign of B·(m − r).
    const up = `]${T(r[0])} ; +∞[`;
    const down = `]-∞ ; ${T(r[0])}[`;
    return { pos: lead > 0 ? up : down, zero: `m = ${T(r[0])}`, neg: lead > 0 ? down : up };
  }
  if (r.length === 1) {
    const out = `]-∞ ; ${T(r[0])}[ ∪ ]${T(r[0])} ; +∞[`;
    return { pos: lead > 0 ? out : '∅', zero: `m = ${T(r[0])}`, neg: lead > 0 ? '∅' : out };
  }
  const inside = `]${T(r[0])} ; ${T(r[1])}[`;
  const outside = `]-∞ ; ${T(r[0])}[ ∪ ]${T(r[1])} ; +∞[`;
  return { pos: lead > 0 ? outside : inside, zero: `m = ${T(r[0])} ou m = ${T(r[1])}`, neg: lead > 0 ? inside : outside };
}

function genreParts(d, level) {
  const dT = sumT([[d.A, 'm^2'], [d.B, 'm'], [d.C, '']]);
  const sqb = lin(d.b[0], d.b[1]);
  const start = `${linP(d.a[0], d.a[1])}·${linP(d.c[0], d.c[1])} - ${/^\d+$/.test(sqb) ? sqb : `(${sqb})`}^2`;
  const sets = signSets(d);
  const parts = [];
  if (level !== 1) {
    parts.push({
      html: 'δ(m) = a(m)·c(m) − (b(m)/2)² ?', ask: 'δ(m) =', start,
      judge: { kind: 'equiv', vars: ['m'], target: 'goal', goal: dT },
      menu: [
        { id: 'ac', label: 'δ = ac − (b/2)², développé', valid: true },
        { id: 'acb', label: 'δ = ac − b²', valid: false, rule: 'g10_bhalf_matrix', why: 'A = [[a, b/2], [b/2, c]] : δ = ac − (b/2)².' },
      ],
      lines: [{ math: dT, note: 'Développer', subgoal: 'delta' }],
    });
  }
  const names = { pos: ['δ(m) > 0 : genre ellipse', '>'], zero: ['δ(m) = 0 : genre parabole', '='], neg: ['δ(m) < 0 : genre hyperbole', '<'] };
  for (const k of ['pos', 'zero', 'neg']) {
    if (sets[k] === '∅') continue;
    parts.push({
      html: `${level === 1 && !parts.length ? `δ(m) = ${readable(dT)}. ` : ''}${names[k][0]} pour quels m ?`, ask: 'm ∈', start: `${dT} ${names[k][1]} 0`,
      judge: { kind: 'solset', v: 'm', vars: ['m'] },
      menu: [
        { id: 'roots', label: 'Racines de δ(m), puis signe du trinôme', valid: true },
        { id: 'swap', label: 'δ > 0 : genre hyperbole', valid: false, rule: 'g10_det_sign_nature', why: 'δ = λ₁λ₂ > 0 : valeurs propres de même signe, genre ellipse.' },
      ],
      lines: [{ math: sets[k], note: k === 'zero' ? 'Les racines de δ(m)' : 'Signe du trinôme : celui de a à l\'extérieur des racines', subgoal: 'delta', blank: k === 'zero' ? d.r.map(qt) : [] }],
    });
  }
  return { parts, sets, dT };
}

function locusParts(d, level) {
  const [P1, Q1, P2, Q2] = [d.P1, d.Q1, d.P2, d.Q2];
  const e1 = `${lin2(P1)} + m(${lin2(Q1)}) = 0`;
  const e2 = `${lin2(P2)} + m(${lin2(Q2)}) = 0`;
  const Lt = eqT(d.L);
  const Lexpr = Lt.replace(/ = 0$/, '');
  const prodT = `(${lin2(P2)})(${lin2(Q1)}) - (${lin2(P1)})(${lin2(Q2)})`;
  const M = matM(d.L);
  const dl = detLines(M);
  const dL = deltaOf(d.L);
  const DL = DeltaOf(d.L);
  const nat = natureOf(d.L);
  const ex = d.excl;
  return [
    {
      html: `Le centre vérifie ½∂f/∂x = 0 et ½∂f/∂y = 0 : ${MTm(e1)} et ${MTm(e2)}. Isole m dans la 1re (si ${MTxy(`${lin2(Q1)} ≠ 0`)}) : m = −(${readable(lin2(P1))})/(${readable(lin2(Q1))}), et remplace dans la 2e.`,
      ask: 'lieu :', start: 'lieu', judge: { kind: 'conic', equation: Lt, target: 'none' },
      lines: [{ math: `${prodT} = 0`, note: 'Multiplier par le dénominateur', subgoal: 'centre', blank: [`(${lin2(P1)})`] }],
    },
    {
      html: 'Développe.', ask: '', start: prodT, judge: { kind: 'equiv', vars: ['x', 'y'], target: 'goal', goal: Lexpr },
      lines: [{ math: Lexpr, note: 'Le lieu des centres : … = 0', subgoal: 'centre' }],
    },
    {
      html: 'Sa nature : Δ = det M ?', ask: 'Δ =', start: 'det(M)',
      judge: { kind: 'det', target: 'number', names: { M: mtQ(M) }, abc: d.L.slice(0, 3).map(qt), co6: d.L.map(qt) },
      lines: [
        { math: dl.matrix, note: 'M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]', subgoal: 'nature', from: 3 },
        { math: dl.value, note: '', subgoal: 'nature' },
      ],
    },
    {
      html: 'Et δ = det A ?', ask: 'δ =', start: 'δ', judge: { kind: 'value', expect: qt(dL), delta: true, abc: d.L.slice(0, 3).map(qt) },
      lines: [{ math: qt(dL), note: '', subgoal: 'nature' }],
    },
    {
      html: 'Un point du lieu peut-il ne pas être un centre ?', ask: 'point exclu :', start: 'P',
      judge: { kind: 'vector', expect: vt(ex) },
      decisions: [
        { kind: 'decision', prompt: `δ = ${fq(dL)}, Δ = ${fq(DL)} : le lieu est…`, options: ['ell', 'hyp', 'par'].map((k) => ({ id: k, label: NATURE_NAME[k], valid: k === nat, rule: (k === 'ell' && nat === 'hyp') || (k === 'hyp' && nat === 'ell') ? 'g10_det_sign_nature' : undefined, why: 'δ = λ₁λ₂ donne le genre, Δ ≠ 0 : non dégénérée.' })) },
        { kind: 'decision', prompt: 'Tout point du lieu est-il le centre d\'une conique de la famille ?', options: [
          { id: 'yes', label: 'Oui, tous', valid: false, rule: 'g10_family_division_by_zero', why: `On a divisé par ${readable(lin2(Q1))} : là où ${readable(lin2(Q1))} = 0 et ${readable(lin2(Q2))} = 0, aucune valeur de m ne convient.` },
          { id: 'no', label: `Non : là où ${readable(lin2(Q1))} = 0 et ${readable(lin2(Q2))} = 0, aucun m ne convient`, valid: true },
        ] },
      ],
      lines: [{ math: vt(ex), note: 'Q₁ = Q₂ = 0 : le système en m devient P₁ = P₂ = 0, impossible ici', subgoal: 'centre' }],
    },
  ];
}

function familyItem(level, rng, opts = {}) {
  const g = level === 5 || opts.exam ? 'both' : level === 1 ? 'genre' : level === 2 ? 'locus' : rng.pick(['genre', 'locus']);
  const d = familyData(rng, { needLocus: g !== 'genre' });
  const parts = [];
  if (g !== 'locus') parts.push(...genreParts(d, level).parts);
  if (g !== 'genre' && d.excl) parts.push(...locusParts(d, level));
  if (!parts.length) parts.push(...genreParts(d, level).parts);
  const dT = sumT([[d.A, 'm^2'], [d.B, 'm'], [d.C, '']]);
  const ask = g === 'genre' ? 'Donne son genre selon m.' : g === 'locus' ? 'Trouve le lieu des centres et sa nature.' : 'Donne son genre selon m, puis le lieu des centres et sa nature.';
  return partsItem({
    skill: FAM, level, parts, subgoals: FAM_SUB,
    prompt: `On donne la famille de coniques ${MTm(`F_m : ${d.eq}`.replace('F_m : ', ''))}, m ∈ ℝ. ${ask}`,
    hints: H(
      g === 'genre' ? 'δ(m) = a(m)·c(m) − (b(m)/2)², puis le signe du trinôme en m.' : 'Isole m dans une des équations du centre et remplace dans l\'autre.',
      g === 'genre' ? `δ(m) = ${readable(dT)} : ses racines ?` : `m = −(${readable(lin2(d.P1))})/(□)`,
      g === 'genre' ? `δ(m) = ${readable(dT)}` : readable(eqT(d.L)),
    ),
    key: `${FAM}:${g}:${d.eq}`, exam: opts.exam ? examTag(opts, 5) : false,
  });
}

function familyExam(rng, exam) {
  if (exam === 'open') return familyItem(5, rng, { exam });
  const d = familyData(rng, { needLocus: false });
  // The genre for one value of m.
  const m = rng.int(-3, 3);
  const co = d.co(m).map((x) => q(x));
  const nat = natureOf(co);
  const name = { ell: 'Une ellipse réelle', empty: 'L\'ensemble vide', hyp: 'Une hyperbole', par: 'Une parabole', pt: 'Un point', lines: 'Deux droites sécantes', par2: 'Deux droites parallèles (ou rien)' };
  const bf = natureOf([co[0], co[1].mul(2), ...co.slice(2)]);
  const swapped = { ell: 'hyp', hyp: 'ell', empty: 'hyp', par: 'ell', pt: 'lines', lines: 'pt', par2: 'hyp' }[nat];
  return mcqD({
    skill: FAM, level: 4, key: `mcq:${d.eq}:${m}`, exam: examTag({ exam }),
    prompt: `Pour m = ${fq(m)}, que décrit la conique ${MTm(d.eq)} ?`,
    right: name[nat],
    wrongs: [bf !== nat ? { html: name[bf], rule: 'g10_bhalf_matrix' } : null, { html: name[swapped], rule: 'g10_det_sign_nature' }].filter(Boolean),
    fillers: ['ell', 'hyp', 'par', 'lines'].filter((k) => k !== nat).map((k) => ({ html: name[k] })),
    solution: [{ html: `Pour m = ${fq(m)} : ${MTxy(eqT(co))}, δ = ${fq(deltaOf(co))}, Δ = ${fq(DeltaOf(co))} : ${NATURE_NAME[nat]}.`, note: '' }],
  }, rng);
}

// ======================================================================
// g10-locus
// ======================================================================

const LOC = 'g10-locus';
const LOC_SUB = [
  { id: 'trad', label: 'traduire la condition', skill: LOC },
  { id: 'square', label: 'élever au carré (avec condition)', skill: 'g1-irr-eq' },
  { id: 'recog', label: 'reconnaître la conique', skill: 'g10-ellipse' },
];

// [a, c, b] of the ellipse: R = 2a, OA = 2c.
const ELL = [[5, 3, 4], [5, 4, 3], [10, 6, 8], [10, 8, 6], [13, 5, 12]].map(([a2, c2, b2]) => [new Q(a2, 2), new Q(c2, 2), new Q(b2, 2)]);

function ellipseLocus(rng) {
  const [a, c, b] = rng.pick(ELL);
  const R = a.mul(2);
  const twoC = c.mul(2);
  const axisX = rng.chance(0.6);
  const s = rng.pick([1, -1]);
  const A = axisX ? [twoC.mul(s), q(0)] : [q(0), twoC.mul(s)];
  const v = axisX ? 'x' : 'y';
  const o = axisX ? 'y' : 'x';
  const minus = (vv, k) => (k.n === 0 ? vv : k.n > 0 ? `${vv} - ${qt(k)}` : `${vv} + ${qt(k.neg())}`);
  const MA = `(${minus(v, A[axisX ? 0 : 1])})^2 + ${o}^2`;
  // 2R·√(MA²) = R² + 4c² − 4c·s·v.
  const K = R.mul(R).add(c.mul(c).mul(4));
  const lin = sumT([[K, ''], [c.mul(4).mul(s).neg(), v]]);
  const sq = `${qt(R.mul(R).mul(4))}(${MA}) = (${lin})^2`;
  // The ellipse: (v − s·c)²/a² + o²/b² = 1.
  const h = c.mul(s);
  const a2 = a.mul(a);
  const b2 = b.mul(b);
  const den = (x) => (x.d === 1 ? qt(x) : `(${qt(x)})`);
  const std = axisX
    ? `(${minus('x', h)})^2/${den(a2)} + y^2/${den(b2)} = 1`
    : `x^2/${den(b2)} + (${minus('y', h)})^2/${den(a2)} = 1`;
  // Expanded: b²(v − h)² + a²o² − a²b² = 0, whole coefficients.
  const co = axisX
    ? [b2, q(0), a2, b2.mul(h).mul(-2), q(0), b2.mul(h).mul(h).sub(a2.mul(b2))]
    : [a2, q(0), b2, q(0), b2.mul(h).mul(-2), b2.mul(h).mul(h).sub(a2.mul(b2))];
  const L = tidyQ(co);
  const xmax = h.mul(s).add(a); // the largest s·v on the ellipse
  const bound = K.div(c.mul(4));
  return { a, b, c, R, A, v, o, s, MA, sq, std, eq: eqT(L), lin, bound, xmax, axisX };
}

function tidyQ(co) {
  const g = (x, y) => (y ? g(y, x % y) : Math.abs(x));
  const den = co.reduce((l, x) => (l * q(x).d) / g(l, q(x).d), 1);
  let w = co.map((x) => q(x).mul(den).n);
  const gg = w.reduce((s, x) => g(s, x), 0) || 1;
  w = w.map((x) => x / gg);
  if (w.find((x) => x !== 0) < 0) w = w.map((x) => -x);
  return w.map((x) => q(x));
}

function ellipseLocusItem(level, rng, opts = {}) {
  const d = ellipseLocus(rng);
  const Rt = qt(d.R);
  const v = d.v;
  const sgn = d.s > 0 ? '≤' : '≥';
  const cond = `${v} ${sgn} ${qt(d.bound.mul(d.s))}`;
  const judge = { kind: 'conic', equation: d.eq, target: 'standard' };
  const parts = [{
    html: `M(x ; y) est le centre d'un cercle de rayon r qui passe par A : MA = r ; il est tangent intérieurement à γ : OM = ${Rt} − r. Donc OM = ${Rt} − MA, soit √(x² + y²) = ${Rt} − √(${readable(d.MA)}).`,
    ask: '', start: 'lieu', judge,
    decisions: [{ levels: [2, 3, 4], kind: 'decision', prompt: 'Comment enlever les racines ?', options: [
      { id: 'iso', label: 'Élever au carré, puis isoler la racine qui reste et élever encore (avec la condition de signe)', valid: true, quality: 'good', ref: true },
      { id: 'now', label: 'Élever au carré les deux membres tels quels et développer', valid: true, quality: 'poor', why: 'Il reste un double produit avec une racine : il faut l\'isoler et élever au carré une seconde fois.' },
    ] }],
    notes: [`Au carré : x² + y² = ${qt(d.R.mul(d.R))} − ${qt(d.R.mul(2))}√(…) + ${readable(d.MA)}, donc ${qt(d.R.mul(2))}√(${readable(d.MA)}) = ${readable(d.lin)}, avec la condition ${readable(d.lin)} ≥ 0.`],
    lines: [
      { math: d.sq, note: 'Élever au carré (les deux membres sont positifs)', subgoal: 'square', blank: [`(${d.lin})^2`] },
      { math: d.eq, note: 'Développer et réduire', subgoal: 'square' },
      { math: d.std, note: 'Compléter le carré : une ellipse de foyers O et A', subgoal: 'recog' },
    ],
  }, {
    html: `La condition ${readable(d.lin)} ≥ 0 s'écrit ${cond.replace(/-/g, '−')}. Sur l'ellipse, quelle est la ${d.s > 0 ? 'plus grande' : 'plus petite'} valeur de ${v} ?`,
    ask: `${v} =`, start: v, judge: { kind: 'value', expect: qt(d.xmax.mul(d.s)) },
    decisions: [{ kind: 'decision', prompt: 'La condition retire-t-elle des points du lieu ?', options: [
      { id: 'no', label: `Non : sur l'ellipse, ${v} reste ${sgn} ${fq(d.xmax.mul(d.s))}, donc la condition est toujours vraie`, valid: true },
      { id: 'half', label: 'Oui : seule une moitié de l\'ellipse convient', valid: false, rule: 'g10_locus_square_condition', why: 'Compare la condition avec les points de l\'ellipse : elle est vraie partout.' },
    ] }],
    lines: [{ math: qt(d.xmax.mul(d.s)), note: `Centre ± a, avec a = ${fq(d.a)}`, subgoal: 'recog' }],
  }];
  return partsItem({
    skill: LOC, level, parts, subgoals: LOC_SUB,
    prompt: `On donne le cercle γ : x² + y² = ${qt(d.R.mul(d.R))} et le point A${vr(d.A)}. Trouve le lieu des centres M des cercles qui passent par A et sont tangents intérieurement à γ.`,
    hints: H('La tangence intérieure donne OM = R − r, et r = MA.', `${qt(d.R.mul(2))}√(…) = □`, readable(d.eq)),
    key: `${LOC}:ell:${vt(d.A)}:${qt(d.R)}`, exam: opts.exam ? examTag(opts, 5) : false,
  });
}

// Points at the same distance from F and from the line D (a parabola).
function parabolaLocusItem(level, rng, opts = {}) {
  const v = rng.pick(['x', 'y']);
  const o = v === 'x' ? 'y' : 'x';
  const h = rng.int(-3, 3);
  const k = rng.int(-3, 3);
  const f0 = nz(rng, -3, 3);
  const F = v === 'x' ? [h + f0, k] : [k, h + f0];
  const dv = h - f0;
  const minus = (vv, a) => (a === 0 ? vv : a > 0 ? `${vv} - ${a}` : `${vv} + ${-a}`);
  const sqF = `(${minus('x', F[0])})^2 + (${minus('y', F[1])})^2`;
  const line = `${sqF} = (${minus(v, dv)})^2`;
  const std = `(${minus(o, k)})^2 = ${4 * f0}(${minus(v, h)})`;
  // (o − k)² − 4f₀(v − h) = 0.
  const co = v === 'x' ? [0, 0, 1, -4 * f0, -2 * k, k * k + 4 * f0 * h] : [1, 0, 0, -2 * k, -4 * f0, k * k + 4 * f0 * h];
  const eq = eqT(co.map((x) => q(x)));
  return partsItem({
    skill: LOC, level, subgoals: LOC_SUB,
    parts: [{
      html: `MF = d(M, D) : √(${readable(sqF)}) = |${minus(v, dv).replace(/-/g, '−')}|.`, ask: '', start: 'lieu',
      judge: { kind: 'conic', equation: eq, target: 'standard' },
      lines: [
        { math: line, note: 'Élever au carré (deux distances positives)', subgoal: 'square', blank: [`(${minus(v, dv)})^2`] },
        { math: eq, note: 'Développer et réduire', subgoal: 'square' },
        { math: std, note: 'Une parabole de foyer F et de directrice D', subgoal: 'recog' },
      ],
    }],
    prompt: `Trouve le lieu des points M(x ; y) à égale distance du point F${vr(F)} et de la droite D : ${v} = ${fq(dv)}.`,
    hints: H('Écris MF et la distance de M à D, puis élève au carré.', `${readable(sqF)} = (□)²`, readable(std)),
    key: `${LOC}:par:${vt(F)}:${v}${dv}`, exam: opts.exam ? examTag(opts, 5) : false,
  });
}

function locusItem(level, rng, opts = {}) {
  if (level === 5 || opts.exam === 'open' || level <= 2) return ellipseLocusItem(level, rng, opts);
  return rng.chance(0.6) ? ellipseLocusItem(level, rng, opts) : parabolaLocusItem(level, rng, opts);
}

function locusExam(rng, exam) {
  if (exam === 'open') return locusItem(5, rng, { exam });
  // Circles tangent outside to two circles: one branch of a hyperbola.
  const r1 = rng.int(2, 5);
  const r2 = rng.int(1, r1 - 1);
  const D = r1 + r2 + rng.int(2, 6);
  return mcqD({
    skill: LOC, level: 4, key: `mcq:${r1}:${r2}:${D}`, exam: examTag({ exam }),
    prompt: `Les cercles γ₁ de centre O₁ et de rayon ${r1}, et γ₂ de centre O₂ et de rayon ${r2} sont extérieurs (O₁O₂ = ${D}). Quel est le lieu des centres M des cercles tangents extérieurement à γ₁ et à γ₂ ?`,
    right: `Une seule branche d'hyperbole de foyers O₁ et O₂ (MO₁ − MO₂ = ${r1 - r2})`,
    wrongs: [
      { html: `L'hyperbole entière de foyers O₁ et O₂ (|MO₁ − MO₂| = ${r1 - r2})`, rule: 'g10_locus_square_condition' },
      { html: `L'ellipse de foyers O₁ et O₂ (MO₁ + MO₂ = ${r1 + r2})`, rule: null },
      { html: 'La médiatrice de [O₁O₂]', rule: null },
    ],
    solution: [{ html: `MO₁ = ${r1} + r et MO₂ = ${r2} + r, donc MO₁ − MO₂ = ${r1 - r2} > 0 : seulement la branche la plus proche de O₂ (en élevant au carré, on obtiendrait aussi l'autre).`, note: '' }],
  }, rng);
}

// ======================================================================
// g10-homogeneous
// ======================================================================

const HOM = 'g10-homogeneous';
const HOM_SUB = [
  { id: 'homog', label: 'homogénéiser', skill: HOM },
  { id: 'inf', label: 'points à l\'infini, genre', skill: 'g10-conic-nature' },
];

function homogData(rng, kind) {
  // The quadratic part: (x − py)(x − ry) (hyperbola), (x − py)² (parabola), or irreducible (ellipse).
  for (let t = 0; t < 200; t++) {
    let a = 1; let b; let c; let pts;
    if (kind === 'hyp') {
      const p = nz(rng, -3, 3);
      const r = nz(rng, -3, 3);
      if (p === r) continue;
      b = -(p + r); c = p * r; pts = [p, r].sort((u, w) => u - w);
    } else if (kind === 'par') {
      const p = nz(rng, -3, 3);
      b = -2 * p; c = p * p; pts = [p];
    } else {
      b = rng.int(-2, 2); c = rng.int(1, 4);
      if (b * b - 4 * c >= 0) continue;
      pts = [];
    }
    const d = rng.int(-9, 9);
    const e = rng.int(-9, 9);
    const f = nz(rng, -9, 9);
    if (!d && !e) continue;
    return { co: [a, b, c, d, e, f], pts, kind };
  }
  return { co: [1, -1, -2, 3, 0, -5], pts: [-1, 2], kind: 'hyp', fallback: true };
}

const homT = ([a, b, c, d, e, f]) => sumT([[a, 'x^2'], [b, 'xy'], [c, 'y^2'], [d, 'xt'], [e, 'yt'], [f, 't^2']]);
const subT = ([a, b, c, d, e, f]) => {
  const terms = [[a, '(x/t)^2'], [b, '(x/t)(y/t)'], [c, '(y/t)^2'], [d, '(x/t)'], [e, '(y/t)'], [f, '']];
  return `t^2·(${sumT(terms)})`;
};

function homogItem(level, rng, opts = {}) {
  if (level === 5) return cubicItem(level, rng);
  if (level >= 3 && rng.int(0, 3) === 0) return lineHomogItem(level, rng);
  const kind = rng.pick(['hyp', 'hyp', 'par', 'ell']);
  const h = homogData(rng, kind);
  const [a, b, c] = h.co;
  const plain = sumT([[h.co[0], 'x^2'], [b, 'xy'], [c, 'y^2'], [h.co[3], 'x'], [h.co[4], 'y'], [h.co[5], '']]);
  const goal = homT(h.co);
  const quad = `${sumT([[a, 'x^2'], [b, 'x'], [c, '']])} = 0`;
  const sol = h.pts.length === 0 ? '∅' : h.pts.length === 1 ? `x = ${h.pts[0]}` : `x = ${h.pts[0]} ou x = ${h.pts[1]}`;
  const ptsT = h.pts.length ? h.pts.map((p) => `(${fq(p)} : 1 : 0)`).join(' et ') : 'aucun point réel';
  const genre = { hyp: 'genre hyperbole', par: 'genre parabole', ell: 'genre ellipse' }[kind];
  const parts = [
    {
      html: 'Remplace x par x/t et y par y/t, puis multiplie par t².', ask: '', start: subT(h.co),
      judge: { kind: 'equiv', vars: ['x', 'y', 't'], target: 'goal', goal, domain: { x: [-2, 2], y: [-2, 2], t: [0.5, 2] }, homog: plain },
      lines: [{ math: goal, note: 'Chaque terme de degré 2', subgoal: 'homog', blank: [sumT([[h.co[5], 't^2']]).replace(/^-/, '')] }],
    },
    {
      html: 'Les points à l\'infini ont t = 0 : il reste la partie du 2e degré. Avec y = 1 (un point à l\'infini est défini à un facteur près) :', ask: '', start: quad,
      judge: { kind: 'solset', v: 'x', vars: ['x'] },
      decisions: [{ kind: 'decision', prompt: 'Combien de points réels à l\'infini, et quel genre ?', options: [
        { id: 'hyp', label: 'Deux : genre hyperbole (directions des asymptotes)', valid: kind === 'hyp', rule: kind === 'ell' ? 'g10_det_sign_nature' : undefined, why: 'Compte les solutions de l\'équation en x.' },
        { id: 'par', label: 'Un point double : genre parabole (direction de l\'axe)', valid: kind === 'par', why: 'Compte les solutions de l\'équation en x.' },
        { id: 'ell', label: 'Aucun : genre ellipse', valid: kind === 'ell', rule: kind === 'hyp' ? 'g10_det_sign_nature' : undefined, why: 'Compte les solutions de l\'équation en x.' },
      ] }],
      lines: [{ math: sol, note: `Points à l'infini : ${ptsT} ; ${genre}`, subgoal: 'inf' }],
    },
  ];
  return partsItem({
    skill: HOM, level, parts, subgoals: HOM_SUB,
    prompt: `Écris l'équation homogène de la conique ${MTxy(`${plain} = 0`)}, puis trouve ses points à l'infini.`,
    hints: H('Multiplie chaque terme par la puissance de t qui manque pour atteindre le degré 2.', `${readable(goal.replace(/t\^2$/, '□'))}`, readable(goal)),
    key: `${HOM}:${plain}`, fallback: h.fallback, exam: opts.exam ? examTag(opts) : false,
  });
}

// A line: ax + by + c = 0 → ax + by + ct = 0, then t = 0: (−b : a : 0).
function lineHomogItem(level, rng) {
  const a = nz(rng, -5, 5);
  const b = nz(rng, -5, 5);
  const c = nz(rng, -9, 9);
  const plain = sumT([[a, 'x'], [b, 'y'], [c, '']]);
  const goal = sumT([[a, 'x'], [b, 'y'], [c, 't']]);
  return partsItem({
    skill: HOM, level, subgoals: HOM_SUB,
    parts: [
      { html: 'Remplace x par x/t et y par y/t, puis multiplie par t.', ask: '', start: `t·(${sumT([[a, '(x/t)'], [b, '(y/t)'], [c, '']])})`,
        judge: { kind: 'equiv', vars: ['x', 'y', 't'], target: 'goal', goal, domain: { x: [-2, 2], y: [-2, 2], t: [0.5, 2] }, homog: plain },
        lines: [{ math: goal, note: 'Degré 1 pour chaque terme', subgoal: 'homog' }] },
      { html: `t = 0 : ${readable(sumT([[a, 'x'], [b, 'y']]))} = 0. Le point à l'infini (x : y : 0) donne une direction de la droite ?`, ask: 'direction :', start: 'w',
        judge: { kind: 'vector', expect: vt([q(-b), q(a)]), multiple: true },
        lines: [{ math: vt([q(-b), q(a)]), note: `Le point (${fq(-b)} : ${fq(a)} : 0)`, subgoal: 'inf' }] },
    ],
    prompt: `Écris l'équation homogène de la droite ${MTxy(`${plain} = 0`)} et trouve son point à l'infini.`,
    hints: H('Le terme constant devient c·t.', readable(sumT([[a, 'x'], [b, 'y']])) + ' + □·t = 0', `(${fq(-b)} : ${fq(a)} : 0)`),
    key: `${HOM}:line:${plain}`,
  });
}

// Level 5: x³ ± c³y³ + kxy = 0, its point at infinity and direction.
function cubicItem(level, rng) {
  const c = rng.pick([1, 2]);
  const s = rng.pick([1, -1]);
  const k = nz(rng, -4, 4);
  const plain = sumT([[1, 'x^3'], [s * c ** 3, 'y^3'], [k, 'xy']]);
  const goal = sumT([[1, 'x^3'], [s * c ** 3, 'y^3'], [k, 'xyt']]);
  const x0 = -s * c;
  return partsItem({
    skill: HOM, level, subgoals: HOM_SUB,
    parts: [
      { html: 'Homogénéise (degré 3).', ask: '', start: `t^3·(${sumT([[1, '(x/t)^3'], [s * c ** 3, '(y/t)^3'], [k, '(x/t)(y/t)']])})`,
        judge: { kind: 'equiv', vars: ['x', 'y', 't'], target: 'goal', goal, domain: { x: [-2, 2], y: [-2, 2], t: [0.5, 2] }, homog: plain },
        lines: [{ math: goal, note: 'Le terme du 2e degré reçoit un t', subgoal: 'homog' }] },
      { html: 't = 0 et y = 1 :', ask: '', start: `${sumT([[1, 'x^3'], [s * c ** 3, '']])} = 0`, judge: { kind: 'solset', v: 'x', vars: ['x'] },
        lines: [{ math: `x = ${x0}`, note: `Un seul point réel à l'infini : (${fq(x0)} : 1 : 0)`, subgoal: 'inf' }] },
      { html: 'Une direction asymptotique de la courbe ?', ask: 'direction :', start: 'w', judge: { kind: 'vector', expect: vt([q(x0), q(1)]), multiple: true },
        lines: [{ math: vt([q(x0), q(1)]), note: '', subgoal: 'inf' }] },
    ],
    prompt: `On donne la courbe ${MTxy(`${plain} = 0`)}. Écris son équation homogène, puis trouve son point à l'infini et sa direction asymptotique.`,
    hints: [], noHints: true,
    key: `${HOM}:cubic:${plain}`,
  });
}

function homogExam(rng, exam) {
  const kind = rng.pick(['hyp', 'par', 'ell']);
  const h = homogData(rng, kind);
  const n = h.pts.length;
  const plain = sumT([[h.co[0], 'x^2'], [h.co[1], 'xy'], [h.co[2], 'y^2'], [h.co[3], 'x'], [h.co[4], 'y'], [h.co[5], '']]);
  const label = (k) => ['Aucun', 'Un seul (double)', 'Deux', 'Une infinité'][k];
  return mcqD({
    skill: HOM, level: 4, key: `mcq:${plain}`, exam: examTag({ exam }),
    prompt: `Combien la conique ${MTxy(`${plain} = 0`)} a-t-elle de points réels à l'infini ?`,
    right: label(n),
    wrongs: [{ html: label(n === 0 ? 2 : n === 2 ? 0 : 2), rule: 'g10_det_sign_nature' }],
    fillers: [0, 1, 2, 3].filter((k) => k !== n).map((k) => ({ html: label(k) })),
    solution: [{ html: `t = 0 : ${MTxy(`${sumT([[h.co[0], 'x^2'], [h.co[1], 'xy'], [h.co[2], 'y^2']])} = 0`)} ; ${n === 0 ? 'aucune solution réelle (genre ellipse)' : n === 1 ? 'un carré parfait (genre parabole)' : 'deux facteurs (genre hyperbole)'}.`, note: '' }],
    fallback: h.fallback,
  }, rng);
}

export const GEN = {
  // Level 5 is the long problem of the catalogue (E3), a `problem` item since
  // step U4, with the points of its open variant.
  [FAM]: (level, rng, profile, opts = {}) => (opts.exam ? familyExam(rng, opts.exam) : level === 5 ? asProblem(familyItem(5, rng), 5) : familyItem(level, rng)),
  [LOC]: (level, rng, profile, opts = {}) => (opts.exam ? locusExam(rng, opts.exam) : locusItem(level, rng)),
  [HOM]: (level, rng, profile, opts = {}) => (opts.exam ? homogExam(rng, opts.exam) : homogItem(level, rng)),
};

