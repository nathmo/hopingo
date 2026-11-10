// Traps of module L, section « mat » (matrix algebra, Lay 2.1 to 2.5; see
// js/cas/rules/l.js). DEFS: {id: {name, judges, transform?, explain?,
// check}}.
//
// The `mat` traps read what the item asks in cfg.about (the generators of
// js/content/uni/alglin-mat.js write it), because the start line of a `mat`
// item is a bare name (« M », « b_13 ») that has no value:
//   product: [A, B]        AB asked (texts of matrices, or names of cfg.names)
//   transpose: [A, B]      (AB)ᵀ asked
//   inverse: A             A⁻¹ asked
//   invProduct: [A, B]     (AB)⁻¹ asked
//   rotation: true         the expected matrix is a rotation
//   compose: [R, S]        « first R, then S »: S·R asked
//   elementary: E          E⁻¹ asked
//   blocks: {A, B, D}      a block of [[A, B], [0, D]]⁻¹ (2 × 2) or all of it
//   coef: {i, j, of?}      only the entry (i, j) (0-based) is asked; `of` is
//                          the matrix it is read in (l_coef_index_swap)
// Each candidate is a line node of the judge (or only the asked entry).
// The LU traps (judge factor) get the factor in ctx.cfg._name.

import { parseExpr, evalAst, envOf, valueText, toQ, sameValue } from '../matexpr.js';
import { buildLine, mopts } from '../../judges/matcommon.js';
import * as MX from '../matrix.js';
import { Q } from '../../math/rational.js';

const aboutOf = (ctx) => ctx?.cfg?.about || {};
const val = (text, cfg = {}) => evalAst(parseExpr(String(text), mopts(cfg)), { ...envOf(cfg) }, mopts(cfg));
const lineOf = (v) => buildLine({}, valueText(v));
const qm = (v) => (v?.k === 'm' ? toQ(v) : null);
const fromQ = (A) => val(MX.text(A));
const fq = (x) => String(x).replace('-', '−');
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const sub = (n) => String(n).split('').map((d) => SUB[d] ?? d).join('');

// The candidate for a wrong matrix: the matrix, or its entry (i, j) when
// only one entry is asked.
function out(v, ctx, extra = {}) {
  if (!v || v.k !== 'm') return [];
  const c = aboutOf(ctx).coef;
  if (c) {
    const x = v.rows[c.i]?.[c.j];
    if (!x) return [];
    return [{ node: buildLine({}, valueText({ k: 's', n: x })), ctx: extra }];
  }
  return [{ node: lineOf(v), ctx: extra }];
}
const tryV = (f) => { try { return f(); } catch { return null; } };
const expected = (cfg) => (cfg?.expect !== undefined ? tryV(() => val(cfg.expect, cfg)) : null);

// [[X, Y], [Z, W]] from four 2 × 2 blocks (Q).
const assemble = (X, Y, Z, W) => [...X.map((r, i) => [...r, ...Y[i]]), ...Z.map((r, i) => [...r, ...W[i]])];

export const DEFS = {
  l_ab_commute: {
    name: 'BA à la place de AB',
    judges: ['mat'],
    transform(prev, ctx) {
      const p = aboutOf(ctx).product;
      if (!p) return [];
      const [A, B] = p.map((t) => val(t, ctx.cfg));
      const BA = tryV(() => val(`(${valueText(B)})·(${valueText(A)})`));
      return out(BA, ctx, { m: A.rows.length, n: B.rows[0].length, p: A.rows[0].length });
    },
    explain: (ctx = {}) => (ctx.m
      ? (ctx.m === ctx.p
        ? 'Tu as calculé BA au lieu de AB. Le produit de matrices ne commute pas en général : la case (i, j) de AB est la ligne i de A fois la colonne j de B, dans cet ordre.'
        : `Tu as calculé BA au lieu de AB. Le produit de matrices ne commute pas : ici AB est ${ctx.m}×${ctx.n} et BA est ${ctx.p}×${ctx.p}, elles n'ont même pas la même taille.`)
      : 'Le produit de matrices ne commute pas en général : AB et BA sont différentes, et n\'ont parfois même pas la même taille. La case (i, j) de AB est la ligne i de A fois la colonne j de B.'),
    check: { judge: { kind: 'mat', expect: '[[2,3],[4,7]]', about: { product: ['[[1,2],[3,4]]', '[[0,1],[1,1]]'] } }, prev: 'M', line: '[[3,4],[4,6]]' },
  },
  l_product_entrywise: {
    name: 'Produit case par case',
    judges: ['mat'],
    transform(prev, ctx) {
      const p = aboutOf(ctx).product;
      if (!p) return [];
      const [A, B] = p.map((t) => qm(val(t, ctx.cfg)));
      if (!A || !B || A.length !== B.length || A[0].length !== B[0].length) return [];
      return out(fromQ(A.map((r, i) => r.map((x, j) => x.mul(B[i][j])))), ctx);
    },
    explain: () => 'Une case de AB est la somme des produits « ligne i de A par colonne j de B », pas le produit des cases au même endroit : (AB)ᵢⱼ = aᵢ₁b₁ⱼ + aᵢ₂b₂ⱼ + …',
    check: { judge: { kind: 'mat', expect: '[[2,3],[4,7]]', about: { product: ['[[1,2],[3,4]]', '[[0,1],[1,1]]'] } }, prev: 'M', line: '[[0,2],[3,4]]' },
  },
  l_transpose_product: {
    name: 'Transposée d\'un produit sans renverser l\'ordre',
    judges: ['mat'],
    transform(prev, ctx) {
      const p = aboutOf(ctx).transpose;
      if (!p) return [];
      const [A, B] = p.map((t) => val(t, ctx.cfg));
      return out(tryV(() => val(`(${valueText(A)})^T·(${valueText(B)})^T`)), ctx);
    },
    explain: () => 'La transposée d\'un produit renverse l\'ordre : (AB)ᵀ = BᵀAᵀ. Avec AᵀBᵀ, on obtient (BA)ᵀ, et les tailles ne vont même pas toujours.',
    check: { judge: { kind: 'mat', expect: '[[2,4],[3,7]]', about: { transpose: ['[[1,2],[3,4]]', '[[0,1],[1,1]]'] } }, prev: 'M', line: '[[3,4],[4,6]]' },
  },
  l_coef_index_swap: {
    name: 'Indices échangés',
    judges: ['mat'],
    transform(prev, ctx) {
      const c = aboutOf(ctx).coef;
      if (!c?.of || c.i === c.j) return [];
      const M = tryV(() => val(c.of, ctx.cfg));
      const x = M?.rows?.[c.j]?.[c.i];
      if (!x) return [];
      return [{ node: buildLine({}, valueText({ k: 's', n: x })), ctx: { i: c.i + 1, j: c.j + 1, v: fq(valueText({ k: 's', n: x })), name: c.name || 'b' } }];
    },
    explain: (ctx = {}) => (ctx.i
      ? `${ctx.name}${sub(ctx.i)}${sub(ctx.j)} est en ligne ${ctx.i} et colonne ${ctx.j}. Tu as lu la case (${ctx.j}, ${ctx.i}), qui vaut ${ctx.v}. Le premier indice donne la ligne, le second la colonne.`
      : 'bᵢⱼ est en ligne i et colonne j. Tu as lu la case (j, i) : le premier indice donne la ligne, le second la colonne.'),
    check: { judge: { kind: 'mat', expect: '2', about: { coef: { i: 0, j: 2, of: '[[7,-4,2],[-3,2,-1],[1,-1,1]]' } } }, prev: 'b_13', line: '1' },
  },
  l_inv_entrywise: {
    name: 'Inverse case par case',
    judges: ['mat'],
    transform(prev, ctx) {
      const t = aboutOf(ctx).inverse;
      if (!t) return [];
      const A = qm(val(t, ctx.cfg));
      if (!A || A.flat().some((x) => x.n === 0) && !aboutOf(ctx).coef) return [];
      const c = aboutOf(ctx).coef;
      if (c) {
        const x = A[c.i]?.[c.j];
        if (!x || x.n === 0) return [];
        return [{ node: buildLine({}, String(new Q(1).div(x))), ctx: {} }];
      }
      return out(fromQ(A.map((r) => r.map((x) => new Q(1).div(x)))), ctx);
    },
    explain: () => 'A⁻¹ n\'est pas la matrice des 1/aᵢⱼ : vérifie, le produit de A par ta matrice ne redonne pas I. L\'inverse se calcule en réduisant [A | I] (ou, pour une 2 × 2, par (1/(ad − bc))·[[d, −b], [−c, a]]).',
    check: { judge: { kind: 'mat', expect: '[[-2,1],[3/2,-1/2]]', about: { inverse: '[[1,2],[3,4]]' } }, prev: 'M', line: '[[1,1/2],[1/3,1/4]]' },
  },
  l_inv_2x2_swap: {
    name: 'Formule 2 × 2 mal appliquée',
    judges: ['mat'],
    transform(prev, ctx) {
      const t = aboutOf(ctx).inverse;
      if (!t) return [];
      const A = qm(val(t, ctx.cfg));
      if (!A || A.length !== 2 || A[0].length !== 2) return [];
      const [[a, b], [c, d]] = A;
      const det = MX.det(A);
      if (det.n === 0) return [];
      const k = (rows) => fromQ(rows.map((r) => r.map((x) => x.div(det))));
      return [
        ...out(k([[a, b.neg()], [c.neg(), d]]), ctx, { what: 'diag' }),
        ...out(k([[d, b], [c, a]]), ctx, { what: 'sign' }),
        ...out(k([[d, c.neg()], [b.neg(), a]]), ctx, { what: 'swap' }),
      ];
    },
    explain: (ctx = {}) => {
      const rule = 'Pour une 2 × 2 : on échange les deux cases de la diagonale, on change le signe des deux autres (sans les déplacer), puis on divise par ad − bc.';
      if (ctx.what === 'diag') return `Tu n'as pas échangé a et d. ${rule}`;
      if (ctx.what === 'sign') return `Tu n'as pas changé le signe de b et c. ${rule}`;
      if (ctx.what === 'swap') return `Tu as échangé b et c : ils restent à leur place, seul leur signe change. ${rule}`;
      return rule;
    },
    check: { judge: { kind: 'mat', expect: '[[-2,1],[3/2,-1/2]]', about: { inverse: '[[1,2],[3,4]]' } }, prev: 'M', line: '[[-1/2,1],[3/2,-2]]' },
  },
  l_inv_product_order: {
    name: '(AB)⁻¹ = A⁻¹B⁻¹',
    judges: ['mat'],
    transform(prev, ctx) {
      const p = aboutOf(ctx).invProduct;
      if (!p) return [];
      const [A, B] = p.map((t) => val(t, ctx.cfg));
      return out(tryV(() => val(`(${valueText(A)})^(-1)·(${valueText(B)})^(-1)`)), ctx);
    },
    explain: () => '(AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ = I : l\'inverse d\'un produit renverse l\'ordre, (AB)⁻¹ = B⁻¹A⁻¹, comme on enlève les chaussures avant les chaussettes.',
    check: { judge: { kind: 'mat', expect: '[[7/2,-3/2],[-2,1]]', about: { invProduct: ['[[1,2],[3,4]]', '[[0,1],[1,1]]'] } }, prev: 'M', line: '[[3,-2],[-2,3/2]]' },
  },
  l_rot_transpose: {
    name: 'Rotation transposée',
    judges: ['mat'],
    transform(prev, ctx) {
      if (!aboutOf(ctx).rotation) return [];
      const R = expected(ctx.cfg);
      if (!R || R.k !== 'm' || R.rows.length !== 2) return [];
      if (sameValue(R, { k: 'm', rows: [[R.rows[0][0], R.rows[1][0]], [R.rows[0][1], R.rows[1][1]]] })) return [];
      return out({ k: 'm', rows: [[R.rows[0][0], R.rows[1][0]], [R.rows[0][1], R.rows[1][1]]] }, ctx);
    },
    explain: () => 'Cette matrice tourne de −θ. La rotation d\'angle θ est [[cos θ, −sin θ], [sin θ, cos θ]] : sa colonne 1 est l\'image de e₁, (cos θ ; sin θ), qui est e₁ tourné de θ.',
    check: { judge: { kind: 'mat', expect: '[[0,-1],[1,0]]', about: { rotation: true } }, prev: 'M', line: '[[0,1],[-1,0]]' },
  },
  l_compose_order: {
    name: 'Composée dans l\'ordre de l\'énoncé',
    judges: ['mat'],
    transform(prev, ctx) {
      const p = aboutOf(ctx).compose;
      if (!p) return [];
      const [R, S] = p.map((t) => val(t, ctx.cfg));
      const RS = tryV(() => val(`(${valueText(R)})·(${valueText(S)})`));
      const SR = tryV(() => val(`(${valueText(S)})·(${valueText(R)})`));
      if (RS && SR && sameValue(RS, SR)) return [];
      return out(RS, ctx);
    },
    explain: () => 'On applique d\'abord R à x, puis S au résultat : S(R(x)) = (SR)x. La matrice appliquée en premier est à droite du produit.',
    check: { judge: { kind: 'mat', expect: '[[0,-1],[-1,0]]', about: { compose: ['[[0,-1],[1,0]]', '[[1,0],[0,-1]]'] } }, prev: 'M', line: '[[0,1],[1,0]]' },
  },
  l_elementary_inverse: {
    name: 'E⁻¹ = E',
    judges: ['mat'],
    transform(prev, ctx) {
      const t = aboutOf(ctx).elementary;
      if (!t) return [];
      const E = val(t, ctx.cfg);
      const Eq = qm(E);
      if (!Eq) return [];
      const op = MX.identifyRowOp(MX.identity(Eq.length), Eq);
      if (!op) return [];
      const k = op.kind === 'add' ? fq(op.k) : op.kind === 'scale' ? fq(op.k) : null;
      return out(E, ctx, { kind: op.kind, k, i: op.i + 1, j: op.j !== undefined ? op.j + 1 : null });
    },
    explain: (ctx = {}) => {
      if (ctx.kind === 'add') return `E ajoute ${ctx.k} fois la ligne ${ctx.j} à la ligne ${ctx.i}. Pour la défaire, il faut retrancher : le coefficient de E⁻¹ est l'opposé de ${ctx.k}. Contrôle : E·E⁻¹ = I.`;
      if (ctx.kind === 'scale') return `E multiplie la ligne ${ctx.i} par ${ctx.k}. Pour la défaire, on la divise par ${ctx.k} : E⁻¹ porte l'inverse de ${ctx.k}. Contrôle : E·E⁻¹ = I.`;
      if (ctx.kind === 'swap') return 'Un échange de lignes se défait par le même échange : là, E⁻¹ = E est juste. Vérifie l\'autre partie de ta ligne.';
      return 'Pour défaire « ajouter k fois une ligne », il faut la retrancher : E⁻¹ porte −k à la place de k. Contrôle : E·E⁻¹ = I.';
    },
    check: { judge: { kind: 'mat', expect: '[[1,0,0],[0,1,0],[-2,0,1]]', about: { elementary: '[[1,0,0],[0,1,0],[2,0,1]]' } }, prev: 'M', line: '[[1,0,0],[0,1,0],[2,0,1]]' },
  },
  l_blocks_order: {
    name: 'Ordre des blocs renversé',
    judges: ['mat'],
    transform(prev, ctx) {
      const b = aboutOf(ctx).blocks;
      if (!b) return [];
      const [A, B, D] = ['A', 'B', 'D'].map((k) => qm(val(b[k], ctx.cfg)));
      const Ai = MX.inverse(A); const Di = MX.inverse(D);
      if (!Ai || !Di) return [];
      const X = MX.scale(MX.mul(MX.mul(Di, B), Ai), -1);
      const Z = MX.zeros(2, 2);
      return [...out(fromQ(X), ctx), ...out(fromQ(assemble(Ai, X, Z, Di)), ctx)];
    },
    explain: () => 'Les blocs ne commutent pas. Écris M·M⁻¹ = I bloc par bloc : A·X + B·D⁻¹ = 0 donne X = −A⁻¹BD⁻¹, avec A⁻¹ à gauche et D⁻¹ à droite.',
    check: { judge: { kind: 'mat', expect: '[[1,1],[-1,-1/2]]', about: { blocks: { A: '[[1,2],[0,1]]', B: '[[1,0],[1,1]]', D: '[[1,0],[0,2]]' } } }, prev: 'X_12', line: '[[-1,2],[-1/2,1/2]]' },
  },
  l_blocks_inverse_each: {
    name: 'Chaque bloc inversé séparément',
    judges: ['mat'],
    transform(prev, ctx) {
      const b = aboutOf(ctx).blocks;
      if (!b) return [];
      const [A, B, D] = ['A', 'B', 'D'].map((k) => qm(val(b[k], ctx.cfg)));
      const Ai = MX.inverse(A); const Bi = MX.inverse(B); const Di = MX.inverse(D);
      if (!Ai || !Bi || !Di) return [];
      const want = MX.scale(MX.mul(MX.mul(Ai, B), Di), -1);
      return [...out(fromQ(Bi), ctx, { x: MX.text(want) }), ...out(fromQ(assemble(Ai, Bi, MX.zeros(2, 2), Di)), ctx, { x: MX.text(want) })];
    },
    explain: (ctx = {}) => `On n'inverse pas une matrice par blocs case par case : le produit de ta matrice par M ne donne pas I. Le bloc haut droit de M⁻¹ vaut −A⁻¹BD⁻¹${ctx.x ? ` = ${ctx.x.replace(/-/g, '−')}` : ''}, pas B⁻¹.`,
    check: { judge: { kind: 'mat', expect: '[[0,1],[-1,-1]]', about: { blocks: { A: '[[1,2],[0,1]]', B: '[[2,1],[1,1]]', D: '[[1,0],[0,1]]' } } }, prev: 'X_12', line: '[[1,-1],[-1,2]]' },
  },
  l_lu_sign: {
    name: 'ℓᵢⱼ avec le mauvais signe',
    judges: ['factor'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (cfg?.of !== 'LU' || cfg._name !== 'L') return [];
      const A = qm(val(cfg.A, cfg));
      const lu = A && MX.lu(A);
      if (!lu) return [];
      const bad = lu.L.map((r, i) => r.map((x, j) => (j < i ? x.neg() : x)));
      const at = lu.L.flatMap((r, i) => r.map((x, j) => (j < i && x.n !== 0 ? [i, j, x] : null))).filter(Boolean)[0];
      return [{ node: buildLine({}, `L = ${MX.text(bad)}`), ctx: at ? { i: at[0] + 1, j: at[1] + 1, k: fq(at[2]) } : {} }];
    },
    explain: (ctx = {}) => (ctx.i
      ? `ℓᵢⱼ est le nombre qu'on <b>retranche</b> : L${sub(ctx.i)} ← L${sub(ctx.i)} − ${ctx.k}·L${sub(ctx.j)} donne ℓ${sub(ctx.i)}${sub(ctx.j)} = ${ctx.k}, avec ce signe. Contrôle : LU doit redonner A.`
      : 'ℓᵢⱼ est le nombre qu\'on <b>retranche</b> : Lᵢ ← Lᵢ − k·Lⱼ donne ℓᵢⱼ = k, avec ce signe. Contrôle : LU doit redonner A.'),
    check: { judge: { kind: 'factor', A: '[[2,1,-1],[4,1,0],[-2,-4,10]]', of: 'LU' }, prev: 'A', line: 'L = [[1,0,0],[-2,1,0],[1,-3,1]]' },
  },
  l_lu_inverse: {
    name: 'L prise égale au produit des Eᵢ',
    judges: ['factor'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (cfg?.of !== 'LU' || cfg._name !== 'L') return [];
      const A = qm(val(cfg.A, cfg));
      const lu = A && MX.lu(A);
      if (!lu) return [];
      const Li = MX.inverse(lu.L);
      if (MX.equal(Li, lu.L.map((r, i) => r.map((x, j) => (j < i ? x.neg() : x))))) return [];
      return [{ node: buildLine({}, `L = ${MX.text(Li)}`), ctx: {} }];
    },
    explain: () => 'Le produit E₃E₂E₁ des matrices d\'élimination fait passer de A à U : c\'est L⁻¹. L fait le chemin inverse, et elle se remplit directement avec les multiplicateurs, sans produit : ℓᵢⱼ = k pour Lᵢ ← Lᵢ − kLⱼ.',
    check: { judge: { kind: 'factor', A: '[[2,1,-1],[4,1,0],[-2,-4,10]]', of: 'LU' }, prev: 'A', line: 'L = [[1,0,0],[-2,1,0],[7,-3,1]]' },
  },
  l_imt_nonsquare: {
    name: 'Théorème de la matrice inversible pour une matrice non carrée',
    judges: [],
    explain: (ctx = {}) => (ctx.m
      ? `Le théorème de la matrice inversible ne vaut que pour une matrice carrée. Ici A est ${ctx.m}×${ctx.n} : elle n'est jamais inversible, et ses propriétés « par lignes » et « par colonnes » ne vont plus ensemble.`
      : 'Le théorème de la matrice inversible ne vaut que pour une matrice carrée. Pour une matrice m × n avec m ≠ n, « un pivot par colonne » et « un pivot par ligne » ne vont plus ensemble.'),
    check: { bait: { skill: 'l-mat-imt', level: 3 } },
  },
};

