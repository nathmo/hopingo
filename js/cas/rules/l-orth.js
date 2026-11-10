// Traps of module L, section « orth » (see js/cas/rules/l.js): what makes
// each trap of this section work. DEFS: {id: {name, judges, transform?,
// wrongValues?, explain?, check}}.
//
// The line traps read what the generators put in the judge's cfg
// (js/content/uni/alglin-orth.js), so that they replay on the question
// whatever the student's previous line:
//   cfg.dot  = [u, v]                 (texts of entries; a dot product)
//   cfg.perp = [w₁, w₂, …]            (W = Span{wᵢ}; a basis of W⊥)
//   cfg.proj = {y, basis, orth?}      (ŷ = proj_W y; orth: an orthogonal basis of W)
//   cfg.pc   = {y, u}                 (a projection coefficient y · u / u · u)
//   cfg.gs   = {xs, vs, j}            (vⱼ of Gram-Schmidt, j from 0)
//   cfg.qrc  = {A, i, j}              (rᵢⱼ of A = QR)
//   cfg.lsq  = {A, b, ask, i?, line?} (least squares: ask 'AtA' | 'x')
// Without these fields a transform gives nothing.

import { Q } from '../../math/rational.js';
import * as MX from '../matrix.js';
import { parse } from '../parse.js';
import { lit } from '../ast.js';
import { Mx, vecOf, simp } from '../matexpr.js';

const q = (x) => (x instanceof Q ? x : typeof x === 'string' ? MX.q(x) : new Q(x));
const Qv = (v) => v.map(q);
const fq = (x) => String(x).replace('-', '−');
const vR = (v) => `(${v.map(fq).join(' ; ')})`;
const node = (value, assigns = []) => ({ t: 'mline', ops: [], assigns, label: null, body: null, value });
const qVec = (v) => vecOf(v.map((x) => lit(q(x))));
const qMat = (A) => Mx(A.map((r) => r.map((x) => lit(q(x)))));
const dot = (u, v) => MX.dot(Qv(u), Qv(v));
const comb = (terms) => terms.reduce((s, [c, v]) => s.map((x, i) => x.add(q(c).mul(q(v[i])))), terms[0][1].map(() => q(0)));
// Σ cᵢ·vᵢ with cᵢ given as CAS texts (roots allowed): a vector of nodes.
const combText = (base, terms, opts = {}) => vecOf(base.map((b, i) => simp(parse(`${b}${terms.map(([c, v]) => `+(${c})*(${v[i]})`).join('')}`, opts))));
const rootOf = (n) => { const r = Math.round(Math.sqrt(n.valueOf())); return r * r === n.valueOf() && n.d === 1 ? String(r) : `√(${n})`; };

export const DEFS = {
  l_dot_no_sum: {
    name: 'Produit scalaire laissé en vecteur',
    judges: ['mat'],
    transform(prev, ctx) {
      const d = ctx?.cfg?.dot;
      if (!d) return [];
      const opts = { vars: ctx.cfg.vars || [] };
      const items = d[0].map((x, i) => simp(parse(`(${x})*(${d[1][i]})`, opts)));
      return [{ node: node(vecOf(items)), ctx: { n: d[0].length } }];
    },
    explain: (ctx = {}) => (ctx.n
      ? `Le produit scalaire est un <b>nombre</b> : après les ${ctx.n} produits terme à terme, il faut les additionner.`
      : 'Le produit scalaire est un <b>nombre</b> : la somme des produits terme à terme, pas le vecteur de ces produits.'),
    check: { judge: { kind: 'mat', expect: '-5', dot: [['1', '2', '2'], ['3', '0', '-4']] }, prev: 'u·v', line: '(3 ; 0 ; -8)' },
  },
  l_orth_transitive: {
    name: 'L\'orthogonalité n\'est pas transitive',
    judges: [],
    explain: () => 'u ⊥ v et v ⊥ w ne disent rien sur u et w : avec u = w = e₁ et v = e₂, u ⊥ v, v ⊥ w, mais u · w = 1.',
    check: { bait: { skill: 'l-orth-dot', exam: 'tf' } },
  },
  l_perp_one_vector: {
    name: 'Orthogonal à un seul vecteur de W',
    judges: ['span'],
    transform(prev, ctx) {
      const ws = ctx?.cfg?.perp;
      if (!ws || ws.length < 2) return [];
      return ws.map((w, k) => {
        const K = MX.kernel([Qv(w)]);
        const other = ws[k === 0 ? 1 : 0];
        return { node: node({ k: 'list', items: K.map(qVec) }), ctx: { v: vR(K[0]), w: vR(Qv(other)), d: fq(dot(K[0], other)), k: k + 1 } };
      });
    },
    explain: (ctx = {}) => (ctx.v
      ? `Tes vecteurs sont orthogonaux à w${'₀₁₂₃'[ctx.k]} seulement. Un vecteur de W⊥ doit être orthogonal à <b>tous</b> les vecteurs de W : ${ctx.v} · ${ctx.w} = ${ctx.d} ≠ 0. Mets tous les wᵢ en lignes dans M.`
      : 'Un vecteur de W⊥ doit être orthogonal à <b>tous</b> les vecteurs de W : la matrice M a une ligne par vecteur wᵢ, pas une seule.'),
    check: {
      judge: { kind: 'span', basis: ['(1;-1;1;0)', '(-3;1;0;1)'], require: 'basis', perp: [['1', '1', '0', '2'], ['0', '1', '1', '-1']] },
      prev: 'W⊥', line: '(-1;1;0;0), (0;0;1;0), (-2;0;0;1)',
    },
  },
  l_proj_nonorth: {
    name: 'Projection sur une base non orthogonale',
    judges: ['mat'],
    transform(prev, ctx) {
      const p = ctx?.cfg?.proj;
      if (!p || p.basis.length < 2) return [];
      const v = comb(p.basis.map((w) => [dot(p.y, w).div(dot(w, w)), w]));
      return [{ node: node(qVec(v)), ctx: { d: fq(dot(p.basis[0], p.basis[1])) } }];
    },
    explain: (ctx = {}) => (ctx.d && ctx.d !== '0'
      ? `La formule Σ (y · wᵢ / wᵢ · wᵢ) wᵢ n'est juste que si les wᵢ sont orthogonaux ; ici w₁ · w₂ = ${ctx.d}. Orthogonalise d'abord (Gram-Schmidt).`
      : 'La formule Σ (y · wᵢ / wᵢ · wᵢ) wᵢ n\'est juste que si les wᵢ sont orthogonaux deux à deux. Orthogonalise d\'abord la base (Gram-Schmidt).'),
    check: { judge: { kind: 'mat', expect: '(1;3;1;3)', proj: { y: ['3', '1', '-1', '5'], basis: [['1', '1', '1', '1'], ['2', '0', '2', '0']] } }, prev: 'ŷ', line: '(3;2;3;2)' },
  },
  g4_proj_no_square: {
    name: 'Division par ‖v‖ au lieu de ‖v‖²',
    judges: ['mat', 'value'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      const out = [];
      // A projection coefficient (value line): y · u / ‖u‖, and y · u.
      if (cfg.pc && cfg.kind === 'value') {
        const d = dot(cfg.pc.y, cfg.pc.u);
        const nn = dot(cfg.pc.u, cfg.pc.u);
        out.push({ node: simp(parse(`(${d})/${rootOf(nn)}`)), ctx: { n2: String(nn) } }, { node: parse(String(d)), ctx: { n2: String(nn) } });
      }
      if (cfg.kind !== 'mat') return out;
      // ŷ = Σ (y · uᵢ / ‖uᵢ‖) uᵢ (and without division).
      if (cfg.proj) {
        const us = cfg.proj.orth || cfg.proj.basis;
        const zero = us[0].map(() => '0');
        const dv = us.map((u) => [`(${dot(cfg.proj.y, u)})/${rootOf(dot(u, u))}`, u]);
        out.push({ node: node(combText(zero, dv)), ctx: { n2: String(dot(us[0], us[0])) } });
        out.push({ node: node(qVec(comb(us.map((u) => [dot(cfg.proj.y, u), u])))), ctx: { n2: String(dot(us[0], us[0])) } });
      }
      // vⱼ = xⱼ − Σ (xⱼ · vᵢ / ‖vᵢ‖) vᵢ.
      if (cfg.gs) {
        const { xs, vs, j } = cfg.gs;
        const x = xs[j];
        const prevs = vs.slice(0, j);
        if (prevs.length) {
          out.push({ node: node(combText(x.map(String), prevs.map((v) => [`-(${dot(x, v)})/${rootOf(dot(v, v))}`, v]))), ctx: { n2: String(dot(prevs[0], prevs[0])) } });
          out.push({ node: node(qVec(comb([[1, x], ...prevs.map((v) => [dot(x, v).neg(), v])]))), ctx: { n2: String(dot(prevs[0], prevs[0])) } });
        }
      }
      return out;
    },
    explain: (ctx = {}) => (ctx.n2
      ? `u · v/‖v‖ est une longueur. Pour un vecteur, on multiplie par le vecteur unitaire v/‖v‖ : il faut diviser par ‖v‖ deux fois, donc par ‖v‖² = v · v = ${ctx.n2}.`
      : 'u · v/‖v‖ est une longueur. Pour un vecteur, on multiplie par le vecteur unitaire v/‖v‖ : il faut diviser par ‖v‖ deux fois, donc par ‖v‖² = v · v.'),
    check: { judge: { kind: 'mat', expect: '(1;3;1;3)', proj: { y: ['3', '1', '-1', '5'], basis: [['1', '1', '1', '1'], ['1', '-1', '1', '-1']] } }, prev: 'ŷ', line: '(2;6;2;6)' },
  },
  l_orth_cols_only: {
    name: 'Colonnes orthogonales mais pas normées',
    judges: [],
    explain: () => 'Des colonnes orthogonales ne suffisent pas : il faut aussi qu\'elles soient de norme 1. Avec U = 2I, les colonnes sont orthogonales, mais UᵀU = 4I et U⁻¹ = (1/2)I ≠ Uᵀ.',
    check: { bait: { skill: 'l-orth-matrices', exam: 'tf' } },
  },
  l_orth_det_one: {
    name: 'Orthogonale n\'implique pas det = 1',
    judges: [],
    explain: () => 'Une matrice orthogonale a det U = ±1, pas forcément 1 : une symétrie, comme (1/3)·[[1, 2, 2], [2, 1, −2], [2, −2, 1]] ou [[1, 0], [0, −1]], a det U = −1.',
    check: { bait: { skill: 'l-orth-matrices', exam: 'tf' } },
  },
  l_gs_use_x: {
    name: 'Projeter sur les xᵢ au lieu des vᵢ',
    judges: ['mat'],
    transform(prev, ctx) {
      const g = ctx?.cfg?.gs;
      if (!g || g.j < 2) return [];
      const x = g.xs[g.j];
      const prevs = g.xs.slice(0, g.j);
      const v = comb([[1, x], ...prevs.map((w) => [dot(x, w).div(dot(w, w)).neg(), w])]);
      return [{ node: node(qVec(v)), ctx: { d: fq(dot(v, g.vs[g.j - 1])), k: g.j } }];
    },
    explain: (ctx = {}) => (ctx.d
      ? `x₁ et x₂ ne sont pas orthogonaux entre eux : il faut projeter sur v₁ et v₂, déjà orthogonaux. Contrôle : ton vecteur · v${'₀₁₂₃₄'[ctx.k]} = ${ctx.d} ≠ 0.`
      : 'Les xᵢ ne sont pas orthogonaux entre eux : il faut projeter sur les vᵢ déjà obtenus, qui le sont.'),
    check: {
      judge: { kind: 'mat', expect: '(1;1;-1;-1)', gs: { xs: [['1', '1', '1', '1'], ['2', '0', '2', '0'], ['2', '4', '0', '2']], vs: [['1', '1', '1', '1'], ['1', '-1', '1', '-1'], ['1', '1', '-1', '-1']], j: 2 } },
      prev: 'v_3', line: '(-1;2;-3;0)',
    },
  },
  l_gs_sign: {
    name: 'Projection ajoutée au lieu d\'être retranchée',
    judges: ['mat'],
    transform(prev, ctx) {
      const g = ctx?.cfg?.gs;
      if (!g || g.j < 1) return [];
      const x = g.xs[g.j];
      const prevs = g.vs.slice(0, g.j);
      const v = comb([[1, x], ...prevs.map((w) => [dot(x, w).div(dot(w, w)), w])]);
      return [{ node: node(qVec(v)), ctx: { d: fq(dot(v, prevs[0])) } }];
    },
    explain: (ctx = {}) => (ctx.d
      ? `On <b>retire</b> à xⱼ sa composante selon chaque vᵢ. Contrôle : ton vecteur · v₁ = ${ctx.d}, alors qu'il doit valoir 0.`
      : 'On <b>retire</b> à xⱼ sa composante selon chaque vᵢ : vⱼ = xⱼ − (xⱼ · vᵢ / vᵢ · vᵢ) vᵢ. Contrôle : vⱼ · vᵢ doit valoir 0.'),
    check: {
      judge: { kind: 'mat', expect: '(1;-1;1;-1)', gs: { xs: [['1', '1', '1', '1'], ['2', '0', '2', '0']], vs: [['1', '1', '1', '1'], ['1', '-1', '1', '-1']], j: 1 } },
      prev: 'v_2', line: '(3;1;3;1)',
    },
  },
  l_qr_r_from_gs: {
    name: 'R remplie avec les coefficients de Gram-Schmidt',
    judges: ['factor', 'value'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      if (cfg.kind === 'value' && cfg.qrc) {
        const g = MX.qrGS(cfg.qrc.A.map(Qv));
        if (!g) return [];
        const { i, j } = cfg.qrc;
        return [{ node: lit(g.C[i][j]), ctx: { n: rootOf(g.norms2[i]), c: fq(g.C[i][j]), i: i + 1 } }];
      }
      if (cfg.kind !== 'factor' || cfg.of !== 'QR' || cfg._name !== 'R') return [];
      const A = parseMatrix(cfg.A);
      const g = A && MX.qrGS(A);
      if (!g) return [];
      return [{ node: node(qMat(g.C), [{ name: 'R', value: qMat(g.C) }]), ctx: { n: rootOf(g.norms2[0]), i: 1 } }];
    },
    explain: (ctx = {}) => (ctx.n
      ? `Avec Q normée, rᵢⱼ = qᵢ · xⱼ = cᵢⱼ·‖vᵢ‖ : le coefficient de Gram-Schmidt est multiplié par la norme, et rᵢᵢ = ‖vᵢ‖ (ici ‖v${'₀₁₂₃₄'[ctx.i]}‖ = ${ctx.n}), pas 1.`
      : 'Avec Q normée, rᵢⱼ = qᵢ · xⱼ = cᵢⱼ·‖vᵢ‖, et rᵢᵢ = ‖vᵢ‖ : les coefficients de Gram-Schmidt ne suffisent pas, il faut les multiplier par les normes.'),
    check: { judge: { kind: 'factor', A: '[[1,2,2],[1,0,4],[1,2,0],[1,0,2]]', of: 'QR' }, prev: 'A', line: 'R = [[1,1,2],[0,1,-1],[0,0,1]]' },
  },
  l_lsq_square_subsystem: {
    name: 'Seulement les premières équations',
    judges: ['mat', 'value'],
    transform(prev, ctx) {
      const L = ctx?.cfg?.lsq;
      if (!L || L.ask !== 'x') return [];
      const n = L.A[0].length;
      const A = L.A.slice(0, n).map(Qv);
      const inv = MX.det(A).n !== 0 ? MX.inverse(A) : null;
      if (!inv) return [];
      const x = MX.matVec(inv, Qv(L.b.slice(0, n)));
      const c = { n };
      if (ctx.cfg.kind === 'value') return L.i !== undefined ? [{ node: lit(x[L.i]), ctx: c }] : [];
      return [{ node: node(qVec(x)), ctx: c }];
    },
    explain: (ctx = {}) => `Le système est incompatible : une solution ${ctx.n ? `des ${ctx.n} premières équations` : 'de quelques équations'} ignore les autres. Les moindres carrés tiennent compte de toutes, par AᵀAx = Aᵀb.`,
    check: { judge: { kind: 'mat', expect: '(1;1)', lsq: { A: [[1, 0], [1, 1], [1, 2], [1, 3]], b: [2, 1, 2, 5], ask: 'x' } }, prev: 'x', line: '(2;-1)' },
  },
  l_lsq_line_swap: {
    name: 'β₀ et β₁ échangés',
    judges: ['mat', 'value'],
    transform(prev, ctx) {
      const L = ctx?.cfg?.lsq;
      if (!L || L.ask !== 'x' || !L.line) return [];
      const A = L.A.map(Qv);
      const At = MX.transpose(A);
      const x = MX.matVec(MX.inverse(MX.mul(At, A)), MX.matVec(At, Qv(L.b)));
      if (x[0].eq(x[1])) return [];
      if (ctx.cfg.kind === 'value') return L.i !== undefined ? [{ node: lit(x[1 - L.i]), ctx: {} }] : [];
      return [{ node: node(qVec([x[1], x[0]])), ctx: { b0: fq(x[0]), b1: fq(x[1]) } }];
    },
    explain: (ctx = {}) => (ctx.b0
      ? `La colonne de 1 porte l'ordonnée à l'origine β₀ = ${ctx.b0} ; la colonne des x porte la pente β₁ = ${ctx.b1}. La droite est y = β₀ + β₁x.`
      : 'La colonne de 1 porte l\'ordonnée à l\'origine β₀ ; la colonne des x porte la pente β₁. La droite est y = β₀ + β₁x.'),
    check: { judge: { kind: 'mat', expect: '(1;2)', lsq: { A: [[1, 0], [1, 1], [1, 2], [1, 3]], b: [2, 2, 4, 8], ask: 'x', line: true } }, prev: 'x', line: '(2;1)' },
  },
  l_lsq_normal_aat: {
    name: 'AAᵀ au lieu de AᵀA',
    judges: ['mat'],
    transform(prev, ctx) {
      const L = ctx?.cfg?.lsq;
      if (!L || L.ask !== 'AtA') return [];
      const A = L.A.map(Qv);
      return [{ node: node(qMat(MX.mul(A, MX.transpose(A)))), ctx: { n: A[0].length, m: A.length } }];
    },
    explain: (ctx = {}) => (ctx.n
      ? `On multiplie Ax = b à gauche par Aᵀ : AᵀA est ${ctx.n}×${ctx.n}, de la taille de x ; AAᵀ est ${ctx.m}×${ctx.m}.`
      : 'On multiplie Ax = b à gauche par Aᵀ : AᵀA est n×n, de la taille de x, alors que AAᵀ est m×m.'),
    check: { judge: { kind: 'mat', expect: '[[4,6],[6,14]]', lsq: { A: [[1, 0], [1, 1], [1, 2], [1, 3]], b: [2, 1, 2, 5], ask: 'AtA' } }, prev: 'AᵀA', line: '[[1,1,1,1],[1,2,3,4],[1,3,5,7],[1,4,7,10]]' },
  },
  l_inner_positivity: {
    name: 'uᵀAᵀAv n\'est pas toujours un produit scalaire',
    judges: [],
    explain: () => 'Si A n\'est pas inversible, il existe u ≠ 0 avec Au = 0, et alors ⟨u, u⟩ = ‖Au‖² = 0 : l\'axiome « défini positif » tombe.',
    check: { bait: { skill: 'l-orth-inner', exam: 'tf' } },
  },
};

// [[1,2],[3,4]] → rows of Q (null if not a plain matrix of numbers).
function parseMatrix(text) {
  try {
    const rows = JSON.parse(String(text).replace(/\s/g, '').replace(/(-?\d+\/\d+)/g, '"$1"'));
    return rows.map((r) => r.map((x) => q(String(x))));
  } catch { return null; }
}
