// Module A1, part i (unit `analyse1`, step U4): series: convergence tests.
// Catalogue: docs/universite/A1-analyse-1.md, « Séries numériques ».
// Skills: a1-ser-necessary, a1-ser-compare, a1-ser-ratio-root,
// a1-ser-leibniz-abs, a1-ser-param. Generators: analyse1-i.js (helpers
// in analyse1-i-kit.js, the series with a parameter in analyse1-i-param.js).

const S = (id, rest) => ({ id, unit: 'analyse1', year: 13, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('a1-ser-necessary', {
    prereqs: ['a1-seq-limits'], icon: 'uₙ → 0 ?', examWeight: 1, exam: ['tf'],
    title: 'Condition nécessaire : uₙ → 0',
    desc: 'Si uₙ ne tend pas vers 0, la série diverge ; sinon, il faut un autre critère.',
    prereqWhy: { 'a1-seq-limits': 'calculer la limite du terme général' },
    intro: {
      rule: 'Si Σ uₙ converge, alors uₙ → 0. La réciproque est <b>fausse</b> : Σ 1/n diverge alors que 1/n → 0.<br>Donc : si uₙ ne tend pas vers 0, la série diverge ; si uₙ → 0, on ne sait rien encore, il faut un autre critère.',
      lines: [
        { html: 'Σ n/(2n + 1) : uₙ = n/(2n + 1)', note: 'Le terme général', noEq: true },
        { cas: '1/(2+1/n)', note: 'Diviser en haut et en bas par n' },
        { cas: '1/2', note: 'uₙ → 1/2' },
        { html: '1/2 ≠ 0 : la série diverge', note: 'Condition nécessaire', noEq: true },
      ],
    },
  }),
  S('a1-ser-compare', {
    prereqs: ['a1-seq-limits'], icon: 'aₙ ~ 1/nᵖ', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Critère de comparaison et de la limite du quotient',
    desc: 'Comparer à Σ 1/nᵖ, qui converge si et seulement si p > 1.',
    prereqWhy: { 'a1-seq-limits': 'la limite du quotient aₙ/bₙ' },
    intro: {
      rule: 'Séries à termes positifs. Référence : Σ 1/nᵖ converge si et seulement si <b>p > 1</b>. Si aₙ/bₙ → L ∈ ]0 ; +∞[, les deux séries ont la même nature. Si 0 ≤ aₙ ≤ bₙ et Σ bₙ converge, Σ aₙ converge : on majore par une série <b>convergente</b> (ou on minore par une série divergente).',
      lines: [
        { html: 'Σ (n + 1)/(n³ + 2n) : termes positifs, aₙ ~ n/n³ = 1/n²', note: 'Terme dominant : bₙ = 1/n²', noEq: true },
        { cas: 'n^2×(n+1)/(n^3+2n)', note: 'aₙ/bₙ', noEq: true },
        { cas: '(1+1/n)/(1+2/n^2)', note: 'Diviser par n³' },
        { cas: '1', note: 'L = 1 ∈ ]0 ; +∞[' },
        { html: 'p = 2 > 1 : Σ 1/n² converge, donc la série converge', note: 'Conclure', noEq: true },
      ],
    },
  }),
  S('a1-ser-ratio-root', {
    prereqs: ['a1-seq-ratio', 'a1-seq-1inf', 'a1-ser-necessary'], icon: 'ρ < 1', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Critères de d\'Alembert et de Cauchy pour les séries',
    desc: '|aₙ₊₁/aₙ| → ρ ou ⁿ√|aₙ| → ρ : ρ < 1 converge, ρ > 1 diverge, ρ = 1 ne dit rien.',
    prereqWhy: {
      'a1-seq-ratio': 'former et simplifier aₙ₊₁/aₙ',
      'a1-seq-1inf': 'les limites (1 + 1/n)ⁿ → e',
      'a1-ser-necessary': 'ρ > 1 : le terme général ne tend pas vers 0',
    },
    intro: {
      rule: 'd\'Alembert : |aₙ₊₁/aₙ| → ρ ; Cauchy : ⁿ√|aₙ| → ρ. ρ < 1 : convergence absolue ; ρ > 1 : divergence ; ρ = 1 : <b>aucune conclusion</b>.<br>Des factorielles : d\'Alembert ; une puissance n-ième : Cauchy. Attention, (2n + 2)! = (2n + 2)(2n + 1)·(2n)!.',
      lines: [
        { html: 'Σ 3ⁿ(n!)²/(2n)! : des factorielles, d\'Alembert', note: 'Choisir le critère', noEq: true },
        { cas: '3(n+1)^2/((2n+2)(2n+1))', note: 'aₙ₊₁/aₙ', noEq: true },
        { cas: '3(n+1)/(2(2n+1))', note: 'Simplifier par 2n + 2 = 2(n + 1)' },
        { cas: '3/4', note: 'ρ = 3/4' },
        { html: '3/4 < 1 : la série converge absolument', note: 'Conclure', noEq: true },
      ],
    },
  }),
  S('a1-ser-leibniz-abs', {
    prereqs: ['a1-ser-compare'], icon: 'Σ (−1)ⁿxₙ', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Leibniz, convergence absolue et semi-convergence',
    desc: 'D\'abord Σ |aₙ| ; si elle diverge, Leibniz : xₙ décroissante et → 0.',
    prereqWhy: { 'a1-ser-compare': 'comparer Σ |aₙ| à une série de Riemann' },
    intro: {
      rule: 'On teste d\'abord Σ |aₙ| (comparaison, d\'Alembert). Si elle diverge et que la série est alternée, Leibniz : aₙ = (−1)ⁿxₙ avec xₙ ≥ 0 <b>décroissante</b> et <b>→ 0</b> ⇒ Σ aₙ converge. Converger sans converger absolument : semi-convergente.',
      lines: [
        { html: 'Σ (−1)ⁿ/(√n + 1) : |aₙ| = 1/(√n + 1) ~ 1/√n', note: 'Σ |aₙ| diverge (p = 1/2) : pas absolument', noEq: true },
        { cas: '1/(√n+1)-1/(√(n+1)+1)', note: 'Leibniz : xₙ − xₙ₊₁', noEq: true },
        { cas: '(√(n+1)-√n)/((√n+1)(√(n+1)+1))', note: 'Même dénominateur : ≥ 0, xₙ décroît' },
        { html: 'xₙ = 1/(√n + 1) → 0 : la série converge, pas absolument', note: 'Semi-convergente', noEq: true },
      ],
    },
  }),
  S('a1-ser-param', {
    prereqs: ['a1-ser-ratio-root', 'a1-ser-leibniz-abs', 'g1-sign-table'], icon: 'Σ(λ)', examWeight: 2, exam: ['mcq', 'tf', 'open'],
    title: 'Séries à paramètre : ensemble de convergence',
    desc: 'Le critère en gardant le paramètre, une inéquation, puis les bornes à part.',
    prereqWhy: {
      'a1-ser-ratio-root': 'le critère appliqué avec le paramètre',
      'a1-ser-leibniz-abs': 'aux valeurs limites, la série est souvent alternée',
      'g1-sign-table': 'résoudre l\'inéquation du second degré',
    },
    intro: {
      rule: 'On applique le critère adapté <b>en gardant le paramètre</b>, on obtient une inéquation en λ, puis on traite <b>à part</b> les valeurs limites, où le critère ne dit rien. Une géométrique Σ qⁿ converge si et seulement si |q| < 1.',
      lines: [
        { cas: '|λ/(1-λ)|<1', note: 'Σ (λ/(1 − λ))ⁿ : géométrique, |q| < 1', noEq: true },
        { cas: 'λ^2<(1-λ)^2', note: '|A| < |B| ⇔ A² < B²' },
        { cas: '2λ<1', note: 'Développer' },
        { cas: ']-∞ ; 1/2[', note: 'En λ = 1/2, q = 1 : diverge' },
      ],
    },
  }),
];
