// Generators of m-cholesky (module M, part b, step U8). Catalogue:
// docs/universite/L-M-algebre-lineaire.md, M, `m-cholesky`.
//
// A = LLᵀ with L whole (diagonal in {1, 2, 3}, entries below in [−2 ; 3]).
// One part per coefficient, column by column, judged by `value` (cfg.chol
// for the traps), then L judged by `factor` {of: 'cholesky'}; at level 4,
// Ly = b and Lᵀx = y (`mat`). Level 5: ℓ₃₂ alone, or the failure of
// Cholesky (ℓ₃₃² < 0) as a problem with its conclusion.

import * as MX from '../../cas/matrix.js';
import { q, mt, vt, MLm, fq, qt, coefItem, mcqDistinct, tfL, examTag, withCells, pickCells, matLines } from './alglin-kit.js';
import { mcq } from './kit.js';
import { problemItem } from './kit-problem.js';
import { sub, par, maxAbs, eq, eqG, menu, hints3, modeOf, menuOf, partsItem, vR } from './matrices-b-kit.js';
import { t } from '../../i18n.js';

const CH = 'm-cholesky';
const CH_SUB = [
  { id: 'col1', label: t('première colonne'), skill: CH },
  { id: 'col', label: t('colonnes suivantes'), skill: CH },
  { id: 'solve', label: t('résoudre Ly = b, puis Lᵀx = y'), skill: 'l-mat-lu' },
  { id: 'posdef', label: t('définie positive'), skill: 'm-posdef' },
];
const CH_MENU = [
  { id: 'root', label: t('Racine de ce qui reste (case de la diagonale)'), why: t('Cette case est sous la diagonale : on divise par le pivot de sa colonne.') },
  { id: 'div', label: t('Division par le pivot de la colonne (case sous la diagonale)'), why: t('Cette case est sur la diagonale : on prend la racine de ce qui reste.') },
  { id: 'square', label: t('Élever au carré'), why: t('Cholesky ne met rien au carré : sur la diagonale, on prend une racine.') },
  { id: 'assemble', label: t('Assembler L'), why: t('Il reste des coefficients de L à calculer.') },
  { id: 'solve', label: t('Résoudre un système triangulaire'), why: t('Il faut d\'abord L.') },
];

const CH_BAITS = ['m_chol_no_sqrt', 'm_chol_sum_sign'];
const lName = (i, j) => `ℓ${sub(i + 1)}${sub(j + 1)}`;
const aName = (i, j) => `a${sub(i + 1)}${sub(j + 1)}`;

// L whole, A = LLᵀ. n = 3: ℓ₂₂ ≠ 1 and ℓ₃₁ℓ₂₁ ≠ 0, so that the traps on ℓ₃₂ show.
export function cholData(rng, n = 3, { max = 25 } = {}) {
  for (let tries = 0; tries < 300; tries++) {
    const L = MX.zeros(n, n);
    for (let i = 0; i < n; i++) {
      L[i][i] = q(rng.pick([1, 2, 2, 3, 3]));
      for (let j = 0; j < i; j++) L[i][j] = q(rng.int(-2, 3));
    }
    if (L.every((r, i) => r[i].eq(1))) continue;
    const below = L.flatMap((r, i) => r.slice(0, i));
    if (below.filter((x) => x.n !== 0).length < n - 1) continue;
    if (n === 3 && (L[1][1].eq(1) || L[2][0].mul(L[1][0]).n === 0)) continue;
    const A = MX.mul(L, MX.transpose(L));
    if (maxAbs(A) > max) continue;
    return { L, A, n };
  }
  const L = MX.mat(n === 2 ? [[2, 0], [1, 2]] : [[2, 0, 0], [1, 3, 0], [-1, 2, 1]]);
  return { L, A: MX.mul(L, MX.transpose(L)), n, fallback: true };
}

// The coefficients in the order of the method: column by column.
const order = (n) => { const out = []; for (let k = 0; k < n; k++) for (let i = k; i < n; i++) out.push([i, k]); return out; };

// The computation of ℓᵢₖ, as a line the value judge reads.
function compText(d, i, k) {
  const a = d.A[i][k];
  if (i === k) {
    if (k === 0) return `√${qt(a)}`;
    return `√(${qt(a)}${d.L[k].slice(0, k).map((x) => `-${par(x)}^2`).join('')})`;
  }
  if (k === 0) return `${qt(a)}÷${qt(d.L[0][0])}`;
  return `(${qt(a)}${d.L[i].slice(0, k).map((x, j) => `-${par(x)}×${par(d.L[k][j])}`).join('')})/${qt(d.L[k][k])}`;
}
// The formula, for the part's heading.
function formulaR(i, k) {
  if (i === k) return k === 0 ? `${lName(0, 0)} = √${aName(0, 0)}` : `${lName(k, k)} = √(${aName(k, k)} − ${Array.from({ length: k }, (_, j) => `${lName(k, j)}²`).join(' − ')})`;
  return k === 0 ? `${lName(i, 0)} = ${aName(i, 0)}/${lName(0, 0)}` : `${lName(i, k)} = (${aName(i, k)} − ${Array.from({ length: k }, (_, j) => `${lName(i, j)}${lName(k, j)}`).join(' − ')})/${lName(k, k)}`;
}

function coefPart(d, i, k, { guided = false, menuOn = false, pre = null } = {}) {
  const comp = compText(d, i, k);
  const v = qt(d.L[i][k]);
  const sg = k === 0 ? 'col1' : 'col';
  const part = {
    judge: { kind: 'value', expect: v, chol: { A: mt(d.A), i, j: k } },
    start: `l_${i + 1}${k + 1}`, html: formulaR(i, k), ask: `${lName(i, k)} =`,
    lines: [eqG(comp, guided ? [k === 0 ? 0 : -1] : null, i === k ? t('Racine de ce qui reste') : t('Divisé par le pivot de la colonne'), sg), eqG(v, guided ? [0] : null, '', sg)],
  };
  if (pre) part.pre = pre;
  if (menuOn) part.judge.menu = menuOf(CH_MENU, i === k ? 'root' : 'div');
  return part;
}

function factorPart(d, { guided = false, rng = null, menuOn = false } = {}) {
  const line = eq(`L = ${mt(d.L)}`, t('Contrôle : LLᵀ = A'), 'col');
  return {
    judge: { kind: 'factor', A: mt(d.A), of: 'cholesky', ...(menuOn ? { menu: menuOf(CH_MENU, 'assemble') } : {}) },
    start: 'A = LLᵀ', html: t('Assemble L (triangulaire inférieure).'), ask: '',
    lines: [guided ? withCells(line, pickCells(d.L, [...Array(d.n).keys()], 2, rng).filter(([r, c]) => c <= r)) : line],
  };
}

function solveParts(d, x, { menuOn = false } = {}) {
  const b = MX.matVec(d.A, x);
  const y = MX.matVec(MX.transpose(d.L), x);
  const M = (id) => (menuOn ? { menu: menuOf(CH_MENU, id) } : {});
  return {
    b,
    parts: [
      { judge: { kind: 'mat', expect: vt(y), ...M('solve') }, start: 'y', html: t('Résous Ly = b, avec b = {b} (de haut en bas).', { b: vR(b) }), ask: 'y =', lines: [eq(vt(y), t('Substitution avant'), 'solve')] },
      { judge: { kind: 'mat', expect: vt(x), ...M('solve') }, start: 'x', html: t('Puis Lᵀx = y (de bas en haut).'), ask: 'x =', lines: [eq(vt(x), t('Substitution arrière'), 'solve')] },
    ],
  };
}

const chHints = (d) => {
  const second = d.n === 3
    ? `${lName(2, 1)} = (${fq(d.A[2][1])} − □·□)/${fq(d.L[1][1])}`
    : `${lName(1, 1)} = √(${fq(d.A[1][1])} − □²)`;
  return hints3(
    t('Sur la diagonale : racine de ce qui reste ; dessous : division par le pivot de la colonne. On avance colonne par colonne.'),
    second,
    `L = ${MLm(d.L)}`,
  );
};

const randX = (n, rng) => { for (;;) { const x = Array.from({ length: n }, () => q(rng.int(-2, 2))); if (x.filter((v) => v.n !== 0).length >= 2) return x; } };

function cholItem(level, rng) {
  if (level === 5) return rng.chance(0.5) ? cholCoef(rng, { level: 5 }) : cholFail(rng);
  const n = level === 1 ? rng.pick([2, 3]) : 3;
  const d = cholData(rng, n);
  const key = `${CH}:${mt(d.A)}:${level}`;
  const base = { skill: CH, level, subgoals: CH_SUB, key, fallback: d.fallback, hints: chHints(d), mode: modeOf(level), baits: CH_BAITS };
  const coefs = order(n);
  if (level <= 2) {
    const pre = (i, k) => {
      if (level !== 2) return null;
      if (i === 1 && k === 1) {
        return [{ kind: 'decision', prompt: t('Comment obtient-on {l} ?', { l: lName(1, 1) }), options: rng.shuffle(menu(`√(${aName(1, 1)} − ${lName(1, 0)}²)`, [
          [`${aName(1, 1)} − ${lName(1, 0)}²`, t('C\'est {l}² : il faut encore la racine.', { l: lName(1, 1) }), 'm_chol_no_sqrt'],
          [`√(${aName(1, 1)} + ${lName(1, 0)}²)`, t('On retranche les carrés déjà connus, on ne les ajoute pas.'), 'm_chol_sum_sign'],
        ])) }];
      }
      if (n === 3 && i === 2 && k === 1) {
        return [{ kind: 'decision', prompt: t('Comment obtient-on {l} ?', { l: lName(2, 1) }), options: rng.shuffle(menu(`(${aName(2, 1)} − ${lName(2, 0)}${lName(1, 0)})/${lName(1, 1)}`, [
          [`(${aName(2, 1)} + ${lName(2, 0)}${lName(1, 0)})/${lName(1, 1)}`, t('La somme des produits déjà connus se retranche.'), 'm_chol_sum_sign'],
          [`${aName(2, 1)} − ${lName(2, 0)}${lName(1, 0)}`, t('Il manque la division par le pivot {l}.', { l: lName(1, 1) })],
        ])) }];
      }
      return null;
    };
    const parts = [...coefs.map(([i, k]) => coefPart(d, i, k, { guided: true, pre: pre(i, k) })), factorPart(d, { guided: true, rng })];
    return partsItem({ ...base, prompt: t('A = {A} est symétrique définie positive. Trouve L triangulaire inférieure, à diagonale positive, telle que A = LLᵀ : calcule les ℓᵢⱼ colonne par colonne.', { A: MLm(d.A) }) }, parts);
  }
  if (level === 3) {
    const parts = [...coefs.map(([i, k]) => coefPart(d, i, k, { menuOn: true })), factorPart(d, { menuOn: true })];
    return partsItem({ ...base, prompt: t('Factorisation de Cholesky de A = {A} : pour chaque coefficient de L, choisis d\'abord l\'action, puis écris la ligne.', { A: MLm(d.A) }), tapActions: 'menu' }, parts);
  }
  // Level 4: the whole factorisation, then (one time in two) Ax = b.
  const parts = [...coefs.map(([i, k]) => coefPart(d, i, k)), factorPart(d)];
  const withSolve = rng.chance(0.6);
  if (!withSolve) {
    const prompt = rng.chance(0.5)
      ? t('Factorise A = {A} en A = LLᵀ (Cholesky), colonne par colonne.', { A: MLm(d.A) })
      : t('Trouve la factorisation de Cholesky A = LLᵀ de A = {A} : L triangulaire inférieure à diagonale strictement positive.', { A: MLm(d.A) });
    return partsItem({ ...base, prompt }, parts);
  }
  const s = solveParts(d, randX(n, rng));
  return partsItem({ ...base, key: `${key}:${vt(s.b)}`, prompt: t('Factorise A = {A} en A = LLᵀ, puis résous Ax = b avec b = {b} : d\'abord Ly = b, puis Lᵀx = y.', { A: MLm(d.A), b: vR(s.b) }) }, [...parts, ...s.parts]);
}

// One coefficient of L (level 5, exam coef and mcq).
function cholCoef(rng, { level = 4, exam = null } = {}) {
  const d = cholData(rng, 3);
  const [i, k] = exam === 'mcq' ? (rng.chance(0.75) ? [2, 1] : [2, 2]) : rng.pick([[2, 1], [2, 1], [2, 2], [1, 1]]);
  const right = d.L[i][k];
  const prompt = t('On factorise A = {A} = LLᵀ (Cholesky : L triangulaire inférieure, diagonale > 0). Que vaut {l} ?', { A: MLm(d.A), l: lName(i, k) });
  const solution = [{ html: `L = ${MLm(d.L)}`, note: t('Colonne par colonne') }, { html: `${formulaR(i, k)} = ${fq(right)}`, note: '' }];
  const traps = [{ rule: 'm_chol_sum_sign' }, { rule: 'm_chol_no_sqrt' }];
  if (exam !== 'mcq') {
    const it = coefItem({
      skill: CH, level, prompt, label: `l_${i + 1}${k + 1}`, value: qt(right), key: `${mt(d.A)}:${i}${k}`, exam: exam ? examTag({ exam }) : false,
      askCoef: { label: lName(i, k), path: [i, k], factor: 'L' }, traps, subgoals: CH_SUB, solution, fallback: d.fallback,
    });
    it.judge.chol = { A: mt(d.A), i, j: k };
    return it;
  }
  let s = q(0);
  for (let j = 0; j < k; j++) s = s.add(d.L[i][j].mul(d.L[k][j]));
  const a = d.A[i][k];
  const wrongs = i === k
    ? [{ html: fq(a.sub(s)), rule: 'm_chol_no_sqrt' }, { html: rootText(a.add(s)), rule: 'm_chol_sum_sign' }, { html: fq(a), rule: null }]
    : [{ html: fq(a.add(s).div(d.L[k][k])), rule: 'm_chol_sum_sign' }, { html: fq(a.sub(s).div(d.L[k][k].mul(d.L[k][k]))), rule: 'm_chol_no_sqrt' }, { html: fq(a.sub(s)), rule: null }, { html: '0', rule: 'l_coef_index_swap' }];
  return mcqDistinct({
    skill: CH, level: 4, key: `mcq:${mt(d.A)}:${i}${k}`, exam: examTag({ exam }), prompt, right: fq(right), wrongs,
    fillers: [{ html: fq(right.add(1)) }, { html: fq(right.neg()) }, { html: fq(right.mul(2)) }],
    solution, fallback: d.fallback,
  }, rng);
}
function rootText(x) {
  const v = q(x);
  if (v.n < 0) return `√(${fq(v)})`;
  const r = Math.round(Math.sqrt(v.n));
  if (v.d === 1 && r * r === v.n) return String(r);
  return `√${fq(v)}`;
}

// Level 5: a₃₃ lowered so that ℓ₃₃² ≤ 0, as a problem: the coefficients
// up to ℓ₃₃², then the conclusion.
function cholFail(rng) {
  const d0 = cholData(rng, 3);
  const k = rng.pick([1, 2, 3, 4, 0]);
  const A = d0.A.map((r) => [...r]);
  A[2][2] = A[2][2].sub(d0.L[2][2].mul(d0.L[2][2])).sub(q(k));
  const d = { ...d0, A };
  const last = q(-k);
  const parts = order(3).filter(([i, j]) => !(i === 2 && j === 2)).map(([i, j]) => coefPart(d, i, j));
  parts.push({
    judge: { kind: 'value', expect: qt(last) }, start: 'l_33^2', html: `${lName(2, 2)}² = ${aName(2, 2)} − ${lName(2, 0)}² − ${lName(2, 1)}²`, ask: `${lName(2, 2)}² =`,
    lines: [eq(`${qt(A[2][2])}-${par(d.L[2][0])}^2-${par(d.L[2][1])}^2`, t('Ce qui reste sur la diagonale'), 'col'), eq(qt(last), '', 'col')],
  });
  const key = `${CH}:fail:${mt(A)}`;
  const lines = partsItem({ skill: CH, level: 5, prompt: t('Applique Cholesky à A = {A}, colonne par colonne, jusqu\'à {l}².', { A: MLm(A), l: lName(2, 2) }), subgoals: CH_SUB, key, fallback: d.fallback, hints: [], noHints: true, mode: 'free' }, parts);
  const conc = mcq({
    skill: CH, level: 5, key: `${key}:conc`, prompt: t('On trouve {l}² = {v}. A est-elle définie positive ?', { l: lName(2, 2), v: fq(last) }),
    options: [
      { html: t('Non : {l}² = {v} {cmp}, A n\'a pas de factorisation de Cholesky', { l: lName(2, 2), v: fq(last), cmp: k ? '< 0' : '= 0' }), correct: true },
      { html: t('Oui : sa diagonale est positive'), correct: false, rule: 'l_posdef_diag' },
      { html: t('Oui : A est symétrique'), correct: false },
      { html: t('Oui : on prend {l} = {v}', { l: lName(2, 2), v: k ? `√${k}` : '0' }), correct: false },
    ],
  }, rng);
  return problemItem({ skill: CH, level: 5, prompt: t('A = {A} est symétrique. Est-elle définie positive ? Réponds en appliquant Cholesky.', { A: MLm(A) }), parts: [{ item: lines, points: 3, title: t('Cholesky jusqu\'à ℓ₃₃²') }, { item: conc, points: 1, title: t('Conclusion') }], key, fallback: d.fallback });
}

const NOT_PD = ['[[1,2],[2,1]]', '[[-1,0],[0,1]]', '[[1,3],[3,1]]', '[[2,3],[3,2]]', '[[0,1],[1,0]]'];

function cholTf(rng, exam) {
  const tag = examTag({ exam });
  const which = rng.int(0, 3);
  if (which === 0) {
    const A = rng.pick(NOT_PD);
    return tfL({
      skill: CH, key: `symInv:${A}`, truth: false, exam: tag,
      statement: t('Toute matrice symétrique inversible a une factorisation de Cholesky A = LLᵀ.'),
      counter: { kind: 'mx', prop: 'symInvNoChol', params: { n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A } },
      explanation: t('Faux : {A} est symétrique et inversible, mais pas définie positive (une valeur propre est ≤ 0). Or LLᵀ avec L inversible est toujours définie positive.', { A: MLm(MX.mat(JSON.parse(A))) }),
    });
  }
  const T = [
    null,
    [t('Si A = LLᵀ (Cholesky), alors det A = (ℓ₁₁ℓ₂₂…ℓₙₙ)².'), t('Vrai : det A = det L · det Lᵀ = (produit de la diagonale de L)².')],
    [t('Si A = LLᵀ avec L inversible, alors A est symétrique définie positive.'), t('Vrai : xᵀAx = ‖Lᵀx‖² > 0 pour x ≠ 0, car Lᵀ est inversible.')],
    [t('Pour A symétrique définie positive, la matrice L de Cholesky (triangulaire inférieure, diagonale > 0) est unique.'), t('Vrai : colonne par colonne, chaque ℓᵢⱼ est imposé, la racine positive sur la diagonale.')],
  ][which];
  return tfL({ skill: CH, key: `t${which}`, truth: true, exam: tag, statement: T[0], explanation: T[1] });
}

// The catalogue's exam example 2 (7 points): L, Cx = b, det C, why C ≻ 0.
function cholOpen(rng) {
  const d = cholData(rng, 3);
  const x = randX(3, rng);
  const s = solveParts(d, x);
  const key = `${CH}:open:${mt(d.A)}:${vt(s.b)}`;
  const common = { skill: CH, level: 5, subgoals: CH_SUB, hints: [], noHints: true, mode: 'free', fallback: d.fallback };
  // (a): the six ℓᵢⱼ, half a point each (L is then written).
  const pa = partsItem({ ...common, key: `${key}:a`, prompt: t('(a) Factorise C = LLᵀ : les ℓᵢⱼ, colonne par colonne.') }, order(3).map(([i, k]) => coefPart(d, i, k)));
  const pb = partsItem({ ...common, key: `${key}:b`, prompt: t('(b) Résous Cx = b, b = {b}.', { b: vR(s.b) }) }, s.parts);
  const diagP = d.L.map((r, i) => r[i]);
  const det = MX.det(d.A);
  const pc = partsItem({ ...common, key: `${key}:c`, prompt: t('(c) Calcule det C.') }, [{
    judge: { kind: 'value', expect: qt(det) }, start: 'det(C)', html: '', ask: 'det C =',
    lines: [eq(`(${diagP.map(qt).join('×')})^2`, 'det C = (ℓ₁₁ℓ₂₂ℓ₃₃)²', 'col'), eq(qt(det), '', 'col')],
  }]);
  const pd = mcq({
    skill: CH, level: 5, key: `${key}:d`, prompt: t('(d) Pourquoi C est-elle définie positive ?'),
    options: [
      { html: t('La factorisation C = LLᵀ existe, avec une diagonale de L strictement positive'), correct: true },
      { html: t('La diagonale de C est positive'), correct: false, rule: 'l_posdef_diag' },
      { html: t('C est symétrique'), correct: false },
      { html: 'det C > 0', correct: false },
    ],
  }, rng);
  return problemItem({
    skill: CH, level: 5, exam: { format: 'open', points: 7 }, key, fallback: d.fallback,
    prompt: t('C = {C} et b = {b}. (a) Factorise C = LLᵀ (Cholesky). (b) Résous Cx = b. (c) Calcule det C. (d) Justifie que C est définie positive.', { C: MLm(d.A), b: vR(s.b) }),
    parts: [{ item: pa, points: 3, title: t('(a) Factorisation') }, { item: pb, points: [1, 1], title: t('(b) Résolution') }, { item: pc, points: 1, title: t('(c) Déterminant') }, { item: pd, points: 1, title: t('(d) Définie positive') }],
  });
}

export const GEN = {
  [CH]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'coef') return cholCoef(rng, { exam: 'coef' });
    if (opts.exam === 'mcq') return cholCoef(rng, { exam: 'mcq' });
    if (opts.exam === 'tf') return cholTf(rng, 'tf');
    if (opts.exam === 'open') return cholOpen(rng);
    return cholItem(level, rng);
  },
};

