// n-lu (module N, part f, step U9): LU factorisation, a zero pivot (PA = LU),
// the determinant and the costs. Catalogue: docs/universite/N-analyse-numerique.md, n-lu.
//
// Data: A = LU from luPair (alglin-kit.js: ℓᵢⱼ whole or halves, A whole and
// small); a zero pivot at step 2 comes from ℓ₃₂ = 0 and the rows 2 and 3 of
// LU exchanged (so PA = LU and det A = −Π uᵢᵢ).
// L1 guided elimination (grid cells), the multipliers into L, det A;
// L2 the same with a decision on the sign of ℓ; L3 « choose the action »
// with a zero pivot: exchange (or the trap « A est singulière »), then
// det A = −Π uᵢᵢ; L4 free: PB = LU (4 × 4, the matrix B of the GM series 8
// half the time), then det B; L5 the program lu() with every hole, then a
// table of costs (10 systems with the same A).
// Exam: coef (ℓ₃₁ of L, u₃₃ of U), mcq (A\b or inv(A)*b, a coefficient),
// tf (zero pivot ⇒ singular: the counter-example is an invertible matrix
// with a zero pivot, kind matOne `notLUable`; costs).

import * as MX from '../../cas/matrix.js';
import {
  q, mt, MLm, ML, fq, qt, sub, luPair, opLines, pickCells, withCells, matLines, coefItem, mcqDistinct, tfL, examTag, opR,
} from './alglin-kit.js';
import {
  refCode, codeItem, readtableItem, multiMcq, vfMcq, H, blankBy,
} from './numerique-kit.js';
import { t } from '../../i18n.js';

const LU = 'n-lu';
const SUB = [
  { id: 'elim', label: t('éliminer'), skill: 'l-mat-lu' },
  { id: 'factors', label: t('L et U'), skill: 'l-mat-lu' },
  { id: 'pivot', label: t('pivot nul : permuter'), skill: LU },
  { id: 'det', label: 'det A = Π uᵢᵢ / det P', skill: 'l-det-props' },
  { id: 'cost', label: t('coûts'), skill: LU },
];
const KEYS = ['calc', 'greek'];
const ij = (i, j) => `${sub(i + 1)}${sub(j + 1)}`;
const lName = (i, j) => `ℓ${ij(i, j)}`;
const prodText = (U) => U.map((r, i) => (r[i].n < 0 ? `(${qt(r[i])})` : qt(r[i]))).join('×');
const prodR = (U) => prodText(U).replace(/×/g, '·').replace(/-/g, '−');
const prod = (U) => U.reduce((s, r, i) => s.mul(r[i]), q(1));

// A = LU without exchange, the operations of the elimination.
function luData(rng, n = 3) {
  for (let tries = 0; tries < 200; tries++) {
    const { L, U, A, fallback } = luPair(n, rng, { fracL: rng.chance(0.4) });
    if (fallback) continue;
    const ops = [];
    for (let c = 0; c < n - 1; c++) for (let i = c + 1; i < n; i++) if (L[i][c].n !== 0) ops.push({ kind: 'add', i, j: c, k: L[i][c].neg() });
    if (ops.length < n - 1) continue;
    let X = A;
    let big = false;
    for (const op of ops) { X = MX.applyOp(X, op); if (X.flat().some((x) => Math.abs(x.valueOf()) > 20)) big = true; }
    if (big || !MX.equal(X, U)) continue;
    return { L, U, A, ops, n, det: prod(U) };
  }
  const L = MX.mat([[1, 0, 0], ['1/2', 1, 0], ['3/2', 0, 1]]);
  const U = MX.mat([[2, 4, 8], [0, -1, 0], [0, 0, -5]]);
  const A = MX.mul(L, U);
  return { L, U, A, ops: [{ kind: 'add', i: 1, j: 0, k: q(-1, 2) }, { kind: 'add', i: 2, j: 0, k: q(-3, 2) }], n: 3, det: q(10), fallback: true };
}

// A zero pivot at step 2: rows 2 and 3 of LU exchanged, with ℓ₃₂ = 0.
function pivotData(rng, n = 3) {
  for (let tries = 0; tries < 300; tries++) {
    const { L, U, fallback } = luPair(n, rng, {});
    if (fallback) continue;
    L[2][1] = q(0);
    for (let i = 3; i < n; i++) if (rng.chance(0.5)) L[i][1] = q(0);
    const LU0 = MX.mul(L, U);
    const A = LU0.map((r, i) => (i === 1 ? LU0[2] : i === 2 ? LU0[1] : r).slice());
    if (A.flat().some((x) => !x.isInt() || Math.abs(x.valueOf()) > 20)) continue;
    if (A[1][0].n === 0 && A[2][0].n === 0) continue;
    // Step 1: eliminate column 1 of A.
    const ops1 = [1, 2, ...Array.from({ length: n - 3 }, (_, k) => k + 3)].filter((i) => A[i][0].n !== 0).map((i) => ({ kind: 'add', i, j: 0, k: A[i][0].div(A[0][0]).neg() }));
    let X = A;
    for (const op of ops1) X = MX.applyOp(X, op);
    if (X[1][1].n !== 0 || X[2][1].n === 0) continue;
    const swap = { kind: 'swap', i: 1, j: 2 };
    const Y = MX.applyOp(X, swap);
    const rest = [];
    let Z = Y;
    for (let c = 1; c < n - 1; c++) for (let i = c + 1; i < n; i++) if (Z[i][c].n !== 0) { const op = { kind: 'add', i, j: c, k: Z[i][c].div(Z[c][c]).neg() }; rest.push(op); Z = MX.applyOp(Z, op); }
    if (!MX.isUpper?.(Z) && Z.some((r, i) => r.some((x, j) => j < i && x.n !== 0))) continue;
    if (Z.flat().some((x) => x.d > 6 || Math.abs(x.valueOf()) > 30)) continue;
    const p = MX.plu(A);
    if (!MX.equal(p.U, Z)) continue;
    const det = MX.det(A);
    if (det.n === 0) continue;
    return { A, U: Z, P: p.P, L: p.L, ops1, swap, rest, n, det, prodU: prod(Z) };
  }
  const A = MX.mat([[1, 1, 1, 1], [2, 2, 5, 3], [4, 6, 8, 0], [3, 3, 9, 8]]);
  return gmB(A);
}

// The matrix B of the GM series 8 (4 × 4, second pivot zero), det B = −18.
function gmB(A0) {
  const A = A0 || MX.mat([[1, 1, 1, 1], [2, 2, 5, 3], [4, 6, 8, 0], [3, 3, 9, 8]]);
  const ops1 = [1, 2, 3].map((i) => ({ kind: 'add', i, j: 0, k: A[i][0].div(A[0][0]).neg() }));
  let X = A;
  for (const op of ops1) X = MX.applyOp(X, op);
  const swap = { kind: 'swap', i: 1, j: 2 };
  let Z = MX.applyOp(X, swap);
  const rest = [];
  for (let c = 1; c < 3; c++) for (let i = c + 1; i < 4; i++) if (Z[i][c].n !== 0) { const op = { kind: 'add', i, j: c, k: Z[i][c].div(Z[c][c]).neg() }; rest.push(op); Z = MX.applyOp(Z, op); }
  const p = MX.plu(A);
  return { A, U: Z, P: p.P, L: p.L, ops1, swap, rest, n: 4, det: MX.det(A), prodU: prod(Z), gm: true };
}

const detSeg = (d, { swapped = false } = {}) => [
  { kind: 'segment', html: swapped ? t('det A : le produit des pivots, et le signe de l\'échange.') : t('det A, à partir des pivots de U.'), ask: 'det A =', start: { math: 'D' }, judge: { kind: 'value', expect: qt(d.det), form: 'irreducible', ...(swapped ? { ludet: { prodU: qt(d.prodU) } } : {}) } },
  { kind: 'eq', math: `${swapped ? '-' : ''}(${prodText(d.U)})`, note: swapped ? t('Un échange de lignes : det P = −1') : t('Produit de la diagonale de U'), subgoal: 'det' },
  { kind: 'eq', math: qt(d.det), note: '', subgoal: 'det' },
];

// ---------- L1, L2: guided ----------

function guided(rng, level) {
  const d = luData(rng);
  const lines = opLines(d.A, d.ops, { note: (op) => `${opR(op)} : ${lName(op.i, op.j)} = ${fq(op.k.neg())}`, subgoal: 'elim' });
  const script = lines.map((l) => withCells(l, pickCells(l.result, [l.op.i], 2, rng)));
  if (level === 2) {
    const op = rng.pick(d.ops);
    const k = op.k.neg();
    const cands = [
      { id: 'ok', label: fq(k), valid: true, ref: true },
      { id: 'neg', label: fq(k.neg()), valid: false, rule: 'l_lu_sign', why: t('On a retranché {k} fois la ligne {j} : ℓ = {k}, avec ce signe.', { k: fq(k), j: op.j + 1 }) },
      { id: 'inv', label: fq(q(1).div(k)), valid: false, why: t('ℓᵢⱼ est le multiplicateur lui-même, pas son inverse.') },
    ];
    script.push({ kind: 'decision', prompt: t('On a fait {op}. Que vaut {l} ?', { op: opR(op), l: lName(op.i, op.j) }), options: rng.shuffle(cands.filter((o, i) => cands.findIndex((x) => x.label === o.label) === i)) });
  }
  const below = [];
  for (let i = 1; i < d.n; i++) for (let j = 0; j < i; j++) below.push([i, j]);
  script.push(
    { kind: 'segment', html: t('Écris L et U.'), start: { math: 'LU' }, judge: { kind: 'factor', A: mt(d.A), of: 'LU' } },
    withCells({ kind: 'eq', math: `L = ${mt(d.L)}`, note: t('Sous la diagonale, les multiplicateurs'), subgoal: 'factors' }, below),
    withCells({ kind: 'eq', math: `U = ${mt(d.U)}`, note: t('La forme échelonnée'), subgoal: 'factors' }, pickCells(d.U, [0, 1, 2], 2, rng).filter(([r, c]) => c >= r)),
    ...detSeg(d).map((l) => (l.kind === 'eq' && l.math === qt(d.det) ? { ...l, ...blankBy(qt(d.det), [qt(d.det)]) } : l)),
  );
  return matLines({
    skill: LU, level, mode: 'guided', keys: KEYS,
    prompt: t('Factorise A = {A} en A = LU sans échange de lignes, en notant chaque multiplicateur ℓᵢⱼ, puis calcule det A.', { A: MLm(d.A) }),
    start: mt(d.A), judge: { kind: 'rowops', goal: 'echelon', lowerOnly: true }, script,
    hints: H(t('Les multiplicateurs de Gauss sont les coefficients de L, sous la diagonale : Lᵢ ← Lᵢ − ℓᵢⱼLⱼ.'),
      `${lName(d.ops[0].i, d.ops[0].j)} = a${ij(d.ops[0].i, 0)}/a₁₁ = □`,
      `L = ${MLm(d.L)}, U = ${MLm(d.U)}, det A = ${prodR(d.U)} = ${fq(d.det)}.`),
    subgoals: SUB, key: `${LU}:${level}:${mt(d.A)}`, baits: ['l_lu_sign'], fallback: d.fallback,
  });
}

// ---------- L3: a zero pivot, choose the action ----------

function pivotItem(rng, level) {
  const d = level === 4 && rng.chance(0.5) ? gmB() : pivotData(rng, level === 4 ? 4 : 3);
  const first = opLines(d.A, d.ops1, { note: (op) => `${opR(op)}`, subgoal: 'elim' });
  const after = first.length ? first.at(-1).result : d.A;
  const swapLines = opLines(after, [d.swap], { note: t('Le pivot u₂₂ est nul : on échange les lignes 2 et 3'), subgoal: 'pivot' });
  const rest = opLines(swapLines[0].result, d.rest, { note: (op) => `${opR(op)}`, subgoal: 'elim' });
  const decision = {
    kind: 'decision', prompt: t('Le deuxième pivot est nul. Que fais-tu ?'), options: rng.shuffle([
      { id: 'swap', label: t('J\'échange la ligne 2 avec une ligne en dessous (PA = LU)'), valid: true, ref: true },
      { id: 'sing', label: t('J\'arrête : A est singulière'), valid: false, rule: 'n_lu_zero_pivot', why: t('Faux : det A = {det} ≠ 0. Un pivot nul empêche seulement la LU sans échange.', { det: fq(d.det) }) },
      { id: 'div', label: t('Je continue en divisant par ce pivot'), valid: false, rule: 'n_lu_zero_pivot', why: t('On ne divise pas par 0 : on échange deux lignes.') },
    ]),
  };
  const script = [...first, decision, ...swapLines, ...rest];
  if (level === 4) {
    script.push(
      { kind: 'segment', html: t('Écris P, L et U, avec PA = LU.'), start: { math: 'PLU' }, judge: { kind: 'factor', A: mt(d.A), of: 'PLU' } },
      { kind: 'eq', math: `P = ${mt(d.P)} ; L = ${mt(d.L)} ; U = ${mt(d.U)}`, note: t('P échange les lignes 2 et 3 ; L garde les multiplicateurs, échangés avec les lignes'), subgoal: 'factors' },
    );
  }
  const name = d.n === 4 ? 'B' : 'A';
  script.push(...detSeg(d, { swapped: true, name }));
  return matLines({
    skill: LU, level, mode: level === 3 ? 'tap' : 'free', tapActions: level === 3 ? 'rowops' : null, keys: KEYS,
    prompt: level === 4
      ? t('Échelonne {name} = {A} par Gauss (Lᵢ ← Lᵢ − ℓLⱼ, ou un échange Lᵢ ↔ Lⱼ si un pivot s\'annule), écris PA = LU, puis calcule det {name}.', { name, A: MLm(d.A) })
      : t('Échelonne {name} = {A} par Gauss (Lᵢ ← Lᵢ − ℓLⱼ, ou un échange Lᵢ ↔ Lⱼ si un pivot s\'annule), puis calcule det {name}. Choisis d\'abord chaque action.', { name, A: MLm(d.A) }),
    start: mt(d.A), judge: { kind: 'rowops', goal: 'echelon' }, script,
    hints: H(t('Si un pivot est nul, la matrice n\'est pas forcément singulière : on échange avec une ligne du dessous dont le coefficient n\'est pas nul.'),
      t('Après l\'échange, det {name} = −(□)', { name }),
      `U = ${MLm(d.U)}, det ${name} = −(${prodR(d.U)}) = ${fq(d.det)}.`),
    subgoals: SUB, key: `${LU}:${level}:${mt(d.A)}`, baits: ['n_lu_zero_pivot', 'n_lu_det_permutation'], fallback: d.fallback,
  });
}

// ---------- L5: the program, then the costs ----------

export const LU_CODE = refCode(`def lu(A):
    # sans pivot ; L unite, U triangulaire superieure
    n = len(A)
    L = eye(n)
    U = copy2(A)
    for k in range(n - 1):
        for i in range(k + 1, n):
            L[i][k] = «U[i][k] / U[k][k]»
            for j in range(k, n):
                U[i][j] = «U[i][j] - L[i][k] * U[k][j]»
    return [L, U]
`);
const LU_TRAPS = { 0: [{ text: 'U[k][k] / U[i][k]', rule: 'l_lu_inverse' }, { text: '-U[i][k] / U[k][k]', rule: 'l_lu_sign' }], 1: [{ text: 'U[i][j] + L[i][k] * U[k][j]', rule: 'l_lu_sign' }] };
const LU_TESTS = [
  { setup: 'A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]]', expr: 'lu(A)[0][2][0]', expect: '1.5' },
  { setup: 'A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]]', expr: 'lu(A)[0][2][1]', expect: '0.0', atol: 1e-12 },
  { setup: 'A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]]', expr: 'lu(A)[1][1][1]', expect: '-1.0' },
  { setup: 'A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]]', expr: 'lu(A)[1][2][2]', expect: '-5.0' },
  { setup: 'A = [[4, 3], [6, 3]]', expr: 'lu(A)', expect: '[[[1, 0], [1.5, 1]], [[4, 3], [0, -1.5]]]' },
];

function costTable(rng, level) {
  const n = rng.pick([100, 1000]);
  const k = 10;
  const f = (x) => x.toExponential(1).replace(/e\+?(-?)(\d+)$/, (m, s, e) => `e${s || '+'}${e.padStart(2, '0')}`);
  const lu3 = (2 * n ** 3) / 3;
  const table = {
    columns: [t('étape'), t('opérations (n = {n})', { n })],
    rows: [[t('factorisation A = LU'), f(lu3)], [t('une descente Ly = b'), f(n * n)], [t('une remontée Ux = y'), f(n * n)], [t('inverse A⁻¹ (n systèmes)'), f(2 * n ** 3)]],
  };
  return readtableItem({
    skill: LU, level, key: `costs:${n}`,
    prompt: t('Coût des étapes pour une matrice pleine n × n (n = {n}). On doit résoudre Ax = b pour {k} seconds membres b, avec la même A.', { n, k }),
    table,
    question: multiMcq({
      skill: LU, level, key: `${LU}:costs:${n}`,
      prompt: t('Que faut-il faire ?'),
      options: [
        { html: t('Factoriser A = LU une seule fois, puis faire 10 descentes et 10 remontées'), correct: true },
        { html: t('Le coût total est alors d\'environ 2n³/3 + 20n² ≈ {c} opérations', { c: f(lu3 + 20 * n * n) }), correct: true },
        { html: t('Calculer A⁻¹, puis faire 10 produits A⁻¹b : c\'est plus rapide'), correct: false, rule: 'n_cost_inverse' },
        { html: t('Refaire la factorisation pour chaque second membre'), correct: false },
      ],
      solution: [{ html: t('La factorisation (≈ 2n³/3) ne dépend pas de b : on la fait une fois. Chaque second membre ne coûte ensuite que 2n². Calculer A⁻¹ revient à résoudre n systèmes (≈ 2n³) : c\'est plus cher, et moins précis.'), note: '' }],
    }, rng),
  });
}

function codeLevel(rng) {
  return codeItem({
    skill: LU, level: 5, ref: LU_CODE, blanks: [0, 1], traps: LU_TRAPS, preludes: ['vec', 'mat'], rng,
    prompt: t('Complète la factorisation A = LU sans pivot : L[i][k] est le multiplicateur de la ligne i, et la ligne i de U perd L[i][k] fois la ligne k.'),
    tests: LU_TESTS, then: costTable(rng, 5),
    hints: [], subgoals: SUB, key: 'lu',
  });
}

// ---------- exam ----------

function coefOf(rng, opts, level = 4) {
  const d = luData(rng);
  const asks = [];
  for (let i = 1; i < 3; i++) for (let j = 0; j < i; j++) asks.push({ f: 'L', i, j, v: d.L[i][j] });
  asks.push({ f: 'U', i: 2, j: 2, v: d.U[2][2] }, { f: 'U', i: 1, j: 2, v: d.U[1][2] });
  const a = rng.pick(asks.filter((x) => x.v.n !== 0));
  const label = a.f === 'L' ? `l_${a.i + 1}${a.j + 1}` : `u_${a.i + 1}${a.j + 1}`;
  const nm = a.f === 'L' ? lName(a.i, a.j) : `u${ij(a.i, a.j)}`;
  return coefItem({
    skill: LU, level, prompt: a.f === 'L'
      ? t('On factorise A = {A} en A = LU sans échange (L unitriangulaire inférieure). Que vaut {nm} dans L ?', { A: MLm(d.A), nm })
      : t('On factorise A = {A} en A = LU sans échange (L unitriangulaire inférieure). Que vaut {nm} dans U ?', { A: MLm(d.A), nm }),
    label, value: qt(a.v), key: `${mt(d.A)}:${label}`, exam: opts.exam ? examTag(opts) : false,
    askCoef: { label: nm, path: [a.i, a.j], factor: a.f }, traps: [{ rule: 'l_lu_sign' }], subgoals: SUB,
    solution: [{ html: `L = ${MLm(d.L)}, U = ${MLm(d.U)}`, note: '' }], fallback: d.fallback,
  });
}

function examMcq(rng, opts) {
  if (rng.chance(0.5)) {
    return mcqDistinct({
      skill: LU, level: 4, key: `${LU}:mcq:inv`, exam: examTag(opts),
      prompt: t('Pour résoudre Ax = b (A pleine, n grand), pourquoi utilise-t-on A\\b (une factorisation LU) plutôt que inv(A)*b ?'),
      right: t('A\\b factorise A une fois puis fait une descente et une remontée ; inv(A) revient à résoudre n systèmes'),
      wrongs: [{ html: t('inv(A)*b est plus rapide, mais moins précis'), rule: 'n_cost_inverse' }, { html: t('Les deux coûtent la même chose : seule la précision change'), rule: 'n_cost_inverse' }],
      fillers: [{ html: t('A\\b ne marche que si A est symétrique') }],
      solution: [{ html: t('La factorisation coûte ≈ 2n³/3, chaque substitution ≈ n² ; calculer A⁻¹ coûte ≈ 2n³ (n systèmes), puis le produit n² (série GM 8).'), note: '' }],
    }, rng);
  }
  const d = pivotData(rng, 3);
  const right = d.det;
  return mcqDistinct({
    skill: LU, level: 4, key: `${LU}:mcq:det:${mt(d.A)}`, exam: examTag(opts),
    prompt: t('On échelonne A = {A} : il faut échanger les lignes 2 et 3, et l\'on obtient U = {U}, avec PA = LU. Que vaut det A ?', { A: MLm(d.A), U: MLm(d.U) }),
    right: fq(right), wrongs: [{ html: fq(d.prodU), rule: 'n_lu_det_permutation' }],
    fillers: [{ html: fq(right.mul(2)) }, { html: '0' }, { html: fq(right.add(1)) }],
    solution: [{ html: `det A = Π uᵢᵢ / det P = (${prodR(d.U)})/(−1) = ${fq(right)}.`, note: '' }],
  }, rng);
}

function examTf(rng, opts) {
  const tag = examTag(opts);
  const k = rng.int(0, 3);
  if (k <= 1) {
    const d = k === 0 ? gmB() : pivotData(rng, 3);
    return tfL({
      skill: LU, key: `zero:${mt(d.A)}`, truth: false, exam: tag, ruleIfTrue: 'n_lu_zero_pivot',
      statement: t('Si un pivot s\'annule pendant la factorisation LU sans pivot, alors A est singulière.'),
      counter: { kind: 'matOne', params: { want: 'notLUable' }, ask: [{ v: 'A', label: 'A =', shape: [d.n, d.n] }], answer: { A: mt(d.A) } },
      explanation: t('Faux : {A} a un deuxième pivot nul, mais det = {det} ≠ 0 : on échange deux lignes (PA = LU).', { A: ML(mt(d.A)), det: fq(d.det) }),
    });
  }
  if (k === 2) return vfMcq({ skill: LU, key: `${LU}:tf:10`, exam: tag, statement: t('Résoudre Ax = b pour 10 seconds membres b différents (même A) demande 10 factorisations LU.'), truth: false, ruleIfTrue: 'n_cost_inverse', explanation: t('Faux : on factorise une fois (≈ 2n³/3), puis chaque second membre coûte une descente et une remontée (≈ 2n²).') }, rng);
  return vfMcq({ skill: LU, key: `${LU}:tf:cost`, exam: tag, statement: t('Le coût de la factorisation LU d\'une matrice pleine n × n est O(n²).'), truth: false, explanation: t('Faux : environ 2n³/3 opérations, donc O(n³). Ce sont les substitutions qui coûtent O(n²).') }, rng);
}

export const GEN = {
  [LU]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'coef') return coefOf(rng, opts);
    if (opts.exam === 'mcq') return examMcq(rng, opts);
    if (opts.exam === 'tf') return examTf(rng, opts);
    if (level <= 2) return guided(rng, level);
    if (level <= 4) return pivotItem(rng, level);
    return codeLevel(rng);
  },
};
