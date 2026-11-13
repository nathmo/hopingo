// Traps of step U2, part a1a (spec §7): derivatives by the definition, the
// BA1 rules, inverse functions, logarithmic derivatives, C¹. Catalogue:
// docs/universite/A1-analyse-1.md, « Pièges du module ».
// transform(prev, ctx) → [{node, ctx}], or a check {judge, prev, line} |
// {bait: {skill}} for the traps met as decoy blocks, options or decisions.

import { walk, getAt, replaceAt, mapNode, mul, div, num, fn, stripParen, dependsOn, canonFn } from '../ast.js';
import { diff, substVar } from '../diff.js';
import { parse } from '../parse.js';
import { toMathML } from '../mathml.js';
import { t } from '../../i18n.js';

const M = (n) => toMathML(stripParen(n));
const vOf = (ctx) => ctx?.v || 'x';

// The paths of the first derivatives d(…) in v of a line.
function derivPaths(prev, v) {
  const paths = [];
  walk(prev, (n, path) => {
    if (n.t === 'deriv' && n.v === v && n.n === 1) { paths.push(path); return false; }
    return true;
  });
  return paths;
}

// The arc and hyperbolic functions whose derivatives get swapped.
const ARC_PAIRS = [['arctan', 'arcsin'], ['arctan', 'argsh'], ['arcsin', 'argsh']];
const ARC_NAME = { arctan: 'Arctg', arcsin: 'Arcsin', argsh: 'Argsh' };
const swapNames = (e, [a, b]) => mapNode(e, (n) => {
  if (n.t !== 'fn') return n;
  const c = canonFn(n.name);
  return c === a ? { ...n, name: b } : c === b ? { ...n, name: a } : n;
});
const hasFn = (e, name) => {
  let found = false;
  walk(e, (n) => { if (n.t === 'fn' && canonFn(n.name) === name) found = true; return !found; });
  return found;
};

export const RULES = [
  {
    id: 'a1_derivable_from_formula', family: 'method', tag: 'C', skill: 'a1-deriv-def', repair: 'a1-deriv-def',
    judges: [],
    name: t('Dérivabilité en x₀ lue sur la formule de f′(x) (guide « Méthodes », 5.1)'),
    example: [t('« f′(x) = 2x sin(1/x) − cos(1/x) n\'a pas de limite en 0, donc f n\'est pas dérivable en 0 »'), 'f′(0) = lim (h² sin(1/h))/h = 0'],
    // Met as an option of the multiple choices and a decoy block.
    check: { bait: { skill: 'a1-deriv-def', exam: 'mcq' } },
    explain: (ctx = {}) => t('En {x0}, la dérivée se calcule par le taux d\'accroissement (f(x₀ + h) − f(x₀))/h. La formule de f′(x) ne vaut que pour x ≠ x₀ : lim f′(x) peut ne pas exister alors que f′(x₀) existe (x²·sin(1/x) en 0).', { x0: ctx.x0 ?? 'x₀' }),
  },
  {
    id: 'a1_corner_missed', family: 'method', tag: 'E', skill: 'a1-deriv-def', repair: 'a1-deriv-def',
    judges: [],
    name: t('Point anguleux non vu : une seule dérivée latérale, ou leur moyenne'),
    example: [t('« |x| a pour dérivée 0 en 0 »'), t('|x| n\'est pas dérivable en 0 : f′₋(0) = −1, f′₊(0) = 1')],
    check: { bait: { skill: 'a1-deriv-def', exam: 'mcq' } },
    explain: (ctx = {}) => t('{p1} : c\'est un point anguleux, f n\'y est pas dérivable. Il faut calculer les deux dérivées latérales et vérifier qu\'elles sont égales.', { p1: ctx.l !== undefined ? t('À gauche la pente vaut {l}, à droite {r}', { l: ctx.l, r: ctx.r }) : t('Les dérivées à gauche et à droite sont différentes') }),
  },
  {
    id: 'a1_arc_deriv_table', family: 'facts', tag: 'E', skill: 'a1-deriv-rules', repair: 'g3-arc-def',
    judges: ['equiv'],
    name: t('Dérivées d\'Arctg, Arcsin et Argsh échangées'),
    example: ['(Arctg x)′ = 1/√(1 − x²)', '(Arctg x)′ = 1/(1 + x²)'],
    check: { judge: { kind: 'equiv', vars: ['x'], dvar: 'x', domain: { x: [0.2, 0.9] }, target: 'no-prime' }, prev: 'd(arctan(x))', line: '1/√(1-x^2)' },
    // Each d(…) of the line differentiated with the names of two arc
    // functions swapped, then swapped back: only their derivatives change.
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const out = [];
      for (const path of derivPaths(prev, v)) {
        const d = getAt(prev, path);
        for (const pair of ARC_PAIRS) {
          const used = pair.filter((name) => hasFn(d.e, name));
          if (!used.length) continue;
          let repl;
          try { repl = swapNames(diff(swapNames(d.e, pair), v), pair); } catch { continue; }
          const [a, b] = used[0] === pair[0] ? pair : [pair[1], pair[0]];
          out.push({ node: replaceAt(prev, path, { t: 'paren', e: repl }), ctx: { used: ARC_NAME[a], as: ARC_NAME[b] } });
        }
      }
      return out;
    },
    explain: (ctx = {}) => `${ctx.used ? t('Tu as pris pour {used} la dérivée de {as}. ', { used: ctx.used, as: ctx.as }) : ''}Arctg′(x) = 1/(1 + x²) ; Arcsin′(x) = 1/√(1 − x²) ; Argsh′(x) = 1/√(1 + x²).`,
  },
  {
    id: 'a1_inverse_deriv_wrong_point', family: 'rule', tag: 'E', skill: 'a1-deriv-inverse', repair: 'a1-deriv-inverse',
    judges: ['value'],
    name: t('(f⁻¹)′(y₀) calculé avec f′(y₀) au lieu de f′(x₀)'),
    example: ['(f⁻¹)′(5) = 1/f′(5)', '(f⁻¹)′(5) = 1/f′(1)'],
    check: { judge: { kind: 'value', expect: '1/6', inv: { fp: '3x^2+3', x0: '1', y0: '5' } }, prev: '(f^(-1))\'(5)', line: '1/78' },
    // cfg.inv = {fp: f′(x) as text, x0, y0}: 1/f′(y0).
    transform: (prev, ctx = {}) => {
      const inv = ctx.cfg?.inv;
      if (!inv) return [];
      const at = substVar(parse(inv.fp), 'x', parse(inv.y0));
      return [{ node: div(num(1), { t: 'paren', e: at }), ctx: { x0: inv.x0, y0: inv.y0 } }];
    },
    explain: (ctx = {}) => t('On dérive f là où elle vaut {y0}, c\'est-à-dire en x₀ = {x0}, pas en {y0} : (f⁻¹)′(y₀) = 1/f′(x₀) avec f(x₀) = y₀.', { y0: ctx.y0 ?? 'y₀', x0: ctx.x0 ?? 'f⁻¹(y₀)' }),
  },
  {
    id: 'a1_exp_rule_var_base', family: 'rule', tag: 'E', skill: 'a1-deriv-log', repair: 'a1-deriv-log',
    judges: ['equiv'],
    name: t('(uᵛ)′ = uᵛ·Log u·v′ : le terme v·u′/u manque'),
    example: ['((x + 3)ˣ)′ = (x + 3)ˣ·Log(x + 3)', '((x + 3)ˣ)′ = (x + 3)ˣ·(Log(x + 3) + x/(x + 3))'],
    check: { judge: { kind: 'equiv', vars: ['x'], dvar: 'x', domain: { x: [0.2, 2] }, target: 'no-prime' }, prev: 'd((x+3)^x)', line: '(x+3)^x×ln(x+3)' },
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const out = [];
      for (const path of derivPaths(prev, v)) {
        const e = stripParen(getAt(prev, path).e);
        if (e.t !== 'pow' || !dependsOn(e.b, v) || !dependsOn(e.e, v)) continue;
        const repl = mul(mul(e, fn('ln', e.b)), diff(e.e, v));
        out.push({ node: replaceAt(prev, path, { t: 'paren', e: repl }), ctx: { u: e.b, w: e.e } });
      }
      return out;
    },
    explain: (ctx = {}) => t('La base {p1} dépend aussi de x : (aᵛ)′ = aᵛ·Log a·v′ ne vaut que pour une base constante. Écris uᵛ = e^(v·Log u) et dérive l\'exposant en entier : (uᵛ)′ = uᵛ·(v′·Log u + v·u′/u).', { p1: ctx.u ? M(ctx.u) : 'u' }),
  },
  {
    id: 'a1_c1_def_missing_cont', family: 'logic', tag: 'C', skill: 'a1-c1-def', repair: 'a1-c1-def',
    judges: [],
    name: t('C¹ défini sans la continuité de f′ (cours Friedli, exemple 9.34 ; examens 2020 et 2022)'),
    example: [t('« f ∈ C¹(I) si f est dérivable sur I »'), t('f ∈ C¹(I) si f est dérivable sur I et f′ est continue sur I')],
    // A decoy block of the definition (« f est continue sur I » in place
    // of « f′ est continue sur I »).
    check: { bait: { skill: 'a1-c1-def', level: 3 } },
    explain: () => t('Il faut deux conditions : f dérivable en tout point de I, et f′ continue sur I. x²·sin(1/x) (prolongée par 0) est dérivable sur ℝ, mais sa dérivée n\'est pas continue en 0.'),
  },
  {
    id: 'a1_piecewise_derivative_formula', family: 'method', tag: 'C', skill: 'a1-piecewise-ab', repair: 'a1-deriv-def',
    judges: [],
    name: t('Pentes des morceaux égalées sans vérifier la continuité (guide « Méthodes », 5.1)'),
    example: [t('égaler g₁′(x₀) et g₂′(x₀) seulement'), t('continuité au raccord, puis dérivées à gauche et à droite')],
    check: { bait: { skill: 'a1-piecewise-ab', exam: 'mcq' } },
    explain: (ctx = {}) => t('Si f n\'est pas continue en {x0}, elle n\'y est pas dérivable, même avec des pentes égales. Écris d\'abord l\'équation de continuité au raccord, puis l\'égalité des dérivées à gauche et à droite.', { x0: ctx.x0 ?? 'x₀' }),
  },
  {
    id: 'a1_c1_from_lim_fprime_only', family: 'logic', tag: 'C', skill: 'a1-c1-proof', repair: 'a1-deriv-def',
    judges: [],
    name: t('f′(x₀) déduit de lim f′(x) sans le taux d\'accroissement (check-list MT 2018)'),
    example: [t('« lim f′(x) = 3, donc f′(0) = 3 »'), t('f′(0) = lim (f(h) − f(0))/h = 3, puis lim f′(x) = 3 = f′(0)')],
    check: { bait: { skill: 'a1-c1-proof', level: 3 } },
    explain: () => t('Montre d\'abord que f′(x₀) existe, avec le taux d\'accroissement. Ensuite seulement, on vérifie que f′(x) → f′(x₀). La limite de f′ ne remplace pas la définition.'),
  },
  {
    id: 'a1_bounded_times_zero', family: 'rule', tag: 'C', skill: 'a1-fn-limits', repair: 'a1-seq-squeeze',
    judges: [],
    name: t('0 × (borné) pris pour une forme indéterminée (résumé « Calcul de limites »)'),
    example: [t('lim x·sin(1/x) « n\'existe pas »'), 'lim x·sin(1/x) = 0'],
    check: { bait: { skill: 'a1-fn-limits', level: 2 } },
    explain: () => t('0 × (borné) n\'est pas indéterminé : |x·sin(1/x)| ≤ |x| → 0, donc la limite vaut 0 (gendarmes).'),
  },
];
