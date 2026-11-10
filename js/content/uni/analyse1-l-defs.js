// Generators of module A1, part l (step U4): a1-defs, the definitions of
// the exam. Catalogue: docs/universite/A1-analyse-1.md, `a1-defs`.
//
// Blocks (`mode:'define'`) for the definitions in sentences, tokens (judge
// `logic`) for those that are formulas (Sup, continuity, Cauchy). The
// scale of §16.3: L1 one block missing (to choose among decoys), L2 two
// blocks among four, L3 all the blocks and two decoys, L4 the formula in
// tokens or the blocks with every decoy, L5 three definitions drawn at
// random, without help (a problem). Exam: `open` (one definition, a
// problem) and `tf`.
//
// Each decoy names its trap, those of other skills included
// (a1_sup_in_set, a1_series_term_to_zero, a1_abs_conv_confused,
// a1_epsdelta_swapped, a1_bounded_implies_convergent); a decoy is offered
// only if its trap exists (RULE_BY_ID).

import { RULE_BY_ID } from '../../math/malrules.js';
import { blocksItem, tokensItem, tfItem, FM } from './kit.js';
import { problemItem } from './kit-problem.js';

const SK = 'a1-defs';
const SUB = [
  { id: 'quant', label: 'quantificateurs', skill: 'g9-quant-write' },
  { id: 'def', label: 'définition', skill: SK },
];
const live = (d) => !!RULE_BY_ID[d.rule];
const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];

// The definitions: frame (prompt), conditions in order, decoys, and the
// formula in tokens when there is one.
const DEFS = [
  {
    id: 'sup', name: 's = Sup A', frame: 'Soit A ⊂ ℝ non vide et s ∈ ℝ. On dit que s = Sup A si :',
    blocks: ['s est un majorant de A : x ≤ s pour tout x ∈ A ;', 'pour tout ε > 0, il existe x ∈ A tel que x > s − ε.'],
    decoys: [
      { html: 'il existe x ∈ A tel que, pour tout ε > 0, x > s − ε.', rule: 'g9_quant_order', why: 'L\'ordre compte : x dépend de ε. Un même x pour tous les ε serait ≥ s.' },
      { html: 'il existe x ∈ A tel que x > s − 1/10.', rule: 'g9_proof_by_example', why: 'Un seul ε ne suffit pas : il faut s\'approcher de s pour <b>tout</b> ε > 0.' },
      { html: 's ∈ A.', rule: 'a1_sup_in_set', why: 'Le Sup n\'est pas forcément dans A : Sup [0 ; 1[ = 1 ∉ [0 ; 1[.' },
      { html: 's est le plus grand élément de A.', rule: 'a1_sup_in_set', why: 'C\'est la définition du Max. Le Sup existe même sans Max : Sup [0 ; 1[ = 1.' },
    ],
    hint: 'Deux conditions : s majore A, et on peut s\'approcher de s par des éléments de A autant qu\'on veut.',
    formula: {
      target: '(∀x ∈ A, x ≤ s) ∧ (∀ε > 0 ∃y ∈ A, y > s − ε)',
      pieces: ['x ∈ A', 'x ≤ s', 'ε > 0', 'y ∈ A', 'y > s − ε'], decoys: ['y ≥ s', 'ε ≥ 0'],
    },
  },
  {
    id: 'cont', name: 'f est continue en x₀', frame: 'Soit f : D → ℝ et x₀ ∈ D. On dit que f est continue en x₀ si :',
    blocks: ['pour tout ε > 0,', 'il existe δ > 0 tel que,', 'pour tout x ∈ D avec |x − x₀| ≤ δ,', 'on a |f(x) − f(x₀)| ≤ ε.'],
    decoys: [
      { html: 'il existe δ > 0 tel que, pour tout ε > 0,', rule: 'g9_quant_order', why: 'δ se choisit après ε : il dépend de ε.' },
      { html: 'on a |f(x) − f(x₀)| ≤ δ.', rule: 'a1_epsdelta_swapped', why: 'ε mesure l\'écart des valeurs f(x) − f(x₀), δ celui des x.' },
      { html: 'pour tout x ∈ D avec |x − x₀| ≤ ε,', rule: 'a1_epsdelta_swapped', why: 'δ mesure l\'écart des x ; ε celui des valeurs.' },
    ],
    hint: 'Même charpente que la limite ε-δ, avec la limite f(x₀) : ∀ε ∃δ ∀x.',
    formula: {
      target: '∀ε > 0 ∃δ > 0 ∀x ∈ D, |x − x₀| ≤ δ ⇒ |f(x) − f(x₀)| ≤ ε',
      pieces: ['ε > 0', 'δ > 0', 'x ∈ D', '|x − x₀| ≤ δ', '|f(x) − f(x₀)| ≤ ε'], decoys: ['|x − x₀| ≤ ε', '|f(x) − f(x₀)| ≤ δ'],
    },
  },
  {
    id: 'cauchy', name: '(aₙ) est une suite de Cauchy', frame: 'Soit (aₙ) une suite réelle. On dit que (aₙ) est une suite de Cauchy si :',
    blocks: ['pour tout ε > 0,', 'il existe N ∈ ℕ tel que,', 'pour tous m, n ≥ N,', 'on a |aₘ − aₙ| ≤ ε.'],
    decoys: [
      { html: 'on a |aₙ₊₁ − aₙ| ≤ ε.', rule: 'a1_cauchy_consecutive', why: 'Cauchy compare deux termes quelconques, pas seulement deux voisins : Log(n + 1) − Log n → 0, mais Log n → +∞.' },
      { html: 'il existe N ∈ ℕ tel que, pour tout ε > 0,', rule: 'g9_quant_order', why: 'N se choisit après ε : il dépend de ε.' },
      { html: 'la suite aₙ₊₁ − aₙ tend vers 0.', rule: 'a1_cauchy_consecutive', why: 'Insuffisant : aₙ = Log n vérifie aₙ₊₁ − aₙ → 0 et n\'est pas de Cauchy.' },
    ],
    hint: 'Même charpente que la limite, mais on compare deux termes entre eux, pas à ℓ.',
    formula: {
      target: '∀ε > 0 ∃N ∈ ℕ ∀m, n ≥ N, |a_m − a_n| ≤ ε',
      pieces: ['ε > 0', 'N ∈ ℕ', 'm, n ≥ N', '|a_m − a_n| ≤ ε'], decoys: ['n ≥ N', '|a_(n+1) − a_n| ≤ ε'],
      baits: ['a1_cauchy_consecutive'],
    },
  },
  {
    id: 'deriv', name: 'f est dérivable en x₀', frame: 'Soit I un intervalle ouvert, f : I → ℝ et x₀ ∈ I. On dit que f est dérivable en x₀ si :',
    blocks: ['la limite lim_{h→0} (f(x₀ + h) − f(x₀))/h', 'existe et est finie ; on la note f′(x₀).'],
    decoys: [
      { html: 'f est continue en x₀.', rule: 'a1_corner_missed', why: 'Continue ne suffit pas : |x| est continue en 0, mais pas dérivable (point anguleux).' },
      { html: 'la limite lim_{x→x₀} f′(x) existe.', rule: 'a1_derivable_from_formula', why: 'f′(x₀) se définit par le taux d\'accroissement en x₀, pas par la limite de f′(x).' },
    ],
    hint: 'Le taux d\'accroissement (f(x₀ + h) − f(x₀))/h, et ce qu\'on demande à sa limite.',
  },
  {
    id: 'c1', name: 'f ∈ C¹(I)', frame: 'Soit I un intervalle ouvert et f : I → ℝ. On dit que f ∈ C¹(I) si :',
    blocks: ['f est dérivable en tout point de I,', 'et la fonction f′ : I → ℝ est continue sur I.'],
    decoys: [
      { html: 'et f est continue sur I.', rule: 'a1_c1_def_missing_cont', why: 'C\'est f′ qui doit être continue ; f l\'est déjà, puisqu\'elle est dérivable.' },
      { html: 'et f′ est bornée sur I.', rule: 'a1_c1_def_missing_cont', why: 'Bornée ne suffit pas : x²·sin(1/x) a une dérivée bornée près de 0, mais pas continue en 0.' },
    ],
    hint: 'Deux conditions : une sur f, une sur sa dérivée.',
  },
  {
    id: 'series', name: 'la série Σ aₙ converge', frame: 'Soit (aₙ) une suite réelle et sₙ = a₀ + a₁ + … + aₙ. On dit que la série Σ aₙ converge si :',
    blocks: ['la suite des sommes partielles (sₙ)', 'converge vers un réel S ; on note S = Σ aₙ.'],
    decoys: [
      { html: 'la suite (aₙ) tend vers 0.', rule: 'a1_series_term_to_zero', why: 'aₙ → 0 est nécessaire, pas suffisant : 1/n → 0 et Σ 1/n diverge.' },
      { html: 'la suite (aₙ) converge.', rule: 'a1_series_term_to_zero', why: 'C\'est la suite des sommes partielles qui doit converger, pas celle des termes.' },
      { html: 'la suite (sₙ) est bornée.', rule: 'a1_bounded_implies_convergent', why: 'Bornée ne suffit pas : Σ (−1)ⁿ a des sommes partielles bornées (1, 0, 1, …) et diverge.' },
    ],
    hint: 'Une série, c\'est la suite de ses sommes partielles.',
  },
  {
    id: 'abs', name: 'la série Σ aₙ converge absolument', frame: 'Soit (aₙ) une suite réelle. On dit que la série Σ aₙ converge absolument si :',
    blocks: ['la série Σ |aₙ|', 'converge.'],
    decoys: [
      { html: 'la série Σ aₙ', rule: 'a1_abs_conv_confused', why: 'Absolument : c\'est la série des valeurs absolues qui converge.' },
      { html: 'la suite (|aₙ|)', rule: 'a1_series_term_to_zero', why: 'C\'est la série Σ |aₙ|, pas la suite des |aₙ|.' },
    ],
    hint: 'Absolument : avec des valeurs absolues.',
  },
  {
    id: 'improper', name: '∫ₐ^(+∞) f(x) dx converge', frame: 'Soit f : [a ; +∞[ → ℝ continue. On dit que l\'intégrale ∫ₐ^(+∞) f(x) dx converge si :',
    blocks: ['la limite lim_{b→+∞} ∫ₐᵇ f(x) dx', 'existe et est finie.'],
    decoys: [
      { html: 'f(x) → 0 quand x → +∞.', rule: 'a1_improper_lim_zero_converges', why: '1/x → 0, et pourtant ∫₁^(+∞) dx/x = +∞.' },
      { html: 'f est bornée sur [a ; +∞[.', rule: 'a1_improper_lim_zero_converges', why: 'Bornée ne suffit pas : ∫₁^(+∞) 1 dx = +∞.' },
    ],
    hint: 'Une intégrale généralisée est la limite d\'intégrales ordinaires.',
  },
  {
    id: 'dl', name: 'f admet un DL(n) en x₀', frame: 'Soit f définie autour de x₀ et n ∈ ℕ. On dit que f admet un développement limité d\'ordre n en x₀ si :',
    blocks: ['il existe des réels a₀, a₁, …, aₙ et une fonction ε(x) → 0 quand x → x₀', 'tels que f(x) = a₀ + a₁(x − x₀) + … + aₙ(x − x₀)ⁿ + (x − x₀)ⁿ·ε(x).'],
    decoys: [
      { html: 'tels que f(x) = a₀ + a₁(x − x₀) + … + aₙ(x − x₀)ⁿ + (x − x₀)ⁿ⁻¹·ε(x).', rule: 'a1_dl_remainder_wrong_order', why: 'Le reste est à l\'ordre n : (x − x₀)ⁿ·ε(x). Avec (x − x₀)ⁿ⁻¹, le terme en (x − x₀)ⁿ ne dirait rien.' },
      { html: 'tels que f(x) = a₀ + a₁(x − x₀) + … + aₙ(x − x₀)ⁿ.', rule: 'a1_dl_remainder_wrong_order', why: 'Sans reste, f serait un polynôme : il faut le reste (x − x₀)ⁿ·ε(x).' },
    ],
    hint: 'Un polynôme de degré n en (x − x₀), plus un reste d\'ordre n.',
  },
];
const DEF_BY = Object.fromEntries(DEFS.map((d) => [d.id, d]));
const liveDecoys = (D) => D.decoys.filter(live);
// Definitions with at least `k` decoys whose trap exists.
const pool = (k) => DEFS.filter((D) => liveDecoys(D).length >= k);

// ---------- blocks ----------

function defBlocks(level, rng, D, { noHints = false, exam = false } = {}) {
  const ids = D.blocks.map((_, i) => `b${i}`);
  const blocks = D.blocks.map((html, i) => ({ id: ids[i], html, needs: i ? [ids[i - 1]] : [], earlyWhy: i ? 'Pas encore : cette condition suit la précédente.' : undefined }));
  const decoys = rng.shuffle(liveDecoys(D));
  const n = blocks.length;
  // The scale: L1 the last block, L2 the last two, L3 and more all of them.
  let placed = [];
  let nDecoys = Math.min(decoys.length, level >= 4 ? 4 : 2);
  if (level === 1) placed = ids.slice(0, n - 1);
  if (level === 2) placed = ids.slice(0, Math.max(0, n - 2));
  if (level === 2) nDecoys = Math.min(decoys.length, 2);
  const order = ids.filter((id) => !placed.includes(id));
  const used = decoys.slice(0, nDecoys).map((d, i) => ({ id: `x${i}`, html: d.html, needs: [], distractor: d.rule, why: d.why }));
  const all = D.blocks.join(' ');
  return blocksItem({
    skill: SK, level, mode: 'define',
    prompt: `Construis la définition de « ${D.name} »${placed.length ? ` : le début est placé, touche ${order.length === 1 ? 'le bloc qui manque' : 'les blocs qui manquent'}` : ' : touche les blocs dans l\'ordre'}.<br>${D.frame}`,
    blocks: rng.shuffle([...blocks, ...used]), goal: order[order.length - 1], order, placed,
    hints: H(D.hint, `${D.blocks[0]} …`, all),
    noHints: noHints || level === 5, exam,
    subgoals: SUB,
    solution: D.blocks.map((html) => ({ html, note: '' })),
    key: `${D.id}:${level}:${nDecoys}`, expectedSec: 30 + 20 * order.length,
  });
}

// ---------- tokens ----------

function defTokens(level, rng, D, { noHints = false, exam = false } = {}) {
  const F = D.formula;
  const pieces = [...F.pieces, ...F.decoys].map((text) => ({ text }));
  const cfg = { pieces };
  return tokensItem({
    skill: SK, level,
    prompt: `Écris avec des quantificateurs la définition de « ${D.name} ».<br>${D.frame}`,
    pieces, palette: rng.shuffle(pieces.map((p) => p.text)), target: F.target, start: F.target,
    hints: H(D.hint, `${F.target.split(/[,∧]/)[0]} …`, FM(F.target, cfg)),
    noHints: noHints || level === 5, exam,
    baits: ['g9_quant_order', ...(F.baits || [])],
    solution: [{ html: FM(F.target, cfg), note: D.name }],
    key: `${D.id}:${level}`, expectedSec: 90,
  });
}

function defOne(level, rng, D, o = {}) {
  if (level >= 4 && D.formula && (o.tokens ?? rng.chance(0.6))) return defTokens(level, rng, D, o);
  return defBlocks(Math.min(level, 4), rng, D, o);
}

// ---------- problems: three definitions (L5), one definition (open) ----------

function defProblem(level, rng, exam) {
  const n = exam ? 1 : 3;
  const chosen = rng.shuffle(pool(2)).slice(0, n);
  const parts = chosen.map((D) => {
    const it = defOne(4, rng, D, { noHints: true });
    // One point for a definition in two blocks, two for a formula.
    const points = it.type === 'tokens' || D.blocks.length > 2 ? 2 : 1;
    return { item: { ...it, level }, points, title: `Définition : ${D.name}` };
  });
  return problemItem({
    skill: SK, level,
    prompt: n === 1 ? `Donne la définition précise de : « ${chosen[0].name} ».` : 'Donne la définition précise de chacune de ces trois notions.',
    parts, key: `${chosen.map((D) => D.id).join('+')}:${level}`, exam: exam ? { format: 'open', points: parts.reduce((s, p) => s + p.points, 0) } : false,
    expectedSec: 120 * n + 60,
  });
}

// ---------- true or false ----------

function defTf(rng) {
  const exam = { format: 'tf', points: 1 };
  const kind = rng.pick(['cauchyShift', 'necessary', 'termZero', 'absImplies', 'convNotAbs', 'derivCont', 'contDeriv', 'boundedCauchy', 'cauchyConv']);
  const seq = (o) => ({ kind: 'sequence', v: 'n', from: 1, seqs: ['a'], ask: [{ v: 'a', label: 'aₙ =', keys: ['calc', 'seq'] }], ...o });
  switch (kind) {
    case 'cauchyShift':
      return tfItem({
        skill: SK, level: 4, statement: 'Si aₙ₊₁ − aₙ → 0, alors (aₙ) est une suite de Cauchy.', truth: false, key: kind, exam,
        counter: seq({ hyp: [{ p: 'toZero', of: 'a_(n+1)-a', say: 'aₙ₊₁ − aₙ → 0' }], concl: { p: 'converges', say: '(aₙ) converge (dans ℝ, de Cauchy ⇔ convergente)' }, answer: { a: 'ln(n)' } }),
        ruleIfTrue: 'a1_cauchy_consecutive',
        explanation: 'Faux : aₙ = Log n vérifie aₙ₊₁ − aₙ = Log(1 + 1/n) → 0, mais Log n → +∞ ; dans ℝ, une suite de Cauchy converge.',
      });
    case 'necessary':
      return tfItem({ skill: SK, level: 4, statement: 'Si la série Σ aₙ converge, alors aₙ → 0.', truth: true, key: kind, exam,
        explanation: 'Vrai : aₙ = sₙ − sₙ₋₁ → S − S = 0. La réciproque est fausse (Σ 1/n).' });
    case 'termZero':
      return tfItem({
        skill: SK, level: 4, statement: 'Si aₙ → 0, alors la série Σ aₙ converge.', truth: false, key: kind, exam,
        counter: seq({ hyp: [{ p: 'toZero', say: 'aₙ → 0' }], concl: { p: 'seriesConverges', say: 'Σ aₙ converge' }, answer: { a: '1/n' } }),
        ...(RULE_BY_ID.a1_series_term_to_zero ? { ruleIfTrue: 'a1_series_term_to_zero' } : {}),
        explanation: 'Faux : 1/n → 0 et la série harmonique Σ 1/n diverge.',
      });
    case 'absImplies':
      return tfItem({ skill: SK, level: 4, statement: 'Si Σ |aₙ| converge, alors Σ aₙ converge.', truth: true, key: kind, exam,
        explanation: 'Vrai : une série absolument convergente converge (critère de Cauchy, |aₘ + … + aₙ| ≤ |aₘ| + … + |aₙ|).' });
    case 'convNotAbs':
      return tfItem({
        skill: SK, level: 4, statement: 'Si Σ aₙ converge, alors Σ aₙ converge absolument.', truth: false, key: kind, exam,
        counter: seq({ hyp: [{ p: 'seriesConverges', say: 'Σ aₙ converge' }], concl: { p: 'absConverges', say: 'Σ |aₙ| converge' }, answer: { a: '(-1)^n/n' } }),
        ...(RULE_BY_ID.a1_abs_conv_confused ? { ruleIfTrue: 'a1_abs_conv_confused' } : {}),
        explanation: 'Faux : Σ (−1)ⁿ/n converge (Leibniz), mais Σ 1/n diverge.',
      });
    case 'derivCont':
      return tfItem({ skill: SK, level: 4, statement: 'Si f est dérivable en x₀, alors f est continue en x₀.', truth: true, key: kind, exam,
        explanation: 'Vrai : f(x₀ + h) − f(x₀) = h·(f(x₀ + h) − f(x₀))/h → 0·f′(x₀) = 0.' });
    case 'contDeriv':
      return tfItem({
        skill: SK, level: 4, statement: 'Si f est continue en 0, alors f est dérivable en 0.', truth: false, key: kind, exam,
        counter: { kind: 'function', v: 'x', funcs: ['f'], hyp: [{ p: 'continuousAt', at: '0', say: 'f continue en 0' }], concl: { p: 'differentiableAt', at: '0', say: 'f dérivable en 0' }, ask: [{ v: 'f', label: 'f(x) =', keys: ['calc'] }], answer: { f: 'abs(x)' } },
        ruleIfTrue: 'a1_corner_missed',
        explanation: 'Faux : |x| est continue en 0, mais ses dérivées à gauche (−1) et à droite (1) diffèrent.',
      });
    case 'boundedCauchy':
      return tfItem({
        skill: SK, level: 4, statement: 'Toute suite bornée est une suite de Cauchy.', truth: false, key: kind, exam,
        counter: seq({ hyp: [{ p: 'bounded', say: '(aₙ) bornée' }], concl: { p: 'converges', say: '(aₙ) converge (de Cauchy dans ℝ)' }, answer: { a: '(-1)^n' } }),
        explanation: 'Faux : (−1)ⁿ est bornée, mais |aₙ₊₁ − aₙ| = 2 pour tout n : elle n\'est pas de Cauchy.',
      });
    default:
      return tfItem({ skill: SK, level: 4, statement: 'Toute suite réelle convergente est une suite de Cauchy.', truth: true, key: kind, exam,
        explanation: 'Vrai : si aₙ → ℓ, |aₘ − aₙ| ≤ |aₘ − ℓ| + |ℓ − aₙ| ≤ 2ε dès que m, n ≥ N.' });
  }
}

export function defsItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return defTf(rng);
  if (opts.exam === 'open') return defProblem(4, rng, true);
  if (level === 5) return defProblem(5, rng, false);
  const D = rng.pick(pool(level >= 3 ? 2 : 1));
  return defOne(level, rng, D);
}

export { DEF_BY };
