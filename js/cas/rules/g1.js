// Traps of module G1 (fonctions et inéquations), spec §7. Catalogue:
// docs/universite/G-gymnase-1.md, G1, « Pièges du module ». This file holds
// the traps of the first half of the module (domain to sign table).
//
// Equation, inequation and domain traps replay the mistake on a line
// (judge `solset`: same solution set, or the same domain for an expression
// with cfg.exprDomain). Composition and inverse traps replay it with the
// item's functions (judge `equiv`, cfg.defs). Proof, parity and period
// traps are named by a decoy block, a true/false choice or a multiple
// choice option. `check`: see js/cas/rules/g9.js.

import { parse } from '../parse.js';
import { stripParen, walk, replaceAt } from '../ast.js';
import { toMathML } from '../mathml.js';
import { domainConds } from '../sets.js';

const M = (n) => toMathML(stripParen(n));
const and = (xs) => xs.reduce((acc, c) => (acc ? { t: 'logic', op: 'and', l: acc, r: c } : c), null);

// The conjuncts of a condition (x ≥ −3 ∧ x ≠ 2 …).
function conjuncts(n) {
  n = stripParen(n);
  if (n.t === 'logic' && n.op === 'and') return [...conjuncts(n.l), ...conjuncts(n.r)];
  return [n];
}
const isCondition = (n) => ['rel', 'chain', 'in', 'not', 'logic'].includes(stripParen(n).t);

export const RULES = [
  {
    id: 'g1_domain_partial', family: 'method', tag: 'E', skill: 'g1-domain', repair: 'g1-domain', judges: ['solset'],
    name: 'Une condition du domaine oubliée',
    example: ['√(x + 3)/(x² − 4) : x ≠ ±2', 'x ≥ −3 et x ≠ ±2'],
    check: { judge: { kind: 'solset', v: 'x', exprDomain: true }, prev: 'sqrt(x+3)/(x^2-4)', line: ']-∞;-2[∪]-2;2[∪]2;+∞[' },
    // One candidate per condition left out: of the expression (its
    // conditions), or of a conjunction of conditions.
    transform: (prev, ctx = {}) => {
      if (!ctx.cfg?.exprDomain) return [];
      const v = ctx.cfg.v || 'x';
      const conds = isCondition(prev) ? conjuncts(prev) : domainConds(prev, v);
      if (conds.length < 2) return [];
      return conds.map((c, i) => ({ node: and(conds.filter((_, j) => j !== i)), ctx: { lost: c } }));
    },
    explain: (ctx = {}) => (ctx.lost
      ? `Il manque la condition ${M(ctx.lost)} : chaque racine et chaque dénominateur donne sa propre condition.`
      : 'Il manque une condition : chaque racine carrée (≥ 0) et chaque dénominateur (≠ 0) donne la sienne.'),
  },
  {
    id: 'g1_compose_order', family: 'rule', tag: 'E', skill: 'g1-compose', repair: 'g1-compose', judges: ['equiv'],
    name: 'f ∘ g calculée dans le mauvais ordre',
    example: ['g ∘ f = √(1 − x²)', 'g ∘ f = 1 − x'],
    check: {
      judge: { kind: 'equiv', vars: ['x'], funcs: ['f', 'g'], defs: { f: 'sqrt(x)', g: '1-x^2' }, domain: { x: [0.1, 0.9] }, target: 'short', goal: '1-x' },
      prev: 'g(f(x))', line: 'sqrt(1-x^2)',
    },
    // g(f(…)) read as f(g(…)): the two function names swapped.
    transform: (prev, ctx = {}) => {
      const defs = ctx.cfg?.defs;
      if (!defs) return [];
      const out = [];
      walk(prev, (n, path) => {
        if (n.t === 'fn' && defs[n.name] && n.args.length === 1) {
          const a = stripParen(n.args[0]);
          if (a.t === 'fn' && defs[a.name] && a.name !== n.name) {
            out.push({ node: replaceAt(prev, path, { t: 'fn', name: a.name, args: [{ t: 'fn', name: n.name, args: a.args }] }), ctx: { outer: n.name, inner: a.name } });
          }
        }
        return true;
      });
      return out;
    },
    explain: (ctx = {}) => (ctx.outer
      ? `${ctx.outer} ∘ ${ctx.inner} veut dire : ${ctx.inner} d'abord. On calcule ${ctx.inner}(x), puis on l'envoie dans ${ctx.outer}.`
      : 'g ∘ f veut dire : f d\'abord. On calcule f(x), puis on l\'envoie dans g.'),
  },
  {
    id: 'g1_compose_domain', family: 'method', tag: 'E', skill: 'g1-compose', repair: 'g1-domain', judges: ['solset'],
    name: 'Domaine de l\'expression simplifiée',
    example: ['D_{g∘f} = ℝ', 'D_{g∘f} = [0 ; +∞['],
    check: { judge: { kind: 'solset', v: 'x', funcs: ['f', 'g'], defs: { f: 'sqrt(x)', g: '1-x^2' }, exprDomain: true, simplified: '1-x' }, prev: 'g(f(x))', line: 'ℝ' },
    transform: (prev, ctx = {}) => (ctx.cfg?.simplified ? [{ node: parse(ctx.cfg.simplified), ctx: { simplified: ctx.cfg.simplified } }] : []),
    explain: (ctx = {}) => `On regarde le domaine avant de simplifier : x doit être dans le domaine de la fonction appliquée d'abord.${ctx.simplified ? ` ${M(parse(ctx.simplified))} est défini partout, mais pas l'expression de départ.` : ''}`,
  },
  {
    id: 'g1_inverse_reciprocal', family: 'notation', tag: 'E', skill: 'g1-inverse', repair: 'g1-inverse', judges: ['equiv'],
    name: 'f⁻¹ lu comme 1/f',
    example: ['f⁻¹(x) = 1/(x² − 2x)', 'f⁻¹(x) = 1 + √(1 + x)'],
    check: { judge: { kind: 'equiv', vars: ['x'], subst: { y: 'x' }, fx: 'x^2-2x', domain: { x: [3, 6] }, target: 'only', finalVars: ['x'] }, prev: '1+sqrt(1+y)', line: '1/(x^2-2x)' },
    transform: (prev, ctx = {}) => (ctx.cfg?.fx ? [{ node: parse(`1/(${ctx.cfg.fx})`), ctx: { fx: ctx.cfg.fx } }] : []),
    explain: () => 'f⁻¹ défait f : f⁻¹(f(x)) = x. Ce n\'est pas l\'inverse 1/f(x) : on résout y = f(x) en x.',
  },
  {
    id: 'g1_inverse_branch', family: 'method', tag: 'C', skill: 'g1-inverse', repair: 'g1-inverse', judges: ['solset'],
    name: 'Mauvaise racine gardée pour f⁻¹ (corrigé MAN 2018, Math 1B, Q2)',
    example: ['x = 1 − √(1 + y)', 'x = 1 + √(1 + y)'],
    check: { judge: { kind: 'solset', v: 'x', domain: '[1;+∞[', params: { y: '[-1;+∞[' } }, prev: 'x=1+sqrt(1+y)∨x=1-sqrt(1+y)', line: 'x=1-sqrt(1+y)' },
    // One branch of « x = … ou x = … » kept, when y = f(x) is solved for x
    // (a parameter y).
    transform: (prev, ctx = {}) => {
      const n = stripParen(prev);
      if (!ctx.cfg?.params || n.t !== 'logic' || n.op !== 'or') return [];
      if (![n.l, n.r].every((s) => stripParen(s).t === 'rel' && stripParen(s).op === '=')) return [];
      return [{ node: n.l, ctx: {} }, { node: n.r, ctx: {} }];
    },
    explain: () => 'Les deux racines ne sont pas dans l\'ensemble de départ : teste une valeur de y. Garde la racine qui est dans l\'ensemble de départ.',
  },
  {
    id: 'g1_inj_square', family: 'logic', tag: 'E', skill: 'g1-injective', repair: 'g9-implication', judges: [],
    name: 'a² = b² donne a = b sans condition',
    example: ['a² = b² ⇒ a = b sur [−1 ; 2]', 'a = −1, b = 1 : a² = b², a ≠ b'],
    check: { bait: { skill: 'g1-injective', level: 2 } },
    explain: () => 'a² = b² donne (a − b)(a + b) = 0 : a = b ou a = −b. Sur [−1 ; 2], a = −1 et b = 1 donnent a² = b² avec a ≠ b.',
  },
  {
    id: 'g1_surj_domain', family: 'method', tag: 'C', skill: 'g1-surjective', repair: 'g1-surjective', judges: [],
    name: 'Une solution existe, mais pas dans l\'ensemble de départ (corrigé MAN 2018, Math 1B, Q2)',
    example: ['« Δ ≥ 0, donc f est surjective »', 'Δ ≥ 0, et la solution est dans A'],
    check: { bait: { skill: 'g1-surjective', level: 2 } },
    explain: () => 'Une solution existe, mais est-elle dans l\'ensemble de départ ? Il faut un antécédent dans A.',
  },
  {
    id: 'g1_parity_point', family: 'logic', tag: 'E', skill: 'g1-parity-period', repair: 'g9-counterexample', judges: [],
    name: 'Parité conclue sur une seule valeur',
    example: ['f(−1) = f(1), donc f paire', 'f(−x) = f(x) pour tout x'],
    check: { bait: { skill: 'g1-parity-period', exam: 'tf' } },
    explain: () => 'Une valeur ne suffit pas. Pour x³ − x : f(−1) = f(1) = 0, mais f(−2) = −6 et f(2) = 6.',
  },
  {
    id: 'g1_period_sum', family: 'rule', tag: 'E', skill: 'g1-parity-period', repair: 'g1-parity-period', judges: [],
    name: 'Période d\'une somme : max, min ou produit',
    example: ['période de sin 2x + cos 3x : π ou 2π/3', '2π'],
    check: { bait: { skill: 'g1-parity-period', exam: 'mcq' } },
    explain: () => 'Après π, sin 2x recommence, mais cos 3x non : cos 3(x + π) = −cos 3x. Il faut le plus petit multiple commun des deux périodes.',
  },
  {
    id: 'g1_sign_even_root', family: 'sign', tag: 'E', skill: 'g1-sign-table', repair: 'g1-sign-table', judges: [],
    name: 'Un carré change de signe en sa racine',
    example: ['(x + 2)² : − 0 +', '(x + 2)² : + 0 +'],
    check: { bait: { skill: 'g1-sign-table', level: 2 } },
    explain: () => '(x + 2)² est un carré : il est ≥ 0 des deux côtés de −2.',
  },
  {
    id: 'g1_trinome_sign_swap', family: 'sign', tag: 'E', skill: 'g1-trinome-sign', repair: 'g1-trinome-sign', judges: ['solset'],
    name: 'Signe du trinôme inversé',
    example: ['−2x² + x + 3 ≥ 0 : ]−∞ ; −1] ∪ [3/2 ; +∞[', '[−1 ; 3/2]'],
    check: { judge: { kind: 'solset', v: 'x' }, prev: '-2x^2+x+3≥0', line: ']-∞;-1]∪[3/2;+∞[' },
    // The relation reversed, bounds kept: the other side of the roots.
    transform: (prev) => {
      const n = stripParen(prev);
      if (n.t !== 'rel' || !['≥', '>', '≤', '<'].includes(n.op)) return [];
      let deg2 = false;
      walk(n, (y) => { if (y.t === 'pow' && stripParen(y.e).t === 'num' && stripParen(y.e).v.n === 2) deg2 = true; return true; });
      if (!deg2) return [];
      const swap = { '≥': '≤', '>': '≤', '≤': '≥', '<': '≥' };
      return [{ node: { ...n, op: swap[n.op] }, ctx: {} }];
    },
    explain: () => 'Teste une valeur entre les racines, par exemple le milieu : le trinôme y a le signe contraire de a. À l\'extérieur des racines, il a le signe de a.',
  },
];
