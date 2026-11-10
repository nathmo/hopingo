// Traps of step U2, part a1c (spec §7): développements limités, limits by
// DL, reading f⁽ᵏ⁾(a) on a DL, Taylor's remainder. Catalogue:
// docs/universite/A1-analyse-1.md, « Pièges du module ».
//
// Judge `series`: a trap replays the mistake on the previous line (a usual
// function written with wrong coefficients, a factor truncated too early…)
// and the candidate is written as a DL at the order asked (cfg.order), so
// that the judge's own comparison (same coefficients, same order) names it.
// Judge `limit`: the candidate is a line with the wrong limit (the DL cut
// too early gives 0). Judge `value`: the generator puts what the trap needs
// in the judge's cfg (cfg.read = {k, a}: f⁽ᵏ⁾(a) asked, aₖ the coefficient).
// Judge `equiv` with rel '≤': cfg.taylorAt lists the bounds a student gets
// with |f⁽ⁿ⁺¹⁾(a)| instead of the maximum on the interval.
// `check`: see js/cas/rules/g9.js.

import { Q } from '../../math/rational.js';
import { parse } from '../parse.js';
import { toText, toReadable } from '../print.js';
import { stripParen, walk, replaceAt, dependsOn, canonFn, numValue } from '../ast.js';
import { series, seriesToNode } from '../series.js';

const ZERO = new Q(0);
const isQ = (c) => c instanceof Q;
const cZero = (c) => (isQ(c) ? c.n === 0 : Math.abs(c) < 1e-12);
const vOf = (ctx) => ctx?.cfg?.v || ctx?.v || 'x';
const orderOf = (ctx) => ctx?.cfg?.order ?? 4;
const fact = (k) => { let f = 1; for (let i = 2; i <= k; i++) f *= i; return f; };
const P = (t) => parse(t);
const R = (n) => toReadable(stripParen(n));

function sOf(node, v, n) {
  try { return series(node, v, 0, n); } catch { return null; }
}

// The candidate as a DL at order n (or lower if it is known to less):
// Σ cₖxᵏ + xᵐ·ε(x).
function asDL(node, v, n) {
  const s = sOf(node, v, n);
  if (!s) return null;
  const m = Math.min(n, s.order);
  if (m < 0) return null;
  return seriesToNode({ lo: Math.min(0, s.lo), order: m, remainder: true, coef: (k) => (k <= m ? s.coef(k) : ZERO) }, v, 0);
}

// A coefficient as text, for a polynomial written in u: (3/4), (−2), 0.71828…
const cText = (c) => (isQ(c) ? `(${c.toString()})` : `(${c})`);
// Σ c(k)·(U)^k for k = 0 … K, as text.
function polyIn(U, c, K) {
  const parts = [];
  for (let k = 0; k <= K; k++) {
    const a = c(k);
    if (!a || cZero(a)) continue;
    parts.push(k === 0 ? cText(a) : `${cText(a)}×(${U})^${k}`);
  }
  return parts.length ? parts.join('+') : '0';
}

// ---------- usual functions ----------

const binom = (alpha, k) => { let c = new Q(1); for (let i = 0; i < k; i++) c = c.mul(alpha.sub(i)).div(i + 1); return c; };
const SIGN = (k) => (k % 2 ? -1 : 1);
const COEF = {
  exp: (k) => new Q(1, fact(k)),
  sin: (k) => (k % 2 ? new Q(SIGN((k - 1) / 2), fact(k)) : ZERO),
  cos: (k) => (k % 2 ? ZERO : new Q(SIGN(k / 2), fact(k))),
  sinh: (k) => (k % 2 ? new Q(1, fact(k)) : ZERO),
  cosh: (k) => (k % 2 ? ZERO : new Q(1, fact(k))),
  arctan: (k) => (k % 2 ? new Q(SIGN((k - 1) / 2), k) : ZERO),
  ln1p: (k) => (k === 0 ? ZERO : new Q(SIGN(k + 1), k)),
};
const coefFn = (u) => (u.F === 'pow' ? (k) => binom(u.alpha, k) : COEF[u.F]);
const WITH_FACT = new Set(['exp', 'sin', 'cos', 'sinh', 'cosh', 'pow']);
const NAME = { exp: 'eᵘ', sin: 'sin u', cos: 'cos u', sinh: 'sinh u', cosh: 'cosh u', arctan: 'Arctg u', ln1p: 'Log(1 + u)', pow: '(1 + u)^α' };

const constOf = (g, v) => { const s = sOf(g, v, 0); return s ? s.coef(0) : null; };

// A usual function at node n: {F, g (its argument), alpha?, c (g(0))}, or null.
function usual(n, v) {
  n = stripParen(n);
  let F = null;
  let g = null;
  let alpha = null;
  if (n.t === 'fn' && n.args.length === 1) {
    const name = canonFn(n.name);
    g = n.args[0];
    if (['exp', 'sin', 'cos', 'sinh', 'cosh', 'arctan'].includes(name)) F = name;
    else if (name === 'ln') F = 'ln1p';
  } else if (n.t === 'pow') {
    const b = stripParen(n.b);
    if (b.t === 'const' && b.name === 'e') { F = 'exp'; g = n.e; } else {
      const a = numValue(stripParen(n.e));
      if (a && dependsOn(n.b, v)) { F = 'pow'; g = n.b; alpha = a; }
    }
  } else if (n.t === 'sqrt') { F = 'pow'; g = n.e; alpha = new Q(1, 2); } else if (n.t === 'frac' && numValue(stripParen(n.n))?.eq(1)) {
    const d = stripParen(n.d);
    if (d.t === 'pow' && numValue(stripParen(d.e))) { F = 'pow'; g = d.b; alpha = numValue(stripParen(d.e)).neg(); } else if (d.t === 'sqrt') { F = 'pow'; g = d.e; alpha = new Q(-1, 2); } else { F = 'pow'; g = d; alpha = new Q(-1); }
  }
  if (!F || !dependsOn(g, v)) return null;
  const c = constOf(g, v);
  if (c === null) return null;
  return { F, g, alpha, c, node: n };
}

// The variable u → 0 of a usual function: g for exp, sin…, g − 1 for
// ln and the powers (null when g(0) is not the centre).
function uOf(u) {
  const centre = u.F === 'ln1p' || u.F === 'pow' ? 1 : 0;
  if (!isQ(u.c) || !u.c.eq(centre)) return null;
  return centre ? `${toText(u.g)}-1` : toText(u.g);
}

// Each sub-expression matching fn, replaced: [{node, path, repl, ctx}].
function each(prev, v, fn) {
  const out = [];
  walk(prev, (n, path) => {
    const r = fn(n, path);
    if (r) for (const x of [].concat(r)) out.push({ node: replaceAt(prev, path, x.repl), ctx: x.ctx || {} });
    return true;
  });
  return out;
}
const asCands = (list, v, n) => list.map((c) => ({ node: asDL(c.node, v, n), ctx: c.ctx })).filter((c) => c.node);

// The polynomial part of a series up to degree j, as text (no remainder).
function truncText(s, j) {
  const parts = [];
  for (let k = Math.min(0, s.lo); k <= j; k++) {
    const c = s.coef(k);
    if (cZero(c)) continue;
    parts.push(k === 0 ? cText(c) : `${cText(c)}×x^${k}`);
  }
  return parts.length ? parts.join('+') : '0';
}
const nonZeroBetween = (s, a, b) => { for (let k = a; k <= b; k++) if (!cZero(s.coef(k))) return true; return false; };

// An operand of a product or a quotient, an argument, a base: a factor.
function isFactorPath(prev, path) {
  if (!path.length) return false;
  const last = path[path.length - 1];
  let parent = prev;
  for (const k of path.slice(0, -1)) {
    const dot = k.indexOf('.');
    parent = dot > 0 ? parent[k.slice(0, dot)][Number(k.slice(dot + 1))] : parent[k];
  }
  if (parent.t === 'paren') return false;
  if (parent.t === 'bin' && parent.op === '×') return true;
  if (parent.t === 'frac') return true;
  if (parent.t === 'fn' || parent.t === 'sqrt') return true;
  if (parent.t === 'pow' && last === 'b') return true;
  return false;
}

// The leading term c·x^v of a series, as text.
const leadText = (s) => {
  const k = s.valuation;
  return `${cText(s.coef(k))}×x^${k}`;
};

export const RULES = [
  {
    id: 'a1_dl_factorial_missing', family: 'facts', tag: 'E', skill: 'a1-dl-usual', repair: 'a1-dl-usual', judges: ['series', 'limit'],
    name: 'Coefficients du DL sans le k!',
    example: ['eˣ = 1 + x + x² + x³ + x³·ε(x)', 'eˣ = 1 + x + x²/2 + x³/6 + x³·ε(x)'],
    check: { judge: { kind: 'series', v: 'x', at: 0, order: 3 }, prev: 'e^x', line: '1+x+x^2+x^3+x^3ε(x)' },
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const lim = ctx?.cfg?.kind === 'limit';
      const n = lim ? 6 : orderOf(ctx);
      const list = each(prev, v, (node) => {
        const u = usual(node, v);
        if (!u || !WITH_FACT.has(u.F)) return null;
        const U = uOf(u);
        if (!U) return null;
        const c = coefFn(u);
        return { repl: P(`(${polyIn(U, (k) => c(k).mul(fact(k)), n)})`), ctx: { f: NAME[u.F] } };
      });
      return lim ? list : asCands(list, v, n);
    },
    explain: () => 'Les coefficients du DL sont f⁽ᵏ⁾(0)/k! : eˣ = 1 + x + x²/2! + x³/3! + …, et non 1 + x + x² + x³. N\'oublie pas de diviser par k!.',
  },
  {
    id: 'a1_dl_factor_out_constant', family: 'rule', tag: 'E', skill: 'a1-dl-usual', repair: 'a1-dl-usual', judges: ['series'],
    name: '1/(1 + u) appliqué sans mettre la constante en facteur',
    example: ['1/(4 + 3x) = 1 − 3x + 9x² + x²·ε(x)', '1/(4 + 3x) = (1/4)(1 − 3x/4 + 9x²/16) + x²·ε(x)'],
    check: { judge: { kind: 'series', v: 'x', at: 0, order: 2 }, prev: '1/(4+3x)', line: '1-3x+9x^2+x^2ε(x)' },
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const n = orderOf(ctx);
      const list = each(prev, v, (node) => {
        const u = usual(node, v);
        if (!u || u.F !== 'pow' || !isQ(u.c) || u.c.eq(1) || u.c.n <= 0) return null;
        const W = `${toText(u.g)}-${cText(u.c)}`;
        const body = polyIn(W, (k) => binom(u.alpha, k), n);
        const out = [{ repl: P(`(${body})`), ctx: { b: u.c.toString(), g: R(u.g) } }];
        if (u.alpha.d === 1) {
          const ba = u.alpha.n >= 0 ? u.c.pow(u.alpha.n) : new Q(1).div(u.c.pow(-u.alpha.n));
          out.push({ repl: P(`${cText(ba)}×(${body})`), ctx: { b: u.c.toString(), g: R(u.g) } });
        }
        return out;
      });
      return asCands(list, v, n);
    },
    explain: (ctx = {}) => (ctx.b
      ? `Le DL de 1/(1 + u) demande un 1 devant u. Écris d'abord ${ctx.g} = ${ctx.b}(1 + …) : la constante ${ctx.b} sort en facteur, et u est divisé par ${ctx.b}.`
      : 'Le DL de 1/(1 + u) demande un 1 devant u : écris d\'abord 4 + 3x = 4(1 + 3x/4), puis applique le DL avec u = 3x/4.'),
  },
  {
    id: 'a1_dl_remainder_wrong_order', family: 'notation', tag: 'E', skill: 'a1-dl-usual', repair: 'a1-dl-usual', judges: ['series'],
    name: 'Reste écrit à un autre ordre que le dernier terme gardé',
    example: ['sin x = x − x³/6 + x⁵·ε(x)', 'sin x = x − x³/6 + x³·ε(x)'],
    check: { judge: { kind: 'series', v: 'x', at: 0, order: 3 }, prev: 'sin(x)', line: 'x-x^3/6+x^5ε(x)' },
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const n = orderOf(ctx);
      const s = sOf(prev, v, n);
      if (!s || s.order < n) return [];
      return [1, 2].map((d) => ({
        node: seriesToNode({ lo: Math.min(0, s.lo), order: n + d, remainder: true, coef: (k) => (k <= n ? s.coef(k) : ZERO) }, v, 0),
        ctx: { n, m: n + d },
      }));
    },
    explain: (ctx = {}) => (ctx.n !== undefined
      ? `Le reste se met à l'ordre du dernier terme calculé : tu as calculé jusqu'à x^${ctx.n}, donc le reste est x^${ctx.n}·ε(x). Avec x^${ctx.m}·ε(x), tu affirmes que les termes en x^${ctx.n + 1}… sont nuls.`
      : 'Le reste se met à l\'ordre du dernier terme calculé : x − x³/6 + x³·ε(x). Un reste d\'un ordre plus haut affirme des termes nuls que tu n\'as pas calculés.'),
  },
  {
    id: 'a1_dl_truncate_inner', family: 'method', tag: 'C', skill: 'a1-dl-compose', repair: 'a1-dl-ops', judges: ['series'],
    name: 'Dans uᵏ, seul le terme principal de u est gardé',
    example: ['sin(sin x) = x − x³/3 + x⁵/60 + x⁵·ε(x)', 'sin(sin x) = x − x³/3 + x⁵/10 + x⁵·ε(x)'],
    check: { judge: { kind: 'series', v: 'x', at: 0, order: 5 }, prev: 'sin(sin(x))', line: 'x-x^3/3+x^5/60+x^5ε(x)' },
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const n = orderOf(ctx);
      const list = each(prev, v, (node) => {
        const u = usual(node, v);
        const U = u && uOf(u);
        if (U) {
          const su = sOf(P(U), v, n);
          if (!su || su.valuation === null || su.valuation < 1 || !nonZeroBetween(su, su.valuation + 1, n)) return null;
          const c = coefFn(u);
          const L = leadText(su);
          const body = [cText(c(0)), `${cText(c(1))}×(${U})`];
          for (let k = 2; k <= n; k++) if (!cZero(c(k))) body.push(`${cText(c(k))}×(${L})^${k}`);
          return { repl: P(`(${body.join('+')})`), ctx: { u: R(P(U)) } };
        }
        // (u)^k written out: only the leading term of u.
        const s = stripParen(node);
        if (s.t !== 'pow') return null;
        const k = numValue(stripParen(s.e));
        if (!k || !k.isInt() || k.n < 2) return null;
        const sb = sOf(s.b, v, n);
        if (!sb || sb.valuation === null || sb.valuation < 1 || !nonZeroBetween(sb, sb.valuation + 1, n)) return null;
        return { repl: P(`(${leadText(sb)})^${k.n}`), ctx: { u: R(s.b) } };
      });
      return asCands(list, v, n);
    },
    explain: (ctx = {}) => `Dans uᵏ, garde tous les termes de degré ≤ n, pas seulement le premier${ctx.u ? ` de u = ${ctx.u}` : ''} : dans (x − x³/6)³, le terme 3·x²·(−x³/6) = −x⁵/2 est d'ordre 5 et compte.`,
  },
  {
    id: 'a1_dl_truncate_early', family: 'method', tag: 'E', skill: 'a1-dl-ops', repair: 'a1-dl-ops', judges: ['series'],
    name: 'Un facteur développé à un ordre trop bas',
    example: ['eˣ·sin x avec eˣ = 1 + x : x + x² − x³/6 + x³·ε(x)', 'eˣ·sin x = x + x² + x³/3 + x³·ε(x)'],
    check: { judge: { kind: 'series', v: 'x', at: 0, order: 3 }, prev: 'e^x×sin(x)', line: 'x+x^2-x^3/6+x^3ε(x)' },
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const n = orderOf(ctx);
      const list = each(prev, v, (node, path) => {
        if (!isFactorPath(prev, path) || !dependsOn(node, v) || stripParen(node).t === 'sym') return null;
        const s = sOf(node, v, n);
        if (!s) return null;
        const out = [];
        for (const j of [n - 1, n - 2]) {
          if (j < 0 || !nonZeroBetween(s, j + 1, Math.min(n, s.order))) continue;
          out.push({ repl: P(`(${truncText(s, j)})`), ctx: { f: R(node), j } });
        }
        return out;
      });
      return asCands(list, v, n);
    },
    explain: (ctx = {}) => (ctx.f
      ? `Tu as arrêté ${ctx.f} à l'ordre ${ctx.j} : il manque des termes qui comptent dans le résultat. Développe chaque facteur assez loin (en tenant compte du premier terme de l'autre facteur).`
      : 'sin x commence en x : pour avoir les x³ de eˣ·sin x, il faut eˣ jusqu\'à x². Développe chaque facteur assez loin.'),
  },
  {
    id: 'a1_dl_cube_coeffs', family: 'distribute', tag: 'C', skill: 'a1-dl-ops', repair: 'lit-polynomial', judges: ['series'],
    name: 'Puissance d\'un DL distribuée sur ses termes',
    example: ['(1 + x + x²·ε(x))³ = 1 + x + x²·ε(x)', '(1 + x)³ = 1 + 3x + 3x² + …'],
    check: { judge: { kind: 'series', v: 'x', at: 0, order: 2 }, prev: '(1+2x+3x^2+x^2ε(x))^3', line: '1+8x+27x^2+x^2ε(x)' },
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const n = orderOf(ctx);
      const list = each(prev, v, (node) => {
        const s = stripParen(node);
        if (s.t !== 'pow') return null;
        const k = numValue(stripParen(s.e));
        const b = stripParen(s.b);
        if (!k || !k.isInt() || k.n < 2 || !(b.t === 'bin' && (b.op === '+' || b.op === '-'))) return null;
        const sb = sOf(s.b, v, n);
        if (!sb) return null;
        const m = Math.min(n, sb.order);
        const a = [];
        const t = [];
        for (let j = 0; j <= m; j++) {
          const c = sb.coef(j);
          if (cZero(c)) continue;
          const ck = isQ(c) ? c.pow(k.n) : c ** k.n;
          a.push(j ? `${cText(ck)}×x^${j}` : cText(ck));
          t.push(j ? `${cText(ck)}×x^${j * k.n}` : cText(ck));
        }
        if (!a.length) return null;
        const rem = sb.remainder ? `+x^${m}×ε(x)` : '';
        return [{ repl: P(`(${a.join('+')}${rem})`), ctx: { k: k.n } }, { repl: P(`(${t.join('+')}${rem})`), ctx: { k: k.n } }];
      });
      return asCands(list, v, n);
    },
    explain: (ctx = {}) => `Une puissance ne se distribue pas sur une somme : (a + bx + cx²)${ctx.k ? `^${ctx.k}` : '³'} se développe, avec tous les produits croisés. Par exemple (1 + x)³ = 1 + 3x + 3x² + x³.`,
  },
  {
    id: 'a1_dl_compose_nonzero_inner', family: 'rule', tag: 'C', skill: 'a1-dl-compose', repair: 'a1-dl-compose', judges: ['series'],
    name: 'DL de f en 0 appliqué à u qui ne tend pas vers 0',
    example: ['e^(1/(1 − x)) = 5/2 + 2x + 5x²/2 + x²·ε(x)', 'e^(1/(1 − x)) = e(1 + x + 3x²/2) + x²·ε(x)'],
    check: { judge: { kind: 'series', v: 'x', at: 0, order: 2 }, prev: 'e^(1/(1-x))', line: '5/2+2x+(5/2)x^2+x^2ε(x)' },
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const n = orderOf(ctx);
      const list = each(prev, v, (node) => {
        const u = usual(node, v);
        if (!u || !['exp', 'sin', 'cos'].includes(u.F) || cZero(u.c)) return null;
        return { repl: P(`(${polyIn(toText(u.g), COEF[u.F], n)})`), ctx: { g: R(u.g), c: isQ(u.c) ? u.c.toString() : String(u.c) } };
      });
      return asCands(list, v, n);
    },
    explain: (ctx = {}) => (ctx.g
      ? `${ctx.g} tend vers ${ctx.c}, pas vers 0 : le DL de eᵘ en 0 ne s'applique pas à u = ${ctx.g}. Sors la constante : e^(${ctx.g}) = e^${ctx.c}·e^(${ctx.g} − ${ctx.c}).`
      : '1/(1 − x) tend vers 1, pas vers 0 : le DL de eᵘ en 0 ne s\'applique pas. Sors e¹ : e^(1/(1 − x)) = e·e^(1/(1 − x) − 1).'),
  },
  {
    // U4: skill a1-fn-limits (the catalogue's skill of this trap).
    id: 'a1_ipe_in_sum', family: 'rule', tag: 'C', skill: 'a1-dl-limits', repair: 'a1-dl-limits', judges: ['limit'],
    name: 'Équivalent remplacé dans une somme',
    example: ['(x − sin x)/x³ avec sin x ~ x : (x − x)/x³ → 0', '(x − sin x)/x³ → 1/6'],
    check: { judge: { kind: 'limit', v: 'x', to: '0' }, prev: '(x-sin(x))/x^3', line: '0' },
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const swaps = [];
      // Down through parentheses: [node, path].
      const down = (n, path) => (n.t === 'paren' ? down(n.e, [...path, 'e']) : [n, path]);
      walk(prev, (n, path) => {
        if (!(n.t === 'bin' && (n.op === '+' || n.op === '-'))) return true;
        for (const side of ['l', 'r']) {
          let [t, p] = down(n[side], [...path, side]);
          if (t.t === 'neg') [t, p] = down(t.e, [...p, 'e']);
          if (t.t === 'bin' && t.op === '×' && !dependsOn(t.l, v)) [t, p] = down(t.r, [...p, 'r']);
          const u = usual(t, v);
          if (!u || !['sin', 'arctan', 'sinh', 'ln1p'].includes(u.F)) continue;
          const U = uOf(u);
          if (!U) continue;
          swaps.push({ path: p, repl: P(`(${U})`), f: R(t), u: R(P(U)) });
        }
        return true;
      });
      const out = swaps.map((w) => ({ node: replaceAt(prev, w.path, w.repl), ctx: { f: w.f, u: w.u } }));
      if (swaps.length > 1) {
        let all = prev;
        for (const w of swaps) all = replaceAt(all, w.path, w.repl);
        out.push({ node: all, ctx: { f: swaps[0].f, u: swaps[0].u } });
      }
      return out;
    },
    explain: (ctx = {}) => `On ne remplace par un équivalent que dans un produit ou un quotient, jamais dans une somme${ctx.f ? ` : remplacer ${ctx.f} par ${ctx.u} fait disparaître le terme qui compte` : ''}. Dans x − sin x, les x s'annulent : il faut le terme suivant du DL.`,
  },
  {
    id: 'a1_dl_order_too_low', family: 'method', tag: 'E', skill: 'a1-dl-limits', repair: 'a1-dl-usual', judges: ['limit'],
    name: 'DL pas assez long pour le dénominateur',
    example: ['(eˣ − 1 − x)/x² avec eˣ = 1 + x + x·ε(x) : → 0', '(eˣ − 1 − x)/x² → 1/2 (DL d\'ordre 2)'],
    check: { judge: { kind: 'limit', v: 'x', to: '0' }, prev: '(e^x-1-x)/x^2', line: '0' },
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const s = stripParen(prev);
      const parts = s.t === 'frac' ? [s.n, s.d] : s.t === 'bin' && s.op === '/' ? [s.l, s.r] : null;
      if (!parts) return [];
      const sd = sOf(parts[1], v, 8);
      const sn = sOf(parts[0], v, 8);
      if (!sd || !sn || !sd.valuation || sd.valuation < 1) return [];
      if (sn.valuation !== sd.valuation) return [];
      const d = sd.valuation;
      return [{ node: P('0'), ctx: { k: d - 1, m: 1, d } }];
    },
    explain: (ctx = {}) => (ctx.d
      ? `Avec un DL d'ordre ${ctx.k}, il reste ε(x)/x${ctx.m > 1 ? `^${ctx.m}` : ''}, qui ne dit rien. Le dénominateur est en x^${ctx.d} : développe le numérateur jusqu'à x^${ctx.d}.`
      : 'Un DL trop court laisse un ε(x)/x qui ne dit rien : développe le numérateur jusqu\'à la puissance du dénominateur.'),
  },
  {
    id: 'a1_dl_read_factorial', family: 'rule', tag: 'C', skill: 'a1-dl-read', repair: 'a1-dl-read', judges: ['value'],
    name: 'f⁽ᵏ⁾(a) lu comme le coefficient aₖ',
    example: ['f = 7 − 5(x − 1)² + … : f″(1) = −5', 'f″(1) = 2!·(−5) = −10'],
    check: { judge: { kind: 'value', expect: '-10', read: { k: 2, a: '-5' } }, prev: 'f_2', line: '-5' },
    transform: (prev, ctx) => {
      const r = ctx?.cfg?.read;
      if (!r) return [];
      return [{ node: P(r.a), ctx: { k: r.k, kf: fact(r.k) } }];
    },
    explain: (ctx = {}) => (ctx.k
      ? `Le coefficient vaut f⁽ᵏ⁾(a)/k! : multiplie par ${ctx.k}! = ${ctx.kf}.`
      : 'Le coefficient aₖ vaut f⁽ᵏ⁾(a)/k! : pour avoir f⁽ᵏ⁾(a), multiplie aₖ par k!.'),
  },
  {
    id: 'a1_dl_read_divide', family: 'rule', tag: 'E', skill: 'a1-dl-read', repair: 'a1-dl-read', judges: ['value'],
    name: 'aₖ divisé par k! au lieu de multiplié',
    example: ['f⁽⁵⁾(0) = (47/40)/120', 'f⁽⁵⁾(0) = 120·47/40 = 141'],
    check: { judge: { kind: 'value', expect: '141', read: { k: 5, a: '47/40' } }, prev: 'f_5', line: '47/4800' },
    transform: (prev, ctx) => {
      const r = ctx?.cfg?.read;
      if (!r) return [];
      return [{ node: P(`(${r.a})/${fact(r.k)}`), ctx: { k: r.k } }];
    },
    explain: (ctx = {}) => `Tu as divisé par k! au lieu de multiplier : aₖ = f⁽ᵏ⁾(0)/k!, donc f⁽ᵏ⁾(0) = k!·aₖ${ctx.k ? ` = ${ctx.k}!·a${ctx.k}` : ''}.`,
  },
  {
    id: 'a1_taylor_rest_at_a', family: 'method', tag: 'E', skill: 'a1-taylor-rest', repair: 'a1-taylor-rest', judges: ['equiv'],
    name: '|f⁽ⁿ⁺¹⁾| majoré par sa valeur en a',
    example: ['eˣ sur [0 ; 0,1] : |f‴(c)| ≤ |f‴(0)| = 1', '|f‴(c)| ≤ e^0,1 ≤ 2'],
    check: { judge: { kind: 'equiv', vars: ['x'], domain: { x: [0, 0.5] }, rel: '≤', target: 'constant', taylorAt: ['1'] }, prev: '|e^x|', line: '1' },
    transform: (prev, ctx) => (ctx?.cfg?.taylorAt || []).map((t) => ({ node: P(t), ctx: { a: '0', x: ctx.cfg.taylorX } })),
    explain: (ctx = {}) => `c est quelque part entre ${ctx.a ?? 'a'} et ${ctx.x ?? 'x'} : majore |f⁽ⁿ⁺¹⁾| sur tout l'intervalle, pas seulement en ${ctx.a ?? 'a'}.`,
  },
];
