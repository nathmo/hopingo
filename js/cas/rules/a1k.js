// Traps of module A1, part k (step U4): IVT, image of an interval,
// bisection, power series. Catalogue: docs/universite/A1-analyse-1.md,
// « Pièges du module ».
//
// Most of them are final answers (decoy blocks, multiple-choice options,
// decisions, true/false statements): check {bait}. a1_pow_sum_index_shift
// replays on a `definite` line: a Σ from k₀ replaced by the whole series
// (from 0), or shifted by one index too many; diagnose.js compares the
// candidates with the student's line by value.

import { walk, replaceAt, lit } from '../ast.js';
import { evalFloat } from '../numeric.js';
import { Q } from '../../math/rational.js';

const isInfSum = (n) => n.t === 'sum' && n.hi && ((n.hi.t === 'const' && n.hi.name === 'inf') || (n.hi.t === 'paren' && n.hi.e.t === 'const' && n.hi.e.name === 'inf'));

export const RULES = [
  {
    id: 'a1_ivt_no_continuity', family: 'logic', tag: 'E', skill: 'a1-fn-ivt', repair: 'a1-fn-ivt',
    judges: [],
    name: 'TVI sans la continuité',
    example: ['« f(0) < 0 < f(1), donc f s\'annule » pour 1/(x − 1/2)', 'il faut f continue sur [0 ; 1]'],
    check: { bait: { skill: 'a1-fn-ivt', level: 3 } },
    explain: () => 'Sans continuité, f peut sauter par-dessus 0 : 1/(x − 1/2) change de signe sur [0 ; 1] sans s\'annuler. Le TVI demande f continue sur [a ; b].',
  },
  {
    id: 'a1_image_endpoints_only', family: 'method', tag: 'E', skill: 'a1-fn-image', repair: 'a1-fn-image',
    judges: [],
    name: 'Image lue sur les seules bornes',
    example: ['f(x) = e^(−x)·sin x : image [f(0) ; f(π)] = {0}', '[0 ; (√2/2)·e^(−π/4)]'],
    check: { bait: { skill: 'a1-fn-image', exam: 'mcq' } },
    explain: (ctx = {}) => (ctx.c
      ? `f n'est pas monotone sur [${ctx.a} ; ${ctx.b}] : un extremum est atteint en ${ctx.c}, à l'intérieur.`
      : 'f n\'est pas forcément monotone : un extremum peut être atteint à l\'intérieur, là où f′ = 0. Compare les valeurs aux bornes et aux points critiques.'),
  },
  {
    id: 'a1_bisection_count', family: 'facts', tag: 'E', skill: 'a1-bisection-fixpoint', repair: 'a1-bisection-fixpoint',
    judges: [],
    name: 'Bissection : l\'erreur divisée par 10 à chaque étape',
    example: ['erreur ≤ 10⁻³ dès n = 3', 'n = 10, car 2¹⁰ = 1024 ≥ 10³'],
    check: { bait: { skill: 'a1-bisection-fixpoint', exam: 'mcq' } },
    explain: () => 'Chaque étape divise la longueur de l\'intervalle par 2, pas par 10 : il faut 2ⁿ ≥ 10³, donc n = 10 (2¹⁰ = 1024).',
  },
  {
    id: 'a1_power_bounds_forgotten', family: 'method', tag: 'E', skill: 'a1-pow-domain', repair: 'a1-pow-domain',
    judges: [],
    name: 'Bornes du domaine oubliées',
    example: ['domaine ]1/3 ; 5/3[', '[1/3 ; 5/3[ : en x = 1/3, Σ (−1)ⁿ/(2n) converge'],
    check: { bait: { skill: 'a1-pow-domain', exam: 'mcq' } },
    explain: (ctx = {}) => (ctx.b
      ? `En x = ${ctx.b}, la série devient ${ctx.s}, qui converge : cette borne est dans le domaine.`
      : 'Le rayon ne dit rien aux bornes x₀ ± R : remplace x par chaque borne et étudie la série numérique obtenue (Leibniz, Riemann, condition nécessaire).'),
  },
  {
    id: 'a1_power_radius_inverse', family: 'rule', tag: 'E', skill: 'a1-pow-domain', repair: 'a1-pow-domain',
    judges: [],
    name: 'Rayon R = ρ au lieu de 1/ρ',
    example: ['ρ = 3/2, donc R = 3/2', 'R = 1/ρ = 2/3'],
    check: { bait: { skill: 'a1-pow-domain', exam: 'mcq' } },
    explain: (ctx = {}) => `La série converge quand ρ·|x − x₀| < 1, donc pour |x − x₀| < 1/ρ : R = 1/ρ${ctx.R ? ` = ${ctx.R}` : ''}.`,
  },
  {
    id: 'a1_power_center_sign', family: 'sign', tag: 'E', skill: 'a1-pow-domain', repair: 'a1-pow-domain',
    judges: [],
    name: 'Centre de la série lu avec le mauvais signe',
    example: ['Σ aₙ(x + 1)ⁿ centrée en 1', 'centrée en −1'],
    check: { bait: { skill: 'a1-pow-domain', exam: 'mcq' } },
    explain: () => '(x + 1)ⁿ = (x − (−1))ⁿ : le centre est −1. L\'intervalle de convergence est centré en x₀ pour Σ aₙ(x − x₀)ⁿ.',
  },
  {
    id: 'a1_pow_sum_index_shift', family: 'notation', tag: 'E', skill: 'a1-pow-sums', repair: 'g5-reindex',
    judges: ['definite'],
    name: 'Série de référence sans ses premiers termes',
    example: ['Σ_{k≥1} 2ᵏ/k! = e²', 'e² − 1 : le terme k = 0 manque'],
    check: { judge: { kind: 'definite' }, prev: 'sum(2^k/k!,k,1,∞)', line: 'e^2' },
    // Σ from k₀ replaced by the series from 0, or from k₀ ± 1.
    transform: (prev) => {
      const out = [];
      walk(prev, (n, path) => {
        if (!isInfSum(n)) return true;
        const lo = Math.round(evalFloat(n.lo, {}));
        if (!Number.isFinite(lo)) return true;
        const starts = [...new Set([0, lo - 1, lo + 1])].filter((s) => s >= 0 && s !== lo);
        for (const s of starts) out.push({ node: replaceAt(prev, path, { ...n, lo: lit(new Q(s)) }), ctx: { k0: lo, from: s, term: n } });
        return false;
      });
      return out;
    },
    explain: (ctx = {}) => (ctx.term && ctx.from < ctx.k0
      ? `La série de référence commence à ${ctx.term.k} = 0 ; ici la somme commence à ${ctx.term.k} = ${ctx.k0} : retire les termes ${ctx.term.k} = ${ctx.from}${ctx.k0 - ctx.from > 1 ? ` à ${ctx.k0 - 1}` : ''}.`
      : 'Regarde où commence la somme : Σ xᵏ/k! = eˣ vaut pour une somme qui commence à k = 0. Ici le terme k = 0 (= 1) manque : Σ_{k≥1} 2ᵏ/k! = e² − 1.'),
  },
];
