// Traps of module G2 (exponentielles, logarithmes, hyperboliques), spec §7.
// Catalogue: docs/universite/G-gymnase-1.md, G2, « Pièges du module ».
//
// Simplification traps replay the wrong rule on the previous line (judge
// `equiv`: the candidate is compared by equivalence). Equation traps replay
// the mistake on a line of the solution (judge `solset`: same solution
// set; for a line holding a number that does not exist, such as ln(−2),
// the candidate must hold one too). `check`: see js/cas/rules/g9.js.

import { parse } from '../parse.js';
import { stripParen, mapNode, walk, replaceAt, contains, lit, num } from '../ast.js';
import { toMathML } from '../mathml.js';
import { toReadable } from '../print.js';
import { exactValue } from '../normal.js';
import { evalFloat } from '../numeric.js';
import { solutionSet, points, isFiniteSet } from '../sets.js';

const M = (n) => toMathML(stripParen(n));
const P = (t) => (typeof t === 'string' ? parse(t) : t);
const par = (e) => ({ t: 'paren', e });
const isLn = (n) => n.t === 'fn' && ['ln', 'log', 'Log'].includes(n.name);
const isE = (n) => stripParen(n).t === 'const' && stripParen(n).name === 'e';
const bin = (op, l, r) => ({ t: 'bin', op, l, r });
const sumParts = (n) => {
  n = stripParen(n);
  return n.t === 'bin' && (n.op === '+' || n.op === '-') ? { op: n.op, l: n.l, r: n.r } : null;
};

// One candidate per sub-expression matching pred, replaced by fn(node).
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

// The roots of a line in t (no substitution), when there are finitely many.
function tRoots(prev, t) {
  try {
    const S = solutionSet(prev, { v: t });
    if (!S.parts.length || !isFiniteSet(S) || S.parts.length > 4) return null;
    return points(S);
  } catch { return null; }
}

// x from t = b^x: ln(t)/ln(b), or ln(t) for t = eˣ (a node).
function back(tNode, subst, x) {
  const base = stripParen(subst);
  const t = par(tNode);
  if (base.t === 'pow' && stripParen(base.e).t === 'sym' && stripParen(base.e).name === x) {
    if (isE(base.b)) return { t: 'fn', name: 'ln', args: [t] };
    return { t: 'frac', n: { t: 'fn', name: 'ln', args: [t] }, d: { t: 'fn', name: 'ln', args: [base.b] } };
  }
  if (base.t === 'fn' && base.name === 'exp') return { t: 'fn', name: 'ln', args: [t] };
  return null;
}

const ors = (nodes) => nodes.reduce((acc, n) => (acc ? { t: 'logic', op: 'or', l: acc, r: n } : n), null);
const boundNode = (b) => (b.q ? lit(b.q) : b.node ?? { t: 'float', x: b.x });

// Sums of logarithms of the same base on one side, merged into one.
function mergeLogs(node) {
  return mapNode(node, (n) => {
    if (n.t !== 'bin' || n.op !== '+') return n;
    const a = stripParen(n.l);
    const b = stripParen(n.r);
    const same = (a.t === 'fn' && b.t === 'fn' && a.name === b.name && (isLn(a) || (a.name === 'logb' && exactValue(a.args[0])?.eq(exactValue(b.args[0]) ?? NaN))));
    if (!same) return n;
    const arg = (f) => (f.name === 'logb' ? f.args[1] : f.args[0]);
    const prod = bin('×', par(arg(a)), par(arg(b)));
    return a.name === 'logb' ? { t: 'fn', name: 'logb', args: [a.args[0], prod] } : { t: 'fn', name: a.name, args: [prod] };
  });
}

const baseOf = (f) => (f.name === 'logb' ? exactValue(f.args[0]) : null);

export const RULES = [
  {
    id: 'g2_exp_sum', family: 'distribute', tag: 'E', skill: 'g2-real-powers', repair: 'g2-real-powers', judges: ['equiv'],
    name: 'Somme dans l\'exposant lue comme une somme de puissances',
    example: ['e^(x+2) = eˣ + e²', 'e^(x+2) = eˣ·e²'],
    check: { judge: { kind: 'equiv', vars: ['x'], domain: { x: [-2, 2] } }, prev: 'e^(x+2)', line: 'e^x+e^2' },
    transform: (prev) => [
      ...each(prev, (n) => n.t === 'pow' && sumParts(n.e), (n) => {
        const s = sumParts(n.e);
        return { node: bin(s.op, { t: 'pow', b: n.b, e: s.l }, { t: 'pow', b: n.b, e: s.r }), ctx: { base: n.b } };
      }),
      ...each(prev, (n) => n.t === 'bin' && n.op === '×' && stripParen(n.l).t === 'pow' && stripParen(n.r).t === 'pow', (n) => {
        const a = stripParen(n.l);
        const b = stripParen(n.r);
        if (toReadable(a.b) !== toReadable(b.b)) return null;
        return { node: { t: 'pow', b: a.b, e: bin('×', par(a.e), par(b.e)) }, ctx: { base: a.b } };
      }),
    ],
    explain: () => 'Une somme dans l\'exposant donne un produit : a^(u + v) = aᵘ·aᵛ. Avec x = 0 : e² ≈ 7,4, mais e⁰ + e² ≈ 8,4.',
  },
  {
    id: 'g2_power_power', family: 'rule', tag: 'E', skill: 'g2-real-powers', repair: 'pow-rules', judges: ['equiv'],
    name: 'Puissance d\'une puissance : exposants additionnés',
    example: ['(a^(1/2))⁶ = a^(13/2)', '(a^(1/2))⁶ = a³'],
    check: { judge: { kind: 'equiv', vars: ['a'], domain: { a: [0.2, 4] } }, prev: '(a^(1/2))^6', line: 'a^(13/2)' },
    transform: (prev) => each(prev, (n) => n.t === 'pow' && stripParen(n.b).t === 'pow', (n) => {
      const inner = stripParen(n.b);
      return { node: { t: 'pow', b: inner.b, e: bin('+', par(inner.e), par(n.e)) }, ctx: { p: inner.e, q: n.e } };
    }),
    explain: (ctx = {}) => (ctx.p
      ? `(aᵖ)ᵠ : on multiplie les exposants, ${toReadable(stripParen(ctx.p))} fois ${toReadable(stripParen(ctx.q))}. On les additionne seulement pour un produit aᵖ·aᵠ.`
      : '(aᵖ)ᵠ = aᵖᵠ : on multiplie les exposants. On les additionne seulement pour un produit aᵖ·aᵠ.'),
  },
  {
    id: 'g2_log_sum', family: 'distribute', tag: 'R', skill: 'g2-log-rules', repair: 'g2-log-rules', judges: ['equiv'],
    name: 'ln d\'une somme découpé en somme de ln',
    example: ['ln(a + b) = ln a + ln b', 'ln(a + b) ne se découpe pas'],
    check: { judge: { kind: 'equiv', vars: ['x'], domain: { x: [0.2, 5] } }, prev: 'ln(x+2)', line: 'ln(x)+ln(2)' },
    transform: (prev) => each(prev, (n) => (isLn(n) || n.t === 'fn' && n.name === 'logb') && sumParts(n.name === 'logb' ? n.args[1] : n.args[0])?.op === '+', (n) => {
      const s = sumParts(n.name === 'logb' ? n.args[1] : n.args[0]);
      const f = (a) => (n.name === 'logb' ? { t: 'fn', name: 'logb', args: [n.args[0], a] } : { t: 'fn', name: n.name, args: [a] });
      return { node: bin('+', f(s.l), f(s.r)), ctx: { arg: n.name === 'logb' ? n.args[1] : n.args[0] } };
    }),
    explain: () => 'ln(a + b) n\'a pas de règle. Avec a = b = 1 : ln 2 ≈ 0,69, mais ln 1 + ln 1 = 0. La règle ln(uv) = ln u + ln v vaut pour un produit, pas pour une somme.',
  },
  {
    id: 'g2_log_power', family: 'rule', tag: 'E', skill: 'g2-log-rules', repair: 'g2-log-rules', judges: ['equiv'],
    name: 'ln(Aᵖ) lu comme (ln A)ᵖ',
    example: ['ln(x³) = (ln x)³', 'ln(x³) = 3 ln x'],
    check: { judge: { kind: 'equiv', vars: ['x'], domain: { x: [0.2, 5] } }, prev: 'ln(x^3)', line: 'ln(x)^3' },
    transform: (prev) => each(prev, (n) => isLn(n) && stripParen(n.args[0]).t === 'pow', (n) => {
      const p = stripParen(n.args[0]);
      return { node: { t: 'pow', b: { t: 'fn', name: n.name, args: [p.b] }, e: p.e }, ctx: { e: p.e } };
    }),
    explain: (ctx = {}) => `L'exposant sort devant le logarithme : ln(Aᵖ) = p·ln A. Avec x = e : ln(e³) = 3, mais (ln e)³ = 1.${ctx.e ? '' : ''}`,
  },
  {
    id: 'g2_log_quotient', family: 'rule', tag: 'E', skill: 'g2-log-rules', repair: 'g2-log-rules', judges: ['equiv'],
    name: 'ln A − ln B confondu avec ln A / ln B',
    example: ['ln a − ln b = ln a / ln b', 'ln a − ln b = ln(a/b)'],
    check: { judge: { kind: 'equiv', vars: ['x'], domain: { x: [0.2, 5] } }, prev: 'ln(x)-ln(2)', line: 'ln(x)/ln(2)' },
    transform: (prev) => [
      ...each(prev, (n) => n.t === 'bin' && n.op === '-' && isLn(stripParen(n.l)) && isLn(stripParen(n.r)), (n) => ({ node: { t: 'frac', n: stripParen(n.l), d: stripParen(n.r) } })),
      ...each(prev, (n) => isLn(n) && stripParen(n.args[0]).t === 'frac', (n) => {
        const f = stripParen(n.args[0]);
        return { node: { t: 'frac', n: { t: 'fn', name: n.name, args: [f.n] }, d: { t: 'fn', name: n.name, args: [f.d] } } };
      }),
    ],
    explain: () => 'ln(a/b) = ln a − ln b : une différence, pas un quotient. Par exemple ln 8 / ln 2 = 3, mais ln(8/2) = ln 4 ≈ 1,39.',
  },
  {
    id: 'g2_exp_neg_t', family: 'method', tag: 'E', skill: 'g2-exp-eq', repair: 'g2-exp-eq', judges: ['solset'],
    name: 'Racine t négative gardée : eˣ = −2',
    example: ['t = −2 gardé : x = ln(−2)', 'eˣ = −2 n\'a pas de solution'],
    check: { judge: { kind: 'solset', v: 'x', subst: { t: 'e^x' } }, prev: 't^2-t-6=0', line: 'x=ln(3) ou x=ln(-2)' },
    transform: (prev, ctx) => {
      const cfg = ctx?.cfg || {};
      const x = cfg.v || 'x';
      const out = [];
      for (const [t, e] of Object.entries(cfg.subst || {})) {
        const rs = tRoots(prev, t);
        if (!rs || !rs.some((b) => b.x <= 0)) continue;
        const sub = P(e);
        const xs = rs.map((b) => back(boundNode(b), sub, x));
        if (xs.some((n) => !n)) continue;
        out.push({ node: ors(xs.map((n) => ({ t: 'rel', op: '=', l: { t: 'sym', name: x }, r: n }))), ctx: { t: rs.find((b) => b.x <= 0) } });
      }
      return out;
    },
    explain: (ctx = {}) => (ctx.t ? `eˣ est toujours > 0 : eˣ = ${toReadable(boundNode(ctx.t))} n'a pas de solution. Cette racine du trinôme est à rejeter.` : 'eˣ est toujours > 0 : une racine t ≤ 0 du trinôme ne donne aucun x.'),
  },
  {
    id: 'g2_log_domain', family: 'method', tag: 'E', skill: 'g2-log-eq', repair: 'g2-log-eq', judges: ['solset'], // TEMP u1b-merge: repair 'g1-domain' once G1 is merged
    name: 'Solutions gardées hors du domaine',
    example: ['S = {−3 ; 3}', 'S = {3}'],
    check: { judge: { kind: 'solset', v: 'x', onDomain: true }, prev: 'log_2(x-1)+log_2(x+1)=3', line: '{-3;3}' },
    transform: (prev, ctx) => {
      if (!ctx?.cfg?.onDomain) return [];
      const merged = mergeLogs(prev);
      return [{ node: prev, ctx: {} }, { node: merged, ctx: {} }];
    },
    explain: () => 'Une solution doit être dans le domaine : chaque logarithme doit exister. Remplace la valeur dans l\'équation de départ : un ln d\'un nombre ≤ 0 n\'existe pas.',
  },
  {
    id: 'g2_log_square_abs', family: 'rule', tag: 'E', skill: 'g2-log-eq', repair: 'g2-log-rules', judges: ['solset', 'equiv'],
    name: 'ln(x²) = 2 ln x, sans valeur absolue',
    example: ['ln(x²) = 2 ln x', 'ln(x²) = 2 ln|x|'],
    check: { judge: { kind: 'solset', v: 'x', onDomain: true }, prev: 'ln(x^2)=2ln(x+2)', line: '2ln(x)=2ln(x+2)' },
    transform: (prev) => each(prev, (n) => isLn(n) && stripParen(n.args[0]).t === 'pow' && exactValue(stripParen(n.args[0]).e)?.n % 2 === 0, (n) => {
      const p = stripParen(n.args[0]);
      return { node: bin('×', p.e, { t: 'fn', name: n.name, args: [p.b] }), ctx: { b: p.b } };
    }),
    explain: () => 'ln((−2)²) = ln 4 existe, mais 2 ln(−2) non. Pour tout x ≠ 0 : ln(x²) = 2 ln|x|.',
  },
  {
    id: 'g2_base_lt1', family: 'sign', tag: 'E', skill: 'g2-ineq', repair: 'g2-ineq', judges: ['solset'],
    name: 'Base < 1 : inégalité pas retournée',
    example: ['log_{1/3}(2x − 1) > log_{1/3}(x + 2) → 2x − 1 > x + 2', '2x − 1 < x + 2'],
    check: { judge: { kind: 'solset', v: 'x', onDomain: true }, prev: 'log_(1/3)(2x-1)>log_(1/3)(x+2)', line: '2x-1>x+2' },
    transform: (prev) => {
      const n = stripParen(prev);
      if (n.t !== 'rel' || n.op === '=' || n.op === '≠') return [];
      const a = stripParen(n.l);
      const b = stripParen(n.r);
      const small = (f) => {
        if (f.t === 'fn' && f.name === 'logb') { const q = baseOf(f); return q && q.valueOf() < 1 ? q : null; }
        if (f.t === 'pow' && !contains(f.b, (x) => x.t === 'sym')) { const v = evalFloat(f.b, {}); return v > 0 && v < 1 ? v : null; }
        return null;
      };
      if (!small(a) || !small(b)) return [];
      const inner = (f) => (f.t === 'fn' ? f.args[1] : f.e);
      return [{ node: { t: 'rel', op: n.op, l: inner(a), r: inner(b) }, ctx: { base: a.t === 'fn' ? a.args[0] : a.b } }];
    },
    explain: (ctx = {}) => `Avec une base < 1${ctx.base ? ` (ici ${toReadable(stripParen(ctx.base))})` : ''}, la fonction est décroissante : le plus grand logarithme a le plus petit argument. Par exemple log_{1/3} 9 = −2 < log_{1/3} 3 = −1, alors que 9 > 3. L'inégalité se retourne.`,
  },
  {
    id: 'g2_xx_lost_one', family: 'method', tag: 'E', skill: 'g2-xx', repair: 'g2-xx', judges: ['solset'],
    name: 'Solution x = 1 perdue (division par ln x)',
    example: ['S = {2}', 'S = {1 ; 2}'],
    check: { judge: { kind: 'solset', v: 'x', domain: ']0;+∞[' }, prev: '2x ln(x)=x^2 ln(x)', line: '2x=x^2' },
    transform: (prev, ctx) => {
      const x = ctx?.cfg?.v || 'x';
      const isLnX = (f) => isLn(stripParen(f)) && stripParen(stripParen(f).args[0]).t === 'sym' && stripParen(stripParen(f).args[0]).name === x;
      // Drop the factors ln x of every product.
      const drop = mapNode(prev, (n) => {
        if (n.t !== 'bin' || n.op !== '×') return n;
        if (isLnX(n.l)) return n.r;
        if (isLnX(n.r)) return n.l;
        return n;
      });
      const out = [];
      if (toReadable(drop) !== toReadable(prev)) out.push({ node: drop, ctx: {} });
      // « x = 1 ou x = 2 » without x = 1.
      const n = stripParen(prev);
      if (n.t === 'logic' && n.op === 'or') {
        const parts = [];
        const flat = (m) => { m = stripParen(m); if (m.t === 'logic' && m.op === 'or') { flat(m.l); flat(m.r); } else parts.push(m); };
        flat(n);
        const rest = parts.filter((m) => !(m.t === 'rel' && m.op === '=' && exactValue(m.r)?.eq(1)));
        if (rest.length && rest.length < parts.length) out.push({ node: ors(rest), ctx: {} });
      }
      return out;
    },
    explain: () => 'x = 1 est solution : 1 à n\'importe quelle puissance vaut 1. On ne divise pas par ln x : c\'est le facteur ln x = 0 qui donne x = 1.',
  },
  {
    id: 'g2_hyp_trig_sign', family: 'sign', tag: 'E', skill: 'g2-hyp-formulas', repair: 'g2-hyp-def', judges: ['equiv'],
    name: 'Signe de la trigonométrie dans une formule hyperbolique',
    example: ['cosh 2x = cosh²x − sinh²x', 'cosh 2x = cosh²x + sinh²x'],
    check: { judge: { kind: 'equiv', vars: ['x'], domain: { x: [-2, 2] } }, prev: 'cosh(2x)', line: 'cosh(x)^2-sinh(x)^2' },
    transform: (prev) => {
      const fn = (name, a) => ({ t: 'fn', name, args: [a] });
      const sq = (name, a) => ({ t: 'pow', b: fn(name, a), e: num(2) });
      const out = [];
      // cosh 2u → cosh²u − sinh²u ; cosh(u + v) → cosh u cosh v − sinh u sinh v.
      out.push(...each(prev, (n) => n.t === 'fn' && n.name === 'cosh', (n) => {
        const a = stripParen(n.args[0]);
        if (a.t === 'bin' && a.op === '×' && exactValue(a.l)?.eq(2)) return { node: bin('-', sq('cosh', a.r), sq('sinh', a.r)) };
        if (a.t === 'bin' && a.op === '+') return { node: bin('-', bin('×', fn('cosh', a.l), fn('cosh', a.r)), bin('×', fn('sinh', a.l), fn('sinh', a.r))) };
        return null;
      }));
      // cosh²u + sinh²u written with − (and the other way), 1 + tanh² for 1 − tanh².
      out.push(...each(prev, (n) => n.t === 'bin' && (n.op === '+' || n.op === '-') && contains(n.r, (m) => m.t === 'fn' && (m.name === 'sinh' || m.name === 'tanh')), (n) => ({ node: { ...n, op: n.op === '+' ? '-' : '+' } })));
      return out;
    },
    explain: () => 'cosh²x − sinh²x vaut 1, pas cosh 2x. Les formules hyperboliques ont un + là où la trigonométrie a un − : cosh 2x = cosh²x + sinh²x. Refais le calcul avec les exponentielles pour t\'en convaincre.',
  },
  {
    id: 'g2_cosh_one_root', family: 'method', tag: 'E', skill: 'g2-hyp-eq', repair: 'g2-arg', judges: ['solset'],
    name: 'cosh x = a : une seule solution gardée',
    example: ['cosh x = 5/3 : S = {ln 3}', 'S = {−ln 3 ; ln 3}'],
    check: { judge: { kind: 'solset', v: 'x', subst: { t: 'e^x' } }, prev: 't=3 ou t=1/3', line: 'x=ln(3)' },
    transform: (prev, ctx) => {
      const cfg = ctx?.cfg || {};
      const x = cfg.v || 'x';
      const out = [];
      const n = stripParen(prev);
      if (n.t === 'rel' && n.op === '=' && stripParen(n.l).t === 'fn' && stripParen(n.l).name === 'cosh') {
        out.push({ node: { t: 'rel', op: '=', l: stripParen(n.l).args[0], r: { t: 'fn', name: 'argch', args: [n.r] } }, ctx: {} });
      }
      for (const [t, e] of Object.entries(cfg.subst || {})) {
        const rs = tRoots(prev, t);
        if (!rs || rs.length !== 2 || !rs.every((b) => b.x > 0)) continue;
        const big = rs.filter((b) => b.x >= 1);
        if (big.length !== 1) continue;
        const r = back(boundNode(big[0]), P(e), x);
        if (r) out.push({ node: { t: 'rel', op: '=', l: { t: 'sym', name: x }, r }, ctx: {} });
      }
      return out;
    },
    explain: () => 'cosh est paire : si x est solution, −x aussi. La racine t < 1 du trinôme donne la solution négative (eˣ = 1/3 : x = −ln 3).',
  },
  {
    id: 'g2_argsh_sign', family: 'sign', tag: 'E', skill: 'g2-arg', repair: 'g2-arg', judges: ['solset'],
    name: 'Racine négative gardée pour eᵘ',
    example: ['eᵘ = y − √(y² + 1)', 'eᵘ = y + √(y² + 1)'],
    check: { judge: { kind: 'solset', v: 'u', subst: { t: 'e^u' }, params: { y: 'ℝ' } }, prev: 't^2-2yt-1=0', line: 't=y-sqrt(y^2+1)' },
    // With a parameter and t = eᵘ: the negative root alone gives no u at
    // all (∅), whatever the line before.
    transform: (prev, ctx) => {
      const cfg = ctx?.cfg || {};
      if (!Object.keys(cfg.params || {}).length || !Object.keys(cfg.subst || {}).length) return [];
      const out = [{ node: { t: 'set', kind: 'named', name: '∅' }, ctx: {} }];
      const n = stripParen(prev);
      if (n.t === 'logic' && n.op === 'or') out.push({ node: n.l, ctx: {} }, { node: n.r, ctx: {} });
      return out;
    },
    explain: () => 'y − √(y² + 1) est toujours < 0, car √(y² + 1) > |y|. Or eᵘ > 0 : seule la racine y + √(y² + 1) convient.',
  },
];

export { mergeLogs };
