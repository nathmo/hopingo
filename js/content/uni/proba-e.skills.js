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
    desc: "Le test χ² d'adéquation : effectifs attendus, statistique Σ(o − e)²/e, degrés de liberté k − 1 − c.",
    prereqWhy: {"p-test-setup": "hypothèses et p-valeur", "p-family": "loi χ²(r)", "p-binom": "effectifs attendus eᵢ = n·pᵢ (espérance d'une binomiale)"},
    intro: {
      rule: "Avec k classes, des effectifs observés oᵢ, effectifs attendus eᵢ = n·pᵢ (des <b>effectifs</b>, pas des proportions). T = Σ(oᵢ − eᵢ)²/eᵢ ~ χ²(r) sous H₀, avec r = k − 1 si les pᵢ sont fixées, r = k − 1 − c si c paramètres sont estimés sur les données. On rejette pour T grand (test unilatéral à droite).",
      lines: [{ html: "Dé lancé 60 fois : 5, 8, 9, 8, 10, 20 ; eᵢ = 10", note: "Effectifs attendus", noEq: true }, { html: "T = (25 + 4 + 1 + 4 + 0 + 100)/10 = 13,4", note: "Statistique", noEq: true }, { html: "r = 6 − 1 = 5 ; s₅(5) = 11,070", note: "Table 4", noEq: true }, { html: "13,4 > 11,070 : rejet à 5 %", note: "Décision", noEq: true }],
    },
  }),
  S('p-test-chi2-indep', 15, {
    prereqs: ["p-test-chi2-gof", "p-joint-disc"], icon: "χ² ⊥", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234"],
    title: "Test χ² d'indépendance",
    desc: "Le test χ² d'indépendance d'un tableau de contingence, avec e_ij = (total de la ligne × total de la colonne)/n.",
    prereqWhy: {"p-test-chi2-gof": "même statistique Σ(o − e)²/e", "p-joint-disc": "marges du tableau et indépendance case par case"},
    intro: {
      rule: "Tableau de contingence h × k ; sous H₀ (indépendance), e_ij = n_i·· n_·j/n ; T = Σ(n_ij − e_ij)²/e_ij ~ χ²((h − 1)(k − 1)).",
      lines: [{ html: "Tableau [[30, 20], [20, 30]] : eᵢⱼ = 50 · 50/100 = 25", note: "Effectifs attendus", noEq: true }, { html: "T = 4 · 25/25 = 4", note: "Statistique", noEq: true }, { html: "r = (2 − 1)(2 − 1) = 1 ; 4 > 3,841", note: "Rejet de l'indépendance à 5 %", noEq: true }],
    },
  }),
  S('p-test-chi2-var', 16, {
    prereqs: ["p-test-setup", "p-family"], icon: "χ² σ²", examWeight: 1, exam: ["mcq", "tf"], tags: ["EE-209"],
    title: "χ² sur une variance : test et IC",
    desc: "Tester une variance et construire son intervalle de confiance avec (n − 1)S²/σ₀² ~ χ²(n − 1).",
    prereqWhy: {"p-test-setup": "H₀, H₁ et région critique"},
    intro: {
      rule: "Données normales, μ inconnue : T = (n − 1)S²/σ₀² ~ χ²(n − 1) sous H₀ : σ = σ₀. Pour H₁ : σ > σ₀, on rejette si T > χ²_{n−1 ; 1−α}. IC pour σ² : [(n − 1)s²/χ²_{1−α/2} ; (n − 1)s²/χ²_{α/2}] (les deux quantiles sont donnés par l'énoncé ; la Table 4 ne donne que la queue supérieure).",
      lines: [{ html: "n = 11, s² = 15, H₀ : σ² = 10", note: "Données", noEq: true }, { html: "T = 10 · 15/10 = 15 < 18,307", note: "Pas de rejet à 5 %", noEq: true }, { html: "IC₉₅(σ²) = [150/20,483 ; 150/3,247] = [7,32 ; 46,20]", note: "Grand quantile → petite borne", noEq: true }],
    },
  }),
  S('p-interpret', 15, {
    prereqs: ["p-ci-mean", "p-test-setup"], icon: "p ?", examWeight: 3, exam: ["mcq", "tf"], tags: ["MATH-234", "EE-209"],
    title: "Interpréter une p-valeur ou un IC",
    desc: "Lire correctement une p-valeur et un intervalle de confiance, et éviter les contresens classiques.",
    prereqWhy: {"p-ci-mean": "l'IC à interpréter", "p-test-setup": "la p-valeur à interpréter"},
    intro: {
      rule: "La p-valeur est Pr(données au moins aussi extrêmes | H₀), pas Pr(H₀ | données). Ne pas rejeter H₀ ne prouve pas H₀. Un IC à 95 % vient d'une <b>méthode</b> qui capture θ dans 95 % des répétitions ; une fois calculé, il contient θ ou non. Rejeté à 5 % ⇒ rejeté à 10 %, pas l'inverse. Significatif ne veut pas dire important. Bilatéral : rejet au niveau α ⇔ θ₀ hors de l'IC à 1 − α. Vingt tests à 5 % sur des H₀ vraies donnent environ un rejet par hasard (p-hacking).",
      lines: [{ html: "IC₉₅(p) = [0,2 ; 0,6]", note: "Un IC", noEq: true }, { html: "p = 0,7 est rejeté à 5 %", note: "0,7 est hors de l'IC", noEq: true }],
    },
  }),
  S('p-reg-ls', 15, {
    prereqs: ["p-cov-corr", "l-orth-lsq", "p-desc-summary"], icon: "ŷ = α+βx", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Droite des moindres carrés, r et R²",
    desc: "La droite des moindres carrés : pente S_xy/S_xx, ordonnée à l'origine, r et R².",
    prereqWhy: {"p-cov-corr": "r = S_xy/√(S_xx·S_yy)", "l-orth-lsq": "la droite des moindres carrés résout les équations normales", "p-desc-summary": "moyennes x̄ et ȳ"},
    intro: {
      rule: "Modèle Yᵢ = α + βxᵢ + εᵢ. β̂ = S_xy/S_xx = Σ(xᵢ − x̄)(yᵢ − ȳ)/Σ(xᵢ − x̄)² = r·s_y/s_x ; α̂ = ȳ − β̂x̄ ; la droite passe par (x̄, ȳ) ; les résidus somment à 0. r = S_xy/√(S_xx·S_yy) ; R² = r² = ESS/TSS. La régression de x sur y n'est <b>pas</b> la droite inverse (pente r·s_x/s_y).",
      lines: [{ html: "x = 1, …, 5 ; y = 2, 4, 5, 4, 5", note: "Données", noEq: true }, { html: "β̂ = 6/10 = 0,6 ; α̂ = 4 − 0,6 · 3 = 2,2", note: "Pente, ordonnée", noEq: true }, { html: "R² = 36/60 = 0,6", note: "Qualité de l'ajustement", noEq: true }],
    },
  }),
  S('p-reg-test', 15, {
    prereqs: ["p-reg-ls", "p-test-t1"], icon: "t(β)", examWeight: 1, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234"],
    title: "Tests t et IC sur les coefficients",
    desc: "Tests t et intervalles sur les coefficients d'une régression, avec σ̂² = RSS/(n − 2).",
    prereqWhy: {"p-test-t1": "statistique t et quantile de Student", "p-reg-ls": "β̂, α̂, S_xx, S_xy de la droite ajustée"},
    intro: {
      rule: "σ̂² = RSS/(n − 2) avec RSS = Σ(yᵢ − ŷᵢ)² = S_yy − β̂S_xy. se(β̂) = σ̂/√S_xx ; se(α̂) = σ̂·√(1/n + x̄²/S_xx). T = (β̂ − β₀)/se(β̂) ~ t_{n−2} sous H₀ (de même pour α) ; IC β̂ ± t·se(β̂).",
      lines: [{ html: "RSS = 6 − 0,6 · 6 = 2,4 ; σ̂² = 2,4/3 = 0,8", note: "Variance (n − 2)", noEq: true }, { html: "t_obs = 0,6/√(0,8/10) ≈ 2,12 < s₅(3) = 3,182", note: "Pas de rejet", noEq: true }],
    },
  }),
  S('p-reg-multi', 15, {
    prereqs: ["p-reg-test", "l-orth-lsq"], icon: "Xβ", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Régression multiple, matrice de design, test F emboîté",
    desc: "Régression multiple : matrice de design, équations normales et test F de modèles emboîtés.",
    prereqWhy: {"p-reg-test": "test t sur chaque coefficient", "l-orth-lsq": "équations normales XᵀXβ̂ = Xᵀy"},
    intro: {
      rule: "Le modèle est y = Xβ + ε ; équations normales XᵀXβ̂ = Xᵀy, β̂ = (XᵀX)⁻¹Xᵀy si les colonnes de X sont indépendantes ; S² = ‖y − Xβ̂‖²/(n − p). Test βᵢ = 0 : T = β̂ᵢ/(S√vᵢᵢ) ~ t_{n−p}, vᵢᵢ = ((XᵀX)⁻¹)ᵢᵢ. Modèles emboîtés (q < p colonnes) : F = ((SC_q − SC_p)/(p − q))/(SC_p/(n − p)) ~ F_{p−q, n−p} (quantile donné).",
      lines: [{ html: "F = ((50 − 30)/2)/(30/16) ≈ 5,33", note: "Test F emboîté", noEq: true }, { html: "5,33 > F₂,₁₆ ; 0,95 = 3,63", note: "Rejet de H₀", noEq: true }],
    },
  }),
  S('p-reg-diag', 15, {
    prereqs: ["p-reg-ls"], icon: "résidus", examWeight: 1, exam: ["mcq", "tf"], tags: ["MATH-234"],
    title: "Diagnostics d'une régression",
    desc: "Vérifier les hypothèses d'une régression sur les graphiques des résidus.",
    prereqWhy: {"p-reg-ls": "résidus de la droite ajustée"},
    intro: {
      rule: "Les hypothèses se vérifient sur les <b>résidus</b> : linéarité (pas de courbure dans résidus contre ŷ), variance constante (pas d'entonnoir), normalité (QQ-plot des résidus aligné), indépendance (pas de structure dans l'ordre, autocovariance), points influents (levier élevé, distance de Cook grande). Un R² élevé ne valide pas le modèle.",
      lines: [{ html: "Résidus en entonnoir", note: "Lire le graphique", noEq: true }, { html: "Hétéroscédasticité : transformer y (log)", note: "Hypothèse, remède", noEq: true }],
    },
  }),
  S('p-bayes-beta', 16, {
    prereqs: ["p-bayes-formula", "p-family", "p-mle"], icon: "Beta", examWeight: 1, exam: ["mcq", "tf"], tags: ["EE-209"],
    title: "Modèle Beta-Bernoulli : a posteriori, PM, MAP",
    desc: "Le modèle Beta-Bernoulli : loi a posteriori, moyenne a posteriori et MAP.",
    prereqWhy: {"p-bayes-formula": "a posteriori ∝ vraisemblance × a priori", "p-family": "la loi Beta, sa moyenne et son mode", "p-mle": "comparer le MAP au MLE"},
    intro: {
      rule: "A priori θ ~ Beta(α, β) (uniforme = Beta(1, 1)) ; N succès en n essais de Bernoulli ; a posteriori θ | données ~ Beta(α + N, β + n − N). Moyenne a posteriori PM = (α + N)/(α + β + n) ; MAP = (α + N − 1)/(α + β + n − 2) ; variance a posteriori PM(1 − PM)/(1 + α + β + n). L'a posteriori sert d'a priori pour les données suivantes.",
      lines: [{ html: "Uniforme, 2 réussites sur 2 → Beta(3, 1)", note: "Mise à jour", noEq: true }, { html: "Beta(2, 2), 7 sur 10 → Beta(9, 5), PM = 9/14, MAP = 2/3", note: "Moyenne et mode", noEq: true }],
    },
  }),
  S('p-bayes-gauss', 16, {
    prereqs: ["p-normal-std"], icon: "N·N", examWeight: 2, exam: ["mcq", "tf"], tags: ["EE-209"],
    title: "Modèle gaussien-gaussien",
    desc: "Le modèle gaussien-gaussien : les précisions s'additionnent, la moyenne a posteriori est une moyenne pondérée.",
    prereqWhy: {"p-normal-std": "lois normales a priori et a posteriori"},
    intro: {
      rule: "A priori θ ~ N(μ₀, τ²) ; données Xᵢ | θ ~ N(θ, σ²), σ² connu. A posteriori N(μ_post, σ²_post) avec μ_post = (nτ²x̄ + σ²μ₀)/(nτ² + σ²) et σ²_post = σ²τ²/(nτ² + σ²) ; autrement dit, les <b>précisions</b> s'additionnent : 1/σ²_post = 1/τ² + n/σ², et μ_post est la moyenne de μ₀ et x̄ pondérée par les précisions. MAP = PM = μ_post.",
      lines: [{ html: "Précisions 1/τ² = 1 et 1/σ² = 2 : σ²_post = 1/3", note: "Les précisions s'additionnent", noEq: true }, { html: "μ_post = (1 · 2,5 + 2 · 2,2)/3 = 2,3", note: "Moyenne pondérée", noEq: true }],
    },
  }),
  S('p-bayes-conjugate', 16, {
    prereqs: ["p-bayes-beta", "p-count"], icon: "Dir", examWeight: 1, exam: ["mcq", "tf"], tags: ["EE-209"],
    title: "Lois conjuguées ; Dirichlet-multinomiale",
    desc: "Lois a priori conjuguées, et la mise à jour d'une loi de Dirichlet par des comptes multinomiaux.",
    prereqWhy: {"p-bayes-beta": "Beta-Bernoulli est le modèle de référence", "p-count": "coefficient multinomial n!/(N₁!···N_K!)"},
    intro: {
      rule: "Une loi a priori est conjuguée si l'a posteriori reste dans la même famille : Beta–Bernoulli, Dirichlet–multinomiale, normale–normale (moyenne), Gamma sur la précision d'une normale. Multinomiale : Pr(N₁, …, N_K) = n!/(N₁!···N_K!)·Π θₖ^(Nₖ). A priori Dir(α₁, …, α_K), comptes Nₖ : a posteriori Dir(α₁ + N₁, …, α_K + N_K), PMₖ = (αₖ + Nₖ)/(α₀ + n) avec α₀ = Σαₖ, MAPₖ = (αₖ + Nₖ − 1)/(α₀ + n − K).",
      lines: [{ html: "Dir(1, 1, 1) et comptes (3, 5, 2) → Dir(4, 6, 3)", note: "Mise à jour", noEq: true }, { html: "PM = (4/13 ; 6/13 ; 3/13)", note: "Moyenne a posteriori", noEq: true }],
    },
  }),
];
