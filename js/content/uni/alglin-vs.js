// Generators of module L, section « vs » (Lay 4.1 to 4.7: subspaces, kernel,
// column and row spaces, bases, rank, coordinates, matrix of a map, change
// of basis, similar matrices), spec §8.3. Catalogue:
// docs/universite/L-M-algebre-lineaire.md.
//
// An item is a list of parts (one judge each, js/judges/lines.js segments):
// rowops to reduce, span for a basis (any basis of the space is right), mat
// for a vector or a matrix with `expect`, value for a dimension. Pₙ and
// M₂ₓ₂ are handled through coordinate vectors (in 1, t, t², … and row by
// row). The generator writes the wrong answers of its traps in the cfg of
// a part (cfg.wrong, read by js/cas/rules/l-vs.js). Levels: 1–2 guided
// (grid blanks in `cells`, decisions), 3 choose the action (rowops menu, or
// the menus written here), 4 free, 5 alone. opts.exam = 'mcq' | 'tf' |
// 'coef'.

import * as MX from '../../cas/matrix.js';
import {
  q, mt, aug, vt, famT, polyT, polyR, ML, MLm, MLv, opR, fq, qt, sub, unimodular, rrefWith, opLines,
  pickCells, withCells, matLines, coefItem, mcqDistinct, tfL, examTag, polyBasis,
} from './alglin-kit.js';

// ---------- helpers ----------

const sup = (n) => String(n).split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join('');
const xs = (n) => Array.from({ length: n }, (_, i) => `x${sub(i + 1)}`);
const maxAbs = (A) => Math.max(0, ...A.flat().map((x) => Math.abs(q(x).valueOf())));
const isInt = (A) => A.flat().every((x) => q(x).d === 1);
const eqV = (u, v) => u.length === v.length && u.every((x, i) => q(x).eq(q(v[i])));
const colsOf = (A) => MX.transpose(A);
const Spn = (vs) => `Span{${ML(famT(vs))}}`;
// Is the family vs a basis of Span(basis)?
const isBasisOf = (vs, basis) => {
  const r = MX.rank(MX.fromCols(basis));
  return vs.length === r && MX.rank(MX.fromCols(vs)) === r && MX.rank(MX.fromCols([...vs, ...basis])) === r;
};
// The options of a « which family is a basis » question: none of the
// wrong ones may be a basis too.
const notBasis = (basis) => (o) => o && !isBasisOf(o.vs, basis);
const famOpt = (vs, rule = null) => ({ vs, html: Spn(vs), rule });
const join = (xs0) => (xs0.length <= 1 ? xs0.join('') : `${xs0.slice(0, -1).join(', ')} et ${xs0.at(-1)}`);

// « 2x₂ − x₃ + 3 » from coefficients (and a constant).
function linText(co, names, c0 = 0) {
  let s = '';
  co.forEach((c0q, j) => {
    const c = q(c0q);
    if (c.n === 0) return;
    const abs = c.n < 0 ? c.neg() : c;
    const k = abs.eq(1) ? '' : fq(abs);
    s += `${c.n < 0 ? (s ? ' − ' : '−') : s ? ' + ' : ''}${k}${names[j]}`;
  });
  const k0 = q(c0);
  if (k0.n !== 0) s += `${k0.n < 0 ? (s ? ' − ' : '−') : s ? ' + ' : ''}${fq(k0.n < 0 ? k0.neg() : k0)}`;
  return s || '0';
}

// A lines item from parts [{judge, start, html?, ask?, lines}]: the first
// part is the item's own judge and start, the others are segments.
function partsItem(o, parts) {
  const [first, ...rest] = parts;
  const script = [...first.lines];
  for (const p of rest) script.push({ kind: 'segment', html: p.html, ask: p.ask, start: { math: p.start }, judge: p.judge }, ...p.lines);
  return matLines({ ...o, start: first.start, judge: first.judge, script });
}

// Row reduction of A to its reduced form, as a part.
function rrefPart(A, ops, level, rng, { bar = null, cols, subgoal = 'reduce', note } = {}) {
  const lines = opLines(A, ops, {
    bar,
    note: note || ((op) => (op.kind === 'scale' ? 'Pivot à 1' : op.kind === 'swap' ? 'Échanger' : op.i < op.j ? `Remonter : ${opR(op)}` : `Descendre : ${opR(op)}`)),
    subgoal,
  });
  const out = level <= 2 ? lines.map((l) => (l.op.kind === 'swap' ? l : withCells(l, pickCells(l.result, [l.op.i], level === 1 ? 2 : 3, rng)))) : lines;
  return {
    judge: { kind: 'rowops', goal: 'rref', multi: level >= 4, ...(cols ? { cols } : {}) },
    start: mt(A, bar), lines: out.map(({ result, op, ...l }) => l),
  };
}

// A reduction whose steps stay simple: few operations, halves at most,
// entries ≤ 15 on the way.
function niceOps(A, ops, maxOps, { whole = false } = {}) {
  if (ops.length > maxOps) return false;
  const dmax = whole ? 1 : 2;
  let M = A;
  for (const op of ops) {
    if ((op.k && op.k.d > dmax) || (op.c && op.c.d > dmax)) return false;
    M = MX.applyOp(M, op);
    if (M.flat().some((x) => x.d > dmax || Math.abs(x.valueOf()) > 15)) return false;
  }
  return true;
}

// A menu of the « choose the action » mode: the first option is right.
const menu = (right, ...wrongs) => [
  { id: 'ok', label: right, valid: true },
  ...wrongs.map((w, k) => ({ id: `w${k}`, label: w.label ?? w, valid: false, why: w.why || 'Ce n\'est pas l\'étape qui fait avancer ici.', rule: w.rule })),
];

// ======================================================================
// l-vs-subspace
// ======================================================================

const SUBSP = 'l-vs-subspace';
const SUBSP_SUB = [
  { id: 'param', label: 'paramétrer', skill: SUBSP },
  { id: 'counter', label: 'contre-exemple', skill: SUBSP },
];

// The spaces: coordinates names, how an element is written.
const SPACES = {
  R3: { n: 3, names: xs(3), label: 'ℝ³', el: '(x₁ ; x₂ ; x₃)', what: 'vecteurs' },
  P2: { n: 3, names: ['a', 'b', 'c'], label: 'P₂', el: 'a + bt + ct²', what: 'coordonnées dans (1, t, t²)' },
  P3: { n: 4, names: ['a', 'b', 'c', 'd'], label: 'P₃', el: 'a + bt + ct² + dt³', what: 'coordonnées dans (1, t, t², t³)' },
  M22: { n: 4, names: ['a', 'b', 'c', 'd'], label: 'M₂ₓ₂', el: '[[a, b], [c, d]]', what: 'coordonnées (a ; b ; c ; d), ligne par ligne' },
};
const elML = (sp) => (sp === 'M22' ? ML('[[a,b],[c,d]]', { vars: ['a', 'b', 'c', 'd'] }) : SPACES[sp].el);
// An element from its coordinates: text for the judges, and for the screen.
const elText = (sp, v) => (sp === 'M22' ? mt([[v[0], v[1]], [v[2], v[3]]]) : sp[0] === 'P' ? polyT(v) : vt(v));
const elShow = (sp, v) => (sp === 'M22' ? MLm([[v[0], v[1]], [v[2], v[3]]]) : sp[0] === 'P' ? polyR(v) : MLv(v));
// What the student writes for an element: a vector, coordinates, a matrix.
const elLine = (sp, v) => (sp === 'M22' ? mt([[v[0], v[1]], [v[2], v[3]]]) : vt(v));
const member = (co, d, c0 = 0) => `x_${d + 1}=${co.map((c, j) => (j === d || !c ? '' : `+(${c})*x_${j + 1}`)).join('') || '0'}+(${c0})`;

// A set H of the space: kind lin (a subspace: one coordinate is a linear
// combination of the others), aff (the same plus a constant: 0 ∉ H), quad
// (not stable by sum), half (x ≥ 0: not stable by −1).
function setData(rng, kind, sp) {
  const S = SPACES[sp];
  const n = S.n;
  const N = S.names;
  if (kind === 'lin' || kind === 'aff') {
    const c0 = kind === 'aff' ? rng.pick([1, 2, 3, -1, -2, 5]) : 0;
    let d = 0;
    let co;
    let cond;
    const form = rng.int(0, 2);
    if (sp[0] === 'P' && form === 0 && kind === 'lin') {
      const k = rng.pick([1, -1, 2, -2]);
      co = [0, ...Array.from({ length: n - 1 }, (_, j) => -(k ** (j + 1)))];
      cond = `p(${fq(k)}) = 0`;
    } else if (sp[0] === 'P' && form === 0) {
      co = Array(n).fill(0);
      cond = `p(0) = ${fq(c0)}`;
    } else if (sp === 'M22' && form === 0) {
      co = [0, 0, 0, -1];
      cond = `a + d = ${fq(c0)}`;
    } else if (sp === 'M22' && form === 1 && kind === 'lin') {
      d = 1;
      co = [0, 0, rng.pick([1, -1, 2]), 0];
      cond = `${N[1]} = ${linText(co, N)}`;
    } else {
      d = sp === 'R3' ? rng.int(0, 2) : 0;
      for (;;) {
        co = Array.from({ length: n }, (_, j) => (j === d ? 0 : rng.int(-3, 3)));
        if (co.filter((c) => c).length >= (n === 3 ? 1 : 2)) break;
      }
      cond = `${N[d]} = ${linText(co, N, c0)}`;
    }
    const free = [...Array(n).keys()].filter((j) => j !== d);
    const basis = free.map((j) => Array.from({ length: n }, (_, i) => (i === j ? 1 : i === d ? co[j] : 0)));
    return {
      kind, sp, cond, d, co, c0, free, basis, member: member(co, d, c0),
      zero: kind === 'aff' ? `pour l'élément nul, la condition devient 0 = ${fq(c0)}` : null,
    };
  }
  if (kind === 'quad') {
    const T = {
      R3: [
        { cond: 'x₁x₂ = x₃²', member: 'x_1*x_2=x_3^2', pairs: [[[1, 1, 1], [1, 1, -1]], [[1, 4, 2], [4, 1, 2]], [[2, 2, 2], [1, 1, -1]], [[1, 4, -2], [1, 1, 1]]], f: (v) => v[0] * v[1] - v[2] ** 2, ft: (v) => `(${v[0]})*(${v[1]})-(${v[2]})^2`, fr: 'x₁x₂ − x₃²' },
        { cond: 'x₁² = x₂²', member: 'x_1^2=x_2^2', pairs: [[[1, 1, 0], [1, -1, 0]], [[2, 2, 1], [1, -1, 3]], [[1, -1, 2], [3, 3, 0]]], f: (v) => v[0] ** 2 - v[1] ** 2, ft: (v) => `(${v[0]})^2-(${v[1]})^2`, fr: 'x₁² − x₂²' },
      ],
      P2: [
        { cond: 'a² = b²', member: 'x_1^2=x_2^2', pairs: [[[1, 1, 0], [1, -1, 0]], [[1, 1, 2], [2, -2, 0]], [[1, -1, 1], [1, 1, 3]]], f: (v) => v[0] ** 2 - v[1] ** 2, ft: (v) => `(${v[0]})^2-(${v[1]})^2`, fr: 'a² − b²' },
        { cond: 'p(0)·p(1) = 0', member: 'x_1*(x_1+x_2+x_3)=0', pairs: [[[0, 1, 0], [1, -1, 0]], [[0, 1, 1], [1, 0, -1]]], f: (v) => v[0] * (v[0] + v[1] + v[2]), ft: (v) => `(${v[0]})*(${v[0] + v[1] + v[2]})`, fr: 'p(0)·p(1)' },
      ],
      M22: [
        { cond: 'det A = 0', member: 'x_1*x_4-x_2*x_3=0', pairs: [[[1, 0, 0, 0], [0, 0, 0, 1]], [[1, 1, 1, 1], [1, -1, 0, 0]], [[0, 1, 0, 0], [0, 0, 1, 0]]], f: (v) => v[0] * v[3] - v[1] * v[2], ft: (v) => `(${v[0]})*(${v[3]})-(${v[1]})*(${v[2]})`, fr: 'ad − bc' },
      ],
    };
    const t = rng.pick(T[sp === 'P3' ? 'P2' : sp]);
    const sp2 = sp === 'P3' ? 'P2' : sp;
    const [x, y] = rng.pick(t.pairs);
    const s = x.map((a, i) => a + y[i]);
    return { kind, sp: sp2, cond: t.cond, member: t.member, x, y, s, f: t.f(s), ft: t.ft(s), fr: t.fr };
  }
  // half: the first coordinate ≥ 0.
  const sp2 = sp === 'P3' ? 'P2' : sp;
  const n2 = SPACES[sp2].n;
  const x = Array.from({ length: n2 }, (_, i) => (i === 0 ? rng.int(1, 3) : rng.int(-2, 2)));
  const cond = sp2 === 'R3' ? 'x₁ ≥ 0' : sp2 === 'P2' ? 'p(0) ≥ 0' : 'a ≥ 0';
  return { kind, sp: sp2, cond, member: 'x_1>=0', x, c: -1, s: x.map((a) => -a) };
}
const setML = (s) => `H = {${s.sp === 'M22' ? 'A = ' : s.sp[0] === 'P' ? 'p = ' : ''}${elML(s.sp)} ∈ ${SPACES[s.sp].label} : ${s.cond}}`;

// The counter-example of a set that is not a subspace (kind setWitness).
function setCounter(s) {
  const params = { n: SPACES[s.sp].n, member: s.member, ...(s.sp[0] === 'P' ? { poly: true } : {}), ...(s.sp === 'M22' ? { matrix: true } : {}) };
  const shape = s.sp === 'M22' ? { shape: [2, 2] } : {};
  if (s.kind === 'aff') return { kind: 'setWitness', params, ask: [{ v: 'x', label: 'x =', ...shape }], answer: { x: elText(s.sp, Array(SPACES[s.sp].n).fill(0)) } };
  if (s.kind === 'quad') return { kind: 'setWitness', params, ask: [{ v: 'x', label: 'x =', ...shape }, { v: 'y', label: 'y =', ...shape }], answer: { x: elText(s.sp, s.x), y: elText(s.sp, s.y) } };
  return { kind: 'setWitness', params, ask: [{ v: 'x', label: 'x =', ...shape }, { v: 'c', label: 'c =' }], answer: { x: elText(s.sp, s.x), c: '-1' } };
}
const whyNot = (s) => (s.kind === 'aff' ? `0 n'est pas dans H : ${s.zero}.`
  : s.kind === 'quad' ? `${elShow(s.sp, s.x)} et ${elShow(s.sp, s.y)} sont dans H, mais pas leur somme ${elShow(s.sp, s.s)} (${s.fr} = ${s.f}).`
    : `${elShow(s.sp, s.x)} est dans H, mais pas (−1)·${elShow(s.sp, s.x)} = ${elShow(s.sp, s.s)}.`);

// Parts of a subspace: one vector per free coordinate, then H = Span{…}.
function spanParts(s, level, rng, { menus = false } = {}) {
  const S = SPACES[s.sp];
  const parts = s.basis.map((v, k) => {
    const j = s.free[k];
    const fix = s.free.map((i) => `${S.names[i]} = ${i === j ? 1 : 0}`).join(', ');
    const cells = level === 1 ? [[s.d, 0]] : level === 2 ? [[s.d, 0], [j, 0]] : null;
    const line = { kind: 'eq', math: vt(v), note: fix, subgoal: 'param' };
    return {
      judge: { kind: 'mat', expect: vt(v), ...(menus ? { menu: menu(`Fixer ${fix}`, { label: 'Vérifier que 0 est dans H', why: 'Juste, mais cela ne donne pas de vecteur de base.' }) } : {}) },
      start: `v_${k + 1}`, html: `Élément de H avec ${fix}`, ask: `v${sub(k + 1)} =`,
      lines: [cells ? withCells(line, cells) : line],
    };
  });
  parts.push({
    judge: { kind: 'span', basis: s.basis.map(vt), require: 'basis', ...(menus ? { menu: menu('Réunir les vecteurs : H = Span{…}', { label: 'Compter les conditions', why: 'Cela donne la dimension, pas une base.' }) } : {}) },
    start: 'H', html: `H comme un Span (${S.what})`, ask: 'H =',
    lines: [{ kind: 'eq', math: `H = Span{${famT(s.basis)}}`, note: `dim H = ${s.basis.length}`, subgoal: 'param' }],
  });
  return parts;
}

// Parts of a set that is not a subspace: the element that leaves H, then
// the value of its condition.
function witnessParts(s, level, { menus = false } = {}) {
  const parts = [];
  const N = SPACES[s.sp].names;
  if (s.kind === 'aff') {
    parts.push({
      judge: { kind: 'value', expect: String(s.c0), ...(menus ? { menu: menu('Tester l\'élément nul', { label: 'Additionner deux éléments', why: 'Plus long : ici, 0 suffit.' }) } : {}) },
      start: 'r', html: 'Remplace chaque coordonnée par 0 : la condition devient 0 = ?', ask: '0 =',
      lines: [{ kind: 'eq', math: String(s.c0), note: `${fq(s.c0)} ≠ 0 : 0 ∉ H`, subgoal: 'counter' }],
    });
    return parts;
  }
  const sumLine = elLine(s.sp, s.s);
  parts.push({
    judge: { kind: 'mat', expect: sumLine, ...(menus ? { menu: menu(s.kind === 'quad' ? 'Additionner x et y' : 'Multiplier x par −1', { label: 'Tester l\'élément nul', why: '0 est dans H : ce test ne conclut pas.' }) } : {}) },
    start: s.kind === 'quad' ? 'x + y' : '(-1)·x', html: `${s.sp[0] === 'P' ? 'Coordonnées de ' : ''}${s.kind === 'quad' ? 'x + y' : '(−1)·x'}${s.sp[0] === 'P' ? ' dans (1, t, t²)' : ''}`, ask: s.kind === 'quad' ? 'x + y =' : '(−1)·x =',
    lines: [{ kind: 'eq', math: sumLine, note: s.sp === 'R3' ? '' : 'Coefficient par coefficient', subgoal: 'counter' }],
  });
  if (s.kind === 'quad') {
    parts.push({
      judge: { kind: 'value', expect: String(s.f), ...(menus ? { menu: menu(`Calculer ${s.fr} pour x + y`) } : {}) },
      start: 'r', html: `${s.fr} pour x + y`, ask: `${s.fr} =`,
      lines: [...(level <= 2 ? [{ kind: 'eq', math: s.ft, note: '' }] : []), { kind: 'eq', math: String(s.f), note: `≠ 0 : x + y ∉ H`, subgoal: 'counter' }],
    });
  } else {
    parts.push({
      judge: { kind: 'value', expect: String(s.s[0]), ...(menus ? { menu: menu(`Lire ${N[0] === 'x₁' ? 'x₁' : 'le premier coefficient'}`) } : {}) },
      start: 'r', html: s.sp === 'R3' ? 'Sa première composante' : s.sp === 'P2' ? 'Sa valeur en 0' : 'Son coefficient a', ask: '=',
      lines: [{ kind: 'eq', math: String(s.s[0]), note: '< 0 : (−1)·x ∉ H', subgoal: 'counter' }],
    });
  }
  return parts;
}

function subspaceDecision(s) {
  const opts = [
    { id: 'span', label: 'Oui : la condition est linéaire et homogène, H est un Span', valid: s.kind === 'lin' },
    { id: 'zero', label: 'Non : 0 n\'est pas dans H', valid: s.kind === 'aff' },
    { id: 'sum', label: 'Non : H n\'est pas stable par somme', valid: s.kind === 'quad' },
    { id: 'mul', label: 'Non : H n\'est pas stable par multiplication par un scalaire', valid: s.kind === 'half' },
  ];
  const rule = s.kind === 'aff' ? 'l_subspace_zero' : s.kind === 'quad' ? 'l_subspace_nonlinear' : null;
  return {
    kind: 'decision', prompt: 'H est-il un sous-espace ? Choisis la justification la plus courte.',
    options: opts.map((o) => (o.valid ? o : {
      ...o, ...(o.id === 'span' && rule ? { rule } : {}),
      why: s.kind === 'lin' ? 'Si : 0 vérifie la condition, et elle est stable par somme et par multiple (c\'est une équation linéaire homogène).' : o.id === 'span' ? whyNot(s) : 'Ce n\'est pas ce qui échoue ici, ou pas le plus court.',
    })),
  };
}

function subspaceItem(level, rng) {
  if (level === 5) return subspaceCount(rng, null);
  const sps = level >= 4 ? ['R3', 'P2', 'P3', 'M22'] : ['R3', 'P2'];
  const kind = level === 1 ? 'lin' : rng.pick(['lin', 'lin', 'aff', 'quad', 'half']);
  const s = setData(rng, kind, rng.pick(sps));
  const menus = level === 3;
  const parts = kind === 'lin' ? spanParts(s, level, rng, { menus }) : witnessParts(s, level, { menus });
  if (level >= 2) parts[0].lines.unshift(subspaceDecision(s));
  const given = kind === 'quad' ? ` On donne x = ${elShow(s.sp, s.x)} et y = ${elShow(s.sp, s.y)}, deux éléments de H.` : kind === 'half' ? ` On donne x = ${elShow(s.sp, s.x)}, un élément de H.` : '';
  const hints = kind === 'lin'
    ? [
      { level: 1, html: 'Exprime un élément de H avec des paramètres libres : si c\'est une combinaison fixe de vecteurs, H est un Span.' },
      { level: 2, html: `Avec ${SPACES[s.sp].names[s.free[0]]} = 1 et les autres coordonnées libres à 0 : v₁ = (${s.basis[0].map((x, i) => (i === s.d ? '□' : fq(x))).join(' ; ')}).` },
      { level: 3, html: `H = ${Spn(s.basis)}` },
    ]
    : [
      { level: 1, html: 'Une condition non homogène exclut 0 ; une condition non linéaire n\'est pas stable par somme ; une inégalité n\'est pas stable par −1.' },
      { level: 2, html: s.kind === 'aff' ? 'Remplace chaque coordonnée par 0 dans la condition.' : `Calcule ${s.kind === 'quad' ? 'x + y' : '(−1)·x'} coefficient par coefficient.` },
      { level: 3, html: whyNot(s) },
    ];
  return partsItem({
    skill: SUBSP, level,
    prompt: `${setML(s)}.${given} ${level === 1 ? `H est un sous-espace : écris un élément de H pour chaque coordonnée libre, puis H comme un Span (${SPACES[s.sp].what}).` : `H est-il un sous-espace de ${SPACES[s.sp].label} ? Justifie : un Span, ou un contre-exemple.`}`,
    mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', tapActions: level === 3 ? 'menu' : null,
    hints, subgoals: SUBSP_SUB, key: `${SUBSP}:${s.sp}:${s.cond}`,
  }, parts);
}

// « Combien de ces 4 ensembles sont des sous-espaces ? » (2019 Q12).
function subspaceCount(rng, exam) {
  const kinds = rng.shuffle(['lin', rng.pick(['lin', 'half', 'quad']), 'aff', 'quad']);
  const sets = [];
  for (const k of kinds) {
    for (let t = 0; t < 50; t++) {
      const s = setData(rng, k, rng.pick(['R3', 'P2', 'M22']));
      if (t < 49 && sets.some((x) => x.cond === s.cond && x.sp === s.sp)) continue;
      sets.push(s);
      break;
    }
  }
  const nLin = kinds.filter((k) => k === 'lin').length;
  const nAff = kinds.filter((k) => k === 'aff').length;
  const nQuad = kinds.filter((k) => k === 'quad').length;
  const list = sets.map((s, i) => `(${i + 1}) ${setML(s).replace(/^H = /, '')}`).join('<br>');
  return mcqDistinct({
    skill: SUBSP, level: exam ? 4 : 5, key: `count:${sets.map((s) => s.cond).join('|')}`, exam: examTag({ exam }),
    prompt: `Combien de ces ensembles sont des sous-espaces vectoriels ?<br>${list}`,
    right: String(nLin),
    wrongs: [{ html: String(nLin + nAff), rule: 'l_subspace_zero' }, { html: String(nLin + nQuad), rule: 'l_subspace_nonlinear' }],
    fillers: [0, 1, 2, 3, 4].map((k) => ({ html: String(k) })),
    solution: sets.map((s, i) => ({ html: `(${i + 1}) ${s.kind === 'lin' ? `oui : ${Spn(s.basis)}` : `non : ${whyNot(s)}`}`, note: '' })),
  }, rng);
}

function subspaceExam(rng, exam) {
  if (exam === 'mcq') return subspaceCount(rng, exam);
  const which = rng.int(0, 5);
  const tag = examTag({ exam });
  if (which === 0) {
    return tfL({
      skill: SUBSP, key: 'at4', truth: true, exam: tag,
      statement: '{p ∈ P₄ : p(t) = at⁴, a ∈ ℝ} est un sous-espace de P₄.',
      explanation: 'Vrai : c\'est Span{t⁴}, et un Span est toujours un sous-espace.',
    });
  }
  if (which === 1) {
    return tfL({
      skill: SUBSP, key: 'p-2q', truth: true, exam: tag,
      statement: 'Si H est un sous-espace de P₃ qui contient p et q, alors H contient p − 2q.',
      explanation: 'Vrai : H est stable par multiplication (−2q ∈ H) et par somme (p + (−2q) ∈ H).',
    });
  }
  if (which === 2) {
    const s = setData(rng, 'quad', 'M22');
    return tfL({
      skill: SUBSP, key: `det0:${s.x}`, truth: false, exam: tag, ruleIfTrue: 'l_subspace_nonlinear',
      statement: '{A ∈ M₂ₓ₂ : det A = 0} est un sous-espace de M₂ₓ₂.',
      counter: setCounter(s),
      explanation: `Faux : ${whyNot(s)}`,
    });
  }
  const kind = rng.pick(['lin', 'aff', 'quad', 'half']);
  const s = setData(rng, kind, rng.pick(['R3', 'P2', 'M22']));
  const rule = kind === 'aff' ? 'l_subspace_zero' : kind === 'quad' ? 'l_subspace_nonlinear' : null;
  return tfL({
    skill: SUBSP, key: `${s.sp}:${s.cond}`, truth: kind === 'lin', exam: tag,
    ...(rule ? { ruleIfTrue: rule } : {}),
    statement: `${setML(s)} est un sous-espace de ${SPACES[s.sp].label}.`,
    ...(kind === 'lin' ? {} : { counter: setCounter(s) }),
    explanation: kind === 'lin' ? `Vrai : H = ${Spn(s.basis)} (${SPACES[s.sp].what}).` : `Faux : ${whyNot(s)}`,
  });
}

// ======================================================================
// l-vs-kernel and l-vs-col-row: a matrix A built from its reduced form
// ======================================================================

const KER = 'l-vs-kernel';
const KER_SUB = [
  { id: 'reduce', label: 'réduire', skill: 'l-sys-rref' },
  { id: 'param', label: 'paramétrer', skill: 'l-sys-solution' },
  { id: 'separate', label: 'séparer', skill: KER },
];

// A (m × n) with nFree free columns, its reduced form R, the operations of
// the reduction, the pivots and a basis K of the kernel (one vector per
// free variable, that variable 1). colDiff: a pivot column of A differs
// from that of R.
function spaceData(rng, { m = 3, n = 4, nFree, maxOps = 6, colDiff = false } = {}) {
  for (let t = 0; t < 200; t++) {
    const f = nFree ?? rng.pick(n === 5 ? [2, 3] : [1, 2]);
    const r = n - f;
    if (r > m || r < 2 || (colDiff && r >= m)) continue;
    const pivots = [0, ...rng.shuffle([...Array(n).keys()].slice(1)).slice(0, r - 1)].sort((a, b) => a - b);
    const { A, R, fallback } = rrefWith(m, n, pivots, rng, { max: 3 });
    if (fallback) continue;
    if (A.some((row) => row.every((x) => x.n === 0))) continue;
    if (maxAbs(A) > 9) continue;
    const red = MX.rref(A);
    if (!niceOps(A, red.ops, maxOps) || red.ops.some((op) => op.kind === 'swap')) continue;
    const K = MX.kernel(R);
    if (!K.length || maxAbs(K) > 6) continue;
    if (K.flat().filter((x, k) => pivots.includes(k % n) && x.n !== 0).length < 2) continue;
    // The pivot columns of R (e₁, …, e_r) do not span Col A.
    if (colDiff && MX.rank(MX.fromCols([...pivots.map((c) => MX.col(A, c)), ...pivots.map((c) => MX.col(R, c))])) === r) continue;
    return { A, R, ops: red.ops, pivots, K, m, n };
  }
  const A = MX.mat([[1, 2, 0, -1], [2, 4, 1, 1], [-1, -2, 1, 4]]);
  const red = MX.rref(A);
  return { A, R: red.R, ops: red.ops, pivots: red.pivots, K: MX.kernel(red.R), m: 3, n: 4, fallback: true };
}

const freeOf = (d) => [...Array(d.n).keys()].filter((j) => !d.pivots.includes(j));
// x = T(x₁, …, xₙ) written as a formula, one row of A per component.
const mapML = (A) => `T(${xs(A[0].length).join(', ')}) = (${A.map((r) => linText(r, xs(A[0].length))).join(' ; ')})`;

// The kernel's parts: one vector per free variable (guided), or the
// reduction; then Ker A = Span{…}.
function kernelParts(d, level, rng, name = 'A') {
  const parts = [];
  const free = freeOf(d);
  const X = xs(d.n);
  if (level <= 2) {
    d.K.forEach((v, k) => {
      const fix = free.map((j) => `${X[j]} = ${j === free[k] ? 1 : 0}`).join(', ');
      const cells = level === 1 ? d.pivots.map((p) => [p, 0]) : v.map((_, i) => [i, 0]);
      parts.push({
        judge: { kind: 'mat', expect: vt(v) }, start: `v_${k + 1}`, html: `Vecteur de ${X[free[k]]}`, ask: `v${sub(k + 1)} =`,
        lines: [withCells({ kind: 'eq', math: vt(v), note: fix, subgoal: 'param' }, cells)],
      });
    });
  } else parts.push(rrefPart(d.A, d.ops, level, rng));
  parts.push({
    judge: { kind: 'span', basis: d.K.map(vt), require: 'basis' }, start: mt(d.R), html: `Une base de Ker ${name}`, ask: `Ker ${name} =`,
    lines: [{ kind: 'eq', math: `Ker ${name} = Span{${famT(d.K)}}`, note: `Une variable libre, un vecteur : dim Ker ${name} = ${d.K.length}`, subgoal: 'separate' }],
  });
  return parts;
}

function kernelItem(level, rng) {
  const n = level >= 4 ? rng.pick([4, 5]) : 4;
  const d = spaceData(rng, { n, maxOps: level >= 4 ? 8 : 6 });
  const free = freeOf(d);
  const X = xs(d.n);
  const parts = kernelParts(d, level, rng, level === 5 ? 'T' : 'A');
  if (level === 2) {
    const piv = d.pivots.map((j) => X[j]);
    parts[0].lines.unshift({
      kind: 'decision', prompt: 'Quelles variables sont libres ?', options: rng.shuffle([
        { id: 'free', label: join(free.map((j) => X[j])), valid: true },
        { id: 'piv', label: join(piv), valid: false, why: `${join(piv)} sont les variables des colonnes pivots : elles s'expriment en fonction des autres.` },
        { id: 'last', label: X[d.n - 1], valid: free.length === 1 && free[0] === d.n - 1, why: `Il y a ${free.length} colonnes sans pivot, donc ${free.length} variables libres.` },
      ].filter((o, i, arr) => arr.findIndex((p) => p.label === o.label) === i)),
    });
  }
  const sol = d.pivots.map((p, i) => `${X[p]} = ${linText(free.map((j) => d.R[i][j].neg()), free.map((j) => X[j]))}`);
  const hints = [
    { level: 1, html: 'Une variable libre = un vecteur de base : mets-la à 1, les autres libres à 0, et lis les variables pivots sur R (avec le signe changé).' },
    { level: 2, html: `Solution générale : ${sol.join(' ; ')}.` },
    { level: 3, html: `Ker A = ${Spn(d.K)}` },
  ];
  const prompt = level <= 2
    ? `A = ${MLm(d.A)} a pour forme réduite R = ${MLm(d.R)}. Écris le vecteur de chaque variable libre, puis une base de Ker A.`
    : level === 5
      ? `Soit ${mapML(d.A)}. Donne une base de Ker T : réduis sa matrice, puis écris Ker T = Span{…}.`
      : `Donne une base de Ker A, pour A = ${MLm(d.A)}${level === 3 ? ' : choisis chaque opération, puis écris la base' : ''}.`;
  return partsItem({
    skill: KER, level, prompt, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', tapActions: level === 3 ? 'rowops' : null,
    hints, subgoals: KER_SUB, key: `${KER}:${mt(d.A)}`, fallback: d.fallback,
  }, parts);
}

// The kernel with the pivot components of the wrong sign (l_ker_sign).
const signFlip = (d) => d.K.map((v) => v.map((x, i) => (d.pivots.includes(i) ? x.neg() : x)));
const nonZeroRows = (R) => R.filter((r) => r.some((x) => x.n !== 0));

function kernelExam(rng, exam) {
  const d = spaceData(rng, { n: 4, nFree: 2 });
  const tag = examTag({ exam });
  if (exam === 'mcq') {
    const flip = signFlip(d);
    return mcqDistinct({
      skill: KER, level: 4, key: `mcq:${mt(d.A)}`, exam: tag,
      prompt: `Soit A = ${MLm(d.A)}. Laquelle de ces familles est une base de Ker A ?`,
      right: Spn(d.K),
      wrongs: [famOpt(flip, 'l_ker_sign'), famOpt(nonZeroRows(d.R), 'l_ker_from_rows')].filter(notBasis(d.K)),
      fillers: [famOpt([d.K[0]]), famOpt(d.K.map((v) => v.map((x, i) => (i === d.pivots[0] ? x.add(1) : x)))), famOpt([d.K[0], d.K[0].map((x) => x.mul(2))])].filter(notBasis(d.K)),
      solution: [{ html: `R = ${MLm(d.R)}`, note: 'Forme réduite' }, { html: `Ker A = ${Spn(d.K)}`, note: 'Une variable libre, un vecteur' }],
    }, rng);
  }
  const which = rng.int(0, 3);
  if (which === 0) {
    return tfL({
      skill: KER, key: 'dimker', truth: true, exam: tag,
      statement: 'dim Ker A est égal au nombre de colonnes de A sans pivot.',
      explanation: 'Vrai : chaque colonne sans pivot donne une variable libre, et chaque variable libre un vecteur de base du noyau.',
    });
  }
  if (which === 1) {
    return tfL({
      skill: KER, key: 'kerR', truth: true, exam: tag,
      statement: 'Si R est la forme échelonnée réduite de A, alors Ker A = Ker R.',
      explanation: 'Vrai : les opérations sur les lignes ne changent pas l\'ensemble des solutions de Ax = 0.',
    });
  }
  // 2021 Q25: these vectors form a basis of Ker A (true, or a sign wrong).
  const truth = rng.chance(0.5);
  const F = truth ? (rng.chance(0.5) ? [d.K[1], d.K[0]] : [d.K[0], d.K[1].map((x, i) => x.add(d.K[0][i]))]) : signFlip(d);
  const bad = F.find((v) => MX.matVec(d.A, v).some((x) => x.n !== 0));
  return tfL({
    skill: KER, key: `fam:${mt(d.A)}:${famT(F)}`, truth, exam: tag, ...(truth ? {} : { ruleIfTrue: 'l_ker_sign' }),
    statement: `Soit A = ${MLm(d.A)}, de forme réduite R = ${MLm(d.R)}. Les vecteurs ${ML(famT(F))} forment une base de Ker A.`,
    ...(truth ? {} : { counter: { kind: 'vecFamily', params: { want: 'notInKer', A: mt(d.A), F: F.map(vt) }, ask: [{ v: 'v', label: 'v =' }], answer: { v: vt(bad) } } }),
    explanation: truth ? `Vrai : ces deux vecteurs sont dans Ker A (A·v = 0) et libres, et dim Ker A = 2.` : `Faux : A·${MLv(bad)} ≠ 0. Une base est ${Spn(d.K)}.`,
  });
}

// ---------- l-vs-col-row ----------

const COL = 'l-vs-col-row';
const COL_SUB = [
  { id: 'reduce', label: 'réduire', skill: 'l-sys-rref' },
  { id: 'pivots', label: 'colonnes pivots', skill: COL },
];
const colBasisOf = (d) => d.pivots.map((j) => MX.col(d.A, j));

function colRowParts(d, level, rng, { rows = true, ker = false } = {}) {
  const parts = [];
  const pc = d.pivots.map((j) => j + 1);
  if (level <= 2) {
    const line = { kind: 'eq', math: vt(pc), note: 'Lues sur R', subgoal: 'pivots' };
    parts.push({ judge: { kind: 'mat', expect: vt(pc) }, start: 'colonnes', lines: [level === 1 ? withCells(line, pc.map((_, i) => [i, 0])) : line] });
  } else parts.push(rrefPart(d.A, d.ops, level, rng));
  const colPart = {
    judge: { kind: 'span', basis: colBasisOf(d).map(vt), require: 'basis' }, start: mt(d.A), html: 'Une base de Col A', ask: 'Col A =',
    lines: [{ kind: 'eq', math: `Col A = Span{${famT(colBasisOf(d))}}`, note: `Colonnes ${join(pc.map(String))} de A`, subgoal: 'pivots' }],
  };
  const rowPart = {
    judge: { kind: 'span', basis: nonZeroRows(d.R).map(vt), require: 'basis', rowsA: mt(d.A) }, start: mt(d.R), html: 'Une base de Lgn A (lignes écrites en colonnes)', ask: 'Lgn A =',
    lines: [{ kind: 'eq', math: `Lgn A = Span{${famT(nonZeroRows(d.R))}}`, note: 'Lignes non nulles de R', subgoal: 'pivots' }],
  };
  if (level === 2) {
    colPart.lines.unshift({
      kind: 'decision', prompt: 'Où prendre les vecteurs de Col A ?', options: [
        { id: 'A', label: 'Les colonnes pivots de A', valid: true },
        { id: 'R', label: 'Les colonnes pivots de R', valid: false, rule: 'l_col_from_rref', why: 'Les opérations sur les lignes changent l\'espace des colonnes : les pivots disent quelles colonnes garder, les vecteurs se prennent dans A.' },
      ],
    });
    rowPart.lines.unshift({
      kind: 'decision', prompt: 'Où prendre les vecteurs de Lgn A ?', options: [
        { id: 'R', label: 'Les lignes non nulles de R', valid: true },
        { id: 'A', label: 'Les lignes de A aux positions des lignes pivots de R', valid: false, rule: 'l_row_from_A', why: 'Les opérations ont mélangé les lignes : celles de A à ces positions peuvent être liées. Les lignes non nulles de R forment toujours une base.' },
      ],
    });
  }
  parts.push(colPart);
  if (rows) parts.push(rowPart);
  if (ker) {
    parts.push({
      judge: { kind: 'span', basis: d.K.map(vt), require: 'basis' }, start: mt(d.R), html: 'Une base de Ker A', ask: 'Ker A =',
      lines: [{ kind: 'eq', math: `Ker A = Span{${famT(d.K)}}`, note: `rang A + dim Ker A = ${d.pivots.length} + ${d.K.length} = ${d.n}`, subgoal: 'pivots' }],
    });
  }
  return parts;
}

function colRowItem(level, rng) {
  const m = level >= 4 ? rng.pick([3, 4]) : 3;
  const n = level >= 4 ? rng.pick([4, 5]) : 4;
  const d = spaceData(rng, { m, n, nFree: m === 4 ? rng.pick([n - 3, n - 2]) : n - 2, maxOps: level >= 4 ? 9 : 6, colDiff: true });
  const parts = colRowParts(d, level, rng, { rows: level !== 1, ker: level === 3 || level === 5 });
  const images = level >= 4 && rng.chance(0.5);
  const hints = [
    { level: 1, html: 'Les pivots se lisent sur R, mais les vecteurs de Col A se prennent dans A. Lgn A : les lignes non nulles de R.' },
    { level: 2, html: `Col A = Span{${d.pivots.map((j) => `a${sub(j + 1)}`).join(', ')}}, avec les colonnes de A.` },
    { level: 3, html: `Col A = ${Spn(colBasisOf(d))}` },
  ];
  const what = level === 1 ? 'Col A' : level === 3 || level === 5 ? 'Col A, Lgn A et Ker A' : 'Col A et Lgn A';
  const Aname = images ? `T : ℝ${'⁰¹²³⁴⁵'[d.n]} → ℝ³ telle que ${colsOf(d.A).map((c, j) => `T(e${sub(j + 1)}) = ${MLv(c)}`).join(', ')}` : `A = ${MLm(d.A)}`;
  const prompt = level <= 2
    ? `A = ${MLm(d.A)} a pour forme réduite R = ${MLm(d.R)}. Donne les colonnes pivots, puis une base de ${what}.`
    : `Soit ${Aname}${images ? ', et A sa matrice canonique (Col A = Im T)' : ''}. Réduis A, puis donne une base de ${what}${level === 3 ? ' : choisis chaque opération' : ''}.`;
  return partsItem({
    skill: COL, level, prompt, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', tapActions: level === 3 ? 'rowops' : null,
    hints, subgoals: COL_SUB, key: `${COL}:${mt(d.A)}`, fallback: d.fallback,
  }, parts);
}

function colRowExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'mcq') {
    const d = spaceData(rng, { n: 4, nFree: 2, colDiff: true });
    const cols = colBasisOf(d);
    const rCols = d.pivots.map((j) => MX.col(d.R, j));
    const nonPiv = freeOf(d).map((j) => MX.col(d.A, j));
    return mcqDistinct({
      skill: COL, level: 4, key: `mcq:${mt(d.A)}`, exam: tag,
      prompt: `Soit T(x) = Ax avec A = ${MLm(d.A)}, de forme réduite R = ${MLm(d.R)}. Laquelle de ces familles est une base de Im T ?`,
      right: Spn(cols),
      wrongs: [famOpt(rCols, 'l_col_from_rref'), famOpt(nonPiv.slice(0, 2))].filter(notBasis(cols)),
      fillers: [famOpt([cols[0]]), famOpt([cols[0], cols[0].map((x, i) => x.add(rCols[1][i]))]), famOpt([cols[0], cols[0].map((x) => x.mul(-2))]), famOpt([nonPiv[0], rCols[1]])].filter(notBasis(cols)),
      solution: [{ html: `Pivots en colonnes ${join(d.pivots.map((j) => String(j + 1)))}`, note: 'Lus sur R' }, { html: `Im T = Col A = ${Spn(cols)}`, note: 'Colonnes pivots de A' }],
    }, rng);
  }
  if (rng.chance(0.5)) {
    return tfL({
      skill: COL, key: 'dimcolrow', truth: true, exam: tag,
      statement: 'Pour toute matrice A, dim Col A = dim Lgn A.',
      explanation: 'Vrai : les deux dimensions valent le nombre de pivots, le rang de A.',
    });
  }
  const A = rng.pick([[[1, 1], [1, 1]], [[1, 2], [2, 4]], [[1, 0], [1, 0]]]);
  return tfL({
    skill: COL, key: `rrefcols:${mt(A)}`, truth: false, exam: tag, ruleIfTrue: 'l_col_from_rref',
    statement: 'Si R est la forme échelonnée réduite de A, les colonnes pivots de R forment une base de Col A.',
    counter: { kind: 'matOne', params: { want: 'rrefColsNotBasis' }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(A) } },
    explanation: `Faux : pour A = ${MLm(MX.mat(A))}, R = ${MLm(MX.rref(MX.mat(A)).R)} ; la colonne pivot de R, (1 ; 0), n'est pas dans Col A = Span{${ML(vt(MX.col(MX.mat(A), 0)))}}.`,
  });
}

// ======================================================================
// l-vs-basis
// ======================================================================

const BASIS = 'l-vs-basis';
const BASIS_SUB = [
  { id: 'coords', label: 'coordonnées', skill: 'l-vs-coords' },
  { id: 'echelon', label: 'échelonner', skill: 'l-sys-echelon' },
  { id: 'extract', label: 'extraire', skill: BASIS },
];

// Four vectors of P₃ or M₂ₓ₂ (coordinates in the columns of M): a basis,
// or three free vectors and a combination of them (coefficients ±1, ±2).
function basisData(rng, { dep = rng.chance(0.6), maxOps = 6 } = {}) {
  for (let t = 0; t < 200; t++) {
    const sp = rng.pick(['P3', 'M22']);
    const U = colsOf(unimodular(4, rng, { max: 2 }));
    let vs;
    if (dep) {
      const base = rng.shuffle(U).slice(0, 3);
      const co = [rng.int(-2, 2), rng.int(-2, 2), rng.int(-2, 2)];
      if (co.filter((c) => c).length < 2) continue;
      const w = base[0].map((_, i) => base.reduce((acc, b, k) => acc.add(b[i].mul(co[k])), q(0)));
      vs = [...base];
      vs.splice(rng.int(1, 3), 0, w);
    } else vs = rng.shuffle(U);
    const M = MX.fromCols(vs);
    if (maxAbs(M) > 4 || vs.some((v) => v.every((x) => x.n === 0))) continue;
    const e = MX.echelon(M);
    if (e.ops.length < 2 || !niceOps(M, e.ops, maxOps, { whole: true })) continue;
    const r = e.pivots.length;
    return { sp, vs, M, E: e.E, ops: e.ops, pivots: e.pivots, r, dep: r < 4 };
  }
  const vs = [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 1], [1, 0, 0, 1]].map((v) => v.map((x) => q(x)));
  const M = MX.fromCols(vs);
  const e = MX.echelon(M);
  return { sp: 'P3', vs, M, E: e.E, ops: e.ops, pivots: e.pivots, r: e.pivots.length, dep: true, fallback: true };
}
const famShow = (d, vs = d.vs) => vs.map((v) => elShow(d.sp, v)).join(', ');

function basisItem(level, rng) {
  const d = basisData(rng, { maxOps: level >= 4 ? 8 : 6 });
  const S = SPACES[d.sp];
  const coordsLine = { kind: 'eq', math: mt(d.M), note: `Coordonnées en colonnes (${S.what})`, subgoal: 'coords' };
  const parts = [{
    judge: { kind: 'mat', expect: mt(d.M) }, start: 'Coordonnées',
    lines: [level === 1 ? withCells(coordsLine, pickCells(d.M, [0, 1, 2, 3], 4, rng)) : coordsLine],
  }];
  const ech = opLines(d.M, d.ops, { note: (op) => (op.kind === 'swap' ? 'Échanger' : `Annuler sous le pivot : ${opR(op)}`), subgoal: 'echelon' });
  parts.push({
    judge: { kind: 'rowops', goal: 'echelon', multi: level >= 4 }, start: mt(d.M), html: 'Échelonne la matrice des coordonnées',
    lines: ech.map((l) => (level <= 2 && l.op.kind !== 'swap' ? withCells(l, pickCells(l.result, [l.op.i], 2, rng)) : l)).map(({ result, op, ...l }) => l),
  });
  parts.push({
    judge: { kind: 'value', expect: String(d.r) }, start: 'r', html: 'Le rang de la famille', ask: 'rang =',
    lines: [{ kind: 'eq', math: String(d.r), note: d.dep ? `${d.r} pivots pour 4 vecteurs : pas une base de ${S.label}` : `4 pivots : une base de ${S.label}`, subgoal: 'extract' }],
  });
  if (d.dep) {
    const keep = d.pivots.map((j) => d.vs[j]);
    parts.push({
      judge: { kind: 'span', basis: keep.map(vt), require: 'basis' }, start: mt(d.M), html: 'Une base du Span de la famille (en coordonnées)', ask: 'base =',
      lines: [{ kind: 'eq', math: `Span{${famT(keep)}}`, note: `Les vecteurs ${join(d.pivots.map((j) => String(j + 1)))} (colonnes pivots) : dimension ${d.r}`, subgoal: 'extract' }],
    });
  }
  if (level === 2) {
    parts[0].lines.unshift({
      kind: 'decision', prompt: `Quel critère décide si ces 4 vecteurs forment une base de ${S.label} (de dimension 4) ?`, options: [
        { id: 'rank', label: 'Ils sont libres : la matrice des coordonnées a 4 pivots', valid: true },
        { id: 'count', label: `Il y en a 4 et dim ${S.label} = 4 : c'est toujours une base`, valid: false, rule: 'l_span_count', why: 'Le nombre ne suffit pas : 4 vecteurs peuvent être liés. Il faut 4 pivots.' },
        { id: 'zero', label: 'Aucun n\'est nul', valid: false, why: 'Des vecteurs non nuls peuvent être liés (l\'un combinaison des autres).' },
      ],
    });
  }
  const hints = [
    { level: 1, html: 'Coordonnées en colonnes, puis pivots : 4 pivots ⇔ base. Sinon, les colonnes pivots donnent une base du Span.' },
    { level: 2, html: 'rang = □ : compte les pivots de la forme échelonnée.' },
    { level: 3, html: d.dep ? `rang ${d.r} : pas une base ; base du Span : les vecteurs ${join(d.pivots.map((j) => String(j + 1)))}` : 'rang 4 : une base' },
  ];
  return partsItem({
    skill: BASIS, level,
    prompt: `Les vecteurs ${famShow(d)} forment-ils une base de ${S.label} ? Écris leurs coordonnées en colonnes (${S.what}), échelonne, donne le rang${d.dep ? ', puis une base du Span de la famille' : ''}${level === 3 ? ' : choisis chaque opération' : ''}.`,
    mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', tapActions: level === 3 ? 'rowops' : null,
    hints, subgoals: BASIS_SUB, key: `${BASIS}:${mt(d.M)}`, fallback: d.fallback,
  }, parts);
}

function basisExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'mcq') {
    const d = basisData(rng, { dep: true });
    const S = SPACES[d.sp];
    const opt = (k, rule = null) => ({ html: String(k), rule });
    return mcqDistinct({
      skill: BASIS, level: 4, key: `mcq:${mt(d.M)}`, exam: tag,
      prompt: `Quelle est la dimension du sous-espace de ${S.label} engendré par ${famShow(d)} ?`,
      right: String(d.r),
      wrongs: [opt(4, 'l_span_count')],
      fillers: [opt(d.r - 1), opt(d.r + 1), opt(d.r - 2), opt(5)].filter((o) => Number(o.html) >= 1),
      solution: [{ html: `Coordonnées en colonnes : ${MLm(d.M)}`, note: '' }, { html: `Forme échelonnée : ${MLm(d.E)}`, note: `${d.r} pivots` }],
    }, rng);
  }
  const which = rng.int(0, 2);
  const n = rng.pick([3, 4]);
  const R = (k) => `ℝ${sup(k)}`;
  if (which === 0) {
    return tfL({
      skill: BASIS, key: `indep:${n}`, truth: false, exam: tag,
      statement: `Si dim V = ${n} et si S est une famille libre de V, alors S est une base de V.`,
      counter: { kind: 'vecFamily', params: { want: 'indepNotBasis', n }, ask: [{ v: 'F', label: 'S =' }], answer: { F: vt(Array.from({ length: n }, (_, i) => (i === 0 ? 1 : 0))) } },
      explanation: `Faux : une famille libre peut être trop petite. Dans ${R(n)}, S = {e₁} est libre mais n'engendre pas ${R(n)}.`,
    });
  }
  if (which === 1) {
    const k = rng.pick([4, 5, 6]);
    return tfL({
      skill: BASIS, key: `count:${k}`, truth: true, exam: tag,
      statement: `${k - 1} vecteurs de ${R(k)} ne peuvent pas engendrer ${R(k)}, mais ${k} vecteurs de ${R(k - 1)} peuvent engendrer ${R(k - 1)}.`,
      explanation: `Vrai : il faut au moins ${k} vecteurs pour engendrer un espace de dimension ${k} ; ${k} vecteurs de ${R(k - 1)} peuvent l'engendrer (une base et un vecteur de plus).`,
    });
  }
  const F = n === 3 ? '(1 ; 0 ; 0), (1 ; 0 ; 0), (0 ; 0 ; 1)' : '(1 ; 0 ; 0 ; 0), (0 ; 1 ; 0 ; 0), (1 ; 1 ; 0 ; 0), (0 ; 0 ; 0 ; 1)';
  return tfL({
    skill: BASIS, key: `nvec:${n}`, truth: false, exam: tag, ruleIfTrue: 'l_span_count',
    statement: `${n} vecteurs de ${R(n)} forment toujours une base de ${R(n)}.`,
    counter: { kind: 'vecFamily', params: { want: 'spanNotBasis', n }, ask: [{ v: 'F', label: 'vecteurs =' }], answer: { F } },
    explanation: `Faux : ${n} vecteurs peuvent être liés, par exemple ${ML(F)}.`,
  });
}

// ======================================================================
// l-vs-rank
// ======================================================================

const RANK = 'l-vs-rank';
const RANK_SUB = [{ id: 'formula', label: 'théorème du rang', skill: RANK }];

// A value part: a number asked, with the wrong answer of the trap.
function valPart({ ask, html, value, steps = [], note = '', wrong, ctx, menu: m }) {
  return {
    judge: { kind: 'value', expect: String(value), ...(wrong !== undefined && wrong !== value ? { wrong: { l_rank_dim_confusion: [{ text: String(wrong), ctx }] } } : {}), ...(m ? { menu: m } : {}) },
    start: 'k', html, ask,
    lines: [...steps, { kind: 'eq', math: String(value), note, subgoal: 'formula' }],
  };
}

function rankData(rng) {
  for (;;) {
    const m = rng.int(2, 9);
    const n = rng.int(2, 9);
    if (m === n) continue;
    const r = rng.int(1, Math.min(m, n));
    if (r === Math.min(m, n) && rng.chance(0.5)) continue;
    return { m, n, r };
  }
}

function rankItem(level, rng) {
  if (level === 4) return rankMapItem(rng);
  const { m, n, r } = rankData(rng);
  const ctx = { n, r };
  const guided = level <= 2;
  const steps = (a, b) => (guided ? [{ kind: 'eq', math: `${a}-${b}`, blanks: level === 1 ? [[0, 1]] : [[0, 1], [2, 3]], note: '' }] : []);
  let parts;
  let prompt;
  if (guided) {
    parts = [
      valPart({ ask: 'dim Ker A =', html: 'dim Ker A', value: n - r, steps: steps(n, r), note: `n − r, avec n = ${n} colonnes`, wrong: m - r, ctx }),
      valPart({ ask: 'dim Ker Aᵀ =', html: 'dim Ker Aᵀ', value: m - r, steps: steps(m, r), note: `m − r : Aᵀ a ${m} colonnes` }),
      valPart({ ask: 'dim Lgn A =', html: 'dim Lgn A', value: r, note: 'dim Lgn A = dim Col A = rang A' }),
    ];
    prompt = `A est une matrice ${m} × ${n} de rang ${r}. ${level === 1 ? 'Avec rang A + dim Ker A = n (n = nombre de colonnes), donne' : 'Donne'} dim Ker A, dim Ker Aᵀ et dim Lgn A.`;
    if (level === 2) {
      parts[0].lines.unshift({
        kind: 'decision', prompt: 'Quelle formule donne dim Ker A ?', options: [
          { id: 'n', label: `n − r = ${n} − ${r}`, valid: true },
          { id: 'm', label: `m − r = ${m} − ${r}`, valid: false, rule: 'l_rank_dim_confusion', why: `Le noyau vit dans l'espace de départ ℝ${sup(n)} : n = ${n}, le nombre de colonnes. m − r est dim Ker Aᵀ.` },
          { id: 'r', label: `r = ${r}`, valid: false, why: 'r est la dimension de Col A et de Lgn A, pas celle du noyau.' },
        ],
      });
    }
  } else {
    const k = n - r;
    const M3 = level === 3;
    parts = [
      valPart({ ask: 'rang A =', html: 'Le rang', value: r, note: `n − dim Ker A = ${n} − ${k}`, wrong: m - k, ctx: { n, r }, menu: M3 ? menu('rang A = n − dim Ker A', { label: 'rang A = m − dim Ker A', rule: 'l_rank_dim_confusion', why: 'Le théorème du rang porte sur les colonnes : rang A + dim Ker A = n.' }) : null }),
      valPart({ ask: 'dim Ker Aᵀ =', html: 'dim Ker Aᵀ', value: m - r, note: `m − rang A = ${m} − ${r}`, menu: M3 ? menu('dim Ker Aᵀ = m − rang A', { label: 'dim Ker Aᵀ = dim Ker A', why: 'Aᵀ est de taille n × m : son noyau est dans ℝᵐ, sa dimension est m − r.' }) : null }),
      valPart({ ask: 'dim Lgn A =', html: 'dim Lgn A', value: r, note: 'rang des lignes = rang des colonnes', menu: M3 ? menu('dim Lgn A = rang A', { label: 'dim Lgn A = m', why: 'Les lignes peuvent être liées : la dimension est le rang.' }) : null }),
    ];
    prompt = `A est une matrice ${m} × ${n}, et dim Ker A = ${k}. Donne le rang de A, dim Ker Aᵀ et dim Lgn A.`;
  }
  const hints = [
    { level: 1, html: 'n est le nombre de colonnes, la dimension de départ : rang A + dim Ker A = n. Pour Aᵀ (n × m) : rang + dim Ker Aᵀ = m.' },
    { level: 2, html: guided ? `dim Ker A = □ − ${r}` : `rang A = ${n} − □` },
    { level: 3, html: guided ? `dim Ker A = ${n - r}` : `rang A = ${r}` },
  ];
  return partsItem({
    skill: RANK, level, prompt, mode: guided ? 'guided' : level === 3 ? 'tap' : 'free', tapActions: level === 3 ? 'menu' : null,
    hints, subgoals: RANK_SUB, key: `${RANK}:${m}x${n}:${r}:${level}`, keys: ['calc'],
  }, parts);
}

// T : V → W with V among Pₙ and M_{p×q}, W among ℝⁿ, Pₙ, M_{p×q}.
const VSPACES = [
  ...[2, 3, 4].map((k) => ({ label: `P${sub(k)}`, dim: k + 1, poly: k })),
  ...[[2, 2], [2, 3], [3, 2]].map(([a, b]) => ({ label: `M${sub(a)}ₓ${sub(b)}`, dim: a * b })),
  ...[2, 3, 4, 5].map((k) => ({ label: `ℝ${sup(k)}`, dim: k, rn: true })),
];
function rankMapItem(rng) {
  let V; let W;
  do { V = rng.pick(VSPACES.filter((x) => !x.rn)); W = rng.pick(VSPACES); } while (W.dim === V.dim);
  const r = rng.int(1, Math.min(V.dim, W.dim));
  const parts = [
    { judge: { kind: 'value', expect: String(V.dim) }, start: 'k', lines: [{ kind: 'eq', math: String(V.dim), note: V.poly ? `Base 1, t, …, t${sup(V.poly)} : ${V.dim} vecteurs` : 'Une coordonnée par case', subgoal: 'formula' }] },
    valPart({ ask: 'dim Ker T =', html: 'dim Ker T', value: V.dim - r, note: `dim V − dim Im T = ${V.dim} − ${r}`, wrong: W.dim - r, ctx: { n: V.dim, r } }),
  ];
  return partsItem({
    skill: RANK, level: 4,
    prompt: `T : ${V.label} → ${W.label} est linéaire et dim Im T = ${r}. Donne dim ${V.label}, puis dim Ker T.`,
    mode: 'free', hints: [
      { level: 1, html: 'dim Im T + dim Ker T = dim V, la dimension de l\'espace de <b>départ</b>.' },
      { level: 2, html: `dim Ker T = ${V.dim} − □` },
      { level: 3, html: `dim Ker T = ${V.dim - r}` },
    ],
    subgoals: RANK_SUB, key: `${RANK}:map:${V.label}:${W.label}:${r}`, keys: ['calc'],
  }, parts);
}

function rankExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'mcq') {
    const { m, n, r } = rankData(rng);
    const opt = (k, rule = null) => ({ html: String(k), rule });
    return mcqDistinct({
      skill: RANK, level: 4, key: `mcq:${m}x${n}:${r}`, exam: tag,
      prompt: `A est une matrice ${m} × ${n} et dim Col A = ${r}. Que vaut dim Ker Aᵀ ?`,
      right: String(m - r),
      wrongs: [opt(n - r, 'l_rank_dim_confusion'), opt(r), opt(m)],
      fillers: [opt(n), opt(m - r + 1), opt(Math.abs(m - n))],
      solution: [{ html: `Aᵀ est ${n} × ${m}, de rang ${r} : dim Ker Aᵀ = ${m} − ${r} = ${m - r}`, note: '' }],
    }, rng);
  }
  const which = rng.int(0, 3);
  if (which === 0) {
    const m = rng.int(6, 9);
    const n = rng.int(2, 5);
    return tfL({
      skill: RANK, key: `kerfull:${m}x${n}`, truth: true, exam: tag,
      statement: `Si A est une matrice ${m} × ${n} avec dim Ker A = ${n}, alors dim Im A = 0.`,
      explanation: `Vrai : dim Im A = ${n} − dim Ker A = 0 (A est la matrice nulle).`,
    });
  }
  if (which === 1) {
    return tfL({
      skill: RANK, key: 'ata', truth: true, exam: tag,
      statement: 'Pour toute matrice A, rang A = rang AᵀA.',
      explanation: 'Vrai : Ker AᵀA = Ker A (si AᵀAx = 0, alors ‖Ax‖² = xᵀAᵀAx = 0), et les deux matrices ont n colonnes.',
    });
  }
  if (which === 2) {
    const m = rng.int(2, 4);
    const n = m + rng.int(1, 3);
    return tfL({
      skill: RANK, key: `wide:${m}x${n}`, truth: true, exam: tag,
      statement: `Une matrice ${m} × ${n} a un noyau de dimension au moins ${n - m}.`,
      explanation: `Vrai : rang A ≤ ${m}, donc dim Ker A = ${n} − rang A ≥ ${n - m}.`,
    });
  }
  return tfL({
    skill: RANK, key: 'mr', truth: false, exam: tag, ruleIfTrue: 'l_rank_dim_confusion',
    statement: 'Pour toute matrice A de taille m × n et de rang r, dim Ker A = m − r.',
    counter: { kind: 'dims', params: { conds: ['m≠n'] }, ask: [{ v: 'm', label: 'm =' }, { v: 'n', label: 'n =' }, { v: 'r', label: 'r =' }], answer: { m: '2', n: '3', r: '1' } },
    explanation: 'Faux : dim Ker A = n − r. Avec m = 2, n = 3, r = 1 : dim Ker A = 2, mais m − r = 1.',
  });
}

// ======================================================================
// l-vs-coords
// ======================================================================

const COORD = 'l-vs-coords';
const COORD_SUB = [
  { id: 'reduce', label: 'réduire', skill: 'l-sys-rref' },
  { id: 'identify', label: 'identifier', skill: COORD },
];

// A basis B of ℝ³ or P₂ (columns of a unimodular matrix), coordinates c
// whole in [−6 ; 6], x = Bc.
function coordsData(rng, { sp = rng.pick(['R3', 'P2']), maxOps = 7 } = {}) {
  for (let t = 0; t < 200; t++) {
    const B = unimodular(3, rng, { max: 2 });
    const c = [rng.int(-6, 6), rng.int(-6, 6), rng.int(-6, 6)].map((x) => q(x));
    if (c.some((x) => x.n === 0) || c.every((x) => Math.abs(x.valueOf()) < 2)) continue;
    const x = MX.matVec(B, c);
    if (maxAbs([x]) > 12 || x.filter((xi, i) => !xi.eq(c[i])).length < 2) continue;
    const Bx = MX.matVec(B, x);
    if (eqV(Bx, c) || maxAbs([Bx]) > 30) continue;
    const Ax = B.map((r, i) => [...r, x[i]]);
    const red = MX.rref(Ax, { cols: 3 });
    if (red.ops.length < 2 || !niceOps(Ax, red.ops, maxOps, { whole: true })) continue;
    return { sp, B, c, x, Bx, Ax, ops: red.ops, bs: colsOf(B) };
  }
  const B = MX.mat([[1, 1, 0], [0, -1, 1], [0, 0, 1]]);
  const c = MX.mat([[6, -4, -1]])[0];
  const x = MX.matVec(B, c);
  const Ax = B.map((r, i) => [...r, x[i]]);
  return { sp: 'P2', B, c, x, Bx: MX.matVec(B, x), Ax, ops: MX.rref(Ax, { cols: 3 }).ops, bs: colsOf(B), fallback: true };
}
const xName = (d) => (d.sp === 'P2' ? 'p' : 'x');
const basisShow = (d) => `B = (${d.bs.map((b) => elShow(d.sp, b)).join(', ')})`;
const ord = (i) => ['1re', '2e', '3e'][i];

function coordsItem(level, rng) {
  if (level === 5 && rng.chance(0.5)) return coordsBack(rng);
  const d = coordsData(rng, { maxOps: level >= 4 ? 9 : 7 });
  const X = xName(d);
  const parts = [rrefPart(d.Ax, d.ops, level, rng, { bar: 3, subgoal: 'reduce' })];
  const cLine = { kind: 'eq', math: vt(d.c), note: `${X} = ${linText(d.c, ['b₁', 'b₂', 'b₃'])}`, subgoal: 'identify' };
  parts.push({
    judge: { kind: 'mat', expect: vt(d.c), wrong: { l_coords_canonical: [vt(d.x)], l_change_basis_direction: [vt(d.Bx)] } },
    start: `[${X}]_B = ?`, html: `Les coordonnées de ${X} dans B`, ask: `[${X}]_B =`,
    lines: [level === 1 ? withCells(cLine, [[0, 0], [1, 0], [2, 0]]) : cLine],
  });
  if (level === 2) {
    parts[0].lines.unshift({
      kind: 'decision', prompt: `Comment obtenir [${X}]_B ?`, options: [
        { id: 'solve', label: `Écrire ${X} = c₁b₁ + c₂b₂ + c₃b₃ : réduire [b₁ b₂ b₃ | ${X}]`, valid: true },
        { id: 'read', label: `Lire les coefficients de ${X}`, valid: false, rule: 'l_coords_canonical', why: `Les coefficients de ${X} sont ses coordonnées dans la base canonique, pas dans B.` },
      ],
    });
  }
  const hints = [
    { level: 1, html: `Écris ${X} comme combinaison des vecteurs de B : c'est le système de matrice augmentée [b₁ b₂ b₃ | ${X}]${d.sp === 'P2' ? ', coefficient par coefficient de 1, t, t²' : ''}.` },
    { level: 2, html: `[${X}]_B = (□ ; □ ; ${fq(d.c[2])})` },
    { level: 3, html: `[${X}]_B = ${MLv(d.c)}` },
  ];
  return partsItem({
    skill: COORD, level,
    prompt: `${basisShow(d)} est une base de ${SPACES[d.sp].label}. Trouve les coordonnées de ${X} = ${elShow(d.sp, d.x)} dans B : réduis [b₁ b₂ b₃ | ${X}]${d.sp === 'P2' ? ' (coefficients dans 1, t, t²)' : ''}${level === 3 ? ', en choisissant chaque opération' : ''}.`,
    mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', tapActions: level === 3 ? 'rowops' : null,
    hints, subgoals: COORD_SUB, key: `${COORD}:${mt(d.Ax)}`, fallback: d.fallback,
  }, parts);
}

// From [x]_B to x (série GM 14).
function coordsBack(rng) {
  const d = coordsData(rng);
  const X = xName(d);
  const comb = d.c.map((ci, j) => `${qt(ci)}·${vt(d.bs[j])}`).join('+').replace(/\+-/g, '-');
  return partsItem({
    skill: COORD, level: 5,
    prompt: `${basisShow(d)} est une base de ${SPACES[d.sp].label}, et [${X}]_B = ${MLv(d.c)}. Trouve ${X}${d.sp === 'P2' ? ' (ses coefficients dans 1, t, t²)' : ''}.`,
    mode: 'free', hints: [], subgoals: COORD_SUB, key: `${COORD}:back:${mt(d.Ax)}`, fallback: d.fallback,
  }, [{
    judge: { kind: 'mat', expect: vt(d.x) }, start: `${X} = ?`,
    lines: [{ kind: 'eq', math: comb, note: `${X} = c₁b₁ + c₂b₂ + c₃b₃`, subgoal: 'identify' }, { kind: 'eq', math: vt(d.x), note: d.sp === 'P2' ? `${X} = ${polyR(d.x)}` : '', subgoal: 'identify' }],
  }]);
}

function coordsExam(rng, exam) {
  const d = coordsData(rng);
  const X = xName(d);
  const tag = examTag({ exam });
  const q0 = `${basisShow(d)} est une base de ${SPACES[d.sp].label} et ${X} = ${elShow(d.sp, d.x)}.`;
  const sol = [{ html: `${X} = ${d.c.map((ci, j) => `(${fq(ci)})·${elShow(d.sp, d.bs[j])}`).join(' + ')}`, note: '' }, { html: `[${X}]_B = ${MLv(d.c)}`, note: '' }];
  if (exam === 'coef') {
    const i = rng.pick([0, 1, 2].filter((k) => !d.x[k].eq(d.c[k])));
    return coefItem({
      skill: COORD, level: 4, prompt: `${q0} Que vaut la ${ord(i)} coordonnée c${sub(i + 1)} de ${X} dans B ?`,
      label: `c_${i + 1}`, value: qt(d.c[i]), key: `${mt(d.Ax)}:${i}`, exam: tag, askCoef: { label: `c${sub(i + 1)}`, path: [i, 0] },
      traps: [{ rule: 'l_coords_canonical' }], solution: sol, fallback: d.fallback,
    });
  }
  if (exam === 'mcq') {
    return mcqDistinct({
      skill: COORD, level: 4, key: `mcq:${mt(d.Ax)}`, exam: tag,
      prompt: `${q0} Que vaut [${X}]_B ?`,
      right: MLv(d.c),
      wrongs: [{ html: MLv(d.x), rule: 'l_coords_canonical' }, { html: MLv(d.Bx), rule: 'l_change_basis_direction' }],
      fillers: [{ html: MLv(d.c.map((x, i) => (i === 0 ? x.neg() : x))) }, { html: MLv([d.c[1], d.c[0], d.c[2]]) }, { html: MLv(d.c.map((x, i) => (i === 2 ? x.neg() : x))) }],
      solution: sol,
    }, rng);
  }
  if (rng.chance(0.25)) {
    return tfL({
      skill: COORD, key: 'unique', truth: true, exam: tag,
      statement: 'Si B est une base de V, chaque vecteur de V a une seule suite de coordonnées dans B.',
      explanation: 'Vrai : si x = Σcᵢbᵢ = Σdᵢbᵢ, alors Σ(cᵢ − dᵢ)bᵢ = 0, et la famille est libre : cᵢ = dᵢ.',
    });
  }
  const i = rng.int(0, 2);
  const truth = rng.chance(0.5) || d.x[i].eq(d.c[i]);
  const claim = truth ? d.c[i] : d.x[i];
  return tfL({
    skill: COORD, key: `comp:${mt(d.Ax)}:${i}:${truth}`, truth, exam: tag, ...(truth ? {} : { ruleIfTrue: 'l_coords_canonical' }),
    statement: `${q0} La ${ord(i)} coordonnée de ${X} dans B vaut ${fq(claim)}.`,
    ...(truth ? {} : { counter: { kind: 'vecFamily', params: { want: 'coordsWitness', B: d.bs.map(vt), x: vt(d.x), i, claim: claim.valueOf() }, ask: [{ v: 'c', label: `[${X}]_B =` }], answer: { c: vt(d.c) } } }),
    explanation: `${truth ? 'Vrai' : 'Faux'} : [${X}]_B = ${MLv(d.c)}${truth ? '' : `. ${fq(claim)} est la coordonnée dans la base canonique`}.`,
  });
}

export const GEN = {
  [SUBSP]: (level, rng, profile, opts = {}) => (opts.exam ? subspaceExam(rng, opts.exam) : subspaceItem(level, rng)),
  [KER]: (level, rng, profile, opts = {}) => (opts.exam ? kernelExam(rng, opts.exam) : kernelItem(level, rng)),
  [COL]: (level, rng, profile, opts = {}) => (opts.exam ? colRowExam(rng, opts.exam) : colRowItem(level, rng)),
  [BASIS]: (level, rng, profile, opts = {}) => (opts.exam ? basisExam(rng, opts.exam) : basisItem(level, rng)),
  [RANK]: (level, rng, profile, opts = {}) => (opts.exam ? rankExam(rng, opts.exam) : rankItem(level, rng)),
  [COORD]: (level, rng, profile, opts = {}) => (opts.exam ? coordsExam(rng, opts.exam) : coordsItem(level, rng)),
};
