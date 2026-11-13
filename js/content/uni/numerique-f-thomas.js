// n-thomas (module N, part f, step U9): the tridiagonal LU of Thomas, in
// place, as in the programs of the MT exams (exam1.m 2019 and 2022, here
// in Python with indices from 0). Catalogue:
// docs/universite/N-analyse-numerique.md, n-thomas.
//
// The `code` item is the heart of the skill: L1 one line of the program as
// a multiple choice (the exam options), L2 one hole to type (or, half the
// time, ℓ₂ and γ₂ by hand, guided), L3 the three holes of the
// factorisation or the two of the substitutions, L4 the seven holes, L5 the
// seven holes alone, then a table of costs to read. By hand: N = 3 or 4,
// a whole diagonal in [2 ; 5], sub- and super-diagonals in {−1, 1, 2}, a
// whole solution, every ℓᵢ ≠ 0, denominators ≤ 12.
// Exam: mcq (one line of the program, options of 2019/2022 and the traps),
// tf (the cost O(N), the shape of L and U).

import { Q } from '../../math/rational.js';
import { linesItem, examTag } from './kit.js';
import {
  refCode, codeItem, codeMcq, readtableItem, multiMcq, vfMcq, H, blankBy, fmt,
} from './numerique-kit.js';
import { t } from '../../i18n.js';

const TH = 'n-thomas';
const SUB = [
  { id: 'factor', label: t('factorisation ℓ, γ'), skill: TH },
  { id: 'forward', label: t('descente Ly = b'), skill: TH },
  { id: 'backward', label: t('remontée Ux = y'), skill: TH },
  { id: 'lu', label: t('LU sans pivot'), skill: 'n-lu' },
];

export const THOMAS = refCode(`def thomas(a, c, d, b):
    # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    N = len(a)
    c[0] = c[0] / «a[0]»
    for i in range(1, N - 1):
        a[i] = a[i] - «d[i - 1] * c[i - 1]»
        c[i] = c[i] / «a[i]»
    a[N - 1] = a[N - 1] - «d[N - 2] * c[N - 2]»
    # L y = b
    b[0] = b[0] / «a[0]»
    for i in range(N - 1):
        b[i + 1] = (b[i + 1] - «d[i] * b[i]») / a[i + 1]
    # U x = y
    for i in range(N - 2, -1, -1):
        b[i] = b[i] - «c[i] * b[i + 1]»
    return b
`);

// The wrong texts of each hole (traps), and options without a trap.
export const THOMAS_TRAPS = {
  1: [{ text: 'd[i] * c[i]', rule: 'n_thomas_index_shift' }],
  2: [{ text: 'a[i - 1]', rule: 'n_thomas_index_shift' }],
  3: [{ text: '0', rule: 'n_thomas_forget_last' }, { text: 'd[N - 1] * c[N - 1]', rule: 'n_thomas_index_shift' }],
  5: [{ text: 'c[i] * b[i]', rule: 'n_thomas_lu_roles' }, { text: 'd[i - 1] * b[i - 1]', rule: 'n_thomas_index_shift' }],
  6: [{ text: 'd[i] * b[i + 1]', rule: 'n_thomas_lu_roles' }],
};
export const THOMAS_FILLERS = {
  0: ['c[0]', 'd[0]', 'b[0]'],
  1: ['b[i - 1] * c[i - 1]', 'b[i - 1] * d[i - 1]'],
  2: ['d[i]', 'c[i - 1]'],
  3: ['c[N - 2] * c[N - 2]'],
  4: ['b[0] * a[0]', 'd[0]'],
  5: ['d[i] * a[i]'],
  6: ['c[i] * d[i]', 'a[i] * b[i + 1]'],
};
export const THOMAS_TESTS = [
  { expr: 'thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1])', expect: '[1, 1, 1]', tol: 1e-12 },
  { expr: 'thomas([3, 3], [-1], [-1], [2, 2])', expect: '[1, 1]', tol: 1e-12 },
  { expr: 'thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19])', expect: '[1, 2, 3, 4]', tol: 1e-12 },
];
const LABEL = {
  0: 'γ₁ = c₁/ℓ₁', 1: 'ℓᵢ = aᵢ − dᵢ₋₁γᵢ₋₁', 2: 'γᵢ = cᵢ/ℓᵢ', 3: 'ℓ_N = a_N − d_(N−1)γ_(N−1)', 4: 'y₁ = b₁/ℓ₁', 5: t('la descente'), 6: t('la remontée'),
};

const MATRIX_NOTE = t('A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l\'inconnue de la ligne i).');

// ---------- data by hand ----------

function handData(rng) {
  for (let tries = 0; tries < 300; tries++) {
    const N = rng.pick([3, 3, 4]);
    const a = Array.from({ length: N }, () => rng.int(2, 5));
    const c = Array.from({ length: N - 1 }, () => rng.pick([-1, 1, 2]));
    const d = Array.from({ length: N - 1 }, () => rng.pick([-1, 1, 2]));
    const x = Array.from({ length: N }, () => rng.int(-3, 3));
    if (x.every((v) => v === 0)) continue;
    const b = x.map((xi, i) => a[i] * xi + (i > 0 ? d[i - 1] * x[i - 1] : 0) + (i < N - 1 ? c[i] * x[i + 1] : 0));
    const l = [new Q(a[0])];
    const g = [];
    let ok = true;
    for (let i = 0; i < N; i++) {
      if (i > 0) l[i] = new Q(a[i]).sub(new Q(d[i - 1]).mul(g[i - 1]));
      if (l[i].n === 0) { ok = false; break; }
      if (i < N - 1) g[i] = new Q(c[i]).div(l[i]);
    }
    if (!ok || [...l, ...g].some((v) => v.d > 12)) continue;
    const y = [];
    for (let i = 0; i < N; i++) y[i] = new Q(b[i]).sub(i > 0 ? new Q(d[i - 1]).mul(y[i - 1]) : new Q(0)).div(l[i]);
    if (y.some((v) => v.d > 12) || g[0].eq(g[1] ?? new Q(99))) continue;
    return { N, a, c, d, x, b, l, g, y };
  }
  const l = [new Q(2), new Q(3, 2), new Q(4, 3)];
  const g = [new Q(-1, 2), new Q(-2, 3)];
  return { N: 3, a: [2, 2, 2], c: [-1, -1], d: [-1, -1], x: [1, 1, 1], b: [1, 0, 1], l, g, y: [new Q(1, 2), new Q(1, 3), new Q(1)], fallback: true };
}
const triText = (D) => `a = (${D.a.join(' ; ')}), c = (${D.c.join(' ; ')}), d = (${D.d.join(' ; ')})`.replace(/-/g, '−');
const p = (v) => (v < 0 ? `(${v})` : `${v}`);
const pq = (v) => (v.n < 0 ? `(${v})` : `${v}`);

// L2 by hand: ℓ₂ and γ₂, guided.
function handLines(rng, level) {
  const D = handData(rng);
  const l2 = D.l[1];
  const g2 = D.g[1] ?? null;
  const script = [{ kind: 'eq', math: String(l2), ...blankBy(String(l2), [String(l2)]), note: 'ℓ₂ = a₂ − d₁γ₁', subgoal: 'factor' }];
  if (g2) {
    script.push(
      { kind: 'segment', html: t('Puis γ₂ = c₂/ℓ₂.'), ask: 'γ₂ =', start: { math: `${D.c[1]}/(${l2})` }, judge: { kind: 'value', form: 'irreducible' } },
      { kind: 'eq', math: String(g2), ...blankBy(String(g2), [String(g2)]), note: 'γ₂', subgoal: 'factor' },
    );
  }
  return linesItem({
    skill: TH, level, mode: 'guided', keys: ['calc'],
    prompt: g2
      ? t('Algorithme de Thomas pour la matrice tridiagonale de diagonale a, sur-diagonale c et sous-diagonale d : {D}. On a γ₁ = c₁/a₁ = {g1}. Calcule ℓ₂ = a₂ − d₁γ₁, puis γ₂ = c₂/ℓ₂.', { D: triText(D), g1: fmt(D.g[0]) })
      : t('Algorithme de Thomas pour la matrice tridiagonale de diagonale a, sur-diagonale c et sous-diagonale d : {D}. On a γ₁ = c₁/a₁ = {g1}. Calcule ℓ₂ = a₂ − d₁γ₁.', { D: triText(D), g1: fmt(D.g[0]) }),
    start: `${D.a[1]}-(${D.d[0]})×(${D.g[0]})`,
    judge: { kind: 'value', form: 'irreducible' },
    script,
    hints: H(t('Gauss sur une tridiagonale : la ligne i n\'élimine qu\'un coefficient, celui de la ligne au-dessus.'),
      `ℓ₂ = ${D.a[1]} − ${p(D.d[0])}·□`.replace(/-/g, '−'),
      `ℓ₂ = ${D.a[1]} − ${p(D.d[0])}·${pq(D.g[0])} = ${fmt(l2)}${g2 ? `, γ₂ = ${D.c[1]}/(${l2}) = ${fmt(g2)}` : ''}.`.replace(/-/g, '−')),
    subgoals: SUB, key: `${TH}:hand:${triText(D)}`, baits: [], fallback: D.fallback,
  });
}

// ---------- the program ----------

const CHOICE_HOLES = [1, 5, 6, 1, 5, 6, 3, 2];

function codeLevel(rng, level, opts = {}) {
  let blanks;
  let choice;
  if (level <= 2) {
    const k = rng.pick(level === 1 ? CHOICE_HOLES : [0, 1, 2, 3, 4, 5, 6]);
    blanks = [k];
    choice = level === 1 ? k : undefined;
  } else if (level === 3) blanks = rng.chance(0.5) ? [1, 2, 3] : [5, 6];
  else blanks = [0, 1, 2, 3, 4, 5, 6];
  const one = blanks.length === 1 ? LABEL[blanks[0]] : null;
  const then = level === 5 ? costTable(rng, 5) : null;
  return codeItem({
    skill: TH, level, ref: THOMAS, blanks, choice, traps: THOMAS_TRAPS, fillers: THOMAS_FILLERS, rng,
    prompt: one
      ? (level === 1
        ? t('Choisis la ligne de {one} de l\'algorithme de Thomas, en place. {note}', { one, note: MATRIX_NOTE })
        : t('Complète la ligne de {one} de l\'algorithme de Thomas, en place. {note}', { one, note: MATRIX_NOTE }))
      : blanks.length === 7 ? t('Complète tous les trous de l\'algorithme de Thomas, en place. {note}', { note: MATRIX_NOTE })
        : blanks[0] === 5 ? t('Complète la descente et la remontée de l\'algorithme de Thomas, en place. {note}', { note: MATRIX_NOTE })
          : t('Complète la factorisation de l\'algorithme de Thomas, en place. {note}', { note: MATRIX_NOTE }),
    tests: THOMAS_TESTS, then,
    hints: H(t('Fais Gauss sur une tridiagonale : chaque ligne n\'élimine qu\'un coefficient, celui de la ligne d\'au-dessus. L contient d (descente), U contient c (remontée).'),
      'ℓᵢ = aᵢ − dᵢ₋₁·□ ; yᵢ₊₁ = (bᵢ₊₁ − dᵢ·□)/ℓᵢ₊₁ ; xᵢ = yᵢ − γᵢ·□',
      'a[i] − d[i − 1] * c[i − 1] ; b[i + 1] − d[i] * b[i] ; b[i] − c[i] * b[i + 1]'),
    subgoals: SUB, key: `${level}:${blanks.join('')}`, ...opts,
  });
}

// Costs of Thomas and of a full LU (L5 and the readtable).
function costTable(rng, level) {
  const Ns = [10, 100, 1000, 10000];
  const fmtN = (x) => x.toExponential(1).replace('e+', 'e+0').replace(/e\+0(\d\d)/, 'e+$1');
  const table = {
    columns: ['N', 'Thomas (≈ 8N)', t('LU pleine (≈ 2N³/3)')],
    rows: Ns.map((N) => [String(N), fmtN(8 * N), fmtN((2 * N ** 3) / 3)]),
  };
  return readtableItem({
    skill: TH, level, key: 'costs',
    prompt: t('Nombre d\'opérations pour résoudre un système tridiagonal N × N :'),
    table,
    question: multiMcq({
      skill: TH, level, key: `${TH}:costs`,
      prompt: t('Que montre ce tableau ?'),
      options: [
        { html: t('Quand N est multiplié par 10, le coût de Thomas est multiplié par 10 : O(N)'), correct: true },
        { html: t('Pour N = 1000, la LU pleine coûte environ 80 000 fois plus que Thomas'), correct: true },
        { html: t('Thomas coûte O(N³), comme la LU pleine'), correct: false },
        { html: t('Quand N est multiplié par 10, le coût de Thomas est multiplié par 1000'), correct: false },
      ],
      solution: [{ html: t('Chaque ligne demande quelques opérations (une élimination, une division, la descente et la remontée) : environ 8N en tout, contre 2N³/3 pour une LU qui ignore les zéros. Pour N = 1000 : 8·10³ contre 6,7·10⁸.'), note: '' }],
    }, rng),
  });
}

// ---------- exam ----------

function examMcq(rng, opts) {
  const k = rng.pick([1, 5, 6, 1, 5, 6, 2, 3]);
  return codeMcq({
    skill: TH, ref: THOMAS, hole: k, traps: THOMAS_TRAPS, fillers: THOMAS_FILLERS, key: `hole${k}`, exam: examTag(opts),
    prompt: t('La fonction Python ci-dessous résout Ax = b par la LU tridiagonale (algorithme de Thomas), en place. {MATRIX_NOTE}', { MATRIX_NOTE }),
  }, rng);
}

function examTf(rng, opts) {
  const tag = examTag(opts);
  const k = rng.int(0, 2);
  if (k === 0) {
    return { ...vfMcq({ skill: TH, key: `${TH}:tf:cost`, exam: tag, statement: t('Résoudre un système tridiagonal N × N par la factorisation LU coûte O(N³) opérations.'), truth: false, explanation: t('Faux : L et U sont bidiagonales, chaque ligne coûte quelques opérations : environ 8N, donc O(N).') }, rng) };
  }
  if (k === 1) {
    return vfMcq({ skill: TH, key: `${TH}:tf:shape`, exam: tag, statement: t('Si A est tridiagonale et admet une factorisation LU sans pivot, alors L et U sont bidiagonales.'), truth: true, explanation: t('Vrai : l\'élimination de la ligne i n\'utilise que la ligne i − 1 ; aucun nouveau coefficient non nul n\'apparaît (pas de remplissage).') }, rng);
  }
  return vfMcq({ skill: TH, key: `${TH}:tf:place`, exam: tag, statement: t('Dans l\'algorithme de Thomas en place, après la remontée, le tableau b contient la solution x.'), truth: true, explanation: t('Vrai : b devient y pendant la descente, puis x pendant la remontée.') }, rng);
}

export const GEN = {
  [TH]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return examMcq(rng, opts);
    if (opts.exam === 'tf') return examTf(rng, opts);
    if (level === 2 && rng.chance(0.5)) return handLines(rng, 2);
    return codeLevel(rng, level);
  },
};
