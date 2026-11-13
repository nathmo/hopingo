// Traps of module M, part b (Cholesky, quadratic forms, normal equations,
// Rayleigh; see js/cas/rules/m.js). DEFS: {id: {name, judges, transform?,
// explain?, check}}.
//
// The generators of js/content/uni/matrices-b-*.js put in the judge's cfg
// what the traps need:
//   value  cfg.chol = {A: '[[…]]', i, j}      the line is ℓᵢⱼ of A = LLᵀ (0-based)
//   mat    cfg.qgrad = {A: '[[…]]', b: ['3', '5'], M?: '[[…]]'}
//                                             the line is ∇f of f = ½xᵀAx − bᵀx + c,
//                                             or of f = xᵀMx − bᵀx + c (M not symmetric)
//   value  cfg.nvar = {s2: '7/6', d: '10', j}   the line is Var̂(β̂ⱼ) = σ̂²·((XᵀX)⁻¹)ⱼⱼ,
//                                             d = (XᵀX)ⱼⱼ
//   value  cfg.rayleigh = {num: '19', den: '5'} the line is R(x) = xᵀAx / xᵀx

import { Q } from '../../math/rational.js';
import * as MX from '../matrix.js';
import { parse } from '../parse.js';
import { lit } from '../ast.js';
import { buildLine } from '../../judges/matcommon.js';
import { t } from '../../i18n.js';

const q = (x) => (x instanceof Q ? x : MX.q(String(x)));
const fr = (x) => String(x).replace(/-/g, '−');
const matQ = (t) => {
  try {
    const rows = JSON.parse(String(t).replace(/\s/g, '').replace(/(-?\d+\/\d+)/g, '"$1"'));
    return rows.map((r) => r.map((x) => q(String(x))));
  } catch { return null; }
};
const SUBS = '₀₁₂₃₄₅₆₇₈₉';
const ij = (i, j) => `${SUBS[i + 1]}${SUBS[j + 1]}`;

// The column-by-column Cholesky of A, exact, columns 0 … upto (null if a
// pivot is not the square of a rational).
function cholQ(A, upto = A.length - 1) {
  const n = A.length;
  const L = MX.zeros(n, n);
  for (let k = 0; k <= upto; k++) {
    let d = A[k][k];
    for (let j = 0; j < k; j++) d = d.sub(L[k][j].mul(L[k][j]));
    const r = sqrtQ(d);
    if (!r) return null;
    L[k][k] = r;
    for (let i = k + 1; i < n; i++) {
      let s = A[i][k];
      for (let j = 0; j < k; j++) s = s.sub(L[i][j].mul(L[k][j]));
      L[i][k] = s.div(r);
    }
  }
  return L;
}
function sqrtQ(x) {
  if (x.n <= 0) return null;
  const a = Math.round(Math.sqrt(x.n));
  const b = Math.round(Math.sqrt(x.d));
  return a * a === x.n && b * b === x.d ? new Q(a, b) : null;
}

// The two sums of the step ℓᵢₖ: what is left before the root or the
// division, written with the right sign and with the wrong one.
function cholStep(cfg) {
  const c = cfg?.chol;
  if (!c) return null;
  const A = matQ(c.A);
  const { i, j } = c;
  const L = A && cholQ(A, j);
  if (!L) return null;
  let s = q(0);
  for (let k = 0; k < j; k++) s = s.add(L[i][k].mul(L[j][k]));
  return { A, L, i, j, s, a: A[i][j] };
}

// ∇f with a wrong factor: for f = ½xᵀAx − bᵀx, k·Ax − b; for f = xᵀMx − bᵀx,
// 2Mx − b. Texts of vectors of polynomials in x, y, z.
const VARS = ['x', 'y', 'z'];
function linText(row, c) {
  let s = '';
  row.forEach((a, k) => {
    if (a.n === 0) return;
    const abs = a.n < 0 ? a.neg() : a;
    const coef = abs.eq(1) ? '' : abs.d === 1 ? String(abs) : `(${abs})`;
    s += `${a.n < 0 ? '-' : s ? '+' : ''}${coef}${VARS[k]}`;
  });
  if (c.n !== 0) s += `${c.n < 0 ? '-' : s ? '+' : ''}${c.n < 0 ? c.neg() : c}`;
  return s || '0';
}
export function gradText(M, b, k = 1) {
  return `(${M.map((r, i) => linText(r.map((x) => x.mul(q(k))), q(b[i]).neg())).join(' ; ')})`;
}

const valueNode = (x) => lit(q(x));

export const DEFS = {
  m_chol_no_sqrt: {
    name: t('Diagonale de L sans la racine'),
    judges: ['value'],
    transform(prev, ctx) {
      const st = cholStep(ctx?.cfg);
      if (!st) return [];
      const { L, i, j, s, a } = st;
      if (i === j) {
        const v = a.sub(s);
        return v.eq(L[i][i]) ? [] : [{ node: valueNode(v), ctx: { '…': fr(v), d: fr(v), ij: ij(i, i) } }];
      }
      // Off the diagonal: divided by the pivot squared (the pivot written without its root).
      const d = L[j][j].mul(L[j][j]);
      if (d.eq(L[j][j])) return [];
      const v = a.sub(s).div(d);
      return [{ node: valueNode(v), ctx: { '…': fr(L[j][j]), d: fr(d), ij: ij(j, j), off: true } }];
    },
    explain: (ctx = {}) => (ctx.d
      ? (ctx.off
        ? t('Le pivot ℓ{ij} est une racine : ℓ{ij}² = {d}, donc ℓ{ij} = √{d} = {r}. Divise par {r}, pas par {d}.', { ij: ctx.ij, d: ctx.d, r: ctx['…'] })
        : t('Sur la diagonale, ℓ{ij}² = {d} : il faut prendre la racine, ℓ{ij} = √{d}. Contrôle : (LLᵀ) redonnerait {d}² au lieu de {d}.', { ij: ctx.ij, d: ctx.d }))
      : t('Sur la diagonale, ℓₖₖ² = aₖₖ − Σ ℓₖⱼ² : il faut prendre la racine. Contrôle : (LLᵀ)ₖₖ doit redonner aₖₖ.')),
    check: { judge: { kind: 'value', expect: '3', chol: { A: '[[4,2,-2],[2,10,5],[-2,5,6]]', i: 1, j: 1 } }, prev: 'l_22', line: '9' },
  },
  m_chol_sum_sign: {
    name: t('Somme ajoutée au lieu d\'être retranchée'),
    judges: ['value'],
    transform(prev, ctx) {
      const st = cholStep(ctx?.cfg);
      if (!st || st.s.n === 0) return [];
      const { L, i, j, s, a } = st;
      if (i === j) {
        const v = a.add(s);
        const r = sqrtQ(v);
        return [{ node: r ? valueNode(r) : parse(`√(${v})`), ctx: { a: fr(a), s: fr(s), ij: ij(i, i), diag: true } }];
      }
      const v = a.add(s).div(L[j][j]);
      return [{ node: valueNode(v), ctx: { a: fr(a), s: fr(s), p: fr(L[j][j]), right: fr(L[i][j]), ij: ij(i, j) } }];
    },
    explain: (ctx = {}) => (ctx.a
      ? (ctx.diag
        ? t('ℓ{ij}² = a − Σ ℓ² : on retranche les carrés déjà connus, {a} − {s}, on ne les ajoute pas.', { ij: ctx.ij, a: ctx.a, s: ctx.s })
        : t('ℓ{ij} = (a − Σ ℓℓ)/ℓ : ici ({a} − {s})/{p} = {right}. La somme se retranche.', { ij: ctx.ij, a: ctx.a, s: ctx.s.startsWith('−') ? `(${ctx.s})` : ctx.s, p: ctx.p, right: ctx.right }))
      : t('ℓᵢₖ = (aᵢₖ − Σ ℓᵢⱼℓₖⱼ)/ℓₖₖ : la somme des produits déjà connus se retranche.')),
    check: { judge: { kind: 'value', expect: '2', chol: { A: '[[4,2,-2],[2,10,5],[-2,5,6]]', i: 2, j: 1 } }, prev: 'l_32', line: '4/3' },
  },
  m_grad_factor: {
    name: t('Facteur 2 ou ½ dans le gradient'),
    judges: ['mat'],
    transform(prev, ctx) {
      const g = ctx?.cfg?.qgrad;
      if (!g || g.M) return [];
      const A = matQ(g.A);
      if (!A) return [];
      const out = [];
      for (const [k, w] of [[2, '2Ax − b'], ['1/2', '½Ax − b']]) {
        try { out.push({ node: buildLine(ctx.cfg, gradText(A, g.b, k)), ctx: { w, first: fr(linText(A[0], q(g.b[0]).neg())) } }); } catch { /* skip */ }
      }
      return out;
    },
    explain: (ctx = {}) => (ctx.w
      ? t('∇(xᵀAx) = 2Ax pour A symétrique ; le ½ devant le compense : ∇(½xᵀAx − bᵀx) = Ax − b, pas {w}.', { w: ctx.w })
      : t('∇(xᵀAx) = 2Ax pour A symétrique ; le ½ devant le compense : ∇(½xᵀAx − bᵀx) = Ax − b.'))
      + (ctx.first ? ` ${t('Vérifie sur la 1re composante : ∂f/∂x = {first}.', { first: ctx.first })}` : ''),
    check: { judge: { kind: 'mat', expect: '(2x+y-3 ; x+4y-5)', vars: ['x', 'y'], qgrad: { A: '[[2,1],[1,4]]', b: ['3', '5'] } }, prev: '∇f', line: '(4x+2y-3 ; 2x+8y-5)' },
  },
  m_grad_nonsym: {
    name: t('∇(xᵀMx) = 2Mx pour M non symétrique'),
    judges: ['mat'],
    transform(prev, ctx) {
      const g = ctx?.cfg?.qgrad;
      if (!g?.M) return [];
      const M = matQ(g.M);
      if (!M || MX.isSymmetric(M)) return [];
      const S = MX.add(M, MX.transpose(M));
      try { return [{ node: buildLine(ctx.cfg, gradText(M, g.b, 2)), ctx: { s: MX.text(S).replace(/-/g, '−') } }]; } catch { return []; }
    },
    explain: (ctx = {}) => (ctx.s
      ? t('Pour M non symétrique, ∇(xᵀMx) = (M + Mᵀ)x : ici M + Mᵀ = {s}. 2Mx ne vaut que si M = Mᵀ.', { s: ctx.s })
      : t('Pour M non symétrique, ∇(xᵀMx) = (M + Mᵀ)x. 2Mx ne vaut que si M = Mᵀ.')),
    check: { judge: { kind: 'mat', expect: '(2x+4y-1 ; 4x+2y)', vars: ['x', 'y'], qgrad: { M: '[[1,3],[1,1]]', b: ['1', '0'] } }, prev: '∇f', line: '(2x+6y-1 ; 2x+2y)' },
  },
  m_var_no_inverse: {
    name: t('Var(β̂) = σ²XᵀX, sans l\'inverse'),
    judges: ['value'],
    transform(prev, ctx) {
      const v = ctx?.cfg?.nvar;
      if (!v) return [];
      const w = q(v.s2).mul(q(v.d));
      return [{ node: valueNode(w), ctx: { d: fr(v.d), s2: fr(v.s2), j: v.j } }];
    },
    explain: (ctx = {}) => (ctx.d
      ? t('Plus il y a de données, plus XᵀX est grand et plus β̂ est précis : la variance est σ²(XᵀX)⁻¹. Il faut la case de (XᵀX)⁻¹, pas (XᵀX){jj} = {d}.', { jj: `${SUBS[ctx.j + 1] ?? ''}${SUBS[ctx.j + 1] ?? ''}`, d: ctx.d })
      : t('Plus il y a de données, plus XᵀX est grand et plus β̂ est précis : la variance est σ²(XᵀX)⁻¹.')),
    check: { judge: { kind: 'value', expect: '7/60', nvar: { s2: '7/6', d: '10', j: 1 } }, prev: 'V', line: '35/3' },
  },
  m_rayleigh_no_denominator: {
    name: t('R(x) sans le dénominateur xᵀx'),
    judges: ['value'],
    transform(prev, ctx) {
      const r = ctx?.cfg?.rayleigh;
      if (!r) return [];
      const c = { den: fr(r.den), num: fr(r.num) };
      return [{ node: valueNode(r.num), ctx: c }, { node: parse(`(${r.num})/√(${r.den})`), ctx: c }];
    },
    explain: (ctx = {}) => t('R(x) = xᵀAx/xᵀx : sans le dénominateur, la valeur dépend de la longueur de x.')
      + (ctx.den ? ` ${t('Ici xᵀx = {den}, donc R = {num}/{den} (pas de racine : xᵀx = ‖x‖²).', { den: ctx.den, num: ctx.num })}` : ''),
    check: { judge: { kind: 'value', expect: '19/5', rayleigh: { num: '19', den: '5' } }, prev: 'R', line: '19' },
  },
};
