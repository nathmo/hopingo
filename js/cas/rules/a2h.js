// Traps of module A2, part h (step U6): what makes the catalogue's traps
// of this part work (the table itself is META in rules/a2.js). DEFS: {id:
// {name, judges, transform, wrongValues, explain, check}}; explain()
// falls back on the catalogue's text.
//
// Most traps replay a line of the `ode` judge. Two sources of candidates:
// - the student's previous line (prev): ln|y| = R + C read back as
//   y = e^R + C, c·ln|E| = R read without its sign, a general solution with
//   C₂ = C₁ or C₂ = 0, the roots of a characteristic equation (judge
//   `complex`) with their signs changed;
// - the judge's configuration, which the generators of analyse2-h fill:
//   cfg.traps = {ruleId: [line texts]} (the wrong μ, the wrong W of Abel,
//   (μy)′ = b…) and cfg.char = {kind: 'real' | 'double' | 'complex', r1, r2,
//   r, a, b} (texts of the characteristic roots).
// The traps on statements (« continue ⇒ unique », « C¹ ⇒ globale »,
// « y₀ + Cy₁ est solution ») are final answers: true/false items and options
// carry them (check: {bait} or {counter}).

import { parse } from '../parse.js';

import { toText } from '../print.js';
import { stripParen, mapNode, contains } from '../ast.js';
import { pretty } from '../normal.js';


// A line of the judge of cfg, read as the judge reads it (ode lines are
// relations; the separated form is not needed here).
function readFor(cfg, text) {
  if (cfg.kind === 'complex') return parse(text, { vars: [...(cfg.vars || []), cfg.unknown || 'z'], complex: true });
  if (cfg.kind === 'ode') return parse(text, { dvar: cfg.v || 'x' });
  return parse(text, { vars: cfg.vars, dvar: cfg.dvar || cfg.vars?.[0] || 'x' });
}

// The candidates written by the generator in cfg.traps[id].
function fromCfg(id, ctx) {
  const cfg = ctx?.cfg || {};
  const list = cfg.traps?.[id] || [];
  const out = [];
  for (const t of list) {
    try { out.push({ node: readFor(cfg, typeof t === 'string' ? t : t.line), ctx: { ...(typeof t === 'string' ? {} : t.ctx || {}) } }); } catch { /* skip */ }
  }
  return out;
}

const isSym = (n, name) => { n = stripParen(n); return n.t === 'sym' && n.name === name && !n.sub; };
const isConst = (n) => { n = stripParen(n); return n.t === 'sym' && (n.name === 'C' || n.name === 'K') && !n.sub; };
const zeroConsts = (n) => mapNode(n, (x) => (isConst(x) ? parse('0') : x));

// ln|y| = R(x) + C → y = e^(R) + C (the constant added after the exponential).
function constantLate(prev, ctx) {
  const out = fromCfg('a2_ode_sep_constant_late', ctx);
  const p = stripParen(prev || {});
  if (p.t !== 'rel' || p.op !== '=') return out;
  const u = ctx?.cfg?.unknown || 'y';
  const l = stripParen(p.l);
  if (l.t !== 'fn' || !['ln', 'log', 'Log'].includes(l.name)) return out;
  const arg = stripParen(l.args[0]);
  if (!(isSym(arg, u) || (arg.t === 'abs' && isSym(arg.e, u)))) return out;
  if (!contains(p.r, isConst)) return out;
  let R = toText(zeroConsts(p.r));
  try { R = toText(pretty(zeroConsts(p.r))); } catch { /* keep */ }
  out.push({ node: parse(`${u} = e^(${R}) + C`, { dvar: ctx?.cfg?.v || 'x' }), ctx: { R } });
  return out;
}

// c·ln|E| = R → E = −e^(R/c): the sign chosen against the initial condition.
function signAbs(prev, ctx) {
  const out = fromCfg('a2_ode_sign_abs', ctx);
  const p = stripParen(prev || {});
  if (p.t !== 'rel' || p.op !== '=') return out;
  let l = stripParen(p.l);
  let c = '1';
  if (l.t === 'bin' && l.op === '×' && !contains(l.l, (x) => x.t === 'sym')) { c = toText(l.l); l = stripParen(l.r); }
  if (l.t !== 'fn' || !['ln', 'log', 'Log'].includes(l.name)) return out;
  const arg = stripParen(l.args[0]);
  if (arg.t !== 'abs') return out;
  if (contains(p.r, isConst)) return out;
  const E = toText(arg.e);
  out.push({ node: parse(`${E} = -e^((${toText(p.r)})/(${c}))`, { dvar: ctx?.cfg?.v || 'x' }), ctx: { E } });
  return out;
}

// A general solution with C₂ = C₁ or C₂ = 0.
function constantCount(prev, ctx) {
  const out = fromCfg('a2_ode_constant_count', ctx);
  const p = stripParen(prev || {});
  if (p.t !== 'rel' || p.op !== '=') return out;
  const is = (n, k) => { n = stripParen(n); return n.t === 'sym' && n.name === 'C' && n.sub && toText(n.sub) === k; };
  if (!contains(p.r, (x) => is(x, '2'))) return out;
  const C1 = parse('C_1');
  out.push({ node: { ...p, r: mapNode(p.r, (x) => (is(x, '2') ? C1 : x)) }, ctx: {} });
  out.push({ node: { ...p, r: mapNode(p.r, (x) => (is(x, '2') ? parse('0') : x)) }, ctx: {} });
  return out;
}

// The solution built from cfg.char with a mistake: fn(char) → text of y.
function fromChar(ctx, fn) {
  const ch = ctx?.cfg?.char;
  if (!ch || ctx.cfg.kind !== 'ode') return [];
  const u = ctx.cfg.unknown || 'y';
  const text = fn(ch, ctx.cfg.v || 'x');
  if (!text) return [];
  return [{ node: parse(`${u} = ${text}`, { dvar: ctx.cfg.v || 'x' }), ctx: { ...ch } }];
}
const neg = (t) => `(-(${t}))`;

// The roots of the characteristic equation in prev (judge complex), with
// their signs changed: a set « r = −r₁ ou r = −r₂ ».
function charSign(prev, ctx) {
  const cfg = ctx?.cfg || {};
  if (cfg.kind === 'ode') {
    return fromChar(ctx, (ch, v) => {
      if (ch.kind === 'real') return `C_1 e^(${neg(ch.r1)}${v}) + C_2 e^(${neg(ch.r2)}${v})`;
      if (ch.kind === 'double') return `(C_1 + C_2 ${v}) e^(${neg(ch.r)}${v})`;
      return `e^(${neg(ch.a)}${v})(C_1 cos((${ch.b})${v}) + C_2 sin((${ch.b})${v}))`;
    });
  }
  if (cfg.kind !== 'complex' || !cfg.char) return [];
  const u = cfg.unknown || 'z';
  const ch = cfg.char;
  const roots = ch.kind === 'real' ? [ch.r1, ch.r2] : ch.kind === 'double' ? [ch.r] : [`${ch.a}+(${ch.b})i`, `${ch.a}-(${ch.b})i`];
  const text = roots.map((r) => `${u} = -(${r})`).join(' ou ');
  return [{ node: parse(text, { vars: [u], complex: true }), ctx: { r: toText(pretty(parse(`-(${roots[0]})`, { complex: true }))) } }];
}

export const DEFS = {
  a2_ode_continuity_unique: {
    name: 'Continue, donc solution unique',
    judges: [],
    wrongValues: () => [{ value: 'Vrai', rule: 'a2_ode_continuity_unique' }],
    explain: () => 'La continuité de f donne une solution (Peano), pas son unicité : y′ = 3y^(2/3), y(0) = 0 a deux solutions, y = 0 et y = t³. Pour l\'unicité, il faut f Lipschitz en y (par exemple ∂f/∂y bornée).',
    check: { bait: { skill: 'a2-ode-cauchy', level: 4 } },
  },
  a2_ode_local_global: {
    name: 'C¹, donc solution globale',
    judges: [],
    wrongValues: () => [{ value: 'Vrai', rule: 'a2_ode_local_global' }],
    explain: () => 'f ∈ C¹ donne une solution unique, mais seulement locale : y′ = y², y(0) = 1 donne y = 1/(1 − t), qui explose en t = 1.',
    check: { bait: { skill: 'a2-ode-cauchy', level: 4 } },
  },
  a2_ode_sep_constant_late: {
    name: 'Constante ajoutée après l\'exponentielle',
    judges: ['ode'],
    transform: constantLate,
    wrongValues: () => [],
    explain: (ctx = {}) => `e^(${ctx.R ? toText(parse(ctx.R)) : 'G(x)'} + C) = e^C·e^(${ctx.R ? toText(parse(ctx.R)) : 'G(x)'}) : la constante multiplie, elle ne s'ajoute pas. Vérifie en dérivant : e^G + C ne redonne pas l'équation.`,
    check: { judge: { kind: 'ode', eq: "y'=2x×y", order: 1 }, prev: 'ln(|y|) = x^2 + C', line: 'y = e^(x^2) + C' },
  },
  a2_ode_sep_lost_constant: {
    name: 'Solution constante perdue en divisant',
    judges: [],
    wrongValues: () => [],
    explain: (ctx = {}) => `Quand h(${ctx.y0 ?? 'y₀'}) = 0, la fonction constante y ≡ ${ctx.y0 ?? 'y₀'} est une solution, et c'est la seule qui vérifie la condition initiale (unicité). Diviser par h(y) l'avait perdue.`,
    check: { bait: { skill: 'a2-ode-separable', level: 2 } },
  },
  a2_ode_sign_abs: {
    name: 'Mauvais signe en enlevant la valeur absolue',
    judges: ['ode'],
    transform: signAbs,
    explain: (ctx = {}) => `En enlevant |${ctx.E ? toText(parse(ctx.E)) : '…'}|, on garde le signe qu'il a au point initial : la condition initiale le donne. Avec le signe −, la relation n'est pas vérifiée au point initial.`,
    check: { judge: { kind: 'ode', eq: "y'=9-y^2", order: 1, ic: { x: 0, y: 0 }, yRange: [-2.9, 2.9] }, prev: '(1/6)ln(|(3+y)/(3-y)|) = x', line: '(3+y)/(3-y) = -e^(6x)' },
  },
  a2_ode_if_not_normalized: {
    name: 'Facteur intégrant avant de normaliser',
    judges: ['ode'],
    transform: (prev, ctx) => fromCfg('a2_ode_if_not_normalized', ctx),
    explain: (ctx = {}) => `Le facteur intégrant suppose y′ seul (coefficient 1)${ctx.coef ? ` : divise d'abord par ${ctx.coef}` : ' : divise d\'abord par le coefficient de y′'}${ctx.a ? `, et a = ${ctx.a}` : ''}. Pour le wronskien, p est aussi le coefficient de y′ après division par celui de y″.`,
    check: { judge: { kind: 'ode', eq: "x×y'+2y=4x^2", order: 1, ic: { x: 1, y: 2 }, mu: '2/x', domain: { x: [0.2, 4] }, traps: { a2_ode_if_not_normalized: [{ line: 'μ = e^(2x)', ctx: { coef: 'x', a: '2/x' } }] } }, prev: "x×y'+2y=4x^2", line: 'μ = e^(2x)' },
  },
  a2_ode_if_sign: {
    name: 'Facteur intégrant e^(−∫a)',
    judges: ['ode'],
    transform: (prev, ctx) => fromCfg('a2_ode_if_sign', ctx),
    explain: () => 'Avec μ = e^(∫a), μ′ = aμ, donc (μy)′ = μ(y′ + ay) : c\'est e^(+∫a). Avec e^(−∫a), le membre de gauche n\'est plus une dérivée.',
    check: { judge: { kind: 'ode', eq: "x×y'+2y=4x^2", order: 1, ic: { x: 1, y: 2 }, mu: '2/x', domain: { x: [0.2, 4] }, traps: { a2_ode_if_sign: ['μ = 1/x^2'] } }, prev: "y'+(2/x)y=4x", line: 'μ = 1/x^2' },
  },
  a2_ode_if_rhs: {
    name: '(μy)′ = b au lieu de μb',
    judges: ['ode'],
    transform: (prev, ctx) => fromCfg('a2_ode_if_rhs', ctx),
    explain: (ctx = {}) => `On a multiplié toute l'équation par μ : le second membre devient μ·b${ctx.mub ? ` = ${ctx.mub}` : ''}, pas b.`,
    check: { judge: { kind: 'ode', eq: "x×y'+2y=4x^2", order: 1, ic: { x: 1, y: 2 }, mu: '2/x', domain: { x: [0.2, 4] }, traps: { a2_ode_if_rhs: [{ line: 'd(x^2 y) = 4x', ctx: { mub: '4x³' } }] } }, prev: 'μ = x^2', line: 'd(x^2 y) = 4x' },
  },
  a2_ode_homog_derivative: {
    name: 'y = xv dérivé sans la règle du produit',
    judges: ['equiv'],
    transform: (prev, ctx) => {
      const imp = ctx?.cfg?.implicit;
      const p = stripParen(prev || {});
      if (!imp || p.t !== 'deriv') return [];
      const [vName] = Object.keys(imp);
      const x = ctx.cfg.vars?.[0] || 'x';
      if (toText(stripParen(p.e)) !== toText(parse(`${x} ${vName}`))) return [];
      return [{ node: parse(vName), ctx: {} }, { node: parse(`${x}×${vName}'`, { dvar: x }), ctx: {} }];
    },
    explain: () => 'y = x·v est un produit de deux fonctions de x : y′ = 1·v + x·v′. Ni v seul, ni x·v′ seul.',
    check: { judge: { kind: 'equiv', vars: ['x', 'v', 'w'], implicit: { v: 'w' }, target: 'no-prime' }, prev: 'd(x v)', line: 'v' },
  },
  a2_ode_superposition_nonhom: {
    name: 'y₀ + C·y₁ solution de L(y) = b',
    judges: [],
    wrongValues: () => [{ value: 'Vrai', rule: 'a2_ode_superposition_nonhom' }],
    explain: () => 'Si L(y₀) = 0 et L(y₁) = b, alors L(y₀ + C·y₁) = 0 + C·b : c\'est égal à b seulement pour C = 1. La somme de deux solutions de L(y) = b donne L(y) = 2b.',
    check: { counter: { kind: 'a2', prop: 'odeComboFails', params: { eq: "y'+y=1", homog: "y'+y=0" } }, answers: { y0: 'e^(-x)', y1: '1', C: '1' } },
  },
  a2_ode_constant_count: {
    name: 'Une seule constante à l\'ordre 2',
    judges: ['ode'],
    transform: constantCount,
    explain: () => 'Une équation d\'ordre 2 a un espace de solutions de dimension 2 : il faut deux constantes indépendantes, C₁ et C₂, devant deux solutions indépendantes.',
    check: { judge: { kind: 'ode', eq: "y''+y=0", order: 2 }, prev: 'y = C_1 cos(x) + C_2 sin(x)', line: 'y = C_1 cos(x) + C_1 sin(x)' },
  },
  a2_ode_double_root: {
    name: 'Racine double sans le facteur x',
    judges: ['ode'],
    transform: (prev, ctx) => fromChar(ctx, (ch, v) => (ch.kind === 'double' ? `(C_1 + C_2) e^((${ch.r})${v})` : null)),
    explain: (ctx = {}) => `C₁e^(${ctx.r ?? 'r'}x) + C₂e^(${ctx.r ?? 'r'}x) = (C₁ + C₂)e^(${ctx.r ?? 'r'}x) : il n'y a en fait qu'une constante. Pour une racine double, la 2e solution est x·e^(${ctx.r ?? 'r'}x).`,
    check: { judge: { kind: 'ode', eq: "y''-4y'+4y=0", order: 2, char: { kind: 'double', r: '2' } }, prev: "y''-4y'+4y=0", line: 'y = C_1 e^(2x) + C_2 e^(2x)' },
  },
  a2_ode_complex_swap: {
    name: 'α et β échangés',
    judges: ['ode'],
    transform: (prev, ctx) => fromChar(ctx, (ch, v) => (ch.kind === 'complex' ? `e^((${ch.b})${v})(C_1 cos((${ch.a})${v}) + C_2 sin((${ch.a})${v}))` : null)),
    explain: (ctx = {}) => `e^((α + iβ)x) = e^(αx)(cos βx + i sin βx) : la partie réelle${ctx.a ? ` α = ${ctx.a}` : ''} va dans l'exponentielle, la partie imaginaire${ctx.b ? ` β = ${ctx.b}` : ''} dans cos et sin.`,
    check: { judge: { kind: 'ode', eq: "y''-4y'+13y=0", order: 2, char: { kind: 'complex', a: '2', b: '3' } }, prev: "y''-4y'+13y=0", line: 'y = e^(3x)(C_1 cos(2x) + C_2 sin(2x))' },
  },
  a2_ode_char_sign: {
    name: 'Racines de signe opposé',
    judges: ['complex', 'ode'],
    transform: charSign,
    explain: (ctx = {}) => `Remplace r par ${ctx.r ? String(ctx.r).replace(/-/g, '−') : 'ta racine'} dans l'équation caractéristique : tu n'obtiens pas 0. Les racines de r² + pr + q = 0 ont pour somme −p : attention au signe.`,
    check: { judge: { kind: 'complex', form: 'set', unknown: 'r', char: { kind: 'real', r1: '1', r2: '2' } }, prev: 'r^2-3r+2 = 0', line: 'r = -1 ou r = -2' },
  },
  a2_wronskian_abel_sign: {
    name: 'Abel avec e^(+∫p)',
    judges: ['ode'],
    transform: (prev, ctx) => fromCfg('a2_wronskian_abel_sign', ctx),
    explain: () => 'W vérifie W′ = −p·W (formule d\'Abel) : W = W(t₀)·e^(−∫p), avec le signe −.',
    check: { judge: { kind: 'ode', eq: "W'=-(1/t-2)W", unknown: 'W', v: 't', order: 1, final: 'one', domain: { t: [0.2, 4] }, traps: { a2_wronskian_abel_sign: ['W = t e^(-2t)'] } }, prev: "W'=-(1/t-2)W", line: 'W = t e^(-2t)' },
  },
};
