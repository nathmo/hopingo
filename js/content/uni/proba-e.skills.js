// Module P, part e (unit `proba`, step U7). Catalogue:
// docs/universite/P-probabilites.md. Skills: p-test-chi2-gof, p-test-chi2-indep, p-test-chi2-var, p-interpret, p-reg-ls, p-reg-test, p-reg-multi, p-reg-diag, p-bayes-beta, p-bayes-gauss, p-bayes-conjugate.
// Generators: proba-e.js; traps: js/cas/rules/pe.js. Prerequisites of
// the algebra plan: @alg:A-arrondir = cm-round, @alg:J-pourcentage =
// pct-which, @alg:F-isoler = iso-formula. A2 (step U6) goes through UNBUILT.

const S = (id, year, rest) => ({ id, unit: 'proba', year, optional: false, needsSolo: true, ...rest });

export const SKILLS = [
  S('p-test-chi2-gof', 15, {
    prereqs: ["p-test-setup", "p-family", "p-binom"], icon: "χ²", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234"],
    title: "Test χ² d'adéquation",
    desc: "K classes, effectifs observés oᵢ, effectifs attendus eᵢ = n·pᵢ (des effectifs, pas des proportions).",
    prereqWhy: {"p-test-setup": "hypothèses et p-valeur", "p-family": "loi χ²(r)"},
    intro: { rule: "K classes, effectifs observés oᵢ, effectifs attendus eᵢ = n·pᵢ (des <b>effectifs</b>, pas des proportions). T = Σ(oᵢ − eᵢ)²/eᵢ ~ χ²(r) sous H₀, avec r = k − 1 si les pᵢ sont fixées, r = k − 1 − c si c paramètres sont estimés sur les données. On rejette pour T grand (test unilatéral à droite)." },
  }),
  S('p-test-chi2-indep', 15, {
    prereqs: ["p-test-chi2-gof", "p-joint-disc"], icon: "χ² ⊥", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234"],
    title: "Test χ² d'indépendance",
    desc: "Tableau de contingence h × k ; sous H₀ (indépendance), e_ij = n_i·· n_·j/n ; T = Σ(n_ij − e_ij)²/e_ij ~ χ²((h − 1)(k − 1)).",
    prereqWhy: {"p-test-chi2-gof": "même statistique Σ(o − e)²/e"},
    intro: { rule: "Tableau de contingence h × k ; sous H₀ (indépendance), e_ij = n_i·· n_·j/n ; T = Σ(n_ij − e_ij)²/e_ij ~ χ²((h − 1)(k − 1))." },
  }),
  S('p-test-chi2-var', 16, {
    prereqs: ["p-test-setup", "p-family"], icon: "χ² σ²", examWeight: 1, exam: ["mcq", "tf"], tags: ["EE-209"],
    title: "χ² sur une variance : test et IC",
    desc: "Données normales, μ inconnue : T = (n − 1)S²/σ₀² ~ χ²(n − 1) sous H₀ : σ = σ₀.",
    prereqWhy: {"p-test-setup": "H₀, H₁ et région critique"},
    intro: { rule: "Données normales, μ inconnue : T = (n − 1)S²/σ₀² ~ χ²(n − 1) sous H₀ : σ = σ₀. Pour H₁ : σ > σ₀, on rejette si T > χ²_{n−1 ; 1−α}. IC pour σ² : [(n − 1)s²/χ²_{1−α/2} ; (n − 1)s²/χ²_{α/2}] (les deux quantiles sont donnés par l'énoncé ; la Table 4 ne donne que la queue supérieure)." },
  }),
  S('p-interpret', 15, {
    prereqs: ["p-ci-mean", "p-test-setup"], icon: "p ?", examWeight: 3, exam: ["mcq", "tf"], tags: ["MATH-234", "EE-209"],
    title: "Interpréter une p-valeur ou un IC",
    desc: "La p-valeur est Pr(données au moins aussi extrêmes | H₀), pas Pr(H₀ | données).",
    prereqWhy: {"p-ci-mean": "l'IC à interpréter", "p-test-setup": "la p-valeur à interpréter"},
    intro: { rule: "La p-valeur est Pr(données au moins aussi extrêmes | H₀), pas Pr(H₀ | données). Ne pas rejeter H₀ ne prouve pas H₀. Un IC à 95 % vient d'une <b>méthode</b> qui capture θ dans 95 % des répétitions ; une fois calculé, il contient θ ou non. Rejeté à 5 % ⇒ rejeté à 10 %, pas l'inverse. Significatif ne veut pas dire important. Bilatéral : rejet au niveau α ⇔ θ₀ hors de l'IC à 1 − α. Vingt tests à 5 % sur des H₀ vraies donnent environ un rejet par hasard (p-hacking)." },
  }),
  S('p-reg-ls', 15, {
    prereqs: ["p-cov-corr", "l-orth-lsq", "p-desc-summary"], icon: "ŷ = α+βx", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Droite des moindres carrés, r et R²",
    desc: "Modèle Yᵢ = α + βxᵢ + εᵢ.",
    prereqWhy: {"p-cov-corr": "r = S_xy/√(S_xx·S_yy)"},
    intro: { rule: "Modèle Yᵢ = α + βxᵢ + εᵢ. β̂ = S_xy/S_xx = Σ(xᵢ − x̄)(yᵢ − ȳ)/Σ(xᵢ − x̄)² = r·s_y/s_x ; α̂ = ȳ − β̂x̄ ; la droite passe par (x̄, ȳ) ; les résidus somment à 0. r = S_xy/√(S_xx·S_yy) ; R² = r² = ESS/TSS. La régression de x sur y n'est <b>pas</b> la droite inverse (pente r·s_x/s_y)." },
  }),
  S('p-reg-test', 15, {
    prereqs: ["p-reg-ls", "p-test-t1"], icon: "t(β)", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234"],
    title: "Tests t et IC sur les coefficients",
    desc: "Σ̂² = RSS/(n − 2) avec RSS = Σ(yᵢ − ŷᵢ)² = S_yy − β̂S_xy.",
    prereqWhy: {"p-test-t1": "statistique t et quantile de Student"},
    intro: { rule: "Σ̂² = RSS/(n − 2) avec RSS = Σ(yᵢ − ŷᵢ)² = S_yy − β̂S_xy. se(β̂) = σ̂/√S_xx ; se(α̂) = σ̂·√(1/n + x̄²/S_xx). T = (β̂ − β₀)/se(β̂) ~ t_{n−2} sous H₀ (de même pour α) ; IC β̂ ± t·se(β̂)." },
  }),
  S('p-reg-multi', 15, {
    prereqs: ["p-reg-test", "l-orth-lsq"], icon: "Xβ", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Régression multiple, matrice de design, test F emboîté",
    desc: "Y = Xβ + ε ; équations normales XᵀXβ̂ = Xᵀy, β̂ = (XᵀX)⁻¹Xᵀy si les colonnes de X sont indépendantes ; S² = ‖y − Xβ̂‖²/(n − p).",
    prereqWhy: {"p-reg-test": "test t sur chaque coefficient"},
    intro: { rule: "Y = Xβ + ε ; équations normales XᵀXβ̂ = Xᵀy, β̂ = (XᵀX)⁻¹Xᵀy si les colonnes de X sont indépendantes ; S² = ‖y − Xβ̂‖²/(n − p). Test βᵢ = 0 : T = β̂ᵢ/(S√vᵢᵢ) ~ t_{n−p}, vᵢᵢ = ((XᵀX)⁻¹)ᵢᵢ. Modèles emboîtés (q < p colonnes) : F = ((SC_q − SC_p)/(p − q))/(SC_p/(n − p)) ~ F_{p−q, n−p} (quantile donné)." },
  }),
  S('p-reg-diag', 15, {
    prereqs: ["p-reg-ls"], icon: "résidus", examWeight: 1, exam: ["mcq", "tf"], tags: ["MATH-234"],
    title: "Diagnostics d'une régression",
    desc: "Les hypothèses se vérifient sur les résidus : linéarité (pas de courbure dans résidus contre ŷ), variance constante (pas…",
    prereqWhy: {"p-reg-ls": "résidus de la droite ajustée"},
    intro: { rule: "Les hypothèses se vérifient sur les <b>résidus</b> : linéarité (pas de courbure dans résidus contre ŷ), variance constante (pas d'entonnoir), normalité (QQ-plot des résidus aligné), indépendance (pas de structure dans l'ordre, autocovariance), points influents (levier élevé, distance de Cook grande). Un R² élevé ne valide pas le modèle." },
  }),
  S('p-bayes-beta', 16, {
    prereqs: ["p-bayes-formula", "p-family", "p-mle"], icon: "Beta", examWeight: 1, exam: ["mcq", "tf"], tags: ["EE-209"],
    title: "Modèle Beta-Bernoulli : a posteriori, PM, MAP",
    desc: "A priori θ ~ Beta(α, β) (uniforme = Beta(1, 1)) ; N succès en n essais de Bernoulli ; a posteriori θ | données ~ Beta(α + N, β + n − N).",
    prereqWhy: {"p-bayes-formula": "a posteriori ∝ vraisemblance × a priori"},
    intro: { rule: "A priori θ ~ Beta(α, β) (uniforme = Beta(1, 1)) ; N succès en n essais de Bernoulli ; a posteriori θ | données ~ Beta(α + N, β + n − N). Moyenne a posteriori PM = (α + N)/(α + β + n) ; MAP = (α + N − 1)/(α + β + n − 2) ; variance a posteriori PM(1 − PM)/(1 + α + β + n). L'a posteriori sert d'a priori pour les données suivantes." },
  }),
  S('p-bayes-gauss', 16, {
    prereqs: ["p-normal-std"], icon: "N·N", examWeight: 2, exam: ["mcq", "tf"], tags: ["EE-209"],
    title: "Modèle gaussien-gaussien",
    desc: "A priori θ ~ N(μ₀, τ²) ; données Xᵢ | θ ~ N(θ, σ²), σ² connu.",
    prereqWhy: {"p-normal-std": "lois normales a priori et a posteriori"},
    intro: { rule: "A priori θ ~ N(μ₀, τ²) ; données Xᵢ | θ ~ N(θ, σ²), σ² connu. A posteriori N(μ_post, σ²_post) avec μ_post = (nτ²x̄ + σ²μ₀)/(nτ² + σ²) et σ²_post = σ²τ²/(nτ² + σ²) ; autrement dit, les <b>précisions</b> s'additionnent : 1/σ²_post = 1/τ² + n/σ², et μ_post est la moyenne de μ₀ et x̄ pondérée par les précisions. MAP = PM = μ_post." },
  }),
  S('p-bayes-conjugate', 16, {
    prereqs: ["p-bayes-beta", "p-count"], icon: "Dir", examWeight: 1, exam: ["mcq", "tf"], tags: ["EE-209"],
    title: "Lois conjuguées ; Dirichlet-multinomiale",
    desc: "Une loi a priori est conjuguée si l'a posteriori reste dans la même famille : Beta–Bernoulli, Dirichlet–multinomiale, normale–normale…",
    prereqWhy: {"p-bayes-beta": "Beta-Bernoulli est le modèle de référence"},
    intro: { rule: "Une loi a priori est conjuguée si l'a posteriori reste dans la même famille : Beta–Bernoulli, Dirichlet–multinomiale, normale–normale (moyenne), Gamma sur la précision d'une normale. Multinomiale : Pr(N₁, …, N_K) = n!/(N₁!···N_K!)·Π θₖ^(Nₖ). A priori Dir(α₁, …, α_K), comptes Nₖ : a posteriori Dir(α₁ + N₁, …, α_K + N_K), PMₖ = (αₖ + Nₖ)/(α₀ + n) avec α₀ = Σαₖ, MAPₖ = (αₖ + Nₖ − 1)/(α₀ + n − K)." },
  }),
];
