// Module N, part e (unit `numerique`, step U9): quadrature, énoncés d'erreur, Richardson. Catalogue:
// docs/universite/N-analyse-numerique.md. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'numerique', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

export const SKILLS = [
  S('n-quad-composite', {
    prereqs: ["g5-sigma", "a1-int-direct"], icon: "Simpson", examWeight: 1, exam: ["mcq"],
    title: "Formules composites : rectangle, point milieu, trapèze, Simpson",
    desc: "Formules composites : rectangle, point milieu, trapèze, Simpson",
    prereqWhy: {"a1-int-direct": "intégrale exacte pour comparer"},
    intro: {
      rule: "avec h = (b − a)/n, xᵢ = a + ih et cᵢ le milieu de [xᵢ₋₁ ; xᵢ] : - rectangle (à gauche) : Σ h·f(xᵢ₋₁) ; - point milieu : Σ h·f(cᵢ) ; - trapèze : Σ (h/2)·(f(xᵢ₋₁) + f(xᵢ)) ; - Simpson : Σ (h/6)·(f(xᵢ₋₁) + 4f(cᵢ) + f(xᵢ)). Exemple : ∫₀² x³ dx = 4, avec n = 2 (h = 1).",
      lines: L([["point milieu : 1·(0,5³ + 1,5³) = 0,125 + 3,375 = 3,5", ""], ["trapèze : (1/2)(0 + 1) + (1/2)(1 + 8) = 5", ""], ["Simpson : (1/6)(0 + 4·0,125 + 1) + (1/6)(1 + 4·3,375 + 8) = 0,25 + 3,75 = 4", "exact : Simpson intègre exactement x³"]]),
    },
  }),
  S('n-quad-exactness', {
    prereqs: ["n-quad-composite", "a1-int-subst"], icon: "Pᵣ", examWeight: 2, exam: ["mcq", "tf"],
    title: "Degré d'exactitude ; ramener à [−1 ; 1]",
    desc: "Degré d'exactitude ; ramener à [−1 ; 1]",
    prereqWhy: {"n-quad-composite": "les formules élémentaires J à tester"},
    intro: {
      rule: "J a le degré d'exactitude r si J(p) = ∫p pour tout p ∈ Pᵣ, mais pas pour un polynôme de degré r + 1. On teste 1, t, t², … dans l'ordre. Pour ramener [xᵢ ; xᵢ₊₁] à [−1 ; 1], on pose x = xᵢ + h(t + 1)/2, dx = (h/2)dt. Exemple : J(g) = g(−α) + g(α) avec 0 < α < 1.",
      lines: L([["1 : J = 2 = ∫1 ; t : J = 0 = ∫t", "exacte sur P₁ pour tout α"], ["t² : 2α² = 2/3 ⇔ α = 1/√3", ""], ["t³ : 0 = 0", ""], ["t⁴ : 2/9 ≠ 2/5", "degré 3 pour α = 1/√3"]]),
    },
  }),
  S('n-quad-order', {
    prereqs: ["n-quad-exactness", "fn-affine"], icon: "2ᵖ", examWeight: 2, exam: ["mcq", "tf"],
    title: "Ordre d'une formule composite ; lire un tableau d'erreurs",
    desc: "Ordre d'une formule composite ; lire un tableau d'erreurs",
    prereqWhy: {"n-quad-exactness": "ordre = degré d'exactitude + 1"},
    intro: {
      rule: "si J a le degré d'exactitude r, la formule composite est d'ordre r + 1 pour f ∈ Cʳ⁺¹ : |∫f − Q_h(f)| ≤ C·max|f⁽ʳ⁺¹⁾|·hʳ⁺¹, avec C = 2(b − a)/(r + 1)! dans les notes. Les ordres sont : rectangle 1, point milieu 2, trapèze 2, Simpson 4, Gauss à 2 points 4. Pour lire un tableau : quand h est divisé par 2, l'erreur est divisée par 2ᵖ (c'est la pente p en échelle log-log). Exemple : point milieu, erreur 1,962·10⁻³ puis 4,912·10⁻⁴ quand n double.",
      lines: L([["rapport 1,962e-03/4,912e-04 ≈ 3,99 ≈ 2²", ""], ["ordre 2", "cohérent avec r = 1"]]),
    },
  }),
  S('n-quad-proof', {
    prereqs: ["n-quad-order", "a1-dl-usual"], icon: "Ch²", examWeight: 2, exam: ["tf", "open"],
    title: "Prouver l'ordre d'une formule composite par Taylor",
    desc: "Prouver l'ordre d'une formule composite par Taylor",
    prereqWhy: {"n-quad-order": "l'énoncé d'ordre à prouver"},
    intro: {
      rule: "la preuve type est celle des examens 2019 (8 points) et 2021 (10 points), pour le point milieu J(g) = 2g(0). - (a) ∫ₐᵇ f = (h/2)·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2)dt - (b) L_h(f) = (h/2)·Σᵢ 2f(xᵢ + h/2) = h·Σᵢ f(xᵢ + h/2) - (c) f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t), avec pᵢ(t) = f(cᵢ) + (ht/2)f′(cᵢ) et rᵢ(t) = (h²t²/8)·f″(ξᵢ(t)) - (d) J est exacte sur P₁ ⇒ ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t)dt - (e) |…| ≤ (h/2)·N·(h²/8)·(2/3)·max|f″| = (b − a)·h²/24·max|f″| - (f) J(g) = 2g(−1) (rectangle) : rᵢ = h(t + 1)/2·f′(ξ) ⇒ |…| ≤ (b − a)·h/2·max|f′|, ordre 1",
      lines: L([]),
    },
  }),
  S('n-error-statements', {
    prereqs: ["n-quad-order", "g9-negate"], icon: "∀f ∃C", examWeight: 2, exam: ["mcq", "tf"],
    title: "Lire une estimation d'erreur : quantificateurs, constante, régularité",
    desc: "Lire une estimation d'erreur : quantificateurs, constante, régularité",
    prereqWhy: {"n-quad-order": "énoncés d'erreur des formules composites"},
    intro: {
      rule: "il faut savoir lire trois énoncés : - « ∀f ∈ C⁴, ∃C > 0, ∀h : |E| ≤ Ch⁴ » est <b>vrai</b> : C peut dépendre de f ; - « ∃C > 0, ∀f ∈ C⁴, ∀h : |E| ≤ Ch⁴ » est <b>faux</b> : on remplace f par λf avec λ grand ; - « ∃C > 0, ∀f ∈ C⁴, ∀h : |E| ≤ Ch⁴·max|f⁽⁴⁾| » est <b>vrai</b> : la constante universelle multiplie max|f⁽⁴⁾|. Avec moins de régularité, l'ordre peut baisser. Exemple : Simpson sur √x, qui n'est pas C¹ en 0.",
      lines: L([["E(λf) = λE(f)", "aucune constante fixe ne marche pour tous les f"], ["√x : rapport ≈ 2,83 = 2^1,5", "ordre 1,5 seulement"]]),
    },
  }),
  S('n-richardson', {
    prereqs: ["n-quad-order"], icon: "Q̃", examWeight: 0, exam: ["mcq"], tags: ["GM"],
    title: "Extrapolation de Richardson, estimation a posteriori",
    desc: "Extrapolation de Richardson, estimation a posteriori",
    prereqWhy: {"n-quad-order": "l'ordre p sert à extrapoler"},
    intro: {
      rule: "si Q_h = I + Chᵖ + O(h^q), alors Q̃_h = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) est d'ordre q > p. L'estimateur a posteriori est ε_h = |Q̃_h − Q_h| = |Q_h − Q₂ₕ|/(2ᵖ − 1). L'algorithme adaptatif divise h par 2 tant que ε_h > tol. Exemple : ∫₀¹ x² dx par le point milieu (p = 2).",
      lines: L([["Q₂ₕ (n = 1) = f(1/2) = 1/4", ""], ["Q_h (n = 2) = (1/2)(1/16 + 9/16) = 5/16", ""], ["Q̃ = (4·5/16 − 1/4)/3 = 1/3", "exact"], ["ε = |1/3 − 5/16| = 1/48", "égale à la vraie erreur de Q_h"]]),
    },
  }),
];
