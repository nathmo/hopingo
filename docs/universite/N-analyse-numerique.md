# N. Analyse numérique

Extensions du §16 utilisées : §16.1 intégrales dans `evalFloat`, alias `o(xⁿ)` ; §16.2 `iter` avec les sortes de `phi` (`bisection`, `secant`, `jacobi`, `gauss-seidel`, `euler`, `gradient`…), `stat` avec `sig`, `value` avec `arith: 'fp'`, `series` avec fonctions abstraites (preuves d'ordre) ; §16.3 `code` (Python, `atol`), QCM à plusieurs réponses, `matrix`, échelle des niveaux `blocks` et `tokens` ; §16.4 familles nouvelles (`numeric`, `method`, `logic`, `calculus`), tag C, réparation dans un autre module, pièges partagés (réutilise `g9_quant_order`, `g9_proof_by_example`, `a2_jacobian_transposed`).

Unité `numerique` · préfixe `n-` · pièges `n_` · Statut : fait le 10 novembre 2026 (étape U9). Les 45 compétences et les 91 pièges ; chaque compétence a au moins un item `code` ou `readtable`. Les juges à fonction abstraite (extension 5) ne sont pas construits : les preuves d'ordre utilisent des lettres pour f(x₀), f′(x₀)… et f‴(ξᵢ) (juge `equiv`), des QCM et des blocs. Les simplifications de chaque compétence sont dans son statut.

**Sources** :
- cours d'Analyse numérique de la section GM (F. Nobile), notes de cours 2017–2018 et séries d'exercices avec Matlab 2017 et 2018 (bissection, point fixe, Newton, interpolation, moindres carrés, dérivation, intégration, systèmes linéaires, méthodes itératives, valeurs propres, EDO). Les séries citent d'anciennes questions d'examen GM (2011–2013) ;
- cours d'Analyse numérique de la section MT (M. Picasso), MOOC et livre de J. Rappaz et M. Picasso, intitulé « Analyse numérique et optimisation » en 2020–2021 ;
- examens MT du 26 juin 2019, du 11 août 2020, du 3 juillet 2021 et du 25 juin 2022, avec leurs corrigés. Ils sont sur papier, sans document ni calculatrice : de 14 à 33 QCM (une ou plusieurs bonnes réponses, +1/N et −1/M) et vrai/faux (+1/0/−1), puis 2 questions de preuve de 3,5 à 10 points.

**Notation** :
- **Itérations.** Les itérés sont x⁽ᵏ⁾ (saisie `x_k`), la racine est α et la fonction d'itération φ. L'incrément est δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾|. L'ordre se lit sur le rapport rₚ⁽ᵏ⁾ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| / |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾|ᵖ = δₖ/δₖ₋₁ᵖ : la méthode est d'ordre p si ce rapport tend vers une constante finie **non nulle**. Si p = 1, il faut en plus que cette constante soit < 1.
- **Pas.** h est la longueur d'un sous-intervalle (quadrature composite, différences finies, EDO). τ est le pas de temps des EDP, comme dans les examens MT. Les notes GM écrivent Δt. L'app affiche h pour les EDO et τ pour les EDP.
- **Quadrature.** h = (b − a)/n, xᵢ = a + ih, cᵢ = (xᵢ₋₁ + xᵢ)/2. Simpson composite : Σᵢ (h/6)·[f(xᵢ₋₁) + 4f(cᵢ) + f(xᵢ)]. J(g) est une formule de base sur [−1 ; 1], et L_h(f) ou Q_h(f) la formule composite.
- **Différences finies.** On dit « progressive, rétrograde, centrée ».
- **Bissection.** k_min est le plus petit entier tel que k_min > log₂((b − a)/tol) − 1.
- **Stabilité absolue.** Elle se lit sur u′ = λu avec λ < 0, ou Re λ < 0 pour un système.
- **Problème aux limites modèle.** −u″ = f sur ]0 ; 1[, h = 1/(N + 1), xᵢ = ih, avec N inconnues u₁ … u_N.
- **Matrice tridiagonale.** Elle est notée comme dans les fichiers `exam1.m` : diagonale `a`, sous-diagonale `d`, sur-diagonale `c`.
- **Preuves.** Un point intermédiaire de Taylor s'écrit ξ, ξ₁, ξ₂ (saisie `xi_1`). Les quantificateurs s'écrivent dans l'ordre des examens : « ∀f ∈ C⁴[0 ; 1], ∃C > 0, ∀h ∈ ]0 ; 1] ».
- **Code.** Python, selon le §12 du README, avec des indices **à partir de 0**. Les fichiers Matlab des examens sont traduits : l'inconnue Matlab `b(i)` (i = 1 … N) devient `b[i]` (i = 0 … N − 1), au point xᵢ₊₁ = (i + 1)h. Chaque item rappelle cette traduction dans un commentaire.

**Prérequis extérieurs** :
- `@alg:A-arrondir`, `@alg:J-quel-pourcentage`, `@alg:L-fonction-affine` ;
- `g0-factor-thm`, `g0-horner`, `g2-log-rules`, `g5-sigma`, `g5-geom`, `g6-deriv-rules`, `g9-negate`, `g9-quant-read` ;
- `a1-dl-usual`, `a1-mvt`, `a1-seq-rec-fixed`, `a1-fn-ivt`, `a1-int-subst`, `a1-int-parts`, `a1-extrema-global` ;
- `l-sys-echelon`, `l-mat-product`, `l-mat-lu`, `l-det-props`, `l-eig-charpoly`, `l-orth-lsq` ;
- `a2-ode-cauchy`, `a2-ode-linear1`, `a2-partials`, `a2-lagrange` ;
- `f-heat-sep`, `f-wave` ;
- `m-cholesky`, `m-posdef`, `m-quad-gradient`, `m-cond`, `m-power-method`, `m-ode-modes`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g9-negate`, `g0-horner`, `g0-multiplicity`, `g2-log-rules`, `g5-geom`, `g5-sigma`, `g6-deriv-rules`, `a1-dl-usual`, `a1-extrema-global`, `a1-fn-ivt`, `a1-int-direct`, `a1-int-parts`, `a1-int-subst`, `a1-mvt`, `a1-seq-rec-fixed`, `l-det-props`, `l-eig-charpoly`, `l-mat-lu`, `l-orth-lsq`, `l-sys-augmented`, `l-sys-echelon`, `a2-lagrange`, `a2-ode-cauchy`, `a2-ode-linear1`, `a2-partials`, `m-cholesky`, `m-cond`, `m-ode-modes`, `m-posdef`, `m-quad-gradient`.

Le module M possède Cholesky, le conditionnement, la méthode de la puissance et la SVD. Le module N y renvoie et ne les réenseigne pas. Les QCM de SVD et de puissance itérée des examens MT 2020 et 2021 sont des items de M. Ils entrent dans le pool de `ba4-numerique` par `pool:{units:['numerique'], extraSkills:[…M…]}` (voir les extensions en fin de fichier).

### Conventions communes du module

**Préludes Python.** Ils sont écrits dans le sous-ensemble du §12 : pas de compréhension de liste, pas de `lambda`. L'item en ajoute un ou deux avant le code de l'élève, sans les afficher, sauf leurs signatures dans un encadré « Fonctions disponibles ».

`PRELUDE_VEC`
```python
import math

def zeros(n):
    v = []
    for i in range(n):
        v.append(0.0)
    return v

def dot(u, v):
    s = 0.0
    for i in range(len(u)):
        s = s + u[i] * v[i]
    return s

def norm(v):
    return math.sqrt(dot(v, v))
```

`PRELUDE_MAT` (suppose `PRELUDE_VEC`)
```python
def zeros2(n, m):
    A = []
    for i in range(n):
        A.append(zeros(m))
    return A

def eye(n):
    A = zeros2(n, n)
    for i in range(n):
        A[i][i] = 1.0
    return A

def copy2(A):
    B = []
    for i in range(len(A)):
        row = []
        for j in range(len(A[i])):
            row.append(A[i][j])
        B.append(row)
    return B

def matvec(A, x):
    y = zeros(len(A))
    for i in range(len(A)):
        for j in range(len(x)):
            y[i] = y[i] + A[i][j] * x[j]
    return y

def transpose(A):
    T = zeros2(len(A[0]), len(A))
    for i in range(len(A)):
        for j in range(len(A[0])):
            T[j][i] = A[i][j]
    return T

def matmul(A, B):
    C = zeros2(len(A), len(B[0]))
    for i in range(len(A)):
        for j in range(len(B[0])):
            for k in range(len(B)):
                C[i][j] = C[i][j] + A[i][k] * B[k][j]
    return C

def solve(A, b):
    # Gauss avec pivot partiel, sur des copies ; joue le rôle de A\b
    n = len(A)
    M = copy2(A)
    x = []
    for i in range(n):
        x.append(b[i])
    for k in range(n - 1):
        p = k
        for i in range(k + 1, n):
            if abs(M[i][k]) > abs(M[p][k]):
                p = i
        tmp = M[k]
        M[k] = M[p]
        M[p] = tmp
        tmp = x[k]
        x[k] = x[p]
        x[p] = tmp
        for i in range(k + 1, n):
            l = M[i][k] / M[k][k]
            for j in range(k, n):
                M[i][j] = M[i][j] - l * M[k][j]
            x[i] = x[i] - l * x[k]
    for i in range(n - 1, -1, -1):
        s = x[i]
        for j in range(i + 1, n):
            s = s - M[i][j] * x[j]
        x[i] = s / M[i][i]
    return x
```

**Items `code`.**
- **Format.** Chaque entrée donne la source de référence. Les parties entre `«…»` sont les trous possibles. Le générateur choisit lesquels deviennent `???` et remplit les autres avec la solution.
- **Progression des trous**, sauf mention contraire :
  - L1 : un trou, en QCM à 4 options produites par les pièges. C'est le format exact des examens.
  - L2 : un trou à taper.
  - L3 : 2 ou 3 trous liés, par exemple la mise à jour et le critère d'arrêt.
  - L4 : tous les trous d'une boucle.
  - L5 : tous les trous, puis un `readtable` sur la sortie du programme.
- **Tests.** Ils sont écrits `{setup, expr, expect, tol}`. La tolérance est relative et vaut 1e−9 si elle n'est pas donnée. `atol` est une tolérance absolue, pour les valeurs proches de 0 (voir les extensions en fin de fichier). Les fonctions passées en argument (`f`, `df`, `phi`) sont définies par `def` dans `setup`.

**Items `readtable`.**
- **Données.** Les tableaux viennent de l'exécution de la solution de référence (en JS, dans le générateur). Les nombres sont affichés en notation `%e` à 4 ou 7 chiffres, comme la sortie des programmes d'examen (`2.032035e-02`).
- **Valeurs vérifiées.** Les tableaux donnés en exemple ci-dessous ont été recalculés avec les programmes Python de ce catalogue. Ils reproduisent exactement les sorties des examens 2019, 2020 et 2022 quand ils en viennent.
- **Questions.** La question est un `mcq` (souvent `multi: true`, avec le barème +1/N et −1/M), ou un `answer` jugé par `stat`.

**Items `table`** (itérations à la main). Le juge `iter` reçoit `phi` sous l'une de deux formes :
- une expression en `x`, pour un point fixe scalaire ;
- un objet `{kind, …}` qui calcule la ligne suivante à partir de la ligne précédente de l'élève : `bisection`, `secant` (deux lignes), `jacobi`, `gs`, `ode`, `gradient`.

Les colonnes dérivées (`inc` = δ, `r1`, `r2` = rapports) sont recalculées à partir des valeurs saisies. Aux niveaux 1 à 4, une calculatrice intégrée (quatre opérations, √, exp, ln, sin, cos) est disponible pour les tableaux. Les variantes d'examen ne l'ont jamais, et leurs nombres se calculent de tête.

**Valeurs numériques.** Les réponses décimales sont jugées par `stat` avec `{sig: k}` : même valeur à k chiffres significatifs (voir les extensions en fin de fichier). Les réponses exactes (fractions, √, π) sont jugées par `value`.

## Compétences

### `n-err-abs-rel` — Erreurs absolue et relative ; arrondis
- **Année** 16 · **Prérequis** `@alg:A-arrondir`, `@alg:J-quel-pourcentage` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `@alg:J-quel-pourcentage` : erreur relative exprimée en pourcentage.
- **Statut** : fait le 10 novembre 2026 (étape U9). x = p/q (q ∈ {3, 6, 7, 9, 11}), x̃ son arrondi à 2, 3 ou 4 chiffres significatifs ; e_abs et e_rel en fractions exactes (juge `value`). L1 : lignes guidées (même dénominateur, puis division) ; L2 : avec la décision « diviser par x ou par x̃ » (`n_rel_by_approx`) ; L3 : menus ; L4 : deux paires (gabarit 3) classées différemment par e_abs et e_rel, puis la meilleure au sens relatif ; L5 : `readtable` des itérés de Newton pour √c, avec une question `answer` (« à partir de quel k a-t-on 5 chiffres significatifs exacts ? ») au lieu de cases e_abs et e_rel à remplir. Une fois sur trois, L1, L2 et L4 sont l'item `code` errors(x, xt) : un trou au choix, un trou tapé, puis les deux trous. QCM : e_rel (pièges division par x̃ et erreur signée) ou une mesure en % (gabarit 2, sans piège pour le facteur 100). V/F : une affirmation vraie sur l'arrondi, ou « e_abs ≤ 10⁻³ ⇒ 3 chiffres exacts », faux avec x = 10⁻⁴, x̃ = 0 (`num` `absSmallNotSig`).
- **Intro** : e_abs = |x − x̃| et e_rel = |x − x̃| / |x| (x ≠ 0), où x est la valeur exacte et x̃ l'approximation. Arrondir x à d chiffres significatifs donne e_rel ≤ 5·10⁻ᵈ. L'erreur relative compare des grandeurs d'échelles différentes. Exemple : x = 2/3, x̃ = 0,667.
  - `e_abs = |0,667 − 2/3| = |2001/3000 − 2000/3000| = 1/3000` (note : « même dénominateur »)
  - `e_rel = (1/3000)/(2/3) = 1/2000 = 5·10⁻⁴` (note : « on divise par la valeur exacte »)
- **Juge** : `value` `{form:'fraction-or-decimal'}` pour les erreurs exactes ; `stat` `{sig: 2}` pour les erreurs données en décimal · **Forme finale** : e_abs et e_rel, chacune en fraction irréductible ou en décimal à 2 chiffres significatifs.
- **Niveaux** :
  - L1 (guidé) : les deux lignes du corrigé avec des trous sur le numérateur et sur le dénominateur.
  - L2 : e_abs à trous ; pour e_rel, une décision « diviser par x ou par x̃ ? ».
  - L3 (choisir l'action) : actions proposées « mettre au même dénominateur », « diviser par |x| », « diviser par |x̃| » (choix piège), « arrondir à 2 chiffres ».
  - L4 (libre) : une valeur exacte et deux approximations. Calculer les quatre erreurs et dire laquelle est la meilleure au sens relatif.
  - L5 (seul) : `readtable`, décrit ci-dessous.
- **Générateur** : on part de l'erreur.
  - **Gabarit 1.** x = p/q avec q ∈ {3, 6, 7, 9, 11} et 1 ≤ p < 5q, ou x ∈ {π, √2, e} donné avec 8 chiffres. x̃ est l'arrondi ou la troncature de x à d ∈ {2, 3, 4} chiffres significatifs.
  - **Gabarit 2.** Une mesure : « L = 12,5 cm à ±0,05 cm près », où e_rel est demandée en %.
  - **Gabarit 3.** Deux paires qui classent les approximations dans un ordre différent selon l'erreur absolue et l'erreur relative, comme (1000 ; 999) et (0,01 ; 0,011).
  - **Contraintes.** |x| ∈ [10⁻³ ; 10⁴] et x ≠ 0. Pour le gabarit 1 avec x rationnel, e_rel est rationnelle avec un dénominateur ≤ 10⁵.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def errors(x, xt):
      ea = «abs(x - xt)»
      er = «ea / abs(x)»
      return [ea, er]
  ```
  Tests :

  | setup | expr | expect | tol |
  |---|---|---|---|
  | | `errors(2/3, 0.667)` | `[3.3333333333e-4, 5.0e-4]` | 1e−6 |
  | | `errors(1000, 999)` | `[1, 0.001]` | |
  | | `errors(-2, -2.1)` | `[0.1, 0.05]` | 1e−9 |

  Le 3e test rejette `ea / x`, qui donne une erreur négative.
- **Item `readtable`** (L5) : les itérés de Newton pour √2, x⁽ᵏ⁾ = 1 ; 1,5 ; 1,4166667 ; 1,4142157, avec α = 1,41421356. L'élève remplit e_abs et e_rel, jugées par `stat` `{sig: 2}`. Question (`answer`) : « À partir de quel k x⁽ᵏ⁾ a-t-il 5 chiffres significatifs exacts ? » Réponse : k = 3, puisque e_rel = 1,5·10⁻⁶ ≤ 5·10⁻⁵ alors que pour k = 2, e_rel = 1,7·10⁻³.
- **Corrigé type** : x = 2/3, x̃ = 0,667.
  1. `|0,667 − 2/3|` — sous-but `abs`.
  2. `= 1/3000` — sous-but `abs`.
  3. `e_rel = (1/3000)/(2/3)` — sous-but `rel`.
  4. `= 1/2000 = 5·10⁻⁴` — sous-but `rel`.
- **Aides** :
  1. « L'erreur relative divise l'erreur absolue par la valeur **exacte**. »
  2. « e_rel = |x − x̃| / |▢| »
  3. « e_rel = (1/3000)/(2/3) = 1/2000. »
- **Variantes d'examen** :
  - `mcq` : les distracteurs viennent de `n_rel_by_approx` (division par x̃), de `n_abs_signed` (erreur avec signe) et d'un facteur 100 oublié dans les pourcentages.
  - `tf` :
    - « L'approximation 999 de 1000 est moins bonne, en erreur relative, que 0,011 pour 0,01 » : faux, puisque 10⁻³ < 10⁻¹. Le contre-exemple est la paire elle-même.
    - « Si e_abs ≤ 10⁻³, alors x̃ a au moins 3 chiffres significatifs exacts » : faux. Contre-exemple : x = 10⁻⁴ et x̃ = 0.
- **Pièges** : `n_rel_by_approx`, `n_abs_signed`.
- **Sous-buts → crédit** : `abs` → `n-err-abs-rel` ; `rel` → `n-err-abs-rel` ; dénominateur commun → `@alg:A-arrondir`.

### `n-err-float` — Virgule flottante, ε machine, annulation
- **Année** 16 · **Prérequis** `n-err-abs-rel` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U9). Juge `value` {arith: 'fp', digits: 4} ; trois annulations : √(N + 1) − √N avec N ∈ {200, 400, 500, 1000, 2000, 5000, 10 000}, la petite racine de x² − bx + 1 (b = 10³ à 10⁵), et 1 − cos x pour x ∈ {0,01 ; 0,03 ; 0,005 ; 0,002 ; 0,001}. On garde un tirage seulement si la forme naïve se trompe d'au moins 10 % et la forme stable d'au plus 0,1 %. L1 : la forme stable guidée ; L2 : les deux formes guidées, la réécriture choisie dans une décision (piège `n_cancel_ignored`) ; L3 : menus, avec la réécriture exacte en ligne `equiv` ; L4 : les deux formes et l'erreur relative de la forme naïve (calculée à partir de l'expression exacte), ou (une fois sur deux) le `readtable` de (1 − cos x)/x² en double précision ; L5 : l'item `code` (g_stable, small_root). QCM : quelle formule est stable. V/F : l'absorption (QCM Vrai/Faux) ; « l'erreur d'arrondi vaut 10⁻¹⁶ en valeur absolue », faux avec x = 10²⁰ (`num` `roundAbsLarge`).
- **Intro** : un ordinateur garde environ 16 chiffres significatifs : fl(x) = x(1 + δ) avec |δ| ≤ ε ≈ 10⁻¹⁶. L'erreur d'arrondi est **relative**. Soustraire deux nombres proches fait perdre des chiffres (annulation) : on réécrit alors le calcul. Exemple, en arithmétique à 4 chiffres :
  - `√1001 − √1000 = 31,64 − 31,62 = 0,02` (note : « faux dès le 1er chiffre : la vraie valeur est 0,01581 »)
  - `= 1/(√1001 + √1000) = 1/63,26 = 0,01581` (note : « conjugué : plus de soustraction »)
- **Juge** : `value` `{arith:'fp', digits:4}`. Chaque ligne est l'arrondi à 4 chiffres (`fp.js`) de l'opération annoncée sur la ligne précédente. Une ligne de réécriture est jugée par `equiv` en arithmétique exacte. · **Forme finale** : le nombre à 4 chiffres, puis l'erreur relative des deux formes.
- **Niveaux** :
  - L1 (guidé) : le calcul naïf à 4 chiffres est donné. L'élève complète la forme conjuguée.
  - L2 : le calcul naïf est à trous ; la réécriture est à choisir.
  - L3 (choisir l'action) : actions proposées « multiplier par le conjugué », « factoriser x² − y² », « 1 − cos x = 2 sin²(x/2) », « remplacer ln(1 + x) par son DL », « arrondir plus tôt » (choix piège).
  - L4 (libre) : calculer les deux formes à 4 chiffres et donner leurs erreurs relatives.
  - L5 (seul) : l'item `code` de la petite racine d'un trinôme, sans aide.
- **Générateur** : on part de l'annulation voulue.
  - **Gabarit 1.** √(N + 1) − √N avec N ∈ {200, 400, 500, 1000, 2000, 5000, 10 000}. (Corrigé à l'étape U9 : la liste d'origine contenait 100 et 2500, qui ne vérifient pas la contrainte ci-dessous : à 4 chiffres, √101 − √100 = 0,05 et √2501 − √2500 = 0,01 ont une erreur relative de 0,25 % et 0,002 % seulement.)
  - **Gabarit 2.** La petite racine de x² − bx + 1 avec b = 10ᵏ, k ∈ {3, …, 8}, calculée par (b − √(b² − 4))/2, puis par 1/x₊ (produit des racines = 1).
  - **Gabarit 3.** 1 − cos x avec x = 10⁻ᵏ.
  - **Contrainte.** La forme naïve à 4 chiffres a une erreur relative ≥ 10 % et la forme stable ≤ 0,1 %.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def g_stable(x):
      # meme valeur que sqrt(x + 1) - sqrt(x), sans soustraction
      return «1 / (math.sqrt(x + 1) + math.sqrt(x))»

  def small_root(b, c):
      # petite racine de x^2 - b x + c = 0, avec b > 0 grand
      big = «(b + math.sqrt(b * b - 4 * c)) / 2»
      return «c / big»
  ```
  Tests :

  | expr | expect | tol |
  |---|---|---|
  | `small_root(1e8, 1)` | `1e-08` | 1e−9 |
  | `g_stable(1e12)` | `4.999999999998749e-07` | 1e−9 |
  | `g_stable(1e4)` | `0.004999875006249609` | |

  La forme naïve `(b - math.sqrt(b*b - 4*c)) / 2` donne `7.450580596923828e-09` et échoue au 1er test. `math.sqrt(x+1) - math.sqrt(x)` donne `5.00003807e-07` et échoue au 2e.
- **Item `readtable`** (L4) : pour x = 10⁻¹ … 10⁻⁸, les valeurs en double de (1 − cos x)/x² et de 2 sin²(x/2)/x². La première s'écarte de 1/2 pour x petit. Question : « Pourquoi ? » (`mcq`), avec pour bonne réponse « annulation dans 1 − cos x ».
- **Corrigé type** : à 4 chiffres, √1001 − √1000.
  1. `31,64 − 31,62` — sous-but `naive`.
  2. `= 0,02` — sous-but `naive`.
  3. `1/(31,64 + 31,62)` — sous-but `rewrite`.
  4. `= 1/63,26 = 0,01581` — sous-but `rewrite`.
  5. `e_rel(naïf) = 0,0042/0,0158 ≈ 27 %` — sous-but `compare` → `n-err-abs-rel`.
- **Aides** :
  1. « On soustrait deux nombres presque égaux : les chiffres communs disparaissent. Réécris sans soustraction. »
  2. « √(N+1) − √N = (N + 1 − N)/(▢ + ▢) »
  3. « = 1/(√1001 + √1000) = 1/63,26 = 0,01581. »
- **Variantes d'examen** :
  - `tf` :
    - « En double précision, (1 + 10⁻¹⁷) − 1 vaut 10⁻¹⁷ » : faux, le résultat vaut 0.
    - « L'erreur d'arrondi sur fl(x) est d'environ 10⁻¹⁶ en valeur absolue » : faux, elle est relative. Contre-exemple : x = 10²⁰ donne une erreur absolue d'environ 10⁴.
  - `mcq` : « Laquelle de ces formules est stable pour x grand ? »
- **Pièges** : `n_cancel_ignored`, `n_eps_absolute`.
- **Sous-buts → crédit** : `naive`, `rewrite` → `n-err-float` ; `compare` → `n-err-abs-rel`.

### `n-bisection` — Bissection : nombre d'itérations et intervalles
- **Année** 16 · **Prérequis** `a1-fn-ivt`, `g2-log-rules` · **Étiquettes** `GM` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-fn-ivt` : f continue et f(a)f(b) < 0 : un zéro existe (TVI).
- **Statut** : fait le 10 novembre 2026 (étape U9). f ∈ {x² − c, x³ − x − 2, cos x − x}, b − a ∈ {1, 2, 4}, tol de 10⁻² à 10⁻¹⁰ (log₂((b − a)/tol) à au moins 0,05 d'un entier). k_min se calcule en lignes `value` : (b − a)/tol, log₂(…) − 1 à 0,01 près, puis k_min (pièges `n_bisect_no_minus1`, `n_bisect_log10`). Le tableau utilise le juge `iter` (phi `bisect` : a, b, x, signe de f(x)). L1 et L2 : les lignes de k_min ou le tableau ; L3 : trois pas où l'on choisit la moitié à garder dans un menu, puis k_min ; L4 : le tableau, puis k_min en lignes libres ; L5 : l'item `code`, puis le QCM « vers quel zéro, en au plus combien d'itérations » (polynôme de degré 3 à zéros demi-entiers sur [−2 ; 2]). Examen : ce QCM ou la ligne `kmin = int(???)` ; V/F « l'erreur diminue à chaque pas », faux avec x − 0,51 sur [0 ; 1] (`num` `bisectErrorUp`), ou (x − 1)² sur [0 ; 3] (QCM Vrai/Faux).
- **Intro** : si f est continue et f(a)f(b) < 0, on prend le milieu x⁽ᵏ⁾ et on garde la moitié où f change de signe. On a |α − x⁽ᵏ⁾| ≤ (b − a)/2ᵏ⁺¹. Pour garantir une tolérance tol, il faut k_min > log₂((b − a)/tol) − 1. Exemple : f(x) = x² − 2 sur [1 ; 2] avec tol = 10⁻³.
  - `(b − a)/2^(k+1) ≤ 10⁻³` (note : « borne garantie »)
  - `k > log₂(1000) − 1 ≈ 9,97 − 1 = 8,97` (note : « 2¹⁰ = 1024 ≈ 10³ »)
  - `k_min = 9`
  - `x⁽⁰⁾ = 1,5 ; f(1,5) > 0 → [1 ; 1,5] ; x⁽¹⁾ = 1,25`
- **Juge** :
  - partie A : `lines` `equiv` jusqu'à l'inégalité en k, puis `value` sur l'entier k_min ;
  - partie B : `table` `iter` `{phi:{kind:'bisection', f:'x^2-2'}, cols:['a','b','x','signe'], tol:1e-12}`. Les itérés sont dyadiques, donc exacts.
  - **Forme finale** : k_min entier, et le tableau rempli jusqu'à la ligne demandée.
- **Niveaux** :
  - L1 (guidé) : l'inégalité est à trous (`2^(k+1) ≥ ▢`) ; la 1re ligne du tableau est donnée.
  - L2 : l'élève écrit le logarithme ; pour chaque ligne du tableau, une décision « [a ; x] ou [x ; b] ? ».
  - L3 (choisir l'action) : actions proposées « garder [a ; x⁽ᵏ⁾] », « garder [x⁽ᵏ⁾ ; b] », « arrêter », appliquées ligne par ligne, puis k_min.
  - L4 (libre) : 4 lignes du tableau et k_min.
  - L5 (seul) : l'item `code`, puis un QCM d'examen (« vers quel zéro, en au plus combien d'itérations ? »).
- **Générateur** : on part de α et de l'intervalle.
  - **Fonction.** f est tirée dans x² − c (c ∈ {2, 3, 5, 7}), x³ − x − 2, cos x − x (avec calculatrice), ou un polynôme à 3 zéros pour la question « vers quel zéro ? ».
  - **Intervalle et tolérance.** b − a ∈ {1, 2, 4} et tol ∈ {10⁻², 10⁻³, 10⁻⁵, 10⁻⁶, 10⁻¹⁰}.
  - **Contrainte.** log₂((b − a)/tol) est à distance ≥ 0,05 d'un entier, pour éviter le cas limite où « > » et « ≥ » donnent des réponses différentes.
  - **Gabarit « vers quel zéro ? ».** Le polynôme a 3 zéros dans [−2 ; 2], le premier milieu est 0, et f(0) est non nul de signe choisi. Le zéro atteint est imposé par les signes.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def bisection(f, a, b, tol):
      kmin = int(«math.log((b - a) / tol) / math.log(2)»)   # plus petit entier > log2(...) - 1
      x = (a + b) / 2
      for k in range(kmin):
          if f(x) * f(a) < 0:
              b = «x»
          else:
              a = «x»
          x = «(a + b) / 2»
      return [x, kmin]
  ```
  Tests :

  | setup | expr | expect | tol |
  |---|---|---|---|
  | `def f(x): return x*x - 2` | `bisection(f, 1, 2, 1e-3)` | `[1.4150390625, 9]` | 1e−12 |
  | `def f(x): return x**3 - x - 2` | `bisection(f, 1, 2, 1e-6)` | `[1.5213804244995117, 19]` | 1e−12 |
  | `def f(x): return math.cos(x) - x` | `bisection(f, 0, 1, 1e-4)` | `[0.73907470703125, 13]` | 1e−12 |
- **Corrigé type** : x² − 2 sur [1 ; 2], tol = 10⁻³.
  1. `(2 − 1)/2^(k+1) ≤ 10⁻³` — sous-but `bound`.
  2. `2^(k+1) ≥ 1000` — sous-but `bound`.
  3. `k + 1 > log₂ 1000 ≈ 9,97` — sous-but `log` → `g2-log-rules`.
  4. `k_min = 9` — sous-but `kmin`.
  5. Tableau : `1 | 2 | 1,5 | +` puis `1 | 1,5 | 1,25 | −` puis `1,25 | 1,5 | 1,375 | −` puis `1,375 | 1,5 | 1,4375 | +` — sous-but `iterate`.
- **Aides** :
  1. « À l'étape k, l'intervalle a la longueur (b − a)/2ᵏ, et le milieu est à au plus la moitié de cette longueur du zéro. »
  2. « (b − a)/2^(k+1) ≤ tol ⇔ k ≥ log₂(▢) − 1 »
  3. « k > log₂(1000) − 1 ≈ 8,97, donc k_min = 9. »
- **Variantes d'examen** :
  - `mcq` (GM 2012) : « Bissection sur [−2 ; 2], tol = 10⁻⁵. Vers quel zéro converge-t-elle, et en au plus combien d'itérations ? » On a log₂(4·10⁵) − 1 ≈ 17,6, donc 18. Les distracteurs viennent de `n_bisect_no_minus1` (19), de `n_bisect_log10` (5) et d'un mauvais choix de zéro.
  - `tf` :
    - « L'erreur |α − x⁽ᵏ⁾| diminue à chaque itération » : faux. Contre-exemple : f(x) = x − 0,51 sur [0 ; 1] donne x⁽⁰⁾ = 0,5 (erreur 0,01), puis x⁽¹⁾ = 0,75 (erreur 0,24). C'est la **borne** qui est divisée par 2.
    - « La bissection s'applique à f(x) = (x − 1)² sur [0 ; 3] » : faux, f ne change pas de signe.
- **Pièges** : `n_bisect_no_minus1`, `n_bisect_log10`, `n_bisect_wrong_half`.
- **Sous-buts → crédit** : `bound`, `kmin`, `iterate` → `n-bisection` ; `log` → `g2-log-rules`.

### `n-fp-converge` — Point fixe : convergence, choix de φ
- **Année** 16 · **Prérequis** `a1-seq-rec-fixed`, `a1-mvt` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-seq-rec-fixed` : suite récurrente et point fixe α = φ(α) ; `a1-mvt` : |φ′| < 1 donne une contraction par les accroissements finis.
- **Statut** : fait le 10 novembre 2026 (étape U9). Gabarit 1 : φ = ax/(b + x), points fixes 0 et α = a − b, φ′(α) = b/a ∈ {1/2, 1/3, 2/3, 1/4, 3/4}, itérés exacts (dénominateurs ≤ 10⁴). Points fixes avec `solset`, φ′ avec `equiv`, φ′(α) et les itérés avec `value`, puis la décision de convergence (pièges `n_fp_f_vs_phi`, `n_fp_phi_at_x0`). L1 : φ′ donnée ; L2 : points fixes et φ′ guidés ; L3 : gabarit 2 (x² − x − c), choisir la reformulation la plus rapide (φ₃ en `quality: 'poor'`), puis φ₂′(α) ; L4 : tout en lignes libres, avec 3 itérations en lignes (pas de tableau `iter`) ; L5 : l'item `code` fixed_point, puis le `readtable` des incréments (ordre 1, rapport → φ′(α)). Le gabarit 3 (diode) n'est pas construit. QCM : gabarit 2 (piège `n_fp_abs_forgot`). V/F : « converge quel que soit x⁽⁰⁾ », faux avec x², α = 0, x⁽⁰⁾ = 2 (`fpNotGlobal`) ; « le résidu estime l'erreur », faux avec 0,99x + 0,01 (`residualNotError`).
- **Intro** : x⁽ᵏ⁺¹⁾ = φ(x⁽ᵏ⁾), et α = φ(α).
  - Si φ est C¹ près de α et |φ′(α)| < 1, la méthode converge pour x⁽⁰⁾ assez proche de α, et |x⁽ᵏ⁺¹⁾ − α| ≈ |φ′(α)|·|x⁽ᵏ⁾ − α|.
  - Si |φ′(α)| > 1, elle ne converge pas vers α.
  - On arrête quand |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| < tol.

  Exemple : φ(x) = 2x/(1 + x) (modèle de Verhulst).
  - `φ(x) = x ⇔ x = 0 ou x = 1`
  - `φ′(x) = 2/(1 + x)²`, `φ′(1) = 1/2`, `φ′(0) = 2` (note : « converge vers 1, jamais vers 0 »)
  - `x⁽⁰⁾ = 2 → 4/3 → 8/7 → 16/15` (note : « erreurs 1, 1/3, 1/7, 1/15 : rapport → 1/2 »)
- **Juge** :
  - `lines` `equiv` pour φ′ (cible : simplifiée) ;
  - `value` pour φ′(α) ;
  - une ligne de décision « converge / ne converge pas vers α » ;
  - `table` `iter` `{phi:'2x/(1+x)', cols:['x','inc','r1'], tol:1e-6}`.
  - **Forme finale** : décision justifiée par la valeur de |φ′(α)|, et tableau rempli.
- **Niveaux** :
  - L1 (guidé) : φ′ est donnée ; l'élève remplace par α et choisit la décision.
  - L2 : trouver les points fixes (φ(x) = x), puis φ′ à trous.
  - L3 (choisir l'action) : trois reformulations φ₁, φ₂, φ₃ de f(x) = 0 ; l'élève choisit celle qui converge vers α, en touchant la valeur de φᵢ′(α).
  - L4 (libre) : points fixes, φ′, décision, puis 3 itérations.
  - L5 (seul) : L4 avec la tolérance et le nombre d'itérations, ou l'item `code`.
- **Générateur** : on part de α et de φ′(α).
  - **Gabarit 1.** φ(x) = ax/(b + x), avec a > b entiers, α = a − b et φ′(α) = b/a ∈ {1/2, 1/3, 2/3, 1/4, 3/4}. x⁽⁰⁾ est entier, ≠ α, > 0. Les 3 premiers itérés sont rationnels, avec un dénominateur ≤ 10⁴.
  - **Gabarit 2.** f(x) = x² − x − c avec c = m(m − 1), m ∈ {2, 3, 4}, de racines m et 1 − m. Les reformulations sont φ₁ = x² − c, φ₂ = √(x + c) et φ₃ = 1 + c/x. Pour c = 2 et α = 2 : φ₁′ = 4 (diverge), φ₂′ = 1/4 (converge) et φ₃′ = −1/2 (converge en oscillant).
  - **Gabarit 3** (circuit à diode des notes GM, avec calculatrice) : φ(x) = v₀ ln((V − x)/(Ri₀) + 1) contre φ(x) = V − Ri₀(e^(x/v₀) − 1).
  - **Contrainte.** |φ′(α)| ∉ [0,95 ; 1,05], pour que la décision soit nette.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def fixed_point(phi, x0, tol, nmax):
      x = x0
      for k in range(nmax):
          x_new = «phi(x)»
          if «abs(x_new - x) < tol»:
              return [x_new, k + 1]
          x = «x_new»
      return [x, nmax]
  ```
  Tests :

  | setup | expr | expect | tol |
  |---|---|---|---|
  | `def phi(x): return 2*x/(1+x)` | `fixed_point(phi, 2.0, 1e-6, 100)` | `[1.000000953675226, 19]` | 1e−12 |
  | `def phi(x): return 3*x/(1+x)` | `fixed_point(phi, 1.0, 1e-8, 100)` | `[1.9999999982792167, 19]` | 1e−12 |
  | `def phi(x): return math.cos(x)` | `fixed_point(phi, 1.0, 1e-10, 1000)` | `[0.7390851332451103, 58]` | 1e−12 |
- **Corrigé type** : φ(x) = 2x/(1 + x), x⁽⁰⁾ = 2.
  1. `2x/(1+x) = x ⇔ x(1 − x) = 0` — sous-but `fixed`.
  2. `α ∈ {0 ; 1}` — sous-but `fixed`.
  3. `φ′(x) = 2/(1+x)²` — sous-but `deriv` → `g6-deriv-rules`.
  4. `φ′(1) = 1/2 < 1 : converge vers 1 ; φ′(0) = 2 > 1 : pas vers 0` — sous-but `decide`.
  5. Tableau `2 | 4/3 | 8/7 | 16/15`, incréments `2/3 | 4/21 | 8/105`, rapports `2/7 | 2/5` → 1/2 — sous-but `iterate`.
- **Aides** :
  1. « Regarde la pente de φ au point fixe : si |φ′(α)| < 1, φ rapproche les points de α. »
  2. « φ′(x) = 2/(1 + x)², donc φ′(1) = ▢. »
  3. « φ′(1) = 1/2 < 1 : la méthode converge vers 1, et l'erreur est environ divisée par 2 à chaque pas. »
- **Variantes d'examen** :
  - `mcq` : « Laquelle de ces fonctions φ donne une méthode convergente vers α = 2 ? » Les distracteurs viennent de `n_fp_f_vs_phi`, `n_fp_abs_forgot` et `n_fp_phi_at_x0`.
  - `tf` :
    - « Si |φ′(α)| < 1, la méthode converge pour tout x⁽⁰⁾ » : faux. Contre-exemple : φ(x) = x², α = 0, x⁽⁰⁾ = 2.
    - « Le résidu |x⁽ᵏ⁾ − φ(x⁽ᵏ⁾)| est toujours une bonne estimation de l'erreur » : faux quand φ′(α) est proche de 1, puisque erreur ≈ résidu/(1 − φ′(α)). Contre-exemple : φ(x) = 0,99x + 0,01 et x⁽⁰⁾ = 2 donnent un résidu de 0,01 pour une erreur de 1.
- **Pièges** : `n_fp_f_vs_phi`, `n_fp_phi_at_x0`, `n_fp_abs_forgot`.
- **Sous-buts → crédit** : `fixed` → `n-fp-converge` ; `deriv` → `g6-deriv-rules` ; `decide`, `iterate` → `n-fp-converge`.

### `n-fp-order` — Ordre d'un point fixe, ordre selon un paramètre
- **Année** 16 · **Prérequis** `n-fp-converge`, `a1-dl-usual` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `n-fp-converge` : φ et son point fixe α ; `a1-dl-usual` : Taylor de φ autour de α.
- **Statut** : fait le 10 novembre 2026 (étape U9). φ_ω = x − ω(x − α)(x + β), F = f′(α) = α + β, avec |F| ≤ 12 : ω* = 1/F, φ″(α) = −2/F, convergence pour |1 − ωF| < 1. Juges : `equiv` pour α point fixe et φ′, `solset` en ω pour ω* et l'intervalle, `value` pour φ″(α) et pour l'ordre p (piège `n_fp_order_count`). L1 : φ′, ω* et φ″ guidés ; L2 : dérivée libre et décision sur l'ordre ; L3 : menus ; L4 : le problème complet avec l'intervalle (gabarit 1 seulement, le gabarit 2 x − ωf/f′ n'est pas construit) ; L5 : `readtable` des incréments pour ω₁ = 4/(5F) et ω*, puis un QCM à plusieurs réponses (au lieu du problème GM en quatre parties : un `problem` ne contient pas de `readtable`). QCM : (x − a)³ + a, d'ordre 3 en a (GM 2013). V/F : « φ′(α) = 0 ⇒ ordre 2 », faux avec (x − 1)³ + 1 (`orderAboveTwo`), ou un énoncé vrai. `coef` : ω*.
- **Intro** : si φ′(α) = … = φ⁽ᵖ⁻¹⁾(α) = 0 et φ⁽ᵖ⁾(α) ≠ 0, la méthode est d'ordre p. Par Taylor, x⁽ᵏ⁺¹⁾ − α = φ⁽ᵖ⁾(ξ)/p!·(x⁽ᵏ⁾ − α)ᵖ, donc le rapport tend vers |φ⁽ᵖ⁾(α)|/p!. Exemple : φ_ω(x) = x − ω(x² − 4), α = 2.
  - `φ_ω(2) = 2 pour tout ω` (note : « α est point fixe »)
  - `φ_ω′(2) = 1 − 4ω` (note : « nul ⇔ ω = 1/4 »)
  - `φ_ω″(2) = −2ω = −1/2 ≠ 0` (note : « ordre exactement 2 pour ω = 1/4 »)
  - `|1 − 4ω| < 1 ⇔ 0 < ω < 1/2` (note : « sinon : ordre 1, ou pas de convergence »)
- **Juge** : `lines` `equiv` (dérivées) ; `solset` `{v:'ω'}` pour l'ensemble de convergence ; `value` pour ω* et pour p · **Forme finale** : ω*, l'ordre p, et l'intervalle de convergence ]0 ; 1/2[.
- **Niveaux** :
  - L1 (guidé) : φ′ et φ″ à trous ; l'élève résout 1 − 4ω = 0.
  - L2 : dérivées libres ; une décision « φ″(α) = 0 ? → ordre 2 ou plus ».
  - L3 (choisir l'action) : actions proposées « calculer φ′(α) », « résoudre φ′(α) = 0 », « calculer φ″(α) », « conclure l'ordre ».
  - L4 (libre) : le problème complet sur un autre gabarit.
  - L5 (seul) : problème « à la GM » en quatre questions :
    - (a) α est point fixe pour tout ω ;
    - (b) ω tel que l'ordre soit ≥ 2 ;
    - (c) existe-t-il ω donnant un ordre 3 ? ;
    - (d) `readtable`.
- **Générateur** : on part de α et de ω*.
  - **Gabarit 1.** φ_ω = x − ω·f(x), avec f polynôme à racine entière α ∈ {1, …, 5} et f′(α) ∈ ℤ*. Alors ω* = 1/f′(α), la convergence a lieu pour 0 < ω·f′(α) < 2, et l'ordre vaut 3 si de plus f″(α) = 0.
  - **Gabarit 2.** φ_ω = x − ω·f/f′ : φ′(α) = 1 − ω, donc ordre 2 ⇔ ω = 1 (Newton).
  - **Gabarit 3** (GM 2013). φ(x) = (x − a)³ + a et ses trois points fixes a − 1, a, a + 1 : φ′(a ± 1) = 3 et φ′(a) = φ″(a) = 0 ≠ φ‴(a) = 6, donc ordre 3 en a.
  - **Contrainte.** ω* est rationnel, avec un dénominateur ≤ 12.
- **Item `readtable`** (`PRELUDE` inutile). Incréments de φ_ω(x) = x − ω(x² − 4) avec x⁽⁰⁾ = 2,5.

  | k | δₖ (ω = 0,2) | r₁ | δₖ (ω = 1/4) | r₂ |
  |---|---|---|---|---|
  | 0 | 4.500e-01 | | 5.625e-01 | |
  | 1 | 4.050e-02 | 0.090 | 6.152e-02 | 0.194 |
  | 2 | 7.618e-03 | 0.188 | 9.763e-04 | 0.258 |
  | 3 | 1.506e-03 | 0.198 | 2.384e-07 | 0.250 |
  | 4 | 3.006e-04 | 0.200 | 1.421e-14 | 0.250 |
  | 5 | 6.009e-05 | 0.200 | | |

  Question (`mcq multi`) : vrai = « ω = 0,2 : ordre 1, rapport → 0,2 = |1 − 4ω| » ; « ω = 1/4 : ordre 2, rapport → 1/4 = |φ″(2)|/2 ». Distracteurs : « ω = 0,2 : ordre 2 » et « ω = 1/4 : ordre 1 » (`n_order_simple_ratio`).
- **Corrigé type** : φ_ω(x) = x − ω(x² − 4).
  1. `φ_ω(2) = 2 − ω·0 = 2` — sous-but `fixed`.
  2. `φ_ω′(x) = 1 − 2ωx` — sous-but `deriv`.
  3. `φ_ω′(2) = 1 − 4ω = 0 ⇔ ω = 1/4` — sous-but `order2`.
  4. `φ_ω″(2) = −2ω = −1/2 ≠ 0`, donc ordre exactement 2 — sous-but `order-exact`.
  5. `|1 − 4ω| < 1 ⇔ ω ∈ ]0 ; 1/2[` — sous-but `conv`.
- **Aides** :
  1. « L'ordre est le rang de la première dérivée de φ qui ne s'annule pas en α. »
  2. « φ′(2) = 1 − ▢·ω »
  3. « φ′(2) = 1 − 4ω = 0 ⇔ ω = 1/4 ; φ″(2) = −1/2 ≠ 0 : ordre 2. »
- **Variantes d'examen** :
  - `mcq` (GM 2013) : « x⁽ᵏ⁺¹⁾ = (x⁽ᵏ⁾ − 1)³ + 1, de zéros 0, 1, 2. » Bonne réponse : « converge vers 1 à l'ordre 3, ni vers 0 ni vers 2 ». Les distracteurs « ordre 2 » et « ordre 1 » viennent de `n_fp_order_count`.
  - `tf` : « Si φ′(α) = 0, la méthode est d'ordre 2 » : faux. Contre-exemple : φ(x) = (x − 1)³ + 1 en α = 1 est d'ordre 3. L'énoncé correct est « au moins 2 ».
  - `coef` : « Donner ω pour que l'ordre soit 2. »
- **Pièges** : `n_fp_order_count`, `n_order_simple_ratio`, `n_fp_abs_forgot`.
- **Sous-buts → crédit** : `fixed`, `order2`, `order-exact`, `conv` → `n-fp-order` ; `deriv` → `g6-deriv-rules`.

### `n-newton` — Méthode de Newton pour une équation
- **Année** 16 · **Prérequis** `n-fp-converge`, `g6-deriv-rules` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `n-fp-converge` : Newton est le point fixe de φ(x) = x − f(x)/f′(x).
- **Statut** : fait le 10 novembre 2026 (étape U9). f = x² − c, x⁽⁰⁾ entier voisin de √c. L1 : φ simplifiée à trous, puis x⁽¹⁾ ; L2 : tableau (phi `scalar`, incréments calculés par l'app) ; L3 : décision x − f/f′ (pièges `n_newton_inverted`, `n_newton_sign`), puis x⁽¹⁾ ; L4 : tableau avec δ et r₂ à calculer, puis QCM d'ordre ; L5 : programme `newton` (3 trous), puis lecture de ses incréments (QCM à plusieurs réponses). QCM d'examen : la ligne `incr = ???`, ou un tableau d'incréments ; V/F avec le contre-exemple x³ − 2x + 2, x⁽⁰⁾ = 0 (`num` `newtonNoConv`). Les gabarits x³ − c et x − cos x (calculatrice) ne sont pas construits.
- **Intro** : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)/f′(x⁽ᵏ⁾) est le zéro de la tangente. Si α est un zéro simple (f′(α) ≠ 0), Newton est d'ordre 2 près de α. On arrête sur l'incrément : |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| < tol. Exemple : x² = 2, x⁽⁰⁾ = 1.
  - `x⁽ᵏ⁺¹⁾ = x − (x² − 2)/(2x) = (x² + 2)/(2x)`
  - `1 → 3/2 → 17/12 → 577/408` (note : « incréments 0,5 ; 0,0833 ; 0,00245 »)
  - `r₂ = 0,0833/0,5² = 0,33 ; 0,00245/0,0833² = 0,35` (note : « → 1/(2√2) ≈ 0,354 »)
- **Juge** :
  - `lines` `equiv` `{vars:['x'], target:'fraction simplifiée'}` pour la formule d'itération ;
  - `table` `iter` `{phi:'x - (x^2-2)/(2x)', cols:['x','inc','r2'], tol:1e-6}`.
  - **Forme finale** : itérés jusqu'à δ < tol, et l'ordre lu sur r₂.
- **Niveaux** :
  - L1 (guidé) : la formule est à trous (`x − ▢/▢`) ; la 1re ligne du tableau est donnée.
  - L2 : la formule est libre ; deux lignes à trous dans le tableau.
  - L3 (choisir l'action) : actions proposées « x − f/f′ », « x − f′/f » (piège), « x + f/f′ » (piège) ; ensuite, remplir le tableau.
  - L4 (libre) : tableau de 3 itérations, critère d'arrêt, ordre.
  - L5 (seul) : l'item `code`, puis un `readtable` de la sortie.
- **Générateur** : on part de α.
  - **Gabarit 1.** f = x² − c, avec c ∈ {2, 3, 5, 6, 7} non carré, et x⁽⁰⁾ entier voisin de √c. Les itérés restent rationnels ; on garde ceux dont les 2 premiers ont un dénominateur ≤ 10⁴.
  - **Gabarit 2.** f = x³ − c, avec la calculatrice.
  - **Gabarit 3.** f = x − cos x, ou f(x) = (x − e)(x − 1)… (notes GM, avec la calculatrice).
  - **Contrainte.** f′(x⁽ᵏ⁾) ≠ 0 sur les 3 premiers pas, et la convergence est monotone après le 1er pas.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def newton(f, df, x0, tol, nmax):
      x = x0
      for k in range(nmax):
          incr = «f(x) / df(x)»
          x = «x - incr»
          if «abs(incr) < tol»:
              return [x, k + 1]
      return [x, nmax]
  ```
  Tests (le 1er est celui de la série GM 3 : zéro 1,4142, 5 itérations, incréments 0,3591 ; 0,0442 ; 0,0007) :

  | setup | expr | expect | tol |
  |---|---|---|---|
  | `def f(x): return x*x - 2` ; `def df(x): return 2*x` | `newton(f, df, 1.1, 1e-10, 100)` | `[1.4142135623730951, 5]` | 1e−12 |
  | `def f(x): return x**3 - 2` ; `def df(x): return 3*x*x` | `newton(f, df, 2.0, 1e-12, 100)` | `[1.2599210498948732, 6]` | 1e−12 |

  L1 au format d'examen : `x = x - ???` avec les options `f(x)/df(x)` (juste), `df(x)/f(x)` (`n_newton_inverted`), `-f(x)/df(x)` (`n_newton_sign`), `f(x)*df(x)`.
- **Corrigé type** : x² = 2, x⁽⁰⁾ = 1.
  1. `f(x) = x² − 2, f′(x) = 2x` — sous-but `deriv` → `g6-deriv-rules`.
  2. `x⁽ᵏ⁺¹⁾ = x − (x² − 2)/(2x) = (x² + 2)/(2x)` — sous-but `formula`.
  3. `x⁽¹⁾ = 3/2 ; δ₀ = 1/2` — sous-but `iterate`.
  4. `x⁽²⁾ = 17/12 ; δ₁ = 1/12` — sous-but `iterate`.
  5. `x⁽³⁾ = 577/408 ; δ₂ = 1/408 ≈ 0,00245` — sous-but `iterate`.
  6. `r₂ = (1/12)/(1/4) = 1/3 ; (1/408)/(1/144) = 6/17 ≈ 0,35` : ordre 2 — sous-but `order` → `n-order-read`.
- **Aides** :
  1. « Remplace f par sa tangente en x⁽ᵏ⁾ et cherche où elle coupe l'axe. »
  2. « x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)/▢ »
  3. « x⁽¹⁾ = 1 − (1 − 2)/2 = 3/2. »
- **Variantes d'examen** :
  - `mcq` : la ligne de code `x = x - ???` ; le tableau `stop` de 2020 :

    | iter | 1 | 2 | 3 | 4 | 5 |
    |---|---|---|---|---|---|
    | stop | 3.580783e+00 | 1.274647e+00 | 1.123099e-02 | 4.868424e-07 | 9.555565e-16 |

    Vrai : « Newton converge quadratiquement pour ce point de départ ». Faux : « quel que soit le point de départ » ; « diverge ».
  - `tf` : « Newton converge quel que soit x⁽⁰⁾ » : faux. Contre-exemple : f(x) = x³ − 2x + 2 avec x⁽⁰⁾ = 0 donne 0, 1, 0, 1… (cycle).
- **Pièges** : `n_newton_inverted`, `n_newton_sign`, `n_newton_always2`.
- **Sous-buts → crédit** : `deriv` → `g6-deriv-rules` ; `formula`, `iterate` → `n-newton` ; `order` → `n-order-read`.

### `n-order-read` — Lire l'ordre sur les rapports d'incréments
- **Année** 16 · **Prérequis** `n-newton` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `n-newton` : les suites d'itérés à analyser viennent de Newton.
- **Statut** : fait le 10 novembre 2026 (étape U9). Tableaux calculés en double précision (Newton sur x² − c et x³ − c, point fixe x − ω(x² − 4), Newton sur racine double, sécante), δ à 4 chiffres. Rapports et constante jugés par `stat` avec une tolérance (2 chiffres significatifs). L1 : `readtable` avec r₁, r₂, r₃ et le choix de p (ou, une fois sur quatre, la fonction `ratios` en QCM de trou) ; L2 : deux rapports à calculer, puis p ; L3 : ligne d'arrondi à garder ou ignorer (`n_order_roundoff_rows`), p et C ; L4 : incréments bruts, p et C (ou `ratios` à 2 trous) ; L5 : deux méthodes côte à côte, QCM à plusieurs réponses. Examen : QCM sur un tableau, V/F en Vrai/Faux.
- **Intro** : α est inconnue, donc on lit l'ordre sur les incréments δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾|. La méthode est d'ordre p si rₚ = δₖ/δₖ₋₁ᵖ tend vers une constante **finie et non nulle**. Pour p trop petit, rₚ → 0 ; pour p trop grand, rₚ → ∞. On ignore les lignes où δ atteint ~10⁻¹⁵, qui sont dominées par l'arrondi. Exemple : Newton pour ∛2, x⁽⁰⁾ = 2.
  - `δ : 5.0e-01, 2.0e-01, 3.5e-02, 1.0e-03, 8.1e-07, 5.2e-13`
  - `r₁ : 0,41 ; 0,17 ; 0,029 ; 0,0008 → 0` (note : « p = 1 trop petit »)
  - `r₂ : 0,82 ; 0,85 ; 0,81 ; 0,79 ; 0,79` (note : « constante non nulle : ordre 2 »)
  - `r₃ : 1,6 ; 4,2 ; 23 ; 786 → ∞` (note : « p = 3 trop grand »)
- **Juge** : `readtable`. Les cases calculées par l'élève sont jugées par `stat` `{sig: 2}`. L'ordre p est jugé par `value`, la constante par `stat` `{sig: 1}`. · **Forme finale** : p, et une phrase choisie (« r₂ se stabilise vers 0,79 ≠ 0 »).
- **Niveaux** :
  - L1 (guidé) : les colonnes r₁, r₂ et r₃ sont calculées ; l'élève choisit p.
  - L2 : l'élève calcule les cases manquantes (avec la calculatrice), puis choisit p.
  - L3 (choisir l'action) : actions « garder cette ligne » ou « ignorer cette ligne (arrondi) » pour chaque ligne, puis p.
  - L4 (libre) : incréments bruts seulement ; l'élève donne p et la constante.
  - L5 (seul) : deux tableaux (deux méthodes, ou deux racines dont une double) et un QCM à plusieurs réponses.
- **Générateur** : on exécute la méthode de référence (Newton, point fixe, sécante, Newton sur racine multiple), avec f tirée dans les gabarits des compétences correspondantes.
  - **Rejets.** On rejette moins de 3 lignes utilisables (δ ∈ [10⁻¹³ ; 10⁻¹]), et un rₚ dont les deux dernières valeurs diffèrent de plus de 10 %.
  - **Affichage.** 4 chiffres.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def ratios(inc, p):
      r = []
      for k in range(len(inc) - 1):
          r.append(«inc[k + 1] / inc[k] ** p»)
      return r
  ```
  Tests :

  | expr | expect | tol |
  |---|---|---|
  | `ratios([0.5, 0.25, 0.125], 1)` | `[0.5, 0.5]` | |
  | `ratios([0.5, 0.08333333333333333, 0.002450980392156932], 2)` | `[0.3333333333333333, 0.35294117647059825]` | 1e−9 |
- **Item `readtable`** (L1 à L4) : le tableau ∛2 de l'intro.
- **Corrigé type** :
  1. `r₂⁽¹⁾ = 2.037e-01/(5.0e-01)² = 0,815` — sous-but `ratio`.
  2. `r₂⁽²⁾ = 3.536e-02/(2.037e-01)² = 0,852` — sous-but `ratio`.
  3. `r₂⁽³⁾ = 0,808 ; r₂⁽⁴⁾ = 0,794` — sous-but `ratio`.
  4. `r₁ → 0 et r₃ → ∞` — sous-but `compare`.
  5. `ordre 2, constante ≈ 0,79` — sous-but `conclude`.
- **Aides** :
  1. « Cherche le p pour lequel δₖ/δₖ₋₁ᵖ ne tend ni vers 0 ni vers l'infini. »
  2. « r₂ = δₖ/δₖ₋₁² = 3.536e-02/(▢)² »
  3. « r₂ ≈ 0,81 ; 0,79 ; 0,79 : constante non nulle, donc ordre 2. »
- **Variantes d'examen** :
  - `mcq` (`multi: true`, d'après 2020 et 2021) : un tableau de `stop`. Vrai : « converge quadratiquement pour ce point de départ ». Faux : « quel que soit le point de départ ».
  - `tf` :
    - « Si δₖ₊₁/δₖ → 0, la méthode est d'ordre 1 » : faux. Contre-exemple : le tableau de Newton, d'ordre 2, où r₁ → 0.
    - « Une méthode d'ordre 1 dont le rapport tend vers 1 converge vite » : faux.
- **Pièges** : `n_order_simple_ratio`, `n_order_roundoff_rows`.
- **Sous-buts → crédit** : `ratio`, `compare`, `conclude` → `n-order-read`.

### `n-newton-multiple` — Newton sur une racine multiple ; Newton modifié
- **Année** 16 · **Prérequis** `n-newton`, `n-order-read`, `g0-multiplicity` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g0-multiplicity` : multiplicité m de la racine.
- **Statut** : fait le 10 novembre 2026 (étape U9). À la main : f = (x − a)ᵐ, m ∈ {2, 3}. L1 : φ simplifiée, le rapport 1 − 1/m, l'ordre ; L2 : tableau, puis QCM d'ordre (`n_newton_always2`) ; L3 : m, puis un pas de Newton modifié (exact en un pas) ; L4 : `readtable` de Newton sur (x − a)ᵐ·g(x) en double précision, puis m (`n_mult_ratio`) ; L5 : `newton_mod` (1 trou), puis Newton contre Newton modifié. La limite de 40 itérations est portée à 70 pour m = 3, sinon m = 3 n'apparaîtrait jamais. Examen : QCM sur le tableau, ou la ligne `incr = ???` pour une racine double ; V/F avec le contre-exemple (x − 1)², x⁽⁰⁾ = 2 (`num` `newtonOrder1`).
- **Intro** : si α est de multiplicité m ≥ 2 (f(α) = … = f⁽ᵐ⁻¹⁾(α) = 0), Newton n'est plus que d'ordre 1, avec un rapport qui tend vers 1 − 1/m. Newton modifié, x − m·f/f′, retrouve l'ordre 2. Exemple : f(x) = (x − 1)², x⁽⁰⁾ = 2.
  - `x⁽ᵏ⁺¹⁾ = x − (x − 1)²/(2(x − 1)) = (x + 1)/2`
  - `2 → 1,5 → 1,25 → 1,125` (note : « incréments 0,5 ; 0,25 ; 0,125 : r₁ = 1/2 = 1 − 1/2 »)
  - `modifié : x⁽¹⁾ = 2 − 2·1/2 = 1` (note : « exact en un pas ici »)
- **Juge** : `lines` `equiv` pour la simplification de φ ; `value` pour la limite du rapport ; `readtable` · **Forme finale** : ordre 1, rapport limite 1 − 1/m, puis la formule modifiée.
- **Niveaux** :
  - L1 (guidé) : la simplification est à trous ; le rapport est donné, l'élève choisit l'ordre.
  - L2 : itérations libres, puis lecture du rapport.
  - L3 (choisir l'action) : « racine simple ou multiple ? », vu sur f′(α) ; puis « Newton » ou « Newton modifié avec m = ▢ ».
  - L4 (libre) : `readtable` brut, puis m déduit du rapport (r₁ → 1/2, donc m = 2).
  - L5 (seul) : l'item `code`, puis un tableau comparatif de Newton et de Newton modifié.
- **Générateur** : on part de α et de m.
  - **Calcul à la main.** f = (x − a)ᵐ, avec a ∈ {−2, …, 3} et m ∈ {2, 3} : l'itération est affine, x − (x − a)/m.
  - **Tableaux.** f = (x − a)ᵐ·g(x), avec g ∈ {eˣ, x + 2, 1 + x²} et g(a) ≠ 0.
  - **Contrainte.** On rejette si la convergence est plus lente que 40 itérations pour tol = 10⁻¹⁰.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def newton_mod(f, df, m, x0, tol, nmax):
      x = x0
      for k in range(nmax):
          incr = «m * f(x) / df(x)»
          x = x - incr
          if abs(incr) < tol:
              return [x, k + 1]
      return [x, nmax]
  ```
  Tests (setup commun : `def f(x): return (x-1)**2 * math.exp(x)` et `def df(x): return (2*(x-1) + (x-1)**2) * math.exp(x)`) :

  | expr | expect | tol |
  |---|---|---|
  | `newton_mod(f, df, 2, 2.0, 1e-10, 100)` | `[1.0, 6]` | 1e−9 |
  | `newton_mod(f, df, 1, 2.0, 1e-10, 100)[1]` | `35` | |

  Avec m = 1, c'est Newton : il lui faut 35 itérations.
- **Item `readtable`** (L4) : Newton pour f = (x − 1)²eˣ, x⁽⁰⁾ = 2.

  | k | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
  |---|---|---|---|---|---|---|---|---|
  | δₖ | 3.333e-01 | 2.500e-01 | 1.724e-01 | 1.088e-01 | 6.342e-02 | 3.475e-02 | 1.829e-02 | 9.394e-03 |
  | r₁ | | 0.750 | 0.690 | 0.631 | 0.583 | 0.548 | 0.526 | 0.514 |

  Question (`mcq multi`) : vrai = « ordre 1 », « racine double (r₁ → 1/2) ». Faux = « ordre 2 » (`n_newton_always2`) et « racine simple ».
- **Corrigé type** :
  1. `f′(x) = 2(x − 1)` — sous-but `deriv`.
  2. `φ(x) = x − (x − 1)/2 = (x + 1)/2` — sous-but `formula` → `n-newton`.
  3. `x⁽ᵏ⁾ − 1 = (x⁽ᵏ⁻¹⁾ − 1)/2` : ordre 1, rapport 1/2 — sous-but `order`.
  4. `m = 2 : x − 2(x − 1)²/(2(x − 1)) = 1` — sous-but `modified`.
- **Aides** :
  1. « Regarde f′(α) : s'il est nul, la racine est multiple et Newton perd son ordre 2. »
  2. « x⁽ᵏ⁺¹⁾ − α = (1 − 1/▢)(x⁽ᵏ⁾ − α) »
  3. « Rapport 1/2 = 1 − 1/m, donc m = 2 ; Newton modifié : x − 2f/f′. »
- **Variantes d'examen** :
  - `tf` : « Newton est toujours d'ordre 2 » : faux. Contre-exemple : f = (x − 1)², ordre 1.
  - `mcq` : sur le `readtable` (« l'ordre tombe à 1, parce que la racine est double »), puis la ligne `x = x - ???` de Newton modifié (`2*f(x)/df(x)`).
- **Pièges** : `n_newton_always2`, `n_mult_ratio`, `n_order_simple_ratio`.
- **Sous-buts → crédit** : `deriv` → `g6-deriv-rules` ; `formula` → `n-newton` ; `order` → `n-order-read` ; `modified` → `n-newton-multiple`.

### `n-newton-system` — Newton pour les systèmes ; jacobienne à la main
- **Année** 16 · **Prérequis** `n-newton`, `a2-partials`, `l-sys-echelon` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `n-newton` : même itération, avec la jacobienne.
- **Statut** : fait le 10 novembre 2026 (étape U9). Parties jugées par `mat` : J(x, y), J(x⁽⁰⁾), F(x⁽⁰⁾), δ, puis x⁽¹⁾ (`n_newton_sys_sign`). Cases de la grille aux niveaux 1 et 2 ; F(x⁽⁰⁾) est donné au niveau 1. Les décisions « résoudre ou inverser J » (`quality: 'poor'`) et « x − δ ou x + δ » remplacent la barre d'opérations : δ s'écrit directement, sans `rowops`. Systèmes à solution simple (J(p, q) inversible) ; l'équation xy − pq passe en second. L5 : `newton_sys` (4 trous), puis lecture de ‖δ‖ du système de l'item. QCM d'examen : J(x⁽⁰⁾), avec la transposée en distracteur (`a2_jacobian_transposed`) ; `coef` : la première composante de x⁽¹⁾. Le gabarit exponentiel (calculatrice) n'est pas construit.
- **Intro** : pour F : ℝⁿ → ℝⁿ, on résout J_F(x⁽ᵏ⁾)·δ⁽ᵏ⁾ = F(x⁽ᵏ⁾), puis on pose x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − δ⁽ᵏ⁾. C'est la convention des examens : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). On ne calcule jamais J⁻¹. Exemple : F(x, y) = (x² + y² − 5 ; x − y + 1), x⁽⁰⁾ = (1 ; 1).
  - `J = [[2x, 2y], [1, −1]] → J(1, 1) = [[2, 2], [1, −1]]`
  - `F(1, 1) = (−3 ; 1)`
  - `2δ₁ + 2δ₂ = −3 ; δ₁ − δ₂ = 1 → δ = (−1/4 ; −5/4)`
  - `x⁽¹⁾ = (5/4 ; 9/4)` (note : « la solution est (1 ; 2) »)
- **Juge** : item `matrix` jugé par `equiv` case par case pour J (expressions en x et y) ; `rowops` pour le système 2 × 2 ; `value` pour le vecteur x⁽¹⁾ · **Forme finale** : le vecteur x⁽¹⁾ exact.
- **Niveaux** :
  - L1 (guidé) : J est à trous (une case par dérivée partielle) ; F(x⁽⁰⁾) est donné.
  - L2 : J et F libres ; le système est résolu avec la barre d'opérations.
  - L3 (choisir l'action) : actions proposées « résoudre J·δ = F », « calculer J⁻¹ » (`quality:'poor'`), « x⁽ᵏ⁾ + δ » (piège de signe).
  - L4 (libre) : un pas complet.
  - L5 (seul) : deux pas, ou l'item `code`, ou un système issu d'un problème physique.
- **Générateur** : on part de la solution (p ; q) entière.
  - **Équations.** F₁ ∈ {x² + y² − (p² + q²), xy − pq, x² − y − (p² − q)} et F₂ linéaire, ax + by − (ap + bq), avec a, b ∈ {−2, …, 2}.
  - **Départ.** x⁽⁰⁾ est à distance 1 de (p ; q), avec des coordonnées entières.
  - **Contraintes.** det J(x⁽⁰⁾) ∈ {±1, ±2, ±4, ±8} ; δ a un dénominateur ≤ 8.
  - **Gabarit 2** (GM série 4, avec la calculatrice) : F = (e^(x₁² + x₂²) − α ; e^(x₁² − x₂²) − 1).
- **Item `code`** (`PRELUDE_VEC`, `PRELUDE_MAT`) :
  ```python
  def newton_sys(F, J, x0, tol, nmax):
      x = [x0[0], x0[1]]
      for k in range(nmax):
          delta = «solve(J(x), F(x))»
          x[0] = «x[0] - delta[0]»
          x[1] = «x[1] - delta[1]»
          if «norm(delta) < tol»:
              return [x[0], x[1], k + 1]
      return [x[0], x[1], nmax]
  ```
  Setup : `def F(x): return [x[0]**2 + x[1]**2 - 5, x[0] - x[1] + 1]` et `def J(x): return [[2*x[0], 2*x[1]], [1, -1]]`.

  | expr | expect | tol |
  |---|---|---|
  | `newton_sys(F, J, [1.0, 1.0], 1e-12, 50)` | `[1.0, 2.0, 6]` | 1e−9 |
  | `newton_sys(F, J, [1.0, 1.0], 1e9, 1)` | `[1.25, 2.25, 1]` | 1e−12 |

  Le 2e test s'arrête après un seul pas.
- **Corrigé type** :
  1. `J(x, y) = [[2x, 2y], [1, −1]]` — sous-but `jacobian` → `a2-partials`.
  2. `J(1, 1) = [[2, 2], [1, −1]] ; F(1, 1) = (−3 ; 1)` — sous-but `evaluate`.
  3. `[[2, 2 | −3], [1, −1 | 1]] → δ = (−1/4 ; −5/4)` — sous-but `solve` → `l-sys-echelon`.
  4. `x⁽¹⁾ = (1 + 1/4 ; 1 + 5/4) = (5/4 ; 9/4)` — sous-but `update`.
- **Aides** :
  1. « Ligne i de la jacobienne : les dérivées de Fᵢ par rapport à x, puis à y. »
  2. « J(1, 1)·δ = F(1, 1), puis x⁽¹⁾ = x⁽⁰⁾ − ▢ »
  3. « δ = (−1/4 ; −5/4), donc x⁽¹⁾ = (5/4 ; 9/4). »
- **Variantes d'examen** :
  - `mcq` : « J(1, 1) = ? » Distracteurs : la transposée (`a2_jacobian_transposed`) et une dérivée partielle fausse.
  - `coef` : « première composante de x⁽¹⁾ ».
  - Les jacobiennes d'examen sur ℝᴺ (2020 et 2021) sont dans `n-bvp-newton`.
- **Pièges** : `a2_jacobian_transposed`, `n_newton_sys_sign`.
- **Sous-buts → crédit** : `jacobian` → `a2-partials` ; `evaluate`, `update` → `n-newton-system` ; `solve` → `l-sys-echelon`.

### `n-secant` — Méthode de la sécante
- **Année** 16 · **Prérequis** `n-newton`, `n-order-read` · **Étiquettes** `opt` · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `n-newton` : même itération, f′ remplacée par la pente de la corde ; `n-order-read` : ordre (1 + √5)/2 lu sur les incréments.
- **Statut** : fait le 10 novembre 2026 (étape U9). f = x² − c ou x³ − c, x⁽⁰⁾ et x⁽¹⁾ entiers qui encadrent α. L1 : x⁽²⁾ et x⁽³⁾ guidés ; L2 : tableau (phi `secant`, jugé à partir des deux lignes précédentes de l'élève) ; L3 : choix des deux points (`n_secant_update`) ; L4 : tableau de 5 lignes, puis QCM d'ordre ; L5 : programme `secant` (3 trous ; le trou `x0` nomme `n_secant_update`), puis lecture des incréments. Examen : V/F en Vrai/Faux (pas de vérificateur de contre-exemple).
- **Intro** : on remplace f′ par la pente de la corde, x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)·(x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾)/(f(x⁽ᵏ⁾) − f(x⁽ᵏ⁻¹⁾)). Il faut deux points de départ, mais aucune dérivée. L'ordre est (1 + √5)/2 ≈ 1,618. Exemple : x² − 2, x⁽⁰⁾ = 1, x⁽¹⁾ = 2.
  - `x⁽²⁾ = 2 − 2·(2 − 1)/(2 − (−1)) = 4/3`
  - `x⁽³⁾ = 4/3 − (−2/9)(4/3 − 2)/(−2/9 − 2) = 7/5`
- **Juge** : `table` `iter` `{phi:{kind:'secant', f:'x^2-2'}, cols:['x','inc'], tol:1e-9}`. La ligne k + 1 est calculée à partir des lignes k et k − 1 de l'élève. · **Forme finale** : 3 itérés, et l'ordre « entre 1 et 2 ».
- **Niveaux** :
  - L1 : la formule est à trous ; x⁽²⁾ est guidé.
  - L2 : x⁽²⁾ et x⁽³⁾.
  - L3 : choisir quels deux points utiliser (les deux derniers).
  - L4 : tableau, puis lecture de l'ordre.
  - L5 : l'item `code`.
- **Générateur** : f = x² − c ou x³ − c ; x⁽⁰⁾ et x⁽¹⁾ entiers qui encadrent α ; itérés rationnels avec un dénominateur ≤ 500.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def secant(f, x0, x1, tol, nmax):
      for k in range(nmax):
          x2 = «x1 - f(x1) * (x1 - x0) / (f(x1) - f(x0))»
          if abs(x2 - x1) < tol:
              return [x2, k + 1]
          x0 = «x1»
          x1 = «x2»
      return [x1, nmax]
  ```

  | setup | expr | expect | tol |
  |---|---|---|---|
  | `def f(x): return x*x - 2` | `secant(f, 1.0, 2.0, 1e-12, 50)` | `[1.4142135623730951, 7]` | 1e−12 |
- **Item `readtable`** : les incréments 6.667e-01, 6.667e-02, 1.463e-02, 4.227e-04, 2.124e-06, 3.158e-10. r₁ → 0 et r₂ → ∞, donc l'ordre est strictement entre 1 et 2 (`mcq`).
- **Corrigé type** :
  1. `f(1) = −1, f(2) = 2` — sous-but `eval`.
  2. `x⁽²⁾ = 2 − 2·1/3 = 4/3` — sous-but `iterate`.
  3. `f(4/3) = −2/9` — sous-but `eval`.
  4. `x⁽³⁾ = 4/3 − (−2/9)(−2/3)/(−20/9) = 7/5` — sous-but `iterate`.
- **Aides** :
  1. « C'est Newton avec f′ remplacée par la pente entre les deux derniers points. »
  2. « pente = (f(2) − f(1))/(2 − 1) = ▢ »
  3. « x⁽²⁾ = 2 − 2/3 = 4/3. »
- **Variantes d'examen** : `tf` : « La sécante est d'ordre 2 » : faux (≈ 1,618 ; voir le tableau).
- **Pièges** : `n_secant_update`, `n_order_simple_ratio`.
- **Sous-buts → crédit** : `eval`, `iterate` → `n-secant`.

### `n-interp-lagrange` — Interpolation : Vandermonde et Lagrange à la main
- **Année** 16 · **Prérequis** `l-sys-echelon` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U9). p de degré 2 à coefficients entiers, 3 nœuds de {−2, …, 3} (consécutifs aux niveaux 1 et 2), x* demi-entier. Le système de Vandermonde est résolu par des parties `value` (a₂, a₁, a₀, piège `n_vandermonde_order`), sans `rowops`. L1 : coefficients guidés à partir de leurs formules, puis p(x*). L2 : décision Vandermonde ou Lagrange, puis φ₀(x*), φ₁(x*), φ₂(x*) et p(x*), guidés (piège `n_lagrange_no_denominator`). L3 : choix de φ₁ (leurre sans dénominateur), puis menus. L4 : Vandermonde libre, forme de Lagrange développée (`equiv`, `expanded`), puis p(x*). L5 : `code` lagrange_eval (tous les trous), puis `readtable` de sa sortie. Examen : `mcq` (φ₁(x*)), `tf` (contre-exemple `num` `interpDegreeLow`), `coef` (a₂). Le gabarit à 4 points de degré 3 n'est que dans les tests du programme.
- **Intro** : par n + 1 points d'abscisses distinctes passe un seul polynôme de degré ≤ n.
  - **Vandermonde** : on résout le système en a₀, …, aₙ.
  - **Lagrange** : φᵢ(x) = Π_{j≠i} (x − xⱼ)/(xᵢ − xⱼ), avec φᵢ(xⱼ) = δᵢⱼ, et p = Σ yᵢ φᵢ.

  Exemple : (0 ; 12), (1 ; 18), (2 ; 6).
  - `a₀ = 12 ; a₀ + a₁ + a₂ = 18 ; a₀ + 2a₁ + 4a₂ = 6`
  - `p(x) = 12 + 15x − 9x²`
  - `φ₀ = (x − 1)(x − 2)/2, φ₁ = −x(x − 2), φ₂ = x(x − 1)/2`
  - `p(1/2) = 12·3/8 + 18·3/4 + 6·(−1/8) = 69/4`
- **Juge** : `rowops` pour le système de Vandermonde ; `equiv` `{vars:['x']}` pour chaque φᵢ (cible factorisée ou développée) ; `poly` `{v:'x'}` pour p ; `value` pour p(x*) · **Forme finale** : p développé et ordonné, puis p(x*) exact.
- **Niveaux** :
  - L1 (guidé) : le système de Vandermonde est écrit, avec des trous dans la solution ; les φᵢ sont à trous au dénominateur.
  - L2 : une décision « Vandermonde ou Lagrange ? », puis la méthode choisie avec des trous.
  - L3 (choisir l'action) : actions proposées « écrire la ligne i du système », « écrire φᵢ », « évaluer en x* ».
  - L4 (libre) : 3 points ; p par les deux méthodes, puis p(x*).
  - L5 (seul) : 4 points (degré 3), ou l'item `code`.
- **Générateur** : on part du polynôme.
  - p de degré 2, à coefficients entiers dans [−20 ; 20], avec a₂ ≠ 0 ; abscisses distinctes dans {−2, …, 3} ; yᵢ = p(xᵢ) ; x* demi-entier.
  - Gabarit 2 : les φᵢ sont donnés, il faut une valeur.
  - Gabarit 3 : 4 points, avec un polynôme de degré 3.
  - Gabarit piège : 3 points alignés, dont l'interpolant est de degré 1.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def lagrange_eval(xs, ys, x):
      n = len(xs)
      p = 0.0
      for i in range(n):
          phi = 1.0
          for j in range(n):
              if j != i:
                  phi = phi * «(x - xs[j]) / (xs[i] - xs[j])»
          p = p + «ys[i] * phi»
      return p
  ```

  | expr | expect |
  |---|---|
  | `lagrange_eval([0, 1, 2], [12, 18, 6], 0.5)` | `17.25` |
  | `lagrange_eval([0, 1, 2, 3], [1, 2, 5, 10], 1.5)` | `3.25` |
  | `lagrange_eval([-1, 0, 1], [1, 0, 1], 0.5)` | `0.25` |
- **Corrigé type** :
  1. `[[1, 0, 0 | 12], [1, 1, 1 | 18], [1, 2, 4 | 6]]` — sous-but `system`.
  2. `a₀ = 12, a₁ + a₂ = 6, 2a₁ + 4a₂ = −6` — sous-but `solve` → `l-sys-echelon`.
  3. `a₂ = −9, a₁ = 15 ; p = 12 + 15x − 9x²` — sous-but `poly`.
  4. `φ₁(x) = (x − 0)(x − 2)/((1 − 0)(1 − 2)) = −x(x − 2)` — sous-but `basis`.
  5. `p(1/2) = 12 + 15/2 − 9/4 = 69/4` — sous-but `eval`.
- **Aides** :
  1. « φᵢ vaut 1 en xᵢ et 0 aux autres nœuds : un produit de (x − xⱼ), divisé par sa valeur en xᵢ. »
  2. « φ₁(x) = (x − 0)(x − 2) / ((1 − 0)(1 − ▢)) »
  3. « φ₁(x) = −x(x − 2), et p(1/2) = 69/4. »
- **Variantes d'examen** :
  - `mcq` : « φ₁(1/2) = ? » Distracteurs : sans dénominateur, −3/4 (`n_lagrange_no_denominator`), et le signe opposé.
  - `coef` : « coefficient de x² de p ».
  - `tf` : « Par 4 points d'abscisses distinctes passe un unique polynôme de degré 3 » : faux, il est de degré **≤ 3**. Contre-exemple : (0 ; 0), (1 ; 1), (2 ; 2), (3 ; 3).
- **Pièges** : `n_lagrange_no_denominator`, `n_vandermonde_order`.
- **Sous-buts → crédit** : `system`, `poly`, `basis`, `eval` → `n-interp-lagrange` ; `solve` → `l-sys-echelon`.

### `n-interp-error` — Erreur d'interpolation ; phénomène de Runge
- **Année** 16 · **Prérequis** `n-interp-lagrange`, `a1-extrema-global` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `n-interp-lagrange` : Πₙf, le polynôme d'interpolation.
- **Statut** : fait le 10 novembre 2026 (étape U9). f ∈ {sin et cos sur [0 ; π] ou [0 ; π/2], 1/(1 + x), ln(1 + x), eˣ sur [0 ; b]}, n ∈ {1, 2, 3}. max|f⁽ⁿ⁺¹⁾| est exact (1, (n + 1)!, n!, eᵇ), et la borne est un nombre clos jugé par `value` `closed` (et non `equiv`). Parties : f⁽ⁿ⁺¹⁾ (`equiv`, sauf en L1 où elle est donnée), M, h, borne (piège `n_interp_error_factorial` : f⁽ⁿ⁾, 4n, hⁿ). L3 avec menus. L4 : lignes libres, ou `readtable` des bornes de eˣ pour n = 1 … 8 (n minimal). L5 : `readtable` de Runge (recalculé, identique au catalogue), puis QCM à plusieurs réponses. Examen : `mcq` (borne, ou tableau de Runge), `tf` (Runge en QCM Vrai/Faux, ou « nulle aux nœuds », vrai).
- **Intro** : f(x) − Πₙf(x) = f⁽ⁿ⁺¹⁾(ξ)/(n + 1)!·Π(x − xᵢ). Pour des nœuds équirépartis de pas h, max|f − Πₙf| ≤ max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹. Augmenter n ne suffit pas toujours : pour 1/(1 + x²) sur [−5 ; 5] avec des nœuds équirépartis, l'erreur explose aux bords. C'est le phénomène de Runge. Exemple : f = sin sur [0 ; π], n = 2, h = π/2.
  - `max|f‴| = 1`
  - `erreur ≤ 1/(4·3)·(π/2)³ = π³/96 ≈ 0,32` (note : « l'erreur réelle est 0,056 : la borne est pessimiste »)
- **Juge** : `equiv` `{vars:[]}` sur l'expression exacte de la borne (π³/96) ; `readtable` pour Runge · **Forme finale** : la borne exacte, ou n minimal.
- **Niveaux** :
  - L1 (guidé) : la formule de la borne est donnée ; l'élève remplit max|f⁽ⁿ⁺¹⁾|, n et h.
  - L2 : l'élève trouve max|f⁽ⁿ⁺¹⁾| lui-même.
  - L3 (choisir l'action) : actions « dériver n + 1 fois », « majorer sur [a ; b] », « remplacer h ».
  - L4 (libre) : trouver le plus petit n qui garantit une tolérance, dans une table de valeurs donnée.
  - L5 (seul) : `readtable` de Runge, puis un QCM à plusieurs réponses.
- **Générateur** : f ∈ {sin, cos, eˣ, 1/(1 + x), ln(1 + x)} sur [a ; b] ⊂ [0 ; 4], n ∈ {1, 2, 3}. On garde les cas où |f⁽ⁿ⁺¹⁾| est monotone sur [a ; b], pour que son maximum soit atteint en une borne.
  - Gabarit 2 : « n minimal pour une erreur ≤ 10⁻ᵏ ». La table de max|f⁽ⁿ⁺¹⁾|·hⁿ⁺¹/(4(n + 1)) est donnée pour n = 1 … 8.
- **Item `readtable`** : f(x) = 1/(1 + x²) sur [−5 ; 5], max|f − Πₙf|.

  | n | nœuds équirépartis | nœuds de Tchebychev |
  |---|---|---|
  | 4 | 4.384e-01 | 4.020e-01 |
  | 8 | 1.045e+00 | 1.708e-01 |
  | 12 | 3.663e+00 | 6.922e-02 |
  | 16 | 1.439e+01 | 3.261e-02 |

  Question (`mcq multi`) : vrai = « avec des nœuds équirépartis, l'erreur augmente avec n », « avec les nœuds de Tchebychev, elle diminue ». Faux = « plus de nœuds donne toujours une meilleure approximation » (`n_runge_more_nodes`).
- **Corrigé type** :
  1. `n = 2, h = π/2, f‴ = −cos` — sous-but `deriv`.
  2. `max_[0 ; π] |f‴| = 1` — sous-but `max` → `a1-extrema-global`.
  3. `1/(4·3)·(π/2)³ = π³/96` — sous-but `bound`.
- **Aides** :
  1. « La borne fait intervenir la dérivée d'ordre n + 1 et hⁿ⁺¹. »
  2. « erreur ≤ max|f‴|/(4·▢)·(π/2)³ »
  3. « ≤ π³/96 ≈ 0,32. »
- **Variantes d'examen** :
  - `tf` :
    - « Plus on prend de nœuds équirépartis, plus l'interpolant est proche de f » : faux (Runge, voir le tableau).
    - « L'erreur d'interpolation est nulle aux nœuds » : vrai.
  - `mcq` : sur le tableau.
- **Pièges** : `n_runge_more_nodes`, `n_interp_error_factorial`.
- **Sous-buts → crédit** : `deriv` → `g6-deriv-rules` ; `max` → `a1-extrema-global` ; `bound` → `n-interp-error`.

### `n-divided-diff` — Différences divisées, forme de Newton
- **Année** 16 · **Prérequis** `n-interp-lagrange`, `g0-horner` · **Étiquettes** `opt` · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `n-interp-lagrange` : même polynôme d'interpolation, dans une autre base ; `g0-horner` : évaluer la forme de Newton par un schéma de Horner.
- **Statut** : fait le 10 novembre 2026 (étape U9). Table `iter` (phi `divdiff`, chaque case calculée à partir des cases de l'élève). L1 : colonne d'ordre 1, puis QCM sur f[x₀, x₁, x₂] (leurre `n_divdiff_denominator`). L2 : table entière, puis p(x*) en forme de Newton (guidé). L3 : `readtable` de la table, choisir la forme de Newton (la diagonale). L4 : un 4ᵉ point ajouté, dernière ligne à remplir, puis p₃(x*). L5 : `code` divdiff/newton_eval (un test ajouté, divdiff([0, 1, 3], [1, 2, 10]), pour que le mauvais dénominateur échoue), puis `readtable` des coefficients. Examen : `mcq` (la case f[x₀, x₁, x₂], ou le trou de divdiff).
- **Intro** : f[xᵢ] = yᵢ et f[xᵢ, …, xᵢ₊ₖ] = (f[xᵢ₊₁, …, xᵢ₊ₖ] − f[xᵢ, …, xᵢ₊ₖ₋₁])/(xᵢ₊ₖ − xᵢ). On a alors p = f[x₀] + f[x₀, x₁](x − x₀) + f[x₀, x₁, x₂](x − x₀)(x − x₁) + …. Ajouter un point ajoute un terme. Exemple : (0 ; 12), (1 ; 18), (2 ; 6), puis (3 ; 0).
  - `f[0, 1] = 6 ; f[1, 2] = −12 ; f[0, 1, 2] = −9`
  - `p₂ = 12 + 6x − 9x(x − 1)` (note : « = 12 + 15x − 9x² »)
  - `f[2, 3] = −6 ; f[1, 2, 3] = 3 ; f[0, 1, 2, 3] = 4`
  - `p₃ = p₂ + 4x(x − 1)(x − 2)`
- **Juge** : `table` triangulaire. Chaque case est calculée à partir des cases de la colonne précédente **saisies par l'élève** (même principe que `iter`, avec `followError`), puis jugée par `value`. Le polynôme est jugé par `poly`. · **Forme finale** : la forme de Newton, ou sa valeur en x*.
- **Niveaux** :
  - L1 : la table est à trous, une colonne à la fois.
  - L2 : la table est libre et les coefficients sont lus.
  - L3 : choisir quelles cases forment les coefficients (la diagonale du haut).
  - L4 : ajouter un 4e point et mettre p à jour.
  - L5 : l'item `code`.
- **Générateur** : comme `n-interp-lagrange` (polynôme entier, abscisses distinctes), avec un 4e point tiré pour la mise à jour ; dénominateurs ≤ 6.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def divdiff(xs, ys):
      n = len(xs)
      c = []
      for i in range(n):
          c.append(ys[i])
      for k in range(1, n):
          for i in range(n - 1, k - 1, -1):
              c[i] = «(c[i] - c[i - 1]) / (xs[i] - xs[i - k])»
      return c

  def newton_eval(xs, c, x):
      n = len(c)
      p = c[n - 1]
      for i in range(n - 2, -1, -1):
          p = «p * (x - xs[i]) + c[i]»
      return p
  ```

  | expr | expect |
  |---|---|
  | `divdiff([0, 1, 2], [12, 18, 6])` | `[12, 6, -9]` |
  | `divdiff([0, 1, 2, 3], [12, 18, 6, 0])` | `[12, 6, -9, 4]` |
  | `newton_eval([0, 1, 2, 3], [12, 6, -9, 4], 0.5)` | `18.75` |
- **Corrigé type** :
  1. `f[0, 1] = (18 − 12)/1 = 6` — sous-but `dd1`.
  2. `f[1, 2] = (6 − 18)/1 = −12` — sous-but `dd1`.
  3. `f[0, 1, 2] = (−12 − 6)/(2 − 0) = −9` — sous-but `dd2`.
  4. `p₂ = 12 + 6x − 9x(x − 1)` — sous-but `form`.
- **Aides** :
  1. « Chaque case est une pente : différence des deux cases voisines, divisée par l'écart des abscisses **extrêmes**. »
  2. « f[0, 1, 2] = (f[1, 2] − f[0, 1])/(▢ − 0) »
  3. « = (−12 − 6)/2 = −9. »
- **Variantes d'examen** : `mcq` sur une case de la table.
- **Pièges** : `n_divdiff_denominator`.
- **Sous-buts → crédit** : `dd1`, `dd2`, `form` → `n-divided-diff`.

### `n-chebyshev` — Nœuds de Tchebychev
- **Année** 16 · **Prérequis** `n-interp-error` · **Étiquettes** `opt` · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `n-interp-error` : le facteur Π(x − xᵢ) de l'erreur à minimiser.
- **Statut** : fait le 10 novembre 2026 (étape U9). n ∈ {1, 2} seulement (cosinus √2/2, √3/2, 0), [a ; b] avec b − a pair ; n = 3 et 5 ne sont pas calculés à la main (n = 5 seulement dans le programme). L1 : cosinus guidés. L2 : transport guidé (piège `n_cheb_no_mapping`). L3 : décision sur le jeu de nœuds (leurre `n_runge_more_nodes`), puis menus. L4 : nœuds, puis max|Π(x − xᵢ)| = 2⁻ⁿ((b − a)/2)ⁿ⁺¹. L5 : `code` cheb, puis `readtable` de Runge. Examen : `tf` (deux énoncés vrais).
- **Intro** : sur [−1 ; 1], tᵢ = cos((2i + 1)π/(2(n + 1))) pour i = 0 … n. Sur [a ; b], xᵢ = (a + b)/2 + (b − a)/2·tᵢ. Ces nœuds minimisent max|Π(x − xᵢ)|, qui vaut 2⁻ⁿ sur [−1 ; 1], et évitent Runge. Les notes GM utilisent aussi les nœuds de Clenshaw-Curtis et de Gauss-Legendre. Exemple : n = 2.
  - `t = cos(π/6), cos(π/2), cos(5π/6) = √3/2 ; 0 ; −√3/2`
  - `Π(x − tᵢ) = x³ − 3x/4, max = 1/4` (note : « contre 2/(3√3) ≈ 0,385 pour −1, 0, 1 »)
  - `sur [0 ; 4] : 2 + √3 ; 2 ; 2 − √3`
- **Juge** : `value` pour les nœuds, sous forme exacte ; `readtable` (le tableau de Runge de `n-interp-error`) · **Forme finale** : la liste des nœuds.
- **Niveaux** :
  - L1 : la formule est donnée ; l'élève calcule les cosinus.
  - L2 : transport vers [a ; b].
  - L3 : choisir le jeu de nœuds qui évite Runge.
  - L4 : les nœuds pour n = 3 sur [a ; b].
  - L5 : l'item `code`, puis le tableau.
- **Générateur** : n ∈ {1, 2, 3, 5} (cosinus exacts) ; [a ; b] à bornes entières, avec b − a pair.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def cheb(n, a, b):
      xs = []
      for i in range(n + 1):
          t = «math.cos((2 * i + 1) * math.pi / (2 * (n + 1)))»
          xs.append(«(a + b) / 2 + (b - a) / 2 * t»)
      return xs
  ```

  | expr | expect | tol |
  |---|---|---|
  | `cheb(2, -1, 1)[0]` | `0.8660254037844387` | 1e−12 |
  | `cheb(2, -1, 1)[1]` | `0.0` | `atol` 1e−12 |
  | `cheb(2, 0, 4)` | `[3.7320508075688776, 2.0, 0.2679491924311226]` | 1e−12 |
- **Corrigé type** :
  1. `t₀ = cos(π/6) = √3/2` — sous-but `nodes`.
  2. `t₁ = 0 ; t₂ = −√3/2` — sous-but `nodes`.
  3. `x = 2 + 2t` — sous-but `map`.
  4. `{2 + √3 ; 2 ; 2 − √3}` — sous-but `map`.
- **Aides** :
  1. « Les nœuds de Tchebychev se resserrent près des bords. »
  2. « xᵢ = (a + b)/2 + (b − a)/2·cos(▢) »
  3. « Sur [0 ; 4] : 2 + 2cos(π/6) = 2 + √3. »
- **Variantes d'examen** : `tf` : « Avec les nœuds de Tchebychev, l'interpolant de 1/(1 + x²) converge quand n → ∞ » : vrai.
- **Pièges** : `n_cheb_no_mapping`, `n_runge_more_nodes`.
- **Sous-buts → crédit** : `nodes`, `map` → `n-chebyshev`.

### `n-interp-piecewise` — Interpolation linéaire par morceaux
- **Année** 16 · **Prérequis** `n-interp-error` · **Étiquettes** `GM` · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `n-interp-error` : erreur de degré 1 sur chaque morceau.
- **Statut** : fait le 10 novembre 2026 (étape U9). f = kx³ + αx² sur [0 ; b], h ∈ {1/2, 1/4, 1/5, 1/8, 1/10, 1/20}, tol = h²·max|f″|/8 décimal. Parties M, h = √(8·tol/M) (piège `n_p1_bound`), n. L1 et L2 ne diffèrent que par f″ donnée en L1. L3 : choix du sous-intervalle, puis Π₁ʰf(x*) avec menus. L4 : n minimal et une évaluation. L5 : `code` p1h (deux tests ajoutés : x = 1,5, et x hors des nœuds → None), puis `readtable` de sin sur [0 ; π] (ordre 2, borne respectée). Examen : `tf` (contre-exemple `num` `p1Ratio`, f = x²). La fonction eˣ n'est pas tirée.
- **Intro** : Π₁ʰf est affine sur chaque [xᵢ ; xᵢ₊₁] et max|f − Π₁ʰf| ≤ (h²/8)·max|f″|. C'est l'ordre 2 en h, sans phénomène de Runge. Exemple : f(x) = x³ sur [0 ; 2].
  - `max|f″| = max|6x| = 12` (note : « en x = 2 »)
  - `erreur ≤ 12h²/8 = 1,5h²`
  - `1,5h² ≤ 0,015 ⇔ h ≤ 0,1 ⇔ n ≥ 20 sous-intervalles`
- **Juge** : `value` (h max, puis n entier) ; pour l'évaluation de Π₁ʰf en un point, `value` · **Forme finale** : n minimal.
- **Niveaux** :
  - L1 : la borne est à trous.
  - L2 : max|f″| à trouver.
  - L3 : choisir le sous-intervalle qui contient x*.
  - L4 : n minimal, puis Π₁ʰf(x*).
  - L5 : `readtable`, puis l'item `code`.
- **Générateur** : f polynôme de degré 3 ou eˣ ; tolérance choisie pour que h tombe sur 10⁻ᵏ ou 1/2ᵏ ; données (xᵢ ; yᵢ) entières pour l'évaluation.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def p1h(xs, ys, x):
      for i in range(len(xs) - 1):
          if «xs[i] <= x and x <= xs[i + 1]»:
              return «ys[i] + (ys[i + 1] - ys[i]) * (x - xs[i]) / (xs[i + 1] - xs[i])»
      return None
  ```

  | expr | expect |
  |---|---|
  | `p1h([0, 1, 3], [1, 3, 2], 2)` | `2.5` |
  | `p1h([0, 1, 2, 4], [0, 1, 4, 16], 3)` | `10.0` |
- **Item `readtable`** : f = sin sur [0 ; π].

  | n | erreur max | h²/8 |
  |---|---|---|
  | 4 | 7.038e-02 | 7.711e-02 |
  | 8 | 1.885e-02 | 1.928e-02 |
  | 16 | 4.792e-03 | 4.819e-03 |
  | 32 | 1.203e-03 | 1.205e-03 |

  Questions : quel est l'ordre ? (2, rapport 4). La borne est-elle respectée ? (oui).
- **Corrigé type** :
  1. `f″(x) = 6x ; max_[0 ; 2] = 12` — sous-but `max`.
  2. `12h²/8 ≤ 0,015` — sous-but `bound`.
  3. `h ≤ 0,1 ; n = 2/h ≥ 20` — sous-but `n`.
- **Aides** :
  1. « Sur chaque morceau, c'est l'interpolation de degré 1 : l'erreur fait intervenir f″ et h². »
  2. « (h²/8)·▢ ≤ 0,015 »
  3. « 1,5h² ≤ 0,015, donc h ≤ 0,1 et n ≥ 20. »
- **Variantes d'examen** : `tf` : « Diviser h par 2 divise par 2 l'erreur de Π₁ʰ » : faux, elle est divisée par 4.
- **Pièges** : `n_p1_bound`.
- **Sous-buts → crédit** : `max` → `a1-extrema-global` ; `bound`, `n` → `n-interp-piecewise`.

### `n-spline` — Splines cubiques naturelles
- **Année** 16 · **Prérequis** `n-interp-piecewise` · **Étiquettes** `GM` · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `n-interp-piecewise` : interpolation par morceaux, puis conditions de raccord.
- **Statut** : fait le 10 novembre 2026 (étape U9). Nœuds −1, 0, 1 ; données tirées à partir de (a, b, c), c ∈ (3/2)ℤ*. Parties `value` a, b, c, d₁, d₂ (conditions dans les notes, au lieu de `equiv` et `rowops`). L1 : formules données. L2 : décision sur les conditions aux bords (leurres `n_spline_natural_first`, `n_spline_count`). L3 : décision sur les 2 conditions supplémentaires, puis menus. L4 : libre. L5 : `readtable` de la spline naturelle de sin (ordre 4, recalculé). Examen : `mcq` (degrés de liberté restants, `n_spline_count`), `tf` (s′ = 0 aux bords, QCM Vrai/Faux ; ou « C² », vrai).
- **Intro** : une spline cubique s est C² sur [a ; b], de degré 3 sur chaque sous-intervalle, et interpole les données. On compte : 4n inconnues, 3(n − 1) conditions de continuité et n + 1 conditions d'interpolation, donc il reste 2 degrés de liberté. La spline naturelle les fixe par s″(x₁) = s″(xₙ₊₁) = 0. L'erreur est en O(h⁴). Exemple des notes : (−1 ; −1), (0 ; 1), (1 ; 1).
  - `continuité en 0 : a₁ = a₂, b₁ = b₂, c₁ = c₂`
  - `s″(−1) = 0 : 2c − 6d₁ = 0 ; s″(1) = 0 : 2c + 6d₂ = 0`
  - `s = a + bx + cx² + (c/3)x³ sur [−1 ; 0], a + bx + cx² − (c/3)x³ sur [0 ; 1]`
  - `a = 1, a − b + 2c/3 = −1, a + b + 2c/3 = 1 → b = 1, c = −3/2`
  - `s = 1 + x − (3/2)x² − (1/2)x³ sur [−1 ; 0] ; 1 + x − (3/2)x² + (1/2)x³ sur [0 ; 1]`
- **Juge** : `lines` `equiv` sur les conditions (une ligne = une équation en a, b, c, d) ; `rowops` pour le système ; `equiv` `{vars:['x']}` pour chaque morceau · **Forme finale** : les deux morceaux.
- **Niveaux** :
  - L1 : les conditions sont écrites avec des trous.
  - L2 : l'élève écrit les conditions.
  - L3 : choisir les 2 conditions supplémentaires (naturelle, pentes imposées, not-a-knot).
  - L4 : la spline complète.
  - L5 : `readtable` (ordre 4).
- **Générateur** : nœuds −1, 0, 1. On part de (a, b, c) avec a, b ∈ ℤ ∩ [−3 ; 3] et c ∈ (3/2)·ℤ*, |c| ≤ 6. On calcule y(−1) = a − b + 2c/3, y(0) = a, y(1) = a + b + 2c/3, qui sont entiers.
- **Item `readtable`** : spline naturelle de sin sur [0 ; π]. Elle est exacte au bord, puisque sin″ = 0 en 0 et en π.

  | n | erreur max |
  |---|---|
  | 4 | 1.066e-03 |
  | 8 | 6.312e-05 |
  | 16 | 3.889e-06 |
  | 32 | 2.422e-07 |

  Question : l'ordre ? (4, rapport ≈ 16).
- **Corrigé type** : les lignes de l'intro. Les sous-buts sont `continuity`, `natural`, `interp`, `solve` et `pieces`.
- **Aides** :
  1. « Écris les 3 conditions de raccord en 0 (valeur, pente, courbure), puis s″ = 0 aux deux bouts. »
  2. « s″(−1) = 2c₁ − 6d₁ = ▢ »
  3. « b = 1, c = −3/2, d₁ = −1/2, d₂ = 1/2. »
- **Variantes d'examen** :
  - `tf` : « Une spline naturelle a s′ = 0 aux extrémités » : faux, c'est s″ = 0.
  - `mcq` : le nombre de degrés de liberté qui restent (2).
- **Pièges** : `n_spline_natural_first`, `n_spline_count`.
- **Sous-buts → crédit** : `continuity`, `natural`, `interp`, `pieces` → `n-spline` ; `solve` → `l-sys-echelon`.

### `n-least-squares` — Moindres carrés : équations normales à la main
- **Année** 16 · **Prérequis** `l-orth-lsq` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U9). 3 ou 4 points, solution de dénominateur ≤ 12, points non alignés. L1 : sommes Σx, Σx², Σy, Σxy, puis a₁, a₀ (guidé). L2 : AᵀA et Aᵀy dans la grille (`mat`, `cells`), puis a₁, a₀. L3 : décision interpoler ou équations normales (`n_ls_interp`), puis menus. L4 : droite, ou y = a + bx². L5 : `code` lsq/lsq_line de l'examen 2021, puis `readtable` de sa sortie. Examen : `mcq` (ligne `alpha` avec `n_ls_aat` et `n_ls_interp`, ou ligne `basis` avec `n_ls_index_swap`), `coef` (a₁), `tf` (contre-exemple `num` `lsNoPoint`). Le gabarit (0 ; 1), (1 ; 3), (2 ; 4) et 1/(2 + x) ne sont que dans les tests du programme. Les trous de code n'apparaissent qu'au niveau 5 et dans les QCM d'examen (pas de trou au choix au niveau 1).
- **Intro** : on a m données et n < m fonctions de base φⱼ. On minimise Σᵢ (Σⱼ αⱼφⱼ(xᵢ) − yᵢ)². Avec A de taille m × n, Aᵢⱼ = φⱼ(xᵢ), on résout les équations normales AᵀA·α = Aᵀy. Pour une droite : [[m, Σx], [Σx, Σx²]]·(a₀ ; a₁) = (Σy ; Σxy). Exemple : (0 ; 1), (1 ; 3), (2 ; 4).
  - `Σx = 3, Σx² = 5, Σy = 8, Σxy = 11`
  - `[[3, 3], [3, 5]]·(a₀ ; a₁) = (8 ; 11)`
  - `a₁ = 3/2, a₀ = 7/6` (note : « droite y = 7/6 + 3x/2 »)
- **Juge** : item `matrix` jugé par `equiv` pour AᵀA et Aᵀy ; `rowops` ; `value` pour (a₀ ; a₁) · **Forme finale** : le vecteur des coefficients exacts.
- **Niveaux** :
  - L1 : les sommes sont à trous.
  - L2 : AᵀA est à remplir, puis le système est résolu.
  - L3 : choisir « interpoler » ou « équations normales » (le premier est un piège : 3 points, 2 inconnues).
  - L4 : droite ou parabole y = a + bx², en libre.
  - L5 : l'item `code` (l'examen 2021 : réseau de neurones à une couche de fonctions max(0, x − i/(N + 1))), puis un QCM.
- **Générateur** : 3 ou 4 points à abscisses entières dans [−2 ; 3] et ordonnées entières dans [−5 ; 8].
  - Contrainte : la solution a un dénominateur ≤ 12 ; on rejette les points alignés, dont le résidu est nul.
  - Gabarit 2 : y = a·x, un seul paramètre, a = Σxy/Σx².
  - Gabarit 3 (GM série 5) : f(x) = 1/(2 + x) en −1, 0, 1, ce qui donne a₀ = 11/18 et a₁ = −1/3.
- **Item `code`** (`PRELUDE_VEC`, `PRELUDE_MAT`), traduit de `exam2.m` (2021) :
  ```python
  def basis(n, i, x):
      return max(0.0, x - i / (n + 1))

  def lsq(xs, ys, n):
      # mat[j][i] = phi_i(x_j) : une ligne par donnee, une colonne par fonction de base
      m = len(xs)
      mat = zeros2(m, n)
      for i in range(n):
          for j in range(m):
              mat[j][i] = basis(n, i, «xs[j]»)
      At = transpose(mat)
      return «solve(matmul(At, mat), matvec(At, ys))»

  def lsq_line(xs, ys):
      m = len(xs)
      A = zeros2(m, 2)
      for j in range(m):
          A[j][0] = «1.0»
          A[j][1] = «xs[j]»
      At = transpose(A)
      return solve(matmul(At, A), matvec(At, ys))
  ```

  | expr | expect | tol |
  |---|---|---|
  | `lsq_line([0, 1, 2], [1, 3, 4])` | `[1.1666666666666667, 1.5]` | 1e−9 |
  | `lsq_line([-1, 0, 1], [1, 0.5, 1/3])` | `[0.611111111111111, -0.33333333333333337]` | 1e−9 |
  | `lsq([0.25, 0.5, 0.75, 1.0], [0.0, 0.5, 1.0, 1.5], 2)` | `[0.2539682539682564, 1.9047619047619004]` | 1e−9 |

  L1 au format d'examen : la ligne `alpha = ???`, avec les options `solve(matmul(At, mat), matvec(At, ys))`, `solve(matmul(mat, At), …)` (`n_ls_aat`), et deux options où les rôles sont inversés.
- **Corrigé type** :
  1. `A = [[1, 0], [1, 1], [1, 2]], y = (1 ; 3 ; 4)` — sous-but `design`.
  2. `AᵀA = [[3, 3], [3, 5]], Aᵀy = (8 ; 11)` — sous-but `normal`.
  3. `2a₁ = 3 → a₁ = 3/2` — sous-but `solve`.
  4. `a₀ = (8 − 9/2)/3 = 7/6` — sous-but `solve`.
- **Aides** :
  1. « Trop d'équations pour les inconnues : multiplie le système par Aᵀ. »
  2. « AᵀA = [[m, Σx], [Σx, ▢]] »
  3. « [[3, 3], [3, 5]]·(a₀ ; a₁) = (8 ; 11), donc a₁ = 3/2 et a₀ = 7/6. »
- **Variantes d'examen** :
  - `mcq` (2021) : « Aᵢⱼ = ? » parmi φⱼ(xᵢ) (juste quand A est m × n), φᵢ(xⱼ) (`n_ls_index_swap`), etc. ; puis la ligne `mat(j,i) = basis(N,i,???)` et la ligne `alpha = ???`.
  - `coef` : « a₁ = ? »
  - `tf` : « La droite des moindres carrés passe par au moins un des points » : faux. Contre-exemple : (0 ; 0), (1 ; 1), (2 ; 0) donne y = 1/3, qui ne passe par aucun point.
- **Pièges** : `n_ls_interp`, `n_ls_aat`, `n_ls_index_swap`.
- **Sous-buts → crédit** : `design`, `normal` → `n-least-squares` ; `solve` → `l-orth-lsq`.

### `n-fd-basic` — Différences finies progressives, rétrogrades, centrées
- **Année** 16 · **Prérequis** `a1-dl-usual` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-dl-usual` : Taylor de f(x̄ ± h) pour l'ordre.
- **Statut** : fait le 10 novembre 2026 (étape U9). f polynôme de degré 3 ou 4 à coefficients entiers dans [−3 ; 3], x̄ ∈ {−1, 0, 1, 2}, h ∈ {0,1 ; 0,2 ; 0,5}, avec f″(x̄) ≠ 0 et f‴(x̄) ≠ 0 ; valeurs décimales exactes jugées par `value`. L1 : les trois quotients, valeur à trous ; L2 : formules avec les valeurs, dénominateur à trous ; L3 : décision sur la formule centrée (piège `n_fd_centered_h`), puis l'ordre ; L4 : δ⁺, δᶜ, f′(x̄) et l'erreur δᶜ − f′(x̄), égale à h²f‴(x̄)/6 (exact en degré ≤ 4), au lieu d'une comparaison des ordres ; L5 : l'item `code` (quatre formules, tests du catalogue), puis un `readtable` d'erreurs recalculé en double (ln, exp ou sin) avec un QCM à plusieurs réponses. Examen : QCM (valeur de δᶜ, ou le tableau avec plusieurs réponses) ; V/F vrai (centrée exacte en degré 2) ou faux avec le contre-exemple f = x² en 0 (`num` `fdForwardNotOrder2`). Le QCM 2019 « quelle formule pour ∂u/∂t » n'est pas construit.
- **Intro** : les formules de base sont :
  - progressive : δ⁺f = (f(x̄ + h) − f(x̄))/h, d'ordre 1 ; son erreur vaut (h/2)·f″(ξ) ;
  - rétrograde : δ⁻f = (f(x̄) − f(x̄ − h))/h, d'ordre 1 ;
  - centrée : δᶜf = (f(x̄ + h) − f(x̄ − h))/(2h), d'ordre 2 ; son erreur vaut (h²/6)·f‴(ξ) ;
  - dérivée seconde : (f(x̄ + h) − 2f(x̄) + f(x̄ − h))/h², d'ordre 2.

  Exemple : f(x) = x³, x̄ = 1, h = 0,1, f′(1) = 3.
  - `δ⁺ = (1,331 − 1)/0,1 = 3,31` (note : « erreur 0,31 »)
  - `δ⁻ = (1 − 0,729)/0,1 = 2,71` (note : « erreur 0,29 »)
  - `δᶜ = (1,331 − 0,729)/0,2 = 3,01` (note : « erreur 0,01 = h²·f‴/6 »)
- **Juge** : `value` pour les quotients (nombres décimaux exacts) ; `series` `{v:'h', at:0, order:2, abstract:{f:'C3'}}` pour les développements (voir `n-fd-proof`) · **Forme finale** : les trois valeurs, puis l'ordre de chaque formule.
- **Niveaux** :
  - L1 : formules données, valeurs à trous.
  - L2 : l'élève écrit les formules.
  - L3 : associer chaque formule à son ordre.
  - L4 : valeurs et ordres, puis l'erreur exacte comparée à h·f″/2 et h²·f‴/6.
  - L5 : l'item `code`, puis le `readtable`.
- **Générateur** : f polynôme de degré 2 à 4 à coefficients entiers, x̄ ∈ {−1, 0, 1, 2}, h ∈ {0,1 ; 0,2 ; 0,5}. Les valeurs ont au plus 4 décimales.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def fd_forward(f, x, h):
      return «(f(x + h) - f(x)) / h»

  def fd_backward(f, x, h):
      return «(f(x) - f(x - h)) / h»

  def fd_centered(f, x, h):
      return «(f(x + h) - f(x - h)) / (2 * h)»

  def fd_second(f, x, h):
      return «(f(x + h) - 2 * f(x) + f(x - h)) / (h * h)»
  ```
  Setup : `def f(x): return x**3`.

  | expr | expect | tol |
  |---|---|---|
  | `fd_forward(f, 1, 0.1)` | `3.31` | 1e−9 |
  | `fd_backward(f, 1, 0.1)` | `2.71` | 1e−9 |
  | `fd_centered(f, 1, 0.1)` | `3.01` | 1e−9 |
  | `fd_second(f, 1, 0.1)` | `6.0` | 1e−9 |
- **Item `readtable`** : f = ln, x̄ = 1, erreurs |f′(1) − Dₕ|.

  | h | progressive | centrée |
  |---|---|---|
  | 1e-1 | 4.690e-02 | 3.353e-03 |
  | 1e-2 | 4.967e-03 | 3.334e-05 |
  | 1e-3 | 4.997e-04 | 3.333e-07 |
  | 1e-4 | 5.000e-05 | 3.333e-09 |

  Question (`mcq multi`) : vrai = « progressive d'ordre 1 », « centrée d'ordre 2 ».
- **Corrigé type** : les trois lignes de l'intro (sous-but `eval`), puis `progressive et rétrograde : erreur ≈ 0,3 ≈ h·f″/2 = 0,3 ; centrée : 0,01 = h²·f‴/6` (sous-but `order`).
- **Aides** :
  1. « Progressive : vers l'avant ; rétrograde : vers l'arrière ; centrée : des deux côtés, divisée par 2h. »
  2. « δᶜ = (f(1,1) − f(0,9))/▢ »
  3. « (1,331 − 0,729)/0,2 = 3,01. »
- **Variantes d'examen** :
  - `tf` :
    - « La différence centrée est exacte pour les polynômes de degré 2 » : vrai.
    - « La formule progressive est d'ordre 2 » : faux. Contre-exemple : f = x² en 0, δ⁺ = h ≠ 0.
  - `mcq` (2019, problème de transport) : quelle formule approche ∂u/∂t ? (progressive).
- **Pièges** : `n_fd_centered_h`, `n_fd_taylor_sign`.
- **Sous-buts → crédit** : `eval` → `n-fd-basic` ; `order` → `n-fd-basic`.

### `n-fd-roundoff` — Compromis entre arrondi et troncature
- **Année** 16 · **Prérequis** `n-fd-basic`, `n-err-float`, `a1-extrema-global` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `n-fd-basic` : erreur de troncature de δ⁺f.
- **Statut** : fait le 10 novembre 2026 (étape U9). ε reste une lettre dans les lignes (`equiv` sur ε ∈ [0,5 ; 2]), puisque 10⁻¹⁶ se perdrait dans la comparaison numérique. M₀ et M₂ sont des carrés, donc h* = k√ε. h* est saisi comme la lettre H, jugée par `subst`, puis h*/10⁻⁸ pour ε = 10⁻¹⁶. L1 : E′(h) à trous, puis H et la valeur ; L2 : décision sur les deux termes de E(h) (piège `n_fd_smaller_h`), puis E(h), E′(h) et h* ; L3 : `readtable` de la progressive en double (ln, exp, sin, x³), « quel h est le meilleur ? » ; L4 : formule centrée, h* = ∛(3εM₀/M₃) avec 3M₀/M₃ = 1, puis l'ordre de grandeur 10⁻⁵ ; L5 : tableau des deux formules, QCM à plusieurs réponses dont les vérités sont calculées. Examen : V/F faux avec contre-exemple vérifié en double (`num` `fdSmallerWorse`).
- **Intro** : en machine, |f′(x̄) − δ̂⁺f| ≤ (h/2)·max|f″| + 2ε·max|f|/h, avec ε ≈ 10⁻¹⁶. Le premier terme (troncature) décroît avec h ; le second (arrondi) croît. Le minimum est vers h* = 2√(ε·max|f|/max|f″|) ≈ 10⁻⁸. Pour la formule centrée, (h²/6)·max|f‴| + ε·max|f|/h donne h* ≈ ε^(1/3) ≈ 10⁻⁵. Exemple : f = ln, x̄ = 1, avec max|f| ≈ max|f″| ≈ 1.
  - `E(h) ≈ h/2 + 2·10⁻¹⁶/h`
  - `E′(h) = 1/2 − 2·10⁻¹⁶/h² = 0 ⇔ h* = 2·10⁻⁸`
- **Juge** : `equiv` pour E(h) et h* (expression) ; `readtable` · **Forme finale** : h* (ordre de grandeur), et la lecture du tableau.
- **Niveaux** :
  - L1 : E(h) est donnée ; l'élève dérive et résout.
  - L2 : l'élève écrit E(h) à partir des deux contributions.
  - L3 : dans le tableau, choisir la zone de troncature, puis la zone d'arrondi.
  - L4 : h* pour la centrée.
  - L5 : `readtable` complet, puis un QCM à plusieurs réponses.
- **Générateur** : f ∈ {ln, exp, sin, x³} ; x̄ tel que max|f| et max|f″| soient de l'ordre de 1 ; ε = 10⁻¹⁶. Le tableau vient d'un calcul en double (JS), pour h = 10⁻¹ … 10⁻¹⁴.
- **Item `readtable`** : f = ln, x̄ = 1 (notes GM), erreurs en double.

  | h | progressive | centrée |
  |---|---|---|
  | 1e-2 | 4.967e-03 | 3.334e-05 |
  | 1e-4 | 5.000e-05 | 3.333e-09 |
  | 1e-5 | 5.000e-06 | 3.433e-11 |
  | 1e-6 | 5.001e-07 | 2.642e-11 |
  | 1e-8 | 1.108e-08 | 5.264e-10 |
  | 1e-10 | 8.269e-08 | 8.274e-08 |
  | 1e-12 | 8.890e-05 | 3.339e-05 |
  | 1e-14 | 7.993e-04 | 7.993e-04 |

  Question (`mcq multi`) : vrai = « le meilleur h pour la progressive est vers 10⁻⁸ », « en dessous, l'erreur augmente à cause des arrondis », « la centrée atteint son minimum pour un h plus grand ». Faux = « plus h est petit, plus l'approximation est précise » (`n_fd_smaller_h`).
- **Corrigé type** :
  1. `E(h) = h/2·M₂ + 2ε·M₀/h` — sous-but `model`.
  2. `E′(h) = M₂/2 − 2εM₀/h² = 0` — sous-but `min`.
  3. `h* = 2√(εM₀/M₂) ≈ 2·10⁻⁸` — sous-but `min`.
  4. `tableau : minimum à h = 1e-8 (1,1·10⁻⁸)` — sous-but `read`.
- **Aides** :
  1. « Deux erreurs se disputent : celle de Taylor, qui diminue avec h, et l'arrondi divisé par h, qui augmente. »
  2. « E′(h) = 1/2 − 2·10⁻¹⁶/▢ »
  3. « h* = 2·10⁻⁸ ; c'est bien là que le tableau est minimal. »
- **Variantes d'examen** : `tf` : « Plus h est petit, plus la différence finie est précise » : faux. Contre-exemple : le tableau, où h = 10⁻¹⁴ donne 8·10⁻⁴.
- **Pièges** : `n_fd_smaller_h`, `n_eps_absolute`.
- **Sous-buts → crédit** : `model` → `n-err-float` ; `min` → `a1-extrema-global` ; `read` → `n-fd-roundoff`.

### `n-fd-build` — Construire une formule de différences finies par Taylor
- **Année** 16 · **Prérequis** `n-fd-basic` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `n-fd-basic` : formules de base et leur ordre.
- **Statut** : fait le 10 novembre 2026 (étape U9). Gabarits de f′ sur {0, −1, −2}, {0, 1, 2}, {−1, 0, 1} et {−1, 0, 2}, coefficients exacts. Les développements sont des lignes `equiv` où f est déclarée comme son polynôme de Taylor d'ordre 3 avec les lettres A = f(x̄), B = f′(x̄), C = f″(x̄), D = f‴(x̄) : pas de juge `series` à f abstraite, et le reste n'est pas écrit (« + … » en note). Le système en α, β, γ est jugé par `system`. L1 : coefficients à trous ; L2 : un développement à trous, puis le système ; L3 : décision sur les conditions (piège `n_fd_order_conditions`) ; L4 : développement, système et coefficient E du terme d'erreur ; L5 : l'item `code` (deux formules), puis le gabarit à paramètre « γ pour l'ordre 2 ». Les gabarits pour f″ ne sont pas construits. Examen : QCM « laquelle est d'ordre 2 » (distracteurs : formule d'ordre 1, signes inversés, non consistante), `coef` β (leurre `n_fd_taylor_sign`).
- **Intro** : pour Dₕf(x̄) = (αf(x̄) + βf(x̄ − h) + γf(x̄ − 2h))/h, on développe chaque terme et on impose :
  - coefficient de f(x̄) égal à 0 ;
  - coefficient de f′(x̄) égal à 1 (ordre ≥ 1) ;
  - coefficient de h·f″(x̄) égal à 0 (ordre ≥ 2).

  Exemple (série GM 6) :
  - `α + β + γ = 0` (note : « terme en f(x̄)/h »)
  - `−β − 2γ = 1` (note : « terme en f′(x̄) »)
  - `β/2 + 2γ = 0` (note : « terme en h·f″(x̄) »)
  - `(α, β, γ) = (3/2, −2, 1/2)`, soit `(3f(x̄) − 4f(x̄ − h) + f(x̄ − 2h))/(2h)`
  - `Dₕf = f′(x̄) − (h²/3)·f‴(x̄) + …` (note : « ordre exactement 2 »)

  Pour l'ordre 1 seulement, on garde les deux premières équations : α = 1 + γ et β = −1 − 2γ, avec γ libre.
- **Juge** : `lines` `series` `{v:'h', at:0, order:3, abstract:{f:'C4'}}` pour les développements ; `rowops` pour le système en (α, β, γ) ; `value` pour le triplet · **Forme finale** : le triplet et l'ordre.
- **Niveaux** :
  - L1 : les développements sont donnés ; le système est à trous.
  - L2 : un développement (f(x̄ − 2h)) est à écrire.
  - L3 : choisir quels coefficients annuler pour l'ordre demandé.
  - L4 : la formule complète, puis son terme d'erreur.
  - L5 : un gabarit avec un paramètre (« pour quelle valeur de β la formule est-elle d'ordre 2 ? »), puis l'item `code`.
- **Générateur** : stencils {x̄, x̄ − h, x̄ − 2h}, {x̄, x̄ + h, x̄ + 2h}, {x̄ − h, x̄, x̄ + 2h}, ou {x̄ − h, x̄, x̄ + h}, pour f′ ou f″. Le système de type Vandermonde est résolu en exact. On rejette les dénominateurs > 6.
  - Gabarit à paramètre (GM 2012) : une famille dont les coefficients dépendent de β ; on demande l'ordre selon β.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def fd_back2(f, x, h):
      return «(3 * f(x) - 4 * f(x - h) + f(x - 2 * h)) / (2 * h)»

  def fd_fwd2(f, x, h):
      return «(-3 * f(x) + 4 * f(x + h) - f(x + 2 * h)) / (2 * h)»
  ```
  Setup : `def q(x): return 3*x*x - x + 2` et `def c(x): return x**3`. Une formule d'ordre 2 est exacte sur les polynômes de degré ≤ 2.

  | expr | expect | tol |
  |---|---|---|
  | `fd_back2(q, 1.5, 0.25)` | `8.0` | 1e−12 |
  | `fd_fwd2(q, 1.5, 0.25)` | `8.0` | 1e−12 |
  | `fd_back2(c, 1, 0.1)` | `2.98` | 1e−9 |

  Le 3e test vérifie l'erreur (h²/3)·f‴ = 0,02.
- **Corrigé type** :
  1. `f(x̄ − h) = f − hf′ + (h²/2)f″ − (h³/6)f‴ + …` — sous-but `taylor`.
  2. `f(x̄ − 2h) = f − 2hf′ + 2h²f″ − (4h³/3)f‴ + …` — sous-but `taylor`.
  3. `α + β + γ = 0 ; −β − 2γ = 1 ; β/2 + 2γ = 0` — sous-but `system`.
  4. `γ = 1/2, β = −2, α = 3/2` — sous-but `solve`.
  5. `terme suivant : h²(−β − 8γ)/6·f‴ = −(h²/3)f‴` — sous-but `error`.
- **Aides** :
  1. « Développe chaque f(x̄ − kh) autour de x̄, puis regroupe f, f′, f″. »
  2. « Coefficient de f′ : −β − 2γ = ▢ »
  3. « (α, β, γ) = (3/2, −2, 1/2). »
- **Variantes d'examen** :
  - `mcq` : « Quelle formule est d'ordre 2 ? » (2021, question 10 : la formule à 5 points (−u(2h) + 8u(h) − 8u(−h) + u(−2h))/(12h) est d'ordre 4 ; celle en « 6 … /(10h) » n'est même pas consistante).
  - `coef` : « β = ? »
- **Pièges** : `n_fd_taylor_sign`, `n_fd_order_conditions`.
- **Sous-buts → crédit** : `taylor` → `a1-dl-usual` ; `system`, `solve`, `error` → `n-fd-build`.

### `n-fd-proof` — Prouver l'ordre d'une formule de différences finies, avec la constante
- **Année** 16 · **Prérequis** `n-fd-build` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U9). Formules d'ordre 2 de n-fd-build, avec C = 1, 1/3 ou 1/6. Les restes de Lagrange sont les lettres U = f‴(ξ₁) et V = f‴(ξ₂) ; les lignes `equiv` (f définie par son polynôme de Taylor terminé par U ou V) remplacent le `series` à f abstraite. La combinaison et f′ − Dₕf sont jugées par `equiv` avec la cible `goal` (piège `n_proof_same_xi`). La constante est la lettre K, cible `constant` (piège `n_proof_constant_depends_h` si U, V ou h restent). La majoration est une preuve en blocs avec trois leurres (`n_proof_same_xi`, `n_proof_constant_depends_h`, `g9_proof_by_example`). L1 et L2 : lignes guidées ; L3 : décisions sur l'ordre où arrêter Taylor et sur ξ₁ = ξ₂ ; L4 : lignes libres, ou les blocs, ou le `readtable` eˣ (« ce tableau prouve-t-il ? ») ; L5 et `open` : le problème de l'exemple d'examen 6 sur 7 points (1,5 + 1,5 + 1,5 + 1,5 + 1). V/F : trois énoncés en QCM Vrai/Faux (changés en `tf` par l'examen).
- **Intro** : une preuve d'ordre se fait en quatre temps :
  1. Taylor avec reste de Lagrange, jusqu'au premier ordre qui ne s'annule pas ;
  2. combinaison des développements ;
  3. majoration : |…| ≤ (somme des |coefficients|)·max|f⁽ᵖ⁾|·hᵏ ;
  4. vérifier que la constante ne dépend ni de h ni de f, et que les points ξ restent dans l'intervalle.

  Exemple (examen 2019, 7 points) : pour f ∈ C³[x₀ ; x₀ + 2] et 0 < h ≤ 1, |f′(x₀) − (−3f(x₀) + 4f(x₀ + h) − f(x₀ + 2h))/(2h)| ≤ h²·max|f‴|.
  - `f(x₀ + h) = f + hf′ + (h²/2)f″ + (h³/6)f‴(ξ₁)`
  - `f(x₀ + 2h) = f + 2hf′ + 2h²f″ + (4h³/3)f‴(ξ₂)`
  - `−3f + 4f(x₀ + h) − f(x₀ + 2h) = 2hf′ + (2h³/3)f‴(ξ₁) − (4h³/3)f‴(ξ₂)`
  - `f′ − (…)/(2h) = −(h²/3)f‴(ξ₁) + (2h²/3)f‴(ξ₂)`
  - `|…| ≤ (1/3 + 2/3)h²·max|f‴| = h²·max|f‴|` (note : « ξ₁, ξ₂ ∈ [x₀ ; x₀ + 2h] ⊂ [x₀ ; x₀ + 2] car h ≤ 1 »)
- **Juge** : `problem` en quatre parties :
  - A : `lines` `series` `{v:'h', at:0, order:3, abstract:{f:'C3'}, remainder:'lagrange'}` (voir les extensions en fin de fichier) ;
  - B : `lines` `equiv`, qui traite f, f′, f″, f‴(ξ₁) et f‴(ξ₂) comme des symboles ;
  - C : `blocks` `{mode:'frame'}`, avec les blocs « inégalité triangulaire », « |f‴(ξᵢ)| ≤ max|f‴| », « ξᵢ ∈ [x₀ ; x₀ + 2] car h ≤ 1 », « conclusion », et le leurre « f‴(ξ₁) = f‴(ξ₂), donc les termes s'annulent » ;
  - D : `answer` `value` pour C = 1.
  - **Forme finale** : la constante C, avec la conclusion.
- **Niveaux** :
  - L1 : les développements sont écrits avec des trous sur les coefficients ; les blocs sont déjà ordonnés, sauf deux.
  - L2 : un développement est à écrire ; tous les blocs sont à ordonner.
  - L3 : choisir l'ordre auquel arrêter Taylor (le premier ordre non annulé), puis le reste.
  - L4 : la preuve complète, avec les blocs proposés.
  - L5 : la preuve d'examen, sans aide, notée sur 7 points (barème dans « Exemples de type examen »).
- **Générateur** : la formule vient de `n-fd-build` (ordre 1 ou 2, dérivée première ou seconde). La constante C est la somme des |coefficients| des restes, après division ; on garde les formules où C est un rationnel de dénominateur ≤ 12. L'intervalle de régularité est [x₀ − kh ; x₀ + kh] avec h ≤ 1.
- **Item `readtable`** : f = eˣ en x₀ = 0, formule rétrograde d'ordre 2 (3f(x₀) − 4f(x₀ − h) + f(x₀ − 2h))/(2h).

  | h | erreur | h²/3 |
  |---|---|---|
  | 0.1 | 3.095e-03 | 3.333e-03 |
  | 0.05 | 8.028e-04 | 8.333e-04 |
  | 0.025 | 2.045e-04 | 2.083e-04 |
  | 0.0125 | 5.160e-05 | 5.208e-05 |

  Questions : l'ordre observé ? (2). Ce tableau prouve-t-il l'inégalité ? (non, il l'illustre : leurre `g9_proof_by_example`).
- **Corrigé type** : les 5 lignes de l'intro, avec les sous-buts `taylor`, `taylor`, `combine`, `combine`, `bound`, puis `constant` (C = 1).
- **Aides** :
  1. « Développe f(x₀ + h) et f(x₀ + 2h) jusqu'à f‴, avec un reste de Lagrange **différent** pour chacun. »
  2. « f(x₀ + 2h) = f + 2hf′ + 2h²f″ + ▢·f‴(ξ₂) »
  3. « Après division par 2h : f′ − h²/3·f‴(ξ₁) + 2h²/3·f‴(ξ₂), d'où C = 1/3 + 2/3 = 1. »
- **Variantes d'examen** :
  - `open` : le problème de 7 points.
  - `tf` (2021, question 10) : voir `n-error-statements`.
- **Pièges** : `n_proof_same_xi`, `n_proof_constant_depends_h`, `n_fd_taylor_sign`, `g9_proof_by_example`.
- **Sous-buts → crédit** : `taylor` → `a1-dl-usual` ; `combine` → `n-fd-build` ; `bound`, `constant` → `n-fd-proof`.

### `n-quad-composite` — Formules composites : rectangle, point milieu, trapèze, Simpson
- **Année** 16 · **Prérequis** `g5-sigma`, `a1-int-direct` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-int-direct` : intégrale exacte pour comparer.
- **Statut** : fait le 10 novembre 2026 (étape U9). f = c·xᵏ (+ e·x) + d, k ∈ {2, 3, 4}, b − a ∈ {1, 2, 4}, n ∈ {1, 2}, valeurs exactes de dénominateur ≤ 48 ; lignes jugées par `value` avec la valeur de la formule (la formule écrite avec les nombres, la somme par sous-intervalle, le total). L1 : poids et f(cᵢ) du premier sous-intervalle à trous ; L2 : les poids ; L3 : décision h/6 ou h/3 (`n_simpson_h3_h6`), h/2 ou h (`n_trap_weights`) ; L4 : les quatre formules sur un même exemple ; L5 : le programme (simpson, trapeze, midpoint, 6 trous), puis un tableau de simpson(g, 0, 2, 2) pour x², x³, x⁴ (QCM à plusieurs réponses). La variante avec une table de valeurs de eˣ, sin, 1/x n'est pas construite. QCM : valeur de Simpson ou du trapèze, avec les distracteurs h/3, poids h partout et une autre formule.
- **Intro** : avec h = (b − a)/n, xᵢ = a + ih et cᵢ le milieu de [xᵢ₋₁ ; xᵢ] :
  - rectangle (à gauche) : Σ h·f(xᵢ₋₁) ;
  - point milieu : Σ h·f(cᵢ) ;
  - trapèze : Σ (h/2)·(f(xᵢ₋₁) + f(xᵢ)) ;
  - Simpson : Σ (h/6)·(f(xᵢ₋₁) + 4f(cᵢ) + f(xᵢ)).

  Exemple : ∫₀² x³ dx = 4, avec n = 2 (h = 1).
  - `point milieu : 1·(0,5³ + 1,5³) = 0,125 + 3,375 = 3,5`
  - `trapèze : (1/2)(0 + 1) + (1/2)(1 + 8) = 5`
  - `Simpson : (1/6)(0 + 4·0,125 + 1) + (1/6)(1 + 4·3,375 + 8) = 0,25 + 3,75 = 4` (note : « exact : Simpson intègre exactement x³ »)
- **Juge** : `definite` `{value}` : chaque ligne est une expression en nombres, de même valeur exacte que la formule annoncée · **Forme finale** : nombre exact.
- **Niveaux** :
  - L1 : la somme est écrite terme par terme, avec des trous sur les nœuds et les poids.
  - L2 : les poids sont à trouver.
  - L3 : choisir la formule demandée, et h (longueur d'un **sous-intervalle**).
  - L4 : les 4 formules sur le même exemple.
  - L5 : l'item `code`.
- **Générateur** : f polynôme de degré ≤ 4 à coefficients entiers, [a ; b] avec b − a ∈ {1, 2, 4}, n ∈ {1, 2, 4}. Variante : f ∈ {eˣ, sin, 1/x} avec une table de valeurs fournie (sans calculatrice). Contrainte : le résultat est rationnel, de dénominateur ≤ 48.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def simpson(f, a, b, n):
      h = (b - a) / n
      s = 0.0
      for i in range(n):
          x0 = a + i * h
          x1 = «x0 + h»
          c = «(x0 + x1) / 2»
          s = s + «h / 6 * (f(x0) + 4 * f(c) + f(x1))»
      return s

  def trapeze(f, a, b, n):
      h = (b - a) / n
      s = «(f(a) + f(b)) / 2»
      for i in range(1, n):
          s = s + f(a + i * h)
      return «h * s»

  def midpoint(f, a, b, n):
      h = (b - a) / n
      s = 0.0
      for i in range(n):
          s = s + «f(a + (i + 0.5) * h)»
      return h * s
  ```
  Tests. Le 1er est celui de la série GM 7 : `intsimp = 139.0798257692752`.

  | setup | expr | expect | tol |
  |---|---|---|---|
  | `def f(x): return x*x - 4*x + math.exp(x)` | `simpson(f, 0, 5, 1000)` | `139.0798257692752` | 1e−12 |
  | `def g(x): return x**3` | `simpson(g, 0, 2, 2)` | `4.0` | 1e−12 |
  | `def g(x): return x*x` | `trapeze(g, 0, 1, 4)` | `0.34375` | 1e−12 |
  | | `midpoint(math.sin, 0, math.pi, 2)` | `2.221441469079183` | 1e−12 |
- **Corrigé type** : Simpson, ∫₀² x³, n = 2.
  1. `h = 1 ; nœuds 0, 1, 2 ; milieux 0,5 ; 1,5` — sous-but `nodes`.
  2. `(1/6)(f(0) + 4f(0,5) + f(1)) = (1/6)(0 + 0,5 + 1) = 0,25` — sous-but `sum`.
  3. `(1/6)(f(1) + 4f(1,5) + f(2)) = (1/6)(1 + 13,5 + 8) = 3,75` — sous-but `sum`.
  4. `total 4` — sous-but `total`.
- **Aides** :
  1. « Simpson, sur chaque sous-intervalle de longueur h : (h/6)·(gauche + 4·milieu + droite). »
  2. « (1/6)(f(1) + 4f(▢) + f(2)) »
  3. « 0,25 + 3,75 = 4. »
- **Variantes d'examen** : `mcq` : « Simpson composite de x³ sur [0 ; 2] avec n = 2 ». Distracteurs : 8, avec h/3 au lieu de h/6 (`n_simpson_h3_h6`) ; 9, avec un trapèze aux poids tous égaux à h (`n_trap_weights`) ; 3,5, le point milieu.
- **Pièges** : `n_simpson_h3_h6`, `n_trap_weights`.
- **Sous-buts → crédit** : `nodes` → `g5-sigma` ; `sum`, `total` → `n-quad-composite`.

### `n-quad-exactness` — Degré d'exactitude ; ramener à [−1 ; 1]
- **Année** 16 · **Prérequis** `n-quad-composite`, `a1-int-subst` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `n-quad-composite` : les formules élémentaires J à tester.
- **Statut** : fait le 10 novembre 2026 (étape U9). Formules symétriques sur [−1 ; 1] : g(±1/√3), g(±1/2), g(±1), 2g(0), Simpson, trapèze en deux morceaux, Simpson 3/8 (et Gauss à 3 points pour le QCM) ; une partie `value` par monôme (J(tᵏ), et ∫tᵏ au niveau 2), puis r (piège `n_exactness_stop_early`). L3 : après chaque monôme, décision « tester le suivant / conclure » ; L4 : poids de ω₀g(−1) + ω₁g(β) + ω₂g(1), β ∈ {0, ±1/2, ±1/3}, puis le degré ; L5 : le programme gauss2 (3 trous ; « h » à la place de h/2 nomme `n_map_jacobian`), puis la lecture de ses tests. Le gabarit « trouver α tel que l'ordre soit 3 » est seulement dans l'exemple résolu (pas de juge `solset` en α). QCM à plusieurs réponses (exacte sur Pₖ, ordre de la composite) ; V/F sur le changement de variable (vrai avec h/2, faux avec h).
- **Intro** : J a le degré d'exactitude r si J(p) = ∫p pour tout p ∈ Pᵣ, mais pas pour un polynôme de degré r + 1. On teste 1, t, t², … dans l'ordre. Pour ramener [xᵢ ; xᵢ₊₁] à [−1 ; 1], on pose x = xᵢ + h(t + 1)/2, dx = (h/2)dt. Exemple : J(g) = g(−α) + g(α) avec 0 < α < 1.
  - `1 : J = 2 = ∫1 ; t : J = 0 = ∫t` (note : « exacte sur P₁ pour tout α »)
  - `t² : 2α² = 2/3 ⇔ α = 1/√3`
  - `t³ : 0 = 0`
  - `t⁴ : 2/9 ≠ 2/5` (note : « degré 3 pour α = 1/√3 »)
- **Juge** : `value` (exact, avec √) sur chaque ligne de test de monôme ; `solset` `{v:'α', domain:']0 ; 1['}` pour α ; `value` pour r. Pour le changement de variable : `definite` `{abstract:{f}}`, vérifié sur 3 fonctions test. · **Forme finale** : α et r.
- **Niveaux** :
  - L1 : le tableau des monômes est donné ; l'élève remplit J(tᵏ).
  - L2 : l'élève remplit ∫tᵏ et J(tᵏ), puis conclut.
  - L3 : choisir « tester le monôme suivant » ou « conclure ».
  - L4 : trouver les poids d'une formule à 3 nœuds pour un degré donné (série GM 7 : ω₀g(−1) + ω₁g(β) + ω₂g(1)).
  - L5 : le changement de variable (vrai/faux de 2020, question 16), puis l'item `code`.
- **Générateur** :
  - **Gabarit 1.** Formule symétrique g(−α) + g(α), ou w·g(0) + v·(g(−α) + g(α)).
  - **Gabarit 2.** Nœuds fixés {−1, 0, 1}, {−1, β, 1} ou {−1, −1/3, 1/3, 1}, et des poids inconnus. On résout le système des moments exactement. Pour {−1, 0, 1} : (1/3, 4/3, 1/3), de degré 3.
  - **Gabarit 3.** Le changement de variable vers [a ; b], avec b − a ∈ {1, 2, 4}.
- **Item `code`** (`PRELUDE_VEC`) : Gauss à 2 points composite.
  ```python
  def gauss2(f, a, b, n):
      h = (b - a) / n
      al = 1 / math.sqrt(3)
      s = 0.0
      for i in range(n):
          xi = a + i * h
          # x = xi + h (t + 1) / 2, dx = h/2 dt, noeuds t = -al et t = al
          s = s + «h / 2» * (f(«xi + h / 2 * (1 - al)») + f(«xi + h / 2 * (1 + al)»))
      return s
  ```

  | setup | expr | expect | tol |
  |---|---|---|---|
  | `def g(x): return x**3` | `gauss2(g, 0, 2, 1)` | `4.0` | 1e−12 |
  | `def g(x): return x**4` | `gauss2(g, 0, 2, 1)` | `6.222222222222222` | 1e−12 |
  | `def g(x): return x**3 + x*x` | `gauss2(g, -1, 3, 2)` | `29.333333333333336` | 1e−12 |

  Le 2e test donne 56/9 ≠ 32/5 : la formule n'est pas exacte sur P₄.
- **Corrigé type** : les 4 lignes de l'intro, avec les sous-buts `monomial` (× 4) et `degree`.
- **Aides** :
  1. « Teste 1, t, t², … et compare à ∫ de −1 à 1. La première égalité qui échoue donne le degré + 1. »
  2. « J(t²) = 2α² et ∫t² = ▢ »
  3. « 2α² = 2/3, donc α = 1/√3 ; t³ marche, t⁴ non : degré 3. »
- **Variantes d'examen** :
  - `mcq multi` (2020 question 15, 2022 question 10) : « Pour α = 1/√3, ∫p = J(p) pour tout p ∈ P₂ » (vrai), « P₃ » (vrai), « P₄ » (faux), « P₅ » (faux), « pour tout α, P₁ » (vrai).
  - `tf` (2020 question 16) : « ∫₀¹ f = (h/2)·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2)dt » : vrai.
- **Pièges** : `n_map_jacobian`, `n_exactness_stop_early`, `n_exactness_order`.
- **Sous-buts → crédit** : `monomial`, `degree` → `n-quad-exactness` ; changement de variable → `a1-int-subst`.

### `n-quad-order` — Ordre d'une formule composite ; lire un tableau d'erreurs
- **Année** 16 · **Prérequis** `n-quad-exactness`, `@alg:L-fonction-affine` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `n-quad-exactness` : ordre = degré d'exactitude + 1.
- **Statut** : fait le 10 novembre 2026 (étape U9). Tableaux calculés en JS pour e⁻ˣ sin x sur [0 ; 2] (série GM 7, identique au catalogue), eˣ et 1/(1 + x²) sur [0 ; 1], cos sur [0 ; π/2], n = 10 à 80 ; on écarte les paires où le rapport s'éloigne de plus de 25 % de 2ᵖ ou où l'erreur descend sous 10⁻¹³ (Simpson et Gauss sur 1/(1 + x²) convergent en h⁶ sur [0 ; 1]). L1 : colonne et rapports donnés, QCM sur p (`n_order_ratio_is_p`) ; L2 : le rapport (juge `stat`), puis p ; L3 : colonnes A à D à associer ; L4 : r puis p = r + 1 (`n_exactness_order`) ; L5 : méthode X inconnue, QCM à plusieurs réponses. Examen : QCM (ordre à partir du degré d'exactitude, ou la colonne X) ; V/F « le trapèze est plus précis que le point milieu », contre-exemple f (`num` `trapNotBetter`, réponse x²).
- **Intro** : si J a le degré d'exactitude r, la formule composite est d'ordre r + 1 pour f ∈ Cʳ⁺¹ : |∫f − Q_h(f)| ≤ C·max|f⁽ʳ⁺¹⁾|·hʳ⁺¹, avec C = 2(b − a)/(r + 1)! dans les notes. Les ordres sont : rectangle 1, point milieu 2, trapèze 2, Simpson 4, Gauss à 2 points 4. Pour lire un tableau : quand h est divisé par 2, l'erreur est divisée par 2ᵖ (c'est la pente p en échelle log-log). Exemple : point milieu, erreur 1,962·10⁻³ puis 4,912·10⁻⁴ quand n double.
  - `rapport 1,962e-03/4,912e-04 ≈ 3,99 ≈ 2²`
  - `ordre 2` (note : « cohérent avec r = 1 »)
- **Juge** : `readtable` ; `value` pour p ; `stat` `{sig: 2}` pour les rapports · **Forme finale** : l'ordre de chaque colonne.
- **Niveaux** :
  - L1 : les rapports sont calculés ; l'élève choisit p.
  - L2 : l'élève calcule les rapports.
  - L3 : associer chaque colonne à une méthode.
  - L4 : prédire l'ordre à partir du degré d'exactitude, puis vérifier sur le tableau.
  - L5 : une colonne de méthode inconnue, à identifier, puis un QCM à plusieurs réponses.
- **Générateur** : f ∈ {e⁻ˣ sin x sur [0 ; 2], eˣ, 1/(1 + x²), cos}, d'intégrale exacte connue ; n ∈ {10, 20, 40, 80}. On exclut les colonnes qui descendent sous 10⁻¹³. Attention : sur [0 ; 1], Simpson et Gauss à 2 points appliqués à 1/(1 + x²) convergent en h⁶ (rapport 64) et passent sous 10⁻¹³ à n = 80 ; ces paires sont écartées (constaté à l'étape U9).
- **Item `readtable`** (série GM 7) : f = e⁻ˣ sin x sur [0 ; 2].

  | n | rectangle | point milieu | trapèze | Simpson | Gauss 2 points |
  |---|---|---|---|---|---|
  | 10 | 1.623e-02 | 1.962e-03 | 3.927e-03 | 1.040e-06 | 6.935e-07 |
  | 20 | 7.136e-03 | 4.912e-04 | 9.826e-04 | 6.486e-08 | 4.324e-08 |
  | 40 | 3.322e-03 | 1.228e-04 | 2.457e-04 | 4.051e-09 | 2.701e-09 |
  | 80 | 1.600e-03 | 3.071e-05 | 6.142e-05 | 2.532e-10 | 1.688e-10 |
- **Corrigé type** :
  1. `rectangle : 3,322e-03/1,600e-03 ≈ 2,1 → p = 1` — sous-but `ratio`.
  2. `point milieu : ≈ 4 → p = 2 ; trapèze : ≈ 4 → p = 2` — sous-but `ratio`.
  3. `Simpson : 6,486e-08/4,051e-09 ≈ 16 → p = 4` — sous-but `ratio`.
  4. `r + 1 : 0 + 1, 1 + 1, 1 + 1, 3 + 1` — sous-but `theory`.
- **Aides** :
  1. « n double, donc h est divisé par 2 : regarde par combien l'erreur est divisée. »
  2. « 2ᵖ = 1,962e-03/4,912e-04 ≈ ▢ »
  3. « ≈ 4 = 2², donc ordre 2. »
- **Variantes d'examen** :
  - `tf` : « Le trapèze, qui utilise les deux extrémités, est plus précis que le point milieu » : faux (son erreur est environ le double ; voir le tableau).
  - `mcq` : « J est exacte sur P₃ ; la formule composite est d'ordre… » (4 ; distracteur 3, `n_exactness_order`).
- **Pièges** : `n_exactness_order`, `n_order_ratio_is_p`.
- **Sous-buts → crédit** : `ratio` → `@alg:L-fonction-affine` ; `theory` → `n-quad-order`.

### `n-quad-proof` — Prouver l'ordre d'une formule composite par Taylor
- **Année** 16 · **Prérequis** `n-quad-order`, `a1-dl-usual` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `n-quad-order` : l'énoncé d'ordre à prouver.
- **Statut** : fait le 10 novembre 2026 (étape U9). Les juges à fonction abstraite (extension 5) ne sont pas construits : le changement de variable, L_h et Taylor sont des QCM ; « J exacte sur P₁ » est une preuve en blocs (leurre « rᵢ = 0 car t est petit ») ; la majoration est jugée par `value` (∫₋₁¹ du poids du reste) puis `equiv` en h, N, L, M avec N = L/h substitué et une forme finale sans N ; la constante est (b − a)/24·max|f″|. Variantes de J : point milieu, rectangles à gauche et à droite (ordre 1), trapèze (erreur d'interpolation, (b − a)h²/12). L2 : tableau rectangle et point milieu (« que devient l'ordre avec 2g(−1) ? ») ; L3 : décisions (point du développement, degré de pᵢ) ; L4 : les blocs ; L5 et variante `open` : le problème 3 des exemples d'examen (10 points : 1,5 + 1 + 2 + 1,5 + 2,5 + 1,5). V/F : la formule de l'erreur (vrai) ou une borne laissée avec N (`n_proof_sum_count`).
- **Intro** : la preuve type est celle des examens 2019 (8 points) et 2021 (10 points), pour le point milieu J(g) = 2g(0).
  - (a) `∫ₐᵇ f = (h/2)·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2)dt`
  - (b) `L_h(f) = (h/2)·Σᵢ 2f(xᵢ + h/2) = h·Σᵢ f(xᵢ + h/2)`
  - (c) `f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t)`, avec `pᵢ(t) = f(cᵢ) + (ht/2)f′(cᵢ)` et `rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))`
  - (d) `J est exacte sur P₁ ⇒ ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t)dt`
  - (e) `|…| ≤ (h/2)·N·(h²/8)·(2/3)·max|f″| = (b − a)·h²/24·max|f″|`
  - (f) `J(g) = 2g(−1) (rectangle) : rᵢ = h(t + 1)/2·f′(ξ) ⇒ |…| ≤ (b − a)·h/2·max|f′|, ordre 1`
- **Juge** : `problem`.
  - (a) `definite` `{abstract:{f}}` (vérifié sur 3 fonctions test) ;
  - (b) `equiv` ;
  - (c) `series` `{v:'t', at:0, order:1, abstract:{f:'C2'}, remainder:'lagrange'}` ;
  - (d) `blocks` `{mode:'frame'}` avec les blocs « J(pᵢ) = ∫pᵢ car pᵢ ∈ P₁ », « linéarité de J », « J(rᵢ) = 2rᵢ(0) = 0 », et le leurre « rᵢ = 0 car t est petit » ;
  - (e) `lines` `equiv` sur les majorants, avec la constante finale par `value` : C = (b − a)/24 ;
  - (f) `value` pour l'ordre (1) et la constante ((b − a)/2).
  - **Forme finale** : la constante explicite.
- **Niveaux** :
  - L1 : (a) à (e) avec des trous, une partie à la fois.
  - L2 : (c) et (e) libres.
  - L3 : choisir le point du développement (cᵢ, le milieu) et l'ordre (1, puisque J est exacte sur P₁).
  - L4 : (a) à (f) avec des blocs proposés.
  - L5 : le problème d'examen de 10 points, sans aide.
- **Générateur** :
  - J ∈ {2g(0) (point milieu), 2g(−1) (rectangle à gauche), 2g(1) (rectangle à droite), g(−1) + g(1) (trapèze, avec une partie (c) adaptée : l'erreur de l'interpolation linéaire)} ;
  - [a ; b] ∈ {[0 ; 1], [a ; b] général} ;
  - C est rationnelle × (b − a) × max|f⁽ᵖ⁾|.
- **Item `readtable`** : les colonnes « rectangle » et « point milieu » du tableau de `n-quad-order`, avec la question (f) : « Que devient l'ordre si J(g) = 2g(−1) ? » (1, puisque le rapport ≈ 2).
- **Corrigé type** : les lignes (a) à (f) ci-dessus, avec les sous-buts `change-var`, `define`, `taylor`, `exactness`, `bound` et `variant`.
- **Aides** :
  1. « Développe f autour du milieu cᵢ : le terme de degré 1 est intégré exactement par J. Il ne reste que le reste. »
  2. « ∫₋₁¹ (h²t²/8)dt = h²/8·▢ »
  3. « (h/2)·N·(h²/12)·max|f″| = (b − a)h²/24·max|f″|. »
- **Variantes d'examen** : `open` (barème dans « Exemples de type examen ») ; `tf` sur la formule (a) (2020, question 16).
- **Pièges** : `n_map_jacobian`, `n_proof_sum_count`, `n_proof_constant_depends_h`.
- **Sous-buts → crédit** : `change-var` → `n-quad-exactness` ; `taylor` → `a1-dl-usual` ; `exactness` → `n-quad-exactness` ; `bound`, `variant` → `n-quad-proof`.

### `n-error-statements` — Lire une estimation d'erreur : quantificateurs, constante, régularité
- **Année** 16 · **Prérequis** `n-quad-order`, `g9-negate` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `n-quad-order` : énoncés d'erreur des formules composites.
- **Statut** : fait le 10 novembre 2026 (étape U9). Énoncés engendrés (point milieu, trapèze, Simpson, Gauss 2 points ; ordre des quantificateurs ; f ∈ Cᵖ⁻¹, Cᵖ, Cᵖ⁺¹ ; hᵖ ou hᵖ⁺¹ ; avec ou sans max|f⁽ᵖ⁾|) ; vrai si q = p, k ≥ p et (∀f ∃C, ou le facteur max|f⁽ᵖ⁾|). Les différences finies ne sont pas dans les énoncés (seulement des formules de quadrature). Contre-exemples `num` : `errScaling` (famille λxᵖ) et `notOrder` (f = xᵖ pour la puissance hᵖ⁺¹) ; un énoncé faux seulement par manque de régularité est un QCM Vrai/Faux. L1 : deux énoncés à comparer ; L2 : V/F avec contre-exemple guidé ; L3 : la raison (`g9_quant_order`, `n_regularity_ignored`, `n_more_regularity_more_order`) ; L4 : l'énoncé en jetons (juge `logic`, leurres hᵖ⁺¹ et Cᵖ⁻¹) ; L5 : le tableau de Simpson sur √x et eˣ, ou 4 à 5 énoncés, à plusieurs réponses.
- **Intro** : il faut savoir lire trois énoncés :
  - « ∀f ∈ C⁴, ∃C > 0, ∀h : |E| ≤ Ch⁴ » est **vrai** : C peut dépendre de f ;
  - « ∃C > 0, ∀f ∈ C⁴, ∀h : |E| ≤ Ch⁴ » est **faux** : on remplace f par λf avec λ grand ;
  - « ∃C > 0, ∀f ∈ C⁴, ∀h : |E| ≤ Ch⁴·max|f⁽⁴⁾| » est **vrai** : la constante universelle multiplie max|f⁽⁴⁾|.

  Avec moins de régularité, l'ordre peut baisser. Exemple : Simpson sur √x, qui n'est pas C¹ en 0.
  - `E(λf) = λE(f)` (note : « aucune constante fixe ne marche pour tous les f »)
  - `√x : rapport ≈ 2,83 = 2^1,5` (note : « ordre 1,5 seulement »)
- **Juge** :
  - `tf`, avec un contre-exemple `example` `{kind:'function-family'}`. Il est accepté s'il casse toute constante fixée, par exemple f_λ = λx⁴ ;
  - `tokens` (juge `logic`) pour reconstruire l'énoncé juste avec ∀, ∃ et les morceaux ;
  - `readtable`.
  - **Forme finale** : vrai ou faux, justifié.
- **Niveaux** :
  - L1 : deux énoncés à comparer, la différence surlignée.
  - L2 : vrai ou faux sur un énoncé, avec un contre-exemple guidé (« prends λ·x⁴ »).
  - L3 : choisir la raison (« C dépend de f », « régularité insuffisante », « mauvais ordre »).
  - L4 : construire l'énoncé juste avec les jetons.
  - L5 : un QCM à plusieurs réponses au format d'examen (4 à 8 énoncés), sans aide.
- **Générateur** : on combine trois choix.
  - la méthode : point milieu, trapèze, Simpson, Gauss 2 points, une différence finie d'ordre 2 ou 4 (2021, question 10) ;
  - l'ordre p ;
  - la forme de l'énoncé : quantificateurs dans l'un des deux ordres ; « Ch^p » ou « Ch^p·max|f⁽ᵖ⁾| » ; f ∈ Cᵖ, C^(p+1) ou C^(p−1) ; h^p ou h^(p+1) ; h ≤ 1 ou h < 1.

  La vérité de chaque énoncé est calculée par des règles :
  1. il faut f ∈ Cᵏ avec k ≥ p ;
  2. ∃C avant ∀f n'est juste qu'avec le facteur max|f⁽ᵖ⁾| ;
  3. h^(p+1) est faux.
- **Item `readtable`** : Simpson sur [0 ; 1].

  | n | E(√x) | E(eˣ) |
  |---|---|---|
  | 4 | 3.587e-03 | 2.326e-06 |
  | 8 | 1.268e-03 | 1.456e-07 |
  | 16 | 4.485e-04 | 9.103e-09 |
  | 32 | 1.586e-04 | 5.690e-10 |
  | 64 | 5.606e-05 | 3.556e-11 |

  Question (`mcq multi`) : vrai = « pour eˣ, ordre 4 (rapport 16) », « pour √x, ordre ≈ 1,5 car √x ∉ C⁴[0 ; 1] ». Faux = « Simpson est d'ordre 4 pour toute f continue » (`n_regularity_ignored`).
- **Corrigé type** : l'énoncé « ∃C > 0, ∀f ∈ C⁴[0 ; 1], ∀h ∈ ]0 ; 1] : |∫f − L_h(f)| ≤ Ch⁴ » (2020, question 17).
  1. `Supposons C fixé.` — sous-but `negate` → `g9-negate`.
  2. `f_λ = λx⁴ : E(f_λ) = λ·E(x⁴), avec E(x⁴) ≠ 0` — sous-but `counter`.
  3. `pour h fixé, λ > C·h⁴/|E_h(x⁴)| ⇒ |E_h(f_λ)| > Ch⁴` — sous-but `counter`.
  4. `faux` — sous-but `verdict`.
- **Aides** :
  1. « Qui choisit en premier ? Si C est choisi avant f, il doit marcher pour **toutes** les f. »
  2. « Multiplie f par λ : l'erreur est multipliée par ▢. »
  3. « E(λx⁴) = λE(x⁴) : aucune constante fixe ne suffit. L'énoncé est faux. »
- **Variantes d'examen** :
  - `mcq multi` :
    - 2022, question 12 : « ∀f ∈ C⁴[0 ; 1], ∃C > 0 : … ≤ Ch⁴ » vrai ; « ∃C > 0, ∀f ∈ C⁴ … ≤ Ch⁴ » faux ; « ∀f ∈ C⁵, ∃C … ≤ Ch⁵ » faux ; « ∃C, ∀f ∈ C⁵ … ≤ Ch⁵ » faux ;
    - 2021, question 10 : la formule à 5 points pour u′(0), avec ∃C/∀u et Ch⁴ ou Ch⁴·max|u⁽⁵⁾|.
  - `tf` : chacun de ces énoncés seul.
- **Pièges** : `g9_quant_order`, `n_regularity_ignored`, `n_more_regularity_more_order`.
- **Sous-buts → crédit** : `negate` → `g9-negate` ; `counter`, `verdict` → `n-error-statements`.

### `n-richardson` — Extrapolation de Richardson, estimation a posteriori
- **Année** 16 · **Prérequis** `n-quad-order` · **Étiquettes** `GM` · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `n-quad-order` : l'ordre p sert à extrapoler.
- **Statut** : fait le 10 novembre 2026 (étape U9). f de degré 2 ou 3 sur [0 ; 1] ou [0 ; 2], point milieu ou trapèze (p = 2), n ∈ {1, 2} ; Q₂ₕ, Q_h, Q̃ et ε exacts (`value`, pièges `n_richardson_wrong_p` et `n_richardson_swap` sur la ligne de Q̃). L1 : Q₂ₕ et Q_h donnés ; L2 et L4 : tout à calculer ; L3 : décision sur p et sur la place de 2ᵖ ; L5 : le programme richardson (2 trous ; le prélude contient midpoint et trapeze), puis ses sorties pour eˣ (Q̃ d'ordre 4). La version adaptative n'est pas construite. QCM : la combinaison pour une méthode d'ordre 1, 2 ou 4.
- **Intro** : si Q_h = I + Chᵖ + O(h^q), alors Q̃_h = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) est d'ordre q > p. L'estimateur a posteriori est ε_h = |Q̃_h − Q_h| = |Q_h − Q₂ₕ|/(2ᵖ − 1). L'algorithme adaptatif divise h par 2 tant que ε_h > tol. Exemple : ∫₀¹ x² dx par le point milieu (p = 2).
  - `Q₂ₕ (n = 1) = f(1/2) = 1/4`
  - `Q_h (n = 2) = (1/2)(1/16 + 9/16) = 5/16`
  - `Q̃ = (4·5/16 − 1/4)/3 = 1/3` (note : « exact »)
  - `ε = |1/3 − 5/16| = 1/48` (note : « égale à la vraie erreur de Q_h »)
- **Juge** : `value` (exact) sur chaque ligne · **Forme finale** : Q̃ et ε.
- **Niveaux** :
  - L1 : la formule est donnée avec des trous.
  - L2 : Q_h et Q₂ₕ sont à calculer.
  - L3 : choisir p d'après la méthode.
  - L4 : l'exemple complet.
  - L5 : l'item `code`, en version adaptative.
- **Générateur** : f polynôme de degré ≤ 3 sur [0 ; 1] ou [0 ; 2] ; méthode point milieu ou trapèze (p = 2) ; n ∈ {1, 2}. Résultats rationnels.
- **Item `code`** (`PRELUDE_VEC` ; `midpoint` et `trapeze` de `n-quad-composite` sont dans le prélude de l'item) :
  ```python
  def richardson(Q, f, a, b, n, p):
      q_h = Q(f, a, b, 2 * n)
      q_2h = Q(f, a, b, n)
      q_ext = «(2 ** p * q_h - q_2h) / (2 ** p - 1)»
      return [q_ext, «abs(q_ext - q_h)»]
  ```

  | setup | expr | expect | tol |
  |---|---|---|---|
  | `def g(x): return x*x` | `richardson(midpoint, g, 0, 1, 1, 2)` | `[0.3333333333333333, 0.020833333333333315]` | 1e−9 |
  | | `richardson(trapeze, math.exp, 0, 1, 4, 2)` | `[1.7182841546998968, 0.0022344374644049925]` | 1e−9 |
- **Corrigé type** : les 4 lignes de l'intro, avec les sous-buts `q2h`, `qh`, `extrapolate` et `estimate`.
- **Aides** :
  1. « Combine Q_h et Q₂ₕ pour éliminer le terme en hᵖ. »
  2. « Q̃ = (2ᵖ·Q_h − ▢)/(2ᵖ − 1) »
  3. « (4·5/16 − 1/4)/3 = 1/3. »
- **Variantes d'examen** : `mcq` sur la formule (distracteurs de `n_richardson_swap` et `n_richardson_wrong_p`).
- **Pièges** : `n_richardson_wrong_p`, `n_richardson_swap`.
- **Sous-buts → crédit** : `q2h`, `qh` → `n-quad-composite` ; `extrapolate`, `estimate` → `n-richardson`.

### `n-lu` — Factorisation LU, pivot, coût, déterminant
- **Année** 16 · **Prérequis** `l-mat-lu`, `l-det-props` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U9). L1–L2 : élimination guidée (cases de la grille, juge `rowops`), L et U (`factor`), det A ; L2 ajoute une décision sur le signe de ℓ (`l_lu_sign`). L3 : pivot nul au 2e pas (ℓ₃₂ = 0 et lignes 2, 3 de LU échangées), menu `rowops`, décision « échanger / A singulière » (`n_lu_zero_pivot`), puis det A = −Π uᵢᵢ (`n_lu_det_permutation`). L4 : PB = LU en 4 × 4 (la matrice B de la série GM 8 une fois sur deux, sinon une matrice tirée), P, L, U (`factor` PLU), det. L5 : le programme `lu` (2 trous), puis un tableau des coûts (10 seconds membres, QCM à plusieurs réponses avec `n_cost_inverse`). `coef` : un ℓᵢⱼ ou un uᵢⱼ non nul ; `mcq` : A\b contre inv(A)*b, ou det A après un échange ; `tf` : pivot nul ⇒ singulière (contre-exemple `matOne` `notLUable`), 10 factorisations, coût O(n²).
- **Intro** : A = LU, avec L triangulaire inférieure à diagonale unité ; si un pivot s'annule, on permute des lignes : PA = LU. Les coûts sont les suivants :
  - la factorisation coûte environ 2n³/3 opérations ;
  - chaque descente ou remontée coûte environ n² ;
  - pour plusieurs seconds membres, on factorise une seule fois ;
  - on ne calcule jamais A⁻¹ pour résoudre Ax = b.

  On a det A = Π uᵢᵢ / det P, avec det P = ±1. Pour une matrice SDP, on utilise Cholesky (`m-cholesky`), deux fois moins chère. La sensibilité aux arrondis est mesurée par κ(A) (`m-cond`). Exemple (série GM 8) : A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]].
  - `ℓ₂₁ = 1/2, ℓ₃₁ = 3/2 → lignes (0, −1, 0) et (0, 0, −5)`
  - `ℓ₃₂ = 0/(−1) = 0`
  - `L = [[1, 0, 0], [1/2, 1, 0], [3/2, 0, 1]], U = [[2, 4, 8], [0, −1, 0], [0, 0, −5]]`
  - `det A = 2·(−1)·(−5) = 10`
- **Juge** : `factor` `{A, kind:'LU'}`, ou `'PLU'` si un pivot s'annule ; `rowops` pour les étapes ; `value` pour det ; `mcq` pour les coûts · **Forme finale** : L et U (ou P, L, U), ou le coefficient demandé (`askCoef`).
- **Niveaux** :
  - L1 : les multiplicateurs sont à trous ; U est construite ligne par ligne.
  - L2 : LU libre en 3 × 3.
  - L3 : face à un pivot nul, choisir entre « permuter » et « conclure que A est singulière » (piège).
  - L4 : PB = LU pour la matrice 4 × 4 de la série GM 8 (B = [[1, 1, 1, 1], [2, 2, 5, 3], [4, 6, 8, 0], [3, 3, 9, 8]], avec le 2e pivot nul), puis det B = −18.
  - L5 : l'item `code`, puis un QCM sur les coûts (« 10 systèmes avec la même A »).
- **Générateur** : on part de L et U entières.
  - ℓᵢⱼ ∈ {−2, …, 2} avec des demi-entiers permis ; uᵢᵢ ≠ 0 ; A = LU.
  - Gabarit pivot nul : on choisit P ≠ I, puis A = P⁻¹LU, avec un pivot nul à l'étape 2.
  - Contrainte : les coefficients de A sont dans [−20 ; 20].
- **Item `code`** (`PRELUDE_VEC`, `PRELUDE_MAT`) :
  ```python
  def lu(A):
      # sans pivot ; L unite, U triangulaire superieure
      n = len(A)
      L = eye(n)
      U = copy2(A)
      for k in range(n - 1):
          for i in range(k + 1, n):
              L[i][k] = «U[i][k] / U[k][k]»
              for j in range(k, n):
                  U[i][j] = «U[i][j] - L[i][k] * U[k][j]»
      return [L, U]
  ```
  Setup : `A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]]`.

  | expr | expect | tol |
  |---|---|---|
  | `lu(A)[0][2][0]` | `1.5` | |
  | `lu(A)[0][2][1]` | `0.0` | `atol` 1e−12 |
  | `lu(A)[1][1][1]` | `-1.0` | |
  | `lu(A)[1][2][2]` | `-5.0` | |
- **Corrigé type** :
  1. `L2 ← L2 − (1/2)L1 ; L3 ← L3 − (3/2)L1` — sous-but `elim` → `l-mat-lu`.
  2. `[[2, 4, 8], [0, −1, 0], [0, 0, −5]]` — sous-but `elim`.
  3. `ℓ₃₂ = 0`, donc U est obtenue — sous-but `factors`.
  4. `L = [[1, 0, 0], [1/2, 1, 0], [3/2, 0, 1]]` — sous-but `factors`.
  5. `det A = 2·(−1)·(−5) = 10` — sous-but `det`.
- **Aides** :
  1. « Les multiplicateurs de Gauss sont les coefficients de L, sous la diagonale. »
  2. « ℓ₃₁ = 3/▢ »
  3. « L = [[1, 0, 0], [1/2, 1, 0], [3/2, 0, 1]], U = [[2, 4, 8], [0, −1, 0], [0, 0, −5]]. »
- **Variantes d'examen** :
  - `coef` : « ℓ₃₁ de L » ; « u₃₃ de U ».
  - `tf` :
    - « Si un pivot s'annule pendant LU sans pivot, A est singulière » : faux. Contre-exemple : B, avec det B = −18.
    - « Résoudre Ax = b pour 10 seconds membres demande 10 factorisations » : faux.
    - « Le coût de LU est O(n²) » : faux, il est O(n³).
  - `mcq` : « Pourquoi A\b plutôt que inv(A)*b ? » (série GM 8).
- **Pièges** : `n_lu_zero_pivot`, `n_lu_det_permutation`, `n_cost_inverse`.
- **Sous-buts → crédit** : `elim`, `factors` → `l-mat-lu` ; `det` → `l-det-props`.

### `n-thomas` — LU tridiagonale (algorithme de Thomas), en O(N)
- **Année** 16 · **Prérequis** `n-lu` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 4
- **Pourquoi ces prérequis** : `n-lu` : A = LU sans pivot, dans le cas tridiagonal.
- **Statut** : fait le 10 novembre 2026 (étape U9). Le programme `thomas` du catalogue (7 trous), en place, avec les tests du catalogue. L1 : une ligne en QCM (les lignes d'examen 2019 et 2022, avec les options d'examen et les pièges) ; L2 : un trou à taper, ou (une fois sur deux) ℓ₂ et γ₂ à la main, guidés (N = 3 ou 4, dénominateurs ≤ 12) ; L3 : les 3 trous de la factorisation ou les 2 des substitutions ; L4 : les 7 trous ; L5 : les 7 trous, puis un tableau des coûts (8N contre 2N³/3) ; le programme de la chaleur complet est dans n-heat-implicit. Pièges de code : `n_thomas_index_shift` (d[i]*c[i], a[i−1], d[i−1]*b[i−1]), `n_thomas_lu_roles` (c ↔ d), `n_thomas_forget_last` (« 0 » dans la ligne de a[N−1]). `mcq` : une ligne du programme ; `tf` : coût O(N³), forme bidiagonale de L et U, b contient x à la fin.
- **Intro** : A est tridiagonale, avec la sous-diagonale d, la diagonale a et la sur-diagonale c. On écrit A = LU, avec L bidiagonale (diagonale ℓ, sous-diagonale d) et U bidiagonale à diagonale unité (sur-diagonale γ).
  - Factorisation : γ₁ = c₁/a₁, ℓᵢ = aᵢ − dᵢ₋₁γᵢ₋₁, γᵢ = cᵢ/ℓᵢ.
  - Descente Ly = b : y₁ = b₁/ℓ₁, yᵢ₊₁ = (bᵢ₊₁ − dᵢyᵢ)/ℓᵢ₊₁.
  - Remontée Ux = y : x_N = y_N, xᵢ = yᵢ − γᵢxᵢ₊₁.

  Le coût est d'environ 8N opérations. Les examens font tout **en place** : a devient ℓ, c devient γ, b devient y puis x. Exemple : A = tridiag(−1, 2, −1) de taille 3, b = (1 ; 0 ; 1).
  - `γ₁ = −1/2 ; ℓ₂ = 2 − (−1)(−1/2) = 3/2 ; γ₂ = −2/3 ; ℓ₃ = 2 − (−1)(−2/3) = 4/3`
  - `y = (1/2 ; 1/3 ; 1)`
  - `x₃ = 1 ; x₂ = 1/3 + 2/3 = 1 ; x₁ = 1/2 + 1/2 = 1`
- **Juge** : `lines` `value` (exact), une ligne par quantité, avec `followError` ; l'item `code` est le cœur de la compétence · **Forme finale** : x.
- **Niveaux** :
  - L1 : une ligne de code à trou en QCM, au format d'examen (options de 2019 et 2022). La matrice et l'ordre des boucles sont affichés.
  - L2 : un trou à taper. Variante à la main : ℓ₂ et γ₂ à trous.
  - L3 : les 3 trous de la factorisation, ou les 2 trous des substitutions.
  - L4 : les 7 trous de la fonction `thomas`.
  - L5 : le programme de la chaleur complet (voir `n-heat-implicit`), avec tous les trous, puis la lecture de la sortie.
- **Générateur** :
  - **Calcul à la main.** N ∈ {3, 4} ; diagonale entière dans [2 ; 5] ; sous- et sur-diagonales dans {−1, 1, 2} ; solution entière ; ℓᵢ ≠ 0 ; dénominateurs ≤ 12.
  - **Code.** Les tests sont fixes ; les distracteurs de QCM viennent de `n_thomas_index_shift`, `n_thomas_lu_roles` et `n_thomas_forget_last`, appliqués à la ligne visée.
  - **Variante d'examen « Cholesky tridiagonal »** (2020, 2021). On la reconnaît à `a(1)=sqrt(a(1))`, `c(i)=c(i)/a(i)` et `a(i+1)=sqrt(a(i+1)-c(i)*c(i))`. Elle renvoie à `m-cholesky` pour la règle et est jugée ici pour le code (voir `n-bvp-newton`).
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def thomas(a, c, d, b):
      # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
      # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
      N = len(a)
      c[0] = c[0] / «a[0]»
      for i in range(1, N - 1):
          a[i] = a[i] - «d[i - 1] * c[i - 1]»
          c[i] = c[i] / «a[i]»
      a[N - 1] = a[N - 1] - «d[N - 2] * c[N - 2]»
      # L y = b
      b[0] = b[0] / «a[0]»
      for i in range(N - 1):
          b[i + 1] = (b[i + 1] - «d[i] * b[i]») / a[i + 1]
      # U x = y
      for i in range(N - 2, -1, -1):
          b[i] = b[i] - «c[i] * b[i + 1]»
      return b
  ```

  | expr | expect | tol |
  |---|---|---|
  | `thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1])` | `[1, 1, 1]` | 1e−12 |
  | `thomas([3, 3], [-1], [-1], [2, 2])` | `[1, 1]` | 1e−12 |
  | `thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19])` | `[1, 2, 3, 4]` | 1e−12 |

  Le 3e test n'est pas symétrique : il rejette l'échange de c et d.

  QCM au format d'examen (traduction de `exam1.m`, 2019 et 2022). Ligne `a[i] = a[i] - ???` : `d[i-1]*c[i-1]` (juste), `b[i-1]*c[i-1]`, `b[i-1]*d[i-1]`. Ligne `b[i+1] = (b[i+1] - ???)/a[i+1]` : `d[i]*b[i]` (juste), `c[i]*b[i]`, `d[i]*c[i]`. Ligne `b[i] = b[i] - ???` : `c[i]*b[i+1]` (juste), `d[i]*b[i+1]`, `c[i]*d[i]`.
- **Corrigé type** : les 3 lignes de l'intro, avec les sous-buts `factor`, `forward` et `backward`.
- **Aides** :
  1. « Fais Gauss sur une tridiagonale : chaque ligne n'élimine qu'un coefficient, celui de la ligne d'au-dessus. »
  2. « ℓᵢ = aᵢ − dᵢ₋₁·▢ »
  3. « ℓ₂ = 2 − (−1)(−1/2) = 3/2. »
- **Variantes d'examen** : `mcq` (6 à 7 questions par examen en 2019 et 2022, une par ligne) ; `tf` : « Résoudre un système tridiagonal N × N par LU coûte O(N³) » : faux, c'est O(N).
- **Pièges** : `n_thomas_index_shift`, `n_thomas_lu_roles`, `n_thomas_forget_last`.
- **Sous-buts → crédit** : `factor`, `forward`, `backward` → `n-thomas`.

### `n-iter-jacobi-gs` — Jacobi et Gauss-Seidel
- **Année** 16 · **Prérequis** `l-sys-augmented` · **Étiquettes** `GM` · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `l-sys-augmented` : le système Ax = b est mis à jour ligne par ligne.
- **Statut** : fait le 10 novembre 2026 (étape U9). Tableaux `iter` (phi `jacobi` / `gs`, résidu ‖b − Ax‖∞ calculé par l'app), A 3 × 3 à diagonale dans {2, 4, 5, 8}, solution entière, dénominateurs ≤ 512 ; un quart des matrices ne sont pas strictement dominantes (Jacobi converge quand même). L1 : x₁⁽¹⁾ donné ; L2 : une itération ; L3 : x⁽²⁾ composante par composante, avec le menu « anciennes / nouvelles valeurs » ; L4 : deux itérations de chaque méthode, puis un QCM sur le critère (`n_diag_dominance` quand une ligne a l'égalité) ; L5 : `jacobi_step` et `gs_step` (3 trous), puis un tableau d'erreurs (GS ≈ deux fois plus vite). Le gabarit à paramètres (α, β, γ) n'est pas construit. `tf` : Jacobi converge mais pas GS (contre-exemple [[1, 2, −2], [1, 1, 1], [2, 2, 1]], `num` `jacobiNotGs`), diagonale dominante, valeurs nouvelles (`n_jacobi_uses_new`).
- **Intro** : les deux méthodes mettent à jour une composante à la fois.
  - Jacobi : xᵢ⁽ᵏ⁺¹⁾ = (bᵢ − Σ_{j≠i} aᵢⱼxⱼ⁽ᵏ⁾)/aᵢᵢ, c'est-à-dire P = D.
  - Gauss-Seidel : on utilise les composantes **déjà mises à jour** de l'itération courante, c'est-à-dire P = triangle inférieur de A.
  - Les deux convergent si A est à diagonale strictement dominante (par lignes) ; Gauss-Seidel converge aussi si A est SDP.

  Exemple : A = tridiag(−1, 4, −1) de taille 3, b = (3 ; 2 ; 3), x⁽⁰⁾ = 0, de solution (1 ; 1 ; 1).
  - `Jacobi : x⁽¹⁾ = (3/4 ; 1/2 ; 3/4), x⁽²⁾ = (7/8 ; 7/8 ; 7/8)`
  - `Gauss-Seidel : x⁽¹⁾ = (3/4 ; 11/16 ; 59/64)`
- **Juge** : `table` `iter` `{phi:{kind:'jacobi'|'gs', A, b}, cols:['x1','x2','x3','res'], tol:1e-9}` · **Forme finale** : 2 itérations, puis une décision de convergence justifiée.
- **Niveaux** :
  - L1 : la 1re composante est donnée, les autres sont à trous.
  - L2 : une itération complète.
  - L3 : choisir, pour chaque composante, quelles valeurs utiliser (anciennes ou nouvelles).
  - L4 : 2 itérations des deux méthodes, puis le critère de convergence.
  - L5 : matrice avec paramètres (série GM 10 : [[α, 0, 1], [0, β, 1], [1, 0, γ]], à quelles conditions Jacobi converge-t-il ?), ou l'item `code`.
- **Générateur** : on part de la solution entière.
  - A tridiagonale ou pleine 3 × 3, à diagonale dominante, avec une diagonale dans {2, 4, 5, 8} et les autres coefficients dans {−1, 0, 1} ; b = A·x*.
  - Contrainte : 2 itérations avec un dénominateur ≤ 512.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def jacobi_step(A, b, x):
      n = len(A)
      y = zeros(n)
      for i in range(n):
          s = b[i]
          for j in range(n):
              if j != i:
                  s = «s - A[i][j] * x[j]»
          y[i] = «s / A[i][i]»
      return y

  def gs_step(A, b, x):
      n = len(A)
      for i in range(n):
          s = b[i]
          for j in range(n):
              if j != i:
                  s = s - A[i][j] * x[j]
          x[i] = «s / A[i][i]»   # en place : les x[j], j < i, sont deja nouveaux
      return x
  ```
  Setup : `A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]]` et `b = [3, 2, 3]`.

  | expr | expect |
  |---|---|
  | `jacobi_step(A, b, [0.0, 0.0, 0.0])` | `[0.75, 0.5, 0.75]` |
  | `jacobi_step(A, b, [0.75, 0.5, 0.75])` | `[0.875, 0.875, 0.875]` |
  | `gs_step(A, b, [0.0, 0.0, 0.0])` | `[0.75, 0.6875, 0.921875]` |
- **Corrigé type** :
  1. `Jacobi : x₁ = (3 + 0)/4 = 3/4 ; x₂ = (2 + 0 + 0)/4 = 1/2 ; x₃ = 3/4` — sous-but `jacobi`.
  2. `x⁽²⁾ : x₁ = (3 + 1/2)/4 = 7/8 ; x₂ = (2 + 3/4 + 3/4)/4 = 7/8 ; x₃ = 7/8` — sous-but `jacobi`.
  3. `GS : x₁ = 3/4 ; x₂ = (2 + 3/4)/4 = 11/16 ; x₃ = (3 + 11/16)/4 = 59/64` — sous-but `gs`.
  4. `|4| > |−1| + |−1| : diagonale strictement dominante, donc convergence` — sous-but `criterion`.
- **Aides** :
  1. « Ligne i : isole xᵢ ; les autres xⱼ viennent de l'itération précédente (Jacobi) ou de la plus récente (GS). »
  2. « GS : x₂ = (2 + 1·▢ + 1·0)/4 »
  3. « x₂ = (2 + 3/4)/4 = 11/16. »
- **Variantes d'examen** : `tf` : « Si Jacobi converge, Gauss-Seidel converge aussi » : faux. Contre-exemple : A = [[1, 2, −2], [1, 1, 1], [2, 2, 1]], pour laquelle ρ(B_J) = 0 et ρ(B_GS) = 2.
- **Pièges** : `n_jacobi_uses_new`, `n_diag_dominance`.
- **Sous-buts → crédit** : `jacobi`, `gs`, `criterion` → `n-iter-jacobi-gs`.

### `n-iter-convergence` — Convergence des méthodes itératives, critère d'arrêt
- **Année** 16 · **Prérequis** `n-iter-jacobi-gs`, `l-eig-charpoly`, `m-cond` · **Étiquettes** `GM` · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `n-iter-jacobi-gs` : matrices d'itération de Jacobi et Gauss-Seidel ; `l-eig-charpoly` : rayon spectral ρ(B) ; `m-cond` : κ(A) dans le critère d'arrêt sur le résidu.
- **Statut** : fait le 10 novembre 2026 (étape U9). A = [[a, b], [b, d]] avec ρ(B_J) = |b|/√(ad) rationnel. L1–L2 : B_J guidée (`mat`, cases), puis ρ (`value`) ; L3 : critère (décision : ρ < 1, ‖B‖ < 1 en `poor`, det A), ρ_J, ρ_GS = ρ_J², κ₂(A) = λ_max/λ_min (valeurs propres rationnelles) ; L4 : ρ_J, ρ_GS et le nombre d'itérations k ≥ −6/log₁₀ ρ (log₁₀ ρ donné) ; L5 : `jacobi_solve` (2 trous, `jacobi_step` dans le prélude), puis le tableau des itérations de la série GM 10, recalculé (b = A·(1, …, 1), arrêt sur ‖r‖₂/‖b‖₂ ≤ 10⁻¹⁰ : identique au catalogue), QCM à plusieurs réponses. `tf` : ‖B‖ ≥ 1 ⇒ divergence (contre-exemple [[1/2, 4], [0, 1/2]], `num` `normNotRadius`), petit résidu (`n_residual_is_error`), ρ(B) < 1 ⇔ convergence.
- **Intro** : la méthode de Richardson stationnaire s'écrit P(x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾) = r⁽ᵏ⁾, avec la matrice d'itération B = I − P⁻¹A.
  - Elle converge pour tout x⁽⁰⁾ ⇔ ρ(B) < 1, et ‖e⁽ᵏ⁾‖ ≤ ‖B‖ᵏ·‖e⁽⁰⁾‖.
  - Arrêt sur le résidu : ‖r⁽ᵏ⁾‖/‖b‖ ≤ tol ⇒ ‖e⁽ᵏ⁾‖/‖x‖ ≤ κ(A)·tol.
  - La méthode de la puissance estime ρ (`m-power-method`).

  Exemple : A = [[2, −1], [−1, 2]].
  - `B_J = I − D⁻¹A = [[0, 1/2], [1/2, 0]], ρ = 1/2`
  - `B_GS : ρ = 1/4 = ρ_J²`
  - `κ₂(A) = 3/1 = 3`
- **Juge** : `matrix` `equiv` pour B ; `value` pour ρ (valeurs propres exactes) ; `readtable` · **Forme finale** : ρ, et la décision.
- **Niveaux** :
  - L1 : B_J est à trous.
  - L2 : B_J, puis ses valeurs propres.
  - L3 : choisir le critère (ρ(B) < 1, ‖B‖ < 1, diagonale dominante) et dire ce que chacun garantit.
  - L4 : ρ_J et ρ_GS en 2 × 2, puis le nombre d'itérations pour gagner un facteur 10⁻⁶.
  - L5 : `readtable`, puis l'item `code`.
- **Générateur** : A 2 × 2 symétrique à diagonale > 0, avec ρ(B_J) rationnel (aᵢⱼ² / (a₁₁a₂₂) carré parfait). Nombre d'itérations : k ≥ log(10⁻⁶)/log ρ, avec une table de log₁₀ fournie.
- **Item `readtable`** (série GM 10) : itérations pour ‖r‖₂/‖b‖₂ ≤ 10⁻¹⁰, avec x⁽⁰⁾ = 0 et b = A·(1, …, 1) (précisé à l'étape U9 : avec ce b, le tableau est reproduit exactement).

  | n | Jacobi, tridiag(−1, 2,5, −1) | GS, idem | Jacobi, tridiag(−1, 2, −1) | GS, idem |
  |---|---|---|---|---|
  | 4 | 53 | 27 | 106 | 54 |
  | 8 | 80 | 41 | 347 | 175 |
  | 16 | 95 | 50 | 1200 | 602 |
  | 32 | 100 | 55 | 4323 | 2163 |

  Question (`mcq multi`) : vrai = « GS demande environ deux fois moins d'itérations que Jacobi », « pour tridiag(−1, 2, −1), le nombre d'itérations croît comme n², puisque ρ_J = cos(π/(n + 1)) → 1 », « pour 2,5, ρ_J → 0,8 et le nombre se stabilise ».
- **Item `code`** (`PRELUDE_VEC`, `PRELUDE_MAT`, `jacobi_step` dans le prélude de l'item) :
  ```python
  def jacobi_solve(A, b, x0, tol, nmax):
      x = x0
      r = zeros(len(b))
      Ax = matvec(A, x)
      for i in range(len(b)):
          r[i] = b[i] - Ax[i]
      k = 0
      while «norm(r) > tol * norm(b)» and k < nmax:
          x = jacobi_step(A, b, x)
          Ax = matvec(A, x)
          for i in range(len(b)):
              r[i] = «b[i] - Ax[i]»
          k = k + 1
      return [x, k]
  ```

  | setup | expr | expect |
  |---|---|---|
  | `A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]]` | `jacobi_solve(A, [3, 2, 3], [0.0, 0.0, 0.0], 1e-6, 1000)[1]` | `14` |
- **Corrigé type** :
  1. `D⁻¹A = [[1, −1/2], [−1/2, 1]]` — sous-but `B`.
  2. `B_J = [[0, 1/2], [1/2, 0]]` — sous-but `B`.
  3. `λ = ±1/2, ρ = 1/2 < 1 : converge` — sous-but `rho` → `l-eig-charpoly`.
  4. `κ₂ = λmax/λmin = 3`, donc ‖e‖/‖x‖ ≤ 3·tol — sous-but `stop` → `m-cond`.
- **Aides** :
  1. « L'erreur est multipliée par B à chaque pas : regarde la plus grande valeur propre en module. »
  2. « B_J = I − D⁻¹A, avec D = diag(▢, ▢) »
  3. « B_J = [[0, 1/2], [1/2, 0]], ρ = 1/2 < 1. »
- **Variantes d'examen** :
  - `tf` :
    - « Un petit résidu garantit une petite erreur » : faux si κ(A) est grand. Contre-exemple : la matrice de Vandermonde de la série GM 9.
    - « ‖B‖ ≥ 1 implique la divergence » : faux. Contre-exemple : B = [[1/2, 4], [0, 1/2]], avec ρ = 1/2 et ‖B‖ > 1.
- **Pièges** : `n_residual_is_error`, `n_norm_vs_radius`.
- **Sous-buts → crédit** : `B`, `rho`, `stop` → `n-iter-convergence`.

### `n-gradient-spd` — Méthode du gradient, à pas fixe ou optimal, pour A SDP
- **Année** 16 · **Prérequis** `m-posdef`, `m-quad-gradient` · **Étiquettes** `GM`, `MT` · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `m-posdef` : A symétrique définie positive ; `m-quad-gradient` : ∇Φ(v) = Av − b.
- **Statut** : fait le 10 novembre 2026 (étape U9). Tableaux `iter` (phi `gradient` : r, α, x jugés à partir des cases de l'élève), A dans la liste du catalogue sauf QDQᵀ, b entier, r⁽⁰⁾ jamais vecteur propre, dénominateurs ≤ 64. L1 : r⁽⁰⁾ et Ar⁽⁰⁾ donnés ; L2 : une itération ; L3 : décisions « pas optimal » (`n_optimal_step_inverted`) et « sens » (`n_gradient_sign`) avec menus ; L4 : deux itérations, puis l'intervalle du pas fixe (`n_gradient_step_bound`) ; L5 : `gradient` et `gradient_fixed` (4 trous, tests du catalogue), puis un tableau d'erreurs du pas fixe (α = 0,5 ; 0,6 ; 0,65 ; 0,7). `open` : la preuve de 2021 en problème de 7 points (∇f = 0 en QCM, l'équation de l'erreur et l'argument des vecteurs propres en blocs avec leurres, α_max) ; `mcq` : intervalle du pas fixe ; `tf` : n itérations (contre-exemple A, b, `num` `gradientNotFinite`), tout α > 0, pas optimal.
- **Intro** : si A est SDP, Ax = b ⇔ x minimise Φ(v) = ½vᵀAv − bᵀv, et ∇Φ(v) = Av − b = −r. L'itération est x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + αₖr⁽ᵏ⁾.
  - Pas optimal : αₖ = (r·r)/(r·Ar).
  - Pas fixe α : x − x⁽ᵏ⁺¹⁾ = (I − αA)(x − x⁽ᵏ⁾). La méthode converge ⇔ 0 < α < 2/λ_max, avec le facteur max|1 − αλᵢ|.

  Exemple : A = [[2, −1], [−1, 2]], b = (1 ; 0), x⁽⁰⁾ = 0, de solution (2/3 ; 1/3).
  - `r⁽⁰⁾ = (1 ; 0) ; Ar⁽⁰⁾ = (2 ; −1) ; α₀ = 1/2 ; x⁽¹⁾ = (1/2 ; 0)`
  - `r⁽¹⁾ = (0 ; 1/2) ; α₁ = (1/4)/(1/2) = 1/2 ; x⁽²⁾ = (1/2 ; 1/4)`
  - `λ = 1 et 3 : le pas fixe converge ⇔ 0 < α < 2/3`
- **Juge** : `table` `iter` `{phi:{kind:'gradient', A, b, step:'optimal'|α}, cols:['x1','x2','r1','r2','alpha'], tol:1e-9}` ; `solset` `{v:'α'}` pour l'intervalle ; preuve (L5) : `problem` avec `blocks` · **Forme finale** : 2 itérations ; l'intervalle ]0 ; 2/λ_max[.
- **Niveaux** :
  - L1 : r⁽⁰⁾ et Ar⁽⁰⁾ donnés ; α₀ et x⁽¹⁾ à trous.
  - L2 : une itération libre.
  - L3 : choisir le pas (optimal ou fixe), puis le signe (x + αr ou x − αr).
  - L4 : 2 itérations, puis l'intervalle de convergence du pas fixe.
  - L5 : la preuve d'examen (2021, question ouverte 2, 7 points) :
    - (a) ∇f(x) = 0 au minimum ;
    - (b) x − x⁽ᵏ⁺¹⁾ = (I − αA)(x − x⁽ᵏ⁾) ;
    - (c) décomposition sur une base orthonormée de vecteurs propres, ‖x − x⁽ᵏ⁺¹⁾‖ ≤ max|1 − αλᵢ|·‖x − x⁽ᵏ⁾‖, donc convergence si α < 2/λ_n.
- **Générateur** : A ∈ {[[2, −1], [−1, 2]] (λ = 1, 3), [[3, 1], [1, 3]] (2, 4), [[5, 2], [2, 2]] (1, 6), [[2, 0], [0, 4]]}, ou A = QDQᵀ avec Q de Pythagore (3/5, 4/5) et D à entrées entières. b entier, x⁽⁰⁾ = 0. Contrainte : 2 pas optimaux de dénominateur ≤ 64 ; on rejette r⁽⁰⁾ vecteur propre (convergence en 1 pas), sauf pour le gabarit qui montre ce cas.
- **Item `code`** (`PRELUDE_VEC`, `PRELUDE_MAT`) :
  ```python
  def gradient(A, b, x0, tol, nmax):
      x = x0
      for k in range(nmax):
          Ax = matvec(A, x)
          r = zeros(len(b))
          for i in range(len(b)):
              r[i] = «b[i] - Ax[i]»
          if norm(r) <= tol * norm(b):
              return [x, k]
          Ar = matvec(A, r)
          alpha = «dot(r, r) / dot(r, Ar)»
          for i in range(len(b)):
              x[i] = «x[i] + alpha * r[i]»
      return [x, nmax]

  def gradient_fixed(A, b, x0, alpha, nsteps):
      x = x0
      for k in range(nsteps):
          Ax = matvec(A, x)
          for i in range(len(b)):
              x[i] = «x[i] - alpha * (Ax[i] - b[i])»
      return x
  ```
  Setup : `A = [[2, -1], [-1, 2]]`.

  | expr | expect | tol |
  |---|---|---|
  | `gradient(A, [1.0, 0.0], [0.0, 0.0], 1e-10, 1000)[0]` | `[0.6666666667, 0.3333333333]` | 1e−8 |
  | `gradient(A, [1.0, 0.0], [0.0, 0.0], 0.0, 2)[0]` | `[0.5, 0.25]` | 1e−12 |
  | `gradient_fixed(A, [1.0, 0.0], [0.0, 0.0], 0.5, 2)` | `[0.5, 0.25]` | 1e−12 |
  | `abs(gradient_fixed(A, [1.0, 0.0], [0.0, 0.0], 0.7, 60)[0]) > 10` | `True` | |

  Le dernier test vérifie que α = 0,7 > 2/3 diverge.
- **Corrigé type** :
  1. `r⁽⁰⁾ = b − Ax⁽⁰⁾ = (1 ; 0)` — sous-but `residual`.
  2. `α₀ = 1/(1·2 + 0·(−1)) = 1/2` — sous-but `step`.
  3. `x⁽¹⁾ = (1/2 ; 0)` — sous-but `update`.
  4. `r⁽¹⁾ = (1 ; 0) − (1 ; −1/2) = (0 ; 1/2) ; α₁ = 1/2 ; x⁽²⁾ = (1/2 ; 1/4)` — sous-buts `residual`, `step`, `update`.
  5. `|1 − α| < 1 et |1 − 3α| < 1 ⇔ 0 < α < 2/3` — sous-but `fixed-step`.
- **Aides** :
  1. « Le résidu r = b − Ax est la direction de plus grande descente de Φ. »
  2. « α₀ = (r·r)/(r·▢) »
  3. « α₀ = 1/2, x⁽¹⁾ = (1/2 ; 0). »
- **Variantes d'examen** :
  - `open` : la preuve de 7 points.
  - `mcq` : « Le pas fixe converge si… » ; les distracteurs α < 2/λ_min et α < 1/λ_max viennent de `n_gradient_step_bound`.
  - `tf` : « Avec le pas optimal, la méthode converge en au plus n itérations » : faux, c'est le gradient conjugué qui le fait.
- **Pièges** : `n_gradient_step_bound`, `n_gradient_sign`, `n_optimal_step_inverted`.
- **Sous-buts → crédit** : `residual`, `step`, `update`, `fixed-step` → `n-gradient-spd`.

### `n-ode-euler` — Euler progressif et rétrograde
- **Année** 16 · **Prérequis** `a2-ode-cauchy`, `a2-ode-linear1` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a2-ode-cauchy` : problème de Cauchy u′ = f(t, u), u(0) = u₀ ; `a2-ode-linear1` : solution exacte de u′ = λu + g pour comparer.
- **Statut** : fait le 10 novembre 2026 (étape U9). u′ = λu + g(t), λ ∈ {−1, −2, −5, −10}, g ∈ {0, 1, t}, h ∈ {1/10, 1/20, 1/5}, |hλ| < 1, valeurs exactes (dénominateurs ≤ 1000), sans l'équilibre trivial. L1 : u₁ par EP, puis l'équation de ER, guidées ; L2 : tableau `iter` `ode` EP (deux pas) ; L3 : décision « où évaluer f » (pièges `n_implicit_as_explicit`, `n_euler_time_index`), puis u₁ ; L4 : tableau ER, puis u₂ par EP ; L5 : le code (`euler`, `euler_implicit_linear` ; un test ajouté avec f = t), puis le `readtable` de la série GM 13 (QCM à plusieurs réponses). QCM : u₁ par ER, ou l'équation résolue à chaque pas (2019, Q4) ; V/F : « ER est explicite », ou « EP décroît pour tout h » (contre-exemple λ, h, `num` `epNotDecreasing`). La variante non linéaire (Newton en L5) est dans n-ode-implicit-newton.
- **Intro** : t_n = nh.
  - Euler progressif (explicite) : u_{n+1} = u_n + h·f(t_n, u_n).
  - Euler rétrograde (implicite) : u_{n+1} = u_n + h·f(t_{n+1}, u_{n+1}). Il faut résoudre une équation en u_{n+1} à chaque pas.
  - Les deux sont d'ordre 1.

  Exemple : u′ = −2u, u(0) = 1, h = 0,1.
  - `progressif : u₁ = 1 + 0,1·(−2) = 0,8 ; u₂ = 0,64`
  - `rétrograde : u₁ = 1 + 0,1·(−2u₁) ⇒ u₁ = 1/1,2 = 5/6 ≈ 0,833`
  - `exact : e^(−0,2) ≈ 0,819`
- **Juge** : `table` `iter` `{phi:{kind:'ode', scheme:'EP'|'ER', f}, cols:['t','u'], tol:1e-9}`. Pour ER avec f linéaire en u, la valeur est exacte. Pour f non linéaire, une ligne `lines` `equiv` donne l'équation F(u_{n+1}) = 0. · **Forme finale** : les valeurs demandées.
- **Niveaux** :
  - L1 : le schéma est écrit avec des trous ; u₁ guidé.
  - L2 : l'élève écrit le schéma, puis calcule u₁ et u₂.
  - L3 : choisir t_n ou t_{n+1}, u_n ou u_{n+1} dans f.
  - L4 : les deux schémas sur 2 pas, puis la comparaison avec l'exact.
  - L5 : ER sur une EDO non linéaire. On identifie F(v) = v − u_n + h·e^(t_{n+1})·v² et on écrit le schéma de Newton (série GM 12). Ou l'item `code`, puis le `readtable`.
- **Générateur** : f(t, u) = λu + g(t), avec λ ∈ {−1, −2, −5, −10}, g ∈ {0, 1, t, cos t}, h ∈ {0,1 ; 0,05 ; 0,2}. Les deux pas sont exacts en décimal ou en fraction de dénominateur ≤ 1000. Variante non linéaire : u′ = −u², u′ = u(1 − u) ; ER donne une équation du 2e degré.
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def euler(f, t0, u0, T, N):
      h = (T - t0) / N
      t = t0
      u = u0
      for n in range(N):
          u = «u + h * f(t, u)»
          t = «t + h»
      return u

  def euler_implicit_linear(lam, g, t0, u0, T, N):
      # u' = lam * u + g(t) : le schema retrograde se resout a la main
      h = (T - t0) / N
      t = t0
      u = u0
      for n in range(N):
          t = t + h
          u = «(u + h * g(t)) / (1 - h * lam)»
      return u
  ```

  | setup | expr | expect | tol |
  |---|---|---|---|
  | `def f(t, u): return -2*u` | `euler(f, 0, 1.0, 0.2, 2)` | `0.64` | 1e−12 |
  | `def g(t): return 0.0` | `euler_implicit_linear(-2, g, 0, 1.0, 0.1, 1)` | `0.8333333333333334` | 1e−12 |
  | `def f(t, u): return 2/15*u*(1 - u/1000)` | `euler(f, 0, 100.0, 100, 20)` | `999.9999441414363` | 1e−9 |
  | `def g(t): return 50*math.cos(t)` | `euler_implicit_linear(-50, g, 0, 0.0, 1, 20)` | `0.5566157093851379` | 1e−9 |

  Le 3e test est le modèle logistique de la série GM 12. Le 4e est le problème raide de `n-ode-stability`.
- **Item `readtable`** (série GM 13) : u′ = √u/(1 + t²) sur [0 ; 20], de solution exacte (1 + ½·arctan t)², avec E = max|u(t_n) − u_n|.

  | N | Euler progressif | Euler rétrograde |
  |---|---|---|
  | 50 | 2.239e-01 | 2.541e-01 |
  | 100 | 1.151e-01 | 1.226e-01 |
  | 200 | 5.842e-02 | 6.028e-02 |
  | 400 | 2.943e-02 | 2.990e-02 |

  Question : l'ordre ? (1 pour les deux).
- **Corrigé type** :
  1. `u_{n+1} = u_n + h·(−2u_n)` — sous-but `scheme`.
  2. `u₁ = 0,8 ; u₂ = 0,64` — sous-but `step`.
  3. `u₁ = 1 − 0,2u₁` — sous-but `implicit`.
  4. `1,2u₁ = 1 ⇒ u₁ = 5/6` — sous-but `implicit`.
- **Aides** :
  1. « Progressif : la pente au début du pas ; rétrograde : la pente à la fin, où u est inconnu. »
  2. « Rétrograde : u₁ = 1 + 0,1·f(0,1 ; ▢) »
  3. « u₁ = 1 − 0,2u₁, donc u₁ = 5/6. »
- **Variantes d'examen** :
  - `tf` : « Le schéma d'Euler rétrograde est explicite » : faux.
  - `mcq` : quelle équation résout-on à chaque pas d'ER (2019, question 4 ; voir `n-ode-implicit-newton`).
- **Pièges** : `n_implicit_as_explicit`, `n_euler_time_index`.
- **Sous-buts → crédit** : `scheme`, `step`, `implicit` → `n-ode-euler`.

### `n-ode-rk` — Heun, Crank-Nicolson, Runge-Kutta
- **Année** 16 · **Prérequis** `n-ode-euler` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `n-ode-euler` : même formalisme t_n, u_n et pas h.
- **Statut** : fait le 10 novembre 2026 (étape U9). L1 : tableau de Heun, k₁ et k₂ à remplir ; L2 : un pas libre ; L3 : reconnaître un schéma d'après sa formule (QCM ; formules générales, ou f = −u + sin(tu) de GM 2012 ; option « aucun » avec `n_cn_explicit`) ; L4 : deux pas de Heun, puis u₁ par Crank-Nicolson (f affine) ; L5 : le code `heun` (un test ajouté avec f = t), puis le tableau avec la colonne Heun (ordre 2). QCM : le schéma de GM 2012, ou u₁ par Heun (`n_heun_k2`). Le tableau de Butcher et RK4 à la main ne sont pas construits (RK4 seulement dans le juge).
- **Intro** : trois familles prolongent Euler.
  - Crank-Nicolson : u_{n+1} = u_n + (h/2)(f(t_n, u_n) + f(t_{n+1}, u_{n+1})). Implicite, d'ordre 2.
  - Heun : on prédit avec Euler, puis on fait la moyenne. u_{n+1} = u_n + (h/2)(f(t_n, u_n) + f(t_{n+1}, u_n + h·f(t_n, u_n))). Explicite, d'ordre 2.
  - Runge-Kutta à s étapes : il est décrit par son tableau de Butcher. Il est explicite si aᵢⱼ = 0 pour j ≥ i.

  Exemple : u′ = −2u, h = 0,1, u₀ = 1.
  - `Heun : k₁ = −2 ; k₂ = −2·(1 − 0,2) = −1,6 ; u₁ = 1 + 0,05·(−3,6) = 0,82`
  - `CN : u₁ = 1 + 0,05·(−2 − 2u₁) ⇒ u₁ = 0,9/1,1 = 9/11 ≈ 0,818`
  - `exact : 0,8187`
- **Juge** : `table` `iter` `{phi:{kind:'ode', scheme:'Heun'|'CN'|'RK4', f}, cols:['t','k1','k2','u'], tol:1e-9}` ; un `mcq` pour reconnaître un schéma · **Forme finale** : les valeurs, et le nom du schéma.
- **Niveaux** :
  - L1 : k₁ et k₂ à trous.
  - L2 : un pas libre.
  - L3 : reconnaître le schéma d'après sa formule ou son tableau de Butcher.
  - L4 : 2 pas de Heun et de CN.
  - L5 : l'item `code`, puis le `readtable`.
- **Générateur** : celui de `n-ode-euler`. Pour la reconnaissance, une formule tirée parmi EP, ER, CN, Heun et « aucun », avec des fonctions f variées (GM 2012 : u′ = −u + sin(tu)).
- **Item `code`** (`PRELUDE_VEC`) :
  ```python
  def heun(f, t0, u0, T, N):
      h = (T - t0) / N
      t = t0
      u = u0
      for n in range(N):
          k1 = f(t, u)
          k2 = «f(t + h, u + h * k1)»
          u = «u + h / 2 * (k1 + k2)»
          t = t + h
      return u
  ```

  | setup | expr | expect | tol |
  |---|---|---|---|
  | `def f(t, u): return -2*u` | `heun(f, 0, 1.0, 0.1, 1)` | `0.82` | 1e−12 |
  | `def f(t, u): return 2/15*u*(1 - u/1000)` | `heun(f, 0, 100.0, 100, 20)` | `999.9533941083979` | 1e−9 |
- **Item `readtable`** : le même problème que `n-ode-euler`, avec une colonne Heun : 1.608e-02, 4.025e-03, 1.003e-03, 2.507e-04. Question (`mcq multi`) : vrai = « Heun est d'ordre 2 (rapport 4) », « Euler progressif et rétrograde sont d'ordre 1 ».
- **Corrigé type** : les 2 lignes de l'intro, avec les sous-buts `k1`, `k2`, `update`, puis `cn` pour Crank-Nicolson.
- **Aides** :
  1. « Heun : un pas d'Euler pour prédire, puis la moyenne des deux pentes. »
  2. « k₂ = f(t + h, u + h·▢) »
  3. « k₂ = −1,6, u₁ = 1 + 0,05·(−3,6) = 0,82. »
- **Variantes d'examen** : `mcq` (GM 2012) : « u_{n+1} = u_n + (Δt/2)(−u_n − u_{n+1} + sin(nΔt·u_n) + sin((n + 1)Δt·u_{n+1})) est le schéma… » (Crank-Nicolson ; distracteurs Heun, Euler, aucun).
- **Pièges** : `n_heun_k2`, `n_cn_explicit`.
- **Sous-buts → crédit** : `k1`, `k2`, `update`, `cn` → `n-ode-rk`.

### `n-ode-stability` — Stabilité absolue sur u′ = λu
- **Année** 16 · **Prérequis** `n-ode-rk`, `m-ode-modes` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `n-ode-rk` : fonctions R(hλ) des schémas.
- **Statut** : fait le 10 novembre 2026 (étape U9). La condition |R(hλ)| < 1 est une ligne `solset` en h sur ]0 ; +∞[, avec λ ∈ {−2, −5, −10, −20} (λ = −50 et −100 restent dans le QCM : le balayage de `solset` manque ]0 ; 0,02[). L1 : R donné ; L2 : décision sur R(z) (piège `n_stab_lambda_sign`) ; L3 : classer les schémas (QCM à plusieurs réponses) ; L4 : la θ-méthode, ou un système 2 × 2 (valeurs propres réelles par `solset` en λ, ou −a ± bi) ; L5 : le tableau raide u′ = −50(u − cos t). QCM : l'intervalle de EP (`n_stab_factor2`), ou la θ-méthode ; V/F : Heun (contre-exemple z = −3, `num` `heunUnstable`), ou « ER stable donc précis ». La formule R(z) n'est pas écrite à la main : c'est une décision. Le circuit RLC n'est pas construit.
- **Intro** : sur le problème modèle u′ = λu avec λ < 0, la solution tend vers 0. Le schéma est absolument stable si u_n → 0. On écrit u_{n+1} = R(hλ)·u_n et on exige |R(hλ)| < 1.
  - EP : R = 1 + hλ, stable ⇔ h < 2/|λ|.
  - ER : R = 1/(1 − hλ), toujours stable.
  - CN : R = (1 + hλ/2)/(1 − hλ/2), toujours stable.
  - Heun : R = 1 + hλ + (hλ)²/2, stable ⇔ h < 2/|λ|.
  - θ-méthode : inconditionnellement stable ssi θ ≥ 1/2 ; sinon h < 2/((1 − 2θ)|λ|).
  - Système u′ = Au : chaque valeur propre λᵢ compte. Pour EP : |1 + hλᵢ| < 1 pour tout i.

  Exemple : λ = −20.
  - `EP : |1 − 20h| < 1 ⇔ 0 < h < 0,1`
  - `ER : |1/(1 + 20h)| < 1 pour tout h > 0`
- **Juge** : `equiv` `{vars:['z']}` pour R(z), avec z = hλ ; `solset` `{v:'h', domain:']0 ; +∞['}` pour la condition · **Forme finale** : l'intervalle des h stables, ou « pour tout h > 0 ».
- **Niveaux** :
  - L1 : R(z) donné ; l'élève résout |R| < 1.
  - L2 : écrire R(z) à partir du schéma.
  - L3 : classer les schémas en conditionnellement et inconditionnellement stables.
  - L4 : θ-méthode (série GM 13), stabilité en fonction de θ.
  - L5 : système 2 × 2 (circuit RLC de la série GM 13), puis le `readtable`.
- **Générateur** : on part de la condition.
  - λ ∈ {−2, −5, −10, −20, −50, −100}, pour que 2/|λ| soit décimal ; θ ∈ {0, 1/4, 1/3, 1/2, 2/3, 1}.
  - Systèmes 2 × 2 à valeurs propres réelles négatives entières ([[−3, 1], [1, −3]] : −2 et −4, d'où h < 1/2), ou complexes −a ± bi avec a, b entiers (−1 ± 2i : h < 2·1/5 = 2/5).
- **Item `readtable`** : u′ = −50(u − cos t), u(0) = 0, sur [0 ; 1]. On donne u_N.

  | N | h | Euler progressif | Euler rétrograde |
  |---|---|---|---|
  | 20 | 0.05 | -3.325e+03 | 5.566e-01 |
  | 24 | 0.0417 | -6.271e+00 | 5.567e-01 |
  | 26 | 0.0385 | 4.323e-01 | 5.567e-01 |
  | 50 | 0.02 | 5.570e-01 | 5.568e-01 |
  | 100 | 0.01 | 5.570e-01 | 5.569e-01 |

  Question (`mcq multi`) : vrai = « Euler progressif est instable pour h > 2/50 = 0,04 », « Euler rétrograde est stable pour tout h ». Faux = « Euler progressif est d'ordre 0 pour h = 0,05 » (`n_stab_order_confused`).
- **Corrigé type** :
  1. `u_{n+1} = (1 + hλ)u_n` — sous-but `factor`.
  2. `|1 + hλ| < 1 ⇔ −2 < hλ < 0` — sous-but `ineq`.
  3. `λ = −20 : 0 < h < 0,1` — sous-but `ineq`.
  4. `ER : u_{n+1} = u_n/(1 + 20h), |·| < 1 pour tout h > 0` — sous-but `implicit`.
- **Aides** :
  1. « Écris u_{n+1} = R·u_n : le schéma est stable si |R| < 1. »
  2. « R = 1 + h·▢ »
  3. « |1 − 20h| < 1 ⇔ 0 < h < 0,1. »
- **Variantes d'examen** :
  - `mcq` : la stabilité de la θ-méthode ; les tableaux de la chaleur (voir `n-heat-implicit`).
  - `tf` :
    - « ER est stable pour tout h, donc son erreur est petite pour tout h » : faux, il est stable mais d'ordre 1.
    - « Heun est inconditionnellement stable » : faux. Contre-exemple : hλ = −3 donne R = 2,5.
- **Pièges** : `n_stab_factor2`, `n_stab_order_confused`, `n_stab_lambda_sign`.
- **Sous-buts → crédit** : `factor`, `ineq`, `implicit` → `n-ode-stability` ; valeurs propres d'un système → `m-ode-modes`.

### `n-ode-euler-global` — Erreur globale d'Euler, par une preuve
- **Année** 16 · **Prérequis** `n-ode-euler`, `g5-geom`, `a1-extrema-global`, `a1-dl-usual` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a1-extrema-global` : majorer une fonction sur un intervalle.
- **Statut** : fait le 10 novembre 2026 (étape U9). λ = −1 seulement (la variante λ = −2 n'est pas construite), T ∈ {10, 20, 50, 100}. L1 et L2 : lignes guidées (le schéma, aᴺ − bᴺ factorisé par `equiv` pour N = 2, 3, 4, la constante C) ; L3 : `readtable` de l'erreur pour T = 1 (`n_global_error_order`) ; L4 : la preuve en blocs avec trois leurres ; L5 : le problème de 2020 (T = 10, 5 points). Variante `open` : l'exemple d'examen 4 (T = 20, 4 points), en quatre parties (lignes, blocs, lignes, blocs). Le lemme est en blocs, sans juge `series` à reste de Lagrange.
- **Intro** : pour u′ = −u, u(0) = 1 sur [0 ; T], h = T/N, on a u_N = (1 − h)ᴺ et u(t_N) = e^(−Nh). La preuve demande deux faits :
  - **Lemme.** |e^(−x) − (1 − x)| ≤ x²/2 pour x > 0, par Taylor : le reste vaut e^(−ξ)x²/2 ≤ x²/2.
  - **Factorisation.** aᴺ − bᴺ = (a − b)·Σₖ a^(N−1−k)bᵏ. Si 0 < h ≤ 2, alors |a|, |b| ≤ 1, donc |aᴺ − bᴺ| ≤ N|a − b|.

  Exemple (2022, 3,5 points), T = 100.
  - `u(t_N) − u_N = e^(−Nh) − (1 − h)^N`
  - `|e^(−h) − (1 − h)| ≤ h²/2`
  - `|e^(−Nh) − (1 − h)^N| ≤ N·h²/2 = (Nh)·h/2 = 100h/2 = 50h`
- **Juge** : `problem`.
  - (a) `lines` `value`/`equiv` pour u_N ;
  - (b) `series` `{v:'x', at:0, order:1, remainder:'lagrange'}`, puis `blocks` pour le signe du reste ;
  - (c) `poly` pour l'identité aᴺ − bᴺ = (a − b)Σ… (vérifiée pour N = 2, 3, 4 symboliquement) ;
  - (d) `blocks` `{mode:'frame'}` : « |a| ≤ 1 car a = e^(−h) », « |b| = |1 − h| ≤ 1 car 0 < h ≤ 2 », « inégalité triangulaire », « N termes », avec le leurre « |aᴺ − bᴺ| ≤ |a − b| » ;
  - (e) `value` pour la constante 50.
  - **Forme finale** : la majoration Ch, avec C explicite.
- **Niveaux** :
  - L1 : (a) et (b) à trous.
  - L2 : (c) à trous.
  - L3 : choisir les arguments de la majoration parmi les blocs.
  - L4 : la preuve complète, avec les blocs.
  - L5 : la version de 2020 (T = 10, 5 points, avec l'étape intermédiaire |u(t_N) − u_N| ≤ (h²/2)(1 + |1 − h| + … + |1 − h|^(N−1))), sans aide.
- **Générateur** : T ∈ {10, 20, 50, 100} ; λ = −1, ou λ = −2 avec un lemme adapté (|e^(−2h) − (1 − 2h)| ≤ 2h², d'où la condition h ≤ 1). La constante C = T/2 (ou T pour λ = −2) est entière.
- **Item `readtable`** : T = 1, erreur |u(1) − u_N| et borne T·h/2.

  | N | h | erreur | h/2 |
  |---|---|---|---|
  | 10 | 0.1 | 1.920e-02 | 5.000e-02 |
  | 20 | 0.05 | 9.394e-03 | 2.500e-02 |
  | 40 | 0.025 | 4.647e-03 | 1.250e-02 |
  | 80 | 0.0125 | 2.311e-03 | 6.250e-03 |

  Question (`mcq multi`) : vrai = « l'erreur globale est d'ordre 1 », « la borne est respectée ». Faux = « l'erreur globale est d'ordre 2 comme l'erreur locale h²/2 » (`n_global_error_order`).
- **Corrigé type** : les lignes de l'intro, avec les sous-buts `scheme`, `lemma`, `factor`, `bound` et `constant`.
- **Aides** :
  1. « Écris les deux nombres comme des puissances N-ièmes, puis factorise aᴺ − bᴺ. »
  2. « |aᴺ − bᴺ| ≤ |a − b|·(▢ termes ≤ 1) »
  3. « ≤ N·h²/2 = Th/2 = 50h. »
- **Variantes d'examen** : `open` (barème dans « Exemples de type examen ») ; `tf` : « L'erreur globale d'Euler est O(h²), comme son erreur locale » : faux.
- **Pièges** : `n_euler_ineq_bound`, `n_global_error_order`, `n_h_le_2_forgotten`.
- **Sous-buts → crédit** : `scheme` → `n-ode-euler` ; `lemma` → `a1-dl-usual` ; `factor` → `g5-geom` ; `bound`, `constant` → `n-ode-euler-global`.

### `n-ode-implicit-newton` — Euler implicite sur un système, avec un pas de Newton
- **Année** 16 · **Prérequis** `n-ode-euler`, `n-newton-system` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U9). g ∈ {u², 1 + u², u⁴}, uⁿ ∈ {(1 ; 1), (1 ; 2), (2 ; 1)}, h ∈ {1/10, 1/2, 1}, x⁽¹⁾ à dénominateurs ≤ 50 ; inconnues notées (x ; y). L1 : J et x⁽¹⁾ par cases de la grille (juge `mat`) ; L2 : f₁ et f₂ à écrire (`equiv`), puis J et x⁽¹⁾ ; L3 : décision entre les trois systèmes de 2019, puis J et x⁽¹⁾ ; L4 : J, F et x⁽¹⁾ libres ; L5 : le code `be_newton_step` (tests ajoutés en (2 ; 1) et (1 ; 2)), puis les énoncés d'énergie (QCM à plusieurs réponses). QCM : le couple (a, b) (2019, Q5 ; `a2_jacobian_transposed` quand J n'est pas symétrique), ou le système (Q4) ; V/F : énergie (vrai), ou x⁽¹⁾ = uⁿ + δ (`n_newton_sys_sign`). `n_implicit_as_explicit` n'est pas un piège de code ici (F est évaluée en x = uⁿ : le texte faux donne les mêmes nombres) ; c'est une option de décision et de QCM.
- **Intro** : ER sur un système non linéaire demande de résoudre F(x) = 0 à chaque pas. On le fait par Newton, en partant de x⁽⁰⁾ = uⁿ. Exemple (2019) : u₁′ = −u₂²u₁, u₂′ = −u₁²u₂, u(0) = (1 ; 1).
  - `f₁(x) = x₁ − u₁ⁿ + h·x₂²·x₁ ; f₂(x) = x₂ − u₂ⁿ + h·x₁²·x₂` (note : « les inconnues sont x = uⁿ⁺¹ »)
  - `J = [[1 + h·x₂², 2h·x₁x₂], [2h·x₁x₂, 1 + h·x₁²]]`
  - `en x⁽⁰⁾ = (1 ; 1) : J = [[1 + h, 2h], [2h, 1 + h]], F = (h ; h)`
  - `J·(1 − x₁¹ ; 1 − x₂¹) = (h ; h) ⇒ x₁¹ = x₂¹ = 1 − h/(1 + 3h)` (note : « h = 0,1 : 12/13 ≈ 0,923 »)
- **Juge** : `lines` `equiv` pour f₁ et f₂ (variables x₁, x₂ ; symboles uⁿ, h) ; `matrix` `equiv` pour J ; `value` pour x¹ · **Forme finale** : x¹.
- **Niveaux** :
  - L1 : f₁ et f₂ sont donnés ; J est à trous.
  - L2 : f₁ et f₂ à écrire.
  - L3 : choisir le bon système parmi les 3 options d'examen.
  - L4 : un pas complet pour h donné.
  - L5 : l'item `code`, puis les vrai/faux d'énergie de 2019 (questions 2 et 3).
- **Générateur** : systèmes u₁′ = −g(u₂)u₁, u₂′ = −g(u₁)u₂ avec g ∈ {u², 1 + u², u⁴} ; uⁿ = (1 ; 1) ou (1 ; 2) ; h ∈ {0,1 ; 0,5 ; 1}. Contrainte : x¹ rationnel avec un dénominateur ≤ 50.
- **Item `code`** (`PRELUDE_VEC`, `PRELUDE_MAT`) :
  ```python
  def be_newton_step(u1, u2, h):
      # un pas de Newton pour le schema d'Euler retrograde, depuis x = u^n
      x1 = u1
      x2 = u2
      F1 = «x1 - u1 + h * x2 * x2 * x1»
      F2 = «x2 - u2 + h * x1 * x1 * x2»
      a = «1 + h * x2 * x2»
      b = «2 * h * x1 * x2»
      c = 2 * h * x1 * x2
      d = 1 + h * x1 * x1
      delta = solve([[a, b], [c, d]], [F1, F2])
      return [«x1 - delta[0]», x2 - delta[1]]
  ```
  Remarque : F(uⁿ) vaut ici (h·u₂²u₁ ; h·u₁²u₂), puisque x = uⁿ.

  | expr | expect | tol |
  |---|---|---|
  | `be_newton_step(1.0, 1.0, 0.1)` | `[0.9230769230769231, 0.9230769230769231]` | 1e−12 |
  | `be_newton_step(1.0, 1.0, 0.5)` | `[0.8, 0.8]` | 1e−12 |
- **Corrigé type** : les 4 lignes de l'intro, avec les sous-buts `system`, `jacobian`, `evaluate` et `solve`.
- **Aides** :
  1. « Écris le schéma ER avec les inconnues x = uⁿ⁺¹ à droite, puis applique Newton à F(x) = 0. »
  2. « ∂f₁/∂x₂ = 2h·x₂·▢ »
  3. « J(1, 1) = [[1 + h, 2h], [2h, 1 + h]]. »
- **Variantes d'examen** : `mcq` (2019, questions 4 et 5) :
  - les définitions de f₁ et f₂ : celle avec u₂ⁿ dans le terme non linéaire vient de `n_implicit_as_explicit` ; celle écrite en uⁿ⁺¹ au lieu de x n'est pas une fonction de (x₁, x₂) ;
  - le couple (a, b), avec la bonne réponse a = 1 + h, b = 2h, et les distracteurs (1 − h, −h), (1 − 2h, −2), (1 + 2h, h).
  - `tf` (2019, questions 2 et 3) : « ½·d/dt(u₁² + u₂²) + 2u₁²u₂² = 0 » (vrai) ; « u₁(1)² + u₂(1)² ≤ u₁(0)² + u₂(0)² » (vrai).
- **Pièges** : `n_implicit_as_explicit`, `a2_jacobian_transposed`, `n_newton_sys_sign`.
- **Sous-buts → crédit** : `system` → `n-ode-euler` ; `jacobian`, `solve` → `n-newton-system` ; `evaluate` → `n-ode-implicit-newton`.

### `n-ode-stiff` — Problèmes raides
- **Année** 16 · **Prérequis** `n-ode-stability` · **Étiquettes** `opt` · **Optionnelle** non · **Poids d'examen** 0
- **Statut** : fait le 10 novembre 2026 (étape U9). λ_rapide ∈ {−50, −100, −500, −1000}. L1 : h_max guidé ; L2 : système diagonal, décision sur la valeur propre qui impose le pas ; L3 : décision sur le schéma (`n_stiff_accuracy`), puis h_max ; L4 : `readtable` du tableau raide avec un QCM « pourquoi » ; L5 : A = PDP⁻¹ non diagonale, valeurs propres (`solset`), puis h_max, sans aide. V/F : « réduire la tolérance » (faux).
- **Intro** : un problème est raide quand il mêle des échelles de temps très différentes. Une composante rapide (λ très négatif) impose h < 2/|λ| aux schémas explicites, alors que la solution, une fois le transitoire passé, varie lentement. Avec un schéma implicite (ER, CN), on choisit h pour la précision seulement. Exemple : u′ = −50(u − cos t).
  - `transitoire de durée ~1/50, puis u ≈ cos t`
  - `EP : h < 0,04 imposé par la stabilité ; ER : h = 0,05 marche`
  - `système u′ = [[−1, 0], [0, −1000]]u : rapport de raideur 1000`
- **Juge** : `value` pour h_max ; `readtable` (celui de `n-ode-stability`) ; `mcq` d'interprétation · **Forme finale** : le diagnostic et le choix de schéma.
- **Niveaux** :
  - L1 : h_max à trous.
  - L2 : h_max pour un système diagonal.
  - L3 : choisir le schéma adapté.
  - L4 : lire le tableau et expliquer l'explosion.
  - L5 : un système 2 × 2 non diagonal, avec ses valeurs propres.
- **Générateur** : λ_rapide ∈ {−100, −500, −1000}, λ_lent ∈ {−1, −0,5} ; systèmes A = PDP⁻¹ avec P entière.
- **Item `readtable`** : le tableau de `n-ode-stability`. Question : « Pourquoi Euler progressif explose-t-il, alors que la solution est lisse ? » (stabilité, pas précision).
- **Corrigé type** :
  1. `λ = −50` — sous-but `lambda`.
  2. `EP stable ⇔ h < 2/50 = 0,04` — sous-but `hmax` → `n-ode-stability`.
  3. `solution lisse : la précision seule demanderait h ≈ 0,1` — sous-but `diagnose`.
  4. `choisir ER` — sous-but `choose`.
- **Aides** :
  1. « Compare la condition de stabilité au pas que la précision demanderait. »
  2. « h < 2/▢ »
  3. « h < 0,04 alors que la solution est lisse : c'est un problème raide, il faut ER. »
- **Variantes d'examen** : `tf` : « Si Euler progressif explose, c'est qu'il faut diminuer la tolérance » : faux, c'est une question de stabilité.
- **Pièges** : `n_stiff_accuracy`, `n_stab_factor2`.
- **Sous-buts → crédit** : `lambda`, `diagnose`, `choose` → `n-ode-stiff` ; `hmax` → `n-ode-stability`.

### `n-bvp-fd` — Problème aux limites −u″ = f : schéma, matrice, A SDP
- **Année** 16 · **Prérequis** `n-fd-basic`, `n-thomas`, `m-posdef` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `n-thomas` : résoudre le système tridiagonal.
- **Statut** : fait le 10 novembre 2026 (étape U9). Données : solution exacte cubique u = α(1 − x) + βx + x(1 − x)(a + bx), donc f = 2a − 2b + 6bx, N ∈ {2, 3, 4}, et le schéma est exact. L1 : valeurs guidées 2/h², f̃₁, f̃_N (pièges `n_bvp_h2_missing`, `n_bvp_bc_rhs`). L2 : la même chose avec la décision « que devient −u₀/h² », ou A et f̃ dans la grille (`mat`). L3 : menus. L4 : preuve SDP en blocs (leurres `n_spd_semidefinite`, `l_posdef_diag`) au lieu d'un `frame` avec vᵀAv tapé. L5 : programme `bvp_system` (test ajouté avec f(x) = x : sans lui, le trou `f((i + 1) * h)` n'était pas contrôlé), puis `readtable` (le schéma est exact pour f = 1). QCM : la matrice de Neumann de 2019 Q1 à plusieurs réponses, ou f̃₁. `open` : l'exemple d'examen 2 a–c sur 3,5 points (A, f̃, preuve SDP). Pas de bord de Neumann (notes GM).
- **Intro** : on pose xᵢ = ih, h = 1/(N + 1). Le schéma centré s'écrit (−uᵢ₋₁ + 2uᵢ − uᵢ₊₁)/h² = f(xᵢ) pour i = 1 … N, avec u₀ = α et u_{N+1} = β. Sous forme matricielle, Au = f̃ :
  - A = (1/h²)·tridiag(−1, 2, −1) ;
  - f̃₁ = f(x₁) + α/h², f̃_N = f(x_N) + β/h², et f̃ᵢ = f(xᵢ) pour les autres i.

  A est SDP, car vᵀAv = (1/h²)·(v₁² + Σᵢ₌₁^{N−1} (vᵢ₊₁ − vᵢ)² + v_N²) > 0 si v ≠ 0. Exemple : −u″ = 1, u(0) = u(1) = 0, N = 3, h = 1/4.
  - `A = 16·[[2, −1, 0], [−1, 2, −1], [0, −1, 2]], f̃ = (1 ; 1 ; 1)`
  - `u = (3/32 ; 1/8 ; 3/32)` (note : « ce sont les valeurs exactes de x(1 − x)/2 : le schéma est exact pour les polynômes de degré ≤ 3 »)
- **Juge** :
  - item `matrix` jugé par `equiv` pour A et f̃, avec les symboles h et N ;
  - `lines` `equiv` pour l'identité de vᵀAv, vérifiée symboliquement pour N = 3 et N = 4 ;
  - `blocks` `{mode:'frame'}` pour l'argument de positivité, avec les blocs « chaque terme est ≥ 0 », « si la somme est nulle, v₁ = 0, puis v₂ = v₁, … », « donc v = 0 », et le leurre « vᵀAv ≥ 0, donc A est SDP » ;
  - `value` pour u.
  - **Forme finale** : A et f̃ explicites ; la preuve SDP ; u.
- **Niveaux** :
  - L1 : la ligne i du schéma est à trous ; A est en 3 × 3.
  - L2 : A et f̃ à écrire, avec des conditions aux bords non nulles.
  - L3 : choisir quels termes vont dans f̃ (les conditions aux bords).
  - L4 : la preuve SDP avec les blocs proposés.
  - L5 : l'examen 2022 (question ouverte 2, partie 1) ; ou un bord de Neumann (notes GM 7.2.2 : (u_{N+1} − u_N)/h = β, d'ordre 1) ; ou l'item `code`.
- **Générateur** : f ∈ {1, x, eˣ, π² sin(πx)} ; α, β ∈ {−2, …, 3} ; N ∈ {2, 3, 4}. Pour le calcul à la main, on prend une solution exacte polynomiale de degré ≤ 3 : le schéma est alors exact et u se vérifie par `value`.
- **Item `code`** (`PRELUDE_VEC`, `PRELUDE_MAT`) :
  ```python
  def bvp_system(N, f, alpha, beta):
      # -u'' = f sur ]0;1[, u(0) = alpha, u(1) = beta ; inconnue u[i] au point (i + 1) h
      h = 1 / (N + 1)
      A = zeros2(N, N)
      rhs = zeros(N)
      for i in range(N):
          A[i][i] = «2 / (h * h)»
          if i > 0:
              A[i][i - 1] = «-1 / (h * h)»
          if i < N - 1:
              A[i][i + 1] = -1 / (h * h)
          rhs[i] = «f((i + 1) * h)»
      rhs[0] = «rhs[0] + alpha / (h * h)»
      rhs[N - 1] = rhs[N - 1] + beta / (h * h)
      return [A, rhs]
  ```
  Setup : `def one(x): return 1.0`, `def zero(x): return 0.0`, puis `S = bvp_system(3, one, 0.0, 0.0)` et `T = bvp_system(3, zero, 1.0, 3.0)`.

  | expr | expect | tol |
  |---|---|---|
  | `solve(S[0], S[1])` | `[0.09375, 0.125, 0.09375]` | 1e−12 |
  | `solve(T[0], T[1])` | `[1.5, 2.0, 2.5]` | 1e−12 |

  Le 2e test (u affine entre 1 et 3) rejette `n_bvp_bc_rhs`.
- **Corrigé type** :
  1. `−u″(xᵢ) ≈ (−uᵢ₋₁ + 2uᵢ − uᵢ₊₁)/h²` — sous-but `scheme` → `n-fd-basic`.
  2. `i = 1 : (2u₁ − u₂)/h² = f(x₁) + α/h²` — sous-but `boundary`.
  3. `A = (1/h²)·tridiag(−1, 2, −1)` — sous-but `matrix`.
  4. `vᵀAv = (1/h²)(v₁² + (v₂ − v₁)² + (v₃ − v₂)² + v₃²)` — sous-but `spd`.
  5. `= 0 ⇒ v₁ = 0, v₂ = v₁ = 0, v₃ = 0`, donc A est SDP — sous-but `spd` → `m-posdef`.
- **Aides** :
  1. « Écris l'équation au nœud xᵢ avec la différence centrée de u″ ; aux nœuds 1 et N, u₀ et u_{N+1} sont connus : ils passent à droite. »
  2. « vᵀAv = (1/h²)(v₁² + Σ(vᵢ₊₁ − ▢)² + v_N²) »
  3. « Une somme de carrés nulle force v₁ = 0, puis toutes les composantes à 0. »
- **Variantes d'examen** :
  - `mcq multi` (2019, question 1) : A = [[1, −1, 0, 0], [−1, 2, −1, 0], [0, −1, 2, −1], [0, 0, −1, 1]] (bords de Neumann). Vrai : « A·1 = 0 » et « xᵀAx ≥ 0 pour tout x ». Faux : « A est inversible » et « A est SDP » (`n_spd_semidefinite`).
  - `open` : la partie 1 de la question ouverte de 2022, ou les parties (a) et (b) de 2020.
- **Pièges** : `n_bvp_bc_rhs`, `n_bvp_h2_missing`, `n_spd_semidefinite`.
- **Sous-buts → crédit** : `scheme` → `n-fd-basic` ; `boundary`, `matrix` → `n-bvp-fd` ; `spd` → `m-posdef`.

### `n-bvp-convergence` — Consistance, stabilité, convergence en Ch²
- **Année** 16 · **Prérequis** `n-bvp-fd`, `n-fd-proof` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `n-bvp-fd` : schéma et matrice A ; `n-fd-proof` : la consistance se prouve comme l'ordre d'une différence finie.
- **Statut** : fait le 10 novembre 2026 (étape U9). Les développements de Taylor ne sont pas jugés par `series` (fonctions abstraites non construites) : ce sont des parties `value` sur les coefficients (1/24, C₁ = 1/12, C = 1/96, max|u⁽⁴⁾| pour sin πx, sin 2πx ou 1 − eˣ + (e − 1)x), avec le calcul comme départ aux niveaux 1 et 2. L3 : preuve en blocs (leurres `n_stability_skipped`, `n_proof_same_xi`). L4 : libre, sur ]0 ; L[ avec la stabilité L²/8. L5 : `readtable` d'un des deux tableaux recalculés. QCM : la constante de troncature, ou le tableau. `open` : l'exemple d'examen 2 d–f sur 4 points (blocs, puis C₁, max|u⁽⁴⁾| et K = π⁴/96).
- **Intro** : la preuve de convergence a trois étages.
  - **Consistance.** L'erreur de troncature est τᵢ = (−u(xᵢ₋₁) + 2u(xᵢ) − u(xᵢ₊₁))/h² − f(xᵢ). Par Taylor à l'ordre 4, |τᵢ| ≤ (h²/12)·max|u⁽⁴⁾|.
  - **Stabilité** (admise aux examens) : si Av = g, alors max|vᵢ| ≤ (1/8)·max|gᵢ|.
  - **Convergence.** Avec w = (u(xᵢ))ᵢ, on a Aw = f + τ, donc A(w − u) = τ, et max|u(xᵢ) − uᵢ| ≤ (1/8)(h²/12)·max|u⁽⁴⁾| = (h²/96)·max|u⁽⁴⁾|.

  « Consistance + stabilité ⇒ convergence. » Exemple :
  - `u(xᵢ ± h) = u ± hu′ + (h²/2)u″ ± (h³/6)u‴ + (h⁴/24)u⁽⁴⁾(ξ±)`
  - `u(xᵢ₊₁) + u(xᵢ₋₁) = 2u + h²u″ + (h⁴/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋))`
  - `τᵢ = −(h²/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋)), |τᵢ| ≤ (h²/12)·max|u⁽⁴⁾|`
  - `max|eᵢ| ≤ (1/8)·(h²/12)·max|u⁽⁴⁾| = (h²/96)·max|u⁽⁴⁾|`
- **Juge** : `problem`.
  - (a) `series` `{v:'h', at:0, order:4, abstract:{u:'C4'}, remainder:'lagrange'}` ;
  - (b) `equiv`, qui traite u, u″, u⁽⁴⁾(ξ±) comme des symboles ;
  - (c) `blocks` `{mode:'frame'}` : « −u″(xᵢ) = f(xᵢ) », « soustraire les deux systèmes », « appliquer la stabilité à e », avec le leurre « τ petit, donc e petit », qui saute la stabilité ;
  - (d) `value` pour C = 1/96.
  - **Forme finale** : C explicite.
- **Niveaux** :
  - L1 : les développements sont à trous.
  - L2 : la somme et τᵢ.
  - L3 : ordonner les blocs consistance → équation de l'erreur → stabilité → conclusion.
  - L4 : la preuve complète, avec les blocs.
  - L5 : l'examen 2022 (question ouverte 2, parties 2 et 3) ou 2020 (parties c à e), sans aide.
- **Générateur** : f et la solution exacte u, tirées dans {u = sin(πx) (max|u⁽⁴⁾| = π⁴), u = −eˣ + 1 + (e − 1)x (f = eˣ), u = x(1 − x)(1 + x)} ; constante de stabilité 1/8 (L = 1). Variante [0 ; L] : constante L²/8.
- **Item `readtable`** : −u″ = π² sin(πx), u = sin(πx).

  | N | max|u(xᵢ) − uᵢ| | h²π⁴/96 |
  |---|---|---|
  | 9 | 8.265e-03 | 1.015e-02 |
  | 19 | 2.059e-03 | 2.537e-03 |
  | 39 | 5.142e-04 | 6.342e-04 |

  Seconde table (examen 2020, f = eˣ) : N = 9 : 1.752621e-04 ; 19 : 4.411990e-05 ; 39 : 1.103101e-05 ; 79 : 2.758498e-06. Question (`mcq multi`) : vrai = « l'erreur est divisée par 4 quand N + 1 double (ordre 2) », « la borne théorique est respectée ».
- **Corrigé type** : les 4 lignes de l'intro, avec les sous-buts `taylor`, `sum`, `consistency` et `convergence`, puis la constante 1/96 (sous-but `constant`).
- **Aides** :
  1. « Remplace uᵢ par la valeur exacte u(xᵢ) dans le schéma : ce qui reste est τᵢ. Développe u(xᵢ ± h) jusqu'à l'ordre 4. »
  2. « u(xᵢ₊₁) + u(xᵢ₋₁) = 2u(xᵢ) + h²u″(xᵢ) + ▢ »
  3. « |τᵢ| ≤ h²/12·max|u⁽⁴⁾|, et la stabilité donne le facteur 1/8 : C = 1/96. »
- **Variantes d'examen** :
  - `open` (barème dans « Exemples de type examen ») ;
  - `mcq` : « La troncature de la différence centrée de u″ est en… » (h² ; distracteurs h et h⁴).
- **Pièges** : `n_truncation_constant`, `n_stability_skipped`.
- **Sous-buts → crédit** : `taylor` → `a1-dl-usual` ; `sum`, `consistency` → `n-bvp-convergence` ; `convergence`, `constant` → `n-bvp-convergence`.

### `n-bvp-newton` — Problème non linéaire : différences finies, Newton, Cholesky tridiagonal
- **Année** 16 · **Prérequis** `n-bvp-fd`, `n-newton-system`, `m-cholesky` · **Étiquettes** `MT` · **Optionnelle** non · **Poids d'examen** 3
- **Statut** : fait le 10 novembre 2026 (étape U9). Tous les niveaux sont le programme `bvp_newton` (exam1.m 2020), avec g ∈ {x³ − 1, x⁵ − 1, x³ + x − 2, eˣ − 1}. Les tests (nombre d'itérations, stop₁, stop₃, x₃ pour N = 5) sont calculés par l'interpréteur. L1 : un trou à choix aux options d'examen (`n_jacobian_vs_F`, `n_cholesky_tridiag_sq`, `n_thomas_index_shift`). L2 : un trou tapé. L3 : les trous de DF et F. L4 : Cholesky et les deux substitutions. L5 : tous les trous, puis les `stop` pour N = 9 et 19, en QCM à plusieurs réponses. QCM d'examen : une ligne de code, le tableau `stop`, ou l'unicité (2020 mc1b). Pas de matrice DF en grille ni de blocs pour l'unicité (c'est un QCM).
- **Intro** : examen 2020. On cherche x ∈ ℝᴺ tel que F(x) = 0, avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (xᵢ³ − 1)ᵢ.
  - La jacobienne est DF(x) = (N + 1)²·tridiag(−1, 2, −1) + diag(3xᵢ²). Elle est SDP, donc on la factorise par Cholesky tridiagonal.
  - Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ).
  - Unicité : si F(x) = F(y) = 0, alors (N + 1)²(x − y)ᵀT(x − y) + Σ(xᵢ³ − yᵢ³)(xᵢ − yᵢ) = 0. Les deux termes sont ≥ 0, car t ↦ t³ est croissante, donc x = y.
  - `dᵢ = ∂(xᵢ³ − 1)/∂xᵢ = 3xᵢ²` (note : « pas xᵢ³ − 1, qui va dans F »)
  - `a(i) = 2·coeff + 3x(i)² ; b(i) = coeff·(2x(i) − x(i−1) − x(i+1)) + x(i)³ − 1`
- **Juge** : item `code` principal ; `matrix` `equiv` pour DF ; `blocks` pour l'unicité · **Forme finale** : programme complet, puis la lecture de sa sortie.
- **Niveaux** :
  - L1 : un trou en QCM, au format d'examen (2020, questions mc2 à mc7).
  - L2 : un trou à taper.
  - L3 : les trous de la jacobienne et de F.
  - L4 : les trous de Cholesky et des substitutions.
  - L5 : tous les trous, puis le `readtable`, puis le QCM d'unicité (2020, question mc1b).
- **Générateur** : non-linéarité g(x) ∈ {x³ − 1 (2020), x(1 + sin u) (2021), eᵘ, u⁵}, avec g′ ≥ 0 pour que DF reste SDP. Les tests viennent de la référence.
- **Item `code`** (`PRELUDE_VEC`), traduit de `exam1.m` (2020) :
  ```python
  def bvp_newton(N):
      a = zeros(N)
      b = zeros(N)
      c = zeros(N - 1)
      x = zeros(N)
      for i in range(N):
          x[i] = 1.0
      coeff = (N + 1) * (N + 1)
      stop = 1.0
      stops = []
      while stop > 1e-10:
          for i in range(N):
              a[i] = 2 * coeff + «3 * x[i] * x[i]»
          for i in range(N - 1):
              c[i] = -coeff
          b[0] = coeff * (2 * x[0] - x[1]) + «x[0] ** 3 - 1»
          for i in range(1, N - 1):
              b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + «x[i] ** 3 - 1»
          b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + x[N - 1] ** 3 - 1
          # Cholesky A = L L^T : a devient la diagonale de L, c sa sous-diagonale
          a[0] = «math.sqrt(a[0])»
          for i in range(N - 1):
              c[i] = «c[i] / a[i]»
              a[i + 1] = math.sqrt(a[i + 1] - «c[i] * c[i]»)
          # L z = b
          b[0] = «b[0] / a[0]»
          for i in range(N - 1):
              b[i + 1] = (b[i + 1] - «c[i] * b[i]») / a[i + 1]
          # L^T y = z
          b[N - 1] = «b[N - 1] / a[N - 1]»
          for i in range(N - 2, -1, -1):
              b[i] = (b[i] - «c[i] * b[i + 1]») / a[i]
          for i in range(N):
              x[i] = x[i] - b[i]
          stop = norm(b) / norm(x)
          stops.append(stop)
      return [x, stops]
  ```

  | expr | expect | tol |
  |---|---|---|
  | `len(bvp_newton(9)[1])` | `5` | |
  | `bvp_newton(9)[1][0]` | `3.580783e+00` | 1e−6 |
  | `bvp_newton(9)[1][2]` | `1.123099e-02` | 1e−6 |
  | `len(bvp_newton(19)[1])` | `5` | |

  QCM au format d'examen : `a[i] = 2*coeff + ???` avec les options `x[i]*x[i]*x[i] - 1` (`n_jacobian_vs_F`), `3*x[i]*x[i]` (juste), `3*x[i]*x[i] - 1`, `x[i]*x[i]*x[i]`. Pour `a[i+1] = math.sqrt(a[i+1] - ???)` : `c[i]*c[i]` (juste), `a[i]*a[i]` (`n_cholesky_tridiag_sq`), `a[i]*c[i]`.
- **Item `readtable`** (sortie 2020, recalculée) :

  | iter | N = 9 | N = 19 |
  |---|---|---|
  | 1 | 3.580783e+00 | 3.720121e+00 |
  | 2 | 1.274647e+00 | 1.277933e+00 |
  | 3 | 1.123099e-02 | 1.123106e-02 |
  | 4 | 4.868424e-07 | 4.834302e-07 |
  | 5 | 9.555565e-16 | 1.710970e-15 |

  Question (`mcq multi`) : vrai = « Newton converge quadratiquement pour ce point de départ ». Faux = « quel que soit le point de départ » ; « diverge ». Variante 2021 : l'erreur vaut 0,031974 ; 0,0082731 ; 0,0020607 pour N = 9, 19, 39 ; vrai = « l'erreur est divisée par 4 quand N double ».
- **Corrigé type** :
  1. `Fᵢ(x) = (N + 1)²(−xᵢ₋₁ + 2xᵢ − xᵢ₊₁) + xᵢ³ − 1` — sous-but `F`.
  2. `∂Fᵢ/∂xᵢ = 2(N + 1)² + 3xᵢ²` ; `∂Fᵢ/∂xᵢ±₁ = −(N + 1)²` — sous-but `jacobian` → `n-newton-system`.
  3. `DF = (N + 1)²T + diag(3xᵢ²), SDP` — sous-but `spd` → `n-bvp-fd`.
  4. Les lignes de Cholesky — sous-but `cholesky` → `m-cholesky`.
  5. Les deux substitutions — sous-but `solve` → `n-thomas`.
- **Aides** :
  1. « La jacobienne d'un terme diagonal g(xᵢ) est diag(g′(xᵢ)). »
  2. « a[i] = 2*coeff + d/dx(▢) »
  3. « a[i] = 2*coeff + 3*x[i]*x[i], et b[i] contient x[i]**3 − 1. »
- **Variantes d'examen** : `mcq` (5 à 8 questions par examen en 2020 et 2021) ; `mcq multi` sur l'unicité (2020, question mc1b).
- **Pièges** : `n_jacobian_vs_F`, `n_cholesky_tridiag_sq`, `n_thomas_index_shift`.
- **Sous-buts → crédit** : `F` → `n-bvp-newton` ; `jacobian` → `n-newton-system` ; `spd` → `n-bvp-fd` ; `cholesky` → `m-cholesky` ; `solve` → `n-thomas`.

### `n-heat-implicit` — Équation de la chaleur : Euler implicite et différences finies
- **Année** 16 · **Prérequis** `n-bvp-fd`, `n-ode-stability`, `n-thomas` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 4
- **Pourquoi ces prérequis** : `n-bvp-fd` : même matrice tridiagonale en espace.
- **Statut** : fait le 10 novembre 2026 (étape U9). Programme `heat_implicit` avec u(x, 0) = sin(πx) ou sin(2πx). Un troisième test (9, 20, 0,005) a τ/h² = 1/2 : les tests du catalogue gardent τ/h² = 1 et ne distinguaient pas `tau / (h * h) * sin(...)` de la bonne réponse. L1 : `b[i] = ???` ou `a[i] = 1 + ???` à choix. L2 : un coefficient de A tapé. L3 : décision « point (xᵢ, tₙ₊₁) » (piège `n_implicit_as_explicit`), puis A et u₁¹ pour N = 2, τ/h² ∈ {1, 1/2} (valeurs en √3). L4 : les trous de remplissage, puis le tableau d'ordre. L5 : tout le programme, puis le tableau A (tableau 1 pour k = 1, tableau A de l'exemple 1 pour k = 2). QCM d'examen : une ligne (dont celles de Thomas), le tableau d'ordre, le tableau de stabilité, ou le contraste explicite.
- **Intro** : on résout ∂u/∂t − ∂²u/∂x² = 0, u(0, t) = u(1, t) = 0, u(x, 0) = sin(πx) ; la solution exacte est e^(−π²t)·sin(πx). On écrit l'équation au point (xᵢ, t_{n+1}), avec une différence rétrograde en t et centrée en x :
  - (uᵢⁿ⁺¹ − uᵢⁿ)/τ − (uᵢ₋₁ⁿ⁺¹ − 2uᵢⁿ⁺¹ + uᵢ₊₁ⁿ⁺¹)/h² = 0 ;
  - donc Auⁿ⁺¹ = uⁿ, avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) ;
  - l'erreur est en O(h² + τ), et le schéma est stable pour tous h, τ > 0 ;
  - le schéma explicite (Euler progressif) est stable seulement si τ ≤ h²/2.

  Exemple : N = 2, h = 1/3, τ = 1/9, donc τ/h² = 1.
  - `A = [[3, −1], [−1, 3]], u⁰ = (√3/2 ; √3/2)`
  - `u¹ = u⁰/2 = (√3/4 ; √3/4)` (note : « chaque ligne de A a pour somme 2 »)
- **Juge** : `matrix` `equiv` pour A (symboles τ, h) ; `value` pour u¹ ; item `code` ; `readtable` · **Forme finale** : A, le schéma, la lecture de l'ordre et de la stabilité.
- **Niveaux** :
  - L1 : la ligne `b[i] = ???` en QCM (condition initiale).
  - L2 : les coefficients de A (`a[i] = 1 + ???`, `d[i] = -???`).
  - L3 : choisir le point où l'on écrit l'équation (t_n ou t_{n+1}), puis le schéma.
  - L4 : tous les trous de remplissage, puis le premier `readtable`.
  - L5 : le programme complet (avec les trous de Thomas), puis les deux tableaux d'examen. C'est le problème 1 des « Exemples de type examen ».
- **Générateur** : condition initiale sin(kπx), k ∈ {1, 2}, de solution e^(−k²π²t)·sin(kπx) ; suites (N, M, τ) où h est divisé par 2 et τ par 4. Le calcul à la main se fait avec N = 2 et τ/h² ∈ {1, 1/2}.
- **Item `code`** (`PRELUDE_VEC`), traduit de `exam1.m` (2019 et 2022) :
  ```python
  def heat_implicit(N, M, tau):
      # Euler retrograde + differences finies centrees ; inconnue b[i] au point (i + 1) h
      h = 1 / (N + 1)
      t = 0.0
      a = zeros(N)
      b = zeros(N)
      c = zeros(N - 1)
      d = zeros(N - 1)
      for i in range(N):
          b[i] = «math.sin(math.pi * (i + 1) * h)»
      for i in range(N):
          a[i] = 1 + «2 * tau / (h * h)»
      for i in range(N - 1):
          d[i] = -«tau / (h * h)»
          c[i] = -«tau / (h * h)»
      # A = LU (voir n-thomas)
      c[0] = c[0] / «a[0]»
      for i in range(1, N - 1):
          a[i] = a[i] - «d[i - 1] * c[i - 1]»
          c[i] = c[i] / «a[i]»
      a[N - 1] = a[N - 1] - «d[N - 2] * c[N - 2]»
      for n in range(M):
          t = t + tau
          b[0] = b[0] / «a[0]»
          for i in range(N - 1):
              b[i + 1] = (b[i + 1] - «d[i] * b[i]») / a[i + 1]
          for i in range(N - 2, -1, -1):
              b[i] = b[i] - «c[i] * b[i + 1]»
      err = 0.0
      for i in range(N):
          err = max(err, abs(b[i] - math.exp(-math.pi * math.pi * t) * math.sin(math.pi * (i + 1) * h)))
      return err
  ```

  | expr | expect | tol |
  |---|---|---|
  | `heat_implicit(9, 10, 0.01)` | `2.032035e-02` | 1e−6 |
  | `heat_implicit(19, 40, 0.0025)` | `5.238880e-03` | 1e−6 |
  | `heat_implicit(39, 160, 0.000625)` | `1.320115e-03` | 1e−6 |

  Ces valeurs sont exactement celles des examens 2019 et 2022. QCM : `b[i] = ???` parmi `sin(pi*(i+1)*h)` (juste), `tau*sin(…)` et `tau/(h*h)*sin(…)` (`n_heat_ic_tau`), `0` ; `a[i] = 1 + ???` parmi `2*tau/(h*h)` (juste), `tau/(h*h)` (`n_heat_2tau`), `2*tau` (`n_heat_tau_h`), `tau`.
- **Item `readtable`** (1, examens 2019 et 2022) :

  | N | M | τ | erreur max au temps final |
  |---|---|---|---|
  | 9 | 10 | 0.01 | 2.032035e-02 |
  | 19 | 40 | 0.0025 | 5.238880e-03 |
  | 39 | 160 | 0.000625 | 1.320115e-03 |
  | 79 | 640 | 0.00015625 | 3.306863e-04 |

  Question (`mcq multi`) : vrai = « le schéma converge à l'ordre O(h² + τ) ». Faux = « O(h + τ) » (`n_heat_order_h_tau`) ; « stable si τ ≤ h²/2 » et « stable pour tous h, τ », qui ne se lisent pas sur ce tableau (`n_stab_order_confused`).

  **Item `readtable`** (2) : N ∈ {9, 19, 39}, M = 1000, τ ∈ {0,01 ; 0,1 ; 1}. L'erreur vaut entre 10⁻⁴¹ et 0, sans explosion. Vrai = « stable pour tous h > 0, τ > 0 ».

  **Item `readtable`** (3, contraste, schéma explicite) : (N, M, τ) = (9, 500, 0,004) : 5.534e-10 ; (9, 500, 0,0055) : 1.028e+12 ; (19, 2000, 0,001) : 1.485e-10 ; (19, 2000, 0,0014) : 7.825e+160 (recalculé à l'étape U9 ; l'explosion part des erreurs d'arrondi, sa valeur exacte dépend de la machine : l'examen donnait 5.632e+160). Vrai = « l'explicite est stable seulement si τ/h² ≤ 1/2 » (0,4 contre 0,55 et 0,56).
- **Corrigé type** :
  1. `(uᵢⁿ⁺¹ − uᵢⁿ)/τ = (uᵢ₋₁ⁿ⁺¹ − 2uᵢⁿ⁺¹ + uᵢ₊₁ⁿ⁺¹)/h²` — sous-but `scheme`.
  2. `(1 + 2τ/h²)uᵢⁿ⁺¹ − (τ/h²)(uᵢ₋₁ⁿ⁺¹ + uᵢ₊₁ⁿ⁺¹) = uᵢⁿ` — sous-but `matrix`.
  3. `uᵢ⁰ = sin(πxᵢ)` — sous-but `ic`.
  4. `h/2 et τ/4 ⇒ erreur /4 : O(h² + τ)` — sous-but `order`.
  5. `τ = 1 reste stable : inconditionnellement stable` — sous-but `stability` → `n-ode-stability`.
- **Aides** :
  1. « Multiplie l'équation par τ et mets toutes les inconnues uⁿ⁺¹ à gauche. »
  2. « coefficient diagonal : 1 + 2·▢ »
  3. « A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²), Auⁿ⁺¹ = uⁿ. »
- **Variantes d'examen** : `mcq` (9 questions en 2019 et en 2022). C'est le problème 1 des « Exemples de type examen ».
- **Pièges** : `n_heat_tau_h`, `n_heat_2tau`, `n_heat_ic_tau`, `n_heat_order_h_tau`, `n_stab_order_confused`.
- **Sous-buts → crédit** : `scheme`, `matrix`, `ic`, `order` → `n-heat-implicit` ; `stability` → `n-ode-stability` ; les lignes de Thomas → `n-thomas`.

### `n-pde-cfl` — Transport et ondes : schémas explicites, condition CFL
- **Année** 16 · **Prérequis** `n-heat-implicit` · **Étiquettes** `MT` · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `n-heat-implicit` : même grille (xᵢ, tₙ).
- **Statut** : fait le 10 novembre 2026 (étape U9). L1 : `unew[i] = ???` à choix (`n_cfl_direction`). L2 : ondes, λ = τ²/h² (piège `n_wave_lambda`) et le premier pas, guidés. L3 : décision du voisin, uᵢⁿ⁺¹, puis (τ/h)max = 1. L4 : principe du maximum en blocs. L5 : programme `transport`, puis le tableau d'erreurs. QCM d'examen : la ligne de code, le tableau de transport, le tableau des ondes (ordre 2, τ ≤ h) ou la valeur de λ. Le programme des ondes n'est pas un item `code` : le catalogue n'en donne pas.
- **Intro** : deux schémas explicites, tous deux soumis à une condition sur τ/h.
  - **Transport** ∂u/∂t − ∂u/∂x = 0 : u(x, t) = u₀(x + t), donc l'information vient de la droite. On décentre vers i + 1 : uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ. Si τ ≤ h, c'est une combinaison convexe : max|uⁿ⁺¹| ≤ max|uⁿ|, et la positivité est conservée. L'ordre est O(h + τ).
  - **Ondes** ∂²u/∂t² = ∂²u/∂x² : avec λ = τ²/h², uᵢⁿ⁺¹ = 2(1 − λ)uᵢⁿ + λ(uᵢ₋₁ⁿ + uᵢ₊₁ⁿ) − uᵢⁿ⁻¹. Le premier pas, pour une vitesse initiale nulle, est uᵢ¹ = (1 − λ)uᵢ⁰ + (λ/2)(uᵢ₋₁⁰ + uᵢ₊₁⁰). Le schéma est stable si τ ≤ h, et d'ordre h² + τ².

  Exemple (transport) :
  - `τ/h = 0,9 : uᵢⁿ⁺¹ = 0,1uᵢⁿ + 0,9uᵢ₊₁ⁿ` (note : « poids ≥ 0 de somme 1 »)
  - `τ/h = 1,1 : poids −0,1 et 1,1` (note : « plus de principe du maximum »)
- **Juge** : item `code` ; `readtable` ; `equiv` pour la ligne du schéma · **Forme finale** : la ligne du schéma et la condition τ ≤ h.
- **Niveaux** :
  - L1 : la ligne `unew[i] = ???` en QCM (2019, question 16).
  - L2 : λ et u1 pour les ondes (2020, questions mc20 à mc22).
  - L3 : choisir le sens du décentrement.
  - L4 : le principe du maximum, avec des blocs (2019, question 18).
  - L5 : l'item `code`, puis les `readtable`.
- **Générateur** : transport avec la vitesse +1 ou −1 (décentrement à gauche ou à droite) ; condition initiale polynomiale (1 − x)³ ou x³ ; couples (h, τ) avec τ/h ∈ {0,5 ; 0,9 ; 1 ; 1,1}.
- **Item `code`** (`PRELUDE_VEC`), traduit de `exam2.m` (2019) :
  ```python
  def transport(N, M, tau):
      # du/dt - du/dx = 0, u(x,0) = 10 (1 - x)^3, u(1,t) = 0 ; decentre vers la droite
      h = 1 / (N + 1)
      uold = zeros(N)
      unew = zeros(N)
      for i in range(N):
          uold[i] = 10 * (1 - (i + 1) * h) ** 3
      t = 0.0
      for n in range(M):
          t = t + tau
          unew[N - 1] = «uold[N - 1] * (1 - tau / h)»
          for i in range(N - 2, -1, -1):
              unew[i] = «uold[i] * (1 - tau / h) + tau / h * uold[i + 1]»
          for i in range(N):
              uold[i] = unew[i]
      err = 0.0
      for i in range(N):
          x = (i + 1) * h
          if «x + t < 1»:
              uex = «10 * (1 - x - t) ** 3»
          else:
              uex = 0.0
          err = max(err, abs(unew[i] - uex))
      return err
  ```

  | expr | expect | tol |
  |---|---|---|
  | `transport(9, 5, 0.09)` | `6.435000e-02` | 1e−6 |
  | `transport(19, 10, 0.045)` | `3.465000e-02` | 1e−6 |
- **Item `readtable`** :
  - Transport (2019) : 6.435000e-02, 3.465000e-02, 1.794375e-02, 9.126562e-03 pour N = 9, 19, 39, 79 et τ = 0,9h. Vrai = « stable », « O(h + τ) ».
  - Ondes (2020, recalculé) : (9, 10, 0,09) : 6.903714e-04 ; (19, 20, 0,045) : 1.711472e-04 ; (39, 40, 0,0225) : 4.269724e-05. Vrai = « O(h² + τ²) ». Puis, avec M = 100 pas : τ = 0,1 = h donne 1.443290e-15, alors que τ = 0,11 > h donne 1.564047e+18 (recalculé à l'étape U9 ; le catalogue donnait 1,1·10⁵⁴ sans dire M). Vrai = « stable si τ ≤ h ».
- **Corrigé type** :
  1. `∂u/∂t ≈ (uᵢⁿ⁺¹ − uᵢⁿ)/τ ; ∂u/∂x ≈ (uᵢ₊₁ⁿ − uᵢⁿ)/h` — sous-but `scheme`.
  2. `uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ` — sous-but `scheme`.
  3. `τ ≤ h ⇒ |uᵢⁿ⁺¹| ≤ (1 − τ/h)max + (τ/h)max = max` — sous-but `cfl`.
  4. `tableau : erreur /2 quand h et τ /2 : O(h + τ)` — sous-but `order`.
- **Aides** :
  1. « La solution est transportée vers la gauche : on prend le voisin de droite. »
  2. « uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)·▢ »
  3. « Si τ ≤ h, les deux poids sont ≥ 0 et de somme 1 : max|uⁿ⁺¹| ≤ max|uⁿ|. »
- **Variantes d'examen** : `mcq` (2019, questions 15 à 18 ; 2020, questions mc19 à mc24).
- **Pièges** : `n_cfl_direction`, `n_wave_lambda`, `n_stab_order_confused`.
- **Sous-buts → crédit** : `scheme`, `cfl`, `order` → `n-pde-cfl`.

### `n-fem-hat` — Forme faible et fonctions chapeau
- **Année** 16 · **Prérequis** `n-bvp-fd`, `a1-int-parts` · **Étiquettes** `MT` · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `n-bvp-fd` : même problème −u″ = f et même matrice tridiagonale.
- **Statut** : fait le 10 novembre 2026 (étape U9). L1 : QCM sur l'espace V (Dirichlet, ou Neumann en 1). L2 à L4 : ∫(φ₁′)², ∫fφ₁ et α, avec une décision sur la forme faible (`n_weak_sign`), pour un chapeau de sommet c ∈ {1/2, 1/3, 1/4, 2/3, 3/4} et f ∈ {1, 2, x}. L5 : programme `fem_hat`, puis les valeurs nodales comparées à u, en QCM à plusieurs réponses. QCM d'examen : V, ou α (`n_hat_derivative`). Pas de N = 3 à la main ; la question ouverte de l'exemple 5 n'est pas construite.
- **Intro** : on part de −u″ = f, u(0) = u(1) = 0. On multiplie par v ∈ V et on intègre par parties : ∫u′v′ = ∫fv pour tout v ∈ V, avec V = {g continue, g′ continue par morceaux, g(0) = g(1) = 0}.
  - Une condition de Dirichlet est imposée dans V. Une condition de Neumann, comme u′(1) = 0, est naturelle : elle n'est pas dans V (2020 : V = {g(0) = 0}).
  - Galerkin : V_h = span(φ₁, …, φ_N), u_h = Σ uⱼφⱼ, Kᵢⱼ = ∫φᵢ′φⱼ′ = (1/h)·tridiag(−1, 2, −1), Fᵢ = ∫fφᵢ.

  Exemple (2021, 2022) : N = 1, φ₁ chapeau en 1/2.
  - `φ₁′ = 2 sur ]0 ; 1/2[, −2 sur ]1/2 ; 1[ ⇒ ∫(φ₁′)² = 4`
  - `∫φ₁ = 1/2` (note : « aire d'un triangle de base 1 et de hauteur 1 »)
  - `4α = 1/2 ⇒ α = 1/8` (note : « = u(1/2) exact, u = x(1 − x)/2 »)
- **Juge** : `mcq` pour V et V_h ; `lines` `value` pour les intégrales et α · **Forme finale** : α exact.
- **Niveaux** :
  - L1 : V à choisir (QCM d'examen).
  - L2 : ∫(φ₁′)² et ∫φ₁ à trous.
  - L3 : choisir V_h et la forme de u_h (2020, questions mc10 et mc11).
  - L4 : un chapeau non symétrique (centré en 1/3 : α = (1/2)/(9/2) = 1/9) ou N = 3.
  - L5 : l'item `code`, puis le problème 5 des « Exemples de type examen ».
- **Générateur** : f ∈ {1, 2, x} ; centre du chapeau dans {1/2, 1/3, 1/4} ; bords Dirichlet ou Dirichlet–Neumann ; α rationnel.
- **Item `code`** (`PRELUDE_VEC`, `PRELUDE_MAT`) :
  ```python
  def fem_hat(N):
      # -u'' = 1 sur ]0;1[, u(0) = u(1) = 0, N fonctions chapeau interieures
      h = 1 / (N + 1)
      K = zeros2(N, N)
      F = zeros(N)
      for i in range(N):
          K[i][i] = «2 / h»
          if i > 0:
              K[i][i - 1] = «-1 / h»
          if i < N - 1:
              K[i][i + 1] = -1 / h
          F[i] = «h»   # integrale de 1 * phi_i
      return solve(K, F)
  ```

  | expr | expect | tol |
  |---|---|---|
  | `fem_hat(1)` | `[0.125]` | 1e−12 |
  | `fem_hat(3)` | `[0.09375, 0.125, 0.09375]` | 1e−12 |
- **Corrigé type** : les 3 lignes de l'intro, avec les sous-buts `weak`, `space`, `stiffness`, `load` et `solve`.
- **Aides** :
  1. « Avec u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁. »
  2. « φ₁′ vaut ±2, donc ∫(φ₁′)² = ▢ »
  3. « 4α = 1/2, donc α = 1/8. »
- **Variantes d'examen** : `mcq` (2020 questions mc9 à mc11 ; 2021 questions 11 et 12 ; 2022 questions 13 et 14). Les distracteurs 1/4, 1/2, 1/16 viennent de `n_hat_derivative`, et les espaces sans condition, ou avec une seule condition, de `n_weak_space_bc`.
- **Pièges** : `n_weak_space_bc`, `n_hat_derivative`, `n_weak_sign`.
- **Sous-buts → crédit** : `weak` → `a1-int-parts` ; `space`, `stiffness`, `load`, `solve` → `n-fem-hat`.

### `n-opt-kkt` — Optimisation sous contraintes : conditions KKT
- **Année** 16 · **Prérequis** `a2-lagrange`, `m-quad-gradient` · **Étiquettes** `MT` · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `m-quad-gradient` : ∇f = Ax − b pour f quadratique.
- **Statut** : fait le 10 novembre 2026 (étape U9). min ½(x − a)² sous x ≤ c ou x ≥ c, cas actif ou inactif tirés à égalité. ∂L/∂x est jugé par `equiv` (piège `n_kkt_sign`). L2 : décision de complémentarité (`n_kkt_complementarity`). L3 : décision du cas (`n_kkt_multiplier_sign`). L4 : la moitié du temps, la contrainte d'égalité b·q = c (μ, q₁, q₂). L5 : programme `kkt_eq`. QCM d'examen : ∇ₓL, la complémentarité, ou le système par blocs et ker Bᵀ. La variante des points intérieurs (2021) n'est pas construite.
- **Intro** : pour minimiser f(x) sous gᵢ(x) ≥ 0, on pose L(x, λ) = f(x) − Σλᵢgᵢ(x). Les conditions KKT sont :
  - ∇f(x) − Σλᵢ∇gᵢ(x) = 0 ;
  - gᵢ(x) ≥ 0 ;
  - λᵢ ≥ 0 ;
  - λᵢgᵢ(x) = 0 (complémentarité).

  Pour des contraintes d'égalité Bq = c, avec L = f − μᵀ(Bq − c) et f = ½‖q‖², le système est [[I, −Bᵀ], [B, 0]]·(q ; μ) = (0 ; c). Sa solution est unique si ker Bᵀ = {0}. Exemples :
  - `min ½(x − 3)² sous 1 − x ≥ 0 : x − 3 + λ = 0, λ(1 − x) = 0, λ ≥ 0 ⇒ x = 1, λ = 2`
  - `min ½(q₁² + q₂²) sous q₁ + q₂ = 2 : q = (1 ; 1), μ = 1`
- **Juge** : `lines` `equiv` pour ∇ₓL ; `mcq` pour les blocs ; `value` pour (x, λ) · **Forme finale** : les conditions KKT écrites, puis la solution.
- **Niveaux** :
  - L1 : le lagrangien est donné ; ∇ₓL est à trous.
  - L2 : les 5 conditions à écrire.
  - L3 : choisir le cas « contrainte active » ou « inactive », puis résoudre.
  - L4 : le système par blocs pour des contraintes d'égalité.
  - L5 : les points intérieurs (2021, questions 19 à 22 : blocs diag(λ) et diag(s) de la jacobienne), ou l'item `code`.
- **Générateur** : f quadratique ½xᵀAx − bᵀx avec A diagonale en dimension 1 ou 2 ; contraintes de borne xᵢ ≥ −cᵢ, xᵢ ≤ cᵢ, ou une contrainte linéaire. Les cas actif et inactif sont tirés à égalité. Contrainte : la solution est entière ou demi-entière.
- **Item `code`** (`PRELUDE_VEC`, `PRELUDE_MAT`) :
  ```python
  def kkt_eq(B, c):
      # min 1/2 |q|^2 sous B q = c (B : 1 x n) ; inconnues (q, mu)
      n = len(B[0])
      K = zeros2(n + 1, n + 1)
      rhs = zeros(n + 1)
      for i in range(n):
          K[i][i] = «1.0»
          K[i][n] = «-B[0][i]»     # bloc -B^T
          K[n][i] = «B[0][i]»      # bloc B
      rhs[n] = «c[0]»
      return solve(K, rhs)
  ```

  | expr | expect | tol |
  |---|---|---|
  | `kkt_eq([[1, 1]], [2])` | `[1.0, 1.0, 1.0]` | 1e−12 |
  | `kkt_eq([[1, 1, 2]], [6])` | `[1.0, 1.0, 2.0, 1.0]` | 1e−12 |
- **Corrigé type** : 1er exemple de l'intro.
  1. `L = ½(x − 3)² − λ(1 − x)` — sous-but `lagrangian`.
  2. `∂L/∂x = x − 3 + λ = 0` — sous-but `stationarity`.
  3. `λ = 0 ⇒ x = 3, mais 1 − 3 < 0 : impossible` — sous-but `cases`.
  4. `1 − x = 0 ⇒ x = 1, λ = 2 ≥ 0` — sous-but `cases`.
- **Aides** :
  1. « Écris ∇ₓL = 0, puis traite les deux cas de la complémentarité : λ = 0 ou contrainte active. »
  2. « ∂L/∂x = (x − 3) + ▢ »
  3. « Contrainte active : x = 1, λ = 2 ≥ 0. »
- **Variantes d'examen** : `mcq` (2021, questions 16 à 27 ; 2020, questions mc25 à mc33) : signes de λ dans la 1re ligne (`n_kkt_sign`), terme de complémentarité (`n_kkt_complementarity`), blocs ±Bᵀ, condition d'unicité ker Bᵀ = {0}.
- **Pièges** : `n_kkt_sign`, `n_kkt_complementarity`, `n_kkt_multiplier_sign`.
- **Sous-buts → crédit** : `lagrangian` → `a2-lagrange` ; `stationarity`, `cases` → `n-opt-kkt`.

## Pièges du module

Les étiquettes : [R] recherche ; [C] correction d'examen, distracteur d'examen ou remarque d'un cours ; [E] expérience d'enseignement, à faire relire.
- **Plan §8.** Les pièges N du plan sont `n_newton_inverted`, `n_newton_always2`, `n_order_simple_ratio`, `n_simpson_h3_h6`, `n_lu_zero_pivot`, `n_stab_order_confused`, `g9_quant_order` et `n_implicit_as_explicit`. Le plan regroupe les deux premiers sur une seule ligne.
- **Étiquette C.** Les pièges marqués C sans source dans le plan viennent des options fausses des QCM 2019–2022, ou d'une remarque explicite des notes GM.
- **Transformations.** `prev` est la ligne précédente de l'élève, ou l'item pour `wrongValues`.
- **Juges.** La colonne « juges » du format §7 vaut `['value','stat']` pour les réponses finales et `['equiv','series']` pour les lignes. Elle est précisée quand elle diffère : `code` pour les trous de programme, `readtable` pour les lectures.
- **Pièges de code.** Pour un trou de code, `transform` produit le texte fautif du trou. Il sert à la fois de distracteur de QCM et de diagnostic quand l'élève tape exactement ce texte, après normalisation des espaces et des parenthèses superflues.

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `n_rel_by_approx` | numeric | E | `n-err-abs-rel` | `n-err-abs-rel` | e_rel = 1/3000 ÷ 0,667 → ÷ 2/3 | `wrongValues: |x − x̃|/|x̃|` | « Tu as divisé par l'approximation {x̃}. L'erreur relative se rapporte à la valeur exacte {x}. » |
| `n_abs_signed` | numeric | E | `n-err-abs-rel` | `n-err-abs-rel` | e = −1/3000 → 1/3000 | `wrongValues: x − x̃` et `x̃ − x` sans valeur absolue | « Une erreur est une distance : prends la valeur absolue de {e}. » |
| `n_cancel_ignored` | numeric | E | `n-err-float` | `n-err-float` | √1001 − √1000 = 0,02 → 0,01581 | `wrongValues: évaluation de la forme naïve en fp(4)` | « Les deux racines ont les mêmes 3 premiers chiffres : la soustraction les efface. Réécris sans soustraction (conjugué). » |
| `n_eps_absolute` | numeric | E | `n-err-float` | `n-err-float` | erreur sur fl(10²⁰) ≈ 10⁻¹⁶ → ≈ 10⁴ | `wrongValues: ε` au lieu de `ε·|x|` | « L'arrondi garde 16 chiffres **significatifs** : l'erreur est relative, ε·|x| = {ε|x|}. » |
| `n_bisect_no_minus1` | method | E | `n-bisection` | `n-bisection` | k > log₂(1000) = 9,97 → k > 8,97 | `wrongValues: ⌊log₂((b−a)/tol)⌋ + 1` | « Le milieu est à la moitié de l'intervalle du zéro : l'erreur est (b − a)/2^(k+1), d'où le « − 1 ». » |
| `n_bisect_log10` | numeric | E | `n-bisection` | `g2-log-rules` | log₁₀(1000) = 3 → log₂(1000) ≈ 9,97 | `wrongValues: ⌊log₁₀((b−a)/tol)⌋` | « L'intervalle est divisé par **2** à chaque pas : c'est log₂, pas log₁₀. 2¹⁰ ≈ 10³. » |
| `n_bisect_wrong_half` | method | E | `n-bisection` | `n-bisection` | f(1,5) > 0 : garder [1,5 ; 2] → [1 ; 1,5] | `transform: ligne suivante avec l'autre moitié` | « f({a}) et f({x}) sont de signes opposés : le zéro est dans [{a} ; {x}]. » |
| `n_fp_f_vs_phi` | method | E | `n-fp-converge` | `n-fp-converge` | |f′(α)| < 1 → |φ′(α)| < 1 | `wrongValues: décision lue sur f′(α)` | « La condition porte sur la fonction d'itération φ, pas sur f. Ici φ′({α}) = {φ′}. » |
| `n_fp_phi_at_x0` | method | E | `n-fp-converge` | `n-fp-converge` | φ′(x⁽⁰⁾) → φ′(α) | `wrongValues: décision lue sur φ′(x⁽⁰⁾)` | « La convergence locale se décide au point fixe α = {α}, pas au point de départ. » |
| `n_fp_abs_forgot` | method | E | `n-fp-converge` | `n-fp-converge` | φ′(α) = −3 < 1, donc converge → |−3| > 1 | `wrongValues: test φ′(α) < 1 sans valeur absolue` | « φ′({α}) = {φ′} : il faut |φ′(α)| < 1. Une pente très négative fait osciller en s'écartant. » |
| `n_fp_order_count` | method | E | `n-fp-order` | `n-fp-order` | φ′ = φ″ = 0 : ordre 2 → ordre 3 | `wrongValues: p − 1 et p + 1` | « L'ordre est le rang de la **première** dérivée non nulle : ici φ⁽{p}⁾(α) ≠ 0, donc ordre {p}. » |
| `n_order_simple_ratio` | method | E | `n-order-read` | `n-order-read` | δₖ₊₁/δₖ → 0, donc ordre 1 → ordre 2 | `wrongValues (readtable): le plus petit p dont le rapport converge, même vers 0` | « Pour p trop petit, le rapport tend vers 0. On cherche le p où il tend vers une constante **non nulle** : r₂ ≈ {r2}. » |
| `n_order_roundoff_rows` | numeric | E | `n-order-read` | `n-err-float` | rapport 9,8·10⁵ avec δ = 10⁻¹⁶ → ignorer cette ligne | `wrongValues (readtable): conclusion tirée de la dernière ligne` | « À δ ≈ 10⁻¹⁵, l'arrondi domine : ne lis l'ordre que sur les lignes avant. » |
| `n_newton_inverted` | method | E | `n-newton` | `n-newton` | x − f′/f → x − f/f′ | `transform: x_k − f′(x_k)/f(x_k)` ; code : `df(x)/f(x)` | « La tangente coupe l'axe en x − f(x)/f′(x). Avec {x} : f = {f}, f′ = {df}. » |
| `n_newton_sign` | method | E | `n-newton` | `n-newton` | x + f/f′ → x − f/f′ | `transform: x_k + f(x_k)/f′(x_k)` ; code : `-f(x)/df(x)` | « On va vers le zéro de la tangente : on **retire** f/f′. » |
| `n_newton_always2` | method | C | `n-newton-multiple` | `n-newton-multiple` | « Newton est d'ordre 2 » pour (x − 1)² → ordre 1 | `wrongValues: p = 2` quand f′(α) = 0 | « Ici f′(α) = 0 : la racine est multiple et le rapport tend vers 1 − 1/m = {r}. Newton n'est plus que d'ordre 1. » |
| `n_mult_ratio` | method | E | `n-newton-multiple` | `n-newton-multiple` | rapport → 1/m → 1 − 1/m | `wrongValues: 1/m` | « x⁽ᵏ⁺¹⁾ − α = (1 − 1/m)(x⁽ᵏ⁾ − α) : pour m = {m}, le rapport vaut {r}. » |
| `n_newton_sys_sign` | method | E | `n-newton-system` | `n-newton-system` | x⁽¹⁾ = x⁽⁰⁾ + δ → x⁽⁰⁾ − δ avec J·δ = F | `transform: x + δ` | « Avec J·δ = F(x), on pose x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − δ = {x1}. » |
| `n_secant_update` | method | E | `n-secant` | `n-secant` | garder x⁽⁰⁾ et x⁽²⁾ → x⁽¹⁾ et x⁽²⁾ | `transform: ligne suivante calculée avec x_{k−1} figé` | « La sécante utilise les **deux derniers** points. » |
| `n_lagrange_no_denominator` | calculus | E | `n-interp-lagrange` | `n-interp-lagrange` | φ₁ = x(x − 2) → −x(x − 2) | `transform: Π(x − xⱼ) sans diviser par Π(xᵢ − xⱼ)` | « φᵢ doit valoir 1 en xᵢ : ton φ₁(1) = {v}. Divise par cette valeur. » |
| `n_vandermonde_order` | notation | E | `n-interp-lagrange` | `n-interp-lagrange` | (−9, 15, 12) lu comme 12 + 15x − 9x² ou l'inverse | `wrongValues: coefficients dans l'ordre inverse` | « Matlab (polyfit, vander) range les puissances de la plus haute à la plus basse. Vérifie avec p({x0}) = {y0}. » |
| `n_runge_more_nodes` | method | C | `n-interp-error` | `n-interp-error` | « plus de nœuds équirépartis = meilleur » → faux (Runge) | `wrongValues (tf/mcq): « vrai »` | « Le tableau montre l'erreur passer de {e1} à {e2} quand n augmente : c'est le phénomène de Runge. » |
| `n_interp_error_factorial` | calculus | E | `n-interp-error` | `n-interp-error` | max|f‴|/2!·… → /3! | `wrongValues: (n)! au lieu de (n+1)!` | « Pour n + 1 = {n1} nœuds, c'est f⁽ⁿ⁺¹⁾ et (n + 1)! = {fact}. » |
| `n_divdiff_denominator` | calculus | E | `n-divided-diff` | `n-divided-diff` | f[0,1,2] = −18 → −9 | `transform: division par xᵢ₊₁ − xᵢ au lieu de xᵢ₊ₖ − xᵢ` | « On divise par l'écart des abscisses **extrêmes** : 2 − 0 = 2. » |
| `n_cheb_no_mapping` | calculus | E | `n-chebyshev` | `n-chebyshev` | nœuds ±√3/2 sur [0 ; 4] → 2 ± √3 | `wrongValues: tᵢ non transportés` | « cos(…) donne des nœuds dans [−1 ; 1]. Transporte-les : (a + b)/2 + (b − a)/2·t. » |
| `n_p1_bound` | calculus | E | `n-interp-piecewise` | `n-interp-piecewise` | h/8·max|f″| ou h²/2 → h²/8 | `wrongValues: h·M/8, h²·M/2` | « Pour l'interpolation linéaire par morceaux : h²/8·max|f″| = {v}. » |
| `n_spline_natural_first` | calculus | E | `n-spline` | `n-spline` | s′(x₁) = 0 → s″(x₁) = 0 | `transform: équation s′ = 0 aux bords` | « Spline naturelle : la **courbure** s″ est nulle aux bords, pas la pente. » |
| `n_spline_count` | method | E | `n-spline` | `n-spline` | 4n − 3n − n = 0 → 4n − 3(n − 1) − (n + 1) = 2 | `wrongValues: 0, 1, 3 degrés de liberté` | « Les raccords ne se font qu'aux n − 1 nœuds intérieurs, et il y a n + 1 données : il reste 2 conditions. » |
| `n_ls_interp` | method | E | `n-least-squares` | `l-orth-lsq` | résoudre A·α = y (3 équations, 2 inconnues) → AᵀA·α = Aᵀy | `transform: système carré formé de 2 des équations` | « Avec {m} points et 2 inconnues, le système n'a en général pas de solution : multiplie par Aᵀ. » |
| `n_ls_aat` | linear | C | `n-least-squares` | `l-orth-lsq` | (A·Aᵀ)\(A·y) → (Aᵀ·A)\(Aᵀ·y) | `transform: AAᵀ et Ay` ; code : `matmul(mat, At)` | « AAᵀ est m × m ({m} × {m}) et singulière : les équations normales utilisent AᵀA (n × n). » |
| `n_ls_index_swap` | notation | C | `n-least-squares` | `n-least-squares` | Aᵢⱼ = φᵢ(xⱼ) → φⱼ(xᵢ) | `transform: transposée de A` | « Une ligne par donnée, une colonne par fonction de base : Aᵢⱼ = φⱼ(xᵢ). » |
| `n_fd_centered_h` | calculus | E | `n-fd-basic` | `n-fd-basic` | (f(x + h) − f(x − h))/h = 6,02 → /(2h) = 3,01 | `transform: dénominateur h` | « Les deux points sont à 2h l'un de l'autre : divise par 2h = {2h}. » |
| `n_fd_taylor_sign` | calculus | E | `n-fd-build` | `a1-dl-usual` | f(x − h) = f + hf′ + … → f − hf′ + (h²/2)f″ − … | `transform: développement de f(x − kh) avec tous les signes +` | « En x − h, les puissances impaires de h changent de signe. » |
| `n_fd_smaller_h` | numeric | C | `n-fd-roundoff` | `n-fd-roundoff` | « plus h est petit, mieux c'est » → minimum vers 10⁻⁸ | `wrongValues (readtable): le plus petit h` | « Pour h = {h}, l'erreur vaut {e} : l'arrondi divisé par h domine (notes GM). » |
| `n_fd_order_conditions` | method | E | `n-fd-build` | `n-fd-build` | consistance seule ⇒ ordre 2 → il faut aussi annuler le terme en h·f″ | `wrongValues: ordre annoncé + 1` | « Avec ces coefficients, le terme en h·f″ vaut {c}·h ≠ 0 : la formule n'est que d'ordre 1. » |
| `n_proof_same_xi` | logic | E | `n-fd-proof` | `n-fd-proof` | f‴(ξ) − f‴(ξ) = 0 → ξ₁ ≠ ξ₂ | `transform: les deux restes écrits avec le même ξ, puis simplifiés` | « Chaque développement a son propre point intermédiaire : f‴(ξ₁) et f‴(ξ₂) ne se simplifient pas. On les majore. » |
| `n_proof_constant_depends_h` | logic | C | `n-fd-proof` | `g9-quant-read` | C = |f‴(ξ)|/3 → C = 1, avec max|f‴| | `transform: constante finale contenant ξ, h ou N` | « Ta constante contient {sym} : elle doit être indépendante de h (et de f si l'énoncé met max|f⁽ᵖ⁾|). » |
| `n_simpson_h3_h6` | notation | C | `n-quad-composite` | `n-quad-composite` | (h/3)(f₀ + 4f_c + f₁) = 8 → (h/6)(…) = 4 | `transform: facteur h/3 avec h = longueur du sous-intervalle` | « Avec h la longueur de chaque sous-intervalle et c le milieu, le poids est h/6. h/3 vaut quand h est la distance de x à c. » |
| `n_trap_weights` | calculus | E | `n-quad-composite` | `n-quad-composite` | h(f₀ + f₁ + f₂) = 9 → h(f₀/2 + f₁ + f₂/2) = 5 | `transform: poids h aux extrémités` | « Les extrémités a et b n'appartiennent qu'à un seul trapèze : poids h/2. » |
| `n_map_jacobian` | calculus | E | `n-quad-exactness` | `a1-int-subst` | ∫ f(xᵢ + h(t + 1)/2)dt → (h/2)∫… | `transform: facteur h/2 omis` | « x = xᵢ + h(t + 1)/2 donne dx = (h/2)dt. » |
| `n_exactness_stop_early` | method | E | `n-quad-exactness` | `n-quad-exactness` | exacte sur t², donc degré 2 → tester t³ aussi | `wrongValues: dernier monôme testé` | « Le degré est atteint quand un monôme **échoue** : teste t³ ({j3} = {i3} ?), puis t⁴. » |
| `n_exactness_order` | method | E | `n-quad-order` | `n-quad-order` | degré 3 ⇒ ordre 3 → ordre 4 | `wrongValues: p = r` | « Exactitude de degré r ⇒ ordre r + 1 pour la formule composite : ici {r} + 1. » |
| `n_order_ratio_is_p` | numeric | E | `n-quad-order` | `@alg:L-fonction-affine` | rapport 4 ⇒ ordre 4 → 2ᵖ = 4 ⇒ p = 2 | `wrongValues: p = rapport` | « h est divisé par 2 : l'erreur est divisée par 2ᵖ = {r}, donc p = {p}. » |
| `n_proof_sum_count` | calculus | E | `n-quad-proof` | `n-quad-proof` | C = N·h/24 → (b − a)/24 | `transform: constante laissée avec N` | « N·h = b − a : remplace pour obtenir une constante indépendante de h. » |
| `n_regularity_ignored` | method | E | `n-error-statements` | `n-error-statements` | Simpson d'ordre 4 pour √x → ordre ≈ 1,5 | `wrongValues (readtable): p = 4` | « √x n'est pas C⁴ en 0 : le théorème ne s'applique pas, et le tableau donne un rapport ≈ {r}. » |
| `n_more_regularity_more_order` | logic | C | `n-error-statements` | `n-quad-order` | f ∈ C⁵ ⇒ Ch⁵ → toujours Ch⁴ | `wrongValues (tf): « vrai »` | « L'ordre vient du degré d'exactitude, pas de la régularité de f : C⁵ ne donne pas h⁵. » |
| `n_richardson_wrong_p` | method | E | `n-richardson` | `n-richardson` | (2Q_h − Q₂ₕ)/1 → (4Q_h − Q₂ₕ)/3 | `wrongValues: p = 1 ou p = 4` | « Le point milieu est d'ordre p = 2 : utilise 2² = 4. » |
| `n_richardson_swap` | calculus | E | `n-richardson` | `n-richardson` | (4Q₂ₕ − Q_h)/3 → (4Q_h − Q₂ₕ)/3 | `transform: rôles de Q_h et Q₂ₕ échangés` | « Le poids 2ᵖ va sur la formule la plus fine, Q_h. » |
| `n_lu_zero_pivot` | linear | C | `n-lu` | `n-lu` | pivot nul ⇒ « A singulière », ou division par 0 → permuter (PA = LU) | `transform: division par le pivot nul, ou verdict « singulière »` | « Le pivot u₂₂ = 0, mais det B = −18 ≠ 0 : on échange deux lignes (série GM 8). » |
| `n_lu_det_permutation` | linear | E | `n-lu` | `l-det-props` | det B = Π uᵢᵢ = 18 → −18 | `wrongValues: Π uᵢᵢ sans signe de P` | « Une permutation de deux lignes change le signe : det B = Π uᵢᵢ / det P. » |
| `n_cost_inverse` | method | C | `n-lu` | `n-lu` | inv(A)*b « plus rapide » → A\b | `wrongValues (mcq)` | « Calculer A⁻¹ revient à résoudre n systèmes ; A\b n'en résout qu'un (série GM 8). » |
| `n_thomas_index_shift` | notation | C | `n-thomas` | `n-thomas` | `a[i] - d[i]*c[i]` → `d[i-1]*c[i-1]` | `transform (code): décaler les indices du produit de ±1` | « La ligne i est modifiée par la ligne i − 1 : on utilise d et c d'indice i − 1. » |
| `n_thomas_lu_roles` | notation | C | `n-thomas` | `n-thomas` | descente avec `c[i]*b[i]` → `d[i]*b[i]` | `transform (code): échanger c et d` | « L contient la sous-diagonale d (descente) ; U contient c (remontée). » |
| `n_thomas_forget_last` | method | C | `n-thomas` | `n-thomas` | dernière ligne non mise à jour → `a[N-1] -= d[N-2]*c[N-2]` | `transform (code): ligne supprimée` | « La boucle s'arrête à N − 2 parce que c n'a que N − 1 termes ; a[N−1] doit quand même être mis à jour. » |
| `n_jacobi_uses_new` | method | E | `n-iter-jacobi-gs` | `n-iter-jacobi-gs` | Jacobi x₂ = 11/16 → 1/2 | `transform: valeurs déjà mises à jour (GS) dans Jacobi` | « Jacobi n'utilise que les valeurs de l'itération précédente : x₁⁽⁰⁾ = {v}. » |
| `n_diag_dominance` | linear | E | `n-iter-jacobi-gs` | `n-iter-jacobi-gs` | |aᵢᵢ| ≥ Σ|aᵢⱼ| ou par colonnes → > par lignes | `wrongValues: verdict selon le critère faible` | « Il faut |aᵢᵢ| > Σⱼ≠ᵢ |aᵢⱼ| **strictement**, ligne par ligne. Ligne {i} : {aii} contre {s}. » |
| `n_residual_is_error` | numeric | C | `n-iter-convergence` | `m-cond` | ‖r‖ petit ⇒ ‖e‖ petit → ‖e‖/‖x‖ ≤ κ·‖r‖/‖b‖ | `wrongValues (tf)` | « κ(A) = {k} multiplie le résidu relatif : un petit résidu ne suffit pas (notes GM 5.4). » |
| `n_norm_vs_radius` | linear | E | `n-iter-convergence` | `n-iter-convergence` | ‖B‖ ≥ 1 ⇒ diverge → c'est ρ(B) < 1 qui décide | `wrongValues (tf)` | « ‖B‖ < 1 suffit mais n'est pas nécessaire : ici ρ(B) = {rho} < 1. » |
| `n_gradient_step_bound` | method | E | `n-gradient-spd` | `n-gradient-spd` | α < 2/λ_min → α < 2/λ_max | `wrongValues: 2/λ_min, 1/λ_max` | « Le facteur |1 − αλ| doit être < 1 pour **toutes** les valeurs propres ; la plus grande, {lmax}, impose α < {2/lmax}. » |
| `n_gradient_sign` | method | E | `n-gradient-spd` | `n-gradient-spd` | x − αr → x + αr | `transform: x − α·r` | « r = b − Ax = −∇Φ : la descente se fait dans le sens de r. » |
| `n_optimal_step_inverted` | calculus | E | `n-gradient-spd` | `n-gradient-spd` | α = rᵀAr/rᵀr = 2 → rᵀr/rᵀAr = 1/2 | `wrongValues: inverse du pas optimal` | « α minimise Φ(x + αr) = aα² + bα + c, donc α = −b/(2a) = (r·r)/(r·Ar). » |
| `n_implicit_as_explicit` | method | E | `n-ode-euler` | `n-ode-euler` | ER : u₁ = u₀ + h·f(t₀, u₀) = 0,8 → u₁ = 5/6 | `transform: f évaluée en (t_n, u_n)` ; QCM 2019 : f₁ avec u₂ⁿ | « Euler rétrograde évalue f au **nouveau** point (t_{n+1}, u_{n+1}) : c'est une équation à résoudre. » |
| `n_euler_time_index` | notation | E | `n-ode-euler` | `n-ode-euler` | f(t_{n+1}, u_n) → f(t_n, u_n) | `transform: temps et état décalés` | « Progressif : le temps et la valeur du **même** instant t_n. » |
| `n_heun_k2` | calculus | E | `n-ode-rk` | `n-ode-rk` | k₂ = f(t + h, u + k₁) → f(t + h, u + h·k₁) | `transform: h omis dans la prédiction` | « La prédiction est un pas d'Euler : u + h·k₁ = {v}. » |
| `n_cn_explicit` | method | E | `n-ode-rk` | `n-ode-rk` | CN avec f(t_{n+1}, u_n) → f(t_{n+1}, u_{n+1}) | `transform: u_n dans le 2e terme` | « Crank-Nicolson est implicite : u_{n+1} figure dans les deux membres. Sinon, c'est autre chose (proche de Heun). » |
| `n_stab_factor2` | calculus | E | `n-ode-stability` | `n-ode-stability` | h < 1/|λ| → h < 2/|λ| | `wrongValues: 1/|λ|, 2·|λ|` | « |1 + hλ| < 1 ⇔ −2 < hλ < 0 ⇔ h < 2/|λ| = {v}. » |
| `n_stab_order_confused` | method | C | `n-ode-stability` | `n-ode-stability` | « τ grand reste stable, donc ordre élevé » ; « l'erreur /4, donc stable si τ ≤ h²/2 » | `wrongValues (readtable): conclusion de stabilité tirée d'un tableau d'ordre, ou l'inverse` | « Un tableau où h et τ diminuent ensemble mesure l'ordre ; un tableau à τ grand sans explosion mesure la stabilité. » |
| `n_stab_lambda_sign` | calculus | E | `n-ode-stability` | `n-ode-stability` | |1 − hλ| < 1 avec λ = −20 → |1 + hλ| | `transform: signe de λ inversé dans R` | « u_{n+1} = u_n + hλu_n : R = 1 + hλ = 1 − {h|λ|}. » |
| `n_euler_ineq_bound` | logic | E | `n-ode-euler-global` | `n-ode-euler-global` | |aᴺ − bᴺ| ≤ |a − b| → ≤ N|a − b| | `transform: facteur N omis` | « aᴺ − bᴺ = (a − b)·(somme de N termes de module ≤ 1) : le facteur N reste. N·h²/2 = T·h/2. » |
| `n_global_error_order` | method | E | `n-ode-euler-global` | `n-ode-euler-global` | globale O(h²) → O(h) | `wrongValues: p = 2` | « L'erreur locale h²/2 s'accumule sur N = T/h pas : N·h² = T·h. » |
| `n_h_le_2_forgotten` | logic | E | `n-ode-euler-global` | `n-ode-euler-global` | |1 − h| ≤ 1 toujours → seulement si 0 < h ≤ 2 | `transform: bloc « |1 − h| ≤ 1 » sans condition` | « Pour h = 3, |1 − h| = 2 > 1 : c'est pourquoi l'énoncé suppose h ≤ 2. » |
| `n_stiff_accuracy` | method | E | `n-ode-stiff` | `n-ode-stability` | explosion ⇒ « réduire la tolérance » → stabilité | `wrongValues (mcq)` | « La solution est lisse ; c'est le mode λ = {λ} qui explose : condition de stabilité, pas de précision. » |
| `n_bvp_bc_rhs` | method | E | `n-bvp-fd` | `n-bvp-fd` | f̃₁ = f(x₁) → f(x₁) + α/h² | `transform: conditions aux bords omises` | « u₀ = {α} est connu : le terme −u₀/h² passe à droite et devient +{α}/h². » |
| `n_bvp_h2_missing` | calculus | C | `n-bvp-fd` | `n-fd-basic` | A = tridiag(−1, 2, −1) → (1/h²)·tridiag | `transform: facteur 1/h² omis` | « La différence centrée de u″ est divisée par h² = {h2}. » |
| `n_spd_semidefinite` | linear | C | `n-bvp-fd` | `m-posdef` | xᵀAx ≥ 0 ⇒ SDP → il faut > 0 si x ≠ 0 | `wrongValues (mcq 2019, question 1)` | « A·1 = 0 : x = (1, …, 1) donne xᵀAx = 0. A est semi-définie, pas définie positive. » |
| `n_truncation_constant` | calculus | E | `n-bvp-convergence` | `n-bvp-convergence` | h²/24 ou h²/6 → h²/12 | `wrongValues: h²/24, h²/6` | « Les deux restes h⁴/24·u⁽⁴⁾ s'additionnent puis sont divisés par h² : 2·h²/24 = h²/12. » |
| `n_stability_skipped` | logic | E | `n-bvp-convergence` | `n-bvp-convergence` | τ = O(h²) ⇒ e = O(h²) → il faut Ae = τ et la stabilité 1/8 | `transform: bloc « donc l'erreur est O(h²) » juste après la consistance` | « La consistance ne suffit pas : c'est la stabilité ‖A⁻¹‖ ≤ 1/8 qui transmet O(h²) à l'erreur. » |
| `n_jacobian_vs_F` | calculus | C | `n-bvp-newton` | `n-newton-system` | a(i) = 2·coeff + x(i)³ − 1 → + 3x(i)² | `transform (code): terme de F mis dans DF, et inversement` | « La diagonale de DF contient la **dérivée** de xᵢ³ − 1, soit 3xᵢ² ; xᵢ³ − 1 va dans F (vecteur b). » |
| `n_cholesky_tridiag_sq` | linear | C | `n-bvp-newton` | `m-cholesky` | sqrt(a(i+1) − a(i)²) → sqrt(a(i+1) − c(i)²) | `transform (code): a[i]*a[i] ou a[i]*c[i]` | « ℓᵢ₊₁,ᵢ₊₁² + ℓᵢ₊₁,ᵢ² = aᵢ₊₁ : on retire le carré du terme **sous-diagonal** c(i). » |
| `n_heat_tau_h` | calculus | C | `n-heat-implicit` | `n-heat-implicit` | a(i) = 1 + 2τ → 1 + 2τ/h² | `transform (code): τ au lieu de τ/h²` | « Après multiplication par τ, la dérivée seconde donne τ/h² = {r}. » |
| `n_heat_2tau` | calculus | C | `n-heat-implicit` | `n-heat-implicit` | 1 + τ/h² → 1 + 2τ/h² | `transform (code): facteur 2 omis` | « Le terme central de −(uᵢ₋₁ − 2uᵢ + uᵢ₊₁)/h² est 2uᵢ/h². » |
| `n_heat_ic_tau` | method | C | `n-heat-implicit` | `n-heat-implicit` | b(i) = τ·sin(πxᵢ) → sin(πxᵢ) | `transform (code): facteur τ ou τ/h²` | « Le système est Auⁿ⁺¹ = uⁿ : au départ, b = u⁰ = sin(πxᵢ), sans facteur. » |
| `n_heat_order_h_tau` | method | C | `n-heat-implicit` | `n-order-read` | erreur /4 avec h/2, τ/4 ⇒ O(h + τ) → O(h² + τ) | `wrongValues (readtable): O(h + τ)` | « h/2 donne h²/4, et τ/4 donne τ/4 : les deux termes divisent par 4. Avec O(h + τ), h/2 n'aurait donné que /2. » |
| `n_cfl_direction` | method | C | `n-pde-cfl` | `n-pde-cfl` | décentré avec uᵢ₋₁ → uᵢ₊₁ | `transform (code): i − 1 au lieu de i + 1` | « ∂u/∂t − ∂u/∂x = 0 : u(x, t) = u₀(x + t), l'information vient de la droite. » |
| `n_wave_lambda` | calculus | C | `n-pde-cfl` | `n-pde-cfl` | λ = τ/h → τ²/h² | `transform (code): tau/h, tau^2/h, tau/h^2` | « Les deux dérivées sont d'ordre 2 : τ² au numérateur, h² au dénominateur. » |
| `n_weak_space_bc` | method | C | `n-fem-hat` | `n-fem-hat` | V sans g(0) = g(1) = 0, ou avec une condition de Neumann | `wrongValues (mcq 2020–2022)` | « Les conditions de Dirichlet entrent dans V ; une condition de Neumann sort de l'intégration par parties (naturelle). » |
| `n_hat_derivative` | calculus | C | `n-fem-hat` | `n-fem-hat` | ∫(φ₁′)² = 2 ⇒ α = 1/4 → 4 ⇒ 1/8 | `wrongValues: 1/4, 1/2, 1/16` | « φ₁ monte de 0 à 1 sur une longueur 1/2 : pente 2, et ∫(φ₁′)² = 2²·1 = 4. » |
| `n_weak_sign` | calculus | E | `n-fem-hat` | `a1-int-parts` | −∫u′v′ = ∫fv → ∫u′v′ = ∫fv | `transform: signe de l'intégration par parties` | « −∫u″v = −[u′v] + ∫u′v′, et [u′v] = 0 car v(0) = v(1) = 0. » |
| `n_kkt_sign` | calculus | C | `n-opt-kkt` | `n-opt-kkt` | Ax − b + λ₁ − λ₂ → Ax − b − λ₁ + λ₂ | `transform: signes des multiplicateurs inversés` | « L = f − λ₁ᵀ(x + c) − λ₂ᵀ(−x + c) : ∇ₓL = Ax − b − λ₁ + λ₂. » |
| `n_kkt_complementarity` | method | C | `n-opt-kkt` | `n-opt-kkt` | (λ₁)ᵢ(xᵢ − cᵢ) = 0 → (λ₁)ᵢ(xᵢ + cᵢ) = 0 | `transform: contrainte associée au mauvais multiplicateur` | « Chaque λ multiplie **sa** contrainte : λ₁ va avec x + c ≥ 0. » |
| `n_kkt_multiplier_sign` | method | E | `n-opt-kkt` | `a2-lagrange` | λ = −2 accepté → λ ≥ 0 exigé | `wrongValues: solution avec λ < 0` | « Pour une inégalité g ≥ 0, le multiplicateur doit être ≥ 0. Avec λ = {λ}, ce point n'est pas un minimum sous contrainte. » |

## Exemples de type examen

Les énoncés sont reformulés et les nombres changés. Les QCM suivent le barème des examens : +1/N par bonne case, −1/M par mauvaise case, 0 si vide. Les vrai/faux comptent +1, 0 ou −1. Les questions ouvertes sont notées par étape (les `points` du `problem`). Il n'y a pas de calculatrice : chaque tableau est fourni.

### Problème 1 — Chaleur, Euler implicite et LU tridiagonale (9 QCM, 9 points ; modèle 2019 et 2022)

On cherche u(x, t) telle que ∂u/∂t − ∂²u/∂x² = 0 sur ]0 ; 1[ × ]0 ; +∞[, avec u(0, t) = u(1, t) = 0 et u(x, 0) = sin(2πx). La solution exacte est e^(−4π²t)·sin(2πx). On prend h = 1/(N + 1), τ > 0, une différence rétrograde en t et centrée en x, au point (xᵢ, t_{n+1}). Le programme Python `heat_implicit` de `n-heat-implicit` est donné, avec `sin(2*pi*(i+1)*h)` et `exp(-4*pi*pi*t)`, et 9 trous.

| Étape | Question | Bonne réponse | Points | Compétence |
|---|---|---|---|---|
| 1 | `b[i] = ???` | `math.sin(2 * math.pi * (i + 1) * h)` | 1 | `n-heat-implicit` |
| 2 | `a[i] = 1 + ???` | `2 * tau / (h * h)` | 1 | `n-heat-implicit` |
| 3 | `d[i] = -???` (et `c[i]`) | `tau / (h * h)` | 1 | `n-heat-implicit` |
| 4 | `a[i] = a[i] - ???` | `d[i - 1] * c[i - 1]` | 1 | `n-thomas` |
| 5 | `c[i] = c[i] / ???` | `a[i]` | 1 | `n-thomas` |
| 6 | `b[i + 1] = (b[i + 1] - ???) / a[i + 1]` | `d[i] * b[i]` | 1 | `n-thomas` |
| 7 | `b[i] = b[i] - ???` | `c[i] * b[i + 1]` | 1 | `n-thomas` |
| 8 | Tableau A, ci-dessous : on en déduit… | « converge à l'ordre O(h² + τ) » | 1 | `n-heat-implicit` |
| 9 | Tableau B, ci-dessous : on en déduit… | « stable pour tous h > 0, τ > 0 » | 1 | `n-ode-stability` |

Tableau A (recalculé avec le programme de référence) :

| N | M | τ | erreur max au temps final |
|---|---|---|---|
| 9 | 10 | 0.005 | 3.352212e-02 |
| 19 | 40 | 0.00125 | 8.971245e-03 |
| 39 | 160 | 0.0003125 | 2.252158e-03 |
| 79 | 640 | 0.000078125 | 5.636110e-04 |

Tableau B (recalculé à l'étape U9 avec le programme de référence) : (9, 200, 0,01) : 3.860579e-24 ; (9, 200, 0,1) : 4.468324e-76 ; (19, 200, 0,01) : 1.209868e-24 ; (19, 200, 0,1) : 4.169160e-76 ; (39, 200, 1) : 5.484563e-223. Ces erreurs sont du bruit d'arrondi amorti par le schéma (la solution exacte vaut ~10⁻³⁵) : leurs chiffres dépendent de la machine ; l'examen donnait 1.027960e-24, 5.287283e-76, 1.693745e-24, 6.999844e-76 et 5.076334e-223. Seul l'ordre de grandeur se lit.

Les options fausses des questions 8 et 9 sont « O(h + τ) », « stable si τ ≤ h²/2 », et l'option juste de l'autre tableau (`n_stab_order_confused`).

### Problème 2 — −u″ = f par différences finies (question ouverte, 9 points ; modèle 2020 et 2022)

Soit −u″ = π²·sin(πx) sur ]0 ; 1[, u(0) = u(1) = 0, de solution u = sin(πx). On prend h = 1/(N + 1) et xᵢ = ih.

| Étape | Demande | Attendu | Points | Juge | Compétence |
|---|---|---|---|---|---|
| a | Écrire le schéma centré | (−uᵢ₋₁ + 2uᵢ − uᵢ₊₁)/h² = π² sin(πxᵢ), u₀ = u_{N+1} = 0 | 1 | `equiv` | `n-bvp-fd` |
| b | Écrire Au = f (A, u, f explicites) | A = (1/h²)·tridiag(−1, 2, −1) | 1 | `matrix` | `n-bvp-fd` |
| c | Montrer que A est SDP | vᵀAv = (1/h²)(v₁² + Σ(vᵢ₊₁ − vᵢ)² + v_N²) > 0 | 1,5 | `equiv` + `blocks` | `n-bvp-fd` |
| d | Définir rᵢ et montrer |rᵢ| ≤ Ch² | rᵢ = −(h²/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋)), |rᵢ| ≤ (π⁴/12)h² | 2 | `series` + `value` | `n-bvp-convergence` |
| e | Montrer A(w − u) = r | soustraction des deux systèmes | 0,5 | `blocks` | `n-bvp-convergence` |
| f | Avec ‖v‖∞ ≤ (1/8)‖Av‖∞ (admis), majorer l'erreur | max|u(xᵢ) − uᵢ| ≤ (π⁴/96)h² | 1,5 | `value` | `n-bvp-convergence` |
| g | Avec L(v) = ½vᵀAv − fᵀv, montrer L(v) = L(u) + (v − u)ᵀ(Au − f) + ½(v − u)ᵀA(v − u), puis L(v) ≥ L(u) | développement, Au = f, A SDP | 1,5 | `equiv` + `blocks` | `n-gradient-spd` |

Le `readtable` de contrôle (erreurs 8.265e-03, 2.059e-03, 5.142e-04 pour N = 9, 19, 39, sous la borne π⁴h²/96) sert de vérification après la preuve. Il n'est pas noté.

### Problème 3 — Ordre d'une formule de quadrature composite (question ouverte, 10 points ; modèle 2021, avec un point de 2019)

Soit f ∈ C²[a ; b], h = (b − a)/N, xᵢ = a + ih. On approche ∫₋₁¹ g par J(g) = 2g(0).

| Étape | Demande | Attendu | Points | Compétence |
|---|---|---|---|---|
| a | Montrer ∫ₐᵇ f = (h/2)·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2)dt | changement de variable x = xᵢ + h(t + 1)/2 sur chaque [xᵢ ; xᵢ₊₁] | 1,5 | `n-quad-exactness` |
| b | Définir L_h(f) | L_h(f) = h·Σᵢ f(xᵢ + h/2) | 1 | `n-quad-composite` |
| c | Écrire f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t), avec pᵢ ∈ P₁ | pᵢ(t) = f(cᵢ) + (ht/2)f′(cᵢ) ; rᵢ(t) = (h²t²/8)f″(ξ) | 2 | `n-quad-proof` |
| d | Montrer ∫f − L_h(f) = (h/2)·Σ ∫₋₁¹ rᵢ(t)dt | J exacte sur P₁ et J(rᵢ) = 2rᵢ(0) = 0 | 1,5 | `n-quad-proof` |
| e | Montrer |∫f − L_h(f)| ≤ Ch², avec C explicite | C = (b − a)/24·max|f″| | 2,5 | `n-quad-proof` |
| f | Même question avec J(g) = 2g(1) | ordre 1, C = (b − a)/2·max|f′| | 1,5 | `n-quad-proof` |

Les distracteurs de ligne à diagnostiquer sont `n_map_jacobian` en (a), `n_proof_sum_count` en (e) et `n_proof_constant_depends_h` en (e) et (f).

### Problème 4 — Erreur globale d'Euler (question ouverte, 4 points ; modèle 2020 et 2022)

Soit u′(t) = −u(t) sur ]0 ; 20], u(0) = 1, h = 20/N, t_n = nh. On utilise Euler progressif.

| Étape | Demande | Attendu | Points | Compétence |
|---|---|---|---|---|
| a | u(t) et le schéma ; montrer u(t_N) − u_N = e^(−Nh) − (1 − h)ᴺ | u_{n+1} = (1 − h)u_n | 0,5 | `n-ode-euler` |
| b | Montrer |e^(−x) − (1 − x)| ≤ x²/2 pour x > 0 | Taylor-Lagrange, e^(−ξ) ≤ 1 | 1 | `n-ode-euler-global` |
| c | Montrer |u(t_N) − u_N| ≤ (h²/2)(1 + |1 − h| + … + |1 − h|^(N−1)) | factorisation aᴺ − bᴺ, |e^(−h)| ≤ 1 | 1,5 | `n-ode-euler-global` |
| d | En déduire |u(t_N) − u_N| ≤ 10h pour 0 < h ≤ 2 | |1 − h| ≤ 1, N termes, Nh = 20 | 1 | `n-ode-euler-global` |

### Problème 5 — Forme faible et fonction chapeau (3 QCM et une question courte, 5 points ; modèle 2020 à 2022)

Soit −u″ = 1 sur ]0 ; 1[, u(0) = u(1) = 0.

| Étape | Question | Bonne réponse | Points | Compétence |
|---|---|---|---|---|
| 1 | (QCM) Espace V de la forme faible ∫u′v′ = ∫v | {g continue, g′ continue par morceaux, g(0) = g(1) = 0} | 1 | `n-fem-hat` |
| 2 | (QCM) Même question si la condition à droite est u′(1) = 0 | {…, g(0) = 0} (condition de Neumann naturelle) | 1 | `n-fem-hat` |
| 3 | (QCM) V₁ = span(φ₁), φ₁ chapeau centré en 1/3 (φ₁ = 3x sur [0 ; 1/3], (3/2)(1 − x) sur [1/3 ; 1]) ; u₁ = αφ₁ : α = ? | 1/9 (∫(φ₁′)² = 9/2, ∫φ₁ = 1/2) | 1 | `n-fem-hat` |
| 4 | (ouverte) Vérifier que u₁(1/3) = u(1/3) | u = x(1 − x)/2, u(1/3) = 1/9 | 2 | `n-fem-hat` |

Les distracteurs de l'étape 3 sont 1/8 (le chapeau centré en 1/2), 1/4 et 2/9 ; ils viennent de `n_hat_derivative`.

### Problème 6 — Prouver l'ordre d'une formule de différences finies (question ouverte, 7 points ; modèle 2019)

Soit f ∈ C³[x₀ − 2 ; x₀]. Montrer que pour tout 0 < h ≤ 1 : |f′(x₀) − (3f(x₀) − 4f(x₀ − h) + f(x₀ − 2h))/(2h)| ≤ h²·max_{[x₀−2 ; x₀]}|f‴|.

| Étape | Attendu | Points | Juge | Compétence |
|---|---|---|---|---|
| 1 | f(x₀ − h) = f − hf′ + (h²/2)f″ − (h³/6)f‴(ξ₁), ξ₁ ∈ ]x₀ − h ; x₀[ | 1,5 | `series` | `n-fd-proof` |
| 2 | f(x₀ − 2h) = f − 2hf′ + 2h²f″ − (4h³/3)f‴(ξ₂), ξ₂ ∈ ]x₀ − 2h ; x₀[ | 1,5 | `series` | `n-fd-proof` |
| 3 | 3f − 4f(x₀ − h) + f(x₀ − 2h) = 2hf′ + (2h³/3)f‴(ξ₁) − (4h³/3)f‴(ξ₂) | 1,5 | `equiv` | `n-fd-build` |
| 4 | Division par 2h, inégalité triangulaire : ≤ (1/3 + 2/3)h²·max|f‴| | 1,5 | `blocks` | `n-fd-proof` |
| 5 | ξ₁, ξ₂ ∈ [x₀ − 2 ; x₀] car h ≤ 1 ; C = 1 indépendante de h | 1 | `blocks` + `value` | `n-fd-proof` |

Les pièges diagnostiqués sont `n_fd_taylor_sign` aux étapes 1 et 2, `n_proof_same_xi` à l'étape 4 et `n_proof_constant_depends_h` à l'étape 5.

## Extensions du README demandées par ce catalogue

Ces points sont utilisés plus haut. Ils sont à trancher ou à ajouter au README avant l'étape U8.

1. **Juge `iter` à état.** `phi` peut être un objet `{kind:'bisection'|'secant'|'jacobi'|'gs'|'ode'|'gradient', …}`. Il calcule la ligne k + 1 à partir de la ligne k de l'élève, et de la ligne k − 1 pour la sécante. Le README ne prévoit qu'une fonction Φ scalaire.
2. **Tolérance relative ou significative.** `stat` a `{decimals}`. Le module N a besoin de `{sig: k}` (k chiffres significatifs) pour des valeurs comme 3,3·10⁻⁴.
3. **Tests de code.** Il faut une tolérance absolue `atol` en plus de `tol` relative, pour les valeurs attendues proches de 0, comme `cheb(2, -1, 1)[1]` ou `lu(A)[0][2][1]`.
4. **Interpréteur Python.** Il doit accepter `range(a, b, pas)` avec un pas négatif (toutes les remontées), le passage de fonctions définies par `def` en argument (`newton(f, df, …)`) et `max`/`abs` sur des flottants. Les listes de listes en retour suffisent : on n'a pas besoin de tuples.
5. **Juge `series` avec une fonction abstraite.** Les preuves d'ordre développent f(x₀ + kh) avec f quelconque. Proposition : `{abstract:{f:'C3'}, remainder:'lagrange'}`. Les symboles f(x₀), f′(x₀), …, f‴(ξᵢ) sont libres, et la ligne est contrôlée en substituant 3 fonctions test (polynômes aléatoires de degré order + 1, e^(ax)), avec ξᵢ remplacé par x₀ au premier ordre du reste. Le même mécanisme sert à `definite` pour le changement de variable de `n-quad-proof`.
6. **Arithmétique simulée.** `value` `{arith:'fp', digits:4}` juge une ligne d'après `fp.js` dans `n-err-float`.
7. **Pool de l'examen `ba4-numerique`.** Les examens MT 2020 et 2021 contiennent des QCM de SVD et de méthode de la puissance, qui sont des compétences de M. Proposition : `pool:{units:['numerique'], extraSkills:['<id M de la SVD>', '<id M de la puissance>']}`, avec `examWeight` 1 chacune. Les poids d'examen N ci-dessus sont tirés du nombre de questions de chaque compétence dans les examens 2019 à 2022.

État à l'étape U9 : les points 1 (juge `iter` à état, `js/judges/iter-num.js`), 2 (`stat` avec `sig`, déjà là depuis U7), 3 (`atol`), 4 (pas négatif, fonctions en argument), 6 (`value` `{arith: 'fp'}`) et 7 (`extraSkills` du plan `ba4-numerique`) sont faits. Le point 5 (fonctions abstraites) ne l'est pas : les preuves d'ordre utilisent des lettres pour f(x₀), f′(x₀)… et f‴(ξᵢ), jugées par `equiv`.
