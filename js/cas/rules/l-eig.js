// Traps of module L, section « eig » (eigenvalues and eigenvectors; see
// js/cas/rules/l.js). DEFS: {id: {name, judges, transform?, explain?, check}}.
//
// Most traps replay on what the judge's cfg knows (the generators of
// js/content/uni/alglin-eig.js put it there): the matrix A of `eigvec` and
// `factor`, the named P, D, A of `mat`, the det(…) of the previous `det`
// line, and a few fields read only here: span.shifted (A − λI),
// value.eig ({rule, lambda, c}: the rule applied to an eigenvalue),
// mat.markov (a Markov chain item), eigvec.pair (the other eigenvalue λ̄).

import { parseExpr, evalAst, envOf, Mx, vecOf, simp, toQ, isZeroScalar, isVec } from '../matexpr.js';
import { add, mul, pow, sym, lit, neg } from '../ast.js';
import { parse } from '../parse.js';
import { toText } from '../print.js';
import { Q } from '../../math/rational.js';
import * as MX from '../matrix.js';
import { mopts } from '../../judges/matcommon.js';
import { detsOf } from '../../judges/det.js';
import { expected } from '../../judges/mat.js';
import { shifted } from '../../judges/eigvec.js';

const T = (n) => toText(n).replace(/-/g, '−');
const hasLam = (cfg) => (cfg?.vars || []).includes('λ');
const line = (value, extra = {}) => ({ t: 'mline', ops: [], assigns: [], label: null, body: null, value, ...extra });

// The body of a line with one det(…) sub-expression replaced by a scalar.
function replaceAst(ast, target, repl) {
  if (ast === target) return repl;
  if (!ast || typeof ast !== 'object' || !ast.op) return ast;
  const out = { ...ast };
  for (const k of ['e', 'a', 'b']) if (ast[k]) out[k] = replaceAst(ast[k], target, repl);
  if (Array.isArray(ast.items)) out.items = ast.items.map((x) => replaceAst(x, target, repl));
  return out;
}
// For each det[[…]] of the previous line: f(rows) → a wrong scalar, the
// whole line re-evaluated with it.
function eachDet(prev, cfg, f) {
  if (!prev?.body) return [];
  const opts = mopts(cfg);
  const env = { ...envOf(cfg) };
  const out = [];
  for (const d of detsOf(prev)) {
    let M;
    try { M = evalAst(d.e, env, opts); } catch { continue; }
    if (M?.k !== 'm') continue;
    const r = f(M.rows);
    if (!r) continue;
    try {
      const v = evalAst(replaceAst(prev.body, d, { op: 'num', n: r.n }), env, opts);
      out.push({ node: line(v), ctx: r.ctx || {} });
    } catch { /* skip */ }
  }
  return out;
}

const lam = sym('λ');
const hasSymL = (n) => T(n).includes('λ');

// Whole primitive vector of Q (first non-zero entry > 0).
function primitive(v) {
  const g = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const L = v.reduce((l, x) => (l / g(l, x.d)) * x.d, 1);
  let w = v.map((x) => x.mul(L));
  const d = w.reduce((s, x) => g(s, x.n), 0) || 1;
  w = w.map((x) => x.div(d));
  const f = w.find((x) => x.n !== 0);
  return f && f.n < 0 ? w.map((x) => x.neg()) : w;
}
const perms = (xs) => (xs.length <= 1 ? [xs] : xs.flatMap((x, i) => perms([...xs.slice(0, i), ...xs.slice(i + 1)]).map((p) => [x, ...p])));
const qVec = (v) => vecOf(v.map((x) => lit(x)));

export const DEFS = {
  l_eigvec_zero: {
    name: 'Le vecteur nul pris pour un vecteur propre',
    judges: ['eigvec'],
    explain: () => 'Le vecteur nul vérifie A·0 = λ·0 pour tout λ : il est exclu par définition. Cherche une solution non nulle de (A − λI)v = 0 : donne la valeur 1 à une variable libre.',
    check: { judge: { kind: 'eigvec', A: '[[5,-2],[4,-1]]', lambda: '1' }, prev: 'v', line: '(0 ; 0)' },
  },
  l_eigen_rref: {
    name: 'Valeurs propres lues sur la forme échelonnée',
    judges: [],
    explain: () => 'Les opérations sur les lignes changent les valeurs propres : elles ne gardent que le rang (et le déterminant au signe près). Les valeurs propres sont les racines de det(A − λI).',
    check: { bait: { skill: 'l-eig-charpoly', exam: 'mcq' } },
  },
  l_charpoly_sign: {
    name: 'Signe du terme bc dans det(A − λI)',
    judges: ['det'],
    transform(prev, ctx) {
      if (!hasLam(ctx?.cfg)) return [];
      return eachDet(prev, ctx.cfg, (rows) => {
        if (rows.length !== 2 || rows[0].length !== 2) return null;
        const [[a, b], [c, d]] = rows;
        return { n: simp(add(mul(a, d), mul(b, c))), ctx: { b: T(b), c: T(c) } };
      });
    },
    explain: (ctx = {}) => (ctx.b
      ? `Un déterminant 2 × 2 vaut « diagonale moins antidiagonale » : il faut retrancher ${ctx.b}·${ctx.c}, pas l'ajouter.`
      : 'Un déterminant 2 × 2 vaut « diagonale moins antidiagonale » : (a − λ)(d − λ) − bc, avec un moins devant le produit bc.'),
    check: { judge: { kind: 'det', vars: ['λ'], target: 'factored' }, prev: 'det[[4-λ,1],[2,3-λ]]', line: '(4-λ)(3-λ)+2' },
  },
  l_lambda_one_entry: {
    name: 'λ soustrait à une seule case',
    judges: ['det', 'mat'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (!hasLam(cfg)) return [];
      // A − λI with λ only at a₁₁.
      const oneEntry = (rows) => rows.map((r, i) => r.map((x, j) => (i === j && i > 0 ? simp(add(x, lam)) : x)));
      const isShift = (rows) => rows.length === rows[0].length && rows.length > 1 && rows.every((r, i) => hasSymL(r[i]));
      if (cfg.kind === 'mat' || (!prev?.body && cfg.expect)) {
        let want;
        try { want = expected(cfg); } catch { return []; }
        if (want?.k !== 'm' || !isShift(want.rows)) return [];
        return [{ node: line(Mx(oneEntry(want.rows))), ctx: {} }];
      }
      return eachDet(prev, cfg, (rows) => {
        if (!isShift(rows)) return null;
        const W = oneEntry(rows);
        return { n: evalAst({ op: 'det', e: { op: 'lit', rows: W } }, {}, mopts(cfg)).n, ctx: {} };
      });
    },
    explain: () => 'λI a des λ sur <b>toute</b> la diagonale : chaque case diagonale de A perd λ, pas seulement la première.',
    check: { judge: { kind: 'det', vars: ['λ'], target: 'factored', names: { A: '[[4,1],[2,3]]' } }, prev: 'det(A-λI)', line: '(4-λ)·3-2' },
  },
  l_eigvec_row: {
    name: 'Une ligne de A − λI prise pour un vecteur propre',
    judges: ['eigvec', 'span'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (!cfg) return [];
      const opts = mopts(cfg);
      let rows;
      if (cfg.kind === 'span' || (cfg.shifted && !cfg.A)) {
        if (!cfg.shifted) return [];
        try { rows = evalAst(parseExpr(cfg.shifted, opts), {}, opts).rows; } catch { return []; }
      } else if (cfg.A && cfg.lambda !== undefined) {
        try { rows = shifted(cfg).rows; } catch { return []; }
      } else return [];
      const nz = rows.filter((r) => r.some((x) => !isZeroScalar(x, opts)));
      if (!nz.length) return [];
      const v = vecOf(nz[0]);
      const out = [{ node: line(v), ctx: { row: `(${nz[0].map(T).join(' ; ')})` } }];
      if (cfg.kind === 'span' && nz.length > 1) out.push({ node: line({ k: 'list', items: nz.map((r) => vecOf(r)) }), ctx: {} });
      return out;
    },
    explain: (ctx = {}) => `v doit être <b>orthogonal</b> aux lignes de A − λI (chaque ligne · v = 0), pas égal à l'une d'elles${ctx.row ? ` : ${ctx.row} est une ligne` : ''}. Avec 2x + y = 0, par exemple, v = (1 ; −2).`,
    check: { judge: { kind: 'eigvec', A: '[[3,1],[2,2]]', lambda: '1' }, prev: 'v', line: '(2 ; 1)' },
  },
  l_eig_inv_neg: {
    name: 'Valeur propre de A⁻¹ : l\'opposé au lieu de l\'inverse',
    judges: ['value'],
    transform(prev, ctx) {
      const e = ctx?.cfg?.eig;
      if (!e || !['inv'].includes(e.rule)) return [];
      return [{ node: parse(`-(${e.lambda})`), ctx: { l: String(e.lambda).replace('-', '−') } }];
    },
    explain: (ctx = {}) => `Si Av = λv, alors v = λA⁻¹v, donc A⁻¹v = (1/λ)v : c'est l'inverse${ctx.l ? ` 1/${ctx.l}` : ''}, pas l'opposé.`,
    check: { judge: { kind: 'value', expect: '1/2', eig: { rule: 'inv', lambda: '2' } }, prev: 'μ', line: '-2' },
  },
  l_eig_shift_scale: {
    name: 'Règles « + c » et « × c » échangées',
    judges: ['value'],
    transform(prev, ctx) {
      const e = ctx?.cfg?.eig;
      if (!e || e.c === undefined) return [];
      if (e.rule === 'shift') return [{ node: parse(`(${e.c})·(${e.lambda})`), ctx: { c: e.c, l: e.lambda } }];
      if (e.rule === 'scale') return [{ node: parse(`(${e.lambda})+(${e.c})`), ctx: { c: e.c, l: e.lambda } }];
      return [];
    },
    explain: () => '(A + cI)v = Av + cv = (λ + c)v : on ajoute c. (cA)v = c(Av) = cλv : on multiplie par c.',
    check: { judge: { kind: 'value', expect: '5', eig: { rule: 'shift', lambda: '2', c: '3' } }, prev: 'μ', line: '6' },
  },
  l_eig_transpose_vec: {
    name: 'Aᵀ et A ont les mêmes vecteurs propres',
    judges: [],
    explain: () => 'Aᵀ a les mêmes valeurs propres que A, pas les mêmes vecteurs propres : avec A = [[1, 1], [0, 2]], (1 ; 0) est propre pour A mais pas pour Aᵀ.',
    check: { bait: { skill: 'l-eig-related', exam: 'tf' } },
  },
  l_eig_sum: {
    name: 'Valeurs propres de A + B additionnées',
    judges: [],
    explain: () => 'Les valeurs propres de A + B ne sont les sommes λ + μ que si A et B ont les mêmes vecteurs propres. Contre-exemple : [[0, 1], [0, 0]] et [[0, 0], [1, 0]] n\'ont que 0, leur somme a 1 et −1.',
    check: { bait: { skill: 'l-eig-related', exam: 'tf' } },
  },
  l_pdp_inverse_side: {
    name: 'P⁻¹DP au lieu de PDP⁻¹',
    judges: ['mat'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (!cfg?.names?.P || !cfg.names.D) return [];
      const opts = mopts(cfg);
      const env = { ...envOf(cfg) };
      const texts = ['P^(-1)·D·P'];
      if ((cfg.vars || []).includes('k')) texts.push('P^(-1)·D^k·P');
      const out = [];
      for (const t of texts) {
        try { out.push({ node: line(evalAst(parseExpr(t, opts), env, opts)), ctx: {} }); } catch { /* skip */ }
      }
      return out;
    },
    explain: () => 'Les colonnes de P sont les vecteurs propres : AP = PD, donc A = PDP⁻¹ (et Aᵏ = PDᵏP⁻¹). Teste sur v₁ : PDP⁻¹v₁ = PDe₁ = λ₁v₁.',
    check: { judge: { kind: 'mat', names: { P: '[[1,1],[2,1]]', D: 'diag(1,3)' }, expect: '[[5,-2],[4,-1]]' }, prev: 'A', line: 'P^(-1)·D·P' },
  },
  l_pd_order: {
    name: 'Colonnes de P dans un autre ordre que D',
    judges: ['factor'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (!cfg?.A || cfg._name !== 'P' || !['PDP', 'orthodiag'].includes(cfg.of)) return [];
      let A;
      try { A = toQ(evalAst(parseExpr(cfg.A, mopts(cfg)), {}, mopts(cfg))); } catch { return []; }
      if (!A || A.length > 4) return [];
      const { roots } = MX.rationalEigen(A);
      const cols = roots.flatMap(({ value }) => MX.kernel(A.map((r, i) => r.map((x, j) => (i === j ? x.sub(value) : x)))).map(primitive));
      if (cols.length !== A.length) return [];
      return perms(cols).map((cs) => ({ node: line(null, { assigns: [{ name: 'P', value: Mx(MX.fromCols(cs).map((r) => r.map((x) => lit(x)))) }] }), ctx: {} }));
    },
    explain: () => 'La colonne k de P doit être un vecteur propre de la valeur propre en position k de D. Contrôle : AP = PD, colonne par colonne.',
    check: { judge: { kind: 'factor', A: '[[5,-2],[4,-1]]', of: 'PDP' }, prev: 'A = PDP^(-1)', line: 'P = [[1,1],[1,2]] ; D = diag(1,3)' },
  },
  l_diag_distinct: {
    name: '« Valeur propre double, donc pas diagonalisable »',
    judges: [],
    explain: (ctx = {}) => `Une valeur propre double n'empêche rien si son espace propre est de dimension 2${ctx.r ? ` : pour a = ${ctx.r}, dim E = ${ctx.d}` : ''}. Il faut comparer dim E_λ à la multiplicité, valeur par valeur.`,
    check: { bait: { skill: 'l-eig-diag-param', exam: 'mcq' } },
  },
  l_powers_entrywise: {
    name: 'Aᵏ calculée case par case',
    judges: ['mat'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (!cfg?.names?.A || !(cfg.vars || []).includes('k')) return [];
      let A;
      try { A = evalAst(parseExpr(cfg.names.A, mopts(cfg)), {}, mopts(cfg)); } catch { return []; }
      if (A?.k !== 'm') return [];
      return [{ node: line(Mx(A.rows.map((r) => r.map((x) => pow(x, sym('k')))))), ctx: {} }];
    },
    explain: () => 'Aᵏ = A·A·…·A, pas la matrice des aᵢⱼᵏ. Seule une matrice diagonale s\'élève case par case : d\'où Aᵏ = PDᵏP⁻¹.',
    check: { judge: { kind: 'mat', vars: ['k'], ints: ['k'], names: { A: '[[5,-2],[4,-1]]', P: '[[1,1],[2,1]]', D: 'diag(1,3)' }, expect: 'P·D^k·P^(-1)' }, prev: 'A^k', line: '[[5^k,(-2)^k],[4^k,(-1)^k]]' },
  },
  l_markov_rows: {
    name: 'Probabilités de transition rangées en lignes',
    judges: ['mat'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (!cfg?.markov || cfg.expect === undefined) return [];
      let want;
      try { want = expected(cfg); } catch { return []; }
      if (want?.k !== 'm' || isVec(want)) return [];
      return [{ node: line(Mx(want.rows[0].map((_, j) => want.rows.map((r) => r[j])))), ctx: {} }];
    },
    explain: () => 'Avec x_{k+1} = Mx_k, la colonne j dit où vont les personnes de l\'état j : chaque <b>colonne</b> somme à 1. Tu as rangé les probabilités en lignes.',
    check: { judge: { kind: 'mat', markov: true, expect: '[[7/10,2/5],[3/10,3/5]]' }, prev: 'M', line: '[[7/10,3/10],[2/5,3/5]]' },
  },
  l_markov_normalize: {
    name: 'Vecteur stationnaire non normalisé',
    judges: ['mat'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (!cfg?.markov || cfg.expect === undefined) return [];
      let want;
      try { want = toQ(expected(cfg)); } catch { return []; }
      if (!want || want[0].length !== 1) return [];
      const v = want.map((r) => r[0]);
      const p = primitive(v);
      const s = p.reduce((a, x) => a.add(x), new Q(0));
      const cands = [p];
      for (const k of [0, v.length - 1]) if (v[k].n !== 0) cands.push(v.map((x) => x.div(v[k])));
      return cands.map((c) => ({ node: line(qVec(c)), ctx: { s: String(s) } }));
    },
    explain: (ctx = {}) => `q est une répartition : ses composantes doivent sommer à 1. Divise ton vecteur propre par la somme de ses composantes${ctx.s ? ` (${ctx.s} pour le vecteur entier)` : ''}.`,
    check: { judge: { kind: 'mat', markov: true, expect: '(4/7 ; 3/7)' }, prev: 'q', line: '(4/3 ; 1)' },
  },
  l_complex_conj_vec: {
    name: 'Même vecteur propre pour λ et λ̄',
    judges: ['eigvec'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (!cfg?.complex || !cfg.pair || !cfg.A) return [];
      let rows;
      try { rows = shifted({ A: cfg.A, lambda: cfg.pair, complex: true }).rows; } catch { return []; }
      if (rows.length !== 2) return [];
      const opts = mopts(cfg);
      const r = rows.find((x) => x.some((y) => !isZeroScalar(y, opts)));
      if (!r) return [];
      return [{ node: line(vecOf([simp(neg(r[1])), r[0]])), ctx: {} }];
    },
    explain: () => 'Pour une matrice réelle, si Av = λv, alors Av̄ = λ̄v̄ : le vecteur propre de λ̄ est le conjugué v̄ (on change le signe de chaque i), pas v lui-même.',
    check: { judge: { kind: 'eigvec', A: '[[1,-2],[1,3]]', lambda: '2-i', complex: true, pair: '2+i' }, prev: 'v', line: '(-1+i ; 1)' },
  },
};
