// Module P, part b (unit `proba`, step U7). Catalogue:
// docs/universite/P-probabilites.md. Skills: p-cont-density, p-cont-quantile, p-unif-exp, p-moments, p-family, p-normal-std, p-normal-inverse, p-transform, p-joint-disc, p-joint-cont, p-lin-combo.
// Generators: proba-b.js; traps: js/cas/rules/pb.js. Prerequisites of
// the algebra plan: @alg:A-arrondir = cm-round, @alg:J-pourcentage =
// pct-which, @alg:F-isoler = iso-formula. A2 (step U6) goes through UNBUILT.

const S = (id, year, rest) => ({ id, unit: 'proba', year, optional: false, needsSolo: true, ...rest });

export const SKILLS = [
  S('p-cont-density', 15, {
    prereqs: ["a1-int-direct", "a1-improper-calc"], icon: "∫f", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Densité : normaliser, F ↔ f, probabilités",
    desc: "Une densité vérifie f ≥ 0 et ∫ f = 1 sur le support.",
    prereqWhy: {"a1-int-direct": "primitiver le noyau de la densité", "a1-improper-calc": "intégrales sur un support non borné ([1 ; ∞[, [0 ; ∞[)"},
    intro: { lines: [{ html: "f(x) = c·x⁻⁴ pour x ≥ 1", note: "Une densité à normaliser", noEq: true }, { html: "c·[−x⁻³/3]₁^∞ = c/3 = 1", note: "L'intégrale sur le support vaut 1", noEq: true }, { html: "c = 3", note: "Résoudre", noEq: true }, { html: "F(x) = 1 − x⁻³ pour x ≥ 1, 0 sinon", note: "Fonction de répartition", noEq: true }], rule: "Une densité vérifie f ≥ 0 et ∫ f = 1 <b>sur le support</b>. Pr(a < X ≤ b) = ∫ₐᵇ f = F(b) − F(a), F′ = f, et Pr(X = a) = 0. Une densité peut dépasser 1." },
  }),
  S('p-cont-quantile', 15, {
    prereqs: ["p-cont-density"], icon: "q_α", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Quantile d'une loi continue",
    desc: "Le quantile d'ordre α est la solution q de F(q) = α (F inversible).",
    prereqWhy: {"p-cont-density": "F se calcule en intégrant f"},
    intro: { lines: [{ html: "f(x) = 3x² sur [0 ; 1] : F(x) = x³", note: "Fonction de répartition", noEq: true }, { html: "F(q) = 3/4", note: "Équation du quantile", noEq: true }, { html: "q = (3/4)^(1/3) ≈ 0,909", note: "Isoler", noEq: true }], rule: "Le quantile d'ordre α est la solution q de F(q) = α (F inversible). Médiane : α = 1/2 ; quartile supérieur : α = 3/4. On résout sur <b>F</b>, pas sur f." },
  }),
  S('p-unif-exp', 15, {
    prereqs: ["p-cont-density", "p-cond-total"], icon: "e^−λx", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Uniforme et exponentielle, absence de mémoire",
    desc: "U(a, b) : f = 1/(b − a), F(x) = (x − a)/(b − a), E = (a + b)/2, var = (b − a)²/12.",
    prereqWhy: {"p-cont-density": "F ↔ f et probabilités par intégrales", "p-cond-total": "absence de mémoire : Pr(X > s + t | X > s)"},
    intro: { lines: [{ html: "Moyenne 10 ans : λ = 1/10", note: "Taux = 1/moyenne", noEq: true }, { html: "Pr(X > 12 | X > 2) = e^(−1,2)/e^(−0,2)", note: "Conditionner", noEq: true }, { html: "= e^(−1) ≈ 0,368 = Pr(X > 10)", note: "Absence de mémoire", noEq: true }], rule: "U(a, b) : f = 1/(b − a), F(x) = (x − a)/(b − a), E = (a + b)/2, var = (b − a)²/12. exp(λ) : f = λe^(−λx), F = 1 − e^(−λx), <b>E = 1/λ</b>, var = 1/λ² (λ est un taux, à l'inverse de Poisson). Sans mémoire : Pr(X > s + t | X > s) = Pr(X > t)." },
  }),
  S('p-moments', 15, {
    prereqs: ["p-disc-pmf", "p-cont-density"], icon: "E, var", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Espérance et variance d'une loi",
    desc: "E[X] = Σ x·f(x) ou ∫ x·f(x) dx ; E[g(X)] = ∫ g(x)·f(x) dx, qui n'est pas g(E[X]) ; var(X) = E[X²] − E[X]² ≥ 0.",
    prereqWhy: {"p-disc-pmf": "E[X] = Σ x·f(x)", "p-cont-density": "E[X] = ∫ x·f(x) dx"},
    intro: { lines: [{ html: "f(y) = 5y⁴ sur ]0 ; 1[ : E[Y] = ∫₀¹ 5y⁵ dy = 5/6", note: "Espérance", noEq: true }, { html: "E[Y²] = ∫₀¹ 5y⁶ dy = 5/7", note: "Second moment", noEq: true }, { html: "var(Y) = 5/7 − (5/6)² = 5/252", note: "König-Huygens", noEq: true }], rule: "E[X] = Σ x·f(x) ou ∫ x·f(x) dx ; E[g(X)] = ∫ g(x)·f(x) dx, qui n'est pas g(E[X]) ; var(X) = E[X²] − E[X]² ≥ 0. L'espérance existe seulement si l'intégrale converge (Cauchy : non ; Pareto α ≤ 1 : non)." },
  }),
  S('p-family', 15, {
    prereqs: ["p-unif-exp", "p-moments"], icon: "Γ β", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234", "EE-209"],
    title: "Reconnaître Gamma, Beta, Weibull, Pareto, χ²",
    desc: "On lit le noyau (la partie qui dépend de x) pour reconnaître la loi et éviter un calcul.",
    prereqWhy: {"p-unif-exp": "l'exponentielle est la loi Γ(1, θ)", "p-moments": "E et var de la loi reconnue"},
    intro: { lines: [{ html: "f(y) ∝ y²e^(−y/θ)", note: "Le noyau : y^(k−1)·e^(−y/θ) avec k − 1 = 2", noEq: true }, { html: "Y ~ Γ(3, θ)", note: "Reconnaître", noEq: true }, { html: "E[Y] = 3θ ; var(Y) = 3θ²", note: "E = kθ, var = kθ²", noEq: true }], rule: "On lit le <b>noyau</b> (la partie qui dépend de x) pour reconnaître la loi et éviter un calcul. x^(k−1)e^(−x/θ) → Γ(k, θ), constante 1/(Γ(k)θᵏ), E = kθ, var = kθ², Γ(n) = (n − 1)!. x^(α−1)(1 − x)^(β−1) sur [0 ; 1] → Beta(α, β), constante Γ(α + β)/(Γ(α)Γ(β)), E = α/(α + β). k·t^(k−1)e^(−tᵏ) → Weibull, F = 1 − e^(−tᵏ). α·x^(−α−1) sur ]1 ; ∞[ → Pareto, F = 1 − x^(−α). χ²(r) = Γ(r/2, 2). Somme de n exp(λ) indépendantes : Γ(n, 1/λ)." },
  }),
  S('p-normal-std', 15, {
    prereqs: ["p-cont-density"], icon: "Φ(z)", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Loi normale : standardiser, table de Φ",
    desc: "X ~ N(μ, σ²) ⇒ Z = (X − μ)/σ ~ N(0, 1), donc Pr(X ≤ x) = Φ((x − μ)/σ).",
    prereqWhy: {"p-cont-density": "Pr(X ≤ x) = F(x)"},
    intro: { lines: [{ html: "X ~ N(100 ; 15²) : z = (130 − 100)/15 = 2", note: "Standardiser", noEq: true }, { html: "Pr(X > 130) = 1 − Φ(2) = 1 − 0,977 = 0,023", note: "Table de Φ, complément", noEq: true }], rule: "X ~ N(μ, σ²) ⇒ Z = (X − μ)/σ ~ N(0, 1), donc Pr(X ≤ x) = Φ((x − μ)/σ). Le 2ᵉ paramètre est la <b>variance</b>. Φ(−z) = 1 − Φ(z) ; Pr(X > x) = 1 − Φ(·). aX + b est normale ; une somme de normales indépendantes est normale." },
  }),
  S('p-normal-inverse', 15, {
    prereqs: ["p-normal-std"], icon: "Φ⁻¹", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234", "EE-209"],
    title: "Quantiles normaux, retrouver μ ou σ",
    desc: "On lit la table à l'envers : Pr(X > c) = 0,1 ⇒ (c − μ)/σ = Φ⁻¹(0,9) = 1,28 (Table 2).",
    prereqWhy: {"p-normal-std": "standardiser et lire la table de Φ"},
    intro: { lines: [{ html: "Pr(X > 89) = 0,1 avec X ~ N(84 ; σ²) : Φ(5/σ) = 0,9", note: "Complément", noEq: true }, { html: "5/σ = Φ⁻¹(0,9) = 1,28", note: "Table 2", noEq: true }, { html: "σ = 5/1,28 ≈ 3,9", note: "Isoler σ", noEq: true }], rule: "On lit la table à l'envers : Pr(X > c) = 0,1 ⇒ (c − μ)/σ = Φ⁻¹(0,9) = 1,28 (Table 2). Quantile d'ordre α de N(μ, σ²) : μ + σ·Φ⁻¹(α). Intervalle symétrique de probabilité 0,5 : ±Φ⁻¹(0,75) = ±0,67." },
  }),
  S('p-transform', 15, {
    prereqs: ["p-cont-density", "a1-deriv-inverse", "a2-change-var", "p-family"], icon: "g(X)", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234", "EE-209"],
    title: "Loi de Y = g(X) ; échantillonnage par F⁻¹",
    desc: "Si g est strictement monotone sur le support, f_Y(y) = f_X(g⁻¹(y))·|dg⁻¹/dy| sur g(support), 0 ailleurs.",
    prereqWhy: {"p-cont-density": "densité f_X et son support", "a1-deriv-inverse": "dériver la réciproque g⁻¹", "a2-change-var": "jacobien du changement de variables (gabarit à deux dimensions)", "p-family": "reconnaître la loi obtenue (exp, χ²)"},
    intro: { lines: [{ html: "X = −ln(U)/λ : g⁻¹(x) = e^(−λx)", note: "Inverser g", noEq: true }, { html: "(g⁻¹)′(x) = −λe^(−λx)", note: "Dériver", noEq: true }, { html: "f_X(x) = 1·|−λe^(−λx)| = λe^(−λx), x > 0", note: "Formule : X ~ exp(λ)", noEq: true }], rule: "Si g est strictement monotone sur le support, f_Y(y) = f_X(g⁻¹(y))·|dg⁻¹/dy| sur g(support), 0 ailleurs. Autre voie : F_Y(y) = Pr(g(X) ≤ y), puis dériver. Cas particuliers : Y = aX ⇒ f_Y(y) = f_X(y/a)/|a| ; Z ~ N(0, 1) ⇒ Z² ~ χ²(1) ; U ~ U(0, 1) ⇒ F⁻¹(U) ~ F (échantillonnage)." },
  }),
  S('p-joint-disc', 15, {
    prereqs: ["p-disc-pmf", "p-indep"], icon: "p(x,y)", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Loi conjointe discrète",
    desc: "Un tableau p(x, y).",
    prereqWhy: {"p-disc-pmf": "les marginales sont des fonctions de masse", "p-indep": "indépendance vérifiée case par case"},
    intro: { lines: [{ html: "p(0, 0) = 0,1 ≠ 0,4 · 0,3 = 0,12", note: "Une case suffit : dépendants", noEq: true }, { html: "cov = E[XY] − E[X]E[Y] = 0,6 − 0,6 · 1 = 0", note: "Non corrélés quand même", noEq: true }], rule: "Un tableau p(x, y). Marginales : sommes des lignes et des colonnes. Conditionnelle : p(x | y) = p(x, y)/p_Y(y). Indépendance : p(x, y) = p_X(x)·p_Y(y) <b>pour toutes</b> les cases (une case fausse suffit pour dire non). cov(X, Y) = E[XY] − E[X]E[Y]." },
  }),
  S('p-joint-cont', 15, {
    prereqs: ["p-cont-density", "a2-fubini-rect", "a2-domain-describe", "a2-improper-multi"], icon: "f(x,y)", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Densité conjointe : constante, marginales, indépendance",
    desc: "∬ f = 1 sur le support ; marginale f_X(x) = ∫ f(x, y) dy, avec des bornes qui peuvent dépendre de x ; indépendance ⇔ f(x, y) =…",
    prereqWhy: {"p-cont-density": "chaque marginale est une densité", "a2-fubini-rect": "intégrales itérées sur un rectangle", "a2-domain-describe": "bornes de y en fonction de x (support triangulaire)", "a2-improper-multi": "support ]0 ; ∞[² des noyaux exponentiels"},
    intro: { lines: [{ html: "f(w, z) = c·w(w + z) sur [0 ; 3]²", note: "Densité conjointe", noEq: true }, { html: "∫₀³ (w² + wz) dz = 3w² + 9w/2", note: "Intégrale intérieure", noEq: true }, { html: "c · 189/4 = 1, c = 4/189", note: "Intégrale extérieure, puis c", noEq: true }], rule: "∬ f = 1 sur le support ; marginale f_X(x) = ∫ f(x, y) dy, avec des bornes qui peuvent dépendre de x ; indépendance ⇔ f(x, y) = f_X(x)·f_Y(y), ce qui demande que f se factorise <b>et</b> que le support soit un rectangle." },
  }),
  S('p-lin-combo', 15, {
    prereqs: ["p-moments"], icon: "aX+bY", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Combinaisons linéaires : espérance, variance, covariance",
    desc: "E[aX + bY + c] = aE[X] + bE[Y] + c, toujours.",
    prereqWhy: {"p-moments": "E et var de chaque variable"},
    intro: { lines: [{ html: "E[X_A + 2X_B + X_C] = 2 + 2 · 3 − 1 = 7", note: "Linéarité", noEq: true }, { html: "var = 3 + 2² · 2 + 6 + 2[0 + 2 · (−2) + 2 · 1] = 13", note: "Coefficients au carré, puis les covariances", noEq: true }], rule: "E[aX + bY + c] = aE[X] + bE[Y] + c, toujours. var(aX + bY) = a²var(X) + b²var(Y) + 2ab·cov(X, Y). cov(X, Y) = E[XY] − E[X]E[Y] ; indépendants ⇒ cov = 0. Pour X, Y indépendants : var(XY) = E[X²]E[Y²] − (E[X]E[Y])². Moyenne de n variables iid : var(X̄) = σ²/n." },
  }),
];
