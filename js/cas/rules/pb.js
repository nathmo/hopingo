// Traps of module P, part b (step U7): the traps of the catalogue
// (docs/universite/P-probabilites.md, « Pièges du module ») whose skill is
// in proba-b.skills.js. Most are wrong values that the generators write in
// cfg.traps (js/cas/rules/stattrap.js); the phrases (P) and decisions (D)
// are options of multiple choices and decision lines, which name them.
// explain(c) fills the {…} of the explanation with c, the ctx the generator
// gives with the values (« … » when it gives none). The comment above each
// explain is the catalogue's « transformation ». Each check replays the
// example's wrong line (expression lines: the judge with vars).

import { trap } from './stattrap.js';

const fill = (t, c = {}) => t.replace(/\{([^}]+)\}/g, (m, k) => (c[k] !== undefined && c[k] !== null ? String(c[k]).replace('.', ',').replace('-', '−') : '…'));
// The check of an expression trap: the right expression, the wrong one.
const xcheck = (id, vars, domain, expect, line) => ({ judge: { kind: 'prob', vars, domain, expect, traps: { [id]: [line] } }, prev: '?', line });

export const RULES = [
  trap({
    id: 'p_normalize_bounds', family: 'calculus', tag: 'E', skill: 'p-cont-density', repair: 'a1-int-direct',
    name: "Normaliser hors du support",
    example: ["c·x³ sur [0 ; 2] : ∫₀¹ x³ dx = 1/4, c = 4", "∫₀² x³ dx = 4, c = 1/4"],
    wrong: ['1/4', '4'],
    // T : remplacer les bornes du support par [0 ; ∞[ ou [0 ; 1]
    explain: (c) => fill("La densité est nulle hors de son support [{a} ; {b}] : on intègre le noyau seulement sur le support, sur tout le support.", c),
  }),
  trap({
    id: 'p_density_is_prob', family: 'proba', tag: 'E', skill: 'p-cont-density', repair: 'p-cont-density',
    name: "Densité prise pour une probabilité",
    example: ["f(x) = 3x⁻⁴ : Pr(X = 2) = f(2) = 3/16", "Pr(X = 2) = 0"],
    wrong: ['0', '3/16'],
    // W : f(a)
    explain: (c) => fill("Pour une variable continue, Pr(X = a) = 0, et une probabilité se lit sur F : Pr(X ≤ b) = F(b). f(a) = {v} est une densité, pas une probabilité.", c),
  }),
  trap({
    id: 'p_cdf_piecewise', family: 'notation', tag: 'E', skill: 'p-cont-density', repair: 'p-cont-density',
    name: "F sans ses morceaux",
    example: ["F(x) = 1 − x⁻³ pour tout x", "F(x) = 1 − x⁻³ si x ≥ 1, 0 sinon"],
    check: { bait: { skill: 'p-cont-density' } },
    // T : la formule de F sans ses morceaux hors du support (D dans les items)
    explain: () => "F doit être définie sur tout ℝ : 0 avant le support, 1 après. La formule trouvée ne vaut que sur le support.",
  }),
  trap({
    id: 'p_quantile_from_pdf', family: 'method', tag: 'E', skill: 'p-cont-quantile', repair: 'p-cont-quantile',
    name: "Quantile lu sur la densité",
    example: ["f(x) = x/2 sur [0 ; 2] : f(q) = 1/2, q = 1", "F(q) = q²/4 = 1/2, q = √2"],
    wrong: ['1.4142136', '1'],
    // W : solution de f(q) = α
    explain: () => "Le quantile se lit sur F (l'aire cumulée jusqu'à q) : F(q) = α. Résoudre f(q) = α ne donne rien d'utile.",
  }),
  trap({
    id: 'p_exp_rate_mean', family: 'notation', tag: 'C', skill: 'p-unif-exp', repair: 'p-unif-exp',
    name: "Taux et moyenne confondus",
    example: ["moyenne 10 : Pr(X > 10) = e^(−10·10)", "e^(−10/10) = e^(−1)"],
    source: 'formulaire MATH-234 : « interprétation inverse »',
    wrong: ['e^(-1)', 'e^(-100)'],
    // T : remplacer λ par 1/λ
    explain: (c) => fill("Une moyenne de {m} donne un taux λ = 1/{m} : Pr(X > x) = e^(−λx) = e^(−x/{m}).", c),
  }),
  trap({
    id: 'p_memoryless_ignored', family: 'proba', tag: 'E', skill: 'p-unif-exp', repair: 'p-unif-exp',
    name: "Absence de mémoire oubliée",
    example: ["Pr(X > 12 | X > 2) = e^(−1,2)", "e^(−1,2)/e^(−0,2) = e^(−1)"],
    wrong: ['e^(-1)', 'e^(-1,2)'],
    // W : Pr(X > s + t)
    explain: (c) => fill("Tu as oublié de diviser par Pr(X > {s}). L'exponentielle oublie le passé : il reste Pr(X > {t}).", c),
  }),
  trap({
    id: 'p_unif_var', family: 'calculus', tag: 'E', skill: 'p-unif-exp', repair: 'p-unif-exp',
    name: "Variance de l'uniforme sans carré",
    example: ["U(0 ; 6) : var = 6/12", "6²/12 = 3"],
    wrong: ['3', '1/2'],
    // W : (b − a)/12, (b − a)²/2
    explain: (c) => fill("Une variance a l'unité au carré : var = (b − a)²/12 = {v}.", c),
  }),
  trap({
    id: 'p_var_minus_mean', family: 'calculus', tag: 'E', skill: 'p-moments', repair: 'p-moments',
    name: "E[X] au lieu de E[X]²",
    example: ["var(Y) = 5/7 − 5/6", "5/7 − (5/6)² = 5/252"],
    wrong: ['5/252', '-1/42'],
    // T : enlever le carré de E[X]²
    explain: (c) => fill("var(X) = E[X²] − E[X]² : c'est E[X] au carré qu'on retranche (ta valeur {v} n'utilise pas le carré).", c),
  }),
  trap({
    id: 'p_g_of_mean', family: 'proba', tag: 'E', skill: 'p-moments', repair: 'p-moments',
    name: "E[g(X)] = g(E[X])",
    example: ["X ~ exp(3) : E[e^X] = e^(E[X]) = e^(1/3)", "∫ eˣ·3e^(−3x) dx = 3/2"],
    wrong: ['3/2', 'e^(1/3)'],
    // W : g(E[X])
    explain: () => "E[g(X)] se calcule avec ∫ g(x)·f(x) dx ; en général, ce n'est pas g(E[X]).",
  }),
  trap({
    id: 'p_mean_not_exist', family: 'proba', tag: 'E', skill: 'p-moments', repair: 'p-moments',
    name: "Espérance qui n'existe pas",
    example: ["E[Cauchy] = 0, par symétrie", "l'espérance n'existe pas"],
    check: { bait: { skill: 'p-moments' } },
    // W : 0 ; D : « par symétrie, E = 0 »
    explain: () => "L'espérance existe seulement si ∫ |x|·f(x) dx converge. Pour la loi de Cauchy, ∫ |x|/(π(1 + x²)) dx diverge : pas d'espérance, même si la densité est symétrique.",
  }),
  trap({
    id: 'p_gamma_scale_rate', family: 'notation', tag: 'C', skill: 'p-family', repair: 'p-family',
    name: "Échelle et taux de Gamma confondus",
    example: ["y²e^(−y/θ) : E[Y] = 3/θ", "E[Y] = 3θ"],
    check: xcheck('p_gamma_scale_rate', ['θ'], { θ: [0.5, 5] }, '3θ', '3/θ'),
    // T : remplacer θ par 1/θ dans E et var
    explain: () => "Ici θ est une échelle (e^(−y/θ)) : E = kθ et var = kθ². Le formulaire EE-209 écrit un taux λ = 1/θ.",
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
    wrong: ['3', '2'],
    // W : (α, β) = exposants
    explain: () => "Le noyau d'une Beta(α, β) est x^(α−1)(1 − x)^(β−1) : ajoute 1 à chaque exposant.",
  }),
  trap({
    id: 'p_standardize_var', family: 'calculus', tag: 'E', skill: 'p-normal-std', repair: 'p-normal-std',
    name: "Standardiser par la variance",
    example: ["z = (130 − 100)/225", "(130 − 100)/15 = 2"],
    wrong: ['2', '30/225'],
    // T : diviser par σ² au lieu de σ
    explain: (c) => fill("On divise par l'écart-type σ = √{var} = {σ}, pas par la variance.", c),
  }),
  trap({
    id: 'p_phi_negative', family: 'notation', tag: 'E', skill: 'p-normal-std', repair: 'p-normal-std',
    name: "Φ d'un nombre négatif",
    example: ["Φ(−1) = −0,841 ou 0,841", "1 − 0,841 = 0,159"],
    wrong: ['0.159', '0.841'],
    // W : −Φ(z), Φ(z)
    explain: (c) => fill("Φ est une probabilité, donc entre 0 et 1 ; par symétrie Φ(−{z}) = 1 − Φ({z}) = {v}.", c),
  }),
  trap({
    id: 'p_upper_tail', family: 'proba', tag: 'E', skill: 'p-normal-std', repair: 'p-normal-std',
    name: "Queue gauche au lieu de droite",
    example: ["Pr(X > 130) = Φ(2) = 0,977", "1 − Φ(2) = 0,023"],
    wrong: ['0.023', '0.977'],
    // W : Φ(z) au lieu de 1 − Φ(z)
    explain: (c) => fill("Φ({z}) = {v} est Pr(Z ≤ {z}) ; on demande l'autre côté : 1 − Φ({z}).", c),
  }),
  trap({
    id: 'p_normal_sigma2', family: 'notation', tag: 'C', skill: 'p-normal-std', repair: 'p-normal-std',
    name: "Variance prise pour l'écart-type",
    example: ["N(176,6 ; 63,84) : σ = 63,84", "σ = √63,84 ≈ 7,99"],
    wrong: ['7.99', '63.84'],
    // T : utiliser le 2e paramètre comme σ
    explain: () => "Le cours écrit N(μ, σ²) : le second paramètre est la variance ; σ est sa racine.",
  }),
  trap({
    id: 'p_phi_inverse_side', family: 'notation', tag: 'E', skill: 'p-normal-inverse', repair: 'p-normal-inverse',
    name: "Mauvais côté du quantile",
    example: ["Pr(X > 89) = 0,1 : 5/σ = −1,28", "Φ(5/σ) = 0,9, 5/σ = 1,28"],
    wrong: ['1.28', '-1.28'],
    // W : signe ou côté échangé (σ négatif, quantile de 0,1)
    explain: () => "Une part en haut de la loi donne Φ(z) = 1 − part : z est positif. Un quantile d'une petite part (0,1) serait négatif.",
  }),
  trap({
    id: 'p_transform_jacobian', family: 'calculus', tag: 'C', skill: 'p-transform', repair: 'p-transform',
    name: "Jacobien oublié",
    source: "corrigé d'examen MATH-234",
    example: ["X = −ln(U)/2 : f_X(x) = f_U(e^(−2x)) = 1", "1·|−2e^(−2x)| = 2e^(−2x)"],
    check: xcheck('p_transform_jacobian', ['x'], { x: [0.1, 3] }, '2e^(-2x)', '1'),
    // T : supprimer le facteur |dg⁻¹/dy|
    explain: (c) => fill("Il manque le facteur |(g⁻¹)′| = {d} : sans lui, ta densité n'intègre pas à 1 (elle intègre à {v}).", c),
  }),
  trap({
    id: 'p_transform_abs', family: 'calculus', tag: 'E', skill: 'p-transform', repair: 'p-transform',
    name: "Valeur absolue du jacobien oubliée",
    example: ["f = −2e^(−2x)", "2e^(−2x)"],
    check: xcheck('p_transform_abs', ['x'], { x: [0.1, 3] }, '2e^(-2x)', '-2e^(-2x)'),
    // T : enlever la valeur absolue
    explain: () => "Une densité est positive : g est décroissante, il faut la valeur absolue de la dérivée de g⁻¹.",
  }),
  trap({
    id: 'p_transform_support', family: 'notation', tag: 'E', skill: 'p-transform', repair: 'p-transform',
    name: "Support pas transformé",
    example: ["X = −ln(U)/λ : support ]0 ; 1[", "]0 ; +∞["],
    check: { bait: { skill: 'p-transform' } },
    // T : garder le support de X (D dans les items)
    explain: () => "Le support change avec g : u ∈ ]0 ; 1[ donne x = −ln(u)/λ ∈ ]0 ; +∞[. Calcule l'image du support avant la densité.",
  }),
  trap({
    id: 'p_scale_density', family: 'calculus', tag: 'E', skill: 'p-transform', repair: 'p-transform',
    name: "Densité d'un multiple mal changée",
    example: ["X ~ exp(1), Y = 2X : f_Y(y) = 2e^(−y)", "f_X(y/2)/2 = (1/2)e^(−y/2)"],
    check: xcheck('p_scale_density', ['y'], { y: [0.1, 4] }, '(1/2)e^(-y/2)', '2e^(-y)'),
    // W : a·f_X(y), f_X(a·y)
    explain: (c) => fill("Étirer par {a} étale la masse : on divise la densité par {a} et on l'évalue en y/{a}.", c),
  }),
  trap({
    id: 'p_cov_zero_indep', family: 'proba', tag: 'E', skill: 'p-joint-disc', repair: 'p-joint-disc',
    name: "Covariance nulle prise pour indépendance",
    example: ["cov(X, Y) = 0 ⇒ indépendants", "non : p(0, 0) = 0,1 ≠ 0,12"],
    check: { bait: { skill: 'p-joint-disc' } },
    // D ; contre-exemple automatique (tableau « dépendant mais non corrélé »)
    explain: () => "cov = 0 dit seulement « pas de lien linéaire ». L'indépendance demande p(x, y) = p_X(x)·p_Y(y) dans chaque case.",
  }),
  trap({
    id: 'p_marginal_wrong_axis', family: 'notation', tag: 'E', skill: 'p-joint-disc', repair: 'p-joint-disc',
    name: "Marginale sur le mauvais axe",
    example: ["p_X(1) = somme de la colonne Y = 1", "somme de la ligne X = 1"],
    check: { bait: { skill: 'p-joint-disc' } },
    // T : transposer le tableau
    explain: (c) => fill("La loi de X s'obtient en sommant sur toutes les valeurs de Y, donc le long de la ligne x = {x}.", c),
  }),
  trap({
    id: 'p_joint_support_indep', family: 'proba', tag: 'C', skill: 'p-joint-cont', repair: 'p-joint-cont',
    name: "Indépendance sur un support non rectangulaire",
    source: 'série 7 MATH-234',
    example: ["24xy sur un triangle : indépendants", "non"],
    check: { bait: { skill: 'p-joint-cont' } },
    // D : « f se factorise, donc indépendants »
    explain: () => "Il faut que f se factorise et que le support soit un rectangle. Sur le triangle x + y ≤ 1, si x = 0,9, y ne peut pas dépasser 0,1 : X renseigne sur Y.",
  }),
  trap({
    id: 'p_marginal_bounds', family: 'calculus', tag: 'E', skill: 'p-joint-cont', repair: 'p-joint-cont',
    name: "Bornes fixes pour une marginale",
    example: ["∫₀¹ xy dy = x/2", "∫₀^(1−x) xy dy = x(1 − x)²/2"],
    check: xcheck('p_marginal_bounds', ['x'], { x: [0.05, 0.95] }, 'x(1-x)^2/2', 'x/2'),
    // T : bornes fixes [0 ; 1] au lieu de [0 ; 1 − x] (réparation catalogue : a2-domain-describe, pas construit sur cette branche)
    explain: () => "Pour x fixé, y parcourt seulement la tranche du support : de 0 à 1 − x sur le triangle, de 0 à b sur le rectangle [0 ; a] × [0 ; b].",
  }),
  trap({
    id: 'p_var_sum_cov', family: 'proba', tag: 'E', skill: 'p-lin-combo', repair: 'p-lin-combo',
    name: "Covariance oubliée dans une variance",
    example: ["var = 3 + 4·2 + 6 = 17", "17 + 2[2·(−2) + 2·1] = 13"],
    wrong: ['13', '17'],
    // T : supprimer les termes 2ab·cov
    explain: (c) => fill("Les variables ne sont pas indépendantes : cov = {c}. Ajoute 2·a·b·cov pour chaque paire de variables.", c),
  }),
  trap({
    id: 'p_var_scale', family: 'proba', tag: 'E', skill: 'p-lin-combo', repair: 'p-lin-combo',
    name: "Facteur pas mis au carré",
    example: ["var(2X) = 2·var(X)", "4·var(X)"],
    wrong: ['4', '2'],
    // T : remplacer a² par a
    explain: (c) => fill("Multiplier par {a} multiplie l'écart-type par |{a}| et la variance par {a}² = {a2}.", c),
  }),
  trap({
    id: 'p_var_xy', family: 'proba', tag: 'C', skill: 'p-lin-combo', repair: 'p-lin-combo',
    source: 'QCM EE-209 2023',
    name: "var(XY) = var X · var Y",
    example: ["var(XY) = 1·1 = 1", "E[X²]E[Y²] − (E[X]E[Y])² = 14"],
    wrong: ['14', '1'],
    // W : var X · var Y
    explain: (c) => fill("Pour X, Y indépendants, var(XY) = E[X²]E[Y²] − (E[X]E[Y])² = {v} : les moyennes comptent.", c),
  }),
  trap({
    id: 'p_var_diff', family: 'proba', tag: 'E', skill: 'p-lin-combo', repair: 'p-lin-combo',
    name: "Variance d'une différence soustraite",
    example: ["var(X − Y) = 1 − 1 = 0", "1 + 1 = 2"],
    wrong: ['2', '0'],
    // T : signe moins devant var Y
    explain: () => "(−1)² = 1 : var(X − Y) = var X + var Y − 2cov(X, Y). Un coefficient négatif sort au carré, positif.",
  }),
];
