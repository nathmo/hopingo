# P. Probabilités et statistique

Extensions du §16 utilisées : §16.2 `steps` (lignes étiquetées `cfg.steps`, report d'erreur), `stat` (lecture de table, IC arrondi, `sig`) ; §16.3 interpréter (`final.interpret`, compétence `p-interpret`), simulation (`simulate`), `plot` en lecture seule (`boxplot`), QCM « réponse courte », `code` (Python), variantes taguées dans une compétence (gabarits EE-209 ou MATH-234), `matrix` ; §16.4 familles nouvelles (`proba`, `stats`, `method`, `notation`, `numeric`), tag C, réparation dans un autre module, pièges partagés (réutilise `g7_order_confusion`, `g2_log_power` ; `p_reg_sigma_n` sert aussi en M).

Unité `proba` · préfixe `p-` · pièges `p_` · Statut : à faire

**Sources** : deux cours, tous deux dans le parcours.
- MATH-234 *Probabilités et statistique* (GM), M. Wilhelm, automne 2022 : transparents des semaines 1 à 14, séries 1 à 14, formulaire 2022 avec ses tables, exercices d'examen 2020–2022 (questions « notebook » courtes, puis questions à développer), corrigé d'examen 2018 (G. Dehaene), examen 2013 (EL/MT).
- EE-209 *Éléments de statistiques pour les data sciences* (MT, BA4, en anglais), G. Obozinski : transparents « S4DS » parties 1A, 1B, 1C, Multinomial, 2 (estimation), 3 (IC), 3b (incertitude et chiffres significatifs), 4 (tests), 5 (bayésien), 6 (régression) ; formulaire EE-209 ; examen final 2023 (QCM +3/0/−1, vrai/faux +1/0/−1, sans calculatrice).

**Notation** : celle des cours. Quand les deux cours diffèrent, l'app affiche la notation de MATH-234 et accepte celle d'EE-209 en saisie.
- Probabilité `Pr(A)`, `Pr(A | B)` (EE-209 écrit `P`, accepté). Complément `Aᶜ`. Indicatrice `1{…}`.
- Lois : `B(p)` (Bernoulli), `B(n, p)`, `Poiss(λ)`, `Geom(p)`, `U(a, b)`, `exp(λ)` (taux λ, espérance 1/λ), `N(μ, σ²)` (le 2ᵉ paramètre est **la variance**), `Γ(k, θ)` (forme k, **échelle** θ : E = kθ, var = kθ²), `Beta(α, β)`, `χ²(r)` = Γ(r/2, 2), `t_ν` (Student), `F_{m,n}`, `Dir(α₁, …, α_K)`, `Mult(n, p)`. Saisie acceptée : `Ber`, `Bin`, `Pois`, `E(λ)`, `St_ν`.
- **Géométrique** : MATH-234 compte les échecs avant le premier succès, `Pr(X = x) = (1 − p)ˣ p` pour x = 0, 1, … (E = (1 − p)/p) ; EE-209 compte les essais, x = 1, 2, … (E = 1/p). L'énoncé dit toujours lequel ; le générateur le choisit selon l'étiquette du gabarit.
- **Gamma** : l'app écrit toujours Γ(k, θ) forme-échelle. Le formulaire EE-209 écrit Γ(r, λ) avec un **taux** (E = r/λ). Un item EE-209 qui reprend cette écriture la traduit dans l'énoncé : « Γ(r, λ) au sens d'EE-209, c'est-à-dire Γ(k = r, θ = 1/λ) ».
- Échantillon : `x₁, …, xₙ`, statistiques d'ordre `x₍₁₎ ≤ … ≤ x₍ₙ₎`, moyenne `x̄`, **variance empirique `s² = Σ(xᵢ − x̄)²/(n − 1)`**, écart-type `s`. Le MLE de σ² (diviseur n) s'écrit `σ̂²_ML`.
- Médiane `x₍⌈n/2⌉₎` ; quantile empirique `q̂(α) = x₍⌈nα⌉₎` (convention MATH-234). La définition symétrique de la médiane (moyenne des deux valeurs centrales si n est pair) est acceptée ; les générateurs évitent les cas où les deux définitions diffèrent (n impair pour la médiane, n non multiple de 4 pour les quartiles).
- Vraisemblance `L(θ)`, log-vraisemblance `ℓ(θ) = ln L(θ)`, `ℓ′`, `ℓ″`. Information observée `J(θ̂) = −ℓ″(θ̂)` (MATH-234) ; information de Fisher `I(θ) = n·I₁(θ)` (EE-209). Estimateur `θ̂`, `θ̂_ML`, `θ̂_MM`.
- Tests : `H₀`, `H₁` (`H_A` accepté), niveau α, statistique `T`, valeur observée `t_obs`, valeur critique `t_c`, p-valeur `p_obs`. Quantiles : MATH-234 note `s_α` la valeur telle que `α = Pr(|T| > s_α)` (bilatéral) ; EE-209 note `z_{1−α/2}`, `t^{(n−1)}_{1−α/2}`.
- Nombres : virgule décimale à l'écran (`0,977`), point accepté en saisie. Les tables gardent le point, comme dans les formulaires imprimés. Intervalles `[a ; b]`.

**Prérequis extérieurs** :
- `g7-combinations`
- `g7-binomial`
- `g7-which-count`
- `g9-intervals`
- `g2-log-rules`
- `g6-deriv-rules`
- `a1-ser-geo-tele`
- `a1-deriv-inverse`
- `a1-int-direct`
- `a1-improper-calc`
- `a2-fubini-rect`, `a2-domain-describe`
- `a2-change-var`
- `a2-improper-multi`
- `l-orth-lsq`
- `@alg:A-arrondir`, `@alg:J-pourcentage`, `@alg:F-isoler`
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g9-sets`, `g2-log-rules`, `g6-deriv-rules`, `g7-binomial`, `g7-combinations`, `g7-which-count`, `a1-deriv-inverse`, `a1-improper-calc`, `a1-int-direct`, `a1-ser-geo-tele`, `l-orth-lsq`, `a2-change-var`, `a2-domain-describe`, `a2-fubini-rect`, `a2-improper-multi`.

**Conventions communes** (valent pour toutes les entrées ci-dessous ; une entrée n'y renvoie que si elle s'en écarte) :

1. **Lignes étiquetées.** La plupart des items P ne sont pas une chaîne d'égalités d'un même objet, mais une suite de grandeurs nommées : `x̄ = 88`, `s² = 10`, `t_obs = 2,83`… Chaque ligne s'écrit `<étiquette> = <expression>`. L'étiquette se choisit dans un menu (niveaux 1 à 3) ou se tape (niveaux 4 et 5). L'item porte `cfg.steps = [{label, expect(vals, data), judge, decimals?}]` :
   - une ligne dont l'étiquette est nouvelle est jugée contre `expect`, **calculé à partir des valeurs que l'élève a déjà écrites** (`vals`), comme le juge `iter` ; une erreur plus haut ne fait donc pas tomber les lignes suivantes (`followError: true` partout dans P) ;
   - deux lignes de suite avec la même étiquette sont jugées par le juge de l'étape (`prob`, `stat`, `equiv` ou `value`) : c'est une réécriture de la même grandeur ;
   - l'étiquette `=` seule (pas de nom) continue le calcul de la ligne précédente.
2. **Juges.** `prob` pour les probabilités exactes (fractions, `C(n, k)`, symboles `Pr(…)` liés aux données). `stat` pour les valeurs approchées : tolérance ½·10^(−decimals), `decimals` donné par l'étape (3 par défaut pour une probabilité, 2 pour une statistique de test ou une valeur critique, 3 pour un estimateur). `equiv` pour les expressions en θ (vraisemblance, densité, fonction de répartition) avec `vars` et `domain` déclarés. `value` pour les entiers (degrés de liberté, effectifs).
3. **Lecture de table.** Une ligne `Φ(2,00) = 0,977` est juste si elle donne la valeur imprimée dans la table, ou la valeur exacte à 5·10⁻⁴ près. Si z n'est pas sur la grille de 0,025, on accepte la valeur de la table aux **deux** points de grille voisins et la valeur exacte. Les générateurs mettent z sur la grille aux niveaux 1 à 3. Les **valeurs attendues** sont calculées avec la valeur de la table, pas avec Φ exacte, pour que l'élève qui lit la table tombe juste au millième.
4. **Student et χ².** Les générateurs ne tirent que des degrés de liberté présents dans les tables ci-dessous. Pour ν ≥ 200, la loi de Student est remplacée par la normale (ligne ∞) : `1,960` et `1,972` sont acceptés pour ν = 200 ; au-delà, seulement les quantiles normaux. La table MATH-234 ne donne que des niveaux **bilatéraux** 5 %, 1 % et 0,1 % : un test unilatéral MATH-234 se fait à 2,5 %, 0,5 % ou 0,05 %, ou l'énoncé fournit le quantile. La loi F n'est pas dans le formulaire : l'énoncé donne toujours ses quantiles.
5. **Items EE-209.** L'examen est sans calculatrice : les nombres se calculent à la main (carrés parfaits, fractions simples), et l'énoncé fournit les quantiles utiles, comme à l'examen 2023 (« We provide the following quantiles »). Les énoncés EE-209 restent en français dans l'app ; le terme anglais est donné entre parenthèses à la première occurrence (« p-valeur (*p-value*) »).
6. **Décisions.** Choix de la loi, du test, de H₀/H₁, du côté (uni- ou bilatéral), rejet ou non : lignes de décision (§5.3 du README). Chaque compétence de test et d'IC **se termine par une ligne « Interpréter »** : un QCM à 4 phrases, une juste et trois contresens tirés des pièges `p_pvalue_h0`, `p_ci_prob`, `p_accept_h0`, `p_reject_10_5`, `p_significant_large`, `p_corr_causal` selon le contexte. Une erreur sur cette ligne n'annule pas les lignes de calcul, mais l'item n'est pas réussi.
7. **Protocole d'un test** (script commun, repris par chaque `p-test-…`) :
   1. décision « quel test ? » ;
   2. décision « H₀ / H₁ » et « uni- ou bilatéral » ;
   3. lignes de calcul (`x̄`, `s`, erreur standard…) ;
   4. `t_obs = …` ;
   5. `t_c = …` (lecture de table) **ou** `p_obs = …` ;
   6. décision « rejeter H₀ au niveau α / ne pas rejeter » ;
   7. « Interpréter » (QCM).
8. **Protocole d'un IC** : décision « quel pivot ? » ; estimateur ; erreur standard ; quantile ; bornes ; arrondi (EE-209 : vers l'extérieur, §`p-ci-round`) ; « Interpréter ».
9. **Simulation.** Les compétences marquées « simulation » ont un bouton « Vérifier en simulant » (après l'item, jamais pendant) : l'app tire 10 000 fois l'expérience (`makeRng`, graine de l'item) et affiche la fréquence observée à côté de la réponse.
10. **Beaux nombres en statistique.** Un jeu de données se construit à l'envers : on fixe x̄ entier, puis des écarts entiers dᵢ de somme nulle (paires ±a), tels que Σdᵢ² soit divisible par n − 1 ; on ajoute x̄. Une densité se construit à partir d'un noyau dont l'intégrale est rationnelle (polynômes sur [0 ; a], xᵏe^(−x/θ), x^(−α−1) sur [1 ; ∞[). Un MLE se construit à partir d'un modèle dont ℓ′ = 0 se résout en forme close (familles exponentielles, uniformes) et dont Σxᵢ est choisi pour que θ̂ tombe sur un nombre simple.
11. **Code.** Quelques items `code` (README §12) seulement, signalés dans l'entrée : un calcul répétitif dont la formule est le sujet (variance en n − 1, pente des moindres carrés, demi-largeur d'un IC). Pas de module `random`, donc pas de simulation en Python.
12. **Tests couverts** : test z (σ connu) ; test z asymptotique (moyenne, une proportion) ; test de Wald sur un MLE ; test t à un échantillon ; données appariées (test t sur les différences) ; test t à deux échantillons à variance poolée, avec le test F d'égalité des variances qui le précède (quantiles F donnés) ; deux proportions (test z, proportion poolée) ; χ² d'adéquation (probabilités fixées ou c paramètres estimés) ; χ² d'indépendance ; χ² sur une variance ; tests t sur les coefficients d'une régression ; test F de modèles emboîtés. **Non couverts** (aucun des deux cours ne les enseigne) : test de Welch (variances inégales), Wilcoxon, Mann-Whitney, test des signes, test exact de Fisher, McNemar, ANOVA à un facteur en tant que telle, Kolmogorov-Smirnov, Shapiro-Wilk (le QQ-plot reste visuel), rapport de vraisemblance, test du score, corrections de tests multiples (seulement un vrai/faux sur le p-hacking), facteurs de Bayes, tests par permutation ou bootstrap.

**Tables** que `js/cas/stats.js` doit reproduire **à l'identique** (valeurs imprimées des formulaires ; `tests/cas.test.js` compare chaque case) :

Table 1 (MATH-234). Fonction de répartition de N(0, 1), pas de 0,025, 3 décimales pour z < 3 et 7 décimales pour z ≥ 3. Pour z < 0 : Φ(−z) = 1 − Φ(z).

| z | Φ(z) | z | Φ(z) | z | Φ(z) | z | Φ(z) | z | Φ(z) |
|---|---|---|---|---|---|---|---|---|---|
| 0.000 | 0.500 | 1.000 | 0.841 | 2.000 | 0.977 | 3.000 | 0.9986501 | 4.000 | 0.9999683 |
| 0.025 | 0.510 | 1.025 | 0.847 | 2.025 | 0.979 | 3.025 | 0.9987568 | 4.025 | 0.9999715 |
| 0.050 | 0.520 | 1.050 | 0.853 | 2.050 | 0.980 | 3.050 | 0.9988558 | 4.050 | 0.9999744 |
| 0.075 | 0.530 | 1.075 | 0.859 | 2.075 | 0.981 | 3.075 | 0.9989475 | 4.075 | 0.9999770 |
| 0.100 | 0.540 | 1.100 | 0.864 | 2.100 | 0.982 | 3.100 | 0.9990324 | 4.100 | 0.9999793 |
| 0.125 | 0.550 | 1.125 | 0.870 | 2.125 | 0.983 | 3.125 | 0.9991110 | 4.125 | 0.9999815 |
| 0.150 | 0.560 | 1.150 | 0.875 | 2.150 | 0.984 | 3.150 | 0.9991836 | 4.150 | 0.9999834 |
| 0.175 | 0.569 | 1.175 | 0.880 | 2.175 | 0.985 | 3.175 | 0.9992508 | 4.175 | 0.9999851 |
| 0.200 | 0.579 | 1.200 | 0.885 | 2.200 | 0.986 | 3.200 | 0.9993129 | 4.200 | 0.9999867 |
| 0.225 | 0.589 | 1.225 | 0.890 | 2.225 | 0.987 | 3.225 | 0.9993701 | 4.225 | 0.9999881 |
| 0.250 | 0.599 | 1.250 | 0.894 | 2.250 | 0.988 | 3.250 | 0.9994230 | 4.250 | 0.9999893 |
| 0.275 | 0.608 | 1.275 | 0.899 | 2.275 | 0.989 | 3.275 | 0.9994717 | 4.275 | 0.9999904 |
| 0.300 | 0.618 | 1.300 | 0.903 | 2.300 | 0.989 | 3.300 | 0.9995166 | 4.300 | 0.9999915 |
| 0.325 | 0.627 | 1.325 | 0.907 | 2.325 | 0.990 | 3.325 | 0.9995579 | 4.325 | 0.9999924 |
| 0.350 | 0.637 | 1.350 | 0.911 | 2.350 | 0.991 | 3.350 | 0.9995959 | 4.350 | 0.9999932 |
| 0.375 | 0.646 | 1.375 | 0.915 | 2.375 | 0.991 | 3.375 | 0.9996309 | 4.375 | 0.9999939 |
| 0.400 | 0.655 | 1.400 | 0.919 | 2.400 | 0.992 | 3.400 | 0.9996631 | 4.400 | 0.9999946 |
| 0.425 | 0.665 | 1.425 | 0.923 | 2.425 | 0.992 | 3.425 | 0.9996926 | 4.425 | 0.9999952 |
| 0.450 | 0.674 | 1.450 | 0.926 | 2.450 | 0.993 | 3.450 | 0.9997197 | 4.450 | 0.9999957 |
| 0.475 | 0.683 | 1.475 | 0.930 | 2.475 | 0.993 | 3.475 | 0.9997446 | 4.475 | 0.9999962 |
| 0.500 | 0.691 | 1.500 | 0.933 | 2.500 | 0.994 | 3.500 | 0.9997674 | 4.500 | 0.9999966 |
| 0.525 | 0.700 | 1.525 | 0.936 | 2.525 | 0.994 | 3.525 | 0.9997883 | 4.525 | 0.9999970 |
| 0.550 | 0.709 | 1.550 | 0.939 | 2.550 | 0.995 | 3.550 | 0.9998074 | 4.550 | 0.9999973 |
| 0.575 | 0.717 | 1.575 | 0.942 | 2.575 | 0.995 | 3.575 | 0.9998249 | 4.575 | 0.9999976 |
| 0.600 | 0.726 | 1.600 | 0.945 | 2.600 | 0.995 | 3.600 | 0.9998409 | 4.600 | 0.9999979 |
| 0.625 | 0.734 | 1.625 | 0.948 | 2.625 | 0.996 | 3.625 | 0.9998555 | 4.625 | 0.9999981 |
| 0.650 | 0.742 | 1.650 | 0.951 | 2.650 | 0.996 | 3.650 | 0.9998689 | 4.650 | 0.9999983 |
| 0.675 | 0.750 | 1.675 | 0.953 | 2.675 | 0.996 | 3.675 | 0.9998811 | 4.675 | 0.9999985 |
| 0.700 | 0.758 | 1.700 | 0.955 | 2.700 | 0.997 | 3.700 | 0.9998922 | 4.700 | 0.9999987 |
| 0.725 | 0.766 | 1.725 | 0.958 | 2.725 | 0.997 | 3.725 | 0.9999023 | 4.725 | 0.9999988 |
| 0.750 | 0.773 | 1.750 | 0.960 | 2.750 | 0.997 | 3.750 | 0.9999116 | 4.750 | 0.9999990 |
| 0.775 | 0.781 | 1.775 | 0.962 | 2.775 | 0.997 | 3.775 | 0.9999200 | 4.775 | 0.9999991 |
| 0.800 | 0.788 | 1.800 | 0.964 | 2.800 | 0.997 | 3.800 | 0.9999277 | 4.800 | 0.9999992 |
| 0.825 | 0.795 | 1.825 | 0.966 | 2.825 | 0.998 | 3.825 | 0.9999346 | 4.825 | 0.9999993 |
| 0.850 | 0.802 | 1.850 | 0.968 | 2.850 | 0.998 | 3.850 | 0.9999409 | 4.850 | 0.9999994 |
| 0.875 | 0.809 | 1.875 | 0.970 | 2.875 | 0.998 | 3.875 | 0.9999467 | 4.875 | 0.9999995 |
| 0.900 | 0.816 | 1.900 | 0.971 | 2.900 | 0.998 | 3.900 | 0.9999519 | 4.900 | 0.9999995 |
| 0.925 | 0.823 | 1.925 | 0.973 | 2.925 | 0.998 | 3.925 | 0.9999566 | 4.925 | 0.9999996 |
| 0.950 | 0.829 | 1.950 | 0.974 | 2.950 | 0.998 | 3.950 | 0.9999609 | 4.950 | 0.9999996 |
| 0.975 | 0.835 | 1.975 | 0.976 | 2.975 | 0.999 | 3.975 | 0.9999648 | 4.975 | 0.9999997 |

Table 2 (MATH-234). Quantiles Φ⁻¹(p) (fonction réciproque de Φ). Le nombre de décimales varie par colonne, comme dans le formulaire.

| p | Φ⁻¹(p) | p | Φ⁻¹(p) | p | Φ⁻¹(p) | p | Φ⁻¹(p) | p | Φ⁻¹(p) |
|---|---|---|---|---|---|---|---|---|---|
| 0.50 | 0.00 | 0.90 | 1.28 | 0.985 | 2.170 | 0.9935 | 2.4838 | 0.9975 | 2.8070 |
| 0.51 | 0.03 | 0.91 | 1.34 | 0.986 | 2.197 | 0.9936 | 2.4893 | 0.9976 | 2.8202 |
| 0.52 | 0.05 | 0.92 | 1.41 | 0.987 | 2.226 | 0.9937 | 2.4949 | 0.9977 | 2.8338 |
| 0.53 | 0.08 | 0.93 | 1.48 | 0.988 | 2.257 | 0.9938 | 2.5006 | 0.9978 | 2.8480 |
| 0.54 | 0.10 | 0.94 | 1.55 | 0.989 | 2.290 | 0.9939 | 2.5063 | 0.9979 | 2.8627 |
| 0.55 | 0.13 | 0.95 | 1.64 | 0.990 | 2.326 | 0.9940 | 2.5121 | 0.9980 | 2.8782 |
| 0.56 | 0.15 | 0.951 | 1.655 | 0.9901 | 2.3301 | 0.9941 | 2.5181 | 0.9981 | 2.8943 |
| 0.57 | 0.18 | 0.952 | 1.665 | 0.9902 | 2.3339 | 0.9942 | 2.5241 | 0.9982 | 2.9112 |
| 0.58 | 0.20 | 0.953 | 1.675 | 0.9903 | 2.3378 | 0.9943 | 2.5302 | 0.9983 | 2.9290 |
| 0.59 | 0.23 | 0.954 | 1.685 | 0.9904 | 2.3416 | 0.9944 | 2.5364 | 0.9984 | 2.9478 |
| 0.60 | 0.25 | 0.955 | 1.695 | 0.9905 | 2.3455 | 0.9945 | 2.5427 | 0.9985 | 2.9677 |
| 0.61 | 0.28 | 0.956 | 1.706 | 0.9906 | 2.3495 | 0.9946 | 2.5491 | 0.9986 | 2.9889 |
| 0.62 | 0.31 | 0.957 | 1.717 | 0.9907 | 2.3535 | 0.9947 | 2.5556 | 0.9987 | 3.0115 |
| 0.63 | 0.33 | 0.958 | 1.728 | 0.9908 | 2.3575 | 0.9948 | 2.5622 | 0.9988 | 3.0357 |
| 0.64 | 0.36 | 0.959 | 1.739 | 0.9909 | 2.3615 | 0.9949 | 2.5690 | 0.9989 | 3.0618 |
| 0.65 | 0.39 | 0.960 | 1.751 | 0.9910 | 2.3656 | 0.9950 | 2.5758 | 0.9990 | 3.0902 |
| 0.66 | 0.41 | 0.961 | 1.762 | 0.9911 | 2.3698 | 0.9951 | 2.5828 | 0.99901 | 3.09322 |
| 0.67 | 0.44 | 0.962 | 1.774 | 0.9912 | 2.3739 | 0.9952 | 2.5899 | 0.99902 | 3.09623 |
| 0.68 | 0.47 | 0.963 | 1.787 | 0.9913 | 2.3781 | 0.9953 | 2.5972 | 0.99903 | 3.09927 |
| 0.69 | 0.50 | 0.964 | 1.799 | 0.9914 | 2.3824 | 0.9954 | 2.6045 | 0.99904 | 3.10234 |
| 0.70 | 0.52 | 0.965 | 1.812 | 0.9915 | 2.3867 | 0.9955 | 2.6121 | 0.99905 | 3.10543 |
| 0.71 | 0.55 | 0.966 | 1.825 | 0.9916 | 2.3911 | 0.9956 | 2.6197 | 0.99906 | 3.10856 |
| 0.72 | 0.58 | 0.967 | 1.838 | 0.9917 | 2.3954 | 0.9957 | 2.6276 | 0.99907 | 3.11172 |
| 0.73 | 0.61 | 0.968 | 1.852 | 0.9918 | 2.3999 | 0.9958 | 2.6356 | 0.99908 | 3.11491 |
| 0.74 | 0.64 | 0.969 | 1.866 | 0.9919 | 2.4044 | 0.9959 | 2.6437 | 0.99909 | 3.11813 |
| 0.75 | 0.67 | 0.970 | 1.881 | 0.9920 | 2.4089 | 0.9960 | 2.6521 | 0.99910 | 3.12139 |
| 0.76 | 0.71 | 0.971 | 1.896 | 0.9921 | 2.4135 | 0.9961 | 2.6606 | 0.99911 | 3.12468 |
| 0.77 | 0.74 | 0.972 | 1.911 | 0.9922 | 2.4181 | 0.9962 | 2.6693 | 0.99912 | 3.12800 |
| 0.78 | 0.77 | 0.973 | 1.927 | 0.9923 | 2.4228 | 0.9963 | 2.6783 | 0.99913 | 3.13136 |
| 0.79 | 0.81 | 0.974 | 1.943 | 0.9924 | 2.4276 | 0.9964 | 2.6874 | 0.99914 | 3.13475 |
| 0.80 | 0.84 | 0.975 | 1.960 | 0.9925 | 2.4324 | 0.9965 | 2.6968 | 0.99915 | 3.13818 |
| 0.81 | 0.88 | 0.976 | 1.977 | 0.9926 | 2.4372 | 0.9966 | 2.7065 | 0.99916 | 3.14165 |
| 0.82 | 0.92 | 0.977 | 1.995 | 0.9927 | 2.4422 | 0.9967 | 2.7164 | 0.99917 | 3.14515 |
| 0.83 | 0.95 | 0.978 | 2.014 | 0.9928 | 2.4471 | 0.9968 | 2.7266 | 0.99918 | 3.14870 |
| 0.84 | 0.99 | 0.979 | 2.034 | 0.9929 | 2.4522 | 0.9969 | 2.7370 | 0.99919 | 3.15228 |
| 0.85 | 1.04 | 0.980 | 2.054 | 0.9930 | 2.4573 | 0.9970 | 2.7478 | 0.99920 | 3.15591 |
| 0.86 | 1.08 | 0.981 | 2.075 | 0.9931 | 2.4624 | 0.9971 | 2.7589 | 0.99921 | 3.15957 |
| 0.87 | 1.13 | 0.982 | 2.097 | 0.9932 | 2.4677 | 0.9972 | 2.7703 | 0.99922 | 3.16328 |
| 0.88 | 1.17 | 0.983 | 2.120 | 0.9933 | 2.4730 | 0.9973 | 2.7822 | 0.99923 | 3.16704 |
| 0.89 | 1.23 | 0.984 | 2.144 | 0.9934 | 2.4783 | 0.9974 | 2.7944 | 0.99924 | 3.17084 |

Table 3 (MATH-234). Quantiles de Student : `s_α` vérifie α/100 = Pr(|T| > s_α) pour T ~ t_ν (s₅, s₁, s₀.₁ = niveaux **bilatéraux** 5 %, 1 %, 0,1 %). La ligne ∞ est la loi normale.

| ν | s₅ | s₁ | s₀.₁ | ν | s₅ | s₁ | s₀.₁ |
|---|---|---|---|---|---|---|---|
| 1 | 12.706 | 63.657 | 636.619 | 21 | 2.080 | 2.831 | 3.819 |
| 2 | 4.303 | 9.925 | 31.599 | 22 | 2.074 | 2.819 | 3.792 |
| 3 | 3.182 | 5.841 | 12.924 | 23 | 2.069 | 2.807 | 3.768 |
| 4 | 2.776 | 4.604 | 8.610 | 24 | 2.064 | 2.797 | 3.745 |
| 5 | 2.571 | 4.032 | 6.869 | 25 | 2.060 | 2.787 | 3.725 |
| 6 | 2.447 | 3.707 | 5.959 | 26 | 2.056 | 2.779 | 3.707 |
| 7 | 2.365 | 3.499 | 5.408 | 27 | 2.052 | 2.771 | 3.690 |
| 8 | 2.306 | 3.355 | 5.041 | 28 | 2.048 | 2.763 | 3.674 |
| 9 | 2.262 | 3.250 | 4.781 | 29 | 2.045 | 2.756 | 3.659 |
| 10 | 2.228 | 3.169 | 4.587 | 30 | 2.042 | 2.750 | 3.646 |
| 11 | 2.201 | 3.106 | 4.437 | 32 | 2.037 | 2.738 | 3.622 |
| 12 | 2.179 | 3.055 | 4.318 | 34 | 2.032 | 2.728 | 3.601 |
| 13 | 2.160 | 3.012 | 4.221 | 36 | 2.028 | 2.719 | 3.582 |
| 14 | 2.145 | 2.977 | 4.140 | 38 | 2.024 | 2.712 | 3.566 |
| 15 | 2.131 | 2.947 | 4.073 | 40 | 2.021 | 2.704 | 3.551 |
| 16 | 2.120 | 2.921 | 4.015 | 50 | 2.009 | 2.678 | 3.496 |
| 17 | 2.110 | 2.898 | 3.965 | 100 | 1.984 | 2.626 | 3.390 |
| 18 | 2.101 | 2.878 | 3.922 | 150 | 1.976 | 2.609 | 3.357 |
| 19 | 2.093 | 2.861 | 3.883 | 200 | 1.972 | 2.601 | 3.340 |
| 20 | 2.086 | 2.845 | 3.850 | ∞ | 1.960 | 2.576 | 3.291 |

Table 4 (MATH-234). Quantiles du χ²(r) : `s_α` vérifie α/100 = Pr(T > s_α) (queue **supérieure**). La case r = 25, s₀.₁ est imprimée `52.62` dans le formulaire ; l'app affiche `52.620` et le test compare à 52,620 ± 5·10⁻⁴.

| r | s₅ | s₁ | s₀.₁ | r | s₅ | s₁ | s₀.₁ |
|---|---|---|---|---|---|---|---|
| 1 | 3.841 | 6.635 | 10.828 | 19 | 30.144 | 36.191 | 43.820 |
| 2 | 5.991 | 9.210 | 13.816 | 20 | 31.410 | 37.566 | 45.315 |
| 3 | 7.815 | 11.345 | 16.266 | 21 | 32.671 | 38.932 | 46.797 |
| 4 | 9.488 | 13.277 | 18.467 | 22 | 33.924 | 40.289 | 48.268 |
| 5 | 11.070 | 15.086 | 20.515 | 23 | 35.172 | 41.638 | 49.728 |
| 6 | 12.592 | 16.812 | 22.458 | 24 | 36.415 | 42.980 | 51.179 |
| 7 | 14.067 | 18.475 | 24.322 | 25 | 37.652 | 44.314 | 52.62 |
| 8 | 15.507 | 20.090 | 26.124 | 26 | 38.885 | 45.642 | 54.052 |
| 9 | 16.919 | 21.666 | 27.877 | 27 | 40.113 | 46.963 | 55.476 |
| 10 | 18.307 | 23.209 | 29.588 | 28 | 41.337 | 48.278 | 56.892 |
| 11 | 19.675 | 24.725 | 31.264 | 29 | 42.557 | 49.588 | 58.301 |
| 12 | 21.026 | 26.217 | 32.909 | 30 | 43.773 | 50.892 | 59.703 |
| 13 | 22.362 | 27.688 | 34.528 | 32 | 46.194 | 53.486 | 62.487 |
| 14 | 23.685 | 29.141 | 36.123 | 34 | 48.602 | 56.061 | 65.247 |
| 15 | 24.996 | 30.578 | 37.697 | 36 | 50.998 | 58.619 | 67.985 |
| 16 | 26.296 | 32.000 | 39.252 | 38 | 53.384 | 61.162 | 70.703 |
| 17 | 27.587 | 33.409 | 40.790 | 40 | 55.758 | 63.691 | 73.402 |
| 18 | 28.869 | 34.805 | 42.312 | 50 | 67.505 | 76.154 | 86.661 |

Tables EE-209 (formulaire, à afficher telles quelles dans les items EE-209) :

| 1 − α | z₁₋α | z₁₋α/₂ |
|---|---|---|
| 0.90 | 1.282 | 1.645 |
| 0.95 | 1.645 | 1.960 |
| 0.99 | 2.326 | 2.576 |
| 0.999 | 3.090 | 3.291 |

| 1 − α \ n − 1 | 1 | 2 | 5 | 10 | 20 | 50 | 100 |
|---|---|---|---|---|---|---|---|
| 0.90 | 6.31 | 2.92 | 2.02 | 1.81 | 1.73 | 1.67 | 1.66 |
| 0.95 | 12.7 | 4.30 | 2.57 | 2.23 | 2.09 | 2.01 | 1.98 |
| 0.99 | 63.6 | 9.92 | 4.03 | 3.17 | 2.85 | 2.68 | 2.62 |

(valeurs de t^{(n−1)}_{1−α/2}). Règle 68,3 – 95,5 – 99,7 % pour ±1σ, ±2σ, ±3σ.

**Arrondi d'un IC (EE-209, partie 3b)**, utilisé par `stat` avec `ciRule: 'outward'` : pour un IC `[θ̂ − u ; θ̂ + u]`, (1) u s'écrit avec k = 2 chiffres significatifs (k = 1 accepté si le premier chiffre de u est 4 à 9 ; k = 3 au plus), arrondi au plus proche ; (2) θ̂, θ̂ − u et θ̂ + u s'écrivent avec la même précision (même dernière décimale) que u ; (3) la borne inférieure est arrondie **vers le bas**, la borne supérieure **vers le haut**. Exemple du cours : θ̂ = 1,069871, u = 0,002415 → u = 0,0024, θ̂ = 1,0699, IC = [1,0674 ; 1,0723]. Les items MATH-234 n'imposent pas cette règle : bornes à ½·10^(−decimals) près.

## Compétences

### `p-desc-summary` — Moyenne, médiane, variance empirique
- **Année** 15 · **Prérequis** `@alg:A-arrondir` · **Étiquettes** `MATH-234` · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U7). Une partie par grandeur nommée (x̄, méd, Σ(xᵢ − x̄)², s², s), avec report d'erreur ($xbar). La somme des données est dans la note de la première ligne (`42/7`). Niveau 5 : la série complète sans aide, ou le changement d'unité y = a·x + b (aussi 1 fois sur 4 au niveau 4). Non faits : l'item `code` (le type `code` vient avec U9), le gabarit (b) valeur/effectif, la comparaison de deux séries.
- **Intro** : on trie les données, puis : moyenne x̄ = Σxᵢ/n ; médiane x₍⌈n/2⌉₎ ; variance empirique s² = Σ(xᵢ − x̄)²/(**n − 1**) ; écart-type s = √s². Si yᵢ = a·xᵢ + b : ȳ = a·x̄ + b, méd(y) = a·méd(x) + b, s_y = |a|·s_x. Exemple : `2, 4, 4, 5, 7, 9, 11` (note : n = 7, x̄ = 42/7 = 6) ; `méd = x₍₄₎ = 5` ; `s² = 60/6 = 10` (note : 60 = somme des écarts au carré).
- **Juge** : lignes étiquetées. `x̄`, `méd`, `Σ(xᵢ − x̄)²`, `s²` : `prob` (valeurs exactes) ; `s` : `stat {decimals: 2}` · **Forme finale** : x̄, médiane et s² exactes (entier, fraction ou décimal fini), s à 0,01 près.
- **Niveaux** :
  - L1 (guidé) : données déjà triées ; lignes `x̄ = (… + …)/7`, `s² = …/(7 − 1)` à trous.
  - L2 : données non triées ; décision « trier d'abord » ; trous sur les écarts au carré.
  - L3 (choisir l'action) : trier, moyenne, médiane, écarts, diviser par n − 1, racine.
  - L4 (libre) : les quatre grandeurs demandées.
  - L5 (seul) : deux séries à comparer (moyenne et médiane, effet d'une valeur aberrante), ou changement d'unité yᵢ = a·xᵢ + b sans recalcul.
- **Générateur** : n ∈ {5, 7, 9, 11} (impair) ; x̄ entier dans [3 ; 60] ; écarts entiers en paires ±a (a ∈ 1..12), plus 0, de somme nulle ; Σdᵢ² divisible par n − 1 (s² entier) aux niveaux 1 à 3, sinon s² à une décimale ; toutes les données ≥ 0 ; on mélange l'ordre. Gabarits : (a) liste brute (« temps de trajet en minutes ») ; (b) tableau valeur/effectif (n = Σ effectifs) ; (c) unités changées (pouces → cm, a = 2,54) : x̄, méd et s donnés, trouver ceux de y. Item `code` (L4) : compléter `s2 = s2 + (x[i] - m) ** 2` puis `return s2 / ???` (réponse `(n - 1)`), testé sur 3 listes.
- **Corrigé type** : données `7, 2, 11, 4, 9, 4, 5`.
  1. `trié : 2, 4, 4, 5, 7, 9, 11` — ordonner
  2. `x̄ = 42/7 = 6` — moyenne
  3. `méd = x₍₄₎ = 5` — médiane (⌈7/2⌉ = 4)
  4. `Σ(xᵢ − x̄)² = 16 + 4 + 4 + 1 + 1 + 9 + 25 = 60` — écarts au carré
  5. `s² = 60/6 = 10` — diviser par n − 1
  6. `s = √10 ≈ 3,16` — écart-type
- **Aides** : 1 « Trie d'abord. Pour s², somme des écarts au carré, divisée par n − 1. » · 2 `s² = (16 + 4 + … + 25)/(7 − 1)` · 3 `s² = 60/6 = 10`.
- **Variantes d'examen** : `coef` (MATH-234 : une seule valeur demandée, s ou la médiane) ; `mcq` (distracteurs : `p_sd_n` → 60/7, `p_median_unsorted` → 5ᵉ valeur de la liste brute, `p_median_mean` → 6) ; `tf` : « Si on ajoute 10 à toutes les données, s augmente de 10 » (faux ; contre-exemple 1, 2, 3 → 11, 12, 13, s = 1 dans les deux cas) ; « La médiane est moins sensible aux valeurs aberrantes que la moyenne » (vrai).
- **Pièges** : `p_sd_n`, `p_median_unsorted`, `p_median_mean`, `p_lin_transform_sd`.
- **Sous-buts → crédit** : ordonner, moyenne, médiane, écarts, s² → `p-desc-summary` ; racine et arrondi → `@alg:A-arrondir`.

### `p-desc-boxplot` — Quartiles, résumé en 5 valeurs, boîte à moustaches
- **Année** 15 · **Prérequis** `p-desc-summary` · **Étiquettes** `MATH-234` · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U7). Parties q̂(0,25), méd, q̂(0,75), EIQ, seuils (intervalle) et moustaches (intervalle [a ; b], juge `prob`) ; les valeurs aberrantes sont une décision. Le résumé en 5 valeurs n'est pas une ligne à part. Non faits : le dessin de la boîte (L4), la comparaison de deux boîtes (L5 : tout le calcul sans aide, données non triées) et le gabarit (c) boîte dessinée.
- **Intro** : q̂(α) = x₍⌈nα⌉₎. Résumé en 5 valeurs : min, q̂(0,25), médiane, q̂(0,75), max. EIQ = q̂(0,75) − q̂(0,25), C = 1,5·EIQ. Les moustaches vont jusqu'aux **données** les plus extrêmes à l'intérieur de [q̂(0,25) − C ; q̂(0,75) + C] ; les données hors de cet intervalle sont des points (valeurs aberrantes). Exemple : n = 11, `⌈11 · 0,25⌉ = 3` (note : q̂(0,25) = x₍₃₎) ; `C = 1,5 · 7 = 10,5`.
- **Juge** : lignes étiquetées, `value` (positions entières, valeurs exactes) ; dernière ligne `moustaches = [a ; b] ; aberrantes = {…}` comparée comme ensemble · **Forme finale** : résumé en 5 valeurs, extrémités des moustaches, liste des valeurs aberrantes (∅ accepté).
- **Niveaux** :
  - L1 (guidé) : données triées, positions ⌈nα⌉ données, valeurs à trouver.
  - L2 : positions à calculer ; seuils à trous.
  - L3 (choisir l'action) : position, quartile, EIQ, seuils, moustaches.
  - L4 (libre) : tout le calcul, puis l'app dessine la boîte de l'élève à côté de la bonne.
  - L5 (seul) : deux boîtes à comparer (lecture : asymétrie, dispersion, médianes) puis calcul d'une des deux.
- **Générateur** : n ∈ {7, 9, 10, 11, 13, 14, 15} (jamais multiple de 4) ; valeurs entières dans [0 ; 100] ; 0 ou 1 valeur aberrante, construite en plaçant une donnée au-delà de q̂(0,75) + C + 1 (ou en deçà de q̂(0,25) − C − 1) ; si aucune donnée aberrante, la moustache tombe sur min ou max. Gabarits : (a) liste triée ; (b) liste non triée ; (c) boîte dessinée (repère interactif) à lire, puis QCM sur l'asymétrie.
- **Corrigé type** : `3, 5, 6, 8, 8, 9, 10, 12, 13, 15, 31`.
  1. `⌈2,75⌉ = 3 → q̂(0,25) = 6` — premier quartile
  2. `⌈5,5⌉ = 6 → méd = 9` — médiane
  3. `⌈8,25⌉ = 9 → q̂(0,75) = 13` — troisième quartile
  4. `EIQ = 7 ; C = 10,5` — étendue interquartile
  5. `seuils : −4,5 et 23,5` — seuils
  6. `moustaches = [3 ; 15] ; aberrantes = {31}` — moustaches
  7. `résumé : (3 ; 6 ; 9 ; 13 ; 31)` — résumé en 5 valeurs
- **Aides** : 1 « Position ⌈n·α⌉, puis la donnée à cette place. La moustache s'arrête sur une donnée. » · 2 `q̂(0,75) = x₍⌈11 · 0,75⌉₎ = x₍…₎` · 3 `moustaches = [3 ; 15] ; aberrantes = {31}`.
- **Variantes d'examen** : `mcq` (distracteurs : `p_quartile_convention` → 6,5 ou 12,5 ; `p_whisker_threshold` → [−4,5 ; 23,5] ; `p_boxplot_range` → EIQ = max − min) ; `tf` : « La boîte contient environ la moitié des données » (vrai) ; « La moustache supérieure va jusqu'à q̂(0,75) + 1,5·EIQ » (faux ; contre-exemple ci-dessus : 23,5 n'est pas une donnée, la moustache s'arrête à 15).
- **Pièges** : `p_quartile_convention`, `p_whisker_threshold`, `p_boxplot_range`, `p_median_unsorted`.
- **Sous-buts → crédit** : médiane → `p-desc-summary` ; quartiles, seuils, moustaches → `p-desc-boxplot`.

### `p-events` — Axiomes, complément, inclusion-exclusion
- **Année** 15 · **Prérequis** `g9-sets` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U7). Aux niveaux 1 et 2 la formule est une note, la ligne avec les nombres est à trous ; la ligne de formule (avec les symboles Pr(…)) apparaît dès le niveau 3. `p_conjunction` est une option de décision (« A seulement », Pr(A ∩ B)). Niveau 5 : les quatre questions enchaînées, sans le tableau 2 × 2. Gabarit (c) (catégories d'un tableau) non fait.
- **Pourquoi ces prérequis** : `g9-sets` : réunion, intersection et complément d'événements.
- **Intro** : 0 ≤ Pr(A) ≤ 1, Pr(Ω) = 1, et Pr de réunions disjointes = somme. On en tire Pr(Aᶜ) = 1 − Pr(A), Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B), Pr(A ∩ Bᶜ) = Pr(A) − Pr(A ∩ B), et A ⊂ B ⇒ Pr(A) ≤ Pr(B). Exemple : `Pr(A ∪ B) = 0,5 + 0,7 − 0,3 = 0,9` ; `Pr(aucun) = 1 − 0,9 = 0,1`.
- **Juge** : `prob` `{symbols: {'Pr(A)': '1/2', 'Pr(B)': '7/10', 'Pr(A∩B)': '3/10'}}` · **Forme finale** : décimal fini ou fraction irréductible.
- **Niveaux** :
  - L1 (guidé) : formule écrite, nombres à placer.
  - L2 : décision « quelle formule ? » (inclusion-exclusion, complément, différence).
  - L3 (choisir l'action) : formule, De Morgan, complément, remplacer.
  - L4 (libre) : une question.
  - L5 (seul) : quatre questions chaînées (au moins un, aucun, A seulement, B seulement), puis le tableau 2 × 2 complet.
- **Générateur** : Pr(A), Pr(B) ∈ {0,1 ; … ; 0,9} ; Pr(A ∩ B) multiple de 0,05 dans [max(0 ; Pr A + Pr B − 1) ; min(Pr A ; Pr B)], cas Pr(A ∩ B) = 0 exclu aux niveaux 1 à 3. Gabarits : (a) deux examens réussis (série 3) ; (b) deux pannes ; (c) tableau de fréquences relatives à catégories disjointes (« divorcées ou jamais mariées ») ; (d) une donnée manquante à retrouver (Pr(A ∪ B) donné, Pr(A ∩ B) demandé).
- **Corrigé type** : Pr(A) = 0,5 (réussir l'analyse), Pr(B) = 0,7, Pr(A ∩ B) = 0,3.
  1. `Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B)` — choisir la formule
  2. `= 0,5 + 0,7 − 0,3 = 0,9` — remplacer
  3. `Pr(Aᶜ ∩ Bᶜ) = 1 − Pr(A ∪ B) = 0,1` — De Morgan et complément
  4. `Pr(A ∩ Bᶜ) = Pr(A) − Pr(A ∩ B) = 0,2` — différence
- **Aides** : 1 « Échouer aux deux, c'est le contraire de réussir au moins un. » · 2 `Pr(A ∪ B) = 0,5 + 0,7 − …` · 3 `Pr(A ∪ B) = 0,9`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_union_add` → 1,2 ; `p_complement_wrong` → 0,7 ; `p_indep_assumed` → 0,85) ; `tf` : « Si Pr(A) + Pr(B) > 1, A et B ne sont pas incompatibles » (vrai) ; « Pr(A ∪ B) = Pr(A) + Pr(B) pour tous A et B » (faux ; contre-exemple A = B avec Pr(A) = 1/2).
- **Pièges** : `p_union_add`, `p_complement_wrong`, `p_indep_assumed`, `p_conjunction`.
- **Sous-buts → crédit** : toutes les lignes → `p-events`.

### `p-count` — Équiprobabilité et dénombrement
- **Année** 15 · **Prérequis** `p-events`, `g7-combinations`, `g7-which-count` · **Étiquettes** `MATH-234` · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U7). Gabarits cartes (32, 36, 52), comité, lot ; Pr(A) en fraction irréductible avec « ≈ » pour la valeur approchée. Niveau 5 (et 3 fois sur 10 au niveau 4) : « au moins 2 » par le complément. Non faits : le gabarit (d) anniversaires (fractions trop grandes pour le calcul exact) et « 4 cartes de la même couleur ». Simulation : l'urne tirée 10 000 fois.
- **Pourquoi ces prérequis** : `p-events` : Pr(A) = |A|/|Ω| et passage au complément.
- **Intro** : si tous les résultats sont équiprobables, Pr(A) = |A|/|Ω|. Tirage simultané (sans ordre, sans remise) de n objets parmi N : |Ω| = C(N, n). « Exactement k marqués » : C(K, k)·C(N − K, n − k). On compte Ω et A **de la même façon** (les deux ordonnés ou les deux non ordonnés). Exemple : `|Ω| = C(32, 4) = 35 960` ; `|A| = C(4, 2) · C(28, 2) = 2 268`.
- **Juge** : `prob` ; `C(n, k)` est lu comme un nombre exact · **Forme finale** : fraction irréductible (le décimal à 4 chiffres est accepté en plus, pas à la place).
- **Niveaux** :
  - L1 (guidé) : |Ω| écrit, |A| à trous `C(4, …)·C(…, 2)`.
  - L2 : décision « ordonné ? avec remise ? », puis les deux comptes.
  - L3 (choisir l'action) : C(·,·), arrangement, puissance, complément.
  - L4 (libre) : « exactement k ».
  - L5 (seul) : « au moins 2 » (complément ou somme), puis « 4 cartes de la même couleur ».
- **Générateur** : N ∈ {20, 32, 36, 52}, K ∈ 3..13 objets marqués, n ∈ 2..5, k ∈ 0..min(K, n) ; on exclut Pr < 0,001. Gabarits : (a) cartes ; (b) comité (hommes/femmes) ; (c) pièces défectueuses dans un lot ; (d) ordonné avec remise (anniversaires, codes : 1 − 365·364···/365ⁿ, n ≤ 6 avec calculatrice).
- **Corrigé type** : 4 cartes parmi 32 (4 dames), exactement 2 dames.
  1. décision `ordre : non ; remise : non → combinaisons` — modéliser
  2. `|Ω| = C(32, 4) = 35 960` — compter Ω
  3. `|A| = C(4, 2) · C(28, 2) = 6 · 378 = 2 268` — compter A (les dames, puis le reste)
  4. `Pr(A) = 2 268/35 960 = 567/8 990 ≈ 0,0631` — rapport
- **Aides** : 1 « Choisis les dames, puis les autres cartes : multiplie les deux comptes. » · 2 `|A| = C(4, 2) · C(…, …)` · 3 `|A| = 6 · 378 = 2 268`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_count_forget_rest` → 6/35 960 ; `p_binom_without_replacement` → C(4, 2)(1/8)²(7/8)² ≈ 0,0718 ; `g7_order_confusion` → 2 268/(32·31·30·29)) ; `tf` : « Tirer 4 cartes d'un coup ou une par une sans remise donne la même probabilité pour “exactement 2 dames” » (vrai).
- **Pièges** : `g7_order_confusion`, `p_count_forget_rest`, `p_binom_without_replacement`, `p_exactly_atleast`.
- **Sous-buts → crédit** : modéliser → `g7-which-count` ; compter → `g7-combinations` ; rapport → `p-count`.

### `p-cond-total` — Conditionnement et probabilités totales
- **Année** 15 · **Prérequis** `p-events` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U7). Gabarits test médical, urnes à pile ou face, trois machines (Pr(A) totale) ; Pr(A | B) à partir des valeurs données (niveau 4) ; niveau 5 : univers réduit avec deux dés, ou probabilité totale puis Pr(M | +). L'arbre des niveaux 1 et 2 est remplacé par la ligne à trous. Non faits : la double faute au tennis, le coiffeur, la clé de Julie.
- **Pourquoi ces prérequis** : `p-events` : Pr(A ∩ B) et partitions de Ω.
- **Intro** : Pr(A | B) = Pr(A ∩ B)/Pr(B) ; donc Pr(A ∩ B) = Pr(A | B)·Pr(B). Si B₁, …, B_k partitionnent Ω : Pr(A) = Σ Pr(A | Bᵢ)·Pr(Bᵢ) (une branche de l'arbre par Bᵢ). Exemple : `Pr(+) = 0,9 · 0,1 + 0,2 · 0,9` (note : une branche « malade », une branche « sain ») ; `= 0,27`.
- **Juge** : `prob` `{symbols}` ; l'arbre (L1–L2) est un `table` de branches · **Forme finale** : décimal fini ou fraction irréductible.
- **Niveaux** :
  - L1 (guidé) : arbre dessiné, probabilités des branches à compléter.
  - L2 : décision « quelle partition ? », puis la somme.
  - L3 (choisir l'action) : multiplier le long d'une branche, additionner les branches, diviser par Pr(B).
  - L4 (libre) : Pr(A) ou Pr(A | B).
  - L5 (seul) : conditionnement dans un univers réduit (deux dés « somme = 8 ») et probabilités totales enchaînées (clé de Julie, série 3).
- **Générateur** : partition à 2 ou 3 parties, Pr(Bᵢ) et Pr(A | Bᵢ) multiples de 0,05 ou fractions simples ; résultat décimal fini. Gabarits : (a) test médical (série 3, ex. 6) ; (b) deux dés « somme = 8, Pr(un 6) » → 2/5 ; (c) urnes choisies à pile ou face ; (d) double faute au tennis 3/5 · 2/5 = 6/25 ; (e) coiffeur A ou B choisi au dé, attente uniforme (série 6) — renvoie aussi à `p-unif-exp`.
- **Corrigé type** : 10 % de malades ; positif avec probabilité 0,9 si malade, 0,2 si sain.
  1. `partition : M, Mᶜ ; Pr(M) = 0,1 ; Pr(Mᶜ) = 0,9` — partition
  2. `Pr(+) = Pr(+ | M)·Pr(M) + Pr(+ | Mᶜ)·Pr(Mᶜ)` — probabilités totales
  3. `= 0,9 · 0,1 + 0,2 · 0,9` — remplacer
  4. `= 0,09 + 0,18 = 0,27` — calculer
- **Aides** : 1 « Une branche par cas (malade, sain) ; on multiplie le long d'une branche, on additionne les branches. » · 2 `Pr(+) = 0,9 · 0,1 + … · 0,9` · 3 `Pr(+) = 0,27`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_total_missing_branch` → 0,09 ; `p_cond_denominator` ; `p_cond_inverse`) ; `tf` : « Pr(A | B) + Pr(Aᶜ | B) = 1 » (vrai) ; « Pr(A | B) + Pr(A | Bᶜ) = 1 » (faux ; contre-exemple A = Ω : la somme vaut 2).
- **Pièges** : `p_total_missing_branch`, `p_cond_denominator`, `p_cond_inverse`.
- **Sous-buts → crédit** : partition, somme → `p-cond-total`.

### `p-bayes-freq` — Bayes par les fréquences naturelles
- **Année** 15 · **Prérequis** `p-cond-total`, `@alg:J-pourcentage` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U7). Cinq parties (malades, malades positifs, sains positifs, positifs, Pr(M | +)), le pourcentage dans la note et après « ≈ ». Gabarits test médical, filtre anti-spam, contrôle de qualité. « Interpréter » et la simulation (10 000 personnes) sont branchés. Non faits : la population choisie par l'élève (L4), le curseur « prédire puis calculer » (L5 : tout le calcul sans aide), le gabarit (d) Pr(sain | négatif).
- **Intro** : on imagine 1 000 personnes et on remplit le tableau malades/sains × positif/négatif. Pr(malade | positif) = (malades positifs)/(tous les positifs). Exemple (1 %, 90 %, 10 %) : `10 malades, 990 sains` ; `9 malades positifs, 99 sains positifs` ; `Pr(M | +) = 9/108 = 1/12` (note : 8,3 %, pas 90 %).
- **Juge** : lignes étiquetées. Effectifs : `value` (entiers) ; dernière ligne : `prob` · **Forme finale** : fraction irréductible et pourcentage à 0,1 % près.
- **Niveaux** :
  - L1 (guidé) : tableau de 1 000 personnes, deux cases à remplir, rapport donné à trous.
  - L2 : les quatre cases ; rapport à choisir parmi 4 (9/108, 9/10, 9/1 000, 99/108).
  - L3 (choisir l'action) : répartir selon le taux de base, appliquer la sensibilité, appliquer le taux de faux positifs, total de la colonne, rapport.
  - L4 (libre) : l'élève choisit lui-même l'effectif (toute population qui donne des entiers est acceptée).
  - L5 (seul) : « Prédire puis calculer » : l'élève estime d'abord (curseur de 0 à 100 %), puis calcule ; l'app montre l'écart entre l'estimation et le résultat.
- **Générateur** : prévalence π ∈ {0,5 ; 1 ; 2 ; 5 ; 10 ; 20} %, sensibilité ∈ {80 ; 90 ; 95 ; 99} %, faux positifs ∈ {1 ; 2 ; 5 ; 10 ; 20} % ; N ∈ {1 000 ; 10 000} tel que les quatre effectifs soient entiers. Gabarits : (a) test médical ; (b) filtre anti-spam (« ham » ou spam, EE-209) ; (c) contrôle de qualité d'une machine ; (d) Pr(sain | négatif). Simulation : 10 000 personnes tirées.
- **Corrigé type** : 1 % de malades ; le test détecte 90 % des malades ; 10 % de faux positifs chez les sains.
  1. `malades = 10 ; sains = 990` — taux de base
  2. `malades positifs = 0,9 · 10 = 9` — sensibilité
  3. `sains positifs = 0,1 · 990 = 99` — faux positifs
  4. `positifs = 9 + 99 = 108` — total des positifs
  5. `Pr(M | +) = 9/108 = 1/12 ≈ 8,3 %` — rapport
  6. Interpréter (QCM) : « Parmi 12 personnes positives, une seule est malade en moyenne » ✓ ; « 90 % des positifs sont malades » (`p_cond_inverse`) ; « 9 personnes sur 1 000 » (`p_bayes_joint`) ; « 50 %, puisque le test a 90 % et 10 % » (`p_base_rate`).
- **Aides** : 1 « Commence par répartir les 1 000 personnes selon la maladie, avant de parler du test. » · 2 `Pr(M | +) = 9/(9 + …)` · 3 `Pr(M | +) = 9/108 = 1/12`.
- **Variantes d'examen** : `coef` (MATH-234) ; `mcq` (EE-209 ; distracteurs : `p_cond_inverse` → 0,9, `p_base_rate` → 0,9/(0,9 + 0,1) = 0,9 ou 0,5 selon le gabarit, `p_bayes_joint` → 0,009) ; `tf` : « Un test qui détecte 99 % des malades donne au moins 99 % de malades parmi les positifs » (faux ; contre-exemple : prévalence 1 %, faux positifs 5 % → Pr(M | +) = 1/6).
- **Pièges** : `p_cond_inverse`, `p_base_rate`, `p_bayes_joint`.
- **Sous-buts → crédit** : taux de base, sensibilité, faux positifs → `p-cond-total` ; rapport → `p-bayes-freq` ; pourcentage → `@alg:J-pourcentage`.

### `p-bayes-formula` — Formule de Bayes, deux tests
- **Année** 15 · **Prérequis** `p-bayes-freq` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U7). Parties Pr(+), Pr(M | +), Pr(M | +, +) et, au niveau 5 et en variante `open` (10 points : 9 pour les lignes, 1 pour « Interpréter »), la vérification par mise à jour successive. Non faits : les gabarits (c) test négatif, (d) trois machines, (e) pièce biaisée.
- **Pourquoi ces prérequis** : `p-bayes-freq` : même tableau des fréquences naturelles.
- **Intro** : Pr(M | +) = Pr(+ | M)·Pr(M) / [Pr(+ | M)·Pr(M) + Pr(+ | Mᶜ)·Pr(Mᶜ)]. Le dénominateur est Pr(+), par les probabilités totales ; c'est la colonne « positifs » du tableau. Deux tests indépendants **sachant l'état** : Pr(+, + | M) = Pr(+ | M)². Exemple : `Pr(M | +) = 0,9 · 0,01/(0,9 · 0,01 + 0,1 · 0,99) = 1/12` (note : même nombre que 9/108) ; `Pr(M | +, +) = 0,9² · 0,01/(0,9² · 0,01 + 0,1² · 0,99) = 9/20`.
- **Juge** : `prob` `{symbols: {'Pr(M)': '1/100', 'Pr(+|M)': '9/10', 'Pr(+|Mᶜ)': '1/10'}}` · **Forme finale** : fraction irréductible et pourcentage.
- **Niveaux** :
  - L1 (guidé) : formule écrite avec des trous pour les trois nombres.
  - L2 : écrire le dénominateur (probabilités totales) ; le tableau de `p-bayes-freq` est affiché à côté et l'app montre que les deux donnent le même nombre.
  - L3 (choisir l'action) : formule de Bayes, probabilités totales, carré pour deux tests, a posteriori → nouvel a priori.
  - L4 (libre) : un test, puis un second test positif.
  - L5 (seul) : deux tests (problème `open` de l'examen MATH-234), avec la vérification par mise à jour successive.
- **Générateur** : mêmes paramètres que `p-bayes-freq` ; pour les deux tests, on garde les tirages où Pr(M | +, +) est une fraction de dénominateur ≤ 100. Gabarits : (a) un test ; (b) deux tests indépendants sachant l'état (exemple du plan, examen type) ; (c) test négatif, Pr(M | −) ; (d) trois machines A, B, C (50/30/20 % de la production, 1/2/5 % de défauts) : Pr(A | défaut) ; (e) pièce biaisée tirée dans un sac (examen 2020–22, ex. 14), version n = 1.
- **Corrigé type** : 1 % de malades, sensibilité 0,9, faux positifs 0,1.
  1. `Pr(M | +) = Pr(+ | M)·Pr(M)/Pr(+)` — formule
  2. `Pr(+) = 0,9 · 0,01 + 0,1 · 0,99 = 0,108` — probabilités totales
  3. `Pr(M | +) = 0,009/0,108 = 1/12` — même valeur que le tableau (9/108)
  4. `Pr(M | +, +) = 0,9² · 0,01/(0,9² · 0,01 + 0,1² · 0,99)` — deux tests indépendants sachant l'état
  5. `= 0,0081/0,018 = 9/20 = 45 %` — calculer
  6. `vérif. : 0,9 · (1/12)/(0,9 · (1/12) + 0,1 · (11/12)) = 0,45` — l'a posteriori devient l'a priori
  7. Interpréter (QCM, même liste que `p-bayes-freq`, plus « deux tests positifs : la probabilité monte au carré, (1/12)² » → `p_two_tests_square`).
- **Aides** : 1 « Numérateur : la branche “malade et positif”. Dénominateur : toutes les branches “positif”. » · 2 `Pr(M | +) = 0,009/(0,009 + …)` · 3 `Pr(M | +) = 0,009/0,108 = 1/12`.
- **Variantes d'examen** : `open` (MATH-234, 10 points : un test, puis deux) ; `coef` ; `mcq` (EE-209 ; distracteurs : `p_cond_inverse`, `p_base_rate`, `p_two_tests_square`, `p_two_tests_uncond`) ; `tf` : « Avec deux tests indépendants sachant l'état, Pr(M | +, +) = Pr(M | +)² » (faux ; contre-exemple : 1/144 contre 9/20).
- **Pièges** : `p_cond_inverse`, `p_base_rate`, `p_two_tests_square`, `p_two_tests_uncond`.
- **Sous-buts → crédit** : probabilités totales → `p-cond-total` ; formule, deux tests → `p-bayes-formula`.

### `p-indep` — Indépendance, incompatibilité, systèmes redondants
- **Année** 15 · **Prérequis** `p-cond-total` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U7). Gabarits dés (indépendants deux à deux, pas mutuellement), tableau 2 × 2 (décision appuyée sur Pr(A)·Pr(B)), systèmes série, parallèle et mixte, « au moins un 6 ». Niveau 5 : les dés, puis le nombre minimal de composants en parallèle. Gabarit (e) (pile puis face) non fait. Le V/F « deux à deux ⇒ mutuellement » n'est pas posé (pas de contre-exemple vérifiable en nombres) : `p_pairwise_mutual` est une option de décision.
- **Pourquoi ces prérequis** : `p-cond-total` : Pr(A | B) = Pr(A).
- **Intro** : A et B indépendants ⇔ Pr(A ∩ B) = Pr(A)·Pr(B) ⇔ Pr(A | B) = Pr(A). Incompatibles : Pr(A ∩ B) = 0 ; deux événements incompatibles de probabilités non nulles sont **dépendants**. Trois événements sont mutuellement indépendants si les quatre égalités tiennent. Système en série : Π pᵢ ; en parallèle : 1 − Π(1 − pᵢ). Exemple : `parallèle, 3 × 0,9 : 1 − 0,1³ = 0,999` ; `série : 0,9³ = 0,729`.
- **Juge** : décisions (« indépendants ? ») appuyées sur des lignes `prob` · **Forme finale** : décision justifiée par une égalité ou une inégalité calculée ; ou probabilité de fonctionnement exacte.
- **Niveaux** :
  - L1 (guidé) : Pr(A), Pr(B), Pr(A ∩ B) donnés, comparer Pr(A)·Pr(B).
  - L2 : calculer Pr(A ∩ B) en comptant, puis décider.
  - L3 (choisir l'action) : produit, complément, « au moins un », série, parallèle.
  - L4 (libre) : système mixte (deux en parallèle, puis en série avec un troisième).
  - L5 (seul) : deux à deux mais pas mutuellement (dés) ; puis « combien de composants en parallèle pour dépasser 0,999 ? ».
- **Générateur** : gabarits (a) deux dés et événements A, B, C (pairs/impairs, sommes) ; (b) tableau 2 × 2 de proportions, une case choisie pour rendre l'indépendance vraie ou fausse ; (c) n ∈ 2..5 composants, p ∈ {0,8 ; 0,9 ; 0,95 ; 0,99} ; (d) « au moins un 6 en k lancers » 1 − (5/6)ᵏ ; (e) pile au premier lancer et face au second (série 3, ex. 2).
- **Corrigé type** : A = « 1er dé impair », B = « 2e dé pair », C = « somme impaire » ; puis un système.
  1. `Pr(A) = Pr(B) = Pr(C) = 1/2` — probabilités marginales
  2. `Pr(A ∩ B) = 9/36 = 1/4 = Pr(A)·Pr(B)` — A, B indépendants
  3. `Pr(A ∩ C) = Pr(1er impair, 2e pair) = 1/4` — A, C indépendants
  4. `Pr(A ∩ B ∩ C) = Pr(A ∩ B) = 1/4 ≠ 1/8` — pas mutuellement indépendants
  5. `parallèle : 1 − (1 − 0,9)³ = 0,999` — système redondant
- **Aides** : 1 « Indépendants : le produit. Incompatibles : l'intersection vide. Ce n'est pas la même chose. » · 2 `Pr(A ∩ B ∩ C) = … ; Pr(A)·Pr(B)·Pr(C) = 1/8` · 3 `1/4 ≠ 1/8 : pas mutuellement indépendants`.
- **Variantes d'examen** : `coef` (fiabilité) ; `mcq` (distracteurs : `p_series_parallel`, `p_atleast_one_np` → 3 · 0,9) ; `tf` : « Deux événements incompatibles de probabilités non nulles sont indépendants » (faux ; contre-exemple : pile et face au même lancer) ; « Si A et B sont indépendants, Aᶜ et B le sont aussi » (vrai) ; « Trois événements indépendants deux à deux sont mutuellement indépendants » (faux ; contre-exemple : les dés ci-dessus).
- **Pièges** : `p_indep_disjoint`, `p_pairwise_mutual`, `p_atleast_one_np`, `p_series_parallel`, `p_indep_assumed`.
- **Sous-buts → crédit** : marginales → `p-events` ; décision, système → `p-indep`.

### `p-disc-pmf` — Variable discrète : fonction de masse, de répartition, quantile
- **Année** 15 · **Prérequis** `p-events`, `a1-ser-geo-tele` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U7). Gabarits tableau (c, F(m − 1), Pr(a ≤ X < b) avec F, médiane), c·k, géométrique (convention MATH-234 : c, Pr(X ≥ k), E[X]) et maximum de deux dés (niveau 5). F n'est pas saisie en entier dans un tableau : une valeur F(k). Non fait : c·k².
- **Pourquoi ces prérequis** : `p-events` : la somme des probabilités vaut 1.
- **Intro** : fonction de masse f(xᵢ) = Pr(X = xᵢ) ≥ 0, de somme 1. Fonction de répartition F(x) = Pr(X ≤ x), en escalier, continue à droite. Quantile : F⁻¹(α) = min{x : F(x) ≥ α}. Pr(a < X ≤ b) = F(b) − F(a) ; attention à < et ≤. Géométrique (MATH-234) : Pr(X = x) = (1 − p)ˣ·p, x = 0, 1, … ; sans mémoire. Exemple : `c = 1 − 0,8 = 0,2` ; `méd = min{x : F(x) ≥ 0,5} = 2`.
- **Juge** : `prob` (constante, probabilités, valeurs de F) ; `value` (quantile) ; F se saisit par morceaux dans un `table` · **Forme finale** : nombre exact ; F avec ses sauts.
- **Niveaux** :
  - L1 (guidé) : tableau de f avec c manquant, F à trous.
  - L2 : F complète ; Pr(a ≤ X < b) à écrire avec F.
  - L3 (choisir l'action) : normaliser, cumuler, lire un saut, inverser F.
  - L4 (libre) : loi donnée par une formule (f(k) = c·k ou géométrique).
  - L5 (seul) : max de deux dés (série 7) : loi, F, médiane ; ou géométrique : c, Pr(X > 3), absence de mémoire.
- **Générateur** : gabarits (a) tableau à 4 ou 5 valeurs, probabilités multiples de 0,05, une inconnue c ; (b) f(k) = c·k ou c·k² sur {1, …, m} (c = 1/Σk) ; (c) géométrique c(1 − p)^(i−1) sur {1, 2, …} (série 4, archer) : c = p, Pr(X > 3) = (1 − p)³ ; (d) X = max de deux dés : f(x) = (2x − 1)/36. p ∈ {1/2, 1/3, 1/4, 1/5}.
- **Corrigé type** : X ∈ {0, 1, 2, 3}, f = 0,1 ; 0,3 ; 0,4 ; c.
  1. `c = 1 − (0,1 + 0,3 + 0,4) = 0,2` — normaliser
  2. `F(0) = 0,1 ; F(1) = 0,4 ; F(2) = 0,8 ; F(3) = 1` — cumuler
  3. `Pr(1 ≤ X < 3) = F(2) − F(0) = 0,7` — lire avec F
  4. `méd = min{x : F(x) ≥ 0,5} = 2` — inverser F
- **Aides** : 1 « Une fonction de masse fait 1 au total ; F additionne les masses jusqu'à x inclus. » · 2 `Pr(1 ≤ X < 3) = F(…) − F(…)` · 3 `Pr(1 ≤ X < 3) = F(2) − F(0) = 0,7`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_cdf_strict` → F(2) − F(1) = 0,4 ou F(3) − F(0) = 0,9 ; `p_quantile_inverse` → F(0,5)) ; `tf` : « Pour X discrète, Pr(X < 2) = F(2) » (faux ; contre-exemple ci-dessus : 0,4 contre 0,8) ; « Une géométrique vérifie Pr(X > m + n | X > n) = Pr(X > m) » (vrai).
- **Pièges** : `p_cdf_strict`, `p_quantile_inverse`, `p_geom_support`.
- **Sous-buts → crédit** : normaliser, cumuler, inverser → `p-disc-pmf` ; somme géométrique → `a1-ser-geo-tele`.

### `p-binom` — Bernoulli et binomiale
- **Année** 15 · **Prérequis** `p-disc-pmf`, `g7-binomial` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U7). Une partie p (avec la décision « binomiale ? »), puis Pr(X = k) ; aux niveaux 4 et 5, E[X], var(X) et Pr(X ≤ 1) ou Pr(X ≥ 2). Non fait : la comparaison des systèmes à 5 et à 3 composants (« pour quels p ? »). Simulation : B(n, p) tirée 10 000 fois.
- **Pourquoi ces prérequis** : `p-disc-pmf` : fonction de masse et de répartition.
- **Intro** : n essais indépendants, même probabilité p de succès : X ~ B(n, p), Pr(X = k) = C(n, k)·pᵏ(1 − p)^(n−k), E[X] = np, var(X) = np(1 − p). B(1, p) = B(p). « Au moins un » : 1 − (1 − p)ⁿ. Exemple : `X ~ B(5 ; 0,6)` ; `Pr(X = 3) = C(5, 3) · 0,6³ · 0,4² = 0,3456`.
- **Juge** : `prob` si p est rationnel (exact), sinon `stat {decimals: 4}` · **Forme finale** : valeur exacte ou décimal à 4 chiffres.
- **Niveaux** :
  - L1 (guidé) : loi écrite, formule à trous.
  - L2 : décision « binomiale ? » (indépendance, même p, nombre fixé d'essais), puis la formule.
  - L3 (choisir l'action) : C(n, k), puissances, complément, somme de cas.
  - L4 (libre) : Pr(X ≤ k) ou Pr(X ≥ 2), E et var.
  - L5 (seul) : système à 5 ou 3 composants, « au moins la moitié fonctionnent » : pour quels p le système à 5 est-il meilleur (série 4) ? Réponse p > 1/2.
- **Générateur** : n ∈ 3..12, p ∈ {1/2, 1/3, 1/4, 1/5, 1/6} ou p ∈ {0,1 ; … ; 0,9}, k ∈ 0..n. Gabarits : (a) urne **avec** remise ; (b) QCM répondu au hasard ; (c) pièces défectueuses ; (d) « au moins un » ; (e) comparaison de systèmes.
- **Corrigé type** : urne de 6 rouges et 4 bleues, 5 tirages **avec** remise, exactement 3 rouges.
  1. décision `indépendants, même p = 0,6, n = 5 → X ~ B(5 ; 0,6)` — reconnaître la loi
  2. `Pr(X = 3) = C(5, 3) · 0,6³ · 0,4²` — formule
  3. `= 10 · 0,216 · 0,16 = 0,3456` — calculer
  4. `E[X] = 3 ; var(X) = 1,2` — moments
- **Aides** : 1 « C(n, k) compte les places des succès ; ne l'oublie pas. » · 2 `Pr(X = 3) = C(5, 3) · 0,6^… · 0,4^…` · 3 `Pr(X = 3) = 10 · 0,216 · 0,16`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_binom_no_coef` → 0,03456, `p_binom_swap_p` → 0,2304, `p_binom_without_replacement` → hypergéométrique) ; `tf` : « Si X ~ B(n, p), var(X) ≤ E[X] » (vrai) ; « Le nombre de rouges en 3 tirages sans remise est binomial » (faux ; contre-exemple : urne de 5 boules dont 2 rouges, Pr(3 rouges) = 0 alors que B(3 ; 2/5) donne (2/5)³ ≠ 0).
- **Pièges** : `p_binom_no_coef`, `p_binom_swap_p`, `p_binom_without_replacement`, `p_atleast_one_np`.
- **Sous-buts → crédit** : C(n, k) → `g7-binomial` ; reconnaître, formule → `p-binom`.

### `p-poisson` — Loi de Poisson, lien avec la binomiale
- **Année** 15 · **Prérequis** `p-binom` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U7). Gabarits taux × durée, approximation de la binomiale (λ = np, avec la décision Poisson ou normale), deux sources indépendantes ; Pr(X = k) ou Pr(X ≤ k) par `stat` à 0,001. Non faits : les anniversaires (λ = 247/365) et la comparaison avec la valeur binomiale exacte (L5).
- **Intro** : X ~ Poiss(λ) : Pr(X = k) = λᵏe^(−λ)/k!, E = var = λ. Si X₁ ~ Poiss(λ₁) et X₂ ~ Poiss(λ₂) sont indépendantes, X₁ + X₂ ~ Poiss(λ₁ + λ₂). Le taux suit la durée (λ par heure → 3λ en 3 h). Loi des petits nombres : n grand et p petit ⇒ B(n, p) ≈ Poiss(np). Exemple : `B(200 ; 0,01) ≈ Poiss(2)` ; `Pr(X ≤ 1) = 3e^(−2) ≈ 0,406`.
- **Juge** : `stat {decimals: 3}` ; une expression exacte (`3e^(-2)`) est acceptée par `equiv` numérique · **Forme finale** : décimal à 3 chiffres.
- **Niveaux** :
  - L1 (guidé) : λ donné ; formule à trous.
  - L2 : décision « quelle loi ? » ; λ = np à calculer.
  - L3 (choisir l'action) : changer d'échelle de temps, additionner les taux, approximer, sommer des cas.
  - L4 (libre) : Pr(X ≥ 2) par le complément.
  - L5 (seul) : comparer l'approximation à la valeur binomiale exacte (calculatrice intégrée), et dire quand elle est bonne.
- **Générateur** : λ ∈ {0,5 ; 1 ; 1,5 ; 2 ; 3 ; 4}, k ≤ 4 ; approximation : n ∈ {100, 200, 247, 500, 800}, p = λ/n ; durées 1/2 à 4 fois l'unité. Gabarits : (a) appels par heure, question sur une autre durée ; (b) 800 voitures × 0,02 au feu rouge (série 6) ; (c) anniversaires du jour parmi 247 personnes, p = 1/365 ; (d) deux sources indépendantes.
- **Corrigé type** : X ~ B(200 ; 0,01), calculer Pr(X ≤ 1).
  1. décision `n = 200 grand, p = 0,01 petit → X ≈ Poiss(2)` — approximer
  2. `Pr(X ≤ 1) = e^(−2) + 2e^(−2) = 3e^(−2)` — sommer deux cas
  3. `≈ 0,406` (valeur exacte binomiale : 0,405) — calculer
- **Aides** : 1 « λ = n·p ; puis la formule de Poisson pour k = 0 et k = 1. » · 2 `Pr(X ≤ 1) = e^(−2) + …` · 3 `Pr(X ≤ 1) = 3e^(−2)`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_poisson_rate_scale`, `p_poisson_no_factorial`) ; `tf` : « Si X ~ Poiss(2) et Y ~ Poiss(3) sont indépendantes, X + Y ~ Poiss(5) » (vrai) ; « X − Y suit aussi une loi de Poisson » (faux ; contre-exemple : Pr(X − Y < 0) > 0).
- **Pièges** : `p_poisson_rate_scale`, `p_poisson_no_factorial`, `p_poisson_approx_bad`.
- **Sous-buts → crédit** : λ = np → `p-binom` ; formule, somme → `p-poisson`.

### `p-hypergeom` — Loi hypergéométrique
- **Année** 15 · **Prérequis** `p-count`, `p-binom`, `p-cond-total` · **Étiquettes** `opt` · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U7). Gabarits urne et lot ; Pr(X = k), puis Pr(X ≥ 1) (niveau 4) et Pr(X = k | X ≥ 1) (niveau 5). La comparaison avec la binomiale (gabarit c) n'est qu'un distracteur (`p_binom_without_replacement`).
- **Pourquoi ces prérequis** : `p-binom` : approximation B(n, K/N) quand N est grand.
- **Intro** : N objets dont K marqués ; on en tire n **sans** remise : Pr(X = k) = C(K, k)·C(N − K, n − k)/C(N, n), E[X] = nK/N. Si N est grand devant n, X ≈ B(n, K/N). Exemple : `6 rouges, 4 bleues, 3 tirées` ; `Pr(X = 2) = C(6, 2) · C(4, 1)/C(10, 3) = 60/120 = 1/2`.
- **Juge** : `prob` · **Forme finale** : fraction irréductible.
- **Niveaux** : L1 formule à trous ; L2 décision « avec ou sans remise ? » ; L3 actions (compter les marqués, le reste, Ω, conditionner) ; L4 libre ; L5 (examen 2013) « 2 rouges sachant au moins une rouge ».
- **Générateur** : N ∈ 8..20, K ∈ 2..N−2, n ∈ 2..5. Gabarits : (a) urne ; (b) lot avec défauts ; (c) comparaison avec la binomiale de même p.
- **Corrigé type** : urne de 6 rouges et 4 bleues, 3 boules sans remise.
  1. `Pr(X = 2) = C(6, 2) · C(4, 1)/C(10, 3) = 60/120 = 1/2` — formule
  2. `Pr(X ≥ 1) = 1 − C(4, 3)/C(10, 3) = 29/30` — complément
  3. `Pr(X = 2 | X ≥ 1) = (1/2)/(29/30) = 15/29` — conditionner
- **Aides** : 1 « Sans remise : on compte, on ne multiplie pas des p. » · 2 `Pr(X = 2) = C(6, 2) · C(4, …)/C(10, 3)` · 3 `= 1/2`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_binom_without_replacement` → C(3, 2) · 0,6² · 0,4 = 0,432, `p_count_forget_rest`).
- **Pièges** : `p_binom_without_replacement`, `p_count_forget_rest`.
- **Sous-buts → crédit** : compter → `p-count` ; conditionner → `p-cond-total`.

### `p-cont-density` — Densité : normaliser, F ↔ f, probabilités
- **Année** 15 · **Prérequis** `a1-int-direct`, `a1-improper-calc` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : une densité vérifie f ≥ 0 et ∫ f = 1 **sur le support**. Pr(a < X ≤ b) = ∫ₐᵇ f = F(b) − F(a), F′ = f, et Pr(X = a) = 0. Une densité peut dépasser 1. Exemple : f(x) = c·x⁻⁴ pour x ≥ 1 : `c·[−x⁻³/3]₁^∞ = c/3 = 1` (note : donc c = 3) ; `F(x) = 1 − x⁻³ pour x ≥ 1`.
- **Juge** : `prob` pour c et les probabilités (exactes) ; `equiv` `{vars: ['x'], domain: {x: support}}` pour F et f, avec un contrôle des morceaux (F = 0 avant le support, 1 après) ; `stat {decimals: 3}` si c contient π ou e · **Forme finale** : c exact ; F définie sur tout ℝ (par morceaux) ; probabilité exacte.
- **Niveaux** :
  - L1 (guidé) : intégrale écrite avec ses bornes, primitive à trous.
  - L2 : bornes du support à choisir (menu) ; puis primitive.
  - L3 (choisir l'action) : poser ∫ = 1, primitiver, évaluer aux bornes, dériver F, conditionner.
  - L4 (libre) : c puis une probabilité.
  - L5 (seul) : c, F sur tout ℝ, Pr(1 < X ≤ 2) et Pr(X > 2 | X < 3) (série 5, ex. 3).
- **Générateur** : noyaux à intégrale rationnelle : c·xᵏ sur [0 ; a] (k ∈ 1..4, a ∈ {1, 2, 3}), c·x(a − x) sur [0 ; a], c·x^(−α−1) sur [1 ; ∞[ (α ∈ 2..5), c·e^(−λx) sur [0 ; ∞[ (λ ∈ {1/2, 1, 2, 3}), c/(1 + x²) sur ℝ (Cauchy, c = 1/π, `stat`) ; F donnée à dériver : 1 − x⁻³ sur [1 ; ∞[, 1/(1 + e^(−x)) (logistique). Gabarits : (a) trouver c, puis une probabilité ; (b) F donnée, trouver f (sur tout ℝ) ; (c) probabilité conditionnelle.
- **Corrigé type** : f(x) = c·x⁻⁴ pour x ≥ 1, 0 sinon.
  1. `∫₁^∞ c·x⁻⁴ dx = 1` — normaliser sur le support
  2. `c·[−x⁻³/3]₁^∞ = c/3` — primitiver et évaluer
  3. `c = 3` — résoudre
  4. `F(x) = 1 − x⁻³ si x ≥ 1, 0 sinon` — fonction de répartition
  5. `Pr(1 < X ≤ 2) = F(2) − F(1) = 7/8` — probabilité
  6. `Pr(X > 2 | X < 3) = (F(3) − F(2))/F(3) = (1/8 − 1/27)/(26/27) = 19/208` — conditionner
- **Aides** : 1 « L'intégrale de f sur le support vaut 1 ; le support commence à 1. » · 2 `c·[−x⁻³/3]₁^∞ = c·(0 − (−…))` · 3 `c/3 = 1, donc c = 3`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_normalize_bounds` → intégrale sur [0 ; ∞[ ou [0 ; 1], `p_density_is_prob` → Pr(X = 2) = f(2) = 3/16) ; `tf` : « Une densité ne dépasse jamais 1 » (faux ; contre-exemple : U(0 ; 1/2), f = 2) ; « Pour X continue, Pr(X ≤ a) = Pr(X < a) » (vrai).
- **Pièges** : `p_normalize_bounds`, `p_density_is_prob`, `p_cdf_piecewise`, `p_cond_denominator`.
- **Sous-buts → crédit** : primitiver → `a1-int-direct` ; borne infinie → `a1-improper-calc` ; normaliser, F, probabilité → `p-cont-density`.

### `p-cont-quantile` — Quantile d'une loi continue
- **Année** 15 · **Prérequis** `p-cont-density` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : le quantile d'ordre α est la solution q de F(q) = α (F inversible). Médiane : α = 1/2 ; quartile supérieur : α = 3/4. On résout sur **F**, pas sur f. Exemple : f(x) = 3x² sur [0 ; 1] : `F(x) = x³` ; `q₀,₇₅ = (3/4)^(1/3) ≈ 0,909`.
- **Juge** : `equiv` pour F ; `stat {decimals: 3}` pour q, une forme exacte (`(3/4)^(1/3)`) étant acceptée · **Forme finale** : q exact ou à 0,001 près.
- **Niveaux** :
  - L1 (guidé) : F donnée, équation F(q) = α à résoudre, à trous.
  - L2 : F à calculer (primitive avec la bonne borne inférieure), puis résoudre.
  - L3 (choisir l'action) : intégrer f, poser F(q) = α, isoler q.
  - L4 (libre) : un quantile.
  - L5 (seul) : densité à normaliser d'abord (EE-209 2023, Q3 : c·x sur [0 ; 2] → médiane √2), ou F de Rayleigh puis médiane θ√(2 ln 2) (examen 2020–22, ex. 13).
- **Générateur** : F à inverse explicite : xᵏ sur [0 ; 1] (k ∈ 2..4), x²/a² sur [0 ; a], 1 − x^(−α) sur [1 ; ∞[, 1 − e^(−λx), 1 − e^(−x²/(2θ²)), uniforme ; α ∈ {1/4, 1/2, 3/4, 0,9, 0,95}. Gabarits : (a) médiane ; (b) quartile supérieur ; (c) « durée de vie dépassée par 10 % des produits ».
- **Corrigé type** : f(x) = 3x² sur [0 ; 1], quartile supérieur.
  1. `F(x) = ∫₀ˣ 3u² du = x³` — fonction de répartition
  2. `F(q) = 3/4` — équation du quantile
  3. `q = (3/4)^(1/3) ≈ 0,909` — isoler
- **Aides** : 1 « Un quantile se lit sur F : F(q) = α. » · 2 `q³ = …` · 3 `q = (3/4)^(1/3)`.
- **Variantes d'examen** : `coef` (MATH-234, 5 points) ; `mcq` (EE-209 Q3, c·x sur [0 ; 2] ; distracteurs : `p_quantile_from_pdf` → f(q) = 1/2 donne q = 1, `p_median_mean` → 4/3, `p_quantile_inverse` → F(1/2) = 1/16) ; `tf` : « La médiane d'une loi continue est égale à son espérance » (faux ; contre-exemple f = 2x sur [0 ; 1] : médiane 1/√2 ≈ 0,707, E = 2/3).
- **Pièges** : `p_quantile_from_pdf`, `p_quantile_inverse`, `p_median_mean`.
- **Sous-buts → crédit** : F → `p-cont-density` ; résoudre → `p-cont-quantile`.

### `p-unif-exp` — Uniforme et exponentielle, absence de mémoire
- **Année** 15 · **Prérequis** `p-cont-density`, `p-cond-total` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-cont-density` : F ↔ f et probabilités par intégrales.
- **Intro** : U(a, b) : f = 1/(b − a), F(x) = (x − a)/(b − a), E = (a + b)/2, var = (b − a)²/12. exp(λ) : f = λe^(−λx), F = 1 − e^(−λx), **E = 1/λ**, var = 1/λ² (λ est un taux, à l'inverse de Poisson). Sans mémoire : Pr(X > s + t | X > s) = Pr(X > t). Exemple : moyenne 10 ans, `λ = 1/10` ; `Pr(X > 12 | X > 2) = Pr(X > 10) = e^(−1) ≈ 0,368`.
- **Juge** : `stat {decimals: 3}` ; forme exacte acceptée par `equiv` · **Forme finale** : valeur à 0,001 près.
- **Niveaux** :
  - L1 (guidé) : loi et paramètre donnés, formule de F à trous.
  - L2 : décision « λ = 1/moyenne » ; puis F.
  - L3 (choisir l'action) : F, complément, absence de mémoire, quantile.
  - L4 (libre) : une question sur une loi décrite en mots.
  - L5 (seul) : série 5, ex. 4 : Pr(X > 10), puis la même sachant 2 ans écoulés, puis l'interprétation (QCM « étonnant ? »).
- **Générateur** : uniforme : a, b entiers, 0 ≤ a < b ≤ 60 ; exponentielle : moyenne m ∈ {2, 5, 10, 20} ou taux λ ∈ {1/2, 1, 2, 3} ; seuils multiples de m/2. Gabarits : (a) attente uniforme (coiffeur U(0 ; 30) : Pr(> 25) = 1/6) ; (b) durée de vie exponentielle ; (c) absence de mémoire ; (d) médiane ln 2/λ ; (e) premier appel quand les appels suivent Poiss(λ) par heure.
- **Corrigé type** : durée de vie X d'une télévision, exponentielle de moyenne 10 ans.
  1. `λ = 1/10` — taux = 1/moyenne
  2. `Pr(X > 10) = e^(−10/10) = e^(−1) ≈ 0,368` — queue
  3. `Pr(X > 12 | X > 2) = Pr(X > 12)/Pr(X > 2) = e^(−1,2)/e^(−0,2)` — conditionner
  4. `= e^(−1) ≈ 0,368` — absence de mémoire
- **Aides** : 1 « Pour l'exponentielle, Pr(X > x) = e^(−λx) et λ = 1/moyenne. » · 2 `Pr(X > 12 | X > 2) = e^(−…)/e^(−…)` · 3 `= e^(−1)`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_exp_rate_mean` → e^(−100), `p_memoryless_ignored` → e^(−1,2) ≈ 0,301, `p_unif_var` → (b − a)/12) ; `tf` : « Une télévision qui a déjà 2 ans a moins de chances de durer encore 10 ans qu'une neuve » (faux pour une durée exponentielle).
- **Pièges** : `p_exp_rate_mean`, `p_memoryless_ignored`, `p_unif_var`.
- **Sous-buts → crédit** : conditionner → `p-cond-total` ; F, queue → `p-unif-exp`.

### `p-moments` — Espérance et variance d'une loi
- **Année** 15 · **Prérequis** `p-disc-pmf`, `p-cont-density` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-disc-pmf` : E[X] = Σ x·f(x) ; `p-cont-density` : E[X] = ∫ x·f(x) dx.
- **Intro** : E[X] = Σ x·f(x) ou ∫ x·f(x) dx ; E[g(X)] = ∫ g(x)·f(x) dx, qui n'est pas g(E[X]) ; var(X) = E[X²] − E[X]² ≥ 0. L'espérance existe seulement si l'intégrale converge (Cauchy : non ; Pareto α ≤ 1 : non). Exemple : f(y) = 5y⁴ sur ]0 ; 1[ : `E[Y] = 5/6` ; `E[Y²] = 5/7` ; `var(Y) = 5/7 − 25/36 = 5/252`.
- **Juge** : `prob` (exact) ; `equiv` si la réponse dépend d'un paramètre (`vars: ['λ']`, domaine du paramètre) · **Forme finale** : fraction irréductible ou expression simplifiée du paramètre.
- **Niveaux** :
  - L1 (guidé) : intégrales écrites, primitives à trous.
  - L2 : E[X²] à écrire ; décision « formule de König-Huygens ».
  - L3 (choisir l'action) : E[X], E[X²], var, existence.
  - L4 (libre) : E et var d'une loi donnée.
  - L5 (seul) : E[e^X] et var(e^X) pour X ~ exp(λ) avec la condition λ > 2 (série 7, ex. 2), ou E[X(X − 1)] pour Poisson, puis var.
- **Générateur** : densités (k + 1)xᵏ sur [0 ; 1] (k ∈ 1..5) ; tableaux discrets à 3–5 valeurs ; Pareto α·x^(−α−1) (α ∈ 2..5, E = α/(α − 1)) ; F donnée (1 − 1/w⁴) ; exponentielle avec g(x) = e^(tx). Gabarits : (a) discrète ; (b) continue ; (c) existence selon un paramètre (Pareto, Cauchy, série 8, ex. 5).
- **Corrigé type** : f(y) = 5y⁴ sur ]0 ; 1[.
  1. `E[Y] = ∫₀¹ 5y⁵ dy = 5/6` — espérance
  2. `E[Y²] = ∫₀¹ 5y⁶ dy = 5/7` — second moment
  3. `var(Y) = 5/7 − (5/6)² = 5/252` — König-Huygens
- **Aides** : 1 « var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx. » · 2 `var(Y) = 5/7 − (…)²` · 3 `var(Y) = 5/252`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_var_minus_mean` → 5/7 − 5/6 < 0, `p_g_of_mean`) ; `tf` : « E[1/X] = 1/E[X] » (faux ; contre-exemple X uniforme sur {1, 2} : 3/4 contre 2/3) ; « Toute densité a une espérance » (faux ; contre-exemple Cauchy).
- **Pièges** : `p_var_minus_mean`, `p_g_of_mean`, `p_mean_not_exist`.
- **Sous-buts → crédit** : intégrales → `a1-int-direct` ; moments → `p-moments`.

### `p-family` — Reconnaître Gamma, Beta, Weibull, Pareto, χ²
- **Année** 15 · **Prérequis** `p-unif-exp`, `p-moments` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-unif-exp` : l'exponentielle est la loi Γ(1, θ).
- **Intro** : on lit le **noyau** (la partie qui dépend de x) pour reconnaître la loi et éviter un calcul. x^(k−1)e^(−x/θ) → Γ(k, θ), constante 1/(Γ(k)θᵏ), E = kθ, var = kθ², Γ(n) = (n − 1)!. x^(α−1)(1 − x)^(β−1) sur [0 ; 1] → Beta(α, β), constante Γ(α + β)/(Γ(α)Γ(β)), E = α/(α + β). k·t^(k−1)e^(−tᵏ) → Weibull, F = 1 − e^(−tᵏ). α·x^(−α−1) sur ]1 ; ∞[ → Pareto, F = 1 − x^(−α). χ²(r) = Γ(r/2, 2). Somme de n exp(λ) indépendantes : Γ(n, 1/λ). Exemple : `f ∝ y²e^(−y/θ)` (note : k − 1 = 2) ; `Y ~ Γ(3, θ), E[Y] = 3θ, var(Y) = 3θ²`.
- **Juge** : décision (famille, puis paramètres dans un menu ou tapés) ; `equiv` `{vars: ['θ'], domain: {θ: [0.5, 5]}}` pour E, var et constante · **Forme finale** : loi nommée avec ses paramètres, puis E et var.
- **Niveaux** :
  - L1 (guidé) : famille donnée, paramètres à lire.
  - L2 : famille à choisir parmi 4, paramètres à lire.
  - L3 (choisir l'action) : lire l'exposant, lire l'échelle, vérifier la constante, appliquer E = kθ.
  - L4 (libre) : E et var d'une densité donnée.
  - L5 (seul) : examen 2020–22, ex. 5 : E et var, puis l'app montre le calcul par trois intégrations par parties à côté, et demande laquelle était la plus rapide.
- **Générateur** : Gamma k ∈ 2..5, θ symbolique ou θ ∈ {1/2, 1, 2, 3} ; Beta α, β ∈ 1..5 (constante entière : 12 pour Beta(3, 2)) ; Pareto α ∈ 2..5 ; Weibull k ∈ 1..3 ; χ²(r), r ∈ 1..10. Gabarits : (a) E et var d'un noyau Gamma ; (b) constante d'une Beta ; (c) loi d'une somme d'exponentielles ; (d) F donnée (Weibull, Pareto) : nommer la loi ; (e) QCM « quelle loi ? » à 4 densités.
- **Corrigé type** : f(y) = y²e^(−y/θ)/(2θ³) pour y ≥ 0 (examen 2020–22, ex. 5).
  1. `noyau y^(3−1)·e^(−y/θ) → Y ~ Γ(3, θ)` — reconnaître
  2. `Γ(3)·θ³ = 2θ³` — la constante est bien la bonne
  3. `E[Y] = kθ = 3θ` — espérance
  4. `var(Y) = kθ² = 3θ²` — variance
- **Aides** : 1 « Repère la puissance de y et ce qui divise y dans l'exponentielle. » · 2 `Y ~ Γ(…, θ)` · 3 `Y ~ Γ(3, θ)`.
- **Variantes d'examen** : `open` et `coef` (MATH-234, 10 points) ; `mcq` (distracteurs : `p_gamma_scale_rate` → E = 3/θ, `p_gamma_shape_off` → Γ(2, θ), `p_beta_shape_off`) ; `tf` : « χ²(2) est une loi exponentielle » (vrai : exp(1/2)) ; « La somme de deux exp(λ) indépendantes est exp(2λ) » (faux ; contre-exemple : Pr(X₁ + X₂ ≤ x) ≈ λ²x²/2 près de 0, alors qu'une exponentielle donne ≈ 2λx).
- **Pièges** : `p_gamma_scale_rate`, `p_gamma_shape_off`, `p_beta_shape_off`.
- **Sous-buts → crédit** : reconnaître → `p-family` ; E, var → `p-moments`.

### `p-normal-std` — Loi normale : standardiser, table de Φ
- **Année** 15 · **Prérequis** `p-cont-density` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-cont-density` : Pr(X ≤ x) = F(x).
- **Intro** : X ~ N(μ, σ²) ⇒ Z = (X − μ)/σ ~ N(0, 1), donc Pr(X ≤ x) = Φ((x − μ)/σ). Le 2ᵉ paramètre est la **variance**. Φ(−z) = 1 − Φ(z) ; Pr(X > x) = 1 − Φ(·). aX + b est normale ; une somme de normales indépendantes est normale. Exemple : N(100, 15²) : `z = (130 − 100)/15 = 2` ; `Pr(X > 130) = 1 − Φ(2) = 1 − 0,977 = 0,023`.
- **Juge** : lignes étiquetées `z = …` (`stat {decimals: 3}`), `Φ(…) = …` (lecture de table, convention 3), probabilité (`stat {decimals: 3}`) · **Forme finale** : probabilité à 0,001 près.
- **Niveaux** :
  - L1 (guidé) : z donné ; lecture de table à trous ; complément à trous.
  - L2 : z à calculer ; décision « queue gauche ou droite ? ».
  - L3 (choisir l'action) : standardiser, lire Φ, complément, symétrie, différence.
  - L4 (libre) : Pr(a < X < b).
  - L5 (seul) : conditionnelle Pr(X > 192 | X > 180) (série 6, ex. 4) ou Pr(X − Y > 0) pour deux normales indépendantes.
- **Générateur** : on tire z sur la grille de 0,025 dans [−3 ; 3], σ ∈ {2, 4, 5, 8, 10, 15, 20, 25}, μ entier ; x = μ + zσ doit être entier ou à une décimale (sinon on retire). Aux niveaux 4 et 5, z quelconque (convention 3). Gabarits : (a) Pr(X > x) ; (b) Pr(a < X < b) ; (c) conditionnelle ; (d) différence de deux normales ; (e) énoncé avec la variance (N(176,6 ; 63,84)) pour exercer σ = √63,84 ≈ 7,99.
- **Corrigé type** : QI ~ N(100, 15²), Pr(85 < X < 130).
  1. `z₁ = (85 − 100)/15 = −1 ; z₂ = (130 − 100)/15 = 2` — standardiser
  2. `Pr = Φ(2) − Φ(−1) = Φ(2) − (1 − Φ(1))` — symétrie
  3. `Φ(2) = 0,977 ; Φ(1) = 0,841` — lire la table
  4. `Pr = 0,977 − 0,159 = 0,818` — calculer
- **Aides** : 1 « Ramène-toi à Z, puis Φ(−z) = 1 − Φ(z). » · 2 `Pr = Φ(2) − (1 − Φ(…))` · 3 `Pr = 0,977 − 0,159`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_standardize_var` → z = 30/225, `p_phi_negative` → Φ(−1) = −0,841 ou 0,841, `p_upper_tail` → Φ(2) = 0,977, `p_normal_sigma2`) ; `tf` : « Si X ~ N(0, 1), Pr(|X| < 1,96) ≈ 0,95 » (vrai) ; « Si X ~ N(0, 4), Pr(X > 2) = 1 − Φ(2) » (faux ; σ = 2, donc 1 − Φ(1)).
- **Pièges** : `p_standardize_var`, `p_phi_negative`, `p_upper_tail`, `p_normal_sigma2`.
- **Sous-buts → crédit** : standardiser, lire Φ → `p-normal-std`.

### `p-normal-inverse` — Quantiles normaux, retrouver μ ou σ
- **Année** 15 · **Prérequis** `p-normal-std` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : on lit la table à l'envers : Pr(X > c) = 0,1 ⇒ (c − μ)/σ = Φ⁻¹(0,9) = 1,28 (Table 2). Quantile d'ordre α de N(μ, σ²) : μ + σ·Φ⁻¹(α). Intervalle symétrique de probabilité 0,5 : ±Φ⁻¹(0,75) = ±0,67. Exemple : `Φ(5/σ) = 0,9` ; `5/σ = 1,28, σ ≈ 3,9`.
- **Juge** : lignes étiquetées ; `Φ⁻¹(…) = …` lecture de table (valeur imprimée, ou exacte ± 0,005) ; résultat `stat {decimals: 1 ou 2}` · **Forme finale** : paramètre ou seuil à la précision demandée.
- **Niveaux** :
  - L1 (guidé) : équation Φ(5/σ) = 0,9 écrite ; lecture à trous.
  - L2 : passer de Pr(X > c) = 0,1 à Φ(·) = 0,9.
  - L3 (choisir l'action) : complément, lire Φ⁻¹, isoler σ (ou μ).
  - L4 (libre) : seuil des 5 % les plus hauts.
  - L5 (seul) : examen 2020–22, ex. 12.1 : σ, puis Pr(X > 95) avec ce σ.
- **Générateur** : probabilités de la Table 2 (0,5 à 0,99) ; on fixe z = Φ⁻¹(p), puis σ ∈ {2, 4, 5, 10} et c = μ + zσ arrondi ; questions : σ, μ, seuil. Gabarits : (a) trouver σ ; (b) trouver μ (« 2 % des paquets pèsent moins de 495 g ») ; (c) seuil ; (d) intervalle central de probabilité donnée.
- **Corrigé type** : lancer de javelot ~ N(84, σ²), Pr(X > 89) = 0,1.
  1. `Pr(Z > 5/σ) = 0,1 ⇒ Φ(5/σ) = 0,9` — complément
  2. `5/σ = Φ⁻¹(0,9) = 1,28` — lire la Table 2
  3. `σ = 5/1,28 ≈ 3,9` — isoler
  4. `Pr(X > 95) = 1 − Φ(11/3,9) = 1 − Φ(2,82) ≈ 0,002` — réutiliser σ (Φ(2,800) et Φ(2,825) acceptés)
- **Aides** : 1 « 10 % au-dessus, c'est 90 % en dessous : cherche 0,9 dans la Table 2. » · 2 `5/σ = 1,28, donc σ = …` · 3 `σ = 3,9`.
- **Variantes d'examen** : `open` (MATH-234, partie de l'ex. 12) ; `coef` ; `mcq` (distracteurs : `p_phi_inverse_side` → 5/σ = −1,28, `p_quantile_inverse` → Φ(0,9) = 0,816 lu comme quantile) ; `tf` : « Le quantile à 97,5 % de N(0, 1) vaut 1,96 » (vrai).
- **Pièges** : `p_phi_inverse_side`, `p_quantile_inverse`, `p_upper_tail`.
- **Sous-buts → crédit** : complément, standardiser → `p-normal-std` ; Φ⁻¹, isoler → `p-normal-inverse` ; isoler σ → `@alg:F-isoler`.

### `p-transform` — Loi de Y = g(X) ; échantillonnage par F⁻¹
- **Année** 15 · **Prérequis** `p-cont-density`, `a1-deriv-inverse`, `a2-change-var`, `p-family` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-cont-density` : densité f_X et son support.
- **Intro** : si g est strictement monotone sur le support, f_Y(y) = f_X(g⁻¹(y))·|dg⁻¹/dy| sur g(support), 0 ailleurs. Autre voie : F_Y(y) = Pr(g(X) ≤ y), puis dériver. Cas particuliers : Y = aX ⇒ f_Y(y) = f_X(y/a)/|a| ; Z ~ N(0, 1) ⇒ Z² ~ χ²(1) ; U ~ U(0, 1) ⇒ F⁻¹(U) ~ F (échantillonnage). Exemple : X = −ln(U)/λ : `g⁻¹(x) = e^(−λx)` ; `f_X(x) = 1·|−λe^(−λx)| = λe^(−λx)` (note : exp(λ)).
- **Juge** : décision (support de Y, méthode) ; `equiv` `{vars: ['y'], domain: {y: support de Y}}` pour g⁻¹, sa dérivée et f_Y ; une ligne « f_Y(y) = … » est contrôlée aussi en dehors du support (doit valoir 0) · **Forme finale** : f_Y simplifiée avec son support ; loi nommée si c'en est une.
- **Niveaux** :
  - L1 (guidé) : g⁻¹ donnée, dérivée et formule à trous.
  - L2 : support de Y à choisir ; méthode (formule ou F) à choisir.
  - L3 (choisir l'action) : inverser g, dériver g⁻¹, valeur absolue, composer, reconnaître.
  - L4 (libre) : f_Y.
  - L5 (seul) : examen 2020–22, ex. 13.3 : Z = 2X²/θ² pour X de Rayleigh, montrer Z ~ χ²(2), par les deux méthodes.
- **Générateur** : gabarits (a) X = −ln(U)/λ, λ ∈ {1/2, 1, 2, 3} (examen, ex. 8) ; (b) Rayleigh → χ²(2) ; (c) Y = X² avec X ~ U(0, 1) → 1/(2√y) ; (d) Y = aX + b avec X exponentielle ; (e) échantillonnage : F donnée (Pareto, Weibull, exponentielle), trouver F⁻¹(u) (EE-209) ; (f) Y = e^X avec X normale (log-normale, examen, ex. 17) ; (g) niveau 5 seulement : changement de variables à deux dimensions, f_Y(y) = f_X(g⁻¹(y))·|det J_{g⁻¹}(y)| (standardiser une normale bivariée, série 6, ex. 3 ; ou (X, Y) → (X + Y, X − Y)).
- **Corrigé type** : U ~ U(0, 1), X = −ln(U)/λ avec λ > 0.
  1. `support : u ∈ ]0 ; 1[ → x ∈ ]0 ; +∞[` — image du support
  2. `g⁻¹(x) = e^(−λx)` — inverser
  3. `dg⁻¹/dx = −λe^(−λx)` — dériver
  4. `f_X(x) = f_U(e^(−λx))·|−λe^(−λx)| = λe^(−λx) pour x > 0` — formule
  5. `X ~ exp(λ)` — reconnaître
- **Aides** : 1 « Inverse g, dérive l'inverse, prends la valeur absolue. » · 2 `f_X(x) = 1 · |…|` · 3 `f_X(x) = λe^(−λx)`.
- **Variantes d'examen** : `open` (MATH-234 : ex. 8, 10 points ; ex. 13.3) ; `coef` (densité en un point) ; `mcq` (distracteurs : `p_transform_jacobian` → f = 1, `p_transform_abs` → −λe^(−λx), `p_transform_support` → support ]0 ; 1[) ; `tf` (EE-209) : « Si Z ~ N(0, 1), Z² ~ χ²(1) » (vrai) ; « Si Y = 2X, alors f_Y(y) = 2f_X(y) » (faux ; contre-exemple X ~ U(0, 1) : 2f_X intègre à 4 sur [0 ; 2]).
- **Pièges** : `p_transform_jacobian`, `p_transform_abs`, `p_transform_support`, `p_scale_density`.
- **Sous-buts → crédit** : dériver g⁻¹ → `a1-deriv-inverse` ; jacobien (gabarit g) → `a2-change-var` ; reconnaître → `p-family` ; formule → `p-transform`.

### `p-joint-disc` — Loi conjointe discrète
- **Année** 15 · **Prérequis** `p-disc-pmf`, `p-indep` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-disc-pmf` : les marginales sont des fonctions de masse ; `p-indep` : indépendance vérifiée case par case.
- **Intro** : un tableau p(x, y). Marginales : sommes des lignes et des colonnes. Conditionnelle : p(x | y) = p(x, y)/p_Y(y). Indépendance : p(x, y) = p_X(x)·p_Y(y) **pour toutes** les cases (une case fausse suffit pour dire non). cov(X, Y) = E[XY] − E[X]E[Y]. Exemple : `p(0, 0) = 0,1 ≠ 0,4 · 0,3` (note : dépendants) ; `cov = 0,6 − 0,6 · 1 = 0` (note : non corrélés quand même).
- **Juge** : `prob` ; tableau des marginales en `table` ; décision « indépendants ? » appuyée sur une case · **Forme finale** : marginales, décision justifiée, conditionnelle ou covariance demandée.
- **Niveaux** :
  - L1 (guidé) : marginales à trous.
  - L2 : marginales ; décision avec une case à citer.
  - L3 (choisir l'action) : sommer une ligne, une colonne, diviser par une marginale, comparer au produit, E[XY].
  - L4 (libre) : tout le tableau.
  - L5 (seul) : max de deux dés et nombre de 5 ou 6 (série 7, ex. 4) : loi conjointe à construire, indépendance, X | Y = 1, cov.
- **Générateur** : tableaux 2 × 2, 2 × 3, 3 × 3, cases multiples de 0,05 ou de 1/36. Construction : produit de marginales (indépendant), puis perturbation ±δ sur un bloc 2 × 2 (dépendant). Un gabarit sur quatre est « dépendant mais non corrélé » (cov = 0).
- **Corrigé type** : X ∈ {0, 1}, Y ∈ {0, 1, 2} ; ligne X = 0 : 0,1 ; 0,2 ; 0,1 ; ligne X = 1 : 0,2 ; 0,2 ; 0,2.
  1. `p_X = (0,4 ; 0,6) ; p_Y = (0,3 ; 0,4 ; 0,3)` — marginales
  2. `p(0, 0) = 0,1 ≠ 0,4 · 0,3 = 0,12` — dépendants
  3. `Pr(X = 1 | Y = 1) = 0,2/0,4 = 1/2` — conditionnelle
  4. `E[X] = 0,6 ; E[Y] = 1 ; E[XY] = 0,2 · 1 + 0,2 · 2 = 0,6` — moments
  5. `cov(X, Y) = 0,6 − 0,6 · 1 = 0` — non corrélés, mais dépendants
- **Aides** : 1 « Une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. » · 2 `p(0, 0) = 0,1 ; p_X(0)·p_Y(0) = …` · 3 `0,1 ≠ 0,12 : dépendants`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_marginal_wrong_axis`, `p_cond_denominator`) ; `tf` : « cov(X, Y) = 0 ⇒ X et Y indépendants » (faux ; contre-exemple : le tableau ci-dessus).
- **Pièges** : `p_cov_zero_indep`, `p_marginal_wrong_axis`, `p_cond_denominator`.
- **Sous-buts → crédit** : marginales, conditionnelle → `p-joint-disc` ; covariance → `p-cov-corr`.

### `p-joint-cont` — Densité conjointe : constante, marginales, indépendance
- **Année** 15 · **Prérequis** `p-cont-density`, `a2-fubini-rect`, `a2-domain-describe`, `a2-improper-multi` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-cont-density` : chaque marginale est une densité.
- **Intro** : ∬ f = 1 sur le support ; marginale f_X(x) = ∫ f(x, y) dy, avec des bornes qui peuvent dépendre de x ; indépendance ⇔ f(x, y) = f_X(x)·f_Y(y), ce qui demande que f se factorise **et** que le support soit un rectangle. Exemple : f(w, z) = c·w(w + z) sur [0 ; 3]² : `∫₀³ (w² + wz) dz = 3w² + 9w/2` ; `c · 189/4 = 1, c = 4/189`.
- **Juge** : `prob` pour c et les probabilités ; `equiv` `{vars: ['w'], domain: {w: [0, 3]}}` pour les marginales, avec le contrôle du support ; décision pour l'indépendance · **Forme finale** : c exact ; marginales simplifiées avec support ; décision justifiée.
- **Niveaux** :
  - L1 (guidé) : intégrale double écrite, intégrale intérieure à trous.
  - L2 : bornes à choisir (rectangle ou triangle).
  - L3 (choisir l'action) : intégrer en z, intégrer en w, marginale, comparer au produit.
  - L4 (libre) : c et une marginale.
  - L5 (seul) : support triangulaire (24xy sur x + y ≤ 1, série 7) : c, marginales, indépendance (non, malgré la factorisation), Pr(X < Y).
- **Générateur** : noyaux polynomiaux sur [0 ; a] × [0 ; b] (a, b ∈ 1..3), c rationnel ; supports triangulaires ; noyaux exponentiels c·y·e^(−3x − 2y) sur ]0 ; ∞[² (corrigé 2018 : c = 12, f_Y = 4y·e^(−2y)). Gabarits : (a) constante ; (b) marginales ; (c) indépendance ; (d) Pr(X < Y) ou Pr(X + Y < 1).
- **Corrigé type** : f(w, z) = c·w(w + z) sur [0 ; 3]² (examen 2020–22, ex. 4).
  1. `∫₀³∫₀³ c(w² + wz) dz dw = 1` — normaliser
  2. `∫₀³ (w² + wz) dz = 3w² + 9w/2` — intégrale intérieure
  3. `∫₀³ (3w² + 9w/2) dw = 27 + 81/4 = 189/4` — intégrale extérieure
  4. `c = 4/189` — résoudre
  5. `f_W(w) = (2/63)·w(2w + 3) ; f_Z(z) = (2/21)(2 + z) sur [0 ; 3]` — marginales
  6. `f_W·f_Z ≠ f` — dépendants
- **Aides** : 1 « Intègre d'abord en z (w fixé), puis en w. » · 2 `∫₀³ (w² + wz) dz = 3w² + …` · 3 `c·189/4 = 1`.
- **Variantes d'examen** : `coef` (MATH-234, 10 points) ; `mcq` (distracteurs : `p_normalize_bounds` → c = 12/7 en intégrant sur [0 ; 1]², `p_marginal_bounds`, et c = 1/27 en oubliant le terme wz) ; `tf` : « Si f(x, y) = 24xy sur le triangle x + y ≤ 1, X et Y sont indépendants parce que f se factorise » (faux ; contre-exemple : f_X(0,9)·f_Y(0,9) > 0 alors que f(0,9 ; 0,9) = 0).
- **Pièges** : `p_joint_support_indep`, `p_normalize_bounds`, `p_marginal_bounds`.
- **Sous-buts → crédit** : intégrales itérées → `a2-fubini-rect`, `a2-domain-describe` ; support non borné (noyaux exponentiels) → `a2-improper-multi` ; constante, marginales, décision → `p-joint-cont`.

### `p-lin-combo` — Combinaisons linéaires : espérance, variance, covariance
- **Année** 15 · **Prérequis** `p-moments` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-moments` : E et var de chaque variable.
- **Intro** : E[aX + bY + c] = aE[X] + bE[Y] + c, toujours. var(aX + bY) = a²var(X) + b²var(Y) + 2ab·cov(X, Y). cov(X, Y) = E[XY] − E[X]E[Y] ; indépendants ⇒ cov = 0. Pour X, Y indépendants : var(XY) = E[X²]E[Y²] − (E[X]E[Y])². Moyenne de n variables iid : var(X̄) = σ²/n. Exemple : `E[X] = 2 + 2 · 3 − 1 = 7` ; `var(X) = 3 + 4 · 2 + 6 + 2(0 + 2 · (−2) + 2 · 1) = 13`.
- **Juge** : `prob` · **Forme finale** : nombres exacts ; écart-type √ simplifiée ou à 0,01.
- **Niveaux** :
  - L1 (guidé) : formule de la variance d'une somme écrite, coefficients à placer.
  - L2 : cov à calculer à partir de E[XY].
  - L3 (choisir l'action) : linéarité, a², terme croisé, cov par E[XY], indépendance ⇒ 0.
  - L4 (libre) : moyenne et écart-type d'un portefeuille.
  - L5 (seul) : trois variables Z₁, Z₂, Z₃ (série 7, ex. 6) : E, var et toutes les corrélations.
- **Générateur** : 2 ou 3 variables, E ∈ −3..5, var ∈ 1..9, cov donnée ou via E[XY] (|cov| ≤ √(var·var)), coefficients ∈ {−2, −1, 1, 2, 3} ; on rejette une variance finale ≤ 0. Gabarits : (a) portefeuille (examen 2020–22, ex. 6) ; (b) var(XY) pour X, Y indépendants (EE-209 2023, Q4 : 14) ; (c) combinaisons de Y₁, Y₂, Y₃ indépendantes ; (d) var(X̄).
- **Corrigé type** : X = X_A + 2X_B + X_C avec E = 2, 3, −1 ; var = 3, 2, 6 ; cov(X_B, X_C) = 1 ; E[X_A X_B] = 4 ; X_A et X_C indépendants.
  1. `μ = 2 + 2 · 3 − 1 = 7` — linéarité
  2. `cov(X_A, X_B) = 4 − 2 · 3 = −2` — covariance par E[XY]
  3. `var(X) = 3 + 2² · 2 + 6 + 2[0 + 2 · (−2) + 2 · 1]` — variance d'une somme
  4. `= 17 − 4 = 13 ; σ = √13 ≈ 3,61` — calculer
- **Aides** : 1 « Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. » · 2 `var = 3 + 4 · 2 + 6 + 2[… + 2 · (−2) + 2 · 1]` · 3 `var = 13`.
- **Variantes d'examen** : `coef` (MATH-234, 10 points) ; `mcq` (distracteurs : `p_var_sum_cov` → 17, `p_var_scale` → 3 + 2 · 2 + 6 − 4 = 9, `p_var_xy` → 1 pour Q4) ; `tf` : « Pour X, Y indépendantes, var(X − Y) = var(X) − var(Y) » (faux ; contre-exemple X, Y iid de variance 1 : var(X − Y) = 2).
- **Pièges** : `p_var_sum_cov`, `p_var_scale`, `p_var_xy`, `p_var_diff`.
- **Sous-buts → crédit** : linéarité, variance → `p-lin-combo` ; covariance → `p-cov-corr`.

### `p-cov-corr` — Covariance, corrélation ; corrélation et causalité
- **Année** 15 · **Prérequis** `p-lin-combo`, `p-joint-disc` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-joint-disc` : E[XY] sur un tableau conjoint.
- **Intro** : corr(X, Y) = cov(X, Y)/(σ_X σ_Y) ∈ [−1 ; 1]. cov(aX + b, cY + d) = ac·cov(X, Y) ; corr(aX + b, cY + d) = signe(ac)·corr(X, Y). La corrélation mesure une association **linéaire** ; elle ne dit rien de la cause (variable cachée, hasard, sens inverse). cov(X + Y, X − Y) = var X − var Y. Exemple : `corr = 3/(2 · 3) = 0,5` ; `cov(2X + 1, −Y) = −6`.
- **Juge** : `prob` (ou `stat {decimals: 3}` avec des racines) ; QCM « Interpréter » en fin d'item · **Forme finale** : nombre, puis la phrase d'interprétation.
- **Niveaux** :
  - L1 (guidé) : formule de corr à trous.
  - L2 : transformations affines.
  - L3 (choisir l'action) : cov par la définition, normaliser, sortir les constantes.
  - L4 (libre) : corrélation d'une loi conjointe (tableau).
  - L5 (seul) : relier trois nuages de points à r = 0, 0,5, −0,7 (série 7, ex. 5), puis un scénario « corrélation ou cause ? » (QCM).
- **Générateur** : var X, var Y carrés parfaits ({1, 4, 9, 16, 25}), cov telle que corr ∈ {±0,2 ; ±0,25 ; ±0,4 ; ±0,5 ; ±0,6 ; ±0,75 ; ±0,8} ; transformations a, c ∈ {−3..3} \ {0}. Gabarits : (a) corr à partir de var et cov ; (b) transformation affine ; (c) cov(X + Y, X − Y) (EE-209 Q2) ; (d) nuages de points (repère interactif) ; (e) scénarios d'interprétation : glaces et noyades, cigognes et naissances, ozone et température (transparents « Les blagues de Chronos »).
- **Corrigé type** : var X = 4, var Y = 9, cov(X, Y) = 3.
  1. `corr(X, Y) = 3/(2 · 3) = 0,5` — normaliser
  2. `cov(2X + 1, −Y) = 2 · (−1) · 3 = −6` — sortir les constantes
  3. `corr(2X + 1, −Y) = −0,5` — signe de ac
  4. `cov(X + Y, X − Y) = 4 − 9 = −5 ≠ 0` — X + Y et X − Y corrélées
  5. Interpréter (QCM) : « corr = 0,5 : quand X est grand, Y tend à être grand » ✓ ; « X cause Y » (`p_corr_causal`) ; « Y = 0,5X » (`p_corr_slope`) ; « la moitié de Y est expliquée par X » (`p_r2_r`).
- **Aides** : 1 « corr = cov divisée par le produit des écarts-types ; une constante additive ne change rien. » · 2 `corr = 3/(… · …)` · 3 `corr = 0,5`.
- **Variantes d'examen** : `mcq` (EE-209 Q2 avec ses 5 options ; distracteurs : `p_cov_zero_indep`, `p_corr_scale`) ; `tf` : « corr(X, Y) = 0 ⇒ X et Y indépendants » (faux ; contre-exemple X ~ U(−1, 1), Y = X²) ; « Une forte corrélation entre ventes de glaces et noyades prouve que les glaces font noyer » (faux) ; `coef`.
- **Pièges** : `p_corr_causal`, `p_cov_zero_indep`, `p_corr_scale`, `p_corr_slope`, `p_r2_r`.
- **Sous-buts → crédit** : covariance → `p-lin-combo` ; corrélation, interprétation → `p-cov-corr`.

### `p-total-expect` — Espérance et variance totales
- **Année** 15 · **Prérequis** `p-moments`, `p-cond-total`, `p-binom` · **Étiquettes** `MATH-234` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-moments` : E[X | Y = y] et var(X | Y = y) de chaque loi conditionnelle.
- **Intro** : E[X] = E[E[X | Y]] = Σ_y E[X | Y = y]·Pr(Y = y). var(X) = E[var(X | Y)] + var(E[X | Y]) : la moyenne des variances, plus la variance des moyennes. Exemple : `E[N] = 0,6 · 2,5 + 0,4 · 3,5 = 2,9` ; `var(N) = 1,17 + 0,24 = 1,41`.
- **Juge** : `prob` · **Forme finale** : nombres exacts.
- **Niveaux** :
  - L1 (guidé) : lois conditionnelles données, somme pondérée à trous.
  - L2 : identifier les lois conditionnelles (décision : « N | Mary ~ B(5 ; 0,5) »).
  - L3 (choisir l'action) : E conditionnelle, pondérer, var conditionnelle, var des moyennes.
  - L4 (libre) : E et var.
  - L5 (seul) : retard de Jo : R ~ U(0, 1), X | R ~ U(0, R) : E[X] = 1/4, var(X) = 1/36 + 1/48 = 7/144 (série 8, ex. 3).
- **Générateur** : 2 ou 3 cas de probabilités multiples de 0,1 ; lois conditionnelles binomiales (n ∈ 3..10, p multiples de 0,1), Poisson ou uniformes ; somme aléatoire S = X₁ + … + X_N (E[S] = E[N]·E[X]). Gabarits : (a) examinateurs (examen 2020–22, ex. 16) ; (b) uniforme emboîtée ; (c) somme aléatoire (clients et dépenses).
- **Corrigé type** : Mary (probabilité 0,6, 5 questions à 0,5) ou Frank (0,4, questions à 0,7) ; N = nombre de bonnes réponses.
  1. `N | Mary ~ B(5 ; 0,5) ; N | Frank ~ B(5 ; 0,7)` — lois conditionnelles
  2. `E[N | Mary] = 2,5 ; E[N | Frank] = 3,5` — espérances conditionnelles
  3. `E[N] = 0,6 · 2,5 + 0,4 · 3,5 = 2,9` — espérance totale
  4. `E[var(N | ·)] = 0,6 · 1,25 + 0,4 · 1,05 = 1,17` — moyenne des variances
  5. `var(E[N | ·]) = 0,6 · 0,4 · (3,5 − 2,5)² = 0,24` — variance des moyennes
  6. `var(N) = 1,41` — variance totale
- **Aides** : 1 « Calcule tout sachant l'examinateur, puis pondère par ses probabilités. » · 2 `E[N] = 0,6 · … + 0,4 · …` · 3 `E[N] = 2,9`.
- **Variantes d'examen** : `open` (MATH-234) ; `coef` ; `mcq` (distracteurs : `p_total_var_forget` → 1,17, `p_total_expect_unweighted` → 3) ; `tf` : « var(X) ≥ E[var(X | Y)] » (vrai).
- **Pièges** : `p_total_var_forget`, `p_total_expect_unweighted`, `p_mixture_vs_sum`.
- **Sous-buts → crédit** : lois conditionnelles → `p-binom` ; pondérer → `p-cond-total` ; formule totale → `p-total-expect`.

### `p-sum-mixture` — Densité d'une somme ; mélange de gaussiennes
- **Année** 16 · **Prérequis** `p-joint-cont`, `p-total-expect` · **Étiquettes** `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-joint-cont` : f_X(z − y)f_Y(y) est une densité conjointe intégrée en y.
- **Intro** : X, Y indépendantes, Z = X + Y : p_Z(z) = Σ_y p_X(z − y)p_Y(y) (discret), f_Z(z) = ∫ f_X(z − y)f_Y(y) dy (continu), bornes tirées des deux supports. Mélange : on tire la composante k avec la probabilité πₖ, puis X selon fₖ ; la densité est Σ πₖ fₖ, ce n'est **pas** la loi de Σ πₖ Xₖ. E = Σ πₖ μₖ ; var = Σ πₖ(σₖ² + μₖ²) − E². a₁X₁ + a₂X₂ ~ N(a₁μ₁ + a₂μ₂, a₁²σ₁² + a₂²σ₂²) si les Xᵢ sont normales indépendantes. Exemple : `0,3·N(0, 1) + 0,7·N(4, 1) : E = 2,8 ; var = 4,36` ; `0,3X + 0,7Y : var = 0,09 + 0,49 = 0,58` (note : ce n'est pas la même chose).
- **Juge** : `equiv` `{vars: ['z'], domain: {z: support}}` pour une densité par morceaux (chaque morceau jugé sur son intervalle) ; `prob` pour E et var · **Forme finale** : densité par morceaux avec support, ou E et var exactes.
- **Niveaux** :
  - L1 (guidé) : somme de deux dés, convolution discrète à trous.
  - L2 : bornes de l'intégrale de convolution à choisir.
  - L3 (choisir l'action) : écrire la convolution, découper selon z, intégrer, mélange ou somme.
  - L4 (libre) : densité de la somme de deux U(0, 1) (triangle).
  - L5 (seul) : mélange de deux gaussiennes : E, var, densité en un point, puis la même chose pour la somme pondérée, et un QCM « quel histogramme a deux bosses ? ».
- **Générateur** : gabarits (a) deux dés ou deux variables à petit support ; (b) deux U(0, 1) → triangle ; (c) deux exp(λ) → Γ(2, 1/λ) ; (d) Poisson + Poisson ; (e) mélange π ∈ {0,2 ; 0,3 ; 0,5}, μ ∈ {−2..6}, σ² ∈ {1, 4}.
- **Corrigé type** : mélange 0,3·N(0, 1) + 0,7·N(4, 1).
  1. `E[X] = 0,3 · 0 + 0,7 · 4 = 2,8` — moyenne pondérée
  2. `E[X²] = 0,3 · (1 + 0) + 0,7 · (1 + 16) = 12,2` — seconds moments
  3. `var(X) = 12,2 − 2,8² = 4,36` — variance du mélange
  4. `pour 0,3X₁ + 0,7X₂ : var = 0,3² · 1 + 0,7² · 1 = 0,58` — somme pondérée (autre objet)
- **Aides** : 1 « Un mélange choisit une composante ; une somme pondérée additionne les deux variables. » · 2 `E[X²] = 0,3 · (1 + 0²) + 0,7 · (1 + …²)` · 3 `var = 12,2 − 7,84 = 4,36`.
- **Variantes d'examen** : `mcq` (EE-209 ; distracteurs : `p_mixture_vs_sum` → 0,58, `p_sum_density_add` → f_X + f_Y, `p_conv_bounds`) ; `tf` : « La densité de X + Y est f_X + f_Y » (faux ; contre-exemple : deux U(0, 1), f_X + f_Y = 2 sur [0 ; 1] n'intègre pas à 1).
- **Pièges** : `p_mixture_vs_sum`, `p_sum_density_add`, `p_conv_bounds`.
- **Sous-buts → crédit** : moments du mélange → `p-total-expect` ; convolution → `p-sum-mixture`.

### `p-markov-cheb` — Markov, Tchebychev, loi des grands nombres
- **Année** 15 · **Prérequis** `p-moments`, `p-normal-std` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-moments` : E[X] et σ dans les bornes.
- **Intro** : Markov : si X ≥ 0, Pr(X ≥ a) ≤ E[X]/a. Tchebychev : Pr(|X − μ| ≥ kσ) ≤ 1/k². Loi des grands nombres : X̄ₙ → μ, car var(X̄ₙ) = σ²/n → 0. Elle ne « compense » pas les écarts passés : après 5 piles, face n'est pas plus probable (erreur du joueur). Exemple : `Pr(X ≥ 20) ≤ 5/20 = 1/4` ; `Pr(|X − 50| ≥ 10) ≤ 1/2² = 1/4` (note : pour une normale, la vraie valeur est 0,046).
- **Juge** : `prob` pour les bornes ; `value` pour une taille d'échantillon ; décisions et QCM pour la loi des grands nombres · **Forme finale** : borne exacte, ou n minimal.
- **Niveaux** :
  - L1 (guidé) : inégalité écrite, nombres à placer.
  - L2 : décision « Markov ou Tchebychev ? » (X ≥ 0 ? variance connue ?).
  - L3 (choisir l'action) : écrire l'écart en nombre de σ, appliquer, comparer à la valeur exacte.
  - L4 (libre) : une borne.
  - L5 (seul) : n minimal pour que Pr(|X̄ − μ| ≥ ε) ≤ δ par Tchebychev (n ≥ σ²/(δε²)), puis l'intervalle X̄ ± σ/√(nδ) de la série 9, ex. 5.
- **Générateur** : Markov : E[X] ∈ 2..20, a multiple de E[X] ; Tchebychev : μ entier, σ ∈ {2, 5, 10}, k ∈ {2, 3, 4, 5} ; taille : σ ∈ {1, 2, 5, 10}, ε ∈ {0,1 ; 0,5 ; 1}, δ ∈ {0,01 ; 0,05 ; 0,1}. Gabarits : (a) Markov ; (b) Tchebychev et comparaison avec la normale ; (c) taille d'échantillon ; (d) QCM ou vrai/faux sur la loi des grands nombres (pièce, roulette).
- **Corrigé type** : X ≥ 0 avec E[X] = 5 ; puis Y de moyenne 50 et d'écart-type 5.
  1. `Pr(X ≥ 20) ≤ E[X]/20 = 1/4` — Markov
  2. `|Y − 50| ≥ 10 ⇔ écart ≥ 2σ` — exprimer en σ
  3. `Pr(|Y − 50| ≥ 10) ≤ 1/2² = 1/4` — Tchebychev
  4. `si Y ~ N(50, 25) : 2(1 − Φ(2)) = 0,046` — la borne est large
- **Aides** : 1 « Compte combien d'écarts-types fait l'écart, puis 1/k². » · 2 `10 = … · σ` · 3 `Pr ≤ 1/4`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_chebyshev_k` → 1/2, `p_markov_negative`, `p_gambler`) ; `tf` : « Après 5 piles de suite avec une pièce équilibrée, face est plus probable au lancer suivant » (faux) ; « La loi des grands nombres dit que le nombre de piles moins le nombre de faces tend vers 0 » (faux ; c'est la **proportion** qui tend vers 1/2, l'écart en nombre grandit comme √n).
- **Pièges** : `p_chebyshev_k`, `p_markov_negative`, `p_gambler`, `p_lln_count`.
- **Sous-buts → crédit** : bornes → `p-markov-cheb` ; comparaison normale → `p-normal-std`.

### `p-clt-sum` — Théorème central limite pour une somme ou une moyenne
- **Année** 15 · **Prérequis** `p-normal-std`, `p-lin-combo` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : X₁, …, Xₙ iid d'espérance μ et de variance σ² : pour **n** grand, Sₙ = ΣXᵢ ≈ N(nμ, nσ²) et X̄ ≈ N(μ, σ²/n). La condition porte sur la taille de l'**échantillon**, pas sur la population, et la population n'a pas besoin d'être normale. L'écart-type de la somme est σ√n, pas nσ. Exemple : `E[S] = 16 · 70 = 1 120 ; sd(S) = √16 · 20 = 80` ; `Pr(S > 1 280) ≈ 1 − Φ(2) = 0,023`.
- **Juge** : lignes étiquetées `E[S]`, `sd(S)` (`prob`), `z` (`stat {decimals: 3}`), `Φ(…)` (table), probabilité (`stat {decimals: 3}`) · **Forme finale** : probabilité à 0,001 près, ou seuil, ou n.
- **Niveaux** :
  - L1 (guidé) : E[S] et sd(S) à trous, z donné.
  - L2 : décision « somme ou moyenne ? » ; les deux voies sont acceptées et donnent le même z.
  - L3 (choisir l'action) : E de la somme, sd de la somme, standardiser, lire Φ, complément.
  - L4 (libre) : une probabilité.
  - L5 (seul) : problème inverse : capacité d'un camion pour que Pr(dépassement) = 0,04 (Φ⁻¹(0,96) = 1,75), ou nombre de jours d'ouverture pour accueillir 250 clients avec probabilité 0,975 (série 8).
- **Générateur** : n ∈ {16, 25, 36, 49, 64, 100} (√n entier), μ entier, σ ∈ {2, 4, 5, 10, 15, 20}, seuil = nμ + z·σ√n avec z sur la grille. Gabarits : (a) ascenseur (examen 2020–22, ex. 9) ; (b) colis d'un camion (série 8, ex. 4) ; (c) somme de variables de densité 3(1 − x²)/4 sur ]−1 ; 1[ (série 14 : var = 1/5) ; (d) problème inverse ; (e) QCM « condition du TCL » (EE-209 2023, Q1).
- **Corrigé type** : 16 personnes, poids d'espérance 70 kg et d'écart-type 20 kg ; Pr(poids total > 1 280 kg).
  1. `E[S] = 16 · 70 = 1 120` — espérance de la somme
  2. `sd(S) = √16 · 20 = 80` — écart-type de la somme
  3. `z = (1 280 − 1 120)/80 = 2` — standardiser
  4. `Pr(S > 1 280) ≈ 1 − Φ(2) = 1 − 0,977 = 0,023` — TCL et table
  5. `vérif. par la moyenne : (80 − 70)/(20/4) = 2` — même z
- **Aides** : 1 « La variance d'une somme de n termes indépendants est n·σ² ; l'écart-type est σ√n. » · 2 `sd(S) = √16 · …` · 3 `z = 160/80 = 2`.
- **Variantes d'examen** : `coef` (MATH-234, 5 points) ; `mcq` (EE-209 Q1 ; distracteurs : `p_clt_population`, `p_clt_needs_normal` ; et pour le calcul : `p_clt_sum_sd` → z = 0,5, `p_se_forgot_sqrt_n`) ; `tf` : « Le TCL demande que la population soit normale » (faux) ; « Pour n grand, la moyenne empirique d'une loi exponentielle est approximativement normale » (vrai).
- **Pièges** : `p_clt_sum_sd`, `p_clt_population`, `p_clt_needs_normal`, `p_se_forgot_sqrt_n`, `p_upper_tail`.
- **Sous-buts → crédit** : E et sd de la somme → `p-lin-combo` ; standardiser, Φ → `p-normal-std` ; TCL → `p-clt-sum`.

### `p-clt-binom` — Approximation normale de la binomiale et de Poisson
- **Année** 15 · **Prérequis** `p-clt-sum`, `p-binom`, `p-poisson` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-clt-sum` : le TCL appliqué à une somme de Bernoulli ; `p-poisson` : Poiss(λ) ≈ N(λ, λ).
- **Intro** : X ~ B(n, p) est une somme de n Bernoulli ; pour n grand, X ≈ N(np, np(1 − p)) et p̂ = X/n ≈ N(p, p(1 − p)/n). Poiss(λ) ≈ N(λ, λ) pour λ grand. Le cours n'applique **pas** de correction de continuité. Exemple : B(100 ; 1/2) : `μ = 50, σ = √25 = 5` ; `Pr(X ≥ 60) ≈ 1 − Φ(2) = 0,023`.
- **Juge** : comme `p-clt-sum`. Une ligne avec correction de continuité (59,5) est acceptée (`ok`) avec la note « juste, mais le cours ne fait pas cette correction » · **Forme finale** : probabilité à 0,001 près.
- **Niveaux** :
  - L1 (guidé) : np et np(1 − p) à trous.
  - L2 : décision « approximation normale ou Poisson ? » (n p petit ou pas).
  - L3 (choisir l'action) : moyenne, variance, **racine**, standardiser, Φ.
  - L4 (libre) : une probabilité.
  - L5 (seul) : nombre d'essais n pour que Pr(X ≥ k) ≥ 0,975.
- **Générateur** : (n, p) avec σ entier : p = 1/2 et n ∈ {100, 400, 900, 2 500} ; p = 0,2 et n ∈ {100, 400, 625} ; p = 0,1 et n ∈ {100, 400, 900} ; Poisson λ ∈ {16, 25, 36, 64, 100} ; seuils tels que z soit sur la grille. Gabarits : (a) pièce ; (b) sondage, proportion ; (c) Poisson (clients par mois, série 8) ; (d) problème inverse.
- **Corrigé type** : X ~ B(100 ; 0,5), Pr(X ≥ 60).
  1. `E[X] = 50 ; var(X) = 25` — paramètres
  2. `σ = 5` — écart-type
  3. `z = (60 − 50)/5 = 2` — standardiser
  4. `Pr(X ≥ 60) ≈ 1 − Φ(2) = 0,023` — table
- **Aides** : 1 « np(1 − p) est la **variance** : prends sa racine. » · 2 `z = (60 − 50)/√…` · 3 `z = 10/5 = 2`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_binom_var_as_sd` → z = 0,4, `p_upper_tail` → 0,977) ; `tf` : « B(1 000 ; 0,001) est bien approchée par une normale » (faux ; np = 1 : Poisson).
- **Pièges** : `p_binom_var_as_sd`, `p_upper_tail`, `p_poisson_approx_bad`.
- **Sous-buts → crédit** : paramètres → `p-binom` ; standardiser → `p-normal-std` ; approximation → `p-clt-binom`.

### `p-mom` — Méthode des moments
- **Année** 15 · **Prérequis** `p-moments` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : on égale les moments théoriques aux moments empiriques et on résout en θ : E[X] = x̄ ; avec deux paramètres, var(X) = σ̂² = (1/n)Σ(xᵢ − x̄)² (diviseur **n**). Exemples : exp(λ) → λ̂ = 1/x̄ ; U[0, θ] → θ̂ = 2x̄ ; Γ(k, θ) → θ̂ = σ̂²/x̄, k̂ = x̄²/σ̂². X̄ estime E[X] par les moments, quel que soit le modèle. Exemple : `kθ = 6, kθ² = 12` ; `θ̂ = 2, k̂ = 3`.
- **Juge** : lignes étiquetées : `E[X] =` (`equiv` en θ), `équation`, `θ̂ =` (`equiv` en x̄ symbolique, ou `stat {decimals: 3}`) · **Forme finale** : θ̂ en fonction des moments empiriques, puis sa valeur.
- **Niveaux** :
  - L1 (guidé) : E[X] en fonction de θ donnée, équation à résoudre.
  - L2 : E[X] à calculer (renvoie à `p-moments`).
  - L3 (choisir l'action) : moment théorique, moment empirique, égaler, isoler.
  - L4 (libre) : un paramètre.
  - L5 (seul) : deux paramètres (Gamma), ou f(x) = θx^(θ−1) sur ]0 ; 1[ : θ̂ = x̄/(1 − x̄) (série 9), puis comparaison avec le MLE (`p-mle`).
- **Générateur** : modèles exp, uniforme, Gamma, Pareto (α > 1 : α̂ = x̄/(x̄ − 1)), θx^(θ−1), Poisson ; données construites selon la convention 10 (x̄ entier, σ̂² entier). Gabarits : (a) un paramètre, données brutes ; (b) deux paramètres ; (c) vrai/faux sur X̄ (EE-209 Q5).
- **Corrigé type** : Γ(k, θ), données `2, 2, 4, 8, 10, 10`.
  1. `x̄ = 6 ; σ̂² = 72/6 = 12` — moments empiriques (diviseur n)
  2. `kθ = 6 ; kθ² = 12` — égaler
  3. `θ̂ = 12/6 = 2` — diviser
  4. `k̂ = 6/2 = 3` — isoler
- **Aides** : 1 « Deux paramètres : deux équations, E[X] = x̄ et var(X) = σ̂². » · 2 `θ = kθ²/(kθ) = …` · 3 `θ̂ = 2`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_mom_s2` → θ̂ = 14,4/6 = 2,4, `p_mom_wrong_moment`) ; `tf` : « Pour estimer θ = E[X], X̄ est un estimateur des moments quel que soit le modèle » (vrai, EE-209 2023).
- **Pièges** : `p_mom_s2`, `p_mom_wrong_moment`.
- **Sous-buts → crédit** : moments théoriques → `p-moments` ; résoudre → `p-mom`.

### `p-mle` — Maximum de vraisemblance, étape par étape
- **Année** 15 · **Prérequis** `p-disc-pmf`, `p-cont-density`, `g2-log-rules`, `g6-deriv-rules` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `p-disc-pmf` : L(θ) = Π f(xᵢ ; θ) avec une fonction de masse ; `p-cont-density` : L(θ) = Π f(xᵢ ; θ) avec une densité.
- **Intro** : L(θ) = Π f(xᵢ ; θ) ; ℓ(θ) = ln L(θ) = Σ ln f(xᵢ ; θ) ; on résout ℓ′(θ̂) = 0 ; on **vérifie** que c'est un maximum (ℓ″ < 0 partout, ou point stationnaire unique avec ℓ″(θ̂) < 0) ; enfin θ̂ ≈ N(θ, 1/J(θ̂)) avec J(θ̂) = −ℓ″(θ̂), d'où l'IC de Wald θ̂ ± z/√J(θ̂). Exemple : exp(λ), n = 16, Σxᵢ = 8 : `ℓ(λ) = 16 ln λ − 8λ` ; `ℓ′(λ̂) = 16/λ̂ − 8 = 0, λ̂ = 2` ; `ℓ″(λ) = −16/λ² < 0`.
- **Juge** : lignes étiquetées, dans cet ordre :
  - `L(θ) =` : `equiv` `{vars: ['θ'], domain: {θ: support du paramètre}}` ;
  - `ℓ(θ) =` : `equiv` **à une constante additive près** (comparé par dérivation en θ, comme `antideriv`), car le cours garde ou enlève les termes sans θ ;
  - `ℓ′(θ) =` : `equiv` ;
  - `θ̂ =` : `equiv` en n, S = Σxᵢ, T = Σ ln xᵢ ou Q = Σxᵢ² (symboles déclarés, `domain: {n: [2, 50], S: [1, 100], …}`), ou `stat {decimals: 3}` avec des données numériques ;
  - `ℓ″(θ) =` : `equiv`, puis décision « maximum global : ℓ″ < 0 pour tout θ » / « seulement local » / « minimum » ;
  - `J(θ̂) =`, `Var(θ̂) ≈` : `equiv` ou `stat` ;
  - `IC =` : `stat {decimals: 3}`.
  
  **Forme finale** : θ̂ en forme close, maximum justifié ; aux niveaux 4 et 5, variance asymptotique et IC de Wald.
- **Niveaux** :
  - L1 (guidé) : données numériques ; L(θ) écrite ; ℓ et ℓ′ à trous ; le contrôle ℓ″ est déjà choisi.
  - L2 : ℓ′ à écrire et à annuler ; décision « maximum ? » à choisir (3 options).
  - L3 (choisir l'action) : produit, logarithme, dériver, annuler, isoler, dériver deux fois, conclure, Wald.
  - L4 (libre) : version littérale (n, S) jusqu'à θ̂ et la vérification, puis la variance asymptotique.
  - L5 (seul) : problème MATH-234 complet (10 points) : θ̂, variance asymptotique, IC à 95 %, conditions de validité (QCM final : « n grand et conditions de régularité »).
- **Générateur** : modèles à forme close : Bernoulli (p̂ = S/n), Poisson (λ̂ = x̄), exponentielle (λ̂ = n/S), normale μ avec σ connu, normale σ² avec μ connu, densité √θ·e^(−θx)/√(πx) (θ̂ = n/(2S), examen ex. 11), Rayleigh (θ̂² = Q/(2n), ex. 13), log-normale (μ̂ = T/n, ex. 17), Pareto sur ]1 ; ∞[ (α̂ = n/T), θx^(θ−1) sur ]0 ; 1[ (θ̂ = −n/T), géométrique (p̂ = n/(n + S), examen 2018), pile ou face 4n faces sur 5n (p̂ = 4/5, ex. 14). On choisit θ̂ simple, puis S ; aux niveaux 1 à 3, J(θ̂) est un carré parfait (erreur standard rationnelle). Au moins deux gabarits par niveau : données numériques (n ≤ 20, liste ou résumé) ou littérales.
- **Corrigé type** : X₁, …, X₁₆ iid exp(λ), Σxᵢ = 8.
  1. `L(λ) = Π λe^(−λxᵢ) = λ¹⁶·e^(−8λ)` — vraisemblance
  2. `ℓ(λ) = 16 ln λ − 8λ` — logarithme
  3. `ℓ′(λ) = 16/λ − 8` — dériver
  4. `ℓ′(λ̂) = 0 ⇒ λ̂ = 2` — annuler et isoler
  5. `ℓ″(λ) = −16/λ² < 0 pour tout λ > 0 : maximum global` — vérifier le maximum
  6. `J(λ̂) = −ℓ″(2) = 4 ; Var(λ̂) ≈ 1/4` — variance asymptotique
  7. `IC₉₅ = 2 ± 1,96 · 1/2 = [1,02 ; 2,98]` — IC de Wald
  8. Interpréter (QCM) : « valable si n est grand et si le modèle est régulier » ✓ ; « exact pour tout n » ; « contient λ̂ avec probabilité 95 % » (`p_ci_prob`) ; « 95 % des données sont dans l'IC » (`p_ci_data`).
- **Aides** : 1 « Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement. » · 2 `ℓ′(λ) = 16/λ − …` · 3 `16/λ̂ − 8 = 0, donc λ̂ = 2`.
- **Variantes d'examen** : `open` (MATH-234, 10 à 15 points : ex. 11, 13.2, 14.1, 17) ; `coef` (θ̂ seul) ; `mcq` (EE-209 Q6, Rayleigh, réponse par intervalle [10 ; 25) ; distracteurs : `g2_log_power`, `p_mle_constant_kept`, `p_mle_solve`) ; `tf` : « Un point où ℓ′ s'annule est toujours le maximum de vraisemblance » (faux ; contre-exemple : ℓ(θ) = θ³ − 3θ sur ℝ, ℓ′(1) = 0 mais ℓ″(1) = 6 > 0, minimum local).
- **Pièges** : `p_mle_no_check`, `g2_log_power`, `p_mle_constant_kept`, `p_mle_solve`, `p_wald_var_inverse`, `p_wald_sign`.
- **Sous-buts → crédit** : logarithme → `g2-log-rules` ; dériver → `g6-deriv-rules` ; isoler → `@alg:F-isoler` ; vraisemblance, θ̂, vérification → `p-mle` ; Wald → `p-ci-wald`.

### `p-mle-special` — MLE au bord du support ; invariance
- **Année** 15 · **Prérequis** `p-mle` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : si le support dépend de θ, ℓ′ = 0 ne marche pas. U[0, θ] : L(θ) = θ⁻ⁿ·1{θ ≥ max xᵢ}, décroissante sur [max xᵢ ; ∞[, donc θ̂ = max xᵢ. Invariance : le MLE de g(θ) est g(θ̂). Exemple : exp de moyenne θ : `θ̂ = x̄` ; MLE de Pr(X ≤ 2) : `1 − e^(−2/x̄)`.
- **Juge** : décision (« ℓ′ ne s'annule pas ; L décroît à partir de max xᵢ ») ; `equiv` et `value` · **Forme finale** : θ̂ (statistique d'ordre) ou g(θ̂).
- **Niveaux** :
  - L1 (guidé) : graphe de L(θ) affiché (repère), lire où il est maximal.
  - L2 : écrire L avec l'indicatrice ; décision.
  - L3 (choisir l'action) : indicatrice, monotonie, statistique d'ordre, invariance.
  - L4 (libre) : MLE d'un support décalé (f = e^(−(x − θ)) pour x ≥ θ → min xᵢ).
  - L5 (seul) : plaques vaudoises (séries 9–10) : θ̂ = max, puis biais (renvoie à `p-bias-mse`).
- **Générateur** : U[0, θ], U[−θ ; θ] (θ̂ = max|xᵢ|), exponentielle décalée, invariance pour exp, Poisson (Pr(X = 0) → e^(−x̄)), normale (quantile μ̂ + 1,645σ̂). Données : 5 à 20 valeurs entières.
- **Corrigé type** : x = `3, 7, 2, 9, 5` iid U[0, θ].
  1. `L(θ) = θ⁻⁵ si θ ≥ 9, 0 sinon` — vraisemblance avec support
  2. décision `ℓ′(θ) = −5/θ ≠ 0 ; L décroît sur [9 ; ∞[` — monotonie
  3. `θ̂ = max xᵢ = 9` — bord du support
  4. `MLE de Pr(X ≤ 3) = 3/θ̂ = 1/3` — invariance
- **Aides** : 1 « Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée. » · 2 `L(θ) = θ⁻⁵ pour θ ≥ …` · 3 `θ̂ = 9`.
- **Variantes d'examen** : `mcq` (EE-209 Q7 : 1 − e^(−2/X̄) ; distracteurs : `p_mle_invariance_ignored` → (1/n)Σ1{Xᵢ ≤ 2}, `p_exp_rate_mean` → 1 − e^(−2X̄), « le MLE n'existe pas ») ; `tf` : « Le MLE n'existe pas pour U[0, θ], puisque ℓ′ ne s'annule jamais » (faux) ; `coef`.
- **Pièges** : `p_mle_support`, `p_mle_invariance_ignored`, `p_exp_rate_mean`.
- **Sous-buts → crédit** : vraisemblance → `p-mle` ; support, invariance → `p-mle-special`.

### `p-bias-mse` — Biais, variance, erreur quadratique moyenne, consistance
- **Année** 15 · **Prérequis** `p-mom`, `p-mle`, `p-lin-combo` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `p-mom` : biais de l'estimateur des moments ; `p-mle` : biais de l'estimateur du maximum de vraisemblance.
- **Intro** : biais(θ̂) = E[θ̂] − θ ; EQM = E[(θ̂ − θ)²] = var(θ̂) + biais² ; θ̂ est consistant s'il tend vers θ en probabilité (il suffit que l'EQM tende vers 0). X̄ est sans biais pour μ ; σ̂²_ML a pour espérance (n − 1)σ²/n ; s² est sans biais. Exemple : `E[Y] = 3θ/4` (note : Ȳ est biaisé) ; `θ̂ = 4Ȳ/3 : var(θ̂) = θ²/(15n)`.
- **Juge** : `equiv` `{vars: ['θ', 'n'], domain: {θ: [0.5, 5], n: [2, 50]}}` · **Forme finale** : expression simplifiée en θ et n ; décision « biaisé ? », « consistant ? ».
- **Niveaux** :
  - L1 (guidé) : E[Y] à trous, conclusion sur le biais.
  - L2 : corriger le biais (facteur).
  - L3 (choisir l'action) : E[Y], E[Y²], var(Y), var de la moyenne (÷ n), constante au carré, EQM.
  - L4 (libre) : biais et variance d'un estimateur.
  - L5 (seul) : comparer deux estimateurs par l'EQM (max et (n + 1)max/n pour U[0, θ], série 9, ex. 4).
- **Générateur** : densités c·y^k/θ^(k+1) sur ]0 ; θ[ (k ∈ 1..4) ; U[0, θ] ; σ̂²_ML ; p̂(1 − p̂) ; Poisson X̄. Gabarits : (a) EE-209 Q8 (vrai/faux biais) ; (b) Q9 (variance d'un estimateur, 8 options) ; (c) EQM et choix ; (d) consistance.
- **Corrigé type** : Y de densité 3y²/θ³ sur ]0 ; θ[ (EE-209 2023, Q8–Q9).
  1. `E[Y] = ∫₀^θ 3y³/θ³ dy = 3θ/4` — espérance
  2. `biais(Ȳ) = −θ/4 ≠ 0` — Ȳ est biaisé
  3. `θ̂ = (4/3)Ȳ : E[θ̂] = θ` — corriger
  4. `E[Y²] = 3θ²/5 ; var(Y) = 3θ²/5 − 9θ²/16 = 3θ²/80` — variance d'une observation
  5. `var(θ̂) = (16/9) · (3θ²/80)/n = θ²/(15n)` — constante au carré, ÷ n
  6. `EQM = θ²/(15n) → 0 : consistant` — consistance
- **Aides** : 1 « var(cX̄) = c²·var(X)/n. » · 2 `var(θ̂) = (4/3)² · … /n` · 3 `var(θ̂) = θ²/(15n)`.
- **Variantes d'examen** : `mcq` (EE-209 Q9 ; distracteurs : `p_var_scale` → θ²/(20n), `p_se_forgot_sqrt_n` → θ²/15, `p_mse_bias_not_squared`) ; `tf` : « Ȳ est un estimateur sans biais de θ » (faux, Q8) ; « Un estimateur sans biais est toujours meilleur qu'un estimateur biaisé » (faux ; contre-exemple : pour U[0, θ], max xᵢ biaisé a une EQM plus petite que 2x̄ sans biais dès n ≥ 3).
- **Pièges** : `p_mse_bias_not_squared`, `p_var_scale`, `p_se_forgot_sqrt_n`, `p_unbiased_better`.
- **Sous-buts → crédit** : moments → `p-moments` ; variance d'une combinaison → `p-lin-combo` ; biais, EQM → `p-bias-mse`.

### `p-fisher-cr` — Information de Fisher, Cramér-Rao
- **Année** 16 · **Prérequis** `p-mle`, `p-bias-mse` · **Étiquettes** `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-bias-mse` : Cramér-Rao borne la variance d'un estimateur sans biais.
- **Intro** : score s(θ) = ℓ′(θ) ; information par observation I₁(θ) = Var(score d'une observation) = −E[∂²ln f(X ; θ)/∂θ²] ; pour n observations iid, I(θ) = n·I₁(θ). Cramér-Rao : tout estimateur **sans biais** vérifie Var(θ̂) ≥ 1/(n·I₁(θ)). Le MLE vérifie √n(θ̂ − θ) → N(0, I₁(θ)⁻¹). Exemple Poisson : `∂²ln f/∂λ² = −x/λ²` ; `I₁(λ) = 1/λ` ; `borne = λ/n = var(X̄)` (note : X̄ est efficace).
- **Juge** : `equiv` `{vars: ['θ', 'n']}` · **Forme finale** : I₁(θ), borne, comparaison avec la variance de l'estimateur.
- **Niveaux** : L1 ln f écrit, dérivées à trous ; L2 espérance de −∂² à calculer ; L3 actions (ln f, ∂, ∂², espérance, ×n, inverser) ; L4 borne et efficacité ; L5 IC de Wald par I(θ̂) et comparaison avec J(θ̂) (`p-ci-wald`).
- **Générateur** : Bernoulli (I₁ = 1/(p(1 − p))), Poisson, exponentielle (1/λ²), normale μ (1/σ²), normale σ² à μ connu (1/(2σ⁴)), géométrique.
- **Corrigé type** : X ~ Poiss(λ).
  1. `ln f(x ; λ) = x ln λ − λ − ln x!` — log-densité
  2. `∂²ln f/∂λ² = −x/λ²` — dériver deux fois
  3. `I₁(λ) = E[X]/λ² = 1/λ` — espérance
  4. `borne de Cramér-Rao = λ/n` — inverser n·I₁
  5. `var(X̄) = λ/n : X̄ atteint la borne` — efficacité
- **Aides** : 1 « Dérive deux fois ln f en λ, puis prends l'espérance de l'opposé. » · 2 `I₁(λ) = E[X]/λ^…` · 3 `I₁(λ) = 1/λ`.
- **Variantes d'examen** : `mcq` (distracteurs : `p_fisher_per_obs` → borne λ, `p_fisher_sign` → −1/λ) ; `tf` : « L'information de n observations iid vaut I₁(θ) » (faux : n·I₁(θ)) ; « La borne de Cramér-Rao s'applique à tout estimateur, biaisé ou non » (faux ; contre-exemple : l'estimateur constant θ̂ = 1 a une variance nulle).
- **Pièges** : `p_fisher_per_obs`, `p_fisher_sign`, `p_cr_biased`.
- **Sous-buts → crédit** : dérivées → `p-mle` ; information, borne → `p-fisher-cr`.

### `p-ci-mean` — IC pour une moyenne : z ou Student
- **Année** 15 · **Prérequis** `p-normal-inverse`, `p-clt-sum`, `p-desc-summary` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `p-clt-sum` : données non normales : X̄ approximativement normale.
- **Intro** : σ connu : x̄ ± z₁₋α/₂·σ/√n. σ inconnu et données normales : pivot T = (X̄ − μ)/(S/√n) ~ t_{n−1}, d'où x̄ ± t·s/√n avec ν = n − 1 (ν ≥ 200 : quantile normal). Données non normales, n grand : x̄ ± z·s/√n (asymptotique). Exemple : n = 9, x̄ = 20, s = 3 : `t = s₅(ν = 8) = 2,306` ; `IC₉₅ = 20 ± 2,306 · 3/3 = [17,694 ; 22,306]`.
- **Juge** : protocole d'un IC (convention 8) ; lignes `ν`, `quantile` (table), `s/√n`, `demi-largeur`, `IC` (`stat {decimals: 3}`, `ciRule: 'outward'` pour les items EE-209) · **Forme finale** : IC avec ses deux bornes, puis « Interpréter ».
- **Niveaux** :
  - L1 (guidé) : pivot choisi, quantile à lire, bornes à trous.
  - L2 : décision « σ connu ? normal ? n grand ? » → z, Student ou asymptotique.
  - L3 (choisir l'action) : x̄, s, erreur standard, ν, lire la table, bornes.
  - L4 (libre) : IC à partir de données brutes.
  - L5 (seul) : IC puis taille d'échantillon pour une demi-largeur donnée (σ connu : n ≥ (zσ/E)²), ou IC à 99 % et comparaison de largeur.
- **Générateur** : n ∈ {5, 9, 10, 16, 25, 36} ; données selon la convention 10 (x̄ entier, s² entier) ; ν dans la Table 3 ; niveaux 95 % ou 99 % (MATH-234) ; quantiles fournis pour EE-209 (ex. t₁₅ ; 0,975 = 2,131). Gabarits : (a) σ connu (appareil de précision connue) ; (b) σ inconnu, données brutes ; (c) résumé (n, x̄, s²) (série 11 : 12 voitures) ; (d) n = 201 ou plus → quantile normal ; (e) taille d'échantillon. Item `code` (L4) : compléter `half = t * s / ???` (réponse `math.sqrt(n)` ou `n ** 0.5` ; le prélude contient `import math`), testé sur 3 jeux (n, s, t).
- **Corrigé type** : n = 9 mesures normales, x̄ = 20, s = 3, IC à 95 % pour μ.
  1. décision `σ inconnu, données normales → Student, ν = 8` — choisir le pivot
  2. `t = s₅(8) = 2,306` — lire la Table 3
  3. `s/√n = 3/3 = 1` — erreur standard
  4. `demi-largeur = 2,306 · 1 = 2,306` — marge
  5. `IC₉₅ = [17,694 ; 22,306]` — bornes
  6. Interpréter (QCM) : « Si on refaisait l'expérience souvent, 95 % des IC ainsi construits contiendraient μ » ✓ ; « μ est dans [17,694 ; 22,306] avec probabilité 0,95 » (`p_ci_prob`) ; « 95 % des mesures sont dans l'IC » (`p_ci_data`) ; « x̄ est dans l'IC avec probabilité 0,95 » (`p_ci_xbar`).
- **Aides** : 1 « σ inconnu et n petit : Student à n − 1 degrés de liberté, colonne s₅ pour 95 %. » · 2 `IC = 20 ± … · 3/√9` · 3 `IC = 20 ± 2,306`.
- **Variantes d'examen** : `coef` ; `mcq` (EE-209 Q12 : IC exact ; distracteurs : `p_t_vs_z` → 1,96, `p_one_two_sided` → 1,753, `p_se_forgot_sqrt_n` → marge ×4, `p_df_wrong` → ν = n) ; `tf` : « Avec 4 fois plus d'observations (σ connu), l'IC est 2 fois plus étroit » (vrai) ; « Un IC à 99 % est plus étroit qu'un IC à 95 % » (faux).
- **Pièges** : `p_t_vs_z`, `p_se_forgot_sqrt_n`, `p_one_two_sided`, `p_df_wrong`, `p_sd_n`, `p_ci_prob`.
- **Sous-buts → crédit** : x̄, s → `p-desc-summary` ; quantile normal → `p-normal-inverse` ; pivot, bornes → `p-ci-mean` ; interprétation → `p-interpret`.

### `p-ci-wald` — IC de Wald (avec −ℓ″) et de Wilson
- **Année** 15 · **Prérequis** `p-ci-mean`, `p-mle` · **Étiquettes** `MATH-234`, `EE-209` (le gabarit Wilson est EE-209) · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-ci-mean` : même forme θ̂ ± z·se.
- **Intro** : θ̂_ML ≈ N(θ, 1/J(θ̂)) avec J(θ̂) = −ℓ″(θ̂) (MATH-234) ou I(θ̂) = n·I₁(θ̂) (EE-209) : IC de Wald θ̂ ± z₁₋α/₂/√J(θ̂). Bernoulli : p̂ ± z·√(p̂(1 − p̂)/n). Wilson (EE-209) inverse n(p̂ − p)²/(p(1 − p)) ≤ z² : centre p̃ = (np̂ + z²/2)/(n + z²), demi-largeur z√n/(n + z²)·√(p̂(1 − p̂) + z²/(4n)). Wald est peu fiable si p̂ est près de 0 ou 1, ou si n est petit. Exemple : n = 100, 36 succès : `se = √(0,36 · 0,64/100) = 0,048` ; `IC = 0,36 ± 0,094 = [0,266 ; 0,454]`.
- **Juge** : lignes `θ̂`, `ℓ″(θ̂)`, `J`, `se`, `IC` (`stat {decimals: 3}` ; EE-209 : `ciRule: 'outward'`) ; décision « Wald ou Wilson ? » · **Forme finale** : IC, puis « Interpréter ».
- **Niveaux** :
  - L1 (guidé) : J donné, se et bornes à trous.
  - L2 : J = −ℓ″(θ̂) à calculer (ℓ″ fourni).
  - L3 (choisir l'action) : ℓ″, évaluer en θ̂, changer de signe, inverser, racine, bornes.
  - L4 (libre) : Wald pour Poisson ou exponentielle à partir des données.
  - L5 (seul) : Wald et Wilson sur les mêmes données, puis QCM « lequel préférer quand p̂ = 0,02 et n = 50 ? ».
- **Générateur** : Bernoulli (n, p̂) ∈ {(100 ; 0,36), (400 ; 0,2), (625 ; 0,2), (900 ; 0,1), (100 ; 0,5)} (se rationnelle) ; Poisson (J = n/λ̂), exponentielle (J = n/λ̂²), densité de l'examen ex. 11 (J = n/(2θ̂²)) avec n et θ̂ tels que √J soit rationnel ; Wilson avec z = 1,96 (calculatrice) ou z = 2 (EE-209, calcul à la main, énoncé « on prend z = 2 »).
- **Corrigé type** : 36 succès sur n = 100 essais de Bernoulli, IC à 95 %.
  1. `p̂ = 0,36` — MLE
  2. `ℓ″(p̂) = −n/(p̂(1 − p̂)) ; J = 100/0,2304` — information observée
  3. `se = 1/√J = 0,048` — erreur standard
  4. `IC_Wald = 0,36 ± 1,96 · 0,048 = [0,266 ; 0,454]` — bornes
  5. `IC_Wilson : p̃ = 37,92/103,84 = 0,365 ; demi-largeur 0,092 → [0,273 ; 0,458]` — Wilson (EE-209)
  6. Interpréter (QCM, liste de `p-ci-mean`).
- **Aides** : 1 « La variance asymptotique est l'inverse de −ℓ″ évaluée en θ̂. » · 2 `se = √(0,36 · … /100)` · 3 `se = 0,048`.
- **Variantes d'examen** : `open` (MATH-234 : ex. 11.3 et 17c, avec « sous quelles hypothèses ») ; `coef` ; `mcq` (distracteurs : `p_wald_var_inverse` → se = √J, `p_wald_sign` → « variance négative, l'IC n'existe pas », `p_wilson_center` → centre p̂) ; `tf` : « L'IC de Wald a une couverture exacte de 95 % pour tout n » (faux ; contre-exemple : n = 10, p = 0,05, couverture réelle ≈ 0,40, l'app la montre par simulation).
- **Pièges** : `p_wald_var_inverse`, `p_wald_sign`, `p_wilson_center`, `p_se_forgot_sqrt_n`.
- **Sous-buts → crédit** : MLE, ℓ″ → `p-mle` ; information, erreur standard, bornes → `p-ci-wald` ; Wilson → `p-ci-wald`.

### `p-ci-round` — Arrondir un IC (chiffres significatifs)
- **Année** 16 · **Prérequis** `p-ci-mean`, `@alg:A-arrondir` · **Étiquettes** `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-ci-mean` : l'IC à arrondir.
- **Intro** : règle EE-209 (partie 3b, rappelée dans les « Tables ») : u avec 2 chiffres significatifs (1 accepté si son premier chiffre est 4 à 9) ; θ̂ et les bornes avec la même dernière décimale que u ; borne inférieure arrondie **vers le bas**, borne supérieure **vers le haut**. On arrondit les bornes calculées avec les valeurs **non arrondies**. Exemple : `u = 0,002415 → 0,0024` ; `[1,067456 ; 1,072286] → [1,0674 ; 1,0723]`.
- **Juge** : `stat {ciRule: 'outward'}` ; la précision est déduite de la ligne `u = …` de l'élève (si l'élève garde k = 1, la précision suit) · **Forme finale** : u, θ̂ et IC arrondis selon la règle.
- **Niveaux** :
  - L1 (guidé) : u déjà arrondi, bornes brutes données, sens d'arrondi à choisir.
  - L2 : arrondir u ; choisir la précision.
  - L3 (choisir l'action) : chiffres significatifs de u, précision, borne basse vers le bas, borne haute vers le haut, θ̂ au plus proche.
  - L4 (libre) : à partir de θ̂ et u bruts.
  - L5 (seul) : IC de Student complet (renvoie à `p-ci-mean`) avec l'arrondi final.
- **Générateur** : θ̂ à 5–7 décimales, u ∈ [10⁻⁴ ; 10] avec un premier chiffre tiré dans 1..9 ; on force un cas sur deux où l'arrondi au plus proche d'une borne diffère de l'arrondi vers l'extérieur, et un cas sur quatre où arrondir à partir de θ̂ et u déjà arrondis donne une autre borne.
- **Corrigé type** : θ̂ = 1,069871, u = 0,002415 (exemple du cours).
  1. `u = 0,0024` — 2 chiffres significatifs, précision 10⁻⁴
  2. `θ̂ = 1,0699` — même précision
  3. `θ̂ − u = 1,067456 → 1,0674` — vers le bas
  4. `θ̂ + u = 1,072286 → 1,0723` — vers le haut
  5. `IC = [1,0674 ; 1,0723]` — résultat
- **Aides** : 1 « La précision vient de u ; on élargit l'IC en arrondissant, jamais on ne le rétrécit. » · 2 `θ̂ − u = 1,067456 → 1,067…` · 3 `IC = [1,0674 ; 1,0723]`.
- **Variantes d'examen** : `mcq` (distracteurs : `p_ci_round_nearest` → [1,0675 ; 1,0723] ; `p_ci_round_from_rounded` donne ici la même option (1,0699 ± 0,0024), le QCM la garde une fois et lui attache les deux règles ; `p_ci_round_digits` → [1,067456 ; 1,072286] ou [1,06 ; 1,08] ; le générateur préfère les tirages où les trois pièges donnent trois options distinctes) ; `tf` : « On arrondit chaque borne au plus proche » (faux ; contre-exemple ci-dessus : 1,067456 donnerait 1,0675).
- **Pièges** : `p_ci_round_nearest`, `p_ci_round_from_rounded`, `p_ci_round_digits`.
- **Sous-buts → crédit** : chiffres significatifs → `@alg:A-arrondir` ; sens d'arrondi → `p-ci-round`.

### `p-max-sample` — Maximum d'un échantillon ; IC exact
- **Année** 15 · **Prérequis** `p-cont-quantile`, `p-indep`, `p-mle-special` · **Étiquettes** `MATH-234` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-mle-special` : le MLE de U[0, θ] est le maximum.
- **Intro** : M = max Xᵢ pour X₁, …, Xₙ iid : F_M(x) = Pr(tous ≤ x) = F(x)ⁿ, f_M = n·F^(n−1)·f. Minimum : 1 − (1 − F)ⁿ. Pour U[0, θ], M/θ a pour fonction de répartition uⁿ sur [0 ; 1] : c'est un pivot, et Pr(α^(1/n) ≤ M/θ ≤ 1) = 1 − α donne l'IC **exact** θ ∈ [M ; M·α^(−1/n)]. Exemple : n = 10, M = 9 : `IC₉₅ = [9 ; 9 · 0,05^(−1/10)] = [9 ; 12,14]`.
- **Juge** : `equiv` `{vars: ['x'], domain: {x: [0, θ]}}` pour F_M et f_M (θ symbole déclaré) ; `stat {decimals: 2}` pour l'IC · **Forme finale** : F_M ou f_M par morceaux ; IC exact.
- **Niveaux** :
  - L1 (guidé) : F donnée, F_M = F(x)ⁿ à trous.
  - L2 : F à calculer, puis F_M, puis f_M.
  - L3 (choisir l'action) : « tous ≤ x », puissance n, dériver, pivot, inverser l'inégalité.
  - L4 (libre) : densité du max (examen 2020–22, ex. 15 : f = 3x²/θ³ → f_M = 3n·x^(3n−1)/θ^(3n)).
  - L5 (seul) : plaques vaudoises (série 10) : IC exact à 95 % pour le plus grand numéro, et comparaison avec l'intuition.
- **Générateur** : densités c·x^k/θ^(k+1) sur [0 ; θ], uniformes ; minimum d'exponentielles (→ exp(nλ)) ; n ∈ {5, 10, 20}, α ∈ {0,05 ; 0,1} ; M entier.
- **Corrigé type** : X₁, …, X₁₀ iid U[0, θ], M = 9 ; IC exact à 95 %.
  1. `F_M(x) = (x/θ)¹⁰ pour 0 ≤ x ≤ θ` — maximum
  2. `Pr(M/θ ≤ u) = u¹⁰` — pivot
  3. `Pr(0,05^(1/10) ≤ M/θ ≤ 1) = 0,95` — encadrer
  4. `θ ∈ [M ; M · 0,05^(−1/10)] = [9 ; 12,14]` — inverser
- **Aides** : 1 « Le maximum est ≤ x si et seulement si toutes les données le sont. » · 2 `F_M(x) = (F(x))^…` · 3 `F_M(x) = (x/θ)¹⁰`.
- **Variantes d'examen** : `open` (MATH-234 : densité du max, puis IC exact, comme l'ex. 13.5 avec le χ²) ; `coef` ; `mcq` (distracteurs : `p_max_density_power` → f(x)ⁿ, `p_max_min_swap` → 1 − (1 − F)ⁿ).
- **Pièges** : `p_max_density_power`, `p_max_min_swap`, `p_ci_prob`.
- **Sous-buts → crédit** : « tous ≤ x » → `p-indep` ; F → `p-cont-quantile` ; pivot, IC → `p-max-sample`.

### `p-test-setup` — Formuler un test : H₀, H₁, région critique, p-valeur
- **Année** 15 · **Prérequis** `p-normal-std` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : H₀ est l'hypothèse gardée par défaut (souvent une égalité, le statu quo) ; H₁ est ce que l'on cherche à établir. Unilatéral si seul un sens intéresse (« dépasse le seuil »). Au niveau α, la région critique R vérifie Pr₀(T ∈ R) = α. p-valeur : probabilité, sous H₀, d'une statistique au moins aussi extrême que t_obs ; bilatéral : p_obs = 2(1 − Φ(|t_obs|)). On rejette H₀ ⇔ t_obs ∈ R ⇔ p_obs < α. Bilatéral : rejet au niveau α ⇔ θ₀ hors de l'IC à 1 − α. Exemple : `t_obs = 2,1, bilatéral` ; `p_obs = 2(1 − Φ(2,1)) = 2(1 − 0,982) = 0,036` (note : rejet à 5 %, pas à 1 %).
- **Juge** : décisions (H₀/H₁ dans un menu de 5 paires, côté, décision) ; `stat {decimals: 3}` pour p_obs ; lecture de table pour t_c · **Forme finale** : paire d'hypothèses, région critique ou p-valeur, décision.
- **Niveaux** :
  - L1 (guidé) : scénario avec le mot clé surligné (« dépasse »), paire à choisir parmi 3.
  - L2 : paire parmi 5 (examen 2020–22, ex. 1) ; côté à choisir.
  - L3 (choisir l'action) : poser H₀, poser H₁, côté, région critique, p-valeur, comparer à α.
  - L4 (libre) : à partir d'un t_obs donné, p-valeur et décision à 5 % et 1 %.
  - L5 (seul) : scénario EE-209 (spam, tumeur : laquelle des deux hypothèses mettre en H₀ et pourquoi), puis lien avec un IC donné.
- **Générateur** : banque d'au moins 12 scénarios (défauts d'une ligne de production, médicament, pièce truquée, compteurs électriques, teneur en alcool, référendum, filtre anti-spam, détection de tumeur, temps de réaction et alcool…), chacun avec sa bonne paire et son côté ; t_obs sur la grille de 0,025 entre 0,5 et 3,5 ; α ∈ {0,10 ; 0,05 ; 0,01}.
- **Corrigé type** : « la proportion p d'unités défectueuses dépasse-t-elle 1/1 000 ? », puis t_obs = 2,1 (bilatéral, pour l'exemple de p-valeur).
  1. décision `H₀ : p = 1/1 000 contre H₁ : p > 1/1 000` — hypothèses
  2. décision `unilatéral à droite` — côté
  3. `R = [z₀,₉₅ ; +∞[ = [1,645 ; +∞[` (EE-209) — région critique
  4. `p_obs = 2(1 − Φ(2,1)) = 0,036` — p-valeur (cas bilatéral)
  5. décision `0,036 < 0,05 : rejet à 5 % ; 0,036 > 0,01 : pas de rejet à 1 %` — comparer
- **Aides** : 1 « H₁ est ce que l'on veut montrer ; H₀ contient l'égalité. » · 2 `H₀ : p = 1/1 000 contre H₁ : p … 1/1 000` · 3 `H₁ : p > 1/1 000`.
- **Variantes d'examen** : `mcq` (MATH-234, 5 points ; distracteurs : `p_h0_direction` → H₀ : p > 1/1 000, `p_one_two_sided` → H₁ : p ≠ 1/1 000, H₁ : p < 1/1 000) ; `tf` : « Si p_obs = 0,03, on rejette H₀ à 5 % et à 1 % » (faux) ; « La p-valeur est la plus petite valeur de α pour laquelle on rejette H₀ » (vrai, EE-209).
- **Pièges** : `p_h0_direction`, `p_one_two_sided`, `p_pvalue_two_sided`, `p_pvalue_alpha_compare`.
- **Sous-buts → crédit** : hypothèses, côté, région, p-valeur → `p-test-setup` ; lecture de Φ → `p-normal-std`.

### `p-test-power` — Erreurs de type 1 et 2, puissance
- **Année** 15 · **Prérequis** `p-test-setup`, `p-normal-inverse` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `p-normal-inverse` : seuil critique donné par un quantile normal.
- **Intro** : erreur de type 1 : rejeter H₀ alors qu'elle est vraie (probabilité α). Type 2 : ne pas rejeter H₀ alors qu'elle est fausse (probabilité β). Puissance = 1 − β = Pr₁(rejeter). Test z unilatéral, H₁ : μ = μ₁ > μ₀ : β = Φ(z₁₋α − (μ₁ − μ₀)/(σ/√n)). La puissance augmente avec n, avec l'écart μ₁ − μ₀ et avec α. Rejeter H₀ quand H₁ est vraie n'est **pas** une erreur. Exemple : `δ = (103 − 100)/(10/√100) = 3` ; `β = Φ(1,645 − 3) = 1 − Φ(1,355) ≈ 0,09` (note : puissance ≈ 0,91).
- **Juge** : décisions (quel type d'erreur ?) ; `stat {decimals: 2}` pour β et la puissance (z hors grille, convention 3) ; `value` pour n minimal · **Forme finale** : β, puissance, ou n.
- **Niveaux** :
  - L1 (guidé) : tableau 2 × 2 (vérité × décision) à remplir avec « juste », « type 1 », « type 2 ».
  - L2 : scénario → type d'erreur (EE-209 2023, Q17).
  - L3 (choisir l'action) : seuil sous H₀, loi sous H₁, standardiser sous H₁, β, 1 − β.
  - L4 (libre) : puissance d'un test z unilatéral.
  - L5 (seul) : n minimal pour une puissance de 0,9 : n ≥ ((z₁₋α + z₀,₉)σ/(μ₁ − μ₀))² ; puis lecture de deux courbes de puissance (EE-209 Q18, repère interactif).
- **Générateur** : μ₀ entier, σ ∈ {5, 10, 20}, n carré parfait, δ ∈ [0,5 ; 4] ; α ∈ {0,05 ; 0,025 ; 0,01} ; banque de scénarios pour le type d'erreur (dont « on conclut μ > 40 alors que μ = 47 » : aucune erreur) ; courbes de puissance tracées par l'app pour deux tests de même α.
- **Corrigé type** : H₀ : μ = 100 contre H₁ : μ = 103, σ = 10, n = 100, α = 5 %, unilatéral.
  1. `se = 10/√100 = 1` — erreur standard
  2. `t_c = z₀,₉₅ = 1,645` — seuil sous H₀
  3. `sous H₁, T ~ N(3, 1)` — loi sous H₁
  4. `β = Pr₁(T < 1,645) = Φ(1,645 − 3) = 1 − Φ(1,355) ≈ 0,09` — type 2
  5. `puissance = 1 − β ≈ 0,91` — puissance
- **Aides** : 1 « Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁. » · 2 `β = Φ(1,645 − …)` · 3 `β = Φ(−1,355) ≈ 0,09`.
- **Variantes d'examen** : `mcq` (EE-209 Q17 et Q18 ; distracteurs : `p_type_errors_swap`, `p_error_when_correct`, `p_power_alpha`) ; `tf` : « La puissance d'un test au niveau 5 % vaut 95 % » (faux) ; « À α fixé, la puissance augmente avec n » (vrai) ; `coef`.
- **Pièges** : `p_type_errors_swap`, `p_error_when_correct`, `p_power_alpha`, `p_upper_tail`.
- **Sous-buts → crédit** : seuil → `p-test-setup` ; standardiser, Φ → `p-normal-std` ; β, puissance → `p-test-power`.

### `p-test-z` — Test z : σ connu, asymptotique, une proportion, Wald
- **Année** 15 · **Prérequis** `p-test-setup`, `p-clt-binom` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-clt-binom` : p̂ ≈ N(p, p(1 − p)/n).
- **Intro** : σ connu, données normales : T = (X̄ − μ₀)/(σ/√n) ~ N(0, 1) sous H₀. Asymptotique (n grand) : σ remplacé par s. Une proportion : T = (p̂ − p₀)/√(p₀(1 − p₀)/n) ; l'erreur standard calculée avec p̂ (test de Wald) est acceptée aussi, avec la note « c'est la version de Wald ». Wald pour un MLE (EE-209) : T = √(I(θ̂))·(θ̂ − θ₀). Exemple : `T = (0,6 − 0,5)/√(0,25/100) = 2` ; `p_obs = 2(1 − Φ(2)) = 0,046`.
- **Juge** : protocole d'un test (convention 7) ; `stat {decimals: 2}` pour T ; table ; décision ; « Interpréter » · **Forme finale** : décision au niveau α et phrase choisie.
- **Niveaux** :
  - L1 (guidé) : hypothèses posées, T à trous.
  - L2 : erreur standard sous H₀ à écrire ; t_c ou p_obs au choix.
  - L3 (choisir l'action) : protocole complet en touchant les étapes.
  - L4 (libre) : test d'une proportion unilatéral (référendum, série 11).
  - L5 (seul) : test de Wald sur le paramètre d'un MLE (renvoie à `p-mle`), décision et interprétation.
- **Générateur** : gabarits (a) σ connu (compteurs électriques de moyenne nominale 1 000) ; (b) proportion bilatérale (pièce) ; (c) proportion unilatérale (référendum, défauts) ; (d) asymptotique sur une moyenne (n ≥ 200) ; (e) Wald (Poisson, exponentielle). z_obs sur la grille, à au moins 0,1 du seuil sauf au niveau 5.
- **Corrigé type** : pièce lancée 100 fois, 60 piles ; H₀ : p = 0,5 contre H₁ : p ≠ 0,5, α = 5 %.
  1. décision `test z d'une proportion, bilatéral` — choisir le test
  2. `se₀ = √(0,5 · 0,5/100) = 0,05` — erreur standard sous H₀
  3. `t_obs = (0,6 − 0,5)/0,05 = 2` — statistique
  4. `p_obs = 2(1 − Φ(2)) = 2 · 0,023 = 0,046` — p-valeur
  5. décision `0,046 < 0,05 : rejeter H₀ à 5 %` — décider
  6. Interpréter (QCM) : « Si la pièce était équilibrée, un écart au moins aussi grand arriverait dans 4,6 % des séries de 100 lancers » ✓ ; « La pièce est truquée avec probabilité 95,4 % » (`p_pvalue_h0`) ; « La probabilité que H₀ soit vraie est 0,046 » (`p_pvalue_h0`) ; « On rejetterait aussi à 1 % » (`p_reject_10_5`).
- **Aides** : 1 « Sous H₀, l'écart-type de p̂ est √(p₀(1 − p₀)/n). » · 2 `t_obs = (0,6 − 0,5)/…` · 3 `t_obs = 2`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_pvalue_two_sided` → 0,023, `p_se_forgot_sqrt_n`, `p_one_two_sided`) ; `tf` : « Un test bilatéral à 5 % rejette H₀ si et seulement si p₀ est hors de l'IC à 95 % (même statistique) » (vrai).
- **Pièges** : `p_pvalue_two_sided`, `p_se_forgot_sqrt_n`, `p_one_two_sided`, `p_upper_tail`, `p_pvalue_h0`.
- **Sous-buts → crédit** : hypothèses, p-valeur → `p-test-setup` ; statistique, décision → `p-test-z` ; interprétation → `p-interpret`.

### `p-test-t1` — Test t à un échantillon ; données appariées
- **Année** 15 · **Prérequis** `p-test-z`, `p-ci-mean`, `p-interpret` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-test-z` : même démarche que le test z ; `p-ci-mean` : quantile de Student et erreur standard S/√n.
- **Intro** : données normales, σ inconnu : T = (X̄ − μ₀)/(S/√n) ~ t_{n−1} sous H₀ ; bilatéral à 5 % : rejet si |t_obs| > s₅(n − 1). Données appariées (mêmes individus mesurés deux fois) : on calcule les différences dᵢ = yᵢ − xᵢ et on fait un test t à un échantillon sur d, avec H₀ : μ_d = 0. Exemple : `t_obs = (88 − 84)/(√10/√5) = 2,83` ; `s₅(4) = 2,776` (note : rejet).
- **Juge** : protocole d'un test (convention 7) ; lignes `x̄`, `s²`, `s/√n`, `t_obs` (`stat {decimals: 2}`), `ν` (`value`), `t_c` (table) · **Forme finale** : décision et interprétation.
- **Niveaux** :
  - L1 (guidé) : x̄ et s donnés ; T à trous ; t_c à lire.
  - L2 : x̄ et s à calculer ; ν à donner.
  - L3 (choisir l'action) : protocole en touchant les étapes ; décision « apparié ou non ? » pour le gabarit apparié.
  - L4 (libre) : données brutes.
  - L5 (seul) : problème MATH-234 (examen 2020–22, ex. 12.2) : formuler, calculer, conclure ; ou données appariées (somnifères A et B, série 11).
- **Générateur** : n ∈ {5, 6, 9, 10, 16} ; données selon la convention 10 ; μ₀ tel que |t_obs − t_c| ≥ 0,1 aux niveaux 1 à 4 ; à L5, un cas « limite » sur trois. Appariés : deux listes de n ∈ 5..10 dont les différences ont une moyenne entière.
- **Corrigé type** : 5 lancers de javelot `86, 90, 84, 92, 88` ; H₀ : μ = 84 contre H₁ : μ ≠ 84, α = 5 %.
  1. décision `σ inconnu, données normales → test t, ν = 4` — choisir le test
  2. `x̄ = 88 ; s² = 40/4 = 10` — résumés
  3. `s/√n = √(10/5) = √2` — erreur standard
  4. `t_obs = 4/√2 ≈ 2,83` — statistique
  5. `t_c = s₅(4) = 2,776` — table
  6. décision `|2,83| > 2,776 : rejeter H₀` — décider
  7. Interpréter (QCM) : « Au niveau 5 %, les données contredisent μ = 84 » ✓ ; « μ = 88 est maintenant prouvé » ; « H₀ a 5 % de chances d'être vraie » (`p_pvalue_h0`) ; « l'écart est grand, donc important en pratique » (`p_significant_large`).
  Gabarit apparié : différences `1, 2, 0, 3, 1, 5` → `d̄ = 2, s_d = 1,79, t_obs = 2,74 > s₅(5) = 2,571`.
- **Aides** : 1 « σ est inconnu : Student à n − 1 degrés de liberté. » · 2 `t_obs = (88 − 84)/(…/√5)` · 3 `t_obs = 4/√2 ≈ 2,83`.
- **Variantes d'examen** : `open` (MATH-234) ; `coef` (t_obs) ; `mcq` (distracteurs : `p_t_vs_z` → seuil 1,96, `p_df_wrong` → s₅(5) = 2,571, `p_sd_n`) ; `tf` : « Des mesures avant/après sur les mêmes personnes se testent comme deux échantillons indépendants » (faux) ; « Ne pas rejeter H₀ prouve que μ = μ₀ » (faux).
- **Pièges** : `p_t_vs_z`, `p_df_wrong`, `p_paired_as_two`, `p_sd_n`, `p_accept_h0`.
- **Sous-buts → crédit** : x̄, s → `p-desc-summary` ; test → `p-test-t1` ; interprétation → `p-interpret`.

### `p-test-t2` — Test t à deux échantillons, variance poolée (et test F)
- **Année** 15 · **Prérequis** `p-test-t1` · **Étiquettes** `MATH-234` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-test-t1` : même statistique t, avec deux échantillons.
- **Intro** : deux échantillons normaux **indépendants** de même variance : s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2) ; T = (x̄₁ − x̄₂)/(s_p·√(1/n₁ + 1/n₂)) ~ t_{n₁+n₂−2} sous H₀ : μ₁ = μ₂. Avant, le cours vérifie l'égalité des variances par F = s₁²/s₂² ~ F_{n₁−1, n₂−1} (quantiles donnés par l'énoncé). Si ce test rejette, il faudrait le test de Welch, qui n'est pas au programme : l'item s'arrête et le dit. Exemple : `s_p² = (4 · 2,5 + 4 · 5)/8 = 3,75` ; `t_obs = −3/√(3,75 · 0,4) = −2,45`.
- **Juge** : protocole d'un test ; lignes `F`, `s_p²`, `se`, `t_obs`, `ν`, `t_c` · **Forme finale** : décision et interprétation.
- **Niveaux** :
  - L1 (guidé) : résumés donnés ; s_p² et T à trous.
  - L2 : test F (quantiles fournis), puis s_p².
  - L3 (choisir l'action) : F, poolée, erreur standard, ν = n₁ + n₂ − 2, table.
  - L4 (libre) : données brutes, n₁ ≠ n₂.
  - L5 (seul) : chute des personnes âgées (série 11) ou poids de rats (cours) : test F, puis test t unilatéral au niveau 2,5 % (table MATH-234).
- **Générateur** : n₁, n₂ ∈ 4..10 (n₁ ≠ n₂ aux niveaux 4 et 5) ; données selon la convention 10 ; rapport s₁²/s₂² dans [1/3 ; 3] sauf un cas sur dix (test F rejeté, l'item s'arrête) ; quantiles F tirés d'une petite table interne (F₄,₄ : 0,104 et 9,605 ; F₉,₉ : 0,2484 et 4,0259 ; …) affichée dans l'énoncé.
- **Corrigé type** : groupe 1 `3, 4, 5, 6, 7` ; groupe 2 `5, 7, 8, 9, 11` ; H₀ : μ₁ = μ₂, bilatéral à 5 %.
  1. `x̄₁ = 5, s₁² = 2,5 ; x̄₂ = 8, s₂² = 5` — résumés
  2. `F = 2,5/5 = 0,5 ∈ [0,104 ; 9,605]` — variances compatibles
  3. `s_p² = (4 · 2,5 + 4 · 5)/8 = 3,75` — variance poolée
  4. `se = √(3,75 · (1/5 + 1/5)) = √1,5 ≈ 1,225` — erreur standard
  5. `t_obs = (5 − 8)/1,225 ≈ −2,45 ; ν = 8` — statistique
  6. `t_c = s₅(8) = 2,306` — table
  7. décision `|−2,45| > 2,306 : rejeter H₀` — décider
  8. Interpréter (QCM, liste de `p-test-t1`).
- **Aides** : 1 « Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. » · 2 `s_p² = (4 · 2,5 + 4 · …)/8` · 3 `s_p² = 3,75`.
- **Variantes d'examen** : `open` (MATH-234) ; `coef` ; `mcq` (distracteurs : `p_pooled_average` (n₁ ≠ n₂), `p_df_wrong` → ν = 9, `p_two_sample_se` → √(s₁² + s₂²)) ; `tf` : « Le test t poolé suppose les deux variances égales » (vrai).
- **Pièges** : `p_pooled_average`, `p_df_wrong`, `p_two_sample_se`, `p_paired_as_two`.
- **Sous-buts → crédit** : résumés → `p-desc-summary` ; test → `p-test-t2`.

### `p-test-two-prop` — Comparer deux proportions
- **Année** 15 · **Prérequis** `p-test-z` · **Étiquettes** `MATH-234` · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : H₀ : p₁ = p₂. Sous H₀, on estime la proportion commune p̂ = (k₁ + k₂)/(n₁ + n₂) et T = (p̂₁ − p̂₂)/√(p̂(1 − p̂)(1/n₁ + 1/n₂)) ≈ N(0, 1). Exemple : `p̂ = 100/400 = 0,25` ; `T = 0,1/√(0,25 · 0,75 · 0,01) ≈ 2,31`.
- **Juge** : protocole d'un test ; `stat {decimals: 2}` · **Forme finale** : décision et interprétation.
- **Niveaux** : L1 p̂ et se à trous ; L2 proportion poolée à calculer ; L3 protocole en touchant les étapes ; L4 libre ; L5 version unilatérale et p-valeur encadrée par la table.
- **Générateur** : n₁, n₂ ∈ {100, 200, 400} ; p̂ᵢ multiples de 0,05 ; on garde les tirages où la se est simple à 3 chiffres. Gabarits : (a) deux traitements ; (b) deux machines ; (c) sondage dans deux régions.
- **Corrigé type** : 60 guérisons sur 200 (traitement A), 40 sur 200 (B) ; bilatéral à 5 %.
  1. `p̂₁ = 0,30 ; p̂₂ = 0,20` — proportions
  2. `p̂ = 100/400 = 0,25` — proportion poolée sous H₀
  3. `se = √(0,25 · 0,75 · (1/200 + 1/200)) ≈ 0,0433` — erreur standard
  4. `t_obs = 0,10/0,0433 ≈ 2,31` — statistique
  5. décision `|2,31| > 1,96 : rejeter H₀` ; `p_obs ≈ 2(1 − 0,990) = 0,02` — décider
  6. Interpréter (QCM).
- **Aides** : 1 « Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. » · 2 `p̂ = (60 + 40)/(… + …)` · 3 `p̂ = 0,25`.
- **Variantes d'examen** : `coef` ; `mcq` (distracteurs : `p_two_prop_no_pool` → se = √(0,3 · 0,7/200 + 0,2 · 0,8/200) ≈ 0,0430, `p_two_sample_se`) ; `tf` : « Sous H₀, on estime p par la moyenne de p̂₁ et p̂₂, quels que soient n₁ et n₂ » (faux ; contre-exemple n₁ = 100, n₂ = 300).
- **Pièges** : `p_two_prop_no_pool`, `p_pvalue_two_sided`, `p_two_sample_se`.
- **Sous-buts → crédit** : test z → `p-test-z` ; poolée → `p-test-two-prop`.

### `p-test-chi2-gof` — Test χ² d'adéquation
- **Année** 15 · **Prérequis** `p-test-setup`, `p-family`, `p-binom` · **Étiquettes** `MATH-234` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-test-setup` : hypothèses et p-valeur ; `p-family` : loi χ²(r).
- **Intro** : k classes, effectifs observés oᵢ, effectifs attendus eᵢ = n·pᵢ (des **effectifs**, pas des proportions). T = Σ(oᵢ − eᵢ)²/eᵢ ~ χ²(r) sous H₀, avec r = k − 1 si les pᵢ sont fixées, r = k − 1 − c si c paramètres sont estimés sur les données. On rejette pour T grand (test unilatéral à droite). Exemple : dé lancé 60 fois : `T = (25 + 4 + 1 + 4 + 0 + 100)/10 = 13,4` ; `r = 5, s₅ = 11,070` (note : rejet à 5 %).
- **Juge** : protocole d'un test ; `table` pour les eᵢ et les termes (colonne dérivée recalculée à partir des valeurs de l'élève) ; `stat {decimals: 2}` pour T ; `value` pour r · **Forme finale** : décision, encadrement de la p-valeur par la table (0,01 < p < 0,05), interprétation.
- **Niveaux** :
  - L1 (guidé) : eᵢ donnés, termes à trous.
  - L2 : eᵢ à calculer ; r à choisir.
  - L3 (choisir l'action) : eᵢ, termes, somme, r, table, décision.
  - L4 (libre) : loi fixée (QI en 6 classes avec les probabilités normales).
  - L5 (seul) : paramètre estimé (Poisson ajusté : c = 1), puis encadrement de la p-valeur.
- **Générateur** : k ∈ 3..6 ; n tel que tous les eᵢ soient entiers et ≥ 5 ; écarts entiers choisis pour que T tombe nettement d'un côté d'un seuil de la Table 4. Gabarits : (a) dé ; (b) loi fixée en classes (QI, 1 000 personnes : e = 23, 136, 341, 341, 136, 23) ; (c) Poisson ajusté ; (d) génétique (proportions 9:3:3:1).
- **Corrigé type** : dé lancé 60 fois, effectifs `5, 8, 9, 8, 10, 20` ; H₀ : dé équilibré.
  1. `eᵢ = 60 · 1/6 = 10` — effectifs attendus
  2. `T = (25 + 4 + 1 + 4 + 0 + 100)/10 = 13,4` — statistique
  3. `r = 6 − 1 = 5` — degrés de liberté
  4. `s₅(5) = 11,070 ; s₁(5) = 15,086` — table
  5. décision `11,070 < 13,4 < 15,086 : rejet à 5 %, pas à 1 % ; 0,01 < p < 0,05` — décider
  6. Interpréter (QCM) : « Les données sont peu compatibles avec un dé équilibré au niveau 5 % » ✓ ; « Le dé est truqué avec probabilité 95 % » (`p_pvalue_h0`) ; « Le 6 sort deux fois plus souvent, c'est prouvé » ; « À 1 %, on a prouvé que le dé est équilibré » (`p_accept_h0`).
- **Aides** : 1 « Compare des effectifs, pas des fréquences ; r = k − 1 − (paramètres estimés). » · 2 `T = (5 − 10)²/10 + (8 − 10)²/10 + …` · 3 `T = 13,4`.
- **Variantes d'examen** : `open` (MATH-234) ; `coef` (T ou r) ; `mcq` (distracteurs : `p_chi2_proportions`, `p_chi2_df` → r = 6, `p_chi2_divide_obs`) ; `tf` : « Un grand T conduit à rejeter H₀ » (vrai) ; « Si on estime un paramètre, r ne change pas » (faux).
- **Pièges** : `p_chi2_proportions`, `p_chi2_df`, `p_chi2_divide_obs`, `p_accept_h0`.
- **Sous-buts → crédit** : eᵢ → `p-binom` (gabarits binomiaux) ou `p-test-chi2-gof` ; statistique, décision → `p-test-chi2-gof`.

### `p-test-chi2-indep` — Test χ² d'indépendance
- **Année** 15 · **Prérequis** `p-test-chi2-gof`, `p-joint-disc` · **Étiquettes** `MATH-234` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-test-chi2-gof` : même statistique Σ(o − e)²/e.
- **Intro** : tableau de contingence h × k ; sous H₀ (indépendance), e_ij = n_i·· n_·j/n ; T = Σ(n_ij − e_ij)²/e_ij ~ χ²((h − 1)(k − 1)). Exemple : tableau `[[30, 20], [20, 30]]` : `e_ij = 50 · 50/100 = 25` ; `T = 4 · 25/25 = 4 > 3,841`.
- **Juge** : protocole ; `table` (effectifs attendus, termes) ; `stat`, `value` · **Forme finale** : décision et interprétation.
- **Niveaux** : L1 marges et e_ij à trous ; L2 e_ij à calculer ; L3 protocole en touchant ; L4 tableau 2 × 3 libre ; L5 tableau 3 × 2 de l'examen 2018 (assurance, salariés ou contractuels), avec H₀ et H₁ formulées en mots.
- **Générateur** : tableaux 2 × 2, 2 × 3, 3 × 3 ; marges choisies pour que les e_ij soient entiers (ou à une décimale) et ≥ 5 ; écart construit par ±d sur une diagonale. Gabarits : (a) yeux et cheveux ; (b) assurance ; (c) traitement et guérison.
- **Corrigé type** : traitement (oui/non) × guérison (oui/non) : `[[30, 20], [20, 30]]`, α = 5 %.
  1. `marges : 50, 50 ; 50, 50 ; n = 100` — marges
  2. `e_ij = 25 pour chaque case` — effectifs attendus sous H₀
  3. `T = 4 · (5²/25) = 4` — statistique
  4. `r = (2 − 1)(2 − 1) = 1 ; s₅(1) = 3,841` — table
  5. décision `4 > 3,841 : rejeter l'indépendance` — décider
  6. Interpréter (QCM) : « Traitement et guérison ne semblent pas indépendants » ✓ ; « Le traitement cause la guérison » (`p_corr_causal`) ; « 95 % des patients guérissent » ; « Le traitement est très efficace » (`p_significant_large`).
- **Aides** : 1 « e_ij = (total de la ligne × total de la colonne)/n. » · 2 `e₁₁ = 50 · 50/…` · 3 `e₁₁ = 25`.
- **Variantes d'examen** : `open`, `coef`, `mcq` (distracteurs : `p_chi2_df_indep` → r = 3, `p_chi2_expected_uniform` → e = n/(hk), `p_corr_causal`) ; `tf` : « Rejeter l'indépendance montre un lien de cause à effet » (faux).
- **Pièges** : `p_chi2_df_indep`, `p_chi2_expected_uniform`, `p_corr_causal`, `p_accept_h0`.
- **Sous-buts → crédit** : marges → `p-joint-disc` ; test → `p-test-chi2-indep`.

### `p-test-chi2-var` — χ² sur une variance : test et IC
- **Année** 16 · **Prérequis** `p-test-setup`, `p-family` · **Étiquettes** `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-test-setup` : H₀, H₁ et région critique.
- **Intro** : données normales, μ inconnue : T = (n − 1)S²/σ₀² ~ χ²(n − 1) sous H₀ : σ = σ₀. Pour H₁ : σ > σ₀, on rejette si T > χ²_{n−1 ; 1−α}. IC pour σ² : [(n − 1)s²/χ²_{1−α/2} ; (n − 1)s²/χ²_{α/2}] (les deux quantiles sont donnés par l'énoncé ; la Table 4 ne donne que la queue supérieure). Exemple : `T = 10 · 15/10 = 15 < 18,307` (note : pas de rejet).
- **Juge** : protocole ; `stat {decimals: 2}` ; EE-209 : `ciRule: 'outward'` pour l'IC · **Forme finale** : décision, ou IC pour σ² (ou σ).
- **Niveaux** : L1 T à trous ; L2 côté et quantile ; L3 protocole en touchant ; L4 libre ; L5 test puis IC pour σ, avec l'arrondi EE-209.
- **Générateur** : n ∈ {6, 11, 16, 21} ; s² et σ₀² entiers ; quantiles χ² de la Table 4 (queue supérieure) et quantiles inférieurs fournis (3,247 et 20,483 pour r = 10 ; 0,831 et 12,833 pour r = 5 ; …).
- **Corrigé type** : n = 11, s² = 15 ; H₀ : σ² = 10 contre H₁ : σ² > 10, α = 5 %.
  1. `T = (11 − 1) · 15/10 = 15` — statistique
  2. `r = 10 ; s₅(10) = 18,307` — table (queue supérieure)
  3. décision `15 < 18,307 : ne pas rejeter H₀` — décider
  4. `IC₉₅(σ²) = [150/20,483 ; 150/3,247] = [7,32 ; 46,20]` — IC (quantiles fournis)
  5. Interpréter (QCM) : « Les données ne permettent pas de conclure que σ² > 10 » ✓ ; « σ² = 10 est démontré » (`p_accept_h0`).
- **Aides** : 1 « (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté. » · 2 `T = 10 · 15/…` · 3 `T = 15`.
- **Variantes d'examen** : `mcq` (distracteurs : `p_chi2_var_n` → T = 16,5, `p_chi2_var_inverted` → 6,67, `p_chi2_ci_swapped` → bornes inversées) ; `tf` : « La borne supérieure de l'IC pour σ² utilise le petit quantile du χ² » (vrai).
- **Pièges** : `p_chi2_var_n`, `p_chi2_var_inverted`, `p_chi2_ci_swapped`, `p_accept_h0`.
- **Sous-buts → crédit** : loi χ² → `p-family` ; test, IC → `p-test-chi2-var`.

### `p-interpret` — Interpréter une p-valeur ou un IC
- **Année** 15 · **Prérequis** `p-ci-mean`, `p-test-setup` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `p-ci-mean` : l'IC à interpréter ; `p-test-setup` : la p-valeur à interpréter.
- **Intro** : la p-valeur est Pr(données au moins aussi extrêmes | H₀), pas Pr(H₀ | données). Ne pas rejeter H₀ ne prouve pas H₀. Un IC à 95 % vient d'une **méthode** qui capture θ dans 95 % des répétitions ; une fois calculé, il contient θ ou non. Rejeté à 5 % ⇒ rejeté à 10 %, pas l'inverse. Significatif ne veut pas dire important. Bilatéral : rejet au niveau α ⇔ θ₀ hors de l'IC à 1 − α. Vingt tests à 5 % sur des H₀ vraies donnent environ un rejet par hasard (p-hacking). Exemple : `IC₉₅(p) = [0,2 ; 0,6]` ; `p = 0,7 est rejeté à 5 %` (note : 0,7 est hors de l'IC).
- **Juge** : items `mcq` (4 options, une juste) et `tf` ; pas de lignes · **Forme finale** : l'option choisie.
- **Niveaux** (types propres à cette compétence) :
  - L1 : une phrase avec les mots clés surlignés, « juste ou contresens ? ».
  - L2 : QCM à 4 phrases, une juste.
  - L3 : « laquelle est **fausse** ? » (format de l'examen MATH-234, ex. 2).
  - L4 : un IC donné et 5 hypothèses à classer (rejetée ou non au niveau correspondant).
  - L5 : série de 5 QCM et vrai/faux minutée, au format EE-209 (+3/−1, +1/−1).
- **Générateur** : contextes (randonnée, alcool, compteurs, médicament, sondage) × gabarits de phrases ; la juste vient d'un modèle de phrase correcte ; les fausses viennent des pièges `p_pvalue_h0`, `p_ci_prob`, `p_ci_data`, `p_ci_xbar`, `p_accept_h0`, `p_reject_10_5`, `p_significant_large`, `p_multiple_tests`, `p_corr_causal`. IC et p-valeurs tirés au hasard ; les hypothèses testées sont choisies dedans, dehors et sur le bord de l'IC.
- **Corrigé type** : IC à 95 % [0,2 ; 0,6] pour la proportion p de Suisses qui partent en randonnée le week-end ; quelle affirmation est fausse ?
  1. `0,7 ∉ [0,2 ; 0,6]` — comparer à l'IC
  2. décision `« 70 % ne peut être rejeté » est fausse : 0,7 est rejeté au niveau 5 %` — lien IC et test
  3. décision `« plus de 10 % » et « moins de 70 % » sont raisonnables ; « 30 % ne peut être rejeté » est juste` — les autres options
  4. décision `« 95 % des IC construits ainsi contiendraient p » est juste` — sens de l'IC
- **Aides** : 1 « Un IC à 95 % contient exactement les valeurs que le test bilatéral à 5 % ne rejette pas. » · 2 « 0,7 est-il dans [0,2 ; 0,6] ? » · 3 « Non : 0,7 est rejeté à 5 %. »
- **Variantes d'examen** : `mcq` (MATH-234 : ex. 2 ; EE-209 2023 : Q10, Q11, Q16) ; `tf` : « Si on rejette H₀ à 10 %, on la rejette à 5 % » (faux ; contre-exemple p_obs = 0,07) ; « Deux IC à 95 % calculés sur des données différentes : leur intersection est un IC à 95 % » (faux ; EE-209 Q10).
- **Pièges** : `p_pvalue_h0`, `p_ci_prob`, `p_ci_data`, `p_ci_xbar`, `p_accept_h0`, `p_reject_10_5`, `p_significant_large`, `p_multiple_tests`, `p_ci_intersection`.
- **Sous-buts → crédit** : toutes les décisions → `p-interpret`.

### `p-reg-ls` — Droite des moindres carrés, r et R²
- **Année** 15 · **Prérequis** `p-cov-corr`, `l-orth-lsq`, `p-desc-summary` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-cov-corr` : r = S_xy/√(S_xx·S_yy).
- **Intro** : modèle Yᵢ = α + βxᵢ + εᵢ. β̂ = S_xy/S_xx = Σ(xᵢ − x̄)(yᵢ − ȳ)/Σ(xᵢ − x̄)² = r·s_y/s_x ; α̂ = ȳ − β̂x̄ ; la droite passe par (x̄, ȳ) ; les résidus somment à 0. r = S_xy/√(S_xx·S_yy) ; R² = r² = ESS/TSS. La régression de x sur y n'est **pas** la droite inverse (pente r·s_x/s_y). Exemple : `β̂ = 6/10 = 0,6 ; α̂ = 4 − 0,6 · 3 = 2,2` ; `R² = 36/60 = 0,6`.
- **Juge** : lignes `x̄`, `ȳ`, `S_xx`, `S_xy`, `S_yy`, `β̂`, `α̂`, `r`, `R²` (`prob` si exact, sinon `stat {decimals: 3}`) · **Forme finale** : droite ŷ = α̂ + β̂x, puis r ou R² demandé.
- **Niveaux** :
  - L1 (guidé) : tableau des écarts donné, sommes à trous.
  - L2 : tableau à remplir (`table`, colonnes dérivées (xᵢ − x̄)(yᵢ − ȳ) recalculées).
  - L3 (choisir l'action) : moyennes, S_xx, S_xy, pente, ordonnée, r, R².
  - L4 (libre) : à partir des sommes brutes Σx, Σy, Σxy, Σx² (série 13, ex. 4).
  - L5 (seul) : à partir de r, s_x, s_y et des moyennes (série 13, ex. 2), puis la droite de x sur y (EE-209 Q20).
- **Générateur** : n ∈ 4..8, x entiers équidistants (x̄ entier ou demi-entier), y entiers avec ȳ entier ; S_xy/S_xx de dénominateur divisant 10 aux niveaux 1 à 3. Gabarits : (a) données brutes ; (b) sommes brutes ; (c) résumés r, s_x, s_y ; (d) ressort (examen 2020–22, ex. 10.1, sommes centrées données). Item `code` (L4) : compléter `sxy = sxy + (x[i] - mx) * ???` (réponse `(y[i] - my)`).
- **Corrigé type** : x = `1, 2, 3, 4, 5`, y = `2, 4, 5, 4, 5`.
  1. `x̄ = 3 ; ȳ = 4` — moyennes
  2. `S_xx = 10 ; S_xy = 4 + 0 + 0 + 0 + 2 = 6 ; S_yy = 6` — sommes centrées
  3. `β̂ = 6/10 = 0,6` — pente
  4. `α̂ = 4 − 0,6 · 3 = 2,2` — ordonnée à l'origine
  5. `r = 6/√60 ≈ 0,775 ; R² = 0,6` — qualité de l'ajustement
- **Aides** : 1 « Centre d'abord : pente = S_xy/S_xx, puis la droite passe par (x̄, ȳ). » · 2 `β̂ = …/10` · 3 `β̂ = 0,6`.
- **Variantes d'examen** : `coef` (MATH-234, ex. 10.1) ; `mcq` (EE-209 Q20 ; distracteurs : `p_reg_x_on_y` → x = (y − b)/a, `p_reg_slope_swap` → S_xy/S_yy, `p_reg_sums_raw` → Σxy/Σx²) ; `tf` : « R² = r » (faux ; ici r = 0,775, R² = 0,6) ; « La droite des moindres carrés passe par (x̄, ȳ) » (vrai).
- **Pièges** : `p_reg_x_on_y`, `p_reg_slope_swap`, `p_reg_sums_raw`, `p_r2_r`, `p_corr_causal`.
- **Sous-buts → crédit** : moyennes → `p-desc-summary` ; moindres carrés → `l-orth-lsq` ; pente, ordonnée, R² → `p-reg-ls`.

### `p-reg-test` — Tests t et IC sur les coefficients
- **Année** 15 · **Prérequis** `p-reg-ls`, `p-test-t1` · **Étiquettes** `MATH-234` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-test-t1` : statistique t et quantile de Student.
- **Intro** : σ̂² = RSS/(n − 2) avec RSS = Σ(yᵢ − ŷᵢ)² = S_yy − β̂S_xy. se(β̂) = σ̂/√S_xx ; se(α̂) = σ̂·√(1/n + x̄²/S_xx). T = (β̂ − β₀)/se(β̂) ~ t_{n−2} sous H₀ (de même pour α) ; IC β̂ ± t·se(β̂). Exemple : `σ̂² = 2,4/3 = 0,8` ; `t_obs = 0,6/√(0,8/10) ≈ 2,12 < s₅(3) = 3,182`.
- **Juge** : protocole d'un test ; lignes `RSS`, `σ̂²`, `se`, `t_obs`, `ν`, `t_c` · **Forme finale** : décision et interprétation (et IC si demandé).
- **Niveaux** : L1 σ̂² donné, se et T à trous ; L2 RSS et σ̂² à calculer ; L3 protocole en touchant ; L4 test sur α (loi des ressorts : l'élongation est-elle proportionnelle au poids ?) ; L5 problème MATH-234 complet (examen 2020–22, ex. 10) : α̂, β̂, test sur α au seuil de 5 %.
- **Générateur** : jeux de données de `p-reg-ls` ; sommes centrées et RSS donnés (gabarit ressort) ; n ∈ 5..12 (ν = n − 2 dans la Table 3).
- **Corrigé type** : données de `p-reg-ls` ; H₀ : β = 0 contre H₁ : β ≠ 0, α = 5 %.
  1. `RSS = S_yy − β̂·S_xy = 6 − 3,6 = 2,4` — résidus
  2. `σ̂² = 2,4/(5 − 2) = 0,8` — variance (n − 2)
  3. `se(β̂) = √(0,8/10) ≈ 0,283` — erreur standard
  4. `t_obs = 0,6/0,283 ≈ 2,12 ; ν = 3` — statistique
  5. `t_c = s₅(3) = 3,182` — table
  6. décision `|2,12| < 3,182 : ne pas rejeter H₀` — décider
  7. Interpréter (QCM) : « Avec 5 points, les données ne suffisent pas à montrer une pente non nulle » ✓ ; « Il n'y a pas de lien entre x et y » (`p_accept_h0`) ; « La pente vaut 0 » (`p_accept_h0`) ; « R² = 0,6 prouve la pente » .
- **Aides** : 1 « σ̂² divise par n − 2 : deux paramètres estimés. » · 2 `se(β̂) = √(σ̂²/…)` · 3 `se(β̂) = √0,08`.
- **Variantes d'examen** : `open` et `coef` (MATH-234, ex. 10.2) ; `mcq` (distracteurs : `p_reg_sigma_n` → σ̂² = 0,48, `p_df_wrong` → ν = 4, `p_reg_se_alpha`) ; `tf` : « Le test t sur β et le test F de la régression simple donnent la même décision » (vrai : F = T²).
- **Pièges** : `p_reg_sigma_n`, `p_df_wrong`, `p_reg_se_alpha`, `p_accept_h0`.
- **Sous-buts → crédit** : droite → `p-reg-ls` ; test → `p-reg-test`.

### `p-reg-multi` — Régression multiple, matrice de design, test F emboîté
- **Année** 15 · **Prérequis** `p-reg-test`, `l-orth-lsq` · **Étiquettes** `MATH-234`, `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-reg-test` : test t sur chaque coefficient.
- **Intro** : y = Xβ + ε ; équations normales XᵀXβ̂ = Xᵀy, β̂ = (XᵀX)⁻¹Xᵀy si les colonnes de X sont indépendantes ; S² = ‖y − Xβ̂‖²/(n − p). Test βᵢ = 0 : T = β̂ᵢ/(S√vᵢᵢ) ~ t_{n−p}, vᵢᵢ = ((XᵀX)⁻¹)ᵢᵢ. Modèles emboîtés (q < p colonnes) : F = ((SC_q − SC_p)/(p − q))/(SC_p/(n − p)) ~ F_{p−q, n−p} (quantile donné). Exemple : `F = (20/2)/(30/16) ≈ 5,33 > F₂,₁₆ ; ₀,₉₅ = 3,63`.
- **Juge** : `matrix` (matrice de design, jugée colonne par colonne à une permutation près, et refusée si ses colonnes sont dépendantes) ; protocole d'un test pour F et T · **Forme finale** : X, β̂, ou décision.
- **Niveaux** : L1 colonnes de X à cocher ; L2 X à construire pour un modèle décrit ; L3 actions (XᵀX, inverse 2 × 2, Xᵀy, β̂, F) ; L4 test F libre ; L5 EE-209 Q19 (deux races, pente commune) puis un test F sur la même question.
- **Générateur** : (a) modèle en mots → X (indicatrices de groupes, constante, x², interaction) ; (b) XᵀX 2 × 2 à inverse exact et Xᵀy entier → β̂ (renvoie à `l-orth-lsq`) ; (c) test t sur un coefficient avec S et vᵢᵢ donnés ; (d) test F avec SC_q, SC_p, n, p, q et le quantile F fourni.
- **Corrigé type** : n = 20 ; modèle complet à p = 4 colonnes, SC_p = 30 ; modèle réduit à q = 2 colonnes, SC_q = 50 ; α = 5 %.
  1. `F = ((50 − 30)/(4 − 2))/(30/(20 − 4))` — statistique
  2. `= 10/1,875 ≈ 5,33` — calculer
  3. `F₂,₁₆ ; ₀,₉₅ = 3,63` (donné) — seuil
  4. décision `5,33 > 3,63 : rejeter H₀ : β₃ = β₄ = 0` — décider
  5. Interpréter (QCM) : « Les deux variables ajoutées améliorent l'ajustement au-delà du hasard » ✓ ; « Chacune des deux est significative » ; « Le modèle complet est le vrai modèle » ; « On ne peut rien dire sans R² ».
- **Aides** : 1 « Numérateur : gain de SC par paramètre ajouté ; dénominateur : SC du modèle complet par degré de liberté. » · 2 `F = (20/2)/(30/…)` · 3 `F = 10/1,875`.
- **Variantes d'examen** : `mcq` (EE-209 Q19 : matrice de design ; distracteurs : `p_design_collinear` → constante et deux indicatrices, `p_design_separate_slopes`) ; `coef` (MATH-234) ; `tf` : « XᵀX est toujours inversible » (faux ; contre-exemple : p > n, ou colonnes dépendantes).
- **Pièges** : `p_design_collinear`, `p_design_separate_slopes`, `p_f_df_swap`, `p_f_ratio_inverted`.
- **Sous-buts → crédit** : équations normales → `l-orth-lsq` ; F, design → `p-reg-multi`.

### `p-reg-diag` — Diagnostics d'une régression
- **Année** 15 · **Prérequis** `p-reg-ls` · **Étiquettes** `MATH-234` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-reg-ls` : résidus de la droite ajustée.
- **Intro** : les hypothèses se vérifient sur les **résidus** : linéarité (pas de courbure dans résidus contre ŷ), variance constante (pas d'entonnoir), normalité (QQ-plot des résidus aligné), indépendance (pas de structure dans l'ordre, autocovariance), points influents (levier élevé, distance de Cook grande). Un R² élevé ne valide pas le modèle. Exemple : `résidus en entonnoir` → `hétéroscédasticité`.
- **Juge** : items `mcq` sur des graphiques produits par l'app (`plot`, lecture seule) · **Forme finale** : l'hypothèse violée, puis le remède proposé (QCM).
- **Niveaux** (types propres) : L1 un graphique, « quel défaut ? » parmi 3 ; L2 parmi 5 ; L3 deux graphiques (résidus et QQ-plot) ; L4 associer 4 graphiques à 4 défauts (`match`) ; L5 diagnostic complet d'une régression (4 graphiques) et choix du remède (transformation log, retirer un point mal mesuré, modèle quadratique).
- **Générateur** : l'app simule un jeu de données avec un défaut connu (courbure, entonnoir, valeur aberrante, point de levier, erreurs autocorrélées, queues lourdes) ou sans défaut, puis trace résidus contre ŷ, QQ-plot, résidus contre l'ordre ; graine de l'item.
- **Corrigé type** : résidus contre ŷ en forme d'entonnoir, QQ-plot aligné.
  1. décision `l'écart des résidus grandit avec ŷ` — lire le graphique
  2. décision `hypothèse violée : variance constante (homoscédasticité)` — nommer
  3. décision `remède : transformer y (log)` — agir
- **Aides** : 1 « Chaque graphique teste une hypothèse : résidus contre ŷ (linéarité, variance), QQ-plot (normalité), ordre (indépendance). » · 2 « Regarde la largeur du nuage de gauche à droite. » · 3 « Elle grandit : hétéroscédasticité. »
- **Variantes d'examen** : `mcq` ; `tf` : « Un R² de 0,95 garantit que le modèle linéaire est adapté » (faux ; contre-exemple : points sur une parabole légèrement courbée) ; « On teste la normalité sur y plutôt que sur les résidus » (faux).
- **Pièges** : `p_diag_normal_y`, `p_r2_high_good`, `p_outlier_delete`.
- **Sous-buts → crédit** : toutes les décisions → `p-reg-diag`.

### `p-bayes-beta` — Modèle Beta-Bernoulli : a posteriori, PM, MAP
- **Année** 16 · **Prérequis** `p-bayes-formula`, `p-family`, `p-mle` · **Étiquettes** `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-bayes-formula` : a posteriori ∝ vraisemblance × a priori.
- **Intro** : a priori θ ~ Beta(α, β) (uniforme = Beta(1, 1)) ; N succès en n essais de Bernoulli ; a posteriori θ | données ~ Beta(α + N, β + n − N). Moyenne a posteriori PM = (α + N)/(α + β + n) ; MAP = (α + N − 1)/(α + β + n − 2) ; variance a posteriori PM(1 − PM)/(1 + α + β + n). L'a posteriori sert d'a priori pour les données suivantes. Exemple : `uniforme, 2 réussites sur 2 → Beta(3, 1)` ; `Beta(2, 2), 7 sur 10 → Beta(9, 5), PM = 9/14, MAP = 2/3`.
- **Juge** : décision (famille et paramètres) puis `prob` · **Forme finale** : loi a posteriori nommée ; PM, MAP, variance exactes.
- **Niveaux** :
  - L1 (guidé) : a priori et données donnés ; paramètres à trous.
  - L2 : PM et MAP à trous.
  - L3 (choisir l'action) : ajouter les succès à α, les échecs à β, PM, MAP, variance.
  - L4 (libre) : a posteriori puis PM et MAP.
  - L5 (seul) : mise à jour en deux temps (deux séries de données) et comparaison avec la mise à jour en une fois ; puis MAP avec a priori uniforme = MLE.
- **Générateur** : α, β ∈ 1..5 ; n ∈ 2..20 ; N ∈ 0..n ; on garde les fractions de dénominateur ≤ 30 (calcul à la main). Gabarits : (a) tirs au panier (EE-209 Q13) ; (b) taux de clics ; (c) pièce ; (d) a priori « équivalent à n₀ observations de moyenne θ₀ » : Beta(n₀θ₀, n₀(1 − θ₀)) (notation du formulaire).
- **Corrigé type** : a priori Beta(2, 2) ; 7 succès sur 10 essais.
  1. `θ | données ~ Beta(2 + 7, 2 + 3) = Beta(9, 5)` — mise à jour
  2. `PM = 9/14` — moyenne a posteriori
  3. `MAP = (9 − 1)/(9 + 5 − 2) = 8/12 = 2/3` — mode
  4. `Var = (9/14)(5/14)/15 = 3/196` — variance a posteriori
  5. `comparer : MLE = 7/10 ; PM entre 1/2 (a priori) et 7/10` — rôle de l'a priori
- **Aides** : 1 « Les succès s'ajoutent au premier paramètre, les échecs au second. » · 2 `Beta(2 + 7, 2 + …)` · 3 `Beta(9, 5)`.
- **Variantes d'examen** : `mcq` (EE-209 Q13 ; distracteurs : `p_beta_prior_not_added` → Beta(2, 0), `p_beta_swap` → Beta(1, 3), « uniforme sur [1/3 ; 1] ») ; `tf` : « Avec un a priori uniforme, le MAP est égal au MLE » (vrai) ; « La moyenne a posteriori est toujours entre la moyenne a priori et le MLE » (vrai pour ce modèle).
- **Pièges** : `p_beta_swap`, `p_beta_prior_not_added`, `p_map_pm_confused`.
- **Sous-buts → crédit** : loi Beta → `p-family` ; mise à jour → `p-bayes-beta` ; MLE → `p-mle`.

### `p-bayes-gauss` — Modèle gaussien-gaussien
- **Année** 16 · **Prérequis** `p-normal-std` · **Étiquettes** `EE-209` · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `p-normal-std` : lois normales a priori et a posteriori.
- **Intro** : a priori θ ~ N(μ₀, τ²) ; données Xᵢ | θ ~ N(θ, σ²), σ² connu. A posteriori N(μ_post, σ²_post) avec μ_post = (nτ²x̄ + σ²μ₀)/(nτ² + σ²) et σ²_post = σ²τ²/(nτ² + σ²) ; autrement dit, les **précisions** s'additionnent : 1/σ²_post = 1/τ² + n/σ², et μ_post est la moyenne de μ₀ et x̄ pondérée par les précisions. MAP = PM = μ_post. Exemple (rhinocéros) : `μ_post = (2,2 + 0,5 · 2,5)/1,5 = 2,3` ; `σ²_post = 0,5/1,5 = 1/3`.
- **Juge** : `prob` (fractions) ; `value` pour n · **Forme finale** : loi a posteriori N(μ_post, σ²_post), ou n minimal.
- **Niveaux** :
  - L1 (guidé) : formule écrite, nombres à placer.
  - L2 : précisions à additionner.
  - L3 (choisir l'action) : précision a priori, précision des données, somme, moyenne pondérée.
  - L4 (libre) : a posteriori après n mesures.
  - L5 (seul) : nombre minimal de mesures pour σ²_post < seuil (EE-209 Q15), puis QCM sur le rôle de l'a priori quand n grandit.
- **Générateur** : τ², σ² ∈ {1/4, 1/2, 1, 2, 4} ; μ₀, x̄ à une décimale ; n ∈ 1..10 ; seuils de variance 0,1 ; 0,05 ; 0,01 ; calculs faits pour tomber sur des fractions simples (sans calculatrice).
- **Corrigé type** : a priori N(2,5 ; 1) pour θ ; une mesure X | θ ~ N(θ ; 0,5), x = 2,2 ; puis n pour σ²_post < 0,01.
  1. `précisions : 1/τ² = 1 ; 1/σ² = 2` — précisions
  2. `σ²_post = 1/(1 + 2) = 1/3` — variance a posteriori
  3. `μ_post = (1 · 2,5 + 2 · 2,2)/3 = 2,3` — moyenne pondérée
  4. `θ | x ~ N(2,3 ; 1/3)` — a posteriori
  5. `n mesures : 1/(1 + 2n) < 0,01 ⇔ n > 49,5 ⇔ n ≥ 50` — taille
- **Aides** : 1 « Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. » · 2 `σ²_post = 1/(1 + …)` · 3 `σ²_post = 1/3`.
- **Variantes d'examen** : `mcq` (EE-209 Q14 et Q15 ; distracteurs : `p_gauss_posterior_avg` → N(2,35 ; 1/2), `p_gauss_post_var_add` → variance 1,5, `p_precision_n` → n = 51 en oubliant l'a priori) ; `tf` : « Quand n → ∞, la moyenne a posteriori tend vers x̄ » (vrai).
- **Pièges** : `p_gauss_posterior_avg`, `p_gauss_post_var_add`, `p_precision_n`.
- **Sous-buts → crédit** : précisions, a posteriori → `p-bayes-gauss`.

### `p-bayes-conjugate` — Lois conjuguées ; Dirichlet-multinomiale
- **Année** 16 · **Prérequis** `p-bayes-beta`, `p-count` · **Étiquettes** `EE-209` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `p-bayes-beta` : Beta-Bernoulli est le modèle de référence.
- **Intro** : une loi a priori est conjuguée si l'a posteriori reste dans la même famille : Beta–Bernoulli, Dirichlet–multinomiale, normale–normale (moyenne), Gamma sur la précision d'une normale. Multinomiale : Pr(N₁, …, N_K) = n!/(N₁!···N_K!)·Π θₖ^(Nₖ). A priori Dir(α₁, …, α_K), comptes Nₖ : a posteriori Dir(α₁ + N₁, …, α_K + N_K), PMₖ = (αₖ + Nₖ)/(α₀ + n) avec α₀ = Σαₖ, MAPₖ = (αₖ + Nₖ − 1)/(α₀ + n − K). Exemple : `Dir(1, 1, 1) et comptes (3, 5, 2) → Dir(4, 6, 3)` ; `PM = (4/13 ; 6/13 ; 3/13)`.
- **Juge** : décision (famille conjuguée) ; `prob` · **Forme finale** : loi a posteriori, PM, MAP.
- **Niveaux** : L1 probabilité multinomiale à trous ; L2 mise à jour de Dirichlet ; L3 actions (ajouter les comptes, α₀, PM, MAP) ; L4 libre ; L5 QCM « quelle a priori est conjuguée à ce modèle ? » puis calcul.
- **Générateur** : K ∈ 3..4 ; αₖ ∈ 1..3 ; comptes de somme n ≤ 12 ; probabilités multinomiales avec θₖ ∈ {1/2, 1/4, 1/3, 1/6}.
- **Corrigé type** : 3 catégories, a priori Dir(1, 1, 1), comptes (3, 5, 2).
  1. `a posteriori Dir(4, 6, 3)` — mise à jour
  2. `α₀ + n = 3 + 10 = 13` — total
  3. `PM = (4/13 ; 6/13 ; 3/13)` — moyenne a posteriori
  4. `MAP = (3/10 ; 5/10 ; 2/10)` — mode, égal au MLE pour un a priori uniforme
  5. `Pr(N = (2, 1, 1)) avec θ = (1/2, 1/4, 1/4) : 4!/(2! 1! 1!) · (1/2)² · (1/4) · (1/4) = 12/64 = 3/16` — probabilité multinomiale (rappel)
- **Aides** : 1 « Chaque compte s'ajoute à son αₖ ; PM divise par la somme. » · 2 `PM₁ = (1 + 3)/(3 + …)` · 3 `PM₁ = 4/13`.
- **Variantes d'examen** : `mcq` (distracteurs : `p_dirichlet_alpha0` → dénominateur n, `p_map_pm_confused`, `p_multinomial_no_coef` → 1/64) ; `tf` : « La loi Beta est conjuguée au modèle de Bernoulli » (vrai) ; « Avec un a priori uniforme, la PM est égale au MLE » (faux ; contre-exemple : 4/13 ≠ 3/10).
- **Pièges** : `p_dirichlet_alpha0`, `p_map_pm_confused`, `p_multinomial_no_coef`.
- **Sous-buts → crédit** : multinomiale → `p-count` ; mise à jour → `p-bayes-conjugate`.

## Pièges du module

Fichier `js/cas/rules/proba.js`. Familles : `proba` (sens des probabilités), `method` (mauvaise méthode ou mauvaise décision), `notation` (convention ou lecture), `calculus` (calcul), `numeric` (arrondi, diviseur), `logic`, `linear`. Dans la colonne « transformation », `T(prev)` désigne la ligne fautive produite à partir de la ligne précédente (`transform`), `W(item)` la liste des valeurs fausses pour une réponse finale ou un distracteur (`wrongValues`), `P` une phrase fausse de QCM (le piège porte alors `phrase: (ctx) => 'texte'` en plus de `wrongValues`), `D` une option fausse de ligne de décision. `{…}` désigne un nombre de l'item ou de l'élève passé dans `ctx`.

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `p_sd_n` | numeric | C | `p-desc-summary` | `p-desc-summary` | s² = 60/7 → 60/6 | W : `SS/n` au lieu de `SS/(n − 1)` ; aussi pour σ̂ dans les tests | Tu as divisé {SS} par n = {n}. La variance empirique du cours divise par n − 1 = {n−1}. |
| `p_median_unsorted` | method | E | `p-desc-summary` | `p-desc-summary` | méd(7, 2, 11, 4, 9, 4, 5) = 4 → 5 | W : valeur au rang ⌈n/2⌉ de la liste **non triée** | Tu as pris la {k}ᵉ valeur de la liste telle quelle. La médiane se lit sur les données triées. |
| `p_median_mean` | proba | E | `p-desc-summary` | `p-desc-summary` | méd = 6 → 5 | W : x̄ (ou (min + max)/2) | {x̄} est la moyenne. La médiane est la valeur du milieu une fois les données triées. |
| `p_lin_transform_sd` | proba | E | `p-desc-summary` | `p-desc-summary` | s_y = a·s_x + b → \|a\|·s_x | W : `a·s + b`, `s + b`, `a²·s` | Ajouter {b} à toutes les données les déplace sans les écarter : s ne change pas. Seul le facteur \|a\| = {a} compte. |
| `p_quartile_convention` | notation | C | `p-desc-boxplot` | `p-desc-boxplot` | q̂(0,25) = 6,5 → 6 | W : `(x₍k₎ + x₍k+1₎)/2`, `x₍⌊nα⌋₎`, interpolation linéaire | Le cours prend q̂(α) = x₍⌈nα⌉₎ : ⌈{n} · {α}⌉ = {k}, donc la {k}ᵉ donnée, {v}. |
| `p_whisker_threshold` | notation | C | `p-desc-boxplot` | `p-desc-boxplot` | moustache = 23,5 → 15 | W : seuils `q̂(0,25) − C` et `q̂(0,75) + C` | {seuil} est un seuil, pas une donnée. La moustache s'arrête sur la donnée la plus extrême à l'intérieur : {v}. |
| `p_boxplot_range` | notation | E | `p-desc-boxplot` | `p-desc-boxplot` | EIQ = 31 − 3 → 13 − 6 | W : `max − min` | max − min est l'étendue. L'EIQ ne prend que la boîte : q̂(0,75) − q̂(0,25) = {q3} − {q1}. |
| `p_union_add` | proba | E | `p-events` | `p-events` | Pr(A ∪ B) = 1,2 → 0,9 | T : retirer le terme `− Pr(A ∩ B)` | {v} > 1 n'est pas une probabilité : en additionnant, tu as compté deux fois Pr(A ∩ B) = {pab}. |
| `p_complement_wrong` | proba | E | `p-events` | `p-events` | Pr(Aᶜ ∩ Bᶜ) = 0,7 → 0,1 | T : `1 − Pr(A ∩ B)` au lieu de `1 − Pr(A ∪ B)` | « Ni A ni B » est le contraire de « A ou B » (De Morgan), pas de « A et B ». |
| `p_indep_assumed` | proba | E | `p-events` | `p-indep` | Pr(A ∩ B) = 0,35 → 0,3 | T : remplacer `Pr(A ∩ B)` par `Pr(A)·Pr(B)` | Rien ne dit que A et B sont indépendants ; l'énoncé donne Pr(A ∩ B) = {pab}. |
| `p_conjunction` | proba | R (Tversky & Kahneman 1983) | `p-events` | `p-events` | Pr(A ∩ B) > Pr(A) → ≤ | P : « A et B est plus probable que A seul » ; W : `max(Pr A, Pr B) + 0,1` | A ∩ B est contenu dans A, donc Pr(A ∩ B) ≤ Pr(A), même si la description détaillée semble plus plausible. |
| `p_count_forget_rest` | proba | E | `p-count` | `p-count` | C(4, 2)/C(32, 4) → C(4, 2)·C(28, 2)/C(32, 4) | T : supprimer le facteur `C(N − K, n − k)` | Tu as choisi les {k} dames, mais pas les {n−k} autres cartes de la main. |
| `p_binom_without_replacement` | method | E | `p-count` | `p-binom` | C(4, 2)(1/8)²(7/8)² → C(4, 2)C(28, 2)/C(32, 4) | W : `binom(n, k, K/N)` | Sans remise, les tirages ne sont pas indépendants : la probabilité d'une dame change à chaque carte. On compte. |
| `p_exactly_atleast` | proba | E | `p-count` | `p-count` | Pr(X ≥ 2) = Pr(X = 2) → somme | W : `Pr(X = k)` pour « au moins k », `Pr(X ≥ k)` pour « exactement k » | « Au moins {k} » contient aussi {k+1}, … ; additionne ces cas ou passe par le complément. |
| `p_total_missing_branch` | proba | E | `p-cond-total` | `p-cond-total` | Pr(+) = 0,09 → 0,27 | T : supprimer un terme de la somme des probabilités totales | Les sains aussi peuvent être positifs : il manque la branche {b} · {pb} = {v}. |
| `p_cond_denominator` | proba | E | `p-cond-total` | `p-cond-total` | Pr(A \| B) = Pr(A ∩ B)/Pr(A) → /Pr(B) | T : remplacer le dénominateur par `Pr(A)` | On conditionne par B : on divise par Pr(B) = {pb}, la probabilité de ce que l'on sait. |
| `p_cond_inverse` | proba | R (Eddy 1982) | `p-bayes-freq` | `p-cond-total` | Pr(M \| +) = 0,9 → 1/12 | W : `Pr(+ \| M)` | {v} est la probabilité d'être positif quand on est malade. La question demande l'inverse : malade quand on est positif. |
| `p_base_rate` | proba | R (Tversky & Kahneman 1974) | `p-bayes-freq` | `p-bayes-freq` | 0,9 · 0,5/(0,9 · 0,5 + 0,1 · 0,5) = 0,9 → 1/12 | T : remplacer `Pr(M)` et `Pr(Mᶜ)` par 1/2 | Tu as fait comme si la moitié des gens étaient malades. Seuls {π} le sont : sur 1 000 personnes, {nM} malades. |
| `p_bayes_joint` | proba | E | `p-bayes-freq` | `p-bayes-freq` | 9/1 000 → 9/108 | W : `Pr(M ∩ +)` | 9/1 000 est la part des malades positifs dans toute la population. On ne regarde que les positifs : 9 sur 108. |
| `p_two_tests_square` | proba | E | `p-bayes-formula` | `p-bayes-formula` | (1/12)² → 9/20 | W : `Pr(M \| +)²` | Un second test positif doit **augmenter** la probabilité d'être malade ; (1/12)² la diminue. Ce sont les vraisemblances qui s'élèvent au carré. |
| `p_two_tests_uncond` | proba | E | `p-bayes-formula` | `p-indep` | Pr(+, +) = 0,108² → 0,0081 + 0,0099 | T : remplacer `Pr(+, +)` par `Pr(+)²` | Les tests sont indépendants **sachant l'état**, pas en général : Pr(+, +) = Σ Pr(+ \| état)²·Pr(état). |
| `p_indep_disjoint` | proba | E | `p-indep` | `p-indep` | incompatibles ⇒ indépendants | T : `Pr(A ∩ B) = 0` pour des indépendants, `= Pr(A)Pr(B)` pour des incompatibles ; D | Si A et B sont incompatibles, savoir que B a lieu dit que A n'a pas lieu : ils sont très dépendants. |
| `p_pairwise_mutual` | logic | E | `p-indep` | `p-indep` | deux à deux ⇒ mutuellement → non | D : « oui, les trois paires sont indépendantes » | Il faut aussi Pr(A ∩ B ∩ C) = Pr(A)Pr(B)Pr(C) ; ici {v} ≠ {w}. |
| `p_atleast_one_np` | proba | E | `p-indep` | `p-binom` | Pr(au moins un) = n·p → 1 − (1 − p)ⁿ | W : `n·p`, `1 − pⁿ` | {n} · {p} = {v} peut dépasser 1. « Au moins un » est le contraire de « aucun » : 1 − (1 − p)ⁿ. |
| `p_series_parallel` | proba | E | `p-indep` | `p-indep` | parallèle = Π pᵢ → 1 − Π(1 − pᵢ) | W : formules échangées | En parallèle, le système marche si **au moins un** composant marche ; Π pᵢ est la formule du montage en série. |
| `p_cdf_strict` | notation | E | `p-disc-pmf` | `p-disc-pmf` | Pr(X < 2) = F(2) → F(1) | T : décaler l'indice de F d'un cran | F(x) = Pr(X ≤ x) inclut x. Pour une variable discrète, Pr(X < 2) = F(1). |
| `p_quantile_inverse` | notation | E | `p-disc-pmf` | `p-cont-quantile` | q₀,₅ = F(0,5) → F⁻¹(0,5) | W : `F(α)`, `f(α)` | On cherche x tel que F(x) = {α}, pas la valeur de F en {α}. |
| `p_geom_support` | notation | C | `p-disc-pmf` | `p-disc-pmf` | E = 1/p → (1 − p)/p (MATH-234) | W : formules de l'autre convention | Ici X compte les échecs avant le premier succès (x = 0, 1, …) : E[X] = (1 − p)/p. La version qui compte les essais a E = 1/p. |
| `p_binom_no_coef` | proba | E | `p-binom` | `g7-binomial` | 0,03456 → 0,3456 | T : supprimer `C(n, k)` | {v} est la probabilité d'**une** suite précise. Il y a C({n}, {k}) = {c} places possibles pour les succès. |
| `p_binom_swap_p` | proba | E | `p-binom` | `p-binom` | 0,4³ · 0,6² → 0,6³ · 0,4² | T : échanger p et 1 − p | p = {p} va avec le nombre de succès {k}. |
| `p_poisson_rate_scale` | proba | E | `p-poisson` | `p-poisson` | λ = 2 par heure pour 3 h → λ = 6 | W : formule avec λ non changé d'échelle | {λ} est le taux par {unité}. Sur {t} {unité}s, le taux est {t} · {λ}. |
| `p_poisson_no_factorial` | calculus | E | `p-poisson` | `p-poisson` | λᵏe^(−λ) → λᵏe^(−λ)/k! | T : supprimer `/k!` | Il manque k! = {kf} au dénominateur ; sans lui, les probabilités ne somment pas à 1. |
| `p_poisson_approx_bad` | method | E | `p-poisson` | `p-poisson` | B(20 ; 0,5) ≈ Poiss(10) → non | D : « Poisson » quand p n'est pas petit, ou « normale » quand np ≈ 1 | L'approximation de Poisson demande p petit ; avec p = {p}, elle est mauvaise. |
| `p_normalize_bounds` | calculus | E | `p-cont-density` | `a1-int-direct` | ∫₀^∞ c·x⁻⁴ → ∫₁^∞ | T : remplacer les bornes du support par [0 ; ∞[ ou [0 ; 1] | La densité est nulle hors de [{a} ; {b}] : on intègre seulement sur le support. |
| `p_density_is_prob` | proba | E | `p-cont-density` | `p-cont-density` | Pr(X = 2) = f(2) → 0 | W : `f(a)` | Pour une variable continue, Pr(X = a) = 0 ; f(a) = {v} est une densité, pas une probabilité. |
| `p_cdf_piecewise` | notation | E | `p-cont-density` | `p-cont-density` | F(x) = 1 − x⁻³ → (0 si x < 1) | T : la formule de F sans ses morceaux hors du support (le juge teste x hors support) | F doit être définie sur tout ℝ : 0 avant le support, 1 après. Ta formule donne {v} en x = {x}. |
| `p_quantile_from_pdf` | method | E | `p-cont-quantile` | `p-cont-quantile` | f(q) = 1/2 → F(q) = 1/2 | W : solution de `f(q) = α` | Le quantile se lit sur F (aire cumulée), pas sur la hauteur f. |
| `p_exp_rate_mean` | notation | C (formulaire MATH-234 : « interprétation inverse ») | `p-unif-exp` | `p-unif-exp` | e^(−10·10) → e^(−10/10) | T : remplacer λ par 1/λ | Une moyenne de {m} donne un taux λ = 1/{m} ; e^(−λx) = e^(−{x}/{m}). |
| `p_memoryless_ignored` | proba | E | `p-unif-exp` | `p-unif-exp` | Pr(X > 12 \| X > 2) = e^(−1,2) → e^(−1) | W : `Pr(X > s + t)` | Tu as oublié de diviser par Pr(X > {s}). L'exponentielle oublie le passé : il reste Pr(X > {t}). |
| `p_unif_var` | calculus | E | `p-unif-exp` | `p-unif-exp` | var = (b − a)/12 → (b − a)²/12 | W : `(b − a)/12`, `(b − a)²/2` | Une variance a l'unité au carré : (b − a)²/12 = {v}. |
| `p_var_minus_mean` | calculus | E | `p-moments` | `p-moments` | E[X²] − E[X] → E[X²] − E[X]² | T : enlever le carré de `E[X]²` | {v} < 0 est impossible pour une variance : c'est E[X]², au carré. |
| `p_g_of_mean` | proba | E | `p-moments` | `p-moments` | E[e^X] = e^(E[X]) → ∫ eˣ f(x) dx | W : `g(E[X])` | E[g(X)] se calcule avec ∫ g(x) f(x) dx ; en général, ce n'est pas g(E[X]). |
| `p_mean_not_exist` | proba | E | `p-moments` | `p-moments` | E[Cauchy] = 0 → n'existe pas | W : 0 ; D : « par symétrie, E = 0 » | ∫ \|x\|/(π(1 + x²)) dx diverge : l'espérance n'existe pas, même si la densité est symétrique. |
| `p_gamma_scale_rate` | notation | C | `p-family` | `p-family` | E = 3/θ → 3θ | T : remplacer θ par 1/θ dans E et var | Ici θ est une échelle (e^(−y/θ)) : E = kθ. Le formulaire EE-209 utilise un taux λ = 1/θ. |
| `p_gamma_shape_off` | notation | E | `p-family` | `p-family` | y² ⇒ Γ(2, θ) → Γ(3, θ) | W : k = exposant de y | Le noyau est y^(k−1) : un exposant {e} donne k = {e+1}. |
| `p_beta_shape_off` | notation | E | `p-family` | `p-family` | x²(1 − x) ⇒ Beta(2, 1) → Beta(3, 2) | W : (α, β) = exposants | Le noyau est x^(α−1)(1 − x)^(β−1) : ajoute 1 à chaque exposant. |
| `p_standardize_var` | calculus | E | `p-normal-std` | `p-normal-std` | (130 − 100)/225 → /15 | T : diviser par σ² au lieu de σ | On divise par l'écart-type σ = √{var} = {σ}, pas par la variance. |
| `p_phi_negative` | notation | E | `p-normal-std` | `p-normal-std` | Φ(−1) = −0,841 ou 0,841 → 0,159 | W : `−Φ(z)`, `Φ(z)` | Φ est une probabilité, donc entre 0 et 1 ; par symétrie Φ(−{z}) = 1 − Φ({z}) = {v}. |
| `p_upper_tail` | proba | E | `p-normal-std` | `p-normal-std` | Pr(X > 130) = 0,977 → 0,023 | W : `Φ(z)` au lieu de `1 − Φ(z)` | Φ({z}) = {v} est Pr(Z ≤ {z}) ; on demande au-dessus : 1 − {v}. |
| `p_normal_sigma2` | notation | C | `p-normal-std` | `p-normal-std` | N(176,6 ; 63,84) : σ = 63,84 → 7,99 | T : utiliser le 2ᵉ paramètre comme σ | Le cours écrit N(μ, σ²) : 63,84 est la variance, σ = √63,84 ≈ 7,99. |
| `p_phi_inverse_side` | notation | E | `p-normal-inverse` | `p-normal-inverse` | Φ(5/σ) = 0,1 ⇒ 5/σ = 1,28 → Φ(5/σ) = 0,9 | W : signe ou côté échangé (σ négatif, quantile de 0,1) | 10 % au-dessus de 89, c'est Φ(5/σ) = 0,9 ; un quantile de 0,1 serait négatif. |
| `p_transform_jacobian` | calculus | C (corrigé d'examen MATH-234) | `p-transform` | `p-transform` | f_Y(y) = f_X(g⁻¹(y)) → × \|dg⁻¹/dy\| | T : supprimer le facteur \|dg⁻¹/dy\| | Sans le facteur \|dg⁻¹/dy\| = {d}, ta densité n'intègre pas à 1 (elle intègre à {v}). |
| `p_transform_abs` | calculus | E | `p-transform` | `p-transform` | f = −λe^(−λx) → λe^(−λx) | T : enlever la valeur absolue | Une densité est positive : g est décroissante, il faut la valeur absolue de la dérivée. |
| `p_transform_support` | notation | E | `p-transform` | `p-transform` | support ]0 ; 1[ → ]0 ; ∞[ | T : garder le support de X (le juge teste y hors support) | Le support change avec g : u ∈ ]0 ; 1[ donne x = −ln(u)/λ ∈ ]0 ; ∞[. |
| `p_scale_density` | calculus | E | `p-transform` | `p-transform` | f_{2X}(y) = 2f_X(y) → f_X(y/2)/2 | W : `a·f_X(y)`, `f_X(a·y)` | Étirer par {a} étale la masse : on divise la densité par {a} et on évalue en y/{a}. |
| `p_cov_zero_indep` | proba | E | `p-joint-disc` | `p-joint-disc` | cov = 0 ⇒ indépendants → non | D ; contre-exemple automatique (tableau « dépendant mais non corrélé ») | cov = 0 dit seulement « pas de lien linéaire » ; ici p(0, 0) = {v} ≠ {w}. |
| `p_marginal_wrong_axis` | notation | E | `p-joint-disc` | `p-joint-disc` | p_X = sommes des colonnes → des lignes | T : transposer le tableau | La loi de X s'obtient en sommant sur toutes les valeurs de Y, donc le long de la ligne x = {x}. |
| `p_joint_support_indep` | proba | C (série 7 MATH-234) | `p-joint-cont` | `p-joint-cont` | 24xy sur un triangle : indépendants → non | D : « f se factorise, donc indépendants » | Le support n'est pas un rectangle : si x = 0,9, y ne peut pas dépasser 0,1. X renseigne sur Y. |
| `p_marginal_bounds` | calculus | E | `p-joint-cont` | `a2-domain-describe` | ∫₀¹ 24xy dy → ∫₀^(1−x) | T : bornes fixes [0 ; 1] au lieu de [0 ; 1 − x] | Pour x fixé, y va de 0 à 1 − x sur ce triangle. |
| `p_var_sum_cov` | proba | E | `p-lin-combo` | `p-lin-combo` | var = 17 → 13 | T : supprimer les termes `2ab·cov` | X_A et X_B ne sont pas indépendants : cov = {c}. Ajoute 2·{a}·{b}·cov pour chaque paire. |
| `p_var_scale` | proba | E | `p-lin-combo` | `p-lin-combo` | var(2X) = 2var X → 4var X | T : remplacer `a²` par `a` | Multiplier par {a} multiplie l'écart-type par \|{a}\| et la variance par {a}² = {a2}. |
| `p_var_xy` | proba | C (QCM EE-209 2023) | `p-lin-combo` | `p-lin-combo` | var(XY) = 1 → 14 | W : `var X · var Y` | Pour X, Y indépendants, var(XY) = E[X²]E[Y²] − (E[X]E[Y])² = {v} ; les moyennes comptent. |
| `p_var_diff` | proba | E | `p-lin-combo` | `p-lin-combo` | var(X − Y) = 0 → 2 | T : signe moins devant `var Y` | (−1)² = 1 : var(X − Y) = var X + var Y − 2cov. |
| `p_corr_causal` | proba | C (cours MATH-234, semaine 6) | `p-cov-corr` | `p-cov-corr` | « r = 0,8 : X cause Y » | P : « X cause Y », « il suffit d'agir sur X » | Une corrélation peut venir d'une cause commune ({z}) ou du hasard ; elle ne dit pas le sens de la cause. |
| `p_corr_scale` | proba | E | `p-cov-corr` | `p-cov-corr` | corr(2X + 1, −Y) = −6 → −0,5 | W : la covariance au lieu de la corrélation, `a·c·corr` | La corrélation ne change pas d'échelle : seul le signe de a·c compte. |
| `p_corr_slope` | proba | E | `p-cov-corr` | `p-reg-ls` | r = 0,5 ⇒ Y = 0,5X | P | r mesure l'alignement, pas la pente ; la pente vaut r·s_y/s_x = {b}. |
| `p_r2_r` | notation | E | `p-reg-ls` | `p-reg-ls` | R² = 0,775 → 0,6 | W : `r` pour R², `√R²` pour r | R² = r² : {r}² = {r2}. |
| `p_total_var_forget` | proba | E | `p-total-expect` | `p-total-expect` | var = 1,17 → 1,41 | T : supprimer `var(E[X \| Y])` | Il manque la variance due au choix de l'examinateur : var(E[N \| ·]) = {v}. |
| `p_total_expect_unweighted` | proba | E | `p-total-expect` | `p-cond-total` | E = (2,5 + 3,5)/2 → 0,6 · 2,5 + 0,4 · 3,5 | W : moyenne simple des espérances conditionnelles | Mary interroge plus souvent ({p}) : on pondère par les probabilités. |
| `p_mixture_vs_sum` | proba | C (EE-209, partie 1B) | `p-sum-mixture` | `p-total-expect` | var(mélange) = 0,58 → 4,36 | W : `Σ πₖ² σₖ²` | 0,58 est la variance de 0,3X₁ + 0,7X₂. Un mélange **choisit** une composante ; l'écart entre les moyennes ajoute de la variance. |
| `p_sum_density_add` | proba | E | `p-sum-mixture` | `p-sum-mixture` | f_{X+Y} = f_X + f_Y → convolution | W : `f_X + f_Y` | f_X + f_Y intègre à 2 : ce n'est pas une densité. La somme demande une convolution. |
| `p_conv_bounds` | calculus | E | `p-sum-mixture` | `a2-domain-describe` | ∫₀¹ dy pour tout z → ∫ sur [max(0, z − 1) ; min(1, z)] | T : bornes [0 ; 1] sans découpage selon z | Il faut 0 ≤ y ≤ 1 **et** 0 ≤ z − y ≤ 1 : les bornes dépendent de z. |
| `p_chebyshev_k` | calculus | E | `p-markov-cheb` | `p-markov-cheb` | ≤ 1/2 → ≤ 1/4 | W : `1/k` | Tchebychev donne 1/k² ; avec k = {k}, 1/{k2}. |
| `p_markov_negative` | method | E | `p-markov-cheb` | `p-markov-cheb` | Markov pour X ~ N(0, 1) → non applicable | D : « Markov » quand X peut être négative | Markov demande X ≥ 0. |
| `p_gambler` | proba | R (Tversky & Kahneman 1974) | `p-markov-cheb` | `p-indep` | Pr(face \| 5 piles) > 1/2 → = 1/2 | P : « face est plus probable » ; W : `1 − (1/2)^(k+1)` | Les lancers sont indépendants : la pièce n'a pas de mémoire. |
| `p_lln_count` | proba | E | `p-markov-cheb` | `p-markov-cheb` | #piles − #faces → 0 : faux | P | C'est la **proportion** qui tend vers 1/2 ; l'écart en nombre grandit comme √n. |
| `p_clt_sum_sd` | calculus | E | `p-clt-sum` | `p-lin-combo` | sd(S) = 16 · 20 → √16 · 20 | T : `n·σ` au lieu de `σ√n` | Les variances s'additionnent : var(S) = {n} · {σ}², donc sd(S) = σ√n = {v}. |
| `p_clt_population` | method | C (QCM EE-209 2023) | `p-clt-sum` | `p-clt-sum` | « la population doit être grande » → l'échantillon | P | Le TCL porte sur la moyenne de n observations : c'est n, la taille de l'échantillon, qui doit être grande. |
| `p_clt_needs_normal` | method | C | `p-clt-sum` | `p-clt-sum` | « la population doit être normale » → non | P | Justement, le TCL sert quand la population n'est pas normale. |
| `p_se_forgot_sqrt_n` | calculus | E | `p-clt-sum` | `p-lin-combo` | se = σ → σ/√n | T : supprimer `/√n` | La moyenne de {n} observations varie moins qu'une seule : écart-type σ/√{n} = {v}. |
| `p_binom_var_as_sd` | calculus | E | `p-clt-binom` | `p-binom` | σ = 25 → 5 | T : supprimer la racine de `np(1 − p)` | np(1 − p) = {v} est la variance ; l'écart-type est √{v}. |
| `p_mom_s2` | numeric | E | `p-mom` | `p-mom` | σ̂² = 72/5 → 72/6 | W : moments avec `SS/(n − 1)` | La méthode des moments égale au moment empirique (1/n)Σ(xᵢ − x̄)² : divise par n = {n}. |
| `p_mom_wrong_moment` | method | E | `p-mom` | `p-mom` | E[X²] = x̄² → (1/n)Σxᵢ² | T : remplacer `m₂` par `x̄²` | Le moment empirique d'ordre 2 est la moyenne des carrés, pas le carré de la moyenne. |
| `p_mle_no_check` | method | C (cours MATH-234) | `p-mle` | `p-mle` | θ̂ sans vérification → avec ℓ″ < 0 | le juge renvoie `stay` « Montre que c'est un maximum » si la ligne `ℓ″` manque ; D : « ℓ′(θ̂) = 0 suffit » | Un point où ℓ′ s'annule peut être un minimum ; ℓ″ = {d2} < 0 le garantit. |
| `p_mle_constant_kept` | calculus | E | `p-mle` | `g6-deriv-rules` | d/dλ(−Σ ln xᵢ!) ≠ 0 → 0 | T : dériver un terme sans θ comme s'il en dépendait (ou dériver Σxᵢ en θ) | Σxᵢ = {S} est une donnée : sa dérivée en λ est 0. |
| `p_mle_solve` | calculus | E | `p-mle` | `@alg:F-isoler` | 16/λ − 8 = 0 ⇒ λ = 1/2 → 2 | W : inverse de la bonne valeur | 16/λ = 8 donne λ = 16/8 = 2. |
| `p_wald_var_inverse` | method | C | `p-mle` | `p-ci-wald` | se = √J = 2 → 1/√J = 1/2 | W : `√J`, `J`, `1/J` | La variance asymptotique est l'**inverse** de J = {J} ; l'erreur standard est 1/√J = {se}. |
| `p_wald_sign` | calculus | E | `p-mle` | `p-ci-wald` | J = ℓ″(θ̂) = −4 → 4 | W : `ℓ″(θ̂)` sans le signe moins | Au maximum ℓ″ < 0 ; J = −ℓ″(θ̂) = {J} est positive. |
| `p_mle_support` | method | C (séries 9–10 MATH-234) | `p-mle-special` | `p-mle-special` | « pas de MLE » ou θ̂ = 2x̄ → max xᵢ | W : 2x̄, « n'existe pas » | ℓ′ ne s'annule pas parce que le maximum est au bord : L vaut 0 si θ < {max} et décroît ensuite. |
| `p_mle_invariance_ignored` | method | C (QCM EE-209 2023) | `p-mle-special` | `p-mle-special` | MLE de Pr(X ≤ 2) = (1/n)Σ1{Xᵢ ≤ 2} → 1 − e^(−2/X̄) | W | Dans le modèle exponentiel, le MLE de g(θ) est g(θ̂) ; la fréquence empirique n'utilise pas le modèle. |
| `p_mse_bias_not_squared` | calculus | E | `p-bias-mse` | `p-bias-mse` | EQM = var + biais → var + biais² | T : enlever le carré du biais | EQM = var + biais² ; un biais de {b} ajoute {b2}. |
| `p_unbiased_better` | proba | E | `p-bias-mse` | `p-bias-mse` | sans biais ⇒ meilleur → comparer les EQM | P ; tf | Un estimateur un peu biaisé mais beaucoup moins variable peut avoir une EQM plus petite. |
| `p_fisher_per_obs` | notation | C (formulaire EE-209) | `p-fisher-cr` | `p-fisher-cr` | borne = λ → λ/n | W : `1/I₁` | Pour n observations, l'information est n·I₁ ; la borne est 1/(n·I₁) = {v}. |
| `p_fisher_sign` | calculus | E | `p-fisher-cr` | `p-fisher-cr` | I₁ = −1/λ → 1/λ | W : `E[∂²ln f]` sans le signe | I₁ = −E[∂²ln f/∂θ²] est positive. |
| `p_cr_biased` | proba | E | `p-fisher-cr` | `p-fisher-cr` | borne pour tout estimateur → seulement sans biais | P ; tf | L'estimateur constant a une variance nulle : la borne ne vaut que pour les estimateurs sans biais. |
| `p_t_vs_z` | method | C | `p-ci-mean` | `p-ci-mean` | 1,96 → s₅(8) = 2,306 | W : quantile normal à la place du Student | σ est inconnu et ν = {ν} < 200 : on prend la loi de Student, plus large. |
| `p_one_two_sided` | method | E | `p-ci-mean` | `p-test-setup` | 1,645 → 1,96 | W : quantile unilatéral pour un bilatéral et l'inverse | Un IC à 95 % laisse 2,5 % de chaque côté : quantile d'ordre 0,975. |
| `p_df_wrong` | method | C | `p-ci-mean` | `p-ci-mean` | ν = n → n − 1 (n₁ + n₂ − 2 ; n − 2 en régression) | W : quantile lu avec ν ± 1 | On perd un degré de liberté par paramètre estimé : ν = {ν}. |
| `p_ci_prob` | proba | R (Hoekstra et al. 2014) | `p-interpret` | `p-interpret` | « 95 % de chances que μ ∈ [a ; b] » | P | μ est fixe : une fois calculé, l'IC le contient ou non. Les 95 % décrivent la méthode sur des répétitions. |
| `p_ci_data` | proba | E | `p-interpret` | `p-interpret` | « 95 % des mesures sont dans l'IC » | P | L'IC porte sur μ, pas sur les données ; il rétrécit avec n, la dispersion des données non. |
| `p_ci_xbar` | proba | E | `p-interpret` | `p-interpret` | « x̄ est dans l'IC avec probabilité 0,95 » | P | x̄ est le centre de l'IC : il y est toujours. |
| `p_ci_intersection` | proba | C (QCM EE-209 2023, Q10) | `p-interpret` | `p-interpret` | intersection de deux IC à 95 % → pas garantie | P ; tf | Chaque IC peut manquer θ dans 5 % des cas ; leur intersection peut le manquer plus souvent. |
| `p_wilson_center` | calculus | E | `p-ci-wald` | `p-ci-wald` | centre p̂ = 0,36 → p̃ = 0,365 | W : IC de Wilson centré en p̂ | L'IC de Wilson est centré en (np̂ + z²/2)/(n + z²), tiré vers 1/2. |
| `p_ci_round_nearest` | numeric | C (EE-209, partie 3b) | `p-ci-round` | `p-ci-round` | 1,067456 → 1,0675 → 1,0674 | W : bornes arrondies au plus proche | La borne inférieure s'arrondit vers le bas pour ne pas rétrécir l'IC. |
| `p_ci_round_from_rounded` | numeric | C | `p-ci-round` | `p-ci-round` | 1,0699 − 0,0024 = 1,0675 → 1,0674 | W : bornes calculées à partir de θ̂ et u déjà arrondis | Calcule θ̂ ± u avec les valeurs complètes, puis arrondis vers l'extérieur. |
| `p_ci_round_digits` | numeric | C | `p-ci-round` | `@alg:A-arrondir` | [1,067456 ; 1,072286] → [1,0674 ; 1,0723] | W : bornes avec plus ou moins de décimales que u | La dernière décimale des bornes est celle de u = {u}. |
| `p_max_density_power` | calculus | E | `p-max-sample` | `p-max-sample` | f_M = f(x)ⁿ → n·F^(n−1)·f | W | C'est la fonction de répartition qui s'élève à la puissance n ; on dérive ensuite. |
| `p_max_min_swap` | proba | E | `p-max-sample` | `p-max-sample` | F_max = 1 − (1 − F)ⁿ → Fⁿ | W : formule du minimum | « max ≤ x » veut dire « tous ≤ x » : F(x)ⁿ. La formule 1 − (1 − F)ⁿ est celle du minimum. |
| `p_h0_direction` | method | C (examen MATH-234 2020–22, ex. 1) | `p-test-setup` | `p-test-setup` | H₀ : p > p₀ → H₁ : p > p₀ | P (paire d'hypothèses) | Ce que l'on veut établir (« dépasse ») va en H₁ ; H₀ garde l'égalité. |
| `p_pvalue_two_sided` | calculus | E | `p-test-setup` | `p-test-setup` | p = 0,023 → 0,046 | W : `1 − Φ(\|t\|)` en bilatéral (ou `2(1 − Φ)` en unilatéral) | Le test est bilatéral : un écart aussi grand de l'autre côté compte aussi, p = 2(1 − Φ({t})). |
| `p_pvalue_alpha_compare` | method | E | `p-test-setup` | `p-test-setup` | p = 0,03 > α ⇒ rejet → p < α ⇒ rejet | D : sens de la comparaison inversé | On rejette quand la p-valeur est **petite** : {p} < {α}. |
| `p_type_errors_swap` | notation | C (QCM EE-209 2023) | `p-test-power` | `p-test-power` | type 1 ↔ type 2 | P | Type 1 : rejeter H₀ vraie (α). Type 2 : garder H₀ fausse (β). |
| `p_error_when_correct` | proba | C (QCM EE-209 2023, Q17) | `p-test-power` | `p-test-power` | rejet avec μ = 47 > 40 : « type 1 » → aucune erreur | P | H₁ est vraie et on a rejeté H₀ : la décision est juste. |
| `p_power_alpha` | proba | E | `p-test-power` | `p-test-power` | puissance = 1 − α → 1 − β | W : `1 − α` | 1 − α est la probabilité de garder H₀ quand elle est vraie ; la puissance se calcule sous H₁. |
| `p_paired_as_two` | method | C (série 11 MATH-234) | `p-test-t1` | `p-test-t1` | deux échantillons → différences | D : « deux échantillons indépendants » pour des mesures sur les mêmes personnes | Les mêmes personnes sont mesurées deux fois : on teste les différences. |
| `p_accept_h0` | proba | C | `p-interpret` | `p-interpret` | « H₀ est vraie » → « pas de preuve contre H₀ » | P | Ne pas rejeter veut dire que les données sont compatibles avec H₀, pas qu'elles la prouvent (peu de données, faible puissance). |
| `p_pvalue_h0` | proba | R (Haller & Krauss 2002) | `p-interpret` | `p-interpret` | « p = Pr(H₀ vraie) » | P | La p-valeur se calcule **en supposant** H₀ vraie : elle ne peut pas donner la probabilité de H₀. |
| `p_reject_10_5` | logic | C (QCM EE-209 2023, Q16) | `p-interpret` | `p-interpret` | rejet à 10 % ⇒ rejet à 5 % → on ne sait pas | P | Si p_obs = 0,07, on rejette à 10 % mais pas à 5 %. C'est l'inverse qui est vrai. |
| `p_significant_large` | proba | E | `p-interpret` | `p-interpret` | « significatif, donc grand effet » | P | Avec n grand, un effet minuscule devient significatif ; regarde l'IC pour la taille de l'effet. |
| `p_multiple_tests` | proba | C (MATH-234, semaine 10 : p-hacking) | `p-interpret` | `p-interpret` | 1 rejet sur 20 tests ⇒ effet → hasard possible | P | Sur 20 tests à 5 % avec H₀ vraie, on attend un rejet par hasard. |
| `p_pooled_average` | calculus | E | `p-test-t2` | `p-test-t2` | s_p² = (s₁² + s₂²)/2 → pondérée | W : moyenne simple des variances | Avec n₁ = {n1} et n₂ = {n2}, chaque variance pèse selon ses degrés de liberté. |
| `p_two_sample_se` | calculus | E | `p-test-t2` | `p-test-t2` | se = √(s₁² + s₂²) → s_p√(1/n₁ + 1/n₂) | W | Chaque moyenne a une variance divisée par sa taille d'échantillon. |
| `p_two_prop_no_pool` | method | E | `p-test-two-prop` | `p-test-two-prop` | se = √(p̂₁q̂₁/n₁ + p̂₂q̂₂/n₂) → poolée | W | Sous H₀ les deux proportions sont égales : le cours l'estime avec les deux groupes ensemble, p̂ = {p}. |
| `p_chi2_proportions` | method | E | `p-test-chi2-gof` | `p-test-chi2-gof` | T avec fréquences → avec effectifs | W : `T/n` | Le χ² compare des **effectifs** ; avec des proportions, T est divisé par n = {n}. |
| `p_chi2_df` | method | C (formulaire MATH-234) | `p-test-chi2-gof` | `p-test-chi2-gof` | r = k → k − 1 − c | W : quantile lu avec r = k, ou sans retirer c | r = {k} − 1 − {c} = {r} : un degré perdu par la somme fixée, un par paramètre estimé. |
| `p_chi2_divide_obs` | calculus | E | `p-test-chi2-gof` | `p-test-chi2-gof` | (o − e)²/o → (o − e)²/e | W | On divise par l'effectif **attendu** sous H₀. |
| `p_chi2_df_indep` | method | E | `p-test-chi2-indep` | `p-test-chi2-indep` | r = hk − 1 → (h − 1)(k − 1) | W | Les marges sont estimées : r = ({h} − 1)({k} − 1) = {r}. |
| `p_chi2_expected_uniform` | method | E | `p-test-chi2-indep` | `p-test-chi2-indep` | e = n/(hk) → n_i·n_·j/n | W | Sous l'indépendance, e_ij = (total ligne × total colonne)/n, pas une répartition uniforme. |
| `p_chi2_var_n` | calculus | E | `p-test-chi2-var` | `p-test-chi2-var` | T = n·s²/σ₀² → (n − 1)s²/σ₀² | W | Avec s² (diviseur n − 1), le pivot est (n − 1)s²/σ₀². |
| `p_chi2_var_inverted` | calculus | E | `p-test-chi2-var` | `p-test-chi2-var` | (n − 1)σ₀²/s² → (n − 1)s²/σ₀² | W | Le pivot met la variance observée au numérateur. |
| `p_chi2_ci_swapped` | calculus | E | `p-test-chi2-var` | `p-test-chi2-var` | bornes avec quantiles échangés | W : bornes inversées (inf > sup) ou divisées par le mauvais quantile | Diviser par le **grand** quantile donne la **petite** borne. |
| `p_reg_x_on_y` | proba | C (QCM EE-209 2023, Q20) | `p-reg-ls` | `p-reg-ls` | x = (y − b)/a → pente r·s_x/s_y | W | Régresser x sur y minimise d'autres écarts (horizontaux) : ce n'est pas la droite inverse, sauf si \|r\| = 1. |
| `p_reg_slope_swap` | calculus | E | `p-reg-ls` | `p-reg-ls` | β̂ = S_xy/S_yy → S_xy/S_xx | W | La pente de y sur x divise par la dispersion de x. |
| `p_reg_sums_raw` | calculus | E | `p-reg-ls` | `p-reg-ls` | β̂ = Σxy/Σx² → centré | W | Il faut centrer : Σxᵢyᵢ − n·x̄ȳ et Σxᵢ² − n·x̄². |
| `p_reg_sigma_n` | numeric | C | `p-reg-test` | `p-reg-test` | σ̂² = 2,4/5 → 2,4/3 | W : `RSS/n`, `RSS/(n − 1)` | Deux paramètres estimés (α, β) : on divise par n − 2 = {v}. |
| `p_reg_se_alpha` | calculus | E | `p-reg-test` | `p-reg-test` | se(α̂) = σ̂/√n → σ̂√(1/n + x̄²/S_xx) | W | L'ordonnée à l'origine est une extrapolation en x = 0 : le terme x̄²/S_xx = {v} compte. |
| `p_design_collinear` | linear | C (QCM EE-209 2023, Q19) | `p-reg-multi` | `l-orth-lsq` | [1, 1_T, 1_H, x] → [1_T, 1_H, x] | le juge `matrix` détecte des colonnes dépendantes | 1_T + 1_H = colonne de 1 : XᵀX n'est pas inversible. |
| `p_design_separate_slopes` | method | E | `p-reg-multi` | `p-reg-multi` | deux colonnes de pente → une seule | W (option de QCM) | Le modèle suppose la **même** pente a pour les deux races : une seule colonne x. |
| `p_f_df_swap` | notation | E | `p-reg-multi` | `p-reg-multi` | F_{16, 2} → F_{2, 16} | W | Numérateur : p − q = {a} paramètres ; dénominateur : n − p = {b}. |
| `p_f_ratio_inverted` | calculus | E | `p-reg-multi` | `p-reg-multi` | F = 0,19 → 5,33 | W : `1/F` | Le gain par paramètre ajouté est au numérateur. |
| `p_diag_normal_y` | method | C (MATH-234, semaine 14) | `p-reg-diag` | `p-reg-diag` | QQ-plot de y → des résidus | P | Le modèle suppose les **erreurs** normales ; y dépend de x et n'a pas à être normal. |
| `p_r2_high_good` | proba | E | `p-reg-diag` | `p-reg-diag` | R² = 0,95 ⇒ modèle adapté → regarder les résidus | P ; tf | Une parabole peut donner R² élevé avec une droite ; la courbure se voit sur les résidus. |
| `p_outlier_delete` | method | C (MATH-234, semaine 14) | `p-reg-diag` | `p-reg-diag` | supprimer le point aberrant → vérifier d'abord | P | On ne retire un point que s'il est une erreur de mesure ; sinon on le signale et on compare les deux ajustements. |
| `p_beta_swap` | notation | E | `p-bayes-beta` | `p-bayes-beta` | Beta(1, 3) → Beta(3, 1) | W : paramètres échangés | Les succès s'ajoutent au **premier** paramètre : Beta(α + N, β + n − N). |
| `p_beta_prior_not_added` | proba | E | `p-bayes-beta` | `p-bayes-beta` | Beta(2, 0) → Beta(3, 1) | W : `Beta(N, n − N)` | L'a priori uniforme est Beta(1, 1) : on ajoute les comptes à 1 et 1. |
| `p_map_pm_confused` | notation | E | `p-bayes-beta` | `p-bayes-beta` | MAP = 9/14 → 2/3 | W : PM pour MAP et l'inverse | Le MAP est le mode : (α − 1)/(α + β − 2) pour une Beta ; la PM est la moyenne α/(α + β). |
| `p_gauss_posterior_avg` | proba | E | `p-bayes-gauss` | `p-bayes-gauss` | μ_post = 2,35 → 2,3 | W : `(μ₀ + x̄)/2` | Les deux sources n'ont pas la même précision : la mesure (précision {a}) pèse plus que l'a priori ({b}). |
| `p_gauss_post_var_add` | calculus | E | `p-bayes-gauss` | `p-bayes-gauss` | σ²_post = 1,5 → 1/3 | W : `τ² + σ²` | Une donnée de plus réduit l'incertitude : ce sont les précisions qui s'additionnent. |
| `p_precision_n` | calculus | E | `p-bayes-gauss` | `p-bayes-gauss` | n = 51 → 50 | W : n tiré de `σ²/n < seuil` (a priori oublié), ou inégalité mal tournée | σ²_post = 1/(1/τ² + n/σ²) = 1/(1 + 2n) < 0,01 donne n ≥ 50. |
| `p_dirichlet_alpha0` | calculus | E | `p-bayes-conjugate` | `p-bayes-conjugate` | PM₁ = 4/10 → 4/13 | W : dénominateur `n` au lieu de `α₀ + n` | La PM divise par la somme de tous les paramètres a posteriori : α₀ + n = {v}. |
| `p_multinomial_no_coef` | calculus | E | `p-bayes-conjugate` | `p-count` | 1/64 → 3/16 | T : supprimer `n!/(N₁!···N_K!)` | Il y a {c} ordres possibles pour obtenir ces comptes. |

## Exemples de type examen

Plans d'examen : `ba3-proba` (MATH-234 : questions courtes de calcul notées sur la valeur finale, variante `coef`, et QCM à 5 points ; puis questions à développer `open` de 10 à 15 points ; documents : formulaire et tables) et `ba4-stat` (EE-209 : QCM +3/0/−1 et vrai/faux +1/0/−1, sans calculatrice, quantiles fournis). Les énoncés ci-dessous sont reformulés et leurs nombres changés.

**1. Maximum de vraisemblance et IC de Wald** (MATH-234, `open`, 10 points ; `p-mle`, `p-ci-wald`). La hauteur de pluie journalière X a pour densité f(x ; θ) = √θ·e^(−θx)/√(πx) pour x > 0, θ > 0. Sur n = 50 jours indépendants, Σxᵢ = 100 mm.
1. Écrire L(θ) : L(θ) ∝ θ^(n/2)·e^(−θΣxᵢ) — 1 pt.
2. ℓ(θ) = (n/2) ln θ − θΣxᵢ + constante — 1 pt.
3. ℓ′(θ) = n/(2θ) − Σxᵢ — 1 pt.
4. θ̂ = n/(2Σxᵢ) = 50/200 = 0,25 — 1,5 pt.
5. ℓ″(θ) = −n/(2θ²) < 0 pour tout θ > 0 : ℓ est concave, θ̂ est le maximum global — 1,5 pt.
6. Var(θ̂) ≈ 1/(−ℓ″(θ̂)) = 2θ̂²/n = 0,0025, se = 0,05 — 1,5 pt.
7. IC₉₅ = 0,25 ± 1,96 · 0,05 = [0,152 ; 0,348] — 1,5 pt.
8. Hypothèses : n grand, conditions de régularité (le support ne dépend pas de θ) — 1 pt.

**2. Un test médical, puis deux** (MATH-234, `open`, 10 points ; `p-bayes-freq`, `p-bayes-formula`). Prévalence 20 % ; le test est positif avec probabilité 0,8 chez un malade et 0,1 chez une personne saine.
1. Nommer les événements (M, T₁, T₂) et traduire les données en probabilités conditionnelles — 1 pt.
2. Sur 1 000 personnes : 200 malades dont 160 positifs ; 800 sains dont 80 positifs — 1 pt.
3. Pr(M | T = 1) = 0,8 · 0,2/(0,8 · 0,2 + 0,1 · 0,8) = 0,16/0,24 = 2/3 — 2 pts (formule 1, valeur 1).
4. Deux tests positifs, indépendants sachant l'état : Pr(T₁ = 1, T₂ = 1 | M) = 0,8² — 2 pts.
5. Pr(M | T₁ = T₂ = 1) = 0,64 · 0,2/(0,64 · 0,2 + 0,01 · 0,8) = 0,128/0,136 = 16/17 ≈ 0,941 — 2 pts.
6. Vérification : a posteriori 2/3 utilisé comme a priori pour le 2ᵉ test, même résultat — 1 pt.
7. Interpréter (QCM) — 1 pt.

**3. Régression : faut-il une ordonnée à l'origine ?** (MATH-234, `open`, 10 points ; `p-reg-ls`, `p-reg-test`). Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Données : x = 1, 2, 3, 4, 5, 6 ; y = 3, 4, 4, 6, 7, 6. Résumés donnés : x̄ = 3,5, ȳ = 5, S_xx = 17,5, S_xy = 13, S_yy = 12. Tester H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 %.
1. β̂ = 13/17,5 ≈ 0,743 — 2 pts.
2. α̂ = 5 − 0,743 · 3,5 = 2,4 — 1 pt.
3. RSS = 12 − 0,743 · 13 ≈ 2,343 ; σ̂² = RSS/(n − 2) ≈ 0,586 — 2 pts.
4. se(α̂) = σ̂·√(1/6 + 3,5²/17,5) ≈ 0,712 — 2 pts.
5. t_obs = 2,4/0,712 ≈ 3,37 ; ν = 4 ; s₅(4) = 2,776 ; |t_obs| > 2,776 : rejeter H₀ — 2 pts.
6. Interpréter : les données demandent une ordonnée à l'origine non nulle (au niveau 5 %) — 1 pt.

**4. L'ascenseur** (MATH-234, `coef`, 5 points ; `p-clt-sum`). Un ascenseur accepte 25 personnes ; le poids d'une personne a pour espérance 72 kg et pour écart-type 15 kg. Probabilité approchée que 25 personnes dépassent 1 950 kg ?
1. E[S] = 25 · 72 = 1 800 — 1 pt.
2. sd(S) = √25 · 15 = 75 — 1,5 pt.
3. z = (1 950 − 1 800)/75 = 2 — 1 pt.
4. Pr(S > 1 950) ≈ 1 − Φ(2) = 0,023 — 1,5 pt.

**5. Test t et IC** (MATH-234, `open`, 10 points ; `p-test-t1`, `p-ci-mean`, `p-interpret`). Consommation (L/100 km) de 6 voitures supposée normale : 12, 14, 11, 15, 13, 13. Le constructeur annonce 12 L/100 km.
1. H₀ : μ = 12 contre H₁ : μ ≠ 12, niveau 5 % — 1 pt.
2. x̄ = 13 ; s² = 10/5 = 2 — 2 pts.
3. t_obs = (13 − 12)/√(2/6) ≈ 1,73 — 2 pts.
4. ν = 5, s₅(5) = 2,571 — 1 pt.
5. |1,73| < 2,571 : ne pas rejeter H₀ — 1 pt.
6. IC₉₅ = 13 ± 2,571 · 0,577 = [11,52 ; 14,48] ; 12 est dans l'IC, cohérent avec le test — 2 pts.
7. Interpréter (QCM : « les données ne contredisent pas l'annonce » ✓ ; « l'annonce est prouvée » ✗) — 1 pt.

**6. Statistique bayésienne** (EE-209, trois QCM à +3/0/−1 ; `p-bayes-beta`, `p-bayes-gauss`).
1. A priori uniforme sur la probabilité θ qu'un capteur détecte un objet ; 3 détections sur 4 essais indépendants. A posteriori ? Options : Beta(3, 1), **Beta(4, 2)**, Beta(2, 4), Beta(3, 2) (distracteurs : `p_beta_prior_not_added`, `p_beta_swap`, a priori ajouté d'un seul côté).
2. Même situation : PM et MAP ? Options : **(2/3 ; 3/4)**, (3/4 ; 2/3), (2/3 ; 2/3), (3/4 ; 3/4) (distracteur principal : `p_map_pm_confused`).
3. A priori N(10, 4) pour une grandeur θ ; chaque mesure suit N(θ, 4), indépendantes. Nombre minimal de mesures pour une variance a posteriori < 0,5 ? σ²_post = 4/(n + 1) < 0,5 ⇔ n ≥ 8. Options : 7, **8**, 9, 17 (distracteurs : `p_precision_n` → 9 en oubliant l'a priori (4/n < 0,5), 7 en tournant mal l'inégalité ; `p_gauss_post_var_add` → 17, avec (4 + 4)/n < 0,5).

