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
    desc: "Un intervalle de confiance pour une moyenne, avec un quantile normal si σ est connu, de Student sinon.",
    prereqWhy: {"p-clt-sum": "données non normales : X̄ approximativement normale"},
    intro: { rule: "σ connu : x̄ ± z₁₋α/₂·σ/√n. σ inconnu et données normales : pivot T = (X̄ − μ)/(S/√n) ~ t_{n−1}, d'où x̄ ± t·s/√n avec ν = n − 1 (ν ≥ 200 : quantile normal). Données non normales, n grand : x̄ ± z·s/√n (asymptotique).",
      lines: [{ html: "n = 9 mesures normales, x̄ = 20, s = 3", note: "Données", noEq: true }, { html: "σ inconnu : Student, ν = 8, t = s₅(8) = 2,306", note: "Pivot", noEq: true }, { html: "s/√n = 3/3 = 1", note: "Erreur standard", noEq: true }, { html: "IC₉₅ = 20 ± 2,306 = [17,694 ; 22,306]", note: "Bornes", noEq: true }] },
  }),
  S('p-ci-wald', 15, {
    prereqs: ["p-ci-mean", "p-mle"], icon: "Wald", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234", "EE-209"],
    title: "IC de Wald (avec −ℓ″) et de Wilson",
    desc: "Les intervalles de Wald (θ̂ ± z/√J(θ̂)) et de Wilson pour une proportion.",
    prereqWhy: {"p-ci-mean": "même forme θ̂ ± z·se"},
    intro: { rule: "θ̂_ML ≈ N(θ, 1/J(θ̂)) avec J(θ̂) = −ℓ″(θ̂) (MATH-234) ou I(θ̂) = n·I₁(θ̂) (EE-209) : IC de Wald θ̂ ± z₁₋α/₂/√J(θ̂). Bernoulli : p̂ ± z·√(p̂(1 − p̂)/n). Wilson (EE-209) inverse n(p̂ − p)²/(p(1 − p)) ≤ z² : centre p̃ = (np̂ + z²/2)/(n + z²), demi-largeur z√n/(n + z²)·√(p̂(1 − p̂) + z²/(4n)). Wald est peu fiable si p̂ est près de 0 ou 1, ou si n est petit.",
      lines: [{ html: "36 succès sur n = 100 : p̂ = 0,36", note: "MLE", noEq: true }, { html: "J = −ℓ″(p̂) = 100/(0,36 · 0,64)", note: "Information observée", noEq: true }, { html: "se = 1/√J = 0,048", note: "Erreur standard", noEq: true }, { html: "IC = 0,36 ± 1,96 · 0,048 = [0,266 ; 0,454]", note: "Bornes", noEq: true }] },
  }),
  S('p-ci-round', 16, {
    prereqs: ["p-ci-mean", "cm-round"], icon: "[⌊ ; ⌉]", examWeight: 1, exam: ["mcq", "tf"], tags: ["EE-209"],
    title: "Arrondir un IC (chiffres significatifs)",
    desc: "Arrondir un intervalle de confiance selon la règle d'EE-209 : u à 2 chiffres significatifs, bornes vers l'extérieur.",
    prereqWhy: {"p-ci-mean": "l'IC à arrondir"},
    intro: { rule: "Règle EE-209 (partie 3b, rappelée dans les « Tables ») : u avec 2 chiffres significatifs (1 accepté si son premier chiffre est 4 à 9) ; θ̂ et les bornes avec la même dernière décimale que u ; borne inférieure arrondie <b>vers le bas</b>, borne supérieure <b>vers le haut</b>. On arrondit les bornes calculées avec les valeurs <b>non arrondies</b>.",
      lines: [{ html: "θ̂ = 1,069871, u = 0,002415", note: "Valeurs brutes", noEq: true }, { html: "u = 0,0024 ; θ̂ = 1,0699", note: "2 chiffres significatifs, même précision", noEq: true }, { html: "θ̂ − u = 1,067456 → 1,0674 ; θ̂ + u = 1,072286 → 1,0723", note: "Vers le bas, vers le haut", noEq: true }, { html: "IC = [1,0674 ; 1,0723]", note: "Résultat", noEq: true }] },
  }),
  S('p-max-sample', 15, {
    prereqs: ["p-cont-quantile", "p-indep", "p-mle-special"], icon: "M = max", examWeight: 1, exam: ["mcq", "coef", "open"], tags: ["MATH-234"],
    title: "Maximum d'un échantillon ; IC exact",
    desc: "La loi du maximum d'un échantillon, F_M = Fⁿ, et l'intervalle de confiance exact qu'elle donne.",
    prereqWhy: {"p-mle-special": "le MLE de U[0, θ] est le maximum"},
    intro: { rule: "M = max Xᵢ pour X₁, …, Xₙ iid : F_M(x) = Pr(tous ≤ x) = F(x)ⁿ, f_M = n·F^(n−1)·f. Minimum : 1 − (1 − F)ⁿ. Pour U[0, θ], M/θ a pour fonction de répartition uⁿ sur [0 ; 1] : c'est un pivot, et Pr(α^(1/n) ≤ M/θ ≤ 1) = 1 − α donne l'IC <b>exact</b> θ ∈ [M ; M·α^(−1/n)].",
      lines: [{ html: "X₁, …, X₁₀ iid U[0, θ], M = 9", note: "Données", noEq: true }, { html: "F_M(x) = (x/θ)¹⁰ sur [0 ; θ]", note: "Tous ≤ x", noEq: true }, { html: "Pr(0,05^(1/10) ≤ M/θ ≤ 1) = 0,95", note: "Pivot M/θ", noEq: true }, { html: "θ ∈ [9 ; 9 · 0,05^(−1/10)] = [9 ; 12,14]", note: "IC exact", noEq: true }] },
  }),
  S('p-test-setup', 15, {
    prereqs: ["p-normal-std"], icon: "H₀/H₁", examWeight: 1, exam: ["mcq", "tf"], tags: ["MATH-234", "EE-209"],
    title: "Formuler un test : H₀, H₁, région critique, p-valeur",
    desc: "Formuler un test : H₀ et H₁, uni- ou bilatéral, région critique, p-valeur et décision.",
    intro: { rule: "H₀ est l'hypothèse gardée par défaut (souvent une égalité, le statu quo) ; H₁ est ce que l'on cherche à établir. Unilatéral si seul un sens intéresse (« dépasse le seuil »). Au niveau α, la région critique R vérifie Pr₀(T ∈ R) = α. p-valeur : probabilité, sous H₀, d'une statistique au moins aussi extrême que t_obs ; bilatéral : p_obs = 2(1 − Φ(|t_obs|)). On rejette H₀ ⇔ t_obs ∈ R ⇔ p_obs < α. Bilatéral : rejet au niveau α ⇔ θ₀ hors de l'IC à 1 − α.",
      lines: [{ html: "« p dépasse-t-elle 1/1 000 ? » : H₀ : p = 1/1 000 contre H₁ : p > 1/1 000", note: "Hypothèses", noEq: true }, { html: "Unilatéral à droite : R = [1,645 ; +∞[", note: "Région critique", noEq: true }, { html: "Bilatéral, t_obs = 2,1 : p_obs = 2(1 − Φ(2,1)) = 2(1 − 0,982) = 0,036", note: "p-valeur", noEq: true }, { html: "0,036 < 0,05 : rejet à 5 % ; 0,036 > 0,01 : pas de rejet à 1 %", note: "Décision", noEq: true }] },
  }),
  S('p-test-power', 15, {
    prereqs: ["p-test-setup", "p-normal-inverse"], icon: "1−β", examWeight: 2, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Erreurs de type 1 et 2, puissance",
    desc: "Erreurs de type 1 et 2, et puissance d'un test sous H₁.",
    prereqWhy: {"p-normal-inverse": "seuil critique donné par un quantile normal"},
    intro: { rule: "Erreur de type 1 : rejeter H₀ alors qu'elle est vraie (probabilité α). Type 2 : ne pas rejeter H₀ alors qu'elle est fausse (probabilité β). Puissance = 1 − β = Pr₁(rejeter). Test z unilatéral, H₁ : μ = μ₁ > μ₀ : β = Φ(z₁₋α − (μ₁ − μ₀)/(σ/√n)). La puissance augmente avec n, avec l'écart μ₁ − μ₀ et avec α. Rejeter H₀ quand H₁ est vraie n'est <b>pas</b> une erreur.",
      lines: [{ html: "H₀ : μ = 100, H₁ : μ = 103, σ = 10, n = 100, α = 5 %", note: "Données", noEq: true }, { html: "se = 1, t_c = 1,645, sous H₁ T ~ N(3, 1)", note: "Seuil et loi sous H₁", noEq: true }, { html: "β = Φ(1,645 − 3) = 1 − Φ(1,355) ≈ 0,09", note: "Erreur de type 2", noEq: true }, { html: "Puissance = 1 − β ≈ 0,91", note: "Puissance", noEq: true }] },
  }),
  S('p-test-z', 15, {
    prereqs: ["p-test-setup", "p-clt-binom"], icon: "z", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Test z : σ connu, asymptotique, une proportion, Wald",
    desc: "Le test z : σ connu, version asymptotique, une proportion, ou un MLE (Wald).",
    prereqWhy: {"p-clt-binom": "p̂ ≈ N(p, p(1 − p)/n)"},
    intro: { rule: "σ connu, données normales : T = (X̄ − μ₀)/(σ/√n) ~ N(0, 1) sous H₀. Asymptotique (n grand) : σ remplacé par s. Une proportion : T = (p̂ − p₀)/√(p₀(1 − p₀)/n) ; l'erreur standard calculée avec p̂ (test de Wald) est acceptée aussi, avec la note « c'est la version de Wald ». Wald pour un MLE (EE-209) : T = √(I(θ̂))·(θ̂ − θ₀).",
      lines: [{ html: "100 lancers, 60 piles ; H₀ : p = 0,5, bilatéral", note: "Hypothèses", noEq: true }, { html: "se₀ = √(0,5 · 0,5/100) = 0,05", note: "Sous H₀", noEq: true }, { html: "t_obs = (0,6 − 0,5)/0,05 = 2", note: "Statistique", noEq: true }, { html: "p_obs = 2(1 − Φ(2)) = 0,046 < 0,05 : rejet", note: "Décision", noEq: true }] },
  }),
  S('p-test-t1', 15, {
    prereqs: ["p-test-z", "p-ci-mean", "p-interpret"], icon: "t", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234", "EE-209"],
    title: "Test t à un échantillon ; données appariées",
    desc: "Le test t à un échantillon (σ inconnu), et sur les différences de données appariées.",
    prereqWhy: {"p-test-z": "même démarche que le test z", "p-ci-mean": "quantile de Student et erreur standard S/√n", "p-interpret": "la conclusion du test, posée après la dernière ligne (« Conclure et interpréter »)"},
    intro: { rule: "Données normales, σ inconnu : T = (X̄ − μ₀)/(S/√n) ~ t_{n−1} sous H₀ ; bilatéral à 5 % : rejet si |t_obs| > s₅(n − 1). Données appariées (mêmes individus mesurés deux fois) : on calcule les différences dᵢ = yᵢ − xᵢ et on fait un test t à un échantillon sur d, avec H₀ : μ_d = 0.",
      lines: [{ html: "86, 90, 84, 92, 88 ; H₀ : μ = 84", note: "Données", noEq: true }, { html: "x̄ = 88, s² = 40/4 = 10", note: "Résumés", noEq: true }, { html: "t_obs = 4/√(10/5) ≈ 2,83", note: "Statistique", noEq: true }, { html: "s₅(4) = 2,776 < 2,83 : rejet de H₀", note: "Décision", noEq: true }] },
  }),
  S('p-test-t2', 15, {
    prereqs: ["p-test-t1"], icon: "t₂", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234"],
    title: "Test t à deux échantillons, variance poolée (et test F)",
    desc: "Le test t de deux échantillons indépendants avec la variance poolée, précédé du test F des variances.",
    prereqWhy: {"p-test-t1": "même statistique t, avec deux échantillons"},
    intro: { rule: "Deux échantillons normaux <b>indépendants</b> de même variance : s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2) ; T = (x̄₁ − x̄₂)/(s_p·√(1/n₁ + 1/n₂)) ~ t_{n₁+n₂−2} sous H₀ : μ₁ = μ₂. Avant, le cours vérifie l'égalité des variances par F = s₁²/s₂² ~ F_{n₁−1, n₂−1} (quantiles donnés par l'énoncé). Si ce test rejette, il faudrait le test de Welch, qui n'est pas au programme : l'item s'arrête et le dit.",
      lines: [{ html: "Groupes : 3, 4, 5, 6, 7 et 5, 7, 8, 9, 11", note: "Données", noEq: true }, { html: "F = 2,5/5 = 0,5 : variances compatibles", note: "Test F", noEq: true }, { html: "s_p² = (4 · 2,5 + 4 · 5)/8 = 3,75", note: "Variance poolée", noEq: true }, { html: "t_obs = −3/√(3,75 · 0,4) ≈ −2,45 ; |t| > s₅(8) = 2,306 : rejet", note: "Décision", noEq: true }] },
  }),
  S('p-test-two-prop', 15, {
    prereqs: ["p-test-z"], icon: "p₁−p₂", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234"],
    title: "Comparer deux proportions",
    desc: "Comparer deux proportions avec la proportion commune estimée sous H₀.",
    intro: { rule: "H₀ : p₁ = p₂. Sous H₀, on estime la proportion commune p̂ = (k₁ + k₂)/(n₁ + n₂) et T = (p̂₁ − p̂₂)/√(p̂(1 − p̂)(1/n₁ + 1/n₂)) ≈ N(0, 1).",
      lines: [{ html: "60 guérisons sur 200 (A), 40 sur 200 (B)", note: "Données", noEq: true }, { html: "p̂ = 100/400 = 0,25", note: "Proportion poolée", noEq: true }, { html: "se = √(0,25 · 0,75 · (1/200 + 1/200)) ≈ 0,0433", note: "Erreur standard", noEq: true }, { html: "t_obs = 0,10/0,0433 ≈ 2,31 > 1,96 : rejet", note: "Décision", noEq: true }] },
  }),
];
