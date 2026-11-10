// Module P, part c (unit `proba`, step U7). Catalogue:
// docs/universite/P-probabilites.md. Skills: p-cov-corr, p-total-expect, p-sum-mixture, p-markov-cheb, p-clt-sum, p-clt-binom, p-mom, p-mle, p-mle-special, p-bias-mse, p-fisher-cr.
// Generators: proba-c.js; traps: js/cas/rules/pc.js. Prerequisites of
// the algebra plan: @alg:A-arrondir = cm-round, @alg:J-pourcentage =
// pct-which, @alg:F-isoler = iso-formula. A2 (step U6) goes through UNBUILT.

const S = (id, year, rest) => ({ id, unit: 'proba', year, optional: false, needsSolo: true, ...rest });

export const SKILLS = [
  S('p-cov-corr', 15, {
    prereqs: ["p-lin-combo", "p-joint-disc"], icon: "ρ", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Covariance, corrélation ; corrélation et causalité",
    desc: "Covariance et corrélation, leur comportement sous une transformation affine, et pourquoi corrélation n'est pas causalité.",
    prereqWhy: {"p-joint-disc": "E[XY] sur un tableau conjoint"},
    intro: { rule: "La corrélation corr(X, Y) = cov(X, Y)/(σ_X σ_Y) ∈ [−1 ; 1]. cov(aX + b, cY + d) = ac·cov(X, Y) ; corr(aX + b, cY + d) = signe(ac)·corr(X, Y). La corrélation mesure une association <b>linéaire</b> ; elle ne dit rien de la cause (variable cachée, hasard, sens inverse). cov(X + Y, X − Y) = var X − var Y.", lines: [{ html: "var X = 4, var Y = 9, cov(X, Y) = 3", note: "Données", noEq: true }, { html: "corr(X, Y) = 3/(2 · 3) = 0,5", note: "Normaliser", noEq: true }, { html: "cov(2X + 1, −Y) = 2 · (−1) · 3 = −6", note: "Sortir les constantes", noEq: true }, { html: "corr(2X + 1, −Y) = −0,5", note: "Seul le signe de ac compte", noEq: true }] },
  }),
  S('p-total-expect', 15, {
    prereqs: ["p-moments", "p-cond-total", "p-binom"], icon: "E[E[·|·]]", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234"],
    title: "Espérance et variance totales",
    desc: "Espérance et variance totales : E[X] = E[E[X | Y]] et var(X) = E[var(X | Y)] + var(E[X | Y]).",
    prereqWhy: {"p-moments": "E[X | Y = y] et var(X | Y = y) de chaque loi conditionnelle"},
    intro: { rule: "E[X] = E[E[X | Y]] = Σ_y E[X | Y = y]·Pr(Y = y). var(X) = E[var(X | Y)] + var(E[X | Y]) : la moyenne des variances, plus la variance des moyennes.", lines: [{ html: "N | Mary ~ B(5 ; 0,5) ; N | Frank ~ B(5 ; 0,7)", note: "Lois conditionnelles", noEq: true }, { html: "E[N] = 0,6 · 2,5 + 0,4 · 3,5 = 2,9", note: "Espérance totale", noEq: true }, { html: "E[var(N | ·)] = 0,6 · 1,25 + 0,4 · 1,05 = 1,17", note: "Moyenne des variances", noEq: true }, { html: "var(E[N | ·]) = 0,6 · 0,4 · 1² = 0,24 ; var(N) = 1,41", note: "Variance des moyennes, puis le total", noEq: true }] },
  }),
  S('p-sum-mixture', 16, {
    prereqs: ["p-joint-cont", "p-total-expect"], icon: "f∗g", examWeight: 1, exam: ["mcq", "tf"], tags: ["EE-209"],
    title: "Densité d'une somme ; mélange de gaussiennes",
    desc: "La loi d'une somme de variables indépendantes (convolution), et la différence entre un mélange et une somme pondérée.",
    prereqWhy: {"p-joint-cont": "f_X(z − y)f_Y(y) est une densité conjointe intégrée en y"},
    intro: { rule: "X, Y indépendantes, Z = X + Y : p_Z(z) = Σ_y p_X(z − y)p_Y(y) (discret), f_Z(z) = ∫ f_X(z − y)f_Y(y) dy (continu), bornes tirées des deux supports. Mélange : on tire la composante k avec la probabilité πₖ, puis X selon fₖ ; la densité est Σ πₖ fₖ, ce n'est <b>pas</b> la loi de Σ πₖ Xₖ. E = Σ πₖ μₖ ; var = Σ πₖ(σₖ² + μₖ²) − E². a₁X₁ + a₂X₂ ~ N(a₁μ₁ + a₂μ₂, a₁²σ₁² + a₂²σ₂²) si les Xᵢ sont normales indépendantes.", lines: [{ html: "Mélange 0,3·N(0, 1) + 0,7·N(4, 1)", note: "Données", noEq: true }, { html: "E[X] = 0,3 · 0 + 0,7 · 4 = 2,8", note: "Moyenne pondérée", noEq: true }, { html: "E[X²] = 0,3 · 1 + 0,7 · 17 = 12,2 ; var = 12,2 − 2,8² = 4,36", note: "Seconds moments", noEq: true }, { html: "0,3X₁ + 0,7X₂ : var = 0,09 + 0,49 = 0,58", note: "Un autre objet", noEq: true }] },
  }),
  S('p-markov-cheb', 15, {
    prereqs: ["p-moments", "p-normal-std"], icon: "≤1/k²", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Markov, Tchebychev, loi des grands nombres",
    desc: "Les bornes de Markov et de Tchebychev, et ce que dit (ou ne dit pas) la loi des grands nombres.",
    prereqWhy: {"p-moments": "E[X] et σ dans les bornes"},
    intro: { rule: "Markov : si X ≥ 0, Pr(X ≥ a) ≤ E[X]/a. Tchebychev : Pr(|X − μ| ≥ kσ) ≤ 1/k². Loi des grands nombres : X̄ₙ → μ, car var(X̄ₙ) = σ²/n → 0. Elle ne « compense » pas les écarts passés : après 5 piles, face n'est pas plus probable (erreur du joueur).", lines: [{ html: "X ≥ 0, E[X] = 5 : Pr(X ≥ 20) ≤ 5/20 = 1/4", note: "Markov", noEq: true }, { html: "Y : μ = 50, σ = 5 ; |Y − 50| ≥ 10 est un écart de 2σ", note: "Écart en σ", noEq: true }, { html: "Pr(|Y − 50| ≥ 10) ≤ 1/2² = 1/4", note: "Tchebychev", noEq: true }, { html: "Si Y est normale : 2(1 − Φ(2)) = 0,046", note: "La borne est large", noEq: true }] },
  }),
  S('p-clt-sum', 15, {
    prereqs: ["p-normal-std", "p-lin-combo"], icon: "TCL", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Théorème central limite pour une somme ou une moyenne",
    desc: "Le théorème central limite pour une somme ou une moyenne : E[S] = nμ, sd(S) = σ√n, puis la table de Φ.",
    intro: { rule: "X₁, …, Xₙ iid d'espérance μ et de variance σ² : pour <b>n</b> grand, Sₙ = ΣXᵢ ≈ N(nμ, nσ²) et X̄ ≈ N(μ, σ²/n). La condition porte sur la taille de l'<b>échantillon</b>, pas sur la population, et la population n'a pas besoin d'être normale. L'écart-type de la somme est σ√n, pas nσ.", lines: [{ html: "16 personnes, μ = 70 kg, σ = 20 kg", note: "Données", noEq: true }, { html: "E[S] = 16 · 70 = 1 120 ; sd(S) = √16 · 20 = 80", note: "Somme", noEq: true }, { html: "z = (1 280 − 1 120)/80 = 2", note: "Standardiser", noEq: true }, { html: "Pr(S > 1 280) ≈ 1 − Φ(2) = 0,023", note: "TCL et table", noEq: true }] },
  }),
  S('p-clt-binom', 15, {
    prereqs: ["p-clt-sum", "p-binom", "p-poisson"], icon: "B≈N", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Approximation normale de la binomiale et de Poisson",
    desc: "Approcher une binomiale ou une loi de Poisson par une normale de même espérance et de même variance.",
    prereqWhy: {"p-clt-sum": "le TCL appliqué à une somme de Bernoulli", "p-poisson": "Poiss(λ) ≈ N(λ, λ)"},
    intro: { rule: "X ~ B(n, p) est une somme de n Bernoulli ; pour n grand, X ≈ N(np, np(1 − p)) et p̂ = X/n ≈ N(p, p(1 − p)/n). Poiss(λ) ≈ N(λ, λ) pour λ grand. Le cours n'applique <b>pas</b> de correction de continuité.", lines: [{ html: "X ~ B(100 ; 0,5)", note: "Données", noEq: true }, { html: "E[X] = 50 ; var(X) = 25 ; σ = 5", note: "Paramètres", noEq: true }, { html: "z = (60 − 50)/5 = 2", note: "Standardiser", noEq: true }, { html: "Pr(X ≥ 60) ≈ 1 − Φ(2) = 0,023", note: "Table", noEq: true }] },
  }),
  S('p-mom', 15, {
    prereqs: ["p-moments"], icon: "θ̂ MM", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Méthode des moments",
    desc: "Estimer un paramètre en égalant les moments théoriques aux moments empiriques.",
    intro: { rule: "On égale les moments théoriques aux moments empiriques et on résout en θ : E[X] = x̄ ; avec deux paramètres, var(X) = σ̂² = (1/n)Σ(xᵢ − x̄)² (diviseur <b>n</b>).", lines: [{ html: "Γ(k, θ), données 2, 2, 4, 8, 10, 10", note: "Données", noEq: true }, { html: "x̄ = 6 ; σ̂² = 72/6 = 12", note: "Moments empiriques (diviseur n)", noEq: true }, { html: "kθ = 6 ; kθ² = 12", note: "Égaler", noEq: true }, { html: "θ̂ = 12/6 = 2 ; k̂ = 6/2 = 3", note: "Isoler", noEq: true }] },
  }),
  S('p-mle', 15, {
    prereqs: ["p-disc-pmf", "p-cont-density", "g2-log-rules", "g6-deriv-rules"], icon: "θ̂ MV", examWeight: 3, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234", "EE-209"],
    title: "Maximum de vraisemblance, étape par étape",
    desc: "Le maximum de vraisemblance pas à pas : L, ℓ = ln L, ℓ′ = 0, vérifier le maximum par ℓ″, puis l'erreur standard.",
    prereqWhy: { "p-disc-pmf": "L(θ) = Π f(xᵢ ; θ) avec une fonction de masse (Poisson, Bernoulli, géométrique)", "p-cont-density": "L(θ) = Π f(xᵢ ; θ) avec une densité (exponentielle)" },
    intro: { rule: "L(θ) = Π f(xᵢ ; θ) ; ℓ(θ) = ln L(θ) = Σ ln f(xᵢ ; θ) ; on résout ℓ′(θ̂) = 0 ; on <b>vérifie</b> que c'est un maximum (ℓ″ < 0 partout, ou point stationnaire unique avec ℓ″(θ̂) < 0) ; enfin θ̂ ≈ N(θ, 1/J(θ̂)) avec J(θ̂) = −ℓ″(θ̂), d'où l'IC de Wald θ̂ ± z/√J(θ̂).", lines: [{ html: "X₁, …, X₁₆ iid exp(λ), Σxᵢ = 8 : L(λ) = λ¹⁶e^(−8λ)", note: "Vraisemblance", noEq: true }, { html: "ℓ(λ) = 16 ln λ − 8λ ; ℓ′(λ) = 16/λ − 8", note: "Logarithme, dériver", noEq: true }, { html: "ℓ′(λ̂) = 0 ⇒ λ̂ = 2 ; ℓ″(λ) = −16/λ² < 0", note: "Annuler, vérifier le maximum", noEq: true }, { html: "J(λ̂) = 4 ; se = 1/2 ; IC₉₅ = 2 ± 1,96 · 0,5 = [1,02 ; 2,98]", note: "Wald", noEq: true }] },
  }),
  S('p-mle-special', 15, {
    prereqs: ["p-mle"], icon: "max xᵢ", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "MLE au bord du support ; invariance",
    desc: "Quand le support dépend de θ, le maximum est au bord (θ̂ = max xᵢ) ; et le MLE de g(θ) est g(θ̂).",
    intro: { rule: "Si le support dépend de θ, ℓ′ = 0 ne marche pas. U[0, θ] : L(θ) = θ⁻ⁿ·1{θ ≥ max xᵢ}, décroissante sur [max xᵢ ; ∞[, donc θ̂ = max xᵢ. Invariance : le MLE de g(θ) est g(θ̂).", lines: [{ html: "Données 3, 7, 2, 9, 5 iid U[0, θ]", note: "Données", noEq: true }, { html: "L(θ) = θ⁻⁵ si θ ≥ 9, 0 sinon", note: "Vraisemblance avec support", noEq: true }, { html: "ℓ′ = −5/θ ≠ 0 : L décroît sur [9 ; ∞[, θ̂ = 9", note: "Bord du support", noEq: true }, { html: "MLE de Pr(X ≤ 3) = 3/θ̂ = 1/3", note: "Invariance", noEq: true }] },
  }),
  S('p-bias-mse', 15, {
    prereqs: ["p-mom", "p-mle", "p-lin-combo"], icon: "EQM", examWeight: 2, exam: ["mcq", "tf"], tags: ["MATH-234", "EE-209"],
    title: "Biais, variance, erreur quadratique moyenne, consistance",
    desc: "Biais, variance et erreur quadratique moyenne d'un estimateur, et consistance.",
    prereqWhy: {"p-mom": "biais de l'estimateur des moments", "p-mle": "biais de l'estimateur du maximum de vraisemblance"},
    intro: { rule: "Le biais vaut biais(θ̂) = E[θ̂] − θ ; EQM = E[(θ̂ − θ)²] = var(θ̂) + biais² ; θ̂ est consistant s'il tend vers θ en probabilité (il suffit que l'EQM tende vers 0). X̄ est sans biais pour μ ; σ̂²_ML a pour espérance (n − 1)σ²/n ; s² est sans biais.", lines: [{ html: "Y de densité 3y²/θ³ sur ]0 ; θ[ : E[Y] = 3θ/4", note: "Espérance", noEq: true }, { html: "biais(Ȳ) = −θ/4 ; θ̂ = (4/3)Ȳ est sans biais", note: "Corriger", noEq: true }, { html: "var(Y) = 3θ²/5 − 9θ²/16 = 3θ²/80", note: "Variance", noEq: true }, { html: "var(θ̂) = (16/9) · (3θ²/80)/n = θ²/(15n) → 0 : consistant", note: "Constante au carré, ÷ n", noEq: true }] },
  }),
  S('p-fisher-cr', 16, {
    prereqs: ["p-mle", "p-bias-mse"], icon: "I(θ)", examWeight: 1, exam: ["mcq", "tf"], tags: ["EE-209"],
    title: "Information de Fisher, Cramér-Rao",
    desc: "L'information de Fisher I(θ) = n·I₁(θ) et la borne de Cramér-Rao des estimateurs sans biais.",
    prereqWhy: {"p-bias-mse": "Cramér-Rao borne la variance d'un estimateur sans biais"},
    intro: { rule: "Le score est s(θ) = ℓ′(θ) ; information par observation I₁(θ) = Var(score d'une observation) = −E[∂²ln f(X ; θ)/∂θ²] ; pour n observations iid, I(θ) = n·I₁(θ). Cramér-Rao : tout estimateur <b>sans biais</b> vérifie Var(θ̂) ≥ 1/(n·I₁(θ)). Le MLE vérifie √n(θ̂ − θ) → N(0, I₁(θ)⁻¹).", lines: [{ html: "X ~ Poiss(λ) : ln f = x ln λ − λ − ln x!", note: "Log-densité", noEq: true }, { html: "∂² ln f/∂λ² = −x/λ²", note: "Dériver deux fois", noEq: true }, { html: "I₁(λ) = E[X]/λ² = 1/λ", note: "Espérance", noEq: true }, { html: "borne = λ/n = var(X̄) : X̄ est efficace", note: "Cramér-Rao", noEq: true }] },
  }),
];
