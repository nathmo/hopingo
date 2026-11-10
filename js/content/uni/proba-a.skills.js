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
    desc: "On trie les données, puis : moyenne x̄ = Σxᵢ/n ; médiane x₍⌈n/2⌉₎ ; variance empirique s² = Σ(xᵢ − x̄)²/(n − 1) ; écart-type s = √s².",
    intro: { rule: "On trie les données, puis : moyenne x̄ = Σxᵢ/n ; médiane x₍⌈n/2⌉₎ ; variance empirique s² = Σ(xᵢ − x̄)²/(<b>n − 1</b>) ; écart-type s = √s². Si yᵢ = a·xᵢ + b : ȳ = a·x̄ + b, méd(y) = a·méd(x) + b, s_y = |a|·s_x." },
  }),
  S('p-desc-boxplot', 15, {
    prereqs: ["p-desc-summary"], icon: "⊏|⊐", examWeight: 1, exam: ["mcq", "tf"], tags: ["MATH-234"],
    title: "Quartiles, résumé en 5 valeurs, boîte à moustaches",
    desc: "Q̂(α) = x₍⌈nα⌉₎.",
    intro: { rule: "Q̂(α) = x₍⌈nα⌉₎. Résumé en 5 valeurs : min, q̂(0,25), médiane, q̂(0,75), max. EIQ = q̂(0,75) − q̂(0,25), C = 1,5·EIQ. Les moustaches vont jusqu'aux <b>données</b> les plus extrêmes à l'intérieur de [q̂(0,25) − C ; q̂(0,75) + C] ; les données hors de cet intervalle sont des points (valeurs aberrantes)." },
  }),
  S('p-events', 15, {
    prereqs: ["g9-sets"], icon: "∪∩", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Axiomes, complément, inclusion-exclusion",
    desc: "0 ≤ Pr(A) ≤ 1, Pr(Ω) = 1, et Pr de réunions disjointes = somme.",
    prereqWhy: {"g9-sets": "réunion, intersection et complément d'événements"},
    intro: { rule: "0 ≤ Pr(A) ≤ 1, Pr(Ω) = 1, et Pr de réunions disjointes = somme. On en tire Pr(Aᶜ) = 1 − Pr(A), Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B), Pr(A ∩ Bᶜ) = Pr(A) − Pr(A ∩ B), et A ⊂ B ⇒ Pr(A) ≤ Pr(B)." },
  }),
  S('p-count', 15, {
    prereqs: ["p-events", "g7-combinations", "g7-which-count"], icon: "#A/#Ω", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234"],
    title: "Équiprobabilité et dénombrement",
    desc: "Si tous les résultats sont équiprobables, Pr(A) = |A|/|Ω|.",
    prereqWhy: {"p-events": "Pr(A) = |A|/|Ω| et passage au complément"},
    intro: { rule: "Si tous les résultats sont équiprobables, Pr(A) = |A|/|Ω|. Tirage simultané (sans ordre, sans remise) de n objets parmi N : |Ω| = C(N, n). « Exactement k marqués » : C(K, k)·C(N − K, n − k). On compte Ω et A <b>de la même façon</b> (les deux ordonnés ou les deux non ordonnés)." },
  }),
  S('p-cond-total', 15, {
    prereqs: ["p-events"], icon: "A|B", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Conditionnement et probabilités totales",
    desc: "Pr(A | B) = Pr(A ∩ B)/Pr(B) ; donc Pr(A ∩ B) = Pr(A | B)·Pr(B).",
    prereqWhy: {"p-events": "Pr(A ∩ B) et partitions de Ω"},
    intro: { rule: "Pr(A | B) = Pr(A ∩ B)/Pr(B) ; donc Pr(A ∩ B) = Pr(A | B)·Pr(B). Si B₁, …, B_k partitionnent Ω : Pr(A) = Σ Pr(A | Bᵢ)·Pr(Bᵢ) (une branche de l'arbre par Bᵢ)." },
  }),
  S('p-bayes-freq', 15, {
    prereqs: ["p-cond-total", "pct-which"], icon: "1000", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Bayes par les fréquences naturelles",
    desc: "On imagine 1 000 personnes et on remplit le tableau malades/sains × positif/négatif.",
    intro: { rule: "On imagine 1 000 personnes et on remplit le tableau malades/sains × positif/négatif. Pr(malade | positif) = (malades positifs)/(tous les positifs)." },
  }),
  S('p-bayes-formula', 15, {
    prereqs: ["p-bayes-freq"], icon: "Bayes", examWeight: 2, exam: ["mcq", "tf", "coef", "open"], tags: ["MATH-234", "EE-209"],
    title: "Formule de Bayes, deux tests",
    desc: "Pr(M | +) = Pr(+ | M)·Pr(M) / [Pr(+ | M)·Pr(M) + Pr(+ | Mᶜ)·Pr(Mᶜ)].",
    prereqWhy: {"p-bayes-freq": "même tableau des fréquences naturelles"},
    intro: { rule: "Pr(M | +) = Pr(+ | M)·Pr(M) / [Pr(+ | M)·Pr(M) + Pr(+ | Mᶜ)·Pr(Mᶜ)]. Le dénominateur est Pr(+), par les probabilités totales ; c'est la colonne « positifs » du tableau. Deux tests indépendants <b>sachant l'état</b> : Pr(+, + | M) = Pr(+ | M)²." },
  }),
  S('p-indep', 15, {
    prereqs: ["p-cond-total"], icon: "⊥", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Indépendance, incompatibilité, systèmes redondants",
    desc: "A et B indépendants ⇔ Pr(A ∩ B) = Pr(A)·Pr(B) ⇔ Pr(A | B) = Pr(A).",
    prereqWhy: {"p-cond-total": "Pr(A | B) = Pr(A)"},
    intro: { rule: "A et B indépendants ⇔ Pr(A ∩ B) = Pr(A)·Pr(B) ⇔ Pr(A | B) = Pr(A). Incompatibles : Pr(A ∩ B) = 0 ; deux événements incompatibles de probabilités non nulles sont <b>dépendants</b>. Trois événements sont mutuellement indépendants si les quatre égalités tiennent. Système en série : Π pᵢ ; en parallèle : 1 − Π(1 − pᵢ)." },
  }),
  S('p-disc-pmf', 15, {
    prereqs: ["p-events", "a1-ser-geo-tele"], icon: "f, F", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Variable discrète : fonction de masse, de répartition, quantile",
    desc: "Fonction de masse f(xᵢ) = Pr(X = xᵢ) ≥ 0, de somme 1.",
    prereqWhy: {"p-events": "la somme des probabilités vaut 1"},
    intro: { rule: "Fonction de masse f(xᵢ) = Pr(X = xᵢ) ≥ 0, de somme 1. Fonction de répartition F(x) = Pr(X ≤ x), en escalier, continue à droite. Quantile : F⁻¹(α) = min{x : F(x) ≥ α}. Pr(a < X ≤ b) = F(b) − F(a) ; attention à < et ≤. Géométrique (MATH-234) : Pr(X = x) = (1 − p)ˣ·p, x = 0, 1, … ; sans mémoire." },
  }),
  S('p-binom', 15, {
    prereqs: ["p-disc-pmf", "g7-binomial"], icon: "B(n,p)", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Bernoulli et binomiale",
    desc: "N essais indépendants, même probabilité p de succès : X ~ B(n, p), Pr(X = k) = C(n, k)·pᵏ(1 − p)^(n−k), E[X] = np, var(X) = np(1 − p).",
    prereqWhy: {"p-disc-pmf": "fonction de masse et de répartition"},
    intro: { rule: "N essais indépendants, même probabilité p de succès : X ~ B(n, p), Pr(X = k) = C(n, k)·pᵏ(1 − p)^(n−k), E[X] = np, var(X) = np(1 − p). B(1, p) = B(p). « Au moins un » : 1 − (1 − p)ⁿ." },
  }),
  S('p-poisson', 15, {
    prereqs: ["p-binom"], icon: "λᵏ/k!", examWeight: 1, exam: ["mcq", "tf", "coef"], tags: ["MATH-234", "EE-209"],
    title: "Loi de Poisson, lien avec la binomiale",
    desc: "X ~ Poiss(λ) : Pr(X = k) = λᵏe^(−λ)/k!, E = var = λ.",
    intro: { rule: "X ~ Poiss(λ) : Pr(X = k) = λᵏe^(−λ)/k!, E = var = λ. Si X₁ ~ Poiss(λ₁) et X₂ ~ Poiss(λ₂) sont indépendantes, X₁ + X₂ ~ Poiss(λ₁ + λ₂). Le taux suit la durée (λ par heure → 3λ en 3 h). Loi des petits nombres : n grand et p petit ⇒ B(n, p) ≈ Poiss(np)." },
  }),
  S('p-hypergeom', 15, {
    prereqs: ["p-count", "p-binom", "p-cond-total"], icon: "H", examWeight: 1, exam: ["mcq", "coef"], tags: ["opt"],
    title: "Loi hypergéométrique",
    desc: "N objets dont K marqués ; on en tire n sans remise : Pr(X = k) = C(K, k)·C(N − K, n − k)/C(N, n), E[X] = nK/N.",
    prereqWhy: {"p-binom": "approximation B(n, K/N) quand N est grand"},
    intro: { rule: "N objets dont K marqués ; on en tire n <b>sans</b> remise : Pr(X = k) = C(K, k)·C(N − K, n − k)/C(N, n), E[X] = nK/N. Si N est grand devant n, X ≈ B(n, K/N)." },
  }),
];
