// Traps of module G3 (trigo), spec §7. Catalogue:
// docs/universite/G-gymnase-1.md, G3, « Pièges du module ».
//
// Line traps replay the mistake on the previous line: transform(prev, ctx)
// → [{node, ctx}], compared with the student's line by the judge's own
// equivalence (same value for `value`, same function for `equiv`, same
// solution set — families compared on a window — for `solset`).
// `check` says how tests/judges.test.js replays example[0] (see g9.js).

import { stripParen, walk, getAt, replaceAt, mapNode, contains, num, sym } from '../ast.js';
import { parse } from '../parse.js';
import { evalFloat } from '../numeric.js';
import { toMathML } from '../mathml.js';
import { toReadable } from '../print.js';

const M = (n) => toMathML(stripParen(n));
const F = (x) => ({ t: 'float', x });
const TRIG = new Set(['sin', 'cos', 'tan', 'cot']);
const hasSym = (n, name) => contains(n, (y) => y.t === 'sym' && y.name === name && !y.sub);
const constant = (n) => !contains(n, (y) => y.t === 'sym');

function paths(prev, pred) {
  const out = [];
  walk(prev, (n, path) => { if (pred(n)) out.push(path); return true; });
  return out;
}
// Each node matching pred replaced by repl(node): one candidate per node.
const each = (prev, pred, repl) => paths(prev, pred).map((path) => {
  const n = getAt(prev, path);
  const r = repl(n);
  return r ? { node: replaceAt(prev, path, r.node ?? r), ctx: r.ctx ?? {} } : null;
}).filter(Boolean);

// Denominator of θ/π for a constant angle (π/6 → 6), or null.
function piDen(arg) {
  const k = evalFloat(arg, {}) / Math.PI;
  for (let d = 1; d <= 24; d++) if (Math.abs(Math.round(k * d) - k * d) < 1e-9) return d;
  return null;
}

// The disjuncts of a line (A ∨ B ∨ C).
function disjuncts(n, out = []) {
  n = stripParen(n);
  if (n.t === 'logic' && n.op === 'or') { disjuncts(n.l, out); disjuncts(n.r, out); } else out.push(n);
  return out;
}
const orOf = (xs) => xs.reduce((a, b) => (a ? { t: 'logic', op: 'or', l: a, r: b } : b), null);
const andNot0 = (prev, f) => ({ t: 'logic', op: 'and', l: prev, r: { t: 'rel', op: '≠', l: f, r: num(0) } });
const at = (n, env) => evalFloat(n, env);

// A base equation f(U) = a: {f, U, a}.
function baseEq(prev) {
  const n = stripParen(prev);
  if (n.t !== 'rel' || n.op !== '=') return null;
  const l = stripParen(n.l);
  if (l.t !== 'fn' || !TRIG.has(l.name) || !constant(n.r)) return null;
  return { f: l.name, U: l.args[0], a: evalFloat(n.r, {}) };
}
const fam = (U, alpha, period) => ({ t: 'rel', op: '=', l: U, r: { t: 'bin', op: '+', l: F(alpha), r: { t: 'bin', op: '×', l: F(period), r: sym('k') } } });

const LINE_RULES = [
  {
    id: 'g3_deg_rad', family: 'notation', tag: 'E', skill: 'g3-radians', repair: 'g3-radians', judges: ['value', 'solset'],
    name: 'Degrés et radians mélangés',
    example: ['L = 12·30 = 360 cm', 'L = 12·π/6 = 2π cm'],
    check: { judge: { kind: 'value', form: 'exact' }, prev: '12×30°', line: '360' },
    transform: (prev, ctx = {}) => {
      const out = [];
      // 30° read as 30 (no conversion).
      if (contains(prev, (n) => n.t === 'bin' && n.deg)) out.push({ node: mapNode(prev, (n) => (n.t === 'bin' && n.deg ? n.l : n)), ctx: {} });
      // A family with 360 for 2π: π replaced by 180 next to k.
      if (hasSym(prev, 'k') && (!ctx.cfg?.domain || ctx.cfg.domain === 'R')) {
        const swapped = mapNode(prev, (n) => (n.t === 'bin' && n.op === '×' && hasSym(n, 'k') ? mapNode(n, (y) => (y.t === 'const' && y.name === 'pi' ? num(180) : y)) : n));
        out.push({ node: swapped, ctx: {} });
      }
      return out;
    },
    explain: () => 'L = rθ demande θ en radians : 30° = π/6. Et une famille ne mélange pas degrés et radians : 2kπ, pas 360k.',
  },
  {
    id: 'g3_reduce_sign', family: 'sign', tag: 'E', skill: 'g3-reduce', repair: 'g3-reduce', judges: ['equiv', 'value'],
    name: 'Signe oublié en réduisant l\'angle',
    example: ['cos(5π/6) = cos(π/6)', 'cos(5π/6) = −cos(π/6)'],
    check: { judge: { kind: 'equiv', vars: [], target: 'exact' }, prev: 'cos((5π)/6)', line: 'cos(π/6)' },
    transform: (prev) => each(prev, (n) => n.t === 'fn' && TRIG.has(n.name) && constant(n.args[0]) && (piDen(n.args[0]) ?? 99) <= 6, (n) => {
      const v = evalFloat(n, {});
      return Number.isFinite(v) && v < -1e-12 ? { node: F(-v), ctx: { f: n } } : null;
    }),
    explain: (ctx = {}) => (ctx.f ? `${M(ctx.f)} est négatif : regarde dans quel quadrant tombe l'angle. Dans le 2e quadrant, le cosinus est négatif.` : '5π/6 est dans le 2e quadrant, où le cosinus est négatif : cos(5π/6) = −cos(π/6).'),
  },
  {
    id: 'g3_reduce_swap', family: 'rule', tag: 'E', skill: 'g3-reduce', repair: 'g3-reduce', judges: ['equiv'],
    name: 'sin et cos pas échangés autour de π/2',
    example: ['cos(π/2 + x) = cos x', 'cos(π/2 + x) = −sin x'],
    check: { judge: { kind: 'equiv', vars: ['x'], target: 'one-trig' }, prev: 'cos(π/2+x)', line: 'cos(x)' },
    transform: (prev) => paths(prev, (n) => n.t === 'fn' && (n.name === 'sin' || n.name === 'cos') && hasSym(n.args[0], 'x')).flatMap((path) => {
      const n = getAt(prev, path);
      const c = at(n.args[0], { x: 0 }) / (Math.PI / 2);
      if (Math.abs(c - Math.round(c)) > 1e-9 || Math.round(c) % 2 === 0) return [];
      return [`${n.name}(x)`, `-${n.name}(x)`].map((t) => ({ node: replaceAt(prev, path, parse(t)), ctx: { f: n.name } }));
    }),
    explain: (ctx = {}) => `Avec x = 0 : cos(π/2) = 0, mais cos 0 = 1. Autour de π/2, sin et cos s'échangent${ctx.f ? ` : ${ctx.f} devient ${ctx.f === 'sin' ? 'cos' : 'sin'}` : ''}.`,
  },
  {
    id: 'g3_linear', family: 'distribute', tag: 'E', skill: 'g3-identities', repair: 'g3-identities', judges: ['equiv'],
    name: 'sin et cos traités comme linéaires',
    example: ['cos 2x = 2cos x', 'cos 2x = 2cos²x − 1'],
    check: { judge: { kind: 'equiv', vars: ['x'], target: 'any' }, prev: 'cos(2x)', line: '2cos(x)' },
    transform: (prev) => each(prev, (n) => n.t === 'fn' && TRIG.has(n.name), (n) => {
      const a = stripParen(n.args[0]);
      if (a.t === 'bin' && (a.op === '+' || a.op === '-')) return { node: { t: 'bin', op: a.op, l: { t: 'fn', name: n.name, args: [a.l] }, r: { t: 'fn', name: n.name, args: [a.r] } }, ctx: { f: n } };
      if (a.t === 'bin' && a.op === '×' && stripParen(a.l).t === 'num' && hasSym(a.r, 'x')) return { node: { t: 'bin', op: '×', l: a.l, r: { t: 'fn', name: n.name, args: [a.r] } }, ctx: { f: n } };
      return null;
    }),
    explain: (ctx = {}) => `${ctx.f ? `${M(ctx.f)} ne se découpe pas ainsi. ` : ''}Avec a = b = π/2 : sin π = 0, mais sin(π/2) + sin(π/2) = 2. sin et cos ne sont pas linéaires : il faut les formules d'addition et d'angle double.`,
  },
  {
    id: 'g3_add_sign', family: 'sign', tag: 'E', skill: 'g3-identities', repair: 'g3-identities', judges: ['equiv'],
    name: 'Signe de la formule d\'addition',
    example: ['cos(a + b) = cos a cos b + sin a sin b', 'cos(a + b) = cos a cos b − sin a sin b'],
    check: { judge: { kind: 'equiv', vars: ['x'], target: 'any' }, prev: 'cos(x+π/3)', line: 'cos(x)cos(π/3)+sin(x)sin(π/3)' },
    transform: (prev) => each(prev, (n) => n.t === 'fn' && (n.name === 'cos' || n.name === 'sin'), (n) => {
      const a = stripParen(n.args[0]);
      if (!(a.t === 'bin' && (a.op === '+' || a.op === '-'))) return null;
      const f = (name, e) => ({ t: 'fn', name, args: [e] });
      const prod = (x, y) => ({ t: 'bin', op: '×', l: x, r: y });
      // The other sign between the two products.
      const plus = a.op === '+';
      const node = n.name === 'cos'
        ? { t: 'bin', op: plus ? '+' : '-', l: prod(f('cos', a.l), f('cos', a.r)), r: prod(f('sin', a.l), f('sin', a.r)) }
        : { t: 'bin', op: plus ? '-' : '+', l: prod(f('sin', a.l), f('cos', a.r)), r: prod(f('cos', a.l), f('sin', a.r)) };
      return { node, ctx: { f: n.name, op: a.op } };
    }),
    explain: (ctx = {}) => (ctx.f === 'sin'
      ? 'sin(a + b) = sin a cos b + cos a sin b, et sin(a − b) = sin a cos b − cos a sin b : le signe suit celui de l\'angle.'
      : 'Avec a = b = π/4 : cos(π/2) = 0, mais cos a cos b + sin a sin b = 1/2 + 1/2 = 1. Pour cos(a + b), c\'est un moins.'),
  },
  {
    id: 'g3_half_sign', family: 'sign', tag: 'E', skill: 'g3-exact', repair: 'g3-exact', judges: ['equiv'],
    name: 'Signe de la racine de bissection',
    example: ['cos(7π/8) = +√((1 + cos(7π/4))/2)', 'cos(7π/8) = −√((1 + cos(7π/4))/2)'],
    check: { judge: { kind: 'equiv', vars: [], target: 'exact' }, prev: 'cos((7π)/8)', line: '√((1+cos((7π)/4))/2)' },
    transform: (prev) => each(prev, (n) => n.t === 'fn' && TRIG.has(n.name) && constant(n.args[0]) && [8, 12, 24].includes(piDen(n.args[0])), (n) => {
      const v = evalFloat(n, {});
      return Number.isFinite(v) && v < -1e-12 ? { node: F(-v), ctx: { f: n } } : null;
    }),
    explain: (ctx = {}) => `${ctx.f ? `${M(ctx.f)} : ` : ''}regarde le quadrant de l'angle. 7π/8 est dans le 2e quadrant : son cosinus est négatif, la racine prend le signe −.`,
  },
  {
    id: 'g3_family_missing', family: 'method', tag: 'E', skill: 'g3-basic-eq', repair: 'g3-basic-eq', judges: ['solset'],
    name: 'Une famille de solutions oubliée',
    example: ['cos x = 1/2 : x = π/3 + 2kπ', 'x = ±π/3 + 2kπ'],
    check: { judge: { kind: 'solset', v: 'x', periodic: true }, prev: 'cos(x)=1/2', line: 'x=π/3+2kπ' },
    transform: (prev) => {
      const ds = disjuncts(prev);
      if (ds.length > 1) return ds.map((_, i) => ({ node: orOf(ds.filter((__, j) => j !== i)), ctx: {} }));
      const b = baseEq(prev);
      if (!b || b.f === 'tan' || b.f === 'cot' || Math.abs(b.a) > 1) return [];
      const alpha = b.f === 'cos' ? Math.acos(b.a) : Math.asin(b.a);
      return [{ node: fam(b.U, alpha, 2 * Math.PI), ctx: { f: b.f } }];
    },
    explain: () => 'Sur le cercle, il y a deux points : −π/3 a le même cosinus que π/3, et π − π/6 le même sinus que π/6. Il faut les deux familles.',
  },
  {
    id: 'g3_sin_family', family: 'rule', tag: 'E', skill: 'g3-basic-eq', repair: 'g3-basic-eq', judges: ['solset'],
    name: 'Seconde famille de sin écrite −α',
    example: ['sin x = 1/2 : x = π/6 + 2kπ ou x = −π/6 + 2kπ', 'x = π/6 + 2kπ ou x = 5π/6 + 2kπ'],
    check: { judge: { kind: 'solset', v: 'x', periodic: true }, prev: 'sin(x)=1/2', line: 'x=π/6+2kπ ∨ x=-π/6+2kπ' },
    transform: (prev) => {
      const b = baseEq(prev);
      if (!b || b.f !== 'sin' || Math.abs(b.a) >= 1 || Math.abs(b.a) < 1e-12) return [];
      const alpha = Math.asin(b.a);
      return [{ node: orOf([fam(b.U, alpha, 2 * Math.PI), fam(b.U, -alpha, 2 * Math.PI)]), ctx: {} }];
    },
    explain: () => 'sin(−π/6) = −1/2, pas 1/2. Pour sin, le second point est π − α : x = 5π/6 + 2kπ.',
  },
  {
    id: 'g3_period_divide', family: 'rule', tag: 'E', skill: 'g3-basic-eq', repair: 'g3-basic-eq', judges: ['solset'],
    name: 'Période pas divisée',
    example: ['2x = α + 2kπ : x = α/2 + 2kπ', 'x = α/2 + kπ'],
    check: { judge: { kind: 'solset', v: 'x', periodic: true }, prev: '2x=(2π)/3+2kπ ∨ 2x=2kπ', line: 'x=π/3+2kπ ∨ x=2kπ' },
    transform: (prev) => {
      const out = [];
      const ds = disjuncts(prev);
      const wrong = ds.map((d) => {
        if (d.t !== 'rel' || d.op !== '=' || !hasSym(d.l, 'x') || hasSym(d.r, 'x') || !hasSym(d.r, 'k')) return null;
        const b = at(d.l, { x: 0, k: 0 });
        const m = at(d.l, { x: 1, k: 0 }) - b;
        const c = at(d.r, { k: 0, x: 0 });
        const P = at(d.r, { k: 1, x: 0 }) - c;
        if (![b, m, c, P].every(Number.isFinite) || Math.abs(Math.abs(m) - 1) < 1e-9 || Math.abs(m) < 1e-9) return null;
        return { t: 'rel', op: '=', l: sym('x'), r: { t: 'bin', op: '+', l: F((c - b) / m), r: { t: 'bin', op: '×', l: F(P), r: sym('k') } } };
      });
      if (wrong.some(Boolean)) out.push({ node: orOf(wrong.map((w, i) => w ?? ds[i])), ctx: {} });
      // tan u = a with 2kπ.
      const b = baseEq(prev);
      if (b && b.f === 'tan') out.push({ node: fam(b.U, Math.atan(b.a), 2 * Math.PI), ctx: {} });
      return out;
    },
    explain: () => 'Si 2x = α + 2kπ, alors x = α/2 + kπ : x = α/2 + π est aussi solution, car 2x = α + 2π. Divise aussi 2kπ par 2. Et tan a pour période π : u = α + kπ.',
  },
  {
    id: 'g3_bioche_pi', family: 'method', tag: 'E', skill: 'g3-bioche', repair: 'g3-bioche', judges: ['solset'],
    name: 'x = π + 2kπ oublié avec t = tan(x/2)',
    example: ['2 sin x − cos x = 1 : S = {2 arctan(1/2) + 2kπ}', 'S = {2 arctan(1/2) + 2kπ} ∪ {π + 2kπ}'],
    check: { judge: { kind: 'solset', v: 'x', periodic: true, subst: { t: 'tan(x/2)' } }, prev: '2sin(x)-cos(x)=1', line: 'x=2arctan(1/2)+2kπ' },
    transform: (prev, ctx = {}) => (ctx.cfg?.subst?.t && (hasSym(prev, 'x') || hasSym(prev, 't')) ? [{ node: andNot0(prev, parse('cos(x/2)')), ctx: {} }] : []),
    explain: () => 'tan(x/2) n\'existe pas pour x = π : la substitution oublie ces valeurs. Or 2 sin π − cos π = 1 : x = π + 2kπ est solution. Teste toujours x = π + 2kπ à part.',
  },
  {
    id: 'g3_divide_zero', family: 'method', tag: 'E', skill: 'g3-eq', repair: 'eq-product', judges: ['solset'],
    name: 'Division par cos x sans vérifier cos x = 0',
    example: ['2 sin x cos x = cos x → 2 sin x = 1', 'cos x (2 sin x − 1) = 0'],
    check: { judge: { kind: 'solset', v: 'x', periodic: true }, prev: '2sin(x)cos(x)=cos(x)', line: 'x=π/6+2kπ ∨ x=(5π)/6+2kπ' },
    transform: (prev) => {
      const seen = new Set();
      const out = [];
      // A trig function that is a factor of a product: what one would divide by.
      walk(prev, (n) => {
        if (n.t !== 'bin' || n.op !== '×') return true;
        for (const f of [stripParen(n.l), stripParen(n.r)]) {
          if (f.t === 'fn' && TRIG.has(f.name) && hasSym(f.args[0], 'x')) {
            const key = toReadable(f);
            if (!seen.has(key)) { seen.add(key); out.push({ node: andNot0(prev, f), ctx: { f } }); }
          }
        }
        return true;
      });
      return out;
    },
    explain: (ctx = {}) => `Tu as divisé par ${ctx.f ? M(ctx.f) : 'cos x'}. Là où il vaut 0 (par exemple cos x = 0 pour x = π/2), vérifie à part si ces x sont solutions : on ne peut pas diviser par 0.`,
  },
  {
    id: 'g3_rphi', family: 'rule', tag: 'E', skill: 'g3-asinbcos', repair: 'g3-asinbcos', judges: ['solset'],
    name: 'R ou φ faux dans a sin x + b cos x',
    example: ['√3 sin x + cos x = (√3 + 1) sin(x + π/6)', '√3 sin x + cos x = 2 sin(x + π/6)'],
    check: { judge: { kind: 'solset', v: 'x', periodic: true }, prev: '√3sin(x)+cos(x)=√2', line: '(√3+1)sin(x+π/6)=√2' },
    transform: (prev) => {
      const n = stripParen(prev);
      if (n.t !== 'rel') return [];
      let U = null;
      walk(n.l, (y) => { if (!U && y.t === 'fn' && y.name === 'sin') U = y.args[0]; return !U; });
      if (!U) return [];
      const swap = (sv, cv) => mapNode(n.l, (y) => (y.t === 'fn' && (y.name === 'sin' || y.name === 'cos') ? num(y.name === 'sin' ? sv : cv) : y));
      const a = evalFloat(swap(1, 0), {});
      const b = evalFloat(swap(0, 1), {});
      if (!Number.isFinite(a) || !Number.isFinite(b) || !a || !b) return [];
      const R = Math.hypot(a, b);
      const phi = Math.atan2(b, a);
      const s = (r, p) => ({ t: 'rel', op: n.op, l: { t: 'bin', op: '×', l: F(r), r: { t: 'fn', name: 'sin', args: [{ t: 'bin', op: '+', l: U, r: F(p) }] } }, r: n.r });
      return [
        { node: s(Math.abs(a) + Math.abs(b), phi), ctx: { R } },
        { node: s(R, phi + Math.PI), ctx: { R } },
        { node: s(R, Math.atan(b / a)), ctx: { R } },
      ];
    },
    explain: (ctx = {}) => `R = √(a² + b²)${ctx.R ? ` = ${String(Math.round(ctx.R * 1000) / 1000).replace('.', ',')}` : ''}, pas |a| + |b|. Et φ se lit avec cos φ = a/R et sin φ = b/R, dans le bon quadrant. Vérifie avec x = 0 : R sin φ doit valoir b.`,
  },
  {
    id: 'g3_ineq_arc', family: 'sign', tag: 'E', skill: 'g3-ineq', repair: 'g3-basic-eq', judges: ['solset'],
    name: 'Arc complémentaire',
    example: ['cos u ≥ 1/2 : [π/3 ; 5π/3]', '[−π/3 ; π/3] + 2kπ'],
    check: { judge: { kind: 'solset', v: 'x', periodic: true, domain: '[0;2π]' }, prev: 'cos(x)≥1/2', line: '[π/3;(5π)/3]' },
    transform: (prev) => {
      const n = stripParen(prev);
      const KEEP = { '<': '>', '≤': '≥', '>': '<', '≥': '≤' };
      const NEG = { '<': '≥', '≤': '>', '>': '≤', '≥': '<' };
      if (n.t !== 'rel' || !KEEP[n.op] || !contains(n, (y) => y.t === 'fn' && TRIG.has(y.name)) || hasSym(n, 'k')) return [];
      // The other arc: the relation turned, with or without its bounds.
      return [{ node: { ...n, op: KEEP[n.op] }, ctx: {} }, { node: { ...n, op: NEG[n.op] }, ctx: {} }];
    },
    explain: () => 'Teste un point : pour u = π, cos π = −1, qui n\'est pas ≥ 1/2. L\'arc solution de cos u ≥ 1/2 entoure 0 : [−π/3 ; π/3] + 2kπ.',
  },
  {
    id: 'g3_ineq_window', family: 'method', tag: 'E', skill: 'g3-ineq', repair: 'g9-intervals', judges: ['solset'],
    name: 'Un seul k, pas coupé à l\'intervalle',
    example: ['S = [−2π/3 ; 0]', 'S = {0} ∪ [4π/3 ; 2π]'],
    check: { judge: { kind: 'solset', v: 'x', periodic: true, domain: '[0;2π]' }, prev: '-(2π)/3+2kπ≤x≤2kπ', line: '[-(2π)/3;0]' },
    transform: (prev) => (hasSym(prev, 'k') ? [0, 1, -1, 2].map((k) => ({ node: mapNode(prev, (y) => (y.t === 'sym' && y.name === 'k' && !y.sub ? { t: 'paren', e: k < 0 ? { t: 'neg', e: num(-k) } : num(k) } : y)), ctx: { k } })) : []),
    explain: (ctx = {}) => `Ta solution${ctx.k !== undefined ? ` ne garde que k = ${ctx.k} et` : ''} sort de l'intervalle ou oublie un k. Teste chaque k (… −1, 0, 1, 2 …) et coupe chaque morceau à l'intervalle.`,
  },
  {
    id: 'g3_cos_law_sign', family: 'sign', tag: 'E', skill: 'g3-triangle', repair: 'g3-triangle', judges: ['value'],
    name: 'Signe du théorème du cosinus',
    example: ['c² = a² + b² + 2ab cos γ', 'c² = a² + b² − 2ab cos γ'],
    check: { judge: { kind: 'value' }, prev: '5^2+8^2-2×5×8×cos(60°)', line: '129' },
    transform: (prev) => each(prev, (n) => n.t === 'bin' && n.op === '-' && contains(n.r, (y) => y.t === 'fn' && y.name === 'cos'), (n) => ({ node: { ...n, op: '+' }, ctx: {} })),
    explain: () => 'Avec γ = 90°, on doit retrouver Pythagore, et avec γ = 60°, c doit être plus petit que pour 90° : c² = a² + b² − 2ab cos γ.',
  },
  {
    id: 'g3_ssa_lost', family: 'method', tag: 'E', skill: 'g3-triangle', repair: 'g3-triangle', judges: [],
    name: 'Deuxième angle du cas ambigu oublié',
    example: ['sin β = s : β seul', 'β ou 180° − β'],
    check: { bait: { skill: 'g3-triangle', level: 4 } },
    explain: () => '180° − β a le même sinus que β. Vérifie si la somme des angles permet aussi cet angle-là : il peut y avoir deux triangles.',
  },
  {
    id: 'g3_arc_cancel', family: 'rule', tag: 'E', skill: 'g3-arc-def', repair: 'g3-arc-def', judges: ['value'],
    name: 'arccos(cos θ) = θ sans regarder l\'image',
    example: ['arccos(cos(13π/4)) = 13π/4', 'arccos(cos(13π/4)) = 3π/4'],
    check: { judge: { kind: 'value', form: 'exact' }, prev: 'arccos(cos((13π)/4))', line: '(13π)/4' },
    transform: (prev) => {
      const PAIR = { arcsin: 'sin', arccos: 'cos', arctan: 'tan', Arctg: 'tan', arctg: 'tan' };
      return each(prev, (n) => n.t === 'fn' && PAIR[n.name] && stripParen(n.args[0]).t === 'fn' && stripParen(n.args[0]).name === PAIR[n.name], (n) => ({ node: stripParen(n.args[0]).args[0], ctx: { f: n.name } }));
    },
    explain: (ctx = {}) => `${ctx.f ?? 'arccos'} donne un angle de ${ctx.f === 'arccos' || !ctx.f ? '[0 ; π]' : ctx.f === 'arcsin' ? '[−π/2 ; π/2]' : ']−π/2 ; π/2['}. Si θ n'y est pas, cherche l'angle de cet intervalle qui a la même valeur.`,
  },
  {
    id: 'g3_arc_root_sign', family: 'sign', tag: 'E', skill: 'g3-arc-comp', repair: 'g3-arc-def', judges: ['value'],
    name: 'Signe de la racine pris sur l\'argument',
    example: ['cos(arcsin(−3/5)) = −4/5', 'cos(arcsin(−3/5)) = 4/5'],
    check: { judge: { kind: 'value', form: 'exact' }, prev: 'cos(arcsin(-3/5))', line: '-4/5' },
    transform: (prev) => (contains(prev, (n) => n.t === 'fn' && ['arcsin', 'arccos', 'arctan'].includes(n.name) && evalFloat(n.args[0], {}) < 0) ? [{ node: { t: 'neg', e: { t: 'paren', e: prev } }, ctx: {} }] : []),
    explain: () => 'θ = arcsin(−3/5) est dans [−π/2 ; 0] : son cosinus est positif. Le signe de la racine vient de l\'intervalle de θ, pas du signe de a.',
  },
];

// The solution-set traps of this module only replay on periodic lines
// (trigonometry): elsewhere, « a family dropped » would name any lost root.
// Trig formulas are not tried on lines that still hold derivatives (G6).
const NO_DERIV = new Set(['g3_linear', 'g3_add_sign', 'g3_reduce_swap']);
const PERIODIC_ONLY = new Set(['g3_family_missing', 'g3_sin_family', 'g3_period_divide', 'g3_bioche_pi', 'g3_divide_zero', 'g3_rphi', 'g3_ineq_arc', 'g3_ineq_window']);
export const RULES = LINE_RULES.map((r) => {
  if (PERIODIC_ONLY.has(r.id)) return { ...r, transform: (prev, ctx = {}) => (ctx.cfg?.periodic ? r.transform(prev, ctx) : []) };
  if (NO_DERIV.has(r.id)) return { ...r, transform: (prev, ctx = {}) => (contains(prev, (n) => n.t === 'deriv') ? [] : r.transform(prev, ctx)) };
  return r;
});
