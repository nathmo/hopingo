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
    desc: "Corr(X, Y) = cov(X, Y)/(σ_X σ_Y) ∈ [−1 ; 1].",
    prereqWhy: {"p-joint-disc": "E[XY] sur un tableau conjoint"},
    intro: { rule: "Corr(X, Y) = cov(X, Y)/(σ_X σ_Y) ∈ [−1 ; 1]. cov(aX + b, cY + d) = ac·cov(X, Y) ; corr(aX + b, cY + d) = signe(ac)·corr(X, Y). La corrélation mesure une association <b>linéaire</b> ; elle ne dit rien de la cause (variable cachée, hasard, sens inverse). cov(X + Y, X − Y) = var X − var Y." },
  }),
  S('p-total-expect', 15, {
    prereqs: ["p-moments", "p-cond-total", "p-binom"], icon: "E[E[·|·]]", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234"],
    title: "Espérance et variance totales",
    desc: "E[X] = E[E[X | Y]] = Σ_y E[X | Y = y]·Pr(Y = y).",
    prereqWhy: {"p-moments": "E[X | Y = y] et var(X | Y = y) de chaque loi conditionnelle"},
    intro: { rule: "E[X] = E[E[X | Y]] = Σ_y E[X | Y = y]·Pr(Y = y). var(X) = E[var(X | Y)] + var(E[X | Y]) : la moyenne des variances, plus la variance des moyennes." },
  }),
  S('p-sum-mixture', 16, {
    prereqs: ["p-joint-cont", "p-total-expect"], icon: "f∗g", examWeight: 1, exam: ["mcq", "tf"], tags: ["EE-209"],
    title: "Densité d'une somme ; mélange de gaussiennes",
    desc: "X, Y indépendantes, Z = X + Y : p_Z(z) = Σ_y p_X(z − y)p_Y(y) (discret), f_Z(z) = ∫ f_X(z − y)f_Y(y) dy (continu), bornes tirées des…",
    prereqWhy: {"p-joint-cont": "f_X(z − y)f_Y(y) est une densité conjointe intégrée en y"},
    intro: { rule: "X, Y indépendantes, Z = X + Y : p_Z(z) = Σ_y p_X(z − y)p_Y(y) (discret), f_Z(z) = ∫ f_X(z − y)f_Y(y) dy (continu), bornes tirées des deux supports. Mélange : on tire la composante k avec la probabilité πₖ, puis X selon fₖ ; la densité est Σ πₖ fₖ, ce n'est <b>pas</b> la loi de Σ πₖ Xₖ. E = Σ πₖ μₖ ; var = Σ πₖ(σₖ² + μₖ²) − E². a₁X₁ + a₂X₂ ~ N(a₁μ₁ + a₂μ₂, a₁²σ₁² + a₂²σ₂²) si les Xᵢ sont normales indépendantes." },
  }),
  S('p-markov-cheb', 15, {
    prereqs: ["p-moments", "p-normal-std"], icon: "≤1/k²", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Markov, Tchebychev, loi des grands nombres",
    desc: "Markov : si X ≥ 0, Pr(X ≥ a) ≤ E[X]/a.",
    prereqWhy: {"p-moments": "E[X] et σ dans les bornes"},
    intro: { rule: "Markov : si X ≥ 0, Pr(X ≥ a) ≤ E[X]/a. Tchebychev : Pr(|X − μ| ≥ kσ) ≤ 1/k². Loi des grands nombres : X̄ₙ → μ, car var(X̄ₙ) = σ²/n → 0. Elle ne « compense » pas les écarts passés : après 5 piles, face n'est pas plus probable (erreur du joueur)." },
  }),
  S('p-clt-sum', 15, {
    prereqs: ["p-normal-std", "p-lin-combo"], icon: "TCL", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Théorème central limite pour une somme ou une moyenne",
    desc: "X₁, …, Xₙ iid d'espérance μ et de variance σ² : pour n grand, Sₙ = ΣXᵢ ≈ N(nμ, nσ²) et X̄ ≈ N(μ, σ²/n).",
    intro: { rule: "X₁, …, Xₙ iid d'espérance μ et de variance σ² : pour <b>n</b> grand, Sₙ = ΣXᵢ ≈ N(nμ, nσ²) et X̄ ≈ N(μ, σ²/n). La condition porte sur la taille de l'<b>échantillon</b>, pas sur la population, et la population n'a pas besoin d'être normale. L'écart-type de la somme est σ√n, pas nσ." },
  }),
  S('p-clt-binom', 15, {
    prereqs: ["p-clt-sum", "p-binom", "p-poisson"], icon: "B≈N", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Approximation normale de la binomiale et de Poisson",
    desc: "X ~ B(n, p) est une somme de n Bernoulli ; pour n grand, X ≈ N(np, np(1 − p)) et p̂ = X/n ≈ N(p, p(1 − p)/n).",
    prereqWhy: {"p-clt-sum": "le TCL appliqué à une somme de Bernoulli", "p-poisson": "Poiss(λ) ≈ N(λ, λ)"},
    intro: { rule: "X ~ B(n, p) est une somme de n Bernoulli ; pour n grand, X ≈ N(np, np(1 − p)) et p̂ = X/n ≈ N(p, p(1 − p)/n). Poiss(λ) ≈ N(λ, λ) pour λ grand. Le cours n'applique <b>pas</b> de correction de continuité." },
  }),
  S('p-mom', 15, {
    prereqs: ["p-moments"], icon: "θ̂ MM", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Méthode des moments",
    desc: "On égale les moments théoriques aux moments empiriques et on résout en θ : E[X] = x̄ ; avec deux paramètres, var(X) = σ̂² = (1/n)Σ(xᵢ −…",
    intro: { rule: "On égale les moments théoriques aux moments empiriques et on résout en θ : E[X] = x̄ ; avec deux paramètres, var(X) = σ̂² = (1/n)Σ(xᵢ − x̄)² (diviseur <b>n</b>)." },
  }),
  S('p-mle', 15, {
    prereqs: ["p-disc-pmf", "p-cont-density", "g2-log-rules", "g6-deriv-rules"], icon: "θ̂ MV", examWeight: 3, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234", "EE-209"],
    title: "Maximum de vraisemblance, étape par étape",
    desc: "L(θ) = Π f(xᵢ ; θ) ; ℓ(θ) = ln L(θ) = Σ ln f(xᵢ ; θ) ; on résout ℓ′(θ̂) = 0 ; on vérifie que c'est un maximum (ℓ″ < 0 partout, ou…",
    intro: { rule: "L(θ) = Π f(xᵢ ; θ) ; ℓ(θ) = ln L(θ) = Σ ln f(xᵢ ; θ) ; on résout ℓ′(θ̂) = 0 ; on <b>vérifie</b> que c'est un maximum (ℓ″ < 0 partout, ou point stationnaire unique avec ℓ″(θ̂) < 0) ; enfin θ̂ ≈ N(θ, 1/J(θ̂)) avec J(θ̂) = −ℓ″(θ̂), d'où l'IC de Wald θ̂ ± z/√J(θ̂)." },
  }),
  S('p-mle-special', 15, {
    prereqs: ["p-mle"], icon: "max xᵢ", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "MLE au bord du support ; invariance",
    desc: "Si le support dépend de θ, ℓ′ = 0 ne marche pas.",
    intro: { rule: "Si le support dépend de θ, ℓ′ = 0 ne marche pas. U[0, θ] : L(θ) = θ⁻ⁿ·1{θ ≥ max xᵢ}, décroissante sur [max xᵢ ; ∞[, donc θ̂ = max xᵢ. Invariance : le MLE de g(θ) est g(θ̂)." },
  }),
  S('p-bias-mse', 15, {
    prereqs: ["p-mom", "p-mle", "p-lin-combo"], icon: "EQM", examWeight: 2, exam: ["mcq", "tf"], tags: ["MATH-234", "EE-209"],
    title: "Biais, variance, erreur quadratique moyenne, consistance",
    desc: "Biais(θ̂) = E[θ̂] − θ ; EQM = E[(θ̂ − θ)²] = var(θ̂) + biais² ; θ̂ est consistant s'il tend vers θ en probabilité (il suffit que l'EQM…",
    prereqWhy: {"p-mom": "biais de l'estimateur des moments", "p-mle": "biais de l'estimateur du maximum de vraisemblance"},
    intro: { rule: "Biais(θ̂) = E[θ̂] − θ ; EQM = E[(θ̂ − θ)²] = var(θ̂) + biais² ; θ̂ est consistant s'il tend vers θ en probabilité (il suffit que l'EQM tende vers 0). X̄ est sans biais pour μ ; σ̂²_ML a pour espérance (n − 1)σ²/n ; s² est sans biais." },
  }),
  S('p-fisher-cr', 16, {
    prereqs: ["p-mle", "p-bias-mse"], icon: "I(θ)", examWeight: 1, exam: ["mcq", "tf"], tags: ["EE-209"],
    title: "Information de Fisher, Cramér-Rao",
    desc: "Score s(θ) = ℓ′(θ) ; information par observation I₁(θ) = Var(score d'une observation) = −E[∂²ln f(X ; θ)/∂θ²] ; pour n observations iid,…",
    prereqWhy: {"p-bias-mse": "Cramér-Rao borne la variance d'un estimateur sans biais"},
    intro: { rule: "Score s(θ) = ℓ′(θ) ; information par observation I₁(θ) = Var(score d'une observation) = −E[∂²ln f(X ; θ)/∂θ²] ; pour n observations iid, I(θ) = n·I₁(θ). Cramér-Rao : tout estimateur <b>sans biais</b> vérifie Var(θ̂) ≥ 1/(n·I₁(θ)). Le MLE vérifie √n(θ̂ − θ) → N(0, I₁(θ)⁻¹)." },
  }),
];
