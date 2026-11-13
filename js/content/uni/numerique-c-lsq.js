// n-least-squares (module N, part c, step U9): normal equations by hand.
// Catalogue: docs/universite/N-analyse-numerique.md, n-least-squares.
//
// Data: 3 or 4 points with whole abscissas in [−2 ; 3] and whole ordinates
// in [−5 ; 8], not aligned; the line y = a₀ + a₁x (or y = a + bx², level 4)
// has coefficients with denominators ≤ 12. L1 the sums Σx, Σx², Σy, Σxy,
// then a₁ and a₀ (guided); L2 AᵀA and Aᵀy in the grid (judge mat), then
// the coefficients; L3 the choice « interpoler ou équations normales »
// (trap n_ls_interp), then the same steps with menus; L4 free, a line or a
// parabola y = a + bx²; L5 the program of the exam 2021 (lsq, lsq_line),
// then its output to read. Exam: mcq (the line alpha = ??? or the line
// mat[j][i] = basis(n, i, ???)), tf (the line misses every point: (0 ; 0),
// (1 ; 1), (2 ; 0)), coef (a₁).

import { Q } from '../../math/rational.js';
import { t } from '../../i18n.js';
import { linesItem, tfItem, examTag } from './kit.js';
import { mt, vt, withCells, mcqDistinct } from './alglin-kit.js';
import { refCode, codeItem, codeMcq, holesFor, readtableItem, multiMcq, expText, blankBy } from './numerique-kit.js';
import { q, fq, H } from './numerique-c-kit.js';

const LS = 'n-least-squares';
const KEYS = ['calc'];
const P = (x) => (q(x).n < 0 ? `(${q(x)})` : `${q(x)}`);
const PR = (x) => (q(x).n < 0 ? `(${fq(x)})` : fq(x));

const SUB = [
  { id: 'design', label: t('la matrice A des données'), skill: LS },
  { id: 'normal', label: t('les équations normales'), skill: LS },
  { id: 'solve', label: t('résoudre le système 2 × 2'), skill: 'l-orth-lsq' },
];

// Solve [[a, b], [b, c]]·(u ; v) = (r ; s) exactly.
function solve2(a, b, c, r, s) {
  const det = a.mul(c).sub(b.mul(b));
  if (det.n === 0) return null;
  return [r.mul(c).sub(b.mul(s)).div(det), a.mul(s).sub(b.mul(r)).div(det)];
}

// basis 'x' (line a₀ + a₁x) or 'x2' (a + bx²).
function lsData(rng, { basis = 'x', m = null } = {}) {
  for (let tries = 0; tries < 300; tries++) {
    const n = m ?? rng.pick([3, 3, 4]);
    let xs = rng.shuffle([-2, -1, 0, 1, 2, 3]).slice(0, n).sort((u, v) => u - v);
    if (basis === 'x2' && new Set(xs.map((x) => x * x)).size < n) continue;
    const ys = xs.map(() => rng.int(-5, 8));
    const f = (x) => (basis === 'x' ? x : x * x);
    const S = (g) => xs.reduce((acc, x, i) => acc.add(q(g(x, ys[i]))), new Q(0));
    const s0 = q(n);
    const s1 = S((x) => f(x));
    const s2 = S((x) => f(x) * f(x));
    const sy = S((x, y) => y);
    const sxy = S((x, y) => f(x) * y);
    const sol = solve2(s0, s1, s2, sy, sxy);
    if (!sol) continue;
    const [a0, a1] = sol;
    if (a0.d > 12 || a1.d > 12) continue;
    // Not aligned (a zero residual would make the question trivial).
    if (xs.every((x, i) => a0.add(a1.mul(f(x))).eq(ys[i]))) continue;
    if (a1.n === 0) continue;
    xs = xs.map(Number);
    return { basis, n, xs, ys, s0, s1, s2, sy, sxy, a0, a1 };
  }
  const xs = [0, 1, 2];
  const ys = [1, 3, 4];
  return { basis: 'x', n: 3, xs, ys, s0: q(3), s1: q(3), s2: q(5), sy: q(8), sxy: q(11), a0: q(7, 6), a1: q(3, 2), fallback: true };
}

const ptsText = (d) => d.xs.map((x, i) => `(${fq(x)} ; ${fq(d.ys[i])})`).join(', ');
const modelText = (d) => (d.basis === 'x' ? 'y = a₀ + a₁x' : 'y = a₀ + a₁x²');
const fx = (d, x) => (d.basis === 'x' ? x : x * x);
const Amat = (d) => d.xs.map((x) => [1, fx(d, x)]);
const At = (d) => [d.xs.map(() => 1), d.xs.map((x) => fx(d, x))];
const fmtLine = (d) => {
  const a = d.a1.n < 0 ? d.a1.neg() : d.a1;
  const c = a.eq(1) ? '' : a.isInt() ? fq(a) : `(${fq(a)})`;
  const m = `${c}${d.basis === 'x' ? 'x' : 'x²'}`;
  if (d.a0.n === 0) return `y = ${d.a1.n < 0 ? '−' : ''}${m}`;
  return `y = ${fq(d.a0)} ${d.a1.n < 0 ? '−' : '+'} ${m}`;
};

function split(script) {
  const [seg, ...rest] = script;
  return { start: seg.start.math, judge: seg.judge, script: seg.html ? [{ kind: 'note', html: seg.html }, ...rest] : rest };
}
const MENU = [
  { id: 'design', label: t('Écrire la matrice A (une ligne par point)') },
  { id: 'normal', label: t('Former AᵀA') },
  { id: 'rhs', label: t('Former Aᵀy') },
  { id: 'solve', label: t('Résoudre AᵀA·α = Aᵀy') },
];
const menuOf = (id) => MENU.map((o) => ({ id: o.id, label: o.label, valid: o.id === id, why: o.id === id ? undefined : t('Pas maintenant : ce n\'est pas l\'étape suivante.') }));

// a₁ then a₀ (judge value, expect).
function solveSegs(d, { guided = false, menu = false } = {}) {
  const g = (line) => (guided ? { ...line, ...blankBy(line.math, [line.math]) } : line);
  const M = menu ? { menu: menuOf('solve') } : {};
  return [
    { kind: 'segment', html: t('Résous {M}·(a₀ ; a₁) = {v}. D\'abord a₁.', { M: `[[${fq(d.s0)}, ${fq(d.s1)}], [${fq(d.s1)}, ${fq(d.s2)}]]`, v: `(${fq(d.sy)} ; ${fq(d.sxy)})` }), ask: 'a₁ =', start: { math: 'a_1' }, judge: { kind: 'value', expect: String(d.a1), form: 'irreducible', ...M } },
    g({ kind: 'eq', math: String(d.a1), note: t('Élimine a₀ entre les deux équations'), subgoal: 'solve' }),
    { kind: 'segment', html: t('Puis a₀.'), ask: 'a₀ =', start: { math: 'a_0' }, judge: { kind: 'value', expect: String(d.a0), form: 'irreducible', ...M } },
    g({ kind: 'eq', math: String(d.a0), note: `a₀ = (${fq(d.sy)} − ${PR(d.s1)}·a₁)/${fq(d.s0)} ; ${fmtLine(d)}`, subgoal: 'solve' }),
  ];
}

function sumSegs(d, { guided = false } = {}) {
  const g = (line) => (guided ? { ...line, ...blankBy(line.math, [line.math]) } : line);
  const sum = (fn) => d.xs.map((x, i) => fn(x, d.ys[i])).join('+');
  const seg = (ask, start, v, note, sg) => [
    { kind: 'segment', html: `${ask.replace(' =', '')}.`, ask, start: { math: start }, judge: { kind: 'value', form: 'irreducible' } },
    g({ kind: 'eq', math: String(v), note, subgoal: sg }),
  ];
  return [
    ...seg('Σx =', sum((x) => P(x)), d.s1, t('Somme des abscisses'), 'design'),
    ...seg('Σx² =', sum((x) => `${P(x)}^2`), d.s2, t('Somme des carrés'), 'design'),
    ...seg('Σy =', sum((x, y) => P(y)), d.sy, t('Somme des ordonnées'), 'normal'),
    ...seg('Σxy =', sum((x, y) => `${P(x)}×${P(y)}`), d.sxy, t('Somme des produits'), 'normal'),
  ];
}

function matSegs(d, { guided = false, menu = false } = {}) {
  const M = (id) => (menu ? { menu: menuOf(id) } : {});
  const AtA = [[d.s0, d.s1], [d.s1, d.s2]];
  const Aty = [d.sy, d.sxy];
  const l1 = { kind: 'eq', math: mt(AtA), note: t('[[m, Σf], [Σf, Σf²]] avec f = {f}', { f: d.basis === 'x' ? 'x' : 'x²' }), subgoal: 'normal' };
  const l2 = { kind: 'eq', math: vt(Aty), note: `(Σy ; Σ${d.basis === 'x' ? 'x' : 'x²'}y)`, subgoal: 'normal' };
  return [
    { kind: 'segment', html: t('AᵀA, avec A = {A} (une ligne par point).', { A: mt(Amat(d)).replace(/-/g, '−') }), ask: 'AᵀA =', start: { math: `${mt(At(d))}·${mt(Amat(d))}` }, judge: { kind: 'mat', ...M('normal') } },
    guided ? withCells(l1, [[1, 1]]) : l1,
    { kind: 'segment', html: 'Aᵀy.', ask: 'Aᵀy =', start: { math: `${mt(At(d))}·${vt(d.ys)}` }, judge: { kind: 'mat', ...M('rhs') } },
    guided ? withCells(l2, [[1, 0]]) : l2,
  ];
}

const hintsOf = (d) => H(
  t('Trop d\'équations pour les inconnues : on résout les équations normales AᵀA·α = Aᵀy.'),
  `AᵀA = [[${fq(d.s0)}, ${fq(d.s1)}], [${fq(d.s1)}, □]]`,
  t('AᵀA = {M}, Aᵀy = {v}, donc a₁ = {a1} et a₀ = {a0}.', { M: `[[${fq(d.s0)}, ${fq(d.s1)}], [${fq(d.s1)}, ${fq(d.s2)}]]`, v: `(${fq(d.sy)} ; ${fq(d.sxy)})`, a1: fq(d.a1), a0: fq(d.a0) }),
);

function lsLines(rng, level) {
  const d = lsData(rng, { basis: level === 4 && rng.chance(0.5) ? 'x2' : 'x' });
  let segs;
  let decision = [];
  if (level === 1) segs = [...sumSegs(d, { guided: true }), ...solveSegs(d, { guided: true })];
  else segs = [...matSegs(d, { guided: level === 2, menu: level === 3 }), ...solveSegs(d, { guided: level === 2, menu: level === 3 })];
  if (level === 3) {
    decision = [{
      kind: 'decision', prompt: t('{n} points et 2 inconnues. Comment trouver a₀ et a₁ ?', { n: d.n }), options: [
        { id: 'normal', label: t('Résoudre les équations normales AᵀA·α = Aᵀy'), valid: true, ref: true },
        { id: 'interp', label: t('Résoudre A·α = y avec 2 des {n} équations', { n: d.n }), valid: false, rule: 'n_ls_interp', why: t('Avec {n} points et 2 inconnues, A·α = y n\'a en général pas de solution ; en gardant 2 équations, la droite passe par 2 points et ignore les autres.', { n: d.n }) },
      ],
    }];
  }
  const { start, judge, script } = split(segs);
  return linesItem({
    skill: LS, level, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', keys: KEYS, ...(level === 3 ? { tapActions: 'menu' } : {}),
    prompt: t('Moindres carrés : trouve {model} la plus proche des points {pts}.', { model: modelText(d), pts: ptsText(d) }) + (level === 1 ? ` ${t('Les équations normales sont [[m, Σx], [Σx, Σx²]]·(a₀ ; a₁) = (Σy ; Σxy).')}` : ''),
    start, judge, script: [...decision, ...script],
    hints: hintsOf(d), subgoals: SUB, baits: level === 3 ? ['n_ls_interp'] : [],
    key: `${LS}:${level}:${d.basis}:${d.xs}:${d.ys}`, fallback: d.fallback,
  });
}

// ---------- the program (exam 2021, exam2.m) ----------

const LSQ = refCode(`def basis(n, i, x):
    return max(0.0, x - i / (n + 1))

def lsq(xs, ys, n):
    # mat[j][i] = phi_i(x_j) : une ligne par donnee, une colonne par fonction de base
    m = len(xs)
    mat = zeros2(m, n)
    for i in range(n):
        for j in range(m):
            mat[j][i] = basis(n, i, «xs[j]»)
    At = transpose(mat)
    return «solve(matmul(At, mat), matvec(At, ys))»

def lsq_line(xs, ys):
    m = len(xs)
    A = zeros2(m, 2)
    for j in range(m):
        A[j][0] = «1.0»
        A[j][1] = «xs[j]»
    At = transpose(A)
    return solve(matmul(At, A), matvec(At, ys))
`);
const TRAPS = {
  0: [{ text: 'xs[i]', rule: 'n_ls_index_swap' }],
  1: [{ text: 'solve(matmul(mat, At), matvec(mat, ys))', rule: 'n_ls_aat' }, { text: 'solve(mat, ys)', rule: 'n_ls_interp' }],
  2: [{ text: 'xs[j]' }],
  3: [{ text: 'ys[j]' }],
};
const FILLERS = { 0: ['ys[j]', 'j'], 1: ['solve(matmul(At, mat), matvec(mat, ys))'] };
const TESTS = [
  { expr: 'lsq_line([0, 1, 2], [1, 3, 4])', expect: '[1.1666666666666667, 1.5]', tol: 1e-9 },
  { expr: 'lsq_line([-1, 0, 1], [1, 0.5, 1/3])', expect: '[0.611111111111111, -0.33333333333333337]', tol: 1e-9 },
  { expr: 'lsq([0.25, 0.5, 0.75, 1.0], [0.0, 0.5, 1.0, 1.5], 2)', expect: '[0.2539682539682564, 1.9047619047619004]', tol: 1e-9 },
];

function ls5(rng) {
  const d = lsData(rng, { basis: 'x' });
  const xsT = `[${d.xs.join(', ')}]`;
  const ysT = `[${d.ys.join(', ')}]`;
  const then = readtableItem({
    skill: LS, level: 5, key: `${d.xs}:${d.ys}`,
    prompt: t('Le programme affiche {call} :', { call: `lsq_line(${xsT}, ${ysT})` }),
    table: { columns: ['a₀', 'a₁'], rows: [[expText(d.a0.valueOf(), 6), expText(d.a1.valueOf(), 6)]] },
    question: multiMcq({
      skill: LS, level: 5, key: `${LS}:5q:${d.xs}:${d.ys}`,
      prompt: t('Que peut-on en dire ?'),
      options: [
        { html: t('La droite des moindres carrés est {line}', { line: fmtLine(d) }), correct: true },
        { html: t('Elle minimise la somme des carrés des écarts verticaux'), correct: true },
        { html: t('Elle passe par tous les points'), correct: false, rule: 'n_ls_interp' },
        d.a0.eq(d.a1) ? { html: t('La somme des carrés des écarts est nulle'), correct: false } : { html: t('La droite des moindres carrés est {line}', { line: fmtLine({ ...d, a0: d.a1, a1: d.a0 }) }), correct: false },
      ],
      solution: [{ html: t('AᵀA = {M}, Aᵀy = {v} : a₀ = {a0}, a₁ = {a1}. Les points ne sont pas alignés : aucune droite ne passe par tous.', { M: `[[${fq(d.s0)}, ${fq(d.s1)}], [${fq(d.s1)}, ${fq(d.s2)}]]`, v: `(${fq(d.sy)} ; ${fq(d.sxy)})`, a0: fq(d.a0), a1: fq(d.a1) }), note: '' }],
    }, rng),
  });
  return codeItem({
    skill: LS, level: 5, ref: LSQ, blanks: holesFor(5, LSQ), traps: TRAPS, preludes: ['vec', 'mat'], rng,
    prompt: t('Complète les moindres carrés de l\'examen 2021 (traduits de Matlab) : lsq ajuste n fonctions de base max(0, x − i/(n + 1)), lsq_line une droite.'),
    tests: TESTS, then, hints: [], subgoals: SUB, key: `5:${d.xs}:${d.ys}`, fallback: d.fallback,
  });
}

function lsMcq(rng, opts) {
  if (rng.chance(0.5)) {
    return codeMcq({
      skill: LS, ref: LSQ, hole: 1, traps: TRAPS, fillers: FILLERS, key: 'alpha', exam: examTag(opts),
      prompt: t('Moindres carrés (examen 2021) : mat a une ligne par donnée et une colonne par fonction de base.'),
    }, rng);
  }
  return codeMcq({
    skill: LS, ref: LSQ, hole: 0, traps: TRAPS, fillers: FILLERS, key: 'mat', exam: examTag(opts),
    prompt: t('Moindres carrés (examen 2021) : la matrice A a pour coefficients Aⱼᵢ = φᵢ(xⱼ), une ligne par donnée.'),
  }, rng);
}

function lsTf(rng, opts) {
  return tfItem({
    skill: LS, level: 4, key: 'nopoint', exam: examTag(opts), truth: false,
    statement: t('La droite des moindres carrés de 3 points (ou plus) passe toujours par au moins un des points.'),
    counter: { kind: 'num', prop: 'lsNoPoint', params: {}, ask: [{ v: 'pts', label: t('Points (x ; y), séparés par des virgules :') }], answer: { pts: '(0 ; 0), (1 ; 1), (2 ; 0)' } },
    explanation: t('Faux : pour (0 ; 0), (1 ; 1), (2 ; 0), la droite est y = 1/3, qui ne passe par aucun des points.'),
  });
}

function lsCoef(rng, opts) {
  const d = lsData(rng, { basis: 'x' });
  const v = String(d.a1);
  const item = linesItem({
    skill: LS, level: 4, mode: 'free', keys: KEYS, noHints: true, exam: examTag(opts),
    prompt: t('Droite des moindres carrés y = a₀ + a₁x des points {pts}. Donne a₁.', { pts: ptsText(d) }),
    start: 'a_1', judge: { kind: 'value', expect: v, form: 'irreducible' },
    script: [{ kind: 'eq', math: v, note: `AᵀA = [[${fq(d.s0)}, ${fq(d.s1)}], [${fq(d.s1)}, ${fq(d.s2)}]], Aᵀy = (${fq(d.sy)} ; ${fq(d.sxy)})` }],
    subgoals: SUB, key: `${LS}:coef:${d.xs}:${d.ys}`, fallback: d.fallback, expectedSec: 180,
  });
  item.final = { form: 'any', askCoef: { label: 'a_1' } };
  return item;
}

export const GEN = {
  [LS]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return lsMcq(rng, opts);
    if (opts.exam === 'tf') return lsTf(rng, opts);
    if (opts.exam === 'coef') return lsCoef(rng, opts);
    if (level <= 4) return lsLines(rng, level);
    return ls5(rng);
  },
};

export { mcqDistinct };
