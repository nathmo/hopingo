// Traps of module A2, part c (step U6): partial derivatives and Jacobians,
// tangent planes, the chain rule, polar coordinates, the radial Laplacian,
// Taylor polynomials of order 2. Catalogue: docs/universite/A2-analyse-2.md,
// « Pièges du module » (the table itself is META in rules/a2.js).
//
// What the generators of js/content/uni/analyse2-c-*.js put in the judge's
// cfg for these traps (the start of a part is often a bare label, « J_u »,
// « π », that has no value):
//   mat:   cfg.expect (a Jacobian: its transpose); cfg.chain = {outerAtA,
//          productAtA, productNoInner} (texts of matrices)
//   value: cfg.chain = {coefAtA, coefNoInner}; cfg.lap = {n} (the
//          coefficient n − 1 asked); cfg.taylor = {fxy} (f_xy read on p₂)
//   geom:  cfg.tangent = {p: [texts], n: [texts], graph?: true} (the plane
//          n·(X − p) = 0); cfg.level = {p, n, c} (the surface F = c)
//   equiv: cfg.lap = {n, g} (Δ of g(r) in dimension n); cfg.jet (Taylor,
//          js/cas/jet.js: the candidates change one coefficient of the
//          previous line's Taylor polynomial)
// The other traps are final answers (options, true/false): check {bait}.

import { parse } from '../parse.js';
import { toText } from '../print.js';
import { readObject } from '../geomobj.js';
import { parseExpr, evalAst, envOf, valueText } from '../matexpr.js';
import { buildLine, mopts } from '../../judges/matcommon.js';
import { jet } from '../jet.js';

const tryV = (f) => { try { return f(); } catch { return null; } };
const fr = (s) => String(s).replace(/-/g, '−');

// ---------- helpers ----------

// A float as a short fraction text (denominator ≤ 720), else a decimal.
export function ratText(x) {
  if (Number.isInteger(x)) return String(x);
  for (let d = 2; d <= 720; d++) {
    const n = Math.round(x * d);
    if (Math.abs(n / d - x) < 1e-9 * (1 + Math.abs(x))) return `(${n}/${d})`;
  }
  return `(${String(x).replace('.', ',')})`;
}
// (x − a), or x.
const shiftT = (v, a) => (Number(a) === 0 ? v : `(${v}-(${a}))`);

const matLine = (cfg, text) => tryV(() => buildLine({ vars: cfg.vars, names: cfg.names }, text));
const matVal = (cfg, text) => evalAst(parseExpr(String(text), mopts(cfg)), { ...envOf(cfg) }, mopts(cfg));
const gl = (text) => tryV(() => ({ t: 'gline', text, obj: readObject(text, { dim: 3 }) }));

// Σ nᵢ(xᵢ ∓ pᵢ) = rhs.
const planeT = (n, p, sign, rhs = '0') => `${['x', 'y', 'z'].map((v, i) => `(${n[i]})(${v}${sign}(${p[i]}))`).join('+')} = ${rhs}`;

export const DEFS = {
  a2_jacobian_transposed: {
    name: 'Jacobienne transposée',
    judges: ['mat'],
    // The transpose of the expected matrix (m ≠ n, or a transpose that differs).
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      if (cfg.expect === undefined) return [];
      const v = matVal(cfg, cfg.expect);
      if (v?.k !== 'm' || v.rows.length < 2 || v.rows[0].length < 2) return [];
      const T = v.rows[0].map((_, j) => v.rows.map((r) => r[j]));
      const node = matLine(cfg, valueText({ k: 'm', rows: T }));
      return node ? [{ node, ctx: { m: v.rows.length, n: v.rows[0].length } }] : [];
    },
    check: { judge: { kind: 'mat', expect: '[[2,1,4],[-2,1,0]]' }, prev: 'J_u', line: '[[2,-2],[1,1],[4,0]]' },
  },
  a2_schwarz_no_c2: {
    name: 'Schwarz sans l\'hypothèse C²',
    judges: [],
    check: { bait: { skill: 'a2-partials', exam: 'tf' } },
  },
  a2_tangent_point_sign: {
    name: 'Plan tangent : (x + a) au lieu de (x − a)',
    judges: ['geom'],
    // n·(X + p) = 0 (only x and y for the graph z = c + …, every coordinate otherwise).
    transform(prev, ctx) {
      const t = ctx?.cfg?.tangent;
      if (!t) return [];
      const out = [];
      const p = t.p.map(String);
      if (p.every((x) => Number(x) === 0)) return [];
      const xy = [p[0], p[1], `-(${p[2]})`];
      const c1 = gl(planeT(t.n, xy, '+'));
      const c2 = gl(planeT(t.n, p, '+'));
      for (const c of [c1, c2]) if (c) out.push({ node: c, ctx: { p: `(${p.map(fr).join(' ; ')})`, 'p₁': fr(p[0]) } });
      return out;
    },
    check: { judge: { kind: 'geom', object: 'plane', ref: 'z = -x+7y+5', tangent: { p: ['1', '-1', '-3'], n: ['-1', '7', '-1'] } }, prev: 'π', line: 'z = -3-(x+1)+7(y-1)' },
  },
  a2_tangent_level_rhs: {
    name: 'Plan tangent : = c au lieu de = 0',
    judges: ['geom'],
    transform(prev, ctx) {
      const l = ctx?.cfg?.level;
      if (!l || Number(l.c) === 0) return [];
      const c = gl(planeT(l.n, l.p.map(String), '-', `(${l.c})`));
      return c ? [{ node: c, ctx: { c: fr(l.c) } }] : [];
    },
    check: { judge: { kind: 'geom', object: 'plane', ref: 'x+2y+3z = 8', level: { p: ['0', '1', '2'], n: ['4', '8', '12'], c: '10' } }, prev: 'π', line: '4x+8(y-1)+12(z-2) = 10' },
  },
  a2_chain_wrong_point: {
    name: 'J_f évaluée en a au lieu de g(a)',
    judges: ['mat', 'value'],
    transform(prev, ctx) {
      const ch = ctx?.cfg?.chain;
      if (!ch) return [];
      const info = { 'g(a)': ch.ga, a: ch.a };
      if (ctx.cfg.kind === 'value') return ch.coefAtA !== undefined ? [{ node: parse(String(ch.coefAtA)), ctx: info }] : [];
      return [ch.outerAtA, ch.productAtA].filter(Boolean).map((t) => matLine(ctx.cfg, t)).filter(Boolean).map((node) => ({ node, ctx: info }));
    },
    check: { judge: { kind: 'mat', expect: '[[2,1]]', chain: { outerAtA: '[[3,2]]', ga: '(1 ; 0)', a: '(1 ; 1)' } }, prev: 'J_f', line: '[[3,2]]' },
  },
  a2_chain_no_inner: {
    name: 'Règle de chaîne : un seul terme gardé',
    judges: ['mat', 'value'],
    transform(prev, ctx) {
      const ch = ctx?.cfg?.chain;
      if (!ch) return [];
      if (ctx.cfg.kind === 'value') return ch.coefNoInner !== undefined ? [{ node: parse(String(ch.coefNoInner)), ctx: {} }] : [];
      const node = ch.productNoInner ? matLine(ctx.cfg, ch.productNoInner) : null;
      return node ? [{ node, ctx: {} }] : [];
    },
    check: { judge: { kind: 'value', expect: '1', chain: { coefNoInner: '-1' } }, prev: 'd', line: '-1' },
    explain: () => 'h dépend de chaque variable à travers les deux composantes de g : ∂h/∂v = ∂f/∂x·∂g₁/∂v + ∂f/∂y·∂g₂/∂v. Il manque un des deux produits.',
  },
  a2_polar_grad_factor: {
    name: 'f̃_φ² sans le facteur 1/r²',
    judges: [],
    check: { bait: { skill: 'a2-chain-polar', exam: 'mcq' } },
  },
  a2_laplacian_n: {
    name: 'Laplacien radial : mauvais coefficient n − 1',
    judges: ['equiv', 'value'],
    // g″ + (k/r)g′ with k = 1, n or n − 2 instead of n − 1 (or only k, when k is asked).
    transform(prev, ctx) {
      const lap = ctx?.cfg?.lap;
      if (!lap) return [];
      const n = Number(lap.n);
      const ks = [...new Set([1, n, n - 2])].filter((k) => k !== n - 1 && k >= 0);
      if (ctx.cfg.kind === 'value') return ks.map((k) => ({ node: parse(String(k)), ctx: { n, 'n−1': n - 1 } }));
      if (!lap.g) return [];
      const g = lap.g;
      return ks.map((k) => ({ node: parse(`d(d(${g},r),r)+(${k}/r)×d(${g},r)`, { vars: ['r', 'α'] }), ctx: { n, 'n−1': n - 1 } }));
    },
    check: { judge: { kind: 'equiv', vars: ['r'], domain: { r: [0.1, 3] }, lap: { n: 3, g: 'r^4' }, target: 'no-prime' }, prev: 'd(d(r^4,r),r)+(2/r)×d(r^4,r)', line: '16r^2' },
  },
  a2_taylor_cross: {
    name: 'Taylor : coefficient de XY doublé ou divisé par 2',
    judges: ['equiv', 'value'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      if (cfg.kind === 'value') {
        const c = cfg.taylor?.fxy;
        if (c === undefined || Number(c) === 0) return [];
        return [{ node: parse(`2×(${c})`), ctx: { fxy: fr(c) } }, { node: parse(`(${c})/2`), ctx: { fxy: fr(c) } }];
      }
      if (!cfg.jet) return [];
      const [x, y] = cfg.vars || ['x', 'y'];
      const at = cfg.jet.at || {};
      const J = tryV(() => jet(prev, { vars: [x, y], at, order: 2 }));
      const c = J?.['1,1'];
      if (!Number.isFinite(c) || Math.abs(c) < 1e-12) return [];
      const XY = `${shiftT(x, at[x] ?? 0)}×${shiftT(y, at[y] ?? 0)}`;
      return [1, -1 / 2].map((k) => ({ node: parse(`(${toText(prev)})+${ratText(k * c)}×${XY}`, { vars: [x, y] }), ctx: { fxy: fr(ratText(c).replace(/[()]/g, '')) } }));
    },
    check: { judge: { kind: 'equiv', vars: ['x', 'y'], jet: { at: { x: 0, y: 0 }, order: 2 }, target: 'taylor2' }, prev: 'ln(1+2x-y+x y)', line: '2x-y-2x^2+6x y-y^2/2' },
  },
  a2_taylor_no_half: {
    name: 'Taylor : le ½ oublié',
    judges: ['equiv'],
    // The part of degree 2 doubled (all of it, or only X² and Y²).
    transform(prev, ctx) {
      const cfg = ctx?.cfg || {};
      if (!cfg.jet) return [];
      const [x, y] = cfg.vars || ['x', 'y'];
      const at = cfg.jet.at || {};
      const J = tryV(() => jet(prev, { vars: [x, y], at, order: 2 }));
      if (!J) return [];
      const X = shiftT(x, at[x] ?? 0);
      const Y = shiftT(y, at[y] ?? 0);
      const sq = [[J['2,0'], `${X}^2`], [J['0,2'], `${Y}^2`]];
      const all = [...sq, [J['1,1'], `${X}×${Y}`]];
      const add = (terms) => terms.filter(([c]) => Number.isFinite(c) && Math.abs(c) > 1e-12).map(([c, m]) => `+${ratText(c)}×${m}`).join('');
      const out = [];
      for (const terms of [all, sq]) {
        const extra = add(terms);
        if (extra && !out.some((o) => o.extra === extra)) out.push({ extra, node: parse(`(${toText(prev)})${extra}`, { vars: [x, y] }), ctx: {} });
      }
      return out.map(({ node, ctx: c }) => ({ node, ctx: c }));
    },
    check: { judge: { kind: 'equiv', vars: ['x', 'y'], jet: { at: { x: 0, y: 0 }, order: 2 }, target: 'taylor2' }, prev: 'cos(2x+3y+y^2)', line: '1-4x^2-12x y-9y^2' },
  },
  a2_taylor_no_truncate: {
    name: 'Taylor : termes de degré > 2 gardés',
    judges: [],
    check: { bait: { skill: 'a2-taylor2', exam: 'mcq' } },
  },
};
