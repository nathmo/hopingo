// Traps of module N, part g (see js/cas/rules/n.js).
// DEFS: {id: {name, judges, transform?, wrongValues?, explain?, check}}.
// Traps of this part: n_implicit_as_explicit, n_euler_time_index, n_heun_k2, n_cn_explicit, n_stab_factor2, n_stab_order_confused, n_stab_lambda_sign, n_euler_ineq_bound, n_global_error_order, n_h_le_2_forgotten, n_stiff_accuracy.
//
// The value traps read fields the generators (js/content/uni/numerique-g-*.js)
// put in the configuration of a `value` line:
//   ode   {scheme: 'EP'|'ER'|'CN'|'Heun', f, t0, u0, h}  a line « u₁ = … »
//         (one step from (t0, u0)); the trap replays the wrong scheme
//   stab  {lambda}  a line « h_max = … » (stability of Euler progressif)
// The iteration tables (js/judges/iter-num.js, phi 'ode') name
// n_implicit_as_explicit, n_euler_time_index and n_heun_k2 themselves.
// The other traps are options of decisions, multiple choices, true/false
// and decoy blocks. The catalogue's table cut some of these rows at the
// « | » of |λ| (META in rules/n.js): their example and explanation are
// written again here.

import { lit } from '../ast.js';
import { evalAt, num } from '../../judges/iter-num.js';
import { Q } from '../../math/rational.js';

const node = (x) => (x instanceof Q ? lit(x) : { t: 'float', x });
const fAt = (o, t, u) => evalAt(o.f, { t, u }, ['t', 'u']);
const add = (a, b) => (a instanceof Q && b instanceof Q ? a.add(b) : Number(a) + Number(b));
const mul = (a, b) => (a instanceof Q && b instanceof Q ? a.mul(b) : Number(a) * Number(b));

function step(o) {
  const t0 = num(o.t0 ?? '0');
  const u0 = num(o.u0);
  const h = num(o.h);
  return { t0, u0, h, t1: add(t0, h), half: h instanceof Q ? h.div(2) : h / 2 };
}

export const DEFS = {
  n_implicit_as_explicit: {
    name: 'Schéma implicite calculé comme explicite',
    judges: ['value'],
    transform(prev, ctx) {
      const o = ctx?.cfg?.ode;
      if (!o || o.scheme !== 'ER') return [];
      const s = step(o);
      return [{ node: node(add(s.u0, mul(s.h, fAt(o, s.t0, s.u0)))), ctx: {} }];
    },
    check: { judge: { kind: 'value', expect: '5/6', form: 'irreducible', ode: { scheme: 'ER', f: '-2u', t0: '0', u0: '1', h: '1/10' } }, prev: 'u_1', line: '4/5' },
  },
  n_euler_time_index: {
    name: 'Euler progressif : f(tₙ₊₁, uₙ) au lieu de f(tₙ, uₙ)',
    judges: ['value'],
    transform(prev, ctx) {
      const o = ctx?.cfg?.ode;
      if (!o || o.scheme !== 'EP') return [];
      const s = step(o);
      return [{ node: node(add(s.u0, mul(s.h, fAt(o, s.t1, s.u0)))), ctx: {} }];
    },
    check: { judge: { kind: 'value', expect: '4/5', form: 'irreducible', ode: { scheme: 'EP', f: '-2u+t', t0: '0', u0: '1', h: '1/10' } }, prev: 'u_1', line: '81/100' },
  },
  n_heun_k2: {
    name: 'Heun : prédiction u + k₁ sans h',
    judges: ['value'],
    transform(prev, ctx) {
      const o = ctx?.cfg?.ode;
      if (!o || o.scheme !== 'Heun') return [];
      const s = step(o);
      const k1 = fAt(o, s.t0, s.u0);
      const k2 = fAt(o, s.t1, add(s.u0, k1));
      const v = add(s.u0, k1);
      return [{ node: node(add(s.u0, mul(s.half, add(k1, k2)))), ctx: { v: String(v) } }];
    },
    check: { judge: { kind: 'value', expect: '41/50', form: 'irreducible', ode: { scheme: 'Heun', f: '-2u', t0: '0', u0: '1', h: '1/10' } }, prev: 'u_1', line: '1' },
  },
  n_cn_explicit: {
    name: 'Crank-Nicolson calculé avec uₙ dans le second terme',
    judges: ['value'],
    transform(prev, ctx) {
      const o = ctx?.cfg?.ode;
      if (!o || o.scheme !== 'CN') return [];
      const s = step(o);
      return [{ node: node(add(s.u0, mul(s.half, add(fAt(o, s.t0, s.u0), fAt(o, s.t1, s.u0))))), ctx: {} }];
    },
    check: { judge: { kind: 'value', expect: '9/11', form: 'irreducible', ode: { scheme: 'CN', f: '-2u', t0: '0', u0: '1', h: '1/10' } }, prev: 'u_1', line: '4/5' },
  },
  n_stab_factor2: {
    name: 'Stabilité d\'Euler progressif : h < 1/|λ| au lieu de 2/|λ|',
    example: ['h < 1/|λ|', 'h < 2/|λ|'],
    judges: ['value'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.stab;
      if (!s) return [];
      const L = num(s.lambda);
      const a = L instanceof Q ? (L.n < 0 ? L.neg() : L) : Math.abs(L);
      const v = a instanceof Q ? new Q(2).div(a) : 2 / a;
      const c = { v: String(v).replace('-', '−') };
      return [{ node: node(a instanceof Q ? new Q(1).div(a) : 1 / a), ctx: c }, { node: node(a instanceof Q ? a.mul(2) : 2 * a), ctx: c }];
    },
    explain: (ctx = {}) => `|1 + hλ| < 1 ⇔ −2 < hλ < 0 ⇔ h < 2/|λ|${ctx.v ? ` = ${ctx.v}` : ''}.`,
    check: { judge: { kind: 'value', expect: '1/10', form: 'irreducible', stab: { lambda: '-20' } }, prev: 'h', line: '1/20' },
  },
  n_stab_order_confused: {
    name: 'Ordre et stabilité confondus',
    judges: [],
    check: { bait: { skill: 'n-ode-stability', level: 5 } },
  },
  n_stab_lambda_sign: {
    name: 'R(hλ) écrit 1 − hλ',
    example: ['|1 − hλ| < 1 avec λ = −20', '|1 + hλ| < 1'],
    judges: [],
    explain: (ctx = {}) => `uₙ₊₁ = uₙ + hλuₙ : R = 1 + hλ${ctx.lambda ? ` = 1 − ${String(-Number(ctx.lambda))}h` : ''}. Avec λ < 0, c'est 1 − h|λ|, pas 1 + h|λ|.`,
    check: { bait: { skill: 'n-ode-stability', level: 2 } },
  },
  n_euler_ineq_bound: {
    name: 'Facteur N oublié dans |aᴺ − bᴺ|',
    example: ['|aᴺ − bᴺ| ≤ |a − b|', '|aᴺ − bᴺ| ≤ N|a − b|'],
    judges: [],
    explain: () => 'aᴺ − bᴺ = (a − b)·(somme de N termes de module ≤ 1) : le facteur N reste. N·h²/2 = T·h/2.',
    check: { bait: { skill: 'n-ode-euler-global', level: 4 } },
  },
  n_global_error_order: {
    name: 'Erreur globale prise pour l\'erreur locale',
    judges: [],
    check: { bait: { skill: 'n-ode-euler-global', level: 3 } },
  },
  n_h_le_2_forgotten: {
    name: '|1 − h| ≤ 1 sans la condition h ≤ 2',
    example: ['|1 − h| ≤ 1 pour tout h > 0', '|1 − h| ≤ 1 si 0 < h ≤ 2'],
    judges: [],
    explain: () => 'Pour h = 3, |1 − h| = 2 > 1 : c\'est pourquoi l\'énoncé suppose 0 < h ≤ 2.',
    check: { bait: { skill: 'n-ode-euler-global', level: 4 } },
  },
  n_stiff_accuracy: {
    name: 'Instabilité prise pour un manque de précision',
    judges: [],
    check: { bait: { skill: 'n-ode-stiff', level: 3 } },
  },
};
