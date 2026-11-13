// m-norms and m-cond (module M, part c, step U8): matrix norms and the
// condition number. Catalogue: docs/universite/L-M-algebre-lineaire.md, M.
//
// Data: 2 × 2 whole matrices found by enumeration (matrices-c-kit.js):
// non-symmetric ones whose AᵀA has whole eigenvalues (‖A‖₂ = √s₁ exact,
// κ₂ = √(s₁/s₂)), symmetric positive definite ones with whole eigenvalues
// (κ₂ = λmax/λmin). The values are lines of the judge `value` (form
// 'exact': roots allowed); a start N₁, N∞, N₂, N_F, κ₂ names the number
// asked, defined in the prompt.

import { matLines, mcqDistinct, tfL, withCells } from './alglin-kit.js';
import { linesItem, examTag } from './kit.js';
import { problemItem } from './kit-problem.js';
import { q, qt, mt, vt, MLm, sub, MX, LF, R, fq, vR, rad, blankAll, blanksOf, menuOf, H, sym2List, ns2List } from './matrices-c-kit.js';
import { t } from '../../i18n.js';

const NM = 'm-norms';
const CD = 'm-cond';
const KEYS = ['calc', 'calcfn', 'greek'];
const NM_SUB = [
  { id: 'ata', label: 'AᵀA', skill: 'l-mat-product' },
  { id: 'eig', label: t('valeurs propres de AᵀA'), skill: 'l-eig-charpoly' },
  { id: 'norm', label: t('norme'), skill: NM },
  { id: 'svd', label: '‖A‖₂ = σ₁', skill: 'l-svd-compute' },
];
const CD_SUB = [
  { id: 'norms', label: t('normes'), skill: NM },
  { id: 'bound', label: t('borne d\'erreur'), skill: CD },
];

const abs = Math.abs;
const n1 = (A) => Math.max(abs(A[0][0]) + abs(A[1][0]), abs(A[0][1]) + abs(A[1][1]));
const ninf = (A) => Math.max(abs(A[0][0]) + abs(A[0][1]), abs(A[1][0]) + abs(A[1][1]));
const fro2 = (A) => A.flat().reduce((s, x) => s + x * x, 0);
const pa = (x) => (x < 0 ? `|${x}|` : `|${x}|`);
const colSums = (A) => `max(${pa(A[0][0])}+${pa(A[1][0])} ; ${pa(A[0][1])}+${pa(A[1][1])})`;
const rowSums = (A) => `max(${pa(A[0][0])}+${pa(A[0][1])} ; ${pa(A[1][0])}+${pa(A[1][1])})`;
const colVals = (A) => `max(${abs(A[0][0]) + abs(A[1][0])} ; ${abs(A[0][1]) + abs(A[1][1])})`;
const rowVals = (A) => `max(${abs(A[0][0]) + abs(A[0][1])} ; ${abs(A[1][0]) + abs(A[1][1])})`;
const lam = (A) => {
  const [[a, b], [c, d]] = A;
  const tr = a + d;
  const disc = tr * tr - 4 * (a * d - b * c);
  return disc < 0 ? null : [(tr + Math.sqrt(disc)) / 2, (tr - Math.sqrt(disc)) / 2];
};

// A non-symmetric matrix with ‖A‖₁ ≠ ‖A‖∞ and AᵀA of whole eigenvalues.
function normData(rng, { realEig = false, triangular = false, wholeEig = false } = {}) {
  const list = ns2List().filter((x) => n1(x.A) !== ninf(x.A) && x.A.flat().filter((v) => v === 0).length <= 1
    && (!triangular || x.A[1][0] === 0) && (!realEig || lam(x.A)) && (!wholeEig || (lam(x.A) && lam(x.A).every(Number.isInteger))));
  for (let tries = 0; tries < 50; tries++) {
    const d = rng.pick(list);
    const l = lam(d.A);
    if (realEig && (!l || abs(abs(l[0]) - Math.sqrt(d.s1)) < 1e-9)) continue;
    return { ...d, Aq: MX.mat(d.A) };
  }
  const A = [[3, 0], [4, 5]];
  return { A, Aq: MX.mat(A), s1: 45, s2: 5, det: 15, fallback: true };
}

const normsDef = t('On note N₁ = ‖A‖₁, N∞ = ‖A‖∞, N₂ = ‖A‖₂ et N_F = ‖A‖_F.');
const seg = (html, ask, start, judge) => ({ kind: 'segment', html, ask, start: { math: start }, judge });
function splitFirst(script) {
  const [s, ...rest] = script;
  return { start: s.start.math, judge: s.judge, script: s.html ? [{ kind: 'note', html: s.html }, ...rest] : rest };
}

const NM_MENU = [
  { id: 'cols', label: t('Sommer les |aᵢⱼ| par colonne'), why: t('Les colonnes donnent ‖A‖₁.') },
  { id: 'rows', label: t('Sommer les |aᵢⱼ| par ligne'), why: t('Les lignes donnent ‖A‖∞.') },
  { id: 'fro', label: t('Racine de la somme des carrés'), why: t('C\'est la norme de Frobenius.') },
  { id: 'ata', label: t('Calculer AᵀA'), why: t('AᵀA sert à la norme 2.') },
  { id: 'sigma', label: t('Racine de la plus grande valeur propre de AᵀA'), why: t('Il faut d\'abord AᵀA.') },
];

function oneInf(d, { guided = false, menu = false, decide = false } = {}) {
  const A = d.A;
  const M = (id) => (menu ? { menu: menuOf(NM_MENU, id) } : {});
  const out = [];
  const one = String(n1(A));
  const inf = String(ninf(A));
  out.push(seg(t('‖A‖₁ : la plus grande somme des |aᵢⱼ| d\'une colonne.'), '‖A‖₁ =', 'N_1', { kind: 'value', expect: one, form: 'irreducible', mnorm: { A: mt(d.Aq), p: '1' }, ...M('cols') }));
  if (decide) {
    out.push({ kind: 'decision', prompt: t('Pour ‖A‖₁, que somme-t-on ?'), options: [
      { id: 'cols', label: t('Les |aᵢⱼ| de chaque colonne'), valid: true },
      { id: 'rows', label: t('Les |aᵢⱼ| de chaque ligne'), valid: false, rule: 'm_norm_1_inf_swap', why: t('Les lignes donnent ‖A‖∞ ; ‖A‖₁ somme les colonnes (le 1 est vertical).') },
      { id: 'all', label: t('Tous les |aᵢⱼ|'), valid: false, why: t('Ce n\'est pas une norme subordonnée : on prend le maximum des sommes par colonne.') },
    ] });
  }
  const c1 = { kind: 'eq', math: colSums(A), note: t('Colonnes'), subgoal: 'norm' };
  out.push(guided ? { ...c1, ...blanksOf(colSums(A), [String(abs(A[1][0])), String(abs(A[1][1]))]) } : c1);
  out.push({ kind: 'eq', math: one, note: `${colVals(A).replace('max', t('le plus grand de '))}`, subgoal: 'norm' });
  out.push(seg(t('‖A‖∞ : la plus grande somme des |aᵢⱼ| d\'une ligne.'), '‖A‖∞ =', 'N_∞', { kind: 'value', expect: inf, form: 'irreducible', mnorm: { A: mt(d.Aq), p: 'inf' }, ...M('rows') }));
  const c2 = { kind: 'eq', math: rowSums(A), note: t('Lignes'), subgoal: 'norm' };
  out.push(guided ? { ...c2, ...blanksOf(rowSums(A), [String(abs(A[0][1])), String(abs(A[1][1]))]) } : c2);
  out.push({ kind: 'eq', math: inf, note: rowVals(A).replace('max', t('le plus grand de ')), subgoal: 'norm' });
  return out;
}

function froSeg(d, { menu = false } = {}) {
  const v = rad(q(fro2(d.A)));
  return [
    seg(t('‖A‖_F : la racine de la somme des carrés des cases.'), '‖A‖_F =', 'N_F', { kind: 'value', expect: v, form: 'exact', ...(menu ? { menu: menuOf(NM_MENU, 'fro') } : {}) }),
    { kind: 'eq', math: v, note: R(`√(${d.A.flat().map((x) => `${x < 0 ? `(${x})` : x}²`).join(' + ')}) = √${fro2(d.A)}`), subgoal: 'norm' },
  ];
}

function twoSeg(d, { menu = false, guided = false } = {}) {
  const AtA = MX.mul(MX.transpose(d.Aq), d.Aq);
  const v = rad(q(d.s1));
  const ata = { kind: 'eq', math: mt(AtA), note: t('Produit, symétrique'), subgoal: 'ata' };
  return [
    seg('AᵀA.', 'AᵀA =', 'A^T·A', { kind: 'mat', names: { A: mt(d.Aq) }, ...(menu ? { menu: menuOf(NM_MENU, 'ata') } : {}) }),
    guided ? withCells(ata, [[0, 1], [1, 1]]) : ata,
    seg(t('‖A‖₂ = σ₁ = √(plus grande valeur propre de AᵀA).'), '‖A‖₂ =', 'N_2', { kind: 'value', expect: v, form: 'exact', mnorm: { A: mt(d.Aq), p: '2' }, ...(menu ? { menu: menuOf(NM_MENU, 'sigma') } : {}) }),
    { kind: 'eq', math: v, note: t('√{s1} : valeurs propres de AᵀA {s1} et {s2} (trace {tr}, déterminant {det})', { s1: d.s1, s2: d.s2, tr: d.s1 + d.s2, det: d.s1 * d.s2 }), subgoal: 'eig' },
  ];
}

function normsItem(level, rng) {
  if (level === 5) return normsProblem(rng);
  const d = normData(rng, { realEig: level === 4 });
  let parts;
  let prompt;
  if (level <= 2) {
    parts = [...oneInf(d, { guided: true, decide: level === 2 }), ...froSeg(d)];
    if (level === 2) {
      parts.splice(parts.findIndex((l) => l.ask === '‖A‖_F ='), 0);
    }
    prompt = t('A = {A}. {def} Calcule ‖A‖₁, ‖A‖∞ et ‖A‖_F.', { A: MLm(d.Aq), def: normsDef });
  } else if (level === 3) {
    parts = [...oneInf(d, { menu: true }), ...froSeg(d, { menu: true }), ...twoSeg(d, { menu: true })];
    prompt = t('A = {A}. {def} Calcule les quatre normes. Choisis d\'abord chaque action.', { A: MLm(d.Aq), def: normsDef });
  } else {
    parts = [...twoSeg(d), ...froSeg(d)];
    prompt = t('A = {A}. {def} Calcule ‖A‖₂ par AᵀA (A n\'est pas symétrique), puis ‖A‖_F.', { A: MLm(d.Aq), def: normsDef });
  }
  const { start, judge, script } = splitFirst(parts);
  const AtA = MX.mul(MX.transpose(d.Aq), d.Aq);
  return matLines({
    skill: NM, level, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', tapActions: level === 3 ? 'menu' : null, keys: KEYS,
    prompt, start, judge, script, subgoals: NM_SUB, key: `${NM}:${level}:${mt(d.Aq)}`, baits: level >= 3 ? ['m_norm_1_inf_swap', 'm_norm2_eig'] : ['m_norm_1_inf_swap'],
    hints: level >= 3 ? H(t('‖A‖₂ n\'est pas lue sur A : c\'est √(λ_max(AᵀA)), sauf si A est symétrique.'),
      `AᵀA = [[${fq(AtA[0][0])}, □], [□, ${fq(AtA[1][1])}]]`,
      `‖A‖₂ = ${R(rad(q(d.s1)))}, ‖A‖_F = ${R(rad(q(fro2(d.A))))}`)
      : H(t('‖·‖₁ : colonnes (le 1 est vertical) ; ‖·‖∞ : lignes (le ∞ est couché).'),
        `‖A‖₁ = ${R(colVals(d.A)).replace(/\d+ ;/, '□ ;')}`,
        `‖A‖₁ = ${n1(d.A)}, ‖A‖∞ = ${ninf(d.A)}, ‖A‖_F = ${R(rad(q(fro2(d.A))))}`),
    fallback: d.fallback,
  });
}

// L5: ‖A‖₂ by AᵀA, then two true/false on norms and ρ(A).
function normsProblem(rng) {
  const d = normData(rng, { realEig: true });
  const { start, judge, script } = splitFirst(twoSeg(d));
  const calc = linesItem({ baits: ['m_norm2_eig'], skill: NM, level: 5, prompt: t('‖A‖₂ pour A = {A}.', { A: MLm(d.Aq) }), start, judge, script, mode: 'free', keys: KEYS, noHints: true, subgoals: NM_SUB, key: `${NM}:5:${mt(d.Aq)}` });
  const t1 = normsTf(rng, 5);
  let t2 = normsTf(rng, 5);
  for (let i = 0; i < 10 && t2.key === t1.key; i++) t2 = normsTf(rng, 5);
  return problemItem({
    skill: NM, level: 5, key: `5:${mt(d.Aq)}:${t1.key}:${t2.key}`,
    prompt: t('Normes de matrices. A = {A}.', { A: MLm(d.Aq) }),
    parts: [{ item: calc, points: 2, title: '‖A‖₂' }, { item: t1, points: 1, title: t('Vrai ou faux') }, { item: t2, points: 1, title: t('Vrai ou faux') }],
  });
}

function normsTf(rng, level = 4, exam = false) {
  const k = rng.int(0, 4);
  const o = { skill: NM, level, exam, noHints: level === 5 };
  if (k === 0) {
    return tfL({
      ...o, key: 'norm2-eig', truth: false, ruleIfTrue: 'm_norm2_eig', statement: t('Pour toute matrice carrée A, ‖A‖₂ = max |λᵢ(A)|.'),
      counter: { kind: 'matOne', params: { want: 'svNotAbsEig', n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: '[[0,1],[0,0]]' } },
      explanation: t('Faux : [[0, 1], [0, 0]] a ses valeurs propres nulles mais ‖A‖₂ = 1. Seulement vrai si A est symétrique (ou normale).'),
    });
  }
  if (k === 1) return tfL({ ...o, key: 'rho', truth: true, statement: t('Pour toute matrice carrée A, ρ(A) ≤ ‖A‖∞.'), explanation: t('Vrai : si Av = λv, v ≠ 0, alors |λ|‖v‖∞ = ‖Av‖∞ ≤ ‖A‖∞‖v‖∞. C\'est vrai pour toute norme subordonnée.') });
  if (k === 2) return tfL({ ...o, key: 'sub', truth: true, statement: t('Pour toute norme subordonnée, ‖AB‖ ≤ ‖A‖·‖B‖.'), explanation: t('Vrai : ‖ABx‖ ≤ ‖A‖‖Bx‖ ≤ ‖A‖‖B‖‖x‖.') });
  if (k === 3) {
    return tfL({
      ...o, key: 'one-inf', truth: false, ruleIfTrue: 'm_norm_1_inf_swap', statement: t('Pour toute matrice A, ‖A‖₁ = ‖A‖∞.'),
      counter: { kind: 'mx', prop: 'norm1NeInf', params: {}, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: '[[3,0],[4,5]]' } },
      explanation: t('Faux : pour [[3, 0], [4, 5]], ‖A‖₁ = 7 (colonnes) et ‖A‖∞ = 9 (lignes). Égalité si A est symétrique.'),
    });
  }
  return tfL({
    ...o, key: 'fro-two', truth: false, statement: t('Pour toute matrice A, ‖A‖_F = ‖A‖₂.'),
    counter: { kind: 'mx', prop: 'frobNeTwo', params: {}, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: '[[1,0],[0,1]]' } },
    explanation: t('Faux : ‖I₂‖₂ = 1 mais ‖I₂‖_F = √2. On a seulement ‖A‖₂ ≤ ‖A‖_F.'),
  });
}

function normsMcq(rng, exam) {
  const d = normData(rng, { realEig: true, wholeEig: true });
  const p = rng.pick(['1', 'inf', '2']);
  const one = n1(d.A);
  const inf = ninf(d.A);
  const big = Math.max(...d.A.flat().map(abs));
  const l = lam(d.A);
  const rho = Math.max(...l.map(abs));
  const showN = (x) => R(String(x));
  const name = p === '1' ? '‖A‖₁' : p === 'inf' ? '‖A‖∞' : '‖A‖₂';
  const right = p === '1' ? String(one) : p === 'inf' ? String(inf) : R(rad(q(d.s1)));
  const wrongs = p === '2'
    ? [{ html: showN(rho), rule: 'm_norm2_eig' }, { html: R(rad(q(fro2(d.A)))) }, { html: R(String(d.s1)), rule: 'l_svd_sigma_is_eig' }]
    : [{ html: String(p === '1' ? inf : one), rule: 'm_norm_1_inf_swap' }, { html: String(big) }, { html: String(d.A.flat().reduce((s, x) => s + abs(x), 0)) }];
  return mcqDistinct({
    skill: NM, level: 4, key: `mcq:${p}:${mt(d.Aq)}`, exam: examTag({ exam }),
    prompt: t('A = {A}. Que vaut {name} ?', { A: MLm(d.Aq), name }),
    right, wrongs, fillers: [{ html: String(one + inf) }, { html: String(big + 1) }, { html: R(rad(q(d.s2))) }],
    solution: [{ html: p === '2' ? t('AᵀA a les valeurs propres {s1} et {s2} : ‖A‖₂ = √{s1} = {right}.', { s1: d.s1, s2: d.s2, right }) : t('Colonnes : ‖A‖₁ = {one} ; lignes : ‖A‖∞ = {inf}.', { one, inf }), note: '' }],
  }, rng);
}

export function genNorms(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return normsMcq(rng, 'mcq');
  if (opts.exam === 'tf') return normsTf(rng, 4, { format: 'tf', points: 1 });
  return normsItem(level, rng);
}

// ======================================================================
// m-cond
// ======================================================================

const gcd = (a, b) => { a = abs(a); b = abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
// Symmetric positive definite, whole eigenvalues, κ = l1/l2.
function spdData(rng, { whole = true } = {}) {
  const list = sym2List().filter((x) => x.l2 > 0 && x.l1 !== x.l2 && (!whole || x.l1 % x.l2 === 0) && x.A.flat().every((v) => abs(v) <= 9));
  const d = rng.pick(list);
  const [[a, b]] = d.A;
  // Eigenvectors: (b ; l − a), whole and reduced.
  const vec = (l) => { const v = [b, l - a]; const g = gcd(v[0], v[1]); const w = v.map((x) => x / g); return w[0] < 0 ? w.map((x) => -x) : w; };
  return { ...d, Aq: MX.mat(d.A), v1: vec(d.l1), v2: vec(d.l2), kappa: q(d.l1, d.l2) };
}

const CD_MENU = [
  { id: 'kappa', label: t('Calculer κ₂'), why: t('κ₂ est déjà connu.') },
  { id: 'relb', label: t('Erreur relative de b'), why: t('Pas maintenant.') },
  { id: 'bound', label: t('Borne κ·‖δb‖/‖b‖'), why: t('Il faut d\'abord κ et l\'erreur relative de b.') },
  { id: 'relx', label: t('Erreur relative de x'), why: t('Pas maintenant.') },
];

function kappaSym(d, { guided = false, menu = false, decision = null } = {}) {
  const k = qt(d.kappa);
  const out = [
    seg('κ₂(A).', 'κ₂ =', 'κ_2', { kind: 'value', expect: k, form: 'irreducible', ...(menu ? { menu: menuOf(CD_MENU, 'kappa') } : {}) }),
  ];
  if (decision) out.push(decision);
  const two = guided && d.l2 !== 1 && `${d.l1}/${d.l2}` !== k;
  if (two) out.push({ kind: 'eq', math: `${d.l1}/${d.l2}`, ...blanksOf(`${d.l1}/${d.l2}`, [String(d.l2)]), note: 'λ_max/λ_min', subgoal: 'norms' });
  const last = { kind: 'eq', math: k, note: two ? t('Simplifié') : `λ_max/λ_min = ${d.l1}/${d.l2}`, subgoal: 'bound' };
  out.push(guided ? { ...last, ...blankAll(k) } : last);
  return out;
}

function kappaNs(d, { guided = false, decision = null } = {}) {
  const v = rad(q(d.s1, d.s2));
  const out = [seg('κ₂(A) = σ₁/σ₂.', 'κ₂ =', 'κ_2', { kind: 'value', expect: v, form: 'exact', mcond: { A: mt(d.Aq) } })];
  if (decision) out.push(decision);
  const l = { kind: 'eq', math: v, note: t('√({s1}/{s2}) : σ₁² = {s1}, σ₂² = {s2} (valeurs propres de AᵀA)', { s1: d.s1, s2: d.s2 }), subgoal: 'norms' };
  out.push(guided ? { ...l, ...blankAll(v) } : l);
  return out;
}

function condItem(level, rng) {
  if (level === 3) return condBound(rng, 3);
  if (level === 4) return condInf(rng);
  if (level === 5) return condTable(rng);
  const sym = rng.chance(0.5);
  let parts;
  let prompt;
  let d;
  if (sym) {
    d = spdData(rng);
    const decision = level === 2 ? { kind: 'decision', prompt: t('A est symétrique définie positive. Quelle formule pour κ₂ ?'), options: [
      { id: 'eig', label: 'λ_max/λ_min', valid: true },
      { id: 'det', label: t('1/|det A| : plus det est petit, plus A est mal conditionnée'), valid: false, rule: 'm_cond_det', why: t('Un petit déterminant ne dit rien : 10⁻³I a κ = 1. Ici det A = {det}.', { det: d.l1 * d.l2 }) },
      { id: 'diff', label: 'λ_max − λ_min', valid: false, why: t('κ est un rapport : multiplier A par un nombre ne change pas κ.') },
    ] } : null;
    parts = kappaSym(d, { guided: true, decision });
    prompt = t('A = {A} est symétrique, de valeurs propres {l1} et {l2}. Calcule κ₂(A).', { A: MLm(d.Aq), l1: d.l1, l2: d.l2 });
  } else {
    d = normData(rng, { triangular: true, realEig: true });
    const decision = level === 2 ? { kind: 'decision', prompt: t('A n\'est pas symétrique. Quelle formule pour κ₂ ?'), options: [
      { id: 'sigma', label: t('σ₁/σ₂, avec les valeurs propres de AᵀA'), valid: true },
      { id: 'eig', label: t('|λ_max/λ_min| avec les valeurs propres de A ({a} et {b})', { a: fq(q(d.A[0][0])), b: fq(q(d.A[1][1])) }), valid: false, rule: 'm_cond_eig_nonsym', why: t('Pour A non symétrique, les valeurs propres de A ne donnent pas les valeurs singulières.') },
    ] } : null;
    parts = kappaNs(d, { guided: true, decision });
    prompt = t('A = {A} ; AᵀA a les valeurs propres {s1} et {s2}. Calcule κ₂(A).', { A: MLm(d.Aq), s1: d.s1, s2: d.s2 });
  }
  const { start, judge, script } = splitFirst(parts);
  return matLines({
    skill: CD, level, mode: 'guided', keys: KEYS, prompt, start, judge, script, subgoals: CD_SUB,
    key: `${CD}:${level}:${mt(d.Aq)}`,
    hints: H(t('κ₂ = plus grande sur plus petite valeur singulière ; pour A symétrique définie positive, λ_max/λ_min.'),
      sym ? `κ₂ = ${d.l1}/□` : `κ₂ = √(${d.s1}/□)`,
      sym ? fq(d.kappa) : R(rad(q(d.s1, d.s2)))),
    fallback: d.fallback,
  });
}

// The bound ‖δx‖/‖x‖ ≤ κ·‖δb‖/‖b‖, reached: b on v₁, δb on v₂.
function condBound(rng, level) {
  const d = spdData(rng);
  const b = d.v1.map((x) => q(x * d.l1));
  const db = d.v2.map((x) => q(x * d.l1, 100));
  const x = d.v1.map((v) => q(v));
  const relb = q(1, 100);
  const relx = d.kappa.div(100);
  const M = (id) => (level === 3 ? { menu: menuOf(CD_MENU, id) } : {});
  const parts = [
    ...kappaSym(d, { menu: level === 3 }),
    seg(t('L\'erreur relative de b, ‖δb‖/‖b‖ (norme 2).'), '‖δb‖/‖b‖ =', 'r_b', { kind: 'value', expect: qt(relb), form: 'irreducible', ...M('relb') }),
    { kind: 'eq', math: qt(relb), note: t('δb = {c}·{v2} et b = {l1}·{v1}, de même norme {n}', { c: fq(q(d.l1, 100)), v2: vR(d.v2), l1: d.l1, v1: vR(d.v1), n: R(rad(q(d.v1[0] ** 2 + d.v1[1] ** 2))) }), subgoal: 'bound' },
    seg(t('La borne κ₂·‖δb‖/‖b‖ sur l\'erreur relative de x.'), t('borne ='), 'B', { kind: 'value', expect: qt(relx), form: 'irreducible', ...M('bound') }),
    { kind: 'eq', math: qt(relx), note: `${fq(d.kappa)} × 1/100`, subgoal: 'bound' },
    seg(t('L\'erreur relative ‖δx‖/‖x‖ vraiment obtenue.'), '‖δx‖/‖x‖ =', 'r_x', { kind: 'value', expect: qt(relx), form: 'irreducible', ...M('relx') }),
    { kind: 'eq', math: qt(relx), note: t('δb est vecteur propre pour {l2} : δx = δb/{l2}, la borne est atteinte', { l2: d.l2 }), subgoal: 'bound' },
  ];
  const { start, judge, script } = splitFirst(parts);
  return matLines({
    skill: CD, level, mode: level === 3 ? 'tap' : 'free', tapActions: level === 3 ? 'menu' : null, keys: KEYS,
    prompt: t('A = {A} (valeurs propres {l1} et {l2}), Ax = b avec b = {b}, donc x = {x}. On perturbe b de δb = {db}. Calcule κ₂(A), ‖δb‖/‖b‖, la borne sur ‖δx‖/‖x‖, puis ‖δx‖/‖x‖.{tap}', { A: MLm(d.Aq), l1: d.l1, l2: d.l2, b: ML2(b), x: ML2(x), db: ML2(db), tap: level === 3 ? ` ${t('Choisis d\'abord chaque action.')}` : '' }),
    start, judge, script, subgoals: CD_SUB, key: `${CD}:${level}:bound:${mt(d.Aq)}`, baits: [],
    hints: H(t('‖δx‖/‖x‖ ≤ κ(A)·‖δb‖/‖b‖ ; si δb est vecteur propre de la plus petite valeur propre, δx = δb/λ_min.'),
      t('borne = {k} × □', { k: fq(d.kappa) }), t('κ₂ = {k}, ‖δb‖/‖b‖ = 1/100, borne = ‖δx‖/‖x‖ = {relx}', { k: fq(d.kappa), relx: fq(relx) })),
  });
}
const ML2 = (v) => MLm(v.map((x) => [x]));

// L4: κ∞ (or κ₁) by A⁻¹.
function condInf(rng) {
  for (let tries = 0; tries < 200; tries++) {
    const A = [[rng.int(-4, 5), rng.int(-4, 4)], [rng.int(-4, 4), rng.int(-4, 5)]];
    const det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
    if (![1, -1, 2, -2, 3].includes(det) || A.flat().filter((x) => x === 0).length > 1) continue;
    const Aq = MX.mat(A);
    const Ai = MX.inverse(Aq);
    const p = rng.chance(0.5) ? 'inf' : '1';
    const nf = (M) => (p === 'inf' ? MX.toNumbers(M).map((r) => r.reduce((s, x) => s + abs(x), 0)) : MX.transpose(MX.toNumbers(M)).map((r) => r.reduce((s, x) => s + abs(x), 0)));
    const nA = q(Math.max(...nf(Aq)));
    const sums = (M) => (p === 'inf' ? M : MX.transpose(M)).map((r) => r.reduce((s, x) => s.add(x.n < 0 ? x.neg() : x), q(0)));
    const nAi = sums(Ai).reduce((m, x) => (x.cmp(m) > 0 ? x : m), q(0));
    const kap = nA.mul(nAi);
    if (kap.valueOf() > 60) continue;
    const P = p === 'inf' ? '∞' : '₁';
    const parts = [
      seg('A⁻¹.', 'A⁻¹ =', 'A^(-1)', { kind: 'mat', names: { A: mt(Aq) } }),
      { kind: 'eq', math: mt(Ai), note: t('(1/det A)·[[d, −b], [−c, a]], det A = {det}', { det: fq(q(det)) }), subgoal: 'norms' },
      seg(`‖A‖${P}.`, `‖A‖${P} =`, `N_${p === 'inf' ? '∞' : '1'}`, { kind: 'value', expect: qt(nA), form: 'irreducible', mnorm: { A: mt(Aq), p } }),
      { kind: 'eq', math: qt(nA), note: p === 'inf' ? t('Lignes') : t('Colonnes'), subgoal: 'norms' },
      seg(`‖A⁻¹‖${P}.`, `‖A⁻¹‖${P} =`, 'M', { kind: 'value', expect: qt(nAi), form: 'irreducible', mnorm: { A: mt(Ai), p } }),
      { kind: 'eq', math: qt(nAi), note: p === 'inf' ? t('Lignes de A⁻¹') : t('Colonnes de A⁻¹'), subgoal: 'norms' },
      seg(`κ${P}(A) = ‖A‖${P}·‖A⁻¹‖${P}.`, `κ${P} =`, 'κ', { kind: 'value', expect: qt(kap), form: 'irreducible' }),
      { kind: 'eq', math: qt(kap), note: t('Produit'), subgoal: 'bound' },
    ];
    const { start, judge, script } = splitFirst(parts);
    return matLines({
      skill: CD, level: 4, mode: 'free', keys: KEYS,
      prompt: t('A = {A}. Calcule A⁻¹, puis κ{P}(A) = ‖A‖{P}·‖A⁻¹‖{P}.', { A: MLm(Aq), P }),
      start, judge, script, subgoals: CD_SUB, key: `${CD}:4:${mt(Aq)}:${p}`, baits: ['m_norm_1_inf_swap'],
      hints: H(`κ${P} = ‖A‖${P}·‖A⁻¹‖${P} ; ${p === 'inf' ? t('‖·‖∞ : lignes') : t('‖·‖₁ : colonnes')}.`,
        `A⁻¹ = (1/${fq(q(det))})·[[${A[1][1]}, □], [□, ${A[0][0]}]]`,
        `A⁻¹ = ${R(mt(Ai))}, κ${P} = ${fq(nA)} × ${fq(nAi)} = ${fq(kap)}`),
    });
  }
  return condBound(rng, 4);
}

// L5: a table of perturbations: κ₂, then which δb reaches the bound.
function condTable(rng) {
  const d = spdData(rng);
  const nb = Math.hypot(...d.v1) * d.l1;
  const rows = rng.shuffle([
    { db: d.v2, reach: true }, { db: d.v1, reach: false },
    { db: [d.v1[0] + d.v2[0], d.v1[1] + d.v2[1]], reach: false },
  ]).map((r, i) => {
    const dbv = r.db.map((x) => x / 100);
    const dx = LF.solve(d.A, dbv);
    return { ...r, i: i + 1, dbv, relb: Math.hypot(...dbv) / nb, relx: Math.hypot(...dx) / Math.hypot(...d.v1) };
  });
  const idx = rows.find((r) => r.reach).i;
  const show = (x) => x.toFixed(5).replace('.', ',');
  const tbl = `<table class="u-table"><thead><tr><th>n°</th><th>δb</th><th>‖δb‖/‖b‖</th><th>‖δx‖/‖x‖</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${r.i}</td><td>${R(`(${r.dbv.map((x) => String(x).replace('.', ',')).join(' ; ')})`)}</td><td>${show(r.relb)}</td><td>${show(r.relx)}</td></tr>`).join('')}</tbody></table>`;
  const script = [
    ...kappaSym(d).slice(1),
    seg(t('Le numéro de la perturbation qui atteint la borne ‖δx‖/‖x‖ = κ₂·‖δb‖/‖b‖.'), 'n° =', 'n', { kind: 'value', expect: String(idx), form: 'irreducible' }),
    { kind: 'eq', math: String(idx), note: t('Rapport {k} : δb sur le vecteur propre de λ_min = {l2}', { k: fq(d.kappa), l2: d.l2 }), subgoal: 'bound' },
  ];
  return linesItem({
    skill: CD, level: 5, mode: 'free', keys: KEYS, noHints: true,
    prompt: t('A = {A} (symétrique, valeurs propres {l1} et {l2}), b = {b}. On résout A(x + δx) = b + δb pour trois perturbations :{tbl}Donne κ₂(A), puis la perturbation qui atteint la borne.', { A: MLm(d.Aq), l1: d.l1, l2: d.l2, b: ML2(d.v1.map((x) => q(x * d.l1))), tbl }),
    start: 'κ_2', judge: { kind: 'value', expect: qt(d.kappa), form: 'irreducible' }, script,
    subgoals: CD_SUB, key: `${CD}:5:${mt(d.Aq)}:${rows.map((r) => r.reach ? 1 : 0).join('')}`,
  });
}

function condMcq(rng, exam) {
  if (rng.chance(0.5)) {
    const d = normData(rng, { triangular: true, realEig: true });
    const k = R(rad(q(d.s1, d.s2)));
    const eigR = q(Math.max(abs(d.A[0][0]), abs(d.A[1][1])), Math.min(abs(d.A[0][0]), abs(d.A[1][1])));
    return mcqDistinct({
      skill: CD, level: 4, key: `mcq:ns:${mt(d.Aq)}`, exam: examTag({ exam }),
      prompt: t('A = {A} ; AᵀA a les valeurs propres {s1} et {s2}. Que vaut κ₂(A) ?', { A: MLm(d.Aq), s1: d.s1, s2: d.s2 }),
      right: k,
      wrongs: [{ html: fq(eigR), rule: 'm_cond_eig_nonsym' }, { html: R(rad(q(d.s2, d.s1))) }, { html: fq(q(d.s1, d.s2)), rule: 'l_svd_sigma_is_eig' }],
      fillers: [{ html: fq(q(1, abs(d.det))), rule: 'm_cond_det' }, { html: '1' }],
      solution: [{ html: t('κ₂ = σ₁/σ₂ = √({s1}/{s2}) = {k} ; les valeurs propres de A (sur la diagonale) ne suffisent pas, A n\'étant pas symétrique.', { s1: d.s1, s2: d.s2, k }), note: '' }],
    }, rng);
  }
  const d = spdData(rng, { whole: false });
  return mcqDistinct({
    skill: CD, level: 4, key: `mcq:sym:${mt(d.Aq)}`, exam: examTag({ exam }),
    prompt: t('A = {A} est symétrique, de valeurs propres {l1} et {l2}. Que vaut κ₂(A) ?', { A: MLm(d.Aq), l1: d.l1, l2: d.l2 }),
    right: fq(d.kappa),
    wrongs: [{ html: fq(q(1, d.l1 * d.l2)), rule: 'm_cond_det' }, { html: fq(q(d.l2, d.l1)) }, { html: String(d.l1 - d.l2) }],
    fillers: [{ html: String(d.l1 * d.l2) }, { html: String(d.l1 + d.l2) }],
    solution: [{ html: t('A symétrique définie positive : κ₂ = λ_max/λ_min = {k}.', { k: fq(d.kappa) }), note: '' }],
  }, rng);
}

function condTf(rng) {
  const exam = { format: 'tf', points: 1 };
  const k = rng.int(0, 3);
  if (k === 0) {
    return tfL({
      skill: CD, key: 'det', truth: false, exam, ruleIfTrue: 'm_cond_det',
      statement: t('Si |det A| < 1/100, alors κ₂(A) > 100 : A est mal conditionnée.'),
      counter: { kind: 'mx', prop: 'smallDetGoodCond', params: {}, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: '[[1/20,0],[0,1/20]]' } },
      explanation: t('Faux : (1/20)·I a det = 1/400 mais κ₂ = 1. Multiplier A par un nombre change det, pas κ.'),
    });
  }
  if (k === 1) return tfL({ skill: CD, key: 'ge1', truth: true, exam, ruleIfFalse: 'm_cond_det', statement: t('Pour toute matrice inversible A et toute norme subordonnée, κ(A) ≥ 1.'), explanation: t('Vrai : 1 = ‖I‖ = ‖AA⁻¹‖ ≤ ‖A‖·‖A⁻¹‖.') });
  if (k === 2) return tfL({ skill: CD, key: 'orth', truth: true, exam, statement: t('κ₂(Q) = 1 pour toute matrice orthogonale Q.'), explanation: t('Vrai : toutes les valeurs singulières de Q valent 1.') });
  return tfL({
    skill: CD, key: 'eig-ratio', truth: false, exam, ruleIfTrue: 'm_cond_eig_nonsym',
    statement: t('Pour toute matrice inversible A à valeurs propres réelles, κ₂(A) = |λ_max|/|λ_min|.'),
    counter: { kind: 'mx', prop: 'condNotEigRatio', params: {}, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: '[[1,2],[0,1]]' } },
    explanation: t('Faux : [[1, 2], [0, 1]] a ses valeurs propres égales à 1, mais κ₂ = σ₁/σ₂ = 3 + 2√2. La formule n\'est vraie que pour A symétrique.'),
  });
}

export function genCond(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return condMcq(rng, 'mcq');
  if (opts.exam === 'tf') return condTf(rng);
  return condItem(level, rng);
}
