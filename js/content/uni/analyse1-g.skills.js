// Module A1, part g (unit `analyse1`, step U4): sequences: squeeze, 1^inf forms, ratio, monotone, lim sup.
// Catalogue: docs/universite/A1-analyse-1.md. Skills: a1-seq-squeeze, a1-seq-1inf, a1-seq-ratio, a1-seq-monotone, a1-seq-limsup.

const S = (id, rest) => ({ id, unit: 'analyse1', year: 13, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('a1-seq-squeeze', {
    prereqs: ['a1-seq-limits', 'g1-bound'], icon: 'aₙ ≤ uₙ ≤ bₙ', examWeight: 1, exam: ['mcq', 'tf', 'open'],
    title: 'Gendarmes : trouver les deux bornes',
    desc: 'Minorer et majorer par deux suites de même limite.',
    prereqWhy: { 'a1-seq-limits': 'calculer la limite des deux bornes', 'g1-bound': 'majorer et minorer une fraction ou un Log' },
    intro: {
      rule: 'On minore et on majore aₙ par deux suites <b>qui ont la même limite</b> ℓ : alors aₙ → ℓ. Pour majorer une fraction positive : augmenter le numérateur, diminuer le dénominateur. Dans une somme de n termes, chaque terme est entre le plus petit et le plus grand : il y a <b>n</b> termes. Avec un Log : 2n = Log(e²ⁿ) ≤ Log(e²ⁿ + n²) ≤ Log(2e²ⁿ) = 2n + Log 2.',
      lines: [
        { html: 'Sₙ = Σ_{k=1}^{n} n/(n² + k) : pour 1 ≤ k ≤ n, n/(n² + n) ≤ n/(n² + k) ≤ n/(n² + 1)', note: 'Encadrer un terme', noEq: true },
        { html: 'n²/(n² + n) ≤ Sₙ ≤ n²/(n² + 1)', note: 'Sommer les n termes', noEq: true },
        { html: 'n²/(n² + n) → 1 et n²/(n² + 1) → 1', note: 'Limites des bornes', noEq: true },
        { html: 'lim Sₙ = 1', note: 'Gendarmes', noEq: true },
      ],
    },
  }),
  S('a1-seq-1inf', {
    prereqs: ['a1-seq-limits', 'g2-real-powers'], icon: '1^∞', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Formes 1^∞ : écrire e^(n·Log(…))',
    desc: 'uₙ^(vₙ) = e^(vₙ·Log uₙ), puis Log(1 + h) ≈ h.',
    prereqWhy: { 'a1-seq-limits': 'la limite de l\'exposant', 'g2-real-powers': 'uᵛ = e^(v·Log u)' },
    intro: {
      rule: 'uₙ^(vₙ) = e^(vₙ·Log uₙ). Si uₙ → 1 et vₙ → ∞, c\'est une forme <b>indéterminée</b> (pas 1 !) : on écrit uₙ = 1 + h avec h → 0, et Log(1 + h) = h + h·ε(h). Si l\'exposant tend vers c, alors uₙ^(vₙ) → eᶜ (continuité de exp).',
      lines: [
        { cas: '((n+1)/(n-1))^n', note: 'Base → 1, exposant → ∞', noEq: true },
        { cas: 'e^(n×ln(1+2/(n-1)))', note: 'Forme exponentielle, 1 + h' },
        { html: 'n·Log(1 + 2/(n − 1)) = n·(2/(n − 1))·(1 + ε(n)) → 2', note: 'Log(1 + h) = h + h·ε(h)', noEq: true },
        { cas: 'e^2', note: 'Continuité de exp' },
      ],
    },
  }),
  S('a1-seq-ratio', {
    prereqs: ['a1-seq-limits'], icon: 'aₙ₊₁/aₙ', examWeight: 1, exam: ['tf', 'mcq'],
    title: 'Critère de d\'Alembert pour les suites',
    desc: '|aₙ₊₁/aₙ| → q < 1 : aₙ → 0 ; q > 1 : |aₙ| → +∞.',
    prereqWhy: { 'a1-seq-limits': 'calculer la limite du rapport' },
    intro: {
      rule: 'Si |aₙ₊₁/aₙ| → q < 1, alors aₙ → 0 ; si q > 1, alors |aₙ| → +∞ ; si q = 1, on ne peut rien dire. Bon réflexe devant n!, cⁿ, c^(n²) : dans le rapport, presque tout se simplifie. (n + 1)!/n! = n + 1, mais (2n + 2)!/(2n)! = (2n + 2)(2n + 1).',
      lines: [
        { html: 'aₙ = 3ⁿ·n²/n! : aₙ₊₁/aₙ = 3ⁿ⁺¹(n + 1)²·n!/((n + 1)!·3ⁿ·n²)', note: 'Former le rapport', noEq: true },
        { cas: '3(n+1)/n^2', note: 'Simplifier' },
        { html: '3(n + 1)/n² → 0 < 1', note: 'Limite du rapport', noEq: true },
        { html: 'aₙ → 0', note: 'D\'Alembert', noEq: true },
      ],
    },
  }),
  S('a1-seq-monotone', {
    prereqs: ['a1-seq-limits', 'g5-induction-more', 'a1-ser-geo-tele'], icon: '↗ ≤ M', examWeight: 2, exam: ['tf', 'open'],
    title: 'Suites monotones et bornées ; suites de Cauchy',
    desc: 'Croissante et majorée ⇒ convergente ; bornée ne suffit pas.',
    prereqWhy: {
      'a1-seq-limits': 'calculer la limite une fois la convergence établie',
      'g5-induction-more': 'majorer une suite récurrente par récurrence',
      'a1-ser-geo-tele': 'majorer une somme par une somme télescopique ou géométrique',
    },
    intro: {
      rule: 'Toute suite croissante et majorée converge (vers son Sup) ; décroissante et minorée, elle converge aussi. Dans ℝ, une suite converge si et seulement si elle est de Cauchy. Une suite <b>bornée</b> n\'est pas forcément convergente : (−1)ⁿ.',
      lines: [
        { html: 'uₙ = Σ_{k=1}^{n} 1/k² : uₙ₊₁ − uₙ = 1/(n + 1)² > 0', note: 'Croissante', noEq: true },
        { html: 'uₙ ≤ 1 + Σ_{k=2}^{n} (1/(k − 1) − 1/k) = 2 − 1/n ≤ 2', note: 'Majorée (télescopage)', noEq: true },
        { html: '(uₙ) croissante et majorée par 2 : elle converge, vers ℓ ≤ 2', note: 'Conclure', noEq: true },
      ],
    },
  }),
  S('a1-seq-limsup', {
    prereqs: ['a1-seq-limits'], icon: 'lim sup', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'lim sup, lim inf et sous-suites',
    desc: 'Séparer selon la parité, prendre la plus grande et la plus petite limite.',
    prereqWhy: { 'a1-seq-limits': 'la limite de chaque sous-suite' },
    intro: {
      rule: 'On sépare la suite en sous-suites (n = 2m, n = 2m + 1, ou modulo 4) qui convergent chacune. lim sup = la plus grande de leurs limites, lim inf = la plus petite. La suite converge si et seulement si lim sup = lim inf (finie). Le sup des termes peut être atteint au début : ce n\'est pas la lim sup.',
      lines: [
        { html: 'aₙ = (−1)ⁿ·n/(n + 1) + 1/n', note: 'Le signe dépend de la parité', noEq: true },
        { html: 'a₂ₘ = 2m/(2m + 1) + 1/(2m) → 1', note: 'Sous-suite paire', noEq: true },
        { html: 'a₂ₘ₊₁ = −(2m + 1)/(2m + 2) + 1/(2m + 1) → −1', note: 'Sous-suite impaire', noEq: true },
        { html: 'lim sup aₙ = 1, lim inf aₙ = −1 : la suite diverge', note: 'Conclure', noEq: true },
      ],
    },
  }),
];
