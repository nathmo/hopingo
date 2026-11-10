// Module P, part a (unit `proba`, step U7). Catalogue:
// docs/universite/P-probabilites.md. Skills: p-desc-summary, p-desc-boxplot, p-events, p-count, p-cond-total, p-bayes-freq, p-bayes-formula, p-indep, p-disc-pmf, p-binom, p-poisson, p-hypergeom.
// Generators: proba-a.js; traps: js/cas/rules/pa.js. Prerequisites of
// the algebra plan: @alg:A-arrondir = cm-round, @alg:J-pourcentage =
// pct-which, @alg:F-isoler = iso-formula. A2 (step U6) goes through UNBUILT.

const S = (id, year, rest) => ({ id, unit: 'proba', year, optional: false, needsSolo: true, ...rest });

export const SKILLS = [
  S('p-desc-summary', 15, {
    prereqs: ["cm-round"], icon: "x̄", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234"],
    title: "Moyenne, médiane, variance empirique",
    desc: "Moyenne, médiane et variance empirique d'une série (diviseur n − 1), puis l'écart-type.",
    intro: { rule: "On trie les données, puis : moyenne x̄ = Σxᵢ/n ; médiane x₍⌈n/2⌉₎ ; variance empirique s² = Σ(xᵢ − x̄)²/(<b>n − 1</b>) ; écart-type s = √s². Si yᵢ = a·xᵢ + b : ȳ = a·x̄ + b, méd(y) = a·méd(x) + b, s_y = |a|·s_x.", lines: [{ html: "2, 4, 4, 5, 7, 9, 11", note: "n = 7, données triées", noEq: true }, { html: "x̄ = 42/7 = 6", note: "Moyenne", noEq: true }, { html: "méd = x₍₄₎ = 5", note: "⌈7/2⌉ = 4", noEq: true }, { html: "s² = 60/6 = 10", note: "60 = somme des écarts au carré, divisée par n − 1", noEq: true }] },
  }),
  S('p-desc-boxplot', 15, {
    prereqs: ["p-desc-summary"], icon: "⊏|⊐", examWeight: 1, exam: ["mcq", "tf"], tags: ["MATH-234"],
    title: "Quartiles, résumé en 5 valeurs, boîte à moustaches",
    desc: "Quartiles q̂(α) = x₍⌈nα⌉₎, résumé en 5 valeurs, moustaches et valeurs aberrantes.",
    intro: { rule: "Le quantile empirique q̂(α) = x₍⌈nα⌉₎. Résumé en 5 valeurs : min, q̂(0,25), médiane, q̂(0,75), max. EIQ = q̂(0,75) − q̂(0,25), C = 1,5·EIQ. Les moustaches vont jusqu'aux <b>données</b> les plus extrêmes à l'intérieur de [q̂(0,25) − C ; q̂(0,75) + C] ; les données hors de cet intervalle sont des points (valeurs aberrantes).", lines: [{ html: "3, 5, 6, 8, 8, 9, 10, 12, 13, 15, 31", note: "n = 11", noEq: true }, { html: "q̂(0,25) = x₍₃₎ = 6 ; q̂(0,75) = x₍₉₎ = 13", note: "⌈11 · 0,25⌉ = 3, ⌈11 · 0,75⌉ = 9", noEq: true }, { html: "EIQ = 7 ; C = 1,5 · 7 = 10,5", note: "Seuils −4,5 et 23,5", noEq: true }, { html: "moustaches [3 ; 15] ; 31 aberrante", note: "La moustache s'arrête sur une donnée", noEq: true }] },
  }),
  S('p-events', 15, {
    prereqs: ["g9-sets"], icon: "∪∩", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Axiomes, complément, inclusion-exclusion",
    desc: "Calculer avec les axiomes : complément, inclusion-exclusion Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B), différence.",
    prereqWhy: {"g9-sets": "réunion, intersection et complément d'événements"},
    intro: { rule: "0 ≤ Pr(A) ≤ 1, Pr(Ω) = 1, et Pr de réunions disjointes = somme. On en tire Pr(Aᶜ) = 1 − Pr(A), Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B), Pr(A ∩ Bᶜ) = Pr(A) − Pr(A ∩ B), et A ⊂ B ⇒ Pr(A) ≤ Pr(B).", lines: [{ html: "Pr(A ∪ B) = 0,5 + 0,7 − 0,3 = 0,9", note: "Inclusion-exclusion", noEq: true }, { html: "Pr(aucun) = 1 − 0,9 = 0,1", note: "De Morgan et complément", noEq: true }] },
  }),
  S('p-count', 15, {
    prereqs: ["p-events", "g7-combinations", "g7-which-count"], icon: "#A/#Ω", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234"],
    title: "Équiprobabilité et dénombrement",
    desc: "Quand les issues sont équiprobables, Pr(A) = |A|/|Ω|, en comptant A et Ω de la même façon.",
    prereqWhy: {"p-events": "Pr(A) = |A|/|Ω| et passage au complément"},
    intro: { rule: "Si tous les résultats sont équiprobables, Pr(A) = |A|/|Ω|. Tirage simultané (sans ordre, sans remise) de n objets parmi N : |Ω| = C(N, n). « Exactement k marqués » : C(K, k)·C(N − K, n − k). On compte Ω et A <b>de la même façon</b> (les deux ordonnés ou les deux non ordonnés).", lines: [{ html: "|Ω| = C(32, 4) = 35 960", note: "4 cartes parmi 32, sans ordre", noEq: true }, { html: "|A| = C(4, 2) · C(28, 2) = 2 268", note: "2 dames, puis 2 autres cartes", noEq: true }, { html: "Pr(A) = 2 268/35 960 = 567/8 990", note: "Rapport", noEq: true }] },
  }),
  S('p-cond-total', 15, {
    prereqs: ["p-events"], icon: "A|B", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Conditionnement et probabilités totales",
    desc: "Conditionner, Pr(A | B) = Pr(A ∩ B)/Pr(B), et sommer les branches d'une partition (probabilités totales).",
    prereqWhy: {"p-events": "Pr(A ∩ B) et partitions de Ω"},
    intro: { rule: "Pr(A | B) = Pr(A ∩ B)/Pr(B) ; donc Pr(A ∩ B) = Pr(A | B)·Pr(B). Si B₁, …, B_k partitionnent Ω : Pr(A) = Σ Pr(A | Bᵢ)·Pr(Bᵢ) (une branche de l'arbre par Bᵢ).", lines: [{ html: "Pr(+) = 0,9 · 0,1 + 0,2 · 0,9", note: "Une branche « malade », une branche « sain »", noEq: true }, { html: "= 0,27", note: "Additionner les branches", noEq: true }] },
  }),
  S('p-bayes-freq', 15, {
    prereqs: ["p-cond-total", "pct-which"], icon: "1000", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Bayes par les fréquences naturelles",
    desc: "Retourner un conditionnement avec un tableau de 1 000 personnes (malades ou sains, positifs ou négatifs).",
    intro: { rule: "On imagine 1 000 personnes et on remplit le tableau malades/sains × positif/négatif. Pr(malade | positif) = (malades positifs)/(tous les positifs).", lines: [{ html: "10 malades, 990 sains", note: "Sur 1 000 personnes, 1 % de malades", noEq: true }, { html: "9 malades positifs, 99 sains positifs", note: "Sensibilité 90 %, faux positifs 10 %", noEq: true }, { html: "Pr(M | +) = 9/108 = 1/12", note: "8,3 %, pas 90 %", noEq: true }] },
  }),
  S('p-bayes-formula', 15, {
    prereqs: ["p-bayes-freq"], icon: "Bayes", examWeight: 2, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234", "EE-209"],
    title: "Formule de Bayes, deux tests",
    desc: "La formule de Bayes, avec les probabilités totales au dénominateur, pour un test puis pour deux tests.",
    prereqWhy: {"p-bayes-freq": "même tableau des fréquences naturelles"},
    intro: { rule: "Pr(M | +) = Pr(+ | M)·Pr(M) / [Pr(+ | M)·Pr(M) + Pr(+ | Mᶜ)·Pr(Mᶜ)]. Le dénominateur est Pr(+), par les probabilités totales ; c'est la colonne « positifs » du tableau. Deux tests indépendants <b>sachant l'état</b> : Pr(+, + | M) = Pr(+ | M)².", lines: [{ html: "Pr(M | +) = 0,9 · 0,01/(0,9 · 0,01 + 0,1 · 0,99) = 1/12", note: "Même nombre que 9/108", noEq: true }, { html: "Pr(M | +, +) = 0,9² · 0,01/(0,9² · 0,01 + 0,1² · 0,99) = 9/20", note: "Deux tests indépendants sachant l'état", noEq: true }] },
  }),
  S('p-indep', 15, {
    prereqs: ["p-cond-total"], icon: "⊥", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Indépendance, incompatibilité, systèmes redondants",
    desc: "Indépendance (Pr(A ∩ B) = Pr(A)·Pr(B)), incompatibilité, et fiabilité de systèmes en série et en parallèle.",
    prereqWhy: {"p-cond-total": "Pr(A | B) = Pr(A)"},
    intro: { rule: "A et B indépendants ⇔ Pr(A ∩ B) = Pr(A)·Pr(B) ⇔ Pr(A | B) = Pr(A). Incompatibles : Pr(A ∩ B) = 0 ; deux événements incompatibles de probabilités non nulles sont <b>dépendants</b>. Trois événements sont mutuellement indépendants si les quatre égalités tiennent. Système en série : Π pᵢ ; en parallèle : 1 − Π(1 − pᵢ).", lines: [{ html: "parallèle, 3 × 0,9 : 1 − 0,1³ = 0,999", note: "Au moins un marche", noEq: true }, { html: "série : 0,9³ = 0,729", note: "Tous marchent", noEq: true }] },
  }),
  S('p-disc-pmf', 15, {
    prereqs: ["p-events", "a1-ser-geo-tele"], icon: "f, F", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Variable discrète : fonction de masse, de répartition, quantile",
    desc: "Fonction de masse, fonction de répartition F et quantile d'une variable discrète.",
    prereqWhy: {"p-events": "la somme des probabilités vaut 1"},
    intro: { rule: "Fonction de masse f(xᵢ) = Pr(X = xᵢ) ≥ 0, de somme 1. Fonction de répartition F(x) = Pr(X ≤ x), en escalier, continue à droite. Quantile : F⁻¹(α) = min{x : F(x) ≥ α}. Pr(a < X ≤ b) = F(b) − F(a) ; attention à < et ≤. Géométrique (MATH-234) : Pr(X = x) = (1 − p)ˣ·p, x = 0, 1, … ; sans mémoire.", lines: [{ html: "c = 1 − 0,8 = 0,2", note: "Les masses font 1", noEq: true }, { html: "méd = min{x : F(x) ≥ 0,5} = 2", note: "Inverser F", noEq: true }] },
  }),
  S('p-binom', 15, {
    prereqs: ["p-disc-pmf", "g7-binomial"], icon: "B(n,p)", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Bernoulli et binomiale",
    desc: "Reconnaître une binomiale B(n, p) et calculer Pr(X = k) = C(n, k)·pᵏ(1 − p)ⁿ⁻ᵏ, E[X] et var(X).",
    prereqWhy: {"p-disc-pmf": "fonction de masse et de répartition"},
    intro: { rule: "Avec n essais indépendants de même probabilité p de succès : X ~ B(n, p), Pr(X = k) = C(n, k)·pᵏ(1 − p)^(n−k), E[X] = np, var(X) = np(1 − p). B(1, p) = B(p). « Au moins un » : 1 − (1 − p)ⁿ.", lines: [{ html: "X ~ B(5 ; 0,6)", note: "5 essais indépendants, p = 0,6", noEq: true }, { html: "Pr(X = 3) = C(5, 3) · 0,6³ · 0,4² = 0,3456", note: "C(n, k)·pᵏ·(1 − p)ⁿ⁻ᵏ", noEq: true }] },
  }),
  S('p-poisson', 15, {
    prereqs: ["p-binom"], icon: "λᵏ/k!", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Loi de Poisson, lien avec la binomiale",
    desc: "La loi de Poisson, Pr(X = k) = λᵏe^(−λ)/k!, son taux sur une durée, et l'approximation de B(n, p) par Poiss(np).",
    intro: { rule: "X ~ Poiss(λ) : Pr(X = k) = λᵏe^(−λ)/k!, E = var = λ. Si X₁ ~ Poiss(λ₁) et X₂ ~ Poiss(λ₂) sont indépendantes, X₁ + X₂ ~ Poiss(λ₁ + λ₂). Le taux suit la durée (λ par heure → 3λ en 3 h). Loi des petits nombres : n grand et p petit ⇒ B(n, p) ≈ Poiss(np).", lines: [{ html: "B(200 ; 0,01) ≈ Poiss(2)", note: "n grand, p petit : λ = np", noEq: true }, { html: "Pr(X ≤ 1) = 3e^(−2) ≈ 0,406", note: "e^(−2) + 2e^(−2)", noEq: true }] },
  }),
  S('p-hypergeom', 15, {
    prereqs: ["p-count", "p-binom", "p-cond-total"], icon: "H", examWeight: 1, exam: ["mcq", "coef"], tags: ["opt"],
    title: "Loi hypergéométrique",
    desc: "Tirages sans remise : Pr(X = k) = C(K, k)·C(N − K, n − k)/C(N, n).",
    prereqWhy: {"p-binom": "approximation B(n, K/N) quand N est grand"},
    intro: { rule: "N objets dont K marqués ; on en tire n <b>sans</b> remise : Pr(X = k) = C(K, k)·C(N − K, n − k)/C(N, n), E[X] = nK/N. Si N est grand devant n, X ≈ B(n, K/N).", lines: [{ html: "6 rouges, 4 bleues, 3 tirées sans remise", note: "On compte", noEq: true }, { html: "Pr(X = 2) = C(6, 2) · C(4, 1)/C(10, 3) = 60/120 = 1/2", note: "Choisir les rouges, puis les bleues", noEq: true }] },
  }),
];
