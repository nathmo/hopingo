// Module A1, part f (unit `analyse1`, step U4): sup, inf and sequences (definitions, limits).
// Catalogue: docs/universite/A1-analyse-1.md. Skills: a1-sup-inf, a1-sup-proof, a1-seq-eps-n-def, a1-seq-eps-n, a1-seq-limits.

const S = (id, rest) => ({ id, unit: 'analyse1', year: 13, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('a1-sup-inf', {
    prereqs: ['g9-intervals', 'g3-arc-def', 'g1-sign-table'], icon: 'inf, sup', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Inf, Sup, Min, Max d\'un ensemble défini par une fonction',
    desc: 'Réécrire A en intervalles en x, puis lire ses bornes.',
    prereqWhy: { 'g9-intervals': 'écrire l\'ensemble en intervalles' },
    intro: {
      rule: 'On réécrit l\'ensemble comme une réunion d\'intervalles <b>en x</b>, en appliquant aux inégalités une fonction strictement monotone sur le bon domaine. Ensuite seulement, on lit Inf, Sup, Min et Max. L\'Inf et le Sup portent sur les éléments x, pas sur les valeurs f(x). Un Min est un Inf qui appartient à A.',
      lines: [
        { html: 'A = {x > 0 : Log(x) < 2}', note: 'Ensemble défini par une fonction', noEq: true },
        { html: 'Log(x) < 2 ⇔ x < e²', note: 'exp est croissante', noEq: true },
        { html: 'A = ]0 ; e²[', note: 'Écrire en intervalles', noEq: true },
        { html: 'Inf A = 0, pas de Min ; Sup A = e², pas de Max', note: '0 ∉ A et e² ∉ A', noEq: true },
      ],
    },
  }),
  S('a1-sup-proof', {
    prereqs: ['a1-sup-inf', 'g9-quant-write'], icon: 's = sup A', examWeight: 1, exam: ['open', 'tf'], tags: ['GM'],
    title: 'Prouver que s = Sup A',
    desc: 's majore A, et pour tout ε > 0, un x ∈ A dépasse s − ε.',
    prereqWhy: { 'a1-sup-inf': 'savoir ce que sont un majorant et le Sup' },
    intro: {
      rule: 's = Sup A ⇔ (1) s est un majorant de A, et (2) pour tout ε > 0, il existe x ∈ A tel que x > s − ε. On montre (1), puis on <b>construit</b> x en fonction de ε. Le max(… ; …) garde x dans A quand ε est grand.',
      lines: [
        { html: 'A = ]1 ; 5[, s = 5 : pour tout x ∈ A, x < 5', note: '5 est un majorant', noEq: true },
        { html: 'Soit ε > 0. Posons x = max(5 − ε/2 ; 3).', note: 'Construire x(ε)', noEq: true },
        { html: 'x ∈ ]1 ; 5[ et x ≥ 5 − ε/2 > 5 − ε', note: 'Vérifier', noEq: true },
        { html: 'Aucun nombre < 5 ne majore A : 5 = Sup A', note: 'Conclure', noEq: true },
      ],
    },
  }),
  S('a1-seq-eps-n-def', {
    prereqs: ['g9-quant-write'], icon: '∀ε ∃N', examWeight: 1, exam: ['open', 'tf'],
    title: 'Écrire la définition ε-N de la limite d\'une suite',
    desc: '∀ε > 0 ∃N ∈ ℕ ∀n ≥ N : |aₙ − L| ≤ ε.',
    prereqWhy: { 'g9-quant-write': 'écrire une définition avec des quantificateurs dans le bon ordre' },
    intro: {
      rule: 'lim aₙ = L ⇔ ∀ε > 0 ∃N ∈ ℕ ∀n ≥ N : |aₙ − L| ≤ ε. On te donne ε d\'abord ; N dépend de ε, <b>jamais de n</b>. Pour lim aₙ = +∞ : ∀M > 0 ∃N ∈ ℕ ∀n ≥ N : aₙ ≥ M.',
      lines: [
        { html: '∀ε > 0', note: 'Quantifier ε', noEq: true },
        { html: '∃N ∈ ℕ', note: 'N dépend de ε', noEq: true },
        { html: '∀n ≥ N', note: 'Pour tous les rangs suivants', noEq: true },
        { html: '|aₙ − L| ≤ ε', note: 'L\'écart', noEq: true },
      ],
    },
  }),
  S('a1-seq-eps-n', {
    prereqs: ['a1-seq-eps-n-def', 'g1-bound'], icon: 'N(ε)', examWeight: 1, exam: ['open', 'tf'],
    title: 'Trouver N(ε) pour une limite de suite',
    desc: 'Simplifier |aₙ − L|, le majorer simplement, résoudre en n.',
    prereqWhy: { 'a1-seq-eps-n-def': 'la définition ε-N dit ce qu\'il faut prouver' },
    intro: {
      rule: 'On simplifie |aₙ − L|, on le <b>majore</b> par une expression simple qui tend vers 0 (c/n, c/n²), puis on résout « majorant ≤ ε » en n. Tout N plus grand convient aussi.',
      lines: [
        { html: 'aₙ = (3n + 1)/(n + 2), L = 3 : |aₙ − 3| = |3n + 1 − 3n − 6|/(n + 2)', note: 'Réduire au même dénominateur', noEq: true },
        { html: '= 5/(n + 2) ≤ 5/n', note: 'Simplifier, puis majorer', noEq: true },
        { html: '5/n ≤ ε ⇔ n ≥ 5/ε', note: 'Résoudre en n', noEq: true },
        { html: 'N(ε) = 5/ε : pour n ≥ N, |aₙ − 3| ≤ ε', note: 'Conclure', noEq: true },
      ],
    },
  }),
  S('a1-seq-limits', {
    prereqs: ['rat-simplify', 'g2-log-rules'], icon: 'lim aₙ', examWeight: 3, exam: ['mcq', 'tf'],
    title: 'Limites de suites : opérations et formes indéterminées',
    desc: 'Terme dominant, quantité conjuguée, croissances comparées.',
    prereqWhy: { 'g2-log-rules': 'croissances comparées de ln n, nᵃ et qⁿ, et uᵛ = e^(v·ln u)' },
    intro: {
      rule: 'On reconnaît la forme (∞/∞, ∞ − ∞, 0·∞), puis on lève l\'indétermination : mettre en facteur le terme dominant, multiplier par la quantité conjuguée, ou comparer les croissances (ln n ≪ nᵃ ≪ qⁿ ≪ n! ≪ nⁿ).',
      lines: [
        { cas: '(2n^3-n)/(5n^3+7)', note: '∞/∞', noEq: true },
        { cas: '(2-1/n^2)/(5+7/n^3)', note: 'Diviser en haut et en bas par n³' },
        { cas: '2/5', note: 'Passer à la limite' },
      ],
    },
  }),
];
