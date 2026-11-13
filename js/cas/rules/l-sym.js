// Traps of module L, section « sym » (symmetric matrices, quadratic forms,
// SVD, short proofs; see js/cas/rules/l.js). DEFS: {id: {name, judges,
// transform?, wrongValues?, explain?, check}}.
//
// The factorisation traps (judge `factor`) rebuild the factor a student
// who makes the mistake writes, from cfg.A alone (exact eigen-structure of
// a symmetric matrix: symEigen), or from the factor given on the previous
// line (V before U). A student may order the columns and choose their
// signs freely: every order (n ≤ 3) and every sign is a candidate.
// The other traps are offered by the items as baits (true/false, options,
// decoy blocks).
//
// The helpers (symEigen, primitive, the texts of unit vectors and of
// orthogonal matrices with roots) serve js/content/uni/alglin-sym.js too.

import * as MX from '../matrix.js';
import { Q } from '../../math/rational.js';
import { parse } from '../parse.js';
import { toText } from '../print.js';
import { evalFloat } from '../numeric.js';
import { parseExpr, evalAst, toQ, Mx, fromQ, radicalNode } from '../matexpr.js';
import { t } from '../../i18n.js';

// ---------- exact helpers ----------

const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
export const isqrt = (n) => { const r = Math.round(Math.sqrt(n)); return r * r === n ? r : null; };

// The whole multiple of v with coprime entries, first non-zero entry > 0.
export function primitive(v) {
  const L = v.reduce((l, x) => (l * x.d) / gcd(l, x.d), 1);
  let ints = v.map((x) => (x.n * L) / x.d);
  const g = ints.reduce((s, x) => gcd(s, x), 0) || 1;
  ints = ints.map((x) => x / g);
  const first = ints.find((x) => x !== 0) ?? 1;
  return ints.map((x) => q(first < 0 ? -x : x));
}

// Eigen-structure of a symmetric rational matrix, eigenvalues increasing:
// [{lambda, mult, basis (kernel basis of A − λI, whole), orth (the same
// space after Gram-Schmidt, whole)}], or null if an eigenvalue is not
// rational.
export function symEigen(A) {
  const { roots, rest } = MX.rationalEigen(A);
  if (rest.length > 1) return null;
  return [...roots].sort((a, b) => a.value.cmp(b.value)).map(({ value, mult }) => {
    const S = A.map((r, i) => r.map((x, j) => (i === j ? x.sub(value) : x)));
    const basis = MX.kernel(S).map(primitive);
    const orth = basis.length > 1 ? MX.transpose(MX.qrGS(MX.fromCols(basis)).V).map(primitive) : basis;
    return { lambda: value, mult, basis, orth };
  });
}

// ---------- texts ----------

const qt = (x) => String(q(x));
const squareFree = (N) => {
  let s = 1;
  let m = N;
  for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; s *= f; }
  return [s, m];
};
// a/√N written simply: N = s²m, a/s reduced → 2/√8 = 1/√2, 3/√9 = 1.
export function entryText(a, N) {
  const aq = q(a);
  if (aq.n === 0) return '0';
  const [s, m] = squareFree(N);
  const c = aq.div(s);
  if (m === 1) return qt(c);
  return c.d === 1 ? `${c.n}/√${m}` : `${c.n}/(${c.d}√${m})`;
}
// v/‖v‖ as a vector text: (1/√2 ; -1/√2 ; 0).
export function unitText(v) {
  const N = MX.dot(v, v).valueOf();
  return `(${v.map((x) => entryText(x, N)).join(' ; ')})`;
}
// √N simplified: 6√2, 3, √5.
export function rootText(N) {
  const [s, m] = squareFree(N);
  if (m === 1) return String(s);
  return `${s === 1 ? '' : s}√${m}`;
}
// The matrix whose columns are the cols normalised: (1/5)·[[3,4],[4,-3]],
// (1/√2)·[[1,1],[1,-1]], or entry by entry when the norms differ.
export function orthText(cols) {
  const N = cols.map((c) => MX.dot(c, c).valueOf());
  const rows = cols[0].map((_, i) => cols.map((c) => c[i]));
  if (N.every((x) => x === N[0])) {
    const r = isqrt(N[0]);
    const pre = r === 1 ? '' : r ? `(1/${r})·` : `(1/√${N[0]})·`;
    return `${pre}[${rows.map((row) => `[${row.map(qt).join(',')}]`).join(',')}]`;
  }
  return `[${rows.map((row) => `[${row.map((x, j) => entryText(x, N[j])).join(',')}]`).join(',')}]`;
}

// ---------- candidates ----------

const mline = (name, value) => ({ t: 'mline', ops: [], assigns: [{ name, value }], label: null, body: null, value });
const permsOf = (xs) => (xs.length <= 1 ? [xs] : xs.flatMap((x, i) => permsOf([...xs.slice(0, i), ...xs.slice(i + 1)]).map((p) => [x, ...p])));
// Every order of the columns (n ≤ 3, else as given) and every sign.
// Columns are arrays of Q or of numbers.
const negOf = (x) => (typeof x === 'number' ? -x : x.neg());
function variants(cols) {
  const orders = cols.length <= 3 ? permsOf(cols) : [cols];
  const out = [];
  for (const o of orders) {
    for (let s = 0; s < 2 ** o.length; s++) out.push(o.map((c, j) => ((s >> j) & 1 ? c.map(negOf) : c)));
  }
  return out;
}
const valueOfText = (text) => evalAst(parseExpr(text, { vars: [] }), {}, { vars: [] });
const matQ = (text) => { try { return toQ(valueOfText(text)); } catch { return null; } };
// Floats as nodes (a/√k when they are one, else a float node).
const fnode = (x) => radicalNode(x) ?? { t: 'float', x };
const fvalue = (F) => Mx(F.map((r) => r.map(fnode)));
const unitF = (c) => { const n = Math.sqrt(c.reduce((s, x) => s + x.valueOf() ** 2, 0)); return c.map((x) => x.valueOf() / n); };
// Columns → rows.
const colsF = (cols) => cols[0].map((_, i) => cols.map((c) => c[i]));
const floatsOf = (v) => v.rows.map((r) => r.map((x) => evalFloat(x, {})));

// The eigen-structure behind a factor: A (orthodiag), AᵀA (V), AAᵀ (U);
// eigenvalues in the order of the factor (increasing for Q, decreasing
// for V and U).
function eigenOf(cfg) {
  const A = matQ(cfg.A);
  if (!A) return null;
  if (cfg.of === 'orthodiag' && cfg._name === 'Q') return symEigen(A);
  if (cfg.of === 'SVD' && (cfg._name === 'V' || cfg._name === 'U')) {
    const M = cfg._name === 'V' ? MX.mul(MX.transpose(A), A) : MX.mul(A, MX.transpose(A));
    const e = symEigen(M);
    return e ? e.reverse() : null;
  }
  return null;
}

const T = (s) => String(s).replace(/-/g, '−');
const vtR = (v) => T(`(${v.map(qt).join(' ; ')})`);
const numR = (x) => { const n = radicalNode(x); return T(n ? toText(n) : String(Math.round(x * 1000) / 1000).replace('.', ',')); };
const vecR = (F) => `(${F.map(numR).join(' ; ')})`;
const SUBS = '₀₁₂₃₄₅₆₇₈₉';
const SUPS = '⁰¹²³⁴⁵⁶⁷⁸⁹';

// ---------- the traps ----------

export const DEFS = {
  l_orthodiag_no_normalize: {
    name: t('Colonnes de Q non normalisées'),
    judges: ['factor'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      const E = cfg ? eigenOf(cfg) : null;
      if (!E) return [];
      const cols = E.flatMap((e) => e.orth);
      const A = matQ(cfg.A);
      if (cfg.of === 'SVD' && cols.length !== (cfg._name === 'V' ? A[0].length : A.length)) return [];
      const long = cols.find((c) => !MX.dot(c, c).eq(1));
      if (!long) return [];
      const c = { v: vtR(long), n: T(rootText(MX.dot(long, long).valueOf())), name: cfg._name };
      return variants(cols).map((cs) => ({ node: mline(cfg._name, fromQ(MX.fromCols(cs))), ctx: c }));
    },
    explain: (ctx = {}) => (ctx.v
      ? t('{name} doit être orthogonale : ses colonnes doivent être de norme 1. Ici {v} a pour norme {n} : divise-le par {n}.', { name: ctx.name ?? 'Q', v: ctx.v, n: ctx.n })
      : t('Q doit être orthogonale : ses colonnes doivent être de norme 1. Divise chaque vecteur propre par sa norme, par exemple (3 ; 4) par 5.')),
    check: { judge: { kind: 'factor', A: '[[11,-12],[-12,4]]', of: 'orthodiag' }, prev: 'A = QDQᵀ', line: 'Q = [[3,4],[4,-3]]' },
  },
  l_orthodiag_no_gs: {
    name: t('Espace propre de dimension 2 sans Gram-Schmidt'),
    judges: ['factor'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (cfg?.of !== 'orthodiag') return [];
      const E = eigenOf(cfg);
      if (!E) return [];
      const big = E.find((e) => e.basis.length > 1 && e.basis.some((u, i) => e.basis.some((v, j) => j > i && MX.dot(u, v).n !== 0)));
      if (!big) return [];
      const cols = E.flatMap((e) => (e.basis.length > 1 ? e.basis : e.orth)).map(unitF);
      const [u, v] = big.basis;
      const c = { u: vtR(u), v: vtR(v), d: T(qt(MX.dot(u, v))) };
      return variants(cols).map((cs) => ({ node: mline('Q', fvalue(colsF(cs))), ctx: c }));
    },
    explain: (ctx = {}) => (ctx.u
      ? t('Deux vecteurs du même espace propre ne sont pas forcément orthogonaux : {u} · {v} = {d}. Applique Gram-Schmidt dans l\'espace propre, puis normalise.', { u: ctx.u, v: ctx.v, d: ctx.d })
      : t('Deux vecteurs du même espace propre ne sont pas forcément orthogonaux : (1 ; −1 ; 0) · (1 ; 0 ; −1) = 1. Applique Gram-Schmidt dans l\'espace propre.')),
    check: { judge: { kind: 'factor', A: '[[1,2,2],[2,1,2],[2,2,1]]', of: 'orthodiag' }, prev: 'A = QDQᵀ', line: 'Q = [[1/√2,1/√2,1/√3],[-1/√2,0,1/√3],[0,-1/√2,1/√3]]' },
  },
  l_sym_needed: {
    name: t('Matrice non symétrique dite orthodiagonalisable'),
    judges: [],
    explain: (ctx = {}) => (ctx.a
      ? t('Orthodiagonalisable ⇔ symétrique : ici a₁₂ = {a} ≠ a₂₁ = {b}.', { a: ctx.a, b: ctx.b })
      : t('Orthodiagonalisable ⇔ symétrique : si A = QDQᵀ, alors Aᵀ = QDᵀQᵀ = A. Une matrice non symétrique peut être diagonalisable, mais jamais en base orthonormée.')),
    check: { bait: { skill: 'l-sym-orthodiag', exam: 'tf' } },
  },
  l_quadform_offdiag: {
    name: t('Coefficient entier de xᵢxⱼ hors de la diagonale'),
    judges: ['mat'],
    // cfg.quadform: the line is the matrix of a quadratic form, cfg.expect.
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (!cfg?.quadform || cfg.expect === undefined) return [];
      const A = matQ(cfg.expect);
      if (!A || !MX.isSymmetric(A)) return [];
      const B = A.map((r, i) => r.map((x, j) => (i === j ? x : x.mul(2))));
      const k = A.findIndex((r, i) => r.some((x, j) => j !== i && x.n !== 0));
      if (k < 0) return [];
      const l = A[k].findIndex((x, j) => j !== k && x.n !== 0);
      return [{ node: { t: 'mline', ops: [], assigns: [], label: null, body: null, value: fromQ(B) }, ctx: { c: T(qt(B[k][l])), h: T(qt(A[k][l])), i: k + 1, j: l + 1 } }];
    },
    explain: (ctx = {}) => (ctx.c
      ? t('xᵀAx contient {terms} : chaque case reçoit la moitié du coefficient du terme croisé, {c}/2 = {h}.', { terms: `a${SUBS[ctx.i]}${SUBS[ctx.j]}·x${SUBS[ctx.i]}x${SUBS[ctx.j]} + a${SUBS[ctx.j]}${SUBS[ctx.i]}·x${SUBS[ctx.j]}x${SUBS[ctx.i]}`, c: ctx.c, h: ctx.h })
      : t('xᵀAx contient aᵢⱼxᵢxⱼ + aⱼᵢxⱼxᵢ = 2aᵢⱼxᵢxⱼ : chaque case hors de la diagonale reçoit la moitié du coefficient de xᵢxⱼ.')),
    check: { judge: { kind: 'mat', expect: '[[1,5],[5,1]]', quadform: true }, prev: 'A', line: '[[1,10],[10,1]]' },
  },
  l_posdef_diag: {
    name: t('Diagonale positive prise pour « définie positive »'),
    judges: [],
    explain: () => t('Une diagonale positive ne suffit pas. Contre-exemple : [[1, 2], [2, 1]] a une diagonale positive mais la valeur propre −1 : Q(1, −1) = −2. Il faut que toutes les valeurs propres soient > 0.'),
    check: { bait: { skill: 'l-sym-quadform', exam: 'tf' } },
  },
  l_svd_sigma_is_eig: {
    name: t('Valeur singulière prise égale à λᵢ'),
    judges: ['value', 'factor'],
    // value: cfg.sigma marks the lines « σᵢ = … » (cfg.expect is σᵢ);
    // factor: Σ with the eigenvalues of AᵀA on its diagonal.
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (!cfg) return [];
      if (cfg.kind !== 'factor') {
        if (!cfg.sigma || cfg.expect === undefined) return [];
        const l = evalFloat(parse(String(cfg.expect)), {}) ** 2;
        return [{ node: parse(`(${cfg.expect})^2`), ctx: { l: numR(l), s: T(String(cfg.expect)) } }];
      }
      if (cfg.of !== 'SVD' || cfg._name !== 'Σ') return [];
      const A = matQ(cfg.A);
      if (!A) return [];
      const [m, n] = [A.length, A[0].length];
      const M = m <= n ? MX.mul(A, MX.transpose(A)) : MX.mul(MX.transpose(A), A);
      const { roots, rest } = MX.rationalEigen(M);
      if (rest.length > 1) return [];
      const lams = roots.flatMap((r) => Array(r.mult).fill(r.value)).sort((a, b) => b.cmp(a));
      const S = MX.zeros(m, n);
      lams.forEach((l, i) => { S[i][i] = l; });
      return [{ node: mline('Σ', fromQ(S)), ctx: { l: T(qt(lams[0])), s: T(rootText(lams[0].valueOf())) } }];
    },
    explain: (ctx = {}) => (ctx.l
      ? t('Les valeurs singulières sont les <b>racines</b> des valeurs propres de AᵀA : σ = √{l} = {s}, pas {l}.', { l: ctx.l, s: ctx.s })
      : t('Les valeurs singulières sont les <b>racines</b> des valeurs propres de AᵀA : σᵢ = √λᵢ.')),
    check: { judge: { kind: 'value', expect: '6√2', form: 'exact', sigma: true }, prev: 'σ_1', line: '72' },
  },
  l_svd_no_sigma: {
    name: t('uᵢ = Avᵢ sans diviser par σᵢ'),
    judges: ['factor'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (cfg?.of !== 'SVD' || cfg._name !== 'U') return [];
      const A = matQ(cfg.A);
      if (!A) return [];
      const [m, n] = [A.length, A[0].length];
      if (m > n) return [];
      // V: the one of the previous line, else the eigenvectors of AᵀA.
      const given = prev?.assigns?.find((a) => a.name === 'V')?.value;
      let Vs;
      if (given?.k === 'm' && given.rows.length === n) Vs = [floatsOf(given)];
      else {
        const E = symEigen(MX.mul(MX.transpose(A), A));
        if (!E) return [];
        const cols = E.reverse().flatMap((e) => e.orth).map(unitF);
        Vs = variants(cols.slice(0, m)).map(colsF);
      }
      const Af = MX.toNumbers(A);
      return Vs.map((V) => {
        const U = Af.map((r) => Array.from({ length: m }, (_, j) => r.reduce((s, x, k) => s + x * V[k][j], 0)));
        const c0 = U.map((r) => r[0]);
        return { node: mline('U', fvalue(U)), ctx: { s: numR(Math.sqrt(c0.reduce((s, x) => s + x * x, 0))), u: vecR(c0) } };
      });
    },
    explain: (ctx = {}) => (ctx.s
      ? t('‖Av₁‖ = σ₁ = {s} : il faut diviser Av₁ = {u} par σ₁ pour obtenir un vecteur unitaire, uᵢ = Avᵢ/σᵢ.', { s: ctx.s, u: ctx.u })
      : t('‖Avᵢ‖ = σᵢ : il faut diviser Avᵢ par σᵢ pour obtenir un vecteur unitaire, uᵢ = Avᵢ/σᵢ.')),
    check: { judge: { kind: 'factor', A: '[[4,5,2],[0,3,6]]', of: 'SVD' }, prev: 'V = (1/3)·[[1,2,2],[2,1,-2],[2,-2,1]]', line: 'U = [[6,3],[6,-3]]' },
  },
  l_svd_uv_swap: {
    name: t('Rôles de U et de V échangés'),
    judges: ['factor'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (cfg?.of !== 'SVD' || (cfg._name !== 'V' && cfg._name !== 'U')) return [];
      const A = matQ(cfg.A);
      if (!A) return [];
      const other = cfg._name === 'V' ? 'U' : 'V';
      const M = other === 'U' ? MX.mul(A, MX.transpose(A)) : MX.mul(MX.transpose(A), A);
      const given = prev?.assigns?.find((a) => a.name === other)?.value;
      const out = [];
      if (given?.k === 'm') out.push(floatsOf(given));
      const E = symEigen(M);
      if (E) {
        const cols = E.reverse().flatMap((e) => e.orth).map(unitF);
        for (const cs of variants(cols)) out.push(colsF(cs));
      }
      const c = { name: cfg._name, n: A[0].length, m: A.length };
      return out.map((F) => ({ node: mline(cfg._name, fvalue(F)), ctx: c }));
    },
    explain: (ctx = {}) => (ctx.n
      ? t('V contient des vecteurs de ℝ{sn} (l\'espace de départ) : ce sont les vecteurs propres de AᵀA, qui est {n}×{n}. Ceux de AAᵀ ({m}×{m}) vont dans U.', { sn: SUPS[ctx.n], n: ctx.n, m: ctx.m })
      : t('V contient des vecteurs de l\'espace de départ ℝⁿ : ce sont les vecteurs propres de AᵀA (n × n). Ceux de AAᵀ vont dans U.')),
    check: { judge: { kind: 'factor', A: '[[4,5,2],[0,3,6]]', of: 'SVD' }, prev: 'A = UΣVᵀ', line: 'V = (1/√2)·[[1,1],[1,-1]]' },
  },
  l_svd_sphere_boundary: {
    name: t('Ellipse pleine ou bord seul'),
    judges: [],
    explain: (ctx = {}) => (ctx.full === false
      ? t('Ici A est injective : chaque point de la sphère va sur le bord, l\'image est une ellipse (une courbe), pas une ellipse pleine.')
      : t('A écrase une direction (son noyau) : les points de la sphère vont aussi à l\'intérieur de l\'ellipse. L\'image est l\'ellipse pleine.')),
    check: { bait: { skill: 'l-svd-sphere', exam: 'mcq' } },
  },
  l_proof_circular: {
    name: t('Preuve qui suppose sa conclusion'),
    judges: [],
    explain: () => t('Ce bloc suppose déjà ce qu\'on veut montrer : la preuve tourne en rond. Une preuve part des hypothèses et arrive à la conclusion.'),
    check: { bait: { skill: 'l-proof-matrices', level: 2 } },
  },
  l_sym_orth_confusion: {
    name: t('Symétrique et orthogonale confondues'),
    judges: [],
    explain: () => t('Symétrique veut dire Aᵀ = A, pas AᵀA = I (ça, c\'est orthogonale). Les deux propriétés ne se remplacent pas l\'une l\'autre.'),
    check: { bait: { skill: 'l-proof-spectral', level: 2 } },
  },
};
