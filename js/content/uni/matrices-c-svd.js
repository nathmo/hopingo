// m-svd-lowrank (module M, part c, step U8): the SVD as a sum of rank-1
// terms, the best rank-k approximation, its errors, and the image of the
// sphere. Catalogue: docs/universite/L-M-algebre-lineaire.md, M,
// m-svd-lowrank.
//
// Data built backwards (the catalogue's svdReverse): A = Σ sᵢpᵢqᵢᵀ with
// whole orthogonal families (pᵢ) of ℝᵐ and (qᵢ) of ℝⁿ: σᵢ = sᵢ‖pᵢ‖‖qᵢ‖,
// uᵢ = pᵢ/‖pᵢ‖, vᵢ = qᵢ/‖qᵢ‖, σᵢ² whole, A₁ = s₁p₁q₁ᵀ whole.
// L1 A₁ and ‖A − A₁‖₂ with the SVD given; L2 the same, terms written in a
// shuffled order (which one to keep?); L3 « choose the action »: A₁, the
// two errors, the storage; L4 the SVD to redo (σ₁ and v₁ from AᵀA), then
// A₁ and the error; L5 compression: k minimal for a relative Frobenius
// error ≤ t, from the σᵢ. Exam: mcq (error; image of the sphere), tf.

import { Q } from '../../math/rational.js';
import { matLines, mcqDistinct, tfL, withCells } from './alglin-kit.js';
import { linesItem, examTag } from './kit.js';
import { q, qt, mt, vt, MLm, sub, MX, R, fq, vR, rad, blankAll, menuOf, H, isqrt } from './matrices-c-kit.js';
import { t } from '../../i18n.js';

const LR = 'm-svd-lowrank';
const SUB = [
  { id: 'svd', label: 'SVD', skill: 'l-svd-compute' },
  { id: 'rank1', label: t('terme de rang 1'), skill: 'm-rank1-proj' },
  { id: 'err', label: t('erreurs'), skill: LR },
];
const KEYS = ['calc', 'greek'];

const P2 = [[[1, 1], [1, -1]], [[1, 2], [2, -1]], [[2, 1], [1, -2]], [[3, 4], [4, -3]], [[1, 0], [0, 1]]];
const Q3 = [
  [[1, 2, 2], [2, 1, -2], [2, -2, 1]],
  [[1, 1, 0], [1, -1, 0], [0, 0, 1]],
  [[1, 1, 1], [1, -1, 0], [1, 1, -2]],
  [[1, 0, 1], [1, 0, -1], [0, 1, 0]],
  [[2, 1, 2], [1, 2, -2], [2, -2, -1]],
];
const H4 = [[1, 1, 1, 1], [1, -1, 1, -1], [1, 1, -1, -1], [1, -1, -1, 1]];

const n2 = (v) => v.reduce((s, x) => s + x * x, 0);
const outer = (u, v) => u.map((a) => v.map((b) => a * b));
const addM = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scaleM = (A, k) => A.map((r) => r.map((x) => x * k));

// A unit vector p/‖p‖ as text: (1 ; 2 ; 2)/3, (1 ; 1)/√2.
function unitR(p) {
  const N = n2(p);
  const s = isqrt(N);
  const v = R(`(${p.join(' ; ')})`);
  return s === 1 ? v : s ? `${v}/${s}` : `${v}/√${N}`;
}
// Permute and change signs of a family's coordinates.
function shuffleFam(fam, rng) {
  const n = fam[0].length;
  const perm = rng.shuffle([...Array(n).keys()]);
  const sg = perm.map(() => (rng.chance(0.3) ? -1 : 1));
  return rng.shuffle(fam.map((v) => perm.map((j, k) => v[j] * sg[k])));
}

// {A, m, n, terms: [{s, p, qv, sig2}] by σ decreasing}. shape: [m, n].
export function svdData(rng, shape, { terms: want = null, max = 12 } = {}) {
  const [m, n] = shape;
  for (let tries = 0; tries < 300; tries++) {
    const fam = (d) => (d === 2 ? rng.pick(P2) : d === 3 ? rng.pick(Q3) : H4);
    const ps = shuffleFam(fam(m), rng);
    const qs = shuffleFam(fam(n), rng);
    const r = want ?? Math.min(m, n);
    const terms = [];
    for (let i = 0; i < r; i++) {
      const s = rng.int(1, 4) * (rng.chance(0.25) ? -1 : 1);
      terms.push({ s, p: ps[i], qv: qs[i], sig2: s * s * n2(ps[i]) * n2(qs[i]) });
    }
    terms.sort((a, b) => b.sig2 - a.sig2);
    if (terms.some((x, i) => i && x.sig2 === terms[i - 1].sig2)) continue;
    // σᵢ > 0: the sign of s goes into pᵢ.
    for (const x of terms) if (x.s < 0) { x.s = -x.s; x.p = x.p.map((v) => -v); }
    let A = Array.from({ length: m }, () => Array(n).fill(0));
    for (const x of terms) A = addM(A, scaleM(outer(x.p, x.qv), x.s));
    if (A.flat().some((v) => Math.abs(v) > max) || A.flat().filter((v) => v === 0).length > (m * n) / 2) continue;
    return { A, Aq: MX.mat(A), m, n, terms, A1: scaleM(outer(terms[0].p, terms[0].qv), terms[0].s) };
  }
  const terms = [{ s: 2, p: [1, 1], qv: [1, 2, 2], sig2: 72 }, { s: 1, p: [1, -1], qv: [2, 1, -2], sig2: 18 }];
  const A = [[4, 5, 2], [0, 3, 6]];
  return { A, Aq: MX.mat(A), m: 2, n: 3, terms, A1: [[2, 4, 4], [2, 4, 4]], fallback: true };
}

const sigR = (x) => radR2(x.sig2);
const radR2 = (s2) => R(rad(q(s2)));
const termsR = (d, order = null) => (order ?? d.terms.map((_, i) => i)).map((i) => {
  const x = d.terms[i];
  return `σ${sub(i + 1)} = ${sigR(x)}, u${sub(i + 1)} = ${unitR(x.p)}, v${sub(i + 1)} = ${unitR(x.qv)}`;
}).join(' ; ');
const lrCfg = (d, k) => ({ s2: d.terms.map((x) => String(x.sig2)), k });
const errF2 = (d, k) => d.terms.slice(k).reduce((s, x) => s + x.sig2, 0);

const MENU = [
  { id: 'first', label: t('Former A₁ = σ₁u₁v₁ᵀ'), why: t('A₁ est déjà écrite.') },
  { id: 'err2', label: t('Erreur en norme 2'), why: t('Il faut d\'abord A₁, ou cette erreur est déjà donnée.') },
  { id: 'errF', label: t('Erreur de Frobenius'), why: t('Pas maintenant.') },
  { id: 'store', label: t('Coût de stockage'), why: t('Pas maintenant.') },
];

function a1Seg(d, { guided = false, menu = false } = {}) {
  const x = d.terms[0];
  const line = { kind: 'eq', math: mt(d.A1), note: `σ₁u₁v₁ᵀ = ${sigR(x)}·${unitR(x.p)}·${unitR(x.qv)}ᵀ`, subgoal: 'rank1' };
  return [
    { kind: 'segment', html: t('A₁ = σ₁u₁v₁ᵀ, la meilleure approximation de rang 1.'), ask: 'A₁ =', start: { math: 'A_1' }, judge: { kind: 'mat', expect: mt(d.A1), ...(menu ? { menu: menuOf(MENU, 'first') } : {}) } },
    guided ? withCells(line, [[0, 0], [d.m - 1, d.n - 1]]) : line,
  ];
}
function err2Seg(d, { guided = false, menu = false, k = 1 } = {}) {
  const v = rad(q(d.terms[k].sig2));
  const line = { kind: 'eq', math: v, note: t('Le plus grand terme jeté : σ{k}', { k: sub(k + 1) }), subgoal: 'err' };
  return [
    { kind: 'segment', html: t('L\'erreur ‖A − A{k}‖₂.', { k: sub(k) }), ask: `‖A − A${sub(k)}‖₂ =`, start: { math: `E_${k}` }, judge: { kind: 'value', expect: v, form: 'exact', lowrank: lrCfg(d, k), ...(menu ? { menu: menuOf(MENU, 'err2') } : {}) } },
    guided ? { ...line, ...blankAll(v) } : line,
  ];
}
function errFSeg(d, { menu = false, k = 1 } = {}) {
  const v = rad(q(errF2(d, k)));
  return [
    { kind: 'segment', html: t('L\'erreur de Frobenius ‖A − A{k}‖_F.', { k: sub(k) }), ask: `‖A − A${sub(k)}‖_F =`, start: { math: `F_${k}` }, judge: { kind: 'value', expect: v, form: 'exact', lowrank: lrCfg(d, k), ...(menu ? { menu: menuOf(MENU, 'errF') } : {}) } },
    { kind: 'eq', math: v, note: t('√({sum}) : tous les termes jetés', { sum: d.terms.slice(k).map((x) => x.sig2).join(' + ') }), subgoal: 'err' },
  ];
}

function splitFirst(script) {
  const [seg, ...rest] = script;
  return { start: seg.start.math, judge: seg.judge, script: seg.html ? [{ kind: 'note', html: seg.html }, ...rest] : rest };
}
const shapeR = (d) => `${d.m}×${d.n}`;
const pick = (rng) => rng.pick([[2, 3], [3, 2], [2, 2], [2, 3]]);

function level12(rng, level) {
  const d = svdData(rng, pick(rng));
  const order = level === 2 ? [1, 0] : [0, 1];
  const parts = [...a1Seg(d, { guided: true }), ...err2Seg(d, { guided: true })];
  if (level === 2) {
    parts.splice(1, 0, {
      kind: 'decision', prompt: t('Quel terme garde-t-on pour la meilleure approximation de rang 1 ?'), options: [
        { id: 'big', label: t('Celui de la plus grande valeur singulière, {s}', { s: sigR(d.terms[0]) }), valid: true },
        { id: 'first', label: t('Celui écrit en premier (σ = {s})', { s: sigR(d.terms[1]) }), valid: false, rule: 'm_rankk_wrong_sigma', why: t('On garde le terme de plus grande valeur singulière : jeter {s1} coûterait une erreur {s1} au lieu de {s2}.', { s1: sigR(d.terms[0]), s2: sigR(d.terms[1]) }) },
      ],
    });
  }
  const { start, judge, script } = splitFirst(parts);
  const sum = level === 2
    ? t('A = {s2}·u₂v₂ᵀ + {s1}·u₁v₁ᵀ, avec {terms}', { s2: sigR(d.terms[1]), s1: sigR(d.terms[0]), terms: termsR(d, order) })
    : t('A = σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ, avec {terms}', { terms: termsR(d) });
  return matLines({
    skill: LR, level, mode: 'guided', keys: KEYS,
    prompt: t('A = {A} a pour SVD {sum}. Donne la meilleure approximation de rang 1 de A, puis l\'erreur en norme 2.', { A: MLm(d.Aq), sum }),
    start, judge, script, subgoals: SUB, key: `${LR}:${level}:${mt(d.Aq)}`, baits: ['m_rankk_wrong_sigma'],
    hints: H(t('Garde le terme σᵢuᵢvᵢᵀ de la plus grande valeur singulière ; l\'erreur en norme 2 est la plus grande valeur singulière jetée.'),
      `A₁ = ${sigR(d.terms[0])}·${unitR(d.terms[0].p)}·${unitR(d.terms[0].qv)}ᵀ = [[□, …], …]`,
      `A₁ = ${R(mt(d.A1))}, ‖A − A₁‖₂ = ${sigR(d.terms[1])}`),
    fallback: d.fallback,
  });
}

function level3(rng) {
  const three = rng.chance(0.5);
  const d = three ? svdData(rng, [3, 3]) : svdData(rng, pick(rng));
  const k = 1;
  const store = k * (d.m + d.n + 1);
  const parts = [
    ...a1Seg(d, { menu: true }), ...err2Seg(d, { menu: true }), ...errFSeg(d, { menu: true }),
    { kind: 'segment', html: t('Combien de nombres faut-il stocker pour A₁ (σ₁, u₁ et v₁) ?'), ask: t('stockage ='), start: { math: 'N' }, judge: { kind: 'value', expect: String(store), form: 'irreducible', menu: menuOf(MENU, 'store') } },
    { kind: 'eq', math: String(store), note: t('k(m + n + 1) = 1·({m} + {n} + 1), au lieu de {mn}', { m: d.m, n: d.n, mn: d.m * d.n }), subgoal: 'err' },
  ];
  const { start, judge, script } = splitFirst(parts);
  const sum = d.terms.map((_, i) => `σ${sub(i + 1)}u${sub(i + 1)}v${sub(i + 1)}ᵀ`).join(' + ');
  return matLines({
    skill: LR, level: 3, mode: 'tap', tapActions: 'menu', keys: KEYS,
    prompt: t('A = {A} = {sum}, avec {terms}. Donne A₁, les erreurs ‖A − A₁‖₂ et ‖A − A₁‖_F, puis le coût de stockage de A₁. Choisis d\'abord chaque action.', { A: MLm(d.Aq), sum, terms: termsR(d) }),
    start, judge, script, subgoals: SUB, key: `${LR}:3:${mt(d.Aq)}`, baits: ['m_rankk_wrong_sigma'],
    hints: H(t('‖A − A₁‖₂ est le plus grand σ jeté ; ‖A − A₁‖_F est la racine de la somme des carrés des σ jetés.'),
      `‖A − A₁‖_F = √(${d.terms.slice(1).map(() => '□').join(' + ')})`,
      `‖A − A₁‖₂ = ${sigR(d.terms[1])}, ‖A − A₁‖_F = ${radR2(errF2(d, 1))}`),
    fallback: d.fallback,
  });
}

function level4(rng) {
  const d = svdData(rng, rng.pick([[2, 3], [2, 2], [3, 2]]));
  const x = d.terms[0];
  const AtA = MX.mul(MX.transpose(d.Aq), d.Aq);
  const qv = x.qv.map((v) => q(v));
  const parts = [
    { kind: 'segment', html: t('σ₁, la plus grande valeur singulière : la racine de la plus grande valeur propre de AᵀA (ou de AAᵀ, plus petite).'), ask: 'σ₁ =', start: { math: 'σ_1' }, judge: { kind: 'value', expect: rad(q(x.sig2)), form: 'exact', sigma: true } },
    { kind: 'eq', math: rad(q(x.sig2)), note: `√${x.sig2}`, subgoal: 'svd' },
    { kind: 'segment', html: t('v₁ : un vecteur propre de AᵀA pour λ = {l}.', { l: x.sig2 }), ask: 'v₁ ∝', start: { math: 'v_1' }, judge: { kind: 'eigvec', A: mt(AtA), lambda: String(x.sig2) } },
    { kind: 'eq', math: vt(qv), note: `(AᵀA − ${x.sig2}I)v = 0`, subgoal: 'svd' },
    ...a1Seg(d), ...err2Seg(d),
  ];
  parts[5] = { ...parts[5], note: t('A₁ = Av₁v₁ᵀ, avec v₁ = {v}', { v: unitR(x.qv) }) };
  const { start, judge, script } = splitFirst(parts);
  return matLines({
    skill: LR, level: 4, mode: 'free', keys: KEYS,
    prompt: t('A = {A}. Trouve σ₁ et v₁, puis la meilleure approximation de rang 1, A₁ = σ₁u₁v₁ᵀ = Av₁v₁ᵀ, et l\'erreur ‖A − A₁‖₂.', { A: MLm(d.Aq) }),
    start, judge, script, subgoals: SUB, key: `${LR}:4:${mt(d.Aq)}`, baits: ['l_svd_sigma_is_eig', 'm_rankk_wrong_sigma'],
    hints: H(t('AᵀA = {m} : ses valeurs propres sont les σᵢ² (et des 0).', { m: R(mt(AtA)) }),
      t('σ₁ = √□ ; A₁ = A·v₁v₁ᵀ avec v₁ unitaire'),
      t('σ₁ = {s1}, v₁ = {v}, A₁ = {A1}, erreur {err}', { s1: sigR(x), v: unitR(x.qv), A1: R(mt(d.A1)), err: sigR(d.terms[1]) })),
    fallback: d.fallback,
  });
}

// L5: k minimal for ‖A − A_k‖_F / ‖A‖_F ≤ t, from the σᵢ of a 4 × 4.
function level5(rng) {
  for (let tries = 0; tries < 300; tries++) {
    const s = rng.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4).sort((a, b) => b - a);
    const sig2 = s.map((x) => 16 * x * x); // ‖pᵢ‖ = ‖qᵢ‖ = 2
    const total = sig2.reduce((a, b) => a + b, 0);
    const tt = rng.pick([0.1, 0.2, 0.3]);
    let k = null;
    let ok = true;
    for (let j = 0; j <= 4; j++) {
      const rel = sig2.slice(j).reduce((a, b) => a + b, 0) / total;
      if (Math.abs(rel - tt * tt) < 0.004) ok = false;
      if (k === null && rel <= tt * tt) k = j;
    }
    if (!ok || k === null || k === 0 || k === 4) continue;
    const sig = sig2.map((x) => rad(q(x)));
    const err2 = sig[k];
    const tPct = `${Math.round(tt * 100)} %`;
    const d = { terms: sig2.map((x) => ({ sig2: x })) };
    const script = [
      { kind: 'eq', math: String(total), note: 'Σσᵢ²', subgoal: 'err' },
      { kind: 'segment', html: t('k minimal pour ‖A − A<sub>k</sub>‖_F ≤ {pct} de ‖A‖_F.', { pct: tPct }), ask: 'k =', start: { math: 'k' }, judge: { kind: 'value', expect: String(k), form: 'irreducible' } },
      { kind: 'eq', math: String(k), note: `Σ_{i>k} σᵢ² ≤ ${String(Math.round(tt * tt * 1e6) / 1e6).replace('.', ',')}·${total} = ${String(Math.round(tt * tt * total * 100) / 100).replace('.', ',')}`, subgoal: 'err' },
      { kind: 'segment', html: t('L\'erreur ‖A − A<sub>{k}</sub>‖₂ pour ce k.', { k }), ask: `‖A − A${sub(k)}‖₂ =`, start: { math: `E_${k}` }, judge: { kind: 'value', expect: err2, form: 'exact', lowrank: lrCfg(d, k) } },
      { kind: 'eq', math: err2, note: `σ${sub(k + 1)}`, subgoal: 'err' },
    ];
    return linesItem({
      skill: LR, level: 5, mode: 'free', keys: KEYS, noHints: true,
      prompt: t('Une image 4 × 4 a les valeurs singulières {sig}. On veut la compresser par A<sub>k</sub> avec une erreur relative de Frobenius ‖A − A<sub>k</sub>‖_F/‖A‖_F ≤ {pct}. Donne ‖A‖_F², le plus petit k, puis ‖A − A<sub>k</sub>‖₂.', { sig: sig.map((v) => R(v)).join(', '), pct: tPct }),
      start: 'N', judge: { kind: 'value', expect: String(total), form: 'irreducible' }, script: [{ kind: 'note', html: '‖A‖_F² :' }, ...script],
      subgoals: SUB, key: `${LR}:5:${s.join(',')}:${tt}`, baits: ['m_rankk_wrong_sigma'],
    });
  }
  return { ...level3(rng), level: 5, mode: 'free', noHints: true, hints: [], fallback: true };
}

function examMcq(rng, exam) {
  if (rng.chance(0.65)) {
    const d = svdData(rng, rng.chance(0.5) ? [3, 3] : pick(rng));
    const [s1, s2] = d.terms;
    const fro = errF2(d, 1);
    return mcqDistinct({
      skill: LR, level: 4, key: `mcq:err:${mt(d.Aq)}`, exam: examTag({ exam }),
      prompt: t('A = {A} a les valeurs singulières {sig}. Que vaut ‖A − A₁‖₂, où A₁ est la meilleure approximation de rang 1 de A ?', { A: MLm(d.Aq), sig: d.terms.map(sigR).join(', ') }),
      right: sigR(s2),
      wrongs: [{ html: sigR(s1), rule: 'm_rankk_wrong_sigma' }, { html: R(String(s2.sig2)), rule: 'l_svd_sigma_is_eig' }, fro !== s2.sig2 ? { html: radR2(fro) } : null].filter(Boolean),
      fillers: [{ html: radR2(s1.sig2 - s2.sig2) }, { html: '0' }, { html: radR2(s1.sig2 + s2.sig2) }],
      solution: [{ html: t('A − A₁ = Σ_{i≥2} σᵢuᵢvᵢᵀ : sa plus grande valeur singulière est σ₂ = {s2}.', { s2: sigR(s2) }), note: '' }],
    }, rng);
  }
  // The image of the unit sphere.
  const wide = rng.chance(0.5);
  const d = svdData(rng, wide ? [2, 3] : [3, 2]);
  const [s1, s2] = d.terms.map(sigR);
  const right = wide ? t('L\'ellipse pleine (intérieur compris) de demi-axes {s1} et {s2}', { s1, s2 }) : t('Une ellipse (la courbe seule), de demi-axes {s1} et {s2}, dans un plan de ℝ³', { s1, s2 });
  const other = wide ? t('Le bord de l\'ellipse de demi-axes {s1} et {s2}, seulement', { s1, s2 }) : t('L\'ellipse pleine de demi-axes {s1} et {s2}, dans un plan de ℝ³', { s1, s2 });
  return mcqDistinct({
    skill: LR, level: 4, key: `mcq:sphere:${mt(d.Aq)}`, exam: examTag({ exam }),
    prompt: wide
      ? t('A = {A} (valeurs singulières {s1} et {s2}). Quelle est l\'image par A de la sphère unité de ℝ³ ?', { A: MLm(d.Aq), s1, s2 })
      : t('A = {A} (valeurs singulières {s1} et {s2}). Quelle est l\'image par A de la sphère unité de ℝ² ?', { A: MLm(d.Aq), s1, s2 }),
    right,
    wrongs: [{ html: other, rule: 'l_svd_sphere_boundary' }, { html: t('Un cercle de rayon {s1}', { s1 }) }, { html: wide ? t('Un ellipsoïde de ℝ³ de demi-axes {s1}, {s2} et 0', { s1, s2 }) : t('Un ellipsoïde de ℝ³ de demi-axes {s1}, {s2} et 1', { s1, s2 }) }],
    solution: [{ html: wide ? t('A écrase une direction de ℝ³ (son noyau) : des points de la sphère vont à l\'intérieur, l\'image est l\'ellipse pleine.') : t('A est injective : chaque point du cercle va sur le bord de l\'ellipse, l\'image est la courbe seule.'), note: '' }],
  }, rng);
}

function examTf(rng) {
  const exam = { format: 'tf', points: 1 };
  const k = rng.int(0, 3);
  if (k === 0) return tfL({ skill: LR, key: 'norm2', truth: true, exam, statement: t('‖A‖₂ = σ₁, la plus grande valeur singulière de A.'), explanation: t('Vrai : ‖Ax‖ = ‖ΣVᵀx‖ ≤ σ₁‖x‖, avec égalité en x = v₁.') });
  if (k === 1) return tfL({ skill: LR, key: 'frob', truth: true, exam, statement: '‖A‖_F² = Σ aᵢⱼ² = Σ σᵢ².', explanation: t('Vrai : ‖A‖_F² = tr(AᵀA), la somme des valeurs propres de AᵀA, qui sont les σᵢ².') });
  if (k === 2) {
    return tfL({
      skill: LR, key: 'zeroing', truth: false, exam,
      statement: t('La meilleure approximation de rang 1 d\'une matrice 2 × 2 s\'obtient en gardant sa case de plus grand module et en mettant les autres à 0.'),
      counter: { kind: 'mx', prop: 'lowRankNotZeroing', params: {}, ask: [{ v: 'A', label: 'A =', shape: [2, 2] }], answer: { A: '[[2,1],[1,1]]' } },
      explanation: t('Faux : A_k garde les k plus grands termes σᵢuᵢvᵢᵀ, pas les plus grandes cases. Pour [[2, 1], [1, 1]], garder le 2 laisse une erreur ‖·‖₂ ≈ 1,62 > σ₂ ≈ 0,38.'),
    });
  }
  return tfL({
    skill: LR, key: 'frob-sigma', truth: false, exam, ruleIfTrue: 'm_rankk_wrong_sigma',
    statement: t('Pour toute matrice A, ‖A − A₁‖_F = σ₂.'),
    counter: { kind: 'mx', prop: 'frobNotSigma', params: {}, ask: [{ v: 'A', label: 'A =', shape: [3, 3] }], answer: { A: '[[3,0,0],[0,2,0],[0,0,1]]' } },
    explanation: t('Faux : ‖A − A₁‖_F = √(σ₂² + σ₃² + …). Pour diag(3, 2, 1), c\'est √5 et non 2. C\'est ‖A − A₁‖₂ qui vaut σ₂.'),
  });
}

export function genLowRank(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return examMcq(rng, 'mcq');
  if (opts.exam === 'tf') return examTf(rng);
  if (level <= 2) return level12(rng, level);
  if (level === 3) return level3(rng);
  if (level === 4) return level4(rng);
  return level5(rng);
}
