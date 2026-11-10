// Module N, part d (unit `numerique`, step U9): différences finies. Catalogue:
// docs/universite/N-analyse-numerique.md. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'numerique', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

export const SKILLS = [
  S('n-fd-basic', {
    prereqs: ["a1-dl-usual"], icon: "δ⁺ δᶜ", examWeight: 1, exam: ["mcq", "tf"],
    title: "Différences finies progressives, rétrogrades, centrées",
    desc: "Différences finies progressives, rétrogrades, centrées",
    prereqWhy: {"a1-dl-usual": "Taylor de f(x̄ ± h) pour l'ordre"},
    intro: {
      rule: "les formules de base sont : - progressive : δ⁺f = (f(x̄ + h) − f(x̄))/h, d'ordre 1 ; son erreur vaut (h/2)·f″(ξ) ; - rétrograde : δ⁻f = (f(x̄) − f(x̄ − h))/h, d'ordre 1 ; - centrée : δᶜf = (f(x̄ + h) − f(x̄ − h))/(2h), d'ordre 2 ; son erreur vaut (h²/6)·f‴(ξ) ; - dérivée seconde : (f(x̄ + h) − 2f(x̄) + f(x̄ − h))/h², d'ordre 2. Exemple : f(x) = x³, x̄ = 1, h = 0,1, f′(1) = 3.",
      lines: L([["δ⁺ = (1,331 − 1)/0,1 = 3,31", "erreur 0,31"], ["δ⁻ = (1 − 0,729)/0,1 = 2,71", "erreur 0,29"], ["δᶜ = (1,331 − 0,729)/0,2 = 3,01", "erreur 0,01 = h²·f‴/6"]]),
    },
  }),
  S('n-fd-roundoff', {
    prereqs: ["n-fd-basic", "n-err-float", "a1-extrema-global"], icon: "h*", examWeight: 1, exam: ["tf"],
    title: "Compromis entre arrondi et troncature",
    desc: "Compromis entre arrondi et troncature",
    prereqWhy: {"n-fd-basic": "erreur de troncature de δ⁺f"},
    intro: {
      rule: "en machine, |f′(x̄) − δ̂⁺f| ≤ (h/2)·max|f″| + 2ε·max|f|/h, avec ε ≈ 10⁻¹⁶. Le premier terme (troncature) décroît avec h ; le second (arrondi) croît. Le minimum est vers h* = 2√(ε·max|f|/max|f″|) ≈ 10⁻⁸. Pour la formule centrée, (h²/6)·max|f‴| + ε·max|f|/h donne h* ≈ ε^(1/3) ≈ 10⁻⁵. Exemple : f = ln, x̄ = 1, avec max|f| ≈ max|f″| ≈ 1.",
      lines: L([["E(h) ≈ h/2 + 2·10⁻¹⁶/h", ""], ["E′(h) = 1/2 − 2·10⁻¹⁶/h² = 0 ⇔ h* = 2·10⁻⁸", ""]]),
    },
  }),
  S('n-fd-build', {
    prereqs: ["n-fd-basic"], icon: "(α,β,γ)", examWeight: 1, exam: ["mcq", "coef"],
    title: "Construire une formule de différences finies par Taylor",
    desc: "Construire une formule de différences finies par Taylor",
    prereqWhy: {"n-fd-basic": "formules de base et leur ordre"},
    intro: {
      rule: "pour Dₕf(x̄) = (αf(x̄) + βf(x̄ − h) + γf(x̄ − 2h))/h, on développe chaque terme et on impose : - coefficient de f(x̄) égal à 0 ; - coefficient de f′(x̄) égal à 1 (ordre ≥ 1) ; - coefficient de h·f″(x̄) égal à 0 (ordre ≥ 2). Exemple (série GM 6) :",
      lines: L([["α + β + γ = 0", "terme en f(x̄)/h"], ["−β − 2γ = 1", "terme en f′(x̄)"], ["β/2 + 2γ = 0", "terme en h·f″(x̄)"], ["(α, β, γ) = (3/2, −2, 1/2)", ""], ["Dₕf = f′(x̄) − (h²/3)·f‴(x̄) + …", "ordre exactement 2"]]),
    },
  }),
  S('n-fd-proof', {
    prereqs: ["n-fd-build"], icon: "Ch²", examWeight: 2, exam: ["tf", "open"],
    title: "Prouver l'ordre d'une formule de différences finies, avec la constante",
    desc: "Prouver l'ordre d'une formule de différences finies, avec la constante",
    prereqWhy: {},
    intro: {
      rule: "une preuve d'ordre se fait en quatre temps : 1. Taylor avec reste de Lagrange, jusqu'au premier ordre qui ne s'annule pas ; 2. combinaison des développements ; 3. majoration : |…| ≤ (somme des |coefficients|)·max|f⁽ᵖ⁾|·hᵏ ; 4. vérifier que la constante ne dépend ni de h ni de f, et que les points ξ restent dans l'intervalle. Exemple (examen 2019, 7 points) : pour f ∈ C³[x₀ ; x₀ + 2] et 0 < h ≤ 1, |f′(x₀) − (−3f(x₀) + 4f(x₀ + h) − f(x₀ + 2h))/(2h)| ≤ h²·max|f‴|.",
      lines: L([["f(x₀ + h) = f + hf′ + (h²/2)f″ + (h³/6)f‴(ξ₁)", ""], ["f(x₀ + 2h) = f + 2hf′ + 2h²f″ + (4h³/3)f‴(ξ₂)", ""], ["−3f + 4f(x₀ + h) − f(x₀ + 2h) = 2hf′ + (2h³/3)f‴(ξ₁) − (4h³/3)f‴(ξ₂)", ""], ["f′ − (…)/(2h) = −(h²/3)f‴(ξ₁) + (2h²/3)f‴(ξ₂)", ""], ["|…| ≤ (1/3 + 2/3)h²·max|f‴| = h²·max|f‴|", "ξ₁, ξ₂ ∈ [x₀ ; x₀ + 2h] ⊂ [x₀ ; x₀ + 2] car h ≤ 1"]]),
    },
  }),
];
