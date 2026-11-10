// Traps of module P, part c (step U7): the traps of the catalogue
// (docs/universite/P-probabilites.md, « Pièges du module ») whose skill is
// in proba-c.skills.js. Most are wrong values that the generators write in
// cfg.traps (js/cas/rules/stattrap.js); the phrases (P) and decisions (D)
// are options of multiple choices and decision lines, which name them.
// explain(c) fills the {…} of the catalogue's explanation with c, the
// ctx the generator gives with the values (« … » when it gives none).
// The comment above each explain is the catalogue's « transformation ».

import { trap } from './stattrap.js';

const fill = (t, c = {}) => t.replace(/\{([^}]+)\}/g, (m, k) => (c[k] !== undefined && c[k] !== null ? String(c[k]).replace('.', ',').replace('-', '−') : '…'));

export const RULES = [
  trap({
    id: 'p_corr_causal', family: 'proba', tag: 'C', skill: 'p-cov-corr', repair: 'p-cov-corr',
    name: "Corrélation prise pour causalité",
    example: ["« r = 0,8 : X cause Y »", ""],
    source: "cours MATH-234, semaine 6",
    check: { bait: { skill: 'p-cov-corr' } },
    // P : « X cause Y », « il suffit d'agir sur X »
    explain: (c) => fill("Une corrélation peut venir d'une cause commune ({z}) ou du hasard ; elle ne dit pas le sens de la cause.", c),
  }),
  trap({
    id: 'p_corr_scale', family: 'proba', tag: 'E', skill: 'p-cov-corr', repair: 'p-cov-corr',
    name: "Corrélation changée par l'échelle",
    example: ["corr(2X + 1, −Y) = −6", "−0,5"],
    wrong: ['0.5', '6'],
    // W : la covariance au lieu de la corrélation, a·c·corr
    explain: (c) => "La corrélation ne change pas d'échelle : seul le signe de a·c compte.",
  }),
  trap({
    id: 'p_corr_slope', family: 'proba', tag: 'E', skill: 'p-cov-corr', repair: 'p-reg-ls',
    name: "Corrélation prise pour la pente",
    example: ["r = 0,5 ⇒ Y = 0,5X", ""],
    check: { bait: { skill: 'p-cov-corr' } },
    // P
    explain: (c) => fill("r mesure l'alignement, pas la pente ; la pente vaut r·s_y/s_x = {b}.", c),
  }),
  trap({
    id: 'p_total_var_forget', family: 'proba', tag: 'E', skill: 'p-total-expect', repair: 'p-total-expect',
    name: "Variance des moyennes oubliée",
    example: ["var = 1,17", "1,41"],
    wrong: ['1.41', '1.17'],
    // T : supprimer var(E[X | Y])
    explain: (c) => fill("Il manque la variance due au choix de l'examinateur : var(E[N | ·]) = {v}.", c),
  }),
  trap({
    id: 'p_total_expect_unweighted', family: 'proba', tag: 'E', skill: 'p-total-expect', repair: 'p-cond-total',
    name: "Moyenne non pondérée des espérances",
    example: ["E = (2,5 + 3,5)/2", "0,6 · 2,5 + 0,4 · 3,5"],
    wrong: ['3.5', '2'],
    // W : moyenne simple des espérances conditionnelles
    explain: (c) => fill("Mary interroge plus souvent ({p}) : on pondère par les probabilités.", c),
  }),
  trap({
    id: 'p_mixture_vs_sum', family: 'proba', tag: 'C', skill: 'p-sum-mixture', repair: 'p-total-expect',
    name: "Mélange pris pour une somme pondérée",
    example: ["var(mélange) = 0,58", "4,36"],
    source: "EE-209, partie 1B",
    wrong: ['4.36', '0.58'],
    // W : Σ πₖ² σₖ²
    explain: (c) => "0,58 est la variance de 0,3X₁ + 0,7X₂. Un mélange <b>choisit</b> une composante ; l'écart entre les moyennes ajoute de la variance.",
  }),
  trap({
    id: 'p_sum_density_add', family: 'proba', tag: 'E', skill: 'p-sum-mixture', repair: 'p-sum-mixture',
    name: "Densités additionnées",
    example: ["f_{X+Y} = f_X + f_Y", "convolution"],
    check: { bait: { skill: 'p-sum-mixture' } },
    // W : f_X + f_Y
    explain: (c) => "f_X + f_Y intègre à 2 : ce n'est pas une densité. La somme demande une convolution.",
  }),
  trap({
    id: 'p_conv_bounds', family: 'calculus', tag: 'E', skill: 'p-sum-mixture', repair: 'p-joint-cont',
    name: "Bornes de la convolution",
    example: ["∫₀¹ dy pour tout z", "∫ sur [max(0, z − 1) ; min(1, z)]"],
    check: { bait: { skill: 'p-sum-mixture' } },
    // T : bornes [0 ; 1] sans découpage selon z
    explain: (c) => "Il faut 0 ≤ y ≤ 1 <b>et</b> 0 ≤ z − y ≤ 1 : les bornes dépendent de z.",
  }),
  trap({
    id: 'p_chebyshev_k', family: 'calculus', tag: 'E', skill: 'p-markov-cheb', repair: 'p-markov-cheb',
    name: "Tchebychev en 1/k",
    example: ["≤ 1/2", "≤ 1/4"],
    wrong: ['1/4', '1/2'],
    // W : 1/k
    explain: (c) => fill("Tchebychev donne 1/k² ; avec k = {k}, 1/{k2}.", c),
  }),
  trap({
    id: 'p_markov_negative', family: 'method', tag: 'E', skill: 'p-markov-cheb', repair: 'p-markov-cheb',
    name: "Markov pour une variable négative",
    example: ["Markov pour X ~ N(0, 1)", "non applicable"],
    check: { bait: { skill: 'p-markov-cheb' } },
    // D : « Markov » quand X peut être négative
    explain: (c) => "Markov demande X ≥ 0.",
  }),
  trap({
    id: 'p_gambler', family: 'proba', tag: 'R', skill: 'p-markov-cheb', repair: 'p-indep',
    name: "Erreur du joueur",
    example: ["Pr(face | 5 piles) > 1/2", "= 1/2"],
    source: "Tversky & Kahneman 1974",
    check: { bait: { skill: 'p-markov-cheb' } },
    // P : « face est plus probable » ; W : 1 − (1/2)^(k+1)
    explain: (c) => "Les lancers sont indépendants : la pièce n'a pas de mémoire.",
  }),
  trap({
    id: 'p_lln_count', family: 'proba', tag: 'E', skill: 'p-markov-cheb', repair: 'p-markov-cheb',
    name: "Loi des grands nombres sur les nombres",
    example: ["#piles − #faces", "0 : faux"],
    check: { bait: { skill: 'p-markov-cheb' } },
    // P
    explain: (c) => "C'est la <b>proportion</b> qui tend vers 1/2 ; l'écart en nombre grandit comme √n.",
  }),
  trap({
    id: 'p_clt_sum_sd', family: 'calculus', tag: 'E', skill: 'p-clt-sum', repair: 'p-lin-combo',
    name: "Écart-type d'une somme en n·σ",
    example: ["sd(S) = 16 · 20", "√16 · 20"],
    check: { bait: { skill: 'p-clt-sum' } },
    // T : n·σ au lieu de σ√n
    explain: (c) => fill("Les variances s'additionnent : var(S) = {n} · {σ}², donc sd(S) = σ√n = {v}.", c),
  }),
  trap({
    id: 'p_clt_population', family: 'method', tag: 'C', skill: 'p-clt-sum', repair: 'p-clt-sum',
    name: "TCL : la population grande",
    example: ["« la population doit être grande »", "l'échantillon"],
    source: "QCM EE-209 2023",
    check: { bait: { skill: 'p-clt-sum' } },
    // P
    explain: (c) => "Le TCL porte sur la moyenne de n observations : c'est n, la taille de l'échantillon, qui doit être grande.",
  }),
  trap({
    id: 'p_clt_needs_normal', family: 'method', tag: 'C', skill: 'p-clt-sum', repair: 'p-clt-sum',
    name: "TCL : la population normale",
    example: ["« la population doit être normale »", "non"],
    check: { bait: { skill: 'p-clt-sum' } },
    // P
    explain: (c) => "Justement, le TCL sert quand la population n'est pas normale.",
  }),
  trap({
    id: 'p_se_forgot_sqrt_n', family: 'calculus', tag: 'E', skill: 'p-clt-sum', repair: 'p-lin-combo',
    name: "Division par √n oubliée",
    example: ["se = σ", "σ/√n"],
    check: { bait: { skill: 'p-clt-sum' } },
    // T : supprimer /√n
    explain: (c) => fill("La moyenne de {n} observations varie moins qu'une seule : écart-type σ/√{n} = {v}.", c),
  }),
  trap({
    id: 'p_binom_var_as_sd', family: 'calculus', tag: 'E', skill: 'p-clt-binom', repair: 'p-binom',
    name: "Variance de la binomiale prise pour l'écart-type",
    example: ["σ = 25", "5"],
    wrong: ['5', '25'],
    // T : supprimer la racine de np(1 − p)
    explain: (c) => fill("np(1 − p) = {v} est la variance ; l'écart-type est √{v}.", c),
  }),
  trap({
    id: 'p_mom_s2', family: 'numeric', tag: 'E', skill: 'p-mom', repair: 'p-mom',
    name: "Moments avec le diviseur n − 1",
    example: ["σ̂² = 72/5", "72/6"],
    wrong: ['72/6', '72/5'],
    // W : moments avec SS/(n − 1)
    explain: (c) => fill("La méthode des moments égale au moment empirique (1/n)Σ(xᵢ − x̄)² : divise par n = {n}.", c),
  }),
  trap({
    id: 'p_mom_wrong_moment', family: 'method', tag: 'E', skill: 'p-mom', repair: 'p-mom',
    name: "Carré de la moyenne au lieu de la moyenne des carrés",
    example: ["E[X²] = x̄²", "(1/n)Σxᵢ²"],
    check: { bait: { skill: 'p-mom' } },
    // T : remplacer m₂ par x̄²
    explain: (c) => "Le moment empirique d'ordre 2 est la moyenne des carrés, pas le carré de la moyenne.",
  }),
  trap({
    id: 'p_mle_no_check', family: 'method', tag: 'C', skill: 'p-mle', repair: 'p-mle',
    name: "Maximum pas vérifié",
    example: ["θ̂ sans vérification", "avec ℓ″ < 0"],
    source: "cours MATH-234",
    check: { bait: { skill: 'p-mle' } },
    // le juge renvoie stay « Montre que c'est un maximum » si la ligne ℓ″ manque ; D : « ℓ′(θ̂) = 0 suffit »
    explain: (c) => fill("Un point où ℓ′ s'annule peut être un minimum ; ℓ″ = {d2} < 0 le garantit.", c),
  }),
  trap({
    id: 'p_mle_constant_kept', family: 'calculus', tag: 'E', skill: 'p-mle', repair: 'g6-deriv-rules',
    name: "Terme constant dérivé",
    example: ["d/dλ(−Σ ln xᵢ!) ≠ 0", "0"],
    check: { bait: { skill: 'p-mle' } },
    // T : dériver un terme sans θ comme s'il en dépendait (ou dériver Σxᵢ en θ)
    explain: (c) => fill("Σxᵢ = {S} est une donnée : sa dérivée en λ est 0.", c),
  }),
  trap({
    id: 'p_mle_solve', family: 'calculus', tag: 'E', skill: 'p-mle', repair: 'iso-formula',
    name: "Équation de vraisemblance mal résolue",
    example: ["16/λ − 8 = 0 ⇒ λ = 1/2", "2"],
    wrong: ['2', '1/2'],
    // W : inverse de la bonne valeur
    explain: (c) => "16/λ = 8 donne λ = 16/8 = 2.",
  }),
  trap({
    id: 'p_wald_var_inverse', family: 'method', tag: 'C', skill: 'p-mle', repair: 'p-ci-wald',
    name: "Variance de Wald pas inversée",
    example: ["se = √J = 2", "1/√J = 1/2"],
    wrong: ['1/2', '2'],
    // W : √J, J, 1/J
    explain: (c) => fill("La variance asymptotique est l'<b>inverse</b> de J = {J} ; l'erreur standard est 1/√J = {se}.", c),
  }),
  trap({
    id: 'p_wald_sign', family: 'calculus', tag: 'E', skill: 'p-mle', repair: 'p-ci-wald',
    name: "Signe de l'information observée",
    example: ["J = ℓ″(θ̂) = −4", "4"],
    check: { bait: { skill: 'p-mle' } },
    // W : ℓ″(θ̂) sans le signe moins
    explain: (c) => fill("Au maximum ℓ″ < 0 ; J = −ℓ″(θ̂) = {J} est positive.", c),
  }),
  trap({
    id: 'p_mle_support', family: 'method', tag: 'C', skill: 'p-mle-special', repair: 'p-mle-special',
    name: "MLE au bord du support manqué",
    example: ["« pas de MLE » ou θ̂ = 2x̄", "max xᵢ"],
    source: "séries 9–10 MATH-234",
    check: { bait: { skill: 'p-mle-special' } },
    // W : 2x̄, « n'existe pas »
    explain: (c) => fill("ℓ′ ne s'annule pas parce que le maximum est au bord : L vaut 0 si θ < {max} et décroît ensuite.", c),
  }),
  trap({
    id: 'p_mle_invariance_ignored', family: 'method', tag: 'C', skill: 'p-mle-special', repair: 'p-mle-special',
    name: "Invariance du MLE ignorée",
    example: ["MLE de Pr(X ≤ 2) = (1/n)Σ1{Xᵢ ≤ 2}", "1 − e^(−2/X̄)"],
    source: "QCM EE-209 2023",
    check: { bait: { skill: 'p-mle-special' } },
    // W
    explain: (c) => "Dans le modèle exponentiel, le MLE de g(θ) est g(θ̂) ; la fréquence empirique n'utilise pas le modèle.",
  }),
  trap({
    id: 'p_mse_bias_not_squared', family: 'calculus', tag: 'E', skill: 'p-bias-mse', repair: 'p-bias-mse',
    name: "Biais pas au carré dans l'EQM",
    example: ["EQM = var + biais", "var + biais²"],
    check: { bait: { skill: 'p-bias-mse' } },
    // T : enlever le carré du biais
    explain: (c) => fill("EQM = var + biais² ; un biais de {b} ajoute {b2}.", c),
  }),
  trap({
    id: 'p_unbiased_better', family: 'proba', tag: 'E', skill: 'p-bias-mse', repair: 'p-bias-mse',
    name: "Sans biais pris pour meilleur",
    example: ["sans biais ⇒ meilleur", "comparer les EQM"],
    check: { bait: { skill: 'p-bias-mse' } },
    // P ; tf
    explain: (c) => "Un estimateur un peu biaisé mais beaucoup moins variable peut avoir une EQM plus petite.",
  }),
  trap({
    id: 'p_fisher_per_obs', family: 'notation', tag: 'C', skill: 'p-fisher-cr', repair: 'p-fisher-cr',
    name: "Information d'une seule observation",
    example: ["borne = λ", "λ/n"],
    source: "formulaire EE-209",
    check: { bait: { skill: 'p-fisher-cr' } },
    // W : 1/I₁
    explain: (c) => fill("Pour n observations, l'information est n·I₁ ; la borne est 1/(n·I₁) = {v}.", c),
  }),
  trap({
    id: 'p_fisher_sign', family: 'calculus', tag: 'E', skill: 'p-fisher-cr', repair: 'p-fisher-cr',
    name: "Signe de l'information de Fisher",
    example: ["I₁ = −1/λ", "1/λ"],
    check: { bait: { skill: 'p-fisher-cr' } },
    // W : E[∂²ln f] sans le signe
    explain: (c) => "I₁ = −E[∂²ln f/∂θ²] est positive.",
  }),
  trap({
    id: 'p_cr_biased', family: 'proba', tag: 'E', skill: 'p-fisher-cr', repair: 'p-fisher-cr',
    name: "Cramér-Rao pour un estimateur biaisé",
    example: ["borne pour tout estimateur", "seulement sans biais"],
    check: { bait: { skill: 'p-fisher-cr' } },
    // P ; tf
    explain: (c) => "L'estimateur constant a une variance nulle : la borne ne vaut que pour les estimateurs sans biais.",
  }),
];
