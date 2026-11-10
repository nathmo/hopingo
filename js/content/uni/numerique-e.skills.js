// Module N, part e (unit `numerique`, step U9): quadrature, énoncés d'erreur,
// Richardson. Catalogue: docs/universite/N-analyse-numerique.md. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'numerique', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

export const SKILLS = [
  S('n-quad-composite', {
    prereqs: ['g5-sigma', 'a1-int-direct'], icon: 'Simpson', examWeight: 1, exam: ['mcq'],
    title: 'Formules composites : rectangle, point milieu, trapèze, Simpson',
    desc: 'Découper [a ; b] en n morceaux et appliquer une formule simple sur chacun.',
    prereqWhy: { 'a1-int-direct': 'l\'intégrale exacte, pour comparer', 'g5-sigma': 'la formule composite est une somme Σ sur les sous-intervalles' },
    intro: {
      rule: 'Avec h = (b − a)/n, xᵢ = a + ih et cᵢ le milieu de [xᵢ₋₁ ; xᵢ] :<br>• rectangle (à gauche) : Σ h·f(xᵢ₋₁) ;<br>• point milieu : Σ h·f(cᵢ) ;<br>• trapèze : Σ (h/2)·(f(xᵢ₋₁) + f(xᵢ)) ;<br>• Simpson : Σ (h/6)·(f(xᵢ₋₁) + 4f(cᵢ) + f(xᵢ)).<br><b>h est la longueur d\'un sous-intervalle</b> : c\'est pourquoi Simpson a le poids h/6. Exemple : ∫₀² x³ dx = 4, avec n = 2 (h = 1).',
      lines: L([
        ['Point milieu : 1·(0,5³ + 1,5³) = 0,125 + 3,375 = 3,5', ''],
        ['Trapèze : (1/2)(0 + 1) + (1/2)(1 + 8) = 5', 'Les extrémités ont le poids h/2'],
        ['Simpson : (1/6)(0 + 4·0,125 + 1) + (1/6)(1 + 4·3,375 + 8) = 0,25 + 3,75 = 4', 'Exact : Simpson intègre exactement x³'],
      ]),
    },
  }),
  S('n-quad-exactness', {
    prereqs: ['n-quad-composite', 'a1-int-subst'], icon: 'Pᵣ', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Degré d\'exactitude ; ramener à [−1 ; 1]',
    desc: 'Tester 1, t, t², … pour trouver jusqu\'où une formule est exacte.',
    prereqWhy: { 'n-quad-composite': 'les formules élémentaires J à tester', 'a1-int-subst': 'x = xᵢ + h(t + 1)/2 ramène chaque sous-intervalle à [−1 ; 1]' },
    intro: {
      rule: 'J a le degré d\'exactitude r si J(p) = ∫₋₁¹ p pour tout p ∈ Pᵣ, mais pas pour un polynôme de degré r + 1. On teste 1, t, t², … dans l\'ordre : <b>le degré est atteint quand un monôme échoue</b>. Pour ramener [xᵢ ; xᵢ₊₁] à [−1 ; 1], on pose x = xᵢ + h(t + 1)/2, dx = (h/2)dt. Exemple : J(g) = g(−α) + g(α) avec 0 < α < 1.',
      lines: L([
        ['1 : J = 2 = ∫1 ; t : J = 0 = ∫t', 'Exacte sur P₁ pour tout α'],
        ['t² : 2α² = 2/3 ⇔ α = 1/√3', ''],
        ['t³ : 0 = 0', 'Fonction impaire'],
        ['t⁴ : 2/9 ≠ 2/5', 'Degré 3 pour α = 1/√3'],
      ]),
    },
  }),
  S('n-quad-order', {
    prereqs: ['n-quad-exactness', 'fn-affine'], icon: '2ᵖ', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Ordre d\'une formule composite ; lire un tableau d\'erreurs',
    desc: 'Quand h est divisé par 2, l\'erreur est divisée par 2ᵖ.',
    prereqWhy: { 'n-quad-exactness': 'ordre = degré d\'exactitude + 1', 'fn-affine': 'en échelle log-log, l\'ordre est la pente d\'une droite' },
    intro: {
      rule: 'Si J a le degré d\'exactitude r, la formule composite est d\'ordre r + 1 pour f ∈ Cʳ⁺¹ : |∫f − Q_h(f)| ≤ C·max|f⁽ʳ⁺¹⁾|·hʳ⁺¹. Les ordres : rectangle 1, point milieu 2, trapèze 2, Simpson 4, Gauss à 2 points 4.<br>Pour lire un tableau : quand n double, h est divisé par 2 et l\'erreur est divisée par 2ᵖ (la pente p en échelle log-log). <b>p est l\'exposant, pas le rapport.</b> Exemple : point milieu, erreur 1,962·10⁻³ puis 4,912·10⁻⁴ quand n double.',
      lines: L([
        ['Rapport 1,962e-03/4,912e-04 ≈ 3,99 ≈ 2²', 'h divisé par 2'],
        ['Ordre 2', 'Cohérent avec r = 1'],
      ]),
    },
  }),
  S('n-quad-proof', {
    prereqs: ['n-quad-order', 'a1-dl-usual'], icon: 'Ch²', examWeight: 2, exam: ['tf', 'open'],
    title: 'Prouver l\'ordre d\'une formule composite par Taylor',
    desc: 'Changement de variable, Taylor, exactitude de J, puis une constante explicite.',
    prereqWhy: { 'n-quad-order': 'l\'énoncé d\'ordre à prouver', 'a1-dl-usual': 'le développement de Taylor avec reste de Lagrange' },
    intro: {
      rule: 'La preuve type des examens 2019 (8 points) et 2021 (10 points), pour le point milieu J(g) = 2g(0) : on ramène chaque sous-intervalle à [−1 ; 1], on développe f autour du milieu cᵢ jusqu\'au degré 1 (J est exacte sur P₁), et il ne reste que le reste de Taylor, qu\'on majore. <b>La constante finale ne doit dépendre ni de h ni de N</b> : on remplace N·h par b − a.',
      lines: L([
        ['(a) ∫ₐᵇ f = (h/2)·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt', 'dx = (h/2)dt'],
        ['(b) L_h(f) = (h/2)·Σᵢ 2f(xᵢ + h/2) = h·Σᵢ f(xᵢ + h/2)', ''],
        ['(c) f(xᵢ + h(t + 1)/2) = f(cᵢ) + (ht/2)f′(cᵢ) + (h²t²/8)·f″(ξᵢ(t))', 'pᵢ ∈ P₁, plus le reste rᵢ'],
        ['(d) J exacte sur P₁ et J(rᵢ) = 2rᵢ(0) = 0 ⇒ ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt', ''],
        ['(e) |…| ≤ (h/2)·N·(h²/8)·(2/3)·max|f″| = (b − a)·h²/24·max|f″|', 'N·h = b − a'],
        ['(f) J(g) = 2g(−1) : rᵢ = (h(t + 1)/2)·f′(ξ) ⇒ |…| ≤ (b − a)·h/2·max|f′|', 'Ordre 1'],
      ]),
    },
  }),
  S('n-error-statements', {
    prereqs: ['n-quad-order', 'g9-negate'], icon: '∀f ∃C', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Lire une estimation d\'erreur : quantificateurs, constante, régularité',
    desc: 'Qui choisit C, et avant quoi ? Quelle régularité faut-il à f ?',
    prereqWhy: { 'n-quad-order': 'énoncés d\'erreur des formules composites', 'g9-negate': 'réfuter « ∃C ∀f … » : pour tout C, exhiber une f qui le dépasse' },
    intro: {
      rule: 'Il faut savoir lire trois énoncés :<br>• « ∀f ∈ C⁴, ∃C > 0, ∀h : |E| ≤ Ch⁴ » est <b>vrai</b> : C peut dépendre de f ;<br>• « ∃C > 0, ∀f ∈ C⁴, ∀h : |E| ≤ Ch⁴ » est <b>faux</b> : on remplace f par λf avec λ grand ;<br>• « ∃C > 0, ∀f ∈ C⁴, ∀h : |E| ≤ Ch⁴·max|f⁽⁴⁾| » est <b>vrai</b> : la constante universelle multiplie max|f⁽⁴⁾|.<br>Avec moins de régularité, l\'ordre peut baisser ; plus de régularité ne donne pas plus d\'ordre. Exemple : Simpson sur √x, qui n\'est pas C¹ en 0.',
      lines: L([
        ['E(λf) = λE(f)', 'Aucune constante fixe ne marche pour toutes les f'],
        ['√x : rapport ≈ 2,83 = 2^1,5', 'Ordre 1,5 seulement'],
      ]),
    },
  }),
  S('n-richardson', {
    prereqs: ['n-quad-order'], icon: 'Q̃', examWeight: 0, exam: ['mcq'], tags: ['GM'],
    title: 'Extrapolation de Richardson, estimation a posteriori',
    desc: 'Combiner Q_h et Q₂ₕ pour éliminer le terme en hᵖ et estimer l\'erreur.',
    prereqWhy: { 'n-quad-order': 'l\'ordre p sert à extrapoler' },
    intro: {
      rule: 'Si Q_h = I + Chᵖ + O(h^q), alors Q̃_h = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) est d\'ordre q > p. <b>Le poids 2ᵖ va sur la formule la plus fine</b>, Q_h. L\'estimateur a posteriori de l\'erreur de Q_h est ε_h = |Q̃_h − Q_h| = |Q_h − Q₂ₕ|/(2ᵖ − 1). L\'algorithme adaptatif divise h par 2 tant que ε_h > tol. Exemple : ∫₀¹ x² dx par le point milieu (p = 2).',
      lines: L([
        ['Q₂ₕ (n = 1) = f(1/2) = 1/4', ''],
        ['Q_h (n = 2) = (1/2)(1/16 + 9/16) = 5/16', ''],
        ['Q̃ = (4·5/16 − 1/4)/3 = 1/3', 'Exact'],
        ['ε = |1/3 − 5/16| = 1/48', 'Égale à la vraie erreur de Q_h'],
      ]),
    },
  }),
];
