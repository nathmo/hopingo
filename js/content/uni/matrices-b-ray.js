// Generators of m-rayleigh (module M, part b, step U8). Catalogue:
// docs/universite/L-M-algebre-lineaire.md, M, `m-rayleigh`.
//
// A symmetric whole with whole eigenvalues (symWhole), x whole and not an
// eigenvector. Parts: Ax (`mat`), xᵀAx and xᵀx (`value`), R(x) (`value`,
// cfg.rayleigh for the trap), the bounds λ_min ≤ R ≤ λ_max as a decision.
// Level 4: max and min of xᵀAx on the unit sphere (det(A − λI), then the
// values and unit eigenvectors, judge `span` orthonormal). Level 5: x close
// to an eigenvector: R(x) against the ratio of components (a problem).

import * as MX from '../../cas/matrix.js';
import { unitText } from '../../cas/rules/l-sym.js';
import { radicalNode } from '../../cas/matexpr.js';
import { toText } from '../../cas/print.js';
import { q, mt, vt, MLm, fq, qt, mcqDistinct, tfL, examTag, withCells } from './alglin-kit.js';
import { mcq } from './kit.js';
import { problemItem } from './kit-problem.js';
import { rootT, sub, par, eq, eqG, menu, hints3, modeOf, menuOf, partsItem, vR, symWhole } from './matrices-b-kit.js';

const RA = 'm-rayleigh';
const RA_SUB = [
  { id: 'prod', label: 'produit Ax', skill: 'l-mat-product' },
  { id: 'quot', label: 'quotient', skill: RA },
  { id: 'bound', label: 'encadrer par les valeurs propres', skill: 'm-spectral' },
];
const RA_MENU = [
  { id: 'prod', label: 'Calculer Ax', why: 'Ax est déjà calculé.' },
  { id: 'num', label: 'Calculer le numérateur xᵀ(Ax)', why: 'Il faut d\'abord Ax, ou ce nombre est déjà calculé.' },
  { id: 'den', label: 'Calculer le dénominateur xᵀx', why: 'Ce n\'est pas l\'étape demandée ici.' },
  { id: 'quot', label: 'Diviser : R(x) = xᵀAx / xᵀx', why: 'Il faut d\'abord le numérateur et le dénominateur.' },
  { id: 'eig', label: 'Chercher les valeurs propres de A', why: 'R(x) se calcule sans les valeurs propres.' },
];

const dotT = (u, v) => u.map((x, i) => `${par(x)}×${par(v[i])}`).join('+');
const sqT = (u) => u.map((x) => `${par(x)}^2`).join('+');
const lamsR = (lams) => { const s = [...new Set(lams)].sort((a, b) => a - b).map((l) => fq(l)); return s.length > 1 ? `${s.slice(0, -1).join(', ')} et ${s.at(-1)}` : s[0]; };

function rayData(rng, n = 2, { pos = false } = {}) {
  for (let t = 0; t < 300; t++) {
    const s = symWhole(n, rng, { pos });
    if (s.fallback) continue;
    const x = Array.from({ length: n }, () => q(rng.int(-2, 3)));
    if (x.filter((v) => v.n !== 0).length < 2) continue;
    const Ax = MX.matVec(s.A, x);
    // Not an eigenvector: Ax not parallel to x.
    if (MX.rank([x, Ax]) < 2) continue;
    const num = MX.dot(x, Ax);
    const den = MX.dot(x, x);
    const R = num.div(den);
    if (num.n === 0 || Math.abs(num.valueOf()) > 150) continue;
    return { ...s, n, x, Ax, num, den, R };
  }
  const A = MX.mat([[3, 1], [1, 3]]);
  const x = [q(2), q(1)];
  const Ax = MX.matVec(A, x);
  return { A, lams: [4, 2], vecs: [[q(1), q(1)], [q(-1), q(1)]], n: 2, x, Ax, num: q(19), den: q(5), R: q(19, 5), fallback: true };
}

const quotLines = (d) => {
  const plain = d.R.d === d.den.valueOf() && d.R.n === d.num.valueOf();
  return plain ? [eq(qt(d.R), 'xᵀAx / xᵀx', 'quot')] : [eq(`${qt(d.num)}÷${qt(d.den)}`, 'xᵀAx / xᵀx', 'quot'), eq(qt(d.R), '', 'quot')];
};

function parts(d, { guided = false, rng = null, menuOn = false, denDecision = false, boundDecision = false } = {}) {
  const M = (id) => (menuOn ? { menu: menuOf(RA_MENU, id) } : {});
  const axLine = eq(vt(d.Ax), 'Ligne par ligne', 'prod');
  const ps = [
    { judge: { kind: 'mat', expect: vt(d.Ax), names: { A: mt(d.A) }, ...M('prod') }, start: 'Ax', html: 'Le produit Ax', ask: 'Ax =',
      lines: [eq(`A·${vt(d.x)}`, '', 'prod'), guided ? withCells(axLine, rng.shuffle(d.x.map((_, i) => [i, 0])).slice(0, d.n - 1).sort((a, b) => a[0] - b[0])) : axLine] },
    { judge: { kind: 'value', expect: qt(d.num), ...M('num') }, start: 'x^T·Ax', html: 'Le numérateur xᵀ(Ax)', ask: 'xᵀAx =',
      lines: [eqG(dotT(d.x, d.Ax), guided ? [-1] : null, 'Produit scalaire de x et Ax', 'quot'), eqG(qt(d.num), guided ? [0] : null, '', 'quot')] },
    { judge: { kind: 'value', expect: qt(d.den), ...M('den') }, start: 'x^T·x', html: 'Le dénominateur xᵀx', ask: 'xᵀx =',
      lines: [eq(sqT(d.x), 'Somme des carrés', 'quot'), eqG(qt(d.den), guided ? [0] : null, '', 'quot')] },
    { judge: { kind: 'value', expect: qt(d.R), rayleigh: { num: qt(d.num), den: qt(d.den) }, ...M('quot') }, start: 'R(x)', html: 'Le quotient de Rayleigh', ask: 'R(x) =',
      lines: quotLines(d) },
  ];
  const pre = [];
  if (denDecision) {
    pre.push({ kind: 'decision', prompt: 'Par quoi divise-t-on xᵀAx ?', options: rng.shuffle(menu('Par xᵀx', [
      ['Par ‖x‖', `xᵀx = ‖x‖² : il faut le carré de la norme. Ici xᵀx = ${fq(d.den)}.`, 'm_rayleigh_no_denominator'],
      ['Par rien : R(x) = xᵀAx', 'Sans dénominateur, la valeur dépend de la longueur de x : 2x donnerait 4 fois plus.', 'm_rayleigh_no_denominator'],
    ])) });
  }
  if (boundDecision) {
    const [lo, hi] = [Math.min(...d.lams), Math.max(...d.lams)];
    pre.push({ kind: 'decision', prompt: `Les valeurs propres de A sont ${lamsR(d.lams)}. Sans calculer, où est R(x) ?`, options: rng.shuffle(menu(`Entre ${fq(lo)} et ${fq(hi)}`, [
      [`Au-dessus de ${fq(hi)}`, 'Pour A symétrique, R(x) ne dépasse jamais λ_max : c\'est une moyenne pondérée des valeurs propres.'],
      [`Exactement ${fq(hi)}`, 'R(x) = λ_max seulement si x est un vecteur propre de λ_max.'],
    ])) });
  }
  ps[3].pre = pre;
  return ps;
}

const raHints = (d) => hints3(
  'Numérateur xᵀ(Ax), dénominateur xᵀx.',
  `R = □/${fq(d.den)}`,
  `R(x) = ${fq(d.num)}/${fq(d.den)}${d.R.d === d.den.valueOf() ? '' : ` = ${fq(d.R)}`}`,
);

// det(A − λI) factored, from whole eigenvalues.
function charText(lams) {
  const c = {};
  for (const l of lams) c[l] = (c[l] || 0) + 1;
  return Object.entries(c).sort((a, b) => b[0] - a[0]).map(([l, m]) => `(${l}-λ)${m > 1 ? `^${m}` : ''}`).join('');
}
const detMatText = (A) => `det[${A.map((r, i) => `[${r.map((x, j) => (i === j ? (x.n === 0 ? '-λ' : `${qt(x)}-λ`) : qt(x))).join(',')}]`).join(',')}]`;

// Level 4: max and min of xᵀAx on ‖x‖ = 1.
function sphereItem(rng, base) {
  const s = symWhole(2, rng, {});
  const order = s.lams.map((l, i) => ({ l, v: s.vecs[i] })).sort((a, b) => b.l - a.l);
  const [mx, mn] = order;
  const ps = [
    { judge: { kind: 'det', vars: ['λ'], names: { A: mt(s.A) }, target: 'factored' }, start: 'det(A-λI)', html: 'Les valeurs propres de A', ask: '',
      lines: [eq(detMatText(s.A), 'A − λI', 'bound'), eq(charText(s.lams), `Valeurs propres ${fq(mn.l)} et ${fq(mx.l)}`, 'bound')] },
    { judge: { kind: 'value', expect: qt(mx.l) }, start: 'λ_max', html: 'Le maximum de xᵀAx sur ‖x‖ = 1', ask: 'max =', lines: [eq(qt(mx.l), 'La plus grande valeur propre', 'bound')] },
    { judge: { kind: 'span', basis: [vt(mx.v)], require: 'orthonormal' }, start: 'x_max', html: 'Un point où il est atteint (‖x‖ = 1)', ask: 'x =', lines: [eq(unitText(mx.v), 'Vecteur propre de λ_max, normé', 'bound')] },
    { judge: { kind: 'value', expect: qt(mn.l) }, start: 'λ_min', html: 'Le minimum de xᵀAx sur ‖x‖ = 1', ask: 'min =', lines: [eq(qt(mn.l), 'La plus petite valeur propre', 'bound')] },
    { judge: { kind: 'span', basis: [vt(mn.v)], require: 'orthonormal' }, start: 'x_min', html: 'Un point où il est atteint', ask: 'x =', lines: [eq(unitText(mn.v), 'Vecteur propre de λ_min, normé', 'bound')] },
  ];
  return partsItem({
    ...base, key: `${RA}:sphere:${mt(s.A)}`, fallback: s.fallback, baits: ['m_rayleigh_no_denominator'],
    hints: hints3('Sur la sphère unité, xᵀAx = R(x) : son maximum est λ_max, atteint en un vecteur propre unitaire.', `det(A − λI) = (□ − λ)(□ − λ)`, `max = ${fq(mx.l)} en ${unitText(mx.v).replace(/-/g, '−')} ; min = ${fq(mn.l)} en ${unitText(mn.v).replace(/-/g, '−')}`),
    prompt: `A = ${MLm(s.A)}. Trouve le maximum et le minimum de xᵀAx sous la contrainte ‖x‖ = 1, et un point où chacun est atteint.`,
  }, ps);
}

// Level 5: x = m·u + e close to the eigenvector u: R(x) against (Ax)ᵢ/xᵢ.
function closeItem(rng) {
  for (let t = 0; t < 300; t++) {
    const s = symWhole(2, rng, {});
    if (s.fallback) continue;
    const k = rng.int(0, 1);
    const u = s.vecs[k];
    const v = s.vecs[1 - k];
    const m = rng.int(4, 6);
    const e = rng.pick([1, -1]);
    const x = u.map((a, i) => a.mul(m).add(v[i].mul(e)));
    if (x.some((c) => c.n === 0)) continue;
    const Ax = MX.matVec(s.A, x);
    const num = MX.dot(x, Ax);
    const den = MX.dot(x, x);
    const R = num.div(den);
    const lam = q(s.lams[k]);
    const i = Math.abs(x[0].valueOf()) >= Math.abs(x[1].valueOf()) ? 0 : 1;
    const ratio = Ax[i].div(x[i]);
    const eR = Math.abs(R.sub(lam).valueOf());
    const eQ = Math.abs(ratio.sub(lam).valueOf());
    if (!(eR < eQ / 2) || Math.abs(num.valueOf()) > 600 || ratio.eq(lam)) continue;
    const d = { ...s, n: 2, x, Ax, num, den, R };
    const ps = parts(d);
    ps.push({ judge: { kind: 'value', expect: qt(ratio) }, start: 'ρ', html: `Le rapport de composantes (Ax)${sub(i + 1)}/x${sub(i + 1)}`, ask: 'rapport =',
      lines: ratio.d === 1 || (ratio.n === Ax[i].valueOf() && ratio.d === x[i].valueOf()) ? [eq(qt(ratio), '', 'quot')] : [eq(`${qt(Ax[i])}÷${par(x[i])}`, '', 'quot'), eq(qt(ratio), '', 'quot')] });
    const key = `${RA}:close:${mt(s.A)}:${vt(x)}`;
    const lines = partsItem({ skill: RA, level: 5, mode: 'free', hints: [], noHints: true, subgoals: RA_SUB, key, prompt: `Calcule R(x), puis le rapport (Ax)${sub(i + 1)}/x${sub(i + 1)}.`, baits: ['m_rayleigh_no_denominator'] }, ps);
    const best = mcq({
      skill: RA, level: 5, key: `${key}:best`, prompt: `La valeur propre proche est λ = ${fq(lam)}. Quelle estimation en est la plus proche ?`,
      options: [
        { html: `R(x) = ${fq(R)} : l'erreur est de l'ordre de ε², ε l'écart de x à un vecteur propre`, correct: true },
        { html: `(Ax)${sub(i + 1)}/x${sub(i + 1)} = ${fq(ratio)} : le rapport d'une seule composante ne dépend pas des autres`, correct: false },
        { html: 'Les deux sont aussi proches', correct: false },
        { html: `R(x) = ${fq(R)}, mais seulement parce que x est un vecteur propre`, correct: false },
      ],
    }, rng);
    return problemItem({
      skill: RA, level: 5, key, prompt: `A = ${MLm(s.A)} et x = ${vR(x)}, proche d'un vecteur propre de A. Compare deux estimations de la valeur propre : le quotient de Rayleigh R(x) et le rapport de composantes (Ax)${sub(i + 1)}/x${sub(i + 1)}.`,
      parts: [{ item: lines, points: 3, title: 'Calculs' }, { item: best, points: 1, title: 'Comparaison' }],
    });
  }
  return null;
}

function rayItem(level, rng) {
  if (level === 5) { const it = closeItem(rng); if (it) return it; }
  if (level === 4 && rng.chance(0.6)) return sphereItem(rng, { skill: RA, level, subgoals: RA_SUB, mode: 'free' });
  const n = level === 4 ? 3 : level === 3 ? rng.pick([2, 3]) : 2;
  const d = rayData(rng, n);
  const key = `${RA}:${mt(d.A)}:${vt(d.x)}:${level}`;
  const base = { skill: RA, level, subgoals: RA_SUB, key, fallback: d.fallback, hints: raHints(d), mode: modeOf(level), baits: ['m_rayleigh_no_denominator'] };
  const eigs = `Ses valeurs propres sont ${lamsR(d.lams)}.`;
  if (level <= 2) {
    const ps = parts(d, { guided: true, rng, denDecision: level === 2, boundDecision: true });
    return partsItem({ ...base, prompt: `A = ${MLm(d.A)} est symétrique et x = ${vR(d.x)}. Calcule le quotient de Rayleigh R(x) = xᵀAx / xᵀx.` }, ps);
  }
  if (level === 3) {
    return partsItem({ ...base, prompt: `A = ${MLm(d.A)}, x = ${vR(d.x)}. ${eigs} Calcule R(x) en choisissant d'abord chaque action ; vérifie qu'il est entre λ_min et λ_max.`, tapActions: 'menu' }, parts(d, { menuOn: true, rng, boundDecision: true }));
  }
  return partsItem({ ...base, prompt: rng.chance(0.5) ? `Calcule le quotient de Rayleigh de x = ${vR(d.x)} pour A = ${MLm(d.A)}.` : `A = ${MLm(d.A)} est symétrique. Estime une valeur propre par R(x), avec x = ${vR(d.x)}.` }, parts(d));
}

const NONSYM = [['[[0,4],[0,0]]', '(1 ; 1)'], ['[[1,4],[0,1]]', '(1 ; 1)'], ['[[2,6],[0,2]]', '(1 ; 1)'], ['[[0,2],[0,1]]', '(1 ; 1)']];

function rayExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const which = rng.int(0, 3);
    if (which === 0) {
      const [A, x] = rng.pick(NONSYM);
      return tfL({
        skill: RA, key: `nonsym:${A}`, truth: false, exam: tag,
        statement: 'Pour toute matrice carrée A à valeurs propres réelles et tout x ≠ 0, λ_min ≤ xᵀAx/xᵀx ≤ λ_max.',
        counter: { kind: 'mx', prop: 'rayleighOutside', params: {}, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }, { v: 'x', label: 'x =', shape: [2, 1] }], answer: { A, x } },
        explanation: `Faux sans symétrie : A = ${MLm(MX.mat(JSON.parse(A)))} est triangulaire, de valeurs propres sur sa diagonale, mais avec x = ${x.replace(/-/g, '−')}, R(x) en sort. L'encadrement vient de la décomposition spectrale, qui demande A symétrique.`,
      });
    }
    const T = [
      null,
      ['Si A est symétrique, R(x) = xᵀAx/xᵀx ≤ λ_max pour tout x ≠ 0.', 'Vrai : x = Σ cᵢuᵢ en base orthonormée de vecteurs propres, R(x) = Σ λᵢcᵢ² / Σ cᵢ² ≤ λ_max.'],
      ['R(3x) = R(x) pour tout x ≠ 0.', 'Vrai : le facteur 9 se simplifie entre xᵀAx et xᵀx.'],
      ['Si A est symétrique, le maximum de xᵀAx sur la sphère ‖x‖ = 1 vaut λ_max.', 'Vrai : sur la sphère, xᵀAx = R(x) ≤ λ_max, avec égalité en un vecteur propre unitaire.'],
    ][which];
    return tfL({ skill: RA, key: `t${which}`, truth: true, exam: tag, statement: T[0], explanation: T[1], ruleIfFalse: which === 2 ? 'm_rayleigh_no_denominator' : null });
  }
  const d = rayData(rng, rng.pick([2, 2, 3]));
  const rootDen = rootT(d.den);
  return mcqDistinct({
    skill: RA, level: 4, key: `mcq:${mt(d.A)}:${vt(d.x)}`, exam: tag,
    prompt: `A = ${MLm(d.A)} et x = ${vR(d.x)}. Que vaut le quotient de Rayleigh R(x) ?`,
    right: fq(d.R),
    // xᵀAx/‖x‖ in closed form (28/(2√2) = 7√2).
    wrongs: [{ html: fq(d.num), rule: 'm_rayleigh_no_denominator' }, { html: (() => { const r = radicalNode(d.num.valueOf() / Math.sqrt(d.den.valueOf())); return r ? toText(r).replace(/-/g, '−') : `${fq(d.num)}/(${rootDen})`; })(), rule: 'm_rayleigh_no_denominator' }],
    fillers: [{ html: fq(q(1).div(d.R)) }, { html: fq(d.Ax[0].div(d.x[0].n ? d.x[0] : q(1))) }, { html: fq(d.R.add(1)) }, { html: fq(d.R.neg()) }],
    solution: [{ html: `Ax = ${vR(d.Ax)}, xᵀAx = ${fq(d.num)}, xᵀx = ${fq(d.den)}`, note: '' }, { html: `R(x) = ${fq(d.R)}`, note: '' }],
    fallback: d.fallback,
  }, rng);
}

export const GEN = {
  [RA]: (level, rng, profile, opts = {}) => (opts.exam ? rayExam(rng, opts.exam) : rayItem(level, rng)),
};
