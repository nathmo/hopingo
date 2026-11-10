# L. Algèbre linéaire

Extensions du §16 utilisées : §16.1 matrices à paramètres (`cases`), complexes partout (`eigvec` avec `complex: true`), nœuds `det`, `tr`, `norm` ; §16.2 `rowops` avec `params` et `track: 'det' | 'lu'`, `span` avec `nested` et `affine`, `factor` avec `askCoef.convention`, `poly` avec paramètre λ, `ode` à inconnue vectorielle (M) ; §16.3 QCM à plusieurs réponses, QCM « réponse courte », contre-exemples (`matPair`, `matOne`…), `matrix` à cases symboliques, `plot`, au moins 2 exemples d'examen par module ; §16.4 familles nouvelles (`linear`, `logic`), tag C, réparation dans un autre module, pièges partagés (réutilise `g4_proj_no_square`, `g9_proof_by_example` ; `l_compose_order` et `l_lsq_normal_aat` servent aussi en A2 et M).

Unité `alglin` · préfixe `l-` · pièges `l_` · Statut : L fait le 10 novembre 2026 (étape U3) ; M à faire (étape U8). Les cases à remplir des lignes guidées sont des cases de la grille (`cells`) ; le niveau 5 et les variantes `open` sont des items sans aide, en attendant le type `problem` (U4).

> Ce fichier contient deux catalogues : **L** (algèbre linéaire de BA1, ci-dessous) et **M** (analyse matricielle, niveau BA4, plus bas). Chacun suit le gabarit du §15 du [README](README.md). Les briques communes (générateurs à l'envers, contre-exemples, QCM « coefficient ») sont décrites une seule fois, au début de L, et M les réutilise.

**Sources** : MATH-111 Algèbre linéaire, manuel de Lay (chapitres 1 à 6, 7.1 et 7.4) ; résumés du MOOC (chapitres 1 à 10) ; séries GM 2022 (N. Pointet) et séries MT 2017 (J. Scherer) ; examens GM 2015, 2018, 2019, partie commune 2021 (énoncés et réponses) ; tests intermédiaires 2019, test blanc 2020 ; série de révision 2017 ; partie spécifique MT 2016 et 2017 (J. Scherer), avec son « Programme — champ de l'examen » ; liste des théorèmes à savoir démontrer (GM 2015).

**Notation** : celle des examens.
- aᵢⱼ est le coefficient de la ligne i et de la colonne j. Les indices sont comptés à partir de 1 à l'écran. Dans `askCoef.path`, ils sont comptés à partir de 0 (ℓ₄₂ → `path:[3,1]`).
- Iₙ est l'identité. Pₙ est l'espace des polynômes de degré ≤ n, en la variable t. M_{m×n}(ℝ) est l'espace des matrices m × n.
- Ker A et Im A sont acceptés, ainsi que Col A et Lgn A (cours MT). Span{…} et Vect{…} sont tous deux acceptés.
- Le produit scalaire canonique est x · y = xᵀy.
- [x]_B désigne les coordonnées de x dans la base B. La matrice de passage de B vers C est P_{C←B}, avec [x]_C = P_{C←B}·[x]_B. On accepte aussi l'écriture MT (Id)_{CB}.
- [T]_{C B} est la matrice de T par rapport aux bases B (départ) et C (arrivée) : [T(v)]_C = [T]_{C B}·[v]_B.
- Opérations : `L2 ← L2 − 3L1`, `L1 ↔ L3`, `L2 ← (1/2)L2`.
- Dans la grille de matrice, pas de décimaux : on écrit 3/2. Les racines sont permises dans les factorisations orthogonales (1/√5, 2/√6).

**Prérequis extérieurs** :
- Plan d'algèbre : `@alg:E-systemes-2x2`, `@alg:H-discriminant`, `@alg:D-trinome`, `@alg:I-equation-parametre`, `@alg:J-hausse-baisse`.
- `g0-factor-thm`.
- `g3-exact`.
- `g4-vectors`, `g4-line2`, `g4-dot`, `g4-cross`.
- `g5-geom`.
- `g8-algebraic`, `g8-polar`.
- `g9-implication`, `g9-proof-contra`, `g9-counterexample`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g9-implication`, `g9-proof-contra`, `g0-factor-thm`, `g3-exact`, `g5-geom`, `g4-line2`, `g4-vectors`, `g8-algebraic`, `g8-polar`.

### Format de l'examen

- **Partie commune** (plan `ba1-alglin`, §10) : 144 minutes, 16 QCM (+3 / 0 / −1) et 16 vrai/faux (+1 / 0 / −1), sans document. Un QCM sur deux environ demande **un seul nombre** au bout d'un long calcul : b₃₂ de A⁻¹, r₁₃ de la forme réduite, ℓ₄₂ de L, a₃₄ d'une matrice de T, x₁ d'une solution aux moindres carrés, r₃₃ de QR. Trois QCM peuvent s'enchaîner sur la même matrice : Gram-Schmidt, puis une projection, puis r₃₃ (2021, questions 13 à 15). Le vrai/faux porte sur des énoncés « toujours vrais », et l'élève qui répond « faux » doit pouvoir donner un contre-exemple.
- **Partie spécifique MT** (2016, 2017) : une preuve courte (4 points) et un long problème (14 points) : orthodiagonalisation d'une 4 × 4 ou SVD complète. Ces items sont des `problem` (`exam: 'open'`). Le plan `ba1-alglin` ne les contient pas ; voir la question ouverte à la fin du fichier.

### Outils communs (L et M)

**Générateurs à l'envers** (`js/content/uni/alglin.js`, réutilisés par `matrices.js`). Toutes les matrices sont sur ℚ, calculées par `cas/matrix.js`.

| Aide | Ce qu'elle fait | Contraintes |
|---|---|---|
| `unimodular(n, rng, {max})` | Produit de 3 à 5 opérations entières `Lᵢ ← Lᵢ + kLⱼ` (k ∈ {±1, ±2}) et d'échanges appliquées à Iₙ | det = ±1, M et M⁻¹ entières, coefficients ≤ `max` (3 par défaut, 5 au niveau 5) |
| `rrefWith(m, n, pivots, rng)` | Forme réduite R avec les pivots donnés et des entrées libres dans [−3 ; 3], puis A = M·R avec M = `unimodular(m)` | Aucune colonne nulle dans A ; au plus 2 coefficients de A hors de [−9 ; 9] |
| `luPair(n, rng, {fracL})` | L unitriangulaire inférieure (ℓᵢⱼ ∈ [−3 ; 3]), U triangulaire supérieure (pivots dans {±1, ±2, 3}) ; A = LU | Avec `fracL`, un pivot de U vaut 2 et la ligne de U correspondante est paire, pour qu'un ℓ vaille k/2 sans que A cesse d'être entière |
| `pdp(eigs, rng)` | P = `unimodular(n)`, D = diag(eigs), A = PDP⁻¹ | A entière, coefficients ≤ 12 |
| `orthRational(n, rng)` | Table de matrices orthogonales à coefficients rationnels : 2 × 2 à partir des triplets (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25) ; 3 × 3 : (1/3)[[1, 2, 2], [2, 1, −2], [2, −2, 1]], (1/7)[[2, 3, 6], [3, −6, 2], [6, 2, −3]], (1/9)[[1, 4, 8], [4, 7, −4], [8, −4, 1]] ; 4 × 4 : (1/2)·Hadamard ; tout Householder I − 2vvᵀ/(vᵀv) avec v entier | Permutations et changements de signe des lignes et colonnes |
| `orthIntBasis(n, k, rng)` | k vecteurs entiers deux à deux orthogonaux (coefficients dans [−3 ; 3]) : v₁ au hasard, puis vⱼ dans le noyau entier de [v₁ᵀ ; … ; vⱼ₋₁ᵀ] | ‖vᵢ‖² ≤ 14 |
| `gsReverse(vs, rng)` | xⱼ = vⱼ + Σ_{i<j} cᵢⱼ·vᵢ avec cᵢⱼ ∈ {−2, …, 2} : Gram-Schmidt sur (x₁, …, x_k) redonne exactement (v₁, …, v_k), et les coefficients de projection valent cᵢⱼ | Au moins un cᵢⱼ ≠ 0 par colonne j ≥ 2 |
| `lsqReverse(A, x̂, rng)` | b = A·x̂ + r, avec r ≠ 0 entier dans Ker Aᵀ | Ax = b incompatible ; x̂ entier ou de dénominateur ≤ 10 |
| `svdReverse(m, n, rng)` | U et V tirées de `orthRational` (ou de colonnes en 1/√2, 1/√5), σᵢ choisis pour que A = UΣVᵀ soit entière | A entière, coefficients ≤ 9, σ₁ > σ₂ |
| `polyBasis(n, rng)` | Base de Pₙ par une matrice `unimodular` lue dans la base (1, t, …, tⁿ) | Coordonnées entières |

Chaque générateur abandonne après 200 tirages et prend son exemple de secours (le corrigé type de la compétence). Le test vérifie que le secours sert moins d'une fois sur 100.

**Contre-exemples** (`judges/examples.js`). Un item `tf` faux porte `counter: {kind, params, keys}`. L'élève entre un objet dans la grille ; le vérificateur le teste exactement sur ℚ. Les sortes utilisées dans L et M :

| `kind` | Ce que l'élève entre | Vérification |
|---|---|---|
| `matPair` | Deux matrices A, B de la taille `params.n` | `params.test` est faux pour ce couple : `'AB=BA'`, `'(AB)^-1=A^-1B^-1'`, `'det(A+B)=detA+detB'`, `'(A+B)^2=A^2+2AB+B^2'`, `'AB=0 ⇒ A=0 ou B=0'` |
| `matOne` | Une matrice | `params.want` : `'nilpotent'` (A ≠ 0, A² = 0), `'notDiag'` (pas diagonalisable sur ℝ), `'diagRepeated'` (diagonalisable avec une valeur propre multiple), `'noRealEig'`, `'orthCols'` (colonnes orthogonales non nulles mais AᵀA ≠ I), `'detMinus1Orth'`, `'eigspaceDim'` (pour un polynôme caractéristique imposé, dim E_λ ≠ k), `'singularAtA'` (AᵀA non inversible), `'symNotPD'`, `'sameEigNotSimilar'` (avec la matrice de l'énoncé) |
| `vecFamily` | Une famille de vecteurs ou de polynômes, et parfois des scalaires | `params.want` : `'scaledDependent'` (les αᵢvᵢ sont liés alors que les vᵢ sont libres), `'orthNotTransitive'` (u ⊥ v, v ⊥ w, u non ⊥ w), `'spanNotBasis'` |
| `setWitness` | Deux éléments du sous-ensemble (et un scalaire) | Leur somme, ou le multiple, sort de l'ensemble ; ou bien 0 n'y est pas |
| `mapWitness` | Deux vecteurs x ≠ y | T(x) = T(y) : T n'est pas injective |
| `dims` | Des tailles m, n et un rang | Les tailles contredisent l'énoncé : par exemple m < n et une solution unique |

**QCM « coefficient ».** La bonne réponse vient du corrigé. Les trois distracteurs viennent d'abord des `wrongValues` ou des `transform` des pièges listés dans l'entrée de la compétence, appliqués à la question. S'il en manque, on complète avec des voisins (coefficient d'indice transposé, signe opposé, coefficient voisin dans la même ligne), chacun marqué `rule: 'l_coef_index_swap'` ou `null`. Les quatre options doivent être distinctes.

**Vrai/faux.** Chaque compétence donne des gabarits « toujours vrai ? ». Un tirage choisit un gabarit, puis une variante vraie ou fausse avec une probabilité ½. L'explication cite la règle ou montre le contre-exemple.

---

## Compétences

**Systèmes linéaires (Lay 1.1, 1.2, 1.5)**

### `l-sys-augmented` — Matrice augmentée et opérations élémentaires
- **Année** 13 · **Prérequis** `@alg:E-systemes-2x2` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `@alg:E-systemes-2x2` : un système linéaire et son ensemble de solutions.
- **Statut** : fait le 10 novembre 2026 (étape U3). Pas de variante d'examen (absorbée par les compétences suivantes).
- **Intro** : un système s'écrit comme une matrice augmentée [A | b]. Trois opérations ne changent pas l'ensemble des solutions : échanger deux lignes, multiplier une ligne par k ≠ 0, ajouter à une ligne un multiple d'une autre. L'opération porte sur **toute** la ligne, second membre compris. Exemple : `x + 2y − z = 3 ; 2x + 5y + z = 7` → `[[1, 2, −1 | 3], [2, 5, 1 | 7]]` (note : une ligne par équation) → `L2 ← L2 − 2L1` → `[0, 1, 3 | 1]` (note : le 7 devient 7 − 2·3).
- **Juge** : `rowops` `{A: [A|b], multi: false}` · **Forme finale** : sous le premier pivot, la colonne est nulle.
- **Niveaux** :
  - L1 (guidé) : la matrice augmentée est donnée avec deux cases vides ; puis l'opération est annoncée et la ligne résultat a 2 trous.
  - L2 : l'élève écrit toute la matrice augmentée ; l'opération est à choisir parmi 3 (dont une qui ne crée pas de zéro).
  - L3 (choisir l'action) : barre d'opérations de la grille ; l'élève choisit i, j et k ; l'app calcule, l'élève confirme.
  - L4 (libre) : l'élève tape l'opération et la ligne obtenue.
  - L5 (seul) : système 3 × 3 donné en équations, de la mise en matrice à la première colonne nettoyée, sans aide.
- **Générateur** : solution x* entière dans [−3 ; 3]³ ; A = `unimodular(3)` ou une matrice entière à coefficients dans [−5 ; 5] avec a₁₁ = ±1 ; b = Ax*. Gabarits : (a) système en équations x, y, z ; (b) système en x₁, x₂, x₃ avec une équation où manque une variable (le 0 à écrire est un piège visuel). Exclus : a₁₁ = 0 avant L3 (au-delà, un échange est nécessaire et proposé).
- **Corrigé type** : `x + 2y − z = 3 ; 2x + 5y + z = 7 ; −x + y + 4z = 0`.
  1. `[[1, 2, −1 | 3], [2, 5, 1 | 7], [−1, 1, 4 | 0]]` — *écrire la matrice augmentée*
  2. `L2 ← L2 − 2L1` : `[0, 1, 3 | 1]` — *annuler sous le pivot*
  3. `L3 ← L3 + L1` : `[0, 3, 3 | 3]` — *annuler sous le pivot* (fin)
- **Aides** : 1 « Choisis k pour que le coefficient sous le pivot devienne 0 : k = a₂₁/a₁₁. » · 2 `L2 ← L2 − □L1 : [0, □, □ | □]` · 3 la ligne entière.
- **Variantes d'examen** : aucune (absorbée par les compétences suivantes).
- **Pièges** : `l_rhs_forgotten`, `l_rowop_sign`, `l_rowop_partial`, `l_rowop_wrong_row`.
- **Sous-buts → crédit** : écrire la matrice → `l-sys-augmented` ; annuler sous le pivot → `l-sys-augmented`.

### `l-sys-echelon` — Forme échelonnée, pivots
- **Année** 13 · **Prérequis** `l-sys-augmented` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U3). Au niveau 5, les colonnes pivots s'écrivent comme un vecteur de numéros, (1 ; 3). Le vrai/faux « la forme échelonnée est unique » demande A et deux formes échelonnées (`matOne` `echelonNotUnique`).
- **Intro** : on descend colonne par colonne : un pivot, puis des zéros dessous. Si le pivot est nul, on échange avec une ligne plus bas. La forme échelonnée donne les pivots, donc le rang et les variables libres. Exemple : `[0, 3, 3 | 3]` sous `[0, 1, 3 | 1]` → `L3 ← L3 − 3L2` → `[0, 0, −6 | 0]` (note : trois pivots, solution unique).
- **Juge** : `rowops` `{A, multi: true}` (plusieurs opérations par ligne acceptées dès L4) · **Forme finale** : forme échelonnée (chaque pivot à droite du précédent, lignes nulles en bas) ; puis une ligne de décision « nombre de pivots = □ ».
- **Niveaux** :
  - L1 (guidé) : opérations annoncées, résultats à trous.
  - L2 : un échange de lignes est nécessaire ; l'élève choisit entre « échanger » et « diviser par 0 » (refusé avec message).
  - L3 (choisir l'action) : barre d'opérations ; l'app refuse une opération qui détruit un zéro déjà obtenu (message, pas faute).
  - L4 (libre) : matrice 3 × 4 ou 4 × 4, lignes libres.
  - L5 (seul) : 4 × 5 avec un pivot nul en route, puis « nombre de pivots » et « colonnes pivots ».
- **Générateur** : `rrefWith(m, n, pivots)` avec m ∈ {3, 4}, n ∈ {3, 4, 5}, rang ∈ {2, 3, 4} ; au L2 et au L5, on force a₂₂ = 0 après la première étape (on permute deux lignes de M). Gabarits : (a) « échelonne » ; (b) « combien de pivots ? quelles colonnes ? » ; (c) augmentée, avec la question « le système est-il compatible ? ».
- **Corrigé type** (suite de `l-sys-augmented`) :
  1. `[[1, 2, −1 | 3], [0, 1, 3 | 1], [0, 3, 3 | 3]]` — *repartir de la première colonne nettoyée*
  2. `L3 ← L3 − 3L2` : `[0, 0, −6 | 0]` — *annuler sous le 2e pivot*
  3. Pivots en colonnes 1, 2, 3 ; aucune variable libre — *lire les pivots*
- **Aides** : 1 « Traite une colonne à la fois ; ne touche plus aux lignes au-dessus du pivot courant. » · 2 `L3 ← L3 − □L2` · 3 la ligne entière.
- **Variantes d'examen** : `mcq` « Combien de pivots ? » / « Quel est le rang ? » (distracteurs : `l_rowop_sign`, `l_rowop_partial`, rang = nombre de lignes). `tf` : « Deux formes échelonnées de A ont les mêmes pivots » (vrai : les positions sont les mêmes) ; « La forme échelonnée de A est unique » (faux : contre-exemple `matOne`, une matrice et deux formes échelonnées différentes, `keys: ['A', 'E1', 'E2']`).
- **Pièges** : `l_rowop_sign`, `l_rowop_partial`, `l_rhs_forgotten`, `l_rowop_wrong_row`.
- **Sous-buts → crédit** : annuler sous un pivot → `l-sys-augmented` ; échanger → `l-sys-echelon` ; lire les pivots → `l-sys-echelon`.

### `l-sys-rref` — Forme échelonnée réduite
- **Année** 13 · **Prérequis** `l-sys-echelon` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U3). Le niveau 5 et la variante `coef` ne demandent que rᵢⱼ. Un vrai/faux faux s'ajoute (« même forme réduite ⇒ égales », `matPair` `sameRref`).
- **Intro** : après la descente, on remonte : chaque pivot vaut 1, et la colonne d'un pivot a des zéros au-dessus comme au-dessous. La forme réduite est **unique**, ce qui permet de poser « que vaut r₁₃ ? ». Exemple : `[1, 2, −1, 0]` au-dessus de `[0, 1, 1, −1]` → `L1 ← L1 − 2L2` → `[1, 0, −3, 2]` (note : r₁₃ = −3).
- **Juge** : `rowops` `{A, reduced: true, multi: true}` · **Forme finale** : forme réduite ; `askCoef` au format examen.
- **Niveaux** :
  - L1 (guidé) : descente déjà faite ; la remontée est annoncée, avec des trous.
  - L2 : l'élève choisit l'ordre de la remontée (« du dernier pivot vers le premier » est proposé avec l'autre ordre, qui marche aussi mais coûte plus : `quality:'poor'`).
  - L3 (choisir l'action) : barre d'opérations, de bout en bout.
  - L4 (libre) : matrice 3 × 4 entière, lignes libres.
  - L5 (seul) : 3 × 4 ou 4 × 5 ; on ne demande que rᵢⱼ (format examen), sans aide.
- **Générateur** : `rrefWith(3, 4, pivots)` avec des pivots en colonnes (1, 2), (1, 2, 4) ou (1, 3, 4) ; entrées libres de R dans [−4 ; 4], au moins une non nulle et différente de ±1 (le coefficient demandé). Gabarits : (a) « forme réduite » ; (b) « que vaut r₁₃ ? » ; (c) même matrice que 2021 Q6 (3 × 4 avec une ligne qui devient nulle).
- **Corrigé type** : A = `[[1, 2, −1, 0], [1, 3, 0, −1], [2, 1, −5, 3]]`.
  1. `L2 ← L2 − L1` : `[0, 1, 1, −1]` — *descendre*
  2. `L3 ← L3 − 2L1` : `[0, −3, −3, 3]` — *descendre*
  3. `L3 ← L3 + 3L2` : `[0, 0, 0, 0]` — *descendre* (rang 2)
  4. `L1 ← L1 − 2L2` : `[1, 0, −3, 2]` — *remonter*
  5. R = `[[1, 0, −3, 2], [0, 1, 1, −1], [0, 0, 0, 0]]`, r₁₃ = −3 — *lire le coefficient*
- **Aides** : 1 « Rends chaque pivot égal à 1, puis remonte en partant du dernier pivot. » · 2 `L1 ← L1 − □L2 : [1, 0, □, □]` · 3 la ligne entière.
- **Variantes d'examen** : `coef` rᵢⱼ ; `mcq` rᵢⱼ (distracteurs : `l_rowop_sign`, `l_rowop_partial`, la valeur de la forme échelonnée non réduite, qui vaut ici −1). `tf` : « La forme échelonnée réduite d'une matrice est unique » (vrai).
- **Pièges** : `l_rowop_sign`, `l_rowop_partial`, `l_rref_not_reduced`.
- **Sous-buts → crédit** : descendre → `l-sys-echelon` ; remonter → `l-sys-rref` ; lire le coefficient → `l-sys-rref`.

### `l-sys-solution` — Variables libres, solution paramétrique
- **Année** 13 · **Prérequis** `l-sys-rref` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U3). Les niveaux 1 et 2 partent de la forme réduite ; le gabarit (c) (solution particulière, puis générale) n'est pas construit.
- **Intro** : sur la forme réduite, chaque colonne sans pivot donne une variable libre. On exprime les variables pivots en fonction des libres, puis on écrit x = p + t·v (+ s·w). Une ligne `[0 … 0 | c]` avec c ≠ 0 veut dire : aucune solution. Exemple : `x₁ − 3x₃ = 2 ; x₂ + x₃ = −1` → `x = (2 ; −1 ; 0) + t·(3 ; −1 ; 1)` (note : x₃ = t est libre).
- **Juge** : `rowops` jusqu'à la forme réduite, puis `span` `{basis: [v…], affine: p, require: 'basis'}` sur la ligne « x = p + t·v » · **Forme finale** : forme vectorielle paramétrique ; toute paramétrisation du même ensemble est acceptée (autre point particulier, autre vecteur directeur).
- **Niveaux** :
  - L1 (guidé) : forme réduite donnée ; l'élève remplit « x₁ = □ + □t ».
  - L2 : l'élève choisit les variables libres (menu : les colonnes sans pivot, ou un mauvais choix avec message).
  - L3 (choisir l'action) : réduire, puis écrire les équations, puis la forme vectorielle.
  - L4 (libre) : système 3 × 4 donné en équations.
  - L5 (seul) : système avec 2 variables libres, ou incompatible (alors la réponse est « aucune solution »).
- **Générateur** : `rrefWith` sur la matrice augmentée [A | b] ; 1 ou 2 variables libres ; au L5, 1 tirage sur 4 incompatible (dernière ligne `[0 … 0 | c]`, c ≠ 0). Gabarits : (a) système en équations ; (b) matrice augmentée ; (c) « donne une solution particulière » puis « la solution générale ».
- **Corrigé type** : `x₁ + 2x₂ − x₃ = 0 ; x₁ + 3x₂ = −1 ; 2x₁ + x₂ − 5x₃ = 3`.
  1. Réduite : `[[1, 0, −3 | 2], [0, 1, 1 | −1], [0, 0, 0 | 0]]` — *réduire* (mêmes opérations que `l-sys-rref`)
  2. x₃ est libre ; `x₁ = 2 + 3x₃`, `x₂ = −1 − x₃` — *exprimer les variables pivots*
  3. `x = (2 ; −1 ; 0) + t·(3 ; −1 ; 1)`, t ∈ ℝ — *forme vectorielle*
- **Aides** : 1 « Les variables sans pivot sont libres : pose x₃ = t. » · 2 `x₁ = 2 + □t, x₂ = □ − t` · 3 la ligne entière.
- **Variantes d'examen** : `mcq` « une solution est… » ou « la solution générale est… » (distracteurs : `l_free_var_zero`, `l_ker_sign`, `l_rhs_forgotten`). `tf` : « Si Ax = b a deux solutions, il en a une infinité » (vrai) ; « Si Ax = 0 a une infinité de solutions, Ax = b aussi » (faux : contre-exemple `dims` + matrice, b hors de Col A).
- **Pièges** : `l_free_var_zero`, `l_ker_sign`, `l_rhs_forgotten`.
- **Sous-buts → crédit** : réduire → `l-sys-rref` ; exprimer les pivots → `l-sys-solution` ; forme vectorielle → `l-sys-solution`.

### `l-sys-param` — Système à paramètre : aucune, une ou une infinité de solutions
- **Année** 13 · **Prérequis** `l-sys-echelon`, `l-sys-solution`, `@alg:I-equation-parametre`, `@alg:D-trinome` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `@alg:I-equation-parametre` : dernière ligne a·x = b, avec a et b fonctions du paramètre.
- **Statut** : fait le 10 novembre 2026 (étape U3). Le cas « solution unique » est une note, pas une ligne ; le niveau 5 prend le gabarit en a² (exemple d'examen 1), pas le système 4 × 3 ; le gabarit « paramètre seulement dans b » n'est pas construit. Un vrai/faux concret s'ajoute à l'énoncé vrai du catalogue.
- **Intro** : on échelonne en gardant le paramètre. **On ne divise jamais par une expression qui peut s'annuler** sans traiter à part le cas où elle s'annule. À la fin, on lit la dernière ligne `[0 0 f(a) | g(a)]` : f(a) ≠ 0 → solution unique ; f(a) = 0 et g(a) ≠ 0 → aucune ; f(a) = g(a) = 0 → une infinité. Exemple : `[0, 0, (1 − a)(2 + a) | 1 − a]` → unique si a ∉ {1 ; −2}, infinité si a = 1, aucune si a = −2.
- **Juge** : `rowops` sur ℚ(a) `{A, param: 'a', multi: true}` (voir les lacunes à la fin du fichier), puis `solset` `{v: 'a', domain: 'R'}` pour chaque cas · **Forme finale** : trois ensembles de valeurs de a (unique, aucune, infinité) qui partagent ℝ.
- **Niveaux** :
  - L1 (guidé) : échelonnement donné avec des trous en a ; l'élève factorise f(a) et remplit le tableau des cas.
  - L2 : ligne de décision « diviser L2 par (a − 1) » proposée avec « traiter d'abord a = 1 » ; la première est `valid: false` avec message.
  - L3 (choisir l'action) : opérations au choix ; puis l'élève découpe les cas.
  - L4 (libre) : système 3 × 3 libre, puis les trois ensembles.
  - L5 (seul) : système 4 × 3 du type 2021 Q4 (4 équations, 3 inconnues, a dans le second membre), sans aide.
- **Générateur** : on part de la dernière ligne voulue : f(a) = k(a − r₁)(a − r₂) (r₁ ≠ r₂ entiers dans [−3 ; 3], k = ±1) et g(a) qui s'annule en exactement une des deux racines. On remonte : la matrice échelonnée avec a dans 2 à 4 cases est multipliée à gauche par `unimodular(3)` (sans a). Contraintes : coefficients de degré ≤ 1 en a avant l'échelonnement (degré ≤ 2 permis au L5), au plus 5 cases contenant a. Gabarits : (a) symétrique, comme `x + y + az = 1 ; x + ay + z = 1 ; ax + y + z = 1` ; (b) paramètre seulement dans b (`h` dans le second membre, 2019 Q17) ; (c) 4 équations, 3 inconnues, a² dans b (2021 Q4).
- **Corrigé type** : `x + y + az = 1 ; x + ay + z = 1 ; ax + y + z = 1`.
  1. `[[1, 1, a | 1], [1, a, 1 | 1], [a, 1, 1 | 1]]` — *matrice augmentée*
  2. `L2 ← L2 − L1` : `[0, a − 1, 1 − a | 0]` — *descendre*
  3. `L3 ← L3 − aL1` : `[0, 1 − a, 1 − a² | 1 − a]` — *descendre*
  4. `L3 ← L3 + L2` : `[0, 0, 2 − a − a² | 1 − a]` — *descendre sans diviser*
  5. 2 − a − a² = (1 − a)(2 + a) — *factoriser* (sous-but → `@alg:D-trinome`)
  6. a ∉ {1 ; −2} : unique (x = y = z = 1/(a + 2)) ; a = 1 : deux lignes nulles, infinité (2 paramètres) ; a = −2 : `0 = 3`, aucune — *discuter*
- **Aides** : 1 « Échelonne sans diviser par une expression en a ; regarde la dernière ligne. » · 2 « f(a) = (1 − a)(□) ; cas a = 1 : □ ; cas a = □ : □ » · 3 le tableau complet.
- **Variantes d'examen** : `mcq` à 4 énoncés (« admet au moins une solution si et seulement si a ∈ … », « une infinité si et seulement si a = … ») ; distracteurs : `l_param_divide_zero` (le cas a = 1 oublié), `l_param_none_vs_inf` (aucune et infinité échangées), un cas où « au moins une » oublie l'infinité. `coef` : « pour a = 3, que vaut x ? » (1/5). `tf` : « Si le système a une solution unique pour a = 0, il a une solution unique pour tout a sauf un nombre fini de valeurs » (vrai pour un système carré : det A(a) est un polynôme non nul).
- **Pièges** : `l_param_divide_zero`, `l_param_none_vs_inf`, `l_rowop_sign`.
- **Sous-buts → crédit** : descendre → `l-sys-echelon` ; factoriser → `@alg:D-trinome` ; discuter → `l-sys-param` ; solution unique → `l-sys-solution`.

**Vecteurs, combinaisons, indépendance (Lay 1.3, 1.4, 1.7)**

### `l-vec-span` — Combinaisons linéaires, Span, Ax comme combinaison des colonnes
- **Année** 13 · **Prérequis** `l-sys-echelon`, `g4-vectors` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g4-vectors` : combinaisons linéaires de vecteurs.
- **Statut** : fait le 10 novembre 2026 (étape U3). Les poids s'écrivent comme un vecteur (c₁ ; c₂) ; « b n'est pas dans le Span » se répond par « nombre de solutions = 0 ». Dans le QCM, le distracteur `l_matrix_rows_cols` est remplacé par une erreur de signe et par c₁ + c₂.
- **Intro** : b ∈ Span{v₁, …, v_k} si et seulement si le système de matrice augmentée [v₁ … v_k | b] est compatible. Ax est la combinaison des colonnes de A avec les poids x₁, …, xₙ. La même idée vaut dans Pₙ : on travaille sur les coefficients. Exemple : `q = 3 + bt + 4t²` est dans Span{1 + t + t², 1 − t + 2t²} si et seulement si `[[1, 1 | 3], [1, −1 | b], [1, 2 | 4]]` est compatible → b = 1.
- **Juge** : `rowops` `{A: [V | b], param?}` puis `value` sur les poids (ligne « b = 2v₁ + 1v₂ ») · **Forme finale** : poids, ou condition sur le paramètre, ou « pas dans le Span ».
- **Niveaux** :
  - L1 (guidé) : la matrice [v₁ v₂ | b] est à trous (colonnes = vecteurs) ; puis l'échelonnement guidé.
  - L2 : l'élève choisit entre « vecteurs en colonnes » et « vecteurs en lignes » (refusé, avec le message de `l_matrix_rows_cols`).
  - L3 (choisir l'action) : opérations au choix, puis lecture.
  - L4 (libre) : vecteurs de ℝ³ ou ℝ⁴, ou polynômes de P₂.
  - L5 (seul) : condition sur un paramètre pour que b soit dans le Span (révision 2017 Q8), sans aide.
- **Générateur** : poids c entiers dans [−3 ; 3] ; b = Vc ; pour la version à paramètre, on remplace une composante de b par une inconnue b et on garde la valeur juste comme réponse ; pour « pas dans le Span », on ajoute à b un vecteur de (Col V)⊥ entier. Gabarits : (a) ℝ³ ; (b) P₂ ; (c) « écris Ax comme combinaison des colonnes ».
- **Corrigé type** : p₁ = 1 + t + t², p₂ = 1 − t + 2t², q = 3 + bt + 4t².
  1. `[[1, 1 | 3], [1, −1 | b], [1, 2 | 4]]` — *coefficients en colonnes*
  2. `L2 ← L2 − L1` : `[0, −2 | b − 3]` ; `L3 ← L3 − L1` : `[0, 1 | 1]` — *échelonner*
  3. `L2 ← L2 + 2L3` : `[0, 0 | b − 1]` — *échelonner*
  4. Compatible si et seulement si b = 1 ; alors q = 2p₁ + p₂ — *conclure*
- **Aides** : 1 « Mets les vecteurs (ou les coefficients des polynômes) en colonnes, et b en dernière colonne. » · 2 `[0, 0 | b − □]` · 3 la conclusion.
- **Variantes d'examen** : `mcq` « q appartient au Span lorsque b = … » (distracteurs : `l_rowop_sign`, `l_matrix_rows_cols`, b = 3 qui vient de c₁ + c₂). `tf` : « Si H est un sous-espace qui contient p et q, il contient p + q et tout multiple » (vrai) ; « Span{u, v} est toujours un plan » (faux : u = v, `vecFamily`).
- **Pièges** : `l_matrix_rows_cols`, `l_rowop_sign`, `l_rhs_forgotten`.
- **Sous-buts → crédit** : mettre en colonnes → `l-vec-span` ; échelonner → `l-sys-echelon` ; conclure → `l-vec-span`.

### `l-vec-indep` — Indépendance linéaire
- **Année** 13 · **Prérequis** `l-sys-solution`, `l-sys-param` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-sys-solution` : la relation de dépendance se lit sur la solution paramétrique.
- **Statut** : fait le 10 novembre 2026 (étape U3). Le paramètre n'apparaît qu'au niveau 5 et dans le QCM ; le niveau 5 s'arrête à l'ensemble des valeurs de a (pas de relation de dépendance) ; pas de distracteur `l_cofactor_sign`.
- **Intro** : v₁, …, v_k sont linéairement indépendants si et seulement si [v₁ … v_k]x = 0 n'a que la solution nulle, c'est-à-dire s'il y a un pivot dans chaque colonne. Plus de vecteurs que la dimension : toujours liés. Une famille qui contient 0 est liée. Exemple : `(1 ; 0 ; a), (2 ; a ; 0), (1 ; 3 ; 1)` → pivots 1, a, 7 − a → liés si et seulement si a ∈ {0 ; 7}.
- **Juge** : `rowops` `{A, param?}`, puis une ligne de décision « libre / liée », puis, pour « liée », une relation `value` (c₁v₁ + c₂v₂ + c₃v₃ = 0, coefficients non tous nuls) · **Forme finale** : décision justifiée par les pivots, avec la relation si la famille est liée.
- **Niveaux** :
  - L1 (guidé) : matrice des vecteurs donnée, échelonnement à trous, décision.
  - L2 : l'élève choisit la méthode (Gauss ou déterminant si la matrice est carrée).
  - L3 (choisir l'action) : Gauss au choix ; pour un paramètre, l'app demande « et si a = 0 ? ».
  - L4 (libre) : vecteurs de ℝ⁴, polynômes de P₃ ou matrices de M₂ₓ₂ (on travaille sur les coordonnées).
  - L5 (seul) : famille à paramètre avec deux valeurs critiques (2019 Q1, 2018 Q13), sans aide.
- **Générateur** : on part de la forme échelonnée voulue, avec un pivot en a ou en (r − a) ; on remonte par `unimodular` (sans a). Pour une famille liée sans paramètre : v₃ = c₁v₁ + c₂v₂ avec c entiers. Gabarits : (a) ℝ³ avec paramètre ; (b) P₂ ou P₃ ; (c) M₂ₓ₂ ; (d) « la famille {αᵢvᵢ} est-elle libre ? » (2021 Q17).
- **Corrigé type** : v₁ = (1 ; 0 ; a), v₂ = (2 ; a ; 0), v₃ = (1 ; 3 ; 1).
  1. `[[1, 2, 1], [0, a, 3], [a, 0, 1]]` — *vecteurs en colonnes*
  2. `L3 ← L3 − aL1` : `[0, −2a, 1 − a]` — *échelonner*
  3. `L3 ← L3 + 2L2` : `[0, 0, 7 − a]` — *échelonner* (le pivot de la 2e colonne est a)
  4. a ≠ 0 et a ≠ 7 : trois pivots, libre — *cas général*
  5. a = 0 : v₂ = 2v₁, liée ; a = 7 : v₁ + 3v₂ − 7v₃ = 0, liée — *cas particuliers*
- **Aides** : 1 « Libre ⇔ un pivot dans chaque colonne. Attention aux pivots qui dépendent de a. » · 2 `[0, 0, □ − a]`, « et si le pivot a s'annule ? » · 3 la discussion entière.
- **Variantes d'examen** : `mcq` « liés si et seulement si a ∈ … » (distracteurs : `l_param_divide_zero` donne {7}, `l_rowop_sign` donne {−7 ; 0}, et l'ensemble des racines d'un mauvais déterminant `l_cofactor_sign`). `tf` :
  - « Si v₁, …, v_k sont libres et α₁, …, α_k réels, alors α₁v₁, …, α_kv_k sont libres » (faux : `vecFamily` `scaledDependent`, un αᵢ = 0).
  - « Tout sous-ensemble non vide d'une famille libre est libre » (vrai).
  - « Quatre vecteurs de ℝ³ sont toujours liés » (vrai).
- **Pièges** : `l_param_divide_zero`, `l_indep_scaled`, `l_matrix_rows_cols`.
- **Sous-buts → crédit** : échelonner → `l-sys-echelon` ; discuter → `l-sys-param` ; relation → `l-vec-indep`.

### `l-sys-pivots-theory` — Existence et unicité lues sur les pivots
- **Année** 13 · **Prérequis** `l-sys-solution`, `l-vec-span`, `g9-implication` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-sys-solution` : variable libre ⇔ colonne sans pivot ; `l-vec-span` : solution pour tout b ⇔ les colonnes engendrent ℝᵐ ; `g9-implication` : énoncés « si et seulement si » et réciproques.
- **Statut** : fait le 10 novembre 2026 (étape U3). Niveaux 1 à 3 en QCM plutôt qu'en cases à cocher ; niveau 5 : un vrai/faux à la fois, pas une série de 6. « Une application ℝ³ → ℝ⁴ peut être surjective » (énoncé existentiel : aucun contre-exemple possible) est remplacé par des énoncés universels.
- **Intro** : A est m × n. Ax = b a une solution **pour tout b** si et seulement s'il y a un pivot dans chaque **ligne**. La solution est **unique** (quand elle existe) si et seulement s'il y a un pivot dans chaque **colonne**. Donc m < n ⇒ jamais d'unicité ; m > n ⇒ jamais « pour tout b ». Exemple : A 3 × 5 → au plus 3 pivots, au moins 2 variables libres → Ax = 0 a une infinité de solutions.
- **Juge** : pas de lignes de calcul. Items `tf`, `mcq` et `example` (`dims`, `matOne`) · **Forme finale** : réponse et, pour un faux, contre-exemple accepté.
- **Niveaux** :
  - L1 (guidé) : une matrice échelonnée est montrée ; l'élève coche « pivot dans chaque ligne ? » et « dans chaque colonne ? », puis conclut.
  - L2 : même chose sans la matrice échelonnée, à partir des tailles et du rang.
  - L3 (choisir l'action) : vrai/faux avec le choix de la justification (ligne, colonne, tailles).
  - L4 (libre) : vrai/faux ; si « faux », contre-exemple à entrer.
  - L5 (seul) : série de 6 vrai/faux au barème de l'examen (+1 / 0 / −1), sans aide.
- **Générateur** : tailles m, n ∈ [2 ; 9], rang r ≤ min(m, n) ; énoncés tirés de la table ci-dessous ; les matrices de contre-exemple sont vérifiées par `rank`. Gabarits : (a) énoncé sur les tailles ; (b) énoncé sur une matrice donnée (échelonnée ou non).
- **Corrigé type** : « Soit A de taille m × n avec m < n. Alors Ax = b a au moins une solution pour tout b. » 1. Au plus m pivots, et il faudrait un pivot par ligne, ce qui n'est pas garanti — *relier énoncé et pivots* 2. Faux ; contre-exemple A = `[[1, 1, 1], [0, 0, 0]]` (2 × 3), b = (0 ; 1) — *contre-exemple*.
- **Aides** : 1 « Existence pour tout b : pivots dans les lignes. Unicité : pivots dans les colonnes. » · 2 « Combien de pivots au plus ? □ ; combien de lignes ? □ » · 3 la conclusion.
- **Variantes d'examen** : `tf` (table) et `mcq` « il est toujours vrai que… » (2018 Q6, Q8 ; 2019 Q8), les distracteurs venant de `l_inj_rows`, `l_rank_dim_confusion`. Énoncés types :
  - « Si m < n, Ax = Ac a une infinité de solutions pour tout c » (vrai).
  - « Si Ax = b a une solution pour tout b, alors dim Ker A = 0 » (faux : A = `[[1, 0, 0], [0, 1, 0]]`).
  - « Si les colonnes de A engendrent ℝᵐ, Ax = 0 n'a que la solution triviale » (faux, série de révision : même contre-exemple).
  - « Si A est m × n avec m < n, la plus petite valeur de dim Ker A est n − m » (vrai, en QCM).
- **Pièges** : `l_inj_rows`, `l_rank_dim_confusion`, `l_span_count`.
- **Sous-buts → crédit** : lire les pivots → `l-sys-echelon` ; conclure → `l-sys-pivots-theory`.

**Applications linéaires (Lay 1.8, 1.9)**

### `l-map-std-matrix` — Matrice canonique à partir d'images données
- **Année** 13 · **Prérequis** `l-vec-span` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-vec-span` : Ax est la combinaison des colonnes T(eᵢ).
- **Statut** : fait le 10 novembre 2026 (étape U3). ℝ³ → ℝ³ seulement ; « T est-elle linéaire ? » n'apparaît qu'en vrai/faux (contre-exemple `vecFamily` `notLinear`).
- **Intro** : T est linéaire si T(u + v) = T(u) + T(v) et T(cu) = cT(u) ; alors T(0) = 0. La matrice canonique a pour colonnes T(e₁), …, T(eₙ). Si on donne T(2e₂) ou T(e₂ + e₃), on retrouve d'abord T(e₂) et T(e₃) par linéarité. Exemple : `T(2e₂) = (4 ; 2 ; −6)` → `T(e₂) = (2 ; 1 ; −3)` (note : on divise par 2 avant d'écrire la colonne).
- **Juge** : `value` sur des vecteurs (lignes « T(e₂) = … »), puis `value` sur la matrice (`matrix`, 3 × 3) · **Forme finale** : matrice canonique ; `askCoef` au format examen.
- **Niveaux** :
  - L1 (guidé) : T(e₁) déjà en colonne ; l'élève complète T(e₂) = ½·T(2e₂), puis T(e₃) = T(e₂ + e₃) − T(e₂).
  - L2 : l'élève choisit « colonnes » ou « lignes » pour ranger les images.
  - L3 (choisir l'action) : actions « diviser », « soustraire », « placer en colonne j ».
  - L4 (libre) : images données sous une autre forme (T(e₁ − e₂), T(e₁ + e₂ + e₃)).
  - L5 (seul) : « est-elle linéaire ? » puis matrice ; ou T définie par une formule (T(x) = (x₁ + 2x₂, …)).
- **Générateur** : on tire la matrice M (coefficients dans [−6 ; 6]) ; on choisit une base de ℝ³ formée de combinaisons simples (2e₂, e₂ + e₃, e₁ − e₂…), matrice de passage `unimodular` ou diagonale ×2 ; on donne les images de cette base. Gabarits : (a) révision MT 2017 (T(e₁), T(2e₂), T(e₂ + e₃)) ; (b) formule ; (c) « T est-elle linéaire ? » (T(x) = x + b avec b ≠ 0, ou un terme x₁x₂), avec `setWitness`.
- **Corrigé type** : T(e₁) = 2e₁ − e₂ + 3e₃, T(2e₂) = 4e₁ + 2e₂ − 6e₃, T(e₂ + e₃) = e₁ + 4e₂ + e₃.
  1. T(e₂) = ½·(4 ; 2 ; −6) = (2 ; 1 ; −3) — *linéarité : multiple*
  2. T(e₃) = (1 ; 4 ; 1) − (2 ; 1 ; −3) = (−1 ; 3 ; 4) — *linéarité : somme*
  3. M = `[[2, 2, −1], [−1, 1, 3], [3, −3, 4]]` — *images en colonnes*
- **Aides** : 1 « Retrouve d'abord T(e₂) et T(e₃) par linéarité, puis mets les images en colonnes. » · 2 `T(e₃) = (1 ; 4 ; 1) − □` · 3 la matrice.
- **Variantes d'examen** : `mcq` « la matrice de T est… » (distracteurs : `l_map_scaled_image`, `l_matrix_rows_cols`, le mélange des deux). `coef` mᵢⱼ. `tf` : « La matrice canonique d'une application linéaire est unique » (vrai, preuve dans `l-proof-matrices`) ; « T(x) = x + (1 ; 0) est linéaire » (faux : T(0) ≠ 0).
- **Pièges** : `l_map_scaled_image`, `l_matrix_rows_cols`.
- **Sous-buts → crédit** : linéarité → `l-map-std-matrix` ; placer les colonnes → `l-map-std-matrix`.

### `l-map-inj-surj` — Injective ou surjective, lu sur les pivots
- **Année** 13 · **Prérequis** `l-map-std-matrix`, `l-sys-pivots-theory` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-map-std-matrix` : matrice A de T ; `l-sys-pivots-theory` : pivots par ligne et par colonne.
- **Statut** : fait le 10 novembre 2026 (étape U3). Au niveau 5, T est donnée par une formule sur ℝⁿ, pas entre espaces de polynômes ou de matrices.
- **Intro** : T(x) = Ax avec A de taille m × n. T est injective ⇔ Ker A = {0} ⇔ un pivot dans chaque **colonne**. T est surjective ⇔ Im A = ℝᵐ ⇔ un pivot dans chaque **ligne**. Si n > m, T n'est jamais injective ; si n < m, jamais surjective. Exemple : A de taille 3 × 4 → pas injective ; surjective si et seulement si le rang vaut 3.
- **Juge** : `rowops` jusqu'à la forme échelonnée, puis une décision à 4 options · **Forme finale** : l'une des quatre réponses, justifiée par le rang.
- **Niveaux** :
  - L1 (guidé) : forme échelonnée donnée ; l'élève compte les pivots par ligne et par colonne.
  - L2 : l'élève échelonne avec des trous, puis décide.
  - L3 (choisir l'action) : avant de calculer, ligne de décision « les tailles suffisent-elles ? » (oui pour l'injectivité quand n > m).
  - L4 (libre) : T donnée par une formule ou par les images des eᵢ (2019 Q9).
  - L5 (seul) : T entre espaces de polynômes ou de matrices (via une matrice dans des bases), sans aide.
- **Générateur** : `rrefWith(m, n, pivots)` avec (m, n) ∈ {(3, 4), (4, 3), (3, 3), (4, 4), (2, 4)} ; rang tiré pour que les quatre réponses apparaissent dans les tirages. Gabarits : (a) matrice ; (b) formule ; (c) images des eᵢ.
- **Corrigé type** : A = `[[1, 2, 0, 1], [2, 4, 1, 3], [0, 0, 1, 1]]`.
  1. 4 colonnes et 3 lignes : au plus 3 pivots, donc pas injective — *tailles*
  2. `L2 ← L2 − 2L1` : `[0, 0, 1, 1]` ; `L3 ← L3 − L2` : `[0, 0, 0, 0]` — *échelonner*
  3. Rang 2 < 3 : pas surjective. Réponse : ni injective, ni surjective — *conclure*
- **Aides** : 1 « Injective : un pivot par colonne. Surjective : un pivot par ligne. » · 2 « rang = □ ; colonnes : 4 ; lignes : 3 » · 3 la conclusion.
- **Variantes d'examen** : `mcq` à quatre options (2021 Q7) ; distracteurs : `l_inj_rows` (les deux notions échangées), et les deux réponses voisines. `tf` : « Si dim W < dim V, T : V → W n'est pas injective » (vrai, 2021 Q32) ; « Si T : ℝⁿ → ℝⁿ est surjective, elle est injective » (vrai) ; « Une application linéaire ℝ³ → ℝ⁴ peut être surjective » (faux : `dims`).
- **Pièges** : `l_inj_rows`, `l_rank_dim_confusion`, `l_rowop_partial`.
- **Sous-buts → crédit** : échelonner → `l-sys-echelon` ; conclure → `l-map-inj-surj`.

**Algèbre matricielle (Lay 2.1 à 2.5)**

### `l-mat-product` — Produit, transposée, règles de calcul
- **Année** 13 · **Prérequis** — · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U3). Le gabarit (c) « AB = BA ? » n'apparaît qu'en vrai/faux ; le niveau 3 choisit la ligne et la colonne d'un coefficient.
- **Intro** : (AB)ᵢⱼ = ligne i de A · colonne j de B ; AB existe si le nombre de colonnes de A égale le nombre de lignes de B. En général AB ≠ BA, et AB = 0 n'entraîne pas A = 0 ou B = 0. (AB)ᵀ = BᵀAᵀ. Exemple : A 3 × 2, B 2 × 3 → AB est 3 × 3 et BA est 2 × 2 (note : les deux existent mais n'ont pas la même taille).
- **Juge** : `value` sur des matrices (grille) ; les lignes intermédiaires « (AB)₃₂ = 3·0 + 1·(−1) » sont jugées par `value` · **Forme finale** : matrice produit ; `askCoef` au format examen.
- **Niveaux** :
  - L1 (guidé) : la grille du produit est à moitié remplie ; chaque case vide montre la ligne et la colonne à multiplier.
  - L2 : l'élève donne d'abord la taille du produit (ou « impossible »), puis remplit.
  - L3 (choisir l'action) : choisir quelle ligne et quelle colonne donnent la case demandée.
  - L4 (libre) : produit complet, transposée d'un produit.
  - L5 (seul) : expression (A + B)², AᵀB, A² − 2A + I sur des 2 × 2 et 3 × 3, sans aide.
- **Générateur** : tailles (m, p, n) dans [1 ; 4], coefficients dans [−4 ; 4] ; au moins une paire où AB et BA existent toutes les deux. Gabarits : (a) produit ; (b) un seul coefficient (askCoef) ; (c) « AB = BA ? » ; (d) expression à développer.
- **Corrigé type** : A = `[[1, 2], [0, −1], [3, 1]]`, B = `[[2, 0, 1], [1, −1, 4]]`.
  1. AB est 3 × 3 ; BA est 2 × 2 — *tailles*
  2. AB = `[[4, −2, 9], [−1, 1, −4], [7, −1, 7]]` — *ligne fois colonne*
  3. BA = `[[5, 5], [13, 7]]` — *ligne fois colonne* ; (AB)₃₂ = −1
- **Aides** : 1 « Case (i, j) : ligne i de A, colonne j de B. » · 2 `(AB)₃₂ = 3·□ + 1·□` · 3 la case.
- **Variantes d'examen** : `coef` (AB)ᵢⱼ ; `mcq` (distracteurs : `l_ab_commute`, `l_coef_index_swap`, `l_product_entrywise`). `tf` : « Pour A, B carrées, (A + B)² = A² + 2AB + B² » (faux : `matPair`, test `'(A+B)^2=A^2+2AB+B^2'`) ; « AB = 0 ⇒ A = 0 ou B = 0 » (faux : `matPair`) ; « (AB)ᵀ = AᵀBᵀ » (faux : `matPair`).
- **Pièges** : `l_ab_commute`, `l_product_entrywise`, `l_coef_index_swap`, `l_transpose_product`.
- **Sous-buts → crédit** : tailles → `l-mat-product` ; ligne fois colonne → `l-mat-product`.

### `l-mat-inverse` — Inverse par [A | I]
- **Année** 13 · **Prérequis** `l-mat-product`, `l-sys-rref` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-mat-product` : vérifier AA⁻¹ = I.
- **Statut** : fait le 10 novembre 2026 (étape U3). Le gabarit (d) « A est-elle inversible ? » n'est pas construit ; le niveau 3 se termine sur un bᵢⱼ.
- **Intro** : on réduit [A | I]. Si la partie gauche devient I, la partie droite est A⁻¹ ; sinon, A n'est pas inversible. Pour une 2 × 2 : `[[a, b], [c, d]]⁻¹ = (1/(ad − bc))·[[d, −b], [−c, a]]`. Exemple : `[[1, 2], [3, 4]]⁻¹ = (1/−2)·[[4, −2], [−3, 1]]`.
- **Juge** : `rowops` `{A: [A | I], reduced: true, multi: true}` · **Forme finale** : A⁻¹ lue à droite ; `askCoef` bᵢⱼ au format examen. Contrôle possible : AB = I.
- **Niveaux** :
  - L1 (guidé) : opérations annoncées, résultats à trous (les deux moitiés).
  - L2 : l'élève choisit la prochaine opération parmi 3.
  - L3 (choisir l'action) : barre d'opérations sur la grille 3 × 6.
  - L4 (libre) : lignes libres ; 2 × 2 par la formule, 3 × 3 par Gauss.
  - L5 (seul) : seulement bᵢⱼ demandé (2021 Q2, 2019 Q14) ; ou « AB = I₄, que vaut tr B ? » (2018 Q3).
- **Générateur** : A = `unimodular(3)` (inverse entière) ; aux niveaux 4 et 5, A = M·diag(1, 1, d) avec d ∈ {2, 3} pour des fractions simples. Le coefficient demandé est choisi pour que bᵢⱼ ≠ bⱼᵢ (le piège de l'indice échangé doit donner une autre valeur). Gabarits : (a) inverse complète ; (b) un coefficient ; (c) trace ou somme d'une ligne de A⁻¹ ; (d) « A est-elle inversible ? » (une ligne nulle apparaît).
- **Corrigé type** : A = `[[1, 2, 0], [2, 5, 1], [1, 3, 2]]`, on demande b₁₃.
  1. `L2 ← L2 − 2L1` : `[0, 1, 1 | −2, 1, 0]` — *descendre*
  2. `L3 ← L3 − L1` : `[0, 1, 2 | −1, 0, 1]` — *descendre*
  3. `L3 ← L3 − L2` : `[0, 0, 1 | 1, −1, 1]` — *descendre*
  4. `L2 ← L2 − L3` : `[0, 1, 0 | −3, 2, −1]` — *remonter*
  5. `L1 ← L1 − 2L2` : `[1, 0, 0 | 7, −4, 2]` — *remonter*
  6. A⁻¹ = `[[7, −4, 2], [−3, 2, −1], [1, −1, 1]]`, b₁₃ = 2 — *lire*
- **Aides** : 1 « Réduis [A | I] ; les opérations portent sur les 6 colonnes. » · 2 `L1 ← L1 − 2L2 : [1, 0, 0 | □, □, □]` · 3 la ligne entière.
- **Variantes d'examen** : `coef` bᵢⱼ ; `mcq` bᵢⱼ (distracteurs : `l_coef_index_swap` → b₃₁ = 1, `l_inv_entrywise`, `l_rhs_forgotten` sur la partie droite). `tf` : « Si A et B sont inversibles, (AB)⁻¹ = A⁻¹B⁻¹ » (faux : `matPair`, 2021 Q20) ; « Si A est inversible, Aᵀ l'est et (Aᵀ)⁻¹ = (A⁻¹)ᵀ » (vrai).
- **Pièges** : `l_coef_index_swap`, `l_inv_entrywise`, `l_inv_2x2_swap`, `l_inv_product_order`, `l_rhs_forgotten`.
- **Sous-buts → crédit** : descendre → `l-sys-echelon` ; remonter → `l-sys-rref` ; lire → `l-mat-inverse`.

### `l-map-geom` — Géométrie dans ℝ² : rotation, projection, symétrie, affinité
- **Année** 13 · **Prérequis** `l-map-std-matrix`, `l-mat-inverse`, `g3-exact`, `g4-line2` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-map-std-matrix` : les colonnes sont les images de e₁ et e₂ ; `g3-exact` : cos θ et sin θ des angles usuels ; `g4-line2` : axe et direction donnés par une équation de droite.
- **Statut** : fait le 10 novembre 2026 (étape U3). Pas de dessin (le type `plot` vient à l'étape U5) : au niveau 2, la transformation se choisit en mots. Les rotations passent par cos θ et sin θ ; les vecteurs de l'axe et de la direction sont jugés par `span`.
- **Intro** : rotation d'angle θ : `[[cos θ, −sin θ], [sin θ, cos θ]]`. Projection orthogonale sur la droite de direction u : uuᵀ/(uᵀu). Symétrie : 2·projection − I. Affinité d'axe d, de direction δ, de rapport k : elle fixe les vecteurs de d et multiplie par k ceux de δ ; on écrit M = P·diag(1, k)·P⁻¹ avec P = [a | u], a sur l'axe, u dans la direction. Exemple : projection sur y = 2x : u = (1 ; 2) → (1/5)·`[[1, 2], [2, 4]]`.
- **Juge** : `value` sur la matrice (`matrix` 2 × 2) ; lignes intermédiaires `value` (P, P⁻¹, produit) · **Forme finale** : matrice 2 × 2 exacte (racines permises pour les rotations).
- **Niveaux** :
  - L1 (guidé) : on donne a et u ; l'élève remplit P, diag(1, k), P⁻¹, puis le produit à trous.
  - L2 : l'élève choisit la transformation sur un dessin (repère interactif) parmi 4.
  - L3 (choisir l'action) : « images de deux vecteurs », « formule uuᵀ/uᵀu », « composer » proposées.
  - L4 (libre) : transformation décrite en mots (« symétrie d'axe x + 2y = 0 »).
  - L5 (seul) : affinité du CMS (axe, direction, rapport) ou composition rotation puis projection, sans aide.
- **Générateur** : axe et direction de pentes rationnelles distinctes ; vecteurs a, u entiers avec det[a | u] ∈ {±1, ±2, ±5} ; k ∈ {−2, −1/2, 2/3, −2/3, 3} ; angles θ ∈ {π/6, π/4, π/3, π/2, 2π/3, π}. Gabarits : (a) rotation ; (b) projection ou symétrie sur une droite ; (c) affinité ; (d) composition (la matrice d'une composée est le produit, dans l'ordre inverse).
- **Corrigé type** : affinité d'axe x + 2y = 0, de direction x − 3y = 0, de rapport −2/3.
  1. a = (2 ; −1) sur l'axe, u = (3 ; 1) dans la direction — *vecteurs propres géométriques*
  2. P = `[[2, 3], [−1, 1]]`, det P = 5, P⁻¹ = (1/5)·`[[1, −3], [1, 2]]` — *inverser P*
  3. M = P·diag(1, −2/3)·P⁻¹ = `[[0, −2], [−1/3, 1/3]]` — *recomposer*
  4. Contrôle : M·(2 ; −1) = (2 ; −1) et M·(3 ; 1) = (−2 ; −2/3) — *vérifier*
- **Aides** : 1 « Cherche deux vecteurs dont tu connais l'image : un sur l'axe, un dans la direction. » · 2 `M = [[2, 3], [−1, 1]]·diag(1, □)·P⁻¹` · 3 la matrice.
- **Variantes d'examen** : `mcq` « la matrice de la symétrie / rotation / affinité est… » (distracteurs : `l_rot_transpose`, `g4_proj_no_square`, `l_pdp_inverse_side`). `tf` : « La matrice d'une projection orthogonale P vérifie P² = P » (vrai) ; « Une projection orthogonale de ℝ² sur une droite est injective » (faux : `mapWitness`).
- **Pièges** : `l_rot_transpose`, `g4_proj_no_square`, `l_pdp_inverse_side`, `l_compose_order`.
- **Sous-buts → crédit** : inverser P → `l-mat-inverse` ; recomposer → `l-map-geom`.

### `l-mat-imt` — Théorème de la matrice inversible
- **Année** 13 · **Prérequis** `l-mat-inverse`, `l-map-inj-surj` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-mat-inverse` : inversibilité par [A | I] ; `l-map-inj-surj` : injective et surjective lues sur les pivots.
- **Statut** : fait le 10 novembre 2026 (étape U3). Le niveau 1 est un QCM (« lequel est équivalent ? ») au lieu de `match` ; le niveau 2 est un vrai/faux sans le nom de la propriété ; les contre-exemples non carrés sont de sorte `dims`.
- **Intro** : pour A carrée n × n, ces énoncés sont équivalents : A inversible ; n pivots ; Ax = 0 n'a que 0 ; colonnes libres ; colonnes qui engendrent ℝⁿ ; x ↦ Ax injective ; surjective ; Aᵀ inversible ; det A ≠ 0 ; 0 n'est pas valeur propre. **Pour une matrice non carrée, rien de cela ne tient.** Exemple : A 4 × 4 dont les colonnes sont libres → A est inversible, donc Ax = b a une solution unique pour tout b.
- **Juge** : items `tf`, `mcq`, `match` (relier les énoncés équivalents) et `example` · **Forme finale** : réponse ; contre-exemple pour un faux.
- **Niveaux** :
  - L1 (guidé) : `match` : relier 6 énoncés à « équivalent à A inversible » ou « pas forcément ».
  - L2 : vrai/faux avec le nom de la propriété utilisée à choisir.
  - L3 (choisir l'action) : vrai/faux sur des matrices non carrées (où l'équivalence tombe).
  - L4 (libre) : vrai/faux avec contre-exemple à entrer.
  - L5 (seul) : série de 6 vrai/faux au barème, sans aide.
- **Générateur** : table d'énoncés paramétrés par n et par la propriété ; une variante sur deux est non carrée. Gabarits : (a) carrée ; (b) non carrée ; (c) avec un produit (« AB inversible ⇒ A et B inversibles » pour des carrées : vrai).
- **Corrigé type** : « Si A est 3 × 3 et que Ax = 0 a une infinité de solutions, alors les colonnes de A n'engendrent pas ℝ³. »
  1. Infinité ⇒ une variable libre ⇒ moins de 3 pivots — *pivots*
  2. Moins de 3 pivots ⇒ pas de pivot dans chaque ligne ⇒ les colonnes n'engendrent pas ℝ³ : vrai — *équivalence*
- **Aides** : 1 « La matrice est-elle carrée ? Sinon, le théorème ne s'applique pas. » · 2 « nombre de pivots = □ sur □ » · 3 la conclusion.
- **Variantes d'examen** : `tf` : « Si S et T sont inversibles de matrices A et B, B⁻¹A⁻¹ est la matrice canonique de (T ∘ S)⁻¹ » (faux : c'est A⁻¹B⁻¹, car la matrice de T ∘ S est BA ; révision 2017 Q12) ; « Si AB = I avec A, B rectangulaires, alors BA = I » (faux : `matPair` 1 × 2 et 2 × 1) ; « Si A est carrée et Ax = b a une solution pour un b, A est inversible » (faux : A = 0, b = 0). `mcq` « laquelle n'est pas équivalente » (distracteurs : énoncés équivalents).
- **Pièges** : `l_imt_nonsquare`, `l_inj_rows`, `l_inv_product_order`.
- **Sous-buts → crédit** : pivots → `l-sys-pivots-theory` ; équivalence → `l-mat-imt`.

### `l-mat-elementary` — Matrices élémentaires
- **Année** 13 · **Prérequis** `l-mat-inverse` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-mat-inverse` : l'inverse de E fait l'opération contraire.
- **Statut** : fait le 10 novembre 2026 (étape U3). Au niveau 4, les opérations sont données dans l'énoncé ; le niveau 5 alterne un vrai/faux et la décomposition complète.
- **Intro** : une matrice élémentaire E est Iₙ après une seule opération ; EA fait cette opération sur les lignes de A. L'inverse de E fait l'opération contraire (`L3 ← L3 + 2L1` est défaite par `L3 ← L3 − 2L1`). Si E_k⋯E₁A = I, alors A⁻¹ = E_k⋯E₁ et A = E₁⁻¹⋯E_k⁻¹. Exemple : E = `[[1, 0, 0], [0, 1, 0], [2, 0, 1]]` → E⁻¹ = `[[1, 0, 0], [0, 1, 0], [−2, 0, 1]]`.
- **Juge** : `value` sur des matrices (E, E⁻¹, produits) ; la dernière ligne « A = E₁⁻¹E₂⁻¹E₃⁻¹ » est jugée par le produit · **Forme finale** : la liste des Eᵢ et le produit demandé.
- **Niveaux** :
  - L1 (guidé) : opération donnée, E à trous.
  - L2 : E donnée, l'élève choisit l'opération qu'elle fait.
  - L3 (choisir l'action) : réduire une A 2 × 2 en notant chaque E.
  - L4 (libre) : écrire A⁻¹ et A comme produits d'élémentaires.
  - L5 (seul) : un vrai/faux sur les relations entre lignes (ci-dessous) et une décomposition complète, sans aide.
- **Générateur** : opérations tirées parmi les trois types, k ∈ {±1, ±2, ±3, ½} ; A 2 × 2 entière de det ±1 ou ±2. Gabarits : (a) écrire E ; (b) écrire E⁻¹ ; (c) décomposer A.
- **Corrigé type** : A = `[[1, 2], [3, 4]]`.
  1. E₁ (`L2 ← L2 − 3L1`) = `[[1, 0], [−3, 1]]`, E₁A = `[[1, 2], [0, −2]]` — *éliminer*
  2. E₂ (`L2 ← (−1/2)L2`) = `[[1, 0], [0, −1/2]]`, E₂E₁A = `[[1, 2], [0, 1]]` — *normer le pivot*
  3. E₃ (`L1 ← L1 − 2L2`) = `[[1, −2], [0, 1]]`, E₃E₂E₁A = I — *remonter*
  4. A⁻¹ = E₃E₂E₁ = `[[−2, 1], [3/2, −1/2]]` ; A = E₁⁻¹E₂⁻¹E₃⁻¹ — *produits*
- **Aides** : 1 « Fais l'opération sur I pour obtenir E. » · 2 `E₁⁻¹ = [[1, 0], [□, 1]]` · 3 la ligne.
- **Variantes d'examen** : `mcq` « E⁻¹ = … » (distracteurs : `l_elementary_inverse`, transposée). `tf` : « Le produit de deux matrices élémentaires est élémentaire » (faux : `matPair`) ; « Les lignes de E₃E₂E₁A sont reliées par les mêmes relations de dépendance que celles de A » (faux, révision 2017 Q15 : un échange de lignes change les relations ; ce sont les **colonnes** qui gardent les leurs ; contre-exemple `matOne` avec un échange).
- **Pièges** : `l_elementary_inverse`, `l_compose_order`.
- **Sous-buts → crédit** : éliminer → `l-sys-echelon` ; écrire E → `l-mat-elementary`.

### `l-mat-lu` — Factorisation LU
- **Année** 13 · **Prérequis** `l-mat-elementary`, `l-sys-echelon` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-mat-elementary` : L est le produit des inverses des matrices élémentaires.
- **Statut** : fait le 10 novembre 2026 (étape U3). Pas de tableau des ℓᵢⱼ à part (`track: 'lu'`) : les ℓᵢⱼ sont dans les notes et dans L ; la décision du niveau 2 demande un ℓ.
- **Intro** : on échelonne A **sans échange**, avec seulement `Lᵢ ← Lᵢ − ℓᵢⱼLⱼ` et j < i. U est la forme échelonnée obtenue ; L est unitriangulaire inférieure et ℓᵢⱼ est **le multiplicateur lui-même** (celui qu'on retranche). Exemple : `L2 ← L2 − 2L1` → ℓ₂₁ = 2 (et non −2).
- **Juge** : `rowops` pendant l'élimination (chaque opération annoncée inscrit ℓᵢⱼ dans un tableau à part), puis `factor` `{A, kind: 'LU'}` · **Forme finale** : L et U, avec LU = A ; `askCoef` ℓᵢⱼ au format examen.
- **Niveaux** :
  - L1 (guidé) : opérations annoncées ; l'élève remplit U et la case ℓᵢⱼ correspondante.
  - L2 : l'élève choisit le multiplicateur parmi 3 (le bon, son opposé, son inverse).
  - L3 (choisir l'action) : barre d'opérations limitée à `Lᵢ ← Lᵢ − kLⱼ`, j < i.
  - L4 (libre) : 3 × 3 libre, L et U écrites en entier.
  - L5 (seul) : 4 × 4, seulement ℓ₄₂ demandé (2018 Q20), multiplicateurs fractionnaires, sans aide.
- **Générateur** : `luPair(3)` aux niveaux 1 à 4, `luPair(4, {fracL: true})` au niveau 5 ; aucun pivot nul en route (sinon la factorisation sans échange n'existe pas : ce cas est réservé à un `tf`). Exemple de niveau 5 : L = `[[1, 0, 0, 0], [2, 1, 0, 0], [−1, 1/2, 1, 0], [3, 3/2, −1, 1]]`, U = `[[2, 1, 0, −1], [0, 2, 2, 4], [0, 0, 1, 2], [0, 0, 0, 1]]`, donc A = `[[2, 1, 0, −1], [4, 4, 2, 2], [−2, 0, 2, 5], [6, 6, 2, 2]]` et ℓ₄₂ = 3/2. Gabarits : (a) L et U ; (b) un coefficient ; (c) résoudre Ax = b par Ly = b puis Ux = y.
- **Corrigé type** : A = `[[2, 1, −1], [4, 1, 0], [−2, −4, 10]]`.
  1. `L2 ← L2 − 2L1` : `[0, −1, 2]`, ℓ₂₁ = 2 — *éliminer, noter ℓ*
  2. `L3 ← L3 + L1` : `[0, −3, 9]`, ℓ₃₁ = −1 — *éliminer, noter ℓ*
  3. `L3 ← L3 − 3L2` : `[0, 0, 3]`, ℓ₃₂ = 3 — *éliminer, noter ℓ*
  4. L = `[[1, 0, 0], [2, 1, 0], [−1, 3, 1]]`, U = `[[2, 1, −1], [0, −1, 2], [0, 0, 3]]` — *assembler*
- **Aides** : 1 « ℓᵢⱼ est le nombre k de `Lᵢ ← Lᵢ − kLⱼ`, avec son signe. » · 2 `L3 ← L3 − □L2`, ℓ₃₂ = □ · 3 la ligne.
- **Variantes d'examen** : `coef` ℓᵢⱼ ; `mcq` ℓ₄₂ (distracteurs : `l_lu_sign` → −3/2, `l_lu_inverse` (L prise égale à E₃E₂E₁), `l_coef_index_swap`). `tf` : « Toute matrice inversible admet une factorisation LU sans échange » (faux : `[[0, 1], [1, 0]]`) ; « Si A = LU, det A est le produit des pivots de U » (vrai).
- **Pièges** : `l_lu_sign`, `l_lu_inverse`, `l_rowop_sign`, `l_coef_index_swap`.
- **Sous-buts → crédit** : éliminer → `l-sys-echelon` ; noter ℓ → `l-mat-lu` ; assembler → `l-mat-lu` ; résoudre Ly = b → `l-mat-lu`.

### `l-mat-blocks` — Produit par blocs, inverse d'une matrice triangulaire par blocs
- **Année** 13 · **Prérequis** `l-mat-inverse` · **Étiquettes** `GM` · **Optionnelle** non · **Poids d'examen** 0
- **Statut** : fait le 10 novembre 2026 (étape U3). Le niveau 2 choisit la formule de X₁₂ plutôt que le découpage ; le produit par blocs n'apparaît qu'au niveau 5, en alternance avec la puissance [[I, X], [0, I]]ᵏ.
- **Intro** : si les découpages sont compatibles, on multiplie les blocs comme des nombres, **sans changer l'ordre des facteurs** (A₂₁A₁₂ ≠ A₁₂A₂₁). Triangulaire par blocs : `[[A, B], [0, D]]⁻¹ = [[A⁻¹, −A⁻¹BD⁻¹], [0, D⁻¹]]`, et son déterminant vaut det A · det D. Exemple : `[[I, X], [0, I]]⁻¹ = [[I, −X], [0, I]]`. Le complément de Schur est approfondi en M (`m-blocks-schur`).
- **Juge** : `value` sur des blocs (chaque bloc est une petite matrice saisie dans sa propre grille), puis sur la matrice entière · **Forme finale** : produit ou inverse par blocs, égal au calcul direct.
- **Niveaux** :
  - L1 (guidé) : découpage dessiné ; l'élève remplit les blocs du produit, un à la fois.
  - L2 : l'élève choisit le découpage compatible parmi 3.
  - L3 (choisir l'action) : actions « produit de blocs », « inverse de bloc », « bloc nul ».
  - L4 (libre) : inverse d'une 4 × 4 triangulaire par blocs.
  - L5 (seul) : `[[I, 0], [X, I]]·[[A, B], [0, D]]` puis son inverse, ou la puissance `[[I, X], [0, I]]ᵏ = [[I, kX], [0, I]]`, sans aide.
- **Générateur** : blocs 2 × 2 entiers, A et D de det ±1 ou ±3 (D = 3I permis) ; B quelconque dans [−3 ; 3]. Gabarits : (a) produit (série GM 14, ex. 2) ; (b) inverse triangulaire par blocs ; (c) puissance d'une matrice par blocs.
- **Corrigé type** : M = `[[A, I₂], [0, 3I₂]]` avec A = `[[1, 2], [0, 1]]`.
  1. A⁻¹ = `[[1, −2], [0, 1]]`, (3I)⁻¹ = (1/3)I — *inverser les blocs diagonaux*
  2. bloc haut droit = −A⁻¹·I·(1/3)I = `[[−1/3, 2/3], [0, −1/3]]` — *formule du bloc*
  3. M⁻¹ = `[[1, −2, −1/3, 2/3], [0, 1, 0, −1/3], [0, 0, 1/3, 0], [0, 0, 0, 1/3]]` — *assembler*
- **Aides** : 1 « Écris M·N = I bloc par bloc et résous pour chaque bloc. » · 2 `bloc 12 = −A⁻¹·B·□` · 3 la matrice.
- **Variantes d'examen** : `mcq` « le bloc (1, 2) de M⁻¹ est… » (distracteurs : `l_blocks_order` → −D⁻¹BA⁻¹, `l_blocks_inverse_each`). `tf` : « det [[A, B], [0, D]] = det A · det D » (vrai) ; « det [[A, B], [C, D]] = det A · det D − det B · det C » (faux : `matOne` 4 × 4).
- **Pièges** : `l_blocks_order`, `l_blocks_inverse_each`.
- **Sous-buts → crédit** : inverser un bloc → `l-mat-inverse` ; formule du bloc → `l-mat-blocks`.

**Déterminants (Lay 3)**

### `l-det-cofactor` — Déterminant par cofacteurs
- **Année** 13 · **Prérequis** — · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U3). Le menu du niveau 3 propose le signe et le mineur ensemble ; un vrai/faux faux s'ajoute, avec contre-exemple.
- **Intro** : on développe selon la ligne ou la colonne qui a le plus de zéros : det A = Σⱼ (−1)^(i+j)·aᵢⱼ·det Aᵢⱼ. Le signe suit un damier `+ − + / − + − / + − +`. Une matrice triangulaire a pour déterminant le produit de sa diagonale. Exemple : ligne 2 = `[0, 0, 4, 0]` → det A = (−1)^(2+3)·4·det A₂₃.
- **Juge** : `value` avec la fonction `det(…)` appliquée à des sous-matrices dans la ligne (voir les lacunes) ; chaque ligne garde la même valeur · **Forme finale** : un nombre.
- **Niveaux** :
  - L1 (guidé) : ligne de développement choisie, signes affichés, mineurs à trous.
  - L2 : l'élève choisit la ligne ou la colonne ; le choix d'une ligne pleine est `quality:'poor'`.
  - L3 (choisir l'action) : choisir le signe, puis le mineur.
  - L4 (libre) : 4 × 4 avec beaucoup de zéros.
  - L5 (seul) : 5 × 5 creuse (2021 Q5), sans aide.
- **Générateur** : matrice n × n (n ∈ {3, 4, 5}) avec une ligne ou une colonne à un seul coefficient non nul, puis une autre dans le mineur ; coefficients dans [−5 ; 9] ; det ≠ 0 sauf une fois sur 5. Gabarits : (a) det ; (b) QCM ; (c) « pour quel x det = 0 ? » avec x dans une case.
- **Corrigé type** : A = `[[2, 0, 1, 3], [0, 0, 4, 0], [1, −1, 2, 0], [3, 0, 5, 1]]`.
  1. det A = (−1)^(2+3)·4·det `[[2, 0, 3], [1, −1, 0], [3, 0, 1]]` — *développer selon la ligne 2*
  2. = −4·(−1)^(2+2)·(−1)·det `[[2, 3], [3, 1]]` — *développer selon la colonne 2*
  3. = −4·(−1)·(2 − 9) = −28 — *calculer*
- **Aides** : 1 « Développe selon la ligne ou la colonne la plus creuse ; n'oublie pas le signe du damier. » · 2 `det A = □·4·det(…)` · 3 la ligne.
- **Variantes d'examen** : `mcq` det (distracteurs : `l_cofactor_sign` → 28, `l_minor_wrong`, 0). Pas de `coef` (la réponse est déjà un seul nombre). `tf` : « Une matrice qui a une ligne nulle a un déterminant nul » (vrai).
- **Pièges** : `l_cofactor_sign`, `l_minor_wrong`.
- **Sous-buts → crédit** : développer → `l-det-cofactor` ; 2 × 2 → `l-det-cofactor`.

### `l-det-rowops` — Déterminant par opérations sur les lignes
- **Année** 13 · **Prérequis** `l-det-cofactor`, `l-sys-echelon` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-det-cofactor` : déterminant d'une triangulaire et des petits blocs.
- **Statut** : fait le 10 novembre 2026 (étape U3). Avec un paramètre, seulement des Lᵢ ← Lᵢ + kLⱼ à k constant ; le Vandermonde sort (b − a) par linéarité. Les distracteurs du QCM « inversible si et seulement si a ∉ … » ne nomment pas de piège.
- **Intro** : `Lᵢ ← Lᵢ + kLⱼ` ne change pas det ; un échange change le signe ; `Lᵢ ← kLᵢ` multiplie det par k. On échelonne, puis on multiplie la diagonale. On peut aussi sortir un facteur d'une ligne (linéarité). Les mêmes règles valent pour les colonnes. Exemple : Vandermonde `[[1, a, a²], [1, b, b²], [1, c, c²]]` = (b − a)(c − a)(c − b).
- **Juge** : `rowops` `{A, track: 'det'}` : chaque ligne est « det A = facteur · det(matrice) » ; l'app contrôle que le facteur suit les opérations · **Forme finale** : un nombre, ou une expression factorisée en λ ou en a.
- **Niveaux** :
  - L1 (guidé) : opérations annoncées, facteur à compléter (1, −1 ou k).
  - L2 : l'élève choisit entre « échanger », « sortir un facteur », « Lᵢ ← 2Lᵢ − Lⱼ » (cette dernière multiplie det par 2 : message).
  - L3 (choisir l'action) : barre d'opérations ; l'élève tient le facteur à jour.
  - L4 (libre) : 4 × 4 numérique ou 3 × 3 avec un paramètre.
  - L5 (seul) : det d'une 4 × 4 avec λ (2018 Q5 ; 2019 Q7 : « inversible si et seulement si λ ∉ … »), sans aide.
- **Générateur** : on part de U triangulaire (diagonale dans {±1, ±2, 3}) et on applique 3 à 5 opérations sans échange (det connu), plus 0 ou 1 échange ; version à paramètre : une ou deux cases en a, det factorisable en facteurs de degré 1 sur ℚ. Gabarits : (a) numérique ; (b) paramètre, « pour quelles valeurs A est-elle inversible ? » ; (c) Vandermonde.
- **Corrigé type** : A = `[[1, 2, −1, 0], [2, 5, −1, 1], [−1, −2, 3, 2], [3, 6, −3, 1]]`.
  1. `L2 ← L2 − 2L1` : `[0, 1, 1, 1]` ; `L3 ← L3 + L1` : `[0, 0, 2, 2]` ; `L4 ← L4 − 3L1` : `[0, 0, 0, 1]` — *échelonner (det inchangé)*
  2. det A = 1·1·2·1 = 2 — *produit de la diagonale*
- **Aides** : 1 « Seuls les échanges et les multiplications de ligne changent det. » · 2 `det A = □·det(triangulaire)` · 3 la valeur.
- **Variantes d'examen** : `mcq` det, ou « inversible si et seulement si a ∉ … » (distracteurs : `l_det_swap_sign`, `l_det_scale_row`, `l_det_rowop_combo`). `tf` : « Ajouter à une ligne un multiple d'une autre ne change pas det » (vrai) ; « Si deux colonnes sont égales, det = 0 » (vrai).
- **Pièges** : `l_det_swap_sign`, `l_det_scale_row`, `l_det_rowop_combo`, `l_rowop_sign`.
- **Sous-buts → crédit** : échelonner → `l-sys-echelon` ; suivre le facteur → `l-det-rowops`.

### `l-det-props` — Propriétés : det(AB), det(kA), det(Aᵀ), det(A⁻¹)
- **Année** 13 · **Prérequis** `l-det-rowops`, `l-mat-imt` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-det-rowops` : det(kA) = kⁿ·det A vient de Lᵢ ← kLᵢ sur chaque ligne ; `l-mat-imt` : det A ≠ 0 ⇔ A inversible.
- **Statut** : fait le 10 novembre 2026 (étape U3). Les items en lignes prennent toujours un n numérique (le juge `value` n'accepte pas de lettre) ; n en lettre seulement dans le QCM ; menu fixe au niveau 3.
- **Intro** : det(AB) = det A · det B ; det(Aᵀ) = det A ; det(A⁻¹) = 1/det A ; pour A de taille n × n, det(kA) = kⁿ·det A. **Mais det(A + B) ≠ det A + det B en général.** Exemple : A 4 × 4, det A = 3 → det(2A) = 2⁴·3 = 48.
- **Juge** : `value` `{form: 'exact'}` sur des expressions en det A, det B et n · **Forme finale** : nombre ou expression simplifiée.
- **Niveaux** :
  - L1 (guidé) : règle affichée, l'élève remplit l'exposant ou le facteur.
  - L2 : choisir la règle qui s'applique parmi 4.
  - L3 (choisir l'action) : enchaîner deux règles (det(2A⁻¹Bᵀ)).
  - L4 (libre) : expressions à simplifier, avec n en lettre.
  - L5 (seul) : det((A + I)² − (A − I)²) = 4ⁿ·det A (2019 Q19), ou le quotient de 2018 Q21, sans aide.
- **Générateur** : n ∈ {2, 3, 4, 5}, det A et det B dans {±1, ±2, ±3, 1/2} ; expressions tirées d'une table de 10 formes (produit, transposée, inverse, scalaire, puissance, combinaison). Gabarits : (a) valeur numérique ; (b) expression en n ; (c) vrai/faux.
- **Corrigé type** : A et B de taille 3 × 3, det A = 2, det B = −1 ; calculer det(2AᵀB⁻¹).
  1. det(2AᵀB⁻¹) = 2³·det(Aᵀ)·det(B⁻¹) — *règle du scalaire et du produit*
  2. = 8·2·(1/(−1)) = −16 — *transposée et inverse*
- **Aides** : 1 « Un scalaire sort avec la puissance n. » · 2 `= 2^□·2·□` · 3 la valeur.
- **Variantes d'examen** : `mcq` (distracteurs : `l_det_scalar`, `l_det_sum`, `l_det_transpose_sign`). `tf` : « det(Aᵀ) = −det A » (faux : A = I, 2021 Q29) ; « det(A + B) = det A + det B » (faux : `matPair`) ; « Si A est 3 × 3 de valeurs propres 1, 2 et 4, det A = 8 » (vrai, 2021 Q19).
- **Pièges** : `l_det_sum`, `l_det_scalar`, `l_det_transpose_sign`.
- **Sous-buts → crédit** : chaque règle → `l-det-props`.

### `l-det-area` — Aire et volume
- **Année** 13 · **Prérequis** `l-det-cofactor` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 0
- **Statut** : fait le 10 novembre 2026 (étape U3). Pour les volumes, la matrice des arêtes est donnée au départ ; menu fixe au niveau 3.
- **Intro** : l'aire du parallélogramme construit sur u et v vaut |det[u v]| ; celle du triangle, la moitié. Le volume d'un parallélépipède vaut |det[u v w]|. L'application x ↦ Ax multiplie les aires (ou les volumes) par |det A|. Exemple : triangle (1 ; 1), (4 ; 2), (2 ; 5) → ½·|det `[[3, 1], [1, 4]]`| = 11/2.
- **Juge** : `value` · **Forme finale** : nombre exact positif.
- **Niveaux** :
  - L1 (guidé) : vecteurs côtés déjà calculés, det à trous.
  - L2 : l'élève choisit le sommet de départ et les deux vecteurs.
  - L3 (choisir l'action) : « parallélogramme », « triangle », « image par A ».
  - L4 (libre) : volume d'un tétraèdre (1/6 du parallélépipède) ou aire de l'image d'un disque.
  - L5 (seul) : aire de l'image d'une ellipse ou d'un triangle par une application donnée, sans aide.
- **Générateur** : sommets entiers dans [−5 ; 5], aire ≠ 0 ; matrice A entière avec |det A| ∈ [2 ; 12]. Gabarits : (a) triangle ; (b) parallélogramme ou parallélépipède ; (c) image d'une région par A.
- **Corrigé type** : triangle (1 ; 1), (4 ; 2), (2 ; 5).
  1. u = (3 ; 1), v = (1 ; 4) — *vecteurs côtés*
  2. det `[[3, 1], [1, 4]]` = 11 — *déterminant*
  3. aire = 11/2 — *moitié, valeur absolue*
- **Aides** : 1 « Deux côtés issus du même sommet, puis |det|. » · 2 `aire = ½·|det[[3, □], [1, □]]|` · 3 la valeur.
- **Variantes d'examen** : `mcq` (distracteurs : `l_area_half_abs` → 11 ou −11/2). `tf` : « L'aire de l'image du carré unité par A vaut det A » (faux : det A < 0).
- **Pièges** : `l_area_half_abs`.
- **Sous-buts → crédit** : déterminant → `l-det-cofactor` ; aire → `l-det-area`.

### `l-det-cramer` — Règle de Cramer
- **Année** 13 · **Prérequis** `l-det-cofactor` · **Étiquettes** `opt` · **Optionnelle** non · **Poids d'examen** 0
- **Statut** : fait le 10 novembre 2026 (étape U3). Menu fixe au niveau 3 (« Gauss » y est refusé avec une explication) ; la ligne intermédiaire (28 − 18)/10 n'est pas dans le corrigé.
- **Intro** : si det A ≠ 0, xᵢ = det Aᵢ(b) / det A, où Aᵢ(b) est A dont la **colonne** i est remplacée par b. Utile pour une seule inconnue d'un système 2 × 2 ou 3 × 3, ou avec un paramètre. Exemple : `3x + 2y = 7 ; x + 4y = 9` → x = det `[[7, 2], [9, 4]]` / 10 = 1.
- **Juge** : `value` · **Forme finale** : xᵢ exact.
- **Niveaux** :
  - L1 (guidé) : Aᵢ(b) à trous.
  - L2 : choisir la colonne à remplacer.
  - L3 (choisir l'action) : « Cramer » ou « Gauss » (les deux justes ; Cramer plus court pour une seule inconnue).
  - L4 (libre) : 3 × 3, une inconnue.
  - L5 (seul) : système avec paramètre, x₂ en fonction de a, sans aide.
- **Générateur** : A entière de det ∈ {±1, ±2, ±5, 10}, x entier. Gabarits : (a) 2 × 2 ; (b) une inconnue d'un 3 × 3 ; (c) paramètre.
- **Corrigé type** : `3x + 2y = 7 ; x + 4y = 9`.
  1. det A = 12 − 2 = 10 — *déterminant*
  2. x = det `[[7, 2], [9, 4]]`/10 = (28 − 18)/10 = 1 — *colonne 1 remplacée*
  3. y = det `[[3, 7], [1, 9]]`/10 = (27 − 7)/10 = 2 — *colonne 2 remplacée*
- **Aides** : 1 « Remplace la colonne de l'inconnue par b. » · 2 `x = det[[7, □], [9, □]]/10` · 3 la valeur.
- **Variantes d'examen** : `mcq` x₂ (distracteurs : `l_cramer_row`). Pas de `tf`.
- **Pièges** : `l_cramer_row`.
- **Sous-buts → crédit** : déterminant → `l-det-cofactor` ; Cramer → `l-det-cramer`.

**Espaces vectoriels, bases, coordonnées (Lay 4.1 à 4.7)**

### `l-vs-subspace` — Est-ce un sous-espace ? Dans ℝⁿ, Pₙ et M_{m×n}
- **Année** 13 · **Prérequis** `l-vec-span` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-vec-span` : un Span est toujours un sous-espace.
- **Statut** : fait le 10 novembre 2026 (étape U3). Niveau 1 : paramétrer, puis écrire le Span (ni cases à cocher, ni `blocks`) ; un ensemble qui n'est pas un sous-espace se montre par un calcul en lignes (x + y ou (−1)·x), pas par un item `example` ; Span explicite et {a·t⁴} seulement en vrai/faux.
- **Intro** : H est un sous-espace si 0 ∈ H, et si H est stable par somme et par multiplication par un scalaire. Raccourcis : un Span, un noyau, une image sont toujours des sous-espaces ; une condition non linéaire (uv = w², a₀² = a₁²) ou non homogène (a₁ = a₂ + 3, p(0) = 1) donne presque toujours « non », et il faut alors un contre-exemple. Exemple : {a + bt + ct² : a = b + c} = Span{1 + t, 1 + t²} → sous-espace de P₂, de dimension 2.
- **Juge** : décision « oui / non » puis, pour « oui », `blocks` (mode `frame` : 0 ∈ H, somme, multiple) ou une ligne « H = Span{…} » jugée par `span` ; pour « non », `example` `setWitness` · **Forme finale** : décision justifiée.
- **Niveaux** :
  - L1 (guidé) : un ensemble, trois cases à cocher (0 ∈ H ? somme ? multiple ?) avec les calculs à trous.
  - L2 : l'élève choisit la justification la plus courte (« c'est un Span », « c'est un noyau », « 0 n'y est pas »).
  - L3 (choisir l'action) : décision, puis contre-exemple ou écriture en Span.
  - L4 (libre) : ensembles de M₂ₓ₃ ou de P₃ définis par des conditions.
  - L5 (seul) : « combien de ces 4 ensembles sont des sous-espaces ? » (2019 Q12, 2018 Q16, révision 2017 Q10), sans aide.
- **Générateur** : table de formes : condition linéaire homogène (oui), affine non homogène (non : 0 absent), produit ou carré (non : `setWitness` avec deux éléments), Span explicite (oui), ensemble {a·t⁴} (oui, 2021 Q30), {(a ; sin a)} (non) ; coefficients des conditions dans [−3 ; 3]. Gabarits : (a) ℝ² ou ℝ³ ; (b) Pₙ ; (c) M_{m×n} ; (d) comptage de 4 ensembles.
- **Corrigé type** : H = {a + bt + ct² ∈ P₂ : a = b + c}.
  1. a + bt + ct² = (b + c) + bt + ct² = b(1 + t) + c(1 + t²) — *paramétrer*
  2. H = Span{1 + t, 1 + t²}, donc sous-espace — *reconnaître un Span*
  3. 1 + t et 1 + t² ne sont pas proportionnels : dim H = 2 — *dimension*
- **Aides** : 1 « Exprime un élément de H avec des paramètres libres : si c'est une combinaison fixe, H est un Span. » · 2 `= b(□) + c(□)` · 3 la conclusion.
- **Variantes d'examen** : `mcq` « combien sont des sous-espaces ? » (distracteurs : `l_subspace_zero`, `l_subspace_nonlinear`). `tf` : « {p ∈ P₄ : p(t) = at⁴, a ∈ ℝ} est un sous-espace de P₄ » (vrai) ; « {A ∈ M₂ₓ₂ : det A = 0} est un sous-espace » (faux : `setWitness`, `[[1, 0], [0, 0]]` et `[[0, 0], [0, 1]]`) ; « Si H contient p et q, il contient p − 2q » (vrai).
- **Pièges** : `l_subspace_zero`, `l_subspace_nonlinear`.
- **Sous-buts → crédit** : paramétrer → `l-vs-subspace` ; contre-exemple → `l-vs-subspace`.

### `l-vs-kernel` — Noyau : base de Ker A
- **Année** 13 · **Prérequis** `l-sys-solution` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U3). Niveau 5 : une application ℝⁿ → ℝ³ donnée par une formule, pas P₃ → ℝ⁴.
- **Intro** : Ker A est l'ensemble des solutions de Ax = 0. On réduit A, on écrit la solution générale avec les variables libres, et chaque variable libre donne un vecteur de base. dim Ker A = nombre de variables libres. Exemple : `x₁ + 2x₂ − x₄ = 0 ; x₃ + 3x₄ = 0` → Ker A = Span{(−2 ; 1 ; 0 ; 0), (1 ; 0 ; −3 ; 1)}.
- **Juge** : `rowops` jusqu'à la forme réduite, puis `span` `{basis: kernel(A), require: 'basis'}` · **Forme finale** : liste de vecteurs ; toute base du noyau est acceptée.
- **Niveaux** :
  - L1 (guidé) : forme réduite donnée ; les vecteurs de base sont à trous.
  - L2 : l'élève indique les variables libres, puis remplit.
  - L3 (choisir l'action) : réduire, puis paramétrer, puis séparer par variable libre.
  - L4 (libre) : 3 × 4 ou 3 × 5.
  - L5 (seul) : noyau d'une application T : P₃ → ℝ⁴ donnée par une formule (2018 Q17), rendu en polynômes, sans aide.
- **Générateur** : `rrefWith(3, 4 ou 5, pivots)` avec 1 ou 2 variables libres ; entrées libres de R dans [−3 ; 3]. Gabarits : (a) matrice ; (b) formule T(x) ; (c) application entre espaces de polynômes ; (d) vrai/faux « ces vecteurs forment une base de Ker A » avec A et R donnés (2021 Q25).
- **Corrigé type** : A = `[[1, 2, 0, −1], [2, 4, 1, 1], [−1, −2, 1, 4]]`.
  1. `L2 ← L2 − 2L1` : `[0, 0, 1, 3]` ; `L3 ← L3 + L1` : `[0, 0, 1, 3]` ; `L3 ← L3 − L2` : `[0, 0, 0, 0]` — *réduire*
  2. x₂ = s et x₄ = t libres ; x₁ = −2s + t, x₃ = −3t — *paramétrer*
  3. x = s(−2 ; 1 ; 0 ; 0) + t(1 ; 0 ; −3 ; 1) — *séparer*
  4. Base de Ker A : {(−2 ; 1 ; 0 ; 0), (1 ; 0 ; −3 ; 1)}, dim 2 — *conclure*
- **Aides** : 1 « Une variable libre = un vecteur de base. » · 2 `x = s(□ ; 1 ; 0 ; 0) + t(□ ; 0 ; □ ; 1)` · 3 la base.
- **Variantes d'examen** : `mcq` « Ker T = Span… » (distracteurs : `l_ker_sign`, `l_ker_from_rows`, `l_free_var_zero`). `tf` : 2021 Q25 (vecteurs donnés : vrai ou faux selon un signe) ; « dim Ker A = nombre de colonnes sans pivot » (vrai).
- **Pièges** : `l_ker_sign`, `l_ker_from_rows`, `l_free_var_zero`.
- **Sous-buts → crédit** : réduire → `l-sys-rref` ; paramétrer → `l-sys-solution` ; séparer → `l-vs-kernel`.

### `l-vs-col-row` — Image (Col A) et espace des lignes (Lgn A)
- **Année** 13 · **Prérequis** `l-vec-indep` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-vec-indep` : les colonnes pivots de A sont libres.
- **Statut** : fait le 10 novembre 2026 (étape U3). Niveau 5 : Col A, Lgn A et Ker A, pas (Col A)⊥.
- **Intro** : une base de Col A est formée des colonnes **de A** (pas de sa forme échelonnée) qui ont un pivot. Une base de Lgn A est formée des lignes non nulles **de la forme échelonnée**. dim Col A = dim Lgn A = rang A. Exemple : pivots en colonnes 1 et 3 → Col A = Span{a₁, a₃}, avec les colonnes de A.
- **Juge** : `rowops`, puis `span` `{basis: col(A) ou row(A), require: 'basis'}` · **Forme finale** : liste de vecteurs ; toute base juste est acceptée.
- **Niveaux** :
  - L1 (guidé) : forme échelonnée donnée, colonnes pivots à cocher, puis recopie des colonnes de A.
  - L2 : l'élève choisit « colonnes de A » ou « colonnes de R » (la seconde refusée avec le message de `l_col_from_rref`).
  - L3 (choisir l'action) : Col A, Lgn A et Ker A sur la même matrice.
  - L4 (libre) : T donnée par les images des eᵢ (2019 Q9) ou par une formule (2018 Q9).
  - L5 (seul) : base de Col A, puis de (Col A)⊥ (révision 2017 Q4), sans aide.
- **Générateur** : comme `l-vs-kernel` ; au moins une colonne pivot de A diffère de la colonne correspondante de R (sinon le piège est invisible). Gabarits : (a) Col A ; (b) Lgn A ; (c) les trois espaces ; (d) vrai/faux 2021 Q26 (base de Im A prise dans R).
- **Corrigé type** : même A que `l-vs-kernel`.
  1. R = `[[1, 2, 0, −1], [0, 0, 1, 3], [0, 0, 0, 0]]`, pivots en colonnes 1 et 3 — *réduire, lire les pivots*
  2. Col A = Span{(1 ; 2 ; −1), (0 ; 1 ; 1)} — *colonnes pivots de A*
  3. Lgn A = Span{(1 ; 2 ; 0 ; −1), (0 ; 0 ; 1 ; 3)} — *lignes non nulles de R*
  4. rang A = 2 = 4 − dim Ker A — *contrôle par le théorème du rang*
- **Aides** : 1 « Les pivots se lisent sur R, mais les vecteurs de Col A se prennent dans A. » · 2 `Col A = Span{a□, a□}` · 3 la base.
- **Variantes d'examen** : `mcq` « Im T = Span… » (distracteurs : `l_col_from_rref`, colonnes non pivots, `l_row_from_A`). `tf` : « Les colonnes pivots de R forment une base de Col A » (faux : `matOne`) ; « dim Col A = dim Lgn A » (vrai).
- **Pièges** : `l_col_from_rref`, `l_row_from_A`.
- **Sous-buts → crédit** : réduire → `l-sys-rref` ; colonnes pivots → `l-vs-col-row`.

### `l-vs-basis` — Base et dimension : extraire, compléter, reconnaître
- **Année** 13 · **Prérequis** `l-vs-col-row` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-vs-col-row` : extraire une base = garder les colonnes pivots.
- **Statut** : fait le 10 novembre 2026 (étape U3). Pas de gabarit « compléter en une base » ni de ligne de relation de dépendance ; le QCM ne demande qu'une dimension.
- **Intro** : dans un espace de dimension n, une famille de n vecteurs est une base si et seulement si elle est libre (ou si et seulement si elle engendre). Pour extraire une base d'une famille, on met les vecteurs (ou leurs coordonnées) en colonnes et on garde les colonnes pivots. Pour Pₙ ou M_{m×n}, on travaille sur les coordonnées dans la base canonique. Exemple : {1 + t, t + t², t² + t³, 1 + t³} dans P₃ : (1 + t) − (t + t²) + (t² + t³) − (1 + t³) = 0, donc pas une base.
- **Juge** : `rowops` sur la matrice des coordonnées, puis `span` `{require: 'basis'}` pour la base extraite, ou décision « base / pas base » · **Forme finale** : base extraite, ou décision avec relation de dépendance.
- **Niveaux** :
  - L1 (guidé) : matrice des coordonnées à trous.
  - L2 : l'élève choisit le critère (nombre de vecteurs, libre, engendre).
  - L3 (choisir l'action) : extraire, puis compléter en une base de l'espace.
  - L4 (libre) : polynômes ou matrices 2 × 2.
  - L5 (seul) : « ces polynômes forment-ils une base de P₃ ? » (2021 Q18) et dimension d'un sous-espace, sans aide.
- **Générateur** : `polyBasis` pour une vraie base ; pour une famille liée, un vecteur est une combinaison entière des autres (coefficients ±1, ±2) ; 4 vecteurs dans P₃ ou M₂ₓ₂. Gabarits : (a) base ou pas ; (b) extraire ; (c) compléter ; (d) dimension d'un Span.
- **Corrigé type** : {1 + t, t + t², t² + t³, 1 + t³} dans P₃.
  1. Coordonnées en colonnes : `[[1, 0, 0, 1], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 1]]` — *coordonnées*
  2. `L2 ← L2 − L1` : `[0, 1, 0, −1]` ; `L3 ← L3 − L2` : `[0, 0, 1, 1]` ; `L4 ← L4 − L3` : `[0, 0, 0, 0]` — *échelonner*
  3. 3 pivots : pas une base ; {1 + t, t + t², t² + t³} est une base du Span, de dimension 3 — *extraire*
  4. Relation : 1 + t³ = (1 + t) − (t + t²) + (t² + t³) — *dépendance*
- **Aides** : 1 « Coordonnées en colonnes, puis pivots. » · 2 `rang = □` · 3 la conclusion.
- **Variantes d'examen** : `mcq` dimension ou base extraite. `tf` : « Si dim V = n et S est libre, S est une base de V » (faux : un seul vecteur, 2021 Q23) ; « Cinq vecteurs de ℝ⁶ ne peuvent pas engendrer ℝ⁶, mais six vecteurs de ℝ⁵ peuvent engendrer ℝ⁵ » (vrai, révision 2017 Q13).
- **Pièges** : `l_span_count`, `l_col_from_rref`, `l_matrix_rows_cols`.
- **Sous-buts → crédit** : coordonnées → `l-vs-coords` ; échelonner → `l-sys-echelon` ; extraire → `l-vs-basis`.

### `l-vs-rank` — Rang et théorème du rang
- **Année** 13 · **Prérequis** `l-vs-basis` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-vs-basis` : dimension = nombre de vecteurs d'une base.
- **Statut** : fait le 10 novembre 2026 (étape U3). Niveau 5 : une chaîne de lignes sans aide plutôt qu'une série de vrai/faux et de QCM. « A 3 × 5 peut avoir un noyau de dimension 1 » (faux, mais sans contre-exemple possible) devient « dim Ker A ≥ n − m » (vrai), et le faux « dim Ker A = m − r » (contre-exemple `dims`).
- **Intro** : pour A de taille m × n : rang A + dim Ker A = n ; dim Ker Aᵀ = m − rang A ; rang A = rang Aᵀ ≤ min(m, n). Pour T : V → W, dim Im T + dim Ker T = dim V. Exemple : A 5 × 7 de rang 3 → dim Ker A = 4, dim Ker Aᵀ = 2.
- **Juge** : `value` sur des entiers, et items `tf` · **Forme finale** : dimensions.
- **Niveaux** :
  - L1 (guidé) : formule affichée, l'élève remplit.
  - L2 : l'élève choisit la bonne formule parmi 3 (n − r, m − r, r).
  - L3 (choisir l'action) : enchaîner (dim Ker A connue → rang → dim Ker Aᵀ).
  - L4 (libre) : questions sur T : V → W avec V = Pₙ ou M_{m×n}.
  - L5 (seul) : série de vrai/faux et de QCM de dimensions (2019 Q15 ; 2021 Q24), sans aide.
- **Générateur** : m, n ∈ [2 ; 9], rang ≤ min(m, n) ; énoncés tirés au hasard parmi 8 formes. Gabarits : (a) nombres ; (b) espaces de polynômes ; (c) vrai/faux.
- **Corrigé type** : A de taille 5 × 7, rang 3.
  1. dim Ker A = 7 − 3 = 4 — *théorème du rang*
  2. dim Ker Aᵀ = 5 − 3 = 2 — *théorème du rang pour Aᵀ*
  3. dim Lgn A = 3 — *rang des lignes*
- **Aides** : 1 « n est le nombre de colonnes, c'est-à-dire la dimension de départ. » · 2 `dim Ker A = □ − 3` · 3 la valeur.
- **Variantes d'examen** : `mcq` « si dim W = k, dim Ker Aᵀ = … » (2019 Q15 ; distracteurs : `l_rank_dim_confusion`). `tf` : « A 9 × 5 avec dim Ker A = 5 ⇒ dim Im A = 0 » (vrai, 2021 Q24) ; « rang A = rang AᵀA » (vrai) ; « A 3 × 5 peut avoir un noyau de dimension 1 » (faux : au moins 2 ; `dims`).
- **Pièges** : `l_rank_dim_confusion`.
- **Sous-buts → crédit** : formule → `l-vs-rank`.

### `l-vs-coords` — Coordonnées dans une base
- **Année** 13 · **Prérequis** `l-vs-basis` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-vs-basis` : les coordonnées se prennent dans une base.
- **Statut** : fait le 10 novembre 2026 (étape U3). Pas de gabarit M₂ₓ₂ à base orthogonale ; niveau 4 dans ℝ³ ou P₂ ; niveau 1 : la réduction de [B | x], avec des cases.
- **Intro** : [x]_B = (c₁ ; … ; cₙ) si x = c₁b₁ + … + cₙbₙ. On résout le système de matrice [b₁ … bₙ | x]. Dans Pₙ, on identifie les coefficients de chaque puissance de t. Exemple : B = (1, 1 − t, t + t²), p = 2 + 3t − t² → [p]_B = (6 ; −4 ; −1).
- **Juge** : `rowops` (ou identification des coefficients, jugée par `value`), puis `value` sur le vecteur de coordonnées · **Forme finale** : vecteur de coordonnées exact.
- **Niveaux** :
  - L1 (guidé) : système d'identification écrit, à trous.
  - L2 : l'élève choisit l'ordre de résolution (en partant du coefficient le plus simple).
  - L3 (choisir l'action) : système augmenté, puis réduction.
  - L4 (libre) : ℝ³ avec une base non canonique, ou M₂ₓ₂.
  - L5 (seul) : « la première composante de p dans B est −6 : vrai ? » (2021 Q28) et le sens inverse (de [x]_B à x), sans aide.
- **Générateur** : B = `polyBasis(2)` ou `unimodular(3)` en colonnes ; coordonnées entières dans [−6 ; 6] ; on calcule x. Gabarits : (a) Pₙ ; (b) ℝⁿ ; (c) de [x]_B vers x (série GM 14, ex. 10) ; (d) M₂ₓ₂ avec une base orthogonale pour ⟨A, B⟩ (série MT 13, ex. 7 : coordonnées par produits scalaires).
- **Corrigé type** : B = (1, 1 − t, t + t²), p = 2 + 3t − t².
  1. c₁·1 + c₂(1 − t) + c₃(t + t²) = 2 + 3t − t² — *écrire la combinaison*
  2. t² : c₃ = −1 ; t : −c₂ + c₃ = 3, donc c₂ = −4 ; 1 : c₁ + c₂ = 2, donc c₁ = 6 — *identifier*
  3. [p]_B = (6 ; −4 ; −1) — *conclure*
- **Aides** : 1 « Écris p comme combinaison de la base et identifie les coefficients. » · 2 `c₃ = □, c₂ = □, c₁ = □` · 3 le vecteur.
- **Variantes d'examen** : `mcq` [x]_B (distracteurs : `l_coords_canonical` → (2 ; 3 ; −1), `l_change_basis_direction`). `tf` : 2021 Q28. `coef` une coordonnée.
- **Pièges** : `l_coords_canonical`, `l_change_basis_direction`.
- **Sous-buts → crédit** : identifier → `l-vs-coords`.

### `l-vs-map-matrix` — Matrice d'une application entre Pₙ, M_{m×n} et ℝⁿ
- **Année** 13 · **Prérequis** `l-vs-coords`, `l-map-std-matrix` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U3). Base d'arrivée toujours canonique (`l_coords_canonical` n'y sert pas) ; T : P₂ → ℝ³ ou P₂ → P₂, sans M₂ₓ₂ ni (t + 1)p ; niveau 5 sur P₂ au lieu de P₃.
- **Intro** : [T]_{C B} a pour colonne j les **coordonnées dans C** de T(bⱼ). On calcule T(b₁), …, T(bₙ), puis on les exprime dans C. Si C est canonique, la seconde étape est immédiate. Exemple : T(a + bt + ct²) = (a − b ; b + 2c ; a + c), B = (1 + t, t − t², 1) → T(1 + t) = (0 ; 1 ; 1) est la 1re colonne.
- **Juge** : `value` sur chaque T(bⱼ) (vecteur, polynôme ou matrice), puis `value` sur les coordonnées, puis sur la matrice · **Forme finale** : la matrice ; `askCoef` aᵢⱼ au format examen.
- **Niveaux** :
  - L1 (guidé) : images des bⱼ à trous ; la matrice se remplit colonne par colonne.
  - L2 : l'élève choisit « coordonnées de T(bⱼ) en colonne j » ou « en ligne j » (refusé, `l_matrix_rows_cols`).
  - L3 (choisir l'action) : calculer T(bⱼ), puis coordonnées, puis placer.
  - L4 (libre) : T : M₂ₓ₂ → M₂ₓ₂ dans une base non canonique (2019 Q6) ou T : P₂ → P₂ (2018 Q12).
  - L5 (seul) : seulement a₃₄ demandé, T : P₃ → ℝ⁴, base B de P₃ non canonique (2021 Q8), sans aide.
- **Générateur** : T tirée parmi des formes simples (évaluations p(0), p(1), p′(0), multiplication par (t + 1), coefficients combinés, transposée, A ↦ MA) ; bases `polyBasis` ou bases de M₂ₓ₂ à coefficients 0, ±1 ; la colonne demandée vient d'un bⱼ non canonique. Gabarits : (a) Pₙ → ℝᵐ ; (b) Pₙ → Pₘ (révision 2017 Q9 : T(p) = (t + 1)p) ; (c) M₂ₓ₂ → M₂ₓ₂ ; (d) un coefficient.
- **Corrigé type** : T(a + bt + ct²) = (a − b ; b + 2c ; a + c), B = (1 + t, t − t², 1), C canonique.
  1. T(1 + t) = (0 ; 1 ; 1) — *image du 1er vecteur*
  2. T(t − t²) = (−1 ; −1 ; −1) — *image du 2e vecteur*
  3. T(1) = (1 ; 0 ; 1) — *image du 3e vecteur*
  4. [T]_{C B} = `[[0, −1, 1], [1, −1, 0], [1, −1, 1]]`, a₂₃ = 0, a₃₂ = −1 — *placer en colonnes*
- **Aides** : 1 « Colonne j = coordonnées de T(bⱼ) dans la base d'arrivée. » · 2 `T(t − t²) = (□ ; □ ; □)` · 3 la matrice.
- **Variantes d'examen** : `coef` aᵢⱼ ; `mcq` matrice ou coefficient (distracteurs : `l_matrix_rows_cols`, `l_map_basis_ignored` (matrice dans les bases canoniques), `l_coef_index_swap`).
- **Pièges** : `l_matrix_rows_cols`, `l_map_basis_ignored`, `l_coords_canonical`.
- **Sous-buts → crédit** : images → `l-map-std-matrix` ; coordonnées → `l-vs-coords` ; placer → `l-vs-map-matrix`.

### `l-vs-change-basis` — Matrice de passage P_{C←B}
- **Année** 13 · **Prérequis** `l-vs-coords`, `l-mat-inverse` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-vs-coords` : les colonnes sont des coordonnées dans C ; `l-mat-inverse` : P_{B←C} = (P_{C←B})⁻¹.
- **Statut** : fait le 10 novembre 2026 (étape U3). Pas de gabarit « de B vers la base canonique » ; niveau 5 : un pᵢⱼ d'une 3 × 3, pas d'une 4 × 4.
- **Intro** : P_{C←B} a pour colonnes les coordonnées **dans C** des vecteurs **de B** ; elle vérifie [x]_C = P_{C←B}·[x]_B. Dans ℝⁿ : on réduit [C | B] et on lit [I | P_{C←B}]. P_{B←C} = (P_{C←B})⁻¹. Exemple : C = {(1 ; 1), (1 ; 2)}, B = {(2 ; 3), (1 ; 0)} → [C | B] réduite = `[[1, 0 | 1, 2], [0, 1 | 1, −1]]`.
- **Juge** : `rowops` `{A: [C | B], reduced: true}` puis `value` sur P · **Forme finale** : P_{C←B} ; `askCoef` pᵢⱼ au format examen.
- **Niveaux** :
  - L1 (guidé) : [C | B] posée, réduction annoncée, P à trous.
  - L2 : l'élève choisit entre [C | B] et [B | C] (la seconde donne P_{B←C} : message).
  - L3 (choisir l'action) : réduction libre, puis contrôle « b₁ = p₁₁c₁ + p₂₁c₂ ».
  - L4 (libre) : ℝ³, ou P₂ avec deux bases non canoniques (quiz MT 2017).
  - L5 (seul) : seulement p₂₃ et p₃₁ (révision 2017 Q2, 4 × 4) ou le choix parmi 4 matrices (2021 Q9, 2018 Q1), sans aide.
- **Générateur** : C = `unimodular(n)` en colonnes, P = `unimodular(n)` choisie, puis B = C·P (B entière, P entière). Gabarits : (a) ℝ² ; (b) ℝ³ ; (c) P₂ ; (d) de B vers la base canonique (P = B, qui doit être reconnue sans calcul).
- **Corrigé type** : C = {(1 ; 1), (1 ; 2)}, B = {(2 ; 3), (1 ; 0)}.
  1. [C | B] = `[[1, 1 | 2, 1], [1, 2 | 3, 0]]` — *poser*
  2. `L2 ← L2 − L1` : `[0, 1 | 1, −1]` ; `L1 ← L1 − L2` : `[1, 0 | 1, 2]` — *réduire*
  3. P_{C←B} = `[[1, 2], [1, −1]]` — *lire à droite*
  4. Contrôle : 1·(1 ; 1) + 1·(1 ; 2) = (2 ; 3) = b₁ — *vérifier*
- **Aides** : 1 « Colonnes de P = coordonnées des vecteurs de B dans C : réduis [C | B]. » · 2 `[1, 0 | □, □]` · 3 la matrice.
- **Variantes d'examen** : `mcq` P (distracteurs : `l_change_basis_direction` → P⁻¹, `l_matrix_rows_cols` → Pᵀ, `l_change_basis_product` → C⁻¹ seule ou B⁻¹C). `coef` pᵢⱼ. `tf` : « P_{B←C}·P_{C←B} = I » (vrai).
- **Pièges** : `l_change_basis_direction`, `l_matrix_rows_cols`, `l_change_basis_product`.
- **Sous-buts → crédit** : réduire → `l-sys-rref` ; lire → `l-vs-change-basis`.

### `l-vs-similar` — Matrice de T dans une base B ; matrices semblables
- **Année** 13 · **Prérequis** `l-vs-change-basis`, `l-vs-map-matrix` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-vs-change-basis` : P est une matrice de passage ; `l-vs-map-matrix` : matrice [T]_B d'une application.
- **Statut** : fait le 10 novembre 2026 (étape U3). Niveau 3 : seulement la formule ; niveau 4 : se termine sur A (T(x) en note) ; pas de gabarit à base partiellement inconnue.
- **Intro** : si A est la matrice canonique de T et P = [b₁ … bₙ], alors [T]_B = P⁻¹AP, et A = P·[T]_B·P⁻¹. Deux matrices semblables ont le même polynôme caractéristique, le même déterminant, la même trace et le même rang. Exemple : B = {(1 ; 1), (1 ; 2)}, [T]_B = `[[2, 0], [1, 3]]` → A = P·[T]_B·P⁻¹ = `[[3, 0], [2, 2]]`.
- **Juge** : `value` sur P, P⁻¹ et les produits ; contrôle final T(b₁) = 2b₁ + b₂ · **Forme finale** : A ou [T]_B, ou la formule T(x).
- **Niveaux** :
  - L1 (guidé) : formule affichée, P et P⁻¹ données, produits à trous.
  - L2 : l'élève choisit P⁻¹AP ou PAP⁻¹ selon le sens demandé.
  - L3 (choisir l'action) : « par la formule » ou « par les images des bⱼ » (les deux justes).
  - L4 (libre) : trouver T(x) à partir de [T]_B (2018 Q15).
  - L5 (seul) : trouver une composante inconnue de B à partir de [T]_B et de T (2019 Q13), sans aide.
- **Générateur** : P = `unimodular(2 ou 3)`, [T]_B entière dans [−3 ; 3], A = P[T]_B P⁻¹ entière. Gabarits : (a) de [T]_B vers T ; (b) de T vers [T]_B ; (c) base partiellement inconnue ; (d) vrai/faux sur les invariants.
- **Corrigé type** : B = {(1 ; 1), (1 ; 2)}, [T]_B = `[[2, 0], [1, 3]]`.
  1. P = `[[1, 1], [1, 2]]`, P⁻¹ = `[[2, −1], [−1, 1]]` — *matrice de passage et inverse*
  2. P·[T]_B = `[[3, 3], [4, 6]]` — *produit*
  3. A = `[[3, 3], [4, 6]]`·P⁻¹ = `[[3, 0], [2, 2]]`, donc T(x) = (3x₁ ; 2x₁ + 2x₂) — *produit*
  4. Contrôle : T(1 ; 1) = (3 ; 4) = 2(1 ; 1) + 1(1 ; 2) — *vérifier*
- **Aides** : 1 « [T]_B = P⁻¹AP, avec les vecteurs de B en colonnes dans P. » · 2 `A = P·[T]_B·□` · 3 la matrice.
- **Variantes d'examen** : `mcq` T(x) (distracteurs : `l_similar_order`, `l_matrix_rows_cols`). `tf` : « Deux matrices semblables ont les mêmes valeurs propres » (vrai) ; « Deux matrices qui ont les mêmes valeurs propres sont semblables » (faux : `matOne` `sameEigNotSimilar`, avec I₂ et `[[1, 1], [0, 1]]`).
- **Pièges** : `l_similar_order`, `l_change_basis_direction`.
- **Sous-buts → crédit** : inverser P → `l-mat-inverse` ; produits → `l-mat-product` ; formule → `l-vs-similar`.

**Valeurs propres et vecteurs propres (Lay 5)**

### `l-eig-check` — Vérifier un vecteur propre ou une valeur propre
- **Année** 13 · **Prérequis** `l-mat-product`, `l-vs-kernel` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-vs-kernel` : (A − λI)x = 0 a une solution non nulle.
- **Statut** : fait le 10 novembre 2026 (étape U3). Le niveau 5 teste deux vecteurs et une valeur dans un même item en lignes (pas encore de QCM à plusieurs réponses à l'écran) ; « le vecteur nul est propre » (sans contre-exemple vérifiable) est remplacé par « u + w est propre » (faux).
- **Intro** : v est un vecteur propre de A si v ≠ 0 et Av = λv pour un nombre λ. λ est une valeur propre si A − λI n'est pas inversible, c'est-à-dire si (A − λI)x = 0 a une solution non nulle. Exemple : A = `[[3, 1, 0], [1, 3, 0], [0, 0, 2]]`, v = (1 ; −1 ; 2) → Av = (2 ; −2 ; 4) = 2v.
- **Juge** : `value` sur Av, puis décision ; pour une valeur propre, `rowops` sur A − λI jusqu'à voir une variable libre · **Forme finale** : « oui, λ = … » ou « non ».
- **Niveaux** :
  - L1 (guidé) : Av à trous, puis « Av = □·v ? ».
  - L2 : l'élève choisit la méthode (calculer Av, ou échelonner A − λI).
  - L3 (choisir l'action) : deux questions enchaînées (v est-il propre ? λ est-elle propre ?).
  - L4 (libre) : 3 × 3, vecteurs et valeurs à tester.
  - L5 (seul) : « parmi ces 4 vecteurs, lesquels sont propres ? » et « λ = 4 est-elle propre ? », sans aide.
- **Générateur** : `pdp` avec des valeurs propres entières distinctes ; vecteur testé : un vecteur propre multiplié par k ∈ {±1, ±2}, ou une somme de deux vecteurs propres (non propre), ou 0 (refusé). Gabarits : (a) vecteur ; (b) valeur ; (c) les deux.
- **Corrigé type** : A = `[[3, 1, 0], [1, 3, 0], [0, 0, 2]]`.
  1. A·(1 ; −1 ; 2) = (2 ; −2 ; 4) = 2·(1 ; −1 ; 2) : vecteur propre, λ = 2 — *calculer Av*
  2. A − 4I = `[[−1, 1, 0], [1, −1, 0], [0, 0, −2]]` : les deux premières lignes sont opposées — *échelonner*
  3. Une variable libre, donc 4 est valeur propre — *conclure*
- **Aides** : 1 « Calcule Av et compare à v. » · 2 `Av = (□ ; □ ; □) = □·v` · 3 la conclusion.
- **Variantes d'examen** : `mcq` (distracteurs : `l_eigvec_zero`, une somme de deux vecteurs propres). `tf` : « Le vecteur nul est vecteur propre de toute matrice » (faux) ; « 0 est valeur propre de A si et seulement si A n'est pas inversible » (vrai).
- **Pièges** : `l_eigvec_zero`, `l_eigen_rref`.
- **Sous-buts → crédit** : calculer Av → `l-mat-product` ; échelonner → `l-sys-echelon` ; conclure → `l-eig-check`.

### `l-eig-charpoly` — Polynôme caractéristique et valeurs propres
- **Année** 13 · **Prérequis** `l-det-cofactor`, `g0-factor-thm`, `@alg:H-discriminant` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g0-factor-thm` : racine évidente d'un polynôme caractéristique de degré 3.
- **Statut** : fait le 10 novembre 2026 (étape U3). Lignes jugées par `det` (et non `equiv`), racines par `solset`.
- **Intro** : p(λ) = det(A − λI) ; λ est **soustrait à chaque case de la diagonale**. Les racines sont les valeurs propres, avec leur multiplicité. 2 × 2 : p(λ) = λ² − (tr A)λ + det A. Triangulaire : les valeurs propres sont sur la diagonale. **Les opérations sur les lignes changent les valeurs propres** : on ne les lit pas sur une forme échelonnée. Exemple : `[[4, 1], [2, 3]]` → λ² − 7λ + 10 = (λ − 2)(λ − 5).
- **Juge** : `equiv` `{vars: ['λ'], target: 'factored'}` (lignes avec `det(…)` de matrices en λ) ; puis `solset` sur les racines · **Forme finale** : polynôme factorisé et liste des valeurs propres avec multiplicités.
- **Niveaux** :
  - L1 (guidé) : A − λI à trous, puis développement guidé.
  - L2 : l'élève choisit la ligne de développement (celle qui a des zéros) ou la formule trace-déterminant.
  - L3 (choisir l'action) : « développer », « mettre en facteur », « factoriser un trinôme ».
  - L4 (libre) : 3 × 3 avec un facteur qui sort tout seul.
  - L5 (seul) : 4 × 4 par blocs ou avec une ligne presque vide (2019 Q4, 2018 Q10), sans aide.
- **Générateur** : `pdp` avec des valeurs propres entières dans [−5 ; 6], au plus une racine double ; on garde les matrices où une ligne ou une colonne a au moins un zéro (développement court). Pour les 4 × 4 : triangulaire par blocs. Gabarits : (a) 2 × 2 ; (b) 3 × 3 ; (c) QCM « les valeurs propres sont… » ; (d) polynôme d'une matrice A = Σ λᵢvᵢvᵢᵀ (2018 Q11, voir `l-sym-orthodiag`).
- **Corrigé type** : A = `[[2, 0, 0], [1, 3, 1], [1, 1, 3]]`.
  1. det(A − λI) = (2 − λ)·det `[[3 − λ, 1], [1, 3 − λ]]` — *développer selon la ligne 1*
  2. = (2 − λ)((3 − λ)² − 1) — *2 × 2*
  3. = (2 − λ)(λ − 2)(λ − 4) = −(λ − 2)²(λ − 4) — *factoriser*
  4. Valeurs propres : 2 (double) et 4 — *lire les racines*
- **Aides** : 1 « Soustrais λ sur toute la diagonale, puis développe selon la ligne la plus creuse. » · 2 `(2 − λ)((3 − λ)² − □)` · 3 la factorisation.
- **Variantes d'examen** : `mcq` « les valeurs propres de A sont… » (distracteurs : `l_charpoly_sign`, `l_lambda_one_entry`, `l_eigen_rref`). `tf` : « Les valeurs propres d'une matrice triangulaire sont sur sa diagonale » (vrai) ; « A et sa forme échelonnée ont les mêmes valeurs propres » (faux : `matOne`).
- **Pièges** : `l_charpoly_sign`, `l_lambda_one_entry`, `l_eigen_rref`, `l_cofactor_sign`.
- **Sous-buts → crédit** : développer → `l-det-cofactor` ; factoriser → `@alg:H-discriminant` ; racines → `l-eig-charpoly`.

### `l-eig-space` — Espaces propres : base de E_λ
- **Année** 13 · **Prérequis** `l-eig-charpoly`, `l-vs-kernel` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-eig-charpoly` : valeurs propres λ ; `l-vs-kernel` : E_λ = Ker(A − λI).
- **Statut** : fait le 10 novembre 2026 (étape U3). Le vrai/faux « (λ − 3)²λ⁴ » devient une 3 × 3 de polynôme (λ − a)²(λ − b).
- **Intro** : E_λ = Ker(A − λI). On réduit A − λI ; chaque variable libre donne un vecteur de base. 1 ≤ dim E_λ ≤ multiplicité de λ. Exemple : A − 2I = `[[0, 0, 0], [1, 1, 1], [1, 1, 1]]` → x₁ + x₂ + x₃ = 0 → E₂ = Span{(−1 ; 1 ; 0), (−1 ; 0 ; 1)}.
- **Juge** : `rowops` sur A − λI, puis `eigvec` `{A, λ}` pour chaque vecteur, et `span` `{basis: kernel(A − λI), require: 'basis'}` pour la liste · **Forme finale** : base de chaque espace propre ; tout multiple et toute base juste sont acceptés.
- **Niveaux** :
  - L1 (guidé) : A − λI à trous, puis équation réduite, puis vecteurs à trous.
  - L2 : l'élève choisit les variables libres.
  - L3 (choisir l'action) : un espace propre à la fois, l'app propose « suivant ».
  - L4 (libre) : 3 × 3 avec une valeur propre double.
  - L5 (seul) : « une base de {x : Ax = 5x} est… » (2019 Q2, 2018 Q7), 4 × 4, sans aide.
- **Générateur** : comme `l-eig-charpoly` ; pour les valeurs doubles, on choisit au hasard dim E_λ = 1 ou 2 (on fixe P et un bloc de Jordan si 1). Gabarits : (a) tous les espaces propres ; (b) un seul ; (c) QCM sur une base.
- **Corrigé type** : A = `[[2, 0, 0], [1, 3, 1], [1, 1, 3]]`.
  1. A − 2I = `[[0, 0, 0], [1, 1, 1], [1, 1, 1]]` → x₁ + x₂ + x₃ = 0 — *réduire*
  2. E₂ = Span{(−1 ; 1 ; 0), (−1 ; 0 ; 1)} — *base du noyau*
  3. A − 4I = `[[−2, 0, 0], [1, −1, 1], [1, 1, −1]]` → x₁ = 0, x₂ = x₃ — *réduire*
  4. E₄ = Span{(0 ; 1 ; 1)} — *base du noyau*
- **Aides** : 1 « E_λ = Ker(A − λI) : même méthode que pour un noyau. » · 2 `E₂ = Span{(−1 ; □ ; 0), (−1 ; 0 ; □)}` · 3 la base.
- **Variantes d'examen** : `mcq` (distracteurs : `l_eigvec_row`, `l_ker_sign`, `l_eigvec_zero`). `tf` : « Si p(λ) = (λ − 3)²λ⁴, l'espace propre de 3 est toujours de dimension 2 » (faux : `matOne` `eigspaceDim`, 2021 Q22).
- **Pièges** : `l_eigvec_row`, `l_ker_sign`, `l_eigvec_zero`.
- **Sous-buts → crédit** : réduire → `l-sys-rref` ; base → `l-eig-space`.

### `l-eig-related` — Valeurs propres de cA, Aᵏ, A⁻¹, Aᵀ, A + cI, BAB⁻¹
- **Année** 13 · **Prérequis** `l-det-props` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U3). Niveau 5 : un item en lignes sans aide, pas une série de vrai/faux et de QCM.
- **Intro** : si Av = λv, alors (cA)v = cλv, Aᵏv = λᵏv, A⁻¹v = (1/λ)v (si A est inversible), (A + cI)v = (λ + c)v. Aᵀ a les mêmes valeurs propres que A (mais pas les mêmes vecteurs propres). BAB⁻¹ a les mêmes valeurs propres, de vecteurs propres Bv. det A = produit des valeurs propres ; tr A = leur somme. Exemple : spectre {1 ; 2 ; −3} → A⁻¹ : {1 ; 1/2 ; −1/3}, A + 3I : {4 ; 5 ; 0}, donc A + 3I n'est pas inversible.
- **Juge** : `value` sur des listes de nombres (ordre libre), et items `tf`, `mcq` · **Forme finale** : spectre ou propriété demandée.
- **Niveaux** :
  - L1 (guidé) : règle affichée, l'élève applique à chaque valeur.
  - L2 : choisir la bonne règle parmi 4.
  - L3 (choisir l'action) : enchaîner (spectre de 2A⁻¹ + I).
  - L4 (libre) : questions mêlées (det, trace, inversibilité, diagonalisabilité de A⁻¹ et Aᵀ).
  - L5 (seul) : série de vrai/faux et de QCM (2019 Q3, Q22 ; 2018 Q22 ; 2021 Q12), sans aide.
- **Générateur** : spectres entiers non nuls dans [−4 ; 4] ; expressions en A tirées parmi 8 formes (cA, Aᵏ, A⁻¹, Aᵀ, A + cI, p(A), BAB⁻¹, A²−A). Gabarits : (a) spectre d'une expression ; (b) det ou tr ; (c) vrai/faux.
- **Corrigé type** : A est 3 × 3 de valeurs propres 1, 2 et −3.
  1. A⁻¹ : 1, 1/2, −1/3 — *inverse*
  2. A² − I : 0, 3, 8, donc A² − I n'est pas inversible — *polynôme en A*
  3. det A = 1·2·(−3) = −6 ; tr A = 0 — *produit et somme*
- **Aides** : 1 « Applique la même opération à chaque valeur propre. » · 2 `p(λ) = λ² − 1 : p(1) = □, p(2) = □, p(−3) = □` · 3 le spectre.
- **Variantes d'examen** : `mcq` (distracteurs : `l_eig_inv_neg`, `l_eig_shift_scale`, `l_eig_transpose_vec`). `tf` : « Si A est diagonalisable à valeurs propres non nulles, Aᵀ et A⁻¹ sont diagonalisables » (vrai, 2019 Q3) ; « Aᵀ a les mêmes vecteurs propres que A » (faux : `matOne`, `[[1, 1], [0, 2]]`) ; « Les valeurs propres de A + B sont les sommes de celles de A et de B » (faux : `matPair`).
- **Pièges** : `l_eig_inv_neg`, `l_eig_shift_scale`, `l_eig_transpose_vec`, `l_eig_sum`.
- **Sous-buts → crédit** : appliquer la règle → `l-eig-related` ; det et trace → `l-det-props`.

### `l-eig-diag` — Diagonaliser : A = PDP⁻¹
- **Année** 13 · **Prérequis** `l-eig-space`, `l-mat-inverse` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U3). La conclusion « diagonalisable ? » est une décision en tête de la partie suivante, ou un compte (Σ dim E_λ).
- **Intro** : A (n × n) est diagonalisable si et seulement si elle a n vecteurs propres libres, c'est-à-dire si Σ dim E_λ = n. Alors P = [v₁ … vₙ] et D = diag(λ₁, …, λₙ), **dans le même ordre**, et A = PDP⁻¹. Exemple : A = `[[5, −2], [4, −1]]` → P = `[[1, 1], [2, 1]]`, D = diag(1, 3).
- **Juge** : `poly` puis `eigvec` pour chaque vecteur, puis `factor` `{A, kind: 'PDP'}` (AP = PD et P inversible) · **Forme finale** : P et D (et P⁻¹ si demandée) ; `askCoef` pᵢⱼ avec une convention fixée par l'énoncé (colonnes normées, λ₁ < λ₂).
- **Niveaux** :
  - L1 (guidé) : valeurs propres données, vecteurs à trous, P et D à assembler.
  - L2 : l'élève choisit l'ordre des valeurs propres dans D ; l'app vérifie que P suit.
  - L3 (choisir l'action) : enchaîner polynôme, espaces propres, assemblage.
  - L4 (libre) : 3 × 3, avec P⁻¹.
  - L5 (seul) : 3 × 3 non diagonalisable ou diagonalisable selon le tirage ; l'élève conclut, puis donne pᵢⱼ ou Aᵏ, sans aide.
- **Générateur** : `pdp(eigs)` avec valeurs entières distinctes (niveaux 1 à 3) ou une double avec dim E = 2 (niveau 4) ; niveau 5 : une fois sur trois, bloc de Jordan (non diagonalisable). Gabarits : (a) diagonaliser ; (b) coefficient de P avec convention ; (c) « A est-elle diagonalisable ? » ; (d) révision 2017 Q3 (deux matrices, laquelle l'est).
- **Corrigé type** : A = `[[5, −2], [4, −1]]`.
  1. λ² − 4λ + 3 = (λ − 1)(λ − 3) — *polynôme caractéristique*
  2. λ = 1 : A − I = `[[4, −2], [4, −2]]` → v₁ = (1 ; 2) — *espace propre*
  3. λ = 3 : A − 3I = `[[2, −2], [4, −4]]` → v₂ = (1 ; 1) — *espace propre*
  4. P = `[[1, 1], [2, 1]]`, D = diag(1, 3), P⁻¹ = `[[−1, 1], [2, −1]]` — *assembler*
  5. Contrôle : PDP⁻¹ = A — *vérifier*
- **Aides** : 1 « Une colonne de P par vecteur propre, dans l'ordre de D. » · 2 `P = [[1, □], [2, □]], D = diag(1, □)` · 3 P et D.
- **Variantes d'examen** : `coef` pᵢⱼ (colonnes normées, λ₁ < λ₂ : p₂₁ = 2/√5) ; `mcq` P ou D (distracteurs : `l_pd_order`, `l_pdp_inverse_side`, `l_charpoly_sign`). `tf` : « Si A est diagonalisable, ses valeurs propres sont distinctes » (faux : I) ; « Une matrice n × n à n valeurs propres distinctes est diagonalisable » (vrai) ; « Si A = PDP⁻¹, les colonnes de P sont des vecteurs propres de A » (vrai).
- **Pièges** : `l_pd_order`, `l_pdp_inverse_side`, `l_charpoly_sign`, `l_eigvec_row`.
- **Sous-buts → crédit** : polynôme → `l-eig-charpoly` ; espaces propres → `l-eig-space` ; assembler → `l-eig-diag` ; P⁻¹ → `l-mat-inverse`.

### `l-eig-diag-param` — Diagonalisable selon un paramètre ; multiplicités
- **Année** 13 · **Prérequis** `l-eig-diag`, `l-vs-rank` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-eig-diag` : diagonalisable ⇔ dim E_λ = multiplicité.
- **Statut** : fait le 10 novembre 2026 (étape U3). Niveau 5 en lignes libres, pas le QCM à quatre affirmations ; le vrai/faux 10 × 10 devient une 3 × 3 à valeur propre double.
- **Intro** : A est diagonalisable si et seulement si, pour chaque valeur propre, dim E_λ = multiplicité. dim E_λ = n − rang(A − λI). Avec un paramètre : on cherche les valeurs où deux valeurs propres se confondent, puis on teste le rang seulement là. Exemple : A = `[[1, 1, 0], [0, a, 0], [0, 0, 2]]` → diagonalisable si et seulement si a ≠ 1.
- **Juge** : `solset` `{v: 'a'}` pour les cas, `rowops` sur A − λI pour chaque cas critique, puis décision · **Forme finale** : ensemble des a pour lesquels A est diagonalisable.
- **Niveaux** :
  - L1 (guidé) : valeurs propres données en fonction de a ; tableau des cas à remplir.
  - L2 : l'élève choisit les valeurs critiques.
  - L3 (choisir l'action) : pour chaque cas critique, « calculer le rang de A − λI ».
  - L4 (libre) : 3 × 3 triangulaire ou par blocs avec un paramètre.
  - L5 (seul) : QCM 2018 Q24 (quatre affirmations sur b = ±1), sans aide.
- **Générateur** : matrices triangulaires ou triangulaires par blocs, valeurs propres affines en a, une case hors diagonale qui décide du rang au point critique (coefficient ±1, ±2 ou fonction de a). Gabarits : (a) « pour quels a ? » ; (b) QCM à quatre affirmations ; (c) vrai/faux sur les multiplicités.
- **Corrigé type** : A = `[[1, 1, 0], [0, a, 0], [0, 0, 2]]`.
  1. Valeurs propres 1, a, 2 (triangulaire) — *lire la diagonale*
  2. a ∉ {1 ; 2} : trois valeurs distinctes, diagonalisable — *cas général*
  3. a = 1 : A − I = `[[0, 1, 0], [0, 0, 0], [0, 0, 1]]`, rang 2, dim E₁ = 1 < 2 : pas diagonalisable — *cas critique*
  4. a = 2 : A − 2I = `[[−1, 1, 0], [0, 0, 0], [0, 0, 0]]`, rang 1, dim E₂ = 2 : diagonalisable — *cas critique*
  5. Diagonalisable si et seulement si a ≠ 1 — *conclure*
- **Aides** : 1 « Seules les valeurs de a où deux valeurs propres se confondent posent problème. » · 2 `a = 1 : rang(A − I) = □, dim E₁ = □` · 3 la conclusion.
- **Variantes d'examen** : `mcq` (distracteurs : `l_diag_distinct` (« une valeur double, donc non diagonalisable », qui exclut aussi a = 2), le cas a = 2 oublié). `tf` : « Une matrice 10 × 10 avec 9 valeurs propres distinctes n'est jamais diagonalisable » (faux : diag(1, 1, 2, …, 9)).
- **Pièges** : `l_diag_distinct`, `l_param_divide_zero`.
- **Sous-buts → crédit** : rang → `l-vs-rank` ; discuter → `l-eig-diag-param`.

### `l-eig-powers` — Puissances Aᵏ et récurrences linéaires
- **Année** 13 · **Prérequis** `l-eig-diag`, `g5-geom` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g5-geom` : λᵏ : chaque mode est une suite géométrique.
- **Statut** : fait le 10 novembre 2026 (étape U3). La variante A¹⁰⁰·x₀ n'est pas construite ; la variante `open` est un item en lignes sans aide (le problème de récurrence de 8 points).
- **Intro** : si A = PDP⁻¹, alors Aᵏ = PDᵏP⁻¹, avec Dᵏ = diag(λ₁ᵏ, …). Une récurrence u_{k+2} = a·u_{k+1} + b·u_k s'écrit x_{k+1} = Mx_k avec x_k = (u_{k+1} ; u_k) et M = `[[a, b], [1, 0]]`. On décompose x₀ sur les vecteurs propres : x_k = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂. Exemple : u_{k+2} = u_{k+1} + 6u_k → λ = 3 et −2.
- **Juge** : `factor` `{kind: 'PDP'}`, puis `equiv` `{vars: ['k'], domain: {k: 'N'}}` sur l'expression de Aᵏ ou de u_k (contrôle sur k = 0 à 6) · **Forme finale** : Aᵏ en fonction de k, ou u_k explicite.
- **Niveaux** :
  - L1 (guidé) : P, D, P⁻¹ données ; Dᵏ et le produit à trous.
  - L2 : l'élève choisit entre « PDᵏP⁻¹ » et « P⁻¹DᵏP » (refusé avec message).
  - L3 (choisir l'action) : récurrence → matrice → valeurs propres → coefficients.
  - L4 (libre) : Aᵏ pour une 2 × 2 ; u_k pour une récurrence d'ordre 2.
  - L5 (seul) : problème MT « récurrence » (voir les exemples de type examen), sans aide.
- **Générateur** : `pdp` 2 × 2 avec valeurs propres entières distinctes, |λ| ≤ 4 ; récurrences u_{k+2} = a u_{k+1} + b u_k avec racines entières distinctes de x² − ax − b ; conditions initiales entières. Gabarits : (a) Aᵏ ; (b) récurrence ; (c) A¹⁰⁰·x₀ (on n'écrit que la combinaison).
- **Corrigé type** : A = `[[5, −2], [4, −1]]` (diagonalisée dans `l-eig-diag`).
  1. Aᵏ = P·diag(1, 3ᵏ)·P⁻¹ — *formule*
  2. P·diag(1, 3ᵏ) = `[[1, 3ᵏ], [2, 3ᵏ]]` — *produit*
  3. Aᵏ = `[[2·3ᵏ − 1, 1 − 3ᵏ], [2·3ᵏ − 2, 2 − 3ᵏ]]` — *produit*
  4. Contrôle k = 1 : `[[5, −2], [4, −1]]` — *vérifier*
- **Aides** : 1 « Aᵏ = PDᵏP⁻¹ ; seule D est élevée à la puissance k. » · 2 `[[1, 3ᵏ], [2, 3ᵏ]]·[[−1, 1], [2, −1]]` · 3 la matrice.
- **Variantes d'examen** : `mcq` coefficient de Aᵏ (distracteurs : `l_powers_entrywise`, `l_pdp_inverse_side`). `open` : récurrence (8 points). `tf` : « Si A est diagonalisable, Aᵏ l'est » (vrai).
- **Pièges** : `l_powers_entrywise`, `l_pdp_inverse_side`, `l_pd_order`.
- **Sous-buts → crédit** : diagonaliser → `l-eig-diag` ; puissance → `l-eig-powers`.

### `l-eig-markov` — Chaînes de Markov à 2 états, état stationnaire
- **Année** 13 · **Prérequis** `l-eig-powers`, `@alg:J-hausse-baisse` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `@alg:J-hausse-baisse` : traduire les pourcentages qui restent ou changent d'état.
- **Statut** : fait le 10 novembre 2026 (étape U3). Vrai/faux : « toute matrice stochastique 2 × 2 a une limite indépendante de x₀ » (faux, contre-exemple).
- **Intro** : x_{k+1} = Mx_k, où M est stochastique : **chaque colonne** somme à 1 (colonne j = où vont ceux de l'état j). 1 est valeur propre ; le vecteur stationnaire q vérifie Mq = q et a des composantes de somme 1. Si l'autre valeur propre μ vérifie |μ| < 1, x_k → q quel que soit x₀. Exemple : 70 % des buveurs de café en reprennent, 40 % des autres s'y mettent → M = `[[7/10, 4/10], [3/10, 6/10]]`, q = (4/7 ; 3/7).
- **Juge** : `value` sur M, `eigvec` pour q puis `value` sur q normalisé ; `equiv` en k pour x_k · **Forme finale** : q (somme 1) et, si demandé, x_k.
- **Niveaux** :
  - L1 (guidé) : M à trous, avec un tableau « de → vers ».
  - L2 : l'élève choisit « colonnes » ou « lignes » pour la matrice.
  - L3 (choisir l'action) : M, puis (M − I)q = 0, puis normaliser.
  - L4 (libre) : x_k explicite avec la deuxième valeur propre.
  - L5 (seul) : problème du café (série MT 12) avec d'autres pourcentages : formule de x_k, limite, « dépend-elle de x₀ ? », sans aide.
- **Générateur** : probabilités de rester p, q en dixièmes, avec p + q ≠ 1 (sinon μ = 0) et μ = p + q − 1 ∈ {±0,1 ; ±0,2 ; ±0,3 ; 0,5} ; état initial en pourcentages. Gabarits : (a) café, vélo ou métro, météo ; (b) limite seulement ; (c) x_k explicite.
- **Corrigé type** : x₀ = (1/2 ; 1/2).
  1. M = `[[7/10, 4/10], [3/10, 6/10]]` — *traduire les pourcentages*
  2. (M − I)q = 0 : −(3/10)q₁ + (4/10)q₂ = 0 → q ∝ (4 ; 3) → q = (4/7 ; 3/7) — *état stationnaire*
  3. Autre valeur propre : tr M − 1 = 3/10, vecteur (1 ; −1) — *deuxième mode*
  4. x₀ = q − (1/14)(1 ; −1), donc x_k = (4/7 ; 3/7) − (1/14)(3/10)ᵏ(1 ; −1) — *décomposer x₀*
  5. À la longue, 4/7 ≈ 57 % boivent un café, quel que soit x₀ — *limite*
- **Aides** : 1 « Colonne j : ce que deviennent ceux qui sont dans l'état j. » · 2 `q = (□ ; □)/7` · 3 la conclusion.
- **Variantes d'examen** : `mcq` proportion limite (distracteurs : `l_markov_rows`, `l_markov_normalize`). `tf` : « La limite dépend de l'état initial » (faux si |μ| < 1).
- **Pièges** : `l_markov_rows`, `l_markov_normalize`.
- **Sous-buts → crédit** : traduire → `l-eig-markov` ; état stationnaire → `l-eig-space` ; x_k → `l-eig-powers`.

### `l-eig-complex` — Valeurs propres complexes, rotation et dilatation
- **Année** 13 · **Prérequis** `l-eig-charpoly`, `g8-algebraic`, `g8-polar` · **Étiquettes** `opt` · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `l-eig-charpoly` : polynôme caractéristique à Δ < 0 ; `g8-polar` : rapport √(a² + b²) et angle de la rotation.
- **Statut** : fait le 10 novembre 2026 (étape U3). Racines complexes par `poly` (factorisé sur ℂ) ; l'angle n'est demandé que s'il est usuel (π/2, π/4, 3π/4) ; les lignes « rapport et angle » créditent `l-eig-complex` tant que `g8-polar` n'existe pas.
- **Intro** : une matrice réelle 2 × 2 avec Δ < 0 a deux valeurs propres conjuguées a ± bi, et des vecteurs propres conjugués. Elle agit comme une rotation composée d'une dilatation de rapport √(a² + b²). Les valeurs propres **réelles** d'une matrice de permutation se trouvent parmi les racines de λⁿ = 1. Exemple : `[[1, −2], [1, 3]]` → λ² − 4λ + 5 → λ = 2 ± i, rapport √5.
- **Juge** : `complex` sur les valeurs propres ; `eigvec` `{A, λ, complex: true}` pour les vecteurs · **Forme finale** : valeurs propres, un vecteur propre, rapport et angle.
- **Niveaux** :
  - L1 (guidé) : polynôme donné, Δ et racines à trous.
  - L2 : l'élève choisit la ligne de A − λI à utiliser pour le vecteur propre.
  - L3 (choisir l'action) : valeur, vecteur, puis vecteur conjugué.
  - L4 (libre) : rapport et angle de la rotation-dilatation.
  - L5 (seul) : « l'ensemble des valeurs propres réelles de cette 4 × 4 est… » (2021 Q12, permutation cyclique), sans aide.
- **Générateur** : a, b entiers avec b ≠ 0, |a|, |b| ≤ 3 ; A = S·`[[a, −b], [b, a]]`·S⁻¹ avec S = `unimodular(2)`. Gabarits : (a) valeurs et vecteurs ; (b) rotation-dilatation ; (c) matrice de permutation.
- **Corrigé type** : A = `[[1, −2], [1, 3]]`.
  1. λ² − 4λ + 5 = 0, Δ = −4 → λ = 2 ± i — *polynôme*
  2. λ = 2 + i : A − λI = `[[−1 − i, −2], [1, 1 − i]]` → v = (−1 + i ; 1) — *vecteur propre*
  3. λ = 2 − i : v̄ = (−1 − i ; 1) — *conjuguer*
  4. |λ| = √5 : rotation composée d'une dilatation de rapport √5 — *interpréter*
- **Aides** : 1 « Prends la 2e ligne de A − λI : x₁ + (1 − i)x₂ = 0. » · 2 `v = (□ ; 1)` · 3 le vecteur.
- **Variantes d'examen** : `mcq` 2021 Q12 (distracteurs : {0}, {−1 ; 0}, {0 ; 1}, venant de `l_eigen_rref`). `tf` : « Toute matrice réelle 2 × 2 a une valeur propre réelle » (faux : rotation d'angle π/2).
- **Pièges** : `l_complex_conj_vec`, `l_eigen_rref`.
- **Sous-buts → crédit** : racines → `g8-algebraic` ; vecteur → `l-eig-complex`.

**Orthogonalité (Lay 6)**

### `l-orth-dot` — Produit scalaire, norme, distance, angle
- **Année** 13 · **Prérequis** `l-mat-product` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-mat-product` : u · v = uᵀv.
- **Statut** : fait le 10 novembre 2026 (étape U3). Niveau 3 : ‖v‖ est donnée ; niveau 4 : un paramètre, trouvé par `solset`, puis la distance.
- **Intro** : u · v = uᵀv ; ‖u‖ = √(u · u) ; dist(u, v) = ‖u − v‖ ; cos θ = u · v / (‖u‖‖v‖). u ⊥ v ⇔ u · v = 0 ⇔ ‖u + v‖ = ‖u − v‖ ⇔ ‖u + v‖² = ‖u‖² + ‖v‖² (Pythagore). Exemple : u = (1 ; 2 ; 2), v = (3 ; 0 ; −4) → u · v = −5, ‖u‖ = 3, ‖v‖ = 5, cos θ = −1/3.
- **Juge** : `value` (racines permises) · **Forme finale** : nombre exact simplifié, ou vecteur unitaire.
- **Niveaux** :
  - L1 (guidé) : produits terme à terme à trous.
  - L2 : l'élève choisit la formule (norme, distance, angle).
  - L3 (choisir l'action) : enchaîner (vecteur unitaire, puis angle).
  - L4 (libre) : ℝ⁴, avec un paramètre (« pour quel a u ⊥ v ? »).
  - L5 (seul) : vrai/faux sur les identités (2021 Q27) et un calcul de distance, sans aide.
- **Générateur** : vecteurs entiers à normes entières (triplets et quadruplets pythagoriciens : (1, 2, 2), (2, 3, 6), (1, 4, 8), (1, 2, 2, 4), (1, 1, 1, 1)…), produits scalaires non nuls. Gabarits : (a) calculs ; (b) orthogonalité avec paramètre ; (c) vrai/faux.
- **Corrigé type** : u = (1 ; 2 ; 2), v = (3 ; 0 ; −4).
  1. u · v = 3 + 0 − 8 = −5 — *produit scalaire*
  2. ‖u‖ = √9 = 3, ‖v‖ = √25 = 5 — *normes*
  3. cos θ = −5/15 = −1/3 ; dist(u, v) = ‖(−2 ; 2 ; 6)‖ = √44 = 2√11 — *angle et distance*
- **Aides** : 1 « Multiplie terme à terme, puis additionne. » · 2 `u · v = 3 + 0 + □` · 3 la valeur.
- **Variantes d'examen** : `mcq` (distracteurs : norme sans racine, `l_dot_no_sum`). `tf` : « Si ‖u + v‖ = ‖u − v‖, alors u ⊥ v » (vrai, 2021 Q27) ; « Si u ⊥ v et v ⊥ w, alors u ⊥ w » (faux : `vecFamily` `orthNotTransitive`).
- **Pièges** : `l_dot_no_sum`, `l_orth_transitive`.
- **Sous-buts → crédit** : produit scalaire → `l-orth-dot`.

### `l-orth-complement` — Complément orthogonal W⊥
- **Année** 13 · **Prérequis** `l-orth-dot`, `l-vs-kernel` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-orth-dot` : w · x = 0 pour chaque wᵢ.
- **Statut** : fait le 10 novembre 2026 (étape U3). Pas de ligne « contrôler par des produits scalaires » ; le vrai/faux « (Col A)⊥ = Ker A » a un contre-exemple 2 × 2.
- **Intro** : si W = Span{w₁, …, w_k}, alors W⊥ = Ker M, où M a pour **lignes** w₁ᵀ, …, w_kᵀ. dim W + dim W⊥ = n. (Col A)⊥ = Ker Aᵀ et (Lgn A)⊥ = Ker A. Exemple : W = Span{(1 ; 1 ; 0 ; 2), (0 ; 1 ; 1 ; −1)} ⊂ ℝ⁴ → W⊥ = Span{(1 ; −1 ; 1 ; 0), (−3 ; 1 ; 0 ; 1)}.
- **Juge** : `rowops` sur M, puis `span` `{basis: kernel(M), require: 'basis'}` · **Forme finale** : base de W⊥ ; toute base est acceptée.
- **Niveaux** :
  - L1 (guidé) : M posée (vecteurs en lignes), réduction à trous.
  - L2 : l'élève choisit « vecteurs en lignes » ou « en colonnes » (la seconde donne Ker de la mauvaise matrice : message).
  - L3 (choisir l'action) : réduire, paramétrer, contrôler par des produits scalaires.
  - L4 (libre) : W donné par une équation (W⊥ est alors la droite normale) ou par une base.
  - L5 (seul) : QCM 2021 Q16 (quatre bases proposées) ; ou W⊥ puis projection sur W⊥, sans aide.
- **Générateur** : on tire d'abord une base entière de W⊥ (`orthIntBasis` n'est pas nécessaire : on prend deux vecteurs entiers), puis W = Ker de la matrice de ces vecteurs, dont on donne une base entière. Gabarits : (a) base de W⊥ ; (b) W donné par une équation ; (c) (Col A)⊥ = Ker Aᵀ (révision 2017 Q4).
- **Corrigé type** : w₁ = (1 ; 1 ; 0 ; 2), w₂ = (0 ; 1 ; 1 ; −1).
  1. M = `[[1, 1, 0, 2], [0, 1, 1, −1]]` — *vecteurs en lignes*
  2. `L1 ← L1 − L2` : `[1, 0, −1, 3]` — *réduire*
  3. x₃ = s, x₄ = t : x = s(1 ; −1 ; 1 ; 0) + t(−3 ; 1 ; 0 ; 1) — *paramétrer*
  4. Contrôle : (1 ; −1 ; 1 ; 0) · w₁ = 0, (−3 ; 1 ; 0 ; 1) · w₂ = 0, etc. — *vérifier*
- **Aides** : 1 « x ∈ W⊥ ⇔ x · w₁ = 0 et x · w₂ = 0 : c'est un système homogène. » · 2 `x = s(1 ; □ ; 1 ; 0) + t(□ ; 1 ; 0 ; 1)` · 3 la base.
- **Variantes d'examen** : `mcq` (distracteurs : `l_ker_sign`, `l_perp_one_vector`). `tf` : « dim W + dim W⊥ = n » (vrai) ; « (Col A)⊥ = Ker A » (faux : c'est Ker Aᵀ ; `matOne` 3 × 2).
- **Pièges** : `l_ker_sign`, `l_perp_one_vector`, `l_matrix_rows_cols`.
- **Sous-buts → crédit** : réduire → `l-sys-rref` ; paramétrer → `l-vs-kernel` ; W⊥ → `l-orth-complement`.

### `l-orth-proj` — Projection orthogonale sur un sous-espace, distance
- **Année** 13 · **Prérequis** `l-orth-complement` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-orth-complement` : z = y − ŷ est dans W⊥.
- **Statut** : fait le 10 novembre 2026 (étape U3). Aux niveaux 4 et 5, la base non orthogonale a deux vecteurs ; le vrai/faux « proj_W est injective » utilise `mapWitness`.
- **Intro** : si {u₁, …, u_k} est une base **orthogonale** de W, proj_W y = Σ (y · uᵢ / uᵢ · uᵢ)·uᵢ. Alors y = ŷ + z avec z = y − ŷ ∈ W⊥, et dist(y, W) = ‖z‖. **Si la base n'est pas orthogonale, cette formule est fausse** : on orthogonalise d'abord (Gram-Schmidt). Exemple : W = Span{(1 ; 1 ; 1 ; 0), (1 ; −1 ; 0 ; 1)}, y = (3 ; 1 ; 2 ; 4) → ŷ = (4 ; 0 ; 2 ; 2).
- **Juge** : `value` sur les coefficients, puis sur ŷ et z ; contrôle z · uᵢ = 0 · **Forme finale** : ŷ, z et la distance.
- **Niveaux** :
  - L1 (guidé) : coefficients y · uᵢ / uᵢ · uᵢ à trous.
  - L2 : l'élève vérifie d'abord que la base est orthogonale (décision « oui / il faut Gram-Schmidt »).
  - L3 (choisir l'action) : projeter, puis décomposer, puis distance.
  - L4 (libre) : base non orthogonale (Gram-Schmidt d'abord) ou W donné par une équation (projeter sur la normale et soustraire).
  - L5 (seul) : « le point de W le plus proche de y est w = u + v : vrai ? » (2021 Q31) ; QCM 2019 Q20, 2018 Q2, sans aide.
- **Générateur** : `orthIntBasis(4, 2)`, coefficients de y sur les uᵢ entiers ou demi-entiers, plus une partie z ∈ W⊥ entière non nulle. Gabarits : (a) base orthogonale donnée ; (b) base non orthogonale ; (c) distance ; (d) vrai/faux sur un point proposé.
- **Corrigé type** : u₁ = (1 ; 1 ; 1 ; 0), u₂ = (1 ; −1 ; 0 ; 1), y = (3 ; 1 ; 2 ; 4).
  1. u₁ · u₂ = 0 : base orthogonale — *vérifier l'orthogonalité*
  2. y · u₁ / u₁ · u₁ = 6/3 = 2 ; y · u₂ / u₂ · u₂ = 6/3 = 2 — *coefficients*
  3. ŷ = 2u₁ + 2u₂ = (4 ; 0 ; 2 ; 2) — *projection*
  4. z = y − ŷ = (−1 ; 1 ; 0 ; 2), z · u₁ = z · u₂ = 0 ; dist(y, W) = √6 — *décomposer*
- **Aides** : 1 « La formule ne marche qu'avec une base orthogonale. » · 2 `ŷ = □·u₁ + □·u₂` · 3 ŷ.
- **Variantes d'examen** : `mcq` ŷ (distracteurs : `l_proj_nonorth`, `g4_proj_no_square` (division par ‖uᵢ‖ au lieu de ‖uᵢ‖²), z à la place de ŷ). `tf` : 2021 Q31 (vrai ou faux selon le tirage) ; « proj_W est injective » (faux, sauf W = ℝⁿ).
- **Pièges** : `l_proj_nonorth`, `g4_proj_no_square`.
- **Sous-buts → crédit** : coefficients → `l-orth-proj` ; vérifier → `l-orth-dot`.

### `l-orth-matrices` — Familles orthonormées et matrices orthogonales
- **Année** 13 · **Prérequis** `l-orth-dot`, `l-mat-inverse` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-mat-inverse` : U⁻¹ = Uᵀ.
- **Statut** : fait le 10 novembre 2026 (étape U3). Niveau 2 : U est toujours orthogonale (pas de colonne modifiée) ; niveau 4 : compléter une famille de ℝ³ ou de ℝ⁴.
- **Intro** : U (n × n) est orthogonale si ses colonnes sont orthonormées, c'est-à-dire UᵀU = I. Alors U⁻¹ = Uᵀ, ses lignes sont aussi orthonormées, ‖Ux‖ = ‖x‖, (Ux) · (Uy) = x · y, det U = ±1, et ses valeurs propres réelles valent ±1. **Des colonnes orthogonales mais non normées ne suffisent pas.** Exemple : U = (1/3)·`[[1, 2, 2], [2, 1, −2], [2, −2, 1]]` → UᵀU = I, det U = −1.
- **Juge** : `value` sur UᵀU, U⁻¹ ; items `tf` · **Forme finale** : décision et matrice demandée.
- **Niveaux** :
  - L1 (guidé) : produits scalaires des colonnes à trous.
  - L2 : l'élève choisit le test (colonnes orthonormées ou UᵀU = I).
  - L3 (choisir l'action) : tester, puis inverser par transposition, puis résoudre Ux = b.
  - L4 (libre) : compléter une famille orthonormée en une base orthonormée.
  - L5 (seul) : QCM 2019 Q5 (« laquelle n'est pas forcément vraie ») et vrai/faux, sans aide.
- **Générateur** : `orthRational(3)` ; leurres : colonnes orthogonales non normées (2U), ou une colonne modifiée. Gabarits : (a) est-elle orthogonale ? ; (b) inverse ; (c) compléter ; (d) vrai/faux.
- **Corrigé type** : U = (1/3)·`[[1, 2, 2], [2, 1, −2], [2, −2, 1]]`.
  1. c₁ · c₂ = (2 + 2 − 4)/9 = 0, c₁ · c₃ = 0, c₂ · c₃ = 0 ; chaque ‖cᵢ‖² = 9/9 = 1 — *colonnes orthonormées*
  2. U⁻¹ = Uᵀ = U (U est symétrique) — *inverse*
  3. Ux = (1 ; 1 ; 1) ⇒ x = Uᵀ(1 ; 1 ; 1) = (5/3 ; 1/3 ; 1/3) — *résoudre sans Gauss*
- **Aides** : 1 « Teste UᵀU = I : produits scalaires des colonnes. » · 2 `c₁ · c₂ = (□ + □ − □)/9` · 3 la conclusion.
- **Variantes d'examen** : `mcq` 2019 Q5 (distracteur : « det A = 1 », qui n'est pas forcément vrai). `tf` : « Une matrice orthogonale a un déterminant égal à 1 » (faux : `matOne` `detMinus1Orth`) ; « Si les colonnes de A sont orthogonales, A⁻¹ = Aᵀ » (faux : `matOne` `orthCols`) ; « Le produit de deux matrices orthogonales est orthogonal » (vrai).
- **Pièges** : `l_orth_cols_only`, `l_orth_det_one`.
- **Sous-buts → crédit** : produits scalaires → `l-orth-dot` ; inverse → `l-orth-matrices`.

### `l-orth-gs` — Gram-Schmidt
- **Année** 13 · **Prérequis** `l-orth-proj` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U3). Chaque vecteur dans une partie `mat` (pour nommer les pièges), la liste finale par `span` ; le gabarit orthonormé seulement aux niveaux 4 et 5 ; le gabarit « colonnes d'une matrice » est laissé à QR.
- **Intro** : v₁ = x₁ ; v₂ = x₂ − (x₂ · v₁ / v₁ · v₁)v₁ ; v₃ = x₃ − (x₃ · v₁ / v₁ · v₁)v₁ − (x₃ · v₂ / v₂ · v₂)v₂. On projette sur les **vᵢ déjà obtenus**, pas sur les xᵢ. On peut multiplier un vᵢ par un nombre pour enlever les fractions. Span{v₁, …, v_k} = Span{x₁, …, x_k} à chaque étape. Exemple : x₂ = (4 ; 1 ; 1 ; 1), v₁ = (1 ; 1 ; 0 ; 1) → x₂ · v₁ / v₁ · v₁ = 6/3 = 2 → v₂ = (2 ; −1 ; 1 ; −1).
- **Juge** : `span` `{basis: [x₁ … x_k], require: 'orthogonal', nested: true}` (chaque vⱼ est orthogonal aux précédents et Span{v₁ … vⱼ} = Span{x₁ … xⱼ} ; voir les lacunes) ; les lignes de coefficients sont jugées par `value` · **Forme finale** : base orthogonale dans l'ordre ; orthonormée si demandé.
- **Niveaux** :
  - L1 (guidé) : produits scalaires et coefficients à trous.
  - L2 : l'élève choisit sur quoi projeter (v₁ ou x₁).
  - L3 (choisir l'action) : un vecteur à la fois ; « mettre à l'échelle » proposé.
  - L4 (libre) : 3 vecteurs de ℝ⁴, sans normaliser.
  - L5 (seul) : QCM « v₃ = x₃ + a·v₁ + b·v₂ » (2018 Q4) ou chaîne de 3 QCM (voir les exemples de type examen), sans aide.
- **Générateur** : `orthIntBasis(4, 3)` puis `gsReverse` : les coefficients de projection sont des entiers cᵢⱼ ∈ {−2, …, 2}, au moins un non nul par vecteur. Gabarits : (a) base orthogonale ; (b) base orthonormée ; (c) un seul coefficient ; (d) colonnes d'une matrice (2021 Q13).
- **Corrigé type** : x₁ = (1 ; 1 ; 0 ; 1), x₂ = (4 ; 1 ; 1 ; 1), x₃ = (−1 ; 3 ; −1 ; 1).
  1. v₁ = x₁, v₁ · v₁ = 3 — *premier vecteur*
  2. x₂ · v₁ = 6 → v₂ = x₂ − 2v₁ = (2 ; −1 ; 1 ; −1), v₂ · v₂ = 7 — *projeter sur v₁*
  3. x₃ · v₁ = 3, x₃ · v₂ = −7 → v₃ = x₃ − 1·v₁ + 1·v₂ — *projeter sur v₁ et v₂*
  4. v₃ = (0 ; 1 ; 0 ; −1) ; contrôle v₃ · v₁ = v₃ · v₂ = 0 — *vérifier*
- **Aides** : 1 « Retire de x₃ ses projections sur v₁ et sur v₂ (pas sur x₁, x₂). » · 2 `v₃ = x₃ − (□/3)v₁ − (□/7)v₂` · 3 v₃.
- **Variantes d'examen** : `mcq` v₃ ou un coefficient (distracteurs : `g4_proj_no_square`, `l_gs_use_x`, `l_gs_sign`). `tf` : « Gram-Schmidt transforme toute base de ℝ³ en la base canonique » (faux, série MT 12) ; « Appliqué à une base d'un plan W, il donne une base orthogonale de W » (vrai).
- **Pièges** : `g4_proj_no_square`, `l_gs_use_x`, `l_gs_sign`.
- **Sous-buts → crédit** : projeter → `l-orth-proj` ; soustraire → `l-orth-gs` ; vérifier → `l-orth-dot`.

### `l-orth-qr` — Factorisation QR
- **Année** 13 · **Prérequis** `l-orth-gs`, `l-orth-matrices` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U3). Pas de gabarit « résoudre Rx = Qᵀb » ; niveau 5 : un coefficient (souvent r₃₃).
- **Intro** : si les colonnes de A sont libres, A = QR, où Q a des colonnes orthonormées (Gram-Schmidt normalisé) et R est triangulaire supérieure à diagonale positive. R = QᵀA : rᵢⱼ = qᵢ · xⱼ, et rᵢᵢ = ‖vᵢ‖. Exemple : si v₃ = (1 ; 1 ; −1 ; −1), alors r₃₃ = ‖v₃‖ = 2.
- **Juge** : `factor` `{A, kind: 'QR'}` (Q à colonnes orthonormées, R triangulaire à diagonale > 0, QR = A) · **Forme finale** : Q et R ; `askCoef` rᵢⱼ au format examen.
- **Niveaux** :
  - L1 (guidé) : Gram-Schmidt fait ; normes et rᵢⱼ à trous.
  - L2 : l'élève choisit la formule de rᵢⱼ (qᵢ · xⱼ, ou le coefficient de Gram-Schmidt multiplié par ‖vᵢ‖).
  - L3 (choisir l'action) : Gram-Schmidt, normaliser, R = QᵀA.
  - L4 (libre) : 4 × 3 complète.
  - L5 (seul) : seulement r₃₃ (2021 Q15), au bout de la chaîne de QCM, sans aide.
- **Générateur** : `orthIntBasis(4, 3)` avec des normes entières (vecteurs à coefficients ±1 de norme 2, ou de norme 3, 5) puis `gsReverse` : R est entière. Gabarits : (a) Q et R ; (b) un coefficient de R ; (c) résoudre Ax = b par Rx = Qᵀb.
- **Corrigé type** : colonnes x₁ = (1 ; 1 ; 1 ; 1), x₂ = (2 ; 0 ; 2 ; 0), x₃ = (2 ; 4 ; 0 ; 2).
  1. v₁ = x₁ ; v₂ = x₂ − (4/4)v₁ = (1 ; −1 ; 1 ; −1) — *Gram-Schmidt*
  2. v₃ = x₃ − (8/4)v₁ − (−4/4)v₂ = (1 ; 1 ; −1 ; −1) — *Gram-Schmidt*
  3. ‖v₁‖ = ‖v₂‖ = ‖v₃‖ = 2 ; Q = [v₁/2, v₂/2, v₃/2] — *normaliser*
  4. R = QᵀA = `[[2, 2, 4], [0, 2, −2], [0, 0, 2]]` ; r₃₃ = 2 — *R = QᵀA*
- **Aides** : 1 « Les cases diagonales de R sont les normes des vᵢ. » · 2 `r₂₃ = q₂ · x₃ = □` · 3 R.
- **Variantes d'examen** : `coef` rᵢⱼ ; `mcq` r₃₃ (distracteurs : `l_qr_r_from_gs`, ‖v₃‖², ‖x₃‖). `tf` : « Si A = QR, alors R = QᵀA » (vrai) ; « Les cases diagonales de R peuvent être nulles quand A a des colonnes libres » (faux).
- **Pièges** : `l_qr_r_from_gs`, `g4_proj_no_square`.
- **Sous-buts → crédit** : Gram-Schmidt → `l-orth-gs` ; normaliser → `l-orth-matrices` ; R → `l-orth-qr`.

### `l-orth-lsq` — Moindres carrés
- **Année** 13 · **Prérequis** `l-orth-proj`, `l-mat-inverse` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `l-orth-proj` : Ax̂ est la projection de b sur Col A ; `l-mat-inverse` : x̂ = (AᵀA)⁻¹Aᵀb pour les petits cas.
- **Statut** : fait le 10 novembre 2026 (étape U3). `l_lsq_line_swap` se lit sur x̂ = (β₀ ; β₁), sans ligne « y = … » ; pas de distracteur AAᵀ quand les tailles ne le permettent pas.
- **Intro** : si Ax = b n'a pas de solution, on cherche x̂ qui minimise ‖b − Ax‖. x̂ est solution des **équations normales** AᵀAx = Aᵀb. Si les colonnes de A sont libres, x̂ est unique. Droite y = β₀ + β₁x : A a une colonne de 1 et une colonne des x. Exemple : points (0 ; 2), (1 ; 1), (2 ; 2), (3 ; 5) → AᵀA = `[[4, 6], [6, 14]]`, Aᵀb = (10 ; 20) → y = 1 + x.
- **Juge** : `value` sur AᵀA et Aᵀb, puis `rowops` sur [AᵀA | Aᵀb] ; contrôle Aᵀ(b − Ax̂) = 0 · **Forme finale** : x̂ ; `askCoef` x̂₁ au format examen.
- **Niveaux** :
  - L1 (guidé) : AᵀA et Aᵀb à trous, système 2 × 2 guidé.
  - L2 : l'élève choisit entre « résoudre Ax = b » (refusé : incompatible) et « équations normales ».
  - L3 (choisir l'action) : poser A et b à partir des points, puis normales, puis résoudre.
  - L4 (libre) : A 4 × 3 (2018 Q23) ; erreur ‖b − Ax̂‖.
  - L5 (seul) : seulement x₁ (2021 Q11) ou la droite de régression de 5 points (2021 Q1), sans aide.
- **Générateur** : `lsqReverse(A, x̂)` avec A 4 × 2 ou 5 × 2 (colonne de 1 pour les droites) ou 4 × 3 ; x̂ entier ou en demis ; r ∈ Ker Aᵀ à coefficients dans [−2 ; 2]. Gabarits : (a) matrice et b ; (b) points et droite ; (c) un coefficient ; (d) vrai/faux (2019 Q11, 2018 Q19).
- **Corrigé type** : A = `[[1, 0], [1, 1], [1, 2], [1, 3]]`, b = (2 ; 1 ; 2 ; 5).
  1. AᵀA = `[[4, 6], [6, 14]]`, Aᵀb = (10 ; 20) — *équations normales*
  2. `[[4, 6 | 10], [6, 14 | 20]]` → `L2 ← L2 − (3/2)L1` : `[0, 5 | 5]` — *réduire*
  3. x̂₂ = 1, x̂₁ = (10 − 6)/4 = 1 : x̂ = (1 ; 1), droite y = 1 + x — *résoudre*
  4. b − Ax̂ = (1 ; −1 ; −1 ; 1), orthogonal aux colonnes ; erreur 2 — *vérifier*
- **Aides** : 1 « Multiplie Ax = b à gauche par Aᵀ. » · 2 `AᵀA = [[4, □], [□, 14]]` · 3 x̂.
- **Variantes d'examen** : `coef` x̂ᵢ ; `mcq` (distracteurs : `l_lsq_square_subsystem`, `l_lsq_line_swap`, `l_lsq_normal_aat`). `tf` : « Si w résout AᵀAx = Aᵀb, alors ‖b − Aw‖ ≤ ‖b − Au‖ pour tout u » (vrai, 2019 Q11) ; « AᵀA est toujours inversible » (faux : `matOne` `singularAtA`) ; « Si x̂ et x̃ sont deux solutions aux moindres carrés, Ax̂ = Ax̃ » (vrai, 2018 Q19).
- **Pièges** : `l_lsq_square_subsystem`, `l_lsq_line_swap`, `l_lsq_normal_aat`.
- **Sous-buts → crédit** : équations normales → `l-orth-lsq` ; réduire → `l-sys-rref` ; vérifier → `l-orth-complement`.

### `l-orth-inner` — Produits scalaires non standards
- **Année** 13 · **Prérequis** `l-orth-proj`, `l-vs-coords` · **Étiquettes** `MT` · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `l-vs-coords` : produit scalaire sur Pₙ calculé sur les coefficients.
- **Statut** : fait le 10 novembre 2026 (étape U3). Pas de gabarit M₂ₓ₂ ; niveau 1 : la ligne des produits plutôt qu'un tableau de valeurs ; projection et Gram-Schmidt sur (1, t, t²) partent de la formule, produits scalaires déjà calculés.
- **Intro** : un produit scalaire est symétrique, linéaire en chaque argument, et défini positif (⟨u, u⟩ > 0 si u ≠ 0). Exemples : ⟨u, v⟩ = uᵀAᵀAv (produit scalaire si et seulement si A est inversible) ; ⟨p, q⟩ = p(−1)q(−1) + p(0)q(0) + p(1)q(1) sur P₂ ; ⟨A, B⟩ = Σ aᵢⱼbᵢⱼ = tr(AᵀB) sur M₂ₓ₂. Les formules de projection et de Gram-Schmidt restent les mêmes, avec ce produit. Exemple : ⟨1 + t, t²⟩ = 0·1 + 1·0 + 2·1 = 2.
- **Juge** : `value` ; décision et `example` pour les axiomes · **Forme finale** : nombre, projection, ou décision.
- **Niveaux** :
  - L1 (guidé) : tableau des valeurs p(−1), p(0), p(1), q(…) à remplir, puis somme.
  - L2 : l'élève choisit l'axiome qui tombe (souvent : défini positif).
  - L3 (choisir l'action) : norme, orthogonalité, projection sur Span{1, t}.
  - L4 (libre) : Gram-Schmidt sur (1, t, t²) avec ce produit, ou base orthogonale de M₂ₓ₂.
  - L5 (seul) : « ⟨u, v⟩ = uᵀAᵀAv est-il un produit scalaire ? » avec A singulière (contre-exemple), puis une projection, sans aide.
- **Générateur** : points d'évaluation dans {−2, −1, 0, 1, 2}, polynômes de degré ≤ 2 à coefficients dans [−2 ; 2] ; matrices A 2 × 2 entières, singulières une fois sur deux. Gabarits : (a) évaluation ; (b) axiomes ; (c) projection ; (d) M₂ₓ₂ (série MT 13, ex. 7).
- **Corrigé type** : ⟨p, q⟩ = p(−1)q(−1) + p(0)q(0) + p(1)q(1) sur P₂, projeter q = t² sur Span{1, t}.
  1. ⟨1, t⟩ = −1 + 0 + 1 = 0 : base orthogonale — *vérifier l'orthogonalité*
  2. ⟨t², 1⟩ = 1 + 0 + 1 = 2, ⟨1, 1⟩ = 3 ; ⟨t², t⟩ = −1 + 0 + 1 = 0 — *produits*
  3. proj = (2/3)·1 + 0·t = 2/3 — *projection*
- **Aides** : 1 « Calcule les valeurs aux points, puis applique la formule de projection. » · 2 `proj = (□/3)·1 + (□/2)·t` · 3 la projection.
- **Variantes d'examen** : `mcq` une valeur ou une projection. `tf` : « ⟨u, v⟩ = uᵀAᵀAv est un produit scalaire pour toute matrice A » (faux : `matOne` A singulière et u ∈ Ker A, u ≠ 0).
- **Pièges** : `l_inner_positivity`, `l_proj_nonorth`.
- **Sous-buts → crédit** : évaluer → `l-orth-inner` ; projection → `l-orth-proj`.

**Matrices symétriques, formes quadratiques, SVD (Lay 7.1, 7.2, 7.4)**

### `l-sym-orthodiag` — Diagonalisation orthogonale A = QDQᵀ
- **Année** 13 · **Prérequis** `l-eig-diag`, `l-orth-gs`, `l-orth-matrices` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `l-eig-diag` : même calcul de P et D, puis normalisation.
- **Statut** : fait le 10 novembre 2026 (étape U3). La variante `open` (exemple d'examen 4) donne directement le polynôme factorisé et réunit (d) et (e) ; elle vaut 14 points (cette entrée disait 12, l'exemple 14). Le vrai/faux 2021 Q21 devient un énoncé général (contre-exemple `matOne` `diagNotSym`).
- **Intro** : A est diagonalisable en base orthonormée si et seulement si A est symétrique (théorème spectral). Les espaces propres sont orthogonaux entre eux ; dans un espace propre de dimension ≥ 2, on applique Gram-Schmidt ; puis on normalise. Q = [u₁ … uₙ], D dans le même ordre, A = QDQᵀ = Σ λᵢuᵢuᵢᵀ. Exemple : A = `[[11, −12], [−12, 4]]` → λ = −5 avec (3 ; 4)/5, λ = 20 avec (4 ; −3)/5.
- **Juge** : `poly`, `eigvec`, `span` `{require: 'orthonormal'}` par espace propre, puis `factor` `{A, kind: 'orthodiag'}` · **Forme finale** : Q orthogonale et D ; `askCoef` qᵢⱼ avec convention (ordre des λ, signe de la première composante) au format examen.
- **Niveaux** :
  - L1 (guidé) : valeurs propres données ; vecteurs, normes et Q à trous (2 × 2 pythagoricienne).
  - L2 : l'élève décide s'il faut Gram-Schmidt (espace propre de dimension 2) ou seulement normaliser.
  - L3 (choisir l'action) : polynôme, espaces propres, Gram-Schmidt, normaliser, assembler.
  - L4 (libre) : 3 × 3 avec une valeur propre double.
  - L5 (seul) : orthodiagonalisation d'une 4 × 4 de la forme cI + nnᵀ (partie spécifique MT 2016) ; ou retrouver A à partir de ses vecteurs propres (2021 Q3), sans aide.
- **Générateur** : A = QDQᵀ avec Q = `orthRational(n)` (2 × 2 pythagoriciennes, 3 × 3 de la table) et D entière ; ou A = cI + k·nnᵀ avec n entier (valeur propre c de multiplicité n − 1) ; ou A = J − I et ses variantes ([[1, 2, 2], [2, 1, 2], [2, 2, 1]]). Gabarits : (a) orthodiagonaliser ; (b) Q seulement, avec convention (2019 Q10, 2018 Q18) ; (c) retrouver A (2021 Q3) ; (d) spectre de A = Σ λᵢvᵢvᵢᵀ (2018 Q11).
- **Corrigé type** : A = `[[1, 2, 2], [2, 1, 2], [2, 2, 1]]`.
  1. Chaque ligne de A somme à 5 : A(1 ; 1 ; 1) = 5(1 ; 1 ; 1). A + I = `[[2, 2, 2], [2, 2, 2], [2, 2, 2]]` est de rang 1 : λ = −1 est double, d'espace propre x₁ + x₂ + x₃ = 0 — *valeurs et espaces propres*
  2. E₋₁ = Span{(1 ; −1 ; 0), (1 ; 0 ; −1)} — *base de l'espace propre*
  3. Gram-Schmidt : (1 ; 0 ; −1) − ½(1 ; −1 ; 0) = (½ ; ½ ; −1) ∝ (1 ; 1 ; −2) — *orthogonaliser*
  4. Q = [(1 ; 1 ; 1)/√3, (1 ; −1 ; 0)/√2, (1 ; 1 ; −2)/√6], D = diag(5, −1, −1) — *normaliser, assembler*
- **Aides** : 1 « Vecteurs propres de valeurs différentes : déjà orthogonaux. Dans un même espace propre : Gram-Schmidt. » · 2 `u₃ = (1 ; 1 ; □)/√□` · 3 Q et D.
- **Variantes d'examen** : `mcq` Q ou A (distracteurs : `l_orthodiag_no_normalize`, `l_orthodiag_no_gs`, `l_pd_order`). `coef` qᵢⱼ. `tf` : « `[[10, −11, 11], [11, 11, −11], [−11, 11, 10]]` est diagonalisable en base orthonormée » (faux : pas symétrique, 2021 Q21) ; « Une matrice symétrique a des valeurs propres réelles » (vrai). `open` : 4 × 4 MT (12 points, voir les exemples de type examen).
- **Pièges** : `l_orthodiag_no_normalize`, `l_orthodiag_no_gs`, `l_pd_order`, `l_sym_needed`.
- **Sous-buts → crédit** : polynôme → `l-eig-charpoly` ; espaces propres → `l-eig-space` ; Gram-Schmidt → `l-orth-gs` ; normaliser → `l-orth-matrices` ; assembler → `l-sym-orthodiag`.

### `l-sym-quadform` — Formes quadratiques et axes principaux
- **Année** 13 · **Prérequis** `l-sym-orthodiag` · **Étiquettes** `MT` · **Optionnelle** non · **Poids d'examen** 0
- **Statut** : fait le 10 novembre 2026 (étape U3). Variables x, y (z) → X, Y (Z) au lieu de x₁, x₂ → y₁, y₂ (les indices ne se distinguent pas dans l'évaluation numérique) ; niveau 5 : pour une hyperbole, seulement la distance au sommet.
- **Intro** : Q(x) = xᵀAx avec A symétrique : le coefficient de xᵢ² va en aᵢᵢ, et **la moitié** du coefficient de xᵢxⱼ va en aᵢⱼ et en aⱼᵢ. Avec x = Py (P orthogonale, colonnes = vecteurs propres), Q = λ₁y₁² + … + λₙyₙ² : les colonnes de P sont les axes principaux. Q est définie positive si toutes les λᵢ > 0, indéfinie si deux signes apparaissent. Exemple : Q = 5x₁² − 4x₁x₂ + 8x₂² → A = `[[5, −2], [−2, 8]]`, λ = 4 et 9 → Q = 4y₁² + 9y₂².
- **Juge** : `value` sur A, puis comme `l-sym-orthodiag`, puis `equiv` `{vars: ['y₁', 'y₂']}` sur la forme réduite · **Forme finale** : P, forme sans termes croisés, nature.
- **Niveaux** :
  - L1 (guidé) : A à trous (cases hors diagonale).
  - L2 : l'élève choisit entre « coefficient entier » et « moitié » pour aᵢⱼ.
  - L3 (choisir l'action) : matrice, valeurs propres, P, forme réduite, nature.
  - L4 (libre) : 3 × 3 : Q = 2(x₁² + x₂² + x₃²) + 2(x₁x₂ + x₁x₃ + x₂x₃) (variante de la série MT 13).
  - L5 (seul) : courbe de niveau Q = c : ellipse ou hyperbole, longueurs des demi-axes, sans aide.
- **Générateur** : A = QDQᵀ (`orthRational(2)` ou table 3 × 3), D avec des valeurs entières non nulles ; une fois sur trois, valeurs de signes opposés. Gabarits : (a) matrice de Q ; (b) changement de variable ; (c) nature ; (d) courbe de niveau.
- **Corrigé type** : Q = 5x₁² − 4x₁x₂ + 8x₂².
  1. A = `[[5, −2], [−2, 8]]` — *matrice de la forme*
  2. λ² − 13λ + 36 = (λ − 4)(λ − 9) — *valeurs propres*
  3. λ = 4 : (2 ; 1)/√5 ; λ = 9 : (−1 ; 2)/√5 ; P = (1/√5)·`[[2, −1], [1, 2]]` — *axes principaux*
  4. x = Py ⇒ Q = 4y₁² + 9y₂², définie positive — *forme réduite, nature*
  5. Q = 36 : ellipse de demi-axes 3 (selon (2 ; 1)) et 2 (selon (−1 ; 2)) — *courbe de niveau*
- **Aides** : 1 « Le coefficient de x₁x₂ se partage entre a₁₂ et a₂₁. » · 2 `A = [[5, □], [□, 8]]` · 3 la forme réduite.
- **Variantes d'examen** : `mcq` matrice ou nature (distracteurs : `l_quadform_offdiag`). `tf` : « 2xy + z² = 1 est un ellipsoïde » (faux, série MT 13 : indéfinie) ; « Q est définie positive si les coefficients diagonaux de A sont positifs » (faux : `matOne` `symNotPD`).
- **Pièges** : `l_quadform_offdiag`, `l_posdef_diag`.
- **Sous-buts → crédit** : matrice → `l-sym-quadform` ; orthodiagonaliser → `l-sym-orthodiag`.

### `l-svd-compute` — Décomposition en valeurs singulières à la main
- **Année** 13 · **Prérequis** `l-sym-orthodiag`, `l-vs-rank` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-vs-rank` : nombre de σᵢ non nuls = rang.
- **Statut** : fait le 10 novembre 2026 (étape U3). La variante `open` (exemple d'examen 3) porte sur une 2 × 4 tirée au hasard, avec (e) réuni à U, Σ, V ; « U et V sont uniques » est remplacé par deux énoncés faux à contre-exemple vérifiable.
- **Intro** : A (m × n) = UΣVᵀ. Les vᵢ sont des vecteurs propres orthonormés de AᵀA ; σᵢ = √λᵢ (dans l'ordre décroissant) ; pour σᵢ ≠ 0, **uᵢ = Avᵢ/σᵢ** ; on complète U et V en bases orthonormées (par Ker A et Ker Aᵀ). Le rang de A est le nombre de σᵢ non nuls. Si m < n, on peut chercher les valeurs propres non nulles sur AAᵀ, plus petite. Exemple : A = `[[4, 5, 2], [0, 3, 6]]` → σ₁ = 6√2, σ₂ = 3√2.
- **Juge** : `poly`, `eigvec`, `span` `{require: 'orthonormal'}`, `value` (σᵢ), puis `factor` `{A, kind: 'SVD'}` · **Forme finale** : U, Σ, V ; `askCoef` (σ₂, ou un coefficient de U ou de V avec convention de signe) au format examen.
- **Niveaux** :
  - L1 (guidé) : AᵀA donnée, valeurs propres données ; vᵢ, σᵢ et uᵢ à trous.
  - L2 : l'élève choisit AᵀA ou AAᵀ pour les valeurs propres (les deux justes ; la plus petite est `quality: 'good'`).
  - L3 (choisir l'action) : enchaîner AᵀA, valeurs propres, V, Σ, U.
  - L4 (libre) : A 2 × 3 ou 3 × 2 complète, avec complétion de U ou de V.
  - L5 (seul) : le problème de 14 points (voir les exemples de type examen), sauvegardé à chaque ligne.
- **Générateur** : `svdReverse` : U de la table 2 × 2 (colonnes (1 ; 1)/√2, (1 ; −1)/√2 ou pythagoriciennes), V à colonnes (1 ; 2 ; 2)/3, (2 ; 1 ; −2)/3, (2 ; −2 ; 1)/3 (et permutations), σᵢ multiples de √2, de 3 ou de 5 pour que A = UΣVᵀ soit entière, coefficients ≤ 9. Gabarits : (a) SVD complète ; (b) valeurs singulières seulement ; (c) rang, bases de Col A et de Ker A lues sur la SVD ; (d) SVD de A⁻¹ ou de Aᵀ (série GM 14, ex. 5).
- **Corrigé type** : A = `[[4, 5, 2], [0, 3, 6]]`.
  1. AAᵀ = `[[45, 27], [27, 45]]`, valeurs propres 72 et 18 ; AᵀA a en plus la valeur propre 0 — *valeurs propres*
  2. σ₁ = √72 = 6√2, σ₂ = √18 = 3√2 — *valeurs singulières*
  3. AᵀA = `[[16, 20, 8], [20, 34, 28], [8, 28, 40]]` : v₁ = (1 ; 2 ; 2)/3, v₂ = (2 ; 1 ; −2)/3, v₃ = (2 ; −2 ; 1)/3 (Ker A) — *V*
  4. u₁ = Av₁/σ₁ = (6 ; 6)/(6√2) = (1 ; 1)/√2 ; u₂ = Av₂/σ₂ = (3 ; −3)/(3√2) = (1 ; −1)/√2 — *U*
  5. A = UΣVᵀ avec Σ = `[[6√2, 0, 0], [0, 3√2, 0]]` — *assembler*
- **Aides** : 1 « V vient de AᵀA ; U se calcule par uᵢ = Avᵢ/σᵢ. » · 2 `u₁ = A·(1 ; 2 ; 2)/3 / □` · 3 U.
- **Variantes d'examen** : `mcq` σᵢ ou U (distracteurs : `l_svd_sigma_is_eig`, `l_svd_no_sigma`, `l_svd_uv_swap`). `tf` : « A est inversible si et seulement si elle a n valeurs singulières non nulles » (vrai, série GM 14) ; « U et V sont uniques » (faux : signes) ; « Σ est unique » (vrai). `open` : 14 points.
- **Pièges** : `l_svd_sigma_is_eig`, `l_svd_no_sigma`, `l_svd_uv_swap`, `l_orthodiag_no_normalize`.
- **Sous-buts → crédit** : AᵀA → `l-mat-product` ; valeurs propres → `l-eig-charpoly` ; V → `l-sym-orthodiag` ; U → `l-svd-compute`.

### `l-svd-sphere` — Image de la sphère unité
- **Année** 13 · **Prérequis** `l-svd-compute`, `l-sym-quadform` · **Étiquettes** `MT` · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `l-sym-quadform` : l'image est l'ellipse xᵀ(AAᵀ)⁻¹x = 1 et ses axes principaux.
- **Statut** : fait le 10 novembre 2026 (étape U3). Pas d'esquisse (type `plot` à l'étape U5) : le niveau 4 est en lignes libres ; seulement des images de rang plein (pas de segment).
- **Intro** : l'image de la sphère unité par A est un ellipsoïde (une ellipse dans ℝ²) d'axes les uᵢ et de demi-axes les σᵢ. Si le rang est plus petit que la dimension de départ, l'image est **pleine** (ellipse pleine, ou segment) : des points de la sphère s'écrasent à l'intérieur. Exemple : A 2 × 3 de rang 2, σ = 6√2 et 3√2 → l'image de la sphère de ℝ³ est l'ellipse pleine de demi-axes 6√2 selon (1 ; 1) et 3√2 selon (1 ; −1).
- **Juge** : `mcq` et `plot` (`task: 'conic'`) pour l'esquisse ; `value` sur les demi-axes · **Forme finale** : description (axes, demi-axes, pleine ou non).
- **Niveaux** :
  - L1 (guidé) : SVD donnée ; demi-axes et directions à remplir.
  - L2 : l'élève choisit « ellipse » ou « ellipse pleine » selon le rang et les tailles.
  - L3 (choisir l'action) : SVD, puis description.
  - L4 (libre) : esquisse sur le repère interactif.
  - L5 (seul) : SVD et image pour A 2 × 3 (série MT 14, ex. 2) ou A 4 × 5 creuse (ex. 3), sans aide.
- **Générateur** : comme `l-svd-compute` ; tailles 2 × 2 (image = ellipse), 2 × 3 (ellipse pleine), 3 × 2 (ellipse plate dans un plan de ℝ³). Gabarits : (a) description ; (b) esquisse ; (c) QCM.
- **Corrigé type** : A = `[[4, 5, 2], [0, 3, 6]]` (SVD de `l-svd-compute`).
  1. σ₁ = 6√2, σ₂ = 3√2, u₁ = (1 ; 1)/√2, u₂ = (1 ; −1)/√2 — *reprendre la SVD*
  2. y = Ax avec ‖x‖ = 1 : (u₁ · y)²/72 + (u₂ · y)²/18 = x₁′² + x₂′² ≤ 1 (x′ = Vᵀx) — *équation de l'image*
  3. Image : ellipse pleine, demi-axes 6√2 selon (1 ; 1), 3√2 selon (1 ; −1) — *décrire*
- **Aides** : 1 « Axes = uᵢ, demi-axes = σᵢ. » · 2 « rang 2 < 3 : l'image est □ » · 3 la description.
- **Variantes d'examen** : `mcq` (distracteurs : `l_svd_sphere_boundary`, demi-axes = σᵢ²). `open` : partie d'un problème MT.
- **Pièges** : `l_svd_sphere_boundary`, `l_svd_sigma_is_eig`.
- **Sous-buts → crédit** : SVD → `l-svd-compute` ; décrire → `l-svd-sphere`.

**Preuves courtes**

### `l-proof-matrices` — Preuves courtes : inverses, noyaux, matrice canonique
- **Année** 13 · **Prérequis** `l-mat-imt`, `l-det-props`, `g9-proof-contra` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `l-mat-imt` : énoncés équivalents de l'inversibilité ; `l-det-props` : det(AB) = det A·det B dans les preuves ; `g9-proof-contra` : preuve directe ou par contraposée.
- **Statut** : fait le 10 novembre 2026 (étape U3). Niveau 3 : une justification par preuve (une décision avant les blocs), pas une par bloc ; niveau 4 : charpente avec l'hypothèse placée, sans saisie.
- **Intro** : une preuve courte enchaîne des égalités justifiées par une définition ou une règle déjà vue. On écrit d'abord ce qu'on suppose et ce qu'on veut montrer. Exemple : « (AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ = AA⁻¹ = I, donc (AB)⁻¹ = B⁻¹A⁻¹ » (note : associativité, puis définition de l'inverse).
- **Juge** : `blocks` `{mode: 'order'}` avec des leurres ; mode `frame` aux niveaux 4 et 5 (début et fin à écrire, milieu en blocs) · **Forme finale** : chaîne de blocs qui respecte `needs`.
- **Niveaux** :
  - L1 (guidé) : 4 blocs à ordonner, sans leurre.
  - L2 : 5 blocs, dont 1 leurre.
  - L3 (choisir l'action) : pour chaque bloc, choisir sa justification (« associativité », « définition », « hypothèse »).
  - L4 (libre) : charpente (hypothèse, but) à compléter, puis blocs avec 2 leurres.
  - L5 (seul) : une preuve de la liste, sans aide.
- **Générateur** : liste fixe de preuves (pas de tirage numérique), avec 2 variantes de leurres chacune : (1) (AB)⁻¹ = B⁻¹A⁻¹ ; (2) T injective ⇔ Ker T = {0} ; (3) la matrice canonique est unique ; (4) si λ est valeur propre de A inversible, 1/λ l'est de A⁻¹ ; (5) A symétrique inversible ⇒ A⁻¹ symétrique (série MT 14, ex. 4) ; (6) T : ℝⁿ → ℝⁿ surjective ⇒ injective (série GM 14) ; (7) si A₁₁ et A sont inversibles, le complément de Schur S l'est (série GM 14, ex. 3).
- **Corrigé type** : (2) T injective ⇔ Ker T = {0}.
  1. (⇒) Si T(x) = 0 = T(0), l'injectivité donne x = 0 — *sens direct*
  2. (⇐) Si T(x) = T(y), alors T(x − y) = 0 par linéarité — *linéarité*
  3. Donc x − y ∈ Ker T = {0}, d'où x = y — *conclure*
  4. Leurre : « T(0) = 0 donc T est injective » — *bloc à rejeter*
- **Aides** : 1 « Commence par ce que tu supposes ; la dernière ligne est ce que tu veux montrer. » · 2 le premier bloc placé · 3 l'ordre complet.
- **Variantes d'examen** : `open` (4 points, partie spécifique MT : une preuve de la liste, notée par blocs). Pas de `mcq`.
- **Pièges** : `l_proof_circular`, `g9_proof_by_example`.
- **Sous-buts → crédit** : chaque bloc juste → `l-proof-matrices`.

### `l-proof-spectral` — Preuves courtes : symétriques, orthogonales, projecteurs
- **Année** 13 · **Prérequis** `l-sym-orthodiag`, `l-proof-matrices` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `l-sym-orthodiag` : théorème spectral cité dans la preuve ; `l-proof-matrices` : même rédaction en blocs.
- **Statut** : fait le 10 novembre 2026 (étape U3). Comme `l-proof-matrices` ; l'énoncé du théorème spectral se construit en mode `define`.
- **Intro** : on part du produit scalaire et on fait passer A d'un côté à l'autre : Av · w = (Av)ᵀw = vᵀAᵀw. Si A est symétrique, = vᵀAw = v · Aw. Exemple : λ(v · w) = Av · w = v · Aw = μ(v · w), donc (λ − μ)(v · w) = 0.
- **Juge** : `blocks` `{mode: 'order' | 'frame'}` avec des leurres · **Forme finale** : chaîne de blocs complète.
- **Niveaux** : comme `l-proof-matrices`.
- **Générateur** : liste fixe : (1) les espaces propres d'une matrice symétrique sont orthogonaux (partie spécifique MT 2017, 3 points) ; (2) A = uuᵀ avec ‖u‖ = 1 est la projection orthogonale sur Span{u} : u vecteur propre, rang 1, Ker A = u⊥, conclusion (MT 2016, 4 × 1 point) ; (3) une valeur propre réelle d'une matrice orthogonale vaut ±1 (série MT 12) ; (4) si U est orthogonale, ‖Ux‖ = ‖x‖ ; (5) l'énoncé du théorème spectral (blocs `define`).
- **Corrigé type** : (1) A symétrique, λ ≠ μ, v ∈ E_λ, w ∈ E_μ.
  1. λ(v · w) = (λv) · w = (Av) · w — *v vecteur propre*
  2. (Av) · w = (Av)ᵀw = vᵀAᵀw — *transposée d'un produit*
  3. vᵀAᵀw = vᵀAw = v · (μw) = μ(v · w) — *A symétrique, w vecteur propre*
  4. (λ − μ)(v · w) = 0 et λ ≠ μ, donc v · w = 0 — *conclure*
  5. Leurre : « AᵀA = I donc Av · Aw = v · w » (c'est la propriété des matrices orthogonales) — *bloc à rejeter*
- **Aides** : 1 « Calcule Av · w de deux façons. » · 2 le bloc 2 placé · 3 l'ordre complet.
- **Variantes d'examen** : `open` (3 ou 4 points, partie spécifique MT).
- **Pièges** : `l_proof_circular`, `l_sym_orth_confusion`.
- **Sous-buts → crédit** : chaque bloc juste → `l-proof-spectral`.

## Pièges du module

Notation des transformations : `prev` est la ligne précédente de l'élève ; `op = (i, j, k)` est l'opération annoncée `Lᵢ ← Lᵢ + kLⱼ` ; `cfg` est la configuration du juge. Pour les réponses finales, `wrongValues(item)` produit les valeurs fausses (distracteurs de QCM). Dans la colonne « explication », les `{…}` sont remplacés par les nombres de l'élève.

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `l_rhs_forgotten` | linear | E | `l-sys-augmented` | `l-sys-augmented` | `L2 ← L2 − 2L1` : `[0, 1, 3 \| 7]` → `[0, 1, 3 \| 1]` | Appliquer `op` aux colonnes 1 à n de `prev` et recopier telle quelle la dernière colonne (ou la partie droite de [A \| I]) | Tu as transformé les coefficients de la ligne {i}, mais pas son second membre : il reste {bᵢ} au lieu de {bᵢ + k·bⱼ}. Une équation se transforme en entier, des deux côtés du signe =. |
| `l_rowop_sign` | sign | E | `l-sys-echelon` | `l-sys-augmented` | `L2 ← L2 − 2L1` fait comme `L2 + 2L1` | Appliquer `(i, j, −k)` à `prev` | Pour annuler {aᵢⱼ} avec le pivot {aⱼⱼ}, il faut retrancher {aᵢⱼ/aⱼⱼ} fois la ligne {j}. Tu as ajouté au lieu de retrancher : la case vaut {2aᵢⱼ} au lieu de 0. |
| `l_rowop_partial` | rule | E | `l-sys-echelon` | `l-sys-augmented` | `[2, 5, 1] − 2·[1, 2, −1]` = `[0, 3, 2]` → `[0, 1, 3]` | Ligne i : sur la colonne du pivot, `prev[i][c] + k·prev[j][c]` ; ailleurs, `prev[i][c] − prev[j][c]` (le multiplicateur oublié hors du pivot) | Le facteur {k} multiplie **toute** la ligne {j}, pas seulement son pivot. Dans la colonne {c}, il fallait {prev[i][c]} − {k}·{prev[j][c]} = {…}. |
| `l_rowop_wrong_row` | notation | E | `l-sys-augmented` | `l-sys-augmented` | résultat de `L2 ← L2 − 2L1` écrit en ligne 1 | Placer le résultat de `op` dans la ligne j au lieu de la ligne i | `L2 ← …` veut dire que c'est la ligne 2 qui change ; la ligne 1 reste telle quelle. |
| `l_rref_not_reduced` | method | E | `l-sys-rref` | `l-sys-rref` | r₁₃ = −1 (forme échelonnée) → −3 (réduite) | `wrongValues` : le coefficient demandé, lu sur la forme échelonnée obtenue avant la remontée | Ta matrice est échelonnée, mais pas réduite : il reste un {x} au-dessus du pivot de la colonne {c}. La forme réduite est la seule qui soit unique. |
| `l_free_var_zero` | linear | E | `l-sys-solution` | `l-sys-solution` | x = (2 ; −1 ; 0) → x = (2 ; −1 ; 0) + t(3 ; −1 ; 1) | Solution finale = solution particulière seule (variables libres mises à 0) | Tu as donné une solution, mais x₃ est libre : chaque valeur de x₃ donne une autre solution. Il y en a une infinité, de la forme p + t·v. |
| `l_ker_sign` | sign | E | `l-vs-kernel` | `l-sys-solution` | x₁ + 2x₂ = 0 → x₁ = 2x₂ (au lieu de −2x₂) | Dans chaque vecteur de base, changer le signe des composantes pivots | De x₁ + 2x₂ − x₄ = 0, on tire x₁ = −2x₂ + x₄ : le terme change de signe en passant de l'autre côté. Vérifie : A·{v} ≠ 0. |
| `l_ker_from_rows` | linear | E | `l-vs-kernel` | `l-vs-col-row` | Ker A = Span{lignes de R} | Liste finale = lignes non nulles de la forme réduite | Les lignes de R engendrent l'espace des lignes, qui est **orthogonal** au noyau. Un vecteur du noyau vérifie Ax = 0 : teste A·{v}. |
| `l_inj_rows` | logic | E | `l-map-inj-surj` | `l-sys-pivots-theory` | « pivot dans chaque ligne, donc injective » | `wrongValues` : échanger les réponses « injective » et « surjective » | Injective, c'est « au plus une solution » : il faut un pivot dans chaque **colonne** (pas de variable libre). Un pivot dans chaque ligne donne la surjectivité. |
| `l_rank_dim_confusion` | linear | E | `l-vs-rank` | `l-vs-rank` | dim Ker A = m − r → n − r | `wrongValues` : m − r, r, n | Le noyau vit dans l'espace de départ, de dimension n = {n} (le nombre de colonnes) : dim Ker A = {n} − {r}. m − r est la dimension de Ker Aᵀ. |
| `l_span_count` | logic | E | `l-vs-basis` | `l-vec-span` | « n vecteurs de ℝⁿ forment toujours une base » | `wrongValues` : réponse « vrai » aux énoncés qui ne comptent que les vecteurs | Le nombre de vecteurs ne suffit pas : {k} vecteurs peuvent être liés (deux égaux, ou un nul). Il faut vérifier les pivots. |
| `l_param_divide_zero` | logic | E | `l-sys-param` | `l-sys-param` | « diviser L2 par a − 1 » sans traiter a = 1 | Ligne qui divise par le pivot f(a) ; `wrongValues` : l'ensemble des cas où la racine de f perdue est absente | Tu as divisé par {f(a)}, qui vaut 0 pour a = {r}. Ce cas doit être traité à part : pour a = {r}, la ligne devient {…}. |
| `l_param_none_vs_inf` | logic | E | `l-sys-param` | `l-sys-solution` | `[0 0 0 \| 3]` lu « infinité » | `wrongValues` : échanger les ensembles « aucune » et « infinité » | La ligne `0 = {g}` est impossible quand {g} ≠ 0 : aucune solution. Une infinité, c'est quand la ligne devient `0 = 0`. |
| `l_matrix_rows_cols` | notation | E | `l-map-std-matrix` | `l-map-std-matrix` | images en lignes → en colonnes | Transposer la matrice de `prev` (ou la matrice finale) | La colonne j de la matrice, c'est l'image du j-ième vecteur de base : c'est pour cela que A·eⱼ redonne T(eⱼ). Tu as rangé les images en lignes. |
| `l_indep_scaled` | logic | C | `l-vec-indep` | `l-vec-indep` | « {αᵢvᵢ} reste libre » (2021 Q17) | `wrongValues` : « vrai » | Si un αᵢ vaut 0, la famille contient le vecteur nul, donc elle est liée. Contre-exemple : α₁ = 0. |
| `l_cofactor_sign` | sign | E | `l-det-cofactor` | `l-det-cofactor` | det = +4·det A₂₃ → −4·det A₂₃ | Remplacer chaque facteur (−1)^(i+j) par +1 dans la ligne de développement | La case ({i}, {j}) porte le signe (−1)^({i}+{j}) = {s}. Le damier commence par + en haut à gauche. |
| `l_minor_wrong` | notation | E | `l-det-cofactor` | `l-det-cofactor` | mineur sans la ligne 2 mais avec la colonne 3 | Mineur obtenu en retirant la ligne i et une colonne voisine de j | Le mineur Aᵢⱼ s'obtient en barrant la ligne {i} **et** la colonne {j} de la case développée. |
| `l_map_scaled_image` | linear | E | `l-map-std-matrix` | `l-map-std-matrix` | colonne 2 = T(2e₂) → ½·T(2e₂) | Placer les images données telles quelles en colonnes (T(2e₂) pour e₂, T(e₂ + e₃) pour e₃) | On t'a donné T(2e₂) = {…}, qui vaut 2·T(e₂). La colonne 2 doit contenir T(e₂) = {…}. De même, T(e₃) = T(e₂ + e₃) − T(e₂). |
| `l_rot_transpose` | sign | E | `l-map-geom` | `l-map-geom` | `[[cos θ, sin θ], [−sin θ, cos θ]]` | Transposer la matrice de rotation | Cette matrice tourne de −θ. Vérifie avec e₁ : sa colonne 1 doit être (cos θ ; sin θ), qui est e₁ tourné de θ. |
| `l_pdp_inverse_side` | rule | E | `l-eig-diag` | `l-vs-similar` | A = P⁻¹DP → PDP⁻¹ | Remplacer `P·D·P⁻¹` par `P⁻¹·D·P` dans la ligne | Les colonnes de P sont les vecteurs propres : AP = PD, donc A = PDP⁻¹. Teste sur v₁ : PDP⁻¹v₁ = λ₁v₁. |
| `l_compose_order` | rule | E | `l-map-geom` | `l-mat-product` | « d'abord R, puis S » → S·R | Produit des matrices dans l'ordre de l'énoncé (R·S au lieu de S·R) | On applique d'abord R à x, puis S au résultat : S(R(x)) = (SR)x. La matrice appliquée en premier est à droite. |
| `l_ab_commute` | rule | R | `l-mat-product` | `l-mat-product` | AB = BA | Calculer BA à la place de AB (quand les tailles le permettent) ; `wrongValues` : (BA)ᵢⱼ | Le produit de matrices ne commute pas en général : ici AB et BA n'ont même pas la même taille ({m}×{m} et {n}×{n}). |
| `l_product_entrywise` | rule | E | `l-mat-product` | `l-mat-product` | (AB)ᵢⱼ = aᵢⱼbᵢⱼ | Produit case par case quand les tailles sont égales | Une case de AB est la somme des produits « ligne i de A par colonne j de B », pas le produit des cases au même endroit. |
| `l_transpose_product` | rule | E | `l-mat-product` | `l-mat-product` | (AB)ᵀ = AᵀBᵀ → BᵀAᵀ | Ligne `AᵀBᵀ` à la place de `BᵀAᵀ` | La transposée d'un produit renverse l'ordre : (AB)ᵀ = BᵀAᵀ. Avec AᵀBᵀ, les tailles ne vont même pas toujours. |
| `l_coef_index_swap` | notation | E | `l-mat-inverse` | `l-mat-product` | b₁₃ lu en ligne 3, colonne 1 | `wrongValues` : le coefficient d'indices échangés (j, i) | bᵢⱼ est en ligne {i} et colonne {j}. Tu as lu la case ({j}, {i}), qui vaut {…}. |
| `l_inv_entrywise` | rule | E | `l-mat-inverse` | `l-mat-inverse` | (A⁻¹)ᵢⱼ = 1/aᵢⱼ | Matrice des inverses des coefficients | A⁻¹ n'est pas la matrice des 1/aᵢⱼ : vérifie, le produit A·{ta matrice} ne redonne pas I. |
| `l_inv_2x2_swap` | rule | E | `l-mat-inverse` | `l-mat-inverse` | (1/det)[[a, −b], [−c, d]] → (1/det)[[d, −b], [−c, a]] | Formule 2 × 2 sans échanger a et d, ou en échangeant b et c sans changer leur signe | Pour une 2 × 2 : on échange les deux cases de la diagonale, on change le signe des deux autres, puis on divise par ad − bc. |
| `l_inv_product_order` | rule | R | `l-mat-inverse` | `l-mat-product` | (AB)⁻¹ = A⁻¹B⁻¹ → B⁻¹A⁻¹ | Ligne `A⁻¹B⁻¹` ; `wrongValues` : « vrai » au vrai/faux | (AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ = I : l'ordre s'inverse, comme pour enlever des chaussettes puis des chaussures. |
| `l_imt_nonsquare` | logic | E | `l-mat-imt` | `l-mat-imt` | « colonnes libres ⇒ inversible » pour une 4 × 3 | `wrongValues` : « vrai » aux énoncés du théorème appliqués à une matrice non carrée | Le théorème de la matrice inversible ne vaut que pour une matrice carrée. Ici A est {m}×{n}. |
| `l_elementary_inverse` | sign | E | `l-mat-elementary` | `l-mat-elementary` | inverse de `L3 ← L3 + 2L1` = même matrice | E⁻¹ = E (même coefficient hors diagonale) | Pour défaire « ajouter 2 fois la ligne 1 », il faut la retrancher : le coefficient de E⁻¹ est −2. Contrôle : E·E⁻¹ = I. |
| `l_lu_sign` | sign | E | `l-mat-lu` | `l-mat-elementary` | `L2 ← L2 − 2L1` → ℓ₂₁ = −2 (au lieu de 2) | L avec les coefficients sous la diagonale changés de signe | ℓᵢⱼ est le nombre qu'on **retranche** : `L{i} ← L{i} − {k}·L{j}` donne ℓ = {k}. Contrôle : LU doit redonner A. |
| `l_lu_inverse` | linear | E | `l-mat-lu` | `l-mat-elementary` | L = E₃E₂E₁ (ℓ₃₁ = 7) → L = (E₃E₂E₁)⁻¹ (ℓ₃₁ = −1) | L remplacée par le produit des matrices d'élimination ; ℓ₃₁ devient −ℓ₃₁ + ℓ₂₁ℓ₃₂ (au signe près) | Le produit E₃E₂E₁ fait passer de A à U ; L fait le chemin inverse. Avec les multiplicateurs, L se remplit directement, sans produit. |
| `l_blocks_order` | rule | E | `l-mat-blocks` | `l-mat-product` | −D⁻¹BA⁻¹ → −A⁻¹BD⁻¹ | Dans la ligne, renverser l'ordre des facteurs du bloc hors diagonale | Les blocs ne commutent pas. Écris M·M⁻¹ = I bloc par bloc : A·X + B·D⁻¹ = 0 donne X = −A⁻¹BD⁻¹. |
| `l_blocks_inverse_each` | rule | E | `l-mat-blocks` | `l-mat-inverse` | [[A⁻¹, B⁻¹], [0, D⁻¹]] | Inverser chaque bloc séparément | On n'inverse pas une matrice par blocs case par case : le produit de ta matrice par M ne donne pas I (le bloc haut droit vaut {…}). |
| `l_det_swap_sign` | sign | E | `l-det-rowops` | `l-det-rowops` | échange de lignes, det inchangé | Ignorer les échanges dans le facteur suivi | Chaque échange de deux lignes change le signe du déterminant. Tu en as fait {s}. |
| `l_det_scale_row` | rule | E | `l-det-rowops` | `l-det-rowops` | `L2 ← 2L2` sans corriger det | Ignorer les multiplications de ligne dans le facteur suivi | Multiplier une ligne par {k} multiplie det par {k} : il faut diviser à la fin. |
| `l_det_rowop_combo` | rule | E | `l-det-rowops` | `l-det-rowops` | `L2 ← 2L2 − L1` compté comme sans effet | Facteur inchangé pour une opération `Lᵢ ← cLᵢ + kLⱼ` avec c ≠ 1 | `L{i} ← {c}L{i} + …` multiplie la ligne {i} par {c} avant d'ajouter : det est multiplié par {c}. |
| `l_det_sum` | distribute | E | `l-det-props` | `l-det-props` | det(A + B) = det A + det B | `wrongValues` : det A + det B ; « vrai » au vrai/faux | Le déterminant n'est pas additif : avec A = B = I₂, det(2I) = 4 mais det A + det B = 2. |
| `l_det_scalar` | rule | E | `l-det-props` | `l-det-props` | det(2A) = 2·det A → 2ⁿ·det A | `wrongValues` : k·det A | 2A multiplie **chacune** des {n} lignes par 2 : det est multiplié par 2^{n} = {…}. |
| `l_det_transpose_sign` | sign | C | `l-det-props` | `l-det-props` | det(Aᵀ) = −det A | `wrongValues` : −det A ; « vrai » (2021 Q29) | det(Aᵀ) = det A. Contre-exemple immédiat : A = I. |
| `l_area_half_abs` | geometry | E | `l-det-area` | `l-det-area` | aire du triangle = det → ½·\|det\| | `wrongValues` : det, −½det, \|det\| | Un triangle est la moitié du parallélogramme, et une aire est positive : ½·\|{d}\| = {…}. |
| `l_cramer_row` | notation | E | `l-det-cramer` | `l-det-cramer` | ligne i remplacée par b | Remplacer la ligne i de A par bᵀ | Cramer remplace la **colonne** de l'inconnue (les coefficients de xᵢ) par b. |
| `l_subspace_zero` | logic | E | `l-vs-subspace` | `l-vs-subspace` | {p : p(0) = 1} « sous-espace » | `wrongValues` : « oui » pour un ensemble affine | Le polynôme nul n'est pas dans l'ensemble : p(0) = 0 ≠ 1. Un sous-espace contient toujours 0. |
| `l_subspace_nonlinear` | logic | E | `l-vs-subspace` | `l-vs-subspace` | {uv = w²} « sous-espace » | `wrongValues` : « oui » pour une condition quadratique | La condition n'est pas stable par somme : {x} et {y} y sont, mais pas {x + y}. |
| `l_col_from_rref` | linear | C | `l-vs-col-row` | `l-vs-col-row` | Col A = Span{colonnes pivots de R} | Base finale = colonnes pivots de R (2021 Q26) | Les opérations sur les lignes changent l'espace des colonnes. Les pivots disent **quelles** colonnes garder ; les vecteurs se prennent dans A. |
| `l_row_from_A` | linear | E | `l-vs-col-row` | `l-vs-col-row` | Lgn A = lignes de A aux positions des pivots | Base = lignes de A d'indices égaux aux lignes pivots de R | Les lignes de R engendrent Lgn A ; les lignes de A à la même position ne forment pas toujours une base (les opérations les ont mélangées). |
| `l_coords_canonical` | notation | E | `l-vs-coords` | `l-vs-coords` | [p]_B = (2 ; 3 ; −1) → (6 ; −4 ; −1) | `wrongValues` : coordonnées dans la base canonique | (2 ; 3 ; −1) sont les coefficients de p dans (1, t, t²). Dans B, il faut écrire p comme combinaison de {b₁}, {b₂}, {b₃}. |
| `l_change_basis_direction` | notation | E | `l-vs-change-basis` | `l-vs-change-basis` | P_{C←B} = B⁻¹C → C⁻¹B | Remplacer P par P⁻¹ (réduire [B \| C] au lieu de [C \| B]) | Tu as obtenu P_{B←C}. Contrôle : la 1re colonne de P_{C←B} doit donner b₁ dans la base C : {p₁₁}c₁ + {p₂₁}c₂ = b₁ ? |
| `l_change_basis_product` | rule | E | `l-vs-change-basis` | `l-vs-change-basis` | P = C⁻¹ (B oubliée) ou P = BC⁻¹ | Lignes `C⁻¹` ou `B·C⁻¹` | P_{C←B} = C⁻¹B : on passe de B à la base canonique (B), puis de la canonique à C (C⁻¹). |
| `l_map_basis_ignored` | linear | E | `l-vs-map-matrix` | `l-vs-map-matrix` | matrice dans les bases canoniques | Matrice finale calculée avec les bases canoniques au départ et à l'arrivée | On demande la matrice par rapport à B : les colonnes sont les images des vecteurs **de B**, pas de 1, t, t². |
| `l_similar_order` | rule | E | `l-vs-similar` | `l-vs-change-basis` | [T]_B = PAP⁻¹ → P⁻¹AP | Remplacer `P⁻¹AP` par `PAP⁻¹` | Pour lire T dans B : on passe des coordonnées B aux canoniques (P), on applique A, on revient (P⁻¹) : P⁻¹AP. |
| `l_eigvec_zero` | linear | E | `l-eig-space` | `l-eig-check` | v = 0 | Ligne `v = (0 ; … ; 0)` | Le vecteur nul vérifie A·0 = λ·0 pour tout λ : il est exclu par définition. Cherche une solution non nulle de (A − λI)v = 0. |
| `l_eigen_rref` | linear | E | `l-eig-charpoly` | `l-eig-charpoly` | valeurs propres lues sur la forme échelonnée de A | `wrongValues` : diagonale de la forme échelonnée de A | Les opérations sur les lignes changent les valeurs propres (elles gardent seulement le rang, et le det au signe près). Il faut det(A − λI). |
| `l_charpoly_sign` | sign | E | `l-eig-charpoly` | `l-det-cofactor` | (4 − λ)(3 − λ) + 2 → − 2 | Pour un 2 × 2 (ou un mineur 2 × 2) : (a − λ)(d − λ) + bc au lieu de − bc | Un déterminant 2 × 2 vaut « diagonale moins antidiagonale » : (a − λ)(d − λ) − {b}·{c}. |
| `l_lambda_one_entry` | linear | E | `l-eig-charpoly` | `l-eig-check` | A − λI avec λ sur une seule case | Matrice `prev` avec λ soustrait seulement à a₁₁ | λI a des λ sur **toute** la diagonale : chaque case diagonale perd λ. |
| `l_eigvec_row` | linear | E | `l-eig-space` | `l-vs-kernel` | `[[2, 1], [2, 1]]` → v = (2 ; 1) au lieu de (1 ; −2) | Vecteur proposé = première ligne non nulle de A − λI | v doit être **orthogonal** aux lignes de A − λI (chaque ligne · v = 0), pas égal à une ligne. Avec 2x + y = 0 : v = (1 ; −2). |
| `l_eig_inv_neg` | rule | E | `l-eig-related` | `l-eig-related` | valeurs propres de A⁻¹ : −λ → 1/λ | `wrongValues` : −λᵢ | Si Av = λv, alors v = λA⁻¹v, donc A⁻¹v = (1/λ)v : c'est l'inverse, pas l'opposé. |
| `l_eig_shift_scale` | rule | E | `l-eig-related` | `l-eig-related` | A + 3I : 3λ ; 2A : λ + 2 | `wrongValues` : échanger les règles « + c » et « × c » | (A + cI)v = Av + cv = (λ + c)v ; (cA)v = cλv. |
| `l_eig_transpose_vec` | logic | E | `l-eig-related` | `l-eig-related` | « Aᵀ a les mêmes vecteurs propres » | `wrongValues` : « vrai » | Aᵀ a les mêmes valeurs propres, pas les mêmes vecteurs : avec `[[1, 1], [0, 2]]`, (1 ; 0) est propre pour A mais pas pour Aᵀ. |
| `l_eig_sum` | rule | E | `l-eig-related` | `l-eig-related` | valeurs propres de A + B = λ + μ | `wrongValues` : sommes deux à deux | Ce n'est vrai que si A et B ont les mêmes vecteurs propres. Contre-exemple : deux matrices triangulaires opposées. |
| `l_pd_order` | notation | C | `l-eig-diag` | `l-eig-diag` | P = [v₂ v₁], D = diag(λ₁, λ₂) | Échanger deux colonnes de P sans toucher D (corrigé MT 2016 : « attention à l'ordre ») | La colonne k de P doit être un vecteur propre de la valeur en position k de D. Contrôle : AP = PD colonne par colonne. |
| `l_diag_distinct` | logic | E | `l-eig-diag-param` | `l-eig-diag` | « valeur propre double ⇒ pas diagonalisable » | `wrongValues` : exclure toutes les valeurs de a où une valeur propre est double | Une valeur double n'empêche rien si son espace propre est de dimension 2 : pour a = {r}, dim E = {d}. |
| `l_powers_entrywise` | rule | E | `l-eig-powers` | `l-eig-powers` | Aᵏ = (aᵢⱼᵏ) | Matrice des puissances k des coefficients | Aᵏ = A·A·…·A, pas la matrice des aᵢⱼᵏ. Seule une matrice diagonale s'élève case par case : d'où Aᵏ = PDᵏP⁻¹. |
| `l_markov_rows` | notation | E | `l-eig-markov` | `l-eig-markov` | M avec les probabilités en lignes | Transposer M | Avec x_{k+1} = Mx_k, la colonne j dit où vont les personnes de l'état j : chaque **colonne** somme à 1. |
| `l_markov_normalize` | linear | E | `l-eig-markov` | `l-eig-markov` | q = (4/3 ; 1) → (4/7 ; 3/7) | Vecteur propre de 1 rendu sans normalisation | q est une répartition : ses composantes doivent sommer à 1. Divise par {s}. |
| `l_complex_conj_vec` | linear | E | `l-eig-complex` | `l-eig-complex` | même v pour λ et λ̄ | Vecteur de λ̄ = vecteur de λ | Pour une matrice réelle, le vecteur propre de λ̄ est le conjugué v̄ = {…}. |
| `l_dot_no_sum` | rule | E | `l-orth-dot` | `l-orth-dot` | u · v = (3 ; 0 ; −8) | Rendre le vecteur des produits terme à terme | Le produit scalaire est un **nombre** : la somme des produits terme à terme. |
| `l_orth_transitive` | logic | E | `l-orth-dot` | `l-orth-dot` | u ⊥ v, v ⊥ w ⇒ u ⊥ w | `wrongValues` : « vrai » | Contre-exemple : u = w = e₁ et v = e₂. |
| `l_perp_one_vector` | linear | E | `l-orth-complement` | `l-orth-complement` | vecteurs orthogonaux à w₁ seulement | Base de Ker[w₁ᵀ] au lieu de Ker[w₁ᵀ ; w₂ᵀ] | Un vecteur de W⊥ doit être orthogonal à **tous** les vecteurs de W : {v} · w₂ = {…} ≠ 0. |
| `l_proj_nonorth` | rule | E | `l-orth-proj` | `l-orth-gs` | formule de projection sur une base non orthogonale | Σ (y · wᵢ / wᵢ · wᵢ)wᵢ avec la base donnée telle quelle | La formule n'est juste que si les wᵢ sont orthogonaux ; ici w₁ · w₂ = {…}. Orthogonalise d'abord (Gram-Schmidt). |
| `l_orth_cols_only` | logic | E | `l-orth-matrices` | `l-orth-matrices` | colonnes orthogonales ⇒ U⁻¹ = Uᵀ | `wrongValues` : « vrai » | Il faut aussi des colonnes de norme 1 : avec U = 2I, UᵀU = 4I. |
| `l_orth_det_one` | logic | C | `l-orth-matrices` | `l-orth-matrices` | « orthogonale ⇒ det = 1 » (2019 Q5) | `wrongValues` : « vrai » | det U = ±1 : une symétrie, comme (1/3)·`[[1, 2, 2], [2, 1, −2], [2, −2, 1]]`, a det = −1. |
| `l_gs_use_x` | method | E | `l-orth-gs` | `l-orth-gs` | v₃ = x₃ − proj_{x₁}x₃ − proj_{x₂}x₃ | Projections de x₃ sur x₁ et x₂ au lieu de v₁ et v₂ | x₁ et x₂ ne sont pas orthogonaux entre eux : il faut projeter sur v₁ et v₂, déjà orthogonaux. Contrôle : v₃ · v₂ = {…}. |
| `l_gs_sign` | sign | E | `l-orth-gs` | `l-orth-proj` | v₂ = x₂ + c·v₁ | Ajouter la projection au lieu de la retrancher | On **retire** à x₂ sa composante selon v₁. Contrôle : v₂ · v₁ doit valoir 0. |
| `l_qr_r_from_gs` | linear | E | `l-orth-qr` | `l-orth-qr` | rᵢⱼ = coefficient de Gram-Schmidt (r₃₃ = 1) | R remplie avec les coefficients cᵢⱼ de Gram-Schmidt et des 1 sur la diagonale | Avec Q normée, rᵢⱼ = qᵢ · xⱼ = cᵢⱼ·‖vᵢ‖, et rᵢᵢ = ‖vᵢ‖ = {…}. |
| `l_lsq_square_subsystem` | method | E | `l-orth-lsq` | `l-orth-lsq` | résoudre les n premières équations de Ax = b | Solution exacte du sous-système carré des n premières lignes | Le système est incompatible : une solution de quelques équations ignore les autres. Les moindres carrés tiennent compte de toutes, par AᵀAx = Aᵀb. |
| `l_lsq_line_swap` | notation | E | `l-orth-lsq` | `l-orth-lsq` | y = β₁ + β₀x | `wrongValues` : β₀ et β₁ échangés | La colonne de 1 porte l'ordonnée à l'origine β₀ ; la colonne des x porte la pente β₁. |
| `l_lsq_normal_aat` | rule | E | `l-orth-lsq` | `l-mat-product` | AAᵀx = Ab | Ligne `AAᵀ` au lieu de `AᵀA` (si les tailles le permettent) | On multiplie Ax = b à gauche par Aᵀ : AᵀA est {n}×{n}, de la taille de x. |
| `l_inner_positivity` | logic | E | `l-orth-inner` | `l-orth-inner` | uᵀAᵀAv « toujours un produit scalaire » | `wrongValues` : « vrai » | Si A n'est pas inversible, il existe u ≠ 0 avec Au = 0, et alors ⟨u, u⟩ = ‖Au‖² = 0. |
| `l_orthodiag_no_normalize` | linear | C | `l-sym-orthodiag` | `l-orth-matrices` | Q = [(3 ; 4), (4 ; −3)] | Colonnes de Q non divisées par leur norme | Q doit être orthogonale : ses colonnes doivent être de norme 1. Divise (3 ; 4) par 5. (Corrigé MT 2017 : 1 point pour normaliser.) |
| `l_orthodiag_no_gs` | linear | E | `l-sym-orthodiag` | `l-orth-gs` | base de E₋₁ non orthogonalisée | Colonnes de Q = vecteurs de base d'un espace propre de dimension 2, seulement normalisés | Deux vecteurs du même espace propre ne sont pas forcément orthogonaux : (1 ; −1 ; 0) · (1 ; 0 ; −1) = 1. Applique Gram-Schmidt dans l'espace propre. |
| `l_sym_needed` | logic | C | `l-sym-orthodiag` | `l-sym-orthodiag` | matrice non symétrique « orthodiagonalisable » (2021 Q21) | `wrongValues` : « vrai » | Orthodiagonalisable ⇔ symétrique : ici a₁₂ = {…} ≠ a₂₁ = {…}. |
| `l_quadform_offdiag` | rule | E | `l-sym-quadform` | `l-sym-quadform` | Q = x₁² + 10x₁x₂ + x₂² → a₁₂ = 10 (au lieu de 5) | Mettre le coefficient entier de xᵢxⱼ dans aᵢⱼ et aⱼᵢ | xᵀAx contient aᵢⱼxᵢxⱼ + aⱼᵢxⱼxᵢ = 2aᵢⱼxᵢxⱼ : chaque case reçoit la moitié, {c}/2. |
| `l_posdef_diag` | logic | E | `l-sym-quadform` | `l-sym-quadform` | « diagonale positive ⇒ définie positive » | `wrongValues` : « vrai » | Contre-exemple : `[[1, 2], [2, 1]]` a une diagonale positive mais la valeur propre −1 : Q(1, −1) = −2. |
| `l_svd_sigma_is_eig` | rule | E | `l-svd-compute` | `l-svd-compute` | σᵢ = λᵢ(AᵀA) → √λᵢ | `wrongValues` : λᵢ au lieu de √λᵢ | Les valeurs singulières sont les **racines** des valeurs propres de AᵀA : √{λ} = {…}. |
| `l_svd_no_sigma` | rule | E | `l-svd-compute` | `l-orth-matrices` | uᵢ = Avᵢ → Avᵢ/σᵢ | Colonne de U = Avᵢ sans division | ‖Avᵢ‖ = σᵢ = {…} : il faut diviser pour obtenir un vecteur unitaire. |
| `l_svd_uv_swap` | notation | E | `l-svd-compute` | `l-svd-compute` | V tirée des vecteurs propres de AAᵀ | Échanger les rôles de U et V | V contient des vecteurs de ℝⁿ (départ) : ce sont les vecteurs propres de AᵀA, qui est {n}×{n}. |
| `l_svd_sphere_boundary` | geometry | E | `l-svd-sphere` | `l-svd-sphere` | image de la sphère de ℝ³ par A 2 × 3 = ellipse (le bord seul) | `wrongValues` : « ellipse » au lieu d'« ellipse pleine » ; demi-axes σᵢ² | A écrase une direction (son noyau) : les points de la sphère vont aussi à l'intérieur de l'ellipse. L'image est l'ellipse pleine. |
| `l_proof_circular` | logic | E | `l-proof-matrices` | `g9-proof-contra` | bloc qui utilise la conclusion | Placer en tête le bloc leurre qui suppose le résultat | Ce bloc suppose déjà ce qu'on veut montrer. Une preuve part des hypothèses. |
| `l_sym_orth_confusion` | logic | E | `l-proof-spectral` | `l-orth-matrices` | « A symétrique, donc AᵀA = I » | Bloc leurre qui utilise la propriété d'une matrice orthogonale | Symétrique veut dire Aᵀ = A, pas AᵀA = I (ça, c'est orthogonale). |

## Exemples de type examen

### 1. Système à paramètre (QCM, 3 points ; partie commune)

Soit a un paramètre réel et le système `x + 2y − z = 1 ; 2x + 5y + z = 3 ; x + 3y + (a² − 2)z = a`. Une seule affirmation est vraie :
- (A) il admet une infinité de solutions si et seulement si a = 2 — juste ;
- (B) il n'admet aucune solution si et seulement si a ∈ {−2 ; 2} — `l_param_none_vs_inf` (le cas « infinité » compté comme « aucune ») ;
- (C) il admet une solution unique si et seulement si a ≠ −2 — `l_param_divide_zero` (le cas a = 2 oublié) ;
- (D) il admet au moins une solution si et seulement si a ≠ 2 — `l_param_none_vs_inf` (aucune et infinité échangées).

Corrigé en lignes (variante `coef` et niveau 5) : `L2 ← L2 − 2L1` : `[0, 1, 3 | 1]` ; `L3 ← L3 − L1` : `[0, 1, a² − 1 | a − 1]` ; `L3 ← L3 − L2` : `[0, 0, a² − 4 | a − 2]`. Donc a ∉ {−2 ; 2} : solution unique ; a = 2 : `0 = 0`, une infinité ; a = −2 : `0 = −4`, aucune.

Barème de la version `open` : matrice augmentée 0,5 ; deux éliminations 1 ; troisième élimination 0,5 ; factorisation a² − 4 = (a − 2)(a + 2) 0,5 ; discussion des trois cas 1,5. Total 4 points.

### 2. Chaîne de trois QCM sur une même matrice (3 × 3 points ; partie commune, comme 2021 Q13 à Q15)

A = `[[1, 2, 2], [1, 0, 4], [1, 2, 0], [1, 0, 2]]` (colonnes x₁, x₂, x₃), y = (3 ; 1 ; −1 ; 5).

**Q1.** Gram-Schmidt sur les colonnes de A, sans changer l'ordre et sans normaliser, donne :
- (A) (1 ; 1 ; 1 ; 1), (1 ; −1 ; 1 ; −1), (1 ; 1 ; −1 ; −1) — juste ;
- (B) (1 ; 1 ; 1 ; 1), (0 ; −2 ; 0 ; −2), … — `g4_proj_no_square` (division par ‖v₁‖ = 2) ;
- (C) (1 ; 1 ; 1 ; 1), (3 ; 1 ; 3 ; 1), … — `l_gs_sign` ;
- (D) (1 ; 1 ; 1 ; 1), (1 ; −1 ; 1 ; −1), (−1 ; 2 ; −3 ; 0) — `l_gs_use_x`.

Lignes : x₂ · v₁ = 4, v₁ · v₁ = 4, v₂ = x₂ − v₁ (1 point en `open`) ; x₃ · v₁ = 8, x₃ · v₂ = −4, v₂ · v₂ = 4, v₃ = x₃ − 2v₁ + v₂ (2 points).

**Q2.** La projection orthogonale de y sur le sous-espace engendré par les deux premières colonnes de A est :
- (A) (1 ; 3 ; 1 ; 3) — juste : y · v₁/4 = 2, y · v₂/4 = −1 ;
- (B) (3 ; 2 ; 3 ; 2) — `l_proj_nonorth` (formule appliquée à x₁, x₂) ;
- (C) (2 ; 6 ; 2 ; 6) — `g4_proj_no_square` ;
- (D) (2 ; −2 ; −2 ; 2) — la composante orthogonale z à la place de ŷ.

Lignes : utiliser v₁, v₂ de Q1 (sous-but → `l-orth-gs`), coefficients (1 point), somme (1 point), contrôle z ⊥ v₁, v₂ (1 point).

**Q3.** A possède une décomposition QR telle que :
- (A) r₃₃ = 2 — juste (‖v₃‖ = 2) ;
- (B) r₃₃ = 4 — ‖v₃‖² ;
- (C) r₃₃ = 1 — `l_qr_r_from_gs` ;
- (D) r₃₃ = 2√6 — ‖x₃‖.

L'item `problem` enchaîne les trois `lines` ; une erreur en Q1 est suivie (`followError: true`) : Q2 et Q3 sont jugées à partir des v de l'élève, mais l'item compte comme raté.

### 3. SVD complète (14 points ; partie spécifique MT, comme 2017)

W est le noyau de A = `[[1, 2, 0, 1], [1, 0, 2, 1]]` dans ℝ⁴.

| Partie | Ce qu'on attend | Points |
|---|---|---|
| (a) Base orthonormée de W | Réduction : x₂ = x₃, x₁ = −2x₂ − x₄ ; base (−2 ; 1 ; 1 ; 0), (−1 ; 0 ; 0 ; 1) (1) ; Gram-Schmidt en partant de (−1 ; 0 ; 0 ; 1) : (−2 ; 1 ; 1 ; 0) − 1·(−1 ; 0 ; 0 ; 1) = (−1 ; 1 ; 1 ; −1) (1) ; normaliser : (−1 ; 0 ; 0 ; 1)/√2, (−1 ; 1 ; 1 ; −1)/2 (1) | 3 |
| (b) B = AᵀA | `[[2, 2, 2, 2], [2, 4, 0, 2], [2, 0, 4, 2], [2, 2, 2, 2]]` | 1 |
| (c) Polynôme caractéristique | `L4 ← L4 − L1` donne (t ; 0 ; 0 ; −t) ; `C1 ← C1 + C4`, développer selon la ligne 4 : −t·det `[[4 − t, 2, 2], [4, 4 − t, 0], [4, 0, 4 − t]]` (1) ; `L2 ← L2 − L3` sort (4 − t) (1) ; résultat t²(t − 4)(t − 8) (1) | 3 |
| (d) Espaces propres, sachant que w = (1 ; 1 ; 1 ; 1) est propre | E₀ = Ker B = W (rang 2, donc dim 2 ; par (a)) (1) ; Bw = 8w, E₈ = Span{w} (1) ; E₄ = Ker(B − 4I) = Span{(0 ; 1 ; −1 ; 0)} (1) | 3 |
| (e) Base orthonormée de vecteurs propres | w/2, (0 ; 1 ; −1 ; 0)/√2, et la base de (a) | 1 |
| (f) U, Σ, V | V = [w/2, (0 ; 1 ; −1 ; 0)/√2, (−1 ; 0 ; 0 ; 1)/√2, (−1 ; 1 ; 1 ; −1)/2] (1) ; Σ = `[[2√2, 0, 0, 0], [0, 2, 0, 0]]` (1) ; u₁ = Av₁/σ₁ = (1 ; 1)/√2, u₂ = Av₂/σ₂ = (1 ; −1)/√2 (0,5 + 0,5) | 3 |

Pièges suivis : `l_svd_sigma_is_eig` (Σ avec 8 et 4), `l_svd_no_sigma`, `l_orthodiag_no_normalize`, `l_pd_order` (ordre de V et de Σ), `g4_proj_no_square`. Sauvegarde après chaque ligne (`resumable: true`).

### 4. Orthodiagonalisation d'une 4 × 4 (14 points ; partie spécifique MT, comme 2016)

W ⊂ ℝ⁴ est l'hyperplan x₁ + x₂ + x₃ + 3x₄ = 0, et A = `[[3, 1, 1, 3], [1, 3, 1, 3], [1, 1, 3, 3], [3, 3, 3, 11]]`.

| Partie | Ce qu'on attend | Points |
|---|---|---|
| (a) Gram-Schmidt sur la base b₁ = (−1 ; 1 ; 0 ; 0), b₂ = (−1 ; 0 ; 1 ; 0), b₃ = (−3 ; 0 ; 0 ; 1) de W | c₁ = b₁ (0,5) ; c₂ = b₂ − ½c₁ = (−½ ; −½ ; 1 ; 0), remis à l'échelle en (−1 ; −1 ; 2 ; 0) (1,5) ; b₃ · c₁ = 3, b₃ · c₂ = 3, donc c₃ = b₃ − (3/2)c₁ − (3/6)c₂ = (−1 ; −1 ; −1 ; 1) (2) | 4 |
| (b) Polynôme caractéristique de A | `L1 ← L1 − L2` et `L2 ← L2 − L3` sortent (2 − t)² (1) ; `C2 ← C2 + C1`, `C3 ← C3 + C2` donnent une matrice triangulaire par blocs (1) ; (5 − t)(11 − t) − 27 = (t − 2)(t − 14), d'où (t − 2)³(t − 14) (1) | 3 |
| (c) Bases orthonormées de E₂ et E₁₄ | E₂ = Ker(A − 2I) = W (A − 2I = nnᵀ avec n = (1 ; 1 ; 1 ; 3)) (1) ; c₁/√2, c₂/√6, c₃/2 (1) ; E₁₄ = Span{n}, n/(2√3) (1) | 3 |
| (d) Base C et matrice orthogonale U | U = [c₁/√2, c₂/√6, c₃/2, n/(2√3)] | 2 |
| (e) Formule et forme diagonale | D = UᵀAU = diag(2, 2, 2, 14), dans l'ordre des colonnes de U (1) ; A = UDUᵀ (1) | 2 |

Pièges suivis : `l_orthodiag_no_gs`, `l_orthodiag_no_normalize`, `l_pd_order`, `g4_proj_no_square`, `l_det_scale_row`.

### 5. Récurrence linéaire (8 points ; partie spécifique MT)

u₀ = 0, u₁ = 5 et u_{k+2} = u_{k+1} + 6u_k. Trouver u_k et la limite de u_k/3ᵏ.

| Étape | Ce qu'on attend | Points |
|---|---|---|
| Matrice | x_k = (u_{k+1} ; u_k), x_{k+1} = Mx_k avec M = `[[1, 6], [1, 0]]` | 1 |
| Valeurs et vecteurs propres | λ² − λ − 6 = (λ − 3)(λ + 2) ; v₁ = (3 ; 1), v₂ = (−2 ; 1) | 2 |
| Décomposer x₀ = (5 ; 0) | c₁(3 ; 1) + c₂(−2 ; 1) = (5 ; 0) ⇒ c₁ = 1, c₂ = −1 | 2 |
| Formule | x_k = 3ᵏ(3 ; 1) − (−2)ᵏ(−2 ; 1), donc u_k = 3ᵏ − (−2)ᵏ ; contrôle u₂ = 5, u₃ = 35 | 2 |
| Limite | u_k/3ᵏ = 1 − (−2/3)ᵏ → 1 | 1 |

Pièges suivis : `l_powers_entrywise`, `l_pdp_inverse_side`, `l_charpoly_sign`, `l_pd_order`.

### 6. Six vrai/faux avec contre-exemple (6 × 1 point ; partie commune)

| Énoncé | Réponse | Contre-exemple attendu (`counter`) |
|---|---|---|
| Pour A, B de taille 2 × 2, det(A + B) = det A + det B. | Faux | `matPair` : A = B = I₂ |
| Si A est 4 × 4 et dim Ker A = 1, alors dim Col A = 3. | Vrai | — |
| Une matrice 3 × 3 qui a une valeur propre double n'est pas diagonalisable. | Faux | `matOne` `diagRepeated` : diag(1, 1, 2) |
| Si les colonnes de Q sont orthogonales et non nulles, Q⁻¹ = Qᵀ. | Faux | `matOne` `orthCols` : 2I₂ |
| Si AᵀA est inversible, les colonnes de A sont linéairement indépendantes. | Vrai | — |
| Si u ⊥ v et v ⊥ w, alors u ⊥ w. | Faux | `vecFamily` `orthNotTransitive` : u = w = e₁, v = e₂ |

Barème : +1 juste, 0 vide, −1 faux. Hors examen, une réponse « faux » juste sans contre-exemple valable donne la moitié du crédit BKT.

---

# M. Analyse matricielle

Unité `matrices` · préfixe `m-` · pièges `m_` · Statut : à faire

> **Portée : niveau BA4 seulement.** Ce module rassemble ce que les cours de BA4 utilisent sans le réenseigner. **Ne sont pas ici** et vont dans le plan séparé `plan-ba5-et-plus.md` : la forme d'état avec entrée et sortie (B, C, D), les fonctions de transfert, la commandabilité et l'observabilité, le placement de pôles (Ackermann) et les observateurs, l'équation de Lyapunov, l'ACP, le filtre de Kalman et la non-normalité. On garde seulement la matrice compagne d'une EDO **homogène** (x = (y ; ẏ), sans entrée), parce qu'elle relie les EDO de A2 aux systèmes x′ = Ax.
>
> **Partage avec N.** Cholesky, la méthode de la puissance, le quotient de Rayleigh, les normes et le conditionnement appartiennent à M. Le catalogue N y renvoie par ses prérequis (`m-cholesky`, `m-power-method`, `m-rayleigh`, `m-norms`, `m-cond`) et ne les redéfinit pas. Pour éviter un cycle, aucune compétence M n'a de prérequis dans N.

**Sources** : Analyse numérique et optimisation (BA4, résumé de cours 2022 ; examens 2019 à 2021, avec la ligne de code « Cholesky tridiagonale ») ; ME-221 Systèmes dynamiques (cours et séries 2018) ; EE-209 Statistique pour data science, partie 6 (régression linéaire) ; annexe « Calcul dérivatif pour vecteurs et matrices » (2022) ; algèbre linéaire GM, série 14 (Schur, décomposition spectrale, SVD) ; séries MT 13 et 14 ; partie spécifique MT 2016 (uuᵀ).

**Notation** :
- ẋ = dx/dt ; système discret x_{k+1} = Ax_k, aussi écrit x⁺ = Ax.
- e^{At} est l'exponentielle de matrice ; elle se saisit `exp(A t)` ou `e^(At)`.
- Normes : ‖·‖₁, ‖·‖₂, ‖·‖∞, ‖·‖_F ; κ(A) = ‖A‖·‖A⁻¹‖, et κ veut dire κ₂ sans indice.
- R(x) = xᵀAx / xᵀx est le quotient de Rayleigh.
- « A définie positive » ; l'écriture A ≻ 0 est acceptée.
- Le gradient est un vecteur colonne.
- ρ(A) est le rayon spectral.

**Prérequis extérieurs** :
- `a1-pow-sums`.
- `a2-partials`, `a2-crit-points`, `a2-ode-const2`.
- `p-moments`.
- `g8-polar`.
- Toutes les compétences de L citées par leur id.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g8-polar`, `a1-pow-sums`, `l-det-props`, `l-eig-charpoly`, `l-eig-diag`, `l-eig-powers`, `l-mat-blocks`, `l-mat-lu`, `l-orth-lsq`, `l-orth-proj`, `l-svd-compute`, `l-sym-orthodiag`, `l-sym-quadform`, `l-vs-rank`, `a2-hessian-2x2`, `a2-ode-const2`, `a2-partials`, `p-lin-combo`.

**Examen** : aucun plan d'examen ne porte sur M (voir les lacunes). Les variantes `mcq`, `tf`, `coef`, `open` servent aux révisions et peuvent entrer dans le pool de `ba4-numerique` pour les compétences partagées avec N.

Les générateurs réutilisent les aides de L (`unimodular`, `pdp`, `orthRational`, `svdReverse`…). Années : toutes `year: 16`.

## Compétences

### `m-blocks-schur` — Blocs et complément de Schur
- **Année** 16 · **Prérequis** `l-mat-blocks`, `l-det-props` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-mat-blocks` : produit par blocs.
- **Intro** : si A₁₁ est inversible, A = `[[A₁₁, A₁₂], [A₂₁, A₂₂]]` = `[[I, 0], [X, I]]`·`[[A₁₁, 0], [0, S]]`·`[[I, Y], [0, I]]`, avec X = A₂₁A₁₁⁻¹, Y = A₁₁⁻¹A₁₂ et **S = A₂₂ − A₂₁A₁₁⁻¹A₁₂** (complément de Schur). Donc det A = det A₁₁ · det S, et A est inversible si et seulement si S l'est. Pour un système KKT `[[H, Cᵀ], [C, 0]]`, S = −CH⁻¹Cᵀ. Exemple : `[[2, 1, 1], [1, 1, 0], [1, 1, 3]]` avec A₁₁ 2 × 2 → S = 3, det A = 1·3 = 3.
- **Juge** : `value` sur les blocs X, Y, S (grilles séparées) puis sur det A ou sur un bloc de A⁻¹ · **Forme finale** : S, la factorisation, ou la valeur demandée ; `askCoef` au format examen.
- **Niveaux** :
  - L1 (guidé) : A₁₁⁻¹ donnée ; X, Y et S à trous.
  - L2 : l'élève choisit la formule de S parmi 3 (bon ordre, ordre inversé, signe +).
  - L3 (choisir l'action) : « inverser A₁₁ », « calculer S », « det par blocs », « résoudre par élimination de blocs ».
  - L4 (libre) : résoudre `[[A₁₁, A₁₂], [A₂₁, A₂₂]]·(x ; y) = (f ; g)` par S : Sy = g − A₂₁A₁₁⁻¹f, puis x.
  - L5 (seul) : système KKT 3 × 3 (H 2 × 2, une contrainte), ou la preuve « A₁₁ et A inversibles ⇒ S inversible » en blocs (`l-proof-matrices`), sans aide.
- **Générateur** : A₁₁ = `unimodular(2)`, A₁₂ et A₂₁ à coefficients dans [−2 ; 2], S choisi entier non nul (|S| ≤ 5, ou 2 × 2 de det ±1, ±2), puis A₂₂ = S + A₂₁A₁₁⁻¹A₁₂. Gabarits : (a) S et det ; (b) factorisation complète ; (c) système par blocs ; (d) KKT.
- **Corrigé type** : A = `[[2, 1, 1], [1, 1, 0], [1, 1, 3]]`, A₁₁ = `[[2, 1], [1, 1]]`, A₁₂ = (1 ; 0), A₂₁ = (1, 1), A₂₂ = 3.
  1. A₁₁⁻¹ = `[[1, −1], [−1, 2]]` — *inverser le bloc*
  2. Y = A₁₁⁻¹A₁₂ = (1 ; −1) ; X = A₂₁A₁₁⁻¹ = (0, 1) — *facteurs*
  3. S = 3 − (1, 1)·(1 ; −1) = 3 — *complément de Schur*
  4. det A = det A₁₁ · S = 1·3 = 3 — *déterminant par blocs*
- **Aides** : 1 « Élimine le bloc A₂₁ comme une ligne de Gauss : S est ce qui reste en bas à droite. » · 2 `S = 3 − (1, 1)·(□ ; □)` · 3 S.
- **Variantes d'examen** : `coef` S ou un bloc de A⁻¹ = `[[A₁₁⁻¹ + YS⁻¹X, −YS⁻¹], [−S⁻¹X, S⁻¹]]` ; `mcq` (distracteurs : `m_schur_order`, `m_schur_sign`, `l_blocks_inverse_each`). `tf` : « Si A₁₁ et A sont inversibles, S est inversible » (vrai) ; « det A = det A₁₁ · det A₂₂ » (faux : `matOne` 3 × 3).
- **Pièges** : `m_schur_order`, `m_schur_sign`, `l_blocks_inverse_each`, `l_blocks_order`.
- **Sous-buts → crédit** : inverser le bloc → `l-mat-inverse` ; S → `m-blocks-schur` ; det → `l-det-props`.

### `m-rank1-proj` — Matrices de rang 1 et projecteurs
- **Année** 16 · **Prérequis** `l-orth-proj`, `l-vs-rank` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-vs-rank` : rang 1 : toutes les lignes sont proportionnelles.
- **Intro** : uvᵀ (u, v ≠ 0) est de rang 1 : toutes ses lignes sont proportionnelles à vᵀ. P = uuᵀ/(uᵀu) est la projection orthogonale sur Span{u} : P² = P, Pᵀ = P, ses valeurs propres sont 1 (une fois) et 0, et tr P = rang P = 1. I − P projette sur u⊥, et H = I − 2P est la symétrie par rapport à u⊥ (Householder). Plus généralement, la projection sur Col A (colonnes libres) est A(AᵀA)⁻¹Aᵀ. Exemple : u = (1 ; 1)/√2 → P = ½`[[1, 1], [1, 1]]`, P² = P.
- **Juge** : `value` sur les matrices et les vecteurs ; contrôles P² = P et Pᵀ = P · **Forme finale** : P (ou H) exacte, puis Py demandé.
- **Niveaux** :
  - L1 (guidé) : uuᵀ à trous, puis division par uᵀu.
  - L2 : l'élève choisit entre uuᵀ et uuᵀ/(uᵀu) selon que u est unitaire ou non.
  - L3 (choisir l'action) : P, puis I − P, puis H, puis Py.
  - L4 (libre) : projection sur un plan de ℝ³ par A(AᵀA)⁻¹Aᵀ ; spectre et rang de P.
  - L5 (seul) : preuve « uuᵀ est la projection sur Span{u} » en 4 blocs (partie spécifique MT 2016, voir `l-proof-spectral`), puis un calcul, sans aide.
- **Générateur** : u entier de norme entière ((1, 2, 2), (2, 3, 6), (1, 4, 8), (2, 1, 2)) ou non entière ((1, 1), (1, 2)) ; y entier. Gabarits : (a) projecteur ; (b) symétrie de Householder ; (c) projection sur Col A ; (d) vrai/faux.
- **Corrigé type** : u = (1 ; 2 ; 2), y = (3 ; 0 ; 3).
  1. uᵀu = 9, P = (1/9)·`[[1, 2, 2], [2, 4, 4], [2, 4, 4]]` — *projecteur*
  2. Py = u·(u · y)/9 = (9/9)(1 ; 2 ; 2) = (1 ; 2 ; 2) — *projeter sans former P*
  3. (I − P)y = (2 ; −2 ; 1), orthogonal à u — *composante orthogonale*
  4. H = I − 2P = (1/9)·`[[7, −4, −4], [−4, 1, −8], [−4, −8, 1]]`, Hy = (1 ; −4 ; −1), ‖Hy‖ = ‖y‖ = √18 — *symétrie*
- **Aides** : 1 « P = uuᵀ/(uᵀu) ; pour Py, calcule d'abord le nombre u · y. » · 2 `P = (1/□)·uuᵀ` · 3 P.
- **Variantes d'examen** : `mcq` P ou Py (distracteurs : `g4_proj_no_square`, `m_householder_factor`). `coef` pᵢⱼ. `tf` : « Un projecteur orthogonal est inversible » (faux, sauf P = I) ; « Les valeurs propres d'un projecteur sont 0 et 1 » (vrai) ; « tr(uuᵀ) = ‖u‖² » (vrai).
- **Pièges** : `g4_proj_no_square`, `m_householder_factor`.
- **Sous-buts → crédit** : produit uuᵀ → `l-mat-product` ; projection → `l-orth-proj` ; projecteur → `m-rank1-proj`.

### `m-spectral` — Décomposition spectrale et fonctions de matrices symétriques
- **Année** 16 · **Prérequis** `l-sym-orthodiag`, `m-rank1-proj` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : A symétrique = Σ λᵢuᵢuᵢᵀ, avec (uᵢ) orthonormée : une somme de projecteurs pondérés par les valeurs propres. Pour une fonction f, f(A) = Σ f(λᵢ)uᵢuᵢᵀ : Aᵏ, A⁻¹ (si aucun λᵢ n'est nul), √A (si tous les λᵢ ≥ 0), e^A. **Ce n'est pas f appliquée case par case.** Exemple : A = `[[5, 4], [4, 5]]` → √A = `[[2, 1], [1, 2]]`.
- **Juge** : `factor` `{A, kind: 'spectral'}` pour la décomposition, puis `value` sur f(A) ; contrôle (√A)² = A · **Forme finale** : décomposition et f(A).
- **Niveaux** :
  - L1 (guidé) : valeurs et vecteurs propres donnés ; projecteurs uᵢuᵢᵀ à trous.
  - L2 : l'élève choisit entre « f sur les valeurs propres » et « f sur les cases » (refusé avec le message de `m_spectral_entrywise`).
  - L3 (choisir l'action) : orthodiagonaliser, former les projecteurs, combiner.
  - L4 (libre) : 3 × 3 (`[[5, −4, −2], [−4, 5, 2], [−2, 2, 2]]`, série GM 14) ; A⁻¹ par la décomposition.
  - L5 (seul) : spectre et polynôme caractéristique de A = Σ λᵢvᵢvᵢᵀ (2018 Q11), puis √A ou A⁻¹, sans aide.
- **Générateur** : Q = `orthRational(2 ou 3)`, valeurs propres carrés parfaits (pour √A) ou entières non nulles (pour A⁻¹), A = QDQᵀ ; on garde les A entières. Gabarits : (a) décomposition ; (b) √A ; (c) A⁻¹ ou Aᵏ ; (d) spectre d'une somme de projecteurs.
- **Corrigé type** : A = `[[5, 4], [4, 5]]`.
  1. λ = 9 avec u₁ = (1 ; 1)/√2, λ = 1 avec u₂ = (1 ; −1)/√2 — *orthodiagonaliser*
  2. A = 9·½`[[1, 1], [1, 1]]` + 1·½`[[1, −1], [−1, 1]]` — *décomposition spectrale*
  3. √A = 3·½`[[1, 1], [1, 1]]` + 1·½`[[1, −1], [−1, 1]]` = `[[2, 1], [1, 2]]` — *f sur les valeurs propres*
  4. Contrôle : `[[2, 1], [1, 2]]²` = `[[5, 4], [4, 5]]` — *vérifier*
- **Aides** : 1 « Remplace chaque λᵢ par f(λᵢ) et garde les projecteurs. » · 2 `√A = □·u₁u₁ᵀ + □·u₂u₂ᵀ` · 3 √A.
- **Variantes d'examen** : `mcq` (distracteurs : `m_spectral_entrywise` → `[[√5, 2], [2, √5]]`, `l_orthodiag_no_normalize`). `tf` : « Toute matrice symétrique a une racine carrée réelle symétrique » (faux : `[[−1, 0], [0, 1]]`) ; « Les projecteurs uᵢuᵢᵀ de la décomposition sont deux à deux de produit nul » (vrai).
- **Pièges** : `m_spectral_entrywise`, `l_orthodiag_no_normalize`.
- **Sous-buts → crédit** : orthodiagonaliser → `l-sym-orthodiag` ; projecteurs → `m-rank1-proj` ; f(A) → `m-spectral`.

### `m-posdef` — Matrices définies positives : critères
- **Année** 16 · **Prérequis** `l-sym-quadform`, `m-spectral` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `m-spectral` : xᵀAx = Σ λᵢ(uᵢ · x)².
- **Intro** : pour A symétrique, ces énoncés sont équivalents : xᵀAx > 0 pour tout x ≠ 0 ; toutes les valeurs propres > 0 ; tous les mineurs principaux dominants > 0 (Sylvester) ; tous les pivots de Gauss sans échange > 0 ; A = LLᵀ avec L inversible. Définie négative : −A définie positive (les mineurs alternent : < 0, > 0, < 0…). **Pour « semi-définie », les mineurs dominants ≥ 0 ne suffisent pas.** Exemple : `[[2, −1, 0], [−1, 2, −1], [0, −1, 2]]` → mineurs 2, 3, 4.
- **Juge** : `value` sur les mineurs, les pivots ou les valeurs propres ; décision à 5 options (définie positive, semi-définie positive, définie négative, semi-définie négative, indéfinie) ; `solset` `{v: 'a'}` pour un paramètre · **Forme finale** : nature justifiée par un critère, ou ensemble des a.
- **Niveaux** :
  - L1 (guidé) : mineurs à trous, puis décision.
  - L2 : l'élève choisit le critère le plus court (2 × 2 : det et a₁₁ ; 3 × 3 tridiagonale : pivots).
  - L3 (choisir l'action) : un critère, puis un second pour contrôler.
  - L4 (libre) : écrire xᵀAx comme somme de carrés (complétion du carré) ; paramètre a.
  - L5 (seul) : `[[1, a], [a, 4]]` et une 3 × 3 avec paramètre, plus un vrai/faux sur la semi-définie, sans aide.
- **Générateur** : A = QDQᵀ ou LLᵀ (L entière) pour les définies positives ; leurres : diagonale positive avec |a₁₂| grand ; matrices à mineurs ≥ 0 mais indéfinies (`[[0, 0], [0, −1]]`, `[[1, 1, 0], [1, 1, 0], [0, 0, −1]]`). Paramètre : une case hors diagonale vaut a, la condition est |a| < c. Gabarits : (a) nature ; (b) paramètre ; (c) somme de carrés ; (d) vrai/faux.
- **Corrigé type** : A = `[[2, −1, 0], [−1, 2, −1], [0, −1, 2]]`.
  1. Δ₁ = 2, Δ₂ = 4 − 1 = 3, Δ₃ = det A = 2·3 + 1·(−2) = 4 — *mineurs dominants*
  2. Tous > 0 : définie positive (Sylvester) — *conclure*
  3. Contrôle : xᵀAx = x₁² + (x₁ − x₂)² + (x₂ − x₃)² + x₃² > 0 si x ≠ 0 — *somme de carrés*
- **Aides** : 1 « Calcule les déterminants des coins en haut à gauche, de taille 1, 2, 3. » · 2 `Δ₂ = 2·2 − □` · 3 la conclusion.
- **Variantes d'examen** : `mcq` nature ou « définie positive si et seulement si a ∈ … » (distracteurs : `l_posdef_diag`, `m_sylvester_semidef`, `m_sylvester_negdef`). `tf` : « Si les mineurs dominants sont ≥ 0, A est semi-définie positive » (faux : `[[0, 0], [0, −1]]`) ; « Une matrice définie positive est inversible » (vrai) ; « AᵀA est semi-définie positive pour toute A » (vrai).
- **Pièges** : `l_posdef_diag`, `m_sylvester_semidef`, `m_sylvester_negdef`.
- **Sous-buts → crédit** : mineurs → `l-det-cofactor` ; nature → `m-posdef` ; somme de carrés → `l-sym-quadform`.

### `m-cholesky` — Factorisation de Cholesky pas à pas
- **Année** 16 · **Prérequis** `m-posdef`, `l-mat-lu` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `m-posdef` : Cholesky n'existe que si A est définie positive.
- **Intro** : si A est symétrique définie positive, il existe une unique L triangulaire inférieure à diagonale > 0 telle que A = LLᵀ. Colonne par colonne : ℓ₁₁ = √a₁₁ ; ℓᵢ₁ = aᵢ₁/ℓ₁₁ ; ℓₖₖ = √(aₖₖ − Σ_{j<k} ℓₖⱼ²) ; ℓᵢₖ = (aᵢₖ − Σ_{j<k} ℓᵢⱼℓₖⱼ)/ℓₖₖ. Si une racine d'un nombre ≤ 0 apparaît, A n'est pas définie positive. On résout Ax = b par Ly = b puis Lᵀx = y. Pour une tridiagonale, le coût est O(n) (ligne de code des examens de N). Exemple : `[[4, 2], [2, 5]]` → L = `[[2, 0], [1, 2]]`.
- **Juge** : `value` sur chaque ℓᵢⱼ (une ligne par coefficient, dans l'ordre colonne par colonne), puis `factor` `{A, kind: 'cholesky'}` · **Forme finale** : L ; `askCoef` ℓᵢⱼ au format examen.
- **Niveaux** :
  - L1 (guidé) : formules affichées, valeurs à trous.
  - L2 : l'élève choisit l'ordre (colonne par colonne) et la formule de chaque case.
  - L3 (choisir l'action) : « racine sur la diagonale », « division sous la diagonale ».
  - L4 (libre) : 3 × 3 complète, puis résolution de Ax = b.
  - L5 (seul) : seulement ℓ₃₂, ou « A est-elle définie positive ? » via l'échec de Cholesky, sans aide.
- **Générateur** : L entière, diagonale dans {1, 2, 3}, coefficients sous la diagonale dans [−2 ; 3] ; A = LLᵀ. Leurre (niveau 5) : modifier a₃₃ pour que ℓ₃₃² ≤ 0. Gabarits : (a) L ; (b) un coefficient ; (c) résoudre Ax = b ; (d) tester la définie positivité.
- **Corrigé type** : A = `[[4, 2, −2], [2, 10, 5], [−2, 5, 6]]`.
  1. ℓ₁₁ = √4 = 2 ; ℓ₂₁ = 2/2 = 1 ; ℓ₃₁ = −2/2 = −1 — *première colonne*
  2. ℓ₂₂ = √(10 − 1²) = 3 ; ℓ₃₂ = (5 − (−1)·1)/3 = 2 — *deuxième colonne*
  3. ℓ₃₃ = √(6 − (−1)² − 2²) = 1 — *dernière case*
  4. L = `[[2, 0, 0], [1, 3, 0], [−1, 2, 1]]`, contrôle LLᵀ = A — *vérifier*
- **Aides** : 1 « Sur la diagonale : racine de ce qui reste ; dessous : division par le pivot de la colonne. » · 2 `ℓ₃₂ = (5 − □·□)/3` · 3 la valeur.
- **Variantes d'examen** : `coef` ℓᵢⱼ ; `mcq` (distracteurs : `m_chol_no_sqrt`, `m_chol_sum_sign`, `l_coef_index_swap`). `tf` : « Toute matrice symétrique inversible a une factorisation de Cholesky » (faux : `[[1, 2], [2, 1]]`) ; « det A = (Π ℓᵢᵢ)² » (vrai).
- **Pièges** : `m_chol_no_sqrt`, `m_chol_sum_sign`, `l_coef_index_swap`.
- **Sous-buts → crédit** : première colonne → `m-cholesky` ; résoudre Ly = b → `l-mat-lu`.

### `m-quad-gradient` — Gradient et hessienne d'une forme quadratique
- **Année** 16 · **Prérequis** `m-posdef`, `a2-partials`, `a2-hessian-2x2` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a2-hessian-2x2` : nature du point stationnaire par la hessienne.
- **Intro** : pour f(x) = ½xᵀAx − bᵀx + c avec A symétrique : ∇f = Ax − b, Hess f = A. Le point stationnaire résout Ax = b ; c'est un minimum global si A est définie positive, et f(x*) = c − ½bᵀx*. Si M n'est pas symétrique, xᵀMx = xᵀ((M + Mᵀ)/2)x et ∇(xᵀMx) = (M + Mᵀ)x. Exemple : f(x, y) = x² + xy + 2y² − 3x − 5y → A = `[[2, 1], [1, 4]]`, b = (3 ; 5).
- **Juge** : `value` sur A et b ; `equiv` `{vars: ['x', 'y']}` composante par composante pour ∇f ; `value` sur x* et f(x*) · **Forme finale** : ∇f, Hess f, x* et la nature.
- **Niveaux** :
  - L1 (guidé) : A à trous (la diagonale porte le double du coefficient de x², la case hors diagonale le coefficient de xy).
  - L2 : l'élève choisit entre Ax − b, 2Ax − b et ½Ax − b.
  - L3 (choisir l'action) : A, b, ∇f, résoudre, nature.
  - L4 (libre) : 3 variables ; ou M non symétrique.
  - L5 (seul) : minimiser ‖Ax − b‖² en écrivant f = xᵀAᵀAx − 2bᵀAx + bᵀb (retrouver les équations normales), sans aide.
- **Générateur** : A = LLᵀ ou `pdp` symétrique, x* entier, b = Ax* ; une fois sur 4, A indéfinie (point selle). Gabarits : (a) f en coordonnées ; (b) f en écriture matricielle ; (c) M non symétrique ; (d) moindres carrés.
- **Corrigé type** : f(x, y) = x² + xy + 2y² − 3x − 5y.
  1. f = ½(x ; y)ᵀ`[[2, 1], [1, 4]]`(x ; y) − (3 ; 5)ᵀ(x ; y) — *forme matricielle*
  2. ∇f = (2x + y − 3 ; x + 4y − 5), Hess f = `[[2, 1], [1, 4]]` — *gradient, hessienne*
  3. `[[2, 1], [1, 4]]`x = (3 ; 5) ⇒ x* = (1 ; 1) — *point stationnaire*
  4. 2 > 0 et det = 7 > 0 : minimum global, f(1, 1) = −½·(3 + 5) = −4 — *nature et valeur*
- **Aides** : 1 « Écris f = ½xᵀAx − bᵀx : alors ∇f = Ax − b. » · 2 `A = [[2, □], [□, 4]]` · 3 ∇f.
- **Variantes d'examen** : `mcq` ∇f ou x* (distracteurs : `m_grad_factor`, `m_grad_nonsym`). `tf` : « ∇(xᵀMx) = 2Mx pour toute M carrée » (faux : `matOne` non symétrique) ; « Si A est définie positive, ½xᵀAx − bᵀx a un unique minimum » (vrai).
- **Pièges** : `m_grad_factor`, `m_grad_nonsym`, `l_quadform_offdiag`.
- **Sous-buts → crédit** : gradient → `a2-partials` ; résoudre → `l-mat-inverse` ; nature → `m-posdef`.

### `m-normal-eq` — Équations normales, matrice de design, Var(β̂)
- **Année** 16 · **Prérequis** `l-orth-lsq`, `m-quad-gradient`, `p-lin-combo` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `m-quad-gradient` : annuler le gradient de ‖y − Xβ‖² ; `p-lin-combo` : Var(Mε) = M·Var(ε)·Mᵀ.
- **Intro** : modèle y = Xβ + ε. La matrice de design X (n × p) a une ligne par observation : une colonne de 1 pour l'ordonnée à l'origine, une colonne par variable (ou xᵢ, xᵢ² pour un polynôme). β̂ minimise ‖y − Xβ‖² ; le gradient 2Xᵀ(Xβ − y) s'annule : XᵀXβ̂ = Xᵀy. Si les εᵢ sont indépendants de variance σ², Var(β̂) = σ²(XᵀX)⁻¹ ; on estime σ² par RSS/(n − p). Exemple : x centrés (−2, −1, 0, 1, 2) → XᵀX = diag(5, 10) : les deux coefficients se calculent séparément.
- **Juge** : `value` sur X, XᵀX, Xᵀy, β̂, puis σ̂² et Var̂(β̂ⱼ) · **Forme finale** : β̂, et la variance demandée.
- **Niveaux** :
  - L1 (guidé) : X à trous à partir du tableau de données.
  - L2 : l'élève choisit les colonnes de X selon le modèle (droite, parabole, deux variables).
  - L3 (choisir l'action) : X, normales, β̂, résidus, σ̂², Var̂.
  - L4 (libre) : modèle quadratique y = β₀ + β₁x + β₂x² à 4 ou 5 points.
  - L5 (seul) : régression complète avec interprétation (quel coefficient est le plus précis ?), sans aide.
- **Générateur** : x entiers centrés (XᵀX diagonale aux niveaux 1 à 3) ou non ; β̂ entier ou en demis ; résidus r ∈ Ker Xᵀ entiers ou en demis (`lsqReverse`). Gabarits : (a) droite ; (b) parabole ; (c) Var(β̂) seulement, XᵀX donnée ; (d) vrai/faux.
- **Corrigé type** : x = (−2, −1, 0, 1, 2), y = (1, 1, 2, 4, 2), modèle y = β₀ + β₁x.
  1. X = `[[1, −2], [1, −1], [1, 0], [1, 1], [1, 2]]` — *matrice de design*
  2. XᵀX = `[[5, 0], [0, 10]]`, Xᵀy = (10 ; 5) — *équations normales*
  3. β̂ = (2 ; 1/2) — *résoudre*
  4. Résidus (0 ; −1/2 ; 0 ; 3/2 ; −1), RSS = 7/2, σ̂² = (7/2)/(5 − 2) = 7/6 — *variance résiduelle*
  5. Var̂(β̂₁) = σ̂²·(XᵀX)⁻¹₂₂ = (7/6)/10 = 7/60 — *variance de l'estimateur*
- **Aides** : 1 « Une ligne de X par observation ; puis XᵀXβ = Xᵀy. » · 2 `XᵀX = [[5, □], [□, 10]]` · 3 β̂.
- **Variantes d'examen** : `mcq` β̂ⱼ ou Var(β̂ⱼ) (distracteurs : `l_lsq_normal_aat`, `m_var_no_inverse`, `p_reg_sigma_n`). `tf` : « Si les colonnes de X sont orthogonales, les β̂ⱼ se calculent séparément » (vrai) ; « Var(β̂) = σ²XᵀX » (faux).
- **Pièges** : `l_lsq_normal_aat`, `m_var_no_inverse`, `p_reg_sigma_n`, `l_lsq_line_swap`.
- **Sous-buts → crédit** : X → `m-normal-eq` ; normales → `l-orth-lsq` ; variance → `m-normal-eq`.

### `m-rayleigh` — Quotient de Rayleigh
- **Année** 16 · **Prérequis** `m-spectral` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `m-spectral` : décomposer x sur les vecteurs propres.
- **Intro** : pour A symétrique, R(x) = xᵀAx/xᵀx vérifie λ_min ≤ R(x) ≤ λ_max, avec égalité aux vecteurs propres. Le maximum de xᵀAx sur la sphère unité vaut λ_max. Si x est proche d'un vecteur propre à ε près, R(x) est proche de la valeur propre à ε² près : c'est une bonne estimation. Exemple : A = `[[3, 1], [1, 3]]`, x = (2 ; 1) → R = 19/5, entre 2 et 4.
- **Juge** : `value` · **Forme finale** : nombre exact, avec l'encadrement.
- **Niveaux** :
  - L1 (guidé) : Ax, xᵀAx et xᵀx à trous.
  - L2 : l'élève choisit le dénominateur (xᵀx ou ‖x‖).
  - L3 (choisir l'action) : R(x), puis encadrement par les valeurs propres.
  - L4 (libre) : max et min de xᵀAx sous ‖x‖ = 1, avec les points où ils sont atteints.
  - L5 (seul) : comparer R(x) et le rapport de composantes pour un vecteur proche d'un vecteur propre, sans aide.
- **Générateur** : `orthRational` + D entière ; x entier non propre. Gabarits : (a) R(x) ; (b) encadrement ; (c) max et min sur la sphère.
- **Corrigé type** : A = `[[3, 1], [1, 3]]`, x = (2 ; 1).
  1. Ax = (7 ; 5) — *produit*
  2. xᵀAx = 14 + 5 = 19, xᵀx = 5, R(x) = 19/5 — *quotient*
  3. λ = 2 et 4 : 2 ≤ 19/5 ≤ 4 — *encadrer*
- **Aides** : 1 « Numérateur xᵀ(Ax), dénominateur xᵀx. » · 2 `R = □/5` · 3 la valeur.
- **Variantes d'examen** : `mcq` (distracteurs : `m_rayleigh_no_denominator` → 19, √5 au dénominateur). `tf` : « R(x) ≤ λ_max pour tout x ≠ 0 » (vrai, A symétrique).
- **Pièges** : `m_rayleigh_no_denominator`.
- **Sous-buts → crédit** : produit → `l-mat-product` ; quotient → `m-rayleigh`.

### `m-power-method` — Méthode de la puissance et puissance inverse
- **Année** 16 · **Prérequis** `m-rayleigh`, `l-eig-powers` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-eig-powers` : Aᵏy₀ = Σ cᵢλᵢᵏvᵢ.
- **Intro** : on part de y₀ ≠ 0, puis z = Ay_k et y_{k+1} = z divisé par sa composante de plus grand module. Si |λ₁| > |λ₂|, μ_k = z/y_k (sur une composante) tend vers λ₁, et l'erreur est multipliée à peu près par |λ₂/λ₁| à chaque pas (par |λ₂/λ₁|² avec le quotient de Rayleigh, pour A symétrique). Puissance inverse avec décalage σ : on résout (A − σI)z = y_k (par LU, sans inverser) ; μ_k tend vers 1/(λ − σ) pour la valeur propre λ la plus proche de σ, donc λ = σ + 1/μ. Exemple : A = `[[3, 1], [1, 3]]`, y₀ = (1 ; 0) → μ = 3, 10/3, 18/5, 34/9 → 4.
- **Juge** : item `table` avec le juge `iter` `{phi: 'y ↦ Ay / (Ay)ᵢ', cols: ['k', 'y_k', 'Ay_k', 'μ_k'], tol: 1e-6}` : chaque ligne est recalculée à partir de la ligne précédente de l'élève ; colonne dérivée μ_k. Puis `readtable` pour lire le rapport · **Forme finale** : nombre de lignes demandé, puis λ estimée et vitesse.
- **Niveaux** :
  - L1 (guidé) : deux premières lignes données, la troisième à trous.
  - L2 : l'élève choisit la normalisation (composante max) et la composante pour μ.
  - L3 (choisir l'action) : itérer, puis estimer par Rayleigh, puis donner la vitesse.
  - L4 (libre) : puissance inverse avec décalage, système résolu à chaque pas.
  - L5 (seul) : `readtable` : un tableau de μ_k ; l'élève lit λ₁ et le rapport |λ₂/λ₁|, puis complète une ligne de code `y = z / ???` (renvoi à N), sans aide.
- **Générateur** : A symétrique 2 × 2 ou 3 × 3 à valeurs propres entières de modules distincts, |λ₂/λ₁| ∈ {1/2, 1/3, 2/7, 2/3} ; y₀ un vecteur canonique non orthogonal au vecteur propre dominant. Gabarits : (a) puissance ; (b) puissance inverse ; (c) tableau à lire ; (d) vrai/faux.
- **Corrigé type** : A = `[[3, 1], [1, 3]]`, y₀ = (1 ; 0).
  1. Ay₀ = (3 ; 1), μ₀ = 3, y₁ = (1 ; 1/3) — *itération 1*
  2. Ay₁ = (10/3 ; 2), μ₁ = 10/3, y₂ = (1 ; 3/5) — *itération 2*
  3. Ay₂ = (18/5 ; 14/5), μ₂ = 18/5, y₃ = (1 ; 7/9) — *itération 3*
  4. Ay₃ = (34/9 ; 10/3), μ₃ = 34/9 ≈ 3,78 → λ₁ = 4, vecteur (1 ; 1) ; vitesse |λ₂/λ₁| = 1/2 — *conclure*
- **Aides** : 1 « Multiplie par A, puis divise par la plus grande composante. » · 2 `Ay₂ = (□ ; □)` · 3 la ligne.
- **Variantes d'examen** : `mcq` (distracteurs : `m_power_ratio`, `m_inverse_power_value`). `readtable`. `tf` : « La méthode de la puissance converge vers la plus petite valeur propre » (faux) ; « La puissance inverse sans décalage converge vers la valeur propre de plus petit module » (vrai).
- **Pièges** : `m_power_ratio`, `m_inverse_power_value`, `m_rayleigh_no_denominator`.
- **Sous-buts → crédit** : produit → `l-mat-product` ; itération → `m-power-method` ; Rayleigh → `m-rayleigh`.
- **Statut** : fait le 10 novembre 2026 (étape U8). Matrices symétriques 2 × 2 à valeurs propres entières, y₀ un vecteur de la base canonique (pas de 3 × 3 : les fractions grandissent trop vite). L1 : tableau (juge `iter`, phi `power` : chaque case recalculée à partir des cases de l'élève), lignes 0 et 1 données, ligne 2 à remplir, puis le QCM « vers quoi tendent les μₖ ? » ; L2 : les mêmes pas en lignes guidées, avec la décision de la normalisation (par la norme : juste, `quality: 'poor'`) ; L3 : une itération, R(y₁), la vitesse (menus) ; L4 : tableau de la puissance inverse avec décalage (z jugé comme solution de (A − σI)z = y), puis λ = σ + 1/μ ; L5 : un tableau de μₖ dans l'énoncé (λ₁, |λ₂/λ₁| à 0,02 près, λ₂), ou le problème de l'exemple d'examen 3. Les types `readtable` et `code` (« y = z / ??? ») viendront avec l'étape U9. QCM : la vitesse, ou la valeur trouvée par la puissance inverse ; `open` : l'exemple d'examen 3 (7 points) avec d'autres nombres. Vrai/faux faux : contre-exemples `mx` `powerDominant` et `powerFails` (valeurs propres λ et −λ).

### `m-svd-lowrank` — SVD en somme de rangs 1, approximation de rang k, image de la sphère
- **Année** 16 · **Prérequis** `l-svd-compute`, `m-rank1-proj` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : A = Σ σᵢuᵢvᵢᵀ. La meilleure approximation de rang k (pour ‖·‖₂ et ‖·‖_F) est A_k = Σ_{i≤k} σᵢuᵢvᵢᵀ, avec ‖A − A_k‖₂ = σ_{k+1} et ‖A − A_k‖_F = √(σ_{k+1}² + …). ‖A‖_F² = Σ aᵢⱼ² = Σ σᵢ². Stocker A_k coûte k(m + n + 1) nombres. L'image de la sphère unité est un ellipsoïde de demi-axes σᵢ selon les uᵢ, plein si le rang est plus petit que n (voir `l-svd-sphere`, branche MT de L). Exemple : A = `[[4, 5, 2], [0, 3, 6]]` → A₁ = `[[2, 4, 4], [2, 4, 4]]`, ‖A − A₁‖₂ = 3√2.
- **Juge** : `value` sur A_k (matrice) et sur les erreurs ; `factor` `{kind: 'SVD'}` si la SVD est à refaire · **Forme finale** : A_k, erreur, ou description de l'image.
- **Niveaux** :
  - L1 (guidé) : SVD donnée ; σ₁u₁v₁ᵀ à trous.
  - L2 : l'élève choisit quels termes garder (les plus grands σ).
  - L3 (choisir l'action) : A_k, puis les deux erreurs, puis le coût de stockage.
  - L4 (libre) : SVD à refaire, puis A₁ ; image de la sphère.
  - L5 (seul) : « compression » d'une 4 × 4 donnée par sa SVD : k minimal pour une erreur relative de Frobenius ≤ 10 %, sans aide.
- **Générateur** : `svdReverse` avec σ distincts ; pour les erreurs, σ choisis pour que Σσᵢ² soit entier. Gabarits : (a) A₁ ; (b) erreurs ; (c) k minimal ; (d) image de la sphère.
- **Corrigé type** : A = `[[4, 5, 2], [0, 3, 6]]`, σ₁ = 6√2, u₁ = (1 ; 1)/√2, v₁ = (1 ; 2 ; 2)/3, σ₂ = 3√2.
  1. A₁ = 6√2·(1 ; 1)/√2·(1, 2, 2)/3 = `[[2, 4, 4], [2, 4, 4]]` — *premier terme*
  2. A − A₁ = `[[2, 1, −2], [−2, −1, 2]]` = σ₂u₂v₂ᵀ — *reste*
  3. ‖A − A₁‖₂ = σ₂ = 3√2 ; ‖A − A₁‖_F = √18 = 3√2 (un seul terme restant) — *erreurs*
  4. ‖A‖_F² = 90 = 72 + 18 : A₁ garde 80 % de ‖A‖_F² — *part conservée*
- **Aides** : 1 « Garde les termes σᵢuᵢvᵢᵀ des plus grandes valeurs singulières. » · 2 `A₁ = 6√2·u₁v₁ᵀ = [[□, □, □], …]` · 3 A₁.
- **Variantes d'examen** : `mcq` erreur (distracteurs : `m_rankk_wrong_sigma`, σ₂², `l_svd_sigma_is_eig`). `tf` : « ‖A‖₂ = σ₁ » (vrai) ; « A_k s'obtient en mettant à 0 les plus petits coefficients de A » (faux).
- **Pièges** : `m_rankk_wrong_sigma`, `l_svd_sigma_is_eig`, `l_svd_sphere_boundary`.
- **Sous-buts → crédit** : SVD → `l-svd-compute` ; rang 1 → `m-rank1-proj` ; erreurs → `m-svd-lowrank`.
- **Statut** : fait le 10 novembre 2026 (étape U8). A = Σ sᵢpᵢqᵢᵀ avec des familles orthogonales entières (2 × 2, 2 × 3, 3 × 2, 3 × 3). L1 : A₁ (cases de la grille) et ‖A − A₁‖₂, la SVD donnée ; L2 : les termes écrits dans le désordre, décision « quel terme garder ? » ; L3 : A₁, les deux erreurs, le stockage (menus) ; L4 : σ₁ et v₁ par AᵀA, puis A₁ = Av₁v₁ᵀ et l'erreur (U n'est pas redemandée) ; L5 : k minimal pour une erreur relative de Frobenius ≤ 10, 20 ou 30 % d'une 4 × 4 donnée par ses valeurs singulières, puis ‖A − A_k‖₂. L'image de la sphère est un QCM (ellipse pleine ou courbe seule, piège `l_svd_sphere_boundary`), sans esquisse. Vrai/faux faux : `mx` `lowRankNotZeroing` (2 × 2) et `frobNotSigma` (3 × 3).

### `m-norms` — Normes matricielles
- **Année** 16 · **Prérequis** `l-svd-compute` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-svd-compute` : ‖A‖₂ = σ₁.
- **Intro** : normes subordonnées : ‖A‖₁ = maximum des sommes de |aᵢⱼ| **par colonne** ; ‖A‖∞ = maximum **par ligne** ; ‖A‖₂ = σ₁ = √λ_max(AᵀA) (= max |λᵢ| si A est symétrique). ‖A‖_F = √Σ aᵢⱼ² n'est pas subordonnée. Pour toute norme subordonnée : ‖Ax‖ ≤ ‖A‖‖x‖, ‖AB‖ ≤ ‖A‖‖B‖, ρ(A) ≤ ‖A‖. Exemple : A = `[[3, 0], [4, 5]]` → ‖A‖₁ = 7, ‖A‖∞ = 9.
- **Juge** : `value` (racines permises) · **Forme finale** : nombre exact.
- **Niveaux** :
  - L1 (guidé) : sommes par colonne et par ligne à trous.
  - L2 : l'élève associe chaque norme à sa règle (colonnes, lignes, σ₁, Frobenius).
  - L3 (choisir l'action) : les quatre normes d'une même matrice.
  - L4 (libre) : ‖A‖₂ d'une matrice non symétrique par AᵀA ; inégalités.
  - L5 (seul) : vrai/faux sur les normes et ρ(A), sans aide.
- **Générateur** : A 2 × 2 entière avec AᵀA à valeurs propres simples (on garde celles où λ_max est un carré ou un entier simple). Gabarits : (a) une norme ; (b) les quatre ; (c) vrai/faux.
- **Corrigé type** : A = `[[3, 0], [4, 5]]`.
  1. Colonnes : 3 + 4 = 7, 0 + 5 = 5 → ‖A‖₁ = 7 ; lignes : 3, 9 → ‖A‖∞ = 9 — *sommes*
  2. ‖A‖_F = √(9 + 16 + 25) = 5√2 — *Frobenius*
  3. AᵀA = `[[25, 20], [20, 25]]`, valeurs propres 45 et 5 → ‖A‖₂ = √45 = 3√5 — *norme 2*
- **Aides** : 1 « ‖·‖₁ : colonnes (le 1 est vertical) ; ‖·‖∞ : lignes (le ∞ est couché). » · 2 `AᵀA = [[25, □], [□, 25]]` · 3 la valeur.
- **Variantes d'examen** : `mcq` (distracteurs : `m_norm_1_inf_swap`, `m_norm2_eig`, la plus grande case). `tf` : « ‖A‖₂ = max |λᵢ(A)| pour toute A » (faux : `[[0, 1], [0, 0]]`) ; « ρ(A) ≤ ‖A‖∞ » (vrai).
- **Pièges** : `m_norm_1_inf_swap`, `m_norm2_eig`.
- **Sous-buts → crédit** : AᵀA → `l-mat-product` ; valeurs propres → `l-eig-charpoly` ; norme → `m-norms`.
- **Statut** : fait le 10 novembre 2026 (étape U8). Matrices 2 × 2 non symétriques dont AᵀA a des valeurs propres entières. Les nombres demandés sont nommés N₁, N∞, N₂, N_F dans les lignes (‖·‖ n'est pas lu par le CAS). L1 : sommes par colonne et par ligne à trous, max(|a| + |c| ; …), puis Frobenius ; L2 : décision « que somme-t-on ? » avant ‖A‖₁ ; L3 : les quatre normes (menus) ; L4 : ‖A‖₂ par AᵀA, puis ‖A‖_F (le gabarit « inégalités » n'est pas construit) ; L5 : problème, ‖A‖₂ puis deux vrai/faux sur les normes et ρ(A). Vrai/faux faux : `matOne` `svNotAbsEig` ([[0, 1], [0, 0]]), `mx` `norm1NeInf` et `frobNeTwo`.

### `m-cond` — Conditionnement
- **Année** 16 · **Prérequis** `m-norms` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : κ(A) = ‖A‖·‖A⁻¹‖ ≥ 1 ; κ₂ = σ₁/σₙ, et λ_max/λ_min pour A symétrique définie positive. Si Ax = b et A(x + δx) = b + δb, alors ‖δx‖/‖x‖ ≤ κ(A)·‖δb‖/‖b‖ : κ amplifie l'erreur relative. **Un petit déterminant ne veut pas dire mauvais conditionnement** (10⁻³I a κ = 1). Exemple : κ₂(`[[5, 4], [4, 5]]`) = 9/1 = 9.
- **Juge** : `value` · **Forme finale** : κ exact, et la borne demandée.
- **Niveaux** :
  - L1 (guidé) : valeurs propres ou σ données ; quotient à trous.
  - L2 : l'élève choisit la formule selon la matrice (symétrique ou non) et la norme.
  - L3 (choisir l'action) : κ, puis la borne sur l'erreur relative.
  - L4 (libre) : κ∞ par A⁻¹ ; perturbation qui atteint la borne.
  - L5 (seul) : lecture d'un tableau « erreur relative selon δb » (renvoi N), puis κ, sans aide.
- **Générateur** : A symétrique `orthRational` + D à rapport λ_max/λ_min entier, ou A triangulaire 2 × 2 simple ; b choisi sur le vecteur propre dominant et δb sur le plus petit (cas extrême). Gabarits : (a) κ₂ ; (b) κ∞ ou κ₁ ; (c) borne d'erreur ; (d) vrai/faux.
- **Corrigé type** : A = `[[5, 4], [4, 5]]`, b = (9 ; 9), δb = (0,09 ; −0,09).
  1. λ = 9 et 1, κ₂ = 9 — *conditionnement*
  2. x = (1 ; 1) ; ‖δb‖/‖b‖ = 0,09√2/(9√2) = 0,01 — *erreur relative de b*
  3. δb est vecteur propre de valeur 1 : δx = δb, ‖δx‖/‖x‖ = 0,09 = 9 × 0,01 — *la borne est atteinte*
- **Aides** : 1 « κ₂ = plus grande sur plus petite valeur singulière. » · 2 `κ₂ = □/1` · 3 la valeur.
- **Variantes d'examen** : `mcq` (distracteurs : `m_cond_eig_nonsym`, `m_cond_det`, 1/κ). `tf` : « Si det A est proche de 0, A est mal conditionnée » (faux : 10⁻³I) ; « κ(A) ≥ 1 » (vrai) ; « κ₂(Q) = 1 pour Q orthogonale » (vrai).
- **Pièges** : `m_cond_eig_nonsym`, `m_cond_det`.
- **Sous-buts → crédit** : normes → `m-norms` ; borne → `m-cond`.
- **Statut** : fait le 10 novembre 2026 (étape U8). L1 et L2 : κ₂ d'une symétrique définie positive (valeurs propres données) ou d'une triangulaire (valeurs propres de AᵀA données), L2 avec la décision de la formule (pièges `m_cond_det`, `m_cond_eig_nonsym`) ; L3 : κ₂, ‖δb‖/‖b‖, la borne, puis ‖δx‖/‖x‖ (b sur le vecteur propre dominant, δb sur l'autre : la borne est atteinte) ; L4 : κ∞ ou κ₁ par A⁻¹ ; L5 : un tableau de trois perturbations dans l'énoncé (pas de `readtable`), κ₂ et le numéro de la perturbation qui atteint la borne. Vrai/faux faux : `mx` `smallDetGoodCond` ((1/20)·I) et `condNotEigRatio` ([[1, 2], [0, 1]]).

### `m-gershgorin` — Disques de Gershgorin
- **Année** 16 · **Prérequis** `l-eig-charpoly` · **Étiquettes** `opt`, `GM` · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `l-eig-charpoly` : comparer les disques aux vraies valeurs propres.
- **Intro** : chaque valeur propre de A est dans un disque de centre aᵢᵢ et de rayon Rᵢ = Σ_{j≠i} |aᵢⱼ| (la diagonale n'entre pas dans le rayon). Une union de k disques disjointe des autres contient exactement k valeurs propres. On peut faire de même avec les colonnes. Conséquence : une matrice à diagonale strictement dominante est inversible. Exemple : `[[4, 1, 0], [1, −3, 1], [0, 1, 7]]` → disques D(4 ; 1), D(−3 ; 2), D(7 ; 1), disjoints.
- **Juge** : `value` sur centres et rayons ; `plot` `{task: 'region'}` pour dessiner les disques ; décision · **Forme finale** : disques, nombre de valeurs propres par disque, conclusion demandée.
- **Niveaux** :
  - L1 (guidé) : centres donnés, rayons à trous.
  - L2 : l'élève choisit lignes ou colonnes (le plus fin des deux).
  - L3 (choisir l'action) : disques, disjonction, conclusion (inversible ? valeurs propres réelles ?).
  - L4 (libre) : encadrer chaque valeur propre.
  - L5 (seul) : diagonale dominante ⇒ convergence de Jacobi (renvoi N) et inversibilité, sans aide.
- **Générateur** : diagonale entière espacée, coefficients hors diagonale petits ; on vérifie numériquement (`linalg-float.js`) que chaque disque isolé contient une valeur propre. Gabarits : (a) disques ; (b) inversibilité ; (c) encadrement.
- **Corrigé type** : A = `[[4, 1, 0], [1, −3, 1], [0, 1, 7]]`.
  1. D(4 ; 1) = [3 ; 5], D(−3 ; 2) = [−5 ; −1], D(7 ; 1) = [6 ; 8] (A symétrique : valeurs propres réelles) — *disques*
  2. Disjoints : une valeur propre dans chacun — *compter*
  3. 0 n'est dans aucun disque : A est inversible — *conclure* (valeurs ≈ 4,13 ; −3,24 ; 7,10)
- **Aides** : 1 « Rayon = somme des |aᵢⱼ| de la ligne, sans la diagonale. » · 2 `R₂ = |1| + |□|` · 3 les disques.
- **Variantes d'examen** : `mcq` (distracteurs : `m_gersh_radius_diag`). `tf` : « Chaque disque contient une valeur propre » (faux si les disques se chevauchent : `matOne`).
- **Pièges** : `m_gersh_radius_diag`.
- **Sous-buts → crédit** : disques → `m-gershgorin`.
- **Statut** : fait le 10 novembre 2026 (étape U8). Pas de dessin (la tâche `plot` `region` n'existe pas) : les disques s'écrivent D(centre ; rayon), les rayons sont des lignes `value` et les conclusions des décisions. Matrices 3 × 3 à diagonale espacée ; chaque disque isolé est vérifié numériquement (`linalg-float.js`). L1 : rayons à trous ; L2 : disques par lignes qui se chevauchent, décision « par colonnes », rayons des colonnes ; L3 : rayons (menus), puis « A est-elle inversible ? » ; L4 : encadrement λ_min ≥ …, λ_max ≤ … (A symétrique) ; L5 : diagonale strictement dominante, la marge minᵢ(|aᵢᵢ| − Rᵢ), inversibilité (renvoi à Jacobi, module N). Vrai/faux faux : `mx` `gershEmptyDisc` ([[0, 1], [4, 0]]).

### `m-ode-modes` — Systèmes x′ = Ax : modes propres et stabilité
- **Année** 16 · **Prérequis** `l-eig-diag`, `a2-ode-const2`, `g8-polar` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `l-eig-diag` : A = PDP⁻¹ ; `a2-ode-const2` : modes e^{λt} et cas complexes, comme au 2e ordre ; `g8-polar` : λ = a ± ib donne e^{at}·cos bt et e^{at}·sin bt.
- **Intro** : si A = PDP⁻¹ (valeurs λᵢ, vecteurs vᵢ), la solution de ẋ = Ax est x(t) = Σ cᵢe^{λᵢt}vᵢ, avec c solution de Pc = x(0). Stabilité : toutes les Re λᵢ < 0 ⇒ x(t) → 0 pour tout x(0) ; une Re λ > 0 ⇒ instable. λ = a ± ib donne des oscillations e^{at}(cos bt, sin bt). L'EDO ÿ + aẏ + by = 0 devient, avec x = (y ; ẏ), A = `[[0, 1], [−b, −a]]` (matrice compagne), de polynôme caractéristique λ² + aλ + b : le même que l'équation caractéristique de A2. Exemple : ÿ + 5ẏ + 6y = 0 → A = `[[0, 1], [−6, −5]]`, λ = −2 et −3, stable.
- **Juge** : `value` sur A ; `poly` ; `eigvec` ; puis `ode` étendu aux vecteurs `{eq: 'x′ = Ax', unknown: 'x', v: 't', ic, order: 1}` (voir les lacunes) ; décision « stable / instable » · **Forme finale** : x(t) (ou y(t)) et la stabilité.
- **Niveaux** :
  - L1 (guidé) : A et valeurs propres données ; vecteurs et coefficients à trous.
  - L2 : l'élève choisit le critère de stabilité (Re λ < 0, ou |λ| < 1 : refusé avec le message de `m_stab_discrete_in_cont`).
  - L3 (choisir l'action) : EDO → matrice compagne → modes → conditions initiales → stabilité.
  - L4 (libre) : 2 × 2 non compagne, valeurs propres complexes (oscillations amorties).
  - L5 (seul) : stabilité selon un paramètre, ÿ + cẏ + 4y = 0 (stable si et seulement si c > 0 ; oscillant si 0 < c < 4), puis la solution pour une valeur de c, sans aide.
- **Générateur** : `pdp` avec valeurs propres entières non nulles dans [−4 ; 3] (réelles), ou a ± ib avec a ∈ {−2, −1, 0, 1}, b ∈ {1, 2} ; matrices compagnes à partir de racines choisies ; x(0) entier. Gabarits : (a) EDO d'ordre 2 ; (b) système 2 × 2 ; (c) stabilité seulement ; (d) paramètre.
- **Corrigé type** : ÿ + 5ẏ + 6y = 0, y(0) = 1, ẏ(0) = 0.
  1. x = (y ; ẏ), ẋ = `[[0, 1], [−6, −5]]`x — *matrice compagne*
  2. λ² + 5λ + 6 = (λ + 2)(λ + 3) — *polynôme caractéristique*
  3. λ = −2 : v₁ = (1 ; −2) ; λ = −3 : v₂ = (1 ; −3) — *modes*
  4. c₁ + c₂ = 1, −2c₁ − 3c₂ = 0 ⇒ c₁ = 3, c₂ = −2 — *conditions initiales*
  5. x(t) = 3e^{−2t}(1 ; −2) − 2e^{−3t}(1 ; −3), donc y(t) = 3e^{−2t} − 2e^{−3t} ; Re λ < 0 : stable — *solution, stabilité*
- **Aides** : 1 « Un mode par valeur propre : e^{λt}v ; les coefficients viennent de x(0). » · 2 `x(t) = c₁e^{−2t}(1 ; □) + c₂e^{−3t}(1 ; □)` · 3 la solution.
- **Variantes d'examen** : `mcq` stabilité ou y(t) (distracteurs : `m_stab_discrete_in_cont`, `m_modes_c_equals_x0`, `m_companion_sign`). `tf` : « Si toutes les valeurs propres de A ont |λ| < 1, ẋ = Ax est stable » (faux : λ = 1/2) ; « λ = ±2i : les solutions restent bornées sans tendre vers 0 » (vrai).
- **Pièges** : `m_companion_sign`, `m_modes_c_equals_x0`, `m_stab_discrete_in_cont`, `m_stab_imag_part`.
- **Sous-buts → crédit** : polynôme → `l-eig-charpoly` ; modes → `l-eig-space` ; coefficients → `l-sys-solution` ; stabilité → `m-ode-modes`.

### `m-expm` — Exponentielle de matrice, y compris pour une valeur propre double
- **Année** 16 · **Prérequis** `m-ode-modes`, `a1-pow-sums` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `m-ode-modes` : x(t) = e^{At}x(0) ; `a1-pow-sums` : série e^{At} = Σ (At)ᵏ/k!.
- **Intro** : e^{At} = Σ (At)ᵏ/k! ; d/dt e^{At} = Ae^{At}, e^{A·0} = I, et x(t) = e^{At}x(0). Si A = PDP⁻¹ : e^{At} = P·diag(e^{λᵢt})·P⁻¹. Valeur propre double λ d'une 2 × 2 non diagonalisable : N = A − λI vérifie N² = 0, donc e^{At} = e^{λt}(I + tN). **Ce n'est pas l'exponentielle de chaque case**, et e^{A+B} = e^A e^B seulement si AB = BA. Exemple : `[[−2, 1], [0, −2]]` → e^{−2t}`[[1, t], [0, 1]]`.
- **Juge** : `equiv` sur une matrice de fonctions de t `{vars: ['t']}` (case par case), avec le contrôle du plan : dérivée = A·M(t) et M(0) = I · **Forme finale** : e^{At} simplifiée, puis x(t) si demandé.
- **Niveaux** :
  - L1 (guidé) : cas diagonalisable : P, P⁻¹ données ; diag(e^{λt}) et produit à trous.
  - L2 : l'élève choisit la méthode (diagonaliser, ou λI + N si la valeur est double).
  - L3 (choisir l'action) : polynôme, cas, N et N², formule.
  - L4 (libre) : valeur double non triangulaire.
  - L5 (seul) : e^{At}, x(t), puis vrai/faux sur e^{A+B}, sans aide.
- **Générateur** : cas diagonalisable : `pdp` avec λ entiers ; cas double : A = λI + N avec N = S·`[[0, 1], [0, 0]]`·S⁻¹ (S = `unimodular(2)`), λ ∈ {−3, −2, −1, 1, 2}. Gabarits : (a) diagonalisable ; (b) valeur double ; (c) x(t) ; (d) vrai/faux.
- **Corrigé type** : A = `[[1, 1], [−1, 3]]`.
  1. λ² − 4λ + 4 = (λ − 2)² — *polynôme caractéristique*
  2. N = A − 2I = `[[−1, 1], [−1, 1]]`, N² = 0 — *partie nilpotente*
  3. e^{At} = e^{2t}(I + tN) = e^{2t}`[[1 − t, t], [−t, 1 + t]]` — *exponentielle*
  4. Contrôle : en t = 0, I ; la dérivée vaut A·e^{At} — *vérifier*
- **Aides** : 1 « Valeur double : écris A = λI + N, avec N² = 0, puis e^{At} = e^{λt}e^{Nt}. » · 2 `e^{At} = e^{2t}(I + t·[[□, 1], [−1, □]])` · 3 la matrice.
- **Variantes d'examen** : `mcq` (distracteurs : `m_expm_entrywise`, `m_expm_double_no_t`). `coef` une case de e^{At} pour t donné. `tf` : « e^{A+B} = e^A e^B pour toutes A, B » (faux : `matPair` qui ne commutent pas) ; « e^{At} est toujours inversible » (vrai : son inverse est e^{−At}).
- **Pièges** : `m_expm_entrywise`, `m_expm_sum`, `m_expm_double_no_t`.
- **Sous-buts → crédit** : polynôme → `l-eig-charpoly` ; N → `m-expm` ; diagonaliser → `l-eig-diag`.

### `m-discrete` — Systèmes discrets x_{k+1} = Ax_k
- **Année** 16 · **Prérequis** `l-eig-powers` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : x_k = Aᵏx₀ = Σ cᵢλᵢᵏvᵢ. Stable (x_k → 0 pour tout x₀) si et seulement si toutes les |λᵢ| < 1, c'est-à-dire ρ(A) < 1. Avec λ = 1 et les autres |λ| < 1, x_k converge vers un vecteur fixe (chaînes de Markov). Comparaison : en continu, le critère est Re λ < 0 ; en discret, |λ| < 1. Euler explicite x_{k+1} = (I + hA)x_k fait passer de l'un à l'autre (renvoi N). Exemple : valeurs propres 1/2 et −1/4 → stable.
- **Juge** : `poly`, `eigvec`, `rowops` pour c, puis `equiv` `{vars: ['k'], domain: {k: 'N'}}` sur x_k ; décision · **Forme finale** : x_k et la stabilité.
- **Niveaux** :
  - L1 (guidé) : valeurs et vecteurs propres donnés ; c et x_k à trous.
  - L2 : l'élève choisit le critère (|λ| < 1).
  - L3 (choisir l'action) : décomposer x₀, écrire x_k, conclure.
  - L4 (libre) : comparer la stabilité continue et discrète pour la même A.
  - L5 (seul) : vrai/faux croisés et un calcul complet, sans aide.
- **Générateur** : `pdp` avec D à valeurs rationnelles simples (±1/2, ±1/4, ±3/4, 1, ±2) ; x₀ entier. Gabarits : (a) x_k ; (b) stabilité ; (c) comparaison continu/discret ; (d) Markov.
- **Corrigé type** : A = `[[5/4, −3/4], [3/2, −1]]`, x₀ = (1 ; 0).
  1. tr A = 1/4, det A = −1/8 : λ² − λ/4 − 1/8 = (λ − 1/2)(λ + 1/4) — *valeurs propres*
  2. λ = 1/2 : v₁ = (1 ; 1) ; λ = −1/4 : v₂ = (1 ; 2) — *vecteurs propres*
  3. x₀ = 2v₁ − v₂ — *décomposer*
  4. x_k = 2(1/2)ᵏ(1 ; 1) − (−1/4)ᵏ(1 ; 2) → 0 : stable — *solution, stabilité*
- **Aides** : 1 « Chaque mode est multiplié par λ à chaque pas. » · 2 `x_k = □(1/2)ᵏ(1 ; 1) + □(−1/4)ᵏ(1 ; 2)` · 3 x_k.
- **Variantes d'examen** : `mcq` (distracteurs : `m_stab_cont_in_discrete`, `m_discrete_exp`). `tf` : « Si les valeurs propres de A sont −3 et −1, ẋ = Ax est stable mais x_{k+1} = Ax_k ne l'est pas » (vrai) ; « Si Re λ < 0 pour toutes les valeurs propres, x_{k+1} = Ax_k est stable » (faux : λ = −2).
- **Pièges** : `m_stab_cont_in_discrete`, `m_discrete_exp`, `l_powers_entrywise`.
- **Sous-buts → crédit** : valeurs propres → `l-eig-charpoly` ; décomposer → `l-eig-powers` ; stabilité → `m-discrete`.

## Pièges du module

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `m_schur_order` | rule | E | `m-blocks-schur` | `l-mat-blocks` | S = A₂₂ − A₁₂A₁₁⁻¹A₂₁ | Ligne S avec les facteurs dans l'ordre inverse (si les tailles le permettent) | On élimine A₂₁ avec A₁₁ : S = A₂₂ − A₂₁·A₁₁⁻¹·A₁₂, dans cet ordre (la ligne du bas, puis le pivot, puis la colonne de droite). |
| `m_schur_sign` | sign | E | `m-blocks-schur` | `l-sys-echelon` | S = A₂₂ + A₂₁A₁₁⁻¹A₁₂ | Signe + dans la ligne S | Comme en Gauss, on **retranche** : S = A₂₂ − … = {…}. |
| `m_householder_factor` | rule | E | `m-rank1-proj` | `m-rank1-proj` | H = I − P → I − 2P | Ligne `I − P` pour la symétrie | I − P projette sur u⊥ ; pour la symétrie, il faut enlever **deux fois** la composante selon u : H = I − 2P. |
| `m_spectral_entrywise` | rule | E | `m-spectral` | `m-spectral` | √A case par case | Appliquer f à chaque coefficient de A | f(A) se calcule sur les valeurs propres : f(A) = Σ f(λᵢ)uᵢuᵢᵀ. Contrôle : ({ta matrice})² ≠ A. |
| `m_sylvester_semidef` | logic | E | `m-posdef` | `m-posdef` | mineurs dominants ≥ 0 ⇒ semi-définie positive | `wrongValues` : « semi-définie positive » | Pour « semi-définie », il faut tous les mineurs principaux (pas seulement dominants) ≥ 0. `[[0, 0], [0, −1]]` a Δ₁ = Δ₂ = 0 mais Q(0, 1) = −1. |
| `m_sylvester_negdef` | sign | E | `m-posdef` | `m-posdef` | définie négative ⇔ tous les mineurs < 0 | `wrongValues` : appliquer « tous < 0 » | A est définie négative si −A est définie positive : les mineurs alternent, Δ₁ < 0, Δ₂ > 0, Δ₃ < 0. |
| `m_chol_no_sqrt` | rule | E | `m-cholesky` | `m-cholesky` | ℓ₂₂ = 10 − 1 → √(10 − 1) | Diagonale de L sans racine | Sur la diagonale, ℓₖₖ² = aₖₖ − Σ ℓₖⱼ² : il faut prendre la racine, ℓ = √{…}. Contrôle : (LLᵀ)ₖₖ ≠ aₖₖ. |
| `m_chol_sum_sign` | sign | E | `m-cholesky` | `m-cholesky` | ℓ₃₂ = (5 + (−1)·1)/3 | Ajouter Σ ℓᵢⱼℓₖⱼ au lieu de le retrancher | ℓᵢₖ = (aᵢₖ − Σ ℓᵢⱼℓₖⱼ)/ℓₖₖ : ici (5 − (−1)(1))/3 = 2. |
| `m_grad_factor` | rule | E | `m-quad-gradient` | `a2-partials` | ∇(½xᵀAx) = 2Ax ou ½Ax → Ax | Gradient = 2Ax − b ou ½Ax − b | ∇(xᵀAx) = 2Ax pour A symétrique ; le ½ devant le compense : ∇(½xᵀAx) = Ax. Vérifie sur la 1re composante : ∂f/∂x = {…}. |
| `m_grad_nonsym` | rule | E | `m-quad-gradient` | `m-quad-gradient` | ∇(xᵀMx) = 2Mx (M non symétrique) | Gradient 2Mx | Pour M non symétrique, ∇(xᵀMx) = (M + Mᵀ)x : ici M + Mᵀ = {…}. |
| `m_var_no_inverse` | rule | E | `m-normal-eq` | `m-normal-eq` | Var(β̂) = σ²XᵀX | `wrongValues` : σ²·(XᵀX)ⱼⱼ | Plus il y a de données, plus XᵀX est grand et plus β̂ est précis : la variance est σ²(XᵀX)⁻¹. |
| `m_rayleigh_no_denominator` | rule | E | `m-rayleigh` | `m-rayleigh` | R(x) = xᵀAx | `wrongValues` : xᵀAx, ou xᵀAx/‖x‖ | R(x) = xᵀAx/xᵀx : sans le dénominateur, la valeur dépend de la longueur de x. Ici xᵀx = {…}. |
| `m_power_ratio` | rule | E | `m-power-method` | `m-power-method` | vitesse \|λ₁/λ₂\| → \|λ₂/λ₁\| | `wrongValues` : \|λ₁/λ₂\| ; « plus petite valeur propre » | Après k pas, la part du mode 2 est multipliée par (λ₂/λ₁)ᵏ, qui tend vers 0 : la vitesse est \|λ₂/λ₁\| = {…}. |
| `m_inverse_power_value` | rule | E | `m-power-method` | `m-power-method` | λ ≈ μ → λ = σ + 1/μ | `wrongValues` : μ, 1/μ, σ + μ | La puissance inverse travaille sur (A − σI)⁻¹, de valeurs 1/(λ − σ). Il faut revenir : λ = σ + 1/μ = {…}. |
| `m_rankk_wrong_sigma` | rule | E | `m-svd-lowrank` | `m-svd-lowrank` | ‖A − A_k‖₂ = σ_k → σ_{k+1} | `wrongValues` : σ_k, σ_{k+1}² | L'erreur est le plus grand terme qu'on a jeté : σ_{k+1} = {…}. |
| `m_norm_1_inf_swap` | notation | E | `m-norms` | `m-norms` | ‖A‖₁ = max par ligne | `wrongValues` : échanger ‖·‖₁ et ‖·‖∞ | ‖·‖₁ somme les **colonnes**, ‖·‖∞ les **lignes** : ici {…} et {…}. |
| `m_norm2_eig` | rule | E | `m-norms` | `l-svd-compute` | ‖A‖₂ = max \|λᵢ(A)\| (A non symétrique) | `wrongValues` : max \|λᵢ(A)\| ; √λ_max(A) | ‖A‖₂ = σ₁ = √λ_max(AᵀA). Les valeurs propres de A ne suffisent que si A est symétrique. |
| `m_cond_eig_nonsym` | rule | E | `m-cond` | `m-norms` | κ₂ = \|λ_max/λ_min\| (A non symétrique) | `wrongValues` : rapport des valeurs propres de A | Pour A non symétrique, κ₂ = σ₁/σₙ (valeurs singulières), pas le rapport des valeurs propres. |
| `m_cond_det` | logic | E | `m-cond` | `m-cond` | « det petit ⇒ mal conditionnée » | `wrongValues` : « vrai » | det(10⁻³I) = 10⁻⁹ (en 3D), mais κ = 1 : multiplier par un scalaire ne change pas κ. |
| `m_gersh_radius_diag` | rule | E | `m-gershgorin` | `m-gershgorin` | rayon = Σ \|aᵢⱼ\| y compris aᵢᵢ | Rayons calculés avec la diagonale | Le rayon ne compte que les cases hors diagonale : R = {…}. La diagonale est le centre. |
| `m_companion_sign` | sign | E | `m-ode-modes` | `a2-ode-const2` | ÿ + 5ẏ + 6y = 0 → `[[0, 1], [6, 5]]` | Dernière ligne de la matrice compagne sans changement de signe | ÿ = −6y − 5ẏ : la ligne du bas est (−6, −5). Contrôle : le polynôme de ta matrice est {…}, pas λ² + 5λ + 6. |
| `m_modes_c_equals_x0` | linear | E | `m-ode-modes` | `l-vs-coords` | c = x(0) → Pc = x(0) | Coefficients modaux pris égaux aux composantes de x(0) | Les cᵢ sont les coordonnées de x(0) dans la base des vecteurs propres : il faut résoudre Pc = x(0). |
| `m_stab_discrete_in_cont` | logic | E | `m-ode-modes` | `m-ode-modes` | ẋ = Ax stable car \|λ\| < 1 | `wrongValues` : décision avec le critère \|λ\| < 1 | En continu, le mode e^{λt} tend vers 0 si Re λ < 0. Avec λ = {λ} > 0, il explose même si \|λ\| < 1. |
| `m_stab_cont_in_discrete` | logic | E | `m-discrete` | `m-discrete` | x⁺ = Ax stable car Re λ < 0 | `wrongValues` : décision avec le critère Re λ < 0 | En discret, le mode est λᵏ : il tend vers 0 si \|λ\| < 1. Avec λ = {λ}, \|λ\|ᵏ grandit. |
| `m_stab_imag_part` | logic | E | `m-ode-modes` | `m-ode-modes` | stabilité lue sur Im λ | `wrongValues` : décision selon le signe de Im λ | La partie imaginaire donne la fréquence des oscillations ; c'est la partie réelle qui dit si elles s'amortissent. |
| `m_discrete_exp` | rule | E | `m-discrete` | `m-discrete` | x_k = e^{λk}v → λᵏv | Modes écrits e^{λᵢk} au lieu de λᵢᵏ | En discret, chaque pas multiplie par λ : après k pas, λᵏ. L'exponentielle est le cas continu. |
| `m_expm_entrywise` | rule | E | `m-expm` | `m-expm` | e^{At} = (e^{aᵢⱼt}) | Exponentielle de chaque case | e^{At} = Σ (At)ᵏ/k!, pas la matrice des e^{aᵢⱼt}. Contrôle : en t = 0, ta matrice donne des 1 partout, pas I. |
| `m_expm_sum` | rule | E | `m-expm` | `l-mat-product` | e^{A+B} = e^A e^B (AB ≠ BA) | `wrongValues` : « vrai » | Cette règle demande AB = BA. Ici AB − BA = {…} ≠ 0. |
| `m_expm_double_no_t` | linear | E | `m-expm` | `l-eig-diag-param` | e^{At} = e^{λt}I pour une valeur double | Oublier le terme tN | A n'est pas diagonalisable (N = A − λI ≠ 0) : e^{At} = e^{λt}(I + tN). Contrôle : la dérivée de e^{λt}I vaut λe^{λt}I ≠ Ae^{At}. |

## Exemples de type examen

### 1. Exponentielle de matrice et stabilité (10 points ; problème de révision BA4)

ẋ = Ax avec A = `[[−3, 1], [−1, −1]]`, x(0) = (1 ; 2).

| Partie | Ce qu'on attend | Points |
|---|---|---|
| (a) Polynôme caractéristique | λ² + 4λ + 4 = (λ + 2)² | 1 |
| (b) A est-elle diagonalisable ? | A + 2I = `[[−1, 1], [−1, 1]]` de rang 1 : dim E₋₂ = 1 < 2, non | 1 |
| (c) Partie nilpotente | N = A + 2I, N² = 0 | 1 |
| (d) e^{At} | e^{−2t}(I + tN) = e^{−2t}`[[1 − t, t], [−t, 1 + t]]` | 3 |
| (e) x(t) | e^{At}(1 ; 2) = e^{−2t}(1 + t ; 2 + t) | 2 |
| (f) Stabilité | Continu : Re λ = −2 < 0, stable (x(t) → 0 malgré le facteur t). Discret x_{k+1} = Ax_k : \|−2\| > 1, instable | 2 |

Pièges suivis : `m_expm_double_no_t`, `m_expm_entrywise`, `m_stab_cont_in_discrete`, `l_charpoly_sign`.

### 2. Cholesky, résolution et déterminant (7 points ; QCM et ouvert, comme en N)

C = `[[9, 3, −3], [3, 5, 1], [−3, 1, 6]]`, b = (6 ; 4 ; 3).

| Partie | Ce qu'on attend | Points |
|---|---|---|
| (a) Factorisation C = LLᵀ | L = `[[3, 0, 0], [1, 2, 0], [−1, 1, 2]]` (ℓ₃₂ = (1 − (−1)·1)/2 = 1 ; ℓ₃₃ = √(6 − 1 − 1) = 2) | 3 |
| (b) Résoudre Cx = b | Ly = b : y = (2 ; 1 ; 2) ; Lᵀx = y : x = (1 ; 0 ; 1) | 2 |
| (c) det C | (3·2·2)² = 144 | 1 |
| (d) Justifier que C est définie positive | La factorisation existe avec une diagonale > 0 (ou mineurs 9, 36, 144) | 1 |

Variante QCM : « ℓ₃₂ vaut » 1 (juste), 0 (`m_chol_sum_sign` : (1 + (−1)·1)/2), 1/2 (`m_chol_no_sqrt` : ℓ₂₂ = 4 au lieu de 2), 2 (division par ℓ₂₂ oubliée, `rule: null`).

### 3. Puissance, Rayleigh et conditionnement (7 points ; comme les QCM de N)

A = `[[6, 2], [2, 3]]`, y₀ = (1 ; 0).

| Partie | Ce qu'on attend | Points |
|---|---|---|
| (a) Deux itérations de la puissance (normalisation par la 1re composante) | Ay₀ = (6 ; 2), μ₀ = 6, y₁ = (1 ; 1/3) ; Ay₁ = (20/3 ; 3), μ₁ = 20/3 | 2 |
| (b) Quotient de Rayleigh R(y₁) | (20/3 + 1)/(10/9) = 69/10 | 1 |
| (c) Vitesse de convergence | Valeurs propres 7 et 2 ; \|λ₂/λ₁\| = 2/7 par pas (≈ 4/49 pour Rayleigh) | 1 |
| (d) Puissance inverse avec σ = 1 | Converge vers la valeur propre la plus proche de 1, soit 2 : μ → 1/(2 − 1) = 1, λ = σ + 1/μ = 2 | 2 |
| (e) κ₂(A) | 7/2 | 1 |

Pièges suivis : `m_power_ratio`, `m_inverse_power_value`, `m_rayleigh_no_denominator`, `m_cond_eig_nonsym` (sans effet ici : A est symétrique, mais le distracteur reste proposé dans la version non symétrique).

---

## Lacunes de la spécification (à trancher avant U3 et U9)

1. **Paramètres dans `rowops`.** `matrix.js` travaille sur ℚ ; les systèmes et déterminants à paramètre (`l-sys-param`, `l-vec-indep`, `l-det-rowops`, `l-eig-diag-param`) demandent des matrices sur ℚ(a) (`ratfun.js`) et un juge qui sépare les cas. Proposition : `rowops` `{param: 'a'}` accepte les coefficients rationnels en a, refuse une division par une expression non constante sans ligne de cas, et `solset` juge la discussion.
2. **Fonction `det(…)` dans les lignes.** L'AST du §4.1 n'a pas de nœud pour det, tr ou rang d'une matrice. Il faut `{t: 'fn', name: 'det' | 'tr', args: [mat]}`, évalué par `matrix.js` dans `equalExact`, pour juger « det A = −4·det(…) ».
3. **Extensions de cfg utilisées ici, absentes du §5.** `span` : `nested: true` (Gram-Schmidt dans l'ordre), `affine: p` (ensemble de solutions affine) ; `eigvec` : `complex: true` ; `rowops` : `track: 'det'` (facteur suivi) et l'inscription de ℓᵢⱼ pour LU. `factor` `kind: 'spectral'` existe ; il manque une convention pour `askCoef` quand le facteur n'est pas unique (Q, U, V, P) : proposition `final.askCoef.convention = {order: 'asc' | 'desc', sign: 'firstNonzeroPositive', normalized: true}`.
4. **EDO vectorielles et matrices de fonctions.** Le juge `ode` est scalaire. `m-ode-modes` et `m-expm` demandent ẋ = Ax (vecteur inconnu) et l'équivalence de matrices dont les cases sont des fonctions de t. Proposition : `ode` `{unknown: 'x', dim: n}` qui vérifie chaque composante, et `equiv` appliqué case par case à un nœud `mat`.
5. **Partie spécifique MT.** Le plan `ba1-alglin` (§10) n'a que des QCM et des vrai/faux. Les problèmes `open` (preuve de 4 points, problème de 14 points) n'ont pas de plan. Proposition : un plan `ba1-alglin-mt`, étiqueté MT et facultatif, avec 2 problèmes `open`.
6. **Aucun plan d'examen pour M.** Faut-il verser `m-cholesky`, `m-power-method`, `m-rayleigh`, `m-norms`, `m-cond` et `m-gershgorin` dans le pool de `ba4-numerique`, et le reste dans un « examen de révision BA4 » ?
7. **Ordre N et M.** Le plan (§10) construit N (U8) avant M (U9) « pour ne pas construire deux fois Cholesky et la puissance », mais ces compétences appartiennent à M. Si N est construit d'abord, ses prérequis vers M pointent vers des compétences absentes. Il faut soit construire ces cinq compétences M avec U8, soit autoriser des prérequis « en avant ». De plus, le §4.3 met `cholesky` dans `matrix.js` (U3) alors que U9 dit « Cholesky ».
8. **Étiquettes MT et `optional`.** Tranché (README §1) : tout est obligatoire par défaut, et les étiquettes `MT`, `GM` et `opt` sont seulement informatives. `l-sym-quadform`, `l-orth-inner` et `l-svd-sphere` sont donc obligatoires, comme les autres compétences de L et M.
9. **Format des prérequis externes.** Certaines lignes du plan regroupent plusieurs compétences (A2 « 2e ordre à coefficients constants ; Wronskien, réduction d'ordre »), et leurs titres ont du gras qu'on retire. L'agent qui implémente devra choisir l'id réel ; une table de correspondance « titre de ligne → id » serait utile. Les marques `@alg:…` sont devinées (`E-systemes-2x2`, `H-discriminant`, `D-trinome`, `I-equation-parametre`, `J-hausse-baisse`).
10. **G10 et L.** La ligne G10 « Réduire une conique avec un terme en xy » demande les valeurs propres de L, mais G10 est en année 12.5 et L en 13. Aucun prérequis n'a été ajouté ici ; il faut décider qui dépend de qui.
11. **Lignes du plan M laissées de côté.** « Mettre une EDO sous forme d'état » n'est gardée que pour l'EDO homogène (matrice compagne, sans B). « Linéariser par la jacobienne » n'est ni dans la liste BA4 ni dans la liste BA5+ : à placer (A2 ou plan BA5+). Le fichier `plan-ba5-et-plus.md`, cité au §1, n'existe pas encore.
12. **`examWeight` = 0.** Le §10 dit « 1 par défaut ». Ici, 0 veut dire « jamais tiré à l'examen » (compétences absentes des examens 2015 à 2021). À confirmer dans `engine/exam.js`.

**Tranché à l'étape U3** (voir [README](README.md) §17) :
- 1 : `rowops` avec `vars: ['a']` calcule dans ℚ(a) ; une ligne qui multiplie une ligne par une expression de a est refusée et nomme `l_param_divide_zero` ; la discussion des cas passe par `solset` (ou `poly` pour factoriser le pivot).
- 2 : le juge `det` lit les lignes avec `det[[…]]` et `det(A − λI)` (matrices nommées par l'item), calculées exactement ; ce n'est pas un nœud de `parse.js`, c'est la langue des lignes de `js/cas/matexpr.js`.
- 3 : `span` avec `nested` et `affine`, `eigvec` avec `complex`, `rowops` avec `track: 'det'` existent. Pas de `track: 'lu'` : les ℓᵢⱼ sont dans les notes et dans L, jugée par `factor`. `askCoef = {label, path, convention?}` : le générateur fixe la convention dans l'énoncé et calcule le coefficient.
- 5 : pas de plan `ba1-alglin-mt` : les problèmes `open` existent comme items en lignes sans aide ; le plan viendra avec le type `problem` (U4).
- 12 : `examWeight: 0` veut dire « jamais tiré » (`sectionPool` de `js/engine/exam.js`).
