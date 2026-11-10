// Generators of module L, section « sym » (Lay 7.1, 7.2, 7.4: symmetric
// matrices, quadratic forms, SVD; short proofs), spec §8.3. Catalogue:
// docs/universite/L-M-algebre-lineaire.md.
//
// Every matrix is built from its answer. A symmetric matrix is
// A = cI + Σ μᵢvᵢvᵢᵀ with whole vectors vᵢ pairwise orthogonal: its
// eigenvalues are c + μᵢ‖vᵢ‖² (and c), its eigenvectors the vᵢ. An SVD is
// A = Σ sᵢpᵢqᵢᵀ with whole orthogonal families (pᵢ) and (qᵢ): σᵢ =
// sᵢ‖pᵢ‖‖qᵢ‖, uᵢ = pᵢ/‖pᵢ‖, vᵢ = qᵢ/‖qᵢ‖ (the catalogue's svdReverse).
//
// Items are `lines` whose parts (segments) switch judges: det (the
// characteristic polynomial), eigvec, span (bases, Gram-Schmidt,
// orthonormal), value (σᵢ, half-axes), mat (A, AᵀA), equiv (the reduced
// form, x = P·(X ; Y)), factor (Q and D; U, Σ and V). Levels: 1–2 guided
// (grid cells or blanks), 3 choose the action (`menu` of each part), 4
// free, 5 alone. The proofs are `blocks` items.

import * as MX from '../../cas/matrix.js';
import { parse } from '../../cas/parse.js';
import { parseMatLine, normalizeMatText, exprML, evalAst } from '../../cas/matexpr.js';
import { evalFloat } from '../../cas/numeric.js';
import { blankLine } from '../../judges/lines.js';
import { walk } from '../../cas/ast.js';
import {
  q, mt, vt, ML, MLm, fq, qt, sub, matLines, coefItem, mcqDistinct, tfL, examTag, withCells,
} from './alglin-kit.js';
import { MT, blocksItem } from './kit.js';
import { symEigen, primitive, unitText, orthText, rootText, entryText, isqrt } from '../../cas/rules/l-sym.js';

const OD = 'l-sym-orthodiag';
const QF = 'l-sym-quadform';
const SVD = 'l-svd-compute';
const SPH = 'l-svd-sphere';
const PM = 'l-proof-matrices';
const PS = 'l-proof-spectral';

// ---------- small helpers ----------

const qv = (v) => v.map((x) => q(x));
const maxAbs = (A) => Math.max(...A.flat().map((x) => Math.abs(x.valueOf())));
const outer = (u, v) => u.map((a) => v.map((b) => a.mul(b)));
const addM = (A, B) => A.map((r, i) => r.map((x, j) => x.add(B[i][j])));
const scaleM = (A, k) => A.map((r) => r.map((x) => x.mul(k)));
const norm2 = (v) => MX.dot(v, v).valueOf();
const R = (s) => String(s).replace(/-/g, '−');
const lamR = (l) => R(qt(l));
const vR = (v) => R(vt(v));
// A − λI, readable: A − 3I, A + 2I, A.
const shiftR = (l) => (l.n === 0 ? 'A' : `A ${l.n < 0 ? '+' : '−'} ${l.eq(1) || l.eq(-1) ? '' : qt(l.n < 0 ? l.neg() : l)}I`);
// « 1, 4 et 7 ».
const listFr = (xs) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} et ${xs.at(-1)}`);

// a/√N with a rational denominator, as the value judge wants it: √2/2.
function ratText(a, N) {
  const [s, m] = (() => { let s0 = 1; let m0 = N; for (let f = 2; f * f <= m0; f++) while (m0 % (f * f) === 0) { m0 /= f * f; s0 *= f; } return [s0, m0]; })();
  const c = q(a).div(s);
  if (m === 1) return qt(c);
  const k = c.div(m);
  const top = Math.abs(k.n) === 1 ? `√${m}` : `${Math.abs(k.n)}√${m}`;
  return `${k.n < 0 ? '-' : ''}${top}${k.d === 1 ? '' : `/${k.d}`}`;
}
// A matrix line as written (1/√2 kept), for prompts and options.
function MW(text) {
  try {
    const l = parseMatLine(normalizeMatText(text), { vars: ['λ'] });
    const lab = l.label ? `<mi>${l.label.replace(/_(\d)/, (_, d) => sub(d))}</mi><mo>=</mo>` : '';
    return `<math><mrow>${lab}${exprML(l.body)}</mrow></math>`;
  } catch { return ML(text); }
}
// Applies a permutation of the coordinates and signs to a family.
function permuteFamily(vs, rng) {
  const n = vs[0].length;
  const perm = rng.shuffle([...Array(n).keys()]);
  const flip = perm.map(() => (rng.chance(0.3) ? -1 : 1));
  return vs.map((v) => perm.map((p, i) => q(v[p]).mul(flip[i])));
}
// One line of a value judge, guided: the whole answer is a blank.
function blankAll(math) {
  const node = parse(math);
  return blankLine(node, [node]);
}
// The numbers of an expression that are coefficients (not exponents).
function coefHoles(node) {
  const out = [];
  walk(node, (n) => {
    if (n.t === 'pow') return false;
    if (n.t === 'num') out.push(n);
    return true;
  });
  return out;
}

// det(A − λI) = ∏(λᵢ − λ)^mᵢ, written with (−λ)^m = ±λ^m for λᵢ = 0.
function charText(eigs) {
  let sign = 1;
  const parts = [];
  for (const { lambda, mult } of eigs) {
    const p = mult > 1 ? `^${mult}` : '';
    if (lambda.n === 0) { if (mult % 2) sign = -sign; parts.unshift(`λ${p}`); } else parts.push(`(${qt(lambda)}-λ)${p}`);
  }
  return `${sign < 0 ? '-' : ''}${parts.join('')}`;
}
// det[[a-λ, b], [c, d-λ]].
const detMatText = (A) => `det[${A.map((r, i) => `[${r.map((x, j) => (i === j ? (x.n === 0 ? '-λ' : `${qt(x)}-λ`) : qt(x))).join(',')}]`).join(',')}]`;
const charR = (eigs) => R(charText(eigs)).replace(/\^(\d)/g, (_, d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);

// Menus of the « choose the action » mode: one valid action per part.
function menuOf(items, active) {
  return items.map((o) => ({ id: o.id, label: o.label, valid: o.id === active, why: o.id === active ? undefined : o.why || 'Pas maintenant : ce n\'est pas l\'étape suivante.' }));
}
const OD_MENU = [
  { id: 'charpoly', label: 'Calculer le polynôme caractéristique', why: 'Le polynôme est déjà connu : passe aux vecteurs propres.' },
  { id: 'eigen', label: 'Trouver une base d\'un espace propre', why: 'Il faut d\'abord les valeurs propres, ou cet espace propre est déjà fait.' },
  { id: 'gs', label: 'Appliquer Gram-Schmidt dans un espace propre', why: 'Gram-Schmidt ne sert que dans un espace propre de dimension ≥ 2 dont la base n\'est pas orthogonale.' },
  { id: 'norm', label: 'Normaliser les vecteurs', why: 'Normalise une base déjà orthogonale.' },
  { id: 'assemble', label: 'Assembler Q et D', why: 'Il manque encore des vecteurs propres orthonormés.' },
];

// ======================================================================
// Symmetric matrices built backwards
// ======================================================================

const V2 = [[1, 1], [1, 2], [2, 1], [1, 3], [3, 1], [3, 4], [4, 3]];
const T3 = [
  [[1, 1, 1], [1, -1, 0], [1, 1, -2]],
  [[1, 2, 2], [2, 1, -2], [2, -2, 1]],
  [[1, 0, 1], [1, 0, -1], [0, 1, 0]],
  [[1, 1, 1], [1, 0, -1], [1, -2, 1]],
  [[1, 2, 1], [1, 0, -1], [1, -1, 1]],
  [[2, 1, 1], [0, 1, -1], [1, -1, -1]],
];
const N3 = [[1, 1, 1], [1, 1, 2], [1, 2, 2], [1, 1, -1], [1, 2, -1], [2, 1, 1], [1, -1, 2]];
// 4 × 4: n₁ = 1 and n₂ = n₃ = ±1, so that the basis of n⊥ is simple.
const N4 = [[1, 1, 1, 1], [1, 1, 1, 3], [1, 1, 1, -1], [1, -1, 1, 1], [1, 1, -1, 1], [1, 1, 1, -3], [1, 1, 1, 2]];

// The data of a symmetric matrix: A, its eigen-structure E (λ increasing,
// whole eigenvectors, orthogonal inside each eigenspace).
function withEigen(A, extra = {}) {
  const E = symEigen(A);
  const cols = E.flatMap((e) => e.orth);
  const lams = E.flatMap((e) => Array(e.mult).fill(e.lambda));
  return { A, E, cols, lams, n: A.length, double: E.some((e) => e.mult > 1), gs: E.some((e) => e.basis.length > 1 && e.basis.some((u, i) => e.basis.some((v, j) => j > i && MX.dot(u, v).n !== 0))), ...extra };
}

// 2 × 2: A = cI + μvvᵀ (eigenvalues c and c + μ‖v‖²).
function sym2(rng, { nonzero = false, sign = null, max = 13 } = {}) {
  for (let t = 0; t < 200; t++) {
    const [a, b0] = rng.pick(V2);
    const b = rng.chance(0.5) ? b0 : -b0;
    const N = a * a + b * b;
    const mu = rng.pick(N > 10 ? [1, -1] : N > 5 ? [1, -1, 2] : [1, -1, 2, -2, 3]);
    const c = rng.int(-6, 8);
    const l1 = c;
    const l2 = c + mu * N;
    if (nonzero && (l1 === 0 || l2 === 0)) continue;
    if (sign === 'pos' && (l1 <= 0 || l2 <= 0)) continue;
    if (sign === 'mixed' && l1 * l2 >= 0) continue;
    if (sign === 'mixed-posdiag' && (l1 * l2 >= 0 || c + mu * a * a <= 0 || c + mu * b * b <= 0)) continue;
    const A = addM(scaleM(MX.identity(2), q(c)), scaleM(outer(qv([a, b]), qv([a, b])), q(mu)));
    if (maxAbs(A) > max || A[0][1].n === 0) continue;
    return withEigen(A);
  }
  return withEigen(MX.mat([[5, -2], [-2, 8]]), { fallback: true });
}

// 3 × 3 with three distinct eigenvalues: cI + μ₁v₁v₁ᵀ + μ₂v₂v₂ᵀ.
function sym3(rng, { nonzero = false, max = 12 } = {}) {
  for (let t = 0; t < 200; t++) {
    const vs = permuteFamily(rng.shuffle([...rng.pick(T3)]), rng);
    const c = rng.int(-4, 5);
    const mus = [rng.pick([1, -1, 2]), rng.pick([1, -1, 2, -2])];
    let A = scaleM(MX.identity(3), q(c));
    mus.forEach((m, i) => { A = addM(A, scaleM(outer(vs[i], vs[i]), q(m))); });
    const lams = [c + mus[0] * norm2(vs[0]), c + mus[1] * norm2(vs[1]), c];
    if (new Set(lams).size < 3 || (nonzero && lams.includes(0))) continue;
    if (maxAbs(A) > max || MX.isDiagonal(A)) continue;
    if (A.flat().filter((x) => x.n === 0).length > 3) continue;
    return withEigen(A);
  }
  return withEigen(MX.mat([[3, 1, 0], [1, 3, 0], [0, 0, 5]]), { fallback: true });
}

// n × n with a multiple eigenvalue: A = cI + μnnᵀ (c of multiplicity
// n − 1, eigenspace n⊥; c + μ‖n‖² simple, eigenvector n).
function symRank1(n, rng, { nonzero = false, max = 12, needGs = true } = {}) {
  for (let t = 0; t < 200; t++) {
    const v = n === 3 ? permuteFamily([rng.pick(N3)], rng)[0] : qv(rng.pick(N4));

    const c = rng.int(-3, 5);
    const mu = rng.pick(norm2(v) > 6 ? [1, -1] : [1, -1, 2]);
    const A = addM(scaleM(MX.identity(n), q(c)), scaleM(outer(v, v), q(mu)));
    const big = c + mu * norm2(v);
    if (big === c || (nonzero && (c === 0 || big === 0))) continue;
    if (maxAbs(A) > max) continue;
    const d = withEigen(A);
    if (needGs && !d.gs) continue;
    return d;
  }
  return withEigen(n === 3 ? MX.mat([[1, 2, 2], [2, 1, 2], [2, 2, 1]]) : MX.mat([[3, 1, 1, 3], [1, 3, 1, 3], [1, 1, 3, 3], [3, 3, 3, 11]]), { fallback: true });
}

const QText = (d) => `Q = ${orthText(d.cols)}`;
const DText = (lams) => `D = diag(${lams.map(qt).join(',')})`;

// ======================================================================
// l-sym-orthodiag
// ======================================================================

const OD_SUB = [
  { id: 'charpoly', label: 'polynôme caractéristique', skill: 'l-eig-charpoly' },
  { id: 'eigen', label: 'espaces propres', skill: 'l-eig-space' },
  { id: 'gs', label: 'Gram-Schmidt', skill: 'l-orth-gs' },
  { id: 'norm', label: 'normaliser', skill: 'l-orth-matrices' },
  { id: 'assemble', label: 'assembler Q et D', skill: OD },
];

// The parts of an orthodiagonalisation, from the characteristic
// polynomial to Q and D. opts: guided (cells), menu (tap), charpoly
// (with the det part), detLine (with the det[[…]] line).
function odParts(d, { guided = false, menu = false, charpoly = true, detLine = false, decision = null } = {}) {
  const A = mt(d.A);
  const M = (id) => (menu ? { menu: menuOf(OD_MENU, id) } : {});
  const script = [];
  if (charpoly) {
    script.push({ kind: 'segment', html: 'Le polynôme caractéristique, factorisé.', start: { math: 'det(A-λI)' }, judge: { kind: 'det', vars: ['λ'], names: { A }, target: 'factored', ...M('charpoly') } });
    if (detLine) script.push({ kind: 'eq', math: detMatText(d.A), note: 'A − λI', subgoal: 'charpoly' });
    script.push({ kind: 'eq', math: charText(d.E), note: `Valeurs propres ${listFr(d.E.map((e) => lamR(e.lambda)))}`
, subgoal: 'charpoly' });
  }
  for (const e of d.E) {
    const lam = qt(e.lambda);
    if (e.basis.length === 1) {
      script.push({ kind: 'segment', html: `Un vecteur propre pour λ = ${lamR(e.lambda)}.`, ask: 'v =', start: { math: `E_(${lam})` }, judge: { kind: 'eigvec', A, lambda: lam, ...M('eigen') } });
      const line = { kind: 'eq', math: vt(e.basis[0]), note: `(${shiftR(e.lambda)})v = 0`, subgoal: 'eigen' };
      script.push(guided ? withCells(line, [[e.basis[0].findIndex((x) => x.n !== 0), 0]]) : line);
      continue;
    }
    // A multiple eigenvalue: a basis of the eigenspace, then Gram-Schmidt
    // (if needed) and the orthonormal basis.
    const basis = e.basis.map(vt);
    script.push({ kind: 'segment', html: `Une base de l'espace propre de λ = ${lamR(e.lambda)} (dimension ${e.basis.length}).`, ask: `E${sub(lam).replace('-', '₋')} =`, start: { math: `E_(${lam})` }, judge: { kind: 'span', basis, require: 'basis', ...M('eigen') } });
    script.push({ kind: 'eq', math: e.basis.map(vt).join(', '), note: `Solutions de (${shiftR(e.lambda)})x = 0`, subgoal: 'eigen' });
    const needGs = e.basis.some((u, i) => e.basis.some((v, j) => j > i && MX.dot(u, v).n !== 0));
    if (needGs) {
      script.push({ kind: 'segment', html: 'Gram-Schmidt dans cet espace propre : une base orthogonale.', start: { math: e.basis.map(vt).join(', ') }, judge: { kind: 'span', basis, require: 'orthogonal', ...M('gs') } });
      if (decision) script.push(decision);
      script.push({ kind: 'eq', math: e.orth.map(vt).join(', '), note: 'On retire à chaque vecteur sa projection sur les précédents, puis on remet à l\'échelle', subgoal: 'gs' });
    }
    script.push({ kind: 'segment', html: 'La même base, normalisée.', start: { math: e.orth.map(vt).join(', ') }, judge: { kind: 'span', basis, require: 'orthonormal', ...M('norm') } });
    script.push({ kind: 'eq', math: e.orth.map(unitText).join(', '), note: 'Chaque vecteur divisé par sa norme', subgoal: 'norm' });
  }
  script.push({ kind: 'segment', html: 'Assemble Q (orthogonale) et D, dans le même ordre.', start: { math: 'A = QDQᵀ' }, judge: { kind: 'factor', A, of: 'orthodiag', ...M('assemble') } });
  if (decision && !d.gs) script.push(decision);
  const qLine = { kind: 'eq', math: QText(d), note: 'Colonnes : les vecteurs propres normalisés', subgoal: 'norm' };
  script.push(guided ? withCells(qLine, [[0, 0], [d.n - 1, d.n - 1]]) : qLine);
  script.push({ kind: 'eq', math: DText(d.lams), note: 'Les valeurs propres, dans l\'ordre des colonnes de Q', subgoal: 'assemble' });
  return script;
}

// The first part of a script becomes the item's own judge and start.
function splitFirst(script) {
  const [seg, ...rest] = script;
  return { start: seg.start.math, judge: seg.judge, script: seg.html ? [{ kind: 'note', html: seg.html }, ...rest] : rest };
}

const odHints = (d) => [
  { level: 1, html: 'Vecteurs propres de valeurs propres différentes : déjà orthogonaux. Dans un même espace propre de dimension ≥ 2 : Gram-Schmidt. Puis on divise chaque vecteur par sa norme.' },
  { level: 2, html: d.gs ? (() => { const c = d.E.find((e) => e.mult > 1).orth.at(-1); return `${R(`(${c.map((x, i) => (i === c.length - 1 ? '□' : qt(x))).join(' ; ')})`)}/√□`; })() : `Q = [${d.cols.map((c) => `${vR(c)}/□`).join(', ')}]` },
  { level: 3, html: `${MW(QText(d))}, ${MW(DText(d.lams))}` },
];

function odItem(level, rng) {
  if (level === 1) {
    const d = sym2(rng);
    const N = norm2(d.cols[0]);
    const parts = odParts(d, { guided: true, charpoly: false });
    // A part for the norm, before Q.
    const at = parts.findIndex((l) => l.kind === 'segment' && l.judge.kind === 'factor');
    const nv = rootText(N);
    parts.splice(at, 0, { kind: 'segment', html: `La norme de ${vR(d.cols[0])} (et de ${vR(d.cols[1])}).`, ask: '‖v‖ =', start: { math: `√(${d.cols[0].map((x) => `${x.n < 0 ? `(${qt(x)})` : qt(x)}^2`).join('+')})` }, judge: { kind: 'value', expect: nv, form: 'exact' } }, { kind: 'eq', math: nv, ...blankAll(nv), note: 'La norme de v₂ est la même', subgoal: 'norm' });
    const { start, judge, script } = splitFirst(parts);
    return matLines({
      skill: OD, level, prompt: `A = ${MLm(d.A)} a les valeurs propres λ₁ = ${lamR(d.lams[0])} et λ₂ = ${lamR(d.lams[1])}. Trouve un vecteur propre pour chacune, normalise-les, puis écris A = QDQᵀ.`,
      start, judge, mode: 'guided', script, hints: odHints(d), subgoals: OD_SUB, key: `${OD}:${mt(d.A)}:1`, fallback: d.fallback,
    });
  }
  if (level === 2) {
    const withGs = rng.chance(0.6);
    const d = withGs ? symRank1(3, rng) : sym3(rng);
    const big = d.E.find((e) => e.mult > 1);
    const decision = withGs ? {
      kind: 'decision', prompt: `La base de E${sub(qt(big.lambda)).replace('-', '₋')} n'est pas orthogonale. Que fais-tu ?`, options: [
        { id: 'gs', label: 'Gram-Schmidt dans cet espace propre, puis normaliser', valid: true },
        { id: 'norm', label: 'Seulement normaliser', valid: false, rule: 'l_orthodiag_no_gs', why: `${vR(big.basis[0])} · ${vR(big.basis[1])} = ${R(qt(MX.dot(big.basis[0], big.basis[1])))} ≠ 0 : ces vecteurs ne sont pas orthogonaux, Q ne serait pas orthogonale.` },
      ],
    } : {
      kind: 'decision', prompt: 'Les trois valeurs propres sont distinctes. Que fais-tu des vecteurs propres ?', options: [
        { id: 'norm', label: 'Seulement les normaliser', valid: true },
        { id: 'gs', label: 'Gram-Schmidt, puis normaliser', valid: true, quality: 'poor', why: 'Inutile : pour une matrice symétrique, des vecteurs propres de valeurs propres distinctes sont déjà orthogonaux.' },
        { id: 'none', label: 'Les mettre tels quels dans Q', valid: false, rule: 'l_orthodiag_no_normalize', why: 'Q doit être orthogonale : ses colonnes doivent être de norme 1.' },
      ],
    };
    const { start, judge, script } = splitFirst(odParts(d, { guided: true, charpoly: false, decision }));
    return matLines({
      skill: OD, level, prompt: `A = ${MLm(d.A)} a les valeurs propres ${listFr(d.E.map((e) => `${lamR(e.lambda)}${e.mult > 1 ? ' (double)' : ''}`))}. Orthodiagonalise A : A = QDQᵀ, valeurs propres dans l'ordre croissant.`,
      start, judge, mode: 'guided', script, hints: odHints(d), subgoals: OD_SUB, key: `${OD}:${mt(d.A)}:2`, fallback: d.fallback,
    });
  }
  if (level === 5 && rng.chance(0.4)) return odRebuild(rng, 5);
  const d = level === 3 ? (rng.chance(0.5) ? symRank1(3, rng) : rng.chance(0.5) ? sym2(rng) : sym3(rng)) : level === 4 ? symRank1(3, rng) : symRank1(4, rng);
  const { start, judge, script } = splitFirst(odParts(d, { menu: level === 3, detLine: d.n === 2 }));
  return matLines({
    skill: OD, level,
    prompt: `Orthodiagonalise A = ${MLm(d.A)} : trouve Q orthogonale et D diagonale avec A = QDQᵀ (valeurs propres dans l'ordre croissant)${level === 3 ? '. Choisis d\'abord chaque action' : ''}.`,
    start, judge, mode: level === 3 ? 'tap' : 'free', script, hints: odHints(d), subgoals: OD_SUB,
    key: `${OD}:${mt(d.A)}:${level}`, tapActions: level === 3 ? 'menu' : null, fallback: d.fallback,
  });
}

// « Retrouver A » (2021 Q3): the eigenvalues and orthonormal eigenvectors
// are given; A = QDQᵀ.
function odRebuild(rng, level, exam = false) {
  const d = rng.chance(0.5) ? sym2(rng) : sym3(rng);
  const names = { Q: orthText(d.cols), D: `diag(${d.lams.map(qt).join(',')})` };
  const vecs = d.cols.map((c, i) => `${MW(`u_${i + 1} = ${unitText(c)}`)} (λ = ${lamR(d.lams[i])})`).join(', ');
  return matLines({
    skill: OD, level, prompt: `Une matrice symétrique A a les vecteurs propres orthonormés ${vecs}. Retrouve A.`,
    start: 'A', judge: { kind: 'mat', expect: mt(d.A), names }, mode: 'free',
    script: [
      { kind: 'eq', math: 'Q·D·Q^T', note: `A = QDQᵀ avec Q = [u₁ … u${sub(d.n)}] et D = diag(${d.lams.map(lamR).join(', ')})`, subgoal: 'assemble' },
      { kind: 'eq', math: mt(d.A), note: 'Le produit, case par case', subgoal: 'assemble' },
    ],
    hints: [
      { level: 1, html: 'A = QDQᵀ : les colonnes de Q sont les vecteurs propres, D porte les valeurs propres dans le même ordre.' },
      { level: 2, html: `A = λ₁u₁u₁ᵀ + λ₂u₂u₂ᵀ${d.n > 2 ? ' + λ₃u₃u₃ᵀ' : ''}` },
      { level: 3, html: MLm(d.A) },
    ],
    subgoals: OD_SUB, key: `${OD}:rebuild:${mt(d.A)}`, exam, fallback: d.fallback,
  });
}

function odExam(rng, exam) {
  if (exam === 'open') return odOpen(rng);
  if (exam === 'tf') return odTf(rng);
  if (exam === 'coef') {
    const d = rng.chance(0.5) ? sym2(rng) : sym3(rng);
    const Qm = MX.fromCols(d.cols);
    const cells = [];
    Qm.forEach((r, i) => r.forEach((x, j) => { if (x.n !== 0) cells.push([i, j]); }));
    const [i, j] = rng.pick(cells);
    const value = ratText(Qm[i][j], norm2(d.cols[j]));
    return coefItem({
      skill: OD, level: 4, exam: examTag({ exam }),
      prompt: `A = ${MLm(d.A)} = QDQᵀ, avec Q orthogonale et D diagonale. Convention : valeurs propres dans l'ordre croissant sur la diagonale de D, et la première composante non nulle de chaque colonne de Q positive. Que vaut q${sub(i + 1)}${sub(j + 1)} ?`,
      label: `q_${i + 1}${j + 1}`, value, key: `${mt(d.A)}:${i}${j}`,
      askCoef: { label: `q${sub(i + 1)}${sub(j + 1)} de Q`, path: [i, j], factor: 'Q', convention: { order: 'croissant', sign: 'première composante non nulle positive', normalized: true } },
      traps: [{ rule: 'l_orthodiag_no_normalize' }, { rule: 'l_pd_order' }],
      solution: [{ html: `${MW(QText(d))}, ${MW(DText(d.lams))}`, note: '' }], fallback: d.fallback,
    });
  }
  // mcq: Q, with the decoys of the traps.
  const d = rng.chance(0.5) ? symRank1(3, rng) : rng.chance(0.5) ? sym2(rng) : sym3(rng);
  const swap = (cols) => {
    const k = d.lams.findIndex((l, i) => i && !l.eq(d.lams[0]));
    const out = [...cols];
    [out[0], out[k]] = [out[k], out[0]];
    return out;
  };
  const big = d.E.find((e) => e.basis.length > 1);
  const noGs = big && d.gs ? d.E.flatMap((e) => (e.basis.length > 1 ? e.basis : e.orth)) : null;
  const ok = (text) => validOrthodiag(d, text);
  const wrongs = [
    { html: MW(`Q = ${mt(MX.fromCols(d.cols))}`), rule: 'l_orthodiag_no_normalize', text: `Q = ${mt(MX.fromCols(d.cols))}` },
    noGs ? { html: MW(`Q = ${orthText(noGs)}`), rule: 'l_orthodiag_no_gs', text: `Q = ${orthText(noGs)}` } : null,
    { html: MW(`Q = ${orthText(swap(d.cols))}`), rule: 'l_pd_order', text: `Q = ${orthText(swap(d.cols))}` },
  ].filter((w) => w && !ok(w.text));
  const fillers = [
    `Q = ${mt(MX.fromCols(swap(d.cols)))}`,
    `Q = [${MX.fromCols(d.cols).map((r) => `[${r.map((x, j) => qt(x.div(norm2(d.cols[j])))).join(',')}]`).join(',')}]`,
  ].filter((t) => !ok(t)).map((t) => ({ html: MW(t) }));
  return mcqDistinct({
    skill: OD, level: 4, key: `mcq:${mt(d.A)}`, exam: examTag({ exam }),
    prompt: `A = ${MLm(d.A)} = QDQᵀ avec ${MW(DText(d.lams))}. Quelle matrice Q convient (orthogonale, colonnes dans l'ordre de D) ?`,
    right: MW(QText(d)), wrongs, fillers,
    solution: [{ html: `${MW(QText(d))}`, note: 'Vecteurs propres orthonormés, dans l\'ordre de D' }],
  }, rng);
}

// Does the text « Q = … » orthodiagonalise A with D = diag(lams)?
function validOrthodiag(d, text) {
  try {
    const l = parseMatLine(normalizeMatText(text), { vars: [] });
    const Qf = l.assigns[0].ast;
    const F = evalFloatMatrix(Qf);
    const n = d.n;
    const A = MX.toNumbers(d.A);
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      let s = 0; for (let k = 0; k < n; k++) s += F[k][i] * F[k][j];
      if (Math.abs(s - (i === j ? 1 : 0)) > 1e-9) return false;
    }
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      let s = 0; for (let k = 0; k < n; k++) s += A[i][k] * F[k][j];
      if (Math.abs(s - d.lams[j].valueOf() * F[i][j]) > 1e-9) return false;
    }
    return true;
  } catch { return false; }
}
function evalFloatMatrix(ast) {
  const v = evalAst(ast, {}, { vars: [] });
  return v.rows.map((r) => r.map((x) => evalFloat(x, {})));
}

function odTf(rng) {
  const exam = { format: 'tf', points: 1 };
  const k = rng.int(0, 3);
  if (k === 0) {
    return tfL({ skill: OD, key: 'real-eig', truth: true, exam, statement: 'Une matrice symétrique réelle n × n a n valeurs propres réelles (comptées avec multiplicité).', explanation: 'Vrai : c\'est le théorème spectral ; A = QDQᵀ et D est réelle.' });
  }
  if (k === 1) {
    return tfL({ skill: OD, key: 'orth-eigvec', truth: true, exam, statement: 'Si A est symétrique, deux vecteurs propres associés à des valeurs propres différentes sont orthogonaux.', explanation: 'Vrai : λ(v · w) = Av · w = v · Aw = μ(v · w), donc (λ − μ)(v · w) = 0.' });
  }
  const M = rng.pick([[[1, 1], [0, 2]], [[2, 1], [0, 3]], [[1, 2], [0, -1]], [[3, 0], [1, 1]]]);
  const statement = k === 2
    ? 'Toute matrice diagonalisable (sur ℝ) est diagonalisable en base orthonormée.'
    : 'Toute matrice 2 × 2 qui a deux valeurs propres réelles distinctes est diagonalisable en base orthonormée.';
  return tfL({
    skill: OD, key: `diag-not-sym:${k}:${mt(MX.mat(M))}`, truth: false, exam, statement, ruleIfTrue: 'l_sym_needed',
    counter: { kind: 'matOne', params: { want: 'diagNotSym', n: 2 }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(MX.mat(M)) } },
    explanation: `Faux : ${MLm(MX.mat(M))} a deux valeurs propres distinctes, donc elle est diagonalisable, mais elle n'est pas symétrique. Or orthodiagonalisable ⇔ symétrique.`,
  });
}

// The open problem (catalogue, exam example 4, shortened): a 4 × 4
// A = cI + μnnᵀ, Gram-Schmidt on a given basis of n⊥, polynomial,
// orthonormal eigenbases, Q and D.
function odOpen(rng) {
  const d = symRank1(4, rng);
  const big = d.E.find((e) => e.mult > 1);
  const small = d.E.find((e) => e.mult === 1);
  const nVec = small.orth[0];
  const basis = big.basis.map(vt);
  const W = `${polyEq(nVec)} = 0`;
  const script = [
    { kind: 'eq', math: big.orth.map(vt).join(', '), note: 'Gram-Schmidt, vecteurs remis à l\'échelle', subgoal: 'gs' },
    { kind: 'segment', html: '(b) Le polynôme caractéristique de A, factorisé.', start: { math: 'det(A-λI)' }, judge: { kind: 'det', vars: ['λ'], names: { A: mt(d.A) }, target: 'factored' } },
    { kind: 'eq', math: charText(d.E), note: '', subgoal: 'charpoly' },
    { kind: 'segment', html: `(c) Une base orthonormée de E${sub(qt(big.lambda)).replace('-', '₋')} (c'est W).`, start: { math: `E_(${qt(big.lambda)})` }, judge: { kind: 'span', basis, require: 'orthonormal' } },
    { kind: 'eq', math: big.orth.map(unitText).join(', '), note: '', subgoal: 'norm' },
    { kind: 'segment', html: `(c) Une base orthonormée de E${sub(qt(small.lambda)).replace('-', '₋')}.`, start: { math: `E_(${qt(small.lambda)})` }, judge: { kind: 'span', basis: [vt(nVec)], require: 'orthonormal' } },
    { kind: 'eq', math: unitText(nVec), note: '', subgoal: 'norm' },
    { kind: 'segment', html: '(d)–(e) Q orthogonale et D diagonale avec A = QDQᵀ.', start: { math: 'A = QDQᵀ' }, judge: { kind: 'factor', A: mt(d.A), of: 'orthodiag' } },
    { kind: 'eq', math: QText(d), note: '', subgoal: 'assemble' },
    { kind: 'eq', math: DText(d.lams), note: '', subgoal: 'assemble' },
  ];
  return matLines({
    skill: OD, level: 5, exam: { format: 'open', points: 14 },
    prompt: `W ⊂ ℝ⁴ est l'hyperplan ${R(W)}, et A = ${MLm(d.A)}. (a) Applique Gram-Schmidt à la base ${big.basis.map(vR).join(', ')} de W. (b) Calcule le polynôme caractéristique de A. (c) Donne des bases orthonormées des espaces propres. (d)–(e) Écris A = QDQᵀ.`,
    start: basis.join(', '), judge: { kind: 'span', basis, require: 'orthogonal', nested: true }, mode: 'free', script,
    hints: [], noHints: true, subgoals: OD_SUB, key: `${OD}:open:${mt(d.A)}`, fallback: d.fallback,
  });
}
// n₁x₁ + n₂x₂ + … as text.
function polyEq(n) {
  let s = '';
  n.forEach((c, i) => {
    if (c.n === 0) return;
    const a = Math.abs(c.n);
    s += `${c.n < 0 ? (s ? ' − ' : '−') : s ? ' + ' : ''}${a === 1 ? '' : a}x${sub(i + 1)}`;
  });
  return s;
}

// ======================================================================
// l-sym-quadform
// ======================================================================

const QF_SUB = [
  { id: 'matrix', label: 'matrice de la forme', skill: QF },
  { id: 'orthodiag', label: 'orthodiagonaliser', skill: OD },
  { id: 'reduce', label: 'forme réduite et nature', skill: QF },
];
const XS = ['x', 'y', 'z'];
const YS = ['X', 'Y', 'Z'];
const QF_MENU = [
  { id: 'matrix', label: 'Écrire la matrice A de la forme', why: 'A est déjà écrite.' },
  { id: 'eig', label: 'Calculer les valeurs propres de A', why: 'Écris d\'abord A, ou les valeurs propres sont déjà connues.' },
  { id: 'axes', label: 'Trouver les axes principaux (P orthogonale)', why: 'Il faut d\'abord les valeurs propres.' },
  { id: 'reduce', label: 'Écrire la forme réduite', why: 'Il faut d\'abord les axes principaux.' },
];

// A sum of terms c·monomial as CAS text: 5x^2-4xy+8y^2.
function sumText(terms) {
  let s = '';
  for (const { c, m } of terms) {
    if (c.n === 0) continue;
    const a = c.n < 0 ? c.neg() : c;
    const coef = a.eq(1) ? '' : qt(a);
    s += `${c.n < 0 ? '-' : s ? '+' : ''}${coef}${m}`;
  }
  return s || '0';
}
// Q(x) = xᵀAx: aᵢᵢ for xᵢ², 2aᵢⱼ for xᵢxⱼ.
function qfText(A) {
  const n = A.length;
  const terms = [];
  for (let i = 0; i < n; i++) terms.push({ c: A[i][i], m: `${XS[i]}^2` });
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) terms.push({ c: A[i][j].mul(2), m: `${XS[i]}${XS[j]}` });
  if (n === 2) [terms[1], terms[2]] = [terms[2], terms[1]];
  return sumText(terms);
}
const reducedText = (lams) => sumText(lams.map((l, k) => ({ c: l, m: `${YS[k]}^2` })));
const qfVars = (n) => [...YS.slice(0, n), ...XS.slice(0, n)];
// x = P·(X ; Y): each old letter as an expression of the new ones.
function substOf(d) {
  const out = {};
  for (let i = 0; i < d.n; i++) {
    const parts = d.cols.map((c, k) => (c[i].n === 0 ? null : `(${entryText(c[i], norm2(c))})*${YS[k]}`)).filter(Boolean);
    out[XS[i]] = parts.join('+');
  }
  return out;
}
const QM = (text, n) => MT(text, { vars: qfVars(n) });
function natureOf(lams) {
  if (lams.every((l) => l.n > 0)) return 'pos';
  if (lams.every((l) => l.n < 0)) return 'neg';
  if (lams.some((l) => l.n > 0) && lams.some((l) => l.n < 0)) return 'indef';
  return lams.some((l) => l.n > 0) ? 'semipos' : 'semineg';
}
const NATURE = { pos: 'définie positive', neg: 'définie négative', indef: 'indéfinie', semipos: 'semi-définie positive', semineg: 'semi-définie négative' };
function natureDecision(d) {
  const nat = natureOf(d.lams);
  const posDiag = d.A.every((r, i) => r[i].n > 0);
  return {
    kind: 'decision', prompt: `Les valeurs propres sont ${listFr(d.E.map((e) => lamR(e.lambda)))}. Quelle est la nature de Q ?`,
    options: ['pos', 'neg', 'indef', 'semipos'].map((k) => ({
      id: k, label: NATURE[k], valid: k === nat,
      rule: k === 'pos' && nat !== 'pos' && posDiag ? 'l_posdef_diag' : undefined,
      why: k === nat ? undefined : 'Regarde les signes des valeurs propres : toutes > 0, définie positive ; toutes < 0, définie négative ; des deux signes, indéfinie.',
    })),
  };
}

function qfData(rng, level) {
  if (level === 4) return rng.chance(0.6) ? symRank1(3, rng, { nonzero: true, needGs: false }) : sym3(rng, { nonzero: true });
  return sym2(rng, { nonzero: true, sign: level === 5 ? (rng.chance(0.65) ? 'pos' : 'mixed') : rng.chance(1 / 3) ? 'mixed' : null });
}

// The parts after the matrix: eigenvalues, axes, nature, reduced form.
function qfParts(d, { menu = false, guided = false, axes = true, charpoly = true } = {}) {
  const M = (id) => (menu ? { menu: menuOf(QF_MENU, id) } : {});
  const script = [];
  if (charpoly) {
    script.push({ kind: 'segment', html: 'Les valeurs propres de A : le polynôme caractéristique, factorisé.', start: { math: 'det(A-λI)' }, judge: { kind: 'det', vars: ['λ'], names: { A: mt(d.A) }, target: 'factored', ...M('eig') } });
    script.push({ kind: 'eq', math: charText(d.E), note: `Valeurs propres ${listFr(d.E.map((e) => lamR(e.lambda)))}`, subgoal: 'orthodiag' });
  }
  if (axes) {
    script.push({ kind: 'segment', html: 'Les axes principaux : P orthogonale et D diagonale avec A = PDPᵀ (valeurs propres dans l\'ordre croissant).', start: { math: 'A = PDPᵀ' }, judge: { kind: 'factor', A: mt(d.A), of: 'orthodiag', ...M('axes') } });
    script.push({ kind: 'eq', math: `P = ${orthText(d.cols)} ; ${DText(d.lams)}`, note: 'Colonnes de P : vecteurs propres orthonormés', subgoal: 'orthodiag' });
  }
  const vars = qfVars(d.n);
  const red = reducedText(d.lams);
  const newV = `(${YS.slice(0, d.n).join(' ; ')})`;
  script.push({ kind: 'segment', html: `Avec x = P·${newV}, écris Q sans terme croisé, en ${listFr(YS.slice(0, d.n))}.`, start: { math: qfText(d.A) }, judge: { kind: 'equiv', vars, subst: substOf(d), target: 'only', finalVars: YS.slice(0, d.n), ...M('reduce') } });
  script.push(natureDecision(d));
  const line = { kind: 'eq', math: red, note: `Q = λ₁X² + λ₂Y²${d.n > 2 ? ' + λ₃Z²' : ''} : ${NATURE[natureOf(d.lams)]}`, subgoal: 'reduce' };
  if (guided) {
    const node = parse(red, { vars });
    Object.assign(line, blankLine(node, coefHoles(node), { vars }));
  }
  script.push(line);
  return script;
}

const qfHints = (d) => [
  { level: 1, html: 'Le coefficient de x² va en a₁₁ ; la <b>moitié</b> du coefficient de xy va en a₁₂ et en a₂₁. Puis Q = λ₁X² + λ₂Y² avec les valeurs propres de A.' },
  { level: 2, html: `A = [[${fq(d.A[0][0])}, □], [□, ${fq(d.A[1][1])}]${d.n > 2 ? ', …' : ''}]` },
  { level: 3, html: QM(reducedText(d.lams), d.n) },
];

function qfItem(level, rng) {
  const d = qfData(rng, level);
  const Qtext = qfText(d.A);
  const prompt0 = `Q(${XS.slice(0, d.n).join(', ')}) = ${QM(Qtext, d.n)}`;
  const matLine = { kind: 'eq', math: mt(d.A), note: 'Diagonale : coefficients des carrés ; hors de la diagonale : moitié des termes croisés', subgoal: 'matrix' };
  const judge = { kind: 'mat', expect: mt(d.A), quadform: true };
  const key = `${QF}:${mt(d.A)}:${level}`;
  if (level === 1) {
    const vecs = listFr(d.cols.map((c, k) => `${vR(c)} pour λ = ${lamR(d.lams[k])}`));
    return matLines({
      skill: QF, level, prompt: `${prompt0}. Écris sa matrice symétrique A. Puis, sachant que A a les vecteurs propres ${vecs}, écris Q dans le repère des axes principaux.`,
      start: 'A', judge, mode: 'guided',
      script: [withCells(matLine, [[0, 1], [1, 0]]), ...qfParts(d, { guided: true, axes: false, charpoly: false })],
      hints: qfHints(d), subgoals: QF_SUB, key, fallback: d.fallback,
    });
  }
  if (level === 2) {
    const c = d.A[0][1].mul(2);
    const decision = {
      kind: 'decision', prompt: `Le terme croisé est ${R(qt(c))}xy. Que vaut a₁₂ ?`, options: [
        { id: 'half', label: `${lamR(d.A[0][1])} (la moitié)`, valid: true },
        { id: 'full', label: `${R(qt(c))} (le coefficient entier)`, valid: false, rule: 'l_quadform_offdiag', why: `xᵀAx contient a₁₂xy + a₂₁yx = 2a₁₂xy : il faut 2a₁₂ = ${R(qt(c))}.` },
      ],
    };
    return matLines({
      skill: QF, level, prompt: `${prompt0}. Écris sa matrice A, trouve ses valeurs propres, puis écris Q sans terme croisé et donne sa nature.`,
      start: 'A', judge, mode: 'guided',
      script: [decision, withCells(matLine, [[0, 1], [1, 0], [1, 1]]), ...qfParts(d, { guided: true, axes: false })],
      hints: qfHints(d), subgoals: QF_SUB, key, fallback: d.fallback,
    });
  }
  if (level === 5) return qfCurve(d, key);
  const parts = qfParts(d, { menu: level === 3 });
  return matLines({
    skill: QF, level, prompt: `${prompt0}. Écris sa matrice A, trouve ses axes principaux (A = PDPᵀ), puis écris Q sans terme croisé et donne sa nature${level === 3 ? '. Choisis d\'abord chaque action' : ''}.`,
    start: 'A', judge: level === 3 ? { ...judge, menu: menuOf(QF_MENU, 'matrix') } : judge, mode: level === 3 ? 'tap' : 'free',
    script: [matLine, ...parts], hints: qfHints(d), subgoals: QF_SUB, key, tapActions: level === 3 ? 'menu' : null, fallback: d.fallback,
  });
}

// Level 5: the level curve Q = c, an ellipse (half-axes √(c/λᵢ)) or a
// hyperbola (vertices at √(c/λ₂) on the axis of the positive λ₂).
function qfCurve(d, key) {
  const pos = natureOf(d.lams) === 'pos';
  const [l1, l2] = d.lams;
  const c = pos ? l1.mul(l2) : l1.neg().mul(l2);
  const curve = {
    kind: 'decision', prompt: `Quelle est la courbe Q(x, y) = ${qt(c)} ?`, options: [
      { id: 'ell', label: 'Une ellipse', valid: pos, why: pos ? undefined : 'Les valeurs propres sont de signes opposés : λ₁X² + λ₂Y² = c est une hyperbole.' },
      { id: 'hyp', label: 'Une hyperbole', valid: !pos, why: pos ? 'Les deux valeurs propres sont positives : λ₁X² + λ₂Y² = c > 0 est une ellipse.' : undefined },
      { id: 'lines', label: 'Deux droites', valid: false, why: 'Aucune valeur propre n\'est nulle et c ≠ 0 : ce n\'est pas une conique dégénérée.' },
    ],
  };
  const a1 = rootText(c.div(l1).valueOf());
  const a2 = rootText(c.div(l2).valueOf());
  const tail = pos ? [
    { kind: 'segment', html: `La courbe Q(x, y) = ${qt(c)} : le demi-axe selon ${vR(d.cols[0])} (l'axe des X).`, ask: 'a =', start: { math: 'a' }, judge: { kind: 'value', expect: a1, form: 'exact' } },
    curve,
    { kind: 'eq', math: a1, note: `X²/${qt(c.div(l1))} + Y²/${qt(c.div(l2))} = 1`, subgoal: 'reduce' },
    { kind: 'segment', html: `Le demi-axe selon ${vR(d.cols[1])} (l'axe des Y).`, ask: 'b =', start: { math: 'b' }, judge: { kind: 'value', expect: a2, form: 'exact' } },
    { kind: 'eq', math: a2, note: '', subgoal: 'reduce' },
  ] : [
    { kind: 'segment', html: `La courbe Q(x, y) = ${qt(c)} : ses sommets sont sur l'axe dirigé par ${vR(d.cols[1])}. À quelle distance de l'origine ?`, ask: 'a =', start: { math: 'a' }, judge: { kind: 'value', expect: a2, form: 'exact' } },
    curve,
    { kind: 'eq', math: a2, note: `Y²/${qt(c.div(l2))} − X²/${qt(c.div(l1).neg())} = 1`, subgoal: 'reduce' },
  ];
  return matLines({
    skill: QF, level: 5,
    prompt: `Q(x, y) = ${QM(qfText(d.A), 2)}. Trouve ses axes principaux et sa forme réduite, puis décris la courbe Q(x, y) = ${qt(c)} (nature, ${pos ? 'longueurs des demi-axes' : 'distance des sommets à l\'origine'}).`,
    start: 'A', judge: { kind: 'mat', expect: mt(d.A), quadform: true }, mode: 'free',
    script: [{ kind: 'eq', math: mt(d.A), note: '', subgoal: 'matrix' }, ...qfParts(d), ...tail],
    hints: [], noHints: true, subgoals: QF_SUB, key, fallback: d.fallback,
  });
}

function qfExam(rng, exam) {
  if (exam === 'tf') return qfTf(rng);
  if (rng.chance(0.5)) {
    const d = sym2(rng, { nonzero: true });
    const A = d.A;
    const M2 = (f) => MLm(A.map((r, i) => r.map((x, j) => (i === j ? x : f(x)))));
    return mcqDistinct({
      skill: QF, level: 4, key: `mcq-mat:${mt(A)}`, exam: examTag({ exam }),
      prompt: `Quelle est la matrice symétrique A telle que ${QM(qfText(A), 2)} = xᵀAx, avec x = (x ; y) ?`,
      right: MLm(A),
      wrongs: [{ html: M2((x) => x.mul(2)), rule: 'l_quadform_offdiag' }],
      fillers: [{ html: M2((x) => x.neg()) }, { html: M2((x) => x.mul(-2)) }, { html: MLm([[A[1][1], A[0][1]], [A[1][0], A[0][0]]]) }],
      solution: [{ html: MLm(A), note: 'La moitié du coefficient de xy hors de la diagonale' }],
    }, rng);
  }
  const d = rng.chance(0.4) ? sym2(rng, { nonzero: true, sign: 'mixed-posdiag' }) : sym2(rng, { nonzero: true });
  const nat = natureOf(d.lams);
  const posDiag = d.A.every((r, i) => r[i].n > 0);
  return mcqDistinct({
    skill: QF, level: 4, key: `mcq-nat:${mt(d.A)}`, exam: examTag({ exam }),
    prompt: `Quelle est la nature de la forme quadratique ${QM(qfText(d.A), 2)} ?`,
    right: NATURE[nat],
    wrongs: ['pos', 'neg', 'indef', 'semipos'].filter((k) => k !== nat).map((k) => ({ html: NATURE[k], rule: k === 'pos' && posDiag ? 'l_posdef_diag' : null })),
    solution: [{ html: `A = ${MLm(d.A)}, valeurs propres ${listFr(d.lams.map(lamR))}`, note: NATURE[nat] }],
  }, rng);
}

function qfTf(rng) {
  const exam = { format: 'tf', points: 1 };
  const k = rng.int(0, 3);
  if (k === 0) {
    const M = rng.pick([[[1, 2], [2, 1]], [[1, 3], [3, 2]], [[2, 3], [3, 1]], [[1, -2], [-2, 1]]]);
    return tfL({
      skill: QF, key: `posdiag:${mt(MX.mat(M))}`, truth: false, exam, ruleIfTrue: 'l_posdef_diag',
      statement: 'Si A est symétrique et que ses coefficients diagonaux sont tous strictement positifs, la forme Q(x) = xᵀAx est définie positive.',
      counter: { kind: 'matOne', params: { want: 'symNotPD' }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(MX.mat(M)) } },
      explanation: `Faux : ${MLm(MX.mat(M))} a une diagonale positive, mais det A < 0 : une valeur propre est négative.`,
    });
  }
  if (k === 1) {
    const [a, b] = rng.pick([[2, 1], [4, 1], [2, 3], [6, 1]]);
    const Qt = `${a}xy + ${b === 1 ? '' : b}z²`;
    return tfL({
      skill: QF, key: `ellipsoid:${a}:${b}`, truth: false, exam,
      statement: `La forme Q(x, y, z) = ${Qt} est définie positive : la surface Q = 1 est un ellipsoïde.`,
      counter: {
        kind: 'refute', quants: XS.map((v) => ({ q: '∀', v, dom: 'R' })), pred: `x^2+y^2+z^2=0 ∨ ${a}x×y+${b}z^2>0`,
        ask: XS.map((v) => ({ v, label: `${v} =` })), answer: { x: '1', y: '-1', z: '0' },
      },
      explanation: `Faux : Q(1, −1, 0) = −${a} < 0. La matrice a des valeurs propres des deux signes : Q est indéfinie, et la surface Q = 1 est un hyperboloïde.`,
    });
  }
  if (k === 2) {
    return tfL({ skill: QF, key: 'eig-pos', truth: true, exam, statement: 'Si toutes les valeurs propres de la matrice symétrique A sont strictement positives, alors xᵀAx > 0 pour tout x ≠ 0.', explanation: 'Vrai : avec x = Py, xᵀAx = λ₁y₁² + … + λₙyₙ² > 0 dès que y ≠ 0, et y = Pᵀx ≠ 0.' });
  }
  return tfL({ skill: QF, key: 'diag-pos', truth: true, exam, statement: 'Si la forme xᵀAx est définie positive, alors les coefficients diagonaux de A sont strictement positifs.', explanation: 'Vrai : aᵢᵢ = eᵢᵀAeᵢ = Q(eᵢ) > 0. (La réciproque est fausse.)' });
}

// ======================================================================
// SVD built backwards (the catalogue's svdReverse)
// ======================================================================

const P2 = [[[1, 1], [1, -1]], [[1, 2], [2, -1]], [[2, 1], [1, -2]], [[3, 4], [4, -3]], [[1, 0], [0, 1]]];
const T4 = [
  [[1, 1, 1, 1], [1, -1, 1, -1], [1, 1, -1, -1], [1, -1, -1, 1]],
  [[1, 1, 0, 0], [1, -1, 0, 0], [0, 0, 1, 1], [0, 0, 1, -1]],
  [[1, 0, 1, 0], [0, 1, 0, 1], [1, 0, -1, 0], [0, 1, 0, -1]],
  [[1, 1, 1, 0], [1, -1, 0, 1], [1, 0, -1, -1], [0, 1, -1, 1]],
];
function familyOf(k, rng) {
  if (k === 2) return permuteFamily(rng.shuffle([...rng.pick(P2)]), rng);
  if (k === 3) return permuteFamily(rng.shuffle([...rng.pick(T3)]), rng);
  return permuteFamily(rng.shuffle([...rng.pick(T4)]), rng);
}
const isUnitFamily = (vs) => vs.every((v) => norm2(v) === 1);

// A = s₁p₁q₁ᵀ + s₂p₂q₂ᵀ (m × n, rank 2): σᵢ² = sᵢ²‖pᵢ‖²‖qᵢ‖², σ₁ > σ₂.
// ps, qs: the whole columns of U and V (rank first, then the completion).
function svdData(m, n, rng, { max = 9 } = {}) {
  for (let t = 0; t < 200; t++) {
    let ps = familyOf(m, rng);
    let qs = familyOf(n, rng);
    if (isUnitFamily(ps) && isUnitFamily(qs)) continue;
    const s = [rng.int(1, 3), rng.int(1, 3)];
    let sig2 = [0, 1].map((i) => s[i] * s[i] * norm2(ps[i]) * norm2(qs[i]));
    if (sig2[0] === sig2[1]) continue;
    if (sig2[0] < sig2[1]) {
      ps = [ps[1], ps[0], ...ps.slice(2)];
      qs = [qs[1], qs[0], ...qs.slice(2)];
      s.reverse();
      sig2 = sig2.reverse();
    }
    let A = MX.zeros(m, n);
    for (let i = 0; i < 2; i++) A = addM(A, scaleM(outer(ps[i], qs[i]), q(s[i])));
    if (maxAbs(A) > max) continue;
    if (A.some((r) => r.every((x) => x.n === 0)) || MX.transpose(A).some((c) => c.every((x) => x.n === 0))) continue;
    if (A.flat().filter((x) => x.n === 0).length > (m * n) / 3) continue;
    // σᵢ = k, k√2, k√3, k√5 or k√6.
    if (!sig2.every((x) => [1, 2, 3, 5, 6].includes(x / (rootText(x).includes('√') ? (Number(rootText(x).split('√')[0]) || 1) ** 2 : x)))) continue;
    return { A, m, n, ps, qs, sig2, s };
  }
  const ps = [qv([1, 1]), qv([1, -1])];
  const qs = [qv([1, 2, 2]), qv([2, 1, -2]), qv([2, -2, 1])].slice(0, n);
  return { A: MX.mat([[4, 5, 2], [0, 3, 6]]), m: 2, n: 3, ps, qs: [qv([1, 2, 2]), qv([2, 1, -2]), qv([2, -2, 1])], sig2: [72, 18], s: [2, 1], fallback: true };
}

const sigmaText = (d) => {
  const S = MX.zeros(d.m, d.n).map((r) => r.map(() => '0'));
  d.sig2.forEach((x, i) => { S[i][i] = rootText(x); });
  return `Σ = [${S.map((r) => `[${r.join(',')}]`).join(',')}]`;
};
const VText = (d) => `V = ${orthText(d.qs)}`;
const UText = (d) => `U = ${orthText(d.ps)}`;
const AtA = (d) => MX.mul(MX.transpose(d.A), d.A);
const AAt = (d) => MX.mul(d.A, MX.transpose(d.A));
const supN = (k) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[k];

// ======================================================================
// l-svd-compute
// ======================================================================

const SVD_SUB = [
  { id: 'ata', label: 'AᵀA', skill: 'l-mat-product' },
  { id: 'eig', label: 'valeurs propres', skill: 'l-eig-charpoly' },
  { id: 'sigma', label: 'valeurs singulières', skill: SVD },
  { id: 'V', label: 'V : vecteurs propres orthonormés de AᵀA', skill: OD },
  { id: 'U', label: 'U : uᵢ = Avᵢ/σᵢ', skill: SVD },
];
const SVD_MENU = [
  { id: 'ata', label: 'Calculer AᵀA', why: 'AᵀA est déjà calculée.' },
  { id: 'eig', label: 'Calculer les valeurs propres (de AᵀA ou de AAᵀ)', why: 'Ce n\'est pas l\'étape suivante.' },
  { id: 'sigma', label: 'Prendre σᵢ = √λᵢ', why: 'Il faut d\'abord les valeurs propres.' },
  { id: 'V', label: 'Trouver les vecteurs propres de AᵀA (colonnes de V)', why: 'Il faut d\'abord les valeurs propres de AᵀA.' },
  { id: 'U', label: 'Assembler U, Σ et V (uᵢ = Avᵢ/σᵢ)', why: 'Il manque encore des colonnes de V.' },
];

// The parts of an SVD. opts: guided (cells, blanks), menu, ata (the AᵀA
// part), eig (the det part), decision (at the det part).
function svdParts(d, { guided = false, menu = false, ata = true, eig = true, decision = null } = {}) {
  const M = (id) => (menu ? { menu: menuOf(SVD_MENU, id) } : {});
  const A = mt(d.A);
  const B = mt(AtA(d));
  const script = [];
  if (ata) {
    script.push({ kind: 'segment', html: 'Calcule AᵀA.', start: { math: 'AᵀA' }, judge: { kind: 'mat', expect: B, ...M('ata') } });
    script.push({ kind: 'eq', math: B, note: 'Produits scalaires des colonnes de A', subgoal: 'ata' });
  }
  if (eig) {
    const small = d.m < d.n ? 'AAᵀ' : 'AᵀA';
    const E = symEigen(d.m < d.n ? AAt(d) : AtA(d));
    script.push({ kind: 'segment', html: `Les valeurs propres de ${small} (polynôme caractéristique factorisé).`, start: { math: `det(${small}-λI)` }, judge: { kind: 'det', vars: ['λ'], names: { A }, target: 'factored', ...M('eig') } });
    if (decision) script.push(decision);
    script.push({ kind: 'eq', math: charText(E), note: `${small} est ${E.reduce((s, e) => s + e.mult, 0)}×${E.reduce((s, e) => s + e.mult, 0)}`, subgoal: 'eig' });
  }
  d.sig2.forEach((x, i) => {
    const v = rootText(x);
    script.push({ kind: 'segment', html: `σ${sub(i + 1)}, la ${i ? 'deuxième' : 'plus grande'} valeur singulière.`, ask: `σ${sub(i + 1)} =`, start: { math: `σ_${i + 1}` }, judge: { kind: 'value', expect: v, form: 'exact', sigma: true, ...M('sigma') } });
    script.push({ kind: 'eq', math: v, ...(guided ? blankAll(v) : {}), note: `√${x}`, subgoal: 'sigma' });
  });
  d.qs.forEach((qv0, i) => {
    const lam = i < 2 ? d.sig2[i] : 0;
    script.push({ kind: 'segment', html: i < 2 ? `v${sub(i + 1)} : un vecteur propre de AᵀA pour λ = ${lam}.` : `Complète V : un vecteur de Ker A (λ = 0).`, ask: `v${sub(i + 1)} ∝`, start: { math: `v_${i + 1}` }, judge: { kind: 'eigvec', A: B, lambda: String(lam), ...M('V') } });
    const line = { kind: 'eq', math: vt(qv0), note: lam ? `(AᵀA − ${lam}I)v = 0` : 'Av = 0', subgoal: 'V' };

    script.push(guided ? withCells(line, [[qv0.findIndex((x) => x.n !== 0), 0]]) : line);
  });
  for (let i = 2; i < d.m; i++) {
    script.push({ kind: 'segment', html: 'Complète U : un vecteur de Ker Aᵀ.', ask: `u${sub(i + 1)} ∝`, start: { math: `u_${i + 1}` }, judge: { kind: 'eigvec', A: mt(AAt(d)), lambda: '0', ...M('V') } });
    script.push({ kind: 'eq', math: vt(d.ps[i]), note: 'Aᵀu = 0', subgoal: 'U' });
  }
  script.push({ kind: 'segment', html: 'Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).', start: { math: 'A = UΣVᵀ' }, judge: { kind: 'factor', A, of: 'SVD', ...M('U') } });
  script.push({ kind: 'eq', math: sigmaText(d), note: 'Même taille que A', subgoal: 'sigma' });
  const vLine = { kind: 'eq', math: VText(d), note: 'Les vᵢ normalisés', subgoal: 'V' };
  script.push(guided ? withCells(vLine, [[0, 0]]) : vLine);
  const uLine = { kind: 'eq', math: UText(d), note: `u₁ = Av₁/σ₁ = ${vR(d.ps[0])}/${rootText(norm2(d.ps[0]))}`, subgoal: 'U' };
  script.push(guided ? withCells(uLine, [[0, 0], [1, 1]]) : uLine);
  return script;
}

const svdHints = (d) => [
  { level: 1, html: 'V vient de AᵀA (ses vecteurs propres orthonormés) ; σᵢ = √λᵢ dans l\'ordre décroissant ; U se calcule par uᵢ = Avᵢ/σᵢ.' },
  { level: 2, html: `u₁ = A·${vR(d.qs[0])}/(${rootText(norm2(d.qs[0]))}·□)` },
  { level: 3, html: `${MW(UText(d))}, ${MW(sigmaText(d))}, ${MW(VText(d))}` },
];
const sizeOf = (d) => `${d.m} × ${d.n}`;

function svdItem(level, rng) {
  const shape = level === 1 ? rng.pick([[2, 2], [2, 3]]) : level === 2 || level >= 4 ? rng.pick([[2, 3], [3, 2]]) : rng.pick([[2, 2], [2, 3], [3, 2]]);
  const d = svdData(shape[0], shape[1], rng);
  const key = `${SVD}:${mt(d.A)}:${level}`;
  if (level === 1) {
    const parts = svdParts(d, { guided: true, ata: false, eig: false });
    const { start, judge, script } = splitFirst(parts);
    return matLines({
      skill: SVD, level, prompt: `A = ${MLm(d.A)}. On a AᵀA = ${MLm(AtA(d))}, de valeurs propres ${listFr([...d.sig2, ...Array(d.n - 2).fill(0)].map(String))}. Trouve σ₁ et σ₂, puis la SVD A = UΣVᵀ.`,
      start, judge, mode: 'guided', script, hints: svdHints(d), subgoals: SVD_SUB, key, fallback: d.fallback,
    });
  }
  if (level === 2) {
    const bigger = d.m < d.n ? 'AᵀA' : 'AAᵀ';
    const smaller = d.m < d.n ? 'AAᵀ' : 'AᵀA';
    const k = Math.max(d.m, d.n);
    const decision = {
      kind: 'decision', prompt: 'Pour les valeurs propres non nulles, quelle matrice utilises-tu ?', options: [
        { id: 'small', label: `${smaller} (2 × 2)`, valid: true, quality: 'good' },
        { id: 'big', label: `${bigger} (${k} × ${k})`, valid: true, quality: 'poor', why: `Juste aussi (mêmes valeurs propres non nulles, plus 0), mais un déterminant ${k} × ${k} est plus long.` },
      ],
    };
    const { start, judge, script } = splitFirst(svdParts(d, { guided: true, ata: false, decision }));
    return matLines({
      skill: SVD, level, prompt: `A = ${MLm(d.A)} et AᵀA = ${MLm(AtA(d))}. Trouve les valeurs singulières de A, puis sa SVD A = UΣVᵀ.`,
      start, judge, mode: 'guided', script, hints: svdHints(d), subgoals: SVD_SUB, key, fallback: d.fallback,
    });
  }
  const { start, judge, script } = splitFirst(svdParts(d, { menu: level === 3 }));
  return matLines({
    skill: SVD, level, prompt: `Calcule une décomposition en valeurs singulières A = UΣVᵀ de A = ${MLm(d.A)} (${sizeOf(d)})${level === 3 ? '. Choisis d\'abord chaque action' : ''}.`,
    start, judge, mode: level === 3 ? 'tap' : 'free', script, hints: svdHints(d), subgoals: SVD_SUB, key, tapActions: level === 3 ? 'menu' : null, fallback: d.fallback,
  });
}

function svdExam(rng, exam) {
  if (exam === 'tf') return svdTf(rng);
  if (exam === 'open') return svdOpen(rng);
  const d = svdData(...rng.pick([[2, 3], [3, 2], [2, 2]]), rng);
  if (rng.chance(0.5)) {
    const s = d.sig2.map(rootText).map(R);
    return mcqDistinct({
      skill: SVD, level: 4, key: `mcq-sigma:${mt(d.A)}`, exam: examTag({ exam }),
      prompt: `Quelles sont les valeurs singulières non nulles de A = ${MLm(d.A)} ?`,
      right: `σ₁ = ${s[0]} et σ₂ = ${s[1]}`,
      wrongs: [{ html: `σ₁ = ${d.sig2[0]} et σ₂ = ${d.sig2[1]}`, rule: 'l_svd_sigma_is_eig' }],
      fillers: [
        { html: `σ₁ = ${R(rootText(d.sig2[0] * 4))} et σ₂ = ${R(rootText(d.sig2[1] * 4))}` },
        { html: `σ₁ = ${R(rootText(d.sig2[0] + d.sig2[1]))} et σ₂ = ${R(rootText(Math.abs(d.sig2[0] - d.sig2[1])))}` },
        { html: `σ₁ = ${R(rootText(d.sig2[0]))}/2 et σ₂ = ${R(rootText(d.sig2[1]))}/2` },
      ],
      solution: [{ html: `Valeurs propres non nulles de AᵀA : ${d.sig2.join(' et ')}`, note: 'σᵢ = √λᵢ' }],
    }, rng);
  }
  // U: from V = (given), the columns Avᵢ/σᵢ.
  const AV = d.qs.slice(0, 2).map((qq) => MX.matVec(d.A, qq));
  const noSigma = d.m === 2 ? `U = ${mt(MX.fromCols(AV))}` : null;
  const swapped = `U = ${orthText([d.ps[1], d.ps[0], ...d.ps.slice(2)])}`;
  const unnorm = `U = ${mt(MX.fromCols(d.ps))}`;
  const uvSwap = d.m === d.n ? `U = ${orthText(d.qs)}` : null;
  const okU = (t) => validU(d, t);
  return mcqDistinct({
    skill: SVD, level: 4, key: `mcq-U:${mt(d.A)}`, exam: examTag({ exam }),
    prompt: `A = ${MLm(d.A)} = UΣVᵀ avec ${MW(sigmaText(d))} et ${MW(VText(d))}. Que vaut U ?`,
    right: MW(UText(d)),
    wrongs: [
      noSigma && !okU(noSigma) ? { html: MW(noSigma), rule: 'l_svd_no_sigma' } : null,
      uvSwap && !okU(uvSwap) ? { html: MW(uvSwap), rule: 'l_svd_uv_swap' } : null,
      !okU(unnorm) ? { html: MW(unnorm), rule: 'l_orthodiag_no_normalize' } : null,
      !okU(swapped) ? { html: MW(swapped), rule: 'l_pd_order' } : null,
    ].filter(Boolean),
    solution: [{ html: MW(UText(d)), note: 'uᵢ = Avᵢ/σᵢ' }],
  }, rng);
}
// Is « U = … » the U of this SVD (with the given V)?
function validU(d, text) {
  try {
    const l = parseMatLine(normalizeMatText(text), { vars: [] });
    const F = evalFloatMatrix(l.assigns[0].ast);
    const want = MX.fromCols(d.ps).map((r, i) => r.map((x, j) => x.valueOf() / Math.sqrt(norm2(d.ps[j]))));
    return F.length === want.length && F.every((r, i) => r.length === want[i].length && r.every((x, j) => Math.abs(x - want[i][j]) < 1e-9));
  } catch { return false; }
}

function svdTf(rng) {
  const exam = { format: 'tf', points: 1 };
  const k = rng.int(0, 4);
  if (k === 0) return tfL({ skill: SVD, key: 'inv-sigma', truth: true, exam, statement: 'Une matrice carrée A (n × n) est inversible si et seulement si elle a n valeurs singulières non nulles.', explanation: 'Vrai : le nombre de σᵢ non nuls est le rang de A.' });
  if (k === 1) return tfL({ skill: SVD, key: 'sigma-unique', truth: true, exam, statement: 'Dans une SVD A = UΣVᵀ (valeurs singulières décroissantes), la matrice Σ est unique.', explanation: 'Vrai : ses coefficients sont les racines des valeurs propres de AᵀA, rangées dans l\'ordre décroissant. U et V, eux, ne sont pas uniques (signes).' });
  if (k === 2) return tfL({ skill: SVD, key: 'rank', truth: true, exam, statement: 'Le rang de A est égal au nombre de ses valeurs singulières non nulles.', explanation: 'Vrai : rang A = rang AᵀA = nombre de valeurs propres non nulles de AᵀA.' });
  if (k === 3) {
    const M = rng.pick([[[0, 1], [0, 0]], [[0, 2], [0, 0]], [[0, 0], [3, 0]]]);
    return tfL({
      skill: SVD, key: `nonzero:${mt(MX.mat(M))}`, truth: false, exam,
      statement: 'Une matrice carrée a autant de valeurs singulières non nulles que de valeurs propres non nulles (comptées avec multiplicité).',
      counter: { kind: 'matOne', params: { want: 'nilpotent' }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(MX.mat(M)) } },
      explanation: `Faux : ${MLm(MX.mat(M))} n'a que la valeur propre 0, mais elle est de rang 1 : une valeur singulière non nulle.`,
    });
  }
  const M = rng.pick([[[1, 1], [0, 1]], [[1, 2], [0, 1]], [[2, 1], [0, 1]], [[1, 0], [1, 2]]]);
  return tfL({
    skill: SVD, key: `abs-eig:${mt(MX.mat(M))}`, truth: false, exam, ruleIfTrue: 'l_svd_sigma_is_eig',
    statement: 'Les valeurs singulières d\'une matrice carrée sont les valeurs absolues de ses valeurs propres.',
    counter: { kind: 'matOne', params: { want: 'svNotAbsEig' }, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: mt(MX.mat(M)) } },
    explanation: `Faux : pour ${MLm(MX.mat(M))}, AᵀA n'a pas pour valeurs propres les λᵢ². C'est vrai pour une matrice symétrique, pas en général.`,
  });
}

// The open problem (catalogue, exam example 3): a 2 × 4 matrix, an
// orthonormal basis of W = Ker A, B = AᵀA, its polynomial, its
// eigenvectors, then U, Σ, V.
function svdOpen(rng) {
  const d = svdData(2, 4, rng);
  const B = AtA(d);
  const K = MX.kernel(d.A).map(primitive);
  const Korth = MX.transpose(MX.qrGS(MX.fromCols(K)).V).map(primitive);
  const dd = { ...d, qs: [d.qs[0], d.qs[1], ...Korth] };
  const E = symEigen(B);
  const script = [
    { kind: 'eq', math: K.map(vt).join(', '), note: 'Réduction de A', subgoal: 'V' },
    { kind: 'segment', html: '(a) Une base orthonormée de W (Gram-Schmidt, puis normaliser).', start: { math: K.map(vt).join(', ') }, judge: { kind: 'span', basis: K.map(vt), require: 'orthonormal' } },
    { kind: 'eq', math: Korth.map(unitText).join(', '), note: '', subgoal: 'V' },
    { kind: 'segment', html: '(b) B = AᵀA.', start: { math: 'B' }, judge: { kind: 'mat', expect: mt(B) } },
    { kind: 'eq', math: mt(B), note: '', subgoal: 'ata' },
    { kind: 'segment', html: '(c) Le polynôme caractéristique de B, factorisé.', start: { math: 'det(B-λI)' }, judge: { kind: 'det', vars: ['λ'], names: { B: mt(B) }, target: 'factored' } },
    { kind: 'eq', math: charText(E), note: '', subgoal: 'eig' },
    ...[0, 1].flatMap((i) => [
      { kind: 'segment', html: `(d) Un vecteur propre de B pour λ = ${d.sig2[i]}.`, start: { math: `v_${i + 1}` }, judge: { kind: 'eigvec', A: mt(B), lambda: String(d.sig2[i]) } },
      { kind: 'eq', math: vt(d.qs[i]), note: '', subgoal: 'V' },
    ]),
    { kind: 'segment', html: '(e) U, Σ et V avec A = UΣVᵀ (les deux dernières colonnes de V : la base de (a)).', start: { math: 'A = UΣVᵀ' }, judge: { kind: 'factor', A: mt(d.A), of: 'SVD' } },
    { kind: 'eq', math: sigmaText(dd), note: '', subgoal: 'sigma' },
    { kind: 'eq', math: VText(dd), note: '', subgoal: 'V' },
    { kind: 'eq', math: UText(dd), note: '', subgoal: 'U' },
  ];
  return matLines({
    skill: SVD, level: 5, exam: { format: 'open', points: 14 },
    prompt: `Soit A = ${MLm(d.A)} et W = Ker A ⊂ ℝ⁴. (a) Trouve une base de W, puis une base orthonormée de W. (b) Calcule B = AᵀA. (c) Son polynôme caractéristique. (d) Des vecteurs propres de B pour ses valeurs propres non nulles. (e) Écris A = UΣVᵀ.`,
    start: 'Ker A', judge: { kind: 'span', basis: K.map(vt), require: 'basis' }, mode: 'free', script,
    hints: [], noHints: true, subgoals: SVD_SUB, key: `${SVD}:open:${mt(d.A)}`, fallback: d.fallback,
  });
}

// ======================================================================
// l-svd-sphere
// ======================================================================

const SPH_SUB = [
  { id: 'svd', label: 'la SVD', skill: SVD },
  { id: 'describe', label: 'décrire l\'image', skill: SPH },
];
const SPH_MENU = [
  { id: 'eig', label: 'Valeurs propres de AAᵀ', why: 'Ce n\'est pas l\'étape suivante.' },
  { id: 'sigma', label: 'Demi-axes : σᵢ = √λᵢ', why: 'Il faut d\'abord les valeurs propres de AAᵀ.' },
  { id: 'axes', label: 'Directions des axes : vecteurs propres de AAᵀ (les uᵢ)', why: 'Il faut d\'abord les valeurs propres.' },
];
// The image of the unit sphere: 'full' (n > rank: filled ellipse),
// 'curve' (an ellipse, A injective).
const imageKind = (d) => (d.n > 2 ? 'full' : 'curve');
const KIND_LABEL = {
  full: 'une ellipse pleine (le bord et l\'intérieur)',
  curve: 'une ellipse (la courbe seulement)',
};
function typeDecision(d) {
  const k = imageKind(d);
  const why = k === 'full'
    ? `A est ${d.m} × ${d.n} de rang 2 < ${d.n} : elle écrase la direction de Ker A, et des points de la sphère vont à l'intérieur de l'ellipse.`
    : `A est injective (rang 2 = ${d.n}) : chaque point de l'image vient d'un seul point du cercle, l'image est la courbe seule.`;
  return {
    kind: 'decision', prompt: `L'image de la sphère unité de ℝ${supN(d.n)} par A est…`, options: [
      { id: 'curve', label: KIND_LABEL.curve, valid: k === 'curve', rule: k === 'curve' ? undefined : 'l_svd_sphere_boundary', why: k === 'curve' ? undefined : why },
      { id: 'full', label: KIND_LABEL.full, valid: k === 'full', rule: k === 'full' ? undefined : 'l_svd_sphere_boundary', why: k === 'full' ? undefined : why },
      { id: 'seg', label: 'un segment', valid: false, why: 'Le rang est 2 : l\'image n\'est pas contenue dans une droite.' },
    ],
  };
}
const describeImage = (d, { sq = false, swap = false, kind = imageKind(d) } = {}) => {
  const s = d.sig2.map((x) => R(sq ? String(x) : rootText(x)));
  const u = swap ? [d.ps[1], d.ps[0]] : [d.ps[0], d.ps[1]];
  return `${kind === 'full' ? 'Ellipse pleine' : 'Ellipse (la courbe seulement)'}${d.m === 3 ? ' dans le plan Col A' : ''}, de demi-axes ${s[0]} selon ${vR(u[0])} et ${s[1]} selon ${vR(u[1])}`;
};

// The parts: eigenvalues of AAᵀ, half-axes, directions, the type.
function sphParts(d, { guided = false, menu = false, eig = true, decision = true } = {}) {
  const M = (id) => (menu ? { menu: menuOf(SPH_MENU, id) } : {});
  const C = mt(AAt(d));
  const script = [];
  if (eig) {
    script.push({ kind: 'segment', html: 'Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).', start: { math: 'det(AAᵀ-λI)' }, judge: { kind: 'det', vars: ['λ'], names: { A: mt(d.A) }, target: 'factored', ...M('eig') } });
    script.push({ kind: 'eq', math: charText(symEigen(AAt(d))), note: '', subgoal: 'svd' });
  }
  d.sig2.forEach((x, i) => {
    const v = rootText(x);
    script.push({ kind: 'segment', html: `Le ${i ? 'petit' : 'grand'} demi-axe : σ${sub(i + 1)}.`, ask: `σ${sub(i + 1)} =`, start: { math: `σ_${i + 1}` }, judge: { kind: 'value', expect: v, form: 'exact', sigma: true, ...M('sigma') } });
    script.push({ kind: 'eq', math: v, ...(guided ? blankAll(v) : {}), note: `√${x}`, subgoal: 'svd' });
  });
  d.sig2.forEach((x, i) => {
    script.push({ kind: 'segment', html: `La direction du ${i ? 'petit' : 'grand'} axe : u${sub(i + 1)}, vecteur propre de AAᵀ pour λ = ${x}.`, ask: `u${sub(i + 1)} ∝`, start: { math: `u_${i + 1}` }, judge: { kind: 'eigvec', A: C, lambda: String(x), ...M('axes') } });
    if (decision && i === 1) script.push(typeDecision(d));
    const line = { kind: 'eq', math: vt(d.ps[i]), note: i ? describeImage(d) : '', subgoal: i ? 'describe' : 'svd' };
    script.push(guided ? withCells(line, [[d.ps[i].findIndex((y) => y.n !== 0), 0]]) : line);
  });
  return script;
}
const sphHints = (d) => [
  { level: 1, html: 'Axes = uᵢ (colonnes de U), demi-axes = σᵢ. Si le rang est plus petit que n, l\'image est pleine.' },
  { level: 2, html: `rang 2 ${d.n > 2 ? '<' : '='} ${d.n} : l'image est □` },
  { level: 3, html: describeImage(d) },
];

function sphItem(level, rng) {
  const shape = level === 5 ? rng.pick([[2, 3], [2, 3], [3, 2]]) : rng.pick([[2, 2], [2, 3], [3, 2]]);
  const d = svdData(...shape, rng);
  const key = `${SPH}:${mt(d.A)}:${level}`;
  if (level <= 2) {
    const parts = sphParts(d, { guided: true, eig: false, decision: level === 2 });
    const { start, judge, script } = splitFirst(parts);
    if (level === 1) script.unshift({ kind: 'note', html: `Ici, l'image est ${KIND_LABEL[imageKind(d)]}.` });
    return matLines({
      skill: SPH, level,
      prompt: `A = ${MLm(d.A)} (${sizeOf(d)}) a la SVD A = UΣVᵀ avec ${MW(UText(d))}, ${MW(sigmaText(d))}, ${MW(VText(d))}. Décris l'image de la sphère unité de ℝ${supN(d.n)} par A : demi-axes et directions des axes.`,
      start, judge, mode: 'guided', script, hints: sphHints(d), subgoals: SPH_SUB, key, fallback: d.fallback,
    });
  }
  const { start, judge, script } = splitFirst(sphParts(d, { menu: level === 3 }));
  return matLines({
    skill: SPH, level,
    prompt: `Soit A = ${MLm(d.A)} (${sizeOf(d)}). Décris l'image de la sphère unité de ℝ${supN(d.n)} par A : longueurs et directions des demi-axes, et sa nature${level === 3 ? '. Choisis d\'abord chaque action' : ''}.`,
    start, judge, mode: level === 3 ? 'tap' : 'free', script, hints: sphHints(d), subgoals: SPH_SUB, key, tapActions: level === 3 ? 'menu' : null, fallback: d.fallback,
  });
}

function sphExam(rng, exam) {
  const d = svdData(...rng.pick([[2, 3], [2, 2], [3, 2], [2, 3]]), rng);
  if (exam === 'open') {
    const { start, judge, script } = splitFirst(sphParts(d));
    return matLines({
      skill: SPH, level: 5, exam: { format: 'open', points: 4 },
      prompt: `Soit A = ${MLm(d.A)}. Décris l'image de la sphère unité de ℝ${supN(d.n)} par A (valeurs singulières, axes, nature).`,
      start, judge, mode: 'free', script, hints: [], noHints: true, subgoals: SPH_SUB, key: `${SPH}:open:${mt(d.A)}`, fallback: d.fallback,
    });
  }
  const other = imageKind(d) === 'full' ? 'curve' : 'full';
  return mcqDistinct({
    skill: SPH, level: 4, key: `mcq:${mt(d.A)}`, exam: examTag({ exam }),
    prompt: `A = ${MLm(d.A)} a les valeurs singulières ${R(rootText(d.sig2[0]))} et ${R(rootText(d.sig2[1]))}, et U = [u₁ u₂${d.m > 2 ? ' u₃' : ''}] avec u₁ ∝ ${vR(d.ps[0])}, u₂ ∝ ${vR(d.ps[1])}. Quelle est l'image de la sphère unité de ℝ${supN(d.n)} par A ?`,
    right: describeImage(d),
    wrongs: [
      { html: describeImage(d, { kind: other }), rule: 'l_svd_sphere_boundary' },
      { html: describeImage(d, { sq: true }), rule: 'l_svd_sigma_is_eig' },
      { html: describeImage(d, { swap: true }), rule: null },
    ],
    solution: [{ html: describeImage(d), note: 'Demi-axes σᵢ selon les uᵢ' }],
  }, rng);
}

// ======================================================================
// l-proof-matrices and l-proof-spectral: proofs in blocks
// ======================================================================

// Each proof: its steps in order (each needs the one before), two decoys
// (a block that assumes the conclusion, an example, or a confusion), the
// justification asked at level 3, and its points in the open variant.
const ASSOC = { id: 'assoc', label: 'Associativité du produit' };
const PROOFS_M = [
  {
    id: 'inv-product', statement: 'si A et B (n × n) sont inversibles, alors AB est inversible et (AB)⁻¹ = B⁻¹A⁻¹',
    steps: [
      'A et B sont inversibles : A⁻¹ et B⁻¹ existent, avec AA⁻¹ = A⁻¹A = I et BB⁻¹ = B⁻¹B = I.',
      '(AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ (associativité).',
      '= AIA⁻¹ = AA⁻¹ = I.',
      'De même, (B⁻¹A⁻¹)(AB) = B⁻¹(A⁻¹A)B = B⁻¹B = I.',
      'Donc AB est inversible, d\'inverse B⁻¹A⁻¹.',
    ],
    decoys: [
      { html: 'Comme (AB)⁻¹ = B⁻¹A⁻¹, le produit (AB)(B⁻¹A⁻¹) vaut I.', rule: 'l_proof_circular', why: 'Ce bloc utilise (AB)⁻¹ = B⁻¹A⁻¹, ce qu\'on veut montrer.' },
      { html: 'Avec A = B = I, (AB)⁻¹ = I = B⁻¹A⁻¹ : c\'est vrai.', rule: 'g9_proof_by_example', why: 'Un exemple ne prouve pas un énoncé « pour toutes A, B ».' },
    ],
    just: { at: 1, prompt: 'Quelle règle donne (AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ ?', options: [
      { ...ASSOC, valid: true },
      { id: 'comm', label: 'Commutativité du produit', valid: false, why: 'Le produit de matrices ne commute pas : on ne déplace pas les facteurs, on regroupe seulement.' },
      { id: 'def', label: 'Définition de l\'inverse', valid: false, why: 'L\'inverse sert à l\'étape suivante (BB⁻¹ = I) ; ici on ne fait que regrouper.' },
    ] },
  },
  {
    id: 'inj-ker', statement: 'une application linéaire T est injective si et seulement si Ker T = {0}',
    steps: [
      '(⇒) Supposons T injective, et soit x ∈ Ker T.',
      'Alors T(x) = 0 = T(0), donc x = 0 par injectivité : Ker T = {0}.',
      '(⇐) Supposons Ker T = {0}, et soient x, y avec T(x) = T(y).',
      'Par linéarité, T(x − y) = T(x) − T(y) = 0, donc x − y ∈ Ker T.',
      'Donc x − y = 0, c\'est-à-dire x = y : T est injective.',
    ],
    decoys: [
      { html: 'Comme T est injective, T(x) = T(y) donne x = y.', rule: 'l_proof_circular', why: 'Dans le sens (⇐), l\'injectivité est ce qu\'on veut montrer : on ne peut pas s\'en servir.' },
      { html: 'T(0) = 0, donc T est injective.', rule: 'g9_proof_by_example', why: 'Un seul point ne dit rien : il faut T(x) = T(y) ⇒ x = y pour tous x, y.' },
    ],
    just: { at: 3, prompt: 'Pourquoi T(x − y) = T(x) − T(y) ?', options: [
      { id: 'lin', label: 'T est linéaire', valid: true },
      { id: 'inj', label: 'T est injective', valid: false, rule: 'l_proof_circular', why: 'L\'injectivité est la conclusion de ce sens : on ne peut pas l\'utiliser.' },
      { id: 'ker', label: 'Définition du noyau', valid: false, why: 'Le noyau sert après : c\'est la linéarité qui sépare T(x − y).' },
    ] },
  },
  {
    id: 'std-unique', statement: 'si Ax = Bx pour tout x ∈ ℝⁿ, alors A = B (la matrice canonique d\'une application linéaire est unique)',
    steps: [
      'Supposons Ax = Bx pour tout x ∈ ℝⁿ.',
      'Prenons x = eⱼ, le j-ième vecteur de la base canonique : Aeⱼ = Beⱼ.',
      'Aeⱼ est la j-ième colonne de A, et Beⱼ la j-ième colonne de B.',
      'A et B ont donc les mêmes colonnes, pour j = 1, …, n : A = B.',
    ],
    decoys: [
      { html: 'Comme A = B, on a bien Aeⱼ = Beⱼ pour tout j.', rule: 'l_proof_circular', why: 'Ce bloc part de A = B, la conclusion.' },
      { html: 'Pour x = 0, A·0 = B·0 = 0, donc A = B.', rule: 'g9_proof_by_example', why: 'Une seule valeur de x ne suffit pas : toute matrice vérifie A·0 = 0.' },
    ],
    just: { at: 2, prompt: 'Pourquoi Aeⱼ est-elle la j-ième colonne de A ?', options: [
      { id: 'prod', label: 'Définition du produit matrice-vecteur (combinaison des colonnes)', valid: true },
      { id: 'inv', label: 'A est inversible', valid: false, why: 'Rien ne dit que A est inversible, et ce n\'est pas utile ici.' },
      { id: 'lin', label: 'T est linéaire', valid: false, why: 'C\'est vrai de toute matrice : Aeⱼ = 0·a₁ + … + 1·aⱼ + … + 0·aₙ.' },
    ] },
  },
  {
    id: 'eig-inverse', statement: 'si λ est valeur propre de A inversible, alors λ ≠ 0 et 1/λ est valeur propre de A⁻¹',
    steps: [
      'Soit v ≠ 0 avec Av = λv.',
      'Si λ = 0, alors Av = 0 avec v ≠ 0, et A ne serait pas inversible. Donc λ ≠ 0.',
      'On multiplie Av = λv à gauche par A⁻¹ : v = λA⁻¹v.',
      'On divise par λ ≠ 0 : A⁻¹v = (1/λ)v, avec v ≠ 0.',
      'Donc 1/λ est valeur propre de A⁻¹, de vecteur propre v.',
    ],
    decoys: [
      { html: 'Comme 1/λ est valeur propre de A⁻¹, A⁻¹v = (1/λ)v.', rule: 'l_proof_circular', why: 'Ce bloc suppose la conclusion.' },
      { html: 'Avec A = 2I : λ = 2, et A⁻¹ = ½I a la valeur propre ½. C\'est vrai.', rule: 'g9_proof_by_example', why: 'Un exemple ne prouve pas l\'énoncé pour toute matrice inversible.' },
    ],
    just: { at: 2, prompt: 'Comment passe-t-on de Av = λv à v = λA⁻¹v ?', options: [
      { id: 'left', label: 'On multiplie à gauche par A⁻¹', valid: true },
      { id: 'right', label: 'On multiplie à droite par A⁻¹', valid: false, why: 'v est un vecteur colonne : vA⁻¹ n\'a pas de sens. On multiplie à gauche.' },
      { id: 'div', label: 'On divise par A', valid: false, why: 'On ne divise pas par une matrice : on multiplie par son inverse.' },
    ] },
  },
  {
    id: 'sym-inverse', statement: 'si A est symétrique et inversible, alors A⁻¹ est symétrique',
    steps: [
      'Hypothèses : Aᵀ = A et AA⁻¹ = I.',
      'On transpose AA⁻¹ = I : (A⁻¹)ᵀAᵀ = Iᵀ = I.',
      'Comme Aᵀ = A : (A⁻¹)ᵀA = I.',
      'Donc (A⁻¹)ᵀ est l\'inverse de A : (A⁻¹)ᵀ = A⁻¹, et A⁻¹ est symétrique.',
    ],
    decoys: [
      { html: 'A⁻¹ est symétrique, donc (A⁻¹)ᵀ = A⁻¹.', rule: 'l_proof_circular', why: 'C\'est la conclusion : elle ne peut pas servir d\'étape.' },
      { html: 'Avec A = [[2, 1], [1, 1]], A⁻¹ = [[1, −1], [−1, 2]] est symétrique.', rule: 'g9_proof_by_example', why: 'Un exemple ne prouve pas l\'énoncé pour toutes les matrices.' },
    ],
    just: { at: 1, prompt: 'Pourquoi (AA⁻¹)ᵀ = (A⁻¹)ᵀAᵀ ?', options: [
      { id: 'tp', label: 'La transposée d\'un produit renverse l\'ordre', valid: true },
      { id: 'tp-bad', label: '(AB)ᵀ = AᵀBᵀ', valid: false, rule: 'l_transpose_product', why: 'La transposée d\'un produit renverse l\'ordre : (AB)ᵀ = BᵀAᵀ.' },
      { id: 'sym', label: 'A est symétrique', valid: false, why: 'La symétrie sert à l\'étape suivante ; ici c\'est la règle de la transposée.' },
    ] },
  },
  {
    id: 'surj-inj', statement: 'si T : ℝⁿ → ℝⁿ linéaire est surjective, alors elle est injective',
    steps: [
      'Soit A la matrice canonique de T : elle est n × n.',
      'T est surjective : les colonnes de A engendrent ℝⁿ, donc A a un pivot dans chaque ligne.',
      'A est carrée : n pivots dans n colonnes, il y a aussi un pivot dans chaque colonne.',
      'Pas de variable libre : Ax = 0 n\'a que la solution x = 0, donc Ker T = {0}.',
      'Donc T est injective.',
    ],
    decoys: [
      { html: 'T est injective, donc Ax = 0 n\'a que la solution nulle.', rule: 'l_proof_circular', why: 'Ce bloc part de l\'injectivité, la conclusion.' },
      { html: 'Pour n = 1, T(x) = 2x est surjective et injective.', rule: 'g9_proof_by_example', why: 'Un exemple ne prouve rien pour tout n.' },
    ],
    just: { at: 2, prompt: 'Pourquoi un pivot dans chaque ligne donne-t-il un pivot dans chaque colonne ?', options: [
      { id: 'square', label: 'A est carrée (autant de lignes que de colonnes)', valid: true },
      { id: 'always', label: 'C\'est toujours vrai', valid: false, rule: 'l_imt_nonsquare', why: 'Faux pour une matrice 2 × 3 : 2 pivots, mais une colonne sans pivot.' },
      { id: 'lin', label: 'T est linéaire', valid: false, why: 'Toutes les matrices sont linéaires ; c\'est le nombre de lignes et de colonnes qui compte.' },
    ] },
  },
  {
    id: 'schur', statement: 'si A = [[A₁₁, A₁₂], [A₂₁, A₂₂]] (par blocs) et A₁₁ sont inversibles, le complément de Schur S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est inversible',
    steps: [
      'A₁₁ est inversible : on peut former S = A₂₂ − A₂₁A₁₁⁻¹A₁₂.',
      'Par blocs : A = [[I, 0], [A₂₁A₁₁⁻¹, I]]·[[A₁₁, 0], [0, S]]·[[I, A₁₁⁻¹A₁₂], [0, I]].',
      'Les deux facteurs triangulaires par blocs ont un déterminant égal à 1 : det A = det A₁₁·det S.',
      'det A ≠ 0 et det A₁₁ ≠ 0, donc det S ≠ 0 : S est inversible.',
    ],
    decoys: [
      { html: 'S est inversible, donc det S ≠ 0 et det A = det A₁₁·det S ≠ 0.', rule: 'l_proof_circular', why: 'Ce bloc part de la conclusion (S inversible).' },
      { html: 'det S = det A₂₂ − det A₂₁·det A₁₁⁻¹·det A₁₂ ≠ 0.', rule: 'l_det_sum', why: 'Le déterminant n\'est pas additif : det(M − N) ≠ det M − det N.' },
    ],
    just: { at: 2, prompt: 'Quelle propriété donne det A = det A₁₁·det S ?', options: [
      { id: 'mult', label: 'det(MN) = det M·det N', valid: true },
      { id: 'add', label: 'det(M + N) = det M + det N', valid: false, rule: 'l_det_sum', why: 'Le déterminant n\'est pas additif ; il est multiplicatif.' },
      { id: 'tr', label: 'det(Mᵀ) = det M', valid: false, why: 'Vrai, mais ce n\'est pas ce qui sert ici : on a un produit de trois matrices.' },
    ] },
  },
];

const PROOFS_S = [
  {
    id: 'eigspaces-orth', points: 3, statement: 'si A est symétrique, deux vecteurs propres v et w de valeurs propres λ ≠ μ sont orthogonaux',
    steps: [
      'Soient Aᵀ = A, Av = λv et Aw = μw, avec λ ≠ μ.',
      'λ(v · w) = (λv) · w = (Av) · w.',
      '(Av) · w = (Av)ᵀw = vᵀAᵀw.',
      'vᵀAᵀw = vᵀAw = v · (μw) = μ(v · w), car Aᵀ = A.',
      '(λ − μ)(v · w) = 0 et λ ≠ μ, donc v · w = 0.',
    ],
    decoys: [
      { html: 'AᵀA = I, donc Av · Aw = v · w.', rule: 'l_sym_orth_confusion', why: 'AᵀA = I, c\'est une matrice orthogonale. Symétrique veut dire Aᵀ = A.' },
      { html: 'v et w sont orthogonaux, donc λ(v · w) = μ(v · w) = 0.', rule: 'l_proof_circular', why: 'Ce bloc suppose v · w = 0, la conclusion.' },
    ],
    just: { at: 3, prompt: 'Pourquoi vᵀAᵀw = vᵀAw ?', options: [
      { id: 'sym', label: 'A est symétrique : Aᵀ = A', valid: true },
      { id: 'orth', label: 'A est orthogonale : AᵀA = I', valid: false, rule: 'l_sym_orth_confusion', why: 'A est symétrique, pas orthogonale : c\'est Aᵀ = A qui sert.' },
      { id: 'eig', label: 'w est un vecteur propre', valid: false, why: 'Cela sert juste après (Aw = μw) ; d\'abord, Aᵀ devient A.' },
    ] },
  },
  {
    id: 'rank1-proj', points: 4, statement: 'si ‖u‖ = 1, la matrice A = uuᵀ est la projection orthogonale sur Span{u}',
    steps: [
      'Au = u(uᵀu) = u‖u‖² = u : u est vecteur propre pour la valeur propre 1.',
      'Chaque colonne de uuᵀ est un multiple de u : rang A = 1 et Col A = Span{u}.',
      'Si x ⊥ u, Ax = u(uᵀx) = (u · x)u = 0 : u⊥ ⊂ Ker A, et dim Ker A = n − 1, donc Ker A = u⊥.',
      'Pour tout x, Ax = (u · x)u : c\'est la projection orthogonale de x sur Span{u}, car ‖u‖ = 1.',
    ],
    decoys: [
      { html: 'A est symétrique, donc AᵀA = I : A conserve les longueurs.', rule: 'l_sym_orth_confusion', why: 'Symétrique ne veut pas dire orthogonale ; d\'ailleurs une projection raccourcit les vecteurs.' },
      { html: 'A est la projection sur Span{u}, donc Au = u.', rule: 'l_proof_circular', why: 'Ce bloc part de la conclusion.' },
    ],
    just: { at: 0, prompt: 'Pourquoi u(uᵀu) = u ?', options: [
      { id: 'norm', label: 'uᵀu = ‖u‖² = 1', valid: true },
      { id: 'id', label: 'uuᵀ = I', valid: false, rule: 'l_sym_orth_confusion', why: 'uuᵀ est de rang 1 (n × n), pas l\'identité ; c\'est uᵀu (un nombre) qui vaut 1.' },
      { id: 'orth', label: 'u est orthogonal à lui-même', valid: false, why: 'u · u = ‖u‖² = 1 ≠ 0.' },
    ] },
  },
  {
    id: 'orth-eig', points: 4, statement: 'si U est orthogonale et Ux = λx avec x ≠ 0 et λ réel, alors λ = ±1',
    steps: [
      'Soient UᵀU = I et Ux = λx, avec x ≠ 0.',
      '‖Ux‖² = (Ux)ᵀ(Ux) = xᵀUᵀUx = xᵀx = ‖x‖².',
      'Mais ‖Ux‖² = ‖λx‖² = λ²‖x‖².',
      'Donc λ²‖x‖² = ‖x‖², et ‖x‖ ≠ 0 : λ² = 1, λ = ±1.',
    ],
    decoys: [
      { html: 'U est orthogonale, donc Uᵀ = U et ses valeurs propres sont réelles.', rule: 'l_sym_orth_confusion', why: 'Orthogonale veut dire UᵀU = I, pas Uᵀ = U (ça, c\'est symétrique).' },
      { html: 'λ = ±1, donc ‖Ux‖ = |λ|·‖x‖ = ‖x‖.', rule: 'l_proof_circular', why: 'Ce bloc part de λ = ±1, la conclusion.' },
    ],
    just: { at: 1, prompt: 'Pourquoi xᵀUᵀUx = xᵀx ?', options: [
      { id: 'orth', label: 'U est orthogonale : UᵀU = I', valid: true },
      { id: 'sym', label: 'U est symétrique : Uᵀ = U', valid: false, rule: 'l_sym_orth_confusion', why: 'Rien ne dit que U est symétrique : c\'est UᵀU = I qui sert.' },
      { id: 'eig', label: 'x est un vecteur propre', valid: false, why: 'Cela sert à l\'étape suivante (‖λx‖²).' },
    ] },
  },
  {
    id: 'orth-norm', points: 3, statement: 'si U est orthogonale, ‖Ux‖ = ‖x‖ pour tout x',
    steps: [
      'Soit U orthogonale : UᵀU = I.',
      '‖Ux‖² = (Ux) · (Ux) = (Ux)ᵀ(Ux).',
      '(Ux)ᵀ(Ux) = xᵀUᵀUx (transposée d\'un produit).',
      '= xᵀIx = xᵀx = ‖x‖², donc ‖Ux‖ = ‖x‖ (deux normes positives).',
    ],
    decoys: [
      { html: 'U est symétrique : Uᵀ = U, donc ‖Ux‖² = xᵀU²x.', rule: 'l_sym_orth_confusion', why: 'Orthogonale ne veut pas dire symétrique.' },
      { html: '‖Ux‖ = ‖x‖ pour tout x, donc (Ux)ᵀ(Ux) = xᵀx.', rule: 'l_proof_circular', why: 'Ce bloc part de la conclusion.' },
    ],
    just: { at: 2, prompt: 'Pourquoi (Ux)ᵀ = xᵀUᵀ ?', options: [
      { id: 'tp', label: 'La transposée d\'un produit renverse l\'ordre', valid: true },
      { id: 'tp-bad', label: '(Ux)ᵀ = Uᵀxᵀ', valid: false, rule: 'l_transpose_product', why: 'La transposée d\'un produit renverse l\'ordre : (Ux)ᵀ = xᵀUᵀ. Uᵀxᵀ n\'a même pas la bonne taille.' },
      { id: 'sym', label: 'U est symétrique', valid: false, rule: 'l_sym_orth_confusion', why: 'U est orthogonale, pas symétrique.' },
    ] },
  },
  {
    id: 'spectral', points: 3, mode: 'define', statement: 'le théorème spectral',
    steps: [
      'Une matrice réelle A (n × n)',
      'est diagonalisable en base orthonormée,',
      'c\'est-à-dire A = QDQᵀ avec Q orthogonale et D diagonale,',
      'si et seulement si',
      'A est symétrique (Aᵀ = A).',
    ],
    decoys: [
      { html: 'A est orthogonale (AᵀA = I).', rule: 'l_sym_orth_confusion', why: 'Une matrice orthogonale (une rotation, par exemple) n\'a pas toujours de valeur propre réelle. Le théorème parle des matrices symétriques.' },
      { html: 'A est diagonalisable (A = PDP⁻¹).', rule: 'l_sym_needed', why: 'Diagonalisable ne suffit pas : [[1, 1], [0, 2]] est diagonalisable mais pas en base orthonormée.' },
    ],
    just: { at: 4, prompt: 'Le sens « A = QDQᵀ ⇒ A symétrique » vient de…', options: [
      { id: 'tp', label: 'Aᵀ = (QDQᵀ)ᵀ = QDᵀQᵀ = QDQᵀ = A', valid: true },
      { id: 'orth', label: 'QᵀQ = I, donc AᵀA = I', valid: false, rule: 'l_sym_orth_confusion', why: 'AᵀA = QD²Qᵀ, pas I : on confond symétrique et orthogonale.' },
      { id: 'inv', label: 'D est inversible', valid: false, why: 'D peut avoir un 0 sur la diagonale ; ce qui compte, c\'est Dᵀ = D.' },
    ] },
  },
];

const escH = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function proofItem(skill, level, rng, opts = {}) {
  const bank = skill === PM ? PROOFS_M : PROOFS_S;
  const pr = rng.pick(bank);
  const exam = opts.exam ? { format: 'open', points: pr.points ?? 4 } : false;
  const lv = exam ? 5 : level;
  const ids = pr.steps.map((_, i) => `b${i}`);
  const blocks = pr.steps.map((h, i) => ({ id: ids[i], html: escH(h), needs: i ? [ids[i - 1]] : [], earlyWhy: i ? 'Pas encore : ce bloc s\'appuie sur le bloc précédent de la preuve.' : undefined }));
  const nDecoys = lv === 1 ? 0 : lv <= 3 ? 1 : 2;
  const decoys = rng.shuffle([...pr.decoys]);
  // Level 2: the decoy of the section's own trap first (circular, or the
  // symmetric/orthogonal confusion).
  const own = skill === PM ? 'l_proof_circular' : 'l_sym_orth_confusion';
  if (lv <= 3) decoys.sort((a, b) => (b.rule === own) - (a.rule === own));
  decoys.slice(0, nDecoys).forEach((dc, i) => blocks.push({ id: `d${i}`, html: escH(dc.html), needs: [], distractor: dc.rule, why: dc.why }));
  // The hypothesis is placed at level 1 (long proofs) and in the frame (4).
  const placed = (lv === 1 && pr.steps.length > 4) || lv === 4 ? [ids[0]] : [];
  const order = ids.filter((id) => !placed.includes(id));
  const define = pr.mode === 'define';
  const decision = lv === 3 ? { prompt: pr.just.prompt, options: pr.just.options } : null;
  return blocksItem({
    skill, level: lv, mode: define ? 'define' : lv === 4 ? 'frame' : 'order',
    prompt: define
      ? `Construis l'énoncé de ${escH(pr.statement)} : touche les morceaux dans l'ordre.`
      : `Montre que ${escH(pr.statement)}.${lv === 4 ? ` La première ligne est posée ; la dernière doit conclure : « ${escH(pr.steps.at(-1))} »` : ''} Touche les blocs dans l'ordre de la preuve.`,
    blocks: rng.shuffle(blocks), goal: ids.at(-1), order, placed,
    decision,
    hints: [
      { level: 1, html: skill === PM ? 'Commence par ce que tu supposes ; la dernière ligne est ce que tu veux montrer. Chaque bloc s\'appuie sur le précédent.' : 'Écris les hypothèses en formules (Aᵀ = A pour symétrique, UᵀU = I pour orthogonale, Av = λv), puis fais passer la matrice d\'un côté à l\'autre du produit scalaire : Av · w = vᵀAᵀw.'
 },
      { level: 2, html: escH(pr.steps[placed.length ? 1 : 0]) },
      { level: 3, html: pr.steps.map((s, i) => `${i + 1}. ${escH(s)}`).join('<br>') },
    ],
    noHints: lv === 5,
    solution: pr.steps.map((s) => ({ html: escH(s), note: '' })),
    subgoals: [{ id: 'blocks', label: 'enchaîner les blocs', skill }],
    key: `${pr.id}:${lv}${exam ? ':open' : ''}`, exam,
    expectedSec: 40 + 20 * pr.steps.length,
  });
}

// ======================================================================

export const GEN = {
  [PM]: (level, rng, profile, opts = {}) => proofItem(PM, level, rng, opts),
  [PS]: (level, rng, profile, opts = {}) => proofItem(PS, level, rng, opts),

  [SVD]: (level, rng, profile, opts = {}) => (opts.exam ? svdExam(rng, opts.exam) : svdItem(level, rng)),
  [SPH]: (level, rng, profile, opts = {}) => (opts.exam ? sphExam(rng, opts.exam) : sphItem(level, rng)),

  [OD]: (level, rng, profile, opts = {}) => (opts.exam ? odExam(rng, opts.exam) : odItem(level, rng)),
  [QF]: (level, rng, profile, opts = {}) => (opts.exam ? qfExam(rng, opts.exam) : qfItem(level, rng)),
};

