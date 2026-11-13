// Traps of module A1, part h (step U4): recursive sequences, geometric and
// telescoping series. Catalogue: docs/universite/A1-analyse-1.md, « Pièges
// du module ».
//
// Fields the generators put in the judge's configuration:
//   affine: {q, c, a0, L}   (equiv, a1-seq-affine) the recursion aₙ₊₁ = q·aₙ + c
//   recfix: {fixed: [texts], lim, a0}   (value, limit) the fixed points of
//           aₙ₊₁ = f(aₙ) and the true limit ('+∞' when the sequence diverges)
// The series traps read the line itself: a Σ to ∞ of a geometric term
// whose start is not 0, or of a difference u(k) − u(k + p) with p ≥ 2.

import { parse } from '../parse.js';
import { walk, replaceAt, stripParen, lit, contains } from '../ast.js';
import { substVar } from '../diff.js';
import { evalFloat } from '../numeric.js';
import { exactValue } from '../normal.js';
import { toText, toReadable } from '../print.js';
import { Q } from '../../math/rational.js';
import { t } from '../../i18n.js';

const fr = (s) => String(s).replace(/-/g, '−');
const isInf = (n) => { n = stripParen(n); return n.t === 'const' && n.name === 'inf'; };
const at = (e, k, x) => substVar(e, k, typeof x === 'object' ? x : lit(Q.of(x)));
const val = (e, k, x) => { try { return evalFloat(at(e, k, x), {}); } catch { return NaN; } };
const close = (a, b) => Math.abs(a - b) <= 1e-9 * (1 + Math.abs(a) + Math.abs(b));

// Σ nodes of a line (with their path).
function sums(prev, pred) {
  const out = [];
  walk(prev, (n, path) => { if (n.t === 'sum' && pred(n)) out.push({ n, path }); return true; });
  return out;
}

// u(k) − u(k + p) with p in 2..3: {u, p}, or null.
function teleOf(n) {
  const e = stripParen(n.e);
  if (e.t !== 'bin' || e.op !== '-') return null;
  for (const p of [2, 3]) {
    let ok = true;
    for (let k = 1; k <= 5 && ok; k++) {
      const a = val(e.l, n.k, k + p);
      const b = val(e.r, n.k, k);
      ok = Number.isFinite(a) && Number.isFinite(b) && close(a, b);
    }
    if (ok) return { u: e.l, p };
  }
  return null;
}

export const RULES = [
  {
    id: 'a1_affine_rec_no_fixed_point', family: 'rule', tag: 'E', skill: 'a1-seq-affine', repair: 'a1-seq-affine',
    judges: ['equiv'],
    name: t('Formule de aₙ₊₁ = q·aₙ + c sans passer par le point fixe'),
    example: ['aₙ = qⁿ·a₀ + c', 'aₙ = qⁿ·(a₀ − L) + L'],
    check: {
      judge: { kind: 'equiv', vars: ['n'], funcs: ['a'], defs: { a: '6-4/3^n' }, domain: { n: { int: [0, 12] } }, target: 'short', goal: '6-4/3^n', slack: 2, affine: { q: '1/3', c: 4, a0: 2, L: 6 } },
      prev: 'a(n)', line: '2/3^n+4',
    },
    // qⁿ·a₀ + c and qⁿ·a₀ + n·c; ctx: the first n where the formula fails.
    transform: (prev, ctx) => {
      const a = ctx.cfg?.affine;
      if (!a || a.L === null || a.L === undefined) return [];
      const R = exactValue(parse(String(a.q)));
      if (!R || R.eq(1)) return [];
      const seq = (n) => { let x = Q.of(a.a0); for (let i = 0; i < n; i++) x = R.mul(x).add(a.c); return x; };
      return [`(${a.q})^n×(${a.a0})+(${a.c})`, `(${a.q})^n×(${a.a0})+n×(${a.c})`].map((t) => {
        const node = parse(t, { vars: ['n'] });
        let n = 0;
        while (n < 5 && close(val(node, 'n', n), seq(n).valueOf())) n++;
        return { node, ctx: { n, v: fr(toText(lit(exactValue(at(node, 'n', n)) ?? Q.of(0)))), an: fr(seq(n)), l: fr(a.L) } };
      });
    },
    explain: (ctx = {}) => (ctx.n !== undefined
      ? t('Teste n = {n} : ta formule donne {v}, mais a{p1} = {an}. Passe par l\'écart au point fixe L = {l} : aₙ = L + qⁿ·(a₀ − L).', { n: ctx.n, v: ctx.v, p1: ['₀', '₁', '₂', '₃', '₄', '₅'][ctx.n], an: ctx.an, l: ctx.l })
      : t('qⁿ·a₀ + c ne vérifie pas la récurrence (teste n = 0 : on trouve a₀ + c). Passe par l\'écart au point fixe L : aₙ − L = qⁿ·(a₀ − L).')),
  },
  {
    id: 'a1_rec_limit_without_convergence', family: 'logic', tag: 'C', skill: 'a1-seq-rec-fixed',
    repair: 'a1-seq-monotone',
    judges: ['value', 'limit'],
    name: t('Point fixe pris pour la limite sans prouver la convergence'),
    example: [t('« L = f(L) ⇒ L = 2, donc aₙ → 2 »'), t('la convergence d\'abord : monotone et bornée')],
    check: { judge: { kind: 'value', expect: '4', recfix: { fixed: ['2', '4'], lim: '4', a0: '3' } }, prev: 'lim(a_n,n,∞)', line: '2' },
    // A fixed point that is not the limit.
    transform: (prev, ctx) => {
      const r = ctx.cfg?.recfix;
      if (!r) return [];
      return r.fixed.filter((x) => x !== r.lim).map((x) => ({ node: parse(x), ctx: { a0: fr(r.a0), lim: r.lim === '+∞' ? '+∞' : r.lim === '-∞' ? '−∞' : fr(r.lim), l: fr(x) } }));
    },
    explain: (ctx = {}) => t('L = f(L) donne les limites possibles si la suite converge, pas la preuve qu\'elle converge.{p1}', { p1: ctx.lim ? t(' Avec a₀ = {a0}, elle tend vers {lim}{p1}.', { a0: ctx.a0, lim: ctx.lim, p1: ctx.l ? t(', pas vers {l}', { l: ctx.l }) : '' }) : t(' Montre d\'abord qu\'elle est monotone et bornée.') }),
  },
  {
    id: 'a1_monotone_by_f_increasing', family: 'rule', tag: 'E', skill: 'a1-seq-rec-fixed', repair: 'a1-seq-rec-fixed',
    judges: [],
    name: t('Suite croissante parce que f est croissante'),
    example: [t('f croissante, donc (aₙ) croissante'), t('le sens dépend du signe de a₁ − a₀')],
    check: { bait: { skill: 'a1-seq-rec-fixed' } },
    explain: (ctx = {}) => t('f croissante dit seulement que la suite est monotone. Elle monte si a₁ > a₀, elle descend si a₁ < a₀{p1}.', { p1: ctx.a1 ? t(' ; ici a₁ = {a1} et a₀ = {a0}', { a1: fr(ctx.a1), a0: fr(ctx.a0) }) : '' }),
  },
  {
    id: 'a1_geo_sum_start', family: 'rule', tag: 'E', skill: 'a1-ser-geo-tele', repair: 'g5-geom',
    judges: ['definite'],
    name: t('Somme géométrique : 1/(1 − q) sans regarder le premier terme'),
    example: ['Σ_{k≥2} (1/3)ᵏ = 3/2', 'Σ_{k≥2} (1/3)ᵏ = (1/9)/(1 − 1/3) = 1/6'],
    check: { judge: { kind: 'definite' }, prev: 'sum((1/3)^k,k,2,∞)', line: '3/2' },
    // A geometric Σ to ∞ that does not start at 0, started at 0.
    transform: (prev) => sums(prev, (n) => isInf(n.hi) && !(exactValue(n.lo)?.n === 0)).flatMap(({ n, path }) => {
      const t = [0, 1, 2, 3].map((j) => val(n.e, n.k, { t: 'paren', e: { t: 'bin', op: '+', l: n.lo, r: lit(Q.of(j)) } }));
      if (!t.every(Number.isFinite) || t[0] === 0 || !close(t[1] / t[0], t[2] / t[1]) || !close(t[2] / t[1], t[3] / t[2])) return [];
      const lo = exactValue(n.lo);
      return [{ node: replaceAt(prev, path, { ...n, lo: lit(Q.of(0)) }), ctx: { t0: fr(exactValue(at(n.e, n.k, n.lo))?.toString() ?? toReadable(at(n.e, n.k, n.lo))), k0: lo ? fr(lo) : '' } }];
    }),
    explain: (ctx = {}) => t('1/(1 − q) vaut pour une somme qui commence à k = 0.{p1} : premier terme sur (1 − raison).', { p1: ctx.t0 ? t(' Ici le premier terme est {t0}', { t0: ctx.t0 }) : t(' Ici le premier terme est q^(k₀)') }),
  },
  {
    id: 'a1_tele_wrong_terms', family: 'rule', tag: 'E', skill: 'a1-ser-geo-tele', repair: 'a1-ser-geo-tele',
    judges: ['definite', 'equiv'],
    name: t('Série télescopique : un seul terme gardé quand le décalage vaut 2'),
    example: ['Σ (1/(k + 1) − 1/(k + 3)) = 1/2', '1/2 + 1/3'],
    check: { judge: { kind: 'definite' }, prev: 'sum(1/(k+1)-1/(k+3),k,1,∞)', line: '1/2' },
    // Σ (u(k) − u(k + p)), p ≥ 2: only u(lo) kept at the start (and u(N + p)
    // at the end of a partial sum).
    transform: (prev) => sums(prev, (n) => !!teleOf(n)).flatMap(({ n, path }) => {
      const { u, p } = teleOf(n);
      const head = at(u, n.k, n.lo);
      const node = isInf(n.hi) ? head : { t: 'bin', op: '-', l: head, r: at(u, n.k, { t: 'bin', op: '+', l: n.hi, r: lit(Q.of(p)) }) };
      if (contains(node, (x) => x.t === 'sum')) return [];
      return [{ node: replaceAt(prev, path, { t: 'paren', e: node }), ctx: { p } }];
    }),
    explain: (ctx = {}) => t('Le décalage est de {p} : les {p} premiers termes positifs ne sont jamais compensés, et les {p} derniers négatifs non plus. Écris les premiers termes de S_N pour les voir.', { p: ctx.p ?? 'p' }),
  },
];
