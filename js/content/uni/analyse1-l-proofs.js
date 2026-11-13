// Generators of module A1, part l (step U4): a1-proofs, short proofs of
// the exam. Catalogue: docs/universite/A1-analyse-1.md, `a1-proofs`.
//
// Blocks in order (`mode:'order'`): each block needs the ones it relies
// on; a « theorem » block needs the block that checks its hypotheses
// before the conclusion. Templates: (a) (bₙ) convergent ⇒ Σ bₙ/nᵖ
// converges; (b) f(a) = c > 0 and f′ ≤ −k ⇒ f vanishes on ]a ; b[ (TAF
// then TVI); (c) Σ |aₙ| convergent ⇒ a₂ₙ + … + a₃ₙ → 0; (d) Σ |aₙ|
// convergent ⇒ Σ (−1)ⁿaₙe^(aₙ) converges absolutely.
// The scale: L1 the frame placed, the last two blocks to choose (one decoy
// each); L2 all the blocks, no decoy; L3 two decoys; L4 four decoys and a
// typed input (the bound M/nᵖ, the value of the bound, an index, e); L5
// and the `open` variant: a problem, one part per stage of the proof with
// the points of the catalogue.
// Decoys may carry the traps of other skills (a1_series_term_to_zero,
// a1_ivt_no_continuity, a1_abs_conv_confused, a1_sum_n_terms_as_one); a
// decoy is offered only if its trap exists (RULE_BY_ID).

import { RULE_BY_ID } from '../../math/malrules.js';
import { Q } from '../../math/rational.js';
import { blocksItem } from './kit.js';
import { problemItem } from './kit-problem.js';
import { sup } from './analyse1-e-kit.js';
import { t } from '../../i18n.js';

const SK = 'a1-proofs';
const live = (d) => !!RULE_BY_ID[d.rule];
const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];

// A proof: statement, blocks [{id, html, needs, input?, sub?}], decoys,
// stages [{title, ids, points}] for the problem, hints.
function proofA(rng) {
  const p = rng.pick([2, 3]);
  const np = `n${sup(`^${p}`)}`;
  return {
    id: `a${p}`, statement: t('Soit (bₙ) une suite convergente. Montrer que la série Σ bₙ/{np} converge.', { np }),
    blocks: [
      { id: 'h', html: t('(bₙ) converge, donc elle est bornée : il existe M > 0 tel que |bₙ| ≤ M pour tout n.'), needs: [], sub: 'a1-seq-monotone' },
      { id: 'maj', html: t('Donc |bₙ/{np}| ≤ M/{np} pour tout n ≥ 1.', { np }), needs: ['h'], sub: 'a1-ser-compare',
        input: { kind: 'expr', vars: ['M', 'n'], domain: { M: [1, 5], n: { int: [1, 9] } }, expect: `M/n^${p}`, ask: `|bₙ/${np}| ≤`, answer: `M/n^${p}` } },
      { id: 'ref', html: t('La série Σ M/{np} converge : série de Riemann avec p = {p} > 1.', { np, p }), needs: ['h'], sub: 'a1-ser-compare' },
      { id: 'crit', html: t('Critère de comparaison (termes positifs) : 0 ≤ |bₙ/{np}| ≤ M/{np} et Σ M/{np} converge, donc Σ |bₙ/{np}| converge.', { np }), needs: ['maj', 'ref'], sub: 'a1-ser-compare' },
      { id: 'concl', html: t('Une série absolument convergente converge : Σ bₙ/{np} converge.', { np }), needs: ['crit'], sub: SK },
    ],
    decoys: [
      { html: t('bₙ/{np} → 0, donc la série Σ bₙ/{np} converge.', { np }), rule: 'a1_series_term_to_zero', why: t('uₙ → 0 est nécessaire, pas suffisant : 1/n → 0 et Σ 1/n diverge.') },
      { html: t('bₙ → ℓ, donc bₙ/{np} ~ ℓ/{np}, et Σ ℓ/{np} converge.', { np }), rule: 'a1_equiv_zero_limit', why: t('Si ℓ = 0, ℓ/{np} = 0 n\'est équivalent à rien : passe par la borne |bₙ| ≤ M.', { np }) },
      { html: t('bₙ ≤ M, donc bₙ/{np} ≤ M/{np}, donc Σ bₙ/{np} converge.', { np }), rule: 'a1_compare_wrong_direction', why: t('Sans valeur absolue, une majoration ne dit rien : bₙ peut être très négatif. Compare |bₙ/nᵖ|.') },
      { html: t('Avec bₙ = 1 : Σ 1/{np} converge, donc c\'est vrai pour toute suite convergente.', { np }), rule: 'g9_proof_by_example', why: t('Un exemple ne prouve pas un énoncé pour toutes les suites.') },
      { html: t('Pour tout n, il existe Mₙ > 0 tel que |bₙ| ≤ Mₙ.'), rule: 'g9_quant_order', why: t('Il faut une seule borne M pour tous les n : ∃M ∀n, pas ∀n ∃Mₙ.') },
    ],
    stages: [
      { title: t('Traduire l\'hypothèse : (bₙ) est bornée'), ids: ['h'], points: 1, decoys: [4, 1] },
      { title: t('Majorer |bₙ/nᵖ|'), ids: ['maj'], points: 1, decoys: [2] },
      { title: t('Énoncer et appliquer le critère de comparaison'), ids: ['ref', 'crit'], points: 1.5, decoys: [3, 1] },
      { title: t('Conclure'), ids: ['concl'], points: 0.5, decoys: [0] },
    ],
    hints: H(t('Qu\'est-ce qu\'une suite convergente a toujours ? Elle est bornée.'), `|bₙ/${np}| ≤ ▢/${np}`, t('Comparaison : |bₙ/{np}| ≤ M/{np}, et Σ M/{np} converge (p = {p} > 1).', { np, p })),
  };
}

function proofB(rng) {
  for (;;) {
    const a = rng.int(0, 2);
    const L = rng.int(1, 4);
    const b = a + L;
    const k = rng.int(1, 4);
    const c = rng.int(1, 9);
    const end = c - k * L;
    if (end >= 0 || end < -9) continue;
    // The example of g9_proof_by_example: f(x) = c − k(x − a), zero a + c/k.
    const ex = `${c} − ${k === 1 ? '' : k}${a === 0 ? 'x' : `(x − ${a})`}`;
    const zq = new Q(a * k + c, k);
    const zero = zq.d === 1 ? String(zq.n) : `${zq.n}/${zq.d}`;
    return {
      id: `b${a}${b}${k}${c}`, statement: t('Soit f : [{a} ; {b}] → ℝ continue, dérivable sur ]{a} ; {b}[, avec f({a}) = {c} et f′(x) ≤ −{k} pour tout x ∈ ]{a} ; {b}[. Montrer que f s\'annule sur ]{a} ; {b}[.', { a, b, c, k }),
      blocks: [
        { id: 'h', html: t('f est continue sur [{a} ; {b}] et dérivable sur ]{a} ; {b}[ : les hypothèses du théorème des accroissements finis sont vérifiées.', { a, b }), needs: [], sub: 'a1-mvt' },
        { id: 'taf', html: t('TAF : il existe ξ ∈ ]{a} ; {b}[ tel que f({b}) − f({a}) = f′(ξ)·({b} − {a}).', { a, b }), needs: ['h'], sub: 'a1-mvt' },
        { id: 'bound', html: t('Comme f′(ξ) ≤ −{k} : f({b}) = {c} + {L}·f′(ξ) ≤ {c} − {kL} = −{m} < 0.', { k, b, c, L, kL: k * L, m: -end }), needs: ['taf'], sub: 'a1-mvt',
          input: { kind: 'expr', vars: [], expect: String(end), ask: `f(${b}) ≤`, answer: String(end) } },
        { id: 'tvi', html: t('TVI : si g est continue sur [α ; β] et si g(α) et g(β) sont de signes opposés, alors g s\'annule sur ]α ; β[.'), needs: [], sub: 'a1-fn-ivt' },
        { id: 'check', html: t('Ici f est continue sur [{a} ; {b}], f({a}) = {c} > 0 et f({b}) < 0 : les hypothèses du TVI sont vérifiées.', { a, b, c }), needs: ['h', 'bound', 'tvi'], sub: 'a1-fn-ivt' },
        { id: 'concl', html: t('Donc il existe x₀ ∈ ]{a} ; {b}[ tel que f(x₀) = 0.', { a, b }), needs: ['check'], sub: SK },
      ],
      decoys: [
        { html: t('f({a}) > 0 et f′ < 0, donc f décroît et finit par s\'annuler.', { a }), rule: 'a1_ivt_no_continuity', why: t('Décroître ne suffit pas à atteindre 0 : il faut f(b) < 0, puis la continuité (TVI).') },
        { html: t('f′ ≤ −{k}, donc f({b}) ≤ −{k}.', { k, b }), rule: 'a1_mvt_endpoints_values', why: t('Le TAF relie f(b) − f(a) à f′(ξ)·(b − a) : f(b) ≤ f(a) − k(b − a).') },
        { html: t('Par Rolle, il existe ξ ∈ ]{a} ; {b}[ tel que f′(ξ) = 0.', { a, b }), rule: 'a1_rolle_without_hyp', why: t('Rolle demande f(a) = f(b), qui n\'est pas donné ; et ici f′ ≤ −k < 0 partout.') },
        { html: t('Avec f(x) = {ex}, f s\'annule en x = {zero} : c\'est vrai.', { ex, zero }), rule: 'g9_proof_by_example', why: t('Un exemple de f ne prouve pas l\'énoncé pour toutes les f.') },
        { html: t('Il existe ξ ∈ ]{a} ; {b}[ tel que, pour toute f, f({b}) − f({a}) = f′(ξ)·({b} − {a}).', { a, b }), rule: 'g9_quant_order', why: t('ξ dépend de f : le TAF dit « pour f donnée, il existe ξ ».') },
        { html: t('TVI : il existe x₀ ∈ ]α ; β[ tel que toute g continue sur [α ; β], avec g(α) et g(β) de signes opposés, vérifie g(x₀) = 0.'), rule: 'g9_quant_order', why: t('Le point x₀ dépend de g : « pour toute g, il existe x₀ », pas l\'inverse.') },
      ],
      stages: [
        { title: t('Énoncer le TAF et vérifier ses hypothèses'), ids: ['h', 'taf'], points: 1, decoys: [2] },
        { title: t('Appliquer le TAF : signe de f({b})', { b }), ids: ['bound'], points: 1.5, decoys: [1] },
        { title: t('Énoncer le TVI'), ids: ['tvi'], points: 1, decoys: [5] },
        { title: t('Vérifier les hypothèses du TVI'), ids: ['check'], points: 1, decoys: [0] },
        { title: t('Conclure'), ids: ['concl'], points: 0.5, decoys: [3] },
      ],
      hints: H(t('Montre d\'abord que f({b}) < 0 (TAF), puis applique le TVI entre {a} et {b}.', { a, b }), `f(${b}) − f(${a}) = f′(ξ)·${L} ≤ ▢`, t('f({b}) ≤ {c} − {kL} = −{m} < 0, puis TVI : f continue, f({a}) > 0 > f({b}).', { a, b, c, kL: k * L, m: -end })),
    };
  }
}

function proofC() {
  return {
    id: 'c', statement: t('Soit Σ aₙ une série absolument convergente. Montrer que a₂ₙ + a₂ₙ₊₁ + … + a₃ₙ → 0 quand n → ∞.'),
    blocks: [
      { id: 'h', html: t('Σ |aₖ| converge : ses restes Rₘ = Σ_{k>m} |aₖ| tendent vers 0 quand m → ∞.'), needs: [], sub: 'a1-ser-compare' },
      { id: 'tri', html: t('|a₂ₙ + … + a₃ₙ| ≤ |a₂ₙ| + … + |a₃ₙ| (inégalité triangulaire).'), needs: [], sub: SK },
      { id: 'maj', html: t('|a₂ₙ| + … + |a₃ₙ| ≤ Σ_{k≥2n} |aₖ| = R₂ₙ₋₁ (termes positifs).'), needs: ['tri', 'h'], sub: 'a1-ser-compare',
        input: { kind: 'expr', vars: ['n'], domain: { n: { int: [1, 9] } }, expect: '2n', ask: t('Le reste commence à k ='), answer: '2n' } },
      { id: 'lim', html: t('0 ≤ |a₂ₙ + … + a₃ₙ| ≤ R₂ₙ₋₁ et R₂ₙ₋₁ → 0.'), needs: ['maj'], sub: SK },
      { id: 'concl', html: t('Par les gendarmes, a₂ₙ + … + a₃ₙ → 0.'), needs: ['lim'], sub: SK },
    ],
    decoys: [
      { html: t('Chaque aₖ → 0, donc la somme a₂ₙ + … + a₃ₙ → 0.'), rule: 'a1_sum_n_terms_as_one', why: t('Il y a n + 1 termes : une somme de plus en plus de petits termes peut ne pas tendre vers 0 (n termes égaux à 1/n).') },
      { html: t('Avec aₖ = 1/k², a₂ₙ + … + a₃ₙ ≤ (n + 1)/(4n²) → 0 : c\'est vrai.'), rule: 'g9_proof_by_example', why: t('Un exemple ne prouve pas l\'énoncé pour toutes les séries.') },
      { html: t('a₂ₙ + … + a₃ₙ ≤ Σ aₖ, qui converge, donc a₂ₙ + … + a₃ₙ → 0.'), rule: 'a1_compare_wrong_direction', why: t('Sans valeur absolue, majorer ne dit rien ; et être majoré par une constante ne donne pas une limite nulle.') },
      { html: t('Il existe N tel que, pour tout ε > 0, Rₘ ≤ ε pour m ≥ N.'), rule: 'g9_quant_order', why: t('N dépend de ε : ∀ε ∃N, pas ∃N ∀ε.') },
    ],
    stages: [
      { title: t('Traduire l\'hypothèse : les restes tendent vers 0'), ids: ['h'], points: 1, decoys: [3] },
      { title: t('Majorer par un reste'), ids: ['tri', 'maj'], points: 1, decoys: [2] },
      { title: t('Conclure par les gendarmes'), ids: ['lim', 'concl'], points: 1, decoys: [0, 1] },
    ],
    hints: H(t('Majore la valeur absolue de la somme par un reste de la série Σ |aₖ|.'), '|a₂ₙ + … + a₃ₙ| ≤ Σ_{k ≥ ▢} |aₖ|', t('|a₂ₙ + … + a₃ₙ| ≤ R₂ₙ₋₁ → 0, puis les gendarmes.')),
  };
}

function proofD() {
  return {
    id: 'd', statement: t('Soit Σ aₙ une série absolument convergente. Montrer que Σ (−1)ⁿaₙe^(aₙ) converge absolument.'),
    blocks: [
      { id: 'h', html: t('Σ |aₙ| converge, donc aₙ → 0 (condition nécessaire).'), needs: [], sub: SK },
      { id: 'rank', html: t('Il existe N tel que |aₙ| ≤ 1 pour n ≥ N ; alors e^(aₙ) ≤ e.'), needs: ['h'], sub: SK,
        input: { kind: 'expr', vars: [], expect: 'e', ask: t('Pour n ≥ N, e^(aₙ) ≤'), answer: 'e' } },
      { id: 'maj', html: t('Pour n ≥ N : |(−1)ⁿaₙe^(aₙ)| = |aₙ|·e^(aₙ) ≤ e·|aₙ|.'), needs: ['rank'], sub: 'a1-ser-compare' },
      { id: 'crit', html: t('Σ e·|aₙ| converge ; par le critère de comparaison (termes positifs, à partir du rang N), Σ |(−1)ⁿaₙe^(aₙ)| converge.'), needs: ['maj', 'h'], sub: 'a1-ser-compare' },
      { id: 'concl', html: t('Donc Σ (−1)ⁿaₙe^(aₙ) converge absolument.'), needs: ['crit'], sub: SK },
    ],
    decoys: [
      { html: t('La série est alternée, donc elle converge absolument par Leibniz.'), rule: 'a1_abs_conv_confused', why: t('Leibniz donne la convergence, jamais la convergence absolue ; et aₙ peut changer de signe.') },
      { html: t('aₙe^(aₙ) ≤ e·aₙ, donc la série converge.'), rule: 'a1_compare_wrong_direction', why: t('Sans valeur absolue, la comparaison ne dit rien : il faut |aₙe^(aₙ)| ≤ e|aₙ|.') },
      { html: t('Avec aₙ = 1/n², la série converge : c\'est vrai.'), rule: 'g9_proof_by_example', why: t('Un exemple ne prouve pas l\'énoncé pour toutes les séries.') },
      { html: t('Pour tout n, il existe Nₙ tel que |aₙ| ≤ 1.'), rule: 'g9_quant_order', why: t('Il faut un seul rang N pour tous les n ≥ N.') },
    ],
    stages: [
      { title: t('Traduire l\'hypothèse : aₙ → 0, donc e^(aₙ) ≤ e'), ids: ['h', 'rank'], points: 1, decoys: [3] },
      { title: t('Majorer'), ids: ['maj'], points: 1, decoys: [1] },
      { title: t('Critère de comparaison et conclusion'), ids: ['crit', 'concl'], points: 1, decoys: [0, 2] },
    ],
    hints: H(t('aₙ → 0 : à partir d\'un rang, e^(aₙ) est borné.'), '|(−1)ⁿaₙe^(aₙ)| ≤ ▢·|aₙ|', t('Pour n ≥ N, |(−1)ⁿaₙe^(aₙ)| ≤ e·|aₙ|, et Σ e|aₙ| converge.')),
  };
}

const PROOFS = [proofA, proofB, proofC, proofD];

// One proof in blocks at levels 1–4.
function proofBlocks(level, rng, P) {
  const ids = P.blocks.map((b) => b.id);
  const decoys = rng.shuffle(P.decoys.filter(live));
  let placed = [];
  let nDecoys = { 1: 2, 2: 0, 3: 2, 4: 4 }[level];
  if (level === 1) placed = ids.slice(0, ids.length - 2);
  nDecoys = Math.min(nDecoys, decoys.length);
  const order = ids.filter((id) => !placed.includes(id));
  const blocks = P.blocks.map((b) => ({
    id: b.id, html: b.html, needs: b.needs,
    earlyWhy: t('Pas encore : ce bloc s\'appuie sur un bloc qui n\'est pas encore placé (une hypothèse à vérifier d\'abord).'),
    ...(level === 4 && b.input ? { input: b.input } : {}),
  }));
  const used = decoys.slice(0, nDecoys).map((d, i) => ({ id: `x${i}`, html: d.html, needs: [], distractor: d.rule, why: d.why }));
  return blocksItem({
    skill: SK, level, mode: 'order',
    prompt: `${P.statement} ${placed.length ? t('Le début de la preuve est placé : touche les blocs qui suivent.') : t('Touche les blocs de la preuve dans l\'ordre.')}${level === 4 ? ` ${t('Un bloc demande un calcul.')}` : ''}`,
    blocks: rng.shuffle([...blocks, ...used]), goal: order[order.length - 1], order, placed,
    hints: P.hints,
    subgoals: subgoalsOf(P),
    solution: P.blocks.map((b) => ({ html: b.html, note: '' })),
    key: `${P.id}:${level}`, expectedSec: 40 + 25 * order.length,
  });
}
function subgoalsOf(P) {
  const LABEL = { 'a1-ser-compare': t('majorer, comparer'), 'a1-mvt': t('TAF'), 'a1-fn-ivt': t('TVI'), 'a1-seq-monotone': t('convergente ⇒ bornée'), [SK]: t('conclure') };
  const skills = [...new Set(P.blocks.map((b) => b.sub)), 'g9-proof-contra'];
  return skills.map((s) => ({ id: s, label: s === 'g9-proof-contra' ? t('ordre de la preuve') : LABEL[s], skill: s }));
}

// A proof as a problem: one part per stage, the blocks of the earlier
// stages placed.
function proofParts(rng, P) {
  const done = [];
  return P.stages.map((st, si) => {
    const decoys = st.decoys.map((i) => P.decoys[i]).filter(live);
    // A stage with a single block and no decoy left gets one from the others.
    if (!decoys.length) decoys.push(...P.decoys.filter(live).filter((d) => !st.decoys.includes(P.decoys.indexOf(d))).slice(0, 1));
    const blocks = P.blocks.filter((b) => done.includes(b.id) || st.ids.includes(b.id)).map((b) => ({
      id: b.id, html: b.html, needs: b.needs.filter((n) => done.includes(n) || st.ids.includes(n)),
      earlyWhy: t('Pas encore : ce bloc s\'appuie sur un bloc qui n\'est pas encore placé.'),
      ...(b.input && st.ids.includes(b.id) ? { input: b.input } : {}),
    }));
    const used = decoys.map((d, i) => ({ id: `x${si}${i}`, html: d.html, needs: [], distractor: d.rule, why: d.why }));
    const item = blocksItem({
      skill: SK, level: 5, mode: 'order', prompt: t('{title} :', { title: st.title }),
      blocks: rng.shuffle([...blocks, ...used]), goal: st.ids[st.ids.length - 1], order: st.ids, placed: [...done],
      hints: [], noHints: true, subgoals: subgoalsOf(P),
      solution: st.ids.map((id) => ({ html: P.blocks.find((b) => b.id === id).html, note: '' })),
      key: `${P.id}:stage${si}`, expectedSec: 60 + 30 * st.ids.length,
    });
    done.push(...st.ids);
    return { item, points: st.points, title: st.title };
  });
}

function proofProblem(level, rng, exam) {
  const k = rng.int(0, 2);
  let parts;
  let statement;
  let key;
  if (k < 2) {
    const P = PROOFS[k](rng);
    parts = proofParts(rng, P);
    statement = P.statement;
    key = P.id;
  } else {
    // (c) and (d): two proofs, 6 points.
    const C = proofC();
    const D = proofD();
    parts = [...proofParts(rng, C).map((p) => ({ ...p, title: `(a) ${p.title}` })), ...proofParts(rng, D).map((p) => ({ ...p, title: `(b) ${p.title}` }))];
    statement = t('Soit Σ aₙ une série absolument convergente. (a) Montrer que a₂ₙ + … + a₃ₙ → 0. (b) Montrer que Σ (−1)ⁿaₙe^(aₙ) converge absolument.');
    key = 'cd';
  }
  const total = parts.reduce((s, p) => s + p.points, 0);
  return problemItem({
    skill: SK, level, prompt: t('{statement} Si tu utilises un résultat du cours, énonce-le et vérifie ses hypothèses.', { statement }),
    parts, key: `${key}:${level}`, exam: exam ? { format: 'open', points: total } : false,
    expectedSec: 120 * parts.length,
  });
}

export function proofsItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'open') return proofProblem(4, rng, true);
  if (level === 5) return proofProblem(5, rng, false);
  const P = rng.pick(PROOFS)(rng);
  return proofBlocks(level, rng, P);
}
