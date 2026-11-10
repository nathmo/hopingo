// Traps of module P, part b (step U7): the traps of the catalogue
// (docs/universite/P-probabilites.md, « Pièges du module ») whose skill is
// in proba-b.skills.js. Most are wrong values that the generators write in
// cfg.traps (js/cas/rules/stattrap.js); the phrases (P) and decisions (D)
// are options of multiple choices and decision lines, which name them.
// explain(c) fills the {…} of the catalogue's explanation with c, the
// ctx the generator gives with the values (« … » when it gives none).
// The comment above each explain is the catalogue's « transformation ».

import { trap } from './stattrap.js';

const fill = (t, c = {}) => t.replace(/\{([^}]+)\}/g, (m, k) => (c[k] !== undefined && c[k] !== null ? String(c[k]).replace('.', ',').replace('-', '−') : '…'));

export const RULES = [
  trap({
    id: 'p_normalize_bounds', family: 'calculus', tag: 'E', skill: 'p-cont-density', repair: 'a1-int-direct',
    name: "Normaliser hors du support",
    example: ["∫₀^∞ c·x⁻⁴", "∫₁^∞"],
    check: { bait: { skill: 'p-cont-density' } },
    // T : remplacer les bornes du support par [0 ; ∞[ ou [0 ; 1]
    explain: (c) => fill("La densité est nulle hors de [{a} ; {b}] : on intègre seulement sur le support.", c),
  }),
  trap({
    id: 'p_density_is_prob', family: 'proba', tag: 'E', skill: 'p-cont-density', repair: 'p-cont-density',
    name: "Densité prise pour une probabilité",
    example: ["Pr(X = 2) = f(2)", "0"],
    wrong: ['0', '2'],
    // W : f(a)
    explain: (c) => fill("Pour une variable continue, Pr(X = a) = 0 ; f(a) = {v} est une densité, pas une probabilité.", c),
  }),
  trap({
    id: 'p_cdf_piecewise', family: 'notation', tag: 'E', skill: 'p-cont-density', repair: 'p-cont-density',
    name: "F sans ses morceaux",
    example: ["F(x) = 1 − x⁻³", "(0 si x < 1)"],
    check: { bait: { skill: 'p-cont-density' } },
    // T : la formule de F sans ses morceaux hors du support (le juge teste x hors support)
    explain: (c) => fill("F doit être définie sur tout ℝ : 0 avant le support, 1 après. Ta formule donne {v} en x = {x}.", c),
  }),
  trap({
    id: 'p_quantile_from_pdf', family: 'method', tag: 'E', skill: 'p-cont-quantile', repair: 'p-cont-quantile',
    name: "Quantile lu sur la densité",
    example: ["f(q) = 1/2", "F(q) = 1/2"],
    check: { bait: { skill: 'p-cont-quantile' } },
    // W : solution de f(q) = α
    explain: (c) => "Le quantile se lit sur F (aire cumulée), pas sur la hauteur f.",
  }),
  trap({
    id: 'p_exp_rate_mean', family: 'notation', tag: 'C', skill: 'p-unif-exp', repair: 'p-unif-exp',
    name: "Taux et moyenne confondus",
    example: ["e^(−10·10)", "e^(−10/10)"],
    source: "formulaire MATH-234 : « interprétation inverse »",
    wrong: ['10/10', '10'],
    // T : remplacer λ par 1/λ
    explain: (c) => fill("Une moyenne de {m} donne un taux λ = 1/{m} ; e^(−λx) = e^(−{x}/{m}).", c),
  }),
  trap({
    id: 'p_memoryless_ignored', family: 'proba', tag: 'E', skill: 'p-unif-exp', repair: 'p-unif-exp',
    name: "Absence de mémoire oubliée",
    example: ["Pr(X > 12 | X > 2) = e^(−1,2)", "e^(−1)"],
    wrong: ['1', '1.2'],
    // W : Pr(X > s + t)
    explain: (c) => fill("Tu as oublié de diviser par Pr(X > {s}). L'exponentielle oublie le passé : il reste Pr(X > {t}).", c),
  }),
  trap({
    id: 'p_unif_var', family: 'calculus', tag: 'E', skill: 'p-unif-exp', repair: 'p-unif-exp',
    name: "Variance de l'uniforme sans carré",
    example: ["var = (b − a)/12", "(b − a)²/12"],
    check: { bait: { skill: 'p-unif-exp' } },
    // W : (b − a)/12, (b − a)²/2
    explain: (c) => fill("Une variance a l'unité au carré : (b − a)²/12 = {v}.", c),
  }),
  trap({
    id: 'p_var_minus_mean', family: 'calculus', tag: 'E', skill: 'p-moments', repair: 'p-moments',
    name: "E[X] au lieu de E[X]²",
    example: ["E[X²] − E[X]", "E[X²] − E[X]²"],
    check: { bait: { skill: 'p-moments' } },
    // T : enlever le carré de E[X]²
    explain: (c) => fill("{v} < 0 est impossible pour une variance : c'est E[X]², au carré.", c),
  }),
  trap({
    id: 'p_g_of_mean', family: 'proba', tag: 'E', skill: 'p-moments', repair: 'p-moments',
    name: "E[g(X)] = g(E[X])",
    example: ["E[e^X] = e^(E[X])", "∫ eˣ f(x) dx"],
    check: { bait: { skill: 'p-moments' } },
    // W : g(E[X])
    explain: (c) => "E[g(X)] se calcule avec ∫ g(x) f(x) dx ; en général, ce n'est pas g(E[X]).",
  }),
  trap({
    id: 'p_mean_not_exist', family: 'proba', tag: 'E', skill: 'p-moments', repair: 'p-moments',
    name: "Espérance qui n'existe pas",
    example: ["E[Cauchy] = 0", "n'existe pas"],
    check: { bait: { skill: 'p-moments' } },
    // W : 0 ; D : « par symétrie, E = 0 »
    explain: (c) => "∫ |x|/(π(1 + x²)) dx diverge : l'espérance n'existe pas, même si la densité est symétrique.",
  }),
  trap({
    id: 'p_gamma_scale_rate', family: 'notation', tag: 'C', skill: 'p-family', repair: 'p-family',
    name: "Échelle et taux de Gamma confondus",
    example: ["E = 3/θ", "3θ"],
    check: { bait: { skill: 'p-family' } },
    // T : remplacer θ par 1/θ dans E et var
    explain: (c) => "Ici θ est une échelle (e^(−y/θ)) : E = kθ. Le formulaire EE-209 utilise un taux λ = 1/θ.",
  }),
  trap({
    id: 'p_gamma_shape_off', family: 'notation', tag: 'E', skill: 'p-family', repair: 'p-family',
    name: "Forme de Gamma décalée",
    example: ["y² ⇒ Γ(2, θ)", "Γ(3, θ)"],
    wrong: ['3', '2'],
    // W : k = exposant de y
    explain: (c) => fill("Le noyau est y^(k−1) : un exposant {e} donne k = {e+1}.", c),
  }),
  trap({
    id: 'p_beta_shape_off', family: 'notation', tag: 'E', skill: 'p-family', repair: 'p-family',
    name: "Paramètres de Beta décalés",
    example: ["x²(1 − x) ⇒ Beta(2, 1)", "Beta(3, 2)"],
    wrong: ['2', '1'],
    // W : (α, β) = exposants
    explain: (c) => "Le noyau est x^(α−1)(1 − x)^(β−1) : ajoute 1 à chaque exposant.",
  }),
  trap({
    id: 'p_standardize_var', family: 'calculus', tag: 'E', skill: 'p-normal-std', repair: 'p-normal-std',
    name: "Standardiser par la variance",
    example: ["(130 − 100)/225", "/15"],
    wrong: ['15', '225'],
    // T : diviser par σ² au lieu de σ
    explain: (c) => fill("On divise par l'écart-type σ = √{var} = {σ}, pas par la variance.", c),
  }),
  trap({
    id: 'p_phi_negative', family: 'notation', tag: 'E', skill: 'p-normal-std', repair: 'p-normal-std',
    name: "Φ d'un nombre négatif",
    example: ["Φ(−1) = −0,841 ou 0,841", "0,159"],
    wrong: ['0.159', '0.841'],
    // W : −Φ(z), Φ(z)
    explain: (c) => fill("Φ est une probabilité, donc entre 0 et 1 ; par symétrie Φ(−{z}) = 1 − Φ({z}) = {v}.", c),
  }),
  trap({
    id: 'p_upper_tail', family: 'proba', tag: 'E', skill: 'p-normal-std', repair: 'p-normal-std',
    name: "Queue gauche au lieu de droite",
    example: ["Pr(X > 130) = 0,977", "0,023"],
    wrong: ['0.023', '0.977'],
    // W : Φ(z) au lieu de 1 − Φ(z)
    explain: (c) => fill("Φ({z}) = {v} est Pr(Z ≤ {z}) ; on demande au-dessus : 1 − {v}.", c),
  }),
  trap({
    id: 'p_normal_sigma2', family: 'notation', tag: 'C', skill: 'p-normal-std', repair: 'p-normal-std',
    name: "Variance prise pour l'écart-type",
    example: ["N(176,6 ; 63,84) : σ = 63,84", "7,99"],
    wrong: ['7.99', '63.84'],
    // T : utiliser le 2ᵉ paramètre comme σ
    explain: (c) => "Le cours écrit N(μ, σ²) : 63,84 est la variance, σ = √63,84 ≈ 7,99.",
  }),
  trap({
    id: 'p_phi_inverse_side', family: 'notation', tag: 'E', skill: 'p-normal-inverse', repair: 'p-normal-inverse',
    name: "Mauvais côté du quantile",
    example: ["Φ(5/σ) = 0,1 ⇒ 5/σ = 1,28", "Φ(5/σ) = 0,9"],
    wrong: ['0.9', '1.28'],
    // W : signe ou côté échangé (σ négatif, quantile de 0,1)
    explain: (c) => "10 % au-dessus de 89, c'est Φ(5/σ) = 0,9 ; un quantile de 0,1 serait négatif.",
  }),
  trap({
    id: 'p_transform_jacobian', family: 'calculus', tag: 'C', skill: 'p-transform', repair: 'p-transform',
    name: "Jacobien oublié",
    example: ["f_Y(y) = f_X(g⁻¹(y))", "× |dg⁻¹/dy|"],
    source: "corrigé d'examen MATH-234",
    check: { bait: { skill: 'p-transform' } },
    // T : supprimer le facteur |dg⁻¹/dy|
    explain: (c) => fill("Sans le facteur |dg⁻¹/dy| = {d}, ta densité n'intègre pas à 1 (elle intègre à {v}).", c),
  }),
  trap({
    id: 'p_transform_abs', family: 'calculus', tag: 'E', skill: 'p-transform', repair: 'p-transform',
    name: "Valeur absolue du jacobien oubliée",
    example: ["f = −λe^(−λx)", "λe^(−λx)"],
    check: { bait: { skill: 'p-transform' } },
    // T : enlever la valeur absolue
    explain: (c) => "Une densité est positive : g est décroissante, il faut la valeur absolue de la dérivée.",
  }),
  trap({
    id: 'p_transform_support', family: 'notation', tag: 'E', skill: 'p-transform', repair: 'p-transform',
    name: "Support pas transformé",
    example: ["support ]0 ; 1[", "]0 ; ∞["],
    wrong: ['0', '1'],
    // T : garder le support de X (le juge teste y hors support)
    explain: (c) => "Le support change avec g : u ∈ ]0 ; 1[ donne x = −ln(u)/λ ∈ ]0 ; ∞[.",
  }),
  trap({
    id: 'p_scale_density', family: 'calculus', tag: 'E', skill: 'p-transform', repair: 'p-transform',
    name: "Densité d'un multiple mal changée",
    example: ["f_{2X}(y) = 2f_X(y)", "f_X(y/2)/2"],
    check: { bait: { skill: 'p-transform' } },
    // W : a·f_X(y), f_X(a·y)
    explain: (c) => fill("Étirer par {a} étale la masse : on divise la densité par {a} et on évalue en y/{a}.", c),
  }),
  trap({
    id: 'p_cov_zero_indep', family: 'proba', tag: 'E', skill: 'p-joint-disc', repair: 'p-joint-disc',
    name: "Covariance nulle prise pour indépendance",
    example: ["cov = 0 ⇒ indépendants", "non"],
    check: { bait: { skill: 'p-joint-disc' } },
    // D ; contre-exemple automatique (tableau « dépendant mais non corrélé »)
    explain: (c) => fill("cov = 0 dit seulement « pas de lien linéaire » ; ici p(0, 0) = {v} ≠ {w}.", c),
  }),
  trap({
    id: 'p_marginal_wrong_axis', family: 'notation', tag: 'E', skill: 'p-joint-disc', repair: 'p-joint-disc',
    name: "Marginale sur le mauvais axe",
    example: ["p_X = sommes des colonnes", "des lignes"],
    check: { bait: { skill: 'p-joint-disc' } },
    // T : transposer le tableau
    explain: (c) => fill("La loi de X s'obtient en sommant sur toutes les valeurs de Y, donc le long de la ligne x = {x}.", c),
  }),
  trap({
    id: 'p_joint_support_indep', family: 'proba', tag: 'C', skill: 'p-joint-cont', repair: 'p-joint-cont',
    name: "Indépendance sur un support non rectangulaire",
    example: ["24xy sur un triangle : indépendants", "non"],
    source: "série 7 MATH-234",
    check: { bait: { skill: 'p-joint-cont' } },
    // D : « f se factorise, donc indépendants »
    explain: (c) => "Le support n'est pas un rectangle : si x = 0,9, y ne peut pas dépasser 0,1. X renseigne sur Y.",
  }),
  trap({
    id: 'p_marginal_bounds', family: 'calculus', tag: 'E', skill: 'p-joint-cont', repair: 'p-joint-cont',
    name: "Bornes fixes pour une marginale",
    example: ["∫₀¹ 24xy dy", "∫₀^(1−x)"],
    wrong: ['1', '24'],
    // T : bornes fixes [0 ; 1] au lieu de [0 ; 1 − x]
    explain: (c) => "Pour x fixé, y va de 0 à 1 − x sur ce triangle.",
  }),
  trap({
    id: 'p_var_sum_cov', family: 'proba', tag: 'E', skill: 'p-lin-combo', repair: 'p-lin-combo',
    name: "Covariance oubliée dans une variance",
    example: ["var = 17", "13"],
    wrong: ['13', '17'],
    // T : supprimer les termes 2ab·cov
    explain: (c) => fill("X_A et X_B ne sont pas indépendants : cov = {c}. Ajoute 2·{a}·{b}·cov pour chaque paire.", c),
  }),
  trap({
    id: 'p_var_scale', family: 'proba', tag: 'E', skill: 'p-lin-combo', repair: 'p-lin-combo',
    name: "Facteur pas mis au carré",
    example: ["var(2X) = 2var X", "4var X"],
    wrong: ['4', '2'],
    // T : remplacer a² par a
    explain: (c) => fill("Multiplier par {a} multiplie l'écart-type par |{a}| et la variance par {a}² = {a2}.", c),
  }),
  trap({
    id: 'p_var_xy', family: 'proba', tag: 'C', skill: 'p-lin-combo', repair: 'p-lin-combo',
    name: "var(XY) = var X · var Y",
    example: ["var(XY) = 1", "14"],
    source: "QCM EE-209 2023",
    wrong: ['14', '1'],
    // W : var X · var Y
    explain: (c) => fill("Pour X, Y indépendants, var(XY) = E[X²]E[Y²] − (E[X]E[Y])² = {v} ; les moyennes comptent.", c),
  }),
  trap({
    id: 'p_var_diff', family: 'proba', tag: 'E', skill: 'p-lin-combo', repair: 'p-lin-combo',
    name: "Variance d'une différence soustraite",
    example: ["var(X − Y) = 0", "2"],
    wrong: ['2', '0'],
    // T : signe moins devant var Y
    explain: (c) => "(−1)² = 1 : var(X − Y) = var X + var Y − 2cov.",
  }),
];
