// Module A1, part h (unit `analyse1`, step U4): recursive sequences and geometric or telescoping series.
// Catalogue: docs/universite/A1-analyse-1.md. Skills: a1-seq-affine, a1-seq-rec-fixed, a1-seq-rec-study, a1-ser-geo-tele.

const S = (id, rest) => ({ id, unit: 'analyse1', year: 13, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('a1-seq-affine', {
    prereqs: ['g5-geom'], icon: 'qaₙ + c', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Suites aₙ₊₁ = q·aₙ + c : formule explicite',
    desc: 'Le point fixe L, l\'écart aₙ − L géométrique, puis la limite.',
    prereqWhy: { 'g5-geom': 'bₙ = aₙ − L est géométrique : bₙ = qⁿ·b₀' },
    intro: {
      rule: 'Si q ≠ 1, on cherche le point fixe L = qL + c, soit L = c/(1 − q). L\'écart bₙ = aₙ − L vérifie bₙ₊₁ = q·bₙ : il est géométrique, donc <b>aₙ = L + qⁿ·(a₀ − L)</b>. Si |q| < 1, aₙ → L ; si |q| > 1, la suite diverge (sauf si a₀ = L). Si q = 1, aₙ = a₀ + n·c.<br>Le point fixe seul ne dit pas que la suite converge.',
      lines: [
        { html: 'a₀ = 2, aₙ₊₁ = aₙ/3 + 4 : L = L/3 + 4 donne L = 6', note: 'Point fixe', noEq: true },
        { html: 'bₙ = aₙ − 6 vérifie bₙ₊₁ = bₙ/3, et b₀ = 2 − 6 = −4', note: 'Suite géométrique', noEq: true },
        { html: 'aₙ = 6 − 4/3ⁿ', note: 'Revenir à aₙ = L + bₙ', noEq: true },
        { html: 'aₙ → 6, car |1/3| < 1', note: 'Limite', noEq: true },
      ],
    },
  }),
  S('a1-seq-rec-fixed', {
    prereqs: ['a1-seq-monotone', 'g1-sign-table'], icon: 'L = f(L)', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Suite aₙ₊₁ = f(aₙ) : points fixes, signe de f(x) − x, intervalle stable',
    desc: 'Les candidats L = f(L), le sens donné par f(x) − x, la borne donnée par un intervalle stable.',
    prereqWhy: { 'a1-seq-monotone': 'conclure : monotone et bornée, donc convergente', 'g1-sign-table': 'le signe de f(x) − x' },
    intro: {
      rule: '(1) Si aₙ → L et f est continue, alors L = f(L) : on trouve les <b>candidats</b>. (2) Le signe de f(x) − x dit si la suite monte (aₙ₊₁ − aₙ = f(aₙ) − aₙ) ou descend. (3) Un intervalle stable (f(I) ⊂ I) donne la borne. Résoudre L = f(L) ne prouve <b>pas</b> que la suite converge.',
      lines: [
        { html: 'a₀ = 3, aₙ₊₁ = √(6aₙ − 8) : L = √(6L − 8) ⇔ L² − 6L + 8 = 0 ⇔ L ∈ {2 ; 4}', note: 'Candidats', noEq: true },
        { html: '√(6x − 8) − x > 0 ⇔ 2 < x < 4', note: 'Signe de f(x) − x', noEq: true },
        { html: 'f est croissante, f(2) = 2 et f(4) = 4 : f(]2 ; 4[) ⊂ ]2 ; 4[', note: 'Intervalle stable', noEq: true },
        { html: '2 < aₙ < 4 et aₙ₊₁ > aₙ : croissante, majorée par 4, donc aₙ → 4', note: 'Conclure', noEq: true },
      ],
    },
  }),
  S('a1-seq-rec-study', {
    prereqs: ['a1-seq-rec-fixed', 'a1-fn-study'], icon: '13 pts', examWeight: 1, exam: ['open'],
    title: 'Suite récurrente par l\'étude complète de f (problème long)',
    desc: 'Étudier f, comparer son graphe à y = x, puis discuter la suite selon a₁.',
    prereqWhy: { 'a1-seq-rec-fixed': 'le signe de f(x) − x et les points fixes', 'a1-fn-study': 'dérivées, convexité et asymptotes de f' },
    intro: {
      rule: 'C\'est le problème de 13 points de l\'examen MT. On étudie f (dérivées, extrema, convexité, asymptotes), on compare son graphe à la droite y = x, puis on discute la suite selon a₁.<br>L\'idée clé : un extremum local de f qui est aussi un point fixe <b>borne</b> la suite.',
      lines: [
        { html: 'aₙ₊₁ = aₙ + (2 + aₙ)/(1 + aₙ) : L = L + (2 + L)/(1 + L) donne L = −2', note: '(a) Seule limite possible', noEq: true },
        { html: 'f′(x) = 1 − 1/(1 + x)² = x(x + 2)/(1 + x)², f″(x) = 2/(1 + x)³ ; max local f(−2) = −2', note: '(b) Étude de f', noEq: true },
        { html: 'f(x) > x ⇔ x < −2 ou x > −1', note: '(c) Position par rapport à y = x', noEq: true },
        { html: 'a₁ < −2 : croissante, majorée par −2 (le max de f sur ]−∞ ; −1[) ; a₁ > −1 : → +∞', note: '(d) Discussion', noEq: true },
        { html: 'La suite converge (vers −2) si et seulement si a₁ < −1', note: 'Conclusion', noEq: true },
      ],
    },
  }),
  S('a1-ser-geo-tele', {
    prereqs: ['g5-reindex', 'g5-geom', 'g0-pfd-simple'], icon: 'Σ qᵏ', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Séries géométriques et télescopiques : calculer la somme',
    desc: 'Premier terme sur 1 − raison ; une télescopique par ses sommes partielles S_N.',
    prereqWhy: { 'g5-reindex': 'décaler l\'indice pour faire apparaître les termes qui s\'annulent', 'g5-geom': 'somme des termes d\'une suite géométrique', 'g0-pfd-simple': 'décomposer le terme d\'une série télescopique' },
    intro: {
      rule: 'Si |q| < 1, Σ_{k≥k₀} qᵏ = q^(k₀)/(1 − q) : <b>premier terme sur 1 − raison</b> ; si |q| ≥ 1, la série diverge. Une série télescopique se calcule par ses sommes partielles : Σ_{k=1}^{N} (bₖ − bₖ₊ₚ) ne garde que p termes au début et p à la fin.',
      lines: [
        { html: 'Σ_{k≥1} 1/(k(k + 1)) : 1/(k(k + 1)) = 1/k − 1/(k + 1)', note: 'Décomposer', noEq: true },
        { html: 'S_N = (1 − 1/2) + (1/2 − 1/3) + … + (1/N − 1/(N + 1)) = 1 − 1/(N + 1)', note: 'Télescoper', noEq: true },
        { html: 'S_N → 1, donc la série converge et sa somme vaut 1', note: 'Passer à la limite', noEq: true },
      ],
    },
  }),
];
