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
function niceOps(A, ops, maxOps) {
  if (ops.length > maxOps) return false;
  let M = A;
  for (const op of ops) {
    if ((op.k && op.k.d > 2) || (op.c && op.c.d > 2)) return false;
    M = MX.applyOp(M, op);
    if (M.flat().some((x) => x.d > 2 || Math.abs(x.valueOf()) > 15)) return false;
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

export const GEN = {
  [SUBSP]: (level, rng, profile, opts = {}) => (opts.exam ? subspaceExam(rng, opts.exam) : subspaceItem(level, rng)),
  [KER]: (level, rng, profile, opts = {}) => (opts.exam ? kernelExam(rng, opts.exam) : kernelItem(level, rng)),
  [COL]: (level, rng, profile, opts = {}) => (opts.exam ? colRowExam(rng, opts.exam) : colRowItem(level, rng)),
};
