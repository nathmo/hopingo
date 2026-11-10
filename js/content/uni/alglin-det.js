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
import { evalAst, envOf, isZeroScalar } from '../../cas/matexpr.js';
import { blankLine } from '../../judges/lines.js';
import { detsOf } from '../../judges/det.js';
import { mopts } from '../../judges/matcommon.js';
import { ACTIONS } from '../../judges/actions.js';
import { readWith, showWith } from '../../judges/index.js';
import {
  q, mt, ML, MLm, fq, qt, sub, pickCells, withCells, matLines, mcqDistinct, tfL, examTag,
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

export const GEN = {
  [COF]: (level, rng, profile, opts = {}) => (opts.exam ? cofExam(rng, opts.exam) : cofItem(level, rng)),
};
