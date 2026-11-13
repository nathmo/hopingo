// Traps of module P, part e (step U7): the traps of the catalogue
// (docs/universite/P-probabilites.md, « Pièges du module ») whose skill is
// in proba-e.skills.js. Most are wrong values that the generators write in
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
    id: 'p_r2_r', family: 'notation', tag: 'E', skill: 'p-reg-ls', repair: 'p-reg-ls',
    name: t("R² et r confondus"),
    example: ["R² = 0,775", "0,6"],
    wrong: ['0.6', '0.775'],
    // W : r pour R², √R² pour r
    explain: (c) => fill(t("R² est le carré de r : r = {r} donne R² = {r2}. Ne confonds pas le coefficient de corrélation et le coefficient de détermination."), c),
  }),
  trap({
    id: 'p_ci_prob', family: 'proba', tag: 'R', skill: 'p-interpret', repair: 'p-interpret',
    name: t("IC lu comme une probabilité sur θ"),
    example: [t("« 95 % de chances que μ ∈ [a ; b] »"), ""],
    source: "Hoekstra et al. 2014",
    check: { bait: { skill: 'p-interpret' } },
    // P
    explain: (c) => t("μ est fixe : une fois calculé, l'IC le contient ou non. Les 95 % décrivent la méthode sur des répétitions."),
  }),
  trap({
    id: 'p_ci_data', family: 'proba', tag: 'E', skill: 'p-interpret', repair: 'p-interpret',
    name: t("IC lu comme l'intervalle des données"),
    example: [t("« 95 % des mesures sont dans l'IC »"), ""],
    check: { bait: { skill: 'p-interpret' } },
    // P
    explain: (c) => t("L'IC porte sur μ, pas sur les données ; il rétrécit avec n, la dispersion des données non."),
  }),
  trap({
    id: 'p_ci_xbar', family: 'proba', tag: 'E', skill: 'p-interpret', repair: 'p-interpret',
    name: t("IC lu comme un intervalle pour x̄"),
    example: [t("« x̄ est dans l'IC avec probabilité 0,95 »"), ""],
    check: { bait: { skill: 'p-interpret' } },
    // P
    explain: (c) => t("L'estimation (x̄, p̂) est le centre de l'IC : elle y est toujours, ce n'est pas une question de probabilité."),
  }),
  trap({
    id: 'p_ci_intersection', family: 'proba', tag: 'C', skill: 'p-interpret', repair: 'p-interpret',
    name: t("Intersection de deux IC"),
    example: [t("intersection de deux IC à 95 %"), t("pas garantie")],
    source: "QCM EE-209 2023, Q10",
    check: { bait: { skill: 'p-interpret' } },
    // P ; tf
    explain: (c) => t("Chaque IC peut manquer θ dans 5 % des cas ; leur intersection peut le manquer plus souvent."),
  }),
  trap({
    id: 'p_accept_h0', family: 'proba', tag: 'C', skill: 'p-interpret', repair: 'p-interpret',
    name: t("« Ne pas rejeter » lu comme « H₀ prouvée »"),
    example: [t("« H₀ est vraie »"), t("« pas de preuve contre H₀ »")],
    check: { bait: { skill: 'p-interpret' } },
    // P
    explain: (c) => t("Ne pas rejeter veut dire que les données sont compatibles avec H₀, pas qu'elles la prouvent (peu de données, faible puissance)."),
  }),
  trap({
    id: 'p_pvalue_h0', family: 'proba', tag: 'R', skill: 'p-interpret', repair: 'p-interpret',
    name: t("p-valeur lue comme Pr(H₀)"),
    example: [t("« p = Pr(H₀ vraie) »"), ""],
    source: "Haller & Krauss 2002",
    check: { bait: { skill: 'p-interpret' } },
    // P
    explain: (c) => t("La p-valeur se calcule <b>en supposant</b> H₀ vraie : elle ne peut pas donner la probabilité de H₀."),
  }),
  trap({
    id: 'p_reject_10_5', family: 'logic', tag: 'C', skill: 'p-interpret', repair: 'p-interpret',
    name: t("Rejet à 10 % pris pour rejet à 5 %"),
    example: [t("rejet à 10 % ⇒ rejet à 5 %"), t("on ne sait pas")],
    source: "QCM EE-209 2023, Q16",
    check: { bait: { skill: 'p-interpret' } },
    // P
    explain: (c) => t("Si p_obs = 0,07, on rejette à 10 % mais pas à 5 %. C'est l'inverse qui est vrai."),
  }),
  trap({
    id: 'p_significant_large', family: 'proba', tag: 'E', skill: 'p-interpret', repair: 'p-interpret',
    name: t("Significatif pris pour important"),
    example: [t("« significatif, donc grand effet »"), ""],
    check: { bait: { skill: 'p-interpret' } },
    // P
    explain: (c) => t("Avec n grand, un effet minuscule devient significatif ; regarde l'IC pour la taille de l'effet."),
  }),
  trap({
    id: 'p_multiple_tests', family: 'proba', tag: 'C', skill: 'p-interpret', repair: 'p-interpret',
    name: t("Tests multiples"),
    example: [t("1 rejet sur 20 tests ⇒ effet"), t("hasard possible")],
    source: "MATH-234, semaine 10 : p-hacking",
    check: { bait: { skill: 'p-interpret' } },
    // P
    explain: (c) => t("Sur 20 tests à 5 % avec H₀ vraie, on attend un rejet par hasard."),
  }),
  trap({
    id: 'p_chi2_proportions', family: 'method', tag: 'E', skill: 'p-test-chi2-gof', repair: 'p-test-chi2-gof',
    name: t("χ² avec des proportions"),
    example: [t("T = 13,4/60 ≈ 0,223 (avec des fréquences)"), t("T = 13,4 (avec des effectifs)")],
    wrong: ['13.4', '67/300'],
    // W : T/n
    explain: (c) => fill(t("Le χ² compare des <b>effectifs</b> ; avec des proportions, T est divisé par n = {n}."), c),
  }),
  trap({
    id: 'p_chi2_df', family: 'method', tag: 'C', skill: 'p-test-chi2-gof', repair: 'p-test-chi2-gof',
    name: t("Degrés de liberté du χ² d'adéquation"),
    example: [t("r = 6 (dé, 6 classes)"), "r = 6 − 1 = 5"],
    source: "formulaire MATH-234",
    wrong: ['5', '6'],
    // W : quantile lu avec r = k, ou sans retirer c
    explain: (c) => fill(t("r = {k} − 1 − {c} = {r} : un degré perdu par la somme fixée, un par paramètre estimé."), c),
  }),
  trap({
    id: 'p_chi2_divide_obs', family: 'calculus', tag: 'E', skill: 'p-test-chi2-gof', repair: 'p-test-chi2-gof',
    name: t("Division par l'effectif observé"),
    example: ["T = Σ(oᵢ − eᵢ)²/oᵢ ≈ 11,11", "T = Σ(oᵢ − eᵢ)²/eᵢ = 13,4"],
    wrong: ['13.4', '100/9'],
    // W
    explain: (c) => t("On divise par l'effectif <b>attendu</b> sous H₀."),
  }),
  trap({
    id: 'p_chi2_df_indep', family: 'method', tag: 'E', skill: 'p-test-chi2-indep', repair: 'p-test-chi2-indep',
    name: t("Degrés de liberté du χ² d'indépendance"),
    example: ["r = 2 · 2 − 1 = 3", "r = (2 − 1)(2 − 1) = 1"],
    wrong: ['1', '3'],
    // W
    explain: (c) => fill(t("Les marges sont estimées : r = ({h} − 1)({k} − 1) = {r}."), c),
  }),
  trap({
    id: 'p_chi2_expected_uniform', family: 'method', tag: 'E', skill: 'p-test-chi2-indep', repair: 'p-test-chi2-indep',
    name: t("Effectifs attendus uniformes"),
    example: ["e₁₁ = 100/4 = 25", "e₁₁ = 40 · 50/100 = 20"],
    wrong: ['20', '25'],
    // W
    explain: (c) => t("Sous l'indépendance, e_ij = (total ligne × total colonne)/n, pas une répartition uniforme."),
  }),
  trap({
    id: 'p_chi2_var_n', family: 'calculus', tag: 'E', skill: 'p-test-chi2-var', repair: 'p-test-chi2-var',
    name: t("Pivot du χ² avec n"),
    example: ["T = 11 · 15/10 = 16,5", "T = 10 · 15/10 = 15"],
    wrong: ['15', '16.5'],
    // W
    explain: (c) => t("Avec s² (diviseur n − 1), le pivot est (n − 1)s²/σ₀²."),
  }),
  trap({
    id: 'p_chi2_var_inverted', family: 'calculus', tag: 'E', skill: 'p-test-chi2-var', repair: 'p-test-chi2-var',
    name: t("Pivot du χ² inversé"),
    example: ["T = 10 · 10/15 ≈ 6,67", "T = 10 · 15/10 = 15"],
    wrong: ['15', '20/3'],
    // W
    explain: (c) => t("Le pivot met la variance observée au numérateur : T = (n − 1)s²/σ₀², qui grandit quand s² dépasse σ₀²."),
  }),
  trap({
    id: 'p_chi2_ci_swapped', family: 'calculus', tag: 'E', skill: 'p-test-chi2-var', repair: 'p-test-chi2-var',
    name: t("Quantiles de l'IC de σ² échangés"),
    example: [t("borne inférieure = 150/3,247 ≈ 46,20"), t("borne inférieure = 150/20,483 ≈ 7,32")],
    wrong: ['150/20.483', '150/3.247'],
    // W : bornes inversées (inf > sup) ou divisées par le mauvais quantile
    explain: (c) => t("Diviser par le <b>grand</b> quantile donne la <b>petite</b> borne."),
  }),
  trap({
    id: 'p_reg_x_on_y', family: 'proba', tag: 'C', skill: 'p-reg-ls', repair: 'p-reg-ls',
    name: t("Droite de x sur y prise pour l'inverse"),
    example: [t("x = (y − 2,2)/0,6 : pente 1/0,6 ≈ 1,67"), t("pente de x sur y = S_xy/S_yy = 6/6 = 1")],
    source: "QCM EE-209 2023, Q20",
    wrong: ['1', '5/3'],
    // W
    explain: (c) => t("Régresser x sur y minimise d'autres écarts (horizontaux) : ce n'est pas la droite inverse, sauf si |r| = 1."),
  }),
  trap({
    id: 'p_reg_slope_swap', family: 'calculus', tag: 'E', skill: 'p-reg-ls', repair: 'p-reg-ls',
    name: t("Pente divisée par S_yy"),
    example: ["β̂ = S_xy/S_yy = 6/6 = 1", "β̂ = S_xy/S_xx = 6/10 = 0,6"],
    wrong: ['0.6', '1'],
    // W
    explain: (c) => t("La pente de y sur x divise par la dispersion de x : β̂ = S_xy/S_xx."),
  }),
  trap({
    id: 'p_reg_sums_raw', family: 'calculus', tag: 'E', skill: 'p-reg-ls', repair: 'p-reg-ls',
    name: t("Sommes pas centrées"),
    example: ["β̂ = Σxy/Σx² = 66/55 = 1,2", "β̂ = S_xy/S_xx = 0,6"],
    wrong: ['0.6', '6/5'],
    // W
    explain: (c) => t("Il faut centrer : Σxᵢyᵢ − n·x̄ȳ et Σxᵢ² − n·x̄²."),
  }),
  trap({
    id: 'p_reg_sigma_n', family: 'numeric', tag: 'C', skill: 'p-reg-test', repair: 'p-reg-test',
    name: t("σ̂² de la régression divisé par n"),
    example: ["σ̂² = 2,4/5", "2,4/3"],
    wrong: ['2.4/3', '2.4/5'],
    // W : RSS/n, RSS/(n − 1)
    explain: (c) => fill(t("Deux paramètres estimés (α, β) : on divise par n − 2 = {v}."), c),
  }),
  trap({
    id: 'p_reg_se_alpha', family: 'calculus', tag: 'E', skill: 'p-reg-test', repair: 'p-reg-test',
    name: t("Erreur standard de l'ordonnée à l'origine"),
    example: ["se(α̂) = σ̂/√n ≈ 0,313", "σ̂·√(1/n + x̄²/S_xx) ≈ 0,712"],
    wrong: ['0.712', '0.3125'],
    // W
    explain: (c) => fill(t("L'ordonnée à l'origine est une extrapolation en x = 0 : le terme x̄²/S_xx = {v} compte."), c),
  }),
  trap({
    id: 'p_design_collinear', family: 'linear', tag: 'C', skill: 'p-reg-multi', repair: 'l-orth-lsq',
    name: t("Colonnes de design liées"),
    example: [t("colonnes 1, 1_T, 1_H, x"), t("colonnes 1_T, 1_H, x")],
    source: "QCM EE-209 2023, Q19",
    check: { bait: { skill: 'p-reg-multi', exam: 'mcq' } },
    // le juge matrix détecte des colonnes dépendantes
    explain: (c) => t("1_T + 1_H = colonne de 1 : XᵀX n'est pas inversible."),
  }),
  trap({
    id: 'p_design_separate_slopes', family: 'method', tag: 'E', skill: 'p-reg-multi', repair: 'p-reg-multi',
    name: t("Une pente par groupe"),
    example: [t("deux colonnes de pente x·1_T, x·1_H"), t("une seule colonne x")],
    check: { bait: { skill: 'p-reg-multi', exam: 'mcq' } },
    // W (option de QCM)
    explain: (c) => t("Le modèle suppose la <b>même</b> pente a pour les deux races : une seule colonne x."),
  }),
  trap({
    id: 'p_f_df_swap', family: 'notation', tag: 'E', skill: 'p-reg-multi', repair: 'p-reg-multi',
    name: t("Degrés de liberté de F échangés"),
    example: ["ν₁ = n − p = 16 (F_{16, 2})", "ν₁ = p − q = 2 (F_{2, 16})"],
    wrong: ['2', '16'],
    // W
    explain: (c) => fill(t("Numérateur : p − q = {a} paramètres ; dénominateur : n − p = {b}."), c),
  }),
  trap({
    id: 'p_f_ratio_inverted', family: 'calculus', tag: 'E', skill: 'p-reg-multi', repair: 'p-reg-multi',
    name: t("Rapport F inversé"),
    example: ["F = (30/16)/(20/2) ≈ 0,19", "F = (20/2)/(30/16) ≈ 5,33"],
    wrong: ['16/3', '3/16'],
    // W : 1/F
    explain: (c) => t("Le gain par paramètre ajouté, (SC_q − SC_p)/(p − q), est au numérateur ; la variance résiduelle SC_p/(n − p) au dénominateur. Un grand F fait rejeter."),
  }),
  trap({
    id: 'p_diag_normal_y', family: 'method', tag: 'C', skill: 'p-reg-diag', repair: 'p-reg-diag',
    name: t("Normalité testée sur y"),
    example: [t("QQ-plot de y"), t("des résidus")],
    source: "MATH-234, semaine 14",
    check: { bait: { skill: 'p-reg-diag' } },
    // P
    explain: (c) => t("Le modèle suppose les <b>erreurs</b> normales ; y dépend de x et n'a pas à être normal."),
  }),
  trap({
    id: 'p_r2_high_good', family: 'proba', tag: 'E', skill: 'p-reg-diag', repair: 'p-reg-diag',
    name: t("R² élevé pris pour un bon modèle"),
    example: [t("R² = 0,95 ⇒ modèle adapté"), t("regarder les résidus")],
    check: { bait: { skill: 'p-reg-diag' } },
    // P ; tf
    explain: (c) => t("Une parabole peut donner R² élevé avec une droite ; la courbure se voit sur les résidus."),
  }),
  trap({
    id: 'p_outlier_delete', family: 'method', tag: 'C', skill: 'p-reg-diag', repair: 'p-reg-diag',
    name: t("Point aberrant supprimé"),
    example: [t("supprimer le point aberrant"), t("vérifier d'abord")],
    source: "MATH-234, semaine 14",
    check: { bait: { skill: 'p-reg-diag' } },
    // P
    explain: (c) => t("On ne retire un point que s'il est une erreur de mesure ; sinon on le signale et on compare les deux ajustements."),
  }),
  trap({
    id: 'p_beta_swap', family: 'notation', tag: 'E', skill: 'p-bayes-beta', repair: 'p-bayes-beta',
    name: t("Paramètres de Beta échangés"),
    example: ["Beta(1, 3) : α′ = 1", "Beta(3, 1) : α′ = 3"],
    wrong: ['3', '1'],
    // W : paramètres échangés
    explain: (c) => t("Les succès s'ajoutent au <b>premier</b> paramètre : Beta(α + N, β + n − N)."),
  }),
  trap({
    id: 'p_beta_prior_not_added', family: 'proba', tag: 'E', skill: 'p-bayes-beta', repair: 'p-bayes-beta',
    name: t("A priori oublié"),
    example: ["Beta(2, 0) : α′ = 2", "Beta(3, 1) : α′ = 3"],
    wrong: ['3', '2'],
    // W : Beta(N, n − N)
    explain: (c) => t("L'a priori uniforme est Beta(1, 1) : on ajoute les comptes à 1 et 1."),
  }),
  trap({
    id: 'p_map_pm_confused', family: 'notation', tag: 'E', skill: 'p-bayes-beta', repair: 'p-bayes-beta',
    name: t("MAP et moyenne a posteriori confondus"),
    example: ["MAP = 9/14", "2/3"],
    wrong: ['2/3', '9/14'],
    // W : PM pour MAP et l'inverse
    explain: (c) => t("Le MAP est le mode : (α − 1)/(α + β − 2) pour une Beta ; la PM est la moyenne α/(α + β)."),
  }),
  trap({
    id: 'p_gauss_posterior_avg', family: 'proba', tag: 'E', skill: 'p-bayes-gauss', repair: 'p-bayes-gauss',
    name: t("Moyenne a posteriori non pondérée"),
    example: ["μ_post = 2,35", "2,3"],
    wrong: ['2.3', '2.35'],
    // W : (μ₀ + x̄)/2
    explain: (c) => fill(t("Les deux sources n'ont pas la même précision : la mesure (précision {a}) pèse plus que l'a priori ({b})."), c),
  }),
  trap({
    id: 'p_gauss_post_var_add', family: 'calculus', tag: 'E', skill: 'p-bayes-gauss', repair: 'p-bayes-gauss',
    name: t("Variances additionnées"),
    example: ["σ²_post = 1,5", "1/3"],
    wrong: ['1/3', '1.5'],
    // W : τ² + σ²
    explain: (c) => t("Une donnée de plus réduit l'incertitude : ce sont les précisions qui s'additionnent."),
  }),
  trap({
    id: 'p_precision_n', family: 'calculus', tag: 'E', skill: 'p-bayes-gauss', repair: 'p-bayes-gauss',
    name: t("Taille minimale sans l'a priori"),
    example: ["n = 51", "50"],
    wrong: ['50', '51'],
    // W : n tiré de σ²/n < seuil (a priori oublié), ou inégalité mal tournée
    explain: (c) => t("Garde l'a priori : σ²_post = 1/(1/τ² + n/σ²). Résous 1/(1/τ² + n/σ²) < seuil, puis prends le plus petit n entier qui rend l'inégalité stricte vraie."),
  }),
  trap({
    id: 'p_dirichlet_alpha0', family: 'calculus', tag: 'E', skill: 'p-bayes-conjugate', repair: 'p-bayes-conjugate',
    name: t("Dénominateur de la moyenne de Dirichlet"),
    example: ["PM₁ = 4/10", "4/13"],
    wrong: ['4/13', '4/10'],
    // W : dénominateur n au lieu de α₀ + n
    explain: (c) => fill(t("La PM divise par la somme de tous les paramètres a posteriori : α₀ + n = {v}."), c),
  }),
  trap({
    id: 'p_multinomial_no_coef', family: 'calculus', tag: 'E', skill: 'p-bayes-conjugate', repair: 'p-count',
    name: t("Coefficient multinomial oublié"),
    example: ["1/64", "3/16"],
    wrong: ['3/16', '1/64'],
    // T : supprimer n!/(N₁!···N_K!)
    explain: (c) => fill(t("Il y a {c} ordres possibles pour obtenir ces comptes."), c),
  }),
];
