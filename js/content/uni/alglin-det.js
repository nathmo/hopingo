// Generators of module L, section « det » (Lay 3: determinants), spec §8.3.
// Catalogue: docs/universite/L-M-algebre-lineaire.md, part L.
//
// Judges: `det` (cofactor expansions, lines « −4·det[[…]] »), `rowops` with
// track 'det' (« L2 ← L2 − 2L1 : 3·det[[…]] »), `value` (properties, areas)
// and `mat` (one unknown by Cramer). Levels: 1–2 guided (grid cells of a
// det line to fill: `cells`, or `blanks` on a line of numbers; decisions),
// 3 choose the action (menu `cofactor` below, `rowops`, or a menu written by
// the generator), 4 free, 5 alone. Every matrix is built from its answer:
// sparse lines inserted around a 2 × 2 core (cofactors), A = P·L·U
// (row operations). The traps read cfg.trapValues (js/cas/rules/l-det.js).

import * as MX from '../../cas/matrix.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { walk } from '../../cas/ast.js';
import { lit, div } from '../../cas/ast.js';
import {
  evalAst, envOf, isZeroScalar, parseExpr, applyRowOp, valueText, opText, Mx, simp, ONE, qn,
} from '../../cas/matexpr.js';
import { blankLine } from '../../judges/lines.js';
import { detsOf } from '../../judges/det.js';
import { mopts } from '../../judges/matcommon.js';
import { ACTIONS } from '../../judges/actions.js';
import { readWith, showWith } from '../../judges/index.js';
import {
  q, mt, ML, MLm, fq, qt, sub, opT, opR, pickCells, withCells, matLines, mcqDistinct, tfL, examTag,
} from './alglin-kit.js';

const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
const sgn = (i, j) => ((i + j) % 2 ? -1 : 1);
const sgnT = (i, j) => (sgn(i, j) > 0 ? '+' : '−');

// Entries are Q, or 'x' (the unknown of template (c)).
const ent = (e) => (e === 'x' ? 'x' : qt(e));
const mtx = (A) => `[${A.map((r) => `[${r.map(ent).join(',')}]`).join(',')}]`;
// A factor before det or a bracket: '' for 1, '-' for −1, '3·', '-1/2·'.
const pre = (k) => (k.eq(1) ? '' : k.eq(-1) ? '-' : `${qt(k)}·`);
// A number inside a product: (−3), 2, x.
const par = (e) => (e === 'x' ? 'x' : e.n < 0 || e.d !== 1 ? `(${qt(e)})` : qt(e));
// MathML of a line of the det judge, shown as written.
const MLd = (text, vars = []) => { const cfg = { kind: 'det', vars }; try { return showWith(cfg, readWith(cfg, text)); } catch { return text; } };
const minorOf = (A, i, j) => A.filter((_, r) => r !== i).map((r) => r.filter((_, c) => c !== j));

// A line of numbers with the sub-expressions written in `texts` left blank
// (blanks of a guided line read by the CAS).
function tpl(math, texts, opts = {}) {
  const node = parse(math, opts);
  const holes = [];
  for (const t of texts) {
    const want = toText(parse(t, opts));
    let found = null;
    walk(node, (n) => {
      if (found) return false;
      if (n.t !== 'paren' && !holes.includes(n) && toText(n) === want) { found = n; return false; }
      return true;
    });
    if (found) holes.push(found);
  }
  return holes.length ? blankLine(node, holes, opts) : { math };
}

// ======================================================================
// l-det-cofactor
// ======================================================================

const COF = 'l-det-cofactor';
const COF_SUB = [
  { id: 'expand', label: 'développer selon une ligne ou une colonne', skill: COF },
  { id: 'two', label: 'déterminant 2 × 2', skill: COF },
];

// An n × n matrix built around a 2 × 2 core: each step inserts a row (or a
// column) with a single non-zero entry c, whose minor is the matrix before.
// steps (outer first): {kind, i, j, c} in the matrix of that size.
// x: one entry of the core is the unknown x (det linear in x, root nice).
function cofData(n, rng, { x = false, zero = null, sparse = 0.25 } = {}) {
  for (let t = 0; t < 200; t++) {
    const isZero = zero ?? (!x && rng.chance(0.2));
    let core = [[nz(rng, -5, 9), rng.int(-5, 9)], [rng.int(-5, 9), nz(rng, -5, 9)]].map((r) => r.map((v) => q(v)));
    if (isZero) {
      const k = q(rng.pick([2, -1, 3, -2]));
      core[1] = core[0].map((v) => v.mul(k));
      if (core[1].some((v) => Math.abs(v.valueOf()) > 9)) continue;
    }
    let xPos = null;
    let root = null;
    if (x) {
      xPos = [rng.int(0, 1), rng.int(0, 1)];
      const [a, b] = xPos;
      const coef = core[1 - a][1 - b].mul(sgn(a, b));
      const rest = core[a][1 - b].mul(core[1 - a][b]).mul(-sgn(a, b));
      if (coef.n === 0 || rest.n === 0) continue;
      root = rest.neg().div(coef);
      if (root.d > 2 || Math.abs(root.valueOf()) > 12) continue;
      core = core.map((r, i) => r.map((v, j) => (i === a && j === b ? 'x' : v)));
    }
    let A = core;
    const steps = [];
    for (let k = 2; k < n; k++) {
      const kind = rng.pick(['row', 'col']);
      const i = rng.int(0, k);
      const j = rng.int(0, k);
      const c = q(nz(rng, -5, 9));
      const N = [];
      for (let r = 0; r <= k; r++) {
        const row = [];
        for (let s = 0; s <= k; s++) {
          if (r !== i && s !== j) row.push(A[r - (r > i)][s - (s > j)]);
          else if (r === i && s === j) row.push(c);
          else if (kind === 'row' ? r === i : s === j) row.push(q(0));
          else row.push(rng.chance(sparse) ? q(0) : q(rng.int(-5, 9)));
        }
        N.push(row);
      }
      steps.unshift({ kind, i, j, c });
      A = N;
    }
    // det = Π (−1)^(i+j)·c × det(core)
    const acc = steps.reduce((s, st) => s.mul(st.c).mul(sgn(st.i, st.j)), q(1));
    const coreDet = x ? null : MX.det(core);
    const det = x ? null : acc.mul(coreDet);
    if (!x && Math.abs(det.valueOf()) > 400) continue;
    if (!x && isZero !== (det.n === 0)) continue;
    // The sparse line is the one to see: no other line is as empty, except by chance.
    if (!x && n > 2 && !MX.det(A).eq(det)) continue;
    return { A, core, steps, acc, det, root, xPos, n };
  }
  const A = MX.mat([[2, 0, 1, 3], [0, 0, 4, 0], [1, -1, 2, 0], [3, 0, 5, 1]]);
  return {
    A, core: MX.mat([[2, 3], [3, 1]]), steps: [{ kind: 'row', i: 1, j: 2, c: q(4) }, { kind: 'col', i: 1, j: 1, c: q(-1) }],
    acc: q(4), det: q(-28), root: null, xPos: null, n: 4, fallback: true,
  };
}

// The minors along the steps: minors[k] is the matrix after k expansions.
function cofMinors(d) {
  const out = [d.A];
  for (const st of d.steps) out.push(minorOf(out.at(-1), st.i, st.j));
  return out;
}
const lineName = (st) => (st.kind === 'row' ? `la ligne ${st.i + 1}` : `la colonne ${st.j + 1}`);

// The reference lines. shown: (−1)^(i+j) written out (level 1).
function cofLines(d, { shown = false } = {}) {
  const minors = cofMinors(d);
  const lines = [];
  let acc = q(1);
  d.steps.forEach((st, k) => {
    const s = sgn(st.i, st.j);
    const next = acc.mul(st.c).mul(s);
    const math = shown
      ? `${pre(acc)}(-1)^(${st.i + 1}+${st.j + 1})·${par(st.c)}·det${mtx(minors[k + 1])}`
      : `${pre(next)}det${mtx(minors[k + 1])}`;
    lines.push({ kind: 'eq', math, subgoal: 'expand', note: `Développer selon ${lineName(st)} : signe ${sgnT(st.i, st.j)}, un seul terme`, step: st, minor: minors[k + 1] });
    acc = next;
  });
  const [[a, b], [c, e]] = d.core;
  const two = `${pre(acc)}(${par(a)}·${par(e)}-${par(b)}·${par(c)})`;
  lines.push({ kind: 'eq', math: two, subgoal: 'two', note: 'Un 2 × 2 : diagonale moins antidiagonale', two: [a, e, b, c] });
  if (!d.xPos) lines.push({ kind: 'eq', math: qt(d.det), note: 'Calculer' });
  return lines;
}

// The line with the most non-zero entries (a poor choice of expansion).
function fullestLine(A) {
  const n = A.length;
  let best = { kind: 'row', k: 0, nz: -1 };
  for (let k = 0; k < n; k++) {
    const r = A[k].filter((v) => v === 'x' || v.n !== 0).length;
    const c = A.filter((row) => row[k] === 'x' || row[k].n !== 0).length;
    if (r > best.nz) best = { kind: 'row', k, nz: r };
    if (c > best.nz) best = { kind: 'col', k, nz: c };
  }
  return best;
}

function cofItem(level, rng) {
  const x = level === 4 && rng.chance(0.35);
  const n = level === 5 ? 5 : level === 4 ? (x ? rng.pick([3, 4]) : 4) : rng.pick([3, 4, 4]);
  const d = cofData(n, rng, { x, sparse: level === 5 ? 0.4 : 0.25 });
  const vars = d.xPos ? ['x'] : [];
  const judge = d.xPos ? { kind: 'det', vars, target: 'factored' } : { kind: 'det', target: 'number' };
  const Atext = mtx(d.A);
  const start = `det${Atext}`;
  const lines = cofLines(d, { shown: level === 1 });
  const st0 = d.steps[0];
  const name0 = `A${sub(st0.i + 1)}${sub(st0.j + 1)}`;
  const hints = H(
    'Développe selon la ligne ou la colonne la plus creuse ; n\'oublie pas le signe du damier (−1)^(i+j).',
    `Selon ${lineName(st0)} : det A = □·${par(st0.c).replace(/-/g, '−')}·det ${name0}, où □ = (−1)^(${st0.i + 1}+${st0.j + 1}) et ${name0} est A sans la ligne ${st0.i + 1} ni la colonne ${st0.j + 1}.`,
    MLd(cofLines(d, { shown: true })[0].math, vars),
  );
  const key = `${COF}:${Atext}`;
  const script = [];
  if (level <= 2) {
    lines.forEach((l, k) => {
      if (level === 2 && l.step) {
        const st = l.step;
        if (k === 0) {
          const full = fullestLine(d.A);
          const opts = [{ id: 'sparse', label: `Selon ${lineName(st)} : un seul coefficient non nul`, valid: true, quality: 'good', ref: true }];
          if (full.nz > 1) {
            opts.push({
              id: 'full', label: `Selon la ${full.kind === 'row' ? 'ligne' : 'colonne'} ${full.k + 1} : ${full.nz} coefficients non nuls`, valid: true, quality: 'poor',
              why: `Juste, mais il faut alors calculer ${full.nz} mineurs au lieu d'un seul.`,
            });
          }
          script.push({ kind: 'decision', prompt: 'Selon quelle ligne ou quelle colonne développer ?', options: rng.shuffle(opts) });
        }
        const right = sgnT(st.i, st.j);
        script.push({
          kind: 'decision', prompt: `Quel signe porte la case (${st.i + 1}, ${st.j + 1}) ?`, options: rng.shuffle([
            { id: 'right', label: `(−1)^(${st.i + 1}+${st.j + 1}) = ${right}1`, valid: true },
            { id: 'wrong', label: `(−1)^(${st.i + 1}+${st.j + 1}) = ${right === '+' ? '−' : '+'}1`, valid: false, rule: 'l_cofactor_sign', why: `${st.i + 1} + ${st.j + 1} = ${st.i + st.j + 2} est ${(st.i + st.j) % 2 ? 'impair' : 'pair'} : le signe est ${right}. Le damier commence par + en haut à gauche.` },
          ]),
        });
      }
      if (l.minor) script.push(withCells(l, pickCells(l.minor, [...l.minor.keys()], level === 1 ? 2 : 3, rng)));
      else if (l.two) script.push({ ...l, ...tpl(l.math, level === 1 ? [qt(l.two[1]), qt(l.two[3])] : l.two.map(qt), { vars }) });
      else script.push(l);
    });
  } else script.push(...lines);
  if (d.xPos) {
    script.push(
      { kind: 'segment', html: 'Pour quelle valeur de x la matrice A n\'est-elle pas inversible (det A = 0) ?', ask: 'x =', start: { math: 'x' }, judge: { kind: 'value', expect: qt(d.root) } },
      { kind: 'eq', math: qt(d.root), note: 'Le facteur de degré 1 s\'annule', subgoal: 'two' },
    );
  }
  return matLines({
    skill: COF, level,
    prompt: d.xPos
      ? `Soit A = ${ML(Atext, { vars })}. Calcule det A en fonction de x, puis trouve x pour que det A = 0.`
      : level === 5
        ? `Calcule le déterminant de A = ${MLm(d.A)}.`
        : `Calcule det A par cofacteurs, pour A = ${MLm(d.A)}${level === 3 ? ' : choisis d\'abord le développement' : ''}.`,
    start, judge, mode: modeOf(level), script, hints, subgoals: COF_SUB, key, keys: ['mat', 'calc'],
    tapActions: level === 3 ? 'cofactor' : null, fallback: d.fallback,
  });
}

// The wrong values of the catalogue: signs all + (l_cofactor_sign), the
// first minor with a neighbouring column (l_minor_wrong).
function cofWrongs(d) {
  const st = d.steps[0];
  const plus = d.steps.reduce((s, x) => s.mul(x.c), q(1)).mul(MX.det(d.core));
  const n = d.A.length;
  const jj = st.j + 1 < n ? st.j + 1 : st.j - 1;
  const ii = st.i + 1 < n ? st.i + 1 : st.i - 1;
  const wrongMinor = st.kind === 'row' ? minorOf(d.A, st.i, jj) : minorOf(d.A, ii, st.j);
  const minor = st.c.mul(sgn(st.i, st.j)).mul(MX.det(wrongMinor));
  return { plus, minor };
}

function cofExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.int(0, 3);
    if (which < 3) {
      const st = [
        ['Une matrice carrée qui a une ligne nulle a un déterminant nul.', 'Vrai : en développant selon cette ligne, chaque terme contient un 0.'],
        ['Le déterminant d\'une matrice triangulaire est le produit de ses coefficients diagonaux.', 'Vrai : on développe selon la première colonne, puis on recommence dans le mineur, qui est encore triangulaire.'],
        ['Si deux lignes d\'une matrice carrée sont égales, son déterminant est nul.', 'Vrai : échanger ces deux lignes change le signe de det sans changer la matrice, donc det A = −det A = 0.'],
      ][which];
      return tfL({ skill: COF, key: `true:${which}`, truth: true, exam: examTag({ exam }), statement: st[0], explanation: st[1] });
    }
    const A = rng.pick([[[1, 2], [2, 4]], [[2, 3], [4, 6]], [[1, -1], [-2, 2]], [[3, 1], [6, 2]]]);
    return tfL({
      skill: COF, key: `zero-line:${mt(MX.mat(A))}`, truth: false, exam: examTag({ exam }),
      statement: 'Si det A = 0, alors A a une ligne nulle ou une colonne nulle.',
      counter: { kind: 'matOne', params: { want: 'singularNoZeroLine' }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(MX.mat(A)) } },
      explanation: `Faux : ${MLm(MX.mat(A))} a un déterminant nul (sa deuxième ligne est un multiple de la première), sans ligne ni colonne nulle.`,
    });
  }
  const d = cofData(rng.pick([3, 4]), rng, { zero: false });
  const w = cofWrongs(d);
  return mcqDistinct({
    skill: COF, level: 4, key: `mcq:${mt(d.A)}`, exam: examTag({ exam }),
    prompt: `Que vaut le déterminant de A = ${MLm(d.A)} ?`,
    right: fq(d.det),
    wrongs: [{ html: fq(w.plus), rule: 'l_cofactor_sign' }, { html: fq(w.minor), rule: 'l_minor_wrong' }, { html: '0', rule: null }],
    fillers: [{ html: fq(d.det.neg()) }, { html: fq(d.det.mul(2)) }, { html: fq(d.det.add(d.steps[0].c)) }],
    solution: cofLines(d).map((l) => ({ html: MLd(l.math), note: l.note || '' })),
  }, rng);
}

// Level 3: the menu computed from the student's line (its first det).
ACTIONS.cofactor = (prev, cfg) => {
  const d = detsOf(prev || {})[0];
  if (!d) return [];
  let m;
  try { m = evalAst(d.e, envOf(cfg), mopts(cfg)); } catch { return []; }
  if (m?.k !== 'm') return [];
  const A = m.rows;
  const n = A.length;
  if (n === 2) {
    return [
      { id: 'two', label: 'Calculer le 2 × 2 : ad − bc', valid: true },
      { id: 'two-plus', label: 'Calculer le 2 × 2 : ad + bc', valid: false, rule: 'l_cofactor_sign', why: 'Un déterminant 2 × 2 vaut « diagonale moins antidiagonale » : ad − bc.' },
    ];
  }
  const zero = (v) => isZeroScalar(v, mopts(cfg));
  let best = null;
  for (let k = 0; k < n; k++) {
    for (const kind of ['row', 'col']) {
      const cells = [...Array(n).keys()].map((t) => (kind === 'row' ? [k, t] : [t, k])).filter(([i, j]) => !zero(A[i][j]));
      if (cells.length && (!best || cells.length < best.cells.length)) best = { kind, k, cells };
    }
  }
  if (!best) return [];
  const [i, j] = best.cells[0];
  const where = `${best.kind === 'row' ? 'la ligne' : 'la colonne'} ${best.k + 1}`;
  const s = sgnT(i, j);
  const bad = s === '+' ? '−' : '+';
  const nb = best.kind === 'row' ? [i, j + 1 < n ? j + 1 : j - 1] : [i + 1 < n ? i + 1 : i - 1, j];
  const nm = (a, b) => `A${sub(a + 1)}${sub(b + 1)}`;
  return [
    { id: 'ok', label: `Selon ${where} : signe ${s}, mineur ${nm(i, j)}`, valid: true },
    { id: 'sign', label: `Selon ${where} : signe ${bad}, mineur ${nm(i, j)}`, valid: false, rule: 'l_cofactor_sign', why: `La case (${i + 1}, ${j + 1}) porte le signe (−1)^(${i + 1}+${j + 1}) = ${s}1.` },
    { id: 'minor', label: `Selon ${where} : signe ${s}, mineur ${nm(...nb)}`, valid: false, rule: 'l_minor_wrong', why: `Le mineur de la case (${i + 1}, ${j + 1}) s'obtient en barrant la ligne ${i + 1} et la colonne ${j + 1}.` },
  ].sort((a, b) => a.label.localeCompare(b.label));
};

// ======================================================================
// l-det-rowops
// ======================================================================

const RO = 'l-det-rowops';
const RO_SUB = [
  { id: 'echelon', label: 'échelonner', skill: 'l-sys-echelon' },
  { id: 'factor', label: 'suivre le facteur devant det', skill: RO },
];
const RO_TRACK = { kind: 'rowops', track: 'det' };
// MathML of a line of the track-det judge.
const MLr = (text, cfg = RO_TRACK) => { try { return showWith(cfg, readWith(cfg, text)); } catch { return text; } };
const maxAbs = (A) => Math.max(...A.flat().map((x) => Math.abs(x.valueOf())));

// A = P·L·U, L unit lower (ℓ in [−2 ; 2]), U upper (diagonal in {±1, ±2, 3}):
// the elimination has whole multipliers. swap: ℓ(c+1, c) = 0 and rows c, c+1
// exchanged, so that a pivot is 0 on the way. half: row 1 doubled after the
// pivot ±1, to « sortir le facteur 2 » first (a₂₁ odd).
function roData(n, rng, { swap = false, half = false } = {}) {
  for (let t = 0; t < 300; t++) {
    const U = MX.zeros(n, n);
    const L = MX.identity(n);
    for (let i = 0; i < n; i++) {
      U[i][i] = q(rng.pick([1, -1, 2, -2, 3]));
      for (let j = i + 1; j < n; j++) U[i][j] = q(rng.int(-3, 3));
      for (let j = 0; j < i; j++) L[i][j] = q(rng.int(-2, 2));
    }
    if (half) U[0][0] = q(rng.pick([1, -1]));
    const c = swap ? rng.int(0, n - 2) : null;
    if (swap) L[c + 1][c] = q(0);
    let A = MX.mul(L, U);
    if (swap) A = MX.applyOp(A, { kind: 'swap', i: c, j: c + 1 });
    const pre = [];
    if (half) {
      A = A.map((r, i) => (i === 0 ? r.map((x) => x.mul(2)) : r));
      pre.push({ kind: 'scale', i: 0, k: q(1, 2) });
      if (A[1][0].d !== 1 || A[1][0].n % 2 === 0) continue;
    }
    const e = MX.echelon(pre.length ? MX.applyOps(A, pre) : A);
    const swaps = e.ops.filter((op) => op.kind === 'swap').length;
    if (swaps !== (swap ? 1 : 0)) continue;
    if (e.ops.some((op) => op.kind === 'add' && op.k.d !== 1)) continue;
    const adds = e.ops.filter((op) => op.kind === 'add').length;
    if (adds < n - 1 || adds > n + 2) continue;
    if (maxAbs(A) > 12 || A.every((r) => r.every((x) => x.n !== 0)) === false && maxAbs(A) < 2) continue;
    const ops = [...pre, ...e.ops];
    const mats = [];
    let M = A;
    for (const op of ops) { M = MX.applyOp(M, op); mats.push(M); }
    if (mats.some((X) => maxAbs(X) > 20)) continue;
    if (MX.isUpper(A)) continue;
    return { A, ops, det: MX.det(A), E: M };
  }
  const A = MX.mat([[1, 2, -1, 0], [2, 5, -1, 1], [-1, -2, 3, 2], [3, 6, -3, 1]]);
  const e = MX.echelon(A);
  return { A, ops: e.ops, det: MX.det(A), E: e.E, fallback: true };
}

const factorText = (f) => (f.eq(1) ? '' : f.eq(-1) ? '−' : `${fq(f)}·`);
// The reference lines « op : f·det[[…]] », then det A.
function roLines(d) {
  let M = d.A;
  let f = q(1);
  const lines = d.ops.map((op) => {
    M = MX.applyOp(M, op);
    f = f.div(MX.detFactor(op));
    const note = op.kind === 'swap' ? 'Un échange : det change de signe'
      : op.kind === 'scale' ? `Sortir le facteur ${fq(q(1).div(op.k))} de la ligne ${op.i + 1}`
        : 'Lᵢ ← Lᵢ + kLⱼ : det inchangé';
    return { kind: 'eq', math: `${opT(op)} : ${pre(f)}det${mt(M)}`, op, result: M, factor: f, subgoal: op.kind === 'add' ? 'echelon' : 'factor', note };
  });
  const diagT = M.map((r, i) => par(r[i])).join('·');
  lines.push({ kind: 'eq', math: qt(d.det), subgoal: 'factor', note: `Produit de la diagonale : ${factorText(f)}${diagT.replace(/-/g, '−')} = ${fq(d.det)}` });
  return lines;
}

// ---------- with a parameter (a, λ): A = L·U, U's diagonal in ℚ[a] ----------

// c0 + c1·v as text: 2a-3, -a, 5.
function lin(c0, c1, v) {
  if (c1 === 0) return String(c0);
  const head = c1 === 1 ? v : c1 === -1 ? `-${v}` : `${c1}${v}`;
  return c0 === 0 ? head : `${head}${c0 > 0 ? '+' : '-'}${Math.abs(c0)}`;
}
// (v − r) as text, in a product: (a-1), (a+2), a.
const vfac = (v, r) => (r === 0 ? v : `(${v}${r > 0 ? '-' : '+'}${Math.abs(r)})`);
// C·Π(v − r)^m.
function factoredText(C, roots, v) {
  const m = new Map();
  for (const r of roots) m.set(r, (m.get(r) || 0) + 1);
  const fs = [...m.entries()].sort((x, y) => x[0] - y[0]).map(([r, k]) => {
    const f = vfac(v, r);
    if (k === 1) return f;
    return `${f.startsWith('(') ? f : `(${f})`}^${k}`;
  });
  const lead = C === 1 ? '' : C === -1 ? '-' : `${C}`;
  return `${lead}${fs.join('')}` || String(C);
}

function roParamData(n, rng, v, { two = false } = {}) {
  for (let t = 0; t < 300; t++) {
    const k = n === 3 && !two ? rng.pick([1, 2, 2]) : 2;
    const pos = rng.shuffle([...Array(n).keys()]).slice(0, k);
    const U = Array.from({ length: n }, () => Array.from({ length: n }, () => [0, 0]));
    const L = MX.identity(n).map((r) => r.map((x) => x.valueOf()));
    let C = 1;
    const roots = [];
    for (let i = 0; i < n; i++) {
      if (pos.includes(i)) {
        const r = rng.int(-3, 4);
        const s = rng.pick([1, -1]);
        U[i][i] = [-s * r, s];
        roots.push(r);
        C *= s;
      } else {
        const dgn = rng.pick([1, -1, 2, 1]);
        U[i][i] = [dgn, 0];
        C *= dgn;
      }
      for (let j = i + 1; j < n; j++) U[i][j] = [rng.int(-2, 2), 0];
      for (let j = 0; j < i; j++) L[i][j] = rng.int(-2, 2);
    }
    if (two && new Set(roots).size < 2) continue;
    if (L.flat().filter((x, idx) => x !== 0 && Math.floor(idx / n) !== idx % n).length < n - 1) continue;
    // A = L·U, entries c0 + c1·v.
    const A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => {
      let c0 = 0; let c1 = 0;
      for (let p = 0; p < n; p++) { c0 += L[i][p] * U[p][j][0]; c1 += L[i][p] * U[p][j][1]; }
      return [c0, c1];
    }));
    if (A.flat().some(([c0, c1]) => Math.abs(c0) > 9 || Math.abs(c1) > 3)) continue;
    if (A[0][0][1] !== 0 && pos[0] !== 0) continue;
    const ops = [];
    for (let c = 0; c < n - 1; c++) for (let i = c + 1; i < n; i++) if (L[i][c]) ops.push({ kind: 'add', i, j: c, k: q(-L[i][c]) });
    if (ops.length < n - 1) continue;
    const text = `[${A.map((r) => `[${r.map(([c0, c1]) => lin(c0, c1, v)).join(',')}]`).join(',')}]`;
    return { text, ops, C, roots, v, n, final: factoredText(C, roots, v) };
  }
  const text = `[[1,1,1],[1,${v},1],[1,1,${v}]]`;
  return { text, ops: [{ kind: 'add', i: 1, j: 0, k: q(-1) }, { kind: 'add', i: 2, j: 0, k: q(-1) }], C: 1, roots: [1, 1], v, n: 3, final: `(${v}-1)^2`, fallback: true };
}

// The lines of a reduction on node matrices (parameters): « op : f·det[[…]] ».
function nodeLines(text, ops, v, factors = []) {
  const opts = { vars: [v] };
  let rows = evalAst(parseExpr(text, opts), {}, opts).rows;
  return ops.map((op, k) => {
    rows = applyRowOp(rows, op);
    const f = factors[k] ?? '';
    return { kind: 'eq', math: `${opText(op)} : ${f}det${valueText(Mx(rows))}`, op, subgoal: op.kind === 'add' ? 'echelon' : 'factor', note: op.kind === 'add' ? 'Lᵢ ← Lᵢ + kLⱼ : det inchangé' : 'Sortir le facteur de la ligne' };
  });
}

// Vandermonde [[1, a, a²], [1, b, b²], [1, c, c²]] = (b − a)(c − a)(c − b).
function vandermonde(rng, v) {
  const [b, c] = rng.shuffle([-2, -1, 1, 2, 3, 4]).slice(0, 2).sort((x, y) => x - y);
  const text = `[[1,${v},${v}^2],[1,${b},${b * b}],[1,${c},${c * c}]]`;
  const opts = { vars: [v] };
  const P = (t) => parse(t, opts);
  const bv = `(${b}-${v})`.replace('(0-', '(-');
  const cv = `(${c}-${v})`.replace('(0-', '(-');
  const two = [{ kind: 'add', i: 1, j: 0, k: qn(-1) }, { kind: 'add', i: 2, j: 0, k: qn(-1) }];
  let rows = evalAst(parseExpr(text, opts), {}, opts).rows;
  rows = two.reduce((r, op) => applyRowOp(r, op), rows);
  const l1 = { kind: 'eq', math: `${two.map(opText).join(' ; ')} : det${valueText(Mx(rows))}`, subgoal: 'echelon', note: 'Lᵢ ← Lᵢ − L₁ : det inchangé' };
  const s2 = { kind: 'scale', i: 1, k: simp(div(ONE, P(bv))) };
  rows = applyRowOp(rows, s2);
  const l2 = { kind: 'eq', math: `L2 ← (1/${bv})L2 : ${bv}·det${valueText(Mx(rows))}`, subgoal: 'factor', note: `Sortir le facteur ${bv.slice(1, -1).replace(/-/g, ' − ')} de la ligne 2` };
  const s3 = { kind: 'scale', i: 2, k: simp(div(ONE, P(cv))) };
  rows = applyRowOp(rows, s3);
  const l3 = { kind: 'eq', math: `L3 ← (1/${cv})L3 : (${bv}${cv})·det${valueText(Mx(rows))}`, subgoal: 'factor', note: `Sortir le facteur ${cv.slice(1, -1).replace(/-/g, ' − ')} de la ligne 3` };
  const s4 = { kind: 'add', i: 2, j: 1, k: qn(-1) };
  rows = applyRowOp(rows, s4);
  const l4 = { kind: 'eq', math: `${opText(s4)} : (${bv}${cv})·det${valueText(Mx(rows))}`, subgoal: 'echelon', note: 'Échelonnée' };
  const final = `${c - b === 1 ? '' : c - b}${bv}${cv}`;
  const l5 = { kind: 'eq', math: final, subgoal: 'factor', note: 'Produit de la diagonale, déjà factorisé' };
  return { text, lines: [l1, l2, l3, l4, l5], final, roots: [b, c], v, vander: true };
}

const roHints = (lines, cfg = RO_TRACK) => {
  const tri = lines.at(-2);
  return H(
    'Seuls les échanges (det change de signe) et les multiplications de ligne (det multiplié par k) changent det ; Lᵢ ← Lᵢ + kLⱼ le garde. Échelonne, puis multiplie la diagonale.',
    `À la fin : det A = □·det(triangulaire), avec ${MLr(tri.math.slice(tri.math.indexOf('det[')), cfg)} ; □ tient compte des échanges et des facteurs sortis.`,
    MLr(lines[0].math, cfg),
  );
};
const roSolution = (start, lines, cfg) => [
  { html: MLr(start, cfg), note: 'Départ' },
  ...lines.map((l) => ({ html: `<span class="eq">→</span> ${MLr(l.math, cfg)}`, note: l.note || '' })),
];

function roItem(level, rng) {
  // Levels 4 and 5 with a parameter.
  const kind = level === 5 ? 'lambda' : level === 4 ? rng.pick(['num', 'num', 'param', 'vander']) : 'num';
  if (kind !== 'num') return roParamItem(level, rng, kind);
  const n = level === 4 ? 4 : 3;
  const d = roData(n, rng, { swap: level === 1 ? rng.chance(0.5) : level === 2 ? false : rng.chance(0.5), half: level === 2 });
  const start = `det${mt(d.A)}`;
  const lines = roLines(d);
  const key = `${RO}:${mt(d.A)}`;
  const script = [];
  if (level <= 2) {
    lines.forEach((l, k) => {
      if (level === 2 && k === 0) {
        const p = d.A[0][0];
        const a21 = d.A[1][0];
        const combo = { kind: 'combo', i: 1, c: q(2), j: 0, k: a21.mul(-2).div(p) };
        const one = d.A.findIndex((r, i) => i > 0 && Math.abs(r[0].valueOf()) === 1);
        const opts = [
          { id: 'factor', label: `Sortir le facteur 2 de la ligne 1 : ${opR(l.op)}, et det A = 2·det(…)`, valid: true, quality: 'good', ref: true },
          { id: 'combo', label: `${opR(combo)} pour garder des entiers`, valid: true, quality: 'poor', why: `Juste à condition de corriger : ${opR(combo)} multiplie det par 2, donc det A = (1/2)·det(nouvelle matrice).` },
        ];
        if (one > 0) opts.push({ id: 'swap', label: `L₁ ↔ L${sub(one + 1)} pour avoir un pivot ±1, det inchangé`, valid: false, rule: 'l_det_swap_sign', why: 'Un échange de lignes change le signe de det : det A = −det(nouvelle matrice).' });
        script.push({ kind: 'decision', prompt: `Le pivot vaut ${fq(p)} et toute la ligne 1 est paire. Comment continuer ?`, options: rng.shuffle(opts) });
      }
      if (level === 1 && l.op?.kind === 'swap') {
        script.push({
          kind: 'decision', prompt: `Le pivot de la colonne ${l.op.i + 1} est nul : on fait ${opR(l.op)}. Que devient le facteur devant det ?`, options: rng.shuffle([
            { id: 'neg', label: 'Il change de signe', valid: true },
            { id: 'same', label: 'Il ne change pas', valid: false, rule: 'l_det_swap_sign', why: 'Échanger deux lignes change le signe du déterminant.' },
          ]),
        });
      }
      if (level === 1 && k === 0 && l.op?.kind === 'add') {
        script.push({
          kind: 'decision', prompt: `On fait ${opR(l.op)}. Que devient det ?`, options: rng.shuffle([
            { id: 'same', label: 'Il ne change pas', valid: true },
            { id: 'mul', label: `Il est multiplié par ${fq(l.op.k)}`, valid: false, why: 'Ajouter à une ligne un multiple d\'une autre ne change pas det : seule la ligne qui change est multipliée par 1.' },
          ]),
        });
      }
      script.push(l.op ? withCells(l, pickCells(l.result, [l.op.i, ...(l.op.kind === 'swap' ? [l.op.j] : [])], level === 1 ? 2 : 3, rng)) : l);
    });
  } else script.push(...lines);
  return matLines({
    skill: RO, level,
    prompt: `Calcule det A par opérations sur les lignes, pour A = ${MLm(d.A)}${level === 3 ? ' : choisis chaque opération, puis écris le facteur et la matrice' : ''}. Chaque ligne s'écrit « opération : facteur·det[[…]] ».`,
    start, judge: { ...RO_TRACK }, mode: modeOf(level), script, hints: roHints(lines), subgoals: RO_SUB, key, keys: ['mat', 'calc'],
    tapActions: level === 3 ? 'rowops' : null, fallback: d.fallback, solution: roSolution(start, lines, RO_TRACK),
  });
}

function roParamItem(level, rng, kind) {
  const v = kind === 'lambda' ? 'λ' : 'a';
  const cfg = { kind: 'rowops', track: 'det', vars: [v], factored: true };
  let text;
  let lines;
  let roots;
  let fallback = false;
  if (kind === 'vander') ({ text, lines, roots } = vandermonde(rng, v));
  else {
    const d = roParamData(kind === 'lambda' ? 4 : 3, rng, v);
    ({ text, roots, fallback } = d);
    lines = [...nodeLines(text, d.ops.map((op) => ({ ...op, k: lit(op.k) })), v), { kind: 'eq', math: d.final, subgoal: 'factor', note: 'Produit de la diagonale, factorisé' }];
  }
  const start = `det${text}`;
  const final = lines.at(-1).math;
  const uniq = [...new Set(roots)].sort((x, y) => x - y);
  const script = [...lines];
  if (kind === 'lambda') {
    const sol = uniq.map((r) => `${v}=${r}`).join(' ou ');
    script.push(
      { kind: 'segment', html: `A n'est pas inversible exactement quand det A = 0. Pour quelles valeurs de ${v} ?`, start: { math: `${final}=0` }, judge: { kind: 'solset', v } },
      { kind: 'eq', math: sol, subgoal: 'factor', note: `A est inversible si et seulement si ${v} ∉ {${uniq.join(' ; ')}}` },
    );
  }
  return matLines({
    skill: RO, level,
    prompt: kind === 'lambda'
      ? `Soit A = ${ML(text, { vars: [v] })}. Calcule det A par opérations sur les lignes (factorisé), puis trouve les valeurs de ${v} pour lesquelles A n'est pas inversible.`
      : `Calcule det A par opérations sur les lignes, pour A = ${ML(text, { vars: [v] })}, et donne-le factorisé. Chaque ligne s'écrit « opération : facteur·det[[…]] ».`,
    start, judge: cfg, mode: 'free', script, hints: roHints(lines, cfg), subgoals: RO_SUB, key: `${RO}:${text}`, keys: ['mat', 'calc'],
    fallback, solution: kind === 'lambda' ? undefined : roSolution(start, lines, cfg),
  });
}

function roExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.int(0, 4);
    if (which < 3) {
      const st = [
        ['Ajouter à une ligne de A un multiple d\'une autre ligne ne change pas det A.', 'Vrai : c\'est la seule opération sur les lignes qui garde det.'],
        ['Si deux colonnes de A sont égales, alors det A = 0.', 'Vrai : det A = det Aᵀ, et Aᵀ a deux lignes égales.'],
        ['Multiplier une ligne de A par 3 multiplie det A par 3.', 'Vrai : det est linéaire par rapport à chaque ligne.'],
      ][which];
      return tfL({ skill: RO, key: `true:${which}`, truth: true, exam: examTag({ exam }), statement: st[0], explanation: st[1] });
    }
    const A = rng.pick([[[1, 0], [0, 1]], [[2, 1], [1, 1]], [[1, 2], [0, 3]], [[3, 1], [2, 1]]]);
    const swapT = which === 3;
    return tfL({
      skill: RO, key: `${swapT ? 'swap' : 'combo'}:${mt(MX.mat(A))}`, truth: false, exam: examTag({ exam }),
      statement: swapT ? 'Échanger deux lignes de A ne change pas det A.' : 'L\'opération L₂ ← 2L₂ − L₁ ne change pas det A.',
      ruleIfTrue: swapT ? 'l_det_swap_sign' : 'l_det_rowop_combo',
      counter: { kind: 'matOne', params: { want: 'detNonZero', n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(MX.mat(A)) } },
      explanation: swapT
        ? `Faux : un échange change le signe de det. Pour A = ${MLm(MX.mat(A))}, det A = ${fq(MX.det(MX.mat(A)))} ≠ 0, et après l'échange det vaut ${fq(MX.det(MX.mat(A)).neg())}.`
        : `Faux : L₂ ← 2L₂ − L₁ multiplie det par 2. Pour A = ${MLm(MX.mat(A))}, det A = ${fq(MX.det(MX.mat(A)))} ≠ 0 devient ${fq(MX.det(MX.mat(A)).mul(2))}.`,
    });
  }
  if (rng.chance(0.35)) {
    const d = roParamData(3, rng, 'a', { two: true });
    const uniq = [...new Set(d.roots)].sort((x, y) => x - y);
    const set = (rs) => `a ∉ {${rs.map((r) => fq(q(r))).join(' ; ')}}`;
    return mcqDistinct({
      skill: RO, level: 4, key: `mcq:${d.text}`, exam: examTag({ exam }),
      prompt: `Soit A = ${ML(d.text, { vars: ['a'] })}. Pour quelles valeurs de a la matrice A est-elle inversible ?`,
      right: set(uniq),
      wrongs: [{ html: set(uniq.map((r) => -r).sort((x, y) => x - y)), rule: null }, { html: `a ∈ {${uniq.map((r) => fq(q(r))).join(' ; ')}}`, rule: null }, { html: set([uniq[0]]), rule: null }],
      fillers: [{ html: set(uniq.map((r) => r + 1)) }, { html: 'pour tout a ∈ ℝ' }],
      solution: [{ html: `det A = ${ML(d.final, { vars: ['a'] })}`, note: 'Échelonner : le facteur reste 1' }],
    }, rng);
  }
  const d = roData(rng.pick([3, 4]), rng, { swap: rng.chance(0.6), half: rng.chance(0.5) });
  const swaps = d.ops.some((op) => op.kind === 'swap');
  const half = d.ops.some((op) => op.kind === 'scale');
  return mcqDistinct({
    skill: RO, level: 4, key: `mcq:${mt(d.A)}`, exam: examTag({ exam }),
    prompt: `Que vaut le déterminant de A = ${MLm(d.A)} ?`,
    right: fq(d.det),
    wrongs: [
      swaps ? { html: fq(d.det.neg()), rule: 'l_det_swap_sign' } : null,
      half ? { html: fq(d.det.div(2)), rule: 'l_det_scale_row' } : null,
      { html: fq(d.det.mul(2)), rule: 'l_det_rowop_combo' },
    ].filter(Boolean),
    fillers: [{ html: fq(d.det.neg()) }, { html: fq(d.det.add(1)) }, { html: fq(d.det.sub(2)) }, { html: '0' }],
    solution: roLines(d).map((l) => ({ html: MLr(l.math), note: l.note || '' })),
  }, rng);
}

// ======================================================================

export const GEN = {
  [COF]: (level, rng, profile, opts = {}) => (opts.exam ? cofExam(rng, opts.exam) : cofItem(level, rng)),
  [RO]: (level, rng, profile, opts = {}) => (opts.exam ? roExam(rng, opts.exam) : roItem(level, rng)),
};
