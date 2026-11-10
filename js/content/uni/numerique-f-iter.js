// n-iter-jacobi-gs and n-iter-convergence (module N, part f, step U9):
// Jacobi and Gauss-Seidel by hand (tables judged from the student's own
// rows, js/judges/iter-num.js phi 'jacobi' | 'gs'), the iteration matrix
// B_J, its spectral radius, the stopping test on the residual. Catalogue:
// docs/universite/N-analyse-numerique.md.
//
// n-iter-jacobi-gs: A 3 × 3 with a diagonal in {2, 4, 5, 8}, the other
// entries in {−1, 0, 1}, a whole solution x*, b = Ax*, x⁽⁰⁾ = 0, two
// iterations with denominators ≤ 512. L1 a table, the first component
// given; L2 one iteration; L3 the components of x⁽²⁾ one by one, choosing
// the old or the new values; L4 two iterations of each method, then the
// criterion; L5 the program (jacobi_step, gs_step), then a table of errors.
// Exam: tf (Jacobi converges but not Gauss-Seidel: counter-example).
// n-iter-convergence: A = [[a, b], [b, d]] with ρ(B_J) = |b|/√(ad)
// rational. L1–L2 B_J guided, then ρ; L3 the criterion, ρ_J, ρ_GS; L4 ρ_J,
// ρ_GS and the number of iterations for a factor 10⁻⁶ (log₁₀ ρ given);
// L5 the program jacobi_solve, then the table of iteration counts of the
// GM series 10 (recomputed: b = A·(1, …, 1), ‖r‖/‖b‖ ≤ 10⁻¹⁰).
// Exam: tf (‖B‖ ≥ 1 does not imply divergence; a small residual).

import { Q } from '../../math/rational.js';
import { linesItem, mcq, tfItem, examTag } from './kit.js';
import { mt, MLm, ML, matLines, withCells } from './alglin-kit.js';
import {
  refCode, codeItem, readtableItem, multiMcq, vfMcq, iterTable, H, fmt, expText, blankBy, PRELUDE_VEC, PRELUDE_MAT,
} from './numerique-kit.js';
import { referenceRows, fv } from '../../judges/iter-num.js';

const JG = 'n-iter-jacobi-gs';
const CV = 'n-iter-convergence';
const SUB_J = [
  { id: 'jacobi', label: 'une itération de Jacobi', skill: JG },
  { id: 'gs', label: 'une itération de Gauss-Seidel', skill: JG },
  { id: 'criterion', label: 'diagonale dominante', skill: JG },
  { id: 'rows', label: 'une ligne du système', skill: 'l-sys-augmented' },
];
const SUB_C = [
  { id: 'B', label: 'B_J = I − D⁻¹A', skill: CV },
  { id: 'rho', label: 'ρ(B) par les valeurs propres', skill: 'l-eig-charpoly' },
  { id: 'stop', label: 'résidu et κ(A)', skill: 'm-cond' },
  { id: 'iter', label: 'Jacobi et Gauss-Seidel', skill: JG },
];
const R = (s) => String(s).replace(/-/g, '−');
const pq = (x) => (fv(x) < 0 ? `(${x})` : `${x}`);

// ---------- data: n-iter-jacobi-gs ----------

function jgData(rng) {
  for (let t = 0; t < 300; t++) {
    const tri = rng.chance(0.5);
    const A = [0, 1, 2].map((i) => [0, 1, 2].map((j) => {
      if (i === j) return rng.pick([2, 4, 5, 8]);
      if (tri && Math.abs(i - j) > 1) return 0;
      return rng.pick([-1, 0, 1, -1, 1]);
    }));
    const weak = A.some((r, i) => Math.abs(r[i]) <= r.reduce((s, x, j) => s + (j === i ? 0 : Math.abs(x)), 0));
    if (weak && !rng.chance(0.25)) continue;
    if (A.every((r, i) => r.every((x, j) => i === j || x === 0))) continue;
    // Not strictly dominant: only when Jacobi still converges.
    const x = [0, 1, 2].map(() => rng.int(-2, 3));
    if (x.every((v) => v === 0)) continue;
    const b = A.map((r) => r.reduce((s, a, j) => s + a * x[j], 0));
    const phiJ = { kind: 'jacobi', A: A.map((r) => r.map(String)), b: b.map(String), x0: ['0', '0', '0'] };
    const phiG = { ...phiJ, kind: 'gs' };
    const J = referenceRows(phiJ, 3);
    const G = referenceRows(phiG, 3);
    const vals = [...J, ...G].flatMap((r) => [r.x1, r.x2, r.x3]);
    if (vals.some((v) => !(v instanceof Q) || v.d > 512)) continue;
    // Jacobi and Gauss-Seidel must differ at the first step.
    if (['x2', 'x3'].every((k) => J[1][k].eq(G[1][k]))) continue;
    if (weak && rho(A, 'jacobi') >= 1) continue;
    return { A, b, x, phiJ, phiG, J, G, weak };
  }
  const A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]];
  const b = [3, 2, 3];
  const phiJ = { kind: 'jacobi', A: A.map((r) => r.map(String)), b: b.map(String), x0: ['0', '0', '0'] };
  const phiG = { ...phiJ, kind: 'gs' };
  return { A, b, x: [1, 1, 1], phiJ, phiG, J: referenceRows(phiJ, 3), G: referenceRows(phiG, 3), weak: false, fallback: true };
}

// ρ of the iteration matrix (numerical, 3 × 3: power iterations on B).
function rho(A, kind) {
  const n = A.length;
  // B = I − P⁻¹A applied to v.
  const apply = (v) => {
    const y = v.slice();
    const out = [];
    for (let i = 0; i < n; i++) {
      let s = 0;
      for (let j = 0; j < n; j++) if (j !== i) s -= A[i][j] * (kind === 'gs' && j < i ? out[j] : v[j]);
      out[i] = s / A[i][i];
      y[i] = out[i];
    }
    return out;
  };
  let v = [1, 0.7, 0.3].slice(0, n);
  let r = 0;
  for (let k = 0; k < 400; k++) {
    const w = apply(v);
    const nw = Math.hypot(...w);
    if (nw === 0) return 0;
    r = nw / Math.hypot(...v);
    v = w.map((x) => x / nw);
  }
  return r;
}

const Atext = (d) => MLm(d.A);
const vecR = (v) => R(`(${v.join(' ; ')})`);
const COLS = [{ id: 'x1', label: 'x₁' }, { id: 'x2', label: 'x₂' }, { id: 'x3', label: 'x₃' }, { id: 'res', label: '‖b − Ax‖∞', auto: true }];

function jgTable(d, level, kind, { rows = 2, given = (k, id) => k === 0, then = null, exam = false } = {}) {
  const phi = { ...(kind === 'gs' ? d.phiG : d.phiJ), tol: 1e-9 };
  const name = kind === 'gs' ? 'Gauss-Seidel' : 'Jacobi';
  return iterTable({
    skill: JG, level, key: `${kind}:${level}:${mt(d.A)}:${d.b.join(',')}`, n: rows, cols: COLS, phi, given,
    prompt: `Méthode de ${name} pour Ax = b, A = ${Atext(d)}, b = ${vecR(d.b)}, à partir de x⁽⁰⁾ = 0. ${rows === 2 ? 'Calcule x⁽¹⁾' : 'Calcule x⁽¹⁾ et x⁽²⁾'} (fractions exactes) ; l'app calcule le résidu.`,
    then, exam,
    hints: H(`Ligne i : isole xᵢ ; ${kind === 'gs' ? 'utilise les composantes déjà calculées de l\'itération en cours (Gauss-Seidel)' : 'les autres xⱼ viennent de l\'itération précédente (Jacobi)'}.`,
      `x₂⁽¹⁾ = (${d.b[1]} − (${d.A[1][0]})·□ − (${d.A[1][2]})·□)/${d.A[1][1]}`.replace(/-/g, '−'),
      `x⁽¹⁾ = ${vecR(['x1', 'x2', 'x3'].map((k) => (kind === 'gs' ? d.G : d.J)[1][k]))}.`),
    subgoals: SUB_J, baits: kind === 'jacobi' ? ['n_jacobi_uses_new'] : [], fallback: d.fallback,
  });
}

// The component i of x⁽ᵏ⁺¹⁾, written out from x⁽ᵏ⁾ (and the new ones).
function compLine(d, i, oldX, newX, kind) {
  const pp = (v) => (fv(v) < 0 || String(v).includes('/') ? `(${v})` : `${v}`);
  const terms = [0, 1, 2].filter((j) => j !== i && d.A[i][j] !== 0).map((j) => {
    const v = pp(kind === 'gs' && j < i ? newX[j] : oldX[j]);
    const a = d.A[i][j];
    return a === 1 ? `-${v}` : a === -1 ? `+${v}` : `-(${a})×${v}`;
  });
  return `(${d.b[i]}${terms.join('')})/${d.A[i][i]}`;
}

function jgLevel3(rng) {
  const d = jgData(rng);
  const kind = rng.pick(['jacobi', 'gs']);
  const ref = kind === 'gs' ? d.G : d.J;
  // x⁽¹⁾ given (by the same method), x⁽²⁾ asked.
  const x1 = ['x1', 'x2', 'x3'].map((k) => ref[1][k]);
  const x2 = ['x1', 'x2', 'x3'].map((k) => ref[2][k]);
  const menu = (i) => [
    { id: 'old', label: 'Avec les valeurs de x⁽¹⁾ (itération précédente)', valid: kind === 'jacobi' || i === 0, why: 'Gauss-Seidel utilise déjà les composantes de x⁽²⁾ calculées au-dessus.' },
    { id: 'new', label: 'Avec les composantes de x⁽²⁾ déjà calculées', valid: kind === 'gs' && i > 0, why: i === 0 ? 'Aucune composante de x⁽²⁾ n\'est encore calculée.' : 'Jacobi n\'utilise que les valeurs de l\'itération précédente.' },
    { id: 'all', label: 'Avec la solution exacte x', valid: false, why: 'On ne la connaît pas : c\'est ce qu\'on cherche.' },
  ];
  const script = [];
  [0, 1, 2].forEach((i) => {
    if (i > 0) script.push({ kind: 'segment', html: `x${'₁₂₃'[i]}⁽²⁾ :`, ask: `x${'₁₂₃'[i]}⁽²⁾ =`, start: { math: `x_${i + 1}` }, judge: { kind: 'value', expect: String(x2[i]), form: 'irreducible', menu: menu(i) } });
    script.push({ kind: 'eq', math: compLine(d, i, x1, x2, kind), note: `Ligne ${i + 1}, isolée`, subgoal: kind === 'gs' ? 'gs' : 'jacobi' });
    script.push({ kind: 'eq', math: String(x2[i]), note: '', subgoal: kind === 'gs' ? 'gs' : 'jacobi' });
  });
  const name = kind === 'gs' ? 'Gauss-Seidel' : 'Jacobi';
  return linesItem({
    skill: JG, level: 3, mode: 'tap', tapActions: 'menu', keys: ['calc'],
    prompt: `Méthode de ${name} pour A = ${Atext(d)}, b = ${vecR(d.b)}. On a x⁽¹⁾ = ${vecR(x1)}. Calcule x⁽²⁾ composante par composante : choisis d'abord quelles valeurs utiliser.`,
    start: 'x_1', judge: { kind: 'value', expect: String(x2[0]), form: 'irreducible', menu: menu(0) },
    script,
    hints: H('Ligne i : isole xᵢ ; Jacobi prend les autres composantes dans x⁽¹⁾, Gauss-Seidel prend les plus récentes.',
      `x₂⁽²⁾ = (${d.b[1]} − (${d.A[1][0]})·□ − (${d.A[1][2]})·□)/${d.A[1][1]}`.replace(/-/g, '−'),
      `x⁽²⁾ = ${vecR(x2)}.`),
    subgoals: SUB_J, key: `${JG}:3:${kind}:${mt(d.A)}:${d.b}`, baits: ['n_jacobi_uses_new'], fallback: d.fallback,
  });
}

function criterionMcq(rng, d, level) {
  const sums = d.A.map((r, i) => r.reduce((s, x, j) => s + (j === i ? 0 : Math.abs(x)), 0));
  const bad = d.A.findIndex((r, i) => Math.abs(r[i]) <= sums[i]);
  const ok = bad < 0;
  return mcq({
    skill: JG, level, key: `${JG}:crit:${mt(d.A)}`,
    prompt: `A = ${Atext(d)}. Que dit le critère de la diagonale strictement dominante (par lignes) ?`,
    options: ok ? [
      { html: 'A est à diagonale strictement dominante : Jacobi et Gauss-Seidel convergent pour tout x⁽⁰⁾', correct: true },
      { html: 'Il faut aussi que A soit symétrique', correct: false },
      { html: 'Seule la méthode de Gauss-Seidel converge', correct: false },
      { html: 'On ne peut rien dire sans calculer la solution', correct: false },
    ] : [
      { html: `A n'est pas à diagonale strictement dominante (ligne ${bad + 1} : ${Math.abs(d.A[bad][bad])} contre ${sums[bad]}) : ce critère ne permet pas de conclure`, correct: true },
      { html: `|aᵢᵢ| ≥ Σ|aᵢⱼ| sur chaque ligne suffit : les deux méthodes convergent par ce critère`, correct: false, rule: 'n_diag_dominance' },
      { html: 'Les deux méthodes divergent', correct: false },
      { html: 'Seule la méthode de Jacobi converge', correct: false },
    ],
    solution: [{ html: `Il faut |aᵢᵢ| > Σ<sub>j≠i</sub> |aᵢⱼ| strictement, sur chaque ligne : ${d.A.map((r, i) => `${Math.abs(r[i])} ${Math.abs(r[i]) > sums[i] ? '>' : '≤'} ${sums[i]}`).join(', ')}.`, note: '' }],
  }, rng);
}

// ---------- the program ----------

export const JG_CODE = refCode(`def jacobi_step(A, b, x):
    n = len(A)
    y = zeros(n)
    for i in range(n):
        s = b[i]
        for j in range(n):
            if j != i:
                s = «s - A[i][j] * x[j]»
        y[i] = «s / A[i][i]»
    return y

def gs_step(A, b, x):
    n = len(A)
    for i in range(n):
        s = b[i]
        for j in range(n):
            if j != i:
                s = s - A[i][j] * x[j]
        x[i] = «s / A[i][i]»   # en place : les x[j], j < i, sont deja nouveaux
    return x
`);
const JG_SETUP = 'A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]]\nb = [3, 2, 3]';
const JG_TESTS = [
  { setup: JG_SETUP, expr: 'jacobi_step(A, b, [0.0, 0.0, 0.0])', expect: '[0.75, 0.5, 0.75]' },
  { setup: JG_SETUP, expr: 'jacobi_step(A, b, [0.75, 0.5, 0.75])', expect: '[0.875, 0.875, 0.875]' },
  { setup: JG_SETUP, expr: 'gs_step(A, b, [0.0, 0.0, 0.0])', expect: '[0.75, 0.6875, 0.921875]' },
];
const JG_TRAPS = { 0: [{ text: 's + A[i][j] * x[j]' }], 1: [{ text: 's / A[i][j]' }], 2: [{ text: 's * A[i][i]' }] };

function jgErrorTable(rng, level) {
  const A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]];
  const ones = [1, 1, 1];
  const b = A.map((r) => r.reduce((s, a, j) => s + a * ones[j], 0));
  const err = (kind) => {
    const rows = referenceRows({ kind, A: A.map((r) => r.map(String)), b: b.map(String), x0: ['0', '0', '0'], cols: ['x1', 'x2', 'x3'] }, 7);
    return rows.map((r) => Math.max(...['x1', 'x2', 'x3'].map((k) => Math.abs(fv(r[k]) - 1))));
  };
  const J = err('jacobi');
  const G = err('gs');
  const table = { columns: ['k', 'Jacobi ‖x⁽ᵏ⁾ − x‖∞', 'Gauss-Seidel ‖x⁽ᵏ⁾ − x‖∞'], rows: J.map((e, k) => [String(k), expText(e, 3), expText(G[k], 3)]) };
  return readtableItem({
    skill: JG, level, key: 'errors',
    prompt: `Les deux programmes, appelés pour A = tridiag(−1, 4, −1) de taille 3, b = ${vecR(b)} (solution (1 ; 1 ; 1)) et x⁽⁰⁾ = 0, donnent les erreurs :`,
    table,
    question: multiMcq({
      skill: JG, level, key: `${JG}:errors`,
      prompt: 'Que montre ce tableau ?',
      options: [
        { html: 'Les deux méthodes convergent, avec une erreur divisée par un facteur à peu près constant à chaque pas', correct: true },
        { html: 'Gauss-Seidel converge plus vite : son erreur décroît environ deux fois plus vite en échelle logarithmique', correct: true },
        { html: 'Jacobi converge plus vite, parce qu\'il n\'utilise que les anciennes valeurs', correct: false },
        { html: 'Les deux méthodes trouvent la solution exacte en 3 itérations (n = 3)', correct: false },
      ],
      solution: [{ html: `Rapports successifs : Jacobi ≈ ${(J[4] / J[3]).toFixed(2).replace('.', ',')}, Gauss-Seidel ≈ ${(G[4] / G[3]).toFixed(2).replace('.', ',')} = (rapport de Jacobi)² : ρ(B_GS) = ρ(B_J)² pour une matrice tridiagonale.`, note: '' }],
    }, rng),
  });
}

function jgCode(rng, level) {
  return codeItem({
    skill: JG, level, ref: JG_CODE, blanks: [0, 1, 2], traps: JG_TRAPS, rng,
    prompt: 'Complète une itération de Jacobi (dans un nouveau vecteur y) et une itération de Gauss-Seidel (en place dans x).',
    tests: JG_TESTS, then: jgErrorTable(rng, level), hints: [], subgoals: SUB_J, key: 'steps',
  });
}

function jgGen(level, rng, opts) {
  if (opts.exam === 'tf') return jgTf(rng, opts);
  if (level === 5) return jgCode(rng, 5);
  if (level === 3) return jgLevel3(rng);
  const d = jgData(rng);
  if (level === 1) return jgTable(d, 1, rng.pick(['jacobi', 'gs']), { given: (k, id) => k === 0 || id === 'x1' });
  if (level === 2) return jgTable(d, 2, rng.pick(['jacobi', 'gs']));
  const crit = criterionMcq(rng, d, 4);
  const gs = jgTable(d, 4, 'gs', { rows: 3, then: crit });
  const it = jgTable(d, 4, 'jacobi', { rows: 3, then: gs });
  it.baits = [...new Set([...it.baits, ...gs.baits, ...crit.baits])];
  return it;
}

function jgTf(rng, opts) {
  const tag = examTag(opts);
  const k = rng.int(0, 2);
  if (k === 0) {
    return tfItem({
      skill: JG, level: 4, key: 'jnotgs', exam: tag,
      statement: 'Si la méthode de Jacobi converge pour tout x⁽⁰⁾, alors la méthode de Gauss-Seidel converge aussi.',
      truth: false,
      counter: { kind: 'num', prop: 'jacobiNotGs', params: {}, ask: [{ v: 'A', label: 'A =', shape: [3, 3] }], answer: { A: '[[1,2,-2],[1,1,1],[2,2,1]]' } },
      explanation: 'Faux : pour A = [[1, 2, −2], [1, 1, 1], [2, 2, 1]], ρ(B_J) = 0 (Jacobi converge en 3 pas) mais ρ(B_GS) = 2.',
    });
  }
  if (k === 1) return vfMcq({ skill: JG, key: `${JG}:tf:dom`, exam: tag, statement: 'Si A est à diagonale strictement dominante par lignes, la méthode de Jacobi converge pour tout x⁽⁰⁾.', truth: true, ruleIfFalse: 'n_diag_dominance', explanation: 'Vrai : alors ‖B_J‖∞ = maxᵢ Σⱼ≠ᵢ |aᵢⱼ|/|aᵢᵢ| < 1.' }, rng);
  return vfMcq({ skill: JG, key: `${JG}:tf:new`, exam: tag, statement: 'Pour calculer xᵢ⁽ᵏ⁺¹⁾, la méthode de Jacobi utilise les composantes x₁⁽ᵏ⁺¹⁾, …, xᵢ₋₁⁽ᵏ⁺¹⁾ déjà calculées.', truth: false, ruleIfTrue: 'n_jacobi_uses_new', explanation: 'Faux : c\'est Gauss-Seidel. Jacobi n\'utilise que x⁽ᵏ⁾.' }, rng);
}

// ---------- n-iter-convergence ----------

let CVLIST = null;
function cvList() {
  if (CVLIST) return CVLIST;
  CVLIST = [];
  for (let a = 1; a <= 9; a++) for (let dd = 1; dd <= 9; dd++) for (let b = -8; b <= 8; b++) {
    if (!b || b * b >= a * dd) continue;
    const r2 = new Q(b * b, a * dd);
    const rn = r2.sqrt();
    if (!rn) continue;
    // Eigenvalues of A rational (for κ₂).
    const disc = (a - dd) ** 2 + 4 * b * b;
    const s = Math.round(Math.sqrt(disc));
    const kappa = s * s === disc ? new Q(a + dd + s, a + dd - s) : null;
    CVLIST.push({ a, d: dd, b, rho: rn, kappa, lmax: new Q(a + dd + s, 2), lmin: new Q(a + dd - s, 2) });
  }
  return CVLIST;
}
function cvData(rng, { kappa = false } = {}) {
  const list = cvList().filter((x) => (!kappa || x.kappa) && x.rho.d <= 9);
  const diff = list.filter((y) => y.a !== y.d);
  const x = rng.pick(diff.length && rng.chance(0.6) ? diff : list);
  const B = [[new Q(0), new Q(-x.b, x.a)], [new Q(-x.b, x.d), new Q(0)]];
  return { ...x, A: [[x.a, x.b], [x.b, x.d]], B, rhoGS: x.rho.mul(x.rho) };
}
const AofC = (d) => MLm(d.A);
const bText = (d) => mt(d.B);

function cvBSeg(d, cells) {
  return [
    withCells({ kind: 'eq', math: bText(d), note: `B_J = I − D⁻¹A, D = diag(${d.a}, ${d.d})`, subgoal: 'B' }, cells),
  ];
}

function cvLevel12(rng, level) {
  const d = cvData(rng);
  const r2 = d.rho.mul(d.rho);
  const script = [
    ...cvBSeg(d, level === 1 ? [[0, 1]] : [[0, 1], [1, 0]]),
    { kind: 'segment', html: 'Les valeurs propres de B_J vérifient λ² = b₁₂b₂₁ (det(B_J − λI) = λ² − b₁₂b₂₁).', ask: 'ρ(B_J) =', start: { math: 'ρ' }, judge: { kind: 'value', expect: String(d.rho), form: 'irreducible' } },
    ...(level === 2 ? [{ kind: 'eq', math: `√(${r2})`, note: `λ² = ${R(String(d.B[0][1]))}·${R(String(d.B[1][0]))} = ${r2}`, subgoal: 'rho' }] : []),
    { kind: 'eq', math: String(d.rho), ...blankBy(String(d.rho), [String(d.rho)]), note: `ρ = ${fmt(d.rho)} < 1 : Jacobi converge pour tout x⁽⁰⁾`, subgoal: 'rho' },
  ];
  return matLines({
    skill: CV, level, mode: 'guided',
    prompt: `A = ${AofC(d)}. Écris la matrice d'itération de Jacobi B_J = I − D⁻¹A, puis son rayon spectral ρ(B_J).`,
    start: 'B_J', judge: { kind: 'mat', expect: bText(d) }, script,
    hints: H('B_J = I − D⁻¹A : diagonale nulle, et −aᵢⱼ/aᵢᵢ hors de la diagonale.',
      `B_J = [[0, □], [□, 0]], avec D = diag(${d.a}, ${d.d})`,
      `B_J = ${ML(bText(d))}, ρ = ${fmt(d.rho)}.`),
    subgoals: SUB_C, key: `${CV}:${level}:${d.a},${d.b},${d.d}`,
  });
}

function cvLevel3(rng) {
  const d = cvData(rng, { kappa: true });
  const script = [
    { kind: 'decision', prompt: 'Quel critère dit si Jacobi converge pour tout x⁽⁰⁾ ?', options: rng.shuffle([
      { id: 'rho', label: 'ρ(B_J) < 1 (nécessaire et suffisant)', valid: true, ref: true },
      { id: 'norm', label: '‖B_J‖ < 1 pour une norme', valid: true, quality: 'poor', why: 'Juste, mais seulement suffisant : ρ(B) < 1 est le critère exact.' },
      { id: 'det', label: 'det A ≠ 0', valid: false, why: 'Cela dit seulement que la solution existe, pas que la méthode y converge.' },
    ]) },
    { kind: 'eq', math: String(d.rho), note: `λ² = ${fmt(d.rho.mul(d.rho))}, ρ = ${fmt(d.rho)} < 1`, subgoal: 'rho' },
    { kind: 'segment', html: 'Gauss-Seidel, pour une matrice 2 × 2 : ρ(B_GS) = ρ(B_J)².', ask: 'ρ(B_GS) =', start: { math: 'ρ_GS' }, judge: { kind: 'value', expect: String(d.rhoGS), form: 'irreducible', menu: [{ id: 'sq', label: 'Élever ρ(B_J) au carré', valid: true }, { id: 'half', label: 'Diviser ρ(B_J) par 2', valid: false, why: 'Gauss-Seidel va deux fois plus vite en nombre d\'itérations : ρ_GS = ρ_J².' }] } },
    { kind: 'eq', math: String(d.rhoGS), note: 'Deux fois moins d\'itérations', subgoal: 'iter' },
    { kind: 'segment', html: 'Arrêt sur le résidu : ‖e‖/‖x‖ ≤ κ₂(A)·‖r‖/‖b‖. A est SDP : κ₂ = λ_max/λ_min.', ask: 'κ₂(A) =', start: { math: 'κ' }, judge: { kind: 'value', expect: String(d.kappa), form: 'irreducible', menu: [{ id: 'ratio', label: 'λ_max/λ_min de A', valid: true }, { id: 'det', label: '1/det A', valid: false, why: 'κ(A) = ‖A‖·‖A⁻¹‖ ; pour A SDP, c\'est λ_max/λ_min.' }] } },
    { kind: 'eq', math: String(d.kappa), note: `Valeurs propres de A : ${fmt(d.lmax)} et ${fmt(d.lmin)}`, subgoal: 'stop' },
  ];
  return linesItem({
    skill: CV, level: 3, mode: 'tap', tapActions: 'menu', keys: ['calc', 'greek'],
    prompt: `A = ${AofC(d)}, B_J = I − D⁻¹A = ${ML(bText(d))}. Donne ρ(B_J), ρ(B_GS) et κ₂(A). Choisis d'abord chaque action.`,
    start: 'ρ_J', judge: { kind: 'value', expect: String(d.rho), form: 'irreducible', menu: [{ id: 'eig', label: 'Valeurs propres de B_J', valid: true }, { id: 'diag', label: 'La plus grande case de B_J', valid: false, why: 'ρ est le plus grand module des valeurs propres, pas des cases.' }] },
    script,
    hints: H('ρ(B) est le plus grand module des valeurs propres de B ; pour A SDP, κ₂ = λ_max/λ_min.',
      `λ² = ${R(String(d.B[0][1]))}·${R(String(d.B[1][0]))} = □`,
      `ρ_J = ${fmt(d.rho)}, ρ_GS = ${fmt(d.rhoGS)}, κ₂ = ${fmt(d.kappa)}.`),
    subgoals: SUB_C, key: `${CV}:3:${d.a},${d.b},${d.d}`,
  });
}

function cvLevel4(rng) {
  for (let t = 0; t < 100; t++) {
    const d = cvData(rng);
    const useGS = rng.chance(0.5);
    const r = useGS ? d.rhoGS : d.rho;
    const lg = Number(Math.log10(r.valueOf()).toFixed(4));
    const need = -6 / lg;
    if (need - Math.floor(need) < 0.05 || Math.ceil(need) - need < 0.05) continue;
    const k = Math.ceil(need);
    const script = [
      { kind: 'eq', math: String(d.rho), note: `λ² = ${fmt(d.rho.mul(d.rho))}`, subgoal: 'rho' },
      { kind: 'segment', html: 'Gauss-Seidel : ρ(B_GS) = ρ(B_J)² pour cette matrice 2 × 2.', ask: 'ρ(B_GS) =', start: { math: 'ρ_GS' }, judge: { kind: 'value', expect: String(d.rhoGS), form: 'irreducible' } },
      { kind: 'eq', math: String(d.rhoGS), note: '', subgoal: 'iter' },
      { kind: 'segment', html: `Nombre d'itérations de ${useGS ? 'Gauss-Seidel' : 'Jacobi'} pour diviser l'erreur par 10⁶ : ρᵏ ≤ 10⁻⁶ ⇔ k ≥ −6/log₁₀ ρ, avec log₁₀ ${fmt(r)} ≈ ${String(lg).replace('.', ',').replace('-', '−')}.`, ask: 'k =', start: { math: 'k' }, judge: { kind: 'value', expect: String(k), form: 'irreducible' } },
      { kind: 'eq', math: String(k), note: `−6/(${R(String(lg).replace('.', ','))}) ≈ ${need.toFixed(2).replace('.', ',')}`, subgoal: 'iter' },
    ];
    return linesItem({
      skill: CV, level: 4, mode: 'free', keys: ['calc', 'greek'],
      prompt: `A = ${AofC(d)}. Calcule ρ(B_J) pour Jacobi, puis ρ(B_GS), puis le nombre d'itérations nécessaires.`,
      start: 'ρ_J', judge: { kind: 'value', expect: String(d.rho), form: 'irreducible' }, script,
      hints: H('B_J = [[0, −b/a], [−b/d, 0]] : ses valeurs propres sont ±√(b²/(ad)).', `ρ_J = √(${d.b * d.b}/□)`, `ρ_J = ${fmt(d.rho)}, ρ_GS = ${fmt(d.rhoGS)}, k = ${k}.`),
      subgoals: SUB_C, key: `${CV}:4:${d.a},${d.b},${d.d}:${useGS}`,
    });
  }
  return cvLevel3(rng);
}

export const CV_CODE = refCode(`def jacobi_solve(A, b, x0, tol, nmax):
    x = x0
    r = zeros(len(b))
    Ax = matvec(A, x)
    for i in range(len(b)):
        r[i] = b[i] - Ax[i]
    k = 0
    while «norm(r) > tol * norm(b)» and k < nmax:
        x = jacobi_step(A, b, x)
        Ax = matvec(A, x)
        for i in range(len(b)):
            r[i] = «b[i] - Ax[i]»
        k = k + 1
    return [x, k]
`);
const JSTEP = `
def jacobi_step(A, b, x):
    n = len(A)
    y = zeros(n)
    for i in range(n):
        s = b[i]
        for j in range(n):
            if j != i:
                s = s - A[i][j] * x[j]
        y[i] = s / A[i][i]
    return y
`;
const CV_TESTS = [
  { setup: 'A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]]', expr: 'jacobi_solve(A, [3, 2, 3], [0.0, 0.0, 0.0], 1e-6, 1000)[1]', expect: '14' },
  { setup: 'A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]]', expr: 'jacobi_solve(A, [3, 2, 3], [0.0, 0.0, 0.0], 1e-6, 1000)[0]', expect: '[1, 1, 1]', tol: 1e-5 },
  { setup: 'A = [[2, 1], [1, 3]]', expr: 'jacobi_solve(A, [3, 4], [0.0, 0.0], 1e-12, 1000)[0]', expect: '[1, 1]', tol: 1e-10 },
];
const CV_TRAPS = { 0: [{ text: 'norm(r) < tol * norm(b)' }], 1: [{ text: 'b[i] + Ax[i]' }] };

// The table of the GM series 10, recomputed (b = A·(1, …, 1), x⁽⁰⁾ = 0,
// ‖r‖/‖b‖ ≤ 10⁻¹⁰).
function counts(n, diag, gs) {
  const A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? diag : Math.abs(i - j) === 1 ? -1 : 0)));
  const mv = (x) => A.map((r) => r.reduce((s, a, j) => s + a * x[j], 0));
  const b = mv(Array(n).fill(1));
  const nb = Math.hypot(...b);
  let x = Array(n).fill(0);
  let k = 0;
  const res = () => { const Ax = mv(x); return Math.hypot(...b.map((v, i) => v - Ax[i])) / nb; };
  while (res() > 1e-10 && k < 20000) {
    const y = x.slice();
    for (let i = 0; i < n; i++) { let s = b[i]; for (let j = 0; j < n; j++) if (j !== i) s -= A[i][j] * (gs ? y[j] : x[j]); y[i] = s / A[i][i]; }
    x = y;
    k++;
  }
  return k;
}
let COUNTS = null;
export function countsTable() {
  if (!COUNTS) {
    COUNTS = {
      columns: ['n', 'Jacobi, tridiag(−1, 2,5, −1)', 'GS, idem', 'Jacobi, tridiag(−1, 2, −1)', 'GS, idem'],
      rows: [4, 8, 16, 32].map((n) => [String(n), String(counts(n, 2.5, false)), String(counts(n, 2.5, true)), String(counts(n, 2, false)), String(counts(n, 2, true))]),
    };
  }
  return COUNTS;
}

function countsRead(rng, level) {
  return readtableItem({
    skill: CV, level, key: 'counts',
    prompt: 'Nombre d\'itérations pour atteindre ‖r‖/‖b‖ ≤ 10⁻¹⁰ (x⁽⁰⁾ = 0, b = A·(1, …, 1)), pour des matrices tridiagonales n × n :',
    table: countsTable(),
    question: multiMcq({
      skill: CV, level, key: `${CV}:counts`,
      prompt: 'Que peut-on en déduire ?',
      options: [
        { html: 'Gauss-Seidel demande environ deux fois moins d\'itérations que Jacobi', correct: true },
        { html: 'Pour tridiag(−1, 2, −1), le nombre d\'itérations croît comme n², car ρ_J = cos(π/(n + 1)) → 1', correct: true },
        { html: 'Pour tridiag(−1, 2,5, −1), ρ_J tend vers 0,8 et le nombre d\'itérations se stabilise', correct: true },
        { html: 'Le nombre d\'itérations ne dépend pas de n, puisque les deux matrices sont SDP', correct: false },
        { html: 'Un résidu ‖r‖/‖b‖ ≤ 10⁻¹⁰ garantit une erreur relative ≤ 10⁻¹⁰', correct: false, rule: 'n_residual_is_error' },
      ],
      solution: [{ html: 'ρ_GS = ρ_J² pour ces matrices tridiagonales : deux fois moins d\'itérations. Pour diagonale 2, ρ_J = cos(π/(n + 1)) ≈ 1 − π²/(2n²) : le nombre d\'itérations ~ n². Pour diagonale 2,5, ρ_J = (2/2,5)cos(π/(n + 1)) → 0,8. L\'erreur relative n\'est bornée que par κ(A)·10⁻¹⁰.', note: '' }],
    }, rng),
  });
}

function cvCode(rng) {
  return codeItem({
    skill: CV, level: 5, ref: CV_CODE, blanks: [0, 1], traps: CV_TRAPS, rng,
    preludes: ['vec', 'mat', JSTEP], signatures: undefined,
    prompt: 'Complète la boucle de Jacobi : elle s\'arrête quand le résidu relatif ‖r‖/‖b‖ passe sous tol (ou après nmax itérations). jacobi_step(A, b, x) est donnée.',
    tests: CV_TESTS, then: countsRead(rng, 5), hints: [], subgoals: SUB_C, key: 'solve',
  });
}

function cvTf(rng, opts) {
  const tag = examTag(opts);
  const k = rng.int(0, 2);
  if (k === 0) {
    return tfItem({
      skill: CV, level: 4, key: 'norm', exam: tag, ruleIfTrue: 'n_norm_vs_radius',
      statement: 'Si ‖B‖ ≥ 1 pour une norme matricielle subordonnée, la méthode itérative de matrice B diverge pour certains x⁽⁰⁾.',
      truth: false,
      counter: { kind: 'num', prop: 'normNotRadius', params: {}, ask: [{ v: 'B', label: 'B =', shape: [2, 2] }], answer: { B: '[[1/2,4],[0,1/2]]' } },
      explanation: 'Faux : ‖B‖ < 1 suffit mais n\'est pas nécessaire. B = [[1/2, 4], [0, 1/2]] a ‖B‖∞ = 4,5 mais ρ(B) = 1/2 < 1 : la méthode converge.',
    });
  }
  if (k === 1) return vfMcq({ skill: CV, key: `${CV}:tf:res`, exam: tag, statement: 'Si le résidu relatif ‖b − Ax⁽ᵏ⁾‖/‖b‖ est petit, l\'erreur relative ‖x − x⁽ᵏ⁾‖/‖x‖ est petite.', truth: false, ruleIfTrue: 'n_residual_is_error', explanation: 'Faux : ‖e‖/‖x‖ ≤ κ(A)·‖r‖/‖b‖. Si κ(A) est grand (matrice de Vandermonde, de Hilbert), un petit résidu peut cacher une grande erreur.' }, rng);
  return vfMcq({ skill: CV, key: `${CV}:tf:rho`, exam: tag, statement: 'La méthode x⁽ᵏ⁺¹⁾ = Bx⁽ᵏ⁾ + c converge vers la solution pour tout x⁽⁰⁾ si et seulement si ρ(B) < 1.', truth: true, ruleIfFalse: 'n_norm_vs_radius', explanation: 'Vrai : l\'erreur vérifie e⁽ᵏ⁾ = Bᵏe⁽⁰⁾, et Bᵏ → 0 ⇔ ρ(B) < 1.' }, rng);
}

function cvGen(level, rng, opts) {
  if (opts.exam === 'tf') return cvTf(rng, opts);
  if (level <= 2) return cvLevel12(rng, level);
  if (level === 3) return cvLevel3(rng);
  if (level === 4) return cvLevel4(rng);
  return cvCode(rng);
}

export const GEN = {
  [JG]: (level, rng, profile, opts = {}) => jgGen(level, rng, opts),
  [CV]: (level, rng, profile, opts = {}) => cvGen(level, rng, opts),
};

export { PRELUDE_VEC, PRELUDE_MAT };
