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
import { blankLine, templateOf } from '../../judges/lines.js';
import { linesItem, MT } from './kit.js';
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
// l-det-props
// ======================================================================

const PROPS = 'l-det-props';
const PROPS_SUB = [{ id: 'rule', label: 'appliquer les règles du déterminant', skill: PROPS }];
const sup = (n) => String(n).split('').map((d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d] ?? (d === '-' ? '⁻' : d)).join('');
const kT = (k) => (k.d !== 1 || k.n < 0 ? `(${qt(k)})` : qt(k));
// The scalar in an expression shown: 2A, −2A, (1/2)A.
const kH = (k) => (k.d !== 1 ? `(${fq(k)})` : fq(k));
// The rules, as the decisions and the menu name them.
const R = {
  scalar: { label: 'det(kM) = kⁿ·det M', valid: true },
  scalarBad: { label: 'det(kM) = k·det M', valid: false, rule: 'l_det_scalar', why: 'kM multiplie chacune des n lignes par k : det(kM) = kⁿ·det M.' },
  product: { label: 'det(MN) = det M·det N', valid: true },
  sum: { label: 'det(M + N) = det M + det N', valid: false, rule: 'l_det_sum', why: 'Le déterminant n\'est pas additif : det(I₂ + I₂) = 4, pas 2.' },
  transpose: { label: 'det(Mᵀ) = det M', valid: true },
  transposeBad: { label: 'det(Mᵀ) = −det M', valid: false, rule: 'l_det_transpose_sign', why: 'Transposer ne change pas le déterminant : det(Iᵀ) = 1.' },
  inverse: { label: 'det(M⁻¹) = 1/det M', valid: true },
  inverseBad: { label: 'det(M⁻¹) = −det M', valid: false, why: 'M·M⁻¹ = I donne det M·det(M⁻¹) = 1 : det(M⁻¹) = 1/det M.' },
  power: { label: 'det(Mᵐ) = (det M)ᵐ', valid: true },
};

// The table of forms: expression (HTML), the line that applies the rules
// (CAS text), its value, the wrong values of the traps, the rules used.
// n: size; a = det A, b = det B; k a scalar.
const FORMS = [
  {
    id: 'scalar', needB: false,
    html: ({ k }) => `det(${kH(k)}A)`,
    line: ({ n, a, k }) => `${kT(k)}^${n}·${par(a)}`,
    value: ({ n, a, k }) => k.pow(n).mul(a),
    wrongs: ({ n, a, k }) => [{ rule: 'l_det_scalar', value: k.mul(a), ctx: { k: fq(k), n, p: fq(k.pow(n)) } }],
    rules: ['scalar'], bad: ['scalarBad', 'sum', 'transposeBad'],
  },
  {
    id: 'kAtBinv', needB: true,
    html: ({ k }) => `det(${kH(k)}AᵀB⁻¹)`,
    line: ({ n, a, b, k }) => `${kT(k)}^${n}·${par(a)}·(1/${par(b)})`,
    value: ({ n, a, b, k }) => k.pow(n).mul(a).div(b),
    wrongs: ({ n, a, b, k }) => [
      { rule: 'l_det_scalar', value: k.mul(a).div(b), ctx: { k: fq(k), n, p: fq(k.pow(n)) } },
      { rule: 'l_det_transpose_sign', value: k.pow(n).mul(a).div(b).neg() },
    ],
    rules: ['scalar', 'product', 'transpose', 'inverse'], bad: ['scalarBad', 'transposeBad', 'inverseBad'],
  },
  {
    id: 'invScalar', needB: false,
    html: ({ k }) => `det((${kH(k)}A)⁻¹)`,
    line: ({ n, a, k }) => `1/(${kT(k)}^${n}·${par(a)})`,
    value: ({ n, a, k }) => q(1).div(k.pow(n).mul(a)),
    wrongs: ({ a, k, n }) => [{ rule: 'l_det_scalar', value: q(1).div(k.mul(a)), ctx: { k: fq(k), n, p: fq(k.pow(n)) } }],
    rules: ['inverse', 'scalar'], bad: ['scalarBad', 'inverseBad'],
  },
  {
    id: 'power', needB: true,
    html: ({ m }) => `det(A${sup(m)}Bᵀ)`,
    line: ({ a, b, m }) => `${par(a)}^${m}·${par(b)}`,
    value: ({ a, b, m }) => a.pow(m).mul(b),
    wrongs: ({ a, b, m }) => [{ rule: 'l_det_transpose_sign', value: a.pow(m).mul(b).neg() }],
    rules: ['power', 'product', 'transpose'], bad: ['transposeBad', 'sum'],
  },
  {
    id: 'twice', needB: false,
    html: () => 'det(A + A)',
    line: ({ n, a }) => `2^${n}·${par(a)}`,
    value: ({ n, a }) => q(2).pow(n).mul(a),
    wrongs: ({ a, n }) => [{ rule: 'l_det_sum', value: a.mul(2), ctx: { why: `Ici A + A = 2A, et det(2A) = 2${sup(n)}·det A.` } }, { rule: 'l_det_scalar', value: a.mul(2), ctx: { k: 2, n, p: 2 ** n } }],
    rules: ['scalar'], bad: ['sum', 'scalarBad'],
  },
  {
    id: 'q19', needB: false,
    html: () => 'det((A + I)² − (A − I)²)',
    note: '(A + I)² − (A − I)² = A² + 2A + I − (A² − 2A + I) = 4A',
    line: ({ n, a }) => `4^${n}·${par(a)}`,
    value: ({ n, a }) => q(4).pow(n).mul(a),
    wrongs: ({ a, n }) => [{ rule: 'l_det_scalar', value: a.mul(4), ctx: { k: 4, n, p: 4 ** n } }],
    rules: ['scalar'], bad: ['scalarBad', 'sum'],
  },
  {
    id: 'quotient', needB: false,
    html: ({ k }) => `det(${kH(k)}A) / det(Aᵀ)`,
    line: ({ n, a, k }) => `${kT(k)}^${n}·${par(a)}/${par(a)}`,
    value: ({ n, k }) => k.pow(n),
    wrongs: ({ n, k }) => [{ rule: 'l_det_scalar', value: k, ctx: { k: fq(k), n, p: fq(k.pow(n)) } }, { rule: 'l_det_transpose_sign', value: k.pow(n).neg() }],
    rules: ['scalar', 'transpose'], bad: ['scalarBad', 'transposeBad'],
  },
];

const DETS = [1, -1, 2, -2, 3, -3, q(1, 2)];
function propsData(rng, ids) {
  for (let t = 0; t < 200; t++) {
    const id = rng.pick(ids);
    const f = FORMS.find((x) => x.id === id);
    const p = {
      n: rng.int(2, 5), a: q(rng.pick(DETS)), b: q(rng.pick(DETS)), k: q(rng.pick([2, 2, 3, -2, q(1, 2)])), m: rng.pick([2, 3]),
    };
    if (f.id === 'q19' || f.id === 'twice') p.n = rng.int(2, 4);
    if (f.id === 'invScalar' && p.k.n < 0) continue;
    const value = f.value(p);
    if (value.d > 64 || Math.abs(value.valueOf()) > 300 || value.n === 0) continue;
    const wrongs = f.wrongs(p).filter((w) => !w.value.eq(value));
    if (!wrongs.length) continue;
    if (f.needB && p.a.eq(p.b)) continue;
    return { f, p, value, wrongs };
  }
  const f = FORMS[1];
  const p = { n: 3, a: q(2), b: q(-1), k: q(2), m: 2 };
  return { f, p, value: q(-16), wrongs: f.wrongs(p), fallback: true };
}

const givenText = ({ n, a, b }, needB) => `A${needB ? ' et B sont' : ' est'} de taille ${n} × ${n}, det A = ${fq(a)}${needB ? ` et det B = ${fq(b)}` : ''}`;
const trapValuesOf = (wrongs) => wrongs.reduce((o, w) => ({ ...o, [w.rule]: [...(o[w.rule] || []), { value: qt(w.value), ctx: w.ctx || {} }] }), {});

function propsItem(level, rng) {
  const ids = level === 1 ? ['scalar', 'twice', 'q19'] : level === 2 ? ['scalar', 'twice', 'invScalar'] : level === 3 ? ['kAtBinv', 'power', 'invScalar'] : level === 4 ? ['kAtBinv', 'invScalar', 'quotient', 'power'] : ['q19', 'quotient', 'kAtBinv'];
  const d = propsData(rng, ids);
  const { f, p, value } = d;
  const line = f.line(p);
  const judge = { kind: 'value', expect: qt(value), trapValues: trapValuesOf(d.wrongs) };
  const rulesTxt = f.rules.map((r) => R[r].label).join(' ; ');
  const menu = [...f.rules.map((r) => ({ id: r, ...R[r] })), ...f.bad.map((r) => ({ id: r, ...R[r] }))];
  if (level === 3) judge.menu = menu.sort((x, y) => x.label.localeCompare(y.label));
  const lines = [
    { kind: 'eq', math: line, subgoal: 'rule', note: rulesTxt },
    { kind: 'eq', math: qt(value), subgoal: 'rule', note: 'Calculer' },
  ];
  const opts = {};
  const blanked = tpl(line, level === 1 ? [String(p.n)] : [String(p.n), qt(p.a)], opts);
  const script = [];
  if (f.note) script.push({ kind: 'note', html: f.note });
  if (level === 2) {
    script.push({
      kind: 'decision', prompt: `Quelle règle sert à calculer ${f.html(p)} ?`,
      options: rng.shuffle([{ id: f.rules[0], ...R[f.rules[0]] }, ...[...new Set([...f.bad, 'transposeBad', 'inverseBad', 'sum', 'scalarBad'])].slice(0, 3).map((r) => ({ id: r, ...R[r] }))]),
    });
  }
  script.push(level <= 2 ? { ...lines[0], ...blanked } : lines[0], lines[1]);
  const hints = H(
    level === 1 ? `La règle : ${rulesTxt}. Un scalaire sort avec la puissance n.` : 'Un scalaire sort avec la puissance n : det(kA) = kⁿ·det A. Puis det(AB) = det A·det B, det(Aᵀ) = det A, det(A⁻¹) = 1/det A.',
    `D = ${templateOf(blanked, opts).replace(/-/g, '−').replace(/×/g, '·')}`,
    MT(line),
  );
  return linesItem({
    skill: PROPS, level,
    prompt: `${givenText(p, f.needB)}. Calcule D = ${f.html(p)}.${level === 1 ? ` Règle : ${rulesTxt}.` : ''}`,
    start: 'D', judge, mode: modeOf(level), script, hints, subgoals: PROPS_SUB, keys: ['calc'],
    key: `${PROPS}:${f.id}:${p.n}:${qt(p.a)}:${qt(p.b)}:${qt(p.k)}`, tapActions: level === 3 ? 'menu' : null, fallback: d.fallback,
  });
}

function propsExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.int(0, 5);
    const I2 = '[[1,0],[0,1]]';
    const T = [
      { truth: true, s: 'Si A est 3 × 3 de valeurs propres 1, 2 et 4, alors det A = 8.', e: 'Vrai : det A est le produit des valeurs propres (avec multiplicités) : 1·2·4 = 8.' },
      { truth: true, s: 'Pour A et B carrées de même taille, det(AB) = det(BA).', e: 'Vrai : det(AB) = det A·det B = det B·det A = det(BA), même si AB ≠ BA.' },
      { truth: true, s: 'Si A est inversible, det(A⁻¹) = 1/det A.', e: 'Vrai : A·A⁻¹ = I donne det A·det(A⁻¹) = det I = 1.' },
      {
        truth: false, s: 'Pour toute matrice carrée A, det(Aᵀ) = −det A.', rule: 'l_det_transpose_sign',
        counter: { kind: 'matOne', params: { want: 'detNonZero', n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: I2 } },
        e: 'Faux : det(Aᵀ) = det A. Avec A = I₂ : det(Iᵀ) = 1 ≠ −1.',
      },
      {
        truth: false, s: 'Pour A et B carrées de même taille, det(A + B) = det A + det B.', rule: 'l_det_sum',
        counter: { kind: 'matPair', params: { n: 2, test: 'det(A+B)=detA+detB' }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }, { v: 'B', label: 'B =', shape: [2, 2] }], answer: { A: I2, B: I2 } },
        e: 'Faux : avec A = B = I₂, det(A + B) = det(2I₂) = 4, mais det A + det B = 2.',
      },
      {
        truth: false, s: 'Pour A de taille 3 × 3, det(2A) = 2·det A.', rule: 'l_det_scalar',
        counter: { kind: 'matOne', params: { want: 'detNonZero', n: 3 }, ask: [{ v: 'A', label: 'A =', shape: [3, 3] }], answer: { A: '[[1,0,0],[0,1,0],[0,0,1]]' } },
        e: 'Faux : det(2A) = 2³·det A = 8·det A. Avec A = I₃ : det(2I₃) = 8 ≠ 2.',
      },
    ][which];
    return tfL({
      skill: PROPS, key: `k${which}`, truth: T.truth, exam: examTag({ exam }), statement: T.s, explanation: T.e,
      counter: T.counter, ruleIfTrue: T.truth ? null : T.rule,
    });
  }
  if (rng.chance(0.3)) {
    // n as a letter.
    const k = rng.pick([2, 3, 5]);
    const which = rng.int(0, 1);
    if (which === 0) {
      return mcqDistinct({
        skill: PROPS, level: 4, key: `mcq:n:scalar:${k}`, exam: examTag({ exam }),
        prompt: `A est une matrice n × n. Que vaut det(${k}A) ?`,
        right: `${k}ⁿ·det A`,
        wrongs: [{ html: `${k}·det A`, rule: 'l_det_scalar' }, { html: `${k}n·det A`, rule: null }, { html: `det A + ${k}`, rule: null }],
        solution: [{ html: `Chacune des n lignes est multipliée par ${k} : det(${k}A) = ${k}ⁿ·det A.`, note: '' }],
      }, rng);
    }
    return mcqDistinct({
      skill: PROPS, level: 4, key: 'mcq:n:transpose', exam: examTag({ exam }),
      prompt: 'A est une matrice n × n inversible. Que vaut det(Aᵀ)·det(A⁻¹) ?',
      right: '1',
      wrongs: [{ html: '−1', rule: 'l_det_transpose_sign' }, { html: '(det A)²', rule: null }, { html: '(−1)ⁿ', rule: null }],
      solution: [{ html: 'det(Aᵀ) = det A et det(A⁻¹) = 1/det A : le produit vaut 1.', note: '' }],
    }, rng);
  }
  const d = propsData(rng, ['kAtBinv', 'invScalar', 'quotient', 'q19', 'power']);
  const { f, p, value } = d;
  return mcqDistinct({
    skill: PROPS, level: 4, key: `mcq:${f.id}:${p.n}:${qt(p.a)}:${qt(p.b)}:${qt(p.k)}`, exam: examTag({ exam }),
    prompt: `${givenText(p, f.needB)}. Que vaut ${f.html(p)} ?`,
    right: fq(value),
    wrongs: d.wrongs.map((w) => ({ html: fq(w.value), rule: w.rule })),
    fillers: [{ html: fq(value.neg()) }, { html: fq(value.mul(2)) }, { html: fq(q(1).div(value)) }, { html: fq(value.add(1)) }],
    solution: [{ html: `${f.html(p)} = ${MT(f.line(p))} = ${fq(value)}`, note: f.rules.map((r) => R[r].label).join(' ; ') }],
  }, rng);
}

// ======================================================================
// l-det-area
// ======================================================================

const AREA = 'l-det-area';
const AREA_SUB = [
  { id: 'det', label: 'calculer le déterminant', skill: COF },
  { id: 'area', label: 'aire ou volume', skill: AREA },
];
const parR = (x) => par(x).replace(/-/g, '−');
const ptT = (P) => `(${P.map(fq).join(' ; ')})`;
const vsub = (P, Q) => P.map((x, i) => x.sub(Q[i]));
// det[u v] (u, v in columns) as CAS text, and its value.
const det2T = (u, v) => `${par(u[0])}·${par(v[1])}-${par(v[0])}·${par(u[1])}`;
const det2 = (u, v) => u[0].mul(v[1]).sub(v[0].mul(u[1]));
const randPt = (rng, lo, hi, n = 2) => Array.from({ length: n }, () => q(rng.int(lo, hi)));
const qAbs = (x) => (x.n < 0 ? x.neg() : x);

// Wrong values of l_area_half_abs, different from the area.
function areaTraps(area, list) {
  const seen = new Set([qt(area)]);
  const out = [];
  for (const w of list) {
    const t = typeof w.value === 'string' ? w.value : qt(w.value);
    if (seen.has(t)) continue;
    seen.add(t);
    out.push({ value: t, ctx: w.ctx });
  }
  return out.length ? { l_area_half_abs: out } : {};
}

function triData(rng) {
  for (let t = 0; t < 200; t++) {
    const [P, Q, Rr] = [randPt(rng, -5, 5), randPt(rng, -5, 5), randPt(rng, -5, 5)];
    const u = vsub(Q, P);
    const v = vsub(Rr, P);
    const d = det2(u, v);
    if (d.n === 0 || Math.abs(d.valueOf()) > 60 || u.some((x) => x.n === 0) && v.some((x) => x.n === 0)) continue;
    return { P, Q, R: Rr, u, v, d, area: qAbs(d).div(2) };
  }
  const [P, Q, Rr] = [[1, 1], [4, 2], [2, 5]].map((p) => p.map((x) => q(x)));
  return { P, Q, R: Rr, u: vsub(Q, P), v: vsub(Rr, P), d: q(11), area: q(11, 2), fallback: true };
}

// A 2 × 2 matrix with |det| in [2 ; 12].
function mapData(rng) {
  for (let t = 0; t < 200; t++) {
    const A = [[rng.int(-3, 4), rng.int(-3, 4)], [rng.int(-3, 4), rng.int(-3, 4)]].map((r) => r.map((x) => q(x)));
    const d = MX.det(A);
    if (Math.abs(d.valueOf()) < 2 || Math.abs(d.valueOf()) > 12 || A.flat().filter((x) => x.n === 0).length > 1) continue;
    return { A, d };
  }
  return { A: MX.mat([[2, 1], [1, -1]]), d: q(-3), fallback: true };
}
const detAT = (A) => det2T([A[0][0], A[1][0]], [A[0][1], A[1][1]]);

// The parts of an area item: prompt, lines, traps, the shape (for the menu).
function areaParts(kind, rng) {
  if (kind === 'tri' || kind === 'par') {
    const d = triData(rng);
    const tri = kind === 'tri';
    const area = tri ? d.area : qAbs(d.d);
    const line1 = tri ? `(1/2)·|${det2T(d.u, d.v)}|` : `|${det2T(d.u, d.v)}|`;
    const M = [[d.u[0], d.v[0]], [d.u[1], d.v[1]]];
    return {
      d, area, shape: kind, M, id: [d.P, d.Q, d.R].map(ptT).join(''),
      prompt: tri
        ? `Calcule l'aire S du triangle de sommets P = ${ptT(d.P)}, Q = ${ptT(d.Q)} et R = ${ptT(d.R)}.`
        : `Calcule l'aire S du parallélogramme construit sur u = ${ptT(d.u)} et v = ${ptT(d.v)}.`,
      lines: [
        { kind: 'eq', math: line1, subgoal: 'det', note: tri ? `u = Q − P = ${ptT(d.u)}, v = R − P = ${ptT(d.v)} ; aire = ½·|det[u v]|` : 'aire = |det[u v]|' },
        { kind: 'eq', math: qt(area), subgoal: 'area', note: tri ? `det[u v] = ${fq(d.d)} : la moitié, en valeur absolue` : `det[u v] = ${fq(d.d)} : en valeur absolue` },
      ],
      traps: areaTraps(area, tri
        ? [{ value: d.d, ctx: { half: true, d: fq(d.d), area: fq(area) } }, { value: d.d.div(2), ctx: { half: true, d: fq(d.d), area: fq(area) } }, { value: qAbs(d.d), ctx: { half: true, d: fq(d.d), area: fq(area) } }]
        : [{ value: d.d, ctx: { d: fq(d.d), area: fq(area) } }]),
      hint2: tri ? `S = ½·|det${MLm(M)}| avec u = Q − P et v = R − P en colonnes : S = ½·|${parR(d.u[0])}·□ − □·${parR(d.u[1])}|.` : `S = |det${MLm(M)}| = |${parR(d.u[0])}·□ − □·${parR(d.u[1])}|.`,
      blanks: [qt(d.v[1]), qt(d.v[0])],
      fallback: d.fallback,
    };
  }
  if (kind === 'square' || kind === 'disc' || kind === 'ellipse' || kind === 'imgtri') {
    const m = mapData(rng);
    const A = m.A;
    const dA = qAbs(m.d);
    let area; let base; let lineTail; let what; let exact = false; let factor;
    if (kind === 'square') { area = dA; lineTail = ''; what = 'du carré unité [0 ; 1]²'; base = '1'; } else if (kind === 'disc') {
      const r = rng.int(1, 3);
      area = dA.mul(r * r); lineTail = `·π·${r}^2`; what = `du disque de centre 0 et de rayon ${r}`; exact = true; base = `π·${r}²`;
    } else if (kind === 'ellipse') {
      const [p, s] = [rng.int(1, 4), rng.int(1, 4)];
      area = dA.mul(p * s); lineTail = `·π·${p}·${s}`; what = `de l'ellipse x²/${p * p} + y²/${s * s} ≤ 1 (d'aire π·${p}·${s})`; exact = true; base = `π·${p}·${s}`;
      factor = null;
    } else {
      const t = triData(rng);
      area = dA.mul(t.area); lineTail = `·(1/2)·|${det2T(t.u, t.v)}|`; what = `du triangle de sommets ${ptT(t.P)}, ${ptT(t.Q)} et ${ptT(t.R)}`; base = fq(t.area);
    }
    const val = exact ? `${qt(area)}π` : qt(area);
    const wrongDet = exact ? `${qt(m.d.mul(area.div(dA)))}π` : m.d.mul(area.div(dA));
    return {
      area: val, exact, shape: 'img', M: A, id: `${mt(A)}:${lineTail}`,
      prompt: `L'application x ↦ Ax, avec A = ${MLm(A)}, transforme la région ${what}. Calcule l'aire S de son image.`,
      lines: [
        { kind: 'eq', math: `|${detAT(A)}|${lineTail}`, subgoal: 'det', note: `aire de l'image = |det A|·aire de départ ; det A = ${fq(m.d)}` },
        { kind: 'eq', math: val, subgoal: 'area', note: '' },
      ],
      traps: m.d.n < 0 ? areaTraps(exact ? q(-1) : area, [{ value: wrongDet, ctx: { d: fq(m.d), area: fq(dA), factor: base } }]) : {},
      hint2: `S = |det A|·(${base}), avec det A = ${parR(A[0][0])}·□ − □·${parR(A[1][0])}.`,
      blanks: [qt(A[1][1]), qt(A[0][1])],
      fallback: m.fallback,
    };
  }
  // 3D: tetrahedron (1/6) or parallelepiped.
  for (let t = 0; t < 200; t++) {
    const P = Array.from({ length: 4 }, () => randPt(rng, -3, 3, 3));
    const cols = [1, 2, 3].map((k) => vsub(P[k], P[0]));
    const M = [0, 1, 2].map((i) => cols.map((c) => c[i]));
    const d = MX.det(M);
    if (d.n === 0 || Math.abs(d.valueOf()) > 60) continue;
    // A row with a zero, to expand along it.
    if (!M[0].some((x) => x.n === 0)) continue;
    const tet = kind === 'tet';
    const vol = tet ? qAbs(d).div(6) : qAbs(d);
    return {
      area: qt(vol), shape: kind, M, d, P, three: true, id: mt(M),
      prompt: tet
        ? `Calcule le volume V du tétraèdre de sommets ${P.map(ptT).join(', ')}.`
        : `Calcule le volume V du parallélépipède construit sur u = ${ptT(cols[0])}, v = ${ptT(cols[1])} et w = ${ptT(cols[2])}.`,
      lines: [
        { kind: 'eq', math: tet ? `(1/6)·|${qt(d)}|` : `|${qt(d)}|`, subgoal: 'area', note: tet ? 'Un tétraèdre : 1/6 du parallélépipède' : 'Valeur absolue' },
        { kind: 'eq', math: qt(vol), subgoal: 'area', note: '' },
      ],
      traps: areaTraps(vol, [{ value: d, ctx: { d: fq(d), area: fq(qAbs(d)), factor: tet ? '1/6' : null } }, ...(tet ? [{ value: qAbs(d), ctx: { d: fq(d), area: fq(qAbs(d)), factor: '1/6' } }, { value: qAbs(d).div(2), ctx: { d: fq(d), area: fq(qAbs(d)), factor: '1/6' } }] : [])]),
      hint2: `Les arêtes issues du premier sommet, en colonnes : V = ${tet ? '(1/6)·' : ''}|det${MLm(M)}|.`,
      blanks: [],
    };
  }
  return areaParts('tri', rng);
}

// The det of a 3 × 3 along its first row: a·det[…] − b·det[…] + c·det[…].
function firstRowLine(M) {
  const terms = [];
  M[0].forEach((a, j) => {
    if (a.n === 0) return;
    const c = a.mul(sgn(0, j));
    const abs = c.n < 0 ? c.neg() : c;
    terms.push(`${c.n < 0 ? '-' : '+'}${abs.eq(1) ? '' : `${qt(abs)}·`}det${mt(minorOf(M, 0, j))}`);
  });
  return terms.join('').replace(/^\+/, '');
}

const AREA_MENU = (shape) => [
  { id: 'tri', label: 'Triangle : ½·|det[u v]|', valid: shape === 'tri', why: 'Ce n\'est pas un triangle.' },
  { id: 'par', label: 'Parallélogramme : |det[u v]|', valid: shape === 'par', why: shape === 'tri' ? 'Un triangle est la moitié du parallélogramme.' : 'Ce n\'est pas un parallélogramme donné par ses côtés.' },
  { id: 'img', label: 'Image par A : |det A|·aire de départ', valid: shape === 'img', why: 'Aucune application n\'est appliquée ici.' },
  { id: 'nohalf', label: 'Triangle : det[u v]', valid: false, rule: 'l_area_half_abs', why: 'Un triangle est la moitié du parallélogramme, et une aire est positive : ½·|det[u v]|.' },
];

function areaItem(level, rng) {
  const kind = level <= 2 ? 'tri' : level === 3 ? rng.pick(['tri', 'par', 'square']) : level === 4 ? rng.pick(['tet', 'box', 'disc', 'tri']) : rng.pick(['ellipse', 'imgtri']);
  const a = areaParts(kind, rng);
  const judge = { kind: 'value', expect: a.area, trapValues: a.traps };
  if (a.exact) judge.form = 'exact';
  if (level === 3) judge.menu = AREA_MENU(a.shape);
  const script = [];
  let start = 'S';
  if (a.three) {
    // The determinant first (judge det), then the volume.
    start = `det${mt(a.M)}`;
    script.push(
      { kind: 'eq', math: firstRowLine(a.M), subgoal: 'det', note: 'Développer selon la ligne 1' },
      { kind: 'eq', math: qt(a.d), subgoal: 'det', note: 'Les arêtes en colonnes' },
      { kind: 'segment', html: `Le déterminant vaut ${fq(a.d)}. Le volume ?`, ask: 'V =', start: { math: 'V' }, judge },
    );
  }
  const [l1, l2] = a.lines;
  if (level === 2) {
    const d = a.d;
    script.push({
      kind: 'decision', prompt: 'Quels vecteurs mettre dans le déterminant ?', options: rng.shuffle([
        { id: 'sides', label: 'u = Q − P et v = R − P : deux côtés issus de P', valid: true, ref: true },
        { id: 'sides2', label: 'u = Q − P et v = R − Q : deux côtés qui se suivent', valid: true, quality: 'poor', why: 'Juste aussi (det[Q − P, R − Q] = det[Q − P, R − P]), mais on prend d\'habitude deux côtés issus du même sommet.' },
        { id: 'points', label: `u = P et v = Q : les sommets eux-mêmes`, valid: false, why: `Un sommet n'est pas un côté : il faut des différences de sommets. Ici det[P Q] = ${fq(det2(d.P, d.Q))}.` },
      ]),
    });
  }
  script.push(level <= 2 ? { ...l1, ...tpl(l1.math, level === 1 ? a.blanks.slice(0, 1) : a.blanks) } : l1, l2);
  const hints = H(
    a.three ? 'Les trois arêtes issues d\'un même sommet en colonnes, puis |det| (et 1/6 pour un tétraèdre).' : a.shape === 'img' ? 'x ↦ Ax multiplie les aires par |det A|.' : 'Deux côtés issus du même sommet, puis |det| (et ½ pour un triangle).',
    a.hint2,
    MT(l1.math),
  );
  return linesItem({
    skill: AREA, level,
    prompt: level === 1 && a.shape === 'tri' ? `${a.prompt} Les côtés issus de P sont u = ${ptT(a.d.u)} et v = ${ptT(a.d.v)}.` : a.prompt,
    start: a.three ? start : 'S', judge: a.three ? { kind: 'det', target: 'number' } : judge, mode: modeOf(level), script, hints, subgoals: AREA_SUB, keys: ['calc'],
    key: `${AREA}:${kind}:${a.id}`, tapActions: level === 3 ? 'menu' : null, fallback: a.fallback,
  });
}

function areaExam(rng, exam) {
  if (exam === 'tf') {
    const which = rng.int(0, 3);
    if (which < 2) {
      const st = [
        ['Le volume du parallélépipède construit sur les colonnes d\'une matrice A de taille 3 × 3 vaut |det A|.', 'Vrai : c\'est l\'interprétation géométrique du déterminant.'],
        ['Si det A = 0, l\'image du carré unité par x ↦ Ax est d\'aire nulle.', 'Vrai : l\'aire de l\'image vaut |det A|·1 = 0 (le carré est écrasé sur une droite ou un point).'],
      ][which];
      return tfL({ skill: AREA, key: `true:${which}`, truth: true, exam: examTag({ exam }), statement: st[0], explanation: st[1] });
    }
    if (which === 2) {
      const A = rng.pick([[[0, 1], [1, 0]], [[1, 2], [3, 4]], [[2, 1], [3, 1]], [[1, 0], [0, -2]]]);
      return tfL({
        skill: AREA, key: `square:${mt(MX.mat(A))}`, truth: false, exam: examTag({ exam }), ruleIfTrue: 'l_area_half_abs',
        statement: 'Pour toute matrice A de taille 2 × 2, l\'aire de l\'image du carré unité par x ↦ Ax vaut det A.',
        counter: { kind: 'matOne', params: { want: 'detNegative', n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(MX.mat(A)) } },
        explanation: `Faux : l'aire vaut |det A|. Pour A = ${MLm(MX.mat(A))}, det A = ${fq(MX.det(MX.mat(A)))} < 0, mais une aire est positive.`,
      });
    }
    return tfL({
      skill: AREA, key: 'triangle', truth: false, exam: examTag({ exam }), ruleIfTrue: 'l_area_half_abs',
      statement: 'L\'aire du triangle de sommets 0, u et v (dans ℝ²) vaut |det[u v]|.',
      counter: { kind: 'matOne', params: { want: 'detNonZero', n: 2 }, ask: [{ v: 'A', label: '[u v] =', shape: [2, 2] }], answer: { A: '[[1,0],[0,1]]' } },
      explanation: 'Faux : c\'est la moitié, ½·|det[u v]|. Avec u = (1 ; 0) et v = (0 ; 1), le triangle a une aire de 1/2, et |det[u v]| = 1.',
    });
  }
  const d = triData(rng);
  return mcqDistinct({
    skill: AREA, level: 4, key: `mcq:${[d.P, d.Q, d.R].map(ptT).join('')}`, exam: examTag({ exam }),
    prompt: `Quelle est l'aire du triangle de sommets ${ptT(d.P)}, ${ptT(d.Q)} et ${ptT(d.R)} ?`,
    right: fq(d.area),
    wrongs: [{ html: fq(d.d), rule: 'l_area_half_abs' }, { html: fq(d.d.div(2).neg()), rule: 'l_area_half_abs' }, { html: fq(qAbs(d.d)), rule: 'l_area_half_abs' }, { html: fq(d.d.div(2)), rule: 'l_area_half_abs' }],
    fillers: [{ html: fq(d.area.add(1)) }, { html: fq(d.area.mul(4)) }],
    solution: [{ html: `u = ${ptT(d.u)}, v = ${ptT(d.v)}, det[u v] = ${fq(d.d)}, aire = ½·|${fq(d.d)}| = ${fq(d.area)}`, note: '' }],
  }, rng);
}

// ======================================================================
// l-det-cramer
// ======================================================================

const CR = 'l-det-cramer';
const CR_SUB = [
  { id: 'det', label: 'calculer un déterminant', skill: COF },
  { id: 'cramer', label: 'règle de Cramer', skill: CR },
];
const XN = (n) => Array.from({ length: n }, (_, i) => `x_${i + 1}`);
const xName = (i) => `x${sub(i + 1)}`;
const withCol = (A, i, b) => A.map((r, k) => r.map((x, j) => (j === i ? b[k] : x)));
const withRow = (A, i, b) => A.map((r, k) => (k === i ? [...b] : r));

// The system as MathML (one equation per row; coefficient texts may hold a).
function sysML(rowsT, bT, names, vars = []) {
  const eqs = rowsT.map((r, i) => {
    let s = '';
    r.forEach((c, j) => {
      if (c === '0') return;
      const neg = c.startsWith('-');
      const abs = neg ? c.slice(1) : c;
      const coef = abs === '1' ? '' : /^[\d/]+$/.test(abs) ? abs : /^[a-zλ]$/.test(abs) ? `${abs}·` : `(${abs})·`;
      s += `${neg ? '-' : s ? '+' : ''}${coef}${names[j]}`;
    });
    return `${s || '0'}=${bT[i]}`;
  });
  return MT(eqs.join(';'), { vars: [...names, ...vars] }, true);
}

function crData(n, rng) {
  const DETS_OK = [1, -1, 2, -2, 5, -5, 10];
  for (let t = 0; t < 300; t++) {
    const A = Array.from({ length: n }, () => Array.from({ length: n }, () => q(n === 2 ? rng.int(-4, 6) : rng.int(-3, 4))));
    const d = MX.det(A);
    if (!DETS_OK.includes(d.valueOf())) continue;
    if (A.flat().filter((x) => x.n === 0).length > (n === 2 ? 0 : 3)) continue;
    const x = Array.from({ length: n }, () => q(rng.int(-4, 5)));
    const b = MX.matVec(A, x);
    if (b.some((v) => Math.abs(v.valueOf()) > 30)) continue;
    // The row trap gives other values.
    const rowVals = x.map((_, i) => MX.det(withRow(A, i, b)).div(d));
    if (rowVals.some((v, i) => v.eq(x[i]))) continue;
    return { A, b, x, d, rowVals, n };
  }
  const A = MX.mat([[3, 2], [1, 4]]);
  const b = [q(7), q(9)];
  return { A, b, x: [q(1), q(2)], d: q(10), rowVals: [q(19, 10), q(-1, 10)].map((v, i) => MX.det(withRow(A, i, b)).div(q(10))), n: 2, fallback: true };
}

const crMenu = () => [
  { id: 'cramer', label: 'Règle de Cramer : xᵢ = det Aᵢ(b) / det A', valid: true },
  { id: 'row', label: 'Remplacer la ligne i de A par b', valid: false, rule: 'l_cramer_row', why: 'Cramer remplace la colonne de l\'inconnue, pas une ligne.' },
  { id: 'gauss', label: 'Échelonner [A | b] (Gauss)', valid: false, why: 'Gauss marche aussi, mais pour une seule inconnue Cramer est plus court : c\'est la méthode demandée ici.' },
];

// The determinant of A as reference lines (judge det).
function detLinesOf(A, d) {
  if (A.length === 2) return [{ kind: 'eq', math: `${par(A[0][0])}·${par(A[1][1])}-${par(A[0][1])}·${par(A[1][0])}`, subgoal: 'det', note: 'Diagonale moins antidiagonale' }, { kind: 'eq', math: qt(d), subgoal: 'det', note: '' }];
  return [{ kind: 'eq', math: firstRowLine(A), subgoal: 'det', note: 'Développer selon la ligne 1' }, { kind: 'eq', math: qt(d), subgoal: 'det', note: '' }];
}

function crItem(level, rng) {
  if (level === 5) return crParamItem(rng);
  const n = level === 4 ? 3 : 2;
  const d = crData(n, rng);
  const names = XN(n);
  const asked = n === 2 ? (level <= 2 ? [rng.int(0, 1)] : [0, 1]) : [rng.int(0, 2)];
  const menu = level === 3 ? crMenu() : null;
  const detJudge = { kind: 'det', target: 'number', ...(menu ? { menu } : {}) };
  const script = [...detLinesOf(d.A, d.d)];
  for (const i of asked) {
    const Ai = withCol(d.A, i, d.b);
    const judge = { kind: 'mat', expect: qt(d.x[i]), trapValues: { l_cramer_row: [{ value: qt(d.rowVals[i]), ctx: { i: i + 1 } }] }, ...(menu ? { menu } : {}) };
    script.push({ kind: 'segment', html: `${xName(i)} = det A${sub(i + 1)}(b) / det A, où A${sub(i + 1)}(b) est A avec la colonne ${i + 1} remplacée par b.`, ask: `${xName(i)} =`, start: { math: `x_${i + 1}` }, judge });
    if (level === 2) {
      script.push({
        kind: 'decision', prompt: `Que remplacer par b pour calculer ${xName(i)} ?`, options: rng.shuffle([
          { id: 'col', label: `La colonne ${i + 1} de A`, valid: true },
          { id: 'row', label: `La ligne ${i + 1} de A`, valid: false, rule: 'l_cramer_row', why: `Cramer remplace la colonne des coefficients de ${xName(i)}, pas une ligne.` },
          { id: 'other', label: `La colonne ${(i + 1) % n + 1} de A`, valid: false, why: `La colonne ${(i + 1) % n + 1} porte les coefficients de ${xName((i + 1) % n)}, pas de ${xName(i)}.` },
        ]),
      });
    }
    const l = { kind: 'eq', math: `det${mt(Ai)}/${par(d.d)}`, subgoal: 'cramer', note: `Colonne ${i + 1} remplacée par b ; det A${sub(i + 1)}(b) = ${fq(MX.det(Ai))}` };
    script.push(level <= 2 ? withCells(l, d.A.map((_, r) => [r, i]).slice(0, level === 1 ? 2 : n)) : l, { kind: 'eq', math: qt(d.x[i]), subgoal: 'cramer', note: '' });
  }
  const i0 = asked[0];
  const A0 = withCol(d.A, i0, d.b).map((r) => r.map((x, j) => (j === i0 ? '□' : fq(x))));
  const hints = H(
    'D\'abord det A ; puis remplace la colonne de l\'inconnue par b : xᵢ = det Aᵢ(b) / det A.',
    `${xName(i0)} = det[${A0.map((r) => `[${r.join(', ')}]`).join(', ')}] / ${fq(d.d)}`,
    MLd(`det${mt(withCol(d.A, i0, d.b))}/${par(d.d)}`),
  );
  const bT = d.b.map(qt);
  return matLines({
    skill: CR, level,
    prompt: `Résous par la règle de Cramer le système ${sysML(d.A.map((r) => r.map(qt)), bT, names)}, de matrice A = ${MLm(d.A)} : calcule det A, puis ${asked.map(xName).join(' et ')}.`,
    start: `det${mt(d.A)}`, judge: detJudge, mode: modeOf(level), script, hints, subgoals: CR_SUB, keys: ['mat', 'calc'],
    key: `${CR}:${mt(d.A)}:${bT.join(',')}:${asked.join('')}`, tapActions: level === 3 ? 'menu' : null, fallback: d.fallback,
  });
}

// x₂ in terms of a: A = [[a, p], [r, s]] (or a in another cell).
function crParamData(rng) {
  for (let t = 0; t < 200; t++) {
    const [p, r, s] = [nz(rng, -3, 4), nz(rng, -3, 4), nz(rng, -3, 4)];
    const b = [rng.int(-5, 6), nz(rng, -5, 6)];
    // det A = s·a − p·r ; x₂ = (a·b₂ − r·b₁)/(s·a − p·r)
    const num = [-r * b[0], b[1]];
    const den = [-p * r, s];
    if (num[0] * den[1] === num[1] * den[0]) continue;
    const rowNum = b[0] * s - b[1] * r; // det[[b₁, b₂], [r, s]]
    if (rowNum === 0) continue;
    return { p, r, s, b, num, den, rowNum };
  }
  return { p: 2, r: 1, s: 4, b: [7, 9], num: [-7, 9], den: [-2, 4], rowNum: 19, fallback: true };
}

function crParamItem(rng) {
  const d = crParamData(rng);
  const v = 'a';
  const A = `[[a,${d.p}],[${d.r},${d.s}]]`;
  const detT = lin(d.den[0], d.den[1], v);
  const x2 = `(${lin(d.num[0], d.num[1], v)})/(${detT})`;
  const root = q(-d.den[0], d.den[1]);
  const script = [
    { kind: 'eq', math: `a·${par(q(d.s))}-${par(q(d.p))}·${par(q(d.r))}`, subgoal: 'det', note: 'Diagonale moins antidiagonale' },
    { kind: 'segment', html: `Pour a ≠ ${fq(root)}, det A ≠ 0 : x₂ = det A₂(b) / det A.`, ask: 'x₂ =', start: { math: 'x_2' }, judge: { kind: 'mat', vars: [v], expect: x2, trapValues: { l_cramer_row: [{ value: `(${d.rowNum})/(${detT})`, ctx: { i: 2 } }] } } },
    { kind: 'eq', math: `det[[a,${d.b[0]}],[${d.r},${d.b[1]}]]/(${detT})`, subgoal: 'cramer', note: 'Colonne 2 remplacée par b' },
    { kind: 'eq', math: x2, subgoal: 'cramer', note: '' },
  ];
  return matLines({
    skill: CR, level: 5,
    prompt: `Soit le système ${sysML([['a', String(d.p)], [String(d.r), String(d.s)]], d.b.map(String), XN(2), [v])}, de matrice A = ${ML(A, { vars: [v] })}. Calcule det A, puis x₂ en fonction de a.`,
    start: `det${A}`, judge: { kind: 'det', vars: [v], target: 'factored' }, mode: 'free', script, hints: [], subgoals: CR_SUB, keys: ['mat', 'calc'],
    key: `${CR}:param:${A}:${d.b.join(',')}`, fallback: d.fallback,
  });
}

function crExam(rng, exam) {
  const n = rng.pick([2, 3]);
  const d = crData(n, rng);
  const i = n === 2 ? 1 : rng.int(0, 2);
  const names = XN(n);
  const Ai = withCol(d.A, i, d.b);
  const x1 = d.x[(i + 1) % n];
  return mcqDistinct({
    skill: CR, level: 4, key: `mcq:${mt(d.A)}:${d.b.map(qt).join(',')}:${i}`, exam: examTag({ exam }),
    prompt: `Soit le système ${sysML(d.A.map((r) => r.map(qt)), d.b.map(qt), names)}. Par la règle de Cramer, que vaut ${xName(i)} ?`,
    right: fq(d.x[i]),
    wrongs: [{ html: fq(d.rowVals[i]), rule: 'l_cramer_row' }, { html: fq(MX.det(Ai)), rule: null }, { html: fq(x1), rule: null }],
    fillers: [{ html: fq(d.x[i].neg()) }, { html: fq(d.x[i].add(1)) }, { html: fq(d.x[i].sub(2)) }],
    solution: [{ html: `det A = ${fq(d.d)} ; ${xName(i)} = det${MLm(Ai)} / ${fq(d.d)} = ${fq(d.x[i])}`, note: `Colonne ${i + 1} remplacée par b` }],
  }, rng);
}

// ======================================================================

export const GEN = {
  [COF]: (level, rng, profile, opts = {}) => (opts.exam ? cofExam(rng, opts.exam) : cofItem(level, rng)),
  [RO]: (level, rng, profile, opts = {}) => (opts.exam ? roExam(rng, opts.exam) : roItem(level, rng)),
  [PROPS]: (level, rng, profile, opts = {}) => (opts.exam ? propsExam(rng, opts.exam) : propsItem(level, rng)),
  [AREA]: (level, rng, profile, opts = {}) => (opts.exam ? areaExam(rng, opts.exam) : areaItem(level, rng)),
  [CR]: (level, rng, profile, opts = {}) => (opts.exam ? crExam(rng, opts.exam) : crItem(level, rng)),
};
