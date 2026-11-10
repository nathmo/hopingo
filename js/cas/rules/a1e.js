// Traps of step U2, part a1e (spec §7): bounding integrals, the
// fundamental theorem, improper integrals, applications. Catalogue:
// docs/universite/A1-analyse-1.md, « Pièges du module ».
//
// transform(prev, ctx) → [{node, ctx}] replays the mistake on the previous
// line (`equiv`: d/dx ∫ lines; `definite`: integrals; `limit`: the limit at
// +∞ of a sum of logarithms). The traps on verdicts (« diverge »,
// « converge ») are final answers: decision options, multiple-choice
// options and true/false statements carry them (check: {bait}).

import { parse } from '../parse.js';
import { walk, replaceAt, stripParen, dependsOn, contains, sub, deriv } from '../ast.js';
import { substVar, diff } from '../diff.js';
import { toMathML } from '../mathml.js';
import { toText } from '../print.js';

const M = (n) => toMathML(stripParen(typeof n === 'string' ? parse(n) : n));
const par = (e) => ({ t: 'paren', e });

// One candidate per sub-expression matching pred, replaced by fn(node).
function each(prev, pred, fn) {
  const out = [];
  walk(prev, (n, path) => {
    if (pred(n)) {
      let r = null;
      try { r = fn(n); } catch { r = null; }
      if (r) out.push({ node: replaceAt(prev, path, par(r.node ?? r)), ctx: r.ctx ?? {} });
    }
    return true;
  });
  return out;
}

const isDefInt = (n) => n.t === 'int' && !!n.lo;
// d/dx of ∫ from lo to hi with a bound depending on x.
const isFtc = (v) => (n) => n.t === 'deriv' && n.v === v && n.n === 1 && isDefInt(stripParen(n.e))
  && (dependsOn(stripParen(n.e).hi, v) || dependsOn(stripParen(n.e).lo, v));

// e^(c·t²): the exponent's text, or null.
function expSquare(f, t) {
  f = stripParen(f);
  if (f.t !== 'pow' || stripParen(f.b).t !== 'const' || stripParen(f.b).name !== 'e') return null;
  const m = new RegExp(`^(-?)(\\d*)×?${t}\\^2$`).exec(toText(stripParen(f.e)));
  return m ? { sign: m[1], c: m[2] } : null;
}

// A wrong primitive of f(t) (power rule in the exponent, inner function
// forgotten), or null.
const NAIVE = [
  ['e^(-t^2)', 'e^(-t^3/3)'], ['e^(t^2)', 'e^(t^3/3)'], ['ln(1+t^2)', 't×ln(1+t^2)-t'],
  ['√(1+t^4)', '(2/3)(1+t^4)^(3/2)'], ['sin(t)/t', '-cos(t)/t'],
].map(([f, F]) => [toText(parse(f, { vars: ['t'] })), parse(F, { vars: ['t'] })]);
function naive(f, t) {
  const text = toText(substVar(f, t, { t: 'sym', name: 't' }));
  const hit = NAIVE.find(([k]) => k === text);
  return hit ? substVar(hit[1], 't', { t: 'sym', name: t }) : null;
}

const isLnTerm = (n, v) => {
  n = stripParen(n);
  if (n.t === 'neg') n = stripParen(n.e);
  if (n.t === 'bin' && n.op === '×') n = stripParen(n.r);
  return n.t === 'fn' && ['ln', 'log', 'Log'].includes(n.name) && dependsOn(n.args[0], v);
};
function sumTerms(n, out = []) {
  n = stripParen(n);
  if (n.t === 'bin' && (n.op === '+' || n.op === '-')) { sumTerms(n.l, out); out.push(n.op === '-' ? { t: 'neg', e: n.r } : n.r); return out; }
  out.push(n);
  return out;
}

export const RULES = [
  {
    id: 'a1_int_exp_square_primitive', family: 'rule', tag: 'C', skill: 'a1-int-estimate', repair: 'a1-int-direct',
    judges: ['definite'],
    name: 'Primitive inventée pour e^(x²)',
    example: ['∫₀² e^(x²) dx = e^(8/3) − 1', 'e^(x²) n\'a pas de primitive élémentaire : on encadre'],
    check: { judge: { kind: 'definite' }, prev: 'int(e^(x^2),x,0,2)', line: 'e^(8/3)-1' },
    // ∫ e^(c·x²) → [e^(c·x³/3)].
    transform: (prev) => each(prev, (n) => isDefInt(n) && !!expSquare(n.e, n.v), (n) => {
      const { sign, c } = expSquare(n.e, n.v);
      const F = parse(`e^(${sign}${c ? `${c}×` : ''}${n.v}^3/3)`, { vars: [n.v] });
      return { node: { t: 'bracket', e: F, v: n.v, lo: n.lo, hi: n.hi }, ctx: { f: n.e, F } };
    }),
    explain: (ctx = {}) => `Dérive ${ctx.F ? M(ctx.F) : 'e^(x³/3)'} : tu obtiens x²·e^(x³/3), pas ${ctx.f ? M(ctx.f) : 'e^(x²)'}. e^(x²) n'a pas de primitive élémentaire : on encadre l'intégrale.`,
  },
  {
    id: 'a1_parity_misused', family: 'logic', tag: 'C', skill: 'a1-int-estimate', repair: 'a1-int-estimate',
    judges: [],
    name: 'Intégrale nulle sur un intervalle symétrique sans fonction impaire',
    example: ['f bijective, f(0) = 0 ⇒ ∫₋₁¹ f = 0', 'seulement si f est impaire'],
    check: { bait: { skill: 'a1-int-estimate', exam: 'tf' } },
    explain: () => '∫₋ₐᵃ f = 0 demande f impaire. f(x) = x (x ≥ 0), −√(−x) (x < 0) ne l\'est pas : son intégrale sur [−1 ; 1] vaut −1/6. Une fonction paire donne même le double de ∫₀ᵃ f.',
  },
  {
    id: 'a1_ftc_no_chain', family: 'rule', tag: 'E', skill: 'a1-ftc', repair: 'a1-deriv-rules',
    judges: ['equiv'],
    name: 'Théorème fondamental sans la règle de chaîne',
    example: ['(∫₁^(x³) f)′ = f(x³)', '3x²·f(x³)'],
    check: { judge: { kind: 'equiv', vars: ['x'], domain: { x: [0.3, 1.4] }, target: 'no-prime' }, prev: 'd(int(ln(1+t^2),t,1,x^3))', line: 'ln(1+x^6)' },
    // d/dx ∫ from h to g of f → f(g) − f(h), without g′ and h′.
    transform: (prev, ctx) => {
      const v = ctx?.v || 'x';
      return each(prev, isFtc(v), (d) => {
        const I = stripParen(d.e);
        const at = (b) => (dependsOn(b, v) ? substVar(I.e, I.v, b) : null);
        const g = at(I.hi);
        const h = at(I.lo);
        const node = g && h ? sub(g, h) : g || { t: 'neg', e: h };
        const bound = dependsOn(I.hi, v) ? I.hi : I.lo;
        return { node, ctx: { g: bound, dg: diff(bound, v) } };
      });
    },
    explain: (ctx = {}) => (ctx.g
      ? `La borne est ${M(ctx.g)} : règle de chaîne, multiplie par (${M(ctx.g)})′ = ${M(ctx.dg)}.`
      : 'La borne dépend de x : règle de chaîne, (F(g(x)))′ = f(g(x))·g′(x).'),
  },
  {
    id: 'a1_ftc_integrate_first', family: 'method', tag: 'E', skill: 'a1-ftc', repair: 'a1-ftc',
    judges: ['equiv'],
    name: 'Chercher une primitive avant de dériver',
    example: ['(∫₀^(x²) e^(−t²) dt)′ : primitive e^(−t³/3)', 'G′(x) = 2x·e^(−x⁴), sans primitive'],
    check: { judge: { kind: 'equiv', vars: ['x'], domain: { x: [0.3, 1.4] }, target: 'no-prime' }, prev: 'd(int(e^(-t^2),t,0,x^2))', line: '-2x^5×e^(-x^6/3)' },
    // A wrong primitive F of f, then (F(g) − F(h))′.
    transform: (prev, ctx) => {
      const v = ctx?.v || 'x';
      return each(prev, isFtc(v), (d) => {
        const I = stripParen(d.e);
        const F = naive(I.e, I.v);
        if (!F) return null;
        return { node: deriv(sub(substVar(F, I.v, I.hi), substVar(F, I.v, I.lo)), v), ctx: { f: I.e, F } };
      });
    },
    explain: (ctx = {}) => `Inutile de trouver une primitive${ctx.F ? ` (et ${M(ctx.F)} n'en est pas une : dérive-la)` : ''}. Seule F′ = f sert : appelle-la F et dérive F(g(x)) − F(h(x)).`,
  },
  {
    id: 'a1_improper_singularity_ignored', family: 'rule', tag: 'R', skill: 'a1-improper-calc', repair: 'a1-improper-calc',
    judges: [],
    name: 'Théorème fondamental à travers un point où f n\'est pas bornée',
    example: ['∫₋₁¹ dx/x² = [−1/x]₋₁¹ = −2', 'diverge'],
    check: { bait: { skill: 'a1-improper-calc', level: 3 } },
    explain: () => '1/x² > 0 : l\'intégrale ne peut pas être négative. f n\'est pas bornée en 0 : coupe en 0 et calcule chaque morceau par une limite.',
  },
  {
    id: 'a1_improper_undefined_means_diverge', family: 'meaning', tag: 'C', skill: 'a1-improper-calc', repair: 'a1-improper-compare',
    judges: [],
    name: '« f n\'est pas définie à la borne, donc l\'intégrale diverge »',
    example: ['f n\'est pas définie en 0, donc ∫ de 0⁺ à π/6 diverge', 'elle converge et vaut √2'],
    check: { bait: { skill: 'a1-improper-calc' } },
    explain: () => 'Une borne où f n\'est pas définie (ou infinie) rend l\'intégrale généralisée, pas divergente : ∫ de 0⁺ à 1 de dx/√x = 2. Il faut calculer la limite, ou comparer.',
  },
  {
    id: 'a1_alpha_criteria_swapped', family: 'facts', tag: 'E', skill: 'a1-improper-compare', repair: 'a1-improper-compare',
    judges: [],
    name: 'Critères en 0⁺ et en +∞ échangés',
    example: ['∫ de 0⁺ à 1 de dx/√x « diverge (α < 1) »', 'converge'],
    check: { bait: { skill: 'a1-improper-compare' } },
    explain: () => 'En 0⁺ (ou en un point fini a), dx/(x − a)ᵅ converge si α < 1 ; en +∞, dx/xᵅ converge si α > 1. Les deux critères sont opposés.',
  },
  {
    id: 'a1_improper_lim_zero_converges', family: 'logic', tag: 'C', skill: 'a1-improper-compare', repair: 'a1-improper-compare',
    judges: [],
    name: '« f → 0, donc l\'intégrale converge »',
    example: ['1/x → 0 en +∞, donc ∫₁^∞ dx/x converge', 'diverge'],
    check: { bait: { skill: 'a1-improper-compare', exam: 'tf' } },
    explain: () => '1/x → 0 et pourtant ∫₁^∞ dx/x = +∞. Que f tende vers 0 ne suffit pas : il faut qu\'elle y tende assez vite (comparer à 1/xᵅ, α > 1).',
  },
  {
    id: 'a1_improper_one_end_only', family: 'method', tag: 'E', skill: 'a1-improper-compare', repair: 'a1-improper-compare',
    judges: [],
    name: 'Un seul point problème étudié',
    example: ['verdict après le seul point 1⁺', 'les deux points 1⁺ et +∞'],
    check: { bait: { skill: 'a1-improper-compare' } },
    explain: (ctx = {}) => (ctx.p1 ? `Il y a deux points problèmes, ${ctx.p1} et ${ctx.p2} : chacun doit converger.` : 'Il y a deux points problèmes : coupe l\'intervalle, et chaque morceau doit converger.'),
  },
  {
    id: 'a1_improper_log_split_limit', family: 'rule', tag: 'C', skill: 'a1-improper-rational', repair: 'a1-improper-rational',
    judges: ['limit'],
    name: 'Limite de chaque Log séparément (∞ − ∞)',
    example: ['[−2Log(x + 1)]₁^∞ + [Log(x² + 2x + 2)]₁^∞ = −∞ + ∞', 'Log((x² + 2x + 2)/(x + 1)²) → 0'],
    check: { judge: { kind: 'limit', v: 'x', to: '+∞' }, prev: '-2ln(x+1)+ln(x^2+2x+2)+4arctan(x+1)', line: '+∞' },
    // A sum with two Log that go to infinity: one Log « wins ».
    transform: (prev, ctx) => {
      const v = ctx?.v || 'x';
      if (ctx?.cfg?.to !== undefined && !String(ctx.cfg.to).includes('∞')) return [];
      const logs = sumTerms(prev).filter((t) => isLnTerm(t, v));
      if (logs.length < 2) return [];
      return [{ node: parse('+∞'), ctx: {} }, { node: parse('-∞'), ctx: {} }];
    },
    explain: () => 'Chaque Log part à l\'infini, mais leur somme est le Log d\'un quotient : −2Log(x + 1) + Log(x² + 2x + 2) = Log((x² + 2x + 2)/(x + 1)²) → Log 1 = 0. Regroupe avant la limite.',
  },
  {
    id: 'a1_volume_no_square', family: 'rule', tag: 'E', skill: 'a1-int-applications', repair: 'a1-int-applications',
    judges: ['definite'],
    name: 'Volume de révolution sans le carré',
    example: ['V = π∫ f(x) dx', 'V = π∫ f(x)² dx'],
    check: { judge: { kind: 'definite' }, prev: 'π×int((√x)^2,x,0,4)', line: '16π/3' },
    // π∫ f² → π∫ f.
    transform: (prev) => (contains(prev, (n) => n.t === 'const' && n.name === 'pi')
      ? each(prev, (n) => isDefInt(n) && stripParen(n.e).t === 'pow' && toText(stripParen(n.e).e) === '2', (n) => ({ ...n, e: stripParen(stripParen(n.e).b) }))
      : []),
    explain: () => 'Chaque tranche est un disque de rayon f(x), d\'aire π·f(x)² : V = π∫ f(x)² dx.',
  },
  {
    id: 'a1_arc_length_no_sqrt', family: 'rule', tag: 'E', skill: 'a1-int-applications', repair: 'a1-int-applications',
    judges: ['definite'],
    name: 'Longueur d\'arc sans la racine',
    example: ['L = ∫ (1 + f′²) dx', 'L = ∫ √(1 + f′²) dx'],
    check: { judge: { kind: 'definite' }, prev: 'int(√(1+sinh(x)^2),x,0,ln(2))', line: 'ln(2)/2+15/32' },
    // ∫ √(1 + …) → ∫ (1 + …).
    transform: (prev) => each(prev, (n) => isDefInt(n) && stripParen(n.e).t === 'sqrt' && /^1\+/.test(toText(stripParen(stripParen(n.e).e))), (n) => ({ ...n, e: stripParen(n.e).e })),
    explain: () => 'Un petit bout de courbe mesure √(dx² + dy²) = √(1 + f′(x)²)·dx : la racine reste dans l\'intégrale.',
  },
  // U4: skill a1-ser-compare (the catalogue's skill and repair for this trap).
  {
    id: 'a1_compare_wrong_direction', family: 'logic', tag: 'E', skill: 'a1-ser-compare', repair: 'a1-ser-compare',
    judges: [],
    name: 'Comparaison dans le mauvais sens',
    example: ['f ≥ 1/x², ∫ 1/x² converge, donc ∫ f converge', 'il faut f ≤ g'],
    check: { bait: { skill: 'a1-improper-compare', exam: 'mcq' } },
    explain: () => 'Être plus grand qu\'une intégrale (ou une série) convergente ne dit rien. Pour converger, il faut être plus petit, en valeur absolue, qu\'une intégrale convergente ; pour diverger, plus grand qu\'une intégrale divergente positive.',
  },
];
