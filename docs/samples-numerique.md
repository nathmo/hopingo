# Exemples de questions — Analyse numérique

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Erreurs absolue et relative ; arrondis (`n-err-abs-rel`, BA4)

_Mesurer l'écart à la valeur exacte, en valeur absolue et rapporté à la valeur exacte._

### Niveau 1

```
x = 29/7 est approché par x̃ = 4,143 (arrondi à 4 chiffres significatifs). Calcule l'erreur absolue e_abs = |x̃ − x|, puis l'erreur relative e_rel = e_abs/|x|, en fractions exactes.
  [guided]  |4,143 − 29/7|
    = |□/7000 − □/7000|   (trous : |29001/7000 − 29000/7000|)   ← Même dénominateur
    = □   (trous : 1/7000)   ← e_abs
  — L'erreur relative : e_rel = e_abs/|x|.  [juge value]  départ : E_r
    = (1/7000)/(□)   (trous : (1/7000)/(29/7))   ← On divise par la valeur exacte
    = □   (trous : 1/29000)   ← Fraction irréductible
  aides : L'erreur relative divise l'erreur absolue par la valeur exacte x. | e_rel = (1/7000)/|□| | e_abs = |29001/7000 − 29000/7000| = 1/7000, e_rel = (1/7000)/(29/7) = 1/29000.
  pièges : n_rel_by_approx, n_abs_signed

Complète la fonction errors(x, xt), qui renvoie [erreur absolue, erreur relative] de l'approximation xt de la valeur exacte x (x ≠ 0).
  [code python, 1 trou]
    | def errors(x, xt):
    |     ea = abs(x - xt)
    |     er = ⟦·ea * abs(x) | ·ea / abs(xt) [n_rel_by_approx] | ✔ea / abs(x) | ·ea / x [n_abs_signed]⟧
    |     return [ea, er]
    test : errors(2/3, 0.667) → [3.3333333333e-4, 5.0e-4]
    test : errors(1000, 999) → [1, 0.001]
    test : errors(-2, -2.1) → [0.1, 0.05]
  pièges : n_rel_by_approx, n_abs_signed

x = 9/7 est approché par x̃ = 1,286 (arrondi à 4 chiffres significatifs). Calcule l'erreur absolue e_abs = |x̃ − x|, puis l'erreur relative e_rel = e_abs/|x|, en fractions exactes.
  [guided]  |1,286 − 9/7|
    = |□/3500 − □/3500|   (trous : |4501/3500 − 4500/3500|)   ← Même dénominateur
    = □   (trous : 1/3500)   ← e_abs
  — L'erreur relative : e_rel = e_abs/|x|.  [juge value]  départ : E_r
    = (1/3500)/(□)   (trous : (1/3500)/(9/7))   ← On divise par la valeur exacte
    = □   (trous : 1/4500)   ← Fraction irréductible
  aides : L'erreur relative divise l'erreur absolue par la valeur exacte x. | e_rel = (1/3500)/|□| | e_abs = |4501/3500 − 4500/3500| = 1/3500, e_rel = (1/3500)/(9/7) = 1/4500.
  pièges : n_rel_by_approx, n_abs_signed

```

### Niveau 2

```
x = 24/7 est approché par x̃ = 3,43 (arrondi à 3 chiffres significatifs). Calcule l'erreur absolue e_abs = |x̃ − x|, puis l'erreur relative e_rel = e_abs/|x|, en fractions exactes.
  [guided]  |3,43 − 24/7|
    = |□/700 − □/700|   (trous : |2401/700 − 2400/700|)   ← Même dénominateur
    = 1/700   ← e_abs
  — L'erreur relative : e_rel = e_abs/|x|.  [juge value]  départ : E_r
    ? Par quoi divises-tu l'erreur absolue ? ✔ Par |x| = 24/7, la valeur exacte / · Par |x̃| = 3,43, l'approximation
    = (1/700)/(□)   (trous : (1/700)/(24/7))   ← On divise par la valeur exacte
    = □   (trous : 1/2400)   ← Fraction irréductible
  aides : L'erreur relative divise l'erreur absolue par la valeur exacte x. | e_rel = (1/700)/|□| | e_abs = |2401/700 − 2400/700| = 1/700, e_rel = (1/700)/(24/7) = 1/2400.
  pièges : n_rel_by_approx, n_abs_signed

Complète la fonction errors(x, xt), qui renvoie [erreur absolue, erreur relative] de l'approximation xt de la valeur exacte x (x ≠ 0).
  [code python, 1 trou]
    | def errors(x, xt):
    |     ea = abs(x - xt)
    |     er = ⟦ea / abs(x)⟧
    |     return [ea, er]
    test : errors(2/3, 0.667) → [3.3333333333e-4, 5.0e-4]
    test : errors(1000, 999) → [1, 0.001]
    test : errors(-2, -2.1) → [0.1, 0.05]
  pièges : n_rel_by_approx, n_abs_signed

x = 3/11 est approché par x̃ = 0,273 (arrondi à 3 chiffres significatifs). Calcule l'erreur absolue e_abs = |x̃ − x|, puis l'erreur relative e_rel = e_abs/|x|, en fractions exactes.
  [guided]  |0,273 − 3/11|
    = |□/11000 − □/11000|   (trous : |3003/11000 − 3000/11000|)   ← Même dénominateur
    = 3/11000   ← e_abs
  — L'erreur relative : e_rel = e_abs/|x|.  [juge value]  départ : E_r
    ? Par quoi divises-tu l'erreur absolue ? ✔ Par |x| = 3/11, la valeur exacte / · Par |x̃| = 0,273, l'approximation
    = (3/11000)/(□)   (trous : (3/11000)/(3/11))   ← On divise par la valeur exacte
    = □   (trous : 1/1000)   ← = 0,001
  aides : L'erreur relative divise l'erreur absolue par la valeur exacte x. | e_rel = (3/11000)/|□| | e_abs = |3003/11000 − 3000/11000| = 3/11000, e_rel = (3/11000)/(3/11) = 1/1000.
  pièges : n_rel_by_approx, n_abs_signed

```

### Niveau 3

```
x = 4/3 est approché par x̃ = 1,3 (arrondi à 2 chiffres significatifs). Calcule l'erreur absolue e_abs = |x̃ − x|, puis l'erreur relative e_rel = e_abs/|x|, en fractions exactes.
  [tap, suivre l'erreur, menu menu]  |1,3 − 4/3|
    = |39/30 − 40/30|   ← Même dénominateur
    = 1/30   ← e_abs
  — L'erreur relative : e_rel = e_abs/|x|.  [juge value]  départ : E_r
    = (1/30)/(4/3)   ← On divise par la valeur exacte
    = 1/40   ← = 0,025
  aides : L'erreur relative divise l'erreur absolue par la valeur exacte x. | e_rel = (1/30)/|□| | e_abs = |39/30 − 40/30| = 1/30, e_rel = (1/30)/(4/3) = 1/40.
  pièges : n_rel_by_approx, n_abs_signed

x = 11/3 est approché par x̃ = 3,67 (arrondi à 3 chiffres significatifs). Calcule l'erreur absolue e_abs = |x̃ − x|, puis l'erreur relative e_rel = e_abs/|x|, en fractions exactes.
  [tap, suivre l'erreur, menu menu]  |3,67 − 11/3|
    = |1101/300 − 1100/300|   ← Même dénominateur
    = 1/300   ← e_abs
  — L'erreur relative : e_rel = e_abs/|x|.  [juge value]  départ : E_r
    = (1/300)/(11/3)   ← On divise par la valeur exacte
    = 1/1100   ← Fraction irréductible
  aides : L'erreur relative divise l'erreur absolue par la valeur exacte x. | e_rel = (1/300)/|□| | e_abs = |1101/300 − 1100/300| = 1/300, e_rel = (1/300)/(11/3) = 1/1100.
  pièges : n_rel_by_approx, n_abs_signed

x = 27/11 est approché par x̃ = 2,455 (arrondi à 4 chiffres significatifs). Calcule l'erreur absolue e_abs = |x̃ − x|, puis l'erreur relative e_rel = e_abs/|x|, en fractions exactes.
  [tap, suivre l'erreur, menu menu]  |2,455 − 27/11|
    = |5401/2200 − 5400/2200|   ← Même dénominateur
    = 1/2200   ← e_abs
  — L'erreur relative : e_rel = e_abs/|x|.  [juge value]  départ : E_r
    = (1/2200)/(27/11)   ← On divise par la valeur exacte
    = 1/5400   ← Fraction irréductible
  aides : L'erreur relative divise l'erreur absolue par la valeur exacte x. | e_rel = (1/2200)/|□| | e_abs = |5401/2200 − 5400/2200| = 1/2200, e_rel = (1/2200)/(27/11) = 1/5400.
  pièges : n_rel_by_approx, n_abs_signed

```

### Niveau 4

```
Complète la fonction errors(x, xt), qui renvoie [erreur absolue, erreur relative] de l'approximation xt de la valeur exacte x (x ≠ 0).
  [code python, 2 trous]
    | def errors(x, xt):
    |     ea = ⟦abs(x - xt)⟧
    |     er = ⟦ea / abs(x)⟧
    |     return [ea, er]
    test : errors(2/3, 0.667) → [3.3333333333e-4, 5.0e-4]
    test : errors(1000, 999) → [1, 0.001]
    test : errors(-2, -2.1) → [0.1, 0.05]
  pièges : n_abs_signed, n_rel_by_approx

Deux mesures : A, x = 200 approché par x̃ = 199 ; B, x = 0,02 approché par x̃ = 0,022. Calcule les erreurs absolues et relatives (décimaux exacts), puis dis quelle approximation est la meilleure au sens relatif.
  [free, suivre l'erreur]  E
    (e_abs de A.)
    = 1   ← |199 − 200|
  — e_rel de A.  [juge value]  départ : E_r
    = 0,005   ← 1/200
  — e_abs de B.  [juge value]  départ : E
    = 0,002   ← |0,022 − 0,02|
  — e_rel de B.  [juge value]  départ : E_r
    = 0,1   ← 0,002/0,02
  — Quelle approximation est la meilleure au sens relatif ? Écris son x̃.  [juge value]  départ : X
    = 199   ← 0,005 < 0,1, alors que e_abs(A) > e_abs(B)
  aides : L'erreur absolue dépend de l'échelle ; l'erreur relative la divise par |x| pour comparer. | e_rel(B) = 0,002/□ | e_rel(A) = 0,005, e_rel(B) = 0,1 : A est meilleure en relatif.
  pièges : n_rel_by_approx, n_abs_signed

Complète la fonction errors(x, xt), qui renvoie [erreur absolue, erreur relative] de l'approximation xt de la valeur exacte x (x ≠ 0).
  [code python, 2 trous]
    | def errors(x, xt):
    |     ea = ⟦abs(x - xt)⟧
    |     er = ⟦ea / abs(x)⟧
    |     return [ea, er]
    test : errors(2/3, 0.667) → [3.3333333333e-4, 5.0e-4]
    test : errors(1000, 999) → [1, 0.001]
    test : errors(-2, -2.1) → [0.1, 0.05]
  pièges : n_abs_signed, n_rel_by_approx

```

### Niveau 5

```
Itérés de Newton pour √7 ≈ 2,64575131, à partir de x⁽⁰⁾ = 3. Calcule les erreurs relatives.
  [tableau à lire, sans aide]
    k | x⁽ᵏ⁾
    0 | 3,0000000
    1 | 2,6666667
    2 | 2,6458333
    3 | 2,6457513
    4 | 2,6457513
  question : À partir de quel k l'itéré x⁽ᵏ⁾ a-t-il 5 chiffres significatifs exacts, c'est-à-dire e_rel ≤ 5·10⁻⁵ ?
      → 2

Itérés de Newton pour √3 ≈ 1,73205081, à partir de x⁽⁰⁾ = 2. Calcule les erreurs relatives.
  [tableau à lire, sans aide]
    k | x⁽ᵏ⁾
    0 | 2,0000000
    1 | 1,7500000
    2 | 1,7321429
    3 | 1,7320508
    4 | 1,7320508
  question : À partir de quel k l'itéré x⁽ᵏ⁾ a-t-il 5 chiffres significatifs exacts, c'est-à-dire e_rel ≤ 5·10⁻⁵ ?
      → 3

Itérés de Newton pour √3 ≈ 1,73205081, à partir de x⁽⁰⁾ = 2. Calcule les erreurs relatives.
  [tableau à lire, sans aide]
    k | x⁽ᵏ⁾
    0 | 2,0000000
    1 | 1,7500000
    2 | 1,7321429
    3 | 1,7320508
    4 | 1,7320508
  question : À partir de quel k l'itéré x⁽ᵏ⁾ a-t-il 5 chiffres significatifs exacts, c'est-à-dire e_rel ≤ 5·10⁻⁵ ?
      → 3

```

### Variantes d'examen

```
Une longueur est mesurée : L = 50 cm, à ±0,1 cm près. Quelle est l'erreur relative maximale, en pourcentage ?
  · 0,002 %   · 10 %   · 2 %   ✔ 0,2 %
  [examen mcq]

Vrai ou faux ?
  « Si x̃ est l'arrondi de x ≠ 0 à 3 chiffres significatifs, alors l'erreur relative vérifie e_rel ≤ 5·10^−3. » → VRAI
  [examen tf]

```

## Virgule flottante, ε machine, annulation (`n-err-float`, BA4)

_Un ordinateur arrondit chaque opération ; soustraire deux nombres proches efface des chiffres._

### Niveau 1

```
En arithmétique à 4 chiffres significatifs (on arrondit après chaque opération), calcule 1 − cos(0,005) par la forme stable.
  [guided]  2sin(0,0025)²
    (Calcul naïf à 4 chiffres : 1−1 = 0, alors que la vraie valeur est 0,0000125.)
    (Forme stable : 2sin(0,0025)² (1 − cos x = 2 sin²(x/2)).)
    = 2·□²   (trous : 2·0,0025²)   ← sin(0,0025) arrondi
    = 2·□   (trous : 2·0,00000625)   ← Carré arrondi
    = □   (trous : 0,0000125)   ← Arrondi à 4 chiffres
  aides : On soustrait deux nombres presque égaux : les chiffres communs disparaissent. Réécris sans soustraction. | 2·□² | 2·0,0025² = 2·0,00000625 = 0,0000125.
  pièges : n_cancel_ignored

En arithmétique à 4 chiffres significatifs (on arrondit après chaque opération), calcule 1 − cos(0,01) par la forme stable.
  [guided]  2sin(0,005)²
    (Calcul naïf à 4 chiffres : 1−1 = 0, alors que la vraie valeur est 0,0000499996.)
    (Forme stable : 2sin(0,005)² (1 − cos x = 2 sin²(x/2)).)
    = 2·□²   (trous : 2·0,005²)   ← sin(0,005) arrondi
    = 2·□   (trous : 2·0,000025)   ← Carré arrondi
    = □   (trous : 0,00005)   ← Arrondi à 4 chiffres
  aides : On soustrait deux nombres presque égaux : les chiffres communs disparaissent. Réécris sans soustraction. | 2·□² | 2·0,005² = 2·0,000025 = 0,00005.
  pièges : n_cancel_ignored

En arithmétique à 4 chiffres significatifs (on arrondit après chaque opération), calcule 1 − cos(0,002) par la forme stable.
  [guided]  2sin(0,001)²
    (Calcul naïf à 4 chiffres : 1−1 = 0, alors que la vraie valeur est 0,000002.)
    (Forme stable : 2sin(0,001)² (1 − cos x = 2 sin²(x/2)).)
    = 2·□²   (trous : 2·0,001²)   ← sin(0,001) arrondi
    = 2·□   (trous : 2·0,000001)   ← Carré arrondi
    = □   (trous : 0,000002)   ← Arrondi à 4 chiffres
  aides : On soustrait deux nombres presque égaux : les chiffres communs disparaissent. Réécris sans soustraction. | 2·□² | 2·0,001² = 2·0,000001 = 0,000002.
  pièges : n_cancel_ignored

```

### Niveau 2

```
En arithmétique à 4 chiffres significatifs (on arrondit après chaque opération), calcule 1 − cos(0,01) par la forme naïve, puis par une forme sans soustraction de nombres proches.
  [guided]  1 − cos(0,01)
    = □ − 1   (trous : 1 − 1)   ← cos(0,01) arrondi à 4 chiffres
    = □   (trous : 0)   ← Les chiffres communs disparaissent
  — Calcule la forme stable à 4 chiffres.  [juge value]  départ : 2sin(0,005)²
    ? Comment éviter la perte de chiffres ? ✔ Réécrire : 2sin(0,005)² (1 − cos x = 2 sin²(x/2)) / · Arrondir plus tôt, à 3 chiffres / · Changer l'ordre de la soustraction
    = 2·□²   (trous : 2·0,005²)   ← sin(0,005) arrondi
    = 2·□   (trous : 2·0,000025)   ← Carré arrondi
    = □   (trous : 0,00005)   ← Arrondi à 4 chiffres
  aides : On soustrait deux nombres presque égaux : les chiffres communs disparaissent. Réécris sans soustraction. | 2·□² | 2·0,005² = 2·0,000025 = 0,00005.
  pièges : n_cancel_ignored

En arithmétique à 4 chiffres significatifs (on arrondit après chaque opération), calcule √201 − √200 par la forme naïve, puis par une forme sans soustraction de nombres proches.
  [guided]  √201 − √200
    = □ − □   (trous : 14,18 − 14,14)   ← Chaque racine arrondie à 4 chiffres
    = □   (trous : 0,04)   ← Les chiffres communs disparaissent
  — Calcule la forme stable à 4 chiffres.  [juge value]  départ : 1/(√201 + √200)
    ? Comment éviter la perte de chiffres ? ✔ Réécrire : 1/(√201+√200) ((√201 − √200)(√201 + √200) = 201 − 200 = 1) / · Arrondir plus tôt, à 3 chiffres / · Changer l'ordre de la soustraction
    = 1/(□ + □)   (trous : 1/(14,18 + 14,14))   ← Plus de soustraction
    = 1/□   (trous : 1/28,32)   ← Somme arrondie
    = □   (trous : 0,03531)   ← Arrondi à 4 chiffres
  aides : On soustrait deux nombres presque égaux : les chiffres communs disparaissent. Réécris sans soustraction. | 1/(□+14,14) | 1/(14,18+14,14) = 1/28,32 = 0,03531.
  pièges : n_cancel_ignored

En arithmétique à 4 chiffres significatifs (on arrondit après chaque opération), calcule la petite racine de x² − 10000x + 1 par la forme naïve, puis par une forme sans soustraction de nombres proches.
  [guided]  (10000 − √(10000² − 4))/2
    = (□ − 10000)/2   (trous : (10000 − 10000)/2)   ← √(10000² − 4) arrondie à 4 chiffres
    = □   (trous : 0)   ← Tout a disparu
  — Calcule la forme stable à 4 chiffres.  [juge value]  départ : 1/((10000 + √(10000² − 4))/2)
    ? Comment éviter la perte de chiffres ? ✔ Réécrire : 1/((10000+√(10000²−4))/2) (x₊·x₋ = c = 1 : x₋ = 1/x₊, et x₊ se calcule sans soustraction) / · Arrondir plus tôt, à 3 chiffres / · Changer l'ordre de la soustraction
    = 1/((□ + 10000)/2)   (trous : 1/((10000 + 10000)/2))   ← x₋ = 1/x₊ (produit des racines = 1)
    = 1/□   (trous : 1/10000)   ← x₊, sans soustraction
    = □   (trous : 0,0001)   ← Arrondi à 4 chiffres
  aides : On soustrait deux nombres presque égaux : les chiffres communs disparaissent. Réécris sans soustraction. | 1/((□+10000)/2) | 1/((10000+10000)/2) = 1/10000 = 0,0001.
  pièges : n_cancel_ignored

```

### Niveau 3

```
En arithmétique à 4 chiffres significatifs (on arrondit après chaque opération), calcule la petite racine de x² − 100000x + 1 par la forme naïve, puis par une forme sans soustraction de nombres proches.
  [tap, suivre l'erreur, menu menu]  (100000 − √(100000² − 4))/2
    = (100000 − 100000)/2   ← √(100000² − 4) arrondie à 4 chiffres
    = 0   ← Tout a disparu
  — Réécris l'expression exacte sans soustraction de nombres proches.  [juge equiv]  départ : (100000 − √(100000² − 4))/2
    = 1/((100000 + √(100000² − 4))/2)   ← x₊·x₋ = c = 1 : x₋ = 1/x₊, et x₊ se calcule sans soustraction
  — Calcule la forme stable à 4 chiffres.  [juge value]  départ : 1/((100000 + √(100000² − 4))/2)
    = 1/((100000 + 100000)/2)   ← x₋ = 1/x₊ (produit des racines = 1)
    = 1/100000   ← x₊, sans soustraction
    = 0,00001   ← Arrondi à 4 chiffres
  aides : On soustrait deux nombres presque égaux : les chiffres communs disparaissent. Réécris sans soustraction. | 1/((□+100000)/2) | 1/((100000+100000)/2) = 1/100000 = 0,00001.
  pièges : n_cancel_ignored

En arithmétique à 4 chiffres significatifs (on arrondit après chaque opération), calcule √5001 − √5000 par la forme naïve, puis par une forme sans soustraction de nombres proches.
  [tap, suivre l'erreur, menu menu]  √5001 − √5000
    = 70,72 − 70,71   ← Chaque racine arrondie à 4 chiffres
    = 0,01   ← Les chiffres communs disparaissent
  — Réécris l'expression exacte sans soustraction de nombres proches.  [juge equiv]  départ : √5001 − √5000
    = 1/(√5001 + √5000)   ← (√5001 − √5000)(√5001 + √5000) = 5001 − 5000 = 1
  — Calcule la forme stable à 4 chiffres.  [juge value]  départ : 1/(√5001 + √5000)
    = 1/(70,72 + 70,71)   ← Plus de soustraction
    = 1/141,4   ← Somme arrondie
    = 0,007072   ← Arrondi à 4 chiffres
  aides : On soustrait deux nombres presque égaux : les chiffres communs disparaissent. Réécris sans soustraction. | 1/(□+70,71) | 1/(70,72+70,71) = 1/141,4 = 0,007072.
  pièges : n_cancel_ignored

En arithmétique à 4 chiffres significatifs (on arrondit après chaque opération), calcule 1 − cos(0,03) par la forme naïve, puis par une forme sans soustraction de nombres proches.
  [tap, suivre l'erreur, menu menu]  1 − cos(0,03)
    = 1 − 0,9996   ← cos(0,03) arrondi à 4 chiffres
    = 0,0004   ← Les chiffres communs disparaissent
  — Réécris l'expression exacte sans soustraction de nombres proches.  [juge equiv]  départ : 1 − cos(0,03)
    = 2sin(0,015)²   ← 1 − cos x = 2 sin²(x/2)
  — Calcule la forme stable à 4 chiffres.  [juge value]  départ : 2sin(0,015)²
    = 2·0,015²   ← sin(0,015) arrondi
    = 2·0,000225   ← Carré arrondi
    = 0,00045   ← Arrondi à 4 chiffres
  aides : On soustrait deux nombres presque égaux : les chiffres communs disparaissent. Réécris sans soustraction. | 2·□² | 2·0,015² = 2·0,000225 = 0,00045.
  pièges : n_cancel_ignored

```

### Niveau 4

```
En arithmétique à 4 chiffres significatifs (on arrondit après chaque opération), calcule √1001 − √1000 par la forme naïve, puis par une forme sans soustraction de nombres proches, et l'erreur relative de la forme naïve.
  [free, suivre l'erreur]  √1001 − √1000
    = 31,64 − 31,62   ← Chaque racine arrondie à 4 chiffres
    = 0,02   ← Les chiffres communs disparaissent
  — Calcule la forme stable à 4 chiffres.  [juge value]  départ : 1/(√1001 + √1000)
    = 1/(31,64 + 31,62)   ← Plus de soustraction
    = 1/63,26   ← Somme arrondie
    = 0,01581   ← Arrondi à 4 chiffres
  — L'erreur relative de la forme naïve (vraie valeur 0,0158074), à 2 chiffres significatifs.  [juge value]  départ : |0,02 − (√1001 − √1000)|/(√1001 − √1000)
    = 0,27   ← |0,02 − 0,0158074|/0,0158074
  aides : On soustrait deux nombres presque égaux : les chiffres communs disparaissent. Réécris sans soustraction. | 1/(□+31,62) | 1/(31,64+31,62) = 1/63,26 = 0,01581.
  pièges : n_cancel_ignored

En arithmétique à 4 chiffres significatifs (on arrondit après chaque opération), calcule √10001 − √10000 par la forme naïve, puis par une forme sans soustraction de nombres proches, et l'erreur relative de la forme naïve.
  [free, suivre l'erreur]  √10001 − √10000
    = 100 − 100   ← Chaque racine arrondie à 4 chiffres
    = 0   ← Les chiffres communs disparaissent
  — Calcule la forme stable à 4 chiffres.  [juge value]  départ : 1/(√10001 + √10000)
    = 1/(100 + 100)   ← Plus de soustraction
    = 1/200   ← Somme arrondie
    = 0,005   ← Arrondi à 4 chiffres
  — L'erreur relative de la forme naïve (vraie valeur 0,00499988), à 2 chiffres significatifs.  [juge value]  départ : |0 − (√10001 − √10000)|/(√10001 − √10000)
    = 1   ← |0 − 0,00499988|/0,00499988
  aides : On soustrait deux nombres presque égaux : les chiffres communs disparaissent. Réécris sans soustraction. | 1/(□+100) | 1/(100+100) = 1/200 = 0,005.
  pièges : n_cancel_ignored

En arithmétique à 4 chiffres significatifs (on arrondit après chaque opération), calcule 1 − cos(0,002) par la forme naïve, puis par une forme sans soustraction de nombres proches, et l'erreur relative de la forme naïve.
  [free, suivre l'erreur]  1 − cos(0,002)
    = 1 − 1   ← cos(0,002) arrondi à 4 chiffres
    = 0   ← Les chiffres communs disparaissent
  — Calcule la forme stable à 4 chiffres.  [juge value]  départ : 2sin(0,001)²
    = 2·0,001²   ← sin(0,001) arrondi
    = 2·0,000001   ← Carré arrondi
    = 0,000002   ← Arrondi à 4 chiffres
  — L'erreur relative de la forme naïve (vraie valeur 0,000002), à 2 chiffres significatifs.  [juge value]  départ : |0 − (1 − cos(0,002))|/(1 − cos(0,002))
    = 1   ← |0 − 0,000002|/0,000002
  aides : On soustrait deux nombres presque égaux : les chiffres communs disparaissent. Réécris sans soustraction. | 2·□² | 2·0,001² = 2·0,000001 = 0,000002.
  pièges : n_cancel_ignored

```

### Niveau 5

```
Écris deux calculs stables en double précision : √(x + 1) − √x pour x grand, et la petite racine de x² − bx + c pour b grand (le produit des racines vaut c).
  [code python, 3 trous, sans aide]
    | def g_stable(x):
    |     # meme valeur que sqrt(x + 1) - sqrt(x), sans soustraction
    |     return ⟦1 / (math.sqrt(x + 1) + math.sqrt(x))⟧
    | 
    | def small_root(b, c):
    |     # petite racine de x^2 - b x + c = 0, avec b > 0 grand
    |     big = ⟦(b + math.sqrt(b * b - 4 * c)) / 2⟧
    |     return ⟦c / big⟧
    test : small_root(1e8, 1) → 1e-08
    test : g_stable(1e12) → 4.999999999998749e-07
    test : g_stable(1e4) → 0.004999875006249609
  pièges : n_cancel_ignored

Écris deux calculs stables en double précision : √(x + 1) − √x pour x grand, et la petite racine de x² − bx + c pour b grand (le produit des racines vaut c).
  [code python, 3 trous, sans aide]
    | def g_stable(x):
    |     # meme valeur que sqrt(x + 1) - sqrt(x), sans soustraction
    |     return ⟦1 / (math.sqrt(x + 1) + math.sqrt(x))⟧
    | 
    | def small_root(b, c):
    |     # petite racine de x^2 - b x + c = 0, avec b > 0 grand
    |     big = ⟦(b + math.sqrt(b * b - 4 * c)) / 2⟧
    |     return ⟦c / big⟧
    test : small_root(1e8, 1) → 1e-08
    test : g_stable(1e12) → 4.999999999998749e-07
    test : g_stable(1e4) → 0.004999875006249609
  pièges : n_cancel_ignored

Écris deux calculs stables en double précision : √(x + 1) − √x pour x grand, et la petite racine de x² − bx + c pour b grand (le produit des racines vaut c).
  [code python, 3 trous, sans aide]
    | def g_stable(x):
    |     # meme valeur que sqrt(x + 1) - sqrt(x), sans soustraction
    |     return ⟦1 / (math.sqrt(x + 1) + math.sqrt(x))⟧
    | 
    | def small_root(b, c):
    |     # petite racine de x^2 - b x + c = 0, avec b > 0 grand
    |     big = ⟦(b + math.sqrt(b * b - 4 * c)) / 2⟧
    |     return ⟦c / big⟧
    test : small_root(1e8, 1) → 1e-08
    test : g_stable(1e12) → 4.999999999998749e-07
    test : g_stable(1e4) → 0.004999875006249609
  pièges : n_cancel_ignored

```

### Variantes d'examen

```
Pour b > 0 grand, laquelle de ces formules calcule de façon stable la petite racine de x² − bx + c (c > 0) ?
  · (b + √(b² − 4c))/2   ✔ c/x₊, avec x₊ = (b + √(b² − 4c))/2   · x₊/c, avec x₊ = (b + √(b² − 4c))/2   · (b − √(b² − 4c))/2 [n_cancel_ignored]
  [examen mcq]
  pièges : n_cancel_ignored

Vrai ou faux ?
  « En double précision, l'erreur d'arrondi |fl(x) − x| vaut environ 10⁻¹⁶, quel que soit x. » → FAUX
    contre-exemple (num) : x = 10^20
  [examen tf]
  pièges : n_eps_absolute

```

## Bissection : nombre d'itérations et intervalles (`n-bisection`, BA4)

_Couper l'intervalle en deux en gardant le changement de signe, et prévoir le nombre de pas._

### Niveau 1

```
Bissection pour f(x) = x² − 5 sur [0 ; 4], avec la tolérance tol = 10⁻¹⁰. Combien d'itérations k_min garantissent |α − x⁽ᵏ⁾| ≤ tol, sachant que |α − x⁽ᵏ⁾| ≤ (b − a)/2^(k+1) ? Calcule (b − a)/tol, puis log₂ de ce nombre moins 1, puis k_min.
  [guided]  4/10^(−10)
    = □   (trous : 40000000000)   ← (b − a)/2^(k+1) ≤ tol ⇔ 2^(k+1) ≥ (b − a)/tol = 4/10⁻¹⁰
  — Donc k + 1 ≥ log₂((b − a)/tol), c'est-à-dire k ≥ log₂((b − a)/tol) − 1 (deux décimales).  [juge value]  départ : log₂(40000000000) − 1
    = □   (trous : 34,21)   ← log₂(40000000000) = log(40000000000)/log 2 ≈ 35,22 (2¹⁰ ≈ 10³)
  — Le plus petit entier k qui convient :  [juge value]  départ : k_min
    = □   (trous : 35)   ← le plus petit entier > 34,21
  aides : À l'étape k, le milieu est à au plus (b − a)/2^(k+1) du zéro : impose cette borne ≤ tol. | (b − a)/2^(k+1) ≤ tol ⇔ k ≥ log₂(□) − 1 | k > log₂(40000000000) − 1 ≈ 34,22, donc k_min = 35.
  pièges : n_bisect_no_minus1, n_bisect_log10

Bissection pour f(x) = x² − 5 sur [2 ; 4]. f(2) et f(4) sont de signes opposés. À chaque ligne, x⁽ᵏ⁾ est le milieu de [a ; b] ; on garde la moitié où f change de signe. Remplis le tableau (signe : + ou −).
  [tableau bisect]  colonnes : a | b | x⁽ᵏ⁾ = (a + b)/2 | signe de f(x⁽ᵏ⁾)
    k = 0    2  4  3  +
    k = 1    (2)  (3)  (5/2)  (+)
    k = 2    (2)  (5/2)  (9/4)  (+)
  pièges : n_bisect_wrong_half

Bissection pour f(x) = x² − 3 sur [0 ; 4]. f(0) et f(4) sont de signes opposés. À chaque ligne, x⁽ᵏ⁾ est le milieu de [a ; b] ; on garde la moitié où f change de signe. Remplis le tableau (signe : + ou −).
  [tableau bisect]  colonnes : a | b | x⁽ᵏ⁾ = (a + b)/2 | signe de f(x⁽ᵏ⁾)
    k = 0    0  4  2  +
    k = 1    (0)  (2)  (1)  (−)
    k = 2    (1)  (2)  (3/2)  (−)
  pièges : n_bisect_wrong_half

```

### Niveau 2

```
Bissection pour f(x) = x³ − x − 2 sur [1 ; 2], avec la tolérance tol = 10⁻². Combien d'itérations k_min garantissent |α − x⁽ᵏ⁾| ≤ tol, sachant que |α − x⁽ᵏ⁾| ≤ (b − a)/2^(k+1) ? Calcule (b − a)/tol, puis log₂ de ce nombre moins 1, puis k_min.
  [guided]  1/10^(−2)
    = □   (trous : 100)   ← (b − a)/2^(k+1) ≤ tol ⇔ 2^(k+1) ≥ (b − a)/tol = 1/10⁻²
  — Donc k + 1 ≥ log₂((b − a)/tol), c'est-à-dire k ≥ log₂((b − a)/tol) − 1 (deux décimales).  [juge value]  départ : log₂(100) − 1
    = □   (trous : 5,64)   ← log₂(100) = log(100)/log 2 ≈ 6,64 (2¹⁰ ≈ 10³)
  — Le plus petit entier k qui convient :  [juge value]  départ : k_min
    = □   (trous : 6)   ← le plus petit entier > 5,64
  aides : À l'étape k, le milieu est à au plus (b − a)/2^(k+1) du zéro : impose cette borne ≤ tol. | (b − a)/2^(k+1) ≤ tol ⇔ k ≥ log₂(□) − 1 | k > log₂(100) − 1 ≈ 5,64, donc k_min = 6.
  pièges : n_bisect_no_minus1, n_bisect_log10

Bissection pour f(x) = x³ − x − 2 sur [1 ; 2]. f(1) et f(2) sont de signes opposés. À chaque ligne, x⁽ᵏ⁾ est le milieu de [a ; b] ; on garde la moitié où f change de signe. Remplis le tableau (signe : + ou −).
  [tableau bisect]  colonnes : a | b | x⁽ᵏ⁾ = (a + b)/2 | signe de f(x⁽ᵏ⁾)
    k = 0    1  2  (3/2)  (−)
    k = 1    (3/2)  (2)  (7/4)  (+)
    k = 2    (3/2)  (7/4)  (13/8)  (+)
    k = 3    (3/2)  (13/8)  (25/16)  (+)
  pièges : n_bisect_wrong_half

Bissection pour f(x) = x² − 5 sur [2 ; 3]. f(2) et f(3) sont de signes opposés. À chaque ligne, x⁽ᵏ⁾ est le milieu de [a ; b] ; on garde la moitié où f change de signe. Remplis le tableau (signe : + ou −).
  [tableau bisect]  colonnes : a | b | x⁽ᵏ⁾ = (a + b)/2 | signe de f(x⁽ᵏ⁾)
    k = 0    2  3  (5/2)  (+)
    k = 1    (2)  (5/2)  (9/4)  (+)
    k = 2    (2)  (9/4)  (17/8)  (−)
    k = 3    (17/8)  (9/4)  (35/16)  (−)
  pièges : n_bisect_wrong_half

```

### Niveau 3

```
Bissection pour f(x) = x² − 3 sur [1 ; 5], avec la tolérance tol = 10⁻². Fais trois pas de bissection (choisis la moitié à garder), puis calcule le nombre d'itérations k_min qui garantit la tolérance.
  [tap, suivre l'erreur, menu menu]  x_1
    (x⁽⁰⁾ = 3, et f(3) > 0, f(1) < 0. Choisis la moitié, puis donne le milieu suivant.)
    = 2   ← [1 ; 3]
  — x⁽¹⁾ = 2, et f(2) > 0, f(1) < 0. Choisis la moitié, puis donne le milieu suivant.  [juge value]  départ : x_2
    = 1,5   ← [1 ; 2]
  — x⁽²⁾ = 1,5, et f(1,5) < 0, f(1) < 0. Choisis la moitié, puis donne le milieu suivant.  [juge value]  départ : x_3
    = 1,75   ← [1,5 ; 2]
  — Combien d'itérations garantissent la tolérance 10⁻² ? D'abord (b − a)/tol.  [juge value]  départ : 4/10^(−2)
    = 400   ← (b − a)/2^(k+1) ≤ tol ⇔ 2^(k+1) ≥ (b − a)/tol = 4/10⁻²
  — Donc k + 1 ≥ log₂((b − a)/tol), c'est-à-dire k ≥ log₂((b − a)/tol) − 1 (deux décimales).  [juge value]  départ : log₂(400) − 1
    = 7,64   ← log₂(400) = log(400)/log 2 ≈ 8,64 (2¹⁰ ≈ 10³)
  — Le plus petit entier k qui convient :  [juge value]  départ : k_min
    = 8   ← le plus petit entier > 7,64
  aides : On garde la moitié où f change de signe. | Si f(x) et f(a) ont le même signe, le zéro est dans [x ; □]. | Puis k > log₂(400) − 1, donc k_min = 8.
  pièges : n_bisect_wrong_half, n_bisect_no_minus1, n_bisect_log10

Bissection pour f(x) = cos x − x sur [0 ; 2], avec la tolérance tol = 10⁻⁶. Fais trois pas de bissection (choisis la moitié à garder), puis calcule le nombre d'itérations k_min qui garantit la tolérance.
  [tap, suivre l'erreur, menu menu]  x_1
    (x⁽⁰⁾ = 1, et f(1)  0. Choisis la moitié, puis donne le milieu suivant.)
    = 0,5   ← [0 ; 1]
  — x⁽¹⁾ = 0,5, et f(0,5) > 0, f(0) > 0. Choisis la moitié, puis donne le milieu suivant.  [juge value]  départ : x_2
    = 0,75   ← [0,5 ; 1]
  — x⁽²⁾ = 0,75, et f(0,75)  0. Choisis la moitié, puis donne le milieu suivant.  [juge value]  départ : x_3
    = 0,625   ← [0,5 ; 0,75]
  — Combien d'itérations garantissent la tolérance 10⁻⁶ ? D'abord (b − a)/tol.  [juge value]  départ : 2/10^(−6)
    = 2000000   ← (b − a)/2^(k+1) ≤ tol ⇔ 2^(k+1) ≥ (b − a)/tol = 2/10⁻⁶
  — Donc k + 1 ≥ log₂((b − a)/tol), c'est-à-dire k ≥ log₂((b − a)/tol) − 1 (deux décimales).  [juge value]  départ : log₂(2000000) − 1
    = 19,93   ← log₂(2000000) = log(2000000)/log 2 ≈ 20,93 (2¹⁰ ≈ 10³)
  — Le plus petit entier k qui convient :  [juge value]  départ : k_min
    = 20   ← le plus petit entier > 19,93
  aides : On garde la moitié où f change de signe. | Si f(x) et f(a) ont le même signe, le zéro est dans [x ; □]. | Puis k > log₂(2000000) − 1, donc k_min = 20.
  pièges : n_bisect_wrong_half, n_bisect_no_minus1, n_bisect_log10

Bissection pour f(x) = x² − 7 sur [2 ; 4], avec la tolérance tol = 10⁻². Fais trois pas de bissection (choisis la moitié à garder), puis calcule le nombre d'itérations k_min qui garantit la tolérance.
  [tap, suivre l'erreur, menu menu]  x_1
    (x⁽⁰⁾ = 3, et f(3) > 0, f(2) < 0. Choisis la moitié, puis donne le milieu suivant.)
    = 2,5   ← [2 ; 3]
  — x⁽¹⁾ = 2,5, et f(2,5) < 0, f(2) < 0. Choisis la moitié, puis donne le milieu suivant.  [juge value]  départ : x_2
    = 2,75   ← [2,5 ; 3]
  — x⁽²⁾ = 2,75, et f(2,75) > 0, f(2,5) < 0. Choisis la moitié, puis donne le milieu suivant.  [juge value]  départ : x_3
    = 2,625   ← [2,5 ; 2,75]
  — Combien d'itérations garantissent la tolérance 10⁻² ? D'abord (b − a)/tol.  [juge value]  départ : 2/10^(−2)
    = 200   ← (b − a)/2^(k+1) ≤ tol ⇔ 2^(k+1) ≥ (b − a)/tol = 2/10⁻²
  — Donc k + 1 ≥ log₂((b − a)/tol), c'est-à-dire k ≥ log₂((b − a)/tol) − 1 (deux décimales).  [juge value]  départ : log₂(200) − 1
    = 6,64   ← log₂(200) = log(200)/log 2 ≈ 7,64 (2¹⁰ ≈ 10³)
  — Le plus petit entier k qui convient :  [juge value]  départ : k_min
    = 7   ← le plus petit entier > 6,64
  aides : On garde la moitié où f change de signe. | Si f(x) et f(a) ont le même signe, le zéro est dans [x ; □]. | Puis k > log₂(200) − 1, donc k_min = 7.
  pièges : n_bisect_wrong_half, n_bisect_no_minus1, n_bisect_log10

```

### Niveau 4

```
Bissection pour f(x) = x² − 5 sur [2 ; 3]. f(2) et f(3) sont de signes opposés. À chaque ligne, x⁽ᵏ⁾ est le milieu de [a ; b] ; on garde la moitié où f change de signe. Remplis le tableau (signe : + ou −).
  [tableau bisect]  colonnes : a | b | x⁽ᵏ⁾ = (a + b)/2 | signe de f(x⁽ᵏ⁾)
    k = 0    2  3  (5/2)  (+)
    k = 1    (2)  (5/2)  (9/4)  (+)
    k = 2    (2)  (9/4)  (17/8)  (−)
    k = 3    (17/8)  (9/4)  (35/16)  (−)
  puis : Combien d'itérations garantissent |α − x⁽ᵏ⁾| ≤ 10⁻¹⁰ ? Écris (b − a)/tol, log₂(…) − 1, puis k_min.
      [free, sans aide, suivre l'erreur]  1/10^(−10)
        = 10000000000   ← (b − a)/2^(k+1) ≤ tol ⇔ 2^(k+1) ≥ (b − a)/tol = 1/10⁻¹⁰
      — Donc k + 1 ≥ log₂((b − a)/tol), c'est-à-dire k ≥ log₂((b − a)/tol) − 1 (deux décimales).  [juge value]  départ : log₂(10000000000) − 1
        = 32,21   ← log₂(10000000000) = log(10000000000)/log 2 ≈ 33,22 (2¹⁰ ≈ 10³)
      — Le plus petit entier k qui convient :  [juge value]  départ : k_min
        = 33   ← le plus petit entier > 32,21
      pièges : n_bisect_no_minus1, n_bisect_log10
  pièges : n_bisect_wrong_half

Bissection pour f(x) = x² − 7 sur [2 ; 6]. f(2) et f(6) sont de signes opposés. À chaque ligne, x⁽ᵏ⁾ est le milieu de [a ; b] ; on garde la moitié où f change de signe. Remplis le tableau (signe : + ou −).
  [tableau bisect]  colonnes : a | b | x⁽ᵏ⁾ = (a + b)/2 | signe de f(x⁽ᵏ⁾)
    k = 0    2  6  (4)  (+)
    k = 1    (2)  (4)  (3)  (+)
    k = 2    (2)  (3)  (5/2)  (−)
    k = 3    (5/2)  (3)  (11/4)  (+)
  puis : Combien d'itérations garantissent |α − x⁽ᵏ⁾| ≤ 10⁻² ? Écris (b − a)/tol, log₂(…) − 1, puis k_min.
      [free, sans aide, suivre l'erreur]  4/10^(−2)
        = 400   ← (b − a)/2^(k+1) ≤ tol ⇔ 2^(k+1) ≥ (b − a)/tol = 4/10⁻²
      — Donc k + 1 ≥ log₂((b − a)/tol), c'est-à-dire k ≥ log₂((b − a)/tol) − 1 (deux décimales).  [juge value]  départ : log₂(400) − 1
        = 7,64   ← log₂(400) = log(400)/log 2 ≈ 8,64 (2¹⁰ ≈ 10³)
      — Le plus petit entier k qui convient :  [juge value]  départ : k_min
        = 8   ← le plus petit entier > 7,64
      pièges : n_bisect_no_minus1, n_bisect_log10
  pièges : n_bisect_wrong_half

Bissection pour f(x) = x² − 7 sur [2 ; 3]. f(2) et f(3) sont de signes opposés. À chaque ligne, x⁽ᵏ⁾ est le milieu de [a ; b] ; on garde la moitié où f change de signe. Remplis le tableau (signe : + ou −).
  [tableau bisect]  colonnes : a | b | x⁽ᵏ⁾ = (a + b)/2 | signe de f(x⁽ᵏ⁾)
    k = 0    2  3  (5/2)  (−)
    k = 1    (5/2)  (3)  (11/4)  (+)
    k = 2    (5/2)  (11/4)  (21/8)  (−)
    k = 3    (21/8)  (11/4)  (43/16)  (+)
  puis : Combien d'itérations garantissent |α − x⁽ᵏ⁾| ≤ 10⁻⁵ ? Écris (b − a)/tol, log₂(…) − 1, puis k_min.
      [free, sans aide, suivre l'erreur]  1/10^(−5)
        = 100000   ← (b − a)/2^(k+1) ≤ tol ⇔ 2^(k+1) ≥ (b − a)/tol = 1/10⁻⁵
      — Donc k + 1 ≥ log₂((b − a)/tol), c'est-à-dire k ≥ log₂((b − a)/tol) − 1 (deux décimales).  [juge value]  départ : log₂(100000) − 1
        = 15,60   ← log₂(100000) = log(100000)/log 2 ≈ 16,61 (2¹⁰ ≈ 10³)
      — Le plus petit entier k qui convient :  [juge value]  départ : k_min
        = 16   ← le plus petit entier > 15,60
      pièges : n_bisect_no_minus1, n_bisect_log10
  pièges : n_bisect_wrong_half

```

### Niveau 5

```
Complète la bissection : kmin est le plus petit entier k tel que (b − a)/2^(k+1) ≤ tol ; la fonction renvoie [x⁽ᵏᵐⁱⁿ⁾, kmin].
  [code python, 4 trous, sans aide]
    | def bisection(f, a, b, tol):
    |     kmin = int(⟦math.log((b - a) / tol) / math.log(2)⟧)   # plus petit entier > log2(...) - 1
    |     x = (a + b) / 2
    |     for k in range(kmin):
    |         if f(x) * f(a) < 0:
    |             b = ⟦x⟧
    |         else:
    |             a = ⟦x⟧
    |         x = ⟦(a + b) / 2⟧
    |     return [x, kmin]
    test : def f(x): return x*x - 2 ; bisection(f, 1, 2, 1e-3) → [1.4150390625, 9]
    test : def f(x): return x**3 - x - 2 ; bisection(f, 1, 2, 1e-6) → [1.5213804244995117, 19]
    test : def f(x): return math.cos(x) - x ; bisection(f, 0, 1, 1e-4) → [0.73907470703125, 13]
  puis : On applique la bissection à f(x) = (x + 3/2)(x − 1)(x − 3/2) sur [−2 ; 2], avec tol = 10⁻⁴ (le premier milieu est 0). Vers quel zéro converge-t-elle, et en au plus combien d'itérations la tolérance est-elle garantie ?
      ✔ vers −3/2, en au plus 15 itérations   · vers −3/2, en au plus 4 itérations [n_bisect_log10]   · vers 1, en au plus 15 itérations   · vers −3/2, en au plus 16 itérations [n_bisect_no_minus1]
      pièges : n_bisect_no_minus1, n_bisect_log10
  pièges : n_bisect_log10, n_bisect_no_minus1

Complète la bissection : kmin est le plus petit entier k tel que (b − a)/2^(k+1) ≤ tol ; la fonction renvoie [x⁽ᵏᵐⁱⁿ⁾, kmin].
  [code python, 4 trous, sans aide]
    | def bisection(f, a, b, tol):
    |     kmin = int(⟦math.log((b - a) / tol) / math.log(2)⟧)   # plus petit entier > log2(...) - 1
    |     x = (a + b) / 2
    |     for k in range(kmin):
    |         if f(x) * f(a) < 0:
    |             b = ⟦x⟧
    |         else:
    |             a = ⟦x⟧
    |         x = ⟦(a + b) / 2⟧
    |     return [x, kmin]
    test : def f(x): return x*x - 2 ; bisection(f, 1, 2, 1e-3) → [1.4150390625, 9]
    test : def f(x): return x**3 - x - 2 ; bisection(f, 1, 2, 1e-6) → [1.5213804244995117, 19]
    test : def f(x): return math.cos(x) - x ; bisection(f, 0, 1, 1e-4) → [0.73907470703125, 13]
  puis : On applique la bissection à f(x) = (x + 3/2)(x + 1/2)(x − 3/2) sur [−2 ; 2], avec tol = 10⁻⁶ (le premier milieu est 0). Vers quel zéro converge-t-elle, et en au plus combien d'itérations la tolérance est-elle garantie ?
      · vers 3/2, en au plus 6 itérations [n_bisect_log10]   · vers 3/2, en au plus 22 itérations [n_bisect_no_minus1]   · vers −3/2, en au plus 21 itérations   ✔ vers 3/2, en au plus 21 itérations
      pièges : n_bisect_no_minus1, n_bisect_log10
  pièges : n_bisect_log10, n_bisect_no_minus1

Complète la bissection : kmin est le plus petit entier k tel que (b − a)/2^(k+1) ≤ tol ; la fonction renvoie [x⁽ᵏᵐⁱⁿ⁾, kmin].
  [code python, 4 trous, sans aide]
    | def bisection(f, a, b, tol):
    |     kmin = int(⟦math.log((b - a) / tol) / math.log(2)⟧)   # plus petit entier > log2(...) - 1
    |     x = (a + b) / 2
    |     for k in range(kmin):
    |         if f(x) * f(a) < 0:
    |             b = ⟦x⟧
    |         else:
    |             a = ⟦x⟧
    |         x = ⟦(a + b) / 2⟧
    |     return [x, kmin]
    test : def f(x): return x*x - 2 ; bisection(f, 1, 2, 1e-3) → [1.4150390625, 9]
    test : def f(x): return x**3 - x - 2 ; bisection(f, 1, 2, 1e-6) → [1.5213804244995117, 19]
    test : def f(x): return math.cos(x) - x ; bisection(f, 0, 1, 1e-4) → [0.73907470703125, 13]
  puis : On applique la bissection à f(x) = (x + 1/2)(x − 1/2)(x − 1) sur [−2 ; 2], avec tol = 10⁻⁵ (le premier milieu est 0). Vers quel zéro converge-t-elle, et en au plus combien d'itérations la tolérance est-elle garantie ?
      ✔ vers −1/2, en au plus 18 itérations   · vers −1/2, en au plus 5 itérations [n_bisect_log10]   · vers 1/2, en au plus 18 itérations   · vers −1/2, en au plus 19 itérations [n_bisect_no_minus1]
      pièges : n_bisect_no_minus1, n_bisect_log10
  pièges : n_bisect_log10, n_bisect_no_minus1

```

### Variantes d'examen

```
On applique la bissection à f(x) = (x + 1)(x − 1/2)(x − 1) sur [−2 ; 2], avec tol = 10⁻⁵ (le premier milieu est 0). Vers quel zéro converge-t-elle, et en au plus combien d'itérations la tolérance est-elle garantie ?
  ✔ vers −1, en au plus 18 itérations   · vers −1, en au plus 5 itérations [n_bisect_log10]   · vers 1/2, en au plus 18 itérations   · vers −1, en au plus 19 itérations [n_bisect_no_minus1]
  [examen mcq]
  pièges : n_bisect_no_minus1, n_bisect_log10

Vrai ou faux ?
  « Pour la bissection, l'erreur |α − x⁽ᵏ⁾| diminue à chaque itération. » → FAUX
    contre-exemple (num) : f = x-0,51, a = 0, b = 1
  [examen tf]

```

## Point fixe : convergence, choix de φ (`n-fp-converge`, BA4)

_Itérer x ← φ(x) : la pente de φ au point fixe décide de la convergence._

### Niveau 1

```
Point fixe pour φ(x) = 12x/(9 + x), x⁽⁰⁾ = 6. Calcule φ′(3), décide si la méthode converge vers 3, puis calcule x⁽¹⁾.
  [guided]  108/(9 + 3)²
    (Les points fixes sont 0 et 3, et φ′(x) = 108/(9 + x)². La pente au point fixe α = 3.)
    = □   (trous : 3/4)   ← = b/a
  — Puis une itération à partir de x⁽⁰⁾ = 6. x⁽¹⁾ = φ(x⁽⁰⁾).  [juge value]  départ : 12·(6)/(9 + 6)
    ? Que peut-on dire de la convergence ? ✔ Converge vers 3 pour x⁽⁰⁾ assez proche : |φ′(3)| = 3/4 < 1 ; jamais vers 0 : φ′(0) = 4/3 > 1 / · On regarde f(x) = φ(x) − x : |f′(3)| = 1/4 < 1, donc ça converge / · On regarde φ′(x⁽⁰⁾) = φ′(6) = 12/25 / · Converge vers 0, l'autre point fixe
    = □   (trous : 24/5)   ← erreur |x − 3| = 9/5
  aides : Regarde la pente de φ au point fixe : si |φ′(α)| < 1, φ rapproche les points de α. | φ′(x) = 108/(9 + x)², donc φ′(3) = □. | φ′(3) = 3/4 < 1 : la méthode converge vers 3, l'erreur est environ multipliée par 3/4 à chaque pas.
  pièges : n_fp_f_vs_phi, n_fp_phi_at_x0

Point fixe pour φ(x) = 9x/(6 + x), x⁽⁰⁾ = 7. Calcule φ′(3), décide si la méthode converge vers 3, puis calcule x⁽¹⁾.
  [guided]  54/(6 + 3)²
    (Les points fixes sont 0 et 3, et φ′(x) = 54/(6 + x)². La pente au point fixe α = 3.)
    = □   (trous : 2/3)   ← = b/a
  — Puis une itération à partir de x⁽⁰⁾ = 7. x⁽¹⁾ = φ(x⁽⁰⁾).  [juge value]  départ : 9·(7)/(6 + 7)
    ? Que peut-on dire de la convergence ? ✔ Converge vers 3 pour x⁽⁰⁾ assez proche : |φ′(3)| = 2/3 < 1 ; jamais vers 0 : φ′(0) = 3/2 > 1 / · On regarde f(x) = φ(x) − x : |f′(3)| = 1/3 < 1, donc ça converge / · On regarde φ′(x⁽⁰⁾) = φ′(7) = 54/169 / · Converge vers 0, l'autre point fixe
    = □   (trous : 63/13)   ← erreur |x − 3| = 24/13
  aides : Regarde la pente de φ au point fixe : si |φ′(α)| < 1, φ rapproche les points de α. | φ′(x) = 54/(6 + x)², donc φ′(3) = □. | φ′(3) = 2/3 < 1 : la méthode converge vers 3, l'erreur est environ multipliée par 2/3 à chaque pas.
  pièges : n_fp_f_vs_phi, n_fp_phi_at_x0

Point fixe pour φ(x) = 12x/(9 + x), x⁽⁰⁾ = 6. Calcule φ′(3), décide si la méthode converge vers 3, puis calcule x⁽¹⁾.
  [guided]  108/(9 + 3)²
    (Les points fixes sont 0 et 3, et φ′(x) = 108/(9 + x)². La pente au point fixe α = 3.)
    = □   (trous : 3/4)   ← = b/a
  — Puis une itération à partir de x⁽⁰⁾ = 6. x⁽¹⁾ = φ(x⁽⁰⁾).  [juge value]  départ : 12·(6)/(9 + 6)
    ? Que peut-on dire de la convergence ? ✔ Converge vers 3 pour x⁽⁰⁾ assez proche : |φ′(3)| = 3/4 < 1 ; jamais vers 0 : φ′(0) = 4/3 > 1 / · On regarde f(x) = φ(x) − x : |f′(3)| = 1/4 < 1, donc ça converge / · On regarde φ′(x⁽⁰⁾) = φ′(6) = 12/25 / · Converge vers 0, l'autre point fixe
    = □   (trous : 24/5)   ← erreur |x − 3| = 9/5
  aides : Regarde la pente de φ au point fixe : si |φ′(α)| < 1, φ rapproche les points de α. | φ′(x) = 108/(9 + x)², donc φ′(3) = □. | φ′(3) = 3/4 < 1 : la méthode converge vers 3, l'erreur est environ multipliée par 3/4 à chaque pas.
  pièges : n_fp_f_vs_phi, n_fp_phi_at_x0

```

### Niveau 2

```
Point fixe pour φ(x) = 12x/(9 + x) : trouve les points fixes (φ(x) = x), puis φ′(x).
  [guided]  12x/(9 + x) = x
    = x(□ − x) = 0   (trous : x(3 − x) = 0)   ← 12x = x(9 + x) ⇔ x² − 3x = 0
    = x = 0 ou x = 3   ← Deux points fixes
  — La dérivée de φ.  [juge equiv]  départ : (12x/(9 + x))′
    = □/(9 + x)²   (trous : 108/(9 + x)²)   ← Quotient : (a(b + x) − ax)/(b + x)²
  aides : Regarde la pente de φ au point fixe : si |φ′(α)| < 1, φ rapproche les points de α. | φ′(x) = 108/(9 + x)², donc φ′(3) = □. | φ′(3) = 3/4 < 1 : la méthode converge vers 3, l'erreur est environ multipliée par 3/4 à chaque pas.
  pièges : n_fp_f_vs_phi, n_fp_phi_at_x0

Point fixe pour φ(x) = 6x/(2 + x) : trouve les points fixes (φ(x) = x), puis φ′(x).
  [guided]  6x/(2 + x) = x
    = x(□ − x) = 0   (trous : x(4 − x) = 0)   ← 6x = x(2 + x) ⇔ x² − 4x = 0
    = x = 0 ou x = 4   ← Deux points fixes
  — La dérivée de φ.  [juge equiv]  départ : (6x/(2 + x))′
    = □/(2 + x)²   (trous : 12/(2 + x)²)   ← Quotient : (a(b + x) − ax)/(b + x)²
  aides : Regarde la pente de φ au point fixe : si |φ′(α)| < 1, φ rapproche les points de α. | φ′(x) = 12/(2 + x)², donc φ′(4) = □. | φ′(4) = 1/3 < 1 : la méthode converge vers 4, l'erreur est environ multipliée par 1/3 à chaque pas.
  pièges : n_fp_f_vs_phi, n_fp_phi_at_x0

Point fixe pour φ(x) = 8x/(2 + x) : trouve les points fixes (φ(x) = x), puis φ′(x).
  [guided]  8x/(2 + x) = x
    = x(□ − x) = 0   (trous : x(6 − x) = 0)   ← 8x = x(2 + x) ⇔ x² − 6x = 0
    = x = 0 ou x = 6   ← Deux points fixes
  — La dérivée de φ.  [juge equiv]  départ : (8x/(2 + x))′
    = □/(2 + x)²   (trous : 16/(2 + x)²)   ← Quotient : (a(b + x) − ax)/(b + x)²
  aides : Regarde la pente de φ au point fixe : si |φ′(α)| < 1, φ rapproche les points de α. | φ′(x) = 16/(2 + x)², donc φ′(6) = □. | φ′(6) = 1/4 < 1 : la méthode converge vers 6, l'erreur est environ multipliée par 1/4 à chaque pas.
  pièges : n_fp_f_vs_phi, n_fp_phi_at_x0

```

### Niveau 3

```
On cherche α = 3, racine de f(x) = x² − x − 6. Trois reformulations x = φᵢ(x) : φ₁(x) = x² − 6, φ₂(x) = √(x + 6), φ₃(x) = 1 + 6/x. Choisis celle qui converge le plus vite vers 3, puis calcule sa pente en α.
  [tap, suivre l'erreur, menu menu]  (√(x + 6))′
    ? Quelle fonction d'itération choisis-tu ? ✔ φ₂(x) = √(x + 6) : |φ₂′(3)| = 1/6 / ✔ φ₃(x) = 1 + 6/x : |φ₃′(3)| = 2/3 / · φ₁(x) = x² − 6 : φ₁′(3) = 6
    = 1/(2√(x + 6))   ← (√u)′ = u′/(2√u)
  — La pente en α = 3.  [juge value]  départ : 1/(2√(3 + 6))
    = 1/6   ← √9 = 3
  aides : La méthode converge le plus vite quand |φ′(α)| est le plus petit (et < 1). | φ₂′(x) = 1/(2√(x + 6)), donc φ₂′(3) = 1/(2·□). | φ₂′(3) = 1/6, φ₃′(3) = −2/3, φ₁′(3) = 6 : φ₂ est la plus rapide.

On cherche α = 2, racine de f(x) = x² − x − 2. Trois reformulations x = φᵢ(x) : φ₁(x) = x² − 2, φ₂(x) = √(x + 2), φ₃(x) = 1 + 2/x. Choisis celle qui converge le plus vite vers 2, puis calcule sa pente en α.
  [tap, suivre l'erreur, menu menu]  (√(x + 2))′
    ? Quelle fonction d'itération choisis-tu ? ✔ φ₂(x) = √(x + 2) : |φ₂′(2)| = 1/4 / ✔ φ₃(x) = 1 + 2/x : |φ₃′(2)| = 1/2 / · φ₁(x) = x² − 2 : φ₁′(2) = 4
    = 1/(2√(x + 2))   ← (√u)′ = u′/(2√u)
  — La pente en α = 2.  [juge value]  départ : 1/(2√(2 + 2))
    = 1/4   ← √4 = 2
  aides : La méthode converge le plus vite quand |φ′(α)| est le plus petit (et < 1). | φ₂′(x) = 1/(2√(x + 2)), donc φ₂′(2) = 1/(2·□). | φ₂′(2) = 1/4, φ₃′(2) = −1/2, φ₁′(2) = 4 : φ₂ est la plus rapide.

On cherche α = 4, racine de f(x) = x² − x − 12. Trois reformulations x = φᵢ(x) : φ₁(x) = x² − 12, φ₂(x) = √(x + 12), φ₃(x) = 1 + 12/x. Choisis celle qui converge le plus vite vers 4, puis calcule sa pente en α.
  [tap, suivre l'erreur, menu menu]  (√(x + 12))′
    ? Quelle fonction d'itération choisis-tu ? ✔ φ₂(x) = √(x + 12) : |φ₂′(4)| = 1/8 / ✔ φ₃(x) = 1 + 12/x : |φ₃′(4)| = 3/4 / · φ₁(x) = x² − 12 : φ₁′(4) = 8
    = 1/(2√(x + 12))   ← (√u)′ = u′/(2√u)
  — La pente en α = 4.  [juge value]  départ : 1/(2√(4 + 12))
    = 1/8   ← √16 = 4
  aides : La méthode converge le plus vite quand |φ′(α)| est le plus petit (et < 1). | φ₂′(x) = 1/(2√(x + 12)), donc φ₂′(4) = 1/(2·□). | φ₂′(4) = 1/8, φ₃′(4) = −3/4, φ₁′(4) = 8 : φ₂ est la plus rapide.

```

### Niveau 4

```
Point fixe pour φ(x) = 4x/(2 + x), x⁽⁰⁾ = 1 : points fixes, φ′, φ′(α), conclusion, puis x⁽¹⁾, x⁽²⁾, x⁽³⁾.
  [free, suivre l'erreur]  4x/(2 + x) = x
    = x(2 − x) = 0   ← 4x = x(2 + x) ⇔ x² − 2x = 0
    = x = 0 ou x = 2   ← Deux points fixes
  — La dérivée de φ.  [juge equiv]  départ : (4x/(2 + x))′
    = 8/(2 + x)²   ← Quotient : (a(b + x) − ax)/(b + x)²
  — La pente au point fixe α = 2.  [juge value]  départ : 8/(2 + 2)²
    = 1/2   ← = b/a
  — x⁽¹⁾ = φ(x⁽⁰⁾).  [juge value]  départ : 4·(1)/(2 + 1)
    ? Que peut-on dire de la convergence ? ✔ Converge vers 2 pour x⁽⁰⁾ assez proche : |φ′(2)| = 1/2 < 1 ; jamais vers 0 : φ′(0) = 2 > 1 / · On regarde f(x) = φ(x) − x : |f′(2)| = 1/2 < 1, donc ça converge / · On regarde φ′(x⁽⁰⁾) = φ′(1) = 8/9 / · Converge vers 0, l'autre point fixe
    = 4/3   ← erreur |x − 2| = 2/3
  — x⁽²⁾ = φ(x⁽¹⁾).  [juge value]  départ : 4·(4/3)/(2 + 4/3)
    = 8/5   ← erreur |x − 2| = 2/5
  — x⁽³⁾ = φ(x⁽²⁾).  [juge value]  départ : 4·(8/5)/(2 + 8/5)
    = 16/9   ← erreur |x − 2| = 2/9
  aides : Regarde la pente de φ au point fixe : si |φ′(α)| < 1, φ rapproche les points de α. | φ′(x) = 8/(2 + x)², donc φ′(2) = □. | φ′(2) = 1/2 < 1 : la méthode converge vers 2, l'erreur est environ multipliée par 1/2 à chaque pas.
  pièges : n_fp_f_vs_phi, n_fp_phi_at_x0

Point fixe pour φ(x) = 4x/(2 + x), x⁽⁰⁾ = 5 : points fixes, φ′, φ′(α), conclusion, puis x⁽¹⁾, x⁽²⁾, x⁽³⁾.
  [free, suivre l'erreur]  4x/(2 + x) = x
    = x(2 − x) = 0   ← 4x = x(2 + x) ⇔ x² − 2x = 0
    = x = 0 ou x = 2   ← Deux points fixes
  — La dérivée de φ.  [juge equiv]  départ : (4x/(2 + x))′
    = 8/(2 + x)²   ← Quotient : (a(b + x) − ax)/(b + x)²
  — La pente au point fixe α = 2.  [juge value]  départ : 8/(2 + 2)²
    = 1/2   ← = b/a
  — x⁽¹⁾ = φ(x⁽⁰⁾).  [juge value]  départ : 4·(5)/(2 + 5)
    ? Que peut-on dire de la convergence ? ✔ Converge vers 2 pour x⁽⁰⁾ assez proche : |φ′(2)| = 1/2 < 1 ; jamais vers 0 : φ′(0) = 2 > 1 / · On regarde f(x) = φ(x) − x : |f′(2)| = 1/2 < 1, donc ça converge / · On regarde φ′(x⁽⁰⁾) = φ′(5) = 8/49 / · Converge vers 0, l'autre point fixe
    = 20/7   ← erreur |x − 2| = 6/7
  — x⁽²⁾ = φ(x⁽¹⁾).  [juge value]  départ : 4·(20/7)/(2 + 20/7)
    = 40/17   ← erreur |x − 2| = 6/17
  — x⁽³⁾ = φ(x⁽²⁾).  [juge value]  départ : 4·(40/17)/(2 + 40/17)
    = 80/37   ← erreur |x − 2| = 6/37
  aides : Regarde la pente de φ au point fixe : si |φ′(α)| < 1, φ rapproche les points de α. | φ′(x) = 8/(2 + x)², donc φ′(2) = □. | φ′(2) = 1/2 < 1 : la méthode converge vers 2, l'erreur est environ multipliée par 1/2 à chaque pas.
  pièges : n_fp_f_vs_phi, n_fp_phi_at_x0

Point fixe pour φ(x) = 12x/(9 + x), x⁽⁰⁾ = 4 : points fixes, φ′, φ′(α), conclusion, puis x⁽¹⁾, x⁽²⁾, x⁽³⁾.
  [free, suivre l'erreur]  12x/(9 + x) = x
    = x(3 − x) = 0   ← 12x = x(9 + x) ⇔ x² − 3x = 0
    = x = 0 ou x = 3   ← Deux points fixes
  — La dérivée de φ.  [juge equiv]  départ : (12x/(9 + x))′
    = 108/(9 + x)²   ← Quotient : (a(b + x) − ax)/(b + x)²
  — La pente au point fixe α = 3.  [juge value]  départ : 108/(9 + 3)²
    = 3/4   ← = b/a
  — x⁽¹⁾ = φ(x⁽⁰⁾).  [juge value]  départ : 12·(4)/(9 + 4)
    ? Que peut-on dire de la convergence ? ✔ Converge vers 3 pour x⁽⁰⁾ assez proche : |φ′(3)| = 3/4 < 1 ; jamais vers 0 : φ′(0) = 4/3 > 1 / · On regarde f(x) = φ(x) − x : |f′(3)| = 1/4 < 1, donc ça converge / · On regarde φ′(x⁽⁰⁾) = φ′(4) = 108/169 / · Converge vers 0, l'autre point fixe
    = 48/13   ← erreur |x − 3| = 9/13
  — x⁽²⁾ = φ(x⁽¹⁾).  [juge value]  départ : 12·(48/13)/(9 + 48/13)
    = 192/55   ← erreur |x − 3| = 27/55
  — x⁽³⁾ = φ(x⁽²⁾).  [juge value]  départ : 12·(192/55)/(9 + 192/55)
    = 768/229   ← erreur |x − 3| = 81/229
  aides : Regarde la pente de φ au point fixe : si |φ′(α)| < 1, φ rapproche les points de α. | φ′(x) = 108/(9 + x)², donc φ′(3) = □. | φ′(3) = 3/4 < 1 : la méthode converge vers 3, l'erreur est environ multipliée par 3/4 à chaque pas.
  pièges : n_fp_f_vs_phi, n_fp_phi_at_x0

```

### Niveau 5

```
Complète la méthode du point fixe : elle s'arrête quand |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| < tol et renvoie [x, nombre d'itérations].
  [code python, 3 trous, sans aide]
    | def fixed_point(phi, x0, tol, nmax):
    |     x = x0
    |     for k in range(nmax):
    |         x_new = ⟦phi(x)⟧
    |         if ⟦abs(x_new - x) < tol⟧:
    |             return [x_new, k + 1]
    |         x = ⟦x_new⟧
    |     return [x, nmax]
    test : def phi(x): return 2*x/(1+x) ; fixed_point(phi, 2.0, 1e-6, 100) → [1.000000953675226, 19]
    test : def phi(x): return 3*x/(1+x) ; fixed_point(phi, 1.0, 1e-8, 100) → [1.9999999982792167, 19]
    test : def phi(x): return math.cos(x) ; fixed_point(phi, 1.0, 1e-10, 1000) → [0.7390851332451103, 58]
  puis : Les incréments de fixed_point pour φ(x) = 2x/(1 + x), x⁽⁰⁾ = 2 :
      [tableau à lire, sans aide]
        k | δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| | δₖ/δₖ₋₁
        0 | 6.667e-01 | 
        1 | 1.905e-01 | 0,286
        2 | 7.619e-02 | 0,400
        3 | 3.441e-02 | 0,452
        4 | 1.639e-02 | 0,476
        5 | 7.999e-03 | 0,488
        6 | 3.952e-03 | 0,494
      question : Que lit-on sur ce tableau ? Une ou plusieurs réponses justes.
          ✔ La méthode est d'ordre 1 : δₖ/δₖ₋₁ tend vers φ′(1) = 1/2   · La méthode est d'ordre 2, car les incréments diminuent [n_order_simple_ratio]   · La méthode converge vers 0   ✔ L'erreur est environ multipliée par 1/2 à chaque pas
          pièges : n_order_simple_ratio
      pièges : n_order_simple_ratio

Complète la méthode du point fixe : elle s'arrête quand |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| < tol et renvoie [x, nombre d'itérations].
  [code python, 3 trous, sans aide]
    | def fixed_point(phi, x0, tol, nmax):
    |     x = x0
    |     for k in range(nmax):
    |         x_new = ⟦phi(x)⟧
    |         if ⟦abs(x_new - x) < tol⟧:
    |             return [x_new, k + 1]
    |         x = ⟦x_new⟧
    |     return [x, nmax]
    test : def phi(x): return 2*x/(1+x) ; fixed_point(phi, 2.0, 1e-6, 100) → [1.000000953675226, 19]
    test : def phi(x): return 3*x/(1+x) ; fixed_point(phi, 1.0, 1e-8, 100) → [1.9999999982792167, 19]
    test : def phi(x): return math.cos(x) ; fixed_point(phi, 1.0, 1e-10, 1000) → [0.7390851332451103, 58]
  puis : Les incréments de fixed_point pour φ(x) = 12x/(3 + x), x⁽⁰⁾ = 4 :
      [tableau à lire, sans aide]
        k | δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| | δₖ/δₖ₋₁
        0 | 2.857e+00 | 
        1 | 1.491e+00 | 0,522
        2 | 4.798e-01 | 0,322
        3 | 1.287e-01 | 0,268
        4 | 3.276e-02 | 0,255
        5 | 8.227e-03 | 0,251
        6 | 2.059e-03 | 0,250
      question : Que lit-on sur ce tableau ? Une ou plusieurs réponses justes.
          · La méthode converge vers 0   ✔ La méthode est d'ordre 1 : δₖ/δₖ₋₁ tend vers φ′(9) = 1/4   ✔ L'erreur est environ multipliée par 1/4 à chaque pas   · La méthode est d'ordre 2, car les incréments diminuent [n_order_simple_ratio]
          pièges : n_order_simple_ratio
      pièges : n_order_simple_ratio

Complète la méthode du point fixe : elle s'arrête quand |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| < tol et renvoie [x, nombre d'itérations].
  [code python, 3 trous, sans aide]
    | def fixed_point(phi, x0, tol, nmax):
    |     x = x0
    |     for k in range(nmax):
    |         x_new = ⟦phi(x)⟧
    |         if ⟦abs(x_new - x) < tol⟧:
    |             return [x_new, k + 1]
    |         x = ⟦x_new⟧
    |     return [x, nmax]
    test : def phi(x): return 2*x/(1+x) ; fixed_point(phi, 2.0, 1e-6, 100) → [1.000000953675226, 19]
    test : def phi(x): return 3*x/(1+x) ; fixed_point(phi, 1.0, 1e-8, 100) → [1.9999999982792167, 19]
    test : def phi(x): return math.cos(x) ; fixed_point(phi, 1.0, 1e-10, 1000) → [0.7390851332451103, 58]
  puis : Les incréments de fixed_point pour φ(x) = 6x/(4 + x), x⁽⁰⁾ = 3 :
      [tableau à lire, sans aide]
        k | δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| | δₖ/δₖ₋₁
        0 | 4.286e-01 | 
        1 | 2.236e-01 | 0,522
        2 | 1.286e-01 | 0,575
        3 | 7.821e-02 | 0,608
        4 | 4.915e-02 | 0,628
        5 | 3.153e-02 | 0,642
        6 | 2.050e-02 | 0,650
      question : Que lit-on sur ce tableau ? Une ou plusieurs réponses justes.
          · La méthode converge vers 0   · La méthode est d'ordre 2, car les incréments diminuent [n_order_simple_ratio]   ✔ La méthode est d'ordre 1 : δₖ/δₖ₋₁ tend vers φ′(2) = 2/3   ✔ L'erreur est environ multipliée par 2/3 à chaque pas
          pièges : n_order_simple_ratio
      pièges : n_order_simple_ratio

```

### Variantes d'examen

```
On cherche α = 3, racine de f(x) = x² − x − 6. Laquelle de ces fonctions d'itération donne une méthode de point fixe qui converge vers 3 (pour x⁽⁰⁾ assez proche) ?
  ✔ φ(x) = √(x + 6)   · φ(x) = x − (4/5)(x² − x − 6), car φ′(3) = −3 < 1 [n_fp_abs_forgot]   · φ(x) = x + (x² − x − 6)/5   · φ(x) = x² − 6
  [examen mcq]
  pièges : n_fp_abs_forgot

Vrai ou faux ?
  « Pour une méthode de point fixe, le résidu |x⁽ᵏ⁾ − φ(x⁽ᵏ⁾)| est toujours une bonne estimation de l'erreur |x⁽ᵏ⁾ − α|. » → FAUX
    contre-exemple (num) : phi = 0,99x+0,01, x0 = 2
  [examen tf]

```

## Ordre d'un point fixe, ordre selon un paramètre (`n-fp-order`, BA4)

_La première dérivée de φ non nulle en α donne l'ordre ; choisir un paramètre pour l'augmenter._

### Niveau 1

```
φ_ω(x) = x − ω(x² − 5x + 6), de point fixe α = 3. Calcule φ_ω′, trouve ω* qui annule φ_ω′(α), puis φ″(α) pour conclure l'ordre.
  [guided]  (x − ω(x² − 5x + 6))′
    = 1 − ω(□)   (trous : 1 − ω(2x − 5))   ← φ′ = 1 − ω·f′
  — φ_ω′(3) = 1−ω : pour quel ω est-il nul ?  [juge solset]  départ : 1 − ω = 0
    = ω = □   (trous : ω = 1)   ← ω* = 1/f′(3)
  — φ_ω″(x) = −2ω. Sa valeur en α pour ω = ω* :  [juge value]  départ : −2·(1)
    = □   (trous : −2)   ← ≠ 0
  aides : L'ordre est le rang de la première dérivée de φ qui ne s'annule pas en α. | φ′(3) = 1 − ω·□ | φ′(3) = 1−ω = 0 ⇔ ω = 1 ; φ″(3) = −2 ≠ 0 : ordre 2.
  pièges : n_fp_order_count

φ_ω(x) = x − ω(x² − 3x + 2), de point fixe α = 1. Calcule φ_ω′, trouve ω* qui annule φ_ω′(α), puis φ″(α) pour conclure l'ordre.
  [guided]  (x − ω(x² − 3x + 2))′
    = 1 − ω(□)   (trous : 1 − ω(2x − 3))   ← φ′ = 1 − ω·f′
  — φ_ω′(1) = 1+ω : pour quel ω est-il nul ?  [juge solset]  départ : 1 + ω = 0
    = ω = □   (trous : ω = −1)   ← ω* = 1/f′(1)
  — φ_ω″(x) = −2ω. Sa valeur en α pour ω = ω* :  [juge value]  départ : −2·(−1)
    = □   (trous : 2)   ← ≠ 0
  aides : L'ordre est le rang de la première dérivée de φ qui ne s'annule pas en α. | φ′(1) = 1 − ω·□ | φ′(1) = 1+ω = 0 ⇔ ω = −1 ; φ″(1) = 2 ≠ 0 : ordre 2.
  pièges : n_fp_order_count

φ_ω(x) = x − ω(x² + 3x − 4), de point fixe α = 1. Calcule φ_ω′, trouve ω* qui annule φ_ω′(α), puis φ″(α) pour conclure l'ordre.
  [guided]  (x − ω(x² + 3x − 4))′
    = 1 − ω(□)   (trous : 1 − ω(2x + 3))   ← φ′ = 1 − ω·f′
  — φ_ω′(1) = 1−5ω : pour quel ω est-il nul ?  [juge solset]  départ : 1 − 5ω = 0
    = ω = □   (trous : ω = 1/5)   ← ω* = 1/f′(1)
  — φ_ω″(x) = −2ω. Sa valeur en α pour ω = ω* :  [juge value]  départ : −2·(1/5)
    = □   (trous : −2/5)   ← ≠ 0
  aides : L'ordre est le rang de la première dérivée de φ qui ne s'annule pas en α. | φ′(1) = 1 − ω·□ | φ′(1) = 1−5ω = 0 ⇔ ω = 1/5 ; φ″(1) = −2/5 ≠ 0 : ordre 2.
  pièges : n_fp_order_count

```

### Niveau 2

```
φ_ω(x) = x − ω(x² − 2x − 3), de point fixe α = 3. Calcule φ_ω′, trouve ω* qui annule φ_ω′(α), puis φ″(α) pour conclure l'ordre.
  [guided]  (x − ω(x² − 2x − 3))′
    = 1 − ω(2x − 2)   ← φ′ = 1 − ω·f′
  — φ_ω′(3) = 1−4ω : pour quel ω est-il nul ?  [juge solset]  départ : 1 − 4ω = 0
    = ω = □   (trous : ω = 1/4)   ← ω* = 1/f′(3)
  — φ_ω″(x) = −2ω. Sa valeur en α pour ω = ω* :  [juge value]  départ : −2·(1/4)
    = □   (trous : −1/2)   ← ≠ 0
  — L'ordre de la méthode pour ω = ω* :  [juge value]  départ : p
    ? φ′(3) = 0 et φ″(3) = −1/2. Quel est l'ordre ? ✔ φ″(α) ≠ 0 : ordre exactement 2 / · φ′(α) = 0, une dérivée de plus : ordre 3 / · φ″(α) ≠ 0 : ordre 1
    = 2   ← φ′(α) = 0 et φ″(α) ≠ 0
  aides : L'ordre est le rang de la première dérivée de φ qui ne s'annule pas en α. | φ′(3) = 1 − ω·□ | φ′(3) = 1−4ω = 0 ⇔ ω = 1/4 ; φ″(3) = −1/2 ≠ 0 : ordre 2.
  pièges : n_fp_order_count

φ_ω(x) = x − ω(x² + 3x − 4), de point fixe α = 1. Calcule φ_ω′, trouve ω* qui annule φ_ω′(α), puis φ″(α) pour conclure l'ordre.
  [guided]  (x − ω(x² + 3x − 4))′
    = 1 − ω(2x + 3)   ← φ′ = 1 − ω·f′
  — φ_ω′(1) = 1−5ω : pour quel ω est-il nul ?  [juge solset]  départ : 1 − 5ω = 0
    = ω = □   (trous : ω = 1/5)   ← ω* = 1/f′(1)
  — φ_ω″(x) = −2ω. Sa valeur en α pour ω = ω* :  [juge value]  départ : −2·(1/5)
    = □   (trous : −2/5)   ← ≠ 0
  — L'ordre de la méthode pour ω = ω* :  [juge value]  départ : p
    ? φ′(1) = 0 et φ″(1) = −2/5. Quel est l'ordre ? ✔ φ″(α) ≠ 0 : ordre exactement 2 / · φ′(α) = 0, une dérivée de plus : ordre 3 / · φ″(α) ≠ 0 : ordre 1
    = 2   ← φ′(α) = 0 et φ″(α) ≠ 0
  aides : L'ordre est le rang de la première dérivée de φ qui ne s'annule pas en α. | φ′(1) = 1 − ω·□ | φ′(1) = 1−5ω = 0 ⇔ ω = 1/5 ; φ″(1) = −2/5 ≠ 0 : ordre 2.
  pièges : n_fp_order_count

φ_ω(x) = x − ω(x² − x), de point fixe α = 1. Calcule φ_ω′, trouve ω* qui annule φ_ω′(α), puis φ″(α) pour conclure l'ordre.
  [guided]  (x − ω(x² − x))′
    = 1 − ω(2x − 1)   ← φ′ = 1 − ω·f′
  — φ_ω′(1) = 1−ω : pour quel ω est-il nul ?  [juge solset]  départ : 1 − ω = 0
    = ω = □   (trous : ω = 1)   ← ω* = 1/f′(1)
  — φ_ω″(x) = −2ω. Sa valeur en α pour ω = ω* :  [juge value]  départ : −2·(1)
    = □   (trous : −2)   ← ≠ 0
  — L'ordre de la méthode pour ω = ω* :  [juge value]  départ : p
    ? φ′(1) = 0 et φ″(1) = −2. Quel est l'ordre ? ✔ φ″(α) ≠ 0 : ordre exactement 2 / · φ′(α) = 0, une dérivée de plus : ordre 3 / · φ″(α) ≠ 0 : ordre 1
    = 2   ← φ′(α) = 0 et φ″(α) ≠ 0
  aides : L'ordre est le rang de la première dérivée de φ qui ne s'annule pas en α. | φ′(1) = 1 − ω·□ | φ′(1) = 1−ω = 0 ⇔ ω = 1 ; φ″(1) = −2 ≠ 0 : ordre 2.
  pièges : n_fp_order_count

```

### Niveau 3

```
φ_ω(x) = x − ω(x² + x − 6), de point fixe α = 2. Calcule φ_ω′, trouve ω* qui annule φ_ω′(α), puis φ″(α) pour conclure l'ordre.
  [tap, suivre l'erreur, menu menu]  (x − ω(x² + x − 6))′
    = 1 − ω(2x + 1)   ← φ′ = 1 − ω·f′
  — φ_ω′(2) = 1−5ω : pour quel ω est-il nul ?  [juge solset]  départ : 1 − 5ω = 0
    = ω = 1/5   ← ω* = 1/f′(2)
  — φ_ω″(x) = −2ω. Sa valeur en α pour ω = ω* :  [juge value]  départ : −2·(1/5)
    = −2/5   ← ≠ 0
  — L'ordre de la méthode pour ω = ω* :  [juge value]  départ : p
    = 2   ← φ′(α) = 0 et φ″(α) ≠ 0
  aides : L'ordre est le rang de la première dérivée de φ qui ne s'annule pas en α. | φ′(2) = 1 − ω·□ | φ′(2) = 1−5ω = 0 ⇔ ω = 1/5 ; φ″(2) = −2/5 ≠ 0 : ordre 2.
  pièges : n_fp_order_count

φ_ω(x) = x − ω(x² − 2x − 15), de point fixe α = 5. Calcule φ_ω′, trouve ω* qui annule φ_ω′(α), puis φ″(α) pour conclure l'ordre.
  [tap, suivre l'erreur, menu menu]  (x − ω(x² − 2x − 15))′
    = 1 − ω(2x − 2)   ← φ′ = 1 − ω·f′
  — φ_ω′(5) = 1−8ω : pour quel ω est-il nul ?  [juge solset]  départ : 1 − 8ω = 0
    = ω = 1/8   ← ω* = 1/f′(5)
  — φ_ω″(x) = −2ω. Sa valeur en α pour ω = ω* :  [juge value]  départ : −2·(1/8)
    = −1/4   ← ≠ 0
  — L'ordre de la méthode pour ω = ω* :  [juge value]  départ : p
    = 2   ← φ′(α) = 0 et φ″(α) ≠ 0
  aides : L'ordre est le rang de la première dérivée de φ qui ne s'annule pas en α. | φ′(5) = 1 − ω·□ | φ′(5) = 1−8ω = 0 ⇔ ω = 1/8 ; φ″(5) = −1/4 ≠ 0 : ordre 2.
  pièges : n_fp_order_count

φ_ω(x) = x − ω(x² − 16), de point fixe α = 4. Calcule φ_ω′, trouve ω* qui annule φ_ω′(α), puis φ″(α) pour conclure l'ordre.
  [tap, suivre l'erreur, menu menu]  (x − ω(x² − 16))′
    = 1 − ω(2x)   ← φ′ = 1 − ω·f′
  — φ_ω′(4) = 1−8ω : pour quel ω est-il nul ?  [juge solset]  départ : 1 − 8ω = 0
    = ω = 1/8   ← ω* = 1/f′(4)
  — φ_ω″(x) = −2ω. Sa valeur en α pour ω = ω* :  [juge value]  départ : −2·(1/8)
    = −1/4   ← ≠ 0
  — L'ordre de la méthode pour ω = ω* :  [juge value]  départ : p
    = 2   ← φ′(α) = 0 et φ″(α) ≠ 0
  aides : L'ordre est le rang de la première dérivée de φ qui ne s'annule pas en α. | φ′(4) = 1 − ω·□ | φ′(4) = 1−8ω = 0 ⇔ ω = 1/8 ; φ″(4) = −1/4 ≠ 0 : ordre 2.
  pièges : n_fp_order_count

```

### Niveau 4

```
φ_ω(x) = x − ω(x² + x − 12), de point fixe α = 3. Vérifie que α est point fixe pour tout ω, trouve ω* pour que la méthode soit d'ordre ≥ 2, son ordre exact, puis les ω pour lesquels elle converge.
  [free, suivre l'erreur]  3 − ω·(3² + 1·3 − 12)
    = 3   ← f(3) = 0, donc φ_ω(3) = 3 pour tout ω
  — φ_ω′(x) :  [juge equiv]  départ : (x − ω(x² + x − 12))′
    = 1 − ω(2x + 1)   ← φ′ = 1 − ω·f′
  — φ_ω′(3) = 1−7ω : pour quel ω est-il nul ?  [juge solset]  départ : 1 − 7ω = 0
    = ω = 1/7   ← ω* = 1/f′(3)
  — φ_ω″(x) = −2ω. Sa valeur en α pour ω = ω* :  [juge value]  départ : −2·(1/7)
    = −2/7   ← ≠ 0
  — L'ordre de la méthode pour ω = ω* :  [juge value]  départ : p
    = 2   ← φ′(α) = 0 et φ″(α) ≠ 0
  — Pour quels ω la méthode converge-t-elle vers 3 (|φ_ω′(3)| < 1) ?  [juge solset]  départ : |1 − 7ω| < 1
    = ]0 ; 2/7[   ← −1 < 1−7ω < 1
  aides : L'ordre est le rang de la première dérivée de φ qui ne s'annule pas en α. | φ′(3) = 1 − ω·□ | φ′(3) = 1−7ω = 0 ⇔ ω = 1/7 ; φ″(3) = −2/7 ≠ 0 : ordre 2.
  pièges : n_fp_order_count

φ_ω(x) = x − ω(x² − 5x + 6), de point fixe α = 3. Vérifie que α est point fixe pour tout ω, trouve ω* pour que la méthode soit d'ordre ≥ 2, son ordre exact, puis les ω pour lesquels elle converge.
  [free, suivre l'erreur]  3 − ω·(3² − 5·3 + 6)
    = 3   ← f(3) = 0, donc φ_ω(3) = 3 pour tout ω
  — φ_ω′(x) :  [juge equiv]  départ : (x − ω(x² − 5x + 6))′
    = 1 − ω(2x − 5)   ← φ′ = 1 − ω·f′
  — φ_ω′(3) = 1−ω : pour quel ω est-il nul ?  [juge solset]  départ : 1 − ω = 0
    = ω = 1   ← ω* = 1/f′(3)
  — φ_ω″(x) = −2ω. Sa valeur en α pour ω = ω* :  [juge value]  départ : −2·(1)
    = −2   ← ≠ 0
  — L'ordre de la méthode pour ω = ω* :  [juge value]  départ : p
    = 2   ← φ′(α) = 0 et φ″(α) ≠ 0
  — Pour quels ω la méthode converge-t-elle vers 3 (|φ_ω′(3)| < 1) ?  [juge solset]  départ : |1 − ω| < 1
    = ]0 ; 2[   ← −1 < 1−ω < 1
  aides : L'ordre est le rang de la première dérivée de φ qui ne s'annule pas en α. | φ′(3) = 1 − ω·□ | φ′(3) = 1−ω = 0 ⇔ ω = 1 ; φ″(3) = −2 ≠ 0 : ordre 2.
  pièges : n_fp_order_count

φ_ω(x) = x − ω(x² + x − 6), de point fixe α = 2. Vérifie que α est point fixe pour tout ω, trouve ω* pour que la méthode soit d'ordre ≥ 2, son ordre exact, puis les ω pour lesquels elle converge.
  [free, suivre l'erreur]  2 − ω·(2² + 1·2 − 6)
    = 2   ← f(2) = 0, donc φ_ω(2) = 2 pour tout ω
  — φ_ω′(x) :  [juge equiv]  départ : (x − ω(x² + x − 6))′
    = 1 − ω(2x + 1)   ← φ′ = 1 − ω·f′
  — φ_ω′(2) = 1−5ω : pour quel ω est-il nul ?  [juge solset]  départ : 1 − 5ω = 0
    = ω = 1/5   ← ω* = 1/f′(2)
  — φ_ω″(x) = −2ω. Sa valeur en α pour ω = ω* :  [juge value]  départ : −2·(1/5)
    = −2/5   ← ≠ 0
  — L'ordre de la méthode pour ω = ω* :  [juge value]  départ : p
    = 2   ← φ′(α) = 0 et φ″(α) ≠ 0
  — Pour quels ω la méthode converge-t-elle vers 2 (|φ_ω′(2)| < 1) ?  [juge solset]  départ : |1 − 5ω| < 1
    = ]0 ; 2/5[   ← −1 < 1−5ω < 1
  aides : L'ordre est le rang de la première dérivée de φ qui ne s'annule pas en α. | φ′(2) = 1 − ω·□ | φ′(2) = 1−5ω = 0 ⇔ ω = 1/5 ; φ″(2) = −2/5 ≠ 0 : ordre 2.
  pièges : n_fp_order_count

```

### Niveau 5

```
Incréments δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| de φ_ω(x) = x − ω(x² − 2x − 8), à partir de x⁽⁰⁾ = 4,5, pour ω₁ = 2/15 et ω* = 1/6. Que peut-on en conclure ?
  [tableau à lire, sans aide]
    k | δₖ (ω₁ = 2/15) | r₁ = δₖ/δₖ₋₁ | δₖ (ω* = 1/6) | r₂ = δₖ/δₖ₋₁²
    0 | 4.333e-01 |  | 5.417e-01 | 
    1 | 5.393e-02 | 0,124 | 4.138e-02 | 0,141
    2 | 1.021e-02 | 0,189 | 2.893e-04 | 0,169
    3 | 2.022e-03 | 0,198 | 1.395e-08 | 0,167
    4 | 4.036e-04 | 0,200 |  | 
    5 | 8.069e-05 | 0,200 |  | 
  question : Coche les affirmations justes. Une ou plusieurs réponses justes.
      ✔ Pour ω* : ordre 2, r₂ tend vers |φ″(α)|/2 = 1/6   · Pour ω₁ : ordre 2 [n_order_simple_ratio]   ✔ Pour ω₁ : ordre 1, le rapport tend vers |1 − ω₁f′(α)| = 1/5   · Pour ω* : ordre 1, car δₖ/δₖ₋₁ tend vers 0 [n_order_simple_ratio]
      pièges : n_order_simple_ratio
  pièges : n_order_simple_ratio

Incréments δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| de φ_ω(x) = x − ω(x² − 3x + 2), à partir de x⁽⁰⁾ = 2,5, pour ω₁ = 4/5 et ω* = 1. Que peut-on en conclure ?
  [tableau à lire, sans aide]
    k | δₖ (ω₁ = 4/5) | r₁ = δₖ/δₖ₋₁ | δₖ (ω* = 1) | r₂ = δₖ/δₖ₋₁²
    0 | 6.000e-01 |  | 7.500e-01 | 
    1 | 7.200e-02 | 0,120 | 1.875e-01 | 0,333
    2 | 2.177e-02 | 0,302 | 5.859e-02 | 1,667
    3 | 4.951e-03 | 0,227 | 3.891e-03 | 1,133
    4 | 1.020e-03 | 0,206 | 1.526e-05 | 1,008
    5 | 2.052e-04 | 0,201 | 2.328e-10 | 1,000
  question : Coche les affirmations justes. Une ou plusieurs réponses justes.
      · Pour ω₁ : ordre 2 [n_order_simple_ratio]   ✔ Pour ω₁ : ordre 1, le rapport tend vers |1 − ω₁f′(α)| = 1/5   ✔ Pour ω* : ordre 2, r₂ tend vers |φ″(α)|/2 = 1   · Pour ω* : ordre 1, car δₖ/δₖ₋₁ tend vers 0 [n_order_simple_ratio]
      pièges : n_order_simple_ratio
  pièges : n_order_simple_ratio

Incréments δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| de φ_ω(x) = x − ω(x² − 25), à partir de x⁽⁰⁾ = 5,5, pour ω₁ = 2/25 et ω* = 1/10. Que peut-on en conclure ?
  [tableau à lire, sans aide]
    k | δₖ (ω₁ = 2/25) | r₁ = δₖ/δₖ₋₁ | δₖ (ω* = 1/10) | r₂ = δₖ/δₖ₋₁²
    0 | 4.200e-01 |  | 5.250e-01 | 
    1 | 6.451e-02 | 0,154 | 2.494e-02 | 0,090
    2 | 1.241e-02 | 0,192 | 6.250e-05 | 0,101
    3 | 2.463e-03 | 0,199 | 3.906e-10 | 0,100
    4 | 4.920e-04 | 0,200 |  | 
    5 | 9.836e-05 | 0,200 |  | 
  question : Coche les affirmations justes. Une ou plusieurs réponses justes.
      ✔ Pour ω₁ : ordre 1, le rapport tend vers |1 − ω₁f′(α)| = 1/5   · Pour ω₁ : ordre 2 [n_order_simple_ratio]   · Pour ω* : ordre 1, car δₖ/δₖ₋₁ tend vers 0 [n_order_simple_ratio]   ✔ Pour ω* : ordre 2, r₂ tend vers |φ″(α)|/2 = 1/10
      pièges : n_order_simple_ratio
  pièges : n_order_simple_ratio

```

### Variantes d'examen

```
On considère x⁽ᵏ⁺¹⁾ = (x⁽ᵏ⁾ − 3)³ + 3, dont les points fixes sont 2, 3 et 4. Que peut-on dire ?
  ✔ La méthode converge vers 3 à l'ordre 3 (pour x⁽⁰⁾ assez proche), jamais vers 2 ni 4   · Elle converge vers chacun des trois points fixes, à l'ordre 1   · Elle converge vers 3 à l'ordre 2 [n_fp_order_count]   · Elle converge vers 3 à l'ordre 1 [n_fp_order_count]
  [examen mcq]
  pièges : n_fp_order_count

Vrai ou faux ?
  « Si φ′(α) = 0 au point fixe α, la méthode de point fixe est d'ordre 2. » → FAUX
    contre-exemple (num) : phi = (x-1)^3+1, alpha = 1
  [examen tf]
  pièges : n_fp_order_count

φ_ω(x) = x − ω(x² − 9), de point fixe α = 3. Pour quelle valeur de ω la méthode est-elle d'ordre au moins 2 ?
  [free, sans aide, examen coef]  ω
    = 1/6   ← φ′(3) = 1−6ω = 0

```

## Méthode de Newton pour une équation (`n-newton`, BA4)

_Remplacer f par sa tangente : x − f(x)/f′(x), d'ordre 2 sur une racine simple._

### Niveau 1

```
Méthode de Newton pour f(x) = x² − 5, à partir de x⁽⁰⁾ = 3. Simplifie la fonction d'itération φ(x) = x − f(x)/f′(x), puis calcule x⁽¹⁾.
  [guided]  x − (x² − 5)/(2x)
    (f′(x) = 2x, donc φ(x) = x − (x² − 5)/(2x).)
    = (x² + □)/(2x)   (trous : (x² + 5)/(2x))   ← Même dénominateur 2x : 2x² − (x² − 5) = x² + 5
  — x⁽¹⁾ = φ(3).  [juge value]  départ : (3² + 5)/(2·3)
    = □   (trous : 7/3)   ← Fraction irréductible
  aides : Remplace f par sa tangente en x⁽ᵏ⁾ et cherche où elle coupe l'axe : x − f(x)/f′(x). | φ(x) = x − (x² − 5)/(□) | φ(x) = (x² + 5)/(2x), x⁽¹⁾ = 7/3.

Méthode de Newton pour f(x) = x² − 5, à partir de x⁽⁰⁾ = 3. Simplifie la fonction d'itération φ(x) = x − f(x)/f′(x), puis calcule x⁽¹⁾.
  [guided]  x − (x² − 5)/(2x)
    (f′(x) = 2x, donc φ(x) = x − (x² − 5)/(2x).)
    = (x² + □)/(2x)   (trous : (x² + 5)/(2x))   ← Même dénominateur 2x : 2x² − (x² − 5) = x² + 5
  — x⁽¹⁾ = φ(3).  [juge value]  départ : (3² + 5)/(2·3)
    = □   (trous : 7/3)   ← Fraction irréductible
  aides : Remplace f par sa tangente en x⁽ᵏ⁾ et cherche où elle coupe l'axe : x − f(x)/f′(x). | φ(x) = x − (x² − 5)/(□) | φ(x) = (x² + 5)/(2x), x⁽¹⁾ = 7/3.

Méthode de Newton pour f(x) = x² − 7, à partir de x⁽⁰⁾ = 3. Simplifie la fonction d'itération φ(x) = x − f(x)/f′(x), puis calcule x⁽¹⁾.
  [guided]  x − (x² − 7)/(2x)
    (f′(x) = 2x, donc φ(x) = x − (x² − 7)/(2x).)
    = (x² + □)/(2x)   (trous : (x² + 7)/(2x))   ← Même dénominateur 2x : 2x² − (x² − 7) = x² + 7
  — x⁽¹⁾ = φ(3).  [juge value]  départ : (3² + 7)/(2·3)
    = □   (trous : 8/3)   ← Fraction irréductible
  aides : Remplace f par sa tangente en x⁽ᵏ⁾ et cherche où elle coupe l'axe : x − f(x)/f′(x). | φ(x) = x − (x² − 7)/(□) | φ(x) = (x² + 7)/(2x), x⁽¹⁾ = 8/3.

```

### Niveau 2

```
Méthode de Newton pour f(x) = x² − 6 : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − (x⁽ᵏ⁾² − 6)/(2x⁽ᵏ⁾), à partir de x⁽⁰⁾ = 2. Remplis les itérés (fractions exactes) ; l'app calcule les incréments.
  [tableau scalar]  colonnes : x⁽ᵏ⁾ | δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾|
    k = 0    2  ·
    k = 1    (5/2)  (1/2)
    k = 2    (49/20)  (1/20)

Méthode de Newton pour f(x) = x² − 6 : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − (x⁽ᵏ⁾² − 6)/(2x⁽ᵏ⁾), à partir de x⁽⁰⁾ = 3. Remplis les itérés (fractions exactes) ; l'app calcule les incréments.
  [tableau scalar]  colonnes : x⁽ᵏ⁾ | δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾|
    k = 0    3  ·
    k = 1    (5/2)  (1/2)
    k = 2    (49/20)  (1/20)

Méthode de Newton pour f(x) = x² − 7 : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − (x⁽ᵏ⁾² − 7)/(2x⁽ᵏ⁾), à partir de x⁽⁰⁾ = 2. Remplis les itérés (fractions exactes) ; l'app calcule les incréments.
  [tableau scalar]  colonnes : x⁽ᵏ⁾ | δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾|
    k = 0    2  ·
    k = 1    (11/4)  (3/4)
    k = 2    (233/88)  (9/88)

```

### Niveau 3

```
Méthode de Newton pour f(x) = x² − 7, à partir de x⁽⁰⁾ = 2. Choisis la formule, puis calcule x⁽¹⁾.
  [tap, suivre l'erreur]  2
    ? Quelle est l'itération de Newton ? ✔ x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)/f′(x⁽ᵏ⁾) / · x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f′(x⁽ᵏ⁾)/f(x⁽ᵏ⁾) / · x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + f(x⁽ᵏ⁾)/f′(x⁽ᵏ⁾)
    = 2 − (−3)/4   ← f(2) = −3, f′(2) = 4
    = 11/4   ← x⁽¹⁾
  aides : La tangente en x⁽ᵏ⁾ coupe l'axe en x⁽ᵏ⁾ − f(x⁽ᵏ⁾)/f′(x⁽ᵏ⁾). | x⁽¹⁾ = 2 − (−3)/□ | x⁽¹⁾ = 2 − (−3)/4 = 11/4.
  pièges : n_newton_inverted, n_newton_sign

Méthode de Newton pour f(x) = x² − 7, à partir de x⁽⁰⁾ = 2. Choisis la formule, puis calcule x⁽¹⁾.
  [tap, suivre l'erreur]  2
    ? Quelle est l'itération de Newton ? ✔ x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)/f′(x⁽ᵏ⁾) / · x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f′(x⁽ᵏ⁾)/f(x⁽ᵏ⁾) / · x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + f(x⁽ᵏ⁾)/f′(x⁽ᵏ⁾)
    = 2 − (−3)/4   ← f(2) = −3, f′(2) = 4
    = 11/4   ← x⁽¹⁾
  aides : La tangente en x⁽ᵏ⁾ coupe l'axe en x⁽ᵏ⁾ − f(x⁽ᵏ⁾)/f′(x⁽ᵏ⁾). | x⁽¹⁾ = 2 − (−3)/□ | x⁽¹⁾ = 2 − (−3)/4 = 11/4.
  pièges : n_newton_inverted, n_newton_sign

Méthode de Newton pour f(x) = x² − 3, à partir de x⁽⁰⁾ = 2. Choisis la formule, puis calcule x⁽¹⁾.
  [tap, suivre l'erreur]  2
    ? Quelle est l'itération de Newton ? ✔ x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)/f′(x⁽ᵏ⁾) / · x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f′(x⁽ᵏ⁾)/f(x⁽ᵏ⁾) / · x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + f(x⁽ᵏ⁾)/f′(x⁽ᵏ⁾)
    = 2 − 1/4   ← f(2) = 1, f′(2) = 4
    = 7/4   ← x⁽¹⁾
  aides : La tangente en x⁽ᵏ⁾ coupe l'axe en x⁽ᵏ⁾ − f(x⁽ᵏ⁾)/f′(x⁽ᵏ⁾). | x⁽¹⁾ = 2 − 1/□ | x⁽¹⁾ = 2 − 1/4 = 7/4.
  pièges : n_newton_inverted, n_newton_sign

```

### Niveau 4

```
Méthode de Newton pour f(x) = x² − 7 : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − (x⁽ᵏ⁾² − 7)/(2x⁽ᵏ⁾), à partir de x⁽⁰⁾ = 3. Remplis les itérés (fractions exactes), les incréments et les rapports r₂ (2 chiffres significatifs suffisent).
  [tableau scalar]  colonnes : x⁽ᵏ⁾ | δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾| | r₂ = δₖ/δₖ₋₁²
    k = 0    3  ·  ·
    k = 1    (8/3)  (1/3)  ·
    k = 2    (127/48)  (1/48)  (3/16)
    k = 3    (32257/12192)  (1/12192)  (24/127)
  puis : Les rapports r₂ se stabilisent vers une constante non nulle. Quel est l'ordre de la méthode ?
      · Ordre 1 : δₖ/δₖ₋₁ tend vers 0 [n_order_simple_ratio]   ✔ Ordre 2 (convergence quadratique)   · Ordre 3   · On ne peut pas savoir sans α
      pièges : n_order_simple_ratio
  pièges : n_order_simple_ratio

Méthode de Newton pour f(x) = x² − 3 : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − (x⁽ᵏ⁾² − 3)/(2x⁽ᵏ⁾), à partir de x⁽⁰⁾ = 2. Remplis les itérés (fractions exactes), les incréments et les rapports r₂ (2 chiffres significatifs suffisent).
  [tableau scalar]  colonnes : x⁽ᵏ⁾ | δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾| | r₂ = δₖ/δₖ₋₁²
    k = 0    2  ·  ·
    k = 1    (7/4)  (1/4)  ·
    k = 2    (97/56)  (1/56)  (2/7)
    k = 3    (18817/10864)  (1/10864)  (28/97)
  puis : Les rapports r₂ se stabilisent vers une constante non nulle. Quel est l'ordre de la méthode ?
      · Ordre 3   · On ne peut pas savoir sans α   ✔ Ordre 2 (convergence quadratique)   · Ordre 1 : δₖ/δₖ₋₁ tend vers 0 [n_order_simple_ratio]
      pièges : n_order_simple_ratio
  pièges : n_order_simple_ratio

Méthode de Newton pour f(x) = x² − 6 : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − (x⁽ᵏ⁾² − 6)/(2x⁽ᵏ⁾), à partir de x⁽⁰⁾ = 3. Remplis les itérés (fractions exactes), les incréments et les rapports r₂ (2 chiffres significatifs suffisent).
  [tableau scalar]  colonnes : x⁽ᵏ⁾ | δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾| | r₂ = δₖ/δₖ₋₁²
    k = 0    3  ·  ·
    k = 1    (5/2)  (1/2)  ·
    k = 2    (49/20)  (1/20)  (1/5)
    k = 3    (4801/1960)  (1/1960)  (10/49)
  puis : Les rapports r₂ se stabilisent vers une constante non nulle. Quel est l'ordre de la méthode ?
      · On ne peut pas savoir sans α   · Ordre 1 : δₖ/δₖ₋₁ tend vers 0 [n_order_simple_ratio]   ✔ Ordre 2 (convergence quadratique)   · Ordre 3
      pièges : n_order_simple_ratio
  pièges : n_order_simple_ratio

```

### Niveau 5

```
Complète la méthode de Newton : elle s'arrête quand l'incrément est plus petit que tol, et renvoie [x, nombre d'itérations].
  [code python, 3 trous, sans aide]
    | def newton(f, df, x0, tol, nmax):
    |     x = x0
    |     for k in range(nmax):
    |         incr = ⟦f(x) / df(x)⟧
    |         x = ⟦x - incr⟧
    |         if ⟦abs(incr) < tol⟧:
    |             return [x, k + 1]
    |     return [x, nmax]
    test : def f(x): return x*x - 2 ; def df(x): return 2*x ; newton(f, df, 1.1, 1e-10, 100) → [1.4142135623730951, 5]
    test : def f(x): return x**3 - 2 ; def df(x): return 3*x*x ; newton(f, df, 2.0, 1e-12, 100) → [1.2599210498948732, 6]
  puis : Le programme, appelé pour f(x) = x² − 7 et x⁽⁰⁾ = 6, affiche les incréments :
      [tableau à lire, sans aide]
        k | 1 | 2 | 3 | 4 | 5 | 6 | 7
        δₖ | 2.416667e+00 | 8.149225e-01 | 1.199422e-01 | 2.715934e-03 | 1.393989e-06 | 3.674235e-13 | 1.678499e-16
      question : Le programme newton affiche les incréments |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| pour f(x) = x² − 7 et x⁽⁰⁾ = 6. Que peut-on en déduire ? Une ou plusieurs réponses justes.
          · La méthode est d'ordre 1, puisque δₖ₊₁/δₖ tend vers 0 [n_order_simple_ratio]   · Newton converge quadratiquement quel que soit le point de départ   ✔ Newton converge quadratiquement pour ce point de départ   ✔ Le nombre de chiffres exacts double environ à chaque pas, à la fin
          pièges : n_order_simple_ratio
      pièges : n_order_simple_ratio
  pièges : n_newton_inverted, n_newton_sign

Complète la méthode de Newton : elle s'arrête quand l'incrément est plus petit que tol, et renvoie [x, nombre d'itérations].
  [code python, 3 trous, sans aide]
    | def newton(f, df, x0, tol, nmax):
    |     x = x0
    |     for k in range(nmax):
    |         incr = ⟦f(x) / df(x)⟧
    |         x = ⟦x - incr⟧
    |         if ⟦abs(incr) < tol⟧:
    |             return [x, k + 1]
    |     return [x, nmax]
    test : def f(x): return x*x - 2 ; def df(x): return 2*x ; newton(f, df, 1.1, 1e-10, 100) → [1.4142135623730951, 5]
    test : def f(x): return x**3 - 2 ; def df(x): return 3*x*x ; newton(f, df, 2.0, 1e-12, 100) → [1.2599210498948732, 6]
  puis : Le programme, appelé pour f(x) = x² − 7 et x⁽⁰⁾ = 6, affiche les incréments :
      [tableau à lire, sans aide]
        k | 1 | 2 | 3 | 4 | 5 | 6 | 7
        δₖ | 2.416667e+00 | 8.149225e-01 | 1.199422e-01 | 2.715934e-03 | 1.393989e-06 | 3.674235e-13 | 1.678499e-16
      question : Le programme newton affiche les incréments |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| pour f(x) = x² − 7 et x⁽⁰⁾ = 6. Que peut-on en déduire ? Une ou plusieurs réponses justes.
          ✔ Newton converge quadratiquement pour ce point de départ   · Newton converge quadratiquement quel que soit le point de départ   · La méthode est d'ordre 1, puisque δₖ₊₁/δₖ tend vers 0 [n_order_simple_ratio]   ✔ Le nombre de chiffres exacts double environ à chaque pas, à la fin
          pièges : n_order_simple_ratio
      pièges : n_order_simple_ratio
  pièges : n_newton_inverted, n_newton_sign

Complète la méthode de Newton : elle s'arrête quand l'incrément est plus petit que tol, et renvoie [x, nombre d'itérations].
  [code python, 3 trous, sans aide]
    | def newton(f, df, x0, tol, nmax):
    |     x = x0
    |     for k in range(nmax):
    |         incr = ⟦f(x) / df(x)⟧
    |         x = ⟦x - incr⟧
    |         if ⟦abs(incr) < tol⟧:
    |             return [x, k + 1]
    |     return [x, nmax]
    test : def f(x): return x*x - 2 ; def df(x): return 2*x ; newton(f, df, 1.1, 1e-10, 100) → [1.4142135623730951, 5]
    test : def f(x): return x**3 - 2 ; def df(x): return 3*x*x ; newton(f, df, 2.0, 1e-12, 100) → [1.2599210498948732, 6]
  puis : Le programme, appelé pour f(x) = x² − 5 et x⁽⁰⁾ = 6, affiche les incréments :
      [tableau à lire, sans aide]
        k | 1 | 2 | 3 | 4 | 5 | 6 | 7
        δₖ | 2.583333e+00 | 9.766260e-01 | 1.954472e-01 | 8.509252e-03 | 1.619066e-05 | 5.861581e-11 | 1.986027e-16
      question : Le programme newton affiche les incréments |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| pour f(x) = x² − 5 et x⁽⁰⁾ = 6. Que peut-on en déduire ? Une ou plusieurs réponses justes.
          ✔ Le nombre de chiffres exacts double environ à chaque pas, à la fin   · Newton converge quadratiquement quel que soit le point de départ   · La méthode est d'ordre 1, puisque δₖ₊₁/δₖ tend vers 0 [n_order_simple_ratio]   ✔ Newton converge quadratiquement pour ce point de départ
          pièges : n_order_simple_ratio
      pièges : n_order_simple_ratio
  pièges : n_newton_inverted, n_newton_sign

```

### Variantes d'examen

```
La fonction Python ci-dessous applique la méthode de Newton.def newton(f, df, x0, tol, nmax):
    x = x0
    for k in range(nmax):
        incr = ???
        x = x - incr
        if abs(incr) < tol:
            return [x, k + 1]
    return [x, nmax]
Que faut-il écrire à la place de ??? ?
  ✔ f(x) / df(x)   · f(x) * df(x)   · -f(x) / df(x) [n_newton_sign]   · df(x) / f(x) [n_newton_inverted]
  [examen mcq]
  pièges : n_newton_inverted, n_newton_sign

Vrai ou faux ?
  « Si f′ ne s'annule pas près de la racine α, la méthode de Newton converge vers α quel que soit x⁽⁰⁾. » → FAUX
    contre-exemple (num) : f = x^3-2x+2, x0 = 0
  [examen tf]

```

## Lire l'ordre sur les rapports d'incréments (`n-order-read`, BA4)

_Trouver le p pour lequel δₖ/δₖ₋₁ᵖ tend vers une constante non nulle._

### Niveau 1

```
On applique la méthode de Newton sur f(x) = x² − 2, avec x⁽⁰⁾ = 3. Le programme affiche les incréments δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| et leurs rapports :
  [tableau à lire]
    k | δₖ | r₁ = δₖ/δₖ₋₁ | r₂ = δₖ/δₖ₋₁² | r₃ = δₖ/δₖ₋₁³
    0 | 1.167e+00 |  |  | 
    1 | 3.712e-01 | 0,318 | 0,273 | 0,234
    2 | 4.712e-02 | 0,127 | 0,342 | 0,921
    3 | 7.846e-04 | 0,0167 | 0,353 | 7,5
    4 | 2.177e-07 | 0,000277 | 0,354 | 451
    5 | 1.688e-14 | 7,75e−8 | 0,356 | 1640000
  question : Quel est l'ordre de la méthode ?
      · Ordre 1 : r₁ tend vers une constante (0) [n_order_simple_ratio]   ✔ Ordre 2 : r₂ se stabilise   · Ordre 3 : r₃ se stabilise   · Entre 1 et 2 : r₁ → 0 et r₂ → ∞
      pièges : n_order_simple_ratio
  pièges : n_order_simple_ratio

On applique la méthode de Newton sur f(x) = x³ − 10, avec x⁽⁰⁾ = 3. Le programme affiche les incréments δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| et leurs rapports :
  [tableau à lire]
    k | δₖ | r₁ = δₖ/δₖ₋₁ | r₂ = δₖ/δₖ₋₁² | r₃ = δₖ/δₖ₋₁³
    0 | 6.296e-01 |  |  | 
    1 | 1.969e-01 | 0,313 | 0,497 | 0,789
    2 | 1.891e-02 | 0,096 | 0,488 | 2,48
    3 | 1.669e-04 | 0,00883 | 0,467 | 24,7
    4 | 1.293e-08 | 0,0000775 | 0,464 | 2780
  question : Quel est l'ordre de la méthode ?
      · Ordre 1 : r₁ tend vers une constante (0) [n_order_simple_ratio]   ✔ Ordre 2 : r₂ se stabilise   · Ordre 3 : r₃ se stabilise   · Entre 1 et 2 : r₁ → 0 et r₂ → ∞
      pièges : n_order_simple_ratio
  pièges : n_order_simple_ratio

On applique la méthode de la sécante sur f(x) = x² − 3, avec x⁽⁰⁾ = 1 et x⁽¹⁾ = 2. Le programme affiche les incréments δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| et leurs rapports :
  [tableau à lire]
    k | δₖ | r₁ = δₖ/δₖ₋₁ | r₂ = δₖ/δₖ₋₁² | r₃ = δₖ/δₖ₋₁³
    0 | 1.000e+00 |  |  | 
    1 | 3.333e-01 | 0,333 | 0,333 | 0,333
    2 | 6.061e-02 | 0,182 | 0,546 | 1,64
    3 | 4.870e-03 | 0,0803 | 1,33 | 21,9
    4 | 9.218e-05 | 0,0189 | 3,89 | 798
    5 | 1.271e-07 | 0,00138 | 15 | 162000
    6 | 3.378e-12 | 0,0000266 | 209 | 1650000000
  question : Quel est l'ordre de la méthode ?
      · Ordre 1 : r₁ tend vers une constante (0) [n_order_simple_ratio]   · Ordre 2 : r₂ se stabilise   · Ordre 3 : r₃ se stabilise   ✔ Entre 1 et 2 : r₁ → 0 et r₂ → ∞
      pièges : n_order_simple_ratio
  pièges : n_order_simple_ratio

```

### Niveau 2

```
On applique la méthode de Newton sur f(x) = x² − 6, avec x⁽⁰⁾ = 3. Le programme affiche les incréments :kδₖ05.000e-0115.000e-0225.102e-0435.314e-08Calcule r₂ = δₖ/δₖ₋₁² sur deux lignes (2 chiffres significatifs), puis donne l'ordre p.
  [guided]  r_2
    = 5,102·10^(−4)/(5,000·10^(−2))²   ← δₖ/δₖ₋₁²
    = □   (trous : 0,2)   ← 2 chiffres significatifs suffisent
  — Le rapport suivant, k = 3 :  [juge stat]  départ : r_3
    = 5,314·10^(−8)/(5,102·10^(−4))²   ← δₖ/δₖ₋₁²
    = □   (trous : 0,2)   ← 2 chiffres significatifs suffisent
  — Conclusion :  [juge value]  départ : p
    ? Que montrent les rapports ? ✔ r₂ se stabilise vers une constante non nulle : ordre 2 / · δₖ/δₖ₋₁ tend vers 0, donc la méthode est d'ordre 1 / · Ordre 3 : il faut que r₃ soit petit
    = □   (trous : 2)   ← r₂ → constante non nulle
  aides : Cherche le p pour lequel δₖ/δₖ₋₁ᵖ ne tend ni vers 0 ni vers l'infini. | r = δ₂/(□)² | r ≈ 0,2 puis 0,2 : ordre 2.
  pièges : n_order_simple_ratio

On applique la méthode de Newton sur f(x) = x³ − 3, avec x⁽⁰⁾ = 2. Le programme affiche les incréments :kδₖ04.167e-0111.289e-0121.210e-0231.020e-0447.215e-09Calcule r₂ = δₖ/δₖ₋₁² sur deux lignes (2 chiffres significatifs), puis donne l'ordre p.
  [guided]  r_3
    = 1,020·10^(−4)/(1,210·10^(−2))²   ← δₖ/δₖ₋₁²
    = □   (trous : 0,7)   ← 2 chiffres significatifs suffisent
  — Le rapport suivant, k = 4 :  [juge stat]  départ : r_4
    = 7,215·10^(−9)/(1,020·10^(−4))²   ← δₖ/δₖ₋₁²
    = □   (trous : 0,69)   ← 2 chiffres significatifs suffisent
  — Conclusion :  [juge value]  départ : p
    ? Que montrent les rapports ? ✔ r₂ se stabilise vers une constante non nulle : ordre 2 / · δₖ/δₖ₋₁ tend vers 0, donc la méthode est d'ordre 1 / · Ordre 3 : il faut que r₃ soit petit
    = □   (trous : 2)   ← r₂ → constante non nulle
  aides : Cherche le p pour lequel δₖ/δₖ₋₁ᵖ ne tend ni vers 0 ni vers l'infini. | r = δ₃/(□)² | r ≈ 0,7 puis 0,69 : ordre 2.
  pièges : n_order_simple_ratio

On applique l'itération de point fixe x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − 0,2(x⁽ᵏ⁾² − 4), avec x⁽⁰⁾ = 2,5. Le programme affiche les incréments :kδₖ04.500e-0114.050e-0227.618e-0331.506e-0343.006e-0456.009e-0561.202e-0572.403e-0684.806e-07Calcule r₁ = δₖ/δₖ₋₁ sur deux lignes (2 chiffres significatifs), puis donne l'ordre p.
  [guided]  r_7
    = 2,403·10^(−6)/(1,202·10^(−5))   ← δₖ/δₖ₋₁
    = □   (trous : 0,2)   ← 2 chiffres significatifs suffisent
  — Le rapport suivant, k = 8 :  [juge stat]  départ : r_8
    = 4,806·10^(−7)/(2,403·10^(−6))   ← δₖ/δₖ₋₁
    = □   (trous : 0,2)   ← 2 chiffres significatifs suffisent
  — Conclusion :  [juge value]  départ : p
    ? Que montrent les rapports ? ✔ r₁ se stabilise vers une constante non nulle (< 1) : ordre 1 / · Ordre 2 : les incréments diminuent vite
    = □   (trous : 1)   ← r₁ → constante non nulle, < 1
  aides : Cherche le p pour lequel δₖ/δₖ₋₁ᵖ ne tend ni vers 0 ni vers l'infini. | r = δ₇/(□) | r ≈ 0,2 puis 0,2 : ordre 1.

```

### Niveau 3

```
On applique la méthode de Newton sur f(x) = x² − 2, avec x⁽⁰⁾ = 3. Le programme affiche :kδₖr₂ = δₖ/δₖ₋₁²01.167e+0013.712e-010,27324.712e-020,34237.846e-040,35342.177e-070,35451.688e-140,35662.220e-16779000000000Décide quelles lignes lire, puis donne l'ordre p et la constante C. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  p
    ? La dernière ligne : δ₆ = 2.220e-16, r₂ = 780000000000. Que faire ? ✔ L'ignorer : à δ ≈ 10⁻¹⁵, l'arrondi domine / · La garder : c'est la ligne la plus précise
    ? Que montrent les rapports ? ✔ r₂ se stabilise vers une constante non nulle : ordre 2 / · δₖ/δₖ₋₁ tend vers 0, donc la méthode est d'ordre 1 / · Ordre 3 : il faut que r₃ soit petit
    = 2   ← r₂ → constante non nulle
  — La constante : la limite du rapport.  [juge stat]  départ : C
    = 0,35   ← les dernières lignes utilisables (r₂ ≈ 0,354)
  aides : Ne lis l'ordre que sur les lignes où δ est bien au-dessus de 10⁻¹⁵. | r₂ se stabilise vers □ sur les lignes utilisables. | Ordre 2, C ≈ 0,35 (la dernière ligne est dominée par l'arrondi).
  pièges : n_order_roundoff_rows, n_order_simple_ratio

On applique la méthode de Newton sur f(x) = x² − 3, avec x⁽⁰⁾ = 3. Le programme affiche :kδₖr₂ = δₖ/δₖ₋₁²01.000e+0012.500e-010,2521.786e-020,28639.205e-050,28942.446e-090,28952.220e-1637,1Décide quelles lignes lire, puis donne l'ordre p et la constante C. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  p
    ? La dernière ligne : δ₅ = 2.220e-16, r₂ = 37. Que faire ? ✔ L'ignorer : à δ ≈ 10⁻¹⁵, l'arrondi domine / · La garder : c'est la ligne la plus précise
    ? Que montrent les rapports ? ✔ r₂ se stabilise vers une constante non nulle : ordre 2 / · δₖ/δₖ₋₁ tend vers 0, donc la méthode est d'ordre 1 / · Ordre 3 : il faut que r₃ soit petit
    = 2   ← r₂ → constante non nulle
  — La constante : la limite du rapport.  [juge stat]  départ : C
    = 0,29   ← les dernières lignes utilisables (r₂ ≈ 0,289)
  aides : Ne lis l'ordre que sur les lignes où δ est bien au-dessus de 10⁻¹⁵. | r₂ se stabilise vers □ sur les lignes utilisables. | Ordre 2, C ≈ 0,29 (la dernière ligne est dominée par l'arrondi).
  pièges : n_order_roundoff_rows, n_order_simple_ratio

On applique la méthode de Newton sur f(x) = x² − 6, avec x⁽⁰⁾ = 3. Le programme affiche :kδₖr₂ = δₖ/δₖ₋₁²05.000e-0115.000e-020,225.102e-040,20435.314e-080,20448.882e-160,315Décide quelles lignes lire, puis donne l'ordre p et la constante C. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  p
    ? La dernière ligne : δ₄ = 8.882e-16, r₂ = 0,31. Que faire ? ✔ L'ignorer : à δ ≈ 10⁻¹⁵, l'arrondi domine / · La garder : c'est la ligne la plus précise
    ? Que montrent les rapports ? ✔ r₂ se stabilise vers une constante non nulle : ordre 2 / · δₖ/δₖ₋₁ tend vers 0, donc la méthode est d'ordre 1 / · Ordre 3 : il faut que r₃ soit petit
    = 2   ← r₂ → constante non nulle
  — La constante : la limite du rapport.  [juge stat]  départ : C
    = 0,2   ← les dernières lignes utilisables (r₂ ≈ 0,204)
  aides : Ne lis l'ordre que sur les lignes où δ est bien au-dessus de 10⁻¹⁵. | r₂ se stabilise vers □ sur les lignes utilisables. | Ordre 2, C ≈ 0,2 (la dernière ligne est dominée par l'arrondi).
  pièges : n_order_roundoff_rows, n_order_simple_ratio

```

### Niveau 4

```
On applique la méthode de Newton sur f(x) = (x − 1)²·(x + 2), avec x⁽⁰⁾ = 3. Le programme affiche les incréments :kδₖ08.333e-0115.117e-0123.006e-0131.683e-0149.041e-0254.712e-0262.409e-0271.219e-0286.132e-03Donne l'ordre p de la méthode et la constante C = lim δₖ/δₖ₋₁ᵖ (2 chiffres significatifs).
  [free, suivre l'erreur]  p
    = 1   ← r₁ → constante non nulle, < 1
  — La constante : la limite du rapport.  [juge stat]  départ : C
    = 0,5   ← les dernières lignes utilisables (r₁ ≈ 0,503)
  aides : Calcule r₁ puis r₂ sur les dernières lignes : lequel se stabilise vers une constante non nulle ? | r₁ sur les dernières lignes ≈ □ | Ordre 1, C ≈ 0,5.
  pièges : n_order_simple_ratio

On applique la méthode de Newton sur f(x) = x² − 2, avec x⁽⁰⁾ = 5. Le programme affiche les incréments :kδₖ02.300e+0019.796e-0122.789e-0132.698e-0242.574e-0452.342e-08Donne l'ordre p de la méthode et la constante C = lim δₖ/δₖ₋₁ᵖ (2 chiffres significatifs).
  [free, suivre l'erreur]  p
    = 2   ← r₂ → constante non nulle
  — La constante : la limite du rapport.  [juge stat]  départ : C
    = 0,35   ← les dernières lignes utilisables (r₂ ≈ 0,353)
  aides : Calcule r₁ puis r₂ sur les dernières lignes : lequel se stabilise vers une constante non nulle ? | r₂ sur les dernières lignes ≈ □ | Ordre 2, C ≈ 0,35.
  pièges : n_order_simple_ratio

On applique la méthode de Newton sur f(x) = (x − 1)²·(1 + x²), avec x⁽⁰⁾ = 3. Le programme affiche les incréments :kδₖ06.250e-0114.609e-0123.324e-0132.304e-0141.504e-0159.145e-0265.194e-0272.799e-0281.459e-02Donne l'ordre p de la méthode et la constante C = lim δₖ/δₖ₋₁ᵖ (2 chiffres significatifs).
  [free, suivre l'erreur]  p
    = 1   ← r₁ → constante non nulle, < 1
  — La constante : la limite du rapport.  [juge stat]  départ : C
    = 0,52   ← les dernières lignes utilisables (r₁ ≈ 0,521)
  aides : Calcule r₁ puis r₂ sur les dernières lignes : lequel se stabilise vers une constante non nulle ? | r₁ sur les dernières lignes ≈ □ | Ordre 1, C ≈ 0,52.
  pièges : n_order_simple_ratio

```

### Niveau 5

```
Deux méthodes, A (la méthode de Newton sur f(x) = x² − 2, avec x⁽⁰⁾ = 4) et B (la méthode de la sécante sur f(x) = x² − 2, avec x⁽⁰⁾ = 1 et x⁽¹⁾ = 2), donnent ces incréments :
  [tableau à lire, sans aide]
    k | δₖ (A : Newton, x² − 2) | δₖ (B : sécante, x² − 2)
    0 | 1.750e+00 | 1.000e+00
    1 | 6.806e-01 | 6.667e-01
    2 | 1.476e-01 | 6.667e-02
    3 | 7.656e-03 | 1.463e-02
    4 | 2.072e-05 | 4.227e-04
    5 | 1.518e-10 | 2.124e-06
    6 |  | 3.158e-10
  question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
      · A est d'ordre 1, puisque δₖ₊₁/δₖ tend vers 0 [n_order_simple_ratio]   ✔ B est entre 1 et 2   · Les deux méthodes ont le même ordre   ✔ A est d'ordre 2   · B est d'ordre 2
      pièges : n_order_simple_ratio
  pièges : n_order_simple_ratio

Deux méthodes, A (la méthode de Newton sur f(x) = x³ − 5, avec x⁽⁰⁾ = 2) et B (la méthode de la sécante sur f(x) = x² − 5, avec x⁽⁰⁾ = 2 et x⁽¹⁾ = 3), donnent ces incréments :
  [tableau à lire, sans aide]
    k | δₖ (A : Newton, x³ − 5) | δₖ (B : sécante, x² − 5)
    0 | 2.500e-01 | 1.000e+00
    1 | 3.912e-02 | 8.000e-01
    2 | 9.079e-04 | 3.077e-02
    3 | 4.822e-07 | 5.342e-03
    4 | 1.359e-13 | 4.318e-05
    5 |  | 5.117e-08
    6 |  | 4.934e-13
  question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
      · Les deux méthodes ont le même ordre   ✔ B est entre 1 et 2   · A est d'ordre 1, puisque δₖ₊₁/δₖ tend vers 0 [n_order_simple_ratio]   ✔ A est d'ordre 2   · B est d'ordre 2
      pièges : n_order_simple_ratio
  pièges : n_order_simple_ratio

Deux méthodes, A (la méthode de Newton sur f(x) = x² − 2, avec x⁽⁰⁾ = 3) et B (la méthode de la sécante sur f(x) = x² − 7, avec x⁽⁰⁾ = 2 et x⁽¹⁾ = 3), donnent ces incréments :
  [tableau à lire, sans aide]
    k | δₖ (A : Newton, x² − 2) | δₖ (B : sécante, x² − 7)
    0 | 1.167e+00 | 1.000e+00
    1 | 3.712e-01 | 4.000e-01
    2 | 4.712e-02 | 4.286e-02
    3 | 7.846e-04 | 2.919e-03
    4 | 2.177e-07 | 2.527e-05
    5 | 1.688e-14 | 1.382e-08
  question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
      · A est d'ordre 1, puisque δₖ₊₁/δₖ tend vers 0 [n_order_simple_ratio]   ✔ A est d'ordre 2   · Les deux méthodes ont le même ordre   · B est d'ordre 2   ✔ B est entre 1 et 2
      pièges : n_order_simple_ratio
  pièges : n_order_simple_ratio

```

### Variantes d'examen

```
Un programme affiche les incréments δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| d'une méthode itérative :k012345678δₖ4.500e-014.050e-027.618e-031.506e-033.006e-046.009e-051.202e-052.403e-064.806e-07Que peut-on en déduire ? Une ou plusieurs réponses justes.
  ✔ Le rapport δₖ₊₁/δₖ tend vers environ 0,2   · La méthode diverge   · La méthode converge quadratiquement   ✔ La méthode converge linéairement (ordre 1)
  [examen mcq]

Vrai ou faux ? Si δₖ₊₁/δₖ → 0, la méthode est d'ordre 1.
  · Vrai [n_order_simple_ratio]   ✔ Faux
  [examen tf]
  pièges : n_order_simple_ratio

```

## Newton sur une racine multiple ; Newton modifié (`n-newton-multiple`, BA4)

_Sur une racine de multiplicité m, Newton est d'ordre 1 ; x − m·f/f′ retrouve l'ordre 2._

### Niveau 1

```
Newton pour f(x) = (x + 1)³, de racine α = −1 de multiplicité 3. Simplifie φ(x) = x − f(x)/f′(x), puis donne le rapport des erreurs et l'ordre.
  [guided]  x − (x + 1)³/(3(x + 1)²)
    (f′(x) = 3(x + 1)², donc φ(x) = x − f(x)/f′(x).)
    = (□ − 1)/3   (trous : (2x − 1)/3)   ← On simplifie par (x + 1)²
  — L'erreur : x⁽ᵏ⁺¹⁾ − α = (1 − 1/3)·(x⁽ᵏ⁾ − α), avec α = −1. Le rapport des erreurs vaut :  [juge value]  départ : r
    = 1 − 1/3   ← 1 − 1/m
    = □   (trous : 2/3)   ← constant, non nul
  — L'ordre de Newton ici :  [juge value]  départ : p
    = □   (trous : 1)   ← rapport constant non nul : ordre 1
  aides : Regarde f′(α) : s'il est nul, la racine est multiple et Newton perd son ordre 2. | x⁽ᵏ⁺¹⁾ − α = (1 − 1/□)(x⁽ᵏ⁾ − α) | φ(x) = (2x − 1)/3, rapport 2/3, ordre 1.

Newton pour f(x) = (x − 1)², de racine α = 1 de multiplicité 2. Simplifie φ(x) = x − f(x)/f′(x), puis donne le rapport des erreurs et l'ordre.
  [guided]  x − (x − 1)²/(2(x − 1))
    (f′(x) = 2(x − 1), donc φ(x) = x − f(x)/f′(x).)
    = (□ + 1)/2   (trous : (x + 1)/2)   ← On simplifie par (x − 1)
  — L'erreur : x⁽ᵏ⁺¹⁾ − α = (1 − 1/2)·(x⁽ᵏ⁾ − α), avec α = 1. Le rapport des erreurs vaut :  [juge value]  départ : r
    = 1 − 1/2   ← 1 − 1/m
    = □   (trous : 1/2)   ← constant, non nul
  — L'ordre de Newton ici :  [juge value]  départ : p
    = □   (trous : 1)   ← rapport constant non nul : ordre 1
  aides : Regarde f′(α) : s'il est nul, la racine est multiple et Newton perd son ordre 2. | x⁽ᵏ⁺¹⁾ − α = (1 − 1/□)(x⁽ᵏ⁾ − α) | φ(x) = (x + 1)/2, rapport 1/2, ordre 1.

Newton pour f(x) = (x + 2)³, de racine α = −2 de multiplicité 3. Simplifie φ(x) = x − f(x)/f′(x), puis donne le rapport des erreurs et l'ordre.
  [guided]  x − (x + 2)³/(3(x + 2)²)
    (f′(x) = 3(x + 2)², donc φ(x) = x − f(x)/f′(x).)
    = (□ − 2)/3   (trous : (2x − 2)/3)   ← On simplifie par (x + 2)²
  — L'erreur : x⁽ᵏ⁺¹⁾ − α = (1 − 1/3)·(x⁽ᵏ⁾ − α), avec α = −2. Le rapport des erreurs vaut :  [juge value]  départ : r
    = 1 − 1/3   ← 1 − 1/m
    = □   (trous : 2/3)   ← constant, non nul
  — L'ordre de Newton ici :  [juge value]  départ : p
    = □   (trous : 1)   ← rapport constant non nul : ordre 1
  aides : Regarde f′(α) : s'il est nul, la racine est multiple et Newton perd son ordre 2. | x⁽ᵏ⁺¹⁾ − α = (1 − 1/□)(x⁽ᵏ⁾ − α) | φ(x) = (2x − 2)/3, rapport 2/3, ordre 1.

```

### Niveau 2

```
Newton pour f(x) = (x + 1)², à partir de x⁽⁰⁾ = −2 : φ(x) = (x − 1)/2. Remplis les itérés (fractions exactes) et les rapports r₁ ; l'app calcule les incréments.
  [tableau scalar]  colonnes : x⁽ᵏ⁾ | δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾| | r₁ = δₖ/δₖ₋₁
    k = 0    −2  ·  ·
    k = 1    (−3/2)  (1/2)  ·
    k = 2    (−5/4)  (1/4)  (1/2)
    k = 3    (−9/8)  (1/8)  (1/2)
  puis : Le rapport r₁ vaut 1/2 à chaque pas. Quel est l'ordre de Newton ici ?
      · Ordre 0 : la méthode ne converge pas   ✔ Ordre 1 : r₁ = 1 − 1/m = 1/2, la racine est multiple   · Ordre 2 : Newton est toujours d'ordre 2 [n_newton_always2]   · On ne peut pas savoir sans α
      pièges : n_newton_always2
  pièges : n_newton_always2

Newton pour f(x) = (x + 2)², à partir de x⁽⁰⁾ = 2 : φ(x) = (x − 2)/2. Remplis les itérés (fractions exactes) et les rapports r₁ ; l'app calcule les incréments.
  [tableau scalar]  colonnes : x⁽ᵏ⁾ | δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾| | r₁ = δₖ/δₖ₋₁
    k = 0    2  ·  ·
    k = 1    (0)  (2)  ·
    k = 2    (−1)  (1)  (1/2)
    k = 3    (−3/2)  (1/2)  (1/2)
  puis : Le rapport r₁ vaut 1/2 à chaque pas. Quel est l'ordre de Newton ici ?
      · Ordre 0 : la méthode ne converge pas   ✔ Ordre 1 : r₁ = 1 − 1/m = 1/2, la racine est multiple   · On ne peut pas savoir sans α   · Ordre 2 : Newton est toujours d'ordre 2 [n_newton_always2]
      pièges : n_newton_always2
  pièges : n_newton_always2

Newton pour f(x) = (x − 1)², à partir de x⁽⁰⁾ = 2 : φ(x) = (x + 1)/2. Remplis les itérés (fractions exactes) et les rapports r₁ ; l'app calcule les incréments.
  [tableau scalar]  colonnes : x⁽ᵏ⁾ | δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾| | r₁ = δₖ/δₖ₋₁
    k = 0    2  ·  ·
    k = 1    (3/2)  (1/2)  ·
    k = 2    (5/4)  (1/4)  (1/2)
    k = 3    (9/8)  (1/8)  (1/2)
  puis : Le rapport r₁ vaut 1/2 à chaque pas. Quel est l'ordre de Newton ici ?
      ✔ Ordre 1 : r₁ = 1 − 1/m = 1/2, la racine est multiple   · Ordre 2 : Newton est toujours d'ordre 2 [n_newton_always2]   · Ordre 0 : la méthode ne converge pas   · On ne peut pas savoir sans α
      pièges : n_newton_always2
  pièges : n_newton_always2

```

### Niveau 3

```
f(x) = (x + 2)³, de racine α = −2. Trouve la multiplicité m, puis fais un pas de Newton modifié. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  m
    (f(−2) = 0 et f′(−2) = 0, f″(−2) = 0.)
    ? f′(α) = 0 : que vaut Newton ici ? ✔ Racine multiple : Newton n'est que d'ordre 1 / · Newton reste d'ordre 2
    = 3   ← f‴(α) ≠ 0
  — Un pas de Newton modifié à partir de x⁽⁰⁾ = −1 :  [juge value]  départ : x_1
    ? Quelle itération ? ✔ Newton modifié : x − 3·f(x)/f′(x) / · Newton : x − f(x)/f′(x)
    = −1 − 3·(1)/3   ← f/f′ = (x + 2)/3
    = −2   ← exact en un pas
  aides : Regarde f′(α) : s'il est nul, la racine est multiple. | x⁽¹⁾ = −1 − 3·f(−1)/f′(−1) = −1 − □ | m = 3 et x⁽¹⁾ = −2.
  pièges : n_newton_always2

f(x) = x², de racine α = 0. Trouve la multiplicité m, puis fais un pas de Newton modifié. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  m
    (f(0) = 0 et f′(0) = 0.)
    ? f′(α) = 0 : que vaut Newton ici ? ✔ Racine multiple : Newton n'est que d'ordre 1 / · Newton reste d'ordre 2
    = 2   ← f″(α) ≠ 0
  — Un pas de Newton modifié à partir de x⁽⁰⁾ = −1 :  [juge value]  départ : x_1
    ? Quelle itération ? ✔ Newton modifié : x − 2·f(x)/f′(x) / · Newton : x − f(x)/f′(x)
    = −1 − 2·(−1)/2   ← f/f′ = x/2
    = 0   ← exact en un pas
  aides : Regarde f′(α) : s'il est nul, la racine est multiple. | x⁽¹⁾ = −1 − 2·f(−1)/f′(−1) = −1 − □ | m = 2 et x⁽¹⁾ = 0.
  pièges : n_newton_always2

f(x) = x², de racine α = 0. Trouve la multiplicité m, puis fais un pas de Newton modifié. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  m
    (f(0) = 0 et f′(0) = 0.)
    ? f′(α) = 0 : que vaut Newton ici ? ✔ Racine multiple : Newton n'est que d'ordre 1 / · Newton reste d'ordre 2
    = 2   ← f″(α) ≠ 0
  — Un pas de Newton modifié à partir de x⁽⁰⁾ = −1 :  [juge value]  départ : x_1
    ? Quelle itération ? ✔ Newton modifié : x − 2·f(x)/f′(x) / · Newton : x − f(x)/f′(x)
    = −1 − 2·(−1)/2   ← f/f′ = x/2
    = 0   ← exact en un pas
  aides : Regarde f′(α) : s'il est nul, la racine est multiple. | x⁽¹⁾ = −1 − 2·f(−1)/f′(−1) = −1 − □ | m = 2 et x⁽¹⁾ = 0.
  pièges : n_newton_always2

```

### Niveau 4

```
Newton pour f(x) = (x − 1)³·eˣ, avec x⁽⁰⁾ = 3 affiche :
  [tableau à lire]
    k | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
    δₖ | 4.000e-01 | 3.478e-01 | 2.945e-01 | 2.420e-01 | 1.926e-01 | 1.485e-01 | 1.110e-01 | 8.077e-02
    r₁ |  | 0,87 | 0,847 | 0,822 | 0,796 | 0,771 | 0,748 | 0,728
  question : Le rapport r₁ tend vers 1 − 1/m. Quelle est la multiplicité m de la racine ?
      [free, sans aide, suivre l'erreur]  m
        = 1/(1 − 2/3)   ← r₁ → 1 − 1/m
        = 3   ← multiplicité
      pièges : n_mult_ratio
  pièges : n_mult_ratio

Newton pour f(x) = (x + 1)²·eˣ, avec x⁽⁰⁾ = 1 affiche :
  [tableau à lire]
    k | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
    δₖ | 5.000e-01 | 4.286e-01 | 3.488e-01 | 2.654e-01 | 1.861e-01 | 1.194e-01 | 7.052e-02 | 3.903e-02
    r₁ |  | 0,857 | 0,814 | 0,761 | 0,701 | 0,642 | 0,591 | 0,553
  question : Le rapport r₁ tend vers 1 − 1/m. Quelle est la multiplicité m de la racine ?
      [free, sans aide, suivre l'erreur]  m
        = 1/(1 − 1/2)   ← r₁ → 1 − 1/m
        = 2   ← multiplicité
  pièges : n_mult_ratio

Newton pour f(x) = (x + 1)²·eˣ, avec x⁽⁰⁾ = 0 affiche :
  [tableau à lire]
    k | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
    δₖ | 3.333e-01 | 2.500e-01 | 1.724e-01 | 1.088e-01 | 6.342e-02 | 3.475e-02 | 1.829e-02 | 9.394e-03
    r₁ |  | 0,75 | 0,69 | 0,631 | 0,583 | 0,548 | 0,526 | 0,514
  question : Le rapport r₁ tend vers 1 − 1/m. Quelle est la multiplicité m de la racine ?
      [free, sans aide, suivre l'erreur]  m
        = 1/(1 − 1/2)   ← r₁ → 1 − 1/m
        = 2   ← multiplicité
  pièges : n_mult_ratio

```

### Niveau 5

```
Complète Newton modifié pour une racine de multiplicité m connue (m = 1 donne Newton).
  [code python, 1 trou, sans aide]
    | def newton_mod(f, df, m, x0, tol, nmax):
    |     x = x0
    |     for k in range(nmax):
    |         incr = ⟦m * f(x) / df(x)⟧
    |         x = x - incr
    |         if abs(incr) < tol:
    |             return [x, k + 1]
    |     return [x, nmax]
    test : def f(x): return (x-1)**2 * math.exp(x) ; def df(x): return (2*(x-1) + (x-1)**2) * math.exp(x) ; newton_mod(f, df, 2, 2.0, 1e-10, 100) → [1.0, 6]
    test : def f(x): return (x-1)**2 * math.exp(x) ; def df(x): return (2*(x-1) + (x-1)**2) * math.exp(x) ; newton_mod(f, df, 1, 2.0, 1e-10, 100)[1] → 35
  puis : Pour f(x) = (x − 2)²·eˣ, avec x⁽⁰⁾ = 3, Newton (m = 1) et Newton modifié (m = 2) affichent leurs incréments :
      [tableau à lire, sans aide]
        k | δₖ, Newton | δₖ, modifié (m = 2)
        0 | 3.333e-01 | 6.667e-01
        1 | 2.500e-01 | 2.857e-01
        2 | 1.724e-01 | 4.651e-02
        3 | 1.088e-01 | 1.107e-03
        4 | 6.342e-02 | 6.128e-07
        5 | 3.475e-02 | 1.878e-13
        6 | 1.829e-02 | 
        7 | 9.394e-03 | 
      question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
          · Newton modifié est d'ordre 1   ✔ Newton est d'ordre 1 ici : r₁ → 1/2   · Newton est d'ordre 2, comme toujours [n_newton_always2]   ✔ Newton modifié retrouve l'ordre 2
          pièges : n_newton_always2
      pièges : n_newton_always2
  pièges : n_newton_inverted

Complète Newton modifié pour une racine de multiplicité m connue (m = 1 donne Newton).
  [code python, 1 trou, sans aide]
    | def newton_mod(f, df, m, x0, tol, nmax):
    |     x = x0
    |     for k in range(nmax):
    |         incr = ⟦m * f(x) / df(x)⟧
    |         x = x - incr
    |         if abs(incr) < tol:
    |             return [x, k + 1]
    |     return [x, nmax]
    test : def f(x): return (x-1)**2 * math.exp(x) ; def df(x): return (2*(x-1) + (x-1)**2) * math.exp(x) ; newton_mod(f, df, 2, 2.0, 1e-10, 100) → [1.0, 6]
    test : def f(x): return (x-1)**2 * math.exp(x) ; def df(x): return (2*(x-1) + (x-1)**2) * math.exp(x) ; newton_mod(f, df, 1, 2.0, 1e-10, 100)[1] → 35
  puis : Pour f(x) = (x + 1)²·(1 + x²), avec x⁽⁰⁾ = 1, Newton (m = 1) et Newton modifié (m = 2) affichent leurs incréments :
      [tableau à lire, sans aide]
        k | δₖ, Newton | δₖ, modifié (m = 2)
        0 | 5.000e-01 | 1.000e+00
        1 | 4.688e-01 | 1.000e+00
        2 | 4.995e-01 | 
        3 | 3.341e-01 | 
        4 | 1.094e-01 | 
        5 | 4.616e-02 | 
        6 | 2.150e-02 | 
        7 | 1.041e-02 | 
      question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
          · Newton est d'ordre 2, comme toujours [n_newton_always2]   · Newton modifié est d'ordre 1   ✔ Newton est d'ordre 1 ici : r₁ → 1/2   ✔ Newton modifié retrouve l'ordre 2
          pièges : n_newton_always2
      pièges : n_newton_always2
  pièges : n_newton_inverted

Complète Newton modifié pour une racine de multiplicité m connue (m = 1 donne Newton).
  [code python, 1 trou, sans aide]
    | def newton_mod(f, df, m, x0, tol, nmax):
    |     x = x0
    |     for k in range(nmax):
    |         incr = ⟦m * f(x) / df(x)⟧
    |         x = x - incr
    |         if abs(incr) < tol:
    |             return [x, k + 1]
    |     return [x, nmax]
    test : def f(x): return (x-1)**2 * math.exp(x) ; def df(x): return (2*(x-1) + (x-1)**2) * math.exp(x) ; newton_mod(f, df, 2, 2.0, 1e-10, 100) → [1.0, 6]
    test : def f(x): return (x-1)**2 * math.exp(x) ; def df(x): return (2*(x-1) + (x-1)**2) * math.exp(x) ; newton_mod(f, df, 1, 2.0, 1e-10, 100)[1] → 35
  puis : Pour f(x) = (x − 2)²·eˣ, avec x⁽⁰⁾ = 4, Newton (m = 1) et Newton modifié (m = 2) affichent leurs incréments :
      [tableau à lire, sans aide]
        k | δₖ, Newton | δₖ, modifié (m = 2)
        0 | 5.000e-01 | 1.000e+00
        1 | 4.286e-01 | 6.667e-01
        2 | 3.488e-01 | 2.857e-01
        3 | 2.654e-01 | 4.651e-02
        4 | 1.861e-01 | 1.107e-03
        5 | 1.194e-01 | 6.128e-07
        6 | 7.052e-02 | 1.878e-13
        7 | 3.903e-02 | 
      question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
          ✔ Newton est d'ordre 1 ici : r₁ → 1/2   · Newton modifié est d'ordre 1   ✔ Newton modifié retrouve l'ordre 2   · Newton est d'ordre 2, comme toujours [n_newton_always2]
          pièges : n_newton_always2
      pièges : n_newton_always2
  pièges : n_newton_inverted

```

### Variantes d'examen

```
Newton pour f(x) = (x + 1)³·(1 + x²), avec x⁽⁰⁾ = 1 affiche :k01234567δₖ4.000e-013.627e-013.480e-013.170e-012.213e-011.310e-017.896e-024.932e-02r₁0,9070,9590,9110,6980,5920,6030,625Que peut-on en déduire ? Une ou plusieurs réponses justes.
  ✔ La racine est de multiplicité 3 (r₁ → 2/3)   ✔ La méthode converge à l'ordre 1   · La méthode converge à l'ordre 2 [n_newton_always2]   · La racine est simple
  [examen mcq]
  pièges : n_newton_always2

Vrai ou faux ?
  « Quand elle converge, la méthode de Newton est toujours d'ordre 2. » → FAUX
    contre-exemple (num) : f = (x-1)^2, x0 = 2
  [examen tf]
  pièges : n_newton_always2

```

## Newton pour les systèmes ; jacobienne à la main (`n-newton-system`, BA4)

_Résoudre J(x⁽ᵏ⁾)·δ = F(x⁽ᵏ⁾), puis x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − δ._

### Niveau 1

```
Un pas de Newton pour F(x, y) = (x² − y − 2 ; −2x − y + 1) = (0 ; 0), à partir de x⁽⁰⁾ = (1 ; 0) : J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), puis x⁽¹⁾ = x⁽⁰⁾ − δ.
  [guided]  J
    (Ligne i : les dérivées de Fᵢ par rapport à x, puis à y.)
    = [[2x,-1],[-2,-1]]   (cases à remplir : (1,1) (1,2))   ← une ligne par composante, une colonne par variable
  — En x⁽⁰⁾ = (1 ; 0) :  [juge mat]  départ : J_0
    (F(1 ; 0) = (−1 ; −1) (donné).)
    = [[2,-1],[-2,-1]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← on évalue chaque case
  — Le pas : résoudre J(1 ; 0)·δ = F(1 ; 0).  [juge mat]  départ : δ
    = (0 ; 1)   (cases à remplir : (1,1) (2,1))   ← det J = −4
  — La mise à jour :  [juge mat]  départ : x_1
    = (1 ; 0)-(0 ; 1)   ← x⁽⁰⁾ − δ
    = (1 ; -1)   (cases à remplir : (1,1) (2,1))   ← le nouvel itéré
  aides : Ligne i de la jacobienne : les dérivées de Fᵢ par rapport à x, puis à y ; ensuite on résout J·δ = F. | J(1 ; 0)·δ = (−1 ; −1), puis x⁽¹⁾ = x⁽⁰⁾ − □ | δ = (0 ; 1), donc x⁽¹⁾ = (1 ; −1).
  pièges : a2_jacobian_transposed

Un pas de Newton pour F(x, y) = (x² + y² − 5 ; x − y + 1) = (0 ; 0), à partir de x⁽⁰⁾ = (−2 ; 0) : J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), puis x⁽¹⁾ = x⁽⁰⁾ − δ.
  [guided]  J
    (Ligne i : les dérivées de Fᵢ par rapport à x, puis à y.)
    = [[2x,2y],[1,-1]]   (cases à remplir : (1,1) (1,2))   ← une ligne par composante, une colonne par variable
  — En x⁽⁰⁾ = (−2 ; 0) :  [juge mat]  départ : J_0
    (F(−2 ; 0) = (−1 ; −1) (donné).)
    = [[-4,0],[1,-1]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← on évalue chaque case
  — Le pas : résoudre J(−2 ; 0)·δ = F(−2 ; 0).  [juge mat]  départ : δ
    = (1/4 ; 5/4)   (cases à remplir : (1,1) (2,1))   ← det J = 4
  — La mise à jour :  [juge mat]  départ : x_1
    = (-2 ; 0)-(1/4 ; 5/4)   ← x⁽⁰⁾ − δ
    = (-9/4 ; -5/4)   (cases à remplir : (1,1) (2,1))   ← le nouvel itéré
  aides : Ligne i de la jacobienne : les dérivées de Fᵢ par rapport à x, puis à y ; ensuite on résout J·δ = F. | J(−2 ; 0)·δ = (−1 ; −1), puis x⁽¹⁾ = x⁽⁰⁾ − □ | δ = (1/4 ; 5/4), donc x⁽¹⁾ = (−9/4 ; −5/4).
  pièges : a2_jacobian_transposed

Un pas de Newton pour F(x, y) = (x² − y + 2 ; x − 2y + 4) = (0 ; 0), à partir de x⁽⁰⁾ = (0 ; 3) : J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), puis x⁽¹⁾ = x⁽⁰⁾ − δ.
  [guided]  J
    (Ligne i : les dérivées de Fᵢ par rapport à x, puis à y.)
    = [[2x,-1],[1,-2]]   (cases à remplir : (1,1) (1,2))   ← une ligne par composante, une colonne par variable
  — En x⁽⁰⁾ = (0 ; 3) :  [juge mat]  départ : J_0
    (F(0 ; 3) = (−1 ; −2) (donné).)
    = [[0,-1],[1,-2]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← on évalue chaque case
  — Le pas : résoudre J(0 ; 3)·δ = F(0 ; 3).  [juge mat]  départ : δ
    = (0 ; 1)   (cases à remplir : (1,1) (2,1))   ← det J = 1
  — La mise à jour :  [juge mat]  départ : x_1
    = (0 ; 3)-(0 ; 1)   ← x⁽⁰⁾ − δ
    = (0 ; 2)   (cases à remplir : (1,1) (2,1))   ← le nouvel itéré
  aides : Ligne i de la jacobienne : les dérivées de Fᵢ par rapport à x, puis à y ; ensuite on résout J·δ = F. | J(0 ; 3)·δ = (−1 ; −2), puis x⁽¹⁾ = x⁽⁰⁾ − □ | δ = (0 ; 1), donc x⁽¹⁾ = (0 ; 2).
  pièges : a2_jacobian_transposed

```

### Niveau 2

```
Un pas de Newton pour F(x, y) = (2x − y + 4 ; xy − 0) = (0 ; 0), à partir de x⁽⁰⁾ = (−1 ; 0) : J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), puis x⁽¹⁾ = x⁽⁰⁾ − δ.
  [guided]  J
    (Ligne i : les dérivées de Fᵢ par rapport à x, puis à y.)
    = [[2,-1],[y,x]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← une ligne par composante, une colonne par variable
  — En x⁽⁰⁾ = (−1 ; 0) :  [juge mat]  départ : J_0
    = [[2,-1],[0,-1]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← on évalue chaque case
  — Le second membre :  [juge mat]  départ : F_0
    = (2 ; 0)   (cases à remplir : (1,1) (2,1))   ← F₁ et F₂ en x⁽⁰⁾
  — Le pas : résoudre J(−1 ; 0)·δ = F(−1 ; 0).  [juge mat]  départ : δ
    ? Comment obtiens-tu δ ? ✔ Résoudre le système J·δ = F (Gauss) / ✔ Calculer J⁻¹, puis δ = J⁻¹F
    = (1 ; 0)   (cases à remplir : (1,1) (2,1))   ← det J = −2
  — La mise à jour :  [juge mat]  départ : x_1
    ? Comment passes-tu de x⁽⁰⁾ à x⁽¹⁾ ? ✔ x⁽¹⁾ = x⁽⁰⁾ − δ / · x⁽¹⁾ = x⁽⁰⁾ + δ
    = (-1 ; 0)-(1 ; 0)   ← x⁽⁰⁾ − δ
    = (-2 ; 0)   (cases à remplir : (1,1) (2,1))   ← le nouvel itéré
  aides : Ligne i de la jacobienne : les dérivées de Fᵢ par rapport à x, puis à y ; ensuite on résout J·δ = F. | J(−1 ; 0)·δ = (2 ; 0), puis x⁽¹⁾ = x⁽⁰⁾ − □ | δ = (1 ; 0), donc x⁽¹⁾ = (−2 ; 0).
  pièges : n_newton_sys_sign, a2_jacobian_transposed

Un pas de Newton pour F(x, y) = (−2x − y + 5 ; xy + 3) = (0 ; 0), à partir de x⁽⁰⁾ = (3 ; −2) : J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), puis x⁽¹⁾ = x⁽⁰⁾ − δ.
  [guided]  J
    (Ligne i : les dérivées de Fᵢ par rapport à x, puis à y.)
    = [[-2,-1],[y,x]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← une ligne par composante, une colonne par variable
  — En x⁽⁰⁾ = (3 ; −2) :  [juge mat]  départ : J_0
    = [[-2,-1],[-2,3]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← on évalue chaque case
  — Le second membre :  [juge mat]  départ : F_0
    = (1 ; -3)   (cases à remplir : (1,1) (2,1))   ← F₁ et F₂ en x⁽⁰⁾
  — Le pas : résoudre J(3 ; −2)·δ = F(3 ; −2).  [juge mat]  départ : δ
    ? Comment obtiens-tu δ ? ✔ Résoudre le système J·δ = F (Gauss) / ✔ Calculer J⁻¹, puis δ = J⁻¹F
    = (0 ; -1)   (cases à remplir : (1,1) (2,1))   ← det J = −8
  — La mise à jour :  [juge mat]  départ : x_1
    ? Comment passes-tu de x⁽⁰⁾ à x⁽¹⁾ ? ✔ x⁽¹⁾ = x⁽⁰⁾ − δ / · x⁽¹⁾ = x⁽⁰⁾ + δ
    = (3 ; -2)-(0 ; -1)   ← x⁽⁰⁾ − δ
    = (3 ; -1)   (cases à remplir : (1,1) (2,1))   ← le nouvel itéré
  aides : Ligne i de la jacobienne : les dérivées de Fᵢ par rapport à x, puis à y ; ensuite on résout J·δ = F. | J(3 ; −2)·δ = (1 ; −3), puis x⁽¹⁾ = x⁽⁰⁾ − □ | δ = (0 ; −1), donc x⁽¹⁾ = (3 ; −1).
  pièges : n_newton_sys_sign, a2_jacobian_transposed

Un pas de Newton pour F(x, y) = (x² − y − 1 ; x + y + 1) = (0 ; 0), à partir de x⁽⁰⁾ = (0 ; −2) : J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), puis x⁽¹⁾ = x⁽⁰⁾ − δ.
  [guided]  J
    (Ligne i : les dérivées de Fᵢ par rapport à x, puis à y.)
    = [[2x,-1],[1,1]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← une ligne par composante, une colonne par variable
  — En x⁽⁰⁾ = (0 ; −2) :  [juge mat]  départ : J_0
    = [[0,-1],[1,1]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← on évalue chaque case
  — Le second membre :  [juge mat]  départ : F_0
    = (1 ; -1)   (cases à remplir : (1,1) (2,1))   ← F₁ et F₂ en x⁽⁰⁾
  — Le pas : résoudre J(0 ; −2)·δ = F(0 ; −2).  [juge mat]  départ : δ
    ? Comment obtiens-tu δ ? ✔ Résoudre le système J·δ = F (Gauss) / ✔ Calculer J⁻¹, puis δ = J⁻¹F
    = (0 ; -1)   (cases à remplir : (1,1) (2,1))   ← det J = 1
  — La mise à jour :  [juge mat]  départ : x_1
    ? Comment passes-tu de x⁽⁰⁾ à x⁽¹⁾ ? ✔ x⁽¹⁾ = x⁽⁰⁾ − δ / · x⁽¹⁾ = x⁽⁰⁾ + δ
    = (0 ; -2)-(0 ; -1)   ← x⁽⁰⁾ − δ
    = (0 ; -1)   (cases à remplir : (1,1) (2,1))   ← le nouvel itéré
  aides : Ligne i de la jacobienne : les dérivées de Fᵢ par rapport à x, puis à y ; ensuite on résout J·δ = F. | J(0 ; −2)·δ = (1 ; −1), puis x⁽¹⁾ = x⁽⁰⁾ − □ | δ = (0 ; −1), donc x⁽¹⁾ = (0 ; −1).
  pièges : n_newton_sys_sign, a2_jacobian_transposed

```

### Niveau 3

```
Un pas de Newton pour F(x, y) = (x² − y − 0 ; −2x + 2y) = (0 ; 0), à partir de x⁽⁰⁾ = (0 ; 1) : J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), puis x⁽¹⁾ = x⁽⁰⁾ − δ. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  J
    = [[2x,-1],[-2,2]]   ← une ligne par composante, une colonne par variable
  — En x⁽⁰⁾ = (0 ; 1) :  [juge mat]  départ : J_0
    = [[0,-1],[-2,2]]   ← on évalue chaque case
  — Le second membre :  [juge mat]  départ : F_0
    = (-1 ; 2)   ← F₁ et F₂ en x⁽⁰⁾
  — Le pas : résoudre J(0 ; 1)·δ = F(0 ; 1).  [juge mat]  départ : δ
    ? Comment obtiens-tu δ ? ✔ Résoudre le système J·δ = F (Gauss) / ✔ Calculer J⁻¹, puis δ = J⁻¹F
    = (0 ; 1)   ← det J = −2
  — La mise à jour :  [juge mat]  départ : x_1
    ? Comment passes-tu de x⁽⁰⁾ à x⁽¹⁾ ? ✔ x⁽¹⁾ = x⁽⁰⁾ − δ / · x⁽¹⁾ = x⁽⁰⁾ + δ
    = (0 ; 1)-(0 ; 1)   ← x⁽⁰⁾ − δ
    = (0 ; 0)   ← le nouvel itéré
  aides : Ligne i de la jacobienne : les dérivées de Fᵢ par rapport à x, puis à y ; ensuite on résout J·δ = F. | J(0 ; 1)·δ = (−1 ; 2), puis x⁽¹⁾ = x⁽⁰⁾ − □ | δ = (0 ; 1), donc x⁽¹⁾ = (0 ; 0).
  pièges : n_newton_sys_sign, a2_jacobian_transposed

Un pas de Newton pour F(x, y) = (−2x − y + 9 ; xy − 9) = (0 ; 0), à partir de x⁽⁰⁾ = (3 ; 2) : J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), puis x⁽¹⁾ = x⁽⁰⁾ − δ. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  J
    = [[-2,-1],[y,x]]   ← une ligne par composante, une colonne par variable
  — En x⁽⁰⁾ = (3 ; 2) :  [juge mat]  départ : J_0
    = [[-2,-1],[2,3]]   ← on évalue chaque case
  — Le second membre :  [juge mat]  départ : F_0
    = (1 ; -3)   ← F₁ et F₂ en x⁽⁰⁾
  — Le pas : résoudre J(3 ; 2)·δ = F(3 ; 2).  [juge mat]  départ : δ
    ? Comment obtiens-tu δ ? ✔ Résoudre le système J·δ = F (Gauss) / ✔ Calculer J⁻¹, puis δ = J⁻¹F
    = (0 ; -1)   ← det J = −4
  — La mise à jour :  [juge mat]  départ : x_1
    ? Comment passes-tu de x⁽⁰⁾ à x⁽¹⁾ ? ✔ x⁽¹⁾ = x⁽⁰⁾ − δ / · x⁽¹⁾ = x⁽⁰⁾ + δ
    = (3 ; 2)-(0 ; -1)   ← x⁽⁰⁾ − δ
    = (3 ; 3)   ← le nouvel itéré
  aides : Ligne i de la jacobienne : les dérivées de Fᵢ par rapport à x, puis à y ; ensuite on résout J·δ = F. | J(3 ; 2)·δ = (1 ; −3), puis x⁽¹⁾ = x⁽⁰⁾ − □ | δ = (0 ; −1), donc x⁽¹⁾ = (3 ; 3).
  pièges : n_newton_sys_sign, a2_jacobian_transposed

Un pas de Newton pour F(x, y) = (x² + y² − 13 ; x − y + 5) = (0 ; 0), à partir de x⁽⁰⁾ = (−1 ; 3) : J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), puis x⁽¹⁾ = x⁽⁰⁾ − δ. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  J
    = [[2x,2y],[1,-1]]   ← une ligne par composante, une colonne par variable
  — En x⁽⁰⁾ = (−1 ; 3) :  [juge mat]  départ : J_0
    = [[-2,6],[1,-1]]   ← on évalue chaque case
  — Le second membre :  [juge mat]  départ : F_0
    = (-3 ; 1)   ← F₁ et F₂ en x⁽⁰⁾
  — Le pas : résoudre J(−1 ; 3)·δ = F(−1 ; 3).  [juge mat]  départ : δ
    ? Comment obtiens-tu δ ? ✔ Résoudre le système J·δ = F (Gauss) / ✔ Calculer J⁻¹, puis δ = J⁻¹F
    = (3/4 ; -1/4)   ← det J = −4
  — La mise à jour :  [juge mat]  départ : x_1
    ? Comment passes-tu de x⁽⁰⁾ à x⁽¹⁾ ? ✔ x⁽¹⁾ = x⁽⁰⁾ − δ / · x⁽¹⁾ = x⁽⁰⁾ + δ
    = (-1 ; 3)-(3/4 ; -1/4)   ← x⁽⁰⁾ − δ
    = (-7/4 ; 13/4)   ← le nouvel itéré
  aides : Ligne i de la jacobienne : les dérivées de Fᵢ par rapport à x, puis à y ; ensuite on résout J·δ = F. | J(−1 ; 3)·δ = (−3 ; 1), puis x⁽¹⁾ = x⁽⁰⁾ − □ | δ = (3/4 ; −1/4), donc x⁽¹⁾ = (−7/4 ; 13/4).
  pièges : n_newton_sys_sign, a2_jacobian_transposed

```

### Niveau 4

```
Un pas de Newton pour F(x, y) = (x² + y² − 13 ; x + y − 1) = (0 ; 0), à partir de x⁽⁰⁾ = (−1 ; 3) : J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), puis x⁽¹⁾ = x⁽⁰⁾ − δ.
  [free, suivre l'erreur]  J
    = [[2x,2y],[1,1]]   ← une ligne par composante, une colonne par variable
  — En x⁽⁰⁾ = (−1 ; 3) :  [juge mat]  départ : J_0
    = [[-2,6],[1,1]]   ← on évalue chaque case
  — Le second membre :  [juge mat]  départ : F_0
    = (-3 ; 1)   ← F₁ et F₂ en x⁽⁰⁾
  — Le pas : résoudre J(−1 ; 3)·δ = F(−1 ; 3).  [juge mat]  départ : δ
    = (9/8 ; -1/8)   ← det J = −8
  — La mise à jour :  [juge mat]  départ : x_1
    = (-1 ; 3)-(9/8 ; -1/8)   ← x⁽⁰⁾ − δ
    = (-17/8 ; 25/8)   ← le nouvel itéré
  aides : Ligne i de la jacobienne : les dérivées de Fᵢ par rapport à x, puis à y ; ensuite on résout J·δ = F. | J(−1 ; 3)·δ = (−3 ; 1), puis x⁽¹⁾ = x⁽⁰⁾ − □ | δ = (9/8 ; −1/8), donc x⁽¹⁾ = (−17/8 ; 25/8).
  pièges : n_newton_sys_sign, a2_jacobian_transposed

Un pas de Newton pour F(x, y) = (2x − 2y − 2 ; xy − 2) = (0 ; 0), à partir de x⁽⁰⁾ = (−1 ; −3) : J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), puis x⁽¹⁾ = x⁽⁰⁾ − δ.
  [free, suivre l'erreur]  J
    = [[2,-2],[y,x]]   ← une ligne par composante, une colonne par variable
  — En x⁽⁰⁾ = (−1 ; −3) :  [juge mat]  départ : J_0
    = [[2,-2],[-3,-1]]   ← on évalue chaque case
  — Le second membre :  [juge mat]  départ : F_0
    = (2 ; 1)   ← F₁ et F₂ en x⁽⁰⁾
  — Le pas : résoudre J(−1 ; −3)·δ = F(−1 ; −3).  [juge mat]  départ : δ
    = (0 ; -1)   ← det J = −8
  — La mise à jour :  [juge mat]  départ : x_1
    = (-1 ; -3)-(0 ; -1)   ← x⁽⁰⁾ − δ
    = (-1 ; -2)   ← le nouvel itéré
  aides : Ligne i de la jacobienne : les dérivées de Fᵢ par rapport à x, puis à y ; ensuite on résout J·δ = F. | J(−1 ; −3)·δ = (2 ; 1), puis x⁽¹⁾ = x⁽⁰⁾ − □ | δ = (0 ; −1), donc x⁽¹⁾ = (−1 ; −2).
  pièges : n_newton_sys_sign, a2_jacobian_transposed

Un pas de Newton pour F(x, y) = (x² − y − 2 ; x + y + 2) = (0 ; 0), à partir de x⁽⁰⁾ = (−1 ; 0) : J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), puis x⁽¹⁾ = x⁽⁰⁾ − δ.
  [free, suivre l'erreur]  J
    = [[2x,-1],[1,1]]   ← une ligne par composante, une colonne par variable
  — En x⁽⁰⁾ = (−1 ; 0) :  [juge mat]  départ : J_0
    = [[-2,-1],[1,1]]   ← on évalue chaque case
  — Le second membre :  [juge mat]  départ : F_0
    = (-1 ; 1)   ← F₁ et F₂ en x⁽⁰⁾
  — Le pas : résoudre J(−1 ; 0)·δ = F(−1 ; 0).  [juge mat]  départ : δ
    = (0 ; 1)   ← det J = −1
  — La mise à jour :  [juge mat]  départ : x_1
    = (-1 ; 0)-(0 ; 1)   ← x⁽⁰⁾ − δ
    = (-1 ; -1)   ← le nouvel itéré
  aides : Ligne i de la jacobienne : les dérivées de Fᵢ par rapport à x, puis à y ; ensuite on résout J·δ = F. | J(−1 ; 0)·δ = (−1 ; 1), puis x⁽¹⁾ = x⁽⁰⁾ − □ | δ = (0 ; 1), donc x⁽¹⁾ = (−1 ; −1).
  pièges : n_newton_sys_sign, a2_jacobian_transposed

```

### Niveau 5

```
Complète Newton pour un système de deux équations : F(x) et J(x) sont des fonctions données ; on résout J·δ = F, puis x ← x − δ, jusqu'à ‖δ‖ < tol. La fonction renvoie [x₁, x₂, nombre d'itérations].
  [code python, 4 trous, sans aide]
    | def newton_sys(F, J, x0, tol, nmax):
    |     x = [x0[0], x0[1]]
    |     for k in range(nmax):
    |         delta = ⟦solve(J(x), F(x))⟧
    |         x[0] = ⟦x[0] - delta[0]⟧
    |         x[1] = ⟦x[1] - delta[1]⟧
    |         if ⟦norm(delta) < tol⟧:
    |             return [x[0], x[1], k + 1]
    |     return [x[0], x[1], nmax]
    test : def F(x): return [x[0]**2 + x[1]**2 - 5, x[0] - x[1] + 1] ; def J(x): return [[2*x[0], 2*x[1]], [1, -1]] ; newton_sys(F, J, [1.0, 1.0], 1e-12, 50) → [1.0, 2.0, 6]
    test : def F(x): return [x[0]**2 + x[1]**2 - 5, x[0] - x[1] + 1] ; def J(x): return [[2*x[0], 2*x[1]], [1, -1]] ; newton_sys(F, J, [1.0, 1.0], 1e9, 1) → [1.25, 2.25, 1]
  puis : Le programme, appelé pour F(x, y) = (x² + y² − 2 ; x + 2y − 3) et x⁽⁰⁾ = (1 ; 0), affiche ‖δ‖ à chaque itération :
      [tableau à lire, sans aide]
        itération | ‖δ‖
        1 | 9.013878e-01
        2 | 4.037345e-01
        3 | 1.352719e-01
        4 | 1.958212e-02
        5 | 4.283101e-04
        6 | 2.051027e-07
        7 | 4.667164e-14
        8 | 0.000000e+00
      question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
          · La méthode est d'ordre 1, puisque ‖δ‖ₖ₊₁/‖δ‖ₖ tend vers 0 [n_order_simple_ratio]   ✔ Newton converge quadratiquement pour ce point de départ   · Newton converge quadratiquement quel que soit le point de départ   ✔ La jacobienne en la solution est inversible (sinon l'ordre 2 serait perdu)
          pièges : n_order_simple_ratio
      pièges : n_order_simple_ratio
  pièges : a2_jacobian_transposed, n_newton_sys_sign

Complète Newton pour un système de deux équations : F(x) et J(x) sont des fonctions données ; on résout J·δ = F, puis x ← x − δ, jusqu'à ‖δ‖ < tol. La fonction renvoie [x₁, x₂, nombre d'itérations].
  [code python, 4 trous, sans aide]
    | def newton_sys(F, J, x0, tol, nmax):
    |     x = [x0[0], x0[1]]
    |     for k in range(nmax):
    |         delta = ⟦solve(J(x), F(x))⟧
    |         x[0] = ⟦x[0] - delta[0]⟧
    |         x[1] = ⟦x[1] - delta[1]⟧
    |         if ⟦norm(delta) < tol⟧:
    |             return [x[0], x[1], k + 1]
    |     return [x[0], x[1], nmax]
    test : def F(x): return [x[0]**2 + x[1]**2 - 5, x[0] - x[1] + 1] ; def J(x): return [[2*x[0], 2*x[1]], [1, -1]] ; newton_sys(F, J, [1.0, 1.0], 1e-12, 50) → [1.0, 2.0, 6]
    test : def F(x): return [x[0]**2 + x[1]**2 - 5, x[0] - x[1] + 1] ; def J(x): return [[2*x[0], 2*x[1]], [1, -1]] ; newton_sys(F, J, [1.0, 1.0], 1e9, 1) → [1.25, 2.25, 1]
  puis : Le programme, appelé pour F(x, y) = (x² + y² − 13 ; x + y − 5) et x⁽⁰⁾ = (1 ; 3), affiche ‖δ‖ à chaque itération :
      [tableau à lire, sans aide]
        itération | ‖δ‖
        1 | 7.905694e-01
        2 | 2.946278e-01
        3 | 5.665920e-02
        4 | 2.262747e-03
        5 | 3.620387e-06
        6 | 9.269826e-12
        7 | 1.256074e-15
      question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
          ✔ Newton converge quadratiquement pour ce point de départ   · Newton converge quadratiquement quel que soit le point de départ   · La méthode est d'ordre 1, puisque ‖δ‖ₖ₊₁/‖δ‖ₖ tend vers 0 [n_order_simple_ratio]   ✔ La jacobienne en la solution est inversible (sinon l'ordre 2 serait perdu)
          pièges : n_order_simple_ratio
      pièges : n_order_simple_ratio
  pièges : a2_jacobian_transposed, n_newton_sys_sign

Complète Newton pour un système de deux équations : F(x) et J(x) sont des fonctions données ; on résout J·δ = F, puis x ← x − δ, jusqu'à ‖δ‖ < tol. La fonction renvoie [x₁, x₂, nombre d'itérations].
  [code python, 4 trous, sans aide]
    | def newton_sys(F, J, x0, tol, nmax):
    |     x = [x0[0], x0[1]]
    |     for k in range(nmax):
    |         delta = ⟦solve(J(x), F(x))⟧
    |         x[0] = ⟦x[0] - delta[0]⟧
    |         x[1] = ⟦x[1] - delta[1]⟧
    |         if ⟦norm(delta) < tol⟧:
    |             return [x[0], x[1], k + 1]
    |     return [x[0], x[1], nmax]
    test : def F(x): return [x[0]**2 + x[1]**2 - 5, x[0] - x[1] + 1] ; def J(x): return [[2*x[0], 2*x[1]], [1, -1]] ; newton_sys(F, J, [1.0, 1.0], 1e-12, 50) → [1.0, 2.0, 6]
    test : def F(x): return [x[0]**2 + x[1]**2 - 5, x[0] - x[1] + 1] ; def J(x): return [[2*x[0], 2*x[1]], [1, -1]] ; newton_sys(F, J, [1.0, 1.0], 1e9, 1) → [1.25, 2.25, 1]
  puis : Le programme, appelé pour F(x, y) = (x² + y² − 10 ; −2x + y + 7) et x⁽⁰⁾ = (4 ; −1), affiche ‖δ‖ à chaque itération :
      [tableau à lire, sans aide]
        itération | ‖δ‖
        1 | 9.013878e-01
        2 | 4.037345e-01
        3 | 1.352719e-01
        4 | 1.958212e-02
        5 | 4.283101e-04
        6 | 2.051027e-07
        7 | 4.965068e-14
        8 | 0.000000e+00
      question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
          ✔ La jacobienne en la solution est inversible (sinon l'ordre 2 serait perdu)   · La méthode est d'ordre 1, puisque ‖δ‖ₖ₊₁/‖δ‖ₖ tend vers 0 [n_order_simple_ratio]   · Newton converge quadratiquement quel que soit le point de départ   ✔ Newton converge quadratiquement pour ce point de départ
          pièges : n_order_simple_ratio
      pièges : n_order_simple_ratio
  pièges : a2_jacobian_transposed, n_newton_sys_sign

```

### Variantes d'examen

```
On applique Newton à F(x, y) = (x² + y² − 2 ; −x + 2y − 1) = (0 ; 0), à partir de x⁽⁰⁾ = (1 ; 0). Que vaut la jacobienne J(x⁽⁰⁾) ?
  ✔ [[2,0],[-1,2]]   · [[2,0],[1,-2]]   · [[2,-1],[0,2]] [a2_jacobian_transposed]   · [[1,0],[-1,2]]
  [examen mcq]
  pièges : a2_jacobian_transposed

Un pas de Newton pour F(x, y) = (x² − y + 3 ; 2x − 2y + 6) = (0 ; 0), à partir de x⁽⁰⁾ = (0 ; 2) (J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), x⁽¹⁾ = x⁽⁰⁾ − δ). Donne la première composante de x⁽¹⁾.
  [free, sans aide, examen coef]  x_1
    = 0

```

## Méthode de la sécante (`n-secant`, BA4)

_Newton sans dérivée : la pente de la corde des deux derniers points._

### Niveau 1

```
Méthode de la sécante pour f(x) = x² − 7, avec x⁽⁰⁾ = 2 et x⁽¹⁾ = 3 : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)·(x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾)/(f(x⁽ᵏ⁾) − f(x⁽ᵏ⁻¹⁾)). Calcule x⁽²⁾ et x⁽³⁾ (fractions exactes).
  [guided]  x_2
    (f(2) = −3, f(3) = 2.)
    = 3 − 2·(3 − 2)/(2 − (−3))   ← x − f(x)·(x − x_prec)/(f(x) − f(x_prec))
    = □   (trous : 13/5)   ← fraction irréductible
  — Le pas suivant, à partir de x⁽¹⁾ et x⁽²⁾ :  [juge value]  départ : x_3
    (f(3) = 2, f(13/5) = −6/25.)
    = 13/5 − (−6/25)·(13/5 − 3)/((−6/25) − 2)   ← x − f(x)·(x − x_prec)/(f(x) − f(x_prec))
    = □   (trous : 37/14)   ← fraction irréductible
  aides : C'est Newton avec f′ remplacée par la pente entre les deux derniers points. | pente = (f(3) − f(2))/(3 − 2) = □ | x⁽²⁾ = 13/5, x⁽³⁾ = 37/14.

Méthode de la sécante pour f(x) = x³ − 2, avec x⁽⁰⁾ = 1 et x⁽¹⁾ = 2 : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)·(x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾)/(f(x⁽ᵏ⁾) − f(x⁽ᵏ⁻¹⁾)). Calcule x⁽²⁾ et x⁽³⁾ (fractions exactes).
  [guided]  x_2
    (f(1) = −1, f(2) = 6.)
    = 2 − 6·(2 − 1)/(6 − (−1))   ← x − f(x)·(x − x_prec)/(f(x) − f(x_prec))
    = □   (trous : 8/7)   ← fraction irréductible
  — Le pas suivant, à partir de x⁽¹⁾ et x⁽²⁾ :  [juge value]  départ : x_3
    (f(2) = 6, f(8/7) = −174/343.)
    = 8/7 − (−174/343)·(8/7 − 2)/((−174/343) − 6)   ← x − f(x)·(x − x_prec)/(f(x) − f(x_prec))
    = □   (trous : 75/62)   ← fraction irréductible
  aides : C'est Newton avec f′ remplacée par la pente entre les deux derniers points. | pente = (f(2) − f(1))/(2 − 1) = □ | x⁽²⁾ = 8/7, x⁽³⁾ = 75/62.

Méthode de la sécante pour f(x) = x² − 3, avec x⁽⁰⁾ = 1 et x⁽¹⁾ = 2 : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)·(x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾)/(f(x⁽ᵏ⁾) − f(x⁽ᵏ⁻¹⁾)). Calcule x⁽²⁾ et x⁽³⁾ (fractions exactes).
  [guided]  x_2
    (f(1) = −2, f(2) = 1.)
    = 2 − 1·(2 − 1)/(1 − (−2))   ← x − f(x)·(x − x_prec)/(f(x) − f(x_prec))
    = □   (trous : 5/3)   ← fraction irréductible
  — Le pas suivant, à partir de x⁽¹⁾ et x⁽²⁾ :  [juge value]  départ : x_3
    (f(2) = 1, f(5/3) = −2/9.)
    = 5/3 − (−2/9)·(5/3 − 2)/((−2/9) − 1)   ← x − f(x)·(x − x_prec)/(f(x) − f(x_prec))
    = □   (trous : 19/11)   ← fraction irréductible
  aides : C'est Newton avec f′ remplacée par la pente entre les deux derniers points. | pente = (f(2) − f(1))/(2 − 1) = □ | x⁽²⁾ = 5/3, x⁽³⁾ = 19/11.

```

### Niveau 2

```
Méthode de la sécante pour f(x) = x² − 7, avec x⁽⁰⁾ = 2 et x⁽¹⁾ = 3. Remplis les itérés (fractions exactes, ou 8 chiffres significatifs) ; chaque ligne se calcule avec tes deux lignes d'avant.
  [tableau secant]  colonnes : x⁽ᵏ⁾ | δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾|
    k = 0    2  ·
    k = 1    3  (1)
    k = 2    (13/5)  (2/5)
    k = 3    (37/14)  (3/70)

Méthode de la sécante pour f(x) = x² − 3, avec x⁽⁰⁾ = 1 et x⁽¹⁾ = 2. Remplis les itérés (fractions exactes, ou 8 chiffres significatifs) ; chaque ligne se calcule avec tes deux lignes d'avant.
  [tableau secant]  colonnes : x⁽ᵏ⁾ | δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾|
    k = 0    1  ·
    k = 1    2  (1)
    k = 2    (5/3)  (1/3)
    k = 3    (19/11)  (2/33)

Méthode de la sécante pour f(x) = x² − 2, avec x⁽⁰⁾ = 1 et x⁽¹⁾ = 2. Remplis les itérés (fractions exactes, ou 8 chiffres significatifs) ; chaque ligne se calcule avec tes deux lignes d'avant.
  [tableau secant]  colonnes : x⁽ᵏ⁾ | δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾|
    k = 0    1  ·
    k = 1    2  (1)
    k = 2    (4/3)  (2/3)
    k = 3    (7/5)  (1/15)

```

### Niveau 3

```
Méthode de la sécante pour f(x) = x² − 5, avec x⁽⁰⁾ = 2 et x⁽¹⁾ = 3 : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)·(x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾)/(f(x⁽ᵏ⁾) − f(x⁽ᵏ⁻¹⁾)). Calcule x⁽²⁾ et x⁽³⁾ (fractions exactes). Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  x_2
    = 3 − 4·(3 − 2)/(4 − (−1))   ← x − f(x)·(x − x_prec)/(f(x) − f(x_prec))
    = 11/5   ← fraction irréductible
  — Le pas suivant, à partir de x⁽¹⁾ et x⁽²⁾ :  [juge value]  départ : x_3
    ? Avec quels deux points calcules-tu x⁽³⁾ ? ✔ x⁽¹⁾ et x⁽²⁾, les deux derniers / · x⁽⁰⁾ et x⁽²⁾ : on garde le point de départ
    = 11/5 − (−4/25)·(11/5 − 3)/((−4/25) − 4)   ← x − f(x)·(x − x_prec)/(f(x) − f(x_prec))
    = 29/13   ← fraction irréductible
  aides : C'est Newton avec f′ remplacée par la pente entre les deux derniers points. | pente = (f(3) − f(2))/(3 − 2) = □ | x⁽²⁾ = 11/5, x⁽³⁾ = 29/13.
  pièges : n_secant_update

Méthode de la sécante pour f(x) = x² − 2, avec x⁽⁰⁾ = 1 et x⁽¹⁾ = 2 : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)·(x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾)/(f(x⁽ᵏ⁾) − f(x⁽ᵏ⁻¹⁾)). Calcule x⁽²⁾ et x⁽³⁾ (fractions exactes). Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  x_2
    = 2 − 2·(2 − 1)/(2 − (−1))   ← x − f(x)·(x − x_prec)/(f(x) − f(x_prec))
    = 4/3   ← fraction irréductible
  — Le pas suivant, à partir de x⁽¹⁾ et x⁽²⁾ :  [juge value]  départ : x_3
    ? Avec quels deux points calcules-tu x⁽³⁾ ? ✔ x⁽¹⁾ et x⁽²⁾, les deux derniers / · x⁽⁰⁾ et x⁽²⁾ : on garde le point de départ
    = 4/3 − (−2/9)·(4/3 − 2)/((−2/9) − 2)   ← x − f(x)·(x − x_prec)/(f(x) − f(x_prec))
    = 7/5   ← fraction irréductible
  aides : C'est Newton avec f′ remplacée par la pente entre les deux derniers points. | pente = (f(2) − f(1))/(2 − 1) = □ | x⁽²⁾ = 4/3, x⁽³⁾ = 7/5.
  pièges : n_secant_update

Méthode de la sécante pour f(x) = x³ − 2, avec x⁽⁰⁾ = 1 et x⁽¹⁾ = 2 : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)·(x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾)/(f(x⁽ᵏ⁾) − f(x⁽ᵏ⁻¹⁾)). Calcule x⁽²⁾ et x⁽³⁾ (fractions exactes). Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  x_2
    = 2 − 6·(2 − 1)/(6 − (−1))   ← x − f(x)·(x − x_prec)/(f(x) − f(x_prec))
    = 8/7   ← fraction irréductible
  — Le pas suivant, à partir de x⁽¹⁾ et x⁽²⁾ :  [juge value]  départ : x_3
    ? Avec quels deux points calcules-tu x⁽³⁾ ? ✔ x⁽¹⁾ et x⁽²⁾, les deux derniers / · x⁽⁰⁾ et x⁽²⁾ : on garde le point de départ
    = 8/7 − (−174/343)·(8/7 − 2)/((−174/343) − 6)   ← x − f(x)·(x − x_prec)/(f(x) − f(x_prec))
    = 75/62   ← fraction irréductible
  aides : C'est Newton avec f′ remplacée par la pente entre les deux derniers points. | pente = (f(2) − f(1))/(2 − 1) = □ | x⁽²⁾ = 8/7, x⁽³⁾ = 75/62.
  pièges : n_secant_update

```

### Niveau 4

```
Méthode de la sécante pour f(x) = x² − 6, avec x⁽⁰⁾ = 2 et x⁽¹⁾ = 3. Remplis les itérés (fractions exactes, ou 8 chiffres significatifs) ; chaque ligne se calcule avec tes deux lignes d'avant.
  [tableau secant]  colonnes : x⁽ᵏ⁾ | δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾|
    k = 0    2  ·
    k = 1    3  (1)
    k = 2    (12/5)  (3/5)
    k = 3    (22/9)  (2/45)
    k = 4    (267/109)  (5/981)
  puis : Les incréments de la sécante : r₁ = δₖ/δₖ₋₁ tend vers 0 et r₂ = δₖ/δₖ₋₁² vers l'infini. Quel est son ordre ?
      · Ordre 1, puisque δₖ/δₖ₋₁ tend vers 0 [n_order_simple_ratio]   · Ordre 2, comme Newton   · Ordre 3   ✔ Strictement entre 1 et 2 (≈ 1,618)
      pièges : n_order_simple_ratio
  pièges : n_order_simple_ratio

Méthode de la sécante pour f(x) = x² − 6, avec x⁽⁰⁾ = 2 et x⁽¹⁾ = 3. Remplis les itérés (fractions exactes, ou 8 chiffres significatifs) ; chaque ligne se calcule avec tes deux lignes d'avant.
  [tableau secant]  colonnes : x⁽ᵏ⁾ | δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾|
    k = 0    2  ·
    k = 1    3  (1)
    k = 2    (12/5)  (3/5)
    k = 3    (22/9)  (2/45)
    k = 4    (267/109)  (5/981)
  puis : Les incréments de la sécante : r₁ = δₖ/δₖ₋₁ tend vers 0 et r₂ = δₖ/δₖ₋₁² vers l'infini. Quel est son ordre ?
      · Ordre 3   ✔ Strictement entre 1 et 2 (≈ 1,618)   · Ordre 2, comme Newton   · Ordre 1, puisque δₖ/δₖ₋₁ tend vers 0 [n_order_simple_ratio]
      pièges : n_order_simple_ratio
  pièges : n_order_simple_ratio

Méthode de la sécante pour f(x) = x² − 5, avec x⁽⁰⁾ = 2 et x⁽¹⁾ = 3. Remplis les itérés (fractions exactes, ou 8 chiffres significatifs) ; chaque ligne se calcule avec tes deux lignes d'avant.
  [tableau secant]  colonnes : x⁽ᵏ⁾ | δ = |x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾|
    k = 0    2  ·
    k = 1    3  (1)
    k = 2    (11/5)  (4/5)
    k = 3    (29/13)  (2/65)
    k = 4    (161/72)  (5/936)
  puis : Les incréments de la sécante : r₁ = δₖ/δₖ₋₁ tend vers 0 et r₂ = δₖ/δₖ₋₁² vers l'infini. Quel est son ordre ?
      · Ordre 3   ✔ Strictement entre 1 et 2 (≈ 1,618)   · Ordre 1, puisque δₖ/δₖ₋₁ tend vers 0 [n_order_simple_ratio]   · Ordre 2, comme Newton
      pièges : n_order_simple_ratio
  pièges : n_order_simple_ratio

```

### Niveau 5

```
Complète la méthode de la sécante : elle s'arrête quand |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| < tol et renvoie [x, nombre d'itérations].
  [code python, 3 trous, sans aide]
    | def secant(f, x0, x1, tol, nmax):
    |     for k in range(nmax):
    |         x2 = ⟦x1 - f(x1) * (x1 - x0) / (f(x1) - f(x0))⟧
    |         if abs(x2 - x1) < tol:
    |             return [x2, k + 1]
    |         x0 = ⟦x1⟧
    |         x1 = ⟦x2⟧
    |     return [x1, nmax]
    test : def f(x): return x*x - 2 ; secant(f, 1.0, 2.0, 1e-12, 50) → [1.4142135623730951, 7]
    test : def f(x): return x**3 - 5 ; secant(f, 1.0, 2.0, 1e-12, 50)[0] → 1.7099759466766968
  puis : Le programme, appelé pour f(x) = x² − 5, x⁽⁰⁾ = 2 et x⁽¹⁾ = 3, affiche les incréments |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| :
      [tableau à lire, sans aide]
        k | δₖ
        1 | 8.000e-01
        2 | 3.077e-02
        3 | 5.342e-03
        4 | 4.318e-05
        5 | 5.117e-08
        6 | 4.934e-13
      question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
          · La méthode est d'ordre 2   ✔ L'ordre est strictement entre 1 et 2   ✔ δₖ/δₖ₋₁ tend vers 0   · La méthode est d'ordre 1, puisque δₖ/δₖ₋₁ tend vers 0 [n_order_simple_ratio]
          pièges : n_order_simple_ratio
      pièges : n_order_simple_ratio
  pièges : n_secant_update

Complète la méthode de la sécante : elle s'arrête quand |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| < tol et renvoie [x, nombre d'itérations].
  [code python, 3 trous, sans aide]
    | def secant(f, x0, x1, tol, nmax):
    |     for k in range(nmax):
    |         x2 = ⟦x1 - f(x1) * (x1 - x0) / (f(x1) - f(x0))⟧
    |         if abs(x2 - x1) < tol:
    |             return [x2, k + 1]
    |         x0 = ⟦x1⟧
    |         x1 = ⟦x2⟧
    |     return [x1, nmax]
    test : def f(x): return x*x - 2 ; secant(f, 1.0, 2.0, 1e-12, 50) → [1.4142135623730951, 7]
    test : def f(x): return x**3 - 5 ; secant(f, 1.0, 2.0, 1e-12, 50)[0] → 1.7099759466766968
  puis : Le programme, appelé pour f(x) = x² − 6, x⁽⁰⁾ = 2 et x⁽¹⁾ = 3, affiche les incréments |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| :
      [tableau à lire, sans aide]
        k | δₖ
        1 | 6.000e-01
        2 | 4.444e-02
        3 | 5.097e-03
        4 | 5.159e-05
        5 | 5.313e-08
        6 | 5.591e-13
      question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
          ✔ L'ordre est strictement entre 1 et 2   · La méthode est d'ordre 1, puisque δₖ/δₖ₋₁ tend vers 0 [n_order_simple_ratio]   · La méthode est d'ordre 2   ✔ δₖ/δₖ₋₁ tend vers 0
          pièges : n_order_simple_ratio
      pièges : n_order_simple_ratio
  pièges : n_secant_update

Complète la méthode de la sécante : elle s'arrête quand |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| < tol et renvoie [x, nombre d'itérations].
  [code python, 3 trous, sans aide]
    | def secant(f, x0, x1, tol, nmax):
    |     for k in range(nmax):
    |         x2 = ⟦x1 - f(x1) * (x1 - x0) / (f(x1) - f(x0))⟧
    |         if abs(x2 - x1) < tol:
    |             return [x2, k + 1]
    |         x0 = ⟦x1⟧
    |         x1 = ⟦x2⟧
    |     return [x1, nmax]
    test : def f(x): return x*x - 2 ; secant(f, 1.0, 2.0, 1e-12, 50) → [1.4142135623730951, 7]
    test : def f(x): return x**3 - 5 ; secant(f, 1.0, 2.0, 1e-12, 50)[0] → 1.7099759466766968
  puis : Le programme, appelé pour f(x) = x² − 2, x⁽⁰⁾ = 1 et x⁽¹⁾ = 2, affiche les incréments |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| :
      [tableau à lire, sans aide]
        k | δₖ
        1 | 6.667e-01
        2 | 6.667e-02
        3 | 1.463e-02
        4 | 4.227e-04
        5 | 2.124e-06
        6 | 3.158e-10
        7 | 2.220e-16
      question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
          ✔ L'ordre est strictement entre 1 et 2   ✔ δₖ/δₖ₋₁ tend vers 0   · La méthode est d'ordre 2   · La méthode est d'ordre 1, puisque δₖ/δₖ₋₁ tend vers 0 [n_order_simple_ratio]
          pièges : n_order_simple_ratio
      pièges : n_order_simple_ratio
  pièges : n_secant_update

```

### Variantes d'examen

```
Vrai ou faux ? La méthode de la sécante est d'ordre 2, comme Newton.
  · Vrai   ✔ Faux
  [examen tf]

```

## Interpolation : Vandermonde et Lagrange à la main (`n-interp-lagrange`, BA4)

_Le polynôme qui passe par n + 1 points : par un système, ou par les φᵢ de Lagrange._

### Niveau 1

```
Le polynôme p(x) = a₀ + a₁x + a₂x² passe par (−1 ; 12), (0 ; 0), (1 ; −6). Système de Vandermonde : a₀ − a₁ + a₂ = 12 ; a₀ = 0 ; a₀ + a₁ + a₂ = −6. Trouve a₂, a₁, a₀, puis p(−1/2).
  [guided]  a_2
    (Le coefficient a₂.)
    = □   (trous : 3)   ← Par élimination dans le système
  — Le coefficient a₁.  [juge value]  départ : a_1
    = □   (trous : −9)   ← En remontant le système
  — Le coefficient a₀.  [juge value]  départ : a_0
    = □   (trous : 0)   ← En remontant le système
  — p(−1/2) = a₀ + a₁·x* + a₂·x*².  [juge value]  départ : 0 + (−9)·(−1/2) + 3·(−1/2)²
    = □   (trous : 21/4)   ← Fraction irréductible
  aides : Soustrais les équations deux à deux : a₀ disparaît, puis a₁. | a₂ = (y₂ − 2y₁ + y₀)/2 = (−6 − 2·0 + 12)/□ | a₂ = 3, a₁ = −9, a₀ = 0 ; p = −9x + 3x².
  pièges : n_vandermonde_order

Le polynôme p(x) = a₀ + a₁x + a₂x² passe par (0 ; 3), (1 ; 5), (2 ; 9). Système de Vandermonde : a₀ = 3 ; a₀ + a₁ + a₂ = 5 ; a₀ + 2a₁ + 4a₂ = 9. Trouve a₂, a₁, a₀, puis p(3/2).
  [guided]  a_2
    (Le coefficient a₂.)
    = □   (trous : 1)   ← Par élimination dans le système
  — Le coefficient a₁.  [juge value]  départ : a_1
    = □   (trous : 1)   ← En remontant le système
  — Le coefficient a₀.  [juge value]  départ : a_0
    = □   (trous : 3)   ← En remontant le système
  — p(3/2) = a₀ + a₁·x* + a₂·x*².  [juge value]  départ : 3 + 1·(3/2) + 1·(3/2)²
    = □   (trous : 27/4)   ← Fraction irréductible
  aides : Soustrais les équations deux à deux : a₀ disparaît, puis a₁. | a₂ = (y₂ − 2y₁ + y₀)/2 = (9 − 2·5 + 3)/□ | a₂ = 1, a₁ = 1, a₀ = 3 ; p = 3 + x + x².
  pièges : n_vandermonde_order

Le polynôme p(x) = a₀ + a₁x + a₂x² passe par (0 ; −8), (1 ; −14), (2 ; −12). Système de Vandermonde : a₀ = −8 ; a₀ + a₁ + a₂ = −14 ; a₀ + 2a₁ + 4a₂ = −12. Trouve a₂, a₁, a₀, puis p(3/2).
  [guided]  a_2
    (Le coefficient a₂.)
    = □   (trous : 4)   ← Par élimination dans le système
  — Le coefficient a₁.  [juge value]  départ : a_1
    = □   (trous : −10)   ← En remontant le système
  — Le coefficient a₀.  [juge value]  départ : a_0
    = □   (trous : −8)   ← En remontant le système
  — p(3/2) = a₀ + a₁·x* + a₂·x*².  [juge value]  départ : (−8) + (−10)·(3/2) + 4·(3/2)²
    = □   (trous : −14)   ← Fraction irréductible
  aides : Soustrais les équations deux à deux : a₀ disparaît, puis a₁. | a₂ = (y₂ − 2y₁ + y₀)/2 = (−12 − 2·(-14) + (-8))/□ | a₂ = 4, a₁ = −10, a₀ = −8 ; p = −8 − 10x + 4x².
  pièges : n_vandermonde_order

```

### Niveau 2

```
Points (0 ; −10), (1 ; −18), (2 ; −32). Calcule p(1/2), où p est le polynôme d'interpolation de degré ≤ 2.
  [guided]  (1/2 − 1)(1/2 − 2)/((0 − 1)(0 − 2))
    ? On ne veut que p(1/2). Quelle méthode ? ✔ Lagrange : p(x*) = Σ yᵢ·φᵢ(x*) / ✔ Vandermonde : résoudre le système, puis évaluer
    (φ₀(1/2) = Π (x* − xⱼ)/(x₀ − xⱼ).)
    = □   (trous : 3/8)   ← Numérateur 3/4, dénominateur 2
  — φ₁(1/2) = Π (x* − xⱼ)/(x₁ − xⱼ).  [juge value]  départ : (1/2 − 0)(1/2 − 2)/((1 − 0)(1 − 2))
    = □   (trous : 3/4)   ← Numérateur −3/4, dénominateur −1
  — φ₂(1/2) = Π (x* − xⱼ)/(x₂ − xⱼ).  [juge value]  départ : (1/2 − 0)(1/2 − 1)/((2 − 0)(2 − 1))
    = □   (trous : −1/8)   ← Numérateur −1/4, dénominateur 2
  — p(1/2) = Σ yᵢ·φᵢ(1/2).  [juge value]  départ : (−10)·3/8 + (−18)·3/4 + (−32)·(−1/8)
    = □   (trous : −53/4)   ← p = Σ yᵢφᵢ
  aides : φᵢ vaut 1 en xᵢ et 0 aux autres nœuds : un produit de (x − xⱼ), divisé par sa valeur en xᵢ. | φ₀(x*) = (1/2-1)(1/2-2)/(□) | φ(x*) = 3/8 ; 3/4 ; −1/8, p(x*) = −53/4.
  pièges : n_lagrange_no_denominator

Points (0 ; −9), (1 ; −11), (2 ; −9). Calcule p(3/2), où p est le polynôme d'interpolation de degré ≤ 2.
  [guided]  (3/2 − 1)(3/2 − 2)/((0 − 1)(0 − 2))
    ? On ne veut que p(3/2). Quelle méthode ? ✔ Lagrange : p(x*) = Σ yᵢ·φᵢ(x*) / ✔ Vandermonde : résoudre le système, puis évaluer
    (φ₀(3/2) = Π (x* − xⱼ)/(x₀ − xⱼ).)
    = □   (trous : −1/8)   ← Numérateur −1/4, dénominateur 2
  — φ₁(3/2) = Π (x* − xⱼ)/(x₁ − xⱼ).  [juge value]  départ : (3/2 − 0)(3/2 − 2)/((1 − 0)(1 − 2))
    = □   (trous : 3/4)   ← Numérateur −3/4, dénominateur −1
  — φ₂(3/2) = Π (x* − xⱼ)/(x₂ − xⱼ).  [juge value]  départ : (3/2 − 0)(3/2 − 1)/((2 − 0)(2 − 1))
    = □   (trous : 3/8)   ← Numérateur 3/4, dénominateur 2
  — p(3/2) = Σ yᵢ·φᵢ(3/2).  [juge value]  départ : (−9)·(−1/8) + (−11)·3/4 + (−9)·3/8
    = □   (trous : −21/2)   ← p = Σ yᵢφᵢ
  aides : φᵢ vaut 1 en xᵢ et 0 aux autres nœuds : un produit de (x − xⱼ), divisé par sa valeur en xᵢ. | φ₀(x*) = (3/2-1)(3/2-2)/(□) | φ(x*) = −1/8 ; 3/4 ; 3/8, p(x*) = −21/2.
  pièges : n_lagrange_no_denominator

Points (0 ; 12), (1 ; 16), (2 ; 28). Calcule p(3/2), où p est le polynôme d'interpolation de degré ≤ 2.
  [guided]  (3/2 − 1)(3/2 − 2)/((0 − 1)(0 − 2))
    ? On ne veut que p(3/2). Quelle méthode ? ✔ Lagrange : p(x*) = Σ yᵢ·φᵢ(x*) / ✔ Vandermonde : résoudre le système, puis évaluer
    (φ₀(3/2) = Π (x* − xⱼ)/(x₀ − xⱼ).)
    = □   (trous : −1/8)   ← Numérateur −1/4, dénominateur 2
  — φ₁(3/2) = Π (x* − xⱼ)/(x₁ − xⱼ).  [juge value]  départ : (3/2 − 0)(3/2 − 2)/((1 − 0)(1 − 2))
    = □   (trous : 3/4)   ← Numérateur −3/4, dénominateur −1
  — φ₂(3/2) = Π (x* − xⱼ)/(x₂ − xⱼ).  [juge value]  départ : (3/2 − 0)(3/2 − 1)/((2 − 0)(2 − 1))
    = □   (trous : 3/8)   ← Numérateur 3/4, dénominateur 2
  — p(3/2) = Σ yᵢ·φᵢ(3/2).  [juge value]  départ : 12·(−1/8) + 16·3/4 + 28·3/8
    = □   (trous : 21)   ← p = Σ yᵢφᵢ
  aides : φᵢ vaut 1 en xᵢ et 0 aux autres nœuds : un produit de (x − xⱼ), divisé par sa valeur en xᵢ. | φ₀(x*) = (3/2-1)(3/2-2)/(□) | φ(x*) = −1/8 ; 3/4 ; 3/8, p(x*) = 21.
  pièges : n_lagrange_no_denominator

```

### Niveau 3

```
Points (−1 ; 8), (1 ; 2), (3 ; −36). Calcule p(5/2) par la formule de Lagrange. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  (5/2 − 1)(5/2 − 3)/(((−1) − 1)((−1) − 3))
    ? Quelle est la fonction de base φ₁ ? ✔ φ₁(x) = (x − −1)(x − 3)/((1 − −1)(1 − 3)) / · φ₁(x) = (x − −1)(x − 3) / · φ₁(x) = (x − 1)/(−1 − 1)
    (φ₀(5/2) = Π (x* − xⱼ)/(x₀ − xⱼ).)
    = −3/32   ← Numérateur −3/4, dénominateur 8
  — φ₁(5/2) = Π (x* − xⱼ)/(x₁ − xⱼ).  [juge value]  départ : (5/2 − (−1))(5/2 − 3)/((1 − (−1))(1 − 3))
    = 7/16   ← Numérateur −7/4, dénominateur −4
  — φ₂(5/2) = Π (x* − xⱼ)/(x₂ − xⱼ).  [juge value]  départ : (5/2 − (−1))(5/2 − 1)/((3 − (−1))(3 − 1))
    = 21/32   ← Numérateur 21/4, dénominateur 8
  — p(5/2) = Σ yᵢ·φᵢ(5/2).  [juge value]  départ : 8·(−3/32) + 2·7/16 + (−36)·21/32
    = −47/2   ← p = Σ yᵢφᵢ
  aides : φᵢ(x*) = Π (x* − xⱼ)/(xᵢ − xⱼ), le produit sur les j ≠ i. | φ₁(x*) = (5/2-(-1))(5/2-3)/(□) | φ₁(x*) = 7/16 ; p(x*) = −47/2.
  pièges : n_lagrange_no_denominator

Points (0 ; 6), (1 ; 13), (3 ; 9). Calcule p(5/2) par la formule de Lagrange. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  (5/2 − 1)(5/2 − 3)/((0 − 1)(0 − 3))
    ? Quelle est la fonction de base φ₁ ? ✔ φ₁(x) = (x − 0)(x − 3)/((1 − 0)(1 − 3)) / · φ₁(x) = (x − 0)(x − 3) / · φ₁(x) = (x − 1)/(0 − 1)
    (φ₀(5/2) = Π (x* − xⱼ)/(x₀ − xⱼ).)
    = −1/4   ← Numérateur −3/4, dénominateur 3
  — φ₁(5/2) = Π (x* − xⱼ)/(x₁ − xⱼ).  [juge value]  départ : (5/2 − 0)(5/2 − 3)/((1 − 0)(1 − 3))
    = 5/8   ← Numérateur −5/4, dénominateur −2
  — φ₂(5/2) = Π (x* − xⱼ)/(x₂ − xⱼ).  [juge value]  départ : (5/2 − 0)(5/2 − 1)/((3 − 0)(3 − 1))
    = 5/8   ← Numérateur 15/4, dénominateur 6
  — p(5/2) = Σ yᵢ·φᵢ(5/2).  [juge value]  départ : 6·(−1/4) + 13·5/8 + 9·5/8
    = 49/4   ← p = Σ yᵢφᵢ
  aides : φᵢ(x*) = Π (x* − xⱼ)/(xᵢ − xⱼ), le produit sur les j ≠ i. | φ₁(x*) = (5/2-0)(5/2-3)/(□) | φ₁(x*) = 5/8 ; p(x*) = 49/4.
  pièges : n_lagrange_no_denominator

Points (−2 ; 13), (−1 ; 6), (0 ; 7). Calcule p(−3/2) par la formule de Lagrange. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  ((−3/2) − (−1))((−3/2) − 0)/(((−2) − (−1))((−2) − 0))
    ? Quelle est la fonction de base φ₁ ? ✔ φ₁(x) = (x − −2)(x − 0)/((−1 − −2)(−1 − 0)) / · φ₁(x) = (x − −2)(x − 0) / · φ₁(x) = (x − −1)/(−2 − −1)
    (φ₀(−3/2) = Π (x* − xⱼ)/(x₀ − xⱼ).)
    = 3/8   ← Numérateur 3/4, dénominateur 2
  — φ₁(−3/2) = Π (x* − xⱼ)/(x₁ − xⱼ).  [juge value]  départ : ((−3/2) − (−2))((−3/2) − 0)/(((−1) − (−2))((−1) − 0))
    = 3/4   ← Numérateur −3/4, dénominateur −1
  — φ₂(−3/2) = Π (x* − xⱼ)/(x₂ − xⱼ).  [juge value]  départ : ((−3/2) − (−2))((−3/2) − (−1))/((0 − (−2))(0 − (−1)))
    = −1/8   ← Numérateur −1/4, dénominateur 2
  — p(−3/2) = Σ yᵢ·φᵢ(−3/2).  [juge value]  départ : 13·3/8 + 6·3/4 + 7·(−1/8)
    = 17/2   ← p = Σ yᵢφᵢ
  aides : φᵢ(x*) = Π (x* − xⱼ)/(xᵢ − xⱼ), le produit sur les j ≠ i. | φ₁(x*) = ((-3/2)-(-2))((-3/2)-0)/(□) | φ₁(x*) = 3/4 ; p(x*) = 17/2.
  pièges : n_lagrange_no_denominator

```

### Niveau 4

```
Points (0 ; 1), (2 ; −27), (3 ; −47). Système de Vandermonde : a₀ = 1 ; a₀ + 2a₁ + 4a₂ = −27 ; a₀ + 3a₁ + 9a₂ = −47. Trouve p(x) = a₀ + a₁x + a₂x², vérifie-le en développant la forme de Lagrange, puis calcule p(5/2).
  [free, suivre l'erreur]  a_2
    (Le coefficient a₂.)
    = −2   ← Par élimination dans le système
  — Le coefficient a₁.  [juge value]  départ : a_1
    = −10   ← En remontant le système
  — Le coefficient a₀.  [juge value]  départ : a_0
    = 1   ← En remontant le système
  — La forme de Lagrange, développée : on doit retrouver le même p.  [juge equiv]  départ : 1·(x − 2)(x − 3)/6 + (−27)·(x − 0)(x − 3)/(−2) + (−47)·(x − 0)(x − 2)/3
    = 1 − 10x − 2x²   ← Le même polynôme
  — p(5/2) = a₀ + a₁·x* + a₂·x*².  [juge value]  départ : 1 + (−10)·(5/2) + (−2)·(5/2)²
    = −73/2   ← Fraction irréductible
  aides : Élimine a₀ en soustrayant les équations, puis a₁. | a₂ = □ ; p(x) = a₀ + a₁x + a₂x² | p(x) = 1 − 10x − 2x², p(5/2) = −73/2.
  pièges : n_vandermonde_order

Points (1 ; 12), (2 ; 8), (3 ; −2). Système de Vandermonde : a₀ + a₁ + a₂ = 12 ; a₀ + 2a₁ + 4a₂ = 8 ; a₀ + 3a₁ + 9a₂ = −2. Trouve p(x) = a₀ + a₁x + a₂x², vérifie-le en développant la forme de Lagrange, puis calcule p(5/2).
  [free, suivre l'erreur]  a_2
    (Le coefficient a₂.)
    = −3   ← Par élimination dans le système
  — Le coefficient a₁.  [juge value]  départ : a_1
    = 5   ← En remontant le système
  — Le coefficient a₀.  [juge value]  départ : a_0
    = 10   ← En remontant le système
  — La forme de Lagrange, développée : on doit retrouver le même p.  [juge equiv]  départ : 12·(x − 2)(x − 3)/2 + 8·(x − 1)(x − 3)/(−1) + (−2)·(x − 1)(x − 2)/2
    = 10 + 5x − 3x²   ← Le même polynôme
  — p(5/2) = a₀ + a₁·x* + a₂·x*².  [juge value]  départ : 10 + 5·(5/2) + (−3)·(5/2)²
    = 15/4   ← Fraction irréductible
  aides : Élimine a₀ en soustrayant les équations, puis a₁. | a₂ = □ ; p(x) = a₀ + a₁x + a₂x² | p(x) = 10 + 5x − 3x², p(5/2) = 15/4.
  pièges : n_vandermonde_order

Points (−2 ; 12), (0 ; 8), (1 ; 15). Système de Vandermonde : a₀ − 2a₁ + 4a₂ = 12 ; a₀ = 8 ; a₀ + a₁ + a₂ = 15. Trouve p(x) = a₀ + a₁x + a₂x², vérifie-le en développant la forme de Lagrange, puis calcule p(−3/2).
  [free, suivre l'erreur]  a_2
    (Le coefficient a₂.)
    = 3   ← Par élimination dans le système
  — Le coefficient a₁.  [juge value]  départ : a_1
    = 4   ← En remontant le système
  — Le coefficient a₀.  [juge value]  départ : a_0
    = 8   ← En remontant le système
  — La forme de Lagrange, développée : on doit retrouver le même p.  [juge equiv]  départ : 12·(x − 0)(x − 1)/6 + 8·(x − (−2))(x − 1)/(−2) + 15·(x − (−2))(x − 0)/3
    = 8 + 4x + 3x²   ← Le même polynôme
  — p(−3/2) = a₀ + a₁·x* + a₂·x*².  [juge value]  départ : 8 + 4·(−3/2) + 3·(−3/2)²
    = 35/4   ← Fraction irréductible
  aides : Élimine a₀ en soustrayant les équations, puis a₁. | a₂ = □ ; p(x) = a₀ + a₁x + a₂x² | p(x) = 8 + 4x + 3x², p(−3/2) = 35/4.
  pièges : n_vandermonde_order

```

### Niveau 5

```
Complète la fonction qui évalue en x le polynôme d'interpolation des points (xs[i] ; ys[i]) par la formule de Lagrange.
  [code python, 2 trous, sans aide]
    | def lagrange_eval(xs, ys, x):
    |     n = len(xs)
    |     p = 0.0
    |     for i in range(n):
    |         phi = 1.0
    |         for j in range(n):
    |             if j != i:
    |                 phi = phi * ⟦(x - xs[j]) / (xs[i] - xs[j])⟧
    |         p = p + ⟦ys[i] * phi⟧
    |     return p
    test : lagrange_eval([0, 1, 2], [12, 18, 6], 0.5) → 17.25
    test : lagrange_eval([0, 1, 2, 3], [1, 2, 5, 10], 1.5) → 3.25
    test : lagrange_eval([-1, 0, 1], [1, 0, 1], 0.5) → 0.25
  puis : Le programme complet affiche :
      [tableau à lire, sans aide]
        t | lagrange_eval([-2, -1, 1], [-20, -7, 7], t)
        -2 | -2.000000e+01
        -1 | -7.000000e+00
        1 | 7.000000e+00
        -0,5 | -2.000000e+00
      question : Que lit-on dans ce tableau ? (le polynôme d'interpolation est p(x) = 2 + 7x − 2x²) Une ou plusieurs réponses justes.
          ✔ Aux nœuds, le programme redonne les yᵢ : p interpole les données   · p(−1/2) = Σ yᵢ·Π(x* − xⱼ) = 36 [n_lagrange_no_denominator]   ✔ p(−1/2) = −2   · Le programme calcule les coefficients a₀, a₁, a₂
          pièges : n_lagrange_no_denominator
      pièges : n_lagrange_no_denominator
  pièges : n_lagrange_no_denominator

Complète la fonction qui évalue en x le polynôme d'interpolation des points (xs[i] ; ys[i]) par la formule de Lagrange.
  [code python, 2 trous, sans aide]
    | def lagrange_eval(xs, ys, x):
    |     n = len(xs)
    |     p = 0.0
    |     for i in range(n):
    |         phi = 1.0
    |         for j in range(n):
    |             if j != i:
    |                 phi = phi * ⟦(x - xs[j]) / (xs[i] - xs[j])⟧
    |         p = p + ⟦ys[i] * phi⟧
    |     return p
    test : lagrange_eval([0, 1, 2], [12, 18, 6], 0.5) → 17.25
    test : lagrange_eval([0, 1, 2, 3], [1, 2, 5, 10], 1.5) → 3.25
    test : lagrange_eval([-1, 0, 1], [1, 0, 1], 0.5) → 0.25
  puis : Le programme complet affiche :
      [tableau à lire, sans aide]
        t | lagrange_eval([-1, 1, 2], [1, -19, -23], t)
        -1 | 1.000000e+00
        1 | -1.900000e+01
        2 | -2.300000e+01
        -0,5 | -5.500000e+00
      question : Que lit-on dans ce tableau ? (le polynôme d'interpolation est p(x) = −11 − 10x + 2x²) Une ou plusieurs réponses justes.
          ✔ p(−1/2) = −11/2   · p(−1/2) = Σ yᵢ·Π(x* − xⱼ) = 179/4 [n_lagrange_no_denominator]   · Le programme calcule les coefficients a₀, a₁, a₂   ✔ Aux nœuds, le programme redonne les yᵢ : p interpole les données
          pièges : n_lagrange_no_denominator
      pièges : n_lagrange_no_denominator
  pièges : n_lagrange_no_denominator

Complète la fonction qui évalue en x le polynôme d'interpolation des points (xs[i] ; ys[i]) par la formule de Lagrange.
  [code python, 2 trous, sans aide]
    | def lagrange_eval(xs, ys, x):
    |     n = len(xs)
    |     p = 0.0
    |     for i in range(n):
    |         phi = 1.0
    |         for j in range(n):
    |             if j != i:
    |                 phi = phi * ⟦(x - xs[j]) / (xs[i] - xs[j])⟧
    |         p = p + ⟦ys[i] * phi⟧
    |     return p
    test : lagrange_eval([0, 1, 2], [12, 18, 6], 0.5) → 17.25
    test : lagrange_eval([0, 1, 2, 3], [1, 2, 5, 10], 1.5) → 3.25
    test : lagrange_eval([-1, 0, 1], [1, 0, 1], 0.5) → 0.25
  puis : Le programme complet affiche :
      [tableau à lire, sans aide]
        t | lagrange_eval([-2, 1, 2], [-13, 17, 19], t)
        -2 | -1.300000e+01
        1 | 1.700000e+01
        2 | 1.900000e+01
        0,5 | 1.450000e+01
      question : Que lit-on dans ce tableau ? (le polynôme d'interpolation est p(x) = 11 + 8x − 2x²) Une ou plusieurs réponses justes.
          ✔ Aux nœuds, le programme redonne les yᵢ : p interpole les données   · p(1/2) = Σ yᵢ·Π(x* − xⱼ) = −389/4 [n_lagrange_no_denominator]   · Le programme calcule les coefficients a₀, a₁, a₂   ✔ p(1/2) = 29/2
          pièges : n_lagrange_no_denominator
      pièges : n_lagrange_no_denominator
  pièges : n_lagrange_no_denominator

```

### Variantes d'examen

```
Nœuds x₀ = −1, x₁ = 0, x₂ = 2. Que vaut la fonction de base de Lagrange φ₁ en 3/2 ?
  · −1/4   · −5/8   ✔ 5/8   · −5/4 [n_lagrange_no_denominator]
  [examen mcq]
  pièges : n_lagrange_no_denominator

Vrai ou faux ?
  « Par 4 points d'abscisses distinctes passe un unique polynôme de degré 3. » → FAUX
    contre-exemple (num) : pts = (0 ; 0), (1 ; 1), (2 ; 2), (3 ; 3)
  [examen tf]

p(x) = a₀ + a₁x + a₂x² passe par (−1 ; 0), (2 ; −12), (3 ; −24). Donne le coefficient de x² de p.
  [free, sans aide, examen coef]  a_2
    = −2   ← p(x) = −2x − 2x²
  pièges : n_vandermonde_order

```

## Erreur d'interpolation ; phénomène de Runge (`n-interp-error`, BA4)

_Majorer f − Πₙf avec f⁽ⁿ⁺¹⁾ et hⁿ⁺¹ ; savoir que plus de nœuds équirépartis peut aggraver l'erreur._

### Niveau 1

```
On interpole f(x) = sin x sur [0 ; π/2] en n + 1 = 2 nœuds équirépartis. Majore l'erreur : max|f − Πₙf| ≤ max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹. On donne f⁽²⁾(x) = −sin x.
  [guided]  M
    (Le maximum de |f⁽²⁾| sur [0 ; π/2].)
    = □   (trous : 1)   ← |−sin x| ≤ 1, atteint sur l'intervalle
  — Le pas : h = (b − a)/n avec n = 1.  [juge value]  départ : h
    = □   (trous : π/2)   ← [0 ; π/2] en 1 sous-intervalle
  — La borne max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.  [juge value]  départ : (1)/(4·2)·(π/2)²
    = □   (trous : π²/32)   ← ≈ 0,308
  aides : La borne fait intervenir la dérivée d'ordre n + 1 et hⁿ⁺¹ : max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹. | borne = (1)/(4·□)·(π/2)² | borne = π²/32 ≈ 0,308.
  pièges : n_interp_error_factorial

On interpole f(x) = 1/(1 + x) sur [0 ; 2] en n + 1 = 4 nœuds équirépartis. Majore l'erreur : max|f − Πₙf| ≤ max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹. On donne f⁽⁴⁾(x) = 24/(1+x)⁵.
  [guided]  M
    (Le maximum de |f⁽⁴⁾| sur [0 ; 2].)
    = □   (trous : 24)   ← |f⁽⁴⁾(x)| = 24/(1 + x)⁵ décroît : maximum en x = 0
  — Le pas : h = (b − a)/n avec n = 3.  [juge value]  départ : h
    = □   (trous : 2/3)   ← [0 ; 2] en 3 sous-intervalles
  — La borne max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.  [juge value]  départ : (24)/(4·4)·(2/3)⁴
    = □   (trous : 8/27)   ← ≈ 0,296
  aides : La borne fait intervenir la dérivée d'ordre n + 1 et hⁿ⁺¹ : max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹. | borne = (24)/(4·□)·(2/3)⁴ | borne = 8/27 ≈ 0,296.
  pièges : n_interp_error_factorial

On interpole f(x) = ln(1 + x) sur [0 ; 2] en n + 1 = 3 nœuds équirépartis. Majore l'erreur : max|f − Πₙf| ≤ max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹. On donne f⁽³⁾(x) = 2/(1+x)³.
  [guided]  M
    (Le maximum de |f⁽³⁾| sur [0 ; 2].)
    = □   (trous : 2)   ← |f⁽³⁾(x)| = 2/(1 + x)³ décroît : maximum en x = 0
  — Le pas : h = (b − a)/n avec n = 2.  [juge value]  départ : h
    = □   (trous : 1)   ← [0 ; 2] en 2 sous-intervalles
  — La borne max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.  [juge value]  départ : (2)/(4·3)·(1)³
    = □   (trous : 1/6)   ← ≈ 0,167
  aides : La borne fait intervenir la dérivée d'ordre n + 1 et hⁿ⁺¹ : max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹. | borne = (2)/(4·□)·(1)³ | borne = 1/6 ≈ 0,167.
  pièges : n_interp_error_factorial

```

### Niveau 2

```
On interpole f(x) = cos x sur [0 ; π/2] en n + 1 = 4 nœuds équirépartis. Majore l'erreur : max|f − Πₙf| ≤ max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.
  [guided]  (cos(x))′′′′
    (La dérivée d'ordre n + 1 = 4 de f(x) = cos x.)
    = □   (trous : cos(x))   ← Dériver n + 1 fois
  — Le maximum de |f⁽⁴⁾| sur [0 ; π/2].  [juge value]  départ : M
    = □   (trous : 1)   ← |cos x| ≤ 1, atteint sur l'intervalle
  — Le pas : h = (b − a)/n avec n = 3.  [juge value]  départ : h
    = □   (trous : π/6)   ← [0 ; π/2] en 3 sous-intervalles
  — La borne max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.  [juge value]  départ : (1)/(4·4)·(π/6)⁴
    = □   (trous : π⁴/20736)   ← ≈ 0,0047
  aides : La borne fait intervenir la dérivée d'ordre n + 1 et hⁿ⁺¹ : max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹. | borne = (1)/(4·□)·(π/6)⁴ | borne = π⁴/20736 ≈ 0,0047.
  pièges : n_interp_error_factorial

On interpole f(x) = ln(1 + x) sur [0 ; 2] en n + 1 = 4 nœuds équirépartis. Majore l'erreur : max|f − Πₙf| ≤ max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.
  [guided]  (ln(1 + x))′′′′
    (La dérivée d'ordre n + 1 = 4 de f(x) = ln(1 + x).)
    = □   (trous : −6/(1 + x)⁴)   ← Dériver n + 1 fois
  — Le maximum de |f⁽⁴⁾| sur [0 ; 2].  [juge value]  départ : M
    = □   (trous : 6)   ← |f⁽⁴⁾(x)| = 6/(1 + x)⁴ décroît : maximum en x = 0
  — Le pas : h = (b − a)/n avec n = 3.  [juge value]  départ : h
    = □   (trous : 2/3)   ← [0 ; 2] en 3 sous-intervalles
  — La borne max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.  [juge value]  départ : (6)/(4·4)·(2/3)⁴
    = □   (trous : 2/27)   ← ≈ 0,0741
  aides : La borne fait intervenir la dérivée d'ordre n + 1 et hⁿ⁺¹ : max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹. | borne = (6)/(4·□)·(2/3)⁴ | borne = 2/27 ≈ 0,0741.
  pièges : n_interp_error_factorial

On interpole f(x) = ln(1 + x) sur [0 ; 2] en n + 1 = 3 nœuds équirépartis. Majore l'erreur : max|f − Πₙf| ≤ max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.
  [guided]  (ln(1 + x))′′′
    (La dérivée d'ordre n + 1 = 3 de f(x) = ln(1 + x).)
    = □   (trous : 2/(1 + x)³)   ← Dériver n + 1 fois
  — Le maximum de |f⁽³⁾| sur [0 ; 2].  [juge value]  départ : M
    = □   (trous : 2)   ← |f⁽³⁾(x)| = 2/(1 + x)³ décroît : maximum en x = 0
  — Le pas : h = (b − a)/n avec n = 2.  [juge value]  départ : h
    = □   (trous : 1)   ← [0 ; 2] en 2 sous-intervalles
  — La borne max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.  [juge value]  départ : (2)/(4·3)·(1)³
    = □   (trous : 1/6)   ← ≈ 0,167
  aides : La borne fait intervenir la dérivée d'ordre n + 1 et hⁿ⁺¹ : max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹. | borne = (2)/(4·□)·(1)³ | borne = 1/6 ≈ 0,167.
  pièges : n_interp_error_factorial

```

### Niveau 3

```
On interpole f(x) = 1/(1 + x) sur [0 ; 1] en n + 1 = 2 nœuds équirépartis. Majore l'erreur : max|f − Πₙf| ≤ max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.
  [tap, suivre l'erreur, menu menu]  (1/(1 + x))′′
    (La dérivée d'ordre n + 1 = 2 de f(x) = 1/(1 + x).)
    = 2/(1 + x)³   ← Dériver n + 1 fois
  — Le maximum de |f⁽²⁾| sur [0 ; 1].  [juge value]  départ : M
    = 2   ← |f⁽²⁾(x)| = 2/(1 + x)³ décroît : maximum en x = 0
  — Le pas : h = (b − a)/n avec n = 1.  [juge value]  départ : h
    = 1   ← [0 ; 1] en 1 sous-intervalle
  — La borne max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.  [juge value]  départ : (2)/(4·2)·(1)²
    = 1/4   ← ≈ 0,25
  aides : La borne fait intervenir la dérivée d'ordre n + 1 et hⁿ⁺¹ : max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹. | borne = (2)/(4·□)·(1)² | borne = 1/4 ≈ 0,25.
  pièges : n_interp_error_factorial

On interpole f(x) = cos x sur [0 ; π/2] en n + 1 = 3 nœuds équirépartis. Majore l'erreur : max|f − Πₙf| ≤ max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.
  [tap, suivre l'erreur, menu menu]  (cos(x))′′′
    (La dérivée d'ordre n + 1 = 3 de f(x) = cos x.)
    = sin(x)   ← Dériver n + 1 fois
  — Le maximum de |f⁽³⁾| sur [0 ; π/2].  [juge value]  départ : M
    = 1   ← |sin x| ≤ 1, atteint sur l'intervalle
  — Le pas : h = (b − a)/n avec n = 2.  [juge value]  départ : h
    = π/4   ← [0 ; π/2] en 2 sous-intervalles
  — La borne max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.  [juge value]  départ : (1)/(4·3)·(π/4)³
    = π³/768   ← ≈ 0,0404
  aides : La borne fait intervenir la dérivée d'ordre n + 1 et hⁿ⁺¹ : max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹. | borne = (1)/(4·□)·(π/4)³ | borne = π³/768 ≈ 0,0404.
  pièges : n_interp_error_factorial

On interpole f(x) = sin x sur [0 ; π/2] en n + 1 = 3 nœuds équirépartis. Majore l'erreur : max|f − Πₙf| ≤ max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.
  [tap, suivre l'erreur, menu menu]  (sin(x))′′′
    (La dérivée d'ordre n + 1 = 3 de f(x) = sin x.)
    = −cos(x)   ← Dériver n + 1 fois
  — Le maximum de |f⁽³⁾| sur [0 ; π/2].  [juge value]  départ : M
    = 1   ← |−cos x| ≤ 1, atteint sur l'intervalle
  — Le pas : h = (b − a)/n avec n = 2.  [juge value]  départ : h
    = π/4   ← [0 ; π/2] en 2 sous-intervalles
  — La borne max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.  [juge value]  départ : (1)/(4·3)·(π/4)³
    = π³/768   ← ≈ 0,0404
  aides : La borne fait intervenir la dérivée d'ordre n + 1 et hⁿ⁺¹ : max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹. | borne = (1)/(4·□)·(π/4)³ | borne = π³/768 ≈ 0,0404.
  pièges : n_interp_error_factorial

```

### Niveau 4

```
On interpole f(x) = eˣ sur [0 ; 1] en n + 1 nœuds équirépartis (h = 1/n). Le tableau donne la borne de l'erreur pour chaque n.
  [tableau à lire]
    n | max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹
    1 | 3.398e-01
    2 | 2.832e-02
    3 | 2.097e-03
    4 | 1.327e-04
    5 | 7.249e-06
    6 | 3.468e-07
    7 | 1.474e-08
    8 | 5.626e-10
  question : Quel est le plus petit n qui garantit une erreur ≤ 10⁻⁴ ?
      · 4   · 7   · 6   ✔ 5

On interpole f(x) = eˣ sur [0 ; 2] en n + 1 nœuds équirépartis (h = 2/n). Le tableau donne la borne de l'erreur pour chaque n.
  [tableau à lire]
    n | max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹
    1 | 3.695e+00
    2 | 6.158e-01
    3 | 9.122e-02
    4 | 1.155e-02
    5 | 1.261e-03
    6 | 1.207e-04
    7 | 1.025e-05
    8 | 7.830e-07
  question : Quel est le plus petit n qui garantit une erreur ≤ 10⁻⁴ ?
      · 8   · 9   ✔ 7   · 6

On interpole f(x) = eˣ sur [0 ; 1] en n + 1 nœuds équirépartis (h = 1/n). Le tableau donne la borne de l'erreur pour chaque n.
  [tableau à lire]
    n | max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹
    1 | 3.398e-01
    2 | 2.832e-02
    3 | 2.097e-03
    4 | 1.327e-04
    5 | 7.249e-06
    6 | 3.468e-07
    7 | 1.474e-08
    8 | 5.626e-10
  question : Quel est le plus petit n qui garantit une erreur ≤ 10⁻⁷ ?
      · 8   · 9   · 6   ✔ 7

```

### Niveau 5

```
f(x) = 1/(1 + x²) sur [−5 ; 5] : max|f − Πₙf| pour n + 1 nœuds.
  [tableau à lire, sans aide]
    n | nœuds équirépartis | nœuds de Tchebychev
    4 | 4.384e-01 | 4.020e-01
    8 | 1.045e+00 | 1.708e-01
    12 | 3.663e+00 | 6.922e-02
    16 | 1.439e+01 | 3.261e-02
  question : Que montre ce tableau ? Une ou plusieurs réponses justes.
      · Plus de nœuds donne toujours une meilleure approximation [n_runge_more_nodes]   ✔ Avec des nœuds équirépartis, l'erreur augmente avec n   ✔ Avec les nœuds de Tchebychev, l'erreur diminue quand n augmente   · Les deux jeux de nœuds donnent la même erreur pour n grand
      pièges : n_runge_more_nodes
  pièges : n_runge_more_nodes

f(x) = 1/(1 + x²) sur [−5 ; 5] : max|f − Πₙf| pour n + 1 nœuds.
  [tableau à lire, sans aide]
    n | nœuds équirépartis | nœuds de Tchebychev
    4 | 4.384e-01 | 4.020e-01
    8 | 1.045e+00 | 1.708e-01
    12 | 3.663e+00 | 6.922e-02
    16 | 1.439e+01 | 3.261e-02
  question : Que montre ce tableau ? Une ou plusieurs réponses justes.
      · Plus de nœuds donne toujours une meilleure approximation [n_runge_more_nodes]   ✔ Avec des nœuds équirépartis, l'erreur augmente avec n   ✔ Avec les nœuds de Tchebychev, l'erreur diminue quand n augmente   · Les deux jeux de nœuds donnent la même erreur pour n grand
      pièges : n_runge_more_nodes
  pièges : n_runge_more_nodes

f(x) = 1/(1 + x²) sur [−5 ; 5] : max|f − Πₙf| pour n + 1 nœuds.
  [tableau à lire, sans aide]
    n | nœuds équirépartis | nœuds de Tchebychev
    4 | 4.384e-01 | 4.020e-01
    8 | 1.045e+00 | 1.708e-01
    12 | 3.663e+00 | 6.922e-02
    16 | 1.439e+01 | 3.261e-02
  question : Que montre ce tableau ? Une ou plusieurs réponses justes.
      · Les deux jeux de nœuds donnent la même erreur pour n grand   ✔ Avec les nœuds de Tchebychev, l'erreur diminue quand n augmente   · Plus de nœuds donne toujours une meilleure approximation [n_runge_more_nodes]   ✔ Avec des nœuds équirépartis, l'erreur augmente avec n
      pièges : n_runge_more_nodes
  pièges : n_runge_more_nodes

```

### Variantes d'examen

```
On interpole f(x) = ln(1 + x) sur [0 ; 2] en 4 nœuds équirépartis. Quelle borne donne max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹ ?
  · 4/81 [n_interp_error_factorial]   · 32/27   ✔ 2/27
  [examen mcq]
  pièges : n_interp_error_factorial

Vrai ou faux ? Plus on prend de nœuds équirépartis, plus le polynôme d'interpolation est proche de f.
  · Vrai [n_runge_more_nodes]   ✔ Faux
  [examen tf]
  pièges : n_runge_more_nodes

```

## Différences divisées, forme de Newton (`n-divided-diff`, BA4)

_La table des différences divisées donne la forme de Newton ; un point de plus ajoute un terme._

### Niveau 1

```
Points (−2 ; −2), (2 ; 14), (3 ; 13). Remplis la colonne des différences d'ordre 1 : f[xᵢ₋₁, xᵢ] = (f[xᵢ] − f[xᵢ₋₁])/(xᵢ − xᵢ₋₁).
  [tableau divdiff]  colonnes : xᵢ | f[xᵢ] | ordre 1
    i = 0    −2  −2  ·
    i = 1    2  14  (4)
    i = 2    3  13  (−1)
  puis : Et la différence d'ordre 2, f[x₀, x₁, x₂] = (f[x₁, x₂] − f[x₀, x₁])/(x₂ − x₀) ?
      ✔ −1   · −5 [n_divdiff_denominator]   · 1   · 4
      pièges : n_divdiff_denominator
  pièges : n_divdiff_denominator

Points (0 ; −12), (1 ; −6), (3 ; 36). Remplis la colonne des différences d'ordre 1 : f[xᵢ₋₁, xᵢ] = (f[xᵢ] − f[xᵢ₋₁])/(xᵢ − xᵢ₋₁).
  [tableau divdiff]  colonnes : xᵢ | f[xᵢ] | ordre 1
    i = 0    0  −12  ·
    i = 1    1  −6  (6)
    i = 2    3  36  (21)
  puis : Et la différence d'ordre 2, f[x₀, x₁, x₂] = (f[x₁, x₂] − f[x₀, x₁])/(x₂ − x₀) ?
      · 15   ✔ 5   · 15/2 [n_divdiff_denominator]   · −5
      pièges : n_divdiff_denominator
  pièges : n_divdiff_denominator

Points (−2 ; 25), (2 ; 13), (3 ; 20). Remplis la colonne des différences d'ordre 1 : f[xᵢ₋₁, xᵢ] = (f[xᵢ] − f[xᵢ₋₁])/(xᵢ − xᵢ₋₁).
  [tableau divdiff]  colonnes : xᵢ | f[xᵢ] | ordre 1
    i = 0    −2  25  ·
    i = 1    2  13  (−3)
    i = 2    3  20  (7)
  puis : Et la différence d'ordre 2, f[x₀, x₁, x₂] = (f[x₁, x₂] − f[x₀, x₁])/(x₂ − x₀) ?
      · 10 [n_divdiff_denominator]   · −2   · −3   ✔ 2
      pièges : n_divdiff_denominator
  pièges : n_divdiff_denominator

```

### Niveau 2

```
Points (−2 ; −15), (−1 ; −12), (3 ; 20). Remplis la table des différences divisées, puis évalue la forme de Newton.
  [tableau divdiff]  colonnes : xᵢ | f[xᵢ] | ordre 1 | ordre 2
    i = 0    −2  −15  ·  ·
    i = 1    −1  −12  (3)  ·
    i = 2    3  20  (8)  (1)
  puis : p(x) = −15 + 3(x + 2) + (x + 2)(x + 1). Calcule p(−3/2).
      [guided, sans aide]  (−15) + 3·((−3/2) − (−2)) + 1·((−3/2) − (−2))·((−3/2) − (−1))
        = □   (trous : −55/4)   ← Forme de Newton évaluée
  pièges : n_divdiff_denominator

Points (−1 ; 2), (0 ; −11), (1 ; −18). Remplis la table des différences divisées, puis évalue la forme de Newton.
  [tableau divdiff]  colonnes : xᵢ | f[xᵢ] | ordre 1 | ordre 2
    i = 0    −1  2  ·  ·
    i = 1    0  −11  (−13)  ·
    i = 2    1  −18  (−7)  (3)
  puis : p(x) = 2 − 13(x + 1) + 3(x + 1)x. Calcule p(−1/2).
      [guided, sans aide]  2 + (−13)·((−1/2) − (−1)) + 3·((−1/2) − (−1))·((−1/2) − 0)
        = □   (trous : −21/4)   ← Forme de Newton évaluée
  pièges : n_divdiff_denominator

Points (−2 ; 0), (1 ; 0), (2 ; 20). Remplis la table des différences divisées, puis évalue la forme de Newton.
  [tableau divdiff]  colonnes : xᵢ | f[xᵢ] | ordre 1 | ordre 2
    i = 0    −2  0  ·  ·
    i = 1    1  0  (0)  ·
    i = 2    2  20  (20)  (5)
  puis : p(x) = 5(x + 2)(x − 1). Calcule p(1/2).
      [guided, sans aide]  0 + 0·(1/2 − (−2)) + 5·(1/2 − (−2))·(1/2 − 1)
        = □   (trous : −25/4)   ← Forme de Newton évaluée
  pièges : n_divdiff_denominator

```

### Niveau 3

```
Table des différences divisées des points (−1 ; −8), (1 ; −22), (2 ; −44).
  [tableau à lire]
    xᵢ | f[xᵢ] | ordre 1 | ordre 2
    −1 | −8 |  | 
    1 | −22 | −7 | 
    2 | −44 | −22 | −5
  question : Quelle est la forme de Newton du polynôme d'interpolation ?
      · −8 − 7(x + 1) + 5(x + 1)(x − 1)   ✔ −8 − 7(x + 1) − 5(x + 1)(x − 1)   · −8 − 7(x − 2) − 5(x − 2)(x − 1)   · −44 − 22(x + 1) − 5(x + 1)(x − 1)

Table des différences divisées des points (−1 ; −2), (1 ; −4), (3 ; 34).
  [tableau à lire]
    xᵢ | f[xᵢ] | ordre 1 | ordre 2
    −1 | −2 |  | 
    1 | −4 | −1 | 
    3 | 34 | 19 | 5
  question : Quelle est la forme de Newton du polynôme d'interpolation ?
      · −2 − (x − 3) + 5(x − 3)(x − 1)   ✔ −2 − (x + 1) + 5(x + 1)(x − 1)   · −2 − (x + 1) − 5(x + 1)(x − 1)   · 34 + 19(x + 1) + 5(x + 1)(x − 1)

Table des différences divisées des points (−2 ; −14), (0 ; −10), (3 ; 26).
  [tableau à lire]
    xᵢ | f[xᵢ] | ordre 1 | ordre 2
    −2 | −14 |  | 
    0 | −10 | 2 | 
    3 | 26 | 12 | 2
  question : Quelle est la forme de Newton du polynôme d'interpolation ?
      · 26 + 12(x + 2) + 2(x + 2)x   · −14 + 2(x + 2) − 2(x + 2)x   ✔ −14 + 2(x + 2) + 2(x + 2)x   · −14 + 2(x − 3) + 2(x − 3)x

```

### Niveau 4

```
On ajoute le point (1 ; 9) aux points (−1 ; −7), (0 ; 4), (2 ; 14). Complète la dernière ligne de la table, puis mets p à jour.
  [tableau divdiff]  colonnes : xᵢ | f[xᵢ] | ordre 1 | ordre 2 | ordre 3
    i = 0    −1  −7  ·  ·  ·
    i = 1    0  4  11  ·  ·
    i = 2    2  14  5  −2  ·
    i = 3    1  9  (5)  (0)  (1)
  puis : p₂(x) = −7 + 11(x + 1) − 2(x + 1)x et p₂(1/2) = 8. Que vaut p₃(1/2) ?
      [free, sans aide, suivre l'erreur]  p_3
        = 55/8   ← p₃ = p₂ + 1·(x − x₀)(x − x₁)(x − x₂)
  pièges : n_divdiff_denominator

On ajoute le point (3 ; −17) aux points (−1 ; 3), (0 ; 7), (2 ; −15). Complète la dernière ligne de la table, puis mets p à jour.
  [tableau divdiff]  colonnes : xᵢ | f[xᵢ] | ordre 1 | ordre 2 | ordre 3
    i = 0    −1  3  ·  ·  ·
    i = 1    0  7  4  ·  ·
    i = 2    2  −15  −11  −5  ·
    i = 3    3  −17  (−2)  (3)  (2)
  puis : p₂(x) = 3 + 4(x + 1) − 5(x + 1)x et p₂(3/2) = −23/4. Que vaut p₃(3/2) ?
      [free, sans aide, suivre l'erreur]  p_3
        = −19/2   ← p₃ = p₂ + 2·(x − x₀)(x − x₁)(x − x₂)
  pièges : n_divdiff_denominator

On ajoute le point (3 ; 70) aux points (−2 ; 10), (0 ; 4), (2 ; 30). Complète la dernière ligne de la table, puis mets p à jour.
  [tableau divdiff]  colonnes : xᵢ | f[xᵢ] | ordre 1 | ordre 2 | ordre 3
    i = 0    −2  10  ·  ·  ·
    i = 1    0  4  −3  ·  ·
    i = 2    2  30  13  4  ·
    i = 3    3  70  (40)  (9)  (1)
  puis : p₂(x) = 10 − 3(x + 2) + 4(x + 2)x et p₂(3/2) = 41/2. Que vaut p₃(3/2) ?
      [free, sans aide, suivre l'erreur]  p_3
        = 143/8   ← p₃ = p₂ + 1·(x − x₀)(x − x₁)(x − x₂)
  pièges : n_divdiff_denominator

```

### Niveau 5

```
Complète le calcul des différences divisées (en place, de bas en haut) et l'évaluation de la forme de Newton par Horner.
  [code python, 2 trous, sans aide]
    | def divdiff(xs, ys):
    |     n = len(xs)
    |     c = []
    |     for i in range(n):
    |         c.append(ys[i])
    |     for k in range(1, n):
    |         for i in range(n - 1, k - 1, -1):
    |             c[i] = ⟦(c[i] - c[i - 1]) / (xs[i] - xs[i - k])⟧
    |     return c
    | 
    | def newton_eval(xs, c, x):
    |     n = len(c)
    |     p = c[n - 1]
    |     for i in range(n - 2, -1, -1):
    |         p = ⟦p * (x - xs[i]) + c[i]⟧
    |     return p
    test : divdiff([0, 1, 2], [12, 18, 6]) → [12, 6, -9]
    test : divdiff([0, 1, 2, 3], [12, 18, 6, 0]) → [12, 6, -9, 4]
    test : divdiff([0, 1, 3], [1, 2, 10]) → [1, 1, 1]
    test : newton_eval([0, 1, 2, 3], [12, 6, -9, 4], 0.5) → 18.75
  puis : Le programme complet, appelé avec xs = [-2, 0, 3, -1] et ys = [-5, -9, 60, -8], affiche :
      [tableau à lire, sans aide]
        c[0] | c[1] | c[2] | c[3]
        -5.000000e+00 | -2.000000e+00 | 5.000000e+00 | 1.000000e+00
      question : Quel est le polynôme d'interpolation de ces 4 points ?
          · −5 − 2(x + 2) + 5(x + 2)x − (x + 2)x(x − 3)   · −5 − 2(x + 2) + (25/3)(x + 2)x + (41/24)(x + 2)x(x − 3) [n_divdiff_denominator]   · 1 + 5(x + 2) − 2(x + 2)x − 5(x + 2)x(x − 3)   ✔ −5 − 2(x + 2) + 5(x + 2)x + (x + 2)x(x − 3)
          pièges : n_divdiff_denominator
      pièges : n_divdiff_denominator
  pièges : n_divdiff_denominator

Complète le calcul des différences divisées (en place, de bas en haut) et l'évaluation de la forme de Newton par Horner.
  [code python, 2 trous, sans aide]
    | def divdiff(xs, ys):
    |     n = len(xs)
    |     c = []
    |     for i in range(n):
    |         c.append(ys[i])
    |     for k in range(1, n):
    |         for i in range(n - 1, k - 1, -1):
    |             c[i] = ⟦(c[i] - c[i - 1]) / (xs[i] - xs[i - k])⟧
    |     return c
    | 
    | def newton_eval(xs, c, x):
    |     n = len(c)
    |     p = c[n - 1]
    |     for i in range(n - 2, -1, -1):
    |         p = ⟦p * (x - xs[i]) + c[i]⟧
    |     return p
    test : divdiff([0, 1, 2], [12, 18, 6]) → [12, 6, -9]
    test : divdiff([0, 1, 2, 3], [12, 18, 6, 0]) → [12, 6, -9, 4]
    test : divdiff([0, 1, 3], [1, 2, 10]) → [1, 1, 1]
    test : newton_eval([0, 1, 2, 3], [12, 6, -9, 4], 0.5) → 18.75
  puis : Le programme complet, appelé avec xs = [-2, 1, 3, -1] et ys = [5, -4, -20, -4], affiche :
      [tableau à lire, sans aide]
        c[0] | c[1] | c[2] | c[3]
        5.000000e+00 | -3.000000e+00 | -1.000000e+00 | -1.000000e+00
      question : Quel est le polynôme d'interpolation de ces 4 points ?
          · 5 − 3(x + 2) − (5/2)(x + 2)(x − 1) − (3/8)(x + 2)(x − 1)(x − 3) [n_divdiff_denominator]   · 5 − 3(x + 2) − (x + 2)(x − 1) + (x + 2)(x − 1)(x − 3)   · −1 − (x + 2) − 3(x + 2)(x − 1) + 5(x + 2)(x − 1)(x − 3)   ✔ 5 − 3(x + 2) − (x + 2)(x − 1) − (x + 2)(x − 1)(x − 3)
          pièges : n_divdiff_denominator
      pièges : n_divdiff_denominator
  pièges : n_divdiff_denominator

Complète le calcul des différences divisées (en place, de bas en haut) et l'évaluation de la forme de Newton par Horner.
  [code python, 2 trous, sans aide]
    | def divdiff(xs, ys):
    |     n = len(xs)
    |     c = []
    |     for i in range(n):
    |         c.append(ys[i])
    |     for k in range(1, n):
    |         for i in range(n - 1, k - 1, -1):
    |             c[i] = ⟦(c[i] - c[i - 1]) / (xs[i] - xs[i - k])⟧
    |     return c
    | 
    | def newton_eval(xs, c, x):
    |     n = len(c)
    |     p = c[n - 1]
    |     for i in range(n - 2, -1, -1):
    |         p = ⟦p * (x - xs[i]) + c[i]⟧
    |     return p
    test : divdiff([0, 1, 2], [12, 18, 6]) → [12, 6, -9]
    test : divdiff([0, 1, 2, 3], [12, 18, 6, 0]) → [12, 6, -9, 4]
    test : divdiff([0, 1, 3], [1, 2, 10]) → [1, 1, 1]
    test : newton_eval([0, 1, 2, 3], [12, 6, -9, 4], 0.5) → 18.75
  puis : Le programme complet, appelé avec xs = [-2, -1, 2, 0] et ys = [15, 3, 27, 5], affiche :
      [tableau à lire, sans aide]
        c[0] | c[1] | c[2] | c[3]
        1.500000e+01 | -1.200000e+01 | 5.000000e+00 | -1.000000e+00
      question : Quel est le polynôme d'interpolation de ces 4 points ?
          · −1 + 5(x + 2) − 12(x + 2)(x + 1) + 15(x + 2)(x + 1)(x − 2)   ✔ 15 − 12(x + 2) + 5(x + 2)(x + 1) − (x + 2)(x + 1)(x − 2)   · 15 − 12(x + 2) + (20/3)(x + 2)(x + 1) + (49/12)(x + 2)(x + 1)(x − 2) [n_divdiff_denominator]   · 15 − 12(x + 2) + 5(x + 2)(x + 1) + (x + 2)(x + 1)(x − 2)
          pièges : n_divdiff_denominator
      pièges : n_divdiff_denominator
  pièges : n_divdiff_denominator

```

### Variantes d'examen

```
La fonction divdiff calcule en place les coefficients de la forme de Newton.def divdiff(xs, ys):
    n = len(xs)
    c = []
    for i in range(n):
        c.append(ys[i])
    for k in range(1, n):
        for i in range(n - 1, k - 1, -1):
            c[i] = ???
    return c

def newton_eval(xs, c, x):
    n = len(c)
    p = c[n - 1]
    for i in range(n - 2, -1, -1):
        p = p * (x - xs[i]) + c[i]
    return p
Que faut-il écrire à la place de ??? ?
  · (c[i] - c[i - 1]) / (xs[i] - xs[i - 1]) [n_divdiff_denominator]   ✔ (c[i] - c[i - 1]) / (xs[i] - xs[i - k])   · (c[i] - c[i - 1]) / k   · (c[i] - c[i - 1]) / (xs[i - k] - xs[i])
  [examen mcq]
  pièges : n_divdiff_denominator

```

## Nœuds de Tchebychev (`n-chebyshev`, BA4)

_Des nœuds resserrés aux bords, tᵢ = cos((2i + 1)π/(2n + 2)), transportés sur [a ; b]._

### Niveau 1

```
Calcule les 3 nœuds de Tchebychev sur [−1 ; 1] pour n = 2 : tᵢ = cos((2i + 1)π/(2(n + 1))).
  [guided]  cos(π/6)
    (t₀ = cos((2·0 + 1)π/(2·3)).)
    = □   (trous : √3/2)   ← Valeur exacte du cosinus
  — t₁ = cos((2·1 + 1)π/(2·3)).  [juge value]  départ : cos(π/2)
    = □   (trous : 0)   ← Valeur exacte du cosinus
  — t₂ = cos((2·2 + 1)π/(2·3)).  [juge value]  départ : cos(5π/6)
    = □   (trous : −√3/2)   ← Valeur exacte du cosinus
  aides : Les nœuds de Tchebychev sont les cosinus des angles (2i + 1)π/(2(n + 1)), puis on les transporte de [−1 ; 1] vers [a ; b]. | t₀ = cos(□/(2·3)) | t = √3/2 ; 0 ; −√3/2.

Calcule les 2 nœuds de Tchebychev sur [−1 ; 1] pour n = 1 : tᵢ = cos((2i + 1)π/(2(n + 1))).
  [guided]  cos(π/4)
    (t₀ = cos((2·0 + 1)π/(2·2)).)
    = □   (trous : √2/2)   ← Valeur exacte du cosinus
  — t₁ = cos((2·1 + 1)π/(2·2)).  [juge value]  départ : cos(3π/4)
    = □   (trous : −√2/2)   ← Valeur exacte du cosinus
  aides : Les nœuds de Tchebychev sont les cosinus des angles (2i + 1)π/(2(n + 1)), puis on les transporte de [−1 ; 1] vers [a ; b]. | t₀ = cos(□/(2·2)) | t = √2/2 ; −√2/2.

Calcule les 2 nœuds de Tchebychev sur [−1 ; 1] pour n = 1 : tᵢ = cos((2i + 1)π/(2(n + 1))).
  [guided]  cos(π/4)
    (t₀ = cos((2·0 + 1)π/(2·2)).)
    = □   (trous : √2/2)   ← Valeur exacte du cosinus
  — t₁ = cos((2·1 + 1)π/(2·2)).  [juge value]  départ : cos(3π/4)
    = □   (trous : −√2/2)   ← Valeur exacte du cosinus
  aides : Les nœuds de Tchebychev sont les cosinus des angles (2i + 1)π/(2(n + 1)), puis on les transporte de [−1 ; 1] vers [a ; b]. | t₀ = cos(□/(2·2)) | t = √2/2 ; −√2/2.

```

### Niveau 2

```
Nœuds de Tchebychev pour n = 2 sur [2 ; 4]. Sur [−1 ; 1], les nœuds sont √3/2 ; 0 ; −√3/2.
  [guided]  x_0
    (x₀ = (a + b)/2 + (b − a)/2·t₀ = 3 + 1·(√3/2).)
    = □   (trous : 3 + √3/2)   ← (a + b)/2 = 3, (b − a)/2 = 1
  — x₁ = (a + b)/2 + (b − a)/2·t₁ = 3 + 1·(0).  [juge value]  départ : x_1
    = □   (trous : 3)   ← (a + b)/2 = 3, (b − a)/2 = 1
  — x₂ = (a + b)/2 + (b − a)/2·t₂ = 3 + 1·(−√3/2).  [juge value]  départ : x_2
    = □   (trous : 3 − √3/2)   ← (a + b)/2 = 3, (b − a)/2 = 1
  aides : Les nœuds de Tchebychev sont les cosinus des angles (2i + 1)π/(2(n + 1)), puis on les transporte de [−1 ; 1] vers [a ; b]. | x₀ = 3 + 1·□ | Sur [−1 ; 1] : √3/2 ; 0 ; −√3/2 ; sur [2 ; 4] : 3 + √3/2 ; 3 ; 3 − √3/2.
  pièges : n_cheb_no_mapping

Nœuds de Tchebychev pour n = 1 sur [−2 ; 4]. Sur [−1 ; 1], les nœuds sont √2/2 ; −√2/2.
  [guided]  x_0
    (x₀ = (a + b)/2 + (b − a)/2·t₀ = 1 + 3·(√2/2).)
    = □   (trous : 1 + 3√2/2)   ← (a + b)/2 = 1, (b − a)/2 = 3
  — x₁ = (a + b)/2 + (b − a)/2·t₁ = 1 + 3·(−√2/2).  [juge value]  départ : x_1
    = □   (trous : 1 − 3√2/2)   ← (a + b)/2 = 1, (b − a)/2 = 3
  aides : Les nœuds de Tchebychev sont les cosinus des angles (2i + 1)π/(2(n + 1)), puis on les transporte de [−1 ; 1] vers [a ; b]. | x₀ = 1 + 3·□ | Sur [−1 ; 1] : √2/2 ; −√2/2 ; sur [−2 ; 4] : 1 + 3√2/2 ; 1 − 3√2/2.
  pièges : n_cheb_no_mapping

Nœuds de Tchebychev pour n = 1 sur [−2 ; 0]. Sur [−1 ; 1], les nœuds sont √2/2 ; −√2/2.
  [guided]  x_0
    (x₀ = (a + b)/2 + (b − a)/2·t₀ = −1 + 1·(√2/2).)
    = □   (trous : −1 + √2/2)   ← (a + b)/2 = −1, (b − a)/2 = 1
  — x₁ = (a + b)/2 + (b − a)/2·t₁ = −1 + 1·(−√2/2).  [juge value]  départ : x_1
    = □   (trous : −1 − √2/2)   ← (a + b)/2 = −1, (b − a)/2 = 1
  aides : Les nœuds de Tchebychev sont les cosinus des angles (2i + 1)π/(2(n + 1)), puis on les transporte de [−1 ; 1] vers [a ; b]. | x₀ = −1 + 1·□ | Sur [−1 ; 1] : √2/2 ; −√2/2 ; sur [−2 ; 0] : −1 + √2/2 ; −1 − √2/2.
  pièges : n_cheb_no_mapping

```

### Niveau 3

```
Nœuds de Tchebychev pour n = 1 sur [3 ; 5].
  [tap, suivre l'erreur, menu menu]  cos(π/4)
    ? Pour interpoler 1/(1 + x²) sur un grand intervalle, quels nœuds choisir ? ✔ Les nœuds de Tchebychev, resserrés près des bords / · Des nœuds équirépartis, et beaucoup
    (t₀ = cos((2·0 + 1)π/(2·2)).)
    = √2/2   ← Valeur exacte du cosinus
  — t₁ = cos((2·1 + 1)π/(2·2)).  [juge value]  départ : cos(3π/4)
    = −√2/2   ← Valeur exacte du cosinus
  — x₀ = (a + b)/2 + (b − a)/2·t₀ = 4 + 1·(√2/2).  [juge value]  départ : x_0
    = 4 + √2/2   ← (a + b)/2 = 4, (b − a)/2 = 1
  — x₁ = (a + b)/2 + (b − a)/2·t₁ = 4 + 1·(−√2/2).  [juge value]  départ : x_1
    = 4 − √2/2   ← (a + b)/2 = 4, (b − a)/2 = 1
  aides : Les nœuds de Tchebychev sont les cosinus des angles (2i + 1)π/(2(n + 1)), puis on les transporte de [−1 ; 1] vers [a ; b]. | x₀ = 4 + 1·□ | Sur [−1 ; 1] : √2/2 ; −√2/2 ; sur [3 ; 5] : 4 + √2/2 ; 4 − √2/2.
  pièges : n_cheb_no_mapping

Nœuds de Tchebychev pour n = 1 sur [2 ; 4].
  [tap, suivre l'erreur, menu menu]  cos(π/4)
    ? Pour interpoler 1/(1 + x²) sur un grand intervalle, quels nœuds choisir ? ✔ Les nœuds de Tchebychev, resserrés près des bords / · Des nœuds équirépartis, et beaucoup
    (t₀ = cos((2·0 + 1)π/(2·2)).)
    = √2/2   ← Valeur exacte du cosinus
  — t₁ = cos((2·1 + 1)π/(2·2)).  [juge value]  départ : cos(3π/4)
    = −√2/2   ← Valeur exacte du cosinus
  — x₀ = (a + b)/2 + (b − a)/2·t₀ = 3 + 1·(√2/2).  [juge value]  départ : x_0
    = 3 + √2/2   ← (a + b)/2 = 3, (b − a)/2 = 1
  — x₁ = (a + b)/2 + (b − a)/2·t₁ = 3 + 1·(−√2/2).  [juge value]  départ : x_1
    = 3 − √2/2   ← (a + b)/2 = 3, (b − a)/2 = 1
  aides : Les nœuds de Tchebychev sont les cosinus des angles (2i + 1)π/(2(n + 1)), puis on les transporte de [−1 ; 1] vers [a ; b]. | x₀ = 3 + 1·□ | Sur [−1 ; 1] : √2/2 ; −√2/2 ; sur [2 ; 4] : 3 + √2/2 ; 3 − √2/2.
  pièges : n_cheb_no_mapping

Nœuds de Tchebychev pour n = 2 sur [0 ; 6].
  [tap, suivre l'erreur, menu menu]  cos(π/6)
    ? Pour interpoler 1/(1 + x²) sur un grand intervalle, quels nœuds choisir ? ✔ Les nœuds de Tchebychev, resserrés près des bords / · Des nœuds équirépartis, et beaucoup
    (t₀ = cos((2·0 + 1)π/(2·3)).)
    = √3/2   ← Valeur exacte du cosinus
  — t₁ = cos((2·1 + 1)π/(2·3)).  [juge value]  départ : cos(π/2)
    = 0   ← Valeur exacte du cosinus
  — t₂ = cos((2·2 + 1)π/(2·3)).  [juge value]  départ : cos(5π/6)
    = −√3/2   ← Valeur exacte du cosinus
  — x₀ = (a + b)/2 + (b − a)/2·t₀ = 3 + 3·(√3/2).  [juge value]  départ : x_0
    = 3 + 3√3/2   ← (a + b)/2 = 3, (b − a)/2 = 3
  — x₁ = (a + b)/2 + (b − a)/2·t₁ = 3 + 3·(0).  [juge value]  départ : x_1
    = 3   ← (a + b)/2 = 3, (b − a)/2 = 3
  — x₂ = (a + b)/2 + (b − a)/2·t₂ = 3 + 3·(−√3/2).  [juge value]  départ : x_2
    = 3 − 3√3/2   ← (a + b)/2 = 3, (b − a)/2 = 3
  aides : Les nœuds de Tchebychev sont les cosinus des angles (2i + 1)π/(2(n + 1)), puis on les transporte de [−1 ; 1] vers [a ; b]. | x₀ = 3 + 3·□ | Sur [−1 ; 1] : √3/2 ; 0 ; −√3/2 ; sur [0 ; 6] : 3 + 3√3/2 ; 3 ; 3 − 3√3/2.
  pièges : n_cheb_no_mapping

```

### Niveau 4

```
Nœuds de Tchebychev pour n = 1 sur [3 ; 7]. Donne les nœuds, puis max|Π(x − xᵢ)| sur l'intervalle.
  [free, suivre l'erreur]  cos(π/4)
    (t₀ = cos((2·0 + 1)π/(2·2)).)
    = √2/2   ← Valeur exacte du cosinus
  — t₁ = cos((2·1 + 1)π/(2·2)).  [juge value]  départ : cos(3π/4)
    = −√2/2   ← Valeur exacte du cosinus
  — x₀ = (a + b)/2 + (b − a)/2·t₀ = 5 + 2·(√2/2).  [juge value]  départ : x_0
    = 5 + √2   ← (a + b)/2 = 5, (b − a)/2 = 2
  — x₁ = (a + b)/2 + (b − a)/2·t₁ = 5 + 2·(−√2/2).  [juge value]  départ : x_1
    = 5 − √2   ← (a + b)/2 = 5, (b − a)/2 = 2
  — max|Π(x − xᵢ)| sur [3 ; 7] = 2⁻ⁿ·((b − a)/2)ⁿ⁺¹.  [juge value]  départ : 2^(−1)·2²
    = 2   ← Le plus petit possible pour n + 1 nœuds
  aides : Les nœuds de Tchebychev sont les cosinus des angles (2i + 1)π/(2(n + 1)), puis on les transporte de [−1 ; 1] vers [a ; b]. | x₀ = 5 + 2·□ | Sur [−1 ; 1] : √2/2 ; −√2/2 ; sur [3 ; 7] : 5 + √2 ; 5 − √2.
  pièges : n_cheb_no_mapping

Nœuds de Tchebychev pour n = 1 sur [2 ; 6]. Donne les nœuds, puis max|Π(x − xᵢ)| sur l'intervalle.
  [free, suivre l'erreur]  cos(π/4)
    (t₀ = cos((2·0 + 1)π/(2·2)).)
    = √2/2   ← Valeur exacte du cosinus
  — t₁ = cos((2·1 + 1)π/(2·2)).  [juge value]  départ : cos(3π/4)
    = −√2/2   ← Valeur exacte du cosinus
  — x₀ = (a + b)/2 + (b − a)/2·t₀ = 4 + 2·(√2/2).  [juge value]  départ : x_0
    = 4 + √2   ← (a + b)/2 = 4, (b − a)/2 = 2
  — x₁ = (a + b)/2 + (b − a)/2·t₁ = 4 + 2·(−√2/2).  [juge value]  départ : x_1
    = 4 − √2   ← (a + b)/2 = 4, (b − a)/2 = 2
  — max|Π(x − xᵢ)| sur [2 ; 6] = 2⁻ⁿ·((b − a)/2)ⁿ⁺¹.  [juge value]  départ : 2^(−1)·2²
    = 2   ← Le plus petit possible pour n + 1 nœuds
  aides : Les nœuds de Tchebychev sont les cosinus des angles (2i + 1)π/(2(n + 1)), puis on les transporte de [−1 ; 1] vers [a ; b]. | x₀ = 4 + 2·□ | Sur [−1 ; 1] : √2/2 ; −√2/2 ; sur [2 ; 6] : 4 + √2 ; 4 − √2.
  pièges : n_cheb_no_mapping

Nœuds de Tchebychev pour n = 1 sur [−3 ; −1]. Donne les nœuds, puis max|Π(x − xᵢ)| sur l'intervalle.
  [free, suivre l'erreur]  cos(π/4)
    (t₀ = cos((2·0 + 1)π/(2·2)).)
    = √2/2   ← Valeur exacte du cosinus
  — t₁ = cos((2·1 + 1)π/(2·2)).  [juge value]  départ : cos(3π/4)
    = −√2/2   ← Valeur exacte du cosinus
  — x₀ = (a + b)/2 + (b − a)/2·t₀ = −2 + 1·(√2/2).  [juge value]  départ : x_0
    = −2 + √2/2   ← (a + b)/2 = −2, (b − a)/2 = 1
  — x₁ = (a + b)/2 + (b − a)/2·t₁ = −2 + 1·(−√2/2).  [juge value]  départ : x_1
    = −2 − √2/2   ← (a + b)/2 = −2, (b − a)/2 = 1
  — max|Π(x − xᵢ)| sur [−3 ; −1] = 2⁻ⁿ·((b − a)/2)ⁿ⁺¹.  [juge value]  départ : 2^(−1)·1²
    = 1/2   ← Le plus petit possible pour n + 1 nœuds
  aides : Les nœuds de Tchebychev sont les cosinus des angles (2i + 1)π/(2(n + 1)), puis on les transporte de [−1 ; 1] vers [a ; b]. | x₀ = −2 + 1·□ | Sur [−1 ; 1] : √2/2 ; −√2/2 ; sur [−3 ; −1] : −2 + √2/2 ; −2 − √2/2.
  pièges : n_cheb_no_mapping

```

### Niveau 5

```
Complète la fonction qui renvoie les n + 1 nœuds de Tchebychev sur [a ; b].
  [code python, 2 trous, sans aide]
    | def cheb(n, a, b):
    |     xs = []
    |     for i in range(n + 1):
    |         t = ⟦math.cos((2 * i + 1) * math.pi / (2 * (n + 1)))⟧
    |         xs.append(⟦(a + b) / 2 + (b - a) / 2 * t⟧)
    |     return xs
    test : cheb(2, -1, 1)[0] → 0.8660254037844387
    test : cheb(2, -1, 1)[1] → 0.0
    test : cheb(2, 0, 4) → [3.7320508075688776, 2.0, 0.2679491924311226]
  puis : Avec ces nœuds, on interpole f(x) = 1/(1 + x²) sur [−5 ; 5] : max|f − Πₙf| pour n + 1 nœuds.
      [tableau à lire, sans aide]
        n | nœuds équirépartis | nœuds de Tchebychev
        4 | 4.384e-01 | 4.020e-01
        8 | 1.045e+00 | 1.708e-01
        12 | 3.663e+00 | 6.922e-02
        16 | 1.439e+01 | 3.261e-02
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          ✔ Avec les nœuds de Tchebychev, l'erreur diminue quand n augmente   ✔ Avec des nœuds équirépartis, l'erreur augmente avec n   · Plus de nœuds donne toujours une meilleure approximation [n_runge_more_nodes]   · Les deux jeux de nœuds donnent la même erreur pour n grand
          pièges : n_runge_more_nodes
      pièges : n_runge_more_nodes
  pièges : n_cheb_no_mapping

Complète la fonction qui renvoie les n + 1 nœuds de Tchebychev sur [a ; b].
  [code python, 2 trous, sans aide]
    | def cheb(n, a, b):
    |     xs = []
    |     for i in range(n + 1):
    |         t = ⟦math.cos((2 * i + 1) * math.pi / (2 * (n + 1)))⟧
    |         xs.append(⟦(a + b) / 2 + (b - a) / 2 * t⟧)
    |     return xs
    test : cheb(2, -1, 1)[0] → 0.8660254037844387
    test : cheb(2, -1, 1)[1] → 0.0
    test : cheb(2, 0, 4) → [3.7320508075688776, 2.0, 0.2679491924311226]
  puis : Avec ces nœuds, on interpole f(x) = 1/(1 + x²) sur [−5 ; 5] : max|f − Πₙf| pour n + 1 nœuds.
      [tableau à lire, sans aide]
        n | nœuds équirépartis | nœuds de Tchebychev
        4 | 4.384e-01 | 4.020e-01
        8 | 1.045e+00 | 1.708e-01
        12 | 3.663e+00 | 6.922e-02
        16 | 1.439e+01 | 3.261e-02
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          ✔ Avec les nœuds de Tchebychev, l'erreur diminue quand n augmente   · Les deux jeux de nœuds donnent la même erreur pour n grand   ✔ Avec des nœuds équirépartis, l'erreur augmente avec n   · Plus de nœuds donne toujours une meilleure approximation [n_runge_more_nodes]
          pièges : n_runge_more_nodes
      pièges : n_runge_more_nodes
  pièges : n_cheb_no_mapping

Complète la fonction qui renvoie les n + 1 nœuds de Tchebychev sur [a ; b].
  [code python, 2 trous, sans aide]
    | def cheb(n, a, b):
    |     xs = []
    |     for i in range(n + 1):
    |         t = ⟦math.cos((2 * i + 1) * math.pi / (2 * (n + 1)))⟧
    |         xs.append(⟦(a + b) / 2 + (b - a) / 2 * t⟧)
    |     return xs
    test : cheb(2, -1, 1)[0] → 0.8660254037844387
    test : cheb(2, -1, 1)[1] → 0.0
    test : cheb(2, 0, 4) → [3.7320508075688776, 2.0, 0.2679491924311226]
  puis : Avec ces nœuds, on interpole f(x) = 1/(1 + x²) sur [−5 ; 5] : max|f − Πₙf| pour n + 1 nœuds.
      [tableau à lire, sans aide]
        n | nœuds équirépartis | nœuds de Tchebychev
        4 | 4.384e-01 | 4.020e-01
        8 | 1.045e+00 | 1.708e-01
        12 | 3.663e+00 | 6.922e-02
        16 | 1.439e+01 | 3.261e-02
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          ✔ Avec les nœuds de Tchebychev, l'erreur diminue quand n augmente   · Les deux jeux de nœuds donnent la même erreur pour n grand   · Plus de nœuds donne toujours une meilleure approximation [n_runge_more_nodes]   ✔ Avec des nœuds équirépartis, l'erreur augmente avec n
          pièges : n_runge_more_nodes
      pièges : n_runge_more_nodes
  pièges : n_cheb_no_mapping

```

### Variantes d'examen

```
Vrai ou faux ?
  « Avec les nœuds de Tchebychev, l'interpolant de 1/(1 + x²) sur [−5 ; 5] converge vers f quand n → ∞. » → VRAI
  [examen tf]

```

## Interpolation linéaire par morceaux (`n-interp-piecewise`, BA4)

_Des segments entre les nœuds : erreur ≤ (h²/8)·max|f″|, l'ordre 2 sans Runge._

### Niveau 1

```
f(x) = 2x³ sur [0 ; 2], interpolée linéairement par morceaux avec un pas h. Combien de sous-intervalles faut-il au moins pour garantir une erreur ≤ 0,75 ? (max|f − Π₁ʰf| ≤ (h²/8)·max|f″|) On donne f″(x) = 12x.
  [guided]  M
    (M = max|f″| sur [0 ; 2].)
    = □   (trous : 24)   ← f″(x) = 12x croît : maximum en x = 2
  — h²/8·M ≤ 0,75 ⇔ h ≤ √(8·tol/M).  [juge value]  départ : √(8·0,75/24)
    = □   (trous : 1/2)   ← Le plus grand pas permis : 0,5
  — n = (b − a)/h sous-intervalles.  [juge value]  départ : 2/(1/2)
    = □   (trous : 4)   ← n ≥ 2/0,5
  aides : Sur chaque morceau, c'est l'interpolation de degré 1 : l'erreur fait intervenir f″ et h², avec le facteur 1/8. | (h²/8)·24 ≤ 0,75 ⇔ h² ≤ □ | M = 24, h = 0,5, n = 4.
  pièges : n_p1_bound

f(x) = 2x³ + x² sur [0 ; 3], interpolée linéairement par morceaux avec un pas h. Combien de sous-intervalles faut-il au moins pour garantir une erreur ≤ 0,0475 ? (max|f − Π₁ʰf| ≤ (h²/8)·max|f″|) On donne f″(x) = 12x + 2.
  [guided]  M
    (M = max|f″| sur [0 ; 3].)
    = □   (trous : 38)   ← f″(x) = 12x + 2 croît : maximum en x = 3
  — h²/8·M ≤ 0,0475 ⇔ h ≤ √(8·tol/M).  [juge value]  départ : √(8·0,0475/38)
    = □   (trous : 1/10)   ← Le plus grand pas permis : 0,1
  — n = (b − a)/h sous-intervalles.  [juge value]  départ : 3/(1/10)
    = □   (trous : 30)   ← n ≥ 3/0,1
  aides : Sur chaque morceau, c'est l'interpolation de degré 1 : l'erreur fait intervenir f″ et h², avec le facteur 1/8. | (h²/8)·38 ≤ 0,0475 ⇔ h² ≤ □ | M = 38, h = 0,1, n = 30.
  pièges : n_p1_bound

f(x) = x³ sur [0 ; 2], interpolée linéairement par morceaux avec un pas h. Combien de sous-intervalles faut-il au moins pour garantir une erreur ≤ 0,015 ? (max|f − Π₁ʰf| ≤ (h²/8)·max|f″|) On donne f″(x) = 6x.
  [guided]  M
    (M = max|f″| sur [0 ; 2].)
    = □   (trous : 12)   ← f″(x) = 6x croît : maximum en x = 2
  — h²/8·M ≤ 0,015 ⇔ h ≤ √(8·tol/M).  [juge value]  départ : √(8·0,015/12)
    = □   (trous : 1/10)   ← Le plus grand pas permis : 0,1
  — n = (b − a)/h sous-intervalles.  [juge value]  départ : 2/(1/10)
    = □   (trous : 20)   ← n ≥ 2/0,1
  aides : Sur chaque morceau, c'est l'interpolation de degré 1 : l'erreur fait intervenir f″ et h², avec le facteur 1/8. | (h²/8)·12 ≤ 0,015 ⇔ h² ≤ □ | M = 12, h = 0,1, n = 20.
  pièges : n_p1_bound

```

### Niveau 2

```
f(x) = x³ + 3x² sur [0 ; 2], interpolée linéairement par morceaux avec un pas h. Combien de sous-intervalles faut-il au moins pour garantir une erreur ≤ 0,0225 ? (max|f − Π₁ʰf| ≤ (h²/8)·max|f″|)
  [guided]  M
    (M = max|f″| sur [0 ; 2].)
    = □   (trous : 18)   ← f″(x) = 6x + 6 croît : maximum en x = 2
  — h²/8·M ≤ 0,0225 ⇔ h ≤ √(8·tol/M).  [juge value]  départ : √(8·0,0225/18)
    = □   (trous : 1/10)   ← Le plus grand pas permis : 0,1
  — n = (b − a)/h sous-intervalles.  [juge value]  départ : 2/(1/10)
    = □   (trous : 20)   ← n ≥ 2/0,1
  aides : Sur chaque morceau, c'est l'interpolation de degré 1 : l'erreur fait intervenir f″ et h², avec le facteur 1/8. | (h²/8)·18 ≤ 0,0225 ⇔ h² ≤ □ | M = 18, h = 0,1, n = 20.
  pièges : n_p1_bound

f(x) = x³ + x² sur [0 ; 1], interpolée linéairement par morceaux avec un pas h. Combien de sous-intervalles faut-il au moins pour garantir une erreur ≤ 0,0025 ? (max|f − Π₁ʰf| ≤ (h²/8)·max|f″|)
  [guided]  M
    (M = max|f″| sur [0 ; 1].)
    = □   (trous : 8)   ← f″(x) = 6x + 2 croît : maximum en x = 1
  — h²/8·M ≤ 0,0025 ⇔ h ≤ √(8·tol/M).  [juge value]  départ : √(8·0,0025/8)
    = □   (trous : 1/20)   ← Le plus grand pas permis : 0,05
  — n = (b − a)/h sous-intervalles.  [juge value]  départ : 1/(1/20)
    = □   (trous : 20)   ← n ≥ 1/0,05
  aides : Sur chaque morceau, c'est l'interpolation de degré 1 : l'erreur fait intervenir f″ et h², avec le facteur 1/8. | (h²/8)·8 ≤ 0,0025 ⇔ h² ≤ □ | M = 8, h = 0,05, n = 20.
  pièges : n_p1_bound

f(x) = 2x³ + x² sur [0 ; 1], interpolée linéairement par morceaux avec un pas h. Combien de sous-intervalles faut-il au moins pour garantir une erreur ≤ 0,004375 ? (max|f − Π₁ʰf| ≤ (h²/8)·max|f″|)
  [guided]  M
    (M = max|f″| sur [0 ; 1].)
    = □   (trous : 14)   ← f″(x) = 12x + 2 croît : maximum en x = 1
  — h²/8·M ≤ 0,004375 ⇔ h ≤ √(8·tol/M).  [juge value]  départ : √(8·0,004375/14)
    = □   (trous : 1/20)   ← Le plus grand pas permis : 0,05
  — n = (b − a)/h sous-intervalles.  [juge value]  départ : 1/(1/20)
    = □   (trous : 20)   ← n ≥ 1/0,05
  aides : Sur chaque morceau, c'est l'interpolation de degré 1 : l'erreur fait intervenir f″ et h², avec le facteur 1/8. | (h²/8)·14 ≤ 0,004375 ⇔ h² ≤ □ | M = 14, h = 0,05, n = 20.
  pièges : n_p1_bound

```

### Niveau 3

```
Données : (0 ; 1), (2 ; 0), (3 ; −2), (5 ; 8). Calcule l'interpolant linéaire par morceaux Π₁ʰf en x* = 4. Choisis d'abord le sous-intervalle.
  [tap, suivre l'erreur, menu menu]  (−2) + (8 − (−2))·(4 − 3)/(5 − 3)
    ? Dans quel sous-intervalle se trouve x* = 4 ? · [0 ; 2] / · [2 ; 3] / ✔ [3 ; 5]
    (Π₁ʰf(x*) : la droite entre (3 ; −2) et (5 ; 8).)
    = 3   ← yᵢ + (yᵢ₊₁ − yᵢ)(x* − xᵢ)/(xᵢ₊₁ − xᵢ)
  aides : Π₁ʰf est la droite qui joint les deux nœuds voisins de x*. | Π₁ʰf(x*) = −2 + (8 − (−2))·(x* − 3)/□ | Π₁ʰf(4) = 3.

Données : (0 ; −2), (3 ; 7), (5 ; 9), (8 ; 6). Calcule l'interpolant linéaire par morceaux Π₁ʰf en x* = 2. Choisis d'abord le sous-intervalle.
  [tap, suivre l'erreur, menu menu]  (−2) + (7 − (−2))·(2 − 0)/(3 − 0)
    ? Dans quel sous-intervalle se trouve x* = 2 ? ✔ [0 ; 3] / · [3 ; 5] / · [5 ; 8]
    (Π₁ʰf(x*) : la droite entre (0 ; −2) et (3 ; 7).)
    = 4   ← yᵢ + (yᵢ₊₁ − yᵢ)(x* − xᵢ)/(xᵢ₊₁ − xᵢ)
  aides : Π₁ʰf est la droite qui joint les deux nœuds voisins de x*. | Π₁ʰf(x*) = −2 + (7 − (−2))·(x* − 0)/□ | Π₁ʰf(2) = 4.

Données : (0 ; 5), (2 ; −3), (4 ; 5), (6 ; 1). Calcule l'interpolant linéaire par morceaux Π₁ʰf en x* = 3. Choisis d'abord le sous-intervalle.
  [tap, suivre l'erreur, menu menu]  (−3) + (5 − (−3))·(3 − 2)/(4 − 2)
    ? Dans quel sous-intervalle se trouve x* = 3 ? · [0 ; 2] / ✔ [2 ; 4] / · [4 ; 6]
    (Π₁ʰf(x*) : la droite entre (2 ; −3) et (4 ; 5).)
    = 1   ← yᵢ + (yᵢ₊₁ − yᵢ)(x* − xᵢ)/(xᵢ₊₁ − xᵢ)
  aides : Π₁ʰf est la droite qui joint les deux nœuds voisins de x*. | Π₁ʰf(x*) = −3 + (5 − (−3))·(x* − 2)/□ | Π₁ʰf(3) = 1.

```

### Niveau 4

```
f(x) = x³ sur [0 ; 2], interpolée linéairement par morceaux avec un pas h. Combien de sous-intervalles faut-il au moins pour garantir une erreur ≤ 0,375 ? (max|f − Π₁ʰf| ≤ (h²/8)·max|f″|) Puis évalue un interpolant.
  [free, suivre l'erreur]  M
    (M = max|f″| sur [0 ; 2].)
    = 12   ← f″(x) = 6x croît : maximum en x = 2
  — h²/8·M ≤ 0,375 ⇔ h ≤ √(8·tol/M).  [juge value]  départ : √(8·0,375/12)
    = 1/2   ← Le plus grand pas permis : 0,5
  — n = (b − a)/h sous-intervalles.  [juge value]  départ : 2/(1/2)
    = 4   ← n ≥ 2/0,5
  — Données : (0 ; 4), (2 ; −4), (5 ; −3), (6 ; 8). Π₁ʰf(x*) : la droite entre (0 ; 4) et (2 ; −4).  [juge value]  départ : 4 + ((−4) − 4)·(1 − 0)/(2 − 0)
    = 0   ← yᵢ + (yᵢ₊₁ − yᵢ)(x* − xᵢ)/(xᵢ₊₁ − xᵢ)
  aides : Sur chaque morceau, c'est l'interpolation de degré 1 : l'erreur fait intervenir f″ et h², avec le facteur 1/8. | (h²/8)·12 ≤ 0,375 ⇔ h² ≤ □ | M = 12, h = 0,5, n = 4.
  pièges : n_p1_bound

f(x) = 2x³ + 3x² sur [0 ; 3], interpolée linéairement par morceaux avec un pas h. Combien de sous-intervalles faut-il au moins pour garantir une erreur ≤ 0,0525 ? (max|f − Π₁ʰf| ≤ (h²/8)·max|f″|) Puis évalue un interpolant.
  [free, suivre l'erreur]  M
    (M = max|f″| sur [0 ; 3].)
    = 42   ← f″(x) = 12x + 6 croît : maximum en x = 3
  — h²/8·M ≤ 0,0525 ⇔ h ≤ √(8·tol/M).  [juge value]  départ : √(8·0,0525/42)
    = 1/10   ← Le plus grand pas permis : 0,1
  — n = (b − a)/h sous-intervalles.  [juge value]  départ : 3/(1/10)
    = 30   ← n ≥ 3/0,1
  — Données : (0 ; −3), (2 ; 4), (4 ; 9), (6 ; −2). Π₁ʰf(x*) : la droite entre (0 ; −3) et (2 ; 4).  [juge value]  départ : (−3) + (4 − (−3))·(1 − 0)/(2 − 0)
    = 1/2   ← yᵢ + (yᵢ₊₁ − yᵢ)(x* − xᵢ)/(xᵢ₊₁ − xᵢ)
  aides : Sur chaque morceau, c'est l'interpolation de degré 1 : l'erreur fait intervenir f″ et h², avec le facteur 1/8. | (h²/8)·42 ≤ 0,0525 ⇔ h² ≤ □ | M = 42, h = 0,1, n = 30.
  pièges : n_p1_bound

f(x) = 2x³ sur [0 ; 3], interpolée linéairement par morceaux avec un pas h. Combien de sous-intervalles faut-il au moins pour garantir une erreur ≤ 1,125 ? (max|f − Π₁ʰf| ≤ (h²/8)·max|f″|) Puis évalue un interpolant.
  [free, suivre l'erreur]  M
    (M = max|f″| sur [0 ; 3].)
    = 36   ← f″(x) = 12x croît : maximum en x = 3
  — h²/8·M ≤ 1,125 ⇔ h ≤ √(8·tol/M).  [juge value]  départ : √(8·1,125/36)
    = 1/2   ← Le plus grand pas permis : 0,5
  — n = (b − a)/h sous-intervalles.  [juge value]  départ : 3/(1/2)
    = 6   ← n ≥ 3/0,5
  — Données : (0 ; 9), (3 ; 9), (5 ; 5), (6 ; 6). Π₁ʰf(x*) : la droite entre (3 ; 9) et (5 ; 5).  [juge value]  départ : 9 + (5 − 9)·(4 − 3)/(5 − 3)
    = 7   ← yᵢ + (yᵢ₊₁ − yᵢ)(x* − xᵢ)/(xᵢ₊₁ − xᵢ)
  aides : Sur chaque morceau, c'est l'interpolation de degré 1 : l'erreur fait intervenir f″ et h², avec le facteur 1/8. | (h²/8)·36 ≤ 1,125 ⇔ h² ≤ □ | M = 36, h = 0,5, n = 6.
  pièges : n_p1_bound

```

### Niveau 5

```
Complète la fonction qui évalue en x l'interpolant linéaire par morceaux des données (xs[i] ; ys[i]), les xs étant croissants.
  [code python, 2 trous, sans aide]
    | def p1h(xs, ys, x):
    |     for i in range(len(xs) - 1):
    |         if ⟦xs[i] <= x and x <= xs[i + 1]⟧:
    |             return ⟦ys[i] + (ys[i + 1] - ys[i]) * (x - xs[i]) / (xs[i + 1] - xs[i])⟧
    |     return None
    test : p1h([0, 1, 3], [1, 3, 2], 2) → 2.5
    test : p1h([0, 1, 2, 4], [0, 1, 4, 16], 3) → 10.0
    test : p1h([0, 2, 5], [4, 0, 6], 1.5) → 1.0
    test : p1h([0, 1, 2], [0, 1, 4], -1) → None
  puis : Avec ce programme, on interpole f = sin sur [0 ; π] en n sous-intervalles (h = π/n). Erreur maximale et borne h²/8·max|f″| :
      [tableau à lire, sans aide]
        n | erreur max | h²/8
        4 | 7.038e-02 | 7.711e-02
        8 | 1.885e-02 | 1.928e-02
        16 | 4.792e-03 | 4.819e-03
        32 | 1.203e-03 | 1.205e-03
      question : Que lit-on dans ce tableau ? Une ou plusieurs réponses justes.
          · L'erreur est divisée par 2 quand n double : ordre 1   ✔ La borne h²/8·max|f″| est respectée   · La borne est très pessimiste (10 fois trop grande)   ✔ L'erreur est divisée par environ 4 quand n double : ordre 2

Complète la fonction qui évalue en x l'interpolant linéaire par morceaux des données (xs[i] ; ys[i]), les xs étant croissants.
  [code python, 2 trous, sans aide]
    | def p1h(xs, ys, x):
    |     for i in range(len(xs) - 1):
    |         if ⟦xs[i] <= x and x <= xs[i + 1]⟧:
    |             return ⟦ys[i] + (ys[i + 1] - ys[i]) * (x - xs[i]) / (xs[i + 1] - xs[i])⟧
    |     return None
    test : p1h([0, 1, 3], [1, 3, 2], 2) → 2.5
    test : p1h([0, 1, 2, 4], [0, 1, 4, 16], 3) → 10.0
    test : p1h([0, 2, 5], [4, 0, 6], 1.5) → 1.0
    test : p1h([0, 1, 2], [0, 1, 4], -1) → None
  puis : Avec ce programme, on interpole f = sin sur [0 ; π] en n sous-intervalles (h = π/n). Erreur maximale et borne h²/8·max|f″| :
      [tableau à lire, sans aide]
        n | erreur max | h²/8
        4 | 7.038e-02 | 7.711e-02
        8 | 1.885e-02 | 1.928e-02
        16 | 4.792e-03 | 4.819e-03
        32 | 1.203e-03 | 1.205e-03
      question : Que lit-on dans ce tableau ? Une ou plusieurs réponses justes.
          · La borne est très pessimiste (10 fois trop grande)   ✔ La borne h²/8·max|f″| est respectée   · L'erreur est divisée par 2 quand n double : ordre 1   ✔ L'erreur est divisée par environ 4 quand n double : ordre 2

Complète la fonction qui évalue en x l'interpolant linéaire par morceaux des données (xs[i] ; ys[i]), les xs étant croissants.
  [code python, 2 trous, sans aide]
    | def p1h(xs, ys, x):
    |     for i in range(len(xs) - 1):
    |         if ⟦xs[i] <= x and x <= xs[i + 1]⟧:
    |             return ⟦ys[i] + (ys[i + 1] - ys[i]) * (x - xs[i]) / (xs[i + 1] - xs[i])⟧
    |     return None
    test : p1h([0, 1, 3], [1, 3, 2], 2) → 2.5
    test : p1h([0, 1, 2, 4], [0, 1, 4, 16], 3) → 10.0
    test : p1h([0, 2, 5], [4, 0, 6], 1.5) → 1.0
    test : p1h([0, 1, 2], [0, 1, 4], -1) → None
  puis : Avec ce programme, on interpole f = sin sur [0 ; π] en n sous-intervalles (h = π/n). Erreur maximale et borne h²/8·max|f″| :
      [tableau à lire, sans aide]
        n | erreur max | h²/8
        4 | 7.038e-02 | 7.711e-02
        8 | 1.885e-02 | 1.928e-02
        16 | 4.792e-03 | 4.819e-03
        32 | 1.203e-03 | 1.205e-03
      question : Que lit-on dans ce tableau ? Une ou plusieurs réponses justes.
          · La borne est très pessimiste (10 fois trop grande)   ✔ La borne h²/8·max|f″| est respectée   ✔ L'erreur est divisée par environ 4 quand n double : ordre 2   · L'erreur est divisée par 2 quand n double : ordre 1

```

### Variantes d'examen

```
Vrai ou faux ?
  « Diviser h par 2 divise par 2 l'erreur max|f − Π₁ʰf| de l'interpolation linéaire par morceaux. » → FAUX
    contre-exemple (num) : f = x^2
  [examen tf]

```

## Splines cubiques naturelles (`n-spline`, BA4)

_Des cubiques raccordées en C², avec s″ = 0 aux deux bouts._

### Niveau 1

```
Spline cubique naturelle des points (−1 ; 1), (0 ; 0), (1 ; 5) : s(x) = a + bx + cx² + d₁x³ sur [−1 ; 0] et a + bx + cx² + d₂x³ sur [0 ; 1] (les raccords C² en 0 donnent les mêmes a, b, c). Trouve a, b, c, d₁ et d₂.
  [guided]  a
    (s(0) = a.)
    = □   (trous : 0)   ← s(0) = y(0) = 0
  — s(1) − s(−1) = 2b.  [juge value]  départ : (5 − 1)/2
    = □   (trous : 2)   ← (5 − 1)/2
  — s(1) + s(−1) = 2a + 4c/3.  [juge value]  départ : 3·(5 + 1 − 2·0)/4
    = □   (trous : 9/2)   ← Car d₂ = −d₁ : les termes en x³ s'annulent dans la somme
  — s″(−1) = 2c − 6d₁ = 0.  [juge value]  départ : (9/2)/3
    = □   (trous : 3/2)   ← d₁ = c/3
  — s″(1) = 2c + 6d₂ = 0.  [juge value]  départ : −(9/2)/3
    = □   (trous : −3/2)   ← d₂ = −c/3
    (s(x) = 2x + (9/2)x² + (3/2)x³ sur [−1 ; 0] et 2x + (9/2)x² − (3/2)x³ sur [0 ; 1].)
  aides : Écris les 3 conditions de raccord en 0 (valeur, pente, courbure : mêmes a, b, c), puis s″ = 0 aux deux bouts, puis les données. | s″(−1) = 2c − 6d₁ = □ ; s(1) − s(−1) = □·b | a = 0, b = 2, c = 9/2, d₁ = 3/2, d₂ = −3/2.

Spline cubique naturelle des points (−1 ; −4), (0 ; −2), (1 ; 2) : s(x) = a + bx + cx² + d₁x³ sur [−1 ; 0] et a + bx + cx² + d₂x³ sur [0 ; 1] (les raccords C² en 0 donnent les mêmes a, b, c). Trouve a, b, c, d₁ et d₂.
  [guided]  a
    (s(0) = a.)
    = □   (trous : −2)   ← s(0) = y(0) = −2
  — s(1) − s(−1) = 2b.  [juge value]  départ : (2 − (−4))/2
    = □   (trous : 3)   ← (2 − (−4))/2
  — s(1) + s(−1) = 2a + 4c/3.  [juge value]  départ : 3·(2 + (−4) − 2·(−2))/4
    = □   (trous : 3/2)   ← Car d₂ = −d₁ : les termes en x³ s'annulent dans la somme
  — s″(−1) = 2c − 6d₁ = 0.  [juge value]  départ : (3/2)/3
    = □   (trous : 1/2)   ← d₁ = c/3
  — s″(1) = 2c + 6d₂ = 0.  [juge value]  départ : −(3/2)/3
    = □   (trous : −1/2)   ← d₂ = −c/3
    (s(x) = −2 + 3x + (3/2)x² + (1/2)x³ sur [−1 ; 0] et −2 + 3x + (3/2)x² − (1/2)x³ sur [0 ; 1].)
  aides : Écris les 3 conditions de raccord en 0 (valeur, pente, courbure : mêmes a, b, c), puis s″ = 0 aux deux bouts, puis les données. | s″(−1) = 2c − 6d₁ = □ ; s(1) − s(−1) = □·b | a = −2, b = 3, c = 3/2, d₁ = 1/2, d₂ = −1/2.

Spline cubique naturelle des points (−1 ; 1), (0 ; −3), (1 ; −3) : s(x) = a + bx + cx² + d₁x³ sur [−1 ; 0] et a + bx + cx² + d₂x³ sur [0 ; 1] (les raccords C² en 0 donnent les mêmes a, b, c). Trouve a, b, c, d₁ et d₂.
  [guided]  a
    (s(0) = a.)
    = □   (trous : −3)   ← s(0) = y(0) = −3
  — s(1) − s(−1) = 2b.  [juge value]  départ : ((−3) − 1)/2
    = □   (trous : −2)   ← (−3 − 1)/2
  — s(1) + s(−1) = 2a + 4c/3.  [juge value]  départ : 3·((−3) + 1 − 2·(−3))/4
    = □   (trous : 3)   ← Car d₂ = −d₁ : les termes en x³ s'annulent dans la somme
  — s″(−1) = 2c − 6d₁ = 0.  [juge value]  départ : (3)/3
    = □   (trous : 1)   ← d₁ = c/3
  — s″(1) = 2c + 6d₂ = 0.  [juge value]  départ : −(3)/3
    = □   (trous : −1)   ← d₂ = −c/3
    (s(x) = −3 − 2x + 3x² + x³ sur [−1 ; 0] et −3 − 2x + 3x² − x³ sur [0 ; 1].)
  aides : Écris les 3 conditions de raccord en 0 (valeur, pente, courbure : mêmes a, b, c), puis s″ = 0 aux deux bouts, puis les données. | s″(−1) = 2c − 6d₁ = □ ; s(1) − s(−1) = □·b | a = −3, b = −2, c = 3, d₁ = 1, d₂ = −1.

```

### Niveau 2

```
Spline cubique naturelle des points (−1 ; 6), (0 ; 3), (1 ; 2) : s(x) = a + bx + cx² + d₁x³ sur [−1 ; 0] et a + bx + cx² + d₂x³ sur [0 ; 1] (les raccords C² en 0 donnent les mêmes a, b, c). Trouve a, b, c, d₁ et d₂.
  [guided]  a
    ? Spline naturelle : quelles conditions aux bords x = −1 et x = 1 ? ✔ s″(−1) = s″(1) = 0 / · s′(−1) = s′(1) = 0 / · Aucune : les conditions d'interpolation suffisent
    (s(0) = a.)
    = □   (trous : 3)   ← s(0) = y(0) = 3
  — s(1) − s(−1) = 2b.  [juge value]  départ : b
    = □   (trous : −2)   ← (2 − 6)/2
  — s(1) + s(−1) = 2a + 4c/3.  [juge value]  départ : c
    = □   (trous : 3/2)   ← Car d₂ = −d₁ : les termes en x³ s'annulent dans la somme
  — s″(−1) = 2c − 6d₁ = 0.  [juge value]  départ : d_1
    = □   (trous : 1/2)   ← d₁ = c/3
  — s″(1) = 2c + 6d₂ = 0.  [juge value]  départ : d_2
    = □   (trous : −1/2)   ← d₂ = −c/3
    (s(x) = 3 − 2x + (3/2)x² + (1/2)x³ sur [−1 ; 0] et 3 − 2x + (3/2)x² − (1/2)x³ sur [0 ; 1].)
  aides : Écris les 3 conditions de raccord en 0 (valeur, pente, courbure : mêmes a, b, c), puis s″ = 0 aux deux bouts, puis les données. | s″(−1) = 2c − 6d₁ = □ ; s(1) − s(−1) = □·b | a = 3, b = −2, c = 3/2, d₁ = 1/2, d₂ = −1/2.
  pièges : n_spline_natural_first

Spline cubique naturelle des points (−1 ; −6), (0 ; −1), (1 ; −4) : s(x) = a + bx + cx² + d₁x³ sur [−1 ; 0] et a + bx + cx² + d₂x³ sur [0 ; 1] (les raccords C² en 0 donnent les mêmes a, b, c). Trouve a, b, c, d₁ et d₂.
  [guided]  a
    ? Spline naturelle : quelles conditions aux bords x = −1 et x = 1 ? ✔ s″(−1) = s″(1) = 0 / · s′(−1) = s′(1) = 0 / · Aucune : les conditions d'interpolation suffisent
    (s(0) = a.)
    = □   (trous : −1)   ← s(0) = y(0) = −1
  — s(1) − s(−1) = 2b.  [juge value]  départ : b
    = □   (trous : 1)   ← (−4 − (−6))/2
  — s(1) + s(−1) = 2a + 4c/3.  [juge value]  départ : c
    = □   (trous : −6)   ← Car d₂ = −d₁ : les termes en x³ s'annulent dans la somme
  — s″(−1) = 2c − 6d₁ = 0.  [juge value]  départ : d_1
    = □   (trous : −2)   ← d₁ = c/3
  — s″(1) = 2c + 6d₂ = 0.  [juge value]  départ : d_2
    = □   (trous : 2)   ← d₂ = −c/3
    (s(x) = −1 + x − 6x² − 2x³ sur [−1 ; 0] et −1 + x − 6x² + 2x³ sur [0 ; 1].)
  aides : Écris les 3 conditions de raccord en 0 (valeur, pente, courbure : mêmes a, b, c), puis s″ = 0 aux deux bouts, puis les données. | s″(−1) = 2c − 6d₁ = □ ; s(1) − s(−1) = □·b | a = −1, b = 1, c = −6, d₁ = −2, d₂ = 2.
  pièges : n_spline_natural_first

Spline cubique naturelle des points (−1 ; −6), (0 ; −2), (1 ; −6) : s(x) = a + bx + cx² + d₁x³ sur [−1 ; 0] et a + bx + cx² + d₂x³ sur [0 ; 1] (les raccords C² en 0 donnent les mêmes a, b, c). Trouve a, b, c, d₁ et d₂.
  [guided]  a
    ? Spline naturelle : quelles conditions aux bords x = −1 et x = 1 ? ✔ s″(−1) = s″(1) = 0 / · s′(−1) = s′(1) = 0 / · Aucune : les conditions d'interpolation suffisent
    (s(0) = a.)
    = □   (trous : −2)   ← s(0) = y(0) = −2
  — s(1) − s(−1) = 2b.  [juge value]  départ : b
    = □   (trous : 0)   ← (−6 − (−6))/2
  — s(1) + s(−1) = 2a + 4c/3.  [juge value]  départ : c
    = □   (trous : −6)   ← Car d₂ = −d₁ : les termes en x³ s'annulent dans la somme
  — s″(−1) = 2c − 6d₁ = 0.  [juge value]  départ : d_1
    = □   (trous : −2)   ← d₁ = c/3
  — s″(1) = 2c + 6d₂ = 0.  [juge value]  départ : d_2
    = □   (trous : 2)   ← d₂ = −c/3
    (s(x) = −2 − 6x² − 2x³ sur [−1 ; 0] et −2 − 6x² + 2x³ sur [0 ; 1].)
  aides : Écris les 3 conditions de raccord en 0 (valeur, pente, courbure : mêmes a, b, c), puis s″ = 0 aux deux bouts, puis les données. | s″(−1) = 2c − 6d₁ = □ ; s(1) − s(−1) = □·b | a = −2, b = 0, c = −6, d₁ = −2, d₂ = 2.
  pièges : n_spline_natural_first

```

### Niveau 3

```
Spline cubique naturelle des points (−1 ; 2), (0 ; −3), (1 ; −2) : s(x) = a + bx + cx² + d₁x³ sur [−1 ; 0] et a + bx + cx² + d₂x³ sur [0 ; 1] (les raccords C² en 0 donnent les mêmes a, b, c). Trouve a, b, c, d₁ et d₂.
  [tap, suivre l'erreur, menu menu]  a
    ? Il reste 2 degrés de liberté. Lesquels fixent la spline naturelle ? ✔ Courbure nulle aux deux bouts / · Pentes imposées aux deux bouts / · Même cubique sur les deux morceaux (not-a-knot)
    (s(0) = a.)
    = −3   ← s(0) = y(0) = −3
  — s(1) − s(−1) = 2b.  [juge value]  départ : b
    = −2   ← (−2 − 2)/2
  — s(1) + s(−1) = 2a + 4c/3.  [juge value]  départ : c
    = 9/2   ← Car d₂ = −d₁ : les termes en x³ s'annulent dans la somme
  — s″(−1) = 2c − 6d₁ = 0.  [juge value]  départ : d_1
    = 3/2   ← d₁ = c/3
  — s″(1) = 2c + 6d₂ = 0.  [juge value]  départ : d_2
    = −3/2   ← d₂ = −c/3
    (s(x) = −3 − 2x + (9/2)x² + (3/2)x³ sur [−1 ; 0] et −3 − 2x + (9/2)x² − (3/2)x³ sur [0 ; 1].)
  aides : Écris les 3 conditions de raccord en 0 (valeur, pente, courbure : mêmes a, b, c), puis s″ = 0 aux deux bouts, puis les données. | s″(−1) = 2c − 6d₁ = □ ; s(1) − s(−1) = □·b | a = −3, b = −2, c = 9/2, d₁ = 3/2, d₂ = −3/2.
  pièges : n_spline_natural_first

Spline cubique naturelle des points (−1 ; 2), (0 ; −2), (1 ; −2) : s(x) = a + bx + cx² + d₁x³ sur [−1 ; 0] et a + bx + cx² + d₂x³ sur [0 ; 1] (les raccords C² en 0 donnent les mêmes a, b, c). Trouve a, b, c, d₁ et d₂.
  [tap, suivre l'erreur, menu menu]  a
    ? Il reste 2 degrés de liberté. Lesquels fixent la spline naturelle ? ✔ Courbure nulle aux deux bouts / · Pentes imposées aux deux bouts / · Même cubique sur les deux morceaux (not-a-knot)
    (s(0) = a.)
    = −2   ← s(0) = y(0) = −2
  — s(1) − s(−1) = 2b.  [juge value]  départ : b
    = −2   ← (−2 − 2)/2
  — s(1) + s(−1) = 2a + 4c/3.  [juge value]  départ : c
    = 3   ← Car d₂ = −d₁ : les termes en x³ s'annulent dans la somme
  — s″(−1) = 2c − 6d₁ = 0.  [juge value]  départ : d_1
    = 1   ← d₁ = c/3
  — s″(1) = 2c + 6d₂ = 0.  [juge value]  départ : d_2
    = −1   ← d₂ = −c/3
    (s(x) = −2 − 2x + 3x² + x³ sur [−1 ; 0] et −2 − 2x + 3x² − x³ sur [0 ; 1].)
  aides : Écris les 3 conditions de raccord en 0 (valeur, pente, courbure : mêmes a, b, c), puis s″ = 0 aux deux bouts, puis les données. | s″(−1) = 2c − 6d₁ = □ ; s(1) − s(−1) = □·b | a = −2, b = −2, c = 3, d₁ = 1, d₂ = −1.
  pièges : n_spline_natural_first

Spline cubique naturelle des points (−1 ; −3), (0 ; 0), (1 ; −5) : s(x) = a + bx + cx² + d₁x³ sur [−1 ; 0] et a + bx + cx² + d₂x³ sur [0 ; 1] (les raccords C² en 0 donnent les mêmes a, b, c). Trouve a, b, c, d₁ et d₂.
  [tap, suivre l'erreur, menu menu]  a
    ? Il reste 2 degrés de liberté. Lesquels fixent la spline naturelle ? ✔ Courbure nulle aux deux bouts / · Pentes imposées aux deux bouts / · Même cubique sur les deux morceaux (not-a-knot)
    (s(0) = a.)
    = 0   ← s(0) = y(0) = 0
  — s(1) − s(−1) = 2b.  [juge value]  départ : b
    = −1   ← (−5 − (−3))/2
  — s(1) + s(−1) = 2a + 4c/3.  [juge value]  départ : c
    = −6   ← Car d₂ = −d₁ : les termes en x³ s'annulent dans la somme
  — s″(−1) = 2c − 6d₁ = 0.  [juge value]  départ : d_1
    = −2   ← d₁ = c/3
  — s″(1) = 2c + 6d₂ = 0.  [juge value]  départ : d_2
    = 2   ← d₂ = −c/3
    (s(x) = −x − 6x² − 2x³ sur [−1 ; 0] et −x − 6x² + 2x³ sur [0 ; 1].)
  aides : Écris les 3 conditions de raccord en 0 (valeur, pente, courbure : mêmes a, b, c), puis s″ = 0 aux deux bouts, puis les données. | s″(−1) = 2c − 6d₁ = □ ; s(1) − s(−1) = □·b | a = 0, b = −1, c = −6, d₁ = −2, d₂ = 2.
  pièges : n_spline_natural_first

```

### Niveau 4

```
Spline cubique naturelle des points (−1 ; 2), (0 ; 1), (1 ; 4) : s(x) = a + bx + cx² + d₁x³ sur [−1 ; 0] et a + bx + cx² + d₂x³ sur [0 ; 1] (les raccords C² en 0 donnent les mêmes a, b, c). Trouve a, b, c, d₁ et d₂.
  [free, suivre l'erreur]  a
    (s(0) = a.)
    = 1   ← s(0) = y(0) = 1
  — s(1) − s(−1) = 2b.  [juge value]  départ : b
    = 1   ← (4 − 2)/2
  — s(1) + s(−1) = 2a + 4c/3.  [juge value]  départ : c
    = 3   ← Car d₂ = −d₁ : les termes en x³ s'annulent dans la somme
  — s″(−1) = 2c − 6d₁ = 0.  [juge value]  départ : d_1
    = 1   ← d₁ = c/3
  — s″(1) = 2c + 6d₂ = 0.  [juge value]  départ : d_2
    = −1   ← d₂ = −c/3
    (s(x) = 1 + x + 3x² + x³ sur [−1 ; 0] et 1 + x + 3x² − x³ sur [0 ; 1].)
  aides : Écris les 3 conditions de raccord en 0 (valeur, pente, courbure : mêmes a, b, c), puis s″ = 0 aux deux bouts, puis les données. | s″(−1) = 2c − 6d₁ = □ ; s(1) − s(−1) = □·b | a = 1, b = 1, c = 3, d₁ = 1, d₂ = −1.

Spline cubique naturelle des points (−1 ; −1), (0 ; −3), (1 ; 1) : s(x) = a + bx + cx² + d₁x³ sur [−1 ; 0] et a + bx + cx² + d₂x³ sur [0 ; 1] (les raccords C² en 0 donnent les mêmes a, b, c). Trouve a, b, c, d₁ et d₂.
  [free, suivre l'erreur]  a
    (s(0) = a.)
    = −3   ← s(0) = y(0) = −3
  — s(1) − s(−1) = 2b.  [juge value]  départ : b
    = 1   ← (1 − (−1))/2
  — s(1) + s(−1) = 2a + 4c/3.  [juge value]  départ : c
    = 9/2   ← Car d₂ = −d₁ : les termes en x³ s'annulent dans la somme
  — s″(−1) = 2c − 6d₁ = 0.  [juge value]  départ : d_1
    = 3/2   ← d₁ = c/3
  — s″(1) = 2c + 6d₂ = 0.  [juge value]  départ : d_2
    = −3/2   ← d₂ = −c/3
    (s(x) = −3 + x + (9/2)x² + (3/2)x³ sur [−1 ; 0] et −3 + x + (9/2)x² − (3/2)x³ sur [0 ; 1].)
  aides : Écris les 3 conditions de raccord en 0 (valeur, pente, courbure : mêmes a, b, c), puis s″ = 0 aux deux bouts, puis les données. | s″(−1) = 2c − 6d₁ = □ ; s(1) − s(−1) = □·b | a = −3, b = 1, c = 9/2, d₁ = 3/2, d₂ = −3/2.

Spline cubique naturelle des points (−1 ; −9), (0 ; −3), (1 ; −5) : s(x) = a + bx + cx² + d₁x³ sur [−1 ; 0] et a + bx + cx² + d₂x³ sur [0 ; 1] (les raccords C² en 0 donnent les mêmes a, b, c). Trouve a, b, c, d₁ et d₂.
  [free, suivre l'erreur]  a
    (s(0) = a.)
    = −3   ← s(0) = y(0) = −3
  — s(1) − s(−1) = 2b.  [juge value]  départ : b
    = 2   ← (−5 − (−9))/2
  — s(1) + s(−1) = 2a + 4c/3.  [juge value]  départ : c
    = −6   ← Car d₂ = −d₁ : les termes en x³ s'annulent dans la somme
  — s″(−1) = 2c − 6d₁ = 0.  [juge value]  départ : d_1
    = −2   ← d₁ = c/3
  — s″(1) = 2c + 6d₂ = 0.  [juge value]  départ : d_2
    = 2   ← d₂ = −c/3
    (s(x) = −3 + 2x − 6x² − 2x³ sur [−1 ; 0] et −3 + 2x − 6x² + 2x³ sur [0 ; 1].)
  aides : Écris les 3 conditions de raccord en 0 (valeur, pente, courbure : mêmes a, b, c), puis s″ = 0 aux deux bouts, puis les données. | s″(−1) = 2c − 6d₁ = □ ; s(1) − s(−1) = □·b | a = −3, b = 2, c = −6, d₁ = −2, d₂ = 2.

```

### Niveau 5

```
Spline cubique naturelle de sin sur [0 ; π], n sous-intervalles. Elle est exacte au bord, puisque sin″ = 0 en 0 et en π.
  [tableau à lire, sans aide]
    n | max|sin − s|
    4 | 1.066e-03
    8 | 6.312e-05
    16 | 3.889e-06
    32 | 2.422e-07
  question : Quel est l'ordre de convergence observé ?
      ✔ 4 (rapport ≈ 16 quand n double)   · 2 (comme l'interpolation linéaire)   · 3 (le degré des morceaux)   · 16 (le rapport)

Spline cubique naturelle de sin sur [0 ; π], n sous-intervalles. Elle est exacte au bord, puisque sin″ = 0 en 0 et en π.
  [tableau à lire, sans aide]
    n | max|sin − s|
    4 | 1.066e-03
    8 | 6.312e-05
    16 | 3.889e-06
    32 | 2.422e-07
  question : Quel est l'ordre de convergence observé ?
      · 3 (le degré des morceaux)   · 2 (comme l'interpolation linéaire)   ✔ 4 (rapport ≈ 16 quand n double)   · 16 (le rapport)

Spline cubique naturelle de sin sur [0 ; π], n sous-intervalles. Elle est exacte au bord, puisque sin″ = 0 en 0 et en π.
  [tableau à lire, sans aide]
    n | max|sin − s|
    4 | 1.066e-03
    8 | 6.312e-05
    16 | 3.889e-06
    32 | 2.422e-07
  question : Quel est l'ordre de convergence observé ?
      · 3 (le degré des morceaux)   ✔ 4 (rapport ≈ 16 quand n double)   · 2 (comme l'interpolation linéaire)   · 16 (le rapport)

```

### Variantes d'examen

```
Une spline cubique interpole 7 points (donc 6 sous-intervalles). On impose la continuité de s, s′ et s″ aux nœuds intérieurs. Combien de degrés de liberté reste-t-il ?
  ✔ 2   · 0 [n_spline_count]   · 3 [n_spline_count]   · 1 [n_spline_count]
  [examen mcq]
  pièges : n_spline_count

Vrai ou faux ?
  « Une spline cubique est de classe C² sur [a ; b] : s, s′ et s″ sont continues aux nœuds. » → VRAI
  [examen tf]

```

## Moindres carrés : équations normales à la main (`n-least-squares`, BA4)

_Plus de points que d'inconnues : on résout AᵀA·α = Aᵀy._

### Niveau 1

```
Moindres carrés : trouve y = a₀ + a₁x la plus proche des points (−1 ; −3), (0 ; 8), (1 ; 6). Les équations normales sont [[m, Σx], [Σx, Σx²]]·(a₀ ; a₁) = (Σy ; Σxy).
  [guided]  (−1) + 0 + 1
    (Σx.)
    = □   (trous : 0)   ← Somme des abscisses
  — Σx².  [juge value]  départ : (−1)² + 0² + 1²
    = □   (trous : 2)   ← Somme des carrés
  — Σy.  [juge value]  départ : (−3) + 8 + 6
    = □   (trous : 11)   ← Somme des ordonnées
  — Σxy.  [juge value]  départ : (−1)·(−3) + 0·8 + 1·6
    = □   (trous : 9)   ← Somme des produits
  — Résous [[3, 0], [0, 2]]·(a₀ ; a₁) = (11 ; 9). D'abord a₁.  [juge value]  départ : a_1
    = □   (trous : 9/2)   ← Élimine a₀ entre les deux équations
  — Puis a₀.  [juge value]  départ : a_0
    = □   (trous : 11/3)   ← a₀ = (11 − 0·a₁)/3 ; y = 11/3 + (9/2)x
  aides : Trop d'équations pour les inconnues : on résout les équations normales AᵀA·α = Aᵀy. | AᵀA = [[3, 0], [0, □]] | AᵀA = [[3, 0], [0, 2]], Aᵀy = (11 ; 9), donc a₁ = 9/2 et a₀ = 11/3.

Moindres carrés : trouve y = a₀ + a₁x la plus proche des points (0 ; −2), (1 ; −4), (2 ; 7). Les équations normales sont [[m, Σx], [Σx, Σx²]]·(a₀ ; a₁) = (Σy ; Σxy).
  [guided]  0 + 1 + 2
    (Σx.)
    = □   (trous : 3)   ← Somme des abscisses
  — Σx².  [juge value]  départ : 0² + 1² + 2²
    = □   (trous : 5)   ← Somme des carrés
  — Σy.  [juge value]  départ : (−2) + (−4) + 7
    = □   (trous : 1)   ← Somme des ordonnées
  — Σxy.  [juge value]  départ : 0·(−2) + 1·(−4) + 2·7
    = □   (trous : 10)   ← Somme des produits
  — Résous [[3, 3], [3, 5]]·(a₀ ; a₁) = (1 ; 10). D'abord a₁.  [juge value]  départ : a_1
    = □   (trous : 9/2)   ← Élimine a₀ entre les deux équations
  — Puis a₀.  [juge value]  départ : a_0
    = □   (trous : −25/6)   ← a₀ = (1 − 3·a₁)/3 ; y = −25/6 + (9/2)x
  aides : Trop d'équations pour les inconnues : on résout les équations normales AᵀA·α = Aᵀy. | AᵀA = [[3, 3], [3, □]] | AᵀA = [[3, 3], [3, 5]], Aᵀy = (1 ; 10), donc a₁ = 9/2 et a₀ = −25/6.

Moindres carrés : trouve y = a₀ + a₁x la plus proche des points (−2 ; −4), (0 ; 8), (2 ; 8). Les équations normales sont [[m, Σx], [Σx, Σx²]]·(a₀ ; a₁) = (Σy ; Σxy).
  [guided]  (−2) + 0 + 2
    (Σx.)
    = □   (trous : 0)   ← Somme des abscisses
  — Σx².  [juge value]  départ : (−2)² + 0² + 2²
    = □   (trous : 8)   ← Somme des carrés
  — Σy.  [juge value]  départ : (−4) + 8 + 8
    = □   (trous : 12)   ← Somme des ordonnées
  — Σxy.  [juge value]  départ : (−2)·(−4) + 0·8 + 2·8
    = □   (trous : 24)   ← Somme des produits
  — Résous [[3, 0], [0, 8]]·(a₀ ; a₁) = (12 ; 24). D'abord a₁.  [juge value]  départ : a_1
    = □   (trous : 3)   ← Élimine a₀ entre les deux équations
  — Puis a₀.  [juge value]  départ : a_0
    = □   (trous : 4)   ← a₀ = (12 − 0·a₁)/3 ; y = 4 + 3x
  aides : Trop d'équations pour les inconnues : on résout les équations normales AᵀA·α = Aᵀy. | AᵀA = [[3, 0], [0, □]] | AᵀA = [[3, 0], [0, 8]], Aᵀy = (12 ; 24), donc a₁ = 3 et a₀ = 4.

```

### Niveau 2

```
Moindres carrés : trouve y = a₀ + a₁x la plus proche des points (−2 ; 2), (1 ; −2), (2 ; 4), (3 ; 0).
  [guided]  [[1,1,1,1],[-2,1,2,3]]·[[1,-2],[1,1],[1,2],[1,3]]
    (AᵀA, avec A = [[1,−2],[1,1],[1,2],[1,3]] (une ligne par point).)
    = [[4,4],[4,18]]   (cases à remplir : (2,2))   ← [[m, Σf], [Σf, Σf²]] avec f = x
  — Aᵀy.  [juge mat]  départ : [[1,1,1,1],[-2,1,2,3]]·(2 ; -2 ; 4 ; 0)
    = (4 ; 2)   (cases à remplir : (2,1))   ← (Σy ; Σxy)
  — Résous [[4, 4], [4, 18]]·(a₀ ; a₁) = (4 ; 2). D'abord a₁.  [juge value]  départ : a_1
    = □   (trous : −1/7)   ← Élimine a₀ entre les deux équations
  — Puis a₀.  [juge value]  départ : a_0
    = □   (trous : 8/7)   ← a₀ = (4 − 4·a₁)/4 ; y = 8/7 − (1/7)x
  aides : Trop d'équations pour les inconnues : on résout les équations normales AᵀA·α = Aᵀy. | AᵀA = [[4, 4], [4, □]] | AᵀA = [[4, 4], [4, 18]], Aᵀy = (4 ; 2), donc a₁ = −1/7 et a₀ = 8/7.

Moindres carrés : trouve y = a₀ + a₁x la plus proche des points (−1 ; 8), (0 ; −1), (1 ; −2).
  [guided]  [[1,1,1],[-1,0,1]]·[[1,-1],[1,0],[1,1]]
    (AᵀA, avec A = [[1,−1],[1,0],[1,1]] (une ligne par point).)
    = [[3,0],[0,2]]   (cases à remplir : (2,2))   ← [[m, Σf], [Σf, Σf²]] avec f = x
  — Aᵀy.  [juge mat]  départ : [[1,1,1],[-1,0,1]]·(8 ; -1 ; -2)
    = (5 ; -10)   (cases à remplir : (2,1))   ← (Σy ; Σxy)
  — Résous [[3, 0], [0, 2]]·(a₀ ; a₁) = (5 ; −10). D'abord a₁.  [juge value]  départ : a_1
    = □   (trous : −5)   ← Élimine a₀ entre les deux équations
  — Puis a₀.  [juge value]  départ : a_0
    = □   (trous : 5/3)   ← a₀ = (5 − 0·a₁)/3 ; y = 5/3 − 5x
  aides : Trop d'équations pour les inconnues : on résout les équations normales AᵀA·α = Aᵀy. | AᵀA = [[3, 0], [0, □]] | AᵀA = [[3, 0], [0, 2]], Aᵀy = (5 ; −10), donc a₁ = −5 et a₀ = 5/3.

Moindres carrés : trouve y = a₀ + a₁x la plus proche des points (−1 ; 5), (0 ; 4), (2 ; 8).
  [guided]  [[1,1,1],[-1,0,2]]·[[1,-1],[1,0],[1,2]]
    (AᵀA, avec A = [[1,−1],[1,0],[1,2]] (une ligne par point).)
    = [[3,1],[1,5]]   (cases à remplir : (2,2))   ← [[m, Σf], [Σf, Σf²]] avec f = x
  — Aᵀy.  [juge mat]  départ : [[1,1,1],[-1,0,2]]·(5 ; 4 ; 8)
    = (17 ; 11)   (cases à remplir : (2,1))   ← (Σy ; Σxy)
  — Résous [[3, 1], [1, 5]]·(a₀ ; a₁) = (17 ; 11). D'abord a₁.  [juge value]  départ : a_1
    = □   (trous : 8/7)   ← Élimine a₀ entre les deux équations
  — Puis a₀.  [juge value]  départ : a_0
    = □   (trous : 37/7)   ← a₀ = (17 − 1·a₁)/3 ; y = 37/7 + (8/7)x
  aides : Trop d'équations pour les inconnues : on résout les équations normales AᵀA·α = Aᵀy. | AᵀA = [[3, 1], [1, □]] | AᵀA = [[3, 1], [1, 5]], Aᵀy = (17 ; 11), donc a₁ = 8/7 et a₀ = 37/7.

```

### Niveau 3

```
Moindres carrés : trouve y = a₀ + a₁x la plus proche des points (−1 ; −4), (1 ; −4), (2 ; −1).
  [tap, suivre l'erreur, menu menu]  [[1,1,1],[-1,1,2]]·[[1,-1],[1,1],[1,2]]
    ? 3 points et 2 inconnues. Comment trouver a₀ et a₁ ? ✔ Résoudre les équations normales AᵀA·α = Aᵀy / · Résoudre A·α = y avec 2 des 3 équations
    (AᵀA, avec A = [[1,−1],[1,1],[1,2]] (une ligne par point).)
    = [[3,2],[2,6]]   ← [[m, Σf], [Σf, Σf²]] avec f = x
  — Aᵀy.  [juge mat]  départ : [[1,1,1],[-1,1,2]]·(-4 ; -4 ; -1)
    = (-9 ; -2)   ← (Σy ; Σxy)
  — Résous [[3, 2], [2, 6]]·(a₀ ; a₁) = (−9 ; −2). D'abord a₁.  [juge value]  départ : a_1
    = 6/7   ← Élimine a₀ entre les deux équations
  — Puis a₀.  [juge value]  départ : a_0
    = −25/7   ← a₀ = (−9 − 2·a₁)/3 ; y = −25/7 + (6/7)x
  aides : Trop d'équations pour les inconnues : on résout les équations normales AᵀA·α = Aᵀy. | AᵀA = [[3, 2], [2, □]] | AᵀA = [[3, 2], [2, 6]], Aᵀy = (−9 ; −2), donc a₁ = 6/7 et a₀ = −25/7.
  pièges : n_ls_interp

Moindres carrés : trouve y = a₀ + a₁x la plus proche des points (−2 ; −3), (0 ; 1), (2 ; 6).
  [tap, suivre l'erreur, menu menu]  [[1,1,1],[-2,0,2]]·[[1,-2],[1,0],[1,2]]
    ? 3 points et 2 inconnues. Comment trouver a₀ et a₁ ? ✔ Résoudre les équations normales AᵀA·α = Aᵀy / · Résoudre A·α = y avec 2 des 3 équations
    (AᵀA, avec A = [[1,−2],[1,0],[1,2]] (une ligne par point).)
    = [[3,0],[0,8]]   ← [[m, Σf], [Σf, Σf²]] avec f = x
  — Aᵀy.  [juge mat]  départ : [[1,1,1],[-2,0,2]]·(-3 ; 1 ; 6)
    = (4 ; 18)   ← (Σy ; Σxy)
  — Résous [[3, 0], [0, 8]]·(a₀ ; a₁) = (4 ; 18). D'abord a₁.  [juge value]  départ : a_1
    = 9/4   ← Élimine a₀ entre les deux équations
  — Puis a₀.  [juge value]  départ : a_0
    = 4/3   ← a₀ = (4 − 0·a₁)/3 ; y = 4/3 + (9/4)x
  aides : Trop d'équations pour les inconnues : on résout les équations normales AᵀA·α = Aᵀy. | AᵀA = [[3, 0], [0, □]] | AᵀA = [[3, 0], [0, 8]], Aᵀy = (4 ; 18), donc a₁ = 9/4 et a₀ = 4/3.
  pièges : n_ls_interp

Moindres carrés : trouve y = a₀ + a₁x la plus proche des points (0 ; 2), (1 ; −5), (2 ; 4).
  [tap, suivre l'erreur, menu menu]  [[1,1,1],[0,1,2]]·[[1,0],[1,1],[1,2]]
    ? 3 points et 2 inconnues. Comment trouver a₀ et a₁ ? ✔ Résoudre les équations normales AᵀA·α = Aᵀy / · Résoudre A·α = y avec 2 des 3 équations
    (AᵀA, avec A = [[1,0],[1,1],[1,2]] (une ligne par point).)
    = [[3,3],[3,5]]   ← [[m, Σf], [Σf, Σf²]] avec f = x
  — Aᵀy.  [juge mat]  départ : [[1,1,1],[0,1,2]]·(2 ; -5 ; 4)
    = (1 ; 3)   ← (Σy ; Σxy)
  — Résous [[3, 3], [3, 5]]·(a₀ ; a₁) = (1 ; 3). D'abord a₁.  [juge value]  départ : a_1
    = 1   ← Élimine a₀ entre les deux équations
  — Puis a₀.  [juge value]  départ : a_0
    = −2/3   ← a₀ = (1 − 3·a₁)/3 ; y = −2/3 + x
  aides : Trop d'équations pour les inconnues : on résout les équations normales AᵀA·α = Aᵀy. | AᵀA = [[3, 3], [3, □]] | AᵀA = [[3, 3], [3, 5]], Aᵀy = (1 ; 3), donc a₁ = 1 et a₀ = −2/3.
  pièges : n_ls_interp

```

### Niveau 4

```
Moindres carrés : trouve y = a₀ + a₁x² la plus proche des points (−1 ; 1), (0 ; −1), (2 ; −3), (3 ; −5).
  [free, suivre l'erreur]  [[1,1,1,1],[1,0,4,9]]·[[1,1],[1,0],[1,4],[1,9]]
    (AᵀA, avec A = [[1,1],[1,0],[1,4],[1,9]] (une ligne par point).)
    = [[4,14],[14,98]]   ← [[m, Σf], [Σf, Σf²]] avec f = x²
  — Aᵀy.  [juge mat]  départ : [[1,1,1,1],[1,0,4,9]]·(1 ; -1 ; -3 ; -5)
    = (-8 ; -56)   ← (Σy ; Σx²y)
  — Résous [[4, 14], [14, 98]]·(a₀ ; a₁) = (−8 ; −56). D'abord a₁.  [juge value]  départ : a_1
    = −4/7   ← Élimine a₀ entre les deux équations
  — Puis a₀.  [juge value]  départ : a_0
    = 0   ← a₀ = (−8 − 14·a₁)/4 ; y = −(4/7)x²
  aides : Trop d'équations pour les inconnues : on résout les équations normales AᵀA·α = Aᵀy. | AᵀA = [[4, 14], [14, □]] | AᵀA = [[4, 14], [14, 98]], Aᵀy = (−8 ; −56), donc a₁ = −4/7 et a₀ = 0.

Moindres carrés : trouve y = a₀ + a₁x la plus proche des points (−1 ; −3), (1 ; −4), (3 ; 3).
  [free, suivre l'erreur]  [[1,1,1],[-1,1,3]]·[[1,-1],[1,1],[1,3]]
    (AᵀA, avec A = [[1,−1],[1,1],[1,3]] (une ligne par point).)
    = [[3,3],[3,11]]   ← [[m, Σf], [Σf, Σf²]] avec f = x
  — Aᵀy.  [juge mat]  départ : [[1,1,1],[-1,1,3]]·(-3 ; -4 ; 3)
    = (-4 ; 8)   ← (Σy ; Σxy)
  — Résous [[3, 3], [3, 11]]·(a₀ ; a₁) = (−4 ; 8). D'abord a₁.  [juge value]  départ : a_1
    = 3/2   ← Élimine a₀ entre les deux équations
  — Puis a₀.  [juge value]  départ : a_0
    = −17/6   ← a₀ = (−4 − 3·a₁)/3 ; y = −17/6 + (3/2)x
  aides : Trop d'équations pour les inconnues : on résout les équations normales AᵀA·α = Aᵀy. | AᵀA = [[3, 3], [3, □]] | AᵀA = [[3, 3], [3, 11]], Aᵀy = (−4 ; 8), donc a₁ = 3/2 et a₀ = −17/6.

Moindres carrés : trouve y = a₀ + a₁x² la plus proche des points (−2 ; 8), (−1 ; 4), (0 ; 7), (3 ; 3).
  [free, suivre l'erreur]  [[1,1,1,1],[4,1,0,9]]·[[1,4],[1,1],[1,0],[1,9]]
    (AᵀA, avec A = [[1,4],[1,1],[1,0],[1,9]] (une ligne par point).)
    = [[4,14],[14,98]]   ← [[m, Σf], [Σf, Σf²]] avec f = x²
  — Aᵀy.  [juge mat]  départ : [[1,1,1,1],[4,1,0,9]]·(8 ; 4 ; 7 ; 3)
    = (22 ; 63)   ← (Σy ; Σx²y)
  — Résous [[4, 14], [14, 98]]·(a₀ ; a₁) = (22 ; 63). D'abord a₁.  [juge value]  départ : a_1
    = −2/7   ← Élimine a₀ entre les deux équations
  — Puis a₀.  [juge value]  départ : a_0
    = 13/2   ← a₀ = (22 − 14·a₁)/4 ; y = 13/2 − (2/7)x²
  aides : Trop d'équations pour les inconnues : on résout les équations normales AᵀA·α = Aᵀy. | AᵀA = [[4, 14], [14, □]] | AᵀA = [[4, 14], [14, 98]], Aᵀy = (22 ; 63), donc a₁ = −2/7 et a₀ = 13/2.

```

### Niveau 5

```
Complète les moindres carrés de l'examen 2021 (traduits de Matlab) : lsq ajuste n fonctions de base max(0, x − i/(n + 1)), lsq_line une droite.
  [code python, 4 trous, sans aide]
    | def basis(n, i, x):
    |     return max(0.0, x - i / (n + 1))
    | 
    | def lsq(xs, ys, n):
    |     # mat[j][i] = phi_i(x_j) : une ligne par donnee, une colonne par fonction de base
    |     m = len(xs)
    |     mat = zeros2(m, n)
    |     for i in range(n):
    |         for j in range(m):
    |             mat[j][i] = basis(n, i, ⟦xs[j]⟧)
    |     At = transpose(mat)
    |     return ⟦solve(matmul(At, mat), matvec(At, ys))⟧
    | 
    | def lsq_line(xs, ys):
    |     m = len(xs)
    |     A = zeros2(m, 2)
    |     for j in range(m):
    |         A[j][0] = ⟦1.0⟧
    |         A[j][1] = ⟦xs[j]⟧
    |     At = transpose(A)
    |     return solve(matmul(At, A), matvec(At, ys))
    test : lsq_line([0, 1, 2], [1, 3, 4]) → [1.1666666666666667, 1.5]
    test : lsq_line([-1, 0, 1], [1, 0.5, 1/3]) → [0.611111111111111, -0.33333333333333337]
    test : lsq([0.25, 0.5, 0.75, 1.0], [0.0, 0.5, 1.0, 1.5], 2) → [0.2539682539682564, 1.9047619047619004]
  puis : Le programme affiche lsq_line([-1, 0, 1, 2], [3, -3, 8, 4]) :
      [tableau à lire, sans aide]
        a₀ | a₁
        2.300000e+00 | 1.400000e+00
      question : Que peut-on en dire ? Une ou plusieurs réponses justes.
          · Elle passe par tous les points [n_ls_interp]   · La droite des moindres carrés est y = 7/5 + (23/10)x   ✔ La droite des moindres carrés est y = 23/10 + (7/5)x   ✔ Elle minimise la somme des carrés des écarts verticaux
          pièges : n_ls_interp
      pièges : n_ls_interp
  pièges : n_ls_index_swap, n_ls_aat, n_ls_interp

Complète les moindres carrés de l'examen 2021 (traduits de Matlab) : lsq ajuste n fonctions de base max(0, x − i/(n + 1)), lsq_line une droite.
  [code python, 4 trous, sans aide]
    | def basis(n, i, x):
    |     return max(0.0, x - i / (n + 1))
    | 
    | def lsq(xs, ys, n):
    |     # mat[j][i] = phi_i(x_j) : une ligne par donnee, une colonne par fonction de base
    |     m = len(xs)
    |     mat = zeros2(m, n)
    |     for i in range(n):
    |         for j in range(m):
    |             mat[j][i] = basis(n, i, ⟦xs[j]⟧)
    |     At = transpose(mat)
    |     return ⟦solve(matmul(At, mat), matvec(At, ys))⟧
    | 
    | def lsq_line(xs, ys):
    |     m = len(xs)
    |     A = zeros2(m, 2)
    |     for j in range(m):
    |         A[j][0] = ⟦1.0⟧
    |         A[j][1] = ⟦xs[j]⟧
    |     At = transpose(A)
    |     return solve(matmul(At, A), matvec(At, ys))
    test : lsq_line([0, 1, 2], [1, 3, 4]) → [1.1666666666666667, 1.5]
    test : lsq_line([-1, 0, 1], [1, 0.5, 1/3]) → [0.611111111111111, -0.33333333333333337]
    test : lsq([0.25, 0.5, 0.75, 1.0], [0.0, 0.5, 1.0, 1.5], 2) → [0.2539682539682564, 1.9047619047619004]
  puis : Le programme affiche lsq_line([-1, 2, 3], [-2, -5, 7]) :
      [tableau à lire, sans aide]
        a₀ | a₁
        -2.000000e+00 | 1.500000e+00
      question : Que peut-on en dire ? Une ou plusieurs réponses justes.
          ✔ Elle minimise la somme des carrés des écarts verticaux   · La droite des moindres carrés est y = 3/2 − 2x   ✔ La droite des moindres carrés est y = −2 + (3/2)x   · Elle passe par tous les points [n_ls_interp]
          pièges : n_ls_interp
      pièges : n_ls_interp
  pièges : n_ls_index_swap, n_ls_aat, n_ls_interp

Complète les moindres carrés de l'examen 2021 (traduits de Matlab) : lsq ajuste n fonctions de base max(0, x − i/(n + 1)), lsq_line une droite.
  [code python, 4 trous, sans aide]
    | def basis(n, i, x):
    |     return max(0.0, x - i / (n + 1))
    | 
    | def lsq(xs, ys, n):
    |     # mat[j][i] = phi_i(x_j) : une ligne par donnee, une colonne par fonction de base
    |     m = len(xs)
    |     mat = zeros2(m, n)
    |     for i in range(n):
    |         for j in range(m):
    |             mat[j][i] = basis(n, i, ⟦xs[j]⟧)
    |     At = transpose(mat)
    |     return ⟦solve(matmul(At, mat), matvec(At, ys))⟧
    | 
    | def lsq_line(xs, ys):
    |     m = len(xs)
    |     A = zeros2(m, 2)
    |     for j in range(m):
    |         A[j][0] = ⟦1.0⟧
    |         A[j][1] = ⟦xs[j]⟧
    |     At = transpose(A)
    |     return solve(matmul(At, A), matvec(At, ys))
    test : lsq_line([0, 1, 2], [1, 3, 4]) → [1.1666666666666667, 1.5]
    test : lsq_line([-1, 0, 1], [1, 0.5, 1/3]) → [0.611111111111111, -0.33333333333333337]
    test : lsq([0.25, 0.5, 0.75, 1.0], [0.0, 0.5, 1.0, 1.5], 2) → [0.2539682539682564, 1.9047619047619004]
  puis : Le programme affiche lsq_line([-2, 0, 2], [0, 3, -3]) :
      [tableau à lire, sans aide]
        a₀ | a₁
        0.000000e+00 | -7.500000e-01
      question : Que peut-on en dire ? Une ou plusieurs réponses justes.
          ✔ Elle minimise la somme des carrés des écarts verticaux   · La droite des moindres carrés est y = −3/4 + 0x   ✔ La droite des moindres carrés est y = −(3/4)x   · Elle passe par tous les points [n_ls_interp]
          pièges : n_ls_interp
      pièges : n_ls_interp
  pièges : n_ls_index_swap, n_ls_aat, n_ls_interp

```

### Variantes d'examen

```
Moindres carrés (examen 2021) : mat a une ligne par donnée et une colonne par fonction de base.def basis(n, i, x):
    return max(0.0, x - i / (n + 1))

def lsq(xs, ys, n):
    # mat[j][i] = phi_i(x_j) : une ligne par donnee, une colonne par fonction de base
    m = len(xs)
    mat = zeros2(m, n)
    for i in range(n):
        for j in range(m):
            mat[j][i] = basis(n, i, xs[j])
    At = transpose(mat)
    return ???

def lsq_line(xs, ys):
    m = len(xs)
    A = zeros2(m, 2)
    for j in range(m):
        A[j][0] = 1.0
        A[j][1] = xs[j]
    At = transpose(A)
    return solve(matmul(At, A), matvec(At, ys))
Que faut-il écrire à la place de ??? ?
  · solve(matmul(At, mat), matvec(mat, ys))   · solve(mat, ys) [n_ls_interp]   ✔ solve(matmul(At, mat), matvec(At, ys))   · solve(matmul(mat, At), matvec(mat, ys)) [n_ls_aat]
  [examen mcq]
  pièges : n_ls_aat, n_ls_interp

Vrai ou faux ?
  « La droite des moindres carrés de 3 points (ou plus) passe toujours par au moins un des points. » → FAUX
    contre-exemple (num) : pts = (0 ; 0), (1 ; 1), (2 ; 0)
  [examen tf]

Droite des moindres carrés y = a₀ + a₁x des points (−2 ; −4), (0 ; 6), (1 ; −3), (2 ; 1). Donne a₁.
  [free, sans aide, examen coef]  a_1
    = 4/5   ← AᵀA = [[4, 1], [1, 9]], Aᵀy = (0 ; 7)

```

## Différences finies progressives, rétrogrades, centrées (`n-fd-basic`, BA4)

_Approcher f′(x̄) par un quotient de différences, et connaître l'ordre de chaque formule._

### Niveau 1

```
f(x) = 2x³ − x² + x − 2, x̄ = 1, h = 0,5. On donne f(0,5) = −1,5, f(1) = 0, f(1,5) = 4. Calcule les trois quotients.
  [guided]  (4 − 0)/0,5
    (Différence progressive δ⁺f = (f(x̄ + h) − f(x̄))/h :)
    = □   (trous : 8)   ← Le quotient
  — Différence rétrograde δ⁻f = (f(x̄) − f(x̄ − h))/h :  [juge value]  départ : (0 + 1,5)/0,5
    = □   (trous : 3)   ← Le quotient
  — Différence centrée δᶜf = (f(x̄ + h) − f(x̄ − h))/(2h) :  [juge value]  départ : (4 + 1,5)/1
    = □   (trous : 5,5)   ← Le quotient
  aides : Progressive : vers l'avant ; rétrograde : vers l'arrière ; centrée : des deux côtés, divisée par 2h. | δᶜf = (4 − −1,5)/□ | δ⁺f = 8, δ⁻f = 3, δᶜf = 5,5.
  pièges : n_fd_centered_h

f(x) = 2x³ + x² + 2x − 2, x̄ = −1, h = 0,5. On donne f(−1,5) = −9,5, f(−1) = −5, f(−0,5) = −3. Calcule les trois quotients.
  [guided]  (−3 + 5)/0,5
    (Différence progressive δ⁺f = (f(x̄ + h) − f(x̄))/h :)
    = □   (trous : 4)   ← Le quotient
  — Différence rétrograde δ⁻f = (f(x̄) − f(x̄ − h))/h :  [juge value]  départ : (−5 + 9,5)/0,5
    = □   (trous : 9)   ← Le quotient
  — Différence centrée δᶜf = (f(x̄ + h) − f(x̄ − h))/(2h) :  [juge value]  départ : (−3 + 9,5)/1
    = □   (trous : 6,5)   ← Le quotient
  aides : Progressive : vers l'avant ; rétrograde : vers l'arrière ; centrée : des deux côtés, divisée par 2h. | δᶜf = (−3 − −9,5)/□ | δ⁺f = 4, δ⁻f = 9, δᶜf = 6,5.
  pièges : n_fd_centered_h

f(x) = x⁴ − 2x³ − x² + 3x − 1, x̄ = 1, h = 0,1. On donne f(0,9) = 0,0881, f(1) = 0, f(1,1) = −0,1079. Calcule les trois quotients.
  [guided]  (−0,1079 − 0)/0,1
    (Différence progressive δ⁺f = (f(x̄ + h) − f(x̄))/h :)
    = □   (trous : −1,079)   ← Le quotient
  — Différence rétrograde δ⁻f = (f(x̄) − f(x̄ − h))/h :  [juge value]  départ : (0 − 0,0881)/0,1
    = □   (trous : −0,881)   ← Le quotient
  — Différence centrée δᶜf = (f(x̄ + h) − f(x̄ − h))/(2h) :  [juge value]  départ : (−0,1079 − 0,0881)/0,2
    = □   (trous : −0,98)   ← Le quotient
  aides : Progressive : vers l'avant ; rétrograde : vers l'arrière ; centrée : des deux côtés, divisée par 2h. | δᶜf = (−0,1079 − 0,0881)/□ | δ⁺f = −1,079, δ⁻f = −0,881, δᶜf = −0,98.
  pièges : n_fd_centered_h

```

### Niveau 2

```
f(x) = x³ − 2x² + 2x + 3, x̄ = 2, h = 0,2. On donne f(1,8) = 5,952, f(2) = 7, f(2,2) = 8,368. Écris chaque quotient avec ces valeurs, puis calcule-le.
  [guided]  δ
    (Différence progressive δ⁺f :)
    = (8,368 − 7)/□   (trous : (8,368 − 7)/0,2)   ← La formule, avec les valeurs
    = 6,84
  — Différence rétrograde δ⁻f :  [juge value]  départ : δ
    = (7 − 5,952)/□   (trous : (7 − 5,952)/0,2)   ← La formule, avec les valeurs
    = 5,24
  — Différence centrée δᶜf :  [juge value]  départ : δ
    = (8,368 − 5,952)/□   (trous : (8,368 − 5,952)/0,4)   ← La formule, avec les valeurs
    = 6,04
  aides : Le dénominateur est la distance entre les deux points utilisés : h, ou 2h pour la centrée. | δᶜf = (f(2,2) − f(1,8))/(2·0,2) | δᶜf = (8,368 − 5,952)/0,4 = 6,04.
  pièges : n_fd_centered_h

f(x) = 2x³ + 2x², x̄ = 2, h = 0,1. On donne f(1,9) = 20,938, f(2) = 24, f(2,1) = 27,342. Écris chaque quotient avec ces valeurs, puis calcule-le.
  [guided]  δ
    (Différence progressive δ⁺f :)
    = (27,342 − 24)/□   (trous : (27,342 − 24)/0,1)   ← La formule, avec les valeurs
    = 33,42
  — Différence rétrograde δ⁻f :  [juge value]  départ : δ
    = (24 − 20,938)/□   (trous : (24 − 20,938)/0,1)   ← La formule, avec les valeurs
    = 30,62
  — Différence centrée δᶜf :  [juge value]  départ : δ
    = (27,342 − 20,938)/□   (trous : (27,342 − 20,938)/0,2)   ← La formule, avec les valeurs
    = 32,02
  aides : Le dénominateur est la distance entre les deux points utilisés : h, ou 2h pour la centrée. | δᶜf = (f(2,1) − f(1,9))/(2·0,1) | δᶜf = (27,342 − 20,938)/0,2 = 32,02.
  pièges : n_fd_centered_h

f(x) = x³ − x² + 2x − 3, x̄ = −1, h = 0,5. On donne f(−1,5) = −11,625, f(−1) = −7, f(−0,5) = −4,375. Écris chaque quotient avec ces valeurs, puis calcule-le.
  [guided]  δ
    (Différence progressive δ⁺f :)
    = (−4,375 + 7)/□   (trous : (−4,375 + 7)/0,5)   ← La formule, avec les valeurs
    = 5,25
  — Différence rétrograde δ⁻f :  [juge value]  départ : δ
    = (−7 + 11,625)/□   (trous : (−7 + 11,625)/0,5)   ← La formule, avec les valeurs
    = 9,25
  — Différence centrée δᶜf :  [juge value]  départ : δ
    = (−4,375 + 11,625)/□   (trous : (−4,375 + 11,625)/1)   ← La formule, avec les valeurs
    = 7,25
  aides : Le dénominateur est la distance entre les deux points utilisés : h, ou 2h pour la centrée. | δᶜf = (f(−0,5) − f(−1,5))/(2·0,5) | δᶜf = (−4,375 − −11,625)/1 = 7,25.
  pièges : n_fd_centered_h

```

### Niveau 3

```
f(x) = −2x³ − 3x, x̄ = 2, h = 0,2. On donne f(1,8) = −17,064, f(2) = −22, f(2,2) = −27,896. Choisis la formule de la différence centrée, calcule-la, puis donne son ordre.
  [tap, suivre l'erreur]  δ
    ? Quelle est la différence centrée ? ✔ (f(x̄ + h) − f(x̄ − h))/(2h) / · (f(x̄ + h) − f(x̄ − h))/h / · (f(x̄ + h) − f(x̄))/(2h)
    = (−27,896 + 17,064)/0,4   ← 2h = 0,4
    = −27,08   ← δᶜf
  — Ordre de la différence centrée : son erreur se comporte comme hᵖ.  [juge value]  départ : p
    ? Pourquoi ? ✔ Les termes en h·f″ se compensent : l'erreur est (h²/6)·f‴(ξ) / · Comme la progressive, l'erreur est (h/2)·f″(ξ) / · Elle utilise deux points, donc elle est d'ordre 2
    = 2   ← Ordre 2
  aides : Centrée : les deux points sont de part et d'autre de x̄, à la distance 2h l'un de l'autre. | δᶜf = (−27,896 − −17,064)/□ | δᶜf = −27,08 ; ordre 2.
  pièges : n_fd_centered_h

f(x) = 2x³ − x + 2, x̄ = −1, h = 0,2. On donne f(−1,2) = −0,256, f(−1) = 1, f(−0,8) = 1,776. Choisis la formule de la différence centrée, calcule-la, puis donne son ordre.
  [tap, suivre l'erreur]  δ
    ? Quelle est la différence centrée ? ✔ (f(x̄ + h) − f(x̄ − h))/(2h) / · (f(x̄ + h) − f(x̄ − h))/h / · (f(x̄ + h) − f(x̄))/(2h)
    = (1,776 + 0,256)/0,4   ← 2h = 0,4
    = 5,08   ← δᶜf
  — Ordre de la différence centrée : son erreur se comporte comme hᵖ.  [juge value]  départ : p
    ? Pourquoi ? ✔ Les termes en h·f″ se compensent : l'erreur est (h²/6)·f‴(ξ) / · Comme la progressive, l'erreur est (h/2)·f″(ξ) / · Elle utilise deux points, donc elle est d'ordre 2
    = 2   ← Ordre 2
  aides : Centrée : les deux points sont de part et d'autre de x̄, à la distance 2h l'un de l'autre. | δᶜf = (1,776 − −0,256)/□ | δᶜf = 5,08 ; ordre 2.
  pièges : n_fd_centered_h

f(x) = −x³ + x² + 3x − 3, x̄ = −1, h = 0,5. On donne f(−1,5) = −1,875, f(−1) = −4, f(−0,5) = −4,125. Choisis la formule de la différence centrée, calcule-la, puis donne son ordre.
  [tap, suivre l'erreur]  δ
    ? Quelle est la différence centrée ? ✔ (f(x̄ + h) − f(x̄ − h))/(2h) / · (f(x̄ + h) − f(x̄ − h))/h / · (f(x̄ + h) − f(x̄))/(2h)
    = (−4,125 + 1,875)/1   ← 2h = 1
    = −2,25   ← δᶜf
  — Ordre de la différence centrée : son erreur se comporte comme hᵖ.  [juge value]  départ : p
    ? Pourquoi ? ✔ Les termes en h·f″ se compensent : l'erreur est (h²/6)·f‴(ξ) / · Comme la progressive, l'erreur est (h/2)·f″(ξ) / · Elle utilise deux points, donc elle est d'ordre 2
    = 2   ← Ordre 2
  aides : Centrée : les deux points sont de part et d'autre de x̄, à la distance 2h l'un de l'autre. | δᶜf = (−4,125 − −1,875)/□ | δᶜf = −2,25 ; ordre 2.
  pièges : n_fd_centered_h

```

### Niveau 4

```
f(x) = x³ − 3x² − x − 2, x̄ = −1, h = 0,5. On donne f(−1,5) = −10,625, f(−1) = −5, f(−0,5) = −2,375. Calcule δ⁺f et δᶜf, la vraie dérivée f′(x̄), puis l'erreur δᶜf − f′(x̄).
  [free, suivre l'erreur]  δ
    (Différence progressive :)
    = (−2,375 + 5)/0,5
    = 5,25   ← δ⁺f
  — Différence centrée :  [juge value]  départ : δ
    = (−2,375 + 10,625)/1
    = 8,25   ← δᶜf
  — La vraie dérivée :  [juge value]  départ : y
    = 8   ← f′(x) = 3x² − 6x − 1
  — L'erreur de la centrée :  [juge value]  départ : r
    = 8,25 − (8)
    = 0,25   ← = h²·f‴(x̄)/6 = 0,25·(6)/6 : exact pour un polynôme de degré ≤ 4
  aides : Calcule les quotients, puis dérive f. L'erreur de la centrée vaut h²·f‴(x̄)/6 pour un polynôme de degré ≤ 4. | δᶜf − f′(x̄) = 8,25 − □ | δᶜf − f′(x̄) = 0,25 = h²·f‴(x̄)/6, alors que δ⁺f − f′(x̄) = −2,75 ≈ h·f″(x̄)/2 = −3.
  pièges : n_fd_centered_h

f(x) = 2x³ + 2x² − 2x, x̄ = 2, h = 0,5. On donne f(1,5) = 8,25, f(2) = 20, f(2,5) = 38,75. Calcule δ⁺f et δᶜf, la vraie dérivée f′(x̄), puis l'erreur δᶜf − f′(x̄).
  [free, suivre l'erreur]  δ
    (Différence progressive :)
    = (38,75 − 20)/0,5
    = 37,5   ← δ⁺f
  — Différence centrée :  [juge value]  départ : δ
    = (38,75 − 8,25)/1
    = 30,5   ← δᶜf
  — La vraie dérivée :  [juge value]  départ : y
    = 30   ← f′(x) = 6x² + 4x − 2
  — L'erreur de la centrée :  [juge value]  départ : r
    = 30,5 − (30)
    = 0,5   ← = h²·f‴(x̄)/6 = 0,25·(12)/6 : exact pour un polynôme de degré ≤ 4
  aides : Calcule les quotients, puis dérive f. L'erreur de la centrée vaut h²·f‴(x̄)/6 pour un polynôme de degré ≤ 4. | δᶜf − f′(x̄) = 30,5 − □ | δᶜf − f′(x̄) = 0,5 = h²·f‴(x̄)/6, alors que δ⁺f − f′(x̄) = 7,5 ≈ h·f″(x̄)/2 = 7.
  pièges : n_fd_centered_h

f(x) = −2x⁴ − 2x − 3, x̄ = −1, h = 0,2. On donne f(−1,2) = −4,7472, f(−1) = −3, f(−0,8) = −2,2192. Calcule δ⁺f et δᶜf, la vraie dérivée f′(x̄), puis l'erreur δᶜf − f′(x̄).
  [free, suivre l'erreur]  δ
    (Différence progressive :)
    = (−2,2192 + 3)/0,2
    = 3,904   ← δ⁺f
  — Différence centrée :  [juge value]  départ : δ
    = (−2,2192 + 4,7472)/0,4
    = 6,32   ← δᶜf
  — La vraie dérivée :  [juge value]  départ : y
    = 6   ← f′(x) = −8x³ − 2
  — L'erreur de la centrée :  [juge value]  départ : r
    = 6,32 − (6)
    = 0,32   ← = h²·f‴(x̄)/6 = 0,04·(48)/6 : exact pour un polynôme de degré ≤ 4
  aides : Calcule les quotients, puis dérive f. L'erreur de la centrée vaut h²·f‴(x̄)/6 pour un polynôme de degré ≤ 4. | δᶜf − f′(x̄) = 6,32 − □ | δᶜf − f′(x̄) = 0,32 = h²·f‴(x̄)/6, alors que δ⁺f − f′(x̄) = −2,096 ≈ h·f″(x̄)/2 = −2,4.
  pièges : n_fd_centered_h

```

### Niveau 5

```
Complète les quatre formules : progressive, rétrograde, centrée pour f′(x), et centrée pour f″(x).
  [code python, 4 trous, sans aide]
    | def fd_forward(f, x, h):
    |     return ⟦(f(x + h) - f(x)) / h⟧
    | 
    | def fd_backward(f, x, h):
    |     return ⟦(f(x) - f(x - h)) / h⟧
    | 
    | def fd_centered(f, x, h):
    |     return ⟦(f(x + h) - f(x - h)) / (2 * h)⟧
    | 
    | def fd_second(f, x, h):
    |     return ⟦(f(x + h) - 2 * f(x) + f(x - h)) / (h * h)⟧
    test : def f(x): return x**3 ; fd_forward(f, 1, 0.1) → 3.31
    test : def f(x): return x**3 ; fd_backward(f, 1, 0.1) → 2.71
    test : def f(x): return x**3 ; fd_centered(f, 1, 0.1) → 3.01
    test : def f(x): return x**3 ; fd_second(f, 1, 0.1) → 6.0
  puis : Le programme est appelé pour f = sin en x̄ = 1 ; voici les erreurs obtenues.
      [tableau à lire, sans aide]
        h | progressive | centrée
        1e-1 | 4.294e-02 | 9.001e-04
        1e-2 | 4.216e-03 | 9.005e-06
        1e-3 | 4.208e-04 | 9.005e-08
        1e-4 | 4.207e-05 | 9.004e-10
      question : Erreurs |f′(1) − Dₕf| pour f = sin, quand h est divisé par 10. Que peut-on en déduire ? Une ou plusieurs réponses justes.
          ✔ La différence centrée est d'ordre 2 (erreur divisée par 100)   ✔ La différence progressive est d'ordre 1 (erreur divisée par 10)   · La différence centrée est d'ordre 1, comme la progressive   · La différence progressive est d'ordre 2
  pièges : n_fd_centered_h

Complète les quatre formules : progressive, rétrograde, centrée pour f′(x), et centrée pour f″(x).
  [code python, 4 trous, sans aide]
    | def fd_forward(f, x, h):
    |     return ⟦(f(x + h) - f(x)) / h⟧
    | 
    | def fd_backward(f, x, h):
    |     return ⟦(f(x) - f(x - h)) / h⟧
    | 
    | def fd_centered(f, x, h):
    |     return ⟦(f(x + h) - f(x - h)) / (2 * h)⟧
    | 
    | def fd_second(f, x, h):
    |     return ⟦(f(x + h) - 2 * f(x) + f(x - h)) / (h * h)⟧
    test : def f(x): return x**3 ; fd_forward(f, 1, 0.1) → 3.31
    test : def f(x): return x**3 ; fd_backward(f, 1, 0.1) → 2.71
    test : def f(x): return x**3 ; fd_centered(f, 1, 0.1) → 3.01
    test : def f(x): return x**3 ; fd_second(f, 1, 0.1) → 6.0
  puis : Le programme est appelé pour f = sin en x̄ = 1 ; voici les erreurs obtenues.
      [tableau à lire, sans aide]
        h | progressive | centrée
        1e-1 | 4.294e-02 | 9.001e-04
        1e-2 | 4.216e-03 | 9.005e-06
        1e-3 | 4.208e-04 | 9.005e-08
        1e-4 | 4.207e-05 | 9.004e-10
      question : Erreurs |f′(1) − Dₕf| pour f = sin, quand h est divisé par 10. Que peut-on en déduire ? Une ou plusieurs réponses justes.
          ✔ La différence centrée est d'ordre 2 (erreur divisée par 100)   · La différence centrée est d'ordre 1, comme la progressive   ✔ La différence progressive est d'ordre 1 (erreur divisée par 10)   · La différence progressive est d'ordre 2
  pièges : n_fd_centered_h

Complète les quatre formules : progressive, rétrograde, centrée pour f′(x), et centrée pour f″(x).
  [code python, 4 trous, sans aide]
    | def fd_forward(f, x, h):
    |     return ⟦(f(x + h) - f(x)) / h⟧
    | 
    | def fd_backward(f, x, h):
    |     return ⟦(f(x) - f(x - h)) / h⟧
    | 
    | def fd_centered(f, x, h):
    |     return ⟦(f(x + h) - f(x - h)) / (2 * h)⟧
    | 
    | def fd_second(f, x, h):
    |     return ⟦(f(x + h) - 2 * f(x) + f(x - h)) / (h * h)⟧
    test : def f(x): return x**3 ; fd_forward(f, 1, 0.1) → 3.31
    test : def f(x): return x**3 ; fd_backward(f, 1, 0.1) → 2.71
    test : def f(x): return x**3 ; fd_centered(f, 1, 0.1) → 3.01
    test : def f(x): return x**3 ; fd_second(f, 1, 0.1) → 6.0
  puis : Le programme est appelé pour f = ln en x̄ = 1 ; voici les erreurs obtenues.
      [tableau à lire, sans aide]
        h | progressive | centrée
        1e-1 | 4.690e-02 | 3.353e-03
        1e-2 | 4.967e-03 | 3.334e-05
        1e-3 | 4.997e-04 | 3.333e-07
        1e-4 | 5.000e-05 | 3.333e-09
      question : Erreurs |f′(1) − Dₕf| pour f = ln, quand h est divisé par 10. Que peut-on en déduire ? Une ou plusieurs réponses justes.
          ✔ La différence progressive est d'ordre 1 (erreur divisée par 10)   · La différence progressive est d'ordre 2   · La différence centrée est d'ordre 1, comme la progressive   ✔ La différence centrée est d'ordre 2 (erreur divisée par 100)
  pièges : n_fd_centered_h

```

### Variantes d'examen

```
hprogressivecentrée1e-14.294e-029.001e-041e-24.216e-039.005e-061e-34.208e-049.005e-081e-44.207e-059.004e-10Erreurs |f′(1) − Dₕf| pour f = sin, quand h est divisé par 10. Que peut-on en déduire ? Une ou plusieurs réponses justes.
  · La différence centrée est d'ordre 1, comme la progressive   · La différence progressive est d'ordre 2   ✔ La différence progressive est d'ordre 1 (erreur divisée par 10)   ✔ La différence centrée est d'ordre 2 (erreur divisée par 100)
  [examen mcq]

Vrai ou faux ?
  « La différence progressive (f(x̄ + h) − f(x̄))/h est d'ordre 2 : son erreur est majorée par C·h². » → FAUX
    contre-exemple (num) : f = x^2, x0 = 0
  [examen tf]

```

## Compromis entre arrondi et troncature (`n-fd-roundoff`, BA4)

_En machine, un pas trop petit fait exploser l'arrondi : trouver le meilleur pas h*._

### Niveau 1

```
On approche f′(x̄) par la différence progressive, en machine. Près de x̄, max|f| ≈ M₀ = 9 et max|f″| ≈ M₂ = 1 ; ε est l'erreur d'arrondi relative (ε ≈ 10⁻¹⁶). L'erreur totale est majorée par E(h) = 1/2h + 18ε/h. Dérive E, puis trouve le pas h* qui la rend minimale.
  [guided]  d/dh (1/2h + 18ε/h)
    = 1/2 − □   (trous : 1/2 − 18ε/h²)   ← La dérivée de 1/h est −1/h²
  — E′(h) = 0 donne le meilleur pas h*. On le note H et on l'écrit en fonction de ε.  [juge equiv]  départ : H
    = □   (trous : 6√ε)   ← h*² = 2ε·9/(1/2) = 36ε
  — Avec ε = 10⁻¹⁶ : h* = □·10⁻⁸.  [juge value]  départ : H/10^(−8)
    = □   (trous : 6)   ← √(10⁻¹⁶) = 10⁻⁸
  aides : La troncature diminue avec h, l'arrondi divisé par h augmente : le minimum est là où E′(h) = 0. | E′(h) = 1/2 − 18ε/□ | E′(h) = 1/2 − 18ε/h² = 0 donne h* = 6√ε, soit 6·10⁻⁸.

On approche f′(x̄) par la différence progressive, en machine. Près de x̄, max|f| ≈ M₀ = 4 et max|f″| ≈ M₂ = 9 ; ε est l'erreur d'arrondi relative (ε ≈ 10⁻¹⁶). L'erreur totale est majorée par E(h) = 9/2h + 8ε/h. Dérive E, puis trouve le pas h* qui la rend minimale.
  [guided]  d/dh (9/2h + 8ε/h)
    = 9/2 − □   (trous : 9/2 − 8ε/h²)   ← La dérivée de 1/h est −1/h²
  — E′(h) = 0 donne le meilleur pas h*. On le note H et on l'écrit en fonction de ε.  [juge equiv]  départ : H
    = □   (trous : 4/3√ε)   ← h*² = 2ε·4/(9/2) = 16/9ε
  — Avec ε = 10⁻¹⁶ : h* = □·10⁻⁸.  [juge value]  départ : H/10^(−8)
    = □   (trous : 4/3)   ← √(10⁻¹⁶) = 10⁻⁸
  aides : La troncature diminue avec h, l'arrondi divisé par h augmente : le minimum est là où E′(h) = 0. | E′(h) = 9/2 − 8ε/□ | E′(h) = 9/2 − 8ε/h² = 0 donne h* = 4/3√ε, soit 4/3·10⁻⁸.

On approche f′(x̄) par la différence progressive, en machine. Près de x̄, max|f| ≈ M₀ = 1 et max|f″| ≈ M₂ = 9 ; ε est l'erreur d'arrondi relative (ε ≈ 10⁻¹⁶). L'erreur totale est majorée par E(h) = 9/2h + 2ε/h. Dérive E, puis trouve le pas h* qui la rend minimale.
  [guided]  d/dh (9/2h + 2ε/h)
    = 9/2 − □   (trous : 9/2 − 2ε/h²)   ← La dérivée de 1/h est −1/h²
  — E′(h) = 0 donne le meilleur pas h*. On le note H et on l'écrit en fonction de ε.  [juge equiv]  départ : H
    = □   (trous : 2/3√ε)   ← h*² = 2ε·1/(9/2) = 4/9ε
  — Avec ε = 10⁻¹⁶ : h* = □·10⁻⁸.  [juge value]  départ : H/10^(−8)
    = □   (trous : 2/3)   ← √(10⁻¹⁶) = 10⁻⁸
  aides : La troncature diminue avec h, l'arrondi divisé par h augmente : le minimum est là où E′(h) = 0. | E′(h) = 9/2 − 2ε/□ | E′(h) = 9/2 − 2ε/h² = 0 donne h* = 2/3√ε, soit 2/3·10⁻⁸.

```

### Niveau 2

```
On approche f′(x̄) par la différence progressive, en machine. Près de x̄, max|f| ≈ M₀ = 1 et max|f″| ≈ M₂ = 4 ; ε est l'erreur d'arrondi relative (ε ≈ 10⁻¹⁶). Écris la borne E(h) de l'erreur, puis trouve le meilleur pas h*.
  [guided]  E
    ? Quelles erreurs E(h) additionne-t-elle ? ✔ Troncature (h/2)·M₂, plus arrondi 2ε·M₀/h / · La troncature (h/2)·M₂ seulement / · Troncature moins arrondi : (h/2)·M₂ − 2ε·M₀/h
    = 2h + □   (trous : 2h + 2ε/h)   ← Troncature + arrondi
  — Sa dérivée :  [juge equiv]  départ : d/dh (2h + 2ε/h)
    = □   (trous : 2 − 2ε/h²)
  — E′(h) = 0 donne le meilleur pas h*. On le note H et on l'écrit en fonction de ε.  [juge equiv]  départ : H
    = □   (trous : √ε)   ← h*² = 2ε·1/(2) = 1ε
  — Avec ε = 10⁻¹⁶ : h* = □·10⁻⁸.  [juge value]  départ : H/10^(−8)
    = □   (trous : 1)   ← √(10⁻¹⁶) = 10⁻⁸
  aides : Deux erreurs se disputent : celle de Taylor, qui diminue avec h, et l'arrondi divisé par h, qui augmente. | E(h) = 2h + □/h | E(h) = 2h + 2ε/h, E′(h) = 2 − 2ε/h², h* = √ε.
  pièges : n_fd_smaller_h

On approche f′(x̄) par la différence progressive, en machine. Près de x̄, max|f| ≈ M₀ = 1 et max|f″| ≈ M₂ = 4 ; ε est l'erreur d'arrondi relative (ε ≈ 10⁻¹⁶). Écris la borne E(h) de l'erreur, puis trouve le meilleur pas h*.
  [guided]  E
    ? Quelles erreurs E(h) additionne-t-elle ? ✔ Troncature (h/2)·M₂, plus arrondi 2ε·M₀/h / · La troncature (h/2)·M₂ seulement / · Troncature moins arrondi : (h/2)·M₂ − 2ε·M₀/h
    = 2h + □   (trous : 2h + 2ε/h)   ← Troncature + arrondi
  — Sa dérivée :  [juge equiv]  départ : d/dh (2h + 2ε/h)
    = □   (trous : 2 − 2ε/h²)
  — E′(h) = 0 donne le meilleur pas h*. On le note H et on l'écrit en fonction de ε.  [juge equiv]  départ : H
    = □   (trous : √ε)   ← h*² = 2ε·1/(2) = 1ε
  — Avec ε = 10⁻¹⁶ : h* = □·10⁻⁸.  [juge value]  départ : H/10^(−8)
    = □   (trous : 1)   ← √(10⁻¹⁶) = 10⁻⁸
  aides : Deux erreurs se disputent : celle de Taylor, qui diminue avec h, et l'arrondi divisé par h, qui augmente. | E(h) = 2h + □/h | E(h) = 2h + 2ε/h, E′(h) = 2 − 2ε/h², h* = √ε.
  pièges : n_fd_smaller_h

On approche f′(x̄) par la différence progressive, en machine. Près de x̄, max|f| ≈ M₀ = 9 et max|f″| ≈ M₂ = 4 ; ε est l'erreur d'arrondi relative (ε ≈ 10⁻¹⁶). Écris la borne E(h) de l'erreur, puis trouve le meilleur pas h*.
  [guided]  E
    ? Quelles erreurs E(h) additionne-t-elle ? ✔ Troncature (h/2)·M₂, plus arrondi 2ε·M₀/h / · La troncature (h/2)·M₂ seulement / · Troncature moins arrondi : (h/2)·M₂ − 2ε·M₀/h
    = 2h + □   (trous : 2h + 18ε/h)   ← Troncature + arrondi
  — Sa dérivée :  [juge equiv]  départ : d/dh (2h + 18ε/h)
    = □   (trous : 2 − 18ε/h²)
  — E′(h) = 0 donne le meilleur pas h*. On le note H et on l'écrit en fonction de ε.  [juge equiv]  départ : H
    = □   (trous : 3√ε)   ← h*² = 2ε·9/(2) = 9ε
  — Avec ε = 10⁻¹⁶ : h* = □·10⁻⁸.  [juge value]  départ : H/10^(−8)
    = □   (trous : 3)   ← √(10⁻¹⁶) = 10⁻⁸
  aides : Deux erreurs se disputent : celle de Taylor, qui diminue avec h, et l'arrondi divisé par h, qui augmente. | E(h) = 2h + □/h | E(h) = 2h + 18ε/h, E′(h) = 2 − 18ε/h², h* = 3√ε.
  pièges : n_fd_smaller_h

```

### Niveau 3

```
Erreurs |f′(1) − (f(1 + h) − f(1))/h| calculées en double précision, pour f = x ↦ x³.
  [tableau à lire]
    h | progressive
    1e-2 | 3.010e-02
    1e-4 | 3.000e-04
    1e-5 | 3.000e-05
    1e-6 | 3.000e-06
    1e-8 | 3.972e-09
    1e-10 | 2.482e-07
    1e-12 | 2.667e-04
    1e-14 | 2.398e-03
  question : Pour quel pas h la différence progressive est-elle la plus précise ?
      ✔ h = 10^−8   · h = 10^−2   · h = 10^−5   · h = 10^−14, le plus petit [n_fd_smaller_h]
      pièges : n_fd_smaller_h
  pièges : n_fd_smaller_h

Erreurs |f′(1) − (f(1 + h) − f(1))/h| calculées en double précision, pour f = sin.
  [tableau à lire]
    h | progressive
    1e-2 | 4.216e-03
    1e-4 | 4.207e-05
    1e-5 | 4.207e-06
    1e-6 | 4.207e-07
    1e-8 | 2.970e-09
    1e-10 | 5.848e-08
    1e-12 | 4.324e-05
    1e-14 | 3.707e-03
  question : Pour quel pas h la différence progressive est-elle la plus précise ?
      ✔ h = 10^−8   · h = 10^−5   · h = 10^−2   · h = 10^−14, le plus petit [n_fd_smaller_h]
      pièges : n_fd_smaller_h
  pièges : n_fd_smaller_h

Erreurs |f′(1) − (f(1 + h) − f(1))/h| calculées en double précision, pour f = x ↦ x³.
  [tableau à lire]
    h | progressive
    1e-2 | 3.010e-02
    1e-4 | 3.000e-04
    1e-5 | 3.000e-05
    1e-6 | 3.000e-06
    1e-8 | 3.972e-09
    1e-10 | 2.482e-07
    1e-12 | 2.667e-04
    1e-14 | 2.398e-03
  question : Pour quel pas h la différence progressive est-elle la plus précise ?
      · h = 10^−14, le plus petit [n_fd_smaller_h]   ✔ h = 10^−8   · h = 10^−2   · h = 10^−5
      pièges : n_fd_smaller_h
  pièges : n_fd_smaller_h

```

### Niveau 4

```
Pour la différence centrée, en machine : E(h) = (h²/6)·M₃ + ε·M₀/h, avec M₀ = 9 et M₃ = 27, soit E(h) = 9/2h² + 9ε/h. Dérive E, trouve h* en fonction de ε, puis son ordre de grandeur.
  [free, suivre l'erreur]  d/dh (9/2h² + 9ε/h)
    = 9h − 9ε/h²   ← E′(h)
  — E′(h) = 0 donne h*³ = 3εM₀/M₃. On note H = h*, en fonction de ε.  [juge equiv]  départ : H
    = ε^(1/3)   ← 3·9/27 = 1
  — Avec ε ≈ 10⁻¹⁶, h* ≈ 10ᵏ.  [juge value]  départ : p
    ? Ordre de grandeur de ∛(10⁻¹⁶) ? ✔ ≈ 4,6·10⁻⁶, soit environ 10⁻⁵ / · 10⁻⁸, comme pour la progressive / · 10⁻¹⁶, le plus petit possible
    = −5   ← ∛(10⁻¹⁶) = 10^(−16/3) ≈ 10⁻⁵
  aides : Même méthode que pour la progressive : E′(h) = 0. La troncature est maintenant en h². | E′(h) = 9h − 9ε/□, puis h*³ = □ | h*³ = 3ε·9/27 = ε, donc h* = ∛ε ≈ 10⁻⁵.
  pièges : n_fd_smaller_h

Pour la différence centrée, en machine : E(h) = (h²/6)·M₃ + ε·M₀/h, avec M₀ = 4 et M₃ = 12, soit E(h) = 2h² + 4ε/h. Dérive E, trouve h* en fonction de ε, puis son ordre de grandeur.
  [free, suivre l'erreur]  d/dh (2h² + 4ε/h)
    = 4h − 4ε/h²   ← E′(h)
  — E′(h) = 0 donne h*³ = 3εM₀/M₃. On note H = h*, en fonction de ε.  [juge equiv]  départ : H
    = ε^(1/3)   ← 3·4/12 = 1
  — Avec ε ≈ 10⁻¹⁶, h* ≈ 10ᵏ.  [juge value]  départ : p
    ? Ordre de grandeur de ∛(10⁻¹⁶) ? ✔ ≈ 4,6·10⁻⁶, soit environ 10⁻⁵ / · 10⁻⁸, comme pour la progressive / · 10⁻¹⁶, le plus petit possible
    = −5   ← ∛(10⁻¹⁶) = 10^(−16/3) ≈ 10⁻⁵
  aides : Même méthode que pour la progressive : E′(h) = 0. La troncature est maintenant en h². | E′(h) = 4h − 4ε/□, puis h*³ = □ | h*³ = 3ε·4/12 = ε, donc h* = ∛ε ≈ 10⁻⁵.
  pièges : n_fd_smaller_h

Pour la différence centrée, en machine : E(h) = (h²/6)·M₃ + ε·M₀/h, avec M₀ = 9 et M₃ = 27, soit E(h) = 9/2h² + 9ε/h. Dérive E, trouve h* en fonction de ε, puis son ordre de grandeur.
  [free, suivre l'erreur]  d/dh (9/2h² + 9ε/h)
    = 9h − 9ε/h²   ← E′(h)
  — E′(h) = 0 donne h*³ = 3εM₀/M₃. On note H = h*, en fonction de ε.  [juge equiv]  départ : H
    = ε^(1/3)   ← 3·9/27 = 1
  — Avec ε ≈ 10⁻¹⁶, h* ≈ 10ᵏ.  [juge value]  départ : p
    ? Ordre de grandeur de ∛(10⁻¹⁶) ? ✔ ≈ 4,6·10⁻⁶, soit environ 10⁻⁵ / · 10⁻⁸, comme pour la progressive / · 10⁻¹⁶, le plus petit possible
    = −5   ← ∛(10⁻¹⁶) = 10^(−16/3) ≈ 10⁻⁵
  aides : Même méthode que pour la progressive : E′(h) = 0. La troncature est maintenant en h². | E′(h) = 9h − 9ε/□, puis h*³ = □ | h*³ = 3ε·9/27 = ε, donc h* = ∛ε ≈ 10⁻⁵.
  pièges : n_fd_smaller_h

```

### Niveau 5

```
Erreurs |f′(0) − Dₕf| des différences progressive et centrée, calculées en double précision, pour f = exp.
  [tableau à lire, sans aide]
    h | progressive | centrée
    1e-2 | 5.017e-03 | 1.667e-05
    1e-4 | 5.000e-05 | 1.667e-09
    1e-5 | 5.000e-06 | 1.210e-11
    1e-6 | 5.000e-07 | 2.676e-11
    1e-8 | 6.077e-09 | 6.077e-09
    1e-10 | 8.274e-08 | 8.274e-08
    1e-12 | 8.890e-05 | 3.339e-05
    1e-14 | 7.993e-04 | 7.993e-04
  question : Que peut-on lire dans ce tableau ? Une ou plusieurs réponses justes.
      ✔ En dessous de 10^−8, l'erreur de la progressive augmente à cause des arrondis   ✔ La centrée atteint son minimum pour un h plus grand que la progressive   · Le meilleur h pour la centrée est vers 10^−14 [n_fd_smaller_h]   · Plus h est petit, plus l'approximation est précise [n_fd_smaller_h]   ✔ Le meilleur h pour la progressive est vers 10^−8
      pièges : n_fd_smaller_h
  pièges : n_fd_smaller_h

Erreurs |f′(1) − Dₕf| des différences progressive et centrée, calculées en double précision, pour f = ln.
  [tableau à lire, sans aide]
    h | progressive | centrée
    1e-2 | 4.967e-03 | 3.334e-05
    1e-4 | 5.000e-05 | 3.333e-09
    1e-5 | 5.000e-06 | 3.433e-11
    1e-6 | 5.001e-07 | 2.642e-11
    1e-8 | 1.108e-08 | 5.264e-10
    1e-10 | 8.269e-08 | 8.274e-08
    1e-12 | 8.890e-05 | 3.339e-05
    1e-14 | 7.993e-04 | 7.993e-04
  question : Que peut-on lire dans ce tableau ? Une ou plusieurs réponses justes.
      ✔ Le meilleur h pour la progressive est vers 10^−8   · Plus h est petit, plus l'approximation est précise [n_fd_smaller_h]   ✔ La centrée atteint son minimum pour un h plus grand que la progressive   · Le meilleur h pour la centrée est vers 10^−14 [n_fd_smaller_h]   ✔ En dessous de 10^−8, l'erreur de la progressive augmente à cause des arrondis
      pièges : n_fd_smaller_h
  pièges : n_fd_smaller_h

Erreurs |f′(0) − Dₕf| des différences progressive et centrée, calculées en double précision, pour f = exp.
  [tableau à lire, sans aide]
    h | progressive | centrée
    1e-2 | 5.017e-03 | 1.667e-05
    1e-4 | 5.000e-05 | 1.667e-09
    1e-5 | 5.000e-06 | 1.210e-11
    1e-6 | 5.000e-07 | 2.676e-11
    1e-8 | 6.077e-09 | 6.077e-09
    1e-10 | 8.274e-08 | 8.274e-08
    1e-12 | 8.890e-05 | 3.339e-05
    1e-14 | 7.993e-04 | 7.993e-04
  question : Que peut-on lire dans ce tableau ? Une ou plusieurs réponses justes.
      ✔ Le meilleur h pour la progressive est vers 10^−8   ✔ En dessous de 10^−8, l'erreur de la progressive augmente à cause des arrondis   · Le meilleur h pour la centrée est vers 10^−14 [n_fd_smaller_h]   ✔ La centrée atteint son minimum pour un h plus grand que la progressive   · Plus h est petit, plus l'approximation est précise [n_fd_smaller_h]
      pièges : n_fd_smaller_h
  pièges : n_fd_smaller_h

```

### Variantes d'examen

```
Vrai ou faux ?
  « Sur un ordinateur, plus le pas h est petit, plus la différence finie (f(x̄ + h) − f(x̄))/h est proche de f′(x̄). » → FAUX
    contre-exemple (num) : f = ln(x), x0 = 1, h = 1e-12
  [examen tf]

```

## Construire une formule de différences finies par Taylor (`n-fd-build`, BA4)

_Choisir les coefficients d'une formule à trois points pour qu'elle soit d'ordre 2._

### Niveau 1

```
On cherche Dₕf(x̄) = (α·f(x̄ − h) + β·f(x̄) + γ·f(x̄ + 2h))/h d'ordre 2 pour f′(x̄). En développant (f(x̄ − h) = A − hB + 1/2h²C − 1/6h³D + … ; f(x̄ + 2h) = A + 2hB + 2h²C + 4/3h³D + …), les conditions sont : α + β + γ = 0 ; −α + 2γ = 1 ; 1/2α + 2γ = 0. Résous ce système.
  [guided]  γ
    (Le coefficient de f(x̄) est nul, celui de f′(x̄) vaut 1, celui de h·f″(x̄) est nul.)
    (Le coefficient γ :)
    = □   (trous : 1/6)
  — Le coefficient β :  [juge value]  départ : β
    = □   (trous : 1/2)
  — Le coefficient α :  [juge value]  départ : α
    = □   (trous : −2/3)
  aides : Commence par l'équation qui a le moins d'inconnues, puis remonte. | 1/2α + 2γ = 0 et −α + 2γ = 1 donnent γ = □ | (α, β, γ) = (−2/3, 1/2, 1/6).

On cherche Dₕf(x̄) = (α·f(x̄) + β·f(x̄ − h) + γ·f(x̄ − 2h))/h d'ordre 2 pour f′(x̄). En développant (f(x̄ − h) = A − hB + 1/2h²C − 1/6h³D + … ; f(x̄ − 2h) = A − 2hB + 2h²C − 4/3h³D + …), les conditions sont : α + β + γ = 0 ; −β − 2γ = 1 ; 1/2β + 2γ = 0. Résous ce système.
  [guided]  γ
    (Le coefficient de f(x̄) est nul, celui de f′(x̄) vaut 1, celui de h·f″(x̄) est nul.)
    (Le coefficient γ :)
    = □   (trous : 1/2)
  — Le coefficient β :  [juge value]  départ : β
    = □   (trous : −2)
  — Le coefficient α :  [juge value]  départ : α
    = □   (trous : 3/2)
  aides : Commence par l'équation qui a le moins d'inconnues, puis remonte. | 1/2β + 2γ = 0 et −β − 2γ = 1 donnent γ = □ | (α, β, γ) = (3/2, −2, 1/2).

On cherche Dₕf(x̄) = (α·f(x̄ − h) + β·f(x̄) + γ·f(x̄ + 2h))/h d'ordre 2 pour f′(x̄). En développant (f(x̄ − h) = A − hB + 1/2h²C − 1/6h³D + … ; f(x̄ + 2h) = A + 2hB + 2h²C + 4/3h³D + …), les conditions sont : α + β + γ = 0 ; −α + 2γ = 1 ; 1/2α + 2γ = 0. Résous ce système.
  [guided]  γ
    (Le coefficient de f(x̄) est nul, celui de f′(x̄) vaut 1, celui de h·f″(x̄) est nul.)
    (Le coefficient γ :)
    = □   (trous : 1/6)
  — Le coefficient β :  [juge value]  départ : β
    = □   (trous : 1/2)
  — Le coefficient α :  [juge value]  départ : α
    = □   (trous : −2/3)
  aides : Commence par l'équation qui a le moins d'inconnues, puis remonte. | 1/2α + 2γ = 0 et −α + 2γ = 1 donnent γ = □ | (α, β, γ) = (−2/3, 1/2, 1/6).

```

### Niveau 2

```
On cherche Dₕf(x̄) = (α·f(x̄ − h) + β·f(x̄) + γ·f(x̄ + h))/h d'ordre 2 pour f′(x̄). On note A = f(x̄), B = f′(x̄), C = f″(x̄), D = f‴(x̄) ; dans les lignes, x désigne x̄. Développe f(x̄ − h) jusqu'au terme en h³, puis écris et résous le système des conditions.
  [guided]  f(x − h)
    = A − hB + □ − □   (trous : A − hB + 1/2h²C − 1/6h³D)   ← Les puissances impaires de h changent de signe si k < 0
  — Les conditions : coefficient de f(x̄) nul, de f′(x̄) égal à 1, de h·f″(x̄) nul.  [juge system]  départ : α + β + γ = 0
    = α + β + γ = 0 ; −α + γ = 1 ; 1/2α + 1/2γ = 0
    = α = −1/2 ; β = 0 ; γ = 1/2
  aides : f(x̄ + kh) = f + kh·f′ + (kh)²/2·f″ + (kh)³/6·f‴ + … | f(x̄ − h) = A − hB + □ − □ | f(x̄ − h) = A − hB + 1/2h²C − 1/6h³D ; (α, β, γ) = (−1/2, 0, 1/2).
  pièges : n_fd_taylor_sign

On cherche Dₕf(x̄) = (α·f(x̄) + β·f(x̄ + h) + γ·f(x̄ + 2h))/h d'ordre 2 pour f′(x̄). On note A = f(x̄), B = f′(x̄), C = f″(x̄), D = f‴(x̄) ; dans les lignes, x désigne x̄. Développe f(x̄ + 2h) jusqu'au terme en h³, puis écris et résous le système des conditions.
  [guided]  f(x + 2h)
    = A + 2hB + □ + □   (trous : A + 2hB + 2h²C + 4/3h³D)   ← Les puissances impaires de h changent de signe si k < 0
  — Les conditions : coefficient de f(x̄) nul, de f′(x̄) égal à 1, de h·f″(x̄) nul.  [juge system]  départ : α + β + γ = 0
    = α + β + γ = 0 ; β + 2γ = 1 ; 1/2β + 2γ = 0
    = α = −3/2 ; β = 2 ; γ = −1/2
  aides : f(x̄ + kh) = f + kh·f′ + (kh)²/2·f″ + (kh)³/6·f‴ + … | f(x̄ + 2h) = A + 2hB + □ + □ | f(x̄ + 2h) = A + 2hB + 2h²C + 4/3h³D ; (α, β, γ) = (−3/2, 2, −1/2).
  pièges : n_fd_taylor_sign

On cherche Dₕf(x̄) = (α·f(x̄ − h) + β·f(x̄) + γ·f(x̄ + 2h))/h d'ordre 2 pour f′(x̄). On note A = f(x̄), B = f′(x̄), C = f″(x̄), D = f‴(x̄) ; dans les lignes, x désigne x̄. Développe f(x̄ + 2h) jusqu'au terme en h³, puis écris et résous le système des conditions.
  [guided]  f(x + 2h)
    = A + 2hB + □ + □   (trous : A + 2hB + 2h²C + 4/3h³D)   ← Les puissances impaires de h changent de signe si k < 0
  — Les conditions : coefficient de f(x̄) nul, de f′(x̄) égal à 1, de h·f″(x̄) nul.  [juge system]  départ : α + β + γ = 0
    = α + β + γ = 0 ; −α + 2γ = 1 ; 1/2α + 2γ = 0
    = α = −2/3 ; β = 1/2 ; γ = 1/6
  aides : f(x̄ + kh) = f + kh·f′ + (kh)²/2·f″ + (kh)³/6·f‴ + … | f(x̄ + 2h) = A + 2hB + □ + □ | f(x̄ + 2h) = A + 2hB + 2h²C + 4/3h³D ; (α, β, γ) = (−2/3, 1/2, 1/6).
  pièges : n_fd_taylor_sign

```

### Niveau 3

```
On cherche Dₕf(x̄) = (α·f(x̄ − h) + β·f(x̄) + γ·f(x̄ + 2h))/h d'ordre 2 pour f′(x̄). Les développements sont : f(x̄ − h) = A − hB + 1/2h²C − 1/6h³D + … ; f(x̄ + 2h) = A + 2hB + 2h²C + 4/3h³D + …. Choisis les conditions, écris le système, puis résous-le.
  [tap, suivre l'erreur]  α + β + γ = 0
    ? Pour une formule d'ordre 2 en f′(x̄), quels coefficients imposes-tu ? ✔ Celui de f(x̄) nul, celui de f′(x̄) égal à 1, celui de h·f″(x̄) nul / · Celui de f(x̄) nul et celui de f′(x̄) égal à 1 / · Ceux de f(x̄), f′(x̄) et h·f″(x̄) tous nuls
    = α + β + γ = 0 ; −α + 2γ = 1 ; 1/2α + 2γ = 0   ← Coefficients de f, f′ et h·f″
    = α = −2/3 ; β = 1/2 ; γ = 1/6
  aides : Regroupe les termes en f(x̄), en f′(x̄), en h·f″(x̄) après division par h. | α + β + γ = 0 ; −α + 2γ = 1 ; □ = 0 | (α, β, γ) = (−2/3, 1/2, 1/6).
  pièges : n_fd_order_conditions

On cherche Dₕf(x̄) = (α·f(x̄ − h) + β·f(x̄) + γ·f(x̄ + h))/h d'ordre 2 pour f′(x̄). Les développements sont : f(x̄ − h) = A − hB + 1/2h²C − 1/6h³D + … ; f(x̄ + h) = A + hB + 1/2h²C + 1/6h³D + …. Choisis les conditions, écris le système, puis résous-le.
  [tap, suivre l'erreur]  α + β + γ = 0
    ? Pour une formule d'ordre 2 en f′(x̄), quels coefficients imposes-tu ? ✔ Celui de f(x̄) nul, celui de f′(x̄) égal à 1, celui de h·f″(x̄) nul / · Celui de f(x̄) nul et celui de f′(x̄) égal à 1 / · Ceux de f(x̄), f′(x̄) et h·f″(x̄) tous nuls
    = α + β + γ = 0 ; −α + γ = 1 ; 1/2α + 1/2γ = 0   ← Coefficients de f, f′ et h·f″
    = α = −1/2 ; β = 0 ; γ = 1/2
  aides : Regroupe les termes en f(x̄), en f′(x̄), en h·f″(x̄) après division par h. | α + β + γ = 0 ; −α + γ = 1 ; □ = 0 | (α, β, γ) = (−1/2, 0, 1/2).
  pièges : n_fd_order_conditions

On cherche Dₕf(x̄) = (α·f(x̄) + β·f(x̄ − h) + γ·f(x̄ − 2h))/h d'ordre 2 pour f′(x̄). Les développements sont : f(x̄ − h) = A − hB + 1/2h²C − 1/6h³D + … ; f(x̄ − 2h) = A − 2hB + 2h²C − 4/3h³D + …. Choisis les conditions, écris le système, puis résous-le.
  [tap, suivre l'erreur]  α + β + γ = 0
    ? Pour une formule d'ordre 2 en f′(x̄), quels coefficients imposes-tu ? ✔ Celui de f(x̄) nul, celui de f′(x̄) égal à 1, celui de h·f″(x̄) nul / · Celui de f(x̄) nul et celui de f′(x̄) égal à 1 / · Ceux de f(x̄), f′(x̄) et h·f″(x̄) tous nuls
    = α + β + γ = 0 ; −β − 2γ = 1 ; 1/2β + 2γ = 0   ← Coefficients de f, f′ et h·f″
    = α = 3/2 ; β = −2 ; γ = 1/2
  aides : Regroupe les termes en f(x̄), en f′(x̄), en h·f″(x̄) après division par h. | α + β + γ = 0 ; −β − 2γ = 1 ; □ = 0 | (α, β, γ) = (3/2, −2, 1/2).
  pièges : n_fd_order_conditions

```

### Niveau 4

```
On cherche Dₕf(x̄) = (α·f(x̄) + β·f(x̄ − h) + γ·f(x̄ − 2h))/h d'ordre 2 pour f′(x̄). On note A = f(x̄), B = f′(x̄), C = f″(x̄), D = f‴(x̄) ; dans les lignes, x désigne x̄. Développe f(x̄ − 2h), écris et résous le système, puis donne le coefficient E du terme d'erreur : Dₕf(x̄) = f′(x̄) + E·h²·f‴(x̄) + …
  [free, suivre l'erreur]  f(x − 2h)
    = A − 2hB + 2h²C − 4/3h³D
  — Le système des conditions :  [juge system]  départ : α + β + γ = 0
    = α + β + γ = 0 ; −β − 2γ = 1 ; 1/2β + 2γ = 0
    = α = 3/2 ; β = −2 ; γ = 1/2
  — Le terme suivant : E = Σ cⱼkⱼ³/6.  [juge value]  départ : E
    = −1/3   ← Ordre exactement 2 : E = −1/3 ≠ 0
  aides : Développe jusqu'au terme en h³ : après division par h, il donne le terme d'erreur en h². | E = (3/2·(0)³ + −2·(−1)³ + 1/2·(−2)³)/6 = □ | (α, β, γ) = (3/2, −2, 1/2), E = −1/3.
  pièges : n_fd_taylor_sign

On cherche Dₕf(x̄) = (α·f(x̄ − h) + β·f(x̄) + γ·f(x̄ + h))/h d'ordre 2 pour f′(x̄). On note A = f(x̄), B = f′(x̄), C = f″(x̄), D = f‴(x̄) ; dans les lignes, x désigne x̄. Développe f(x̄ − h), écris et résous le système, puis donne le coefficient E du terme d'erreur : Dₕf(x̄) = f′(x̄) + E·h²·f‴(x̄) + …
  [free, suivre l'erreur]  f(x − h)
    = A − hB + 1/2h²C − 1/6h³D
  — Le système des conditions :  [juge system]  départ : α + β + γ = 0
    = α + β + γ = 0 ; −α + γ = 1 ; 1/2α + 1/2γ = 0
    = α = −1/2 ; β = 0 ; γ = 1/2
  — Le terme suivant : E = Σ cⱼkⱼ³/6.  [juge value]  départ : E
    = 1/6   ← Ordre exactement 2 : E = 1/6 ≠ 0
  aides : Développe jusqu'au terme en h³ : après division par h, il donne le terme d'erreur en h². | E = (−1/2·(−1)³ + 0·(0)³ + 1/2·(1)³)/6 = □ | (α, β, γ) = (−1/2, 0, 1/2), E = 1/6.
  pièges : n_fd_taylor_sign

On cherche Dₕf(x̄) = (α·f(x̄) + β·f(x̄ + h) + γ·f(x̄ + 2h))/h d'ordre 2 pour f′(x̄). On note A = f(x̄), B = f′(x̄), C = f″(x̄), D = f‴(x̄) ; dans les lignes, x désigne x̄. Développe f(x̄ + 2h), écris et résous le système, puis donne le coefficient E du terme d'erreur : Dₕf(x̄) = f′(x̄) + E·h²·f‴(x̄) + …
  [free, suivre l'erreur]  f(x + 2h)
    = A + 2hB + 2h²C + 4/3h³D
  — Le système des conditions :  [juge system]  départ : α + β + γ = 0
    = α + β + γ = 0 ; β + 2γ = 1 ; 1/2β + 2γ = 0
    = α = −3/2 ; β = 2 ; γ = −1/2
  — Le terme suivant : E = Σ cⱼkⱼ³/6.  [juge value]  départ : E
    = −1/3   ← Ordre exactement 2 : E = −1/3 ≠ 0
  aides : Développe jusqu'au terme en h³ : après division par h, il donne le terme d'erreur en h². | E = (−3/2·(0)³ + 2·(1)³ + −1/2·(2)³)/6 = □ | (α, β, γ) = (−3/2, 2, −1/2), E = −1/3.
  pièges : n_fd_taylor_sign

```

### Niveau 5

```
Complète les deux formules d'ordre 2 pour f′(x) : la rétrograde sur x, x − h, x − 2h, et la progressive sur x, x + h, x + 2h. (Une formule d'ordre 2 est exacte sur les polynômes de degré ≤ 2.)
  [code python, 2 trous, sans aide]
    | def fd_back2(f, x, h):
    |     return ⟦(3 * f(x) - 4 * f(x - h) + f(x - 2 * h)) / (2 * h)⟧
    | 
    | def fd_fwd2(f, x, h):
    |     return ⟦(-3 * f(x) + 4 * f(x + h) - f(x + 2 * h)) / (2 * h)⟧
    test : def q(x): return 3*x*x - x + 2 ; fd_back2(q, 1.5, 0.25) → 8.0
    test : def q(x): return 3*x*x - x + 2 ; fd_fwd2(q, 1.5, 0.25) → 8.0
    test : def c(x): return x**3 ; fd_back2(c, 1, 0.1) → 2.98
  puis : Pour tout γ, les coefficients (α, β, γ) = (−1 + γ ; 1 − 2γ ; γ) donnent une formule Dₕf(x̄) = (α·f(x̄ − h) + β·f(x̄) + γ·f(x̄ + h))/h d'ordre au moins 1. Pour quelle valeur de γ est-elle d'ordre 2 ?
      [free, sans aide]  γ
        = 1/2   ← Coefficient de h·f″ : (−1 + γ)·1/2 + (1 − 2γ)·0 + (γ)·1/2 = 0

Complète les deux formules d'ordre 2 pour f′(x) : la rétrograde sur x, x − h, x − 2h, et la progressive sur x, x + h, x + 2h. (Une formule d'ordre 2 est exacte sur les polynômes de degré ≤ 2.)
  [code python, 2 trous, sans aide]
    | def fd_back2(f, x, h):
    |     return ⟦(3 * f(x) - 4 * f(x - h) + f(x - 2 * h)) / (2 * h)⟧
    | 
    | def fd_fwd2(f, x, h):
    |     return ⟦(-3 * f(x) + 4 * f(x + h) - f(x + 2 * h)) / (2 * h)⟧
    test : def q(x): return 3*x*x - x + 2 ; fd_back2(q, 1.5, 0.25) → 8.0
    test : def q(x): return 3*x*x - x + 2 ; fd_fwd2(q, 1.5, 0.25) → 8.0
    test : def c(x): return x**3 ; fd_back2(c, 1, 0.1) → 2.98
  puis : Pour tout γ, les coefficients (α, β, γ) = (−1 + 2γ ; 1 − 3γ ; γ) donnent une formule Dₕf(x̄) = (α·f(x̄ − h) + β·f(x̄) + γ·f(x̄ + 2h))/h d'ordre au moins 1. Pour quelle valeur de γ est-elle d'ordre 2 ?
      [free, sans aide]  γ
        = 1/6   ← Coefficient de h·f″ : (−1 + 2γ)·1/2 + (1 − 3γ)·0 + (γ)·2 = 0

Complète les deux formules d'ordre 2 pour f′(x) : la rétrograde sur x, x − h, x − 2h, et la progressive sur x, x + h, x + 2h. (Une formule d'ordre 2 est exacte sur les polynômes de degré ≤ 2.)
  [code python, 2 trous, sans aide]
    | def fd_back2(f, x, h):
    |     return ⟦(3 * f(x) - 4 * f(x - h) + f(x - 2 * h)) / (2 * h)⟧
    | 
    | def fd_fwd2(f, x, h):
    |     return ⟦(-3 * f(x) + 4 * f(x + h) - f(x + 2 * h)) / (2 * h)⟧
    test : def q(x): return 3*x*x - x + 2 ; fd_back2(q, 1.5, 0.25) → 8.0
    test : def q(x): return 3*x*x - x + 2 ; fd_fwd2(q, 1.5, 0.25) → 8.0
    test : def c(x): return x**3 ; fd_back2(c, 1, 0.1) → 2.98
  puis : Pour tout γ, les coefficients (α, β, γ) = (−1 + γ ; 1 − 2γ ; γ) donnent une formule Dₕf(x̄) = (α·f(x̄) + β·f(x̄ + h) + γ·f(x̄ + 2h))/h d'ordre au moins 1. Pour quelle valeur de γ est-elle d'ordre 2 ?
      [free, sans aide]  γ
        = −1/2   ← Coefficient de h·f″ : (−1 + γ)·0 + (1 − 2γ)·1/2 + (γ)·2 = 0

```

### Variantes d'examen

```
Laquelle de ces formules approche f′(x̄) à l'ordre 2 ?
  · (3f(x̄) − 4f(x̄ + h) + f(x̄ + 2h))/(2h) [n_fd_taylor_sign]   ✔ (−3f(x̄) + 4f(x̄ + h) − f(x̄ + 2h))/(2h)   · (−f(x̄) + f(x̄ + 2h))/(2h) [n_fd_order_conditions]   · (−f(x̄) + 4f(x̄ + h) − f(x̄ + 2h))/(2h)
  [examen mcq]
  pièges : n_fd_order_conditions, n_fd_taylor_sign

On cherche Dₕf(x̄) = (α·f(x̄) + β·f(x̄ + h) + γ·f(x̄ + 2h))/h d'ordre 2 pour f′(x̄). Que vaut β ?
  → 2
  [examen coef]

```

## Prouver l'ordre d'une formule de différences finies, avec la constante (`n-fd-proof`, BA4)

_Taylor avec un reste par nœud, combiner, majorer : une constante C indépendante de h._

### Niveau 1

```
Soit f ∈ C³[x₀ − 2 ; x₀] et 0 < h ≤ 1. Montrer que |f′(x₀) − (3f(x₀) − 4f(x₀ − h) + f(x₀ − 2h))/(2h)| ≤ h²·max|f‴| (maximum sur [x₀ − 2 ; x₀]). On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.
  [guided]  f(x − h)
    (Développement de f(x₀ − h), avec ξ₁ ∈ ]x₀ − h ; x₀[ :)
    = A − hB + □ − □   (trous : A − hB + 1/2h²C − 1/6h³U)   ← Reste de Lagrange (signes alternés) : f‴(ξ₁) = U
  — Développement de f(x₀ − 2h), avec ξ₂ ∈ ]x₀ − 2h ; x₀[ :  [juge equiv]  départ : f(x − 2h)
    = A − 2hB + □ − □   (trous : A − 2hB + 2h²C − 4/3h³V)   ← Reste de Lagrange (signes alternés) : f‴(ξ₂) = V
  — Le numérateur, développements remplacés :  [juge equiv]  départ : 3A − 4(A − hB + 1/2h²C − 1/6h³U) + (A − 2hB + 2h²C − 4/3h³V)
    = □ + 2/3h³U − 4/3h³V   (trous : 2hB + 2/3h³U − 4/3h³V)   ← Les termes en A et en h²C se compensent
  — L'erreur : f′(x₀) moins ce numérateur divisé par 2h.  [juge equiv]  départ : B − (2hB + 2/3h³U − 4/3h³V)/(2h)
    = −1/3h²U + 2/3h²V   ← U = f‴(ξ₁) et V = f‴(ξ₂) ne se simplifient pas
  — Majoration : |−1/3h²U + 2/3h²V| ≤ (1/3 + 2/3)·h²·max|f‴|. La constante C, indépendante de h et de f :  [juge equiv]  départ : K
    = 1/3 + 2/3   ← Somme des |coefficients|
    = □   (trous : 1)   ← C = 1
  aides : Développe chaque f(x₀ + kh) jusqu'à f‴, avec un reste de Lagrange différent pour chacun, puis combine. | f(x₀ − 2h) = A − … + □·h³V | f′(x₀) − Dₕf = −1/3h²U + 2/3h²V, d'où C = 1/3 + 2/3 = 1.
  pièges : n_proof_same_xi, n_fd_taylor_sign, n_proof_constant_depends_h

Soit f ∈ C³[x₀ − 1 ; x₀ + 2] et 0 < h ≤ 1. Montrer que |f′(x₀) − (−4f(x₀ − h) + 3f(x₀) + f(x₀ + 2h))/(6h)| ≤ 1/3·h²·max|f‴| (maximum sur [x₀ − 1 ; x₀ + 2]). On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.
  [guided]  f(x − h)
    (Développement de f(x₀ − h), avec ξ₁ ∈ ]x₀ − h ; x₀[ :)
    = A − hB + □ − □   (trous : A − hB + 1/2h²C − 1/6h³U)   ← Reste de Lagrange (signes alternés) : f‴(ξ₁) = U
  — Développement de f(x₀ + 2h), avec ξ₂ ∈ ]x₀ ; x₀ + 2h[ :  [juge equiv]  départ : f(x + 2h)
    = A + 2hB + □ + □   (trous : A + 2hB + 2h²C + 4/3h³V)   ← Reste de Lagrange : f‴(ξ₂) = V
  — Le numérateur, développements remplacés :  [juge equiv]  départ : −4(A − hB + 1/2h²C − 1/6h³U) + 3A + (A + 2hB + 2h²C + 4/3h³V)
    = □ + 2/3h³U + 4/3h³V   (trous : 6hB + 2/3h³U + 4/3h³V)   ← Les termes en A et en h²C se compensent
  — L'erreur : f′(x₀) moins ce numérateur divisé par 6h.  [juge equiv]  départ : B − (6hB + 2/3h³U + 4/3h³V)/(6h)
    = −1/9h²U − 2/9h²V   ← U = f‴(ξ₁) et V = f‴(ξ₂) ne se simplifient pas
  — Majoration : |−1/9h²U − 2/9h²V| ≤ (1/9 + 2/9)·h²·max|f‴|. La constante C, indépendante de h et de f :  [juge equiv]  départ : K
    = 1/9 + 2/9   ← Somme des |coefficients|
    = □   (trous : 1/3)   ← C = 1/3
  aides : Développe chaque f(x₀ + kh) jusqu'à f‴, avec un reste de Lagrange différent pour chacun, puis combine. | f(x₀ + 2h) = A + … + □·h³V | f′(x₀) − Dₕf = −1/9h²U − 2/9h²V, d'où C = 1/9 + 2/9 = 1/3.
  pièges : n_proof_same_xi, n_fd_taylor_sign, n_proof_constant_depends_h

Soit f ∈ C³[x₀ − 2 ; x₀] et 0 < h ≤ 1. Montrer que |f′(x₀) − (3f(x₀) − 4f(x₀ − h) + f(x₀ − 2h))/(2h)| ≤ h²·max|f‴| (maximum sur [x₀ − 2 ; x₀]). On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.
  [guided]  f(x − h)
    (Développement de f(x₀ − h), avec ξ₁ ∈ ]x₀ − h ; x₀[ :)
    = A − hB + □ − □   (trous : A − hB + 1/2h²C − 1/6h³U)   ← Reste de Lagrange (signes alternés) : f‴(ξ₁) = U
  — Développement de f(x₀ − 2h), avec ξ₂ ∈ ]x₀ − 2h ; x₀[ :  [juge equiv]  départ : f(x − 2h)
    = A − 2hB + □ − □   (trous : A − 2hB + 2h²C − 4/3h³V)   ← Reste de Lagrange (signes alternés) : f‴(ξ₂) = V
  — Le numérateur, développements remplacés :  [juge equiv]  départ : 3A − 4(A − hB + 1/2h²C − 1/6h³U) + (A − 2hB + 2h²C − 4/3h³V)
    = □ + 2/3h³U − 4/3h³V   (trous : 2hB + 2/3h³U − 4/3h³V)   ← Les termes en A et en h²C se compensent
  — L'erreur : f′(x₀) moins ce numérateur divisé par 2h.  [juge equiv]  départ : B − (2hB + 2/3h³U − 4/3h³V)/(2h)
    = −1/3h²U + 2/3h²V   ← U = f‴(ξ₁) et V = f‴(ξ₂) ne se simplifient pas
  — Majoration : |−1/3h²U + 2/3h²V| ≤ (1/3 + 2/3)·h²·max|f‴|. La constante C, indépendante de h et de f :  [juge equiv]  départ : K
    = 1/3 + 2/3   ← Somme des |coefficients|
    = □   (trous : 1)   ← C = 1
  aides : Développe chaque f(x₀ + kh) jusqu'à f‴, avec un reste de Lagrange différent pour chacun, puis combine. | f(x₀ − 2h) = A − … + □·h³V | f′(x₀) − Dₕf = −1/3h²U + 2/3h²V, d'où C = 1/3 + 2/3 = 1.
  pièges : n_proof_same_xi, n_fd_taylor_sign, n_proof_constant_depends_h

```

### Niveau 2

```
Soit f ∈ C³[x₀ − 2 ; x₀] et 0 < h ≤ 1. Montrer que |f′(x₀) − (3f(x₀) − 4f(x₀ − h) + f(x₀ − 2h))/(2h)| ≤ h²·max|f‴| (maximum sur [x₀ − 2 ; x₀]). On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.
  [guided]  f(x − h)
    (Développement de f(x₀ − h), avec ξ₁ ∈ ]x₀ − h ; x₀[ :)
    = A − hB + □ − □   (trous : A − hB + 1/2h²C − 1/6h³U)   ← Reste de Lagrange (signes alternés) : f‴(ξ₁) = U
  — Développement de f(x₀ − 2h), avec ξ₂ ∈ ]x₀ − 2h ; x₀[ :  [juge equiv]  départ : f(x − 2h)
    = A − 2hB + 2h²C − 4/3h³V   ← Reste de Lagrange (signes alternés) : f‴(ξ₂) = V
  — Le numérateur, développements remplacés :  [juge equiv]  départ : 3A − 4(A − hB + 1/2h²C − 1/6h³U) + (A − 2hB + 2h²C − 4/3h³V)
    = □ + 2/3h³U − 4/3h³V   (trous : 2hB + 2/3h³U − 4/3h³V)   ← Les termes en A et en h²C se compensent
  — L'erreur : f′(x₀) moins ce numérateur divisé par 2h.  [juge equiv]  départ : B − (2hB + 2/3h³U − 4/3h³V)/(2h)
    = −1/3h²U + 2/3h²V   ← U = f‴(ξ₁) et V = f‴(ξ₂) ne se simplifient pas
  — Majoration : |−1/3h²U + 2/3h²V| ≤ (1/3 + 2/3)·h²·max|f‴|. La constante C, indépendante de h et de f :  [juge equiv]  départ : K
    = 1/3 + 2/3   ← Somme des |coefficients|
    = □   (trous : 1)   ← C = 1
  aides : Développe chaque f(x₀ + kh) jusqu'à f‴, avec un reste de Lagrange différent pour chacun, puis combine. | f(x₀ − 2h) = A − … + □·h³V | f′(x₀) − Dₕf = −1/3h²U + 2/3h²V, d'où C = 1/3 + 2/3 = 1.
  pièges : n_proof_same_xi, n_fd_taylor_sign, n_proof_constant_depends_h

Soit f ∈ C³[x₀ ; x₀ + 2] et 0 < h ≤ 1. Montrer que |f′(x₀) − (−3f(x₀) + 4f(x₀ + h) − f(x₀ + 2h))/(2h)| ≤ h²·max|f‴| (maximum sur [x₀ ; x₀ + 2]). On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.
  [guided]  f(x + h)
    (Développement de f(x₀ + h), avec ξ₁ ∈ ]x₀ ; x₀ + h[ :)
    = A + hB + □ + □   (trous : A + hB + 1/2h²C + 1/6h³U)   ← Reste de Lagrange : f‴(ξ₁) = U
  — Développement de f(x₀ + 2h), avec ξ₂ ∈ ]x₀ ; x₀ + 2h[ :  [juge equiv]  départ : f(x + 2h)
    = A + 2hB + 2h²C + 4/3h³V   ← Reste de Lagrange : f‴(ξ₂) = V
  — Le numérateur, développements remplacés :  [juge equiv]  départ : −3A + 4(A + hB + 1/2h²C + 1/6h³U) − (A + 2hB + 2h²C + 4/3h³V)
    = □ + 2/3h³U − 4/3h³V   (trous : 2hB + 2/3h³U − 4/3h³V)   ← Les termes en A et en h²C se compensent
  — L'erreur : f′(x₀) moins ce numérateur divisé par 2h.  [juge equiv]  départ : B − (2hB + 2/3h³U − 4/3h³V)/(2h)
    = −1/3h²U + 2/3h²V   ← U = f‴(ξ₁) et V = f‴(ξ₂) ne se simplifient pas
  — Majoration : |−1/3h²U + 2/3h²V| ≤ (1/3 + 2/3)·h²·max|f‴|. La constante C, indépendante de h et de f :  [juge equiv]  départ : K
    = 1/3 + 2/3   ← Somme des |coefficients|
    = □   (trous : 1)   ← C = 1
  aides : Développe chaque f(x₀ + kh) jusqu'à f‴, avec un reste de Lagrange différent pour chacun, puis combine. | f(x₀ + 2h) = A + … + □·h³V | f′(x₀) − Dₕf = −1/3h²U + 2/3h²V, d'où C = 1/3 + 2/3 = 1.
  pièges : n_proof_same_xi, n_fd_taylor_sign, n_proof_constant_depends_h

Soit f ∈ C³[x₀ − 1 ; x₀ + 2] et 0 < h ≤ 1. Montrer que |f′(x₀) − (−4f(x₀ − h) + 3f(x₀) + f(x₀ + 2h))/(6h)| ≤ 1/3·h²·max|f‴| (maximum sur [x₀ − 1 ; x₀ + 2]). On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.
  [guided]  f(x − h)
    (Développement de f(x₀ − h), avec ξ₁ ∈ ]x₀ − h ; x₀[ :)
    = A − hB + □ − □   (trous : A − hB + 1/2h²C − 1/6h³U)   ← Reste de Lagrange (signes alternés) : f‴(ξ₁) = U
  — Développement de f(x₀ + 2h), avec ξ₂ ∈ ]x₀ ; x₀ + 2h[ :  [juge equiv]  départ : f(x + 2h)
    = A + 2hB + 2h²C + 4/3h³V   ← Reste de Lagrange : f‴(ξ₂) = V
  — Le numérateur, développements remplacés :  [juge equiv]  départ : −4(A − hB + 1/2h²C − 1/6h³U) + 3A + (A + 2hB + 2h²C + 4/3h³V)
    = □ + 2/3h³U + 4/3h³V   (trous : 6hB + 2/3h³U + 4/3h³V)   ← Les termes en A et en h²C se compensent
  — L'erreur : f′(x₀) moins ce numérateur divisé par 6h.  [juge equiv]  départ : B − (6hB + 2/3h³U + 4/3h³V)/(6h)
    = −1/9h²U − 2/9h²V   ← U = f‴(ξ₁) et V = f‴(ξ₂) ne se simplifient pas
  — Majoration : |−1/9h²U − 2/9h²V| ≤ (1/9 + 2/9)·h²·max|f‴|. La constante C, indépendante de h et de f :  [juge equiv]  départ : K
    = 1/9 + 2/9   ← Somme des |coefficients|
    = □   (trous : 1/3)   ← C = 1/3
  aides : Développe chaque f(x₀ + kh) jusqu'à f‴, avec un reste de Lagrange différent pour chacun, puis combine. | f(x₀ + 2h) = A + … + □·h³V | f′(x₀) − Dₕf = −1/9h²U − 2/9h²V, d'où C = 1/9 + 2/9 = 1/3.
  pièges : n_proof_same_xi, n_fd_taylor_sign, n_proof_constant_depends_h

```

### Niveau 3

```
Soit f ∈ C³[x₀ − 2 ; x₀] et 0 < h ≤ 1. Montrer que |f′(x₀) − (3f(x₀) − 4f(x₀ − h) + f(x₀ − 2h))/(2h)| ≤ h²·max|f‴| (maximum sur [x₀ − 2 ; x₀]). On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.
  [tap, suivre l'erreur]  f(x − h)
    ? Jusqu'où développes-tu f(x₀ + kh) ? ✔ Jusqu'au terme en h², avec un reste de Lagrange en h³ : le premier terme qui ne s'annule pas / · Jusqu'au terme en h, avec un reste en h² / ✔ Jusqu'au terme en h³, avec un reste en h⁴
    (Développement de f(x₀ − h), avec ξ₁ ∈ ]x₀ − h ; x₀[ :)
    = A − hB + 1/2h²C − 1/6h³U   ← Reste de Lagrange (signes alternés) : f‴(ξ₁) = U
  — Développement de f(x₀ − 2h), avec ξ₂ ∈ ]x₀ − 2h ; x₀[ :  [juge equiv]  départ : f(x − 2h)
    = A − 2hB + 2h²C − 4/3h³V   ← Reste de Lagrange (signes alternés) : f‴(ξ₂) = V
  — Le numérateur, développements remplacés :  [juge equiv]  départ : 3A − 4(A − hB + 1/2h²C − 1/6h³U) + (A − 2hB + 2h²C − 4/3h³V)
    = 2hB + 2/3h³U − 4/3h³V   ← Les termes en A et en h²C se compensent
  — L'erreur : f′(x₀) moins ce numérateur divisé par 2h.  [juge equiv]  départ : B − (2hB + 2/3h³U − 4/3h³V)/(2h)
    ? Les deux restes f‴(ξ₁) et f‴(ξ₂) sont-ils égaux ? ✔ Non : chaque développement a son propre point ξ ; on les garde séparés / · Oui : ce sont deux valeurs de f‴, on peut les regrouper
    = −1/3h²U + 2/3h²V   ← U = f‴(ξ₁) et V = f‴(ξ₂) ne se simplifient pas
  — Majoration : |−1/3h²U + 2/3h²V| ≤ (1/3 + 2/3)·h²·max|f‴|. La constante C, indépendante de h et de f :  [juge equiv]  départ : K
    = 1/3 + 2/3   ← Somme des |coefficients|
    = 1   ← C = 1
  aides : Développe chaque f(x₀ + kh) jusqu'à f‴, avec un reste de Lagrange différent pour chacun, puis combine. | f(x₀ − 2h) = A − … + □·h³V | f′(x₀) − Dₕf = −1/3h²U + 2/3h²V, d'où C = 1/3 + 2/3 = 1.
  pièges : n_proof_same_xi, n_fd_taylor_sign, n_proof_constant_depends_h

Soit f ∈ C³[x₀ − 1 ; x₀ + 1] et 0 < h ≤ 1. Montrer que |f′(x₀) − (−f(x₀ − h) + f(x₀ + h))/(2h)| ≤ 1/6·h²·max|f‴| (maximum sur [x₀ − 1 ; x₀ + 1]). On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.
  [tap, suivre l'erreur]  f(x − h)
    ? Jusqu'où développes-tu f(x₀ + kh) ? ✔ Jusqu'au terme en h², avec un reste de Lagrange en h³ : le premier terme qui ne s'annule pas / · Jusqu'au terme en h, avec un reste en h² / ✔ Jusqu'au terme en h³, avec un reste en h⁴
    (Développement de f(x₀ − h), avec ξ₁ ∈ ]x₀ − h ; x₀[ :)
    = A − hB + 1/2h²C − 1/6h³U   ← Reste de Lagrange (signes alternés) : f‴(ξ₁) = U
  — Développement de f(x₀ + h), avec ξ₂ ∈ ]x₀ ; x₀ + h[ :  [juge equiv]  départ : f(x + h)
    = A + hB + 1/2h²C + 1/6h³V   ← Reste de Lagrange : f‴(ξ₂) = V
  — Le numérateur, développements remplacés :  [juge equiv]  départ : −(A − hB + 1/2h²C − 1/6h³U) + (A + hB + 1/2h²C + 1/6h³V)
    = 2hB + 1/6h³U + 1/6h³V   ← Les termes en A et en h²C se compensent
  — L'erreur : f′(x₀) moins ce numérateur divisé par 2h.  [juge equiv]  départ : B − (2hB + 1/6h³U + 1/6h³V)/(2h)
    ? Les deux restes f‴(ξ₁) et f‴(ξ₂) sont-ils égaux ? ✔ Non : chaque développement a son propre point ξ ; on les garde séparés / · Oui : ce sont deux valeurs de f‴, on peut les regrouper
    = −1/12h²U − 1/12h²V   ← U = f‴(ξ₁) et V = f‴(ξ₂) ne se simplifient pas
  — Majoration : |−1/12h²U − 1/12h²V| ≤ (1/12 + 1/12)·h²·max|f‴|. La constante C, indépendante de h et de f :  [juge equiv]  départ : K
    = 1/12 + 1/12   ← Somme des |coefficients|
    = 1/6   ← C = 1/6
  aides : Développe chaque f(x₀ + kh) jusqu'à f‴, avec un reste de Lagrange différent pour chacun, puis combine. | f(x₀ + h) = A + … + □·h³V | f′(x₀) − Dₕf = −1/12h²U − 1/12h²V, d'où C = 1/12 + 1/12 = 1/6.
  pièges : n_proof_same_xi, n_fd_taylor_sign, n_proof_constant_depends_h

Soit f ∈ C³[x₀ − 1 ; x₀ + 2] et 0 < h ≤ 1. Montrer que |f′(x₀) − (−4f(x₀ − h) + 3f(x₀) + f(x₀ + 2h))/(6h)| ≤ 1/3·h²·max|f‴| (maximum sur [x₀ − 1 ; x₀ + 2]). On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.
  [tap, suivre l'erreur]  f(x − h)
    ? Jusqu'où développes-tu f(x₀ + kh) ? ✔ Jusqu'au terme en h², avec un reste de Lagrange en h³ : le premier terme qui ne s'annule pas / · Jusqu'au terme en h, avec un reste en h² / ✔ Jusqu'au terme en h³, avec un reste en h⁴
    (Développement de f(x₀ − h), avec ξ₁ ∈ ]x₀ − h ; x₀[ :)
    = A − hB + 1/2h²C − 1/6h³U   ← Reste de Lagrange (signes alternés) : f‴(ξ₁) = U
  — Développement de f(x₀ + 2h), avec ξ₂ ∈ ]x₀ ; x₀ + 2h[ :  [juge equiv]  départ : f(x + 2h)
    = A + 2hB + 2h²C + 4/3h³V   ← Reste de Lagrange : f‴(ξ₂) = V
  — Le numérateur, développements remplacés :  [juge equiv]  départ : −4(A − hB + 1/2h²C − 1/6h³U) + 3A + (A + 2hB + 2h²C + 4/3h³V)
    = 6hB + 2/3h³U + 4/3h³V   ← Les termes en A et en h²C se compensent
  — L'erreur : f′(x₀) moins ce numérateur divisé par 6h.  [juge equiv]  départ : B − (6hB + 2/3h³U + 4/3h³V)/(6h)
    ? Les deux restes f‴(ξ₁) et f‴(ξ₂) sont-ils égaux ? ✔ Non : chaque développement a son propre point ξ ; on les garde séparés / · Oui : ce sont deux valeurs de f‴, on peut les regrouper
    = −1/9h²U − 2/9h²V   ← U = f‴(ξ₁) et V = f‴(ξ₂) ne se simplifient pas
  — Majoration : |−1/9h²U − 2/9h²V| ≤ (1/9 + 2/9)·h²·max|f‴|. La constante C, indépendante de h et de f :  [juge equiv]  départ : K
    = 1/9 + 2/9   ← Somme des |coefficients|
    = 1/3   ← C = 1/3
  aides : Développe chaque f(x₀ + kh) jusqu'à f‴, avec un reste de Lagrange différent pour chacun, puis combine. | f(x₀ + 2h) = A + … + □·h³V | f′(x₀) − Dₕf = −1/9h²U − 2/9h²V, d'où C = 1/9 + 2/9 = 1/3.
  pièges : n_proof_same_xi, n_fd_taylor_sign, n_proof_constant_depends_h

```

### Niveau 4

```
Soit f ∈ C³[x₀ ; x₀ + 2] et 0 < h ≤ 1. Montrer que |f′(x₀) − (−3f(x₀) + 4f(x₀ + h) − f(x₀ + 2h))/(2h)| ≤ h²·max|f‴| (maximum sur [x₀ ; x₀ + 2]). On a obtenu f′(x₀) − Dₕf = −1/3h²U + 2/3h²V, avec U = f‴(ξ₁) et V = f‴(ξ₂). Touche les blocs de la majoration dans l'ordre.
  [blocs order]
    1. |f′(x₀) − Dₕf| ≤ 1/3·h²·|f‴(ξ₁)| + 2/3·h²·|f‴(ξ₂)| (inégalité triangulaire)
    2. ξ₁ et ξ₂ sont dans [x₀ ; x₀ + 2], car 0 < h ≤ 1
    3. |f‴(ξᵢ)| ≤ max|f‴| sur [x₀ ; x₀ + 2]
    4. Donc |f′(x₀) − Dₕf| ≤ (1/3 + 2/3)·h²·max|f‴| = h²·max|f‴|, avec une constante indépendante de h et de f
    ✗ f‴(ξ₁) = f‴(ξ₂), donc les deux termes se compensent [n_proof_same_xi]
    ✗ On prend C = 1/3·|f‴(ξ₁)| + 2/3·|f‴(ξ₂)| [n_proof_constant_depends_h]
    ✗ Le tableau des erreurs pour f = eˣ montre que l'erreur est ≈ C·h² : l'inégalité est prouvée [g9_proof_by_example]
  pièges : n_proof_same_xi, n_proof_constant_depends_h, g9_proof_by_example

Soit f ∈ C³[x₀ − 1 ; x₀ + 2] et 0 < h ≤ 1. Montrer que |f′(x₀) − (−4f(x₀ − h) + 3f(x₀) + f(x₀ + 2h))/(6h)| ≤ 1/3·h²·max|f‴| (maximum sur [x₀ − 1 ; x₀ + 2]). On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.
  [free, suivre l'erreur]  f(x − h)
    (Développement de f(x₀ − h), avec ξ₁ ∈ ]x₀ − h ; x₀[ :)
    = A − hB + 1/2h²C − 1/6h³U   ← Reste de Lagrange (signes alternés) : f‴(ξ₁) = U
  — Développement de f(x₀ + 2h), avec ξ₂ ∈ ]x₀ ; x₀ + 2h[ :  [juge equiv]  départ : f(x + 2h)
    = A + 2hB + 2h²C + 4/3h³V   ← Reste de Lagrange : f‴(ξ₂) = V
  — Le numérateur, développements remplacés :  [juge equiv]  départ : −4(A − hB + 1/2h²C − 1/6h³U) + 3A + (A + 2hB + 2h²C + 4/3h³V)
    = 6hB + 2/3h³U + 4/3h³V   ← Les termes en A et en h²C se compensent
  — L'erreur : f′(x₀) moins ce numérateur divisé par 6h.  [juge equiv]  départ : B − (6hB + 2/3h³U + 4/3h³V)/(6h)
    = −1/9h²U − 2/9h²V   ← U = f‴(ξ₁) et V = f‴(ξ₂) ne se simplifient pas
  — Majoration : |−1/9h²U − 2/9h²V| ≤ (1/9 + 2/9)·h²·max|f‴|. La constante C, indépendante de h et de f :  [juge equiv]  départ : K
    = 1/9 + 2/9   ← Somme des |coefficients|
    = 1/3   ← C = 1/3
  aides : Développe chaque f(x₀ + kh) jusqu'à f‴, avec un reste de Lagrange différent pour chacun, puis combine. | f(x₀ + 2h) = A + … + □·h³V | f′(x₀) − Dₕf = −1/9h²U − 2/9h²V, d'où C = 1/9 + 2/9 = 1/3.
  pièges : n_proof_same_xi, n_fd_taylor_sign, n_proof_constant_depends_h

Soit f ∈ C³[x₀ − 1 ; x₀ + 1] et 0 < h ≤ 1. Montrer que |f′(x₀) − (−f(x₀ − h) + f(x₀ + h))/(2h)| ≤ 1/6·h²·max|f‴| (maximum sur [x₀ − 1 ; x₀ + 1]). On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.
  [free, suivre l'erreur]  f(x − h)
    (Développement de f(x₀ − h), avec ξ₁ ∈ ]x₀ − h ; x₀[ :)
    = A − hB + 1/2h²C − 1/6h³U   ← Reste de Lagrange (signes alternés) : f‴(ξ₁) = U
  — Développement de f(x₀ + h), avec ξ₂ ∈ ]x₀ ; x₀ + h[ :  [juge equiv]  départ : f(x + h)
    = A + hB + 1/2h²C + 1/6h³V   ← Reste de Lagrange : f‴(ξ₂) = V
  — Le numérateur, développements remplacés :  [juge equiv]  départ : −(A − hB + 1/2h²C − 1/6h³U) + (A + hB + 1/2h²C + 1/6h³V)
    = 2hB + 1/6h³U + 1/6h³V   ← Les termes en A et en h²C se compensent
  — L'erreur : f′(x₀) moins ce numérateur divisé par 2h.  [juge equiv]  départ : B − (2hB + 1/6h³U + 1/6h³V)/(2h)
    = −1/12h²U − 1/12h²V   ← U = f‴(ξ₁) et V = f‴(ξ₂) ne se simplifient pas
  — Majoration : |−1/12h²U − 1/12h²V| ≤ (1/12 + 1/12)·h²·max|f‴|. La constante C, indépendante de h et de f :  [juge equiv]  départ : K
    = 1/12 + 1/12   ← Somme des |coefficients|
    = 1/6   ← C = 1/6
  aides : Développe chaque f(x₀ + kh) jusqu'à f‴, avec un reste de Lagrange différent pour chacun, puis combine. | f(x₀ + h) = A + … + □·h³V | f′(x₀) − Dₕf = −1/12h²U − 1/12h²V, d'où C = 1/12 + 1/12 = 1/6.
  pièges : n_proof_same_xi, n_fd_taylor_sign, n_proof_constant_depends_h

```

### Niveau 5

```
Soit f ∈ C³[x₀ − 2 ; x₀] et 0 < h ≤ 1. Montrer que |f′(x₀) − (3f(x₀) − 4f(x₀ − h) + f(x₀ − 2h))/(2h)| ≤ h²·max|f‴| (maximum sur [x₀ − 2 ; x₀]).
  [problème, 7 points]
  partie 1 (Développements de Taylor : 1,5 ; Développement de f(x₀ − 2h), avec ξ₂ ∈ ]x₀ − 2h ; x₀[ : 1,5)
  Développe f(x₀ − h) et f(x₀ − 2h) avec un reste de Lagrange. On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.
    [free, sans aide, suivre l'erreur]  f(x − h)
      (Développement de f(x₀ − h), avec ξ₁ ∈ ]x₀ − h ; x₀[ :)
      = A − hB + 1/2h²C − 1/6h³U   ← Reste de Lagrange (signes alternés) : f‴(ξ₁) = U
    — Développement de f(x₀ − 2h), avec ξ₂ ∈ ]x₀ − 2h ; x₀[ :  [juge equiv]  départ : f(x − 2h)
      = A − 2hB + 2h²C − 4/3h³V   ← Reste de Lagrange (signes alternés) : f‴(ξ₂) = V
  partie 2 (Combinaison : 1,5)
  Remplace les développements dans le numérateur 3f(x₀) − 4f(x₀ − h) + f(x₀ − 2h) et simplifie.
    [free, sans aide, suivre l'erreur]  3A − 4(A − hB + 1/2h²C − 1/6h³U) + (A − 2hB + 2h²C − 4/3h³V)
      (Le numérateur, développements remplacés :)
      = 2hB + 2/3h³U − 4/3h³V   ← Les termes en A et en h²C se compensent
  partie 3 (Majoration : 1,5)
  Soit f ∈ C³[x₀ − 2 ; x₀] et 0 < h ≤ 1. Montrer que |f′(x₀) − (3f(x₀) − 4f(x₀ − h) + f(x₀ − 2h))/(2h)| ≤ h²·max|f‴| (maximum sur [x₀ − 2 ; x₀]). On a obtenu f′(x₀) − Dₕf = −1/3h²U + 2/3h²V, avec U = f‴(ξ₁) et V = f‴(ξ₂). Touche les blocs de la majoration dans l'ordre.
    [blocs order, sans aide]
      1. |f′(x₀) − Dₕf| ≤ 1/3·h²·|f‴(ξ₁)| + 2/3·h²·|f‴(ξ₂)| (inégalité triangulaire)
      2. ξ₁ et ξ₂ sont dans [x₀ − 2 ; x₀], car 0 < h ≤ 1
      3. |f‴(ξᵢ)| ≤ max|f‴| sur [x₀ − 2 ; x₀]
      4. Donc |f′(x₀) − Dₕf| ≤ (1/3 + 2/3)·h²·max|f‴| = h²·max|f‴|, avec une constante indépendante de h et de f
      ✗ On prend C = 1/3·|f‴(ξ₁)| + 2/3·|f‴(ξ₂)| [n_proof_constant_depends_h]
      ✗ Le tableau des erreurs pour f = eˣ montre que l'erreur est ≈ C·h² : l'inégalité est prouvée [g9_proof_by_example]
      ✗ f‴(ξ₁) = f‴(ξ₂), donc les deux termes se compensent [n_proof_same_xi]
  partie 4 (Constante : 1)
  La constante C de l'inégalité :
    [free, sans aide, suivre l'erreur]  K
      (Majoration : |−1/3h²U + 2/3h²V| ≤ (1/3 + 2/3)·h²·max|f‴|. La constante C, indépendante de h et de f :)
      = 1/3 + 2/3   ← Somme des |coefficients|
      = 1   ← C = 1
  pièges : n_fd_taylor_sign, n_proof_constant_depends_h, g9_proof_by_example, n_proof_same_xi

Soit f ∈ C³[x₀ ; x₀ + 2] et 0 < h ≤ 1. Montrer que |f′(x₀) − (−3f(x₀) + 4f(x₀ + h) − f(x₀ + 2h))/(2h)| ≤ h²·max|f‴| (maximum sur [x₀ ; x₀ + 2]).
  [problème, 7 points]
  partie 1 (Développements de Taylor : 1,5 ; Développement de f(x₀ + 2h), avec ξ₂ ∈ ]x₀ ; x₀ + 2h[ : 1,5)
  Développe f(x₀ + h) et f(x₀ + 2h) avec un reste de Lagrange. On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.
    [free, sans aide, suivre l'erreur]  f(x + h)
      (Développement de f(x₀ + h), avec ξ₁ ∈ ]x₀ ; x₀ + h[ :)
      = A + hB + 1/2h²C + 1/6h³U   ← Reste de Lagrange : f‴(ξ₁) = U
    — Développement de f(x₀ + 2h), avec ξ₂ ∈ ]x₀ ; x₀ + 2h[ :  [juge equiv]  départ : f(x + 2h)
      = A + 2hB + 2h²C + 4/3h³V   ← Reste de Lagrange : f‴(ξ₂) = V
  partie 2 (Combinaison : 1,5)
  Remplace les développements dans le numérateur −3f(x₀) + 4f(x₀ + h) − f(x₀ + 2h) et simplifie.
    [free, sans aide, suivre l'erreur]  −3A + 4(A + hB + 1/2h²C + 1/6h³U) − (A + 2hB + 2h²C + 4/3h³V)
      (Le numérateur, développements remplacés :)
      = 2hB + 2/3h³U − 4/3h³V   ← Les termes en A et en h²C se compensent
  partie 3 (Majoration : 1,5)
  Soit f ∈ C³[x₀ − 2 ; x₀] et 0 < h ≤ 1. Montrer que |f′(x₀) − (3f(x₀) − 4f(x₀ − h) + f(x₀ − 2h))/(2h)| ≤ h²·max|f‴| (maximum sur [x₀ − 2 ; x₀]). On a obtenu f′(x₀) − Dₕf = −1/3h²U + 2/3h²V, avec U = f‴(ξ₁) et V = f‴(ξ₂). Touche les blocs de la majoration dans l'ordre.
    [blocs order, sans aide]
      1. |f′(x₀) − Dₕf| ≤ 1/3·h²·|f‴(ξ₁)| + 2/3·h²·|f‴(ξ₂)| (inégalité triangulaire)
      2. ξ₁ et ξ₂ sont dans [x₀ − 2 ; x₀], car 0 < h ≤ 1
      3. |f‴(ξᵢ)| ≤ max|f‴| sur [x₀ − 2 ; x₀]
      4. Donc |f′(x₀) − Dₕf| ≤ (1/3 + 2/3)·h²·max|f‴| = h²·max|f‴|, avec une constante indépendante de h et de f
      ✗ f‴(ξ₁) = f‴(ξ₂), donc les deux termes se compensent [n_proof_same_xi]
      ✗ On prend C = 1/3·|f‴(ξ₁)| + 2/3·|f‴(ξ₂)| [n_proof_constant_depends_h]
      ✗ Le tableau des erreurs pour f = eˣ montre que l'erreur est ≈ C·h² : l'inégalité est prouvée [g9_proof_by_example]
  partie 4 (Constante : 1)
  La constante C de l'inégalité :
    [free, sans aide, suivre l'erreur]  K
      (Majoration : |−1/3h²U + 2/3h²V| ≤ (1/3 + 2/3)·h²·max|f‴|. La constante C, indépendante de h et de f :)
      = 1/3 + 2/3   ← Somme des |coefficients|
      = 1   ← C = 1
  pièges : n_fd_taylor_sign, n_proof_same_xi, n_proof_constant_depends_h, g9_proof_by_example

Soit f ∈ C³[x₀ − 2 ; x₀] et 0 < h ≤ 1. Montrer que |f′(x₀) − (3f(x₀) − 4f(x₀ − h) + f(x₀ − 2h))/(2h)| ≤ h²·max|f‴| (maximum sur [x₀ − 2 ; x₀]).
  [problème, 7 points]
  partie 1 (Développements de Taylor : 1,5 ; Développement de f(x₀ − 2h), avec ξ₂ ∈ ]x₀ − 2h ; x₀[ : 1,5)
  Développe f(x₀ − h) et f(x₀ − 2h) avec un reste de Lagrange. On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.
    [free, sans aide, suivre l'erreur]  f(x − h)
      (Développement de f(x₀ − h), avec ξ₁ ∈ ]x₀ − h ; x₀[ :)
      = A − hB + 1/2h²C − 1/6h³U   ← Reste de Lagrange (signes alternés) : f‴(ξ₁) = U
    — Développement de f(x₀ − 2h), avec ξ₂ ∈ ]x₀ − 2h ; x₀[ :  [juge equiv]  départ : f(x − 2h)
      = A − 2hB + 2h²C − 4/3h³V   ← Reste de Lagrange (signes alternés) : f‴(ξ₂) = V
  partie 2 (Combinaison : 1,5)
  Remplace les développements dans le numérateur 3f(x₀) − 4f(x₀ − h) + f(x₀ − 2h) et simplifie.
    [free, sans aide, suivre l'erreur]  3A − 4(A − hB + 1/2h²C − 1/6h³U) + (A − 2hB + 2h²C − 4/3h³V)
      (Le numérateur, développements remplacés :)
      = 2hB + 2/3h³U − 4/3h³V   ← Les termes en A et en h²C se compensent
  partie 3 (Majoration : 1,5)
  Soit f ∈ C³[x₀ − 2 ; x₀] et 0 < h ≤ 1. Montrer que |f′(x₀) − (3f(x₀) − 4f(x₀ − h) + f(x₀ − 2h))/(2h)| ≤ h²·max|f‴| (maximum sur [x₀ − 2 ; x₀]). On a obtenu f′(x₀) − Dₕf = −1/3h²U + 2/3h²V, avec U = f‴(ξ₁) et V = f‴(ξ₂). Touche les blocs de la majoration dans l'ordre.
    [blocs order, sans aide]
      1. |f′(x₀) − Dₕf| ≤ 1/3·h²·|f‴(ξ₁)| + 2/3·h²·|f‴(ξ₂)| (inégalité triangulaire)
      2. ξ₁ et ξ₂ sont dans [x₀ − 2 ; x₀], car 0 < h ≤ 1
      3. |f‴(ξᵢ)| ≤ max|f‴| sur [x₀ − 2 ; x₀]
      4. Donc |f′(x₀) − Dₕf| ≤ (1/3 + 2/3)·h²·max|f‴| = h²·max|f‴|, avec une constante indépendante de h et de f
      ✗ On prend C = 1/3·|f‴(ξ₁)| + 2/3·|f‴(ξ₂)| [n_proof_constant_depends_h]
      ✗ Le tableau des erreurs pour f = eˣ montre que l'erreur est ≈ C·h² : l'inégalité est prouvée [g9_proof_by_example]
      ✗ f‴(ξ₁) = f‴(ξ₂), donc les deux termes se compensent [n_proof_same_xi]
  partie 4 (Constante : 1)
  La constante C de l'inégalité :
    [free, sans aide, suivre l'erreur]  K
      (Majoration : |−1/3h²U + 2/3h²V| ≤ (1/3 + 2/3)·h²·max|f‴|. La constante C, indépendante de h et de f :)
      = 1/3 + 2/3   ← Somme des |coefficients|
      = 1   ← C = 1
  pièges : n_fd_taylor_sign, n_proof_constant_depends_h, g9_proof_by_example, n_proof_same_xi

```

### Variantes d'examen

```
Vrai ou faux ? Dans la preuve, les restes 1/3·h²·f‴(ξ₁) et 2/3·h²·f‴(ξ₂) se regroupent en (1/3 ± 2/3)·h²·f‴(ξ), car ξ₁ = ξ₂.
  · Vrai [n_proof_same_xi]   ✔ Faux
  [examen tf]
  pièges : n_proof_same_xi

Soit f ∈ C³[x₀ − 1 ; x₀ + 2] et 0 < h ≤ 1. Montrer que |f′(x₀) − (−4f(x₀ − h) + 3f(x₀) + f(x₀ + 2h))/(6h)| ≤ 1/3·h²·max|f‴| (maximum sur [x₀ − 1 ; x₀ + 2]).
  [problème, examen open, 7 points]
  partie 1 (Développements de Taylor : 1,5 ; Développement de f(x₀ + 2h), avec ξ₂ ∈ ]x₀ ; x₀ + 2h[ : 1,5)
  Développe f(x₀ − h) et f(x₀ + 2h) avec un reste de Lagrange. On note A = f(x₀), B = f′(x₀), C = f″(x₀), U = f‴(ξ₁), V = f‴(ξ₂) ; dans les lignes, x désigne x₀.
    [free, sans aide, suivre l'erreur]  f(x − h)
      (Développement de f(x₀ − h), avec ξ₁ ∈ ]x₀ − h ; x₀[ :)
      = A − hB + 1/2h²C − 1/6h³U   ← Reste de Lagrange (signes alternés) : f‴(ξ₁) = U
    — Développement de f(x₀ + 2h), avec ξ₂ ∈ ]x₀ ; x₀ + 2h[ :  [juge equiv]  départ : f(x + 2h)
      = A + 2hB + 2h²C + 4/3h³V   ← Reste de Lagrange : f‴(ξ₂) = V
  partie 2 (Combinaison : 1,5)
  Remplace les développements dans le numérateur −4f(x₀ − h) + 3f(x₀) + f(x₀ + 2h) et simplifie.
    [free, sans aide, suivre l'erreur]  −4(A − hB + 1/2h²C − 1/6h³U) + 3A + (A + 2hB + 2h²C + 4/3h³V)
      (Le numérateur, développements remplacés :)
      = 6hB + 2/3h³U + 4/3h³V   ← Les termes en A et en h²C se compensent
  partie 3 (Majoration : 1,5)
  Soit f ∈ C³[x₀ − 1 ; x₀ + 2] et 0 < h ≤ 1. Montrer que |f′(x₀) − (−4f(x₀ − h) + 3f(x₀) + f(x₀ + 2h))/(6h)| ≤ 1/3·h²·max|f‴| (maximum sur [x₀ − 1 ; x₀ + 2]). On a obtenu f′(x₀) − Dₕf = −1/9h²U − 2/9h²V, avec U = f‴(ξ₁) et V = f‴(ξ₂). Touche les blocs de la majoration dans l'ordre.
    [blocs order, sans aide]
      1. |f′(x₀) − Dₕf| ≤ 1/9·h²·|f‴(ξ₁)| + 2/9·h²·|f‴(ξ₂)| (inégalité triangulaire)
      2. ξ₁ et ξ₂ sont dans [x₀ − 1 ; x₀ + 2], car 0 < h ≤ 1
      3. |f‴(ξᵢ)| ≤ max|f‴| sur [x₀ − 1 ; x₀ + 2]
      4. Donc |f′(x₀) − Dₕf| ≤ (1/9 + 2/9)·h²·max|f‴| = 1/3·h²·max|f‴|, avec une constante indépendante de h et de f
      ✗ f‴(ξ₁) = f‴(ξ₂), donc les deux termes se compensent [n_proof_same_xi]
      ✗ On prend C = 1/9·|f‴(ξ₁)| + 2/9·|f‴(ξ₂)| [n_proof_constant_depends_h]
      ✗ Le tableau des erreurs pour f = eˣ montre que l'erreur est ≈ C·h² : l'inégalité est prouvée [g9_proof_by_example]
  partie 4 (Constante : 1)
  La constante C de l'inégalité :
    [free, sans aide, suivre l'erreur]  K
      (Majoration : |−1/9h²U − 2/9h²V| ≤ (1/9 + 2/9)·h²·max|f‴|. La constante C, indépendante de h et de f :)
      = 1/9 + 2/9   ← Somme des |coefficients|
      = 1/3   ← C = 1/3
  pièges : n_fd_taylor_sign, n_proof_same_xi, n_proof_constant_depends_h, g9_proof_by_example

```

## Formules composites : rectangle, point milieu, trapèze, Simpson (`n-quad-composite`, BA4)

_Découper [a ; b] en n morceaux et appliquer une formule simple sur chacun._

### Niveau 1

```
Approche ∫ de 0 à 2 de f(x) = x³ + 2x + 2 par la formule du trapèze composite avec n = 2 sous-intervalles.
  [guided]  Q_h
    (h = 1 ; nœuds 0 ; 1 ; 2 ; milieux 0,5 ; 1,5)
    = □·(2 + 5) + 0,5·(5 + 14)   (trous : 0,5·(2 + 5) + 0,5·(5 + 14))   ← trapèze : Σ (h/2)·(f(xᵢ₋₁) + f(xᵢ))
    = 3,5 + 9,5   ← Chaque sous-intervalle
    = □   (trous : 13)   ← Total
  aides : Trapèze, sur chaque sous-intervalle de longueur h : (h/2)·(gauche + droite). | h = (b − a)/n = □ | 0,5×(2+5)+0,5×(5+14) = 13
  pièges : n_trap_weights

Approche ∫ de 0 à 1 de f(x) = x³ + 2 par la formule de Simpson composite avec n = 2 sous-intervalles.
  [guided]  Q_h
    (h = 0,5 ; nœuds 0 ; 0,5 ; 1 ; milieux 0,25 ; 0,75)
    = (□)·(2 + 4·□ + 2,125) + (1/12)·(2,125 + 4·155/64 + 3)   (trous : (1/12)·(2 + 4·129/64 + 2,125) + (1/12)·(2,125 + 4·155/64 + 3))   ← Simpson : Σ (h/6)·(f(xᵢ₋₁) + 4f(cᵢ) + f(xᵢ))
    = 65/64 + 79/64   ← Chaque sous-intervalle
    = □   (trous : 2,25)   ← Total
  aides : Simpson, sur chaque sous-intervalle de longueur h : (h/6)·(gauche + 4·milieu + droite). | (1/12)·(f(0) + 4f(□) + f(0,5)) | (1/12)×(2+4×129/64+2,125)+(1/12)×(2,125+4×155/64+3) = 2,25
  pièges : n_simpson_h3_h6

Approche ∫ de 0 à 1 de f(x) = 3x² − x + 2 par la formule de Simpson composite avec n = 1 sous-intervalle.
  [guided]  Q_h
    (h = 1 ; nœuds 0 ; 1 ; milieux 0,5)
    = (□)·(2 + 4·□ + 4)   (trous : (1/6)·(2 + 4·2,25 + 4))   ← Simpson : Σ (h/6)·(f(xᵢ₋₁) + 4f(cᵢ) + f(xᵢ))
    = □   (trous : 2,5)   ← Total
  aides : Simpson, sur chaque sous-intervalle de longueur h : (h/6)·(gauche + 4·milieu + droite). | (1/6)·(f(0) + 4f(□) + f(1)) | (1/6)×(2+4×2,25+4) = 2,5
  pièges : n_simpson_h3_h6

```

### Niveau 2

```
Approche ∫ de −1 à 3 de f(x) = x⁴ par la formule de Simpson composite avec n = 2 sous-intervalles.
  [guided]  Q_h
    (h = 2 ; nœuds −1 ; 1 ; 3 ; milieux 0 ; 2)
    = (□)·(1 + 4·0 + 1) + (□)·(1 + 4·16 + 81)   (trous : (1/3)·(1 + 4·0 + 1) + (1/3)·(1 + 4·16 + 81))   ← Simpson : Σ (h/6)·(f(xᵢ₋₁) + 4f(cᵢ) + f(xᵢ))
    = 2/3 + 146/3   ← Chaque sous-intervalle
    = □   (trous : 148/3)   ← Total
  aides : Simpson, sur chaque sous-intervalle de longueur h : (h/6)·(gauche + 4·milieu + droite). | (1/3)·(f(−1) + 4f(□) + f(1)) | (1/3)×(1+4×0+1)+(1/3)×(1+4×16+81) = 148/3
  pièges : n_simpson_h3_h6

Approche ∫ de 0 à 2 de f(x) = −x³ + 3 par la formule du trapèze composite avec n = 2 sous-intervalles.
  [guided]  Q_h
    (h = 1 ; nœuds 0 ; 1 ; 2 ; milieux 0,5 ; 1,5)
    = □·(3 + 2) + □·(2 + (−5))   (trous : 0,5·(3 + 2) + 0,5·(2 + (−5)))   ← trapèze : Σ (h/2)·(f(xᵢ₋₁) + f(xᵢ))
    = 2,5 + (−1,5)   ← Chaque sous-intervalle
    = □   (trous : 1)   ← Total
  aides : Trapèze, sur chaque sous-intervalle de longueur h : (h/2)·(gauche + droite). | h = (b − a)/n = □ | 0,5×(3+2)+0,5×(2+(−5)) = 1
  pièges : n_trap_weights

Approche ∫ de −1 à 0 de f(x) = x² − 2x + 2 par la formule de Simpson composite avec n = 2 sous-intervalles.
  [guided]  Q_h
    (h = 0,5 ; nœuds −1 ; −0,5 ; 0 ; milieux −0,75 ; −0,25)
    = (□)·(5 + 4·4,0625 + 3,25) + (□)·(3,25 + 4·2,5625 + 2)   (trous : (1/12)·(5 + 4·4,0625 + 3,25) + (1/12)·(3,25 + 4·2,5625 + 2))   ← Simpson : Σ (h/6)·(f(xᵢ₋₁) + 4f(cᵢ) + f(xᵢ))
    = 49/24 + 31/24   ← Chaque sous-intervalle
    = □   (trous : 10/3)   ← Total
  aides : Simpson, sur chaque sous-intervalle de longueur h : (h/6)·(gauche + 4·milieu + droite). | (1/12)·(f(−1) + 4f(□) + f(−0,5)) | (1/12)×(5+4×4,0625+3,25)+(1/12)×(3,25+4×2,5625+2) = 10/3
  pièges : n_simpson_h3_h6

```

### Niveau 3

```
Approche ∫ de 0 à 1 de f(x) = x³ + 2x − 2 par la formule du trapèze composite avec n = 2 sous-intervalles.
  [tap, suivre l'erreur]  Q_h
    ? Quelle formule pour la méthode du trapèze ? ✔ (h/2)·(f(xᵢ₋₁) + f(xᵢ)) sur chaque sous-intervalle / · h·(f(x₀) + f(x₁) + … + f(xₙ)) / · h·f(cᵢ) sur chaque sous-intervalle
    (h = 0,5 ; nœuds 0 ; 0,5 ; 1 ; milieux 0,25 ; 0,75)
    = 0,25·(−2 + (−0,875)) + 0,25·(−0,875 + 1)   ← trapèze : Σ (h/2)·(f(xᵢ₋₁) + f(xᵢ))
    = −0,71875 + 0,03125   ← Chaque sous-intervalle
    = −0,6875   ← Total
  aides : Trapèze, sur chaque sous-intervalle de longueur h : (h/2)·(gauche + droite). | h = (b − a)/n = □ | 0,25×(−2+(−0,875))+0,25×(−0,875+1) = −0,6875
  pièges : n_trap_weights

Approche ∫ de 0 à 2 de f(x) = −x³ − 2x + 2 par la formule du trapèze composite avec n = 2 sous-intervalles.
  [tap, suivre l'erreur]  Q_h
    ? Quelle formule pour la méthode du trapèze ? ✔ (h/2)·(f(xᵢ₋₁) + f(xᵢ)) sur chaque sous-intervalle / · h·(f(x₀) + f(x₁) + … + f(xₙ)) / · h·f(cᵢ) sur chaque sous-intervalle
    (h = 1 ; nœuds 0 ; 1 ; 2 ; milieux 0,5 ; 1,5)
    = 0,5·(2 + (−1)) + 0,5·(−1 + (−10))   ← trapèze : Σ (h/2)·(f(xᵢ₋₁) + f(xᵢ))
    = 0,5 + (−5,5)   ← Chaque sous-intervalle
    = −5   ← Total
  aides : Trapèze, sur chaque sous-intervalle de longueur h : (h/2)·(gauche + droite). | h = (b − a)/n = □ | 0,5×(2+(−1))+0,5×(−1+(−10)) = −5
  pièges : n_trap_weights

Approche ∫ de 1 à 3 de f(x) = x⁴ − 1 par la formule du trapèze composite avec n = 2 sous-intervalles.
  [tap, suivre l'erreur]  Q_h
    ? Quelle formule pour la méthode du trapèze ? ✔ (h/2)·(f(xᵢ₋₁) + f(xᵢ)) sur chaque sous-intervalle / · h·(f(x₀) + f(x₁) + … + f(xₙ)) / · h·f(cᵢ) sur chaque sous-intervalle
    (h = 1 ; nœuds 1 ; 2 ; 3 ; milieux 1,5 ; 2,5)
    = 0,5·(0 + 15) + 0,5·(15 + 80)   ← trapèze : Σ (h/2)·(f(xᵢ₋₁) + f(xᵢ))
    = 7,5 + 47,5   ← Chaque sous-intervalle
    = 55   ← Total
  aides : Trapèze, sur chaque sous-intervalle de longueur h : (h/2)·(gauche + droite). | h = (b − a)/n = □ | 0,5×(0+15)+0,5×(15+80) = 55
  pièges : n_trap_weights

```

### Niveau 4

```
Calcule ∫ de 1 à 2 de f(x) = x³ − 2x − 2 avec n = 2 par les quatre formules composites : rectangle à gauche (R), point milieu (M), trapèze (T), Simpson (S). La valeur exacte est −1,25.
  [free, suivre l'erreur]  R
    (h = 0,5 ; nœuds 1 ; 1,5 ; 2 ; milieux 1,25 ; 1,75. rectangle à gauche :)
    = 0,5·(−3 + (−1,625))   ← rectangle à gauche : h·Σ f(xᵢ₋₁)
    = −2,3125   ← Total
  — Formule du point milieu :  [juge value]  départ : M
    = 0,5·(−163/64 + (−9/64))   ← point milieu : h·Σ f(cᵢ)
    = −1,34375   ← Total
  — Formule du trapèze :  [juge value]  départ : T
    = 0,25·(−3 + (−1,625)) + 0,25·(−1,625 + 2)   ← trapèze : Σ (h/2)·(f(xᵢ₋₁) + f(xᵢ))
    = −1,15625 + 0,09375   ← Chaque sous-intervalle
    = −1,0625   ← Total
  — Formule de Simpson :  [juge value]  départ : S
    = (1/12)·(−3 + 4·(−163/64) + (−1,625)) + (1/12)·(−1,625 + 4·(−9/64) + 2)   ← Simpson : Σ (h/6)·(f(xᵢ₋₁) + 4f(cᵢ) + f(xᵢ))
    = −79/64 + (−1/64)   ← Chaque sous-intervalle
    = −1,25   ← Total
  aides : h = (b − a)/n ; rectangle : h·f(gauche), point milieu : h·f(milieu), trapèze : (h/2)(gauche + droite), Simpson : (h/6)(gauche + 4 milieu + droite). | R = 0,5·(f(1) + f(□)) | R = −2,3125, M = −1,34375, T = −1,0625, S = −1,25

Calcule ∫ de 0 à 2 de f(x) = −x³ + 1 avec n = 2 par les quatre formules composites : rectangle à gauche (R), point milieu (M), trapèze (T), Simpson (S). La valeur exacte est −2.
  [free, suivre l'erreur]  R
    (h = 1 ; nœuds 0 ; 1 ; 2 ; milieux 0,5 ; 1,5. rectangle à gauche :)
    = 1·(1 + 0)   ← rectangle à gauche : h·Σ f(xᵢ₋₁)
    = 1   ← Total
  — Formule du point milieu :  [juge value]  départ : M
    = 1·(0,875 + (−2,375))   ← point milieu : h·Σ f(cᵢ)
    = −1,5   ← Total
  — Formule du trapèze :  [juge value]  départ : T
    = 0,5·(1 + 0) + 0,5·(0 + (−7))   ← trapèze : Σ (h/2)·(f(xᵢ₋₁) + f(xᵢ))
    = 0,5 + (−3,5)   ← Chaque sous-intervalle
    = −3   ← Total
  — Formule de Simpson :  [juge value]  départ : S
    = (1/6)·(1 + 4·0,875 + 0) + (1/6)·(0 + 4·(−2,375) + (−7))   ← Simpson : Σ (h/6)·(f(xᵢ₋₁) + 4f(cᵢ) + f(xᵢ))
    = 0,75 + (−2,75)   ← Chaque sous-intervalle
    = −2   ← Total
  aides : h = (b − a)/n ; rectangle : h·f(gauche), point milieu : h·f(milieu), trapèze : (h/2)(gauche + droite), Simpson : (h/6)(gauche + 4 milieu + droite). | R = 1·(f(0) + f(□)) | R = 1, M = −1,5, T = −3, S = −2

Calcule ∫ de 1 à 2 de f(x) = −x² + x + 1 avec n = 2 par les quatre formules composites : rectangle à gauche (R), point milieu (M), trapèze (T), Simpson (S). La valeur exacte est 1/6.
  [free, suivre l'erreur]  R
    (h = 0,5 ; nœuds 1 ; 1,5 ; 2 ; milieux 1,25 ; 1,75. rectangle à gauche :)
    = 0,5·(1 + 0,25)   ← rectangle à gauche : h·Σ f(xᵢ₋₁)
    = 0,625   ← Total
  — Formule du point milieu :  [juge value]  départ : M
    = 0,5·(0,6875 + (−0,3125))   ← point milieu : h·Σ f(cᵢ)
    = 0,1875   ← Total
  — Formule du trapèze :  [juge value]  départ : T
    = 0,25·(1 + 0,25) + 0,25·(0,25 + (−1))   ← trapèze : Σ (h/2)·(f(xᵢ₋₁) + f(xᵢ))
    = 0,3125 + (−0,1875)   ← Chaque sous-intervalle
    = 0,125   ← Total
  — Formule de Simpson :  [juge value]  départ : S
    = (1/12)·(1 + 4·0,6875 + 0,25) + (1/12)·(0,25 + 4·(−0,3125) + (−1))   ← Simpson : Σ (h/6)·(f(xᵢ₋₁) + 4f(cᵢ) + f(xᵢ))
    = 1/3 + (−1/6)   ← Chaque sous-intervalle
    = 1/6   ← Total
  aides : h = (b − a)/n ; rectangle : h·f(gauche), point milieu : h·f(milieu), trapèze : (h/2)(gauche + droite), Simpson : (h/6)(gauche + 4 milieu + droite). | R = 0,5·(f(1) + f(□)) | R = 0,625, M = 0,1875, T = 0,125, S = 1/6

```

### Niveau 5

```
Complète les trois formules composites (h est la longueur d'un sous-intervalle, c son milieu).
  [code python, 6 trous, sans aide]
    | def simpson(f, a, b, n):
    |     h = (b - a) / n
    |     s = 0.0
    |     for i in range(n):
    |         x0 = a + i * h
    |         x1 = ⟦x0 + h⟧
    |         c = ⟦(x0 + x1) / 2⟧
    |         s = s + ⟦h / 6 * (f(x0) + 4 * f(c) + f(x1))⟧
    |     return s
    | 
    | def trapeze(f, a, b, n):
    |     h = (b - a) / n
    |     s = ⟦(f(a) + f(b)) / 2⟧
    |     for i in range(1, n):
    |         s = s + f(a + i * h)
    |     return ⟦h * s⟧
    | 
    | def midpoint(f, a, b, n):
    |     h = (b - a) / n
    |     s = 0.0
    |     for i in range(n):
    |         s = s + ⟦f(a + (i + 0.5) * h)⟧
    |     return h * s
    test : def f(x): return x*x - 4*x + math.exp(x) ; simpson(f, 0, 5, 1000) → 139.0798257692752
    test : def g(x): return x**3 ; simpson(g, 0, 2, 2) → 4.0
    test : def g(x): return x*x ; trapeze(g, 0, 1, 4) → 0.34375
    test : midpoint(math.sin, 0, math.pi, 2) → 2.221441469079183
  puis : Avec ton programme, simpson(g, 0, 2, 2) pour g(x) = x², x³ et x⁴ donne :
      [tableau à lire, sans aide]
        g | simpson(g, 0, 2, 2) | ∫₀² g
        x² | 8/3 | 8/3
        x³ | 4 | 4
        x⁴ | 77/12 | 32/5
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          ✔ Simpson intègre exactement x² et x³   · Le poids h/3 donnerait les mêmes valeurs [n_simpson_h3_h6]   · Simpson est exacte sur tous les polynômes   ✔ Simpson n'est pas exacte sur x⁴
          pièges : n_simpson_h3_h6
      pièges : n_simpson_h3_h6
  pièges : n_simpson_h3_h6, n_trap_weights

Complète les trois formules composites (h est la longueur d'un sous-intervalle, c son milieu).
  [code python, 6 trous, sans aide]
    | def simpson(f, a, b, n):
    |     h = (b - a) / n
    |     s = 0.0
    |     for i in range(n):
    |         x0 = a + i * h
    |         x1 = ⟦x0 + h⟧
    |         c = ⟦(x0 + x1) / 2⟧
    |         s = s + ⟦h / 6 * (f(x0) + 4 * f(c) + f(x1))⟧
    |     return s
    | 
    | def trapeze(f, a, b, n):
    |     h = (b - a) / n
    |     s = ⟦(f(a) + f(b)) / 2⟧
    |     for i in range(1, n):
    |         s = s + f(a + i * h)
    |     return ⟦h * s⟧
    | 
    | def midpoint(f, a, b, n):
    |     h = (b - a) / n
    |     s = 0.0
    |     for i in range(n):
    |         s = s + ⟦f(a + (i + 0.5) * h)⟧
    |     return h * s
    test : def f(x): return x*x - 4*x + math.exp(x) ; simpson(f, 0, 5, 1000) → 139.0798257692752
    test : def g(x): return x**3 ; simpson(g, 0, 2, 2) → 4.0
    test : def g(x): return x*x ; trapeze(g, 0, 1, 4) → 0.34375
    test : midpoint(math.sin, 0, math.pi, 2) → 2.221441469079183
  puis : Avec ton programme, simpson(g, 0, 2, 2) pour g(x) = x², x³ et x⁴ donne :
      [tableau à lire, sans aide]
        g | simpson(g, 0, 2, 2) | ∫₀² g
        x² | 8/3 | 8/3
        x³ | 4 | 4
        x⁴ | 77/12 | 32/5
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          ✔ Simpson intègre exactement x² et x³   · Simpson est exacte sur tous les polynômes   · Le poids h/3 donnerait les mêmes valeurs [n_simpson_h3_h6]   ✔ Simpson n'est pas exacte sur x⁴
          pièges : n_simpson_h3_h6
      pièges : n_simpson_h3_h6
  pièges : n_simpson_h3_h6, n_trap_weights

Complète les trois formules composites (h est la longueur d'un sous-intervalle, c son milieu).
  [code python, 6 trous, sans aide]
    | def simpson(f, a, b, n):
    |     h = (b - a) / n
    |     s = 0.0
    |     for i in range(n):
    |         x0 = a + i * h
    |         x1 = ⟦x0 + h⟧
    |         c = ⟦(x0 + x1) / 2⟧
    |         s = s + ⟦h / 6 * (f(x0) + 4 * f(c) + f(x1))⟧
    |     return s
    | 
    | def trapeze(f, a, b, n):
    |     h = (b - a) / n
    |     s = ⟦(f(a) + f(b)) / 2⟧
    |     for i in range(1, n):
    |         s = s + f(a + i * h)
    |     return ⟦h * s⟧
    | 
    | def midpoint(f, a, b, n):
    |     h = (b - a) / n
    |     s = 0.0
    |     for i in range(n):
    |         s = s + ⟦f(a + (i + 0.5) * h)⟧
    |     return h * s
    test : def f(x): return x*x - 4*x + math.exp(x) ; simpson(f, 0, 5, 1000) → 139.0798257692752
    test : def g(x): return x**3 ; simpson(g, 0, 2, 2) → 4.0
    test : def g(x): return x*x ; trapeze(g, 0, 1, 4) → 0.34375
    test : midpoint(math.sin, 0, math.pi, 2) → 2.221441469079183
  puis : Avec ton programme, simpson(g, 0, 2, 2) pour g(x) = x², x³ et x⁴ donne :
      [tableau à lire, sans aide]
        g | simpson(g, 0, 2, 2) | ∫₀² g
        x² | 8/3 | 8/3
        x³ | 4 | 4
        x⁴ | 77/12 | 32/5
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          · Simpson est exacte sur tous les polynômes   ✔ Simpson intègre exactement x² et x³   ✔ Simpson n'est pas exacte sur x⁴   · Le poids h/3 donnerait les mêmes valeurs [n_simpson_h3_h6]
          pièges : n_simpson_h3_h6
      pièges : n_simpson_h3_h6
  pièges : n_simpson_h3_h6, n_trap_weights

```

### Variantes d'examen

```
Que vaut la formule de Simpson composite pour ∫ de 1 à 3 de f(x) = 2x⁴, avec n = 2 sous-intervalles ?
  ✔ 581/6   · 88,25   · 581/3 [n_simpson_h3_h6]   · 196 [n_trap_weights]
  [examen mcq]
  pièges : n_simpson_h3_h6, n_trap_weights

```

## Degré d'exactitude ; ramener à [−1 ; 1] (`n-quad-exactness`, BA4)

_Tester 1, t, t², … pour trouver jusqu'où une formule est exacte._

### Niveau 1

```
J(g) = g(−1/√3) + g(1/√3). Teste les monômes 1, t, t², … : compare J(tᵏ) à ∫₋₁¹ tᵏ dt (= 2/(k + 1) si k est pair, 0 si k est impair), puis donne le degré d'exactitude r de J.
  [guided]  J_0
    (J(1) =)
    = □   (trous : 2)   ← ∫₋₁¹ 1 dt = 2 ; égal
  — J(t) =  [juge value]  départ : J_1
    = □   (trous : 0)   ← ∫₋₁¹ t dt = 0 ; égal
  — J(t²) =  [juge value]  départ : J_2
    = □   (trous : 2/3)   ← ∫₋₁¹ t² dt = 2/3 ; égal
  — J(t³) =  [juge value]  départ : J_3
    = □   (trous : 0)   ← ∫₋₁¹ t³ dt = 0 ; égal
  — J(t⁴) =  [juge value]  départ : J_4
    = □   (trous : 2/9)   ← ∫₋₁¹ t⁴ dt = 2/5 ; différent
  — Le degré d'exactitude.  [juge value]  départ : r
    = □   (trous : 3)   ← t⁴ est le premier monôme qui échoue
  aides : Teste 1, t, t², … et compare à ∫ de −1 à 1. La première égalité qui échoue donne le degré + 1. | J(t²) = (−1/√3)²+(1/√3)² et ∫t² = □ | J(t²) = 2/3, ∫t² = 2/3 ; le degré d'exactitude est 3.

J(g) = g(−1) + g(1). Teste les monômes 1, t, t², … : compare J(tᵏ) à ∫₋₁¹ tᵏ dt (= 2/(k + 1) si k est pair, 0 si k est impair), puis donne le degré d'exactitude r de J.
  [guided]  J_0
    (J(1) =)
    = □   (trous : 2)   ← ∫₋₁¹ 1 dt = 2 ; égal
  — J(t) =  [juge value]  départ : J_1
    = □   (trous : 0)   ← ∫₋₁¹ t dt = 0 ; égal
  — J(t²) =  [juge value]  départ : J_2
    = □   (trous : 2)   ← ∫₋₁¹ t² dt = 2/3 ; différent
  — Le degré d'exactitude.  [juge value]  départ : r
    = □   (trous : 1)   ← t² est le premier monôme qui échoue
  aides : Teste 1, t, t², … et compare à ∫ de −1 à 1. La première égalité qui échoue donne le degré + 1. | J(t²) = (−1)²+1² et ∫t² = □ | J(t²) = 2, ∫t² = 2/3 ; le degré d'exactitude est 1.

J(g) = g(−1/2) + g(1/2). Teste les monômes 1, t, t², … : compare J(tᵏ) à ∫₋₁¹ tᵏ dt (= 2/(k + 1) si k est pair, 0 si k est impair), puis donne le degré d'exactitude r de J.
  [guided]  J_0
    (J(1) =)
    = □   (trous : 2)   ← ∫₋₁¹ 1 dt = 2 ; égal
  — J(t) =  [juge value]  départ : J_1
    = □   (trous : 0)   ← ∫₋₁¹ t dt = 0 ; égal
  — J(t²) =  [juge value]  départ : J_2
    = □   (trous : 1/2)   ← ∫₋₁¹ t² dt = 2/3 ; différent
  — Le degré d'exactitude.  [juge value]  départ : r
    = □   (trous : 1)   ← t² est le premier monôme qui échoue
  aides : Teste 1, t, t², … et compare à ∫ de −1 à 1. La première égalité qui échoue donne le degré + 1. | J(t²) = (−1/2)²+(1/2)² et ∫t² = □ | J(t²) = 1/2, ∫t² = 2/3 ; le degré d'exactitude est 1.

```

### Niveau 2

```
J(g) = g(−1/√3) + g(1/√3). Teste les monômes 1, t, t², … : compare J(tᵏ) à ∫₋₁¹ tᵏ dt, puis donne le degré d'exactitude r de J.
  [guided]  I_0
    (∫₋₁¹ 1 dt.)
    = □   (trous : 2)   ← Longueur de [−1 ; 1]
  — J(1) =  [juge value]  départ : J_0
    = □   (trous : 2)   ← égal
  — ∫₋₁¹ t² dt.  [juge value]  départ : I_2
    = □   (trous : 2/3)   ← 2/3
  — J(t²) =  [juge value]  départ : J_2
    = □   (trous : 2/3)   ← égal
  — ∫₋₁¹ t⁴ dt.  [juge value]  départ : I_4
    = □   (trous : 2/5)   ← 2/5
  — J(t⁴) =  [juge value]  départ : J_4
    = □   (trous : 2/9)   ← différent
  — Le degré d'exactitude.  [juge value]  départ : r
    = □   (trous : 3)   ← t⁴ est le premier monôme qui échoue
  aides : Teste 1, t, t², … et compare à ∫ de −1 à 1. La première égalité qui échoue donne le degré + 1. | J(t²) = (−1/√3)²+(1/√3)² et ∫t² = □ | J(t²) = 2/3, ∫t² = 2/3 ; le degré d'exactitude est 3.

J(g) = (1/3)g(−1) + (4/3)g(0) + (1/3)g(1). Teste les monômes 1, t, t², … : compare J(tᵏ) à ∫₋₁¹ tᵏ dt, puis donne le degré d'exactitude r de J.
  [guided]  I_0
    (∫₋₁¹ 1 dt.)
    = □   (trous : 2)   ← Longueur de [−1 ; 1]
  — J(1) =  [juge value]  départ : J_0
    = □   (trous : 2)   ← égal
  — ∫₋₁¹ t² dt.  [juge value]  départ : I_2
    = □   (trous : 2/3)   ← 2/3
  — J(t²) =  [juge value]  départ : J_2
    = □   (trous : 2/3)   ← égal
  — ∫₋₁¹ t⁴ dt.  [juge value]  départ : I_4
    = □   (trous : 2/5)   ← 2/5
  — J(t⁴) =  [juge value]  départ : J_4
    = □   (trous : 2/3)   ← différent
  — Le degré d'exactitude.  [juge value]  départ : r
    = □   (trous : 3)   ← t⁴ est le premier monôme qui échoue
  aides : Teste 1, t, t², … et compare à ∫ de −1 à 1. La première égalité qui échoue donne le degré + 1. | J(t²) = 1/3·(−1)²+4/3·0²+1/3·1² et ∫t² = □ | J(t²) = 2/3, ∫t² = 2/3 ; le degré d'exactitude est 3.

J(g) = g(−1) + g(1). Teste les monômes 1, t, t², … : compare J(tᵏ) à ∫₋₁¹ tᵏ dt, puis donne le degré d'exactitude r de J.
  [guided]  I_0
    (∫₋₁¹ 1 dt.)
    = □   (trous : 2)   ← Longueur de [−1 ; 1]
  — J(1) =  [juge value]  départ : J_0
    = □   (trous : 2)   ← égal
  — ∫₋₁¹ t² dt.  [juge value]  départ : I_2
    = □   (trous : 2/3)   ← 2/3
  — J(t²) =  [juge value]  départ : J_2
    = □   (trous : 2)   ← différent
  — Le degré d'exactitude.  [juge value]  départ : r
    = □   (trous : 1)   ← t² est le premier monôme qui échoue
  aides : Teste 1, t, t², … et compare à ∫ de −1 à 1. La première égalité qui échoue donne le degré + 1. | J(t²) = (−1)²+1² et ∫t² = □ | J(t²) = 2, ∫t² = 2/3 ; le degré d'exactitude est 1.

```

### Niveau 3

```
J(g) = (1/4)g(−1) + (3/4)g(−1/3) + (3/4)g(1/3) + (1/4)g(1). Teste les monômes 1, t, t², … : compare J(tᵏ) à ∫₋₁¹ tᵏ dt, puis donne le degré d'exactitude r de J.
  [tap, suivre l'erreur]  J_0
    (J(1) =)
    = 1/4 + 3/4 + 3/4 + 1/4   ← J(1)
    = 2   ← ∫₋₁¹ 1 dt = 2 ; égal
    ? J(1) = 2 et ∫₋₁¹ 1 dt = 2. Et maintenant ? ✔ Tester t / · Conclure : degré d'exactitude 0
  — J(t) =  [juge value]  départ : J_1
    = 1/4·(−1)¹ + 3/4·(−1/3)¹ + 3/4·(1/3)¹ + 1/4·1¹   ← J(t)
    = 0   ← ∫₋₁¹ t dt = 0 ; égal
    ? J(t) = 0 et ∫₋₁¹ t dt = 0. Et maintenant ? ✔ Tester t² / · Conclure : degré d'exactitude 1
  — J(t²) =  [juge value]  départ : J_2
    = 1/4·(−1)² + 3/4·(−1/3)² + 3/4·(1/3)² + 1/4·1²   ← J(t²)
    = 2/3   ← ∫₋₁¹ t² dt = 2/3 ; égal
    ? J(t²) = 2/3 et ∫₋₁¹ t² dt = 2/3. Et maintenant ? ✔ Tester t³ / · Conclure : degré d'exactitude 2
  — J(t³) =  [juge value]  départ : J_3
    = 1/4·(−1)³ + 3/4·(−1/3)³ + 3/4·(1/3)³ + 1/4·1³   ← J(t³)
    = 0   ← ∫₋₁¹ t³ dt = 0 ; égal
    ? J(t³) = 0 et ∫₋₁¹ t³ dt = 0. Et maintenant ? ✔ Tester t⁴ / · Conclure : degré d'exactitude 3
  — J(t⁴) =  [juge value]  départ : J_4
    = 1/4·(−1)⁴ + 3/4·(−1/3)⁴ + 3/4·(1/3)⁴ + 1/4·1⁴   ← J(t⁴)
    = 14/27   ← ∫₋₁¹ t⁴ dt = 2/5 ; différent
    ? J(t⁴) = 14/27 et ∫₋₁¹ t⁴ dt = 2/5. Et maintenant ? ✔ Conclure : degré d'exactitude 3 / · Tester t⁵
  — Le degré d'exactitude.  [juge value]  départ : r
    = 3   ← t⁴ est le premier monôme qui échoue
  aides : Teste 1, t, t², … et compare à ∫ de −1 à 1. La première égalité qui échoue donne le degré + 1. | J(t²) = 1/4·(−1)²+3/4·(−1/3)²+3/4·(1/3)²+1/4·1² et ∫t² = □ | J(t²) = 2/3, ∫t² = 2/3 ; le degré d'exactitude est 3.
  pièges : n_exactness_stop_early

J(g) = 2g(0). Teste les monômes 1, t, t², … : compare J(tᵏ) à ∫₋₁¹ tᵏ dt, puis donne le degré d'exactitude r de J.
  [tap, suivre l'erreur]  J_0
    (J(1) =)
    = 2   ← ∫₋₁¹ 1 dt = 2 ; égal
    ? J(1) = 2 et ∫₋₁¹ 1 dt = 2. Et maintenant ? ✔ Tester t / · Conclure : degré d'exactitude 0
  — J(t) =  [juge value]  départ : J_1
    = 2·0¹   ← J(t)
    = 0   ← ∫₋₁¹ t dt = 0 ; égal
    ? J(t) = 0 et ∫₋₁¹ t dt = 0. Et maintenant ? ✔ Tester t² / · Conclure : degré d'exactitude 1
  — J(t²) =  [juge value]  départ : J_2
    = 2·0²   ← J(t²)
    = 0   ← ∫₋₁¹ t² dt = 2/3 ; différent
    ? J(t²) = 0 et ∫₋₁¹ t² dt = 2/3. Et maintenant ? ✔ Conclure : degré d'exactitude 1 / · Tester t³
  — Le degré d'exactitude.  [juge value]  départ : r
    = 1   ← t² est le premier monôme qui échoue
  aides : Teste 1, t, t², … et compare à ∫ de −1 à 1. La première égalité qui échoue donne le degré + 1. | J(t²) = 2·0² et ∫t² = □ | J(t²) = 0, ∫t² = 2/3 ; le degré d'exactitude est 1.
  pièges : n_exactness_stop_early

J(g) = g(−1/2) + g(1/2). Teste les monômes 1, t, t², … : compare J(tᵏ) à ∫₋₁¹ tᵏ dt, puis donne le degré d'exactitude r de J.
  [tap, suivre l'erreur]  J_0
    (J(1) =)
    = 1 + 1   ← J(1)
    = 2   ← ∫₋₁¹ 1 dt = 2 ; égal
    ? J(1) = 2 et ∫₋₁¹ 1 dt = 2. Et maintenant ? ✔ Tester t / · Conclure : degré d'exactitude 0
  — J(t) =  [juge value]  départ : J_1
    = (−1/2)¹ + (1/2)¹   ← J(t)
    = 0   ← ∫₋₁¹ t dt = 0 ; égal
    ? J(t) = 0 et ∫₋₁¹ t dt = 0. Et maintenant ? ✔ Tester t² / · Conclure : degré d'exactitude 1
  — J(t²) =  [juge value]  départ : J_2
    = (−1/2)² + (1/2)²   ← J(t²)
    = 1/2   ← ∫₋₁¹ t² dt = 2/3 ; différent
    ? J(t²) = 1/2 et ∫₋₁¹ t² dt = 2/3. Et maintenant ? ✔ Conclure : degré d'exactitude 1 / · Tester t³
  — Le degré d'exactitude.  [juge value]  départ : r
    = 1   ← t² est le premier monôme qui échoue
  aides : Teste 1, t, t², … et compare à ∫ de −1 à 1. La première égalité qui échoue donne le degré + 1. | J(t²) = (−1/2)²+(1/2)² et ∫t² = □ | J(t²) = 1/2, ∫t² = 2/3 ; le degré d'exactitude est 1.
  pièges : n_exactness_stop_early

```

### Niveau 4

```
Trouve les poids de J(g) = ω₀g(−1) + ω₁g(1/3) + ω₂g(1) pour que J soit exacte sur P₂ (∫₋₁¹), puis son degré d'exactitude.
  [free, suivre l'erreur]  ω_1
    (Exacte sur 1, t, t² : ω₀ + ω₁ + ω₂ = 2 ; −ω₀ + 1/3·ω₁ + ω₂ = 0 ; ω₀ + 1/9·ω₁ + ω₂ = 2/3.)
    = 3/2   ← Équation (1) − (3) : ω₁(1 − β²) = 2 − 2/3
  — ω₀ :  [juge value]  départ : ω_0
    = 1/2   ← Avec ω₀ + ω₂ = 2 − ω₁ et ω₂ − ω₀ = −βω₁
  — ω₂ :  [juge value]  départ : ω_2
    = 0   ← Avec ω₀ + ω₂ = 2 − ω₁ et ω₂ − ω₀ = −βω₁
  — Le degré d'exactitude : J(t³) = −4/9 ≠ 0.  [juge value]  départ : r
    = 2   ← t³ échoue
  aides : Écris J(1) = 2, J(t) = 0, J(t²) = 2/3 : trois équations en ω₀, ω₁, ω₂. | ω₁·(1 − 1/9) = □ | ω₀ = 1/2, ω₁ = 3/2, ω₂ = 0 ; degré 2.

Trouve les poids de J(g) = ω₀g(−1) + ω₁g(−1/3) + ω₂g(1) pour que J soit exacte sur P₂ (∫₋₁¹), puis son degré d'exactitude.
  [free, suivre l'erreur]  ω_1
    (Exacte sur 1, t, t² : ω₀ + ω₁ + ω₂ = 2 ; −ω₀ + (−1/3)·ω₁ + ω₂ = 0 ; ω₀ + 1/9·ω₁ + ω₂ = 2/3.)
    = 3/2   ← Équation (1) − (3) : ω₁(1 − β²) = 2 − 2/3
  — ω₀ :  [juge value]  départ : ω_0
    = 0   ← Avec ω₀ + ω₂ = 2 − ω₁ et ω₂ − ω₀ = −βω₁
  — ω₂ :  [juge value]  départ : ω_2
    = 1/2   ← Avec ω₀ + ω₂ = 2 − ω₁ et ω₂ − ω₀ = −βω₁
  — Le degré d'exactitude : J(t³) = 4/9 ≠ 0.  [juge value]  départ : r
    = 2   ← t³ échoue
  aides : Écris J(1) = 2, J(t) = 0, J(t²) = 2/3 : trois équations en ω₀, ω₁, ω₂. | ω₁·(1 − 1/9) = □ | ω₀ = 0, ω₁ = 3/2, ω₂ = 1/2 ; degré 2.

Trouve les poids de J(g) = ω₀g(−1) + ω₁g(−1/3) + ω₂g(1) pour que J soit exacte sur P₂ (∫₋₁¹), puis son degré d'exactitude.
  [free, suivre l'erreur]  ω_1
    (Exacte sur 1, t, t² : ω₀ + ω₁ + ω₂ = 2 ; −ω₀ + (−1/3)·ω₁ + ω₂ = 0 ; ω₀ + 1/9·ω₁ + ω₂ = 2/3.)
    = 3/2   ← Équation (1) − (3) : ω₁(1 − β²) = 2 − 2/3
  — ω₀ :  [juge value]  départ : ω_0
    = 0   ← Avec ω₀ + ω₂ = 2 − ω₁ et ω₂ − ω₀ = −βω₁
  — ω₂ :  [juge value]  départ : ω_2
    = 1/2   ← Avec ω₀ + ω₂ = 2 − ω₁ et ω₂ − ω₀ = −βω₁
  — Le degré d'exactitude : J(t³) = 4/9 ≠ 0.  [juge value]  départ : r
    = 2   ← t³ échoue
  aides : Écris J(1) = 2, J(t) = 0, J(t²) = 2/3 : trois équations en ω₀, ω₁, ω₂. | ω₁·(1 − 1/9) = □ | ω₀ = 0, ω₁ = 3/2, ω₂ = 1/2 ; degré 2.

```

### Niveau 5

```
Complète la formule de Gauss à 2 points composite : sur [xᵢ ; xᵢ + h], x = xᵢ + h(t + 1)/2 ramène à [−1 ; 1], et J(g) = g(−1/√3) + g(1/√3).
  [code python, 3 trous, sans aide]
    | def gauss2(f, a, b, n):
    |     h = (b - a) / n
    |     al = 1 / math.sqrt(3)
    |     s = 0.0
    |     for i in range(n):
    |         xi = a + i * h
    |         # x = xi + h (t + 1) / 2, dx = h/2 dt, noeuds t = -al et t = al
    |         s = s + ⟦h / 2⟧ * (f(⟦xi + h / 2 * (1 - al)⟧) + f(⟦xi + h / 2 * (1 + al)⟧))
    |     return s
    test : def g(x): return x**3 ; gauss2(g, 0, 2, 1) → 4.0
    test : def g(x): return x**4 ; gauss2(g, 0, 2, 1) → 6.222222222222222
    test : def g(x): return x**3 + x*x ; gauss2(g, -1, 3, 2) → 29.333333333333336
  puis : Les tests de ton programme :
      [tableau à lire, sans aide]
      question : Sur [0 ; 2] avec n = 1, gauss2 donne 4 pour x³ (∫ = 4) et 56/9 ≈ 6,2222 pour x⁴ (∫ = 32/5 = 6,4). Qu'en déduis-tu ? Une ou plusieurs réponses justes.
          · La formule composite est d'ordre 3 [n_exactness_order]   ✔ Elle n'est pas exacte sur P₄   · Sans le facteur h/2, gauss2 donnerait encore 4 pour x³ [n_map_jacobian]   ✔ Gauss à 2 points est exacte sur P₃
          pièges : n_exactness_order, n_map_jacobian
      pièges : n_exactness_order, n_map_jacobian
  pièges : n_map_jacobian

Complète la formule de Gauss à 2 points composite : sur [xᵢ ; xᵢ + h], x = xᵢ + h(t + 1)/2 ramène à [−1 ; 1], et J(g) = g(−1/√3) + g(1/√3).
  [code python, 3 trous, sans aide]
    | def gauss2(f, a, b, n):
    |     h = (b - a) / n
    |     al = 1 / math.sqrt(3)
    |     s = 0.0
    |     for i in range(n):
    |         xi = a + i * h
    |         # x = xi + h (t + 1) / 2, dx = h/2 dt, noeuds t = -al et t = al
    |         s = s + ⟦h / 2⟧ * (f(⟦xi + h / 2 * (1 - al)⟧) + f(⟦xi + h / 2 * (1 + al)⟧))
    |     return s
    test : def g(x): return x**3 ; gauss2(g, 0, 2, 1) → 4.0
    test : def g(x): return x**4 ; gauss2(g, 0, 2, 1) → 6.222222222222222
    test : def g(x): return x**3 + x*x ; gauss2(g, -1, 3, 2) → 29.333333333333336
  puis : Les tests de ton programme :
      [tableau à lire, sans aide]
      question : Sur [0 ; 2] avec n = 1, gauss2 donne 4 pour x³ (∫ = 4) et 56/9 ≈ 6,2222 pour x⁴ (∫ = 32/5 = 6,4). Qu'en déduis-tu ? Une ou plusieurs réponses justes.
          · Sans le facteur h/2, gauss2 donnerait encore 4 pour x³ [n_map_jacobian]   ✔ Gauss à 2 points est exacte sur P₃   · La formule composite est d'ordre 3 [n_exactness_order]   ✔ Elle n'est pas exacte sur P₄
          pièges : n_exactness_order, n_map_jacobian
      pièges : n_exactness_order, n_map_jacobian
  pièges : n_map_jacobian

Complète la formule de Gauss à 2 points composite : sur [xᵢ ; xᵢ + h], x = xᵢ + h(t + 1)/2 ramène à [−1 ; 1], et J(g) = g(−1/√3) + g(1/√3).
  [code python, 3 trous, sans aide]
    | def gauss2(f, a, b, n):
    |     h = (b - a) / n
    |     al = 1 / math.sqrt(3)
    |     s = 0.0
    |     for i in range(n):
    |         xi = a + i * h
    |         # x = xi + h (t + 1) / 2, dx = h/2 dt, noeuds t = -al et t = al
    |         s = s + ⟦h / 2⟧ * (f(⟦xi + h / 2 * (1 - al)⟧) + f(⟦xi + h / 2 * (1 + al)⟧))
    |     return s
    test : def g(x): return x**3 ; gauss2(g, 0, 2, 1) → 4.0
    test : def g(x): return x**4 ; gauss2(g, 0, 2, 1) → 6.222222222222222
    test : def g(x): return x**3 + x*x ; gauss2(g, -1, 3, 2) → 29.333333333333336
  puis : Les tests de ton programme :
      [tableau à lire, sans aide]
      question : Sur [0 ; 2] avec n = 1, gauss2 donne 4 pour x³ (∫ = 4) et 56/9 ≈ 6,2222 pour x⁴ (∫ = 32/5 = 6,4). Qu'en déduis-tu ? Une ou plusieurs réponses justes.
          ✔ Elle n'est pas exacte sur P₄   ✔ Gauss à 2 points est exacte sur P₃   · La formule composite est d'ordre 3 [n_exactness_order]   · Sans le facteur h/2, gauss2 donnerait encore 4 pour x³ [n_map_jacobian]
          pièges : n_exactness_order, n_map_jacobian
      pièges : n_exactness_order, n_map_jacobian
  pièges : n_map_jacobian

```

### Variantes d'examen

```
J(g) = (1/3)g(−1) + (4/3)g(0) + (1/3)g(1). Que peut-on affirmer ? Une ou plusieurs réponses justes.
  ✔ La formule composite associée est d'ordre 4   ✔ ∫₋₁¹ p = J(p) pour tout p ∈ P₂   · ∫₋₁¹ p = J(p) pour tout p ∈ P₄   ✔ ∫₋₁¹ p = J(p) pour tout p ∈ P₃   · La formule composite associée est d'ordre 3 [n_exactness_order]
  [examen mcq]
  pièges : n_exactness_order

Vrai ou faux ? Avec h = 1/N et xᵢ = ih (i = 0 … N − 1), ∫₀¹ f(x) dx = h·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt.
  · Vrai [n_map_jacobian]   ✔ Faux
  [examen tf]
  pièges : n_map_jacobian

```

## Ordre d'une formule composite ; lire un tableau d'erreurs (`n-quad-order`, BA4)

_Quand h est divisé par 2, l'erreur est divisée par 2ᵖ._

### Niveau 1

```
Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = e⁻ˣ sin x sur [0 ; 2], avec n sous-intervalles (h = (b − a)/n) :
  [tableau à lire]
    n | erreur (rectangle (à gauche)) | rapport e(n/2)/e(n)
    10 | 1.623e-02 | 
    20 | 7.136e-03 | 2,27
    40 | 3.322e-03 | 2,15
    80 | 1.600e-03 | 2,08
  question : Quel est l'ordre p de la formule ?
      · p = 3   · p = 4   · p = 2 [n_order_ratio_is_p]   ✔ p = 1
      pièges : n_order_ratio_is_p
  pièges : n_order_ratio_is_p

Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = 1/(1 + x²) sur [0 ; 1], avec n sous-intervalles (h = (b − a)/n) :
  [tableau à lire]
    n | erreur (rectangle (à gauche)) | rapport e(n/2)/e(n)
    10 | 2.458e-02 | 
    20 | 1.240e-02 | 1,98
    40 | 6.224e-03 | 1,99
    80 | 3.118e-03 | 2
  question : Quel est l'ordre p de la formule ?
      · p = 3   · p = 4   ✔ p = 1   · p = 2 [n_order_ratio_is_p]
      pièges : n_order_ratio_is_p
  pièges : n_order_ratio_is_p

Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = e⁻ˣ sin x sur [0 ; 2], avec n sous-intervalles (h = (b − a)/n) :
  [tableau à lire]
    n | erreur (trapèze) | rapport e(n/2)/e(n)
    10 | 3.927e-03 | 
    20 | 9.826e-04 | 4
    40 | 2.457e-04 | 4
    80 | 6.142e-05 | 4
  question : Quel est l'ordre p de la formule ?
      · p = 1   · p = 3   · p = 4 [n_order_ratio_is_p]   ✔ p = 2
      pièges : n_order_ratio_is_p
  pièges : n_order_ratio_is_p

```

### Niveau 2

```
Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = cos x sur [0 ; π/2], avec n sous-intervalles (h = (b − a)/n) :
  [tableau à lire]
    n | erreur (trapèze)
    10 | 2.057e-03
    20 | 5.141e-04
    40 | 1.285e-04
    80 | 3.213e-05
  question : Calcule le rapport e(10)/e(20) des erreurs de la formule du trapèze, puis l'ordre p.
      [guided, sans aide]  ρ
        = 0,002057/0,0005141   ← e(10)/e(20)
        = 4   ← h divisé par 2
      — L'ordre : 2ᵖ ≈ rapport.  [juge value]  départ : p
        = □   (trous : 2)   ← 2² = 4
  pièges : n_order_ratio_is_p

Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = e⁻ˣ sin x sur [0 ; 2], avec n sous-intervalles (h = (b − a)/n) :
  [tableau à lire]
    n | erreur (rectangle (à gauche))
    10 | 1.623e-02
    20 | 7.136e-03
    40 | 3.322e-03
    80 | 1.600e-03
  question : Calcule le rapport e(10)/e(20) des erreurs de la formule du rectangle (à gauche), puis l'ordre p.
      [guided, sans aide]  ρ
        = 0,01623/0,007136   ← e(10)/e(20)
        = 2,27   ← h divisé par 2
      — L'ordre : 2ᵖ ≈ rapport.  [juge value]  départ : p
        = □   (trous : 1)   ← 2¹ = 2
  pièges : n_order_ratio_is_p

Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = cos x sur [0 ; π/2], avec n sous-intervalles (h = (b − a)/n) :
  [tableau à lire]
    n | erreur (rectangle (à gauche))
    10 | 7.648e-02
    20 | 3.876e-02
    40 | 1.951e-02
    80 | 9.785e-03
  question : Calcule le rapport e(10)/e(20) des erreurs de la formule du rectangle (à gauche), puis l'ordre p.
      [guided, sans aide]  ρ
        = 0,07648/0,03876   ← e(10)/e(20)
        = 1,97   ← h divisé par 2
      — L'ordre : 2ᵖ ≈ rapport.  [juge value]  départ : p
        = □   (trous : 1)   ← 2¹ = 2
  pièges : n_order_ratio_is_p

```

### Niveau 3

```
Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = e⁻ˣ sin x sur [0 ; 2], avec n sous-intervalles (h = (b − a)/n) : (les colonnes A à D sont le rectangle, le point milieu, le trapèze et Simpson, dans le désordre)
  [tableau à lire]
    n | A | B | C | D
    10 | 1.623e-02 | 3.927e-03 | 1.040e-06 | 1.962e-03
    20 | 7.136e-03 | 9.826e-04 | 6.486e-08 | 4.912e-04
    40 | 3.322e-03 | 2.457e-04 | 4.051e-09 | 1.228e-04
    80 | 1.600e-03 | 6.142e-05 | 2.532e-10 | 3.071e-05
  question : Quelle colonne est celle de la formule de Simpson ?
      · La colonne A   · La colonne B   ✔ La colonne C   · La colonne D

Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = cos x sur [0 ; π/2], avec n sous-intervalles (h = (b − a)/n) : (les colonnes A à D sont le rectangle, le point milieu, le trapèze et Simpson, dans le désordre)
  [tableau à lire]
    n | A | B | C | D
    10 | 1.029e-03 | 2.115e-07 | 2.057e-03 | 7.648e-02
    20 | 2.571e-04 | 1.321e-08 | 5.141e-04 | 3.876e-02
    40 | 6.426e-05 | 8.258e-10 | 1.285e-04 | 1.951e-02
    80 | 1.606e-05 | 5.161e-11 | 3.213e-05 | 9.785e-03
  question : Quelle colonne est celle de la formule du rectangle (à gauche) ?
      · La colonne A   · La colonne B   · La colonne C   ✔ La colonne D

Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = e⁻ˣ sin x sur [0 ; 2], avec n sous-intervalles (h = (b − a)/n) : (les colonnes A à D sont le rectangle, le point milieu, le trapèze et Simpson, dans le désordre)
  [tableau à lire]
    n | A | B | C | D
    10 | 3.927e-03 | 1.962e-03 | 1.623e-02 | 1.040e-06
    20 | 9.826e-04 | 4.912e-04 | 7.136e-03 | 6.486e-08
    40 | 2.457e-04 | 1.228e-04 | 3.322e-03 | 4.051e-09
    80 | 6.142e-05 | 3.071e-05 | 1.600e-03 | 2.532e-10
  question : Quelle colonne est celle de la formule du rectangle (à gauche) ?
      · La colonne A   · La colonne B   ✔ La colonne C   · La colonne D

```

### Niveau 4

```
Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = eˣ sur [0 ; 1], avec n sous-intervalles (h = (b − a)/n) :
  [tableau à lire]
    n | erreur (formule trapèze)
    10 | 1.432e-03
    20 | 3.580e-04
    40 | 8.949e-05
    80 | 2.237e-05
  question : La formule élémentaire du trapèze : donne son degré d'exactitude r, puis l'ordre p de la formule composite, et vérifie-le sur le tableau.
      [free, sans aide, suivre l'erreur]  r
        = 1   ← exacte sur P₁
      — L'ordre de la formule composite.  [juge value]  départ : p
        = 2   ← r + 1 ; rapport ≈ 4 ≈ 2²
  pièges : n_exactness_order

Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = cos x sur [0 ; π/2], avec n sous-intervalles (h = (b − a)/n) :
  [tableau à lire]
    n | erreur (formule Simpson)
    10 | 2.115e-07
    20 | 1.321e-08
    40 | 8.258e-10
    80 | 5.161e-11
  question : La formule élémentaire de Simpson : donne son degré d'exactitude r, puis l'ordre p de la formule composite, et vérifie-le sur le tableau.
      [free, sans aide, suivre l'erreur]  r
        = 3   ← exacte sur P₃
      — L'ordre de la formule composite.  [juge value]  départ : p
        = 4   ← r + 1 ; rapport ≈ 16 ≈ 2⁴
  pièges : n_exactness_order

Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = 1/(1 + x²) sur [0 ; 1], avec n sous-intervalles (h = (b − a)/n) :
  [tableau à lire]
    n | erreur (formule point milieu)
    10 | 2.083e-04
    20 | 5.208e-05
    40 | 1.302e-05
    80 | 3.255e-06
  question : La formule élémentaire du point milieu : donne son degré d'exactitude r, puis l'ordre p de la formule composite, et vérifie-le sur le tableau.
      [free, sans aide, suivre l'erreur]  r
        = 1   ← exacte sur P₁
      — L'ordre de la formule composite.  [juge value]  départ : p
        = 2   ← r + 1 ; rapport ≈ 4 ≈ 2²
  pièges : n_exactness_order

```

### Niveau 5

```
Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = cos x sur [0 ; π/2], avec n sous-intervalles (h = (b − a)/n) : (méthode X inconnue)
  [tableau à lire, sans aide]
    n | méthode X
    10 | 2.115e-07
    20 | 1.321e-08
    40 | 8.258e-10
    80 | 5.161e-11
  question : Qu'en déduis-tu sur la méthode X ? Une ou plusieurs réponses justes.
      · X pourrait être la formule du trapèze   · Diviser h par 2 divise l'erreur par 32   ✔ X est d'ordre 4   ✔ X est exacte sur P₃ (degré d'exactitude 3)

Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = e⁻ˣ sin x sur [0 ; 2], avec n sous-intervalles (h = (b − a)/n) : (méthode X inconnue)
  [tableau à lire, sans aide]
    n | méthode X
    10 | 1.962e-03
    20 | 4.912e-04
    40 | 1.228e-04
    80 | 3.071e-05
  question : Qu'en déduis-tu sur la méthode X ? Une ou plusieurs réponses justes.
      ✔ X est exacte sur P₁ (degré d'exactitude 1)   · X pourrait être la formule de Simpson   ✔ X est d'ordre 2   · Diviser h par 2 divise l'erreur par 8

Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = e⁻ˣ sin x sur [0 ; 2], avec n sous-intervalles (h = (b − a)/n) : (méthode X inconnue)
  [tableau à lire, sans aide]
    n | méthode X
    10 | 1.962e-03
    20 | 4.912e-04
    40 | 1.228e-04
    80 | 3.071e-05
  question : Qu'en déduis-tu sur la méthode X ? Une ou plusieurs réponses justes.
      · X est d'ordre 4 [n_order_ratio_is_p]   · X pourrait être la formule de Simpson   · Diviser h par 2 divise l'erreur par 8   ✔ X est d'ordre 2
      pièges : n_order_ratio_is_p
  pièges : n_order_ratio_is_p

```

### Variantes d'examen

```
Erreurs |∫ f − Q_h(f)| des formules composites pour f(x) = eˣ sur [0 ; 1], avec n sous-intervalles (h = (b − a)/n) :nméthode X107.157e-04201.790e-04404.475e-05801.119e-05 Une ou plusieurs réponses justes.
  ✔ X est d'ordre 2   ✔ X est exacte sur P₁ (degré d'exactitude 1)   · X pourrait être la formule de Simpson   · X est d'ordre 4 [n_order_ratio_is_p]
  [examen mcq]
  pièges : n_order_ratio_is_p

Vrai ou faux ?
  « La formule du trapèze composite, qui utilise les extrémités des sous-intervalles, est toujours plus précise que celle du point milieu (même n). » → FAUX
    contre-exemple (num) : f = x^2
  [examen tf]

```

## Prouver l'ordre d'une formule composite par Taylor (`n-quad-proof`, BA4)

_Changement de variable, Taylor, exactitude de J, puis une constante explicite._

### Niveau 1

```
Formule composite associée à J(g) = 2g(0) (point milieu) sur [a ; b], h = (b − a)/N. Sur chaque sous-intervalle, f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t) avec rᵢ(t) = (h²t²/8)·f″(ξᵢ(t)), et ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt. Majore cette erreur : calcule d'abord ∫₋₁¹ t² dt.
  [guided]  ∫_{−1}^{1} t² dt
    = □   (trous : 2/3)   ← ∫₋₁¹ t² dt
  — Sur N sous-intervalles : |∫f − L_h(f)| ≤ (h/2)·N·(h²/8)·max|f″|·∫₋₁¹ t² dt. Écris la borne avec L = b − a = Nh et M = max|f″|.  [juge equiv]  départ : (h/2)·N·(h²/8)·(2/3)·M
    = N·h³·M/24   ← On regroupe
    = □·h²·M/24   (trous : L·h²·M/24)   ← N·h = b − a : la constante ne dépend plus de h
  aides : |rᵢ(t)| ≤ h²/8·|t²|·max|f″| : intègre ce poids sur [−1 ; 1], puis somme sur les N sous-intervalles. | (h/2)·N·(h²/8)·□·M | (h/2)·N·(h²/8)·2/3·M = (b − a)·h²/24·max|f″|, car Nh = b − a.

Formule composite associée à J(g) = 2g(−1) (rectangle à gauche) sur [a ; b], h = (b − a)/N. Sur chaque sous-intervalle, f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t) avec rᵢ(t) = (h(t + 1)/2)·f′(ξᵢ(t)), et ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt. Majore cette erreur : calcule d'abord ∫₋₁¹ t + 1 dt.
  [guided]  ∫_{−1}^{1} (t + 1) dt
    = □   (trous : 2)   ← ∫₋₁¹ t + 1 dt
  — Sur N sous-intervalles : |∫f − L_h(f)| ≤ (h/2)·N·(h/2)·max|f′|·∫₋₁¹ t + 1 dt. Écris la borne avec L = b − a = Nh et M = max|f′|.  [juge equiv]  départ : (h/2)·N·(h/2)·(2)·M
    = N·h²·M/2   ← On regroupe
    = □·h·M/2   (trous : L·h·M/2)   ← N·h = b − a : la constante ne dépend plus de h
  aides : |rᵢ(t)| ≤ h/2·|t + 1|·max|f′| : intègre ce poids sur [−1 ; 1], puis somme sur les N sous-intervalles. | (h/2)·N·(h/2)·□·M | (h/2)·N·(h/2)·2·M = (b − a)·h/2·max|f′|, car Nh = b − a.

Formule composite associée à J(g) = 2g(−1) (rectangle à gauche) sur [a ; b], h = (b − a)/N. Sur chaque sous-intervalle, f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t) avec rᵢ(t) = (h(t + 1)/2)·f′(ξᵢ(t)), et ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt. Majore cette erreur : calcule d'abord ∫₋₁¹ t + 1 dt.
  [guided]  ∫_{−1}^{1} (t + 1) dt
    = □   (trous : 2)   ← ∫₋₁¹ t + 1 dt
  — Sur N sous-intervalles : |∫f − L_h(f)| ≤ (h/2)·N·(h/2)·max|f′|·∫₋₁¹ t + 1 dt. Écris la borne avec L = b − a = Nh et M = max|f′|.  [juge equiv]  départ : (h/2)·N·(h/2)·(2)·M
    = N·h²·M/2   ← On regroupe
    = □·h·M/2   (trous : L·h·M/2)   ← N·h = b − a : la constante ne dépend plus de h
  aides : |rᵢ(t)| ≤ h/2·|t + 1|·max|f′| : intègre ce poids sur [−1 ; 1], puis somme sur les N sous-intervalles. | (h/2)·N·(h/2)·□·M | (h/2)·N·(h/2)·2·M = (b − a)·h/2·max|f′|, car Nh = b − a.

```

### Niveau 2

```
Erreurs des formules composites du rectangle à gauche (J = 2g(−1)) et du point milieu (J = 2g(0)) pour f(x) = e⁻ˣ sin x sur [0 ; 2] :
  [tableau à lire]
    n | rectangle | point milieu
    10 | 1.623e-02 | 1.962e-03
    20 | 7.136e-03 | 4.912e-04
    40 | 3.322e-03 | 1.228e-04
    80 | 1.600e-03 | 3.071e-05
  question : Que devient l'ordre si l'on remplace J(g) = 2g(0) par J(g) = 2g(−1) ?
      ✔ Ordre 1 : l'erreur n'est plus divisée que par 2 quand n double   · Ordre 2, comme le point milieu : la composite ne dépend pas de J   · Ordre 0 : la formule ne converge pas   · Ordre 2, puisque l'erreur est divisée par 2 [n_order_ratio_is_p]
      pièges : n_order_ratio_is_p
  pièges : n_order_ratio_is_p

Erreurs des formules composites du rectangle à gauche (J = 2g(−1)) et du point milieu (J = 2g(0)) pour f(x) = e⁻ˣ sin x sur [0 ; 2] :
  [tableau à lire]
    n | rectangle | point milieu
    10 | 1.623e-02 | 1.962e-03
    20 | 7.136e-03 | 4.912e-04
    40 | 3.322e-03 | 1.228e-04
    80 | 1.600e-03 | 3.071e-05
  question : Que devient l'ordre si l'on remplace J(g) = 2g(0) par J(g) = 2g(1) ?
      · Ordre 2, puisque l'erreur est divisée par 2 [n_order_ratio_is_p]   ✔ Ordre 1 : l'erreur n'est plus divisée que par 2 quand n double   · Ordre 2, comme le point milieu : la composite ne dépend pas de J   · Ordre 0 : la formule ne converge pas
      pièges : n_order_ratio_is_p
  pièges : n_order_ratio_is_p

Erreurs des formules composites du rectangle à gauche (J = 2g(−1)) et du point milieu (J = 2g(0)) pour f(x) = e⁻ˣ sin x sur [0 ; 2] :
  [tableau à lire]
    n | rectangle | point milieu
    10 | 1.623e-02 | 1.962e-03
    20 | 7.136e-03 | 4.912e-04
    40 | 3.322e-03 | 1.228e-04
    80 | 1.600e-03 | 3.071e-05
  question : Que devient l'ordre si l'on remplace J(g) = 2g(0) par J(g) = 2g(−1) ?
      ✔ Ordre 1 : l'erreur n'est plus divisée que par 2 quand n double   · Ordre 0 : la formule ne converge pas   · Ordre 2, comme le point milieu : la composite ne dépend pas de J   · Ordre 2, puisque l'erreur est divisée par 2 [n_order_ratio_is_p]
      pièges : n_order_ratio_is_p
  pièges : n_order_ratio_is_p

```

### Niveau 3

```
Formule composite associée à J(g) = 2g(−1) (rectangle à gauche) sur [a ; b], h = (b − a)/N. Sur chaque sous-intervalle, f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t) avec rᵢ(t) = (h(t + 1)/2)·f′(ξᵢ(t)), et ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt. Majore cette erreur : calcule d'abord ∫₋₁¹ t + 1 dt.
  [tap, suivre l'erreur]  ∫_{−1}^{1} (t + 1) dt
    ? Autour de quel point développe-t-on f(xᵢ + h(t + 1)/2) pour J(g) = 2g(−1) ? ✔ xᵢ / · cᵢ = xᵢ + h/2 / · ξᵢ, un point inconnu
    ? Jusqu'à quel degré écrire pᵢ(t) avant le reste ? ✔ Degré 0 : J est exacte sur P₀ / · Degré 1 / · Aucun : on majore f directement
    = 2   ← ∫₋₁¹ t + 1 dt
  — Sur N sous-intervalles : |∫f − L_h(f)| ≤ (h/2)·N·(h/2)·max|f′|·∫₋₁¹ t + 1 dt. Écris la borne avec L = b − a = Nh et M = max|f′|.  [juge equiv]  départ : (h/2)·N·(h/2)·(2)·M
    = N·h²·M/2   ← On regroupe
    = L·h·M/2   ← N·h = b − a : la constante ne dépend plus de h
  aides : |rᵢ(t)| ≤ h/2·|t + 1|·max|f′| : intègre ce poids sur [−1 ; 1], puis somme sur les N sous-intervalles. | (h/2)·N·(h/2)·□·M | (h/2)·N·(h/2)·2·M = (b − a)·h/2·max|f′|, car Nh = b − a.
  pièges : n_exactness_order

Formule composite associée à J(g) = 2g(1) (rectangle à droite) sur [a ; b], h = (b − a)/N. Sur chaque sous-intervalle, f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t) avec rᵢ(t) = (h(t − 1)/2)·f′(ξᵢ(t)), et ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt. Majore cette erreur : calcule d'abord ∫₋₁¹ 1 − t dt.
  [tap, suivre l'erreur]  ∫_{−1}^{1} (1 − t) dt
    ? Autour de quel point développe-t-on f(xᵢ + h(t + 1)/2) pour J(g) = 2g(1) ? ✔ xᵢ₊₁ / · cᵢ = xᵢ + h/2 / · ξᵢ, un point inconnu
    ? Jusqu'à quel degré écrire pᵢ(t) avant le reste ? ✔ Degré 0 : J est exacte sur P₀ / · Degré 1 / · Aucun : on majore f directement
    = 2   ← ∫₋₁¹ 1 − t dt
  — Sur N sous-intervalles : |∫f − L_h(f)| ≤ (h/2)·N·(h/2)·max|f′|·∫₋₁¹ 1 − t dt. Écris la borne avec L = b − a = Nh et M = max|f′|.  [juge equiv]  départ : (h/2)·N·(h/2)·(2)·M
    = N·h²·M/2   ← On regroupe
    = L·h·M/2   ← N·h = b − a : la constante ne dépend plus de h
  aides : |rᵢ(t)| ≤ h/2·|1 − t|·max|f′| : intègre ce poids sur [−1 ; 1], puis somme sur les N sous-intervalles. | (h/2)·N·(h/2)·□·M | (h/2)·N·(h/2)·2·M = (b − a)·h/2·max|f′|, car Nh = b − a.
  pièges : n_exactness_order

Formule composite associée à J(g) = 2g(−1) (rectangle à gauche) sur [a ; b], h = (b − a)/N. Sur chaque sous-intervalle, f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t) avec rᵢ(t) = (h(t + 1)/2)·f′(ξᵢ(t)), et ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt. Majore cette erreur : calcule d'abord ∫₋₁¹ t + 1 dt.
  [tap, suivre l'erreur]  ∫_{−1}^{1} (t + 1) dt
    ? Autour de quel point développe-t-on f(xᵢ + h(t + 1)/2) pour J(g) = 2g(−1) ? ✔ xᵢ / · cᵢ = xᵢ + h/2 / · ξᵢ, un point inconnu
    ? Jusqu'à quel degré écrire pᵢ(t) avant le reste ? ✔ Degré 0 : J est exacte sur P₀ / · Degré 1 / · Aucun : on majore f directement
    = 2   ← ∫₋₁¹ t + 1 dt
  — Sur N sous-intervalles : |∫f − L_h(f)| ≤ (h/2)·N·(h/2)·max|f′|·∫₋₁¹ t + 1 dt. Écris la borne avec L = b − a = Nh et M = max|f′|.  [juge equiv]  départ : (h/2)·N·(h/2)·(2)·M
    = N·h²·M/2   ← On regroupe
    = L·h·M/2   ← N·h = b − a : la constante ne dépend plus de h
  aides : |rᵢ(t)| ≤ h/2·|t + 1|·max|f′| : intègre ce poids sur [−1 ; 1], puis somme sur les N sous-intervalles. | (h/2)·N·(h/2)·□·M | (h/2)·N·(h/2)·2·M = (b − a)·h/2·max|f′|, car Nh = b − a.
  pièges : n_exactness_order

```

### Niveau 4

```
Montre que ∫ₐᵇ f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt pour J(g) = 2g(0) (point milieu). Touche les blocs dans l'ordre de la preuve ; un bloc est faux.
  [blocs order]
    1. f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t), avec pᵢ ∈ P₁ (Taylor en cᵢ = xᵢ + h/2) et rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))
    2. J(pᵢ) = ∫₋₁¹ pᵢ(t) dt, car J est exacte sur P₁
    3. Par linéarité : ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt − J(f(xᵢ + h(· + 1)/2)) = ∫₋₁¹ rᵢ(t) dt − J(rᵢ)
    4. J(rᵢ) = 2rᵢ(0) = 0, car rᵢ s'annule en t = 0
    5. On somme sur i avec le facteur h/2 : ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt
    ✗ rᵢ(t) = 0, car t est petit : l'erreur est nulle [n_proof_same_xi]
  pièges : n_proof_same_xi

Montre que ∫ₐᵇ f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt pour J(g) = 2g(0) (point milieu). Touche les blocs dans l'ordre de la preuve ; un bloc est faux.
  [blocs order]
    1. f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t), avec pᵢ ∈ P₁ (Taylor en cᵢ = xᵢ + h/2) et rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))
    2. J(pᵢ) = ∫₋₁¹ pᵢ(t) dt, car J est exacte sur P₁
    3. Par linéarité : ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt − J(f(xᵢ + h(· + 1)/2)) = ∫₋₁¹ rᵢ(t) dt − J(rᵢ)
    4. J(rᵢ) = 2rᵢ(0) = 0, car rᵢ s'annule en t = 0
    5. On somme sur i avec le facteur h/2 : ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt
    ✗ rᵢ(t) = 0, car t est petit : l'erreur est nulle [n_proof_same_xi]
  pièges : n_proof_same_xi

Montre que ∫ₐᵇ f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt pour J(g) = 2g(−1) (rectangle à gauche). Touche les blocs dans l'ordre de la preuve ; un bloc est faux.
  [blocs order]
    1. f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t), avec pᵢ ∈ P₀ (Taylor en xᵢ) et rᵢ(t) = (h(t + 1)/2)·f′(ξᵢ(t))
    2. J(pᵢ) = ∫₋₁¹ pᵢ(t) dt, car J est exacte sur P₀
    3. Par linéarité : ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt − J(f(xᵢ + h(· + 1)/2)) = ∫₋₁¹ rᵢ(t) dt − J(rᵢ)
    4. J(rᵢ) = 2rᵢ(−1) = 0, car rᵢ s'annule en t = −1
    5. On somme sur i avec le facteur h/2 : ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt
    ✗ rᵢ(t) = 0, car t est petit : l'erreur est nulle [n_proof_same_xi]
  pièges : n_proof_same_xi

```

### Niveau 5

```
Soit f ∈ C²[a ; b], h = (b − a)/N, xᵢ = a + ih, et J(g) = 2g(0) sur [−1 ; 1] (point milieu). Prouve que la formule composite L_h est d'ordre 2, avec une constante explicite.
  [problème, 10 points]
  partie 1 ((a) Changement de variable : 1,5)
  Sur [xᵢ ; xᵢ₊₁], on pose x = xᵢ + h(t + 1)/2. Alors ∫ₐᵇ f(x) dx =
    · (h/2)·Σᵢ ∫₋₁¹ f(xᵢ + ht/2) dt   · Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt [n_map_jacobian]   ✔ (h/2)·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt   · h·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt
  partie 2 ((b) La formule L_h : 1)
  Avec J(g) = 2g(0), la formule composite L_h(f) vaut :
    · 2h·Σᵢ f(xᵢ + h/2) [n_map_jacobian]   · h·Σᵢ f(xᵢ)   ✔ h·Σᵢ f(xᵢ + h/2)   · (h/2)·Σᵢ f(xᵢ + h/2)
  partie 3 ((c) Taylor : pᵢ + rᵢ : 2)
  Taylor autour de cᵢ = xᵢ + h/2 : f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t), pᵢ ∈ P₁, avec
    ✔ pᵢ(t) = f(cᵢ) + (ht/2)·f′(cᵢ), rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))   · pᵢ(t) = f(cᵢ) + ht·f′(cᵢ), rᵢ(t) = (h²t²/2)·f″(ξᵢ(t))   · pᵢ(t) = f(xᵢ) + (ht/2)·f′(xᵢ), rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))   · pᵢ(t) = f(cᵢ) + (ht/2)·f′(cᵢ), rᵢ(t) = (h²t²/4)·f″(ξᵢ(t))
  partie 4 ((d) L'erreur ne vient que des restes : 1,5)
  Montre que ∫ₐᵇ f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt pour J(g) = 2g(0) (point milieu). Touche les blocs dans l'ordre de la preuve ; un bloc est faux.
    [blocs order, sans aide]
      1. f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t), avec pᵢ ∈ P₁ (Taylor en cᵢ = xᵢ + h/2) et rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))
      2. J(pᵢ) = ∫₋₁¹ pᵢ(t) dt, car J est exacte sur P₁
      3. Par linéarité : ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt − J(f(xᵢ + h(· + 1)/2)) = ∫₋₁¹ rᵢ(t) dt − J(rᵢ)
      4. J(rᵢ) = 2rᵢ(0) = 0, car rᵢ s'annule en t = 0
      5. On somme sur i avec le facteur h/2 : ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt
      ✗ rᵢ(t) = 0, car t est petit : l'erreur est nulle [n_proof_same_xi]
  partie 5 ((e) La majoration : 1 ; Sur N sous-intervalles : |∫f − L_h(f)| ≤ (h/2)·N·(h²/8)·max|f″|·∫₋₁¹ t² dt. Écris la borne avec L = b − a = Nh et M = max|f″|. : 1,5)
  Majore |∫ₐᵇ f − L_h(f)| : calcule ∫₋₁¹ t² dt, puis la borne avec L = b − a et M = max|f″|.
    [free, sans aide, suivre l'erreur]  ∫_{−1}^{1} t² dt
      = 2/3   ← ∫₋₁¹ t² dt
    — Sur N sous-intervalles : |∫f − L_h(f)| ≤ (h/2)·N·(h²/8)·max|f″|·∫₋₁¹ t² dt. Écris la borne avec L = b − a = Nh et M = max|f″|.  [juge equiv]  départ : (h/2)·N·(h²/8)·(2/3)·M
      = N·h³·M/24   ← On regroupe
      = L·h²·M/24   ← N·h = b − a : la constante ne dépend plus de h
  partie 6 ((f) Avec J(g) = 2g(−1) : 1,5)
  Même question avec J(g) = 2g(−1) (f ∈ C¹[a ; b]) :
    ✔ ordre 1 : |∫f − L_h(f)| ≤ (b − a)/2·h·max|f′|   · ordre 1 : |∫f − L_h(f)| ≤ (b − a)/2·h·|f′(ξ)| [n_proof_constant_depends_h]   · ordre 2 : |∫f − L_h(f)| ≤ (b − a)/24·h²·max|f″| [n_exactness_order]   · ordre 1 : |∫f − L_h(f)| ≤ (N/2)·h·max|f′| [n_proof_sum_count]
  pièges : n_map_jacobian, n_proof_same_xi, n_exactness_order, n_proof_sum_count, n_proof_constant_depends_h

Soit f ∈ C²[a ; b], h = (b − a)/N, xᵢ = a + ih, et J(g) = 2g(0) sur [−1 ; 1] (point milieu). Prouve que la formule composite L_h est d'ordre 2, avec une constante explicite.
  [problème, 10 points]
  partie 1 ((a) Changement de variable : 1,5)
  Sur [xᵢ ; xᵢ₊₁], on pose x = xᵢ + h(t + 1)/2. Alors ∫ₐᵇ f(x) dx =
    · h·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt   · Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt [n_map_jacobian]   ✔ (h/2)·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt   · (h/2)·Σᵢ ∫₋₁¹ f(xᵢ + ht/2) dt
  partie 2 ((b) La formule L_h : 1)
  Avec J(g) = 2g(0), la formule composite L_h(f) vaut :
    · h·Σᵢ f(xᵢ)   · 2h·Σᵢ f(xᵢ + h/2) [n_map_jacobian]   · (h/2)·Σᵢ f(xᵢ + h/2)   ✔ h·Σᵢ f(xᵢ + h/2)
  partie 3 ((c) Taylor : pᵢ + rᵢ : 2)
  Taylor autour de cᵢ = xᵢ + h/2 : f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t), pᵢ ∈ P₁, avec
    · pᵢ(t) = f(xᵢ) + (ht/2)·f′(xᵢ), rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))   ✔ pᵢ(t) = f(cᵢ) + (ht/2)·f′(cᵢ), rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))   · pᵢ(t) = f(cᵢ) + ht·f′(cᵢ), rᵢ(t) = (h²t²/2)·f″(ξᵢ(t))   · pᵢ(t) = f(cᵢ) + (ht/2)·f′(cᵢ), rᵢ(t) = (h²t²/4)·f″(ξᵢ(t))
  partie 4 ((d) L'erreur ne vient que des restes : 1,5)
  Montre que ∫ₐᵇ f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt pour J(g) = 2g(0) (point milieu). Touche les blocs dans l'ordre de la preuve ; un bloc est faux.
    [blocs order, sans aide]
      1. f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t), avec pᵢ ∈ P₁ (Taylor en cᵢ = xᵢ + h/2) et rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))
      2. J(pᵢ) = ∫₋₁¹ pᵢ(t) dt, car J est exacte sur P₁
      3. Par linéarité : ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt − J(f(xᵢ + h(· + 1)/2)) = ∫₋₁¹ rᵢ(t) dt − J(rᵢ)
      4. J(rᵢ) = 2rᵢ(0) = 0, car rᵢ s'annule en t = 0
      5. On somme sur i avec le facteur h/2 : ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt
      ✗ rᵢ(t) = 0, car t est petit : l'erreur est nulle [n_proof_same_xi]
  partie 5 ((e) La majoration : 1 ; Sur N sous-intervalles : |∫f − L_h(f)| ≤ (h/2)·N·(h²/8)·max|f″|·∫₋₁¹ t² dt. Écris la borne avec L = b − a = Nh et M = max|f″|. : 1,5)
  Majore |∫ₐᵇ f − L_h(f)| : calcule ∫₋₁¹ t² dt, puis la borne avec L = b − a et M = max|f″|.
    [free, sans aide, suivre l'erreur]  ∫_{−1}^{1} t² dt
      = 2/3   ← ∫₋₁¹ t² dt
    — Sur N sous-intervalles : |∫f − L_h(f)| ≤ (h/2)·N·(h²/8)·max|f″|·∫₋₁¹ t² dt. Écris la borne avec L = b − a = Nh et M = max|f″|.  [juge equiv]  départ : (h/2)·N·(h²/8)·(2/3)·M
      = N·h³·M/24   ← On regroupe
      = L·h²·M/24   ← N·h = b − a : la constante ne dépend plus de h
  partie 6 ((f) Avec J(g) = 2g(1) : 1,5)
  Même question avec J(g) = 2g(1) (f ∈ C¹[a ; b]) :
    · ordre 1 : |∫f − L_h(f)| ≤ (N/2)·h·max|f′| [n_proof_sum_count]   · ordre 1 : |∫f − L_h(f)| ≤ (b − a)/2·h·|f′(ξ)| [n_proof_constant_depends_h]   · ordre 2 : |∫f − L_h(f)| ≤ (b − a)/24·h²·max|f″| [n_exactness_order]   ✔ ordre 1 : |∫f − L_h(f)| ≤ (b − a)/2·h·max|f′|
  pièges : n_map_jacobian, n_proof_same_xi, n_exactness_order, n_proof_sum_count, n_proof_constant_depends_h

Soit f ∈ C²[a ; b], h = (b − a)/N, xᵢ = a + ih, et J(g) = 2g(0) sur [−1 ; 1] (point milieu). Prouve que la formule composite L_h est d'ordre 2, avec une constante explicite.
  [problème, 10 points]
  partie 1 ((a) Changement de variable : 1,5)
  Sur [xᵢ ; xᵢ₊₁], on pose x = xᵢ + h(t + 1)/2. Alors ∫ₐᵇ f(x) dx =
    · (h/2)·Σᵢ ∫₋₁¹ f(xᵢ + ht/2) dt   · h·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt   ✔ (h/2)·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt   · Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt [n_map_jacobian]
  partie 2 ((b) La formule L_h : 1)
  Avec J(g) = 2g(0), la formule composite L_h(f) vaut :
    · 2h·Σᵢ f(xᵢ + h/2) [n_map_jacobian]   · (h/2)·Σᵢ f(xᵢ + h/2)   · h·Σᵢ f(xᵢ)   ✔ h·Σᵢ f(xᵢ + h/2)
  partie 3 ((c) Taylor : pᵢ + rᵢ : 2)
  Taylor autour de cᵢ = xᵢ + h/2 : f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t), pᵢ ∈ P₁, avec
    · pᵢ(t) = f(xᵢ) + (ht/2)·f′(xᵢ), rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))   · pᵢ(t) = f(cᵢ) + (ht/2)·f′(cᵢ), rᵢ(t) = (h²t²/4)·f″(ξᵢ(t))   ✔ pᵢ(t) = f(cᵢ) + (ht/2)·f′(cᵢ), rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))   · pᵢ(t) = f(cᵢ) + ht·f′(cᵢ), rᵢ(t) = (h²t²/2)·f″(ξᵢ(t))
  partie 4 ((d) L'erreur ne vient que des restes : 1,5)
  Montre que ∫ₐᵇ f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt pour J(g) = 2g(−1) (rectangle à gauche). Touche les blocs dans l'ordre de la preuve ; un bloc est faux.
    [blocs order, sans aide]
      1. f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t), avec pᵢ ∈ P₀ (Taylor en xᵢ) et rᵢ(t) = (h(t + 1)/2)·f′(ξᵢ(t))
      2. J(pᵢ) = ∫₋₁¹ pᵢ(t) dt, car J est exacte sur P₀
      3. Par linéarité : ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt − J(f(xᵢ + h(· + 1)/2)) = ∫₋₁¹ rᵢ(t) dt − J(rᵢ)
      4. J(rᵢ) = 2rᵢ(−1) = 0, car rᵢ s'annule en t = −1
      5. On somme sur i avec le facteur h/2 : ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt
      ✗ rᵢ(t) = 0, car t est petit : l'erreur est nulle [n_proof_same_xi]
  partie 5 ((e) La majoration : 1 ; Sur N sous-intervalles : |∫f − L_h(f)| ≤ (h/2)·N·(h²/8)·max|f″|·∫₋₁¹ t² dt. Écris la borne avec L = b − a = Nh et M = max|f″|. : 1,5)
  Majore |∫ₐᵇ f − L_h(f)| : calcule ∫₋₁¹ t² dt, puis la borne avec L = b − a et M = max|f″|.
    [free, sans aide, suivre l'erreur]  ∫_{−1}^{1} t² dt
      = 2/3   ← ∫₋₁¹ t² dt
    — Sur N sous-intervalles : |∫f − L_h(f)| ≤ (h/2)·N·(h²/8)·max|f″|·∫₋₁¹ t² dt. Écris la borne avec L = b − a = Nh et M = max|f″|.  [juge equiv]  départ : (h/2)·N·(h²/8)·(2/3)·M
      = N·h³·M/24   ← On regroupe
      = L·h²·M/24   ← N·h = b − a : la constante ne dépend plus de h
  partie 6 ((f) Avec J(g) = 2g(1) : 1,5)
  Même question avec J(g) = 2g(1) (f ∈ C¹[a ; b]) :
    · ordre 1 : |∫f − L_h(f)| ≤ (b − a)/2·h·|f′(ξ)| [n_proof_constant_depends_h]   ✔ ordre 1 : |∫f − L_h(f)| ≤ (b − a)/2·h·max|f′|   · ordre 1 : |∫f − L_h(f)| ≤ (N/2)·h·max|f′| [n_proof_sum_count]   · ordre 2 : |∫f − L_h(f)| ≤ (b − a)/24·h²·max|f″| [n_exactness_order]
  pièges : n_map_jacobian, n_proof_same_xi, n_exactness_order, n_proof_sum_count, n_proof_constant_depends_h

```

### Variantes d'examen

```
Vrai ou faux ? Pour le point milieu composite, la majoration |∫ₐᵇ f − L_h(f)| ≤ (N·h³/24)·max|f″| montre l'ordre 3.
  · Vrai [n_proof_sum_count]   ✔ Faux
  [examen tf]
  pièges : n_proof_sum_count

Soit f ∈ C²[a ; b], h = (b − a)/N, xᵢ = a + ih, et J(g) = 2g(0) sur [−1 ; 1] (point milieu). Prouve que la formule composite L_h est d'ordre 2, avec une constante explicite.
  [problème, examen open, 10 points]
  partie 1 ((a) Changement de variable : 1,5)
  Sur [xᵢ ; xᵢ₊₁], on pose x = xᵢ + h(t + 1)/2. Alors ∫ₐᵇ f(x) dx =
    ✔ (h/2)·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt   · (h/2)·Σᵢ ∫₋₁¹ f(xᵢ + ht/2) dt   · h·Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt   · Σᵢ ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt [n_map_jacobian]
  partie 2 ((b) La formule L_h : 1)
  Avec J(g) = 2g(0), la formule composite L_h(f) vaut :
    · h·Σᵢ f(xᵢ)   · (h/2)·Σᵢ f(xᵢ + h/2)   · 2h·Σᵢ f(xᵢ + h/2) [n_map_jacobian]   ✔ h·Σᵢ f(xᵢ + h/2)
  partie 3 ((c) Taylor : pᵢ + rᵢ : 2)
  Taylor autour de cᵢ = xᵢ + h/2 : f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t), pᵢ ∈ P₁, avec
    · pᵢ(t) = f(cᵢ) + (ht/2)·f′(cᵢ), rᵢ(t) = (h²t²/4)·f″(ξᵢ(t))   ✔ pᵢ(t) = f(cᵢ) + (ht/2)·f′(cᵢ), rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))   · pᵢ(t) = f(xᵢ) + (ht/2)·f′(xᵢ), rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))   · pᵢ(t) = f(cᵢ) + ht·f′(cᵢ), rᵢ(t) = (h²t²/2)·f″(ξᵢ(t))
  partie 4 ((d) L'erreur ne vient que des restes : 1,5)
  Montre que ∫ₐᵇ f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt pour J(g) = 2g(0) (point milieu). Touche les blocs dans l'ordre de la preuve ; un bloc est faux.
    [blocs order, sans aide]
      1. f(xᵢ + h(t + 1)/2) = pᵢ(t) + rᵢ(t), avec pᵢ ∈ P₁ (Taylor en cᵢ = xᵢ + h/2) et rᵢ(t) = (h²t²/8)·f″(ξᵢ(t))
      2. J(pᵢ) = ∫₋₁¹ pᵢ(t) dt, car J est exacte sur P₁
      3. Par linéarité : ∫₋₁¹ f(xᵢ + h(t + 1)/2) dt − J(f(xᵢ + h(· + 1)/2)) = ∫₋₁¹ rᵢ(t) dt − J(rᵢ)
      4. J(rᵢ) = 2rᵢ(0) = 0, car rᵢ s'annule en t = 0
      5. On somme sur i avec le facteur h/2 : ∫f − L_h(f) = (h/2)·Σᵢ ∫₋₁¹ rᵢ(t) dt
      ✗ rᵢ(t) = 0, car t est petit : l'erreur est nulle [n_proof_same_xi]
    [examen open]
  partie 5 ((e) La majoration : 1 ; Sur N sous-intervalles : |∫f − L_h(f)| ≤ (h/2)·N·(h²/8)·max|f″|·∫₋₁¹ t² dt. Écris la borne avec L = b − a = Nh et M = max|f″|. : 1,5)
  Majore |∫ₐᵇ f − L_h(f)| : calcule ∫₋₁¹ t² dt, puis la borne avec L = b − a et M = max|f″|.
    [free, sans aide, suivre l'erreur]  ∫_{−1}^{1} t² dt
      = 2/3   ← ∫₋₁¹ t² dt
    — Sur N sous-intervalles : |∫f − L_h(f)| ≤ (h/2)·N·(h²/8)·max|f″|·∫₋₁¹ t² dt. Écris la borne avec L = b − a = Nh et M = max|f″|.  [juge equiv]  départ : (h/2)·N·(h²/8)·(2/3)·M
      = N·h³·M/24   ← On regroupe
      = L·h²·M/24   ← N·h = b − a : la constante ne dépend plus de h
  partie 6 ((f) Avec J(g) = 2g(−1) : 1,5)
  Même question avec J(g) = 2g(−1) (f ∈ C¹[a ; b]) :
    · ordre 2 : |∫f − L_h(f)| ≤ (b − a)/24·h²·max|f″| [n_exactness_order]   · ordre 1 : |∫f − L_h(f)| ≤ (b − a)/2·h·|f′(ξ)| [n_proof_constant_depends_h]   · ordre 1 : |∫f − L_h(f)| ≤ (N/2)·h·max|f′| [n_proof_sum_count]   ✔ ordre 1 : |∫f − L_h(f)| ≤ (b − a)/2·h·max|f′|
  pièges : n_map_jacobian, n_proof_same_xi, n_exactness_order, n_proof_sum_count, n_proof_constant_depends_h

```

## Lire une estimation d'erreur : quantificateurs, constante, régularité (`n-error-statements`, BA4)

_Qui choisit C, et avant quoi ? Quelle régularité faut-il à f ?_

### Niveau 1

```
L_h(f) est la formule de Simpson composite sur [0 ; 1], de pas h = 1/N (ordre 4). Les deux énoncés ne diffèrent que par l'ordre des quantificateurs (en gras) : (1) ∃C > 0, ∀f ∈ C⁴[0 ; 1], ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h⁴ (2) ∀f ∈ C⁴[0 ; 1], ∃C > 0, ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h⁴
  ✔ Seul (2) est vrai   · Seul (1) est vrai [g9_quant_order]   · Les deux sont vrais : l'ordre des quantificateurs ne change rien [g9_quant_order]   · Aucun des deux
  pièges : g9_quant_order

L_h(f) est la formule de Simpson composite sur [0 ; 1], de pas h = 1/N (ordre 4). Les deux énoncés ne diffèrent que par l'ordre des quantificateurs (en gras) : (1) ∀f ∈ C⁴[0 ; 1], ∃C > 0, ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h⁴ (2) ∃C > 0, ∀f ∈ C⁴[0 ; 1], ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h⁴
  ✔ Seul (1) est vrai   · Seul (2) est vrai [g9_quant_order]   · Les deux sont vrais : l'ordre des quantificateurs ne change rien [g9_quant_order]   · Aucun des deux
  pièges : g9_quant_order

L_h(f) est la formule du trapèze composite sur [0 ; 1], de pas h = 1/N (ordre 2). Les deux énoncés ne diffèrent que par l'ordre des quantificateurs (en gras) : (1) ∀f ∈ C²[0 ; 1], ∃C > 0, ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h² (2) ∃C > 0, ∀f ∈ C²[0 ; 1], ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h²
  ✔ Seul (1) est vrai   · Seul (2) est vrai [g9_quant_order]   · Les deux sont vrais : l'ordre des quantificateurs ne change rien [g9_quant_order]   · Aucun des deux
  pièges : g9_quant_order

```

### Niveau 2

```
Vrai ou faux ?
  « L_h(f) est la formule de Simpson composite sur [0 ; 1], de pas h = 1/N (ordre 4). ∃C > 0, ∀f ∈ C⁵[0 ; 1], ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h⁴ » → FAUX
    contre-exemple (num) : f = λx^4
  aides : Qui choisit en premier ? Si C est choisi avant f, il doit marcher pour toutes les f. | Multiplie f par λ : l'erreur est multipliée par □. | f_λ(x) = λx⁴ : E(f_λ) = λE(x⁴), aucune constante fixe ne suffit.
  pièges : g9_quant_order

Vrai ou faux ?
  « L_h(f) est la formule du trapèze composite sur [0 ; 1], de pas h = 1/N (ordre 2). ∃C > 0, ∀f ∈ C²[0 ; 1], ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h² » → FAUX
    contre-exemple (num) : f = λx^2
  aides : Qui choisit en premier ? Si C est choisi avant f, il doit marcher pour toutes les f. | Multiplie f par λ : l'erreur est multipliée par □. | f_λ(x) = λx² : E(f_λ) = λE(x²), aucune constante fixe ne suffit.
  pièges : g9_quant_order

Vrai ou faux ?
  « L_h(f) est la formule de Simpson composite sur [0 ; 1], de pas h = 1/N (ordre 4). ∃C > 0, ∀f ∈ C⁵[0 ; 1], ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h⁴ » → FAUX
    contre-exemple (num) : f = λx^4
  aides : Qui choisit en premier ? Si C est choisi avant f, il doit marcher pour toutes les f. | Multiplie f par λ : l'erreur est multipliée par □. | f_λ(x) = λx⁴ : E(f_λ) = λE(x⁴), aucune constante fixe ne suffit.
  pièges : g9_quant_order

```

### Niveau 3

```
L_h(f) est la formule du trapèze composite sur [0 ; 1], de pas h = 1/N (ordre 2). Cet énoncé est faux. Pourquoi ? ∀f ∈ C³[0 ; 1], ∃C > 0, ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h³·max|f⁽³⁾|
  · f n'est pas assez régulière : le théorème demande f ∈ C² [n_regularity_ignored]   · C est choisie avant f : elle devrait convenir à toutes les f, ce qui est impossible [g9_quant_order]   ✔ La puissance de h est trop grande : la formule n'est que d'ordre 2   · Il est vrai
  pièges : g9_quant_order, n_regularity_ignored

L_h(f) est la formule du trapèze composite sur [0 ; 1], de pas h = 1/N (ordre 2). Cet énoncé est faux. Pourquoi ? ∃C > 0, ∀f ∈ C³[0 ; 1], ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h²
  · La puissance de h est trop grande : la formule n'est que d'ordre 2 [n_more_regularity_more_order]   ✔ C est choisie avant f : elle devrait convenir à toutes les f, ce qui est impossible   · Il est vrai   · f n'est pas assez régulière : le théorème demande f ∈ C² [n_regularity_ignored]
  pièges : n_regularity_ignored, n_more_regularity_more_order

L_h(f) est la formule du trapèze composite sur [0 ; 1], de pas h = 1/N (ordre 2). Cet énoncé est faux. Pourquoi ? ∀f ∈ C¹[0 ; 1], ∃C > 0, ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h²
  ✔ f n'est pas assez régulière : le théorème demande f ∈ C²   · C est choisie avant f : elle devrait convenir à toutes les f, ce qui est impossible [g9_quant_order]   · La puissance de h est trop grande : la formule n'est que d'ordre 2 [n_more_regularity_more_order]   · Il est vrai
  pièges : g9_quant_order, n_more_regularity_more_order

```

### Niveau 4

```
L_h(f) est la formule de Gauss à 2 points composite sur [0 ; 1], de pas h = 1/N (ordre 4). Avec E_h(f) = ∫₀¹ f − L_h(f), écris le théorème d'erreur (C peut dépendre de f, mais pas de h).
  [jetons] palette : f ∈ C⁴[0 ; 1] · C > 0 · h ∈ ]0 ; 1] · |E_h(f)| ≤ C·h⁴ · |E_h(f)| ≤ C·h⁵ · f ∈ C³[0 ; 1]
    → ∀f ∈ C⁴[0 ; 1] ∃C > 0 ∀h ∈ ]0 ; 1], |E_h(f)| ≤ C·h⁴
  aides : Qui choisit en premier ? La constante dépend de f, donc ∀f vient avant ∃C ; elle ne dépend pas de h, donc ∃C vient avant ∀h. | ∀f ∈ C⁴[0 ; 1] ∃C > 0 … | ∀f ∈ C⁴[0 ; 1] ∃C > 0 ∀h ∈ ]0 ; 1], |E_h(f)| ≤ C·h⁴
  pièges : g9_quant_order, n_more_regularity_more_order

L_h(f) est la formule du trapèze composite sur [0 ; 1], de pas h = 1/N (ordre 2). Avec E_h(f) = ∫₀¹ f − L_h(f), écris le théorème d'erreur (C peut dépendre de f, mais pas de h).
  [jetons] palette : f ∈ C²[0 ; 1] · C > 0 · h ∈ ]0 ; 1] · |E_h(f)| ≤ C·h² · |E_h(f)| ≤ C·h³ · f ∈ C¹[0 ; 1]
    → ∀f ∈ C²[0 ; 1] ∃C > 0 ∀h ∈ ]0 ; 1], |E_h(f)| ≤ C·h²
  aides : Qui choisit en premier ? La constante dépend de f, donc ∀f vient avant ∃C ; elle ne dépend pas de h, donc ∃C vient avant ∀h. | ∀f ∈ C²[0 ; 1] ∃C > 0 … | ∀f ∈ C²[0 ; 1] ∃C > 0 ∀h ∈ ]0 ; 1], |E_h(f)| ≤ C·h²
  pièges : g9_quant_order, n_more_regularity_more_order

L_h(f) est la formule de Simpson composite sur [0 ; 1], de pas h = 1/N (ordre 4). Avec E_h(f) = ∫₀¹ f − L_h(f), écris le théorème d'erreur (C peut dépendre de f, mais pas de h).
  [jetons] palette : f ∈ C⁴[0 ; 1] · C > 0 · h ∈ ]0 ; 1] · |E_h(f)| ≤ C·h⁴ · |E_h(f)| ≤ C·h⁵ · f ∈ C³[0 ; 1]
    → ∀f ∈ C⁴[0 ; 1] ∃C > 0 ∀h ∈ ]0 ; 1], |E_h(f)| ≤ C·h⁴
  aides : Qui choisit en premier ? La constante dépend de f, donc ∀f vient avant ∃C ; elle ne dépend pas de h, donc ∃C vient avant ∀h. | ∀f ∈ C⁴[0 ; 1] ∃C > 0 … | ∀f ∈ C⁴[0 ; 1] ∃C > 0 ∀h ∈ ]0 ; 1], |E_h(f)| ≤ C·h⁴
  pièges : g9_quant_order, n_more_regularity_more_order

```

### Niveau 5

```
Format d'examen : plusieurs énoncés, une ou plusieurs réponses justes.
  [tableau à lire, sans aide]
  question : L_h(f) est la formule du point milieu composite sur [0 ; 1], de pas h = 1/N (ordre 2). Quels énoncés sont vrais ? Une ou plusieurs réponses justes.
      · ∃C > 0, ∀f ∈ C²[0 ; 1], ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h² [g9_quant_order]   ✔ ∀f ∈ C²[0 ; 1], ∃C > 0, ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h²   ✔ ∃C > 0, ∀f ∈ C²[0 ; 1], ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h²·max|f⁽²⁾|   · ∀f ∈ C¹[0 ; 1], ∃C > 0, ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h² [n_regularity_ignored]   · ∀f ∈ C³[0 ; 1], ∃C > 0, ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h³ [n_more_regularity_more_order]
      pièges : n_more_regularity_more_order, g9_quant_order, n_regularity_ignored
  pièges : n_more_regularity_more_order, g9_quant_order, n_regularity_ignored

Erreurs de la formule de Simpson composite sur [0 ; 1], avec n sous-intervalles :
  [tableau à lire, sans aide]
    n | E(√x) | E(eˣ)
    4 | 3.587e-03 | 2.326e-06
    8 | 1.268e-03 | 1.456e-07
    16 | 4.485e-04 | 9.103e-09
    32 | 1.586e-04 | 5.690e-10
    64 | 5.606e-05 | 3.556e-11
  question : Qu'en déduis-tu ? Une ou plusieurs réponses justes.
      · Pour √x, Simpson ne converge pas   ✔ Pour eˣ, Simpson est d'ordre 4 (rapport 16)   · Simpson est d'ordre 4 pour toute f continue [n_regularity_ignored]   ✔ Pour √x, l'ordre n'est que ≈ 1,5, car √x ∉ C⁴[0 ; 1]
      pièges : n_regularity_ignored
  pièges : n_regularity_ignored

Erreurs de la formule de Simpson composite sur [0 ; 1], avec n sous-intervalles :
  [tableau à lire, sans aide]
    n | E(√x) | E(eˣ)
    4 | 3.587e-03 | 2.326e-06
    8 | 1.268e-03 | 1.456e-07
    16 | 4.485e-04 | 9.103e-09
    32 | 1.586e-04 | 5.690e-10
    64 | 5.606e-05 | 3.556e-11
  question : Qu'en déduis-tu ? Une ou plusieurs réponses justes.
      ✔ Pour √x, l'ordre n'est que ≈ 1,5, car √x ∉ C⁴[0 ; 1]   · Simpson est d'ordre 4 pour toute f continue [n_regularity_ignored]   · Pour √x, Simpson ne converge pas   ✔ Pour eˣ, Simpson est d'ordre 4 (rapport 16)
      pièges : n_regularity_ignored
  pièges : n_regularity_ignored

```

### Variantes d'examen

```
L_h(f) est la formule du point milieu composite sur [0 ; 1], de pas h = 1/N (ordre 2). Quels énoncés sont vrais ? Une ou plusieurs réponses justes.
  ✔ ∀f ∈ C²[0 ; 1], ∃C > 0, ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h²·max|f⁽²⁾|   · ∀f ∈ C¹[0 ; 1], ∃C > 0, ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h²·max|f⁽²⁾| [n_regularity_ignored]   · ∃C > 0, ∀f ∈ C²[0 ; 1], ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h² [g9_quant_order]   ✔ ∃C > 0, ∀f ∈ C²[0 ; 1], ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h²·max|f⁽²⁾|   · ∀f ∈ C³[0 ; 1], ∃C > 0, ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h³ [n_more_regularity_more_order]
  [examen mcq]
  pièges : n_more_regularity_more_order, g9_quant_order, n_regularity_ignored

Vrai ou faux ?
  « L_h(f) est la formule du trapèze composite sur [0 ; 1], de pas h = 1/N (ordre 2). ∀f ∈ C³[0 ; 1], ∃C > 0, ∀h ∈ ]0 ; 1] : |∫₀¹ f − L_h(f)| ≤ C·h³ » → FAUX
    contre-exemple (num) : f = x^2
  [examen tf]
  pièges : n_more_regularity_more_order

```

## Extrapolation de Richardson, estimation a posteriori (`n-richardson`, BA4)

_Combiner Q_h et Q₂ₕ pour éliminer le terme en hᵖ et estimer l'erreur._

### Niveau 1

```
On approche ∫ de 0 à 1 de f(x) = −x² − 1 par la formule du point milieu composite (d'ordre p = 2). Avec n = 2, Q₂ₕ = −1,3125 ; avec n = 4, Q_h = −85/64. Extrapole par Richardson, puis estime l'erreur de Q_h.
  [guided]  Q
    = (□·(−85/64) − (−1,3125))/□   (trous : (4·(−85/64) − (−1,3125))/3)   ← (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) avec p = 2
    = □   (trous : −4/3)   ← Q̃
  — Estimation a posteriori de l'erreur de Q_h : ε = |Q̃ − Q_h|.  [juge value]  départ : E
    = |(−4/3) − (−85/64)|   ← |Q̃ − Q_h|
    = 1/192   ← ε
  aides : Combine Q_h et Q₂ₕ pour éliminer le terme en hᵖ : Q̃ = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1). | Q̃ = (4·(−85/64) − □)/3 | Q̃ = (4×(−85/64)−(−1,3125))/3 = −4/3, ε = 1/192.
  pièges : n_richardson_wrong_p, n_richardson_swap

On approche ∫ de 0 à 2 de f(x) = 2x³ + 2x + 2 par la formule du point milieu composite (d'ordre p = 2). Avec n = 1, Q₂ₕ = 12 ; avec n = 2, Q_h = 15. Extrapole par Richardson, puis estime l'erreur de Q_h.
  [guided]  Q
    = (□·15 − 12)/□   (trous : (4·15 − 12)/3)   ← (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) avec p = 2
    = □   (trous : 16)   ← Q̃
  — Estimation a posteriori de l'erreur de Q_h : ε = |Q̃ − Q_h|.  [juge value]  départ : E
    = |16 − 15|   ← |Q̃ − Q_h|
    = 1   ← ε
  aides : Combine Q_h et Q₂ₕ pour éliminer le terme en hᵖ : Q̃ = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1). | Q̃ = (4·15 − □)/3 | Q̃ = (4×15−12)/3 = 16, ε = 1.
  pièges : n_richardson_wrong_p, n_richardson_swap

On approche ∫ de 0 à 2 de f(x) = x³ + 1 par la formule du trapèze composite (d'ordre p = 2). Avec n = 1, Q₂ₕ = 10 ; avec n = 2, Q_h = 7. Extrapole par Richardson, puis estime l'erreur de Q_h.
  [guided]  Q
    = (□·7 − 10)/□   (trous : (4·7 − 10)/3)   ← (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) avec p = 2
    = □   (trous : 6)   ← Q̃
  — Estimation a posteriori de l'erreur de Q_h : ε = |Q̃ − Q_h|.  [juge value]  départ : E
    = |6 − 7|   ← |Q̃ − Q_h|
    = 1   ← ε
  aides : Combine Q_h et Q₂ₕ pour éliminer le terme en hᵖ : Q̃ = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1). | Q̃ = (4·7 − □)/3 | Q̃ = (4×7−10)/3 = 6, ε = 1.
  pièges : n_richardson_wrong_p, n_richardson_swap

```

### Niveau 2

```
On approche ∫ de 0 à 1 de f(x) = x² + 2x + 2 par la formule du point milieu composite (d'ordre p = 2). Calcule Q₂ₕ (n = 1) et Q_h (n = 2), extrapole par Richardson, puis estime l'erreur de Q_h.
  [guided]  Q_(2h)
    = 1·(3,25)   ← n = 1
    = 3,25   ← Q₂ₕ
  — Q_h : la même formule avec n = 2.  [juge value]  départ : Q_h
    = 0,5·(2,5625 + 4,0625)   ← n = 2
    = 3,3125   ← Q_h
  — Extrapolation de Richardson.  [juge value]  départ : Q
    = (□·3,3125 − 3,25)/□   (trous : (4·3,3125 − 3,25)/3)   ← (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) avec p = 2
    = 10/3   ← Q̃
  — Estimation a posteriori de l'erreur de Q_h : ε = |Q̃ − Q_h|.  [juge value]  départ : E
    = |10/3 − 3,3125|   ← |Q̃ − Q_h|
    = 1/48   ← ε
  aides : Combine Q_h et Q₂ₕ pour éliminer le terme en hᵖ : Q̃ = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1). | Q̃ = (4·3,3125 − □)/3 | Q̃ = (4×3,3125−3,25)/3 = 10/3, ε = 1/48.

On approche ∫ de 0 à 1 de f(x) = x³ − x par la formule du point milieu composite (d'ordre p = 2). Calcule Q₂ₕ (n = 1) et Q_h (n = 2), extrapole par Richardson, puis estime l'erreur de Q_h.
  [guided]  Q_(2h)
    = 1·(−0,375)   ← n = 1
    = −0,375   ← Q₂ₕ
  — Q_h : la même formule avec n = 2.  [juge value]  départ : Q_h
    = 0,5·(−15/64 + (−21/64))   ← n = 2
    = −0,28125   ← Q_h
  — Extrapolation de Richardson.  [juge value]  départ : Q
    = (□·(−0,28125) − (−0,375))/□   (trous : (4·(−0,28125) − (−0,375))/3)   ← (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) avec p = 2
    = −0,25   ← Q̃
  — Estimation a posteriori de l'erreur de Q_h : ε = |Q̃ − Q_h|.  [juge value]  départ : E
    = |(−0,25) − (−0,28125)|   ← |Q̃ − Q_h|
    = 0,03125   ← ε
  aides : Combine Q_h et Q₂ₕ pour éliminer le terme en hᵖ : Q̃ = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1). | Q̃ = (4·(−0,28125) − □)/3 | Q̃ = (4×(−0,28125)−(−0,375))/3 = −0,25, ε = 0,03125.

On approche ∫ de 0 à 2 de f(x) = −x³ + 1 par la formule du trapèze composite (d'ordre p = 2). Calcule Q₂ₕ (n = 1) et Q_h (n = 2), extrapole par Richardson, puis estime l'erreur de Q_h.
  [guided]  Q_(2h)
    = 1·(1 + (−7))   ← n = 1
    = −6   ← Q₂ₕ
  — Q_h : la même formule avec n = 2.  [juge value]  départ : Q_h
    = 0,5·(1 + 0) + 0,5·(0 + (−7))   ← n = 2
    = −3   ← Q_h
  — Extrapolation de Richardson.  [juge value]  départ : Q
    = (□·(−□) − (−6))/3   (trous : (4·(−3) − (−6))/3)   ← (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) avec p = 2
    = −2   ← Q̃
  — Estimation a posteriori de l'erreur de Q_h : ε = |Q̃ − Q_h|.  [juge value]  départ : E
    = |(−2) − (−3)|   ← |Q̃ − Q_h|
    = 1   ← ε
  aides : Combine Q_h et Q₂ₕ pour éliminer le terme en hᵖ : Q̃ = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1). | Q̃ = (4·(−3) − □)/3 | Q̃ = (4×(−3)−(−6))/3 = −2, ε = 1.

```

### Niveau 3

```
On approche ∫ de 0 à 2 de f(x) = x³ − 1 par la formule du point milieu composite (d'ordre p = 2). Calcule Q₂ₕ (n = 2) et Q_h (n = 4), extrapole par Richardson, puis estime l'erreur de Q_h.
  [tap, suivre l'erreur]  Q_(2h)
    = 1·(−0,875 + 2,375)   ← n = 2
    = 1,5   ← Q₂ₕ
  — Q_h : la même formule avec n = 4.  [juge value]  départ : Q_h
    = 0,5·(−63/64 + (−37/64) + 61/64 + 279/64)   ← n = 4
    = 1,875   ← Q_h
  — Extrapolation de Richardson.  [juge value]  départ : Q
    ? La formule du point milieu est d'ordre p = ? Quel facteur 2ᵖ utiliser ? ✔ p = 2 : Q̃ = (4Q_h − Q₂ₕ)/3 / · p = 1 : Q̃ = 2Q_h − Q₂ₕ / · p = 4 : Q̃ = (16Q_h − Q₂ₕ)/15 / · p = 2 : Q̃ = (4Q₂ₕ − Q_h)/3
    = (4·1,875 − 1,5)/3   ← (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) avec p = 2
    = 2   ← Q̃
  — Estimation a posteriori de l'erreur de Q_h : ε = |Q̃ − Q_h|.  [juge value]  départ : E
    = |2 − 1,875|   ← |Q̃ − Q_h|
    = 0,125   ← ε
  aides : Combine Q_h et Q₂ₕ pour éliminer le terme en hᵖ : Q̃ = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1). | Q̃ = (4·1,875 − □)/3 | Q̃ = (4×1,875−1,5)/3 = 2, ε = 0,125.
  pièges : n_richardson_wrong_p, n_richardson_swap

On approche ∫ de 0 à 2 de f(x) = 2x² + 2x − 1 par la formule du point milieu composite (d'ordre p = 2). Calcule Q₂ₕ (n = 2) et Q_h (n = 4), extrapole par Richardson, puis estime l'erreur de Q_h.
  [tap, suivre l'erreur]  Q_(2h)
    = 1·(0,5 + 6,5)   ← n = 2
    = 7   ← Q₂ₕ
  — Q_h : la même formule avec n = 4.  [juge value]  départ : Q_h
    = 0,5·(−0,375 + 1,625 + 4,625 + 8,625)   ← n = 4
    = 7,25   ← Q_h
  — Extrapolation de Richardson.  [juge value]  départ : Q
    ? La formule du point milieu est d'ordre p = ? Quel facteur 2ᵖ utiliser ? ✔ p = 2 : Q̃ = (4Q_h − Q₂ₕ)/3 / · p = 1 : Q̃ = 2Q_h − Q₂ₕ / · p = 4 : Q̃ = (16Q_h − Q₂ₕ)/15 / · p = 2 : Q̃ = (4Q₂ₕ − Q_h)/3
    = (4·7,25 − 7)/3   ← (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) avec p = 2
    = 22/3   ← Q̃
  — Estimation a posteriori de l'erreur de Q_h : ε = |Q̃ − Q_h|.  [juge value]  départ : E
    = |22/3 − 7,25|   ← |Q̃ − Q_h|
    = 1/12   ← ε
  aides : Combine Q_h et Q₂ₕ pour éliminer le terme en hᵖ : Q̃ = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1). | Q̃ = (4·7,25 − □)/3 | Q̃ = (4×7,25−7)/3 = 22/3, ε = 1/12.
  pièges : n_richardson_wrong_p, n_richardson_swap

On approche ∫ de 0 à 2 de f(x) = x² + x + 2 par la formule du trapèze composite (d'ordre p = 2). Calcule Q₂ₕ (n = 1) et Q_h (n = 2), extrapole par Richardson, puis estime l'erreur de Q_h.
  [tap, suivre l'erreur]  Q_(2h)
    = 1·(2 + 8)   ← n = 1
    = 10   ← Q₂ₕ
  — Q_h : la même formule avec n = 2.  [juge value]  départ : Q_h
    = 0,5·(2 + 4) + 0,5·(4 + 8)   ← n = 2
    = 9   ← Q_h
  — Extrapolation de Richardson.  [juge value]  départ : Q
    ? La formule du trapèze est d'ordre p = ? Quel facteur 2ᵖ utiliser ? ✔ p = 2 : Q̃ = (4Q_h − Q₂ₕ)/3 / · p = 1 : Q̃ = 2Q_h − Q₂ₕ / · p = 4 : Q̃ = (16Q_h − Q₂ₕ)/15 / · p = 2 : Q̃ = (4Q₂ₕ − Q_h)/3
    = (4·9 − 10)/3   ← (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) avec p = 2
    = 26/3   ← Q̃
  — Estimation a posteriori de l'erreur de Q_h : ε = |Q̃ − Q_h|.  [juge value]  départ : E
    = |26/3 − 9|   ← |Q̃ − Q_h|
    = 1/3   ← ε
  aides : Combine Q_h et Q₂ₕ pour éliminer le terme en hᵖ : Q̃ = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1). | Q̃ = (4·9 − □)/3 | Q̃ = (4×9−10)/3 = 26/3, ε = 1/3.
  pièges : n_richardson_wrong_p, n_richardson_swap

```

### Niveau 4

```
On approche ∫ de 0 à 2 de f(x) = 3x³ + x par la formule du trapèze composite (d'ordre p = 2). Calcule Q₂ₕ (n = 1) et Q_h (n = 2), extrapole par Richardson, puis estime l'erreur de Q_h.
  [free, suivre l'erreur]  Q_(2h)
    = 1·(0 + 26)   ← n = 1
    = 26   ← Q₂ₕ
  — Q_h : la même formule avec n = 2.  [juge value]  départ : Q_h
    = 0,5·(0 + 4) + 0,5·(4 + 26)   ← n = 2
    = 17   ← Q_h
  — Extrapolation de Richardson.  [juge value]  départ : Q
    = (4·17 − 26)/3   ← (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) avec p = 2
    = 14   ← Q̃
  — Estimation a posteriori de l'erreur de Q_h : ε = |Q̃ − Q_h|.  [juge value]  départ : E
    = |14 − 17|   ← |Q̃ − Q_h|
    = 3   ← ε
  aides : Combine Q_h et Q₂ₕ pour éliminer le terme en hᵖ : Q̃ = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1). | Q̃ = (4·17 − □)/3 | Q̃ = (4×17−26)/3 = 14, ε = 3.

On approche ∫ de 0 à 2 de f(x) = 3x³ + x par la formule du trapèze composite (d'ordre p = 2). Calcule Q₂ₕ (n = 1) et Q_h (n = 2), extrapole par Richardson, puis estime l'erreur de Q_h.
  [free, suivre l'erreur]  Q_(2h)
    = 1·(0 + 26)   ← n = 1
    = 26   ← Q₂ₕ
  — Q_h : la même formule avec n = 2.  [juge value]  départ : Q_h
    = 0,5·(0 + 4) + 0,5·(4 + 26)   ← n = 2
    = 17   ← Q_h
  — Extrapolation de Richardson.  [juge value]  départ : Q
    = (4·17 − 26)/3   ← (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) avec p = 2
    = 14   ← Q̃
  — Estimation a posteriori de l'erreur de Q_h : ε = |Q̃ − Q_h|.  [juge value]  départ : E
    = |14 − 17|   ← |Q̃ − Q_h|
    = 3   ← ε
  aides : Combine Q_h et Q₂ₕ pour éliminer le terme en hᵖ : Q̃ = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1). | Q̃ = (4·17 − □)/3 | Q̃ = (4×17−26)/3 = 14, ε = 3.

On approche ∫ de 0 à 2 de f(x) = 3x² + 2x par la formule du point milieu composite (d'ordre p = 2). Calcule Q₂ₕ (n = 1) et Q_h (n = 2), extrapole par Richardson, puis estime l'erreur de Q_h.
  [free, suivre l'erreur]  Q_(2h)
    = 2·(5)   ← n = 1
    = 10   ← Q₂ₕ
  — Q_h : la même formule avec n = 2.  [juge value]  départ : Q_h
    = 1·(1,75 + 9,75)   ← n = 2
    = 11,5   ← Q_h
  — Extrapolation de Richardson.  [juge value]  départ : Q
    = (4·11,5 − 10)/3   ← (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) avec p = 2
    = 12   ← Q̃
  — Estimation a posteriori de l'erreur de Q_h : ε = |Q̃ − Q_h|.  [juge value]  départ : E
    = |12 − 11,5|   ← |Q̃ − Q_h|
    = 0,5   ← ε
  aides : Combine Q_h et Q₂ₕ pour éliminer le terme en hᵖ : Q̃ = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1). | Q̃ = (4·11,5 − □)/3 | Q̃ = (4×11,5−10)/3 = 12, ε = 0,5.

```

### Niveau 5

```
Complète l'extrapolation de Richardson : elle renvoie [Q̃, ε], avec ε = |Q̃ − Q_h| l'estimation de l'erreur de Q_h.
  [code python, 2 trous, sans aide]
    | def richardson(Q, f, a, b, n, p):
    |     q_h = Q(f, a, b, 2 * n)
    |     q_2h = Q(f, a, b, n)
    |     q_ext = ⟦(2 ** p * q_h - q_2h) / (2 ** p - 1)⟧
    |     return [q_ext, ⟦abs(q_ext - q_h)⟧]
    test : def g(x): return x*x ; richardson(midpoint, g, 0, 1, 1, 2) → [0.3333333333333333, 0.020833333333333315]
    test : richardson(trapeze, math.exp, 0, 1, 4, 2) → [1.7182841546998968, 0.0022344374644049925]
  puis : richardson(trapeze, math.exp, 0, 1, n, 2) donne, avec l'intégrale exacte e − 1 :
      [tableau à lire, sans aide]
        n | |Q_h − I| | |Q̃ − I| | ε = |Q̃ − Q_h|
        1 | 3.565e-2 | 5.793e-4 | 3.507e-2
        2 | 8.940e-3 | 3.701e-5 | 8.903e-3
        4 | 2.237e-3 | 2.326e-6 | 2.234e-3
        8 | 5.593e-4 | 1.456e-7 | 5.592e-4
      question : Quand n double, que peut-on dire ? Une ou plusieurs réponses justes.
          ✔ L'erreur de Q̃ est divisée par 16 : Q̃ est d'ordre 4   · ε = |Q̃ − Q_h| est une bonne estimation de l'erreur de Q̃   ✔ L'erreur de Q_h est divisée par 4 : ordre 2   · Q̃ est aussi d'ordre 2
  pièges : n_richardson_swap

Complète l'extrapolation de Richardson : elle renvoie [Q̃, ε], avec ε = |Q̃ − Q_h| l'estimation de l'erreur de Q_h.
  [code python, 2 trous, sans aide]
    | def richardson(Q, f, a, b, n, p):
    |     q_h = Q(f, a, b, 2 * n)
    |     q_2h = Q(f, a, b, n)
    |     q_ext = ⟦(2 ** p * q_h - q_2h) / (2 ** p - 1)⟧
    |     return [q_ext, ⟦abs(q_ext - q_h)⟧]
    test : def g(x): return x*x ; richardson(midpoint, g, 0, 1, 1, 2) → [0.3333333333333333, 0.020833333333333315]
    test : richardson(trapeze, math.exp, 0, 1, 4, 2) → [1.7182841546998968, 0.0022344374644049925]
  puis : richardson(trapeze, math.exp, 0, 1, n, 2) donne, avec l'intégrale exacte e − 1 :
      [tableau à lire, sans aide]
        n | |Q_h − I| | |Q̃ − I| | ε = |Q̃ − Q_h|
        1 | 3.565e-2 | 5.793e-4 | 3.507e-2
        2 | 8.940e-3 | 3.701e-5 | 8.903e-3
        4 | 2.237e-3 | 2.326e-6 | 2.234e-3
        8 | 5.593e-4 | 1.456e-7 | 5.592e-4
      question : Quand n double, que peut-on dire ? Une ou plusieurs réponses justes.
          ✔ L'erreur de Q̃ est divisée par 16 : Q̃ est d'ordre 4   ✔ L'erreur de Q_h est divisée par 4 : ordre 2   · Q̃ est aussi d'ordre 2   · ε = |Q̃ − Q_h| est une bonne estimation de l'erreur de Q̃
  pièges : n_richardson_swap

Complète l'extrapolation de Richardson : elle renvoie [Q̃, ε], avec ε = |Q̃ − Q_h| l'estimation de l'erreur de Q_h.
  [code python, 2 trous, sans aide]
    | def richardson(Q, f, a, b, n, p):
    |     q_h = Q(f, a, b, 2 * n)
    |     q_2h = Q(f, a, b, n)
    |     q_ext = ⟦(2 ** p * q_h - q_2h) / (2 ** p - 1)⟧
    |     return [q_ext, ⟦abs(q_ext - q_h)⟧]
    test : def g(x): return x*x ; richardson(midpoint, g, 0, 1, 1, 2) → [0.3333333333333333, 0.020833333333333315]
    test : richardson(trapeze, math.exp, 0, 1, 4, 2) → [1.7182841546998968, 0.0022344374644049925]
  puis : richardson(trapeze, math.exp, 0, 1, n, 2) donne, avec l'intégrale exacte e − 1 :
      [tableau à lire, sans aide]
        n | |Q_h − I| | |Q̃ − I| | ε = |Q̃ − Q_h|
        1 | 3.565e-2 | 5.793e-4 | 3.507e-2
        2 | 8.940e-3 | 3.701e-5 | 8.903e-3
        4 | 2.237e-3 | 2.326e-6 | 2.234e-3
        8 | 5.593e-4 | 1.456e-7 | 5.592e-4
      question : Quand n double, que peut-on dire ? Une ou plusieurs réponses justes.
          ✔ L'erreur de Q̃ est divisée par 16 : Q̃ est d'ordre 4   · Q̃ est aussi d'ordre 2   ✔ L'erreur de Q_h est divisée par 4 : ordre 2   · ε = |Q̃ − Q_h| est une bonne estimation de l'erreur de Q̃
  pièges : n_richardson_swap

```

### Variantes d'examen

```
Q_h est la formule du point milieu composite avec un pas h (d'ordre 2), Q₂ₕ la même avec le pas 2h. Quelle combinaison est d'un ordre plus élevé (extrapolation de Richardson) ?
  · (16Q_h − Q₂ₕ)/15 [n_richardson_wrong_p]   · 2Q_h − Q₂ₕ [n_richardson_wrong_p]   · (4Q₂ₕ − Q_h)/3 [n_richardson_swap]   ✔ (4Q_h − Q₂ₕ)/3
  [examen mcq]
  pièges : n_richardson_swap, n_richardson_wrong_p

```

## Factorisation LU, pivot, coût, déterminant (`n-lu`, BA4)

_Factoriser A = LU (PA = LU si un pivot s'annule), en déduire det A, et savoir ce que coûte chaque étape._

### Niveau 1

```
Factorise A = [[-2,-1,-3],[6,6,9],[2,-8,6]] en A = LU sans échange de lignes, en notant chaque multiplicateur ℓᵢⱼ, puis calcule det A.
  [guided]  [[-2,-1,-3],[6,6,9],[2,-8,6]]
    = L2 ← L2 + 3L1 : [[-2,-1,-3],[0,3,0],[2,-8,6]]   (cases à remplir : (2,1) (2,2))   ← L₂ ← L₂ + 3L₁ : ℓ₂₁ = −3
    = L3 ← L3 + L1 : [[-2,-1,-3],[0,3,0],[0,-9,3]]   (cases à remplir : (3,1) (3,3))   ← L₃ ← L₃ + L₁ : ℓ₃₁ = −1
    = L3 ← L3 + 3L2 : [[-2,-1,-3],[0,3,0],[0,0,3]]   (cases à remplir : (3,1) (3,2))   ← L₃ ← L₃ + 3L₂ : ℓ₃₂ = −3
  — Écris L et U.  [juge factor]  départ : LU
    = L = [[1,0,0],[-3,1,0],[-1,-3,1]]   (cases à remplir : (2,1) (3,1) (3,2))   ← Sous la diagonale, les multiplicateurs
    = U = [[-2,-1,-3],[0,3,0],[0,0,3]]   (cases à remplir : (1,2))   ← La forme échelonnée
  — det A, à partir des pivots de U.  [juge value]  départ : D
    = ((−2)·3·3)   ← Produit de la diagonale de U
    = □   (trous : −18)
  aides : Les multiplicateurs de Gauss sont les coefficients de L, sous la diagonale : Lᵢ ← Lᵢ − ℓᵢⱼLⱼ. | ℓ₂₁ = a₂₁/a₁₁ = □ | L = [[1,0,0],[-3,1,0],[-1,-3,1]], U = [[-2,-1,-3],[0,3,0],[0,0,3]], det A = (−2)·3·3 = −18.
  pièges : l_lu_sign

Factorise A = [[1,1,-2],[-1,1,4],[3,4,-4]] en A = LU sans échange de lignes, en notant chaque multiplicateur ℓᵢⱼ, puis calcule det A.
  [guided]  [[1,1,-2],[-1,1,4],[3,4,-4]]
    = L2 ← L2 + L1 : [[1,1,-2],[0,2,2],[3,4,-4]]   (cases à remplir : (2,1) (2,3))   ← L₂ ← L₂ + L₁ : ℓ₂₁ = −1
    = L3 ← L3 - 3L1 : [[1,1,-2],[0,2,2],[0,1,2]]   (cases à remplir : (3,1) (3,2))   ← L₃ ← L₃ − 3L₁ : ℓ₃₁ = 3
    = L3 ← L3 - (1/2)L2 : [[1,1,-2],[0,2,2],[0,0,1]]   (cases à remplir : (3,1) (3,3))   ← L₃ ← L₃ − (1/2)L₂ : ℓ₃₂ = 1/2
  — Écris L et U.  [juge factor]  départ : LU
    = L = [[1,0,0],[-1,1,0],[3,1/2,1]]   (cases à remplir : (2,1) (3,1) (3,2))   ← Sous la diagonale, les multiplicateurs
    = U = [[1,1,-2],[0,2,2],[0,0,1]]   (cases à remplir : (1,3) (2,2))   ← La forme échelonnée
  — det A, à partir des pivots de U.  [juge value]  départ : D
    = (1·2·1)   ← Produit de la diagonale de U
    = □   (trous : 2)
  aides : Les multiplicateurs de Gauss sont les coefficients de L, sous la diagonale : Lᵢ ← Lᵢ − ℓᵢⱼLⱼ. | ℓ₂₁ = a₂₁/a₁₁ = □ | L = [[1,0,0],[-1,1,0],[3,1/2,1]], U = [[1,1,-2],[0,2,2],[0,0,1]], det A = 1·2·1 = 2.
  pièges : l_lu_sign

Factorise A = [[3,-2,1],[3,0,5],[3,-1,1]] en A = LU sans échange de lignes, en notant chaque multiplicateur ℓᵢⱼ, puis calcule det A.
  [guided]  [[3,-2,1],[3,0,5],[3,-1,1]]
    = L2 ← L2 - L1 : [[3,-2,1],[0,2,4],[3,-1,1]]   (cases à remplir : (2,1) (2,3))   ← L₂ ← L₂ − L₁ : ℓ₂₁ = 1
    = L3 ← L3 - L1 : [[3,-2,1],[0,2,4],[0,1,0]]   (cases à remplir : (3,2) (3,3))   ← L₃ ← L₃ − L₁ : ℓ₃₁ = 1
    = L3 ← L3 - (1/2)L2 : [[3,-2,1],[0,2,4],[0,0,-2]]   (cases à remplir : (3,1) (3,3))   ← L₃ ← L₃ − (1/2)L₂ : ℓ₃₂ = 1/2
  — Écris L et U.  [juge factor]  départ : LU
    = L = [[1,0,0],[1,1,0],[1,1/2,1]]   (cases à remplir : (2,1) (3,1) (3,2))   ← Sous la diagonale, les multiplicateurs
    = U = [[3,-2,1],[0,2,4],[0,0,-2]]   (cases à remplir : (2,2))   ← La forme échelonnée
  — det A, à partir des pivots de U.  [juge value]  départ : D
    = (3·2·(−2))   ← Produit de la diagonale de U
    = □   (trous : −12)
  aides : Les multiplicateurs de Gauss sont les coefficients de L, sous la diagonale : Lᵢ ← Lᵢ − ℓᵢⱼLⱼ. | ℓ₂₁ = a₂₁/a₁₁ = □ | L = [[1,0,0],[1,1,0],[1,1/2,1]], U = [[3,-2,1],[0,2,4],[0,0,-2]], det A = 3·2·(−2) = −12.
  pièges : l_lu_sign

```

### Niveau 2

```
Factorise A = [[-1,-2,2],[0,2,-4],[2,1,4]] en A = LU sans échange de lignes, en notant chaque multiplicateur ℓᵢⱼ, puis calcule det A.
  [guided]  [[-1,-2,2],[0,2,-4],[2,1,4]]
    = L3 ← L3 + 2L1 : [[-1,-2,2],[0,2,-4],[0,-3,8]]   (cases à remplir : (3,1) (3,2))   ← L₃ ← L₃ + 2L₁ : ℓ₃₁ = −2
    = L3 ← L3 + (3/2)L2 : [[-1,-2,2],[0,2,-4],[0,0,2]]   (cases à remplir : (3,1) (3,3))   ← L₃ ← L₃ + (3/2)L₂ : ℓ₃₂ = −3/2
    ? On a fait L₃ ← L₃ + (3/2)L₂. Que vaut ℓ₃₂ ? · −2/3 / ✔ −3/2 / · 3/2
  — Écris L et U.  [juge factor]  départ : LU
    = L = [[1,0,0],[0,1,0],[-2,-3/2,1]]   (cases à remplir : (2,1) (3,1) (3,2))   ← Sous la diagonale, les multiplicateurs
    = U = [[-1,-2,2],[0,2,-4],[0,0,2]]   (cases à remplir : (1,1) (2,2))   ← La forme échelonnée
  — det A, à partir des pivots de U.  [juge value]  départ : D
    = ((−1)·2·2)   ← Produit de la diagonale de U
    = □   (trous : −4)
  aides : Les multiplicateurs de Gauss sont les coefficients de L, sous la diagonale : Lᵢ ← Lᵢ − ℓᵢⱼLⱼ. | ℓ₃₁ = a₃₁/a₁₁ = □ | L = [[1,0,0],[0,1,0],[-2,-3/2,1]], U = [[-1,-2,2],[0,2,-4],[0,0,2]], det A = (−1)·2·2 = −4.
  pièges : l_lu_sign

Factorise A = [[2,-3,1],[-2,5,1],[0,-1,-2]] en A = LU sans échange de lignes, en notant chaque multiplicateur ℓᵢⱼ, puis calcule det A.
  [guided]  [[2,-3,1],[-2,5,1],[0,-1,-2]]
    = L2 ← L2 + L1 : [[2,-3,1],[0,2,2],[0,-1,-2]]   (cases à remplir : (2,2) (2,3))   ← L₂ ← L₂ + L₁ : ℓ₂₁ = −1
    = L3 ← L3 + (1/2)L2 : [[2,-3,1],[0,2,2],[0,0,-1]]   (cases à remplir : (3,2) (3,3))   ← L₃ ← L₃ + (1/2)L₂ : ℓ₃₂ = −1/2
    ? On a fait L₂ ← L₂ + L₁. Que vaut ℓ₂₁ ? ✔ −1 / · 1
  — Écris L et U.  [juge factor]  départ : LU
    = L = [[1,0,0],[-1,1,0],[0,-1/2,1]]   (cases à remplir : (2,1) (3,1) (3,2))   ← Sous la diagonale, les multiplicateurs
    = U = [[2,-3,1],[0,2,2],[0,0,-1]]   (cases à remplir : (1,2) (2,2))   ← La forme échelonnée
  — det A, à partir des pivots de U.  [juge value]  départ : D
    = (2·2·(−1))   ← Produit de la diagonale de U
    = □   (trous : −4)
  aides : Les multiplicateurs de Gauss sont les coefficients de L, sous la diagonale : Lᵢ ← Lᵢ − ℓᵢⱼLⱼ. | ℓ₂₁ = a₂₁/a₁₁ = □ | L = [[1,0,0],[-1,1,0],[0,-1/2,1]], U = [[2,-3,1],[0,2,2],[0,0,-1]], det A = 2·2·(−1) = −4.
  pièges : l_lu_sign

Factorise A = [[-2,0,2],[-4,2,0],[2,1,-3]] en A = LU sans échange de lignes, en notant chaque multiplicateur ℓᵢⱼ, puis calcule det A.
  [guided]  [[-2,0,2],[-4,2,0],[2,1,-3]]
    = L2 ← L2 - 2L1 : [[-2,0,2],[0,2,-4],[2,1,-3]]   (cases à remplir : (2,1) (2,2))   ← L₂ ← L₂ − 2L₁ : ℓ₂₁ = 2
    = L3 ← L3 + L1 : [[-2,0,2],[0,2,-4],[0,1,-1]]   (cases à remplir : (3,1) (3,2))   ← L₃ ← L₃ + L₁ : ℓ₃₁ = −1
    = L3 ← L3 - (1/2)L2 : [[-2,0,2],[0,2,-4],[0,0,1]]   (cases à remplir : (3,1) (3,2))   ← L₃ ← L₃ − (1/2)L₂ : ℓ₃₂ = 1/2
    ? On a fait L₃ ← L₃ − (1/2)L₂. Que vaut ℓ₃₂ ? · −1/2 / ✔ 1/2 / · 2
  — Écris L et U.  [juge factor]  départ : LU
    = L = [[1,0,0],[2,1,0],[-1,1/2,1]]   (cases à remplir : (2,1) (3,1) (3,2))   ← Sous la diagonale, les multiplicateurs
    = U = [[-2,0,2],[0,2,-4],[0,0,1]]   (cases à remplir : (2,3))   ← La forme échelonnée
  — det A, à partir des pivots de U.  [juge value]  départ : D
    = ((−2)·2·1)   ← Produit de la diagonale de U
    = □   (trous : −4)
  aides : Les multiplicateurs de Gauss sont les coefficients de L, sous la diagonale : Lᵢ ← Lᵢ − ℓᵢⱼLⱼ. | ℓ₂₁ = a₂₁/a₁₁ = □ | L = [[1,0,0],[2,1,0],[-1,1/2,1]], U = [[-2,0,2],[0,2,-4],[0,0,1]], det A = (−2)·2·1 = −4.
  pièges : l_lu_sign

```

### Niveau 3

```
Échelonne A = [[3,-1,3],[-9,3,-7],[3,-2,2]] par Gauss (Lᵢ ← Lᵢ − ℓLⱼ, ou un échange Lᵢ ↔ Lⱼ si un pivot s'annule), puis calcule det A. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu rowops]  [[3,-1,3],[-9,3,-7],[3,-2,2]]
    = L2 ← L2 + 3L1 : [[3,-1,3],[0,0,2],[3,-2,2]]   ← L₂ ← L₂ + 3L₁
    = L3 ← L3 - L1 : [[3,-1,3],[0,0,2],[0,-1,-1]]   ← L₃ ← L₃ − L₁
    ? Le deuxième pivot est nul. Que fais-tu ? ✔ J'échange la ligne 2 avec une ligne en dessous (PA = LU) / · Je continue en divisant par ce pivot / · J'arrête : A est singulière
    = L2 ↔ L3 : [[3,-1,3],[0,-1,-1],[0,0,2]]   ← Le pivot u₂₂ est nul : on échange les lignes 2 et 3
  — det A : le produit des pivots, et le signe de l'échange.  [juge value]  départ : D
    = −(3·(−1)·2)   ← Un échange de lignes : det P = −1
    = 6
  aides : Si un pivot est nul, la matrice n'est pas forcément singulière : on échange avec une ligne du dessous dont le coefficient n'est pas nul. | Après l'échange, det A = −(□) | U = [[3,-1,3],[0,-1,-1],[0,0,2]], det A = −(3·(−1)·2) = 6.
  pièges : n_lu_zero_pivot, n_lu_det_permutation

Échelonne A = [[-2,-3,1],[4,6,0],[-6,-6,3]] par Gauss (Lᵢ ← Lᵢ − ℓLⱼ, ou un échange Lᵢ ↔ Lⱼ si un pivot s'annule), puis calcule det A. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu rowops]  [[-2,-3,1],[4,6,0],[-6,-6,3]]
    = L2 ← L2 + 2L1 : [[-2,-3,1],[0,0,2],[-6,-6,3]]   ← L₂ ← L₂ + 2L₁
    = L3 ← L3 - 3L1 : [[-2,-3,1],[0,0,2],[0,3,0]]   ← L₃ ← L₃ − 3L₁
    ? Le deuxième pivot est nul. Que fais-tu ? ✔ J'échange la ligne 2 avec une ligne en dessous (PA = LU) / · J'arrête : A est singulière / · Je continue en divisant par ce pivot
    = L2 ↔ L3 : [[-2,-3,1],[0,3,0],[0,0,2]]   ← Le pivot u₂₂ est nul : on échange les lignes 2 et 3
  — det A : le produit des pivots, et le signe de l'échange.  [juge value]  départ : D
    = −((−2)·3·2)   ← Un échange de lignes : det P = −1
    = 12
  aides : Si un pivot est nul, la matrice n'est pas forcément singulière : on échange avec une ligne du dessous dont le coefficient n'est pas nul. | Après l'échange, det A = −(□) | U = [[-2,-3,1],[0,3,0],[0,0,2]], det A = −((−2)·3·2) = 12.
  pièges : n_lu_zero_pivot, n_lu_det_permutation

Échelonne A = [[1,-2,-2],[-1,2,0],[2,-1,-5]] par Gauss (Lᵢ ← Lᵢ − ℓLⱼ, ou un échange Lᵢ ↔ Lⱼ si un pivot s'annule), puis calcule det A. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu rowops]  [[1,-2,-2],[-1,2,0],[2,-1,-5]]
    = L2 ← L2 + L1 : [[1,-2,-2],[0,0,-2],[2,-1,-5]]   ← L₂ ← L₂ + L₁
    = L3 ← L3 - 2L1 : [[1,-2,-2],[0,0,-2],[0,3,-1]]   ← L₃ ← L₃ − 2L₁
    ? Le deuxième pivot est nul. Que fais-tu ? · J'arrête : A est singulière / · Je continue en divisant par ce pivot / ✔ J'échange la ligne 2 avec une ligne en dessous (PA = LU)
    = L2 ↔ L3 : [[1,-2,-2],[0,3,-1],[0,0,-2]]   ← Le pivot u₂₂ est nul : on échange les lignes 2 et 3
  — det A : le produit des pivots, et le signe de l'échange.  [juge value]  départ : D
    = −(1·3·(−2))   ← Un échange de lignes : det P = −1
    = 6
  aides : Si un pivot est nul, la matrice n'est pas forcément singulière : on échange avec une ligne du dessous dont le coefficient n'est pas nul. | Après l'échange, det A = −(□) | U = [[1,-2,-2],[0,3,-1],[0,0,-2]], det A = −(1·3·(−2)) = 6.
  pièges : n_lu_zero_pivot, n_lu_det_permutation

```

### Niveau 4

```
Échelonne B = [[-1,-2,1,4],[0,0,2,1],[-2,-1,0,5],[-1,4,-1,2]] par Gauss (Lᵢ ← Lᵢ − ℓLⱼ, ou un échange Lᵢ ↔ Lⱼ si un pivot s'annule), écris PA = LU, puis calcule det B.
  [free, suivre l'erreur]  [[-1,-2,1,4],[0,0,2,1],[-2,-1,0,5],[-1,4,-1,2]]
    = L3 ← L3 - 2L1 : [[-1,-2,1,4],[0,0,2,1],[0,3,-2,-3],[-1,4,-1,2]]   ← L₃ ← L₃ − 2L₁
    = L4 ← L4 - L1 : [[-1,-2,1,4],[0,0,2,1],[0,3,-2,-3],[0,6,-2,-2]]   ← L₄ ← L₄ − L₁
    ? Le deuxième pivot est nul. Que fais-tu ? · J'arrête : A est singulière / ✔ J'échange la ligne 2 avec une ligne en dessous (PA = LU) / · Je continue en divisant par ce pivot
    = L2 ↔ L3 : [[-1,-2,1,4],[0,3,-2,-3],[0,0,2,1],[0,6,-2,-2]]   ← Le pivot u₂₂ est nul : on échange les lignes 2 et 3
    = L4 ← L4 - 2L2 : [[-1,-2,1,4],[0,3,-2,-3],[0,0,2,1],[0,0,2,4]]   ← L₄ ← L₄ − 2L₂
    = L4 ← L4 - L3 : [[-1,-2,1,4],[0,3,-2,-3],[0,0,2,1],[0,0,0,3]]   ← L₄ ← L₄ − L₃
  — Écris P, L et U, avec PA = LU.  [juge factor]  départ : PLU
    = P = [[1,0,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]] ; L = [[1,0,0,0],[2,1,0,0],[0,0,1,0],[1,2,1,1]] ; U = [[-1,-2,1,4],[0,3,-2,-3],[0,0,2,1],[0,0,0,3]]   ← P échange les lignes 2 et 3 ; L garde les multiplicateurs, échangés avec les lignes
  — det A : le produit des pivots, et le signe de l'échange.  [juge value]  départ : D
    = −((−1)·3·2·3)   ← Un échange de lignes : det P = −1
    = 18
  aides : Si un pivot est nul, la matrice n'est pas forcément singulière : on échange avec une ligne du dessous dont le coefficient n'est pas nul. | Après l'échange, det B = −(□) | U = [[-1,-2,1,4],[0,3,-2,-3],[0,0,2,1],[0,0,0,3]], det B = −((−1)·3·2·3) = 18.
  pièges : n_lu_zero_pivot, n_lu_det_permutation

Échelonne B = [[3,-2,0,-2],[9,-6,-1,-8],[0,-2,0,-2],[9,-4,-2,-7]] par Gauss (Lᵢ ← Lᵢ − ℓLⱼ, ou un échange Lᵢ ↔ Lⱼ si un pivot s'annule), écris PA = LU, puis calcule det B.
  [free, suivre l'erreur]  [[3,-2,0,-2],[9,-6,-1,-8],[0,-2,0,-2],[9,-4,-2,-7]]
    = L2 ← L2 - 3L1 : [[3,-2,0,-2],[0,0,-1,-2],[0,-2,0,-2],[9,-4,-2,-7]]   ← L₂ ← L₂ − 3L₁
    = L4 ← L4 - 3L1 : [[3,-2,0,-2],[0,0,-1,-2],[0,-2,0,-2],[0,2,-2,-1]]   ← L₄ ← L₄ − 3L₁
    ? Le deuxième pivot est nul. Que fais-tu ? ✔ J'échange la ligne 2 avec une ligne en dessous (PA = LU) / · Je continue en divisant par ce pivot / · J'arrête : A est singulière
    = L2 ↔ L3 : [[3,-2,0,-2],[0,-2,0,-2],[0,0,-1,-2],[0,2,-2,-1]]   ← Le pivot u₂₂ est nul : on échange les lignes 2 et 3
    = L4 ← L4 + L2 : [[3,-2,0,-2],[0,-2,0,-2],[0,0,-1,-2],[0,0,-2,-3]]   ← L₄ ← L₄ + L₂
    = L4 ← L4 - 2L3 : [[3,-2,0,-2],[0,-2,0,-2],[0,0,-1,-2],[0,0,0,1]]   ← L₄ ← L₄ − 2L₃
  — Écris P, L et U, avec PA = LU.  [juge factor]  départ : PLU
    = P = [[1,0,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]] ; L = [[1,0,0,0],[0,1,0,0],[3,0,1,0],[3,-1,2,1]] ; U = [[3,-2,0,-2],[0,-2,0,-2],[0,0,-1,-2],[0,0,0,1]]   ← P échange les lignes 2 et 3 ; L garde les multiplicateurs, échangés avec les lignes
  — det A : le produit des pivots, et le signe de l'échange.  [juge value]  départ : D
    = −(3·(−2)·(−1)·1)   ← Un échange de lignes : det P = −1
    = −6
  aides : Si un pivot est nul, la matrice n'est pas forcément singulière : on échange avec une ligne du dessous dont le coefficient n'est pas nul. | Après l'échange, det B = −(□) | U = [[3,-2,0,-2],[0,-2,0,-2],[0,0,-1,-2],[0,0,0,1]], det B = −(3·(−2)·(−1)·1) = −6.
  pièges : n_lu_zero_pivot, n_lu_det_permutation

Échelonne B = [[3,0,2,-1],[-6,0,-2,6],[0,3,1,1],[6,0,-2,-12]] par Gauss (Lᵢ ← Lᵢ − ℓLⱼ, ou un échange Lᵢ ↔ Lⱼ si un pivot s'annule), écris PA = LU, puis calcule det B.
  [free, suivre l'erreur]  [[3,0,2,-1],[-6,0,-2,6],[0,3,1,1],[6,0,-2,-12]]
    = L2 ← L2 + 2L1 : [[3,0,2,-1],[0,0,2,4],[0,3,1,1],[6,0,-2,-12]]   ← L₂ ← L₂ + 2L₁
    = L4 ← L4 - 2L1 : [[3,0,2,-1],[0,0,2,4],[0,3,1,1],[0,0,-6,-10]]   ← L₄ ← L₄ − 2L₁
    ? Le deuxième pivot est nul. Que fais-tu ? ✔ J'échange la ligne 2 avec une ligne en dessous (PA = LU) / · J'arrête : A est singulière / · Je continue en divisant par ce pivot
    = L2 ↔ L3 : [[3,0,2,-1],[0,3,1,1],[0,0,2,4],[0,0,-6,-10]]   ← Le pivot u₂₂ est nul : on échange les lignes 2 et 3
    = L4 ← L4 + 3L3 : [[3,0,2,-1],[0,3,1,1],[0,0,2,4],[0,0,0,2]]   ← L₄ ← L₄ + 3L₃
  — Écris P, L et U, avec PA = LU.  [juge factor]  départ : PLU
    = P = [[1,0,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]] ; L = [[1,0,0,0],[0,1,0,0],[-2,0,1,0],[2,0,-3,1]] ; U = [[3,0,2,-1],[0,3,1,1],[0,0,2,4],[0,0,0,2]]   ← P échange les lignes 2 et 3 ; L garde les multiplicateurs, échangés avec les lignes
  — det A : le produit des pivots, et le signe de l'échange.  [juge value]  départ : D
    = −(3·3·2·2)   ← Un échange de lignes : det P = −1
    = −36
  aides : Si un pivot est nul, la matrice n'est pas forcément singulière : on échange avec une ligne du dessous dont le coefficient n'est pas nul. | Après l'échange, det B = −(□) | U = [[3,0,2,-1],[0,3,1,1],[0,0,2,4],[0,0,0,2]], det B = −(3·3·2·2) = −36.
  pièges : n_lu_zero_pivot, n_lu_det_permutation

```

### Niveau 5

```
Complète la factorisation A = LU sans pivot : L[i][k] est le multiplicateur de la ligne i, et la ligne i de U perd L[i][k] fois la ligne k.
  [code python, 2 trous, sans aide]
    | def lu(A):
    |     # sans pivot ; L unite, U triangulaire superieure
    |     n = len(A)
    |     L = eye(n)
    |     U = copy2(A)
    |     for k in range(n - 1):
    |         for i in range(k + 1, n):
    |             L[i][k] = ⟦U[i][k] / U[k][k]⟧
    |             for j in range(k, n):
    |                 U[i][j] = ⟦U[i][j] - L[i][k] * U[k][j]⟧
    |     return [L, U]
    test : A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]] ; lu(A)[0][2][0] → 1.5
    test : A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]] ; lu(A)[0][2][1] → 0.0
    test : A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]] ; lu(A)[1][1][1] → -1.0
    test : A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]] ; lu(A)[1][2][2] → -5.0
    test : A = [[4, 3], [6, 3]] ; lu(A) → [[[1, 0], [1.5, 1]], [[4, 3], [0, -1.5]]]
  puis : Coût des étapes pour une matrice pleine n × n (n = 1000). On doit résoudre Ax = b pour 10 seconds membres b, avec la même A.
      [tableau à lire, sans aide]
        étape | opérations (n = 1000)
        factorisation A = LU | 6.7e+08
        une descente Ly = b | 1.0e+06
        une remontée Ux = y | 1.0e+06
        inverse A⁻¹ (n systèmes) | 2.0e+09
      question : Que faut-il faire ? Une ou plusieurs réponses justes.
          ✔ Le coût total est alors d'environ 2n³/3 + 20n² ≈ 6.9e+08 opérations   ✔ Factoriser A = LU une seule fois, puis faire 10 descentes et 10 remontées   · Refaire la factorisation pour chaque second membre   · Calculer A⁻¹, puis faire 10 produits A⁻¹b : c'est plus rapide [n_cost_inverse]
          pièges : n_cost_inverse
      pièges : n_cost_inverse
  pièges : l_lu_inverse, l_lu_sign

Complète la factorisation A = LU sans pivot : L[i][k] est le multiplicateur de la ligne i, et la ligne i de U perd L[i][k] fois la ligne k.
  [code python, 2 trous, sans aide]
    | def lu(A):
    |     # sans pivot ; L unite, U triangulaire superieure
    |     n = len(A)
    |     L = eye(n)
    |     U = copy2(A)
    |     for k in range(n - 1):
    |         for i in range(k + 1, n):
    |             L[i][k] = ⟦U[i][k] / U[k][k]⟧
    |             for j in range(k, n):
    |                 U[i][j] = ⟦U[i][j] - L[i][k] * U[k][j]⟧
    |     return [L, U]
    test : A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]] ; lu(A)[0][2][0] → 1.5
    test : A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]] ; lu(A)[0][2][1] → 0.0
    test : A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]] ; lu(A)[1][1][1] → -1.0
    test : A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]] ; lu(A)[1][2][2] → -5.0
    test : A = [[4, 3], [6, 3]] ; lu(A) → [[[1, 0], [1.5, 1]], [[4, 3], [0, -1.5]]]
  puis : Coût des étapes pour une matrice pleine n × n (n = 100). On doit résoudre Ax = b pour 10 seconds membres b, avec la même A.
      [tableau à lire, sans aide]
        étape | opérations (n = 100)
        factorisation A = LU | 6.7e+05
        une descente Ly = b | 1.0e+04
        une remontée Ux = y | 1.0e+04
        inverse A⁻¹ (n systèmes) | 2.0e+06
      question : Que faut-il faire ? Une ou plusieurs réponses justes.
          · Refaire la factorisation pour chaque second membre   ✔ Factoriser A = LU une seule fois, puis faire 10 descentes et 10 remontées   ✔ Le coût total est alors d'environ 2n³/3 + 20n² ≈ 8.7e+05 opérations   · Calculer A⁻¹, puis faire 10 produits A⁻¹b : c'est plus rapide [n_cost_inverse]
          pièges : n_cost_inverse
      pièges : n_cost_inverse
  pièges : l_lu_inverse, l_lu_sign

Complète la factorisation A = LU sans pivot : L[i][k] est le multiplicateur de la ligne i, et la ligne i de U perd L[i][k] fois la ligne k.
  [code python, 2 trous, sans aide]
    | def lu(A):
    |     # sans pivot ; L unite, U triangulaire superieure
    |     n = len(A)
    |     L = eye(n)
    |     U = copy2(A)
    |     for k in range(n - 1):
    |         for i in range(k + 1, n):
    |             L[i][k] = ⟦U[i][k] / U[k][k]⟧
    |             for j in range(k, n):
    |                 U[i][j] = ⟦U[i][j] - L[i][k] * U[k][j]⟧
    |     return [L, U]
    test : A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]] ; lu(A)[0][2][0] → 1.5
    test : A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]] ; lu(A)[0][2][1] → 0.0
    test : A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]] ; lu(A)[1][1][1] → -1.0
    test : A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]] ; lu(A)[1][2][2] → -5.0
    test : A = [[4, 3], [6, 3]] ; lu(A) → [[[1, 0], [1.5, 1]], [[4, 3], [0, -1.5]]]
  puis : Coût des étapes pour une matrice pleine n × n (n = 100). On doit résoudre Ax = b pour 10 seconds membres b, avec la même A.
      [tableau à lire, sans aide]
        étape | opérations (n = 100)
        factorisation A = LU | 6.7e+05
        une descente Ly = b | 1.0e+04
        une remontée Ux = y | 1.0e+04
        inverse A⁻¹ (n systèmes) | 2.0e+06
      question : Que faut-il faire ? Une ou plusieurs réponses justes.
          · Refaire la factorisation pour chaque second membre   · Calculer A⁻¹, puis faire 10 produits A⁻¹b : c'est plus rapide [n_cost_inverse]   ✔ Le coût total est alors d'environ 2n³/3 + 20n² ≈ 8.7e+05 opérations   ✔ Factoriser A = LU une seule fois, puis faire 10 descentes et 10 remontées
          pièges : n_cost_inverse
      pièges : n_cost_inverse
  pièges : l_lu_inverse, l_lu_sign

```

### Variantes d'examen

```
On échelonne A = [[1,1,2],[-3,-3,-5],[-1,2,0]] : il faut échanger les lignes 2 et 3, et l'on obtient U = [[1,1,2],[0,3,2],[0,0,1]], avec PA = LU. Que vaut det A ?
  · 3 [n_lu_det_permutation]   · −6   · 0   ✔ −3
  [examen mcq]
  pièges : n_lu_det_permutation

Vrai ou faux ? Résoudre Ax = b pour 10 seconds membres b différents (même A) demande 10 factorisations LU.
  · Vrai [n_cost_inverse]   ✔ Faux
  [examen tf]
  pièges : n_cost_inverse

On factorise A = [[3,2,4],[0,2,4],[-6,-1,1]] en A = LU sans échange (L unitriangulaire inférieure). Que vaut ℓ₃₂ dans L ?
  [free, sans aide, examen coef]  l_32
    = 3/2
  pièges : l_lu_sign

```

## LU tridiagonale (algorithme de Thomas), en O(N) (`n-thomas`, BA4)

_Factoriser une matrice tridiagonale en place, puis descendre et remonter : environ 8N opérations._

### Niveau 1

```
Choisis la ligne de la descente de l'algorithme de Thomas, en place. A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l'inconnue de la ligne i).
  [code python, 1 trou]
    | def thomas(a, c, d, b):
    |     # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    |     # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    |     N = len(a)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - d[i - 1] * c[i - 1]
    |         c[i] = c[i] / a[i]
    |     a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    |     # L y = b
    |     b[0] = b[0] / a[0]
    |     for i in range(N - 1):
    |         b[i + 1] = (b[i + 1] - ⟦·c[i] * b[i] [n_thomas_lu_roles] | ·d[i] * a[i] | ·d[i - 1] * b[i - 1] [n_thomas_index_shift] | ✔d[i] * b[i]⟧) / a[i + 1]
    |     # U x = y
    |     for i in range(N - 2, -1, -1):
    |         b[i] = b[i] - c[i] * b[i + 1]
    |     return b
    test : thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1]) → [1, 1, 1]
    test : thomas([3, 3], [-1], [-1], [2, 2]) → [1, 1]
    test : thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19]) → [1, 2, 3, 4]
  pièges : n_thomas_lu_roles, n_thomas_index_shift

Choisis la ligne de ℓᵢ = aᵢ − dᵢ₋₁γᵢ₋₁ de l'algorithme de Thomas, en place. A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l'inconnue de la ligne i).
  [code python, 1 trou]
    | def thomas(a, c, d, b):
    |     # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    |     # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    |     N = len(a)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - ⟦·b[i - 1] * d[i - 1] | ·b[i - 1] * c[i - 1] | ·d[i] * c[i] [n_thomas_index_shift] | ✔d[i - 1] * c[i - 1]⟧
    |         c[i] = c[i] / a[i]
    |     a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    |     # L y = b
    |     b[0] = b[0] / a[0]
    |     for i in range(N - 1):
    |         b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    |     # U x = y
    |     for i in range(N - 2, -1, -1):
    |         b[i] = b[i] - c[i] * b[i + 1]
    |     return b
    test : thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1]) → [1, 1, 1]
    test : thomas([3, 3], [-1], [-1], [2, 2]) → [1, 1]
    test : thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19]) → [1, 2, 3, 4]
  pièges : n_thomas_index_shift

Choisis la ligne de ℓᵢ = aᵢ − dᵢ₋₁γᵢ₋₁ de l'algorithme de Thomas, en place. A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l'inconnue de la ligne i).
  [code python, 1 trou]
    | def thomas(a, c, d, b):
    |     # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    |     # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    |     N = len(a)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - ⟦·b[i - 1] * c[i - 1] | ✔d[i - 1] * c[i - 1] | ·b[i - 1] * d[i - 1] | ·d[i] * c[i] [n_thomas_index_shift]⟧
    |         c[i] = c[i] / a[i]
    |     a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    |     # L y = b
    |     b[0] = b[0] / a[0]
    |     for i in range(N - 1):
    |         b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    |     # U x = y
    |     for i in range(N - 2, -1, -1):
    |         b[i] = b[i] - c[i] * b[i + 1]
    |     return b
    test : thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1]) → [1, 1, 1]
    test : thomas([3, 3], [-1], [-1], [2, 2]) → [1, 1]
    test : thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19]) → [1, 2, 3, 4]
  pièges : n_thomas_index_shift

```

### Niveau 2

```
Complète la ligne de y₁ = b₁/ℓ₁ de l'algorithme de Thomas, en place. A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l'inconnue de la ligne i).
  [code python, 1 trou]
    | def thomas(a, c, d, b):
    |     # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    |     # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    |     N = len(a)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - d[i - 1] * c[i - 1]
    |         c[i] = c[i] / a[i]
    |     a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    |     # L y = b
    |     b[0] = b[0] / ⟦a[0]⟧
    |     for i in range(N - 1):
    |         b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    |     # U x = y
    |     for i in range(N - 2, -1, -1):
    |         b[i] = b[i] - c[i] * b[i + 1]
    |     return b
    test : thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1]) → [1, 1, 1]
    test : thomas([3, 3], [-1], [-1], [2, 2]) → [1, 1]
    test : thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19]) → [1, 2, 3, 4]

Algorithme de Thomas pour la matrice tridiagonale de diagonale a, sur-diagonale c et sous-diagonale d : a = (3 ; 2 ; 4), c = (2 ; −1), d = (−1 ; −1). On a γ₁ = c₁/a₁ = 2/3. Calcule ℓ₂ = a₂ − d₁γ₁, puis γ₂ = c₂/ℓ₂.
  [guided]  2 − (−1)·(2/3)
    = □   (trous : 8/3)   ← ℓ₂ = a₂ − d₁γ₁
  — Puis γ₂ = c₂/ℓ₂.  [juge value]  départ : −1/(8/3)
    = □   (trous : −3/8)   ← γ₂
  aides : Gauss sur une tridiagonale : la ligne i n'élimine qu'un coefficient, celui de la ligne au-dessus. | ℓ₂ = 2 − (−1)·□ | ℓ₂ = 2 − (−1)·2/3 = 8/3, γ₂ = −1/(8/3) = −3/8.

Complète la ligne de γ₁ = c₁/ℓ₁ de l'algorithme de Thomas, en place. A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l'inconnue de la ligne i).
  [code python, 1 trou]
    | def thomas(a, c, d, b):
    |     # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    |     # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    |     N = len(a)
    |     c[0] = c[0] / ⟦a[0]⟧
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - d[i - 1] * c[i - 1]
    |         c[i] = c[i] / a[i]
    |     a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    |     # L y = b
    |     b[0] = b[0] / a[0]
    |     for i in range(N - 1):
    |         b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    |     # U x = y
    |     for i in range(N - 2, -1, -1):
    |         b[i] = b[i] - c[i] * b[i + 1]
    |     return b
    test : thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1]) → [1, 1, 1]
    test : thomas([3, 3], [-1], [-1], [2, 2]) → [1, 1]
    test : thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19]) → [1, 2, 3, 4]

```

### Niveau 3

```
Complète la descente et la remontée de l'algorithme de Thomas, en place. A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l'inconnue de la ligne i).
  [code python, 2 trous]
    | def thomas(a, c, d, b):
    |     # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    |     # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    |     N = len(a)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - d[i - 1] * c[i - 1]
    |         c[i] = c[i] / a[i]
    |     a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    |     # L y = b
    |     b[0] = b[0] / a[0]
    |     for i in range(N - 1):
    |         b[i + 1] = (b[i + 1] - ⟦d[i] * b[i]⟧) / a[i + 1]
    |     # U x = y
    |     for i in range(N - 2, -1, -1):
    |         b[i] = b[i] - ⟦c[i] * b[i + 1]⟧
    |     return b
    test : thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1]) → [1, 1, 1]
    test : thomas([3, 3], [-1], [-1], [2, 2]) → [1, 1]
    test : thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19]) → [1, 2, 3, 4]
  pièges : n_thomas_lu_roles, n_thomas_index_shift

Complète la factorisation de l'algorithme de Thomas, en place. A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l'inconnue de la ligne i).
  [code python, 3 trous]
    | def thomas(a, c, d, b):
    |     # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    |     # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    |     N = len(a)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - ⟦d[i - 1] * c[i - 1]⟧
    |         c[i] = c[i] / ⟦a[i]⟧
    |     a[N - 1] = a[N - 1] - ⟦d[N - 2] * c[N - 2]⟧
    |     # L y = b
    |     b[0] = b[0] / a[0]
    |     for i in range(N - 1):
    |         b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    |     # U x = y
    |     for i in range(N - 2, -1, -1):
    |         b[i] = b[i] - c[i] * b[i + 1]
    |     return b
    test : thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1]) → [1, 1, 1]
    test : thomas([3, 3], [-1], [-1], [2, 2]) → [1, 1]
    test : thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19]) → [1, 2, 3, 4]
  pièges : n_thomas_index_shift, n_thomas_forget_last

Complète la factorisation de l'algorithme de Thomas, en place. A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l'inconnue de la ligne i).
  [code python, 3 trous]
    | def thomas(a, c, d, b):
    |     # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    |     # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    |     N = len(a)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - ⟦d[i - 1] * c[i - 1]⟧
    |         c[i] = c[i] / ⟦a[i]⟧
    |     a[N - 1] = a[N - 1] - ⟦d[N - 2] * c[N - 2]⟧
    |     # L y = b
    |     b[0] = b[0] / a[0]
    |     for i in range(N - 1):
    |         b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    |     # U x = y
    |     for i in range(N - 2, -1, -1):
    |         b[i] = b[i] - c[i] * b[i + 1]
    |     return b
    test : thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1]) → [1, 1, 1]
    test : thomas([3, 3], [-1], [-1], [2, 2]) → [1, 1]
    test : thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19]) → [1, 2, 3, 4]
  pièges : n_thomas_index_shift, n_thomas_forget_last

```

### Niveau 4

```
Complète tous les trous de l'algorithme de Thomas, en place. A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l'inconnue de la ligne i).
  [code python, 7 trous]
    | def thomas(a, c, d, b):
    |     # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    |     # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    |     N = len(a)
    |     c[0] = c[0] / ⟦a[0]⟧
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - ⟦d[i - 1] * c[i - 1]⟧
    |         c[i] = c[i] / ⟦a[i]⟧
    |     a[N - 1] = a[N - 1] - ⟦d[N - 2] * c[N - 2]⟧
    |     # L y = b
    |     b[0] = b[0] / ⟦a[0]⟧
    |     for i in range(N - 1):
    |         b[i + 1] = (b[i + 1] - ⟦d[i] * b[i]⟧) / a[i + 1]
    |     # U x = y
    |     for i in range(N - 2, -1, -1):
    |         b[i] = b[i] - ⟦c[i] * b[i + 1]⟧
    |     return b
    test : thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1]) → [1, 1, 1]
    test : thomas([3, 3], [-1], [-1], [2, 2]) → [1, 1]
    test : thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19]) → [1, 2, 3, 4]
  pièges : n_thomas_index_shift, n_thomas_forget_last, n_thomas_lu_roles

Complète tous les trous de l'algorithme de Thomas, en place. A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l'inconnue de la ligne i).
  [code python, 7 trous]
    | def thomas(a, c, d, b):
    |     # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    |     # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    |     N = len(a)
    |     c[0] = c[0] / ⟦a[0]⟧
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - ⟦d[i - 1] * c[i - 1]⟧
    |         c[i] = c[i] / ⟦a[i]⟧
    |     a[N - 1] = a[N - 1] - ⟦d[N - 2] * c[N - 2]⟧
    |     # L y = b
    |     b[0] = b[0] / ⟦a[0]⟧
    |     for i in range(N - 1):
    |         b[i + 1] = (b[i + 1] - ⟦d[i] * b[i]⟧) / a[i + 1]
    |     # U x = y
    |     for i in range(N - 2, -1, -1):
    |         b[i] = b[i] - ⟦c[i] * b[i + 1]⟧
    |     return b
    test : thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1]) → [1, 1, 1]
    test : thomas([3, 3], [-1], [-1], [2, 2]) → [1, 1]
    test : thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19]) → [1, 2, 3, 4]
  pièges : n_thomas_index_shift, n_thomas_forget_last, n_thomas_lu_roles

Complète tous les trous de l'algorithme de Thomas, en place. A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l'inconnue de la ligne i).
  [code python, 7 trous]
    | def thomas(a, c, d, b):
    |     # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    |     # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    |     N = len(a)
    |     c[0] = c[0] / ⟦a[0]⟧
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - ⟦d[i - 1] * c[i - 1]⟧
    |         c[i] = c[i] / ⟦a[i]⟧
    |     a[N - 1] = a[N - 1] - ⟦d[N - 2] * c[N - 2]⟧
    |     # L y = b
    |     b[0] = b[0] / ⟦a[0]⟧
    |     for i in range(N - 1):
    |         b[i + 1] = (b[i + 1] - ⟦d[i] * b[i]⟧) / a[i + 1]
    |     # U x = y
    |     for i in range(N - 2, -1, -1):
    |         b[i] = b[i] - ⟦c[i] * b[i + 1]⟧
    |     return b
    test : thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1]) → [1, 1, 1]
    test : thomas([3, 3], [-1], [-1], [2, 2]) → [1, 1]
    test : thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19]) → [1, 2, 3, 4]
  pièges : n_thomas_index_shift, n_thomas_forget_last, n_thomas_lu_roles

```

### Niveau 5

```
Complète tous les trous de l'algorithme de Thomas, en place. A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l'inconnue de la ligne i).
  [code python, 7 trous, sans aide]
    | def thomas(a, c, d, b):
    |     # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    |     # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    |     N = len(a)
    |     c[0] = c[0] / ⟦a[0]⟧
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - ⟦d[i - 1] * c[i - 1]⟧
    |         c[i] = c[i] / ⟦a[i]⟧
    |     a[N - 1] = a[N - 1] - ⟦d[N - 2] * c[N - 2]⟧
    |     # L y = b
    |     b[0] = b[0] / ⟦a[0]⟧
    |     for i in range(N - 1):
    |         b[i + 1] = (b[i + 1] - ⟦d[i] * b[i]⟧) / a[i + 1]
    |     # U x = y
    |     for i in range(N - 2, -1, -1):
    |         b[i] = b[i] - ⟦c[i] * b[i + 1]⟧
    |     return b
    test : thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1]) → [1, 1, 1]
    test : thomas([3, 3], [-1], [-1], [2, 2]) → [1, 1]
    test : thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19]) → [1, 2, 3, 4]
  puis : Nombre d'opérations pour résoudre un système tridiagonal N × N :
      [tableau à lire, sans aide]
        N | Thomas (≈ 8N) | LU pleine (≈ 2N³/3)
        10 | 8.0e+01 | 6.7e+02
        100 | 8.0e+02 | 6.7e+05
        1000 | 8.0e+03 | 6.7e+08
        10000 | 8.0e+04 | 6.7e+11
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          · Quand N est multiplié par 10, le coût de Thomas est multiplié par 1000   ✔ Quand N est multiplié par 10, le coût de Thomas est multiplié par 10 : O(N)   · Thomas coûte O(N³), comme la LU pleine   ✔ Pour N = 1000, la LU pleine coûte environ 80 000 fois plus que Thomas
  pièges : n_thomas_index_shift, n_thomas_forget_last, n_thomas_lu_roles

Complète tous les trous de l'algorithme de Thomas, en place. A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l'inconnue de la ligne i).
  [code python, 7 trous, sans aide]
    | def thomas(a, c, d, b):
    |     # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    |     # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    |     N = len(a)
    |     c[0] = c[0] / ⟦a[0]⟧
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - ⟦d[i - 1] * c[i - 1]⟧
    |         c[i] = c[i] / ⟦a[i]⟧
    |     a[N - 1] = a[N - 1] - ⟦d[N - 2] * c[N - 2]⟧
    |     # L y = b
    |     b[0] = b[0] / ⟦a[0]⟧
    |     for i in range(N - 1):
    |         b[i + 1] = (b[i + 1] - ⟦d[i] * b[i]⟧) / a[i + 1]
    |     # U x = y
    |     for i in range(N - 2, -1, -1):
    |         b[i] = b[i] - ⟦c[i] * b[i + 1]⟧
    |     return b
    test : thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1]) → [1, 1, 1]
    test : thomas([3, 3], [-1], [-1], [2, 2]) → [1, 1]
    test : thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19]) → [1, 2, 3, 4]
  puis : Nombre d'opérations pour résoudre un système tridiagonal N × N :
      [tableau à lire, sans aide]
        N | Thomas (≈ 8N) | LU pleine (≈ 2N³/3)
        10 | 8.0e+01 | 6.7e+02
        100 | 8.0e+02 | 6.7e+05
        1000 | 8.0e+03 | 6.7e+08
        10000 | 8.0e+04 | 6.7e+11
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          ✔ Quand N est multiplié par 10, le coût de Thomas est multiplié par 10 : O(N)   · Quand N est multiplié par 10, le coût de Thomas est multiplié par 1000   · Thomas coûte O(N³), comme la LU pleine   ✔ Pour N = 1000, la LU pleine coûte environ 80 000 fois plus que Thomas
  pièges : n_thomas_index_shift, n_thomas_forget_last, n_thomas_lu_roles

Complète tous les trous de l'algorithme de Thomas, en place. A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l'inconnue de la ligne i).
  [code python, 7 trous, sans aide]
    | def thomas(a, c, d, b):
    |     # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    |     # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    |     N = len(a)
    |     c[0] = c[0] / ⟦a[0]⟧
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - ⟦d[i - 1] * c[i - 1]⟧
    |         c[i] = c[i] / ⟦a[i]⟧
    |     a[N - 1] = a[N - 1] - ⟦d[N - 2] * c[N - 2]⟧
    |     # L y = b
    |     b[0] = b[0] / ⟦a[0]⟧
    |     for i in range(N - 1):
    |         b[i + 1] = (b[i + 1] - ⟦d[i] * b[i]⟧) / a[i + 1]
    |     # U x = y
    |     for i in range(N - 2, -1, -1):
    |         b[i] = b[i] - ⟦c[i] * b[i + 1]⟧
    |     return b
    test : thomas([2, 2, 2], [-1, -1], [-1, -1], [1, 0, 1]) → [1, 1, 1]
    test : thomas([3, 3], [-1], [-1], [2, 2]) → [1, 1]
    test : thomas([4, 4, 4, 4], [1, 2, 1], [2, 1, 1], [6, 16, 18, 19]) → [1, 2, 3, 4]
  puis : Nombre d'opérations pour résoudre un système tridiagonal N × N :
      [tableau à lire, sans aide]
        N | Thomas (≈ 8N) | LU pleine (≈ 2N³/3)
        10 | 8.0e+01 | 6.7e+02
        100 | 8.0e+02 | 6.7e+05
        1000 | 8.0e+03 | 6.7e+08
        10000 | 8.0e+04 | 6.7e+11
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          ✔ Pour N = 1000, la LU pleine coûte environ 80 000 fois plus que Thomas   ✔ Quand N est multiplié par 10, le coût de Thomas est multiplié par 10 : O(N)   · Thomas coûte O(N³), comme la LU pleine   · Quand N est multiplié par 10, le coût de Thomas est multiplié par 1000
  pièges : n_thomas_index_shift, n_thomas_forget_last, n_thomas_lu_roles

```

### Variantes d'examen

```
La fonction Python ci-dessous résout Ax = b par la LU tridiagonale (algorithme de Thomas), en place. A est tridiagonale : diagonale a, sous-diagonale d (dᵢ en ligne i + 1, colonne i), sur-diagonale c (cᵢ en ligne i, colonne i + 1) ; les indices partent de 0 (b[i] est l'inconnue de la ligne i).def thomas(a, c, d, b):
    # a : diagonale (N), c : sur-diagonale (N-1), d : sous-diagonale (N-1), b : second membre
    # en place : a devient la diagonale de L, c la sur-diagonale de U, b la solution
    N = len(a)
    c[0] = c[0] / a[0]
    for i in range(1, N - 1):
        a[i] = a[i] - d[i - 1] * c[i - 1]
        c[i] = c[i] / a[i]
    a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    # L y = b
    b[0] = b[0] / a[0]
    for i in range(N - 1):
        b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    # U x = y
    for i in range(N - 2, -1, -1):
        b[i] = b[i] - ???
    return b
Que faut-il écrire à la place de ??? ?
  · a[i] * b[i + 1]   · d[i] * b[i + 1] [n_thomas_lu_roles]   · c[i] * d[i]   ✔ c[i] * b[i + 1]
  [examen mcq]
  pièges : n_thomas_lu_roles

Vrai ou faux ? Dans l'algorithme de Thomas en place, après la remontée, le tableau b contient la solution x.
  ✔ Vrai   · Faux
  [examen tf]

```

## Jacobi et Gauss-Seidel (`n-iter-jacobi-gs`, BA4)

_Mettre à jour une composante à la fois, avec les anciennes valeurs (Jacobi) ou les plus récentes (Gauss-Seidel)._

### Niveau 1

```
Méthode de Gauss-Seidel pour Ax = b, A = [[2,-1,0],[-1,4,1],[0,0,2]], b = (−5 ; 5 ; −2), à partir de x⁽⁰⁾ = 0. Calcule x⁽¹⁾ (fractions exactes) ; l'app calcule le résidu.
  [tableau gs]  colonnes : x₁ | x₂ | x₃ | ‖b − Ax‖∞
    k = 0    0  0  0  (5)
    k = 1    −5/2  (5/8)  (−1)  (1)

Méthode de Gauss-Seidel pour Ax = b, A = [[8,-1,-1],[0,4,-1],[1,1,5]], b = (−4 ; 6 ; 12), à partir de x⁽⁰⁾ = 0. Calcule x⁽¹⁾ (fractions exactes) ; l'app calcule le résidu.
  [tableau gs]  colonnes : x₁ | x₂ | x₃ | ‖b − Ax‖∞
    k = 0    0  0  0  (12)
    k = 1    −1/2  (3/2)  (11/5)  (3,7)

Méthode de Jacobi pour Ax = b, A = [[2,1,1],[1,5,-1],[-1,1,4]], b = (0 ; 6 ; 12), à partir de x⁽⁰⁾ = 0. Calcule x⁽¹⁾ (fractions exactes) ; l'app calcule le résidu.
  [tableau jacobi]  colonnes : x₁ | x₂ | x₃ | ‖b − Ax‖∞
    k = 0    0  0  0  (12)
    k = 1    0  (6/5)  (3)  (4,2)
  pièges : n_jacobi_uses_new

```

### Niveau 2

```
Méthode de Gauss-Seidel pour Ax = b, A = [[5,0,0],[1,8,0],[0,1,2]], b = (0 ; 8 ; 1), à partir de x⁽⁰⁾ = 0. Calcule x⁽¹⁾ (fractions exactes) ; l'app calcule le résidu.
  [tableau gs]  colonnes : x₁ | x₂ | x₃ | ‖b − Ax‖∞
    k = 0    0  0  0  (8)
    k = 1    (0)  (1)  (0)  (0)

Méthode de Gauss-Seidel pour Ax = b, A = [[4,-1,-1],[-1,8,-1],[-1,1,5]], b = (8 ; 16 ; −10), à partir de x⁽⁰⁾ = 0. Calcule x⁽¹⁾ (fractions exactes) ; l'app calcule le résidu.
  [tableau gs]  colonnes : x₁ | x₂ | x₃ | ‖b − Ax‖∞
    k = 0    0  0  0  (16)
    k = 1    (2)  (9/4)  (−41/20)  (2,05)

Méthode de Gauss-Seidel pour Ax = b, A = [[2,0,0],[0,4,1],[1,-1,5]], b = (−2 ; 6 ; 8), à partir de x⁽⁰⁾ = 0. Calcule x⁽¹⁾ (fractions exactes) ; l'app calcule le résidu.
  [tableau gs]  colonnes : x₁ | x₂ | x₃ | ‖b − Ax‖∞
    k = 0    0  0  0  (8)
    k = 1    (−1)  (3/2)  (21/10)  (2,1)

```

### Niveau 3

```
Méthode de Gauss-Seidel pour A = [[2,1,0],[1,2,1],[0,1,8]], b = (7 ; 7 ; −5). On a x⁽¹⁾ = (7/2 ; 7/4 ; −27/32). Calcule x⁽²⁾ composante par composante : choisis d'abord quelles valeurs utiliser.
  [tap, suivre l'erreur, menu menu]  x_1
    = (7 − (7/4))/2   ← Ligne 1, isolée
    = 21/8
  — x₂⁽²⁾ :  [juge value]  départ : x_2
    = (7 − (21/8) − (−27/32))/2   ← Ligne 2, isolée
    = 167/64
  — x₃⁽²⁾ :  [juge value]  départ : x_3
    = (−5 − (167/64))/8   ← Ligne 3, isolée
    = −487/512
  aides : Ligne i : isole xᵢ ; Jacobi prend les autres composantes dans x⁽¹⁾, Gauss-Seidel prend les plus récentes. | x₂⁽²⁾ = (7 − (1)·□ − (1)·□)/2 | x⁽²⁾ = (21/8 ; 167/64 ; −487/512).
  pièges : n_jacobi_uses_new

Méthode de Jacobi pour A = [[4,1,0],[-1,4,-1],[0,0,5]], b = (−1 ; 10 ; 15). On a x⁽¹⁾ = (−1/4 ; 5/2 ; 3). Calcule x⁽²⁾ composante par composante : choisis d'abord quelles valeurs utiliser.
  [tap, suivre l'erreur, menu menu]  x_1
    = (−1 − (5/2))/4   ← Ligne 1, isolée
    = −7/8
  — x₂⁽²⁾ :  [juge value]  départ : x_2
    = (10 + (−1/4) + 3)/4   ← Ligne 2, isolée
    = 51/16
  — x₃⁽²⁾ :  [juge value]  départ : x_3
    = (15)/5   ← Ligne 3, isolée
    = 3
  aides : Ligne i : isole xᵢ ; Jacobi prend les autres composantes dans x⁽¹⁾, Gauss-Seidel prend les plus récentes. | x₂⁽²⁾ = (10 − (−1)·□ − (−1)·□)/4 | x⁽²⁾ = (−7/8 ; 51/16 ; 3).
  pièges : n_jacobi_uses_new

Méthode de Gauss-Seidel pour A = [[2,-1,0],[-1,2,0],[0,-1,5]], b = (2 ; −4 ; 17). On a x⁽¹⁾ = (1 ; −3/2 ; 31/10). Calcule x⁽²⁾ composante par composante : choisis d'abord quelles valeurs utiliser.
  [tap, suivre l'erreur, menu menu]  x_1
    = (2 + (−3/2))/2   ← Ligne 1, isolée
    = 1/4
  — x₂⁽²⁾ :  [juge value]  départ : x_2
    = (−4 + (1/4))/2   ← Ligne 2, isolée
    = −15/8
  — x₃⁽²⁾ :  [juge value]  départ : x_3
    = (17 + (−15/8))/5   ← Ligne 3, isolée
    = 121/40
  aides : Ligne i : isole xᵢ ; Jacobi prend les autres composantes dans x⁽¹⁾, Gauss-Seidel prend les plus récentes. | x₂⁽²⁾ = (−4 − (−1)·□ − (0)·□)/2 | x⁽²⁾ = (1/4 ; −15/8 ; 121/40).
  pièges : n_jacobi_uses_new

```

### Niveau 4

```
Méthode de Jacobi pour Ax = b, A = [[4,1,1],[-1,4,0],[0,0,4]], b = (−2 ; 5 ; 4), à partir de x⁽⁰⁾ = 0. Calcule x⁽¹⁾ et x⁽²⁾ (fractions exactes) ; l'app calcule le résidu.
  [tableau jacobi]  colonnes : x₁ | x₂ | x₃ | ‖b − Ax‖∞
    k = 0    0  0  0  (5)
    k = 1    (−1/2)  (5/4)  (1)  (2,25)
    k = 2    (−17/16)  (9/8)  (1)  (0,5625)
  puis : Méthode de Gauss-Seidel pour Ax = b, A = [[4,1,1],[-1,4,0],[0,0,4]], b = (−2 ; 5 ; 4), à partir de x⁽⁰⁾ = 0. Calcule x⁽¹⁾ et x⁽²⁾ (fractions exactes) ; l'app calcule le résidu.
      [tableau gs]  colonnes : x₁ | x₂ | x₃ | ‖b − Ax‖∞
        k = 0    0  0  0  (5)
        k = 1    (−1/2)  (9/8)  (1)  (2,125)
        k = 2    (−33/32)  (127/128)  (1)  (0,1328125)
      puis : A = [[4,1,1],[-1,4,0],[0,0,4]]. Que dit le critère de la diagonale strictement dominante (par lignes) ?
          · On ne peut rien dire sans calculer la solution   ✔ A est à diagonale strictement dominante : Jacobi et Gauss-Seidel convergent pour tout x⁽⁰⁾   · Seule la méthode de Gauss-Seidel converge   · Il faut aussi que A soit symétrique
  pièges : n_jacobi_uses_new

Méthode de Jacobi pour Ax = b, A = [[2,-1,0],[-1,5,-1],[0,1,5]], b = (6 ; −13 ; 3), à partir de x⁽⁰⁾ = 0. Calcule x⁽¹⁾ et x⁽²⁾ (fractions exactes) ; l'app calcule le résidu.
  [tableau jacobi]  colonnes : x₁ | x₂ | x₃ | ‖b − Ax‖∞
    k = 0    0  0  0  (13)
    k = 1    (3)  (−13/5)  (3/5)  (3,6)
    k = 2    (17/10)  (−47/25)  (28/25)  (0,78)
  puis : Méthode de Gauss-Seidel pour Ax = b, A = [[2,-1,0],[-1,5,-1],[0,1,5]], b = (6 ; −13 ; 3), à partir de x⁽⁰⁾ = 0. Calcule x⁽¹⁾ et x⁽²⁾ (fractions exactes) ; l'app calcule le résidu.
      [tableau gs]  colonnes : x₁ | x₂ | x₃ | ‖b − Ax‖∞
        k = 0    0  0  0  (13)
        k = 1    (3)  (−2)  (1)  (2)
        k = 2    (2)  (−2)  (1)  (0)
      puis : A = [[2,-1,0],[-1,5,-1],[0,1,5]]. Que dit le critère de la diagonale strictement dominante (par lignes) ?
          · Seule la méthode de Gauss-Seidel converge   ✔ A est à diagonale strictement dominante : Jacobi et Gauss-Seidel convergent pour tout x⁽⁰⁾   · Il faut aussi que A soit symétrique   · On ne peut rien dire sans calculer la solution
  pièges : n_jacobi_uses_new

Méthode de Jacobi pour Ax = b, A = [[2,-1,0],[1,8,-1],[0,0,5]], b = (−4 ; −1 ; −5), à partir de x⁽⁰⁾ = 0. Calcule x⁽¹⁾ et x⁽²⁾ (fractions exactes) ; l'app calcule le résidu.
  [tableau jacobi]  colonnes : x₁ | x₂ | x₃ | ‖b − Ax‖∞
    k = 0    0  0  0  (5)
    k = 1    (−2)  (−1/8)  (−1)  (1)
    k = 2    (−33/16)  (0)  (−1)  (0,125)
  puis : Méthode de Gauss-Seidel pour Ax = b, A = [[2,-1,0],[1,8,-1],[0,0,5]], b = (−4 ; −1 ; −5), à partir de x⁽⁰⁾ = 0. Calcule x⁽¹⁾ et x⁽²⁾ (fractions exactes) ; l'app calcule le résidu.
      [tableau gs]  colonnes : x₁ | x₂ | x₃ | ‖b − Ax‖∞
        k = 0    0  0  0  (5)
        k = 1    (−2)  (1/8)  (−1)  (1)
        k = 2    (−31/16)  (−1/128)  (−1)  (0,1328125)
      puis : A = [[2,-1,0],[1,8,-1],[0,0,5]]. Que dit le critère de la diagonale strictement dominante (par lignes) ?
          · Seule la méthode de Gauss-Seidel converge   ✔ A est à diagonale strictement dominante : Jacobi et Gauss-Seidel convergent pour tout x⁽⁰⁾   · Il faut aussi que A soit symétrique   · On ne peut rien dire sans calculer la solution
  pièges : n_jacobi_uses_new

```

### Niveau 5

```
Complète une itération de Jacobi (dans un nouveau vecteur y) et une itération de Gauss-Seidel (en place dans x).
  [code python, 3 trous, sans aide]
    | def jacobi_step(A, b, x):
    |     n = len(A)
    |     y = zeros(n)
    |     for i in range(n):
    |         s = b[i]
    |         for j in range(n):
    |             if j != i:
    |                 s = ⟦s - A[i][j] * x[j]⟧
    |         y[i] = ⟦s / A[i][i]⟧
    |     return y
    | 
    | def gs_step(A, b, x):
    |     n = len(A)
    |     for i in range(n):
    |         s = b[i]
    |         for j in range(n):
    |             if j != i:
    |                 s = s - A[i][j] * x[j]
    |         x[i] = ⟦s / A[i][i]⟧   # en place : les x[j], j < i, sont deja nouveaux
    |     return x
    test : A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]] ; b = [3, 2, 3] ; jacobi_step(A, b, [0.0, 0.0, 0.0]) → [0.75, 0.5, 0.75]
    test : A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]] ; b = [3, 2, 3] ; jacobi_step(A, b, [0.75, 0.5, 0.75]) → [0.875, 0.875, 0.875]
    test : A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]] ; b = [3, 2, 3] ; gs_step(A, b, [0.0, 0.0, 0.0]) → [0.75, 0.6875, 0.921875]
  puis : Les deux programmes, appelés pour A = tridiag(−1, 4, −1) de taille 3, b = (3 ; 2 ; 3) (solution (1 ; 1 ; 1)) et x⁽⁰⁾ = 0, donnent les erreurs :
      [tableau à lire, sans aide]
        k | Jacobi ‖x⁽ᵏ⁾ − x‖∞ | Gauss-Seidel ‖x⁽ᵏ⁾ − x‖∞
        0 | 1.000e+00 | 1.000e+00
        1 | 5.000e-01 | 3.125e-01
        2 | 1.250e-01 | 7.813e-02
        3 | 6.250e-02 | 9.766e-03
        4 | 1.563e-02 | 1.221e-03
        5 | 7.813e-03 | 1.526e-04
        6 | 1.953e-03 | 1.907e-05
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          · Jacobi converge plus vite, parce qu'il n'utilise que les anciennes valeurs   ✔ Les deux méthodes convergent, avec une erreur divisée par un facteur à peu près constant à chaque pas   · Les deux méthodes trouvent la solution exacte en 3 itérations (n = 3)   ✔ Gauss-Seidel converge plus vite : son erreur décroît environ deux fois plus vite en échelle logarithmique

Complète une itération de Jacobi (dans un nouveau vecteur y) et une itération de Gauss-Seidel (en place dans x).
  [code python, 3 trous, sans aide]
    | def jacobi_step(A, b, x):
    |     n = len(A)
    |     y = zeros(n)
    |     for i in range(n):
    |         s = b[i]
    |         for j in range(n):
    |             if j != i:
    |                 s = ⟦s - A[i][j] * x[j]⟧
    |         y[i] = ⟦s / A[i][i]⟧
    |     return y
    | 
    | def gs_step(A, b, x):
    |     n = len(A)
    |     for i in range(n):
    |         s = b[i]
    |         for j in range(n):
    |             if j != i:
    |                 s = s - A[i][j] * x[j]
    |         x[i] = ⟦s / A[i][i]⟧   # en place : les x[j], j < i, sont deja nouveaux
    |     return x
    test : A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]] ; b = [3, 2, 3] ; jacobi_step(A, b, [0.0, 0.0, 0.0]) → [0.75, 0.5, 0.75]
    test : A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]] ; b = [3, 2, 3] ; jacobi_step(A, b, [0.75, 0.5, 0.75]) → [0.875, 0.875, 0.875]
    test : A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]] ; b = [3, 2, 3] ; gs_step(A, b, [0.0, 0.0, 0.0]) → [0.75, 0.6875, 0.921875]
  puis : Les deux programmes, appelés pour A = tridiag(−1, 4, −1) de taille 3, b = (3 ; 2 ; 3) (solution (1 ; 1 ; 1)) et x⁽⁰⁾ = 0, donnent les erreurs :
      [tableau à lire, sans aide]
        k | Jacobi ‖x⁽ᵏ⁾ − x‖∞ | Gauss-Seidel ‖x⁽ᵏ⁾ − x‖∞
        0 | 1.000e+00 | 1.000e+00
        1 | 5.000e-01 | 3.125e-01
        2 | 1.250e-01 | 7.813e-02
        3 | 6.250e-02 | 9.766e-03
        4 | 1.563e-02 | 1.221e-03
        5 | 7.813e-03 | 1.526e-04
        6 | 1.953e-03 | 1.907e-05
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          · Jacobi converge plus vite, parce qu'il n'utilise que les anciennes valeurs   · Les deux méthodes trouvent la solution exacte en 3 itérations (n = 3)   ✔ Gauss-Seidel converge plus vite : son erreur décroît environ deux fois plus vite en échelle logarithmique   ✔ Les deux méthodes convergent, avec une erreur divisée par un facteur à peu près constant à chaque pas

Complète une itération de Jacobi (dans un nouveau vecteur y) et une itération de Gauss-Seidel (en place dans x).
  [code python, 3 trous, sans aide]
    | def jacobi_step(A, b, x):
    |     n = len(A)
    |     y = zeros(n)
    |     for i in range(n):
    |         s = b[i]
    |         for j in range(n):
    |             if j != i:
    |                 s = ⟦s - A[i][j] * x[j]⟧
    |         y[i] = ⟦s / A[i][i]⟧
    |     return y
    | 
    | def gs_step(A, b, x):
    |     n = len(A)
    |     for i in range(n):
    |         s = b[i]
    |         for j in range(n):
    |             if j != i:
    |                 s = s - A[i][j] * x[j]
    |         x[i] = ⟦s / A[i][i]⟧   # en place : les x[j], j < i, sont deja nouveaux
    |     return x
    test : A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]] ; b = [3, 2, 3] ; jacobi_step(A, b, [0.0, 0.0, 0.0]) → [0.75, 0.5, 0.75]
    test : A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]] ; b = [3, 2, 3] ; jacobi_step(A, b, [0.75, 0.5, 0.75]) → [0.875, 0.875, 0.875]
    test : A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]] ; b = [3, 2, 3] ; gs_step(A, b, [0.0, 0.0, 0.0]) → [0.75, 0.6875, 0.921875]
  puis : Les deux programmes, appelés pour A = tridiag(−1, 4, −1) de taille 3, b = (3 ; 2 ; 3) (solution (1 ; 1 ; 1)) et x⁽⁰⁾ = 0, donnent les erreurs :
      [tableau à lire, sans aide]
        k | Jacobi ‖x⁽ᵏ⁾ − x‖∞ | Gauss-Seidel ‖x⁽ᵏ⁾ − x‖∞
        0 | 1.000e+00 | 1.000e+00
        1 | 5.000e-01 | 3.125e-01
        2 | 1.250e-01 | 7.813e-02
        3 | 6.250e-02 | 9.766e-03
        4 | 1.563e-02 | 1.221e-03
        5 | 7.813e-03 | 1.526e-04
        6 | 1.953e-03 | 1.907e-05
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          · Les deux méthodes trouvent la solution exacte en 3 itérations (n = 3)   · Jacobi converge plus vite, parce qu'il n'utilise que les anciennes valeurs   ✔ Gauss-Seidel converge plus vite : son erreur décroît environ deux fois plus vite en échelle logarithmique   ✔ Les deux méthodes convergent, avec une erreur divisée par un facteur à peu près constant à chaque pas

```

### Variantes d'examen

```
Vrai ou faux ? Si A est à diagonale strictement dominante par lignes, la méthode de Jacobi converge pour tout x⁽⁰⁾.
  ✔ Vrai   · Faux [n_diag_dominance]
  [examen tf]
  pièges : n_diag_dominance

```

## Convergence des méthodes itératives, critère d'arrêt (`n-iter-convergence`, BA4)

_La méthode converge pour tout départ si et seulement si ρ(B) < 1 ; un petit résidu ne suffit que si κ(A) est petit._

### Niveau 1

```
A = [[7,-6],[-6,7]]. Écris la matrice d'itération de Jacobi B_J = I − D⁻¹A, puis son rayon spectral ρ(B_J).
  [guided]  B_J
    = [[0,6/7],[6/7,0]]   (cases à remplir : (1,2))   ← B_J = I − D⁻¹A, D = diag(7, 7)
  — Les valeurs propres de B_J vérifient λ² = b₁₂b₂₁ (det(B_J − λI) = λ² − b₁₂b₂₁).  [juge value]  départ : ρ
    = □   (trous : 6/7)   ← ρ = 6/7 < 1 : Jacobi converge pour tout x⁽⁰⁾
  aides : B_J = I − D⁻¹A : diagonale nulle, et −aᵢⱼ/aᵢᵢ hors de la diagonale. | B_J = [[0, □], [□, 0]], avec D = diag(7, 7) | B_J = [[0,6/7],[6/7,0]], ρ = 6/7.
  pièges : a2_jacobian_transposed

A = [[4,3],[3,9]]. Écris la matrice d'itération de Jacobi B_J = I − D⁻¹A, puis son rayon spectral ρ(B_J).
  [guided]  B_J
    = [[0,-3/4],[-1/3,0]]   (cases à remplir : (1,2))   ← B_J = I − D⁻¹A, D = diag(4, 9)
  — Les valeurs propres de B_J vérifient λ² = b₁₂b₂₁ (det(B_J − λI) = λ² − b₁₂b₂₁).  [juge value]  départ : ρ
    = □   (trous : 1/2)   ← ρ = 1/2 < 1 : Jacobi converge pour tout x⁽⁰⁾
  aides : B_J = I − D⁻¹A : diagonale nulle, et −aᵢⱼ/aᵢᵢ hors de la diagonale. | B_J = [[0, □], [□, 0]], avec D = diag(4, 9) | B_J = [[0,-3/4],[-1/3,0]], ρ = 1/2.
  pièges : a2_jacobian_transposed

A = [[2,2],[2,8]]. Écris la matrice d'itération de Jacobi B_J = I − D⁻¹A, puis son rayon spectral ρ(B_J).
  [guided]  B_J
    = [[0,-1],[-1/4,0]]   (cases à remplir : (1,2))   ← B_J = I − D⁻¹A, D = diag(2, 8)
  — Les valeurs propres de B_J vérifient λ² = b₁₂b₂₁ (det(B_J − λI) = λ² − b₁₂b₂₁).  [juge value]  départ : ρ
    = □   (trous : 1/2)   ← ρ = 1/2 < 1 : Jacobi converge pour tout x⁽⁰⁾
  aides : B_J = I − D⁻¹A : diagonale nulle, et −aᵢⱼ/aᵢᵢ hors de la diagonale. | B_J = [[0, □], [□, 0]], avec D = diag(2, 8) | B_J = [[0,-1],[-1/4,0]], ρ = 1/2.
  pièges : a2_jacobian_transposed

```

### Niveau 2

```
A = [[2,1],[1,8]]. Écris la matrice d'itération de Jacobi B_J = I − D⁻¹A, puis son rayon spectral ρ(B_J).
  [guided]  B_J
    = [[0,-1/2],[-1/8,0]]   (cases à remplir : (1,2) (2,1))   ← B_J = I − D⁻¹A, D = diag(2, 8)
  — Les valeurs propres de B_J vérifient λ² = b₁₂b₂₁ (det(B_J − λI) = λ² − b₁₂b₂₁).  [juge value]  départ : ρ
    = √(1/16)   ← λ² = −1/2·−1/8 = 1/16
    = □   (trous : 1/4)   ← ρ = 1/4 < 1 : Jacobi converge pour tout x⁽⁰⁾
  aides : B_J = I − D⁻¹A : diagonale nulle, et −aᵢⱼ/aᵢᵢ hors de la diagonale. | B_J = [[0, □], [□, 0]], avec D = diag(2, 8) | B_J = [[0,-1/2],[-1/8,0]], ρ = 1/4.
  pièges : a2_jacobian_transposed

A = [[4,1],[1,9]]. Écris la matrice d'itération de Jacobi B_J = I − D⁻¹A, puis son rayon spectral ρ(B_J).
  [guided]  B_J
    = [[0,-1/4],[-1/9,0]]   (cases à remplir : (1,2) (2,1))   ← B_J = I − D⁻¹A, D = diag(4, 9)
  — Les valeurs propres de B_J vérifient λ² = b₁₂b₂₁ (det(B_J − λI) = λ² − b₁₂b₂₁).  [juge value]  départ : ρ
    = √(1/36)   ← λ² = −1/4·−1/9 = 1/36
    = □   (trous : 1/6)   ← ρ = 1/6 < 1 : Jacobi converge pour tout x⁽⁰⁾
  aides : B_J = I − D⁻¹A : diagonale nulle, et −aᵢⱼ/aᵢᵢ hors de la diagonale. | B_J = [[0, □], [□, 0]], avec D = diag(4, 9) | B_J = [[0,-1/4],[-1/9,0]], ρ = 1/6.
  pièges : a2_jacobian_transposed

A = [[1,-1],[-1,9]]. Écris la matrice d'itération de Jacobi B_J = I − D⁻¹A, puis son rayon spectral ρ(B_J).
  [guided]  B_J
    = [[0,1],[1/9,0]]   (cases à remplir : (1,2) (2,1))   ← B_J = I − D⁻¹A, D = diag(1, 9)
  — Les valeurs propres de B_J vérifient λ² = b₁₂b₂₁ (det(B_J − λI) = λ² − b₁₂b₂₁).  [juge value]  départ : ρ
    = √(1/9)   ← λ² = 1·1/9 = 1/9
    = □   (trous : 1/3)   ← ρ = 1/3 < 1 : Jacobi converge pour tout x⁽⁰⁾
  aides : B_J = I − D⁻¹A : diagonale nulle, et −aᵢⱼ/aᵢᵢ hors de la diagonale. | B_J = [[0, □], [□, 0]], avec D = diag(1, 9) | B_J = [[0,1],[1/9,0]], ρ = 1/3.
  pièges : a2_jacobian_transposed

```

### Niveau 3

```
A = [[6,5],[5,6]], B_J = I − D⁻¹A = [[0,-5/6],[-5/6,0]]. Donne ρ(B_J), ρ(B_GS) et κ₂(A). Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  ρ_J
    ? Quel critère dit si Jacobi converge pour tout x⁽⁰⁾ ? · det A ≠ 0 / ✔ ‖B_J‖ < 1 pour une norme / ✔ ρ(B_J) < 1 (nécessaire et suffisant)
    = 5/6   ← λ² = 25/36, ρ = 5/6 < 1
  — Gauss-Seidel, pour une matrice 2 × 2 : ρ(B_GS) = ρ(B_J)².  [juge value]  départ : ρ_GS
    = 25/36   ← Deux fois moins d'itérations
  — Arrêt sur le résidu : ‖e‖/‖x‖ ≤ κ₂(A)·‖r‖/‖b‖. A est SDP : κ₂ = λ_max/λ_min.  [juge value]  départ : κ
    = 11   ← Valeurs propres de A : 11 et 1
  aides : ρ(B) est le plus grand module des valeurs propres de B ; pour A SDP, κ₂ = λ_max/λ_min. | λ² = −5/6·−5/6 = □ | ρ_J = 5/6, ρ_GS = 25/36, κ₂ = 11.

A = [[6,-3],[-3,6]], B_J = I − D⁻¹A = [[0,1/2],[1/2,0]]. Donne ρ(B_J), ρ(B_GS) et κ₂(A). Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  ρ_J
    ? Quel critère dit si Jacobi converge pour tout x⁽⁰⁾ ? ✔ ‖B_J‖ < 1 pour une norme / · det A ≠ 0 / ✔ ρ(B_J) < 1 (nécessaire et suffisant)
    = 1/2   ← λ² = 1/4, ρ = 1/2 < 1
  — Gauss-Seidel, pour une matrice 2 × 2 : ρ(B_GS) = ρ(B_J)².  [juge value]  départ : ρ_GS
    = 1/4   ← Deux fois moins d'itérations
  — Arrêt sur le résidu : ‖e‖/‖x‖ ≤ κ₂(A)·‖r‖/‖b‖. A est SDP : κ₂ = λ_max/λ_min.  [juge value]  départ : κ
    = 3   ← Valeurs propres de A : 9 et 3
  aides : ρ(B) est le plus grand module des valeurs propres de B ; pour A SDP, κ₂ = λ_max/λ_min. | λ² = 1/2·1/2 = □ | ρ_J = 1/2, ρ_GS = 1/4, κ₂ = 3.

A = [[6,-5],[-5,6]], B_J = I − D⁻¹A = [[0,5/6],[5/6,0]]. Donne ρ(B_J), ρ(B_GS) et κ₂(A). Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  ρ_J
    ? Quel critère dit si Jacobi converge pour tout x⁽⁰⁾ ? ✔ ρ(B_J) < 1 (nécessaire et suffisant) / · det A ≠ 0 / ✔ ‖B_J‖ < 1 pour une norme
    = 5/6   ← λ² = 25/36, ρ = 5/6 < 1
  — Gauss-Seidel, pour une matrice 2 × 2 : ρ(B_GS) = ρ(B_J)².  [juge value]  départ : ρ_GS
    = 25/36   ← Deux fois moins d'itérations
  — Arrêt sur le résidu : ‖e‖/‖x‖ ≤ κ₂(A)·‖r‖/‖b‖. A est SDP : κ₂ = λ_max/λ_min.  [juge value]  départ : κ
    = 11   ← Valeurs propres de A : 11 et 1
  aides : ρ(B) est le plus grand module des valeurs propres de B ; pour A SDP, κ₂ = λ_max/λ_min. | λ² = 5/6·5/6 = □ | ρ_J = 5/6, ρ_GS = 25/36, κ₂ = 11.

```

### Niveau 4

```
A = [[4,1],[1,1]]. Calcule ρ(B_J) pour Jacobi, puis ρ(B_GS), puis le nombre d'itérations nécessaires.
  [free, suivre l'erreur]  ρ_J
    = 1/2   ← λ² = 1/4
  — Gauss-Seidel : ρ(B_GS) = ρ(B_J)² pour cette matrice 2 × 2.  [juge value]  départ : ρ_GS
    = 1/4
  — Nombre d'itérations de Jacobi pour diviser l'erreur par 10⁶ : ρᵏ ≤ 10⁻⁶ ⇔ k ≥ −6/log₁₀ ρ, avec log₁₀ 1/2 ≈ −0,301.  [juge value]  départ : k
    = 20   ← −6/(−0,301) ≈ 19,93
  aides : B_J = [[0, −b/a], [−b/d, 0]] : ses valeurs propres sont ±√(b²/(ad)). | ρ_J = √(1/□) | ρ_J = 1/2, ρ_GS = 1/4, k = 20.

A = [[9,2],[2,1]]. Calcule ρ(B_J) pour Jacobi, puis ρ(B_GS), puis le nombre d'itérations nécessaires.
  [free, suivre l'erreur]  ρ_J
    = 2/3   ← λ² = 4/9
  — Gauss-Seidel : ρ(B_GS) = ρ(B_J)² pour cette matrice 2 × 2.  [juge value]  départ : ρ_GS
    = 4/9
  — Nombre d'itérations de Jacobi pour diviser l'erreur par 10⁶ : ρᵏ ≤ 10⁻⁶ ⇔ k ≥ −6/log₁₀ ρ, avec log₁₀ 2/3 ≈ −0,1761.  [juge value]  départ : k
    = 35   ← −6/(−0,1761) ≈ 34,07
  aides : B_J = [[0, −b/a], [−b/d, 0]] : ses valeurs propres sont ±√(b²/(ad)). | ρ_J = √(4/□) | ρ_J = 2/3, ρ_GS = 4/9, k = 35.

A = [[4,-3],[-3,9]]. Calcule ρ(B_J) pour Jacobi, puis ρ(B_GS), puis le nombre d'itérations nécessaires.
  [free, suivre l'erreur]  ρ_J
    = 1/2   ← λ² = 1/4
  — Gauss-Seidel : ρ(B_GS) = ρ(B_J)² pour cette matrice 2 × 2.  [juge value]  départ : ρ_GS
    = 1/4
  — Nombre d'itérations de Jacobi pour diviser l'erreur par 10⁶ : ρᵏ ≤ 10⁻⁶ ⇔ k ≥ −6/log₁₀ ρ, avec log₁₀ 1/2 ≈ −0,301.  [juge value]  départ : k
    = 20   ← −6/(−0,301) ≈ 19,93
  aides : B_J = [[0, −b/a], [−b/d, 0]] : ses valeurs propres sont ±√(b²/(ad)). | ρ_J = √(9/□) | ρ_J = 1/2, ρ_GS = 1/4, k = 20.

```

### Niveau 5

```
Complète la boucle de Jacobi : elle s'arrête quand le résidu relatif ‖r‖/‖b‖ passe sous tol (ou après nmax itérations). jacobi_step(A, b, x) est donnée.
  [code python, 2 trous, sans aide]
    | def jacobi_solve(A, b, x0, tol, nmax):
    |     x = x0
    |     r = zeros(len(b))
    |     Ax = matvec(A, x)
    |     for i in range(len(b)):
    |         r[i] = b[i] - Ax[i]
    |     k = 0
    |     while ⟦norm(r) > tol * norm(b)⟧ and k < nmax:
    |         x = jacobi_step(A, b, x)
    |         Ax = matvec(A, x)
    |         for i in range(len(b)):
    |             r[i] = ⟦b[i] - Ax[i]⟧
    |         k = k + 1
    |     return [x, k]
    test : A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]] ; jacobi_solve(A, [3, 2, 3], [0.0, 0.0, 0.0], 1e-6, 1000)[1] → 14
    test : A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]] ; jacobi_solve(A, [3, 2, 3], [0.0, 0.0, 0.0], 1e-6, 1000)[0] → [1, 1, 1]
    test : A = [[2, 1], [1, 3]] ; jacobi_solve(A, [3, 4], [0.0, 0.0], 1e-12, 1000)[0] → [1, 1]
  puis : Nombre d'itérations pour atteindre ‖r‖/‖b‖ ≤ 10⁻¹⁰ (x⁽⁰⁾ = 0, b = A·(1, …, 1)), pour des matrices tridiagonales n × n :
      [tableau à lire, sans aide]
        n | Jacobi, tridiag(−1, 2,5, −1) | GS, idem | Jacobi, tridiag(−1, 2, −1) | GS, idem
        4 | 53 | 27 | 106 | 54
        8 | 80 | 41 | 347 | 175
        16 | 95 | 50 | 1200 | 602
        32 | 100 | 55 | 4323 | 2163
      question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
          · Le nombre d'itérations ne dépend pas de n, puisque les deux matrices sont SDP   ✔ Pour tridiag(−1, 2,5, −1), ρ_J tend vers 0,8 et le nombre d'itérations se stabilise   · Un résidu ‖r‖/‖b‖ ≤ 10⁻¹⁰ garantit une erreur relative ≤ 10⁻¹⁰ [n_residual_is_error]   ✔ Gauss-Seidel demande environ deux fois moins d'itérations que Jacobi   ✔ Pour tridiag(−1, 2, −1), le nombre d'itérations croît comme n², car ρ_J = cos(π/(n + 1)) → 1
          pièges : n_residual_is_error
      pièges : n_residual_is_error

Complète la boucle de Jacobi : elle s'arrête quand le résidu relatif ‖r‖/‖b‖ passe sous tol (ou après nmax itérations). jacobi_step(A, b, x) est donnée.
  [code python, 2 trous, sans aide]
    | def jacobi_solve(A, b, x0, tol, nmax):
    |     x = x0
    |     r = zeros(len(b))
    |     Ax = matvec(A, x)
    |     for i in range(len(b)):
    |         r[i] = b[i] - Ax[i]
    |     k = 0
    |     while ⟦norm(r) > tol * norm(b)⟧ and k < nmax:
    |         x = jacobi_step(A, b, x)
    |         Ax = matvec(A, x)
    |         for i in range(len(b)):
    |             r[i] = ⟦b[i] - Ax[i]⟧
    |         k = k + 1
    |     return [x, k]
    test : A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]] ; jacobi_solve(A, [3, 2, 3], [0.0, 0.0, 0.0], 1e-6, 1000)[1] → 14
    test : A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]] ; jacobi_solve(A, [3, 2, 3], [0.0, 0.0, 0.0], 1e-6, 1000)[0] → [1, 1, 1]
    test : A = [[2, 1], [1, 3]] ; jacobi_solve(A, [3, 4], [0.0, 0.0], 1e-12, 1000)[0] → [1, 1]
  puis : Nombre d'itérations pour atteindre ‖r‖/‖b‖ ≤ 10⁻¹⁰ (x⁽⁰⁾ = 0, b = A·(1, …, 1)), pour des matrices tridiagonales n × n :
      [tableau à lire, sans aide]
        n | Jacobi, tridiag(−1, 2,5, −1) | GS, idem | Jacobi, tridiag(−1, 2, −1) | GS, idem
        4 | 53 | 27 | 106 | 54
        8 | 80 | 41 | 347 | 175
        16 | 95 | 50 | 1200 | 602
        32 | 100 | 55 | 4323 | 2163
      question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
          · Un résidu ‖r‖/‖b‖ ≤ 10⁻¹⁰ garantit une erreur relative ≤ 10⁻¹⁰ [n_residual_is_error]   ✔ Gauss-Seidel demande environ deux fois moins d'itérations que Jacobi   · Le nombre d'itérations ne dépend pas de n, puisque les deux matrices sont SDP   ✔ Pour tridiag(−1, 2, −1), le nombre d'itérations croît comme n², car ρ_J = cos(π/(n + 1)) → 1   ✔ Pour tridiag(−1, 2,5, −1), ρ_J tend vers 0,8 et le nombre d'itérations se stabilise
          pièges : n_residual_is_error
      pièges : n_residual_is_error

Complète la boucle de Jacobi : elle s'arrête quand le résidu relatif ‖r‖/‖b‖ passe sous tol (ou après nmax itérations). jacobi_step(A, b, x) est donnée.
  [code python, 2 trous, sans aide]
    | def jacobi_solve(A, b, x0, tol, nmax):
    |     x = x0
    |     r = zeros(len(b))
    |     Ax = matvec(A, x)
    |     for i in range(len(b)):
    |         r[i] = b[i] - Ax[i]
    |     k = 0
    |     while ⟦norm(r) > tol * norm(b)⟧ and k < nmax:
    |         x = jacobi_step(A, b, x)
    |         Ax = matvec(A, x)
    |         for i in range(len(b)):
    |             r[i] = ⟦b[i] - Ax[i]⟧
    |         k = k + 1
    |     return [x, k]
    test : A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]] ; jacobi_solve(A, [3, 2, 3], [0.0, 0.0, 0.0], 1e-6, 1000)[1] → 14
    test : A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]] ; jacobi_solve(A, [3, 2, 3], [0.0, 0.0, 0.0], 1e-6, 1000)[0] → [1, 1, 1]
    test : A = [[2, 1], [1, 3]] ; jacobi_solve(A, [3, 4], [0.0, 0.0], 1e-12, 1000)[0] → [1, 1]
  puis : Nombre d'itérations pour atteindre ‖r‖/‖b‖ ≤ 10⁻¹⁰ (x⁽⁰⁾ = 0, b = A·(1, …, 1)), pour des matrices tridiagonales n × n :
      [tableau à lire, sans aide]
        n | Jacobi, tridiag(−1, 2,5, −1) | GS, idem | Jacobi, tridiag(−1, 2, −1) | GS, idem
        4 | 53 | 27 | 106 | 54
        8 | 80 | 41 | 347 | 175
        16 | 95 | 50 | 1200 | 602
        32 | 100 | 55 | 4323 | 2163
      question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
          ✔ Gauss-Seidel demande environ deux fois moins d'itérations que Jacobi   ✔ Pour tridiag(−1, 2, −1), le nombre d'itérations croît comme n², car ρ_J = cos(π/(n + 1)) → 1   ✔ Pour tridiag(−1, 2,5, −1), ρ_J tend vers 0,8 et le nombre d'itérations se stabilise   · Un résidu ‖r‖/‖b‖ ≤ 10⁻¹⁰ garantit une erreur relative ≤ 10⁻¹⁰ [n_residual_is_error]   · Le nombre d'itérations ne dépend pas de n, puisque les deux matrices sont SDP
          pièges : n_residual_is_error
      pièges : n_residual_is_error

```

### Variantes d'examen

```
Vrai ou faux ? Si le résidu relatif ‖b − Ax⁽ᵏ⁾‖/‖b‖ est petit, l'erreur relative ‖x − x⁽ᵏ⁾‖/‖x‖ est petite.
  · Vrai [n_residual_is_error]   ✔ Faux
  [examen tf]
  pièges : n_residual_is_error

```

## Méthode du gradient, à pas fixe ou optimal, pour A SDP (`n-gradient-spd`, BA4)

_Descendre dans la direction du résidu r = b − Ax, avec le pas optimal (r·r)/(r·Ar) ou un pas fixe 0 < α < 2/λ_max._

### Niveau 1

```
Méthode du gradient à pas optimal pour Ax = b, A = [[3,1],[1,3]], b = (0 ; 1), x⁽⁰⁾ = 0 : r⁽ᵏ⁾ = b − Ax⁽ᵏ⁾, αₖ = (r⁽ᵏ⁾·r⁽ᵏ⁾)/(r⁽ᵏ⁾·Ar⁽ᵏ⁾), x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + αₖr⁽ᵏ⁾. On a Ar⁽⁰⁾ = (1 ; 3). Fais une itération (fractions exactes).
  [tableau gradient]  colonnes : x₁⁽ᵏ⁾ | x₂⁽ᵏ⁾ | r₁⁽ᵏ⁾ | r₂⁽ᵏ⁾ | αₖ
    k = 0    0  0  0  1  (1/3)
    k = 1    (0)  (1/3)  ·  ·  ·
  pièges : n_gradient_sign, n_optimal_step_inverted

Méthode du gradient à pas optimal pour Ax = b, A = [[2,-1],[-1,2]], b = (−1 ; 2), x⁽⁰⁾ = 0 : r⁽ᵏ⁾ = b − Ax⁽ᵏ⁾, αₖ = (r⁽ᵏ⁾·r⁽ᵏ⁾)/(r⁽ᵏ⁾·Ar⁽ᵏ⁾), x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + αₖr⁽ᵏ⁾. On a Ar⁽⁰⁾ = (−4 ; 5). Fais une itération (fractions exactes).
  [tableau gradient]  colonnes : x₁⁽ᵏ⁾ | x₂⁽ᵏ⁾ | r₁⁽ᵏ⁾ | r₂⁽ᵏ⁾ | αₖ
    k = 0    0  0  −1  2  (5/14)
    k = 1    (−5/14)  (5/7)  ·  ·  ·
  pièges : n_gradient_sign, n_optimal_step_inverted

Méthode du gradient à pas optimal pour Ax = b, A = [[5,2],[2,2]], b = (1 ; 1), x⁽⁰⁾ = 0 : r⁽ᵏ⁾ = b − Ax⁽ᵏ⁾, αₖ = (r⁽ᵏ⁾·r⁽ᵏ⁾)/(r⁽ᵏ⁾·Ar⁽ᵏ⁾), x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + αₖr⁽ᵏ⁾. On a Ar⁽⁰⁾ = (7 ; 4). Fais une itération (fractions exactes).
  [tableau gradient]  colonnes : x₁⁽ᵏ⁾ | x₂⁽ᵏ⁾ | r₁⁽ᵏ⁾ | r₂⁽ᵏ⁾ | αₖ
    k = 0    0  0  1  1  (2/11)
    k = 1    (2/11)  (2/11)  ·  ·  ·
  pièges : n_gradient_sign, n_optimal_step_inverted

```

### Niveau 2

```
Méthode du gradient à pas optimal pour Ax = b, A = [[5,2],[2,2]], b = (−1 ; −3), x⁽⁰⁾ = 0 : r⁽ᵏ⁾ = b − Ax⁽ᵏ⁾, αₖ = (r⁽ᵏ⁾·r⁽ᵏ⁾)/(r⁽ᵏ⁾·Ar⁽ᵏ⁾), x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + αₖr⁽ᵏ⁾. Fais une itération (fractions exactes).
  [tableau gradient]  colonnes : x₁⁽ᵏ⁾ | x₂⁽ᵏ⁾ | r₁⁽ᵏ⁾ | r₂⁽ᵏ⁾ | αₖ
    k = 0    0  0  (−1)  (−3)  (2/7)
    k = 1    (−2/7)  (−6/7)  ·  ·  ·
  pièges : n_gradient_sign, n_optimal_step_inverted

Méthode du gradient à pas optimal pour Ax = b, A = [[2,-1],[-1,2]], b = (0 ; −2), x⁽⁰⁾ = 0 : r⁽ᵏ⁾ = b − Ax⁽ᵏ⁾, αₖ = (r⁽ᵏ⁾·r⁽ᵏ⁾)/(r⁽ᵏ⁾·Ar⁽ᵏ⁾), x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + αₖr⁽ᵏ⁾. Fais une itération (fractions exactes).
  [tableau gradient]  colonnes : x₁⁽ᵏ⁾ | x₂⁽ᵏ⁾ | r₁⁽ᵏ⁾ | r₂⁽ᵏ⁾ | αₖ
    k = 0    0  0  (0)  (−2)  (1/2)
    k = 1    (0)  (−1)  ·  ·  ·
  pièges : n_gradient_sign, n_optimal_step_inverted

Méthode du gradient à pas optimal pour Ax = b, A = [[2,-1],[-1,2]], b = (0 ; 3), x⁽⁰⁾ = 0 : r⁽ᵏ⁾ = b − Ax⁽ᵏ⁾, αₖ = (r⁽ᵏ⁾·r⁽ᵏ⁾)/(r⁽ᵏ⁾·Ar⁽ᵏ⁾), x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + αₖr⁽ᵏ⁾. Fais une itération (fractions exactes).
  [tableau gradient]  colonnes : x₁⁽ᵏ⁾ | x₂⁽ᵏ⁾ | r₁⁽ᵏ⁾ | r₂⁽ᵏ⁾ | αₖ
    k = 0    0  0  (0)  (3)  (1/2)
    k = 1    (0)  (3/2)  ·  ·  ·
  pièges : n_gradient_sign, n_optimal_step_inverted

```

### Niveau 3

```
Gradient pour Ax = b, A = [[5,2],[2,2]], b = (2 ; −2), x⁽⁰⁾ = 0. On a r⁽⁰⁾ = (2 ; −2) et Ar⁽⁰⁾ = (6 ; 0). Calcule le pas optimal α₀, puis x⁽¹⁾. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  α_0
    ? Quel est le pas optimal ? ✔ α₀ = (r·r)/(r·Ar) / · α₀ = (r·Ar)/(r·r) / · α₀ = 1
    = 2/3   ← r⁽⁰⁾·r⁽⁰⁾ = 8, r⁽⁰⁾·Ar⁽⁰⁾ = 12, α₀ = 8/12
  — Le nouvel itéré.  [juge mat]  départ : x_1
    ? Dans quel sens avance-t-on ? ✔ x⁽¹⁾ = x⁽⁰⁾ + α₀r⁽⁰⁾ / · x⁽¹⁾ = x⁽⁰⁾ − α₀r⁽⁰⁾
    = (4/3 ; -4/3)   ← 2/3·(2 ; −2)
  aides : α₀ = (r·r)/(r·Ar) ; puis x⁽¹⁾ = x⁽⁰⁾ + α₀r⁽⁰⁾. | α₀ = 8/□ | α₀ = 2/3, x⁽¹⁾ = (4/3 ; −4/3).
  pièges : n_optimal_step_inverted, n_gradient_sign

Gradient pour Ax = b, A = [[2,0],[0,4]], b = (1 ; −2), x⁽⁰⁾ = 0. On a r⁽⁰⁾ = (1 ; −2) et Ar⁽⁰⁾ = (2 ; −8). Calcule le pas optimal α₀, puis x⁽¹⁾. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  α_0
    ? Quel est le pas optimal ? · α₀ = 1 / · α₀ = (r·Ar)/(r·r) / ✔ α₀ = (r·r)/(r·Ar)
    = 5/18   ← r⁽⁰⁾·r⁽⁰⁾ = 5, r⁽⁰⁾·Ar⁽⁰⁾ = 18, α₀ = 5/18
  — Le nouvel itéré.  [juge mat]  départ : x_1
    ? Dans quel sens avance-t-on ? ✔ x⁽¹⁾ = x⁽⁰⁾ + α₀r⁽⁰⁾ / · x⁽¹⁾ = x⁽⁰⁾ − α₀r⁽⁰⁾
    = (5/18 ; -5/9)   ← 5/18·(1 ; −2)
  aides : α₀ = (r·r)/(r·Ar) ; puis x⁽¹⁾ = x⁽⁰⁾ + α₀r⁽⁰⁾. | α₀ = 5/□ | α₀ = 5/18, x⁽¹⁾ = (5/18 ; −5/9).
  pièges : n_optimal_step_inverted, n_gradient_sign

Gradient pour Ax = b, A = [[2,-1],[-1,2]], b = (−1 ; 0), x⁽⁰⁾ = 0. On a r⁽⁰⁾ = (−1 ; 0) et Ar⁽⁰⁾ = (−2 ; 1). Calcule le pas optimal α₀, puis x⁽¹⁾. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  α_0
    ? Quel est le pas optimal ? ✔ α₀ = (r·r)/(r·Ar) / · α₀ = 1 / · α₀ = (r·Ar)/(r·r)
    = 1/2   ← r⁽⁰⁾·r⁽⁰⁾ = 1, r⁽⁰⁾·Ar⁽⁰⁾ = 2, α₀ = 1/2
  — Le nouvel itéré.  [juge mat]  départ : x_1
    ? Dans quel sens avance-t-on ? · x⁽¹⁾ = x⁽⁰⁾ − α₀r⁽⁰⁾ / ✔ x⁽¹⁾ = x⁽⁰⁾ + α₀r⁽⁰⁾
    = (-1/2 ; 0)   ← 1/2·(−1 ; 0)
  aides : α₀ = (r·r)/(r·Ar) ; puis x⁽¹⁾ = x⁽⁰⁾ + α₀r⁽⁰⁾. | α₀ = 1/□ | α₀ = 1/2, x⁽¹⁾ = (−1/2 ; 0).
  pièges : n_optimal_step_inverted, n_gradient_sign

```

### Niveau 4

```
Méthode du gradient à pas optimal pour Ax = b, A = [[2,-1],[-1,2]], b = (0 ; −2), x⁽⁰⁾ = 0 : r⁽ᵏ⁾ = b − Ax⁽ᵏ⁾, αₖ = (r⁽ᵏ⁾·r⁽ᵏ⁾)/(r⁽ᵏ⁾·Ar⁽ᵏ⁾), x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + αₖr⁽ᵏ⁾. Fais deux itérations (fractions exactes).
  [tableau gradient]  colonnes : x₁⁽ᵏ⁾ | x₂⁽ᵏ⁾ | r₁⁽ᵏ⁾ | r₂⁽ᵏ⁾ | αₖ
    k = 0    0  0  (0)  (−2)  (1/2)
    k = 1    (0)  (−1)  (−1)  (0)  (1/2)
    k = 2    (−1/2)  (−1)  ·  ·  ·
  puis : A = [[2,-1],[-1,2]] est SDP, de valeurs propres 1 et 3. Pour quels pas fixes α la méthode x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + α(b − Ax⁽ᵏ⁾) converge-t-elle pour tout x⁽⁰⁾ ?
      ✔ 0 < α < 2/3   · 0 < α < 2 [n_gradient_step_bound]   · 0 < α < 1/3 [n_gradient_step_bound]   · tout α > 0, puisque A est SDP
      pièges : n_gradient_step_bound
  pièges : n_gradient_sign, n_optimal_step_inverted, n_gradient_step_bound

Méthode du gradient à pas optimal pour Ax = b, A = [[5,2],[2,2]], b = (0 ; −1), x⁽⁰⁾ = 0 : r⁽ᵏ⁾ = b − Ax⁽ᵏ⁾, αₖ = (r⁽ᵏ⁾·r⁽ᵏ⁾)/(r⁽ᵏ⁾·Ar⁽ᵏ⁾), x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + αₖr⁽ᵏ⁾. Fais deux itérations (fractions exactes).
  [tableau gradient]  colonnes : x₁⁽ᵏ⁾ | x₂⁽ᵏ⁾ | r₁⁽ᵏ⁾ | r₂⁽ᵏ⁾ | αₖ
    k = 0    0  0  (0)  (−1)  (1/2)
    k = 1    (0)  (−1/2)  (1)  (0)  (1/5)
    k = 2    (1/5)  (−1/2)  ·  ·  ·
  puis : A = [[5,2],[2,2]] est SDP, de valeurs propres 1 et 6. Pour quels pas fixes α la méthode x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + α(b − Ax⁽ᵏ⁾) converge-t-elle pour tout x⁽⁰⁾ ?
      · 0 < α < 1/6 [n_gradient_step_bound]   · tout α > 0, puisque A est SDP   · 0 < α < 2 [n_gradient_step_bound]   ✔ 0 < α < 1/3
      pièges : n_gradient_step_bound
  pièges : n_gradient_sign, n_optimal_step_inverted, n_gradient_step_bound

Méthode du gradient à pas optimal pour Ax = b, A = [[5,2],[2,2]], b = (2 ; 0), x⁽⁰⁾ = 0 : r⁽ᵏ⁾ = b − Ax⁽ᵏ⁾, αₖ = (r⁽ᵏ⁾·r⁽ᵏ⁾)/(r⁽ᵏ⁾·Ar⁽ᵏ⁾), x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + αₖr⁽ᵏ⁾. Fais deux itérations (fractions exactes).
  [tableau gradient]  colonnes : x₁⁽ᵏ⁾ | x₂⁽ᵏ⁾ | r₁⁽ᵏ⁾ | r₂⁽ᵏ⁾ | αₖ
    k = 0    0  0  (2)  (0)  (1/5)
    k = 1    (2/5)  (0)  (0)  (−4/5)  (1/2)
    k = 2    (2/5)  (−2/5)  ·  ·  ·
  puis : A = [[5,2],[2,2]] est SDP, de valeurs propres 1 et 6. Pour quels pas fixes α la méthode x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + α(b − Ax⁽ᵏ⁾) converge-t-elle pour tout x⁽⁰⁾ ?
      · tout α > 0, puisque A est SDP   ✔ 0 < α < 1/3   · 0 < α < 1/6 [n_gradient_step_bound]   · 0 < α < 2 [n_gradient_step_bound]
      pièges : n_gradient_step_bound
  pièges : n_gradient_sign, n_optimal_step_inverted, n_gradient_step_bound

```

### Niveau 5

```
Complète la méthode du gradient à pas optimal (arrêt sur le résidu relatif), puis la version à pas fixe α.
  [code python, 4 trous, sans aide]
    | def gradient(A, b, x0, tol, nmax):
    |     x = x0
    |     for k in range(nmax):
    |         Ax = matvec(A, x)
    |         r = zeros(len(b))
    |         for i in range(len(b)):
    |             r[i] = ⟦b[i] - Ax[i]⟧
    |         if norm(r) <= tol * norm(b):
    |             return [x, k]
    |         Ar = matvec(A, r)
    |         alpha = ⟦dot(r, r) / dot(r, Ar)⟧
    |         for i in range(len(b)):
    |             x[i] = ⟦x[i] + alpha * r[i]⟧
    |     return [x, nmax]
    | 
    | def gradient_fixed(A, b, x0, alpha, nsteps):
    |     x = x0
    |     for k in range(nsteps):
    |         Ax = matvec(A, x)
    |         for i in range(len(b)):
    |             x[i] = ⟦x[i] - alpha * (Ax[i] - b[i])⟧
    |     return x
    test : A = [[2, -1], [-1, 2]] ; gradient(A, [1.0, 0.0], [0.0, 0.0], 1e-10, 1000)[0] → [0.6666666667, 0.3333333333]
    test : A = [[2, -1], [-1, 2]] ; gradient(A, [1.0, 0.0], [0.0, 0.0], 0.0, 2)[0] → [0.5, 0.25]
    test : A = [[2, -1], [-1, 2]] ; gradient_fixed(A, [1.0, 0.0], [0.0, 0.0], 0.5, 2) → [0.5, 0.25]
    test : A = [[2, -1], [-1, 2]] ; abs(gradient_fixed(A, [1.0, 0.0], [0.0, 0.0], 0.7, 60)[0]) > 10 → True
  puis : gradient_fixed, appelé pour A = [[2, −1], [−1, 2]] (valeurs propres 1 et 3), b = (1 ; 0), x⁽⁰⁾ = 0, donne l'erreur ‖x⁽ᵏ⁾ − x‖∞ :
      [tableau à lire, sans aide]
        α | erreur après 10 pas | après 20 pas | après 40 pas
        0,5 | 6.510e-04 | 6.358e-07 | 6.063e-13
        0,6 | 1.795e-02 | 1.922e-03 | 2.215e-05
        0,65 | 9.980e-02 | 5.975e-02 | 2.142e-02
        0,7 | 4.323e-01 | 1.121e+00 | 7.543e+00
      question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
          · Il faut α < 2/λ_min = 2 pour converger [n_gradient_step_bound]   ✔ Parmi ces pas, α = 0,5 converge le plus vite : le facteur max|1 − αλᵢ| vaut 1/2   ✔ Pour α = 0,7 > 2/3 = 2/λ_max, la méthode diverge   · Plus le pas est grand, plus la méthode converge vite
          pièges : n_gradient_step_bound
      pièges : n_gradient_step_bound
  pièges : n_gradient_sign, n_optimal_step_inverted

Complète la méthode du gradient à pas optimal (arrêt sur le résidu relatif), puis la version à pas fixe α.
  [code python, 4 trous, sans aide]
    | def gradient(A, b, x0, tol, nmax):
    |     x = x0
    |     for k in range(nmax):
    |         Ax = matvec(A, x)
    |         r = zeros(len(b))
    |         for i in range(len(b)):
    |             r[i] = ⟦b[i] - Ax[i]⟧
    |         if norm(r) <= tol * norm(b):
    |             return [x, k]
    |         Ar = matvec(A, r)
    |         alpha = ⟦dot(r, r) / dot(r, Ar)⟧
    |         for i in range(len(b)):
    |             x[i] = ⟦x[i] + alpha * r[i]⟧
    |     return [x, nmax]
    | 
    | def gradient_fixed(A, b, x0, alpha, nsteps):
    |     x = x0
    |     for k in range(nsteps):
    |         Ax = matvec(A, x)
    |         for i in range(len(b)):
    |             x[i] = ⟦x[i] - alpha * (Ax[i] - b[i])⟧
    |     return x
    test : A = [[2, -1], [-1, 2]] ; gradient(A, [1.0, 0.0], [0.0, 0.0], 1e-10, 1000)[0] → [0.6666666667, 0.3333333333]
    test : A = [[2, -1], [-1, 2]] ; gradient(A, [1.0, 0.0], [0.0, 0.0], 0.0, 2)[0] → [0.5, 0.25]
    test : A = [[2, -1], [-1, 2]] ; gradient_fixed(A, [1.0, 0.0], [0.0, 0.0], 0.5, 2) → [0.5, 0.25]
    test : A = [[2, -1], [-1, 2]] ; abs(gradient_fixed(A, [1.0, 0.0], [0.0, 0.0], 0.7, 60)[0]) > 10 → True
  puis : gradient_fixed, appelé pour A = [[2, −1], [−1, 2]] (valeurs propres 1 et 3), b = (1 ; 0), x⁽⁰⁾ = 0, donne l'erreur ‖x⁽ᵏ⁾ − x‖∞ :
      [tableau à lire, sans aide]
        α | erreur après 10 pas | après 20 pas | après 40 pas
        0,5 | 6.510e-04 | 6.358e-07 | 6.063e-13
        0,6 | 1.795e-02 | 1.922e-03 | 2.215e-05
        0,65 | 9.980e-02 | 5.975e-02 | 2.142e-02
        0,7 | 4.323e-01 | 1.121e+00 | 7.543e+00
      question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
          ✔ Pour α = 0,7 > 2/3 = 2/λ_max, la méthode diverge   ✔ Parmi ces pas, α = 0,5 converge le plus vite : le facteur max|1 − αλᵢ| vaut 1/2   · Plus le pas est grand, plus la méthode converge vite   · Il faut α < 2/λ_min = 2 pour converger [n_gradient_step_bound]
          pièges : n_gradient_step_bound
      pièges : n_gradient_step_bound
  pièges : n_gradient_sign, n_optimal_step_inverted

Complète la méthode du gradient à pas optimal (arrêt sur le résidu relatif), puis la version à pas fixe α.
  [code python, 4 trous, sans aide]
    | def gradient(A, b, x0, tol, nmax):
    |     x = x0
    |     for k in range(nmax):
    |         Ax = matvec(A, x)
    |         r = zeros(len(b))
    |         for i in range(len(b)):
    |             r[i] = ⟦b[i] - Ax[i]⟧
    |         if norm(r) <= tol * norm(b):
    |             return [x, k]
    |         Ar = matvec(A, r)
    |         alpha = ⟦dot(r, r) / dot(r, Ar)⟧
    |         for i in range(len(b)):
    |             x[i] = ⟦x[i] + alpha * r[i]⟧
    |     return [x, nmax]
    | 
    | def gradient_fixed(A, b, x0, alpha, nsteps):
    |     x = x0
    |     for k in range(nsteps):
    |         Ax = matvec(A, x)
    |         for i in range(len(b)):
    |             x[i] = ⟦x[i] - alpha * (Ax[i] - b[i])⟧
    |     return x
    test : A = [[2, -1], [-1, 2]] ; gradient(A, [1.0, 0.0], [0.0, 0.0], 1e-10, 1000)[0] → [0.6666666667, 0.3333333333]
    test : A = [[2, -1], [-1, 2]] ; gradient(A, [1.0, 0.0], [0.0, 0.0], 0.0, 2)[0] → [0.5, 0.25]
    test : A = [[2, -1], [-1, 2]] ; gradient_fixed(A, [1.0, 0.0], [0.0, 0.0], 0.5, 2) → [0.5, 0.25]
    test : A = [[2, -1], [-1, 2]] ; abs(gradient_fixed(A, [1.0, 0.0], [0.0, 0.0], 0.7, 60)[0]) > 10 → True
  puis : gradient_fixed, appelé pour A = [[2, −1], [−1, 2]] (valeurs propres 1 et 3), b = (1 ; 0), x⁽⁰⁾ = 0, donne l'erreur ‖x⁽ᵏ⁾ − x‖∞ :
      [tableau à lire, sans aide]
        α | erreur après 10 pas | après 20 pas | après 40 pas
        0,5 | 6.510e-04 | 6.358e-07 | 6.063e-13
        0,6 | 1.795e-02 | 1.922e-03 | 2.215e-05
        0,65 | 9.980e-02 | 5.975e-02 | 2.142e-02
        0,7 | 4.323e-01 | 1.121e+00 | 7.543e+00
      question : Que peut-on en déduire ? Une ou plusieurs réponses justes.
          · Plus le pas est grand, plus la méthode converge vite   ✔ Pour α = 0,7 > 2/3 = 2/λ_max, la méthode diverge   ✔ Parmi ces pas, α = 0,5 converge le plus vite : le facteur max|1 − αλᵢ| vaut 1/2   · Il faut α < 2/λ_min = 2 pour converger [n_gradient_step_bound]
          pièges : n_gradient_step_bound
      pièges : n_gradient_step_bound
  pièges : n_gradient_sign, n_optimal_step_inverted

```

### Variantes d'examen

```
A = [[5,2],[2,2]] est SDP, de valeurs propres 1 et 6. Pour quels pas fixes α la méthode x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + α(b − Ax⁽ᵏ⁾) converge-t-elle pour tout x⁽⁰⁾ ?
  ✔ 0 < α < 1/3   · 0 < α < 2 [n_gradient_step_bound]   · 0 < α < 1/6 [n_gradient_step_bound]   · tout α > 0, puisque A est SDP
  [examen mcq]
  pièges : n_gradient_step_bound

Vrai ou faux ? Si A est symétrique définie positive, le gradient à pas fixe converge pour tout pas α > 0.
  · Vrai [n_gradient_step_bound]   ✔ Faux
  [examen tf]
  pièges : n_gradient_step_bound

Méthode du gradient à pas fixe pour Ax = b, A symétrique définie positive : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + α(b − Ax⁽ᵏ⁾) (examen 2021, question ouverte 2).
  [problème, examen open, 7 points]
  partie 1 ((a) Le minimum de f : 1,5)
  Soit A SDP et f(v) = ½vᵀAv − bᵀv. Le minimum x de f vérifie :
    · f(x) = 0   ✔ ∇f(x) = Ax − b = 0, donc Ax = b   · ∇f(x) = 2Ax − b = 0 [m_grad_factor]   · ∇f(x) = ½Ax − b = 0 [m_grad_factor]
  partie 2 ((b) L'équation de l'erreur : 2,5)
  Montre que x − x⁽ᵏ⁺¹⁾ = (I − αA)(x − x⁽ᵏ⁾) pour le pas fixe α. Touche les blocs dans l'ordre.
    [blocs order, sans aide]
      1. x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + αr⁽ᵏ⁾ = x⁽ᵏ⁾ + α(b − Ax⁽ᵏ⁾).
      2. Comme Ax = b, on a b − Ax⁽ᵏ⁾ = A(x − x⁽ᵏ⁾).
      3. Donc x − x⁽ᵏ⁺¹⁾ = x − x⁽ᵏ⁾ − αA(x − x⁽ᵏ⁾) = (I − αA)(x − x⁽ᵏ⁾).
      ✗ x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − α(b − Ax⁽ᵏ⁾). [n_gradient_sign]
  partie 3 ((c) La convergence : 2)
  Montre que la méthode à pas fixe converge si 0 < α < 2/λₙ. Touche les blocs dans l'ordre.
    [blocs order, sans aide]
      1. A est SDP : elle a une base orthonormée de vecteurs propres v₁, …, vₙ, avec 0 < λ₁ ≤ … ≤ λₙ.
      2. Si e⁽ᵏ⁾ = x − x⁽ᵏ⁾ = Σ cᵢvᵢ, alors e⁽ᵏ⁺¹⁾ = (I − αA)e⁽ᵏ⁾ = Σ (1 − αλᵢ)cᵢvᵢ.
      3. ‖e⁽ᵏ⁺¹⁾‖² = Σ (1 − αλᵢ)²cᵢ² ≤ maxᵢ (1 − αλᵢ)²·‖e⁽ᵏ⁾‖².
      4. Si 0 < α < 2/λₙ, alors |1 − αλᵢ| < 1 pour tout i : l'erreur tend vers 0.
      ✗ ‖I − αA‖ ≤ 1 − α, donc la méthode converge pour tout α > 0. [n_gradient_step_bound]
  partie 4 ((d) Application : 1)
  Application : A = [[2,0],[0,4]] a pour valeurs propres 2 et 4. Donne la borne α_max telle que la méthode converge pour 0 < α < α_max.
    [free, sans aide, suivre l'erreur]  α_max
      = 1/2   ← 2/λ_max = 2/4
  pièges : m_grad_factor, n_gradient_sign, n_gradient_step_bound

```

## Euler progressif et rétrograde (`n-ode-euler`, BA4)

_Avancer pas à pas avec la pente du début (explicite) ou de la fin (implicite)._

### Niveau 1

```
u′ = −2u + 1, u(0) = 2, h = 0,2. Calcule u₁ par Euler progressif, puis par Euler rétrograde.
  [guided]  2 + 1/5·((−2)·(2) + 1)
    (Euler progressif : u₁ = u₀ + h·f(t₀, u₀), avec f(t, u) = −2u + 1.)
    = □   (trous : 7/5)   ← u₁ par Euler progressif
  — Euler rétrograde : u₁ = u₀ + h·f(t₁, u₁), soit u₁ = 2 + 0,2·(−2u₁ + 1). On isole u₁.  [juge value]  départ : u_1
    = (2 + 1/5·1)/(□)   (trous : (2 + 1/5·1)/(1 − 1/5·(−2)))   ← (1 − hλ)u₁ = u₀ + h·g(t₁)
    = □   (trous : 11/7)   ← u₁ par Euler rétrograde
  aides : Progressif : la pente au début du pas ; rétrograde : la pente à la fin, où u₁ est inconnu. | Rétrograde : u₁ = 2 + 0,2·f(0,2 ; □) | u₁ = 1,4 (progressif) ; u₁ = 11/7 (rétrograde).
  pièges : n_implicit_as_explicit

u′ = −u + t, u(0) = 2, h = 0,1. Calcule u₁ par Euler progressif, puis par Euler rétrograde.
  [guided]  2 + 1/10·((−1)·(2) + (0))
    (Euler progressif : u₁ = u₀ + h·f(t₀, u₀), avec f(t, u) = −u + t.)
    = □   (trous : 9/5)   ← u₁ par Euler progressif
  — Euler rétrograde : u₁ = u₀ + h·f(t₁, u₁), soit u₁ = 2 + 0,1·(−1u₁ + 0,1). On isole u₁.  [juge value]  départ : u_1
    = (2 + 1/10·1/10)/(□)   (trous : (2 + 1/10·1/10)/(1 − 1/10·(−1)))   ← (1 − hλ)u₁ = u₀ + h·g(t₁)
    = □   (trous : 201/110)   ← u₁ par Euler rétrograde
  aides : Progressif : la pente au début du pas ; rétrograde : la pente à la fin, où u₁ est inconnu. | Rétrograde : u₁ = 2 + 0,1·f(0,1 ; □) | u₁ = 1,8 (progressif) ; u₁ = 201/110 (rétrograde).
  pièges : n_implicit_as_explicit

u′ = −u, u(0) = 1, h = 0,1. Calcule u₁ par Euler progressif, puis par Euler rétrograde.
  [guided]  1 + 1/10·((−1)·(1))
    (Euler progressif : u₁ = u₀ + h·f(t₀, u₀), avec f(t, u) = −u.)
    = □   (trous : 9/10)   ← u₁ par Euler progressif
  — Euler rétrograde : u₁ = u₀ + h·f(t₁, u₁), soit u₁ = 1 + 0,1·(−1u₁). On isole u₁.  [juge value]  départ : u_1
    = (1 + 1/10·0)/(□)   (trous : (1 + 1/10·0)/(1 − 1/10·(−1)))   ← (1 − hλ)u₁ = u₀ + h·g(t₁)
    = □   (trous : 10/11)   ← u₁ par Euler rétrograde
  aides : Progressif : la pente au début du pas ; rétrograde : la pente à la fin, où u₁ est inconnu. | Rétrograde : u₁ = 1 + 0,1·f(0,1 ; □) | u₁ = 0,9 (progressif) ; u₁ = 10/11 (rétrograde).
  pièges : n_implicit_as_explicit

```

### Niveau 2

```
u′ = −2u, u(0) = 2, h = 0,05. Euler progressif : uₙ₊₁ = uₙ + h·f(tₙ, uₙ). Remplis le tableau (fractions exactes, ou décimaux exacts).
  [tableau ode]  colonnes : tₙ | uₙ
    k = 0    0  2
    k = 1    1/20  (9/5)
    k = 2    1/10  (81/50)

u′ = −5u, u(0) = 1, h = 0,1. Euler progressif : uₙ₊₁ = uₙ + h·f(tₙ, uₙ). Remplis le tableau (fractions exactes, ou décimaux exacts).
  [tableau ode]  colonnes : tₙ | uₙ
    k = 0    0  1
    k = 1    1/10  (1/2)
    k = 2    1/5  (1/4)

u′ = −10u + t, u(0) = 1, h = 0,05. Euler progressif : uₙ₊₁ = uₙ + h·f(tₙ, uₙ). Remplis le tableau (fractions exactes, ou décimaux exacts).
  [tableau ode]  colonnes : tₙ | uₙ
    k = 0    0  1
    k = 1    1/20  (1/2)
    k = 2    1/10  (101/400)

```

### Niveau 3

```
u′ = −2u + t, u(0) = 2, h = 0,2. Fais un pas d'Euler rétrograde : u₁ = ?
  [tap, suivre l'erreur]  u_1
    ? Euler rétrograde : en quel point évalue-t-on f ? ✔ f(t₁, u₁) : le nouveau point, u₁ inconnu / · f(t₀, u₀) : le point de départ / · f(t₁, u₀) : le nouveau temps, l'ancienne valeur
    = (2 + 1/5·1/5)/(1 − 1/5·(−2))   ← u₁ = 2 + 0,2·(−2u₁ + 0,2), on isole u₁
    = 51/35   ← u₁
  aides : Rétrograde : la pente de la fin du pas, f(t₁, u₁), avec u₁ inconnu. | (1 − 0,2·(−2))·u₁ = □ | u₁ = 51/35.
  pièges : n_implicit_as_explicit, n_euler_time_index

u′ = −2u, u(0) = 1, h = 0,1. Fais un pas d'Euler rétrograde : u₁ = ?
  [tap, suivre l'erreur]  u_1
    ? Euler rétrograde : en quel point évalue-t-on f ? ✔ f(t₁, u₁) : le nouveau point, u₁ inconnu / · f(t₀, u₀) : le point de départ / · f(t₁, u₀) : le nouveau temps, l'ancienne valeur
    = (1 + 1/10·0)/(1 − 1/10·(−2))   ← u₁ = 1 + 0,1·(−2u₁), on isole u₁
    = 5/6   ← u₁
  aides : Rétrograde : la pente de la fin du pas, f(t₁, u₁), avec u₁ inconnu. | (1 − 0,1·(−2))·u₁ = □ | u₁ = 5/6.
  pièges : n_implicit_as_explicit, n_euler_time_index

u′ = −u + 1, u(0) = 2, h = 0,05. Fais un pas d'Euler rétrograde : u₁ = ?
  [tap, suivre l'erreur]  u_1
    ? Euler rétrograde : en quel point évalue-t-on f ? ✔ f(t₁, u₁) : le nouveau point, u₁ inconnu / · f(t₀, u₀) : le point de départ / · f(t₁, u₀) : le nouveau temps, l'ancienne valeur
    = (2 + 1/20·1)/(1 − 1/20·(−1))   ← u₁ = 2 + 0,05·(−1u₁ + 1), on isole u₁
    = 41/21   ← u₁
  aides : Rétrograde : la pente de la fin du pas, f(t₁, u₁), avec u₁ inconnu. | (1 − 0,05·(−1))·u₁ = □ | u₁ = 41/21.
  pièges : n_implicit_as_explicit, n_euler_time_index

```

### Niveau 4

```
u′ = −u + 1, u(0) = 2, h = 0,1. Euler rétrograde : uₙ₊₁ = uₙ + h·f(tₙ₊₁, uₙ₊₁). Remplis le tableau (fractions exactes, ou décimaux exacts). f est affine en u : chaque pas est une équation du premier degré.
  [tableau ode]  colonnes : tₙ | uₙ
    k = 0    0  2
    k = 1    1/10  (21/11)
    k = 2    1/5  (221/121)
  puis : Avec Euler progressif, sur le même problème, combien vaut u₂ ? (La solution exacte donne u(0,2) ≈ 1,8187.)
      [free, sans aide, suivre l'erreur]  u_2
        = 19/10 + 1/10·((−1)·(19/10) + 1)   ← u₂ = u₁ + h·f(t₁, u₁)
        = 181/100   ← u₂ par Euler progressif
      pièges : n_euler_time_index
  pièges : n_implicit_as_explicit

u′ = −5u + 1, u(0) = 2, h = 0,1. Euler rétrograde : uₙ₊₁ = uₙ + h·f(tₙ₊₁, uₙ₊₁). Remplis le tableau (fractions exactes, ou décimaux exacts). f est affine en u : chaque pas est une équation du premier degré.
  [tableau ode]  colonnes : tₙ | uₙ
    k = 0    0  2
    k = 1    1/10  (7/5)
    k = 2    1/5  (1)
  puis : Avec Euler progressif, sur le même problème, combien vaut u₂ ? (La solution exacte donne u(0,2) ≈ 0,8622.)
      [free, sans aide, suivre l'erreur]  u_2
        = 11/10 + 1/10·((−5)·(11/10) + 1)   ← u₂ = u₁ + h·f(t₁, u₁)
        = 13/20   ← u₂ par Euler progressif
      pièges : n_euler_time_index
  pièges : n_implicit_as_explicit

u′ = −2u, u(0) = 1, h = 0,2. Euler rétrograde : uₙ₊₁ = uₙ + h·f(tₙ₊₁, uₙ₊₁). Remplis le tableau (fractions exactes, ou décimaux exacts). f est affine en u : chaque pas est une équation du premier degré.
  [tableau ode]  colonnes : tₙ | uₙ
    k = 0    0  1
    k = 1    1/5  (5/7)
    k = 2    2/5  (25/49)
  puis : Avec Euler progressif, sur le même problème, combien vaut u₂ ? (La solution exacte donne u(0,4) ≈ 0,4493.)
      [free, sans aide, suivre l'erreur]  u_2
        = 3/5 + 1/5·((−2)·(3/5))   ← u₂ = u₁ + h·f(t₁, u₁)
        = 9/25   ← u₂ par Euler progressif
      pièges : n_euler_time_index
  pièges : n_implicit_as_explicit

```

### Niveau 5

```
Complète Euler progressif pour u′ = f(t, u), puis Euler rétrograde pour u′ = λu + g(t), qui se résout à la main.
  [code python, 3 trous, sans aide]
    | def euler(f, t0, u0, T, N):
    |     h = (T - t0) / N
    |     t = t0
    |     u = u0
    |     for n in range(N):
    |         u = ⟦u + h * f(t, u)⟧
    |         t = ⟦t + h⟧
    |     return u
    | 
    | def euler_implicit_linear(lam, g, t0, u0, T, N):
    |     # u' = lam * u + g(t) : le schema retrograde se resout a la main
    |     h = (T - t0) / N
    |     t = t0
    |     u = u0
    |     for n in range(N):
    |         t = t + h
    |         u = ⟦(u + h * g(t)) / (1 - h * lam)⟧
    |     return u
    test : def f(t, u): return -2*u ; euler(f, 0, 1.0, 0.2, 2) → 0.64
    test : def f(t, u): return t ; euler(f, 0, 0.0, 1, 2) → 0.25
    test : def g(t): return 0.0 ; euler_implicit_linear(-2, g, 0, 1.0, 0.1, 1) → 0.8333333333333334
    test : def f(t, u): return 2/15*u*(1 - u/1000) ; euler(f, 0, 100.0, 100, 20) → 999.9999441414363
    test : def g(t): return 50*math.cos(t) ; euler_implicit_linear(-50, g, 0, 0.0, 1, 20) → 0.5566157093851379
  puis : u′ = √u/(1 + t²) sur [0 ; 20], u(0) = 1, de solution exacte (1 + ½·arctan t)². Erreur E = max |u(tₙ) − uₙ| pour N pas (h = 20/N) :
      [tableau à lire, sans aide]
        N | Euler progressif | Euler rétrograde
        50 | 2.239e-01 | 2.541e-01
        100 | 1.151e-01 | 1.226e-01
        200 | 5.842e-02 | 6.028e-02
        400 | 2.943e-02 | 2.990e-02
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          ✔ Les deux schémas sont d'ordre 1   · Euler rétrograde est plus précis, parce qu'il est implicite   ✔ Quand N double, l'erreur est environ divisée par 2   · L'erreur globale est d'ordre 2, comme l'erreur locale h²/2 [n_global_error_order]
          pièges : n_global_error_order
      pièges : n_global_error_order
  pièges : n_euler_time_index, n_implicit_as_explicit

Complète Euler progressif pour u′ = f(t, u), puis Euler rétrograde pour u′ = λu + g(t), qui se résout à la main.
  [code python, 3 trous, sans aide]
    | def euler(f, t0, u0, T, N):
    |     h = (T - t0) / N
    |     t = t0
    |     u = u0
    |     for n in range(N):
    |         u = ⟦u + h * f(t, u)⟧
    |         t = ⟦t + h⟧
    |     return u
    | 
    | def euler_implicit_linear(lam, g, t0, u0, T, N):
    |     # u' = lam * u + g(t) : le schema retrograde se resout a la main
    |     h = (T - t0) / N
    |     t = t0
    |     u = u0
    |     for n in range(N):
    |         t = t + h
    |         u = ⟦(u + h * g(t)) / (1 - h * lam)⟧
    |     return u
    test : def f(t, u): return -2*u ; euler(f, 0, 1.0, 0.2, 2) → 0.64
    test : def f(t, u): return t ; euler(f, 0, 0.0, 1, 2) → 0.25
    test : def g(t): return 0.0 ; euler_implicit_linear(-2, g, 0, 1.0, 0.1, 1) → 0.8333333333333334
    test : def f(t, u): return 2/15*u*(1 - u/1000) ; euler(f, 0, 100.0, 100, 20) → 999.9999441414363
    test : def g(t): return 50*math.cos(t) ; euler_implicit_linear(-50, g, 0, 0.0, 1, 20) → 0.5566157093851379
  puis : u′ = √u/(1 + t²) sur [0 ; 20], u(0) = 1, de solution exacte (1 + ½·arctan t)². Erreur E = max |u(tₙ) − uₙ| pour N pas (h = 20/N) :
      [tableau à lire, sans aide]
        N | Euler progressif | Euler rétrograde
        50 | 2.239e-01 | 2.541e-01
        100 | 1.151e-01 | 1.226e-01
        200 | 5.842e-02 | 6.028e-02
        400 | 2.943e-02 | 2.990e-02
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          ✔ Quand N double, l'erreur est environ divisée par 2   · Euler rétrograde est plus précis, parce qu'il est implicite   · L'erreur globale est d'ordre 2, comme l'erreur locale h²/2 [n_global_error_order]   ✔ Les deux schémas sont d'ordre 1
          pièges : n_global_error_order
      pièges : n_global_error_order
  pièges : n_euler_time_index, n_implicit_as_explicit

Complète Euler progressif pour u′ = f(t, u), puis Euler rétrograde pour u′ = λu + g(t), qui se résout à la main.
  [code python, 3 trous, sans aide]
    | def euler(f, t0, u0, T, N):
    |     h = (T - t0) / N
    |     t = t0
    |     u = u0
    |     for n in range(N):
    |         u = ⟦u + h * f(t, u)⟧
    |         t = ⟦t + h⟧
    |     return u
    | 
    | def euler_implicit_linear(lam, g, t0, u0, T, N):
    |     # u' = lam * u + g(t) : le schema retrograde se resout a la main
    |     h = (T - t0) / N
    |     t = t0
    |     u = u0
    |     for n in range(N):
    |         t = t + h
    |         u = ⟦(u + h * g(t)) / (1 - h * lam)⟧
    |     return u
    test : def f(t, u): return -2*u ; euler(f, 0, 1.0, 0.2, 2) → 0.64
    test : def f(t, u): return t ; euler(f, 0, 0.0, 1, 2) → 0.25
    test : def g(t): return 0.0 ; euler_implicit_linear(-2, g, 0, 1.0, 0.1, 1) → 0.8333333333333334
    test : def f(t, u): return 2/15*u*(1 - u/1000) ; euler(f, 0, 100.0, 100, 20) → 999.9999441414363
    test : def g(t): return 50*math.cos(t) ; euler_implicit_linear(-50, g, 0, 0.0, 1, 20) → 0.5566157093851379
  puis : u′ = √u/(1 + t²) sur [0 ; 20], u(0) = 1, de solution exacte (1 + ½·arctan t)². Erreur E = max |u(tₙ) − uₙ| pour N pas (h = 20/N) :
      [tableau à lire, sans aide]
        N | Euler progressif | Euler rétrograde
        50 | 2.239e-01 | 2.541e-01
        100 | 1.151e-01 | 1.226e-01
        200 | 5.842e-02 | 6.028e-02
        400 | 2.943e-02 | 2.990e-02
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          · Euler rétrograde est plus précis, parce qu'il est implicite   ✔ Les deux schémas sont d'ordre 1   ✔ Quand N double, l'erreur est environ divisée par 2   · L'erreur globale est d'ordre 2, comme l'erreur locale h²/2 [n_global_error_order]
          pièges : n_global_error_order
      pièges : n_global_error_order
  pièges : n_euler_time_index, n_implicit_as_explicit

```

### Variantes d'examen

```
u′ = −u, u(0) = 2, h = 0,2. Euler rétrograde donne u₁ =
  · 2,4   · 1,6 [n_implicit_as_explicit]   ✔ 5/3   · 2,5
  [examen mcq]
  pièges : n_implicit_as_explicit

Vrai ou faux ? Le schéma d'Euler rétrograde uₙ₊₁ = uₙ + h·f(tₙ₊₁, uₙ₊₁) est explicite.
  · Vrai [n_implicit_as_explicit]   ✔ Faux
  [examen tf]
  pièges : n_implicit_as_explicit

```

## Heun, Crank-Nicolson, Runge-Kutta (`n-ode-rk`, BA4)

_Moyenner deux pentes pour gagner un ordre._

### Niveau 1

```
u′ = −2u + t, u(0) = 1, h = 0,2. Méthode de Heun : k₁ = f(tₙ, uₙ), k₂ = f(tₙ₊₁, uₙ + h·k₁), uₙ₊₁ = uₙ + (h/2)(k₁ + k₂). Remplis k₁ et k₂ (u₁ est donné).
  [tableau ode]  colonnes : tₙ | k₁ | k₂ | uₙ
    k = 0    0  ·  ·  1
    k = 1    1/5  (−2)  (−1)  7/10
  pièges : n_heun_k2

u′ = −2u, u(0) = 1, h = 0,2. Méthode de Heun : k₁ = f(tₙ, uₙ), k₂ = f(tₙ₊₁, uₙ + h·k₁), uₙ₊₁ = uₙ + (h/2)(k₁ + k₂). Remplis k₁ et k₂ (u₁ est donné).
  [tableau ode]  colonnes : tₙ | k₁ | k₂ | uₙ
    k = 0    0  ·  ·  1
    k = 1    1/5  (−2)  (−6/5)  17/25
  pièges : n_heun_k2

u′ = −5u + t, u(0) = 1, h = 0,1. Méthode de Heun : k₁ = f(tₙ, uₙ), k₂ = f(tₙ₊₁, uₙ + h·k₁), uₙ₊₁ = uₙ + (h/2)(k₁ + k₂). Remplis k₁ et k₂ (u₁ est donné).
  [tableau ode]  colonnes : tₙ | k₁ | k₂ | uₙ
    k = 0    0  ·  ·  1
    k = 1    1/10  (−5)  (−12/5)  63/100
  pièges : n_heun_k2

```

### Niveau 2

```
u′ = −10u, u(0) = 2, h = 0,05. Méthode de Heun : k₁ = f(tₙ, uₙ), k₂ = f(tₙ₊₁, uₙ + h·k₁), uₙ₊₁ = uₙ + (h/2)(k₁ + k₂). Remplis k₁, k₂ et uₙ.
  [tableau ode]  colonnes : tₙ | k₁ | k₂ | uₙ
    k = 0    0  ·  ·  2
    k = 1    1/20  (−20)  (−10)  (5/4)
  pièges : n_heun_k2

u′ = −5u, u(0) = 2, h = 0,05. Méthode de Heun : k₁ = f(tₙ, uₙ), k₂ = f(tₙ₊₁, uₙ + h·k₁), uₙ₊₁ = uₙ + (h/2)(k₁ + k₂). Remplis k₁, k₂ et uₙ.
  [tableau ode]  colonnes : tₙ | k₁ | k₂ | uₙ
    k = 0    0  ·  ·  2
    k = 1    1/20  (−10)  (−15/2)  (25/16)
  pièges : n_heun_k2

u′ = −2u + t, u(0) = 1, h = 0,2. Méthode de Heun : k₁ = f(tₙ, uₙ), k₂ = f(tₙ₊₁, uₙ + h·k₁), uₙ₊₁ = uₙ + (h/2)(k₁ + k₂). Remplis k₁, k₂ et uₙ.
  [tableau ode]  colonnes : tₙ | k₁ | k₂ | uₙ
    k = 0    0  ·  ·  1
    k = 1    1/5  (−2)  (−1)  (7/10)
  pièges : n_heun_k2

```

### Niveau 3

```
Pour u′ = f(t, u), on considère le schéma uₙ₊₁ = uₙ + h·f(tₙ₊₁, uₙ₊₁) De quel schéma s'agit-il ?
  · Aucun de ces schémas   · Heun   · Euler progressif   ✔ Euler rétrograde

Pour u′ = −u + sin(tu), tₙ = nΔt, on considère le schéma uₙ₊₁ = uₙ + Δt·(−uₙ + sin(nΔt·uₙ)) De quel schéma s'agit-il ?
  · Heun   · Crank-Nicolson   ✔ Euler progressif   · Aucun de ces schémas

Pour u′ = f(t, u), on considère le schéma uₙ₊₁ = uₙ + (h/2)·(f(tₙ, uₙ) + f(tₙ₊₁, uₙ₊₁)) De quel schéma s'agit-il ?
  · Heun   ✔ Crank-Nicolson   · Euler progressif   · Euler rétrograde

```

### Niveau 4

```
u′ = −2u + t, u(0) = 1, h = 0,2. Méthode de Heun : k₁ = f(tₙ, uₙ), k₂ = f(tₙ₊₁, uₙ + h·k₁), uₙ₊₁ = uₙ + (h/2)(k₁ + k₂). Remplis k₁, k₂ et uₙ.
  [tableau ode]  colonnes : tₙ | k₁ | k₂ | uₙ
    k = 0    0  ·  ·  1
    k = 1    1/5  (−2)  (−1)  (7/10)
    k = 2    2/5  (−6/5)  (−13/25)  (66/125)
  puis : Même problème, un pas de Crank-Nicolson : u₁ = u₀ + (h/2)(f(t₀, u₀) + f(t₁, u₁)). Combien vaut u₁ ?
      [free, sans aide, suivre l'erreur]  u_1
        = (1 + (1/5)/2·((−2)·1 + 0) + (1/5)/2·1/5)/(1 − (1/5)/2·(−2))   ← u₁ figure des deux côtés : on l'isole
        = 41/60   ← u₁ par Crank-Nicolson
      pièges : n_cn_explicit
  pièges : n_heun_k2

u′ = −5u, u(0) = 2, h = 0,05. Méthode de Heun : k₁ = f(tₙ, uₙ), k₂ = f(tₙ₊₁, uₙ + h·k₁), uₙ₊₁ = uₙ + (h/2)(k₁ + k₂). Remplis k₁, k₂ et uₙ.
  [tableau ode]  colonnes : tₙ | k₁ | k₂ | uₙ
    k = 0    0  ·  ·  2
    k = 1    1/20  (−10)  (−15/2)  (25/16)
    k = 2    1/10  (−125/16)  (−375/64)  (625/512)
  puis : Même problème, un pas de Crank-Nicolson : u₁ = u₀ + (h/2)(f(t₀, u₀) + f(t₁, u₁)). Combien vaut u₁ ?
      [free, sans aide, suivre l'erreur]  u_1
        = (2 + (1/20)/2·((−5)·2 + 0) + (1/20)/2·0)/(1 − (1/20)/2·(−5))   ← u₁ figure des deux côtés : on l'isole
        = 14/9   ← u₁ par Crank-Nicolson
      pièges : n_cn_explicit
  pièges : n_heun_k2

u′ = −2u, u(0) = 1, h = 0,2. Méthode de Heun : k₁ = f(tₙ, uₙ), k₂ = f(tₙ₊₁, uₙ + h·k₁), uₙ₊₁ = uₙ + (h/2)(k₁ + k₂). Remplis k₁, k₂ et uₙ.
  [tableau ode]  colonnes : tₙ | k₁ | k₂ | uₙ
    k = 0    0  ·  ·  1
    k = 1    1/5  (−2)  (−6/5)  (17/25)
    k = 2    2/5  (−34/25)  (−102/125)  (289/625)
  puis : Même problème, un pas de Crank-Nicolson : u₁ = u₀ + (h/2)(f(t₀, u₀) + f(t₁, u₁)). Combien vaut u₁ ?
      [free, sans aide, suivre l'erreur]  u_1
        = (1 + (1/5)/2·((−2)·1 + 0) + (1/5)/2·0)/(1 − (1/5)/2·(−2))   ← u₁ figure des deux côtés : on l'isole
        = 2/3   ← u₁ par Crank-Nicolson
      pièges : n_cn_explicit
  pièges : n_heun_k2

```

### Niveau 5

```
Complète la méthode de Heun : une prédiction par Euler, puis la moyenne des deux pentes.
  [code python, 2 trous, sans aide]
    | def heun(f, t0, u0, T, N):
    |     h = (T - t0) / N
    |     t = t0
    |     u = u0
    |     for n in range(N):
    |         k1 = f(t, u)
    |         k2 = ⟦f(t + h, u + h * k1)⟧
    |         u = ⟦u + h / 2 * (k1 + k2)⟧
    |         t = t + h
    |     return u
    test : def f(t, u): return -2*u ; heun(f, 0, 1.0, 0.1, 1) → 0.82
    test : def f(t, u): return t ; heun(f, 0, 0.0, 1, 1) → 0.5
    test : def f(t, u): return 2/15*u*(1 - u/1000) ; heun(f, 0, 100.0, 100, 20) → 999.9533941083979
  puis : u′ = √u/(1 + t²) sur [0 ; 20], u(0) = 1, de solution exacte (1 + ½·arctan t)². Erreur E = max |u(tₙ) − uₙ| pour N pas (h = 20/N) :
      [tableau à lire, sans aide]
        N | Euler progressif | Euler rétrograde | Heun
        50 | 2.239e-01 | 2.541e-01 | 1.608e-02
        100 | 1.151e-01 | 1.226e-01 | 4.025e-03
        200 | 5.842e-02 | 6.028e-02 | 1.003e-03
        400 | 2.943e-02 | 2.990e-02 | 2.507e-04
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          · Heun est d'ordre 4, comme Runge-Kutta   ✔ Heun est d'ordre 2 : son erreur est divisée par 4 quand N double   ✔ Euler progressif et Euler rétrograde sont d'ordre 1   · Euler rétrograde est d'ordre 2, parce qu'il est implicite [n_global_error_order]
          pièges : n_global_error_order
      pièges : n_global_error_order
  pièges : n_heun_k2

Complète la méthode de Heun : une prédiction par Euler, puis la moyenne des deux pentes.
  [code python, 2 trous, sans aide]
    | def heun(f, t0, u0, T, N):
    |     h = (T - t0) / N
    |     t = t0
    |     u = u0
    |     for n in range(N):
    |         k1 = f(t, u)
    |         k2 = ⟦f(t + h, u + h * k1)⟧
    |         u = ⟦u + h / 2 * (k1 + k2)⟧
    |         t = t + h
    |     return u
    test : def f(t, u): return -2*u ; heun(f, 0, 1.0, 0.1, 1) → 0.82
    test : def f(t, u): return t ; heun(f, 0, 0.0, 1, 1) → 0.5
    test : def f(t, u): return 2/15*u*(1 - u/1000) ; heun(f, 0, 100.0, 100, 20) → 999.9533941083979
  puis : u′ = √u/(1 + t²) sur [0 ; 20], u(0) = 1, de solution exacte (1 + ½·arctan t)². Erreur E = max |u(tₙ) − uₙ| pour N pas (h = 20/N) :
      [tableau à lire, sans aide]
        N | Euler progressif | Euler rétrograde | Heun
        50 | 2.239e-01 | 2.541e-01 | 1.608e-02
        100 | 1.151e-01 | 1.226e-01 | 4.025e-03
        200 | 5.842e-02 | 6.028e-02 | 1.003e-03
        400 | 2.943e-02 | 2.990e-02 | 2.507e-04
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          ✔ Heun est d'ordre 2 : son erreur est divisée par 4 quand N double   ✔ Euler progressif et Euler rétrograde sont d'ordre 1   · Heun est d'ordre 4, comme Runge-Kutta   · Euler rétrograde est d'ordre 2, parce qu'il est implicite [n_global_error_order]
          pièges : n_global_error_order
      pièges : n_global_error_order
  pièges : n_heun_k2

Complète la méthode de Heun : une prédiction par Euler, puis la moyenne des deux pentes.
  [code python, 2 trous, sans aide]
    | def heun(f, t0, u0, T, N):
    |     h = (T - t0) / N
    |     t = t0
    |     u = u0
    |     for n in range(N):
    |         k1 = f(t, u)
    |         k2 = ⟦f(t + h, u + h * k1)⟧
    |         u = ⟦u + h / 2 * (k1 + k2)⟧
    |         t = t + h
    |     return u
    test : def f(t, u): return -2*u ; heun(f, 0, 1.0, 0.1, 1) → 0.82
    test : def f(t, u): return t ; heun(f, 0, 0.0, 1, 1) → 0.5
    test : def f(t, u): return 2/15*u*(1 - u/1000) ; heun(f, 0, 100.0, 100, 20) → 999.9533941083979
  puis : u′ = √u/(1 + t²) sur [0 ; 20], u(0) = 1, de solution exacte (1 + ½·arctan t)². Erreur E = max |u(tₙ) − uₙ| pour N pas (h = 20/N) :
      [tableau à lire, sans aide]
        N | Euler progressif | Euler rétrograde | Heun
        50 | 2.239e-01 | 2.541e-01 | 1.608e-02
        100 | 1.151e-01 | 1.226e-01 | 4.025e-03
        200 | 5.842e-02 | 6.028e-02 | 1.003e-03
        400 | 2.943e-02 | 2.990e-02 | 2.507e-04
      question : Que montre ce tableau ? Une ou plusieurs réponses justes.
          · Euler rétrograde est d'ordre 2, parce qu'il est implicite [n_global_error_order]   ✔ Heun est d'ordre 2 : son erreur est divisée par 4 quand N double   ✔ Euler progressif et Euler rétrograde sont d'ordre 1   · Heun est d'ordre 4, comme Runge-Kutta
          pièges : n_global_error_order
      pièges : n_global_error_order
  pièges : n_heun_k2

```

### Variantes d'examen

```
Pour u′ = −u + sin(tu), tₙ = nΔt, on considère le schéma uₙ₊₁ = uₙ + (Δt/2)·(−uₙ − uₙ₊₁ + sin(nΔt·uₙ) + sin((n + 1)Δt·uₙ₊₁)) De quel schéma s'agit-il ?
  · Heun   ✔ Crank-Nicolson   · Euler rétrograde   · Aucun de ces schémas
  [examen mcq]

```

## Stabilité absolue sur u′ = λu (`n-ode-stability`, BA4)

_Pour quels pas h la solution numérique tend-elle vers 0 comme la vraie ?_

### Niveau 1

```
Crank-Nicolson sur u′ = λu avec λ = −20. Pour quels pas h > 0 le schéma est-il absolument stable ?
  [guided]  |(1 − 10h)/(1 + 10h)| < 1
    (Crank-Nicolson : uₙ₊₁ = R(hλ)·uₙ avec R(z) = (1 + z/2)/(1 − z/2). Ici hλ = −20h.)
    = □   (trous : ]0 ; +∞[)   ← Le dénominateur est > 1 pour tout h > 0 : |R| < 1 toujours
  aides : Le schéma est stable si |R(hλ)| < 1 : résous cette inégalité en h > 0. | 1 + □·h > 1 pour tout h > 0 | h ∈ ]0 ; +∞[.

Euler progressif sur u′ = λu avec λ = −2. Pour quels pas h > 0 le schéma est-il absolument stable ?
  [guided]  |1 − 2h| < 1
    (Euler progressif : uₙ₊₁ = R(hλ)·uₙ avec R(z) = 1 + z. Ici hλ = −2h.)
    = −1 < □ < 1   (trous : −1 < 1 − 2h < 1)   ← |x| < 1 ⇔ −1 < x < 1
    = 0 < h < □   (trous : 0 < h < 1)   ← −2 < −2h < 0
    = ]0 ; 1[   ← h < 2/|λ|
  aides : Le schéma est stable si |R(hλ)| < 1 : résous cette inégalité en h > 0. | −1 < 1 − 2h < 1 ⇔ 0 < h < □ | h ∈ ]0 ; 1[.

Euler progressif sur u′ = λu avec λ = −5. Pour quels pas h > 0 le schéma est-il absolument stable ?
  [guided]  |1 − 5h| < 1
    (Euler progressif : uₙ₊₁ = R(hλ)·uₙ avec R(z) = 1 + z. Ici hλ = −5h.)
    = −1 < □ < 1   (trous : −1 < 1 − 5h < 1)   ← |x| < 1 ⇔ −1 < x < 1
    = 0 < h < □   (trous : 0 < h < 2/5)   ← −2 < −5h < 0
    = ]0 ; 2/5[   ← h < 2/|λ|
  aides : Le schéma est stable si |R(hλ)| < 1 : résous cette inégalité en h > 0. | −1 < 1 − 5h < 1 ⇔ 0 < h < □ | h ∈ ]0 ; 2/5[.

```

### Niveau 2

```
Crank-Nicolson sur u′ = λu, λ = −20. Choisis R(z), puis donne les pas h > 0 qui rendent le schéma stable.
  [guided]  |(1 − 10h)/(1 + 10h)| < 1
    ? Crank-Nicolson sur u′ = λu donne uₙ₊₁ = R(z)·uₙ avec z = hλ. Quel est R(z) ? · R(z) = 1 − z / ✔ R(z) = (1 + z/2)/(1 − z/2) / · R(z) = 1 + z / · R(z) = 1/(1 − z)
    = □   (trous : ]0 ; +∞[)   ← Stable pour tout h > 0
  aides : Écris un pas du schéma sur u′ = λu : uₙ₊₁ = R(hλ)·uₙ. | |R(−20h)| < 1 ⇔ h ∈ ]0 ; □[ | R(z) = (1 + z/2)/(1 − z/2) ; h ∈ ]0 ; +∞[.
  pièges : n_stab_lambda_sign

Euler rétrograde sur u′ = λu, λ = −20. Choisis R(z), puis donne les pas h > 0 qui rendent le schéma stable.
  [guided]  |1/(1 + 20h)| < 1
    ? Euler rétrograde sur u′ = λu donne uₙ₊₁ = R(z)·uₙ avec z = hλ. Quel est R(z) ? · R(z) = 1 − z / · R(z) = 1 + z + z²/2 / ✔ R(z) = 1/(1 − z) / · R(z) = (1 + z/2)/(1 − z/2)
    = □   (trous : ]0 ; +∞[)   ← Stable pour tout h > 0
  aides : Écris un pas du schéma sur u′ = λu : uₙ₊₁ = R(hλ)·uₙ. | |R(−20h)| < 1 ⇔ h ∈ ]0 ; □[ | R(z) = 1/(1 − z) ; h ∈ ]0 ; +∞[.
  pièges : n_stab_lambda_sign

Euler progressif sur u′ = λu, λ = −2. Choisis R(z), puis donne les pas h > 0 qui rendent le schéma stable.
  [guided]  |1 − 2h| < 1
    ? Euler progressif sur u′ = λu donne uₙ₊₁ = R(z)·uₙ avec z = hλ. Quel est R(z) ? ✔ R(z) = 1 + z / · R(z) = 1 + z + z²/2 / · R(z) = 1 − z / · R(z) = 1/(1 − z)
    = 0 < h < □   (trous : 0 < h < 1)   ← −2 < hλ < 0
    = ]0 ; 1[   ← h < 2/|λ|
  aides : Écris un pas du schéma sur u′ = λu : uₙ₊₁ = R(hλ)·uₙ. | |R(−2h)| < 1 ⇔ h ∈ ]0 ; □[ | R(z) = 1 + z ; h ∈ ]0 ; 1[.
  pièges : n_stab_lambda_sign

```

### Niveau 3

```
Classe les schémas.
  [tableau à lire]
  question : Sur u′ = λu avec λ < 0, quels schémas sont stables pour tout pas h > 0 ? Une ou plusieurs réponses justes.
      ✔ Crank-Nicolson   ✔ Euler rétrograde   · la θ-méthode avec θ = 1/3   · Euler progressif [n_stab_factor2]   · Heun
      pièges : n_stab_factor2
  pièges : n_stab_factor2

Classe les schémas.
  [tableau à lire]
  question : Sur u′ = λu avec λ < 0, quels schémas sont stables pour tout pas h > 0 ? Une ou plusieurs réponses justes.
      · Euler progressif [n_stab_factor2]   ✔ Euler rétrograde   · la θ-méthode avec θ = 1/3   ✔ Crank-Nicolson   · Heun
      pièges : n_stab_factor2
  pièges : n_stab_factor2

Classe les schémas.
  [tableau à lire]
  question : Sur u′ = λu avec λ < 0, quels schémas sont stables pour tout pas h > 0 ? Une ou plusieurs réponses justes.
      · Heun   ✔ Euler rétrograde   ✔ Crank-Nicolson   · la θ-méthode avec θ = 1/4   · Euler progressif [n_stab_factor2]
      pièges : n_stab_factor2
  pièges : n_stab_factor2

```

### Niveau 4

```
Système u′ = Au avec A = [[−5, 1], [1, −5]]. Trouve les valeurs propres, puis les pas h > 0 pour lesquels Euler progressif est stable.
  [free, suivre l'erreur]  (−5 − λ)² − 1 = 0
    = {−6 ; −4}   ← det(A − λI) = 0
  — Chaque valeur propre doit vérifier |1 + hλᵢ| < 1.  [juge solset]  départ : |1 − 4h| < 1 et |1 − 6h| < 1
    = ]0 ; 1/3[   ← La plus grande, |λ| = 6, impose h < 2/6
  aides : Les valeurs propres de A, puis |1 + hλᵢ| < 1 pour chacune. | λ = -5 ± 1 ; h < 2/□ | λ ∈ {−6 ; −4}, h ∈ ]0 ; 1/3[.

Système u′ = Au avec A = [[−6, 1], [1, −6]]. Trouve les valeurs propres, puis les pas h > 0 pour lesquels Euler progressif est stable.
  [free, suivre l'erreur]  (−6 − λ)² − 1 = 0
    = {−7 ; −5}   ← det(A − λI) = 0
  — Chaque valeur propre doit vérifier |1 + hλᵢ| < 1.  [juge solset]  départ : |1 − 5h| < 1 et |1 − 7h| < 1
    = ]0 ; 2/7[   ← La plus grande, |λ| = 7, impose h < 2/7
  aides : Les valeurs propres de A, puis |1 + hλᵢ| < 1 pour chacune. | λ = -6 ± 1 ; h < 2/□ | λ ∈ {−7 ; −5}, h ∈ ]0 ; 2/7[.

Système u′ = Au avec A = [[−1, 2], [−2, −1]], de valeurs propres −1 ± 2i. Pour quels pas h > 0 Euler progressif est-il stable ?
  [free, suivre l'erreur]  (1 − h)² + (2h)² < 1
    (Chaque valeur propre compte : |1 + hλ|² = (1 − 1h)² + (2h)² < 1.)
    = ]0 ; 2/5[   ← h < 2a/(a² + b²) = 0,4
  aides : Pour un système, EP est stable si |1 + hλᵢ| < 1 pour chaque valeur propre λᵢ (complexe : module). | (1 − 1h)² + 4h² < 1 ⇔ h(5h − □) < 0 | h ∈ ]0 ; 2/5[.

```

### Niveau 5

```
u′ = −50(u − cos t), u(0) = 0, sur [0 ; 1]. Valeur uₙ obtenue en t = 1 avec N pas (la solution exacte vaut ≈ 5,57·10⁻¹) :
  [tableau à lire, sans aide]
    N | h | Euler progressif | Euler rétrograde
    20 | 0.05 | -3.325e+03 | 5.566e-01
    24 | 0.0417 | -6.271e+00 | 5.567e-01
    26 | 0.0385 | 4.323e-01 | 5.567e-01
    50 | 0.02 | 5.570e-01 | 5.568e-01
    100 | 0.01 | 5.570e-01 | 5.569e-01
  question : Que montre ce tableau ? Une ou plusieurs réponses justes.
      · Euler progressif explose parce que sa précision est insuffisante : il suffit de diminuer la tolérance [n_stiff_accuracy]   ✔ Euler rétrograde est stable pour tout h   · Euler progressif est d'ordre 0 pour h = 0,05 [n_stab_order_confused]   ✔ Euler progressif est instable pour h > 2/50 = 0,04
      pièges : n_stab_order_confused, n_stiff_accuracy
  pièges : n_stab_order_confused, n_stiff_accuracy

u′ = −50(u − cos t), u(0) = 0, sur [0 ; 1]. Valeur uₙ obtenue en t = 1 avec N pas (la solution exacte vaut ≈ 5,57·10⁻¹) :
  [tableau à lire, sans aide]
    N | h | Euler progressif | Euler rétrograde
    20 | 0.05 | -3.325e+03 | 5.566e-01
    24 | 0.0417 | -6.271e+00 | 5.567e-01
    26 | 0.0385 | 4.323e-01 | 5.567e-01
    50 | 0.02 | 5.570e-01 | 5.568e-01
    100 | 0.01 | 5.570e-01 | 5.569e-01
  question : Que montre ce tableau ? Une ou plusieurs réponses justes.
      · Euler progressif est d'ordre 0 pour h = 0,05 [n_stab_order_confused]   · Euler progressif explose parce que sa précision est insuffisante : il suffit de diminuer la tolérance [n_stiff_accuracy]   ✔ Euler rétrograde est stable pour tout h   ✔ Euler progressif est instable pour h > 2/50 = 0,04
      pièges : n_stab_order_confused, n_stiff_accuracy
  pièges : n_stab_order_confused, n_stiff_accuracy

u′ = −50(u − cos t), u(0) = 0, sur [0 ; 1]. Valeur uₙ obtenue en t = 1 avec N pas (la solution exacte vaut ≈ 5,57·10⁻¹) :
  [tableau à lire, sans aide]
    N | h | Euler progressif | Euler rétrograde
    20 | 0.05 | -3.325e+03 | 5.566e-01
    24 | 0.0417 | -6.271e+00 | 5.567e-01
    26 | 0.0385 | 4.323e-01 | 5.567e-01
    50 | 0.02 | 5.570e-01 | 5.568e-01
    100 | 0.01 | 5.570e-01 | 5.569e-01
  question : Que montre ce tableau ? Une ou plusieurs réponses justes.
      · Euler progressif explose parce que sa précision est insuffisante : il suffit de diminuer la tolérance [n_stiff_accuracy]   ✔ Euler rétrograde est stable pour tout h   ✔ Euler progressif est instable pour h > 2/50 = 0,04   · Euler progressif est d'ordre 0 pour h = 0,05 [n_stab_order_confused]
      pièges : n_stab_order_confused, n_stiff_accuracy
  pièges : n_stab_order_confused, n_stiff_accuracy

```

### Variantes d'examen

```
La θ-méthode uₙ₊₁ = uₙ + h[(1 − θ)f(tₙ, uₙ) + θf(tₙ₊₁, uₙ₊₁)] est stable pour tout h > 0 sur u′ = λu (λ < 0) si et seulement si
  · θ ≤ 1/2   · θ = 1/2 seulement (Crank-Nicolson)   · θ = 1 seulement (Euler rétrograde)   ✔ θ ≥ 1/2
  [examen mcq]

Vrai ou faux ?
  « La méthode de Heun est inconditionnellement stable sur u′ = λu, λ < 0. » → FAUX
    contre-exemple (num) : z = -3
  [examen tf]

```

## Erreur globale d'Euler, par une preuve (`n-ode-euler-global`, BA4)

_Les erreurs locales en h² s'accumulent sur T/h pas : l'erreur globale est en h._

### Niveau 1

```
Erreur globale d'Euler progressif pour u′ = −u, u(0) = 1 sur [0 ; 50], h = 50/N. Écris le schéma, factorise a² − b², puis donne la constante C de la borne C·h.
  [guided]  u + h·(−u)
    = (□)u   (trous : (1 − h)u)   ← uₙ₊₁ = uₙ + h·(−uₙ) = (1 − h)uₙ, donc u_N = (1 − h)ᴺ
  — Avec a = e^(−h) et b = 1 − h : u(t_N) − u_N = aᴺ − bᴺ. Factorise pour N = 2.  [juge equiv]  départ : a² − b²
    = (a − b)(□)   (trous : (a − b)(a + b))   ← aᴺ − bᴺ = (a − b)(a^(N−1) + a^(N−2)b + … + b^(N−1)) : N termes
  — |u(t_N) − u_N| ≤ N·h²/2 = (Nh)·h/2, avec Nh = T = 50. Ainsi |u(t_N) − u_N| ≤ C·h avec C =  [juge value]  départ : C
    = 50/2   ← Nh = T
    = □   (trous : 25)   ← C ne dépend ni de h ni de N
  aides : Écris les deux nombres comme des puissances N-ièmes, puis factorise aᴺ − bᴺ. | |aᴺ − bᴺ| ≤ |a − b|·(□ termes ≤ 1) | ≤ N·h²/2 = T·h/2 = 25h.

Erreur globale d'Euler progressif pour u′ = −u, u(0) = 1 sur [0 ; 20], h = 20/N. Écris le schéma, factorise a² − b², puis donne la constante C de la borne C·h.
  [guided]  u + h·(−u)
    = (□)u   (trous : (1 − h)u)   ← uₙ₊₁ = uₙ + h·(−uₙ) = (1 − h)uₙ, donc u_N = (1 − h)ᴺ
  — Avec a = e^(−h) et b = 1 − h : u(t_N) − u_N = aᴺ − bᴺ. Factorise pour N = 2.  [juge equiv]  départ : a² − b²
    = (a − b)(□)   (trous : (a − b)(a + b))   ← aᴺ − bᴺ = (a − b)(a^(N−1) + a^(N−2)b + … + b^(N−1)) : N termes
  — |u(t_N) − u_N| ≤ N·h²/2 = (Nh)·h/2, avec Nh = T = 20. Ainsi |u(t_N) − u_N| ≤ C·h avec C =  [juge value]  départ : C
    = 20/2   ← Nh = T
    = □   (trous : 10)   ← C ne dépend ni de h ni de N
  aides : Écris les deux nombres comme des puissances N-ièmes, puis factorise aᴺ − bᴺ. | |aᴺ − bᴺ| ≤ |a − b|·(□ termes ≤ 1) | ≤ N·h²/2 = T·h/2 = 10h.

Erreur globale d'Euler progressif pour u′ = −u, u(0) = 1 sur [0 ; 20], h = 20/N. Écris le schéma, factorise a² − b², puis donne la constante C de la borne C·h.
  [guided]  u + h·(−u)
    = (□)u   (trous : (1 − h)u)   ← uₙ₊₁ = uₙ + h·(−uₙ) = (1 − h)uₙ, donc u_N = (1 − h)ᴺ
  — Avec a = e^(−h) et b = 1 − h : u(t_N) − u_N = aᴺ − bᴺ. Factorise pour N = 2.  [juge equiv]  départ : a² − b²
    = (a − b)(□)   (trous : (a − b)(a + b))   ← aᴺ − bᴺ = (a − b)(a^(N−1) + a^(N−2)b + … + b^(N−1)) : N termes
  — |u(t_N) − u_N| ≤ N·h²/2 = (Nh)·h/2, avec Nh = T = 20. Ainsi |u(t_N) − u_N| ≤ C·h avec C =  [juge value]  départ : C
    = 20/2   ← Nh = T
    = □   (trous : 10)   ← C ne dépend ni de h ni de N
  aides : Écris les deux nombres comme des puissances N-ièmes, puis factorise aᴺ − bᴺ. | |aᴺ − bᴺ| ≤ |a − b|·(□ termes ≤ 1) | ≤ N·h²/2 = T·h/2 = 10h.

```

### Niveau 2

```
Erreur globale d'Euler progressif pour u′ = −u, u(0) = 1 sur [0 ; 50], h = 50/N. Factorise aᴺ − bᴺ pour N = 3 (a = e^(−h), b = 1 − h), puis donne la constante C de la borne C·h.
  [guided]  a³ − b³
    = (a − b)(□)   (trous : (a − b)(a² + ab + b²))   ← aᴺ − bᴺ = (a − b)(a^(N−1) + a^(N−2)b + … + b^(N−1)) : N termes
  — |u(t_N) − u_N| ≤ N·h²/2 = (Nh)·h/2, avec Nh = T = 50. Ainsi |u(t_N) − u_N| ≤ C·h avec C =  [juge value]  départ : C
    = 50/2   ← Nh = T
    = □   (trous : 25)   ← C ne dépend ni de h ni de N
  aides : Écris les deux nombres comme des puissances N-ièmes, puis factorise aᴺ − bᴺ. | |aᴺ − bᴺ| ≤ |a − b|·(□ termes ≤ 1) | ≤ N·h²/2 = T·h/2 = 25h.

Erreur globale d'Euler progressif pour u′ = −u, u(0) = 1 sur [0 ; 10], h = 10/N. Factorise aᴺ − bᴺ pour N = 4 (a = e^(−h), b = 1 − h), puis donne la constante C de la borne C·h.
  [guided]  a⁴ − b⁴
    = (a − b)(□)   (trous : (a − b)(a³ + a²b + ab² + b³))   ← aᴺ − bᴺ = (a − b)(a^(N−1) + a^(N−2)b + … + b^(N−1)) : N termes
  — |u(t_N) − u_N| ≤ N·h²/2 = (Nh)·h/2, avec Nh = T = 10. Ainsi |u(t_N) − u_N| ≤ C·h avec C =  [juge value]  départ : C
    = 10/2   ← Nh = T
    = □   (trous : 5)   ← C ne dépend ni de h ni de N
  aides : Écris les deux nombres comme des puissances N-ièmes, puis factorise aᴺ − bᴺ. | |aᴺ − bᴺ| ≤ |a − b|·(□ termes ≤ 1) | ≤ N·h²/2 = T·h/2 = 5h.

Erreur globale d'Euler progressif pour u′ = −u, u(0) = 1 sur [0 ; 20], h = 20/N. Factorise aᴺ − bᴺ pour N = 3 (a = e^(−h), b = 1 − h), puis donne la constante C de la borne C·h.
  [guided]  a³ − b³
    = (a − b)(□)   (trous : (a − b)(a² + ab + b²))   ← aᴺ − bᴺ = (a − b)(a^(N−1) + a^(N−2)b + … + b^(N−1)) : N termes
  — |u(t_N) − u_N| ≤ N·h²/2 = (Nh)·h/2, avec Nh = T = 20. Ainsi |u(t_N) − u_N| ≤ C·h avec C =  [juge value]  départ : C
    = 20/2   ← Nh = T
    = □   (trous : 10)   ← C ne dépend ni de h ni de N
  aides : Écris les deux nombres comme des puissances N-ièmes, puis factorise aᴺ − bᴺ. | |aᴺ − bᴺ| ≤ |a − b|·(□ termes ≤ 1) | ≤ N·h²/2 = T·h/2 = 10h.

```

### Niveau 3

```
Euler progressif pour u′ = −u, u(0) = 1 sur [0 ; 1] (T = 1) : erreur |u(1) − u_N| et borne T·h/2.
  [tableau à lire]
    N | h | erreur | h/2
    10 | 0.1 | 1.920e-02 | 5.000e-02
    20 | 0.05 | 9.394e-03 | 2.500e-02
    40 | 0.025 | 4.647e-03 | 1.250e-02
    80 | 0.0125 | 2.311e-03 | 6.250e-03
  question : Que montre ce tableau ? Une ou plusieurs réponses justes.
      · L'erreur globale est d'ordre 2, comme l'erreur locale h²/2 [n_global_error_order]   ✔ La borne T·h/2 est respectée   ✔ L'erreur globale est d'ordre 1 : divisée par 2 quand h est divisé par 2   · La borne n'est pas respectée pour h = 0,1
      pièges : n_global_error_order
  pièges : n_global_error_order

Euler progressif pour u′ = −u, u(0) = 1 sur [0 ; 1] (T = 1) : erreur |u(1) − u_N| et borne T·h/2.
  [tableau à lire]
    N | h | erreur | h/2
    10 | 0.1 | 1.920e-02 | 5.000e-02
    20 | 0.05 | 9.394e-03 | 2.500e-02
    40 | 0.025 | 4.647e-03 | 1.250e-02
    80 | 0.0125 | 2.311e-03 | 6.250e-03
  question : Que montre ce tableau ? Une ou plusieurs réponses justes.
      · L'erreur globale est d'ordre 2, comme l'erreur locale h²/2 [n_global_error_order]   · La borne n'est pas respectée pour h = 0,1   ✔ L'erreur globale est d'ordre 1 : divisée par 2 quand h est divisé par 2   ✔ La borne T·h/2 est respectée
      pièges : n_global_error_order
  pièges : n_global_error_order

Euler progressif pour u′ = −u, u(0) = 1 sur [0 ; 1] (T = 1) : erreur |u(1) − u_N| et borne T·h/2.
  [tableau à lire]
    N | h | erreur | h/2
    10 | 0.1 | 1.920e-02 | 5.000e-02
    20 | 0.05 | 9.394e-03 | 2.500e-02
    40 | 0.025 | 4.647e-03 | 1.250e-02
    80 | 0.0125 | 2.311e-03 | 6.250e-03
  question : Que montre ce tableau ? Une ou plusieurs réponses justes.
      ✔ La borne T·h/2 est respectée   · La borne n'est pas respectée pour h = 0,1   · L'erreur globale est d'ordre 2, comme l'erreur locale h²/2 [n_global_error_order]   ✔ L'erreur globale est d'ordre 1 : divisée par 2 quand h est divisé par 2
      pièges : n_global_error_order
  pièges : n_global_error_order

```

### Niveau 4

```
u′ = −u, u(0) = 1 sur [0 ; 10], Euler progressif avec h = 10/N, 0 < h ≤ 2. Montre que |u(t_N) − u_N| ≤ 5h : touche les blocs de la preuve dans l'ordre. Attention aux blocs faux.
  [blocs order]
    1. u_N = (1 − h)ᴺ et u(t_N) = e^(−Nh) : u(t_N) − u_N = aᴺ − bᴺ, avec a = e^(−h), b = 1 − h
    2. Taylor-Lagrange : e^(−h) = 1 − h + e^(−ξ)h²/2 avec ξ ∈ ]0 ; h[, donc |a − b| ≤ h²/2
    3. aᴺ − bᴺ = (a − b)·Σₖ a^(N−1−k)bᵏ (N termes)
    4. |a| = e^(−h) ≤ 1, et |b| = |1 − h| ≤ 1 car 0 < h ≤ 2
    5. Inégalité triangulaire : |Σₖ a^(N−1−k)bᵏ| ≤ N
    6. |u(t_N) − u_N| ≤ N·h²/2 = T·h/2 = 5h
    ✗ |1 − h| ≤ 1 pour tout h > 0 [n_h_le_2_forgotten]
    ✗ L'erreur locale est h²/2, donc l'erreur globale est O(h²) [n_global_error_order]
    ✗ |aᴺ − bᴺ| ≤ |a − b| ≤ h²/2 [n_euler_ineq_bound]
  pièges : n_h_le_2_forgotten, n_global_error_order, n_euler_ineq_bound

u′ = −u, u(0) = 1 sur [0 ; 100], Euler progressif avec h = 100/N, 0 < h ≤ 2. Montre que |u(t_N) − u_N| ≤ 50h : touche les blocs de la preuve dans l'ordre. Attention aux blocs faux.
  [blocs order]
    1. u_N = (1 − h)ᴺ et u(t_N) = e^(−Nh) : u(t_N) − u_N = aᴺ − bᴺ, avec a = e^(−h), b = 1 − h
    2. Taylor-Lagrange : e^(−h) = 1 − h + e^(−ξ)h²/2 avec ξ ∈ ]0 ; h[, donc |a − b| ≤ h²/2
    3. aᴺ − bᴺ = (a − b)·Σₖ a^(N−1−k)bᵏ (N termes)
    4. |a| = e^(−h) ≤ 1, et |b| = |1 − h| ≤ 1 car 0 < h ≤ 2
    5. Inégalité triangulaire : |Σₖ a^(N−1−k)bᵏ| ≤ N
    6. |u(t_N) − u_N| ≤ N·h²/2 = T·h/2 = 50h
    ✗ |aᴺ − bᴺ| ≤ |a − b| ≤ h²/2 [n_euler_ineq_bound]
    ✗ |1 − h| ≤ 1 pour tout h > 0 [n_h_le_2_forgotten]
    ✗ L'erreur locale est h²/2, donc l'erreur globale est O(h²) [n_global_error_order]
  pièges : n_euler_ineq_bound, n_h_le_2_forgotten, n_global_error_order

u′ = −u, u(0) = 1 sur [0 ; 100], Euler progressif avec h = 100/N, 0 < h ≤ 2. Montre que |u(t_N) − u_N| ≤ 50h : touche les blocs de la preuve dans l'ordre. Attention aux blocs faux.
  [blocs order]
    1. u_N = (1 − h)ᴺ et u(t_N) = e^(−Nh) : u(t_N) − u_N = aᴺ − bᴺ, avec a = e^(−h), b = 1 − h
    2. Taylor-Lagrange : e^(−h) = 1 − h + e^(−ξ)h²/2 avec ξ ∈ ]0 ; h[, donc |a − b| ≤ h²/2
    3. aᴺ − bᴺ = (a − b)·Σₖ a^(N−1−k)bᵏ (N termes)
    4. |a| = e^(−h) ≤ 1, et |b| = |1 − h| ≤ 1 car 0 < h ≤ 2
    5. Inégalité triangulaire : |Σₖ a^(N−1−k)bᵏ| ≤ N
    6. |u(t_N) − u_N| ≤ N·h²/2 = T·h/2 = 50h
    ✗ |aᴺ − bᴺ| ≤ |a − b| ≤ h²/2 [n_euler_ineq_bound]
    ✗ |1 − h| ≤ 1 pour tout h > 0 [n_h_le_2_forgotten]
    ✗ L'erreur locale est h²/2, donc l'erreur globale est O(h²) [n_global_error_order]
  pièges : n_euler_ineq_bound, n_h_le_2_forgotten, n_global_error_order

```

### Niveau 5

```
Soit u′ = −u sur ]0 ; 10], u(0) = 1, h = 10/N, tₙ = nh, et Euler progressif. Montre que |u(t_N) − u_N| ≤ 5h pour 0 < h ≤ 2.
  [problème, 5 points]
  partie 1 ((a) Le schéma : 0,5)
  (a) Écris un pas du schéma : uₙ₊₁ = uₙ + h·(−uₙ) = ?
    [free, sans aide, suivre l'erreur]  u + h·(−u)
      = (1 − h)u   ← uₙ₊₁ = uₙ + h·(−uₙ) = (1 − h)uₙ, donc u_N = (1 − h)ᴺ
  partie 2 ((b) Le lemme : 1)
  (b) Montre que |e^(−x) − (1 − x)| ≤ x²/2 pour x > 0 : touche les blocs dans l'ordre.
    [blocs order, sans aide]
      1. Taylor-Lagrange en 0 : e^(−x) = 1 − x + e^(−ξ)·x²/2, avec ξ ∈ ]0 ; x[
      2. 0 < e^(−ξ) ≤ 1, car ξ > 0
      3. Donc |e^(−x) − (1 − x)| = e^(−ξ)·x²/2 ≤ x²/2
  partie 3 ((c) Factoriser aᴺ − bᴺ : 2)
  (c) Avec a = e^(−h) et b = 1 − h, u(t_N) − u_N = aᴺ − bᴺ. Factorise a³ − b³ (le cas N = 3 du produit (a − b)·Σ a^(N−1−k)bᵏ).
    [free, sans aide, suivre l'erreur]  a³ − b³
      = (a − b)(a² + ab + b²)   ← aᴺ − bᴺ = (a − b)(a^(N−1) + a^(N−2)b + … + b^(N−1)) : N termes
  partie 4 ((d) Majorer : 1,5)
  (d) Déduis-en |u(t_N) − u_N| ≤ 5h pour 0 < h ≤ 2 : touche les blocs dans l'ordre. Attention aux blocs faux.
    [blocs order, sans aide]
      1. |a| = e^(−h) ≤ 1
      2. |b| = |1 − h| ≤ 1, car 0 < h ≤ 2
      3. |Σₖ a^(N−1−k)bᵏ| ≤ N : N termes de module ≤ 1
      4. |u(t_N) − u_N| ≤ N·|a − b| ≤ N·h²/2 = 10h/2 = 5h
      ✗ |1 − h| ≤ 1 pour tout h > 0 [n_h_le_2_forgotten]
      ✗ |aᴺ − bᴺ| ≤ |a − b| ≤ h²/2 [n_euler_ineq_bound]
  pièges : n_h_le_2_forgotten, n_euler_ineq_bound

Soit u′ = −u sur ]0 ; 10], u(0) = 1, h = 10/N, tₙ = nh, et Euler progressif. Montre que |u(t_N) − u_N| ≤ 5h pour 0 < h ≤ 2.
  [problème, 5 points]
  partie 1 ((a) Le schéma : 0,5)
  (a) Écris un pas du schéma : uₙ₊₁ = uₙ + h·(−uₙ) = ?
    [free, sans aide, suivre l'erreur]  u + h·(−u)
      = (1 − h)u   ← uₙ₊₁ = uₙ + h·(−uₙ) = (1 − h)uₙ, donc u_N = (1 − h)ᴺ
  partie 2 ((b) Le lemme : 1)
  (b) Montre que |e^(−x) − (1 − x)| ≤ x²/2 pour x > 0 : touche les blocs dans l'ordre.
    [blocs order, sans aide]
      1. Taylor-Lagrange en 0 : e^(−x) = 1 − x + e^(−ξ)·x²/2, avec ξ ∈ ]0 ; x[
      2. 0 < e^(−ξ) ≤ 1, car ξ > 0
      3. Donc |e^(−x) − (1 − x)| = e^(−ξ)·x²/2 ≤ x²/2
  partie 3 ((c) Factoriser aᴺ − bᴺ : 2)
  (c) Avec a = e^(−h) et b = 1 − h, u(t_N) − u_N = aᴺ − bᴺ. Factorise a³ − b³ (le cas N = 3 du produit (a − b)·Σ a^(N−1−k)bᵏ).
    [free, sans aide, suivre l'erreur]  a³ − b³
      = (a − b)(a² + ab + b²)   ← aᴺ − bᴺ = (a − b)(a^(N−1) + a^(N−2)b + … + b^(N−1)) : N termes
  partie 4 ((d) Majorer : 1,5)
  (d) Déduis-en |u(t_N) − u_N| ≤ 5h pour 0 < h ≤ 2 : touche les blocs dans l'ordre. Attention aux blocs faux.
    [blocs order, sans aide]
      1. |a| = e^(−h) ≤ 1
      2. |b| = |1 − h| ≤ 1, car 0 < h ≤ 2
      3. |Σₖ a^(N−1−k)bᵏ| ≤ N : N termes de module ≤ 1
      4. |u(t_N) − u_N| ≤ N·|a − b| ≤ N·h²/2 = 10h/2 = 5h
      ✗ |1 − h| ≤ 1 pour tout h > 0 [n_h_le_2_forgotten]
      ✗ |aᴺ − bᴺ| ≤ |a − b| ≤ h²/2 [n_euler_ineq_bound]
  pièges : n_h_le_2_forgotten, n_euler_ineq_bound

Soit u′ = −u sur ]0 ; 10], u(0) = 1, h = 10/N, tₙ = nh, et Euler progressif. Montre que |u(t_N) − u_N| ≤ 5h pour 0 < h ≤ 2.
  [problème, 5 points]
  partie 1 ((a) Le schéma : 0,5)
  (a) Écris un pas du schéma : uₙ₊₁ = uₙ + h·(−uₙ) = ?
    [free, sans aide, suivre l'erreur]  u + h·(−u)
      = (1 − h)u   ← uₙ₊₁ = uₙ + h·(−uₙ) = (1 − h)uₙ, donc u_N = (1 − h)ᴺ
  partie 2 ((b) Le lemme : 1)
  (b) Montre que |e^(−x) − (1 − x)| ≤ x²/2 pour x > 0 : touche les blocs dans l'ordre.
    [blocs order, sans aide]
      1. Taylor-Lagrange en 0 : e^(−x) = 1 − x + e^(−ξ)·x²/2, avec ξ ∈ ]0 ; x[
      2. 0 < e^(−ξ) ≤ 1, car ξ > 0
      3. Donc |e^(−x) − (1 − x)| = e^(−ξ)·x²/2 ≤ x²/2
  partie 3 ((c) Factoriser aᴺ − bᴺ : 2)
  (c) Avec a = e^(−h) et b = 1 − h, u(t_N) − u_N = aᴺ − bᴺ. Factorise a³ − b³ (le cas N = 3 du produit (a − b)·Σ a^(N−1−k)bᵏ).
    [free, sans aide, suivre l'erreur]  a³ − b³
      = (a − b)(a² + ab + b²)   ← aᴺ − bᴺ = (a − b)(a^(N−1) + a^(N−2)b + … + b^(N−1)) : N termes
  partie 4 ((d) Majorer : 1,5)
  (d) Déduis-en |u(t_N) − u_N| ≤ 5h pour 0 < h ≤ 2 : touche les blocs dans l'ordre. Attention aux blocs faux.
    [blocs order, sans aide]
      1. |a| = e^(−h) ≤ 1
      2. |b| = |1 − h| ≤ 1, car 0 < h ≤ 2
      3. |Σₖ a^(N−1−k)bᵏ| ≤ N : N termes de module ≤ 1
      4. |u(t_N) − u_N| ≤ N·|a − b| ≤ N·h²/2 = 10h/2 = 5h
      ✗ |aᴺ − bᴺ| ≤ |a − b| ≤ h²/2 [n_euler_ineq_bound]
      ✗ |1 − h| ≤ 1 pour tout h > 0 [n_h_le_2_forgotten]
  pièges : n_euler_ineq_bound, n_h_le_2_forgotten

```

### Variantes d'examen

```
Vrai ou faux ?
  « Pour tout pas h > 0, |1 − h| ≤ 1. » → FAUX
    contre-exemple (num) : h = 3
  [examen tf]

Soit u′ = −u sur ]0 ; 20], u(0) = 1, h = 20/N, tₙ = nh, et Euler progressif. Montre que |u(t_N) − u_N| ≤ 10h pour 0 < h ≤ 2.
  [problème, examen open, 4 points]
  partie 1 ((a) Le schéma : 0,5)
  (a) Écris un pas du schéma : uₙ₊₁ = uₙ + h·(−uₙ) = ?
    [free, sans aide, suivre l'erreur]  u + h·(−u)
      = (1 − h)u   ← uₙ₊₁ = uₙ + h·(−uₙ) = (1 − h)uₙ, donc u_N = (1 − h)ᴺ
  partie 2 ((b) Le lemme : 1)
  (b) Montre que |e^(−x) − (1 − x)| ≤ x²/2 pour x > 0 : touche les blocs dans l'ordre.
    [blocs order, sans aide]
      1. Taylor-Lagrange en 0 : e^(−x) = 1 − x + e^(−ξ)·x²/2, avec ξ ∈ ]0 ; x[
      2. 0 < e^(−ξ) ≤ 1, car ξ > 0
      3. Donc |e^(−x) − (1 − x)| = e^(−ξ)·x²/2 ≤ x²/2
  partie 3 ((c) Factoriser aᴺ − bᴺ : 1,5)
  (c) Avec a = e^(−h) et b = 1 − h, u(t_N) − u_N = aᴺ − bᴺ. Factorise a³ − b³ (le cas N = 3 du produit (a − b)·Σ a^(N−1−k)bᵏ).
    [free, sans aide, suivre l'erreur]  a³ − b³
      = (a − b)(a² + ab + b²)   ← aᴺ − bᴺ = (a − b)(a^(N−1) + a^(N−2)b + … + b^(N−1)) : N termes
  partie 4 ((d) Majorer : 1)
  (d) Déduis-en |u(t_N) − u_N| ≤ 10h pour 0 < h ≤ 2 : touche les blocs dans l'ordre. Attention aux blocs faux.
    [blocs order, sans aide]
      1. |a| = e^(−h) ≤ 1
      2. |b| = |1 − h| ≤ 1, car 0 < h ≤ 2
      3. |Σₖ a^(N−1−k)bᵏ| ≤ N : N termes de module ≤ 1
      4. |u(t_N) − u_N| ≤ N·|a − b| ≤ N·h²/2 = 20h/2 = 10h
      ✗ |1 − h| ≤ 1 pour tout h > 0 [n_h_le_2_forgotten]
      ✗ |aᴺ − bᴺ| ≤ |a − b| ≤ h²/2 [n_euler_ineq_bound]
  pièges : n_h_le_2_forgotten, n_euler_ineq_bound

```

## Euler implicite sur un système, avec un pas de Newton (`n-ode-implicit-newton`, BA4)

_Écrire le système de chaque pas implicite, puis le résoudre par Newton._

### Niveau 1

```
Euler rétrograde pour u₁′ = −u₂⁴·u₁, u₂′ = −u₁⁴·u₂, avec h = 0,1 et uⁿ = (2 ; 1). Les inconnues x = (x ; y) = uⁿ⁺¹ vérifient f(x) = 0, résolu par un pas de Newton depuis x⁽⁰⁾ = uⁿ.
  [guided]  J
    (f₁(x, y) = x − 2 + 0,1·y⁴·x ; f₂(x, y) = y − 1 + 0,1·x⁴·y.)
    (La jacobienne de f en x⁽⁰⁾ = (2 ; 1) :)
    = [[11/10,4/5],[16/5,13/5]]   (cases à remplir : (1,1) (1,2))   ← ∂fᵢ/∂x, ∂fᵢ/∂y, évaluées en uⁿ
  — Résous J·δ = F, puis x⁽¹⁾ = x⁽⁰⁾ − δ :  [juge mat]  départ : x
    = (68/15 ; -41/15)   (cases à remplir : (1,1))   ← δ = (−38/15 ; 56/15)
  aides : Ligne i de J : les dérivées de fᵢ par rapport à x, puis à y, en x⁽⁰⁾ = uⁿ. | J = [[1 + 0,1·g(1), □], [□, 1 + 0,1·g(2)]] | J = [[11/10, 4/5], [16/5, 13/5]], δ = (−38/15 ; 56/15), x⁽¹⁾ = (68/15 ; −41/15).

Euler rétrograde pour u₁′ = −u₂²·u₁, u₂′ = −u₁²·u₂, avec h = 1 et uⁿ = (2 ; 1). Les inconnues x = (x ; y) = uⁿ⁺¹ vérifient f(x) = 0, résolu par un pas de Newton depuis x⁽⁰⁾ = uⁿ.
  [guided]  J
    (f₁(x, y) = x − 2 + 1·y²·x ; f₂(x, y) = y − 1 + 1·x²·y.)
    (La jacobienne de f en x⁽⁰⁾ = (2 ; 1) :)
    = [[2,4],[4,5]]   (cases à remplir : (1,1) (1,2))   ← ∂fᵢ/∂x, ∂fᵢ/∂y, évaluées en uⁿ
  — Résous J·δ = F, puis x⁽¹⁾ = x⁽⁰⁾ − δ :  [juge mat]  départ : x
    = (1 ; 1)   (cases à remplir : (1,1))   ← δ = (1 ; 0)
  aides : Ligne i de J : les dérivées de fᵢ par rapport à x, puis à y, en x⁽⁰⁾ = uⁿ. | J = [[1 + 1·g(1), □], [□, 1 + 1·g(2)]] | J = [[2, 4], [4, 5]], δ = (1 ; 0), x⁽¹⁾ = (1 ; 1).

Euler rétrograde pour u₁′ = −u₂²·u₁, u₂′ = −u₁²·u₂, avec h = 0,5 et uⁿ = (1 ; 2). Les inconnues x = (x ; y) = uⁿ⁺¹ vérifient f(x) = 0, résolu par un pas de Newton depuis x⁽⁰⁾ = uⁿ.
  [guided]  J
    (f₁(x, y) = x − 1 + 0,5·y²·x ; f₂(x, y) = y − 2 + 0,5·x²·y.)
    (La jacobienne de f en x⁽⁰⁾ = (1 ; 2) :)
    = [[3,2],[2,3/2]]   (cases à remplir : (1,1) (1,2))   ← ∂fᵢ/∂x, ∂fᵢ/∂y, évaluées en uⁿ
  — Résous J·δ = F, puis x⁽¹⁾ = x⁽⁰⁾ − δ :  [juge mat]  départ : x
    = (-1 ; 4)   (cases à remplir : (1,1))   ← δ = (2 ; −2)
  aides : Ligne i de J : les dérivées de fᵢ par rapport à x, puis à y, en x⁽⁰⁾ = uⁿ. | J = [[1 + 0,5·g(2), □], [□, 1 + 0,5·g(1)]] | J = [[3, 2], [2, 3/2]], δ = (2 ; −2), x⁽¹⁾ = (−1 ; 4).

```

### Niveau 2

```
Euler rétrograde pour u₁′ = −u₂²·u₁, u₂′ = −u₁²·u₂, avec h = 0,1 et uⁿ = (1 ; 1). Les inconnues x = (x ; y) = uⁿ⁺¹ vérifient f(x) = 0, résolu par un pas de Newton depuis x⁽⁰⁾ = uⁿ. Écris f₁ et f₂, puis fais le pas de Newton.
  [guided]  x − 1 − 1/10·(−y²·x)
    (Le schéma : x = u₁ⁿ + h·(−g(y)·x), donc f₁(x, y) = x − u₁ⁿ − h·(−g(y)·x).)
    = x − 1 + □   (trous : x − 1 + 1/10·y²·x)   ← f₁ simplifiée
  — De même, f₂ :  [juge equiv]  départ : y − 1 − 1/10·(−x²·y)
    = y − 1 + □   (trous : y − 1 + 1/10·x²·y)   ← f₂ simplifiée
  — La jacobienne de f en x⁽⁰⁾ = (1 ; 1) :  [juge mat]  départ : J
    = [[11/10,1/5],[1/5,11/10]]   (cases à remplir : (1,1) (1,2))   ← ∂fᵢ/∂x, ∂fᵢ/∂y, évaluées en uⁿ
  — Résous J·δ = F, puis x⁽¹⁾ = x⁽⁰⁾ − δ :  [juge mat]  départ : x
    = (12/13 ; 12/13)   (cases à remplir : (1,1))   ← δ = (1/13 ; 1/13)
  aides : Ligne i de J : les dérivées de fᵢ par rapport à x, puis à y, en x⁽⁰⁾ = uⁿ. | J = [[1 + 0,1·g(1), □], [□, 1 + 0,1·g(1)]] | J = [[11/10, 1/5], [1/5, 11/10]], δ = (1/13 ; 1/13), x⁽¹⁾ = (12/13 ; 12/13).

Euler rétrograde pour u₁′ = −(1 + u₂²)·u₁, u₂′ = −(1 + u₁²)·u₂, avec h = 1 et uⁿ = (1 ; 1). Les inconnues x = (x ; y) = uⁿ⁺¹ vérifient f(x) = 0, résolu par un pas de Newton depuis x⁽⁰⁾ = uⁿ. Écris f₁ et f₂, puis fais le pas de Newton.
  [guided]  x − 1 − 1·(−(1 + y²)·x)
    (Le schéma : x = u₁ⁿ + h·(−g(y)·x), donc f₁(x, y) = x − u₁ⁿ − h·(−g(y)·x).)
    = x − 1 + □   (trous : x − 1 + 1·(1 + y²)·x)   ← f₁ simplifiée
  — De même, f₂ :  [juge equiv]  départ : y − 1 − 1·(−(1 + x²)·y)
    = y − 1 + □   (trous : y − 1 + 1·(1 + x²)·y)   ← f₂ simplifiée
  — La jacobienne de f en x⁽⁰⁾ = (1 ; 1) :  [juge mat]  départ : J
    = [[3,2],[2,3]]   (cases à remplir : (1,1) (1,2))   ← ∂fᵢ/∂x, ∂fᵢ/∂y, évaluées en uⁿ
  — Résous J·δ = F, puis x⁽¹⁾ = x⁽⁰⁾ − δ :  [juge mat]  départ : x
    = (3/5 ; 3/5)   (cases à remplir : (1,1))   ← δ = (2/5 ; 2/5)
  aides : Ligne i de J : les dérivées de fᵢ par rapport à x, puis à y, en x⁽⁰⁾ = uⁿ. | J = [[1 + 1·g(1), □], [□, 1 + 1·g(1)]] | J = [[3, 2], [2, 3]], δ = (2/5 ; 2/5), x⁽¹⁾ = (3/5 ; 3/5).

Euler rétrograde pour u₁′ = −u₂²·u₁, u₂′ = −u₁²·u₂, avec h = 1 et uⁿ = (1 ; 2). Les inconnues x = (x ; y) = uⁿ⁺¹ vérifient f(x) = 0, résolu par un pas de Newton depuis x⁽⁰⁾ = uⁿ. Écris f₁ et f₂, puis fais le pas de Newton.
  [guided]  x − 1 − 1·(−y²·x)
    (Le schéma : x = u₁ⁿ + h·(−g(y)·x), donc f₁(x, y) = x − u₁ⁿ − h·(−g(y)·x).)
    = x − 1 + □   (trous : x − 1 + 1·y²·x)   ← f₁ simplifiée
  — De même, f₂ :  [juge equiv]  départ : y − 2 − 1·(−x²·y)
    = y − 2 + □   (trous : y − 2 + 1·x²·y)   ← f₂ simplifiée
  — La jacobienne de f en x⁽⁰⁾ = (1 ; 2) :  [juge mat]  départ : J
    = [[5,4],[4,2]]   (cases à remplir : (1,1) (1,2))   ← ∂fᵢ/∂x, ∂fᵢ/∂y, évaluées en uⁿ
  — Résous J·δ = F, puis x⁽¹⁾ = x⁽⁰⁾ − δ :  [juge mat]  départ : x
    = (1 ; 1)   (cases à remplir : (1,1))   ← δ = (0 ; 1)
  aides : Ligne i de J : les dérivées de fᵢ par rapport à x, puis à y, en x⁽⁰⁾ = uⁿ. | J = [[1 + 1·g(2), □], [□, 1 + 1·g(1)]] | J = [[5, 4], [4, 2]], δ = (0 ; 1), x⁽¹⁾ = (1 ; 1).

```

### Niveau 3

```
Euler rétrograde pour u₁′ = −u₂⁴·u₁, u₂′ = −u₁⁴·u₂, avec h = 1 et uⁿ = (1 ; 1). Les inconnues x = (x ; y) = uⁿ⁺¹ vérifient f(x) = 0, résolu par un pas de Newton depuis x⁽⁰⁾ = uⁿ.
  [tap, suivre l'erreur]  J
    (f₁(x, y) = x − 1 + 1·y⁴·x ; f₂(x, y) = y − 1 + 1·x⁴·y.)
    ? Quel système résout-on à chaque pas d'Euler rétrograde ? ✔ f₁(x, y) = x − 1 + 1·y⁴·x, f₂(x, y) = y − 1 + 1·x⁴·y / · f₁(x, y) = x − 1 + 1·1⁴·x, f₂(x, y) = y − 1 + 1·1⁴·y / · f₁ = u₁ⁿ⁺¹ − u₁ⁿ + h·(u₂ⁿ⁺¹)²u₁ⁿ⁺¹, écrit en uⁿ⁺¹ sans inconnues nommées
    (La jacobienne de f en x⁽⁰⁾ = (1 ; 1) :)
    = [[2,4],[4,2]]   ← ∂fᵢ/∂x, ∂fᵢ/∂y, évaluées en uⁿ
  — Résous J·δ = F, puis x⁽¹⁾ = x⁽⁰⁾ − δ :  [juge mat]  départ : x
    = (5/6 ; 5/6)   ← δ = (1/6 ; 1/6)
  aides : Ligne i de J : les dérivées de fᵢ par rapport à x, puis à y, en x⁽⁰⁾ = uⁿ. | J = [[1 + 1·g(1), □], [□, 1 + 1·g(1)]] | J = [[2, 4], [4, 2]], δ = (1/6 ; 1/6), x⁽¹⁾ = (5/6 ; 5/6).
  pièges : n_implicit_as_explicit

Euler rétrograde pour u₁′ = −u₂⁴·u₁, u₂′ = −u₁⁴·u₂, avec h = 0,1 et uⁿ = (1 ; 1). Les inconnues x = (x ; y) = uⁿ⁺¹ vérifient f(x) = 0, résolu par un pas de Newton depuis x⁽⁰⁾ = uⁿ.
  [tap, suivre l'erreur]  J
    (f₁(x, y) = x − 1 + 0,1·y⁴·x ; f₂(x, y) = y − 1 + 0,1·x⁴·y.)
    ? Quel système résout-on à chaque pas d'Euler rétrograde ? ✔ f₁(x, y) = x − 1 + 0,1·y⁴·x, f₂(x, y) = y − 1 + 0,1·x⁴·y / · f₁(x, y) = x − 1 + 0,1·1⁴·x, f₂(x, y) = y − 1 + 0,1·1⁴·y / · f₁ = u₁ⁿ⁺¹ − u₁ⁿ + h·(u₂ⁿ⁺¹)²u₁ⁿ⁺¹, écrit en uⁿ⁺¹ sans inconnues nommées
    (La jacobienne de f en x⁽⁰⁾ = (1 ; 1) :)
    = [[11/10,2/5],[2/5,11/10]]   ← ∂fᵢ/∂x, ∂fᵢ/∂y, évaluées en uⁿ
  — Résous J·δ = F, puis x⁽¹⁾ = x⁽⁰⁾ − δ :  [juge mat]  départ : x
    = (14/15 ; 14/15)   ← δ = (1/15 ; 1/15)
  aides : Ligne i de J : les dérivées de fᵢ par rapport à x, puis à y, en x⁽⁰⁾ = uⁿ. | J = [[1 + 0,1·g(1), □], [□, 1 + 0,1·g(1)]] | J = [[11/10, 2/5], [2/5, 11/10]], δ = (1/15 ; 1/15), x⁽¹⁾ = (14/15 ; 14/15).
  pièges : n_implicit_as_explicit

Euler rétrograde pour u₁′ = −u₂⁴·u₁, u₂′ = −u₁⁴·u₂, avec h = 1 et uⁿ = (1 ; 1). Les inconnues x = (x ; y) = uⁿ⁺¹ vérifient f(x) = 0, résolu par un pas de Newton depuis x⁽⁰⁾ = uⁿ.
  [tap, suivre l'erreur]  J
    (f₁(x, y) = x − 1 + 1·y⁴·x ; f₂(x, y) = y − 1 + 1·x⁴·y.)
    ? Quel système résout-on à chaque pas d'Euler rétrograde ? · f₁ = u₁ⁿ⁺¹ − u₁ⁿ + h·(u₂ⁿ⁺¹)²u₁ⁿ⁺¹, écrit en uⁿ⁺¹ sans inconnues nommées / · f₁(x, y) = x − 1 + 1·1⁴·x, f₂(x, y) = y − 1 + 1·1⁴·y / ✔ f₁(x, y) = x − 1 + 1·y⁴·x, f₂(x, y) = y − 1 + 1·x⁴·y
    (La jacobienne de f en x⁽⁰⁾ = (1 ; 1) :)
    = [[2,4],[4,2]]   ← ∂fᵢ/∂x, ∂fᵢ/∂y, évaluées en uⁿ
  — Résous J·δ = F, puis x⁽¹⁾ = x⁽⁰⁾ − δ :  [juge mat]  départ : x
    = (5/6 ; 5/6)   ← δ = (1/6 ; 1/6)
  aides : Ligne i de J : les dérivées de fᵢ par rapport à x, puis à y, en x⁽⁰⁾ = uⁿ. | J = [[1 + 1·g(1), □], [□, 1 + 1·g(1)]] | J = [[2, 4], [4, 2]], δ = (1/6 ; 1/6), x⁽¹⁾ = (5/6 ; 5/6).
  pièges : n_implicit_as_explicit

```

### Niveau 4

```
Euler rétrograde pour u₁′ = −u₂²·u₁, u₂′ = −u₁²·u₂, avec h = 1 et uⁿ = (2 ; 1). Les inconnues x = (x ; y) = uⁿ⁺¹ vérifient f(x) = 0, résolu par un pas de Newton depuis x⁽⁰⁾ = uⁿ.
  [free, suivre l'erreur]  J
    (f₁(x, y) = x − 2 + 1·y²·x ; f₂(x, y) = y − 1 + 1·x²·y.)
    (La jacobienne de f en x⁽⁰⁾ = (2 ; 1) :)
    = [[2,4],[4,5]]   ← ∂fᵢ/∂x, ∂fᵢ/∂y, évaluées en uⁿ
  — F(x⁽⁰⁾) = (f₁(uⁿ) ; f₂(uⁿ)) :  [juge mat]  départ : F
    = (2 ; 4)   ← x = uⁿ : il reste h·g(·)·uᵢⁿ
  — Résous J·δ = F, puis x⁽¹⁾ = x⁽⁰⁾ − δ :  [juge mat]  départ : x
    = (1 ; 1)   ← δ = (1 ; 0)
  aides : Ligne i de J : les dérivées de fᵢ par rapport à x, puis à y, en x⁽⁰⁾ = uⁿ. | J = [[1 + 1·g(1), □], [□, 1 + 1·g(2)]] | J = [[2, 4], [4, 5]], δ = (1 ; 0), x⁽¹⁾ = (1 ; 1).

Euler rétrograde pour u₁′ = −u₂²·u₁, u₂′ = −u₁²·u₂, avec h = 1 et uⁿ = (1 ; 2). Les inconnues x = (x ; y) = uⁿ⁺¹ vérifient f(x) = 0, résolu par un pas de Newton depuis x⁽⁰⁾ = uⁿ.
  [free, suivre l'erreur]  J
    (f₁(x, y) = x − 1 + 1·y²·x ; f₂(x, y) = y − 2 + 1·x²·y.)
    (La jacobienne de f en x⁽⁰⁾ = (1 ; 2) :)
    = [[5,4],[4,2]]   ← ∂fᵢ/∂x, ∂fᵢ/∂y, évaluées en uⁿ
  — F(x⁽⁰⁾) = (f₁(uⁿ) ; f₂(uⁿ)) :  [juge mat]  départ : F
    = (4 ; 2)   ← x = uⁿ : il reste h·g(·)·uᵢⁿ
  — Résous J·δ = F, puis x⁽¹⁾ = x⁽⁰⁾ − δ :  [juge mat]  départ : x
    = (1 ; 1)   ← δ = (0 ; 1)
  aides : Ligne i de J : les dérivées de fᵢ par rapport à x, puis à y, en x⁽⁰⁾ = uⁿ. | J = [[1 + 1·g(2), □], [□, 1 + 1·g(1)]] | J = [[5, 4], [4, 2]], δ = (0 ; 1), x⁽¹⁾ = (1 ; 1).

Euler rétrograde pour u₁′ = −u₂²·u₁, u₂′ = −u₁²·u₂, avec h = 0,1 et uⁿ = (1 ; 2). Les inconnues x = (x ; y) = uⁿ⁺¹ vérifient f(x) = 0, résolu par un pas de Newton depuis x⁽⁰⁾ = uⁿ.
  [free, suivre l'erreur]  J
    (f₁(x, y) = x − 1 + 0,1·y²·x ; f₂(x, y) = y − 2 + 0,1·x²·y.)
    (La jacobienne de f en x⁽⁰⁾ = (1 ; 2) :)
    = [[7/5,2/5],[2/5,11/10]]   ← ∂fᵢ/∂x, ∂fᵢ/∂y, évaluées en uⁿ
  — F(x⁽⁰⁾) = (f₁(uⁿ) ; f₂(uⁿ)) :  [juge mat]  départ : F
    = (2/5 ; 1/5)   ← x = uⁿ : il reste h·g(·)·uᵢⁿ
  — Résous J·δ = F, puis x⁽¹⁾ = x⁽⁰⁾ − δ :  [juge mat]  départ : x
    = (17/23 ; 44/23)   ← δ = (6/23 ; 2/23)
  aides : Ligne i de J : les dérivées de fᵢ par rapport à x, puis à y, en x⁽⁰⁾ = uⁿ. | J = [[1 + 0,1·g(2), □], [□, 1 + 0,1·g(1)]] | J = [[7/5, 2/5], [2/5, 11/10]], δ = (6/23 ; 2/23), x⁽¹⁾ = (17/23 ; 44/23).

```

### Niveau 5

```
Complète un pas de Newton pour Euler rétrograde sur u₁′ = −u₂²u₁, u₂′ = −u₁²u₂ (les inconnues x1, x2 partent de uⁿ). solve(A, b) résout Ax = b.
  [code python, 5 trous, sans aide]
    | def be_newton_step(u1, u2, h):
    |     # un pas de Newton pour le schema d'Euler retrograde, depuis x = u^n
    |     x1 = u1
    |     x2 = u2
    |     F1 = ⟦x1 - u1 + h * x2 * x2 * x1⟧
    |     F2 = ⟦x2 - u2 + h * x1 * x1 * x2⟧
    |     a = ⟦1 + h * x2 * x2⟧
    |     b = ⟦2 * h * x1 * x2⟧
    |     c = 2 * h * x1 * x2
    |     d = 1 + h * x1 * x1
    |     delta = solve([[a, b], [c, d]], [F1, F2])
    |     return [⟦x1 - delta[0]⟧, x2 - delta[1]]
    test : be_newton_step(1.0, 1.0, 0.1) → [0.9230769230769231, 0.9230769230769231]
    test : be_newton_step(1.0, 1.0, 0.5) → [0.8, 0.8]
    test : be_newton_step(2.0, 1.0, 0.5) → [4.0, -1.0]
    test : be_newton_step(1.0, 2.0, 0.5) → [-1.0, 4.0]
  puis : Une propriété du problème exact :
      [tableau à lire, sans aide]
      question : Pour la solution exacte de u₁′ = −u₂²u₁, u₂′ = −u₁²u₂ : Une ou plusieurs réponses justes.
          · u₁² + u₂² est constante   ✔ u₁(1)² + u₂(1)² ≤ u₁(0)² + u₂(0)²   · u₁(t)² + u₂(t)² croît avec t   ✔ ½·d/dt(u₁² + u₂²) + 2u₁²u₂² = 0
  pièges : n_newton_sys_sign

Complète un pas de Newton pour Euler rétrograde sur u₁′ = −u₂²u₁, u₂′ = −u₁²u₂ (les inconnues x1, x2 partent de uⁿ). solve(A, b) résout Ax = b.
  [code python, 5 trous, sans aide]
    | def be_newton_step(u1, u2, h):
    |     # un pas de Newton pour le schema d'Euler retrograde, depuis x = u^n
    |     x1 = u1
    |     x2 = u2
    |     F1 = ⟦x1 - u1 + h * x2 * x2 * x1⟧
    |     F2 = ⟦x2 - u2 + h * x1 * x1 * x2⟧
    |     a = ⟦1 + h * x2 * x2⟧
    |     b = ⟦2 * h * x1 * x2⟧
    |     c = 2 * h * x1 * x2
    |     d = 1 + h * x1 * x1
    |     delta = solve([[a, b], [c, d]], [F1, F2])
    |     return [⟦x1 - delta[0]⟧, x2 - delta[1]]
    test : be_newton_step(1.0, 1.0, 0.1) → [0.9230769230769231, 0.9230769230769231]
    test : be_newton_step(1.0, 1.0, 0.5) → [0.8, 0.8]
    test : be_newton_step(2.0, 1.0, 0.5) → [4.0, -1.0]
    test : be_newton_step(1.0, 2.0, 0.5) → [-1.0, 4.0]
  puis : Une propriété du problème exact :
      [tableau à lire, sans aide]
      question : Pour la solution exacte de u₁′ = −u₂²u₁, u₂′ = −u₁²u₂ : Une ou plusieurs réponses justes.
          · u₁² + u₂² est constante   ✔ ½·d/dt(u₁² + u₂²) + 2u₁²u₂² = 0   · u₁(t)² + u₂(t)² croît avec t   ✔ u₁(1)² + u₂(1)² ≤ u₁(0)² + u₂(0)²
  pièges : n_newton_sys_sign

Complète un pas de Newton pour Euler rétrograde sur u₁′ = −u₂²u₁, u₂′ = −u₁²u₂ (les inconnues x1, x2 partent de uⁿ). solve(A, b) résout Ax = b.
  [code python, 5 trous, sans aide]
    | def be_newton_step(u1, u2, h):
    |     # un pas de Newton pour le schema d'Euler retrograde, depuis x = u^n
    |     x1 = u1
    |     x2 = u2
    |     F1 = ⟦x1 - u1 + h * x2 * x2 * x1⟧
    |     F2 = ⟦x2 - u2 + h * x1 * x1 * x2⟧
    |     a = ⟦1 + h * x2 * x2⟧
    |     b = ⟦2 * h * x1 * x2⟧
    |     c = 2 * h * x1 * x2
    |     d = 1 + h * x1 * x1
    |     delta = solve([[a, b], [c, d]], [F1, F2])
    |     return [⟦x1 - delta[0]⟧, x2 - delta[1]]
    test : be_newton_step(1.0, 1.0, 0.1) → [0.9230769230769231, 0.9230769230769231]
    test : be_newton_step(1.0, 1.0, 0.5) → [0.8, 0.8]
    test : be_newton_step(2.0, 1.0, 0.5) → [4.0, -1.0]
    test : be_newton_step(1.0, 2.0, 0.5) → [-1.0, 4.0]
  puis : Une propriété du problème exact :
      [tableau à lire, sans aide]
      question : Pour la solution exacte de u₁′ = −u₂²u₁, u₂′ = −u₁²u₂ : Une ou plusieurs réponses justes.
          ✔ ½·d/dt(u₁² + u₂²) + 2u₁²u₂² = 0   · u₁² + u₂² est constante   · u₁(t)² + u₂(t)² croît avec t   ✔ u₁(1)² + u₂(1)² ≤ u₁(0)² + u₂(0)²
  pièges : n_newton_sys_sign

```

### Variantes d'examen

```
Euler rétrograde pour u₁′ = −u₂⁴·u₁, u₂′ = −u₁⁴·u₂, h = 0,1, uⁿ = (2 ; 1). Les inconnues (x ; y) = uⁿ⁺¹ vérifient f(x, y) = 0 avec
  · f₁(x, y) = x − 2 + 0,1·1⁴·x, f₂(x, y) = y − 1 + 0,1·2⁴·y [n_implicit_as_explicit]   · f₁(x, y) = x − 2 + 0,1·x⁴·y, f₂(x, y) = y − 1 + 0,1·y⁴·x   · f₁(x, y) = x − 2 − 0,1·y⁴·x, f₂(x, y) = y − 1 − 0,1·x⁴·y   ✔ f₁(x, y) = x − 2 + 0,1·y⁴·x, f₂(x, y) = y − 1 + 0,1·x⁴·y
  [examen mcq]
  pièges : n_implicit_as_explicit

Vrai ou faux ? La solution exacte de u₁′ = −u₂²u₁, u₂′ = −u₁²u₂ vérifie u₁(1)² + u₂(1)² ≤ u₁(0)² + u₂(0)².
  ✔ Vrai   · Faux
  [examen tf]

```

## Problèmes raides (`n-ode-stiff`, BA4)

_Quand la stabilité, et non la précision, impose un pas minuscule._

### Niveau 1

```
u′ = −1000(u − cos t), u(0) = 0. Après un court transitoire, u ≈ cos t, une fonction lisse. Quel est le plus grand pas h_max pour lequel Euler progressif est stable ?
  [guided]  h_max
    (Le mode rapide est λ = −1000 : Euler progressif est stable si |1 + hλ| < 1.)
    = 2/1000   ← h_max = 2/|λ|
    = □   (trous : 1/500)   ← ≈ 0,002
  aides : Compare la condition de stabilité au pas que la précision demanderait. | h < 2/□ | h < 0,002 alors que la solution est lisse : c'est un problème raide.
  pièges : n_stab_factor2

u′ = −100(u − cos t), u(0) = 0. Après un court transitoire, u ≈ cos t, une fonction lisse. Quel est le plus grand pas h_max pour lequel Euler progressif est stable ?
  [guided]  h_max
    (Le mode rapide est λ = −100 : Euler progressif est stable si |1 + hλ| < 1.)
    = 2/100   ← h_max = 2/|λ|
    = □   (trous : 1/50)   ← ≈ 0,02
  aides : Compare la condition de stabilité au pas que la précision demanderait. | h < 2/□ | h < 0,02 alors que la solution est lisse : c'est un problème raide.
  pièges : n_stab_factor2

u′ = −1000(u − cos t), u(0) = 0. Après un court transitoire, u ≈ cos t, une fonction lisse. Quel est le plus grand pas h_max pour lequel Euler progressif est stable ?
  [guided]  h_max
    (Le mode rapide est λ = −1000 : Euler progressif est stable si |1 + hλ| < 1.)
    = 2/1000   ← h_max = 2/|λ|
    = □   (trous : 1/500)   ← ≈ 0,002
  aides : Compare la condition de stabilité au pas que la précision demanderait. | h < 2/□ | h < 0,002 alors que la solution est lisse : c'est un problème raide.
  pièges : n_stab_factor2

```

### Niveau 2

```
u′ = Au avec A = diag(−1 ; −50) (rapport de raideur 50). Quel pas maximal impose la stabilité d'Euler progressif ?
  [guided]  h_max
    ? Quelle valeur propre impose le pas ? ✔ λ = −50, le mode rapide / · λ = −1, le mode lent qu'on veut suivre
    = 2/50   ← |1 + h·(−50)| < 1
    = □   (trous : 1/25)   ← ≈ 0,04
  aides : Pour un système, chaque valeur propre doit vérifier |1 + hλ| < 1 : la plus grande en module décide. | h < 2/□ | h < 2/50 = 0,04.
  pièges : n_stab_factor2

u′ = Au avec A = diag(−2 ; −50) (rapport de raideur 25). Quel pas maximal impose la stabilité d'Euler progressif ?
  [guided]  h_max
    ? Quelle valeur propre impose le pas ? · λ = −2, le mode lent qu'on veut suivre / ✔ λ = −50, le mode rapide
    = 2/50   ← |1 + h·(−50)| < 1
    = □   (trous : 1/25)   ← ≈ 0,04
  aides : Pour un système, chaque valeur propre doit vérifier |1 + hλ| < 1 : la plus grande en module décide. | h < 2/□ | h < 2/50 = 0,04.
  pièges : n_stab_factor2

u′ = Au avec A = diag(−2 ; −50) (rapport de raideur 25). Quel pas maximal impose la stabilité d'Euler progressif ?
  [guided]  h_max
    ? Quelle valeur propre impose le pas ? · λ = −2, le mode lent qu'on veut suivre / ✔ λ = −50, le mode rapide
    = 2/50   ← |1 + h·(−50)| < 1
    = □   (trous : 1/25)   ← ≈ 0,04
  aides : Pour un système, chaque valeur propre doit vérifier |1 + hλ| < 1 : la plus grande en module décide. | h < 2/□ | h < 2/50 = 0,04.
  pièges : n_stab_factor2

```

### Niveau 3

```
u′ = −100(u − cos t) sur [0 ; 10] : la solution est lisse après le transitoire, et la précision voulue demanderait h ≈ 0,1. Choisis le schéma, puis donne le pas maximal que demanderait Euler progressif.
  [tap, suivre l'erreur]  h_max
    ? Quel schéma choisis-tu ? ✔ Euler rétrograde (implicite), avec h ≈ 0,1 choisi pour la précision / · Euler progressif avec h = 0,1 / · Euler progressif, en réduisant la tolérance s'il explose
    = 1/50   ← h_max = 2/|λ| : 2/100 = 0,02
  aides : Un problème raide : la stabilité de l'explicite impose un pas bien plus petit que la précision. | h_max = 2/□ | h_max = 0,02 : choisis un schéma implicite.
  pièges : n_stiff_accuracy

u′ = −100(u − cos t) sur [0 ; 10] : la solution est lisse après le transitoire, et la précision voulue demanderait h ≈ 0,1. Choisis le schéma, puis donne le pas maximal que demanderait Euler progressif.
  [tap, suivre l'erreur]  h_max
    ? Quel schéma choisis-tu ? ✔ Euler rétrograde (implicite), avec h ≈ 0,1 choisi pour la précision / · Euler progressif avec h = 0,1 / · Euler progressif, en réduisant la tolérance s'il explose
    = 1/50   ← h_max = 2/|λ| : 2/100 = 0,02
  aides : Un problème raide : la stabilité de l'explicite impose un pas bien plus petit que la précision. | h_max = 2/□ | h_max = 0,02 : choisis un schéma implicite.
  pièges : n_stiff_accuracy

u′ = −100(u − cos t) sur [0 ; 10] : la solution est lisse après le transitoire, et la précision voulue demanderait h ≈ 0,1. Choisis le schéma, puis donne le pas maximal que demanderait Euler progressif.
  [tap, suivre l'erreur]  h_max
    ? Quel schéma choisis-tu ? ✔ Euler rétrograde (implicite), avec h ≈ 0,1 choisi pour la précision / · Euler progressif avec h = 0,1 / · Euler progressif, en réduisant la tolérance s'il explose
    = 1/50   ← h_max = 2/|λ| : 2/100 = 0,02
  aides : Un problème raide : la stabilité de l'explicite impose un pas bien plus petit que la précision. | h_max = 2/□ | h_max = 0,02 : choisis un schéma implicite.
  pièges : n_stiff_accuracy

```

### Niveau 4

```
u′ = −50(u − cos t), u(0) = 0, sur [0 ; 1]. Valeur uₙ obtenue en t = 1 avec N pas (la solution exacte vaut ≈ 5,57·10⁻¹) :
  [tableau à lire]
    N | h | Euler progressif | Euler rétrograde
    20 | 0.05 | -3.325e+03 | 5.566e-01
    24 | 0.0417 | -6.271e+00 | 5.567e-01
    26 | 0.0385 | 4.323e-01 | 5.567e-01
    50 | 0.02 | 5.570e-01 | 5.568e-01
    100 | 0.01 | 5.570e-01 | 5.569e-01
  question : Pourquoi Euler progressif explose-t-il pour N = 20 et 24, alors que la solution est lisse ?
      ✔ Stabilité : h > 2/50 = 0,04, donc |1 − 50h| > 1   · La solution exacte explose elle aussi   · Les erreurs d'arrondi de la machine   · Précision : il suffit de réduire la tolérance [n_stiff_accuracy]
      pièges : n_stiff_accuracy
  pièges : n_stiff_accuracy

u′ = −50(u − cos t), u(0) = 0, sur [0 ; 1]. Valeur uₙ obtenue en t = 1 avec N pas (la solution exacte vaut ≈ 5,57·10⁻¹) :
  [tableau à lire]
    N | h | Euler progressif | Euler rétrograde
    20 | 0.05 | -3.325e+03 | 5.566e-01
    24 | 0.0417 | -6.271e+00 | 5.567e-01
    26 | 0.0385 | 4.323e-01 | 5.567e-01
    50 | 0.02 | 5.570e-01 | 5.568e-01
    100 | 0.01 | 5.570e-01 | 5.569e-01
  question : Pourquoi Euler progressif explose-t-il pour N = 20 et 24, alors que la solution est lisse ?
      · Les erreurs d'arrondi de la machine   ✔ Stabilité : h > 2/50 = 0,04, donc |1 − 50h| > 1   · Précision : il suffit de réduire la tolérance [n_stiff_accuracy]   · La solution exacte explose elle aussi
      pièges : n_stiff_accuracy
  pièges : n_stiff_accuracy

u′ = −50(u − cos t), u(0) = 0, sur [0 ; 1]. Valeur uₙ obtenue en t = 1 avec N pas (la solution exacte vaut ≈ 5,57·10⁻¹) :
  [tableau à lire]
    N | h | Euler progressif | Euler rétrograde
    20 | 0.05 | -3.325e+03 | 5.566e-01
    24 | 0.0417 | -6.271e+00 | 5.567e-01
    26 | 0.0385 | 4.323e-01 | 5.567e-01
    50 | 0.02 | 5.570e-01 | 5.568e-01
    100 | 0.01 | 5.570e-01 | 5.569e-01
  question : Pourquoi Euler progressif explose-t-il pour N = 20 et 24, alors que la solution est lisse ?
      · La solution exacte explose elle aussi   · Précision : il suffit de réduire la tolérance [n_stiff_accuracy]   · Les erreurs d'arrondi de la machine   ✔ Stabilité : h > 2/50 = 0,04, donc |1 − 50h| > 1
      pièges : n_stiff_accuracy
  pièges : n_stiff_accuracy

```

### Niveau 5

```
u′ = Au avec A = [[98, −99], [198, −199]]. Trouve les valeurs propres de A, puis le pas maximal d'Euler progressif.
  [free, sans aide]  λ² − (−101)λ + 100 = 0
    (det(A − λI) = λ² − (tr A)λ + det A, avec tr A = −101 et det A = 100.)
    = {−100 ; −1}   ← Rapport de raideur 100
  — Le pas maximal d'Euler progressif :  [juge value]  départ : h_max
    = 1/50   ← Le mode rapide λ = −100 décide : 2/100 = 0,02

u′ = Au avec A = [[−98, 96], [−48, 46]]. Trouve les valeurs propres de A, puis le pas maximal d'Euler progressif.
  [free, sans aide]  λ² − (−52)λ + 100 = 0
    (det(A − λI) = λ² − (tr A)λ + det A, avec tr A = −52 et det A = 100.)
    = {−50 ; −2}   ← Rapport de raideur 25
  — Le pas maximal d'Euler progressif :  [juge value]  départ : h_max
    = 1/25   ← Le mode rapide λ = −50 décide : 2/50 = 0,04

u′ = Au avec A = [[94, −48], [288, −146]]. Trouve les valeurs propres de A, puis le pas maximal d'Euler progressif.
  [free, sans aide]  λ² − (−52)λ + 100 = 0
    (det(A − λI) = λ² − (tr A)λ + det A, avec tr A = −52 et det A = 100.)
    = {−50 ; −2}   ← Rapport de raideur 25
  — Le pas maximal d'Euler progressif :  [juge value]  départ : h_max
    = 1/25   ← Le mode rapide λ = −50 décide : 2/50 = 0,04

```

### Variantes d'examen

```
Vrai ou faux ? Si Euler progressif explose sur un problème raide, il faut diminuer la tolérance demandée.
  · Vrai [n_stiff_accuracy]   ✔ Faux
  [examen tf]
  pièges : n_stiff_accuracy

```

## Problème aux limites −u″ = f : schéma, matrice, A SDP (`n-bvp-fd`, BA4)

_Le schéma centré de −u″ = f donne Au = f̃, avec A = (1/h²)·tridiag(−1, 2, −1) définie positive._

### Niveau 1

```
−u″ = 2 − 12x sur ]0 ; 1[, u(0) = 1, u(1) = −1, N = 2 (h = 1/3). Le schéma centré s'écrit (−uᵢ₋₁ + 2uᵢ − uᵢ₊₁)/h² = f(xᵢ), soit Au = f̃. Calcule le coefficient diagonal de A, puis les seconds membres aux deux bords.
  [guided]  2/(1/3)²
    (Le coefficient diagonal de A est 2/h².)
    = 2·□   (trous : 2·9)   ← 1/h² = 9
    = □   (trous : 18)   ← Diagonale de A
  — f̃₁ = f(x₁) + u(0)/h², avec x₁ = 1/3.  [juge value]  départ : −2 + 1/(1/3)²
    = −2 + 1·□   (trous : −2 + 1·9)   ← f(1/3) = −2
    = □   (trous : 7)   ← Le bord gauche passe à droite
  — f̃₂ = f(x_N) + u(1)/h², avec x_N = 2/3.  [juge value]  départ : −6 + (−1)/(1/3)²
    = −6 + (−1)·□   (trous : −6 + (−1)·9)   ← f(2/3) = −6
    = □   (trous : −15)   ← Le bord droit passe à droite
  aides : Écris l'équation au nœud xᵢ avec la différence centrée de u″ ; aux nœuds 1 et N, u₀ et u_{N+1} sont connus : ils passent à droite. | f̃₁ = −2 + (1)·□ | A = 9·tridiag(−1, 2, −1), f̃₁ = 7, f̃_N = −15.
  pièges : n_bvp_bc_rhs, n_bvp_h2_missing

−u″ = 2 sur ]0 ; 1[, u(0) = −2, u(1) = 3, N = 3 (h = 1/4). Le schéma centré s'écrit (−uᵢ₋₁ + 2uᵢ − uᵢ₊₁)/h² = f(xᵢ), soit Au = f̃. Calcule le coefficient diagonal de A, puis les seconds membres aux deux bords.
  [guided]  2/(1/4)²
    (Le coefficient diagonal de A est 2/h².)
    = 2·□   (trous : 2·16)   ← 1/h² = 16
    = □   (trous : 32)   ← Diagonale de A
  — f̃₁ = f(x₁) + u(0)/h², avec x₁ = 1/4.  [juge value]  départ : 2 + (−2)/(1/4)²
    = 2 + (−2)·□   (trous : 2 + (−2)·16)   ← f(1/4) = 2
    = □   (trous : −30)   ← Le bord gauche passe à droite
  — f̃₃ = f(x_N) + u(1)/h², avec x_N = 3/4.  [juge value]  départ : 2 + 3/(1/4)²
    = 2 + 3·□   (trous : 2 + 3·16)   ← f(3/4) = 2
    = □   (trous : 50)   ← Le bord droit passe à droite
  aides : Écris l'équation au nœud xᵢ avec la différence centrée de u″ ; aux nœuds 1 et N, u₀ et u_{N+1} sont connus : ils passent à droite. | f̃₁ = 2 + (−2)·□ | A = 16·tridiag(−1, 2, −1), f̃₁ = −30, f̃_N = 50.
  pièges : n_bvp_bc_rhs, n_bvp_h2_missing

−u″ = 6 sur ]0 ; 1[, u(0) = 3, u(1) = −2, N = 4 (h = 1/5). Le schéma centré s'écrit (−uᵢ₋₁ + 2uᵢ − uᵢ₊₁)/h² = f(xᵢ), soit Au = f̃. Calcule le coefficient diagonal de A, puis les seconds membres aux deux bords.
  [guided]  2/(1/5)²
    (Le coefficient diagonal de A est 2/h².)
    = 2·□   (trous : 2·25)   ← 1/h² = 25
    = □   (trous : 50)   ← Diagonale de A
  — f̃₁ = f(x₁) + u(0)/h², avec x₁ = 1/5.  [juge value]  départ : 6 + 3/(1/5)²
    = 6 + 3·□   (trous : 6 + 3·25)   ← f(1/5) = 6
    = □   (trous : 81)   ← Le bord gauche passe à droite
  — f̃₄ = f(x_N) + u(1)/h², avec x_N = 4/5.  [juge value]  départ : 6 + (−2)/(1/5)²
    = 6 + (−2)·□   (trous : 6 + (−2)·25)   ← f(4/5) = 6
    = □   (trous : −44)   ← Le bord droit passe à droite
  aides : Écris l'équation au nœud xᵢ avec la différence centrée de u″ ; aux nœuds 1 et N, u₀ et u_{N+1} sont connus : ils passent à droite. | f̃₁ = 6 + (3)·□ | A = 25·tridiag(−1, 2, −1), f̃₁ = 81, f̃_N = −44.
  pièges : n_bvp_bc_rhs, n_bvp_h2_missing

```

### Niveau 2

```
−u″ = −4 + 6x sur ]0 ; 1[, u(0) = 2, u(1) = 1, N = 3 (h = 1/4). Le schéma centré s'écrit (−uᵢ₋₁ + 2uᵢ − uᵢ₊₁)/h² = f(xᵢ), soit Au = f̃. Calcule le coefficient diagonal de A, puis les seconds membres aux deux bords.
  [guided]  2/(1/4)²
    (Le coefficient diagonal de A est 2/h².)
    = 2·□   (trous : 2·16)   ← 1/h² = 16
    = □   (trous : 32)   ← Diagonale de A
  — f̃₁ = f(x₁) + u(0)/h², avec x₁ = 1/4.  [juge value]  départ : −5/2 + 2/(1/4)²
    ? L'équation en x₁ contient −u₀/h² avec u₀ = u(0) = 2 connu. Que devient ce terme ? ✔ Il passe à droite : f̃₁ = f(x₁) + u(0)/h² / · On l'oublie : f̃₁ = f(x₁) / · Il passe à droite avec un signe − : f̃₁ = f(x₁) − u(0)/h²
    = −5/2 + 2·□   (trous : −5/2 + 2·16)   ← f(1/4) = −5/2
    = □   (trous : 59/2)   ← Le bord gauche passe à droite
  — f̃₃ = f(x_N) + u(1)/h², avec x_N = 3/4.  [juge value]  départ : 1/2 + 1/(1/4)²
    = 1/2 + 1·□   (trous : 1/2 + 1·16)   ← f(3/4) = 1/2
    = □   (trous : 33/2)   ← Le bord droit passe à droite
  aides : Écris l'équation au nœud xᵢ avec la différence centrée de u″ ; aux nœuds 1 et N, u₀ et u_{N+1} sont connus : ils passent à droite. | f̃₁ = −5/2 + (2)·□ | A = 16·tridiag(−1, 2, −1), f̃₁ = 59/2, f̃_N = 33/2.
  pièges : n_bvp_bc_rhs, n_bvp_h2_missing

−u″ = −2 sur ]0 ; 1[, u(0) = −2, u(1) = 1, N = 4 (h = 1/5). Écris la matrice A et le vecteur f̃ du système Au = f̃ (schéma centré).
  [guided]  A
    (La matrice A.)
    = [[50,-25,0,0],[-25,50,-25,0],[0,-25,50,-25],[0,0,-25,50]]   (cases à remplir : (1,1) (1,2))   ← (1/h²)·tridiag(−1, 2, −1), 1/h² = 25
  — Le second membre f̃.  [juge mat]  départ : f
    = (-52 ; -2 ; -2 ; 23)   (cases à remplir : (1,1) (4,1))   ← f(xᵢ), plus u(0)/h² en haut et u(1)/h² en bas
  aides : Écris l'équation au nœud xᵢ avec la différence centrée de u″ ; aux nœuds 1 et N, u₀ et u_{N+1} sont connus : ils passent à droite. | f̃₁ = −2 + (−2)·□ | A = 25·tridiag(−1, 2, −1), f̃₁ = −52, f̃_N = 23.
  pièges : n_bvp_bc_rhs, n_bvp_h2_missing

−u″ = 4 − 6x sur ]0 ; 1[, u(0) = 1, u(1) = 3, N = 2 (h = 1/3). Le schéma centré s'écrit (−uᵢ₋₁ + 2uᵢ − uᵢ₊₁)/h² = f(xᵢ), soit Au = f̃. Calcule le coefficient diagonal de A, puis les seconds membres aux deux bords.
  [guided]  2/(1/3)²
    (Le coefficient diagonal de A est 2/h².)
    = 2·□   (trous : 2·9)   ← 1/h² = 9
    = □   (trous : 18)   ← Diagonale de A
  — f̃₁ = f(x₁) + u(0)/h², avec x₁ = 1/3.  [juge value]  départ : 2 + 1/(1/3)²
    ? L'équation en x₁ contient −u₀/h² avec u₀ = u(0) = 1 connu. Que devient ce terme ? ✔ Il passe à droite : f̃₁ = f(x₁) + u(0)/h² / · On l'oublie : f̃₁ = f(x₁) / · Il passe à droite avec un signe − : f̃₁ = f(x₁) − u(0)/h²
    = 2 + 1·□   (trous : 2 + 1·9)   ← f(1/3) = 2
    = □   (trous : 11)   ← Le bord gauche passe à droite
  — f̃₂ = f(x_N) + u(1)/h², avec x_N = 2/3.  [juge value]  départ : 0 + 3/(1/3)²
    = 0 + 3·□   (trous : 0 + 3·9)   ← f(2/3) = 0
    = □   (trous : 27)   ← Le bord droit passe à droite
  aides : Écris l'équation au nœud xᵢ avec la différence centrée de u″ ; aux nœuds 1 et N, u₀ et u_{N+1} sont connus : ils passent à droite. | f̃₁ = 2 + (1)·□ | A = 9·tridiag(−1, 2, −1), f̃₁ = 11, f̃_N = 27.
  pièges : n_bvp_bc_rhs, n_bvp_h2_missing

```

### Niveau 3

```
−u″ = 8 − 12x sur ]0 ; 1[, u(0) = −2, u(1) = −2, N = 3 (h = 1/4). Le schéma centré s'écrit (−uᵢ₋₁ + 2uᵢ − uᵢ₊₁)/h² = f(xᵢ), soit Au = f̃. Calcule le coefficient diagonal de A, puis les seconds membres aux deux bords. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  2/(1/4)²
    (Le coefficient diagonal de A est 2/h².)
    = 2·16   ← 1/h² = 16
    = 32   ← Diagonale de A
  — f̃₁ = f(x₁) + u(0)/h², avec x₁ = 1/4.  [juge value]  départ : 5 + (−2)/(1/4)²
    ? L'équation en x₁ contient −u₀/h² avec u₀ = u(0) = −2 connu. Que devient ce terme ? ✔ Il passe à droite : f̃₁ = f(x₁) + u(0)/h² / · On l'oublie : f̃₁ = f(x₁) / · Il passe à droite avec un signe − : f̃₁ = f(x₁) − u(0)/h²
    = 5 + (−2)·16   ← f(1/4) = 5
    = −27   ← Le bord gauche passe à droite
  — f̃₃ = f(x_N) + u(1)/h², avec x_N = 3/4.  [juge value]  départ : −1 + (−2)/(1/4)²
    = −1 + (−2)·16   ← f(3/4) = −1
    = −33   ← Le bord droit passe à droite
  aides : Écris l'équation au nœud xᵢ avec la différence centrée de u″ ; aux nœuds 1 et N, u₀ et u_{N+1} sont connus : ils passent à droite. | f̃₁ = 5 + (−2)·□ | A = 16·tridiag(−1, 2, −1), f̃₁ = −27, f̃_N = −33.
  pièges : n_bvp_bc_rhs, n_bvp_h2_missing

−u″ = −4 − 6x sur ]0 ; 1[, u(0) = 1, u(1) = −2, N = 2 (h = 1/3). Le schéma centré s'écrit (−uᵢ₋₁ + 2uᵢ − uᵢ₊₁)/h² = f(xᵢ), soit Au = f̃. Calcule le coefficient diagonal de A, puis les seconds membres aux deux bords. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  2/(1/3)²
    (Le coefficient diagonal de A est 2/h².)
    = 2·9   ← 1/h² = 9
    = 18   ← Diagonale de A
  — f̃₁ = f(x₁) + u(0)/h², avec x₁ = 1/3.  [juge value]  départ : −6 + 1/(1/3)²
    ? L'équation en x₁ contient −u₀/h² avec u₀ = u(0) = 1 connu. Que devient ce terme ? ✔ Il passe à droite : f̃₁ = f(x₁) + u(0)/h² / · On l'oublie : f̃₁ = f(x₁) / · Il passe à droite avec un signe − : f̃₁ = f(x₁) − u(0)/h²
    = −6 + 1·9   ← f(1/3) = −6
    = 3   ← Le bord gauche passe à droite
  — f̃₂ = f(x_N) + u(1)/h², avec x_N = 2/3.  [juge value]  départ : −8 + (−2)/(1/3)²
    = −8 + (−2)·9   ← f(2/3) = −8
    = −26   ← Le bord droit passe à droite
  aides : Écris l'équation au nœud xᵢ avec la différence centrée de u″ ; aux nœuds 1 et N, u₀ et u_{N+1} sont connus : ils passent à droite. | f̃₁ = −6 + (1)·□ | A = 9·tridiag(−1, 2, −1), f̃₁ = 3, f̃_N = −26.
  pièges : n_bvp_bc_rhs, n_bvp_h2_missing

−u″ = 4 − 6x sur ]0 ; 1[, u(0) = −2, u(1) = 3, N = 2 (h = 1/3). Le schéma centré s'écrit (−uᵢ₋₁ + 2uᵢ − uᵢ₊₁)/h² = f(xᵢ), soit Au = f̃. Calcule le coefficient diagonal de A, puis les seconds membres aux deux bords. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  2/(1/3)²
    (Le coefficient diagonal de A est 2/h².)
    = 2·9   ← 1/h² = 9
    = 18   ← Diagonale de A
  — f̃₁ = f(x₁) + u(0)/h², avec x₁ = 1/3.  [juge value]  départ : 2 + (−2)/(1/3)²
    ? L'équation en x₁ contient −u₀/h² avec u₀ = u(0) = −2 connu. Que devient ce terme ? ✔ Il passe à droite : f̃₁ = f(x₁) + u(0)/h² / · On l'oublie : f̃₁ = f(x₁) / · Il passe à droite avec un signe − : f̃₁ = f(x₁) − u(0)/h²
    = 2 + (−2)·9   ← f(1/3) = 2
    = −16   ← Le bord gauche passe à droite
  — f̃₂ = f(x_N) + u(1)/h², avec x_N = 2/3.  [juge value]  départ : 0 + 3/(1/3)²
    = 0 + 3·9   ← f(2/3) = 0
    = 27   ← Le bord droit passe à droite
  aides : Écris l'équation au nœud xᵢ avec la différence centrée de u″ ; aux nœuds 1 et N, u₀ et u_{N+1} sont connus : ils passent à droite. | f̃₁ = 2 + (−2)·□ | A = 9·tridiag(−1, 2, −1), f̃₁ = −16, f̃_N = 27.
  pièges : n_bvp_bc_rhs, n_bvp_h2_missing

```

### Niveau 4

```
A = (1/h²)·tridiag(−1, 2, −1) de taille N. Montre que A est symétrique définie positive : touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soit v ∈ ℝᴺ, v ≠ 0. On développe : vᵀAv = (1/h²)(2Σvᵢ² − 2Σvᵢvᵢ₊₁).
    2. On regroupe : vᵀAv = (1/h²)(v₁² + Σᵢ (vᵢ₊₁ − vᵢ)² + v_N²).
    3. Chaque terme est ≥ 0, donc vᵀAv ≥ 0.
    4. Si vᵀAv = 0, tous les carrés sont nuls : v₁ = 0, puis v₂ = v₁ = 0, …, v_N = 0.
    5. Comme v ≠ 0, c'est impossible : vᵀAv > 0. A est symétrique, donc définie positive.
    ✗ vᵀAv ≥ 0 pour tout v, donc A est définie positive. [n_spd_semidefinite]
    ✗ Les coefficients diagonaux 2/h² sont positifs, donc A est définie positive. [l_posdef_diag]
  pièges : n_spd_semidefinite, l_posdef_diag

A = (1/h²)·tridiag(−1, 2, −1) de taille N. Montre que A est symétrique définie positive : touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soit v ∈ ℝᴺ, v ≠ 0. On développe : vᵀAv = (1/h²)(2Σvᵢ² − 2Σvᵢvᵢ₊₁).
    2. On regroupe : vᵀAv = (1/h²)(v₁² + Σᵢ (vᵢ₊₁ − vᵢ)² + v_N²).
    3. Chaque terme est ≥ 0, donc vᵀAv ≥ 0.
    4. Si vᵀAv = 0, tous les carrés sont nuls : v₁ = 0, puis v₂ = v₁ = 0, …, v_N = 0.
    5. Comme v ≠ 0, c'est impossible : vᵀAv > 0. A est symétrique, donc définie positive.
    ✗ vᵀAv ≥ 0 pour tout v, donc A est définie positive. [n_spd_semidefinite]
    ✗ Les coefficients diagonaux 2/h² sont positifs, donc A est définie positive. [l_posdef_diag]
  pièges : n_spd_semidefinite, l_posdef_diag

A = (1/h²)·tridiag(−1, 2, −1) de taille N. Montre que A est symétrique définie positive : touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soit v ∈ ℝᴺ, v ≠ 0. On développe : vᵀAv = (1/h²)(2Σvᵢ² − 2Σvᵢvᵢ₊₁).
    2. On regroupe : vᵀAv = (1/h²)(v₁² + Σᵢ (vᵢ₊₁ − vᵢ)² + v_N²).
    3. Chaque terme est ≥ 0, donc vᵀAv ≥ 0.
    4. Si vᵀAv = 0, tous les carrés sont nuls : v₁ = 0, puis v₂ = v₁ = 0, …, v_N = 0.
    5. Comme v ≠ 0, c'est impossible : vᵀAv > 0. A est symétrique, donc définie positive.
    ✗ Les coefficients diagonaux 2/h² sont positifs, donc A est définie positive. [l_posdef_diag]
    ✗ vᵀAv ≥ 0 pour tout v, donc A est définie positive. [n_spd_semidefinite]
  pièges : l_posdef_diag, n_spd_semidefinite

```

### Niveau 5

```
Complète la fonction qui écrit le système Au = f̃ du schéma centré (inconnue u[i] au nœud (i + 1)h, indices à partir de 0).
  [code python, 4 trous, sans aide]
    | def bvp_system(N, f, alpha, beta):
    |     # -u'' = f sur ]0;1[, u(0) = alpha, u(1) = beta ; inconnue u[i] au point (i + 1) h
    |     h = 1 / (N + 1)
    |     A = zeros2(N, N)
    |     rhs = zeros(N)
    |     for i in range(N):
    |         A[i][i] = ⟦2 / (h * h)⟧
    |         if i > 0:
    |             A[i][i - 1] = ⟦-1 / (h * h)⟧
    |         if i < N - 1:
    |             A[i][i + 1] = -1 / (h * h)
    |         rhs[i] = ⟦f((i + 1) * h)⟧
    |     rhs[0] = ⟦rhs[0] + alpha / (h * h)⟧
    |     rhs[N - 1] = rhs[N - 1] + beta / (h * h)
    |     return [A, rhs]
    test : def one(x): return 1.0 ; def zero(x): return 0.0 ; S = bvp_system(3, one, 0.0, 0.0) ; T = bvp_system(3, zero, 1.0, 3.0) ; solve(S[0], S[1]) → [0.09375, 0.125, 0.09375]
    test : def one(x): return 1.0 ; def zero(x): return 0.0 ; S = bvp_system(3, one, 0.0, 0.0) ; T = bvp_system(3, zero, 1.0, 3.0) ; solve(T[0], T[1]) → [1.5, 2.0, 2.5]
    test : def lin(x): return x ; U = bvp_system(3, lin, 0.0, 0.0) ; solve(U[0], U[1]) → [0.0390625, 0.0625, 0.0546875]
  puis : Le programme, appelé avec N = 5, f = 1, α = β = 0, puis solve(A, rhs), donne les uᵢ ; on les compare à la solution exacte u(x) = x(1 − x)/2.
      [tableau à lire, sans aide]
        xᵢ | uᵢ | u(xᵢ)
        0.166667 | 0.06944444444 | 0.06944444444
        0.333333 | 0.1111111111 | 0.1111111111
        0.5 | 0.125 | 0.125
        0.666667 | 0.1111111111 | 0.1111111111
        0.833333 | 0.06944444444 | 0.06944444444
      question : Pourquoi uᵢ = u(xᵢ) exactement ?
          · Parce que h est petit   · Par hasard : l'erreur est en h²   ✔ u est un polynôme de degré 2 : la différence centrée de u″ est exacte   · Parce que A est définie positive [n_spd_semidefinite]
          pièges : n_spd_semidefinite
      pièges : n_spd_semidefinite
  pièges : n_bvp_h2_missing, n_bvp_bc_rhs, n_spd_semidefinite

Complète la fonction qui écrit le système Au = f̃ du schéma centré (inconnue u[i] au nœud (i + 1)h, indices à partir de 0).
  [code python, 4 trous, sans aide]
    | def bvp_system(N, f, alpha, beta):
    |     # -u'' = f sur ]0;1[, u(0) = alpha, u(1) = beta ; inconnue u[i] au point (i + 1) h
    |     h = 1 / (N + 1)
    |     A = zeros2(N, N)
    |     rhs = zeros(N)
    |     for i in range(N):
    |         A[i][i] = ⟦2 / (h * h)⟧
    |         if i > 0:
    |             A[i][i - 1] = ⟦-1 / (h * h)⟧
    |         if i < N - 1:
    |             A[i][i + 1] = -1 / (h * h)
    |         rhs[i] = ⟦f((i + 1) * h)⟧
    |     rhs[0] = ⟦rhs[0] + alpha / (h * h)⟧
    |     rhs[N - 1] = rhs[N - 1] + beta / (h * h)
    |     return [A, rhs]
    test : def one(x): return 1.0 ; def zero(x): return 0.0 ; S = bvp_system(3, one, 0.0, 0.0) ; T = bvp_system(3, zero, 1.0, 3.0) ; solve(S[0], S[1]) → [0.09375, 0.125, 0.09375]
    test : def one(x): return 1.0 ; def zero(x): return 0.0 ; S = bvp_system(3, one, 0.0, 0.0) ; T = bvp_system(3, zero, 1.0, 3.0) ; solve(T[0], T[1]) → [1.5, 2.0, 2.5]
    test : def lin(x): return x ; U = bvp_system(3, lin, 0.0, 0.0) ; solve(U[0], U[1]) → [0.0390625, 0.0625, 0.0546875]
  puis : Le programme, appelé avec N = 5, f = 1, α = β = 0, puis solve(A, rhs), donne les uᵢ ; on les compare à la solution exacte u(x) = x(1 − x)/2.
      [tableau à lire, sans aide]
        xᵢ | uᵢ | u(xᵢ)
        0.166667 | 0.06944444444 | 0.06944444444
        0.333333 | 0.1111111111 | 0.1111111111
        0.5 | 0.125 | 0.125
        0.666667 | 0.1111111111 | 0.1111111111
        0.833333 | 0.06944444444 | 0.06944444444
      question : Pourquoi uᵢ = u(xᵢ) exactement ?
          · Parce que A est définie positive [n_spd_semidefinite]   · Par hasard : l'erreur est en h²   ✔ u est un polynôme de degré 2 : la différence centrée de u″ est exacte   · Parce que h est petit
          pièges : n_spd_semidefinite
      pièges : n_spd_semidefinite
  pièges : n_bvp_h2_missing, n_bvp_bc_rhs, n_spd_semidefinite

Complète la fonction qui écrit le système Au = f̃ du schéma centré (inconnue u[i] au nœud (i + 1)h, indices à partir de 0).
  [code python, 4 trous, sans aide]
    | def bvp_system(N, f, alpha, beta):
    |     # -u'' = f sur ]0;1[, u(0) = alpha, u(1) = beta ; inconnue u[i] au point (i + 1) h
    |     h = 1 / (N + 1)
    |     A = zeros2(N, N)
    |     rhs = zeros(N)
    |     for i in range(N):
    |         A[i][i] = ⟦2 / (h * h)⟧
    |         if i > 0:
    |             A[i][i - 1] = ⟦-1 / (h * h)⟧
    |         if i < N - 1:
    |             A[i][i + 1] = -1 / (h * h)
    |         rhs[i] = ⟦f((i + 1) * h)⟧
    |     rhs[0] = ⟦rhs[0] + alpha / (h * h)⟧
    |     rhs[N - 1] = rhs[N - 1] + beta / (h * h)
    |     return [A, rhs]
    test : def one(x): return 1.0 ; def zero(x): return 0.0 ; S = bvp_system(3, one, 0.0, 0.0) ; T = bvp_system(3, zero, 1.0, 3.0) ; solve(S[0], S[1]) → [0.09375, 0.125, 0.09375]
    test : def one(x): return 1.0 ; def zero(x): return 0.0 ; S = bvp_system(3, one, 0.0, 0.0) ; T = bvp_system(3, zero, 1.0, 3.0) ; solve(T[0], T[1]) → [1.5, 2.0, 2.5]
    test : def lin(x): return x ; U = bvp_system(3, lin, 0.0, 0.0) ; solve(U[0], U[1]) → [0.0390625, 0.0625, 0.0546875]
  puis : Le programme, appelé avec N = 5, f = 1, α = β = 0, puis solve(A, rhs), donne les uᵢ ; on les compare à la solution exacte u(x) = x(1 − x)/2.
      [tableau à lire, sans aide]
        xᵢ | uᵢ | u(xᵢ)
        0.166667 | 0.06944444444 | 0.06944444444
        0.333333 | 0.1111111111 | 0.1111111111
        0.5 | 0.125 | 0.125
        0.666667 | 0.1111111111 | 0.1111111111
        0.833333 | 0.06944444444 | 0.06944444444
      question : Pourquoi uᵢ = u(xᵢ) exactement ?
          · Parce que h est petit   · Par hasard : l'erreur est en h²   · Parce que A est définie positive [n_spd_semidefinite]   ✔ u est un polynôme de degré 2 : la différence centrée de u″ est exacte
          pièges : n_spd_semidefinite
      pièges : n_spd_semidefinite
  pièges : n_bvp_h2_missing, n_bvp_bc_rhs, n_spd_semidefinite

```

### Variantes d'examen

```
Soit A = [[1, −1, 0, 0], [−1, 2, −1, 0], [0, −1, 2, −1], [0, 0, −1, 1]] (bords de Neumann). Cocher les affirmations vraies. Une ou plusieurs réponses justes.
  ✔ A·(1, 1, 1, 1)ᵀ = 0   · A est inversible   ✔ xᵀAx ≥ 0 pour tout x ∈ ℝ⁴   · A est symétrique définie positive [n_spd_semidefinite]
  [examen mcq]
  pièges : n_spd_semidefinite

Problème aux limites par différences finies (modèle des examens 2020 et 2022).
  [problème, examen open, 3,5 points]
  partie 1 (Le système Au = f̃ : 1 ; Le second membre f̃. : 1)
  −u″ = 10 − 12x sur ]0 ; 1[, u(0) = −2, u(1) = 1, N = 2 (h = 1/3). Écris la matrice A et le vecteur f̃ du système Au = f̃ (schéma centré).
    [free, sans aide, suivre l'erreur, examen open]  A
      (La matrice A.)
      = [[18,-9],[-9,18]]   ← (1/h²)·tridiag(−1, 2, −1), 1/h² = 9
    — Le second membre f̃.  [juge mat]  départ : f
      = (-12 ; 11)   ← f(xᵢ), plus u(0)/h² en haut et u(1)/h² en bas
  partie 2 (A est définie positive : 1,5)
  A = (1/h²)·tridiag(−1, 2, −1) de taille N. Montre que A est symétrique définie positive : touche les blocs dans l'ordre de la preuve.
    [blocs order, sans aide]
      1. Soit v ∈ ℝᴺ, v ≠ 0. On développe : vᵀAv = (1/h²)(2Σvᵢ² − 2Σvᵢvᵢ₊₁).
      2. On regroupe : vᵀAv = (1/h²)(v₁² + Σᵢ (vᵢ₊₁ − vᵢ)² + v_N²).
      3. Chaque terme est ≥ 0, donc vᵀAv ≥ 0.
      4. Si vᵀAv = 0, tous les carrés sont nuls : v₁ = 0, puis v₂ = v₁ = 0, …, v_N = 0.
      5. Comme v ≠ 0, c'est impossible : vᵀAv > 0. A est symétrique, donc définie positive.
      ✗ vᵀAv ≥ 0 pour tout v, donc A est définie positive. [n_spd_semidefinite]
      ✗ Les coefficients diagonaux 2/h² sont positifs, donc A est définie positive. [l_posdef_diag]
    [examen open]
  pièges : n_bvp_bc_rhs, n_bvp_h2_missing, n_spd_semidefinite, l_posdef_diag

```

## Consistance, stabilité, convergence en Ch² (`n-bvp-convergence`, BA4)

_Consistance + stabilité ⇒ convergence : max|u(xᵢ) − uᵢ| ≤ (h²/96)·max|u⁽⁴⁾|._

### Niveau 1

```
Convergence du schéma centré pour −u″ = f sur ]0 ; 1[ avec u = 0 aux bords : consistance, stabilité, puis la constante C de max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾|.
  [guided]  1/(4!)
    (Taylor-Lagrange : u(xᵢ ± h) = u ± hu′ + (h²/2)u″ ± (h³/6)u‴ + c·h⁴u⁽⁴⁾(ξ±). Le coefficient c :)
    = □   (trous : 1/24)   ← 4! = 24
  — τᵢ = (−u(xᵢ₋₁) + 2u(xᵢ) − u(xᵢ₊₁))/h² − f(xᵢ) = −(h²/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋)), donc |τᵢ| ≤ C₁h²·max|u⁽⁴⁾|. La constante C₁ :  [juge value]  départ : 2·(1/24)
    = □   (trous : 1/12)   ← Les deux restes s'additionnent
  — Stabilité (admise) : si Av = g, max|vᵢ| ≤ (1/8)·max|gᵢ|. Avec A(w − u) = τ, max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾| :  [juge value]  départ : (1/8)·(1/12)
    = □   (trous : 1/96)   ← Consistance × stabilité
  aides : Remplace uᵢ par u(xᵢ) dans le schéma : ce qui reste est τᵢ. Développe u(xᵢ ± h) jusqu'à l'ordre 4. | u(xᵢ₊₁) + u(xᵢ₋₁) = 2u(xᵢ) + h²u″(xᵢ) + (h⁴/24)(□ + □) | |τᵢ| ≤ h²/12·max|u⁽⁴⁾|, et la stabilité donne le facteur 1/8 : C = 1/96.
  pièges : n_truncation_constant

Convergence du schéma centré pour −u″ = f sur ]0 ; 1[ avec u = 0 aux bords : consistance, stabilité, puis la constante C de max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾|.
  [guided]  1/(4!)
    (Taylor-Lagrange : u(xᵢ ± h) = u ± hu′ + (h²/2)u″ ± (h³/6)u‴ + c·h⁴u⁽⁴⁾(ξ±). Le coefficient c :)
    = □   (trous : 1/24)   ← 4! = 24
  — τᵢ = (−u(xᵢ₋₁) + 2u(xᵢ) − u(xᵢ₊₁))/h² − f(xᵢ) = −(h²/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋)), donc |τᵢ| ≤ C₁h²·max|u⁽⁴⁾|. La constante C₁ :  [juge value]  départ : 2·(1/24)
    = □   (trous : 1/12)   ← Les deux restes s'additionnent
  — Stabilité (admise) : si Av = g, max|vᵢ| ≤ (1/8)·max|gᵢ|. Avec A(w − u) = τ, max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾| :  [juge value]  départ : (1/8)·(1/12)
    = □   (trous : 1/96)   ← Consistance × stabilité
  aides : Remplace uᵢ par u(xᵢ) dans le schéma : ce qui reste est τᵢ. Développe u(xᵢ ± h) jusqu'à l'ordre 4. | u(xᵢ₊₁) + u(xᵢ₋₁) = 2u(xᵢ) + h²u″(xᵢ) + (h⁴/24)(□ + □) | |τᵢ| ≤ h²/12·max|u⁽⁴⁾|, et la stabilité donne le facteur 1/8 : C = 1/96.
  pièges : n_truncation_constant

Convergence du schéma centré pour −u″ = f sur ]0 ; 1[ avec u = 0 aux bords : consistance, stabilité, puis la constante C de max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾|.
  [guided]  1/(4!)
    (Taylor-Lagrange : u(xᵢ ± h) = u ± hu′ + (h²/2)u″ ± (h³/6)u‴ + c·h⁴u⁽⁴⁾(ξ±). Le coefficient c :)
    = □   (trous : 1/24)   ← 4! = 24
  — τᵢ = (−u(xᵢ₋₁) + 2u(xᵢ) − u(xᵢ₊₁))/h² − f(xᵢ) = −(h²/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋)), donc |τᵢ| ≤ C₁h²·max|u⁽⁴⁾|. La constante C₁ :  [juge value]  départ : 2·(1/24)
    = □   (trous : 1/12)   ← Les deux restes s'additionnent
  — Stabilité (admise) : si Av = g, max|vᵢ| ≤ (1/8)·max|gᵢ|. Avec A(w − u) = τ, max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾| :  [juge value]  départ : (1/8)·(1/12)
    = □   (trous : 1/96)   ← Consistance × stabilité
  aides : Remplace uᵢ par u(xᵢ) dans le schéma : ce qui reste est τᵢ. Développe u(xᵢ ± h) jusqu'à l'ordre 4. | u(xᵢ₊₁) + u(xᵢ₋₁) = 2u(xᵢ) + h²u″(xᵢ) + (h⁴/24)(□ + □) | |τᵢ| ≤ h²/12·max|u⁽⁴⁾|, et la stabilité donne le facteur 1/8 : C = 1/96.
  pièges : n_truncation_constant

```

### Niveau 2

```
Convergence du schéma centré pour −u″ = f sur ]0 ; 1[ avec u = 0 aux bords : consistance, stabilité, puis la constante C de max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾|.
  [guided]  1/(4!)
    (Taylor-Lagrange : u(xᵢ ± h) = u ± hu′ + (h²/2)u″ ± (h³/6)u‴ + c·h⁴u⁽⁴⁾(ξ±). Le coefficient c :)
    = □   (trous : 1/24)   ← 4! = 24
  — τᵢ = (−u(xᵢ₋₁) + 2u(xᵢ) − u(xᵢ₊₁))/h² − f(xᵢ) = −(h²/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋)), donc |τᵢ| ≤ C₁h²·max|u⁽⁴⁾|. La constante C₁ :  [juge value]  départ : 2·(1/24)
    = □   (trous : 1/12)   ← Les deux restes s'additionnent
  — Stabilité (admise) : si Av = g, max|vᵢ| ≤ (1/8)·max|gᵢ|. Avec A(w − u) = τ, max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾| :  [juge value]  départ : (1/8)·(1/12)
    = □   (trous : 1/96)   ← Consistance × stabilité
  — Pour u(x) = sin(πx) (f = π²·sin(πx)) : max|u⁽⁴⁾| sur [0 ; 1].  [juge value]  départ : M_4
    = □   (trous : π⁴)   ← u⁽⁴⁾ = π⁴ sin(πx)
  aides : Remplace uᵢ par u(xᵢ) dans le schéma : ce qui reste est τᵢ. Développe u(xᵢ ± h) jusqu'à l'ordre 4. | u(xᵢ₊₁) + u(xᵢ₋₁) = 2u(xᵢ) + h²u″(xᵢ) + (h⁴/24)(□ + □) | |τᵢ| ≤ h²/12·max|u⁽⁴⁾|, et la stabilité donne le facteur 1/8 : C = 1/96.
  pièges : n_truncation_constant

Convergence du schéma centré pour −u″ = f sur ]0 ; 1[ avec u = 0 aux bords : consistance, stabilité, puis la constante C de max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾|.
  [guided]  1/(4!)
    (Taylor-Lagrange : u(xᵢ ± h) = u ± hu′ + (h²/2)u″ ± (h³/6)u‴ + c·h⁴u⁽⁴⁾(ξ±). Le coefficient c :)
    = □   (trous : 1/24)   ← 4! = 24
  — τᵢ = (−u(xᵢ₋₁) + 2u(xᵢ) − u(xᵢ₊₁))/h² − f(xᵢ) = −(h²/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋)), donc |τᵢ| ≤ C₁h²·max|u⁽⁴⁾|. La constante C₁ :  [juge value]  départ : 2·(1/24)
    = □   (trous : 1/12)   ← Les deux restes s'additionnent
  — Stabilité (admise) : si Av = g, max|vᵢ| ≤ (1/8)·max|gᵢ|. Avec A(w − u) = τ, max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾| :  [juge value]  départ : (1/8)·(1/12)
    = □   (trous : 1/96)   ← Consistance × stabilité
  — Pour u(x) = sin(πx) (f = π²·sin(πx)) : max|u⁽⁴⁾| sur [0 ; 1].  [juge value]  départ : M_4
    = □   (trous : π⁴)   ← u⁽⁴⁾ = π⁴ sin(πx)
  aides : Remplace uᵢ par u(xᵢ) dans le schéma : ce qui reste est τᵢ. Développe u(xᵢ ± h) jusqu'à l'ordre 4. | u(xᵢ₊₁) + u(xᵢ₋₁) = 2u(xᵢ) + h²u″(xᵢ) + (h⁴/24)(□ + □) | |τᵢ| ≤ h²/12·max|u⁽⁴⁾|, et la stabilité donne le facteur 1/8 : C = 1/96.
  pièges : n_truncation_constant

Convergence du schéma centré pour −u″ = f sur ]0 ; 1[ avec u = 0 aux bords : consistance, stabilité, puis la constante C de max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾|.
  [guided]  1/(4!)
    (Taylor-Lagrange : u(xᵢ ± h) = u ± hu′ + (h²/2)u″ ± (h³/6)u‴ + c·h⁴u⁽⁴⁾(ξ±). Le coefficient c :)
    = □   (trous : 1/24)   ← 4! = 24
  — τᵢ = (−u(xᵢ₋₁) + 2u(xᵢ) − u(xᵢ₊₁))/h² − f(xᵢ) = −(h²/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋)), donc |τᵢ| ≤ C₁h²·max|u⁽⁴⁾|. La constante C₁ :  [juge value]  départ : 2·(1/24)
    = □   (trous : 1/12)   ← Les deux restes s'additionnent
  — Stabilité (admise) : si Av = g, max|vᵢ| ≤ (1/8)·max|gᵢ|. Avec A(w − u) = τ, max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾| :  [juge value]  départ : (1/8)·(1/12)
    = □   (trous : 1/96)   ← Consistance × stabilité
  — Pour u(x) = sin(2πx) (f = 4π²·sin(2πx)) : max|u⁽⁴⁾| sur [0 ; 1].  [juge value]  départ : M_4
    = □   (trous : 16π⁴)   ← u⁽⁴⁾ = 16π⁴ sin(2πx)
  aides : Remplace uᵢ par u(xᵢ) dans le schéma : ce qui reste est τᵢ. Développe u(xᵢ ± h) jusqu'à l'ordre 4. | u(xᵢ₊₁) + u(xᵢ₋₁) = 2u(xᵢ) + h²u″(xᵢ) + (h⁴/24)(□ + □) | |τᵢ| ≤ h²/12·max|u⁽⁴⁾|, et la stabilité donne le facteur 1/8 : C = 1/96.
  pièges : n_truncation_constant

```

### Niveau 3

```
Montre que le schéma centré pour −u″ = f converge en O(h²) : touche les blocs dans l'ordre (consistance, équation de l'erreur, stabilité, conclusion).
  [blocs order]
    1. Consistance : avec w = (u(xᵢ))ᵢ, Aw = f + τ, et |τᵢ| ≤ (h²/12)·max|u⁽⁴⁾|.
    2. Le schéma donne Au = f ; on soustrait les deux systèmes : A(w − u) = τ.
    3. Stabilité appliquée à e = w − u : max|eᵢ| ≤ (1/8)·max|τᵢ|.
    4. Conclusion : max|u(xᵢ) − uᵢ| ≤ (h²/96)·max|u⁽⁴⁾|.
    ✗ Les points ξ₊ et ξ₋ sont égaux, donc les restes s'annulent. [n_proof_same_xi]
    ✗ τ est en O(h²), donc l'erreur u(xᵢ) − uᵢ est en O(h²). [n_stability_skipped]
  pièges : n_proof_same_xi, n_stability_skipped

Montre que le schéma centré pour −u″ = f converge en O(h²) : touche les blocs dans l'ordre (consistance, équation de l'erreur, stabilité, conclusion).
  [blocs order]
    1. Consistance : avec w = (u(xᵢ))ᵢ, Aw = f + τ, et |τᵢ| ≤ (h²/12)·max|u⁽⁴⁾|.
    2. Le schéma donne Au = f ; on soustrait les deux systèmes : A(w − u) = τ.
    3. Stabilité appliquée à e = w − u : max|eᵢ| ≤ (1/8)·max|τᵢ|.
    4. Conclusion : max|u(xᵢ) − uᵢ| ≤ (h²/96)·max|u⁽⁴⁾|.
    ✗ Les points ξ₊ et ξ₋ sont égaux, donc les restes s'annulent. [n_proof_same_xi]
    ✗ τ est en O(h²), donc l'erreur u(xᵢ) − uᵢ est en O(h²). [n_stability_skipped]
  pièges : n_proof_same_xi, n_stability_skipped

Montre que le schéma centré pour −u″ = f converge en O(h²) : touche les blocs dans l'ordre (consistance, équation de l'erreur, stabilité, conclusion).
  [blocs order]
    1. Consistance : avec w = (u(xᵢ))ᵢ, Aw = f + τ, et |τᵢ| ≤ (h²/12)·max|u⁽⁴⁾|.
    2. Le schéma donne Au = f ; on soustrait les deux systèmes : A(w − u) = τ.
    3. Stabilité appliquée à e = w − u : max|eᵢ| ≤ (1/8)·max|τᵢ|.
    4. Conclusion : max|u(xᵢ) − uᵢ| ≤ (h²/96)·max|u⁽⁴⁾|.
    ✗ τ est en O(h²), donc l'erreur u(xᵢ) − uᵢ est en O(h²). [n_stability_skipped]
    ✗ Les points ξ₊ et ξ₋ sont égaux, donc les restes s'annulent. [n_proof_same_xi]
  pièges : n_stability_skipped, n_proof_same_xi

```

### Niveau 4

```
Convergence du schéma centré pour −u″ = f sur ]0 ; 3[ avec u = 0 aux bords : consistance, stabilité, puis la constante C de max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾|.
  [free, suivre l'erreur]  c
    (Taylor-Lagrange : u(xᵢ ± h) = u ± hu′ + (h²/2)u″ ± (h³/6)u‴ + c·h⁴u⁽⁴⁾(ξ±). Le coefficient c :)
    = 1/24   ← 4! = 24
  — τᵢ = (−u(xᵢ₋₁) + 2u(xᵢ) − u(xᵢ₊₁))/h² − f(xᵢ) = −(h²/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋)), donc |τᵢ| ≤ C₁h²·max|u⁽⁴⁾|. La constante C₁ :  [juge value]  départ : C_1
    = 1/12   ← Les deux restes s'additionnent
  — Stabilité (admise) : si Av = g, max|vᵢ| ≤ (L²/8)·max|gᵢ|, avec L = 3. Avec A(w − u) = τ, max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾| :  [juge value]  départ : C
    = 3/32   ← Consistance × stabilité
  aides : Remplace uᵢ par u(xᵢ) dans le schéma : ce qui reste est τᵢ. Développe u(xᵢ ± h) jusqu'à l'ordre 4. | u(xᵢ₊₁) + u(xᵢ₋₁) = 2u(xᵢ) + h²u″(xᵢ) + (h⁴/24)(□ + □) | |τᵢ| ≤ h²/12·max|u⁽⁴⁾|, et la stabilité donne le facteur 9/8 : C = 3/32.
  pièges : n_truncation_constant

Convergence du schéma centré pour −u″ = f sur ]0 ; 3[ avec u = 0 aux bords : consistance, stabilité, puis la constante C de max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾|.
  [free, suivre l'erreur]  c
    (Taylor-Lagrange : u(xᵢ ± h) = u ± hu′ + (h²/2)u″ ± (h³/6)u‴ + c·h⁴u⁽⁴⁾(ξ±). Le coefficient c :)
    = 1/24   ← 4! = 24
  — τᵢ = (−u(xᵢ₋₁) + 2u(xᵢ) − u(xᵢ₊₁))/h² − f(xᵢ) = −(h²/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋)), donc |τᵢ| ≤ C₁h²·max|u⁽⁴⁾|. La constante C₁ :  [juge value]  départ : C_1
    = 1/12   ← Les deux restes s'additionnent
  — Stabilité (admise) : si Av = g, max|vᵢ| ≤ (L²/8)·max|gᵢ|, avec L = 3. Avec A(w − u) = τ, max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾| :  [juge value]  départ : C
    = 3/32   ← Consistance × stabilité
  aides : Remplace uᵢ par u(xᵢ) dans le schéma : ce qui reste est τᵢ. Développe u(xᵢ ± h) jusqu'à l'ordre 4. | u(xᵢ₊₁) + u(xᵢ₋₁) = 2u(xᵢ) + h²u″(xᵢ) + (h⁴/24)(□ + □) | |τᵢ| ≤ h²/12·max|u⁽⁴⁾|, et la stabilité donne le facteur 9/8 : C = 3/32.
  pièges : n_truncation_constant

Convergence du schéma centré pour −u″ = f sur ]0 ; 1[ avec u = 0 aux bords : consistance, stabilité, puis la constante C de max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾|.
  [free, suivre l'erreur]  c
    (Taylor-Lagrange : u(xᵢ ± h) = u ± hu′ + (h²/2)u″ ± (h³/6)u‴ + c·h⁴u⁽⁴⁾(ξ±). Le coefficient c :)
    = 1/24   ← 4! = 24
  — τᵢ = (−u(xᵢ₋₁) + 2u(xᵢ) − u(xᵢ₊₁))/h² − f(xᵢ) = −(h²/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋)), donc |τᵢ| ≤ C₁h²·max|u⁽⁴⁾|. La constante C₁ :  [juge value]  départ : C_1
    = 1/12   ← Les deux restes s'additionnent
  — Stabilité (admise) : si Av = g, max|vᵢ| ≤ (1/8)·max|gᵢ|. Avec A(w − u) = τ, max|u(xᵢ) − uᵢ| ≤ C·h²·max|u⁽⁴⁾| :  [juge value]  départ : C
    = 1/96   ← Consistance × stabilité
  — Pour u(x) = sin(2πx) (f = 4π²·sin(2πx)) : max|u⁽⁴⁾| sur [0 ; 1].  [juge value]  départ : M_4
    = 16π⁴   ← u⁽⁴⁾ = 16π⁴ sin(2πx)
  aides : Remplace uᵢ par u(xᵢ) dans le schéma : ce qui reste est τᵢ. Développe u(xᵢ ± h) jusqu'à l'ordre 4. | u(xᵢ₊₁) + u(xᵢ₋₁) = 2u(xᵢ) + h²u″(xᵢ) + (h⁴/24)(□ + □) | |τᵢ| ≤ h²/12·max|u⁽⁴⁾|, et la stabilité donne le facteur 1/8 : C = 1/96.
  pièges : n_truncation_constant

```

### Niveau 5

```
Le schéma centré pour −u″ = f, u(0) = u(1) = 0, a donné ces erreurs (h = 1/(N + 1)) :
  [tableau à lire, sans aide]
    N | max|u(xᵢ) − uᵢ| | h²e/96
    9 | 1.752621e-04 | 2.832e-04
    19 | 4.411990e-05 | 7.079e-05
    39 | 1.103101e-05 | 1.770e-05
    79 | 2.758498e-06 | 4.424e-06
  question : −u″ = eˣ, u = 1 − eˣ + (e − 1)x (examen 2020) : erreur maximale aux nœuds et borne théorique. Cocher les affirmations vraies. Une ou plusieurs réponses justes.
      ✔ La borne théorique C·h²·max|u⁽⁴⁾| est respectée   · L'erreur est divisée par 2 quand N + 1 double : ordre 1   · La consistance (τ = O(h²)) suffit à garantir ce tableau, sans stabilité [n_stability_skipped]   ✔ L'erreur est divisée par environ 4 quand N + 1 double : ordre 2
      pièges : n_stability_skipped
  pièges : n_stability_skipped

Le schéma centré pour −u″ = f, u(0) = u(1) = 0, a donné ces erreurs (h = 1/(N + 1)) :
  [tableau à lire, sans aide]
    N | max|u(xᵢ) − uᵢ| | h²π⁴/96
    9 | 8.265e-03 | 1.015e-02
    19 | 2.059e-03 | 2.537e-03
    39 | 5.142e-04 | 6.342e-04
    79 | 1.285e-04 | 1.585e-04
  question : −u″ = π² sin(πx), u = sin(πx) : erreur maximale aux nœuds et borne théorique. Cocher les affirmations vraies. Une ou plusieurs réponses justes.
      · L'erreur est divisée par 2 quand N + 1 double : ordre 1   · La consistance (τ = O(h²)) suffit à garantir ce tableau, sans stabilité [n_stability_skipped]   ✔ La borne théorique C·h²·max|u⁽⁴⁾| est respectée   ✔ L'erreur est divisée par environ 4 quand N + 1 double : ordre 2
      pièges : n_stability_skipped
  pièges : n_stability_skipped

Le schéma centré pour −u″ = f, u(0) = u(1) = 0, a donné ces erreurs (h = 1/(N + 1)) :
  [tableau à lire, sans aide]
    N | max|u(xᵢ) − uᵢ| | h²π⁴/96
    9 | 8.265e-03 | 1.015e-02
    19 | 2.059e-03 | 2.537e-03
    39 | 5.142e-04 | 6.342e-04
    79 | 1.285e-04 | 1.585e-04
  question : −u″ = π² sin(πx), u = sin(πx) : erreur maximale aux nœuds et borne théorique. Cocher les affirmations vraies. Une ou plusieurs réponses justes.
      ✔ La borne théorique C·h²·max|u⁽⁴⁾| est respectée   · La consistance (τ = O(h²)) suffit à garantir ce tableau, sans stabilité [n_stability_skipped]   · L'erreur est divisée par 2 quand N + 1 double : ordre 1   ✔ L'erreur est divisée par environ 4 quand N + 1 double : ordre 2
      pièges : n_stability_skipped
  pièges : n_stability_skipped

```

### Variantes d'examen

```
−u″ = eˣ, u = 1 − eˣ + (e − 1)x (examen 2020) : erreur maximale aux nœuds et borne théorique.Nmax|u(xᵢ) − uᵢ|h²e/9691.752621e-042.832e-04194.411990e-057.079e-05391.103101e-051.770e-05Cocher les affirmations vraies. Une ou plusieurs réponses justes.
  ✔ La borne théorique C·h²·max|u⁽⁴⁾| est respectée   · La consistance (τ = O(h²)) suffit à garantir ce tableau, sans stabilité [n_stability_skipped]   · L'erreur est divisée par 2 quand N + 1 double : ordre 1   ✔ L'erreur est divisée par environ 4 quand N + 1 double : ordre 2
  [examen mcq]
  pièges : n_stability_skipped

Convergence du schéma centré (examen 2022, question ouverte 2, parties d à f).
  [problème, examen open, 4 points]
  partie 1 (L'équation de l'erreur et la stabilité : 1)
  Montre que le schéma centré pour −u″ = f converge en O(h²) : touche les blocs dans l'ordre (consistance, équation de l'erreur, stabilité, conclusion).
    [blocs order, sans aide]
      1. Consistance : avec w = (u(xᵢ))ᵢ, Aw = f + τ, et |τᵢ| ≤ (h²/12)·max|u⁽⁴⁾|.
      2. Le schéma donne Au = f ; on soustrait les deux systèmes : A(w − u) = τ.
      3. Stabilité appliquée à e = w − u : max|eᵢ| ≤ (1/8)·max|τᵢ|.
      4. Conclusion : max|u(xᵢ) − uᵢ| ≤ (h²/96)·max|u⁽⁴⁾|.
      ✗ Les points ξ₊ et ξ₋ sont égaux, donc les restes s'annulent. [n_proof_same_xi]
      ✗ τ est en O(h²), donc l'erreur u(xᵢ) − uᵢ est en O(h²). [n_stability_skipped]
    [examen open]
  partie 2 (Les constantes : 1 ; Pour u(x) = sin(πx) (f = π²·sin(πx)) : max|u⁽⁴⁾| sur [0 ; 1]. : 0,5 ; La borne finale : max|u(xᵢ) − uᵢ| ≤ K·h². : 1,5)
  Consistance puis convergence pour −u″ = π² sin(πx), u = sin(πx).
    [free, sans aide, suivre l'erreur, examen open]  C_1
      (τᵢ = (−u(xᵢ₋₁) + 2u(xᵢ) − u(xᵢ₊₁))/h² − f(xᵢ) = −(h²/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋)), donc |τᵢ| ≤ C₁h²·max|u⁽⁴⁾|. La constante C₁ :)
      = 1/12   ← Les deux restes s'additionnent
    — Pour u(x) = sin(πx) (f = π²·sin(πx)) : max|u⁽⁴⁾| sur [0 ; 1].  [juge value]  départ : M_4
      = π⁴   ← u⁽⁴⁾ = π⁴ sin(πx)
    — La borne finale : max|u(xᵢ) − uᵢ| ≤ K·h².  [juge value]  départ : K
      = π⁴/96   ← (1/8)·(1/12)·π⁴
  pièges : n_proof_same_xi, n_stability_skipped, n_truncation_constant

```

## Problème non linéaire : différences finies, Newton, Cholesky tridiagonal (`n-bvp-newton`, BA4)

_Un problème non linéaire par différences finies, résolu par Newton avec une jacobienne tridiagonale factorisée par Cholesky._

### Niveau 1

```
On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = x³ − 1, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0. Choisis ce qui manque.
  [code python, 1 trou]
    | def bvp_newton(N):
    |     # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = x³ − 1 ; Newton DF(x)(x - x_new) = F(x)
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     x = zeros(N)
    |     for i in range(N):
    |         x[i] = 1.0
    |     coeff = (N + 1) * (N + 1)
    |     stop = 1.0
    |     stops = []
    |     while stop > 1e-10:
    |         for i in range(N):
    |             a[i] = 2 * coeff + 3 * x[i] * x[i]
    |         for i in range(N - 1):
    |             c[i] = -coeff
    |         b[0] = coeff * (2 * x[0] - x[1]) + x[0] ** 3 - 1
    |         for i in range(1, N - 1):
    |             b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + x[i] ** 3 - 1
    |         b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + x[N - 1] ** 3 - 1
    |         # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
    |         a[0] = math.sqrt(a[0])
    |         for i in range(N - 1):
    |             c[i] = c[i] / a[i]
    |             a[i + 1] = math.sqrt(a[i + 1] - c[i] * c[i])
    |         # L z = F(x)
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - ⟦·d[i] * b[i] | ·c[i] * b[i + 1] [n_thomas_index_shift] | ✔c[i] * b[i]⟧) / a[i + 1]
    |         # L^T y = z
    |         b[N - 1] = b[N - 1] / a[N - 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = (b[i] - c[i] * b[i + 1]) / a[i]
    |         for i in range(N):
    |             x[i] = x[i] - b[i]
    |         stop = norm(b) / norm(x)
    |         stops.append(stop)
    |     return [x, stops]
    test : len(bvp_newton(9)[1]) → 5
    test : bvp_newton(9)[1][0] → 3.580783e+00
    test : bvp_newton(9)[1][2] → 1.123099e-02
    test : bvp_newton(5)[0][2] → 0.12483374938669925
  pièges : n_thomas_index_shift

On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = x⁵ − 1, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0. Choisis ce qui manque.
  [code python, 1 trou]
    | def bvp_newton(N):
    |     # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = x⁵ − 1 ; Newton DF(x)(x - x_new) = F(x)
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     x = zeros(N)
    |     for i in range(N):
    |         x[i] = 1.0
    |     coeff = (N + 1) * (N + 1)
    |     stop = 1.0
    |     stops = []
    |     while stop > 1e-10:
    |         for i in range(N):
    |             a[i] = 2 * coeff + 5 * x[i] ** 4
    |         for i in range(N - 1):
    |             c[i] = -coeff
    |         b[0] = coeff * (2 * x[0] - x[1]) + x[0] ** 5 - 1
    |         for i in range(1, N - 1):
    |             b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + ⟦·5 * x[i] ** 4 [n_jacobian_vs_F] | ✔x[i] ** 5 - 1 | ·5 * x[i] ** 4 - 1⟧
    |         b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + x[N - 1] ** 5 - 1
    |         # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
    |         a[0] = math.sqrt(a[0])
    |         for i in range(N - 1):
    |             c[i] = c[i] / a[i]
    |             a[i + 1] = math.sqrt(a[i + 1] - c[i] * c[i])
    |         # L z = F(x)
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - c[i] * b[i]) / a[i + 1]
    |         # L^T y = z
    |         b[N - 1] = b[N - 1] / a[N - 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = (b[i] - c[i] * b[i + 1]) / a[i]
    |         for i in range(N):
    |             x[i] = x[i] - b[i]
    |         stop = norm(b) / norm(x)
    |         stops.append(stop)
    |     return [x, stops]
    test : len(bvp_newton(9)[1]) → 5
    test : bvp_newton(9)[1][0] → 2.199894e+00
    test : bvp_newton(9)[1][2] → 1.530547e-02
    test : bvp_newton(5)[0][2] → 0.12499774292881416
  pièges : n_jacobian_vs_F

On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = x⁵ − 1, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0. Choisis ce qui manque.
  [code python, 1 trou]
    | def bvp_newton(N):
    |     # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = x⁵ − 1 ; Newton DF(x)(x - x_new) = F(x)
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     x = zeros(N)
    |     for i in range(N):
    |         x[i] = 1.0
    |     coeff = (N + 1) * (N + 1)
    |     stop = 1.0
    |     stops = []
    |     while stop > 1e-10:
    |         for i in range(N):
    |             a[i] = 2 * coeff + 5 * x[i] ** 4
    |         for i in range(N - 1):
    |             c[i] = -coeff
    |         b[0] = coeff * (2 * x[0] - x[1]) + x[0] ** 5 - 1
    |         for i in range(1, N - 1):
    |             b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + x[i] ** 5 - 1
    |         b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + x[N - 1] ** 5 - 1
    |         # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
    |         a[0] = math.sqrt(a[0])
    |         for i in range(N - 1):
    |             c[i] = c[i] / a[i]
    |             a[i + 1] = math.sqrt(a[i + 1] - ⟦·a[i] * a[i] [n_cholesky_tridiag_sq] | ✔c[i] * c[i] | ·a[i] * c[i] [n_cholesky_tridiag_sq] | ·c[i]⟧)
    |         # L z = F(x)
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - c[i] * b[i]) / a[i + 1]
    |         # L^T y = z
    |         b[N - 1] = b[N - 1] / a[N - 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = (b[i] - c[i] * b[i + 1]) / a[i]
    |         for i in range(N):
    |             x[i] = x[i] - b[i]
    |         stop = norm(b) / norm(x)
    |         stops.append(stop)
    |     return [x, stops]
    test : len(bvp_newton(9)[1]) → 5
    test : bvp_newton(9)[1][0] → 2.199894e+00
    test : bvp_newton(9)[1][2] → 1.530547e-02
    test : bvp_newton(5)[0][2] → 0.12499774292881416
  pièges : n_cholesky_tridiag_sq

```

### Niveau 2

```
On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = x³ − 1, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0. Complète les trous.
  [code python, 1 trou]
    | def bvp_newton(N):
    |     # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = x³ − 1 ; Newton DF(x)(x - x_new) = F(x)
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     x = zeros(N)
    |     for i in range(N):
    |         x[i] = 1.0
    |     coeff = (N + 1) * (N + 1)
    |     stop = 1.0
    |     stops = []
    |     while stop > 1e-10:
    |         for i in range(N):
    |             a[i] = 2 * coeff + 3 * x[i] * x[i]
    |         for i in range(N - 1):
    |             c[i] = -coeff
    |         b[0] = coeff * (2 * x[0] - x[1]) + x[0] ** 3 - 1
    |         for i in range(1, N - 1):
    |             b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + x[i] ** 3 - 1
    |         b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + x[N - 1] ** 3 - 1
    |         # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
    |         a[0] = math.sqrt(a[0])
    |         for i in range(N - 1):
    |             c[i] = c[i] / a[i]
    |             a[i + 1] = math.sqrt(a[i + 1] - c[i] * c[i])
    |         # L z = F(x)
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - ⟦c[i] * b[i]⟧) / a[i + 1]
    |         # L^T y = z
    |         b[N - 1] = b[N - 1] / a[N - 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = (b[i] - c[i] * b[i + 1]) / a[i]
    |         for i in range(N):
    |             x[i] = x[i] - b[i]
    |         stop = norm(b) / norm(x)
    |         stops.append(stop)
    |     return [x, stops]
    test : len(bvp_newton(9)[1]) → 5
    test : bvp_newton(9)[1][0] → 3.580783e+00
    test : bvp_newton(9)[1][2] → 1.123099e-02
    test : bvp_newton(5)[0][2] → 0.12483374938669925
  pièges : n_thomas_index_shift

On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = x⁵ − 1, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0. Complète les trous.
  [code python, 1 trou]
    | def bvp_newton(N):
    |     # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = x⁵ − 1 ; Newton DF(x)(x - x_new) = F(x)
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     x = zeros(N)
    |     for i in range(N):
    |         x[i] = 1.0
    |     coeff = (N + 1) * (N + 1)
    |     stop = 1.0
    |     stops = []
    |     while stop > 1e-10:
    |         for i in range(N):
    |             a[i] = 2 * coeff + ⟦5 * x[i] ** 4⟧
    |         for i in range(N - 1):
    |             c[i] = -coeff
    |         b[0] = coeff * (2 * x[0] - x[1]) + x[0] ** 5 - 1
    |         for i in range(1, N - 1):
    |             b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + x[i] ** 5 - 1
    |         b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + x[N - 1] ** 5 - 1
    |         # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
    |         a[0] = math.sqrt(a[0])
    |         for i in range(N - 1):
    |             c[i] = c[i] / a[i]
    |             a[i + 1] = math.sqrt(a[i + 1] - c[i] * c[i])
    |         # L z = F(x)
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - c[i] * b[i]) / a[i + 1]
    |         # L^T y = z
    |         b[N - 1] = b[N - 1] / a[N - 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = (b[i] - c[i] * b[i + 1]) / a[i]
    |         for i in range(N):
    |             x[i] = x[i] - b[i]
    |         stop = norm(b) / norm(x)
    |         stops.append(stop)
    |     return [x, stops]
    test : len(bvp_newton(9)[1]) → 5
    test : bvp_newton(9)[1][0] → 2.199894e+00
    test : bvp_newton(9)[1][2] → 1.530547e-02
    test : bvp_newton(5)[0][2] → 0.12499774292881416
  pièges : n_jacobian_vs_F

On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = eˣ − 1, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0. Complète les trous.
  [code python, 1 trou]
    | def bvp_newton(N):
    |     # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = eˣ − 1 ; Newton DF(x)(x - x_new) = F(x)
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     x = zeros(N)
    |     for i in range(N):
    |         x[i] = 1.0
    |     coeff = (N + 1) * (N + 1)
    |     stop = 1.0
    |     stops = []
    |     while stop > 1e-10:
    |         for i in range(N):
    |             a[i] = 2 * coeff + ⟦math.exp(x[i])⟧
    |         for i in range(N - 1):
    |             c[i] = -coeff
    |         b[0] = coeff * (2 * x[0] - x[1]) + math.exp(x[0]) - 1
    |         for i in range(1, N - 1):
    |             b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + math.exp(x[i]) - 1
    |         b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + math.exp(x[N - 1]) - 1
    |         # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
    |         a[0] = math.sqrt(a[0])
    |         for i in range(N - 1):
    |             c[i] = c[i] / a[i]
    |             a[i + 1] = math.sqrt(a[i + 1] - c[i] * c[i])
    |         # L z = F(x)
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - c[i] * b[i]) / a[i + 1]
    |         # L^T y = z
    |         b[N - 1] = b[N - 1] / a[N - 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = (b[i] - c[i] * b[i + 1]) / a[i]
    |         for i in range(N):
    |             x[i] = x[i] - b[i]
    |         stop = norm(b) / norm(x)
    |         stops.append(stop)
    |     return [x, stops]
    test : len(bvp_newton(9)[1]) → 6
    test : bvp_newton(9)[1][0] → 1.232215e+01
    test : bvp_newton(9)[1][2] → 6.085293e+04
    test : bvp_newton(5)[0][2] → 1.3062543169872278e-18
  pièges : n_jacobian_vs_F

```

### Niveau 3

```
On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = x⁵ − 1, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0. Complète les trous.
  [code python, 3 trous]
    | def bvp_newton(N):
    |     # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = x⁵ − 1 ; Newton DF(x)(x - x_new) = F(x)
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     x = zeros(N)
    |     for i in range(N):
    |         x[i] = 1.0
    |     coeff = (N + 1) * (N + 1)
    |     stop = 1.0
    |     stops = []
    |     while stop > 1e-10:
    |         for i in range(N):
    |             a[i] = 2 * coeff + ⟦5 * x[i] ** 4⟧
    |         for i in range(N - 1):
    |             c[i] = -coeff
    |         b[0] = coeff * (2 * x[0] - x[1]) + ⟦x[0] ** 5 - 1⟧
    |         for i in range(1, N - 1):
    |             b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + ⟦x[i] ** 5 - 1⟧
    |         b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + x[N - 1] ** 5 - 1
    |         # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
    |         a[0] = math.sqrt(a[0])
    |         for i in range(N - 1):
    |             c[i] = c[i] / a[i]
    |             a[i + 1] = math.sqrt(a[i + 1] - c[i] * c[i])
    |         # L z = F(x)
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - c[i] * b[i]) / a[i + 1]
    |         # L^T y = z
    |         b[N - 1] = b[N - 1] / a[N - 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = (b[i] - c[i] * b[i + 1]) / a[i]
    |         for i in range(N):
    |             x[i] = x[i] - b[i]
    |         stop = norm(b) / norm(x)
    |         stops.append(stop)
    |     return [x, stops]
    test : len(bvp_newton(9)[1]) → 5
    test : bvp_newton(9)[1][0] → 2.199894e+00
    test : bvp_newton(9)[1][2] → 1.530547e-02
    test : bvp_newton(5)[0][2] → 0.12499774292881416
  pièges : n_jacobian_vs_F

On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = x³ + x − 2, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0. Complète les trous.
  [code python, 2 trous]
    | def bvp_newton(N):
    |     # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = x³ + x − 2 ; Newton DF(x)(x - x_new) = F(x)
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     x = zeros(N)
    |     for i in range(N):
    |         x[i] = 1.0
    |     coeff = (N + 1) * (N + 1)
    |     stop = 1.0
    |     stops = []
    |     while stop > 1e-10:
    |         for i in range(N):
    |             a[i] = 2 * coeff + ⟦3 * x[i] * x[i] + 1⟧
    |         for i in range(N - 1):
    |             c[i] = -coeff
    |         b[0] = coeff * (2 * x[0] - x[1]) + x[0] ** 3 + x[0] - 2
    |         for i in range(1, N - 1):
    |             b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + ⟦x[i] ** 3 + x[i] - 2⟧
    |         b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + x[N - 1] ** 3 + x[N - 1] - 2
    |         # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
    |         a[0] = math.sqrt(a[0])
    |         for i in range(N - 1):
    |             c[i] = c[i] / a[i]
    |             a[i + 1] = math.sqrt(a[i + 1] - c[i] * c[i])
    |         # L z = F(x)
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - c[i] * b[i]) / a[i + 1]
    |         # L^T y = z
    |         b[N - 1] = b[N - 1] / a[N - 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = (b[i] - c[i] * b[i + 1]) / a[i]
    |         for i in range(N):
    |             x[i] = x[i] - b[i]
    |         stop = norm(b) / norm(x)
    |         stops.append(stop)
    |     return [x, stops]
    test : len(bvp_newton(9)[1]) → 5
    test : bvp_newton(9)[1][0] → 2.717221e+00
    test : bvp_newton(9)[1][2] → 4.693690e-03
    test : bvp_newton(5)[0][2] → 0.225000499814698
  pièges : n_jacobian_vs_F

On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = x⁵ − 1, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0. Complète les trous.
  [code python, 3 trous]
    | def bvp_newton(N):
    |     # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = x⁵ − 1 ; Newton DF(x)(x - x_new) = F(x)
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     x = zeros(N)
    |     for i in range(N):
    |         x[i] = 1.0
    |     coeff = (N + 1) * (N + 1)
    |     stop = 1.0
    |     stops = []
    |     while stop > 1e-10:
    |         for i in range(N):
    |             a[i] = 2 * coeff + ⟦5 * x[i] ** 4⟧
    |         for i in range(N - 1):
    |             c[i] = -coeff
    |         b[0] = coeff * (2 * x[0] - x[1]) + ⟦x[0] ** 5 - 1⟧
    |         for i in range(1, N - 1):
    |             b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + ⟦x[i] ** 5 - 1⟧
    |         b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + x[N - 1] ** 5 - 1
    |         # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
    |         a[0] = math.sqrt(a[0])
    |         for i in range(N - 1):
    |             c[i] = c[i] / a[i]
    |             a[i + 1] = math.sqrt(a[i + 1] - c[i] * c[i])
    |         # L z = F(x)
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - c[i] * b[i]) / a[i + 1]
    |         # L^T y = z
    |         b[N - 1] = b[N - 1] / a[N - 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = (b[i] - c[i] * b[i + 1]) / a[i]
    |         for i in range(N):
    |             x[i] = x[i] - b[i]
    |         stop = norm(b) / norm(x)
    |         stops.append(stop)
    |     return [x, stops]
    test : len(bvp_newton(9)[1]) → 5
    test : bvp_newton(9)[1][0] → 2.199894e+00
    test : bvp_newton(9)[1][2] → 1.530547e-02
    test : bvp_newton(5)[0][2] → 0.12499774292881416
  pièges : n_jacobian_vs_F

```

### Niveau 4

```
On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = eˣ − 1, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0. Complète les trous.
  [code python, 7 trous]
    | def bvp_newton(N):
    |     # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = eˣ − 1 ; Newton DF(x)(x - x_new) = F(x)
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     x = zeros(N)
    |     for i in range(N):
    |         x[i] = 1.0
    |     coeff = (N + 1) * (N + 1)
    |     stop = 1.0
    |     stops = []
    |     while stop > 1e-10:
    |         for i in range(N):
    |             a[i] = 2 * coeff + math.exp(x[i])
    |         for i in range(N - 1):
    |             c[i] = -coeff
    |         b[0] = coeff * (2 * x[0] - x[1]) + math.exp(x[0]) - 1
    |         for i in range(1, N - 1):
    |             b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + math.exp(x[i]) - 1
    |         b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + math.exp(x[N - 1]) - 1
    |         # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
    |         a[0] = ⟦math.sqrt(a[0])⟧
    |         for i in range(N - 1):
    |             c[i] = ⟦c[i] / a[i]⟧
    |             a[i + 1] = math.sqrt(a[i + 1] - ⟦c[i] * c[i]⟧)
    |         # L z = F(x)
    |         b[0] = ⟦b[0] / a[0]⟧
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - ⟦c[i] * b[i]⟧) / a[i + 1]
    |         # L^T y = z
    |         b[N - 1] = ⟦b[N - 1] / a[N - 1]⟧
    |         for i in range(N - 2, -1, -1):
    |             b[i] = (b[i] - ⟦c[i] * b[i + 1]⟧) / a[i]
    |         for i in range(N):
    |             x[i] = x[i] - b[i]
    |         stop = norm(b) / norm(x)
    |         stops.append(stop)
    |     return [x, stops]
    test : len(bvp_newton(9)[1]) → 6
    test : bvp_newton(9)[1][0] → 1.232215e+01
    test : bvp_newton(9)[1][2] → 6.085293e+04
    test : bvp_newton(5)[0][2] → 1.3062543169872278e-18
  pièges : n_cholesky_tridiag_sq, n_thomas_index_shift

On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = x³ − 1, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0. Complète les trous.
  [code python, 7 trous]
    | def bvp_newton(N):
    |     # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = x³ − 1 ; Newton DF(x)(x - x_new) = F(x)
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     x = zeros(N)
    |     for i in range(N):
    |         x[i] = 1.0
    |     coeff = (N + 1) * (N + 1)
    |     stop = 1.0
    |     stops = []
    |     while stop > 1e-10:
    |         for i in range(N):
    |             a[i] = 2 * coeff + 3 * x[i] * x[i]
    |         for i in range(N - 1):
    |             c[i] = -coeff
    |         b[0] = coeff * (2 * x[0] - x[1]) + x[0] ** 3 - 1
    |         for i in range(1, N - 1):
    |             b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + x[i] ** 3 - 1
    |         b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + x[N - 1] ** 3 - 1
    |         # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
    |         a[0] = ⟦math.sqrt(a[0])⟧
    |         for i in range(N - 1):
    |             c[i] = ⟦c[i] / a[i]⟧
    |             a[i + 1] = math.sqrt(a[i + 1] - ⟦c[i] * c[i]⟧)
    |         # L z = F(x)
    |         b[0] = ⟦b[0] / a[0]⟧
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - ⟦c[i] * b[i]⟧) / a[i + 1]
    |         # L^T y = z
    |         b[N - 1] = ⟦b[N - 1] / a[N - 1]⟧
    |         for i in range(N - 2, -1, -1):
    |             b[i] = (b[i] - ⟦c[i] * b[i + 1]⟧) / a[i]
    |         for i in range(N):
    |             x[i] = x[i] - b[i]
    |         stop = norm(b) / norm(x)
    |         stops.append(stop)
    |     return [x, stops]
    test : len(bvp_newton(9)[1]) → 5
    test : bvp_newton(9)[1][0] → 3.580783e+00
    test : bvp_newton(9)[1][2] → 1.123099e-02
    test : bvp_newton(5)[0][2] → 0.12483374938669925
  pièges : n_cholesky_tridiag_sq, n_thomas_index_shift

On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = x⁵ − 1, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0. Complète les trous.
  [code python, 7 trous]
    | def bvp_newton(N):
    |     # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = x⁵ − 1 ; Newton DF(x)(x - x_new) = F(x)
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     x = zeros(N)
    |     for i in range(N):
    |         x[i] = 1.0
    |     coeff = (N + 1) * (N + 1)
    |     stop = 1.0
    |     stops = []
    |     while stop > 1e-10:
    |         for i in range(N):
    |             a[i] = 2 * coeff + 5 * x[i] ** 4
    |         for i in range(N - 1):
    |             c[i] = -coeff
    |         b[0] = coeff * (2 * x[0] - x[1]) + x[0] ** 5 - 1
    |         for i in range(1, N - 1):
    |             b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + x[i] ** 5 - 1
    |         b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + x[N - 1] ** 5 - 1
    |         # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
    |         a[0] = ⟦math.sqrt(a[0])⟧
    |         for i in range(N - 1):
    |             c[i] = ⟦c[i] / a[i]⟧
    |             a[i + 1] = math.sqrt(a[i + 1] - ⟦c[i] * c[i]⟧)
    |         # L z = F(x)
    |         b[0] = ⟦b[0] / a[0]⟧
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - ⟦c[i] * b[i]⟧) / a[i + 1]
    |         # L^T y = z
    |         b[N - 1] = ⟦b[N - 1] / a[N - 1]⟧
    |         for i in range(N - 2, -1, -1):
    |             b[i] = (b[i] - ⟦c[i] * b[i + 1]⟧) / a[i]
    |         for i in range(N):
    |             x[i] = x[i] - b[i]
    |         stop = norm(b) / norm(x)
    |         stops.append(stop)
    |     return [x, stops]
    test : len(bvp_newton(9)[1]) → 5
    test : bvp_newton(9)[1][0] → 2.199894e+00
    test : bvp_newton(9)[1][2] → 1.530547e-02
    test : bvp_newton(5)[0][2] → 0.12499774292881416
  pièges : n_cholesky_tridiag_sq, n_thomas_index_shift

```

### Niveau 5

```
On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = x³ − 1, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0. Complète les trous.
  [code python, 10 trous, sans aide]
    | def bvp_newton(N):
    |     # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = x³ − 1 ; Newton DF(x)(x - x_new) = F(x)
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     x = zeros(N)
    |     for i in range(N):
    |         x[i] = 1.0
    |     coeff = (N + 1) * (N + 1)
    |     stop = 1.0
    |     stops = []
    |     while stop > 1e-10:
    |         for i in range(N):
    |             a[i] = 2 * coeff + ⟦3 * x[i] * x[i]⟧
    |         for i in range(N - 1):
    |             c[i] = -coeff
    |         b[0] = coeff * (2 * x[0] - x[1]) + ⟦x[0] ** 3 - 1⟧
    |         for i in range(1, N - 1):
    |             b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + ⟦x[i] ** 3 - 1⟧
    |         b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + x[N - 1] ** 3 - 1
    |         # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
    |         a[0] = ⟦math.sqrt(a[0])⟧
    |         for i in range(N - 1):
    |             c[i] = ⟦c[i] / a[i]⟧
    |             a[i + 1] = math.sqrt(a[i + 1] - ⟦c[i] * c[i]⟧)
    |         # L z = F(x)
    |         b[0] = ⟦b[0] / a[0]⟧
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - ⟦c[i] * b[i]⟧) / a[i + 1]
    |         # L^T y = z
    |         b[N - 1] = ⟦b[N - 1] / a[N - 1]⟧
    |         for i in range(N - 2, -1, -1):
    |             b[i] = (b[i] - ⟦c[i] * b[i + 1]⟧) / a[i]
    |         for i in range(N):
    |             x[i] = x[i] - b[i]
    |         stop = norm(b) / norm(x)
    |         stops.append(stop)
    |     return [x, stops]
    test : len(bvp_newton(9)[1]) → 5
    test : bvp_newton(9)[1][0] → 3.580783e+00
    test : bvp_newton(9)[1][2] → 1.123099e-02
    test : bvp_newton(5)[0][2] → 0.12483374938669925
  puis : Le programme complet affiche les valeurs de stop :
      [tableau à lire, sans aide]
        itération | stop, N = 9 | stop, N = 19
        1 | 3.580783e+00 | 3.720121e+00
        2 | 1.274647e+00 | 1.277933e+00
        3 | 1.123099e-02 | 1.123106e-02
        4 | 4.868424e-07 | 4.834302e-07
        5 | 9.555565e-16 | 1.710970e-15
      question : Le programme affiche stop = ‖xⁿ⁺¹ − xⁿ‖/‖xⁿ⁺¹‖ à chaque itération, pour N = 9 et N = 19 (départ x = 1). Que peut-on en déduire ? Une ou plusieurs réponses justes.
          · La méthode est d'ordre 1, car stop est divisé par plus de 10 à chaque pas [n_order_simple_ratio]   · Newton diverge   ✔ Le nombre d'itérations ne dépend presque pas de N   · Newton converge quadratiquement quel que soit le point de départ   ✔ Newton converge quadratiquement pour ce point de départ
          pièges : n_order_simple_ratio
      pièges : n_order_simple_ratio
  pièges : n_jacobian_vs_F, n_cholesky_tridiag_sq, n_thomas_index_shift, n_order_simple_ratio

On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = x³ + x − 2, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0. Complète les trous.
  [code python, 10 trous, sans aide]
    | def bvp_newton(N):
    |     # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = x³ + x − 2 ; Newton DF(x)(x - x_new) = F(x)
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     x = zeros(N)
    |     for i in range(N):
    |         x[i] = 1.0
    |     coeff = (N + 1) * (N + 1)
    |     stop = 1.0
    |     stops = []
    |     while stop > 1e-10:
    |         for i in range(N):
    |             a[i] = 2 * coeff + ⟦3 * x[i] * x[i] + 1⟧
    |         for i in range(N - 1):
    |             c[i] = -coeff
    |         b[0] = coeff * (2 * x[0] - x[1]) + ⟦x[0] ** 3 + x[0] - 2⟧
    |         for i in range(1, N - 1):
    |             b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + ⟦x[i] ** 3 + x[i] - 2⟧
    |         b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + x[N - 1] ** 3 + x[N - 1] - 2
    |         # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
    |         a[0] = ⟦math.sqrt(a[0])⟧
    |         for i in range(N - 1):
    |             c[i] = ⟦c[i] / a[i]⟧
    |             a[i + 1] = math.sqrt(a[i + 1] - ⟦c[i] * c[i]⟧)
    |         # L z = F(x)
    |         b[0] = ⟦b[0] / a[0]⟧
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - ⟦c[i] * b[i]⟧) / a[i + 1]
    |         # L^T y = z
    |         b[N - 1] = ⟦b[N - 1] / a[N - 1]⟧
    |         for i in range(N - 2, -1, -1):
    |             b[i] = (b[i] - ⟦c[i] * b[i + 1]⟧) / a[i]
    |         for i in range(N):
    |             x[i] = x[i] - b[i]
    |         stop = norm(b) / norm(x)
    |         stops.append(stop)
    |     return [x, stops]
    test : len(bvp_newton(9)[1]) → 5
    test : bvp_newton(9)[1][0] → 2.717221e+00
    test : bvp_newton(9)[1][2] → 4.693690e-03
    test : bvp_newton(5)[0][2] → 0.225000499814698
  puis : Le programme complet affiche les valeurs de stop :
      [tableau à lire, sans aide]
        itération | stop, N = 9 | stop, N = 19
        1 | 2.717221e+00 | 2.834011e+00
        2 | 5.640444e-01 | 5.659153e-01
        3 | 4.693690e-03 | 4.707401e-03
        4 | 2.497149e-07 | 2.498474e-07
        5 | 8.196211e-16 | 7.050583e-16
      question : Le programme affiche stop = ‖xⁿ⁺¹ − xⁿ‖/‖xⁿ⁺¹‖ à chaque itération, pour N = 9 et N = 19 (départ x = 1). Que peut-on en déduire ? Une ou plusieurs réponses justes.
          · Newton converge quadratiquement quel que soit le point de départ   ✔ Le nombre d'itérations ne dépend presque pas de N   · La méthode est d'ordre 1, car stop est divisé par plus de 10 à chaque pas [n_order_simple_ratio]   · Newton diverge   ✔ Newton converge quadratiquement pour ce point de départ
          pièges : n_order_simple_ratio
      pièges : n_order_simple_ratio
  pièges : n_jacobian_vs_F, n_cholesky_tridiag_sq, n_thomas_index_shift, n_order_simple_ratio

On résout F(x) = 0 avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (g(xᵢ))ᵢ, g(x) = x³ − 1, par Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). DF est tridiagonale symétrique définie positive : on la factorise par Cholesky (a : diagonale de L, c : sous-diagonale de L), puis on résout L z = F et Lᵀ y = z, en place dans b. Traduction de exam1.m (2020), indices à partir de 0. Complète les trous.
  [code python, 10 trous, sans aide]
    | def bvp_newton(N):
    |     # F(x) = (N+1)^2 tridiag(-1, 2, -1) x + g(x), g(x) = x³ − 1 ; Newton DF(x)(x - x_new) = F(x)
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     x = zeros(N)
    |     for i in range(N):
    |         x[i] = 1.0
    |     coeff = (N + 1) * (N + 1)
    |     stop = 1.0
    |     stops = []
    |     while stop > 1e-10:
    |         for i in range(N):
    |             a[i] = 2 * coeff + ⟦3 * x[i] * x[i]⟧
    |         for i in range(N - 1):
    |             c[i] = -coeff
    |         b[0] = coeff * (2 * x[0] - x[1]) + ⟦x[0] ** 3 - 1⟧
    |         for i in range(1, N - 1):
    |             b[i] = coeff * (2 * x[i] - x[i - 1] - x[i + 1]) + ⟦x[i] ** 3 - 1⟧
    |         b[N - 1] = coeff * (2 * x[N - 1] - x[N - 2]) + x[N - 1] ** 3 - 1
    |         # Cholesky DF = L L^T : a devient la diagonale de L, c sa sous-diagonale
    |         a[0] = ⟦math.sqrt(a[0])⟧
    |         for i in range(N - 1):
    |             c[i] = ⟦c[i] / a[i]⟧
    |             a[i + 1] = math.sqrt(a[i + 1] - ⟦c[i] * c[i]⟧)
    |         # L z = F(x)
    |         b[0] = ⟦b[0] / a[0]⟧
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - ⟦c[i] * b[i]⟧) / a[i + 1]
    |         # L^T y = z
    |         b[N - 1] = ⟦b[N - 1] / a[N - 1]⟧
    |         for i in range(N - 2, -1, -1):
    |             b[i] = (b[i] - ⟦c[i] * b[i + 1]⟧) / a[i]
    |         for i in range(N):
    |             x[i] = x[i] - b[i]
    |         stop = norm(b) / norm(x)
    |         stops.append(stop)
    |     return [x, stops]
    test : len(bvp_newton(9)[1]) → 5
    test : bvp_newton(9)[1][0] → 3.580783e+00
    test : bvp_newton(9)[1][2] → 1.123099e-02
    test : bvp_newton(5)[0][2] → 0.12483374938669925
  puis : Le programme complet affiche les valeurs de stop :
      [tableau à lire, sans aide]
        itération | stop, N = 9 | stop, N = 19
        1 | 3.580783e+00 | 3.720121e+00
        2 | 1.274647e+00 | 1.277933e+00
        3 | 1.123099e-02 | 1.123106e-02
        4 | 4.868424e-07 | 4.834302e-07
        5 | 9.555565e-16 | 1.710970e-15
      question : Le programme affiche stop = ‖xⁿ⁺¹ − xⁿ‖/‖xⁿ⁺¹‖ à chaque itération, pour N = 9 et N = 19 (départ x = 1). Que peut-on en déduire ? Une ou plusieurs réponses justes.
          ✔ Newton converge quadratiquement pour ce point de départ   · Newton converge quadratiquement quel que soit le point de départ   · Newton diverge   · La méthode est d'ordre 1, car stop est divisé par plus de 10 à chaque pas [n_order_simple_ratio]   ✔ Le nombre d'itérations ne dépend presque pas de N
          pièges : n_order_simple_ratio
      pièges : n_order_simple_ratio
  pièges : n_jacobian_vs_F, n_cholesky_tridiag_sq, n_thomas_index_shift, n_order_simple_ratio

```

### Variantes d'examen

```
Le programme affiche stop = ‖xⁿ⁺¹ − xⁿ‖/‖xⁿ⁺¹‖ à chaque itération, pour N = 9 et N = 19 (départ x = 1).itérationstop, N = 9stop, N = 1911.232215e+011.268636e+0122.429286e+022.440112e+0236.085293e+046.140989e+0442.696391e+098.411078e+0852.405746e+001.407917e+01609.619580e-0170Que peut-on en déduire ? Une ou plusieurs réponses justes.
  ✔ Newton converge quadratiquement pour ce point de départ   · La méthode est d'ordre 1, car stop est divisé par plus de 10 à chaque pas [n_order_simple_ratio]   · Newton converge quadratiquement quel que soit le point de départ   ✔ Le nombre d'itérations ne dépend presque pas de N   · Newton diverge
  [examen mcq]
  pièges : n_order_simple_ratio

```

## Équation de la chaleur : Euler implicite et différences finies (`n-heat-implicit`, BA4)

_Euler implicite en temps et différences centrées en espace : Auⁿ⁺¹ = uⁿ, d'ordre O(h² + τ), stable pour tous h, τ._

### Niveau 1

```
On résout ∂u/∂t − ∂²u/∂x² = 0 sur ]0 ; 1[, u(0, t) = u(1, t) = 0, u(x, 0) = sin(πx), par Euler rétrograde en t et différences centrées en x : Auⁿ⁺¹ = uⁿ avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) (a : diagonale, d : sous-diagonale, c : sur-diagonale), factorisée par Thomas. Traduction de exam1.m (2019, 2022), indices à partir de 0. Choisis ce qui manque.
  [code python, 1 trou]
    | def heat_implicit(N, M, tau):
    |     # Euler retrograde + differences finies centrees ; inconnue b[i] au point (i + 1) h
    |     h = 1 / (N + 1)
    |     t = 0.0
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     d = zeros(N - 1)
    |     for i in range(N):
    |         b[i] = ⟦·0 | ·tau / (h * h) * math.sin(math.pi * (i + 1) * h) [n_heat_ic_tau] | ·tau * math.sin(math.pi * (i + 1) * h) [n_heat_ic_tau] | ✔math.sin(math.pi * (i + 1) * h)⟧
    |     for i in range(N):
    |         a[i] = 1 + 2 * tau / (h * h)
    |     for i in range(N - 1):
    |         d[i] = -tau / (h * h)
    |         c[i] = -tau / (h * h)
    |     # A = LU (voir n-thomas)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - d[i - 1] * c[i - 1]
    |         c[i] = c[i] / a[i]
    |     a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    |     for n in range(M):
    |         t = t + tau
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = b[i] - c[i] * b[i + 1]
    |     err = 0.0
    |     for i in range(N):
    |         err = max(err, abs(b[i] - math.exp(-math.pi * math.pi * t) * math.sin(math.pi * (i + 1) * h)))
    |     return err
    test : heat_implicit(9, 10, 0.01) → 2.032035e-02
    test : heat_implicit(19, 40, 0.0025) → 5.238880e-03
    test : heat_implicit(9, 20, 0.005) → 1.184694e-02
  pièges : n_heat_ic_tau

On résout ∂u/∂t − ∂²u/∂x² = 0 sur ]0 ; 1[, u(0, t) = u(1, t) = 0, u(x, 0) = sin(πx), par Euler rétrograde en t et différences centrées en x : Auⁿ⁺¹ = uⁿ avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) (a : diagonale, d : sous-diagonale, c : sur-diagonale), factorisée par Thomas. Traduction de exam1.m (2019, 2022), indices à partir de 0. Choisis ce qui manque.
  [code python, 1 trou]
    | def heat_implicit(N, M, tau):
    |     # Euler retrograde + differences finies centrees ; inconnue b[i] au point (i + 1) h
    |     h = 1 / (N + 1)
    |     t = 0.0
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     d = zeros(N - 1)
    |     for i in range(N):
    |         b[i] = math.sin(math.pi * (i + 1) * h)
    |     for i in range(N):
    |         a[i] = 1 + ⟦·2 * tau [n_heat_tau_h] | ✔2 * tau / (h * h) | ·tau / (h * h) [n_heat_2tau] | ·tau⟧
    |     for i in range(N - 1):
    |         d[i] = -tau / (h * h)
    |         c[i] = -tau / (h * h)
    |     # A = LU (voir n-thomas)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - d[i - 1] * c[i - 1]
    |         c[i] = c[i] / a[i]
    |     a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    |     for n in range(M):
    |         t = t + tau
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = b[i] - c[i] * b[i + 1]
    |     err = 0.0
    |     for i in range(N):
    |         err = max(err, abs(b[i] - math.exp(-math.pi * math.pi * t) * math.sin(math.pi * (i + 1) * h)))
    |     return err
    test : heat_implicit(9, 10, 0.01) → 2.032035e-02
    test : heat_implicit(19, 40, 0.0025) → 5.238880e-03
    test : heat_implicit(9, 20, 0.005) → 1.184694e-02
  pièges : n_heat_2tau, n_heat_tau_h

On résout ∂u/∂t − ∂²u/∂x² = 0 sur ]0 ; 1[, u(0, t) = u(1, t) = 0, u(x, 0) = sin(2πx), par Euler rétrograde en t et différences centrées en x : Auⁿ⁺¹ = uⁿ avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) (a : diagonale, d : sous-diagonale, c : sur-diagonale), factorisée par Thomas. Traduction de exam1.m (2019, 2022), indices à partir de 0. Choisis ce qui manque.
  [code python, 1 trou]
    | def heat_implicit(N, M, tau):
    |     # Euler retrograde + differences finies centrees ; inconnue b[i] au point (i + 1) h
    |     h = 1 / (N + 1)
    |     t = 0.0
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     d = zeros(N - 1)
    |     for i in range(N):
    |         b[i] = ⟦·0 | ·tau / (h * h) * math.sin(2 * math.pi * (i + 1) * h) [n_heat_ic_tau] | ✔math.sin(2 * math.pi * (i + 1) * h) | ·tau * math.sin(2 * math.pi * (i + 1) * h) [n_heat_ic_tau]⟧
    |     for i in range(N):
    |         a[i] = 1 + 2 * tau / (h * h)
    |     for i in range(N - 1):
    |         d[i] = -tau / (h * h)
    |         c[i] = -tau / (h * h)
    |     # A = LU (voir n-thomas)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - d[i - 1] * c[i - 1]
    |         c[i] = c[i] / a[i]
    |     a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    |     for n in range(M):
    |         t = t + tau
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = b[i] - c[i] * b[i + 1]
    |     err = 0.0
    |     for i in range(N):
    |         err = max(err, abs(b[i] - math.exp(-4 * math.pi * math.pi * t) * math.sin(2 * math.pi * (i + 1) * h)))
    |     return err
    test : heat_implicit(9, 10, 0.005) → 3.352212e-02
    test : heat_implicit(19, 40, 0.00125) → 8.971245e-03
    test : heat_implicit(9, 20, 0.005) → 1.049475e-02
  pièges : n_heat_ic_tau

```

### Niveau 2

```
On résout ∂u/∂t − ∂²u/∂x² = 0 sur ]0 ; 1[, u(0, t) = u(1, t) = 0, u(x, 0) = sin(2πx), par Euler rétrograde en t et différences centrées en x : Auⁿ⁺¹ = uⁿ avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) (a : diagonale, d : sous-diagonale, c : sur-diagonale), factorisée par Thomas. Traduction de exam1.m (2019, 2022), indices à partir de 0. Complète les trous.
  [code python, 1 trou]
    | def heat_implicit(N, M, tau):
    |     # Euler retrograde + differences finies centrees ; inconnue b[i] au point (i + 1) h
    |     h = 1 / (N + 1)
    |     t = 0.0
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     d = zeros(N - 1)
    |     for i in range(N):
    |         b[i] = math.sin(2 * math.pi * (i + 1) * h)
    |     for i in range(N):
    |         a[i] = 1 + ⟦2 * tau / (h * h)⟧
    |     for i in range(N - 1):
    |         d[i] = -tau / (h * h)
    |         c[i] = -tau / (h * h)
    |     # A = LU (voir n-thomas)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - d[i - 1] * c[i - 1]
    |         c[i] = c[i] / a[i]
    |     a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    |     for n in range(M):
    |         t = t + tau
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = b[i] - c[i] * b[i + 1]
    |     err = 0.0
    |     for i in range(N):
    |         err = max(err, abs(b[i] - math.exp(-4 * math.pi * math.pi * t) * math.sin(2 * math.pi * (i + 1) * h)))
    |     return err
    test : heat_implicit(9, 10, 0.005) → 3.352212e-02
    test : heat_implicit(19, 40, 0.00125) → 8.971245e-03
    test : heat_implicit(9, 20, 0.005) → 1.049475e-02
  pièges : n_heat_2tau, n_heat_tau_h

On résout ∂u/∂t − ∂²u/∂x² = 0 sur ]0 ; 1[, u(0, t) = u(1, t) = 0, u(x, 0) = sin(πx), par Euler rétrograde en t et différences centrées en x : Auⁿ⁺¹ = uⁿ avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) (a : diagonale, d : sous-diagonale, c : sur-diagonale), factorisée par Thomas. Traduction de exam1.m (2019, 2022), indices à partir de 0. Complète les trous.
  [code python, 1 trou]
    | def heat_implicit(N, M, tau):
    |     # Euler retrograde + differences finies centrees ; inconnue b[i] au point (i + 1) h
    |     h = 1 / (N + 1)
    |     t = 0.0
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     d = zeros(N - 1)
    |     for i in range(N):
    |         b[i] = math.sin(math.pi * (i + 1) * h)
    |     for i in range(N):
    |         a[i] = 1 + 2 * tau / (h * h)
    |     for i in range(N - 1):
    |         d[i] = -⟦tau / (h * h)⟧
    |         c[i] = -tau / (h * h)
    |     # A = LU (voir n-thomas)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - d[i - 1] * c[i - 1]
    |         c[i] = c[i] / a[i]
    |     a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    |     for n in range(M):
    |         t = t + tau
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = b[i] - c[i] * b[i + 1]
    |     err = 0.0
    |     for i in range(N):
    |         err = max(err, abs(b[i] - math.exp(-math.pi * math.pi * t) * math.sin(math.pi * (i + 1) * h)))
    |     return err
    test : heat_implicit(9, 10, 0.01) → 2.032035e-02
    test : heat_implicit(19, 40, 0.0025) → 5.238880e-03
    test : heat_implicit(9, 20, 0.005) → 1.184694e-02
  pièges : n_heat_tau_h, n_heat_2tau

On résout ∂u/∂t − ∂²u/∂x² = 0 sur ]0 ; 1[, u(0, t) = u(1, t) = 0, u(x, 0) = sin(πx), par Euler rétrograde en t et différences centrées en x : Auⁿ⁺¹ = uⁿ avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) (a : diagonale, d : sous-diagonale, c : sur-diagonale), factorisée par Thomas. Traduction de exam1.m (2019, 2022), indices à partir de 0. Complète les trous.
  [code python, 1 trou]
    | def heat_implicit(N, M, tau):
    |     # Euler retrograde + differences finies centrees ; inconnue b[i] au point (i + 1) h
    |     h = 1 / (N + 1)
    |     t = 0.0
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     d = zeros(N - 1)
    |     for i in range(N):
    |         b[i] = math.sin(math.pi * (i + 1) * h)
    |     for i in range(N):
    |         a[i] = 1 + ⟦2 * tau / (h * h)⟧
    |     for i in range(N - 1):
    |         d[i] = -tau / (h * h)
    |         c[i] = -tau / (h * h)
    |     # A = LU (voir n-thomas)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - d[i - 1] * c[i - 1]
    |         c[i] = c[i] / a[i]
    |     a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    |     for n in range(M):
    |         t = t + tau
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = b[i] - c[i] * b[i + 1]
    |     err = 0.0
    |     for i in range(N):
    |         err = max(err, abs(b[i] - math.exp(-math.pi * math.pi * t) * math.sin(math.pi * (i + 1) * h)))
    |     return err
    test : heat_implicit(9, 10, 0.01) → 2.032035e-02
    test : heat_implicit(19, 40, 0.0025) → 5.238880e-03
    test : heat_implicit(9, 20, 0.005) → 1.184694e-02
  pièges : n_heat_2tau, n_heat_tau_h

```

### Niveau 3

```
Chaleur ∂u/∂t = ∂²u/∂x², u(x, 0) = sin(πx), N = 2 (h = 1/3), τ = 1/9. Écris le schéma d'Euler implicite Au¹ = u⁰ : les coefficients de A, puis u₁¹. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  1 + 2·(1/9)/(1/3)²
    (Le coefficient diagonal de A.)
    ? En quel point écrit-on l'équation pour Euler rétrograde ? ✔ Au point (xᵢ, tₙ₊₁) : −∂²u/∂x² est pris au nouveau temps / · Au point (xᵢ, tₙ) : −∂²u/∂x² est pris à l'ancien temps
    = 3   ← τ/h² = 1
  — Le coefficient hors diagonale de A.  [juge value]  départ : −(1/9)/(1/3)²
    = −1   ← −τ/h²
  — u⁰ = (sin(π/3) ; sin(2π/3)) = (√3/2 ; √3/2). (1 ; 1) est vecteur propre de A pour la valeur propre 1 + τ/h² = 2, donc u¹ = u⁰/2.  [juge value]  départ : u_1
    = √3/4   ← (√3/2)/2
  aides : Multiplie l'équation par τ et mets toutes les inconnues uⁿ⁺¹ à gauche. | coefficient diagonal : 1 + 2·□ | A = tridiag(−1, 3, −1), u₁¹ = √3/4.
  pièges : n_heat_tau_h, n_heat_2tau, n_implicit_as_explicit

Chaleur ∂u/∂t = ∂²u/∂x², u(x, 0) = sin(πx), N = 2 (h = 1/3), τ = 1/9. Écris le schéma d'Euler implicite Au¹ = u⁰ : les coefficients de A, puis u₁¹. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  1 + 2·(1/9)/(1/3)²
    (Le coefficient diagonal de A.)
    ? En quel point écrit-on l'équation pour Euler rétrograde ? ✔ Au point (xᵢ, tₙ₊₁) : −∂²u/∂x² est pris au nouveau temps / · Au point (xᵢ, tₙ) : −∂²u/∂x² est pris à l'ancien temps
    = 3   ← τ/h² = 1
  — Le coefficient hors diagonale de A.  [juge value]  départ : −(1/9)/(1/3)²
    = −1   ← −τ/h²
  — u⁰ = (sin(π/3) ; sin(2π/3)) = (√3/2 ; √3/2). (1 ; 1) est vecteur propre de A pour la valeur propre 1 + τ/h² = 2, donc u¹ = u⁰/2.  [juge value]  départ : u_1
    = √3/4   ← (√3/2)/2
  aides : Multiplie l'équation par τ et mets toutes les inconnues uⁿ⁺¹ à gauche. | coefficient diagonal : 1 + 2·□ | A = tridiag(−1, 3, −1), u₁¹ = √3/4.
  pièges : n_heat_tau_h, n_heat_2tau, n_implicit_as_explicit

Chaleur ∂u/∂t = ∂²u/∂x², u(x, 0) = sin(2πx), N = 2 (h = 1/3), τ = 1/9. Écris le schéma d'Euler implicite Au¹ = u⁰ : les coefficients de A, puis u₁¹. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  1 + 2·(1/9)/(1/3)²
    (Le coefficient diagonal de A.)
    ? En quel point écrit-on l'équation pour Euler rétrograde ? ✔ Au point (xᵢ, tₙ₊₁) : −∂²u/∂x² est pris au nouveau temps / · Au point (xᵢ, tₙ) : −∂²u/∂x² est pris à l'ancien temps
    = 3   ← τ/h² = 1
  — Le coefficient hors diagonale de A.  [juge value]  départ : −(1/9)/(1/3)²
    = −1   ← −τ/h²
  — u⁰ = (sin(2π/3) ; sin(4π/3)) = (√3/2 ; −√3/2). (1 ; −1) est vecteur propre de A pour la valeur propre 1 + 3τ/h² = 4, donc u¹ = u⁰/4.  [juge value]  départ : u_1
    = √3/8   ← (√3/2)/4
  aides : Multiplie l'équation par τ et mets toutes les inconnues uⁿ⁺¹ à gauche. | coefficient diagonal : 1 + 2·□ | A = tridiag(−1, 3, −1), u₁¹ = √3/8.
  pièges : n_heat_tau_h, n_heat_2tau, n_implicit_as_explicit

```

### Niveau 4

```
On résout ∂u/∂t − ∂²u/∂x² = 0 sur ]0 ; 1[, u(0, t) = u(1, t) = 0, u(x, 0) = sin(2πx), par Euler rétrograde en t et différences centrées en x : Auⁿ⁺¹ = uⁿ avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) (a : diagonale, d : sous-diagonale, c : sur-diagonale), factorisée par Thomas. Traduction de exam1.m (2019, 2022), indices à partir de 0. Complète les trous.
  [code python, 4 trous]
    | def heat_implicit(N, M, tau):
    |     # Euler retrograde + differences finies centrees ; inconnue b[i] au point (i + 1) h
    |     h = 1 / (N + 1)
    |     t = 0.0
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     d = zeros(N - 1)
    |     for i in range(N):
    |         b[i] = ⟦math.sin(2 * math.pi * (i + 1) * h)⟧
    |     for i in range(N):
    |         a[i] = 1 + ⟦2 * tau / (h * h)⟧
    |     for i in range(N - 1):
    |         d[i] = -⟦tau / (h * h)⟧
    |         c[i] = -⟦tau / (h * h)⟧
    |     # A = LU (voir n-thomas)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - d[i - 1] * c[i - 1]
    |         c[i] = c[i] / a[i]
    |     a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    |     for n in range(M):
    |         t = t + tau
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = b[i] - c[i] * b[i + 1]
    |     err = 0.0
    |     for i in range(N):
    |         err = max(err, abs(b[i] - math.exp(-4 * math.pi * math.pi * t) * math.sin(2 * math.pi * (i + 1) * h)))
    |     return err
    test : heat_implicit(9, 10, 0.005) → 3.352212e-02
    test : heat_implicit(19, 40, 0.00125) → 8.971245e-03
    test : heat_implicit(9, 20, 0.005) → 1.049475e-02
  puis : Le programme donne ces erreurs :
      [tableau à lire]
        N | M | τ | erreur max au temps final
        9 | 10 | 0.005 | 3.352212e-02
        19 | 40 | 0.00125 | 8.971245e-03
        39 | 160 | 0.0003125 | 2.252158e-03
        79 | 640 | 0.000078125 | 5.636110e-04
      question : h est divisé par 2 et τ par 4 d'une ligne à la suivante (temps final fixe). Que peut-on déduire de ce tableau ? Une ou plusieurs réponses justes.
          · Ce tableau montre que le schéma est stable pour tous h > 0, τ > 0 [n_stab_order_confused]   ✔ Le schéma converge à l'ordre O(h² + τ)   · Le schéma converge à l'ordre O(h + τ) [n_heat_order_h_tau]   · Ce tableau montre que le schéma est stable seulement si τ ≤ h²/2 [n_stab_order_confused]
          pièges : n_heat_order_h_tau, n_stab_order_confused
      pièges : n_heat_order_h_tau, n_stab_order_confused
  pièges : n_heat_ic_tau, n_heat_2tau, n_heat_tau_h, n_heat_order_h_tau, n_stab_order_confused

On résout ∂u/∂t − ∂²u/∂x² = 0 sur ]0 ; 1[, u(0, t) = u(1, t) = 0, u(x, 0) = sin(2πx), par Euler rétrograde en t et différences centrées en x : Auⁿ⁺¹ = uⁿ avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) (a : diagonale, d : sous-diagonale, c : sur-diagonale), factorisée par Thomas. Traduction de exam1.m (2019, 2022), indices à partir de 0. Complète les trous.
  [code python, 4 trous]
    | def heat_implicit(N, M, tau):
    |     # Euler retrograde + differences finies centrees ; inconnue b[i] au point (i + 1) h
    |     h = 1 / (N + 1)
    |     t = 0.0
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     d = zeros(N - 1)
    |     for i in range(N):
    |         b[i] = ⟦math.sin(2 * math.pi * (i + 1) * h)⟧
    |     for i in range(N):
    |         a[i] = 1 + ⟦2 * tau / (h * h)⟧
    |     for i in range(N - 1):
    |         d[i] = -⟦tau / (h * h)⟧
    |         c[i] = -⟦tau / (h * h)⟧
    |     # A = LU (voir n-thomas)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - d[i - 1] * c[i - 1]
    |         c[i] = c[i] / a[i]
    |     a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    |     for n in range(M):
    |         t = t + tau
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = b[i] - c[i] * b[i + 1]
    |     err = 0.0
    |     for i in range(N):
    |         err = max(err, abs(b[i] - math.exp(-4 * math.pi * math.pi * t) * math.sin(2 * math.pi * (i + 1) * h)))
    |     return err
    test : heat_implicit(9, 10, 0.005) → 3.352212e-02
    test : heat_implicit(19, 40, 0.00125) → 8.971245e-03
    test : heat_implicit(9, 20, 0.005) → 1.049475e-02
  puis : Le programme donne ces erreurs :
      [tableau à lire]
        N | M | τ | erreur max au temps final
        9 | 10 | 0.005 | 3.352212e-02
        19 | 40 | 0.00125 | 8.971245e-03
        39 | 160 | 0.0003125 | 2.252158e-03
        79 | 640 | 0.000078125 | 5.636110e-04
      question : h est divisé par 2 et τ par 4 d'une ligne à la suivante (temps final fixe). Que peut-on déduire de ce tableau ? Une ou plusieurs réponses justes.
          ✔ Le schéma converge à l'ordre O(h² + τ)   · Ce tableau montre que le schéma est stable seulement si τ ≤ h²/2 [n_stab_order_confused]   · Ce tableau montre que le schéma est stable pour tous h > 0, τ > 0 [n_stab_order_confused]   · Le schéma converge à l'ordre O(h + τ) [n_heat_order_h_tau]
          pièges : n_heat_order_h_tau, n_stab_order_confused
      pièges : n_heat_order_h_tau, n_stab_order_confused
  pièges : n_heat_ic_tau, n_heat_2tau, n_heat_tau_h, n_heat_order_h_tau, n_stab_order_confused

On résout ∂u/∂t − ∂²u/∂x² = 0 sur ]0 ; 1[, u(0, t) = u(1, t) = 0, u(x, 0) = sin(πx), par Euler rétrograde en t et différences centrées en x : Auⁿ⁺¹ = uⁿ avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) (a : diagonale, d : sous-diagonale, c : sur-diagonale), factorisée par Thomas. Traduction de exam1.m (2019, 2022), indices à partir de 0. Complète les trous.
  [code python, 4 trous]
    | def heat_implicit(N, M, tau):
    |     # Euler retrograde + differences finies centrees ; inconnue b[i] au point (i + 1) h
    |     h = 1 / (N + 1)
    |     t = 0.0
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     d = zeros(N - 1)
    |     for i in range(N):
    |         b[i] = ⟦math.sin(math.pi * (i + 1) * h)⟧
    |     for i in range(N):
    |         a[i] = 1 + ⟦2 * tau / (h * h)⟧
    |     for i in range(N - 1):
    |         d[i] = -⟦tau / (h * h)⟧
    |         c[i] = -⟦tau / (h * h)⟧
    |     # A = LU (voir n-thomas)
    |     c[0] = c[0] / a[0]
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - d[i - 1] * c[i - 1]
    |         c[i] = c[i] / a[i]
    |     a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    |     for n in range(M):
    |         t = t + tau
    |         b[0] = b[0] / a[0]
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = b[i] - c[i] * b[i + 1]
    |     err = 0.0
    |     for i in range(N):
    |         err = max(err, abs(b[i] - math.exp(-math.pi * math.pi * t) * math.sin(math.pi * (i + 1) * h)))
    |     return err
    test : heat_implicit(9, 10, 0.01) → 2.032035e-02
    test : heat_implicit(19, 40, 0.0025) → 5.238880e-03
    test : heat_implicit(9, 20, 0.005) → 1.184694e-02
  puis : Le programme donne ces erreurs :
      [tableau à lire]
        N | M | τ | erreur max au temps final
        9 | 10 | 0.01 | 2.032035e-02
        19 | 40 | 0.0025 | 5.238880e-03
        39 | 160 | 0.000625 | 1.320115e-03
        79 | 640 | 0.00015625 | 3.306863e-04
      question : h est divisé par 2 et τ par 4 d'une ligne à la suivante (temps final fixe). Que peut-on déduire de ce tableau ? Une ou plusieurs réponses justes.
          ✔ Le schéma converge à l'ordre O(h² + τ)   · Ce tableau montre que le schéma est stable seulement si τ ≤ h²/2 [n_stab_order_confused]   · Ce tableau montre que le schéma est stable pour tous h > 0, τ > 0 [n_stab_order_confused]   · Le schéma converge à l'ordre O(h + τ) [n_heat_order_h_tau]
          pièges : n_heat_order_h_tau, n_stab_order_confused
      pièges : n_heat_order_h_tau, n_stab_order_confused
  pièges : n_heat_ic_tau, n_heat_2tau, n_heat_tau_h, n_heat_order_h_tau, n_stab_order_confused

```

### Niveau 5

```
On résout ∂u/∂t − ∂²u/∂x² = 0 sur ]0 ; 1[, u(0, t) = u(1, t) = 0, u(x, 0) = sin(2πx), par Euler rétrograde en t et différences centrées en x : Auⁿ⁺¹ = uⁿ avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) (a : diagonale, d : sous-diagonale, c : sur-diagonale), factorisée par Thomas. Traduction de exam1.m (2019, 2022), indices à partir de 0. Complète les trous.
  [code python, 11 trous, sans aide]
    | def heat_implicit(N, M, tau):
    |     # Euler retrograde + differences finies centrees ; inconnue b[i] au point (i + 1) h
    |     h = 1 / (N + 1)
    |     t = 0.0
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     d = zeros(N - 1)
    |     for i in range(N):
    |         b[i] = ⟦math.sin(2 * math.pi * (i + 1) * h)⟧
    |     for i in range(N):
    |         a[i] = 1 + ⟦2 * tau / (h * h)⟧
    |     for i in range(N - 1):
    |         d[i] = -⟦tau / (h * h)⟧
    |         c[i] = -⟦tau / (h * h)⟧
    |     # A = LU (voir n-thomas)
    |     c[0] = c[0] / ⟦a[0]⟧
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - ⟦d[i - 1] * c[i - 1]⟧
    |         c[i] = c[i] / ⟦a[i]⟧
    |     a[N - 1] = a[N - 1] - ⟦d[N - 2] * c[N - 2]⟧
    |     for n in range(M):
    |         t = t + tau
    |         b[0] = b[0] / ⟦a[0]⟧
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - ⟦d[i] * b[i]⟧) / a[i + 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = b[i] - ⟦c[i] * b[i + 1]⟧
    |     err = 0.0
    |     for i in range(N):
    |         err = max(err, abs(b[i] - math.exp(-4 * math.pi * math.pi * t) * math.sin(2 * math.pi * (i + 1) * h)))
    |     return err
    test : heat_implicit(9, 10, 0.005) → 3.352212e-02
    test : heat_implicit(19, 40, 0.00125) → 8.971245e-03
    test : heat_implicit(9, 20, 0.005) → 1.049475e-02
  puis : Le programme donne ces erreurs :
      [tableau à lire, sans aide]
        N | M | τ | erreur max au temps final
        9 | 10 | 0.005 | 3.352212e-02
        19 | 40 | 0.00125 | 8.971245e-03
        39 | 160 | 0.0003125 | 2.252158e-03
        79 | 640 | 0.000078125 | 5.636110e-04
      question : h est divisé par 2 et τ par 4 d'une ligne à la suivante (temps final fixe). Que peut-on déduire de ce tableau ? Une ou plusieurs réponses justes.
          · Le schéma converge à l'ordre O(h + τ) [n_heat_order_h_tau]   ✔ Le schéma converge à l'ordre O(h² + τ)   · Ce tableau montre que le schéma est stable seulement si τ ≤ h²/2 [n_stab_order_confused]   · Ce tableau montre que le schéma est stable pour tous h > 0, τ > 0 [n_stab_order_confused]
          pièges : n_heat_order_h_tau, n_stab_order_confused
      pièges : n_heat_order_h_tau, n_stab_order_confused
  pièges : n_heat_ic_tau, n_heat_2tau, n_heat_tau_h, n_thomas_index_shift, n_thomas_forget_last, n_thomas_lu_roles, n_heat_order_h_tau, n_stab_order_confused

On résout ∂u/∂t − ∂²u/∂x² = 0 sur ]0 ; 1[, u(0, t) = u(1, t) = 0, u(x, 0) = sin(πx), par Euler rétrograde en t et différences centrées en x : Auⁿ⁺¹ = uⁿ avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) (a : diagonale, d : sous-diagonale, c : sur-diagonale), factorisée par Thomas. Traduction de exam1.m (2019, 2022), indices à partir de 0. Complète les trous.
  [code python, 11 trous, sans aide]
    | def heat_implicit(N, M, tau):
    |     # Euler retrograde + differences finies centrees ; inconnue b[i] au point (i + 1) h
    |     h = 1 / (N + 1)
    |     t = 0.0
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     d = zeros(N - 1)
    |     for i in range(N):
    |         b[i] = ⟦math.sin(math.pi * (i + 1) * h)⟧
    |     for i in range(N):
    |         a[i] = 1 + ⟦2 * tau / (h * h)⟧
    |     for i in range(N - 1):
    |         d[i] = -⟦tau / (h * h)⟧
    |         c[i] = -⟦tau / (h * h)⟧
    |     # A = LU (voir n-thomas)
    |     c[0] = c[0] / ⟦a[0]⟧
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - ⟦d[i - 1] * c[i - 1]⟧
    |         c[i] = c[i] / ⟦a[i]⟧
    |     a[N - 1] = a[N - 1] - ⟦d[N - 2] * c[N - 2]⟧
    |     for n in range(M):
    |         t = t + tau
    |         b[0] = b[0] / ⟦a[0]⟧
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - ⟦d[i] * b[i]⟧) / a[i + 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = b[i] - ⟦c[i] * b[i + 1]⟧
    |     err = 0.0
    |     for i in range(N):
    |         err = max(err, abs(b[i] - math.exp(-math.pi * math.pi * t) * math.sin(math.pi * (i + 1) * h)))
    |     return err
    test : heat_implicit(9, 10, 0.01) → 2.032035e-02
    test : heat_implicit(19, 40, 0.0025) → 5.238880e-03
    test : heat_implicit(9, 20, 0.005) → 1.184694e-02
  puis : Le programme donne ces erreurs :
      [tableau à lire, sans aide]
        N | M | τ | erreur max au temps final
        9 | 10 | 0.01 | 2.032035e-02
        19 | 40 | 0.0025 | 5.238880e-03
        39 | 160 | 0.000625 | 1.320115e-03
        79 | 640 | 0.00015625 | 3.306863e-04
      question : h est divisé par 2 et τ par 4 d'une ligne à la suivante (temps final fixe). Que peut-on déduire de ce tableau ? Une ou plusieurs réponses justes.
          ✔ Le schéma converge à l'ordre O(h² + τ)   · Ce tableau montre que le schéma est stable seulement si τ ≤ h²/2 [n_stab_order_confused]   · Le schéma converge à l'ordre O(h + τ) [n_heat_order_h_tau]   · Ce tableau montre que le schéma est stable pour tous h > 0, τ > 0 [n_stab_order_confused]
          pièges : n_heat_order_h_tau, n_stab_order_confused
      pièges : n_heat_order_h_tau, n_stab_order_confused
  pièges : n_heat_ic_tau, n_heat_2tau, n_heat_tau_h, n_thomas_index_shift, n_thomas_forget_last, n_thomas_lu_roles, n_heat_order_h_tau, n_stab_order_confused

On résout ∂u/∂t − ∂²u/∂x² = 0 sur ]0 ; 1[, u(0, t) = u(1, t) = 0, u(x, 0) = sin(πx), par Euler rétrograde en t et différences centrées en x : Auⁿ⁺¹ = uⁿ avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) (a : diagonale, d : sous-diagonale, c : sur-diagonale), factorisée par Thomas. Traduction de exam1.m (2019, 2022), indices à partir de 0. Complète les trous.
  [code python, 11 trous, sans aide]
    | def heat_implicit(N, M, tau):
    |     # Euler retrograde + differences finies centrees ; inconnue b[i] au point (i + 1) h
    |     h = 1 / (N + 1)
    |     t = 0.0
    |     a = zeros(N)
    |     b = zeros(N)
    |     c = zeros(N - 1)
    |     d = zeros(N - 1)
    |     for i in range(N):
    |         b[i] = ⟦math.sin(math.pi * (i + 1) * h)⟧
    |     for i in range(N):
    |         a[i] = 1 + ⟦2 * tau / (h * h)⟧
    |     for i in range(N - 1):
    |         d[i] = -⟦tau / (h * h)⟧
    |         c[i] = -⟦tau / (h * h)⟧
    |     # A = LU (voir n-thomas)
    |     c[0] = c[0] / ⟦a[0]⟧
    |     for i in range(1, N - 1):
    |         a[i] = a[i] - ⟦d[i - 1] * c[i - 1]⟧
    |         c[i] = c[i] / ⟦a[i]⟧
    |     a[N - 1] = a[N - 1] - ⟦d[N - 2] * c[N - 2]⟧
    |     for n in range(M):
    |         t = t + tau
    |         b[0] = b[0] / ⟦a[0]⟧
    |         for i in range(N - 1):
    |             b[i + 1] = (b[i + 1] - ⟦d[i] * b[i]⟧) / a[i + 1]
    |         for i in range(N - 2, -1, -1):
    |             b[i] = b[i] - ⟦c[i] * b[i + 1]⟧
    |     err = 0.0
    |     for i in range(N):
    |         err = max(err, abs(b[i] - math.exp(-math.pi * math.pi * t) * math.sin(math.pi * (i + 1) * h)))
    |     return err
    test : heat_implicit(9, 10, 0.01) → 2.032035e-02
    test : heat_implicit(19, 40, 0.0025) → 5.238880e-03
    test : heat_implicit(9, 20, 0.005) → 1.184694e-02
  puis : Le programme donne ces erreurs :
      [tableau à lire, sans aide]
        N | M | τ | erreur max au temps final
        9 | 10 | 0.01 | 2.032035e-02
        19 | 40 | 0.0025 | 5.238880e-03
        39 | 160 | 0.000625 | 1.320115e-03
        79 | 640 | 0.00015625 | 3.306863e-04
      question : h est divisé par 2 et τ par 4 d'une ligne à la suivante (temps final fixe). Que peut-on déduire de ce tableau ? Une ou plusieurs réponses justes.
          ✔ Le schéma converge à l'ordre O(h² + τ)   · Le schéma converge à l'ordre O(h + τ) [n_heat_order_h_tau]   · Ce tableau montre que le schéma est stable seulement si τ ≤ h²/2 [n_stab_order_confused]   · Ce tableau montre que le schéma est stable pour tous h > 0, τ > 0 [n_stab_order_confused]
          pièges : n_heat_order_h_tau, n_stab_order_confused
      pièges : n_heat_order_h_tau, n_stab_order_confused
  pièges : n_heat_ic_tau, n_heat_2tau, n_heat_tau_h, n_thomas_index_shift, n_thomas_forget_last, n_thomas_lu_roles, n_heat_order_h_tau, n_stab_order_confused

```

### Variantes d'examen

```
On résout ∂u/∂t − ∂²u/∂x² = 0 sur ]0 ; 1[, u(0, t) = u(1, t) = 0, u(x, 0) = sin(πx), par Euler rétrograde en t et différences centrées en x : Auⁿ⁺¹ = uⁿ avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) (a : diagonale, d : sous-diagonale, c : sur-diagonale), factorisée par Thomas. Traduction de exam1.m (2019, 2022), indices à partir de 0.def heat_implicit(N, M, tau):
    # Euler retrograde + differences finies centrees ; inconnue b[i] au point (i + 1) h
    h = 1 / (N + 1)
    t = 0.0
    a = zeros(N)
    b = zeros(N)
    c = zeros(N - 1)
    d = zeros(N - 1)
    for i in range(N):
        b[i] = ???
    for i in range(N):
        a[i] = 1 + 2 * tau / (h * h)
    for i in range(N - 1):
        d[i] = -tau / (h * h)
        c[i] = -tau / (h * h)
    # A = LU (voir n-thomas)
    c[0] = c[0] / a[0]
    for i in range(1, N - 1):
        a[i] = a[i] - d[i - 1] * c[i - 1]
        c[i] = c[i] / a[i]
    a[N - 1] = a[N - 1] - d[N - 2] * c[N - 2]
    for n in range(M):
        t = t + tau
        b[0] = b[0] / a[0]
        for i in range(N - 1):
            b[i + 1] = (b[i + 1] - d[i] * b[i]) / a[i + 1]
        for i in range(N - 2, -1, -1):
            b[i] = b[i] - c[i] * b[i + 1]
    err = 0.0
    for i in range(N):
        err = max(err, abs(b[i] - math.exp(-math.pi * math.pi * t) * math.sin(math.pi * (i + 1) * h)))
    return err
Que faut-il écrire à la place de ??? ?
  · 0   · tau / (h * h) * math.sin(math.pi * (i + 1) * h) [n_heat_ic_tau]   · tau * math.sin(math.pi * (i + 1) * h) [n_heat_ic_tau]   ✔ math.sin(math.pi * (i + 1) * h)
  [examen mcq]
  pièges : n_heat_ic_tau

```

## Transport et ondes : schémas explicites, condition CFL (`n-pde-cfl`, BA4)

_Transport et ondes par des schémas explicites, stables seulement si τ ≤ h (condition CFL)._

### Niveau 1

```
Transport ∂u/∂t − ∂u/∂x = 0 sur ]0 ; 1[, u(x, 0) = 10(1 − x)³, u(1, t) = 0 ; la solution est u₀(x + t). Schéma explicite décentré : uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ. Traduction de exam2.m (2019), indices à partir de 0. Choisis ce qui manque.
  [code python, 1 trou]
    | def transport(N, M, tau):
    |     # du/dt - du/dx = 0, u(x,0) = 10 (1 - x)^3, u(1,t) = 0 ; decentre vers la droite
    |     h = 1 / (N + 1)
    |     uold = zeros(N)
    |     unew = zeros(N)
    |     for i in range(N):
    |         uold[i] = 10 * (1 - (i + 1) * h) ** 3
    |     t = 0.0
    |     for n in range(M):
    |         t = t + tau
    |         unew[N - 1] = uold[N - 1] * (1 - tau / h)
    |         for i in range(N - 2, -1, -1):
    |             unew[i] = ⟦·uold[i] * (1 - tau / h) + tau / h * uold[i - 1] [n_cfl_direction] | ✔uold[i] * (1 - tau / h) + tau / h * uold[i + 1] | ·uold[i] * (1 + tau / h) - tau / h * uold[i + 1] | ·uold[i] + tau / h * uold[i + 1]⟧
    |         for i in range(N):
    |             uold[i] = unew[i]
    |     err = 0.0
    |     for i in range(N):
    |         x = (i + 1) * h
    |         if x + t < 1:
    |             uex = 10 * (1 - x - t) ** 3
    |         else:
    |             uex = 0.0
    |         err = max(err, abs(unew[i] - uex))
    |     return err
    test : transport(9, 5, 0.09) → 6.435000e-02
    test : transport(19, 10, 0.045) → 3.465000e-02
  pièges : n_cfl_direction

Transport ∂u/∂t − ∂u/∂x = 0 sur ]0 ; 1[, u(x, 0) = 10(1 − x)³, u(1, t) = 0 ; la solution est u₀(x + t). Schéma explicite décentré : uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ. Traduction de exam2.m (2019), indices à partir de 0. Choisis ce qui manque.
  [code python, 1 trou]
    | def transport(N, M, tau):
    |     # du/dt - du/dx = 0, u(x,0) = 10 (1 - x)^3, u(1,t) = 0 ; decentre vers la droite
    |     h = 1 / (N + 1)
    |     uold = zeros(N)
    |     unew = zeros(N)
    |     for i in range(N):
    |         uold[i] = 10 * (1 - (i + 1) * h) ** 3
    |     t = 0.0
    |     for n in range(M):
    |         t = t + tau
    |         unew[N - 1] = uold[N - 1] * (1 - tau / h)
    |         for i in range(N - 2, -1, -1):
    |             unew[i] = ⟦·uold[i] * (1 - tau / h) + tau / h * uold[i - 1] [n_cfl_direction] | ✔uold[i] * (1 - tau / h) + tau / h * uold[i + 1] | ·uold[i] * (1 + tau / h) - tau / h * uold[i + 1] | ·uold[i] + tau / h * uold[i + 1]⟧
    |         for i in range(N):
    |             uold[i] = unew[i]
    |     err = 0.0
    |     for i in range(N):
    |         x = (i + 1) * h
    |         if x + t < 1:
    |             uex = 10 * (1 - x - t) ** 3
    |         else:
    |             uex = 0.0
    |         err = max(err, abs(unew[i] - uex))
    |     return err
    test : transport(9, 5, 0.09) → 6.435000e-02
    test : transport(19, 10, 0.045) → 3.465000e-02
  pièges : n_cfl_direction

Transport ∂u/∂t − ∂u/∂x = 0 sur ]0 ; 1[, u(x, 0) = 10(1 − x)³, u(1, t) = 0 ; la solution est u₀(x + t). Schéma explicite décentré : uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ. Traduction de exam2.m (2019), indices à partir de 0. Choisis ce qui manque.
  [code python, 1 trou]
    | def transport(N, M, tau):
    |     # du/dt - du/dx = 0, u(x,0) = 10 (1 - x)^3, u(1,t) = 0 ; decentre vers la droite
    |     h = 1 / (N + 1)
    |     uold = zeros(N)
    |     unew = zeros(N)
    |     for i in range(N):
    |         uold[i] = 10 * (1 - (i + 1) * h) ** 3
    |     t = 0.0
    |     for n in range(M):
    |         t = t + tau
    |         unew[N - 1] = uold[N - 1] * (1 - tau / h)
    |         for i in range(N - 2, -1, -1):
    |             unew[i] = ⟦·uold[i] * (1 - tau / h) + tau / h * uold[i - 1] [n_cfl_direction] | ✔uold[i] * (1 - tau / h) + tau / h * uold[i + 1] | ·uold[i] * (1 + tau / h) - tau / h * uold[i + 1] | ·uold[i] + tau / h * uold[i + 1]⟧
    |         for i in range(N):
    |             uold[i] = unew[i]
    |     err = 0.0
    |     for i in range(N):
    |         x = (i + 1) * h
    |         if x + t < 1:
    |             uex = 10 * (1 - x - t) ** 3
    |         else:
    |             uex = 0.0
    |         err = max(err, abs(unew[i] - uex))
    |     return err
    test : transport(9, 5, 0.09) → 6.435000e-02
    test : transport(19, 10, 0.045) → 3.465000e-02
  pièges : n_cfl_direction

```

### Niveau 2

```
Ondes ∂²u/∂t² = ∂²u/∂x², vitesse initiale nulle, h = 1/4, τ = 1/6. Schéma : uᵢⁿ⁺¹ = 2(1 − λ)uᵢⁿ + λ(uᵢ₋₁ⁿ + uᵢ₊₁ⁿ) − uᵢⁿ⁻¹ ; premier pas : uᵢ¹ = (1 − λ)uᵢ⁰ + (λ/2)(uᵢ₋₁⁰ + uᵢ₊₁⁰). Les valeurs u⁰ voisines sont uᵢ₋₁⁰ = −3, uᵢ⁰ = 2, uᵢ₊₁⁰ = −3.
  [guided]  (1/6)²/(1/4)²
    (Le paramètre λ.)
    = □   (trous : 4/9)   ← λ = τ²/h²
  — Le premier pas en xᵢ.  [juge value]  départ : (1 − 4/9)·(2) + ((4/9)/2)·(−3 + (−3))
    = □   (trous : −2/9)   ← Vitesse initiale nulle
  aides : Les deux dérivées sont d'ordre 2 : λ = τ²/h². | λ = (1/6)²/(□)² | λ = 4/9, uᵢ¹ = −2/9.
  pièges : n_wave_lambda

Ondes ∂²u/∂t² = ∂²u/∂x², vitesse initiale nulle, h = 1/5, τ = 2/15. Schéma : uᵢⁿ⁺¹ = 2(1 − λ)uᵢⁿ + λ(uᵢ₋₁ⁿ + uᵢ₊₁ⁿ) − uᵢⁿ⁻¹ ; premier pas : uᵢ¹ = (1 − λ)uᵢ⁰ + (λ/2)(uᵢ₋₁⁰ + uᵢ₊₁⁰). Les valeurs u⁰ voisines sont uᵢ₋₁⁰ = −2, uᵢ⁰ = 2, uᵢ₊₁⁰ = 4.
  [guided]  (2/15)²/(1/5)²
    (Le paramètre λ.)
    = □   (trous : 4/9)   ← λ = τ²/h²
  — Le premier pas en xᵢ.  [juge value]  départ : (1 − 4/9)·(2) + ((4/9)/2)·(−2 + 4)
    = □   (trous : 14/9)   ← Vitesse initiale nulle
  aides : Les deux dérivées sont d'ordre 2 : λ = τ²/h². | λ = (2/15)²/(□)² | λ = 4/9, uᵢ¹ = 14/9.
  pièges : n_wave_lambda

Ondes ∂²u/∂t² = ∂²u/∂x², vitesse initiale nulle, h = 1/4, τ = 1/8. Schéma : uᵢⁿ⁺¹ = 2(1 − λ)uᵢⁿ + λ(uᵢ₋₁ⁿ + uᵢ₊₁ⁿ) − uᵢⁿ⁻¹ ; premier pas : uᵢ¹ = (1 − λ)uᵢ⁰ + (λ/2)(uᵢ₋₁⁰ + uᵢ₊₁⁰). Les valeurs u⁰ voisines sont uᵢ₋₁⁰ = −1, uᵢ⁰ = 2, uᵢ₊₁⁰ = −2.
  [guided]  (1/8)²/(1/4)²
    (Le paramètre λ.)
    = □   (trous : 1/4)   ← λ = τ²/h²
  — Le premier pas en xᵢ.  [juge value]  départ : (1 − 1/4)·(2) + ((1/4)/2)·(−1 + (−2))
    = □   (trous : 9/8)   ← Vitesse initiale nulle
  aides : Les deux dérivées sont d'ordre 2 : λ = τ²/h². | λ = (1/8)²/(□)² | λ = 1/4, uᵢ¹ = 9/8.
  pièges : n_wave_lambda

```

### Niveau 3

```
Transport ∂u/∂t − ∂u/∂x = 0, schéma explicite décentré avec τ/h = 9/10. À l'instant n : uᵢ₋₁ⁿ = 6, uᵢⁿ = 6, uᵢ₊₁ⁿ = 7. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  u_i
    (uᵢⁿ⁺¹ par le schéma décentré.)
    ? Quel voisin utilise le schéma décentré ? ✔ Le voisin de droite uᵢ₊₁ⁿ : u(x, t) = u₀(x + t), l'information vient de la droite / · Le voisin de gauche uᵢ₋₁ⁿ
    = (1 − 9/10)·6 + 9/10·7   ← (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ
    = 69/10   ← Combinaison convexe
  — Le plus grand τ/h pour lequel les deux poids restent ≥ 0 (principe du maximum).  [juge value]  départ : r
    = 1   ← 1 − τ/h ≥ 0 ⇔ τ ≤ h (CFL)
  aides : La solution est transportée vers la gauche : on prend le voisin de droite. | uᵢⁿ⁺¹ = (1 − 9/10)·6 + 9/10·□ | uᵢⁿ⁺¹ = 69/10 ; poids ≥ 0 tant que τ ≤ h.
  pièges : n_cfl_direction

Transport ∂u/∂t − ∂u/∂x = 0, schéma explicite décentré avec τ/h = 9/10. À l'instant n : uᵢ₋₁ⁿ = 6, uᵢⁿ = 9, uᵢ₊₁ⁿ = 5. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  u_i
    (uᵢⁿ⁺¹ par le schéma décentré.)
    ? Quel voisin utilise le schéma décentré ? ✔ Le voisin de droite uᵢ₊₁ⁿ : u(x, t) = u₀(x + t), l'information vient de la droite / · Le voisin de gauche uᵢ₋₁ⁿ
    = (1 − 9/10)·9 + 9/10·5   ← (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ
    = 27/5   ← Combinaison convexe
  — Le plus grand τ/h pour lequel les deux poids restent ≥ 0 (principe du maximum).  [juge value]  départ : r
    = 1   ← 1 − τ/h ≥ 0 ⇔ τ ≤ h (CFL)
  aides : La solution est transportée vers la gauche : on prend le voisin de droite. | uᵢⁿ⁺¹ = (1 − 9/10)·9 + 9/10·□ | uᵢⁿ⁺¹ = 27/5 ; poids ≥ 0 tant que τ ≤ h.
  pièges : n_cfl_direction

Transport ∂u/∂t − ∂u/∂x = 0, schéma explicite décentré avec τ/h = 9/10. À l'instant n : uᵢ₋₁ⁿ = 5, uᵢⁿ = 9, uᵢ₊₁ⁿ = 7. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  u_i
    (uᵢⁿ⁺¹ par le schéma décentré.)
    ? Quel voisin utilise le schéma décentré ? ✔ Le voisin de droite uᵢ₊₁ⁿ : u(x, t) = u₀(x + t), l'information vient de la droite / · Le voisin de gauche uᵢ₋₁ⁿ
    = (1 − 9/10)·9 + 9/10·7   ← (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ
    = 36/5   ← Combinaison convexe
  — Le plus grand τ/h pour lequel les deux poids restent ≥ 0 (principe du maximum).  [juge value]  départ : r
    = 1   ← 1 − τ/h ≥ 0 ⇔ τ ≤ h (CFL)
  aides : La solution est transportée vers la gauche : on prend le voisin de droite. | uᵢⁿ⁺¹ = (1 − 9/10)·9 + 9/10·□ | uᵢⁿ⁺¹ = 36/5 ; poids ≥ 0 tant que τ ≤ h.
  pièges : n_cfl_direction

```

### Niveau 4

```
Montre le principe du maximum pour le schéma de transport uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ quand τ ≤ h (examen 2019, question 18) : touche les blocs dans l'ordre.
  [blocs order]
    1. Supposons τ ≤ h : les poids 1 − τ/h et τ/h sont ≥ 0, de somme 1.
    2. |uᵢⁿ⁺¹| ≤ (1 − τ/h)|uᵢⁿ| + (τ/h)|uᵢ₊₁ⁿ| (inégalité triangulaire).
    3. |uᵢⁿ⁺¹| ≤ (1 − τ/h)·max|uⁿ| + (τ/h)·max|uⁿ| = max|uⁿ|.
    4. Donc max|uⁿ⁺¹| ≤ max|uⁿ| ≤ … ≤ max|u⁰| : le schéma est stable.
    ✗ On écrit uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₋₁ⁿ, avec le voisin de gauche. [n_cfl_direction]
  pièges : n_cfl_direction

Montre le principe du maximum pour le schéma de transport uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ quand τ ≤ h (examen 2019, question 18) : touche les blocs dans l'ordre.
  [blocs order]
    1. Supposons τ ≤ h : les poids 1 − τ/h et τ/h sont ≥ 0, de somme 1.
    2. |uᵢⁿ⁺¹| ≤ (1 − τ/h)|uᵢⁿ| + (τ/h)|uᵢ₊₁ⁿ| (inégalité triangulaire).
    3. |uᵢⁿ⁺¹| ≤ (1 − τ/h)·max|uⁿ| + (τ/h)·max|uⁿ| = max|uⁿ|.
    4. Donc max|uⁿ⁺¹| ≤ max|uⁿ| ≤ … ≤ max|u⁰| : le schéma est stable.
    ✗ On écrit uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₋₁ⁿ, avec le voisin de gauche. [n_cfl_direction]
  pièges : n_cfl_direction

Montre le principe du maximum pour le schéma de transport uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ quand τ ≤ h (examen 2019, question 18) : touche les blocs dans l'ordre.
  [blocs order]
    1. Supposons τ ≤ h : les poids 1 − τ/h et τ/h sont ≥ 0, de somme 1.
    2. |uᵢⁿ⁺¹| ≤ (1 − τ/h)|uᵢⁿ| + (τ/h)|uᵢ₊₁ⁿ| (inégalité triangulaire).
    3. |uᵢⁿ⁺¹| ≤ (1 − τ/h)·max|uⁿ| + (τ/h)·max|uⁿ| = max|uⁿ|.
    4. Donc max|uⁿ⁺¹| ≤ max|uⁿ| ≤ … ≤ max|u⁰| : le schéma est stable.
    ✗ On écrit uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₋₁ⁿ, avec le voisin de gauche. [n_cfl_direction]
  pièges : n_cfl_direction

```

### Niveau 5

```
Transport ∂u/∂t − ∂u/∂x = 0 sur ]0 ; 1[, u(x, 0) = 10(1 − x)³, u(1, t) = 0 ; la solution est u₀(x + t). Schéma explicite décentré : uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ. Traduction de exam2.m (2019), indices à partir de 0. Complète les trous.
  [code python, 4 trous, sans aide]
    | def transport(N, M, tau):
    |     # du/dt - du/dx = 0, u(x,0) = 10 (1 - x)^3, u(1,t) = 0 ; decentre vers la droite
    |     h = 1 / (N + 1)
    |     uold = zeros(N)
    |     unew = zeros(N)
    |     for i in range(N):
    |         uold[i] = 10 * (1 - (i + 1) * h) ** 3
    |     t = 0.0
    |     for n in range(M):
    |         t = t + tau
    |         unew[N - 1] = ⟦uold[N - 1] * (1 - tau / h)⟧
    |         for i in range(N - 2, -1, -1):
    |             unew[i] = ⟦uold[i] * (1 - tau / h) + tau / h * uold[i + 1]⟧
    |         for i in range(N):
    |             uold[i] = unew[i]
    |     err = 0.0
    |     for i in range(N):
    |         x = (i + 1) * h
    |         if ⟦x + t < 1⟧:
    |             uex = ⟦10 * (1 - x - t) ** 3⟧
    |         else:
    |             uex = 0.0
    |         err = max(err, abs(unew[i] - uex))
    |     return err
    test : transport(9, 5, 0.09) → 6.435000e-02
    test : transport(19, 10, 0.045) → 3.465000e-02
  puis : Le programme donne :
      [tableau à lire, sans aide]
        N | M | τ = 0,9h | erreur max
        9 | 5 | 0.09 | 6.435000e-02
        19 | 10 | 0.045 | 3.465000e-02
        39 | 20 | 0.0225 | 1.794375e-02
        79 | 40 | 0.01125 | 9.126562e-03
      question : Erreurs du schéma de transport avec τ = 0,9h (h = 1/(N + 1)). Que peut-on en déduire ? Une ou plusieurs réponses justes.
          · Il serait encore stable avec τ = 1,1h   · Il converge à l'ordre O(h² + τ²)   ✔ Il converge à l'ordre O(h + τ) : l'erreur est divisée par 2 quand h et τ le sont   ✔ Le schéma est stable pour τ = 0,9h
  pièges : n_cfl_direction

Transport ∂u/∂t − ∂u/∂x = 0 sur ]0 ; 1[, u(x, 0) = 10(1 − x)³, u(1, t) = 0 ; la solution est u₀(x + t). Schéma explicite décentré : uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ. Traduction de exam2.m (2019), indices à partir de 0. Complète les trous.
  [code python, 4 trous, sans aide]
    | def transport(N, M, tau):
    |     # du/dt - du/dx = 0, u(x,0) = 10 (1 - x)^3, u(1,t) = 0 ; decentre vers la droite
    |     h = 1 / (N + 1)
    |     uold = zeros(N)
    |     unew = zeros(N)
    |     for i in range(N):
    |         uold[i] = 10 * (1 - (i + 1) * h) ** 3
    |     t = 0.0
    |     for n in range(M):
    |         t = t + tau
    |         unew[N - 1] = ⟦uold[N - 1] * (1 - tau / h)⟧
    |         for i in range(N - 2, -1, -1):
    |             unew[i] = ⟦uold[i] * (1 - tau / h) + tau / h * uold[i + 1]⟧
    |         for i in range(N):
    |             uold[i] = unew[i]
    |     err = 0.0
    |     for i in range(N):
    |         x = (i + 1) * h
    |         if ⟦x + t < 1⟧:
    |             uex = ⟦10 * (1 - x - t) ** 3⟧
    |         else:
    |             uex = 0.0
    |         err = max(err, abs(unew[i] - uex))
    |     return err
    test : transport(9, 5, 0.09) → 6.435000e-02
    test : transport(19, 10, 0.045) → 3.465000e-02
  puis : Le programme donne :
      [tableau à lire, sans aide]
        N | M | τ = 0,9h | erreur max
        9 | 5 | 0.09 | 6.435000e-02
        19 | 10 | 0.045 | 3.465000e-02
        39 | 20 | 0.0225 | 1.794375e-02
        79 | 40 | 0.01125 | 9.126562e-03
      question : Erreurs du schéma de transport avec τ = 0,9h (h = 1/(N + 1)). Que peut-on en déduire ? Une ou plusieurs réponses justes.
          · Il serait encore stable avec τ = 1,1h   · Il converge à l'ordre O(h² + τ²)   ✔ Il converge à l'ordre O(h + τ) : l'erreur est divisée par 2 quand h et τ le sont   ✔ Le schéma est stable pour τ = 0,9h
  pièges : n_cfl_direction

Transport ∂u/∂t − ∂u/∂x = 0 sur ]0 ; 1[, u(x, 0) = 10(1 − x)³, u(1, t) = 0 ; la solution est u₀(x + t). Schéma explicite décentré : uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ. Traduction de exam2.m (2019), indices à partir de 0. Complète les trous.
  [code python, 4 trous, sans aide]
    | def transport(N, M, tau):
    |     # du/dt - du/dx = 0, u(x,0) = 10 (1 - x)^3, u(1,t) = 0 ; decentre vers la droite
    |     h = 1 / (N + 1)
    |     uold = zeros(N)
    |     unew = zeros(N)
    |     for i in range(N):
    |         uold[i] = 10 * (1 - (i + 1) * h) ** 3
    |     t = 0.0
    |     for n in range(M):
    |         t = t + tau
    |         unew[N - 1] = ⟦uold[N - 1] * (1 - tau / h)⟧
    |         for i in range(N - 2, -1, -1):
    |             unew[i] = ⟦uold[i] * (1 - tau / h) + tau / h * uold[i + 1]⟧
    |         for i in range(N):
    |             uold[i] = unew[i]
    |     err = 0.0
    |     for i in range(N):
    |         x = (i + 1) * h
    |         if ⟦x + t < 1⟧:
    |             uex = ⟦10 * (1 - x - t) ** 3⟧
    |         else:
    |             uex = 0.0
    |         err = max(err, abs(unew[i] - uex))
    |     return err
    test : transport(9, 5, 0.09) → 6.435000e-02
    test : transport(19, 10, 0.045) → 3.465000e-02
  puis : Le programme donne :
      [tableau à lire, sans aide]
        N | M | τ = 0,9h | erreur max
        9 | 5 | 0.09 | 6.435000e-02
        19 | 10 | 0.045 | 3.465000e-02
        39 | 20 | 0.0225 | 1.794375e-02
        79 | 40 | 0.01125 | 9.126562e-03
      question : Erreurs du schéma de transport avec τ = 0,9h (h = 1/(N + 1)). Que peut-on en déduire ? Une ou plusieurs réponses justes.
          · Il serait encore stable avec τ = 1,1h   · Il converge à l'ordre O(h² + τ²)   ✔ Il converge à l'ordre O(h + τ) : l'erreur est divisée par 2 quand h et τ le sont   ✔ Le schéma est stable pour τ = 0,9h
  pièges : n_cfl_direction

```

### Variantes d'examen

```
Schéma explicite pour les ondes avec h = 1/20 et τ = 1/80 : uᵢⁿ⁺¹ = 2(1 − λ)uᵢⁿ + λ(uᵢ₋₁ⁿ + uᵢ₊₁ⁿ) − uᵢⁿ⁻¹. Que vaut λ ?
  ✔ 1/16   · 1/4 [n_wave_lambda]   · 5 [n_wave_lambda]   · 1/320 [n_wave_lambda]
  [examen mcq]
  pièges : n_wave_lambda

```

## Forme faible et fonctions chapeau (`n-fem-hat`, BA4)

_La forme faible ∫u′v′ = ∫fv et la méthode de Galerkin avec des fonctions chapeau._

### Niveau 1

```
On écrit la forme faible de −u″ = f sur ]0 ; 1[, u(0) = 0, u(1) = 0 : trouver u ∈ V tel que ∫u′v′ = ∫fv pour tout v ∈ V. Quel est l'espace V ?
  · {g continue sur [0 ; 1], g′ continue par morceaux} [n_weak_space_bc]   ✔ {g continue sur [0 ; 1], g′ continue par morceaux, g(0) = g(1) = 0}   · {g continue sur [0 ; 1], g′ continue par morceaux, g(0) = 0} [n_weak_space_bc]   · {g continue sur [0 ; 1], g′ continue par morceaux, g′(0) = g′(1) = 0} [n_weak_space_bc]
  pièges : n_weak_space_bc

On écrit la forme faible de −u″ = f sur ]0 ; 1[, u(0) = 0, u(1) = 0 : trouver u ∈ V tel que ∫u′v′ = ∫fv pour tout v ∈ V. Quel est l'espace V ?
  · {g continue sur [0 ; 1], g′ continue par morceaux, g(0) = 0} [n_weak_space_bc]   · {g continue sur [0 ; 1], g′ continue par morceaux, g′(0) = g′(1) = 0} [n_weak_space_bc]   ✔ {g continue sur [0 ; 1], g′ continue par morceaux, g(0) = g(1) = 0}   · {g continue sur [0 ; 1], g′ continue par morceaux} [n_weak_space_bc]
  pièges : n_weak_space_bc

On écrit la forme faible de −u″ = f sur ]0 ; 1[, u(0) = 0, u′(1) = 0 : trouver u ∈ V tel que ∫u′v′ = ∫fv pour tout v ∈ V. Quel est l'espace V ?
  · {g continue sur [0 ; 1], g′ continue par morceaux, g′(0) = g′(1) = 0} [n_weak_space_bc]   ✔ {g continue sur [0 ; 1], g′ continue par morceaux, g(0) = 0}   · {g continue sur [0 ; 1], g′ continue par morceaux} [n_weak_space_bc]   · {g continue sur [0 ; 1], g′ continue par morceaux, g(0) = g(1) = 0} [n_weak_space_bc]
  pièges : n_weak_space_bc

```

### Niveau 2

```
−u″ = x sur ]0 ; 1[, u(0) = u(1) = 0. Galerkin avec V_h = span(φ₁), où φ₁ est la fonction chapeau de sommet (1/4 ; 1) : φ₁ = 4x sur [0 ; 1/4], (4/3)(1 − x) sur [1/4 ; 1]. Calcule u_h = αφ₁.
  [guided]  (4)²·1/4 + (4/3)²·3/4
    (∫₀¹ (φ₁′)² : φ₁′ = 4 sur ]0 ; 1/4[, −4/3 sur ]1/4 ; 1[.)
    = □   (trous : 16/3)   ← pente² × longueur, sur chaque morceau
  — ∫₀¹ f·φ₁ avec f = x.  [juge value]  départ : F
    = □   (trous : 5/24)   ← ∫₀ᶜ x²/c + ∫꜀¹ x(1 − x)/(1 − c)
  — u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁.  [juge value]  départ : α
    ? Quelle est la forme faible ? ✔ ∫u′v′ = ∫fv pour tout v ∈ V / · −∫u′v′ = ∫fv pour tout v ∈ V / · ∫u″v = ∫fv pour tout v ∈ V
    = □   (trous : 5/128)   ← = u(1/4) : la méthode est exacte aux nœuds
  aides : Avec u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁. | φ₁′ vaut 4 puis −4/3, donc ∫(φ₁′)² = □ | ∫(φ₁′)² = 16/3, ∫fφ₁ = 5/24, donc α = 5/128.
  pièges : n_hat_derivative, n_weak_sign

−u″ = 2 sur ]0 ; 1[, u(0) = u(1) = 0. Galerkin avec V_h = span(φ₁), où φ₁ est la fonction chapeau de sommet (3/4 ; 1) : φ₁ = (4/3)x sur [0 ; 3/4], 4(1 − x) sur [3/4 ; 1]. Calcule u_h = αφ₁.
  [guided]  (4/3)²·3/4 + (4)²·1/4
    (∫₀¹ (φ₁′)² : φ₁′ = 4/3 sur ]0 ; 3/4[, −4 sur ]3/4 ; 1[.)
    = □   (trous : 16/3)   ← pente² × longueur, sur chaque morceau
  — ∫₀¹ f·φ₁ avec f = 2.  [juge value]  départ : F
    = □   (trous : 1)   ← 2 × aire du triangle (base 1, hauteur 1)
  — u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁.  [juge value]  départ : α
    ? Quelle est la forme faible ? ✔ ∫u′v′ = ∫fv pour tout v ∈ V / · −∫u′v′ = ∫fv pour tout v ∈ V / · ∫u″v = ∫fv pour tout v ∈ V
    = □   (trous : 3/16)   ← = u(3/4) : la méthode est exacte aux nœuds
  aides : Avec u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁. | φ₁′ vaut 4/3 puis −4, donc ∫(φ₁′)² = □ | ∫(φ₁′)² = 16/3, ∫fφ₁ = 1, donc α = 3/16.
  pièges : n_hat_derivative, n_weak_sign

−u″ = x sur ]0 ; 1[, u(0) = u(1) = 0. Galerkin avec V_h = span(φ₁), où φ₁ est la fonction chapeau de sommet (1/2 ; 1) : φ₁ = 2x sur [0 ; 1/2], 2(1 − x) sur [1/2 ; 1]. Calcule u_h = αφ₁.
  [guided]  (2)²·1/2 + (2)²·1/2
    (∫₀¹ (φ₁′)² : φ₁′ = 2 sur ]0 ; 1/2[, −2 sur ]1/2 ; 1[.)
    = □   (trous : 4)   ← pente² × longueur, sur chaque morceau
  — ∫₀¹ f·φ₁ avec f = x.  [juge value]  départ : F
    = □   (trous : 1/4)   ← ∫₀ᶜ x²/c + ∫꜀¹ x(1 − x)/(1 − c)
  — u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁.  [juge value]  départ : α
    ? Quelle est la forme faible ? ✔ ∫u′v′ = ∫fv pour tout v ∈ V / · −∫u′v′ = ∫fv pour tout v ∈ V / · ∫u″v = ∫fv pour tout v ∈ V
    = □   (trous : 1/16)   ← = u(1/2) : la méthode est exacte aux nœuds
  aides : Avec u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁. | φ₁′ vaut 2 puis −2, donc ∫(φ₁′)² = □ | ∫(φ₁′)² = 4, ∫fφ₁ = 1/4, donc α = 1/16.
  pièges : n_hat_derivative, n_weak_sign

```

### Niveau 3

```
−u″ = 1 sur ]0 ; 1[, u(0) = u(1) = 0. Galerkin avec V_h = span(φ₁), où φ₁ est la fonction chapeau de sommet (3/4 ; 1) : φ₁ = (4/3)x sur [0 ; 3/4], 4(1 − x) sur [3/4 ; 1]. Calcule u_h = αφ₁. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  (4/3)²·3/4 + (4)²·1/4
    (∫₀¹ (φ₁′)² : φ₁′ = 4/3 sur ]0 ; 3/4[, −4 sur ]3/4 ; 1[.)
    = 16/3   ← pente² × longueur, sur chaque morceau
  — ∫₀¹ f·φ₁ avec f = 1.  [juge value]  départ : F
    = 1/2   ← 1 × aire du triangle (base 1, hauteur 1)
  — u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁.  [juge value]  départ : α
    ? Quelle est la forme faible ? ✔ ∫u′v′ = ∫fv pour tout v ∈ V / · −∫u′v′ = ∫fv pour tout v ∈ V / · ∫u″v = ∫fv pour tout v ∈ V
    = 3/32   ← = u(3/4) : la méthode est exacte aux nœuds
  aides : Avec u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁. | φ₁′ vaut 4/3 puis −4, donc ∫(φ₁′)² = □ | ∫(φ₁′)² = 16/3, ∫fφ₁ = 1/2, donc α = 3/32.
  pièges : n_hat_derivative, n_weak_sign

−u″ = 1 sur ]0 ; 1[, u(0) = u(1) = 0. Galerkin avec V_h = span(φ₁), où φ₁ est la fonction chapeau de sommet (1/3 ; 1) : φ₁ = 3x sur [0 ; 1/3], (3/2)(1 − x) sur [1/3 ; 1]. Calcule u_h = αφ₁. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  (3)²·1/3 + (3/2)²·2/3
    (∫₀¹ (φ₁′)² : φ₁′ = 3 sur ]0 ; 1/3[, −3/2 sur ]1/3 ; 1[.)
    = 9/2   ← pente² × longueur, sur chaque morceau
  — ∫₀¹ f·φ₁ avec f = 1.  [juge value]  départ : F
    = 1/2   ← 1 × aire du triangle (base 1, hauteur 1)
  — u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁.  [juge value]  départ : α
    ? Quelle est la forme faible ? ✔ ∫u′v′ = ∫fv pour tout v ∈ V / · −∫u′v′ = ∫fv pour tout v ∈ V / · ∫u″v = ∫fv pour tout v ∈ V
    = 1/9   ← = u(1/3) : la méthode est exacte aux nœuds
  aides : Avec u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁. | φ₁′ vaut 3 puis −3/2, donc ∫(φ₁′)² = □ | ∫(φ₁′)² = 9/2, ∫fφ₁ = 1/2, donc α = 1/9.
  pièges : n_hat_derivative, n_weak_sign

−u″ = 2 sur ]0 ; 1[, u(0) = u(1) = 0. Galerkin avec V_h = span(φ₁), où φ₁ est la fonction chapeau de sommet (1/3 ; 1) : φ₁ = 3x sur [0 ; 1/3], (3/2)(1 − x) sur [1/3 ; 1]. Calcule u_h = αφ₁. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  (3)²·1/3 + (3/2)²·2/3
    (∫₀¹ (φ₁′)² : φ₁′ = 3 sur ]0 ; 1/3[, −3/2 sur ]1/3 ; 1[.)
    = 9/2   ← pente² × longueur, sur chaque morceau
  — ∫₀¹ f·φ₁ avec f = 2.  [juge value]  départ : F
    = 1   ← 2 × aire du triangle (base 1, hauteur 1)
  — u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁.  [juge value]  départ : α
    ? Quelle est la forme faible ? ✔ ∫u′v′ = ∫fv pour tout v ∈ V / · −∫u′v′ = ∫fv pour tout v ∈ V / · ∫u″v = ∫fv pour tout v ∈ V
    = 2/9   ← = u(1/3) : la méthode est exacte aux nœuds
  aides : Avec u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁. | φ₁′ vaut 3 puis −3/2, donc ∫(φ₁′)² = □ | ∫(φ₁′)² = 9/2, ∫fφ₁ = 1, donc α = 2/9.
  pièges : n_hat_derivative, n_weak_sign

```

### Niveau 4

```
−u″ = 1 sur ]0 ; 1[, u(0) = u(1) = 0. Galerkin avec V_h = span(φ₁), où φ₁ est la fonction chapeau de sommet (2/3 ; 1) : φ₁ = (3/2)x sur [0 ; 2/3], 3(1 − x) sur [2/3 ; 1]. Calcule u_h = αφ₁.
  [free, suivre l'erreur]  (3/2)²·2/3 + (3)²·1/3
    (∫₀¹ (φ₁′)² : φ₁′ = 3/2 sur ]0 ; 2/3[, −3 sur ]2/3 ; 1[.)
    = 9/2   ← pente² × longueur, sur chaque morceau
  — ∫₀¹ f·φ₁ avec f = 1.  [juge value]  départ : F
    = 1/2   ← 1 × aire du triangle (base 1, hauteur 1)
  — u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁.  [juge value]  départ : α
    ? Quelle est la forme faible ? ✔ ∫u′v′ = ∫fv pour tout v ∈ V / · −∫u′v′ = ∫fv pour tout v ∈ V / · ∫u″v = ∫fv pour tout v ∈ V
    = 1/9   ← = u(2/3) : la méthode est exacte aux nœuds
  aides : Avec u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁. | φ₁′ vaut 3/2 puis −3, donc ∫(φ₁′)² = □ | ∫(φ₁′)² = 9/2, ∫fφ₁ = 1/2, donc α = 1/9.
  pièges : n_hat_derivative, n_weak_sign

−u″ = x sur ]0 ; 1[, u(0) = u(1) = 0. Galerkin avec V_h = span(φ₁), où φ₁ est la fonction chapeau de sommet (2/3 ; 1) : φ₁ = (3/2)x sur [0 ; 2/3], 3(1 − x) sur [2/3 ; 1]. Calcule u_h = αφ₁.
  [free, suivre l'erreur]  (3/2)²·2/3 + (3)²·1/3
    (∫₀¹ (φ₁′)² : φ₁′ = 3/2 sur ]0 ; 2/3[, −3 sur ]2/3 ; 1[.)
    = 9/2   ← pente² × longueur, sur chaque morceau
  — ∫₀¹ f·φ₁ avec f = x.  [juge value]  départ : F
    = 5/18   ← ∫₀ᶜ x²/c + ∫꜀¹ x(1 − x)/(1 − c)
  — u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁.  [juge value]  départ : α
    ? Quelle est la forme faible ? ✔ ∫u′v′ = ∫fv pour tout v ∈ V / · −∫u′v′ = ∫fv pour tout v ∈ V / · ∫u″v = ∫fv pour tout v ∈ V
    = 5/81   ← = u(2/3) : la méthode est exacte aux nœuds
  aides : Avec u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁. | φ₁′ vaut 3/2 puis −3, donc ∫(φ₁′)² = □ | ∫(φ₁′)² = 9/2, ∫fφ₁ = 5/18, donc α = 5/81.
  pièges : n_hat_derivative, n_weak_sign

−u″ = 2 sur ]0 ; 1[, u(0) = u(1) = 0. Galerkin avec V_h = span(φ₁), où φ₁ est la fonction chapeau de sommet (1/3 ; 1) : φ₁ = 3x sur [0 ; 1/3], (3/2)(1 − x) sur [1/3 ; 1]. Calcule u_h = αφ₁.
  [free, suivre l'erreur]  (3)²·1/3 + (3/2)²·2/3
    (∫₀¹ (φ₁′)² : φ₁′ = 3 sur ]0 ; 1/3[, −3/2 sur ]1/3 ; 1[.)
    = 9/2   ← pente² × longueur, sur chaque morceau
  — ∫₀¹ f·φ₁ avec f = 2.  [juge value]  départ : F
    = 1   ← 2 × aire du triangle (base 1, hauteur 1)
  — u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁.  [juge value]  départ : α
    ? Quelle est la forme faible ? ✔ ∫u′v′ = ∫fv pour tout v ∈ V / · −∫u′v′ = ∫fv pour tout v ∈ V / · ∫u″v = ∫fv pour tout v ∈ V
    = 2/9   ← = u(1/3) : la méthode est exacte aux nœuds
  aides : Avec u_h = αφ₁ et v = φ₁ : α·∫(φ₁′)² = ∫fφ₁. | φ₁′ vaut 3 puis −3/2, donc ∫(φ₁′)² = □ | ∫(φ₁′)² = 9/2, ∫fφ₁ = 1, donc α = 2/9.
  pièges : n_hat_derivative, n_weak_sign

```

### Niveau 5

```
Complète la méthode des éléments finis P1 (N fonctions chapeau intérieures, h = 1/(N + 1)) : Kᵢⱼ = ∫φᵢ′φⱼ′, Fᵢ = ∫φᵢ.
  [code python, 3 trous, sans aide]
    | def fem_hat(N):
    |     # -u'' = 1 sur ]0;1[, u(0) = u(1) = 0, N fonctions chapeau interieures
    |     h = 1 / (N + 1)
    |     K = zeros2(N, N)
    |     F = zeros(N)
    |     for i in range(N):
    |         K[i][i] = ⟦2 / h⟧
    |         if i > 0:
    |             K[i][i - 1] = ⟦-1 / h⟧
    |         if i < N - 1:
    |             K[i][i + 1] = -1 / h
    |         F[i] = ⟦h⟧   # integrale de 1 * phi_i
    |     return solve(K, F)
    test : fem_hat(1) → [0.125]
    test : fem_hat(3) → [0.09375, 0.125, 0.09375]
  puis : fem_hat(3) donne les coefficients uⱼ de u_h = Σ uⱼφⱼ ; on les compare à u(x) = x(1 − x)/2 aux nœuds xⱼ.
      [tableau à lire, sans aide]
        xⱼ | uⱼ | u(xⱼ)
        0.25 | 0.09375 | 0.09375
        0.5 | 0.125 | 0.125
        0.75 | 0.09375 | 0.09375
      question : Cocher les affirmations vraies. Une ou plusieurs réponses justes.
          · La matrice de rigidité est K = (1/h²)·tridiag(−1, 2, −1) [n_bvp_h2_missing]   ✔ La matrice de rigidité est K = (1/h)·tridiag(−1, 2, −1)   · u_h = u sur tout [0 ; 1]   ✔ u_h(xⱼ) = uⱼ = u(xⱼ) : en 1D, la méthode est exacte aux nœuds
          pièges : n_bvp_h2_missing
      pièges : n_bvp_h2_missing
  pièges : n_bvp_h2_missing

Complète la méthode des éléments finis P1 (N fonctions chapeau intérieures, h = 1/(N + 1)) : Kᵢⱼ = ∫φᵢ′φⱼ′, Fᵢ = ∫φᵢ.
  [code python, 3 trous, sans aide]
    | def fem_hat(N):
    |     # -u'' = 1 sur ]0;1[, u(0) = u(1) = 0, N fonctions chapeau interieures
    |     h = 1 / (N + 1)
    |     K = zeros2(N, N)
    |     F = zeros(N)
    |     for i in range(N):
    |         K[i][i] = ⟦2 / h⟧
    |         if i > 0:
    |             K[i][i - 1] = ⟦-1 / h⟧
    |         if i < N - 1:
    |             K[i][i + 1] = -1 / h
    |         F[i] = ⟦h⟧   # integrale de 1 * phi_i
    |     return solve(K, F)
    test : fem_hat(1) → [0.125]
    test : fem_hat(3) → [0.09375, 0.125, 0.09375]
  puis : fem_hat(3) donne les coefficients uⱼ de u_h = Σ uⱼφⱼ ; on les compare à u(x) = x(1 − x)/2 aux nœuds xⱼ.
      [tableau à lire, sans aide]
        xⱼ | uⱼ | u(xⱼ)
        0.25 | 0.09375 | 0.09375
        0.5 | 0.125 | 0.125
        0.75 | 0.09375 | 0.09375
      question : Cocher les affirmations vraies. Une ou plusieurs réponses justes.
          ✔ La matrice de rigidité est K = (1/h)·tridiag(−1, 2, −1)   ✔ u_h(xⱼ) = uⱼ = u(xⱼ) : en 1D, la méthode est exacte aux nœuds   · u_h = u sur tout [0 ; 1]   · La matrice de rigidité est K = (1/h²)·tridiag(−1, 2, −1) [n_bvp_h2_missing]
          pièges : n_bvp_h2_missing
      pièges : n_bvp_h2_missing
  pièges : n_bvp_h2_missing

Complète la méthode des éléments finis P1 (N fonctions chapeau intérieures, h = 1/(N + 1)) : Kᵢⱼ = ∫φᵢ′φⱼ′, Fᵢ = ∫φᵢ.
  [code python, 3 trous, sans aide]
    | def fem_hat(N):
    |     # -u'' = 1 sur ]0;1[, u(0) = u(1) = 0, N fonctions chapeau interieures
    |     h = 1 / (N + 1)
    |     K = zeros2(N, N)
    |     F = zeros(N)
    |     for i in range(N):
    |         K[i][i] = ⟦2 / h⟧
    |         if i > 0:
    |             K[i][i - 1] = ⟦-1 / h⟧
    |         if i < N - 1:
    |             K[i][i + 1] = -1 / h
    |         F[i] = ⟦h⟧   # integrale de 1 * phi_i
    |     return solve(K, F)
    test : fem_hat(1) → [0.125]
    test : fem_hat(3) → [0.09375, 0.125, 0.09375]
  puis : fem_hat(5) donne les coefficients uⱼ de u_h = Σ uⱼφⱼ ; on les compare à u(x) = x(1 − x)/2 aux nœuds xⱼ.
      [tableau à lire, sans aide]
        xⱼ | uⱼ | u(xⱼ)
        0.166667 | 0.06944444444 | 0.06944444444
        0.333333 | 0.1111111111 | 0.1111111111
        0.5 | 0.125 | 0.125
        0.666667 | 0.1111111111 | 0.1111111111
        0.833333 | 0.06944444444 | 0.06944444444
      question : Cocher les affirmations vraies. Une ou plusieurs réponses justes.
          · La matrice de rigidité est K = (1/h²)·tridiag(−1, 2, −1) [n_bvp_h2_missing]   ✔ u_h(xⱼ) = uⱼ = u(xⱼ) : en 1D, la méthode est exacte aux nœuds   ✔ La matrice de rigidité est K = (1/h)·tridiag(−1, 2, −1)   · u_h = u sur tout [0 ; 1]
          pièges : n_bvp_h2_missing
      pièges : n_bvp_h2_missing
  pièges : n_bvp_h2_missing

```

### Variantes d'examen

```
−u″ = x sur ]0 ; 1[, u(0) = u(1) = 0, V₁ = span(φ₁), φ₁ est la fonction chapeau de sommet (1/3 ; 1) : φ₁ = 3x sur [0 ; 1/3], (3/2)(1 − x) sur [1/3 ; 1]. On cherche u₁ = αφ₁ par Galerkin. Que vaut α ?
  ✔ 4/81   · 1/9 [n_hat_derivative]   · 8/405 [n_hat_derivative]   · 4/9 [n_hat_derivative]
  [examen mcq]
  pièges : n_hat_derivative

```

## Optimisation sous contraintes : conditions KKT (`n-opt-kkt`, BA4)

_Minimiser sous des contraintes : le lagrangien, les conditions KKT et leurs deux cas._

### Niveau 1

```
Minimiser f(x) = ½(x − 1)² sous la contrainte x − 2 ≥ 0. Écris les conditions KKT et résous-les.
  [guided]  (1/2·(x − 1)² − λ·(x − 2))′
    (L(x, λ) = ½(x − 1)² − λ·(x − 2). La stationnarité :)
    = x − □ − λ   (trous : x − 1 − λ)   ← dérivée de ½(x − 1)², puis de −λ·g
  — Les deux cas : λ = 0, ou la contrainte active (g(x) = 0) ; on garde celui qui respecte g(x) ≥ 0 et λ ≥ 0.  [juge value]  départ : x
    = □   (trous : 2)   ← g(x) = 0
  — Le multiplicateur.  [juge value]  départ : λ
    = □   (trous : 1)   ← par ∂L/∂x = 0, et λ ≥ 0
  aides : Écris ∇ₓL = 0, puis traite les deux cas de la complémentarité : λ = 0 ou contrainte active. | ∂L/∂x = (x − 1) − □ | Contrainte active : x = 2, λ = 1 ≥ 0.
  pièges : n_kkt_sign, n_kkt_complementarity, n_kkt_multiplier_sign

Minimiser f(x) = ½(x − 1)² sous la contrainte 3 − x ≥ 0. Écris les conditions KKT et résous-les.
  [guided]  (1/2·(x − 1)² − λ·(3 − x))′
    (L(x, λ) = ½(x − 1)² − λ·(3 − x). La stationnarité :)
    = x − □ + λ   (trous : x − 1 + λ)   ← dérivée de ½(x − 1)², puis de −λ·g
  — Les deux cas : λ = 0, ou la contrainte active (g(x) = 0) ; on garde celui qui respecte g(x) ≥ 0 et λ ≥ 0.  [juge value]  départ : x
    = □   (trous : 1)   ← λ = 0, donc x − a = 0
  — Le multiplicateur.  [juge value]  départ : λ
    = □   (trous : 0)   ← contrainte inactive
  aides : Écris ∇ₓL = 0, puis traite les deux cas de la complémentarité : λ = 0 ou contrainte active. | ∂L/∂x = (x − 1) + □ | λ = 0 et x = 1, qui respecte 3 − x ≥ 0.
  pièges : n_kkt_sign, n_kkt_complementarity, n_kkt_multiplier_sign

Minimiser f(x) = ½(x + 4)² sous la contrainte x + 2 ≥ 0. Écris les conditions KKT et résous-les.
  [guided]  (1/2·(x + 4)² − λ·(x + 2))′
    (L(x, λ) = ½(x + 4)² − λ·(x + 2). La stationnarité :)
    = x + □ − λ   (trous : x + 4 − λ)   ← dérivée de ½(x + 4)², puis de −λ·g
  — Les deux cas : λ = 0, ou la contrainte active (g(x) = 0) ; on garde celui qui respecte g(x) ≥ 0 et λ ≥ 0.  [juge value]  départ : x
    = □   (trous : −2)   ← g(x) = 0
  — Le multiplicateur.  [juge value]  départ : λ
    = □   (trous : 2)   ← par ∂L/∂x = 0, et λ ≥ 0
  aides : Écris ∇ₓL = 0, puis traite les deux cas de la complémentarité : λ = 0 ou contrainte active. | ∂L/∂x = (x + 4) − □ | Contrainte active : x = −2, λ = 2 ≥ 0.
  pièges : n_kkt_sign, n_kkt_complementarity, n_kkt_multiplier_sign

```

### Niveau 2

```
Minimiser f(x) = ½(x + 2)² sous la contrainte −1 − x ≥ 0. Écris les conditions KKT et résous-les.
  [guided]  (1/2·(x + 2)² − λ·(−1 − x))′
    (L(x, λ) = ½(x + 2)² − λ·(−1 − x). La stationnarité :)
    ? Quelle est la condition de complémentarité ? ✔ λ·(−1 − x) = 0 / · λ·x = 0 / · λ + (−1 − x) = 0
    = x + □ + λ   (trous : x + 2 + λ)   ← dérivée de ½(x + 2)², puis de −λ·g
  — Les deux cas : λ = 0, ou la contrainte active (g(x) = 0) ; on garde celui qui respecte g(x) ≥ 0 et λ ≥ 0.  [juge value]  départ : x
    ? Quel cas ? ✔ Contrainte inactive : λ = 0, x = −2 / · Contrainte active : x = −1, λ = −1
    = □   (trous : −2)   ← λ = 0, donc x − a = 0
  — Le multiplicateur.  [juge value]  départ : λ
    = □   (trous : 0)   ← contrainte inactive
  aides : Écris ∇ₓL = 0, puis traite les deux cas de la complémentarité : λ = 0 ou contrainte active. | ∂L/∂x = (x + 2) + □ | λ = 0 et x = −2, qui respecte −1 − x ≥ 0.
  pièges : n_kkt_sign, n_kkt_complementarity, n_kkt_multiplier_sign

Minimiser f(x) = ½(x + 1)² sous la contrainte x − 0 ≥ 0. Écris les conditions KKT et résous-les.
  [guided]  (1/2·(x + 1)² − λ·(x − 0))′
    (L(x, λ) = ½(x + 1)² − λ·(x − 0). La stationnarité :)
    ? Quelle est la condition de complémentarité ? ✔ λ·(x − 0) = 0 / · λ·x = 0 / · λ + (x − 0) = 0
    = x + □ − λ   (trous : x + 1 − λ)   ← dérivée de ½(x + 1)², puis de −λ·g
  — Les deux cas : λ = 0, ou la contrainte active (g(x) = 0) ; on garde celui qui respecte g(x) ≥ 0 et λ ≥ 0.  [juge value]  départ : x
    ? Quel cas ? ✔ Contrainte active : x = 0, λ = 1 / · Contrainte inactive : λ = 0, x = −1
    = □   (trous : 0)   ← g(x) = 0
  — Le multiplicateur.  [juge value]  départ : λ
    = □   (trous : 1)   ← par ∂L/∂x = 0, et λ ≥ 0
  aides : Écris ∇ₓL = 0, puis traite les deux cas de la complémentarité : λ = 0 ou contrainte active. | ∂L/∂x = (x + 1) − □ | Contrainte active : x = 0, λ = 1 ≥ 0.
  pièges : n_kkt_sign, n_kkt_complementarity, n_kkt_multiplier_sign

Minimiser f(x) = ½(x + 2)² sous la contrainte x − 3 ≥ 0. Écris les conditions KKT et résous-les.
  [guided]  (1/2·(x + 2)² − λ·(x − 3))′
    (L(x, λ) = ½(x + 2)² − λ·(x − 3). La stationnarité :)
    ? Quelle est la condition de complémentarité ? ✔ λ·(x − 3) = 0 / · λ·x = 0 / · λ + (x − 3) = 0
    = x + □ − λ   (trous : x + 2 − λ)   ← dérivée de ½(x + 2)², puis de −λ·g
  — Les deux cas : λ = 0, ou la contrainte active (g(x) = 0) ; on garde celui qui respecte g(x) ≥ 0 et λ ≥ 0.  [juge value]  départ : x
    ? Quel cas ? ✔ Contrainte active : x = 3, λ = 5 / · Contrainte inactive : λ = 0, x = −2
    = □   (trous : 3)   ← g(x) = 0
  — Le multiplicateur.  [juge value]  départ : λ
    = □   (trous : 5)   ← par ∂L/∂x = 0, et λ ≥ 0
  aides : Écris ∇ₓL = 0, puis traite les deux cas de la complémentarité : λ = 0 ou contrainte active. | ∂L/∂x = (x + 2) − □ | Contrainte active : x = 3, λ = 5 ≥ 0.
  pièges : n_kkt_sign, n_kkt_complementarity, n_kkt_multiplier_sign

```

### Niveau 3

```
Minimiser f(x) = ½(x − 2)² sous la contrainte x + 2 ≥ 0. Écris les conditions KKT et résous-les. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  (1/2·(x − 2)² − λ·(x + 2))′
    (L(x, λ) = ½(x − 2)² − λ·(x + 2). La stationnarité :)
    = x − 2 − λ   ← dérivée de ½(x − 2)², puis de −λ·g
  — Les deux cas : λ = 0, ou la contrainte active (g(x) = 0) ; on garde celui qui respecte g(x) ≥ 0 et λ ≥ 0.  [juge value]  départ : x
    ? Quel cas ? ✔ Contrainte inactive : λ = 0, x = 2 / · Contrainte active : x = −2, λ = −4
    = 2   ← λ = 0, donc x − a = 0
  — Le multiplicateur.  [juge value]  départ : λ
    = 0   ← contrainte inactive
  aides : Écris ∇ₓL = 0, puis traite les deux cas de la complémentarité : λ = 0 ou contrainte active. | ∂L/∂x = (x − 2) − □ | λ = 0 et x = 2, qui respecte x + 2 ≥ 0.
  pièges : n_kkt_sign, n_kkt_complementarity, n_kkt_multiplier_sign

Minimiser f(x) = ½(x + 4)² sous la contrainte 1 − x ≥ 0. Écris les conditions KKT et résous-les. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  (1/2·(x + 4)² − λ·(1 − x))′
    (L(x, λ) = ½(x + 4)² − λ·(1 − x). La stationnarité :)
    = x + 4 + λ   ← dérivée de ½(x + 4)², puis de −λ·g
  — Les deux cas : λ = 0, ou la contrainte active (g(x) = 0) ; on garde celui qui respecte g(x) ≥ 0 et λ ≥ 0.  [juge value]  départ : x
    ? Quel cas ? ✔ Contrainte inactive : λ = 0, x = −4 / · Contrainte active : x = 1, λ = −5
    = −4   ← λ = 0, donc x − a = 0
  — Le multiplicateur.  [juge value]  départ : λ
    = 0   ← contrainte inactive
  aides : Écris ∇ₓL = 0, puis traite les deux cas de la complémentarité : λ = 0 ou contrainte active. | ∂L/∂x = (x + 4) + □ | λ = 0 et x = −4, qui respecte 1 − x ≥ 0.
  pièges : n_kkt_sign, n_kkt_complementarity, n_kkt_multiplier_sign

Minimiser f(x) = ½(x + 4)² sous la contrainte 1 − x ≥ 0. Écris les conditions KKT et résous-les. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  (1/2·(x + 4)² − λ·(1 − x))′
    (L(x, λ) = ½(x + 4)² − λ·(1 − x). La stationnarité :)
    = x + 4 + λ   ← dérivée de ½(x + 4)², puis de −λ·g
  — Les deux cas : λ = 0, ou la contrainte active (g(x) = 0) ; on garde celui qui respecte g(x) ≥ 0 et λ ≥ 0.  [juge value]  départ : x
    ? Quel cas ? ✔ Contrainte inactive : λ = 0, x = −4 / · Contrainte active : x = 1, λ = −5
    = −4   ← λ = 0, donc x − a = 0
  — Le multiplicateur.  [juge value]  départ : λ
    = 0   ← contrainte inactive
  aides : Écris ∇ₓL = 0, puis traite les deux cas de la complémentarité : λ = 0 ou contrainte active. | ∂L/∂x = (x + 4) + □ | λ = 0 et x = −4, qui respecte 1 − x ≥ 0.
  pièges : n_kkt_sign, n_kkt_complementarity, n_kkt_multiplier_sign

```

### Niveau 4

```
Minimiser ½(q₁² + q₂²) sous la contrainte −q₁ + 2q₂ = 5/2 (B = (−1, 2)), avec L = ½‖q‖² − μ(Bq − c).
  [free, suivre l'erreur]  (5/2)/(5)
    (Le système KKT [[I, −Bᵀ], [B, 0]]·(q ; μ) = (0 ; c) donne q = μ·bᵀ, puis b·q = c. Le multiplicateur :)
    = 1/2   ← μ·‖b‖² = c, ‖b‖² = 5
  — q₁ = μ·b₁.  [juge value]  départ : q_1
    = −1/2   ← q − Bᵀμ = 0
  — q₂ = μ·b₂.  [juge value]  départ : q_2
    = 1   ← q − Bᵀμ = 0
  aides : ∇_qL = q − Bᵀμ = 0, donc q = μBᵀ ; la contrainte donne μ. | μ·((−1)² + (2)²) = □ | μ = 1/2, q = (−1/2 ; 1).

Minimiser f(x) = ½(x − 5)² sous la contrainte −2 − x ≥ 0. Écris les conditions KKT et résous-les.
  [free, suivre l'erreur]  (1/2·(x − 5)² − λ·(−2 − x))′
    (L(x, λ) = ½(x − 5)² − λ·(−2 − x). La stationnarité :)
    = x − 5 + λ   ← dérivée de ½(x − 5)², puis de −λ·g
  — Les deux cas : λ = 0, ou la contrainte active (g(x) = 0) ; on garde celui qui respecte g(x) ≥ 0 et λ ≥ 0.  [juge value]  départ : x
    ? Quel cas ? ✔ Contrainte active : x = −2, λ = 7 / · Contrainte inactive : λ = 0, x = 5
    = −2   ← g(x) = 0
  — Le multiplicateur.  [juge value]  départ : λ
    = 7   ← par ∂L/∂x = 0, et λ ≥ 0
  aides : Écris ∇ₓL = 0, puis traite les deux cas de la complémentarité : λ = 0 ou contrainte active. | ∂L/∂x = (x − 5) + □ | Contrainte active : x = −2, λ = 7 ≥ 0.
  pièges : n_kkt_sign, n_kkt_complementarity, n_kkt_multiplier_sign

Minimiser ½(q₁² + q₂²) sous la contrainte −q₁ = −1 (B = (−1, 0)), avec L = ½‖q‖² − μ(Bq − c).
  [free, suivre l'erreur]  (−1)/(1)
    (Le système KKT [[I, −Bᵀ], [B, 0]]·(q ; μ) = (0 ; c) donne q = μ·bᵀ, puis b·q = c. Le multiplicateur :)
    = −1   ← μ·‖b‖² = c, ‖b‖² = 1
  — q₁ = μ·b₁.  [juge value]  départ : q_1
    = 1   ← q − Bᵀμ = 0
  — q₂ = μ·b₂.  [juge value]  départ : q_2
    = 0   ← q − Bᵀμ = 0
  aides : ∇_qL = q − Bᵀμ = 0, donc q = μBᵀ ; la contrainte donne μ. | μ·((−1)² + (0)²) = □ | μ = −1, q = (1 ; 0).

```

### Niveau 5

```
Complète la résolution du système KKT [[I, −Bᵀ], [B, 0]]·(q ; μ) = (0 ; c) pour min ½‖q‖² sous Bq = c (une contrainte).
  [code python, 4 trous, sans aide]
    | def kkt_eq(B, c):
    |     # min 1/2 |q|^2 sous B q = c (B : 1 x n) ; inconnues (q, mu)
    |     n = len(B[0])
    |     K = zeros2(n + 1, n + 1)
    |     rhs = zeros(n + 1)
    |     for i in range(n):
    |         K[i][i] = ⟦1.0⟧
    |         K[i][n] = ⟦-B[0][i]⟧     # bloc -B^T
    |         K[n][i] = ⟦B[0][i]⟧      # bloc B
    |     rhs[n] = ⟦c[0]⟧
    |     return solve(K, rhs)
    test : kkt_eq([[1, 1]], [2]) → [1.0, 1.0, 1.0]
    test : kkt_eq([[1, 1, 2]], [6]) → [1.0, 1.0, 2.0, 1.0]
  pièges : n_kkt_sign

Complète la résolution du système KKT [[I, −Bᵀ], [B, 0]]·(q ; μ) = (0 ; c) pour min ½‖q‖² sous Bq = c (une contrainte).
  [code python, 4 trous, sans aide]
    | def kkt_eq(B, c):
    |     # min 1/2 |q|^2 sous B q = c (B : 1 x n) ; inconnues (q, mu)
    |     n = len(B[0])
    |     K = zeros2(n + 1, n + 1)
    |     rhs = zeros(n + 1)
    |     for i in range(n):
    |         K[i][i] = ⟦1.0⟧
    |         K[i][n] = ⟦-B[0][i]⟧     # bloc -B^T
    |         K[n][i] = ⟦B[0][i]⟧      # bloc B
    |     rhs[n] = ⟦c[0]⟧
    |     return solve(K, rhs)
    test : kkt_eq([[1, 1]], [2]) → [1.0, 1.0, 1.0]
    test : kkt_eq([[1, 1, 2]], [6]) → [1.0, 1.0, 2.0, 1.0]
  pièges : n_kkt_sign

Complète la résolution du système KKT [[I, −Bᵀ], [B, 0]]·(q ; μ) = (0 ; c) pour min ½‖q‖² sous Bq = c (une contrainte).
  [code python, 4 trous, sans aide]
    | def kkt_eq(B, c):
    |     # min 1/2 |q|^2 sous B q = c (B : 1 x n) ; inconnues (q, mu)
    |     n = len(B[0])
    |     K = zeros2(n + 1, n + 1)
    |     rhs = zeros(n + 1)
    |     for i in range(n):
    |         K[i][i] = ⟦1.0⟧
    |         K[i][n] = ⟦-B[0][i]⟧     # bloc -B^T
    |         K[n][i] = ⟦B[0][i]⟧      # bloc B
    |     rhs[n] = ⟦c[0]⟧
    |     return solve(K, rhs)
    test : kkt_eq([[1, 1]], [2]) → [1.0, 1.0, 1.0]
    test : kkt_eq([[1, 1, 2]], [6]) → [1.0, 1.0, 2.0, 1.0]
  pièges : n_kkt_sign

```

### Variantes d'examen

```
Minimiser ½xᵀAx − bᵀx sous x + c ≥ 0 et −x + c ≥ 0 (x, c ∈ ℝⁿ), avec les multiplicateurs λ₁ ≥ 0 et λ₂ ≥ 0 de ces deux contraintes. Quelles sont les conditions de complémentarité ?
  ✔ (λ₁)ᵢ(xᵢ + cᵢ) = 0 et (λ₂)ᵢ(cᵢ − xᵢ) = 0   · (λ₁)ᵢ(xᵢ − cᵢ) = 0 et (λ₂)ᵢ(xᵢ + cᵢ) = 0 [n_kkt_complementarity]   · (λ₁)ᵢ(λ₂)ᵢ = 0 seulement   · (λ₁)ᵢ + (λ₂)ᵢ = 0
  [examen mcq]
  pièges : n_kkt_complementarity

```

## Pièges de cette unité

- **Erreur relative divisée par l'approximation** (`n_rel_by_approx`, E) : e_rel = 1/3000 ÷ 0,667 au lieu de ÷ 2/3
- **Erreur avec son signe** (`n_abs_signed`, E) : e = −1/3000 au lieu de 1/3000
- **Annulation ignorée** (`n_cancel_ignored`, E) : √1001 − √1000 = 0,02 au lieu de 0,01581
- **ε machine pris comme une erreur absolue** (`n_eps_absolute`, E) : erreur sur fl(10²⁰) ≈ 10⁻¹⁶ au lieu de ≈ 10⁴
- **Bissection : le « − 1 » oublié** (`n_bisect_no_minus1`, E) : k > log₂(1000) = 9,97 au lieu de k > 8,97
- **Bissection : log₁₀ au lieu de log₂** (`n_bisect_log10`, E) : log₁₀(1000) = 3 au lieu de log₂(1000) ≈ 9,97
- **Bissection : la mauvaise moitié** (`n_bisect_wrong_half`, E) : f(1,5) > 0 : garder [1,5 ; 2] au lieu de [1 ; 1,5]
- **Point fixe : condition lue sur f au lieu de φ** (`n_fp_f_vs_phi`, E) : |f′(α)| < 1 au lieu de |φ′(α)| < 1
- **Point fixe : φ′ prise en x⁽⁰⁾ au lieu de α** (`n_fp_phi_at_x0`, E) : φ′(x⁽⁰⁾) au lieu de φ′(α)
- **Point fixe : |φ′(α)| < 1 sans la valeur absolue** (`n_fp_abs_forgot`, E) : φ′(α) = −3 < 1, donc converge au lieu de |−3| > 1
- **Ordre d'un point fixe mal compté** (`n_fp_order_count`, E) : φ′ = φ″ = 0 : ordre 2 au lieu de ordre 3
- **Ordre 1 conclu d'un rapport δₖ₊₁/δₖ qui tend vers 0** (`n_order_simple_ratio`, E) : δₖ₊₁/δₖ au lieu de 0, donc ordre 1 → ordre 2
- **Ordre lu sur une ligne dominée par l'arrondi** (`n_order_roundoff_rows`, E) : rapport 9,8·10⁵ avec δ = 10⁻¹⁶ au lieu de ignorer cette ligne
- **Newton : f′/f au lieu de f/f′** (`n_newton_inverted`, E) : x − f′/f au lieu de x − f/f′
- **Newton : x + f/f′ au lieu de x − f/f′** (`n_newton_sign`, E) : x + f/f′ au lieu de x − f/f′
- **« Newton est toujours d'ordre 2 »** (`n_newton_always2`, C) : « Newton est d'ordre 2 » pour (x − 1)² au lieu de ordre 1
- **Multiplicité lue comme 1/rapport** (`n_mult_ratio`, E) : rapport au lieu de 1/m → 1 − 1/m
- **Newton pour un système : x⁽⁰⁾ + δ au lieu de x⁽⁰⁾ − δ** (`n_newton_sys_sign`, E) : x⁽¹⁾ = x⁽⁰⁾ + δ au lieu de x⁽⁰⁾ − δ avec J·δ = F
- **Sécante : le point de départ gardé au lieu des deux derniers** (`n_secant_update`, E) : garder x⁽⁰⁾ et x⁽²⁾ au lieu de x⁽¹⁾ et x⁽²⁾
- **Lagrange : φᵢ sans son dénominateur** (`n_lagrange_no_denominator`, E) : φ₁ = x(x − 2) au lieu de −x(x − 2)
- **Coefficients lus dans l'ordre inverse** (`n_vandermonde_order`, E) : (−9, 15, 12) lu comme 12 + 15x − 9x² ou l'inverse au lieu de 
- **Plus de nœuds équirépartis, toujours mieux** (`n_runge_more_nodes`, C) : « plus de nœuds équirépartis = meilleur » au lieu de faux (Runge)
- **Erreur d'interpolation : f⁽ⁿ⁾ au lieu de f⁽ⁿ⁺¹⁾** (`n_interp_error_factorial`, E) : max|f″|/(4·2)·h² pour 3 nœuds au lieu de max|f‴|/(4·3)·h³
- **Différence divisée : mauvais dénominateur** (`n_divdiff_denominator`, E) : f[0,1,2] = −18 au lieu de −9
- **Nœuds de Tchebychev non transportés** (`n_cheb_no_mapping`, E) : nœuds ±√3/2 sur [0 ; 4] au lieu de 2 ± √3
- **Mauvaise borne de l'interpolation linéaire** (`n_p1_bound`, E) : h·max|f″|/8 ≤ tol, ou h²·max|f″|/2 au lieu de h²·max|f″|/8 ≤ tol
- **Spline naturelle : s′ = 0 au lieu de s″ = 0** (`n_spline_natural_first`, E) : s′(x₁) = 0 au lieu de s″(x₁) = 0
- **Spline : mauvais compte des conditions** (`n_spline_count`, E) : 4n − 3n − n = 0 au lieu de 4n − 3(n − 1) − (n + 1) = 2
- **Moindres carrés : interpoler au lieu des équations normales** (`n_ls_interp`, E) : résoudre A·α = y (3 équations, 2 inconnues) au lieu de AᵀA·α = Aᵀy
- **Équations normales avec AAᵀ** (`n_ls_aat`, C) : (A·Aᵀ)\(A·y) au lieu de (Aᵀ·A)\(Aᵀ·y)
- **Matrice des moindres carrés transposée** (`n_ls_index_swap`, C) : Aᵢⱼ = φᵢ(xⱼ) au lieu de φⱼ(xᵢ)
- **Différence centrée divisée par h au lieu de 2h** (`n_fd_centered_h`, E) : (f(x + h) − f(x − h))/h = 6,02 au lieu de /(2h) = 3,01
- **Développement de f(x − h) avec tous les signes +** (`n_fd_taylor_sign`, E) : f(x − h) = f + hf′ + … au lieu de f − hf′ + (h²/2)f″ − …
- **« Plus h est petit, mieux c’est » (arrondi oublié)** (`n_fd_smaller_h`, C) : « plus h est petit, mieux c'est » au lieu de minimum vers 10⁻⁸
- **Ordre 2 annoncé avec la consistance seule** (`n_fd_order_conditions`, E) : consistance seule ⇒ ordre 2 au lieu de il faut aussi annuler le terme en h·f″
- **Les deux restes f‴(ξ₁) et f‴(ξ₂) simplifiés ensemble** (`n_proof_same_xi`, E) : f‴(ξ) − f‴(ξ) = 0 au lieu de ξ₁ ≠ ξ₂
- **Constante qui dépend de ξ ou de h** (`n_proof_constant_depends_h`, C) : C = |f‴(ξ)|/3 au lieu de C = 1, avec max|f‴|
- **Simpson : h/3 au lieu de h/6** (`n_simpson_h3_h6`, C) : (h/3)(f₀ + 4f_c + f₁) = 8 au lieu de (h/6)(…) = 4
- **Trapèze : poids h aux extrémités** (`n_trap_weights`, E) : h(f₀ + f₁ + f₂) = 9 au lieu de h(f₀/2 + f₁ + f₂/2) = 5
- **Changement de variable sans le facteur h/2** (`n_map_jacobian`, E) : ∫ f(xᵢ + h(t + 1)/2)dt au lieu de (h/2)∫…
- **Degré d'exactitude : arrêt au dernier monôme testé** (`n_exactness_stop_early`, E) : exacte sur t², donc degré 2 au lieu de tester t³ aussi
- **Ordre = degré d'exactitude (sans le + 1)** (`n_exactness_order`, E) : degré 3 ⇒ ordre 3 au lieu de ordre 4
- **Ordre lu comme le rapport des erreurs** (`n_order_ratio_is_p`, E) : rapport 4 ⇒ ordre 4 au lieu de 2ᵖ = 4 ⇒ p = 2
- **Constante laissée avec N** (`n_proof_sum_count`, E) : C = N·h/24 au lieu de (b − a)/24
- **Ordre théorique sans la régularité de f** (`n_regularity_ignored`, E) : Simpson d'ordre 4 pour √x au lieu de ordre ≈ 1,5
- **Plus de régularité, plus d'ordre** (`n_more_regularity_more_order`, C) : f ∈ C⁵ ⇒ Ch⁵ au lieu de toujours Ch⁴
- **Richardson avec le mauvais ordre p** (`n_richardson_wrong_p`, E) : (2Q_h − Q₂ₕ)/1 au lieu de (4Q_h − Q₂ₕ)/3
- **Richardson : Q_h et Q₂ₕ échangés** (`n_richardson_swap`, E) : (4Q₂ₕ − Q_h)/3 au lieu de (4Q_h − Q₂ₕ)/3
- **Pivot nul : « A est singulière »** (`n_lu_zero_pivot`, C) : pivot nul ⇒ « A singulière », ou division par 0 au lieu de permuter (PA = LU)
- **det = Π uᵢᵢ sans le signe de la permutation** (`n_lu_det_permutation`, E) : det B = Π uᵢᵢ = 18 au lieu de −18
- **inv(A)*b « plus rapide » que A** (`n_cost_inverse`, C) : inv(A)*b « plus rapide » au lieu de A\b
- **Thomas : indices décalés** (`n_thomas_index_shift`, C) : `a[i] - d[i]*c[i]` au lieu de `d[i-1]*c[i-1]`
- **Thomas : c et d échangés (rôles de L et U)** (`n_thomas_lu_roles`, C) : descente avec `c[i]*b[i]` au lieu de `d[i]*b[i]`
- **Thomas : dernière ligne non mise à jour** (`n_thomas_forget_last`, C) : dernière ligne non mise à jour au lieu de `a[N-1] -= d[N-2]*c[N-2]`
- **Jacobi avec les valeurs déjà mises à jour** (`n_jacobi_uses_new`, E) : Jacobi x₂ = 11/16 au lieu de 1/2
- **Diagonale dominante au sens large** (`n_diag_dominance`, E) : |aᵢᵢ| ≥ Σ|aᵢⱼ|, ou par colonnes au lieu de |aᵢᵢ| > Σⱼ≠ᵢ |aᵢⱼ| par lignes
- **Petit résidu ⇒ petite erreur** (`n_residual_is_error`, C) : ‖r‖ petit ⇒ ‖e‖ petit au lieu de ‖e‖/‖x‖ ≤ κ·‖r‖/‖b‖
- **‖B‖ ≥ 1 ⇒ divergence** (`n_norm_vs_radius`, E) : ‖B‖ ≥ 1 ⇒ diverge au lieu de c'est ρ(B) < 1 qui décide
- **Pas fixe : α < 2/λ_min au lieu de 2/λ_max** (`n_gradient_step_bound`, E) : α < 2/λ_min au lieu de α < 2/λ_max
- **Gradient : x − αr au lieu de x + αr** (`n_gradient_sign`, E) : x − αr au lieu de x + αr
- **Pas optimal inversé : rᵀAr/rᵀr** (`n_optimal_step_inverted`, E) : α = rᵀAr/rᵀr = 2 au lieu de rᵀr/rᵀAr = 1/2
- **Schéma implicite calculé comme explicite** (`n_implicit_as_explicit`, E) : ER : u₁ = u₀ + h·f(t₀, u₀) = 0,8 au lieu de u₁ = 5/6
- **Euler progressif : f(tₙ₊₁, uₙ) au lieu de f(tₙ, uₙ)** (`n_euler_time_index`, E) : f(t_{n+1}, u_n) au lieu de f(t_n, u_n)
- **Heun : prédiction u + k₁ sans h** (`n_heun_k2`, E) : k₂ = f(t + h, u + k₁) au lieu de f(t + h, u + h·k₁)
- **Crank-Nicolson calculé avec uₙ dans le second terme** (`n_cn_explicit`, E) : CN avec f(t_{n+1}, u_n) au lieu de f(t_{n+1}, u_{n+1})
- **Stabilité d'Euler progressif : h < 1/|λ| au lieu de 2/|λ|** (`n_stab_factor2`, E) : h < 1/|λ| au lieu de h < 2/|λ|
- **Ordre et stabilité confondus** (`n_stab_order_confused`, C) : « τ grand reste stable, donc ordre élevé » ; « l'erreur /4, donc stable si τ ≤ h²/2 » au lieu de 
- **R(hλ) écrit 1 − hλ** (`n_stab_lambda_sign`, E) : |1 − hλ| < 1 avec λ = −20 au lieu de |1 + hλ| < 1
- **Facteur N oublié dans |aᴺ − bᴺ|** (`n_euler_ineq_bound`, E) : |aᴺ − bᴺ| ≤ |a − b| au lieu de |aᴺ − bᴺ| ≤ N|a − b|
- **Erreur globale prise pour l'erreur locale** (`n_global_error_order`, E) : globale O(h²) au lieu de O(h)
- **|1 − h| ≤ 1 sans la condition h ≤ 2** (`n_h_le_2_forgotten`, E) : |1 − h| ≤ 1 pour tout h > 0 au lieu de |1 − h| ≤ 1 si 0 < h ≤ 2
- **Instabilité prise pour un manque de précision** (`n_stiff_accuracy`, E) : explosion ⇒ « réduire la tolérance » au lieu de stabilité
- **Conditions aux bords oubliées dans le second membre** (`n_bvp_bc_rhs`, E) : f̃₁ = f(x₁) au lieu de f(x₁) + α/h²
- **Facteur 1/h² oublié dans la matrice** (`n_bvp_h2_missing`, C) : A = tridiag(−1, 2, −1) au lieu de (1/h²)·tridiag
- **xᵀAx ≥ 0 pris pour « définie positive »** (`n_spd_semidefinite`, C) : xᵀAx ≥ 0 ⇒ SDP au lieu de il faut > 0 si x ≠ 0
- **Constante de troncature h²/24 ou h²/6 au lieu de h²/12** (`n_truncation_constant`, E) : h²/24 ou h²/6 au lieu de h²/12
- **Convergence tirée de la consistance seule** (`n_stability_skipped`, E) : τ = O(h²) ⇒ e = O(h²) au lieu de il faut Ae = τ et la stabilité 1/8
- **Terme de F mis dans la jacobienne (ou l'inverse)** (`n_jacobian_vs_F`, C) : a(i) = 2·coeff + x(i)³ − 1 au lieu de + 3x(i)²
- **Cholesky tridiagonal : mauvais carré retiré** (`n_cholesky_tridiag_sq`, C) : sqrt(a(i+1) − a(i)²) au lieu de sqrt(a(i+1) − c(i)²)
- **Chaleur : τ au lieu de τ/h²** (`n_heat_tau_h`, C) : a(i) = 1 + 2τ au lieu de 1 + 2τ/h²
- **Chaleur : facteur 2 oublié sur la diagonale** (`n_heat_2tau`, C) : 1 + τ/h² au lieu de 1 + 2τ/h²
- **Chaleur : condition initiale multipliée par τ** (`n_heat_ic_tau`, C) : b(i) = τ·sin(πxᵢ) au lieu de sin(πxᵢ)
- **Ordre lu O(h + τ) au lieu de O(h² + τ)** (`n_heat_order_h_tau`, C) : erreur /4 avec h/2, τ/4 ⇒ O(h + τ) au lieu de O(h² + τ)
- **Transport : décentrement du mauvais côté** (`n_cfl_direction`, C) : décentré avec uᵢ₋₁ au lieu de uᵢ₊₁
- **Ondes : λ = τ/h au lieu de τ²/h²** (`n_wave_lambda`, C) : λ = τ/h au lieu de τ²/h²
- **Espace V de la forme faible : mauvaises conditions** (`n_weak_space_bc`, C) : V sans g(0) = g(1) = 0, ou avec une condition de Neumann au lieu de 
- **Fonction chapeau : pente ou ∫(φ′)² fausse** (`n_hat_derivative`, C) : ∫(φ₁′)² = 2 ⇒ α = 1/4 au lieu de 4 ⇒ 1/8
- **Forme faible : signe de l'intégration par parties** (`n_weak_sign`, E) : −∫u′v′ = ∫fv au lieu de ∫u′v′ = ∫fv
- **KKT : signes des multiplicateurs inversés** (`n_kkt_sign`, C) : Ax − b + λ₁ − λ₂ au lieu de Ax − b − λ₁ + λ₂
- **KKT : complémentarité avec la mauvaise contrainte** (`n_kkt_complementarity`, C) : (λ₁)ᵢ(xᵢ − cᵢ) = 0 au lieu de (λ₁)ᵢ(xᵢ + cᵢ) = 0
- **KKT : multiplicateur négatif accepté** (`n_kkt_multiplier_sign`, E) : λ = −2 accepté au lieu de λ ≥ 0 exigé
