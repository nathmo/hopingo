// Generators of m-normal-eq (module M, part b, step U8). Catalogue:
// docs/universite/L-M-algebre-lineaire.md, M, `m-normal-eq`.
//
// y = Xβ̂ + r with X the design matrix (a column of 1, then x, and x² for a
// parabola), β̂ whole and r ≠ 0 whole in Ker Xᵀ (lsqReverse): β̂ is the
// least-squares estimate. Parts (judge `mat` unless said, cfg.lsq for the
// traps of L): X, XᵀX, Xᵀy, β̂, the residuals, σ̂² = RSS/(n − p) and
// Var̂(β̂ⱼ) = σ̂²·((XᵀX)⁻¹)ⱼⱼ (`value`, cfg.nvar for m_var_no_inverse).
// Levels 1–3 take centred x (XᵀX diagonal).

import * as MX from '../../cas/matrix.js';
import { RULE_BY_ID } from '../../math/malrules.js';
import { q, mt, vt, MLm, fq, qt, mcqDistinct, tfL, examTag, withCells, lsqReverse } from './alglin-kit.js';
import { mcq } from './kit.js';
import { problemItem } from './kit-problem.js';
import { sub, par, eq, menu, hints3, modeOf, menuOf, partsItem, vR, maxAbs } from './matrices-b-kit.js';

const NE = 'm-normal-eq';
const NE_SUB = [
  { id: 'design', label: 'matrice de design', skill: NE },
  { id: 'normal', label: 'équations normales', skill: 'l-orth-lsq' },
  { id: 'var', label: 'variance de l\'estimateur', skill: NE },
];
const NE_MENU = [
  { id: 'X', label: 'Écrire la matrice de design X', why: 'X est déjà écrite.' },
  { id: 'XtX', label: 'Calculer XᵀX', why: 'Ce n\'est pas l\'étape demandée ici.' },
  { id: 'Xty', label: 'Calculer Xᵀy', why: 'Ce n\'est pas l\'étape demandée ici.' },
  { id: 'beta', label: 'Résoudre XᵀXβ = Xᵀy', why: 'Il faut d\'abord XᵀX et Xᵀy.' },
  { id: 'res', label: 'Calculer les résidus y − Xβ̂', why: 'Il faut d\'abord β̂.' },
  { id: 's2', label: 'σ̂² = RSS/(n − p)', why: 'Il faut d\'abord les résidus.' },
  { id: 'var', label: 'Var̂(β̂ⱼ) = σ̂²·((XᵀX)⁻¹)ⱼⱼ', why: 'Il faut d\'abord σ̂².' },
];
// p_reg_sigma_n is a trap of module P (step U7): named once P is merged.
const SIGMA_N = RULE_BY_ID.p_reg_sigma_n ? 'p_reg_sigma_n' : null;

const CENTRED = { 3: [[-1, 0, 1]], 4: [[-3, -1, 1, 3], [-2, -1, 1, 2]], 5: [[-2, -1, 0, 1, 2]] };
const OTHER = { 4: [[0, 1, 2, 3], [1, 2, 3, 4], [0, 1, 2, 4], [-1, 0, 1, 3], [-1, 0, 1, 2]], 5: [[0, 1, 2, 3, 4], [-1, 0, 1, 2, 3], [-1, 0, 1, 2, 4]] };

// p = 2 (line) or 3 (parabola); centred x when asked.
function neData(rng, { p = 2, centred = true, n = null } = {}) {
  for (let t = 0; t < 400; t++) {
    const m = n ?? (p === 3 ? rng.pick([4, 5]) : rng.pick([4, 5, 5]));
    const pool = centred && CENTRED[m] ? CENTRED[m] : OTHER[m] || CENTRED[m];
    const xs = rng.pick(pool);
    const X = xs.map((x) => (p === 3 ? [q(1), q(x), q(x * x)] : [q(1), q(x)]));
    const beta = p === 2
      ? [q(rng.int(-6, 6), rng.chance(0.3) ? 2 : 1), q(rng.int(-3, 3))]
      : [q(rng.int(-3, 3)), q(rng.int(-2, 2)), q(rng.pick([1, -1, 2, -2]))];
    if (beta.slice(1).every((v) => v.n === 0)) continue;
    const r = lsqReverse(X, beta, rng);
    if (r.fallback || r.r.every((v) => v.n === 0)) continue;
    const y = r.b;
    if (y.some((v) => v.d !== 1) || maxAbs([y]) > (p === 3 ? 20 : 12)) continue;
    const Xt = MX.transpose(X);
    const XtX = MX.mul(Xt, X);
    const Xty = MX.matVec(Xt, y);
    const inv = MX.inverse(XtX);
    const rss = MX.dot(r.r, r.r);
    const s2 = rss.div(q(m - p));
    const j = p === 2 ? 1 : rng.int(1, 2);
    const v = s2.mul(inv[j][j]);
    if (maxAbs(XtX) > 80 || v.d > 400) continue;
    return { xs, X, y, beta, r: r.r, XtX, Xty, inv, rss, s2, j, v, n: m, p };
  }
  const xs = [-2, -1, 0, 1, 2];
  const X = xs.map((x) => [q(1), q(x)]);
  const y = [1, 1, 2, 4, 2].map((v) => q(v));
  const XtX = MX.mul(MX.transpose(X), X);
  const inv = MX.inverse(XtX);
  const rr = [0, -1, 0, 3, -2].map((v) => q(v, 2));
  const rss = MX.dot(rr, rr);
  const s2 = rss.div(q(3));
  return { xs, X, y, beta: [q(2), q(1, 2)], r: rr, XtX, Xty: MX.matVec(MX.transpose(X), y), inv, rss, s2, j: 1, v: s2.mul(inv[1][1]), n: 5, p: 2, fallback: true };
}

const lsqCfg = (d, ask, extra = {}) => ({ A: d.X.map((r) => r.map(qt)), b: d.y.map(qt), ask, line: d.p === 2, ...extra });
// The data as points (xᵢ ; yᵢ).
const tableR = (d) => d.xs.map((x, i) => `(${fq(x)} ; ${fq(d.y[i])})`).join(', ');
const modelR = (p) => (p === 2 ? 'y = β₀ + β₁x' : 'y = β₀ + β₁x + β₂x²');
const bName = (j) => `β̂${sub(j)}`;

function neParts(d, rng, { guided = false, menuOn = false, upTo = 'beta', colsDecision = false, both = false } = {}) {
  const M = (id) => (menuOn ? { menu: menuOf(NE_MENU, id) } : {});
  const names = { X: mt(d.X) };
  const cells = (A, k) => rng.shuffle(A.flatMap((r, i) => r.map((_, j) => [i, j]))).slice(0, k).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const xLine = eq(mt(d.X), `Une ligne par observation : ${d.p === 2 ? '1, xᵢ' : '1, xᵢ, xᵢ²'}`, 'design');
  const gLine = eq(mt(d.XtX), MX.isDiagonal(d.XtX) ? 'Diagonale : les x sont centrés' : '', 'normal');
  const bLine = eq(vt(d.beta), MX.isDiagonal(d.XtX) ? 'β̂ⱼ = (Xᵀy)ⱼ/(XᵀX)ⱼⱼ' : 'XᵀXβ = Xᵀy', 'normal');
  const ps = [
    { judge: { kind: 'mat', expect: mt(d.X), ...M('X') }, start: 'X', html: 'La matrice de design X', ask: 'X =', lines: [guided ? withCells(xLine, d.X.map((_, i) => [i, 1]).slice(0, 3)) : xLine],
      pre: colsDecision ? [{ kind: 'decision', prompt: `Modèle ${modelR(d.p)} : quelles colonnes a X ?`, options: rng.shuffle(menu(d.p === 2 ? 'Une colonne de 1, une colonne des xᵢ' : 'Une colonne de 1, une des xᵢ, une des xᵢ²', [
        [d.p === 2 ? 'Une colonne des xᵢ seulement' : 'Une colonne des xᵢ, une des xᵢ²', 'Sans colonne de 1, il n\'y a pas d\'ordonnée à l\'origine β₀ : la droite passerait par 0.'],
        ['Une colonne des xᵢ, une colonne des yᵢ', 'Les yᵢ sont le second membre, pas une colonne de X.'],
      ])) }] : [] },
    { judge: { kind: 'mat', expect: mt(d.XtX), names, lsq: lsqCfg(d, 'AtA'), ...M('XtX') }, start: 'XᵀX', html: 'Les équations normales : XᵀX', ask: 'XᵀX =', lines: [...(guided ? [] : [eq('X^T·X', '', 'normal')]), guided ? withCells(gLine, cells(d.XtX, 2)) : gLine] },
    { judge: { kind: 'mat', expect: vt(d.Xty), names, ...M('Xty') }, start: 'Xᵀy', html: 'Le second membre Xᵀy', ask: 'Xᵀy =', lines: [...(guided ? [] : [eq(`X^T·${vt(d.y)}`, '', 'normal')]), eq(vt(d.Xty), 'Colonnes de X · y', 'normal')] },
    { judge: { kind: 'mat', expect: vt(d.beta), names, lsq: lsqCfg(d, 'x'), ...M('beta') }, start: 'β̂', html: 'L\'estimation β̂ : XᵀXβ̂ = Xᵀy', ask: 'β̂ =', lines: [guided ? withCells(bLine, [[d.p - 1, 0]]) : bLine] },
  ];
  if (upTo === 'beta') return ps;
  const sq = d.r.map((x) => `${par(x)}^2`).join('+');
  ps.push(
    { judge: { kind: 'mat', expect: vt(d.r), names, ...M('res') }, start: 'r', html: 'Les résidus r = y − Xβ̂', ask: 'r =', lines: [eq(`${vt(d.y)} - X·${vt(d.beta)}`, '', 'var'), eq(vt(d.r), 'Xᵀr = 0 : contrôle', 'var')] },
    { judge: { kind: 'value', expect: qt(d.s2), ...M('s2') }, start: 'σ^2', html: `La variance résiduelle σ̂² = RSS/(n − p), n = ${d.n}, p = ${d.p}`, ask: 'σ̂² =', lines: [eq(`(${sq})/${d.n - d.p}`, 'RSS = Σ rᵢ²', 'var'), eq(qt(d.s2), '', 'var')] },
  );
  if (upTo === 's2') return ps;
  const js = both ? [0, 1] : [d.j];
  for (const j of js) {
    const v = d.s2.mul(d.inv[j][j]);
    ps.push({ judge: { kind: 'value', expect: qt(v), nvar: { s2: qt(d.s2), d: qt(d.XtX[j][j]), j }, ...M('var') }, start: `V_${j}`, html: `La variance estimée de ${bName(j)} : σ̂²·((XᵀX)⁻¹)${sub(j + 1)}${sub(j + 1)}`, ask: `Var̂(${bName(j)}) =`,
      lines: [eq(`${par(d.s2)}×${par(d.inv[j][j])}`, `((XᵀX)⁻¹)${sub(j + 1)}${sub(j + 1)} = ${fq(d.inv[j][j])}`, 'var'), eq(qt(v), '', 'var')] });
  }
  return ps;
}

const neHints = (d) => hints3(
  'Une ligne de X par observation ; puis XᵀXβ = Xᵀy.',
  `XᵀX = ${d.p === 2 ? `[[${fq(d.XtX[0][0])}, □], [□, ${fq(d.XtX[1][1])}]]` : `[[${fq(d.XtX[0][0])}, □, □], …]`}`,
  `β̂ = ${vR(d.beta)}`,
);
const BAITS = ['l_lsq_normal_aat', 'm_var_no_inverse'];

function neItem(level, rng) {
  if (level === 5) return neAlone(rng);
  const p = level === 4 ? 3 : 2;
  const d = neData(rng, { p, centred: level <= 3 || rng.chance(0.4) });
  const key = `${NE}:${d.xs.join(',')}:${vt(d.y)}:${level}`;
  const base = { skill: NE, level, subgoals: NE_SUB, key, fallback: d.fallback, hints: neHints(d), mode: modeOf(level), baits: BAITS };
  const pr = `Modèle ${modelR(d.p)}, points (xᵢ ; yᵢ) : ${tableR(d)}`;
  if (level === 1) return partsItem({ ...base, prompt: `${pr}. Écris la matrice de design X, puis XᵀX, Xᵀy et l'estimation β̂ des moindres carrés.` }, neParts(d, rng, { guided: true }));
  if (level === 2) return partsItem({ ...base, prompt: `${pr}. Trouve β̂ par les équations normales.` }, neParts(d, rng, { guided: true, colsDecision: true }));
  if (level === 3) return partsItem({ ...base, tapActions: 'menu', prompt: `${pr}. Choisis chaque action : X, les équations normales, β̂, les résidus, σ̂², puis Var̂(${bName(d.j)}).` }, neParts(d, rng, { menuOn: true, upTo: 'var' }));
  return partsItem({ ...base, prompt: `${pr}. Calcule β̂ par les équations normales, puis la variance résiduelle σ̂² = RSS/(n − p).` }, neParts(d, rng, { upTo: 's2' }));
}

// Level 5: the whole regression, then « which coefficient is the most precise? ».
function neAlone(rng) {
  const d = neData(rng, { p: 2, centred: rng.chance(0.5), n: rng.pick([4, 5]) });
  const key = `${NE}:alone:${d.xs.join(',')}:${vt(d.y)}`;
  const lines = partsItem({ skill: NE, level: 5, mode: 'free', hints: [], noHints: true, subgoals: NE_SUB, key, baits: BAITS, fallback: d.fallback,
    prompt: 'Régression : X, équations normales, β̂, résidus, σ̂², puis les deux variances estimées.' }, neParts(d, rng, { upTo: 'var', both: true }));
  const v0 = d.s2.mul(d.inv[0][0]);
  const v1 = d.s2.mul(d.inv[1][1]);
  const which = v0.eq(v1) ? 'eq' : v0.cmp(v1) < 0 ? 0 : 1;
  const conc = mcq({
    skill: NE, level: 5, key: `${key}:conc`, prompt: `Var̂(β̂₀) = ${fq(v0)} et Var̂(β̂₁) = ${fq(v1)}. Quel coefficient est estimé le plus précisément ?`,
    options: [
      { html: 'β̂₀', correct: which === 0 },
      { html: 'β̂₁', correct: which === 1 },
      { html: 'Les deux, autant', correct: which === 'eq' },
      { html: 'Celui dont la valeur estimée est la plus grande', correct: false },
    ],
    solution: [{ html: 'Le plus précis est celui de plus petite variance.', note: '' }],
  }, rng);
  return problemItem({ skill: NE, level: 5, key, fallback: d.fallback, prompt: `Modèle ${modelR(2)}, points (xᵢ ; yᵢ) : ${tableR(d)}. Fais la régression complète (β̂, σ̂², Var̂(β̂₀), Var̂(β̂₁)) et dis quel coefficient est le plus précis.`,
    parts: [{ item: lines, points: 6, title: 'Régression' }, { item: conc, points: 1, title: 'Interprétation' }] });
}

function neExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    if (rng.chance(0.5)) {
      const X = rng.pick(['[[1,0],[1,1],[1,2]]', '[[1,-1],[1,0],[1,1]]', '[[1,1],[1,2],[1,3]]', '[[1,0],[1,1],[1,1]]']);
      return tfL({
        skill: NE, key: `var:${X}`, truth: false, exam: tag, ruleIfTrue: 'm_var_no_inverse',
        statement: 'Dans le modèle y = Xβ + ε avec des εᵢ indépendants de variance σ², Var(β̂) = σ²XᵀX.',
        counter: { kind: 'mx', prop: 'varNotXtX', params: {}, ask: [{ v: 'X', label: 'X =', shape: [3, 2] }], answer: { X } },
        explanation: 'Faux : β̂ = (XᵀX)⁻¹Xᵀy, donc Var(β̂) = (XᵀX)⁻¹Xᵀ·σ²I·X(XᵀX)⁻¹ = σ²(XᵀX)⁻¹. Plus il y a de données, plus XᵀX est grand et plus la variance est petite.',
      });
    }
    return tfL({ skill: NE, key: 'orth', truth: true, exam: tag, statement: 'Si les colonnes de la matrice de design X sont orthogonales, les β̂ⱼ se calculent séparément : β̂ⱼ = (Xᵀy)ⱼ/(XᵀX)ⱼⱼ.', explanation: 'Vrai : XᵀX est alors diagonale, et chaque équation normale ne contient qu\'un β̂ⱼ.' });
  }
  const d = neData(rng, { p: 2, centred: rng.chance(0.5) });
  if (rng.chance(0.5)) {
    return mcqDistinct({
      skill: NE, level: 4, key: `mcq:b:${d.xs.join(',')}:${vt(d.y)}`, exam: tag,
      prompt: `Droite des moindres carrés ${modelR(2)} pour les points ${tableR(d)}. Que vaut ${bName(1)} ?`,
      right: fq(d.beta[1]),
      wrongs: [{ html: fq(d.beta[0]), rule: 'l_lsq_line_swap' }],
      fillers: [{ html: fq(d.beta[1].neg()) }, { html: fq(d.Xty[1]) }, { html: fq(d.beta[1].add(1)) }, { html: fq(d.beta[1].mul(2)) }],
      solution: [{ html: `XᵀX = ${MLm(d.XtX)}, Xᵀy = ${vR(d.Xty)}`, note: '' }, { html: `β̂ = ${vR(d.beta)}`, note: '' }],
      fallback: d.fallback,
    }, rng);
  }
  const j = d.j;
  return mcqDistinct({
    skill: NE, level: 4, key: `mcq:v:${d.xs.join(',')}:${vt(d.y)}`, exam: tag,
    prompt: `Régression ${modelR(2)} sur n = ${d.n} points : XᵀX = ${MLm(d.XtX)} et la somme des carrés des résidus vaut RSS = ${fq(d.rss)}. Que vaut la variance estimée de ${bName(j)} ?`,
    right: fq(d.v),
    wrongs: [{ html: fq(d.s2.mul(d.XtX[j][j])), rule: 'm_var_no_inverse' }, { html: fq(d.rss.div(q(d.n)).mul(d.inv[j][j])), rule: SIGMA_N }],
    fillers: [{ html: fq(d.s2) }, { html: fq(d.rss.mul(d.inv[j][j])) }, { html: fq(d.v.mul(2)) }],
    solution: [{ html: `σ̂² = RSS/(n − 2) = ${fq(d.s2)}`, note: '' }, { html: `Var̂(${bName(j)}) = σ̂²·((XᵀX)⁻¹)${sub(j + 1)}${sub(j + 1)} = ${fq(d.v)}`, note: '' }],
    fallback: d.fallback,
  }, rng);
}

export const GEN = {
  [NE]: (level, rng, profile, opts = {}) => (opts.exam ? neExam(rng, opts.exam) : neItem(level, rng)),
};
