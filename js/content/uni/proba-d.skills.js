// Module P, part d (unit `proba`, step U7). Catalogue:
// docs/universite/P-probabilites.md. Skills: p-ci-mean, p-ci-wald, p-ci-round, p-max-sample, p-test-setup, p-test-power, p-test-z, p-test-t1, p-test-t2, p-test-two-prop.
// Generators: proba-d.js; traps: js/cas/rules/pd.js. Prerequisites of
// the algebra plan: @alg:A-arrondir = cm-round, @alg:J-pourcentage =
// pct-which, @alg:F-isoler = iso-formula. A2 (step U6) goes through UNBUILT.

const S = (id, year, rest) => ({ id, unit: 'proba', year, optional: false, needsSolo: true, ...rest });

export const SKILLS = [
  S('p-ci-mean', 15, {
    prereqs: ["p-normal-inverse", "p-clt-sum", "p-desc-summary"], icon: "IC μ", examWeight: 2, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "IC pour une moyenne : z ou Student",
    desc: "Σ connu : x̄ ± z₁₋α/₂·σ/√n.",
    prereqWhy: {"p-clt-sum": "données non normales : X̄ approximativement normale"},
    intro: { rule: "Σ connu : x̄ ± z₁₋α/₂·σ/√n. σ inconnu et données normales : pivot T = (X̄ − μ)/(S/√n) ~ t_{n−1}, d'où x̄ ± t·s/√n avec ν = n − 1 (ν ≥ 200 : quantile normal). Données non normales, n grand : x̄ ± z·s/√n (asymptotique)." },
  }),
  S('p-ci-wald', 15, {
    prereqs: ["p-ci-mean", "p-mle"], icon: "Wald", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234", "EE-209"],
    title: "IC de Wald (avec −ℓ″) et de Wilson",
    desc: "Θ̂_ML ≈ N(θ, 1/J(θ̂)) avec J(θ̂) = −ℓ″(θ̂) (MATH-234) ou I(θ̂) = n·I₁(θ̂) (EE-209) : IC de Wald θ̂ ± z₁₋α/₂/√J(θ̂).",
    prereqWhy: {"p-ci-mean": "même forme θ̂ ± z·se"},
    intro: { rule: "Θ̂_ML ≈ N(θ, 1/J(θ̂)) avec J(θ̂) = −ℓ″(θ̂) (MATH-234) ou I(θ̂) = n·I₁(θ̂) (EE-209) : IC de Wald θ̂ ± z₁₋α/₂/√J(θ̂). Bernoulli : p̂ ± z·√(p̂(1 − p̂)/n). Wilson (EE-209) inverse n(p̂ − p)²/(p(1 − p)) ≤ z² : centre p̃ = (np̂ + z²/2)/(n + z²), demi-largeur z√n/(n + z²)·√(p̂(1 − p̂) + z²/(4n)). Wald est peu fiable si p̂ est près de 0 ou 1, ou si n est petit." },
  }),
  S('p-ci-round', 16, {
    prereqs: ["p-ci-mean", "cm-round"], icon: "[⌊ ; ⌉]", examWeight: 1, exam: ["mcq", "tf"], tags: ["EE-209"],
    title: "Arrondir un IC (chiffres significatifs)",
    desc: "Règle EE-209 (partie 3b, rappelée dans les « Tables ») : u avec 2 chiffres significatifs (1 accepté si son premier chiffre est 4 à 9) ;…",
    prereqWhy: {"p-ci-mean": "l'IC à arrondir"},
    intro: { rule: "Règle EE-209 (partie 3b, rappelée dans les « Tables ») : u avec 2 chiffres significatifs (1 accepté si son premier chiffre est 4 à 9) ; θ̂ et les bornes avec la même dernière décimale que u ; borne inférieure arrondie <b>vers le bas</b>, borne supérieure <b>vers le haut</b>. On arrondit les bornes calculées avec les valeurs <b>non arrondies</b>." },
  }),
  S('p-max-sample', 15, {
    prereqs: ["p-cont-quantile", "p-indep", "p-mle-special"], icon: "M = max", examWeight: 1, exam: ["mcq", "coef", "open"], tags: ["MATH-234"],
    title: "Maximum d'un échantillon ; IC exact",
    desc: "M = max Xᵢ pour X₁, …, Xₙ iid : F_M(x) = Pr(tous ≤ x) = F(x)ⁿ, f_M = n·F^(n−1)·f.",
    prereqWhy: {"p-mle-special": "le MLE de U[0, θ] est le maximum"},
    intro: { rule: "M = max Xᵢ pour X₁, …, Xₙ iid : F_M(x) = Pr(tous ≤ x) = F(x)ⁿ, f_M = n·F^(n−1)·f. Minimum : 1 − (1 − F)ⁿ. Pour U[0, θ], M/θ a pour fonction de répartition uⁿ sur [0 ; 1] : c'est un pivot, et Pr(α^(1/n) ≤ M/θ ≤ 1) = 1 − α donne l'IC <b>exact</b> θ ∈ [M ; M·α^(−1/n)]." },
  }),
  S('p-test-setup', 15, {
    prereqs: ["p-normal-std"], icon: "H₀/H₁", examWeight: 1, exam: ["mcq", "tf"], tags: ["MATH-234", "EE-209"],
    title: "Formuler un test : H₀, H₁, région critique, p-valeur",
    desc: "H₀ est l'hypothèse gardée par défaut (souvent une égalité, le statu quo) ; H₁ est ce que l'on cherche à établir.",
    intro: { rule: "H₀ est l'hypothèse gardée par défaut (souvent une égalité, le statu quo) ; H₁ est ce que l'on cherche à établir. Unilatéral si seul un sens intéresse (« dépasse le seuil »). Au niveau α, la région critique R vérifie Pr₀(T ∈ R) = α. p-valeur : probabilité, sous H₀, d'une statistique au moins aussi extrême que t_obs ; bilatéral : p_obs = 2(1 − Φ(|t_obs|)). On rejette H₀ ⇔ t_obs ∈ R ⇔ p_obs < α. Bilatéral : rejet au niveau α ⇔ θ₀ hors de l'IC à 1 − α." },
  }),
  S('p-test-power', 15, {
    prereqs: ["p-test-setup", "p-normal-inverse"], icon: "1−β", examWeight: 2, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Erreurs de type 1 et 2, puissance",
    desc: "Erreur de type 1 : rejeter H₀ alors qu'elle est vraie (probabilité α).",
    prereqWhy: {"p-normal-inverse": "seuil critique donné par un quantile normal"},
    intro: { rule: "Erreur de type 1 : rejeter H₀ alors qu'elle est vraie (probabilité α). Type 2 : ne pas rejeter H₀ alors qu'elle est fausse (probabilité β). Puissance = 1 − β = Pr₁(rejeter). Test z unilatéral, H₁ : μ = μ₁ > μ₀ : β = Φ(z₁₋α − (μ₁ − μ₀)/(σ/√n)). La puissance augmente avec n, avec l'écart μ₁ − μ₀ et avec α. Rejeter H₀ quand H₁ est vraie n'est <b>pas</b> une erreur." },
  }),
  S('p-test-z', 15, {
    prereqs: ["p-test-setup", "p-clt-binom"], icon: "z", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Test z : σ connu, asymptotique, une proportion, Wald",
    desc: "Σ connu, données normales : T = (X̄ − μ₀)/(σ/√n) ~ N(0, 1) sous H₀.",
    prereqWhy: {"p-clt-binom": "p̂ ≈ N(p, p(1 − p)/n)"},
    intro: { rule: "Σ connu, données normales : T = (X̄ − μ₀)/(σ/√n) ~ N(0, 1) sous H₀. Asymptotique (n grand) : σ remplacé par s. Une proportion : T = (p̂ − p₀)/√(p₀(1 − p₀)/n) ; l'erreur standard calculée avec p̂ (test de Wald) est acceptée aussi, avec la note « c'est la version de Wald ». Wald pour un MLE (EE-209) : T = √(I(θ̂))·(θ̂ − θ₀)." },
  }),
  S('p-test-t1', 15, {
    prereqs: ["p-test-z", "p-ci-mean", "p-interpret"], icon: "t", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234", "EE-209"],
    title: "Test t à un échantillon ; données appariées",
    desc: "Données normales, σ inconnu : T = (X̄ − μ₀)/(S/√n) ~ t_{n−1} sous H₀ ; bilatéral à 5 % : rejet si |t_obs| > s₅(n − 1).",
    prereqWhy: {"p-test-z": "même démarche que le test z", "p-ci-mean": "quantile de Student et erreur standard S/√n"},
    intro: { rule: "Données normales, σ inconnu : T = (X̄ − μ₀)/(S/√n) ~ t_{n−1} sous H₀ ; bilatéral à 5 % : rejet si |t_obs| > s₅(n − 1). Données appariées (mêmes individus mesurés deux fois) : on calcule les différences dᵢ = yᵢ − xᵢ et on fait un test t à un échantillon sur d, avec H₀ : μ_d = 0." },
  }),
  S('p-test-t2', 15, {
    prereqs: ["p-test-t1"], icon: "t₂", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234"],
    title: "Test t à deux échantillons, variance poolée (et test F)",
    desc: "Deux échantillons normaux indépendants de même variance : s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2) ; T = (x̄₁ −…",
    prereqWhy: {"p-test-t1": "même statistique t, avec deux échantillons"},
    intro: { rule: "Deux échantillons normaux <b>indépendants</b> de même variance : s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2) ; T = (x̄₁ − x̄₂)/(s_p·√(1/n₁ + 1/n₂)) ~ t_{n₁+n₂−2} sous H₀ : μ₁ = μ₂. Avant, le cours vérifie l'égalité des variances par F = s₁²/s₂² ~ F_{n₁−1, n₂−1} (quantiles donnés par l'énoncé). Si ce test rejette, il faudrait le test de Welch, qui n'est pas au programme : l'item s'arrête et le dit." },
  }),
  S('p-test-two-prop', 15, {
    prereqs: ["p-test-z"], icon: "p₁−p₂", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234"],
    title: "Comparer deux proportions",
    desc: "H₀ : p₁ = p₂.",
    intro: { rule: "H₀ : p₁ = p₂. Sous H₀, on estime la proportion commune p̂ = (k₁ + k₂)/(n₁ + n₂) et T = (p̂₁ − p̂₂)/√(p̂(1 − p̂)(1/n₁ + 1/n₂)) ≈ N(0, 1)." },
  }),
];
