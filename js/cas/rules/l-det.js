// Traps of module L, section « det » (determinants, Lay 3; see
// js/cas/rules/l.js). DEFS: {id: {name, judges, transform?, explain?, check}}.
//
// - Cofactor traps (judge det) replay a wrong expansion of each det(…) of
//   the previous line (detsOf), along its sparsest rows and columns; the
//   candidate is the previous line with that det replaced by the wrong
//   expansion (the judge compares values).
// - Row-operation traps (judge rowops, track 'det') replay the announced or
//   recognised operations (ctx.cfg._ops) on the previous matrix, with a
//   factor that forgets the swaps, the scalings or the c of Lᵢ ← cLᵢ + kLⱼ.
// - Traps on final values (judges value and mat) read the wrong values the
//   item puts in its judge: cfg.trapValues = {trapId: [text | {value, ctx}]}.

import * as MX from '../matrix.js';
import {
  Mx, simp, applyRowOp, ndet, evalAst, envOf, toQ, ONE, qn, parseExpr, isZeroScalar, sameScalar, exprML,
} from '../matexpr.js';
import { add, sub, mul, div, lit } from '../ast.js';
import { parse } from '../parse.js';
import { toText } from '../print.js';
import { detsOf } from '../../judges/det.js';
import { mopts } from '../../judges/matcommon.js';

const SUB = '₀₁₂₃₄₅₆₇₈₉';
const sb = (n) => String(n).split('').map((d) => SUB[d] ?? d).join('');
const T = (n) => toText(n).replace(/-/g, '−');

// ---------- cofactor expansions ----------

// A copy of a line's ast with one node replaced.
function replaceAst(a, target, by) {
  if (a === target) return by;
  if (!a || typeof a !== 'object' || !a.op) return a;
  const out = { ...a };
  for (const k of ['e', 'a', 'b']) if (a[k]) out[k] = replaceAst(a[k], target, by);
  if (a.items) out.items = a.items.map((x) => replaceAst(x, target, by));
  return out;
}

const minorOf = (rows, i, j) => rows.filter((_, r) => r !== i).map((r) => r.filter((_, c) => c !== j));
// Exact over ℚ when possible (fast), else on nodes (λ, a).
function detN(rows) {
  if (!rows.length) return ONE;
  const A = toQ(Mx(rows));
  return A ? lit(MX.det(A)) : ndet(rows);
}

// The rows and columns a student expands along: all of them up to 3 × 3,
// else the sparsest ones (at most one more non-zero entry than the sparsest).
function expansionLines(rows, opts) {
  const n = rows.length;
  const lines = [];
  for (let k = 0; k < n; k++) {
    lines.push({ kind: 'row', k, cells: rows[k].map((_, j) => [k, j]) });
    lines.push({ kind: 'col', k, cells: rows.map((_, i) => [i, k]) });
  }
  for (const l of lines) l.nz = l.cells.filter(([i, j]) => !isZeroScalar(rows[i][j], opts));
  const min = Math.min(...lines.map((l) => l.nz.length));
  return lines.filter((l) => l.nz.length && (n <= 3 || l.nz.length <= min + 1));
}

const trueSign = (i, j) => ((i + j) % 2 ? -1 : 1);

// Σ sign(i, j)·aᵢⱼ·det(minor(i, j)) along a line.
function expand(rows, line, sign, minor) {
  let s = lit(MX.q(0));
  for (const [i, j] of line.nz) {
    const t = mul(rows[i][j], detN(minor(i, j)));
    s = sign(i, j) > 0 ? add(s, t) : sub(s, t);
  }
  return simp(s);
}

// The previous line with det(M) replaced by `value`: a candidate line.
function withDet(prev, d, value, cfg) {
  const body = replaceAst(prev.body, d, { op: 'num', n: value });
  const v = evalAst(body, envOf(cfg), mopts(cfg));
  return { t: 'mline', ops: [], assigns: [], label: null, body, value: v, raw: true, ml: exprML(body) };
}

// For each det(…) of the previous line and each likely expansion line, the
// wrong expansions `variants(rows, line)` → [{value, ctx}].
function cofactorTrap(variants, { minSize }) {
  return (prev, ctx) => {
    if (!prev?.body) return [];
    const cfg = ctx?.cfg || {};
    const opts = mopts(cfg);
    const out = [];
    for (const d of detsOf(prev)) {
      let m;
      try { m = evalAst(d.e, envOf(cfg), opts); } catch { continue; }
      if (m?.k !== 'm' || m.rows.length !== m.rows[0].length) continue;
      const rows = m.rows;
      const n = rows.length;
      const numeric = !!toQ(m);
      if (n < minSize || (n === 2 && !numeric)) continue;
      const right = detN(rows);
      for (const line of expansionLines(rows, opts)) {
        for (const w of variants(rows, line)) {
          if (sameScalar(w.value, right, opts)) continue;
          try { out.push({ node: withDet(prev, d, w.value, cfg), ctx: w.ctx }); } catch { /* skip */ }
          if (out.length >= 16) return out;
        }
      }
    }
    return out;
  };
}

// Signs all +, or the checkerboard of the first row (column) used on any row (column).
function signVariants(rows, line) {
  const minor = (i, j) => minorOf(rows, i, j);
  const out = [];
  const signs = [() => 1, line.kind === 'row' ? (i, j) => ((j % 2) ? -1 : 1) : (i) => ((i % 2) ? -1 : 1)];
  for (const sign of signs) {
    const bad = line.nz.find(([i, j]) => sign(i, j) !== trueSign(i, j));
    if (!bad) continue;
    const [i, j] = bad;
    out.push({ value: expand(rows, line, sign, minor), ctx: { i: i + 1, j: j + 1, s: trueSign(i, j) > 0 ? '+1' : '−1' } });
  }
  return out;
}

// The minor of (i, j) with a neighbouring column (row expansion) or row
// (column expansion) struck instead.
function minorVariants(rows, line) {
  const n = rows.length;
  const out = [];
  for (const dir of [1, -1]) {
    const shift = (x) => (x + dir >= 0 && x + dir < n ? x + dir : x - dir);
    const minor = line.kind === 'row' ? (i, j) => minorOf(rows, i, shift(j)) : (i, j) => minorOf(rows, shift(i), j);
    const [i, j] = line.nz[0];
    const value = expand(rows, line, trueSign, minor);
    out.push({ value, ctx: line.kind === 'row' ? { i: i + 1, j: j + 1, wrong: `la colonne ${shift(j) + 1}` } : { i: i + 1, j: j + 1, wrong: `la ligne ${shift(i) + 1}` } });
  }
  return out;
}

// ---------- the factor of row operations (track 'det') ----------

const detFactorN = (op) => (op.kind === 'swap' ? qn(-1) : op.kind === 'scale' ? op.k : op.kind === 'combo' ? op.c : ONE);

// The next line with the right matrix and a factor that forgets the
// operations `forgot` picks.
function forgetFactor(forgot, ctxOf) {
  return (prev, ctx) => {
    const ops = ctx?.cfg?._ops;
    if (!ops?.length || !prev?.det || prev.value?.k !== 'm' || !ops.some(forgot)) return [];
    const rows = ops.reduce((r, op) => applyRowOp(r, op), prev.value.rows);
    const factor = ops.reduce((f, op) => (forgot(op) ? f : simp(div(f, detFactorN(op)))), prev.factor ?? ONE);
    const node = { t: 'mline', ops: [], assigns: [], label: null, body: null, det: true, factor, value: Mx(rows, { aug: prev.value.aug }) };
    return [{ node, ctx: ctxOf(ops.filter(forgot)) }];
  };
}

// ---------- wrong final values given by the item ----------

function fromCfg(id) {
  return (prev, ctx) => {
    const cfg = ctx?.cfg || {};
    const list = cfg.trapValues?.[id];
    if (!list?.length) return [];
    const out = [];
    for (const w of list) {
      const text = typeof w === 'object' ? w.value : w;
      try {
        if (cfg.kind === 'mat') {
          const value = evalAst(parseExpr(String(text), mopts(cfg)), envOf(cfg), mopts(cfg));
          out.push({ node: { t: 'mline', ops: [], assigns: [], label: null, body: null, value }, ctx: w.ctx || {} });
        } else out.push({ node: parse(String(text), { vars: cfg.vars || [] }), ctx: w.ctx || {} });
      } catch { /* skip */ }
    }
    return out;
  };
}

export const DEFS = {
  l_cofactor_sign: {
    name: 'Signe du damier oublié',
    judges: ['det'],
    transform: cofactorTrap(signVariants, { minSize: 2 }),
    explain: (ctx = {}) => (ctx.i
      ? `La case (${ctx.i}, ${ctx.j}) porte le signe (−1)^(${ctx.i}+${ctx.j}) = ${ctx.s}. Le damier commence par + en haut à gauche : + − + / − + − / + − +.`
      : 'Chaque terme du développement porte le signe (−1)^(i+j) de sa case. Le damier commence par + en haut à gauche : + − + / − + − / + − +.'),
    check: { judge: { kind: 'det' }, prev: 'det[[2,0,1,3],[0,0,4,0],[1,-1,2,0],[3,0,5,1]]', line: '4·det[[2,0,3],[1,-1,0],[3,0,1]]' },
  },
  l_minor_wrong: {
    name: 'Mauvais mineur',
    judges: ['det'],
    transform: cofactorTrap(minorVariants, { minSize: 3 }),
    explain: (ctx = {}) => (ctx.i
      ? `Le mineur A${sb(ctx.i)}${sb(ctx.j)} s'obtient en barrant la ligne ${ctx.i} <b>et</b> la colonne ${ctx.j} de la case développée. Tu as barré ${ctx.wrong} à la place.`
      : 'Le mineur Aᵢⱼ s\'obtient en barrant la ligne i <b>et</b> la colonne j de la case développée, et rien d\'autre.'),
    check: { judge: { kind: 'det' }, prev: 'det[[2,0,1,3],[0,0,4,0],[1,-1,2,0],[3,0,5,1]]', line: '-4·det[[2,1,3],[1,2,0],[3,5,1]]' },
  },
  l_det_swap_sign: {
    name: 'Échange sans changer le signe',
    judges: ['rowops'],
    transform: forgetFactor((op) => op.kind === 'swap', (ops) => ({ s: ops.length })),
    explain: (ctx = {}) => (ctx.s
      ? `Chaque échange de deux lignes change le signe du déterminant. Tu en as fait ${ctx.s} : le facteur devant det change ${ctx.s > 1 ? `${ctx.s} fois ` : ''}de signe.`
      : 'Chaque échange de deux lignes change le signe du déterminant : le facteur devant det doit changer de signe.'),
    check: { judge: { kind: 'rowops', track: 'det' }, prev: 'det[[0,2],[3,4]]', line: 'L1 ↔ L2 : det[[3,4],[0,2]]' },
  },
  l_det_scale_row: {
    name: 'Ligne multipliée sans corriger det',
    judges: ['rowops'],
    transform: forgetFactor((op) => op.kind === 'scale', (ops) => ({ k: T(ops[0].k), inv: T(simp(div(ONE, ops[0].k))) })),
    explain: (ctx = {}) => (ctx.k
      ? `Multiplier une ligne par ${ctx.k} multiplie det par ${ctx.k} : pour garder la même valeur, le facteur devant det est multiplié par ${ctx.inv}.`
      : 'Multiplier une ligne par k multiplie det par k : le facteur devant det doit être divisé par k (c\'est « sortir un facteur »).'),
    check: { judge: { kind: 'rowops', track: 'det' }, prev: 'det[[2,4],[3,4]]', line: 'L1 ← (1/2)L1 : det[[1,2],[3,4]]' },
  },
  l_det_rowop_combo: {
    name: 'Lᵢ ← cLᵢ + kLⱼ compté sans effet',
    judges: ['rowops'],
    transform: forgetFactor((op) => op.kind === 'combo', (ops) => ({ i: ops[0].i + 1, c: T(ops[0].c), inv: T(simp(div(ONE, ops[0].c))) })),
    explain: (ctx = {}) => (ctx.i
      ? `L${sb(ctx.i)} ← ${ctx.c}L${sb(ctx.i)} + … multiplie la ligne ${ctx.i} par ${ctx.c} avant d'ajouter : det est multiplié par ${ctx.c}, donc le facteur devant det par ${ctx.inv}.`
      : 'Lᵢ ← cLᵢ + kLⱼ multiplie la ligne i par c avant d\'ajouter : det est multiplié par c. Seule Lᵢ ← Lᵢ + kLⱼ garde det.'),
    check: { judge: { kind: 'rowops', track: 'det' }, prev: 'det[[2,4],[3,4]]', line: 'L2 ← 2L2 - 3L1 : det[[2,4],[0,-4]]' },
  },
  l_det_sum: {
    name: 'det additif',
    judges: ['value'],
    transform: fromCfg('l_det_sum'),
    explain: (ctx = {}) => `Le déterminant n'est pas additif : avec A = B = I₂, det(A + B) = det(2I₂) = 4 mais det A + det B = 2.${ctx.why ? ` ${ctx.why}` : ''}`,
    check: { judge: { kind: 'value', expect: '12', trapValues: { l_det_sum: ['6'] } }, prev: 'D', line: '6' },
  },
  l_det_scalar: {
    name: 'det(kA) = k·det A',
    judges: ['value'],
    transform: fromCfg('l_det_scalar'),
    explain: (ctx = {}) => (ctx.n
      ? `${ctx.k}A multiplie <b>chacune</b> des ${ctx.n} lignes de A par ${ctx.k} : det est multiplié par ${ctx.k}^${ctx.n} = ${ctx.p}, pas par ${ctx.k}.`
      : 'kA multiplie <b>chacune</b> des n lignes de A par k : det(kA) = kⁿ·det A, pas k·det A.'),
    check: { judge: { kind: 'value', expect: '48', trapValues: { l_det_scalar: [{ value: '6', ctx: { k: 2, n: 4, p: 16 } }] } }, prev: 'D', line: '6' },
  },
  l_det_transpose_sign: {
    name: 'det(Aᵀ) = −det A',
    judges: ['value'],
    transform: fromCfg('l_det_transpose_sign'),
    explain: () => 'det(Aᵀ) = det A : transposer ne change pas le déterminant (développer selon une ligne de Aᵀ, c\'est développer selon une colonne de A). Contre-exemple immédiat à −det A : A = I.',
    check: { judge: { kind: 'value', expect: '6', trapValues: { l_det_transpose_sign: ['-6'] } }, prev: 'D', line: '-6' },
  },
  l_area_half_abs: {
    name: 'Aire sans ½ ou sans valeur absolue',
    judges: ['value'],
    transform: fromCfg('l_area_half_abs'),
    explain: (ctx = {}) => {
      if (ctx.half && ctx.d) return `Un triangle est la moitié du parallélogramme, et une aire est positive : ½·|${ctx.d}| = ${ctx.area}.`;
      if (ctx.d) return `Une aire (ou un volume) est positive : on prend la valeur absolue du déterminant, |${ctx.d}| = ${ctx.area}${ctx.factor ? `, multipliée par ${ctx.factor}` : ''}.`;
      return 'Un triangle est la moitié du parallélogramme, et une aire est positive : aire = ½·|det[u v]|.';
    },
    check: { judge: { kind: 'value', expect: '11/2', trapValues: { l_area_half_abs: [{ value: '11', ctx: { half: true, d: '11', area: '11/2' } }] } }, prev: 'S', line: '11' },
  },
  l_cramer_row: {
    name: 'Cramer : ligne remplacée',
    judges: ['mat', 'value'],
    transform: fromCfg('l_cramer_row'),
    explain: (ctx = {}) => (ctx.i
      ? `Cramer remplace la <b>colonne</b> ${ctx.i} de A (les coefficients de x${sb(ctx.i)}) par b, pas la ligne ${ctx.i}.`
      : 'Cramer remplace la <b>colonne</b> de l\'inconnue (ses coefficients dans chaque équation) par b, pas une ligne.'),
    check: { judge: { kind: 'mat', expect: '1', trapValues: { l_cramer_row: [{ value: '19/10', ctx: { i: 1 } }] } }, prev: 'x', line: 'det[[7,9],[1,4]]/10' },
  },
};
