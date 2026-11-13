// Traps of module G0 (polynômes), spec §7. Catalogue:
// docs/universite/G-gymnase-1.md, G0, « Pièges du module ».
//
// Most traps replay the mistake on a polynomial line (judge `poly`): the
// candidate is compared with the student's line as a polynomial. The
// division traps read the dividend and divisor in ctx.cfg; g0_rem_sign and
// g0_coverup_sign read the value asked in ctx.cfg (judge `value`).
// `check`: see js/cas/rules/g9.js.

import { Q } from '../../math/rational.js';
import { parse } from '../parse.js';
import { stripParen, mapNode, lit, add, mul } from '../ast.js';
import { toMathML } from '../mathml.js';
import { exactValue } from '../normal.js';
import {
  polyOf, qCoeffs, coeffs, fromQ, horner, polyNode, factorQ, productNode, qNode, linNode, divide, degree, discriminant,
  splitByDivisor, leadCoeff,
} from '../polyx.js';
import { Poly } from '../poly.js';
import { t } from '../../i18n.js';

const M = (n) => toMathML(stripParen(n));
const P = (t) => (typeof t === 'string' ? parse(t, { complex: true }) : t);

// Dividend and divisor of a division item.
function division(ctx) {
  const cfg = ctx?.cfg;
  if (!cfg?.dividend || !cfg?.divisor) return null;
  const names = Object.fromEntries(Object.entries(cfg.names || {}).map(([k, t]) => [k, P(t)]));
  const A = polyOf(P(cfg.dividend), { names });
  const B = polyOf(P(cfg.divisor), { names });
  if (!A || !B) return null;
  return { A, B, Bnode: P(cfg.divisor), names, cfg };
}

// B·Q + R as a node.
const divLine = (Bnode, q, r) => add(mul({ t: 'paren', e: Bnode }, { t: 'paren', e: polyNode(q) }), polyNode(r));

// x − a: the root a of a monic divisor of degree 1.
function rootOf(B) {
  const cs = qCoeffs(B);
  if (!cs || cs.length !== 2 || !cs[1].eq(1)) return null;
  return cs[0].neg();
}

function hornerDiv(high, a) {
  const { b } = horner(high, a);
  const r = b.pop();
  return { q: fromQ([...b].reverse()), r: Poly.const(r) };
}

// The polynomial of a line, through « P = … ».
function linePoly(node, cfg = {}) {
  let n = stripParen(node);
  if (n.t === 'rel' && n.op === '=') n = n.r;
  return polyOf(n, { complex: !!cfg.complex });
}

export const RULES = [
  {
    id: 'g0_horner_sign', family: 'sign', tag: 'E', skill: 'g0-horner', repair: 'g0-horner', judges: ['poly'],
    name: t('Horner avec a au lieu de −a'),
    example: [t('x + 2 : Horner en 2'), t('x + 2 : Horner en −2')],
    check: { judge: { kind: 'poly', mode: 'div', dividend: '2x^4-3x^3+5x-6', divisor: 'x-2' }, prev: '2x^4-3x^3+5x-6', line: '(x-2)(2x^3-7x^2+14x-23)+40' },
    transform: (prev, ctx) => {
      const d = division(ctx);
      const a = d && rootOf(d.B);
      if (!a || a.n === 0) return [];
      const high = [...qCoeffs(d.A)].reverse();
      const { q, r } = hornerDiv(high, a.neg());
      return [{ node: divLine(d.Bnode, q, r), ctx: { a } }];
    },
    explain: (ctx = {}) => (ctx.a
      ? t('Diviser par {d}, c\'est utiliser {a} dans le schéma : la valeur qui annule le diviseur.', { d: M(linNode(ctx.a)), a: String(ctx.a).replace('-', '−') })
      : t('Diviser par x + 2, c\'est diviser par x − (−2) : dans le schéma de Horner, on utilise −2.')),
  },
  {
    id: 'g0_horner_zero', family: 'rule', tag: 'E', skill: 'g0-horner', repair: 'g0-horner', judges: ['poly'],
    name: t('Coefficient nul oublié dans le schéma de Horner'),
    example: ['2x⁴ − 3x³ + 5x − 6 : 2, −3, 5, −6', '2x⁴ − 3x³ + 5x − 6 : 2, −3, 0, 5, −6'],
    check: { judge: { kind: 'poly', mode: 'div', dividend: '2x^4-3x^3+5x-6', divisor: 'x-2' }, prev: '2x^4-3x^3+5x-6', line: '(x-2)(2x^2+x+7)+8' },
    transform: (prev, ctx) => {
      const d = division(ctx);
      const a = d && rootOf(d.B);
      if (!a) return [];
      const high = [...qCoeffs(d.A)].reverse();
      const nz = high.filter((c) => c.n !== 0);
      if (nz.length === high.length || nz.length < 2) return [];
      const { q, r } = hornerDiv(nz, a);
      return [{ node: divLine(d.Bnode, q, r), ctx: {} }];
    },
    explain: () => t('Il manque une puissance de x : son coefficient est 0, il lui faut quand même une case. Sinon chaque coefficient glisse d\'un degré.'),
  },
  {
    id: 'g0_horner_degree', family: 'rule', tag: 'E', skill: 'g0-horner', repair: 'g0-horner', judges: ['poly'],
    name: t('Quotient lu avec un degré de trop'),
    example: ['Q = 2x⁴ + x³ + 2x² + 9x + 12', 'Q = 2x³ + x² + 2x + 9, R = 12'],
    check: { judge: { kind: 'poly', mode: 'div', dividend: '2x^4-3x^3+5x-6', divisor: 'x-2' }, prev: '2x^4-3x^3+5x-6', line: '(x-2)(2x^4+x^3+2x^2+9x+12)' },
    transform: (prev, ctx) => {
      const d = division(ctx);
      const a = d && rootOf(d.B);
      if (!a) return [];
      const high = [...qCoeffs(d.A)].reverse();
      const { b } = horner(high, a);
      const all = fromQ([...b].reverse());
      const { q, r } = hornerDiv(high, a);
      const xq = q.mul(Poly.variable('x'));
      return [
        { node: add(mul({ t: 'paren', e: d.Bnode }, { t: 'paren', e: polyNode(all) }), lit(0)), ctx: {} },
        { node: divLine(d.Bnode, all, r), ctx: {} },
        { node: divLine(d.Bnode, xq, r), ctx: {} },
      ];
    },
    explain: () => t('Le quotient a un degré de moins que P, et la dernière case du schéma est le reste, pas un coefficient du quotient.'),
  },
  {
    id: 'g0_div_subtract', family: 'sign', tag: 'E', skill: 'g0-long-div', repair: 'lit-polynomial', judges: ['poly'],
    name: t('Soustraction du produit : le signe n\'est changé que sur un terme'),
    example: ['A − 2x²·B = −x³ − 2x² − 3x + 1', 'A − 2x²·B = −x³ + 2x² − 3x + 1'],
    check: {
      judge: { kind: 'poly', mode: 'div', dividend: '2x^4+x^3-3x+1', divisor: 'x^2+x-1', names: { A: '2x^4+x^3-3x+1', B: 'x^2+x-1' }, divisorName: 'B' },
      prev: '2x^4+x^3-3x+1', line: 'B×2x^2+(-x^3-2x^2-3x+1)',
    },
    transform: (prev, ctx) => {
      const d = division(ctx);
      if (!d) return [];
      let body = stripParen(prev);
      if (body.t === 'rel' && body.op === '=') body = body.r;
      const split = splitByDivisor(body, d.B, { names: d.names, divisorName: d.cfg.divisorName }) ?? { q: new Poly(), r: d.A };
      const { q, r } = split.hasB ? split : { q: new Poly(), r: d.A };
      if (degree(r) < degree(d.B)) return [];
      const t = coeffs(r)[degree(r)].scale(new Q(1).div(leadCoeff(d.B).constValue())).mul(Poly.variable('x', degree(r) - degree(d.B)));
      const tB = t.mul(d.B);
      const terms = [...tB.terms.values()].map(({ m, c }) => Poly.monomial(m, c));
      const lead = terms.reduce((best, x) => (degree(x) > degree(best) ? x : best));
      const out = [];
      // Only the leading term subtracted, the others added.
      const others = tB.sub(lead);
      if (!others.isZero) out.push(r.sub(lead).add(others));
      // One term added instead of subtracted.
      for (const x of terms) if (x !== lead) out.push(r.sub(tB).add(x.scale(2)));
      const Bn = d.cfg.divisorName ? { t: 'sym', name: d.cfg.divisorName } : d.Bnode;
      return out.map((rr) => ({ node: divLine(Bn, q.add(t), rr), ctx: { t, tB } }));
    },
    explain: (ctx = {}) => (ctx.tB
      ? t('On soustrait tout le produit {p} : chaque terme change de signe, pas seulement le premier. −(−2x²) donne +2x².', { p: M(polyNode(ctx.tB)) })
      : t('On soustrait tout le produit : chaque terme change de signe, pas seulement le premier. −(−2x²) donne +2x².')),
  },
  {
    id: 'g0_rem_sign', family: 'sign', tag: 'E', skill: 'g0-factor-thm', repair: 'g0-factor-thm', judges: ['value'],
    name: t('Reste par x + a calculé en a au lieu de −a'),
    example: [t('reste de P par x + 1 = P(1)'), t('reste de P par x + 1 = P(−1)')],
    check: { judge: { kind: 'value', remSign: { poly: 'x^3-2x^2-5x+6', at: -1 } }, prev: '(-1)^3-2×(-1)^2-5×(-1)+6', line: '0' },
    transform: (prev, ctx) => {
      const rs = ctx?.cfg?.remSign;
      if (!rs) return [];
      const at = Q.of(rs.at).neg();
      const node = mapNode(parse(rs.poly), (n) => (n.t === 'sym' && n.name === 'x' ? { t: 'paren', e: lit(at) } : n));
      return [{ node, ctx: { at: Q.of(rs.at) } }];
    },
    explain: (ctx = {}) => (ctx.at
      ? t('{d} s\'annule en {a} : le reste est P({a}).', { d: M(linNode(ctx.at)), a: String(ctx.at).replace('-', '−') })
      : t('x + 1 s\'annule en −1 : le reste de P par x + 1 est P(−1), pas P(1).')),
  },
  {
    id: 'g0_mult_once', family: 'rule', tag: 'E', skill: 'g0-multiplicity', repair: 'g0-multiplicity', judges: ['poly'],
    name: t('Racine multiple comptée une seule fois'),
    example: ['P = (x − 1)(x + 2)', 'P = (x − 1)³(x + 2)'],
    check: { judge: { kind: 'poly', target: 'factored-R' }, prev: 'x^4-x^3-3x^2+5x-2', line: '(x-1)(x+2)' },
    transform: (prev, ctx) => {
      if (ctx?.cfg?.mode && ctx.cfg.mode !== 'same') return [];
      const p = linePoly(prev, ctx?.cfg);
      const cs = p && qCoeffs(p);
      if (!cs || cs.length < 3) return [];
      const { coef, factors } = factorQ(cs);
      if (!factors.some((f) => f.k > 1)) return [];
      const once = productNode(coef, factors.map((f) => ({ node: qNode(f.cs), k: 1 })));
      return [{ node: once, ctx: { deg: cs.length - 1 } }];
    },
    explain: (ctx = {}) => (ctx.deg
      ? t('Développe ta ligne : son degré est trop petit (P est de degré {deg}). Une racine peut être multiple : refais Horner en cette racine sur le quotient, tant que le reste vaut 0.', { deg: ctx.deg })
      : t('Développe ta ligne : son degré est trop petit. Une racine peut être multiple : refais Horner en cette racine sur le quotient, tant que le reste vaut 0.')),
  },
  {
    id: 'g0_irred_split', family: 'rule', tag: 'E', skill: 'g0-factor-real', repair: 'fac-complete', judges: ['poly'],
    name: t('Trinôme irréductible factorisé quand même'),
    example: ['x² + 4 = (x − 2)(x + 2)', t('x² + 4 est irréductible sur ℝ')],
    check: { judge: { kind: 'poly', target: 'factored-R' }, prev: 'x^2+4', line: '(x-2)(x+2)' },
    transform: (prev, ctx) => {
      if (ctx?.cfg?.mode && ctx.cfg.mode !== 'same') return [];
      const p = linePoly(prev, ctx?.cfg);
      const cs = p && qCoeffs(p);
      if (!cs || cs.length < 3) return [];
      const { coef, factors } = factorQ(cs);
      const out = [];
      factors.forEach((f, i) => {
        if (f.cs.length !== 3 || discriminant(f.cs).n >= 0) return;
        const [q0, p1] = f.cs;
        const wrong = [p1.mul(p1).div(2).sub(q0), p1, new Q(1)];
        const prod = factors.map((g, j) => ({ node: qNode(j === i ? wrong : g.cs), k: g.k }));
        out.push({ node: productNode(coef, prod), ctx: { tri: qNode(f.cs), wrong: qNode(wrong), delta: discriminant(f.cs) } });
      });
      return out;
    },
    explain: (ctx = {}) => (ctx.tri
      ? t('Développe ta ligne : elle donne {w}, pas {tri}. Pour {tri}, Δ = {delta} < 0 : pas de racine réelle, ce trinôme est irréductible sur ℝ.', { w: M(ctx.wrong), tri: M(ctx.tri), delta: String(ctx.delta).replace('-', '−') })
      : t('(x − 2)(x + 2) = x² − 4, pas x² + 4. Pour x² + 4, Δ = −16 < 0 : pas de racine réelle, il est irréductible sur ℝ.')),
  },
  {
    id: 'g0_conj_missing', family: 'rule', tag: 'E', skill: 'g0-factor-complex', repair: 'g0-factor-complex', judges: [],
    name: t('Racine conjuguée oubliée'),
    example: ['P = (x − 2 − i)(x − c)…', t('P réel : 2 − i est aussi racine')],
    check: { bait: { skill: 'g0-factor-complex', exam: 'mcq' } },
    explain: () => t('P est à coefficients réels : si 2 + i est racine, sa conjuguée 2 − i l\'est aussi. Sans elle, ton P a des coefficients avec i.'),
  },
  {
    id: 'g0_param_one_cond', family: 'logic', tag: 'E', skill: 'g0-div-param', repair: 'g0-factor-thm', judges: ['solset'],
    name: t('Une seule des deux conditions gardée'),
    example: ['λ ∈ {1 ; 2}', 'λ = 2'],
    check: { judge: { kind: 'solset', v: 'λ', domain: 'R', paramCond: true }, prev: '{1;2}∩{2;3}', line: '{1;2}' },
    transform: (prev, ctx) => {
      if (!ctx?.cfg?.paramCond) return [];
      const n = stripParen(prev);
      if ((n.t === 'setop' && n.op === '∩') || (n.t === 'logic' && n.op === 'and')) return [{ node: n.l, ctx: {} }, { node: n.r, ctx: {} }];
      return [];
    },
    explain: () => t('Les deux conditions doivent tenir à la fois : P(a) = 0 et P(b) = 0. Garde seulement les valeurs communes aux deux ensembles (∩).'),
  },
  {
    id: 'g0_gcd_last', family: 'method', tag: 'E', skill: 'g0-gcd', repair: 'g0-gcd', judges: ['poly'],
    name: t('PGCD pris au mauvais endroit de l\'algorithme'),
    example: [t('PGCD = B'), t('PGCD = dernier reste non nul')],
    check: { judge: { kind: 'poly', mode: 'monic', target: 'monic', gcdTrap: ['x^3-x^2-4x+4', '0'] }, prev: '-x^2+3x-2', line: 'x^3-x^2-4x+4' },
    transform: (prev, ctx) => (ctx?.cfg?.gcdTrap || []).map((t) => ({ node: parse(t), ctx: {} })),
    explain: () => t('Le PGCD est le dernier reste non nul de l\'algorithme d\'Euclide, rendu unitaire.'),
  },
  {
    id: 'g0_coverup_sign', family: 'sign', tag: 'E', skill: 'g0-pfd-simple', repair: 'g0-pfd-simple', judges: ['value'],
    name: t('Méthode du cache : x remplacé par −a au lieu de a'),
    example: ['A = (−2 + 7)/(−2 + 1)', 'A = (2 + 7)/(2 + 1)'],
    check: { judge: { kind: 'value', expect: '3', coverup: { num: 'x+7', den: 'x+1', at: 2 } }, prev: 'A', line: '-5' },
    transform: (prev, ctx) => {
      const c = ctx?.cfg?.coverup;
      if (!c) return [];
      const at = Q.of(c.at).neg();
      const sub = (t) => mapNode(parse(t), (n) => (n.t === 'sym' && n.name === 'x' ? { t: 'paren', e: lit(at) } : n));
      const den = exactValue(sub(c.den));
      if (!den || den.n === 0) return [];
      return [{ node: { t: 'frac', n: { t: 'paren', e: sub(c.num) }, d: { t: 'paren', e: sub(c.den) } }, ctx: { at: Q.of(c.at) } }];
    },
    explain: (ctx = {}) => (ctx.at
      ? t('On cache {d} et on pose x = {a}, la valeur qui l\'annule.', { d: M(linNode(ctx.at)), a: String(ctx.at).replace('-', '−') })
      : t('On cache x − 2 et on pose x = 2, la valeur qui annule ce facteur.')),
  },
  {
    id: 'g0_pfd_form', family: 'method', tag: 'E', skill: 'g0-pfd-general', repair: 'g0-pfd-general', judges: [],
    name: t('Forme des éléments simples incomplète'),
    example: ['A/(x − 1)²', 'A/(x − 1) + B/(x − 1)²'],
    check: { bait: { skill: 'g0-pfd-general', level: 2 } },
    explain: () => t('Un facteur répété (x − a)² demande deux termes, A/(x − a) + B/(x − a)². Un trinôme irréductible demande un numérateur Bx + C. Avec moins d\'inconnues, le numérateur commun n\'a pas assez de degrés de liberté.'),
  },
  {
    id: 'g0_pfd_no_div', family: 'method', tag: 'E', skill: 'g0-pfd-general', repair: 'g0-long-div', judges: ['equiv'],
    name: t('Éléments simples sans la partie entière'),
    example: ['(2x³ + x² + 3)/(x² − 1) = 3/(x − 1) − 1/(x + 1)', '(2x³ + x² + 3)/(x² − 1) = 2x + 1 + 3/(x − 1) − 1/(x + 1)'],
    check: { judge: { kind: 'equiv', vars: ['x'], domain: { x: [-3, 3] } }, prev: '(2x^3+x^2+3)/(x^2-1)', line: '3/(x-1)-1/(x+1)' },
    transform: (prev) => {
      const n = stripParen(prev);
      if (n.t !== 'frac') return [];
      const N = polyOf(n.n);
      const D = polyOf(n.d);
      if (!N || !D || degree(N) < degree(D) || !qCoeffs(D)) return [];
      const { q, r } = divide(N, D);
      return [{ node: { t: 'frac', n: { t: 'paren', e: polyNode(r) }, d: { t: 'paren', e: n.d } }, ctx: { q: polyNode(q), dn: degree(N), dd: degree(D) } }];
    },
    explain: (ctx = {}) => (ctx.q
      ? t('deg N = {dn} ≥ deg D = {dd} : divise d\'abord. La partie entière est {q}.', { dn: ctx.dn, dd: ctx.dd, q: M(ctx.q) })
      : t('deg N ≥ deg D : divise d\'abord. La partie entière s\'ajoute aux éléments simples.')),
  },
];
