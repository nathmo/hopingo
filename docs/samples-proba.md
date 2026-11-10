# Exemples de questions — Probabilités et statistique

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Moyenne, médiane, variance empirique (`p-desc-summary`, BA3)

_Moyenne, médiane et variance empirique d'une série (diviseur n − 1), puis l'écart-type._

### Niveau 1

```
Voici des âges des joueurs d'un club, déjà triés : 13, 16, 18, 20, 22, 29, 29. Calcule la moyenne, la médiane, la variance empirique s² et l'écart-type s (à 0,01 près).
  [guided]  x̄
    = □/7   (trous : 147/7)   ← Somme des données : 13 + 16 + 18 + 20 + 22 + 29 + 29 = 147, divisée par n = 7
    = □   (trous : 21)   ← Diviser
  — méd  [juge prob]  départ : méd
    = □   (trous : 20)   ← Données triées : 13, 16, 18, 20, 22, 29, 29 ; la 4ᵉ
  — Σ(xᵢ−x̄)2  [juge prob]  départ : Σ(xᵢ−x̄)²
    = □ + 25 + 9 + 1 + 1 + □ + 64   (trous : 64 + 25 + 9 + 1 + 1 + 64 + 64)   ← Chaque écart (xᵢ − x̄), au carré
    = □   (trous : 228)   ← Additionner
  — s2  [juge prob]  départ : s²
    = 228/□   (trous : 228/6)   ← Diviser par n − 1
    = □   (trous : 38)   ← Simplifier
  — s  [juge stat]  départ : s
    = √(□)   (trous : √(38))   ← Écart-type : racine de la variance
    = □   (trous : 6,16)   ← Arrondir au centième
  aides : Trie d'abord. Pour s², somme des écarts au carré, divisée par n − 1. | s²=228/□ | x̄ = 21 ; méd = 20 ; s² = 38 ; s ≈ 6,16
  pièges : p_median_mean, p_sd_n, p_median_unsorted

Voici des notes d'un test (sur 60), déjà triés : 53, 57, 61, 63, 66. Calcule la moyenne, la médiane, la variance empirique s² et l'écart-type s (à 0,01 près).
  [guided]  x̄
    = □/5   (trous : 300/5)   ← Somme des données : 53 + 57 + 61 + 63 + 66 = 300, divisée par n = 5
    = □   (trous : 60)   ← Diviser
  — méd  [juge prob]  départ : méd
    = □   (trous : 61)   ← Données triées : 53, 57, 61, 63, 66 ; la 3ᵉ
  — Σ(xᵢ−x̄)2  [juge prob]  départ : Σ(xᵢ−x̄)²
    = □ + 9 + 1 + 9 + □   (trous : 49 + 9 + 1 + 9 + 36)   ← Chaque écart (xᵢ − x̄), au carré
    = □   (trous : 104)   ← Additionner
  — s2  [juge prob]  départ : s²
    = 104/4   ← Diviser par n − 1
    = □   (trous : 26)   ← Simplifier
  — s  [juge stat]  départ : s
    = √(□)   (trous : √(26))   ← Écart-type : racine de la variance
    = □   (trous : 5,10)   ← Arrondir au centième
  aides : Trie d'abord. Pour s², somme des écarts au carré, divisée par n − 1. | s²=104/□ | x̄ = 60 ; méd = 61 ; s² = 26 ; s ≈ 5,10
  pièges : p_median_mean, p_sd_n, p_median_unsorted

Voici des âges des joueurs d'un club, déjà triés : 42, 44, 45, 46, 47, 48, 51, 54, 55. Calcule la moyenne, la médiane, la variance empirique s² et l'écart-type s (à 0,01 près).
  [guided]  x̄
    = □/9   (trous : 432/9)   ← Somme des données : 42 + 44 + 45 + 46 + 47 + 48 + 51 + 54 + 55 = 432, divisée par n = 9
    = □   (trous : 48)   ← Diviser
  — méd  [juge prob]  départ : méd
    = □   (trous : 47)   ← Données triées : 42, 44, 45, 46, 47, 48, 51, 54, 55 ; la 5ᵉ
  — Σ(xᵢ−x̄)2  [juge prob]  départ : Σ(xᵢ−x̄)²
    = □ + 16 + 9 + 4 + 1 + 0 + 9 + 36 + □   (trous : 36 + 16 + 9 + 4 + 1 + 0 + 9 + 36 + 49)   ← Chaque écart (xᵢ − x̄), au carré
    = □   (trous : 160)   ← Additionner
  — s2  [juge prob]  départ : s²
    = 160/□   (trous : 160/8)   ← Diviser par n − 1
    = □   (trous : 20)   ← Simplifier
  — s  [juge stat]  départ : s
    = √(□)   (trous : √(20))   ← Écart-type : racine de la variance
    = □   (trous : 4,47)   ← Arrondir au centième
  aides : Trie d'abord. Pour s², somme des écarts au carré, divisée par n − 1. | s²=160/□ | x̄ = 48 ; méd = 47 ; s² = 20 ; s ≈ 4,47
  pièges : p_median_mean, p_sd_n, p_median_unsorted

```

### Niveau 2

```
Voici des températures relevées (en °C) : 25, 18, 22, 23, 34, 30, 30. Calcule la moyenne, la médiane, la variance empirique s² et l'écart-type s (à 0,01 près).
  [guided]  x̄
    = □/7   (trous : 182/7)   ← Somme des données : 25 + 18 + 22 + 23 + 34 + 30 + 30 = 182, divisée par n = 7
    = □   (trous : 26)   ← Diviser
  — méd  [juge prob]  départ : méd
    ? Pour la médiane, que fais-tu d'abord ? ✔ Trier les données / · Prendre la 4ᵉ valeur de la liste donnée
    = □   (trous : 25)   ← Données triées : 18, 22, 23, 25, 30, 30, 34 ; la 4ᵉ
  — Σ(xᵢ−x̄)2  [juge prob]  départ : Σ(xᵢ−x̄)²
    = □   (trous : 64 + 16 + 9 + 1 + 16 + 16 + 64)   ← Chaque écart (xᵢ − x̄), au carré
    = □   (trous : 186)   ← Additionner
  — s2  [juge prob]  départ : s²
    = 186/6   ← Diviser par n − 1
    = □   (trous : 31)   ← Simplifier
  — s  [juge stat]  départ : s
    = √(□)   (trous : √(31))   ← Écart-type : racine de la variance
    = □   (trous : 5,57)   ← Arrondir au centième
  aides : Trie d'abord. Pour s², somme des écarts au carré, divisée par n − 1. | s²=186/□ | x̄ = 26 ; méd = 25 ; s² = 31 ; s ≈ 5,57
  pièges : p_median_unsorted, p_median_mean, p_sd_n

Voici des temps de trajet (en minutes) : 53, 59, 57, 45, 56. Calcule la moyenne, la médiane, la variance empirique s² et l'écart-type s (à 0,01 près).
  [guided]  x̄
    = □/5   (trous : 270/5)   ← Somme des données : 53 + 59 + 57 + 45 + 56 = 270, divisée par n = 5
    = □   (trous : 54)   ← Diviser
  — méd  [juge prob]  départ : méd
    ? Pour la médiane, que fais-tu d'abord ? ✔ Trier les données / · Prendre la 3ᵉ valeur de la liste donnée
    = □   (trous : 56)   ← Données triées : 45, 53, 56, 57, 59 ; la 3ᵉ
  — Σ(xᵢ−x̄)2  [juge prob]  départ : Σ(xᵢ−x̄)²
    = □   (trous : 81 + 1 + 4 + 9 + 25)   ← Chaque écart (xᵢ − x̄), au carré
    = □   (trous : 120)   ← Additionner
  — s2  [juge prob]  départ : s²
    = 120/□   (trous : 120/4)   ← Diviser par n − 1
    = □   (trous : 30)   ← Simplifier
  — s  [juge stat]  départ : s
    = √(□)   (trous : √(30))   ← Écart-type : racine de la variance
    = □   (trous : 5,48)   ← Arrondir au centième
  aides : Trie d'abord. Pour s², somme des écarts au carré, divisée par n − 1. | s²=120/□ | x̄ = 54 ; méd = 56 ; s² = 30 ; s ≈ 5,48
  pièges : p_median_unsorted, p_median_mean, p_sd_n

Voici des nombres de pas (en centaines) par jour : 48, 42, 52, 50, 53. Calcule la moyenne, la médiane, la variance empirique s² et l'écart-type s (à 0,01 près).
  [guided]  x̄
    = □/5   (trous : 245/5)   ← Somme des données : 48 + 42 + 52 + 50 + 53 = 245, divisée par n = 5
    = □   (trous : 49)   ← Diviser
  — méd  [juge prob]  départ : méd
    ? Pour la médiane, que fais-tu d'abord ? ✔ Trier les données / · Prendre la 3ᵉ valeur de la liste donnée
    = □   (trous : 50)   ← Données triées : 42, 48, 50, 52, 53 ; la 3ᵉ
  — Σ(xᵢ−x̄)2  [juge prob]  départ : Σ(xᵢ−x̄)²
    = □   (trous : 49 + 1 + 1 + 9 + 16)   ← Chaque écart (xᵢ − x̄), au carré
    = □   (trous : 76)   ← Additionner
  — s2  [juge prob]  départ : s²
    = 76/□   (trous : 76/4)   ← Diviser par n − 1
    = □   (trous : 19)   ← Simplifier
  — s  [juge stat]  départ : s
    = √(□)   (trous : √(19))   ← Écart-type : racine de la variance
    = □   (trous : 4,36)   ← Arrondir au centième
  aides : Trie d'abord. Pour s², somme des écarts au carré, divisée par n − 1. | s²=76/□ | x̄ = 49 ; méd = 50 ; s² = 19 ; s ≈ 4,36
  pièges : p_median_unsorted, p_median_mean, p_sd_n

```

### Niveau 3

```
Voici des nombres de pas (en centaines) par jour : 43, 43, 36, 29, 36, 27, 31. Calcule la moyenne, la médiane, la variance empirique s² et l'écart-type s (à 0,01 près).
  [tap, suivre l'erreur, menu menu]  x̄
    = 245/7   ← Somme des données : 43 + 43 + 36 + 29 + 36 + 27 + 31 = 245, divisée par n = 7
    = 35   ← Diviser
  — méd  [juge prob]  départ : méd
    ? Pour la médiane, que fais-tu d'abord ? ✔ Trier les données / · Prendre la 4ᵉ valeur de la liste donnée
    = 36   ← Données triées : 27, 29, 31, 36, 36, 43, 43 ; la 4ᵉ
  — Σ(xᵢ−x̄)2  [juge prob]  départ : Σ(xᵢ−x̄)²
    = 64 + 36 + 16 + 1 + 1 + 64 + 64   ← Chaque écart (xᵢ − x̄), au carré
    = 246   ← Additionner
  — s2  [juge prob]  départ : s²
    = 246/6   ← Diviser par n − 1
    = 41   ← Simplifier
  — s  [juge stat]  départ : s
    = √(41)   ← Écart-type : racine de la variance
    = 6,40   ← Arrondir au centième
  aides : Trie d'abord. Pour s², somme des écarts au carré, divisée par n − 1. | s²=246/□ | x̄ = 35 ; méd = 36 ; s² = 41 ; s ≈ 6,40
  pièges : p_median_unsorted, p_median_mean, p_sd_n

Voici des âges des joueurs d'un club : 17, 17, 29, 17, 30. Calcule la moyenne, la médiane, la variance empirique s² et l'écart-type s (à 0,01 près).
  [tap, suivre l'erreur, menu menu]  x̄
    = 110/5   ← Somme des données : 17 + 17 + 29 + 17 + 30 = 110, divisée par n = 5
    = 22   ← Diviser
  — méd  [juge prob]  départ : méd
    ? Pour la médiane, que fais-tu d'abord ? ✔ Trier les données / · Prendre la 3ᵉ valeur de la liste donnée
    = 17   ← Données triées : 17, 17, 17, 29, 30 ; la 3ᵉ
  — Σ(xᵢ−x̄)2  [juge prob]  départ : Σ(xᵢ−x̄)²
    = 25 + 25 + 25 + 49 + 64   ← Chaque écart (xᵢ − x̄), au carré
    = 188   ← Additionner
  — s2  [juge prob]  départ : s²
    = 188/4   ← Diviser par n − 1
    = 47   ← Simplifier
  — s  [juge stat]  départ : s
    = √(47)   ← Écart-type : racine de la variance
    = 6,86   ← Arrondir au centième
  aides : Trie d'abord. Pour s², somme des écarts au carré, divisée par n − 1. | s²=188/□ | x̄ = 22 ; méd = 17 ; s² = 47 ; s ≈ 6,86
  pièges : p_median_unsorted, p_median_mean, p_sd_n

Voici des temps de trajet (en minutes) : 55, 51, 46, 51, 48, 60, 56, 47, 53, 57, 48. Calcule la moyenne, la médiane, la variance empirique s² et l'écart-type s (à 0,01 près).
  [tap, suivre l'erreur, menu menu]  x̄
    = 572/11   ← Somme des données : 55 + 51 + 46 + 51 + 48 + 60 + 56 + 47 + 53 + 57 + 48 = 572, divisée par n = 11
    = 52   ← Diviser
  — méd  [juge prob]  départ : méd
    ? Pour la médiane, que fais-tu d'abord ? ✔ Trier les données / · Prendre la 6ᵉ valeur de la liste donnée
    = 51   ← Données triées : 46, 47, 48, 48, 51, 51, 53, 55, 56, 57, 60 ; la 6ᵉ
  — Σ(xᵢ−x̄)2  [juge prob]  départ : Σ(xᵢ−x̄)²
    = 36 + 25 + 16 + 16 + 1 + 1 + 1 + 9 + 16 + 25 + 64   ← Chaque écart (xᵢ − x̄), au carré
    = 210   ← Additionner
  — s2  [juge prob]  départ : s²
    = 210/10   ← Diviser par n − 1
    = 21   ← Simplifier
  — s  [juge stat]  départ : s
    = √(21)   ← Écart-type : racine de la variance
    = 4,58   ← Arrondir au centième
  aides : Trie d'abord. Pour s², somme des écarts au carré, divisée par n − 1. | s²=210/□ | x̄ = 52 ; méd = 51 ; s² = 21 ; s ≈ 4,58
  pièges : p_median_unsorted, p_median_mean, p_sd_n

```

### Niveau 4

```
Complète la fonction qui calcule la variance empirique s² d'une liste de données (l'estimateur sans biais du cours).
  [code python, 1 trou]
    | def variance(x):
    |     n = len(x)
    |     m = sum(x) / n
    |     s2 = 0.0
    |     for i in range(n):
    |         s2 = s2 + (x[i] - m) ** 2
    |     return s2 / ⟦(n - 1)⟧
    test : variance([2, 4, 4, 5, 7, 8]) → 4.8
    test : variance([10, 12, 9, 11, 13]) → 2.5
    test : variance([3, 7, 7, 19]) → 48.0
  pièges : p_sd_n

Complète la fonction qui calcule la variance empirique s² d'une liste de données (l'estimateur sans biais du cours).
  [code python, 2 trous]
    | def variance(x):
    |     n = len(x)
    |     m = sum(x) / n
    |     s2 = 0.0
    |     for i in range(n):
    |         s2 = s2 + ⟦(x[i] - m) ** 2⟧
    |     return s2 / ⟦(n - 1)⟧
    test : variance([2, 4, 4, 5, 7, 8]) → 4.8
    test : variance([10, 12, 9, 11, 13]) → 2.5
    test : variance([3, 7, 7, 19]) → 48.0
  pièges : p_sd_n

Complète la fonction qui calcule la variance empirique s² d'une liste de données (l'estimateur sans biais du cours).
  [code python, 1 trou]
    | def variance(x):
    |     n = len(x)
    |     m = sum(x) / n
    |     s2 = 0.0
    |     for i in range(n):
    |         s2 = s2 + (x[i] - m) ** 2
    |     return s2 / ⟦(n - 1)⟧
    test : variance([2, 4, 4, 5, 7, 8]) → 4.8
    test : variance([10, 12, 9, 11, 13]) → 2.5
    test : variance([3, 7, 7, 19]) → 48.0
  pièges : p_sd_n

```

### Niveau 5

```
Une série de longueurs en pouces a pour moyenne x̄ = 38, médiane 41 et écart-type s = 5. On convertit chaque donnée en centimètres (1 pouce = 2,54 cm). Sans refaire le calcul, donne ȳ, la médiane et l'écart-type des nouvelles données.
  [free, sans aide]  ȳ
    = 2,54·38 + 0   ← ȳ = a·x̄ + b
    = 96,52   ← Calculer
  — méd(y)  [juge prob]  départ : méd(y)
    = 104,14   ← La médiane suit la même règle
  — sy  [juge prob]  départ : s_y
    = 2,54·5   ← |a|·s_x
    = 12,7   ← Calculer
  pièges : p_lin_transform_sd

Voici des nombres de pas (en centaines) par jour : 58, 62, 45, 55, 63, 51, 58. Calcule la moyenne, la médiane, la variance empirique s² et l'écart-type s (à 0,01 près).
  [free, sans aide]  x̄
    = 392/7   ← Somme des données : 58 + 62 + 45 + 55 + 63 + 51 + 58 = 392, divisée par n = 7
    = 56   ← Diviser
  — méd  [juge prob]  départ : méd
    = 58   ← Données triées : 45, 51, 55, 58, 58, 62, 63 ; la 4ᵉ
  — Σ(xᵢ−x̄)2  [juge prob]  départ : Σ(xᵢ−x̄)²
    = 121 + 25 + 1 + 4 + 4 + 36 + 49   ← Chaque écart (xᵢ − x̄), au carré
    = 240   ← Additionner
  — s2  [juge prob]  départ : s²
    = 240/6   ← Diviser par n − 1
    = 40   ← Simplifier
  — s  [juge stat]  départ : s
    = √(40)   ← Écart-type : racine de la variance
    = 6,32   ← Arrondir au centième
  pièges : p_median_unsorted, p_median_mean, p_sd_n

Voici des temps de trajet (en minutes) : 36, 23, 22, 18, 31. Calcule la moyenne, la médiane, la variance empirique s² et l'écart-type s (à 0,01 près).
  [free, sans aide]  x̄
    = 130/5   ← Somme des données : 36 + 23 + 22 + 18 + 31 = 130, divisée par n = 5
    = 26   ← Diviser
  — méd  [juge prob]  départ : méd
    = 23   ← Données triées : 18, 22, 23, 31, 36 ; la 3ᵉ
  — Σ(xᵢ−x̄)2  [juge prob]  départ : Σ(xᵢ−x̄)²
    = 64 + 16 + 9 + 25 + 100   ← Chaque écart (xᵢ − x̄), au carré
    = 214   ← Additionner
  — s2  [juge prob]  départ : s²
    = 214/4   ← Diviser par n − 1
    = 53,5   ← Simplifier
  — s  [juge stat]  départ : s
    = √(53,5)   ← Écart-type : racine de la variance
    = 7,31   ← Arrondir au centième
  pièges : p_median_unsorted, p_median_mean, p_sd_n

```

### Variantes d'examen

```
Données : 17, 10, 3, 7, 18. Quelle est la variance empirique s² ?
  · 33,2 [p_sd_n]   · 55,3333   ✔ 41,5   · 166
  [examen mcq]
  pièges : p_sd_n

Vrai ou faux ?
  « La médiane est moins sensible aux valeurs aberrantes que la moyenne. » → VRAI
  [examen tf]
  pièges : p_median_mean

Données : 27, 23, 19, 28, 25, 30, 24, 25, 18, 16, 18. Donne l'écart-type empirique s (diviseur n − 1), à 0,01 près.
  [free, sans aide, examen coef]  s
    = √(21,4)   ← Écart-type : racine de la variance
    = 4,63   ← Arrondir au centième
  pièges : p_sd_n

```

## Quartiles, résumé en 5 valeurs, boîte à moustaches (`p-desc-boxplot`, BA3)

_Quartiles q̂(α) = x₍⌈nα⌉₎, résumé en 5 valeurs, moustaches et valeurs aberrantes._

### Niveau 1

```
Données (n = 7), triées : 7, 28, 31, 34, 35, 41, 45. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.
  [guided]  q̂(0,25)
    (Positions : ⌈7 · 0,25⌉ = 2, ⌈7/2⌉ = 4, ⌈7 · 0,75⌉ = 6.)
    = □   (trous : 28)   ← ⌈7 · 0,25⌉ = 2 : la 2ᵉ donnée
  — méd  [juge prob]  départ : méd
    = □   (trous : 34)   ← ⌈7/2⌉ = 4 : la 4ᵉ donnée
  — q̂(0,75)  [juge prob]  départ : q̂(0,75)
    = □   (trous : 41)   ← ⌈7 · 0,75⌉ = 6 : la 6ᵉ donnée
  — EIQ  [juge prob]  départ : EIQ
    = 41 − □   (trous : 41 − 28)   ← Écart entre les quartiles
    = □   (trous : 13)   ← Calculer
  — seuils  [juge prob]  départ : seuils
    = [□ ; □]   (trous : [8,5 ; 60,5])   ← C = 1,5 · 13 = 19,5 ; [28 − C ; 41 + C]
  — moustaches  [juge prob]  départ : moustaches
    = [□ ; □]   (trous : [28 ; 45])   ← Aberrante : 7
  aides : Position ⌈n·α⌉, puis la donnée à cette place. La moustache s'arrête sur une donnée. | q̂(0,75) = x₍⌈7 · 0,75⌉₎ = x₍□₎ | moustaches [28 ; 45] ; aberrantes : 7
  pièges : p_quartile_convention, p_boxplot_range, p_whisker_threshold

Données (n = 9), triées : 2, 4, 9, 14, 17, 19, 22, 27, 44. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.
  [guided]  q̂(0,25)
    (Positions : ⌈9 · 0,25⌉ = 3, ⌈9/2⌉ = 5, ⌈9 · 0,75⌉ = 7.)
    = □   (trous : 9)   ← ⌈9 · 0,25⌉ = 3 : la 3ᵉ donnée
  — méd  [juge prob]  départ : méd
    = □   (trous : 17)   ← ⌈9/2⌉ = 5 : la 5ᵉ donnée
  — q̂(0,75)  [juge prob]  départ : q̂(0,75)
    = □   (trous : 22)   ← ⌈9 · 0,75⌉ = 7 : la 7ᵉ donnée
  — EIQ  [juge prob]  départ : EIQ
    = 22 − □   (trous : 22 − 9)   ← Écart entre les quartiles
    = □   (trous : 13)   ← Calculer
  — seuils  [juge prob]  départ : seuils
    = [□ ; □]   (trous : [−10,5 ; 41,5])   ← C = 1,5 · 13 = 19,5 ; [9 − C ; 22 + C]
  — moustaches  [juge prob]  départ : moustaches
    = [□ ; □]   (trous : [2 ; 27])   ← Aberrante : 44
  aides : Position ⌈n·α⌉, puis la donnée à cette place. La moustache s'arrête sur une donnée. | q̂(0,75) = x₍⌈9 · 0,75⌉₎ = x₍□₎ | moustaches [2 ; 27] ; aberrantes : 44
  pièges : p_quartile_convention, p_boxplot_range, p_whisker_threshold

Données (n = 11), triées : 11, 12, 13, 19, 23, 29, 32, 35, 38, 39, 44. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.
  [guided]  q̂(0,25)
    (Positions : ⌈11 · 0,25⌉ = 3, ⌈11/2⌉ = 6, ⌈11 · 0,75⌉ = 9.)
    = □   (trous : 13)   ← ⌈11 · 0,25⌉ = 3 : la 3ᵉ donnée
  — méd  [juge prob]  départ : méd
    = □   (trous : 29)   ← ⌈11/2⌉ = 6 : la 6ᵉ donnée
  — q̂(0,75)  [juge prob]  départ : q̂(0,75)
    = □   (trous : 38)   ← ⌈11 · 0,75⌉ = 9 : la 9ᵉ donnée
  — EIQ  [juge prob]  départ : EIQ
    = 38 − □   (trous : 38 − 13)   ← Écart entre les quartiles
    = □   (trous : 25)   ← Calculer
  — seuils  [juge prob]  départ : seuils
    = [□ ; □]   (trous : [−24,5 ; 75,5])   ← C = 1,5 · 25 = 37,5 ; [13 − C ; 38 + C]
  — moustaches  [juge prob]  départ : moustaches
    = [□ ; □]   (trous : [11 ; 44])   ← Aucune valeur aberrante
  aides : Position ⌈n·α⌉, puis la donnée à cette place. La moustache s'arrête sur une donnée. | q̂(0,75) = x₍⌈11 · 0,75⌉₎ = x₍□₎ | moustaches [11 ; 44]
  pièges : p_quartile_convention, p_boxplot_range, p_whisker_threshold

```

### Niveau 2

```
Données (n = 13), triées : 23, 29, 33, 36, 38, 43, 45, 47, 51, 57, 60, 66, 100. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.
  [guided]  q̂(0,25)
    = □   (trous : 36)   ← ⌈13 · 0,25⌉ = 4 : la 4ᵉ donnée
  — méd  [juge prob]  départ : méd
    = □   (trous : 45)   ← ⌈13/2⌉ = 7 : la 7ᵉ donnée
  — q̂(0,75)  [juge prob]  départ : q̂(0,75)
    = □   (trous : 57)   ← ⌈13 · 0,75⌉ = 10 : la 10ᵉ donnée
  — EIQ  [juge prob]  départ : EIQ
    = 57 − □   (trous : 57 − 36)   ← Écart entre les quartiles
    = □   (trous : 21)   ← Calculer
  — seuils  [juge prob]  départ : seuils
    = [4,5 ; □]   (trous : [4,5 ; 88,5])   ← C = 1,5 · 21 = 31,5 ; [36 − C ; 57 + C]
  — moustaches  [juge prob]  départ : moustaches
    ? Y a-t-il des valeurs aberrantes ? ✔ Oui : 100, hors des seuils / · Non : toutes les données sont entre les seuils
    = [23 ; □]   (trous : [23 ; 66])   ← Aberrante : 100
  aides : Position ⌈n·α⌉, puis la donnée à cette place. La moustache s'arrête sur une donnée. | q̂(0,75) = x₍⌈13 · 0,75⌉₎ = x₍□₎ | moustaches [23 ; 66] ; aberrantes : 100
  pièges : p_quartile_convention, p_boxplot_range, p_whisker_threshold

Données (n = 10), triées : 11, 14, 18, 24, 29, 29, 30, 31, 32, 58. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.
  [guided]  q̂(0,25)
    = □   (trous : 18)   ← ⌈10 · 0,25⌉ = 3 : la 3ᵉ donnée
  — méd  [juge prob]  départ : méd
    = □   (trous : 29)   ← ⌈10/2⌉ = 5 : la 5ᵉ donnée
  — q̂(0,75)  [juge prob]  départ : q̂(0,75)
    = □   (trous : 31)   ← ⌈10 · 0,75⌉ = 8 : la 8ᵉ donnée
  — EIQ  [juge prob]  départ : EIQ
    = 31 − □   (trous : 31 − 18)   ← Écart entre les quartiles
    = □   (trous : 13)   ← Calculer
  — seuils  [juge prob]  départ : seuils
    = [−1,5 ; □]   (trous : [−1,5 ; 50,5])   ← C = 1,5 · 13 = 19,5 ; [18 − C ; 31 + C]
  — moustaches  [juge prob]  départ : moustaches
    ? Y a-t-il des valeurs aberrantes ? ✔ Oui : 58, hors des seuils / · Non : toutes les données sont entre les seuils
    = [11 ; □]   (trous : [11 ; 32])   ← Aberrante : 58
  aides : Position ⌈n·α⌉, puis la donnée à cette place. La moustache s'arrête sur une donnée. | q̂(0,75) = x₍⌈10 · 0,75⌉₎ = x₍□₎ | moustaches [11 ; 32] ; aberrantes : 58
  pièges : p_quartile_convention, p_boxplot_range, p_whisker_threshold

Données (n = 7), triées : 19, 24, 27, 31, 36, 42, 44. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.
  [guided]  q̂(0,25)
    = □   (trous : 24)   ← ⌈7 · 0,25⌉ = 2 : la 2ᵉ donnée
  — méd  [juge prob]  départ : méd
    = □   (trous : 31)   ← ⌈7/2⌉ = 4 : la 4ᵉ donnée
  — q̂(0,75)  [juge prob]  départ : q̂(0,75)
    = □   (trous : 42)   ← ⌈7 · 0,75⌉ = 6 : la 6ᵉ donnée
  — EIQ  [juge prob]  départ : EIQ
    = 42 − □   (trous : 42 − 24)   ← Écart entre les quartiles
    = □   (trous : 18)   ← Calculer
  — seuils  [juge prob]  départ : seuils
    = [−3 ; □]   (trous : [−3 ; 69])   ← C = 1,5 · 18 = 27 ; [24 − C ; 42 + C]
  — moustaches  [juge prob]  départ : moustaches
    ? Y a-t-il des valeurs aberrantes ? ✔ Non : toutes les données sont entre les seuils / · Oui : 44, la plus grande donnée
    = [19 ; □]   (trous : [19 ; 44])   ← Aucune valeur aberrante
  aides : Position ⌈n·α⌉, puis la donnée à cette place. La moustache s'arrête sur une donnée. | q̂(0,75) = x₍⌈7 · 0,75⌉₎ = x₍□₎ | moustaches [19 ; 44]
  pièges : p_quartile_convention, p_boxplot_range, p_whisker_threshold

```

### Niveau 3

```
Données (n = 14), triées : 14, 20, 25, 29, 31, 34, 35, 35, 41, 45, 51, 53, 55, 91. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.
  [tap, suivre l'erreur, menu menu]  q̂(0,25)
    = 29   ← ⌈14 · 0,25⌉ = 4 : la 4ᵉ donnée
  — méd  [juge prob]  départ : méd
    = 35   ← ⌈14/2⌉ = 7 : la 7ᵉ donnée
  — q̂(0,75)  [juge prob]  départ : q̂(0,75)
    = 51   ← ⌈14 · 0,75⌉ = 11 : la 11ᵉ donnée
  — EIQ  [juge prob]  départ : EIQ
    = 51 − 29   ← Écart entre les quartiles
    = 22   ← Calculer
  — seuils  [juge prob]  départ : seuils
    = [−4 ; 84]   ← C = 1,5 · 22 = 33 ; [29 − C ; 51 + C]
  — moustaches  [juge prob]  départ : moustaches
    ? Y a-t-il des valeurs aberrantes ? ✔ Oui : 91, hors des seuils / · Non : toutes les données sont entre les seuils
    = [14 ; 55]   ← Aberrante : 91
  aides : Position ⌈n·α⌉, puis la donnée à cette place. La moustache s'arrête sur une donnée. | q̂(0,75) = x₍⌈14 · 0,75⌉₎ = x₍□₎ | moustaches [14 ; 55] ; aberrantes : 91
  pièges : p_quartile_convention, p_boxplot_range, p_whisker_threshold

Données (n = 7) : 17, 5, 8, 20, 11, 9, 24. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.
  [tap, suivre l'erreur, menu menu]  q̂(0,25)
    = 8   ← ⌈7 · 0,25⌉ = 2 : la 2ᵉ donnée
  — méd  [juge prob]  départ : méd
    = 11   ← ⌈7/2⌉ = 4 : la 4ᵉ donnée
  — q̂(0,75)  [juge prob]  départ : q̂(0,75)
    = 20   ← ⌈7 · 0,75⌉ = 6 : la 6ᵉ donnée
  — EIQ  [juge prob]  départ : EIQ
    = 20 − 8   ← Écart entre les quartiles
    = 12   ← Calculer
  — seuils  [juge prob]  départ : seuils
    = [−10 ; 38]   ← C = 1,5 · 12 = 18 ; [8 − C ; 20 + C]
  — moustaches  [juge prob]  départ : moustaches
    ? Y a-t-il des valeurs aberrantes ? ✔ Non : toutes les données sont entre les seuils / · Oui : 24, la plus grande donnée
    = [5 ; 24]   ← Aucune valeur aberrante
  aides : Position ⌈n·α⌉, puis la donnée à cette place. La moustache s'arrête sur une donnée. | q̂(0,75) = x₍⌈7 · 0,75⌉₎ = x₍□₎ | moustaches [5 ; 24]
  pièges : p_quartile_convention, p_median_unsorted, p_boxplot_range, p_whisker_threshold

Données (n = 10), triées : 24, 29, 34, 38, 40, 40, 44, 49, 51, 84. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.
  [tap, suivre l'erreur, menu menu]  q̂(0,25)
    = 34   ← ⌈10 · 0,25⌉ = 3 : la 3ᵉ donnée
  — méd  [juge prob]  départ : méd
    = 40   ← ⌈10/2⌉ = 5 : la 5ᵉ donnée
  — q̂(0,75)  [juge prob]  départ : q̂(0,75)
    = 49   ← ⌈10 · 0,75⌉ = 8 : la 8ᵉ donnée
  — EIQ  [juge prob]  départ : EIQ
    = 49 − 34   ← Écart entre les quartiles
    = 15   ← Calculer
  — seuils  [juge prob]  départ : seuils
    = [11,5 ; 71,5]   ← C = 1,5 · 15 = 22,5 ; [34 − C ; 49 + C]
  — moustaches  [juge prob]  départ : moustaches
    ? Y a-t-il des valeurs aberrantes ? ✔ Oui : 84, hors des seuils / · Non : toutes les données sont entre les seuils
    = [24 ; 51]   ← Aberrante : 84
  aides : Position ⌈n·α⌉, puis la donnée à cette place. La moustache s'arrête sur une donnée. | q̂(0,75) = x₍⌈10 · 0,75⌉₎ = x₍□₎ | moustaches [24 ; 51] ; aberrantes : 84
  pièges : p_quartile_convention, p_boxplot_range, p_whisker_threshold

```

### Niveau 4

```
Données (n = 10), triées : 14, 16, 17, 22, 28, 28, 30, 32, 34, 36. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.
  [free, suivre l'erreur]  q̂(0,25)
    = 17   ← ⌈10 · 0,25⌉ = 3 : la 3ᵉ donnée
  — méd  [juge prob]  départ : méd
    = 28   ← ⌈10/2⌉ = 5 : la 5ᵉ donnée
  — q̂(0,75)  [juge prob]  départ : q̂(0,75)
    = 32   ← ⌈10 · 0,75⌉ = 8 : la 8ᵉ donnée
  — EIQ  [juge prob]  départ : EIQ
    = 32 − 17   ← Écart entre les quartiles
    = 15   ← Calculer
  — seuils  [juge prob]  départ : seuils
    = [−5,5 ; 54,5]   ← C = 1,5 · 15 = 22,5 ; [17 − C ; 32 + C]
  — moustaches  [juge prob]  départ : moustaches
    ? Y a-t-il des valeurs aberrantes ? ✔ Non : toutes les données sont entre les seuils / · Oui : 36, la plus grande donnée
    = [14 ; 36]   ← Aucune valeur aberrante
  aides : Position ⌈n·α⌉, puis la donnée à cette place. La moustache s'arrête sur une donnée. | q̂(0,75) = x₍⌈10 · 0,75⌉₎ = x₍□₎ | moustaches [14 ; 36]
  pièges : p_quartile_convention, p_boxplot_range, p_whisker_threshold

Données (n = 15), triées : 10, 11, 13, 15, 17, 23, 25, 27, 32, 34, 40, 44, 49, 50, 95. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.
  [free, suivre l'erreur]  q̂(0,25)
    = 15   ← ⌈15 · 0,25⌉ = 4 : la 4ᵉ donnée
  — méd  [juge prob]  départ : méd
    = 27   ← ⌈15/2⌉ = 8 : la 8ᵉ donnée
  — q̂(0,75)  [juge prob]  départ : q̂(0,75)
    = 44   ← ⌈15 · 0,75⌉ = 12 : la 12ᵉ donnée
  — EIQ  [juge prob]  départ : EIQ
    = 44 − 15   ← Écart entre les quartiles
    = 29   ← Calculer
  — seuils  [juge prob]  départ : seuils
    = [−28,5 ; 87,5]   ← C = 1,5 · 29 = 43,5 ; [15 − C ; 44 + C]
  — moustaches  [juge prob]  départ : moustaches
    ? Y a-t-il des valeurs aberrantes ? ✔ Oui : 95, hors des seuils / · Non : toutes les données sont entre les seuils
    = [10 ; 50]   ← Aberrante : 95
  aides : Position ⌈n·α⌉, puis la donnée à cette place. La moustache s'arrête sur une donnée. | q̂(0,75) = x₍⌈15 · 0,75⌉₎ = x₍□₎ | moustaches [10 ; 50] ; aberrantes : 95
  pièges : p_quartile_convention, p_boxplot_range, p_whisker_threshold

Données (n = 10) : 40, 34, 25, 68, 30, 16, 20, 39, 31, 31. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.
  [free, suivre l'erreur]  q̂(0,25)
    = 25   ← ⌈10 · 0,25⌉ = 3 : la 3ᵉ donnée
  — méd  [juge prob]  départ : méd
    = 31   ← ⌈10/2⌉ = 5 : la 5ᵉ donnée
  — q̂(0,75)  [juge prob]  départ : q̂(0,75)
    = 39   ← ⌈10 · 0,75⌉ = 8 : la 8ᵉ donnée
  — EIQ  [juge prob]  départ : EIQ
    = 39 − 25   ← Écart entre les quartiles
    = 14   ← Calculer
  — seuils  [juge prob]  départ : seuils
    = [4 ; 60]   ← C = 1,5 · 14 = 21 ; [25 − C ; 39 + C]
  — moustaches  [juge prob]  départ : moustaches
    ? Y a-t-il des valeurs aberrantes ? ✔ Oui : 68, hors des seuils / · Non : toutes les données sont entre les seuils
    = [16 ; 40]   ← Aberrante : 68
  aides : Position ⌈n·α⌉, puis la donnée à cette place. La moustache s'arrête sur une donnée. | q̂(0,75) = x₍⌈10 · 0,75⌉₎ = x₍□₎ | moustaches [16 ; 40] ; aberrantes : 68
  pièges : p_quartile_convention, p_median_unsorted, p_boxplot_range, p_whisker_threshold

```

### Niveau 5

```
Données (n = 11) : 38, 29, 88, 52, 46, 42, 41, 31, 32, 49, 23. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.
  [free, sans aide]  q̂(0,25)
    = 31   ← ⌈11 · 0,25⌉ = 3 : la 3ᵉ donnée
  — méd  [juge prob]  départ : méd
    = 41   ← ⌈11/2⌉ = 6 : la 6ᵉ donnée
  — q̂(0,75)  [juge prob]  départ : q̂(0,75)
    = 49   ← ⌈11 · 0,75⌉ = 9 : la 9ᵉ donnée
  — EIQ  [juge prob]  départ : EIQ
    = 49 − 31   ← Écart entre les quartiles
    = 18   ← Calculer
  — seuils  [juge prob]  départ : seuils
    = [4 ; 76]   ← C = 1,5 · 18 = 27 ; [31 − C ; 49 + C]
  — moustaches  [juge prob]  départ : moustaches
    = [23 ; 52]   ← Aberrante : 88
  pièges : p_quartile_convention, p_median_unsorted, p_boxplot_range, p_whisker_threshold

Données (n = 7), triées : 21, 23, 24, 28, 33, 36, 41. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.
  [free, sans aide]  q̂(0,25)
    = 23   ← ⌈7 · 0,25⌉ = 2 : la 2ᵉ donnée
  — méd  [juge prob]  départ : méd
    = 28   ← ⌈7/2⌉ = 4 : la 4ᵉ donnée
  — q̂(0,75)  [juge prob]  départ : q̂(0,75)
    = 36   ← ⌈7 · 0,75⌉ = 6 : la 6ᵉ donnée
  — EIQ  [juge prob]  départ : EIQ
    = 36 − 23   ← Écart entre les quartiles
    = 13   ← Calculer
  — seuils  [juge prob]  départ : seuils
    = [3,5 ; 55,5]   ← C = 1,5 · 13 = 19,5 ; [23 − C ; 36 + C]
  — moustaches  [juge prob]  départ : moustaches
    = [21 ; 41]   ← Aucune valeur aberrante
  pièges : p_quartile_convention, p_boxplot_range, p_whisker_threshold

Données (n = 14) : 53, 77, 48, 34, 27, 22, 11, 5, 31, 36, 17, 41, 43, 34. Calcule les quartiles (q̂(α) = x₍⌈nα⌉₎), la médiane, l'EIQ, les seuils q̂(0,25) − 1,5·EIQ et q̂(0,75) + 1,5·EIQ, puis les extrémités des moustaches.
  [free, sans aide]  q̂(0,25)
    = 22   ← ⌈14 · 0,25⌉ = 4 : la 4ᵉ donnée
  — méd  [juge prob]  départ : méd
    = 34   ← ⌈14/2⌉ = 7 : la 7ᵉ donnée
  — q̂(0,75)  [juge prob]  départ : q̂(0,75)
    = 43   ← ⌈14 · 0,75⌉ = 11 : la 11ᵉ donnée
  — EIQ  [juge prob]  départ : EIQ
    = 43 − 22   ← Écart entre les quartiles
    = 21   ← Calculer
  — seuils  [juge prob]  départ : seuils
    = [−9,5 ; 74,5]   ← C = 1,5 · 21 = 31,5 ; [22 − C ; 43 + C]
  — moustaches  [juge prob]  départ : moustaches
    = [5 ; 53]   ← Aberrante : 77
  pièges : p_quartile_convention, p_median_unsorted, p_boxplot_range, p_whisker_threshold

```

### Variantes d'examen

```
Données triées : 8, 12, 13, 14, 16, 21, 22, 24, 29, 32, 34, 35, 67. Que vaut l'écart interquartile (q̂(α) = x₍⌈nα⌉₎) ?
  · 32   · 20   · 59 [p_boxplot_range]   ✔ 18
  [examen mcq]
  pièges : p_boxplot_range

Vrai ou faux ?
  « Pour les données 3, 6, 9, 13, 15, 16, 19, la moustache supérieure va jusqu'à q̂(0,75) + 1,5·EIQ = 31. » → FAUX
    contre-exemple (refute) : m = 19
  [examen tf]
  pièges : p_whisker_threshold

```

## Axiomes, complément, inclusion-exclusion (`p-events`, BA3)

_Calculer avec les axiomes : complément, inclusion-exclusion Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B), différence._

### Niveau 1

```
On choisit un ménage au hasard dans une ville. A = « avoir un chat », B = « avoir un chien » ; Pr(A) = 0,6, Pr(B) = 0,8, Pr(A ∩ B) = 0,5. Probabilité qu’au moins un des deux arrive, puis qu’aucun des deux n’arrive ?
  [guided]  Pr(A ∪ B)
    (Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B))
    = 0,6 + 0,8 − □   (trous : 0,6 + 0,8 − 0,5)   ← Remplacer
    = □   (trous : 0,9)   ← Calculer
  — Pr(Aᶜ∩Bᶜ)  [juge prob]  départ : Pr(Aᶜ∩Bᶜ)
    = 1 − □   (trous : 1 − 0,9)   ← Complément
    = □   (trous : 0,1)   ← Calculer
  aides : « Ou » : inclusion-exclusion. « Ni l'un ni l'autre » : le contraire de « au moins un ». « A seulement » : Pr(A) − Pr(A ∩ B). | 0,6+0,8-□ | Pr(A ∪ B) = 0,9
  pièges : p_union_add, p_indep_assumed, p_complement_wrong

On choisit un ménage au hasard dans une ville. A = « avoir un chat », B = « avoir un chien » ; Pr(A) = 0,3, Pr(B) = 0,5, Pr(A ∩ B) = 0,1. Probabilité qu’au moins un des deux arrive (A ∪ B) ?
  [guided]  Pr(A ∪ B)
    (Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B))
    = 0,3 + 0,5 − □   (trous : 0,3 + 0,5 − 0,1)   ← Remplacer
    = □   (trous : 0,7)   ← Calculer
  aides : « Ou » : inclusion-exclusion. « Ni l'un ni l'autre » : le contraire de « au moins un ». « A seulement » : Pr(A) − Pr(A ∩ B). | 0,3+0,5-□ | Pr(A ∪ B) = 0,7
  pièges : p_union_add, p_indep_assumed

Un étudiant passe deux examens. A = « réussir l'examen d'analyse », B = « réussir l'examen d'algèbre » ; Pr(A) = 0,3, Pr(B) = 0,8, Pr(A ∩ B) = 0,2. Probabilité que A arrive sans B (A seulement) ?
  [guided]  Pr(A∩Bᶜ)
    = 0,3 − □   (trous : 0,3 − 0,2)   ← Remplacer
    = □   (trous : 0,1)   ← Calculer
  aides : « Ou » : inclusion-exclusion. « Ni l'un ni l'autre » : le contraire de « au moins un ». « A seulement » : Pr(A) − Pr(A ∩ B). | 0,3+0,8-□ | Pr(A ∪ B) = 0,9
  pièges : p_indep_assumed, p_conjunction

```

### Niveau 2

```
On choisit un ménage au hasard dans une ville. A = « avoir un chat », B = « avoir un chien » ; Pr(A) = 0,3, Pr(B) = 0,7, Pr(A ∩ B) = 0,2. Probabilité qu’au moins un des deux arrive, puis qu’aucun des deux n’arrive ?
  [guided]  Pr(A ∪ B)
    (Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B))
    = 0,3 + □   (trous : 0,3 + 0,7 − 0,2)   ← Remplacer
    = □   (trous : 0,8)   ← Calculer
  — Pr(Aᶜ∩Bᶜ)  [juge prob]  départ : Pr(Aᶜ∩Bᶜ)
    = 1 − □   (trous : 1 − 0,8)   ← Complément
    = □   (trous : 0,2)   ← Calculer
  aides : « Ou » : inclusion-exclusion. « Ni l'un ni l'autre » : le contraire de « au moins un ». « A seulement » : Pr(A) − Pr(A ∩ B). | 0,3+0,7-□ | Pr(A ∪ B) = 0,8
  pièges : p_union_add, p_indep_assumed, p_complement_wrong

On interroge une personne au hasard sur ses habitudes du matin. A = « lire le journal », B = « écouter la radio » ; Pr(A) = 0,2, Pr(B) = 0,4, Pr(A ∩ B) = 0,05. Probabilité que A arrive sans B (A seulement) ?
  [guided]  Pr(A∩Bᶜ)
    ? Une inégalité toujours vraie, avant de calculer : ✔ Pr(A ∩ B) ≤ Pr(A) ≤ Pr(A ∪ B), car A ∩ B ⊂ A ⊂ A ∪ B / · Pr(A ∩ B) peut dépasser Pr(A) si B est très probable
    = 0,2 − □   (trous : 0,2 − 0,05)   ← Remplacer
    = □   (trous : 0,15)   ← Calculer
  aides : « Ou » : inclusion-exclusion. « Ni l'un ni l'autre » : le contraire de « au moins un ». « A seulement » : Pr(A) − Pr(A ∩ B). | 0,2+0,4-□ | Pr(A ∪ B) = 0,55
  pièges : p_indep_assumed, p_conjunction

Un étudiant passe deux examens. A = « réussir l'examen d'analyse », B = « réussir l'examen d'algèbre » ; Pr(A) = 0,5, Pr(B) = 0,8, Pr(A ∩ B) = 0,35. Probabilité qu’au moins un des deux arrive, puis qu’aucun des deux n’arrive ?
  [guided]  Pr(A ∪ B)
    (Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B))
    = 0,5 + □   (trous : 0,5 + 0,8 − 0,35)   ← Remplacer
    = □   (trous : 0,95)   ← Calculer
  — Pr(Aᶜ∩Bᶜ)  [juge prob]  départ : Pr(Aᶜ∩Bᶜ)
    = 1 − □   (trous : 1 − 0,95)   ← Complément
    = □   (trous : 0,05)   ← Calculer
  aides : « Ou » : inclusion-exclusion. « Ni l'un ni l'autre » : le contraire de « au moins un ». « A seulement » : Pr(A) − Pr(A ∩ B). | 0,5+0,8-□ | Pr(A ∪ B) = 0,95
  pièges : p_union_add, p_indep_assumed, p_complement_wrong

```

### Niveau 3

```
Sur une machine, deux pannes peuvent survenir pendant un mois. A = « une panne du moteur », B = « une panne électrique » ; Pr(A) = 0,8, Pr(B) = 0,6, Pr(A ∩ B) = 0,55. Probabilité qu’au moins un des deux arrive, puis qu’aucun des deux n’arrive ?
  [tap, suivre l'erreur, menu menu]  Pr(A ∪ B)
    (Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B))
    = Pr(A) + Pr(B) − Pr(A ∩ B)   ← Inclusion-exclusion
    = 0,8 + 0,6 − 0,55   ← Remplacer
    = 0,85   ← Calculer
  — Pr(Aᶜ∩Bᶜ)  [juge prob]  départ : Pr(Aᶜ∩Bᶜ)
    = 1 − 0,85   ← Complément
    = 0,15   ← Calculer
  aides : « Ou » : inclusion-exclusion. « Ni l'un ni l'autre » : le contraire de « au moins un ». « A seulement » : Pr(A) − Pr(A ∩ B). | 0,8+0,6-□ | Pr(A ∪ B) = 0,85
  pièges : p_union_add, p_indep_assumed, p_complement_wrong

Sur une machine, deux pannes peuvent survenir pendant un mois. A = « une panne du moteur », B = « une panne électrique » ; Pr(A) = 0,7, Pr(B) = 0,7, Pr(A ∩ B) = 0,5. Probabilité qu’au moins un des deux arrive (A ∪ B) ?
  [tap, suivre l'erreur, menu menu]  Pr(A ∪ B)
    (Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B))
    = Pr(A) + Pr(B) − Pr(A ∩ B)   ← Inclusion-exclusion
    = 0,7 + 0,7 − 0,5   ← Remplacer
    = 0,9   ← Calculer
  aides : « Ou » : inclusion-exclusion. « Ni l'un ni l'autre » : le contraire de « au moins un ». « A seulement » : Pr(A) − Pr(A ∩ B). | 0,7+0,7-□ | Pr(A ∪ B) = 0,9
  pièges : p_union_add, p_indep_assumed

On interroge une personne au hasard sur ses habitudes du matin. A = « lire le journal », B = « écouter la radio » ; Pr(A) = 0,8, Pr(B) = 0,1, Pr(A ∩ B) = 0,05. Probabilité qu’au moins un des deux arrive, puis qu’aucun des deux n’arrive ?
  [tap, suivre l'erreur, menu menu]  Pr(A ∪ B)
    (Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B))
    = Pr(A) + Pr(B) − Pr(A ∩ B)   ← Inclusion-exclusion
    = 0,8 + 0,1 − 0,05   ← Remplacer
    = 0,85   ← Calculer
  — Pr(Aᶜ∩Bᶜ)  [juge prob]  départ : Pr(Aᶜ∩Bᶜ)
    = 1 − 0,85   ← Complément
    = 0,15   ← Calculer
  aides : « Ou » : inclusion-exclusion. « Ni l'un ni l'autre » : le contraire de « au moins un ». « A seulement » : Pr(A) − Pr(A ∩ B). | 0,8+0,1-□ | Pr(A ∪ B) = 0,85
  pièges : p_union_add, p_indep_assumed, p_complement_wrong

```

### Niveau 4

```
Un étudiant passe deux examens. A = « réussir l'examen d'analyse », B = « réussir l'examen d'algèbre » ; Pr(A) = 0,5, Pr(B) = 0,3, Pr(A ∩ B) = 0,1. Probabilité que A arrive sans B (A seulement) ?
  [free, suivre l'erreur]  Pr(A∩Bᶜ)
    ? Une inégalité toujours vraie, avant de calculer : ✔ Pr(A ∩ B) ≤ Pr(A) ≤ Pr(A ∪ B), car A ∩ B ⊂ A ⊂ A ∪ B / · Pr(A ∩ B) peut dépasser Pr(A) si B est très probable
    = Pr(A) − Pr(A ∩ B)   ← A seulement : A, sans la partie commune
    = 0,5 − 0,1   ← Remplacer
    = 0,4   ← Calculer
  aides : « Ou » : inclusion-exclusion. « Ni l'un ni l'autre » : le contraire de « au moins un ». « A seulement » : Pr(A) − Pr(A ∩ B). | 0,5+0,3-□ | Pr(A ∪ B) = 0,7
  pièges : p_indep_assumed, p_conjunction

On interroge une personne au hasard sur ses habitudes du matin. A = « lire le journal », B = « écouter la radio » ; Pr(A) = 0,8, Pr(B) = 0,7, Pr(A ∩ B) = 0,65. Probabilité que A arrive sans B (A seulement) ?
  [free, suivre l'erreur]  Pr(A∩Bᶜ)
    ? Une inégalité toujours vraie, avant de calculer : ✔ Pr(A ∩ B) ≤ Pr(A) ≤ Pr(A ∪ B), car A ∩ B ⊂ A ⊂ A ∪ B / · Pr(A ∩ B) peut dépasser Pr(A) si B est très probable
    = Pr(A) − Pr(A ∩ B)   ← A seulement : A, sans la partie commune
    = 0,8 − 0,65   ← Remplacer
    = 0,15   ← Calculer
  aides : « Ou » : inclusion-exclusion. « Ni l'un ni l'autre » : le contraire de « au moins un ». « A seulement » : Pr(A) − Pr(A ∩ B). | 0,8+0,7-□ | Pr(A ∪ B) = 0,85
  pièges : p_indep_assumed, p_conjunction

Un étudiant passe deux examens. A = « réussir l'examen d'analyse », B = « réussir l'examen d'algèbre » ; Pr(A) = 0,5, Pr(B) = 0,5, Pr(A ∩ B) = 0,05. Probabilité qu’au moins un des deux arrive (A ∪ B) ?
  [free, suivre l'erreur]  Pr(A ∪ B)
    (Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B))
    = Pr(A) + Pr(B) − Pr(A ∩ B)   ← Inclusion-exclusion
    = 0,5 + 0,5 − 0,05   ← Remplacer
    = 0,95   ← Calculer
  aides : « Ou » : inclusion-exclusion. « Ni l'un ni l'autre » : le contraire de « au moins un ». « A seulement » : Pr(A) − Pr(A ∩ B). | 0,5+0,5-□ | Pr(A ∪ B) = 0,95
  pièges : p_union_add, p_indep_assumed

```

### Niveau 5

```
Un étudiant passe deux examens. A = « réussir l'examen d'analyse », B = « réussir l'examen d'algèbre » ; Pr(A) = 0,3, Pr(B) = 0,2, Pr(A ∩ B) = 0,05. Calcule Pr(A ∪ B), Pr(ni A ni B), Pr(A seulement) et Pr(B seulement).
  [free, sans aide]  Pr(A ∪ B)
    (Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B))
    = Pr(A) + Pr(B) − Pr(A ∩ B)   ← Inclusion-exclusion
    = 0,3 + 0,2 − 0,05   ← Remplacer
    = 0,45   ← Calculer
  — Pr(Aᶜ∩Bᶜ)  [juge prob]  départ : Pr(Aᶜ∩Bᶜ)
    = 1 − 0,45   ← Complément
    = 0,55   ← Calculer
  — Pr(A∩Bᶜ)  [juge prob]  départ : Pr(A∩Bᶜ)
    = Pr(A) − Pr(A ∩ B)   ← A seulement : A, sans la partie commune
    = 0,3 − 0,05   ← Remplacer
    = 0,25   ← Calculer
  — Pr(B∩Aᶜ)  [juge prob]  départ : Pr(B∩Aᶜ)
    = Pr(B) − Pr(A ∩ B)   ← B seulement : B, sans la partie commune
    = 0,2 − 0,05   ← Remplacer
    = 0,15   ← Calculer
  pièges : p_union_add, p_indep_assumed, p_complement_wrong

On interroge une personne au hasard sur ses habitudes du matin. A = « lire le journal », B = « écouter la radio » ; Pr(A) = 0,9, Pr(B) = 0,4, Pr(A ∩ B) = 0,35. Calcule Pr(A ∪ B), Pr(ni A ni B), Pr(A seulement) et Pr(B seulement).
  [free, sans aide]  Pr(A ∪ B)
    (Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B))
    = Pr(A) + Pr(B) − Pr(A ∩ B)   ← Inclusion-exclusion
    = 0,9 + 0,4 − 0,35   ← Remplacer
    = 0,95   ← Calculer
  — Pr(Aᶜ∩Bᶜ)  [juge prob]  départ : Pr(Aᶜ∩Bᶜ)
    = 1 − 0,95   ← Complément
    = 0,05   ← Calculer
  — Pr(A∩Bᶜ)  [juge prob]  départ : Pr(A∩Bᶜ)
    = Pr(A) − Pr(A ∩ B)   ← A seulement : A, sans la partie commune
    = 0,9 − 0,35   ← Remplacer
    = 0,55   ← Calculer
  — Pr(B∩Aᶜ)  [juge prob]  départ : Pr(B∩Aᶜ)
    = Pr(B) − Pr(A ∩ B)   ← B seulement : B, sans la partie commune
    = 0,4 − 0,35   ← Remplacer
    = 0,05   ← Calculer
  pièges : p_union_add, p_indep_assumed, p_complement_wrong

Sur une machine, deux pannes peuvent survenir pendant un mois. A = « une panne du moteur », B = « une panne électrique » ; Pr(A) = 0,8, Pr(B) = 0,2, Pr(A ∩ B) = 0,1. Calcule Pr(A ∪ B), Pr(ni A ni B), Pr(A seulement) et Pr(B seulement).
  [free, sans aide]  Pr(A ∪ B)
    (Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B))
    = Pr(A) + Pr(B) − Pr(A ∩ B)   ← Inclusion-exclusion
    = 0,8 + 0,2 − 0,1   ← Remplacer
    = 0,9   ← Calculer
  — Pr(Aᶜ∩Bᶜ)  [juge prob]  départ : Pr(Aᶜ∩Bᶜ)
    = 1 − 0,9   ← Complément
    = 0,1   ← Calculer
  — Pr(A∩Bᶜ)  [juge prob]  départ : Pr(A∩Bᶜ)
    = Pr(A) − Pr(A ∩ B)   ← A seulement : A, sans la partie commune
    = 0,8 − 0,1   ← Remplacer
    = 0,7   ← Calculer
  — Pr(B∩Aᶜ)  [juge prob]  départ : Pr(B∩Aᶜ)
    = Pr(B) − Pr(A ∩ B)   ← B seulement : B, sans la partie commune
    = 0,2 − 0,1   ← Remplacer
    = 0,1   ← Calculer
  pièges : p_union_add, p_indep_assumed, p_complement_wrong

```

### Variantes d'examen

```
Pr(A) = 0,3, Pr(B) = 0,7 et Pr(A ∩ B) = 0,1. Que vaut Pr(A ∪ B) ?
  · 1 [p_union_add]   · 0,79 [p_indep_assumed]   · 0,1   ✔ 0,9
  [examen mcq]
  pièges : p_union_add, p_indep_assumed

Vrai ou faux ?
  « Pr(A ∪ B) = Pr(A) + Pr(B) pour tous événements A et B. » → FAUX
    contre-exemple (refute) : a = 1/2, b = 1/2, c = 1/2
  [examen tf]
  pièges : p_union_add

On interroge une personne au hasard sur ses habitudes du matin. A = « lire le journal », B = « écouter la radio » ; Pr(A) = 0,2, Pr(B) = 0,2, Pr(A ∩ B) = 0,05. Probabilité que A arrive sans B (A seulement) ?
  [free, sans aide, examen coef]  Pr(A∩Bᶜ)
    = Pr(A) − Pr(A ∩ B)   ← A seulement : A, sans la partie commune
    = 0,2 − 0,05   ← Remplacer
    = 0,15   ← Calculer
  pièges : p_indep_assumed, p_conjunction

```

## Équiprobabilité et dénombrement (`p-count`, BA3)

_Quand les issues sont équiprobables, Pr(A) = |A|/|Ω|, en comptant A et Ω de la même façon._

### Niveau 1

```
On tire 4 cartes d'un coup dans un jeu de 36 cartes (il contient 4 rois). Quelle est la probabilité d'obtenir exactement 2 rois ? Donne |Ω|, |A|, puis Pr(A) en fraction irréductible.
  [guided]  |Ω|
    = C(36;□)   (trous : C(36;4))   ← 4 cartes parmi 36
    = □   (trous : 58905)   ← Calculer
  — |A|  [juge prob]  départ : |A|
    = C(4;□)×C(32;2)   (trous : C(4;2)×C(32;2))   ← 2 rois parmi 4, puis 2 autres parmi 32
    = 6·□   (trous : 6·496)   ← Calculer chaque facteur
    = □   (trous : 2976)   ← Multiplier
  — Pr(A)  [juge prob]  départ : Pr(A)
    = 2976/□   (trous : 2976/58905)   ← Cas favorables sur cas possibles
    = 992/19635≈0,0505   ← Fraction irréductible (et sa valeur approchée)
  aides : Choisis les rois, puis les autres : multiplie les deux comptes. Compte Ω de la même façon (sans ordre). | C(4;2)×C(□;□) | |A| = 6 · 496 = 2976
  pièges : p_count_forget_rest, p_binom_without_replacement, g7_order_confusion

On tire 4 cartes d'un coup dans un jeu de 32 cartes (il contient 4 dames). Quelle est la probabilité d'obtenir exactement 1 dame ? Donne |Ω|, |A|, puis Pr(A) en fraction irréductible.
  [guided]  |Ω|
    = C(32;□)   (trous : C(32;4))   ← 4 cartes parmi 32
    = □   (trous : 35960)   ← Calculer
  — |A|  [juge prob]  départ : |A|
    = C(4;□)×C(28;□)   (trous : C(4;1)×C(28;3))   ← 1 dame parmi 4, puis 3 autres parmi 28
    = 4·□   (trous : 4·3276)   ← Calculer chaque facteur
    = □   (trous : 13104)   ← Multiplier
  — Pr(A)  [juge prob]  départ : Pr(A)
    = 13104/□   (trous : 13104/35960)   ← Cas favorables sur cas possibles
    = 1638/4495≈0,3644   ← Fraction irréductible (et sa valeur approchée)
  aides : Choisis les dames, puis les autres : multiplie les deux comptes. Compte Ω de la même façon (sans ordre). | C(4;1)×C(□;□) | |A| = 4 · 3276 = 13104
  pièges : p_count_forget_rest, p_binom_without_replacement, g7_order_confusion

Un lot de 25 pièces contient 5 pièces défectueuses. On en contrôle 4, prises au hasard en même temps. Quelle est la probabilité d'obtenir exactement 1 pièce défectueuse ? Donne |Ω|, |A|, puis Pr(A) en fraction irréductible.
  [guided]  |Ω|
    = C(25;□)   (trous : C(25;4))   ← 4 pièces parmi 25
    = □   (trous : 12650)   ← Calculer
  — |A|  [juge prob]  départ : |A|
    = C(5;□)×C(20;□)   (trous : C(5;1)×C(20;3))   ← 1 pièce défectueuse parmi 5, puis 3 autres parmi 20
    = 5·□   (trous : 5·1140)   ← Calculer chaque facteur
    = □   (trous : 5700)   ← Multiplier
  — Pr(A)  [juge prob]  départ : Pr(A)
    = 5700/□   (trous : 5700/12650)   ← Cas favorables sur cas possibles
    = 114/253≈0,4506   ← Fraction irréductible (et sa valeur approchée)
  aides : Choisis les pièces défectueuses, puis les autres : multiplie les deux comptes. Compte Ω de la même façon (sans ordre). | C(5;1)×C(□;□) | |A| = 5 · 1140 = 5700
  pièges : p_count_forget_rest, p_binom_without_replacement, g7_order_confusion

```

### Niveau 2

```
On tire 4 cartes d'un coup dans un jeu de 36 cartes (il contient 4 rois). Quelle est la probabilité d'obtenir exactement 1 roi ? Donne |Ω|, |A|, puis Pr(A) en fraction irréductible.
  [guided]  |Ω|
    ? Comment compter les tirages ? ✔ Sans ordre et sans remise : des combinaisons C(N, n) / · Avec ordre : des arrangements A(N, n) / · Avec remise : une loi binomiale
    = C(36;□)   (trous : C(36;4))   ← 4 cartes parmi 36
    = □   (trous : 58905)   ← Calculer
  — |A|  [juge prob]  départ : |A|
    = C(4;1)×□   (trous : C(4;1)×C(32;3))   ← 1 roi parmi 4, puis 3 autres parmi 32
    = 4·□   (trous : 4·4960)   ← Calculer chaque facteur
    = □   (trous : 19840)   ← Multiplier
  — Pr(A)  [juge prob]  départ : Pr(A)
    = 19840/□   (trous : 19840/58905)   ← Cas favorables sur cas possibles
    = 3968/11781≈0,3368   ← Fraction irréductible (et sa valeur approchée)
  aides : Choisis les rois, puis les autres : multiplie les deux comptes. Compte Ω de la même façon (sans ordre). | C(4;1)×C(□;□) | |A| = 4 · 4960 = 19840
  pièges : p_count_forget_rest, p_binom_without_replacement, g7_order_confusion

On tire 4 cartes d'un coup dans un jeu de 52 cartes (13 cœurs). Quelle est la probabilité d'obtenir exactement 1 cœur ? Donne |Ω|, |A|, puis Pr(A) en fraction irréductible.
  [guided]  |Ω|
    ? Comment compter les tirages ? ✔ Sans ordre et sans remise : des combinaisons C(N, n) / · Avec ordre : des arrangements A(N, n) / · Avec remise : une loi binomiale
    = C(52;□)   (trous : C(52;4))   ← 4 cartes parmi 52
    = □   (trous : 270725)   ← Calculer
  — |A|  [juge prob]  départ : |A|
    = C(13;1)×□   (trous : C(13;1)×C(39;3))   ← 1 cœur parmi 13, puis 3 autres parmi 39
    = 13·□   (trous : 13·9139)   ← Calculer chaque facteur
    = □   (trous : 118807)   ← Multiplier
  — Pr(A)  [juge prob]  départ : Pr(A)
    = 118807/□   (trous : 118807/270725)   ← Cas favorables sur cas possibles
    = 9139/20825≈0,4388   ← Fraction irréductible (et sa valeur approchée)
  aides : Choisis les cœurs, puis les autres : multiplie les deux comptes. Compte Ω de la même façon (sans ordre). | C(13;1)×C(□;□) | |A| = 13 · 9139 = 118807
  pièges : p_count_forget_rest, p_binom_without_replacement, g7_order_confusion

On tire 5 cartes d'un coup dans un jeu de 32 cartes (il contient 4 dames). Quelle est la probabilité d'obtenir exactement 3 dames ? Donne |Ω|, |A|, puis Pr(A) en fraction irréductible.
  [guided]  |Ω|
    ? Comment compter les tirages ? ✔ Sans ordre et sans remise : des combinaisons C(N, n) / · Avec ordre : des arrangements A(N, n) / · Avec remise : une loi binomiale
    = C(32;□)   (trous : C(32;5))   ← 5 cartes parmi 32
    = □   (trous : 201376)   ← Calculer
  — |A|  [juge prob]  départ : |A|
    = C(4;3)×□   (trous : C(4;3)×C(28;2))   ← 3 dames parmi 4, puis 2 autres parmi 28
    = 4·□   (trous : 4·378)   ← Calculer chaque facteur
    = □   (trous : 1512)   ← Multiplier
  — Pr(A)  [juge prob]  départ : Pr(A)
    = 1512/□   (trous : 1512/201376)   ← Cas favorables sur cas possibles
    = 27/3596≈0,0075   ← Fraction irréductible (et sa valeur approchée)
  aides : Choisis les dames, puis les autres : multiplie les deux comptes. Compte Ω de la même façon (sans ordre). | C(4;3)×C(□;□) | |A| = 4 · 378 = 1512
  pièges : p_count_forget_rest, p_binom_without_replacement, g7_order_confusion

```

### Niveau 3

```
On tire 4 cartes d'un coup dans un jeu de 52 cartes (13 cœurs). Quelle est la probabilité d'obtenir exactement 3 cœurs ? Donne |Ω|, |A|, puis Pr(A) en fraction irréductible.
  [tap, suivre l'erreur, menu menu]  |Ω|
    ? Comment compter les tirages ? ✔ Sans ordre et sans remise : des combinaisons C(N, n) / · Avec ordre : des arrangements A(N, n) / · Avec remise : une loi binomiale
    = C(52;4)   ← 4 cartes parmi 52
    = 270725   ← Calculer
  — |A|  [juge prob]  départ : |A|
    = C(13;3)×C(39;1)   ← 3 cœurs parmi 13, puis 1 autre parmi 39
    = 286·39   ← Calculer chaque facteur
    = 11154   ← Multiplier
  — Pr(A)  [juge prob]  départ : Pr(A)
    = 11154/270725   ← Cas favorables sur cas possibles
    = 858/20825≈0,0412   ← Fraction irréductible (et sa valeur approchée)
  aides : Choisis les cœurs, puis les autres : multiplie les deux comptes. Compte Ω de la même façon (sans ordre). | C(13;3)×C(□;□) | |A| = 286 · 39 = 11154
  pièges : p_count_forget_rest, p_binom_without_replacement, g7_order_confusion

Un comité de 4 personnes est tiré au sort parmi 6 femmes et 5 hommes. Quelle est la probabilité d'obtenir exactement 2 femmes ? Donne |Ω|, |A|, puis Pr(A) en fraction irréductible.
  [tap, suivre l'erreur, menu menu]  |Ω|
    ? Comment compter les tirages ? ✔ Sans ordre et sans remise : des combinaisons C(N, n) / · Avec ordre : des arrangements A(N, n) / · Avec remise : une loi binomiale
    = C(11;4)   ← 4 personnes parmi 11
    = 330   ← Calculer
  — |A|  [juge prob]  départ : |A|
    = C(6;2)×C(5;2)   ← 2 femmes parmi 6, puis 2 autres parmi 5
    = 15·10   ← Calculer chaque facteur
    = 150   ← Multiplier
  — Pr(A)  [juge prob]  départ : Pr(A)
    = 150/330   ← Cas favorables sur cas possibles
    = 5/11≈0,4545   ← Fraction irréductible (et sa valeur approchée)
  aides : Choisis les femmes, puis les autres : multiplie les deux comptes. Compte Ω de la même façon (sans ordre). | C(6;2)×C(□;□) | |A| = 15 · 10 = 150
  pièges : p_count_forget_rest, p_binom_without_replacement, g7_order_confusion

Un comité de 3 personnes est tiré au sort parmi 11 femmes et 9 hommes. Quelle est la probabilité d'obtenir exactement 2 femmes ? Donne |Ω|, |A|, puis Pr(A) en fraction irréductible.
  [tap, suivre l'erreur, menu menu]  |Ω|
    ? Comment compter les tirages ? ✔ Sans ordre et sans remise : des combinaisons C(N, n) / · Avec ordre : des arrangements A(N, n) / · Avec remise : une loi binomiale
    = C(20;3)   ← 3 personnes parmi 20
    = 1140   ← Calculer
  — |A|  [juge prob]  départ : |A|
    = C(11;2)×C(9;1)   ← 2 femmes parmi 11, puis 1 autre parmi 9
    = 55·9   ← Calculer chaque facteur
    = 495   ← Multiplier
  — Pr(A)  [juge prob]  départ : Pr(A)
    = 495/1140   ← Cas favorables sur cas possibles
    = 33/76≈0,4342   ← Fraction irréductible (et sa valeur approchée)
  aides : Choisis les femmes, puis les autres : multiplie les deux comptes. Compte Ω de la même façon (sans ordre). | C(11;2)×C(□;□) | |A| = 55 · 9 = 495
  pièges : p_count_forget_rest, p_binom_without_replacement, g7_order_confusion

```

### Niveau 4

```
On tire 3 cartes d'un coup dans un jeu de 32 cartes (il contient 4 dames). Quelle est la probabilité d'obtenir au moins deux dames ?
  [free, suivre l'erreur]  |Ω|
    = C(32;3)   ← Sans ordre
    = 4960   ← Calculer
  — Pr(X=0)  [juge prob]  départ : Pr(X = 0)
    = C(28;3)/4960   ← Aucune des dames
    = 819/1240   ← Simplifier
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = 4×C(28;2)/4960   ← Exactement une
    = 189/620   ← Simplifier
  — Pr(X≥2)  [juge prob]  départ : Pr(X ≥ 2)
    = 1 − 819/1240 − 189/620   ← Complément
    = 43/1240   ← Calculer
  aides : « Au moins 2 » : le contraire de « 0 ou 1 ». Compte ces deux cas. | 1-□-□ | Pr(X ≥ 2) = 43/1240
  pièges : p_exactly_atleast

Un lot de 15 pièces contient 4 pièces défectueuses. On en contrôle 3, prises au hasard en même temps. Quelle est la probabilité d'obtenir au moins deux pièces défectueuses ?
  [free, suivre l'erreur]  |Ω|
    = C(15;3)   ← Sans ordre
    = 455   ← Calculer
  — Pr(X=0)  [juge prob]  départ : Pr(X = 0)
    = C(11;3)/455   ← Aucune des pièces défectueuses
    = 33/91   ← Simplifier
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = 4×C(11;2)/455   ← Exactement une
    = 44/91   ← Simplifier
  — Pr(X≥2)  [juge prob]  départ : Pr(X ≥ 2)
    = 1 − 33/91 − 44/91   ← Complément
    = 2/13   ← Calculer
  aides : « Au moins 2 » : le contraire de « 0 ou 1 ». Compte ces deux cas. | 1-□-□ | Pr(X ≥ 2) = 2/13
  pièges : p_exactly_atleast

Un lot de 26 pièces contient 6 pièces défectueuses. On en contrôle 4, prises au hasard en même temps. Quelle est la probabilité d'obtenir exactement 1 pièce défectueuse ? Donne |Ω|, |A|, puis Pr(A) en fraction irréductible.
  [free, suivre l'erreur]  |Ω|
    = C(26;4)   ← 4 pièces parmi 26
    = 14950   ← Calculer
  — |A|  [juge prob]  départ : |A|
    = C(6;1)×C(20;3)   ← 1 pièce défectueuse parmi 6, puis 3 autres parmi 20
    = 6·1140   ← Calculer chaque facteur
    = 6840   ← Multiplier
  — Pr(A)  [juge prob]  départ : Pr(A)
    = 6840/14950   ← Cas favorables sur cas possibles
    = 684/1495≈0,4575   ← Fraction irréductible (et sa valeur approchée)
  aides : Choisis les pièces défectueuses, puis les autres : multiplie les deux comptes. Compte Ω de la même façon (sans ordre). | C(6;1)×C(□;□) | |A| = 6 · 1140 = 6840
  pièges : p_count_forget_rest, p_binom_without_replacement, g7_order_confusion

```

### Niveau 5

```
On tire 3 cartes d'un coup dans un jeu de 52 cartes (13 cœurs). Quelle est la probabilité d'obtenir au moins deux cœurs ?
  [free, sans aide]  |Ω|
    = C(52;3)   ← Sans ordre
    = 22100   ← Calculer
  — Pr(X=0)  [juge prob]  départ : Pr(X = 0)
    = C(39;3)/22100   ← Aucun des cœurs
    = 703/1700   ← Simplifier
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = 13×C(39;2)/22100   ← Exactement un
    = 741/1700   ← Simplifier
  — Pr(X≥2)  [juge prob]  départ : Pr(X ≥ 2)
    = 1 − 703/1700 − 741/1700   ← Complément
    = 64/425   ← Calculer
  pièges : p_exactly_atleast

On tire 4 cartes d'un coup dans un jeu de 32 cartes (il contient 4 dames). Quelle est la probabilité d'obtenir au moins deux dames ?
  [free, sans aide]  |Ω|
    = C(32;4)   ← Sans ordre
    = 35960   ← Calculer
  — Pr(X=0)  [juge prob]  départ : Pr(X = 0)
    = C(28;4)/35960   ← Aucune des dames
    = 4095/7192   ← Simplifier
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = 4×C(28;3)/35960   ← Exactement une
    = 1638/4495   ← Simplifier
  — Pr(X≥2)  [juge prob]  départ : Pr(X ≥ 2)
    = 1 − 4095/7192 − 1638/4495   ← Complément
    = 2381/35960   ← Calculer
  pièges : p_exactly_atleast

On tire 5 cartes d'un coup dans un jeu de 32 cartes (il contient 4 dames). Quelle est la probabilité d'obtenir au moins deux dames ?
  [free, sans aide]  |Ω|
    = C(32;5)   ← Sans ordre
    = 201376   ← Calculer
  — Pr(X=0)  [juge prob]  départ : Pr(X = 0)
    = C(28;5)/201376   ← Aucune des dames
    = 1755/3596   ← Simplifier
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = 4×C(28;4)/201376   ← Exactement une
    = 2925/7192   ← Simplifier
  — Pr(X≥2)  [juge prob]  départ : Pr(X ≥ 2)
    = 1 − 1755/3596 − 2925/7192   ← Complément
    = 757/7192   ← Calculer
  pièges : p_exactly_atleast

```

### Variantes d'examen

```
Un lot de 20 pièces contient 5 pièces défectueuses. On en contrôle 4, prises au hasard en même temps. Probabilité d'obtenir exactement 3 pièces défectueuses ?
  · 5/3876 [g7_order_confusion]   ✔ 10/323   · 2/969 [p_count_forget_rest]   · 3/64 [p_binom_without_replacement]
  [examen mcq]
  pièges : p_count_forget_rest, p_binom_without_replacement, g7_order_confusion

Vrai ou faux ?
  « Tirer 4 cartes d'un coup ou une par une sans remise donne la même probabilité pour « exactement 2 dames ». » → VRAI
  [examen tf]

Un lot de 18 pièces contient 4 pièces défectueuses. On en contrôle 3, prises au hasard en même temps. Probabilité d'obtenir exactement 1 pièce défectueuse (fraction irréductible) ?
  [free, sans aide, examen coef]  Pr(A)
    = 364/816   ← Cas favorables sur cas possibles
    = 91/204≈0,4461   ← Fraction irréductible (et sa valeur approchée)
  pièges : p_count_forget_rest, p_binom_without_replacement, g7_order_confusion

```

## Conditionnement et probabilités totales (`p-cond-total`, BA3)

_Conditionner, Pr(A | B) = Pr(A ∩ B)/Pr(B), et sommer les branches d'une partition (probabilités totales)._

### Niveau 1

```
On lance une pièce équilibrée : pile, on tire une boule dans l'urne 1 (4 rouges sur 9) ; face, dans l'urne 2 (3 rouges sur 5). Probabilité de tirer une boule rouge ?
  [guided]  Pr(R)
    = 1/2·4/9 + □   (trous : 1/2·4/9 + 1/2·3/5)   ← Une branche par cas
    = 2/9 + □   (trous : 2/9 + 0,3)   ← Multiplier le long des branches
    = □   (trous : 47/90)   ← Additionner
  aides : Une branche par cas ; on multiplie le long d'une branche, on additionne les branches. | 1/2×4/9+□ | Pr(R) = 47/90
  pièges : p_total_missing_branch

Dans une population, 5 % des personnes sont malades. Un test est positif avec probabilité 0,9 chez un malade et 0,05 chez une personne saine. Probabilité qu'une personne prise au hasard ait un test positif ?
  [guided]  Pr(+)
    = 0,9·0,05 + □   (trous : 0,9·0,05 + 0,05·0,95)   ← Une branche par cas
    = 0,045 + □   (trous : 0,045 + 0,0475)   ← Multiplier le long des branches
    = □   (trous : 0,0925)   ← Additionner
  aides : Une branche par cas ; on multiplie le long d'une branche, on additionne les branches. | 0,9×0,05+□ | Pr(+) = 0,0925
  pièges : p_total_missing_branch

Dans une population, 30 % des personnes sont malades. Un test est positif avec probabilité 0,9 chez un malade et 0,1 chez une personne saine. Probabilité qu'une personne prise au hasard ait un test positif ?
  [guided]  Pr(+)
    = 0,9·0,3 + □   (trous : 0,9·0,3 + 0,1·0,7)   ← Une branche par cas
    = 0,27 + □   (trous : 0,27 + 0,07)   ← Multiplier le long des branches
    = □   (trous : 0,34)   ← Additionner
  aides : Une branche par cas ; on multiplie le long d'une branche, on additionne les branches. | 0,9×0,3+□ | Pr(+) = 0,34
  pièges : p_total_missing_branch

```

### Niveau 2

```
Dans une population, 5 % des personnes sont malades. Un test est positif avec probabilité 0,8 chez un malade et 0,1 chez une personne saine. Probabilité qu'une personne prise au hasard ait un test positif ?
  [guided]  Pr(+)
    ? Sur quels cas découper (quelle partition) ? ✔ Malade ou sain : deux branches / · Seulement le cas le plus probable
    = 0,8·0,05 + □   (trous : 0,8·0,05 + 0,1·0,95)   ← Une branche par cas
    = 0,04 + □   (trous : 0,04 + 0,095)   ← Multiplier le long des branches
    = □   (trous : 0,135)   ← Additionner
  aides : Une branche par cas ; on multiplie le long d'une branche, on additionne les branches. | 0,8×0,05+□ | Pr(+) = 0,135
  pièges : p_total_missing_branch

Dans une population, 5 % des personnes sont malades. Un test est positif avec probabilité 0,8 chez un malade et 0,05 chez une personne saine. Probabilité qu'une personne prise au hasard ait un test positif ?
  [guided]  Pr(+)
    ? Sur quels cas découper (quelle partition) ? ✔ Malade ou sain : deux branches / · Seulement le cas le plus probable
    = 0,8·0,05 + □   (trous : 0,8·0,05 + 0,05·0,95)   ← Une branche par cas
    = 0,04 + □   (trous : 0,04 + 0,0475)   ← Multiplier le long des branches
    = □   (trous : 0,0875)   ← Additionner
  aides : Une branche par cas ; on multiplie le long d'une branche, on additionne les branches. | 0,8×0,05+□ | Pr(+) = 0,0875
  pièges : p_total_missing_branch

Dans une population, 5 % des personnes sont malades. Un test est positif avec probabilité 0,95 chez un malade et 0,05 chez une personne saine. Probabilité qu'une personne prise au hasard ait un test positif ?
  [guided]  Pr(+)
    ? Sur quels cas découper (quelle partition) ? ✔ Malade ou sain : deux branches / · Seulement le cas le plus probable
    = 0,95·0,05 + □   (trous : 0,95·0,05 + 0,05·0,95)   ← Une branche par cas
    = □ + 0,0475   (trous : 0,0475 + 0,0475)   ← Multiplier le long des branches
    = □   (trous : 0,095)   ← Additionner
  aides : Une branche par cas ; on multiplie le long d'une branche, on additionne les branches. | 0,95×0,05+□ | Pr(+) = 0,095
  pièges : p_total_missing_branch

```

### Niveau 3

```
Dans une population, 10 % des personnes sont malades. Un test est positif avec probabilité 0,95 chez un malade et 0,05 chez une personne saine. Probabilité qu'une personne prise au hasard ait un test positif ?
  [tap, suivre l'erreur, menu menu]  Pr(+)
    = Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)   ← Probabilités totales
    = 0,95·0,1 + 0,05·0,9   ← Une branche par cas
    = 0,095 + 0,045   ← Multiplier le long des branches
    = 0,14   ← Additionner
  aides : Une branche par cas ; on multiplie le long d'une branche, on additionne les branches. | 0,95×0,1+□ | Pr(+) = 0,14
  pièges : p_total_missing_branch

Dans une population, 20 % des personnes sont malades. Un test est positif avec probabilité 0,9 chez un malade et 0,2 chez une personne saine. Probabilité qu'une personne prise au hasard ait un test positif ?
  [tap, suivre l'erreur, menu menu]  Pr(+)
    = Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)   ← Probabilités totales
    = 0,9·0,2 + 0,2·0,8   ← Une branche par cas
    = 0,18 + 0,16   ← Multiplier le long des branches
    = 0,34   ← Additionner
  aides : Une branche par cas ; on multiplie le long d'une branche, on additionne les branches. | 0,9×0,2+□ | Pr(+) = 0,34
  pièges : p_total_missing_branch

Dans une population, 30 % des personnes sont malades. Un test est positif avec probabilité 0,95 chez un malade et 0,05 chez une personne saine. Probabilité qu'une personne prise au hasard ait un test positif ?
  [tap, suivre l'erreur, menu menu]  Pr(+)
    = Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)   ← Probabilités totales
    = 0,95·0,3 + 0,05·0,7   ← Une branche par cas
    = 0,285 + 0,035   ← Multiplier le long des branches
    = 0,32   ← Additionner
  aides : Une branche par cas ; on multiplie le long d'une branche, on additionne les branches. | 0,95×0,3+□ | Pr(+) = 0,32
  pièges : p_total_missing_branch

```

### Niveau 4

```
On lance une pièce équilibrée : pile, on tire une boule dans l'urne 1 (1 rouges sur 6) ; face, dans l'urne 2 (1 rouges sur 3). Probabilité de tirer une boule rouge ?
  [free, suivre l'erreur]  Pr(R)
    = 1/2·1/6 + 1/2·1/3   ← Une branche par cas
    = 1/12 + 1/6   ← Multiplier le long des branches
    = 0,25   ← Additionner
  aides : Une branche par cas ; on multiplie le long d'une branche, on additionne les branches. | 1/2×1/6+□ | Pr(R) = 0,25
  pièges : p_total_missing_branch

Pr(A) = 0,7, Pr(B) = 0,5 et Pr(A ∩ B) = 0,45. Que vaut Pr(A | B) ?
  [free, suivre l'erreur]  Pr(A|B)
    = Pr(A ∩ B)/Pr(B)   ← Définition
    = 0,45/0,5   ← Remplacer
    = 0,9   ← Calculer
  aides : On sait que B a lieu : Pr(A | B) = Pr(A ∩ B)/Pr(B). | 0,45/□ | Pr(A | B) = 0,9
  pièges : p_cond_denominator

Trois machines A, B, C produisent 50 %, 30 %, 20 % des pièces ; leurs taux de défaut sont 2 %, 2 %, 6 %. Probabilité qu'une pièce prise au hasard soit défectueuse ?
  [free, suivre l'erreur]  Pr(D)
    = 0,5·0,02 + 0,3·0,02 + 0,2·0,06   ← Une branche par cas
    = 0,01 + 0,006 + 0,012   ← Multiplier le long des branches
    = 0,028   ← Additionner
  aides : Une branche par cas ; on multiplie le long d'une branche, on additionne les branches. | 0,5×0,02+0,3×0,02+□ | Pr(D) = 0,028
  pièges : p_total_missing_branch

```

### Niveau 5

```
On lance deux dés équilibrés. Sachant que la somme vaut 9 (événement B), quelle est la probabilité d'avoir au moins un 6 (événement A) ?
  [free, sans aide]  |B|
    = 4   ← (3, 6) (4, 5) (5, 4) (6, 3)
  — |A∩B|  [juge prob]  départ : |A∩B|
    = 2   ← Avec au moins un 6
  — Pr(A|B)  [juge prob]  départ : Pr(A|B)
    = 2/4   ← Dans l'univers réduit
    = 0,5   ← Simplifier
  pièges : p_cond_denominator

Trois machines A, B, C produisent 50 %, 40 %, 10 % des pièces ; leurs taux de défaut sont 1 %, 3 %, 5 %. Probabilité qu'une pièce prise au hasard soit défectueuse ?
  [free, sans aide]  Pr(D)
    = 0,5·0,01 + 0,4·0,03 + 0,1·0,05   ← Une branche par cas
    = 0,005 + 0,012 + 0,005   ← Multiplier le long des branches
    = 0,022   ← Additionner
  pièges : p_total_missing_branch

On lance deux dés équilibrés. Sachant que la somme vaut 10 (événement B), quelle est la probabilité d'avoir un double (événement A) ?
  [free, sans aide]  |B|
    = 3   ← (4, 6) (5, 5) (6, 4)
  — |A∩B|  [juge prob]  départ : |A∩B|
    = 1   ← Les doubles
  — Pr(A|B)  [juge prob]  départ : Pr(A|B)
    = 1/3   ← Dans l'univers réduit
  pièges : p_cond_denominator

```

### Variantes d'examen

```
Dans une population, 5 % des personnes sont malades. Un test est positif avec probabilité 0,9 chez un malade et 0,05 chez une personne saine. Probabilité qu'une personne prise au hasard ait un test positif ?
  ✔ 0,0925   · 0,0475 [p_total_missing_branch]   · 0,185   · 0,045 [p_total_missing_branch]
  [examen mcq]
  pièges : p_total_missing_branch

Vrai ou faux ?
  « Pour tous événements A et B avec Pr(B) > 0 : Pr(A | B) + Pr(Aᶜ | B) = 1. » → VRAI
  [examen tf]

On lance une pièce équilibrée : pile, on tire une boule dans l'urne 1 (1 rouges sur 3) ; face, dans l'urne 2 (5 rouges sur 8). Probabilité de tirer une boule rouge ?
  [free, sans aide, examen coef]  Pr(R)
    = 1/2·1/3 + 1/2·5/8   ← Une branche par cas
    = 1/6 + 0,3125   ← Multiplier le long des branches
    = 23/48   ← Additionner
  pièges : p_total_missing_branch

```

## Bayes par les fréquences naturelles (`p-bayes-freq`, BA3)

_Retourner un conditionnement avec un tableau de 1 000 personnes (malades ou sains, positifs ou négatifs)._

### Niveau 1

```
10 % des courriels reçus sont des spams. Le filtre signale 99 % des spams, mais aussi 20 % des messages normaux (« ham »). Imagine 1 000 messages. Quelle est la probabilité qu'un message signalé soit un spam ?
  [guided]  spams
    = □·1000   (trous : 0,1·1000)   ← Taux de base
    = □   (trous : 100)   ← et 900 normaux
  — spams signalés  [juge prob]  départ : spams signalés
    = □·100   (trous : 0,99·100)   ← Sensibilité
    = □   (trous : 99)
  — normaux signalés  [juge prob]  départ : normaux signalés
    = 0,2·□   (trous : 0,2·900)   ← Faux positifs
    = □   (trous : 180)
  — signalés  [juge prob]  départ : signalés
    = 99 + □   (trous : 99 + 180)   ← Total de la colonne
    = □   (trous : 279)
  — Pr(S|+)  [juge prob]  départ : Pr(S|+)
    = 99/□   (trous : 99/279)   ← Rapport
    = 11/31≈0,355   ← Soit environ 35,5 %
  aides : Commence par répartir les 1 000 messages selon le taux de base, avant de parler du test. | 99/(99+□) | Pr = 99/279 = 11/31
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

Une maladie touche 5 % de la population. Le test détecte 80 % des malades, et il est positif chez 5 % des personnes saines. Imagine 10 000 personnes. Quelle est la probabilité qu'une personne positive soit malade ?
  [guided]  malades
    = □·10000   (trous : 0,05·10000)   ← Taux de base
    = □   (trous : 500)   ← et 9500 sains
  — malades positifs  [juge prob]  départ : maladespositifs
    = □·500   (trous : 0,8·500)   ← Sensibilité
    = □   (trous : 400)
  — sains positifs  [juge prob]  départ : sainspositifs
    = 0,05·□   (trous : 0,05·9500)   ← Faux positifs
    = □   (trous : 475)
  — positifs  [juge prob]  départ : positifs
    = 400 + □   (trous : 400 + 475)   ← Total de la colonne
    = □   (trous : 875)
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 400/□   (trous : 400/875)   ← Rapport
    = 16/35≈0,457   ← Soit environ 45,7 %
  aides : Commence par répartir les 10 000 personnes selon le taux de base, avant de parler du test. | 400/(400+□) | Pr = 400/875 = 16/35
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

1 % des courriels reçus sont des spams. Le filtre signale 99 % des spams, mais aussi 2 % des messages normaux (« ham »). Imagine 10 000 messages. Quelle est la probabilité qu'un message signalé soit un spam ?
  [guided]  spams
    = □·10000   (trous : 0,01·10000)   ← Taux de base
    = □   (trous : 100)   ← et 9900 normaux
  — spams signalés  [juge prob]  départ : spams signalés
    = □·100   (trous : 0,99·100)   ← Sensibilité
    = □   (trous : 99)
  — normaux signalés  [juge prob]  départ : normaux signalés
    = 0,02·□   (trous : 0,02·9900)   ← Faux positifs
    = □   (trous : 198)
  — signalés  [juge prob]  départ : signalés
    = 99 + □   (trous : 99 + 198)   ← Total de la colonne
    = □   (trous : 297)
  — Pr(S|+)  [juge prob]  départ : Pr(S|+)
    = 99/□   (trous : 99/297)   ← Rapport
    = 1/3≈0,333   ← Soit environ 33,3 %
  aides : Commence par répartir les 10 000 messages selon le taux de base, avant de parler du test. | 99/(99+□) | Pr = 99/297 = 1/3
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

```

### Niveau 2

```
Une maladie touche 5 % de la population. Le test détecte 99 % des malades, et il est positif chez 10 % des personnes saines. Imagine 10 000 personnes. Quelle est la probabilité qu'une personne positive soit malade ?
  [guided]  malades
    = □·10000   (trous : 0,05·10000)   ← Taux de base
    = □   (trous : 500)   ← et 9500 sains
  — malades positifs  [juge prob]  départ : maladespositifs
    = □·500   (trous : 0,99·500)   ← Sensibilité
    = □   (trous : 495)
  — sains positifs  [juge prob]  départ : sainspositifs
    = 0,1·□   (trous : 0,1·9500)   ← Faux positifs
    = □   (trous : 950)
  — positifs  [juge prob]  départ : positifs
    = 495 + □   (trous : 495 + 950)   ← Total de la colonne
    = □   (trous : 1445)
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    ? Quel rapport ? ✔ 495/1445 / · 495/500 / · 495/10000
    = 495/□   (trous : 495/1445)   ← Rapport
    = 99/289≈0,343   ← Soit environ 34,3 %
  aides : Commence par répartir les 10 000 personnes selon le taux de base, avant de parler du test. | 495/(495+□) | Pr = 495/1445 = 99/289
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

Une machine produit 20 % de pièces défectueuses. Le contrôle rejette 99 % des pièces défectueuses et, par erreur, 5 % des bonnes. Imagine 1 000 pièces. Quelle est la probabilité qu'une pièce rejetée soit défectueuse ?
  [guided]  défectueuses
    = □·1000   (trous : 0,2·1000)   ← Taux de base
    = □   (trous : 200)   ← et 800 bonnes
  — défectueuses rejetées  [juge prob]  départ : défectueuses rejetées
    = □·200   (trous : 0,99·200)   ← Sensibilité
    = □   (trous : 198)
  — bonnes rejetées  [juge prob]  départ : bonnes rejetées
    = 0,05·□   (trous : 0,05·800)   ← Faux positifs
    = □   (trous : 40)
  — rejetées  [juge prob]  départ : rejetées
    = 198 + □   (trous : 198 + 40)   ← Total de la colonne
    = □   (trous : 238)
  — Pr(D|+)  [juge prob]  départ : Pr(D|+)
    ? Quel rapport ? ✔ 198/238 / · 198/200 / · 198/1000
    = 198/□   (trous : 198/238)   ← Rapport
    = 99/119≈0,832   ← Soit environ 83,2 %
  aides : Commence par répartir les 1 000 pièces selon le taux de base, avant de parler du test. | 198/(198+□) | Pr = 198/238 = 99/119
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

Une maladie touche 2 % de la population. Le test détecte 95 % des malades, et il est positif chez 5 % des personnes saines. Imagine 1 000 personnes. Quelle est la probabilité qu'une personne positive soit malade ?
  [guided]  malades
    = □·1000   (trous : 0,02·1000)   ← Taux de base
    = □   (trous : 20)   ← et 980 sains
  — malades positifs  [juge prob]  départ : maladespositifs
    = □·20   (trous : 0,95·20)   ← Sensibilité
    = □   (trous : 19)
  — sains positifs  [juge prob]  départ : sainspositifs
    = 0,05·□   (trous : 0,05·980)   ← Faux positifs
    = □   (trous : 49)
  — positifs  [juge prob]  départ : positifs
    = 19 + □   (trous : 19 + 49)   ← Total de la colonne
    = □   (trous : 68)
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    ? Quel rapport ? ✔ 19/68 / · 19/20 / · 19/1000
    = 19/68≈0,279   ← Soit environ 27,9 %
  aides : Commence par répartir les 1 000 personnes selon le taux de base, avant de parler du test. | 19/(19+□) | Pr = 19/68 = 19/68
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

```

### Niveau 3

```
Une machine produit 20 % de pièces défectueuses. Le contrôle rejette 90 % des pièces défectueuses et, par erreur, 20 % des bonnes. Imagine 1 000 pièces. Quelle est la probabilité qu'une pièce rejetée soit défectueuse ?
  [tap, suivre l'erreur, menu menu]  défectueuses
    = 0,2·1000   ← Taux de base
    = 200   ← et 800 bonnes
  — défectueuses rejetées  [juge prob]  départ : défectueuses rejetées
    = 0,9·200   ← Sensibilité
    = 180
  — bonnes rejetées  [juge prob]  départ : bonnes rejetées
    = 0,2·800   ← Faux positifs
    = 160
  — rejetées  [juge prob]  départ : rejetées
    = 180 + 160   ← Total de la colonne
    = 340
  — Pr(D|+)  [juge prob]  départ : Pr(D|+)
    = 180/340   ← Rapport
    = 9/17≈0,529   ← Soit environ 52,9 %
  aides : Commence par répartir les 1 000 pièces selon le taux de base, avant de parler du test. | 180/(180+□) | Pr = 180/340 = 9/17
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

Une machine produit 2 % de pièces défectueuses. Le contrôle rejette 80 % des pièces défectueuses et, par erreur, 20 % des bonnes. Imagine 1 000 pièces. Quelle est la probabilité qu'une pièce rejetée soit défectueuse ?
  [tap, suivre l'erreur, menu menu]  défectueuses
    = 0,02·1000   ← Taux de base
    = 20   ← et 980 bonnes
  — défectueuses rejetées  [juge prob]  départ : défectueuses rejetées
    = 0,8·20   ← Sensibilité
    = 16
  — bonnes rejetées  [juge prob]  départ : bonnes rejetées
    = 0,2·980   ← Faux positifs
    = 196
  — rejetées  [juge prob]  départ : rejetées
    = 16 + 196   ← Total de la colonne
    = 212
  — Pr(D|+)  [juge prob]  départ : Pr(D|+)
    = 16/212   ← Rapport
    = 4/53≈0,075   ← Soit environ 7,5 %
  aides : Commence par répartir les 1 000 pièces selon le taux de base, avant de parler du test. | 16/(16+□) | Pr = 16/212 = 4/53
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

1 % des courriels reçus sont des spams. Le filtre signale 99 % des spams, mais aussi 2 % des messages normaux (« ham »). Imagine 10 000 messages. Quelle est la probabilité qu'un message signalé soit un spam ?
  [tap, suivre l'erreur, menu menu]  spams
    = 0,01·10000   ← Taux de base
    = 100   ← et 9900 normaux
  — spams signalés  [juge prob]  départ : spams signalés
    = 0,99·100   ← Sensibilité
    = 99
  — normaux signalés  [juge prob]  départ : normaux signalés
    = 0,02·9900   ← Faux positifs
    = 198
  — signalés  [juge prob]  départ : signalés
    = 99 + 198   ← Total de la colonne
    = 297
  — Pr(S|+)  [juge prob]  départ : Pr(S|+)
    = 99/297   ← Rapport
    = 1/3≈0,333   ← Soit environ 33,3 %
  aides : Commence par répartir les 10 000 messages selon le taux de base, avant de parler du test. | 99/(99+□) | Pr = 99/297 = 1/3
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

```

### Niveau 4

```
Une machine produit 2 % de pièces défectueuses. Le contrôle rejette 95 % des pièces défectueuses et, par erreur, 20 % des bonnes. Imagine 1 000 pièces. Quelle est la probabilité qu'une pièce rejetée soit défectueuse ?
  [free, suivre l'erreur]  défectueuses
    = 0,02·1000   ← Taux de base
    = 20   ← et 980 bonnes
  — défectueuses rejetées  [juge prob]  départ : défectueuses rejetées
    = 0,95·20   ← Sensibilité
    = 19
  — bonnes rejetées  [juge prob]  départ : bonnes rejetées
    = 0,2·980   ← Faux positifs
    = 196
  — rejetées  [juge prob]  départ : rejetées
    = 19 + 196   ← Total de la colonne
    = 215
  — Pr(D|+)  [juge prob]  départ : Pr(D|+)
    = 19/215≈0,088   ← Soit environ 8,8 %
  aides : Commence par répartir les 1 000 pièces selon le taux de base, avant de parler du test. | 19/(19+□) | Pr = 19/215 = 19/215
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

Une maladie touche 5 % de la population. Le test détecte 95 % des malades, et il est positif chez 10 % des personnes saines. Imagine 10 000 personnes. Quelle est la probabilité qu'une personne positive soit malade ?
  [free, suivre l'erreur]  malades
    = 0,05·10000   ← Taux de base
    = 500   ← et 9500 sains
  — malades positifs  [juge prob]  départ : maladespositifs
    = 0,95·500   ← Sensibilité
    = 475
  — sains positifs  [juge prob]  départ : sainspositifs
    = 0,1·9500   ← Faux positifs
    = 950
  — positifs  [juge prob]  départ : positifs
    = 475 + 950   ← Total de la colonne
    = 1425
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 475/1425   ← Rapport
    = 1/3≈0,333   ← Soit environ 33,3 %
  aides : Commence par répartir les 10 000 personnes selon le taux de base, avant de parler du test. | 475/(475+□) | Pr = 475/1425 = 1/3
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

Une maladie touche 5 % de la population. Le test détecte 95 % des malades, et il est positif chez 20 % des personnes saines. Imagine 10 000 personnes. Quelle est la probabilité qu'une personne positive soit malade ?
  [free, suivre l'erreur]  malades
    = 0,05·10000   ← Taux de base
    = 500   ← et 9500 sains
  — malades positifs  [juge prob]  départ : maladespositifs
    = 0,95·500   ← Sensibilité
    = 475
  — sains positifs  [juge prob]  départ : sainspositifs
    = 0,2·9500   ← Faux positifs
    = 1900
  — positifs  [juge prob]  départ : positifs
    = 475 + 1900   ← Total de la colonne
    = 2375
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 475/2375   ← Rapport
    = 0,2   ← Soit 20 %
  aides : Commence par répartir les 10 000 personnes selon le taux de base, avant de parler du test. | 475/(475+□) | Pr = 475/2375 = 0,2
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

```

### Niveau 5

```
1 % des courriels reçus sont des spams. Le filtre signale 95 % des spams, mais aussi 10 % des messages normaux (« ham »). Imagine 10 000 messages. Quelle est la probabilité qu'un message signalé soit un spam ?
  [free, sans aide]  spams
    = 0,01·10000   ← Taux de base
    = 100   ← et 9900 normaux
  — spams signalés  [juge prob]  départ : spams signalés
    = 0,95·100   ← Sensibilité
    = 95
  — normaux signalés  [juge prob]  départ : normaux signalés
    = 0,1·9900   ← Faux positifs
    = 990
  — signalés  [juge prob]  départ : signalés
    = 95 + 990   ← Total de la colonne
    = 1085
  — Pr(S|+)  [juge prob]  départ : Pr(S|+)
    = 95/1085   ← Rapport
    = 19/217≈0,088   ← Soit environ 8,8 %
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

Une maladie touche 2 % de la population. Le test détecte 99 % des malades, et il est positif chez 2 % des personnes saines. Imagine 10 000 personnes. Quelle est la probabilité qu'une personne positive soit malade ?
  [free, sans aide]  malades
    = 0,02·10000   ← Taux de base
    = 200   ← et 9800 sains
  — malades positifs  [juge prob]  départ : maladespositifs
    = 0,99·200   ← Sensibilité
    = 198
  — sains positifs  [juge prob]  départ : sainspositifs
    = 0,02·9800   ← Faux positifs
    = 196
  — positifs  [juge prob]  départ : positifs
    = 198 + 196   ← Total de la colonne
    = 394
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 198/394   ← Rapport
    = 99/197≈0,503   ← Soit environ 50,3 %
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

Une maladie touche 5 % de la population. Le test détecte 90 % des malades, et il est positif chez 5 % des personnes saines. Imagine 10 000 personnes. Quelle est la probabilité qu'une personne positive soit malade ?
  [free, sans aide]  malades
    = 0,05·10000   ← Taux de base
    = 500   ← et 9500 sains
  — malades positifs  [juge prob]  départ : maladespositifs
    = 0,9·500   ← Sensibilité
    = 450
  — sains positifs  [juge prob]  départ : sainspositifs
    = 0,05·9500   ← Faux positifs
    = 475
  — positifs  [juge prob]  départ : positifs
    = 450 + 475   ← Total de la colonne
    = 925
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 450/925   ← Rapport
    = 18/37≈0,486   ← Soit environ 48,6 %
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

```

### Variantes d'examen

```
Une machine produit 10 % de pièces défectueuses. Le contrôle rejette 95 % des pièces défectueuses et, par erreur, 20 % des bonnes. Quelle est la probabilité qu'une pièce rejetée soit défectueuse ?
  · 19/20 [p_cond_inverse]   ✔ 19/55   · 19/23 [p_base_rate]   · 19/200 [p_bayes_joint]
  [examen mcq]
  pièges : p_cond_inverse, p_base_rate, p_bayes_joint

Vrai ou faux ?
  « Un test qui détecte 99 % des malades donne toujours au moins 99 % de malades parmi les personnes positives. » → FAUX
    contre-exemple (refute) : p = 0,01, f = 0,05
  [examen tf]
  pièges : p_cond_inverse

Une maladie touche 10 % de la population. Le test détecte 90 % des malades, et il est positif chez 5 % des personnes saines. Quelle est la probabilité qu'une personne positive soit malade ? (fraction irréductible)
  [free, sans aide, examen coef]  Pr(M|+)
    = 90/135   ← Rapport
    = 2/3≈0,667   ← Soit environ 66,7 %
  pièges : p_cond_inverse, p_bayes_joint, p_base_rate

```

## Formule de Bayes, deux tests (`p-bayes-formula`, BA3)

_La formule de Bayes, avec les probabilités totales au dénominateur, pour un test puis pour deux tests._

### Niveau 1

```
20 % d'une population est malade. Un test est positif avec probabilité 0,7 chez un malade et 0,1 chez une personne saine. Calcule Pr(+), puis Pr(M | +).
  [guided]  Pr(+)
    = 0,7·0,2 + 0,1·□   (trous : 0,7·0,2 + 0,1·0,8)   ← Remplacer
    = □   (trous : 0,22)   ← Calculer
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 0,14/□   (trous : 0,14/0,22)   ← Pr(+ | M)·Pr(M)/Pr(+)
    = □   (trous : 7/11)   ← Soit 63,6 %
  aides : Numérateur : la branche « malade et positif ». Dénominateur : toutes les branches « positif ». | 0,14/(0,14+□) | Pr(M | +) = 7/11
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse

20 % d'une population est malade. Un test est positif avec probabilité 0,8 chez un malade et 0,2 chez une personne saine. Calcule Pr(+), puis Pr(M | +).
  [guided]  Pr(+)
    = □·0,2 + 0,2·0,8   (trous : 0,8·0,2 + 0,2·0,8)   ← Remplacer
    = □   (trous : 0,32)   ← Calculer
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 0,16/□   (trous : 0,16/0,32)   ← Pr(+ | M)·Pr(M)/Pr(+)
    = □   (trous : 0,5)   ← Soit 50 %
  aides : Numérateur : la branche « malade et positif ». Dénominateur : toutes les branches « positif ». | 0,16/(0,16+□) | Pr(M | +) = 0,5
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse

1 % d'une population est malade. Un test est positif avec probabilité 0,9 chez un malade et 0,3 chez une personne saine. Calcule Pr(+), puis Pr(M | +).
  [guided]  Pr(+)
    = 0,9·0,01 + 0,3·□   (trous : 0,9·0,01 + 0,3·0,99)   ← Remplacer
    = □   (trous : 0,306)   ← Calculer
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 0,009/□   (trous : 0,009/0,306)   ← Pr(+ | M)·Pr(M)/Pr(+)
    = □   (trous : 1/34)   ← Soit 2,9 %
  aides : Numérateur : la branche « malade et positif ». Dénominateur : toutes les branches « positif ». | 0,009/(0,009+□) | Pr(M | +) = 1/34
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse

```

### Niveau 2

```
20 % d'une population est malade. Un test est positif avec probabilité 0,9 chez un malade et 0,1 chez une personne saine. Calcule Pr(+), puis Pr(M | +).
  [guided]  Pr(+)
    = 0,9·0,2 + 0,1·□   (trous : 0,9·0,2 + 0,1·0,8)   ← Remplacer
    = □   (trous : 0,26)   ← Calculer
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 0,18/□   (trous : 0,18/0,26)   ← Pr(+ | M)·Pr(M)/Pr(+)
    = □   (trous : 9/13)   ← Soit 69,2 %
  aides : Numérateur : la branche « malade et positif ». Dénominateur : toutes les branches « positif ». | 0,18/(0,18+□) | Pr(M | +) = 9/13
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse

2 % d'une population est malade. Un test est positif avec probabilité 0,7 chez un malade et 0,1 chez une personne saine. Calcule Pr(+), puis Pr(M | +).
  [guided]  Pr(+)
    = 0,7·0,02 + 0,1·□   (trous : 0,7·0,02 + 0,1·0,98)   ← Remplacer
    = □   (trous : 0,112)   ← Calculer
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 0,014/□   (trous : 0,014/0,112)   ← Pr(+ | M)·Pr(M)/Pr(+)
    = □   (trous : 0,125)   ← Soit 12,5 %
  aides : Numérateur : la branche « malade et positif ». Dénominateur : toutes les branches « positif ». | 0,014/(0,014+□) | Pr(M | +) = 0,125
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse

25 % d'une population est malade. Un test est positif avec probabilité 0,8 chez un malade et 0,1 chez une personne saine. Calcule Pr(+), puis Pr(M | +).
  [guided]  Pr(+)
    = 0,8·0,25 + 0,1·□   (trous : 0,8·0,25 + 0,1·0,75)   ← Remplacer
    = □   (trous : 0,275)   ← Calculer
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 0,2/□   (trous : 0,2/0,275)   ← Pr(+ | M)·Pr(M)/Pr(+)
    = □   (trous : 8/11)   ← Soit 72,7 %
  aides : Numérateur : la branche « malade et positif ». Dénominateur : toutes les branches « positif ». | 0,2/(0,2+□) | Pr(M | +) = 8/11
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse

```

### Niveau 3

```
5 % d'une population est malade. Un test est positif avec probabilité 0,7 chez un malade et 0,2 chez une personne saine. Calcule Pr(+), puis Pr(M | +).
  [tap, suivre l'erreur, menu menu]  Pr(+)
    = Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)   ← Probabilités totales
    = 0,7·0,05 + 0,2·0,95   ← Remplacer
    = 0,225   ← Calculer
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 0,035/0,225   ← Pr(+ | M)·Pr(M)/Pr(+)
    = 7/45   ← Soit 15,6 %
  aides : Numérateur : la branche « malade et positif ». Dénominateur : toutes les branches « positif ». | 0,035/(0,035+□) | Pr(M | +) = 7/45
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse

5 % d'une population est malade. Un test est positif avec probabilité 0,7 chez un malade et 0,1 chez une personne saine. Calcule Pr(+), puis Pr(M | +), puis, pour deux tests positifs indépendants sachant l'état, Pr(M | +, +).
  [tap, suivre l'erreur, menu menu]  Pr(+)
    = Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)   ← Probabilités totales
    = 0,7·0,05 + 0,1·0,95   ← Remplacer
    = 0,13   ← Calculer
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 0,035/0,13   ← Pr(+ | M)·Pr(M)/Pr(+)
    = 7/26   ← Soit 26,9 %
  — Pr(M|+,+)  [juge prob]  départ : Pr(M|+,+)
    = 0,7²·0,05/(0,7²·0,05 + 0,1²·0,95)   ← Les vraisemblances au carré
    = 0,0245/0,034   ← Calculer
    = 49/68   ← Soit 72,1 %
  aides : Numérateur : la branche « malade et positif ». Dénominateur : toutes les branches « positif ». | 0,035/(0,035+□) | Pr(M | +) = 7/26
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse, p_two_tests_square, p_two_tests_uncond

25 % d'une population est malade. Un test est positif avec probabilité 0,7 chez un malade et 0,3 chez une personne saine. Calcule Pr(+), puis Pr(M | +).
  [tap, suivre l'erreur, menu menu]  Pr(+)
    = Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)   ← Probabilités totales
    = 0,7·0,25 + 0,3·0,75   ← Remplacer
    = 0,4   ← Calculer
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 0,175/0,4   ← Pr(+ | M)·Pr(M)/Pr(+)
    = 0,4375   ← Soit 43,8 %
  aides : Numérateur : la branche « malade et positif ». Dénominateur : toutes les branches « positif ». | 0,175/(0,175+□) | Pr(M | +) = 0,4375
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse

```

### Niveau 4

```
10 % d'une population est malade. Un test est positif avec probabilité 0,7 chez un malade et 0,1 chez une personne saine. Calcule Pr(+), puis Pr(M | +).
  [free, suivre l'erreur]  Pr(+)
    = Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)   ← Probabilités totales
    = 0,7·0,1 + 0,1·0,9   ← Remplacer
    = 0,16   ← Calculer
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 0,07/0,16   ← Pr(+ | M)·Pr(M)/Pr(+)
    = 0,4375   ← Soit 43,8 %
  aides : Numérateur : la branche « malade et positif ». Dénominateur : toutes les branches « positif ». | 0,07/(0,07+□) | Pr(M | +) = 0,4375
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse

25 % d'une population est malade. Un test est positif avec probabilité 0,9 chez un malade et 0,2 chez une personne saine. Calcule Pr(+), puis Pr(M | +), puis, pour deux tests positifs indépendants sachant l'état, Pr(M | +, +).
  [free, suivre l'erreur]  Pr(+)
    = Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)   ← Probabilités totales
    = 0,9·0,25 + 0,2·0,75   ← Remplacer
    = 0,375   ← Calculer
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 0,225/0,375   ← Pr(+ | M)·Pr(M)/Pr(+)
    = 0,6   ← Soit 60 %
  — Pr(M|+,+)  [juge prob]  départ : Pr(M|+,+)
    = 0,9²·0,25/(0,9²·0,25 + 0,2²·0,75)   ← Les vraisemblances au carré
    = 0,2025/0,2325   ← Calculer
    = 27/31   ← Soit 87,1 %
  aides : Numérateur : la branche « malade et positif ». Dénominateur : toutes les branches « positif ». | 0,225/(0,225+□) | Pr(M | +) = 0,6
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse, p_two_tests_square, p_two_tests_uncond

20 % d'une population est malade. Un test est positif avec probabilité 0,9 chez un malade et 0,2 chez une personne saine. Calcule Pr(+), puis Pr(M | +), puis, pour deux tests positifs indépendants sachant l'état, Pr(M | +, +).
  [free, suivre l'erreur]  Pr(+)
    = Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)   ← Probabilités totales
    = 0,9·0,2 + 0,2·0,8   ← Remplacer
    = 0,34   ← Calculer
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 0,18/0,34   ← Pr(+ | M)·Pr(M)/Pr(+)
    = 9/17   ← Soit 52,9 %
  — Pr(M|+,+)  [juge prob]  départ : Pr(M|+,+)
    = 0,9²·0,2/(0,9²·0,2 + 0,2²·0,8)   ← Les vraisemblances au carré
    = 0,162/0,194   ← Calculer
    = 81/97   ← Soit 83,5 %
  aides : Numérateur : la branche « malade et positif ». Dénominateur : toutes les branches « positif ». | 0,18/(0,18+□) | Pr(M | +) = 9/17
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse, p_two_tests_square, p_two_tests_uncond

```

### Niveau 5

```
25 % d'une population est malade. Un test est positif avec probabilité 0,8 chez un malade et 0,3 chez une personne saine. Calcule Pr(+), puis Pr(M | +), puis, pour deux tests positifs indépendants sachant l'état, Pr(M | +, +).
  [free, sans aide]  Pr(+)
    = Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)   ← Probabilités totales
    = 0,8·0,25 + 0,3·0,75   ← Remplacer
    = 0,425   ← Calculer
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 0,2/0,425   ← Pr(+ | M)·Pr(M)/Pr(+)
    = 8/17   ← Soit 47,1 %
  — Pr(M|+,+)  [juge prob]  départ : Pr(M|+,+)
    = 0,8²·0,25/(0,8²·0,25 + 0,3²·0,75)   ← Les vraisemblances au carré
    = 0,16/0,2275   ← Calculer
    = 64/91   ← Soit 70,3 %
  — vérif  [juge prob]  départ : vérif
    = 0,8·(8/17)/(0,8·8/17 + 0,3·(1 − 8/17))   ← Mise à jour successive
    = 64/91   ← Même résultat
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse, p_two_tests_square, p_two_tests_uncond

5 % d'une population est malade. Un test est positif avec probabilité 0,9 chez un malade et 0,3 chez une personne saine. Calcule Pr(+), puis Pr(M | +), puis, pour deux tests positifs indépendants sachant l'état, Pr(M | +, +).
  [free, sans aide]  Pr(+)
    = Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)   ← Probabilités totales
    = 0,9·0,05 + 0,3·0,95   ← Remplacer
    = 0,33   ← Calculer
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 0,045/0,33   ← Pr(+ | M)·Pr(M)/Pr(+)
    = 3/22   ← Soit 13,6 %
  — Pr(M|+,+)  [juge prob]  départ : Pr(M|+,+)
    = 0,9²·0,05/(0,9²·0,05 + 0,3²·0,95)   ← Les vraisemblances au carré
    = 0,0405/0,126   ← Calculer
    = 9/28   ← Soit 32,1 %
  — vérif  [juge prob]  départ : vérif
    = 0,9·(3/22)/(0,9·3/22 + 0,3·(1 − 3/22))   ← Mise à jour successive
    = 9/28   ← Même résultat
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse, p_two_tests_square, p_two_tests_uncond

30 % d'une population est malade. Un test est positif avec probabilité 0,8 chez un malade et 0,3 chez une personne saine. Calcule Pr(+), puis Pr(M | +), puis, pour deux tests positifs indépendants sachant l'état, Pr(M | +, +).
  [free, sans aide]  Pr(+)
    = Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)   ← Probabilités totales
    = 0,8·0,3 + 0,3·0,7   ← Remplacer
    = 0,45   ← Calculer
  — Pr(M|+)  [juge prob]  départ : Pr(M|+)
    = 0,24/0,45   ← Pr(+ | M)·Pr(M)/Pr(+)
    = 8/15   ← Soit 53,3 %
  — Pr(M|+,+)  [juge prob]  départ : Pr(M|+,+)
    = 0,8²·0,3/(0,8²·0,3 + 0,3²·0,7)   ← Les vraisemblances au carré
    = 0,192/0,255   ← Calculer
    = 64/85   ← Soit 75,3 %
  — vérif  [juge prob]  départ : vérif
    = 0,8·(8/15)/(0,8·8/15 + 0,3·(1 − 8/15))   ← Mise à jour successive
    = 64/85   ← Même résultat
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse, p_two_tests_square, p_two_tests_uncond

```

### Variantes d'examen

```
5 % d'une population est malade. Un test est positif avec probabilité 0,9 chez un malade et 0,3 chez une personne saine. Une personne a deux tests positifs (indépendants sachant l'état). Pr(M | +, +) ?
  · 9/10 [p_cond_inverse]   ✔ 9/28   · 45/121 [p_two_tests_uncond]   · 9/484 [p_two_tests_square]
  [examen mcq]
  pièges : p_two_tests_square, p_two_tests_uncond, p_cond_inverse

Vrai ou faux ?
  « 25 % d'une population est malade. Un test est positif avec probabilité 0,9 chez un malade et 0,1 chez une personne saine. Avec deux tests indépendants sachant l'état, Pr(M | +, +) = Pr(M | +)². » → FAUX
    contre-exemple (refute) : a = 0,75, b = 27/28
  [examen tf]
  pièges : p_two_tests_square

25 % d'une population est malade. Un test est positif avec probabilité 0,8 chez un malade et 0,3 chez une personne saine. Probabilité qu'une personne positive soit malade (fraction irréductible) ?
  [free, sans aide, examen coef]  Pr(M|+)
    = 0,2/0,425   ← Pr(+ | M)·Pr(M)/Pr(+)
    = 8/17   ← Soit 47,1 %
  pièges : p_cond_inverse, p_base_rate

20 % d'une population est malade. Un test est positif avec probabilité 0,7 chez un malade et 0,2 chez une personne saine. Calcule Pr(+), puis Pr(M | +), puis, pour deux tests positifs indépendants sachant l'état, Pr(M | +, +).
  [problème, examen open, 10 points]
  partie 1 (Un test, puis deux : 2,5 ; Pr(M|+) : 2 ; Pr(M|+,+) : 2,5 ; vérif : 2)
  20 % d'une population est malade. Un test est positif avec probabilité 0,7 chez un malade et 0,2 chez une personne saine. Calcule Pr(+), puis Pr(M | +), puis, pour deux tests positifs indépendants sachant l'état, Pr(M | +, +).
    [free, sans aide, suivre l'erreur, examen open]  Pr(+)
      = Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)   ← Probabilités totales
      = 0,7·0,2 + 0,2·0,8   ← Remplacer
      = 0,3   ← Calculer
    — Pr(M|+)  [juge prob]  départ : Pr(M|+)
      = 0,14/0,3   ← Pr(+ | M)·Pr(M)/Pr(+)
      = 7/15   ← Soit 46,7 %
    — Pr(M|+,+)  [juge prob]  départ : Pr(M|+,+)
      = 0,7²·0,2/(0,7²·0,2 + 0,2²·0,8)   ← Les vraisemblances au carré
      = 0,098/0,13   ← Calculer
      = 49/65   ← Soit 75,4 %
    — vérif  [juge prob]  départ : vérif
      = 0,7·(7/15)/(0,7·7/15 + 0,2·(1 − 7/15))   ← Mise à jour successive
      = 49/65   ← Même résultat
  partie 2 (Interpréter : 1)
  Interpréter : quelle phrase est juste ?
    · La prévalence ne compte pas : seul le test compte. [p_base_rate]   · Après deux tests positifs, elle vaut (7/15)², elle diminue. [p_two_tests_square]   · 70 % des positifs sont malades, quel que soit le nombre de tests. [p_cond_inverse]   ✔ Après deux tests positifs, la probabilité d'être malade monte de 46,7 % à 75,4 %.
    [examen open]
  pièges : p_total_missing_branch, p_base_rate, p_cond_inverse, p_two_tests_square, p_two_tests_uncond

```

## Indépendance, incompatibilité, systèmes redondants (`p-indep`, BA3)

_Indépendance (Pr(A ∩ B) = Pr(A)·Pr(B)), incompatibilité, et fiabilité de systèmes en série et en parallèle._

### Niveau 1

```
3 composants indépendants, de fiabilité 0,8 chacun, sont montés en parallèle (le système marche si au moins un marche). Probabilité que le système marche ?
  [guided]  Pr(marche)
    = 1 − (1 − 0,8)^□   (trous : 1 − (1 − 0,8)³)   ← Contraire de « tous en panne »
    = 1 − □   (trous : 1 − 0,008)   ← Puissance
    = □   (trous : 0,992)   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 1-(1-0,8)^□ | Pr(marche) = 0,992
  pièges : p_series_parallel, p_atleast_one_np

2 composants indépendants, de fiabilité 0,8 chacun, sont montés en parallèle (le système marche si au moins un marche). Probabilité que le système marche ?
  [guided]  Pr(marche)
    = 1 − (1 − 0,8)^□   (trous : 1 − (1 − 0,8)²)   ← Contraire de « tous en panne »
    = 1 − □   (trous : 1 − 0,04)   ← Puissance
    = □   (trous : 0,96)   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 1-(1-0,8)^□ | Pr(marche) = 0,96
  pièges : p_series_parallel, p_atleast_one_np

2 composants indépendants, de fiabilité 0,9 chacun, sont montés en série (le système marche si tous marchent). Probabilité que le système marche ?
  [guided]  Pr(marche)
    = 0,9^□   (trous : 0,9²)   ← Tous doivent marcher
    = □   (trous : 0,81)   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 0,9^□ | Pr(marche) = 0,81
  pièges : p_series_parallel, p_atleast_one_np

```

### Niveau 2

```
On lance deux dés équilibrés. A = « le 1er dé est pair », B = « le 2e dé est impair », C = « la somme est paire ». Pr(A) = Pr(B) = Pr(C) = 1/2.
  [guided]  Pr(A ∩ B)
    = □/36   (trous : 9/36)   ← 3 · 3 couples
    = □   (trous : 1/4)   ← = Pr(A)·Pr(B) : A et B indépendants
  — Pr(A∩B∩C)  [juge prob]  départ : Pr(A ∩ B ∩ C)
    ? A, B et C sont indépendants deux à deux (même calcul pour chaque paire). Sont-ils mutuellement indépendants ? ✔ Il faut encore vérifier Pr(A ∩ B ∩ C) = 1/8 / · Oui : les trois paires sont indépendantes
    = 0   ← Sur A ∩ B, la somme n'est jamais paire : 0 ≠ 1/8, pas mutuellement indépendants
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 9/□ | Pr(A∩B∩C) = 0
  pièges : p_pairwise_mutual

Pr(A) = 0,2, Pr(B) = 0,2 et Pr(A ∩ B) = 0,04. A et B sont-ils indépendants ?
  [guided]  Pr(A)·Pr(B)
    ? Que faut-il comparer ? ✔ Pr(A ∩ B) et Pr(A)·Pr(B) / · Pr(A ∩ B) et 0 : indépendants veut dire incompatibles
    = □·0,2   (trous : 0,2·0,2)   ← Produit
    = 0,04   ← = Pr(A ∩ B) : indépendants
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 0,2×0,□ | Pr(A)·Pr(B) = 0,04
  pièges : p_indep_disjoint

On lance deux dés équilibrés. A = « le 1er dé est pair », B = « le 2e dé est pair », C = « la somme est impaire ». Pr(A) = Pr(B) = Pr(C) = 1/2.
  [guided]  Pr(A ∩ B)
    = □/36   (trous : 9/36)   ← 3 · 3 couples
    = □   (trous : 1/4)   ← = Pr(A)·Pr(B) : A et B indépendants
  — Pr(A∩B∩C)  [juge prob]  départ : Pr(A ∩ B ∩ C)
    ? A, B et C sont indépendants deux à deux (même calcul pour chaque paire). Sont-ils mutuellement indépendants ? ✔ Il faut encore vérifier Pr(A ∩ B ∩ C) = 1/8 / · Oui : les trois paires sont indépendantes
    = 0   ← Sur A ∩ B, la somme n'est jamais impaire : 0 ≠ 1/8, pas mutuellement indépendants
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 9/□ | Pr(A∩B∩C) = 0
  pièges : p_pairwise_mutual

```

### Niveau 3

```
2 composants indépendants, de fiabilité 0,8 chacun, sont montés en parallèle (le système marche si au moins un marche). Probabilité que le système marche ?
  [tap, suivre l'erreur, menu menu]  Pr(marche)
    = 1 − (1 − 0,8)²   ← Contraire de « tous en panne »
    = 1 − 0,04   ← Puissance
    = 0,96   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 1-(1-0,8)^□ | Pr(marche) = 0,96
  pièges : p_series_parallel, p_atleast_one_np

2 composants indépendants, de fiabilité 0,95 chacun, sont montés en parallèle (le système marche si au moins un marche). Probabilité que le système marche ?
  [tap, suivre l'erreur, menu menu]  Pr(marche)
    = 1 − (1 − 0,95)²   ← Contraire de « tous en panne »
    = 1 − 0,0025   ← Puissance
    = 0,9975   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 1-(1-0,95)^□ | Pr(marche) = 0,9975
  pièges : p_series_parallel, p_atleast_one_np

Pr(A) = 0,3, Pr(B) = 0,3 et Pr(A ∩ B) = 0,04. A et B sont-ils indépendants ?
  [tap, suivre l'erreur, menu menu]  Pr(A)·Pr(B)
    ? Que faut-il comparer ? ✔ Pr(A ∩ B) et Pr(A)·Pr(B) / · Pr(A ∩ B) et 0 : indépendants veut dire incompatibles
    = 0,3·0,3   ← Produit
    = 0,09   ← ≠ 0,04 = Pr(A ∩ B) : pas indépendants
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 0,3×0,□ | Pr(A)·Pr(B) = 0,09
  pièges : p_indep_disjoint

```

### Niveau 4

```
2 composants indépendants, de fiabilité 0,8 chacun, sont montés en série (le système marche si tous marchent). Probabilité que le système marche ?
  [free, suivre l'erreur]  Pr(marche)
    = 0,8²   ← Tous doivent marcher
    = 0,64   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 0,8^□ | Pr(marche) = 0,64
  pièges : p_series_parallel, p_atleast_one_np

4 composants indépendants, de fiabilité 0,8 chacun, sont montés en série (le système marche si tous marchent). Probabilité que le système marche ?
  [free, suivre l'erreur]  Pr(marche)
    = 0,8⁴   ← Tous doivent marcher
    = 0,4096   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 0,8^□ | Pr(marche) = 0,4096
  pièges : p_series_parallel, p_atleast_one_np

2 composants indépendants, de fiabilité 0,9 chacun, sont montés en série (le système marche si tous marchent). Probabilité que le système marche ?
  [free, suivre l'erreur]  Pr(marche)
    = 0,9²   ← Tous doivent marcher
    = 0,81   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 0,9^□ | Pr(marche) = 0,81
  pièges : p_series_parallel, p_atleast_one_np

```

### Niveau 5

```
On lance deux dés équilibrés. A = « le 1er dé est impair », B = « le 2e dé est impair », C = « la somme est paire ». Pr(A) = Pr(B) = Pr(C) = 1/2. Puis : des composants de fiabilité 0,8 sont montés en parallèle ; combien en faut-il au moins pour que le système marche avec probabilité au moins 0,999 ?
  [free, sans aide]  Pr(A ∩ B)
    = 9/36   ← 3 · 3 couples
    = 1/4   ← = Pr(A)·Pr(B) : A et B indépendants
  — Pr(A∩B∩C)  [juge prob]  départ : Pr(A ∩ B ∩ C)
    ? A, B et C sont indépendants deux à deux (même calcul pour chaque paire). Sont-ils mutuellement indépendants ? ✔ Il faut encore vérifier Pr(A ∩ B ∩ C) = 1/8 / · Oui : les trois paires sont indépendantes
    = 1/4   ← Sur A ∩ B, la somme est toujours paire : 1/4 ≠ 1/8, pas mutuellement indépendants
  — n  [juge prob]  départ : n
    = 5   ← 1 − 0,2^5 ≥ 0,999, et pas avec 4
  pièges : p_pairwise_mutual, p_atleast_one_np, p_series_parallel

On lance deux dés équilibrés. A = « le 1er dé est impair », B = « le 2e dé est impair », C = « la somme est paire ». Pr(A) = Pr(B) = Pr(C) = 1/2. Puis : des composants de fiabilité 0,9 sont montés en parallèle ; combien en faut-il au moins pour que le système marche avec probabilité au moins 0,999 ?
  [free, sans aide]  Pr(A ∩ B)
    = 9/36   ← 3 · 3 couples
    = 1/4   ← = Pr(A)·Pr(B) : A et B indépendants
  — Pr(A∩B∩C)  [juge prob]  départ : Pr(A ∩ B ∩ C)
    ? A, B et C sont indépendants deux à deux (même calcul pour chaque paire). Sont-ils mutuellement indépendants ? ✔ Il faut encore vérifier Pr(A ∩ B ∩ C) = 1/8 / · Oui : les trois paires sont indépendantes
    = 1/4   ← Sur A ∩ B, la somme est toujours paire : 1/4 ≠ 1/8, pas mutuellement indépendants
  — n  [juge prob]  départ : n
    = 3   ← 1 − 0,1^3 ≥ 0,999, et pas avec 2
  pièges : p_pairwise_mutual, p_atleast_one_np, p_series_parallel

On lance deux dés équilibrés. A = « le 1er dé est impair », B = « le 2e dé est pair », C = « la somme est paire ». Pr(A) = Pr(B) = Pr(C) = 1/2. Puis : des composants de fiabilité 0,9 sont montés en parallèle ; combien en faut-il au moins pour que le système marche avec probabilité au moins 0,999 ?
  [free, sans aide]  Pr(A ∩ B)
    = 9/36   ← 3 · 3 couples
    = 1/4   ← = Pr(A)·Pr(B) : A et B indépendants
  — Pr(A∩B∩C)  [juge prob]  départ : Pr(A ∩ B ∩ C)
    ? A, B et C sont indépendants deux à deux (même calcul pour chaque paire). Sont-ils mutuellement indépendants ? ✔ Il faut encore vérifier Pr(A ∩ B ∩ C) = 1/8 / · Oui : les trois paires sont indépendantes
    = 0   ← Sur A ∩ B, la somme n'est jamais paire : 0 ≠ 1/8, pas mutuellement indépendants
  — n  [juge prob]  départ : n
    = 3   ← 1 − 0,1^3 ≥ 0,999, et pas avec 2
  pièges : p_pairwise_mutual, p_atleast_one_np, p_series_parallel

```

### Variantes d'examen

```
3 composants indépendants, de fiabilité 0,99 chacun, sont montés en série (le système marche si tous marchent). Probabilité que le système marche ?
  · 0,999999 [p_series_parallel]   · 0,94148   ✔ 0,970299   · 0,0148505
  [examen mcq]
  pièges : p_series_parallel

Vrai ou faux ?
  « Deux événements incompatibles de probabilités non nulles sont indépendants. » → FAUX
    contre-exemple (refute) : a = 1/2, b = 1/2
  [examen tf]
  pièges : p_indep_disjoint

2 composants indépendants, de fiabilité 0,95 chacun, sont montés en série (le système marche si tous marchent). Probabilité que le système marche ?
  [free, sans aide, examen coef]  Pr(marche)
    = 0,95²   ← Tous doivent marcher
    = 0,9025   ← Calculer
  pièges : p_series_parallel, p_atleast_one_np

```

## Variable discrète : fonction de masse, de répartition, quantile (`p-disc-pmf`, BA3)

_Fonction de masse, fonction de répartition F et quantile d'une variable discrète._

### Niveau 1

```
X prend les valeurs 0, 1, 2, 3 : Pr(X = 0) = 0,35 ; Pr(X = 1) = 0,15 ; Pr(X = 2) = 0,3 ; Pr(X = 3) = c. Trouve c, F(2), Pr(1 < X ≤ 2) et la médiane min{x : F(x) ≥ 0,5}.
  [guided]  c
    = 1 − (0,35 + 0,15 + 0,3)   ← Normaliser
    = □   (trous : 0,2)   ← Calculer
  — F(2)  [juge prob]  départ : F(2)
    = 0,35 + 0,15 + 0,3   ← F(2) = Pr(X ≤ 2)
    = □   (trous : 0,8)   ← Additionner
  — Pr(1<X≤2)  [juge prob]  départ : Pr(1 < X ≤ 2)
    = □ − F(1)   (trous : F(2) − F(1))   ← 1 < X ≤ 2 : de F(1) exclu à F(2) inclus
    = □ − 0,5   (trous : 0,8 − 0,5)   ← Valeurs de F
    = □   (trous : 0,3)   ← Calculer
  — méd  [juge prob]  départ : méd
    = □   (trous : 1)   ← F(0) < 0,5 ≤ F(1)
  aides : Une fonction de masse fait 1 au total ; F additionne les masses jusqu'à x inclus. | F(2)-F(□) | Pr(1 < X ≤ 2) = 0,3
  pièges : p_cdf_strict, p_quantile_inverse

X prend les valeurs 0, 1, 2, 3 : Pr(X = 0) = 0,05 ; Pr(X = 1) = 0,3 ; Pr(X = 2) = 0,2 ; Pr(X = 3) = c. Trouve c, F(2), Pr(2 ≤ X < 3) et la médiane min{x : F(x) ≥ 0,5}.
  [guided]  c
    = 1 − (0,05 + 0,3 + □)   (trous : 1 − (0,05 + 0,3 + 0,2))   ← Normaliser
    = □   (trous : 0,45)   ← Calculer
  — F(2)  [juge prob]  départ : F(2)
    = 0,05 + 0,3 + □   (trous : 0,05 + 0,3 + 0,2)   ← F(2) = Pr(X ≤ 2)
    = □   (trous : 0,55)   ← Additionner
  — Pr(2≤X<3)  [juge prob]  départ : Pr(2 ≤ X < 3)
    = □ − F(1)   (trous : F(2) − F(1))   ← 2 ≤ X < 3 : de F(1) exclu à F(2) inclus
    = □ − 0,35   (trous : 0,55 − 0,35)   ← Valeurs de F
    = □   (trous : 0,2)   ← Calculer
  — méd  [juge prob]  départ : méd
    = □   (trous : 2)   ← F(1) < 0,5 ≤ F(2)
  aides : Une fonction de masse fait 1 au total ; F additionne les masses jusqu'à x inclus. | F(2)-F(□) | Pr(2 ≤ X < 3) = 0,2
  pièges : p_cdf_strict, p_quantile_inverse

X prend les valeurs 0, 1, 2, 3 : Pr(X = 0) = 0,25 ; Pr(X = 1) = 0,05 ; Pr(X = 2) = 0,25 ; Pr(X = 3) = c. Trouve c, F(2), Pr(1 ≤ X < 3) et la médiane min{x : F(x) ≥ 0,5}.
  [guided]  c
    = 1 − (□ + 0,05 + 0,25)   (trous : 1 − (0,25 + 0,05 + 0,25))   ← Normaliser
    = □   (trous : 0,45)   ← Calculer
  — F(2)  [juge prob]  départ : F(2)
    = □ + 0,05 + 0,25   (trous : 0,25 + 0,05 + 0,25)   ← F(2) = Pr(X ≤ 2)
    = □   (trous : 0,55)   ← Additionner
  — Pr(1≤X<3)  [juge prob]  départ : Pr(1 ≤ X < 3)
    = □ − F(0)   (trous : F(2) − F(0))   ← 1 ≤ X < 3 : de F(0) exclu à F(2) inclus
    = □ − 0,25   (trous : 0,55 − 0,25)   ← Valeurs de F
    = □   (trous : 0,3)   ← Calculer
  — méd  [juge prob]  départ : méd
    = □   (trous : 2)   ← F(1) < 0,5 ≤ F(2)
  aides : Une fonction de masse fait 1 au total ; F additionne les masses jusqu'à x inclus. | F(2)-F(□) | Pr(1 ≤ X < 3) = 0,3
  pièges : p_cdf_strict, p_quantile_inverse

```

### Niveau 2

```
X prend les valeurs 0, 1, 2, 3 : Pr(X = 0) = 0,3 ; Pr(X = 1) = 0,15 ; Pr(X = 2) = 0,2 ; Pr(X = 3) = c. Trouve c, F(2), Pr(2 < X ≤ 3) et la médiane min{x : F(x) ≥ 0,5}.
  [guided]  c
    = 1 − (0,3 + 0,15 + □)   (trous : 1 − (0,3 + 0,15 + 0,2))   ← Normaliser
    = □   (trous : 0,35)   ← Calculer
  — F(2)  [juge prob]  départ : F(2)
    = 0,3 + 0,15 + □   (trous : 0,3 + 0,15 + 0,2)   ← F(2) = Pr(X ≤ 2)
    = □   (trous : 0,65)   ← Additionner
  — Pr(2<X≤3)  [juge prob]  départ : Pr(2 < X ≤ 3)
    = □ − F(2)   (trous : F(3) − F(2))   ← 2 < X ≤ 3 : de F(2) exclu à F(3) inclus
    = □ − 0,65   (trous : 1 − 0,65)   ← Valeurs de F
    = □   (trous : 0,35)   ← Calculer
  — méd  [juge prob]  départ : méd
    = □   (trous : 2)   ← F(1) < 0,5 ≤ F(2)
  aides : Une fonction de masse fait 1 au total ; F additionne les masses jusqu'à x inclus. | F(3)-F(□) | Pr(2 < X ≤ 3) = 0,35
  pièges : p_cdf_strict, p_quantile_inverse

X prend les valeurs 0, 1, 2, 3 : Pr(X = 0) = 0,05 ; Pr(X = 1) = 0,4 ; Pr(X = 2) = 0,3 ; Pr(X = 3) = c. Trouve c, F(2), Pr(1 ≤ X < 2) et la médiane min{x : F(x) ≥ 0,5}.
  [guided]  c
    = 1 − (0,05 + 0,4 + □)   (trous : 1 − (0,05 + 0,4 + 0,3))   ← Normaliser
    = □   (trous : 0,25)   ← Calculer
  — F(2)  [juge prob]  départ : F(2)
    = 0,05 + 0,4 + □   (trous : 0,05 + 0,4 + 0,3)   ← F(2) = Pr(X ≤ 2)
    = □   (trous : 0,75)   ← Additionner
  — Pr(1≤X<2)  [juge prob]  départ : Pr(1 ≤ X < 2)
    = □ − F(0)   (trous : F(1) − F(0))   ← 1 ≤ X < 2 : de F(0) exclu à F(1) inclus
    = □ − 0,05   (trous : 0,45 − 0,05)   ← Valeurs de F
    = □   (trous : 0,4)   ← Calculer
  — méd  [juge prob]  départ : méd
    = □   (trous : 2)   ← F(1) < 0,5 ≤ F(2)
  aides : Une fonction de masse fait 1 au total ; F additionne les masses jusqu'à x inclus. | F(1)-F(□) | Pr(1 ≤ X < 2) = 0,4
  pièges : p_cdf_strict, p_quantile_inverse

X prend les valeurs 0, 1, 2, 3 : Pr(X = 0) = 0,1 ; Pr(X = 1) = 0,15 ; Pr(X = 2) = 0,05 ; Pr(X = 3) = c. Trouve c, F(2), Pr(2 ≤ X < 3) et la médiane min{x : F(x) ≥ 0,5}.
  [guided]  c
    = 1 − (0,1 + 0,15 + □)   (trous : 1 − (0,1 + 0,15 + 0,05))   ← Normaliser
    = □   (trous : 0,7)   ← Calculer
  — F(2)  [juge prob]  départ : F(2)
    = 0,1 + 0,15 + □   (trous : 0,1 + 0,15 + 0,05)   ← F(2) = Pr(X ≤ 2)
    = □   (trous : 0,3)   ← Additionner
  — Pr(2≤X<3)  [juge prob]  départ : Pr(2 ≤ X < 3)
    = □ − F(1)   (trous : F(2) − F(1))   ← 2 ≤ X < 3 : de F(1) exclu à F(2) inclus
    = □ − 0,25   (trous : 0,3 − 0,25)   ← Valeurs de F
    = □   (trous : 0,05)   ← Calculer
  — méd  [juge prob]  départ : méd
    = □   (trous : 3)   ← F(2) < 0,5 ≤ F(3)
  aides : Une fonction de masse fait 1 au total ; F additionne les masses jusqu'à x inclus. | F(2)-F(□) | Pr(2 ≤ X < 3) = 0,05
  pièges : p_cdf_strict, p_quantile_inverse

```

### Niveau 3

```
X prend les valeurs 0, 1, 2, 3 : Pr(X = 0) = 0,25 ; Pr(X = 1) = 0,1 ; Pr(X = 2) = 0,35 ; Pr(X = 3) = c. Trouve c, F(2), Pr(2 ≤ X < 3) et la médiane min{x : F(x) ≥ 0,5}.
  [tap, suivre l'erreur, menu menu]  c
    = 1 − (0,25 + 0,1 + 0,35)   ← Normaliser
    = 0,3   ← Calculer
  — F(2)  [juge prob]  départ : F(2)
    = 0,25 + 0,1 + 0,35   ← F(2) = Pr(X ≤ 2)
    = 0,7   ← Additionner
  — Pr(2≤X<3)  [juge prob]  départ : Pr(2 ≤ X < 3)
    = F(2) − F(1)   ← 2 ≤ X < 3 : de F(1) exclu à F(2) inclus
    = 0,7 − 0,35   ← Valeurs de F
    = 0,35   ← Calculer
  — méd  [juge prob]  départ : méd
    = 2   ← F(1) < 0,5 ≤ F(2)
  aides : Une fonction de masse fait 1 au total ; F additionne les masses jusqu'à x inclus. | F(2)-F(□) | Pr(2 ≤ X < 3) = 0,35
  pièges : p_cdf_strict, p_quantile_inverse

X prend les valeurs 0, 1, 2, 3, 4 : Pr(X = 0) = 0,1 ; Pr(X = 1) = 0,15 ; Pr(X = 2) = 0,25 ; Pr(X = 3) = 0,25 ; Pr(X = 4) = c. Trouve c, F(3), Pr(1 < X ≤ 2) et la médiane min{x : F(x) ≥ 0,5}.
  [tap, suivre l'erreur, menu menu]  c
    = 1 − (0,1 + 0,15 + 0,25 + 0,25)   ← Normaliser
    = 0,25   ← Calculer
  — F(3)  [juge prob]  départ : F(3)
    = 0,1 + 0,15 + 0,25 + 0,25   ← F(3) = Pr(X ≤ 3)
    = 0,75   ← Additionner
  — Pr(1<X≤2)  [juge prob]  départ : Pr(1 < X ≤ 2)
    = F(2) − F(1)   ← 1 < X ≤ 2 : de F(1) exclu à F(2) inclus
    = 0,5 − 0,25   ← Valeurs de F
    = 0,25   ← Calculer
  — méd  [juge prob]  départ : méd
    = 2   ← F(1) < 0,5 ≤ F(2)
  aides : Une fonction de masse fait 1 au total ; F additionne les masses jusqu'à x inclus. | F(2)-F(□) | Pr(1 < X ≤ 2) = 0,25
  pièges : p_cdf_strict, p_quantile_inverse

X prend les valeurs 0, 1, 2, 3 : Pr(X = 0) = 0,1 ; Pr(X = 1) = 0,2 ; Pr(X = 2) = 0,15 ; Pr(X = 3) = c. Trouve c, F(2), Pr(1 ≤ X < 3) et la médiane min{x : F(x) ≥ 0,5}.
  [tap, suivre l'erreur, menu menu]  c
    = 1 − (0,1 + 0,2 + 0,15)   ← Normaliser
    = 0,55   ← Calculer
  — F(2)  [juge prob]  départ : F(2)
    = 0,1 + 0,2 + 0,15   ← F(2) = Pr(X ≤ 2)
    = 0,45   ← Additionner
  — Pr(1≤X<3)  [juge prob]  départ : Pr(1 ≤ X < 3)
    = F(2) − F(0)   ← 1 ≤ X < 3 : de F(0) exclu à F(2) inclus
    = 0,45 − 0,1   ← Valeurs de F
    = 0,35   ← Calculer
  — méd  [juge prob]  départ : méd
    = 3   ← F(2) < 0,5 ≤ F(3)
  aides : Une fonction de masse fait 1 au total ; F additionne les masses jusqu'à x inclus. | F(2)-F(□) | Pr(1 ≤ X < 3) = 0,35
  pièges : p_cdf_strict, p_quantile_inverse

```

### Niveau 4

```
X prend les valeurs 0, 1, 2, 3, 4 : Pr(X = 0) = 0,15 ; Pr(X = 1) = 0,15 ; Pr(X = 2) = 0,05 ; Pr(X = 3) = 0,3 ; Pr(X = 4) = c. Trouve c, F(3), Pr(3 < X ≤ 4) et la médiane min{x : F(x) ≥ 0,5}.
  [free, suivre l'erreur]  c
    = 1 − (0,15 + 0,15 + 0,05 + 0,3)   ← Normaliser
    = 0,35   ← Calculer
  — F(3)  [juge prob]  départ : F(3)
    = 0,15 + 0,15 + 0,05 + 0,3   ← F(3) = Pr(X ≤ 3)
    = 0,65   ← Additionner
  — Pr(3<X≤4)  [juge prob]  départ : Pr(3 < X ≤ 4)
    = F(4) − F(3)   ← 3 < X ≤ 4 : de F(3) exclu à F(4) inclus
    = 1 − 0,65   ← Valeurs de F
    = 0,35   ← Calculer
  — méd  [juge prob]  départ : méd
    = 3   ← F(2) < 0,5 ≤ F(3)
  aides : Une fonction de masse fait 1 au total ; F additionne les masses jusqu'à x inclus. | F(4)-F(□) | Pr(3 < X ≤ 4) = 0,35
  pièges : p_cdf_strict, p_quantile_inverse

Un archer touche la cible avec probabilité 0,5 à chaque tir, indépendamment. X compte les tirs manqués avant le premier tir réussi : Pr(X = x) = c·(0,5)ˣ pour x = 0, 1, 2, … (convention MATH-234). Trouve c, Pr(X ≥ 3) et E[X].
  [free, suivre l'erreur]  c
    = 1 − 0,5   ← c·1/(1 − 0,5) = 1
    = 0,5   ← c = p
  — Pr(X≥3)  [juge prob]  départ : Pr(X ≥ 3)
    = 0,5³   ← X ≥ 3 : les 3 premiers tirs manqués
    = 0,125   ← Calculer
  — E[X]  [juge prob]  départ : E[X]
    = 0,5/0,5   ← Convention MATH-234 : (1 − p)/p
    = 1   ← Calculer
  aides : Une fonction de masse fait 1 au total ; F(x) = Pr(X ≤ x) cumule jusqu'à x inclus. | c · (somme des poids) = □ | c = 0,5
  pièges : p_cdf_strict, p_geom_support

X prend les valeurs 1, 2, …, 4 avec Pr(X = k) = c·k. Trouve c, puis Pr(X ≥ 2).
  [free, suivre l'erreur]  c
    = 1/(1 + 2 + 3 + 4)   ← Normaliser
    = 0,1   ← 1 + … + 4 = 10
  — Pr(X≥2)  [juge prob]  départ : Pr(X ≥ 2)
    = (2 + 3 + 4)/10   ← c fois la somme
    = 0,9   ← Calculer
  aides : Une fonction de masse fait 1 au total ; F(x) = Pr(X ≤ x) cumule jusqu'à x inclus. | c · (somme des poids) = □ | c = 0,1
  pièges : p_cdf_strict

```

### Niveau 5

```
On lance deux dés équilibrés ; X est le plus grand des deux numéros. Donne Pr(X = 5), F(5) = Pr(X ≤ 5) et la médiane de X.
  [free, sans aide]  Pr(X = 5)
    = 9/36   ← 9 couples sur 36
    = 0,25   ← Simplifier
  — F(5)  [juge prob]  départ : F(5)
    = (5/6)²   ← max ≤ k : les deux dés ≤ k
    = 25/36   ← Calculer
  — méd  [juge prob]  départ : méd
    = 5   ← F(4) = 16/36 < 1/2 ≤ F(5) = 25/36
  pièges : p_quantile_inverse

Un archer touche la cible avec probabilité 0,2 à chaque tir, indépendamment. X compte les tirs manqués avant le premier tir réussi : Pr(X = x) = c·(0,8)ˣ pour x = 0, 1, 2, … (convention MATH-234). Trouve c, Pr(X ≥ 2) et E[X].
  [free, sans aide]  c
    = 1 − 0,8   ← c·1/(1 − 0,8) = 1
    = 0,2   ← c = p
  — Pr(X≥2)  [juge prob]  départ : Pr(X ≥ 2)
    = 0,8²   ← X ≥ 2 : les 2 premiers tirs manqués
    = 0,64   ← Calculer
  — E[X]  [juge prob]  départ : E[X]
    = 0,8/0,2   ← Convention MATH-234 : (1 − p)/p
    = 4   ← Calculer
  pièges : p_cdf_strict, p_geom_support

On lance deux dés équilibrés ; X est le plus grand des deux numéros. Donne Pr(X = 6), F(6) = Pr(X ≤ 6) et la médiane de X.
  [free, sans aide]  Pr(X = 6)
    = 11/36   ← 11 couples sur 36
  — F(6)  [juge prob]  départ : F(6)
    = (6/6)²   ← max ≤ k : les deux dés ≤ k
    = 1   ← Calculer
  — méd  [juge prob]  départ : méd
    = 5   ← F(4) = 16/36 < 1/2 ≤ F(5) = 25/36
  pièges : p_quantile_inverse

```

### Variantes d'examen

```
X a pour loi Pr(X = 0) = 0,35 ; Pr(X = 1) = 0,1 ; Pr(X = 2) = 0,1 ; Pr(X = 3) = 0,35 ; Pr(X = 4) = 0,1. Que vaut Pr(2 < X ≤ 3) ?
  · 0 [p_cdf_strict]   · 0,45 [p_cdf_strict]   ✔ 0,35   · 0,9
  [examen mcq]
  pièges : p_cdf_strict

Vrai ou faux ?
  « Une variable géométrique vérifie Pr(X > m + n | X > n) = Pr(X > m). » → VRAI
  [examen tf]

X a pour loi Pr(X = 0) = 0,15 ; Pr(X = 1) = 0,3 ; Pr(X = 2) = 0,3 ; Pr(X = 3) = 0,25. Que vaut Pr(1 ≤ X < 3) ?
  [free, sans aide, examen coef]  Pr(1 ≤ X < 3)
    = F(2) − F(0)   ← 1 ≤ X < 3 : de F(0) exclu à F(2) inclus
    = 0,75 − 0,15   ← Valeurs de F
    = 0,6   ← Calculer
  pièges : p_cdf_strict

```

## Bernoulli et binomiale (`p-binom`, BA3)

_Reconnaître une binomiale B(n, p) et calculer Pr(X = k) = C(n, k)·pᵏ(1 − p)ⁿ⁻ᵏ, E[X] et var(X)._

### Niveau 1

```
Une machine produit 20 % de pièces défectueuses, indépendamment. On prend 6 pièces. X = nombre de pièces défectueuses. Pr(X = 1) ?
  [guided]  p
    = 0,2   ← p = probabilité d'un succès, n = 6
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = C(6;□)×0,2×0,8^□   (trous : C(6;1)×0,2×0,8^5)   ← Formule de la binomiale
    = □·0,2·0,32768   (trous : 6·0,2·0,32768)   ← Calculer chaque facteur
    = □   (trous : 0,393216)   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(6;1)×0,2 | Pr(X = 1) = 0,393216
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

Une machine produit 10 % de pièces défectueuses, indépendamment. On prend 5 pièces. X = nombre de pièces défectueuses. Pr(X = 2) ?
  [guided]  p
    = 0,1   ← p = probabilité d'un succès, n = 5
  — Pr(X=2)  [juge prob]  départ : Pr(X = 2)
    = C(5;□)×0,1^2×0,9^□   (trous : C(5;2)×0,1^2×0,9^3)   ← Formule de la binomiale
    = □·0,01·0,729   (trous : 10·0,01·0,729)   ← Calculer chaque facteur
    = □   (trous : 0,0729)   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(5;2)×0,1^□ | Pr(X = 2) = 0,0729
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

Une machine produit 10 % de pièces défectueuses, indépendamment. On prend 5 pièces. X = nombre de pièces défectueuses. Pr(X = 1) ?
  [guided]  p
    = 0,1   ← p = probabilité d'un succès, n = 5
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = C(5;□)×0,1×0,9^□   (trous : C(5;1)×0,1×0,9^4)   ← Formule de la binomiale
    = □·0,1·0,6561   (trous : 5·0,1·0,6561)   ← Calculer chaque facteur
    = □   (trous : 0,32805)   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(5;1)×0,1 | Pr(X = 1) = 0,32805
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

```

### Niveau 2

```
Une machine produit 20 % de pièces défectueuses, indépendamment. On prend 5 pièces. X = nombre de pièces défectueuses. Pr(X = 2) ?
  [guided]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 5 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,2   ← p = probabilité d'un succès, n = 5
  — Pr(X=2)  [juge prob]  départ : Pr(X = 2)
    = C(5;□)×0,2^2×0,8^□   (trous : C(5;2)×0,2^2×0,8^3)   ← Formule de la binomiale
    = □·0,04·0,512   (trous : 10·0,04·0,512)   ← Calculer chaque facteur
    = □   (trous : 0,2048)   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(5;2)×0,2^□ | Pr(X = 2) = 0,2048
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

Un QCM a 8 questions à 4 réponses, dont une juste. Un élève répond au hasard. X = nombre de bonnes réponses. Pr(X = 1) ?
  [guided]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 8 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,25   ← p = probabilité d'un succès, n = 8
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = C(8;□)×0,25×0,75^7   (trous : C(8;1)×0,25×0,75^7)   ← Formule de la binomiale
    = □·0,25·2187/16384   (trous : 8·0,25·2187/16384)   ← Calculer chaque facteur
    = □   (trous : 2187/8192)   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(8;1)×0,25 | Pr(X = 1) = 2187/8192
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

Un QCM a 4 questions à 5 réponses, dont une juste. Un élève répond au hasard. X = nombre de bonnes réponses. Pr(X = 2) ?
  [guided]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 4 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,2   ← p = probabilité d'un succès, n = 4
  — Pr(X=2)  [juge prob]  départ : Pr(X = 2)
    = C(4;□)×0,2^2×0,8^2   (trous : C(4;2)×0,2^2×0,8^2)   ← Formule de la binomiale
    = □·0,04·0,64   (trous : 6·0,04·0,64)   ← Calculer chaque facteur
    = □   (trous : 0,1536)   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(4;2)×0,2^□ | Pr(X = 2) = 0,1536
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

```

### Niveau 3

```
Une urne contient 2 boules rouges et 8 bleues. On tire 5 boules avec remise. X = nombre de rouges. Pr(X = 2) ?
  [tap, suivre l'erreur, menu menu]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 5 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,2   ← p = probabilité d'un succès, n = 5
  — Pr(X=2)  [juge prob]  départ : Pr(X = 2)
    = C(5;2)×0,2^2×0,8^3   ← Formule de la binomiale
    = 10·0,04·0,512   ← Calculer chaque facteur
    = 0,2048   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(5;2)×0,2^□ | Pr(X = 2) = 0,2048
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

Une urne contient 6 boules rouges et 4 bleues. On tire 6 boules avec remise. X = nombre de rouges. Pr(X = 1) ?
  [tap, suivre l'erreur, menu menu]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 6 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,6   ← p = probabilité d'un succès, n = 6
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = C(6;1)×0,6×0,4^5   ← Formule de la binomiale
    = 6·0,6·0,01024   ← Calculer chaque facteur
    = 0,036864   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(6;1)×0,6 | Pr(X = 1) = 0,036864
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

Un QCM a 4 questions à 5 réponses, dont une juste. Un élève répond au hasard. X = nombre de bonnes réponses. Pr(X = 1) ?
  [tap, suivre l'erreur, menu menu]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 4 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,2   ← p = probabilité d'un succès, n = 4
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = C(4;1)×0,2×0,8^3   ← Formule de la binomiale
    = 4·0,2·0,512   ← Calculer chaque facteur
    = 0,4096   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(4;1)×0,2 | Pr(X = 1) = 0,4096
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

```

### Niveau 4

```
Une urne contient 3 boules rouges et 7 bleues. On tire 5 boules avec remise. X = nombre de rouges. Pr(X = 4) ? Puis E[X] et var(X).
  [free, suivre l'erreur]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 5 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,3   ← p = probabilité d'un succès, n = 5
  — Pr(X=4)  [juge prob]  départ : Pr(X = 4)
    = C(5;4)×0,3^4×0,7   ← Formule de la binomiale
    = 5·0,0081·0,7   ← Calculer chaque facteur
    = 0,02835   ← Multiplier
  — E[X]  [juge prob]  départ : E[X]
    = 5·0,3   ← np
    = 1,5   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 5·0,3·0,7   ← np(1 − p)
    = 1,05   ← Calculer
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(5;4)×0,3^□ | Pr(X = 4) = 0,02835
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

Une machine produit 10 % de pièces défectueuses, indépendamment. On prend 6 pièces. X = nombre de pièces défectueuses. Pr(X = 1) ? Puis Pr(X ≥ 2).
  [free, suivre l'erreur]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 6 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,1   ← p = probabilité d'un succès, n = 6
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = C(6;1)×0,1×0,9^5   ← Formule de la binomiale
    = 6·0,1·0,59049   ← Calculer chaque facteur
    = 0,354294   ← Multiplier
  — Pr(X=0)  [juge prob]  départ : Pr(X = 0)
    = C(6;0)×0,9^6   ← Formule de la binomiale
    = 1·0,531441   ← Calculer chaque facteur
    = 0,531441   ← Multiplier
  — Pr(X≥2)  [juge prob]  départ : Pr(X ≥ 2)
    = 1 − 0,531441 − 0,354294   ← Complément de « 0 ou 1 »
    = 0,114265   ← Calculer
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(6;1)×0,1 | Pr(X = 1) = 0,354294
  pièges : p_binom_no_coef, p_binom_swap_p, p_atleast_one_np, p_binom_without_replacement

Une urne contient 8 boules rouges et 2 bleues. On tire 5 boules avec remise. X = nombre de rouges. Pr(X = 1) ? Puis Pr(X ≥ 2).
  [free, suivre l'erreur]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 5 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,8   ← p = probabilité d'un succès, n = 5
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = C(5;1)×0,8×0,2^4   ← Formule de la binomiale
    = 5·0,8·0,0016   ← Calculer chaque facteur
    = 0,0064   ← Multiplier
  — Pr(X=0)  [juge prob]  départ : Pr(X = 0)
    = C(5;0)×0,2^5   ← Formule de la binomiale
    = 1·0,00032   ← Calculer chaque facteur
    = 0,00032   ← Multiplier
  — Pr(X≥2)  [juge prob]  départ : Pr(X ≥ 2)
    = 1 − 0,00032 − 0,0064   ← Complément de « 0 ou 1 »
    = 0,99328   ← Calculer
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(5;1)×0,8 | Pr(X = 1) = 0,0064
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement, p_atleast_one_np

```

### Niveau 5

```
Une machine produit 10 % de pièces défectueuses, indépendamment. On prend 4 pièces. X = nombre de pièces défectueuses. Pr(X = 1) ? Puis E[X] et var(X). Puis Pr(X ≥ 2).
  [free, sans aide]  p
    = 0,1   ← p = probabilité d'un succès, n = 4
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = C(4;1)×0,1×0,9^3   ← Formule de la binomiale
    = 4·0,1·0,729   ← Calculer chaque facteur
    = 0,2916   ← Multiplier
  — E[X]  [juge prob]  départ : E[X]
    = 4·0,1   ← np
    = 0,4   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 4·0,1·0,9   ← np(1 − p)
    = 0,36   ← Calculer
  — Pr(X=0)  [juge prob]  départ : Pr(X = 0)
    = C(4;0)×0,9^4   ← Formule de la binomiale
    = 1·0,6561   ← Calculer chaque facteur
    = 0,6561   ← Multiplier
  — Pr(X≥2)  [juge prob]  départ : Pr(X ≥ 2)
    = 1 − 0,6561 − 0,2916   ← Complément de « 0 ou 1 »
    = 0,0523   ← Calculer
  pièges : p_binom_no_coef, p_binom_swap_p, p_atleast_one_np, p_binom_without_replacement

Un QCM a 8 questions à 4 réponses, dont une juste. Un élève répond au hasard. X = nombre de bonnes réponses. Pr(X = 1) ? Puis E[X] et var(X). Puis Pr(X ≥ 2).
  [free, sans aide]  p
    = 0,25   ← p = probabilité d'un succès, n = 8
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = C(8;1)×0,25×0,75^7   ← Formule de la binomiale
    = 8·0,25·2187/16384   ← Calculer chaque facteur
    = 2187/8192   ← Multiplier
  — E[X]  [juge prob]  départ : E[X]
    = 8·0,25   ← np
    = 2   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 8·0,25·0,75   ← np(1 − p)
    = 1,5   ← Calculer
  — Pr(X=0)  [juge prob]  départ : Pr(X = 0)
    = C(8;0)×0,75^8   ← Formule de la binomiale
    = 1·6561/65536   ← Calculer chaque facteur
    = 6561/65536   ← Multiplier
  — Pr(X≥2)  [juge prob]  départ : Pr(X ≥ 2)
    = 1 − 6561/65536 − 2187/8192   ← Complément de « 0 ou 1 »
    = 41479/65536   ← Calculer
  pièges : p_binom_no_coef, p_binom_swap_p, p_atleast_one_np, p_binom_without_replacement

Une machine produit 20 % de pièces défectueuses, indépendamment. On prend 4 pièces. X = nombre de pièces défectueuses. Pr(X = 2) ? Puis E[X] et var(X). Puis Pr(X ≥ 2).
  [free, sans aide]  p
    = 0,2   ← p = probabilité d'un succès, n = 4
  — Pr(X=2)  [juge prob]  départ : Pr(X = 2)
    = C(4;2)×0,2^2×0,8^2   ← Formule de la binomiale
    = 6·0,04·0,64   ← Calculer chaque facteur
    = 0,1536   ← Multiplier
  — E[X]  [juge prob]  départ : E[X]
    = 4·0,2   ← np
    = 0,8   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 4·0,2·0,8   ← np(1 − p)
    = 0,64   ← Calculer
  — Pr(X=0)  [juge prob]  départ : Pr(X = 0)
    = C(4;0)×0,8^4   ← Formule de la binomiale
    = 1·0,4096   ← Calculer chaque facteur
    = 0,4096   ← Multiplier
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = C(4;1)×0,2×0,8^3   ← Formule de la binomiale
    = 4·0,2·0,512   ← Calculer chaque facteur
    = 0,4096   ← Multiplier
  — Pr(X≥2)  [juge prob]  départ : Pr(X ≥ 2)
    = 1 − 0,4096 − 0,4096   ← Complément de « 0 ou 1 »
    = 0,1808   ← Calculer
  pièges : p_binom_no_coef, p_binom_swap_p, p_atleast_one_np, p_binom_without_replacement

```

### Variantes d'examen

```
Une urne contient 2 boules rouges et 8 bleues. On tire 5 boules avec remise. X = nombre de rouges. Pr(X = 2) ?
  · 0,02048 [p_binom_no_coef]   · 0,0512 [p_binom_swap_p]   ✔ 0,2048   · 0,4
  [examen mcq]
  pièges : p_binom_no_coef, p_binom_swap_p

Vrai ou faux ?
  « Dans une urne de 5 boules dont 2 rouges, le nombre de rouges en 3 tirages sans remise suit la loi B(3 ; 2/5). » → FAUX
    contre-exemple (refute) : p = 0
  [examen tf]
  pièges : p_binom_without_replacement

Une urne contient 4 boules rouges et 6 bleues. On tire 3 boules avec remise. X = nombre de rouges. Pr(X = 1) ?
  [free, sans aide, examen coef]  Pr(X = 1)
    = C(3;1)×0,4×0,6^2   ← Formule de la binomiale
    = 3·0,4·0,36   ← Calculer chaque facteur
    = 0,432   ← Multiplier
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

```

## Loi de Poisson, lien avec la binomiale (`p-poisson`, BA3)

_La loi de Poisson, Pr(X = k) = λᵏe^(−λ)/k!, son taux sur une durée, et l'approximation de B(n, p) par Poiss(np)._

### Niveau 1

```
Une hotline reçoit en moyenne 2 appels par heure (loi de Poisson). X = nombre d'appels pendant 30 minutes. Calcule λ, puis Pr(X = 0) à 0,001 près.
  [guided]  λ
    = 2·□   (trous : 2·0,5)   ← Taux × durée
    = □   (trous : 1)   ← Calculer
  — Pr(X=0)  [juge stat]  départ : Pr(X = 0)
    = e^(−□)   (trous : e^(−1))   ← Formule de Poisson
    = □   (trous : 0,368)   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | λ = 1, puis e^(-1) | Pr(X=0) ≈ 0,368
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

Un standard reçoit des appels de deux services indépendants : Poiss(1) et Poiss(1) par heure. X = nombre total d'appels en une heure. Calcule λ, puis Pr(X = 0) à 0,001 près.
  [guided]  λ
    = □ + 1   (trous : 1 + 1)   ← Somme de Poisson indépendantes
    = □   (trous : 2)   ← Calculer
  — Pr(X=0)  [juge stat]  départ : Pr(X = 0)
    = e^(−□)   (trous : e^(−2))   ← Formule de Poisson
    = □   (trous : 0,135)   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | λ = 2, puis e^(-2) | Pr(X=0) ≈ 0,135
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

Une hotline reçoit en moyenne 2 appels par heure (loi de Poisson). X = nombre d'appels pendant 30 minutes. Calcule λ, puis Pr(X = 0) à 0,001 près.
  [guided]  λ
    = 2·□   (trous : 2·0,5)   ← Taux × durée
    = □   (trous : 1)   ← Calculer
  — Pr(X=0)  [juge stat]  départ : Pr(X = 0)
    = e^(−□)   (trous : e^(−1))   ← Formule de Poisson
    = □   (trous : 0,368)   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | λ = 1, puis e^(-1) | Pr(X=0) ≈ 0,368
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

```

### Niveau 2

```
Une hotline reçoit en moyenne 1 appel par heure (loi de Poisson). X = nombre d'appels pendant 2 heures. Calcule λ, puis Pr(X = 1) à 0,001 près.
  [guided]  λ
    = 1·□   (trous : 1·2)   ← Taux × durée
    = □   (trous : 2)   ← Calculer
  — Pr(X=1)  [juge stat]  départ : Pr(X = 1)
    = □·e^(−2)   (trous : 2·e^(−2))   ← Formule de Poisson
    = □   (trous : 0,271)   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | λ = 2, puis 2×e^(-2) | Pr(X=1) ≈ 0,271
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

Une hotline reçoit en moyenne 1 appel par heure (loi de Poisson). X = nombre d'appels pendant 2 heures. Calcule λ, puis Pr(X = 0) à 0,001 près.
  [guided]  λ
    = 1·□   (trous : 1·2)   ← Taux × durée
    = □   (trous : 2)   ← Calculer
  — Pr(X=0)  [juge stat]  départ : Pr(X = 0)
    = e^(−□)   (trous : e^(−2))   ← Formule de Poisson
    = □   (trous : 0,135)   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | λ = 2, puis e^(-2) | Pr(X=0) ≈ 0,135
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

Un standard reçoit des appels de deux services indépendants : Poiss(1,5) et Poiss(0,5) par heure. X = nombre total d'appels en une heure. Calcule λ, puis Pr(X = 1) à 0,001 près.
  [guided]  λ
    = 1,5 + □   (trous : 1,5 + 0,5)   ← Somme de Poisson indépendantes
    = □   (trous : 2)   ← Calculer
  — Pr(X=1)  [juge stat]  départ : Pr(X = 1)
    = □·e^(−2)   (trous : 2·e^(−2))   ← Formule de Poisson
    = □   (trous : 0,271)   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | λ = 2, puis 2×e^(-2) | Pr(X=1) ≈ 0,271
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

```

### Niveau 3

```
Un standard reçoit des appels de deux services indépendants : Poiss(0,5) et Poiss(0,5) par heure. X = nombre total d'appels en une heure. Calcule λ, puis Pr(X ≤ 1) à 0,001 près.
  [tap, suivre l'erreur, menu menu]  λ
    = 0,5 + 0,5   ← Somme de Poisson indépendantes
    = 1   ← Calculer
  — Pr(X≤1)  [juge stat]  départ : Pr(X ≤ 1)
    = e^(−1) + 1·e^(−1)   ← Somme des cas
    = 0,736   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-1) + … | Pr(X≤1) ≈ 0,736
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

Une hotline reçoit en moyenne 0,5 appel par heure (loi de Poisson). X = nombre d'appels pendant 2 heures. Calcule λ, puis Pr(X ≤ 1) à 0,001 près.
  [tap, suivre l'erreur, menu menu]  λ
    = 0,5·2   ← Taux × durée
    = 1   ← Calculer
  — Pr(X≤1)  [juge stat]  départ : Pr(X ≤ 1)
    = e^(−1) + 1·e^(−1)   ← Somme des cas
    = 0,736   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-1) + … | Pr(X≤1) ≈ 0,736
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

Un standard reçoit des appels de deux services indépendants : Poiss(1,5) et Poiss(1,5) par heure. X = nombre total d'appels en une heure. Calcule λ, puis Pr(X ≤ 2) à 0,001 près.
  [tap, suivre l'erreur, menu menu]  λ
    = 1,5 + 1,5   ← Somme de Poisson indépendantes
    = 3   ← Calculer
  — Pr(X≤2)  [juge stat]  départ : Pr(X ≤ 2)
    = e^(−3) + 3·e^(−3) + 3²·e^(−3)/2!   ← Somme des cas
    = 0,423   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-3) + … | Pr(X≤2) ≈ 0,423
  pièges : p_poisson_rate_scale, p_poisson_no_factorial, p_poisson_approx_bad

```

### Niveau 4

```
Une hotline reçoit en moyenne 1,5 appels par heure (loi de Poisson). X = nombre d'appels pendant 2 heures. Calcule λ, puis Pr(X ≤ 2) à 0,001 près.
  [free, suivre l'erreur]  λ
    = 1,5·2   ← Taux × durée
    = 3   ← Calculer
  — Pr(X≤2)  [juge stat]  départ : Pr(X ≤ 2)
    = e^(−3) + 3·e^(−3) + 3²·e^(−3)/2!   ← Somme des cas
    = 0,423   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-3) + … | Pr(X≤2) ≈ 0,423
  pièges : p_poisson_rate_scale, p_poisson_no_factorial, p_poisson_approx_bad

Une hotline reçoit en moyenne 0,5 appel par heure (loi de Poisson). X = nombre d'appels pendant 2 heures. Calcule λ, puis Pr(X = 1) à 0,001 près.
  [free, suivre l'erreur]  λ
    = 0,5·2   ← Taux × durée
    = 1   ← Calculer
  — Pr(X=1)  [juge stat]  départ : Pr(X = 1)
    = 1·e^(−1)   ← Formule de Poisson
    = 0,368   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | λ = 1, puis 1×e^(-1) | Pr(X=1) ≈ 0,368
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

Une hotline reçoit en moyenne 0,5 appel par heure (loi de Poisson). X = nombre d'appels pendant 2 heures. Calcule λ, puis Pr(X = 3) à 0,001 près.
  [free, suivre l'erreur]  λ
    = 0,5·2   ← Taux × durée
    = 1   ← Calculer
  — Pr(X=3)  [juge stat]  départ : Pr(X = 3)
    = 1³·e^(−1)/3!   ← Formule de Poisson
    = 0,061   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | λ = 1, puis 1^3×e^(-1)/3! | Pr(X=3) ≈ 0,061
  pièges : p_poisson_rate_scale, p_poisson_no_factorial, p_poisson_approx_bad

```

### Niveau 5

```
Une hotline reçoit en moyenne 2 appels par heure (loi de Poisson). X = nombre d'appels pendant 30 minutes. Calcule λ, puis Pr(X ≤ 1) à 0,001 près.
  [free, sans aide]  λ
    = 2·0,5   ← Taux × durée
    = 1   ← Calculer
  — Pr(X≤1)  [juge stat]  départ : Pr(X ≤ 1)
    = e^(−1) + 1·e^(−1)   ← Somme des cas
    = 0,736   ← Valeur approchée à 0,001
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

Une hotline reçoit en moyenne 2 appels par heure (loi de Poisson). X = nombre d'appels pendant 2 heures. Calcule λ, puis Pr(X ≤ 3) à 0,001 près.
  [free, sans aide]  λ
    = 2·2   ← Taux × durée
    = 4   ← Calculer
  — Pr(X≤3)  [juge stat]  départ : Pr(X ≤ 3)
    = e^(−4) + 4·e^(−4) + 4²·e^(−4)/2! + 4³·e^(−4)/3!   ← Somme des cas
    = 0,433   ← Valeur approchée à 0,001
  pièges : p_poisson_rate_scale, p_poisson_no_factorial, p_poisson_approx_bad

Une hotline reçoit en moyenne 2 appels par heure (loi de Poisson). X = nombre d'appels pendant 2 heures. Calcule λ, puis Pr(X ≤ 1) à 0,001 près.
  [free, sans aide]  λ
    = 2·2   ← Taux × durée
    = 4   ← Calculer
  — Pr(X≤1)  [juge stat]  départ : Pr(X ≤ 1)
    = e^(−4) + 4·e^(−4)   ← Somme des cas
    = 0,092   ← Valeur approchée à 0,001
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

```

### Variantes d'examen

```
Une hotline reçoit en moyenne 0,5 appel par heure (loi de Poisson). X = nombre d'appels pendant 2 heures. Pr(X≤1) ≈ ?
  · 0,368   · 0,910 [p_poisson_rate_scale]   · 0,264   ✔ 0,736
  [examen mcq]
  pièges : p_poisson_rate_scale

Vrai ou faux ?
  « Si X ~ Poiss(2) et Y ~ Poiss(3) sont indépendantes, alors X + Y ~ Poiss(5). » → VRAI
  [examen tf]

Chaque jour, 500 voitures passent à un feu ; chacune le grille avec probabilité 0,006, indépendamment. X = nombre de voitures qui grillent le feu. Calcule λ, puis Pr(X = 2) à 0,001 près.
  [free, sans aide, examen coef]  Pr(X = 2)
    = 3²·e^(−3)/2!   ← Formule de Poisson
    = 0,224   ← Valeur approchée à 0,001
  pièges : p_poisson_no_factorial

```

## Loi hypergéométrique (`p-hypergeom`, BA3)

_Tirages sans remise : Pr(X = k) = C(K, k)·C(N − K, n − k)/C(N, n)._

### Niveau 1

```
Un lot de 13 pièces contient 6 pièces défectueuses. On en prélève 5 au hasard, sans remise. Probabilité d'obtenir exactement 2 défectueuses ?
  [guided]  Pr(X = 2)
    = C(6;□)×C(7;□)/C(13;5)   (trous : C(6;2)×C(7;3)/C(13;5))   ← 2 défectueuses, 3 autres, sur tous les tirages
    = 525/□   (trous : 525/1287)   ← Calculer
    = □   (trous : 175/429)   ← Simplifier
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(6;2)×C(7;□)/C(13;5) | Pr(X = 2) = 175/429
  pièges : p_binom_without_replacement, p_count_forget_rest

Une urne contient 6 boules rouges et 5 bleues. On tire 4 boules sans remise. Probabilité d'obtenir exactement 3 rouges ?
  [guided]  Pr(X = 3)
    = C(6;□)×C(5;□)/C(11;4)   (trous : C(6;3)×C(5;1)/C(11;4))   ← 3 rouges, 1 autre, sur tous les tirages
    = 100/□   (trous : 100/330)   ← Calculer
    = □   (trous : 10/33)   ← Simplifier
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(6;3)×C(5;□)/C(11;4) | Pr(X = 3) = 10/33
  pièges : p_binom_without_replacement, p_count_forget_rest

Une urne contient 9 boules rouges et 5 bleues. On tire 4 boules sans remise. Probabilité d'obtenir exactement 4 rouges ?
  [guided]  Pr(X = 4)
    = C(9;□)×C(5;□)/C(14;4)   (trous : C(9;4)×C(5;0)/C(14;4))   ← 4 rouges, 0 autre, sur tous les tirages
    = 126/□   (trous : 126/1001)   ← Calculer
    = □   (trous : 18/143)   ← Simplifier
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(9;4)×C(5;□)/C(14;4) | Pr(X = 4) = 18/143
  pièges : p_binom_without_replacement, p_count_forget_rest

```

### Niveau 2

```
Une urne contient 6 boules rouges et 8 bleues. On tire 5 boules sans remise. Probabilité d'obtenir exactement 2 rouges ?
  [guided]  Pr(X = 2)
    = C(6;□)×C(8;□)/C(14;5)   (trous : C(6;2)×C(8;3)/C(14;5))   ← 2 rouges, 3 autres, sur tous les tirages
    = 840/□   (trous : 840/2002)   ← Calculer
    = □   (trous : 60/143)   ← Simplifier
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(6;2)×C(8;□)/C(14;5) | Pr(X = 2) = 60/143
  pièges : p_binom_without_replacement, p_count_forget_rest

Un lot de 13 pièces contient 7 pièces défectueuses. On en prélève 3 au hasard, sans remise. Probabilité d'obtenir exactement 3 défectueuses ?
  [guided]  Pr(X = 3)
    = C(7;□)×C(6;□)/C(13;3)   (trous : C(7;3)×C(6;0)/C(13;3))   ← 3 défectueuses, 0 autre, sur tous les tirages
    = 35/□   (trous : 35/286)   ← Calculer
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(7;3)×C(6;□)/C(13;3) | Pr(X = 3) = 35/286
  pièges : p_binom_without_replacement, p_count_forget_rest

Un lot de 14 pièces contient 5 pièces défectueuses. On en prélève 4 au hasard, sans remise. Probabilité d'obtenir exactement 3 défectueuses ?
  [guided]  Pr(X = 3)
    = C(5;□)×C(9;□)/C(14;4)   (trous : C(5;3)×C(9;1)/C(14;4))   ← 3 défectueuses, 1 autre, sur tous les tirages
    = 90/□   (trous : 90/1001)   ← Calculer
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(5;3)×C(9;□)/C(14;4) | Pr(X = 3) = 90/1001
  pièges : p_binom_without_replacement, p_count_forget_rest

```

### Niveau 3

```
Une urne contient 6 boules rouges et 3 bleues. On tire 3 boules sans remise. Probabilité d'obtenir exactement 1 rouge ?
  [tap, suivre l'erreur, menu menu]  Pr(X = 1)
    = C(6;1)×C(3;2)/C(9;3)   ← 1 rouge, 2 autres, sur tous les tirages
    = 18/84   ← Calculer
    = 3/14   ← Simplifier
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(6;1)×C(3;□)/C(9;3) | Pr(X = 1) = 3/14
  pièges : p_binom_without_replacement, p_count_forget_rest

Une urne contient 7 boules rouges et 5 bleues. On tire 5 boules sans remise. Probabilité d'obtenir exactement 3 rouges ?
  [tap, suivre l'erreur, menu menu]  Pr(X = 3)
    = C(7;3)×C(5;2)/C(12;5)   ← 3 rouges, 2 autres, sur tous les tirages
    = 350/792   ← Calculer
    = 175/396   ← Simplifier
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(7;3)×C(5;□)/C(12;5) | Pr(X = 3) = 175/396
  pièges : p_binom_without_replacement, p_count_forget_rest

Une urne contient 8 boules rouges et 9 bleues. On tire 5 boules sans remise. Probabilité d'obtenir exactement 2 rouges ?
  [tap, suivre l'erreur, menu menu]  Pr(X = 2)
    = C(8;2)×C(9;3)/C(17;5)   ← 2 rouges, 3 autres, sur tous les tirages
    = 2352/6188   ← Calculer
    = 84/221   ← Simplifier
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(8;2)×C(9;□)/C(17;5) | Pr(X = 2) = 84/221
  pièges : p_binom_without_replacement, p_count_forget_rest

```

### Niveau 4

```
Un lot de 13 pièces contient 8 pièces défectueuses. On en prélève 4 au hasard, sans remise. Probabilité d'obtenir exactement 1 défectueuse ? Puis la probabilité d'en obtenir au moins une.
  [free, suivre l'erreur]  Pr(X = 1)
    = C(8;1)×C(5;3)/C(13;4)   ← 1 défectueuse, 3 autres, sur tous les tirages
    = 80/715   ← Calculer
    = 16/143   ← Simplifier
  — Pr(X≥1)  [juge prob]  départ : Pr(X ≥ 1)
    = 1-C(5;4)/C(13;4)   ← Contraire de « aucune »
    = 142/143   ← Calculer
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(8;1)×C(5;□)/C(13;4) | Pr(X = 1) = 16/143
  pièges : p_binom_without_replacement, p_count_forget_rest

Une urne contient 9 boules rouges et 6 bleues. On tire 4 boules sans remise. Probabilité d'obtenir exactement 4 rouges ? Puis la probabilité d'en obtenir au moins une.
  [free, suivre l'erreur]  Pr(X = 4)
    = C(9;4)×C(6;0)/C(15;4)   ← 4 rouges, 0 autre, sur tous les tirages
    = 126/1365   ← Calculer
    = 6/65   ← Simplifier
  — Pr(X≥1)  [juge prob]  départ : Pr(X ≥ 1)
    = 1-C(6;4)/C(15;4)   ← Contraire de « aucune »
    = 90/91   ← Calculer
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(9;4)×C(6;□)/C(15;4) | Pr(X = 4) = 6/65
  pièges : p_binom_without_replacement, p_count_forget_rest

Une urne contient 6 boules rouges et 7 bleues. On tire 5 boules sans remise. Probabilité d'obtenir exactement 1 rouge ? Puis la probabilité d'en obtenir au moins une.
  [free, suivre l'erreur]  Pr(X = 1)
    = C(6;1)×C(7;4)/C(13;5)   ← 1 rouge, 4 autres, sur tous les tirages
    = 210/1287   ← Calculer
    = 70/429   ← Simplifier
  — Pr(X≥1)  [juge prob]  départ : Pr(X ≥ 1)
    = 1-C(7;5)/C(13;5)   ← Contraire de « aucune »
    = 422/429   ← Calculer
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(6;1)×C(7;□)/C(13;5) | Pr(X = 1) = 70/429
  pièges : p_binom_without_replacement, p_count_forget_rest

```

### Niveau 5

```
Une urne contient 7 boules rouges et 5 bleues. On tire 4 boules sans remise. Probabilité d'obtenir exactement 2 rouges ? Puis la probabilité d'en obtenir au moins une. Enfin, la probabilité d'en avoir exactement 2 sachant qu'il y en a au moins une.
  [free, sans aide]  Pr(X = 2)
    = C(7;2)×C(5;2)/C(12;4)   ← 2 rouges, 2 autres, sur tous les tirages
    = 210/495   ← Calculer
    = 14/33   ← Simplifier
  — Pr(X≥1)  [juge prob]  départ : Pr(X ≥ 1)
    = 1-C(5;4)/C(12;4)   ← Contraire de « aucune »
    = 98/99   ← Calculer
  — Pr(X=2|X≥1)  [juge prob]  départ : Pr(X=2|X≥1)
    = (14/33)/(98/99)   ← {X = 2} est contenu dans {X ≥ 1}
    = 3/7   ← Calculer
  pièges : p_binom_without_replacement, p_count_forget_rest, p_cond_denominator

Une urne contient 8 boules rouges et 3 bleues. On tire 2 boules sans remise. Probabilité d'obtenir exactement 1 rouge ? Puis la probabilité d'en obtenir au moins une. Enfin, la probabilité d'en avoir exactement 1 sachant qu'il y en a au moins une.
  [free, sans aide]  Pr(X = 1)
    = C(8;1)×C(3;1)/C(11;2)   ← 1 rouge, 1 autre, sur tous les tirages
    = 24/55   ← Calculer
  — Pr(X≥1)  [juge prob]  départ : Pr(X ≥ 1)
    = 1-C(3;2)/C(11;2)   ← Contraire de « aucune »
    = 52/55   ← Calculer
  — Pr(X=1|X≥1)  [juge prob]  départ : Pr(X=1|X≥1)
    = (24/55)/(52/55)   ← {X = 1} est contenu dans {X ≥ 1}
    = 6/13   ← Calculer
  pièges : p_binom_without_replacement, p_count_forget_rest, p_cond_denominator

Une urne contient 9 boules rouges et 3 bleues. On tire 4 boules sans remise. Probabilité d'obtenir exactement 2 rouges ? Puis la probabilité d'en obtenir au moins une. Enfin, la probabilité d'en avoir exactement 2 sachant qu'il y en a au moins une.
  [free, sans aide]  Pr(X = 2)
    = C(9;2)×C(3;2)/C(12;4)   ← 2 rouges, 2 autres, sur tous les tirages
    = 108/495   ← Calculer
    = 12/55   ← Simplifier
  — Pr(X≥1)  [juge prob]  départ : Pr(X ≥ 1)
    = 1-C(3;4)/C(12;4)   ← Contraire de « aucune »
    = 1   ← Calculer
  — Pr(X=2|X≥1)  [juge prob]  départ : Pr(X=2|X≥1)
    = (12/55)/1   ← {X = 2} est contenu dans {X ≥ 1}
    = 12/55   ← Calculer
  pièges : p_binom_without_replacement, p_count_forget_rest, p_cond_denominator

```

### Variantes d'examen

```
Une urne contient 6 boules rouges et 7 bleues. On tire 4 boules sans remise. Probabilité d'obtenir exactement 4 rouges ?
  · 1296/28561 [p_binom_without_replacement]   · 1   ✔ 3/143   · 3/286
  [examen mcq]
  pièges : p_binom_without_replacement

Une urne contient 4 boules rouges et 8 bleues. On tire 3 boules sans remise. Probabilité d'obtenir exactement 3 rouges ?
  [free, sans aide, examen coef]  Pr(X = 3)
    = C(4;3)×C(8;0)/C(12;3)   ← 3 rouges, 0 autre, sur tous les tirages
    = 4/220   ← Calculer
    = 1/55   ← Simplifier
  pièges : p_binom_without_replacement, p_count_forget_rest

```

## Densité : normaliser, F ↔ f, probabilités (`p-cont-density`, BA3)

_Normaliser une densité, passer de f à F et calculer des probabilités par des intégrales._

### Niveau 1

```
X a pour densité c·x^−6 pour x ≥ 1, et 0 ailleurs. Trouve c, puis Pr(X>3).
  [guided]  I
    (I = ∫ x^−6 dx sur le support [1 ; ∞[.)
    (Sur quel intervalle intègre-t-on ? Sur le support [1 ; ∞[.)
    = 0 − (−□)   (trous : 0 − (−1/5))   ← ∫₁^∞ x^(−6) dx = [−x^(−5)/5]₁^∞
    = □   (trous : 1/5)
  — c  [juge prob]  départ : c
    = 1/(□)   (trous : 1/(1/5))   ← c·I = 1
    = □   (trous : 5)
  — Pr(X>3)  [juge prob]  départ : Pr(X > 3)
    = 3^(□)   (trous : 3^(−5))
    = □   (trous : 1/243)
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(1/5) = □ | c = 5, puis Pr(X>3) = 1/243
  pièges : p_density_is_prob, p_normalize_bounds

X a pour densité c·e^(−x) pour x ≥ 0, et 0 ailleurs. Trouve c, puis Pr(X≤1).
  [guided]  I
    (I = ∫ e^(-x) dx sur le support [0 ; ∞[.)
    (Sur quel intervalle intègre-t-on ? Sur le support [0 ; ∞[.)
    = 0 − (□)   (trous : 0 − (−1))   ← ∫₀^∞ e^(−x) dx = [−e^(−x)]₀^∞
    = □   (trous : 1)
  — c  [juge prob]  départ : c
    = □   (trous : 1)   ← c·1 = 1
  — Pr(X≤1)  [juge stat]  départ : Pr(X ≤ 1)
    = 1 − e^(□)   (trous : 1 − e^(−1))
    = □   (trous : 0,632)
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/1 = □ | c = 1, puis Pr(X≤1) = 0,632
  pièges : p_normalize_bounds

X a pour densité c·x^−6 pour x ≥ 1, et 0 ailleurs. Trouve c, puis Pr(X>3).
  [guided]  I
    (I = ∫ x^−6 dx sur le support [1 ; ∞[.)
    (Sur quel intervalle intègre-t-on ? Sur le support [1 ; ∞[.)
    = 0 − (−□)   (trous : 0 − (−1/5))   ← ∫₁^∞ x^(−6) dx = [−x^(−5)/5]₁^∞
    = □   (trous : 1/5)
  — c  [juge prob]  départ : c
    = 1/(□)   (trous : 1/(1/5))   ← c·I = 1
    = □   (trous : 5)
  — Pr(X>3)  [juge prob]  départ : Pr(X > 3)
    = 3^(□)   (trous : 3^(−5))
    = □   (trous : 1/243)
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(1/5) = □ | c = 5, puis Pr(X>3) = 1/243
  pièges : p_density_is_prob, p_normalize_bounds

```

### Niveau 2

```
X a pour densité c·e^(−(1/2)x) pour x ≥ 0, et 0 ailleurs. Trouve c, puis Pr(X≤2).
  [guided]  I
    (I = ∫ e^(-(1/2)x) dx sur le support [0 ; ∞[.)
    ? Sur quel intervalle intègre-t-on ? ✔ Sur le support [0 ; ∞[ / · Sur [0 ; 1]
    = 0 − (−□)   (trous : 0 − (−1/(1/2)))   ← ∫₀^∞ e^(−0,5x) dx = [−e^(−0,5x)/0,5]₀^∞
    = □   (trous : 2)
  — c  [juge prob]  départ : c
    = 1/□   (trous : 1/2)   ← c·I = 1
  — Pr(X≤2)  [juge stat]  départ : Pr(X ≤ 2)
    = 1 − e^(□)   (trous : 1 − e^(−1))
    = □   (trous : 0,632)
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/2 = □ | c = 0,5, puis Pr(X≤2) = 0,632
  pièges : p_normalize_bounds

X a pour densité c·x pour 0 ≤ x ≤ 2, et 0 ailleurs. Trouve c, puis Pr(X≤1).
  [guided]  I
    (I = ∫ x dx sur le support [0 ; 2].)
    ? Sur quel intervalle intègre-t-on ? ✔ Sur le support [0 ; 2] / · Sur [0 ; 1]
    = □²/2   (trous : 2²/2)   ← ∫₀^2 x^1 dx = [x^2/2]₀^2
    = □   (trous : 2)
  — c  [juge prob]  départ : c
    = 1/□   (trous : 1/2)   ← c·I = 1
  — Pr(X≤1)  [juge prob]  départ : Pr(X ≤ 1)
    = (1/□)²   (trous : (1/2)²)
    = □   (trous : 1/4)
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/2 = □ | c = 0,5, puis Pr(X≤1) = 0,25
  pièges : p_normalize_bounds, p_density_is_prob

X a pour densité c·x^−6 pour x ≥ 1, et 0 ailleurs. Trouve c, puis Pr(X>3).
  [guided]  I
    (I = ∫ x^−6 dx sur le support [1 ; ∞[.)
    ? Sur quel intervalle intègre-t-on ? ✔ Sur le support [1 ; ∞[ / · Sur [0 ; ∞[
    = 0 − (−□)   (trous : 0 − (−1/5))   ← ∫₁^∞ x^(−6) dx = [−x^(−5)/5]₁^∞
    = □   (trous : 1/5)
  — c  [juge prob]  départ : c
    = 1/(□)   (trous : 1/(1/5))   ← c·I = 1
    = □   (trous : 5)
  — Pr(X>3)  [juge prob]  départ : Pr(X > 3)
    = 3^(□)   (trous : 3^(−5))
    = □   (trous : 1/243)
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(1/5) = □ | c = 5, puis Pr(X>3) = 1/243
  pièges : p_density_is_prob, p_normalize_bounds

```

### Niveau 3

```
X a pour densité c·x³ pour 0 ≤ x ≤ 1, et 0 ailleurs. Trouve c, puis Pr(X≤1/2).
  [tap, suivre l'erreur, menu menu]  I
    (I = ∫ x^3 dx sur le support [0 ; 1].)
    = 1⁴/4   ← ∫₀^1 x^3 dx = [x^4/4]₀^1
    = 1/4
  — c  [juge prob]  départ : c
    = 1/(1/4)   ← c·I = 1
    = 4
  — Pr(X≤1/2)  [juge prob]  départ : Pr(X ≤ 1/2)
    = (1/2)⁴
    = 1/16
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(1/4) = □ | c = 4, puis Pr(X≤1/2) = 0,0625
  pièges : p_density_is_prob, p_normalize_bounds

X a pour densité c·x(2 − x) pour 0 ≤ x ≤ 2, et 0 ailleurs. Trouve c, puis Pr(X≤1).
  [tap, suivre l'erreur, menu menu]  I
    (I = ∫ x(2-x) dx sur le support [0 ; 2].)
    = 8/2 − 8/3   ← ∫₀^2 (2x − x²) dx = [2x²/2 − x³/3]₀^2
    = 4/3
  — c  [juge prob]  départ : c
    = 1/(4/3)   ← c·I = 1
    = 3/4
  — Pr(X≤1)  [juge prob]  départ : Pr(X ≤ 1)
    = 3/4·(2/2 − 1/3)
    = 1/2
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(4/3) = □ | c = 0,75, puis Pr(X≤1) = 0,5
  pièges : p_normalize_bounds, p_density_is_prob

X a pour densité c·x^−5 pour x ≥ 1, et 0 ailleurs. Trouve c, puis Pr(X>3).
  [tap, suivre l'erreur, menu menu]  I
    (I = ∫ x^−5 dx sur le support [1 ; ∞[.)
    = 0 − (−1/4)   ← ∫₁^∞ x^(−5) dx = [−x^(−4)/4]₁^∞
    = 1/4
  — c  [juge prob]  départ : c
    = 1/(1/4)   ← c·I = 1
    = 4
  — Pr(X>3)  [juge prob]  départ : Pr(X > 3)
    = 3^(−4)
    = 1/81
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(1/4) = □ | c = 4, puis Pr(X>3) = 1/81
  pièges : p_density_is_prob, p_normalize_bounds

```

### Niveau 4

```
X a pour densité c·x^−4 pour x ≥ 1, et 0 ailleurs. Trouve c, puis F(x) sur le support, puis Pr(X>2).
  [free, suivre l'erreur]  I
    (I = ∫ x^−4 dx sur le support [1 ; ∞[.)
    = 0 − (−1/3)   ← ∫₁^∞ x^(−4) dx = [−x^(−3)/3]₁^∞
    = 1/3
  — c  [juge prob]  départ : c
    = 1/(1/3)   ← c·I = 1
    = 3
  — F(x) sur le support (x ≥ 1)  [juge prob]  départ : F(x)
    ? Et hors du support ? ✔ F(x) = 0 si x < 1 / · La même formule pour tout x
    = 1 − x^(−3)
  — Pr(X>2)  [juge prob]  départ : Pr(X > 2)
    = 2^(−3)
    = 1/8
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(1/3) = □ | c = 3, puis Pr(X>2) = 0,125
  pièges : p_density_is_prob, p_normalize_bounds, p_cdf_piecewise

X a pour densité c·e^(−3x) pour x ≥ 0, et 0 ailleurs. Trouve c, puis Pr(X≤1).
  [free, suivre l'erreur]  I
    (I = ∫ e^(-3x) dx sur le support [0 ; ∞[.)
    = 0 − (−1/3)   ← ∫₀^∞ e^(−3x) dx = [−e^(−3x)/3]₀^∞
    = 1/3
  — c  [juge prob]  départ : c
    = 1/(1/3)   ← c·I = 1
    = 3
  — Pr(X≤1)  [juge stat]  départ : Pr(X ≤ 1)
    = 1 − e^(−3)
    = 0,95
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(1/3) = □ | c = 3, puis Pr(X≤1) = 0,95
  pièges : p_normalize_bounds

X a pour densité c·e^(−2x) pour x ≥ 0, et 0 ailleurs. Trouve c, puis Pr(X≤1).
  [free, suivre l'erreur]  I
    (I = ∫ e^(-2x) dx sur le support [0 ; ∞[.)
    = 0 − (−1/2)   ← ∫₀^∞ e^(−2x) dx = [−e^(−2x)/2]₀^∞
    = 1/2
  — c  [juge prob]  départ : c
    = 1/(1/2)   ← c·I = 1
    = 2
  — Pr(X≤1)  [juge stat]  départ : Pr(X ≤ 1)
    = 1 − e^(−2)
    = 0,865
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(1/2) = □ | c = 2, puis Pr(X≤1) = 0,865
  pièges : p_normalize_bounds

```

### Niveau 5

```
X a pour densité c·x^−5 pour x ≥ 1, et 0 ailleurs. Trouve c, puis F(x) sur le support, puis Pr(X>2) et Pr(X > 2 | X < 3).
  [free, sans aide]  I
    (I = ∫ x^−5 dx sur le support [1 ; ∞[.)
    = 0 − (−1/4)   ← ∫₁^∞ x^(−5) dx = [−x^(−4)/4]₁^∞
    = 1/4
  — c  [juge prob]  départ : c
    = 1/(1/4)   ← c·I = 1
    = 4
  — F(x) sur le support (x ≥ 1)  [juge prob]  départ : F(x)
    ? Et hors du support ? ✔ F(x) = 0 si x < 1 / · La même formule pour tout x
    = 1 − x^(−4)
  — Pr(X>2)  [juge prob]  départ : Pr(X > 2)
    = 2^(−4)
    = 1/16
  — Pr(X>2|X<3)  [juge prob]  départ : Pr(X>2|X<3)
    = (2^(−4) − 3^(−4))/(1 − 3^(−4))   ← (F(3) − F(2))/F(3)
    = 13/256
  pièges : p_density_is_prob, p_cond_denominator, p_normalize_bounds, p_cdf_piecewise

X a pour densité c·x^−5 pour x ≥ 1, et 0 ailleurs. Trouve c, puis F(x) sur le support, puis Pr(X>2) et Pr(X > 2 | X < 3).
  [free, sans aide]  I
    (I = ∫ x^−5 dx sur le support [1 ; ∞[.)
    = 0 − (−1/4)   ← ∫₁^∞ x^(−5) dx = [−x^(−4)/4]₁^∞
    = 1/4
  — c  [juge prob]  départ : c
    = 1/(1/4)   ← c·I = 1
    = 4
  — F(x) sur le support (x ≥ 1)  [juge prob]  départ : F(x)
    ? Et hors du support ? ✔ F(x) = 0 si x < 1 / · La même formule pour tout x
    = 1 − x^(−4)
  — Pr(X>2)  [juge prob]  départ : Pr(X > 2)
    = 2^(−4)
    = 1/16
  — Pr(X>2|X<3)  [juge prob]  départ : Pr(X>2|X<3)
    = (2^(−4) − 3^(−4))/(1 − 3^(−4))   ← (F(3) − F(2))/F(3)
    = 13/256
  pièges : p_density_is_prob, p_cond_denominator, p_normalize_bounds, p_cdf_piecewise

X a pour densité c·x^−6 pour x ≥ 1, et 0 ailleurs. Trouve c, puis F(x) sur le support, puis Pr(X>3) et Pr(X > 2 | X < 3).
  [free, sans aide]  I
    (I = ∫ x^−6 dx sur le support [1 ; ∞[.)
    = 0 − (−1/5)   ← ∫₁^∞ x^(−6) dx = [−x^(−5)/5]₁^∞
    = 1/5
  — c  [juge prob]  départ : c
    = 1/(1/5)   ← c·I = 1
    = 5
  — F(x) sur le support (x ≥ 1)  [juge prob]  départ : F(x)
    ? Et hors du support ? ✔ F(x) = 0 si x < 1 / · La même formule pour tout x
    = 1 − x^(−5)
  — Pr(X>3)  [juge prob]  départ : Pr(X > 3)
    = 3^(−5)
    = 1/243
  — Pr(X>2|X<3)  [juge prob]  départ : Pr(X>2|X<3)
    = (2^(−5) − 3^(−5))/(1 − 3^(−5))   ← (F(3) − F(2))/F(3)
    = 211/7744
  pièges : p_density_is_prob, p_cond_denominator, p_normalize_bounds, p_cdf_piecewise

```

### Variantes d'examen

```
X a pour densité c·x³ pour 0 ≤ x ≤ 2, et 0 ailleurs. Que vaut c ?
  ✔ 0,25   · 0,5   · 4 [p_normalize_bounds]   · 2
  [examen mcq]
  pièges : p_normalize_bounds

Vrai ou faux ?
  « Pour une variable continue X et tout nombre a, Pr(X ≤ a) = Pr(X < a). » → VRAI
  [examen tf]

X a pour densité c·x(2 − x) pour 0 ≤ x ≤ 2, et 0 ailleurs. Que vaut c ?
  [free, sans aide, examen coef]  c
    = 3/4
  pièges : p_normalize_bounds

```

## Quantile d'une loi continue (`p-cont-quantile`, BA3)

_Le quantile d'ordre α d'une loi continue : on résout F(q) = α._

### Niveau 1

```
X a pour densité f(x) = 3x² pour 0 ≤ x ≤ 1 (et 0 ailleurs), donc F(x) = x³ sur ce support. Calcule q, la médiane de X (au millième).
  [guided]  q
    (On résout F(q) = 1/2 : q^3 = 1/2.)
    (Sur quelle fonction résout-on ? F(q) = 1/2.)
    = (□)^(1/3)   (trous : (1/2)^(1/3))
    = □   (trous : 0,794)
  aides : Un quantile se lit sur F : on résout F(q) = α. | q^3 = 1/2, donc q = □ | q = (1/2)^(1/3) ≈ 0,794
  pièges : p_quantile_from_pdf, p_quantile_inverse, p_median_mean

X a pour densité f(x) = 2x¹ pour 0 ≤ x ≤ 1 (et 0 ailleurs), donc F(x) = x² sur ce support. Calcule q, la médiane de X (au millième).
  [guided]  q
    (On résout F(q) = 1/2 : q^2 = 1/2.)
    (Sur quelle fonction résout-on ? F(q) = 1/2.)
    = (□)^(1/2)   (trous : (1/2)^(1/2))
    = □   (trous : 0,707)
  aides : Un quantile se lit sur F : on résout F(q) = α. | q^2 = 1/2, donc q = □ | q = (1/2)^(1/2) ≈ 0,707
  pièges : p_quantile_from_pdf, p_quantile_inverse, p_median_mean

X a pour densité f(x) = 2x/9 pour 0 ≤ x ≤ 3 (et 0 ailleurs), donc F(x) = x²/9 sur ce support. Calcule q, le quartile supérieur de X (au millième).
  [guided]  q
    (On résout F(q) = 3/4 : q²/9 = 3/4.)
    (Sur quelle fonction résout-on ? F(q) = 3/4.)
    = 3√(□)   (trous : 3√(3/4))
    = □   (trous : 2,598)
  aides : Un quantile se lit sur F : on résout F(q) = α. | q²/9 = 3/4, donc q = □ | q = 3√(3/4) ≈ 2,598
  pièges : p_quantile_inverse, p_quantile_from_pdf

```

### Niveau 2

```
X a pour densité f(x) = 4x³ pour 0 ≤ x ≤ 1 (et 0 ailleurs). Calcule q, le quantile d'ordre 0,9 de X (au millième).
  [guided]  F(x)
    = □   (trous : x⁴)
  — q  [juge stat]  départ : q
    (On résout F(q) = 0,9 : q^4 = 0,9.)
    ? Sur quelle fonction résout-on ? ✔ F(q) = 0,9 / · f(q) = 0,9 / · q = F(0,9)
    = (□)^(1/4)   (trous : (0,9)^(1/4))
    = □   (trous : 0,974)
  aides : Un quantile se lit sur F : on résout F(q) = α. | q^4 = 0,9, donc q = □ | q = (0,9)^(1/4) ≈ 0,974
  pièges : p_quantile_from_pdf, p_quantile_inverse

X a pour densité f(x) = 1/10 pour 4 ≤ x ≤ 14 (et 0 ailleurs). Calcule q, la médiane de X (au millième).
  [guided]  F(x)
    = □   (trous : (x − 4)/10)
  — q  [juge stat]  départ : q
    (On résout F(q) = 1/2 : (q − 4)/10 = 1/2.)
    ? Sur quelle fonction résout-on ? ✔ F(q) = 1/2 / · f(q) = 1/2 / · q = F(1/2)
    = 4 + □·10   (trous : 4 + 1/2·10)
    = □   (trous : 9)
  aides : Un quantile se lit sur F : on résout F(q) = α. | (q − 4)/10 = 1/2, donc q = □ | q = 4+1/2×10 ≈ 9
  pièges : p_quantile_from_pdf, p_quantile_inverse

X a pour densité f(x) = 1/6 pour 3 ≤ x ≤ 9 (et 0 ailleurs). Calcule q, le quantile d'ordre 0,9 de X (au millième).
  [guided]  F(x)
    = □   (trous : (x − 3)/6)
  — q  [juge stat]  départ : q
    (On résout F(q) = 0,9 : (q − 3)/6 = 0,9.)
    ? Sur quelle fonction résout-on ? ✔ F(q) = 0,9 / · f(q) = 0,9 / · q = F(0,9)
    = 3 + □·6   (trous : 3 + 0,9·6)
    = □   (trous : 8,4)
  aides : Un quantile se lit sur F : on résout F(q) = α. | (q − 3)/6 = 0,9, donc q = □ | q = 3+0,9×6 ≈ 8,4
  pièges : p_quantile_from_pdf, p_quantile_inverse

```

### Niveau 3

```
X a pour densité f(x) = x/2 pour 0 ≤ x ≤ 2 (et 0 ailleurs). Calcule q, le quartile supérieur de X (au millième).
  [tap, suivre l'erreur, menu menu]  F(x)
    = x²/4
  — q  [juge stat]  départ : q
    (On résout F(q) = 3/4 : q²/4 = 3/4.)
    = 2√(3/4)
    = 1,732
  aides : Un quantile se lit sur F : on résout F(q) = α. | q²/4 = 3/4, donc q = □ | q = 2√(3/4) ≈ 1,732
  pièges : p_quantile_from_pdf, p_quantile_inverse

X a pour densité f(x) = 4x^−5 pour x ≥ 1 (et 0 ailleurs). Calcule q, le quartile supérieur de X (au millième).
  [tap, suivre l'erreur, menu menu]  F(x)
    = 1 − x^(−4)
  — q  [juge stat]  départ : q
    (On résout F(q) = 3/4 : 1 − q^−4 = 3/4.)
    = (1 − 3/4)^(−1/4)
    = 1,414
  aides : Un quantile se lit sur F : on résout F(q) = α. | 1 − q^−4 = 3/4, donc q = □ | q = (1-3/4)^(-1/4) ≈ 1,414
  pièges : p_quantile_from_pdf, p_quantile_inverse

X a pour densité f(x) = 2x¹ pour 0 ≤ x ≤ 1 (et 0 ailleurs). Calcule q, le quantile d'ordre 0,95 de X (au millième).
  [tap, suivre l'erreur, menu menu]  F(x)
    = x²
  — q  [juge stat]  départ : q
    (On résout F(q) = 0,95 : q^2 = 0,95.)
    = (0,95)^(1/2)
    = 0,975
  aides : Un quantile se lit sur F : on résout F(q) = α. | q^2 = 0,95, donc q = □ | q = (0,95)^(1/2) ≈ 0,975
  pièges : p_quantile_from_pdf, p_quantile_inverse

```

### Niveau 4

```
X a pour densité f(x) = 1/4 pour 4 ≤ x ≤ 8 (et 0 ailleurs). Calcule q, la médiane de X (au millième).
  [free, suivre l'erreur]  F(x)
    = (x − 4)/4
  — q  [juge stat]  départ : q
    (On résout F(q) = 1/2 : (q − 4)/4 = 1/2.)
    = 4 + 1/2·4
    = 6
  aides : Un quantile se lit sur F : on résout F(q) = α. | (q − 4)/4 = 1/2, donc q = □ | q = 4+1/2×4 ≈ 6
  pièges : p_quantile_from_pdf, p_quantile_inverse

X a pour densité f(x) = 4x^−5 pour x ≥ 1 (et 0 ailleurs). Calcule q, le quantile d'ordre 0,9 de X (au millième).
  [free, suivre l'erreur]  F(x)
    = 1 − x^(−4)
  — q  [juge stat]  départ : q
    (On résout F(q) = 0,9 : 1 − q^−4 = 0,9.)
    = (1 − 0,9)^(−1/4)
    = 1,778
  aides : Un quantile se lit sur F : on résout F(q) = α. | 1 − q^−4 = 0,9, donc q = □ | q = (1-0,9)^(-1/4) ≈ 1,778
  pièges : p_quantile_from_pdf, p_quantile_inverse

X a pour densité f(x) = 1/10 pour 1 ≤ x ≤ 11 (et 0 ailleurs). Calcule q, le quartile supérieur de X (au millième).
  [free, suivre l'erreur]  F(x)
    = (x − 1)/10
  — q  [juge stat]  départ : q
    (On résout F(q) = 3/4 : (q − 1)/10 = 3/4.)
    = 1 + 3/4·10
    = 8,5
  aides : Un quantile se lit sur F : on résout F(q) = α. | (q − 1)/10 = 3/4, donc q = □ | q = 1+3/4×10 ≈ 8,5
  pièges : p_quantile_from_pdf, p_quantile_inverse

```

### Niveau 5

```
X a pour densité f(x) = e^(−x) pour x ≥ 0 (et 0 ailleurs). Calcule q, le premier quartile de X (au millième).
  [free, sans aide]  F(x)
    = 1 − e^(−x)
  — q  [juge stat]  départ : q
    (On résout F(q) = 1/4 : 1 − e^(−q) = 1/4.)
    = −ln(1 − 1/4)
    = 0,288
  pièges : p_quantile_from_pdf, p_quantile_inverse

X a pour densité f(x) = c·x pour 0 ≤ x ≤ 2 (et 0 ailleurs). Trouve c, puis la médiane de X (au millième).
  [free, sans aide]  c
    = 2/4
    = 1/2
  — F(x)  [juge prob]  départ : F(x)
    = x²/4
  — méd  [juge stat]  départ : méd
    = 2/√2
    = 1,414
  pièges : p_quantile_from_pdf, p_median_mean, p_quantile_inverse

X a pour densité f(x) = c·x pour 0 ≤ x ≤ 2 (et 0 ailleurs). Trouve c, puis la médiane de X (au millième).
  [free, sans aide]  c
    = 2/4
    = 1/2
  — F(x)  [juge prob]  départ : F(x)
    = x²/4
  — méd  [juge stat]  départ : méd
    = 2/√2
    = 1,414
  pièges : p_quantile_from_pdf, p_median_mean, p_quantile_inverse

```

### Variantes d'examen

```
X a pour densité f(x) = c·x pour 0 ≤ x ≤ 4 (et 0 ailleurs). Quelle est la médiane de X ?
  · 8/3 [p_median_mean]   · 4 [p_quantile_from_pdf]   · 1/64 [p_quantile_inverse]   ✔ 2√2
  [examen mcq]
  pièges : p_quantile_from_pdf, p_median_mean, p_quantile_inverse

Vrai ou faux ?
  « La médiane d'une loi continue est toujours égale à son espérance. » → FAUX
    contre-exemple (refute) : m = 1/√2, w = 2/3
  [examen tf]
  pièges : p_median_mean

X a pour densité f(x) = x/2 pour 0 ≤ x ≤ 2 (et 0 ailleurs). Calcule le quartile supérieur (au millième).
  [free, sans aide, examen coef]  q
    = 1,732
  pièges : p_quantile_from_pdf, p_quantile_inverse

```

## Uniforme et exponentielle, absence de mémoire (`p-unif-exp`, BA3)

_Lois uniforme et exponentielle (taux λ = 1/moyenne), et l'absence de mémoire de l'exponentielle._

### Niveau 1

```
Le temps d'attente X chez le coiffeur (en minutes) suit une loi uniforme U(0 ; 40). Calcule la densité, puis Pr(X > 30).
  [guided]  f(x)
    = 1/(□)   (trous : 1/(40 − 0))
    = 1/40
  — Pr(X>30)  [juge prob]  départ : Pr(X > 30)
    = (□)/40   (trous : (40 − 30)/40)
    = 1/4
  aides : U(a, b) : f = 1/(b − a) sur [a ; b] ; une probabilité est une longueur fois f. | Pr(X > 30) = (40 − □)/40 | Pr(X > 30) = 0,25

La durée de vie X d'une télévision suit une loi exponentielle de moyenne 2 ans. Elle fonctionne déjà depuis 2 ans. Quelle est la probabilité qu'elle dure encore au moins 2 ans (au millième) ?
  [guided]  λ
    (Le paramètre λ de l'exponentielle ? λ = 1/2 : c'est un taux, l'inverse de la moyenne.)
    = 1/□   (trous : 1/2)
  — Pr(X>4)  [juge stat]  départ : Pr(X > 4)
    = e^(−□/2)   (trous : e^(−4/2))
    = 0,135
  — Pr(X>2)  [juge stat]  départ : Pr(X > 2)
    = e^(−□/2)   (trous : e^(−2/2))
    = 0,368
  — Pr(X>4|X>2)  [juge stat]  départ : Pr(X>4|X>2)
    (Absence de mémoire : le résultat est Pr(X > t).)
    = e^(−4/2)/□   (trous : e^(−4/2)/e^(−2/2))
    = e^(−2/2)
    = 0,368
  aides : Pr(X > s + t | X > s) = Pr(X > s + t)/Pr(X > s) ; pour l'exponentielle, Pr(X > x) = e^(−λx). | e^(−4/2)/e^(−□/2) | e^(−2/2) ≈ 0,368
  pièges : p_exp_rate_mean, p_memoryless_ignored

La durée de vie X d'une télévision suit une loi exponentielle de moyenne 10 ans. Elle fonctionne déjà depuis 10 ans. Quelle est la probabilité qu'elle dure encore au moins 20 ans (au millième) ?
  [guided]  λ
    (Le paramètre λ de l'exponentielle ? λ = 1/10 : c'est un taux, l'inverse de la moyenne.)
    = 1/□   (trous : 1/10)
  — Pr(X>30)  [juge stat]  départ : Pr(X > 30)
    = e^(−□/10)   (trous : e^(−30/10))
    = 0,05
  — Pr(X>10)  [juge stat]  départ : Pr(X > 10)
    = e^(−□/10)   (trous : e^(−10/10))
    = 0,368
  — Pr(X>30|X>10)  [juge stat]  départ : Pr(X>30|X>10)
    (Absence de mémoire : le résultat est Pr(X > t).)
    = e^(−30/10)/□   (trous : e^(−30/10)/e^(−10/10))
    = e^(−20/10)
    = 0,135
  aides : Pr(X > s + t | X > s) = Pr(X > s + t)/Pr(X > s) ; pour l'exponentielle, Pr(X > x) = e^(−λx). | e^(−30/10)/e^(−□/10) | e^(−20/10) ≈ 0,135
  pièges : p_exp_rate_mean, p_memoryless_ignored

```

### Niveau 2

```
La durée de vie X d'une télévision suit une loi exponentielle de moyenne 5 ans. Elle fonctionne déjà depuis 1 an. Quelle est la probabilité qu'elle dure encore au moins 10 ans (au millième) ?
  [guided]  λ
    ? Le paramètre λ de l'exponentielle ? ✔ λ = 1/5 : c'est un taux, l'inverse de la moyenne / · λ = 5, la moyenne
    = 1/□   (trous : 1/5)
  — Pr(X>11)  [juge stat]  départ : Pr(X > 11)
    = e^(−□/5)   (trous : e^(−11/5))
    = 0,111
  — Pr(X>1)  [juge stat]  départ : Pr(X > 1)
    = e^(−□/5)   (trous : e^(−1/5))
    = 0,819
  — Pr(X>11|X>1)  [juge stat]  départ : Pr(X>11|X>1)
    (Absence de mémoire : le résultat est Pr(X > t).)
    = e^(−11/5)/□   (trous : e^(−11/5)/e^(−1/5))
    = e^(−10/5)
    = 0,135
  aides : Pr(X > s + t | X > s) = Pr(X > s + t)/Pr(X > s) ; pour l'exponentielle, Pr(X > x) = e^(−λx). | e^(−11/5)/e^(−□/5) | e^(−10/5) ≈ 0,135
  pièges : p_exp_rate_mean, p_memoryless_ignored

La durée de vie X d'une télévision suit une loi exponentielle de moyenne 20 ans. Calcule Pr(X > 20) (au millième).
  [guided]  λ
    ? Le paramètre λ de l'exponentielle ? ✔ λ = 1/20 : c'est un taux, l'inverse de la moyenne / · λ = 20, la moyenne
    = 1/□   (trous : 1/20)
  — Pr(X>20)  [juge stat]  départ : Pr(X > 20)
    = e^(−□/20)   (trous : e^(−20/20))
    = 0,368
  aides : Pr(X > x) = e^(−λx), et λ = 1/moyenne. | e^(−20/□) | 0,368
  pièges : p_exp_rate_mean, p_upper_tail

La durée de vie X d'une télévision suit une loi exponentielle de moyenne 10 ans. Elle fonctionne déjà depuis 2 ans. Quelle est la probabilité qu'elle dure encore au moins 5 ans (au millième) ?
  [guided]  λ
    ? Le paramètre λ de l'exponentielle ? ✔ λ = 1/10 : c'est un taux, l'inverse de la moyenne / · λ = 10, la moyenne
    = 1/□   (trous : 1/10)
  — Pr(X>7)  [juge stat]  départ : Pr(X > 7)
    = e^(−□/10)   (trous : e^(−7/10))
    = 0,497
  — Pr(X>2)  [juge stat]  départ : Pr(X > 2)
    = e^(−□/10)   (trous : e^(−2/10))
    = 0,819
  — Pr(X>7|X>2)  [juge stat]  départ : Pr(X>7|X>2)
    (Absence de mémoire : le résultat est Pr(X > t).)
    = e^(−7/10)/□   (trous : e^(−7/10)/e^(−2/10))
    = e^(−5/10)
    = 0,607
  aides : Pr(X > s + t | X > s) = Pr(X > s + t)/Pr(X > s) ; pour l'exponentielle, Pr(X > x) = e^(−λx). | e^(−7/10)/e^(−□/10) | e^(−5/10) ≈ 0,607
  pièges : p_exp_rate_mean, p_memoryless_ignored

```

### Niveau 3

```
La durée de vie X d'un composant suit une loi exponentielle de moyenne 20 ans. Calcule sa médiane (au millième).
  [tap, suivre l'erreur, menu menu]  λ
    = 1/20
  — méd  [juge stat]  départ : méd
    = ln(2)·20
    = 13,863
  aides : La médiane vérifie F(q) = 1/2, donc e^(−λq) = 1/2. | q = ln(2)/λ = ln(2)·□ | q = 13,863
  pièges : p_exp_rate_mean, p_median_mean

Les appels arrivent selon un processus de Poisson, en moyenne un appel toutes les 2 minutes. Le temps T avant le premier appel suit une loi exponentielle. Calcule Pr(T > 2) (au millième).
  [tap, suivre l'erreur, menu menu]  λ
    = 1/2
  — Pr(T>2)  [juge stat]  départ : Pr(T > 2)
    = e^(−2/2)
    = 0,368
  aides : Pr(X > x) = e^(−λx), et λ = 1/moyenne. | e^(−2/□) | 0,368
  pièges : p_exp_rate_mean, p_upper_tail

Les appels arrivent selon un processus de Poisson, en moyenne un appel toutes les 2 minutes. Le temps T avant le premier appel suit une loi exponentielle. Calcule Pr(T > 4) (au millième).
  [tap, suivre l'erreur, menu menu]  λ
    = 1/2
  — Pr(T>4)  [juge stat]  départ : Pr(T > 4)
    = e^(−4/2)
    = 0,135
  aides : Pr(X > x) = e^(−λx), et λ = 1/moyenne. | e^(−4/□) | 0,135
  pièges : p_exp_rate_mean, p_upper_tail

```

### Niveau 4

```
Les appels arrivent selon un processus de Poisson, en moyenne un appel toutes les 5 minutes. Le temps T avant le premier appel suit une loi exponentielle. Calcule Pr(T > 2,5) (au millième).
  [free, suivre l'erreur]  λ
    = 1/5
  — Pr(T>2,5)  [juge stat]  départ : Pr(T > 2,5)
    = e^(−2,5/5)
    = 0,607
  aides : Pr(X > x) = e^(−λx), et λ = 1/moyenne. | e^(−2,5/□) | 0,607
  pièges : p_exp_rate_mean, p_upper_tail

La durée de vie X d'un composant suit une loi exponentielle de moyenne 5 ans. Calcule sa médiane (au millième).
  [free, suivre l'erreur]  λ
    = 1/5
  — méd  [juge stat]  départ : méd
    = ln(2)·5
    = 3,466
  aides : La médiane vérifie F(q) = 1/2, donc e^(−λq) = 1/2. | q = ln(2)/λ = ln(2)·□ | q = 3,466
  pièges : p_exp_rate_mean, p_median_mean

La durée de vie X d'un composant suit une loi exponentielle de moyenne 20 ans. Calcule sa médiane (au millième).
  [free, suivre l'erreur]  λ
    = 1/20
  — méd  [juge stat]  départ : méd
    = ln(2)·20
    = 13,863
  aides : La médiane vérifie F(q) = 1/2, donc e^(−λq) = 1/2. | q = ln(2)/λ = ln(2)·□ | q = 13,863
  pièges : p_exp_rate_mean, p_median_mean

```

### Niveau 5

```
La durée de vie X d'une télévision suit une loi exponentielle de moyenne 10 ans. Elle fonctionne déjà depuis 5 ans. Quelle est la probabilité qu'elle dure encore au moins 10 ans (au millième) ?
  [free, sans aide]  λ
    = 1/10
  — Pr(X>15)  [juge stat]  départ : Pr(X > 15)
    = e^(−15/10)
    = 0,223
  — Pr(X>5)  [juge stat]  départ : Pr(X > 5)
    = e^(−5/10)
    = 0,607
  — Pr(X>15|X>5)  [juge stat]  départ : Pr(X>15|X>5)
    (Absence de mémoire : le résultat est Pr(X > t).)
    = e^(−15/10)/e^(−5/10)
    = e^(−10/10)
    = 0,368
  pièges : p_exp_rate_mean, p_memoryless_ignored

La durée de vie X d'une télévision suit une loi exponentielle de moyenne 5 ans. Elle fonctionne déjà depuis 2,5 ans. Quelle est la probabilité qu'elle dure encore au moins 2,5 ans (au millième) ?
  [free, sans aide]  λ
    = 1/5
  — Pr(X>5)  [juge stat]  départ : Pr(X > 5)
    = e^(−5/5)
    = 0,368
  — Pr(X>2,5)  [juge stat]  départ : Pr(X > 2,5)
    = e^(−2,5/5)
    = 0,607
  — Pr(X>5|X>2,5)  [juge stat]  départ : Pr(X>5|X>2,5)
    (Absence de mémoire : le résultat est Pr(X > t).)
    = e^(−5/5)/e^(−2,5/5)
    = e^(−2,5/5)
    = 0,607
  pièges : p_exp_rate_mean, p_memoryless_ignored

La durée de vie X d'une télévision suit une loi exponentielle de moyenne 10 ans. Elle fonctionne déjà depuis 5 ans. Quelle est la probabilité qu'elle dure encore au moins 10 ans (au millième) ?
  [free, sans aide]  λ
    = 1/10
  — Pr(X>15)  [juge stat]  départ : Pr(X > 15)
    = e^(−15/10)
    = 0,223
  — Pr(X>5)  [juge stat]  départ : Pr(X > 5)
    = e^(−5/10)
    = 0,607
  — Pr(X>15|X>5)  [juge stat]  départ : Pr(X>15|X>5)
    (Absence de mémoire : le résultat est Pr(X > t).)
    = e^(−15/10)/e^(−5/10)
    = e^(−10/10)
    = 0,368
  pièges : p_exp_rate_mean, p_memoryless_ignored

```

### Variantes d'examen

```
X ~ U(0 ; 12). Que vaut var(X) ?
  · 1 [p_unif_var]   ✔ 12   · 6   · 72 [p_unif_var]
  [examen mcq]
  pièges : p_unif_var

Vrai ou faux ?
  « Si X ~ exp(λ) avec λ = 1/5, alors E[X] = 5. » → VRAI
  [examen tf]

X suit une loi exponentielle de moyenne 20. Calcule Pr(X > 10) au millième.
  [free, sans aide, examen coef]  Pr(X > 10)
    = 0,607
  pièges : p_exp_rate_mean

```

## Espérance et variance d'une loi (`p-moments`, BA3)

_Espérance et variance d'une loi, E[g(X)] par une somme ou une intégrale, et var(X) = E[X²] − E[X]²._

### Niveau 1

```
X a pour densité f(y) = 4y³ sur ]0 ; 1[ (et 0 ailleurs). Calcule E[X], E[X²] et var(X).
  [guided]  E[X]
    = 4/□   (trous : 4/5)   ← ∫₀¹ 4y^4 dy
  — E[X²]  [juge prob]  départ : E[X²]
    = 4/□   (trous : 4/6)   ← ∫₀¹ 4y^5 dy
    = 2/3
  — var(X)  [juge prob]  départ : var(X)
    = 2/3 − (□)²   (trous : 2/3 − (4/5)²)
    = 2/75
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 2/3 − (□)² | var(X) = 2/75
  pièges : p_var_minus_mean, p_mean_not_exist, p_g_of_mean

X prend les valeurs −1, 1, 4 avec les probabilités 0,7, 0,2, 0,1. Calcule E[X], E[X²] et var(X).
  [guided]  E[X]
    = (−1)·0,7 + 1·0,2 + □   (trous : (−1)·0,7 + 1·0,2 + 4·0,1)
    = −0,1
  — E[X²]  [juge prob]  départ : E[X²]
    = (−1)²·0,7 + 1²·0,2 + □   (trous : (−1)²·0,7 + 1²·0,2 + 4²·0,1)
    = 2,5
  — var(X)  [juge prob]  départ : var(X)
    = 2,5 − (□)²   (trous : 2,5 − (−0,1)²)
    = 2,49
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 2,5 − (□)² | var(X) = 2,49
  pièges : p_var_minus_mean, p_g_of_mean

X a pour densité f(y) = 5y⁴ sur ]0 ; 1[ (et 0 ailleurs). Calcule E[X], E[X²] et var(X).
  [guided]  E[X]
    = 5/□   (trous : 5/6)   ← ∫₀¹ 5y^5 dy
  — E[X²]  [juge prob]  départ : E[X²]
    = 5/□   (trous : 5/7)   ← ∫₀¹ 5y^6 dy
  — var(X)  [juge prob]  départ : var(X)
    = 5/7 − (□)²   (trous : 5/7 − (5/6)²)
    = 5/252
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 5/7 − (□)² | var(X) = 5/252
  pièges : p_var_minus_mean, p_mean_not_exist, p_g_of_mean

```

### Niveau 2

```
X a pour densité f(y) = 4y³ sur ]0 ; 1[ (et 0 ailleurs). Calcule E[X], E[X²] et var(X).
  [guided]  E[X]
    ? E[X] existe-t-elle ? ✔ Oui : X est bornée, l’intégrale converge / · Pas besoin de vérifier : toute densité a une espérance
    = 4/□   (trous : 4/5)   ← ∫₀¹ 4y^4 dy
  — E[X²]  [juge prob]  départ : E[X²]
    = 4/□   (trous : 4/6)   ← ∫₀¹ 4y^5 dy
    = 2/3
  — var(X)  [juge prob]  départ : var(X)
    ? La variance ? ✔ var(X) = E[X²] − E[X]² / · var(X) = E[X²] − E[X]
    = 2/3 − (□)²   (trous : 2/3 − (4/5)²)
    = 2/75
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 2/3 − (□)² | var(X) = 2/75
  pièges : p_var_minus_mean, p_mean_not_exist, p_g_of_mean

X prend les valeurs 1, 2, 3, 4 avec les probabilités 0,6, 0,1, 0,1, 0,2. Calcule E[X], E[X²] et var(X).
  [guided]  E[X]
    = 1·0,6 + 2·0,1 + 3·0,1 + □   (trous : 1·0,6 + 2·0,1 + 3·0,1 + 4·0,2)
    = 1,9
  — E[X²]  [juge prob]  départ : E[X²]
    = 1²·0,6 + 2²·0,1 + 3²·0,1 + □   (trous : 1²·0,6 + 2²·0,1 + 3²·0,1 + 4²·0,2)
    = 5,1
  — var(X)  [juge prob]  départ : var(X)
    ? La variance ? ✔ var(X) = E[X²] − E[X]² / · var(X) = E[X²] − E[X]
    = 5,1 − (□)²   (trous : 5,1 − (1,9)²)
    = 1,49
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 5,1 − (□)² | var(X) = 1,49
  pièges : p_var_minus_mean, p_g_of_mean

X prend les valeurs −1, 0, 3, 4 avec les probabilités 0,4, 0,3, 0,1, 0,2. Calcule E[X], E[X²] et var(X).
  [guided]  E[X]
    = (−1)·0,4 + 0·0,3 + 3·0,1 + □   (trous : (−1)·0,4 + 0·0,3 + 3·0,1 + 4·0,2)
    = 0,7
  — E[X²]  [juge prob]  départ : E[X²]
    = (−1)²·0,4 + 0²·0,3 + 3²·0,1 + □   (trous : (−1)²·0,4 + 0²·0,3 + 3²·0,1 + 4²·0,2)
    = 4,5
  — var(X)  [juge prob]  départ : var(X)
    ? La variance ? ✔ var(X) = E[X²] − E[X]² / · var(X) = E[X²] − E[X]
    = 4,5 − (□)²   (trous : 4,5 − (0,7)²)
    = 4,01
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 4,5 − (□)² | var(X) = 4,01
  pièges : p_var_minus_mean, p_g_of_mean

```

### Niveau 3

```
X prend les valeurs 1, 2, 4 avec les probabilités 0,1, 0,8, 0,1. Calcule E[X], E[X²] et var(X).
  [tap, suivre l'erreur, menu menu]  E[X]
    = 1·0,1 + 2·0,8 + 4·0,1
    = 2,1
  — E[X²]  [juge prob]  départ : E[X²]
    = 1²·0,1 + 2²·0,8 + 4²·0,1
    = 4,9
  — var(X)  [juge prob]  départ : var(X)
    = 4,9 − (2,1)²
    = 0,49
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 4,9 − (□)² | var(X) = 0,49
  pièges : p_var_minus_mean, p_g_of_mean

X a pour densité f(y) = 6y⁵ sur ]0 ; 1[ (et 0 ailleurs). Calcule E[X], E[X²] et var(X).
  [tap, suivre l'erreur, menu menu]  E[X]
    ? E[X] existe-t-elle ? ✔ Oui : X est bornée, l’intégrale converge / · Pas besoin de vérifier : toute densité a une espérance
    = 6/7   ← ∫₀¹ 6y^6 dy
  — E[X²]  [juge prob]  départ : E[X²]
    = 6/8   ← ∫₀¹ 6y^7 dy
    = 3/4
  — var(X)  [juge prob]  départ : var(X)
    = 3/4 − (6/7)²
    = 3/196
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 0,75 − (□)² | var(X) = 3/196
  pièges : p_var_minus_mean, p_mean_not_exist, p_g_of_mean

X a pour densité f(x) = 5x^−6 pour x ≥ 1 (et 0 ailleurs). Calcule E[X], E[X²] et var(X).
  [tap, suivre l'erreur, menu menu]  E[X]
    ? E[X] existe-t-elle ? ✔ Oui : ∫₁^∞ x·5x^(−6) dx converge (5 > 1) / · Pas besoin de vérifier : toute densité a une espérance
    = 5/4   ← ∫₁^∞ 5x^(−5) dx
  — E[X²]  [juge prob]  départ : E[X²]
    = 5/3   ← ∫₁^∞ 5x^(−4) dx
  — var(X)  [juge prob]  départ : var(X)
    = 5/3 − (5/4)²
    = 5/48
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 5/3 − (□)² | var(X) = 5/48
  pièges : p_var_minus_mean, p_mean_not_exist, p_g_of_mean

```

### Niveau 4

```
X a pour densité f(x) = 3x^−4 pour x ≥ 1 (et 0 ailleurs). Calcule E[X], E[X²] et var(X).
  [free, suivre l'erreur]  E[X]
    ? E[X] existe-t-elle ? ✔ Oui : ∫₁^∞ x·3x^(−4) dx converge (3 > 1) / · Pas besoin de vérifier : toute densité a une espérance
    = 3/2   ← ∫₁^∞ 3x^(−3) dx
  — E[X²]  [juge prob]  départ : E[X²]
    = 3/1   ← ∫₁^∞ 3x^(−2) dx
    = 3
  — var(X)  [juge prob]  départ : var(X)
    = 3 − (3/2)²
    = 0,75
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 3 − (□)² | var(X) = 0,75
  pièges : p_var_minus_mean, p_mean_not_exist, p_g_of_mean

X a pour densité f(y) = 4y³ sur ]0 ; 1[ (et 0 ailleurs). Calcule E[X], E[X²] et var(X).
  [free, suivre l'erreur]  E[X]
    ? E[X] existe-t-elle ? ✔ Oui : X est bornée, l’intégrale converge / · Pas besoin de vérifier : toute densité a une espérance
    = 4/5   ← ∫₀¹ 4y^4 dy
  — E[X²]  [juge prob]  départ : E[X²]
    = 4/6   ← ∫₀¹ 4y^5 dy
    = 2/3
  — var(X)  [juge prob]  départ : var(X)
    = 2/3 − (4/5)²
    = 2/75
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 2/3 − (□)² | var(X) = 2/75
  pièges : p_var_minus_mean, p_mean_not_exist, p_g_of_mean

X a pour densité f(y) = 5y⁴ sur ]0 ; 1[ (et 0 ailleurs). Calcule E[X], E[X²] et var(X).
  [free, suivre l'erreur]  E[X]
    ? E[X] existe-t-elle ? ✔ Oui : X est bornée, l’intégrale converge / · Pas besoin de vérifier : toute densité a une espérance
    = 5/6   ← ∫₀¹ 5y^5 dy
  — E[X²]  [juge prob]  départ : E[X²]
    = 5/7   ← ∫₀¹ 5y^6 dy
  — var(X)  [juge prob]  départ : var(X)
    = 5/7 − (5/6)²
    = 5/252
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 5/7 − (□)² | var(X) = 5/252
  pièges : p_var_minus_mean, p_mean_not_exist, p_g_of_mean

```

### Niveau 5

```
X ~ exp(λ) avec λ = 5. Calcule E[e^X], E[e^(2X)] et var(e^X).
  [free, sans aide]  E[e^X]
    = 5/(5 − 1)   ← ∫₀^∞ eˣ·5e^(−5x) dx
    = 5/4
  — E[e^(2X)]  [juge prob]  départ : E[e^(2X)]
    = 5/(5 − 2)
    = 5/3
  — var(e^X)  [juge prob]  départ : var(e^X)
    = 5/3 − (5/4)²
    = 5/48
  pièges : p_g_of_mean, p_var_minus_mean

X ~ exp(λ) avec λ = 3. Calcule E[e^X], E[e^(2X)] et var(e^X).
  [free, sans aide]  E[e^X]
    = 3/(3 − 1)   ← ∫₀^∞ eˣ·3e^(−3x) dx
    = 3/2
  — E[e^(2X)]  [juge prob]  départ : E[e^(2X)]
    = 3/(3 − 2)
    = 3
  — var(e^X)  [juge prob]  départ : var(e^X)
    = 3 − (3/2)²
    = 3/4
  pièges : p_g_of_mean, p_var_minus_mean

X ~ exp(λ) avec λ = 3. Calcule E[e^X], E[e^(2X)] et var(e^X).
  [free, sans aide]  E[e^X]
    = 3/(3 − 1)   ← ∫₀^∞ eˣ·3e^(−3x) dx
    = 3/2
  — E[e^(2X)]  [juge prob]  départ : E[e^(2X)]
    = 3/(3 − 2)
    = 3
  — var(e^X)  [juge prob]  départ : var(e^X)
    = 3 − (3/2)²
    = 3/4
  pièges : p_g_of_mean, p_var_minus_mean

```

### Variantes d'examen

```
X prend les valeurs −1, 0, 3, 4 avec les probabilités 0,4, 0,1, 0,1, 0,4. Que vaut var(X) ?
  · 6,2 [p_var_minus_mean]   ✔ 5,45   · 7,7   · 2,25
  [examen mcq]
  pièges : p_var_minus_mean

Vrai ou faux ?
  « Si E[X²] existe, var(X) = E[X²] − E[X]². » → VRAI
  [examen tf]

X a pour densité f(y) = 6y⁵ sur ]0 ; 1[ (et 0 ailleurs). Que vaut var(X) ?
  [free, sans aide, examen coef]  var(X)
    = 3/196
  pièges : p_var_minus_mean

```

## Reconnaître Gamma, Beta, Weibull, Pareto, χ² (`p-family`, BA3)

_Reconnaître Gamma, Beta, Weibull, Pareto ou χ² par le noyau de la densité, et en tirer E et var._

### Niveau 1

```
X a pour densité f(x) = C·(1 − x)³ sur [0 ; 1]. Reconnais la loi Beta(α, β), puis donne C et E[X].
  [guided]  α
    (Quelle loi reconnais-tu au noyau ? Beta.)
    = □ + 1   (trous : 0 + 1)
    = 1
  — β  [juge prob]  départ : β
    = □ + 1   (trous : 3 + 1)
    = 4
  — C  [juge prob]  départ : C
    = □/(0!·3!)   (trous : 4!/(0!·3!))
    = 4
  — E[X]  [juge prob]  départ : E[X]
    = 1/(1 + 4)
    = 1/5
  aides : Le noyau d'une Beta(α, β) est x^(α−1)(1 − x)^(β−1) : ajoute 1 à chaque exposant. | Beta(□, 4) | Beta(1, 4), C = 4, E[X] = 0,2
  pièges : p_beta_shape_off

X a pour densité f(x) = C·(1 − x)³ sur [0 ; 1]. Reconnais la loi Beta(α, β), puis donne C et E[X].
  [guided]  α
    (Quelle loi reconnais-tu au noyau ? Beta.)
    = □ + 1   (trous : 0 + 1)
    = 1
  — β  [juge prob]  départ : β
    = □ + 1   (trous : 3 + 1)
    = 4
  — C  [juge prob]  départ : C
    = □/(0!·3!)   (trous : 4!/(0!·3!))
    = 4
  — E[X]  [juge prob]  départ : E[X]
    = 1/(1 + 4)
    = 1/5
  aides : Le noyau d'une Beta(α, β) est x^(α−1)(1 − x)^(β−1) : ajoute 1 à chaque exposant. | Beta(□, 4) | Beta(1, 4), C = 4, E[X] = 0,2
  pièges : p_beta_shape_off

X a pour densité f(x) = C·x²(1 − x)⁴ sur [0 ; 1]. Reconnais la loi Beta(α, β), puis donne C et E[X].
  [guided]  α
    (Quelle loi reconnais-tu au noyau ? Beta.)
    = □ + 1   (trous : 2 + 1)
    = 3
  — β  [juge prob]  départ : β
    = □ + 1   (trous : 4 + 1)
    = 5
  — C  [juge prob]  départ : C
    = □/(2!·4!)   (trous : 7!/(2!·4!))
    = 105
  — E[X]  [juge prob]  départ : E[X]
    = 3/(3 + 5)
    = 3/8
  aides : Le noyau d'une Beta(α, β) est x^(α−1)(1 − x)^(β−1) : ajoute 1 à chaque exposant. | Beta(□, 5) | Beta(3, 5), C = 105, E[X] = 0,375
  pièges : p_beta_shape_off

```

### Niveau 2

```
X a pour densité f(x) = C·x(1 − x)² sur [0 ; 1]. Reconnais la loi Beta(α, β), puis donne C et E[X].
  [guided]  α
    ? Quelle loi reconnais-tu au noyau ? · Gamma / ✔ Beta / · Exponentielle / · Pareto
    = □ + 1   (trous : 1 + 1)
    = 2
  — β  [juge prob]  départ : β
    = □ + 1   (trous : 2 + 1)
    = 3
  — C  [juge prob]  départ : C
    = □/(1!·2!)   (trous : 4!/(1!·2!))
    = 12
  — E[X]  [juge prob]  départ : E[X]
    = 2/(2 + 3)
    = 2/5
  aides : Le noyau d'une Beta(α, β) est x^(α−1)(1 − x)^(β−1) : ajoute 1 à chaque exposant. | Beta(□, 3) | Beta(2, 3), C = 12, E[X] = 0,4
  pièges : p_beta_shape_off

X a pour densité f(x) = C·x(1 − x)³ sur [0 ; 1]. Reconnais la loi Beta(α, β), puis donne C et E[X].
  [guided]  α
    ? Quelle loi reconnais-tu au noyau ? · Gamma / ✔ Beta / · Exponentielle / · Pareto
    = □ + 1   (trous : 1 + 1)
    = 2
  — β  [juge prob]  départ : β
    = □ + 1   (trous : 3 + 1)
    = 4
  — C  [juge prob]  départ : C
    = □/(1!·3!)   (trous : 5!/(1!·3!))
    = 20
  — E[X]  [juge prob]  départ : E[X]
    = 2/(2 + 4)
    = 1/3
  aides : Le noyau d'une Beta(α, β) est x^(α−1)(1 − x)^(β−1) : ajoute 1 à chaque exposant. | Beta(□, 4) | Beta(2, 4), C = 20, E[X] = 1/3
  pièges : p_beta_shape_off

Y a pour densité f(y) = (y⁴·e^(−y/θ))/(24θ⁵) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
  [guided]  k
    ? Quelle loi reconnais-tu au noyau ? ✔ Gamma / · Beta / · Exponentielle / · Pareto
    = □ + 1   (trous : 4 + 1)
    = 5
  — E[Y]  [juge prob]  départ : E[Y]
    = □θ   (trous : 5θ)
  — var(Y)  [juge prob]  départ : var(Y)
    = □θ²   (trous : 5θ²)
  aides : Repère la puissance de y et ce qui divise y dans l'exponentielle : y^(k−1)·e^(−y/θ). | Y ~ Γ(□, θ) | Y ~ Γ(5, θ) : E = 5θ, var = 5θ²
  pièges : p_gamma_shape_off, p_gamma_scale_rate

```

### Niveau 3

```
Y a pour densité f(y) = (y²·e^(−y/2))/(16) pour y ≥ 0. Reconnais la loi, puis donne E[Y] et var(Y).
  [tap, suivre l'erreur, menu menu]  k
    ? Quelle loi reconnais-tu au noyau ? ✔ Gamma / · Beta / · Exponentielle / · Pareto
    = 2 + 1
    = 3
  — E[Y]  [juge prob]  départ : E[Y]
    = 3·2
    = 6
  — var(Y)  [juge prob]  départ : var(Y)
    = 3·2²
    = 12
  aides : Repère la puissance de y et ce qui divise y dans l'exponentielle : y^(k−1)·e^(−y/θ). | Y ~ Γ(□, 2) | Y ~ Γ(3, 2) : E = 6, var = 12
  pièges : p_gamma_shape_off, p_gamma_scale_rate

X₁, …, X₃ sont indépendantes, de loi exp(λ) avec λ = 4. Quelle est la loi de leur somme S ? Donne la forme k, l'échelle θ et E[S].
  [tap, suivre l'erreur, menu menu]  k
    ? Quelle loi reconnais-tu au noyau ? ✔ Gamma / · Beta / · Exponentielle / · Pareto
    = 3
  — θ  [juge prob]  départ : θ
    = 1/4
  — E[S]  [juge prob]  départ : E[S]
    = 3·1/4
    = 3/4
  aides : Une somme de n exponentielles exp(λ) indépendantes suit Γ(n, 1/λ). | S ~ Γ(3, □) | S ~ Γ(3, 1/4), E[S] = 0,75
  pièges : p_gamma_scale_rate

Y a pour densité f(y) = (y²·e^(−y/2))/(16) pour y ≥ 0. Reconnais la loi, puis donne E[Y] et var(Y).
  [tap, suivre l'erreur, menu menu]  k
    ? Quelle loi reconnais-tu au noyau ? ✔ Gamma / · Beta / · Exponentielle / · Pareto
    = 2 + 1
    = 3
  — E[Y]  [juge prob]  départ : E[Y]
    = 3·2
    = 6
  — var(Y)  [juge prob]  départ : var(Y)
    = 3·2²
    = 12
  aides : Repère la puissance de y et ce qui divise y dans l'exponentielle : y^(k−1)·e^(−y/θ). | Y ~ Γ(□, 2) | Y ~ Γ(3, 2) : E = 6, var = 12
  pièges : p_gamma_shape_off, p_gamma_scale_rate

```

### Niveau 4

```
X a pour densité f(x) = C·x(1 − x) sur [0 ; 1]. Reconnais la loi Beta(α, β), puis donne C et E[X].
  [free, suivre l'erreur]  α
    = 1 + 1
    = 2
  — β  [juge prob]  départ : β
    = 1 + 1
    = 2
  — C  [juge prob]  départ : C
    = 3!/(1!·1!)
    = 6
  — E[X]  [juge prob]  départ : E[X]
    = 2/(2 + 2)
    = 1/2
  aides : Le noyau d'une Beta(α, β) est x^(α−1)(1 − x)^(β−1) : ajoute 1 à chaque exposant. | Beta(□, 2) | Beta(2, 2), C = 6, E[X] = 0,5
  pièges : p_beta_shape_off

Y a pour densité f(y) = (y·e^(−y/θ))/(1θ²) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
  [free, suivre l'erreur]  k
    = 1 + 1
    = 2
  — E[Y]  [juge prob]  départ : E[Y]
    = 2θ
  — var(Y)  [juge prob]  départ : var(Y)
    = 2θ²
  aides : Repère la puissance de y et ce qui divise y dans l'exponentielle : y^(k−1)·e^(−y/θ). | Y ~ Γ(□, θ) | Y ~ Γ(2, θ) : E = 2θ, var = 2θ²
  pièges : p_gamma_shape_off, p_gamma_scale_rate

Y a pour densité f(y) = (y·e^(−y/θ))/(1θ²) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
  [free, suivre l'erreur]  k
    = 1 + 1
    = 2
  — E[Y]  [juge prob]  départ : E[Y]
    = 2θ
  — var(Y)  [juge prob]  départ : var(Y)
    = 2θ²
  aides : Repère la puissance de y et ce qui divise y dans l'exponentielle : y^(k−1)·e^(−y/θ). | Y ~ Γ(□, θ) | Y ~ Γ(2, θ) : E = 2θ, var = 2θ²
  pièges : p_gamma_shape_off, p_gamma_scale_rate

```

### Niveau 5

```
Y a pour densité f(y) = (y·e^(−y/θ))/(1θ²) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
  [free, sans aide]  k
    = 1 + 1
    = 2
  — Γ(k)θ^k  [juge prob]  départ : Γ(k)θ^k
    = 1!·θ²
  — E[Y]  [juge prob]  départ : E[Y]
    = 2θ
  — var(Y)  [juge prob]  départ : var(Y)
    = 2θ²
  pièges : p_gamma_shape_off, p_gamma_scale_rate

Y a pour densité f(y) = (y³·e^(−y/θ))/(6θ⁴) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
  [free, sans aide]  k
    = 3 + 1
    = 4
  — Γ(k)θ^k  [juge prob]  départ : Γ(k)θ^k
    = 3!·θ⁴
  — E[Y]  [juge prob]  départ : E[Y]
    = 4θ
  — var(Y)  [juge prob]  départ : var(Y)
    = 4θ²
  pièges : p_gamma_shape_off, p_gamma_scale_rate

Y a pour densité f(y) = (y⁴·e^(−y/θ))/(24θ⁵) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
  [free, sans aide]  k
    = 4 + 1
    = 5
  — Γ(k)θ^k  [juge prob]  départ : Γ(k)θ^k
    = 4!·θ⁵
  — E[Y]  [juge prob]  départ : E[Y]
    = 5θ
  — var(Y)  [juge prob]  départ : var(Y)
    = 5θ²
  pièges : p_gamma_shape_off, p_gamma_scale_rate

```

### Variantes d'examen

```
Y a pour densité f(y) ∝ y^3·e^(−y/θ) pour y ≥ 0 (θ > 0). Que vaut E[Y] ?
  ✔ 4θ   · 4θ²   · 3θ [p_gamma_shape_off]   · 4/θ [p_gamma_scale_rate]
  [examen mcq]
  pièges : p_gamma_scale_rate, p_gamma_shape_off

Vrai ou faux ?
  « La loi χ²(2) est une loi exponentielle. » → VRAI
  [examen tf]

Y a pour densité f(y) = 8/3·y³·e^(−2y) pour y ≥ 0. Que vaut E[Y] ?
  [free, sans aide, examen coef]  E[Y]
    = 4·(1/2)
    = 2
  pièges : p_gamma_scale_rate

Y a pour densité f(y) = (y·e^(−y/θ))/(1θ²) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
  [problème, examen open, 10 points]
  partie 1 (k : 4 ; Γ(k)θ^k : 2 ; E[Y] : 2 ; var(Y) : 2)
  Y a pour densité f(y) = (y·e^(−y/θ))/(1θ²) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
    [free, sans aide, suivre l'erreur, examen open]  k
      = 1 + 1
      = 2
    — Γ(k)θ^k  [juge prob]  départ : Γ(k)θ^k
      = 1!·θ²
    — E[Y]  [juge prob]  départ : E[Y]
      = 2θ
    — var(Y)  [juge prob]  départ : var(Y)
      = 2θ²
  pièges : p_gamma_shape_off, p_gamma_scale_rate

```

## Loi normale : standardiser, table de Φ (`p-normal-std`, BA3)

_Standardiser une loi normale, Z = (X − μ)/σ, puis lire la table de Φ._

### Niveau 1

```
X ~ N(100 ; 10²). Calcule Pr(X > 106,5) avec la table de Φ.
  [guided]  z
    = (□ − 100)/10   (trous : (106,5 − 100)/10)
    = □   (trous : 0,65)
  — Φ(0,65)  [juge stat]  départ : Φ(0,65)
    = □   (trous : 0,742)
  — Pr(X>106,5)  [juge stat]  départ : Pr(X > 106,5)
    = 1 − □   (trous : 1 − 0,742)
    = 0,258
  aides : Ramène-toi à Z = (X − μ)/σ, puis Pr(Z > z) = 1 − Φ(z). | z = (106,5 − 100)/□ | Pr = 1 − 0,742 = 0,258
  pièges : p_standardize_var, p_upper_tail

X ~ N(10 ; 4²). Calcule Pr(X < 0,7) avec la table de Φ.
  [guided]  z
    = (□ − 10)/4   (trous : (0,7 − 10)/4)
    = □   (trous : −2,325)
  — Φ(2,325)  [juge stat]  départ : Φ(2,325)
    = □   (trous : 0,99)
  — Pr(X<0,7)  [juge stat]  départ : Pr(X < 0,7)
    (Φ(−2,325) avec une valeur négative ? Φ(−2,325) = 1 − Φ(2,325).)
    = 1 − □   (trous : 1 − 0,99)
    = 0,01
  aides : z est négatif : Φ(−a) = 1 − Φ(a). | Pr = 1 − Φ(□) | Pr = 1 − 0,99 = 0,01
  pièges : p_standardize_var, p_phi_negative

X ~ N(170 ; 4²). Calcule Pr(X < 164,3) avec la table de Φ.
  [guided]  z
    = (□ − 170)/4   (trous : (164,3 − 170)/4)
    = □   (trous : −1,425)
  — Φ(1,425)  [juge stat]  départ : Φ(1,425)
    = □   (trous : 0,923)
  — Pr(X<164,3)  [juge stat]  départ : Pr(X < 164,3)
    (Φ(−1,425) avec une valeur négative ? Φ(−1,425) = 1 − Φ(1,425).)
    = 1 − □   (trous : 1 − 0,923)
    = 0,077
  aides : z est négatif : Φ(−a) = 1 − Φ(a). | Pr = 1 − Φ(□) | Pr = 1 − 0,923 = 0,077
  pièges : p_standardize_var, p_phi_negative

```

### Niveau 2

```
X ~ N(20 ; 25²). Calcule Pr(X > 72,5) avec la table de Φ.
  [guided]  z
    = (□ − 20)/25   (trous : (72,5 − 20)/25)
    = □   (trous : 2,1)
  — Φ(2,1)  [juge stat]  départ : Φ(2,1)
    = □   (trous : 0,982)
  — Pr(X>72,5)  [juge stat]  départ : Pr(X > 72,5)
    ? Queue gauche ou droite ? ✔ À droite : Pr(X > x) = 1 − Φ(z) / · Φ(z) directement
    = 1 − □   (trous : 1 − 0,982)
    = 0,018
  aides : Ramène-toi à Z = (X − μ)/σ, puis Pr(Z > z) = 1 − Φ(z). | z = (72,5 − 20)/□ | Pr = 1 − 0,982 = 0,018
  pièges : p_standardize_var, p_upper_tail

X ~ N(170 ; 10²). Calcule Pr(X > 180,5) avec la table de Φ.
  [guided]  z
    = (□ − 170)/10   (trous : (180,5 − 170)/10)
    = □   (trous : 1,05)
  — Φ(1,05)  [juge stat]  départ : Φ(1,05)
    = □   (trous : 0,853)
  — Pr(X>180,5)  [juge stat]  départ : Pr(X > 180,5)
    ? Queue gauche ou droite ? ✔ À droite : Pr(X > x) = 1 − Φ(z) / · Φ(z) directement
    = 1 − □   (trous : 1 − 0,853)
    = 0,147
  aides : Ramène-toi à Z = (X − μ)/σ, puis Pr(Z > z) = 1 − Φ(z). | z = (180,5 − 170)/□ | Pr = 1 − 0,853 = 0,147
  pièges : p_standardize_var, p_upper_tail

X ~ N(170 ; 10²). Calcule Pr(X > 182,5) avec la table de Φ.
  [guided]  z
    = (□ − 170)/10   (trous : (182,5 − 170)/10)
    = □   (trous : 1,25)
  — Φ(1,25)  [juge stat]  départ : Φ(1,25)
    = □   (trous : 0,894)
  — Pr(X>182,5)  [juge stat]  départ : Pr(X > 182,5)
    ? Queue gauche ou droite ? ✔ À droite : Pr(X > x) = 1 − Φ(z) / · Φ(z) directement
    = 1 − □   (trous : 1 − 0,894)
    = 0,106
  aides : Ramène-toi à Z = (X − μ)/σ, puis Pr(Z > z) = 1 − Φ(z). | z = (182,5 − 170)/□ | Pr = 1 − 0,894 = 0,106
  pièges : p_standardize_var, p_upper_tail

```

### Niveau 3

```
X ~ N(50 ; 10²). Calcule Pr(39,5 < X < 74) avec la table de Φ.
  [tap, suivre l'erreur, menu menu]  z1
    = (39,5 − 50)/10
    = −1,05
  — z2  [juge stat]  départ : z2
    = (74 − 50)/10
    = 2,4
  — Φ(2,4)  [juge stat]  départ : Φ(2,4)
    = 0,992
  — Φ(1,05)  [juge stat]  départ : Φ(1,05)
    = 0,853
  — Pr  [juge stat]  départ : Pr
    = 0,992 − (1 − 0,853)
    = 0,845
  aides : Pr(a < X < b) = Φ(z₂) − Φ(z₁), et Φ(−a) = 1 − Φ(a). | Pr = 0,992 − (1 − □) | Pr = 0,845
  pièges : p_standardize_var, p_phi_negative, p_upper_tail

X ~ N(10 ; 8²). Calcule Pr(−2,6 < X < 19,6) avec la table de Φ.
  [tap, suivre l'erreur, menu menu]  z1
    = (−2,6 − 10)/8
    = −1,575
  — z2  [juge stat]  départ : z2
    = (19,6 − 10)/8
    = 1,2
  — Φ(1,2)  [juge stat]  départ : Φ(1,2)
    = 0,885
  — Φ(1,575)  [juge stat]  départ : Φ(1,575)
    = 0,942
  — Pr  [juge stat]  départ : Pr
    = 0,885 − (1 − 0,942)
    = 0,827
  aides : Pr(a < X < b) = Φ(z₂) − Φ(z₁), et Φ(−a) = 1 − Φ(a). | Pr = 0,885 − (1 − □) | Pr = 0,827
  pièges : p_standardize_var, p_phi_negative, p_upper_tail

X ~ N(170 ; 15²). Calcule Pr(X > 191) avec la table de Φ.
  [tap, suivre l'erreur, menu menu]  z
    = (191 − 170)/15
    = 1,4
  — Φ(1,4)  [juge stat]  départ : Φ(1,4)
    = 0,919
  — Pr(X>191)  [juge stat]  départ : Pr(X > 191)
    = 1 − 0,919
    = 0,081
  aides : Ramène-toi à Z = (X − μ)/σ, puis Pr(Z > z) = 1 − Φ(z). | z = (191 − 170)/□ | Pr = 1 − 0,919 = 0,081
  pièges : p_standardize_var, p_upper_tail

```

### Niveau 4

```
X ~ N(10 ; 25). Calcule Pr(X > 13) avec la table de Φ.
  [free, suivre l'erreur]  σ
    ? Dans N(10 ; 25), que vaut 25 ? ✔ La variance σ² / · L'écart-type σ
    = √25
    = 5
  — z  [juge stat]  départ : z
    = (13 − 10)/5
    = 0,6
  — Φ(0,6)  [juge stat]  départ : Φ(0,6)
    = 0,726
  — Pr(X>13)  [juge stat]  départ : Pr(X > 13)
    = 1 − 0,726
    = 0,274
  aides : Ramène-toi à Z = (X − μ)/σ, puis Pr(Z > z) = 1 − Φ(z). | z = (13 − 10)/□ | Pr = 1 − 0,726 = 0,274
  pièges : p_normal_sigma2, p_standardize_var, p_upper_tail

X ~ N(10 ; 64). Calcule Pr(X > 29,6) avec la table de Φ.
  [free, suivre l'erreur]  σ
    ? Dans N(10 ; 64), que vaut 64 ? ✔ La variance σ² / · L'écart-type σ
    = √64
    = 8
  — z  [juge stat]  départ : z
    = (29,6 − 10)/8
    = 2,45
  — Φ(2,45)  [juge stat]  départ : Φ(2,45)
    = 0,993
  — Pr(X>29,6)  [juge stat]  départ : Pr(X > 29,6)
    = 1 − 0,993
    = 0,007
  aides : Ramène-toi à Z = (X − μ)/σ, puis Pr(Z > z) = 1 − Φ(z). | z = (29,6 − 10)/□ | Pr = 1 − 0,993 = 0,007
  pièges : p_normal_sigma2, p_standardize_var, p_upper_tail

X ~ N(120 ; 2²). Calcule Pr(X < 115,6) avec la table de Φ.
  [free, suivre l'erreur]  z
    = (115,6 − 120)/2
    = −2,2
  — Φ(2,2)  [juge stat]  départ : Φ(2,2)
    = 0,986
  — Pr(X<115,6)  [juge stat]  départ : Pr(X < 115,6)
    = 1 − 0,986
    = 0,014
  aides : z est négatif : Φ(−a) = 1 − Φ(a). | Pr = 1 − Φ(□) | Pr = 1 − 0,986 = 0,014
  pièges : p_standardize_var, p_phi_negative

```

### Niveau 5

```
X ~ N(84,3 ; 5²) et Y ~ N(70 ; 12²) sont indépendantes. Calcule Pr(X > Y) avec la table de Φ.
  [free, sans aide]  E[X−Y]
    = 84,3 − 70
    = 14,3
  — σ(X−Y)  [juge prob]  départ : σ(X − Y)
    = √(5² + 12²)
    = 13
  — z  [juge stat]  départ : z
    = 1,1
  — Pr(X−Y>0)  [juge stat]  départ : Pr(X − Y > 0)
    = Φ(1,1)
    = 0,864
  pièges : p_standardize_var, p_upper_tail

La taille X (cm) suit N(100 ; 20²). Calcule Pr(X > 127,5 | X > 116) avec la table de Φ.
  [free, sans aide]  z1
    = (116 − 100)/20
    = 0,8
  — z2  [juge stat]  départ : z2
    = (127,5 − 100)/20
    = 1,375
  — Φ(0,8)  [juge stat]  départ : Φ(0,8)
    = 0,788
  — Φ(1,375)  [juge stat]  départ : Φ(1,375)
    = 0,915
  — Pr  [juge stat]  départ : Pr
    = (1 − 0,915)/(1 − 0,788)
    = 0,401
  pièges : p_standardize_var, p_upper_tail, p_cond_denominator

X ~ N(82,1 ; 5²) et Y ~ N(60 ; 12²) sont indépendantes. Calcule Pr(X > Y) avec la table de Φ.
  [free, sans aide]  E[X−Y]
    = 82,1 − 60
    = 22,1
  — σ(X−Y)  [juge prob]  départ : σ(X − Y)
    = √(5² + 12²)
    = 13
  — z  [juge stat]  départ : z
    = 1,7
  — Pr(X−Y>0)  [juge stat]  départ : Pr(X − Y > 0)
    = Φ(1,7)
    = 0,955
  pièges : p_standardize_var, p_upper_tail

```

### Variantes d'examen

```
X ~ N(20 ; 16). Que vaut Pr(X > 28) ?
  ✔ 0,023   · 0,977 [p_upper_tail]   · 0,159   · 0,309 [p_standardize_var]
  [examen mcq]
  pièges : p_upper_tail, p_standardize_var

Vrai ou faux ?
  « Si X ~ N(0 ; 1), alors Pr(|X| < 1,96) ≈ 0,95. » → VRAI
  [examen tf]

X ~ N(100 ; 10²). Calcule Pr(X > 114,5) avec la table de Φ (au millième).
  [free, sans aide, examen coef]  Pr(X > 114,5)
    = 0,074
  pièges : p_upper_tail

```

## Quantiles normaux, retrouver μ ou σ (`p-normal-inverse`, BA3)

_Lire la table de Φ à l'envers pour trouver un seuil, μ ou σ._

### Niveau 1

```
Un lancer de javelot X (m) suit N(84 ; σ²). On sait que Pr(X > 100) = 0,05. Trouve σ (au centième).
  [guided]  Φ(16/σ)
    = 1 − □   (trous : 1 − 0,05)
    = 0,95
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,95)
    = 1,64
  — σ  [juge stat]  départ : σ
    = 16/1,64
    = 9,76
  aides : Pr(X > 100) = 0,05, c'est Φ(16/σ) = 0,95 : cherche 0,95 dans la table 2. | 16/σ = 1,64, donc σ = □ | σ = 9,76
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Un lancer de javelot X (m) suit N(70 ; σ²). On sait que Pr(X > 77) = 0,05. Trouve σ (au centième).
  [guided]  Φ(7/σ)
    = 1 − □   (trous : 1 − 0,05)
    = 0,95
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,95)
    = 1,64
  — σ  [juge stat]  départ : σ
    = 7/1,64
    = 4,27
  aides : Pr(X > 77) = 0,05, c'est Φ(7/σ) = 0,95 : cherche 0,95 dans la table 2. | 7/σ = 1,64, donc σ = □ | σ = 4,27
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Un lancer de javelot X (m) suit N(84 ; σ²). On sait que Pr(X > 92) = 0,05. Trouve σ (au centième).
  [guided]  Φ(8/σ)
    = 1 − □   (trous : 1 − 0,05)
    = 0,95
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,95)
    = 1,64
  — σ  [juge stat]  départ : σ
    = 8/1,64
    = 4,88
  aides : Pr(X > 92) = 0,05, c'est Φ(8/σ) = 0,95 : cherche 0,95 dans la table 2. | 8/σ = 1,64, donc σ = □ | σ = 4,88
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

```

### Niveau 2

```
Un lancer de javelot X (m) suit N(60 ; σ²). On sait que Pr(X > 63) = 0,25. Trouve σ (au centième).
  [guided]  Φ(3/σ)
    = 1 − □   (trous : 1 − 0,25)
    = 0,75
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,75)
    = 0,67
  — σ  [juge stat]  départ : σ
    = 3/0,67
    = 4,48
  aides : Pr(X > 63) = 0,25, c'est Φ(3/σ) = 0,75 : cherche 0,75 dans la table 2. | 3/σ = 0,67, donc σ = □ | σ = 4,48
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Un lancer de javelot X (m) suit N(70 ; σ²). On sait que Pr(X > 78) = 0,05. Trouve σ (au centième).
  [guided]  Φ(8/σ)
    = 1 − □   (trous : 1 − 0,05)
    = 0,95
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,95)
    = 1,64
  — σ  [juge stat]  départ : σ
    = 8/1,64
    = 4,88
  aides : Pr(X > 78) = 0,05, c'est Φ(8/σ) = 0,95 : cherche 0,95 dans la table 2. | 8/σ = 1,64, donc σ = □ | σ = 4,88
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Un lancer de javelot X (m) suit N(70 ; σ²). On sait que Pr(X > 80) = 0,1. Trouve σ (au centième).
  [guided]  Φ(10/σ)
    = 1 − □   (trous : 1 − 0,1)
    = 0,9
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,9)
    = 1,28
  — σ  [juge stat]  départ : σ
    = 10/1,28
    = 7,81
  aides : Pr(X > 80) = 0,1, c'est Φ(10/σ) = 0,9 : cherche 0,9 dans la table 2. | 10/σ = 1,28, donc σ = □ | σ = 7,81
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

```

### Niveau 3

```
Un lancer de javelot X (m) suit N(70 ; σ²). On sait que Pr(X > 77) = 0,2. Trouve σ (au centième).
  [tap, suivre l'erreur, menu menu]  Φ(7/σ)
    = 1 − 0,2
    = 0,8
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,8)
    = 0,84
  — σ  [juge stat]  départ : σ
    = 7/0,84
    = 8,33
  aides : Pr(X > 77) = 0,2, c'est Φ(7/σ) = 0,8 : cherche 0,8 dans la table 2. | 7/σ = 0,84, donc σ = □ | σ = 8,33
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Un lancer de javelot X (m) suit N(70 ; σ²). On sait que Pr(X > 83) = 0,05. Trouve σ (au centième).
  [tap, suivre l'erreur, menu menu]  Φ(13/σ)
    = 1 − 0,05
    = 0,95
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,95)
    = 1,64
  — σ  [juge stat]  départ : σ
    = 13/1,64
    = 7,93
  aides : Pr(X > 83) = 0,05, c'est Φ(13/σ) = 0,95 : cherche 0,95 dans la table 2. | 13/σ = 1,64, donc σ = □ | σ = 7,93
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Un lancer de javelot X (m) suit N(84 ; σ²). On sait que Pr(X > 92) = 0,025. Trouve σ (au centième).
  [tap, suivre l'erreur, menu menu]  Φ(8/σ)
    = 1 − 0,025
    = 0,975
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,975)
    = 1,96
  — σ  [juge stat]  départ : σ
    = 8/1,96
    = 4,08
  aides : Pr(X > 92) = 0,025, c'est Φ(8/σ) = 0,975 : cherche 0,975 dans la table 2. | 8/σ = 1,96, donc σ = □ | σ = 4,08
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

```

### Niveau 4

```
X ~ N(500 ; 4²). Trouve le seuil c dépassé par seulement 20 % des valeurs (au dixième).
  [free, suivre l'erreur]  Φ((c − 500)/4)
    = 1 − 0,2
    = 0,8
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,8)
    = 0,84
  — c  [juge stat]  départ : c
    = 500 + 0,84·4
    = 503,4
  aides : Les valeurs du haut : Φ((c − μ)/σ) = 1 − part. | c = 500 + □·4 | c = 503,4
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Le poids X d'un paquet suit N(μ ; 4²). 2,5 % des paquets pèsent moins de 76 g. Trouve μ (au dixième).
  [free, suivre l'erreur]  Φ((μ − 76)/4)
    = 1 − 0,025
    = 0,975
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,975)
    = 1,96
  — μ  [juge stat]  départ : μ
    = 76 + 1,96·4
    = 83,8
  aides : 2,5 % en dessous de 76 : (μ − 76)/σ = Φ⁻¹(0,975). | μ = 76 + □·4 | μ = 83,8
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Le poids X d'un paquet suit N(μ ; 4²). 25 % des paquets pèsent moins de 247 g. Trouve μ (au dixième).
  [free, suivre l'erreur]  Φ((μ − 247)/4)
    = 1 − 0,25
    = 0,75
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,75)
    = 0,67
  — μ  [juge stat]  départ : μ
    = 247 + 0,67·4
    = 249,7
  aides : 25 % en dessous de 247 : (μ − 247)/σ = Φ⁻¹(0,75). | μ = 247 + □·4 | μ = 249,7
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

```

### Niveau 5

```
Un lancer de javelot X (m) suit N(70 ; σ²). On sait que Pr(X > 80) = 0,1. Trouve σ (au centième), puis Pr(X > 90).
  [free, sans aide]  Φ(10/σ)
    = 1 − 0,1
    = 0,9
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,9)
    = 1,28
  — σ  [juge stat]  départ : σ
    = 10/1,28
    = 7,81
  — z₂  [juge stat]  départ : z_2
    = 20/7,81
    = 2,56
  — Pr(X>90)  [juge stat]  départ : Pr(X > 90)
    = 1 − Φ(2,56)
    = 0,005
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Un lancer de javelot X (m) suit N(70 ; σ²). On sait que Pr(X > 73) = 0,2. Trouve σ (au centième), puis Pr(X > 76).
  [free, sans aide]  Φ(3/σ)
    = 1 − 0,2
    = 0,8
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,8)
    = 0,84
  — σ  [juge stat]  départ : σ
    = 3/0,84
    = 3,57
  — z₂  [juge stat]  départ : z_2
    = 6/3,57
    = 1,68
  — Pr(X>76)  [juge stat]  départ : Pr(X > 76)
    = 1 − Φ(1,68)
    = 0,046
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Un lancer de javelot X (m) suit N(70 ; σ²). On sait que Pr(X > 77) = 0,2. Trouve σ (au centième), puis Pr(X > 84).
  [free, sans aide]  Φ(7/σ)
    = 1 − 0,2
    = 0,8
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,8)
    = 0,84
  — σ  [juge stat]  départ : σ
    = 7/0,84
    = 8,33
  — z₂  [juge stat]  départ : z_2
    = 14/8,33
    = 1,68
  — Pr(X>84)  [juge stat]  départ : Pr(X > 84)
    = 1 − Φ(1,68)
    = 0,046
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

```

### Variantes d'examen

```
Z ~ N(0 ; 1). Quel nombre z vérifie Pr(Z > z) = 0,25 ?
  · −0,67 [p_phi_inverse_side]   · 1,15   ✔ 0,67   · 0,773 [p_quantile_inverse]
  [examen mcq]
  pièges : p_phi_inverse_side, p_quantile_inverse

Vrai ou faux ?
  « Le quantile d'ordre 0,975 de N(0 ; 1) vaut 1,96. » → VRAI
  [examen tf]

Un lancer de javelot X (m) suit N(84 ; σ²). On sait que Pr(X > 94) = 0,02. Trouve σ (au centième).
  [free, sans aide, examen coef]  σ
    = 10/2,054
    = 4,87
  pièges : p_phi_inverse_side

Un lancer de javelot X (m) suit N(84 ; σ²). On sait que Pr(X > 89) = 0,25. Trouve σ (au centième), puis Pr(X > 94).
  [problème, examen open, 8 points]
  partie 1 (Φ(5/σ) : 2 ; z : 1,5 ; σ : 1,5 ; z₂ : 1,5 ; Pr(X>94) : 1,5)
  Un lancer de javelot X (m) suit N(84 ; σ²). On sait que Pr(X > 89) = 0,25. Trouve σ (au centième), puis Pr(X > 94).
    [free, sans aide, suivre l'erreur, examen open]  Φ(5/σ)
      = 1 − 0,25
      = 0,75
    — z  [juge stat]  départ : z
      = Φ⁻¹(0,75)
      = 0,67
    — σ  [juge stat]  départ : σ
      = 5/0,67
      = 7,46
    — z₂  [juge stat]  départ : z_2
      = 10/7,46
      = 1,34
    — Pr(X>94)  [juge stat]  départ : Pr(X > 94)
      = 1 − Φ(1,34)
      = 0,09
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

```

## Loi de Y = g(X) ; échantillonnage par F⁻¹ (`p-transform`, BA3)

_La densité de Y = g(X) par la formule du changement de variable (avec |dg⁻¹/dy|) ou par la fonction de répartition._

### Niveau 1

```
U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 0,5. Trouve la densité de X.
  [guided]  g⁻¹(x)
    (Le support de X ? u ∈ ]0 ; 1[ donne x ∈ ]0 ; +∞[.)
    = e^(−□)   (trous : e^(−x/2))
  — (g⁻¹)′(x)  [juge prob]  départ : (g⁻¹)′(x)
    = −(1/2)e^(−□)   (trous : −(1/2)e^(−x/2))
  — f_X(x)  [juge prob]  départ : f_X(x)
    = 1·□   (trous : 1·(1/2)e^(−x/2))
  aides : Inverse g, dérive l'inverse, prends la valeur absolue. | f_X(x) = 1·|□| | f_X(x) = (1/2)e^(-x/2) : X ~ exp(0,5)
  pièges : p_transform_jacobian, p_transform_abs, p_transform_support

U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 3. Trouve la densité de X.
  [guided]  g⁻¹(x)
    (Le support de X ? u ∈ ]0 ; 1[ donne x ∈ ]0 ; +∞[.)
    = e^(−□)   (trous : e^(−3x))
  — (g⁻¹)′(x)  [juge prob]  départ : (g⁻¹)′(x)
    = −3e^(−□)   (trous : −3e^(−3x))
  — f_X(x)  [juge prob]  départ : f_X(x)
    = 1·□   (trous : 1·3e^(−3x))
  aides : Inverse g, dérive l'inverse, prends la valeur absolue. | f_X(x) = 1·|□| | f_X(x) = 3e^(-3x) : X ~ exp(3)
  pièges : p_transform_jacobian, p_transform_abs, p_transform_support

U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 1. Trouve la densité de X.
  [guided]  g⁻¹(x)
    (Le support de X ? u ∈ ]0 ; 1[ donne x ∈ ]0 ; +∞[.)
    = e^(−□)   (trous : e^(−x))
  — (g⁻¹)′(x)  [juge prob]  départ : (g⁻¹)′(x)
    = −e^(−□)   (trous : −e^(−x))
  — f_X(x)  [juge prob]  départ : f_X(x)
    = 1·□   (trous : 1·e^(−x))
  aides : Inverse g, dérive l'inverse, prends la valeur absolue. | f_X(x) = 1·|□| | f_X(x) = e^(-x) : X ~ exp(1)
  pièges : p_transform_jacobian, p_transform_abs, p_transform_support

```

### Niveau 2

```
U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 2. Trouve la densité de X.
  [guided]  g⁻¹(x)
    ? Le support de X ? ✔ u ∈ ]0 ; 1[ donne x ∈ ]0 ; +∞[ / · x ∈ ]0 ; 1[, comme U
    = e^(−□)   (trous : e^(−2x))
  — (g⁻¹)′(x)  [juge prob]  départ : (g⁻¹)′(x)
    = −2e^(−□)   (trous : −2e^(−2x))
  — f_X(x)  [juge prob]  départ : f_X(x)
    = 1·□   (trous : 1·2e^(−2x))
  aides : Inverse g, dérive l'inverse, prends la valeur absolue. | f_X(x) = 1·|□| | f_X(x) = 2e^(-2x) : X ~ exp(2)
  pièges : p_transform_jacobian, p_transform_abs, p_transform_support

U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 0,5. Trouve la densité de X.
  [guided]  g⁻¹(x)
    ? Le support de X ? ✔ u ∈ ]0 ; 1[ donne x ∈ ]0 ; +∞[ / · x ∈ ]0 ; 1[, comme U
    = e^(−□)   (trous : e^(−x/2))
  — (g⁻¹)′(x)  [juge prob]  départ : (g⁻¹)′(x)
    = −(1/2)e^(−□)   (trous : −(1/2)e^(−x/2))
  — f_X(x)  [juge prob]  départ : f_X(x)
    = 1·□   (trous : 1·(1/2)e^(−x/2))
  aides : Inverse g, dérive l'inverse, prends la valeur absolue. | f_X(x) = 1·|□| | f_X(x) = (1/2)e^(-x/2) : X ~ exp(0,5)
  pièges : p_transform_jacobian, p_transform_abs, p_transform_support

U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 1. Trouve la densité de X.
  [guided]  g⁻¹(x)
    ? Le support de X ? ✔ u ∈ ]0 ; 1[ donne x ∈ ]0 ; +∞[ / · x ∈ ]0 ; 1[, comme U
    = e^(−□)   (trous : e^(−x))
  — (g⁻¹)′(x)  [juge prob]  départ : (g⁻¹)′(x)
    = −e^(−□)   (trous : −e^(−x))
  — f_X(x)  [juge prob]  départ : f_X(x)
    = 1·□   (trous : 1·e^(−x))
  aides : Inverse g, dérive l'inverse, prends la valeur absolue. | f_X(x) = 1·|□| | f_X(x) = e^(-x) : X ~ exp(1)
  pièges : p_transform_jacobian, p_transform_abs, p_transform_support

```

### Niveau 3

```
X ~ exp(λ) avec λ = 0,5, et Y = 3X. Trouve la densité de Y sur ]0 ; +∞[.
  [tap, suivre l'erreur, menu menu]  g⁻¹(y)
    = y/3
  — (g⁻¹)′(y)  [juge prob]  départ : (g⁻¹)′(y)
    = 1/3
  — f_Y(y)  [juge prob]  départ : f_Y(y)
    = 1/2e^(−1/2·y/3)·1/3
  aides : Inverse g : x = (y − b)/a ; la densité est divisée par a. | f_Y(y) = f_X(□)·1/3 | f_Y(y) = (1/6)e^(-(1/6)×y)
  pièges : p_scale_density, p_transform_jacobian

On veut tirer X de fonction de répartition F(x) = 1 − e^(−3x) (x ≥ 0) à partir de U ~ U(0 ; 1). Donne F⁻¹(u).
  [tap, suivre l'erreur, menu menu]  F⁻¹(u)
    = −ln(1 − u)/3
  aides : Résous F(x) = u en x. | e^(−3x) = □ | F⁻¹(u) = −ln(1 − u)/3
  pièges : p_quantile_inverse

U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 3. Trouve la densité de X.
  [tap, suivre l'erreur, menu menu]  g⁻¹(x)
    ? Le support de X ? ✔ u ∈ ]0 ; 1[ donne x ∈ ]0 ; +∞[ / · x ∈ ]0 ; 1[, comme U
    = e^(−3x)
  — (g⁻¹)′(x)  [juge prob]  départ : (g⁻¹)′(x)
    = −3e^(−3x)
  — f_X(x)  [juge prob]  départ : f_X(x)
    ? Que reconnais-tu ? ✔ X ~ exp(3) / · X ~ U(0 ; 1)
    = 1·3e^(−3x)
  aides : Inverse g, dérive l'inverse, prends la valeur absolue. | f_X(x) = 1·|□| | f_X(x) = 3e^(-3x) : X ~ exp(3)
  pièges : p_transform_jacobian, p_transform_abs, p_transform_support

```

### Niveau 4

```
On veut tirer X de fonction de répartition F(x) = 1 − e^(−x^2) (x ≥ 0, Weibull) à partir de U ~ U(0 ; 1). Donne F⁻¹(u).
  [free, suivre l'erreur]  F⁻¹(u)
    = (−ln(1 − u))^(1/2)
  aides : Résous F(x) = u en x. | x^2 = −ln(□) | F⁻¹(u) = (−ln(1 − u))^(1/2)

On veut tirer X de fonction de répartition F(x) = 1 − x^−4 (x ≥ 1) à partir de U ~ U(0 ; 1). Donne F⁻¹(u).
  [free, suivre l'erreur]  F⁻¹(u)
    = (1 − u)^(−1/4)
  aides : Résous F(x) = u en x. | x^−4 = □ | F⁻¹(u) = (1 − u)^(−1/4)
  pièges : p_quantile_inverse

On veut tirer X de fonction de répartition F(x) = 1 − e^(−2x) (x ≥ 0) à partir de U ~ U(0 ; 1). Donne F⁻¹(u).
  [free, suivre l'erreur]  F⁻¹(u)
    = −ln(1 − u)/2
  aides : Résous F(x) = u en x. | e^(−2x) = □ | F⁻¹(u) = −ln(1 − u)/2
  pièges : p_quantile_inverse

```

### Niveau 5

```
X ~ exp(λ) avec λ = 1, et Y = 2X + 2. Trouve la densité de Y sur ]2 ; +∞[.
  [free, sans aide]  g⁻¹(y)
    = (y − 2)/2
  — (g⁻¹)′(y)  [juge prob]  départ : (g⁻¹)′(y)
    = 1/2
  — f_Y(y)  [juge prob]  départ : f_Y(y)
    = 1e^(−1·(y − 2)/2)·1/2
  pièges : p_scale_density, p_transform_jacobian

U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 2. Trouve la densité de X.
  [free, sans aide]  g⁻¹(x)
    ? Le support de X ? ✔ u ∈ ]0 ; 1[ donne x ∈ ]0 ; +∞[ / · x ∈ ]0 ; 1[, comme U
    = e^(−2x)
  — (g⁻¹)′(x)  [juge prob]  départ : (g⁻¹)′(x)
    = −2e^(−2x)
  — f_X(x)  [juge prob]  départ : f_X(x)
    ? Que reconnais-tu ? ✔ X ~ exp(2) / · X ~ U(0 ; 1)
    = 1·2e^(−2x)
  pièges : p_transform_jacobian, p_transform_abs, p_transform_support

X ~ exp(λ) avec λ = 3, et Y = 2X + 2. Trouve la densité de Y sur ]2 ; +∞[.
  [free, sans aide]  g⁻¹(y)
    = (y − 2)/2
  — (g⁻¹)′(y)  [juge prob]  départ : (g⁻¹)′(y)
    = 1/2
  — f_Y(y)  [juge prob]  départ : f_Y(y)
    = 3e^(−3·(y − 2)/2)·1/2
  pièges : p_scale_density, p_transform_jacobian

```

### Variantes d'examen

```
U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 2. Quelle est la densité de X ?
  ✔ 2e^(-2x) pour x > 0   · -2e^(-2x) pour x > 0 [p_transform_abs]   · 2e^(-2x) pour 0 < x < 1 [p_transform_support]   · 1 pour x > 0 [p_transform_jacobian]
  [examen mcq]
  pièges : p_transform_jacobian, p_transform_abs, p_transform_support

Vrai ou faux ?
  « Si Z ~ N(0 ; 1), alors Z² ~ χ²(1). » → VRAI
  [examen tf]

U ~ U(0 ; 1) et X = −ln(U)/3. Que vaut la densité de X en x = 1 (au millième) ?
  [free, sans aide, examen coef]  f_X(1)
    = 0,149
  pièges : p_transform_jacobian, p_transform_abs

U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 1. Trouve la densité de X.
  [problème, examen open, 10 points]
  partie 1 (g⁻¹(x) : 3,5 ; (g⁻¹)′(x) : 3,5 ; f_X(x) : 3)
  U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 1. Trouve la densité de X.
    [free, sans aide, suivre l'erreur, examen open]  g⁻¹(x)
      = e^(−x)
    — (g⁻¹)′(x)  [juge prob]  départ : (g⁻¹)′(x)
      = −e^(−x)
    — f_X(x)  [juge prob]  départ : f_X(x)
      = 1·e^(−x)
  pièges : p_transform_jacobian, p_transform_abs, p_transform_support

```

## Loi conjointe discrète (`p-joint-disc`, BA3)

_Un tableau de loi conjointe : marginales, lois conditionnelles, indépendance et covariance._

### Niveau 1

```
Loi conjointe de X et Y :X \ Y01200,240,40,1610,060,10,04Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [guided]  p_X(1)
    = 0,06 + 0,1 + □   (trous : 0,06 + 0,1 + 0,04)
    = 0,2
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,24 + □   (trous : 0,24 + 0,06)
    = 0,3
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    (X et Y sont-ils indépendants ? Oui : chaque case est le produit des marginales.)
    = 0,1/□   (trous : 0,1/0,5)
    = 1/5
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,1/□ | Pr(X = 1 | Y = 1) = 0,2
  pièges : p_marginal_wrong_axis, p_cond_denominator

Loi conjointe de X et Y :X \ Y01200,190,30,2110,010,20,09Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [guided]  p_X(1)
    = 0,01 + 0,2 + □   (trous : 0,01 + 0,2 + 0,09)
    = 0,3
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,19 + □   (trous : 0,19 + 0,01)
    = 0,2
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    (X et Y sont-ils indépendants ? Non : p(0, 0) = 0,19 ≠ p_X(0)·p_Y(0) = 0,14.)
    = 0,2/□   (trous : 0,2/0,5)
    = 2/5
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,2/□ | Pr(X = 1 | Y = 1) = 0,4
  pièges : p_marginal_wrong_axis, p_cond_denominator

Loi conjointe de X et Y :X \ Y01200,130,030,2410,070,170,36Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [guided]  p_X(1)
    = 0,07 + 0,17 + □   (trous : 0,07 + 0,17 + 0,36)
    = 0,6
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,13 + □   (trous : 0,13 + 0,07)
    = 0,2
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    (X et Y sont-ils indépendants ? Non : p(0, 0) = 0,13 ≠ p_X(0)·p_Y(0) = 0,08.)
    = 0,17/□   (trous : 0,17/0,2)
    = 17/20
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,17/□ | Pr(X = 1 | Y = 1) = 0,85
  pièges : p_marginal_wrong_axis, p_cond_denominator

```

### Niveau 2

```
Loi conjointe de X et Y :X \ Y0100,210,1910,190,41Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [guided]  p_X(1)
    = 0,19 + □   (trous : 0,19 + 0,41)
    = 0,6
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,21 + □   (trous : 0,21 + 0,19)
    = 0,4
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,21 ≠ p_X(0)·p_Y(0) = 0,16 / · Oui
    = 0,41/□   (trous : 0,41/0,6)
    = 41/60
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,41/□ | Pr(X = 1 | Y = 1) = 41/60
  pièges : p_marginal_wrong_axis

Loi conjointe de X et Y :X \ Y01200,370,190,2410,030,110,06Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [guided]  p_X(1)
    = 0,03 + 0,11 + □   (trous : 0,03 + 0,11 + 0,06)
    = 0,2
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,37 + □   (trous : 0,37 + 0,03)
    = 0,4
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,37 ≠ p_X(0)·p_Y(0) = 0,32 / · Oui
    = 0,11/□   (trous : 0,11/0,3)
    = 11/30
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,11/□ | Pr(X = 1 | Y = 1) = 11/30
  pièges : p_marginal_wrong_axis, p_cond_denominator

Loi conjointe de X et Y :X \ Y01200,20,160,0410,30,240,06Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [guided]  p_X(1)
    = 0,3 + 0,24 + □   (trous : 0,3 + 0,24 + 0,06)
    = 0,6
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,2 + □   (trous : 0,2 + 0,3)
    = 0,5
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Oui : chaque case est le produit des marginales / · Non
    = 0,24/□   (trous : 0,24/0,4)
    = 3/5
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,24/□ | Pr(X = 1 | Y = 1) = 0,6
  pièges : p_marginal_wrong_axis, p_cond_denominator

```

### Niveau 3

```
Loi conjointe de X et Y :X \ Y01200,30,050,1510,20,150,15Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [tap, suivre l'erreur, menu menu]  p_X(1)
    = 0,2 + 0,15 + 0,15
    = 0,5
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,3 + 0,2
    = 0,5
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,3 ≠ p_X(0)·p_Y(0) = 0,25 / · Oui
    = 0,15/0,2
    = 3/4
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,15/□ | Pr(X = 1 | Y = 1) = 0,75
  pièges : p_marginal_wrong_axis, p_cond_denominator

Loi conjointe de X et Y :X \ Y0100,20,210,30,3Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [tap, suivre l'erreur, menu menu]  p_X(1)
    = 0,3 + 0,3
    = 0,6
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,2 + 0,3
    = 0,5
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Oui : chaque case est le produit des marginales / · Non
    = 0,3/0,5
    = 3/5
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,3/□ | Pr(X = 1 | Y = 1) = 0,6
  pièges : p_marginal_wrong_axis, p_cond_denominator

Loi conjointe de X et Y :X \ Y01200,190,30,2110,010,20,09Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [tap, suivre l'erreur, menu menu]  p_X(1)
    = 0,01 + 0,2 + 0,09
    = 0,3
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,19 + 0,01
    = 0,2
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,19 ≠ p_X(0)·p_Y(0) = 0,14 / · Oui
    = 0,2/0,5
    = 2/5
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,2/□ | Pr(X = 1 | Y = 1) = 0,4
  pièges : p_marginal_wrong_axis, p_cond_denominator

```

### Niveau 4

```
Loi conjointe de X et Y :X \ Y01200,050,30,0510,10,40,1Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1) et cov(X, Y).
  [free, suivre l'erreur]  p_X(1)
    = 0,1 + 0,4 + 0,1
    = 0,6
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,05 + 0,1
    = 0,15
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,05 ≠ p_X(0)·p_Y(0) = 0,06 / · Oui, puisque cov(X, Y) = 0
    = 0,4/0,7
    = 4/7
  — cov(X,Y)  [juge prob]  départ : cov(X,Y)
    = 0,6 − 0,6·1
    = 0
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,4/□ | Pr(X = 1 | Y = 1) = 4/7
  pièges : p_marginal_wrong_axis, p_cond_denominator, p_cov_zero_indep

Loi conjointe de X et Y :X \ Y01200,210,070,1210,190,230,18Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1) et cov(X, Y).
  [free, suivre l'erreur]  p_X(1)
    = 0,19 + 0,23 + 0,18
    = 0,6
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,21 + 0,19
    = 0,4
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,21 ≠ p_X(0)·p_Y(0) = 0,16 / · Oui
    = 0,23/0,3
    = 23/30
  — cov(X,Y)  [juge prob]  départ : cov(X,Y)
    = 0,59 − 0,6·0,9
    = 0,05
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,23/□ | Pr(X = 1 | Y = 1) = 23/30
  pièges : p_marginal_wrong_axis, p_cond_denominator

Loi conjointe de X et Y :X \ Y01200,290,070,2410,110,130,16Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1) et cov(X, Y).
  [free, suivre l'erreur]  p_X(1)
    = 0,11 + 0,13 + 0,16
    = 0,4
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,29 + 0,11
    = 0,4
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,29 ≠ p_X(0)·p_Y(0) = 0,24 / · Oui
    = 0,13/0,2
    = 13/20
  — cov(X,Y)  [juge prob]  départ : cov(X,Y)
    = 0,45 − 0,4·1
    = 0,05
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,13/□ | Pr(X = 1 | Y = 1) = 0,65
  pièges : p_marginal_wrong_axis, p_cond_denominator

```

### Niveau 5

```
Loi conjointe de X et Y :X \ Y01200,050,050,0510,050,750,05Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1) et cov(X, Y).
  [free, sans aide]  p_X(1)
    = 0,05 + 0,75 + 0,05
    = 0,85
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,05 + 0,05
    = 0,1
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,05 ≠ p_X(0)·p_Y(0) = 0,015 / · Oui, puisque cov(X, Y) = 0
    = 0,75/0,8
    = 15/16
  — cov(X,Y)  [juge prob]  départ : cov(X,Y)
    = 0,85 − 0,85·1
    = 0
  pièges : p_marginal_wrong_axis, p_cond_denominator, p_cov_zero_indep

Loi conjointe de X et Y :X \ Y01200,20,250,210,050,250,05Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1) et cov(X, Y).
  [free, sans aide]  p_X(1)
    = 0,05 + 0,25 + 0,05
    = 0,35
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,2 + 0,05
    = 0,25
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,2 ≠ p_X(0)·p_Y(0) = 0,1625 / · Oui, puisque cov(X, Y) = 0
    = 0,25/0,5
    = 1/2
  — cov(X,Y)  [juge prob]  départ : cov(X,Y)
    = 0,35 − 0,35·1
    = 0
  pièges : p_marginal_wrong_axis, p_cond_denominator, p_cov_zero_indep

Loi conjointe de X et Y :X \ Y01200,20,050,210,10,350,1Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1) et cov(X, Y).
  [free, sans aide]  p_X(1)
    = 0,1 + 0,35 + 0,1
    = 0,55
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,2 + 0,1
    = 0,3
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,2 ≠ p_X(0)·p_Y(0) = 0,135 / · Oui, puisque cov(X, Y) = 0
    = 0,35/0,4
    = 7/8
  — cov(X,Y)  [juge prob]  départ : cov(X,Y)
    = 0,55 − 0,55·1
    = 0
  pièges : p_marginal_wrong_axis, p_cond_denominator, p_cov_zero_indep

```

### Variantes d'examen

```
Loi conjointe de X et Y :X \ Y01200,230,250,1210,070,250,08Que vaut Pr(X = 1 | Y = 1) ?
  · 0,4   ✔ 0,5   · 0,25   · 0,625 [p_cond_denominator]
  [examen mcq]
  pièges : p_cond_denominator

Vrai ou faux ?
  « Pour la loi conjointe ci-dessous, cov(X, Y) = 0, donc X et Y sont indépendants.X \ Y01200,10,050,110,050,650,05 » → FAUX
    contre-exemple (refute) : a = 1/10, b = 3/80
  [examen tf]
  pièges : p_cov_zero_indep

Loi conjointe de X et Y :X \ Y0100,210,4910,090,21Que vaut Pr(X = 1 | Y = 1) ?
  [free, sans aide, examen coef]  Pr(X=1|Y=1)
    = 3/10
  pièges : p_cond_denominator

```

## Densité conjointe : constante, marginales, indépendance (`p-joint-cont`, BA3)

_Une densité conjointe : la constante, les marginales par une intégrale, et l'indépendance (le support doit être un rectangle)._

### Niveau 1

```
(W, Z) a pour densité f(w, z) = c·w²z sur [0 ; 3] × [0 ; 3], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [guided]  ∫fdz
    = □   (trous : (9/2)w²)
  — I  [juge prob]  départ : I
    = 81/2
  — c  [juge prob]  départ : c
    = 1/(81/2)
    = 2/81
  — Marginale de W sur [0 ; 3]  [juge prob]  départ : f_W(w)
    = (2/81)·(□)   (trous : (2/81)·((9/2)w²))
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^3 (w^2z) dz = □ | I = 40,5, c = 2/81, f_W(w) = (2/81)×((9/2)w^2)
  pièges : p_marginal_bounds, p_normalize_bounds

(W, Z) a pour densité f(w, z) = c·w²z² sur [0 ; 1] × [0 ; 3], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [guided]  ∫fdz
    = □   (trous : 9w²)
  — I  [juge prob]  départ : I
    = 3
  — c  [juge prob]  départ : c
    = 1/3
  — Marginale de W sur [0 ; 1]  [juge prob]  départ : f_W(w)
    = (1/3)·(□)   (trous : (1/3)·(9w²))
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^3 (w^2z^2) dz = □ | I = 3, c = 1/3, f_W(w) = (1/3)×(9w^2)
  pièges : p_marginal_bounds, p_normalize_bounds

(W, Z) a pour densité f(w, z) = c·w(w + z) sur [0 ; 2] × [0 ; 3], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [guided]  ∫fdz
    = □   (trous : 3w² + (9/2)w)
  — I  [juge prob]  départ : I
    = 3·2³/3 + 9/2·2²/2
    = 17
  — c  [juge prob]  départ : c
    = 1/17
  — Marginale de W sur [0 ; 2]  [juge prob]  départ : f_W(w)
    = (1/17)·(□)   (trous : (1/17)·(3w² + (9/2)w))
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^3 (w(w+z)) dz = □ | I = 17, c = 1/17, f_W(w) = (1/17)×(3w^2+(9/2)w)
  pièges : p_marginal_bounds, p_normalize_bounds, p_joint_support_indep

```

### Niveau 2

```
(W, Z) a pour densité f(w, z) = c·w(w + z) sur [0 ; 3] × [0 ; 2], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [guided]  ∫fdz
    = □   (trous : 2w² + 2w)
  — I  [juge prob]  départ : I
    = 2·3³/3 + 2·3²/2
    = 27
  — c  [juge prob]  départ : c
    = 1/27
  — Marginale de W sur [0 ; 3]  [juge prob]  départ : f_W(w)
    ? W et Z sont-elles indépendantes ? ✔ Non : w(w+z) ne se factorise pas en (fonction de w)·(fonction de z) / · Oui, le support est un rectangle
    = (1/27)·(□)   (trous : (1/27)·(2w² + 2w))
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^2 (w(w+z)) dz = □ | I = 27, c = 1/27, f_W(w) = (1/27)×(2w^2+2w)
  pièges : p_marginal_bounds, p_normalize_bounds, p_joint_support_indep

(W, Z) a pour densité f(w, z) = c·wz² sur [0 ; 3] × [0 ; 1], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [guided]  ∫fdz
    = □   (trous : (1/3)w)
  — I  [juge prob]  départ : I
    = 3/2
  — c  [juge prob]  départ : c
    = 1/(3/2)
    = 2/3
  — Marginale de W sur [0 ; 3]  [juge prob]  départ : f_W(w)
    ? W et Z sont-elles indépendantes ? ✔ Oui : f se factorise en (fonction de w)·(fonction de z) sur un rectangle / · Non
    = (2/3)·(□)   (trous : (2/3)·((1/3)w))
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^1 (wz^2) dz = □ | I = 1,5, c = 2/3, f_W(w) = (2/3)×((1/3)w)
  pièges : p_normalize_bounds

(W, Z) a pour densité f(w, z) = c·w²z sur [0 ; 2] × [0 ; 2], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [guided]  ∫fdz
    = □   (trous : 2w²)
  — I  [juge prob]  départ : I
    = 16/3
  — c  [juge prob]  départ : c
    = 1/(16/3)
    = 3/16
  — Marginale de W sur [0 ; 2]  [juge prob]  départ : f_W(w)
    ? W et Z sont-elles indépendantes ? ✔ Oui : f se factorise en (fonction de w)·(fonction de z) sur un rectangle / · Non
    = (3/16)·(□)   (trous : (3/16)·(2w²))
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^2 (w^2z) dz = □ | I = 16/3, c = 0,1875, f_W(w) = (3/16)×(2w^2)
  pièges : p_marginal_bounds, p_normalize_bounds

```

### Niveau 3

```
(W, Z) a pour densité f(w, z) = c·w(w + z) sur [0 ; 2] × [0 ; 2], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [tap, suivre l'erreur, menu menu]  ∫fdz
    = 2w² + 2w
  — I  [juge prob]  départ : I
    = 2·2³/3 + 2·2²/2
    = 28/3
  — c  [juge prob]  départ : c
    = 1/(28/3)
    = 3/28
  — Marginale de W sur [0 ; 2]  [juge prob]  départ : f_W(w)
    ? W et Z sont-elles indépendantes ? ✔ Non : w(w+z) ne se factorise pas en (fonction de w)·(fonction de z) / · Oui, le support est un rectangle
    = 3/28·(2w² + 2w)
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^2 (w(w+z)) dz = □ | I = 28/3, c = 3/28, f_W(w) = (3/28)×(2w^2+2w)
  pièges : p_marginal_bounds, p_normalize_bounds, p_joint_support_indep

(W, Z) a pour densité f(w, z) = c·(w + z) sur [0 ; 1] × [0 ; 1], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [tap, suivre l'erreur, menu menu]  ∫fdz
    = w + 1/2
  — I  [juge prob]  départ : I
    = 1·1²/2 + 1/2·1
    = 1
  — c  [juge prob]  départ : c
    = 1/1
    = 1
  — Marginale de W sur [0 ; 1]  [juge prob]  départ : f_W(w)
    ? W et Z sont-elles indépendantes ? ✔ Non : w+z ne se factorise pas en (fonction de w)·(fonction de z) / · Oui, le support est un rectangle
    = w + 1/2
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^1 (w+z) dz = □ | I = 1, c = 1, f_W(w) = 1×(w+1/2)
  pièges : p_joint_support_indep

(W, Z) a pour densité f(w, z) = c·(w + z) sur [0 ; 3] × [0 ; 3], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [tap, suivre l'erreur, menu menu]  ∫fdz
    = 3w + 9/2
  — I  [juge prob]  départ : I
    = 3·3²/2 + 9/2·3
    = 27
  — c  [juge prob]  départ : c
    = 1/27
  — Marginale de W sur [0 ; 3]  [juge prob]  départ : f_W(w)
    ? W et Z sont-elles indépendantes ? ✔ Non : w+z ne se factorise pas en (fonction de w)·(fonction de z) / · Oui, le support est un rectangle
    = 1/27·(3w + 9/2)
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^3 (w+z) dz = □ | I = 27, c = 1/27, f_W(w) = (1/27)×(3w+9/2)
  pièges : p_marginal_bounds, p_normalize_bounds, p_joint_support_indep

```

### Niveau 4

```
(X, Y) a pour densité f(x, y) = c·y·e^(−3x − 2y) pour x > 0, y > 0. Calcule les deux intégrales simples, c, puis la marginale de Y.
  [free, suivre l'erreur]  ∫e^(−ax)dx
    = 1/3
  — ∫₀^∞ y·e^(−2y) dy  [juge prob]  départ : ∫ye^(−by)dy
    = 1/2²
    = 1/4
  — c  [juge prob]  départ : c
    = 12
  — Marginale de Y  [juge prob]  départ : f_Y(y)
    = 4y·e^(−2y)
  aides : Le noyau se sépare : c·(∫ e^(−ax) dx)·(∫ y e^(−by) dy) = 1. | c·(1/3)·(□) = 1 | c = 12, f_Y(y) = 4y·e^(−2y)

(W, Z) a pour densité f(w, z) = c·wz sur [0 ; 1] × [0 ; 1], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [free, suivre l'erreur]  ∫fdz
    = (1/2)w
  — I  [juge prob]  départ : I
    = 1/4
  — c  [juge prob]  départ : c
    = 1/(1/4)
    = 4
  — Marginale de W sur [0 ; 1]  [juge prob]  départ : f_W(w)
    ? W et Z sont-elles indépendantes ? ✔ Oui : f se factorise en (fonction de w)·(fonction de z) sur un rectangle / · Non
    = 2w
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^1 (wz) dz = □ | I = 0,25, c = 4, f_W(w) = 4×((1/2)w)

(X, Y) a pour densité f(x, y) = c·y·e^(−2x − 1y) pour x > 0, y > 0. Calcule les deux intégrales simples, c, puis la marginale de Y.
  [free, suivre l'erreur]  ∫e^(−ax)dx
    = 1/2
  — ∫₀^∞ y·e^(−1y) dy  [juge prob]  départ : ∫ye^(−by)dy
    = 1
  — c  [juge prob]  départ : c
    = 2
  — Marginale de Y  [juge prob]  départ : f_Y(y)
    = 1y·e^(−1y)
  aides : Le noyau se sépare : c·(∫ e^(−ax) dx)·(∫ y e^(−by) dy) = 1. | c·(1/2)·(□) = 1 | c = 2, f_Y(y) = 1y·e^(−1y)

```

### Niveau 5

```
(X, Y) a pour densité f(x, y) = c·x·y sur le triangle x ≥ 0, y ≥ 0, x + y ≤ 1. Calcule l'intégrale intérieure en y, I, c, la marginale de X, puis décide de l'indépendance.
  [free, sans aide]  ∫fdy
    = x(1 − x)²/2
  — I  [juge prob]  départ : I
    = 1/24
  — c  [juge prob]  départ : c
    = 24
  — Marginale de X sur [0 ; 1]  [juge prob]  départ : f_X(x)
    ? X et Y sont-elles indépendantes ? ✔ Non : le support n'est pas un rectangle (si x = 0,9, y ≤ 0,1) / · Oui : f se factorise en x·y
    = 12x(1 − x)²
  pièges : p_marginal_bounds, p_joint_support_indep

(X, Y) a pour densité f(x, y) = c·x·y sur le triangle x ≥ 0, y ≥ 0, x + y ≤ 1. Calcule l'intégrale intérieure en y, I, c, la marginale de X, puis décide de l'indépendance.
  [free, sans aide]  ∫fdy
    = x(1 − x)²/2
  — I  [juge prob]  départ : I
    = 1/24
  — c  [juge prob]  départ : c
    = 24
  — Marginale de X sur [0 ; 1]  [juge prob]  départ : f_X(x)
    ? X et Y sont-elles indépendantes ? ✔ Non : le support n'est pas un rectangle (si x = 0,9, y ≤ 0,1) / · Oui : f se factorise en x·y
    = 12x(1 − x)²
  pièges : p_marginal_bounds, p_joint_support_indep

(X, Y) a pour densité f(x, y) = c·x·y sur le triangle x ≥ 0, y ≥ 0, x + y ≤ 1. Calcule l'intégrale intérieure en y, I, c, la marginale de X, puis décide de l'indépendance.
  [free, sans aide]  ∫fdy
    = x(1 − x)²/2
  — I  [juge prob]  départ : I
    = 1/24
  — c  [juge prob]  départ : c
    = 24
  — Marginale de X sur [0 ; 1]  [juge prob]  départ : f_X(x)
    ? X et Y sont-elles indépendantes ? ✔ Non : le support n'est pas un rectangle (si x = 0,9, y ≤ 0,1) / · Oui : f se factorise en x·y
    = 12x(1 − x)²
  pièges : p_marginal_bounds, p_joint_support_indep

```

### Variantes d'examen

```
(W, Z) a pour densité f(w, z) = c·w(w + z) sur [0 ; 2] × [0 ; 3], et 0 ailleurs. Que vaut c ?
  ✔ 1/17   · 12/7 [p_normalize_bounds]   · 17   · 1/8
  [examen mcq]
  pièges : p_normalize_bounds

Vrai ou faux ?
  « Si f(x, y) = 24xy sur le triangle x ≥ 0, y ≥ 0, x + y ≤ 1, X et Y sont indépendantes, parce que f se factorise. » → FAUX
    contre-exemple (refute) : u = 0,011664, v = 0
  [examen tf]
  pièges : p_joint_support_indep

(W, Z) a pour densité f(w, z) = c·(w + z) sur [0 ; 3] × [0 ; 1], et 0 ailleurs. Que vaut c ?
  [free, sans aide, examen coef]  c
    = 1/6
  pièges : p_normalize_bounds

```

## Combinaisons linéaires : espérance, variance, covariance (`p-lin-combo`, BA3)

_Espérance, variance et covariance de combinaisons linéaires : var(aX + bY) = a²var X + b²var Y + 2ab·cov(X, Y)._

### Niveau 1

```
X = X_A − X_B + X_C, avec E[X_A] = 5, E[X_B] = 3, E[X_C] = 0 ; var(X_A) = 5, var(X_B) = 5, var(X_C) = 2 ; cov(X_B, X_C) = −1, E[X_A X_B] = 16, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [guided]  E[X]
    = 5 − 1·(3) + 1·□   (trous : 5 − 1·(3) + 1·(0))
    = 2
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = □ − (5)·(3)   (trous : 16 − (5)·(3))
    = 1
  — var(X)  [juge prob]  départ : var(X)
    = 5 + □·5 + 1²·2 + 2·(−1·(1) − 1·1·(−1))   (trous : 5 + (−1)²·5 + 1²·2 + 2·(−1·(1) − 1·1·(−1)))
    = 12
  — σ  [juge stat]  départ : σ
    = √12
    = 3,46
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 5 + 1·5 + 1·2 + 2(□) | var(X) = 12
  pièges : p_var_scale, p_var_sum_cov

X = X_A − 2X_B − X_C, avec E[X_A] = 0, E[X_B] = 5, E[X_C] = −3 ; var(X_A) = 4, var(X_B) = 6, var(X_C) = 5 ; cov(X_B, X_C) = 1, E[X_A X_B] = 1, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [guided]  E[X]
    = 0 − 2·(5) − 1·□   (trous : 0 − 2·(5) − 1·(−3))
    = −7
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = □ − (0)·(5)   (trous : 1 − (0)·(5))
    = 1
  — var(X)  [juge prob]  départ : var(X)
    = 4 + □·6 + (−1)²·5 + 2·(−2·(1) − 2·(−1)·(1))   (trous : 4 + (−2)²·6 + (−1)²·5 + 2·(−2·(1) − 2·(−1)·(1)))
    = 33
  — σ  [juge stat]  départ : σ
    = √33
    = 5,74
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 4 + 4·6 + 1·5 + 2(□) | var(X) = 33
  pièges : p_var_scale, p_var_diff, p_var_sum_cov

X = X_A − X_B + 2X_C, avec E[X_A] = 2, E[X_B] = 0, E[X_C] = 5 ; var(X_A) = 9, var(X_B) = 1, var(X_C) = 3 ; cov(X_B, X_C) = 0, E[X_A X_B] = −2, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [guided]  E[X]
    = 2 − 1·(0) + 2·□   (trous : 2 − 1·(0) + 2·(5))
    = 12
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = □ − (2)·(0)   (trous : −2 − (2)·(0))
    = −2
  — var(X)  [juge prob]  départ : var(X)
    = 9 + □·1 + 2²·3 + 2·(−1·(−2) − 1·2·(0))   (trous : 9 + (−1)²·1 + 2²·3 + 2·(−1·(−2) − 1·2·(0)))
    = 26
  — σ  [juge stat]  départ : σ
    = √26
    = 5,1
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 9 + 1·1 + 4·3 + 2(□) | var(X) = 26
  pièges : p_var_sum_cov, p_var_scale, p_var_diff

```

### Niveau 2

```
X = X_A − X_B + 2X_C, avec E[X_A] = 0, E[X_B] = −1, E[X_C] = −1 ; var(X_A) = 9, var(X_B) = 3, var(X_C) = 5 ; cov(X_B, X_C) = 0, E[X_A X_B] = −2, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [guided]  E[X]
    = 0 − 1·□ + 2·(−1)   (trous : 0 − 1·(−1) + 2·(−1))
    = −1
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = □ − (0)·(−1)   (trous : −2 − (0)·(−1))
    = −2
  — var(X)  [juge prob]  départ : var(X)
    = 9 + □·3 + 2²·5 + 2·(−1·(−2) − 1·2·(0))   (trous : 9 + (−1)²·3 + 2²·5 + 2·(−1·(−2) − 1·2·(0)))
    = 36
  — σ  [juge stat]  départ : σ
    = √36
    = 6
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 9 + 1·3 + 4·5 + 2(□) | var(X) = 36
  pièges : p_var_sum_cov, p_var_scale, p_var_diff

X = X_A + 3X_B − X_C, avec E[X_A] = −1, E[X_B] = −3, E[X_C] = −2 ; var(X_A) = 8, var(X_B) = 2, var(X_C) = 7 ; cov(X_B, X_C) = 1, E[X_A X_B] = 1, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [guided]  E[X]
    = −1 + 3·(−3) − 1·□   (trous : −1 + 3·(−3) − 1·(−2))
    = −8
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = □ − (−1)·(−3)   (trous : 1 − (−1)·(−3))
    = −2
  — var(X)  [juge prob]  départ : var(X)
    = 8 + □·2 + (−1)²·7 + 2·(3·(−2) + 3·(−1)·(1))   (trous : 8 + 3²·2 + (−1)²·7 + 2·(3·(−2) + 3·(−1)·(1)))
    = 15
  — σ  [juge stat]  départ : σ
    = √15
    = 3,87
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 8 + 9·2 + 1·7 + 2(□) | var(X) = 15
  pièges : p_var_sum_cov, p_var_scale, p_var_diff

X = X_A − X_B + X_C, avec E[X_A] = −1, E[X_B] = 4, E[X_C] = −1 ; var(X_A) = 3, var(X_B) = 7, var(X_C) = 6 ; cov(X_B, X_C) = 2, E[X_A X_B] = −2, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [guided]  E[X]
    = −1 − 1·(4) + 1·□   (trous : −1 − 1·(4) + 1·(−1))
    = −6
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = □ − (−1)·(4)   (trous : −2 − (−1)·(4))
    = 2
  — var(X)  [juge prob]  départ : var(X)
    = 3 + □·7 + 1²·6 + 2·(−1·(2) − 1·1·(2))   (trous : 3 + (−1)²·7 + 1²·6 + 2·(−1·(2) − 1·1·(2)))
    = 8
  — σ  [juge stat]  départ : σ
    = √8
    = 2,83
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 3 + 1·7 + 1·6 + 2(□) | var(X) = 8
  pièges : p_var_sum_cov, p_var_scale

```

### Niveau 3

```
X et Y sont indépendantes, E[X] = 1, var(X) = 3, E[Y] = 1, var(Y) = 4. Calcule var(XY).
  [tap, suivre l'erreur, menu menu]  E[X²]
    = 3 + 1²
    = 4
  — E[Y²]  [juge prob]  départ : E[Y²]
    = 4 + 1²
    = 5
  — var(XY)  [juge prob]  départ : var(XY)
    = 4·5 − (1·1)²
    = 19
  aides : Pour X, Y indépendantes, var(XY) = E[X²]E[Y²] − (E[X]E[Y])². | var(XY) = 4·5 − □ | var(XY) = 19
  pièges : p_var_xy

X = X_A − 2X_B + X_C, avec E[X_A] = 4, E[X_B] = 2, E[X_C] = 5 ; var(X_A) = 3, var(X_B) = 4, var(X_C) = 4 ; cov(X_B, X_C) = 0, E[X_A X_B] = 6, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [tap, suivre l'erreur, menu menu]  E[X]
    = 4 − 2·(2) + 1·(5)
    = 5
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = 6 − (4)·(2)
    = −2
  — var(X)  [juge prob]  départ : var(X)
    = 3 + (−2)²·4 + 1²·4 + 2·(−2·(−2) − 2·1·(0))
    = 31
  — σ  [juge stat]  départ : σ
    = √31
    = 5,57
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 3 + 4·4 + 1·4 + 2(□) | var(X) = 31
  pièges : p_var_sum_cov, p_var_scale, p_var_diff

X = X_A − X_B − X_C, avec E[X_A] = −2, E[X_B] = 3, E[X_C] = 0 ; var(X_A) = 6, var(X_B) = 3, var(X_C) = 1 ; cov(X_B, X_C) = 0, E[X_A X_B] = −8, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [tap, suivre l'erreur, menu menu]  E[X]
    = −2 − 1·(3) − 1·(0)
    = −5
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = −8 − (−2)·(3)
    = −2
  — var(X)  [juge prob]  départ : var(X)
    = 6 + (−1)²·3 + (−1)²·1 + 2·(−1·(−2) − 1·(−1)·(0))
    = 14
  — σ  [juge stat]  départ : σ
    = √14
    = 3,74
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 6 + 1·3 + 1·1 + 2(□) | var(X) = 14
  pièges : p_var_sum_cov, p_var_scale

```

### Niveau 4

```
X = X_A + 2X_B + 2X_C, avec E[X_A] = 5, E[X_B] = 4, E[X_C] = −2 ; var(X_A) = 3, var(X_B) = 5, var(X_C) = 2 ; cov(X_B, X_C) = 0, E[X_A X_B] = 22, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [free, suivre l'erreur]  E[X]
    = 5 + 2·(4) + 2·(−2)
    = 9
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = 22 − (5)·(4)
    = 2
  — var(X)  [juge prob]  départ : var(X)
    = 3 + 2²·5 + 2²·2 + 2·(2·(2) + 2·2·(0))
    = 39
  — σ  [juge stat]  départ : σ
    = √39
    = 6,24
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 3 + 4·5 + 4·2 + 2(□) | var(X) = 39
  pièges : p_var_sum_cov, p_var_scale

X = X_A − X_B + 2X_C, avec E[X_A] = 3, E[X_B] = 1, E[X_C] = 5 ; var(X_A) = 8, var(X_B) = 7, var(X_C) = 2 ; cov(X_B, X_C) = 1, E[X_A X_B] = 5, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [free, suivre l'erreur]  E[X]
    = 3 − 1·(1) + 2·(5)
    = 12
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = 5 − (3)·(1)
    = 2
  — var(X)  [juge prob]  départ : var(X)
    = 8 + (−1)²·7 + 2²·2 + 2·(−1·(2) − 1·2·(1))
    = 15
  — σ  [juge stat]  départ : σ
    = √15
    = 3,87
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 8 + 1·7 + 4·2 + 2(□) | var(X) = 15
  pièges : p_var_sum_cov, p_var_scale, p_var_diff

X et Y sont indépendantes, E[X] = 1, var(X) = 3, E[Y] = 2, var(Y) = 4. Calcule var(XY).
  [free, suivre l'erreur]  E[X²]
    = 3 + 1²
    = 4
  — E[Y²]  [juge prob]  départ : E[Y²]
    = 4 + 2²
    = 8
  — var(XY)  [juge prob]  départ : var(XY)
    = 4·8 − (1·2)²
    = 28
  aides : Pour X, Y indépendantes, var(XY) = E[X²]E[Y²] − (E[X]E[Y])². | var(XY) = 4·8 − □ | var(XY) = 28
  pièges : p_var_xy

```

### Niveau 5

```
X = X_A + 3X_B + 2X_C, avec E[X_A] = −1, E[X_B] = 2, E[X_C] = 1 ; var(X_A) = 1, var(X_B) = 9, var(X_C) = 1 ; cov(X_B, X_C) = 0, E[X_A X_B] = 0, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [free, sans aide]  E[X]
    = −1 + 3·(2) + 2·(1)
    = 7
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = 0 − (−1)·(2)
    = 2
  — var(X)  [juge prob]  départ : var(X)
    = 1 + 3²·9 + 2²·1 + 2·(3·(2) + 3·2·(0))
    = 98
  — σ  [juge stat]  départ : σ
    = √98
    = 9,9
  pièges : p_var_sum_cov, p_var_scale

X et Y sont indépendantes, E[X] = 1, var(X) = 1, E[Y] = 3, var(Y) = 4. Calcule var(XY).
  [free, sans aide]  E[X²]
    = 1 + 1²
    = 2
  — E[Y²]  [juge prob]  départ : E[Y²]
    = 4 + 3²
    = 13
  — var(XY)  [juge prob]  départ : var(XY)
    = 2·13 − (1·3)²
    = 17
  pièges : p_var_xy

X = X_A + 3X_B + X_C, avec E[X_A] = −3, E[X_B] = 3, E[X_C] = 5 ; var(X_A) = 3, var(X_B) = 1, var(X_C) = 2 ; cov(X_B, X_C) = 1, E[X_A X_B] = −8, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [free, sans aide]  E[X]
    = −3 + 3·(3) + 1·(5)
    = 11
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = −8 − (−3)·(3)
    = 1
  — var(X)  [juge prob]  départ : var(X)
    = 3 + 3²·1 + 1²·2 + 2·(3·(1) + 3·1·(1))
    = 26
  — σ  [juge stat]  départ : σ
    = √26
    = 5,1
  pièges : p_var_sum_cov, p_var_scale

```

### Variantes d'examen

```
X et Y sont indépendantes, E[X] = 1, var(X) = 2, E[Y] = 2, var(Y) = 1. Que vaut var(XY) ?
  · 2 [p_var_xy]   ✔ 11   · 15   · 3
  [examen mcq]
  pièges : p_var_xy

Vrai ou faux ?
  « Pour X, Y indépendantes, var(X − Y) = var(X) − var(Y). » → FAUX
    contre-exemple (refute) : u = 1, v = 1
  [examen tf]
  pièges : p_var_diff

X = X_A − 2X_B + X_C, avec var(X_A) = 6, var(X_B) = 5, var(X_C) = 7, cov(X_A, X_B) = −2, cov(X_B, X_C) = −1, X_A et X_C indépendants. Que vaut var(X) ?
  [free, sans aide, examen coef]  var(X)
    = 45
  pièges : p_var_sum_cov, p_var_scale

```

## Covariance, corrélation ; corrélation et causalité (`p-cov-corr`, BA3)

_Covariance et corrélation, leur comportement sous une transformation affine, et pourquoi corrélation n'est pas causalité._

### Niveau 1

```
On sait que var X = 9, var Y = 16 et cov(X, Y) = −9,6. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −X + 2 et 2Y.
  [guided]  corr(X, Y)
    = (−9,6)/(□)   (trous : (−9,6)/(3·4))   ← σ_X = √9 = 3, σ_Y = √16 = 4
    = □   (trous : −0,8)   ← Calculer
  — cov(−X + 2, 2Y)  [juge prob]  départ : cov(−X + 2,2Y)
    = □·(−9,6)   (trous : (−1)·2·(−9,6))   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = □   (trous : 19,2)   ← Calculer
  — corr(−X + 2, 2Y)  [juge prob]  départ : corr(−X + 2,2Y)
    = □   (trous : 0,8)   ← Le signe de a·c = −2 ; la corrélation garde sa taille
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | (-9,6)/(□×□) | corr(X, Y) = −0,8 ; cov(−X + 2, 2Y) = 19,2 ; corr(−X + 2, 2Y) = 0,8
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 9, var Y = 1 et cov(X, Y) = 2,4. Calcule la corrélation de X et Y, puis la covariance et la corrélation de 3X et 2Y + 4.
  [guided]  corr(X, Y)
    = 2,4/(□)   (trous : 2,4/(3·1))   ← σ_X = √9 = 3, σ_Y = √1 = 1
    = □   (trous : 0,8)   ← Calculer
  — cov(3X, 2Y + 4)  [juge prob]  départ : cov(3X, 2Y + 4)
    = □·2,4   (trous : 3·2·2,4)   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = □   (trous : 14,4)   ← Calculer
  — corr(3X, 2Y + 4)  [juge prob]  départ : corr(3X, 2Y + 4)
    = □   (trous : 0,8)   ← Le signe de a·c = 6 ; la corrélation garde sa taille
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | 2,4/(□×□) | corr(X, Y) = 0,8 ; cov(3X, 2Y + 4) = 14,4 ; corr(3X, 2Y + 4) = 0,8
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 25, var Y = 16 et cov(X, Y) = −10. Calcule la corrélation de X et Y, puis la covariance et la corrélation de 2X + 2 et −Y − 4.
  [guided]  corr(X, Y)
    = (−10)/(□)   (trous : (−10)/(5·4))   ← σ_X = √25 = 5, σ_Y = √16 = 4
    = □   (trous : −0,5)   ← Calculer
  — cov(2X + 2, −Y − 4)  [juge prob]  départ : cov(2X + 2, −Y − 4)
    = □·(−10)   (trous : 2·(−1)·(−10))   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = □   (trous : 20)   ← Calculer
  — corr(2X + 2, −Y − 4)  [juge prob]  départ : corr(2X + 2, −Y − 4)
    = □   (trous : 0,5)   ← Le signe de a·c = −2 ; la corrélation garde sa taille
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | (-10)/(□×□) | corr(X, Y) = −0,5 ; cov(2X + 2, −Y − 4) = 20 ; corr(2X + 2, −Y − 4) = 0,5
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

```

### Niveau 2

```
On sait que var X = 1, var Y = 16 et cov(X, Y) = −3,2. Calcule la corrélation de X et Y, puis la covariance et la corrélation de 2X − 4 et Y.
  [guided]  corr(X, Y)
    = (−3,2)/(□)   (trous : (−3,2)/(1·4))   ← σ_X = √1 = 1, σ_Y = √16 = 4
    = □   (trous : −0,8)   ← Calculer
  — cov(2X − 4, Y)  [juge prob]  départ : cov(2X − 4, Y)
    = □·(−3,2)   (trous : 2·1·(−3,2))   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = □   (trous : −6,4)   ← Calculer
  — corr(2X − 4, Y)  [juge prob]  départ : corr(2X − 4, Y)
    = □   (trous : −0,8)   ← Le signe de a·c = 2 ; la corrélation garde sa taille
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | (-3,2)/(□×□) | corr(X, Y) = −0,8 ; cov(2X − 4, Y) = −6,4 ; corr(2X − 4, Y) = −0,8
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 4, var Y = 16 et cov(X, Y) = 4,8. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −2X − 3 et −2Y − 2.
  [guided]  corr(X, Y)
    = 4,8/(□)   (trous : 4,8/(2·4))   ← σ_X = √4 = 2, σ_Y = √16 = 4
    = □   (trous : 0,6)   ← Calculer
  — cov(−2X − 3, −2Y − 2)  [juge prob]  départ : cov(−2X − 3, −2Y − 2)
    = □·4,8   (trous : (−2)·(−2)·4,8)   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = □   (trous : 19,2)   ← Calculer
  — corr(−2X − 3, −2Y − 2)  [juge prob]  départ : corr(−2X − 3, −2Y − 2)
    = □   (trous : 0,6)   ← Le signe de a·c = 4 ; la corrélation garde sa taille
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | 4,8/(□×□) | corr(X, Y) = 0,6 ; cov(−2X − 3, −2Y − 2) = 19,2 ; corr(−2X − 3, −2Y − 2) = 0,6
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 1, var Y = 16 et cov(X, Y) = 1. Calcule la corrélation de X et Y, puis la covariance et la corrélation de X + 4 et 3Y + 4.
  [guided]  corr(X, Y)
    = 1/(□)   (trous : 1/(1·4))   ← σ_X = √1 = 1, σ_Y = √16 = 4
    = □   (trous : 0,25)   ← Calculer
  — cov(X + 4, 3Y + 4)  [juge prob]  départ : cov(X + 4,3Y + 4)
    = □·1   (trous : 1·3·1)   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = □   (trous : 3)   ← Calculer
  — corr(X + 4, 3Y + 4)  [juge prob]  départ : corr(X + 4,3Y + 4)
    = □   (trous : 0,25)   ← Le signe de a·c = 3 ; la corrélation garde sa taille
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | 1/(□×□) | corr(X, Y) = 0,25 ; cov(X + 4, 3Y + 4) = 3 ; corr(X + 4, 3Y + 4) = 0,25
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

```

### Niveau 3

```
On sait que var X = 1, var Y = 25 et E[X] = −2, E[Y] = 5, E[XY] = −8,75. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −3X − 3 et 3Y + 2.
  [tap, suivre l'erreur, menu menu]  cov(X, Y)
    = −8,75 − (−2)·5   ← cov = E[XY] − E[X]E[Y]
    = 1,25   ← Calculer
  — corr(X, Y)  [juge prob]  départ : corr(X, Y)
    = 1,25/(1·5)   ← σ_X = √1 = 1, σ_Y = √25 = 5
    = 0,25   ← Calculer
  — cov(−3X − 3, 3Y + 2)  [juge prob]  départ : cov(−3X − 3,3Y + 2)
    = (−3)·3·1,25   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = −11,25   ← Calculer
  — corr(−3X − 3, 3Y + 2)  [juge prob]  départ : corr(−3X − 3,3Y + 2)
    = −0,25   ← Le signe de a·c = −9 ; la corrélation garde sa taille
  — cov(X + Y, X − Y)  [juge prob]  départ : cov(X + Y, X − Y)
    = 1 − 25   ← Les termes cov(X, Y) s'annulent
    = −24   ← Calculer
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | 1,25/(□×□) | corr(X, Y) = 0,25 ; cov(−3X − 3, 3Y + 2) = −11,25 ; corr(−3X − 3, 3Y + 2) = −0,25
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 4, var Y = 16 et cov(X, Y) = 4. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −3X − 1 et Y − 4.
  [tap, suivre l'erreur, menu menu]  corr(X, Y)
    = 4/(2·4)   ← σ_X = √4 = 2, σ_Y = √16 = 4
    = 0,5   ← Calculer
  — cov(−3X − 1, Y − 4)  [juge prob]  départ : cov(−3X − 1, Y − 4)
    = (−3)·1·4   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = −12   ← Calculer
  — corr(−3X − 1, Y − 4)  [juge prob]  départ : corr(−3X − 1, Y − 4)
    = −0,5   ← Le signe de a·c = −3 ; la corrélation garde sa taille
  — cov(X + Y, X − Y)  [juge prob]  départ : cov(X + Y, X − Y)
    = 4 − 16   ← Les termes cov(X, Y) s'annulent
    = −12   ← Calculer
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | 4/(□×□) | corr(X, Y) = 0,5 ; cov(−3X − 1, Y − 4) = −12 ; corr(−3X − 1, Y − 4) = −0,5
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 1, var Y = 16 et E[X] = −1, E[Y] = −3, E[XY] = 6,2. Calcule la corrélation de X et Y, puis la covariance et la corrélation de 3X + 5 et −Y − 4.
  [tap, suivre l'erreur, menu menu]  cov(X, Y)
    = 6,2 − (−1)·(−3)   ← cov = E[XY] − E[X]E[Y]
    = 3,2   ← Calculer
  — corr(X, Y)  [juge prob]  départ : corr(X, Y)
    = 3,2/(1·4)   ← σ_X = √1 = 1, σ_Y = √16 = 4
    = 0,8   ← Calculer
  — cov(3X + 5, −Y − 4)  [juge prob]  départ : cov(3X + 5, −Y − 4)
    = 3·(−1)·3,2   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = −9,6   ← Calculer
  — corr(3X + 5, −Y − 4)  [juge prob]  départ : corr(3X + 5, −Y − 4)
    = −0,8   ← Le signe de a·c = −3 ; la corrélation garde sa taille
  — cov(X + Y, X − Y)  [juge prob]  départ : cov(X + Y, X − Y)
    = 1 − 16   ← Les termes cov(X, Y) s'annulent
    = −15   ← Calculer
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | 3,2/(□×□) | corr(X, Y) = 0,8 ; cov(3X + 5, −Y − 4) = −9,6 ; corr(3X + 5, −Y − 4) = −0,8
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

```

### Niveau 4

```
On sait que var X = 16, var Y = 4 et E[X] = −2, E[Y] = 1, E[XY] = −8,4. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −X − 2 et 3Y.
  [free, suivre l'erreur]  cov(X, Y)
    = −8,4 − (−2)·1   ← cov = E[XY] − E[X]E[Y]
    = −6,4   ← Calculer
  — corr(X, Y)  [juge prob]  départ : corr(X, Y)
    = (−6,4)/(4·2)   ← σ_X = √16 = 4, σ_Y = √4 = 2
    = −0,8   ← Calculer
  — cov(−X − 2, 3Y)  [juge prob]  départ : cov(−X − 2,3Y)
    = (−1)·3·(−6,4)   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = 19,2   ← Calculer
  — corr(−X − 2, 3Y)  [juge prob]  départ : corr(−X − 2,3Y)
    = 0,8   ← Le signe de a·c = −3 ; la corrélation garde sa taille
  — cov(X + Y, X − Y)  [juge prob]  départ : cov(X + Y, X − Y)
    = 16 − 4   ← Les termes cov(X, Y) s'annulent
    = 12   ← Calculer
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | (-6,4)/(□×□) | corr(X, Y) = −0,8 ; cov(−X − 2, 3Y) = 19,2 ; corr(−X − 2, 3Y) = 0,8
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 16, var Y = 16 et E[X] = 3, E[Y] = 4, E[XY] = 2,4. Calcule la corrélation de X et Y, puis la covariance et la corrélation de 2X + 3 et 2Y − 3.
  [free, suivre l'erreur]  cov(X, Y)
    = 2,4 − 3·4   ← cov = E[XY] − E[X]E[Y]
    = −9,6   ← Calculer
  — corr(X, Y)  [juge prob]  départ : corr(X, Y)
    = (−9,6)/(4·4)   ← σ_X = √16 = 4, σ_Y = √16 = 4
    = −0,6   ← Calculer
  — cov(2X + 3, 2Y − 3)  [juge prob]  départ : cov(2X + 3,2Y − 3)
    = 2·2·(−9,6)   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = −38,4   ← Calculer
  — corr(2X + 3, 2Y − 3)  [juge prob]  départ : corr(2X + 3,2Y − 3)
    = −0,6   ← Le signe de a·c = 4 ; la corrélation garde sa taille
  — cov(X + Y, X − Y)  [juge prob]  départ : cov(X + Y, X − Y)
    = 16 − 16   ← Les termes cov(X, Y) s'annulent
    = 0   ← Calculer
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | (-9,6)/(□×□) | corr(X, Y) = −0,6 ; cov(2X + 3, 2Y − 3) = −38,4 ; corr(2X + 3, 2Y − 3) = −0,6
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 25, var Y = 9 et E[X] = 3, E[Y] = 2, E[XY] = 17,25. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −2X − 1 et Y − 5.
  [free, suivre l'erreur]  cov(X, Y)
    = 17,25 − 3·2   ← cov = E[XY] − E[X]E[Y]
    = 11,25   ← Calculer
  — corr(X, Y)  [juge prob]  départ : corr(X, Y)
    = 11,25/(5·3)   ← σ_X = √25 = 5, σ_Y = √9 = 3
    = 0,75   ← Calculer
  — cov(−2X − 1, Y − 5)  [juge prob]  départ : cov(−2X − 1, Y − 5)
    = (−2)·1·11,25   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = −22,5   ← Calculer
  — corr(−2X − 1, Y − 5)  [juge prob]  départ : corr(−2X − 1, Y − 5)
    = −0,75   ← Le signe de a·c = −2 ; la corrélation garde sa taille
  — cov(X + Y, X − Y)  [juge prob]  départ : cov(X + Y, X − Y)
    = 25 − 9   ← Les termes cov(X, Y) s'annulent
    = 16   ← Calculer
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | 11,25/(□×□) | corr(X, Y) = 0,75 ; cov(−2X − 1, Y − 5) = −22,5 ; corr(−2X − 1, Y − 5) = −0,75
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

```

### Niveau 5

```
On sait que var X = 4, var Y = 16 et E[X] = 2, E[Y] = −1, E[XY] = 2. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −3X + 4 et 3Y − 4.
  [free, sans aide]  cov(X, Y)
    = 2 − 2·(−1)   ← cov = E[XY] − E[X]E[Y]
    = 4   ← Calculer
  — corr(X, Y)  [juge prob]  départ : corr(X, Y)
    = 4/(2·4)   ← σ_X = √4 = 2, σ_Y = √16 = 4
    = 0,5   ← Calculer
  — cov(−3X + 4, 3Y − 4)  [juge prob]  départ : cov(−3X + 4,3Y − 4)
    = (−3)·3·4   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = −36   ← Calculer
  — corr(−3X + 4, 3Y − 4)  [juge prob]  départ : corr(−3X + 4,3Y − 4)
    = −0,5   ← Le signe de a·c = −9 ; la corrélation garde sa taille
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 1, var Y = 16 et E[X] = −1, E[Y] = 0, E[XY] = 1,6. Calcule la corrélation de X et Y, puis la covariance et la corrélation de X − 4 et 3Y − 2.
  [free, sans aide]  cov(X, Y)
    = 1,6 − (−1)·0   ← cov = E[XY] − E[X]E[Y]
    = 1,6   ← Calculer
  — corr(X, Y)  [juge prob]  départ : corr(X, Y)
    = 1,6/(1·4)   ← σ_X = √1 = 1, σ_Y = √16 = 4
    = 0,4   ← Calculer
  — cov(X − 4, 3Y − 2)  [juge prob]  départ : cov(X − 4,3Y − 2)
    = 1·3·1,6   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = 4,8   ← Calculer
  — corr(X − 4, 3Y − 2)  [juge prob]  départ : corr(X − 4,3Y − 2)
    = 0,4   ← Le signe de a·c = 3 ; la corrélation garde sa taille
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 9, var Y = 4 et cov(X, Y) = 3,6. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −X et 2Y − 4.
  [free, sans aide]  corr(X, Y)
    = 3,6/(3·2)   ← σ_X = √9 = 3, σ_Y = √4 = 2
    = 0,6   ← Calculer
  — cov(−X, 2Y − 4)  [juge prob]  départ : cov(−X, 2Y − 4)
    = (−1)·2·3,6   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = −7,2   ← Calculer
  — corr(−X, 2Y − 4)  [juge prob]  départ : corr(−X, 2Y − 4)
    = −0,6   ← Le signe de a·c = −2 ; la corrélation garde sa taille
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

```

### Variantes d'examen

```
var X = 16, var Y = 1, cov(X, Y) = 3,2. Que vaut corr(2X + 1, −3Y + 5) ?
  · −4,8 [p_corr_scale]   · −19,2 [p_corr_scale]   · 0,8   ✔ −0,8
  [examen mcq]
  pièges : p_corr_scale

Vrai ou faux ?
  « Pour toutes variables X, Y de variances non nulles, −1 ≤ corr(X, Y) ≤ 1. » → VRAI
  [examen tf]

On sait que var X = 1, var Y = 4 et E[X] = 1, E[Y] = 0, E[XY] = 0,8. Que vaut la corrélation corr(X, Y) ?
  [free, sans aide, examen coef]  corr(X, Y)
    = 0,8/(1·2)   ← σ_X = √1 = 1, σ_Y = √4 = 2
    = 0,4   ← Calculer

```

## Espérance et variance totales (`p-total-expect`, BA3)

_Espérance et variance totales : E[X] = E[E[X | Y]] et var(X) = E[var(X | Y)] + var(E[X | Y])._

### Niveau 1

```
À un oral, Léa interroge avec la probabilité 0,3, Marc sinon. Avec Léa, chacune des 4 questions est réussie avec la probabilité 0,1 ; avec Marc, 0,2, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [guided]  E[N | Léa]
    (Quelle est la loi de N quand Léa interroge ? N | Léa ~ B(4 ; 0,1).)
    = 4·□   (trous : 4·0,1)   ← N | Léa ~ B(4 ; 0,1) : E = np
    = □   (trous : 0,4)   ← Calculer
  — E[N | Marc]  [juge prob]  départ : E[N | Marc]
    = 4·□   (trous : 4·0,2)   ← N | Marc ~ B(4 ; 0,2)
    = □   (trous : 0,8)   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = □·0,4 + □·0,8   (trous : 0,3·0,4 + 0,7·0,8)   ← E[N] = Σ E[N | y]·Pr(y)
    = □   (trous : 0,68)   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,3·4·0,1·□ + 0,7·4·0,2·□   (trous : 0,3·4·0,1·0,9 + 0,7·4·0,2·0,8)   ← var(N | y) = np(1 − p), pondérée
    = □   (trous : 0,556)   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,3·0,7·□   (trous : 0,3·0,7·(0,8 − 0,4)²)   ← Deux valeurs : π(1 − π)·(écart)²
    = □   (trous : 0,0336)   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 0,556 + □   (trous : 0,556 + 0,0336)   ← var = E[var(N | ·)] + var(E[N | ·])
    = □   (trous : 0,5896)   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,3×0,4+0,7×□ | E[N] = 0,68 ; var(N) = 0,556 + 0,0336 = 0,5896
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Mary interroge avec la probabilité 0,3, Frank sinon. Avec Mary, chacune des 3 questions est réussie avec la probabilité 0,1 ; avec Frank, 0,4, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [guided]  E[N | Mary]
    (Quelle est la loi de N quand Mary interroge ? N | Mary ~ B(3 ; 0,1).)
    = 3·□   (trous : 3·0,1)   ← N | Mary ~ B(3 ; 0,1) : E = np
    = □   (trous : 0,3)   ← Calculer
  — E[N | Frank]  [juge prob]  départ : E[N | Frank]
    = 3·□   (trous : 3·0,4)   ← N | Frank ~ B(3 ; 0,4)
    = □   (trous : 1,2)   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = □·0,3 + □·1,2   (trous : 0,3·0,3 + 0,7·1,2)   ← E[N] = Σ E[N | y]·Pr(y)
    = □   (trous : 0,93)   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,3·3·0,1·□ + 0,7·3·0,4·□   (trous : 0,3·3·0,1·0,9 + 0,7·3·0,4·0,6)   ← var(N | y) = np(1 − p), pondérée
    = □   (trous : 0,585)   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,3·0,7·□   (trous : 0,3·0,7·(1,2 − 0,3)²)   ← Deux valeurs : π(1 − π)·(écart)²
    = □   (trous : 0,1701)   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 0,585 + □   (trous : 0,585 + 0,1701)   ← var = E[var(N | ·)] + var(E[N | ·])
    = □   (trous : 0,7551)   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,3×0,3+0,7×□ | E[N] = 0,93 ; var(N) = 0,585 + 0,1701 = 0,7551
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Mary interroge avec la probabilité 0,8, Frank sinon. Avec Mary, chacune des 5 questions est réussie avec la probabilité 0,3 ; avec Frank, 0,1, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [guided]  E[N | Mary]
    (Quelle est la loi de N quand Mary interroge ? N | Mary ~ B(5 ; 0,3).)
    = 5·□   (trous : 5·0,3)   ← N | Mary ~ B(5 ; 0,3) : E = np
    = □   (trous : 1,5)   ← Calculer
  — E[N | Frank]  [juge prob]  départ : E[N | Frank]
    = 5·□   (trous : 5·0,1)   ← N | Frank ~ B(5 ; 0,1)
    = □   (trous : 0,5)   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = □·1,5 + □·0,5   (trous : 0,8·1,5 + 0,2·0,5)   ← E[N] = Σ E[N | y]·Pr(y)
    = □   (trous : 1,3)   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,8·5·0,3·□ + 0,2·5·0,1·□   (trous : 0,8·5·0,3·0,7 + 0,2·5·0,1·0,9)   ← var(N | y) = np(1 − p), pondérée
    = □   (trous : 0,93)   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,8·0,2·□   (trous : 0,8·0,2·(0,5 − 1,5)²)   ← Deux valeurs : π(1 − π)·(écart)²
    = □   (trous : 0,16)   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 0,93 + □   (trous : 0,93 + 0,16)   ← var = E[var(N | ·)] + var(E[N | ·])
    = □   (trous : 1,09)   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,8×1,5+0,2×□ | E[N] = 1,3 ; var(N) = 0,93 + 0,16 = 1,09
  pièges : p_total_expect_unweighted, p_total_var_forget

```

### Niveau 2

```
À un oral, Léa interroge avec la probabilité 0,6, Marc sinon. Avec Léa, chacune des 9 questions est réussie avec la probabilité 0,2 ; avec Marc, 0,3, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [guided]  E[N | Léa]
    ? Quelle est la loi de N quand Léa interroge ? ✔ N | Léa ~ B(9 ; 0,2) / · N | Léa ~ B(9 ; 0,12)
    = 9·□   (trous : 9·0,2)   ← N | Léa ~ B(9 ; 0,2) : E = np
    = □   (trous : 1,8)   ← Calculer
  — E[N | Marc]  [juge prob]  départ : E[N | Marc]
    = 9·□   (trous : 9·0,3)   ← N | Marc ~ B(9 ; 0,3)
    = □   (trous : 2,7)   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = □·1,8 + □·2,7   (trous : 0,6·1,8 + 0,4·2,7)   ← E[N] = Σ E[N | y]·Pr(y)
    = □   (trous : 2,16)   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,6·9·0,2·□ + 0,4·9·0,3·□   (trous : 0,6·9·0,2·0,8 + 0,4·9·0,3·0,7)   ← var(N | y) = np(1 − p), pondérée
    = □   (trous : 1,62)   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,6·0,4·□   (trous : 0,6·0,4·(2,7 − 1,8)²)   ← Deux valeurs : π(1 − π)·(écart)²
    = □   (trous : 0,1944)   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 1,62 + □   (trous : 1,62 + 0,1944)   ← var = E[var(N | ·)] + var(E[N | ·])
    = □   (trous : 1,8144)   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,6×1,8+0,4×□ | E[N] = 2,16 ; var(N) = 1,62 + 0,1944 = 1,8144
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Anne interroge avec la probabilité 0,8, Bruno sinon. Avec Anne, chacune des 3 questions est réussie avec la probabilité 0,3 ; avec Bruno, 0,7, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [guided]  E[N | Anne]
    ? Quelle est la loi de N quand Anne interroge ? ✔ N | Anne ~ B(3 ; 0,3) / · N | Anne ~ B(3 ; 0,24)
    = 3·□   (trous : 3·0,3)   ← N | Anne ~ B(3 ; 0,3) : E = np
    = □   (trous : 0,9)   ← Calculer
  — E[N | Bruno]  [juge prob]  départ : E[N | Bruno]
    = 3·□   (trous : 3·0,7)   ← N | Bruno ~ B(3 ; 0,7)
    = □   (trous : 2,1)   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = □·0,9 + □·2,1   (trous : 0,8·0,9 + 0,2·2,1)   ← E[N] = Σ E[N | y]·Pr(y)
    = □   (trous : 1,14)   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,8·3·0,3·□ + 0,2·3·0,7·□   (trous : 0,8·3·0,3·0,7 + 0,2·3·0,7·0,3)   ← var(N | y) = np(1 − p), pondérée
    = □   (trous : 0,63)   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,8·0,2·□   (trous : 0,8·0,2·(2,1 − 0,9)²)   ← Deux valeurs : π(1 − π)·(écart)²
    = □   (trous : 0,2304)   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 0,63 + □   (trous : 0,63 + 0,2304)   ← var = E[var(N | ·)] + var(E[N | ·])
    = □   (trous : 0,8604)   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,8×0,9+0,2×□ | E[N] = 1,14 ; var(N) = 0,63 + 0,2304 = 0,8604
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Anne interroge avec la probabilité 0,3, Bruno sinon. Avec Anne, chacune des 4 questions est réussie avec la probabilité 0,2 ; avec Bruno, 0,6, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [guided]  E[N | Anne]
    ? Quelle est la loi de N quand Anne interroge ? ✔ N | Anne ~ B(4 ; 0,2) / · N | Anne ~ B(4 ; 0,06)
    = 4·□   (trous : 4·0,2)   ← N | Anne ~ B(4 ; 0,2) : E = np
    = □   (trous : 0,8)   ← Calculer
  — E[N | Bruno]  [juge prob]  départ : E[N | Bruno]
    = 4·□   (trous : 4·0,6)   ← N | Bruno ~ B(4 ; 0,6)
    = □   (trous : 2,4)   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = □·0,8 + □·2,4   (trous : 0,3·0,8 + 0,7·2,4)   ← E[N] = Σ E[N | y]·Pr(y)
    = □   (trous : 1,92)   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,3·4·0,2·□ + 0,7·4·0,6·□   (trous : 0,3·4·0,2·0,8 + 0,7·4·0,6·0,4)   ← var(N | y) = np(1 − p), pondérée
    = □   (trous : 0,864)   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,3·0,7·□   (trous : 0,3·0,7·(2,4 − 0,8)²)   ← Deux valeurs : π(1 − π)·(écart)²
    = □   (trous : 0,5376)   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 0,864 + □   (trous : 0,864 + 0,5376)   ← var = E[var(N | ·)] + var(E[N | ·])
    = □   (trous : 1,4016)   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,3×0,8+0,7×□ | E[N] = 1,92 ; var(N) = 0,864 + 0,5376 = 1,4016
  pièges : p_total_expect_unweighted, p_total_var_forget

```

### Niveau 3

```
À un oral, Léa interroge avec la probabilité 0,7, Marc sinon. Avec Léa, chacune des 8 questions est réussie avec la probabilité 0,5 ; avec Marc, 0,4, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [tap, suivre l'erreur, menu menu]  E[N | Léa]
    ? Quelle est la loi de N quand Léa interroge ? ✔ N | Léa ~ B(8 ; 0,5) / · N | Léa ~ B(8 ; 0,35)
    = 8·0,5   ← N | Léa ~ B(8 ; 0,5) : E = np
    = 4   ← Calculer
  — E[N | Marc]  [juge prob]  départ : E[N | Marc]
    = 8·0,4   ← N | Marc ~ B(8 ; 0,4)
    = 3,2   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,7·4 + 0,3·3,2   ← E[N] = Σ E[N | y]·Pr(y)
    = 3,76   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,7·8·0,5·0,5 + 0,3·8·0,4·0,6   ← var(N | y) = np(1 − p), pondérée
    = 1,976   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,7·0,3·(3,2 − 4)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 0,1344   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 1,976 + 0,1344   ← var = E[var(N | ·)] + var(E[N | ·])
    = 2,1104   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,7×4+0,3×□ | E[N] = 3,76 ; var(N) = 1,976 + 0,1344 = 2,1104
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Anne interroge avec la probabilité 0,4, Bruno sinon. Avec Anne, chacune des 3 questions est réussie avec la probabilité 0,5 ; avec Bruno, 0,6, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [tap, suivre l'erreur, menu menu]  E[N | Anne]
    ? Quelle est la loi de N quand Anne interroge ? ✔ N | Anne ~ B(3 ; 0,5) / · N | Anne ~ B(3 ; 0,2)
    = 3·0,5   ← N | Anne ~ B(3 ; 0,5) : E = np
    = 1,5   ← Calculer
  — E[N | Bruno]  [juge prob]  départ : E[N | Bruno]
    = 3·0,6   ← N | Bruno ~ B(3 ; 0,6)
    = 1,8   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,4·1,5 + 0,6·1,8   ← E[N] = Σ E[N | y]·Pr(y)
    = 1,68   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,4·3·0,5·0,5 + 0,6·3·0,6·0,4   ← var(N | y) = np(1 − p), pondérée
    = 0,732   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,4·0,6·(1,8 − 1,5)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 0,0216   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 0,732 + 0,0216   ← var = E[var(N | ·)] + var(E[N | ·])
    = 0,7536   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,4×1,5+0,6×□ | E[N] = 1,68 ; var(N) = 0,732 + 0,0216 = 0,7536
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Léa interroge avec la probabilité 0,4, Marc sinon. Avec Léa, chacune des 7 questions est réussie avec la probabilité 0,2 ; avec Marc, 0,7, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [tap, suivre l'erreur, menu menu]  E[N | Léa]
    ? Quelle est la loi de N quand Léa interroge ? ✔ N | Léa ~ B(7 ; 0,2) / · N | Léa ~ B(7 ; 0,08)
    = 7·0,2   ← N | Léa ~ B(7 ; 0,2) : E = np
    = 1,4   ← Calculer
  — E[N | Marc]  [juge prob]  départ : E[N | Marc]
    = 7·0,7   ← N | Marc ~ B(7 ; 0,7)
    = 4,9   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,4·1,4 + 0,6·4,9   ← E[N] = Σ E[N | y]·Pr(y)
    = 3,5   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,4·7·0,2·0,8 + 0,6·7·0,7·0,3   ← var(N | y) = np(1 − p), pondérée
    = 1,33   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,4·0,6·(4,9 − 1,4)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 2,94   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 1,33 + 2,94   ← var = E[var(N | ·)] + var(E[N | ·])
    = 4,27   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,4×1,4+0,6×□ | E[N] = 3,5 ; var(N) = 1,33 + 2,94 = 4,27
  pièges : p_total_expect_unweighted, p_total_var_forget

```

### Niveau 4

```
À un oral, Mary interroge avec la probabilité 0,5, Frank sinon. Avec Mary, chacune des 8 questions est réussie avec la probabilité 0,3 ; avec Frank, 0,1, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [free, suivre l'erreur]  E[N | Mary]
    = 8·0,3   ← N | Mary ~ B(8 ; 0,3) : E = np
    = 2,4   ← Calculer
  — E[N | Frank]  [juge prob]  départ : E[N | Frank]
    = 8·0,1   ← N | Frank ~ B(8 ; 0,1)
    = 0,8   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,5·2,4 + 0,5·0,8   ← E[N] = Σ E[N | y]·Pr(y)
    = 1,6   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,5·8·0,3·0,7 + 0,5·8·0,1·0,9   ← var(N | y) = np(1 − p), pondérée
    = 1,2   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,5·0,5·(0,8 − 2,4)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 0,64   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 1,2 + 0,64   ← var = E[var(N | ·)] + var(E[N | ·])
    = 1,84   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,5×2,4+0,5×□ | E[N] = 1,6 ; var(N) = 1,2 + 0,64 = 1,84
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Léa interroge avec la probabilité 0,3, Marc sinon. Avec Léa, chacune des 3 questions est réussie avec la probabilité 0,7 ; avec Marc, 0,2, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [free, suivre l'erreur]  E[N | Léa]
    = 3·0,7   ← N | Léa ~ B(3 ; 0,7) : E = np
    = 2,1   ← Calculer
  — E[N | Marc]  [juge prob]  départ : E[N | Marc]
    = 3·0,2   ← N | Marc ~ B(3 ; 0,2)
    = 0,6   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,3·2,1 + 0,7·0,6   ← E[N] = Σ E[N | y]·Pr(y)
    = 1,05   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,3·3·0,7·0,3 + 0,7·3·0,2·0,8   ← var(N | y) = np(1 − p), pondérée
    = 0,525   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,3·0,7·(0,6 − 2,1)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 0,4725   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 0,525 + 0,4725   ← var = E[var(N | ·)] + var(E[N | ·])
    = 0,9975   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,3×2,1+0,7×□ | E[N] = 1,05 ; var(N) = 0,525 + 0,4725 = 0,9975
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Léa interroge avec la probabilité 0,3, Marc sinon. Avec Léa, chacune des 3 questions est réussie avec la probabilité 0,2 ; avec Marc, 0,4, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [free, suivre l'erreur]  E[N | Léa]
    = 3·0,2   ← N | Léa ~ B(3 ; 0,2) : E = np
    = 0,6   ← Calculer
  — E[N | Marc]  [juge prob]  départ : E[N | Marc]
    = 3·0,4   ← N | Marc ~ B(3 ; 0,4)
    = 1,2   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,3·0,6 + 0,7·1,2   ← E[N] = Σ E[N | y]·Pr(y)
    = 1,02   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,3·3·0,2·0,8 + 0,7·3·0,4·0,6   ← var(N | y) = np(1 − p), pondérée
    = 0,648   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,3·0,7·(1,2 − 0,6)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 0,0756   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 0,648 + 0,0756   ← var = E[var(N | ·)] + var(E[N | ·])
    = 0,7236   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,3×0,6+0,7×□ | E[N] = 1,02 ; var(N) = 0,648 + 0,0756 = 0,7236
  pièges : p_total_expect_unweighted, p_total_var_forget

```

### Niveau 5

```
À un oral, Mary interroge avec la probabilité 0,8, Frank sinon. Avec Mary, chacune des 8 questions est réussie avec la probabilité 0,4 ; avec Frank, 0,7, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [free, sans aide]  E[N | Mary]
    = 8·0,4   ← N | Mary ~ B(8 ; 0,4) : E = np
    = 3,2   ← Calculer
  — E[N | Frank]  [juge prob]  départ : E[N | Frank]
    = 8·0,7   ← N | Frank ~ B(8 ; 0,7)
    = 5,6   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,8·3,2 + 0,2·5,6   ← E[N] = Σ E[N | y]·Pr(y)
    = 3,68   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,8·8·0,4·0,6 + 0,2·8·0,7·0,3   ← var(N | y) = np(1 − p), pondérée
    = 1,872   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,8·0,2·(5,6 − 3,2)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 0,9216   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 1,872 + 0,9216   ← var = E[var(N | ·)] + var(E[N | ·])
    = 2,7936   ← Variance totale
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Mary interroge avec la probabilité 0,5, Frank sinon. Avec Mary, chacune des 7 questions est réussie avec la probabilité 0,6 ; avec Frank, 0,3, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [free, sans aide]  E[N | Mary]
    = 7·0,6   ← N | Mary ~ B(7 ; 0,6) : E = np
    = 4,2   ← Calculer
  — E[N | Frank]  [juge prob]  départ : E[N | Frank]
    = 7·0,3   ← N | Frank ~ B(7 ; 0,3)
    = 2,1   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,5·4,2 + 0,5·2,1   ← E[N] = Σ E[N | y]·Pr(y)
    = 3,15   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,5·7·0,6·0,4 + 0,5·7·0,3·0,7   ← var(N | y) = np(1 − p), pondérée
    = 1,575   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,5·0,5·(2,1 − 4,2)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 1,1025   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 1,575 + 1,1025   ← var = E[var(N | ·)] + var(E[N | ·])
    = 2,6775   ← Variance totale
  pièges : p_total_expect_unweighted, p_total_var_forget

Le retard R de Jo (en heures) suit U(0, 3). Sachant R, le retard X du bus suit U(0, R). Calcule E[X] et var(X) par les formules totales.
  [free, sans aide]  E[X]
    = (3/2)/2   ← E[X | R] = R/2, et E[R] = a/2
    = 0,75   ← Espérance totale
  — E[var(X | R)]  [juge prob]  départ : E[var(X | R)]
    = (9/3)/12   ← E[R²/12] = E[R²]/12
    = 0,25   ← Moyenne des variances
  — var(E[X | R])  [juge prob]  départ : var(E[X | R])
    = (9/12)/4   ← var(R) = a²/12
    = 0,1875   ← Variance des moyennes
  — var(X)  [juge prob]  départ : var(X)
    = 0,25 + 0,1875   ← Variance totale
    = 0,4375   ← Calculer
  pièges : p_total_var_forget

```

### Variantes d'examen

```
Mary interroge avec la probabilité 0,3, Frank sinon. Avec Mary, chacune des 9 questions est réussie avec la probabilité 0,8 ; avec Frank, 0,6, indépendamment. N = nombre de bonnes réponses. var(N) = ?
  ✔ 2,6244   · 1,8 [p_total_expect_unweighted]   · 1,944 [p_total_var_forget]   · 0,6804
  [examen mcq]
  pièges : p_total_var_forget, p_total_expect_unweighted

Vrai ou faux ?
  « Pour toutes variables X, Y : var(X) ≥ E[var(X | Y)]. » → VRAI
  [examen tf]

Le retard R de Jo (en heures) suit U(0, 2). Sachant R, le retard X du bus suit U(0, R). Calcule E[X] et var(X) par les formules totales.
  [free, sans aide, examen coef]  var(X)
    = 1/9 + 1/12   ← Variance totale
    = 7/36   ← Calculer
  pièges : p_total_var_forget

À un oral, Anne interroge avec la probabilité 0,8, Bruno sinon. Avec Anne, chacune des 7 questions est réussie avec la probabilité 0,2 ; avec Bruno, 0,4, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [problème, examen open, 10 points]
  partie 1 (E[N | Anne] : 2 ; E[N | Bruno] : 2 ; E[N] : 1,5 ; E[var(N | ·)] : 1,5 ; var(E[N | ·]) : 1,5 ; var(N) : 1,5)
  À un oral, Anne interroge avec la probabilité 0,8, Bruno sinon. Avec Anne, chacune des 7 questions est réussie avec la probabilité 0,2 ; avec Bruno, 0,4, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
    [free, sans aide, suivre l'erreur, examen open]  E[N | Anne]
      = 7·0,2   ← N | Anne ~ B(7 ; 0,2) : E = np
      = 1,4   ← Calculer
    — E[N | Bruno]  [juge prob]  départ : E[N | Bruno]
      = 7·0,4   ← N | Bruno ~ B(7 ; 0,4)
      = 2,8   ← Calculer
    — E[N]  [juge prob]  départ : E[N]
      = 0,8·1,4 + 0,2·2,8   ← E[N] = Σ E[N | y]·Pr(y)
      = 1,68   ← Espérance totale
    — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
      = 0,8·7·0,2·0,8 + 0,2·7·0,4·0,6   ← var(N | y) = np(1 − p), pondérée
      = 1,232   ← Moyenne des variances
    — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
      = 0,8·0,2·(2,8 − 1,4)²   ← Deux valeurs : π(1 − π)·(écart)²
      = 0,3136   ← Variance des moyennes
    — var(N)  [juge prob]  départ : var(N)
      = 1,232 + 0,3136   ← var = E[var(N | ·)] + var(E[N | ·])
      = 1,5456   ← Variance totale
  pièges : p_total_expect_unweighted, p_total_var_forget

```

## Densité d'une somme ; mélange de gaussiennes (`p-sum-mixture`, BA4)

_La loi d'une somme de variables indépendantes (convolution), et la différence entre un mélange et une somme pondérée._

### Niveau 1

```
On lance deux dés équilibrés à 6 faces, indépendants ; S est la somme. Calcule Pr(S = 5) par la convolution p_S(5) = Σ p(i)·p(5 − i).
  [guided]  nombredecouples
    (Couples : (1, 4), (2, 3), (3, 2), (4, 1).)
    = □ + 1 + 1 + 1   (trous : 1 + 1 + 1 + 1)   ← Un terme 1/f² par couple possible
    = □   (trous : 4)   ← Compter
  — Pr(S=5)  [juge prob]  départ : Pr(S = 5)
    = 4/□   (trous : 4/36)   ← 6² = 36 couples équiprobables
    = 1/9   ← Simplifier
  aides : p_S(z) = Σᵢ p(i)·p(z − i) : un terme par couple (i, z − i) possible. | □/36 | Pr(S = 5) = 1/9
  pièges : g7_laplace_not_equiprobable

On lance deux dés équilibrés à 4 faces, indépendants ; S est la somme. Calcule Pr(S = 4) par la convolution p_S(4) = Σ p(i)·p(4 − i).
  [guided]  nombredecouples
    (Couples : (1, 3), (2, 2), (3, 1).)
    = □ + 1 + 1   (trous : 1 + 1 + 1)   ← Un terme 1/f² par couple possible
    = □   (trous : 3)   ← Compter
  — Pr(S=4)  [juge prob]  départ : Pr(S = 4)
    = 3/□   (trous : 3/16)   ← 4² = 16 couples équiprobables
  aides : p_S(z) = Σᵢ p(i)·p(z − i) : un terme par couple (i, z − i) possible. | □/16 | Pr(S = 4) = 0,1875
  pièges : g7_laplace_not_equiprobable

On lance deux dés équilibrés à 4 faces, indépendants ; S est la somme. Calcule Pr(S = 3) par la convolution p_S(3) = Σ p(i)·p(3 − i).
  [guided]  nombredecouples
    (Couples : (1, 2), (2, 1).)
    = □ + 1   (trous : 1 + 1)   ← Un terme 1/f² par couple possible
    = □   (trous : 2)   ← Compter
  — Pr(S=3)  [juge prob]  départ : Pr(S = 3)
    = 2/□   (trous : 2/16)   ← 4² = 16 couples équiprobables
    = 0,125   ← Simplifier
  aides : p_S(z) = Σᵢ p(i)·p(z − i) : un terme par couple (i, z − i) possible. | □/16 | Pr(S = 3) = 0,125
  pièges : g7_laplace_not_equiprobable

```

### Niveau 2

```
X et Y sont indépendantes, de loi U(0, 1). Calcule la densité de Z = X + Y en z = 0,5 : f_Z(z) = ∫ f_X(z − y)·f_Y(y) dy.
  [guided]  f_Z(0,5)
    ? Pour z = 0,5, sur quel intervalle y doit-il varier ? ✔ y ∈ [0 ; 0,5] : il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 / · y ∈ [0 ; 1], comme f_Y / · Pas d'intégrale : f_Z = f_X + f_Y
    = 0,5 − 0   ← ∫ de 0 à 0,5 de 1 dy
    = □   (trous : 0,5)   ← Densité en triangle
  aides : Il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 : y va de max(0, z − 1) à min(1, z). | 0,5-□ | f_Z(0,5) = 0,5
  pièges : p_conv_bounds, p_sum_density_add

On lance deux dés équilibrés à 6 faces, indépendants ; S est la somme. Calcule Pr(S = 8) par la convolution p_S(8) = Σ p(i)·p(8 − i).
  [guided]  nombredecouples
    (Couples : (2, 6), (3, 5), (4, 4), (5, 3), (6, 2).)
    = □ + 1 + 1 + 1 + 1   (trous : 1 + 1 + 1 + 1 + 1)   ← Un terme 1/f² par couple possible
    = □   (trous : 5)   ← Compter
  — Pr(S=8)  [juge prob]  départ : Pr(S = 8)
    = 5/□   (trous : 5/36)   ← 6² = 36 couples équiprobables
  aides : p_S(z) = Σᵢ p(i)·p(z − i) : un terme par couple (i, z − i) possible. | □/36 | Pr(S = 8) = 5/36
  pièges : g7_laplace_not_equiprobable

On lance deux dés équilibrés à 6 faces, indépendants ; S est la somme. Calcule Pr(S = 5) par la convolution p_S(5) = Σ p(i)·p(5 − i).
  [guided]  nombredecouples
    (Couples : (1, 4), (2, 3), (3, 2), (4, 1).)
    = □ + 1 + 1 + 1   (trous : 1 + 1 + 1 + 1)   ← Un terme 1/f² par couple possible
    = □   (trous : 4)   ← Compter
  — Pr(S=5)  [juge prob]  départ : Pr(S = 5)
    = 4/□   (trous : 4/36)   ← 6² = 36 couples équiprobables
    = 1/9   ← Simplifier
  aides : p_S(z) = Σᵢ p(i)·p(z − i) : un terme par couple (i, z − i) possible. | □/36 | Pr(S = 5) = 1/9
  pièges : g7_laplace_not_equiprobable

```

### Niveau 3

```
X et Y sont indépendantes, de loi U(0, 1). Calcule la densité de Z = X + Y en z = 0,8 : f_Z(z) = ∫ f_X(z − y)·f_Y(y) dy.
  [tap, suivre l'erreur, menu menu]  f_Z(0,8)
    ? Pour z = 0,8, sur quel intervalle y doit-il varier ? ✔ y ∈ [0 ; 0,8] : il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 / · y ∈ [0 ; 1], comme f_Y / · Pas d'intégrale : f_Z = f_X + f_Y
    = 0,8 − 0   ← ∫ de 0 à 0,8 de 1 dy
    = 0,8   ← Densité en triangle
  aides : Il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 : y va de max(0, z − 1) à min(1, z). | 0,8-□ | f_Z(0,8) = 0,8
  pièges : p_conv_bounds, p_sum_density_add

X et Y sont indépendantes, de loi U(0, 1). Calcule la densité de Z = X + Y en z = 1,9 : f_Z(z) = ∫ f_X(z − y)·f_Y(y) dy.
  [tap, suivre l'erreur, menu menu]  f_Z(1,9)
    ? Pour z = 1,9, sur quel intervalle y doit-il varier ? ✔ y ∈ [0,9 ; 1] : il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 / · y ∈ [0 ; 1], comme f_Y / · Pas d'intégrale : f_Z = f_X + f_Y
    = 1 − 0,9   ← ∫ de 0,9 à 1 de 1 dy
    = 0,1   ← Densité en triangle
  aides : Il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 : y va de max(0, z − 1) à min(1, z). | 1-□ | f_Z(1,9) = 0,1
  pièges : p_conv_bounds, p_sum_density_add

X est un mélange : avec la probabilité 0,3 on tire X selon N(2, 1), sinon selon N(−2, 1). Calcule E[X], E[X²] et var(X).
  [tap, suivre l'erreur, menu menu]  E[X]
    = 0,3·2 + 0,7·(−2)   ← E = Σ πₖμₖ
    = −0,8   ← Calculer
  — E[X²]  [juge prob]  départ : E[X²]
    = 0,3·(1 + 2²) + 0,7·(1 + (−2)²)   ← E[X²] = Σ πₖ(σₖ² + μₖ²)
    = 5   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 5 − (−0,8)²   ← var = E[X²] − E[X]²
    = 4,36   ← Variance du mélange
  aides : Un mélange choisit une composante : E[X²] = Σ πₖ(σₖ² + μₖ²), puis var = E[X²] − E[X]². | 0,3×(1+2^2)+□ | var(X) = 4,36
  pièges : p_mixture_vs_sum

```

### Niveau 4

```
X est un mélange : avec la probabilité 0,2 on tire X selon N(5, 1), sinon selon N(4, 1). Calcule E[X], E[X²] et var(X), puis la variance de la somme pondérée 0,2X₁ + 0,8X₂ (X₁ ~ N(5, 1), X₂ ~ N(4, 1) indépendantes).
  [free, suivre l'erreur]  E[X]
    = 0,2·5 + 0,8·4   ← E = Σ πₖμₖ
    = 4,2   ← Calculer
  — E[X²]  [juge prob]  départ : E[X²]
    = 0,2·(1 + 5²) + 0,8·(1 + 4²)   ← E[X²] = Σ πₖ(σₖ² + μₖ²)
    = 18,8   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 18,8 − 4,2²   ← var = E[X²] − E[X]²
    = 1,16   ← Variance du mélange
  — var(0,2X₁ + 0,8X₂)  [juge prob]  départ : var(0,2X_1 + 0,8X_2)
    = 0,2²·1 + 0,8²·1   ← Variables indépendantes : les coefficients au carré
    = 0,68   ← Un autre objet que le mélange
  aides : Un mélange choisit une composante : E[X²] = Σ πₖ(σₖ² + μₖ²), puis var = E[X²] − E[X]². | 0,2×(1+5^2)+□ | var(X) = 1,16
  pièges : p_mixture_vs_sum

X et Y sont indépendantes, de loi exp(1). Calcule la densité de Z = X + Y pour z > 0 (convolution).
  [free, suivre l'erreur]  f_Z(z)
    (f_Z(z) = ∫₀ᶻ f_X(z − y)·f_Y(y) dy : f_X(z − y) > 0 demande y  0 demande y > 0. L'intégrande vaut e^(−z) : elle ne dépend plus de y.)
    = z·e^(−z)   ← Z ~ Γ(2, 1/λ)
  aides : f_Z(z) = ∫ f_X(z − y)·f_Y(y) dy, avec 0 < y < z. | L'intégrande ne dépend pas de y : on intègre une constante de 0 à z. | f_Z(z) = z×e^(-z)
  pièges : p_sum_density_add

X et Y sont indépendantes, de loi U(0, 1). Calcule la densité de Z = X + Y en z = 0,3 : f_Z(z) = ∫ f_X(z − y)·f_Y(y) dy.
  [free, suivre l'erreur]  f_Z(0,3)
    ? Pour z = 0,3, sur quel intervalle y doit-il varier ? ✔ y ∈ [0 ; 0,3] : il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 / · y ∈ [0 ; 1], comme f_Y / · Pas d'intégrale : f_Z = f_X + f_Y
    = 0,3 − 0   ← ∫ de 0 à 0,3 de 1 dy
    = 0,3   ← Densité en triangle
  aides : Il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 : y va de max(0, z − 1) à min(1, z). | 0,3-□ | f_Z(0,3) = 0,3
  pièges : p_conv_bounds, p_sum_density_add

```

### Niveau 5

```
X est un mélange : avec la probabilité 0,2 on tire X selon N(3, 1), sinon selon N(5, 1). Calcule E[X], E[X²] et var(X), puis la variance de la somme pondérée 0,2X₁ + 0,8X₂ (X₁ ~ N(3, 1), X₂ ~ N(5, 1) indépendantes).
  [free, sans aide]  E[X]
    = 0,2·3 + 0,8·5   ← E = Σ πₖμₖ
    = 4,6   ← Calculer
  — E[X²]  [juge prob]  départ : E[X²]
    = 0,2·(1 + 3²) + 0,8·(1 + 5²)   ← E[X²] = Σ πₖ(σₖ² + μₖ²)
    = 22,8   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 22,8 − 4,6²   ← var = E[X²] − E[X]²
    = 1,64   ← Variance du mélange
  — var(0,2X₁ + 0,8X₂)  [juge prob]  départ : var(0,2X_1 + 0,8X_2)
    ? Lequel des deux a un histogramme à deux bosses (si les moyennes sont loin) ? ✔ Le mélange : il choisit une composante, puis tire autour de sa moyenne / · La somme pondérée
    = 0,2²·1 + 0,8²·1   ← Variables indépendantes : les coefficients au carré
    = 0,68   ← Un autre objet que le mélange
  pièges : p_mixture_vs_sum

X est un mélange : avec la probabilité 0,5 on tire X selon N(−1, 1), sinon selon N(3, 4). Calcule E[X], E[X²] et var(X), puis la variance de la somme pondérée 0,5X₁ + 0,5X₂ (X₁ ~ N(−1, 1), X₂ ~ N(3, 4) indépendantes).
  [free, sans aide]  E[X]
    = 0,5·(−1) + 0,5·3   ← E = Σ πₖμₖ
    = 1   ← Calculer
  — E[X²]  [juge prob]  départ : E[X²]
    = 0,5·(1 + (−1)²) + 0,5·(4 + 3²)   ← E[X²] = Σ πₖ(σₖ² + μₖ²)
    = 7,5   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 7,5 − 1²   ← var = E[X²] − E[X]²
    = 6,5   ← Variance du mélange
  — var(0,5X₁ + 0,5X₂)  [juge prob]  départ : var(0,5X_1 + 0,5X_2)
    ? Lequel des deux a un histogramme à deux bosses (si les moyennes sont loin) ? ✔ Le mélange : il choisit une composante, puis tire autour de sa moyenne / · La somme pondérée
    = 0,5²·1 + 0,5²·4   ← Variables indépendantes : les coefficients au carré
    = 1,25   ← Un autre objet que le mélange
  pièges : p_mixture_vs_sum

X est un mélange : avec la probabilité 0,5 on tire X selon N(4, 4), sinon selon N(3, 1). Calcule E[X], E[X²] et var(X), puis la variance de la somme pondérée 0,5X₁ + 0,5X₂ (X₁ ~ N(4, 4), X₂ ~ N(3, 1) indépendantes).
  [free, sans aide]  E[X]
    = 0,5·4 + 0,5·3   ← E = Σ πₖμₖ
    = 3,5   ← Calculer
  — E[X²]  [juge prob]  départ : E[X²]
    = 0,5·(4 + 4²) + 0,5·(1 + 3²)   ← E[X²] = Σ πₖ(σₖ² + μₖ²)
    = 15   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 15 − 3,5²   ← var = E[X²] − E[X]²
    = 2,75   ← Variance du mélange
  — var(0,5X₁ + 0,5X₂)  [juge prob]  départ : var(0,5X_1 + 0,5X_2)
    ? Lequel des deux a un histogramme à deux bosses (si les moyennes sont loin) ? ✔ Le mélange : il choisit une composante, puis tire autour de sa moyenne / · La somme pondérée
    = 0,5²·4 + 0,5²·1   ← Variables indépendantes : les coefficients au carré
    = 1,25   ← Un autre objet que le mélange
  pièges : p_mixture_vs_sum

```

### Variantes d'examen

```
X suit le mélange 0,2·N(5, 1) + 0,8·N(3, 4). Que vaut var(X) ?
  · 3,4   · 15,6   ✔ 4,04   · 2,6 [p_mixture_vs_sum]
  [examen mcq]
  pièges : p_mixture_vs_sum

Vrai ou faux ?
  « L'espérance du mélange π·N(μ₁, σ₁²) + (1 − π)·N(μ₂, σ₂²) est πμ₁ + (1 − π)μ₂. » → VRAI
  [examen tf]

```

## Markov, Tchebychev, loi des grands nombres (`p-markov-cheb`, BA3)

_Les bornes de Markov et de Tchebychev, et ce que dit (ou ne dit pas) la loi des grands nombres._

### Niveau 1

```
Y a pour moyenne 80 et pour écart-type 10. Majore Pr(|Y − 80| ≥ 50).
  [guided]  k
    (Quelle inégalité ? Tchebychev : on connaît μ et σ.)
    = 50/□   (trous : 50/10)   ← L'écart 50 vaut k écarts-types
    = □   (trous : 5)   ← k = 5
  — Pr(|Y−80|≥50)  [juge prob]  départ : Pr(|Y − 80| ≥ 50)
    = 1/□   (trous : 1/5²)   ← Pr(|Y − μ| ≥ kσ) ≤ 1/k²
    = 1/□   (trous : 1/25)   ← La borne
  aides : Compte combien d'écarts-types fait l'écart, puis 1/k². | 1/□^2 | Pr ≤ 1/25
  pièges : p_chebyshev_k, p_markov_negative, p_gambler, p_lln_count

Le temps d'attente X (en minutes) à un guichet est positif, d'espérance 7. Majore Pr(X ≥ 42).
  [guided]  Pr(X ≥ 42)
    (Quelle inégalité ? Markov : X ≥ 0 et on connaît E[X].)
    = □/42   (trous : 7/42)   ← Pr(X ≥ a) ≤ E[X]/a
    = □   (trous : 1/6)   ← Calculer
  aides : X ≥ 0 et E[X] connue : Markov, Pr(X ≥ a) ≤ E[X]/a. | □/42 | Pr(X ≥ 42) ≤ 1/6
  pièges : p_gambler, p_lln_count, p_markov_negative

Y a pour moyenne 120 et pour écart-type 10. Majore Pr(|Y − 120| ≥ 50).
  [guided]  k
    (Quelle inégalité ? Tchebychev : on connaît μ et σ.)
    = 50/□   (trous : 50/10)   ← L'écart 50 vaut k écarts-types
    = □   (trous : 5)   ← k = 5
  — Pr(|Y−120|≥50)  [juge prob]  départ : Pr(|Y − 120| ≥ 50)
    = 1/□   (trous : 1/5²)   ← Pr(|Y − μ| ≥ kσ) ≤ 1/k²
    = 1/□   (trous : 1/25)   ← La borne
  aides : Compte combien d'écarts-types fait l'écart, puis 1/k². | 1/□^2 | Pr ≤ 1/25
  pièges : p_chebyshev_k, p_markov_negative, p_gambler, p_lln_count

```

### Niveau 2

```
Y a pour moyenne 50 et pour écart-type 10. Majore Pr(|Y − 50| ≥ 30).
  [guided]  k
    ? Quelle inégalité ? ✔ Tchebychev : on connaît μ et σ / · Markov
    = 30/□   (trous : 30/10)   ← L'écart 30 vaut k écarts-types
    = □   (trous : 3)   ← k = 3
  — Pr(|Y−50|≥30)  [juge prob]  départ : Pr(|Y − 50| ≥ 30)
    = 1/□   (trous : 1/3²)   ← Pr(|Y − μ| ≥ kσ) ≤ 1/k²
    = 1/□   (trous : 1/9)   ← La borne
  aides : Compte combien d'écarts-types fait l'écart, puis 1/k². | 1/□^2 | Pr ≤ 1/9
  pièges : p_chebyshev_k, p_markov_negative, p_gambler, p_lln_count

Y a pour moyenne 90 et pour écart-type 5. Majore Pr(|Y − 90| ≥ 10).
  [guided]  k
    ? Quelle inégalité ? ✔ Tchebychev : on connaît μ et σ / · Markov
    = 10/□   (trous : 10/5)   ← L'écart 10 vaut k écarts-types
    = □   (trous : 2)   ← k = 2
  — Pr(|Y−90|≥10)  [juge prob]  départ : Pr(|Y − 90| ≥ 10)
    = 1/□   (trous : 1/2²)   ← Pr(|Y − μ| ≥ kσ) ≤ 1/k²
    = 1/□   (trous : 1/4)   ← La borne
  aides : Compte combien d'écarts-types fait l'écart, puis 1/k². | 1/□^2 | Pr ≤ 1/4
  pièges : p_chebyshev_k, p_markov_negative, p_gambler, p_lln_count

Y a pour moyenne 40 et pour écart-type 10. Majore Pr(|Y − 40| ≥ 20).
  [guided]  k
    ? Quelle inégalité ? ✔ Tchebychev : on connaît μ et σ / · Markov
    = 20/□   (trous : 20/10)   ← L'écart 20 vaut k écarts-types
    = □   (trous : 2)   ← k = 2
  — Pr(|Y−40|≥20)  [juge prob]  départ : Pr(|Y − 40| ≥ 20)
    = 1/□   (trous : 1/2²)   ← Pr(|Y − μ| ≥ kσ) ≤ 1/k²
    = 1/□   (trous : 1/4)   ← La borne
  aides : Compte combien d'écarts-types fait l'écart, puis 1/k². | 1/□^2 | Pr ≤ 1/4
  pièges : p_chebyshev_k, p_markov_negative, p_gambler, p_lln_count

```

### Niveau 3

```
La durée de vie X d'une ampoule (en mois) est positive, d'espérance 6. Majore Pr(X ≥ 12).
  [tap, suivre l'erreur, menu menu]  Pr(X ≥ 12)
    ? Quelle inégalité ? ✔ Markov : X ≥ 0 et on connaît E[X] / · Tchebychev
    = 6/12   ← Pr(X ≥ a) ≤ E[X]/a
    = 0,5   ← Calculer
  aides : X ≥ 0 et E[X] connue : Markov, Pr(X ≥ a) ≤ E[X]/a. | □/12 | Pr(X ≥ 12) ≤ 0,5
  pièges : p_gambler, p_lln_count, p_markov_negative

Y a pour moyenne 110 et pour écart-type 10. Majore Pr(|Y − 110| ≥ 30), puis compare à la valeur exacte si Y est normale.
  [tap, suivre l'erreur, menu menu]  k
    ? Quelle inégalité ? ✔ Tchebychev : on connaît μ et σ / · Markov
    = 30/10   ← L'écart 30 vaut k écarts-types
    = 3   ← k = 3
  — Pr(|Y−110|≥30)  [juge prob]  départ : Pr(|Y − 110| ≥ 30)
    = 1/3²   ← Pr(|Y − μ| ≥ kσ) ≤ 1/k²
    = 1/9   ← La borne
  — Pr si Y ~ N  [juge stat]  départ : Pr si Y ~ N
    = 2·(1 − Φ(3))   ← Si Y est normale, deux queues
    = 0,0027   ← La borne de Tchebychev est large
  aides : Compte combien d'écarts-types fait l'écart, puis 1/k². | 1/□^2 | Pr ≤ 1/9
  pièges : p_chebyshev_k, p_markov_negative, p_gambler, p_lln_count

Le nombre X de clients en une heure est positif, d'espérance 12. Majore Pr(X ≥ 60).
  [tap, suivre l'erreur, menu menu]  Pr(X ≥ 60)
    ? Quelle inégalité ? ✔ Markov : X ≥ 0 et on connaît E[X] / · Tchebychev
    = 12/60   ← Pr(X ≥ a) ≤ E[X]/a
    = 0,2   ← Calculer
  aides : X ≥ 0 et E[X] connue : Markov, Pr(X ≥ a) ≤ E[X]/a. | □/60 | Pr(X ≥ 60) ≤ 0,2
  pièges : p_gambler, p_lln_count, p_markov_negative

```

### Niveau 4

```
La durée de vie X d'une ampoule (en mois) est positive, d'espérance 15. Majore Pr(X ≥ 45).
  [free, suivre l'erreur]  Pr(X ≥ 45)
    ? Quelle inégalité ? ✔ Markov : X ≥ 0 et on connaît E[X] / · Tchebychev
    = 15/45   ← Pr(X ≥ a) ≤ E[X]/a
    = 1/3   ← Calculer
  aides : X ≥ 0 et E[X] connue : Markov, Pr(X ≥ a) ≤ E[X]/a. | □/45 | Pr(X ≥ 45) ≤ 1/3
  pièges : p_gambler, p_lln_count, p_markov_negative

La durée de vie X d'une ampoule (en mois) est positive, d'espérance 6. Majore Pr(X ≥ 18).
  [free, suivre l'erreur]  Pr(X ≥ 18)
    ? Quelle inégalité ? ✔ Markov : X ≥ 0 et on connaît E[X] / · Tchebychev
    = 6/18   ← Pr(X ≥ a) ≤ E[X]/a
    = 1/3   ← Calculer
  aides : X ≥ 0 et E[X] connue : Markov, Pr(X ≥ a) ≤ E[X]/a. | □/18 | Pr(X ≥ 18) ≤ 1/3
  pièges : p_gambler, p_lln_count, p_markov_negative

Des mesures iid ont un écart-type σ = 5. Par Tchebychev, combien en faut-il au moins pour que Pr(|X̄ − μ| ≥ 0,1) ≤ 0,1 ?
  [free, suivre l'erreur]  σ²/(δε²)
    = 25/(0,1·0,1²)   ← var(X̄) = σ²/n ; il faut σ²/(nε²) ≤ δ
    = 25000   ← Calculer
  — n  [juge prob]  départ : n
    = 25000   ← n ≥ σ²/(δε²)
  aides : var(X̄) = σ²/n ; Tchebychev donne Pr(|X̄ − μ| ≥ ε) ≤ σ²/(nε²), à rendre ≤ δ. | 25/(0,1×□) | n ≥ 25000
  pièges : p_gambler, p_lln_count, p_markov_negative

```

### Niveau 5

```
Y a pour moyenne 100 et pour écart-type 5. Majore Pr(|Y − 100| ≥ 15), puis compare à la valeur exacte si Y est normale.
  [free, sans aide]  k
    ? Quelle inégalité ? ✔ Tchebychev : on connaît μ et σ / · Markov
    = 15/5   ← L'écart 15 vaut k écarts-types
    = 3   ← k = 3
  — Pr(|Y−100|≥15)  [juge prob]  départ : Pr(|Y − 100| ≥ 15)
    = 1/3²   ← Pr(|Y − μ| ≥ kσ) ≤ 1/k²
    = 1/9   ← La borne
  — Pr si Y ~ N  [juge stat]  départ : Pr si Y ~ N
    = 2·(1 − Φ(3))   ← Si Y est normale, deux queues
    = 0,0027   ← La borne de Tchebychev est large
  pièges : p_chebyshev_k, p_markov_negative, p_gambler, p_lln_count

Y a pour moyenne 100 et pour écart-type 5. Majore Pr(|Y − 100| ≥ 15), puis compare à la valeur exacte si Y est normale.
  [free, sans aide]  k
    ? Quelle inégalité ? ✔ Tchebychev : on connaît μ et σ / · Markov
    = 15/5   ← L'écart 15 vaut k écarts-types
    = 3   ← k = 3
  — Pr(|Y−100|≥15)  [juge prob]  départ : Pr(|Y − 100| ≥ 15)
    = 1/3²   ← Pr(|Y − μ| ≥ kσ) ≤ 1/k²
    = 1/9   ← La borne
  — Pr si Y ~ N  [juge stat]  départ : Pr si Y ~ N
    = 2·(1 − Φ(3))   ← Si Y est normale, deux queues
    = 0,0027   ← La borne de Tchebychev est large
  pièges : p_chebyshev_k, p_markov_negative, p_gambler, p_lln_count

Des mesures iid ont un écart-type σ = 1. Par Tchebychev, combien en faut-il au moins pour que Pr(|X̄ − μ| ≥ 0,5) ≤ 0,1 ?
  [free, sans aide]  σ²/(δε²)
    = 1/(0,1·0,5²)   ← var(X̄) = σ²/n ; il faut σ²/(nε²) ≤ δ
    = 40   ← Calculer
  — n  [juge prob]  départ : n
    = 40   ← n ≥ σ²/(δε²)
  pièges : p_gambler, p_lln_count, p_markov_negative

```

### Variantes d'examen

```
Y a pour moyenne 120 et pour écart-type 2. Quelle est la meilleure borne que donne Tchebychev pour Pr(|Y − 120| ≥ 6) ?
  ✔ ≤ 1/9   · ≤ 120/126 [p_markov_negative]   · ≤ 1/3 [p_chebyshev_k]   · ≤ 1/6
  [examen mcq]
  pièges : p_chebyshev_k, p_markov_negative

Vrai ou faux ?
  « Pour toute variable aléatoire X (pas forcément positive) et tout a > 0, Pr(X ≥ a) ≤ E[X]/a. » → FAUX
    contre-exemple (refute) : c = -1, a = 1
  [examen tf]
  pièges : p_markov_negative

Des mesures iid ont un écart-type σ = 1. Par Tchebychev, combien en faut-il au moins pour que Pr(|X̄ − μ| ≥ 0,1) ≤ 0,05 ?
  [free, sans aide, examen coef]  n
    = 2000   ← n ≥ σ²/(δε²)

```

## Théorème central limite pour une somme ou une moyenne (`p-clt-sum`, BA3)

_Le théorème central limite pour une somme ou une moyenne : E[S] = nμ, sd(S) = σ√n, puis la table de Φ._

### Niveau 1

```
Un camion charge 64 colis ; un colis pèse en moyenne 30 kg, avec un écart-type de 20 kg. Par le théorème central limite, quelle est la probabilité approchée que la charge dépasse 2200 kg ?
  [guided]  E[S]
    (Peut-on approcher la loi de la somme par une loi normale ? Oui : n variables indépendantes de même loi, et n est grand.)
    = 64·□   (trous : 64·30)   ← E[S] = nμ
    = □   (trous : 1920)   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = □·20   (trous : √64·20)   ← var(S) = nσ², donc sd(S) = σ√n
    = □   (trous : 160)   ← Calculer
  — z  [juge stat]  départ : z
    = (2200 − □)/160   (trous : (2200 − 1920)/160)   ← z = (s − E[S])/sd(S)
    = □   (trous : 1,75)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,96)   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − □   (trous : 1 − 0,96)   ← Pr(S > s) ≈ 1 − Φ(z)
    = □   (trous : 0,04)   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (2200-1920)/□ | z = 1,75 ; Pr ≈ 1 − Φ(1,75) = 0,04
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un camion charge 100 colis ; un colis pèse en moyenne 57 kg, avec un écart-type de 10 kg. Par le théorème central limite, quelle est la probabilité approchée que la charge dépasse 5750 kg ?
  [guided]  E[S]
    (Peut-on approcher la loi de la somme par une loi normale ? Oui : n variables indépendantes de même loi, et n est grand.)
    = 100·□   (trous : 100·57)   ← E[S] = nμ
    = □   (trous : 5700)   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = □·10   (trous : √100·10)   ← var(S) = nσ², donc sd(S) = σ√n
    = □   (trous : 100)   ← Calculer
  — z  [juge stat]  départ : z
    = (5750 − □)/100   (trous : (5750 − 5700)/100)   ← z = (s − E[S])/sd(S)
    = □   (trous : 0,5)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,691)   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − □   (trous : 1 − 0,691)   ← Pr(S > s) ≈ 1 − Φ(z)
    = □   (trous : 0,309)   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (5750-5700)/□ | z = 0,5 ; Pr ≈ 1 − Φ(0,5) = 0,309
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un ascenseur transporte 36 personnes ; le poids d'une personne a pour espérance 64 kg et pour écart-type 2 kg. Par le théorème central limite, quelle est la probabilité approchée que le poids total dépasse 2325 kg ?
  [guided]  E[S]
    (Peut-on approcher la loi de la somme par une loi normale ? Oui : n variables indépendantes de même loi, et n est grand.)
    = 36·□   (trous : 36·64)   ← E[S] = nμ
    = □   (trous : 2304)   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = □·2   (trous : √36·2)   ← var(S) = nσ², donc sd(S) = σ√n
    = □   (trous : 12)   ← Calculer
  — z  [juge stat]  départ : z
    = (2325 − □)/12   (trous : (2325 − 2304)/12)   ← z = (s − E[S])/sd(S)
    = □   (trous : 1,75)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,96)   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − □   (trous : 1 − 0,96)   ← Pr(S > s) ≈ 1 − Φ(z)
    = □   (trous : 0,04)   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (2325-2304)/□ | z = 1,75 ; Pr ≈ 1 − Φ(1,75) = 0,04
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

```

### Niveau 2

```
Un camion charge 100 colis ; un colis pèse en moyenne 46 kg, avec un écart-type de 5 kg. Par le théorème central limite, quelle est la probabilité approchée que la charge dépasse 4650 kg ?
  [guided]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 100·□   (trous : 100·46)   ← E[S] = nμ
    = □   (trous : 4600)   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = □·5   (trous : √100·5)   ← var(S) = nσ², donc sd(S) = σ√n
    = □   (trous : 50)   ← Calculer
  — z  [juge stat]  départ : z
    = (4650 − □)/50   (trous : (4650 − 4600)/50)   ← z = (s − E[S])/sd(S)
    = □   (trous : 1)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,841)   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − □   (trous : 1 − 0,841)   ← Pr(S > s) ≈ 1 − Φ(z)
    = □   (trous : 0,159)   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (4650-4600)/□ | z = 1 ; Pr ≈ 1 − Φ(1) = 0,159
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un serveur traite 36 requêtes ; une requête dure en moyenne 3 ms, avec un écart-type de 20 ms. Par le théorème central limite, quelle est la probabilité approchée que la durée totale dépasse 198 ms ?
  [guided]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 36·3   ← E[S] = nμ
    = □   (trous : 108)   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = □·20   (trous : √36·20)   ← var(S) = nσ², donc sd(S) = σ√n
    = □   (trous : 120)   ← Calculer
  — z  [juge stat]  départ : z
    = (198 − □)/120   (trous : (198 − 108)/120)   ← z = (s − E[S])/sd(S)
    = □   (trous : 0,75)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,773)   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − □   (trous : 1 − 0,773)   ← Pr(S > s) ≈ 1 − Φ(z)
    = □   (trous : 0,227)   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (198-108)/□ | z = 0,75 ; Pr ≈ 1 − Φ(0,75) = 0,227
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un ascenseur transporte 49 personnes ; le poids d'une personne a pour espérance 89 kg et pour écart-type 2 kg. Par le théorème central limite, quelle est la probabilité approchée que le poids total dépasse 4396 kg ?
  [guided]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 49·□   (trous : 49·89)   ← E[S] = nμ
    = □   (trous : 4361)   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = □·2   (trous : √49·2)   ← var(S) = nσ², donc sd(S) = σ√n
    = □   (trous : 14)   ← Calculer
  — z  [juge stat]  départ : z
    = (4396 − □)/14   (trous : (4396 − 4361)/14)   ← z = (s − E[S])/sd(S)
    = □   (trous : 2,5)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,994)   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − □   (trous : 1 − 0,994)   ← Pr(S > s) ≈ 1 − Φ(z)
    = □   (trous : 0,006)   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (4396-4361)/□ | z = 2,5 ; Pr ≈ 1 − Φ(2,5) = 0,006
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

```

### Niveau 3

```
Un ascenseur transporte 64 personnes ; le poids d'une personne a pour espérance 69 kg et pour écart-type 20 kg. Par le théorème central limite, quelle est la probabilité approchée que le poids total dépasse 4656 kg ?
  [tap, suivre l'erreur, menu menu]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 64·69   ← E[S] = nμ
    = 4416   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √64·20   ← var(S) = nσ², donc sd(S) = σ√n
    = 160   ← Calculer
  — z  [juge stat]  départ : z
    = (4656 − 4416)/160   ← z = (s − E[S])/sd(S)
    = 1,5   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,933   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − 0,933   ← Pr(S > s) ≈ 1 − Φ(z)
    = 0,067   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (4656-4416)/□ | z = 1,5 ; Pr ≈ 1 − Φ(1,5) = 0,067
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un serveur traite 36 requêtes ; une requête dure en moyenne 86 ms, avec un écart-type de 2 ms. Par le théorème central limite, quelle est la probabilité approchée que la durée totale dépasse 3108 ms ?
  [tap, suivre l'erreur, menu menu]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 36·86   ← E[S] = nμ
    = 3096   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √36·2   ← var(S) = nσ², donc sd(S) = σ√n
    = 12   ← Calculer
  — z  [juge stat]  départ : z
    = (3108 − 3096)/12   ← z = (s − E[S])/sd(S)
    = 1   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,841   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − 0,841   ← Pr(S > s) ≈ 1 − Φ(z)
    = 0,159   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (3108-3096)/□ | z = 1 ; Pr ≈ 1 − Φ(1) = 0,159
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un serveur traite 16 requêtes ; une requête dure en moyenne 37 ms, avec un écart-type de 10 ms. Par le théorème central limite, quelle est la probabilité approchée que la durée totale dépasse 672 ms ?
  [tap, suivre l'erreur, menu menu]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 16·37   ← E[S] = nμ
    = 592   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √16·10   ← var(S) = nσ², donc sd(S) = σ√n
    = 40   ← Calculer
  — z  [juge stat]  départ : z
    = (672 − 592)/40   ← z = (s − E[S])/sd(S)
    = 2   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,977   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − 0,977   ← Pr(S > s) ≈ 1 − Φ(z)
    = 0,023   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (672-592)/□ | z = 2 ; Pr ≈ 1 − Φ(2) = 0,023
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

```

### Niveau 4

```
On mesure 16 valeurs iid d'espérance 78 et d'écart-type 20. Quelle est la probabilité approchée que la moyenne X̄ dépasse 90,5 ?
  [free, suivre l'erreur]  E[X̄]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 78   ← E[X̄] = μ
  — sd(X̄)  [juge prob]  départ : sd(X̄)
    = 20/√16   ← sd(X̄) = σ/√n
    = 5   ← Calculer
  — z  [juge stat]  départ : z
    = (90,5 − 78)/5   ← z = (x̄ − μ)/(σ/√n)
    = 2,5   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,994   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − 0,994   ← Queue de droite
    = 0,006   ← TCL et table
  aides : X̄ ≈ N(μ, σ²/n) : son écart-type est σ/√n. | 20/√□ | Pr ≈ 0,006
  pièges : p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

On mesure 25 valeurs iid d'espérance 59 et d'écart-type 20. Quelle est la probabilité approchée que la moyenne X̄ dépasse 69 ?
  [free, suivre l'erreur]  E[X̄]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 59   ← E[X̄] = μ
  — sd(X̄)  [juge prob]  départ : sd(X̄)
    = 20/√25   ← sd(X̄) = σ/√n
    = 4   ← Calculer
  — z  [juge stat]  départ : z
    = (69 − 59)/4   ← z = (x̄ − μ)/(σ/√n)
    = 2,5   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,994   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − 0,994   ← Queue de droite
    = 0,006   ← TCL et table
  aides : X̄ ≈ N(μ, σ²/n) : son écart-type est σ/√n. | 20/√□ | Pr ≈ 0,006
  pièges : p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un ascenseur transporte 100 personnes ; le poids d'une personne a pour espérance 56 kg et pour écart-type 2 kg. Par le théorème central limite, quelle est la probabilité approchée que le poids total dépasse 5645 kg ?
  [free, suivre l'erreur]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 100·56   ← E[S] = nμ
    = 5600   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √100·2   ← var(S) = nσ², donc sd(S) = σ√n
    = 20   ← Calculer
  — z  [juge stat]  départ : z
    = (5645 − 5600)/20   ← z = (s − E[S])/sd(S)
    = 2,25   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,988   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − 0,988   ← Pr(S > s) ≈ 1 − Φ(z)
    = 0,012   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (5645-5600)/□ | z = 2,25 ; Pr ≈ 1 − Φ(2,25) = 0,012
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

```

### Niveau 5

```
Un camion charge 25 colis ; un colis pèse en moyenne 15 kg, avec un écart-type de 4 kg. Quelle charge c (en kg) le camion doit-il supporter pour que Pr(charge > c) = 0,04 ?
  [free, sans aide]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 25·15   ← E[S] = nμ
    = 375   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √25·4   ← σ√n
    = 20   ← Calculer
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,96)   ← Φ(z) = 1 − 0,04
    = 1,75   ← Table 2
  — c  [juge stat]  départ : c
    = 375 + 1,75·20   ← c = E[S] + z·sd(S)
    = 410   ← Capacité
  pièges : p_clt_sum_sd, p_clt_population, p_clt_needs_normal

Un serveur traite 64 requêtes ; une requête dure en moyenne 55 ms, avec un écart-type de 4 ms. Par le théorème central limite, quelle est la probabilité approchée que la durée totale dépasse 3568 ms ?
  [free, sans aide]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 64·55   ← E[S] = nμ
    = 3520   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √64·4   ← var(S) = nσ², donc sd(S) = σ√n
    = 32   ← Calculer
  — z  [juge stat]  départ : z
    = (3568 − 3520)/32   ← z = (s − E[S])/sd(S)
    = 1,5   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,933   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − 0,933   ← Pr(S > s) ≈ 1 − Φ(z)
    = 0,067   ← TCL et table
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un camion charge 49 colis ; un colis pèse en moyenne 27 kg, avec un écart-type de 4 kg. Par le théorème central limite, quelle est la probabilité approchée que la charge dépasse 1393 kg ?
  [free, sans aide]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 49·27   ← E[S] = nμ
    = 1323   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √49·4   ← var(S) = nσ², donc sd(S) = σ√n
    = 28   ← Calculer
  — z  [juge stat]  départ : z
    = (1393 − 1323)/28   ← z = (s − E[S])/sd(S)
    = 2,5   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,994   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − 0,994   ← Pr(S > s) ≈ 1 − Φ(z)
    = 0,006   ← TCL et table
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

```

### Variantes d'examen

```
X₁, …, Xₙ sont iid d'espérance μ et de variance σ². Sous quelle condition X̄ est-elle approximativement normale (théorème central limite) ?
  · La population dont on tire les Xᵢ est grande [p_clt_population]   · Les Xᵢ sont bornées   ✔ La taille n de l'échantillon est grande   · Les Xᵢ sont normales [p_clt_needs_normal]
  [examen mcq]
  pièges : p_clt_population, p_clt_needs_normal

Vrai ou faux ?
  « Pour n grand, la moyenne empirique de n variables iid de loi exponentielle est approximativement normale. » → VRAI
  [examen tf]
  pièges : p_clt_needs_normal

On mesure 100 valeurs iid d'espérance 72 et d'écart-type 15. Quelle est la probabilité approchée que la moyenne X̄ dépasse 72,75 ?
  [free, sans aide, examen coef]  Pr
    = 1 − 0,691   ← Queue de droite
    = 0,309   ← TCL et table
  pièges : p_upper_tail

```

## Approximation normale de la binomiale et de Poisson (`p-clt-binom`, BA3)

_Approcher une binomiale ou une loi de Poisson par une normale de même espérance et de même variance._

### Niveau 1

```
Dans un sondage, 625 personnes répondent ; chacune est favorable avec la probabilité 0,2. X est le nombre de personnes favorables, X ~ B(625 ; 0,2). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 135).
  [guided]  E[X]
    (Quelle approximation ? Normale : np = 125 et n(1 − p) = 500 sont grands.)
    = 625·□   (trous : 625·0,2)   ← E = np
    = □   (trous : 125)   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 625·0,2·□   (trous : 625·0,2·0,8)   ← var = np(1 − p)
    = □   (trous : 100)   ← Calculer
  — σ  [juge prob]  départ : σ
    = √□   (trous : √100)   ← σ = √var
    = □   (trous : 10)   ← Écart-type
  — z  [juge stat]  départ : z
    = (135 − □)/10   (trous : (135 − 125)/10)   ← z = (k − μ)/σ
    = □   (trous : 1)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,841)   ← Table 1
  — Pr(X≥135)  [juge stat]  départ : Pr(X ≥ 135)
    = 1 − □   (trous : 1 − 0,841)   ← Complément
    = □   (trous : 0,159)   ← Approximation normale
  aides : np(1 − p) est la variance : prends sa racine. | (135-125)/√□ | z = 1 ; Pr ≈ 0,159
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

Une machine produit des pièces défectueuses avec la probabilité 0,1, indépendamment ; sur 400 pièces, X est le nombre de pièces défectueuses, X ~ B(400 ; 0,1). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≤ 46).
  [guided]  E[X]
    (Quelle approximation ? Normale : np = 40 et n(1 − p) = 360 sont grands.)
    = 400·□   (trous : 400·0,1)   ← E = np
    = □   (trous : 40)   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 400·0,1·□   (trous : 400·0,1·0,9)   ← var = np(1 − p)
    = □   (trous : 36)   ← Calculer
  — σ  [juge prob]  départ : σ
    = √□   (trous : √36)   ← σ = √var
    = □   (trous : 6)   ← Écart-type
  — z  [juge stat]  départ : z
    = (46 − □)/6   (trous : (46 − 40)/6)   ← z = (k − μ)/σ
    = □   (trous : 1)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,841)   ← Table 1
  — Pr(X≤46)  [juge stat]  départ : Pr(X ≤ 46)
    = □   (trous : 0,841)   ← Pr ≈ Φ(z)
  aides : np(1 − p) est la variance : prends sa racine. | (46-40)/√□ | z = 1 ; Pr ≈ 0,841
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

Une machine produit des pièces défectueuses avec la probabilité 0,2, indépendamment ; sur 400 pièces, X est le nombre de pièces défectueuses, X ~ B(400 ; 0,2). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 92).
  [guided]  E[X]
    (Quelle approximation ? Normale : np = 80 et n(1 − p) = 320 sont grands.)
    = 400·□   (trous : 400·0,2)   ← E = np
    = □   (trous : 80)   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 400·0,2·□   (trous : 400·0,2·0,8)   ← var = np(1 − p)
    = □   (trous : 64)   ← Calculer
  — σ  [juge prob]  départ : σ
    = √□   (trous : √64)   ← σ = √var
    = □   (trous : 8)   ← Écart-type
  — z  [juge stat]  départ : z
    = (92 − □)/8   (trous : (92 − 80)/8)   ← z = (k − μ)/σ
    = □   (trous : 1,5)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,933)   ← Table 1
  — Pr(X≥92)  [juge stat]  départ : Pr(X ≥ 92)
    = 1 − □   (trous : 1 − 0,933)   ← Complément
    = □   (trous : 0,067)   ← Approximation normale
  aides : np(1 − p) est la variance : prends sa racine. | (92-80)/√□ | z = 1,5 ; Pr ≈ 0,067
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

```

### Niveau 2

```
Dans un sondage, 100 personnes répondent ; chacune est favorable avec la probabilité 0,1. X est le nombre de personnes favorables, X ~ B(100 ; 0,1). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 13).
  [guided]  E[X]
    ? Quelle approximation ? ✔ Normale : np = 10 et n(1 − p) = 90 sont grands / · Poisson
    = 100·□   (trous : 100·0,1)   ← E = np
    = □   (trous : 10)   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 100·0,1·□   (trous : 100·0,1·0,9)   ← var = np(1 − p)
    = □   (trous : 9)   ← Calculer
  — σ  [juge prob]  départ : σ
    = √□   (trous : √9)   ← σ = √var
    = □   (trous : 3)   ← Écart-type
  — z  [juge stat]  départ : z
    = (13 − □)/3   (trous : (13 − 10)/3)   ← z = (k − μ)/σ
    = □   (trous : 1)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,841)   ← Table 1
  — Pr(X≥13)  [juge stat]  départ : Pr(X ≥ 13)
    = 1 − □   (trous : 1 − 0,841)   ← Complément
    = □   (trous : 0,159)   ← Approximation normale
  aides : np(1 − p) est la variance : prends sa racine. | (13-10)/√□ | z = 1 ; Pr ≈ 0,159
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

Dans un sondage, 900 personnes répondent ; chacune est favorable avec la probabilité 0,5. X est le nombre de personnes favorables, X ~ B(900 ; 0,5). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≤ 465).
  [guided]  E[X]
    ? Quelle approximation ? ✔ Normale : np = 450 et n(1 − p) = 450 sont grands / · Poisson
    = 900·□   (trous : 900·0,5)   ← E = np
    = □   (trous : 450)   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 900·□·0,5   (trous : 900·0,5·0,5)   ← var = np(1 − p)
    = □   (trous : 225)   ← Calculer
  — σ  [juge prob]  départ : σ
    = √□   (trous : √225)   ← σ = √var
    = □   (trous : 15)   ← Écart-type
  — z  [juge stat]  départ : z
    = (465 − □)/15   (trous : (465 − 450)/15)   ← z = (k − μ)/σ
    = □   (trous : 1)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,841)   ← Table 1
  — Pr(X≤465)  [juge stat]  départ : Pr(X ≤ 465)
    = □   (trous : 0,841)   ← Pr ≈ Φ(z)
  aides : np(1 − p) est la variance : prends sa racine. | (465-450)/√□ | z = 1 ; Pr ≈ 0,841
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

Dans un sondage, 625 personnes répondent ; chacune est favorable avec la probabilité 0,2. X est le nombre de personnes favorables, X ~ B(625 ; 0,2). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 150).
  [guided]  E[X]
    ? Quelle approximation ? ✔ Normale : np = 125 et n(1 − p) = 500 sont grands / · Poisson
    = 625·□   (trous : 625·0,2)   ← E = np
    = □   (trous : 125)   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 625·0,2·□   (trous : 625·0,2·0,8)   ← var = np(1 − p)
    = □   (trous : 100)   ← Calculer
  — σ  [juge prob]  départ : σ
    = √□   (trous : √100)   ← σ = √var
    = □   (trous : 10)   ← Écart-type
  — z  [juge stat]  départ : z
    = (150 − □)/10   (trous : (150 − 125)/10)   ← z = (k − μ)/σ
    = □   (trous : 2,5)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,994)   ← Table 1
  — Pr(X≥150)  [juge stat]  départ : Pr(X ≥ 150)
    = 1 − □   (trous : 1 − 0,994)   ← Complément
    = □   (trous : 0,006)   ← Approximation normale
  aides : np(1 − p) est la variance : prends sa racine. | (150-125)/√□ | z = 2,5 ; Pr ≈ 0,006
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

```

### Niveau 3

```
On lance 400 fois une pièce équilibrée ; X est le nombre de piles, X ~ B(400 ; 0,5). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≤ 225).
  [tap, suivre l'erreur, menu menu]  E[X]
    ? Quelle approximation ? ✔ Normale : np = 200 et n(1 − p) = 200 sont grands / · Poisson
    = 400·0,5   ← E = np
    = 200   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 400·0,5·0,5   ← var = np(1 − p)
    = 100   ← Calculer
  — σ  [juge prob]  départ : σ
    = √100   ← σ = √var
    = 10   ← Écart-type
  — z  [juge stat]  départ : z
    = (225 − 200)/10   ← z = (k − μ)/σ
    = 2,5   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,994   ← Table 1
  — Pr(X≤225)  [juge stat]  départ : Pr(X ≤ 225)
    = 0,994   ← Pr ≈ Φ(z)
  aides : np(1 − p) est la variance : prends sa racine. | (225-200)/√□ | z = 2,5 ; Pr ≈ 0,994
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

Une machine produit des pièces défectueuses avec la probabilité 0,1, indépendamment ; sur 400 pièces, X est le nombre de pièces défectueuses, X ~ B(400 ; 0,1). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 55).
  [tap, suivre l'erreur, menu menu]  E[X]
    ? Quelle approximation ? ✔ Normale : np = 40 et n(1 − p) = 360 sont grands / · Poisson
    = 400·0,1   ← E = np
    = 40   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 400·0,1·0,9   ← var = np(1 − p)
    = 36   ← Calculer
  — σ  [juge prob]  départ : σ
    = √36   ← σ = √var
    = 6   ← Écart-type
  — z  [juge stat]  départ : z
    = (55 − 40)/6   ← z = (k − μ)/σ
    = 2,5   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,994   ← Table 1
  — Pr(X≥55)  [juge stat]  départ : Pr(X ≥ 55)
    = 1 − 0,994   ← Complément
    = 0,006   ← Approximation normale
  aides : np(1 − p) est la variance : prends sa racine. | (55-40)/√□ | z = 2,5 ; Pr ≈ 0,006
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

Une machine produit des pièces défectueuses avec la probabilité 0,2, indépendamment ; sur 625 pièces, X est le nombre de pièces défectueuses, X ~ B(625 ; 0,2). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 130).
  [tap, suivre l'erreur, menu menu]  E[X]
    ? Quelle approximation ? ✔ Normale : np = 125 et n(1 − p) = 500 sont grands / · Poisson
    = 625·0,2   ← E = np
    = 125   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 625·0,2·0,8   ← var = np(1 − p)
    = 100   ← Calculer
  — σ  [juge prob]  départ : σ
    = √100   ← σ = √var
    = 10   ← Écart-type
  — z  [juge stat]  départ : z
    = (130 − 125)/10   ← z = (k − μ)/σ
    = 0,5   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,691   ← Table 1
  — Pr(X≥130)  [juge stat]  départ : Pr(X ≥ 130)
    = 1 − 0,691   ← Complément
    = 0,309   ← Approximation normale
  aides : np(1 − p) est la variance : prends sa racine. | (130-125)/√□ | z = 0,5 ; Pr ≈ 0,309
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

```

### Niveau 4

```
Dans un sondage, 400 personnes répondent ; chacune est favorable avec la probabilité 0,2. X est le nombre de personnes favorables, X ~ B(400 ; 0,2). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 84).
  [free, suivre l'erreur]  E[X]
    ? Quelle approximation ? ✔ Normale : np = 80 et n(1 − p) = 320 sont grands / · Poisson
    = 400·0,2   ← E = np
    = 80   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 400·0,2·0,8   ← var = np(1 − p)
    = 64   ← Calculer
  — σ  [juge prob]  départ : σ
    = √64   ← σ = √var
    = 8   ← Écart-type
  — z  [juge stat]  départ : z
    = (84 − 80)/8   ← z = (k − μ)/σ
    = 0,5   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,691   ← Table 1
  — Pr(X≥84)  [juge stat]  départ : Pr(X ≥ 84)
    = 1 − 0,691   ← Complément
    = 0,309   ← Approximation normale
  aides : np(1 − p) est la variance : prends sa racine. | (84-80)/√□ | z = 0,5 ; Pr ≈ 0,309
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

Le nombre X de clients d'un magasin en un mois suit Poiss(16). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 19).
  [free, suivre l'erreur]  E[X]
    = 16   ← Pour Poisson, E = λ
  — var(X)  [juge prob]  départ : var(X)
    = 16   ← var = λ
  — σ  [juge prob]  départ : σ
    = √16   ← σ = √var
    = 4   ← Écart-type
  — z  [juge stat]  départ : z
    = (19 − 16)/4   ← z = (k − μ)/σ
    = 0,75   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,773   ← Table 1
  — Pr(X≥19)  [juge stat]  départ : Pr(X ≥ 19)
    = 1 − 0,773   ← Complément
    = 0,227   ← Approximation normale
  aides : Poiss(λ) ≈ N(λ, λ) : l'écart-type est √λ. | (19-16)/√□ | z = 0,75 ; Pr ≈ 0,227
  pièges : p_binom_var_as_sd, p_upper_tail

Une machine produit des pièces défectueuses avec la probabilité 0,2, indépendamment ; sur 400 pièces, X est le nombre de pièces défectueuses, X ~ B(400 ; 0,2). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 84).
  [free, suivre l'erreur]  E[X]
    ? Quelle approximation ? ✔ Normale : np = 80 et n(1 − p) = 320 sont grands / · Poisson
    = 400·0,2   ← E = np
    = 80   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 400·0,2·0,8   ← var = np(1 − p)
    = 64   ← Calculer
  — σ  [juge prob]  départ : σ
    = √64   ← σ = √var
    = 8   ← Écart-type
  — z  [juge stat]  départ : z
    = (84 − 80)/8   ← z = (k − μ)/σ
    = 0,5   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,691   ← Table 1
  — Pr(X≥84)  [juge stat]  départ : Pr(X ≥ 84)
    = 1 − 0,691   ← Complément
    = 0,309   ← Approximation normale
  aides : np(1 − p) est la variance : prends sa racine. | (84-80)/√□ | z = 0,5 ; Pr ≈ 0,309
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

```

### Niveau 5

```
Dans un sondage, 400 personnes répondent ; chacune est favorable avec la probabilité 0,5. X est le nombre de personnes favorables, X ~ B(400 ; 0,5). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 220).
  [free, sans aide]  E[X]
    = 400·0,5   ← E = np
    = 200   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 400·0,5·0,5   ← var = np(1 − p)
    = 100   ← Calculer
  — σ  [juge prob]  départ : σ
    = √100   ← σ = √var
    = 10   ← Écart-type
  — z  [juge stat]  départ : z
    = (220 − 200)/10   ← z = (k − μ)/σ
    = 2   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,977   ← Table 1
  — Pr(X≥220)  [juge stat]  départ : Pr(X ≥ 220)
    = 1 − 0,977   ← Complément
    = 0,023   ← Approximation normale
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

Une machine produit des pièces défectueuses avec la probabilité 0,2, indépendamment ; sur 100 pièces, X est le nombre de pièces défectueuses, X ~ B(100 ; 0,2). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≤ 26).
  [free, sans aide]  E[X]
    = 100·0,2   ← E = np
    = 20   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 100·0,2·0,8   ← var = np(1 − p)
    = 16   ← Calculer
  — σ  [juge prob]  départ : σ
    = √16   ← σ = √var
    = 4   ← Écart-type
  — z  [juge stat]  départ : z
    = (26 − 20)/4   ← z = (k − μ)/σ
    = 1,5   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,933   ← Table 1
  — Pr(X≤26)  [juge stat]  départ : Pr(X ≤ 26)
    = 0,933   ← Pr ≈ Φ(z)
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

On lance 400 fois une pièce équilibrée ; X est le nombre de piles, X ~ B(400 ; 0,5). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 220).
  [free, sans aide]  E[X]
    = 400·0,5   ← E = np
    = 200   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 400·0,5·0,5   ← var = np(1 − p)
    = 100   ← Calculer
  — σ  [juge prob]  départ : σ
    = √100   ← σ = √var
    = 10   ← Écart-type
  — z  [juge stat]  départ : z
    = (220 − 200)/10   ← z = (k − μ)/σ
    = 2   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,977   ← Table 1
  — Pr(X≥220)  [juge stat]  départ : Pr(X ≥ 220)
    = 1 − 0,977   ← Complément
    = 0,023   ← Approximation normale
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

```

### Variantes d'examen

```
Dans un sondage, 400 personnes répondent ; chacune est favorable avec la probabilité 0,2. X est le nombre de personnes favorables, X ~ B(400 ; 0,2). Par l'approximation normale (sans correction de continuité), Pr(X ≥ 84) ≈ ?
  ✔ 0,309   · 0,475 [p_binom_var_as_sd]   · 0,155   · 0,691 [p_upper_tail]
  [examen mcq]
  pièges : p_upper_tail, p_binom_var_as_sd

Vrai ou faux ?
  « Si X ~ B(n, p), l'écart-type de X est np(1 − p). » → FAUX
    contre-exemple (refute) : n = 100, p = 1/2
  [examen tf]
  pièges : p_binom_var_as_sd

Dans un sondage, 400 personnes répondent ; chacune est favorable avec la probabilité 0,2. X est le nombre de personnes favorables, X ~ B(400 ; 0,2). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 96).
  [free, sans aide, examen coef]  Pr(X ≥ 96)
    = 1 − 0,977   ← Complément
    = 0,023   ← Approximation normale
  pièges : p_upper_tail

```

## Méthode des moments (`p-mom`, BA3)

_Estimer un paramètre en égalant les moments théoriques aux moments empiriques._

### Niveau 1

```
X₁, …, Xₙ (n = 10) sont iid de loi Poiss(λ). On observe Σxᵢ = 23. Estime λ par la méthode des moments.
  [guided]  x̄
    = 23/□   (trous : 23/10)   ← x̄ = Σxᵢ/n
  — λ̂  [juge prob]  départ : λ̂
    (E[X] = λ : on résout λ = x̄.)
    = □   (trous : 2,3)   ← λ = x̄, puis isoler λ
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | λ = 2,3, donc λ = □ | λ̂ = 2,3

X₁, …, Xₙ (n = 25) sont iid de loi Poiss(λ). On observe Σxᵢ = 58. Estime λ par la méthode des moments.
  [guided]  x̄
    = 58/□   (trous : 58/25)   ← x̄ = Σxᵢ/n
  — λ̂  [juge prob]  départ : λ̂
    (E[X] = λ : on résout λ = x̄.)
    = □   (trous : 2,32)   ← λ = x̄, puis isoler λ
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | λ = 2,32, donc λ = □ | λ̂ = 2,32

X₁, …, Xₙ (n = 25) sont iid de loi U[0, θ]. On observe Σxᵢ = 76. Estime θ par la méthode des moments.
  [guided]  x̄
    = 76/□   (trous : 76/25)   ← x̄ = Σxᵢ/n
  — θ̂  [juge prob]  départ : θ̂
    (E[X] = θ/2 : on résout θ/2 = x̄.)
    = 2·□   (trous : 2·3,04)   ← θ/2 = x̄, puis isoler θ
    = □   (trous : 6,08)   ← Calculer
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | θ/2 = 3,04, donc θ = □ | θ̂ = 6,08

```

### Niveau 2

```
X₁, …, Xₙ (n = 20) sont iid de loi Poiss(λ). On observe Σxᵢ = 75. Estime λ par la méthode des moments.
  [guided]  x̄
    = 75/□   (trous : 75/20)   ← x̄ = Σxᵢ/n
    = □   (trous : 3,75)   ← Calculer
  — E[X]  [juge prob]  départ : E[X]
    = □   (trous : λ)   ← Espérance de Poiss(λ)
  — λ̂  [juge prob]  départ : λ̂
    = □   (trous : 3,75)   ← λ = x̄, puis isoler λ
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | λ = 3,75, donc λ = □ | λ̂ = 3,75

X₁, …, Xₙ (n = 25) sont iid de loi Poiss(λ). On observe Σxᵢ = 49. Estime λ par la méthode des moments.
  [guided]  x̄
    = 49/□   (trous : 49/25)   ← x̄ = Σxᵢ/n
  — E[X]  [juge prob]  départ : E[X]
    = □   (trous : λ)   ← Espérance de Poiss(λ)
  — λ̂  [juge prob]  départ : λ̂
    = □   (trous : 1,96)   ← λ = x̄, puis isoler λ
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | λ = 1,96, donc λ = □ | λ̂ = 1,96

Les données 7 ; 5 ; 5 ; 10 ; 7 ; 2 viennent d'une loi Γ(k, θ) (forme k, échelle θ : E = kθ, var = kθ²). Estime θ et k par la méthode des moments.
  [guided]  x̄
    = □/6   (trous : 36/6)   ← Somme des données / n
    = □   (trous : 6)   ← x̄
  — σ̂2  [juge prob]  départ : σ̂²
    ? Quelle seconde équation ? ✔ var(X) = σ̂² = (1/n)Σ(xᵢ − x̄)² / · E[X²] = x̄² / · var(X) = s² = Σ(xᵢ − x̄)²/(n − 1)
    = □/6   (trous : 36/6)   ← Σ(xᵢ − x̄)² = 36
    = □   (trous : 6)   ← σ̂²
  — θ̂  [juge prob]  départ : θ̂
    (E[X] = kθ et var(X) = kθ² pour Γ(k, θ).)
    = □/6   (trous : 6/6)   ← kθ = x̄ et kθ² = σ̂², donc θ = σ̂²/x̄
    = □   (trous : 1)   ← θ̂
  — k̂  [juge prob]  départ : k̂
    = □/1   (trous : 6/1)   ← k = x̄/θ̂
    = □   (trous : 6)   ← Calculer
  aides : Deux paramètres : deux équations, E[X] = x̄ et var(X) = σ̂² (diviseur n). | 6/□ | θ̂ = 1 ; k̂ = 6
  pièges : p_mom_s2, p_mom_wrong_moment

```

### Niveau 3

```
X₁, …, Xₙ (n = 50) sont iid de loi exp(λ). On observe Σxᵢ = 250. Estime λ par la méthode des moments.
  [tap, suivre l'erreur, menu menu]  x̄
    = 250/50   ← x̄ = Σxᵢ/n
    = 5   ← Calculer
  — E[X]  [juge prob]  départ : E[X]
    = 1/λ   ← Espérance de exp(λ)
  — λ̂  [juge prob]  départ : λ̂
    = 1/5   ← 1/λ = x̄, puis isoler λ
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | 1/λ = 5, donc λ = □ | λ̂ = 0,2
  pièges : p_exp_rate_mean

X₁, …, Xₙ (n = 60) sont iid de la loi de densité θx^(θ−1) sur ]0 ; 1[. On observe Σxᵢ = 30. Estime θ par la méthode des moments.
  [tap, suivre l'erreur, menu menu]  x̄
    = 30/60   ← x̄ = Σxᵢ/n
    = 0,5   ← Calculer
  — E[X]  [juge prob]  départ : E[X]
    = θ/(θ + 1)   ← Espérance de la loi de densité θx^(θ−1) sur ]0 ; 1[
  — θ̂  [juge prob]  départ : θ̂
    = 0,5/(1 − 0,5)   ← θ/(θ+1) = x̄, puis isoler θ
    = 1   ← Calculer
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | θ/(θ+1) = 0,5, donc θ = □ | θ̂ = 1

X₁, …, Xₙ (n = 10) sont iid de loi U[0, θ]. On observe Σxᵢ = 56. Estime θ par la méthode des moments.
  [tap, suivre l'erreur, menu menu]  x̄
    = 56/10   ← x̄ = Σxᵢ/n
    = 5,6   ← Calculer
  — E[X]  [juge prob]  départ : E[X]
    = θ/2   ← Espérance de U[0, θ]
  — θ̂  [juge prob]  départ : θ̂
    = 2·5,6   ← θ/2 = x̄, puis isoler θ
    = 11,2   ← Calculer
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | θ/2 = 5,6, donc θ = □ | θ̂ = 11,2

```

### Niveau 4

```
Les données 3 ; 6 ; 2 ; 5 ; 4 viennent d'une loi Γ(k, θ) (forme k, échelle θ : E = kθ, var = kθ²). Estime θ et k par la méthode des moments.
  [free, suivre l'erreur]  x̄
    = 20/5   ← Somme des données / n
    = 4   ← x̄
  — σ̂2  [juge prob]  départ : σ̂²
    ? Quelle seconde équation ? ✔ var(X) = σ̂² = (1/n)Σ(xᵢ − x̄)² / · E[X²] = x̄² / · var(X) = s² = Σ(xᵢ − x̄)²/(n − 1)
    = 10/5   ← Σ(xᵢ − x̄)² = 10
    = 2   ← σ̂²
  — θ̂  [juge prob]  départ : θ̂
    (E[X] = kθ et var(X) = kθ² pour Γ(k, θ).)
    = 2/4   ← kθ = x̄ et kθ² = σ̂², donc θ = σ̂²/x̄
    = 0,5   ← θ̂
  — k̂  [juge prob]  départ : k̂
    = 4/(0,5)   ← k = x̄/θ̂
    = 8   ← Calculer
  aides : Deux paramètres : deux équations, E[X] = x̄ et var(X) = σ̂² (diviseur n). | 2/□ | θ̂ = 0,5 ; k̂ = 8
  pièges : p_mom_s2, p_mom_wrong_moment

X₁, …, Xₙ (n = 36) sont iid de la loi de Pareto de densité αx^(−α−1) sur ]1 ; ∞[ (α > 1). On observe Σxᵢ = 48. Estime α par la méthode des moments.
  [free, suivre l'erreur]  x̄
    = 48/36   ← x̄ = Σxᵢ/n
    = 4/3   ← Calculer
  — E[X]  [juge prob]  départ : E[X]
    = α/(α − 1)   ← Espérance de la loi de Pareto de densité αx^(−α−1) sur ]1 ; ∞[ (α > 1)
  — α̂  [juge prob]  départ : α̂
    = (4/3)/(4/3 − 1)   ← α/(α−1) = x̄, puis isoler α
    = 4   ← Calculer
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | α/(α−1) = 4/3, donc α = □ | α̂ = 4

Les données 6 ; 5 ; 2 ; 5 ; 3 ; 3 viennent d'une loi Γ(k, θ) (forme k, échelle θ : E = kθ, var = kθ²). Estime θ et k par la méthode des moments.
  [free, suivre l'erreur]  x̄
    = 24/6   ← Somme des données / n
    = 4   ← x̄
  — σ̂2  [juge prob]  départ : σ̂²
    ? Quelle seconde équation ? ✔ var(X) = σ̂² = (1/n)Σ(xᵢ − x̄)² / · E[X²] = x̄² / · var(X) = s² = Σ(xᵢ − x̄)²/(n − 1)
    = 12/6   ← Σ(xᵢ − x̄)² = 12
    = 2   ← σ̂²
  — θ̂  [juge prob]  départ : θ̂
    (E[X] = kθ et var(X) = kθ² pour Γ(k, θ).)
    = 2/4   ← kθ = x̄ et kθ² = σ̂², donc θ = σ̂²/x̄
    = 0,5   ← θ̂
  — k̂  [juge prob]  départ : k̂
    = 4/(0,5)   ← k = x̄/θ̂
    = 8   ← Calculer
  aides : Deux paramètres : deux équations, E[X] = x̄ et var(X) = σ̂² (diviseur n). | 2/□ | θ̂ = 0,5 ; k̂ = 8
  pièges : p_mom_s2, p_mom_wrong_moment

```

### Niveau 5

```
X₁, …, Xₙ (n = 60) sont iid de la loi de densité θx^(θ−1) sur ]0 ; 1[. On observe Σxᵢ = 30. Estime θ par la méthode des moments.
  [free, sans aide]  x̄
    = 30/60   ← x̄ = Σxᵢ/n
    = 0,5   ← Calculer
  — E[X]  [juge prob]  départ : E[X]
    = θ/(θ + 1)   ← Espérance de la loi de densité θx^(θ−1) sur ]0 ; 1[
  — θ̂  [juge prob]  départ : θ̂
    = 0,5/(1 − 0,5)   ← θ/(θ+1) = x̄, puis isoler θ
    = 1   ← Calculer

Les données 7 ; 1 ; 3 ; 4 ; 5 viennent d'une loi Γ(k, θ) (forme k, échelle θ : E = kθ, var = kθ²). Estime θ et k par la méthode des moments.
  [free, sans aide]  x̄
    = 20/5   ← Somme des données / n
    = 4   ← x̄
  — σ̂2  [juge prob]  départ : σ̂²
    ? Quelle seconde équation ? ✔ var(X) = σ̂² = (1/n)Σ(xᵢ − x̄)² / · E[X²] = x̄² / · var(X) = s² = Σ(xᵢ − x̄)²/(n − 1)
    = 20/5   ← Σ(xᵢ − x̄)² = 20
    = 4   ← σ̂²
  — θ̂  [juge prob]  départ : θ̂
    (E[X] = kθ et var(X) = kθ² pour Γ(k, θ).)
    = 4/4   ← kθ = x̄ et kθ² = σ̂², donc θ = σ̂²/x̄
    = 1   ← θ̂
  — k̂  [juge prob]  départ : k̂
    = 4/1   ← k = x̄/θ̂
    = 4   ← Calculer
  pièges : p_mom_s2, p_mom_wrong_moment

Les données 3 ; 3 ; 2 ; 6 ; 5 ; 5 viennent d'une loi Γ(k, θ) (forme k, échelle θ : E = kθ, var = kθ²). Estime θ et k par la méthode des moments.
  [free, sans aide]  x̄
    = 24/6   ← Somme des données / n
    = 4   ← x̄
  — σ̂2  [juge prob]  départ : σ̂²
    ? Quelle seconde équation ? ✔ var(X) = σ̂² = (1/n)Σ(xᵢ − x̄)² / · E[X²] = x̄² / · var(X) = s² = Σ(xᵢ − x̄)²/(n − 1)
    = 12/6   ← Σ(xᵢ − x̄)² = 12
    = 2   ← σ̂²
  — θ̂  [juge prob]  départ : θ̂
    (E[X] = kθ et var(X) = kθ² pour Γ(k, θ).)
    = 2/4   ← kθ = x̄ et kθ² = σ̂², donc θ = σ̂²/x̄
    = 0,5   ← θ̂
  — k̂  [juge prob]  départ : k̂
    = 4/(0,5)   ← k = x̄/θ̂
    = 8   ← Calculer
  pièges : p_mom_s2, p_mom_wrong_moment

```

### Variantes d'examen

```
Les données 14 ; 12 ; 6 ; 8 viennent d'une loi Γ(k, θ) (forme k, échelle θ : E = kθ, var = kθ²). Que vaut θ̂ par la méthode des moments ?
  · 4/3 [p_mom_s2]   · 2   ✔ 1
  [examen mcq]
  pièges : p_mom_s2

Vrai ou faux ?
  « Pour un échantillon de loi exp(λ) (espérance 1/λ), l'estimateur des moments de λ est x̄. » → FAUX
    contre-exemple (refute) : m = 2
  [examen tf]
  pièges : p_exp_rate_mean

X₁, …, Xₙ (n = 10) sont iid de loi exp(λ). On observe Σxᵢ = 20. Estime λ par la méthode des moments.
  [free, sans aide, examen coef]  λ̂
    = 1/2   ← 1/λ = x̄, puis isoler λ
  pièges : p_exp_rate_mean

```

## Maximum de vraisemblance, étape par étape (`p-mle`, BA3)

_Le maximum de vraisemblance pas à pas : L, ℓ = ln L, ℓ′ = 0, vérifier le maximum par ℓ″, puis l'erreur standard._

### Niveau 1

```
X₁, …, Xₙ (n = 20) sont iid de loi Poiss(λ). On observe Σxᵢ = 100. Trouve le maximum de vraisemblance λ̂.
  [guided]  x̄
    = 100/□   (trous : 100/20)   ← x̄ = Σxᵢ/n
    = 5   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λ^(xᵢ)e^(−λ)/xᵢ! ∝ λ^100·e^(−20λ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = □ln(λ) − 20λ   (trous : 100ln(λ) − 20λ)   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = □/λ − 20   (trous : 100/λ − 20)   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = □/20   (trous : 100/20)   ← ℓ′(λ̂) = 0
    = □   (trous : 5)   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −100/□   (trous : −100/λ²)   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    (ℓ″(λ) < 0 : que peut-on conclure ? ℓ est concave : λ̂ est le maximum global.)
    = 100/5²   ← −ℓ″(λ̂)
    = □   (trous : 4)   ← Information observée
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = 100/λ-20 = 0, donc λ̂ = □ | λ̂ = 5
  pièges : p_mle_solve, p_wald_sign, p_mle_no_check, p_mle_constant_kept

X₁, …, Xₙ (n = 25) sont iid de loi Poiss(λ). On observe Σxᵢ = 25. Trouve le maximum de vraisemblance λ̂.
  [guided]  x̄
    = □/25   (trous : 25/25)   ← x̄ = Σxᵢ/n
    = 1   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λ^(xᵢ)e^(−λ)/xᵢ! ∝ λ^25·e^(−25λ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = □ln(λ) − 25λ   (trous : 25ln(λ) − 25λ)   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = □/λ − 25   (trous : 25/λ − 25)   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = □/25   (trous : 25/25)   ← ℓ′(λ̂) = 0
    = □   (trous : 1)   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −25/□   (trous : −25/λ²)   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    (ℓ″(λ) < 0 : que peut-on conclure ? ℓ est concave : λ̂ est le maximum global.)
    = 25/1²   ← −ℓ″(λ̂)
    = □   (trous : 25)   ← Information observée
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = 25/λ-25 = 0, donc λ̂ = □ | λ̂ = 1
  pièges : p_mle_solve, p_wald_sign, p_mle_no_check, p_mle_constant_kept

X₁, …, Xₙ (n = 16) sont iid de loi exp(λ), de densité λe^(−λx) pour x > 0. On observe Σxᵢ = 64. Trouve le maximum de vraisemblance λ̂.
  [guided]  x̄
    = 64/□   (trous : 64/16)   ← x̄ = Σxᵢ/n
    = 4   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λe^(−λxᵢ) = λ^16·e^(−64λ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = □ln(λ) − 64λ   (trous : 16ln(λ) − 64λ)   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = 16/λ − □   (trous : 16/λ − 64)   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = 16/□   (trous : 16/64)   ← ℓ′(λ̂) = 0
    = □   (trous : 0,25)   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −16/□   (trous : −16/λ²)   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    (ℓ″(λ) < 0 : que peut-on conclure ? ℓ est concave : λ̂ est le maximum global.)
    = 16/0,25²   ← −ℓ″(λ̂)
    = □   (trous : 256)   ← Information observée
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = 16/λ-64 = 0, donc λ̂ = □ | λ̂ = 0,25
  pièges : p_mle_solve, p_wald_sign, p_mle_no_check, p_mle_constant_kept

```

### Niveau 2

```
X₁, …, Xₙ (n = 64) sont iid de loi exp(λ), de densité λe^(−λx) pour x > 0. On observe Σxᵢ = 128. Trouve le maximum de vraisemblance λ̂.
  [guided]  x̄
    = 128/□   (trous : 128/64)   ← x̄ = Σxᵢ/n
    = 2   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λe^(−λxᵢ) = λ^64·e^(−128λ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = □ln(λ) − 128λ   (trous : 64ln(λ) − 128λ)   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = 64/λ − □   (trous : 64/λ − 128)   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = 64/□   (trous : 64/128)   ← ℓ′(λ̂) = 0
    = □   (trous : 0,5)   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −64/□   (trous : −64/λ²)   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    ? ℓ″(λ) < 0 : que peut-on conclure ? ✔ ℓ est concave : λ̂ est le maximum global / · Rien à vérifier : ℓ′(λ̂) = 0 suffit / · λ̂ est un minimum
    = 64/0,5²   ← −ℓ″(λ̂)
    = □   (trous : 256)   ← Information observée
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = 64/λ-128 = 0, donc λ̂ = □ | λ̂ = 0,5
  pièges : p_mle_solve, p_wald_sign, p_mle_no_check, p_mle_constant_kept

X₁, …, Xₙ (n = 100) sont iid de loi exp(λ), de densité λe^(−λx) pour x > 0. On observe Σxᵢ = 50. Trouve le maximum de vraisemblance λ̂.
  [guided]  x̄
    = 50/□   (trous : 50/100)   ← x̄ = Σxᵢ/n
    = 0,5   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λe^(−λxᵢ) = λ^100·e^(−50λ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = □ln(λ) − 50λ   (trous : 100ln(λ) − 50λ)   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = 100/λ − □   (trous : 100/λ − 50)   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = 100/□   (trous : 100/50)   ← ℓ′(λ̂) = 0
    = □   (trous : 2)   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −100/□   (trous : −100/λ²)   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    ? ℓ″(λ) < 0 : que peut-on conclure ? ✔ ℓ est concave : λ̂ est le maximum global / · Rien à vérifier : ℓ′(λ̂) = 0 suffit / · λ̂ est un minimum
    = 100/2²   ← −ℓ″(λ̂)
    = □   (trous : 25)   ← Information observée
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = 100/λ-50 = 0, donc λ̂ = □ | λ̂ = 2
  pièges : p_mle_solve, p_wald_sign, p_mle_no_check, p_mle_constant_kept

X₁, …, Xₙ (n = 20) sont iid de loi Poiss(λ). On observe Σxᵢ = 100. Trouve le maximum de vraisemblance λ̂.
  [guided]  x̄
    = 100/□   (trous : 100/20)   ← x̄ = Σxᵢ/n
    = 5   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λ^(xᵢ)e^(−λ)/xᵢ! ∝ λ^100·e^(−20λ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = □ln(λ) − 20λ   (trous : 100ln(λ) − 20λ)   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = □/λ − 20   (trous : 100/λ − 20)   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = □/20   (trous : 100/20)   ← ℓ′(λ̂) = 0
    = □   (trous : 5)   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −100/□   (trous : −100/λ²)   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    ? ℓ″(λ) < 0 : que peut-on conclure ? ✔ ℓ est concave : λ̂ est le maximum global / · Rien à vérifier : ℓ′(λ̂) = 0 suffit / · λ̂ est un minimum
    = 100/5²   ← −ℓ″(λ̂)
    = □   (trous : 4)   ← Information observée
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = 100/λ-20 = 0, donc λ̂ = □ | λ̂ = 5
  pièges : p_mle_solve, p_wald_sign, p_mle_no_check, p_mle_constant_kept

```

### Niveau 3

```
X₁, …, Xₙ (n = 20) sont iid de loi géométrique Pr(X = x) = (1 − p)ˣp pour x = 0, 1, … (le nombre d'échecs avant le premier succès). On observe Σxᵢ = 80. Trouve le maximum de vraisemblance p̂, puis son erreur standard asymptotique.
  [tap, suivre l'erreur, menu menu]  x̄
    = 80/20   ← x̄ = Σxᵢ/n
    = 4   ← Calculer
  — ℓ(p)  [juge prob]  départ : ℓ(p)
    (L(p) = Π (1 − p)^(xᵢ)p = p^20·(1 − p)^80 (ℓ est comparée à une constante près : les termes sans p peuvent rester ou partir))
    = 20ln(p) + 80ln(1 − p)   ← ℓ = ln L (à une constante près)
  — ℓ′(p)  [juge prob]  départ : ℓ′(p)
    = 20/p − 80/(1 − p)   ← Dériver en p
  — p̂  [juge prob]  départ : p̂
    = 20/(20 + 80)   ← ℓ′(p̂) = 0
    = 0,2   ← Calculer
  — ℓ″(p)  [juge prob]  départ : ℓ″(p)
    = −20/p² − 80/(1 − p)²   ← Dériver encore
  — J(p̂)  [juge prob]  départ : J(p̂)
    ? ℓ″(p) < 0 : que peut-on conclure ? ✔ ℓ est concave : p̂ est le maximum global / · Rien à vérifier : ℓ′(p̂) = 0 suffit / · p̂ est un minimum
    = 20/0,2² + 80/(1 − 0,2)²   ← −ℓ″(p̂)
    = 625   ← Information observée
  — se(p̂)  [juge prob]  départ : se(p̂)
    = 1/√625   ← Var ≈ 1/J
    = 0,04   ← Erreur standard
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en p seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(p) = 20/p-80/(1-p) = 0, donc p̂ = □ | p̂ = 0,2
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_mle_constant_kept

X₁, …, Xₙ (n = 20) sont iid de loi Poiss(λ). On observe Σxᵢ = 100. Trouve le maximum de vraisemblance λ̂, puis son erreur standard asymptotique.
  [tap, suivre l'erreur, menu menu]  x̄
    = 100/20   ← x̄ = Σxᵢ/n
    = 5   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λ^(xᵢ)e^(−λ)/xᵢ! ∝ λ^100·e^(−20λ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = 100ln(λ) − 20λ   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = 100/λ − 20   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = 100/20   ← ℓ′(λ̂) = 0
    = 5   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −100/λ²   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    ? ℓ″(λ) < 0 : que peut-on conclure ? ✔ ℓ est concave : λ̂ est le maximum global / · Rien à vérifier : ℓ′(λ̂) = 0 suffit / · λ̂ est un minimum
    = 100/5²   ← −ℓ″(λ̂)
    = 4   ← Information observée
  — se(λ̂)  [juge prob]  départ : se(λ̂)
    = 1/√4   ← Var ≈ 1/J
    = 0,5   ← Erreur standard
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = 100/λ-20 = 0, donc λ̂ = □ | λ̂ = 5
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_mle_constant_kept

X₁, …, Xₙ (n = 20) sont iid de loi Poiss(λ). On observe Σxᵢ = 100. Trouve le maximum de vraisemblance λ̂, puis son erreur standard asymptotique.
  [tap, suivre l'erreur, menu menu]  x̄
    = 100/20   ← x̄ = Σxᵢ/n
    = 5   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λ^(xᵢ)e^(−λ)/xᵢ! ∝ λ^100·e^(−20λ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = 100ln(λ) − 20λ   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = 100/λ − 20   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = 100/20   ← ℓ′(λ̂) = 0
    = 5   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −100/λ²   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    ? ℓ″(λ) < 0 : que peut-on conclure ? ✔ ℓ est concave : λ̂ est le maximum global / · Rien à vérifier : ℓ′(λ̂) = 0 suffit / · λ̂ est un minimum
    = 100/5²   ← −ℓ″(λ̂)
    = 4   ← Information observée
  — se(λ̂)  [juge prob]  départ : se(λ̂)
    = 1/√4   ← Var ≈ 1/J
    = 0,5   ← Erreur standard
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = 100/λ-20 = 0, donc λ̂ = □ | λ̂ = 5
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_mle_constant_kept

```

### Niveau 4

```
X₁, …, Xₙ (n = 200) sont iid de la loi de densité √θ·e^(−θx)/√(πx) pour x > 0. On observe Σxᵢ = 800. Trouve le maximum de vraisemblance θ̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
  [free, suivre l'erreur]  x̄
    = 800/200   ← x̄ = Σxᵢ/n
    = 4   ← Calculer
  — ℓ(θ)  [juge prob]  départ : ℓ(θ)
    (L(θ) ∝ θ^(200/2)·e^(−800θ) (ℓ est comparée à une constante près : les termes sans θ peuvent rester ou partir))
    = 200/2·ln(θ) − 800θ   ← ℓ = ln L (à une constante près)
  — ℓ′(θ)  [juge prob]  départ : ℓ′(θ)
    = 200/(2θ) − 800   ← Dériver en θ
  — θ̂  [juge prob]  départ : θ̂
    = 200/(2·800)   ← ℓ′(θ̂) = 0
    = 0,125   ← Calculer
  — ℓ″(θ)  [juge prob]  départ : ℓ″(θ)
    = −200/(2θ²)   ← Dériver encore
  — J(θ̂)  [juge prob]  départ : J(θ̂)
    ? ℓ″(θ) < 0 : que peut-on conclure ? ✔ ℓ est concave : θ̂ est le maximum global / · Rien à vérifier : ℓ′(θ̂) = 0 suffit / · θ̂ est un minimum
    = 200/(2·0,125²)   ← −ℓ″(θ̂)
    = 6400   ← Information observée
  — se(θ̂)  [juge prob]  départ : se(θ̂)
    = 1/√6400   ← Var ≈ 1/J
    = 0,0125   ← Erreur standard
  — IC₉₅  [juge stat]  départ : IC_95
    = [0,101 ; 0,149]   ← 0,125 ± 1,96 · 0,0125
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en θ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(θ) = 200/(2θ)-800 = 0, donc θ̂ = □ | θ̂ = 0,125
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_ci_prob, p_ci_data, p_mle_constant_kept

X₁, …, Xₙ (n = 100) sont iid de loi Poiss(λ). On observe Σxᵢ = 400. Trouve le maximum de vraisemblance λ̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
  [free, suivre l'erreur]  x̄
    = 400/100   ← x̄ = Σxᵢ/n
    = 4   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λ^(xᵢ)e^(−λ)/xᵢ! ∝ λ^400·e^(−100λ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = 400ln(λ) − 100λ   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = 400/λ − 100   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = 400/100   ← ℓ′(λ̂) = 0
    = 4   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −400/λ²   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    ? ℓ″(λ) < 0 : que peut-on conclure ? ✔ ℓ est concave : λ̂ est le maximum global / · Rien à vérifier : ℓ′(λ̂) = 0 suffit / · λ̂ est un minimum
    = 400/4²   ← −ℓ″(λ̂)
    = 25   ← Information observée
  — se(λ̂)  [juge prob]  départ : se(λ̂)
    = 1/√25   ← Var ≈ 1/J
    = 0,2   ← Erreur standard
  — IC₉₅  [juge stat]  départ : IC_95
    = [3,608 ; 4,392]   ← 4 ± 1,96 · 0,2
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = 400/λ-100 = 0, donc λ̂ = □ | λ̂ = 4
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_ci_prob, p_ci_data, p_mle_constant_kept

X₁, …, Xₙ sont iid de loi exp(λ), de densité λe^(−λx) pour x > 0, et S = Σxᵢ. Trouve l'estimateur du maximum de vraisemblance de λ en fonction de n et S, vérifie que c'est un maximum, et donne J(λ̂).
  [free, suivre l'erreur]  ℓ(λ)
    (L(λ) = Π λe^(−λxᵢ) = λ^n·e^(−Sλ) (on laisse tomber les termes sans λ))
    = n·ln(λ) − S·λ   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = n/λ − S   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = n/S   ← ℓ′(λ̂) = 0
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −n/λ²   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    ? ℓ″(λ) < 0 : que peut-on conclure ? ✔ ℓ est concave : λ̂ est le maximum global / · Rien à vérifier : ℓ′(λ̂) = 0 suffit / · λ̂ est un minimum
    = S²/n   ← −ℓ″(λ̂)
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = n/λ-S = 0, donc λ = □ | λ̂ = n/S
  pièges : p_mle_no_check, p_mle_constant_kept

```

### Niveau 5

```
X₁, …, Xₙ (n = 25) sont iid de loi exp(λ), de densité λe^(−λx) pour x > 0. On observe Σxᵢ = 25. Trouve le maximum de vraisemblance λ̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
  [free, sans aide]  x̄
    = 25/25   ← x̄ = Σxᵢ/n
    = 1   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λe^(−λxᵢ) = λ^25·e^(−25λ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = 25ln(λ) − 25λ   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = 25/λ − 25   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = 25/25   ← ℓ′(λ̂) = 0
    = 1   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −25/λ²   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    ? ℓ″(λ) < 0 : que peut-on conclure ? ✔ ℓ est concave : λ̂ est le maximum global / · Rien à vérifier : ℓ′(λ̂) = 0 suffit / · λ̂ est un minimum
    = 25/1²   ← −ℓ″(λ̂)
    = 25   ← Information observée
  — se(λ̂)  [juge prob]  départ : se(λ̂)
    = 1/√25   ← Var ≈ 1/J
    = 0,2   ← Erreur standard
  — IC₉₅  [juge stat]  départ : IC_95
    = [0,608 ; 1,392]   ← 1 ± 1,96 · 0,2
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_ci_prob, p_ci_data, p_mle_constant_kept

X₁, …, Xₙ (n = 100) sont iid de loi Bernoulli de paramètre p. On observe le nombre de succès S = 20. Trouve le maximum de vraisemblance p̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
  [free, sans aide]  x̄
    = 20/100   ← x̄ = S/n
    = 0,2   ← Calculer
  — ℓ(p)  [juge prob]  départ : ℓ(p)
    (L(p) = p^20·(1 − p)^80 (ℓ est comparée à une constante près : les termes sans p peuvent rester ou partir))
    = 20ln(p) + 80ln(1 − p)   ← ℓ = ln L (à une constante près)
  — ℓ′(p)  [juge prob]  départ : ℓ′(p)
    = 20/p − 80/(1 − p)   ← Dériver en p
  — p̂  [juge prob]  départ : p̂
    = 20/100   ← ℓ′(p̂) = 0
    = 0,2   ← Calculer
  — ℓ″(p)  [juge prob]  départ : ℓ″(p)
    = −20/p² − 80/(1 − p)²   ← Dériver encore
  — J(p̂)  [juge prob]  départ : J(p̂)
    ? ℓ″(p) < 0 : que peut-on conclure ? ✔ ℓ est concave : p̂ est le maximum global / · Rien à vérifier : ℓ′(p̂) = 0 suffit / · p̂ est un minimum
    = 20/0,2² + 80/(1 − 0,2)²   ← −ℓ″(p̂)
    = 625   ← Information observée
  — se(p̂)  [juge prob]  départ : se(p̂)
    = 1/√625   ← Var ≈ 1/J
    = 0,04   ← Erreur standard
  — IC₉₅  [juge stat]  départ : IC_95
    = [0,122 ; 0,278]   ← 0,2 ± 1,96 · 0,04
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_ci_prob, p_ci_data, p_mle_constant_kept

X₁, …, Xₙ (n = 50) sont iid de la loi de densité √θ·e^(−θx)/√(πx) pour x > 0. On observe Σxᵢ = 25. Trouve le maximum de vraisemblance θ̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
  [free, sans aide]  x̄
    = 25/50   ← x̄ = Σxᵢ/n
    = 0,5   ← Calculer
  — ℓ(θ)  [juge prob]  départ : ℓ(θ)
    (L(θ) ∝ θ^(50/2)·e^(−25θ) (ℓ est comparée à une constante près : les termes sans θ peuvent rester ou partir))
    = 50/2·ln(θ) − 25θ   ← ℓ = ln L (à une constante près)
  — ℓ′(θ)  [juge prob]  départ : ℓ′(θ)
    = 50/(2θ) − 25   ← Dériver en θ
  — θ̂  [juge prob]  départ : θ̂
    = 50/(2·25)   ← ℓ′(θ̂) = 0
    = 1   ← Calculer
  — ℓ″(θ)  [juge prob]  départ : ℓ″(θ)
    = −50/(2θ²)   ← Dériver encore
  — J(θ̂)  [juge prob]  départ : J(θ̂)
    ? ℓ″(θ) < 0 : que peut-on conclure ? ✔ ℓ est concave : θ̂ est le maximum global / · Rien à vérifier : ℓ′(θ̂) = 0 suffit / · θ̂ est un minimum
    = 50/(2·1²)   ← −ℓ″(θ̂)
    = 25   ← Information observée
  — se(θ̂)  [juge prob]  départ : se(θ̂)
    = 1/√25   ← Var ≈ 1/J
    = 0,2   ← Erreur standard
  — IC₉₅  [juge stat]  départ : IC_95
    = [0,608 ; 1,392]   ← 1 ± 1,96 · 0,2
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_ci_prob, p_ci_data, p_mle_constant_kept

```

### Variantes d'examen

```
X₁, …, Xₙ (n = 50) iid de loi Poiss(λ) ; Σxᵢ = 100. Quelle est la log-vraisemblance (à une constante près) ?
  · ℓ(λ) = ln(λ)^100-50λ [g2_log_power]   · ℓ(λ) = 100λ-50ln(λ)   · ℓ(λ) = 100ln(λ)-50 [p_mle_constant_kept]   ✔ ℓ(λ) = 100ln(λ)-50λ
  [examen mcq]
  pièges : g2_log_power, p_mle_constant_kept

Vrai ou faux ?
  « Pour ℓ(θ) = θ³ − 3θ, tout θ où ℓ′(θ) = 0 est un maximum de ℓ. » → FAUX
    contre-exemple (refute) : t = 1
  [examen tf]
  pièges : p_mle_no_check

X₁, …, Xₙ (n = 100) sont iid de loi Poiss(λ). On observe Σxᵢ = 400. Trouve le maximum de vraisemblance λ̂.
  [free, sans aide, examen coef]  λ̂
    = 400/100   ← ℓ′(λ̂) = 0
    = 4   ← Calculer
  pièges : p_mle_solve

X₁, …, Xₙ (n = 100) sont iid de loi Bernoulli de paramètre p. On observe le nombre de succès S = 50. Trouve le maximum de vraisemblance p̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
  [problème, examen open, 10 points]
  partie 1 (x̄ : 1,5 ; ℓ(p) : 1 ; ℓ′(p) : 1 ; p̂ : 1,5 ; ℓ″(p) : 1 ; J(p̂) : 1 ; se(p̂) : 1 ; IC₉₅ : 1)
  X₁, …, Xₙ (n = 100) sont iid de loi Bernoulli de paramètre p. On observe le nombre de succès S = 50. Trouve le maximum de vraisemblance p̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
    [free, sans aide, suivre l'erreur, examen open]  x̄
      = 50/100   ← x̄ = S/n
      = 0,5   ← Calculer
    — ℓ(p)  [juge prob]  départ : ℓ(p)
      (L(p) = p^50·(1 − p)^50 (ℓ est comparée à une constante près : les termes sans p peuvent rester ou partir))
      = 50ln(p) + 50ln(1 − p)   ← ℓ = ln L (à une constante près)
    — ℓ′(p)  [juge prob]  départ : ℓ′(p)
      = 50/p − 50/(1 − p)   ← Dériver en p
    — p̂  [juge prob]  départ : p̂
      = 50/100   ← ℓ′(p̂) = 0
      = 0,5   ← Calculer
    — ℓ″(p)  [juge prob]  départ : ℓ″(p)
      = −50/p² − 50/(1 − p)²   ← Dériver encore
    — J(p̂)  [juge prob]  départ : J(p̂)
      = 50/0,5² + 50/(1 − 0,5)²   ← −ℓ″(p̂)
      = 400   ← Information observée
    — se(p̂)  [juge prob]  départ : se(p̂)
      = 1/√400   ← Var ≈ 1/J
      = 0,05   ← Erreur standard
    — IC₉₅  [juge stat]  départ : IC_95
      = [0,402 ; 0,598]   ← 0,5 ± 1,96 · 0,05
  partie 2 (Interpréter : 1)
  Interpréter : sur quoi repose cet IC de Wald ?
    · Le paramètre est dans cet intervalle avec la probabilité 0,95. [p_ci_prob]   · Il est exact pour tout n.   · 95 % des données sont dans cet intervalle. [p_ci_data]   ✔ Il est approché : valable si n est grand et si le modèle est régulier (le support ne dépend pas du paramètre).
    [examen open]
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_ci_prob, p_ci_data, p_mle_constant_kept

```

## MLE au bord du support ; invariance (`p-mle-special`, BA3)

_Quand le support dépend de θ, le maximum est au bord (θ̂ = max xᵢ) ; et le MLE de g(θ) est g(θ̂)._

### Niveau 1

```
Les données 14 ; 8 ; 12 ; 14 ; 2 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂.
  [guided]  θ̂
    (L(θ) = θ^−5 si θ ≥ 14, et 0 sinon.)
    (Peut-on annuler ℓ′ ? Non : ℓ′(θ) = −5/θ ne s'annule pas ; L vaut 0 si θ < 14, puis décroît : le maximum est au bord, en 14.)
    = □   (trous : 14)   ← θ̂ = max xᵢ
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−5 pour θ ≥ □ | θ̂ = 14
  pièges : p_mle_support

Les données 15 ; 15 ; 6 ; 3 ; 15 ; 6 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂.
  [guided]  θ̂
    (L(θ) = θ^−6 si θ ≥ 15, et 0 sinon.)
    (Peut-on annuler ℓ′ ? Non : ℓ′(θ) = −6/θ ne s'annule pas ; L vaut 0 si θ < 15, puis décroît : le maximum est au bord, en 15.)
    = □   (trous : 15)   ← θ̂ = max xᵢ
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−6 pour θ ≥ □ | θ̂ = 15
  pièges : p_mle_support

Les données 2 ; 6 ; 14 ; 11 ; 1 ; 6 ; 11 ; 15 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂.
  [guided]  θ̂
    (L(θ) = θ^−8 si θ ≥ 15, et 0 sinon.)
    (Peut-on annuler ℓ′ ? Non : ℓ′(θ) = −8/θ ne s'annule pas ; L vaut 0 si θ < 15, puis décroît : le maximum est au bord, en 15.)
    = □   (trous : 15)   ← θ̂ = max xᵢ
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−8 pour θ ≥ □ | θ̂ = 15
  pièges : p_mle_support

```

### Niveau 2

```
Les données 3 ; 3 ; 10 ; 6 ; 13 ; 11 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 3).
  [guided]  θ̂
    (L(θ) = θ^−6 si θ ≥ 13, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −6/θ ne s'annule pas ; L vaut 0 si θ < 13, puis décroît : le maximum est au bord, en 13 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = □   (trous : 13)   ← θ̂ = max xᵢ
  — Pr(X≤3)  [juge prob]  départ : Pr(X ≤ 3)
    = 3/□   (trous : 3/13)   ← Pr(X ≤ c) = c/θ, en θ̂
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−6 pour θ ≥ □ | θ̂ = 13
  pièges : p_mle_support, p_mle_invariance_ignored

Les données 3 ; 12 ; 3 ; 6 ; 6 ; 7 ; 10 ; 12 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 8).
  [guided]  θ̂
    (L(θ) = θ^−8 si θ ≥ 12, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −8/θ ne s'annule pas ; L vaut 0 si θ < 12, puis décroît : le maximum est au bord, en 12 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = □   (trous : 12)   ← θ̂ = max xᵢ
  — Pr(X≤8)  [juge prob]  départ : Pr(X ≤ 8)
    = 8/□   (trous : 8/12)   ← Pr(X ≤ c) = c/θ, en θ̂
    = □   (trous : 2/3)   ← Calculer
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−8 pour θ ≥ □ | θ̂ = 12
  pièges : p_mle_support, p_mle_invariance_ignored

Les données 7 ; 11 ; 8 ; 3 ; 1 ; 1 ; 9 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 10).
  [guided]  θ̂
    (L(θ) = θ^−7 si θ ≥ 11, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −7/θ ne s'annule pas ; L vaut 0 si θ < 11, puis décroît : le maximum est au bord, en 11 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = □   (trous : 11)   ← θ̂ = max xᵢ
  — Pr(X≤10)  [juge prob]  départ : Pr(X ≤ 10)
    = 10/□   (trous : 10/11)   ← Pr(X ≤ c) = c/θ, en θ̂
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−7 pour θ ≥ □ | θ̂ = 11
  pièges : p_mle_support, p_mle_invariance_ignored

```

### Niveau 3

```
Les données 13 ; 9 ; 6 ; 14 ; 9 ; 5 ; 4 ; 7 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 11).
  [tap, suivre l'erreur, menu menu]  θ̂
    (L(θ) = θ^−8 si θ ≥ 14, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −8/θ ne s'annule pas ; L vaut 0 si θ < 14, puis décroît : le maximum est au bord, en 14 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 14   ← θ̂ = max xᵢ
  — Pr(X≤11)  [juge prob]  départ : Pr(X ≤ 11)
    = 11/14   ← Pr(X ≤ c) = c/θ, en θ̂
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−8 pour θ ≥ □ | θ̂ = 14
  pièges : p_mle_support, p_mle_invariance_ignored

Les données 11 ; −15 ; −4 ; 0 ; −8 ; −5 sont iid de loi U[−θ ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(|X| ≤ 7).
  [tap, suivre l'erreur, menu menu]  θ̂
    (L(θ) = (2θ)^−6 si θ ≥ 15, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −6/θ ne s'annule pas ; L vaut 0 si θ < 15, puis décroît : le maximum est au bord, en 15 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 15   ← θ̂ = max|xᵢ|
  — Pr(|X|≤7)  [juge prob]  départ : Pr(|X| ≤ 7)
    = 7/15   ← Pr(|X| ≤ c) = c/θ, en θ̂
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−6 pour θ ≥ □ | θ̂ = 15
  pièges : p_mle_invariance_ignored, p_mle_support

Les données 14 ; 15 ; 9 ; 4 ; 15 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 4).
  [tap, suivre l'erreur, menu menu]  θ̂
    (L(θ) = θ^−5 si θ ≥ 15, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −5/θ ne s'annule pas ; L vaut 0 si θ < 15, puis décroît : le maximum est au bord, en 15 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 15   ← θ̂ = max xᵢ
  — Pr(X≤4)  [juge prob]  départ : Pr(X ≤ 4)
    = 4/15   ← Pr(X ≤ c) = c/θ, en θ̂
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−5 pour θ ≥ □ | θ̂ = 15
  pièges : p_mle_support, p_mle_invariance_ignored

```

### Niveau 4

```
Les durées 2 ; 4 ; 9 ; 5 ; 8 ; 7 ; 7 ; 3 ; 4 ; 7 sont iid de loi exponentielle de moyenne θ. Le MLE de θ est x̄. Donne le maximum de vraisemblance de Pr(X ≤ 2).
  [free, suivre l'erreur]  θ̂
    = 56/10   ← θ̂ = x̄
    = 5,6   ← Calculer
  — Pr(X≤2)  [juge stat]  départ : Pr(X ≤ 2)
    = 1 − e^(−2/5,6)   ← Pr(X ≤ c) = 1 − e^(−c/θ), en θ̂
    = 0,3   ← Calculer
  aides : Invariance : le MLE de g(θ) est g(θ̂). | 1-e^(-2/□) | ≈ 0,3
  pièges : p_mle_invariance_ignored, p_exp_rate_mean

Les données 9 ; 15 ; 9 ; 5 ; 3 ; 3 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 6).
  [free, suivre l'erreur]  θ̂
    (L(θ) = θ^−6 si θ ≥ 15, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −6/θ ne s'annule pas ; L vaut 0 si θ < 15, puis décroît : le maximum est au bord, en 15 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 15   ← θ̂ = max xᵢ
  — Pr(X≤6)  [juge prob]  départ : Pr(X ≤ 6)
    = 6/15   ← Pr(X ≤ c) = c/θ, en θ̂
    = 0,4   ← Calculer
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−6 pour θ ≥ □ | θ̂ = 15
  pièges : p_mle_support, p_mle_invariance_ignored

Les données 13 ; 7 ; 13 ; 12 ; 6 ; 15 ; 15 ; 3 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 14).
  [free, suivre l'erreur]  θ̂
    (L(θ) = θ^−8 si θ ≥ 15, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −8/θ ne s'annule pas ; L vaut 0 si θ < 15, puis décroît : le maximum est au bord, en 15 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 15   ← θ̂ = max xᵢ
  — Pr(X≤14)  [juge prob]  départ : Pr(X ≤ 14)
    = 14/15   ← Pr(X ≤ c) = c/θ, en θ̂
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−8 pour θ ≥ □ | θ̂ = 15
  pièges : p_mle_support, p_mle_invariance_ignored

```

### Niveau 5

```
Les données 1 ; 5 ; 1 ; 9 ; 9 ; 3 ; 5 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 8).
  [free, sans aide]  θ̂
    (L(θ) = θ^−7 si θ ≥ 9, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −7/θ ne s'annule pas ; L vaut 0 si θ < 9, puis décroît : le maximum est au bord, en 9 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 9   ← θ̂ = max xᵢ
  — Pr(X≤8)  [juge prob]  départ : Pr(X ≤ 8)
    = 8/9   ← Pr(X ≤ c) = c/θ, en θ̂
  pièges : p_mle_support, p_mle_invariance_ignored

Les données 3 ; 5 ; 4 ; 2 ; 10 ; 14 ; 10 ; 11 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 10).
  [free, sans aide]  θ̂
    (L(θ) = θ^−8 si θ ≥ 14, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −8/θ ne s'annule pas ; L vaut 0 si θ < 14, puis décroît : le maximum est au bord, en 14 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 14   ← θ̂ = max xᵢ
  — Pr(X≤10)  [juge prob]  départ : Pr(X ≤ 10)
    = 10/14   ← Pr(X ≤ c) = c/θ, en θ̂
    = 5/7   ← Calculer
  pièges : p_mle_support, p_mle_invariance_ignored

Les données 15 ; 9 ; 12 ; 12 ; 15 ; 11 ; 11 ; 15 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 4).
  [free, sans aide]  θ̂
    (L(θ) = θ^−8 si θ ≥ 15, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −8/θ ne s'annule pas ; L vaut 0 si θ < 15, puis décroît : le maximum est au bord, en 15 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 15   ← θ̂ = max xᵢ
  — Pr(X≤4)  [juge prob]  départ : Pr(X ≤ 4)
    = 4/15   ← Pr(X ≤ c) = c/θ, en θ̂
  pièges : p_mle_support, p_mle_invariance_ignored

```

### Variantes d'examen

```
X₁, …, Xₙ iid de loi exponentielle de moyenne θ (le MLE de θ est X̄). Quel est le maximum de vraisemblance de Pr(X ≤ 2) ?
  ✔ 1 − e^(−2/X̄)   · (1/n)·Σ 1{Xᵢ ≤ 2} [p_mle_invariance_ignored]   · Il n'existe pas [p_mle_support]   · 1 − e^(−2X̄) [p_exp_rate_mean]
  [examen mcq]
  pièges : p_mle_invariance_ignored, p_exp_rate_mean, p_mle_support

Vrai ou faux ?
  « Pour des données positives de U[0 ; θ], l'estimateur 2x̄ est toujours au moins égal à max xᵢ (la vraisemblance y est donc non nulle). » → FAUX
    contre-exemple (refute) : a = 0, b = 1, c = 9
  [examen tf]
  pièges : p_mle_support

Les données −8 ; −15 ; 11 ; 13 ; −9 ; 5 ; 0 ; −14 sont iid de loi U[−θ ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(|X| ≤ 8).
  [free, sans aide, examen coef]  Pr(|X| ≤ 8)
    = 8/15   ← Pr(|X| ≤ c) = c/θ, en θ̂
  pièges : p_mle_invariance_ignored

```

## Biais, variance, erreur quadratique moyenne, consistance (`p-bias-mse`, BA3)

_Biais, variance et erreur quadratique moyenne d'un estimateur, et consistance._

### Niveau 1

```
Y₁, …, Yₙ sont iid de densité f(y) = 5y⁴/θ⁵ sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le.
  [guided]  E[Y]
    = □θ/6   (trous : 5θ/6)   ← ∫₀^θ 5y^5/θ^5 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/6   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = □   (trous : 1,2)   ← c·5/6θ = θ
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (1,2)² · 5/252θ²/□ | var(θ̂) = θ^2/(35n)

Y₁, …, Yₙ sont iid de densité f(y) = 2y/θ² sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le.
  [guided]  E[Y]
    = □θ/3   (trous : 2θ/3)   ← ∫₀^θ 2y^2/θ^2 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/3   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = □   (trous : 1,5)   ← c·2/3θ = θ
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (1,5)² · 1/18θ²/□ | var(θ̂) = θ^2/(8n)

Y₁, …, Yₙ sont iid de densité f(y) = 3y²/θ³ sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le.
  [guided]  E[Y]
    = □θ/4   (trous : 3θ/4)   ← ∫₀^θ 3y^3/θ^3 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/4   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = □   (trous : 4/3)   ← c·0,75θ = θ
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (4/3)² · 0,0375θ²/□ | var(θ̂) = θ^2/(15n)

```

### Niveau 2

```
Y₁, …, Yₙ sont iid de densité f(y) = 5y⁴/θ⁵ sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
  [guided]  E[Y]
    = □θ/6   (trous : 5θ/6)   ← ∫₀^θ 5y^5/θ^5 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/6   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = □   (trous : 1,2)   ← c·5/6θ = θ
  — E[Y²]  [juge prob]  départ : E[Y²]
    = 5θ²/7   ← ∫₀^θ 5y^6/θ^5 dy
  — var(Y)  [juge prob]  départ : var(Y)
    = 5θ²/252   ← Simplifier
  — var(θ̂)  [juge prob]  départ : var(θ̂)
    = θ²/(35□)   (trous : θ²/(35n))   ← (1,2)² · var(Y)/n
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (1,2)² · 5/252θ²/□ | var(θ̂) = θ^2/(35n)
  pièges : p_var_scale, p_se_forgot_sqrt_n, p_unbiased_better, p_mse_bias_not_squared

Y₁, …, Yₙ sont iid de densité f(y) = 5y⁴/θ⁵ sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
  [guided]  E[Y]
    = □θ/6   (trous : 5θ/6)   ← ∫₀^θ 5y^5/θ^5 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/6   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = □   (trous : 1,2)   ← c·5/6θ = θ
  — E[Y²]  [juge prob]  départ : E[Y²]
    = 5θ²/7   ← ∫₀^θ 5y^6/θ^5 dy
  — var(Y)  [juge prob]  départ : var(Y)
    = 5θ²/252   ← Simplifier
  — var(θ̂)  [juge prob]  départ : var(θ̂)
    = θ²/(35□)   (trous : θ²/(35n))   ← (1,2)² · var(Y)/n
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (1,2)² · 5/252θ²/□ | var(θ̂) = θ^2/(35n)
  pièges : p_var_scale, p_se_forgot_sqrt_n, p_unbiased_better, p_mse_bias_not_squared

Y₁, …, Yₙ sont iid de densité f(y) = 4y³/θ⁴ sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
  [guided]  E[Y]
    = □θ/5   (trous : 4θ/5)   ← ∫₀^θ 4y^4/θ^4 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/5   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = □   (trous : 1,25)   ← c·0,8θ = θ
  — E[Y²]  [juge prob]  départ : E[Y²]
    = 2θ²/3   ← ∫₀^θ 4y^5/θ^4 dy
  — var(Y)  [juge prob]  départ : var(Y)
    = 2θ²/75   ← Simplifier
  — var(θ̂)  [juge prob]  départ : var(θ̂)
    = θ²/(24□)   (trous : θ²/(24n))   ← (1,25)² · var(Y)/n
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (1,25)² · 2/75θ²/□ | var(θ̂) = θ^2/(24n)
  pièges : p_var_scale, p_se_forgot_sqrt_n, p_unbiased_better, p_mse_bias_not_squared

```

### Niveau 3

```
Y₁, …, Yₙ sont iid de densité f(y) = 3y²/θ³ sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
  [tap, suivre l'erreur, menu menu]  E[Y]
    = 3θ/4   ← ∫₀^θ 3y^3/θ^3 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/4   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = 4/3   ← c·0,75θ = θ
  — E[Y²]  [juge prob]  départ : E[Y²]
    = 3θ²/5   ← ∫₀^θ 3y^4/θ^3 dy
  — var(Y)  [juge prob]  départ : var(Y)
    = 3θ²/80   ← Simplifier
  — var(θ̂)  [juge prob]  départ : var(θ̂)
    = θ²/(15n)   ← (4/3)² · var(Y)/n
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (4/3)² · 0,0375θ²/□ | var(θ̂) = θ^2/(15n)
  pièges : p_var_scale, p_se_forgot_sqrt_n, p_unbiased_better, p_mse_bias_not_squared

Y₁, …, Yₙ sont iid de densité f(y) = 5y⁴/θ⁵ sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
  [tap, suivre l'erreur, menu menu]  E[Y]
    = 5θ/6   ← ∫₀^θ 5y^5/θ^5 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/6   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = 1,2   ← c·5/6θ = θ
  — E[Y²]  [juge prob]  départ : E[Y²]
    = 5θ²/7   ← ∫₀^θ 5y^6/θ^5 dy
  — var(Y)  [juge prob]  départ : var(Y)
    = 5θ²/252   ← Simplifier
  — var(θ̂)  [juge prob]  départ : var(θ̂)
    = θ²/(35n)   ← (1,2)² · var(Y)/n
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (1,2)² · 5/252θ²/□ | var(θ̂) = θ^2/(35n)
  pièges : p_var_scale, p_se_forgot_sqrt_n, p_unbiased_better, p_mse_bias_not_squared

Y₁, …, Yₙ sont iid de densité f(y) = 5y⁴/θ⁵ sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
  [tap, suivre l'erreur, menu menu]  E[Y]
    = 5θ/6   ← ∫₀^θ 5y^5/θ^5 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/6   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = 1,2   ← c·5/6θ = θ
  — E[Y²]  [juge prob]  départ : E[Y²]
    = 5θ²/7   ← ∫₀^θ 5y^6/θ^5 dy
  — var(Y)  [juge prob]  départ : var(Y)
    = 5θ²/252   ← Simplifier
  — var(θ̂)  [juge prob]  départ : var(θ̂)
    = θ²/(35n)   ← (1,2)² · var(Y)/n
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (1,2)² · 5/252θ²/□ | var(θ̂) = θ^2/(35n)
  pièges : p_var_scale, p_se_forgot_sqrt_n, p_unbiased_better, p_mse_bias_not_squared

```

### Niveau 4

```
Y₁, …, Yₙ sont iid de densité f(y) = 5y⁴/θ⁵ sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
  [free, suivre l'erreur]  E[Y]
    = 5θ/6   ← ∫₀^θ 5y^5/θ^5 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/6   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = 1,2   ← c·5/6θ = θ
  — E[Y²]  [juge prob]  départ : E[Y²]
    = 5θ²/7   ← ∫₀^θ 5y^6/θ^5 dy
  — var(Y)  [juge prob]  départ : var(Y)
    = 5θ²/252   ← Simplifier
  — var(θ̂)  [juge prob]  départ : var(θ̂)
    = θ²/(35n)   ← (1,2)² · var(Y)/n
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (1,2)² · 5/252θ²/□ | var(θ̂) = θ^2/(35n)
  pièges : p_var_scale, p_se_forgot_sqrt_n, p_unbiased_better, p_mse_bias_not_squared

Y₁, …, Yₙ sont iid de densité f(y) = 5y⁴/θ⁵ sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
  [free, suivre l'erreur]  E[Y]
    = 5θ/6   ← ∫₀^θ 5y^5/θ^5 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/6   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = 1,2   ← c·5/6θ = θ
  — E[Y²]  [juge prob]  départ : E[Y²]
    = 5θ²/7   ← ∫₀^θ 5y^6/θ^5 dy
  — var(Y)  [juge prob]  départ : var(Y)
    = 5θ²/252   ← Simplifier
  — var(θ̂)  [juge prob]  départ : var(θ̂)
    = θ²/(35n)   ← (1,2)² · var(Y)/n
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (1,2)² · 5/252θ²/□ | var(θ̂) = θ^2/(35n)
  pièges : p_var_scale, p_se_forgot_sqrt_n, p_unbiased_better, p_mse_bias_not_squared

Y₁, …, Yₙ sont iid de densité 4y³/θ⁴ sur ]0 ; θ[ : E[Y] = 4θ/5 et var(Y) = 2θ²/75. Calcule l'erreur quadratique moyenne de Ȳ comme estimateur de θ.
  [free, suivre l'erreur]  biais(Ȳ)
    = −θ/5   ← E[Ȳ] − θ
  — var(Ȳ)  [juge prob]  départ : var(Ȳ)
    = 2θ²/(75n)   ← var(Ȳ) = var(Y)/n
  — EQM(Ȳ)  [juge prob]  départ : EQM(Ȳ)
    = 2θ²/(75n) + θ²/25   ← EQM = var + biais²
  aides : EQM = var + biais². | EQM = 2θ^2/(75n) + (□)² | EQM = 2θ^2/(75n) + θ^2/25
  pièges : p_se_forgot_sqrt_n, p_mse_bias_not_squared, p_unbiased_better

```

### Niveau 5

```
X₁, …, Xₙ sont iid de loi U[0 ; θ]. Compare les erreurs quadratiques moyennes de 2X̄ (sans biais) et de M = max Xᵢ, sachant que E[M] = nθ/(n + 1) et var(M) = nθ²/((n + 1)²(n + 2)).
  [free, sans aide]  EQM(2X̄)
    = θ²/(3n)   ← 4 · (θ²/12)/n
  — biais(M)  [juge prob]  départ : biais(M)
    = −θ/(n + 1)   ← nθ/(n + 1) − θ
  — EQM(M)  [juge prob]  départ : EQM(M)
    = 2θ²/((n + 1)(n + 2))   ← var(M) + biais(M)², simplifié
  pièges : p_var_scale, p_mse_bias_not_squared

X₁, …, Xₙ sont iid de loi U[0 ; θ]. Compare les erreurs quadratiques moyennes de 2X̄ (sans biais) et de M = max Xᵢ, sachant que E[M] = nθ/(n + 1) et var(M) = nθ²/((n + 1)²(n + 2)).
  [free, sans aide]  EQM(2X̄)
    = θ²/(3n)   ← 4 · (θ²/12)/n
  — biais(M)  [juge prob]  départ : biais(M)
    = −θ/(n + 1)   ← nθ/(n + 1) − θ
  — EQM(M)  [juge prob]  départ : EQM(M)
    = 2θ²/((n + 1)(n + 2))   ← var(M) + biais(M)², simplifié
  pièges : p_var_scale, p_mse_bias_not_squared

Y₁, …, Yₙ sont iid de densité 2y/θ² sur ]0 ; θ[ : E[Y] = 2θ/3 et var(Y) = θ²/18. Calcule l'erreur quadratique moyenne de Ȳ comme estimateur de θ.
  [free, sans aide]  biais(Ȳ)
    = −θ/3   ← E[Ȳ] − θ
  — var(Ȳ)  [juge prob]  départ : var(Ȳ)
    = θ²/(18n)   ← var(Ȳ) = var(Y)/n
  — EQM(Ȳ)  [juge prob]  départ : EQM(Ȳ)
    = θ²/(18n) + θ²/9   ← EQM = var + biais²
  pièges : p_se_forgot_sqrt_n, p_mse_bias_not_squared

```

### Variantes d'examen

```
Y₁, …, Yₙ iid de densité 4y³/θ⁴ sur ]0 ; θ[. On pose θ̂ = (1,25)·Ȳ, sans biais. Que vaut var(θ̂) ?
  · 2θ^2/(75n)   · θ^2/(30n) [p_var_scale]   ✔ θ^2/(24n)   · θ^2/24 [p_se_forgot_sqrt_n]
  [examen mcq]
  pièges : p_var_scale, p_se_forgot_sqrt_n

Vrai ou faux ?
  « Si Y a pour densité 3y²/θ³ sur ]0 ; θ[, Ȳ est un estimateur sans biais de θ. » → FAUX
    contre-exemple (refute) : t = 1
  [examen tf]
  pièges : p_unbiased_better

```

## Information de Fisher, Cramér-Rao (`p-fisher-cr`, BA4)

_L'information de Fisher I(θ) = n·I₁(θ) et la borne de Cramér-Rao des estimateurs sans biais._

### Niveau 1

```
X₁, …, Xₙ sont iid de loi Bernoulli de paramètre p. Calcule l'information de Fisher I₁(p) d'une observation.
  [guided]  ∂ln f/∂p
    (ln f(x ; p) = x·ln p + (1 − x)·ln(1 − p) (à une constante près).)
    = □   (trous : x/p − (1 − x)/(1 − p))   ← Le score d'une observation
  — ∂²ln f/∂p²  [juge prob]  départ : ∂²ln f/∂p²
    = −x/p² − (1 − x)/(1 − p)²   ← Dériver deux fois
  — I₁(p)  [juge prob]  départ : I_1(p)
    = 1/(p(1 − p))   ← I₁ = −E[∂² ln f], avec E[X] = p
  aides : Dérive deux fois ln f en p, puis prends l'espérance de l'opposé. | I₁(p) = −E[-x/p^2-(1-x)/(1-p)^2] = □ | I₁(p) = 1/(p(1-p))
  pièges : p_fisher_sign

X₁, …, Xₙ sont iid de loi Bernoulli de paramètre p. Calcule l'information de Fisher I₁(p) d'une observation.
  [guided]  ∂ln f/∂p
    (ln f(x ; p) = x·ln p + (1 − x)·ln(1 − p) (à une constante près).)
    = □   (trous : x/p − (1 − x)/(1 − p))   ← Le score d'une observation
  — ∂²ln f/∂p²  [juge prob]  départ : ∂²ln f/∂p²
    = −x/p² − (1 − x)/(1 − p)²   ← Dériver deux fois
  — I₁(p)  [juge prob]  départ : I_1(p)
    = 1/(p(1 − p))   ← I₁ = −E[∂² ln f], avec E[X] = p
  aides : Dérive deux fois ln f en p, puis prends l'espérance de l'opposé. | I₁(p) = −E[-x/p^2-(1-x)/(1-p)^2] = □ | I₁(p) = 1/(p(1-p))
  pièges : p_fisher_sign

X₁, …, Xₙ sont iid de loi Bernoulli de paramètre p. Calcule l'information de Fisher I₁(p) d'une observation.
  [guided]  ∂ln f/∂p
    (ln f(x ; p) = x·ln p + (1 − x)·ln(1 − p) (à une constante près).)
    = □   (trous : x/p − (1 − x)/(1 − p))   ← Le score d'une observation
  — ∂²ln f/∂p²  [juge prob]  départ : ∂²ln f/∂p²
    = −x/p² − (1 − x)/(1 − p)²   ← Dériver deux fois
  — I₁(p)  [juge prob]  départ : I_1(p)
    = 1/(p(1 − p))   ← I₁ = −E[∂² ln f], avec E[X] = p
  aides : Dérive deux fois ln f en p, puis prends l'espérance de l'opposé. | I₁(p) = −E[-x/p^2-(1-x)/(1-p)^2] = □ | I₁(p) = 1/(p(1-p))
  pièges : p_fisher_sign

```

### Niveau 2

```
X₁, …, Xₙ sont iid de loi exp(λ). Calcule l'information de Fisher I₁(λ) d'une observation, puis la borne de Cramér-Rao.
  [guided]  ∂ln f/∂λ
    (ln f(x ; λ) = ln λ − λx (à une constante près).)
    = □   (trous : 1/λ − x)   ← Le score d'une observation
  — ∂²ln f/∂λ²  [juge prob]  départ : ∂²ln f/∂λ²
    = −1/λ²   ← Dériver deux fois
  — I₁(λ)  [juge prob]  départ : I_1(λ)
    = 1/λ²   ← I₁ = −E[∂² ln f], avec la dérivée seconde ne dépend pas de x
  — borne de Cramér-Rao  [juge prob]  départ : borne de Cramér-Rao
    ? À quels estimateurs la borne s'applique-t-elle ? ✔ Aux estimateurs sans biais de λ / · À tous les estimateurs, même biaisés
    = λ²/□   (trous : λ²/n)   ← 1/(n·I₁)
  aides : Dérive deux fois ln f en λ, puis prends l'espérance de l'opposé. | I₁(λ) = −E[-1/λ^2] = □ | I₁(λ) = 1/λ^2
  pièges : p_fisher_sign, p_fisher_per_obs, p_cr_biased

X₁, …, Xₙ sont iid de loi Poiss(λ). Calcule l'information de Fisher I₁(λ) d'une observation, puis la borne de Cramér-Rao.
  [guided]  ∂ln f/∂λ
    (ln f(x ; λ) = x·ln λ − λ − ln(x!) (à une constante près).)
    = □   (trous : x/λ − 1)   ← Le score d'une observation
  — ∂²ln f/∂λ²  [juge prob]  départ : ∂²ln f/∂λ²
    = −x/λ²   ← Dériver deux fois
  — I₁(λ)  [juge prob]  départ : I_1(λ)
    = 1/λ   ← I₁ = −E[∂² ln f], avec E[X] = λ
  — borne de Cramér-Rao  [juge prob]  départ : borne de Cramér-Rao
    ? À quels estimateurs la borne s'applique-t-elle ? ✔ Aux estimateurs sans biais de λ / · À tous les estimateurs, même biaisés
    = λ/□   (trous : λ/n)   ← 1/(n·I₁)
  aides : Dérive deux fois ln f en λ, puis prends l'espérance de l'opposé. | I₁(λ) = −E[-x/λ^2] = □ | I₁(λ) = 1/λ
  pièges : p_fisher_sign, p_fisher_per_obs, p_cr_biased

X₁, …, Xₙ sont iid de loi N(0, v) (v = σ² inconnue). Calcule l'information de Fisher I₁(v) d'une observation, puis la borne de Cramér-Rao.
  [guided]  ∂ln f/∂v
    (ln f(x ; v) = −ln(v)/2 − x²/(2v) (à une constante près).)
    = □   (trous : −1/(2v) + x²/(2v²))   ← Le score d'une observation
  — ∂²ln f/∂v²  [juge prob]  départ : ∂²ln f/∂v²
    = 1/(2v²) − x²/v³   ← Dériver deux fois
  — I₁(v)  [juge prob]  départ : I_1(v)
    = 1/(2v²)   ← I₁ = −E[∂² ln f], avec E[X²] = v
  — borne de Cramér-Rao  [juge prob]  départ : borne de Cramér-Rao
    ? À quels estimateurs la borne s'applique-t-elle ? ✔ Aux estimateurs sans biais de v / · À tous les estimateurs, même biaisés
    = 2v²/□   (trous : 2v²/n)   ← 1/(n·I₁)
  aides : Dérive deux fois ln f en v, puis prends l'espérance de l'opposé. | I₁(v) = −E[1/(2v^2)-x^2/v^3] = □ | I₁(v) = 1/(2v^2)
  pièges : p_fisher_sign, p_fisher_per_obs, p_cr_biased

```

### Niveau 3

```
X₁, …, Xₙ sont iid de loi N(0, v) (v = σ² inconnue). Calcule l'information de Fisher I₁(v) d'une observation, puis la borne de Cramér-Rao.
  [tap, suivre l'erreur, menu menu]  ∂ln f/∂v
    (ln f(x ; v) = −ln(v)/2 − x²/(2v) (à une constante près).)
    = −1/(2v) + x²/(2v²)   ← Le score d'une observation
  — ∂²ln f/∂v²  [juge prob]  départ : ∂²ln f/∂v²
    = 1/(2v²) − x²/v³   ← Dériver deux fois
  — I₁(v)  [juge prob]  départ : I_1(v)
    = 1/(2v²)   ← I₁ = −E[∂² ln f], avec E[X²] = v
  — borne de Cramér-Rao  [juge prob]  départ : borne de Cramér-Rao
    ? À quels estimateurs la borne s'applique-t-elle ? ✔ Aux estimateurs sans biais de v / · À tous les estimateurs, même biaisés
    = 2v²/n   ← 1/(n·I₁)
  aides : Dérive deux fois ln f en v, puis prends l'espérance de l'opposé. | I₁(v) = −E[1/(2v^2)-x^2/v^3] = □ | I₁(v) = 1/(2v^2)
  pièges : p_fisher_sign, p_fisher_per_obs, p_cr_biased

X₁, …, Xₙ sont iid de loi Poiss(λ). Calcule l'information de Fisher I₁(λ) d'une observation, puis la borne de Cramér-Rao.
  [tap, suivre l'erreur, menu menu]  ∂ln f/∂λ
    (ln f(x ; λ) = x·ln λ − λ − ln(x!) (à une constante près).)
    = x/λ − 1   ← Le score d'une observation
  — ∂²ln f/∂λ²  [juge prob]  départ : ∂²ln f/∂λ²
    = −x/λ²   ← Dériver deux fois
  — I₁(λ)  [juge prob]  départ : I_1(λ)
    = 1/λ   ← I₁ = −E[∂² ln f], avec E[X] = λ
  — borne de Cramér-Rao  [juge prob]  départ : borne de Cramér-Rao
    ? À quels estimateurs la borne s'applique-t-elle ? ✔ Aux estimateurs sans biais de λ / · À tous les estimateurs, même biaisés
    = λ/n   ← 1/(n·I₁)
  aides : Dérive deux fois ln f en λ, puis prends l'espérance de l'opposé. | I₁(λ) = −E[-x/λ^2] = □ | I₁(λ) = 1/λ
  pièges : p_fisher_sign, p_fisher_per_obs, p_cr_biased

X₁, …, Xₙ sont iid de loi Bernoulli de paramètre p. Calcule l'information de Fisher I₁(p) d'une observation, puis la borne de Cramér-Rao.
  [tap, suivre l'erreur, menu menu]  ∂ln f/∂p
    (ln f(x ; p) = x·ln p + (1 − x)·ln(1 − p) (à une constante près).)
    = x/p − (1 − x)/(1 − p)   ← Le score d'une observation
  — ∂²ln f/∂p²  [juge prob]  départ : ∂²ln f/∂p²
    = −x/p² − (1 − x)/(1 − p)²   ← Dériver deux fois
  — I₁(p)  [juge prob]  départ : I_1(p)
    = 1/(p(1 − p))   ← I₁ = −E[∂² ln f], avec E[X] = p
  — borne de Cramér-Rao  [juge prob]  départ : borne de Cramér-Rao
    ? À quels estimateurs la borne s'applique-t-elle ? ✔ Aux estimateurs sans biais de p / · À tous les estimateurs, même biaisés
    = p(1 − p)/n   ← 1/(n·I₁)
  aides : Dérive deux fois ln f en p, puis prends l'espérance de l'opposé. | I₁(p) = −E[-x/p^2-(1-x)/(1-p)^2] = □ | I₁(p) = 1/(p(1-p))
  pièges : p_fisher_sign, p_fisher_per_obs, p_cr_biased

```

### Niveau 4

```
X₁, …, Xₙ sont iid de loi Poiss(λ). Calcule l'information de Fisher I₁(λ) d'une observation, puis la borne de Cramér-Rao.
  [free, suivre l'erreur]  ∂ln f/∂λ
    (ln f(x ; λ) = x·ln λ − λ − ln(x!) (à une constante près).)
    = x/λ − 1   ← Le score d'une observation
  — ∂²ln f/∂λ²  [juge prob]  départ : ∂²ln f/∂λ²
    = −x/λ²   ← Dériver deux fois
  — I₁(λ)  [juge prob]  départ : I_1(λ)
    = 1/λ   ← I₁ = −E[∂² ln f], avec E[X] = λ
  — borne de Cramér-Rao  [juge prob]  départ : borne de Cramér-Rao
    ? À quels estimateurs la borne s'applique-t-elle ? ✔ Aux estimateurs sans biais de λ / · À tous les estimateurs, même biaisés
    = λ/n   ← 1/(n·I₁)
  aides : Dérive deux fois ln f en λ, puis prends l'espérance de l'opposé. | I₁(λ) = −E[-x/λ^2] = □ | I₁(λ) = 1/λ
  pièges : p_fisher_sign, p_fisher_per_obs, p_cr_biased

X₁, …, Xₙ sont iid de loi Bernoulli de paramètre p. Calcule l'information de Fisher I₁(p) d'une observation, puis la borne de Cramér-Rao.
  [free, suivre l'erreur]  ∂ln f/∂p
    (ln f(x ; p) = x·ln p + (1 − x)·ln(1 − p) (à une constante près).)
    = x/p − (1 − x)/(1 − p)   ← Le score d'une observation
  — ∂²ln f/∂p²  [juge prob]  départ : ∂²ln f/∂p²
    = −x/p² − (1 − x)/(1 − p)²   ← Dériver deux fois
  — I₁(p)  [juge prob]  départ : I_1(p)
    = 1/(p(1 − p))   ← I₁ = −E[∂² ln f], avec E[X] = p
  — borne de Cramér-Rao  [juge prob]  départ : borne de Cramér-Rao
    ? À quels estimateurs la borne s'applique-t-elle ? ✔ Aux estimateurs sans biais de p / · À tous les estimateurs, même biaisés
    = p(1 − p)/n   ← 1/(n·I₁)
  aides : Dérive deux fois ln f en p, puis prends l'espérance de l'opposé. | I₁(p) = −E[-x/p^2-(1-x)/(1-p)^2] = □ | I₁(p) = 1/(p(1-p))
  pièges : p_fisher_sign, p_fisher_per_obs, p_cr_biased

X₁, …, Xₙ sont iid de loi exp(λ). Calcule l'information de Fisher I₁(λ) d'une observation, puis la borne de Cramér-Rao.
  [free, suivre l'erreur]  ∂ln f/∂λ
    (ln f(x ; λ) = ln λ − λx (à une constante près).)
    = 1/λ − x   ← Le score d'une observation
  — ∂²ln f/∂λ²  [juge prob]  départ : ∂²ln f/∂λ²
    = −1/λ²   ← Dériver deux fois
  — I₁(λ)  [juge prob]  départ : I_1(λ)
    = 1/λ²   ← I₁ = −E[∂² ln f], avec la dérivée seconde ne dépend pas de x
  — borne de Cramér-Rao  [juge prob]  départ : borne de Cramér-Rao
    ? À quels estimateurs la borne s'applique-t-elle ? ✔ Aux estimateurs sans biais de λ / · À tous les estimateurs, même biaisés
    = λ²/n   ← 1/(n·I₁)
  aides : Dérive deux fois ln f en λ, puis prends l'espérance de l'opposé. | I₁(λ) = −E[-1/λ^2] = □ | I₁(λ) = 1/λ^2
  pièges : p_fisher_sign, p_fisher_per_obs, p_cr_biased

```

### Niveau 5

```
X₁, …, Xₙ sont iid de loi N(μ, 4) (variance connue). Calcule l'information de Fisher I₁(μ) d'une observation, puis la borne de Cramér-Rao.
  [free, sans aide]  ∂ln f/∂μ
    (ln f(x ; μ) = −(x − μ)²/8 (à une constante près).)
    = (x − μ)/4   ← Le score d'une observation
  — ∂²ln f/∂μ²  [juge prob]  départ : ∂²ln f/∂μ²
    = −1/4   ← Dériver deux fois
  — I₁(μ)  [juge prob]  départ : I_1(μ)
    = 1/4   ← I₁ = −E[∂² ln f], avec la dérivée seconde est constante
  — borne de Cramér-Rao  [juge prob]  départ : borne de Cramér-Rao
    ? À quels estimateurs la borne s'applique-t-elle ? ✔ Aux estimateurs sans biais de μ / · À tous les estimateurs, même biaisés
    = 4/n   ← 1/(n·I₁)
  pièges : p_fisher_sign, p_fisher_per_obs, p_cr_biased

X₁, …, Xₙ sont iid de loi Poiss(λ). Calcule l'information de Fisher I₁(λ) d'une observation, puis la borne de Cramér-Rao.
  [free, sans aide]  ∂ln f/∂λ
    (ln f(x ; λ) = x·ln λ − λ − ln(x!) (à une constante près).)
    = x/λ − 1   ← Le score d'une observation
  — ∂²ln f/∂λ²  [juge prob]  départ : ∂²ln f/∂λ²
    = −x/λ²   ← Dériver deux fois
  — I₁(λ)  [juge prob]  départ : I_1(λ)
    = 1/λ   ← I₁ = −E[∂² ln f], avec E[X] = λ
  — borne de Cramér-Rao  [juge prob]  départ : borne de Cramér-Rao
    ? À quels estimateurs la borne s'applique-t-elle ? ✔ Aux estimateurs sans biais de λ / · À tous les estimateurs, même biaisés
    = λ/n   ← 1/(n·I₁)
  pièges : p_fisher_sign, p_fisher_per_obs, p_cr_biased

X₁, …, Xₙ sont iid de loi N(μ, 4) (variance connue). Calcule l'information de Fisher I₁(μ) d'une observation, puis la borne de Cramér-Rao.
  [free, sans aide]  ∂ln f/∂μ
    (ln f(x ; μ) = −(x − μ)²/8 (à une constante près).)
    = (x − μ)/4   ← Le score d'une observation
  — ∂²ln f/∂μ²  [juge prob]  départ : ∂²ln f/∂μ²
    = −1/4   ← Dériver deux fois
  — I₁(μ)  [juge prob]  départ : I_1(μ)
    = 1/4   ← I₁ = −E[∂² ln f], avec la dérivée seconde est constante
  — borne de Cramér-Rao  [juge prob]  départ : borne de Cramér-Rao
    ? À quels estimateurs la borne s'applique-t-elle ? ✔ Aux estimateurs sans biais de μ / · À tous les estimateurs, même biaisés
    = 4/n   ← 1/(n·I₁)
  pièges : p_fisher_sign, p_fisher_per_obs, p_cr_biased

```

### Variantes d'examen

```
X₁, …, Xₙ iid de loi N(μ, 4) (variance connue) ; I₁(μ) = 1/4. Quelle est la borne de Cramér-Rao pour un estimateur sans biais de μ ?
  · -4/n [p_fisher_sign]   · 1/4/n   · 4 [p_fisher_per_obs]   ✔ 4/n
  [examen mcq]
  pièges : p_fisher_per_obs, p_fisher_sign

Vrai ou faux ?
  « Pour X₁, …, Xₙ iid de loi Poiss(λ), tout estimateur de λ, biaisé ou non, a une variance au moins égale à λ/n. » → FAUX
    contre-exemple (refute) : w = 0
  [examen tf]
  pièges : p_cr_biased

```

## IC pour une moyenne : z ou Student (`p-ci-mean`, BA3)

_Un intervalle de confiance pour une moyenne, avec un quantile normal si σ est connu, de Student sinon._

### Niveau 1

```
Un appareil de mesure a un écart-type connu σ = 9. On fait 16 mesures de moyenne x̄ = 40. On suppose les mesures normales. Donne l’intervalle de confiance à 99 % pour μ.
  [guided]  z
    (Quel pivot ? σ est connu : la loi normale.)
    = □   (trous : 2,576)   ← Table 2
  — σ/√n  [juge stat]  départ : σ/√n
    = 9/√(□)   (trous : 9/√(16))   ← Erreur standard
    = □   (trous : 2,25)
  — u  [juge stat]  départ : u
    = 2,576·□   (trous : 2,576·2,25)   ← Demi-largeur
    = □   (trous : 5,796)
  — IC  [juge stat]  départ : IC
    = [40 − □ ; 40 + 5,796]   (trous : [40 − 5,796 ; 40 + 5,796])   ← x̄ ± u
    = [□ ; □]   (trous : [34,204 ; 45,796])
  aides : σ est connu : x̄ ± z·σ/√n, avec z = Φ⁻¹(0,975) = 1,96 pour 95 %. | [40-□ ; 40+□] | IC = [34,204 ; 45,796]
  pièges : p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

Un appareil de mesure a un écart-type connu σ = 4. On fait 36 mesures de moyenne x̄ = 111. On suppose les mesures normales. Donne l’intervalle de confiance à 95 % pour μ.
  [guided]  z
    (Quel pivot ? σ est connu : la loi normale.)
    = □   (trous : 1,96)   ← Table 2
  — σ/√n  [juge stat]  départ : σ/√n
    = 4/√(□)   (trous : 4/√(36))   ← Erreur standard
    = □   (trous : 0,667)
  — u  [juge stat]  départ : u
    = 1,96·□   (trous : 1,96·0,667)   ← Demi-largeur
    = □   (trous : 1,307)
  — IC  [juge stat]  départ : IC
    = [111 − □ ; 111 + 1,307]   (trous : [111 − 1,307 ; 111 + 1,307])   ← x̄ ± u
    = [□ ; □]   (trous : [109,693 ; 112,307])
  aides : σ est connu : x̄ ± z·σ/√n, avec z = Φ⁻¹(0,975) = 1,96 pour 95 %. | [111-□ ; 111+□] | IC = [109,693 ; 112,307]
  pièges : p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

Un appareil de mesure a un écart-type connu σ = 11. On fait 100 mesures de moyenne x̄ = 42. On suppose les mesures normales. Donne l’intervalle de confiance à 99 % pour μ.
  [guided]  z
    (Quel pivot ? σ est connu : la loi normale.)
    = □   (trous : 2,576)   ← Table 2
  — σ/√n  [juge stat]  départ : σ/√n
    = 11/√(□)   (trous : 11/√(100))   ← Erreur standard
    = □   (trous : 1,1)
  — u  [juge stat]  départ : u
    = 2,576·□   (trous : 2,576·1,1)   ← Demi-largeur
    = □   (trous : 2,834)
  — IC  [juge stat]  départ : IC
    = [42 − □ ; 42 + 2,834]   (trous : [42 − 2,834 ; 42 + 2,834])   ← x̄ ± u
    = [□ ; □]   (trous : [39,166 ; 44,834])
  aides : σ est connu : x̄ ± z·σ/√n, avec z = Φ⁻¹(0,975) = 1,96 pour 95 %. | [42-□ ; 42+□] | IC = [39,166 ; 44,834]
  pièges : p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

```

### Niveau 2

```
Sur n = 5 mesures supposées normales, x̄ = 68 et s² = 4. Donne l’intervalle de confiance à 99 % pour μ.
  [guided]  t
    ? Quel quantile ? ✔ Student à ν = 4 degrés de liberté, bilatéral : 4,604 / · La loi normale : 2,576 / · Student à ν = 5 : 4,032
    = □   (trous : 4,604)   ← Table 3, ν = 4
  — s/√n  [juge stat]  départ : s/√n
    = √(4/□)   (trous : √(4/5))   ← Erreur standard
    = □   (trous : 0,894)
  — u  [juge stat]  départ : u
    = 4,604·□   (trous : 4,604·0,894)   ← Demi-largeur
    = □   (trous : 4,116)
  — IC  [juge stat]  départ : IC
    = [68 − □ ; 68 + 4,116]   (trous : [68 − 4,116 ; 68 + 4,116])   ← x̄ ± u
    = [□ ; □]   (trous : [63,884 ; 72,116])
  aides : σ inconnu et n petit : Student à n − 1 = 4 degrés de liberté. | [68-□ ; 68+□] | IC = [63,884 ; 72,116]
  pièges : p_t_vs_z, p_df_wrong, p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

Mesures supposées normales : 36 ; 31 ; 31 ; 33 ; 28 ; 35 ; 29 ; 26 ; 27 ; 34. Donne l’intervalle de confiance à 95 % pour μ.
  [guided]  x̄
    = (36 + 31 + 31 + 33 + 28 + 35 + 29 + 26 + 27 + 34)/□   (trous : (36 + 31 + 31 + 33 + 28 + 35 + 29 + 26 + 27 + 34)/10)   ← Moyenne
    = □   (trous : 31)
  — s2  [juge prob]  départ : s²
    = (25 + 0 + 0 + 4 + □ + 16 + 4 + 25 + 16 + 9)/9   (trous : (25 + 0 + 0 + 4 + 9 + 16 + 4 + 25 + 16 + 9)/9)   ← Écarts au carré, divisés par n − 1
    = □/9   (trous : 108/9)
    = □   (trous : 12)
  — t  [juge stat]  départ : t
    ? Quel quantile ? ✔ Student à ν = 9 degrés de liberté, bilatéral : 2,262 / · La loi normale : 1,96 / · Student à ν = 10 : 2,228
    = □   (trous : 2,262)   ← Table 3, ν = 9
  — s/√n  [juge stat]  départ : s/√n
    = √(12/□)   (trous : √(12/10))   ← Erreur standard
    = □   (trous : 1,095)
  — u  [juge stat]  départ : u
    = 2,262·□   (trous : 2,262·1,095)   ← Demi-largeur
    = □   (trous : 2,477)
  — IC  [juge stat]  départ : IC
    = [31 − □ ; 31 + 2,477]   (trous : [31 − 2,477 ; 31 + 2,477])   ← x̄ ± u
    = [□ ; □]   (trous : [28,523 ; 33,477])
  aides : σ inconnu et n petit : Student à n − 1 = 9 degrés de liberté. | [31-□ ; 31+□] | IC = [28,523 ; 33,477]
  pièges : p_sd_n, p_t_vs_z, p_df_wrong, p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

Mesures supposées normales : 14 ; 11 ; 17 ; 17 ; 11. Donne l’intervalle de confiance à 95 % pour μ.
  [guided]  x̄
    = (14 + 11 + 17 + 17 + 11)/□   (trous : (14 + 11 + 17 + 17 + 11)/5)   ← Moyenne
    = □   (trous : 14)
  — s2  [juge prob]  départ : s²
    = (0 + 9 + 9 + 9 + 9)/□   (trous : (0 + 9 + 9 + 9 + 9)/4)   ← Écarts au carré, divisés par n − 1
    = □/4   (trous : 36/4)
    = □   (trous : 9)
  — t  [juge stat]  départ : t
    ? Quel quantile ? ✔ Student à ν = 4 degrés de liberté, bilatéral : 2,776 / · La loi normale : 1,96 / · Student à ν = 5 : 2,571
    = □   (trous : 2,776)   ← Table 3, ν = 4
  — s/√n  [juge stat]  départ : s/√n
    = √(9/□)   (trous : √(9/5))   ← Erreur standard
    = □   (trous : 1,342)
  — u  [juge stat]  départ : u
    = 2,776·□   (trous : 2,776·1,342)   ← Demi-largeur
    = □   (trous : 3,725)
  — IC  [juge stat]  départ : IC
    = [14 − □ ; 14 + 3,725]   (trous : [14 − 3,725 ; 14 + 3,725])   ← x̄ ± u
    = [□ ; □]   (trous : [10,275 ; 17,725])
  aides : σ inconnu et n petit : Student à n − 1 = 4 degrés de liberté. | [14-□ ; 14+□] | IC = [10,275 ; 17,725]
  pièges : p_sd_n, p_t_vs_z, p_df_wrong, p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

```

### Niveau 3

```
Sur n = 16 mesures supposées normales, x̄ = 156 et s² = 144. Donne l’intervalle de confiance à 99 % pour μ.
  [tap, suivre l'erreur, menu menu]  t
    ? Quel quantile ? ✔ Student à ν = 15 degrés de liberté, bilatéral : 2,947 / · La loi normale : 2,576 / · Student à ν = 16 : 2,921
    = 2,947   ← Table 3, ν = 15
  — s/√n  [juge stat]  départ : s/√n
    = √(144/16)   ← Erreur standard
    = 3
  — u  [juge stat]  départ : u
    = 2,947·3   ← Demi-largeur
    = 8,841
  — IC  [juge stat]  départ : IC
    = [156 − 8,841 ; 156 + 8,841]   ← x̄ ± u
    = [147,159 ; 164,841]
  aides : σ inconnu et n petit : Student à n − 1 = 15 degrés de liberté. | [156-□ ; 156+□] | IC = [147,159 ; 164,841]
  pièges : p_t_vs_z, p_df_wrong, p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

Sur n = 5 mesures supposées normales, x̄ = 32 et s² = 5. Donne l’intervalle de confiance à 95 % pour μ.
  [tap, suivre l'erreur, menu menu]  t
    ? Quel quantile ? ✔ Student à ν = 4 degrés de liberté, bilatéral : 2,776 / · La loi normale : 1,96 / · Student à ν = 5 : 2,571
    = 2,776   ← Table 3, ν = 4
  — s/√n  [juge stat]  départ : s/√n
    = √(5/5)   ← Erreur standard
    = 1
  — u  [juge stat]  départ : u
    = 2,776·1   ← Demi-largeur
    = 2,776
  — IC  [juge stat]  départ : IC
    = [32 − 2,776 ; 32 + 2,776]   ← x̄ ± u
    = [29,224 ; 34,776]
  aides : σ inconnu et n petit : Student à n − 1 = 4 degrés de liberté. | [32-□ ; 32+□] | IC = [29,224 ; 34,776]
  pièges : p_t_vs_z, p_df_wrong, p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

Sur n = 225 observations (loi inconnue), x̄ = 407 et s = 15. Donne l’intervalle de confiance asymptotique à 95 % pour μ.
  [tap, suivre l'erreur, menu menu]  z
    ? Quel pivot ? ✔ n est grand : la loi normale (ligne ∞ de la table) / · Le quantile unilatéral 1,645
    = 1,96   ← Table 2
  — s/√n  [juge stat]  départ : s/√n
    = 15/√(225)   ← Erreur standard
    = 1
  — u  [juge stat]  départ : u
    = 1,96·1   ← Demi-largeur
    = 1,96
  — IC  [juge stat]  départ : IC
    = [407 − 1,96 ; 407 + 1,96]   ← x̄ ± u
    = [405,04 ; 408,96]
  aides : n est grand : x̄ ± 1,96·s/√n. | [407-□ ; 407+□] | IC = [405,04 ; 408,96]
  pièges : p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

```

### Niveau 4

```
Complète le calcul de l'intervalle de confiance de Student x̄ ± t·s/√n (t est le quantile, déjà lu dans la table).
  [code python, 1 trou]
    | def half_width(t, s, n):
    |     # demi-largeur de l'IC de Student : t * s / racine de n
    |     half = t * s / ⟦math.sqrt(n)⟧
    |     return half
    | 
    | def interval(xbar, t, s, n):
    |     h = half_width(t, s, n)
    |     return [xbar - h, xbar + h]
    test : half_width(2.131, 4.0, 16) → 2.131
    test : half_width(1.96, 3.0, 25) → 1.176
    test : interval(50.0, 2.262, 5.0, 10) → [46.423463966349566, 53.576536033650434]
  pièges : p_se_forgot_sqrt_n

Complète le calcul de l'intervalle de confiance de Student x̄ ± t·s/√n (t est le quantile, déjà lu dans la table).
  [code python, 2 trous]
    | def half_width(t, s, n):
    |     # demi-largeur de l'IC de Student : t * s / racine de n
    |     half = t * s / ⟦math.sqrt(n)⟧
    |     return half
    | 
    | def interval(xbar, t, s, n):
    |     h = half_width(t, s, n)
    |     return [⟦xbar - h⟧, xbar + h]
    test : half_width(2.131, 4.0, 16) → 2.131
    test : half_width(1.96, 3.0, 25) → 1.176
    test : interval(50.0, 2.262, 5.0, 10) → [46.423463966349566, 53.576536033650434]
  pièges : p_se_forgot_sqrt_n

Sur n = 400 observations (loi inconnue), x̄ = 220 et s = 30. Donne l’intervalle de confiance asymptotique à 95 % pour μ.
  [free, suivre l'erreur]  z
    = 1,96   ← Table 2
  — s/√n  [juge stat]  départ : s/√n
    = 30/√(400)   ← Erreur standard
    = 1,5
  — u  [juge stat]  départ : u
    = 1,96·1,5   ← Demi-largeur
    = 2,94
  — IC  [juge stat]  départ : IC
    = [220 − 2,94 ; 220 + 2,94]   ← x̄ ± u
    = [217,06 ; 222,94]
  aides : n est grand : x̄ ± 1,96·s/√n. | [220-□ ; 220+□] | IC = [217,06 ; 222,94]
  pièges : p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

```

### Niveau 5

```
Mesures supposées normales : 15 ; 17 ; 11 ; 7 ; 15 ; 12 ; 9 ; 9 ; 13. Donne l’intervalle de confiance à 95 % pour μ.
  [free, sans aide]  x̄
    = (15 + 17 + 11 + 7 + 15 + 12 + 9 + 9 + 13)/9   ← Moyenne
    = 12
  — s2  [juge prob]  départ : s²
    = (9 + 25 + 1 + 25 + 9 + 0 + 9 + 9 + 1)/8   ← Écarts au carré, divisés par n − 1
    = 88/8
    = 11
  — t  [juge stat]  départ : t
    = 2,306   ← Table 3, ν = 8
  — s/√n  [juge stat]  départ : s/√n
    = √(11/9)   ← Erreur standard
    = 1,106
  — u  [juge stat]  départ : u
    = 2,306·1,106   ← Demi-largeur
    = 2,55
  — IC  [juge stat]  départ : IC
    = [12 − 2,55 ; 12 + 2,55]   ← x̄ ± u
    = [9,45 ; 14,55]
  pièges : p_sd_n, p_t_vs_z, p_df_wrong, p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

Un appareil de mesure a un écart-type connu σ = 6. On fait 9 mesures de moyenne x̄ = 72,1. On suppose les mesures normales. Donne l’intervalle de confiance à 95 % pour μ. Puis : combien de mesures faut-il pour une demi-largeur au plus 2 ?
  [free, sans aide]  z
    = 1,96   ← Table 2
  — σ/√n  [juge stat]  départ : σ/√n
    = 6/√(9)   ← Erreur standard
    = 2
  — u  [juge stat]  départ : u
    = 1,96·2   ← Demi-largeur
    = 3,92
  — IC  [juge stat]  départ : IC
    = [72,1 − 3,92 ; 72,1 + 3,92]   ← x̄ ± u
    = [68,18 ; 76,02]
  — n  [juge stat]  départ : n
    (n ≥ (1,96 · 6/2)² = 34,57 : on arrondit vers le haut.)
    = 35   ← Le plus petit entier qui convient
  pièges : p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

Un appareil de mesure a un écart-type connu σ = 9. On fait 100 mesures de moyenne x̄ = 147,7. On suppose les mesures normales. Donne l’intervalle de confiance à 95 % pour μ. Puis : combien de mesures faut-il pour une demi-largeur au plus 1 ?
  [free, sans aide]  z
    = 1,96   ← Table 2
  — σ/√n  [juge stat]  départ : σ/√n
    = 9/√(100)   ← Erreur standard
    = 0,9
  — u  [juge stat]  départ : u
    = 1,96·0,9   ← Demi-largeur
    = 1,764
  — IC  [juge stat]  départ : IC
    = [147,7 − 1,764 ; 147,7 + 1,764]   ← x̄ ± u
    = [145,936 ; 149,464]
  — n  [juge stat]  départ : n
    (n ≥ (1,96 · 9/1)² = 311,17 : on arrondit vers le haut.)
    = 312   ← Le plus petit entier qui convient
  pièges : p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

```

### Variantes d'examen

```
Sur n = 5 mesures supposées normales, x̄ = 106 et s² = 12. Donne l’intervalle de confiance à 95 % pour μ. On donne les quantiles : t(ν = 4 ; 0,975) = 2,776, t(ν = 4 ; 0,95) = 2,132, t(ν = 5 ; 0,975) = 2,571, z(0,975) = 1,96.
  · [102,697 ; 109,303] [p_one_two_sided]   · [96,384 ; 115,616] [p_se_forgot_sqrt_n]   ✔ [101,699 ; 110,301]   · [102,964 ; 109,036] [p_t_vs_z]
  [examen mcq]
  pièges : p_t_vs_z, p_one_two_sided, p_se_forgot_sqrt_n

Vrai ou faux ?
  « Un intervalle de confiance à 95 % pour μ est plus étroit que l’intervalle à 90 % calculé sur les mêmes données. » → FAUX
    contre-exemple (refute) : a = 1,645, b = 1,96
  [examen tf]

Sur n = 5 mesures supposées normales, x̄ = 125 et s² = 22. Donne l’intervalle de confiance à 95 % pour μ. Donne la borne supérieure.
  [free, sans aide, examen coef]  borne sup.
    = 130,823

```

## IC de Wald (avec −ℓ″) et de Wilson (`p-ci-wald`, BA3)

_Les intervalles de Wald (θ̂ ± z/√J(θ̂)) et de Wilson pour une proportion._

### Niveau 1

```
n = 100 observations indépendantes d’une loi de Poisson de paramètre λ, de somme Σxᵢ = 400. ℓ(λ) = Σxᵢ ln λ − nλ + constante, ℓ″(λ) = −Σxᵢ/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96).
  [guided]  λ̂
    = 400/□   (trous : 400/100)   ← λ̂ = x̄
    = □   (trous : 4)
  — J  [juge prob]  départ : J
    = 400/4²   ← J = −ℓ″(θ̂)
    = □   (trous : 25)
  — se  [juge stat]  départ : se
    = 1/√(□)   (trous : 1/√(25))   ← Var(θ̂) ≈ 1/J
    = □   (trous : 0,2)
  — IC  [juge stat]  départ : IC
    = [4 − 1,96·□ ; 4 + 1,96·0,2]   (trous : [4 − 1,96·0,2 ; 4 + 1,96·0,2])   ← θ̂ ± z·se
    = [□ ; □]   (trous : [3,608 ; 4,392])
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√25 | se = 0,2, IC = [3,608 ; 4,392]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

On observe 40 succès en n = 400 essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)). Donne l’intervalle de confiance de Wald à 95 % pour p (z = 1,96).
  [guided]  p̂
    = 40/□   (trous : 40/400)   ← p̂ = k/n
    = □   (trous : 0,1)
  — J  [juge prob]  départ : J
    = □/(0,1·0,9)   (trous : 400/(0,1·0,9))   ← J = −ℓ″(θ̂)
    = □   (trous : 40000/9)
  — se  [juge stat]  départ : se
    = 1/√(□)   (trous : 1/√(40000/9))   ← Var(θ̂) ≈ 1/J
    = □   (trous : 0,015)
  — IC  [juge stat]  départ : IC
    = [0,1 − 1,96·□ ; 0,1 + 1,96·0,015]   (trous : [0,1 − 1,96·0,015 ; 0,1 + 1,96·0,015])   ← θ̂ ± z·se
    = [□ ; □]   (trous : [0,071 ; 0,129])
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√(40000/9) | se = 0,015, IC = [0,071 ; 0,129]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

On observe 40 succès en n = 400 essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)). Donne l’intervalle de confiance de Wald à 95 % pour p (z = 1,96).
  [guided]  p̂
    = 40/□   (trous : 40/400)   ← p̂ = k/n
    = □   (trous : 0,1)
  — J  [juge prob]  départ : J
    = □/(0,1·0,9)   (trous : 400/(0,1·0,9))   ← J = −ℓ″(θ̂)
    = □   (trous : 40000/9)
  — se  [juge stat]  départ : se
    = 1/√(□)   (trous : 1/√(40000/9))   ← Var(θ̂) ≈ 1/J
    = □   (trous : 0,015)
  — IC  [juge stat]  départ : IC
    = [0,1 − 1,96·□ ; 0,1 + 1,96·0,015]   (trous : [0,1 − 1,96·0,015 ; 0,1 + 1,96·0,015])   ← θ̂ ± z·se
    = [□ ; □]   (trous : [0,071 ; 0,129])
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√(40000/9) | se = 0,015, IC = [0,071 ; 0,129]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

```

### Niveau 2

```
n = 25 observations indépendantes d’une loi de Poisson de paramètre λ, de somme Σxᵢ = 25. ℓ(λ) = Σxᵢ ln λ − nλ + constante, ℓ″(λ) = −Σxᵢ/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96).
  [guided]  λ̂
    = □/25   (trous : 25/25)   ← λ̂ = x̄
    = □   (trous : 1)
  — J  [juge prob]  départ : J
    = □/1²   (trous : 25/1²)   ← J = −ℓ″(θ̂)
    = □   (trous : 25)
  — se  [juge stat]  départ : se
    = 1/√(□)   (trous : 1/√(25))   ← Var(θ̂) ≈ 1/J
    = □   (trous : 0,2)
  — IC  [juge stat]  départ : IC
    = [1 − 1,96·□ ; 1 + 1,96·0,2]   (trous : [1 − 1,96·0,2 ; 1 + 1,96·0,2])   ← θ̂ ± z·se
    = [□ ; □]   (trous : [0,608 ; 1,392])
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√25 | se = 0,2, IC = [0,608 ; 1,392]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

On observe 125 succès en n = 625 essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)). Donne l’intervalle de confiance de Wald à 95 % pour p (z = 1,96).
  [guided]  p̂
    = 125/□   (trous : 125/625)   ← p̂ = k/n
    = □   (trous : 0,2)
  — J  [juge prob]  départ : J
    = □/(0,2·0,8)   (trous : 625/(0,2·0,8))   ← J = −ℓ″(θ̂)
    = □   (trous : 15625/4)
  — se  [juge stat]  départ : se
    = 1/√(□)   (trous : 1/√(15625/4))   ← Var(θ̂) ≈ 1/J
    = □   (trous : 0,016)
  — IC  [juge stat]  départ : IC
    = [0,2 − 1,96·□ ; 0,2 + 1,96·0,016]   (trous : [0,2 − 1,96·0,016 ; 0,2 + 1,96·0,016])   ← θ̂ ± z·se
    = [□ ; □]   (trous : [0,169 ; 0,231])
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√(15625/4) | se = 0,016, IC = [0,169 ; 0,231]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

On observe 40 succès en n = 400 essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)). Donne l’intervalle de confiance de Wald à 95 % pour p (z = 1,96).
  [guided]  p̂
    = 40/□   (trous : 40/400)   ← p̂ = k/n
    = □   (trous : 0,1)
  — J  [juge prob]  départ : J
    = □/(0,1·0,9)   (trous : 400/(0,1·0,9))   ← J = −ℓ″(θ̂)
    = □   (trous : 40000/9)
  — se  [juge stat]  départ : se
    = 1/√(□)   (trous : 1/√(40000/9))   ← Var(θ̂) ≈ 1/J
    = □   (trous : 0,015)
  — IC  [juge stat]  départ : IC
    = [0,1 − 1,96·□ ; 0,1 + 1,96·0,015]   (trous : [0,1 − 1,96·0,015 ; 0,1 + 1,96·0,015])   ← θ̂ ± z·se
    = [□ ; □]   (trous : [0,071 ; 0,129])
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√(40000/9) | se = 0,015, IC = [0,071 ; 0,129]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

```

### Niveau 3

```
n = 50 observations indépendantes d’une loi de Poisson de paramètre λ, de somme Σxᵢ = 100. ℓ(λ) = Σxᵢ ln λ − nλ + constante, ℓ″(λ) = −Σxᵢ/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96).
  [tap, suivre l'erreur, menu menu]  λ̂
    = 100/50   ← λ̂ = x̄
    = 2
  — J  [juge prob]  départ : J
    = 100/2²   ← J = −ℓ″(θ̂)
    = 25
  — se  [juge stat]  départ : se
    = 1/√(25)   ← Var(θ̂) ≈ 1/J
    = 0,2
  — IC  [juge stat]  départ : IC
    = [2 − 1,96·0,2 ; 2 + 1,96·0,2]   ← θ̂ ± z·se
    = [1,608 ; 2,392]
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√25 | se = 0,2, IC = [1,608 ; 2,392]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

n = 25 durées indépendantes de loi exponentielle de paramètre λ, de somme Σxᵢ = 50. ℓ(λ) = n ln λ − λΣxᵢ, ℓ″(λ) = −n/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96).
  [tap, suivre l'erreur, menu menu]  λ̂
    = 25/50   ← λ̂ = n/Σxᵢ
    = 0,5
  — J  [juge prob]  départ : J
    = 25/0,5²   ← J = −ℓ″(θ̂)
    = 100
  — se  [juge stat]  départ : se
    = 1/√(100)   ← Var(θ̂) ≈ 1/J
    = 0,1
  — IC  [juge stat]  départ : IC
    = [0,5 − 1,96·0,1 ; 0,5 + 1,96·0,1]   ← θ̂ ± z·se
    = [0,304 ; 0,696]
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√100 | se = 0,1, IC = [0,304 ; 0,696]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

n = 50 observations indépendantes d’une loi de Poisson de paramètre λ, de somme Σxᵢ = 100. ℓ(λ) = Σxᵢ ln λ − nλ + constante, ℓ″(λ) = −Σxᵢ/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96).
  [tap, suivre l'erreur, menu menu]  λ̂
    = 100/50   ← λ̂ = x̄
    = 2
  — J  [juge prob]  départ : J
    = 100/2²   ← J = −ℓ″(θ̂)
    = 25
  — se  [juge stat]  départ : se
    = 1/√(25)   ← Var(θ̂) ≈ 1/J
    = 0,2
  — IC  [juge stat]  départ : IC
    = [2 − 1,96·0,2 ; 2 + 1,96·0,2]   ← θ̂ ± z·se
    = [1,608 ; 2,392]
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√25 | se = 0,2, IC = [1,608 ; 2,392]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

```

### Niveau 4

```
On observe 90 succès en n = 900 essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)). Donne l’intervalle de confiance de Wald à 95 % pour p (z = 1,96).
  [free, suivre l'erreur]  p̂
    = 90/900   ← p̂ = k/n
    = 0,1
  — J  [juge prob]  départ : J
    = 900/(0,1·0,9)   ← J = −ℓ″(θ̂)
    = 10000
  — se  [juge stat]  départ : se
    = 1/√(10000)   ← Var(θ̂) ≈ 1/J
    = 0,01
  — IC  [juge stat]  départ : IC
    = [0,1 − 1,96·0,01 ; 0,1 + 1,96·0,01]   ← θ̂ ± z·se
    = [0,08 ; 0,12]
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√10000 | se = 0,01, IC = [0,08 ; 0,12]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

n = 100 observations indépendantes d’une loi de Poisson de paramètre λ, de somme Σxᵢ = 400. ℓ(λ) = Σxᵢ ln λ − nλ + constante, ℓ″(λ) = −Σxᵢ/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96).
  [free, suivre l'erreur]  λ̂
    = 400/100   ← λ̂ = x̄
    = 4
  — J  [juge prob]  départ : J
    = 400/4²   ← J = −ℓ″(θ̂)
    = 25
  — se  [juge stat]  départ : se
    = 1/√(25)   ← Var(θ̂) ≈ 1/J
    = 0,2
  — IC  [juge stat]  départ : IC
    = [4 − 1,96·0,2 ; 4 + 1,96·0,2]   ← θ̂ ± z·se
    = [3,608 ; 4,392]
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√25 | se = 0,2, IC = [3,608 ; 4,392]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

n = 64 durées indépendantes de loi exponentielle de paramètre λ, de somme Σxᵢ = 32. ℓ(λ) = n ln λ − λΣxᵢ, ℓ″(λ) = −n/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96).
  [free, suivre l'erreur]  λ̂
    = 64/32   ← λ̂ = n/Σxᵢ
    = 2
  — J  [juge prob]  départ : J
    = 64/2²   ← J = −ℓ″(θ̂)
    = 16
  — se  [juge stat]  départ : se
    = 1/√(16)   ← Var(θ̂) ≈ 1/J
    = 0,25
  — IC  [juge stat]  départ : IC
    = [2 − 1,96·0,25 ; 2 + 1,96·0,25]   ← θ̂ ± z·se
    = [1,51 ; 2,49]
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√16 | se = 0,25, IC = [1,51 ; 2,49]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

```

### Niveau 5

```
On observe 125 succès en n = 625 essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)). Donne l’intervalle de Wald à 95 % (z = 1,96), puis celui de Wilson (EE-209 : on prend z = 2).
  [free, sans aide]  p̂
    = 125/625   ← p̂ = k/n
    = 0,2
  — J  [juge prob]  départ : J
    = 625/(0,2·0,8)   ← J = −ℓ″(θ̂)
    = 15625/4
  — se  [juge stat]  départ : se
    = 1/√(15625/4)   ← Var(θ̂) ≈ 1/J
    = 0,016
  — IC  [juge stat]  départ : IC
    = [0,2 − 1,96·0,016 ; 0,2 + 1,96·0,016]   ← θ̂ ± z·se
    = [0,169 ; 0,231]
  — p̃  [juge stat]  départ : p̃
    = (125 + 2)/(625 + 4)   ← p̃ = (np̂ + z²/2)/(n + z²), z = 2
    = 0,2019
  — ICW  [juge stat]  départ : IC_W
    = [0,17 ; 0,234]   ← demi-largeur z√n/(n + z²)·√(p̂(1 − p̂) + z²/(4n)) = 0,032
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_wilson_center

On observe 90 succès en n = 900 essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)). Donne l’intervalle de Wald à 95 % (z = 1,96), puis celui de Wilson (EE-209 : on prend z = 2).
  [free, sans aide]  p̂
    = 90/900   ← p̂ = k/n
    = 0,1
  — J  [juge prob]  départ : J
    = 900/(0,1·0,9)   ← J = −ℓ″(θ̂)
    = 10000
  — se  [juge stat]  départ : se
    = 1/√(10000)   ← Var(θ̂) ≈ 1/J
    = 0,01
  — IC  [juge stat]  départ : IC
    = [0,1 − 1,96·0,01 ; 0,1 + 1,96·0,01]   ← θ̂ ± z·se
    = [0,08 ; 0,12]
  — p̃  [juge stat]  départ : p̃
    = (90 + 2)/(900 + 4)   ← p̃ = (np̂ + z²/2)/(n + z²), z = 2
    = 0,1018
  — ICW  [juge stat]  départ : IC_W
    = [0,082 ; 0,122]   ← demi-largeur z√n/(n + z²)·√(p̂(1 − p̂) + z²/(4n)) = 0,02
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_wilson_center

On observe 36 succès en n = 100 essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)). Donne l’intervalle de Wald à 95 % (z = 1,96), puis celui de Wilson (EE-209 : on prend z = 2).
  [free, sans aide]  p̂
    = 36/100   ← p̂ = k/n
    = 0,36
  — J  [juge prob]  départ : J
    = 100/(0,36·0,64)   ← J = −ℓ″(θ̂)
    = 15625/36
  — se  [juge stat]  départ : se
    = 1/√(15625/36)   ← Var(θ̂) ≈ 1/J
    = 0,048
  — IC  [juge stat]  départ : IC
    = [0,36 − 1,96·0,048 ; 0,36 + 1,96·0,048]   ← θ̂ ± z·se
    = [0,266 ; 0,454]
  — p̃  [juge stat]  départ : p̃
    = (36 + 2)/(100 + 4)   ← p̃ = (np̂ + z²/2)/(n + z²), z = 2
    = 0,3654
  — ICW  [juge stat]  départ : IC_W
    = [0,271 ; 0,46]   ← demi-largeur z√n/(n + z²)·√(p̂(1 − p̂) + z²/(4n)) = 0,0943
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_wilson_center

```

### Variantes d'examen

```
On observe 40 succès en n = 400 essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)). Quel est l’intervalle de Wald à 95 % pour p (z = 1,96) ?
  · La variance est négative : l’intervalle n’existe pas. [p_wald_sign]   · [−0,488 ; 0,688] [p_se_forgot_sqrt_n]   · [−130,6 ; 130,8] [p_wald_var_inverse]   ✔ [0,071 ; 0,129]
  [examen mcq]
  pièges : p_wald_var_inverse, p_se_forgot_sqrt_n, p_wald_sign

Vrai ou faux ?
  « L’intervalle de Wald θ̂ ± z/√J(θ̂) repose sur la normalité approchée du MLE, valable quand n est grand. » → VRAI
  [examen tf]

n = 36 observations indépendantes d’une loi de Poisson de paramètre λ, de somme Σxᵢ = 144. ℓ(λ) = Σxᵢ ln λ − nλ + constante, ℓ″(λ) = −Σxᵢ/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96). Donne l’erreur standard se = 1/√J.
  [free, sans aide, examen coef]  se
    = 1/√(9)   ← Var(θ̂) ≈ 1/J
    = 0,3333
  pièges : p_wald_var_inverse

n = 100 durées indépendantes de loi exponentielle de paramètre λ, de somme Σxᵢ = 50. ℓ(λ) = n ln λ − λΣxᵢ, ℓ″(λ) = −n/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96).
  [problème, examen open, 8 points]
  partie 1 (IC de Wald : 2 ; J : 2 ; se : 1,5 ; IC : 1,5)
  n = 100 durées indépendantes de loi exponentielle de paramètre λ, de somme Σxᵢ = 50. ℓ(λ) = n ln λ − λΣxᵢ, ℓ″(λ) = −n/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96).
    [free, sans aide, suivre l'erreur, examen open]  λ̂
      = 100/50   ← λ̂ = n/Σxᵢ
      = 2
    — J  [juge prob]  départ : J
      = 100/2²   ← J = −ℓ″(θ̂)
      = 25
    — se  [juge stat]  départ : se
      = 1/√(25)   ← Var(θ̂) ≈ 1/J
      = 0,2
    — IC  [juge stat]  départ : IC
      = [2 − 1,96·0,2 ; 2 + 1,96·0,2]   ← θ̂ ± z·se
      = [1,608 ; 2,392]
  partie 2 (Interpréter : 1)
  Sous quelles hypothèses cet intervalle est-il valable ?
    · Il contient λ̂ avec une probabilité de 95 %. [p_ci_prob]   · 95 % des données sont dans l’intervalle. [p_ci_data]   · Il est exact pour tout n.   ✔ n grand, et un modèle régulier (le support ne dépend pas du paramètre).
    [examen open]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data

```

## Arrondir un IC (chiffres significatifs) (`p-ci-round`, BA4)

_Arrondir un intervalle de confiance selon la règle d'EE-209 : u à 2 chiffres significatifs, bornes vers l'extérieur._

### Niveau 1

```
Un estimateur vaut θ̂ = 5,562612 et la demi-largeur de l’IC est u = 0,6903. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [guided]  u
    = □   (trous : 0,69)   ← 2 chiffres significatifs : précision 10⁻²
  — θ̂  [juge stat]  départ : θ̂
    = □   (trous : 5,56)   ← Même dernière décimale que u
  — IC  [juge stat]  départ : IC
    (Comment arrondir les bornes ? Vers l’extérieur : la borne inférieure vers le bas, la supérieure vers le haut.)
    = [□ ; □]   (trous : [4,87 ; 6,26])   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [4,87 ; □] | IC = [4,87 ; 6,26]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 34,059182 et la demi-largeur de l’IC est u = 7,683. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [guided]  u
    = □   (trous : 7,7)   ← 2 chiffres significatifs : précision 10⁻¹
  — θ̂  [juge stat]  départ : θ̂
    = □   (trous : 34,1)   ← Même dernière décimale que u
  — IC  [juge stat]  départ : IC
    (Comment arrondir les bornes ? Vers l’extérieur : la borne inférieure vers le bas, la supérieure vers le haut.)
    = [□ ; □]   (trous : [26,3 ; 41,8])   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [26,3 ; □] | IC = [26,3 ; 41,8]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 16,707649 et la demi-largeur de l’IC est u = 0,09237. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [guided]  u
    = □   (trous : 0,092)   ← 2 chiffres significatifs : précision 10⁻³
  — θ̂  [juge stat]  départ : θ̂
    = □   (trous : 16,708)   ← Même dernière décimale que u
  — IC  [juge stat]  départ : IC
    (Comment arrondir les bornes ? Vers l’extérieur : la borne inférieure vers le bas, la supérieure vers le haut.)
    = [□ ; □]   (trous : [16,615 ; 16,801])   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [16,615 ; □] | IC = [16,615 ; 16,801]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

```

### Niveau 2

```
Un estimateur vaut θ̂ = 45,951869 et la demi-largeur de l’IC est u = 0,08286. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [guided]  u
    = □   (trous : 0,083)   ← 2 chiffres significatifs : précision 10⁻³
  — θ̂  [juge stat]  départ : θ̂
    = □   (trous : 45,952)   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [□ ; 46,034729]   (trous : [45,869009 ; 46,034729])   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    ? Comment arrondir les bornes ? ✔ Vers l’extérieur : la borne inférieure vers le bas, la supérieure vers le haut / · Chaque borne au plus proche
    = [□ ; □]   (trous : [45,869 ; 46,035])   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [45,869 ; □] | IC = [45,869 ; 46,035]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 21,394383 et la demi-largeur de l’IC est u = 0,9605. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [guided]  u
    = □   (trous : 0,96)   ← 2 chiffres significatifs : précision 10⁻²
  — θ̂  [juge stat]  départ : θ̂
    = □   (trous : 21,39)   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [□ ; 22,354883]   (trous : [20,433883 ; 22,354883])   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    ? Comment arrondir les bornes ? ✔ Vers l’extérieur : la borne inférieure vers le bas, la supérieure vers le haut / · Chaque borne au plus proche
    = [□ ; □]   (trous : [20,43 ; 22,36])   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [20,43 ; □] | IC = [20,43 ; 22,36]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 20,263478 et la demi-largeur de l’IC est u = 0,0003317. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [guided]  u
    = □   (trous : 0,00033)   ← 2 chiffres significatifs : précision 10⁻⁵
  — θ̂  [juge stat]  départ : θ̂
    = □   (trous : 20,26348)   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [□ ; 20,2638097]   (trous : [20,2631463 ; 20,2638097])   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    ? Comment arrondir les bornes ? ✔ Vers l’extérieur : la borne inférieure vers le bas, la supérieure vers le haut / · Chaque borne au plus proche
    = [□ ; □]   (trous : [20,26314 ; 20,26381])   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [20,26314 ; □] | IC = [20,26314 ; 20,26381]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

```

### Niveau 3

```
Un estimateur vaut θ̂ = 55,051488 et la demi-largeur de l’IC est u = 0,06432. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [tap, suivre l'erreur, menu menu]  u
    = 0,064   ← 2 chiffres significatifs : précision 10⁻³
  — θ̂  [juge stat]  départ : θ̂
    = 55,051   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [54,987168 ; 55,115808]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [54,987 ; 55,116]   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [54,987 ; □] | IC = [54,987 ; 55,116]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 3,642335 et la demi-largeur de l’IC est u = 0,05783. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [tap, suivre l'erreur, menu menu]  u
    = 0,058   ← 2 chiffres significatifs : précision 10⁻³
  — θ̂  [juge stat]  départ : θ̂
    = 3,642   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [3,584505 ; 3,700165]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [3,584 ; 3,701]   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [3,584 ; □] | IC = [3,584 ; 3,701]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 16,106041 et la demi-largeur de l’IC est u = 0,003692. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [tap, suivre l'erreur, menu menu]  u
    = 0,0037   ← 2 chiffres significatifs : précision 10⁻⁴
  — θ̂  [juge stat]  départ : θ̂
    = 16,1060   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [16,102349 ; 16,109733]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [16,1023 ; 16,1098]   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [16,1023 ; □] | IC = [16,1023 ; 16,1098]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

```

### Niveau 4

```
Un estimateur vaut θ̂ = 8,201655 et la demi-largeur de l’IC est u = 0,0006656. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [free, suivre l'erreur]  u
    = 0,00067   ← 2 chiffres significatifs : précision 10⁻⁵
  — θ̂  [juge stat]  départ : θ̂
    = 8,20166   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [8,2009894 ; 8,2023206]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [8,20098 ; 8,20233]   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [8,20098 ; □] | IC = [8,20098 ; 8,20233]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 26,726714 et la demi-largeur de l’IC est u = 5,656. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [free, suivre l'erreur]  u
    = 5,7   ← 2 chiffres significatifs : précision 10⁻¹
  — θ̂  [juge stat]  départ : θ̂
    = 26,7   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [21,070714 ; 32,382714]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [21,0 ; 32,4]   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [21,0 ; □] | IC = [21,0 ; 32,4]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 46,383869 et la demi-largeur de l’IC est u = 4,753. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [free, suivre l'erreur]  u
    = 4,8   ← 2 chiffres significatifs : précision 10⁻¹
  — θ̂  [juge stat]  départ : θ̂
    = 46,4   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [41,630869 ; 51,136869]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [41,6 ; 51,2]   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [41,6 ; □] | IC = [41,6 ; 51,2]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

```

### Niveau 5

```
Sur n = 16 mesures normales : x̄ = 20,634050, s = 0,072792, et t₍15₎ ; 0,975 = 2,131 (donné). Calcule la demi-largeur u, puis écris u, x̄ et l’IC à 95 % arrondis selon la règle d’EE-209.
  [free, sans aide]  u_brut
    = 2,131·0,072792/√(16)   ← u = t·s/√n
    = 0,038780
  — u  [juge stat]  départ : u
    = 0,039   ← 2 chiffres significatifs : précision 10⁻³
  — θ̂  [juge stat]  départ : θ̂
    = 20,634   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [20,59527006 ; 20,67282994]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [20,595 ; 20,673]   ← Vers le bas, vers le haut
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits, p_ci_prob, p_ci_data, p_ci_xbar

Sur n = 64 mesures normales : x̄ = 15,716704, s = 0,002411, et t₍63₎ ; 0,975 = 2 (donné). Calcule la demi-largeur u, puis écris u, x̄ et l’IC à 95 % arrondis selon la règle d’EE-209.
  [free, sans aide]  u_brut
    = 2·0,002411/√(64)   ← u = t·s/√n
    = 0,00060275
  — u  [juge stat]  départ : u
    = 0,00060   ← 2 chiffres significatifs : précision 10⁻⁵
  — θ̂  [juge stat]  départ : θ̂
    = 15,71670   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [15,71610125 ; 15,71730675]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [15,71610 ; 15,71731]   ← Vers le bas, vers le haut
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits, p_ci_prob, p_ci_data, p_ci_xbar

Sur n = 16 mesures normales : x̄ = 19,534011, s = 0,063313, et t₍15₎ ; 0,975 = 2,131 (donné). Calcule la demi-largeur u, puis écris u, x̄ et l’IC à 95 % arrondis selon la règle d’EE-209.
  [free, sans aide]  u_brut
    = 2,131·0,063313/√(16)   ← u = t·s/√n
    = 0,033730
  — u  [juge stat]  départ : u
    = 0,034   ← 2 chiffres significatifs : précision 10⁻³
  — θ̂  [juge stat]  départ : θ̂
    = 19,534   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [19,500281 ; 19,567741]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [19,500 ; 19,568]   ← Vers le bas, vers le haut
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits, p_ci_prob, p_ci_data, p_ci_xbar

```

### Variantes d'examen

```
θ̂ = 34,121710 et u = 0,003237. Quel est l’IC arrondi selon la règle d’EE-209 (u à 2 chiffres significatifs, bornes vers l’extérieur) ?
  ✔ [34,1184 ; 34,1250]   · [34,118473 ; 34,124947] [p_ci_round_digits]   · [34,1185 ; 34,1249] [p_ci_round_nearest]   · [34,11 ; 34,13] [p_ci_round_digits]
  [examen mcq]
  pièges : p_ci_round_nearest, p_ci_round_digits

Vrai ou faux ?
  « Pour θ̂ = 37,927938 et u = 0,06820, on arrondit chaque borne de l’IC au plus proche, à la précision de u. » → FAUX
    contre-exemple (refute) : a = 37,860, b = 37,859
  [examen tf]
  pièges : p_ci_round_nearest

```

## Maximum d'un échantillon ; IC exact (`p-max-sample`, BA3)

_La loi du maximum d'un échantillon, F_M = Fⁿ, et l'intervalle de confiance exact qu'elle donne._

### Niveau 1

```
X₁, …, X₁₀ iid de densité f(x) = 1/θ sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [guided]  F(x)
    = □   (trous : x/θ)   ← F(x) = x/θ sur [0 ; θ]
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)^□   (trous : (x/θ)¹⁰)   ← M ≤ x ⇔ les 10 données ≤ x : F(x)¹⁰
  — f_M(x)  [juge prob]  départ : f_M(x)
    = □x^□/θ¹⁰   (trous : 10x⁹/θ¹⁰)   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 10x^9/θ^10
  pièges : p_max_min_swap, p_max_density_power

X₁, …, X₂₀ iid de densité f(x) = 1/θ sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [guided]  F(x)
    = □   (trous : x/θ)   ← F(x) = x/θ sur [0 ; θ]
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)^□   (trous : (x/θ)²⁰)   ← M ≤ x ⇔ les 20 données ≤ x : F(x)²⁰
  — f_M(x)  [juge prob]  départ : f_M(x)
    = □x^□/θ²⁰   (trous : 20x¹⁹/θ²⁰)   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 20x^19/θ^20
  pièges : p_max_min_swap, p_max_density_power

X₁, …, X₁₀ iid de densité f(x) = 1/θ sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [guided]  F(x)
    = □   (trous : x/θ)   ← F(x) = x/θ sur [0 ; θ]
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)^□   (trous : (x/θ)¹⁰)   ← M ≤ x ⇔ les 10 données ≤ x : F(x)¹⁰
  — f_M(x)  [juge prob]  départ : f_M(x)
    = □x^□/θ¹⁰   (trous : 10x⁹/θ¹⁰)   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 10x^9/θ^10
  pièges : p_max_min_swap, p_max_density_power

```

### Niveau 2

```
X₁, …, X₂₀ iid de densité f(x) = 2x/θ^2 sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [guided]  F(x)
    = (x/θ)^□   (trous : (x/θ)²)   ← F(x) = ∫₀ˣ 2u^1/θ^2 du
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)^□   (trous : (x/θ)⁴⁰)   ← M ≤ x ⇔ les 20 données ≤ x : F(x)²⁰
  — f_M(x)  [juge prob]  départ : f_M(x)
    = □x^□/θ⁴⁰   (trous : 40x³⁹/θ⁴⁰)   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 40x^39/θ^40
  pièges : p_max_min_swap, p_max_density_power

X₁, …, X₅ iid de densité f(x) = 1/θ sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [guided]  F(x)
    = □   (trous : x/θ)   ← F(x) = x/θ sur [0 ; θ]
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)^□   (trous : (x/θ)⁵)   ← M ≤ x ⇔ les 5 données ≤ x : F(x)⁵
  — f_M(x)  [juge prob]  départ : f_M(x)
    = □x^□/θ⁵   (trous : 5x⁴/θ⁵)   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 5x^4/θ^5
  pièges : p_max_min_swap, p_max_density_power

X₁, …, X₁₀ iid de densité f(x) = 3x^2/θ^3 sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [guided]  F(x)
    = (x/θ)^□   (trous : (x/θ)³)   ← F(x) = ∫₀ˣ 3u^2/θ^3 du
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)^□   (trous : (x/θ)³⁰)   ← M ≤ x ⇔ les 10 données ≤ x : F(x)¹⁰
  — f_M(x)  [juge prob]  départ : f_M(x)
    = □x^□/θ³⁰   (trous : 30x²⁹/θ³⁰)   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 30x^29/θ^30
  pièges : p_max_min_swap, p_max_density_power

```

### Niveau 3

```
X₁, …, X₁₀ iid de densité f(x) = 3x^2/θ^3 sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [tap, suivre l'erreur, menu menu]  F(x)
    = (x/θ)³   ← F(x) = ∫₀ˣ 3u^2/θ^3 du
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)³⁰   ← M ≤ x ⇔ les 10 données ≤ x : F(x)¹⁰
  — f_M(x)  [juge prob]  départ : f_M(x)
    = 30x²⁹/θ³⁰   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 30x^29/θ^30
  pièges : p_max_min_swap, p_max_density_power

X₁, …, X₁₀ iid de densité f(x) = 3x^2/θ^3 sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [tap, suivre l'erreur, menu menu]  F(x)
    = (x/θ)³   ← F(x) = ∫₀ˣ 3u^2/θ^3 du
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)³⁰   ← M ≤ x ⇔ les 10 données ≤ x : F(x)¹⁰
  — f_M(x)  [juge prob]  départ : f_M(x)
    = 30x²⁹/θ³⁰   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 30x^29/θ^30
  pièges : p_max_min_swap, p_max_density_power

X₁, …, X₂₀ iid de densité f(x) = 4x^3/θ^4 sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [tap, suivre l'erreur, menu menu]  F(x)
    = (x/θ)⁴   ← F(x) = ∫₀ˣ 4u^3/θ^4 du
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)⁸⁰   ← M ≤ x ⇔ les 20 données ≤ x : F(x)²⁰
  — f_M(x)  [juge prob]  départ : f_M(x)
    = 80x⁷⁹/θ⁸⁰   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 80x^79/θ^80
  pièges : p_max_min_swap, p_max_density_power

```

### Niveau 4

```
X₁, …, X₁₀ iid de densité f(x) = 1/θ sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [free, suivre l'erreur]  F(x)
    = x/θ   ← F(x) = x/θ sur [0 ; θ]
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)¹⁰   ← M ≤ x ⇔ les 10 données ≤ x : F(x)¹⁰
  — f_M(x)  [juge prob]  départ : f_M(x)
    = 10x⁹/θ¹⁰   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 10x^9/θ^10
  pièges : p_max_min_swap, p_max_density_power

X₁, …, X₅ iid U[0, θ], et M = max Xᵢ = 16. Donne l’IC exact à 95 % pour θ (deux décimales).
  [free, suivre l'erreur]  IC
    = [16 ; 16·0,05^(−1/5)]   ← Pr(0,05^(1/5) ≤ M/θ ≤ 1) = 0,95
    = [16 ; 29,13]
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont ; M/θ a la fonction de répartition uⁿ. | [16 ; 16×0,05^(-1/□)] | IC = [16 ; 29,13]
  pièges : p_ci_prob, p_ci_data, p_ci_xbar

X₁, …, X₂₀ iid de densité f(x) = 1/θ sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [free, suivre l'erreur]  F(x)
    = x/θ   ← F(x) = x/θ sur [0 ; θ]
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)²⁰   ← M ≤ x ⇔ les 20 données ≤ x : F(x)²⁰
  — f_M(x)  [juge prob]  départ : f_M(x)
    = 20x¹⁹/θ²⁰   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 20x^19/θ^20
  pièges : p_max_min_swap, p_max_density_power

```

### Niveau 5

```
Sur 20 plaques vaudoises vues au hasard, le plus grand numéro est M = 512. On modélise les numéros par des variables iid U[0, θ]. Donne F_M, puis l’IC exact à 95 % pour θ (deux décimales).
  [free, sans aide]  F_M(x)
    = (x/θ)²⁰   ← M ≤ x ⇔ les 20 données ≤ x : F(x)²⁰
  — IC  [juge stat]  départ : IC
    = [512 ; 512·0,05^(−1/20)]   ← Pr(0,05^(1/20) ≤ M/θ ≤ 1) = 0,95
    = [512 ; 594,73]
  pièges : p_max_min_swap, p_ci_prob, p_ci_data, p_ci_xbar

Sur 5 plaques vaudoises vues au hasard, le plus grand numéro est M = 925. On modélise les numéros par des variables iid U[0, θ]. Donne F_M, puis l’IC exact à 90 % pour θ (deux décimales).
  [free, sans aide]  F_M(x)
    = (x/θ)⁵   ← M ≤ x ⇔ les 5 données ≤ x : F(x)⁵
  — IC  [juge stat]  départ : IC
    = [925 ; 925·0,1^(−1/5)]   ← Pr(0,1^(1/5) ≤ M/θ ≤ 1) = 0,9
    = [925 ; 1466,03]
  pièges : p_max_min_swap, p_ci_prob, p_ci_data, p_ci_xbar

Sur 5 plaques vaudoises vues au hasard, le plus grand numéro est M = 512. On modélise les numéros par des variables iid U[0, θ]. Donne F_M, puis l’IC exact à 90 % pour θ (deux décimales).
  [free, sans aide]  F_M(x)
    = (x/θ)⁵   ← M ≤ x ⇔ les 5 données ≤ x : F(x)⁵
  — IC  [juge stat]  départ : IC
    = [512 ; 512·0,1^(−1/5)]   ← Pr(0,1^(1/5) ≤ M/θ ≤ 1) = 0,9
    = [512 ; 811,47]
  pièges : p_max_min_swap, p_ci_prob, p_ci_data, p_ci_xbar

```

### Variantes d'examen

```
X₁, …, X₁₀ iid de fonction de répartition F(x) = x/θ sur [0 ; θ]. Quelle est la densité de M = max Xᵢ sur [0 ; θ] ?
  · (x/θ)^10   · 10×(1-x/θ)^9×1/θ [p_max_min_swap]   · (1/θ)^10 [p_max_density_power]   ✔ 10x^9/θ^10
  [examen mcq]
  pièges : p_max_density_power, p_max_min_swap

X₁, …, X₅ iid U[0, θ], et M = max Xᵢ = 30. Donne la borne supérieure de l’IC exact à 95 % pour θ.
  [free, sans aide, examen coef]  borne sup.
    = 54,62

Sur 20 plaques vaudoises vues au hasard, le plus grand numéro est M = 689. On modélise les numéros par des variables iid U[0, θ]. Donne F_M, puis l’IC exact à 90 % pour θ (deux décimales).
  [problème, examen open, 8 points]
  partie 1 (Maximum et IC exact : 2,5 ; IC : 4,5)
  Sur 20 plaques vaudoises vues au hasard, le plus grand numéro est M = 689. On modélise les numéros par des variables iid U[0, θ]. Donne F_M, puis l’IC exact à 90 % pour θ (deux décimales).
    [free, sans aide, suivre l'erreur, examen open]  F_M(x)
      = (x/θ)²⁰   ← M ≤ x ⇔ les 20 données ≤ x : F(x)²⁰
    — IC  [juge stat]  départ : IC
      = [689 ; 689·0,1^(−1/20)]   ← Pr(0,1^(1/20) ≤ M/θ ≤ 1) = 0,9
      = [689 ; 773,07]
  partie 2 (Interpréter : 1)
  Interpréter : quelle phrase est juste ?
    · La moyenne observée est dans l’intervalle avec une probabilité de 0,9. [p_ci_xbar]   · θ est dans [689 ; 773,07] avec une probabilité de 0,9. [p_ci_prob]   · 90 % des mesures sont dans [689 ; 773,07]. [p_ci_data]   ✔ Si l’on refaisait l’expérience souvent, 90 % des intervalles construits ainsi contiendraient θ.
    [examen open]
  pièges : p_max_min_swap, p_ci_prob, p_ci_data, p_ci_xbar

```

## Formuler un test : H₀, H₁, région critique, p-valeur (`p-test-setup`, BA3)

_Formuler un test : H₀ et H₁, uni- ou bilatéral, région critique, p-valeur et décision._

### Niveau 1

```
Une machine remplit-elle bien les paquets à 500 g en moyenne ? On fait un test z au niveau 5 % et on observe t_obs = 3,275. Pose les hypothèses, donne la région critique et la p-valeur.
  [guided]  t_c
    (Quelles hypothèses ? H₀ : μ = 500 contre H₁ : μ ≠ 500.)
    (Le test est… bilatéral.)
    = □   (trous : 1,96)   ← R = {|T| > 1,96}
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(□))   (trous : 2(1 − Φ(3,275)))   ← Bilatéral : les deux queues
    = 2(1 − □)   (trous : 2(1 − 0,9994717))   ← Table : Φ(3,275) = 0,9994717
    = □   (trous : 0,0011)
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 2(1-Φ(□)) | p_obs = 0,0011
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

L’alcool allonge-t-il le temps de réaction moyen μ, qui est de 0,8 s à jeun ? On fait un test z au niveau 5 % et on observe t_obs = 3,175. Pose les hypothèses, donne la région critique et la p-valeur.
  [guided]  t_c
    (Quelles hypothèses ? H₀ : μ = 0,8 contre H₁ : μ > 0,8.)
    (Le test est… unilatéral à droite.)
    = □   (trous : 1,645)   ← R = [1,645 ; +∞[
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(□)   (trous : 1 − Φ(3,175))   ← Une queue
    = 1 − □   (trous : 1 − 0,9992508)   ← Table : Φ(3,175) = 0,9992508
    = □   (trous : 0,0007)
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 1-Φ(□) | p_obs = 0,0007
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Une machine remplit-elle bien les paquets à 500 g en moyenne ? On fait un test z au niveau 5 % et on observe t_obs = 1,425. Pose les hypothèses, donne la région critique et la p-valeur.
  [guided]  t_c
    (Quelles hypothèses ? H₀ : μ = 500 contre H₁ : μ ≠ 500.)
    (Le test est… bilatéral.)
    = □   (trous : 1,96)   ← R = {|T| > 1,96}
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(□))   (trous : 2(1 − Φ(1,425)))   ← Bilatéral : les deux queues
    = 2(1 − □)   (trous : 2(1 − 0,923))   ← Table : Φ(1,425) = 0,923
    = □   (trous : 0,154)
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 2(1-Φ(□)) | p_obs = 0,154
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 2

```
La teneur moyenne μ en alcool d’une boisson dépasse-t-elle la limite de 0,5 % ? On fait un test z au niveau 5 % et on observe t_obs = 2,325. Pose les hypothèses, donne la région critique et la p-valeur.
  [guided]  t_c
    ? Quelles hypothèses ? ✔ H₀ : μ = 0,5 contre H₁ : μ > 0,5 / · H₀ : μ > 0,5 contre H₁ : μ = 0,5 / · H₀ : μ = 0,5 contre H₁ : μ ≠ 0,5 / · H₀ : μ = 0,5 contre H₁ : μ < 0,5 / · H₀ : μ ≠ 0,5 contre H₁ : μ = 0,5
    ? Le test est… ✔ unilatéral à droite / · bilatéral
    = □   (trous : 1,645)   ← R = [1,645 ; +∞[
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(□)   (trous : 1 − Φ(2,325))   ← Une queue
    = 1 − □   (trous : 1 − 0,99)   ← Table : Φ(2,325) = 0,99
    = □   (trous : 0,01)
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 1-Φ(□) | p_obs = 0,01
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

Une pièce de monnaie est-elle truquée (p = probabilité de pile) ? On fait un test z au niveau 5 % et on observe t_obs = 3,1. Pose les hypothèses, donne la région critique et la p-valeur.
  [guided]  t_c
    ? Quelles hypothèses ? ✔ H₀ : p = 1/2 contre H₁ : p ≠ 1/2 / · H₀ : p = 1/2 contre H₁ : p > 1/2 / · H₀ : p ≠ 1/2 contre H₁ : p = 1/2 / · H₀ : p = 1/2 contre H₁ : p < 1/2 / · H₀ : p > 1/2 contre H₁ : p ≤ 1/2
    ? Le test est… ✔ bilatéral / · unilatéral
    = □   (trous : 1,96)   ← R = {|T| > 1,96}
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(□))   (trous : 2(1 − Φ(3,1)))   ← Bilatéral : les deux queues
    = 2(1 − □)   (trous : 2(1 − 0,9990324))   ← Table : Φ(3,1) = 0,9990324
    = □   (trous : 0,0019)
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 2(1-Φ(□)) | p_obs = 0,0019
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

La proportion p d’unités défectueuses d’une ligne de production dépasse-t-elle 1/1 000 ? On fait un test z au niveau 1 % et on observe t_obs = 3,1. Pose les hypothèses, donne la région critique et la p-valeur.
  [guided]  t_c
    ? Quelles hypothèses ? ✔ H₀ : p = 1/1 000 contre H₁ : p > 1/1 000 / · H₀ : p > 1/1 000 contre H₁ : p = 1/1 000 / · H₀ : p = 1/1 000 contre H₁ : p ≠ 1/1 000 / · H₀ : p = 1/1 000 contre H₁ : p < 1/1 000 / · H₀ : p ≠ 1/1 000 contre H₁ : p = 1/1 000
    ? Le test est… ✔ unilatéral à droite / · bilatéral
    = □   (trous : 2,326)   ← R = [2,326 ; +∞[
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(□)   (trous : 1 − Φ(3,1))   ← Une queue
    = 1 − □   (trous : 1 − 0,9990324)   ← Table : Φ(3,1) = 0,9990324
    = □   (trous : 0,001)
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 1-Φ(□) | p_obs = 0,001
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 3

```
Les contrôles radar font-ils baisser la vitesse moyenne μ, qui était de 50 km/h ? On fait un test z au niveau 1 % et on observe t_obs = −3,075. Pose les hypothèses, donne la région critique et la p-valeur.
  [tap, suivre l'erreur, menu menu]  t_c
    ? Quelles hypothèses ? ✔ H₀ : μ = 50 contre H₁ : μ < 50 / · H₀ : μ < 50 contre H₁ : μ = 50 / · H₀ : μ = 50 contre H₁ : μ ≠ 50 / · H₀ : μ = 50 contre H₁ : μ > 50 / · H₀ : μ ≠ 50 contre H₁ : μ = 50
    ? Le test est… ✔ unilatéral à gauche / · bilatéral
    = 2,326   ← R = ]−∞ ; −2,326]
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(3,075)   ← Une queue
    = 1 − 0,9989475   ← Table : Φ(3,075) = 0,9989475
    = 0,0011
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 1-Φ(□) | p_obs = 0,0011
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Un radar de détection des tumeurs manque-t-il moins de 10 % des tumeurs (p = part manquée) ? On fait un test z au niveau 5 % et on observe t_obs = −1,425. Pose les hypothèses, donne la région critique et la p-valeur.
  [tap, suivre l'erreur, menu menu]  t_c
    ? Quelles hypothèses ? ✔ H₀ : p = 0,1 contre H₁ : p < 0,1 / · H₀ : p < 0,1 contre H₁ : p = 0,1 / · H₀ : p = 0,1 contre H₁ : p ≠ 0,1 / · H₀ : p = 0,1 contre H₁ : p > 0,1 / · H₀ : p ≠ 0,1 contre H₁ : p = 0,1
    ? Le test est… ✔ unilatéral à gauche / · bilatéral
    = 1,645   ← R = ]−∞ ; −1,645]
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(1,425)   ← Une queue
    = 1 − 0,923   ← Table : Φ(1,425) = 0,923
    = 0,077
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 1-Φ(□) | p_obs = 0,077
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Le filtre anti-spam laisse-t-il passer moins de 5 % des spams (p = part des spams non filtrés) ? On fait un test z au niveau 1 % et on observe t_obs = −2,825. Pose les hypothèses, donne la région critique et la p-valeur.
  [tap, suivre l'erreur, menu menu]  t_c
    ? Quelles hypothèses ? ✔ H₀ : p = 0,05 contre H₁ : p < 0,05 / · H₀ : p < 0,05 contre H₁ : p = 0,05 / · H₀ : p = 0,05 contre H₁ : p ≠ 0,05 / · H₀ : p = 0,05 contre H₁ : p > 0,05 / · H₀ : p ≠ 0,05 contre H₁ : p = 0,05
    ? Le test est… ✔ unilatéral à gauche / · bilatéral
    = 2,326   ← R = ]−∞ ; −2,326]
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(2,825)   ← Une queue
    = 1 − 0,998   ← Table : Φ(2,825) = 0,998
    = 0,002
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 1-Φ(□) | p_obs = 0,002
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 4

```
Le « oui » l’emporte-t-il au référendum (p = part des oui) ? On fait un test z au niveau 5 % et on observe t_obs = 3,275. Pose les hypothèses, donne la région critique et la p-valeur.
  [free, suivre l'erreur]  t_c
    ? Quelles hypothèses ? ✔ H₀ : p = 1/2 contre H₁ : p > 1/2 / · H₀ : p > 1/2 contre H₁ : p = 1/2 / · H₀ : p = 1/2 contre H₁ : p ≠ 1/2 / · H₀ : p = 1/2 contre H₁ : p < 1/2 / · H₀ : p ≠ 1/2 contre H₁ : p = 1/2
    ? Le test est… ✔ unilatéral à droite / · bilatéral
    = 1,645   ← R = [1,645 ; +∞[
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(3,275)   ← Une queue
    = 1 − 0,9994717   ← Table : Φ(3,275) = 0,9994717
    = 0,0005
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 1-Φ(□) | p_obs = 0,0005
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Une machine remplit-elle bien les paquets à 500 g en moyenne ? On fait un test z au niveau 5 % et on observe t_obs = 1,775. Pose les hypothèses, donne la région critique et la p-valeur.
  [free, suivre l'erreur]  t_c
    ? Quelles hypothèses ? ✔ H₀ : μ = 500 contre H₁ : μ ≠ 500 / · H₀ : μ = 500 contre H₁ : μ > 500 / · H₀ : μ ≠ 500 contre H₁ : μ = 500 / · H₀ : μ = 500 contre H₁ : μ < 500 / · H₀ : μ > 500 contre H₁ : μ ≤ 500
    ? Le test est… ✔ bilatéral / · unilatéral
    = 1,96   ← R = {|T| > 1,96}
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(1,775))   ← Bilatéral : les deux queues
    = 2(1 − 0,962)   ← Table : Φ(1,775) = 0,962
    = 0,076
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 2(1-Φ(□)) | p_obs = 0,076
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Une pièce de monnaie est-elle truquée (p = probabilité de pile) ? On fait un test z au niveau 1 % et on observe t_obs = 1,825. Pose les hypothèses, donne la région critique et la p-valeur.
  [free, suivre l'erreur]  t_c
    ? Quelles hypothèses ? ✔ H₀ : p = 1/2 contre H₁ : p ≠ 1/2 / · H₀ : p = 1/2 contre H₁ : p > 1/2 / · H₀ : p ≠ 1/2 contre H₁ : p = 1/2 / · H₀ : p = 1/2 contre H₁ : p < 1/2 / · H₀ : p > 1/2 contre H₁ : p ≤ 1/2
    ? Le test est… ✔ bilatéral / · unilatéral
    = 2,576   ← R = {|T| > 2,576}
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(1,825))   ← Bilatéral : les deux queues
    = 2(1 − 0,966)   ← Table : Φ(1,825) = 0,966
    = 0,068
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 2(1-Φ(□)) | p_obs = 0,068
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 5

```
La teneur moyenne μ en alcool d’une boisson dépasse-t-elle la limite de 0,5 % ? On fait un test z au niveau 1 % et on observe t_obs = 2,8. Pose les hypothèses, donne la région critique et la p-valeur.
  [free, sans aide]  t_c
    ? Quelles hypothèses ? ✔ H₀ : μ = 0,5 contre H₁ : μ > 0,5 / · H₀ : μ > 0,5 contre H₁ : μ = 0,5 / · H₀ : μ = 0,5 contre H₁ : μ ≠ 0,5 / · H₀ : μ = 0,5 contre H₁ : μ < 0,5 / · H₀ : μ ≠ 0,5 contre H₁ : μ = 0,5
    ? Le test est… ✔ unilatéral à droite / · bilatéral
    = 2,326   ← R = [2,326 ; +∞[
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(2,8)   ← Une queue
    = 1 − 0,997   ← Table : Φ(2,8) = 0,997
    = 0,003
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_accept_h0, p_pvalue_h0, p_significant_large

Le « oui » l’emporte-t-il au référendum (p = part des oui) ? On fait un test z au niveau 5 % et on observe t_obs = 2,425. Pose les hypothèses, donne la région critique et la p-valeur.
  [free, sans aide]  t_c
    ? Quelles hypothèses ? ✔ H₀ : p = 1/2 contre H₁ : p > 1/2 / · H₀ : p > 1/2 contre H₁ : p = 1/2 / · H₀ : p = 1/2 contre H₁ : p ≠ 1/2 / · H₀ : p = 1/2 contre H₁ : p < 1/2 / · H₀ : p ≠ 1/2 contre H₁ : p = 1/2
    ? Le test est… ✔ unilatéral à droite / · bilatéral
    = 1,645   ← R = [1,645 ; +∞[
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(2,425)   ← Une queue
    = 1 − 0,992   ← Table : Φ(2,425) = 0,992
    = 0,008
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_accept_h0, p_pvalue_h0, p_significant_large

Une pièce de monnaie est-elle truquée (p = probabilité de pile) ? On fait un test z au niveau 5 % et on observe t_obs = 0,525. Pose les hypothèses, donne la région critique et la p-valeur.
  [free, sans aide]  t_c
    ? Quelles hypothèses ? ✔ H₀ : p = 1/2 contre H₁ : p ≠ 1/2 / · H₀ : p = 1/2 contre H₁ : p > 1/2 / · H₀ : p ≠ 1/2 contre H₁ : p = 1/2 / · H₀ : p = 1/2 contre H₁ : p < 1/2 / · H₀ : p > 1/2 contre H₁ : p ≤ 1/2
    ? Le test est… ✔ bilatéral / · unilatéral
    = 1,96   ← R = {|T| > 1,96}
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(0,525))   ← Bilatéral : les deux queues
    = 2(1 − 0,7)   ← Table : Φ(0,525) = 0,7
    = 0,6
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_accept_h0, p_pvalue_h0, p_significant_large

```

### Variantes d'examen

```
La teneur moyenne μ en alcool d’une boisson dépasse-t-elle la limite de 0,5 % ? Quelles hypothèses tester ?
  · H₀ : μ = 0,5 contre H₁ : μ < 0,5 [p_one_two_sided]   · H₀ : μ ≠ 0,5 contre H₁ : μ = 0,5 [p_h0_direction]   ✔ H₀ : μ = 0,5 contre H₁ : μ > 0,5   · H₀ : μ = 0,5 contre H₁ : μ ≠ 0,5 [p_one_two_sided]   · H₀ : μ > 0,5 contre H₁ : μ = 0,5 [p_h0_direction]
  [examen mcq]
  pièges : p_h0_direction, p_one_two_sided

Vrai ou faux ?
  « La p-valeur est la plus petite valeur de α pour laquelle on rejette H₀. » → VRAI
  [examen tf]

```

## Erreurs de type 1 et 2, puissance (`p-test-power`, BA3)

_Erreurs de type 1 et 2, et puissance d'un test sous H₁._

### Niveau 1

```
H₀ : μ = 22 contre H₁ : μ = 22,75 (unilatéral), σ = 5 connu, n = 100, niveau α = 5 %. Calcule β et la puissance du test z.
  [guided]  se
    (On garde H₀ alors que H₁ est vraie : quelle erreur ? Une erreur de type 2 (probabilité β).)
    = 5/√(□)   (trous : 5/√(100))   ← σ/√n
    = □   (trous : 0,5)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 1,645)   ← Unilatéral à 5 % : Φ⁻¹(0,95)
  — δ  [juge stat]  départ : δ
    = (22,75 − 22)/0,5   ← Sous H₁, T ~ N(δ, 1)
    = □   (trous : 1,5)
  — β  [juge stat]  départ : β
    = Φ(1,645 − □)   (trous : Φ(1,645 − 1,5))   ← β = Φ(t_c − δ)
    = □   (trous : 0,5576)
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − □   (trous : 1 − 0,5576)   ← Puissance
    = □   (trous : 0,4424)
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,645-□) | β = 0,5576, puissance 0,4424
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 62 contre H₁ : μ = 64,5 (unilatéral), σ = 5 connu, n = 25, niveau α = 1 %. Calcule β et la puissance du test z.
  [guided]  se
    (On garde H₀ alors que H₁ est vraie : quelle erreur ? Une erreur de type 2 (probabilité β).)
    = 5/√(□)   (trous : 5/√(25))   ← σ/√n
    = □   (trous : 1)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,326)   ← Unilatéral à 1 % : Φ⁻¹(0,99)
  — δ  [juge stat]  départ : δ
    = (64,5 − □)/1   (trous : (64,5 − 62)/1)   ← Sous H₁, T ~ N(δ, 1)
    = □   (trous : 2,5)
  — β  [juge stat]  départ : β
    = Φ(2,326 − □)   (trous : Φ(2,326 − 2,5))   ← β = Φ(t_c − δ)
    = □   (trous : 0,4309)
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − □   (trous : 1 − 0,4309)   ← Puissance
    = □   (trous : 0,5691)
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(2,326-□) | β = 0,4309, puissance 0,5691
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 37 contre H₁ : μ = 49,5 (unilatéral), σ = 20 connu, n = 16, niveau α = 5 %. Calcule β et la puissance du test z.
  [guided]  se
    (On garde H₀ alors que H₁ est vraie : quelle erreur ? Une erreur de type 2 (probabilité β).)
    = 20/√(□)   (trous : 20/√(16))   ← σ/√n
    = □   (trous : 5)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 1,645)   ← Unilatéral à 5 % : Φ⁻¹(0,95)
  — δ  [juge stat]  départ : δ
    = (49,5 − □)/5   (trous : (49,5 − 37)/5)   ← Sous H₁, T ~ N(δ, 1)
    = □   (trous : 2,5)
  — β  [juge stat]  départ : β
    = Φ(1,645 − □)   (trous : Φ(1,645 − 2,5))   ← β = Φ(t_c − δ)
    = □   (trous : 0,1963)
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − □   (trous : 1 − 0,1963)   ← Puissance
    = □   (trous : 0,8037)
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,645-□) | β = 0,1963, puissance 0,8037
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

```

### Niveau 2

```
H₀ : μ = 156 contre H₁ : μ = 159 (unilatéral), σ = 10 connu, n = 100, niveau α = 5 %. Calcule β et la puissance du test z.
  [guided]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 159 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 10/√(□)   (trous : 10/√(100))   ← σ/√n
    = □   (trous : 1)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 1,645)   ← Unilatéral à 5 % : Φ⁻¹(0,95)
  — δ  [juge stat]  départ : δ
    = (159 − □)/1   (trous : (159 − 156)/1)   ← Sous H₁, T ~ N(δ, 1)
    = □   (trous : 3)
  — β  [juge stat]  départ : β
    = Φ(1,645 − □)   (trous : Φ(1,645 − 3))   ← β = Φ(t_c − δ)
    = □   (trous : 0,0877)
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − □   (trous : 1 − 0,0877)   ← Puissance
    = □   (trous : 0,9123)
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,645-□) | β = 0,0877, puissance 0,9123
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 172 contre H₁ : μ = 175 (unilatéral), σ = 5 connu, n = 25, niveau α = 5 %. Calcule β et la puissance du test z.
  [guided]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 175 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 5/√(□)   (trous : 5/√(25))   ← σ/√n
    = □   (trous : 1)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 1,645)   ← Unilatéral à 5 % : Φ⁻¹(0,95)
  — δ  [juge stat]  départ : δ
    = (175 − □)/1   (trous : (175 − 172)/1)   ← Sous H₁, T ~ N(δ, 1)
    = □   (trous : 3)
  — β  [juge stat]  départ : β
    = Φ(1,645 − □)   (trous : Φ(1,645 − 3))   ← β = Φ(t_c − δ)
    = □   (trous : 0,0877)
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − □   (trous : 1 − 0,0877)   ← Puissance
    = □   (trous : 0,9123)
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,645-□) | β = 0,0877, puissance 0,9123
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 45 contre H₁ : μ = 48,5 (unilatéral), σ = 5 connu, n = 25, niveau α = 1 %. Calcule β et la puissance du test z.
  [guided]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 48,5 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 5/√(□)   (trous : 5/√(25))   ← σ/√n
    = □   (trous : 1)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,326)   ← Unilatéral à 1 % : Φ⁻¹(0,99)
  — δ  [juge stat]  départ : δ
    = (48,5 − □)/1   (trous : (48,5 − 45)/1)   ← Sous H₁, T ~ N(δ, 1)
    = □   (trous : 3,5)
  — β  [juge stat]  départ : β
    = Φ(2,326 − □)   (trous : Φ(2,326 − 3,5))   ← β = Φ(t_c − δ)
    = □   (trous : 0,1202)
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − □   (trous : 1 − 0,1202)   ← Puissance
    = □   (trous : 0,8798)
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(2,326-□) | β = 0,1202, puissance 0,8798
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

```

### Niveau 3

```
H₀ : μ = 113 contre H₁ : μ = 116,5 (unilatéral), σ = 5 connu, n = 25, niveau α = 1 %. Calcule β et la puissance du test z.
  [tap, suivre l'erreur, menu menu]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 116,5 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 5/√(25)   ← σ/√n
    = 1
  — tc  [juge stat]  départ : t_c
    = 2,326   ← Unilatéral à 1 % : Φ⁻¹(0,99)
  — δ  [juge stat]  départ : δ
    = (116,5 − 113)/1   ← Sous H₁, T ~ N(δ, 1)
    = 3,5
  — β  [juge stat]  départ : β
    = Φ(2,326 − 3,5)   ← β = Φ(t_c − δ)
    = 0,1202
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,1202   ← Puissance
    = 0,8798
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(2,326-□) | β = 0,1202, puissance 0,8798
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 180 contre H₁ : μ = 183 (unilatéral), σ = 10 connu, n = 25, niveau α = 1 %. Calcule β et la puissance du test z.
  [tap, suivre l'erreur, menu menu]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 183 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 10/√(25)   ← σ/√n
    = 2
  — tc  [juge stat]  départ : t_c
    = 2,326   ← Unilatéral à 1 % : Φ⁻¹(0,99)
  — δ  [juge stat]  départ : δ
    = (183 − 180)/2   ← Sous H₁, T ~ N(δ, 1)
    = 1,5
  — β  [juge stat]  départ : β
    = Φ(2,326 − 1,5)   ← β = Φ(t_c − δ)
    = 0,7956
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,7956   ← Puissance
    = 0,2044
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(2,326-□) | β = 0,7956, puissance 0,2044
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 146 contre H₁ : μ = 147 (unilatéral), σ = 5 connu, n = 25, niveau α = 5 %. Calcule β et la puissance du test z.
  [tap, suivre l'erreur, menu menu]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 147 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 5/√(25)   ← σ/√n
    = 1
  — tc  [juge stat]  départ : t_c
    = 1,645   ← Unilatéral à 5 % : Φ⁻¹(0,95)
  — δ  [juge stat]  départ : δ
    = (147 − 146)/1   ← Sous H₁, T ~ N(δ, 1)
    = 1
  — β  [juge stat]  départ : β
    = Φ(1,645 − 1)   ← β = Φ(t_c − δ)
    = 0,7405
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,7405   ← Puissance
    = 0,2595
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,645-□) | β = 0,7405, puissance 0,2595
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

```

### Niveau 4

```
H₀ : μ = 33 contre H₁ : μ = 35 (unilatéral), σ = 20 connu, n = 100, niveau α = 1 %. Calcule β et la puissance du test z.
  [free, suivre l'erreur]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 35 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 20/√(100)   ← σ/√n
    = 2
  — tc  [juge stat]  départ : t_c
    = 2,326   ← Unilatéral à 1 % : Φ⁻¹(0,99)
  — δ  [juge stat]  départ : δ
    = (35 − 33)/2   ← Sous H₁, T ~ N(δ, 1)
    = 1
  — β  [juge stat]  départ : β
    = Φ(2,326 − 1)   ← β = Φ(t_c − δ)
    = 0,9076
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,9076   ← Puissance
    = 0,0924
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(2,326-□) | β = 0,9076, puissance 0,0924
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 27 contre H₁ : μ = 30 (unilatéral), σ = 10 connu, n = 25, niveau α = 1 %. Calcule β et la puissance du test z.
  [free, suivre l'erreur]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 30 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 10/√(25)   ← σ/√n
    = 2
  — tc  [juge stat]  départ : t_c
    = 2,326   ← Unilatéral à 1 % : Φ⁻¹(0,99)
  — δ  [juge stat]  départ : δ
    = (30 − 27)/2   ← Sous H₁, T ~ N(δ, 1)
    = 1,5
  — β  [juge stat]  départ : β
    = Φ(2,326 − 1,5)   ← β = Φ(t_c − δ)
    = 0,7956
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,7956   ← Puissance
    = 0,2044
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(2,326-□) | β = 0,7956, puissance 0,2044
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 176 contre H₁ : μ = 182 (unilatéral), σ = 10 connu, n = 25, niveau α = 1 %. Calcule β et la puissance du test z.
  [free, suivre l'erreur]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 182 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 10/√(25)   ← σ/√n
    = 2
  — tc  [juge stat]  départ : t_c
    = 2,326   ← Unilatéral à 1 % : Φ⁻¹(0,99)
  — δ  [juge stat]  départ : δ
    = (182 − 176)/2   ← Sous H₁, T ~ N(δ, 1)
    = 3
  — β  [juge stat]  départ : β
    = Φ(2,326 − 3)   ← β = Φ(t_c − δ)
    = 0,2502
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,2502   ← Puissance
    = 0,7498
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(2,326-□) | β = 0,2502, puissance 0,7498
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

```

### Niveau 5

```
H₀ : μ = 55 contre H₁ : μ = 56,875 (unilatéral), σ = 10 connu, n = 64, niveau α = 5 %. Calcule β et la puissance, puis le plus petit n qui donne une puissance d’au moins 0,9.
  [free, sans aide]  se
    ? On rejette H₀ et en fait μ = 56,875 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 10/√(64)   ← σ/√n
    = 1,25
  — tc  [juge stat]  départ : t_c
    = 1,645   ← Unilatéral à 5 % : Φ⁻¹(0,95)
  — δ  [juge stat]  départ : δ
    = (56,875 − 55)/1,25   ← Sous H₁, T ~ N(δ, 1)
    = 1,5
  — β  [juge stat]  départ : β
    = Φ(1,645 − 1,5)   ← β = Φ(t_c − δ)
    = 0,5576
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,5576   ← Puissance
    = 0,4424
  — n  [juge stat]  départ : n
    (n ≥ ((z₁₋α + z₀,₉)·σ/(μ₁ − μ₀))², avec z₀,₉ = Φ⁻¹(0,9) = 1,28 ; on arrondit vers le haut.)
    = 244   ← ((1,645 + 1,28)·10/1,875)² = 243,36
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 109 contre H₁ : μ = 116 (unilatéral), σ = 10 connu, n = 25, niveau α = 10 %. Calcule β et la puissance, puis le plus petit n qui donne une puissance d’au moins 0,9.
  [free, sans aide]  se
    ? On rejette H₀ et en fait μ = 116 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 10/√(25)   ← σ/√n
    = 2
  — tc  [juge stat]  départ : t_c
    = 1,282   ← Unilatéral à 10 % : Φ⁻¹(0,9)
  — δ  [juge stat]  départ : δ
    = (116 − 109)/2   ← Sous H₁, T ~ N(δ, 1)
    = 3,5
  — β  [juge stat]  départ : β
    = Φ(1,282 − 3,5)   ← β = Φ(t_c − δ)
    = 0,0133
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,0133   ← Puissance
    = 0,9867
  — n  [juge stat]  départ : n
    (n ≥ ((z₁₋α + z₀,₉)·σ/(μ₁ − μ₀))², avec z₀,₉ = Φ⁻¹(0,9) = 1,28 ; on arrondit vers le haut.)
    = 14   ← ((1,282 + 1,28)·10/7)² = 13,4
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 75 contre H₁ : μ = 78 (unilatéral), σ = 10 connu, n = 100, niveau α = 10 %. Calcule β et la puissance, puis le plus petit n qui donne une puissance d’au moins 0,9.
  [free, sans aide]  se
    ? On rejette H₀ et en fait μ = 78 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 10/√(100)   ← σ/√n
    = 1
  — tc  [juge stat]  départ : t_c
    = 1,282   ← Unilatéral à 10 % : Φ⁻¹(0,9)
  — δ  [juge stat]  départ : δ
    = (78 − 75)/1   ← Sous H₁, T ~ N(δ, 1)
    = 3
  — β  [juge stat]  départ : β
    = Φ(1,282 − 3)   ← β = Φ(t_c − δ)
    = 0,0429
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,0429   ← Puissance
    = 0,9571
  — n  [juge stat]  départ : n
    (n ≥ ((z₁₋α + z₀,₉)·σ/(μ₁ − μ₀))², avec z₀,₉ = Φ⁻¹(0,9) = 1,28 ; on arrondit vers le haut.)
    = 73   ← ((1,282 + 1,28)·10/3)² = 72,93
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

```

### Variantes d'examen

```
H₀ : μ = 62 contre H₁ : μ = 62,5 (unilatéral), σ = 5 connu, n = 100, niveau α = 1 %. Quelle est la puissance du test z (deux décimales) ?
  · 0,91 [p_upper_tail]   · 0,84   · 0,99 [p_power_alpha]   ✔ 0,09
  [examen mcq]
  pièges : p_power_alpha, p_upper_tail

Vrai ou faux ?
  « Pour H₀ : μ = 100 contre H₁ : μ = 103, σ = 10, n = 100, au niveau 5 % (unilatéral), la puissance du test z vaut 0,95. » → FAUX
    contre-exemple (refute) : p = 0,91
  [examen tf]
  pièges : p_power_alpha

H₀ : μ = 164 contre H₁ : μ = 167,75 (unilatéral), σ = 20 connu, n = 64, niveau α = 5 %. Donne la puissance du test z (deux décimales).
  [free, sans aide, examen coef]  1 − β
    = 0,44

```

## Test z : σ connu, asymptotique, une proportion, Wald (`p-test-z`, BA3)

_Le test z : σ connu, version asymptotique, une proportion, ou un MLE (Wald)._

### Niveau 1

```
Un fournisseur annonce 20 % de pièces défectueuses. Sur un lot de n = 100 pièces, on en trouve 10. Test z bilatéral de H₀ : p = 0,2. Niveau 5 %.
  [guided]  se₀
    (Quel test ? Test z d’une proportion.)
    = √(0,2·0,8/□)   (trous : √(0,2·0,8/100))   ← Sous H₀
    = □   (trous : 0,04)
  — tobs  [juge stat]  départ : t_obs
    = (0,1 − □)/0,04   (trous : (0,1 − 0,2)/0,04)   ← T = (estimation − valeur de H₀)/se
    = □   (trous : −2,5)
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(□))   (trous : 2(1 − Φ(2,5)))   ← Bilatéral
    = □   (trous : 0,012)
  aides : Sous H₀, l’écart-type de p̂ est √(p₀(1 − p₀)/n). | (0,1-0,2)/□ | t_obs = -2,5
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

Des compteurs de moyenne nominale μ₀ = 1 000 ; σ = 10 connu. Sur n = 16 compteurs (normaux), x̄ = 994,375. Test z bilatéral. Niveau 5 %.
  [guided]  se₀
    (Quel test ? Test z : σ est connu.)
    = 10/√(□)   (trous : 10/√(16))   ← Sous H₀
    = □   (trous : 2,5)
  — tobs  [juge stat]  départ : t_obs
    = (994,375 − □)/2,5   (trous : (994,375 − 1000)/2,5)   ← T = (estimation − valeur de H₀)/se
    = □   (trous : −2,25)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 1,96)   ← Bilatéral à 5 %
  aides : T = (estimation − valeur de H₀)/(erreur standard). | (994,375-1000)/□ | t_obs = -2,25
  pièges : p_se_forgot_sqrt_n, p_one_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Un fournisseur annonce 20 % de pièces défectueuses. Sur un lot de n = 625 pièces, on en trouve 130. Test z bilatéral de H₀ : p = 0,2. Niveau 5 %.
  [guided]  se₀
    (Quel test ? Test z d’une proportion.)
    = √(0,2·0,8/□)   (trous : √(0,2·0,8/625))   ← Sous H₀
    = □   (trous : 0,016)
  — tobs  [juge stat]  départ : t_obs
    = (0,208 − 0,2)/0,016   ← T = (estimation − valeur de H₀)/se
    = □   (trous : 0,5)
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(□))   (trous : 2(1 − Φ(0,5)))   ← Bilatéral
    = □   (trous : 0,618)
  aides : Sous H₀, l’écart-type de p̂ est √(p₀(1 − p₀)/n). | (0,208-0,2)/□ | t_obs = 0,5
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 2

```
Sur n = 625 unités, 133 présentent le caractère. On teste H₀ : p = 0,2 contre H₁ : p > 0,2. Niveau 5 %.
  [guided]  se₀
    ? Quel test ? ✔ Test z d’une proportion / · Test t de Student
    = √(0,2·0,8/□)   (trous : √(0,2·0,8/625))   ← Sous H₀
    = □   (trous : 0,016)
  — tobs  [juge stat]  départ : t_obs
    = (0,2128 − 0,2)/0,016   ← T = (estimation − valeur de H₀)/se
    = □   (trous : 0,8)
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(□)   (trous : 1 − Φ(0,8))   ← Unilatéral
    = □   (trous : 0,212)
  aides : Sous H₀, l’écart-type de p̂ est √(p₀(1 − p₀)/n). | (0,2128-0,2)/□ | t_obs = 0,8
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Des compteurs de moyenne nominale μ₀ = 1 000 ; σ = 10 connu. Sur n = 25 compteurs (normaux), x̄ = 1001,1. Test z unilatéral (H₁ : μ > 1 000). Niveau 5 %.
  [guided]  se₀
    ? Quel test ? ✔ Test z : σ est connu / · Test t de Student
    = 10/√(□)   (trous : 10/√(25))   ← Sous H₀
    = □   (trous : 2)
  — tobs  [juge stat]  départ : t_obs
    = (1001,1 − □)/2   (trous : (1001,1 − 1000)/2)   ← T = (estimation − valeur de H₀)/se
    = □   (trous : 0,55)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 1,645)   ← Unilatéral à 5 %
  aides : T = (estimation − valeur de H₀)/(erreur standard). | (1001,1-1000)/□ | t_obs = 0,55
  pièges : p_se_forgot_sqrt_n, p_one_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Un fournisseur annonce 20 % de pièces défectueuses. Sur un lot de n = 100 pièces, on en trouve 8. Test z bilatéral de H₀ : p = 0,2. Niveau 5 %.
  [guided]  se₀
    ? Quel test ? ✔ Test z d’une proportion / · Test t de Student
    = √(0,2·0,8/□)   (trous : √(0,2·0,8/100))   ← Sous H₀
    = □   (trous : 0,04)
  — tobs  [juge stat]  départ : t_obs
    = (0,08 − □)/0,04   (trous : (0,08 − 0,2)/0,04)   ← T = (estimation − valeur de H₀)/se
    = □   (trous : −3)
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(□))   (trous : 2(1 − Φ(3)))   ← Bilatéral
    = □   (trous : 0,0027)
  aides : Sous H₀, l’écart-type de p̂ est √(p₀(1 − p₀)/n). | (0,08-0,2)/□ | t_obs = -3
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 3

```
Sur n = 225 observations (loi inconnue), x̄ = 224,1 et s = 30. Test z asymptotique de H₀ : μ = 227 (bilatéral). Niveau 5 %.
  [tap, suivre l'erreur, menu menu]  se₀
    ? Quel test ? ✔ Test z asymptotique : n est grand / ✔ Test t de Student
    = 30/√(225)   ← Sous H₀
    = 2
  — tobs  [juge stat]  départ : t_obs
    = (224,1 − 227)/2   ← T = (estimation − valeur de H₀)/se
    = −1,45
  — tc  [juge stat]  départ : t_c
    = 1,96   ← Bilatéral à 5 %
  aides : T = (estimation − valeur de H₀)/(erreur standard). | (224,1-227)/□ | t_obs = -1,45
  pièges : p_se_forgot_sqrt_n, p_one_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Sur n = 900 observations (loi inconnue), x̄ = 380,2 et s = 45. Test z asymptotique de H₀ : μ = 379 contre H₁ : μ > 379. Niveau 5 %.
  [tap, suivre l'erreur, menu menu]  se₀
    ? Quel test ? ✔ Test z asymptotique : n est grand / ✔ Test t de Student
    = 45/√(900)   ← Sous H₀
    = 1,5
  — tobs  [juge stat]  départ : t_obs
    = (380,2 − 379)/1,5   ← T = (estimation − valeur de H₀)/se
    = 0,8
  — tc  [juge stat]  départ : t_c
    = 1,645   ← Unilatéral à 5 %
  aides : T = (estimation − valeur de H₀)/(erreur standard). | (380,2-379)/□ | t_obs = 0,8
  pièges : p_se_forgot_sqrt_n, p_one_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Un fournisseur annonce 20 % de pièces défectueuses. Sur un lot de n = 400 pièces, on en trouve 60. Test z bilatéral de H₀ : p = 0,2. Niveau 5 %.
  [tap, suivre l'erreur, menu menu]  se₀
    ? Quel test ? ✔ Test z d’une proportion / · Test t de Student
    = √(0,2·0,8/400)   ← Sous H₀
    = 0,02
  — tobs  [juge stat]  départ : t_obs
    = (0,15 − 0,2)/0,02   ← T = (estimation − valeur de H₀)/se
    = −2,5
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,5))   ← Bilatéral
    = 0,012
  aides : Sous H₀, l’écart-type de p̂ est √(p₀(1 − p₀)/n). | (0,15-0,2)/□ | t_obs = -2,5
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

```

### Niveau 4

```
Des compteurs de moyenne nominale μ₀ = 1 000 ; σ = 15 connu. Sur n = 36 compteurs (normaux), x̄ = 998. Test z bilatéral. Niveau 5 %.
  [free, suivre l'erreur]  se₀
    = 15/√(36)   ← Sous H₀
    = 2,5
  — tobs  [juge stat]  départ : t_obs
    = (998 − 1000)/2,5   ← T = (estimation − valeur de H₀)/se
    = −0,8
  — tc  [juge stat]  départ : t_c
    = 1,96   ← Bilatéral à 5 %
  aides : T = (estimation − valeur de H₀)/(erreur standard). | (998-1000)/□ | t_obs = -0,8
  pièges : p_se_forgot_sqrt_n, p_one_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Une pièce est lancée 100 fois ; on obtient 64 piles. Est-elle équilibrée ? Test z bilatéral de H₀ : p = 0,5. Niveau 5 %.
  [free, suivre l'erreur]  se₀
    = √(0,5·0,5/100)   ← Sous H₀
    = 0,05
  — tobs  [juge stat]  départ : t_obs
    = (0,64 − 0,5)/0,05   ← T = (estimation − valeur de H₀)/se
    = 2,8
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,8))   ← Bilatéral
    = 0,006
  aides : Sous H₀, l’écart-type de p̂ est √(p₀(1 − p₀)/n). | (0,64-0,5)/□ | t_obs = 2,8
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Sur n = 625 unités, 139 présentent le caractère. On teste H₀ : p = 0,2 contre H₁ : p > 0,2. Niveau 5 %.
  [free, suivre l'erreur]  se₀
    = √(0,2·0,8/625)   ← Sous H₀
    = 0,016
  — tobs  [juge stat]  départ : t_obs
    = (0,2224 − 0,2)/0,016   ← T = (estimation − valeur de H₀)/se
    = 1,4
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(1,4)   ← Unilatéral
    = 0,081
  aides : Sous H₀, l’écart-type de p̂ est √(p₀(1 − p₀)/n). | (0,2224-0,2)/□ | t_obs = 1,4
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 5

```
n = 100 comptages de Poisson, λ̂ = x̄ = 1. Test de Wald (EE-209) de H₀ : λ = 1,25, bilatéral : T = √(I(λ̂))·(λ̂ − λ₀) avec I(λ̂) = n/λ̂. Niveau 5 %.
  [free, sans aide]  se₀
    = √(1/100)   ← se = 1/√I(λ̂) = √(λ̂/n)
    = 0,1
  — tobs  [juge stat]  départ : t_obs
    = (1 − 1,25)/0,1   ← T = (estimation − valeur de H₀)/se
    = −2,5
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,5))   ← Bilatéral
    = 0,012
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

n = 100 comptages de Poisson, λ̂ = x̄ = 4. Test de Wald (EE-209) de H₀ : λ = 3,59, bilatéral : T = √(I(λ̂))·(λ̂ − λ₀) avec I(λ̂) = n/λ̂. Niveau 5 %.
  [free, sans aide]  se₀
    = √(4/100)   ← se = 1/√I(λ̂) = √(λ̂/n)
    = 0,2
  — tobs  [juge stat]  départ : t_obs
    = (4 − 3,59)/0,2   ← T = (estimation − valeur de H₀)/se
    = 2,05
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,05))   ← Bilatéral
    = 0,04
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

Sur n = 100 unités, 10 présentent le caractère. On teste H₀ : p = 0,2 contre H₁ : p < 0,2. Niveau 5 %.
  [free, sans aide]  se₀
    = √(0,2·0,8/100)   ← Sous H₀
    = 0,04
  — tobs  [juge stat]  départ : t_obs
    = (0,1 − 0,2)/0,04   ← T = (estimation − valeur de H₀)/se
    = −2,5
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(2,5)   ← Unilatéral
    = 0,006
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Variantes d'examen

```
Un fournisseur annonce 20 % de pièces défectueuses. Sur un lot de n = 625 pièces, on en trouve 146. Test z bilatéral de H₀ : p = 0,2. Quelle est la p-valeur ?
  · 0,936 [p_se_forgot_sqrt_n]   · 0,018 [p_pvalue_two_sided]   ✔ 0,036   · 0,964 [p_upper_tail]
  [examen mcq]
  pièges : p_pvalue_two_sided, p_upper_tail, p_se_forgot_sqrt_n

Vrai ou faux ?
  « Un test z bilatéral à 5 % rejette H₀ : θ = θ₀ si et seulement si θ₀ est hors de l’IC à 95 % construit avec la même statistique. » → VRAI
  [examen tf]

Une pièce est lancée 400 fois ; on obtient 222 piles. Est-elle équilibrée ? Test z bilatéral de H₀ : p = 0,5. Donne t_obs (deux décimales).
  [free, sans aide, examen coef]  t_obs
    = 2,2

```

## Test t à un échantillon ; données appariées (`p-test-t1`, BA3)

_Le test t à un échantillon (σ inconnu), et sur les différences de données appariées._

### Niveau 1

```
Sur n = 16 mesures normales, x̄ = 31 et s² = 10. On teste H₀ : μ = 29 contre H₁ : μ ≠ 29 au niveau 5 %.
  [guided]  s/√n
    = √(10/□)   (trous : √(10/16))   ← Erreur standard
    = □   (trous : 0,791)
  — tobs  [juge stat]  départ : t_obs
    = (31 − □)/0,791   (trous : (31 − 29)/0,791)   ← T = (x̄ − μ₀)/(s/√n)
    = □   (trous : 2,53)
  — ν  [juge prob]  départ : ν
    = □   (trous : 15)   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    (Quel quantile ? Student à ν = 15 degrés de liberté, bilatéral : 2,131.)
    = □   (trous : 2,131)   ← Table 3, ν = 15
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (31-29)/□ | t_obs = 2,53, s₅(15) = 2,131
  pièges : p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Sur n = 6 mesures normales, x̄ = 10 et s² = 10. On teste H₀ : μ = 12 contre H₁ : μ ≠ 12 au niveau 5 %.
  [guided]  s/√n
    = √(10/□)   (trous : √(10/6))   ← Erreur standard
    = □   (trous : 1,291)
  — tobs  [juge stat]  départ : t_obs
    = (10 − □)/1,291   (trous : (10 − 12)/1,291)   ← T = (x̄ − μ₀)/(s/√n)
    = □   (trous : −1,55)
  — ν  [juge prob]  départ : ν
    = □   (trous : 5)   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    (Quel quantile ? Student à ν = 5 degrés de liberté, bilatéral : 2,571.)
    = □   (trous : 2,571)   ← Table 3, ν = 5
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (10-12)/□ | t_obs = -1,55, s₅(5) = 2,571
  pièges : p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Sur n = 9 mesures normales, x̄ = 42 et s² = 15. On teste H₀ : μ = 46 contre H₁ : μ ≠ 46 au niveau 5 %.
  [guided]  s/√n
    = √(15/□)   (trous : √(15/9))   ← Erreur standard
    = □   (trous : 1,291)
  — tobs  [juge stat]  départ : t_obs
    = (42 − □)/1,291   (trous : (42 − 46)/1,291)   ← T = (x̄ − μ₀)/(s/√n)
    = □   (trous : −3,1)
  — ν  [juge prob]  départ : ν
    = □   (trous : 8)   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    (Quel quantile ? Student à ν = 8 degrés de liberté, bilatéral : 2,306.)
    = □   (trous : 2,306)   ← Table 3, ν = 8
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (42-46)/□ | t_obs = -3,1, s₅(8) = 2,306
  pièges : p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 2

```
Mesures supposées normales : 40 ; 42 ; 48 ; 40 ; 38 ; 41 ; 44 ; 46 ; 46 ; 44 ; 39 ; 48 ; 38 ; 45 ; 47 ; 42. On teste H₀ : μ = 44 contre H₁ : μ ≠ 44 au niveau 5 %.
  [guided]  x̄
    = (40 + 42 + 48 + 40 + 38 + 41 + 44 + 46 + 46 + 44 + 39 + 48 + 38 + 45 + 47 + 42)/□   (trous : (40 + 42 + 48 + 40 + 38 + 41 + 44 + 46 + 46 + 44 + 39 + 48 + 38 + 45 + 47 + 42)/16)   ← Moyenne
    = □   (trous : 43)
  — s2  [juge prob]  départ : s²
    = (9 + 1 + 25 + 9 + 25 + 4 + 1 + 9 + 9 + 1 + 16 + 25 + 25 + 4 + 16 + 1)/□   (trous : (9 + 1 + 25 + 9 + 25 + 4 + 1 + 9 + 9 + 1 + 16 + 25 + 25 + 4 + 16 + 1)/15)   ← Écarts au carré, ÷ (n − 1)
    = 180/15
    = 12
  — s/√n  [juge stat]  départ : s/√n
    = √(12/□)   (trous : √(12/16))   ← Erreur standard
    = □   (trous : 0,866)
  — tobs  [juge stat]  départ : t_obs
    = (43 − □)/0,866   (trous : (43 − 44)/0,866)   ← T = (x̄ − μ₀)/(s/√n)
    = □   (trous : −1,15)
  — ν  [juge prob]  départ : ν
    = □   (trous : 15)   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    ? Quel quantile ? ✔ Student à ν = 15 degrés de liberté, bilatéral : 2,131 / · La loi normale : 1,96 / · Student à ν = 16 : 2,12
    = □   (trous : 2,131)   ← Table 3, ν = 15
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (43-44)/□ | t_obs = -1,15, s₅(15) = 2,131
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Mesures supposées normales : 78 ; 82 ; 74 ; 80 ; 76. On teste H₀ : μ = 76 contre H₁ : μ ≠ 76 au niveau 5 %.
  [guided]  x̄
    = (78 + 82 + 74 + 80 + 76)/□   (trous : (78 + 82 + 74 + 80 + 76)/5)   ← Moyenne
    = □   (trous : 78)
  — s2  [juge prob]  départ : s²
    = (0 + 16 + 16 + □ + 4)/4   (trous : (0 + 16 + 16 + 4 + 4)/4)   ← Écarts au carré, ÷ (n − 1)
    = 40/4
    = 10
  — s/√n  [juge stat]  départ : s/√n
    = √(10/□)   (trous : √(10/5))   ← Erreur standard
    = □   (trous : 1,414)
  — tobs  [juge stat]  départ : t_obs
    = (78 − □)/1,414   (trous : (78 − 76)/1,414)   ← T = (x̄ − μ₀)/(s/√n)
    = □   (trous : 1,41)
  — ν  [juge prob]  départ : ν
    = □   (trous : 4)   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    ? Quel quantile ? ✔ Student à ν = 4 degrés de liberté, bilatéral : 2,776 / · La loi normale : 1,96 / · Student à ν = 5 : 2,571
    = □   (trous : 2,776)   ← Table 3, ν = 4
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (78-76)/□ | t_obs = 1,41, s₅(4) = 2,776
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Mesures supposées normales : 26 ; 26 ; 20 ; 22 ; 28 ; 20 ; 18 ; 27 ; 25 ; 24 ; 22 ; 28 ; 18 ; 24 ; 21 ; 19. On teste H₀ : μ = 19 contre H₁ : μ ≠ 19 au niveau 5 %.
  [guided]  x̄
    = (26 + 26 + 20 + 22 + 28 + 20 + 18 + 27 + 25 + 24 + 22 + 28 + 18 + 24 + 21 + 19)/□   (trous : (26 + 26 + 20 + 22 + 28 + 20 + 18 + 27 + 25 + 24 + 22 + 28 + 18 + 24 + 21 + 19)/16)   ← Moyenne
    = □   (trous : 23)
  — s2  [juge prob]  départ : s²
    = (9 + 9 + 9 + 1 + 25 + 9 + 25 + 16 + 4 + 1 + 1 + 25 + 25 + 1 + 4 + 16)/□   (trous : (9 + 9 + 9 + 1 + 25 + 9 + 25 + 16 + 4 + 1 + 1 + 25 + 25 + 1 + 4 + 16)/15)   ← Écarts au carré, ÷ (n − 1)
    = 180/15
    = 12
  — s/√n  [juge stat]  départ : s/√n
    = √(12/□)   (trous : √(12/16))   ← Erreur standard
    = □   (trous : 0,866)
  — tobs  [juge stat]  départ : t_obs
    = (23 − □)/0,866   (trous : (23 − 19)/0,866)   ← T = (x̄ − μ₀)/(s/√n)
    = □   (trous : 4,62)
  — ν  [juge prob]  départ : ν
    = □   (trous : 15)   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    ? Quel quantile ? ✔ Student à ν = 15 degrés de liberté, bilatéral : 2,131 / · La loi normale : 1,96 / · Student à ν = 16 : 2,12
    = □   (trous : 2,131)   ← Table 3, ν = 15
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (23-19)/□ | t_obs = 4,62, s₅(15) = 2,131
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 3

```
Mesures supposées normales : 72 ; 80 ; 77 ; 74 ; 73 ; 76 ; 70 ; 79 ; 74 ; 76 ; 78 ; 72 ; 78 ; 70 ; 71 ; 80. On teste H₀ : μ = 74 contre H₁ : μ ≠ 74 au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  x̄
    = (72 + 80 + 77 + 74 + 73 + 76 + 70 + 79 + 74 + 76 + 78 + 72 + 78 + 70 + 71 + 80)/16   ← Moyenne
    = 75
  — s2  [juge prob]  départ : s²
    = (9 + 25 + 4 + 1 + 4 + 1 + 25 + 16 + 1 + 1 + 9 + 9 + 9 + 25 + 16 + 25)/15   ← Écarts au carré, ÷ (n − 1)
    = 180/15
    = 12
  — s/√n  [juge stat]  départ : s/√n
    = √(12/16)   ← Erreur standard
    = 0,866
  — tobs  [juge stat]  départ : t_obs
    = (75 − 74)/0,866   ← T = (x̄ − μ₀)/(s/√n)
    = 1,15
  — ν  [juge prob]  départ : ν
    = 15   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    ? Quel quantile ? ✔ Student à ν = 15 degrés de liberté, bilatéral : 2,131 / · La loi normale : 1,96 / · Student à ν = 16 : 2,12
    = 2,131   ← Table 3, ν = 15
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (75-74)/□ | t_obs = 1,15, s₅(15) = 2,131
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Mesures supposées normales : 59 ; 57 ; 51 ; 55 ; 55 ; 53 ; 51 ; 52 ; 59 ; 58. On teste H₀ : μ = 58 contre H₁ : μ ≠ 58 au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  x̄
    = (59 + 57 + 51 + 55 + 55 + 53 + 51 + 52 + 59 + 58)/10   ← Moyenne
    = 55
  — s2  [juge prob]  départ : s²
    = (16 + 4 + 16 + 0 + 0 + 4 + 16 + 9 + 16 + 9)/9   ← Écarts au carré, ÷ (n − 1)
    = 90/9
    = 10
  — s/√n  [juge stat]  départ : s/√n
    = √(10/10)   ← Erreur standard
    = 1
  — tobs  [juge stat]  départ : t_obs
    = (55 − 58)/1   ← T = (x̄ − μ₀)/(s/√n)
    = −3
  — ν  [juge prob]  départ : ν
    = 9   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    ? Quel quantile ? ✔ Student à ν = 9 degrés de liberté, bilatéral : 2,262 / · La loi normale : 1,96 / · Student à ν = 10 : 2,228
    = 2,262   ← Table 3, ν = 9
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (55-58)/□ | t_obs = -3, s₅(9) = 2,262
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Mesures supposées normales : 49 ; 43 ; 51 ; 49 ; 50 ; 47 ; 45 ; 43 ; 51 ; 45 ; 47 ; 44 ; 52 ; 51 ; 43 ; 42. On teste H₀ : μ = 44 contre H₁ : μ ≠ 44 au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  x̄
    = (49 + 43 + 51 + 49 + 50 + 47 + 45 + 43 + 51 + 45 + 47 + 44 + 52 + 51 + 43 + 42)/16   ← Moyenne
    = 47
  — s2  [juge prob]  départ : s²
    = (4 + 16 + 16 + 4 + 9 + 0 + 4 + 16 + 16 + 4 + 0 + 9 + 25 + 16 + 16 + 25)/15   ← Écarts au carré, ÷ (n − 1)
    = 180/15
    = 12
  — s/√n  [juge stat]  départ : s/√n
    = √(12/16)   ← Erreur standard
    = 0,866
  — tobs  [juge stat]  départ : t_obs
    = (47 − 44)/0,866   ← T = (x̄ − μ₀)/(s/√n)
    = 3,46
  — ν  [juge prob]  départ : ν
    = 15   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    ? Quel quantile ? ✔ Student à ν = 15 degrés de liberté, bilatéral : 2,131 / · La loi normale : 1,96 / · Student à ν = 16 : 2,12
    = 2,131   ← Table 3, ν = 15
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (47-44)/□ | t_obs = 3,46, s₅(15) = 2,131
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 4

```
Mesures supposées normales : 77 ; 75 ; 79 ; 81 ; 83. On teste H₀ : μ = 77 contre H₁ : μ ≠ 77 au niveau 5 %.
  [free, suivre l'erreur]  x̄
    = (77 + 75 + 79 + 81 + 83)/5   ← Moyenne
    = 79
  — s2  [juge prob]  départ : s²
    = (4 + 16 + 0 + 4 + 16)/4   ← Écarts au carré, ÷ (n − 1)
    = 40/4
    = 10
  — s/√n  [juge stat]  départ : s/√n
    = √(10/5)   ← Erreur standard
    = 1,414
  — tobs  [juge stat]  départ : t_obs
    = (79 − 77)/1,414   ← T = (x̄ − μ₀)/(s/√n)
    = 1,41
  — ν  [juge prob]  départ : ν
    = 4   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    = 2,776   ← Table 3, ν = 4
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (79-77)/□ | t_obs = 1,41, s₅(4) = 2,776
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Les mêmes 5 personnes sont mesurées avant et après un traitement (avant ; après) : (11 ; 13), (5 ; 7), (11 ; 11), (7 ; 11), (8 ; 10). Données supposées normales. Le traitement change-t-il la mesure ? Test bilatéral à 5 %.
  [free, suivre l'erreur]  d̄
    ? Comment traiter ces données ? ✔ Mêmes personnes : test t sur les différences après − avant / · Deux échantillons indépendants (avant, après)
    = (2 + 2 + 0 + 4 + 2)/5   ← Différences : 2 ; 2 ; 0 ; 4 ; 2
    = 2
  — s_d²  [juge prob]  départ : s_d²
    = (0 + 0 + 4 + 4 + 0)/4   ← Écarts au carré, ÷ (n − 1)
    = 8/4
    = 2
  — s/√n  [juge stat]  départ : s/√n
    = √(2/5)   ← Erreur standard
    = 0,632
  — tobs  [juge stat]  départ : t_obs
    = (2 − 0)/0,632   ← T = (x̄ − μ₀)/(s/√n)
    = 3,16
  — ν  [juge prob]  départ : ν
    = 4   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    = 2,776   ← Table 3, ν = 4
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (2-0)/□ | t_obs = 3,16, s₅(4) = 2,776
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Mesures supposées normales : 33 ; 37 ; 39 ; 31 ; 35 ; 35. On teste H₀ : μ = 31 contre H₁ : μ ≠ 31 au niveau 5 %.
  [free, suivre l'erreur]  x̄
    = (33 + 37 + 39 + 31 + 35 + 35)/6   ← Moyenne
    = 35
  — s2  [juge prob]  départ : s²
    = (4 + 4 + 16 + 16 + 0 + 0)/5   ← Écarts au carré, ÷ (n − 1)
    = 40/5
    = 8
  — s/√n  [juge stat]  départ : s/√n
    = √(8/6)   ← Erreur standard
    = 1,155
  — tobs  [juge stat]  départ : t_obs
    = (35 − 31)/1,155   ← T = (x̄ − μ₀)/(s/√n)
    = 3,46
  — ν  [juge prob]  départ : ν
    = 5   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    = 2,571   ← Table 3, ν = 5
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (35-31)/□ | t_obs = 3,46, s₅(5) = 2,571
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 5

```
Mesures supposées normales : 82 ; 76 ; 79 ; 79 ; 78 ; 80. On teste H₀ : μ = 77 contre H₁ : μ ≠ 77 au niveau 5 %.
  [free, sans aide]  x̄
    = (82 + 76 + 79 + 79 + 78 + 80)/6   ← Moyenne
    = 79
  — s2  [juge prob]  départ : s²
    = (9 + 9 + 0 + 0 + 1 + 1)/5   ← Écarts au carré, ÷ (n − 1)
    = 20/5
    = 4
  — s/√n  [juge stat]  départ : s/√n
    = √(4/6)   ← Erreur standard
    = 0,816
  — tobs  [juge stat]  départ : t_obs
    = (79 − 77)/0,816   ← T = (x̄ − μ₀)/(s/√n)
    = 2,45
  — ν  [juge prob]  départ : ν
    = 5   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    = 2,571   ← Table 3, ν = 5
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Mesures supposées normales : 87 ; 81 ; 85 ; 85 ; 83 ; 83 ; 87 ; 84 ; 81. On teste H₀ : μ = 86 contre H₁ : μ ≠ 86 au niveau 5 %.
  [free, sans aide]  x̄
    = (87 + 81 + 85 + 85 + 83 + 83 + 87 + 84 + 81)/9   ← Moyenne
    = 84
  — s2  [juge prob]  départ : s²
    = (9 + 9 + 1 + 1 + 1 + 1 + 9 + 0 + 9)/8   ← Écarts au carré, ÷ (n − 1)
    = 40/8
    = 5
  — s/√n  [juge stat]  départ : s/√n
    = √(5/9)   ← Erreur standard
    = 0,745
  — tobs  [juge stat]  départ : t_obs
    = (84 − 86)/0,745   ← T = (x̄ − μ₀)/(s/√n)
    = −2,68
  — ν  [juge prob]  départ : ν
    = 8   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    = 2,306   ← Table 3, ν = 8
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Mesures supposées normales : 81 ; 83 ; 77 ; 83 ; 81 ; 75 ; 79 ; 77 ; 75. On teste H₀ : μ = 80 contre H₁ : μ ≠ 80 au niveau 5 %.
  [free, sans aide]  x̄
    = (81 + 83 + 77 + 83 + 81 + 75 + 79 + 77 + 75)/9   ← Moyenne
    = 79
  — s2  [juge prob]  départ : s²
    = (4 + 16 + 4 + 16 + 4 + 16 + 0 + 4 + 16)/8   ← Écarts au carré, ÷ (n − 1)
    = 80/8
    = 10
  — s/√n  [juge stat]  départ : s/√n
    = √(10/9)   ← Erreur standard
    = 1,054
  — tobs  [juge stat]  départ : t_obs
    = (79 − 80)/1,054   ← T = (x̄ − μ₀)/(s/√n)
    = −0,95
  — ν  [juge prob]  départ : ν
    = 8   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    = 2,306   ← Table 3, ν = 8
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Variantes d'examen

```
Mesures supposées normales : −2 ; 0 ; 1 ; 4 ; 2 ; 1. On teste H₀ : μ = 0 contre H₁ : μ ≠ 0. Quelle est la valeur de t_obs ?
  · 0,5 [p_se_forgot_sqrt_n]   · 1,34 [p_sd_n]   ✔ 1,22   · 2,45
  [examen mcq]
  pièges : p_sd_n, p_se_forgot_sqrt_n

Vrai ou faux ?
  « Si un test rejette H₀ au niveau 1 %, il la rejette aussi au niveau 5 %. » → VRAI
  [examen tf]

Les mêmes 9 personnes sont mesurées avant et après un traitement (avant ; après) : (12 ; 18), (11 ; 14), (6 ; 6), (8 ; 10), (12 ; 16), (12 ; 16), (5 ; 7), (8 ; 8), (9 ; 15). Données supposées normales. Le traitement change-t-il la mesure ? Test bilatéral à 5 %. Donne t_obs (deux décimales).
  [free, sans aide, examen coef]  t_obs
    = 4,02

Mesures supposées normales : 47 ; 48 ; 45 ; 51 ; 48 ; 49. On teste H₀ : μ = 45 contre H₁ : μ ≠ 45 au niveau 5 %. Puis donne l’IC à 95 % pour μ (deux décimales).
  [problème, examen open, 10 points]
  partie 1 (Test t et IC : 1,5 ; s2 : 1,5 ; s/√n : 1,5 ; tobs : 1,5 ; ν : 1 ; tc : 1 ; IC : 1)
  Mesures supposées normales : 47 ; 48 ; 45 ; 51 ; 48 ; 49. On teste H₀ : μ = 45 contre H₁ : μ ≠ 45 au niveau 5 %. Puis donne l’IC à 95 % pour μ (deux décimales).
    [free, sans aide, suivre l'erreur, examen open]  x̄
      = (47 + 48 + 45 + 51 + 48 + 49)/6   ← Moyenne
      = 48
    — s2  [juge prob]  départ : s²
      = (1 + 0 + 9 + 9 + 0 + 1)/5   ← Écarts au carré, ÷ (n − 1)
      = 20/5
      = 4
    — s/√n  [juge stat]  départ : s/√n
      = √(4/6)   ← Erreur standard
      = 0,816
    — tobs  [juge stat]  départ : t_obs
      = (48 − 45)/0,816   ← T = (x̄ − μ₀)/(s/√n)
      = 3,68
    — ν  [juge prob]  départ : ν
      = 5   ← ν = n − 1
    — tc  [juge stat]  départ : t_c
      = 2,571   ← Table 3, ν = 5
    — IC  [juge stat]  départ : IC
      = [48 − 2,571·0,816 ; 48 + 2,571·0,816]   ← x̄ ± t_c·s/√n
      = [45,9 ; 50,1]
  partie 2 (Interpréter : 1)
  Conclure et interpréter : quelle phrase est juste ?
    · On ne rejette pas H₀ au niveau 5 % : les données sont compatibles avec l’hypothèse que μ vaut 45. [p_pvalue_alpha_compare]   · La probabilité que H₀ soit vraie est inférieure à 0,05. [p_pvalue_h0]   ✔ On rejette H₀ au niveau 5 % : les données contredisent l’hypothèse que μ vaut 45.   · L’écart est significatif, donc il est important en pratique. [p_significant_large]
    [examen open]
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

## Test t à deux échantillons, variance poolée (et test F) (`p-test-t2`, BA3)

_Le test t de deux échantillons indépendants avec la variance poolée, précédé du test F des variances._

### Niveau 1

```
Deux groupes indépendants, supposés normaux : n₁ = 4, x̄₁ = 39, s₁² = 12 ; n₂ = 5, x̄₂ = 33, s₂² = 4. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(3 ; 4) : 0,066 et 9,979.
  [guided]  F
    (Ces deux groupes sont-ils… Deux échantillons indépendants (des individus différents).)
    = 3   ← F = s₁²/s₂² = 12/4
  — s_p²  [juge prob]  départ : s_p²
    = (3·12 + 4·4)/□   (trous : (3·12 + 4·4)/7)   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = □   (trous : 52/7)
  — se  [juge stat]  départ : se
    = √(52/7·(1/4 + 1/5))   ← se
    = 1,828
  — tobs  [juge stat]  départ : t_obs
    = (39 − 33)/1,828   ← T = (x̄₁ − x̄₂)/se
    = 3,28
  — ν  [juge prob]  départ : ν
    = □   (trous : 7)   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,365)   ← Table 3, ν = 7
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (3×12+4×4)/□ | s_p² = 52 / 7
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Deux groupes indépendants, supposés normaux : n₁ = 9, x̄₁ = 37, s₁² = 11 ; n₂ = 9, x̄₂ = 38, s₂² = 14. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(8 ; 8) : 0,226 et 4,433.
  [guided]  F
    (Ces deux groupes sont-ils… Deux échantillons indépendants (des individus différents).)
    = 0,786   ← F = s₁²/s₂² = 11/14
  — s_p²  [juge prob]  départ : s_p²
    = (8·11 + 8·14)/□   (trous : (8·11 + 8·14)/16)   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = □   (trous : 25/2)
  — se  [juge stat]  départ : se
    = √(25/2·(1/9 + 1/9))   ← se
    = 1,667
  — tobs  [juge stat]  départ : t_obs
    = (37 − 38)/1,667   ← T = (x̄₁ − x̄₂)/se
    = −0,6
  — ν  [juge prob]  départ : ν
    = □   (trous : 16)   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,12)   ← Table 3, ν = 16
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (8×11+8×14)/□ | s_p² = 25 / 2
  pièges : p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0, p_pooled_average

Deux groupes indépendants, supposés normaux : n₁ = 4, x̄₁ = 39, s₁² = 6 ; n₂ = 9, x̄₂ = 37, s₂² = 15. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(3 ; 8) : 0,069 et 5,416.
  [guided]  F
    (Ces deux groupes sont-ils… Deux échantillons indépendants (des individus différents).)
    = 0,4   ← F = s₁²/s₂² = 6/15
  — s_p²  [juge prob]  départ : s_p²
    = (3·6 + 8·15)/□   (trous : (3·6 + 8·15)/11)   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = □   (trous : 138/11)
  — se  [juge stat]  départ : se
    = √(138/11·(1/4 + 1/9))   ← se
    = 2,128
  — tobs  [juge stat]  départ : t_obs
    = (39 − 37)/2,128   ← T = (x̄₁ − x̄₂)/se
    = 0,94
  — ν  [juge prob]  départ : ν
    = □   (trous : 11)   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,201)   ← Table 3, ν = 11
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (3×6+8×15)/□ | s_p² = 138 / 11
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 2

```
Deux groupes indépendants, supposés normaux : n₁ = 8, x̄₁ = 26, s₁² = 10 ; n₂ = 6, x̄₂ = 25, s₂² = 8. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(7 ; 5) : 0,189 et 6,853.
  [guided]  F
    ? Ces deux groupes sont-ils… ✔ Deux échantillons indépendants (des individus différents) / · Des données appariées : on teste les différences groupe par groupe
    = 1,25   ← F = s₁²/s₂² = 10/8
  — s_p²  [juge prob]  départ : s_p²
    ? F = 1,25 et l’énoncé donne F(7 ; 5) entre 0,189 et 6,853 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (7·10 + 5·8)/□   (trous : (7·10 + 5·8)/12)   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = □   (trous : 55/6)
  — se  [juge stat]  départ : se
    = √(55/6·(1/8 + 1/6))   ← se
    = 1,635
  — tobs  [juge stat]  départ : t_obs
    = (26 − 25)/1,635   ← T = (x̄₁ − x̄₂)/se
    = 0,61
  — ν  [juge prob]  départ : ν
    = □   (trous : 12)   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,179)   ← Table 3, ν = 12
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (7×10+5×8)/□ | s_p² = 55 / 6
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Deux groupes indépendants, supposés normaux : n₁ = 8, x̄₁ = 18, s₁² = 22 ; n₂ = 8, x̄₂ = 17, s₂² = 16. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(7 ; 7) : 0,2 et 4,995.
  [guided]  F
    ? Ces deux groupes sont-ils… ✔ Deux échantillons indépendants (des individus différents) / · Des données appariées : on teste les différences groupe par groupe
    = 1,375   ← F = s₁²/s₂² = 22/16
  — s_p²  [juge prob]  départ : s_p²
    ? F = 1,375 et l’énoncé donne F(7 ; 7) entre 0,2 et 4,995 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (7·22 + 7·16)/□   (trous : (7·22 + 7·16)/14)   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = □   (trous : 19)
  — se  [juge stat]  départ : se
    = √(19·(1/8 + 1/8))   ← se
    = 2,179
  — tobs  [juge stat]  départ : t_obs
    = (18 − 17)/2,179   ← T = (x̄₁ − x̄₂)/se
    = 0,46
  — ν  [juge prob]  départ : ν
    = □   (trous : 14)   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,145)   ← Table 3, ν = 14
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (7×22+7×16)/□ | s_p² = 19
  pièges : p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0, p_pooled_average

Deux groupes indépendants, supposés normaux : n₁ = 7, x̄₁ = 30, s₁² = 15 ; n₂ = 10, x̄₂ = 35, s₂² = 24. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(6 ; 9) : 0,181 et 4,32.
  [guided]  F
    ? Ces deux groupes sont-ils… ✔ Deux échantillons indépendants (des individus différents) / · Des données appariées : on teste les différences groupe par groupe
    = 0,625   ← F = s₁²/s₂² = 15/24
  — s_p²  [juge prob]  départ : s_p²
    ? F = 0,625 et l’énoncé donne F(6 ; 9) entre 0,181 et 4,32 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (6·□ + 9·24)/15   (trous : (6·15 + 9·24)/15)   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = □   (trous : 102/5)
  — se  [juge stat]  départ : se
    = √(102/5·(1/7 + 1/10))   ← se
    = 2,226
  — tobs  [juge stat]  départ : t_obs
    = (30 − 35)/2,226   ← T = (x̄₁ − x̄₂)/se
    = −2,25
  — ν  [juge prob]  départ : ν
    = □   (trous : 15)   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,131)   ← Table 3, ν = 15
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (6×15+9×24)/□ | s_p² = 102 / 5
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 3

```
Deux groupes indépendants, supposés normaux : n₁ = 8, x̄₁ = 19, s₁² = 22 ; n₂ = 8, x̄₂ = 16, s₂² = 16. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(7 ; 7) : 0,2 et 4,995.
  [tap, suivre l'erreur, menu menu]  F
    ? Ces deux groupes sont-ils… ✔ Deux échantillons indépendants (des individus différents) / · Des données appariées : on teste les différences groupe par groupe
    = 1,375   ← F = s₁²/s₂² = 22/16
  — s_p²  [juge prob]  départ : s_p²
    ? F = 1,375 et l’énoncé donne F(7 ; 7) entre 0,2 et 4,995 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (7·22 + 7·16)/14   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 19
  — se  [juge stat]  départ : se
    = √(19·(1/8 + 1/8))   ← se
    = 2,179
  — tobs  [juge stat]  départ : t_obs
    = (19 − 16)/2,179   ← T = (x̄₁ − x̄₂)/se
    = 1,38
  — ν  [juge prob]  départ : ν
    = 14   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,145   ← Table 3, ν = 14
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (7×22+7×16)/□ | s_p² = 19
  pièges : p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0, p_pooled_average

Deux groupes indépendants, supposés normaux : n₁ = 6, x̄₁ = 37, s₁² = 20 ; n₂ = 4, x̄₂ = 31, s₂² = 24. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(5 ; 3) : 0,129 et 14,885.
  [tap, suivre l'erreur, menu menu]  F
    ? Ces deux groupes sont-ils… ✔ Deux échantillons indépendants (des individus différents) / · Des données appariées : on teste les différences groupe par groupe
    = 0,833   ← F = s₁²/s₂² = 20/24
  — s_p²  [juge prob]  départ : s_p²
    ? F = 0,833 et l’énoncé donne F(5 ; 3) entre 0,129 et 14,885 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (5·20 + 3·24)/8   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 43/2
  — se  [juge stat]  départ : se
    = √(43/2·(1/6 + 1/4))   ← se
    = 2,993
  — tobs  [juge stat]  départ : t_obs
    = (37 − 31)/2,993   ← T = (x̄₁ − x̄₂)/se
    = 2
  — ν  [juge prob]  départ : ν
    = 8   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,306   ← Table 3, ν = 8
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (5×20+3×24)/□ | s_p² = 43 / 2
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Deux groupes indépendants, supposés normaux : n₁ = 4, x̄₁ = 39, s₁² = 24 ; n₂ = 6, x̄₂ = 40, s₂² = 8. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(3 ; 5) : 0,067 et 7,764.
  [tap, suivre l'erreur, menu menu]  F
    ? Ces deux groupes sont-ils… ✔ Deux échantillons indépendants (des individus différents) / · Des données appariées : on teste les différences groupe par groupe
    = 3   ← F = s₁²/s₂² = 24/8
  — s_p²  [juge prob]  départ : s_p²
    ? F = 3 et l’énoncé donne F(3 ; 5) entre 0,067 et 7,764 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (3·24 + 5·8)/8   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 14
  — se  [juge stat]  départ : se
    = √(14·(1/4 + 1/6))   ← se
    = 2,415
  — tobs  [juge stat]  départ : t_obs
    = (39 − 40)/2,415   ← T = (x̄₁ − x̄₂)/se
    = −0,41
  — ν  [juge prob]  départ : ν
    = 8   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,306   ← Table 3, ν = 8
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (3×24+5×8)/□ | s_p² = 14
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 4

```
Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 27 ; 21 ; 31 ; 25 ; 25 ; 23 ; 27 ; 26 ; 29. Groupe 2 : 20 ; 17 ; 20 ; 26 ; 20 ; 26 ; 29 ; 26. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(8 ; 7) : 0,221 (2,5 %) et 4,899 (97,5 %).
  [free, suivre l'erreur]  x̄₁
    = (27 + 21 + 31 + 25 + 25 + 23 + 27 + 26 + 29)/9   ← Groupe 1
    = 26
  — s₁2  [juge prob]  départ : s_1²
    = 72/8   ← Σ(x − x̄)² = 72, ÷ (n − 1)
    = 9
  — x̄₂  [juge prob]  départ : x̄₂
    = (20 + 17 + 20 + 26 + 20 + 26 + 29 + 26)/8   ← Groupe 2
    = 23
  — s₂2  [juge prob]  départ : s_2²
    = 126/7   ← Σ(x − x̄)² = 126, ÷ (n − 1)
    = 18
  — F  [juge stat]  départ : F
    = 0,5   ← F = s₁²/s₂² = 9/18
  — s_p²  [juge prob]  départ : s_p²
    ? F = 0,5 et l’énoncé donne F(8 ; 7) entre 0,221 et 4,899 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (8·9 + 7·18)/15   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 66/5
  — se  [juge stat]  départ : se
    = √(66/5·(1/9 + 1/8))   ← se
    = 1,765
  — tobs  [juge stat]  départ : t_obs
    = (26 − 23)/1,765   ← T = (x̄₁ − x̄₂)/se
    = 1,7
  — ν  [juge prob]  départ : ν
    = 15   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,131   ← Table 3, ν = 15
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (8×9+7×18)/□ | s_p² = 66 / 5
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 36 ; 35 ; 43 ; 36 ; 42 ; 33 ; 42 ; 45. Groupe 2 : 32 ; 44 ; 32 ; 44. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(7 ; 3) : 0,17 (2,5 %) et 14,624 (97,5 %).
  [free, suivre l'erreur]  x̄₁
    = (36 + 35 + 43 + 36 + 42 + 33 + 42 + 45)/8   ← Groupe 1
    = 39
  — s₁2  [juge prob]  départ : s_1²
    = 140/7   ← Σ(x − x̄)² = 140, ÷ (n − 1)
    = 20
  — x̄₂  [juge prob]  départ : x̄₂
    = (32 + 44 + 32 + 44)/4   ← Groupe 2
    = 38
  — s₂2  [juge prob]  départ : s_2²
    = 144/3   ← Σ(x − x̄)² = 144, ÷ (n − 1)
    = 48
  — F  [juge stat]  départ : F
    = 0,417   ← F = s₁²/s₂² = 20/48
  — s_p²  [juge prob]  départ : s_p²
    ? F = 0,417 et l’énoncé donne F(7 ; 3) entre 0,17 et 14,624 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (7·20 + 3·48)/10   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 142/5
  — se  [juge stat]  départ : se
    = √(142/5·(1/8 + 1/4))   ← se
    = 3,263
  — tobs  [juge stat]  départ : t_obs
    = (39 − 38)/3,263   ← T = (x̄₁ − x̄₂)/se
    = 0,31
  — ν  [juge prob]  départ : ν
    = 10   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,228   ← Table 3, ν = 10
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (7×20+3×48)/□ | s_p² = 142 / 5
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 22 ; 16 ; 22 ; 10 ; 10. Groupe 2 : 24 ; 21 ; 14 ; 25 ; 13 ; 17. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(4 ; 5) : 0,107 (2,5 %) et 7,388 (97,5 %).
  [free, suivre l'erreur]  x̄₁
    = (22 + 16 + 22 + 10 + 10)/5   ← Groupe 1
    = 16
  — s₁2  [juge prob]  départ : s_1²
    = 144/4   ← Σ(x − x̄)² = 144, ÷ (n − 1)
    = 36
  — x̄₂  [juge prob]  départ : x̄₂
    = (24 + 21 + 14 + 25 + 13 + 17)/6   ← Groupe 2
    = 19
  — s₂2  [juge prob]  départ : s_2²
    = 130/5   ← Σ(x − x̄)² = 130, ÷ (n − 1)
    = 26
  — F  [juge stat]  départ : F
    = 1,385   ← F = s₁²/s₂² = 36/26
  — s_p²  [juge prob]  départ : s_p²
    ? F = 1,385 et l’énoncé donne F(4 ; 5) entre 0,107 et 7,388 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (4·36 + 5·26)/9   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 274/9
  — se  [juge stat]  départ : se
    = √(274/9·(1/5 + 1/6))   ← se
    = 3,341
  — tobs  [juge stat]  départ : t_obs
    = (16 − 19)/3,341   ← T = (x̄₁ − x̄₂)/se
    = −0,9
  — ν  [juge prob]  départ : ν
    = 9   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,262   ← Table 3, ν = 9
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (4×36+5×26)/□ | s_p² = 274 / 9
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 5

```
Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 21 ; 27 ; 33 ; 21 ; 27 ; 27 ; 21 ; 33 ; 33. Groupe 2 : 27 ; 21 ; 18 ; 30. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(8 ; 3) : 0,185 (2,5 %) et 14,54 (97,5 %).
  [free, sans aide]  x̄₁
    = (21 + 27 + 33 + 21 + 27 + 27 + 21 + 33 + 33)/9   ← Groupe 1
    = 27
  — s₁2  [juge prob]  départ : s_1²
    = 216/8   ← Σ(x − x̄)² = 216, ÷ (n − 1)
    = 27
  — x̄₂  [juge prob]  départ : x̄₂
    = (27 + 21 + 18 + 30)/4   ← Groupe 2
    = 24
  — s₂2  [juge prob]  départ : s_2²
    = 90/3   ← Σ(x − x̄)² = 90, ÷ (n − 1)
    = 30
  — F  [juge stat]  départ : F
    = 0,9   ← F = s₁²/s₂² = 27/30
  — s_p²  [juge prob]  départ : s_p²
    ? F = 0,9 et l’énoncé donne F(8 ; 3) entre 0,185 et 14,54 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (8·27 + 3·30)/11   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 306/11
  — se  [juge stat]  départ : se
    = √(306/11·(1/9 + 1/4))   ← se
    = 3,169
  — tobs  [juge stat]  départ : t_obs
    = (27 − 24)/3,169   ← T = (x̄₁ − x̄₂)/se
    = 0,95
  — ν  [juge prob]  départ : ν
    = 11   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,201   ← Table 3, ν = 11
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 23 ; 25 ; 20 ; 28 ; 28 ; 24 ; 20. Groupe 2 : 26 ; 22 ; 26 ; 24 ; 28 ; 30. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(6 ; 5) : 0,167 (2,5 %) et 6,978 (97,5 %).
  [free, sans aide]  x̄₁
    = (23 + 25 + 20 + 28 + 28 + 24 + 20)/7   ← Groupe 1
    = 24
  — s₁2  [juge prob]  départ : s_1²
    = 66/6   ← Σ(x − x̄)² = 66, ÷ (n − 1)
    = 11
  — x̄₂  [juge prob]  départ : x̄₂
    = (26 + 22 + 26 + 24 + 28 + 30)/6   ← Groupe 2
    = 26
  — s₂2  [juge prob]  départ : s_2²
    = 40/5   ← Σ(x − x̄)² = 40, ÷ (n − 1)
    = 8
  — F  [juge stat]  départ : F
    = 1,375   ← F = s₁²/s₂² = 11/8
  — s_p²  [juge prob]  départ : s_p²
    ? F = 1,375 et l’énoncé donne F(6 ; 5) entre 0,167 et 6,978 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (6·11 + 5·8)/11   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 106/11
  — se  [juge stat]  départ : se
    = √(106/11·(1/7 + 1/6))   ← se
    = 1,727
  — tobs  [juge stat]  départ : t_obs
    = (24 − 26)/1,727   ← T = (x̄₁ − x̄₂)/se
    = −1,16
  — ν  [juge prob]  départ : ν
    = 11   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,201   ← Table 3, ν = 11
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 6 ; 13 ; 7 ; 14 ; 10 ; 10. Groupe 2 : 15 ; 12 ; 14 ; 7 ; 7 ; 10 ; 15 ; 8. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(5 ; 7) : 0,146 (2,5 %) et 5,285 (97,5 %).
  [free, sans aide]  x̄₁
    = (6 + 13 + 7 + 14 + 10 + 10)/6   ← Groupe 1
    = 10
  — s₁2  [juge prob]  départ : s_1²
    = 50/5   ← Σ(x − x̄)² = 50, ÷ (n − 1)
    = 10
  — x̄₂  [juge prob]  départ : x̄₂
    = (15 + 12 + 14 + 7 + 7 + 10 + 15 + 8)/8   ← Groupe 2
    = 11
  — s₂2  [juge prob]  départ : s_2²
    = 84/7   ← Σ(x − x̄)² = 84, ÷ (n − 1)
    = 12
  — F  [juge stat]  départ : F
    = 0,833   ← F = s₁²/s₂² = 10/12
  — s_p²  [juge prob]  départ : s_p²
    ? F = 0,833 et l’énoncé donne F(5 ; 7) entre 0,146 et 5,285 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (5·10 + 7·12)/12   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 67/6
  — se  [juge stat]  départ : se
    = √(67/6·(1/6 + 1/8))   ← se
    = 1,805
  — tobs  [juge stat]  départ : t_obs
    = (10 − 11)/1,805   ← T = (x̄₁ − x̄₂)/se
    = −0,55
  — ν  [juge prob]  départ : ν
    = 12   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,179   ← Table 3, ν = 12
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Variantes d'examen

```
Deux groupes indépendants, normaux de même variance : n₁ = 7, x̄₁ = 24, s₁² = 10 ; n₂ = 9, x̄₂ = 22, s₂² = 9. Quelle est la statistique t_obs du test t poolé ?
  · 0,46 [p_two_sample_se]   ✔ 1,29   · 0,65   · 2,58
  [examen mcq]
  pièges : p_two_sample_se

Vrai ou faux ?
  « Le test t poolé à deux échantillons de tailles n₁ et n₂ a n₁ + n₂ − 1 degrés de liberté. » → FAUX
    contre-exemple (refute) : a = 5, b = 5, v = 8
  [examen tf]
  pièges : p_df_wrong

Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 19 ; 21 ; 13 ; 25 ; 22 ; 16 ; 19 ; 17. Groupe 2 : 25 ; 21 ; 19 ; 18 ; 15 ; 22. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(7 ; 5) : 0,189 (2,5 %) et 6,853 (97,5 %). Donne la variance poolée s_p².
  [free, sans aide, examen coef]  s_p²
    = (7·14 + 5·12)/12   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 79/6
  pièges : p_pooled_average

Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 24 ; 22 ; 22 ; 28 ; 20 ; 16. Groupe 2 : 23 ; 25 ; 21 ; 24 ; 25 ; 19 ; 27 ; 29 ; 23. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(5 ; 8) : 0,148 (2,5 %) et 4,817 (97,5 %).
  [problème, examen open, 10 points]
  partie 1 (Test t à deux échantillons : 1 ; s₁2 : 1 ; x̄₂ : 1 ; s₂2 : 1 ; F : 1 ; s_p² : 1 ; se : 1 ; tobs : 1 ; ν : 0,5 ; tc : 0,5)
  Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 24 ; 22 ; 22 ; 28 ; 20 ; 16. Groupe 2 : 23 ; 25 ; 21 ; 24 ; 25 ; 19 ; 27 ; 29 ; 23. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(5 ; 8) : 0,148 (2,5 %) et 4,817 (97,5 %).
    [free, sans aide, suivre l'erreur, examen open]  x̄₁
      = (24 + 22 + 22 + 28 + 20 + 16)/6   ← Groupe 1
      = 22
    — s₁2  [juge prob]  départ : s_1²
      = 80/5   ← Σ(x − x̄)² = 80, ÷ (n − 1)
      = 16
    — x̄₂  [juge prob]  départ : x̄₂
      = (23 + 25 + 21 + 24 + 25 + 19 + 27 + 29 + 23)/9   ← Groupe 2
      = 24
    — s₂2  [juge prob]  départ : s_2²
      = 72/8   ← Σ(x − x̄)² = 72, ÷ (n − 1)
      = 9
    — F  [juge stat]  départ : F
      = 1,778   ← F = s₁²/s₂² = 16/9
    — s_p²  [juge prob]  départ : s_p²
      = (5·16 + 8·9)/13   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
      = 152/13
    — se  [juge stat]  départ : se
      = √(152/13·(1/6 + 1/9))   ← se
      = 1,802
    — tobs  [juge stat]  départ : t_obs
      = (22 − 24)/1,802   ← T = (x̄₁ − x̄₂)/se
      = −1,11
    — ν  [juge prob]  départ : ν
      = 13   ← ν = n₁ + n₂ − 2
    — tc  [juge stat]  départ : t_c
      = 2,16   ← Table 3, ν = 13
  partie 2 (Interpréter : 1)
  Conclure et interpréter : quelle phrase est juste ?
    · H₀ est vraie avec une probabilité de 0,95. [p_pvalue_h0]   ✔ On ne rejette pas H₀ au niveau 5 % : les données ne contredisent pas l’hypothèse que les deux moyennes sont égales.   · Les données prouvent que les deux moyennes sont égales. [p_accept_h0]   · On rejette H₀ au niveau 5 %. [p_pvalue_alpha_compare]
    [examen open]
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

## Comparer deux proportions (`p-test-two-prop`, BA3)

_Comparer deux proportions avec la proportion commune estimée sous H₀._

### Niveau 1

```
200 guérisons avec le traitement A sur n₁ = 400, et 80 avec le traitement B sur n₂ = 200. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [guided]  p̂_1
    = 200/400
    = 0,5
  — p̂₂  [juge prob]  départ : p̂_2
    = 80/200
    = 0,4
  — p̂  [juge prob]  départ : p̂
    (Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? Avec tous les individus : (k₁ + k₂)/(n₁ + n₂).)
    = (200 + 80)/(400 + 200)   ← Proportion poolée
    = □   (trous : 7/15)
  — se  [juge stat]  départ : se
    = √(0,4667·0,5333·(1/400 + 1/200))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0432
  — tobs  [juge stat]  départ : t_obs
    = (0,5 − 0,4)/0,0432
    = 2,31
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,31))   ← Bilatéral
    = 0,02
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (200+80)/□ | p̂ = 7/15
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

50 « oui » dans la région 1 sur n₁ = 100, et 130 dans la région 2 sur n₂ = 200. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [guided]  p̂_1
    = 50/100
    = 0,5
  — p̂₂  [juge prob]  départ : p̂_2
    = 130/200
    = 0,65
  — p̂  [juge prob]  départ : p̂
    (Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? Avec tous les individus : (k₁ + k₂)/(n₁ + n₂).)
    = (50 + 130)/(100 + 200)   ← Proportion poolée
    = □   (trous : 3/5)
  — se  [juge stat]  départ : se
    = √(0,6·0,4·(1/100 + 1/200))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,06
  — tobs  [juge stat]  départ : t_obs
    = (0,5 − 0,65)/0,06
    = −2,5
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,5))   ← Bilatéral
    = 0,012
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (50+130)/□ | p̂ = 3/5
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

70 pièces défectueuses de la machine 1 sur n₁ = 100, et 240 de la machine 2 sur n₂ = 400. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [guided]  p̂_1
    = 70/100
    = 0,7
  — p̂₂  [juge prob]  départ : p̂_2
    = 240/400
    = 0,6
  — p̂  [juge prob]  départ : p̂
    (Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? Avec tous les individus : (k₁ + k₂)/(n₁ + n₂).)
    = (70 + 240)/(100 + 400)   ← Proportion poolée
    = □   (trous : 31/50)
  — se  [juge stat]  départ : se
    = √(0,62·0,38·(1/100 + 1/400))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0543
  — tobs  [juge stat]  départ : t_obs
    = (0,7 − 0,6)/0,0543
    = 1,84
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(1,84))   ← Bilatéral
    = 0,066
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (70+240)/□ | p̂ = 31/50
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 2

```
60 guérisons avec le traitement A sur n₁ = 400, et 20 avec le traitement B sur n₂ = 200. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [guided]  p̂_1
    = 60/400
    = 0,15
  — p̂₂  [juge prob]  départ : p̂_2
    = 20/200
    = 0,1
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (60 + 20)/(400 + 200)   ← Proportion poolée
    = □   (trous : 2/15)
  — se  [juge stat]  départ : se
    = √(0,1333·0,8667·(1/400 + 1/200))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0294
  — tobs  [juge stat]  départ : t_obs
    = (0,15 − 0,1)/0,0294
    = 1,7
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(1,7))   ← Bilatéral
    = 0,09
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (60+20)/□ | p̂ = 2/15
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

160 « oui » dans la région 1 sur n₁ = 400, et 90 dans la région 2 sur n₂ = 200. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [guided]  p̂_1
    = 160/400
    = 0,4
  — p̂₂  [juge prob]  départ : p̂_2
    = 90/200
    = 0,45
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (160 + 90)/(400 + 200)   ← Proportion poolée
    = □   (trous : 5/12)
  — se  [juge stat]  départ : se
    = √(0,4167·0,5833·(1/400 + 1/200))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0427
  — tobs  [juge stat]  départ : t_obs
    = (0,4 − 0,45)/0,0427
    = −1,17
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(1,17))   ← Bilatéral
    = 0,242
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (160+90)/□ | p̂ = 5/12
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

200 guérisons avec le traitement A sur n₁ = 400, et 240 avec le traitement B sur n₂ = 400. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [guided]  p̂_1
    = 200/400
    = 0,5
  — p̂₂  [juge prob]  départ : p̂_2
    = 240/400
    = 0,6
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (200 + 240)/(400 + 400)   ← Proportion poolée
    = □   (trous : 11/20)
  — se  [juge stat]  départ : se
    = √(0,55·0,45·(1/400 + 1/400))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0352
  — tobs  [juge stat]  départ : t_obs
    = (0,5 − 0,6)/0,0352
    = −2,84
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,84))   ← Bilatéral
    = 0,004
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (200+240)/□ | p̂ = 11/20
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 3

```
50 guérisons avec le traitement A sur n₁ = 100, et 110 avec le traitement B sur n₂ = 200. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  p̂_1
    = 50/100
    = 0,5
  — p̂₂  [juge prob]  départ : p̂_2
    = 110/200
    = 0,55
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (50 + 110)/(100 + 200)   ← Proportion poolée
    = 8/15
  — se  [juge stat]  départ : se
    = √(0,5333·0,4667·(1/100 + 1/200))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0611
  — tobs  [juge stat]  départ : t_obs
    = (0,5 − 0,55)/0,0611
    = −0,82
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(0,82))   ← Bilatéral
    = 0,412
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (50+110)/□ | p̂ = 8/15
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

260 « oui » dans la région 1 sur n₁ = 400, et 280 dans la région 2 sur n₂ = 400. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  p̂_1
    = 260/400
    = 0,65
  — p̂₂  [juge prob]  départ : p̂_2
    = 280/400
    = 0,7
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (260 + 280)/(400 + 400)   ← Proportion poolée
    = 27/40
  — se  [juge stat]  départ : se
    = √(0,675·0,325·(1/400 + 1/400))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0331
  — tobs  [juge stat]  départ : t_obs
    = (0,65 − 0,7)/0,0331
    = −1,51
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(1,51))   ← Bilatéral
    = 0,132
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (260+280)/□ | p̂ = 27/40
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

140 « oui » dans la région 1 sur n₁ = 400, et 40 dans la région 2 sur n₂ = 100. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  p̂_1
    = 140/400
    = 0,35
  — p̂₂  [juge prob]  départ : p̂_2
    = 40/100
    = 0,4
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (140 + 40)/(400 + 100)   ← Proportion poolée
    = 9/25
  — se  [juge stat]  départ : se
    = √(0,36·0,64·(1/400 + 1/100))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0537
  — tobs  [juge stat]  départ : t_obs
    = (0,35 − 0,4)/0,0537
    = −0,93
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(0,93))   ← Bilatéral
    = 0,352
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (140+40)/□ | p̂ = 9/25
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 4

```
40 guérisons avec le traitement A sur n₁ = 100, et 30 avec le traitement B sur n₂ = 100. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [free, suivre l'erreur]  p̂_1
    = 40/100
    = 0,4
  — p̂₂  [juge prob]  départ : p̂_2
    = 30/100
    = 0,3
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (40 + 30)/(100 + 100)   ← Proportion poolée
    = 7/20
  — se  [juge stat]  départ : se
    = √(0,35·0,65·(1/100 + 1/100))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0675
  — tobs  [juge stat]  départ : t_obs
    = (0,4 − 0,3)/0,0675
    = 1,48
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(1,48))   ← Bilatéral
    = 0,138
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (40+30)/□ | p̂ = 7/20
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

240 guérisons avec le traitement A sur n₁ = 400, et 260 avec le traitement B sur n₂ = 400. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [free, suivre l'erreur]  p̂_1
    = 240/400
    = 0,6
  — p̂₂  [juge prob]  départ : p̂_2
    = 260/400
    = 0,65
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (240 + 260)/(400 + 400)   ← Proportion poolée
    = 5/8
  — se  [juge stat]  départ : se
    = √(0,625·0,375·(1/400 + 1/400))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0342
  — tobs  [juge stat]  départ : t_obs
    = (0,6 − 0,65)/0,0342
    = −1,46
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(1,46))   ← Bilatéral
    = 0,144
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (240+260)/□ | p̂ = 5/8
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

40 pièces défectueuses de la machine 1 sur n₁ = 200, et 70 de la machine 2 sur n₂ = 200. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [free, suivre l'erreur]  p̂_1
    = 40/200
    = 0,2
  — p̂₂  [juge prob]  départ : p̂_2
    = 70/200
    = 0,35
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (40 + 70)/(200 + 200)   ← Proportion poolée
    = 11/40
  — se  [juge stat]  départ : se
    = √(0,275·0,725·(1/200 + 1/200))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0447
  — tobs  [juge stat]  départ : t_obs
    = (0,2 − 0,35)/0,0447
    = −3,36
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(3,36))   ← Bilatéral
    = 0
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (40+70)/□ | p̂ = 11/40
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 5

```
160 pièces défectueuses de la machine 1 sur n₁ = 400, et 60 de la machine 2 sur n₂ = 200. On teste H₀ : p₁ = p₂ contre H₁ : p₁ > p₂ au niveau 5 %.
  [free, sans aide]  p̂_1
    = 160/400
    = 0,4
  — p̂₂  [juge prob]  départ : p̂_2
    = 60/200
    = 0,3
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (160 + 60)/(400 + 200)   ← Proportion poolée
    = 11/30
  — se  [juge stat]  départ : se
    = √(0,3667·0,6333·(1/400 + 1/200))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0417
  — tobs  [juge stat]  départ : t_obs
    = (0,4 − 0,3)/0,0417
    = 2,4
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(2,4)   ← Unilatéral
    = 0,008
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

200 « oui » dans la région 1 sur n₁ = 400, et 70 dans la région 2 sur n₂ = 200. On teste H₀ : p₁ = p₂ contre H₁ : p₁ > p₂ au niveau 5 %.
  [free, sans aide]  p̂_1
    = 200/400
    = 0,5
  — p̂₂  [juge prob]  départ : p̂_2
    = 70/200
    = 0,35
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (200 + 70)/(400 + 200)   ← Proportion poolée
    = 9/20
  — se  [juge stat]  départ : se
    = √(0,45·0,55·(1/400 + 1/200))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0431
  — tobs  [juge stat]  départ : t_obs
    = (0,5 − 0,35)/0,0431
    = 3,48
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(3,48)   ← Unilatéral
    = 0
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

300 « oui » dans la région 1 sur n₁ = 400, et 260 dans la région 2 sur n₂ = 400. On teste H₀ : p₁ = p₂ contre H₁ : p₁ > p₂ au niveau 5 %.
  [free, sans aide]  p̂_1
    = 300/400
    = 0,75
  — p̂₂  [juge prob]  départ : p̂_2
    = 260/400
    = 0,65
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (300 + 260)/(400 + 400)   ← Proportion poolée
    = 7/10
  — se  [juge stat]  départ : se
    = √(0,7·0,3·(1/400 + 1/400))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0324
  — tobs  [juge stat]  départ : t_obs
    = (0,75 − 0,65)/0,0324
    = 3,09
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(3,09)   ← Unilatéral
    = 0,001
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Variantes d'examen

```
90 guérisons avec le traitement A sur n₁ = 200, et 100 avec le traitement B sur n₂ = 200. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %. Quelle erreur standard utiliser sous H₀ ?
  · 0,0999   · 0,025   · 0,7053 [p_two_sample_se]   ✔ 0,0499
  [examen mcq]
  pièges : p_two_sample_se

Vrai ou faux ?
  « Sous H₀ : p₁ = p₂, on estime la proportion commune par la moyenne de p̂₁ = 0,2 et p̂₂ = 0,4, quels que soient n₁ et n₂. » → FAUX
    contre-exemple (refute) : a = 100, b = 300
  [examen tf]
  pièges : p_two_prop_no_pool

110 guérisons avec le traitement A sur n₁ = 200, et 160 avec le traitement B sur n₂ = 400. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %. Donne la statistique t_obs (deux décimales).
  [free, sans aide, examen coef]  t_obs
    = 3,48

```

## Test χ² d'adéquation (`p-test-chi2-gof`, BA3)

_Le test χ² d'adéquation : effectifs attendus, statistique Σ(o − e)²/e, degrés de liberté k − 1 − c._

### Niveau 1

```
Un dé est lancé 60 fois. Effectifs des faces 1 à 6 : 6, 12, 13, 10, 13, 6. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %.
  [guided]  e
    (Que compare le test χ² ? Des effectifs : eᵢ = n·pᵢ.)
    = 60·□   (trous : 60·1/6)   ← Même effectif attendu pour chaque face
    = □   (trous : 10)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = □ + (12 − 10)²/10 + (13 − 10)²/10 + (10 − 10)²/10 + (13 − 10)²/10 + (6 − 10)²/10   (trous : (6 − 10)²/10 + (12 − 10)²/10 + (13 − 10)²/10 + (10 − 10)²/10 + (13 − 10)²/10 + (6 − 10)²/10)   ← Un terme par classe
    = (□ + 4 + 9 + 0 + 9 + 16)/10   (trous : (16 + 4 + 9 + 0 + 9 + 16)/10)   ← Écarts au carré
    = □   (trous : 5,4)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □ − 1   (trous : 6 − 1)   ← k classes, probabilités fixées
    = □   (trous : 5)   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 11,07)   ← Table 4, ligne r = 5, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    (Décision au niveau 5 % ? Ne pas rejeter H₀ : T = 5,4 ≤ 11,07.)
    = □   (trous : 15,086)   ← Table 4, colonne s₁ : p > 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (6 − 10)²/10 + … (une classe par terme) | T = 5,4, r = 5, s₅(5) = 11,07
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5, p_accept_h0

Un dé est lancé 90 fois. Effectifs des faces 1 à 6 : 16, 16, 14, 14, 17, 13. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %.
  [guided]  e
    (Que compare le test χ² ? Des effectifs : eᵢ = n·pᵢ.)
    = 90·□   (trous : 90·1/6)   ← Même effectif attendu pour chaque face
    = □   (trous : 15)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = □ + (16 − 15)²/15 + (14 − 15)²/15 + (14 − 15)²/15 + (17 − 15)²/15 + (13 − 15)²/15   (trous : (16 − 15)²/15 + (16 − 15)²/15 + (14 − 15)²/15 + (14 − 15)²/15 + (17 − 15)²/15 + (13 − 15)²/15)   ← Un terme par classe
    = (1 + 1 + 1 + 1 + □ + 4)/15   (trous : (1 + 1 + 1 + 1 + 4 + 4)/15)   ← Écarts au carré
    = □   (trous : 0,8)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □ − 1   (trous : 6 − 1)   ← k classes, probabilités fixées
    = □   (trous : 5)   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 11,07)   ← Table 4, ligne r = 5, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    (Décision au niveau 5 % ? Ne pas rejeter H₀ : T = 0,8 ≤ 11,07.)
    = □   (trous : 15,086)   ← Table 4, colonne s₁ : p > 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (16 − 15)²/15 + … (une classe par terme) | T = 0,8, r = 5, s₅(5) = 11,07
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0, p_reject_10_5

Un dé est lancé 60 fois. Effectifs des faces 1 à 6 : 5, 15, 6, 5, 15, 14. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %.
  [guided]  e
    (Que compare le test χ² ? Des effectifs : eᵢ = n·pᵢ.)
    = 60·□   (trous : 60·1/6)   ← Même effectif attendu pour chaque face
    = □   (trous : 10)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = □ + (15 − 10)²/10 + (6 − 10)²/10 + (5 − 10)²/10 + (15 − 10)²/10 + (14 − 10)²/10   (trous : (5 − 10)²/10 + (15 − 10)²/10 + (6 − 10)²/10 + (5 − 10)²/10 + (15 − 10)²/10 + (14 − 10)²/10)   ← Un terme par classe
    = (25 + 25 + □ + 25 + 25 + 16)/10   (trous : (25 + 25 + 16 + 25 + 25 + 16)/10)   ← Écarts au carré
    = □   (trous : 13,2)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □ − 1   (trous : 6 − 1)   ← k classes, probabilités fixées
    = □   (trous : 5)   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 11,07)   ← Table 4, ligne r = 5, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    (Décision au niveau 5 % ? Rejeter H₀ : T = 13,2 > 11,07.)
    = □   (trous : 15,086)   ← Table 4, colonne s₁ : T est entre les deux seuils, 0,01 < p < 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (5 − 10)²/10 + … (une classe par terme) | T = 13,2, r = 5, s₅(5) = 11,07
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_significant_large, p_pvalue_h0, p_reject_10_5

```

### Niveau 2

```
Un dé est lancé 60 fois. Effectifs des faces 1 à 6 : 14, 15, 5, 6, 15, 5. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %.
  [guided]  e
    ? Que compare le test χ² ? ✔ Des effectifs : eᵢ = n·pᵢ / · Des proportions : eᵢ = pᵢ
    = 60·□   (trous : 60·1/6)   ← Même effectif attendu pour chaque face
    = □   (trous : 10)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = □ + □ + (5 − 10)²/10 + (6 − 10)²/10 + (15 − 10)²/10 + (5 − 10)²/10   (trous : (14 − 10)²/10 + (15 − 10)²/10 + (5 − 10)²/10 + (6 − 10)²/10 + (15 − 10)²/10 + (5 − 10)²/10)   ← Un terme par classe
    = (16 + □ + 25 + 16 + 25 + 25)/10   (trous : (16 + 25 + 25 + 16 + 25 + 25)/10)   ← Écarts au carré
    = □   (trous : 13,2)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □ − 1   (trous : 6 − 1)   ← k classes, probabilités fixées
    = □   (trous : 5)   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 11,07)   ← Table 4, ligne r = 5, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 13,2 > 11,07 / · Ne pas rejeter H₀ : T = 13,2 ≤ 11,07
    = □   (trous : 15,086)   ← Table 4, colonne s₁ : T est entre les deux seuils, 0,01 < p < 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (14 − 10)²/10 + … (une classe par terme) | T = 13,2, r = 5, s₅(5) = 11,07
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5, p_significant_large

Un dé est lancé 120 fois. Effectifs des faces 1 à 6 : 23, 18, 17, 16, 24, 22. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %.
  [guided]  e
    ? Que compare le test χ² ? ✔ Des effectifs : eᵢ = n·pᵢ / · Des proportions : eᵢ = pᵢ
    = 120·□   (trous : 120·1/6)   ← Même effectif attendu pour chaque face
    = □   (trous : 20)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = □ + □ + (17 − 20)²/20 + (16 − 20)²/20 + (24 − 20)²/20 + (22 − 20)²/20   (trous : (23 − 20)²/20 + (18 − 20)²/20 + (17 − 20)²/20 + (16 − 20)²/20 + (24 − 20)²/20 + (22 − 20)²/20)   ← Un terme par classe
    = (9 + □ + 9 + 16 + 16 + 4)/20   (trous : (9 + 4 + 9 + 16 + 16 + 4)/20)   ← Écarts au carré
    = □   (trous : 2,9)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □ − 1   (trous : 6 − 1)   ← k classes, probabilités fixées
    = □   (trous : 5)   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 11,07)   ← Table 4, ligne r = 5, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 2,9 > 11,07 / ✔ Ne pas rejeter H₀ : T = 2,9 ≤ 11,07
    = □   (trous : 15,086)   ← Table 4, colonne s₁ : p > 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (23 − 20)²/20 + … (une classe par terme) | T = 2,9, r = 5, s₅(5) = 11,07
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_reject_10_5, p_accept_h0, p_pvalue_h0

Un dé est lancé 180 fois. Effectifs des faces 1 à 6 : 41, 19, 38, 37, 26, 19. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %.
  [guided]  e
    ? Que compare le test χ² ? ✔ Des effectifs : eᵢ = n·pᵢ / · Des proportions : eᵢ = pᵢ
    = 180·□   (trous : 180·1/6)   ← Même effectif attendu pour chaque face
    = □   (trous : 30)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = □ + □ + (38 − 30)²/30 + (37 − 30)²/30 + (26 − 30)²/30 + (19 − 30)²/30   (trous : (41 − 30)²/30 + (19 − 30)²/30 + (38 − 30)²/30 + (37 − 30)²/30 + (26 − 30)²/30 + (19 − 30)²/30)   ← Un terme par classe
    = (□ + 121 + 64 + 49 + 16 + 121)/30   (trous : (121 + 121 + 64 + 49 + 16 + 121)/30)   ← Écarts au carré
    = □   (trous : 16,4)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □ − 1   (trous : 6 − 1)   ← k classes, probabilités fixées
    = □   (trous : 5)   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 11,07)   ← Table 4, ligne r = 5, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 16,4 > 11,07 / · Ne pas rejeter H₀ : T = 16,4 ≤ 11,07
    = □   (trous : 15,086)   ← Table 4, colonne s₁ : T le dépasse aussi, p < 0,01
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (41 − 30)²/30 + … (une classe par terme) | T = 16,4, r = 5, s₅(5) = 11,07
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large, p_accept_h0

```

### Niveau 3

```
On observe les phénotypes d'un croisement sur 144 cas : AB 81, Ab 25, aB 25, ab 13. Ces effectifs suivent-ils les proportions de Mendel 9 : 3 : 3 : 1 ? Test χ² d'adéquation au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  e₁
    = 144·9/16   ← Classe « AB »
    = 81   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : AB 81, Ab 27, aB 27, ab 9.)
    = (81 − 81)²/81 + (25 − 27)²/27 + (25 − 27)²/27 + (13 − 9)²/9   ← Un terme par classe
    = 0/81 + 4/27 + 4/27 + 16/9   ← Écarts au carré
    = 2,07   ← Statistique observée
  — r  [juge prob]  départ : r
    = 4 − 1   ← k classes, probabilités fixées
    = 3   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 7,815   ← Table 4, ligne r = 3, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 2,07 > 7,815 / ✔ Ne pas rejeter H₀ : T = 2,07 ≤ 7,815
    = 11,345   ← Table 4, colonne s₁ : p > 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (81 − 81)²/81 + … (une classe par terme) | T = 2,07, r = 3, s₅(3) = 7,815
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_accept_h0, p_reject_10_5, p_pvalue_h0

On observe les jours de pannes d'une machine sur 45 cas : lundi 14, mardi 15, mercredi 3, jeudi 10, vendredi 3. Ces effectifs suivent-ils des pannes uniformes sur les 5 jours ? Test χ² d'adéquation au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  e
    = 45·1/5   ← Même effectif attendu pour chaque classe
    = 9   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = (14 − 9)²/9 + (15 − 9)²/9 + (3 − 9)²/9 + (10 − 9)²/9 + (3 − 9)²/9   ← Un terme par classe
    = (25 + 36 + 36 + 1 + 36)/9   ← Écarts au carré
    = 14,89   ← Statistique observée
  — r  [juge prob]  départ : r
    = 5 − 1   ← k classes, probabilités fixées
    = 4   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 9,488   ← Table 4, ligne r = 4, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 14,89 > 9,488 / · Ne pas rejeter H₀ : T = 14,89 ≤ 9,488
    = 13,277   ← Table 4, colonne s₁ : T le dépasse aussi, p < 0,01
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (14 − 9)²/9 + … (une classe par terme) | T = 14,89, r = 4, s₅(4) = 9,488
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0, p_significant_large

On observe les jours de pannes d'une machine sur 40 cas : lundi 2, mardi 2, mercredi 14, jeudi 12, vendredi 10. Ces effectifs suivent-ils des pannes uniformes sur les 5 jours ? Test χ² d'adéquation au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  e
    = 40·1/5   ← Même effectif attendu pour chaque classe
    = 8   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = (2 − 8)²/8 + (2 − 8)²/8 + (14 − 8)²/8 + (12 − 8)²/8 + (10 − 8)²/8   ← Un terme par classe
    = (36 + 36 + 36 + 16 + 4)/8   ← Écarts au carré
    = 16   ← Statistique observée
  — r  [juge prob]  départ : r
    = 5 − 1   ← k classes, probabilités fixées
    = 4   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 9,488   ← Table 4, ligne r = 4, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 16 > 9,488 / · Ne pas rejeter H₀ : T = 16 ≤ 9,488
    = 13,277   ← Table 4, colonne s₁ : T le dépasse aussi, p < 0,01
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (2 − 8)²/8 + … (une classe par terme) | T = 16, r = 4, s₅(4) = 9,488
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0, p_significant_large

```

### Niveau 4

```
On observe les couleurs de bonbons d'un sachet sur 20 cas : rouges 12, verts 3, jaunes 5. Ces effectifs suivent-ils la répartition annoncée (1/2, 1/4, 1/4) ? Test χ² d'adéquation au niveau 5 %.
  [free, suivre l'erreur]  e₁
    = 20·1/2   ← Classe « rouges »
    = 10   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : rouges 10, verts 5, jaunes 5.)
    = (12 − 10)²/10 + (3 − 5)²/5 + (5 − 5)²/5   ← Un terme par classe
    = 4/10 + 4/5 + 0/5   ← Écarts au carré
    = 1,2   ← Statistique observée
  — r  [juge prob]  départ : r
    = 3 − 1   ← k classes, probabilités fixées
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, ligne r = 2, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 1,2 > 5,991 / ✔ Ne pas rejeter H₀ : T = 1,2 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁ : p > 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (12 − 10)²/10 + … (une classe par terme) | T = 1,2, r = 2, s₅(2) = 5,991
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0, p_reject_10_5

On observe les groupes sanguins d'un échantillon sur 50 cas : O 22, A 18, B 8, AB 2. Ces effectifs suivent-ils la répartition (40 %, 30 %, 20 %, 10 %) ? Test χ² d'adéquation au niveau 5 %.
  [free, suivre l'erreur]  e₁
    = 50·2/5   ← Classe « O »
    = 20   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : O 20, A 15, B 10, AB 5.)
    = (22 − 20)²/20 + (18 − 15)²/15 + (8 − 10)²/10 + (2 − 5)²/5   ← Un terme par classe
    = 4/20 + 9/15 + 4/10 + 9/5   ← Écarts au carré
    = 3   ← Statistique observée
  — r  [juge prob]  départ : r
    = 4 − 1   ← k classes, probabilités fixées
    = 3   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 7,815   ← Table 4, ligne r = 3, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 3 > 7,815 / ✔ Ne pas rejeter H₀ : T = 3 ≤ 7,815
    = 11,345   ← Table 4, colonne s₁ : p > 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (22 − 20)²/20 + … (une classe par terme) | T = 3, r = 3, s₅(3) = 7,815
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_reject_10_5, p_accept_h0, p_pvalue_h0

On observe les couleurs de bonbons d'un sachet sur 24 cas : rouges 10, verts 6, jaunes 8. Ces effectifs suivent-ils la répartition annoncée (1/2, 1/4, 1/4) ? Test χ² d'adéquation au niveau 5 %.
  [free, suivre l'erreur]  e₁
    = 24·1/2   ← Classe « rouges »
    = 12   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : rouges 12, verts 6, jaunes 6.)
    = (10 − 12)²/12 + (6 − 6)²/6 + (8 − 6)²/6   ← Un terme par classe
    = 4/12 + 0/6 + 4/6   ← Écarts au carré
    = 1   ← Statistique observée
  — r  [juge prob]  départ : r
    = 3 − 1   ← k classes, probabilités fixées
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, ligne r = 2, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 1 > 5,991 / ✔ Ne pas rejeter H₀ : T = 1 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁ : p > 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (10 − 12)²/12 + … (une classe par terme) | T = 1, r = 2, s₅(2) = 5,991
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_pvalue_h0, p_accept_h0, p_reject_10_5

```

### Niveau 5

```
Nombre de pannes par jour sur 100 jours : 0 panne 28 fois, 1 panne 41 fois, 2 pannes 18 fois, 3 ou plus 13 fois. On ajuste une loi de Poisson (λ̂ = x̄ = 1,5, estimé sur ces données) ; effectifs attendus : 22,3 ; 33,5 ; 25,1 ; 19,1. La loi de Poisson convient-elle ? Test χ² au niveau 5 %.
  [free, sans aide]  T
    = (28 − 22,3)²/22,3 + (41 − 33,5)²/33,5 + (18 − 25,1)²/25,1 + (13 − 19,1)²/19,1   ← Un terme par classe
    = 32,49/22,3 + 56,25/33,5 + 50,41/25,1 + 37,21/19,1   ← Écarts au carré
    = 7,09   ← Statistique observée
  — r  [juge prob]  départ : r
    = 4 − 1 − 1   ← k classes, un paramètre estimé
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, ligne r = 2, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 7,09 > 5,991 / · Ne pas rejeter H₀ : T = 7,09 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁ : T est entre les deux seuils, 0,01 < p < 0,05
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_reject_10_5, p_pvalue_h0, p_significant_large

Nombre de pannes par jour sur 200 jours : 0 panne 57 fois, 1 panne 57 fois, 2 pannes 60 fois, 3 ou plus 26 fois. On ajuste une loi de Poisson (λ̂ = x̄ = 1,5, estimé sur ces données) ; effectifs attendus : 44,6 ; 66,9 ; 50,2 ; 38,2. La loi de Poisson convient-elle ? Test χ² au niveau 5 %.
  [free, sans aide]  T
    = (57 − 44,6)²/44,6 + (57 − 66,9)²/66,9 + (60 − 50,2)²/50,2 + (26 − 38,2)²/38,2   ← Un terme par classe
    = 153,76/44,6 + 98,01/66,9 + 96,04/50,2 + 148,84/38,2   ← Écarts au carré
    = 10,72   ← Statistique observée
  — r  [juge prob]  départ : r
    = 4 − 1 − 1   ← k classes, un paramètre estimé
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, ligne r = 2, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 10,72 > 5,991 / · Ne pas rejeter H₀ : T = 10,72 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁ : T le dépasse aussi, p < 0,01
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_significant_large, p_pvalue_h0, p_accept_h0

Nombre de pannes par jour sur 200 jours : 0 panne 36 fois, 1 panne 46 fois, 2 pannes 45 fois, 3 ou plus 73 fois. On ajuste une loi de Poisson (λ̂ = x̄ = 2, estimé sur ces données) ; effectifs attendus : 27,1 ; 54,1 ; 54,1 ; 64,7. La loi de Poisson convient-elle ? Test χ² au niveau 5 %.
  [free, sans aide]  T
    = (36 − 27,1)²/27,1 + (46 − 54,1)²/54,1 + (45 − 54,1)²/54,1 + (73 − 64,7)²/64,7   ← Un terme par classe
    = 79,21/27,1 + 65,61/54,1 + 82,81/54,1 + 68,89/64,7   ← Écarts au carré
    = 6,73   ← Statistique observée
  — r  [juge prob]  départ : r
    = 4 − 1 − 1   ← k classes, un paramètre estimé
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, ligne r = 2, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 6,73 > 5,991 / · Ne pas rejeter H₀ : T = 6,73 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁ : T est entre les deux seuils, 0,01 < p < 0,05
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_significant_large, p_pvalue_h0, p_reject_10_5

```

### Variantes d'examen

```
On observe les jours de pannes d'une machine sur 50 cas : lundi 16, mardi 4, mercredi 16, jeudi 4, vendredi 10. Ces effectifs suivent-ils des pannes uniformes sur les 5 jours ? Test χ² d'adéquation au niveau 5 %. Que vaut la statistique T ?
  ✔ 14,4   · 22,5 [p_chi2_divide_obs]   · 0,288 [p_chi2_proportions]   · 3,79
  [examen mcq]
  pièges : p_chi2_proportions, p_chi2_divide_obs

Vrai ou faux ?
  « Pour un test χ² d'adéquation, une grande valeur de T = Σ(oᵢ − eᵢ)²/eᵢ conduit à rejeter H₀. » → VRAI
  [examen tf]

Un dé est lancé 120 fois. Effectifs des faces 1 à 6 : 16, 25, 21, 18, 19, 21. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %. Calcule la statistique T (à 0,01 près).
  [free, sans aide, examen coef]  T
    = (16 − 20)²/20 + (25 − 20)²/20 + (21 − 20)²/20 + (18 − 20)²/20 + (19 − 20)²/20 + (21 − 20)²/20   ← Un terme par classe
    = (16 + 25 + 1 + 4 + 1 + 1)/20   ← Écarts au carré
    = 2,4   ← Statistique observée
  pièges : p_chi2_proportions, p_chi2_divide_obs

Un dé est lancé 60 fois. Effectifs des faces 1 à 6 : 16, 6, 4, 14, 4, 16. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %.
  [problème, examen open, 10 points]
  partie 1 (e : 2 ; Statistique T : 2,5 ; r : 2 ; Seuil à 5 % (Table 4, queue supérieure) : 1,5 ; Seuil à 1 %, pour encadrer la p-valeur : 1)
  Un dé est lancé 60 fois. Effectifs des faces 1 à 6 : 16, 6, 4, 14, 4, 16. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %.
    [free, sans aide, suivre l'erreur, examen open]  e
      = 60·1/6   ← Même effectif attendu pour chaque face
      = 10   ← Effectif attendu
    — Statistique T  [juge stat]  départ : T
      = (16 − 10)²/10 + (6 − 10)²/10 + (4 − 10)²/10 + (14 − 10)²/10 + (4 − 10)²/10 + (16 − 10)²/10   ← Un terme par classe
      = (36 + 16 + 36 + 16 + 36 + 36)/10   ← Écarts au carré
      = 17,6   ← Statistique observée
    — r  [juge prob]  départ : r
      = 6 − 1   ← k classes, probabilités fixées
      = 5   ← Degrés de liberté
    — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
      = 11,07   ← Table 4, ligne r = 5, colonne s₅
    — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
      = 15,086   ← Table 4, colonne s₁ : T le dépasse aussi, p < 0,01
  partie 2 (Interpréter : 1)
  Interpréter : quelle phrase est juste ?
    · Puisque l'on rejette H₀, l'écart est grand et important en pratique. [p_significant_large]   ✔ Les données contredisent un dé équilibré, même au niveau 1 % : p < 0,01.   · On a prouvé que le dé est truqué, avec certitude. [p_accept_h0]   · La probabilité que un dé équilibré soit vrai est inférieure à 1 %. [p_pvalue_h0]
    [examen open]
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_accept_h0, p_significant_large, p_pvalue_h0

```

## Test χ² d'indépendance (`p-test-chi2-indep`, BA3)

_Le test χ² d'indépendance d'un tableau de contingence, avec e_ij = (total de la ligne × total de la colonne)/n._

### Niveau 1

```
Personnes selon la couleur des yeux (lignes) et des cheveux (colonnes) :cheveux blondscheveux brunscheveux rouxtotalyeux clairs736254189yeux foncés622836126total1359090315Test χ² d'indépendance au niveau 5 %.
  [guided]  e₁₁
    (Sous H₀ (indépendance), que vaut l'effectif attendu eᵢⱼ ? (total de la ligne i × total de la colonne j)/n.)
    = 189·□/315   (trous : 189·135/315)   ← Marges de la case (1, 1)
    = □   (trous : 81)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 81 ; 54 ; 54 | 54 ; 36 ; 36.)
    = □ + (62 − 54)²/54 + (54 − 54)²/54 + (62 − 54)²/54 + (28 − 36)²/36 + (36 − 36)²/36   (trous : (73 − 81)²/81 + (62 − 54)²/54 + (54 − 54)²/54 + (62 − 54)²/54 + (28 − 36)²/36 + (36 − 36)²/36)   ← Une case par terme
    = □ + 64/54 + 64/54 + 64/36   (trous : 64/81 + 64/54 + 64/54 + 64/36)   ← Les cases sans écart donnent 0
    = □   (trous : 4,94)   ← Statistique observée
  — r  [juge prob]  départ : r
    = (2 − 1)(□ − 1)   (trous : (2 − 1)(3 − 1))   ← 2 lignes, 3 colonnes
    = □   (trous : 2)   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = □   (trous : 5,991)   ← Table 4, r = 2
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    (Décision au niveau 5 % ? Ne pas rejeter H₀ : T = 4,94 ≤ 5,991.)
    = □   (trous : 9,21)   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 189 · 135/□ | e₁₁ = 81, T = 4,94, r = 2
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0, p_reject_10_5

Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités2810non traités181230total202040Test χ² d'indépendance au niveau 5 %.
  [guided]  e₁₁
    (Sous H₀ (indépendance), que vaut l'effectif attendu eᵢⱼ ? (total de la ligne i × total de la colonne j)/n.)
    = 10·□/40   (trous : 10·20/40)   ← Marges de la case (1, 1)
    = □   (trous : 5)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 5 ; 5 | 15 ; 15.)
    = □ + (8 − 5)²/5 + (18 − 15)²/15 + (12 − 15)²/15   (trous : (2 − 5)²/5 + (8 − 5)²/5 + (18 − 15)²/15 + (12 − 15)²/15)   ← Une case par terme
    = □ + 9/5 + 9/15 + 9/15   (trous : 9/5 + 9/5 + 9/15 + 9/15)   ← Écarts au carré
    = □   (trous : 4,8)   ← Statistique observée
  — r  [juge prob]  départ : r
    = (□ − 1)(2 − 1)   (trous : (2 − 1)(2 − 1))   ← 2 lignes, 2 colonnes
    = □   (trous : 1)   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = □   (trous : 3,841)   ← Table 4, r = 1
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    (Décision au niveau 5 % ? Rejeter H₀ : T = 4,8 > 3,841.)
    = □   (trous : 6,635)   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 10 · 20/□ | e₁₁ = 5, T = 4,8, r = 1
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large, p_corr_causal

Personnes selon la couleur des yeux (lignes) et des cheveux (colonnes) :cheveux blondscheveux brunscheveux rouxtotalyeux clairs24103064yeux foncés24221864total483248128Test χ² d'indépendance au niveau 5 %.
  [guided]  e₁₁
    (Sous H₀ (indépendance), que vaut l'effectif attendu eᵢⱼ ? (total de la ligne i × total de la colonne j)/n.)
    = 64·□/128   (trous : 64·48/128)   ← Marges de la case (1, 1)
    = □   (trous : 24)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 24 ; 16 ; 24 | 24 ; 16 ; 24.)
    = □ + (10 − 16)²/16 + (30 − 24)²/24 + (24 − 24)²/24 + (22 − 16)²/16 + (18 − 24)²/24   (trous : (24 − 24)²/24 + (10 − 16)²/16 + (30 − 24)²/24 + (24 − 24)²/24 + (22 − 16)²/16 + (18 − 24)²/24)   ← Une case par terme
    = □ + 36/24 + 36/16 + 36/24   (trous : 36/16 + 36/24 + 36/16 + 36/24)   ← Les cases sans écart donnent 0
    = □   (trous : 7,5)   ← Statistique observée
  — r  [juge prob]  départ : r
    = (2 − 1)(□ − 1)   (trous : (2 − 1)(3 − 1))   ← 2 lignes, 3 colonnes
    = □   (trous : 2)   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = □   (trous : 5,991)   ← Table 4, r = 2
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    (Décision au niveau 5 % ? Rejeter H₀ : T = 7,5 > 5,991.)
    = □   (trous : 9,21)   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 64 · 48/□ | e₁₁ = 24, T = 7,5, r = 2
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_corr_causal, p_pvalue_h0, p_significant_large

```

### Niveau 2

```
Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités242650non traités361450total6040100Test χ² d'indépendance au niveau 5 %.
  [guided]  e₁₁
    ? Sous H₀ (indépendance), que vaut l'effectif attendu eᵢⱼ ? ✔ (total de la ligne i × total de la colonne j)/n / · n/4, la même valeur pour chaque case
    = 50·□/100   (trous : 50·60/100)   ← Marges de la case (1, 1)
    = □   (trous : 30)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 30 ; 20 | 30 ; 20.)
    = □ + (26 − 20)²/20 + (36 − 30)²/30 + (14 − 20)²/20   (trous : (24 − 30)²/30 + (26 − 20)²/20 + (36 − 30)²/30 + (14 − 20)²/20)   ← Une case par terme
    = □ + 36/20 + 36/30 + 36/20   (trous : 36/30 + 36/20 + 36/30 + 36/20)   ← Écarts au carré
    = □   (trous : 6)   ← Statistique observée
  — r  [juge prob]  départ : r
    = (□ − 1)(2 − 1)   (trous : (2 − 1)(2 − 1))   ← 2 lignes, 2 colonnes
    = □   (trous : 1)   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = □   (trous : 3,841)   ← Table 4, r = 1
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 6 > 3,841 / · Ne pas rejeter H₀ : T = 6 ≤ 3,841
    = □   (trous : 6,635)   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 50 · 60/□ | e₁₁ = 30, T = 6, r = 1
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_pvalue_h0, p_corr_causal, p_significant_large

Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités242650non traités6634100total9060150Test χ² d'indépendance au niveau 5 %.
  [guided]  e₁₁
    ? Sous H₀ (indépendance), que vaut l'effectif attendu eᵢⱼ ? ✔ (total de la ligne i × total de la colonne j)/n / · n/4, la même valeur pour chaque case
    = 50·□/150   (trous : 50·90/150)   ← Marges de la case (1, 1)
    = □   (trous : 30)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 30 ; 20 | 60 ; 40.)
    = □ + (26 − 20)²/20 + (66 − 60)²/60 + (34 − 40)²/40   (trous : (24 − 30)²/30 + (26 − 20)²/20 + (66 − 60)²/60 + (34 − 40)²/40)   ← Une case par terme
    = □ + 36/20 + 36/60 + 36/40   (trous : 36/30 + 36/20 + 36/60 + 36/40)   ← Écarts au carré
    = □   (trous : 4,5)   ← Statistique observée
  — r  [juge prob]  départ : r
    = (□ − 1)(2 − 1)   (trous : (2 − 1)(2 − 1))   ← 2 lignes, 2 colonnes
    = □   (trous : 1)   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = □   (trous : 3,841)   ← Table 4, r = 1
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 4,5 > 3,841 / · Ne pas rejeter H₀ : T = 4,5 ≤ 3,841
    = □   (trous : 6,635)   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 50 · 90/□ | e₁₁ = 30, T = 4,5, r = 1
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_corr_causal, p_pvalue_h0, p_significant_large

Personnes selon la couleur des yeux (lignes) et des cheveux (colonnes) :cheveux blondscheveux brunscheveux rouxtotalyeux clairs6665100231yeux foncés22233277total8888132308Test χ² d'indépendance au niveau 5 %.
  [guided]  e₁₁
    ? Sous H₀ (indépendance), que vaut l'effectif attendu eᵢⱼ ? ✔ (total de la ligne i × total de la colonne j)/n / · n/6, la même valeur pour chaque case
    = 231·□/308   (trous : 231·88/308)   ← Marges de la case (1, 1)
    = □   (trous : 66)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 66 ; 66 ; 99 | 22 ; 22 ; 33.)
    = □ + (65 − 66)²/66 + (100 − 99)²/99 + (22 − 22)²/22 + (23 − 22)²/22 + (32 − 33)²/33   (trous : (66 − 66)²/66 + (65 − 66)²/66 + (100 − 99)²/99 + (22 − 22)²/22 + (23 − 22)²/22 + (32 − 33)²/33)   ← Une case par terme
    = □ + 1/99 + 1/22 + 1/33   (trous : 1/66 + 1/99 + 1/22 + 1/33)   ← Les cases sans écart donnent 0
    = □   (trous : 0,1)   ← Statistique observée
  — r  [juge prob]  départ : r
    = (2 − 1)(□ − 1)   (trous : (2 − 1)(3 − 1))   ← 2 lignes, 3 colonnes
    = □   (trous : 2)   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = □   (trous : 5,991)   ← Table 4, r = 2
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 0,1 > 5,991 / ✔ Ne pas rejeter H₀ : T = 0,1 ≤ 5,991
    = □   (trous : 9,21)   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 231 · 88/□ | e₁₁ = 66, T = 0,1, r = 2
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_reject_10_5, p_accept_h0, p_pvalue_h0

```

### Niveau 3

```
Personnes selon le statut (lignes) et l'assurance complémentaire (colonnes) :assurésnon assuréstotalsalariés191736contractuels5712indépendants121224total363672Test χ² d'indépendance au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  e₁₁
    = 36·36/72   ← Marges de la case (1, 1)
    = 18   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 18 ; 18 | 6 ; 6 | 12 ; 12.)
    = (19 − 18)²/18 + (17 − 18)²/18 + (5 − 6)²/6 + (7 − 6)²/6 + (12 − 12)²/12 + (12 − 12)²/12   ← Une case par terme
    = 1/18 + 1/18 + 1/6 + 1/6   ← Les cases sans écart donnent 0
    = 0,44   ← Statistique observée
  — r  [juge prob]  départ : r
    = (3 − 1)(2 − 1)   ← 3 lignes, 2 colonnes
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, r = 2
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 0,44 > 5,991 / ✔ Ne pas rejeter H₀ : T = 0,44 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 36 · 36/□ | e₁₁ = 18, T = 0,44, r = 2
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_reject_10_5, p_accept_h0, p_pvalue_h0

Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités242044non traités6468132total8888176Test χ² d'indépendance au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  e₁₁
    = 44·88/176   ← Marges de la case (1, 1)
    = 22   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 22 ; 22 | 66 ; 66.)
    = (24 − 22)²/22 + (20 − 22)²/22 + (64 − 66)²/66 + (68 − 66)²/66   ← Une case par terme
    = 4/22 + 4/22 + 4/66 + 4/66   ← Écarts au carré
    = 0,48   ← Statistique observée
  — r  [juge prob]  départ : r
    = (2 − 1)(2 − 1)   ← 2 lignes, 2 colonnes
    = 1   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 3,841   ← Table 4, r = 1
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 0,48 > 3,841 / ✔ Ne pas rejeter H₀ : T = 0,48 ≤ 3,841
    = 6,635   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 44 · 88/□ | e₁₁ = 22, T = 0,48, r = 1
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_reject_10_5, p_accept_h0, p_pvalue_h0

Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités191332non traités212748total404080Test χ² d'indépendance au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  e₁₁
    = 32·40/80   ← Marges de la case (1, 1)
    = 16   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 16 ; 16 | 24 ; 24.)
    = (19 − 16)²/16 + (13 − 16)²/16 + (21 − 24)²/24 + (27 − 24)²/24   ← Une case par terme
    = 9/16 + 9/16 + 9/24 + 9/24   ← Écarts au carré
    = 1,88   ← Statistique observée
  — r  [juge prob]  départ : r
    = (2 − 1)(2 − 1)   ← 2 lignes, 2 colonnes
    = 1   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 3,841   ← Table 4, r = 1
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 1,88 > 3,841 / ✔ Ne pas rejeter H₀ : T = 1,88 ≤ 3,841
    = 6,635   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 32 · 40/□ | e₁₁ = 16, T = 1,88, r = 1
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_accept_h0, p_reject_10_5, p_pvalue_h0

```

### Niveau 4

```
Trajets selon le moyen de transport (lignes) et l'heure (colonnes) :matinmidisoirtotalbus11161542vélo363654126voiture373257126total8484126294Test χ² d'indépendance au niveau 5 %.
  [free, suivre l'erreur]  e₁₁
    = 42·84/294   ← Marges de la case (1, 1)
    = 12   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 12 ; 12 ; 18 | 36 ; 36 ; 54 | 36 ; 36 ; 54.)
    = (11 − 12)²/12 + (16 − 12)²/12 + (15 − 18)²/18 + (36 − 36)²/36 + (36 − 36)²/36 + (54 − 54)²/54 + (37 − 36)²/36 + (32 − 36)²/36 + (57 − 54)²/54   ← Une case par terme
    = 1/12 + 16/12 + 9/18 + 1/36 + 16/36 + 9/54   ← Les cases sans écart donnent 0
    = 2,56   ← Statistique observée
  — r  [juge prob]  départ : r
    = (3 − 1)(3 − 1)   ← 3 lignes, 3 colonnes
    = 4   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 9,488   ← Table 4, r = 4
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 2,56 > 9,488 / ✔ Ne pas rejeter H₀ : T = 2,56 ≤ 9,488
    = 13,277   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 42 · 84/□ | e₁₁ = 12, T = 2,56, r = 4
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5, p_accept_h0

Personnes selon le statut (lignes) et l'assurance complémentaire (colonnes) :assurésnon assuréstotalsalariés17724contractuels81624indépendants5712total303060Test χ² d'indépendance au niveau 5 %.
  [free, suivre l'erreur]  e₁₁
    = 24·30/60   ← Marges de la case (1, 1)
    = 12   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 12 ; 12 | 12 ; 12 | 6 ; 6.)
    = (17 − 12)²/12 + (7 − 12)²/12 + (8 − 12)²/12 + (16 − 12)²/12 + (5 − 6)²/6 + (7 − 6)²/6   ← Une case par terme
    = 25/12 + 25/12 + 16/12 + 16/12 + 1/6 + 1/6   ← Écarts au carré
    = 7,17   ← Statistique observée
  — r  [juge prob]  départ : r
    = (3 − 1)(2 − 1)   ← 3 lignes, 2 colonnes
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, r = 2
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 7,17 > 5,991 / · Ne pas rejeter H₀ : T = 7,17 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 24 · 30/□ | e₁₁ = 12, T = 7,17, r = 2
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_corr_causal, p_pvalue_h0, p_significant_large

Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités22628non traités193756total216384Test χ² d'indépendance au niveau 5 %.
  [free, suivre l'erreur]  e₁₁
    = 28·21/84   ← Marges de la case (1, 1)
    = 7   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 7 ; 21 | 14 ; 42.)
    = (2 − 7)²/7 + (26 − 21)²/21 + (19 − 14)²/14 + (37 − 42)²/42   ← Une case par terme
    = 25/7 + 25/21 + 25/14 + 25/42   ← Écarts au carré
    = 7,14   ← Statistique observée
  — r  [juge prob]  départ : r
    = (2 − 1)(2 − 1)   ← 2 lignes, 2 colonnes
    = 1   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 3,841   ← Table 4, r = 1
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 7,14 > 3,841 / · Ne pas rejeter H₀ : T = 7,14 ≤ 3,841
    = 6,635   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 28 · 21/□ | e₁₁ = 7, T = 7,14, r = 1
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_significant_large, p_pvalue_h0, p_corr_causal

```

### Niveau 5

```
Personnes selon la couleur des yeux (lignes) et des cheveux (colonnes) :cheveux blondscheveux brunscheveux rouxtotalyeux clairs3151836yeux foncés332154108total363672144Test χ² d'indépendance au niveau 5 %.
  [free, sans aide]  e₁₁
    = 36·36/144   ← Marges de la case (1, 1)
    = 9   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 9 ; 9 ; 18 | 27 ; 27 ; 54.)
    = (3 − 9)²/9 + (15 − 9)²/9 + (18 − 18)²/18 + (33 − 27)²/27 + (21 − 27)²/27 + (54 − 54)²/54   ← Une case par terme
    = 36/9 + 36/9 + 36/27 + 36/27   ← Les cases sans écart donnent 0
    = 10,67   ← Statistique observée
  — r  [juge prob]  départ : r
    = (2 − 1)(3 − 1)   ← 2 lignes, 3 colonnes
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, r = 2
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 10,67 > 5,991 / · Ne pas rejeter H₀ : T = 10,67 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_significant_large, p_corr_causal, p_pvalue_h0

Trajets selon le moyen de transport (lignes) et l'heure (colonnes) :matinmidisoirtotalbus10142448vélo661224voiture20163672total363672144Test χ² d'indépendance au niveau 5 %.
  [free, sans aide]  e₁₁
    = 48·36/144   ← Marges de la case (1, 1)
    = 12   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 12 ; 12 ; 24 | 6 ; 6 ; 12 | 18 ; 18 ; 36.)
    = (10 − 12)²/12 + (14 − 12)²/12 + (24 − 24)²/24 + (6 − 6)²/6 + (6 − 6)²/6 + (12 − 12)²/12 + (20 − 18)²/18 + (16 − 18)²/18 + (36 − 36)²/36   ← Une case par terme
    = 4/12 + 4/12 + 4/18 + 4/18   ← Les cases sans écart donnent 0
    = 1,11   ← Statistique observée
  — r  [juge prob]  départ : r
    = (3 − 1)(3 − 1)   ← 3 lignes, 3 colonnes
    = 4   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 9,488   ← Table 4, r = 4
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 1,11 > 9,488 / ✔ Ne pas rejeter H₀ : T = 1,11 ≤ 9,488
    = 13,277   ← Table 4, colonne s₁
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_pvalue_h0, p_accept_h0, p_reject_10_5

Personnes selon le statut (lignes) et l'assurance complémentaire (colonnes) :assurésnon assuréstotalsalariés602080contractuels7644120indépendants74680total21070280Test χ² d'indépendance au niveau 5 %.
  [free, sans aide]  e₁₁
    = 80·210/280   ← Marges de la case (1, 1)
    = 60   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 60 ; 20 | 90 ; 30 | 60 ; 20.)
    = (60 − 60)²/60 + (20 − 20)²/20 + (76 − 90)²/90 + (44 − 30)²/30 + (74 − 60)²/60 + (6 − 20)²/20   ← Une case par terme
    = 196/90 + 196/30 + 196/60 + 196/20   ← Les cases sans écart donnent 0
    = 21,78   ← Statistique observée
  — r  [juge prob]  départ : r
    = (3 − 1)(2 − 1)   ← 3 lignes, 2 colonnes
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, r = 2
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 21,78 > 5,991 / · Ne pas rejeter H₀ : T = 21,78 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_pvalue_h0, p_corr_causal, p_significant_large

```

### Variantes d'examen

```
Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités311748non traités41748total722496Test χ² d'indépendance au niveau 5 %. Combien de degrés de liberté a la loi de T sous H₀ ?
  ✔ 1   · 3 [p_chi2_df_indep]   · 95   · 4
  [examen mcq]
  pièges : p_chi2_df_indep

Vrai ou faux ?
  « Sous l'hypothèse d'indépendance, l'effectif attendu de la case (i, j) vaut (total de la ligne i × total de la colonne j)/n. » → VRAI
  [examen tf]

Personnes selon le statut (lignes) et l'assurance complémentaire (colonnes) :assurésnon assuréstotalsalariés175370contractuels4956105indépendants4659105total112168280Test χ² d'indépendance au niveau 5 %. Calcule la statistique T (à 0,01 près).
  [free, sans aide, examen coef]  T
    (Effectifs attendus : 28 ; 42 | 42 ; 63 | 42 ; 63.)
    = (17 − 28)²/28 + (53 − 42)²/42 + (49 − 42)²/42 + (56 − 63)²/63 + (46 − 42)²/42 + (59 − 63)²/63   ← Une case par terme
    = 121/28 + 121/42 + 49/42 + 49/63 + 16/42 + 16/63   ← Écarts au carré
    = 9,78   ← Statistique observée
  pièges : p_chi2_divide_obs

Personnes selon le statut (lignes) et l'assurance complémentaire (colonnes) :assurésnon assuréstotalsalariés244872contractuels17724indépendants311748total7272144Test χ² d'indépendance au niveau 5 %.
  [problème, examen open, 10 points]
  partie 1 (e₁₁ : 2 ; Statistique T : 2,5 ; r : 2 ; Seuil à 5 % (Table 4) : 1,5 ; Seuil à 1 %, pour encadrer la p-valeur : 1)
  Personnes selon le statut (lignes) et l'assurance complémentaire (colonnes) :assurésnon assuréstotalsalariés244872contractuels17724indépendants311748total7272144Test χ² d'indépendance au niveau 5 %.
    [free, sans aide, suivre l'erreur, examen open]  e₁₁
      = 72·72/144   ← Marges de la case (1, 1)
      = 36   ← Effectif attendu
    — Statistique T  [juge stat]  départ : T
      (Effectifs attendus : 36 ; 36 | 12 ; 12 | 24 ; 24.)
      = (24 − 36)²/36 + (48 − 36)²/36 + (17 − 12)²/12 + (7 − 12)²/12 + (31 − 24)²/24 + (17 − 24)²/24   ← Une case par terme
      = 144/36 + 144/36 + 25/12 + 25/12 + 49/24 + 49/24   ← Écarts au carré
      = 16,25   ← Statistique observée
    — r  [juge prob]  départ : r
      = (3 − 1)(2 − 1)   ← 3 lignes, 2 colonnes
      = 2   ← Degrés de liberté
    — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
      = 5,991   ← Table 4, r = 2
    — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
      = 9,21   ← Table 4, colonne s₁
  partie 2 (Interpréter : 1)
  Interpréter : quelle phrase est juste ?
    ✔ Les données contredisent l'indépendance du statut et de l'assurance au niveau 1 % : le statut et l'assurance sont liés.   · Être salarié fait prendre une assurance : la cause est établie. [p_corr_causal]   · La probabilité que les variables soient indépendantes est inférieure à 5 %. [p_pvalue_h0]   · Le lien est fort et important en pratique, puisque le test rejette. [p_significant_large]
    [examen open]
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_significant_large, p_pvalue_h0, p_corr_causal

```

## χ² sur une variance : test et IC (`p-test-chi2-var`, BA4)

_Tester une variance et construire son intervalle de confiance avec (n − 1)S²/σ₀² ~ χ²(n − 1)._

### Niveau 1

```
Diamètre de pièces usinées (données normales, moyenne inconnue) : n = 11 mesures, variance empirique s² = 13. On teste H₀ : σ² = 8 contre H₁ : σ² > 8 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(10) a pour quantiles d'ordre 0,025 et 0,975 les nombres 3,247 et 20,483 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [guided]  T
    = (11 − 1)·□   (trous : (11 − 1)·13/8)   ← Pivot (n − 1)S²/σ₀²
    = □   (trous : 16,25)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □   (trous : 10)   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 18,307)   ← Table 4, r = 10
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    (Décision au niveau 5 % ? Ne pas rejeter H₀ : T = 16,25 ≤ 18,307.)
    = 10·13/□   (trous : 10·13/20,483)   ← (n − 1)s² divisé par le grand quantile
    = □   (trous : 6,35)   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 10·13/□   (trous : 10·13/3,247)   ← (n − 1)s² divisé par le petit quantile
    = □   (trous : 40,04)   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 10 · 13/□ | T = 16,25 ; IC = [6,35 ; 40,04]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_accept_h0, p_ci_prob, p_pvalue_h0

Temps de réaction de conducteurs (données normales, moyenne inconnue) : n = 11 mesures, variance empirique s² = 8. On teste H₀ : σ² = 4 contre H₁ : σ² > 4 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(10) a pour quantiles d'ordre 0,025 et 0,975 les nombres 3,247 et 20,483 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [guided]  T
    = (11 − 1)·□   (trous : (11 − 1)·8/4)   ← Pivot (n − 1)S²/σ₀²
    = □   (trous : 20)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □   (trous : 10)   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 18,307)   ← Table 4, r = 10
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    (Décision au niveau 5 % ? Rejeter H₀ : T = 20 > 18,307.)
    = 10·8/□   (trous : 10·8/20,483)   ← (n − 1)s² divisé par le grand quantile
    = □   (trous : 3,91)   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 10·8/□   (trous : 10·8/3,247)   ← (n − 1)s² divisé par le petit quantile
    = □   (trous : 24,64)   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 10 · 8/□ | T = 20 ; IC = [3,91 ; 24,64]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_pvalue_h0, p_ci_data, p_ci_prob

Masse de comprimés (données normales, moyenne inconnue) : n = 6 mesures, variance empirique s² = 1. On teste H₀ : σ² = 2 contre H₁ : σ² > 2 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(5) a pour quantiles d'ordre 0,025 et 0,975 les nombres 0,831 et 12,833 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [guided]  T
    = (6 − 1)·□   (trous : (6 − 1)·1/2)   ← Pivot (n − 1)S²/σ₀²
    = □   (trous : 2,5)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □   (trous : 5)   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 11,07)   ← Table 4, r = 5
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    (Décision au niveau 5 % ? Ne pas rejeter H₀ : T = 2,5 ≤ 11,07.)
    = 5·1/□   (trous : 5·1/12,833)   ← (n − 1)s² divisé par le grand quantile
    = □   (trous : 0,39)   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 5·1/□   (trous : 5·1/0,831)   ← (n − 1)s² divisé par le petit quantile
    = □   (trous : 6,02)   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 5 · 1/□ | T = 2,5 ; IC = [0,39 ; 6,02]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_accept_h0, p_ci_prob, p_pvalue_h0

```

### Niveau 2

```
Épaisseur de plaques de verre (données normales, moyenne inconnue) : n = 6 mesures, variance empirique s² = 3. On teste H₀ : σ² = 5 contre H₁ : σ² > 5 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(5) a pour quantiles d'ordre 0,025 et 0,975 les nombres 0,831 et 12,833 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [guided]  T
    = (6 − 1)·□   (trous : (6 − 1)·3/5)   ← Pivot (n − 1)S²/σ₀²
    = □   (trous : 3)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □   (trous : 5)   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 11,07)   ← Table 4, r = 5
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 3 > 11,07 / ✔ Ne pas rejeter H₀ : T = 3 ≤ 11,07
    = 5·3/□   (trous : 5·3/12,833)   ← (n − 1)s² divisé par le grand quantile
    = □   (trous : 1,17)   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 5·3/□   (trous : 5·3/0,831)   ← (n − 1)s² divisé par le petit quantile
    = □   (trous : 18,05)   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 5 · 3/□ | T = 3 ; IC = [1,17 ; 18,05]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_ci_prob, p_pvalue_h0, p_accept_h0

Diamètre de pièces usinées (données normales, moyenne inconnue) : n = 21 mesures, variance empirique s² = 11. On teste H₀ : σ² = 8 contre H₁ : σ² > 8 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(20) a pour quantiles d'ordre 0,025 et 0,975 les nombres 9,591 et 34,17 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [guided]  T
    = (21 − 1)·□   (trous : (21 − 1)·11/8)   ← Pivot (n − 1)S²/σ₀²
    = □   (trous : 27,5)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □   (trous : 20)   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 31,41)   ← Table 4, r = 20
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 27,5 > 31,41 / ✔ Ne pas rejeter H₀ : T = 27,5 ≤ 31,41
    = 20·11/□   (trous : 20·11/34,17)   ← (n − 1)s² divisé par le grand quantile
    = □   (trous : 6,44)   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 20·11/□   (trous : 20·11/9,591)   ← (n − 1)s² divisé par le petit quantile
    = □   (trous : 22,94)   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 20 · 11/□ | T = 27,5 ; IC = [6,44 ; 22,94]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_ci_prob, p_accept_h0, p_pvalue_h0

Épaisseur de plaques de verre (données normales, moyenne inconnue) : n = 6 mesures, variance empirique s² = 38. On teste H₀ : σ² = 20 contre H₁ : σ² > 20 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(5) a pour quantiles d'ordre 0,025 et 0,975 les nombres 0,831 et 12,833 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [guided]  T
    = (6 − 1)·□   (trous : (6 − 1)·38/20)   ← Pivot (n − 1)S²/σ₀²
    = □   (trous : 9,5)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □   (trous : 5)   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 11,07)   ← Table 4, r = 5
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 9,5 > 11,07 / ✔ Ne pas rejeter H₀ : T = 9,5 ≤ 11,07
    = 5·38/□   (trous : 5·38/12,833)   ← (n − 1)s² divisé par le grand quantile
    = □   (trous : 14,81)   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 5·38/□   (trous : 5·38/0,831)   ← (n − 1)s² divisé par le petit quantile
    = □   (trous : 228,64)   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 5 · 38/□ | T = 9,5 ; IC = [14,81 ; 228,64]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_ci_prob, p_pvalue_h0, p_accept_h0

```

### Niveau 3

```
Épaisseur de plaques de verre (données normales, moyenne inconnue) : n = 11 mesures, variance empirique s² = 8. On teste H₀ : σ² = 10 contre H₁ : σ² > 10 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(10) a pour quantiles d'ordre 0,025 et 0,975 les nombres 3,247 et 20,483 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [tap, suivre l'erreur, menu menu]  T
    = (11 − 1)·8/10   ← Pivot (n − 1)S²/σ₀²
    = 8   ← Statistique observée
  — r  [juge prob]  départ : r
    = 10   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 18,307   ← Table 4, r = 10
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 8 > 18,307 / ✔ Ne pas rejeter H₀ : T = 8 ≤ 18,307
    = 10·8/20,483   ← (n − 1)s² divisé par le grand quantile
    = 3,91   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 10·8/3,247   ← (n − 1)s² divisé par le petit quantile
    = 24,64   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 10 · 8/□ | T = 8 ; IC = [3,91 ; 24,64]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_pvalue_h0, p_ci_prob, p_accept_h0

Masse de comprimés (données normales, moyenne inconnue) : n = 16 mesures, variance empirique s² = 14. On teste H₀ : σ² = 10 contre H₁ : σ² > 10 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(15) a pour quantiles d'ordre 0,025 et 0,975 les nombres 6,262 et 27,488 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [tap, suivre l'erreur, menu menu]  T
    = (16 − 1)·14/10   ← Pivot (n − 1)S²/σ₀²
    = 21   ← Statistique observée
  — r  [juge prob]  départ : r
    = 15   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 24,996   ← Table 4, r = 15
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 21 > 24,996 / ✔ Ne pas rejeter H₀ : T = 21 ≤ 24,996
    = 15·14/27,488   ← (n − 1)s² divisé par le grand quantile
    = 7,64   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 15·14/6,262   ← (n − 1)s² divisé par le petit quantile
    = 33,54   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 15 · 14/□ | T = 21 ; IC = [7,64 ; 33,54]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0, p_ci_prob

Diamètre de pièces usinées (données normales, moyenne inconnue) : n = 6 mesures, variance empirique s² = 13. On teste H₀ : σ² = 10 contre H₁ : σ² > 10 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(5) a pour quantiles d'ordre 0,025 et 0,975 les nombres 0,831 et 12,833 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [tap, suivre l'erreur, menu menu]  T
    = (6 − 1)·13/10   ← Pivot (n − 1)S²/σ₀²
    = 6,5   ← Statistique observée
  — r  [juge prob]  départ : r
    = 5   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 11,07   ← Table 4, r = 5
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 6,5 > 11,07 / ✔ Ne pas rejeter H₀ : T = 6,5 ≤ 11,07
    = 5·13/12,833   ← (n − 1)s² divisé par le grand quantile
    = 5,07   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 5·13/0,831   ← (n − 1)s² divisé par le petit quantile
    = 78,22   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 5 · 13/□ | T = 6,5 ; IC = [5,07 ; 78,22]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_pvalue_h0, p_accept_h0, p_ci_prob

```

### Niveau 4

```
Diamètre de pièces usinées (données normales, moyenne inconnue) : n = 11 mesures, variance empirique s² = 8. On teste H₀ : σ² = 4 contre H₁ : σ² > 4 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(10) a pour quantiles d'ordre 0,025 et 0,975 les nombres 3,247 et 20,483 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [free, suivre l'erreur]  T
    = (11 − 1)·8/4   ← Pivot (n − 1)S²/σ₀²
    = 20   ← Statistique observée
  — r  [juge prob]  départ : r
    = 10   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 18,307   ← Table 4, r = 10
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 20 > 18,307 / · Ne pas rejeter H₀ : T = 20 ≤ 18,307
    = 10·8/20,483   ← (n − 1)s² divisé par le grand quantile
    = 3,91   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 10·8/3,247   ← (n − 1)s² divisé par le petit quantile
    = 24,64   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 10 · 8/□ | T = 20 ; IC = [3,91 ; 24,64]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_ci_prob, p_ci_data, p_pvalue_h0

Diamètre de pièces usinées (données normales, moyenne inconnue) : n = 6 mesures, variance empirique s² = 3. On teste H₀ : σ² = 4 contre H₁ : σ² > 4 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(5) a pour quantiles d'ordre 0,025 et 0,975 les nombres 0,831 et 12,833 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [free, suivre l'erreur]  T
    = (6 − 1)·3/4   ← Pivot (n − 1)S²/σ₀²
    = 3,75   ← Statistique observée
  — r  [juge prob]  départ : r
    = 5   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 11,07   ← Table 4, r = 5
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 3,75 > 11,07 / ✔ Ne pas rejeter H₀ : T = 3,75 ≤ 11,07
    = 5·3/12,833   ← (n − 1)s² divisé par le grand quantile
    = 1,17   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 5·3/0,831   ← (n − 1)s² divisé par le petit quantile
    = 18,05   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 5 · 3/□ | T = 3,75 ; IC = [1,17 ; 18,05]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_accept_h0, p_ci_prob, p_pvalue_h0

Épaisseur de plaques de verre (données normales, moyenne inconnue) : n = 16 mesures, variance empirique s² = 4. On teste H₀ : σ² = 8 contre H₁ : σ² > 8 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(15) a pour quantiles d'ordre 0,025 et 0,975 les nombres 6,262 et 27,488 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [free, suivre l'erreur]  T
    = (16 − 1)·4/8   ← Pivot (n − 1)S²/σ₀²
    = 7,5   ← Statistique observée
  — r  [juge prob]  départ : r
    = 15   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 24,996   ← Table 4, r = 15
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 7,5 > 24,996 / ✔ Ne pas rejeter H₀ : T = 7,5 ≤ 24,996
    = 15·4/27,488   ← (n − 1)s² divisé par le grand quantile
    = 2,18   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 15·4/6,262   ← (n − 1)s² divisé par le petit quantile
    = 9,58   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 15 · 4/□ | T = 7,5 ; IC = [2,18 ; 9,58]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_pvalue_h0, p_accept_h0, p_ci_prob

```

### Niveau 5

```
Temps de réaction de conducteurs (données normales, moyenne inconnue) : n = 21 mesures, variance empirique s² = 3. On teste H₀ : σ² = 5 contre H₁ : σ² > 5 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(20) a pour quantiles d'ordre 0,025 et 0,975 les nombres 9,591 et 34,17 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [free, sans aide]  T
    = (21 − 1)·3/5   ← Pivot (n − 1)S²/σ₀²
    = 12   ← Statistique observée
  — r  [juge prob]  départ : r
    = 20   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 31,41   ← Table 4, r = 20
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 12 > 31,41 / ✔ Ne pas rejeter H₀ : T = 12 ≤ 31,41
    = 20·3/34,17   ← (n − 1)s² divisé par le grand quantile
    = 1,76   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 20·3/9,591   ← (n − 1)s² divisé par le petit quantile
    = 6,26   ← Borne supérieure
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_ci_prob, p_accept_h0, p_pvalue_h0

Épaisseur de plaques de verre (données normales, moyenne inconnue) : n = 11 mesures, variance empirique s² = 5. On teste H₀ : σ² = 8 contre H₁ : σ² > 8 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(10) a pour quantiles d'ordre 0,025 et 0,975 les nombres 3,247 et 20,483 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [free, sans aide]  T
    = (11 − 1)·5/8   ← Pivot (n − 1)S²/σ₀²
    = 6,25   ← Statistique observée
  — r  [juge prob]  départ : r
    = 10   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 18,307   ← Table 4, r = 10
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 6,25 > 18,307 / ✔ Ne pas rejeter H₀ : T = 6,25 ≤ 18,307
    = 10·5/20,483   ← (n − 1)s² divisé par le grand quantile
    = 2,44   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 10·5/3,247   ← (n − 1)s² divisé par le petit quantile
    = 15,4   ← Borne supérieure
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_ci_prob, p_pvalue_h0, p_accept_h0

Temps de réaction de conducteurs (données normales, moyenne inconnue) : n = 11 mesures, variance empirique s² = 6. On teste H₀ : σ² = 10 contre H₁ : σ² > 10 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(10) a pour quantiles d'ordre 0,025 et 0,975 les nombres 3,247 et 20,483 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [free, sans aide]  T
    = (11 − 1)·6/10   ← Pivot (n − 1)S²/σ₀²
    = 6   ← Statistique observée
  — r  [juge prob]  départ : r
    = 10   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 18,307   ← Table 4, r = 10
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 6 > 18,307 / ✔ Ne pas rejeter H₀ : T = 6 ≤ 18,307
    = 10·6/20,483   ← (n − 1)s² divisé par le grand quantile
    = 2,93   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 10·6/3,247   ← (n − 1)s² divisé par le petit quantile
    = 18,48   ← Borne supérieure
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0, p_ci_prob

```

### Variantes d'examen

```
Données normales, n = 6, s² = 6. Pour tester H₀ : σ² = 5, que vaut la statistique T ?
  ✔ 6   · 1,2   · 4,17 [p_chi2_var_inverted]   · 7,2 [p_chi2_var_n]
  [examen mcq]
  pièges : p_chi2_var_n, p_chi2_var_inverted

Vrai ou faux ?
  « La borne supérieure de l'IC à 95 % pour σ² est (n − 1)s² divisé par le petit quantile (d'ordre 0,025) du χ²(n − 1). » → VRAI
  [examen tf]

```

## Interpréter une p-valeur ou un IC (`p-interpret`, BA3)

_Lire correctement une p-valeur et un intervalle de confiance, et éviter les contresens classiques._

### Niveau 1

```
IC à 95 % pour la proportion p de « oui » à une votation : [0,44 ; 0,5]. Un test d'une hypothèse H₀ sur p, fait sur d'autres données, donne p_obs = 0,07. Cette phrase est-elle juste ou un contresens ? « Si H₀ était vraie, on observerait un écart au moins aussi grand avec une probabilité de 0,07. »
  ✔ Juste   · Contresens

IC à 95 % pour la teneur moyenne μ en alcool d'un vin (en %) : [11,2 ; 11,8]. Un test d'une hypothèse H₀ sur μ, fait sur d'autres données, donne p_obs = 0,2. Cette phrase est-elle juste ou un contresens ? « Il y a 95 % de chances que μ soit dans [11,2 ; 11,8]. »
  · Juste [p_ci_prob]   ✔ Contresens
  pièges : p_ci_prob

IC à 95 % pour la teneur moyenne μ en alcool d'un vin (en %) : [12,1 ; 12,9]. Un test d'une hypothèse H₀ sur μ, fait sur d'autres données, donne p_obs = 0,02. Cette phrase est-elle juste ou un contresens ? « Si p_obs avait été 0,3, on aurait prouvé que H₀ est vraie. »
  · Juste [p_accept_h0]   ✔ Contresens
  pièges : p_accept_h0

```

### Niveau 2

```
IC à 95 % pour la proportion p de Suisses qui partent en randonnée le week-end : [0,25 ; 0,45]. Un test d'une hypothèse H₀ sur p, fait sur d'autres données, donne p_obs = 0,07. Quelle phrase est juste ?
  · Deux études indépendantes donnent chacune un IC à 95 % : leur intersection est un IC à 95 %. [p_ci_intersection]   · Il y a 95 % de chances que p soit dans [0,25 ; 0,45]. [p_ci_prob]   · La probabilité que H₀ soit vraie est 0,07. [p_pvalue_h0]   ✔ 0,15 est hors de l'IC : le test bilatéral à 5 % rejette H₀ : p = 0,15.
  pièges : p_pvalue_h0, p_ci_intersection, p_ci_prob

IC à 95 % pour la teneur moyenne μ en alcool d'un vin (en %) : [11,2 ; 11,8]. Un test d'une hypothèse H₀ sur μ, fait sur d'autres données, donne p_obs = 0,003. Quelle phrase est juste ?
  ✔ 11,65 est dans l'IC : le test bilatéral à 5 % ne rejette pas H₀ : μ = 11,65.   · La probabilité que H₀ soit vraie est 0,003. [p_pvalue_h0]   · Le résultat est significatif, donc l'effet est grand et important en pratique. [p_significant_large]   · 95 % des valeurs observées dans l'échantillon sont dans [11,2 ; 11,8]. [p_ci_data]
  pièges : p_ci_data, p_pvalue_h0, p_significant_large

IC à 95 % pour la proportion p de Suisses qui partent en randonnée le week-end : [0,25 ; 0,45]. Un test d'une hypothèse H₀ sur p, fait sur d'autres données, donne p_obs = 0,08. Quelle phrase est juste ?
  · L'estimation p̂ est dans [0,25 ; 0,45] avec probabilité 0,95. [p_ci_xbar]   ✔ 0,15 est hors de l'IC : le test bilatéral à 5 % rejette H₀ : p = 0,15.   · Deux études indépendantes donnent chacune un IC à 95 % : leur intersection est un IC à 95 %. [p_ci_intersection]   · Sur 20 tests à 5 % faits sur les mêmes données, un seul rejette H₀ : l'effet trouvé est démontré. [p_multiple_tests]
  pièges : p_ci_xbar, p_multiple_tests, p_ci_intersection

```

### Niveau 3

```
IC à 95 % pour la teneur moyenne μ en alcool d'un vin (en %) : [11,2 ; 11,8]. Un test d'une hypothèse H₀ sur μ, fait sur d'autres données, donne p_obs = 0,08. Quelle affirmation est fausse ?
  ✔ Il y a 95 % de chances que μ soit dans [11,2 ; 11,8].   · Si H₀ était vraie, on observerait un écart au moins aussi grand avec une probabilité de 0,08.   · Si on refaisait l'étude un grand nombre de fois, environ 95 % des IC construits de cette façon contiendraient μ.   · 11,5 est dans l'IC : le test bilatéral à 5 % ne rejette pas H₀ : μ = 11,5.
  pièges : p_ci_prob

IC à 95 % pour la baisse moyenne δ de tension sous un médicament (en mmHg) : [2 ; 8]. Un test d'une hypothèse H₀ sur δ, fait sur d'autres données, donne p_obs = 0,02. Quelle affirmation est fausse ?
  · Si H₀ était vraie, on observerait un écart au moins aussi grand avec une probabilité de 0,02.   · Avec p_obs = 0,02, on rejette H₀ au niveau 5 %, donc aussi au niveau 10 %.   ✔ Si p_obs avait été 0,3, on aurait prouvé que H₀ est vraie.   · 0,5 est hors de l'IC : le test bilatéral à 5 % rejette H₀ : δ = 0,5.
  pièges : p_accept_h0

IC à 95 % pour la consommation moyenne μ d'un compteur électrique (en kWh) : [92 ; 99]. Un test d'une hypothèse H₀ sur μ, fait sur d'autres données, donne p_obs = 0,45. Quelle affirmation est fausse ?
  · Avec p_obs = 0,45, on ne rejette pas H₀ au niveau 5 % : les données sont compatibles avec H₀.   · 88,5 est hors de l'IC : le test bilatéral à 5 % rejette H₀ : μ = 88,5.   · 93,75 est dans l'IC : le test bilatéral à 5 % ne rejette pas H₀ : μ = 93,75.   ✔ Il y a 95 % de chances que μ soit dans [92 ; 99].
  pièges : p_ci_prob

```

### Niveau 4

```
IC à 95 % pour la proportion p de Suisses qui partent en randonnée le week-end : [0,2 ; 0,6]. Un test d'une hypothèse H₀ sur p, fait sur d'autres données, donne p_obs = 0,003. Quelle phrase est juste ?
  · L'estimation p̂ est dans [0,2 ; 0,6] avec probabilité 0,95. [p_ci_xbar]   · Le résultat est significatif, donc l'effet est grand et important en pratique. [p_significant_large]   ✔ 0,3 est dans l'IC : le test bilatéral à 5 % ne rejette pas H₀ : p = 0,3.   · 0,3 est dans l'IC, donc le test bilatéral à 5 % rejette H₀ : p = 0,3.
  pièges : p_significant_large, p_ci_xbar

IC à 95 % pour la proportion p de « oui » à une votation : [0,44 ; 0,5]. Un test d'une hypothèse H₀ sur p, fait sur d'autres données, donne p_obs = 0,02. Quelle phrase est juste ?
  · Sur 20 tests à 5 % faits sur les mêmes données, un seul rejette H₀ : l'effet trouvé est démontré. [p_multiple_tests]   · Si p_obs avait été 0,3, on aurait prouvé que H₀ est vraie. [p_accept_h0]   · 0,53 est hors de l'IC, donc le test bilatéral à 5 % ne rejette pas H₀ : p = 0,53.   ✔ 0,53 est hors de l'IC : le test bilatéral à 5 % rejette H₀ : p = 0,53.
  pièges : p_accept_h0, p_multiple_tests

IC à 95 % pour la teneur moyenne μ en alcool d'un vin (en %) : [12,1 ; 12,9]. Un test d'une hypothèse H₀ sur μ, fait sur d'autres données, donne p_obs = 0,003. Quelle phrase est juste ?
  · Sur 20 tests à 5 % faits sur les mêmes données, un seul rejette H₀ : l'effet trouvé est démontré. [p_multiple_tests]   ✔ 12,5 est dans l'IC : le test bilatéral à 5 % ne rejette pas H₀ : μ = 12,5.   · Deux études indépendantes donnent chacune un IC à 95 % : leur intersection est un IC à 95 %. [p_ci_intersection]   · 12,5 est dans l'IC, donc le test bilatéral à 5 % rejette H₀ : μ = 12,5.
  pièges : p_ci_intersection, p_multiple_tests

```

### Niveau 5

```
IC à 95 % pour la teneur moyenne μ en alcool d'un vin (en %) : [11,6 ; 12,4]. Un test d'une hypothèse H₀ sur μ, fait sur d'autres données, donne p_obs = 0,07. Quelle affirmation est fausse ?
  ✔ 95 % des valeurs observées dans l'échantillon sont dans [11,6 ; 12,4].   · Si H₀ était vraie, on observerait un écart au moins aussi grand avec une probabilité de 0,07.   · 12,8 est hors de l'IC : le test bilatéral à 5 % rejette H₀ : μ = 12,8.   · Si on refaisait l'étude un grand nombre de fois, environ 95 % des IC construits de cette façon contiendraient μ.
  pièges : p_ci_data

IC à 95 % pour la baisse moyenne δ de tension sous un médicament (en mmHg) : [−1 ; 5]. Un test d'une hypothèse H₀ sur δ, fait sur d'autres données, donne p_obs = 0,003. Quelle affirmation est fausse ?
  · Avec p_obs = 0,003, on rejette H₀ au niveau 5 %, donc aussi au niveau 10 %.   ✔ L'estimation d̄ est dans [−1 ; 5] avec probabilité 0,95.   · −2,5 est hors de l'IC : le test bilatéral à 5 % rejette H₀ : δ = −2,5.   · Si on refaisait l'étude un grand nombre de fois, environ 95 % des IC construits de cette façon contiendraient δ.
  pièges : p_ci_xbar

IC à 95 % pour la consommation moyenne μ d'un compteur électrique (en kWh) : [92 ; 99]. Un test d'une hypothèse H₀ sur μ, fait sur d'autres données, donne p_obs = 0,08. Quelle affirmation est fausse ?
  · Si H₀ était vraie, on observerait un écart au moins aussi grand avec une probabilité de 0,08.   · 88,5 est hors de l'IC : le test bilatéral à 5 % rejette H₀ : μ = 88,5.   · Si on refaisait l'étude un grand nombre de fois, environ 95 % des IC construits de cette façon contiendraient μ.   ✔ Deux études indépendantes donnent chacune un IC à 95 % : leur intersection est un IC à 95 %.
  pièges : p_ci_intersection

```

### Variantes d'examen

```
IC à 95 % pour la proportion p de Suisses qui partent en randonnée le week-end : [0,25 ; 0,45]. Un test d'une hypothèse H₀ sur p, fait sur d'autres données, donne p_obs = 0,07. Quelle phrase est juste ?
  · 95 % des valeurs observées dans l'échantillon sont dans [0,25 ; 0,45]. [p_ci_data]   · La probabilité que H₀ soit vraie est 0,07. [p_pvalue_h0]   ✔ Avec p_obs = 0,07, on ne rejette pas H₀ au niveau 5 % : les données sont compatibles avec H₀.   · Avec un échantillon dix fois plus grand, un effet significatif serait forcément grand. [p_significant_large]
  [examen mcq]
  pièges : p_significant_large, p_pvalue_h0, p_ci_data

Vrai ou faux ?
  « Un IC à 95 % contient exactement les valeurs θ₀ que le test bilatéral à 5 % (de même statistique) ne rejette pas. » → VRAI
  [examen tf]

```

## Droite des moindres carrés, r et R² (`p-reg-ls`, BA3)

_La droite des moindres carrés : pente S_xy/S_xx, ordonnée à l'origine, r et R²._

### Niveau 1

```
Données (5 points) : x : 1, 2, 3, 4, 5 ; y : 5, 10, 9, 5, 11. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [guided]  x̄
    = (1 + 2 + 3 + 4 + □)/5   (trous : (1 + 2 + 3 + 4 + 5)/5)   ← Moyenne des x
    = □   (trous : 3)
  — ȳ  [juge prob]  départ : ȳ
    = (□ + 10 + 9 + 5 + 11)/5   (trous : (5 + 10 + 9 + 5 + 11)/5)   ← Moyenne des y
    = □   (trous : 8)
  — Sxx  [juge prob]  départ : S_xx
    = □ + (−1)² + 0² + 1² + 2²   (trous : (−2)² + (−1)² + 0² + 1² + 2²)   ← Σ(xᵢ − x̄)²
    = □   (trous : 10)
  — Sxy  [juge prob]  départ : S_xy
    = □ + (−1)·2 + 0·1 + 1·(−3) + 2·3   (trous : (−2)·(−3) + (−1)·2 + 0·1 + 1·(−3) + 2·3)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = □   (trous : 7)
  — β̂  [juge prob]  départ : β̂
    = 7/□   (trous : 7/10)   ← S_xy/S_xx
  — α̂  [juge prob]  départ : α̂
    = 8 − □·3   (trous : 8 − 0,7·3)   ← La droite passe par (x̄, ȳ)
    = □   (trous : 5,9)
  — Syy  [juge prob]  départ : S_yy
    = (−3)² + 2² + 1² + (−3)² + 3²   ← Σ(yᵢ − ȳ)²
    = 32
  — R2  [juge prob]  départ : R²
    = 7²/(10·□)   (trous : 7²/(10·32))   ← R² = r²
    = 0,153125
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = 7/□ | β̂ = 0,7, α̂ = 5,9
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

Données (4 points) : x : 1, 2, 3, 4 ; y : 4, 9, 7, 8. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [guided]  x̄
    = (1 + 2 + 3 + □)/4   (trous : (1 + 2 + 3 + 4)/4)   ← Moyenne des x
    = □   (trous : 2,5)
  — ȳ  [juge prob]  départ : ȳ
    = (□ + 9 + 7 + 8)/4   (trous : (4 + 9 + 7 + 8)/4)   ← Moyenne des y
    = □   (trous : 7)
  — Sxx  [juge prob]  départ : S_xx
    = □ + (−0,5)² + 0,5² + 1,5²   (trous : (−1,5)² + (−0,5)² + 0,5² + 1,5²)   ← Σ(xᵢ − x̄)²
    = □   (trous : 5)
  — Sxy  [juge prob]  départ : S_xy
    = □ + (−0,5)·2 + 0,5·0 + 1,5·1   (trous : (−1,5)·(−3) + (−0,5)·2 + 0,5·0 + 1,5·1)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = □   (trous : 5)
  — β̂  [juge prob]  départ : β̂
    = □/5   (trous : 5/5)   ← S_xy/S_xx
    = □   (trous : 1)
  — α̂  [juge prob]  départ : α̂
    = 7 − □·2,5   (trous : 7 − 1·2,5)   ← La droite passe par (x̄, ȳ)
    = □   (trous : 4,5)
  — Syy  [juge prob]  départ : S_yy
    = (−3)² + 2² + 0² + 1²   ← Σ(yᵢ − ȳ)²
    = 14
  — R2  [juge prob]  départ : R²
    = 5²/(5·□)   (trous : 5²/(5·14))   ← R² = r²
    = 5/14
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = 5/□ | β̂ = 1, α̂ = 4,5
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

Données (5 points) : x : 3, 4, 5, 6, 7 ; y : 9, 10, 9, 14, 13. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [guided]  x̄
    = (3 + 4 + □ + 6 + 7)/5   (trous : (3 + 4 + 5 + 6 + 7)/5)   ← Moyenne des x
    = □   (trous : 5)
  — ȳ  [juge prob]  départ : ȳ
    = (9 + 10 + 9 + 14 + 13)/□   (trous : (9 + 10 + 9 + 14 + 13)/5)   ← Moyenne des y
    = □   (trous : 11)
  — Sxx  [juge prob]  départ : S_xx
    = □ + (−1)² + 0² + 1² + 2²   (trous : (−2)² + (−1)² + 0² + 1² + 2²)   ← Σ(xᵢ − x̄)²
    = □   (trous : 10)
  — Sxy  [juge prob]  départ : S_xy
    = □ + (−1)·(−1) + 0·(−2) + 1·3 + 2·2   (trous : (−2)·(−2) + (−1)·(−1) + 0·(−2) + 1·3 + 2·2)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = □   (trous : 12)
  — β̂  [juge prob]  départ : β̂
    = 12/□   (trous : 12/10)   ← S_xy/S_xx
    = □   (trous : 1,2)
  — α̂  [juge prob]  départ : α̂
    = 11 − □·5   (trous : 11 − 1,2·5)   ← La droite passe par (x̄, ȳ)
    = □   (trous : 5)
  — Syy  [juge prob]  départ : S_yy
    = (−2)² + (−1)² + (−2)² + 3² + 2²   ← Σ(yᵢ − ȳ)²
    = 22
  — R2  [juge prob]  départ : R²
    = 12²/(10·□)   (trous : 12²/(10·22))   ← R² = r²
    = 36/55
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = 12/□ | β̂ = 1,2, α̂ = 5
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

```

### Niveau 2

```
Données (4 points) : x : 2, 3, 4, 5 ; y : 8, 11, 13, 12. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [guided]  x̄
    = (2 + 3 + □ + 5)/4   (trous : (2 + 3 + 4 + 5)/4)   ← Moyenne des x
    = □   (trous : 3,5)
  — ȳ  [juge prob]  départ : ȳ
    = (8 + 11 + 13 + 12)/□   (trous : (8 + 11 + 13 + 12)/4)   ← Moyenne des y
    = □   (trous : 11)
  — Sxx  [juge prob]  départ : S_xx
    = □ + (−0,5)² + 0,5² + 1,5²   (trous : (−1,5)² + (−0,5)² + 0,5² + 1,5²)   ← Σ(xᵢ − x̄)²
    = □   (trous : 5)
  — Sxy  [juge prob]  départ : S_xy
    = □ + (−0,5)·0 + 0,5·2 + 1,5·1   (trous : (−1,5)·(−3) + (−0,5)·0 + 0,5·2 + 1,5·1)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = □   (trous : 7)
  — β̂  [juge prob]  départ : β̂
    = 7/□   (trous : 7/5)   ← S_xy/S_xx
  — α̂  [juge prob]  départ : α̂
    = 11 − □·3,5   (trous : 11 − 1,4·3,5)   ← La droite passe par (x̄, ȳ)
    = □   (trous : 6,1)
  — Syy  [juge prob]  départ : S_yy
    = (−3)² + 0² + 2² + 1²   ← Σ(yᵢ − ȳ)²
    = 14
  — R2  [juge prob]  départ : R²
    = 7²/(5·□)   (trous : 7²/(5·14))   ← R² = r²
    = 0,7
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = 7/□ | β̂ = 1,4, α̂ = 6,1
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

Données (4 points) : x : 0, 1, 2, 3 ; y : 4, 4, 8, 8. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [guided]  x̄
    = (0 + 1 + 2 + 3)/□   (trous : (0 + 1 + 2 + 3)/4)   ← Moyenne des x
    = □   (trous : 1,5)
  — ȳ  [juge prob]  départ : ȳ
    = (□ + 4 + 8 + 8)/4   (trous : (4 + 4 + 8 + 8)/4)   ← Moyenne des y
    = □   (trous : 6)
  — Sxx  [juge prob]  départ : S_xx
    = □ + (−0,5)² + 0,5² + 1,5²   (trous : (−1,5)² + (−0,5)² + 0,5² + 1,5²)   ← Σ(xᵢ − x̄)²
    = □   (trous : 5)
  — Sxy  [juge prob]  départ : S_xy
    = □ + (−0,5)·(−2) + 0,5·2 + 1,5·2   (trous : (−1,5)·(−2) + (−0,5)·(−2) + 0,5·2 + 1,5·2)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = □   (trous : 8)
  — β̂  [juge prob]  départ : β̂
    = 8/□   (trous : 8/5)   ← S_xy/S_xx
  — α̂  [juge prob]  départ : α̂
    = 6 − □·1,5   (trous : 6 − 1,6·1,5)   ← La droite passe par (x̄, ȳ)
    = □   (trous : 3,6)
  — Syy  [juge prob]  départ : S_yy
    = (−2)² + (−2)² + 2² + 2²   ← Σ(yᵢ − ȳ)²
    = 16
  — R2  [juge prob]  départ : R²
    = 8²/(5·□)   (trous : 8²/(5·16))   ← R² = r²
    = 0,8
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = 8/□ | β̂ = 1,6, α̂ = 3,6
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

Données (5 points) : x : 0, 1, 2, 3, 4 ; y : 17, 14, 12, 12, 15. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [guided]  x̄
    = (0 + 1 + 2 + 3 + 4)/□   (trous : (0 + 1 + 2 + 3 + 4)/5)   ← Moyenne des x
    = □   (trous : 2)
  — ȳ  [juge prob]  départ : ȳ
    = (17 + 14 + 12 + 12 + 15)/5   ← Moyenne des y
    = □   (trous : 14)
  — Sxx  [juge prob]  départ : S_xx
    = □ + (−1)² + 0² + 1² + 2²   (trous : (−2)² + (−1)² + 0² + 1² + 2²)   ← Σ(xᵢ − x̄)²
    = □   (trous : 10)
  — Sxy  [juge prob]  départ : S_xy
    = □ + (−1)·0 + 0·(−2) + 1·(−2) + 2·1   (trous : (−2)·3 + (−1)·0 + 0·(−2) + 1·(−2) + 2·1)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = □   (trous : −6)
  — β̂  [juge prob]  départ : β̂
    = −6/□   (trous : −6/10)   ← S_xy/S_xx
    = □   (trous : −0,6)
  — α̂  [juge prob]  départ : α̂
    = 14 − □·2   (trous : 14 − (−0,6)·2)   ← La droite passe par (x̄, ȳ)
    = □   (trous : 15,2)
  — Syy  [juge prob]  départ : S_yy
    = 3² + 0² + (−2)² + (−2)² + 1²   ← Σ(yᵢ − ȳ)²
    = 18
  — R2  [juge prob]  départ : R²
    = (−6)²/(10·□)   (trous : (−6)²/(10·18))   ← R² = r²
    = 0,2
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = −6/□ | β̂ = −0,6, α̂ = 15,2
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

```

### Niveau 3

```
Données (4 points) : x : 2, 3, 4, 5 ; y : 6, 0, 5, 1. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [tap, suivre l'erreur, menu menu]  x̄
    = (2 + 3 + 4 + 5)/4   ← Moyenne des x
    = 3,5
  — ȳ  [juge prob]  départ : ȳ
    = (6 + 0 + 5 + 1)/4   ← Moyenne des y
    = 3
  — Sxx  [juge prob]  départ : S_xx
    = (−1,5)² + (−0,5)² + 0,5² + 1,5²   ← Σ(xᵢ − x̄)²
    = 5
  — Sxy  [juge prob]  départ : S_xy
    = (−1,5)·3 + (−0,5)·(−3) + 0,5·2 + 1,5·(−2)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = −5
  — β̂  [juge prob]  départ : β̂
    = −5/5   ← S_xy/S_xx
    = −1
  — α̂  [juge prob]  départ : α̂
    = 3 − (−1)·3,5   ← La droite passe par (x̄, ȳ)
    = 6,5
  — Syy  [juge prob]  départ : S_yy
    = 3² + (−3)² + 2² + (−2)²   ← Σ(yᵢ − ȳ)²
    = 26
  — R2  [juge prob]  départ : R²
    = (−5)²/(5·26)   ← R² = r²
    = 5/26
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = −5/□ | β̂ = −1, α̂ = 6,5
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

Données (5 points) : x : 1, 2, 3, 4, 5 ; y : 8, 7, 8, 4, 3. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [tap, suivre l'erreur, menu menu]  x̄
    = (1 + 2 + 3 + 4 + 5)/5   ← Moyenne des x
    = 3
  — ȳ  [juge prob]  départ : ȳ
    = (8 + 7 + 8 + 4 + 3)/5   ← Moyenne des y
    = 6
  — Sxx  [juge prob]  départ : S_xx
    = (−2)² + (−1)² + 0² + 1² + 2²   ← Σ(xᵢ − x̄)²
    = 10
  — Sxy  [juge prob]  départ : S_xy
    = (−2)·2 + (−1)·1 + 0·2 + 1·(−2) + 2·(−3)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = −13
  — β̂  [juge prob]  départ : β̂
    = −13/10   ← S_xy/S_xx
  — α̂  [juge prob]  départ : α̂
    = 6 − (−1,3)·3   ← La droite passe par (x̄, ȳ)
    = 9,9
  — Syy  [juge prob]  départ : S_yy
    = 2² + 1² + 2² + (−2)² + (−3)²   ← Σ(yᵢ − ȳ)²
    = 22
  — R2  [juge prob]  départ : R²
    = (−13)²/(10·22)   ← R² = r²
    = 169/220
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = −13/□ | β̂ = −1,3, α̂ = 9,9
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

Données (5 points) : x : 2, 3, 4, 5, 6 ; y : 3, 7, 8, 4, 8. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [tap, suivre l'erreur, menu menu]  x̄
    = (2 + 3 + 4 + 5 + 6)/5   ← Moyenne des x
    = 4
  — ȳ  [juge prob]  départ : ȳ
    = (3 + 7 + 8 + 4 + 8)/5   ← Moyenne des y
    = 6
  — Sxx  [juge prob]  départ : S_xx
    = (−2)² + (−1)² + 0² + 1² + 2²   ← Σ(xᵢ − x̄)²
    = 10
  — Sxy  [juge prob]  départ : S_xy
    = (−2)·(−3) + (−1)·1 + 0·2 + 1·(−2) + 2·2   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = 7
  — β̂  [juge prob]  départ : β̂
    = 7/10   ← S_xy/S_xx
  — α̂  [juge prob]  départ : α̂
    = 6 − 0,7·4   ← La droite passe par (x̄, ȳ)
    = 3,2
  — Syy  [juge prob]  départ : S_yy
    = (−3)² + 1² + 2² + (−2)² + 2²   ← Σ(yᵢ − ȳ)²
    = 22
  — R2  [juge prob]  départ : R²
    = 7²/(10·22)   ← R² = r²
    = 49/220
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = 7/□ | β̂ = 0,7, α̂ = 3,2
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

```

### Niveau 4

```
Complète la pente des moindres carrés β̂ = S_xy/S_xx (sommes centrées).
  [code python, 3 trous]
    | def slope(x, y):
    |     n = len(x)
    |     mx = sum(x) / n
    |     my = sum(y) / n
    |     sxx = 0.0
    |     sxy = 0.0
    |     for i in range(n):
    |         sxx = sxx + ⟦(x[i] - mx) ** 2⟧
    |         sxy = sxy + ⟦(x[i] - mx) * (y[i] - my)⟧
    |     return ⟦sxy / sxx⟧
    test : slope([1, 2, 3, 4], [2, 4, 5, 9]) → 2.2
    test : slope([0, 1, 2], [1, 3, 4]) → 1.5
    test : slope([2, 4, 6, 8, 10], [10, 8, 9, 5, 3]) → -0.85
  pièges : p_reg_sums_raw

Données (7 points) : x : 0, 1, 2, 3, 4, 5, 6 ; y : 8, 5, 7, 9, 11, 7, 9. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [free, suivre l'erreur]  x̄
    = (0 + 1 + 2 + 3 + 4 + 5 + 6)/7   ← Moyenne des x
    = 3
  — ȳ  [juge prob]  départ : ȳ
    = (8 + 5 + 7 + 9 + 11 + 7 + 9)/7   ← Moyenne des y
    = 8
  — Sxx  [juge prob]  départ : S_xx
    = (−3)² + (−2)² + (−1)² + 0² + 1² + 2² + 3²   ← Σ(xᵢ − x̄)²
    = 28
  — Sxy  [juge prob]  départ : S_xy
    = (−3)·0 + (−2)·(−3) + (−1)·(−1) + 0·1 + 1·3 + 2·(−1) + 3·1   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = 11
  — β̂  [juge prob]  départ : β̂
    = 11/28   ← S_xy/S_xx
  — α̂  [juge prob]  départ : α̂
    = 8 − 11/28·3   ← La droite passe par (x̄, ȳ)
    = 191/28
  — Syy  [juge prob]  départ : S_yy
    = 0² + (−3)² + (−1)² + 1² + 3² + (−1)² + 1²   ← Σ(yᵢ − ȳ)²
    = 22
  — R2  [juge prob]  départ : R²
    = 11²/(28·22)   ← R² = r²
    = 11/56
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = 11/□ | β̂ = 11/28, α̂ = 191/28
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

Complète la pente des moindres carrés β̂ = S_xy/S_xx (sommes centrées).
  [code python, 3 trous]
    | def slope(x, y):
    |     n = len(x)
    |     mx = sum(x) / n
    |     my = sum(y) / n
    |     sxx = 0.0
    |     sxy = 0.0
    |     for i in range(n):
    |         sxx = sxx + ⟦(x[i] - mx) ** 2⟧
    |         sxy = sxy + ⟦(x[i] - mx) * (y[i] - my)⟧
    |     return ⟦sxy / sxx⟧
    test : slope([1, 2, 3, 4], [2, 4, 5, 9]) → 2.2
    test : slope([0, 1, 2], [1, 3, 4]) → 1.5
    test : slope([2, 4, 6, 8, 10], [10, 8, 9, 5, 3]) → -0.85
  pièges : p_reg_sums_raw

```

### Niveau 5

```
On connaît x̄ = 7, ȳ = 14, s_x = 4, s_y = 3 et r = 0,6. Donne la droite de régression de y sur x (y = α̂ + β̂x), puis celle de x sur y (x = ĉ + d̂y).
  [free, sans aide]  β̂
    = 0,6·3/4   ← β̂ = r·s_y/s_x
    = 0,45
  — α̂  [juge prob]  départ : α̂
    = 14 − 0,45·7   ← Par (x̄, ȳ)
    = 10,85
  — Droite de x sur y : pente d̂  [juge prob]  départ : d̂
    = 0,6·4/3   ← d̂ = r·s_x/s_y, pas 1/β̂
    = 0,8
  — ĉ  [juge prob]  départ : ĉ
    = 7 − 0,8·14   ← Par (x̄, ȳ) aussi
    = −4,2
  pièges : p_reg_x_on_y

On connaît x̄ = 4, ȳ = 38, s_x = 5, s_y = 10 et r = 0,6. Donne la droite de régression de y sur x (y = α̂ + β̂x), puis celle de x sur y (x = ĉ + d̂y).
  [free, sans aide]  β̂
    = 0,6·10/5   ← β̂ = r·s_y/s_x
    = 1,2
  — α̂  [juge prob]  départ : α̂
    = 38 − 1,2·4   ← Par (x̄, ȳ)
    = 33,2
  — Droite de x sur y : pente d̂  [juge prob]  départ : d̂
    = 0,6·5/10   ← d̂ = r·s_x/s_y, pas 1/β̂
    = 0,3
  — ĉ  [juge prob]  départ : ĉ
    = 4 − 0,3·38   ← Par (x̄, ȳ) aussi
    = −7,4
  pièges : p_reg_x_on_y

On connaît x̄ = 2, ȳ = 37, s_x = 5, s_y = 10 et r = 0,5. Donne la droite de régression de y sur x (y = α̂ + β̂x), puis celle de x sur y (x = ĉ + d̂y).
  [free, sans aide]  β̂
    = 0,5·10/5   ← β̂ = r·s_y/s_x
    = 1
  — α̂  [juge prob]  départ : α̂
    = 37 − 1·2   ← Par (x̄, ȳ)
    = 35
  — Droite de x sur y : pente d̂  [juge prob]  départ : d̂
    = 0,5·5/10   ← d̂ = r·s_x/s_y, pas 1/β̂
    = 0,25
  — ĉ  [juge prob]  départ : ĉ
    = 2 − 0,25·37   ← Par (x̄, ȳ) aussi
    = −7,25
  pièges : p_reg_x_on_y

```

### Variantes d'examen

```
Données : x : 2, 3, 4, 5 ; y : 14, 12, 8, 10. Quelle est la pente β̂ de la droite des moindres carrés de y sur x ?
  · −0,4 [p_reg_slope_swap]   · 2,7037 [p_reg_sums_raw]   · −3,2   ✔ −1,6
  [examen mcq]
  pièges : p_reg_slope_swap, p_reg_sums_raw

Vrai ou faux ?
  « La droite des moindres carrés de y sur x passe par le point (x̄, ȳ). » → VRAI
  [examen tf]

Données : x : 2, 3, 4, 5 ; y : 13, 11, 14, 10. Calcule la pente β̂ de la droite des moindres carrés.
  [free, sans aide, examen coef]  β̂
    = −3/5   ← S_xy/S_xx
  pièges : p_reg_slope_swap, p_reg_sums_raw

```

## Tests t et IC sur les coefficients (`p-reg-test`, BA3)

_Tests t et intervalles sur les coefficients d'une régression, avec σ̂² = RSS/(n − 2)._

### Niveau 1

```
Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 8, x̄ = 3,5, ȳ = 5, S_xx = 42, S_xy = 8, S_yy = 16, β̂ = 4/21. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [guided]  RSS
    = 16 − □·8   (trous : 16 − (4/21)·8)   ← Somme des carrés des résidus
    = □   (trous : 14,476)
  — σ̂2  [juge stat]  départ : σ̂²
    = 14,476/6   ← Deux paramètres estimés : n − 2
    = 2,413
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(2,413/□)   (trous : √(2,413/42))   ← Erreur standard de β̂
    = □   (trous : 0,24)
  — tobs  [juge stat]  départ : t_obs
    = (4/21)/□   (trous : (4/21)/0,24)   ← Sous H₀ : β = 0
    = □   (trous : 0,79)
  — ν  [juge prob]  départ : ν
    = □   (trous : 6)   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,447)   ← Table 3, ν = 6, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    (Décision au niveau 5 % ? Ne pas rejeter H₀, car |t_obs| = 0,79 ≤ 2,447.)
    = [−0,4 ; 0,78]   ← β̂ ± 2,447·0,24 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/6, se = √(σ̂²/…) | t_obs = 0,79
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 8, x̄ = 5,5, ȳ = 15, S_xx = 42, S_xy = −19, S_yy = 54, β̂ = −19/42. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [guided]  RSS
    = 54 − □·(−19)   (trous : 54 − (−19/42)·(−19))   ← Somme des carrés des résidus
    = □   (trous : 45,405)
  — σ̂2  [juge stat]  départ : σ̂²
    = 45,405/□   (trous : 45,405/6)   ← Deux paramètres estimés : n − 2
    = 7,568
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(7,568/□)   (trous : √(7,568/42))   ← Erreur standard de β̂
    = □   (trous : 0,424)
  — tobs  [juge stat]  départ : t_obs
    = (−19/42)/□   (trous : (−19/42)/0,424)   ← Sous H₀ : β = 0
    = □   (trous : −1,07)
  — ν  [juge prob]  départ : ν
    = □   (trous : 6)   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,447)   ← Table 3, ν = 6, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    (Décision au niveau 5 % ? Ne pas rejeter H₀, car |t_obs| = 1,07 ≤ 2,447.)
    = [−1,49 ; 0,59]   ← β̂ ± 2,447·0,424 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/6, se = √(σ̂²/…) | t_obs = −1,07
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_pvalue_h0, p_accept_h0

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 7, x̄ = 5, ȳ = 15, S_xx = 28, S_xy = −5, S_yy = 12, β̂ = −5/28. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [guided]  RSS
    = 12 − □·(−5)   (trous : 12 − (−5/28)·(−5))   ← Somme des carrés des résidus
    = □   (trous : 11,107)
  — σ̂2  [juge stat]  départ : σ̂²
    = 11,107/□   (trous : 11,107/5)   ← Deux paramètres estimés : n − 2
    = 2,221
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(2,221/□)   (trous : √(2,221/28))   ← Erreur standard de β̂
    = □   (trous : 0,282)
  — tobs  [juge stat]  départ : t_obs
    = (−5/28)/□   (trous : (−5/28)/0,282)   ← Sous H₀ : β = 0
    = □   (trous : −0,63)
  — ν  [juge prob]  départ : ν
    = □   (trous : 5)   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,571)   ← Table 3, ν = 5, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    (Décision au niveau 5 % ? Ne pas rejeter H₀, car |t_obs| = 0,63 ≤ 2,571.)
    = [−0,9 ; 0,55]   ← β̂ ± 2,571·0,282 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/5, se = √(σ̂²/…) | t_obs = −0,63
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 2

```
Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 5, x̄ = 4, ȳ = 12, S_xx = 10, S_xy = −2, S_yy = 16, β̂ = −0,2. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [guided]  RSS
    = 16 − □·(−2)   (trous : 16 − (−0,2)·(−2))   ← Somme des carrés des résidus
    = □   (trous : 15,6)
  — σ̂2  [juge stat]  départ : σ̂²
    = 15,6/□   (trous : 15,6/3)   ← Deux paramètres estimés : n − 2
    = 5,2
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(5,2/□)   (trous : √(5,2/10))   ← Erreur standard de β̂
    = □   (trous : 0,721)
  — tobs  [juge stat]  départ : t_obs
    = (−0,2)/□   (trous : (−0,2)/0,721)   ← Sous H₀ : β = 0
    = □   (trous : −0,28)
  — ν  [juge prob]  départ : ν
    = □   (trous : 3)   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 3,182)   ← Table 3, ν = 3, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    ? Décision au niveau 5 % ? · Rejeter H₀ : β = 0, car |t_obs| = 0,28 > 3,182 / ✔ Ne pas rejeter H₀, car |t_obs| = 0,28 ≤ 3,182
    = [−2,49 ; 2,09]   ← β̂ ± 3,182·0,721 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/3, se = √(σ̂²/…) | t_obs = −0,28
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 5, x̄ = 3, ȳ = 12, S_xx = 10, S_xy = 10, S_yy = 20, β̂ = 1. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [guided]  RSS
    = 20 − □·10   (trous : 20 − 1·10)   ← Somme des carrés des résidus
    = □   (trous : 10)
  — σ̂2  [juge stat]  départ : σ̂²
    = 10/□   (trous : 10/3)   ← Deux paramètres estimés : n − 2
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(3,333/□)   (trous : √(3,333/10))   ← Erreur standard de β̂
    = □   (trous : 0,577)
  — tobs  [juge stat]  départ : t_obs
    = 1/□   (trous : 1/0,577)   ← Sous H₀ : β = 0
    = □   (trous : 1,73)
  — ν  [juge prob]  départ : ν
    = □   (trous : 3)   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 3,182)   ← Table 3, ν = 3, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    ? Décision au niveau 5 % ? · Rejeter H₀ : β = 0, car |t_obs| = 1,73 > 3,182 / ✔ Ne pas rejeter H₀, car |t_obs| = 1,73 ≤ 3,182
    = [−0,84 ; 2,84]   ← β̂ ± 3,182·0,577 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/3, se = √(σ̂²/…) | t_obs = 1,73
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 5, x̄ = 3, ȳ = 7, S_xx = 10, S_xy = −4, S_yy = 20, β̂ = −0,4. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [guided]  RSS
    = 20 − □·(−4)   (trous : 20 − (−0,4)·(−4))   ← Somme des carrés des résidus
    = □   (trous : 18,4)
  — σ̂2  [juge stat]  départ : σ̂²
    = 18,4/□   (trous : 18,4/3)   ← Deux paramètres estimés : n − 2
    = 6,133
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(6,133/□)   (trous : √(6,133/10))   ← Erreur standard de β̂
    = □   (trous : 0,783)
  — tobs  [juge stat]  départ : t_obs
    = (−0,4)/□   (trous : (−0,4)/0,783)   ← Sous H₀ : β = 0
    = □   (trous : −0,51)
  — ν  [juge prob]  départ : ν
    = □   (trous : 3)   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 3,182)   ← Table 3, ν = 3, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    ? Décision au niveau 5 % ? · Rejeter H₀ : β = 0, car |t_obs| = 0,51 > 3,182 / ✔ Ne pas rejeter H₀, car |t_obs| = 0,51 ≤ 3,182
    = [−2,89 ; 2,09]   ← β̂ ± 3,182·0,783 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/3, se = √(σ̂²/…) | t_obs = −0,51
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 3

```
Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 5, x̄ = 2, ȳ = 9, S_xx = 10, S_xy = 9, S_yy = 18, β̂ = 0,9. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [tap, suivre l'erreur, menu menu]  RSS
    = 18 − 0,9·9   ← Somme des carrés des résidus
    = 9,9
  — σ̂2  [juge stat]  départ : σ̂²
    = 9,9/3   ← Deux paramètres estimés : n − 2
    = 3,3
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(3,3/10)   ← Erreur standard de β̂
    = 0,574
  — tobs  [juge stat]  départ : t_obs
    = 0,9/0,574   ← Sous H₀ : β = 0
    = 1,57
  — ν  [juge prob]  départ : ν
    = 3   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 3,182   ← Table 3, ν = 3, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    ? Décision au niveau 5 % ? · Rejeter H₀ : β = 0, car |t_obs| = 1,57 > 3,182 / ✔ Ne pas rejeter H₀, car |t_obs| = 1,57 ≤ 3,182
    = [−0,93 ; 2,73]   ← β̂ ± 3,182·0,574 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/3, se = √(σ̂²/…) | t_obs = 1,57
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_pvalue_h0, p_accept_h0

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 5, x̄ = 4, ȳ = 10, S_xx = 10, S_xy = 7, S_yy = 20, β̂ = 0,7. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [tap, suivre l'erreur, menu menu]  RSS
    = 20 − 0,7·7   ← Somme des carrés des résidus
    = 15,1
  — σ̂2  [juge stat]  départ : σ̂²
    = 15,1/3   ← Deux paramètres estimés : n − 2
    = 5,033
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(5,033/10)   ← Erreur standard de β̂
    = 0,709
  — tobs  [juge stat]  départ : t_obs
    = 0,7/0,709   ← Sous H₀ : β = 0
    = 0,99
  — ν  [juge prob]  départ : ν
    = 3   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 3,182   ← Table 3, ν = 3, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    ? Décision au niveau 5 % ? · Rejeter H₀ : β = 0, car |t_obs| = 0,99 > 3,182 / ✔ Ne pas rejeter H₀, car |t_obs| = 0,99 ≤ 3,182
    = [−1,56 ; 2,96]   ← β̂ ± 3,182·0,709 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/3, se = √(σ̂²/…) | t_obs = 0,99
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 8, x̄ = 6,5, ȳ = 7, S_xx = 42, S_xy = 27, S_yy = 42, β̂ = 9/14. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [tap, suivre l'erreur, menu menu]  RSS
    = 42 − (9/14)·27   ← Somme des carrés des résidus
    = 24,643
  — σ̂2  [juge stat]  départ : σ̂²
    = 24,643/6   ← Deux paramètres estimés : n − 2
    = 4,107
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(4,107/42)   ← Erreur standard de β̂
    = 0,313
  — tobs  [juge stat]  départ : t_obs
    = (9/14)/0,313   ← Sous H₀ : β = 0
    = 2,05
  — ν  [juge prob]  départ : ν
    = 6   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 2,447   ← Table 3, ν = 6, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    ? Décision au niveau 5 % ? · Rejeter H₀ : β = 0, car |t_obs| = 2,05 > 2,447 / ✔ Ne pas rejeter H₀, car |t_obs| = 2,05 ≤ 2,447
    = [−0,12 ; 1,41]   ← β̂ ± 2,447·0,313 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/6, se = √(σ̂²/…) | t_obs = 2,06
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 4

```
Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 6, x̄ = 4,5, ȳ = 14, S_xx = 17,5, S_xy = −4, S_yy = 28, β̂ = −8/35, α̂ = 526/35. Teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour α.
  [free, suivre l'erreur]  RSS
    = 28 − (−8/35)·(−4)   ← Somme des carrés des résidus
    = 27,086
  — σ̂2  [juge stat]  départ : σ̂²
    = 27,086/4   ← Deux paramètres estimés : n − 2
    = 6,772
  — se(α̂)  [juge stat]  départ : se(α̂)
    = √(6,772·(1/6 + 4,5²/17,5))   ← Erreur standard de α̂
    = 2,994
  — tobs  [juge stat]  départ : t_obs
    = (526/35)/2,994   ← Sous H₀ : α = 0
    = 5,02
  — ν  [juge prob]  départ : ν
    = 4   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 2,776   ← Table 3, ν = 4, colonne s₅
  — IC à 95 % pour α  [juge stat]  départ : IC(α)
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : α = 0, car |t_obs| = 5,02 > 2,776 / · Ne pas rejeter H₀, car |t_obs| = 5,02 ≤ 2,776
    = [6,72 ; 23,34]   ← α̂ ± 2,776·2,994 ; 0 est hors de l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/4, se = √(σ̂²/…) | t_obs = 5,02
  pièges : p_reg_sigma_n, p_reg_se_alpha, p_df_wrong, p_pvalue_alpha_compare, p_significant_large, p_ci_prob, p_pvalue_h0

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 5, x̄ = 5, ȳ = 8, S_xx = 10, S_xy = −4, S_yy = 16, β̂ = −0,4, α̂ = 10. Teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour α.
  [free, suivre l'erreur]  RSS
    = 16 − (−0,4)·(−4)   ← Somme des carrés des résidus
    = 14,4
  — σ̂2  [juge stat]  départ : σ̂²
    = 14,4/3   ← Deux paramètres estimés : n − 2
    = 4,8
  — se(α̂)  [juge stat]  départ : se(α̂)
    = √(4,8·(1/5 + 5²/10))   ← Erreur standard de α̂
    = 3,6
  — tobs  [juge stat]  départ : t_obs
    = 10/3,6   ← Sous H₀ : α = 0
    = 2,78
  — ν  [juge prob]  départ : ν
    = 3   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 3,182   ← Table 3, ν = 3, colonne s₅
  — IC à 95 % pour α  [juge stat]  départ : IC(α)
    ? Décision au niveau 5 % ? · Rejeter H₀ : α = 0, car |t_obs| = 2,78 > 3,182 / ✔ Ne pas rejeter H₀, car |t_obs| = 2,78 ≤ 3,182
    = [−1,46 ; 21,46]   ← α̂ ± 3,182·3,6 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/3, se = √(σ̂²/…) | t_obs = 2,78
  pièges : p_reg_sigma_n, p_reg_se_alpha, p_df_wrong, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 6, x̄ = 2,5, ȳ = 9, S_xx = 17,5, S_xy = 5, S_yy = 28, β̂ = 2/7, α̂ = 58/7. Teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour α.
  [free, suivre l'erreur]  RSS
    = 28 − (2/7)·5   ← Somme des carrés des résidus
    = 26,571
  — σ̂2  [juge stat]  départ : σ̂²
    = 26,571/4   ← Deux paramètres estimés : n − 2
    = 6,643
  — se(α̂)  [juge stat]  départ : se(α̂)
    = √(6,643·(1/6 + 2,5²/17,5))   ← Erreur standard de α̂
    = 1,865
  — tobs  [juge stat]  départ : t_obs
    = (58/7)/1,865   ← Sous H₀ : α = 0
    = 4,44
  — ν  [juge prob]  départ : ν
    = 4   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 2,776   ← Table 3, ν = 4, colonne s₅
  — IC à 95 % pour α  [juge stat]  départ : IC(α)
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : α = 0, car |t_obs| = 4,44 > 2,776 / · Ne pas rejeter H₀, car |t_obs| = 4,44 ≤ 2,776
    = [3,11 ; 13,46]   ← α̂ ± 2,776·1,865 ; 0 est hors de l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/4, se = √(σ̂²/…) | t_obs = 4,44
  pièges : p_reg_sigma_n, p_reg_se_alpha, p_df_wrong, p_pvalue_alpha_compare, p_ci_prob, p_pvalue_h0, p_significant_large

```

### Niveau 5

```
Un ressort s'allonge sous des masses x (en kg) ; y est l'allongement (en mm). Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Données : x : 2, 3, 4, 5, 6, 7 ; y : 10, 14, 11, 15, 13, 15 ; résumés : n = 6, x̄ = 4,5, ȳ = 13, S_xx = 17,5, S_xy = 13, S_yy = 22. Calcule α̂ et β̂, puis teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 % (l'élongation est-elle proportionnelle à la masse ?).
  [free, sans aide]  β̂
    = (13)/(17,5)   ← S_xy/S_xx
    = 0,743
  — α̂  [juge stat]  départ : α̂
    = 13 − 0,743·4,5
    = 9,66
  — RSS  [juge stat]  départ : RSS
    = 22 − 0,743·13   ← Somme des carrés des résidus
    = 12,341
  — σ̂2  [juge stat]  départ : σ̂²
    = 12,341/4   ← Deux paramètres estimés : n − 2
    = 3,085
  — se(α̂)  [juge stat]  départ : se(α̂)
    = √(3,085·(1/6 + 4,5²/17,5))   ← Erreur standard de α̂
    = 2,021
  — tobs  [juge stat]  départ : t_obs
    = 9,66/2,021   ← Sous H₀ : α = 0
    = 4,78
  — ν  [juge prob]  départ : ν
    = 4   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 2,776   ← Table 3, ν = 4, colonne s₅
  — IC à 95 % pour α  [juge stat]  départ : IC(α)
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : α = 0, car |t_obs| = 4,78 > 2,776 / · Ne pas rejeter H₀, car |t_obs| = 4,78 ≤ 2,776
    = [4,05 ; 15,27]   ← α̂ ± 2,776·2,021 ; 0 est hors de l'IC
  pièges : p_reg_sigma_n, p_reg_se_alpha, p_df_wrong, p_pvalue_alpha_compare, p_ci_prob, p_significant_large, p_pvalue_h0

Un ressort s'allonge sous des masses x (en kg) ; y est l'allongement (en mm). Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Données : x : 2, 3, 4, 5, 6, 7 ; y : 16, 12, 10, 15, 14, 11 ; résumés : n = 6, x̄ = 4,5, ȳ = 13, S_xx = 17,5, S_xy = −7, S_yy = 28. Calcule α̂ et β̂, puis teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 % (l'élongation est-elle proportionnelle à la masse ?).
  [free, sans aide]  β̂
    = (−7)/(17,5)   ← S_xy/S_xx
    = −0,4
  — α̂  [juge stat]  départ : α̂
    = 13 − (−0,4)·4,5
    = 14,8
  — RSS  [juge stat]  départ : RSS
    = 28 − (−0,4)·(−7)   ← Somme des carrés des résidus
    = 25,2
  — σ̂2  [juge stat]  départ : σ̂²
    = 25,2/4   ← Deux paramètres estimés : n − 2
    = 6,3
  — se(α̂)  [juge stat]  départ : se(α̂)
    = √(6,3·(1/6 + 4,5²/17,5))   ← Erreur standard de α̂
    = 2,888
  — tobs  [juge stat]  départ : t_obs
    = 14,8/2,888   ← Sous H₀ : α = 0
    = 5,12
  — ν  [juge prob]  départ : ν
    = 4   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 2,776   ← Table 3, ν = 4, colonne s₅
  — IC à 95 % pour α  [juge stat]  départ : IC(α)
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : α = 0, car |t_obs| = 5,12 > 2,776 / · Ne pas rejeter H₀, car |t_obs| = 5,12 ≤ 2,776
    = [6,78 ; 22,82]   ← α̂ ± 2,776·2,888 ; 0 est hors de l'IC
  pièges : p_reg_sigma_n, p_reg_se_alpha, p_df_wrong, p_pvalue_alpha_compare, p_pvalue_h0, p_ci_prob, p_significant_large

Un ressort s'allonge sous des masses x (en kg) ; y est l'allongement (en mm). Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Données : x : 1, 2, 3, 4, 5, 6, 7 ; y : 10, 12, 13, 14, 16, 10, 16 ; résumés : n = 7, x̄ = 4, ȳ = 13, S_xx = 28, S_xy = 17, S_yy = 38. Calcule α̂ et β̂, puis teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 % (l'élongation est-elle proportionnelle à la masse ?).
  [free, sans aide]  β̂
    = (17)/(28)   ← S_xy/S_xx
    = 0,607
  — α̂  [juge stat]  départ : α̂
    = 13 − 0,607·4
    = 10,57
  — RSS  [juge stat]  départ : RSS
    = 38 − 0,607·17   ← Somme des carrés des résidus
    = 27,681
  — σ̂2  [juge stat]  départ : σ̂²
    = 27,681/5   ← Deux paramètres estimés : n − 2
    = 5,536
  — se(α̂)  [juge stat]  départ : se(α̂)
    = √(5,536·(1/7 + 4²/28))   ← Erreur standard de α̂
    = 1,989
  — tobs  [juge stat]  départ : t_obs
    = 10,57/1,989   ← Sous H₀ : α = 0
    = 5,31
  — ν  [juge prob]  départ : ν
    = 5   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 2,571   ← Table 3, ν = 5, colonne s₅
  — IC à 95 % pour α  [juge stat]  départ : IC(α)
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : α = 0, car |t_obs| = 5,31 > 2,571 / · Ne pas rejeter H₀, car |t_obs| = 5,31 ≤ 2,571
    = [5,46 ; 15,68]   ← α̂ ± 2,571·1,989 ; 0 est hors de l'IC
  pièges : p_reg_sigma_n, p_reg_se_alpha, p_df_wrong, p_pvalue_alpha_compare, p_pvalue_h0, p_ci_prob, p_significant_large

```

### Variantes d'examen

```
Régression simple sur n = 6 points ; somme des carrés des résidus RSS = 88/7. Quelle est l'estimation σ̂² de la variance des erreurs ?
  · 44/21 [p_reg_sigma_n]   · 88/35 [p_reg_sigma_n]   ✔ 22/7   · 88/7
  [examen mcq]
  pièges : p_reg_sigma_n

Vrai ou faux ?
  « En régression simple sur n = 6 points avec RSS = 2,4, on estime σ² par RSS/n = 0,4. » → FAUX
    contre-exemple (refute) : s = 3/5
  [examen tf]
  pièges : p_reg_sigma_n

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 7, x̄ = 4, ȳ = 6, S_xx = 28, S_xy = −10, S_yy = 32, β̂ = −5/14, α̂ = 52/7. Teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour α. Donne t_obs (à 0,01 près).
  [free, sans aide, examen coef]  t_obs
    = (52/7)/2,015   ← Sous H₀ : α = 0
    = 3,69

Un ressort s'allonge sous des masses x (en kg) ; y est l'allongement (en mm). Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Données : x : 3, 4, 5, 6, 7, 8 ; y : 5, 0, 0, 6, 3, 4 ; résumés : n = 6, x̄ = 5,5, ȳ = 3, S_xx = 17,5, S_xy = 5, S_yy = 32. Calcule α̂ et β̂, puis teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 % (l'élongation est-elle proportionnelle à la masse ?).
  [problème, examen open, 10 points]
  partie 1 (β̂ : 1 ; α̂ : 1 ; RSS : 1 ; σ̂2 : 1 ; se(α̂) : 1 ; tobs : 1 ; ν : 1 ; tc : 1 ; IC à 95 % pour α : 1)
  Un ressort s'allonge sous des masses x (en kg) ; y est l'allongement (en mm). Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Données : x : 3, 4, 5, 6, 7, 8 ; y : 5, 0, 0, 6, 3, 4 ; résumés : n = 6, x̄ = 5,5, ȳ = 3, S_xx = 17,5, S_xy = 5, S_yy = 32. Calcule α̂ et β̂, puis teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 % (l'élongation est-elle proportionnelle à la masse ?).
    [free, sans aide, suivre l'erreur, examen open]  β̂
      = (5)/(17,5)   ← S_xy/S_xx
      = 0,286
    — α̂  [juge stat]  départ : α̂
      = 3 − 0,286·5,5
      = 1,43
    — RSS  [juge stat]  départ : RSS
      = 32 − 0,286·5   ← Somme des carrés des résidus
      = 30,57
    — σ̂2  [juge stat]  départ : σ̂²
      = 30,57/4   ← Deux paramètres estimés : n − 2
      = 7,643
    — se(α̂)  [juge stat]  départ : se(α̂)
      = √(7,643·(1/6 + 5,5²/17,5))   ← Erreur standard de α̂
      = 3,806
    — tobs  [juge stat]  départ : t_obs
      = 1,43/3,806   ← Sous H₀ : α = 0
      = 0,38
    — ν  [juge prob]  départ : ν
      = 4   ← ν = n − 2
    — tc  [juge stat]  départ : t_c
      = 2,776   ← Table 3, ν = 4, colonne s₅
    — IC à 95 % pour α  [juge stat]  départ : IC(α)
      = [−9,14 ; 12]   ← α̂ ± 2,776·3,806 ; 0 est dans l'IC
  partie 2 (Interpréter : 1)
  Interpréter : quelle phrase est juste ?
    · La probabilité que α = 0 est supérieure à 95 %. [p_pvalue_h0]   · α vaut 0. [p_accept_h0]   ✔ Avec 6 points, les données ne suffisent pas à montrer une ordonnée à l'origine non nulle.   · L'élongation est exactement proportionnelle à la masse : c'est prouvé. [p_accept_h0]
    [examen open]
  pièges : p_reg_sigma_n, p_reg_se_alpha, p_df_wrong, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

## Régression multiple, matrice de design, test F emboîté (`p-reg-multi`, BA3)

_Régression multiple : matrice de design, équations normales et test F de modèles emboîtés._

### Niveau 1

```
Le poids y d'un chien dépend de sa taille x, avec une ordonnée propre à chacune de deux races T et H, et la même pente pour les deux races. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  · colonnes [1T, 1H, x·1T, x·1H] [p_design_separate_slopes]   ✔ colonnes [1T, 1H, x]   · colonnes [1, x]   · colonnes [1, 1T, 1H, x] [p_design_collinear]
  pièges : p_design_collinear, p_design_separate_slopes

Le prix y d'un appartement dépend de sa surface x, avec une ordonnée propre à chacun de deux quartiers N et S, et une pente commune. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  ✔ colonnes [1, 1S, x]   · colonnes [1N, 1S, x·1N, x·1S] [p_design_separate_slopes]   · colonnes [1, 1N, 1S, x] [p_design_collinear]   · colonnes [1, x]
  pièges : p_design_collinear, p_design_separate_slopes

Le rendement y d'une culture dépend de la dose d'engrais x, avec un effet propre à chacun de deux sols A et B, et la même pente pour les deux sols. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  · colonnes [1, 1B, x, x·1B] [p_design_separate_slopes]   · colonnes [1A, 1B]   · colonnes [1, 1A, 1B, x] [p_design_collinear]   ✔ colonnes [1, 1B, x]
  pièges : p_design_collinear, p_design_separate_slopes

```

### Niveau 2

```
Le prix y d'un appartement dépend de sa surface x, avec une ordonnée propre à chacun de deux quartiers N et S, et une pente commune. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  ✔ colonnes [1, 1S, x]   · colonnes [1N, 1S, x·1N, x·1S] [p_design_separate_slopes]   · colonnes [1, x]   · colonnes [1, 1N, 1S, x] [p_design_collinear]
  pièges : p_design_collinear, p_design_separate_slopes

Le poids y d'un chien dépend de sa taille x, avec une ordonnée propre à chacune de deux races T et H, et la même pente pour les deux races. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  ✔ colonnes [1T, 1H, x]   · colonnes [1, 1T, 1H, x] [p_design_collinear]   · colonnes [1T, 1H, x·1T, x·1H] [p_design_separate_slopes]   · colonnes [1, x]
  pièges : p_design_collinear, p_design_separate_slopes

Le rendement y d'une culture dépend de la dose d'engrais x, avec un effet propre à chacun de deux sols A et B, et la même pente pour les deux sols. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  ✔ colonnes [1, 1B, x]   · colonnes [1, 1A, 1B, x] [p_design_collinear]   · colonnes [1, 1B, x, x·1B] [p_design_separate_slopes]   · colonnes [1A, 1B]
  pièges : p_design_collinear, p_design_separate_slopes

```

### Niveau 3

```
Modèle y = a + bx, données x : 3, 4, 5, 6, 7 ; y : 11, 9, 8, 11, 6. Avec X = [1, x] : XᵀX = [[5, 25], [25, 135]] et Xᵀy = (45 ; 217). Résous les équations normales XᵀXβ̂ = Xᵀy.
  [tap, suivre l'erreur, menu menu]  det(XᵀX)
    = 5·135 − 25²   ← n·Σx² − (Σx)²
    = 50
  — b̂  [juge prob]  départ : b̂
    = (5·217 − 25·45)/50   ← Deuxième ligne de (XᵀX)⁻¹Xᵀy
    = −0,8
  — â  [juge prob]  départ : â
    = (135·45 − 25·217)/50   ← Première ligne
    = 13
  aides : (XᵀX)⁻¹ = (1/det)·[[Σx², −Σx], [−Σx, n]] ; β̂ = (XᵀX)⁻¹Xᵀy. | det = 5·135 − 25² = □ | b̂ = −0,8, â = 13

Modèle y = a + bx, données x : 3, 4, 5, 6, 7 ; y : 9, 11, 10, 13, 12. Avec X = [1, x] : XᵀX = [[5, 25], [25, 135]] et Xᵀy = (55 ; 283). Résous les équations normales XᵀXβ̂ = Xᵀy.
  [tap, suivre l'erreur, menu menu]  det(XᵀX)
    = 5·135 − 25²   ← n·Σx² − (Σx)²
    = 50
  — b̂  [juge prob]  départ : b̂
    = (5·283 − 25·55)/50   ← Deuxième ligne de (XᵀX)⁻¹Xᵀy
    = 0,8
  — â  [juge prob]  départ : â
    = (135·55 − 25·283)/50   ← Première ligne
    = 7
  aides : (XᵀX)⁻¹ = (1/det)·[[Σx², −Σx], [−Σx, n]] ; β̂ = (XᵀX)⁻¹Xᵀy. | det = 5·135 − 25² = □ | b̂ = 0,8, â = 7

Modèle y = a + bx, données x : 0, 1, 2, 3 ; y : 10, 10, 15, 13. Avec X = [1, x] : XᵀX = [[4, 6], [6, 14]] et Xᵀy = (48 ; 79). Résous les équations normales XᵀXβ̂ = Xᵀy.
  [tap, suivre l'erreur, menu menu]  det(XᵀX)
    = 4·14 − 6²   ← n·Σx² − (Σx)²
    = 20
  — b̂  [juge prob]  départ : b̂
    = (4·79 − 6·48)/20   ← Deuxième ligne de (XᵀX)⁻¹Xᵀy
    = 1,4
  — â  [juge prob]  départ : â
    = (14·48 − 6·79)/20   ← Première ligne
    = 9,9
  aides : (XᵀX)⁻¹ = (1/det)·[[Σx², −Σx], [−Σx, n]] ; β̂ = (XᵀX)⁻¹Xᵀy. | det = 4·14 − 6² = □ | b̂ = 1,4, â = 9,9

```

### Niveau 4

```
n = 30 observations. Modèle complet à p = 4 colonnes : SC_p = 52 ; modèle réduit à q = 1 colonne : SC_q = 61. Test F emboîté au niveau 5 % (H₀ : les 3 coefficients ajoutés sont nuls). Quantile donné : F_{3, 26 ; 0,95} = 2,98.
  [free, suivre l'erreur]  ν_1
    = 4 − 1   ← Paramètres ajoutés
    = 3
  — ν₂  [juge prob]  départ : ν_2
    = 30 − 4   ← Résidus du modèle complet
    = 26
  — F  [juge stat]  départ : F
    = ((61 − 52)/3)/(52/26)   ← Gain par paramètre ajouté, sur la variance résiduelle
    = 3÷2   ← Numérateur et dénominateur
    = 1,5   ← Comparer à 2,98
  aides : Numérateur : gain de SC par paramètre ajouté ; dénominateur : SC du modèle complet par degré de liberté. | F = (9/3)/(52/□) | F = 1,5
  pièges : p_f_df_swap, p_f_ratio_inverted, p_pvalue_h0, p_accept_h0

n = 30 observations. Modèle complet à p = 5 colonnes : SC_p = 25 ; modèle réduit à q = 1 colonne : SC_q = 28. Test F emboîté au niveau 5 % (H₀ : les 4 coefficients ajoutés sont nuls). Quantile donné : F_{4, 25 ; 0,95} = 2,76.
  [free, suivre l'erreur]  ν_1
    = 5 − 1   ← Paramètres ajoutés
    = 4
  — ν₂  [juge prob]  départ : ν_2
    = 30 − 5   ← Résidus du modèle complet
    = 25
  — F  [juge stat]  départ : F
    = ((28 − 25)/4)/(25/25)   ← Gain par paramètre ajouté, sur la variance résiduelle
    = 0,75÷1   ← Numérateur et dénominateur
    = 0,75   ← Comparer à 2,76
  aides : Numérateur : gain de SC par paramètre ajouté ; dénominateur : SC du modèle complet par degré de liberté. | F = (3/4)/(25/□) | F = 0,75
  pièges : p_f_df_swap, p_f_ratio_inverted, p_pvalue_h0, p_accept_h0

n = 16 observations. Modèle complet à p = 4 colonnes : SC_p = 12 ; modèle réduit à q = 2 colonnes : SC_q = 31. Test F emboîté au niveau 5 % (H₀ : les 2 coefficients ajoutés sont nuls). Quantile donné : F_{2, 12 ; 0,95} = 3,89.
  [free, suivre l'erreur]  ν_1
    = 4 − 2   ← Paramètres ajoutés
    = 2
  — ν₂  [juge prob]  départ : ν_2
    = 16 − 4   ← Résidus du modèle complet
    = 12
  — F  [juge stat]  départ : F
    = ((31 − 12)/2)/(12/12)   ← Gain par paramètre ajouté, sur la variance résiduelle
    = 9,5÷1   ← Numérateur et dénominateur
    = 9,5   ← Comparer à 3,89
  aides : Numérateur : gain de SC par paramètre ajouté ; dénominateur : SC du modèle complet par degré de liberté. | F = (19/2)/(12/□) | F = 9,5
  pièges : p_f_df_swap, p_f_ratio_inverted, p_pvalue_h0

```

### Niveau 5

```
n = 20 observations. Modèle complet à p = 3 colonnes : SC_p = 34 ; modèle réduit à q = 2 colonnes : SC_q = 52. Test F emboîté au niveau 5 % (H₀ : le coefficient ajouté est nul). Quantile donné : F_{1, 17 ; 0,95} = 4,45.
  [free, sans aide]  ν_1
    = 3 − 2   ← Paramètres ajoutés
    = 1
  — ν₂  [juge prob]  départ : ν_2
    = 20 − 3   ← Résidus du modèle complet
    = 17
  — F  [juge stat]  départ : F
    = ((52 − 34)/1)/(34/17)   ← Gain par paramètre ajouté, sur la variance résiduelle
    = 18÷2   ← Numérateur et dénominateur
    = 9   ← Comparer à 4,45
  pièges : p_f_df_swap, p_f_ratio_inverted, p_pvalue_h0

n = 30 observations. Modèle complet à p = 4 colonnes : SC_p = 52 ; modèle réduit à q = 1 colonne : SC_q = 58. Test F emboîté au niveau 5 % (H₀ : les 3 coefficients ajoutés sont nuls). Quantile donné : F_{3, 26 ; 0,95} = 2,98.
  [free, sans aide]  ν_1
    = 4 − 1   ← Paramètres ajoutés
    = 3
  — ν₂  [juge prob]  départ : ν_2
    = 30 − 4   ← Résidus du modèle complet
    = 26
  — F  [juge stat]  départ : F
    = ((58 − 52)/3)/(52/26)   ← Gain par paramètre ajouté, sur la variance résiduelle
    = 2÷2   ← Numérateur et dénominateur
    = 1   ← Comparer à 2,98
  pièges : p_f_df_swap, p_f_ratio_inverted, p_accept_h0, p_pvalue_h0

n = 20 observations. Modèle complet à p = 5 colonnes : SC_p = 30 ; modèle réduit à q = 3 colonnes : SC_q = 37. Test F emboîté au niveau 5 % (H₀ : les 2 coefficients ajoutés sont nuls). Quantile donné : F_{2, 15 ; 0,95} = 3,68.
  [free, sans aide]  ν_1
    = 5 − 3   ← Paramètres ajoutés
    = 2
  — ν₂  [juge prob]  départ : ν_2
    = 20 − 5   ← Résidus du modèle complet
    = 15
  — F  [juge stat]  départ : F
    = ((37 − 30)/2)/(30/15)   ← Gain par paramètre ajouté, sur la variance résiduelle
    = 3,5÷2   ← Numérateur et dénominateur
    = 1,75   ← Comparer à 3,68
  pièges : p_f_df_swap, p_f_ratio_inverted, p_accept_h0, p_pvalue_h0

```

### Variantes d'examen

```
Le poids y d'un chien dépend de sa taille x, avec une ordonnée propre à chacune de deux races T et H, et la même pente pour les deux races. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  · colonnes [1, x]   · colonnes [1T, 1H, x·1T, x·1H] [p_design_separate_slopes]   · colonnes [1, 1T, 1H, x] [p_design_collinear]   ✔ colonnes [1T, 1H, x]
  [examen mcq]
  pièges : p_design_collinear, p_design_separate_slopes

Vrai ou faux ?
  « Pour le modèle y = a + bx, la matrice XᵀX (X = [1, x]) est toujours inversible. » → FAUX
    contre-exemple (refute) : a = 1, b = 1
  [examen tf]

n = 20 observations. Modèle complet à p = 3 colonnes : SC_p = 34 ; modèle réduit à q = 1 colonne : SC_q = 38. Test F emboîté au niveau 5 % (H₀ : les 2 coefficients ajoutés sont nuls). Quantile donné : F_{2, 17 ; 0,95} = 3,59. Calcule F (à 0,01 près).
  [free, sans aide, examen coef]  F
    = ((38 − 34)/2)/(34/17)   ← Gain par paramètre ajouté, sur la variance résiduelle
    = 2÷2   ← Numérateur et dénominateur
    = 1   ← Comparer à 3,59
  pièges : p_f_ratio_inverted

```

## Diagnostics d'une régression (`p-reg-diag`, BA3)

_Vérifier les hypothèses d'une régression sur les graphiques des résidus._

### Niveau 1

```
Graphique d'une régression linéaire :résidus en fonction de ŷŷrésidusQuel défaut ce graphique montre-t-il ?
  · des queues lourdes (QQ-plot en S)   ✔ un entonnoir (variance qui grandit)   · des résidus liés dans l'ordre (autocorrélation)

Graphique d'une régression linéaire :résidus en fonction de ŷŷrésidusQuel défaut ce graphique montre-t-il ?
  · une valeur aberrante   ✔ aucun défaut visible   · des résidus liés dans l'ordre (autocorrélation)

Graphique d'une régression linéaire :résidus en fonction de ŷŷrésidusQuel défaut ce graphique montre-t-il ?
  · des résidus liés dans l'ordre (autocorrélation)   ✔ un entonnoir (variance qui grandit)   · aucun défaut visible

```

### Niveau 2

```
Graphique d'une régression linéaire :résidus en fonction de ŷŷrésidusQuel défaut ce graphique montre-t-il ?
  · une courbure (relation non linéaire)   · des queues lourdes (QQ-plot en S)   ✔ une valeur aberrante   · des résidus liés dans l'ordre (autocorrélation)   · aucun défaut visible

Graphique d'une régression linéaire :résidus dans l'ordre des mesuresordre des mesuresrésidusQuel défaut ce graphique montre-t-il ?
  · une courbure (relation non linéaire)   · un entonnoir (variance qui grandit)   · une valeur aberrante   ✔ des résidus liés dans l'ordre (autocorrélation)   · des queues lourdes (QQ-plot en S)

Graphique d'une régression linéaire :résidus dans l'ordre des mesuresordre des mesuresrésidusQuel défaut ce graphique montre-t-il ?
  · un entonnoir (variance qui grandit)   · une courbure (relation non linéaire)   ✔ des résidus liés dans l'ordre (autocorrélation)   · des queues lourdes (QQ-plot en S)   · une valeur aberrante

```

### Niveau 3

```
Deux graphiques d'une régression linéaire :résidus en fonction de ŷŷrésidusQQ-plot des résidusquantiles de N(0, 1)résidus réduitsQuelle hypothèse est violée ?
  · L'absence de points aberrants   · Aucune : les deux graphiques sont sans défaut   ✔ La normalité des erreurs   · La variance constante (homoscédasticité)

Deux graphiques d'une régression linéaire :résidus en fonction de ŷŷrésidusQQ-plot des résidusquantiles de N(0, 1)résidus réduitsQuelle hypothèse est violée ?
  · La normalité des erreurs   · La linéarité   · Aucune : les deux graphiques sont sans défaut   ✔ L'absence de points aberrants

Deux graphiques d'une régression linéaire :résidus en fonction de ŷŷrésidusQQ-plot des résidusquantiles de N(0, 1)résidus réduitsQuelle hypothèse est violée ?
  · La normalité des erreurs   ✔ Aucune : les deux graphiques sont sans défaut   · L'absence de points aberrants   · La linéarité

```

### Niveau 4

```
Régression linéaire, R² = 0,97. Graphique :résidus en fonction de ŷŷrésidusQue faut-il faire ?
  · Tester la normalité de y plutôt que celle des résidus [p_diag_normal_y]   ✔ Vérifier la mesure de ce point ; ne le retirer que si c'est une erreur, et comparer les deux ajustements   · Garder le modèle tel quel : R² = 0,97 montre qu'il est adapté [p_r2_high_good]   · Supprimer le point qui s'écarte le plus, puis refaire l'ajustement [p_outlier_delete]
  pièges : p_diag_normal_y, p_r2_high_good, p_outlier_delete

Régression linéaire, R² = 0,95. Graphique :résidus en fonction de ŷŷrésidusQue faut-il faire ?
  · Tester la normalité de y plutôt que celle des résidus [p_diag_normal_y]   · Garder le modèle tel quel : R² = 0,95 montre qu'il est adapté [p_r2_high_good]   · Supprimer le point qui s'écarte le plus, puis refaire l'ajustement [p_outlier_delete]   ✔ Vérifier la mesure de ce point ; ne le retirer que si c'est une erreur, et comparer les deux ajustements
  pièges : p_diag_normal_y, p_r2_high_good, p_outlier_delete

Régression linéaire, R² = 0,93. Graphique :résidus en fonction de ŷŷrésidusQue faut-il faire ?
  · Supprimer le point qui s'écarte le plus, puis refaire l'ajustement [p_outlier_delete]   · Garder le modèle tel quel : R² = 0,93 montre qu'il est adapté [p_r2_high_good]   · Tester la normalité de y plutôt que celle des résidus [p_diag_normal_y]   ✔ Ajouter un terme en x² (modèle quadratique)
  pièges : p_diag_normal_y, p_r2_high_good, p_outlier_delete

```

### Niveau 5

```
Régression linéaire, R² = 0,95. Graphique :QQ-plot des résidusquantiles de N(0, 1)résidus réduitsQuel diagnostic et quel remède ?
  · Supprimer le point qui s'écarte le plus, puis refaire l'ajustement [p_outlier_delete]   · Vérifier la normalité sur un QQ-plot des valeurs de y, plutôt que des résidus [p_diag_normal_y]   · Garder le modèle tel quel : R² = 0,95 montre qu'il est adapté [p_r2_high_good]   ✔ Hypothèse violée : la normalité des erreurs. Remède : ne pas se fier aux tests t ; utiliser plus de données ou une méthode robuste.
  pièges : p_diag_normal_y, p_r2_high_good, p_outlier_delete

Régression linéaire, R² = 0,95. Graphique :résidus en fonction de ŷŷrésidusQuel diagnostic et quel remède ?
  · Garder le modèle tel quel : R² = 0,95 montre qu'il est adapté [p_r2_high_good]   · Tester la normalité de y plutôt que celle des résidus [p_diag_normal_y]   ✔ Hypothèse violée : l'absence de points aberrants. Remède : vérifier la mesure de ce point ; ne le retirer que si c'est une erreur, et comparer les deux ajustements.   · Supprimer le point qui s'écarte le plus, puis refaire l'ajustement [p_outlier_delete]
  pièges : p_diag_normal_y, p_r2_high_good, p_outlier_delete

Régression linéaire, R² = 0,93. Graphique :résidus en fonction de ŷŷrésidusQuel diagnostic et quel remède ?
  ✔ Hypothèse violée : la variance constante (homoscédasticité). Remède : transformer y (par exemple log y).   · Supprimer le point qui s'écarte le plus, puis refaire l'ajustement [p_outlier_delete]   · Garder le modèle tel quel : R² = 0,93 montre qu'il est adapté [p_r2_high_good]   · Tester la normalité de y plutôt que celle des résidus [p_diag_normal_y]
  pièges : p_diag_normal_y, p_r2_high_good, p_outlier_delete

```

### Variantes d'examen

```
Graphique d'une régression linéaire :résidus dans l'ordre des mesuresordre des mesuresrésidusQuel défaut ce graphique montre-t-il ?
  · des queues lourdes (QQ-plot en S)   · un entonnoir (variance qui grandit)   ✔ des résidus liés dans l'ordre (autocorrélation)   · une courbure (relation non linéaire)   · aucun défaut visible
  [examen mcq]

Vrai ou faux ? On vérifie la normalité sur les valeurs de y plutôt que sur les résidus.
  · Vrai [p_diag_normal_y]   ✔ Faux
  [examen tf]
  pièges : p_diag_normal_y

```

## Modèle Beta-Bernoulli : a posteriori, PM, MAP (`p-bayes-beta`, BA4)

_Le modèle Beta-Bernoulli : loi a posteriori, moyenne a posteriori et MAP._

### Niveau 1

```
Un capteur détecte l'objet 8 fois sur 18 essais. A priori, la probabilité de succès θ suit une loi Beta(2, 1) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [guided]  α′
    (Quelle famille pour la loi a posteriori ? Beta : la loi Beta est conjuguée au modèle de Bernoulli.)
    = 2 + □   (trous : 2 + 8)   ← α′ = α + N (succès)
    = □   (trous : 10)
  — β′  [juge prob]  départ : β′
    = 1 + □   (trous : 1 + 18 − 8)   ← β′ = β + n − N (échecs)
    = □   (trous : 11)
  — PM  [juge prob]  départ : PM
    = 10/(10 + □)   (trous : 10/(10 + 11))   ← Moyenne d'une Beta(α′, β′)
    = 10/21
  — MAP  [juge prob]  départ : MAP
    = (□)/(10 + 11 − 2)   (trous : (10 − 1)/(10 + 11 − 2))   ← Mode d'une Beta
    = 9/19
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(2 + 8, 1 + □) | Beta(10, 11), PM = 10/21, MAP = 9/19
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Une publicité est cliquée 0 fois sur 12 affichages. A priori, la probabilité de succès θ suit une loi Beta(3, 5) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [guided]  α′
    (Quelle famille pour la loi a posteriori ? Beta : la loi Beta est conjuguée au modèle de Bernoulli.)
    = 3 + □   (trous : 3 + 0)   ← α′ = α + N (succès)
    = □   (trous : 3)
  — β′  [juge prob]  départ : β′
    = 5 + □   (trous : 5 + 12 − 0)   ← β′ = β + n − N (échecs)
    = □   (trous : 17)
  — PM  [juge prob]  départ : PM
    = 3/(3 + □)   (trous : 3/(3 + 17))   ← Moyenne d'une Beta(α′, β′)
    = 3/20
  — MAP  [juge prob]  départ : MAP
    = (□)/(3 + 17 − 2)   (trous : (3 − 1)/(3 + 17 − 2))   ← Mode d'une Beta
    = 2/18
    = 1/9
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(3 + 0, 5 + □) | Beta(3, 17), PM = 0,15, MAP = 1/9
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Un capteur détecte l'objet 9 fois sur 20 essais. A priori, la probabilité de succès θ suit une loi Beta(3, 5) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [guided]  α′
    (Quelle famille pour la loi a posteriori ? Beta : la loi Beta est conjuguée au modèle de Bernoulli.)
    = 3 + □   (trous : 3 + 9)   ← α′ = α + N (succès)
    = □   (trous : 12)
  — β′  [juge prob]  départ : β′
    = 5 + □   (trous : 5 + 20 − 9)   ← β′ = β + n − N (échecs)
    = □   (trous : 16)
  — PM  [juge prob]  départ : PM
    = 12/(12 + □)   (trous : 12/(12 + 16))   ← Moyenne d'une Beta(α′, β′)
    = 12/28
    = 3/7
  — MAP  [juge prob]  départ : MAP
    = (□)/(12 + 16 − 2)   (trous : (12 − 1)/(12 + 16 − 2))   ← Mode d'une Beta
    = 11/26
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(3 + 9, 5 + □) | Beta(12, 16), PM = 3/7, MAP = 11/26
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

```

### Niveau 2

```
Un capteur détecte l'objet 1 fois sur 7 essais. A priori, la probabilité de succès θ suit une loi Beta(4, 1) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [guided]  α′
    ? Quelle famille pour la loi a posteriori ? ✔ Beta : la loi Beta est conjuguée au modèle de Bernoulli / · Binomiale, comme les données
    = 4 + □   (trous : 4 + 1)   ← α′ = α + N (succès)
    = □   (trous : 5)
  — β′  [juge prob]  départ : β′
    = 1 + □   (trous : 1 + 7 − 1)   ← β′ = β + n − N (échecs)
    = □   (trous : 7)
  — PM  [juge prob]  départ : PM
    = 5/(5 + □)   (trous : 5/(5 + 7))   ← Moyenne d'une Beta(α′, β′)
    = 5/12
  — MAP  [juge prob]  départ : MAP
    = (□)/(5 + 7 − 2)   (trous : (5 − 1)/(5 + 7 − 2))   ← Mode d'une Beta
    = 4/10
    = 2/5
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(4 + 1, 1 + □) | Beta(5, 7), PM = 5/12, MAP = 0,4
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Un joueur de basket réussit 3 tirs sur 4. A priori, la probabilité de succès θ suit une loi Beta(2, 5) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [guided]  α′
    ? Quelle famille pour la loi a posteriori ? ✔ Beta : la loi Beta est conjuguée au modèle de Bernoulli / · Binomiale, comme les données
    = 2 + □   (trous : 2 + 3)   ← α′ = α + N (succès)
    = □   (trous : 5)
  — β′  [juge prob]  départ : β′
    = 5 + □   (trous : 5 + 4 − 3)   ← β′ = β + n − N (échecs)
    = □   (trous : 6)
  — PM  [juge prob]  départ : PM
    = 5/(5 + □)   (trous : 5/(5 + 6))   ← Moyenne d'une Beta(α′, β′)
    = 5/11
  — MAP  [juge prob]  départ : MAP
    = (□)/(5 + 6 − 2)   (trous : (5 − 1)/(5 + 6 − 2))   ← Mode d'une Beta
    = 4/9
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(2 + 3, 5 + □) | Beta(5, 6), PM = 5/11, MAP = 4/9
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Une pièce donne 4 piles sur 16 lancers. A priori, la probabilité de succès θ suit une loi Beta(5, 4) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [guided]  α′
    ? Quelle famille pour la loi a posteriori ? ✔ Beta : la loi Beta est conjuguée au modèle de Bernoulli / · Binomiale, comme les données
    = 5 + □   (trous : 5 + 4)   ← α′ = α + N (succès)
    = □   (trous : 9)
  — β′  [juge prob]  départ : β′
    = 4 + □   (trous : 4 + 16 − 4)   ← β′ = β + n − N (échecs)
    = □   (trous : 16)
  — PM  [juge prob]  départ : PM
    = 9/(9 + □)   (trous : 9/(9 + 16))   ← Moyenne d'une Beta(α′, β′)
    = 9/25
  — MAP  [juge prob]  départ : MAP
    = (□)/(9 + 16 − 2)   (trous : (9 − 1)/(9 + 16 − 2))   ← Mode d'une Beta
    = 8/23
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(5 + 4, 4 + □) | Beta(9, 16), PM = 0,36, MAP = 8/23
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

```

### Niveau 3

```
Une publicité est cliquée 1 fois sur 8 affichages. A priori, la probabilité de succès θ suit une loi Beta(5, 2) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [tap, suivre l'erreur, menu menu]  α′
    = 5 + 1   ← α′ = α + N (succès)
    = 6
  — β′  [juge prob]  départ : β′
    = 2 + 8 − 1   ← β′ = β + n − N (échecs)
    = 9
  — PM  [juge prob]  départ : PM
    = 6/(6 + 9)   ← Moyenne d'une Beta(α′, β′)
    = 6/15
    = 2/5
  — MAP  [juge prob]  départ : MAP
    = (6 − 1)/(6 + 9 − 2)   ← Mode d'une Beta
    = 5/13
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(5 + 1, 2 + □) | Beta(6, 9), PM = 0,4, MAP = 5/13
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Un capteur détecte l'objet 5 fois sur 11 essais. A priori, la probabilité de succès θ suit une loi Beta(3, 3) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [tap, suivre l'erreur, menu menu]  α′
    = 3 + 5   ← α′ = α + N (succès)
    = 8
  — β′  [juge prob]  départ : β′
    = 3 + 11 − 5   ← β′ = β + n − N (échecs)
    = 9
  — PM  [juge prob]  départ : PM
    = 8/(8 + 9)   ← Moyenne d'une Beta(α′, β′)
    = 8/17
  — MAP  [juge prob]  départ : MAP
    = (8 − 1)/(8 + 9 − 2)   ← Mode d'une Beta
    = 7/15
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(3 + 5, 3 + □) | Beta(8, 9), PM = 8/17, MAP = 7/15
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Une publicité est cliquée 14 fois sur 18 affichages. A priori, la probabilité de succès θ suit une loi Beta(1, 3) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [tap, suivre l'erreur, menu menu]  α′
    = 1 + 14   ← α′ = α + N (succès)
    = 15
  — β′  [juge prob]  départ : β′
    = 3 + 18 − 14   ← β′ = β + n − N (échecs)
    = 7
  — PM  [juge prob]  départ : PM
    = 15/(15 + 7)   ← Moyenne d'une Beta(α′, β′)
    = 15/22
  — MAP  [juge prob]  départ : MAP
    = (15 − 1)/(15 + 7 − 2)   ← Mode d'une Beta
    = 14/20
    = 7/10
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(1 + 14, 3 + □) | Beta(15, 7), PM = 15/22, MAP = 0,7
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

```

### Niveau 4

```
Un joueur de basket réussit 14 tirs sur 19. A priori, la probabilité de succès θ suit une loi Beta(2, 4) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP), puis sa variance.
  [free, suivre l'erreur]  α′
    = 2 + 14   ← α′ = α + N (succès)
    = 16
  — β′  [juge prob]  départ : β′
    = 4 + 19 − 14   ← β′ = β + n − N (échecs)
    = 9
  — PM  [juge prob]  départ : PM
    = 16/(16 + 9)   ← Moyenne d'une Beta(α′, β′)
    = 16/25
  — MAP  [juge prob]  départ : MAP
    = (16 − 1)/(16 + 9 − 2)   ← Mode d'une Beta
    = 15/23
  — Var  [juge prob]  départ : Var
    = 16/25·(1 − 16/25)/(1 + 16 + 9)   ← PM(1 − PM)/(1 + α′ + β′)
    = 72/8125
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(2 + 14, 4 + □) | Beta(16, 9), PM = 0,64, MAP = 15/23
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Une pièce donne 3 piles sur 5 lancers. A priori, la probabilité de succès θ suit une loi Beta(1, 4) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP), puis sa variance.
  [free, suivre l'erreur]  α′
    = 1 + 3   ← α′ = α + N (succès)
    = 4
  — β′  [juge prob]  départ : β′
    = 4 + 5 − 3   ← β′ = β + n − N (échecs)
    = 6
  — PM  [juge prob]  départ : PM
    = 4/(4 + 6)   ← Moyenne d'une Beta(α′, β′)
    = 4/10
    = 2/5
  — MAP  [juge prob]  départ : MAP
    = (4 − 1)/(4 + 6 − 2)   ← Mode d'une Beta
    = 3/8
  — Var  [juge prob]  départ : Var
    = 2/5·(1 − 2/5)/(1 + 4 + 6)   ← PM(1 − PM)/(1 + α′ + β′)
    = 6/275
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(1 + 3, 4 + □) | Beta(4, 6), PM = 0,4, MAP = 0,375
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Une publicité est cliquée 4 fois sur 16 affichages. A priori, la probabilité de succès θ suit une loi Beta(3, 2) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP), puis sa variance.
  [free, suivre l'erreur]  α′
    = 3 + 4   ← α′ = α + N (succès)
    = 7
  — β′  [juge prob]  départ : β′
    = 2 + 16 − 4   ← β′ = β + n − N (échecs)
    = 14
  — PM  [juge prob]  départ : PM
    = 7/(7 + 14)   ← Moyenne d'une Beta(α′, β′)
    = 7/21
    = 1/3
  — MAP  [juge prob]  départ : MAP
    = (7 − 1)/(7 + 14 − 2)   ← Mode d'une Beta
    = 6/19
  — Var  [juge prob]  départ : Var
    = 1/3·(1 − 1/3)/(1 + 7 + 14)   ← PM(1 − PM)/(1 + α′ + β′)
    = 1/99
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(3 + 4, 2 + □) | Beta(7, 14), PM = 1/3, MAP = 6/19
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

```

### Niveau 5

```
Une publicité est cliquée 13 fois sur 14 affichages. A priori, la probabilité de succès θ suit une loi Beta(3, 4) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP), puis sa variance, et compare au MLE.
  [free, sans aide]  α′
    = 3 + 13   ← α′ = α + N (succès)
    = 16
  — β′  [juge prob]  départ : β′
    = 4 + 14 − 13   ← β′ = β + n − N (échecs)
    = 5
  — PM  [juge prob]  départ : PM
    = 16/(16 + 5)   ← Moyenne d'une Beta(α′, β′)
    = 16/21
  — MAP  [juge prob]  départ : MAP
    = (16 − 1)/(16 + 5 − 2)   ← Mode d'une Beta
    = 15/19
  — Var  [juge prob]  départ : Var
    = 16/21·(1 − 16/21)/(1 + 16 + 5)   ← PM(1 − PM)/(1 + α′ + β′)
    = 40/4851
  — Comparer : le MLE N/n  [juge prob]  départ : MLE
    = 13/14   ← Le MLE ignore l'a priori
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Une publicité est cliquée 5 fois sur 11 affichages. A priori, la probabilité de succès θ suit une loi Beta(5, 2) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP), puis sa variance, et compare au MLE.
  [free, sans aide]  α′
    = 5 + 5   ← α′ = α + N (succès)
    = 10
  — β′  [juge prob]  départ : β′
    = 2 + 11 − 5   ← β′ = β + n − N (échecs)
    = 8
  — PM  [juge prob]  départ : PM
    = 10/(10 + 8)   ← Moyenne d'une Beta(α′, β′)
    = 10/18
    = 5/9
  — MAP  [juge prob]  départ : MAP
    = (10 − 1)/(10 + 8 − 2)   ← Mode d'une Beta
    = 9/16
  — Var  [juge prob]  départ : Var
    = 5/9·(1 − 5/9)/(1 + 10 + 8)   ← PM(1 − PM)/(1 + α′ + β′)
    = 20/1539
  — Comparer : le MLE N/n  [juge prob]  départ : MLE
    = 5/11   ← Le MLE ignore l'a priori
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Une pièce donne 4 piles sur 6 lancers. A priori, la probabilité de succès θ suit une loi Beta(5, 5) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP), puis sa variance, et compare au MLE.
  [free, sans aide]  α′
    = 5 + 4   ← α′ = α + N (succès)
    = 9
  — β′  [juge prob]  départ : β′
    = 5 + 6 − 4   ← β′ = β + n − N (échecs)
    = 7
  — PM  [juge prob]  départ : PM
    = 9/(9 + 7)   ← Moyenne d'une Beta(α′, β′)
    = 9/16
  — MAP  [juge prob]  départ : MAP
    = (9 − 1)/(9 + 7 − 2)   ← Mode d'une Beta
    = 8/14
    = 4/7
  — Var  [juge prob]  départ : Var
    = 9/16·(1 − 9/16)/(1 + 9 + 7)   ← PM(1 − PM)/(1 + α′ + β′)
    = 63/4352
  — Comparer : le MLE N/n  [juge prob]  départ : MLE
    = 4/6   ← Le MLE ignore l'a priori
    = 2/3
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

```

### Variantes d'examen

```
Une pièce donne 0 piles sur 2 lancers. A priori, la probabilité de succès θ suit une loi Beta(3, 5) ; les essais sont indépendants. Moyenne a posteriori (PM) et mode a posteriori (MAP) de θ ?
  · PM = 0,25 ; MAP = 0,25 [p_map_pm_confused]   ✔ PM = 0,3 ; MAP = 0,25   · PM = 0,25 ; MAP = 0,3 [p_map_pm_confused]   · PM = 0,3 ; MAP = 0,3 [p_map_pm_confused]
  [examen mcq]
  pièges : p_map_pm_confused

Vrai ou faux ?
  « Avec un a priori uniforme, la moyenne a posteriori (N + 1)/(n + 2) est égale au MLE N/n. » → FAUX
    contre-exemple (refute) : N = 3, n = 4
  [examen tf]
  pièges : p_map_pm_confused

```

## Modèle gaussien-gaussien (`p-bayes-gauss`, BA4)

_Le modèle gaussien-gaussien : les précisions s'additionnent, la moyenne a posteriori est une moyenne pondérée._

### Niveau 1

```
A priori θ ~ N(1,7 ; 2). Chaque mesure suit N(θ ; 2), les mesures sont indépendantes. On observe 3 mesures de moyenne x̄ = 3,7. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [guided]  1/τ²
    = 1/□   (trous : 1/2)   ← Inverse de la variance a priori
  — Précision des données  [juge prob]  départ : n/σ²
    = □/2   (trous : 3/2)   ← n mesures de variance σ²
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1/2 + □)   (trous : 1/(1/2 + 3/2))   ← Les précisions s'additionnent
    = □   (trous : 1/2)
  — μpost  [juge prob]  départ : μ_post
    = (1/2·1,7 + 3/2·□)/(2)   (trous : (1/2·1,7 + 3/2·3,7)/(2))   ← Moyenne pondérée de μ₀ et x̄
    = □   (trous : 3,2)
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(0,5 + □) | σ²_post = 0,5, μ_post = 3,2
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(5,2 ; 1). Chaque mesure suit N(θ ; 2), les mesures sont indépendantes. On observe une mesure x = 2,2. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [guided]  1/τ²
    = □/1   (trous : 1/1)   ← Inverse de la variance a priori
    = 1
  — Précision des données  [juge prob]  départ : n/σ²
    = □/2   (trous : 1/2)   ← n mesures de variance σ²
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1 + □)   (trous : 1/(1 + 1/2))   ← Les précisions s'additionnent
    = □   (trous : 2/3)
  — μpost  [juge prob]  départ : μ_post
    = (1·5,2 + 1/2·□)/(3/2)   (trous : (1·5,2 + 1/2·2,2)/(3/2))   ← Moyenne pondérée de μ₀ et x̄
    = □   (trous : 4,2)
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(1 + □) | σ²_post = 2/3, μ_post = 4,2
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(2,2 ; 4). Chaque mesure suit N(θ ; 2), les mesures sont indépendantes. On observe une mesure x = 3,7. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [guided]  1/τ²
    = 1/□   (trous : 1/4)   ← Inverse de la variance a priori
  — Précision des données  [juge prob]  départ : n/σ²
    = □/2   (trous : 1/2)   ← n mesures de variance σ²
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1/4 + □)   (trous : 1/(1/4 + 1/2))   ← Les précisions s'additionnent
    = □   (trous : 4/3)
  — μpost  [juge prob]  départ : μ_post
    = (1/4·2,2 + 1/2·□)/(3/4)   (trous : (1/4·2,2 + 1/2·3,7)/(3/4))   ← Moyenne pondérée de μ₀ et x̄
    = □   (trous : 3,2)
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(0,25 + □) | σ²_post = 4/3, μ_post = 3,2
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

```

### Niveau 2

```
A priori θ ~ N(6 ; 2). Chaque mesure suit N(θ ; 0,5), les mesures sont indépendantes. On observe une mesure x = 3,9. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [guided]  1/τ²
    = 1/□   (trous : 1/2)   ← Inverse de la variance a priori
  — Précision des données  [juge prob]  départ : n/σ²
    = □/0,5   (trous : 1/0,5)   ← n mesures de variance σ²
    = 2
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1/□ + 2)   (trous : 1/(1/2 + 2))   ← Les précisions s'additionnent
    = □   (trous : 2/5)
  — μpost  [juge prob]  départ : μ_post
    = (1/2·6 + 2·□)/(5/2)   (trous : (1/2·6 + 2·3,9)/(5/2))   ← Moyenne pondérée de μ₀ et x̄
    = □   (trous : 4,32)
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(0,5 + □) | σ²_post = 0,4, μ_post = 4,32
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(4,4 ; 1). Chaque mesure suit N(θ ; 0,25), les mesures sont indépendantes. On observe 5 mesures de moyenne x̄ = 2,6. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [guided]  1/τ²
    = □/1   (trous : 1/1)   ← Inverse de la variance a priori
    = 1
  — Précision des données  [juge prob]  départ : n/σ²
    = □/0,25   (trous : 5/0,25)   ← n mesures de variance σ²
    = 20
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1 + □)   (trous : 1/(1 + 20))   ← Les précisions s'additionnent
    = □   (trous : 1/21)
  — μpost  [juge prob]  départ : μ_post
    = (1·4,4 + 20·□)/(21)   (trous : (1·4,4 + 20·2,6)/(21))   ← Moyenne pondérée de μ₀ et x̄
    = □   (trous : 94/35)
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(1 + □) | σ²_post = 1/21, μ_post = 94/35
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(2,2 ; 0,25). Chaque mesure suit N(θ ; 0,25), les mesures sont indépendantes. On observe 5 mesures de moyenne x̄ = 3,8. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [guided]  1/τ²
    = 1/□   (trous : 1/0,25)   ← Inverse de la variance a priori
    = 4
  — Précision des données  [juge prob]  départ : n/σ²
    = □/0,25   (trous : 5/0,25)   ← n mesures de variance σ²
    = 20
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(4 + □)   (trous : 1/(4 + 20))   ← Les précisions s'additionnent
    = □   (trous : 1/24)
  — μpost  [juge prob]  départ : μ_post
    = (4·2,2 + 20·□)/(24)   (trous : (4·2,2 + 20·3,8)/(24))   ← Moyenne pondérée de μ₀ et x̄
    = □   (trous : 53/15)
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(4 + □) | σ²_post = 1/24, μ_post = 53/15
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

```

### Niveau 3

```
A priori θ ~ N(2,6 ; 4). Chaque mesure suit N(θ ; 4), les mesures sont indépendantes. On observe 3 mesures de moyenne x̄ = 2,1. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [tap, suivre l'erreur, menu menu]  1/τ²
    = 1/4   ← Inverse de la variance a priori
  — Précision des données  [juge prob]  départ : n/σ²
    = 3/4   ← n mesures de variance σ²
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1/4 + 3/4)   ← Les précisions s'additionnent
    = 1
  — μpost  [juge prob]  départ : μ_post
    = (1/4·2,6 + 3/4·2,1)/(1)   ← Moyenne pondérée de μ₀ et x̄
    = 2,225
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(0,25 + □) | σ²_post = 1, μ_post = 2,225
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(5,9 ; 4). Chaque mesure suit N(θ ; 4), les mesures sont indépendantes. On observe 5 mesures de moyenne x̄ = 4,5. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [tap, suivre l'erreur, menu menu]  1/τ²
    = 1/4   ← Inverse de la variance a priori
  — Précision des données  [juge prob]  départ : n/σ²
    = 5/4   ← n mesures de variance σ²
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1/4 + 5/4)   ← Les précisions s'additionnent
    = 2/3
  — μpost  [juge prob]  départ : μ_post
    = (1/4·5,9 + 5/4·4,5)/(3/2)   ← Moyenne pondérée de μ₀ et x̄
    = 71/15
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(0,25 + □) | σ²_post = 2/3, μ_post = 71/15
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(2 ; 1). Chaque mesure suit N(θ ; 0,25), les mesures sont indépendantes. On observe 3 mesures de moyenne x̄ = 2,5. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [tap, suivre l'erreur, menu menu]  1/τ²
    = 1/1   ← Inverse de la variance a priori
    = 1
  — Précision des données  [juge prob]  départ : n/σ²
    = 3/0,25   ← n mesures de variance σ²
    = 12
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1 + 12)   ← Les précisions s'additionnent
    = 1/13
  — μpost  [juge prob]  départ : μ_post
    = (1·2 + 12·2,5)/(13)   ← Moyenne pondérée de μ₀ et x̄
    = 32/13
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(1 + □) | σ²_post = 1/13, μ_post = 32/13
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

```

### Niveau 4

```
A priori θ ~ N(5,4 ; 0,25). Chaque mesure suit N(θ ; 0,5), les mesures sont indépendantes. On observe 5 mesures de moyenne x̄ = 5,8. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [free, suivre l'erreur]  1/τ²
    = 1/0,25   ← Inverse de la variance a priori
    = 4
  — Précision des données  [juge prob]  départ : n/σ²
    = 5/0,5   ← n mesures de variance σ²
    = 10
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(4 + 10)   ← Les précisions s'additionnent
    = 1/14
  — μpost  [juge prob]  départ : μ_post
    = (4·5,4 + 10·5,8)/(14)   ← Moyenne pondérée de μ₀ et x̄
    = 199/35
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(4 + □) | σ²_post = 1/14, μ_post = 199/35
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(4,5 ; 4). Chaque mesure suit N(θ ; 1), les mesures sont indépendantes. On observe 4 mesures de moyenne x̄ = 1,1. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [free, suivre l'erreur]  1/τ²
    = 1/4   ← Inverse de la variance a priori
  — Précision des données  [juge prob]  départ : n/σ²
    = 4/1   ← n mesures de variance σ²
    = 4
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1/4 + 4)   ← Les précisions s'additionnent
    = 4/17
  — μpost  [juge prob]  départ : μ_post
    = (1/4·4,5 + 4·1,1)/(17/4)   ← Moyenne pondérée de μ₀ et x̄
    = 1,3
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(0,25 + □) | σ²_post = 4/17, μ_post = 1,3
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(2 ; 0,25). Chaque mesure suit N(θ ; 0,5), les mesures sont indépendantes. On observe 5 mesures de moyenne x̄ = 3. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [free, suivre l'erreur]  1/τ²
    = 1/0,25   ← Inverse de la variance a priori
    = 4
  — Précision des données  [juge prob]  départ : n/σ²
    = 5/0,5   ← n mesures de variance σ²
    = 10
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(4 + 10)   ← Les précisions s'additionnent
    = 1/14
  — μpost  [juge prob]  départ : μ_post
    = (4·2 + 10·3)/(14)   ← Moyenne pondérée de μ₀ et x̄
    = 19/7
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(4 + □) | σ²_post = 1/14, μ_post = 19/7
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

```

### Niveau 5

```
A priori θ ~ N(4,9 ; 0,25). Chaque mesure suit N(θ ; 0,25), les mesures sont indépendantes. On observe 2 mesures de moyenne x̄ = 2,2. Donne la loi a posteriori N(μ_post ; σ²_post). Puis, avec le même a priori et le même σ², combien de mesures faut-il au minimum pour que σ²_post < 0,5 ?
  [free, sans aide]  1/τ²
    = 1/0,25   ← Inverse de la variance a priori
    = 4
  — Précision des données  [juge prob]  départ : n/σ²
    = 2/0,25   ← n mesures de variance σ²
    = 8
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(4 + 8)   ← Les précisions s'additionnent
    = 1/12
  — μpost  [juge prob]  départ : μ_post
    = (4·4,9 + 8·2,2)/(12)   ← Moyenne pondérée de μ₀ et x̄
    = 3,1
  — Nombre minimal de mesures pour σ²_post   [juge prob]  départ : n_min
    = 0   ← 1/(4 + n/0,25) < 0,5
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg, p_precision_n

A priori θ ~ N(5,2 ; 2). Chaque mesure suit N(θ ; 4), les mesures sont indépendantes. On observe 6 mesures de moyenne x̄ = 4,7. Donne la loi a posteriori N(μ_post ; σ²_post). Puis, avec le même a priori et le même σ², combien de mesures faut-il au minimum pour que σ²_post < 0,05 ?
  [free, sans aide]  1/τ²
    = 1/2   ← Inverse de la variance a priori
  — Précision des données  [juge prob]  départ : n/σ²
    = 6/4   ← n mesures de variance σ²
    = 3/2
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1/2 + 3/2)   ← Les précisions s'additionnent
    = 1/2
  — μpost  [juge prob]  départ : μ_post
    = (1/2·5,2 + 3/2·4,7)/(2)   ← Moyenne pondérée de μ₀ et x̄
    = 4,825
  — Nombre minimal de mesures pour σ²_post   [juge prob]  départ : n_min
    = 79   ← 1/(0,5 + n/4) < 0,05
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg, p_precision_n

A priori θ ~ N(1,9 ; 1). Chaque mesure suit N(θ ; 0,5), les mesures sont indépendantes. On observe 4 mesures de moyenne x̄ = 2,7. Donne la loi a posteriori N(μ_post ; σ²_post). Puis, avec le même a priori et le même σ², combien de mesures faut-il au minimum pour que σ²_post < 0,1 ?
  [free, sans aide]  1/τ²
    = 1/1   ← Inverse de la variance a priori
    = 1
  — Précision des données  [juge prob]  départ : n/σ²
    = 4/0,5   ← n mesures de variance σ²
    = 8
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1 + 8)   ← Les précisions s'additionnent
    = 1/9
  — μpost  [juge prob]  départ : μ_post
    = (1·1,9 + 8·2,7)/(9)   ← Moyenne pondérée de μ₀ et x̄
    = 47/18
  — Nombre minimal de mesures pour σ²_post   [juge prob]  départ : n_min
    = 5   ← 1/(1 + n/0,5) < 0,1
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg, p_precision_n

```

### Variantes d'examen

```
A priori θ ~ N(10 ; 1) ; chaque mesure suit N(θ ; 1), indépendantes. Nombre minimal n de mesures pour que la variance a posteriori soit < 0,05 ?
  · 19 [p_precision_n]   ✔ 20   · 21 [p_precision_n]   · 41 [p_gauss_post_var_add]
  [examen mcq]
  pièges : p_precision_n, p_gauss_post_var_add

Vrai ou faux ?
  « Dans le modèle gaussien-gaussien, quand le nombre n de mesures tend vers l'infini, la moyenne a posteriori tend vers x̄. » → VRAI
  [examen tf]

```

## Lois conjuguées ; Dirichlet-multinomiale (`p-bayes-conjugate`, BA4)

_Lois a priori conjuguées, et la mise à jour d'une loi de Dirichlet par des comptes multinomiaux._

### Niveau 1

```
Une expérience a 3 issues de probabilités (1/2 ; 1/3 ; 1/6). On la répète n = 3 fois, indépendamment. Probabilité d'obtenir les comptes (2, 1, 0) ?
  [guided]  coef
    = □/(2!·1!·0!)   (trous : 3!/(2!·1!·0!))   ← Ordres possibles des issues
    = □   (trous : 3)
  — Pr  [juge prob]  départ : Pr
    = □·(1/2)²·(1/3)¹   (trous : 3·(1/2)²·(1/3)¹)   ← Coefficient × produit des probabilités
    = □   (trous : 1/4)
  aides : Une suite précise a la probabilité Π θₖ^(Nₖ) ; il y a n!/(N₁!···N_K!) suites. | 3!/(2!×1!×0!) × □ | 1/4
  pièges : p_multinomial_no_coef

Une expérience a 3 issues de probabilités (1/2 ; 1/4 ; 1/4). On la répète n = 4 fois, indépendamment. Probabilité d'obtenir les comptes (2, 0, 2) ?
  [guided]  coef
    = □/(2!·0!·2!)   (trous : 4!/(2!·0!·2!))   ← Ordres possibles des issues
    = □   (trous : 6)
  — Pr  [juge prob]  départ : Pr
    = □·(1/2)²·(1/4)²   (trous : 6·(1/2)²·(1/4)²)   ← Coefficient × produit des probabilités
    = □   (trous : 3/32)
  aides : Une suite précise a la probabilité Π θₖ^(Nₖ) ; il y a n!/(N₁!···N_K!) suites. | 4!/(2!×0!×2!) × □ | 3/32
  pièges : p_multinomial_no_coef

Une expérience a 3 issues de probabilités (1/3 ; 1/3 ; 1/3). On la répète n = 3 fois, indépendamment. Probabilité d'obtenir les comptes (2, 0, 1) ?
  [guided]  coef
    = □/(2!·0!·1!)   (trous : 3!/(2!·0!·1!))   ← Ordres possibles des issues
    = □   (trous : 3)
  — Pr  [juge prob]  départ : Pr
    = □·(1/3)²·(1/3)¹   (trous : 3·(1/3)²·(1/3)¹)   ← Coefficient × produit des probabilités
    = □   (trous : 1/9)
  aides : Une suite précise a la probabilité Π θₖ^(Nₖ) ; il y a n!/(N₁!···N_K!) suites. | 3!/(2!×0!×1!) × □ | 1/9
  pièges : p_multinomial_no_coef

```

### Niveau 2

```
3 catégories : rouge, vert, bleu. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(2, 2, 1). On observe les comptes (1, 4, 0) sur n = 5 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [guided]  α′₁
    (A posteriori : Dir(3, 6, 1).)
    ? Quelle loi a posteriori ? ✔ Dirichlet : on ajoute les comptes aux paramètres (loi conjuguée) / · Multinomiale, comme les données
    = 2 + □   (trous : 2 + 1)   ← α₁ + N₁
    = 3
  — α₀+n  [juge prob]  départ : α_0 + n
    = □ + 5   (trous : 5 + 5)   ← α₀ = 2 + 2 + 1
    = 10
  — PM₁  [juge prob]  départ : PM_1
    = 3/□   (trous : 3/10)   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (□ − 1)/(10 − 3)   (trous : (3 − 1)/(10 − 3))   ← Mode a posteriori
    = 2/7
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (2 + 1)/(5 + □) | PM₁ = 0,3, MAP₁ = 2/7
  pièges : p_dirichlet_alpha0, p_map_pm_confused

4 catégories : vélo, bus, train, voiture. A priori, θ = (θ₁, θ₂, θ₃, θ₄) suit une loi de Dirichlet Dir(3, 1, 1, 1). On observe les comptes (2, 1, 1, 3) sur n = 7 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [guided]  α′₁
    (A posteriori : Dir(5, 2, 2, 4).)
    ? Quelle loi a posteriori ? ✔ Dirichlet : on ajoute les comptes aux paramètres (loi conjuguée) / · Multinomiale, comme les données
    = 3 + □   (trous : 3 + 2)   ← α₁ + N₁
    = 5
  — α₀+n  [juge prob]  départ : α_0 + n
    = 6 + □   (trous : 6 + 7)   ← α₀ = 3 + 1 + 1 + 1
    = 13
  — PM₁  [juge prob]  départ : PM_1
    = 5/□   (trous : 5/13)   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (5 − 1)/(13 − □)   (trous : (5 − 1)/(13 − 4))   ← Mode a posteriori
    = 4/9
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (3 + 2)/(6 + □) | PM₁ = 5/13, MAP₁ = 4/9
  pièges : p_dirichlet_alpha0, p_map_pm_confused

3 catégories : pluie, nuages, soleil. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(2, 2, 1). On observe les comptes (1, 1, 6) sur n = 8 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [guided]  α′₁
    (A posteriori : Dir(3, 3, 7).)
    ? Quelle loi a posteriori ? ✔ Dirichlet : on ajoute les comptes aux paramètres (loi conjuguée) / · Multinomiale, comme les données
    = 2 + □   (trous : 2 + 1)   ← α₁ + N₁
    = 3
  — α₀+n  [juge prob]  départ : α_0 + n
    = 5 + □   (trous : 5 + 8)   ← α₀ = 2 + 2 + 1
    = 13
  — PM₁  [juge prob]  départ : PM_1
    = 3/□   (trous : 3/13)   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (□ − 1)/(13 − 3)   (trous : (3 − 1)/(13 − 3))   ← Mode a posteriori
    = 2/10
    = 1/5
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (2 + 1)/(5 + □) | PM₁ = 3/13, MAP₁ = 0,2
  pièges : p_dirichlet_alpha0, p_map_pm_confused

```

### Niveau 3

```
3 catégories : rouge, vert, bleu. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(2, 2, 1). On observe les comptes (2, 6, 2) sur n = 10 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [tap, suivre l'erreur, menu menu]  α′₁
    ? Quelle loi a posteriori ? ✔ Dirichlet : on ajoute les comptes aux paramètres (loi conjuguée) / · Multinomiale, comme les données
    = 2 + 2   ← α₁ + N₁
    = 4
  — α₀+n  [juge prob]  départ : α_0 + n
    = 5 + 10   ← α₀ = 2 + 2 + 1
    = 15
  — PM₁  [juge prob]  départ : PM_1
    = 4/15   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (4 − 1)/(15 − 3)   ← Mode a posteriori
    = 3/12
    = 1/4
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (2 + 2)/(5 + □) | PM₁ = 4/15, MAP₁ = 0,25
  pièges : p_dirichlet_alpha0, p_map_pm_confused

4 catégories : vélo, bus, train, voiture. A priori, θ = (θ₁, θ₂, θ₃, θ₄) suit une loi de Dirichlet Dir(3, 3, 3, 3). On observe les comptes (4, 1, 1, 2) sur n = 8 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [tap, suivre l'erreur, menu menu]  α′₁
    ? Quelle loi a posteriori ? ✔ Dirichlet : on ajoute les comptes aux paramètres (loi conjuguée) / · Multinomiale, comme les données
    = 3 + 4   ← α₁ + N₁
    = 7
  — α₀+n  [juge prob]  départ : α_0 + n
    = 12 + 8   ← α₀ = 3 + 3 + 3 + 3
    = 20
  — PM₁  [juge prob]  départ : PM_1
    = 7/20   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (7 − 1)/(20 − 4)   ← Mode a posteriori
    = 6/16
    = 3/8
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (3 + 4)/(12 + □) | PM₁ = 0,35, MAP₁ = 0,375
  pièges : p_dirichlet_alpha0, p_map_pm_confused

4 catégories : vélo, bus, train, voiture. A priori, θ = (θ₁, θ₂, θ₃, θ₄) suit une loi de Dirichlet Dir(1, 2, 2, 1). On observe les comptes (1, 3, 1, 3) sur n = 8 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [tap, suivre l'erreur, menu menu]  α′₁
    ? Quelle loi a posteriori ? ✔ Dirichlet : on ajoute les comptes aux paramètres (loi conjuguée) / · Multinomiale, comme les données
    = 1 + 1   ← α₁ + N₁
    = 2
  — α₀+n  [juge prob]  départ : α_0 + n
    = 6 + 8   ← α₀ = 1 + 2 + 2 + 1
    = 14
  — PM₁  [juge prob]  départ : PM_1
    = 2/14   ← Moyenne a posteriori
    = 1/7
  — MAP₁  [juge prob]  départ : MAP_1
    = (2 − 1)/(14 − 4)   ← Mode a posteriori
    = 1/10
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (1 + 1)/(6 + □) | PM₁ = 1/7, MAP₁ = 0,1
  pièges : p_dirichlet_alpha0, p_map_pm_confused

```

### Niveau 4

```
4 catégories : vélo, bus, train, voiture. A priori, θ = (θ₁, θ₂, θ₃, θ₄) suit une loi de Dirichlet Dir(1, 2, 2, 1). On observe les comptes (7, 3, 1, 0) sur n = 11 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [free, suivre l'erreur]  α′₁
    = 1 + 7   ← α₁ + N₁
    = 8
  — α₀+n  [juge prob]  départ : α_0 + n
    = 6 + 11   ← α₀ = 1 + 2 + 2 + 1
    = 17
  — PM₁  [juge prob]  départ : PM_1
    = 8/17   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (8 − 1)/(17 − 4)   ← Mode a posteriori
    = 7/13
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (1 + 7)/(6 + □) | PM₁ = 8/17, MAP₁ = 7/13
  pièges : p_dirichlet_alpha0, p_map_pm_confused

3 catégories : pluie, nuages, soleil. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(3, 2, 3). On observe les comptes (4, 0, 4) sur n = 8 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [free, suivre l'erreur]  α′₁
    = 3 + 4   ← α₁ + N₁
    = 7
  — α₀+n  [juge prob]  départ : α_0 + n
    = 8 + 8   ← α₀ = 3 + 2 + 3
    = 16
  — PM₁  [juge prob]  départ : PM_1
    = 7/16   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (7 − 1)/(16 − 3)   ← Mode a posteriori
    = 6/13
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (3 + 4)/(8 + □) | PM₁ = 0,4375, MAP₁ = 6/13
  pièges : p_dirichlet_alpha0, p_map_pm_confused

3 catégories : A, B, C. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(1, 1, 1). On observe les comptes (4, 2, 3) sur n = 9 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [free, suivre l'erreur]  α′₁
    = 1 + 4   ← α₁ + N₁
    = 5
  — α₀+n  [juge prob]  départ : α_0 + n
    = 3 + 9   ← α₀ = 1 + 1 + 1
    = 12
  — PM₁  [juge prob]  départ : PM_1
    = 5/12   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (5 − 1)/(12 − 3)   ← Mode a posteriori
    = 4/9
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (1 + 4)/(3 + □) | PM₁ = 5/12, MAP₁ = 4/9
  pièges : p_dirichlet_alpha0, p_map_pm_confused

```

### Niveau 5

```
4 catégories : vélo, bus, train, voiture. A priori, θ = (θ₁, θ₂, θ₃, θ₄) suit une loi de Dirichlet Dir(2, 3, 2, 1). On observe les comptes (1, 0, 0, 4) sur n = 5 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [free, sans aide]  α′₁
    = 2 + 1   ← α₁ + N₁
    = 3
  — α₀+n  [juge prob]  départ : α_0 + n
    = 8 + 5   ← α₀ = 2 + 3 + 2 + 1
    = 13
  — PM₁  [juge prob]  départ : PM_1
    = 3/13   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (3 − 1)/(13 − 4)   ← Mode a posteriori
    = 2/9
  pièges : p_dirichlet_alpha0, p_map_pm_confused

3 catégories : pluie, nuages, soleil. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(3, 2, 3). On observe les comptes (5, 2, 0) sur n = 7 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [free, sans aide]  α′₁
    = 3 + 5   ← α₁ + N₁
    = 8
  — α₀+n  [juge prob]  départ : α_0 + n
    = 8 + 7   ← α₀ = 3 + 2 + 3
    = 15
  — PM₁  [juge prob]  départ : PM_1
    = 8/15   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (8 − 1)/(15 − 3)   ← Mode a posteriori
    = 7/12
  pièges : p_dirichlet_alpha0, p_map_pm_confused

4 catégories : vélo, bus, train, voiture. A priori, θ = (θ₁, θ₂, θ₃, θ₄) suit une loi de Dirichlet Dir(2, 1, 3, 1). On observe les comptes (3, 1, 4, 4) sur n = 12 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [free, sans aide]  α′₁
    = 2 + 3   ← α₁ + N₁
    = 5
  — α₀+n  [juge prob]  départ : α_0 + n
    = 7 + 12   ← α₀ = 2 + 1 + 3 + 1
    = 19
  — PM₁  [juge prob]  départ : PM_1
    = 5/19   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (5 − 1)/(19 − 4)   ← Mode a posteriori
    = 4/15
  pièges : p_dirichlet_alpha0, p_map_pm_confused

```

### Variantes d'examen

```
3 catégories : A, B, C. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(2, 3, 1). On observe les comptes (2, 2, 7) sur n = 11 tirages indépendants. Moyenne a posteriori de θ₁ ?
  · 4/11 [p_dirichlet_alpha0]   ✔ 4/17   · 2/11   · 3/14 [p_map_pm_confused]
  [examen mcq]
  pièges : p_dirichlet_alpha0, p_map_pm_confused

Vrai ou faux ?
  « Avec un a priori uniforme Dir(1, 1, 1), la moyenne a posteriori de θ₁ est égale au MLE N₁/n. » → FAUX
    contre-exemple (refute) : N = 3, n = 10
  [examen tf]
  pièges : p_map_pm_confused

```

## Pièges de cette unité

- **Variance divisée par n** (`p_sd_n`, C) : s² = 60/7 au lieu de 60/6
- **Médiane lue sans trier** (`p_median_unsorted`, E) : méd(7, 2, 11, 4, 9, 4, 5) = 4 au lieu de 5
- **Médiane confondue avec la moyenne** (`p_median_mean`, E) : méd = 6 au lieu de 5
- **Écart-type d'une transformation affine** (`p_lin_transform_sd`, E) : s_y = a·s_x + b au lieu de |a|·s_x
- **Convention des quartiles** (`p_quartile_convention`, C) : q̂(0,25) = 6,5 au lieu de 6
- **Moustache arrêtée au seuil** (`p_whisker_threshold`, C) : moustache = 23,5 au lieu de 15
- **Étendue au lieu de l'EIQ** (`p_boxplot_range`, E) : EIQ = 31 − 3 au lieu de 13 − 6
- **Réunion sans retirer l'intersection** (`p_union_add`, E) : Pr(A ∪ B) = 1,2 au lieu de 0,9
- **Mauvais complémentaire (De Morgan)** (`p_complement_wrong`, E) : Pr(Aᶜ ∩ Bᶜ) = 0,7 au lieu de 0,1
- **Indépendance supposée sans raison** (`p_indep_assumed`, E) : Pr(A ∩ B) = 0,35 au lieu de 0,3
- **Erreur de conjonction** (`p_conjunction`, R) : Pr(A ∩ B) > Pr(A) au lieu de ≤
- **Le reste de la main oublié** (`p_count_forget_rest`, E) : C(4, 2)/C(32, 4) au lieu de C(4, 2)·C(28, 2)/C(32, 4)
- **Binomiale sans remise** (`p_binom_without_replacement`, E) : C(4, 2)(1/8)²(7/8)² au lieu de C(4, 2)C(28, 2)/C(32, 4)
- **« Exactement » et « au moins » confondus** (`p_exactly_atleast`, E) : Pr(X ≥ 2) = Pr(X = 2) au lieu de somme
- **Une branche oubliée** (`p_total_missing_branch`, E) : Pr(+) = 0,09 au lieu de 0,27
- **Mauvais dénominateur du conditionnement** (`p_cond_denominator`, E) : Pr(A | B) = Pr(A ∩ B)/Pr(A) au lieu de /Pr(B)
- **Conditionnement inversé** (`p_cond_inverse`, R) : Pr(M | +) = 0,9 au lieu de 1/12
- **Taux de base oublié** (`p_base_rate`, R) : 0,9 · 0,5/(0,9 · 0,5 + 0,1 · 0,5) = 0,9 au lieu de 1/12
- **Probabilité conjointe au lieu de conditionnelle** (`p_bayes_joint`, E) : 9/1 000 au lieu de 9/108
- **A posteriori élevé au carré** (`p_two_tests_square`, E) : (1/12)² au lieu de 9/20
- **Tests indépendants sans condition** (`p_two_tests_uncond`, E) : Pr(+, +) = 0,108² au lieu de 0,0081 + 0,0099
- **Incompatibles pris pour indépendants** (`p_indep_disjoint`, E) : incompatibles ⇒ indépendants au lieu de 
- **Deux à deux pris pour mutuellement** (`p_pairwise_mutual`, E) : deux à deux ⇒ mutuellement au lieu de non
- **« Au moins un » calculé par n·p** (`p_atleast_one_np`, E) : Pr(au moins un) = n·p au lieu de 1 − (1 − p)ⁿ
- **Série et parallèle échangés** (`p_series_parallel`, E) : parallèle = Π pᵢ au lieu de 1 − Π(1 − pᵢ)
- **Inégalité stricte dans F** (`p_cdf_strict`, E) : Pr(X < 2) = F(2) au lieu de F(1)
- **F(α) au lieu de F⁻¹(α)** (`p_quantile_inverse`, E) : q₀,₅ = F(0,5) au lieu de F⁻¹(0,5)
- **Convention de la loi géométrique** (`p_geom_support`, C) : E = 1/p au lieu de (1 − p)/p (MATH-234)
- **Coefficient binomial oublié** (`p_binom_no_coef`, E) : 0,03456 au lieu de 0,3456
- **p et 1 − p échangés** (`p_binom_swap_p`, E) : 0,4³ · 0,6² au lieu de 0,6³ · 0,4²
- **Taux de Poisson pas mis à l'échelle** (`p_poisson_rate_scale`, E) : λ = 2 par heure pour 3 h au lieu de λ = 6
- **k! oublié** (`p_poisson_no_factorial`, E) : λᵏe^(−λ) au lieu de λᵏe^(−λ)/k!
- **Approximation de Poisson abusive** (`p_poisson_approx_bad`, E) : B(20 ; 0,5) ≈ Poiss(10) au lieu de non
- **Normaliser hors du support** (`p_normalize_bounds`, E) : c·x³ sur [0 ; 2] : ∫₀¹ x³ dx = 1/4, c = 4 au lieu de ∫₀² x³ dx = 4, c = 1/4
- **Densité prise pour une probabilité** (`p_density_is_prob`, E) : f(x) = 3x⁻⁴ : Pr(X = 2) = f(2) = 3/16 au lieu de Pr(X = 2) = 0
- **F sans ses morceaux** (`p_cdf_piecewise`, E) : F(x) = 1 − x⁻³ pour tout x au lieu de F(x) = 1 − x⁻³ si x ≥ 1, 0 sinon
- **Quantile lu sur la densité** (`p_quantile_from_pdf`, E) : f(x) = x/2 sur [0 ; 2] : f(q) = 1/2, q = 1 au lieu de F(q) = q²/4 = 1/2, q = √2
- **Taux et moyenne confondus** (`p_exp_rate_mean`, C) : moyenne 10 : Pr(X > 10) = e^(−10·10) au lieu de e^(−10/10) = e^(−1)
- **Absence de mémoire oubliée** (`p_memoryless_ignored`, E) : Pr(X > 12 | X > 2) = e^(−1,2) au lieu de e^(−1,2)/e^(−0,2) = e^(−1)
- **Variance de l'uniforme sans carré** (`p_unif_var`, E) : U(0 ; 6) : var = 6/12 au lieu de 6²/12 = 3
- **E[X] au lieu de E[X]²** (`p_var_minus_mean`, E) : var(Y) = 5/7 − 5/6 au lieu de 5/7 − (5/6)² = 5/252
- **E[g(X)] = g(E[X])** (`p_g_of_mean`, E) : X ~ exp(3) : E[e^X] = e^(E[X]) = e^(1/3) au lieu de ∫ eˣ·3e^(−3x) dx = 3/2
- **Espérance qui n'existe pas** (`p_mean_not_exist`, E) : E[Cauchy] = 0, par symétrie au lieu de l'espérance n'existe pas
- **Échelle et taux de Gamma confondus** (`p_gamma_scale_rate`, C) : y²e^(−y/θ) : E[Y] = 3/θ au lieu de E[Y] = 3θ
- **Forme de Gamma décalée** (`p_gamma_shape_off`, E) : y² ⇒ Γ(2, θ) au lieu de Γ(3, θ)
- **Paramètres de Beta décalés** (`p_beta_shape_off`, E) : x²(1 − x) ⇒ Beta(2, 1) au lieu de Beta(3, 2)
- **Standardiser par la variance** (`p_standardize_var`, E) : z = (130 − 100)/225 au lieu de (130 − 100)/15 = 2
- **Φ d'un nombre négatif** (`p_phi_negative`, E) : Φ(−1) = −0,841 ou 0,841 au lieu de 1 − 0,841 = 0,159
- **Queue gauche au lieu de droite** (`p_upper_tail`, E) : Pr(X > 130) = Φ(2) = 0,977 au lieu de 1 − Φ(2) = 0,023
- **Variance prise pour l'écart-type** (`p_normal_sigma2`, C) : N(176,6 ; 63,84) : σ = 63,84 au lieu de σ = √63,84 ≈ 7,99
- **Mauvais côté du quantile** (`p_phi_inverse_side`, E) : Pr(X > 89) = 0,1 : 5/σ = −1,28 au lieu de Φ(5/σ) = 0,9, 5/σ = 1,28
- **Jacobien oublié** (`p_transform_jacobian`, C) : X = −ln(U)/2 : f_X(x) = f_U(e^(−2x)) = 1 au lieu de 1·|−2e^(−2x)| = 2e^(−2x)
- **Valeur absolue du jacobien oubliée** (`p_transform_abs`, E) : f = −2e^(−2x) au lieu de 2e^(−2x)
- **Support pas transformé** (`p_transform_support`, E) : X = −ln(U)/λ : support ]0 ; 1[ au lieu de ]0 ; +∞[
- **Densité d'un multiple mal changée** (`p_scale_density`, E) : X ~ exp(1), Y = 2X : f_Y(y) = 2e^(−y) au lieu de f_X(y/2)/2 = (1/2)e^(−y/2)
- **Covariance nulle prise pour indépendance** (`p_cov_zero_indep`, E) : cov(X, Y) = 0 ⇒ indépendants au lieu de non : p(0, 0) = 0,1 ≠ 0,12
- **Marginale sur le mauvais axe** (`p_marginal_wrong_axis`, E) : p_X(1) = somme de la colonne Y = 1 au lieu de somme de la ligne X = 1
- **Indépendance sur un support non rectangulaire** (`p_joint_support_indep`, C) : 24xy sur un triangle : indépendants au lieu de non
- **Bornes fixes pour une marginale** (`p_marginal_bounds`, E) : ∫₀¹ xy dy = x/2 au lieu de ∫₀^(1−x) xy dy = x(1 − x)²/2
- **Covariance oubliée dans une variance** (`p_var_sum_cov`, E) : var = 3 + 4·2 + 6 = 17 au lieu de 17 + 2[2·(−2) + 2·1] = 13
- **Facteur pas mis au carré** (`p_var_scale`, E) : var(2X) = 2·var(X) au lieu de 4·var(X)
- **var(XY) = var X · var Y** (`p_var_xy`, C) : var(XY) = 1·1 = 1 au lieu de E[X²]E[Y²] − (E[X]E[Y])² = 14
- **Variance d'une différence soustraite** (`p_var_diff`, E) : var(X − Y) = 1 − 1 = 0 au lieu de 1 + 1 = 2
- **Corrélation prise pour causalité** (`p_corr_causal`, C) : « r = 0,8 : X cause Y » au lieu de 
- **Corrélation changée par l'échelle** (`p_corr_scale`, E) : corr(2X + 1, −Y) = −6 au lieu de −0,5
- **Corrélation prise pour la pente** (`p_corr_slope`, E) : r = 0,5 ⇒ Y = 0,5X au lieu de 
- **Variance des moyennes oubliée** (`p_total_var_forget`, E) : var = 1,17 au lieu de 1,41
- **Moyenne non pondérée des espérances** (`p_total_expect_unweighted`, E) : E = (2,5 + 3,5)/2 au lieu de 0,6 · 2,5 + 0,4 · 3,5
- **Mélange pris pour une somme pondérée** (`p_mixture_vs_sum`, C) : var(mélange) = 0,58 au lieu de 4,36
- **Densités additionnées** (`p_sum_density_add`, E) : f_{X+Y} = f_X + f_Y au lieu de convolution
- **Bornes de la convolution** (`p_conv_bounds`, E) : ∫₀¹ dy pour tout z au lieu de ∫ sur [max(0, z − 1) ; min(1, z)]
- **Tchebychev en 1/k** (`p_chebyshev_k`, E) : ≤ 1/2 au lieu de ≤ 1/4
- **Markov pour une variable négative** (`p_markov_negative`, E) : Markov pour X ~ N(0, 1) au lieu de non applicable
- **Erreur du joueur** (`p_gambler`, R) : Pr(face | 5 piles) > 1/2 au lieu de = 1/2
- **Loi des grands nombres sur les nombres** (`p_lln_count`, E) : #piles − #faces au lieu de 0 : faux
- **Écart-type d'une somme en n·σ** (`p_clt_sum_sd`, E) : sd(S) = 16 · 20 au lieu de √16 · 20
- **TCL : la population grande** (`p_clt_population`, C) : « la population doit être grande » au lieu de l'échantillon
- **TCL : la population normale** (`p_clt_needs_normal`, C) : « la population doit être normale » au lieu de non
- **Division par √n oubliée** (`p_se_forgot_sqrt_n`, E) : se = σ au lieu de σ/√n
- **Variance de la binomiale prise pour l'écart-type** (`p_binom_var_as_sd`, E) : σ = 25 au lieu de 5
- **Moments avec le diviseur n − 1** (`p_mom_s2`, E) : σ̂² = 72/5 au lieu de 72/6
- **Carré de la moyenne au lieu de la moyenne des carrés** (`p_mom_wrong_moment`, E) : E[X²] = x̄² au lieu de (1/n)Σxᵢ²
- **Maximum pas vérifié** (`p_mle_no_check`, C) : θ̂ sans vérification au lieu de avec ℓ″ < 0
- **Terme constant dérivé** (`p_mle_constant_kept`, E) : d/dλ(−Σ ln xᵢ!) ≠ 0 au lieu de 0
- **Équation de vraisemblance mal résolue** (`p_mle_solve`, E) : 16/λ − 8 = 0 ⇒ λ = 1/2 au lieu de 2
- **Variance de Wald pas inversée** (`p_wald_var_inverse`, C) : se = √J = 2 au lieu de 1/√J = 1/2
- **Signe de l'information observée** (`p_wald_sign`, E) : J = ℓ″(θ̂) = −4 au lieu de 4
- **MLE au bord du support manqué** (`p_mle_support`, C) : « pas de MLE » ou θ̂ = 2x̄ au lieu de max xᵢ
- **Invariance du MLE ignorée** (`p_mle_invariance_ignored`, C) : MLE de Pr(X ≤ 2) = (1/n)Σ1{Xᵢ ≤ 2} au lieu de 1 − e^(−2/X̄)
- **Biais pas au carré dans l'EQM** (`p_mse_bias_not_squared`, E) : EQM = var + biais au lieu de var + biais²
- **Sans biais pris pour meilleur** (`p_unbiased_better`, E) : sans biais ⇒ meilleur au lieu de comparer les EQM
- **Information d'une seule observation** (`p_fisher_per_obs`, C) : borne = λ au lieu de λ/n
- **Signe de l'information de Fisher** (`p_fisher_sign`, E) : I₁ = −1/λ au lieu de 1/λ
- **Cramér-Rao pour un estimateur biaisé** (`p_cr_biased`, E) : borne pour tout estimateur au lieu de seulement sans biais
- **Quantile normal au lieu de Student** (`p_t_vs_z`, C) : 1,96 au lieu de s₅(8) = 2,306
- **Unilatéral et bilatéral confondus** (`p_one_two_sided`, E) : 1,645 au lieu de 1,96
- **Mauvais nombre de degrés de liberté** (`p_df_wrong`, C) : ν = n au lieu de n − 1 (n₁ + n₂ − 2 ; n − 2 en régression)
- **Centre de l'IC de Wilson** (`p_wilson_center`, E) : centre p̂ = 0,36 au lieu de p̃ = 0,365
- **Bornes arrondies au plus proche** (`p_ci_round_nearest`, C) : 1,067456 au lieu de 1,0675 → 1,0674
- **Bornes à partir de valeurs arrondies** (`p_ci_round_from_rounded`, C) : 1,0699 − 0,0024 = 1,0675 au lieu de 1,0674
- **Précision des bornes** (`p_ci_round_digits`, C) : [1,067456 ; 1,072286] au lieu de [1,0674 ; 1,0723]
- **Densité du maximum élevée à la puissance** (`p_max_density_power`, E) : f_M = f(x)ⁿ au lieu de n·F^(n−1)·f
- **Maximum et minimum échangés** (`p_max_min_swap`, E) : F_max = 1 − (1 − F)ⁿ au lieu de Fⁿ
- **H₀ et H₁ inversées** (`p_h0_direction`, C) : H₀ : p > p₀ au lieu de H₁ : p > p₀
- **p-valeur bilatérale pas doublée** (`p_pvalue_two_sided`, E) : p = 0,023 au lieu de 0,046
- **Comparaison p-valeur et α inversée** (`p_pvalue_alpha_compare`, E) : p = 0,03 > α ⇒ rejet au lieu de p < α ⇒ rejet
- **Erreurs de type 1 et 2 échangées** (`p_type_errors_swap`, C) : type 1 ↔ type 2 au lieu de 
- **Erreur vue là où la décision est juste** (`p_error_when_correct`, C) : rejet avec μ = 47 > 40 : « type 1 » au lieu de aucune erreur
- **Puissance = 1 − α** (`p_power_alpha`, E) : puissance = 1 − α au lieu de 1 − β
- **Données appariées traitées comme deux échantillons** (`p_paired_as_two`, C) : deux échantillons au lieu de différences
- **Variance poolée non pondérée** (`p_pooled_average`, E) : s_p² = (s₁² + s₂²)/2 au lieu de pondérée
- **Erreur standard de deux échantillons** (`p_two_sample_se`, E) : se = √(s₁² + s₂²) au lieu de s_p√(1/n₁ + 1/n₂)
- **Proportion commune pas poolée** (`p_two_prop_no_pool`, E) : se = √(p̂₁q̂₁/n₁ + p̂₂q̂₂/n₂) au lieu de poolée
- **R² et r confondus** (`p_r2_r`, E) : R² = 0,775 au lieu de 0,6
- **IC lu comme une probabilité sur θ** (`p_ci_prob`, R) : « 95 % de chances que μ ∈ [a ; b] » au lieu de 
- **IC lu comme l'intervalle des données** (`p_ci_data`, E) : « 95 % des mesures sont dans l'IC » au lieu de 
- **IC lu comme un intervalle pour x̄** (`p_ci_xbar`, E) : « x̄ est dans l'IC avec probabilité 0,95 » au lieu de 
- **Intersection de deux IC** (`p_ci_intersection`, C) : intersection de deux IC à 95 % au lieu de pas garantie
- **« Ne pas rejeter » lu comme « H₀ prouvée »** (`p_accept_h0`, C) : « H₀ est vraie » au lieu de « pas de preuve contre H₀ »
- **p-valeur lue comme Pr(H₀)** (`p_pvalue_h0`, R) : « p = Pr(H₀ vraie) » au lieu de 
- **Rejet à 10 % pris pour rejet à 5 %** (`p_reject_10_5`, C) : rejet à 10 % ⇒ rejet à 5 % au lieu de on ne sait pas
- **Significatif pris pour important** (`p_significant_large`, E) : « significatif, donc grand effet » au lieu de 
- **Tests multiples** (`p_multiple_tests`, C) : 1 rejet sur 20 tests ⇒ effet au lieu de hasard possible
- **χ² avec des proportions** (`p_chi2_proportions`, E) : T = 13,4/60 ≈ 0,223 (avec des fréquences) au lieu de T = 13,4 (avec des effectifs)
- **Degrés de liberté du χ² d'adéquation** (`p_chi2_df`, C) : r = 6 (dé, 6 classes) au lieu de r = 6 − 1 = 5
- **Division par l'effectif observé** (`p_chi2_divide_obs`, E) : T = Σ(oᵢ − eᵢ)²/oᵢ ≈ 11,11 au lieu de T = Σ(oᵢ − eᵢ)²/eᵢ = 13,4
- **Degrés de liberté du χ² d'indépendance** (`p_chi2_df_indep`, E) : r = 2 · 2 − 1 = 3 au lieu de r = (2 − 1)(2 − 1) = 1
- **Effectifs attendus uniformes** (`p_chi2_expected_uniform`, E) : e₁₁ = 100/4 = 25 au lieu de e₁₁ = 40 · 50/100 = 20
- **Pivot du χ² avec n** (`p_chi2_var_n`, E) : T = 11 · 15/10 = 16,5 au lieu de T = 10 · 15/10 = 15
- **Pivot du χ² inversé** (`p_chi2_var_inverted`, E) : T = 10 · 10/15 ≈ 6,67 au lieu de T = 10 · 15/10 = 15
- **Quantiles de l'IC de σ² échangés** (`p_chi2_ci_swapped`, E) : borne inférieure = 150/3,247 ≈ 46,20 au lieu de borne inférieure = 150/20,483 ≈ 7,32
- **Droite de x sur y prise pour l'inverse** (`p_reg_x_on_y`, C) : x = (y − 2,2)/0,6 : pente 1/0,6 ≈ 1,67 au lieu de pente de x sur y = S_xy/S_yy = 6/6 = 1
- **Pente divisée par S_yy** (`p_reg_slope_swap`, E) : β̂ = S_xy/S_yy = 6/6 = 1 au lieu de β̂ = S_xy/S_xx = 6/10 = 0,6
- **Sommes pas centrées** (`p_reg_sums_raw`, E) : β̂ = Σxy/Σx² = 66/55 = 1,2 au lieu de β̂ = S_xy/S_xx = 0,6
- **σ̂² de la régression divisé par n** (`p_reg_sigma_n`, C) : σ̂² = 2,4/5 au lieu de 2,4/3
- **Erreur standard de l'ordonnée à l'origine** (`p_reg_se_alpha`, E) : se(α̂) = σ̂/√n ≈ 0,313 au lieu de σ̂·√(1/n + x̄²/S_xx) ≈ 0,712
- **Colonnes de design liées** (`p_design_collinear`, C) : colonnes 1, 1_T, 1_H, x au lieu de colonnes 1_T, 1_H, x
- **Une pente par groupe** (`p_design_separate_slopes`, E) : deux colonnes de pente x·1_T, x·1_H au lieu de une seule colonne x
- **Degrés de liberté de F échangés** (`p_f_df_swap`, E) : ν₁ = n − p = 16 (F_{16, 2}) au lieu de ν₁ = p − q = 2 (F_{2, 16})
- **Rapport F inversé** (`p_f_ratio_inverted`, E) : F = (30/16)/(20/2) ≈ 0,19 au lieu de F = (20/2)/(30/16) ≈ 5,33
- **Normalité testée sur y** (`p_diag_normal_y`, C) : QQ-plot de y au lieu de des résidus
- **R² élevé pris pour un bon modèle** (`p_r2_high_good`, E) : R² = 0,95 ⇒ modèle adapté au lieu de regarder les résidus
- **Point aberrant supprimé** (`p_outlier_delete`, C) : supprimer le point aberrant au lieu de vérifier d'abord
- **Paramètres de Beta échangés** (`p_beta_swap`, E) : Beta(1, 3) : α′ = 1 au lieu de Beta(3, 1) : α′ = 3
- **A priori oublié** (`p_beta_prior_not_added`, E) : Beta(2, 0) : α′ = 2 au lieu de Beta(3, 1) : α′ = 3
- **MAP et moyenne a posteriori confondus** (`p_map_pm_confused`, E) : MAP = 9/14 au lieu de 2/3
- **Moyenne a posteriori non pondérée** (`p_gauss_posterior_avg`, E) : μ_post = 2,35 au lieu de 2,3
- **Variances additionnées** (`p_gauss_post_var_add`, E) : σ²_post = 1,5 au lieu de 1/3
- **Taille minimale sans l'a priori** (`p_precision_n`, E) : n = 51 au lieu de 50
- **Dénominateur de la moyenne de Dirichlet** (`p_dirichlet_alpha0`, E) : PM₁ = 4/10 au lieu de 4/13
- **Coefficient multinomial oublié** (`p_multinomial_no_coef`, E) : 1/64 au lieu de 3/16
