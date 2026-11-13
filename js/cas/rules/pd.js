// Traps of module P, part d (step U7): the traps of the catalogue
// (docs/universite/P-probabilites.md, « Pièges du module ») whose skill is
// in proba-d.skills.js. Most are wrong values that the generators write in
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
    id: 'p_t_vs_z', family: 'method', tag: 'C', skill: 'p-ci-mean', repair: 'p-ci-mean',
    name: t("Quantile normal au lieu de Student"),
    example: ["1,96", "s₅(8) = 2,306"],
    wrong: ['2.306', '1.96'],
    // W : quantile normal à la place du Student
    explain: (c) => fill(t("σ est inconnu et ν = {ν} < 200 : on prend la loi de Student, plus large."), c),
  }),
  trap({
    id: 'p_one_two_sided', family: 'method', tag: 'E', skill: 'p-ci-mean', repair: 'p-test-setup',
    name: t("Unilatéral et bilatéral confondus"),
    example: ["1,645", "1,96"],
    wrong: ['1.96', '1.645'],
    // W : quantile unilatéral pour un bilatéral et l'inverse
    explain: (c) => t("Un IC à 95 % laisse 2,5 % de chaque côté : quantile d'ordre 0,975."),
  }),
  trap({
    id: 'p_df_wrong', family: 'method', tag: 'C', skill: 'p-ci-mean', repair: 'p-ci-mean',
    name: t("Mauvais nombre de degrés de liberté"),
    example: ["ν = n", t("n − 1 (n₁ + n₂ − 2 ; n − 2 en régression)")],
    wrong: ['4', '5'],
    // W : quantile lu avec ν ± 1 (dans les items : la ligne ν = n, et s₅(n) au lieu de s₅(n − 1))
    explain: (c) => fill(t("On perd un degré de liberté par paramètre estimé : ν = {ν}."), c),
  }),
  trap({
    id: 'p_wilson_center', family: 'calculus', tag: 'E', skill: 'p-ci-wald', repair: 'p-ci-wald',
    name: t("Centre de l'IC de Wilson"),
    example: [t("centre p̂ = 0,36"), "p̃ = 0,365"],
    wrong: ['0.365', '0.36'],
    // W : IC de Wilson centré en p̂
    explain: (c) => t("L'IC de Wilson est centré en (np̂ + z²/2)/(n + z²), tiré vers 1/2."),
  }),
  trap({
    id: 'p_ci_round_nearest', family: 'numeric', tag: 'C', skill: 'p-ci-round', repair: 'p-ci-round',
    name: t("Bornes arrondies au plus proche"),
    example: ["1,067456", "1,0675 → 1,0674"],
    source: "EE-209, partie 3b",
    wrong: ['1.0674', '1.067456'],
    // W : bornes arrondies au plus proche
    explain: (c) => t("La borne inférieure s'arrondit vers le bas pour ne pas rétrécir l'IC."),
  }),
  trap({
    id: 'p_ci_round_from_rounded', family: 'numeric', tag: 'C', skill: 'p-ci-round', repair: 'p-ci-round',
    name: t("Bornes à partir de valeurs arrondies"),
    example: ["1,0699 − 0,0024 = 1,0675", "1,0674"],
    wrong: ['1.0674', '1.0675'],
    // W : bornes calculées à partir de θ̂ et u déjà arrondis
    explain: (c) => t("Calcule θ̂ ± u avec les valeurs complètes, puis arrondis vers l'extérieur."),
  }),
  trap({
    id: 'p_ci_round_digits', family: 'numeric', tag: 'C', skill: 'p-ci-round', repair: 'cm-round',
    name: t("Précision des bornes"),
    example: ["[1,067456 ; 1,072286]", "[1,0674 ; 1,0723]"],
    wrong: ['1.0723', '1.072286'],
    // W : bornes avec plus ou moins de décimales que u
    explain: (c) => fill(t("La dernière décimale des bornes est celle de u = {u}."), c),
  }),
  trap({
    id: 'p_max_density_power', family: 'calculus', tag: 'E', skill: 'p-max-sample', repair: 'p-max-sample',
    name: t("Densité du maximum élevée à la puissance"),
    example: ["f_M = f(x)ⁿ", "n·F^(n−1)·f"],
    check: { bait: { skill: 'p-max-sample' } },
    // W
    explain: (c) => t("C'est la fonction de répartition qui s'élève à la puissance n ; on dérive ensuite."),
  }),
  trap({
    id: 'p_max_min_swap', family: 'proba', tag: 'E', skill: 'p-max-sample', repair: 'p-max-sample',
    name: t("Maximum et minimum échangés"),
    example: ["F_max = 1 − (1 − F)ⁿ", "Fⁿ"],
    check: { bait: { skill: 'p-max-sample' } },
    // W : formule du minimum
    explain: (c) => t("« max ≤ x » veut dire « tous ≤ x » : F(x)ⁿ. La formule 1 − (1 − F)ⁿ est celle du minimum."),
  }),
  trap({
    id: 'p_h0_direction', family: 'method', tag: 'C', skill: 'p-test-setup', repair: 'p-test-setup',
    name: t("H₀ et H₁ inversées"),
    example: ["H₀ : p > p₀", "H₁ : p > p₀"],
    source: "examen MATH-234 2020–22, ex. 1",
    check: { bait: { skill: 'p-test-setup' } },
    // P (paire d'hypothèses)
    explain: (c) => t("Ce que l'on veut établir (« dépasse ») va en H₁ ; H₀ garde l'égalité."),
  }),
  trap({
    id: 'p_pvalue_two_sided', family: 'calculus', tag: 'E', skill: 'p-test-setup', repair: 'p-test-setup',
    name: t("p-valeur bilatérale pas doublée"),
    example: ["p = 0,023", "0,046"],
    wrong: ['0.046', '0.023'],
    // W : 1 − Φ(|t|) en bilatéral (ou 2(1 − Φ) en unilatéral)
    explain: (c) => fill(t("Le test est bilatéral : un écart aussi grand de l'autre côté compte aussi, p = 2(1 − Φ({t}))."), c),
  }),
  trap({
    id: 'p_pvalue_alpha_compare', family: 'method', tag: 'E', skill: 'p-test-setup', repair: 'p-test-setup',
    name: t("Comparaison p-valeur et α inversée"),
    example: [t("p = 0,03 > α ⇒ rejet"), t("p < α ⇒ rejet")],
    check: { bait: { skill: 'p-test-setup' } },
    // D : sens de la comparaison inversé
    explain: (c) => fill(t("On rejette quand la p-valeur est <b>petite</b> : {p} < {α}."), c),
  }),
  trap({
    id: 'p_type_errors_swap', family: 'notation', tag: 'C', skill: 'p-test-power', repair: 'p-test-power',
    name: t("Erreurs de type 1 et 2 échangées"),
    example: [t("type 1 ↔ type 2"), ""],
    source: "QCM EE-209 2023",
    check: { bait: { skill: 'p-test-power' } },
    // P
    explain: (c) => t("Type 1 : rejeter H₀ vraie (α). Type 2 : garder H₀ fausse (β)."),
  }),
  trap({
    id: 'p_error_when_correct', family: 'proba', tag: 'C', skill: 'p-test-power', repair: 'p-test-power',
    name: t("Erreur vue là où la décision est juste"),
    example: [t("rejet avec μ = 47 > 40 : « type 1 »"), t("aucune erreur")],
    source: "QCM EE-209 2023, Q17",
    check: { bait: { skill: 'p-test-power' } },
    // P
    explain: (c) => t("H₁ est vraie et on a rejeté H₀ : la décision est juste."),
  }),
  trap({
    id: 'p_power_alpha', family: 'proba', tag: 'E', skill: 'p-test-power', repair: 'p-test-power',
    name: t("Puissance = 1 − α"),
    example: [t("puissance = 1 − α"), "1 − β"],
    check: { bait: { skill: 'p-test-power' } },
    // W : 1 − α
    explain: (c) => t("1 − α est la probabilité de garder H₀ quand elle est vraie ; la puissance se calcule sous H₁."),
  }),
  trap({
    id: 'p_paired_as_two', family: 'method', tag: 'C', skill: 'p-test-t1', repair: 'p-test-t1',
    name: t("Données appariées traitées comme deux échantillons"),
    example: [t("deux échantillons"), t("différences")],
    source: "série 11 MATH-234",
    check: { bait: { skill: 'p-test-t1' } },
    // D : « deux échantillons indépendants » pour des mesures sur les mêmes personnes
    explain: (c) => t("Les mêmes personnes sont mesurées deux fois : on teste les différences."),
  }),
  trap({
    id: 'p_pooled_average', family: 'calculus', tag: 'E', skill: 'p-test-t2', repair: 'p-test-t2',
    name: t("Variance poolée non pondérée"),
    example: ["s_p² = (s₁² + s₂²)/2", t("pondérée")],
    check: { bait: { skill: 'p-test-t2' } },
    // W : moyenne simple des variances
    explain: (c) => fill(t("Avec n₁ = {n1} et n₂ = {n2}, chaque variance pèse selon ses degrés de liberté."), c),
  }),
  trap({
    id: 'p_two_sample_se', family: 'calculus', tag: 'E', skill: 'p-test-t2', repair: 'p-test-t2',
    name: t("Erreur standard de deux échantillons"),
    example: ["se = √(s₁² + s₂²)", "s_p√(1/n₁ + 1/n₂)"],
    check: { bait: { skill: 'p-test-t2' } },
    // W
    explain: (c) => t("Chaque moyenne a une variance divisée par sa taille d'échantillon."),
  }),
  trap({
    id: 'p_two_prop_no_pool', family: 'method', tag: 'E', skill: 'p-test-two-prop', repair: 'p-test-two-prop',
    name: t("Proportion commune pas poolée"),
    example: ["se = √(p̂₁q̂₁/n₁ + p̂₂q̂₂/n₂)", t("poolée")],
    check: { bait: { skill: 'p-test-two-prop' } },
    // W
    explain: (c) => fill(t("Sous H₀ les deux proportions sont égales : le cours l'estime avec les deux groupes ensemble, p̂ = {p}."), c),
  }),
];
