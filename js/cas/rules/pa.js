// Traps of module P, part a (step U7): the traps of the catalogue
// (docs/universite/P-probabilites.md, « Pièges du module ») whose skill is
// in proba-a.skills.js. Most are wrong values that the generators write in
// cfg.traps (js/cas/rules/stattrap.js); the phrases (P) and decisions (D)
// are options of multiple choices and decision lines, which name them.
// explain(c) fills the {…} of the catalogue's explanation with c, the
// ctx the generator gives with the values (« … » when it gives none).
// The comment above each explain is the catalogue's « transformation ».

import { trap } from './stattrap.js';
import { t } from '../../i18n.js';

const fill = (s, c = {}) => s.replace(/\{([^}]+)\}/g, (m, k) => (c[k] !== undefined && c[k] !== null ? String(c[k]).replace('.', ',').replace('-', '−') : '…'));

export const RULES = [
  trap({
    id: 'p_sd_n', family: 'numeric', tag: 'C', skill: 'p-desc-summary', repair: 'p-desc-summary',
    name: t("Variance divisée par n"),
    example: ["s² = 60/7", "60/6"],
    wrong: ['10', '60/7'],
    // W : SS/n au lieu de SS/(n − 1) ; aussi pour σ̂ dans les tests
    explain: (c) => fill(t("Tu as divisé {SS} par n = {n}. La variance empirique du cours divise par n − 1 = {n−1}."), c),
  }),
  trap({
    id: 'p_median_unsorted', family: 'method', tag: 'E', skill: 'p-desc-summary', repair: 'p-desc-summary',
    name: t("Médiane lue sans trier"),
    example: [t("méd(7, 2, 11, 4, 9, 4, 5) = 4"), "5"],
    wrong: ['5', '4'],
    // W : valeur au rang ⌈n/2⌉ de la liste <b>non triée</b>
    explain: (c) => fill(t("Tu as pris la {k}ᵉ valeur de la liste telle quelle. La médiane se lit sur les données triées."), c),
  }),
  trap({
    id: 'p_median_mean', family: 'proba', tag: 'E', skill: 'p-desc-summary', repair: 'p-desc-summary',
    name: t("Médiane confondue avec la moyenne"),
    example: [t("méd = 6"), "5"],
    wrong: ['5', '6'],
    // W : x̄ (ou (min + max)/2)
    explain: (c) => fill(t("{x̄} est la moyenne. La médiane est la valeur du milieu une fois les données triées."), c),
  }),
  trap({
    id: 'p_lin_transform_sd', family: 'proba', tag: 'E', skill: 'p-desc-summary', repair: 'p-desc-summary',
    name: t("Écart-type d'une transformation affine"),
    example: ["s_y = a·s_x + b", "|a|·s_x"],
    check: { bait: { skill: 'p-desc-summary' } },
    // W : a·s + b, s + b, a²·s
    explain: (c) => fill(t("Ajouter {b} à toutes les données les déplace sans les écarter : s ne change pas. Seul le facteur |a| = {a} compte."), c),
  }),
  trap({
    id: 'p_quartile_convention', family: 'notation', tag: 'C', skill: 'p-desc-boxplot', repair: 'p-desc-boxplot',
    name: t("Convention des quartiles"),
    example: ["q̂(0,25) = 6,5", "6"],
    wrong: ['6', '6.5'],
    // W : (x₍k₎ + x₍k+1₎)/2, x₍⌊nα⌋₎, interpolation linéaire
    explain: (c) => fill(t("Le cours prend q̂(α) = x₍⌈nα⌉₎ : ⌈{n} · {α}⌉ = {k}, donc la {k}ᵉ donnée, {v}."), c),
  }),
  trap({
    id: 'p_whisker_threshold', family: 'notation', tag: 'C', skill: 'p-desc-boxplot', repair: 'p-desc-boxplot',
    name: t("Moustache arrêtée au seuil"),
    example: [t("moustache = 23,5"), "15"],
    wrong: ['15', '23.5'],
    // W : seuils q̂(0,25) − C et q̂(0,75) + C
    explain: (c) => fill(t("{seuil} est un seuil, pas une donnée. La moustache s'arrête sur la donnée la plus extrême à l'intérieur : {v}."), c),
  }),
  trap({
    id: 'p_boxplot_range', family: 'notation', tag: 'E', skill: 'p-desc-boxplot', repair: 'p-desc-boxplot',
    name: t("Étendue au lieu de l'EIQ"),
    example: [t("EIQ = 31 − 3"), "13 − 6"],
    wrong: ['7', '28'],
    // W : max − min
    explain: (c) => fill(t("max − min est l'étendue. L'EIQ ne prend que la boîte : q̂(0,75) − q̂(0,25) = {q3} − {q1}."), c),
  }),
  trap({
    id: 'p_union_add', family: 'proba', tag: 'E', skill: 'p-events', repair: 'p-events',
    name: t("Réunion sans retirer l'intersection"),
    example: ["Pr(A ∪ B) = 1,2", "0,9"],
    wrong: ['0.9', '1.2'],
    // T : retirer le terme − Pr(A ∩ B)
    explain: (c) => fill(t("{v} > 1 n'est pas une probabilité : en additionnant, tu as compté deux fois Pr(A ∩ B) = {pab}."), c),
  }),
  trap({
    id: 'p_complement_wrong', family: 'proba', tag: 'E', skill: 'p-events', repair: 'p-events',
    name: t("Mauvais complémentaire (De Morgan)"),
    example: ["Pr(Aᶜ ∩ Bᶜ) = 0,7", "0,1"],
    wrong: ['0.1', '0.7'],
    // T : 1 − Pr(A ∩ B) au lieu de 1 − Pr(A ∪ B)
    explain: (c) => t("« Ni A ni B » est le contraire de « A ou B » (De Morgan), pas de « A et B »."),
  }),
  trap({
    id: 'p_indep_assumed', family: 'proba', tag: 'E', skill: 'p-events', repair: 'p-indep',
    name: t("Indépendance supposée sans raison"),
    example: ["Pr(A ∩ B) = 0,35", "0,3"],
    wrong: ['0.3', '0.35'],
    // T : remplacer Pr(A ∩ B) par Pr(A)·Pr(B)
    explain: (c) => fill(t("Rien ne dit que A et B sont indépendants ; l'énoncé donne Pr(A ∩ B) = {pab}."), c),
  }),
  trap({
    id: 'p_conjunction', family: 'proba', tag: 'R', skill: 'p-events', repair: 'p-events',
    name: t("Erreur de conjonction"),
    example: ["Pr(A ∩ B) > Pr(A)", "≤"],
    source: "Tversky & Kahneman 1983",
    check: { bait: { skill: 'p-events' } },
    // P : « A et B est plus probable que A seul » ; W : max(Pr A, Pr B) + 0,1
    explain: (c) => t("A ∩ B est contenu dans A, donc Pr(A ∩ B) ≤ Pr(A), même si la description détaillée semble plus plausible."),
  }),
  trap({
    id: 'p_count_forget_rest', family: 'proba', tag: 'E', skill: 'p-count', repair: 'p-count',
    name: t("Le reste de la main oublié"),
    example: ["C(4, 2)/C(32, 4)", "C(4, 2)·C(28, 2)/C(32, 4)"],
    check: { bait: { skill: 'p-count' } },
    // T : supprimer le facteur C(N − K, n − k)
    explain: (c) => fill(t("Tu as choisi les {k} dames, mais pas les {n−k} autres cartes de la main."), c),
  }),
  trap({
    id: 'p_binom_without_replacement', family: 'method', tag: 'E', skill: 'p-count', repair: 'p-binom',
    name: t("Binomiale sans remise"),
    example: ["C(4, 2)(1/8)²(7/8)²", "C(4, 2)C(28, 2)/C(32, 4)"],
    wrong: ['567/8990', '147/2048'],
    // W : binom(n, k, K/N)
    explain: (c) => t("Sans remise, les tirages ne sont pas indépendants : la probabilité d'une dame change à chaque carte. On compte."),
  }),
  trap({
    id: 'p_exactly_atleast', family: 'proba', tag: 'E', skill: 'p-count', repair: 'p-count',
    name: t("« Exactement » et « au moins » confondus"),
    example: ["Pr(X ≥ 2) = Pr(X = 2)", t("somme")],
    check: { bait: { skill: 'p-count' } },
    // W : Pr(X = k) pour « au moins k », Pr(X ≥ k) pour « exactement k »
    explain: (c) => fill(t("« Au moins {k} » contient aussi {k+1}, … ; additionne ces cas ou passe par le complément."), c),
  }),
  trap({
    id: 'p_total_missing_branch', family: 'proba', tag: 'E', skill: 'p-cond-total', repair: 'p-cond-total',
    name: t("Une branche oubliée"),
    example: ["Pr(+) = 0,09", "0,27"],
    wrong: ['0.27', '0.09'],
    // T : supprimer un terme de la somme des probabilités totales
    explain: (c) => fill(t("Les sains aussi peuvent être positifs : il manque la branche {b} · {pb} = {v}."), c),
  }),
  trap({
    id: 'p_cond_denominator', family: 'proba', tag: 'E', skill: 'p-cond-total', repair: 'p-cond-total',
    name: t("Mauvais dénominateur du conditionnement"),
    example: ["Pr(A | B) = Pr(A ∩ B)/Pr(A)", "/Pr(B)"],
    check: { bait: { skill: 'p-cond-total' } },
    // T : remplacer le dénominateur par Pr(A)
    explain: (c) => fill(t("On conditionne par B : on divise par Pr(B) = {pb}, la probabilité de ce que l'on sait."), c),
  }),
  trap({
    id: 'p_cond_inverse', family: 'proba', tag: 'R', skill: 'p-bayes-freq', repair: 'p-cond-total',
    name: t("Conditionnement inversé"),
    example: ["Pr(M | +) = 0,9", "1/12"],
    source: "Eddy 1982",
    wrong: ['1/12', '0.9'],
    // W : Pr(+ | M)
    explain: (c) => fill(t("{v} est la probabilité d'être positif quand on est malade. La question demande l'inverse : malade quand on est positif."), c),
  }),
  trap({
    id: 'p_base_rate', family: 'proba', tag: 'R', skill: 'p-bayes-freq', repair: 'p-bayes-freq',
    name: t("Taux de base oublié"),
    example: ["0,9 · 0,5/(0,9 · 0,5 + 0,1 · 0,5) = 0,9", "1/12"],
    source: "Tversky & Kahneman 1974",
    wrong: ['1/12', '0.9'],
    // T : remplacer Pr(M) et Pr(Mᶜ) par 1/2
    explain: (c) => fill(t("Tu as fait comme si la moitié des gens étaient malades. Seuls {π} le sont : sur 1 000 personnes, {nM} malades."), c),
  }),
  trap({
    id: 'p_bayes_joint', family: 'proba', tag: 'E', skill: 'p-bayes-freq', repair: 'p-bayes-freq',
    name: t("Probabilité conjointe au lieu de conditionnelle"),
    example: ["9/1 000", "9/108"],
    wrong: ['1/12', '9/1000'],
    // W : Pr(M ∩ +)
    explain: (c) => t("9/1 000 est la part des malades positifs dans toute la population. On ne regarde que les positifs : 9 sur 108."),
  }),
  trap({
    id: 'p_two_tests_square', family: 'proba', tag: 'E', skill: 'p-bayes-formula', repair: 'p-bayes-formula',
    name: t("A posteriori élevé au carré"),
    example: ["(1/12)²", "9/20"],
    wrong: ['9/20', '1/144'],
    // W : Pr(M | +)²
    explain: (c) => t("Un second test positif doit <b>augmenter</b> la probabilité d'être malade ; (1/12)² la diminue. Ce sont les vraisemblances qui s'élèvent au carré."),
  }),
  trap({
    id: 'p_two_tests_uncond', family: 'proba', tag: 'E', skill: 'p-bayes-formula', repair: 'p-indep',
    name: t("Tests indépendants sans condition"),
    example: ["Pr(+, +) = 0,108²", "0,0081 + 0,0099"],
    wrong: ['0.018', '0.011664'],
    // T : remplacer Pr(+, +) par Pr(+)²
    explain: (c) => t("Les tests sont indépendants <b>sachant l'état</b>, pas en général : Pr(+, +) = Σ Pr(+ | état)²·Pr(état)."),
  }),
  trap({
    id: 'p_indep_disjoint', family: 'proba', tag: 'E', skill: 'p-indep', repair: 'p-indep',
    name: t("Incompatibles pris pour indépendants"),
    example: [t("incompatibles ⇒ indépendants"), ""],
    check: { bait: { skill: 'p-indep' } },
    // T : Pr(A ∩ B) = 0 pour des indépendants, = Pr(A)Pr(B) pour des incompatibles ; D
    explain: (c) => t("Si A et B sont incompatibles, savoir que B a lieu dit que A n'a pas lieu : ils sont très dépendants."),
  }),
  trap({
    id: 'p_pairwise_mutual', family: 'logic', tag: 'E', skill: 'p-indep', repair: 'p-indep',
    name: t("Deux à deux pris pour mutuellement"),
    example: [t("deux à deux ⇒ mutuellement"), t("non")],
    check: { bait: { skill: 'p-indep' } },
    // D : « oui, les trois paires sont indépendantes »
    explain: (c) => fill(t("Il faut aussi Pr(A ∩ B ∩ C) = Pr(A)Pr(B)Pr(C) ; ici {v} ≠ {w}."), c),
  }),
  trap({
    id: 'p_atleast_one_np', family: 'proba', tag: 'E', skill: 'p-indep', repair: 'p-binom',
    name: t("« Au moins un » calculé par n·p"),
    example: [t("Pr(au moins un) = n·p"), "1 − (1 − p)ⁿ"],
    wrong: ['0.271', '0.3'],
    // W : n·p, 1 − pⁿ
    explain: (c) => fill(t("{n} · {p} = {v} peut dépasser 1. « Au moins un » est le contraire de « aucun » : 1 − (1 − p)ⁿ."), c),
  }),
  trap({
    id: 'p_series_parallel', family: 'proba', tag: 'E', skill: 'p-indep', repair: 'p-indep',
    name: t("Série et parallèle échangés"),
    example: [t("parallèle = Π pᵢ"), "1 − Π(1 − pᵢ)"],
    wrong: ['0.999', '0.729'],
    // W : formules échangées
    explain: (c) => t("En parallèle, le système marche si <b>au moins un</b> composant marche ; Π pᵢ est la formule du montage en série."),
  }),
  trap({
    id: 'p_cdf_strict', family: 'notation', tag: 'E', skill: 'p-disc-pmf', repair: 'p-disc-pmf',
    name: t("Inégalité stricte dans F"),
    example: ["Pr(X < 2) = F(2)", "F(1)"],
    wrong: ['0.4', '0.8'],
    // T : décaler l'indice de F d'un cran
    explain: (c) => t("F(x) = Pr(X ≤ x) inclut x. Pour une variable discrète, Pr(X < 2) = F(1)."),
  }),
  trap({
    id: 'p_quantile_inverse', family: 'notation', tag: 'E', skill: 'p-disc-pmf', repair: 'p-cont-quantile',
    name: t("F(α) au lieu de F⁻¹(α)"),
    example: ["q₀,₅ = F(0,5)", "F⁻¹(0,5)"],
    check: { bait: { skill: 'p-disc-pmf' } },
    // W : F(α), f(α)
    explain: (c) => fill(t("On cherche x tel que F(x) = {α}, pas la valeur de F en {α}."), c),
  }),
  trap({
    id: 'p_geom_support', family: 'notation', tag: 'C', skill: 'p-disc-pmf', repair: 'p-disc-pmf',
    name: t("Convention de la loi géométrique"),
    example: ["E = 1/p", "(1 − p)/p (MATH-234)"],
    wrong: ['3', '4'],
    // W : formules de l'autre convention
    explain: (c) => t("Ici X compte les échecs avant le premier succès (x = 0, 1, …) : E[X] = (1 − p)/p. La version qui compte les essais a E = 1/p."),
  }),
  trap({
    id: 'p_binom_no_coef', family: 'proba', tag: 'E', skill: 'p-binom', repair: 'g7-binomial',
    name: t("Coefficient binomial oublié"),
    example: ["0,03456", "0,3456"],
    wrong: ['0.3456', '0.03456'],
    // T : supprimer C(n, k)
    explain: (c) => fill(t("{v} est la probabilité d'<b>une</b> suite précise. Il y a C({n}, {k}) = {c} places possibles pour les succès."), c),
  }),
  trap({
    id: 'p_binom_swap_p', family: 'proba', tag: 'E', skill: 'p-binom', repair: 'p-binom',
    name: t("p et 1 − p échangés"),
    example: ["0,4³ · 0,6²", "0,6³ · 0,4²"],
    wrong: ['0.3456', '0.2304'],
    // T : échanger p et 1 − p
    explain: (c) => fill(t("p = {p} va avec le nombre de succès {k}."), c),
  }),
  trap({
    id: 'p_poisson_rate_scale', family: 'proba', tag: 'E', skill: 'p-poisson', repair: 'p-poisson',
    name: t("Taux de Poisson pas mis à l'échelle"),
    example: [t("λ = 2 par heure pour 3 h"), "λ = 6"],
    wrong: ['6', '2'],
    // W : formule avec λ non changé d'échelle
    explain: (c) => fill(t("{λ} est le taux par {unité}. Sur {t} {unité}s, le taux est {t} · {λ}."), c),
  }),
  trap({
    id: 'p_poisson_no_factorial', family: 'calculus', tag: 'E', skill: 'p-poisson', repair: 'p-poisson',
    name: t("k! oublié"),
    example: ["λᵏe^(−λ)", "λᵏe^(−λ)/k!"],
    check: { bait: { skill: 'p-poisson' } },
    // T : supprimer /k!
    explain: (c) => fill(t("Il manque k! = {kf} au dénominateur ; sans lui, les probabilités ne somment pas à 1."), c),
  }),
  trap({
    id: 'p_poisson_approx_bad', family: 'method', tag: 'E', skill: 'p-poisson', repair: 'p-poisson',
    name: t("Approximation de Poisson abusive"),
    example: ["B(20 ; 0,5) ≈ Poiss(10)", t("non")],
    check: { bait: { skill: 'p-poisson' } },
    // D : « Poisson » quand p n'est pas petit, ou « normale » quand np ≈ 1
    explain: (c) => fill(t("L'approximation de Poisson demande p petit ; avec p = {p}, elle est mauvaise."), c),
  }),
];
