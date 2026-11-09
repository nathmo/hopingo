// Traps of module G1 (fonctions et inéquations), second half: rational,
// parametric, absolute-value and irrational (in)equations, bounds. Spec §7.
// Catalogue: docs/universite/G-gymnase-1.md, G1, « Pièges du module ».
//
// Line traps replay the mistake on the previous line: transform(prev, ctx)
// → [{node, ctx}], compared by the judge's own equivalence (same solution
// set for `solset`, for every sample of the parameters; same function for
// `equiv` with `rel`). `check`: see js/cas/rules/g9.js.

import { parse } from '../parse.js';
import { stripParen, walk, replaceAt, contains, lit, sub, mul, neg, num, mapNode } from '../ast.js';
import { toMathML } from '../mathml.js';
import { evalFloat } from '../numeric.js';
import { polyOf, polyNode } from '../polyx.js';
import { Q } from '../../math/rational.js';
import {
  solutionSet, setToNode, union, complement, domainOf, isFiniteSet, points,
} from '../sets.js';

const M = (n) => toMathML(stripParen(n));
const par = (e) => ({ t: 'paren', e });
const rel = (op, l, r) => ({ t: 'rel', op, l, r });
const or = (l, r) => ({ t: 'logic', op: 'or', l, r });
const and = (l, r) => ({ t: 'logic', op: 'and', l, r });
const INEQ = new Set(['<', '≤', '>', '≥']);
const FLIP = { '<': '>', '>': '<', '≤': '≥', '≥': '≤' };
const STRICT = { '<': '≥', '≤': '>', '>': '≤', '≥': '<' };
const hasV = (n, v) => contains(n, (x) => x.t === 'sym' && x.name === v && !x.sub);

// One candidate per node matching pred, replaced by fn(node).
function each(prev, pred, fn) {
  const out = [];
  walk(prev, (n, path) => {
    if (pred(n)) {
      const r = fn(n);
      if (r) out.push({ node: replaceAt(prev, path, r.node ?? r), ctx: r.ctx ?? {} });
    }
    return true;
  });
  return out;
}

// l − r = c·v + d, linear in v (c and d may hold parameters): [d, c] or null.
function linear(l, r, v) {
  try {
    const p = polyOf(sub(par(l), par(r)));
    if (!p || p.degreeIn(v) !== 1) return null;
    return p.coeffsIn(v);
  } catch { return null; }
}

const isIneq = (n) => (n.t === 'rel' && INEQ.has(n.op)) || n.t === 'chain';
const isEquation = (n) => {
  n = stripParen(n);
  if (n.t === 'rel') return n.op === '=';
  if (n.t === 'logic' && n.op === 'or') return isEquation(n.l) && isEquation(n.r);
  return false;
};

// Max of a positive expression on the domain of the item, sampled, snapped
// to a fraction with a small denominator.
function maxOn(d, v, [lo, hi]) {
  let best = -Infinity;
  for (let i = 0; i <= 400; i++) {
    const y = evalFloat(d, { [v]: lo + ((hi - lo) * i) / 400 });
    if (Number.isFinite(y) && y > best) best = y;
  }
  for (let den = 1; den <= 12; den++) {
    const n = Math.round(best * den);
    if (Math.abs(n / den - best) < 1e-9) return new Q(n, den);
  }
  return null;
}

export const RULES = [
  {
    id: 'g1_mult_denominator', family: 'method', tag: 'E', skill: 'g1-rational-ineq', repair: 'g1-rational-ineq', judges: ['solset'],
    name: 'Multiplier par un dénominateur de signe inconnu',
    example: ['(x + 1)/(x − 2) ≥ 2 → x + 1 ≥ 2(x − 2)', '(x + 1)/(x − 2) − 2 ≥ 0'],
    check: { judge: { kind: 'solset', v: 'x' }, prev: '(x+1)/(x-2)≥2', line: 'x+1≥2(x-2)' },
    transform: (prev, ctx = {}) => {
      const n = stripParen(prev);
      const v = ctx.v || 'x';
      if (n.t !== 'rel' || !INEQ.has(n.op)) return [];
      const out = [];
      const l = stripParen(n.l);
      const r = stripParen(n.r);
      if (l.t === 'frac' && hasV(l.d, v)) out.push({ node: rel(n.op, l.n, mul(par(n.r), par(l.d))), ctx: { d: l.d } });
      if (r.t === 'frac' && hasV(r.d, v)) out.push({ node: rel(n.op, mul(par(n.l), par(r.d)), r.n), ctx: { d: r.d } });
      return out;
    },
    explain: (ctx = {}) => (ctx.d
      ? `${M(ctx.d)} n'a pas toujours le même signe : quand il est négatif, multiplier par lui retourne l'inégalité. Passe tout d'un côté et fais un tableau de signes.`
      : 'Le dénominateur change de signe : multiplier par lui retourne l\'inégalité une partie du temps. Passe tout d\'un côté et fais un tableau de signes.'),
  },
  {
    id: 'g1_pole_closed', family: 'notation', tag: 'E', skill: 'g1-rational-ineq', repair: 'g1-rational-ineq', judges: ['solset'], // TEMP u1b-merge: repair 'g1-domain' once the first half of G1 is merged
    name: 'Valeur interdite gardée dans l\'ensemble',
    example: ['(5 − x)/(x − 2) ≥ 0 : [2 ; 5]', ']2 ; 5]'],
    check: { judge: { kind: 'solset', v: 'x' }, prev: '(5-x)/(x-2)≥0', line: '[2;5]' },
    transform: (prev, ctx = {}) => {
      const cfg = { v: ctx.v || 'x' };
      const n = stripParen(prev);
      if (n.t === 'set' || n.t === 'setop') return [];
      const bad = complement(domainOf(prev, cfg));
      if (!bad.parts.length || !isFiniteSet(bad)) return [];
      const S = solutionSet(prev, cfg);
      const ends = S.parts.flatMap((p) => [p.lo, p.hi]).filter((b) => Number.isFinite(b.x));
      const poles = points(bad).filter((b) => ends.some((e) => Math.abs(e.x - b.x) < 1e-9));
      if (!poles.length) return [];
      const closed = union(S, { parts: poles.map((b) => ({ lo: b, hi: b, loC: true, hiC: true })) });
      return [{ node: setToNode(closed), ctx: { pole: poles[0].q ? lit(poles[0].q) : null } }];
    },
    explain: (ctx = {}) => (ctx.pole
      ? `En x = ${M(ctx.pole)}, la fraction n'existe pas : ${M(ctx.pole)} est une valeur interdite, le crochet est ouvert de ce côté.`
      : 'En une valeur interdite, la fraction n\'existe pas : le crochet est ouvert de ce côté.'),
  },
  {
    id: 'g1_param_case', family: 'method', tag: 'E', skill: 'g1-param', repair: 'g1-param', judges: ['solset'],
    name: 'Diviser par une expression en m sans discuter',
    example: ['(m − 1)x ≤ (m − 1)(m + 1) → x ≤ m + 1 pour tout m', 'cas m > 1, m < 1, m = 1'],
    check: { judge: { kind: 'solset', v: 'x', params: { m: ']-∞;1[' } }, prev: '(m-1)x≤(m-1)(m+1)', line: 'x≤m+1' },
    transform: (prev, ctx = {}) => {
      const params = Object.keys(ctx.cfg?.params || {});
      const n = stripParen(prev);
      const v = ctx.v || 'x';
      if (!params.length || n.t !== 'rel') return [];
      const cs = linear(n.l, n.r, v);
      if (!cs || !params.some((m) => hasV(polyNode(cs[1], m), m))) return [];
      // c·x + d op 0 → x op −d/c, the relation kept.
      const cNode = polyNode(cs[1], params[0]);
      const dNode = polyNode(cs[0], params[0]);
      return [{ node: rel(n.op, { t: 'sym', name: v }, { t: 'frac', n: neg(par(dNode)), d: par(cNode) }), ctx: { c: cNode } }];
    },
    explain: (ctx = {}) => (ctx.c
      ? `${M(ctx.c)} change de signe selon m : s'il est négatif, diviser retourne l'inégalité, et s'il est nul on ne peut pas diviser. Fais les cas.`
      : 'Le coefficient de x dépend de m : traite à part les m qui l\'annulent, puis les m où il est négatif (on retourne).'),
  },
  {
    id: 'g1_ineq_not_flipped', family: 'sign', tag: 'E', skill: 'g1-rational-ineq', repair: 'g1-param', judges: ['solset'],
    name: 'Inégalité non retournée après une division par un négatif',
    example: ['−2x ≥ 6 → x ≥ −3', 'x ≤ −3'],
    check: { judge: { kind: 'solset', v: 'x' }, prev: '-2x≥6', line: 'x≥-3' },
    transform: (prev, ctx = {}) => {
      const n = stripParen(prev);
      if (n.t !== 'rel' || !INEQ.has(n.op) || !linear(n.l, n.r, ctx.v || 'x')) return [];
      // Multiplying by c < 0 without turning: the same as turning prev.
      return [{ node: rel(FLIP[n.op], n.l, n.r), ctx: {} }];
    },
    explain: () => 'Tu as multiplié ou divisé par un nombre négatif : l\'inégalité se retourne. Teste une valeur : elle doit vérifier la ligne précédente et la tienne.',
  },
  {
    id: 'g1_viete_a', family: 'rule', tag: 'E', skill: 'g1-viete', repair: 'g1-viete', judges: ['solset'],
    name: 'f(k) < 0 au lieu de a·f(k) < 0',
    example: ['(m − 2)(m − 5) < 0 → m − 5 < 0', 'm ∈ ]2 ; 5['],
    check: { judge: { kind: 'solset', v: 'm' }, prev: '(m-2)(m-5)<0', line: 'm<5' },
    transform: (prev, ctx = {}) => {
      const n = stripParen(prev);
      const v = ctx.v || 'x';
      if (n.t !== 'rel' || !INEQ.has(n.op)) return [];
      const zero = (x) => stripParen(x).t === 'num' && stripParen(x).v.n === 0;
      const side = zero(n.r) ? stripParen(n.l) : zero(n.l) ? stripParen(n.r) : null;
      if (!side || side.t !== 'bin' || side.op !== '×' || !hasV(side.l, v) || !hasV(side.r, v)) return [];
      const keep = (f) => (zero(n.r) ? rel(n.op, f, num(0)) : rel(n.op, num(0), f));
      return [{ node: keep(side.r), ctx: { a: side.l } }, { node: keep(side.l), ctx: { a: side.r } }];
    },
    explain: (ctx = {}) => `${ctx.a ? `Le facteur a = ${M(ctx.a)} compte : ` : ''}si a < 0, la parabole est tournée vers le bas et le signe de f(k) s'inverse. La condition est a·f(k) < 0.`,
  },
  {
    id: 'g1_viete_delta', family: 'rule', tag: 'E', skill: 'g1-viete', repair: 'g1-viete', judges: ['solset'], // TEMP u1b-merge: repair 'g1-trinome-sign' once the first half of G1 is merged
    name: 'Une condition de la position des racines oubliée',
    example: ['a·f(2) < 0 et a·f(6) > 0 → seulement a·f(2) < 0', 'les deux conditions'],
    check: { judge: { kind: 'solset', v: 'm' }, prev: '(m-2)(m-5)<0 et (m-2)(25m-69)>0', line: ']2;5[' },
    transform: (prev) => {
      const n = stripParen(prev);
      if (n.t !== 'logic' || n.op !== 'and') return [];
      if (!isIneq(stripParen(n.l)) || !isIneq(stripParen(n.r))) return [];
      return [{ node: n.l, ctx: { kept: n.l } }, { node: n.r, ctx: { kept: n.r } }];
    },
    explain: () => 'Chaque condition dit une chose différente : a·f(k) > 0 dit seulement que k n\'est pas entre les racines. Il faut toutes les conditions, reliées par « et ».',
  },
  {
    id: 'g1_abs_dropped', family: 'rule', tag: 'E', skill: 'g1-abs-eq', repair: 'g1-abs-eq', judges: ['solset'],
    name: 'Valeur absolue enlevée sans changer le signe',
    example: ['|2x − 3| = x + 1 → 2x − 3 = x + 1 seul', 'deux cas'],
    check: { judge: { kind: 'solset', v: 'x' }, prev: '|2x-3|=x+1', line: '2x-3=x+1' },
    transform: (prev) => {
      const out = each(prev, (n) => n.t === 'abs', (n) => ({ node: par(n.e), ctx: { a: n.e } }));
      if (out.length > 1) out.push({ node: mapNode(prev, (n) => (n.t === 'abs' ? par(n.e) : n)), ctx: {} });
      return out;
    },
    explain: (ctx = {}) => `Quand ${ctx.a ? M(ctx.a) : 'ce qui est dans la valeur absolue'} est négatif, sa valeur absolue est son opposé : |A| = −A. Il faut un cas pour chaque signe.`,
  },
  {
    id: 'g1_abs_one_case', family: 'rule', tag: 'E', skill: 'g1-abs-eq', repair: 'g1-abs-eq', judges: ['solset'],
    name: '|A| = B → A = ±B, sans B ≥ 0',
    example: ['|x + 3| = 2x → x = 3 ou x = −1', 'x = 3'],
    check: { judge: { kind: 'solset', v: 'x' }, prev: '|x+3|=2x', line: 'x=3 ou x=-1' },
    transform: (prev) => {
      const n = stripParen(prev);
      if (n.t !== 'rel' || n.op !== '=') return [];
      const out = [];
      const one = (a, b) => out.push({ node: or(rel('=', a.e, b), rel('=', a.e, neg(par(b)))), ctx: { b } });
      if (stripParen(n.l).t === 'abs' && !contains(n.r, (x) => x.t === 'abs')) one(stripParen(n.l), n.r);
      if (stripParen(n.r).t === 'abs' && !contains(n.l, (x) => x.t === 'abs')) one(stripParen(n.r), n.l);
      return out;
    },
    explain: (ctx = {}) => `Une valeur absolue est ≥ 0 : |A| = B demande B ≥ 0${ctx.b ? `, ici ${M(ctx.b)} ≥ 0` : ''}. Une solution qui rend B négatif est fausse.`,
  },
  {
    id: 'g1_abs_case_bounds', family: 'method', tag: 'E', skill: 'g1-abs-ineq', repair: 'g1-abs-eq', judges: ['solset'],
    name: 'Solutions d\'un cas gardées hors du cas',
    example: ['x² + |x − 5| ≤ 7 : [−4 ; 3]', '[−1 ; 2]'],
    check: { judge: { kind: 'solset', v: 'x', sets: { S_1: '∅', S_2: '[-1;2]' }, raw: { S_1: '[-4;3]', S_2: '[-1;2]' } }, prev: 'S_1∪S_2', line: '[-4;3]' },
    transform: (prev, ctx = {}) => {
      const raw = ctx.cfg?.raw;
      if (!raw || !Object.keys(raw).length) return [];
      const node = Object.values(raw).map((t) => parse(t)).reduce((a, b) => ({ t: 'setop', op: '∪', l: a, r: b }));
      return [{ node, ctx: {} }];
    },
    explain: () => 'Dans chaque cas, garde seulement les x du cas : les solutions brutes d\'un cas « x ≥ 5 » qui sont < 5 ne comptent pas. Intersecte avant de réunir.',
  },
  {
    id: 'g1_abs_and_or', family: 'logic', tag: 'E', skill: 'g1-abs-ineq', repair: 'g9-intervals', judges: ['solset'],
    name: '« et » et « ou » échangés avec une valeur absolue',
    example: ['|x − 1| > 2 → −2 < x − 1 < 2', 'x − 1 < −2 ou x − 1 > 2'],
    check: { judge: { kind: 'solset', v: 'x' }, prev: '|x-1|>2', line: '-2<x-1<2' },
    transform: (prev) => {
      const n = stripParen(prev);
      if (n.t !== 'rel' || !INEQ.has(n.op) || stripParen(n.l).t !== 'abs' || contains(n.r, (x) => x.t === 'abs')) return [];
      const A = stripParen(n.l).e;
      const B = n.r;
      // The other form: |A| < B read as « A < −B ou A > B », |A| > B as −B < A < B.
      if (n.op === '<' || n.op === '≤') return [{ node: or(rel(n.op, A, neg(par(B))), rel(FLIP[n.op], A, B)), ctx: {} }];
      const op = n.op === '>' ? '<' : '≤';
      return [{ node: { t: 'chain', items: [neg(par(B)), A, B], ops: [op, op] }, ctx: {} }];
    },
    explain: () => '|A| < B : A est près de 0, entre −B et B (« et »). |A| > B : A est loin de 0, d\'un côté ou de l\'autre (« ou »).',
  },
  {
    id: 'g1_irr_extraneous', family: 'method', tag: 'E', skill: 'g1-irr-eq', repair: 'g1-irr-eq', judges: ['solset'],
    name: 'Solutions du carré gardées sans la condition B ≥ 0',
    example: ['√(x + 7) = x + 1 : {−3 ; 2}', '{2}'],
    check: { judge: { kind: 'solset', v: 'x' }, prev: 'x≥-1 et (x=2 ou x=-3)', line: '{-3;2}' },
    transform: (prev) => {
      const n = stripParen(prev);
      const out = [];
      if (n.t === 'rel' && n.op === '=') {
        if (stripParen(n.l).t === 'sqrt') out.push({ node: rel('=', stripParen(n.l).e, { t: 'pow', b: par(n.r), e: num(2) }), ctx: { b: n.r } });
        if (stripParen(n.r).t === 'sqrt') out.push({ node: rel('=', stripParen(n.r).e, { t: 'pow', b: par(n.l), e: num(2) }), ctx: { b: n.l } });
      }
      if (n.t === 'logic' && n.op === 'and') {
        const l = stripParen(n.l);
        const r = stripParen(n.r);
        if (isIneq(l) && isEquation(r)) out.push({ node: r, ctx: { cond: l } });
        if (isIneq(r) && isEquation(l)) out.push({ node: l, ctx: { cond: r } });
      }
      return out;
    },
    explain: (ctx = {}) => `Une racine carrée n'est jamais négative : il faut ${ctx.b ? `${M(ctx.b)} ≥ 0` : ctx.cond ? M(ctx.cond) : 'B ≥ 0'}. Élever au carré ajoute les solutions de √A = −B.`,
  },
  {
    id: 'g1_square_no_cond', family: 'method', tag: 'E', skill: 'g1-irr-ineq', repair: 'g1-irr-eq', judges: ['solset'],
    name: 'Inéquation élevée au carré sans regarder les signes',
    example: ['√(x + 12) ≤ x : [−12 ; −3] ∪ [4 ; +∞[', '[4 ; +∞['],
    check: { judge: { kind: 'solset', v: 'x' }, prev: 'sqrt(x+12)≤x', line: '[-12;-3]∪[4;+∞[' },
    transform: (prev) => {
      const n = stripParen(prev);
      if (n.t !== 'rel' || !INEQ.has(n.op)) return [];
      const sq = (b) => ({ t: 'pow', b: par(b), e: num(2) });
      const out = [];
      const l = stripParen(n.l);
      const r = stripParen(n.r);
      if (l.t === 'sqrt' && !contains(n.r, (x) => x.t === 'sqrt')) out.push({ node: and(rel('≥', l.e, num(0)), rel(n.op, l.e, sq(n.r))), ctx: {} });
      if (r.t === 'sqrt' && !contains(n.l, (x) => x.t === 'sqrt')) out.push({ node: and(rel('≥', r.e, num(0)), rel(n.op, sq(n.l), r.e)), ctx: {} });
      return out;
    },
    explain: () => 'On ne peut élever au carré une inégalité que si les deux membres sont ≥ 0. Si le membre sans racine est négatif, √A ≤ B est fausse et √A ≥ B est vraie (dès que A ≥ 0).',
  },
  {
    id: 'g1_triangle_reverse', family: 'rule', tag: 'E', skill: 'g1-bound', repair: 'g1-bound', judges: ['equiv'],
    name: 'Inégalité triangulaire à l\'envers',
    example: ['|x + 2| ≤ |x| − 2', '|x + 2| ≤ |x| + 2'],
    check: { judge: { kind: 'equiv', vars: ['x'], domain: { x: [-1, 1] }, rel: '≤', target: 'constant' }, prev: '|x+2|', line: '|x|-2' },
    transform: (prev) => each(prev, (n) => n.t === 'abs' && stripParen(n.e).t === 'bin' && ['+', '-'].includes(stripParen(n.e).op), (n) => {
      const e = stripParen(n.e);
      return { node: par({ t: 'bin', op: '-', l: { t: 'abs', e: e.l }, r: { t: 'abs', e: e.r } }), ctx: {} };
    }),
    explain: () => 'L\'inégalité triangulaire donne |a ± b| ≤ |a| + |b|, avec un +. Avec a = 1 et b = −1 : |a − b| = 2, mais |a| − |b| = 0.',
  },
  {
    id: 'g1_bound_denominator', family: 'rule', tag: 'E', skill: 'g1-bound', repair: 'g1-bound', judges: ['equiv'],
    name: 'Dénominateur remplacé par son maximum',
    example: ['1/(x² + 1) ≤ 1/10 sur [1 ; 3]', '≤ 1/2'],
    check: { judge: { kind: 'equiv', vars: ['x'], domain: { x: [1, 3] }, rel: '≤', target: 'constant' }, prev: '1/(x^2+1)', line: '1/10' },
    transform: (prev, ctx = {}) => {
      const v = ctx.v || 'x';
      const dom = ctx.cfg?.domain?.[v];
      if (!dom || !ctx.cfg?.rel) return [];
      return each(prev, (n) => n.t === 'frac' && hasV(n.d, v), (n) => {
        const m = maxOn(n.d, v, dom);
        return m && m.n > 0 ? { node: { t: 'frac', n: n.n, d: lit(m) }, ctx: { d: n.d } } : null;
      });
    },
    explain: (ctx = {}) => `Plus le dénominateur est petit, plus la fraction est grande : pour majorer, on remplace ${ctx.d ? M(ctx.d) : 'le dénominateur'} par sa plus petite valeur, pas par la plus grande.`,
  },
];
