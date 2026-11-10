# Exemples de questions — Probabilités et statistique

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Moyenne, médiane, variance empirique (`p-desc-summary`, BA3)

_On trie les données, puis : moyenne x̄ = Σxᵢ/n ; médiane x₍⌈n/2⌉₎ ; variance empirique s² = Σ(xᵢ − x̄)²/(n − 1) ; écart-type s = √s²._

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
Une série de scores sur 100 a pour moyenne x̄ = 20, médiane 18 et écart-type s = 7. On convertit chaque donnée en points perdus (y = 100 − x). Sans refaire le calcul, donne ȳ, la médiane et l'écart-type des nouvelles données.
  [free, suivre l'erreur]  ȳ
    = −1·20 + 100   ← ȳ = a·x̄ + b
    = 80   ← Calculer
  — méd(y)  [juge prob]  départ : méd(y)
    = 82   ← La médiane suit la même règle
  — sy  [juge prob]  départ : s_y
    = 1·7   ← |a|·s_x
    = 7   ← Calculer
  aides : Chaque donnée devient a·x + b : la moyenne et la médiane suivent la même règle ; l'écart-type est seulement multiplié par |a|. | s_y = 1 · □ | ȳ = 80 ; méd = 82 ; s_y = 7
  pièges : p_lin_transform_sd

Voici des âges des joueurs d'un club : 6, 2, 17, 5, 20. Calcule la moyenne, la médiane, la variance empirique s² et l'écart-type s (à 0,01 près).
  [free, suivre l'erreur]  x̄
    = 50/5   ← Somme des données : 6 + 2 + 17 + 5 + 20 = 50, divisée par n = 5
    = 10   ← Diviser
  — méd  [juge prob]  départ : méd
    = 6   ← Données triées : 2, 5, 6, 17, 20 ; la 3ᵉ
  — Σ(xᵢ−x̄)2  [juge prob]  départ : Σ(xᵢ−x̄)²
    = 64 + 25 + 16 + 49 + 100   ← Chaque écart (xᵢ − x̄), au carré
    = 254   ← Additionner
  — s2  [juge prob]  départ : s²
    = 254/4   ← Diviser par n − 1
    = 63,5   ← Simplifier
  — s  [juge stat]  départ : s
    = √(63,5)   ← Écart-type : racine de la variance
    = 7,97   ← Arrondir au centième
  aides : Trie d'abord. Pour s², somme des écarts au carré, divisée par n − 1. | s²=254/□ | x̄ = 10 ; méd = 6 ; s² = 63,5 ; s ≈ 7,97
  pièges : p_median_unsorted, p_median_mean, p_sd_n

Une série de températures en °C a pour moyenne x̄ = 30, médiane 31 et écart-type s = 5. On convertit chaque donnée en °F (y = 1,8x + 32). Sans refaire le calcul, donne ȳ, la médiane et l'écart-type des nouvelles données.
  [free, suivre l'erreur]  ȳ
    = 1,8·30 + 32   ← ȳ = a·x̄ + b
    = 86   ← Calculer
  — méd(y)  [juge prob]  départ : méd(y)
    = 87,8   ← La médiane suit la même règle
  — sy  [juge prob]  départ : s_y
    = 1,8·5   ← |a|·s_x
    = 9   ← Calculer
  aides : Chaque donnée devient a·x + b : la moyenne et la médiane suivent la même règle ; l'écart-type est seulement multiplié par |a|. | s_y = 1,8 · □ | ȳ = 86 ; méd = 87,8 ; s_y = 9
  pièges : p_lin_transform_sd

```

### Niveau 5

```
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

Voici des températures relevées (en °C) : 20, 10, 11, 12, 16, 17, 17, 23, 18. Calcule la moyenne, la médiane, la variance empirique s² et l'écart-type s (à 0,01 près).
  [free, sans aide]  x̄
    = 144/9   ← Somme des données : 20 + 10 + 11 + 12 + 16 + 17 + 17 + 23 + 18 = 144, divisée par n = 9
    = 16   ← Diviser
  — méd  [juge prob]  départ : méd
    = 17   ← Données triées : 10, 11, 12, 16, 17, 17, 18, 20, 23 ; la 5ᵉ
  — Σ(xᵢ−x̄)2  [juge prob]  départ : Σ(xᵢ−x̄)²
    = 36 + 25 + 16 + 0 + 1 + 1 + 4 + 16 + 49   ← Chaque écart (xᵢ − x̄), au carré
    = 148   ← Additionner
  — s2  [juge prob]  départ : s²
    = 148/8   ← Diviser par n − 1
    = 18,5   ← Simplifier
  — s  [juge stat]  départ : s
    = √(18,5)   ← Écart-type : racine de la variance
    = 4,30   ← Arrondir au centième
  pièges : p_median_unsorted, p_median_mean, p_sd_n

```

### Variantes d'examen

```
Données : 17, 10, 3, 7, 18. Quelle est la variance empirique s² ?
  · 33,2 [p_sd_n]   · 166/3   ✔ 41,5   · 166
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

_Q̂(α) = x₍⌈nα⌉₎._

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

_0 ≤ Pr(A) ≤ 1, Pr(Ω) = 1, et Pr de réunions disjointes = somme._

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

_Si tous les résultats sont équiprobables, Pr(A) = |A|/|Ω|._

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
    = C(28;3)/4960   ← Aucun des dames
    = 819/1240   ← Simplifier
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = 4×C(28;2)/4960   ← Exactement un
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
    = C(11;3)/455   ← Aucun des pièces défectueuses
    = 33/91   ← Simplifier
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = 4×C(11;2)/455   ← Exactement un
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
    = C(28;4)/35960   ← Aucun des dames
    = 4095/7192   ← Simplifier
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = 4×C(28;3)/35960   ← Exactement un
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
    = C(28;5)/201376   ← Aucun des dames
    = 1755/3596   ← Simplifier
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = 4×C(28;4)/201376   ← Exactement un
    = 2925/7192   ← Simplifier
  — Pr(X≥2)  [juge prob]  départ : Pr(X ≥ 2)
    = 1 − 1755/3596 − 2925/7192   ← Complément
    = 757/7192   ← Calculer
  pièges : p_exactly_atleast

```

### Variantes d'examen

```
Un lot de 20 pièces contient 5 pièces défectueuses. On en contrôle 4, prises au hasard en même temps. Probabilité d'obtenir exactement 3 pièces défectueuses ?
  · 5/3876 [g7_order_confusion]   ✔ 10/323   · 2/969 [p_count_forget_rest]   · ≈ 0,0469 [p_binom_without_replacement]
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

_Pr(A | B) = Pr(A ∩ B)/Pr(B) ; donc Pr(A ∩ B) = Pr(A | B)·Pr(B)._

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

_On imagine 1 000 personnes et on remplit le tableau malades/sains × positif/négatif._

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
  · 0,95 [p_cond_inverse]   ✔ 19/55   · 19/23 [p_base_rate]   · 0,095 [p_bayes_joint]
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

_Pr(M | +) = Pr(+ | M)·Pr(M) / [Pr(+ | M)·Pr(M) + Pr(+ | Mᶜ)·Pr(Mᶜ)]._

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
  · 0,9 [p_cond_inverse]   ✔ 9/28   · 45/121 [p_two_tests_uncond]   · 9/484 [p_two_tests_square]
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

_A et B indépendants ⇔ Pr(A ∩ B) = Pr(A)·Pr(B) ⇔ Pr(A | B) = Pr(A)._

### Niveau 1

```
2 composants indépendants, de fiabilité 0,9 chacun, sont montés en série (le système marche si tous marchent). Probabilité que le système marche ?
  [guided]  Pr(marche)
    = 0,9^□   (trous : 0,9²)   ← Tous doivent marcher
    = □   (trous : 0,81)   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 0,9^□ | Pr(marche) = 0,81
  pièges : p_series_parallel, p_atleast_one_np

2 composants indépendants, de fiabilité 0,8 chacun, sont montés en parallèle (le système marche si au moins un marche). Probabilité que le système marche ?
  [guided]  Pr(marche)
    = 1 − (1 − 0,8)^□   (trous : 1 − (1 − 0,8)²)   ← Contraire de « tous en panne »
    = 1 − □   (trous : 1 − 0,04)   ← Puissance
    = □   (trous : 0,96)   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 1-(1-0,8)^□ | Pr(marche) = 0,96
  pièges : p_series_parallel, p_atleast_one_np

2 composants indépendants, de fiabilité 0,95 chacun, sont montés en parallèle (le système marche si au moins un marche). Probabilité que le système marche ?
  [guided]  Pr(marche)
    = 1 − (1 − 0,95)^□   (trous : 1 − (1 − 0,95)²)   ← Contraire de « tous en panne »
    = 1 − □   (trous : 1 − 0,0025)   ← Puissance
    = □   (trous : 0,9975)   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 1-(1-0,95)^□ | Pr(marche) = 0,9975
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
2 composants indépendants, de fiabilité 0,9 chacun, sont montés en parallèle (le système marche si au moins un marche). Probabilité que le système marche ?
  [tap, suivre l'erreur, menu menu]  Pr(marche)
    = 1 − (1 − 0,9)²   ← Contraire de « tous en panne »
    = 1 − 0,01   ← Puissance
    = 0,99   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 1-(1-0,9)^□ | Pr(marche) = 0,99
  pièges : p_series_parallel, p_atleast_one_np

3 composants indépendants, de fiabilité 0,8 chacun, sont montés en parallèle (le système marche si au moins un marche). Probabilité que le système marche ?
  [tap, suivre l'erreur, menu menu]  Pr(marche)
    = 1 − (1 − 0,8)³   ← Contraire de « tous en panne »
    = 1 − 0,008   ← Puissance
    = 0,992   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 1-(1-0,8)^□ | Pr(marche) = 0,992
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
Deux composants identiques (fiabilité 0,95) sont montés en parallèle ; ce bloc est en série avec un troisième composant de fiabilité 0,9. Les pannes sont indépendantes. Probabilité que le système marche ?
  [free, suivre l'erreur]  bloc
    = 1 − (1 − 0,95)²   ← Au moins un des deux marche
    = 0,9975   ← Calculer
  — système  [juge prob]  départ : système
    = 0,9975·0,9   ← Série avec le troisième
    = 0,89775   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 1-(1-0,95)^□ | système = 0,89775
  pièges : p_series_parallel, p_atleast_one_np

Deux composants identiques (fiabilité 0,95) sont montés en parallèle ; ce bloc est en série avec un troisième composant de fiabilité 0,99. Les pannes sont indépendantes. Probabilité que le système marche ?
  [free, suivre l'erreur]  bloc
    = 1 − (1 − 0,95)²   ← Au moins un des deux marche
    = 0,9975   ← Calculer
  — système  [juge prob]  départ : système
    = 0,9975·0,99   ← Série avec le troisième
    = 0,987525   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 1-(1-0,95)^□ | système = 0,987525
  pièges : p_series_parallel, p_atleast_one_np

Deux composants identiques (fiabilité 0,9) sont montés en parallèle ; ce bloc est en série avec un troisième composant de fiabilité 0,9. Les pannes sont indépendantes. Probabilité que le système marche ?
  [free, suivre l'erreur]  bloc
    = 1 − (1 − 0,9)²   ← Au moins un des deux marche
    = 0,99   ← Calculer
  — système  [juge prob]  départ : système
    = 0,99·0,9   ← Série avec le troisième
    = 0,891   ← Calculer
  aides : Indépendants : le produit. Incompatibles : l'intersection vide. Série : tous marchent ; parallèle : au moins un. | 1-(1-0,9)^□ | système = 0,891
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
    = 1/4   ← Sur A ∩ B, la somme est toujours paire : 0,25 ≠ 1/8, pas mutuellement indépendants
  — n  [juge prob]  départ : n
    = 5   ← 1 − 0,2^5 ≥ 0,999, et pas avec 4
  pièges : p_pairwise_mutual, p_atleast_one_np, p_series_parallel

On lance deux dés équilibrés. A = « le 1er dé est impair », B = « le 2e dé est impair », C = « la somme est paire ». Pr(A) = Pr(B) = Pr(C) = 1/2. Puis : des composants de fiabilité 0,9 sont montés en parallèle ; combien en faut-il au moins pour que le système marche avec probabilité au moins 0,999 ?
  [free, sans aide]  Pr(A ∩ B)
    = 9/36   ← 3 · 3 couples
    = 1/4   ← = Pr(A)·Pr(B) : A et B indépendants
  — Pr(A∩B∩C)  [juge prob]  départ : Pr(A ∩ B ∩ C)
    ? A, B et C sont indépendants deux à deux (même calcul pour chaque paire). Sont-ils mutuellement indépendants ? ✔ Il faut encore vérifier Pr(A ∩ B ∩ C) = 1/8 / · Oui : les trois paires sont indépendantes
    = 1/4   ← Sur A ∩ B, la somme est toujours paire : 0,25 ≠ 1/8, pas mutuellement indépendants
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
3 composants indépendants, de fiabilité 0,95 chacun, sont montés en série (le système marche si tous marchent). Probabilité que le système marche ?
  · 0,999875 [p_series_parallel]   · 47045881/64000000   ✔ 0,857375   · 1141/16000
  [examen mcq]
  pièges : p_series_parallel

Vrai ou faux ?
  « Deux événements incompatibles de probabilités non nulles sont indépendants. » → FAUX
    contre-exemple (refute) : a = 1/2, b = 1/2
  [examen tf]
  pièges : p_indep_disjoint

4 composants indépendants, de fiabilité 0,99 chacun, sont montés en parallèle (le système marche si au moins un marche). Probabilité que le système marche ?
  [free, sans aide, examen coef]  Pr(marche)
    = 1 − (1 − 0,99)⁴   ← Contraire de « tous en panne »
    = 1 − 1/100000000   ← Puissance
    = 99999999/100000000   ← Calculer
  pièges : p_series_parallel, p_atleast_one_np

```

## Variable discrète : fonction de masse, de répartition, quantile (`p-disc-pmf`, BA3)

_Fonction de masse f(xᵢ) = Pr(X = xᵢ) ≥ 0, de somme 1._

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

_N essais indépendants, même probabilité p de succès : X ~ B(n, p), Pr(X = k) = C(n, k)·pᵏ(1 − p)^(n−k), E[X] = np, var(X) = np(1 − p)._

### Niveau 1

```
Une machine produit 20 % de pièces défectueuses, indépendamment. On prend 7 pièces. X = nombre de pièces défectueuses. Pr(X = 1) ?
  [guided]  p
    = 0,2   ← p = probabilité d'un succès, n = 7
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = C(7;□)×0,2×0,8^□   (trous : C(7;1)×0,2×0,8^6)   ← Formule de la binomiale
    = □·0,2·0,262144   (trous : 7·0,2·0,262144)   ← Calculer chaque facteur
    = □   (trous : 28672/78125)   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(7;1)×0,2 | Pr(X = 1) = 28672/78125
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

Une machine produit 10 % de pièces défectueuses, indépendamment. On prend 6 pièces. X = nombre de pièces défectueuses. Pr(X = 5) ?
  [guided]  p
    = 0,1   ← p = probabilité d'un succès, n = 6
  — Pr(X=5)  [juge prob]  départ : Pr(X = 5)
    = C(6;□)×0,1^5×0,9   (trous : C(6;5)×0,1^5×0,9)   ← Formule de la binomiale
    = □·0,00001·0,9   (trous : 6·0,00001·0,9)   ← Calculer chaque facteur
    = □   (trous : 0,000054)   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(6;5)×0,1^□ | Pr(X = 5) = 0,000054
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

Une machine produit 10 % de pièces défectueuses, indépendamment. On prend 6 pièces. X = nombre de pièces défectueuses. Pr(X = 2) ?
  [guided]  p
    = 0,1   ← p = probabilité d'un succès, n = 6
  — Pr(X=2)  [juge prob]  départ : Pr(X = 2)
    = C(6;□)×0,1^2×0,9^□   (trous : C(6;2)×0,1^2×0,9^4)   ← Formule de la binomiale
    = □·0,01·0,6561   (trous : 15·0,01·0,6561)   ← Calculer chaque facteur
    = □   (trous : 0,098415)   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(6;2)×0,1^□ | Pr(X = 2) = 0,098415
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

```

### Niveau 2

```
Une machine produit 20 % de pièces défectueuses, indépendamment. On prend 5 pièces. X = nombre de pièces défectueuses. Pr(X = 4) ?
  [guided]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 5 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,2   ← p = probabilité d'un succès, n = 5
  — Pr(X=4)  [juge prob]  départ : Pr(X = 4)
    = C(5;□)×0,2^4×0,8   (trous : C(5;4)×0,2^4×0,8)   ← Formule de la binomiale
    = □·0,0016·0,8   (trous : 5·0,0016·0,8)   ← Calculer chaque facteur
    = □   (trous : 0,0064)   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(5;4)×0,2^□ | Pr(X = 4) = 0,0064
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

Un QCM a 8 questions à 4 réponses, dont une juste. Un élève répond au hasard. X = nombre de bonnes réponses. Pr(X = 3) ?
  [guided]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 8 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,25   ← p = probabilité d'un succès, n = 8
  — Pr(X=3)  [juge prob]  départ : Pr(X = 3)
    = C(8;□)×0,25^3×0,75^5   (trous : C(8;3)×0,25^3×0,75^5)   ← Formule de la binomiale
    = □·0,015625·243/1024   (trous : 56·0,015625·243/1024)   ← Calculer chaque facteur
    = □   (trous : 1701/8192)   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(8;3)×0,25^□ | Pr(X = 3) = 1701/8192
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

Un QCM a 5 questions à 5 réponses, dont une juste. Un élève répond au hasard. X = nombre de bonnes réponses. Pr(X = 4) ?
  [guided]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 5 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,2   ← p = probabilité d'un succès, n = 5
  — Pr(X=4)  [juge prob]  départ : Pr(X = 4)
    = C(5;□)×0,2^4×0,8   (trous : C(5;4)×0,2^4×0,8)   ← Formule de la binomiale
    = □·0,0016·0,8   (trous : 5·0,0016·0,8)   ← Calculer chaque facteur
    = □   (trous : 0,0064)   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(5;4)×0,2^□ | Pr(X = 4) = 0,0064
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

```

### Niveau 3

```
Une urne contient 2 boules rouges et 4 bleues. On tire 6 boules avec remise. X = nombre de rouges. Pr(X = 2) ?
  [tap, suivre l'erreur, menu menu]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 6 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 1/3   ← p = probabilité d'un succès, n = 6
  — Pr(X=2)  [juge prob]  départ : Pr(X = 2)
    = C(6;2)×(1/3)^2×(2/3)^4   ← Formule de la binomiale
    = 15·1/9·16/81   ← Calculer chaque facteur
    = 80/243   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(6;2)×(1/3)^□ | Pr(X = 2) = 80/243
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

Une machine produit 10 % de pièces défectueuses, indépendamment. On prend 8 pièces. X = nombre de pièces défectueuses. Pr(X = 4) ?
  [tap, suivre l'erreur, menu menu]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 8 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,1   ← p = probabilité d'un succès, n = 8
  — Pr(X=4)  [juge prob]  départ : Pr(X = 4)
    = C(8;4)×0,1^4×0,9^4   ← Formule de la binomiale
    = 70·0,0001·0,6561   ← Calculer chaque facteur
    = 45927/10000000   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(8;4)×0,1^□ | Pr(X = 4) = 45927/10000000
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

Une urne contient 2 boules rouges et 3 bleues. On tire 3 boules avec remise. X = nombre de rouges. Pr(X = 1) ?
  [tap, suivre l'erreur, menu menu]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 3 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,4   ← p = probabilité d'un succès, n = 3
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = C(3;1)×0,4×0,6^2   ← Formule de la binomiale
    = 3·0,4·0,36   ← Calculer chaque facteur
    = 0,432   ← Multiplier
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(3;1)×0,4 | Pr(X = 1) = 0,432
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

```

### Niveau 4

```
Une machine produit 20 % de pièces défectueuses, indépendamment. On prend 8 pièces. X = nombre de pièces défectueuses. Pr(X = 4) ? Puis E[X] et var(X).
  [free, suivre l'erreur]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 8 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,2   ← p = probabilité d'un succès, n = 8
  — Pr(X=4)  [juge prob]  départ : Pr(X = 4)
    = C(8;4)×0,2^4×0,8^4   ← Formule de la binomiale
    = 70·0,0016·0,4096   ← Calculer chaque facteur
    = 3584/78125   ← Multiplier
  — E[X]  [juge prob]  départ : E[X]
    = 8·0,2   ← np
    = 1,6   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 8·0,2·0,8   ← np(1 − p)
    = 1,28   ← Calculer
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(8;4)×0,2^□ | Pr(X = 4) = 3584/78125
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

Une urne contient 2 boules rouges et 3 bleues. On tire 3 boules avec remise. X = nombre de rouges. Pr(X = 2) ? Puis E[X] et var(X).
  [free, suivre l'erreur]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 3 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,4   ← p = probabilité d'un succès, n = 3
  — Pr(X=2)  [juge prob]  départ : Pr(X = 2)
    = C(3;2)×0,4^2×0,6   ← Formule de la binomiale
    = 3·0,16·0,6   ← Calculer chaque facteur
    = 0,288   ← Multiplier
  — E[X]  [juge prob]  départ : E[X]
    = 3·0,4   ← np
    = 1,2   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 3·0,4·0,6   ← np(1 − p)
    = 0,72   ← Calculer
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(3;2)×0,4^□ | Pr(X = 2) = 0,288
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

Une urne contient 4 boules rouges et 4 bleues. On tire 3 boules avec remise. X = nombre de rouges. Pr(X = 1) ? Puis Pr(X ≤ 1).
  [free, suivre l'erreur]  p
    ? X suit-elle une loi binomiale ? ✔ Oui : 3 essais indépendants, même probabilité de succès, X compte les succès / · Non : il faut compter les cas comme pour un tirage sans remise
    = 0,5   ← p = probabilité d'un succès, n = 3
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = C(3;1)×0,5×0,5^2   ← Formule de la binomiale
    = 3·0,5·0,25   ← Calculer chaque facteur
    = 0,375   ← Multiplier
  — Pr(X=0)  [juge prob]  départ : Pr(X = 0)
    = C(3;0)×0,5^3   ← Formule de la binomiale
    = 1·0,125   ← Calculer chaque facteur
    = 0,125   ← Multiplier
  — Pr(X≤1)  [juge prob]  départ : Pr(X ≤ 1)
    = 0,125 + 0,375   ← Deux cas
    = 0,5   ← Calculer
  aides : C(n, k) compte les places des succès ; ne l'oublie pas. | C(3;1)×0,5 | Pr(X = 1) = 0,375
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement, p_atleast_one_np

```

### Niveau 5

```
Une urne contient 4 boules rouges et 3 bleues. On tire 6 boules avec remise. X = nombre de rouges. Pr(X = 1) ? Puis E[X] et var(X). Puis Pr(X ≥ 2).
  [free, sans aide]  p
    = 4/7   ← p = probabilité d'un succès, n = 6
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = C(6;1)×4/7×(3/7)^5   ← Formule de la binomiale
    = 6·4/7·243/16807   ← Calculer chaque facteur
    = 5832/117649   ← Multiplier
  — E[X]  [juge prob]  départ : E[X]
    = 6·4/7   ← np
    = 24/7   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 6·4/7·3/7   ← np(1 − p)
    = 72/49   ← Calculer
  — Pr(X=0)  [juge prob]  départ : Pr(X = 0)
    = C(6;0)×(3/7)^6   ← Formule de la binomiale
    = 1·729/117649   ← Calculer chaque facteur
    = 729/117649   ← Multiplier
  — Pr(X≥2)  [juge prob]  départ : Pr(X ≥ 2)
    = 1 − 729/117649 − 5832/117649   ← Complément de « 0 ou 1 »
    = 111088/117649   ← Calculer
  pièges : p_binom_no_coef, p_binom_swap_p, p_atleast_one_np, p_binom_without_replacement

Une machine produit 20 % de pièces défectueuses, indépendamment. On prend 4 pièces. X = nombre de pièces défectueuses. Pr(X = 3) ? Puis E[X] et var(X). Puis Pr(X ≥ 2).
  [free, sans aide]  p
    = 0,2   ← p = probabilité d'un succès, n = 4
  — Pr(X=3)  [juge prob]  départ : Pr(X = 3)
    = C(4;3)×0,2^3×0,8   ← Formule de la binomiale
    = 4·0,008·0,8   ← Calculer chaque facteur
    = 0,0256   ← Multiplier
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

Une urne contient 2 boules rouges et 5 bleues. On tire 6 boules avec remise. X = nombre de rouges. Pr(X = 5) ? Puis E[X] et var(X). Puis Pr(X ≥ 2).
  [free, sans aide]  p
    = 2/7   ← p = probabilité d'un succès, n = 6
  — Pr(X=5)  [juge prob]  départ : Pr(X = 5)
    = C(6;5)×(2/7)^5×5/7   ← Formule de la binomiale
    = 6·32/16807·5/7   ← Calculer chaque facteur
    = 960/117649   ← Multiplier
  — E[X]  [juge prob]  départ : E[X]
    = 6·2/7   ← np
    = 12/7   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 6·2/7·5/7   ← np(1 − p)
    = 60/49   ← Calculer
  — Pr(X=0)  [juge prob]  départ : Pr(X = 0)
    = C(6;0)×(5/7)^6   ← Formule de la binomiale
    = 1·15625/117649   ← Calculer chaque facteur
    = 15625/117649   ← Multiplier
  — Pr(X=1)  [juge prob]  départ : Pr(X = 1)
    = C(6;1)×2/7×(5/7)^5   ← Formule de la binomiale
    = 6·2/7·3125/16807   ← Calculer chaque facteur
    = 37500/117649   ← Multiplier
  — Pr(X≥2)  [juge prob]  départ : Pr(X ≥ 2)
    = 1 − 15625/117649 − 37500/117649   ← Complément de « 0 ou 1 »
    = 64524/117649   ← Calculer
  pièges : p_binom_no_coef, p_binom_swap_p, p_atleast_one_np, p_binom_without_replacement

```

### Variantes d'examen

```
Un QCM a 4 questions à 5 réponses, dont une juste. Un élève répond au hasard. X = nombre de bonnes réponses. Pr(X = 2) ?
  · 0,5   · 0,04   · 0,0256 [p_binom_no_coef]   ✔ 0,1536
  [examen mcq]
  pièges : p_binom_no_coef

Vrai ou faux ?
  « Dans une urne de 5 boules dont 2 rouges, le nombre de rouges en 3 tirages sans remise suit la loi B(3 ; 2/5). » → FAUX
    contre-exemple (refute) : p = 0
  [examen tf]
  pièges : p_binom_without_replacement

Une urne contient 7 boules rouges et 2 bleues. On tire 4 boules avec remise. X = nombre de rouges. Pr(X = 3) ?
  [free, sans aide, examen coef]  Pr(X = 3)
    = C(4;3)×(7/9)^3×2/9   ← Formule de la binomiale
    = 4·343/729·2/9   ← Calculer chaque facteur
    = 2744/6561   ← Multiplier
  pièges : p_binom_no_coef, p_binom_swap_p, p_binom_without_replacement

```

## Loi de Poisson, lien avec la binomiale (`p-poisson`, BA3)

_X ~ Poiss(λ) : Pr(X = k) = λᵏe^(−λ)/k!, E = var = λ._

### Niveau 1

```
Une hotline reçoit en moyenne 1,5 appels par heure (loi de Poisson). X = nombre d'appels pendant 2 heures. Calcule λ, puis Pr(X = 0) à 0,001 près.
  [guided]  λ
    = 1,5·□   (trous : 1,5·2)   ← Taux × durée
    = □   (trous : 3)   ← Calculer
  — Pr(X=0)  [juge stat]  départ : Pr(X = 0)
    = e^(−□)   (trous : e^(−3))   ← Formule de Poisson
    = □   (trous : 0,050)   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-3) + … | Pr(X=0) ≈ 0,050
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

Une hotline reçoit en moyenne 2 appels par heure (loi de Poisson). X = nombre d'appels pendant 2 heures. Calcule λ, puis Pr(X = 0) à 0,001 près.
  [guided]  λ
    = □·2   (trous : 2·2)   ← Taux × durée
    = □   (trous : 4)   ← Calculer
  — Pr(X=0)  [juge stat]  départ : Pr(X = 0)
    = e^(−□)   (trous : e^(−4))   ← Formule de Poisson
    = □   (trous : 0,018)   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-4) + … | Pr(X=0) ≈ 0,018
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

Chaque jour, 100 voitures passent à un feu ; chacune le grille avec probabilité 0,04, indépendamment. X = nombre de voitures qui grillent le feu. Calcule λ, puis Pr(X = 1) à 0,001 près.
  [guided]  λ
    = 100·□   (trous : 100·0,04)   ← λ = n·p
    = □   (trous : 4)   ← Calculer
  — Pr(X=1)  [juge stat]  départ : Pr(X = 1)
    = □·e^(−4)   (trous : 4·e^(−4))   ← Formule de Poisson
    = □   (trous : 0,073)   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-4) + … | Pr(X=1) ≈ 0,073
  pièges : p_poisson_approx_bad, p_poisson_rate_scale, p_poisson_no_factorial

```

### Niveau 2

```
Un standard reçoit des appels de deux services indépendants : Poiss(0,5) et Poiss(1,5) par heure. X = nombre total d'appels en une heure. Calcule λ, puis Pr(X = 1) à 0,001 près.
  [guided]  λ
    = 0,5 + □   (trous : 0,5 + 1,5)   ← Somme de Poisson indépendantes
    = □   (trous : 2)   ← Calculer
  — Pr(X=1)  [juge stat]  départ : Pr(X = 1)
    = □·e^(−2)   (trous : 2·e^(−2))   ← Formule de Poisson
    = □   (trous : 0,271)   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-2) + … | Pr(X=1) ≈ 0,271
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

Une hotline reçoit en moyenne 1 appel par heure (loi de Poisson). X = nombre d'appels pendant 30 minutes. Calcule λ, puis Pr(X = 0) à 0,001 près.
  [guided]  λ
    = 1·□   (trous : 1·0,5)   ← Taux × durée
    = □   (trous : 0,5)   ← Calculer
  — Pr(X=0)  [juge stat]  départ : Pr(X = 0)
    = e^(−□)   (trous : e^(−0,5))   ← Formule de Poisson
    = □   (trous : 0,607)   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-0,5) + … | Pr(X=0) ≈ 0,607
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

Une hotline reçoit en moyenne 0,5 appel par heure (loi de Poisson). X = nombre d'appels pendant 2 heures. Calcule λ, puis Pr(X = 0) à 0,001 près.
  [guided]  λ
    = 0,5·□   (trous : 0,5·2)   ← Taux × durée
    = □   (trous : 1)   ← Calculer
  — Pr(X=0)  [juge stat]  départ : Pr(X = 0)
    = e^(−□)   (trous : e^(−1))   ← Formule de Poisson
    = □   (trous : 0,368)   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-1) + … | Pr(X=0) ≈ 0,368
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

```

### Niveau 3

```
Chaque jour, 800 voitures passent à un feu ; chacune le grille avec probabilité 0,005, indépendamment. X = nombre de voitures qui grillent le feu. Calcule λ, puis Pr(X = 3) à 0,001 près.
  [tap, suivre l'erreur, menu menu]  λ
    ? Quelle approximation de la loi binomiale ? ✔ Poisson de paramètre np : n grand, p petit / · Normale N(np, np(1 − p))
    = 800·0,005   ← λ = n·p
    = 4   ← Calculer
  — Pr(X=3)  [juge stat]  départ : Pr(X = 3)
    = 4³·e^(−4)/3!   ← Formule de Poisson
    = 0,195   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-4) + … | Pr(X=3) ≈ 0,195
  pièges : p_poisson_no_factorial, p_poisson_approx_bad, p_poisson_rate_scale

Une hotline reçoit en moyenne 2 appels par heure (loi de Poisson). X = nombre d'appels pendant 1 h 30. Calcule λ, puis Pr(X = 2) à 0,001 près.
  [tap, suivre l'erreur, menu menu]  λ
    = 2·1,5   ← Taux × durée
    = 3   ← Calculer
  — Pr(X=2)  [juge stat]  départ : Pr(X = 2)
    = 3²·e^(−3)/2!   ← Formule de Poisson
    = 0,224   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-3) + … | Pr(X=2) ≈ 0,224
  pièges : p_poisson_rate_scale, p_poisson_no_factorial, p_poisson_approx_bad

Une hotline reçoit en moyenne 1 appel par heure (loi de Poisson). X = nombre d'appels pendant 1 h 30. Calcule λ, puis Pr(X ≤ 2) à 0,001 près.
  [tap, suivre l'erreur, menu menu]  λ
    = 1·1,5   ← Taux × durée
    = 1,5   ← Calculer
  — Pr(X≤2)  [juge stat]  départ : Pr(X ≤ 2)
    = e^(−1,5) + 1,5·e^(−1,5) + 1,5²·e^(−1,5)/2!   ← Somme des cas
    = 0,809   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-1,5) + … | Pr(X≤2) ≈ 0,809
  pièges : p_poisson_rate_scale, p_poisson_no_factorial, p_poisson_approx_bad

```

### Niveau 4

```
Un standard reçoit des appels de deux services indépendants : Poiss(0,5) et Poiss(1,5) par heure. X = nombre total d'appels en une heure. Calcule λ, puis Pr(X = 1) à 0,001 près.
  [free, suivre l'erreur]  λ
    = 0,5 + 1,5   ← Somme de Poisson indépendantes
    = 2   ← Calculer
  — Pr(X=1)  [juge stat]  départ : Pr(X = 1)
    = 2·e^(−2)   ← Formule de Poisson
    = 0,271   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-2) + … | Pr(X=1) ≈ 0,271
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

Une hotline reçoit en moyenne 0,5 appel par heure (loi de Poisson). X = nombre d'appels pendant 2 heures. Calcule λ, puis Pr(X = 3) à 0,001 près.
  [free, suivre l'erreur]  λ
    = 0,5·2   ← Taux × durée
    = 1   ← Calculer
  — Pr(X=3)  [juge stat]  départ : Pr(X = 3)
    = 1³·e^(−1)/3!   ← Formule de Poisson
    = 0,061   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-1) + … | Pr(X=3) ≈ 0,061
  pièges : p_poisson_rate_scale, p_poisson_no_factorial, p_poisson_approx_bad

Une hotline reçoit en moyenne 2 appels par heure (loi de Poisson). X = nombre d'appels pendant 30 minutes. Calcule λ, puis Pr(X ≤ 1) à 0,001 près.
  [free, suivre l'erreur]  λ
    = 2·0,5   ← Taux × durée
    = 1   ← Calculer
  — Pr(X≤1)  [juge stat]  départ : Pr(X ≤ 1)
    = e^(−1) + 1·e^(−1)   ← Somme des cas
    = 0,736   ← Valeur approchée à 0,001
  aides : λ = n·p (ou le taux sur la durée) ; puis Pr(X = k) = λᵏe^(−λ)/k!. | e^(-1) + … | Pr(X≤1) ≈ 0,736
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

```

### Niveau 5

```
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

Une hotline reçoit en moyenne 0,5 appel par heure (loi de Poisson). X = nombre d'appels pendant 2 heures. Calcule λ, puis Pr(X ≤ 1) à 0,001 près.
  [free, sans aide]  λ
    = 0,5·2   ← Taux × durée
    = 1   ← Calculer
  — Pr(X≤1)  [juge stat]  départ : Pr(X ≤ 1)
    = e^(−1) + 1·e^(−1)   ← Somme des cas
    = 0,736   ← Valeur approchée à 0,001
  pièges : p_poisson_rate_scale, p_poisson_approx_bad, p_poisson_no_factorial

```

### Variantes d'examen

```
Une hotline reçoit en moyenne 1 appel par heure (loi de Poisson). X = nombre d'appels pendant 1 h 30. Pr(X≤3) ≈ ?
  · 1,813 [p_poisson_no_factorial]   ✔ 0,934   · 0,981 [p_poisson_rate_scale]   · 0,223
  [examen mcq]
  pièges : p_poisson_rate_scale, p_poisson_no_factorial

Vrai ou faux ?
  « Si X ~ Poiss(2) et Y ~ Poiss(3) sont indépendantes, alors X − Y suit aussi une loi de Poisson (en particulier, X − Y ≥ 0). » → FAUX
    contre-exemple (refute) : x = 0, y = 1
  [examen tf]
  pièges : p_poisson_rate_scale

Une hotline reçoit en moyenne 0,5 appel par heure (loi de Poisson). X = nombre d'appels pendant 2 heures. Calcule λ, puis Pr(X = 1) à 0,001 près.
  [free, sans aide, examen coef]  Pr(X = 1)
    = 1·e^(−1)   ← Formule de Poisson
    = 0,368   ← Valeur approchée à 0,001
  pièges : p_poisson_rate_scale, p_poisson_no_factorial

```

## Loi hypergéométrique (`p-hypergeom`, BA3)

_N objets dont K marqués ; on en tire n sans remise : Pr(X = k) = C(K, k)·C(N − K, n − k)/C(N, n), E[X] = nK/N._

### Niveau 1

```
Un lot de 15 pièces contient 9 pièces défectueuses. On en prélève 4 au hasard, sans remise. Probabilité d'obtenir exactement 4 défectueuses ?
  [guided]  Pr(X = 4)
    = C(9;□)×C(6;□)/C(15;4)   (trous : C(9;4)×C(6;0)/C(15;4))   ← 4 défectueuses, 0 autre, sur tous les tirages
    = 126/□   (trous : 126/1365)   ← Calculer
    = □   (trous : 6/65)   ← Simplifier
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(9;4)×C(6;□)/C(15;4) | Pr(X = 4) = 6/65
  pièges : p_binom_without_replacement, p_count_forget_rest

Une urne contient 5 boules rouges et 5 bleues. On tire 4 boules sans remise. Probabilité d'obtenir exactement 3 rouges ?
  [guided]  Pr(X = 3)
    = C(5;□)×C(5;□)/C(10;4)   (trous : C(5;3)×C(5;1)/C(10;4))   ← 3 rouges, 1 autre, sur tous les tirages
    = 50/□   (trous : 50/210)   ← Calculer
    = □   (trous : 5/21)   ← Simplifier
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(5;3)×C(5;□)/C(10;4) | Pr(X = 3) = 5/21
  pièges : p_binom_without_replacement, p_count_forget_rest

Un lot de 16 pièces contient 8 pièces défectueuses. On en prélève 3 au hasard, sans remise. Probabilité d'obtenir exactement 3 défectueuses ?
  [guided]  Pr(X = 3)
    = C(8;□)×C(8;□)/C(16;3)   (trous : C(8;3)×C(8;0)/C(16;3))   ← 3 défectueuses, 0 autre, sur tous les tirages
    = 56/□   (trous : 56/560)   ← Calculer
    = □   (trous : 0,1)   ← Simplifier
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(8;3)×C(8;□)/C(16;3) | Pr(X = 3) = 0,1
  pièges : p_binom_without_replacement, p_count_forget_rest

```

### Niveau 2

```
Une urne contient 8 boules rouges et 7 bleues. On tire 4 boules sans remise. Probabilité d'obtenir exactement 1 rouge ?
  [guided]  Pr(X = 1)
    = C(8;□)×C(7;□)/C(15;4)   (trous : C(8;1)×C(7;3)/C(15;4))   ← 1 rouge, 3 autres, sur tous les tirages
    = 280/□   (trous : 280/1365)   ← Calculer
    = □   (trous : 8/39)   ← Simplifier
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(8;1)×C(7;□)/C(15;4) | Pr(X = 1) = 8/39
  pièges : p_binom_without_replacement, p_count_forget_rest

Un lot de 15 pièces contient 9 pièces défectueuses. On en prélève 2 au hasard, sans remise. Probabilité d'obtenir exactement 2 défectueuses ?
  [guided]  Pr(X = 2)
    = C(9;□)×C(6;□)/C(15;2)   (trous : C(9;2)×C(6;0)/C(15;2))   ← 2 défectueuses, 0 autre, sur tous les tirages
    = 36/□   (trous : 36/105)   ← Calculer
    = □   (trous : 12/35)   ← Simplifier
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(9;2)×C(6;□)/C(15;2) | Pr(X = 2) = 12/35
  pièges : p_binom_without_replacement, p_count_forget_rest

Une urne contient 9 boules rouges et 4 bleues. On tire 2 boules sans remise. Probabilité d'obtenir exactement 2 rouges ?
  [guided]  Pr(X = 2)
    = C(9;□)×C(4;□)/C(13;2)   (trous : C(9;2)×C(4;0)/C(13;2))   ← 2 rouges, 0 autre, sur tous les tirages
    = 36/□   (trous : 36/78)   ← Calculer
    = □   (trous : 6/13)   ← Simplifier
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(9;2)×C(4;□)/C(13;2) | Pr(X = 2) = 6/13
  pièges : p_binom_without_replacement, p_count_forget_rest

```

### Niveau 3

```
Une urne contient 7 boules rouges et 4 bleues. On tire 5 boules sans remise. Probabilité d'obtenir exactement 5 rouges ?
  [tap, suivre l'erreur, menu menu]  Pr(X = 5)
    = C(7;5)×C(4;0)/C(11;5)   ← 5 rouges, 0 autre, sur tous les tirages
    = 21/462   ← Calculer
    = 1/22   ← Simplifier
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(7;5)×C(4;□)/C(11;5) | Pr(X = 5) = 1/22
  pièges : p_binom_without_replacement, p_count_forget_rest

Un lot de 15 pièces contient 7 pièces défectueuses. On en prélève 2 au hasard, sans remise. Probabilité d'obtenir exactement 1 défectueuse ?
  [tap, suivre l'erreur, menu menu]  Pr(X = 1)
    = C(7;1)×C(8;1)/C(15;2)   ← 1 défectueuse, 1 autre, sur tous les tirages
    = 56/105   ← Calculer
    = 8/15   ← Simplifier
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(7;1)×C(8;□)/C(15;2) | Pr(X = 1) = 8/15
  pièges : p_binom_without_replacement, p_count_forget_rest

Une urne contient 8 boules rouges et 3 bleues. On tire 2 boules sans remise. Probabilité d'obtenir exactement 2 rouges ?
  [tap, suivre l'erreur, menu menu]  Pr(X = 2)
    = C(8;2)×C(3;0)/C(11;2)   ← 2 rouges, 0 autre, sur tous les tirages
    = 28/55   ← Calculer
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(8;2)×C(3;□)/C(11;2) | Pr(X = 2) = 28/55
  pièges : p_binom_without_replacement, p_count_forget_rest

```

### Niveau 4

```
Une urne contient 7 boules rouges et 5 bleues. On tire 3 boules sans remise. Probabilité d'obtenir exactement 3 rouges ? Puis la probabilité d'en obtenir au moins une.
  [free, suivre l'erreur]  Pr(X = 3)
    = C(7;3)×C(5;0)/C(12;3)   ← 3 rouges, 0 autre, sur tous les tirages
    = 35/220   ← Calculer
    = 7/44   ← Simplifier
  — Pr(X≥1)  [juge prob]  départ : Pr(X ≥ 1)
    = 1-C(5;3)/C(12;3)   ← Contraire de « aucune »
    = 21/22   ← Calculer
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(7;3)×C(5;□)/C(12;3) | Pr(X = 3) = 7/44
  pièges : p_binom_without_replacement, p_count_forget_rest

Une urne contient 4 boules rouges et 5 bleues. On tire 3 boules sans remise. Probabilité d'obtenir exactement 3 rouges ? Puis la probabilité d'en obtenir au moins une.
  [free, suivre l'erreur]  Pr(X = 3)
    = C(4;3)×C(5;0)/C(9;3)   ← 3 rouges, 0 autre, sur tous les tirages
    = 4/84   ← Calculer
    = 1/21   ← Simplifier
  — Pr(X≥1)  [juge prob]  départ : Pr(X ≥ 1)
    = 1-C(5;3)/C(9;3)   ← Contraire de « aucune »
    = 37/42   ← Calculer
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(4;3)×C(5;□)/C(9;3) | Pr(X = 3) = 1/21
  pièges : p_binom_without_replacement, p_count_forget_rest

Un lot de 13 pièces contient 8 pièces défectueuses. On en prélève 3 au hasard, sans remise. Probabilité d'obtenir exactement 2 défectueuses ? Puis la probabilité d'en obtenir au moins une.
  [free, suivre l'erreur]  Pr(X = 2)
    = C(8;2)×C(5;1)/C(13;3)   ← 2 défectueuses, 1 autre, sur tous les tirages
    = 140/286   ← Calculer
    = 70/143   ← Simplifier
  — Pr(X≥1)  [juge prob]  départ : Pr(X ≥ 1)
    = 1-C(5;3)/C(13;3)   ← Contraire de « aucune »
    = 138/143   ← Calculer
  aides : Sans remise : on compte, on ne multiplie pas des p. | C(8;2)×C(5;□)/C(13;3) | Pr(X = 2) = 70/143
  pièges : p_binom_without_replacement, p_count_forget_rest

```

### Niveau 5

```
Une urne contient 7 boules rouges et 8 bleues. On tire 2 boules sans remise. Probabilité d'obtenir exactement 2 rouges ? Puis la probabilité d'en obtenir au moins une. Enfin, la probabilité d'en avoir exactement 2 sachant qu'il y en a au moins une.
  [free, sans aide]  Pr(X = 2)
    = C(7;2)×C(8;0)/C(15;2)   ← 2 rouges, 0 autre, sur tous les tirages
    = 21/105   ← Calculer
    = 0,2   ← Simplifier
  — Pr(X≥1)  [juge prob]  départ : Pr(X ≥ 1)
    = 1-C(8;2)/C(15;2)   ← Contraire de « aucune »
    = 11/15   ← Calculer
  — Pr(X=2|X≥1)  [juge prob]  départ : Pr(X=2|X≥1)
    = 0,2/(11/15)   ← {X = 2} est contenu dans {X ≥ 1}
    = 3/11   ← Calculer
  pièges : p_binom_without_replacement, p_count_forget_rest, p_cond_denominator

Un lot de 12 pièces contient 8 pièces défectueuses. On en prélève 3 au hasard, sans remise. Probabilité d'obtenir exactement 3 défectueuses ? Puis la probabilité d'en obtenir au moins une. Enfin, la probabilité d'en avoir exactement 3 sachant qu'il y en a au moins une.
  [free, sans aide]  Pr(X = 3)
    = C(8;3)×C(4;0)/C(12;3)   ← 3 défectueuses, 0 autre, sur tous les tirages
    = 56/220   ← Calculer
    = 14/55   ← Simplifier
  — Pr(X≥1)  [juge prob]  départ : Pr(X ≥ 1)
    = 1-C(4;3)/C(12;3)   ← Contraire de « aucune »
    = 54/55   ← Calculer
  — Pr(X=3|X≥1)  [juge prob]  départ : Pr(X=3|X≥1)
    = (14/55)/(54/55)   ← {X = 3} est contenu dans {X ≥ 1}
    = 7/27   ← Calculer
  pièges : p_binom_without_replacement, p_count_forget_rest, p_cond_denominator

Un lot de 15 pièces contient 9 pièces défectueuses. On en prélève 3 au hasard, sans remise. Probabilité d'obtenir exactement 3 défectueuses ? Puis la probabilité d'en obtenir au moins une. Enfin, la probabilité d'en avoir exactement 3 sachant qu'il y en a au moins une.
  [free, sans aide]  Pr(X = 3)
    = C(9;3)×C(6;0)/C(15;3)   ← 3 défectueuses, 0 autre, sur tous les tirages
    = 84/455   ← Calculer
    = 12/65   ← Simplifier
  — Pr(X≥1)  [juge prob]  départ : Pr(X ≥ 1)
    = 1-C(6;3)/C(15;3)   ← Contraire de « aucune »
    = 87/91   ← Calculer
  — Pr(X=3|X≥1)  [juge prob]  départ : Pr(X=3|X≥1)
    = (12/65)/(87/91)   ← {X = 3} est contenu dans {X ≥ 1}
    = 28/145   ← Calculer
  pièges : p_binom_without_replacement, p_count_forget_rest, p_cond_denominator

```

### Variantes d'examen

```
Un lot de 12 pièces contient 9 pièces défectueuses. On en prélève 2 au hasard, sans remise. Probabilité d'obtenir exactement 1 défectueuse ?
  ✔ 9/22   · 0,5   · 0,375 [p_binom_without_replacement]   · 3/22 [p_count_forget_rest]
  [examen mcq]
  pièges : p_binom_without_replacement, p_count_forget_rest

Une urne contient 9 boules rouges et 3 bleues. On tire 4 boules sans remise. Probabilité d'obtenir exactement 1 rouge ?
  [free, sans aide, examen coef]  Pr(X = 1)
    = C(9;1)×C(3;3)/C(12;4)   ← 1 rouge, 3 autres, sur tous les tirages
    = 9/495   ← Calculer
    = 1/55   ← Simplifier
  pièges : p_binom_without_replacement, p_count_forget_rest

```

## Densité : normaliser, F ↔ f, probabilités (`p-cont-density`, BA3)

_Une densité vérifie f ≥ 0 et ∫ f = 1 sur le support._

### Niveau 1

```
X a pour densité c·x^−3 pour x ≥ 1, et 0 ailleurs. Trouve c, puis Pr(X>3).
  [guided]  I
    (I = ∫ x^−3 dx sur le support [1 ; ∞[.)
    (Sur quel intervalle intègre-t-on ? Sur le support [1 ; ∞[.)
    = 0 − (−□)   (trous : 0 − (−1/2))   ← ∫₁^∞ x^(−3) dx = [−x^(−2)/2]₁^∞
    = □   (trous : 1/2)
  — c  [juge prob]  départ : c
    = 1/(□)   (trous : 1/(1/2))   ← c·I = 1
    = □   (trous : 2)
  — Pr(X>3)  [juge prob]  départ : Pr(X > 3)
    = 3^(□)   (trous : 3^(−2))
    = □   (trous : 1/9)
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(1/2) = □ | c = 2, puis Pr(X>3) = 1/9
  pièges : p_density_is_prob, p_normalize_bounds

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

X a pour densité c·x² pour 0 ≤ x ≤ 3, et 0 ailleurs. Trouve c, puis Pr(X≤3/2).
  [guided]  I
    (I = ∫ x^2 dx sur le support [0 ; 3].)
    (Sur quel intervalle intègre-t-on ? Sur le support [0 ; 3].)
    = □³/3   (trous : 3³/3)   ← ∫₀^3 x^2 dx = [x^3/3]₀^3
    = □   (trous : 9)
  — c  [juge prob]  départ : c
    = 1/□   (trous : 1/9)   ← c·I = 1
  — Pr(X≤3/2)  [juge prob]  départ : Pr(X ≤ 3/2)
    = (1/2)^□   (trous : (1/2)³)
    = □   (trous : 1/8)
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/9 = □ | c = 1/9, puis Pr(X≤3/2) = 0,125
  pièges : p_normalize_bounds, p_density_is_prob

```

### Niveau 2

```
X a pour densité c·e^(−3x) pour x ≥ 0, et 0 ailleurs. Trouve c, puis Pr(X≤1).
  [guided]  I
    (I = ∫ e^(-3x) dx sur le support [0 ; ∞[.)
    ? Sur quel intervalle intègre-t-on ? ✔ Sur le support [0 ; ∞[ / · Sur [0 ; 1]
    = 0 − (−□)   (trous : 0 − (−1/3))   ← ∫₀^∞ e^(−3x) dx = [−e^(−3x)/3]₀^∞
    = □   (trous : 1/3)
  — c  [juge prob]  départ : c
    = 1/(□)   (trous : 1/(1/3))   ← c·I = 1
    = □   (trous : 3)
  — Pr(X≤1)  [juge stat]  départ : Pr(X ≤ 1)
    = 1 − e^(□)   (trous : 1 − e^(−3))
    = □   (trous : 0,95)
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(1/3) = □ | c = 3, puis Pr(X≤1) = 0,95
  pièges : p_normalize_bounds

X a pour densité c·e^(−2x) pour x ≥ 0, et 0 ailleurs. Trouve c, puis Pr(X≤1).
  [guided]  I
    (I = ∫ e^(-2x) dx sur le support [0 ; ∞[.)
    ? Sur quel intervalle intègre-t-on ? ✔ Sur le support [0 ; ∞[ / · Sur [0 ; 1]
    = 0 − (−□)   (trous : 0 − (−1/2))   ← ∫₀^∞ e^(−2x) dx = [−e^(−2x)/2]₀^∞
    = □   (trous : 1/2)
  — c  [juge prob]  départ : c
    = 1/(□)   (trous : 1/(1/2))   ← c·I = 1
    = □   (trous : 2)
  — Pr(X≤1)  [juge stat]  départ : Pr(X ≤ 1)
    = 1 − e^(□)   (trous : 1 − e^(−2))
    = □   (trous : 0,865)
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(1/2) = □ | c = 2, puis Pr(X≤1) = 0,865
  pièges : p_normalize_bounds

X a pour densité c·x^−4 pour x ≥ 1, et 0 ailleurs. Trouve c, puis Pr(X>3).
  [guided]  I
    (I = ∫ x^−4 dx sur le support [1 ; ∞[.)
    ? Sur quel intervalle intègre-t-on ? ✔ Sur le support [1 ; ∞[ / · Sur [0 ; ∞[
    = 0 − (−□)   (trous : 0 − (−1/3))   ← ∫₁^∞ x^(−4) dx = [−x^(−3)/3]₁^∞
    = □   (trous : 1/3)
  — c  [juge prob]  départ : c
    = 1/(□)   (trous : 1/(1/3))   ← c·I = 1
    = □   (trous : 3)
  — Pr(X>3)  [juge prob]  départ : Pr(X > 3)
    = 3^(□)   (trous : 3^(−3))
    = □   (trous : 1/27)
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(1/3) = □ | c = 3, puis Pr(X>3) = 1/27
  pièges : p_density_is_prob, p_normalize_bounds

```

### Niveau 3

```
X a pour densité c·x^−4 pour x ≥ 1, et 0 ailleurs. Trouve c, puis Pr(X>3).
  [tap, suivre l'erreur, menu menu]  I
    (I = ∫ x^−4 dx sur le support [1 ; ∞[.)
    = 0 − (−1/3)   ← ∫₁^∞ x^(−4) dx = [−x^(−3)/3]₁^∞
    = 1/3
  — c  [juge prob]  départ : c
    = 1/(1/3)   ← c·I = 1
    = 3
  — Pr(X>3)  [juge prob]  départ : Pr(X > 3)
    = 3^(−3)
    = 1/27
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(1/3) = □ | c = 3, puis Pr(X>3) = 1/27
  pièges : p_density_is_prob, p_normalize_bounds

X a pour densité c·e^(−2x) pour x ≥ 0, et 0 ailleurs. Trouve c, puis Pr(X≤1).
  [tap, suivre l'erreur, menu menu]  I
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

X a pour densité c·e^(−2x) pour x ≥ 0, et 0 ailleurs. Trouve c, puis Pr(X≤1).
  [tap, suivre l'erreur, menu menu]  I
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

### Niveau 4

```
X a pour densité c·x(2 − x) pour 0 ≤ x ≤ 2, et 0 ailleurs. Trouve c, puis Pr(X≤1).
  [free, suivre l'erreur]  I
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

X a pour densité c·x(3 − x) pour 0 ≤ x ≤ 3, et 0 ailleurs. Trouve c, puis Pr(X≤1).
  [free, suivre l'erreur]  I
    (I = ∫ x(3-x) dx sur le support [0 ; 3].)
    = 27/2 − 27/3   ← ∫₀^3 (3x − x²) dx = [3x²/2 − x³/3]₀^3
    = 9/2
  — c  [juge prob]  départ : c
    = 1/(9/2)   ← c·I = 1
    = 2/9
  — Pr(X≤1)  [juge prob]  départ : Pr(X ≤ 1)
    = 2/9·(3/2 − 1/3)
    = 7/27
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(9/2) = □ | c = 2/9, puis Pr(X≤1) = 7/27
  pièges : p_normalize_bounds, p_density_is_prob

X a pour densité c·x^−5 pour x ≥ 1, et 0 ailleurs. Trouve c, puis F(x) sur le support, puis Pr(X>2).
  [free, suivre l'erreur]  I
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
  aides : L'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I. | 1/(1/4) = □ | c = 4, puis Pr(X>2) = 0,0625
  pièges : p_density_is_prob, p_normalize_bounds, p_cdf_piecewise

```

### Niveau 5

```
X a pour densité c·x^−4 pour x ≥ 1, et 0 ailleurs. Trouve c, puis F(x) sur le support, puis Pr(X>2) et Pr(X > 2 | X < 3).
  [free, sans aide]  I
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
  — Pr(X>2|X<3)  [juge prob]  départ : Pr(X>2|X<3)
    = (2^(−3) − 3^(−3))/(1 − 3^(−3))   ← (F(3) − F(2))/F(3)
    = 19/208
  pièges : p_density_is_prob, p_cond_denominator, p_normalize_bounds, p_cdf_piecewise

X a pour densité c·x^−4 pour x ≥ 1, et 0 ailleurs. Trouve c, puis F(x) sur le support, puis Pr(X>2) et Pr(X > 2 | X < 3).
  [free, sans aide]  I
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
  — Pr(X>2|X<3)  [juge prob]  départ : Pr(X>2|X<3)
    = (2^(−3) − 3^(−3))/(1 − 3^(−3))   ← (F(3) − F(2))/F(3)
    = 19/208
  pièges : p_density_is_prob, p_cond_denominator, p_normalize_bounds, p_cdf_piecewise

X a pour densité c·x^−3 pour x ≥ 1, et 0 ailleurs. Trouve c, puis F(x) sur le support, puis Pr(X>3) et Pr(X > 2 | X < 3).
  [free, sans aide]  I
    (I = ∫ x^−3 dx sur le support [1 ; ∞[.)
    = 0 − (−1/2)   ← ∫₁^∞ x^(−3) dx = [−x^(−2)/2]₁^∞
    = 1/2
  — c  [juge prob]  départ : c
    = 1/(1/2)   ← c·I = 1
    = 2
  — F(x) sur le support (x ≥ 1)  [juge prob]  départ : F(x)
    ? Et hors du support ? ✔ F(x) = 0 si x < 1 / · La même formule pour tout x
    = 1 − x^(−2)
  — Pr(X>3)  [juge prob]  départ : Pr(X > 3)
    = 3^(−2)
    = 1/9
  — Pr(X>2|X<3)  [juge prob]  départ : Pr(X>2|X<3)
    = (2^(−2) − 3^(−2))/(1 − 3^(−2))   ← (F(3) − F(2))/F(3)
    = 5/32
  pièges : p_density_is_prob, p_cond_denominator, p_normalize_bounds, p_cdf_piecewise

```

### Variantes d'examen

```
X a pour densité 1/9·x² pour 0 ≤ x ≤ 3, et 0 ailleurs. Que vaut Pr(X = 1) ?
  ✔ 0   · 26/27   · 1/27   · 1/9 [p_density_is_prob]
  [examen mcq]
  pièges : p_density_is_prob

Vrai ou faux ?
  « Si X a pour densité f, alors Pr(X = a) = f(a) pour tout a. » → FAUX
    contre-exemple (refute) : p = 0, f = 4
  [examen tf]
  pièges : p_density_is_prob

X a pour densité c·x^−5 pour x ≥ 1, et 0 ailleurs. Que vaut c ?
  [free, sans aide, examen coef]  c
    = 4

```

## Quantile d'une loi continue (`p-cont-quantile`, BA3)

_Le quantile d'ordre α est la solution q de F(q) = α (F inversible)._

### Niveau 1

```
X a pour densité f(x) = 2x¹ pour 0 ≤ x ≤ 1 (et 0 ailleurs), donc F(x) = x² sur ce support. Calcule q, la médiane de X (au millième).
  [guided]  q
    (On résout F(q) = 1/2 : q^2 = 1/2.)
    (Sur quelle fonction résout-on ? F(q) = 1/2.)
    = (□)^(1/2)   (trous : (1/2)^(1/2))
    = □   (trous : 0,707)
  aides : Un quantile se lit sur F : on résout F(q) = α. | q^2 = 1/2, donc q = □ | q = (1/2)^(1/2) ≈ 0,707
  pièges : p_quantile_from_pdf, p_quantile_inverse, p_median_mean

X a pour densité f(x) = 2x/16 pour 0 ≤ x ≤ 4 (et 0 ailleurs), donc F(x) = x²/16 sur ce support. Calcule q, la médiane de X (au millième).
  [guided]  q
    (On résout F(q) = 1/2 : q²/16 = 1/2.)
    (Sur quelle fonction résout-on ? F(q) = 1/2.)
    = 4√(□)   (trous : 4√(1/2))
    = □   (trous : 2,828)
  aides : Un quantile se lit sur F : on résout F(q) = α. | q²/16 = 1/2, donc q = □ | q = 4√(1/2) ≈ 2,828
  pièges : p_quantile_from_pdf, p_quantile_inverse, p_median_mean

X a pour densité f(x) = 2x¹ pour 0 ≤ x ≤ 1 (et 0 ailleurs), donc F(x) = x² sur ce support. Calcule q, le quartile supérieur de X (au millième).
  [guided]  q
    (On résout F(q) = 3/4 : q^2 = 3/4.)
    (Sur quelle fonction résout-on ? F(q) = 3/4.)
    = (□)^(1/2)   (trous : (3/4)^(1/2))
    = □   (trous : 0,866)
  aides : Un quantile se lit sur F : on résout F(q) = α. | q^2 = 3/4, donc q = □ | q = (3/4)^(1/2) ≈ 0,866
  pièges : p_quantile_from_pdf, p_quantile_inverse

```

### Niveau 2

```
X a pour densité f(x) = 1/4 pour 4 ≤ x ≤ 8 (et 0 ailleurs). Calcule q, la médiane de X (au millième).
  [guided]  F(x)
    = □   (trous : (x − 4)/4)
  — q  [juge stat]  départ : q
    (On résout F(q) = 1/2 : (q − 4)/4 = 1/2.)
    ? Sur quelle fonction résout-on ? ✔ F(q) = 1/2 / · f(q) = 1/2 / · q = F(1/2)
    = 4 + □·4   (trous : 4 + 1/2·4)
    = □   (trous : 6)
  aides : Un quantile se lit sur F : on résout F(q) = α. | (q − 4)/4 = 1/2, donc q = □ | q = 4+1/2×4 ≈ 6
  pièges : p_quantile_from_pdf, p_quantile_inverse

X a pour densité f(x) = 2x/16 pour 0 ≤ x ≤ 4 (et 0 ailleurs). Calcule q, le quantile d'ordre 0,9 de X (au millième).
  [guided]  F(x)
    = □   (trous : x²/16)
  — q  [juge stat]  départ : q
    (On résout F(q) = 0,9 : q²/16 = 0,9.)
    ? Sur quelle fonction résout-on ? ✔ F(q) = 0,9 / · f(q) = 0,9 / · q = F(0,9)
    = 4√(□)   (trous : 4√(0,9))
    = □   (trous : 3,795)
  aides : Un quantile se lit sur F : on résout F(q) = α. | q²/16 = 0,9, donc q = □ | q = 4√0,9 ≈ 3,795
  pièges : p_quantile_inverse, p_quantile_from_pdf

X a pour densité f(x) = 1/10 pour 1 ≤ x ≤ 11 (et 0 ailleurs). Calcule q, le quartile supérieur de X (au millième).
  [guided]  F(x)
    = □   (trous : (x − 1)/10)
  — q  [juge stat]  départ : q
    (On résout F(q) = 3/4 : (q − 1)/10 = 3/4.)
    ? Sur quelle fonction résout-on ? ✔ F(q) = 3/4 / · f(q) = 3/4 / · q = F(3/4)
    = 1 + □·10   (trous : 1 + 3/4·10)
    = □   (trous : 8,5)
  aides : Un quantile se lit sur F : on résout F(q) = α. | (q − 1)/10 = 3/4, donc q = □ | q = 1+3/4×10 ≈ 8,5
  pièges : p_quantile_from_pdf, p_quantile_inverse

```

### Niveau 3

```
X a pour densité f(x) = e^(−x) pour x ≥ 0 (et 0 ailleurs). Calcule q, le premier quartile de X (au millième).
  [tap, suivre l'erreur, menu menu]  F(x)
    = 1 − e^(−x)
  — q  [juge stat]  départ : q
    (On résout F(q) = 1/4 : 1 − e^(−q) = 1/4.)
    = −ln(1 − 1/4)
    = 0,288
  aides : Un quantile se lit sur F : on résout F(q) = α. | 1 − e^(−q) = 1/4, donc q = □ | q = -ln(1-1/4) ≈ 0,288
  pièges : p_quantile_from_pdf, p_quantile_inverse

X a pour densité f(x) = 3x^−4 pour x ≥ 1 (et 0 ailleurs). Calcule q, le quartile supérieur de X (au millième).
  [tap, suivre l'erreur, menu menu]  F(x)
    = 1 − x^(−3)
  — q  [juge stat]  départ : q
    (On résout F(q) = 3/4 : 1 − q^−3 = 3/4.)
    = (1 − 3/4)^(−1/3)
    = 1,587
  aides : Un quantile se lit sur F : on résout F(q) = α. | 1 − q^−3 = 3/4, donc q = □ | q = (1-3/4)^(-1/3) ≈ 1,587
  pièges : p_quantile_from_pdf, p_quantile_inverse

X a pour densité f(x) = 1/2e^(−(1/2)x) pour x ≥ 0 (et 0 ailleurs). Calcule q, la médiane de X (au millième).
  [tap, suivre l'erreur, menu menu]  F(x)
    = 1 − e^(−(1/2)x)
  — q  [juge stat]  départ : q
    (On résout F(q) = 1/2 : 1 − e^(−0,5q) = 1/2.)
    = −ln(1 − 1/2)/(1/2)
    = 1,386
  aides : Un quantile se lit sur F : on résout F(q) = α. | 1 − e^(−0,5q) = 1/2, donc q = □ | q = -ln(1-1/2)/(1/2) ≈ 1,386
  pièges : p_quantile_inverse, p_median_mean, p_quantile_from_pdf

```

### Niveau 4

```
X a pour densité f(x) = 1/2e^(−(1/2)x) pour x ≥ 0 (et 0 ailleurs). Calcule q, la médiane de X (au millième).
  [free, suivre l'erreur]  F(x)
    = 1 − e^(−(1/2)x)
  — q  [juge stat]  départ : q
    (On résout F(q) = 1/2 : 1 − e^(−0,5q) = 1/2.)
    = −ln(1 − 1/2)/(1/2)
    = 1,386
  aides : Un quantile se lit sur F : on résout F(q) = α. | 1 − e^(−0,5q) = 1/2, donc q = □ | q = -ln(1-1/2)/(1/2) ≈ 1,386
  pièges : p_quantile_inverse, p_median_mean, p_quantile_from_pdf

X a pour densité f(x) = 1/2e^(−(1/2)x) pour x ≥ 0 (et 0 ailleurs). Calcule q, le premier quartile de X (au millième).
  [free, suivre l'erreur]  F(x)
    = 1 − e^(−(1/2)x)
  — q  [juge stat]  départ : q
    (On résout F(q) = 1/4 : 1 − e^(−0,5q) = 1/4.)
    = −ln(1 − 1/4)/(1/2)
    = 0,575
  aides : Un quantile se lit sur F : on résout F(q) = α. | 1 − e^(−0,5q) = 1/4, donc q = □ | q = -ln(1-1/4)/(1/2) ≈ 0,575
  pièges : p_quantile_from_pdf, p_quantile_inverse

X a pour densité f(x) = 2x^−3 pour x ≥ 1 (et 0 ailleurs). Calcule q, le quartile supérieur de X (au millième).
  [free, suivre l'erreur]  F(x)
    = 1 − x^(−2)
  — q  [juge stat]  départ : q
    (On résout F(q) = 3/4 : 1 − q^−2 = 3/4.)
    = (1 − 3/4)^(−1/2)
    = 2
  aides : Un quantile se lit sur F : on résout F(q) = α. | 1 − q^−2 = 3/4, donc q = □ | q = (1-3/4)^(-1/2) ≈ 2
  pièges : p_quantile_from_pdf, p_quantile_inverse

```

### Niveau 5

```
X a pour densité f(x) = c·x pour 0 ≤ x ≤ 4 (et 0 ailleurs). Trouve c, puis la médiane de X (au millième).
  [free, sans aide]  c
    = 2/16
    = 1/8
  — F(x)  [juge prob]  départ : F(x)
    = x²/16
  — méd  [juge stat]  départ : méd
    = 4/√2
    = 2,828
  pièges : p_quantile_from_pdf, p_median_mean, p_quantile_inverse

X a pour densité f(x) = x/4·e^(−x²/8) pour x ≥ 0 (et 0 ailleurs). Calcule q, le quantile d'ordre 0,9 de X (au millième).
  [free, sans aide]  F(x)
    = 1 − e^(−x²/8)
  — q  [juge stat]  départ : q
    (On résout F(q) = 0,9 : 1 − e^(−q²/8) = 0,9.)
    = 2√(−2ln(1 − 0,9))
    = 4,292
  pièges : p_quantile_inverse, p_quantile_from_pdf

X a pour densité f(x) = 3e^(−3x) pour x ≥ 0 (et 0 ailleurs). Calcule q, le quantile d'ordre 0,95 de X (au millième).
  [free, sans aide]  F(x)
    = 1 − e^(−3x)
  — q  [juge stat]  départ : q
    (On résout F(q) = 0,95 : 1 − e^(−3q) = 0,95.)
    = −ln(1 − 0,95)/3
    = 0,999
  pièges : p_quantile_from_pdf, p_quantile_inverse

```

### Variantes d'examen

```
X a pour densité f(x) = c·x pour 0 ≤ x ≤ 4 (et 0 ailleurs). Quelle est la médiane de X ?
  ✔ 2√2   · 8/3 [p_median_mean]   · 4 [p_quantile_from_pdf]   · 1/64 [p_quantile_inverse]
  [examen mcq]
  pièges : p_quantile_from_pdf, p_median_mean, p_quantile_inverse

Vrai ou faux ?
  « La médiane d'une loi continue est toujours égale à son espérance. » → FAUX
    contre-exemple (refute) : m = 1/√2, w = 2/3
  [examen tf]
  pièges : p_median_mean

X a pour densité f(x) = 3x^−4 pour x ≥ 1 (et 0 ailleurs). Calcule le quartile supérieur (au millième).
  [free, sans aide, examen coef]  q
    = 1,587

```

## Uniforme et exponentielle, absence de mémoire (`p-unif-exp`, BA3)

_U(a, b) : f = 1/(b − a), F(x) = (x − a)/(b − a), E = (a + b)/2, var = (b − a)²/12._

### Niveau 1

```
La durée de vie X d'une télévision suit une loi exponentielle de moyenne 10 ans. Elle fonctionne déjà depuis 2 ans. Quelle est la probabilité qu'elle dure encore au moins 5 ans (au millième) ?
  [guided]  λ
    (Le paramètre λ de l'exponentielle ? λ = 1/10 : c'est un taux, l'inverse de la moyenne.)
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

La durée de vie X d'une télévision suit une loi exponentielle de moyenne 20 ans. Calcule Pr(X > 40) (au millième).
  [guided]  λ
    (Le paramètre λ de l'exponentielle ? λ = 1/20 : c'est un taux, l'inverse de la moyenne.)
    = 1/□   (trous : 1/20)
  — Pr(X>40)  [juge stat]  départ : Pr(X > 40)
    = e^(−□/20)   (trous : e^(−40/20))
    = 0,135
  aides : Pr(X > x) = e^(−λx), et λ = 1/moyenne. | e^(−40/□) | 0,135
  pièges : p_exp_rate_mean, p_upper_tail

Le temps d'attente X chez le coiffeur (en minutes) suit une loi uniforme U(0 ; 60). Calcule la densité, puis Pr(X > 12).
  [guided]  f(x)
    = 1/(□)   (trous : 1/(60 − 0))
    = 1/60
  — Pr(X>12)  [juge prob]  départ : Pr(X > 12)
    = (□)/60   (trous : (60 − 12)/60)
    = 4/5
  aides : U(a, b) : f = 1/(b − a) sur [a ; b] ; une probabilité est une longueur fois f. | Pr(X > 12) = (60 − □)/60 | Pr(X > 12) = 0,8

```

### Niveau 2

```
La durée de vie X d'une télévision suit une loi exponentielle de moyenne 20 ans. Elle fonctionne déjà depuis 4 ans. Quelle est la probabilité qu'elle dure encore au moins 20 ans (au millième) ?
  [guided]  λ
    ? Le paramètre λ de l'exponentielle ? ✔ λ = 1/20 : c'est un taux, l'inverse de la moyenne / · λ = 20, la moyenne
    = 1/□   (trous : 1/20)
  — Pr(X>24)  [juge stat]  départ : Pr(X > 24)
    = e^(−□/20)   (trous : e^(−24/20))
    = 0,301
  — Pr(X>4)  [juge stat]  départ : Pr(X > 4)
    = e^(−□/20)   (trous : e^(−4/20))
    = 0,819
  — Pr(X>24|X>4)  [juge stat]  départ : Pr(X>24|X>4)
    (Absence de mémoire : le résultat est Pr(X > t).)
    = e^(−24/20)/□   (trous : e^(−24/20)/e^(−4/20))
    = e^(−20/20)
    = 0,368
  aides : Pr(X > s + t | X > s) = Pr(X > s + t)/Pr(X > s) ; pour l'exponentielle, Pr(X > x) = e^(−λx). | e^(−24/20)/e^(−□/20) | e^(−20/20) ≈ 0,368
  pièges : p_exp_rate_mean, p_memoryless_ignored

La durée de vie X d'une télévision suit une loi exponentielle de moyenne 5 ans. Elle fonctionne déjà depuis 5 ans. Quelle est la probabilité qu'elle dure encore au moins 10 ans (au millième) ?
  [guided]  λ
    ? Le paramètre λ de l'exponentielle ? ✔ λ = 1/5 : c'est un taux, l'inverse de la moyenne / · λ = 5, la moyenne
    = 1/□   (trous : 1/5)
  — Pr(X>15)  [juge stat]  départ : Pr(X > 15)
    = e^(−□/5)   (trous : e^(−15/5))
    = 0,05
  — Pr(X>5)  [juge stat]  départ : Pr(X > 5)
    = e^(−□/5)   (trous : e^(−5/5))
    = 0,368
  — Pr(X>15|X>5)  [juge stat]  départ : Pr(X>15|X>5)
    (Absence de mémoire : le résultat est Pr(X > t).)
    = e^(−15/5)/□   (trous : e^(−15/5)/e^(−5/5))
    = e^(−10/5)
    = 0,135
  aides : Pr(X > s + t | X > s) = Pr(X > s + t)/Pr(X > s) ; pour l'exponentielle, Pr(X > x) = e^(−λx). | e^(−15/5)/e^(−□/5) | e^(−10/5) ≈ 0,135
  pièges : p_exp_rate_mean, p_memoryless_ignored

La durée de vie X d'une télévision suit une loi exponentielle de moyenne 5 ans. Elle fonctionne déjà depuis 2,5 ans. Quelle est la probabilité qu'elle dure encore au moins 5 ans (au millième) ?
  [guided]  λ
    ? Le paramètre λ de l'exponentielle ? ✔ λ = 1/5 : c'est un taux, l'inverse de la moyenne / · λ = 5, la moyenne
    = 1/□   (trous : 1/5)
  — Pr(X>7,5)  [juge stat]  départ : Pr(X > 7,5)
    = e^(−□/5)   (trous : e^(−7,5/5))
    = 0,223
  — Pr(X>2,5)  [juge stat]  départ : Pr(X > 2,5)
    = e^(−□/5)   (trous : e^(−2,5/5))
    = 0,607
  — Pr(X>7,5|X>2,5)  [juge stat]  départ : Pr(X>7,5|X>2,5)
    (Absence de mémoire : le résultat est Pr(X > t).)
    = e^(−7,5/5)/□   (trous : e^(−7,5/5)/e^(−2,5/5))
    = e^(−5/5)
    = 0,368
  aides : Pr(X > s + t | X > s) = Pr(X > s + t)/Pr(X > s) ; pour l'exponentielle, Pr(X > x) = e^(−λx). | e^(−7,5/5)/e^(−□/5) | e^(−5/5) ≈ 0,368
  pièges : p_exp_rate_mean, p_memoryless_ignored

```

### Niveau 3

```
Le temps d'attente X chez le coiffeur (en minutes) suit une loi uniforme U(5 ; 35). Calcule la densité, puis Pr(X > 25).
  [tap, suivre l'erreur, menu menu]  f(x)
    = 1/(35 − 5)
    = 1/30
  — Pr(X>25)  [juge prob]  départ : Pr(X > 25)
    = (35 − 25)/30
    = 1/3
  aides : U(a, b) : f = 1/(b − a) sur [a ; b] ; une probabilité est une longueur fois f. | Pr(X > 25) = (35 − □)/30 | Pr(X > 25) = 1/3

La durée de vie X d'une télévision suit une loi exponentielle de moyenne 2 ans. Calcule Pr(X > 1) (au millième).
  [tap, suivre l'erreur, menu menu]  λ
    = 1/2
  — Pr(X>1)  [juge stat]  départ : Pr(X > 1)
    = e^(−1/2)
    = 0,607
  aides : Pr(X > x) = e^(−λx), et λ = 1/moyenne. | e^(−1/□) | 0,607
  pièges : p_exp_rate_mean, p_upper_tail

La durée de vie X d'un composant suit une loi exponentielle de moyenne 10 ans. Calcule sa médiane (au millième).
  [tap, suivre l'erreur, menu menu]  λ
    = 1/10
  — méd  [juge stat]  départ : méd
    = ln(2)·10
    = 6,931
  aides : La médiane vérifie F(q) = 1/2, donc e^(−λq) = 1/2. | q = ln(2)/λ = ln(2)·□ | q = 6,931
  pièges : p_exp_rate_mean, p_median_mean

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

Les appels arrivent selon un processus de Poisson, en moyenne un appel toutes les 20 minutes. Le temps T avant le premier appel suit une loi exponentielle. Calcule Pr(T > 10) (au millième).
  [free, suivre l'erreur]  λ
    = 1/20
  — Pr(T>10)  [juge stat]  départ : Pr(T > 10)
    = e^(−10/20)
    = 0,607
  aides : Pr(X > x) = e^(−λx), et λ = 1/moyenne. | e^(−10/□) | 0,607
  pièges : p_exp_rate_mean, p_upper_tail

La durée de vie X d'une télévision suit une loi exponentielle de moyenne 5 ans. Calcule Pr(X > 10) (au millième).
  [free, suivre l'erreur]  λ
    = 1/5
  — Pr(X>10)  [juge stat]  départ : Pr(X > 10)
    = e^(−10/5)
    = 0,135
  aides : Pr(X > x) = e^(−λx), et λ = 1/moyenne. | e^(−10/□) | 0,135
  pièges : p_exp_rate_mean, p_upper_tail

```

### Niveau 5

```
La durée de vie X d'une télévision suit une loi exponentielle de moyenne 5 ans. Elle fonctionne déjà depuis 1 an. Quelle est la probabilité qu'elle dure encore au moins 5 ans (au millième) ?
  [free, sans aide]  λ
    = 1/5
  — Pr(X>6)  [juge stat]  départ : Pr(X > 6)
    = e^(−6/5)
    = 0,301
  — Pr(X>1)  [juge stat]  départ : Pr(X > 1)
    = e^(−1/5)
    = 0,819
  — Pr(X>6|X>1)  [juge stat]  départ : Pr(X>6|X>1)
    (Absence de mémoire : le résultat est Pr(X > t).)
    = e^(−6/5)/e^(−1/5)
    = e^(−5/5)
    = 0,368
  pièges : p_exp_rate_mean, p_memoryless_ignored

La durée de vie X d'une télévision suit une loi exponentielle de moyenne 5 ans. Elle fonctionne déjà depuis 1 an. Quelle est la probabilité qu'elle dure encore au moins 5 ans (au millième) ?
  [free, sans aide]  λ
    = 1/5
  — Pr(X>6)  [juge stat]  départ : Pr(X > 6)
    = e^(−6/5)
    = 0,301
  — Pr(X>1)  [juge stat]  départ : Pr(X > 1)
    = e^(−1/5)
    = 0,819
  — Pr(X>6|X>1)  [juge stat]  départ : Pr(X>6|X>1)
    (Absence de mémoire : le résultat est Pr(X > t).)
    = e^(−6/5)/e^(−1/5)
    = e^(−5/5)
    = 0,368
  pièges : p_exp_rate_mean, p_memoryless_ignored

La durée de vie X d'une télévision suit une loi exponentielle de moyenne 20 ans. Elle fonctionne déjà depuis 4 ans. Quelle est la probabilité qu'elle dure encore au moins 40 ans (au millième) ?
  [free, sans aide]  λ
    = 1/20
  — Pr(X>44)  [juge stat]  départ : Pr(X > 44)
    = e^(−44/20)
    = 0,111
  — Pr(X>4)  [juge stat]  départ : Pr(X > 4)
    = e^(−4/20)
    = 0,819
  — Pr(X>44|X>4)  [juge stat]  départ : Pr(X>44|X>4)
    (Absence de mémoire : le résultat est Pr(X > t).)
    = e^(−44/20)/e^(−4/20)
    = e^(−40/20)
    = 0,135
  pièges : p_exp_rate_mean, p_memoryless_ignored

```

### Variantes d'examen

```
X ~ exp de moyenne 20. Que vaut Pr(X > 24 | X > 4) ?
  ✔ e^−1 ≈ 0,368   · 1 − e^−1 ≈ 0,632   · e^(−1,2) ≈ 0,301 [p_memoryless_ignored]   · e^−400 ≈ 0 [p_exp_rate_mean]
  [examen mcq]
  pièges : p_memoryless_ignored, p_exp_rate_mean

Vrai ou faux ?
  « La durée de vie d'une télévision suit une loi exponentielle de moyenne 2 ans. Une télévision qui a déjà 0.4 an a moins de chances de durer encore 2 ans qu'une neuve. » → FAUX
    contre-exemple (refute) : u = e^(-1), n = e^(-1)
  [examen tf]
  pièges : p_memoryless_ignored

X suit une loi exponentielle de moyenne 20. Calcule Pr(X > 20) au millième.
  [free, sans aide, examen coef]  Pr(X > 20)
    = 0,368
  pièges : p_exp_rate_mean

```

## Espérance et variance d'une loi (`p-moments`, BA3)

_E[X] = Σ x·f(x) ou ∫ x·f(x) dx ; E[g(X)] = ∫ g(x)·f(x) dx, qui n'est pas g(E[X]) ; var(X) = E[X²] − E[X]² ≥ 0._

### Niveau 1

```
X prend les valeurs −1, 0, 2, 3 avec les probabilités 0,3, 0,2, 0,2, 0,3. Calcule E[X], E[X²] et var(X).
  [guided]  E[X]
    = (−1)·0,3 + 0·0,2 + 2·0,2 + □   (trous : (−1)·0,3 + 0·0,2 + 2·0,2 + 3·0,3)
    = 1
  — E[X²]  [juge prob]  départ : E[X²]
    = (−1)²·0,3 + 0²·0,2 + 2²·0,2 + □   (trous : (−1)²·0,3 + 0²·0,2 + 2²·0,2 + 3²·0,3)
    = 3,8
  — var(X)  [juge prob]  départ : var(X)
    = 3,8 − (□)²   (trous : 3,8 − (1)²)
    = 2,8
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 3,8 − (□)² | var(X) = 2,8
  pièges : p_var_minus_mean, p_g_of_mean

X a pour densité f(y) = 4y³ sur ]0 ; 1[ (et 0 ailleurs). Calcule E[X], E[X²] et var(X).
  [guided]  E[X]
    = 4/□   (trous : 4/5)   ← ∫₀¹ 4y^4 dy
  — E[X²]  [juge prob]  départ : E[X²]
    = 4/□   (trous : 4/6)   ← ∫₀¹ 4y^5 dy
    = 2/3
  — var(X)  [juge prob]  départ : var(X)
    = 2/3 − (□)²   (trous : 2/3 − (0,8)²)
    = 2/75
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 2/3 − (□)² | var(X) = 2/75
  pièges : p_var_minus_mean, p_mean_not_exist, p_g_of_mean

X prend les valeurs −1, 3, 4 avec les probabilités 0,2, 0,2, 0,6. Calcule E[X], E[X²] et var(X).
  [guided]  E[X]
    = (−1)·0,2 + 3·0,2 + □   (trous : (−1)·0,2 + 3·0,2 + 4·0,6)
    = 2,8
  — E[X²]  [juge prob]  départ : E[X²]
    = (−1)²·0,2 + 3²·0,2 + □   (trous : (−1)²·0,2 + 3²·0,2 + 4²·0,6)
    = 11,6
  — var(X)  [juge prob]  départ : var(X)
    = 11,6 − (□)²   (trous : 11,6 − (2,8)²)
    = 3,76
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 11,6 − (□)² | var(X) = 3,76
  pièges : p_var_minus_mean, p_g_of_mean

```

### Niveau 2

```
X a pour densité f(y) = 6y⁵ sur ]0 ; 1[ (et 0 ailleurs). Calcule E[X], E[X²] et var(X).
  [guided]  E[X]
    ? E[X] existe-t-elle ? ✔ Oui : X est bornée, l’intégrale converge / · Pas besoin de vérifier : toute densité a une espérance
    = 6/□   (trous : 6/7)   ← ∫₀¹ 6y^6 dy
  — E[X²]  [juge prob]  départ : E[X²]
    = 6/□   (trous : 6/8)   ← ∫₀¹ 6y^7 dy
    = 3/4
  — var(X)  [juge prob]  départ : var(X)
    ? La variance ? ✔ var(X) = E[X²] − E[X]² / · var(X) = E[X²] − E[X]
    = 0,75 − (□)²   (trous : 0,75 − (6/7)²)
    = 3/196
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 0,75 − (□)² | var(X) = 3/196
  pièges : p_var_minus_mean, p_mean_not_exist, p_g_of_mean

X a pour densité f(y) = 6y⁵ sur ]0 ; 1[ (et 0 ailleurs). Calcule E[X], E[X²] et var(X).
  [guided]  E[X]
    ? E[X] existe-t-elle ? ✔ Oui : X est bornée, l’intégrale converge / · Pas besoin de vérifier : toute densité a une espérance
    = 6/□   (trous : 6/7)   ← ∫₀¹ 6y^6 dy
  — E[X²]  [juge prob]  départ : E[X²]
    = 6/□   (trous : 6/8)   ← ∫₀¹ 6y^7 dy
    = 3/4
  — var(X)  [juge prob]  départ : var(X)
    ? La variance ? ✔ var(X) = E[X²] − E[X]² / · var(X) = E[X²] − E[X]
    = 0,75 − (□)²   (trous : 0,75 − (6/7)²)
    = 3/196
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 0,75 − (□)² | var(X) = 3/196
  pièges : p_var_minus_mean, p_mean_not_exist, p_g_of_mean

X prend les valeurs −1, 1, 2, 3 avec les probabilités 0,6, 0,1, 0,2, 0,1. Calcule E[X], E[X²] et var(X).
  [guided]  E[X]
    = (−1)·0,6 + 1·0,1 + 2·0,2 + □   (trous : (−1)·0,6 + 1·0,1 + 2·0,2 + 3·0,1)
    = 0,2
  — E[X²]  [juge prob]  départ : E[X²]
    = (−1)²·0,6 + 1²·0,1 + 2²·0,2 + □   (trous : (−1)²·0,6 + 1²·0,1 + 2²·0,2 + 3²·0,1)
    = 2,4
  — var(X)  [juge prob]  départ : var(X)
    ? La variance ? ✔ var(X) = E[X²] − E[X]² / · var(X) = E[X²] − E[X]
    = 2,4 − (□)²   (trous : 2,4 − (0,2)²)
    = 2,36
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 2,4 − (□)² | var(X) = 2,36
  pièges : p_var_minus_mean, p_g_of_mean

```

### Niveau 3

```
X a pour densité f(y) = 2y¹ sur ]0 ; 1[ (et 0 ailleurs). Calcule E[X], E[X²] et var(X).
  [tap, suivre l'erreur, menu menu]  E[X]
    ? E[X] existe-t-elle ? ✔ Oui : X est bornée, l’intégrale converge / · Pas besoin de vérifier : toute densité a une espérance
    = 2/3   ← ∫₀¹ 2y^2 dy
  — E[X²]  [juge prob]  départ : E[X²]
    = 2/4   ← ∫₀¹ 2y^3 dy
    = 1/2
  — var(X)  [juge prob]  départ : var(X)
    = 0,5 − (2/3)²
    = 1/18
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 0,5 − (□)² | var(X) = 1/18
  pièges : p_var_minus_mean, p_mean_not_exist, p_g_of_mean

X prend les valeurs −1, 0, 4 avec les probabilités 0,3, 0,6, 0,1. Calcule E[X], E[X²] et var(X).
  [tap, suivre l'erreur, menu menu]  E[X]
    = (−1)·0,3 + 0·0,6 + 4·0,1
    = 0,1
  — E[X²]  [juge prob]  départ : E[X²]
    = (−1)²·0,3 + 0²·0,6 + 4²·0,1
    = 1,9
  — var(X)  [juge prob]  départ : var(X)
    = 1,9 − (0,1)²
    = 1,89
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 1,9 − (□)² | var(X) = 1,89
  pièges : p_var_minus_mean, p_g_of_mean

X a pour densité f(y) = 4y³ sur ]0 ; 1[ (et 0 ailleurs). Calcule E[X], E[X²] et var(X).
  [tap, suivre l'erreur, menu menu]  E[X]
    ? E[X] existe-t-elle ? ✔ Oui : X est bornée, l’intégrale converge / · Pas besoin de vérifier : toute densité a une espérance
    = 4/5   ← ∫₀¹ 4y^4 dy
  — E[X²]  [juge prob]  départ : E[X²]
    = 4/6   ← ∫₀¹ 4y^5 dy
    = 2/3
  — var(X)  [juge prob]  départ : var(X)
    = 2/3 − (0,8)²
    = 2/75
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 2/3 − (□)² | var(X) = 2/75
  pièges : p_var_minus_mean, p_mean_not_exist, p_g_of_mean

```

### Niveau 4

```
X a pour densité f(y) = 2y¹ sur ]0 ; 1[ (et 0 ailleurs). Calcule E[X], E[X²] et var(X).
  [free, suivre l'erreur]  E[X]
    ? E[X] existe-t-elle ? ✔ Oui : X est bornée, l’intégrale converge / · Pas besoin de vérifier : toute densité a une espérance
    = 2/3   ← ∫₀¹ 2y^2 dy
  — E[X²]  [juge prob]  départ : E[X²]
    = 2/4   ← ∫₀¹ 2y^3 dy
    = 1/2
  — var(X)  [juge prob]  départ : var(X)
    = 0,5 − (2/3)²
    = 1/18
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 0,5 − (□)² | var(X) = 1/18
  pièges : p_var_minus_mean, p_mean_not_exist, p_g_of_mean

X a pour densité f(x) = 5x^−6 pour x ≥ 1 (et 0 ailleurs). Calcule E[X], E[X²] et var(X).
  [free, suivre l'erreur]  E[X]
    ? E[X] existe-t-elle ? ✔ Oui : ∫₁^∞ x·5x^(−6) dx converge (5 > 1) / · Pas besoin de vérifier : toute densité a une espérance
    = 5/4   ← ∫₁^∞ 5x^(−5) dx
  — E[X²]  [juge prob]  départ : E[X²]
    = 5/3   ← ∫₁^∞ 5x^(−4) dx
  — var(X)  [juge prob]  départ : var(X)
    = 5/3 − (1,25)²
    = 5/48
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 5/3 − (□)² | var(X) = 5/48
  pièges : p_var_minus_mean, p_mean_not_exist, p_g_of_mean

X prend les valeurs −1, 1, 2, 4 avec les probabilités 0,7, 0,1, 0,1, 0,1. Calcule E[X], E[X²] et var(X).
  [free, suivre l'erreur]  E[X]
    = (−1)·0,7 + 1·0,1 + 2·0,1 + 4·0,1
    = 0
  — E[X²]  [juge prob]  départ : E[X²]
    = (−1)²·0,7 + 1²·0,1 + 2²·0,1 + 4²·0,1
    = 2,8
  — var(X)  [juge prob]  départ : var(X)
    = 2,8 − (0)²
    = 2,8
  aides : var = E[X²] − E[X]² ; E[X²] = ∫ x²·f(x) dx (ou Σ x²·f(x)). | var(X) = 2,8 − (□)² | var(X) = 2,8
  pièges : p_var_minus_mean, p_g_of_mean

```

### Niveau 5

```
X prend les valeurs −1, 1, 3, 4 avec les probabilités 0,6, 0,1, 0,2, 0,1. Calcule E[X], E[X²] et var(X).
  [free, sans aide]  E[X]
    = (−1)·0,6 + 1·0,1 + 3·0,2 + 4·0,1
    = 0,5
  — E[X²]  [juge prob]  départ : E[X²]
    = (−1)²·0,6 + 1²·0,1 + 3²·0,2 + 4²·0,1
    = 4,1
  — var(X)  [juge prob]  départ : var(X)
    = 4,1 − (0,5)²
    = 3,85
  pièges : p_var_minus_mean, p_g_of_mean

X ~ exp(λ) avec λ = 4. Calcule E[e^X], E[e^(2X)] et var(e^X).
  [free, sans aide]  E[e^X]
    = 4/(4 − 1)   ← ∫₀^∞ eˣ·4e^(−4x) dx
    = 4/3
  — E[e^(2X)]  [juge prob]  départ : E[e^(2X)]
    = 4/(4 − 2)
    = 2
  — var(e^X)  [juge prob]  départ : var(e^X)
    = 2 − (4/3)²
    = 2/9
  pièges : p_g_of_mean, p_var_minus_mean

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

```

### Variantes d'examen

```
X a pour densité f(x) = 1/(π(1 + x²)) sur ℝ (loi de Cauchy). Que vaut E[X] ?
  · 0, par symétrie [p_mean_not_exist]   · 1/π   ✔ Elle n'existe pas   · 1
  [examen mcq]
  pièges : p_mean_not_exist

Vrai ou faux ?
  « Pour toute variable X > 0, E[1/X] = 1/E[X]. » → FAUX
    contre-exemple (refute) : a = 1, b = 2
  [examen tf]
  pièges : p_g_of_mean

X prend les valeurs 1, 2, 4 avec les probabilités 0,1, 0,6, 0,3. Que vaut var(X) ?
  [free, sans aide, examen coef]  var(X)
    = 21/20
  pièges : p_var_minus_mean

```

## Reconnaître Gamma, Beta, Weibull, Pareto, χ² (`p-family`, BA3)

_On lit le noyau (la partie qui dépend de x) pour reconnaître la loi et éviter un calcul._

### Niveau 1

```
X a pour densité f(x) = C·x³(1 − x)² sur [0 ; 1]. Reconnais la loi Beta(α, β), puis donne C et E[X].
  [guided]  α
    (Quelle loi reconnais-tu au noyau ? Beta.)
    = □ + 1   (trous : 3 + 1)
    = 4
  — β  [juge prob]  départ : β
    = □ + 1   (trous : 2 + 1)
    = 3
  — C  [juge prob]  départ : C
    = □/((3)!·(2)!)   (trous : (6)!/((3)!·(2)!))
    = 60
  — E[X]  [juge prob]  départ : E[X]
    = 4/(4 + 3)
    = 4/7
  aides : Le noyau d'une Beta(α, β) est x^(α−1)(1 − x)^(β−1) : ajoute 1 à chaque exposant. | Beta(□, 3) | Beta(4, 3), C = 60, E[X] = 4/7
  pièges : p_beta_shape_off

X a pour densité f(x) = C·x³ sur [0 ; 1]. Reconnais la loi Beta(α, β), puis donne C et E[X].
  [guided]  α
    (Quelle loi reconnais-tu au noyau ? Beta.)
    = □ + 1   (trous : 3 + 1)
    = 4
  — β  [juge prob]  départ : β
    = □ + 1   (trous : 0 + 1)
    = 1
  — C  [juge prob]  départ : C
    = □/((3)!·(0)!)   (trous : (4)!/((3)!·(0)!))
    = 4
  — E[X]  [juge prob]  départ : E[X]
    = 4/(4 + 1)
    = 4/5
  aides : Le noyau d'une Beta(α, β) est x^(α−1)(1 − x)^(β−1) : ajoute 1 à chaque exposant. | Beta(□, 1) | Beta(4, 1), C = 4, E[X] = 0,8
  pièges : p_beta_shape_off

X a pour densité f(x) = C·x sur [0 ; 1]. Reconnais la loi Beta(α, β), puis donne C et E[X].
  [guided]  α
    (Quelle loi reconnais-tu au noyau ? Beta.)
    = □ + 1   (trous : 1 + 1)
    = 2
  — β  [juge prob]  départ : β
    = □ + 1   (trous : 0 + 1)
    = 1
  — C  [juge prob]  départ : C
    = □/((1)!·(0)!)   (trous : (2)!/((1)!·(0)!))
    = 2
  — E[X]  [juge prob]  départ : E[X]
    = 2/(2 + 1)
    = 2/3
  aides : Le noyau d'une Beta(α, β) est x^(α−1)(1 − x)^(β−1) : ajoute 1 à chaque exposant. | Beta(□, 1) | Beta(2, 1), C = 2, E[X] = 2/3
  pièges : p_beta_shape_off

```

### Niveau 2

```
Y a pour densité f(y) = (y³·e^(−y/θ))/(6θ⁴) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
  [guided]  k
    ? Quelle loi reconnais-tu au noyau ? ✔ Gamma / · Beta / · Exponentielle / · Pareto
    = □ + 1   (trous : 3 + 1)
    = 4
  — E[Y]  [juge prob]  départ : E[Y]
    = □θ   (trous : 4θ)
  — var(Y)  [juge prob]  départ : var(Y)
    = □θ²   (trous : 4θ²)
  aides : Repère la puissance de y et ce qui divise y dans l'exponentielle : y^(k−1)·e^(−y/θ). | Y ~ Γ(□, θ) | Y ~ Γ(4, θ) : E = 4θ, var = 4θ²
  pièges : p_gamma_shape_off, p_gamma_scale_rate

Y a pour densité f(y) = (y³·e^(−y/θ))/(6θ⁴) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
  [guided]  k
    ? Quelle loi reconnais-tu au noyau ? ✔ Gamma / · Beta / · Exponentielle / · Pareto
    = □ + 1   (trous : 3 + 1)
    = 4
  — E[Y]  [juge prob]  départ : E[Y]
    = □θ   (trous : 4θ)
  — var(Y)  [juge prob]  départ : var(Y)
    = □θ²   (trous : 4θ²)
  aides : Repère la puissance de y et ce qui divise y dans l'exponentielle : y^(k−1)·e^(−y/θ). | Y ~ Γ(□, θ) | Y ~ Γ(4, θ) : E = 4θ, var = 4θ²
  pièges : p_gamma_shape_off, p_gamma_scale_rate

Y a pour densité f(y) = (y³·e^(−y/θ))/(6θ⁴) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
  [guided]  k
    ? Quelle loi reconnais-tu au noyau ? ✔ Gamma / · Beta / · Exponentielle / · Pareto
    = □ + 1   (trous : 3 + 1)
    = 4
  — E[Y]  [juge prob]  départ : E[Y]
    = □θ   (trous : 4θ)
  — var(Y)  [juge prob]  départ : var(Y)
    = □θ²   (trous : 4θ²)
  aides : Repère la puissance de y et ce qui divise y dans l'exponentielle : y^(k−1)·e^(−y/θ). | Y ~ Γ(□, θ) | Y ~ Γ(4, θ) : E = 4θ, var = 4θ²
  pièges : p_gamma_shape_off, p_gamma_scale_rate

```

### Niveau 3

```
Y a pour densité f(y) = (y·e^(−y/3))/(9) pour y ≥ 0. Reconnais la loi, puis donne E[Y] et var(Y).
  [tap, suivre l'erreur, menu menu]  k
    ? Quelle loi reconnais-tu au noyau ? ✔ Gamma / · Beta / · Exponentielle / · Pareto
    = 1 + 1
    = 2
  — E[Y]  [juge prob]  départ : E[Y]
    = 2·3
    = 6
  — var(Y)  [juge prob]  départ : var(Y)
    = 2·3²
    = 18
  aides : Repère la puissance de y et ce qui divise y dans l'exponentielle : y^(k−1)·e^(−y/θ). | Y ~ Γ(□, 3) | Y ~ Γ(2, 3) : E = 6, var = 18
  pièges : p_gamma_shape_off, p_gamma_scale_rate

X ~ χ²(4). Écris-la comme une loi Gamma (forme k, échelle θ), puis donne E[X] et var(X).
  [tap, suivre l'erreur, menu menu]  k
    = 4/2
    = 2
  — θ  [juge prob]  départ : θ
    = 2
  — E[X]  [juge prob]  départ : E[X]
    = 2·2
    = 4
  — var(X)  [juge prob]  départ : var(X)
    = 2·2²
    = 8
  aides : χ²(r) = Γ(r/2, 2) : E = kθ, var = kθ². | Γ(□, 2) | Γ(2, 2) : E = 4, var = 8
  pièges : p_gamma_scale_rate

X₁, …, X₃ sont indépendantes, de loi exp(λ) avec λ = 2. Quelle est la loi de leur somme S ? Donne la forme k, l'échelle θ et E[S].
  [tap, suivre l'erreur, menu menu]  k
    ? Quelle loi reconnais-tu au noyau ? ✔ Gamma / · Beta / · Exponentielle / · Pareto
    = 3
  — θ  [juge prob]  départ : θ
    = 1/2
  — E[S]  [juge prob]  départ : E[S]
    = 3·1/2
    = 3/2
  aides : Une somme de n exponentielles exp(λ) indépendantes suit Γ(n, 1/λ). | S ~ Γ(3, □) | S ~ Γ(3, 1/2), E[S] = 1,5
  pièges : p_gamma_scale_rate

```

### Niveau 4

```
X ~ χ²(4). Écris-la comme une loi Gamma (forme k, échelle θ), puis donne E[X] et var(X).
  [free, suivre l'erreur]  k
    = 4/2
    = 2
  — θ  [juge prob]  départ : θ
    = 2
  — E[X]  [juge prob]  départ : E[X]
    = 2·2
    = 4
  — var(X)  [juge prob]  départ : var(X)
    = 2·2²
    = 8
  aides : χ²(r) = Γ(r/2, 2) : E = kθ, var = kθ². | Γ(□, 2) | Γ(2, 2) : E = 4, var = 8
  pièges : p_gamma_scale_rate

X a pour densité f(x) = C·x³(1 − x)³ sur [0 ; 1]. Reconnais la loi Beta(α, β), puis donne C et E[X].
  [free, suivre l'erreur]  α
    = 3 + 1
    = 4
  — β  [juge prob]  départ : β
    = 3 + 1
    = 4
  — C  [juge prob]  départ : C
    = (7)!/((3)!·(3)!)
    = 140
  — E[X]  [juge prob]  départ : E[X]
    = 4/(4 + 4)
    = 1/2
  aides : Le noyau d'une Beta(α, β) est x^(α−1)(1 − x)^(β−1) : ajoute 1 à chaque exposant. | Beta(□, 4) | Beta(4, 4), C = 140, E[X] = 0,5
  pièges : p_beta_shape_off

Y a pour densité f(y) = (y³·e^(−y/3))/(486) pour y ≥ 0. Reconnais la loi, puis donne E[Y] et var(Y).
  [free, suivre l'erreur]  k
    = 3 + 1
    = 4
  — E[Y]  [juge prob]  départ : E[Y]
    = 4·3
    = 12
  — var(Y)  [juge prob]  départ : var(Y)
    = 4·3²
    = 36
  aides : Repère la puissance de y et ce qui divise y dans l'exponentielle : y^(k−1)·e^(−y/θ). | Y ~ Γ(□, 3) | Y ~ Γ(4, 3) : E = 12, var = 36
  pièges : p_gamma_shape_off, p_gamma_scale_rate

```

### Niveau 5

```
Y a pour densité f(y) = (y²·e^(−y/θ))/(2θ³) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
  [free, sans aide]  k
    = 2 + 1
    = 3
  — Γ(k)θ^k  [juge prob]  départ : Γ(k)θ^k
    = (2)!·θ³
  — E[Y]  [juge prob]  départ : E[Y]
    = 3θ
  — var(Y)  [juge prob]  départ : var(Y)
    = 3θ²
  pièges : p_gamma_shape_off, p_gamma_scale_rate

Y a pour densité f(y) = (y²·e^(−y/θ))/(2θ³) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
  [free, sans aide]  k
    = 2 + 1
    = 3
  — Γ(k)θ^k  [juge prob]  départ : Γ(k)θ^k
    = (2)!·θ³
  — E[Y]  [juge prob]  départ : E[Y]
    = 3θ
  — var(Y)  [juge prob]  départ : var(Y)
    = 3θ²
  pièges : p_gamma_shape_off, p_gamma_scale_rate

Y a pour densité f(y) = (y³·e^(−y/θ))/(6θ⁴) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
  [free, sans aide]  k
    = 3 + 1
    = 4
  — Γ(k)θ^k  [juge prob]  départ : Γ(k)θ^k
    = (3)!·θ⁴
  — E[Y]  [juge prob]  départ : E[Y]
    = 4θ
  — var(Y)  [juge prob]  départ : var(Y)
    = 4θ²
  pièges : p_gamma_shape_off, p_gamma_scale_rate

```

### Variantes d'examen

```
Y a pour densité f(y) ∝ y^4·e^(−y/θ) pour y ≥ 0 (θ > 0). Que vaut E[Y] ?
  ✔ 5θ   · 5θ²   · 5/θ [p_gamma_scale_rate]   · 4θ [p_gamma_shape_off]
  [examen mcq]
  pièges : p_gamma_scale_rate, p_gamma_shape_off

Vrai ou faux ?
  « Si X₁ et X₂ sont indépendantes de loi exp(1), alors X₁ + X₂ suit la loi exp(2). » → FAUX
    contre-exemple (refute) : a = 2, b = 1/2
  [examen tf]
  pièges : p_gamma_shape_off

Y a pour densité f(y) = (y²·e^(−y/2))/(16) pour y ≥ 0. Que vaut E[Y] ?
  [free, sans aide, examen coef]  E[Y]
    = 3·2
    = 6
  pièges : p_gamma_scale_rate

Y a pour densité f(y) = (y²·e^(−y/θ))/(2θ³) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
  [problème, examen open, 10 points]
  partie 1 (Début du problème : 4 ; Γ(k)θ^k : 2 ; E[Y] : 2 ; var(Y) : 2)
  Y a pour densité f(y) = (y²·e^(−y/θ))/(2θ³) pour y ≥ 0 (θ > 0). Reconnais la loi, puis donne E[Y] et var(Y).
    [free, sans aide, suivre l'erreur, examen open]  k
      = 2 + 1
      = 3
    — Γ(k)θ^k  [juge prob]  départ : Γ(k)θ^k
      = (2)!·θ³
    — E[Y]  [juge prob]  départ : E[Y]
      = 3θ
    — var(Y)  [juge prob]  départ : var(Y)
      = 3θ²
  pièges : p_gamma_shape_off, p_gamma_scale_rate

```

## Loi normale : standardiser, table de Φ (`p-normal-std`, BA3)

_X ~ N(μ, σ²) ⇒ Z = (X − μ)/σ ~ N(0, 1), donc Pr(X ≤ x) = Φ((x − μ)/σ)._

### Niveau 1

```
X ~ N(100 ; 10²). Calcule Pr(X < 80,5) avec la table de Φ.
  [guided]  z
    = (□ − 100)/10   (trous : (80,5 − 100)/10)
    = □   (trous : −1,95)
  — Φ(1,95)  [juge stat]  départ : Φ(1,95)
    = □   (trous : 0,974)
  — Pr(X<80,5)  [juge stat]  départ : Pr(X < 80,5)
    (Φ(−1,95) avec une valeur négative ? Φ(−1,95) = 1 − Φ(1,95).)
    = 1 − □   (trous : 1 − 0,974)
    = 0,026
  aides : z est négatif : Φ(−a) = 1 − Φ(a). | Pr = 1 − Φ(□) | Pr = 1 − 0,974 = 0,026
  pièges : p_standardize_var, p_phi_negative

X ~ N(170 ; 2²). Calcule Pr(X > 173,9) avec la table de Φ.
  [guided]  z
    = (□ − 170)/2   (trous : (173,9 − 170)/2)
    = □   (trous : 1,95)
  — Φ(1,95)  [juge stat]  départ : Φ(1,95)
    = □   (trous : 0,974)
  — Pr(X>173,9)  [juge stat]  départ : Pr(X > 173,9)
    = 1 − □   (trous : 1 − 0,974)
    = 0,026
  aides : Ramène-toi à Z = (X − μ)/σ, puis Pr(Z > z) = 1 − Φ(z). | z = (173,9 − 170)/□ | Pr = 1 − 0,974 = 0,026
  pièges : p_standardize_var, p_upper_tail

X ~ N(500 ; 2²). Calcule Pr(X > 502,8) avec la table de Φ.
  [guided]  z
    = (□ − 500)/2   (trous : (502,8 − 500)/2)
    = □   (trous : 1,4)
  — Φ(1,4)  [juge stat]  départ : Φ(1,4)
    = □   (trous : 0,919)
  — Pr(X>502,8)  [juge stat]  départ : Pr(X > 502,8)
    = 1 − □   (trous : 1 − 0,919)
    = 0,081
  aides : Ramène-toi à Z = (X − μ)/σ, puis Pr(Z > z) = 1 − Φ(z). | z = (502,8 − 500)/□ | Pr = 1 − 0,919 = 0,081
  pièges : p_standardize_var, p_upper_tail

```

### Niveau 2

```
X ~ N(10 ; 5²). Calcule Pr(X < 7) avec la table de Φ.
  [guided]  z
    = (□ − 10)/5   (trous : (7 − 10)/5)
    = □   (trous : −0,6)
  — Φ(0,6)  [juge stat]  départ : Φ(0,6)
    = □   (trous : 0,726)
  — Pr(X<7)  [juge stat]  départ : Pr(X < 7)
    ? Φ(−0,6) avec une valeur négative ? ✔ Φ(−0,6) = 1 − Φ(0,6) / · Φ(−0,6) = −Φ(0,6)
    = 1 − □   (trous : 1 − 0,726)
    = 0,274
  aides : z est négatif : Φ(−a) = 1 − Φ(a). | Pr = 1 − Φ(□) | Pr = 1 − 0,726 = 0,274
  pièges : p_standardize_var, p_phi_negative

X ~ N(10 ; 8²). Calcule Pr(X < −9,6) avec la table de Φ.
  [guided]  z
    = (□ − 10)/8   (trous : (−9,6 − 10)/8)
    = □   (trous : −2,45)
  — Φ(2,45)  [juge stat]  départ : Φ(2,45)
    = □   (trous : 0,993)
  — Pr(X<−9,6)  [juge stat]  départ : Pr(X < −9,6)
    ? Φ(−2,45) avec une valeur négative ? ✔ Φ(−2,45) = 1 − Φ(2,45) / · Φ(−2,45) = −Φ(2,45)
    = 1 − □   (trous : 1 − 0,993)
    = 0,007
  aides : z est négatif : Φ(−a) = 1 − Φ(a). | Pr = 1 − Φ(□) | Pr = 1 − 0,993 = 0,007
  pièges : p_standardize_var, p_phi_negative

X ~ N(120 ; 2²). Calcule Pr(X > 124,4) avec la table de Φ.
  [guided]  z
    = (□ − 120)/2   (trous : (124,4 − 120)/2)
    = □   (trous : 2,2)
  — Φ(2,2)  [juge stat]  départ : Φ(2,2)
    = □   (trous : 0,986)
  — Pr(X>124,4)  [juge stat]  départ : Pr(X > 124,4)
    ? Queue gauche ou droite ? ✔ À droite : Pr(X > x) = 1 − Φ(z) / · Φ(z) directement
    = 1 − □   (trous : 1 − 0,986)
    = 0,014
  aides : Ramène-toi à Z = (X − μ)/σ, puis Pr(Z > z) = 1 − Φ(z). | z = (124,4 − 120)/□ | Pr = 1 − 0,986 = 0,014
  pièges : p_standardize_var, p_upper_tail

```

### Niveau 3

```
X ~ N(170 ; 25²). Calcule Pr(142,5 < X < 225) avec la table de Φ.
  [tap, suivre l'erreur, menu menu]  z1
    = (142,5 − 170)/25
    = −1,1
  — z2  [juge stat]  départ : z2
    = (225 − 170)/25
    = 2,2
  — Φ(2,2)  [juge stat]  départ : Φ(2,2)
    = 0,986
  — Φ(1,1)  [juge stat]  départ : Φ(1,1)
    = 0,864
  — Pr  [juge stat]  départ : Pr
    = 0,986 − (1 − 0,864)
    = 0,85
  aides : Pr(a < X < b) = Φ(z₂) − Φ(z₁), et Φ(−a) = 1 − Φ(a). | Pr = 0,986 − (1 − □) | Pr = 0,85
  pièges : p_standardize_var, p_phi_negative, p_upper_tail

X ~ N(10 ; 15²). Calcule Pr(X < −27,5) avec la table de Φ.
  [tap, suivre l'erreur, menu menu]  z
    = (−27,5 − 10)/15
    = −2,5
  — Φ(2,5)  [juge stat]  départ : Φ(2,5)
    = 0,994
  — Pr(X<−27,5)  [juge stat]  départ : Pr(X < −27,5)
    = 1 − 0,994
    = 0,006
  aides : z est négatif : Φ(−a) = 1 − Φ(a). | Pr = 1 − Φ(□) | Pr = 1 − 0,994 = 0,006
  pièges : p_standardize_var, p_phi_negative

X ~ N(120 ; 15²). Calcule Pr(103,5 < X < 130,5) avec la table de Φ.
  [tap, suivre l'erreur, menu menu]  z1
    = (103,5 − 120)/15
    = −1,1
  — z2  [juge stat]  départ : z2
    = (130,5 − 120)/15
    = 0,7
  — Φ(0,7)  [juge stat]  départ : Φ(0,7)
    = 0,758
  — Φ(1,1)  [juge stat]  départ : Φ(1,1)
    = 0,864
  — Pr  [juge stat]  départ : Pr
    = 0,758 − (1 − 0,864)
    = 0,622
  aides : Pr(a < X < b) = Φ(z₂) − Φ(z₁), et Φ(−a) = 1 − Φ(a). | Pr = 0,758 − (1 − □) | Pr = 0,622
  pièges : p_standardize_var, p_phi_negative, p_upper_tail

```

### Niveau 4

```
X ~ N(500 ; 15²). Calcule Pr(491 < X < 521) avec la table de Φ.
  [free, suivre l'erreur]  z1
    = (491 − 500)/15
    = −0,6
  — z2  [juge stat]  départ : z2
    = (521 − 500)/15
    = 1,4
  — Φ(1,4)  [juge stat]  départ : Φ(1,4)
    = 0,919
  — Φ(0,6)  [juge stat]  départ : Φ(0,6)
    = 0,726
  — Pr  [juge stat]  départ : Pr
    = 0,919 − (1 − 0,726)
    = 0,645
  aides : Pr(a < X < b) = Φ(z₂) − Φ(z₁), et Φ(−a) = 1 − Φ(a). | Pr = 0,919 − (1 − □) | Pr = 0,645
  pièges : p_standardize_var, p_phi_negative, p_upper_tail

X ~ N(500 ; 4²). Calcule Pr(X < 496,6) avec la table de Φ.
  [free, suivre l'erreur]  z
    = (496,6 − 500)/4
    = −0,85
  — Φ(0,85)  [juge stat]  départ : Φ(0,85)
    = 0,802
  — Pr(X<496,6)  [juge stat]  départ : Pr(X < 496,6)
    = 1 − 0,802
    = 0,198
  aides : z est négatif : Φ(−a) = 1 − Φ(a). | Pr = 1 − Φ(□) | Pr = 1 − 0,802 = 0,198
  pièges : p_standardize_var, p_phi_negative

X ~ N(50 ; 25²). Calcule Pr(12,5 < X < 77,5) avec la table de Φ.
  [free, suivre l'erreur]  z1
    = (12,5 − 50)/25
    = −1,5
  — z2  [juge stat]  départ : z2
    = (77,5 − 50)/25
    = 1,1
  — Φ(1,1)  [juge stat]  départ : Φ(1,1)
    = 0,864
  — Φ(1,5)  [juge stat]  départ : Φ(1,5)
    = 0,933
  — Pr  [juge stat]  départ : Pr
    = 0,864 − (1 − 0,933)
    = 0,797
  aides : Pr(a < X < b) = Φ(z₂) − Φ(z₁), et Φ(−a) = 1 − Φ(a). | Pr = 0,864 − (1 − □) | Pr = 0,797
  pièges : p_standardize_var, p_phi_negative, p_upper_tail

```

### Niveau 5

```
X ~ N(87 ; 6²) et Y ~ N(70 ; 8²) sont indépendantes. Calcule Pr(X > Y) avec la table de Φ.
  [free, sans aide]  E[X−Y]
    = 87 − 70
    = 17
  — σ(X−Y)  [juge prob]  départ : σ(X − Y)
    = √(6² + 8²)
    = 10
  — z  [juge stat]  départ : z
    = 1,7
  — Pr(X−Y>0)  [juge stat]  départ : Pr(X − Y > 0)
    = Φ(1,7)
    = 0,955
  pièges : p_standardize_var, p_upper_tail

X ~ N(88,5 ; 6²) et Y ~ N(70 ; 8²) sont indépendantes. Calcule Pr(X > Y) avec la table de Φ.
  [free, sans aide]  E[X−Y]
    = 88,5 − 70
    = 18,5
  — σ(X−Y)  [juge prob]  départ : σ(X − Y)
    = √(6² + 8²)
    = 10
  — z  [juge stat]  départ : z
    = 1,85
  — Pr(X−Y>0)  [juge stat]  départ : Pr(X − Y > 0)
    = Φ(1,85)
    = 0,968
  pièges : p_standardize_var, p_upper_tail

La taille X (cm) suit N(100 ; 15²). Calcule Pr(X > 124 | X > 107,5) avec la table de Φ.
  [free, sans aide]  z1
    = (107,5 − 100)/15
    = 0,5
  — z2  [juge stat]  départ : z2
    = (124 − 100)/15
    = 1,6
  — Φ(0,5)  [juge stat]  départ : Φ(0,5)
    = 0,691
  — Φ(1,6)  [juge stat]  départ : Φ(1,6)
    = 0,945
  — Pr  [juge stat]  départ : Pr
    = (1 − 0,945)/(1 − 0,691)
    = 0,178
  pièges : p_standardize_var, p_upper_tail, p_cond_denominator

```

### Variantes d'examen

```
X ~ N(50 ; 4). Que vaut Pr(X > 53) ?
  ✔ 0,067   · 0,433   · 0,933 [p_upper_tail]   · 0,227 [p_standardize_var]
  [examen mcq]
  pièges : p_upper_tail, p_standardize_var

Vrai ou faux ?
  « Si X ~ N(0 ; 4), alors Pr(X > 2) = 1 − Φ(2). » → FAUX
    contre-exemple (refute) : p = 0,159
  [examen tf]
  pièges : p_normal_sigma2

X ~ N(20 ; 4²). Calcule Pr(X > 24,7) avec la table de Φ (au millième).
  [free, sans aide, examen coef]  Pr(X > 24,7)
    = 0,12
  pièges : p_upper_tail

```

## Quantiles normaux, retrouver μ ou σ (`p-normal-inverse`, BA3)

_On lit la table à l'envers : Pr(X > c) = 0,1 ⇒ (c − μ)/σ = Φ⁻¹(0,9) = 1,28 (Table 2)._

### Niveau 1

```
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

Un lancer de javelot X (m) suit N(84 ; σ²). On sait que Pr(X > 87) = 0,25. Trouve σ (au centième).
  [guided]  Φ(3/σ)
    = 1 − □   (trous : 1 − 0,25)
    = 0,75
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,75)
    = 0,67
  — σ  [juge stat]  départ : σ
    = 3/0,67
    = 4,48
  aides : Pr(X > 87) = 0,25, c'est Φ(3/σ) = 0,75 : cherche 0,75 dans la table 2. | 3/σ = 0,67, donc σ = □ | σ = 4,48
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Un lancer de javelot X (m) suit N(84 ; σ²). On sait que Pr(X > 90) = 0,1. Trouve σ (au centième).
  [guided]  Φ(6/σ)
    = 1 − □   (trous : 1 − 0,1)
    = 0,9
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,9)
    = 1,28
  — σ  [juge stat]  départ : σ
    = 6/1,28
    = 4,69
  aides : Pr(X > 90) = 0,1, c'est Φ(6/σ) = 0,9 : cherche 0,9 dans la table 2. | 6/σ = 1,28, donc σ = □ | σ = 4,69
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

```

### Niveau 2

```
Un lancer de javelot X (m) suit N(60 ; σ²). On sait que Pr(X > 65) = 0,25. Trouve σ (au centième).
  [guided]  Φ(5/σ)
    = 1 − □   (trous : 1 − 0,25)
    = 0,75
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,75)
    = 0,67
  — σ  [juge stat]  départ : σ
    = 5/0,67
    = 7,46
  aides : Pr(X > 65) = 0,25, c'est Φ(5/σ) = 0,75 : cherche 0,75 dans la table 2. | 5/σ = 0,67, donc σ = □ | σ = 7,46
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Un lancer de javelot X (m) suit N(70 ; σ²). On sait que Pr(X > 73) = 0,25. Trouve σ (au centième).
  [guided]  Φ(3/σ)
    = 1 − □   (trous : 1 − 0,25)
    = 0,75
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,75)
    = 0,67
  — σ  [juge stat]  départ : σ
    = 3/0,67
    = 4,48
  aides : Pr(X > 73) = 0,25, c'est Φ(3/σ) = 0,75 : cherche 0,75 dans la table 2. | 3/σ = 0,67, donc σ = □ | σ = 4,48
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
X ~ N(50 ; 4²). Trouve le seuil c dépassé par seulement 10 % des valeurs (au dixième).
  [tap, suivre l'erreur, menu menu]  Φ((c − 50)/4)
    = 1 − 0,1
    = 0,9
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,9)
    = 1,28
  — c  [juge stat]  départ : c
    = 50 + 1,28·4
    = 55,1
  aides : Les valeurs du haut : Φ((c − μ)/σ) = 1 − part. | c = 50 + □·4 | c = 55,1
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Le poids X d'un paquet suit N(μ ; 10²). 5 % des paquets pèsent moins de 484 g. Trouve μ (au dixième).
  [tap, suivre l'erreur, menu menu]  Φ((μ − 484)/10)
    = 1 − 0,05
    = 0,95
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,95)
    = 1,64
  — μ  [juge stat]  départ : μ
    = 484 + 1,64·10
    = 500,4
  aides : 5 % en dessous de 484 : (μ − 484)/σ = Φ⁻¹(0,95). | μ = 484 + □·10 | μ = 500,4
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Un lancer de javelot X (m) suit N(84 ; σ²). On sait que Pr(X > 103) = 0,01. Trouve σ (au centième).
  [tap, suivre l'erreur, menu menu]  Φ(19/σ)
    = 1 − 0,01
    = 0,99
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,99)
    = 2,326
  — σ  [juge stat]  départ : σ
    = 19/2,326
    = 8,17
  aides : Pr(X > 103) = 0,01, c'est Φ(19/σ) = 0,99 : cherche 0,99 dans la table 2. | 19/σ = 2,326, donc σ = □ | σ = 8,17
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

```

### Niveau 4

```
X ~ N(100 ; 10²). Trouve le seuil c dépassé par seulement 20 % des valeurs (au dixième).
  [free, suivre l'erreur]  Φ((c − 100)/10)
    = 1 − 0,2
    = 0,8
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,8)
    = 0,84
  — c  [juge stat]  départ : c
    = 100 + 0,84·10
    = 108,4
  aides : Les valeurs du haut : Φ((c − μ)/σ) = 1 − part. | c = 100 + □·10 | c = 108,4
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Un lancer de javelot X (m) suit N(70 ; σ²). On sait que Pr(X > 76) = 0,1. Trouve σ (au centième).
  [free, suivre l'erreur]  Φ(6/σ)
    = 1 − 0,1
    = 0,9
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,9)
    = 1,28
  — σ  [juge stat]  départ : σ
    = 6/1,28
    = 4,69
  aides : Pr(X > 76) = 0,1, c'est Φ(6/σ) = 0,9 : cherche 0,9 dans la table 2. | 6/σ = 1,28, donc σ = □ | σ = 4,69
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Un lancer de javelot X (m) suit N(84 ; σ²). On sait que Pr(X > 107) = 0,01. Trouve σ (au centième).
  [free, suivre l'erreur]  Φ(23/σ)
    = 1 − 0,01
    = 0,99
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,99)
    = 2,326
  — σ  [juge stat]  départ : σ
    = 23/2,326
    = 9,89
  aides : Pr(X > 107) = 0,01, c'est Φ(23/σ) = 0,99 : cherche 0,99 dans la table 2. | 23/σ = 2,326, donc σ = □ | σ = 9,89
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

```

### Niveau 5

```
Un lancer de javelot X (m) suit N(84 ; σ²). On sait que Pr(X > 97) = 0,1. Trouve σ (au centième), puis Pr(X > 110).
  [free, sans aide]  Φ(13/σ)
    = 1 − 0,1
    = 0,9
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,9)
    = 1,28
  — σ  [juge stat]  départ : σ
    = 13/1,28
    = 10,16
  — z₂  [juge stat]  départ : z_2
    = 26/10,16
    = 2,56
  — Pr(X>110)  [juge stat]  départ : Pr(X > 110)
    = 1 − Φ(2,56)
    = 0,005
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Un lancer de javelot X (m) suit N(60 ; σ²). On sait que Pr(X > 73) = 0,1. Trouve σ (au centième), puis Pr(X > 86).
  [free, sans aide]  Φ(13/σ)
    = 1 − 0,1
    = 0,9
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,9)
    = 1,28
  — σ  [juge stat]  départ : σ
    = 13/1,28
    = 10,16
  — z₂  [juge stat]  départ : z_2
    = 26/10,16
    = 2,56
  — Pr(X>86)  [juge stat]  départ : Pr(X > 86)
    = 1 − Φ(2,56)
    = 0,005
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

Un lancer de javelot X (m) suit N(60 ; σ²). On sait que Pr(X > 68) = 0,2. Trouve σ (au centième), puis Pr(X > 76).
  [free, sans aide]  Φ(8/σ)
    = 1 − 0,2
    = 0,8
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,8)
    = 0,84
  — σ  [juge stat]  départ : σ
    = 8/0,84
    = 9,52
  — z₂  [juge stat]  départ : z_2
    = 16/9,52
    = 1,68
  — Pr(X>76)  [juge stat]  départ : Pr(X > 76)
    = 1 − Φ(1,68)
    = 0,046
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

```

### Variantes d'examen

```
Z ~ N(0 ; 1). Quel nombre z vérifie Pr(Z > z) = 0,2 ?
  ✔ 0,84   · 0,788 [p_quantile_inverse]   · 1,28   · −0,84 [p_phi_inverse_side]
  [examen mcq]
  pièges : p_phi_inverse_side, p_quantile_inverse

Vrai ou faux ?
  « Le quantile d'ordre 0,975 de N(0 ; 1) vaut 1,96. » → VRAI
  [examen tf]

Un lancer de javelot X (m) suit N(70 ; σ²). On sait que Pr(X > 78) = 0,025. Trouve σ (au centième).
  [free, sans aide, examen coef]  σ
    = 8/1,96
    = 4,08
  pièges : p_phi_inverse_side

Un lancer de javelot X (m) suit N(70 ; σ²). On sait que Pr(X > 73) = 0,25. Trouve σ (au centième), puis Pr(X > 76).
  [problème, examen open, 8 points]
  partie 1 (Début du problème : 2 ; z : 1,5 ; σ : 1,5 ; z₂ : 1,5 ; Pr(X>76) : 1,5)
  Un lancer de javelot X (m) suit N(70 ; σ²). On sait que Pr(X > 73) = 0,25. Trouve σ (au centième), puis Pr(X > 76).
    [free, sans aide, suivre l'erreur, examen open]  Φ(3/σ)
      = 1 − 0,25
      = 0,75
    — z  [juge stat]  départ : z
      = Φ⁻¹(0,75)
      = 0,67
    — σ  [juge stat]  départ : σ
      = 3/0,67
      = 4,48
    — z₂  [juge stat]  départ : z_2
      = 6/4,48
      = 1,34
    — Pr(X>76)  [juge stat]  départ : Pr(X > 76)
      = 1 − Φ(1,34)
      = 0,09
  pièges : p_upper_tail, p_phi_inverse_side, p_quantile_inverse

```

## Loi de Y = g(X) ; échantillonnage par F⁻¹ (`p-transform`, BA3)

_Si g est strictement monotone sur le support, f_Y(y) = f_X(g⁻¹(y))·|dg⁻¹/dy| sur g(support), 0 ailleurs._

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

U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 2. Trouve la densité de X.
  [guided]  g⁻¹(x)
    (Le support de X ? u ∈ ]0 ; 1[ donne x ∈ ]0 ; +∞[.)
    = e^(−□)   (trous : e^(−2x))
  — (g⁻¹)′(x)  [juge prob]  départ : (g⁻¹)′(x)
    = −2e^(−□)   (trous : −2e^(−2x))
  — f_X(x)  [juge prob]  départ : f_X(x)
    = 1·□   (trous : 1·2e^(−2x))
  aides : Inverse g, dérive l'inverse, prends la valeur absolue. | f_X(x) = 1·|□| | f_X(x) = 2e^(-2x) : X ~ exp(2)
  pièges : p_transform_jacobian, p_transform_abs, p_transform_support

U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 2. Trouve la densité de X.
  [guided]  g⁻¹(x)
    (Le support de X ? u ∈ ]0 ; 1[ donne x ∈ ]0 ; +∞[.)
    = e^(−□)   (trous : e^(−2x))
  — (g⁻¹)′(x)  [juge prob]  départ : (g⁻¹)′(x)
    = −2e^(−□)   (trous : −2e^(−2x))
  — f_X(x)  [juge prob]  départ : f_X(x)
    = 1·□   (trous : 1·2e^(−2x))
  aides : Inverse g, dérive l'inverse, prends la valeur absolue. | f_X(x) = 1·|□| | f_X(x) = 2e^(-2x) : X ~ exp(2)
  pièges : p_transform_jacobian, p_transform_abs, p_transform_support

```

### Niveau 2

```
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

```

### Niveau 3

```
On veut tirer X de fonction de répartition F(x) = 1 − e^(−4x) (x ≥ 0) à partir de U ~ U(0 ; 1). Donne F⁻¹(u).
  [tap, suivre l'erreur, menu menu]  F⁻¹(u)
    = −ln(1 − u)/4
  aides : Résous F(x) = u en x. | e^(−4x) = □ | F⁻¹(u) = −ln(1 − u)/4
  pièges : p_quantile_inverse

X ~ exp(λ) avec λ = 1, et Y = 3X. Trouve la densité de Y sur ]0 ; +∞[.
  [tap, suivre l'erreur, menu menu]  g⁻¹(y)
    = y/3
  — (g⁻¹)′(y)  [juge prob]  départ : (g⁻¹)′(y)
    = 1/3
  — f_Y(y)  [juge prob]  départ : f_Y(y)
    = 1e^(−1·y/3)·1/3
  aides : Inverse g : x = (y − b)/a ; la densité est divisée par a. | f_Y(y) = f_X(□)·1/3 | f_Y(y) = (1/3)e^(-(1/3)×y)
  pièges : p_scale_density, p_transform_jacobian

X ~ U(0 ; 1) et Y = X². Trouve la densité de Y sur son support.
  [tap, suivre l'erreur, menu menu]  g⁻¹(y)
    ? Le support de Y ? ✔ x ∈ ]0 ; 1[ donne y = x² ∈ ]0 ; 1[ / · y ∈ ]0 ; +∞[
    = √y
  — (g⁻¹)′(y)  [juge prob]  départ : (g⁻¹)′(y)
    = 1/(2√y)
  — f_Y(y)  [juge prob]  départ : f_Y(y)
    = 1·1/(2√y)
  aides : Inverse g sur ]0 ; 1[ : x = √y, puis dérive. | f_Y(y) = 1·|□| | f_Y(y) = 1/(2√y) sur ]0 ; 1[
  pièges : p_transform_jacobian, p_transform_support

```

### Niveau 4

```
X ~ exp(λ) avec λ = 1, et Y = 2X + 1. Trouve la densité de Y sur ]1 ; +∞[.
  [free, suivre l'erreur]  g⁻¹(y)
    = (y − 1)/2
  — (g⁻¹)′(y)  [juge prob]  départ : (g⁻¹)′(y)
    = 1/2
  — f_Y(y)  [juge prob]  départ : f_Y(y)
    = 1e^(−1·(y − 1)/2)·1/2
  aides : Inverse g : x = (y − b)/a ; la densité est divisée par a. | f_Y(y) = f_X(□)·1/2 | f_Y(y) = (1/2)e^(-(1/2)×(y-1))
  pièges : p_scale_density, p_transform_jacobian

On veut tirer X de fonction de répartition F(x) = 1 − e^(−x^2) (x ≥ 0, Weibull) à partir de U ~ U(0 ; 1). Donne F⁻¹(u).
  [free, suivre l'erreur]  F⁻¹(u)
    = (−ln(1 − u))^(1/2)
  aides : Résous F(x) = u en x. | x^2 = −ln(□) | F⁻¹(u) = (−ln(1 − u))^(1/2)

U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 3. Trouve la densité de X.
  [free, suivre l'erreur]  g⁻¹(x)
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

### Niveau 5

```
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

X ~ exp(λ) avec λ = 2, et Y = 4X + 1. Trouve la densité de Y sur ]1 ; +∞[.
  [free, sans aide]  g⁻¹(y)
    = (y − 1)/4
  — (g⁻¹)′(y)  [juge prob]  départ : (g⁻¹)′(y)
    = 1/4
  — f_Y(y)  [juge prob]  départ : f_Y(y)
    = 2e^(−2·(y − 1)/4)·1/4
  pièges : p_scale_density, p_transform_jacobian

X ~ exp(λ) avec λ = 2, et Y = 3X + 2. Trouve la densité de Y sur ]2 ; +∞[.
  [free, sans aide]  g⁻¹(y)
    = (y − 2)/3
  — (g⁻¹)′(y)  [juge prob]  départ : (g⁻¹)′(y)
    = 1/3
  — f_Y(y)  [juge prob]  départ : f_Y(y)
    = 2e^(−2·(y − 2)/3)·1/3
  pièges : p_scale_density, p_transform_jacobian

```

### Variantes d'examen

```
U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 1. Quelle est la densité de X ?
  · 1 pour x > 0 [p_transform_jacobian]   ✔ e^(-x) pour x > 0   · e^(-x) pour 0 < x < 1 [p_transform_support]   · -e^(-x) pour x > 0 [p_transform_abs]
  [examen mcq]
  pièges : p_transform_jacobian, p_transform_abs, p_transform_support

Vrai ou faux ?
  « Si Y = 2X, alors f_Y(y) = 2·f_X(y). » → FAUX
    contre-exemple (refute) : I = 2
  [examen tf]
  pièges : p_scale_density

U ~ U(0 ; 1) et X = −ln(U)/3. Que vaut la densité de X en x = 1 (au millième) ?
  [free, sans aide, examen coef]  f_X(1)
    = 0,149
  pièges : p_transform_jacobian, p_transform_abs

U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = 1. Trouve la densité de X.
  [problème, examen open, 10 points]
  partie 1 (Début du problème : 3,5 ; (g⁻¹)′(x) : 3,5 ; f_X(x) : 3)
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

_Un tableau p(x, y)._

### Niveau 1

```
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

Loi conjointe de X et Y :X \ Y0100,080,1210,320,48Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [guided]  p_X(1)
    = 0,32 + □   (trous : 0,32 + 0,48)
    = 0,8
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,08 + □   (trous : 0,08 + 0,32)
    = 0,4
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    (X et Y sont-ils indépendants ? Oui : chaque case est le produit des marginales.)
    = 0,48/□   (trous : 0,48/0,6)
    = 4/5
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,48/□ | Pr(X = 1 | Y = 1) = 0,8
  pièges : p_marginal_wrong_axis, p_cond_denominator

Loi conjointe de X et Y :X \ Y01200,050,10,3510,050,10,35Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [guided]  p_X(1)
    = 0,05 + 0,1 + □   (trous : 0,05 + 0,1 + 0,35)
    = 0,5
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = □ + 0,05   (trous : 0,05 + 0,05)
    = 0,1
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    (X et Y sont-ils indépendants ? Oui : chaque case est le produit des marginales.)
    = 0,1/□   (trous : 0,1/0,2)
    = 1/2
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,1/□ | Pr(X = 1 | Y = 1) = 0,5
  pièges : p_marginal_wrong_axis, p_cond_denominator

```

### Niveau 2

```
Loi conjointe de X et Y :X \ Y01200,050,250,210,050,250,2Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [guided]  p_X(1)
    = 0,05 + 0,25 + 0,2
    = 0,5
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = □ + 0,05   (trous : 0,05 + 0,05)
    = 0,1
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Oui : chaque case est le produit des marginales / · Non
    = 0,25/□   (trous : 0,25/0,5)
    = 1/2
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,25/□ | Pr(X = 1 | Y = 1) = 0,5
  pièges : p_marginal_wrong_axis

Loi conjointe de X et Y :X \ Y0100,370,4310,030,17Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [guided]  p_X(1)
    = 0,03 + □   (trous : 0,03 + 0,17)
    = 0,2
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,37 + □   (trous : 0,37 + 0,03)
    = 0,4
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,37 ≠ p_X(0)·p_Y(0) = 0,32 / · Oui
    = 0,17/□   (trous : 0,17/0,6)
    = 17/60
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,17/□ | Pr(X = 1 | Y = 1) = 17/60
  pièges : p_marginal_wrong_axis, p_cond_denominator

Loi conjointe de X et Y :X \ Y0100,160,0410,640,16Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [guided]  p_X(1)
    = 0,64 + □   (trous : 0,64 + 0,16)
    = 0,8
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,16 + □   (trous : 0,16 + 0,64)
    = 0,8
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Oui : chaque case est le produit des marginales / · Non
    = 0,16/□   (trous : 0,16/0,2)
    = 4/5
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,16/□ | Pr(X = 1 | Y = 1) = 0,8
  pièges : p_marginal_wrong_axis, p_cond_denominator

```

### Niveau 3

```
Loi conjointe de X et Y :X \ Y01200,20,10,210,050,40,05Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1) et cov(X, Y).
  [tap, suivre l'erreur, menu menu]  p_X(1)
    = 0,05 + 0,4 + 0,05
    = 0,5
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,2 + 0,05
    = 0,25
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,2 ≠ p_X(0)·p_Y(0) = 0,125 / · Oui, puisque cov(X, Y) = 0
    = 0,4/0,5
    = 4/5
  — cov(X,Y)  [juge prob]  départ : cov(X,Y)
    = 0,5 − 0,5·1
    = 0
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,4/□ | Pr(X = 1 | Y = 1) = 0,8
  pièges : p_marginal_wrong_axis, p_cov_zero_indep

Loi conjointe de X et Y :X \ Y01200,230,130,2410,070,170,16Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [tap, suivre l'erreur, menu menu]  p_X(1)
    = 0,07 + 0,17 + 0,16
    = 0,4
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,23 + 0,07
    = 0,3
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,23 ≠ p_X(0)·p_Y(0) = 0,18 / · Oui
    = 0,17/0,3
    = 17/30
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,17/□ | Pr(X = 1 | Y = 1) = 17/30
  pièges : p_marginal_wrong_axis, p_cond_denominator

Loi conjointe de X et Y :X \ Y0100,10,110,40,4Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1).
  [tap, suivre l'erreur, menu menu]  p_X(1)
    = 0,4 + 0,4
    = 0,8
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,1 + 0,4
    = 0,5
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Oui : chaque case est le produit des marginales / · Non
    = 0,4/0,5
    = 4/5
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,4/□ | Pr(X = 1 | Y = 1) = 0,8
  pièges : p_marginal_wrong_axis, p_cond_denominator

```

### Niveau 4

```
Loi conjointe de X et Y :X \ Y0100,290,3110,110,29Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1) et cov(X, Y).
  [free, suivre l'erreur]  p_X(1)
    = 0,11 + 0,29
    = 0,4
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,29 + 0,11
    = 0,4
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,29 ≠ p_X(0)·p_Y(0) = 0,24 / · Oui
    = 0,29/0,6
    = 29/60
  — cov(X,Y)  [juge prob]  départ : cov(X,Y)
    = 0,29 − 0,4·0,6
    = 0,05
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,29/□ | Pr(X = 1 | Y = 1) = 29/60
  pièges : p_marginal_wrong_axis, p_cond_denominator

Loi conjointe de X et Y :X \ Y0100,150,3510,050,45Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1) et cov(X, Y).
  [free, suivre l'erreur]  p_X(1)
    = 0,05 + 0,45
    = 0,5
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,15 + 0,05
    = 0,2
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,15 ≠ p_X(0)·p_Y(0) = 0,1 / · Oui
    = 0,45/0,8
    = 9/16
  — cov(X,Y)  [juge prob]  départ : cov(X,Y)
    = 0,45 − 0,5·0,8
    = 0,05
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,45/□ | Pr(X = 1 | Y = 1) = 0,5625
  pièges : p_marginal_wrong_axis, p_cond_denominator

Loi conjointe de X et Y :X \ Y0100,370,0310,430,17Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1) et cov(X, Y).
  [free, suivre l'erreur]  p_X(1)
    = 0,43 + 0,17
    = 0,6
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,37 + 0,43
    = 0,8
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,37 ≠ p_X(0)·p_Y(0) = 0,32 / · Oui
    = 0,17/0,2
    = 17/20
  — cov(X,Y)  [juge prob]  départ : cov(X,Y)
    = 0,17 − 0,6·0,2
    = 0,05
  aides : Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit. | Pr(X = 1 | Y = 1) = 0,17/□ | Pr(X = 1 | Y = 1) = 0,85
  pièges : p_marginal_wrong_axis, p_cond_denominator

```

### Niveau 5

```
Loi conjointe de X et Y :X \ Y01200,20,150,210,20,050,2Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1) et cov(X, Y).
  [free, sans aide]  p_X(1)
    = 0,2 + 0,05 + 0,2
    = 0,45
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,2 + 0,2
    = 0,4
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,2 ≠ p_X(0)·p_Y(0) = 0,22 / · Oui, puisque cov(X, Y) = 0
    = 0,05/0,2
    = 1/4
  — cov(X,Y)  [juge prob]  départ : cov(X,Y)
    = 0,45 − 0,45·1
    = 0
  pièges : p_marginal_wrong_axis, p_cond_denominator, p_cov_zero_indep

Loi conjointe de X et Y :X \ Y01200,20,20,210,150,10,15Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1) et cov(X, Y).
  [free, sans aide]  p_X(1)
    = 0,15 + 0,1 + 0,15
    = 0,4
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,2 + 0,15
    = 0,35
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,2 ≠ p_X(0)·p_Y(0) = 0,21 / · Oui, puisque cov(X, Y) = 0
    = 0,1/0,3
    = 1/3
  — cov(X,Y)  [juge prob]  départ : cov(X,Y)
    = 0,4 − 0,4·1
    = 0
  pièges : p_marginal_wrong_axis, p_cond_denominator, p_cov_zero_indep

Loi conjointe de X et Y :X \ Y01200,20,050,210,050,450,05Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = 1) et cov(X, Y).
  [free, sans aide]  p_X(1)
    = 0,05 + 0,45 + 0,05
    = 0,55
  — p_Y(0)  [juge prob]  départ : p_Y(0)
    = 0,2 + 0,05
    = 0,25
  — Pr(X=1|Y=1)  [juge prob]  départ : Pr(X=1|Y=1)
    ? X et Y sont-ils indépendants ? ✔ Non : p(0, 0) = 0,2 ≠ p_X(0)·p_Y(0) = 0,1125 / · Oui, puisque cov(X, Y) = 0
    = 0,45/0,5
    = 9/10
  — cov(X,Y)  [juge prob]  départ : cov(X,Y)
    = 0,55 − 0,55·1
    = 0
  pièges : p_marginal_wrong_axis, p_cond_denominator, p_cov_zero_indep

```

### Variantes d'examen

```
Loi conjointe de X et Y :X \ Y01200,20,050,210,050,450,05Que vaut Pr(X = 1 | Y = 1) ?
  · 0,5   ✔ 0,9   · 9/11 [p_cond_denominator]   · 0,45
  [examen mcq]
  pièges : p_cond_denominator

Vrai ou faux ?
  « Pour la loi conjointe ci-dessous, cov(X, Y) = 0, donc X et Y sont indépendants.X \ Y01200,050,150,0510,20,350,2 » → FAUX
    contre-exemple (refute) : a = 1/20, b = 1/16
  [examen tf]
  pièges : p_cov_zero_indep

Loi conjointe de X et Y :X \ Y0100,350,1510,350,15Que vaut Pr(X = 1 | Y = 1) ?
  [free, sans aide, examen coef]  Pr(X=1|Y=1)
    = 1/2
  pièges : p_cond_denominator

```

## Densité conjointe : constante, marginales, indépendance (`p-joint-cont`, BA3)

_∬ f = 1 sur le support ; marginale f_X(x) = ∫ f(x, y) dy, avec des bornes qui peuvent dépendre de x ; indépendance ⇔ f(x, y) =…_

### Niveau 1

```
(W, Z) a pour densité f(w, z) = c·wz sur [0 ; 3] × [0 ; 1], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [guided]  ∫fdz
    = □   (trous : (1/2)w)
  — I  [juge prob]  départ : I
    = 9/4
  — c  [juge prob]  départ : c
    = 1/(9/4)
    = 4/9
  — Marginale de W sur [0 ; 3]  [juge prob]  départ : f_W(w)
    = (4/9)·(□)   (trous : (4/9)·((1/2)w))
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^1 (wz) dz = □ | I = 2,25, c = 4/9, f_W(w) = (4/9)×((1/2)w)
  pièges : p_normalize_bounds

(W, Z) a pour densité f(w, z) = c·w(w + z) sur [0 ; 1] × [0 ; 1], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [guided]  ∫fdz
    = □   (trous : w² + (1/2)w)
  — I  [juge prob]  départ : I
    = 1·1³/3 + 1/2·1²/2
    = 7/12
  — c  [juge prob]  départ : c
    = 1/(7/12)
    = 12/7
  — Marginale de W sur [0 ; 1]  [juge prob]  départ : f_W(w)
    = (12/7)·(□)   (trous : (12/7)·(w² + (1/2)w))
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^1 (w(w+z)) dz = □ | I = 7/12, c = 12/7, f_W(w) = (12/7)×(w^2+(1/2)w)
  pièges : p_normalize_bounds, p_joint_support_indep

(W, Z) a pour densité f(w, z) = c·w(w + z) sur [0 ; 2] × [0 ; 2], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [guided]  ∫fdz
    = □   (trous : 2w² + 2w)
  — I  [juge prob]  départ : I
    = 2·2³/3 + 2·2²/2
    = 28/3
  — c  [juge prob]  départ : c
    = 1/(28/3)
    = 3/28
  — Marginale de W sur [0 ; 2]  [juge prob]  départ : f_W(w)
    = (3/28)·(□)   (trous : (3/28)·(2w² + 2w))
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^2 (w(w+z)) dz = □ | I = 28/3, c = 3/28, f_W(w) = (3/28)×(2w^2+2w)
  pièges : p_marginal_bounds, p_normalize_bounds, p_joint_support_indep

```

### Niveau 2

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
    ? W et Z sont-elles indépendantes ? ✔ Oui : f se factorise en (fonction de w)·(fonction de z) sur un rectangle / · Non
    = (2/81)·(□)   (trous : (2/81)·((9/2)w²))
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^3 (w^2z) dz = □ | I = 40,5, c = 2/81, f_W(w) = (2/81)×((9/2)w^2)
  pièges : p_marginal_bounds, p_normalize_bounds

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

(W, Z) a pour densité f(w, z) = c·wz² sur [0 ; 3] × [0 ; 2], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [guided]  ∫fdz
    = □   (trous : (8/3)w)
  — I  [juge prob]  départ : I
    = 12
  — c  [juge prob]  départ : c
    = 1/12
  — Marginale de W sur [0 ; 3]  [juge prob]  départ : f_W(w)
    ? W et Z sont-elles indépendantes ? ✔ Oui : f se factorise en (fonction de w)·(fonction de z) sur un rectangle / · Non
    = (1/12)·(□)   (trous : (1/12)·((8/3)w))
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^2 (wz^2) dz = □ | I = 12, c = 1/12, f_W(w) = (1/12)×((8/3)w)
  pièges : p_marginal_bounds, p_normalize_bounds

```

### Niveau 3

```
(W, Z) a pour densité f(w, z) = c·w(w + z) sur [0 ; 3] × [0 ; 2], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [tap, suivre l'erreur, menu menu]  ∫fdz
    = 2w² + 2w
  — I  [juge prob]  départ : I
    = 2·3³/3 + 2·3²/2
    = 27
  — c  [juge prob]  départ : c
    = 1/27
  — Marginale de W sur [0 ; 3]  [juge prob]  départ : f_W(w)
    ? W et Z sont-elles indépendantes ? ✔ Non : w(w+z) ne se factorise pas en (fonction de w)·(fonction de z) / · Oui, le support est un rectangle
    = (1/27)·(2w² + 2w)
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^2 (w(w+z)) dz = □ | I = 27, c = 1/27, f_W(w) = (1/27)×(2w^2+2w)
  pièges : p_marginal_bounds, p_normalize_bounds, p_joint_support_indep

(W, Z) a pour densité f(w, z) = c·w(w + z) sur [0 ; 1] × [0 ; 2], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [tap, suivre l'erreur, menu menu]  ∫fdz
    = 2w² + 2w
  — I  [juge prob]  départ : I
    = 2·1³/3 + 2·1²/2
    = 5/3
  — c  [juge prob]  départ : c
    = 1/(5/3)
    = 3/5
  — Marginale de W sur [0 ; 1]  [juge prob]  départ : f_W(w)
    ? W et Z sont-elles indépendantes ? ✔ Non : w(w+z) ne se factorise pas en (fonction de w)·(fonction de z) / · Oui, le support est un rectangle
    = (3/5)·(2w² + 2w)
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^2 (w(w+z)) dz = □ | I = 5/3, c = 0,6, f_W(w) = (3/5)×(2w^2+2w)
  pièges : p_marginal_bounds, p_normalize_bounds, p_joint_support_indep

(W, Z) a pour densité f(w, z) = c·w²z sur [0 ; 1] × [0 ; 2], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [tap, suivre l'erreur, menu menu]  ∫fdz
    = 2w²
  — I  [juge prob]  départ : I
    = 2/3
  — c  [juge prob]  départ : c
    = 1/(2/3)
    = 3/2
  — Marginale de W sur [0 ; 1]  [juge prob]  départ : f_W(w)
    ? W et Z sont-elles indépendantes ? ✔ Oui : f se factorise en (fonction de w)·(fonction de z) sur un rectangle / · Non
    = (3/2)·(2w²)
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^2 (w^2z) dz = □ | I = 2/3, c = 1,5, f_W(w) = (3/2)×(2w^2)
  pièges : p_marginal_bounds, p_normalize_bounds

```

### Niveau 4

```
(W, Z) a pour densité f(w, z) = c·w²z sur [0 ; 2] × [0 ; 3], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [free, suivre l'erreur]  ∫fdz
    = (9/2)w²
  — I  [juge prob]  départ : I
    = 12
  — c  [juge prob]  départ : c
    = 1/12
  — Marginale de W sur [0 ; 2]  [juge prob]  départ : f_W(w)
    ? W et Z sont-elles indépendantes ? ✔ Oui : f se factorise en (fonction de w)·(fonction de z) sur un rectangle / · Non
    = (1/12)·((9/2)w²)
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^3 (w^2z) dz = □ | I = 12, c = 1/12, f_W(w) = (1/12)×((9/2)w^2)
  pièges : p_marginal_bounds, p_normalize_bounds

(W, Z) a pour densité f(w, z) = c·wz² sur [0 ; 1] × [0 ; 1], et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.
  [free, suivre l'erreur]  ∫fdz
    = (1/3)w
  — I  [juge prob]  départ : I
    = 1/6
  — c  [juge prob]  départ : c
    = 1/(1/6)
    = 6
  — Marginale de W sur [0 ; 1]  [juge prob]  départ : f_W(w)
    ? W et Z sont-elles indépendantes ? ✔ Oui : f se factorise en (fonction de w)·(fonction de z) sur un rectangle / · Non
    = 6·((1/3)w)
  aides : Intègre d'abord en z (w fixé), puis en w ; ∬ f = 1 donne c. | ∫₀^1 (wz^2) dz = □ | I = 1/6, c = 6, f_W(w) = 6×((1/3)w)

(X, Y) a pour densité f(x, y) = c·y·e^(−3x − 1y) pour x > 0, y > 0. Calcule les deux intégrales simples, c, puis la marginale de Y.
  [free, suivre l'erreur]  ∫e^(−ax)dx
    = 1/3
  — ∫₀^∞ y·e^(−1y) dy  [juge prob]  départ : ∫ye^(−by)dy
    = 1
  — c  [juge prob]  départ : c
    = 3
  — Marginale de Y  [juge prob]  départ : f_Y(y)
    = 1y·e^(−1y)
  aides : Le noyau se sépare : c·(∫ e^(−ax) dx)·(∫ y e^(−by) dy) = 1. | c·(1/3)·(□) = 1 | c = 3, f_Y(y) = 1y·e^(−1y)

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
(W, Z) a pour densité f(w, z) = c·w(w + z) sur [0 ; 1] × [0 ; 3], et 0 ailleurs. Que vaut c ?
  · 1   ✔ 4/13   · 3,25   · 12/7 [p_normalize_bounds]
  [examen mcq]
  pièges : p_normalize_bounds

Vrai ou faux ?
  « Si f(x, y) = 24xy sur le triangle x ≥ 0, y ≥ 0, x + y ≤ 1, X et Y sont indépendantes, parce que f se factorise. » → FAUX
    contre-exemple (refute) : u = 0,011664, v = 0
  [examen tf]
  pièges : p_joint_support_indep

(W, Z) a pour densité f(w, z) = c·wz sur [0 ; 1] × [0 ; 1], et 0 ailleurs. Que vaut c ?
  [free, sans aide, examen coef]  c
    = 4

```

## Combinaisons linéaires : espérance, variance, covariance (`p-lin-combo`, BA3)

_E[aX + bY + c] = aE[X] + bE[Y] + c, toujours._

### Niveau 1

```
X = X_A + 3X_B − X_C, avec E[X_A] = 3, E[X_B] = −3, E[X_C] = 2 ; var(X_A) = 5, var(X_B) = 4, var(X_C) = 3 ; cov(X_B, X_C) = −1, E[X_A X_B] = −7, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [guided]  E[X]
    = 3 + 3·(−3) − 1·□   (trous : 3 + 3·(−3) − 1·(2))
    = −8
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = □ − (3)·(−3)   (trous : −7 − (3)·(−3))
    = 2
  — var(X)  [juge prob]  départ : var(X)
    = 5 + □·4 + (−1)²·3 + 2·(3·(2) + 3·(−1)·(−1))   (trous : 5 + 3²·4 + (−1)²·3 + 2·(3·(2) + 3·(−1)·(−1)))
    = 62
  — σ  [juge stat]  départ : σ
    = √62
    = 7,87
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 5 + 9·4 + 1·3 + 2(□) | var(X) = 62
  pièges : p_var_sum_cov, p_var_scale, p_var_diff

X = X_A + 3X_B − X_C, avec E[X_A] = 2, E[X_B] = 4, E[X_C] = 2 ; var(X_A) = 9, var(X_B) = 3, var(X_C) = 4 ; cov(X_B, X_C) = −2, E[X_A X_B] = 7, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [guided]  E[X]
    = 2 + 3·(4) − 1·□   (trous : 2 + 3·(4) − 1·(2))
    = 12
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = □ − (2)·(4)   (trous : 7 − (2)·(4))
    = −1
  — var(X)  [juge prob]  départ : var(X)
    = 9 + □·3 + (−1)²·4 + 2·(3·(−1) + 3·(−1)·(−2))   (trous : 9 + 3²·3 + (−1)²·4 + 2·(3·(−1) + 3·(−1)·(−2)))
    = 46
  — σ  [juge stat]  départ : σ
    = √46
    = 6,78
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 9 + 9·3 + 1·4 + 2(□) | var(X) = 46
  pièges : p_var_sum_cov, p_var_scale, p_var_diff

X = X_A + 2X_B + 2X_C, avec E[X_A] = −1, E[X_B] = −3, E[X_C] = −2 ; var(X_A) = 7, var(X_B) = 4, var(X_C) = 6 ; cov(X_B, X_C) = −2, E[X_A X_B] = 2, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [guided]  E[X]
    = −1 + 2·(−3) + 2·□   (trous : −1 + 2·(−3) + 2·(−2))
    = −11
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = □ − (−1)·(−3)   (trous : 2 − (−1)·(−3))
    = −1
  — var(X)  [juge prob]  départ : var(X)
    = 7 + □·4 + 2²·6 + 2·(2·(−1) + 2·2·(−2))   (trous : 7 + 2²·4 + 2²·6 + 2·(2·(−1) + 2·2·(−2)))
    = 27
  — σ  [juge stat]  départ : σ
    = √27
    = 5,2
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 7 + 4·4 + 4·6 + 2(□) | var(X) = 27
  pièges : p_var_sum_cov, p_var_scale

```

### Niveau 2

```
X = X_A − 2X_B + X_C, avec E[X_A] = −1, E[X_B] = 3, E[X_C] = 5 ; var(X_A) = 9, var(X_B) = 8, var(X_C) = 2 ; cov(X_B, X_C) = 0, E[X_A X_B] = −4, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [guided]  E[X]
    = −1 − 2·(3) + 1·□   (trous : −1 − 2·(3) + 1·(5))
    = −2
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = □ − (−1)·(3)   (trous : −4 − (−1)·(3))
    = −1
  — var(X)  [juge prob]  départ : var(X)
    = 9 + □·8 + 1²·2 + 2·(−2·(−1) − 2·1·(0))   (trous : 9 + (−2)²·8 + 1²·2 + 2·(−2·(−1) − 2·1·(0)))
    = 47
  — σ  [juge stat]  départ : σ
    = √47
    = 6,86
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 9 + 4·8 + 1·2 + 2(□) | var(X) = 47
  pièges : p_var_sum_cov, p_var_scale, p_var_diff

X = X_A − 2X_B + 2X_C, avec E[X_A] = 2, E[X_B] = 3, E[X_C] = 0 ; var(X_A) = 7, var(X_B) = 7, var(X_C) = 5 ; cov(X_B, X_C) = 2, E[X_A X_B] = 8, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [guided]  E[X]
    = 2 − 2·(3) + 2·□   (trous : 2 − 2·(3) + 2·(0))
    = −4
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = □ − (2)·(3)   (trous : 8 − (2)·(3))
    = 2
  — var(X)  [juge prob]  départ : var(X)
    = 7 + □·7 + 2²·5 + 2·(−2·(2) − 2·2·(2))   (trous : 7 + (−2)²·7 + 2²·5 + 2·(−2·(2) − 2·2·(2)))
    = 31
  — σ  [juge stat]  départ : σ
    = √31
    = 5,57
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 7 + 4·7 + 4·5 + 2(□) | var(X) = 31
  pièges : p_var_sum_cov, p_var_scale, p_var_diff

X = X_A + 2X_B − X_C, avec E[X_A] = 4, E[X_B] = 4, E[X_C] = −1 ; var(X_A) = 2, var(X_B) = 5, var(X_C) = 6 ; cov(X_B, X_C) = 2, E[X_A X_B] = 18, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [guided]  E[X]
    = 4 + 2·(4) − 1·□   (trous : 4 + 2·(4) − 1·(−1))
    = 13
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = □ − (4)·(4)   (trous : 18 − (4)·(4))
    = 2
  — var(X)  [juge prob]  départ : var(X)
    = 2 + □·5 + (−1)²·6 + 2·(2·(2) + 2·(−1)·(2))   (trous : 2 + 2²·5 + (−1)²·6 + 2·(2·(2) + 2·(−1)·(2)))
    = 28
  — σ  [juge stat]  départ : σ
    = √28
    = 5,29
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 2 + 4·5 + 1·6 + 2(□) | var(X) = 28
  pièges : p_var_scale, p_var_diff, p_var_sum_cov

```

### Niveau 3

```
X = X_A − X_B + 2X_C, avec E[X_A] = −2, E[X_B] = 4, E[X_C] = 0 ; var(X_A) = 9, var(X_B) = 5, var(X_C) = 1 ; cov(X_B, X_C) = 2, E[X_A X_B] = −7, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [tap, suivre l'erreur, menu menu]  E[X]
    = −2 − 1·(4) + 2·(0)
    = −6
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = −7 − (−2)·(4)
    = 1
  — var(X)  [juge prob]  départ : var(X)
    = 9 + (−1)²·5 + 2²·1 + 2·(−1·(1) − 1·2·(2))
    = 8
  — σ  [juge stat]  départ : σ
    = √8
    = 2,83
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 9 + 1·5 + 4·1 + 2(□) | var(X) = 8
  pièges : p_var_sum_cov, p_var_scale, p_var_diff

X = X_A − 2X_B − X_C, avec E[X_A] = 3, E[X_B] = 3, E[X_C] = −2 ; var(X_A) = 4, var(X_B) = 6, var(X_C) = 3 ; cov(X_B, X_C) = 2, E[X_A X_B] = 11, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [tap, suivre l'erreur, menu menu]  E[X]
    = 3 − 2·(3) − 1·(−2)
    = −1
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = 11 − (3)·(3)
    = 2
  — var(X)  [juge prob]  départ : var(X)
    = 4 + (−2)²·6 + (−1)²·3 + 2·(−2·(2) − 2·(−1)·(2))
    = 31
  — σ  [juge stat]  départ : σ
    = √31
    = 5,57
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 4 + 4·6 + 1·3 + 2(□) | var(X) = 31
  pièges : p_var_scale, p_var_diff, p_var_sum_cov

X et Y sont indépendantes, E[X] = 2, var(X) = 2, E[Y] = 1, var(Y) = 3. Calcule var(XY).
  [tap, suivre l'erreur, menu menu]  E[X²]
    = 2 + 2²
    = 6
  — E[Y²]  [juge prob]  départ : E[Y²]
    = 3 + 1²
    = 4
  — var(XY)  [juge prob]  départ : var(XY)
    = 6·4 − (2·1)²
    = 20
  aides : Pour X, Y indépendantes, var(XY) = E[X²]E[Y²] − (E[X]E[Y])². | var(XY) = 6·4 − □ | var(XY) = 20
  pièges : p_var_xy

```

### Niveau 4

```
X = X_A + 2X_B + X_C, avec E[X_A] = 1, E[X_B] = 3, E[X_C] = −3 ; var(X_A) = 4, var(X_B) = 5, var(X_C) = 6 ; cov(X_B, X_C) = 2, E[X_A X_B] = 5, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [free, suivre l'erreur]  E[X]
    = 1 + 2·(3) + 1·(−3)
    = 4
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = 5 − (1)·(3)
    = 2
  — var(X)  [juge prob]  départ : var(X)
    = 4 + 2²·5 + 1²·6 + 2·(2·(2) + 2·1·(2))
    = 46
  — σ  [juge stat]  départ : σ
    = √46
    = 6,78
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 4 + 4·5 + 1·6 + 2(□) | var(X) = 46
  pièges : p_var_sum_cov, p_var_scale

X = X_A + 3X_B + 2X_C, avec E[X_A] = 1, E[X_B] = 5, E[X_C] = 1 ; var(X_A) = 6, var(X_B) = 1, var(X_C) = 9 ; cov(X_B, X_C) = 0, E[X_A X_B] = 3, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [free, suivre l'erreur]  E[X]
    = 1 + 3·(5) + 2·(1)
    = 18
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = 3 − (1)·(5)
    = −2
  — var(X)  [juge prob]  départ : var(X)
    = 6 + 3²·1 + 2²·9 + 2·(3·(−2) + 3·2·(0))
    = 39
  — σ  [juge stat]  départ : σ
    = √39
    = 6,24
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 6 + 9·1 + 4·9 + 2(□) | var(X) = 39
  pièges : p_var_sum_cov, p_var_scale

X = X_A + 3X_B + 2X_C, avec E[X_A] = 1, E[X_B] = 3, E[X_C] = 4 ; var(X_A) = 4, var(X_B) = 6, var(X_C) = 1 ; cov(X_B, X_C) = 2, E[X_A X_B] = 4, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [free, suivre l'erreur]  E[X]
    = 1 + 3·(3) + 2·(4)
    = 18
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = 4 − (1)·(3)
    = 1
  — var(X)  [juge prob]  départ : var(X)
    = 4 + 3²·6 + 2²·1 + 2·(3·(1) + 3·2·(2))
    = 92
  — σ  [juge stat]  départ : σ
    = √92
    = 9,59
  aides : Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov. | var(X) = 4 + 9·6 + 4·1 + 2(□) | var(X) = 92
  pièges : p_var_sum_cov, p_var_scale

```

### Niveau 5

```
X et Y sont indépendantes, E[X] = 3, var(X) = 3, E[Y] = 3, var(Y) = 4. Calcule var(XY).
  [free, sans aide]  E[X²]
    = 3 + 3²
    = 12
  — E[Y²]  [juge prob]  départ : E[Y²]
    = 4 + 3²
    = 13
  — var(XY)  [juge prob]  départ : var(XY)
    = 12·13 − (3·3)²
    = 75
  pièges : p_var_xy

X = X_A − 2X_B + X_C, avec E[X_A] = −2, E[X_B] = 3, E[X_C] = 5 ; var(X_A) = 6, var(X_B) = 4, var(X_C) = 5 ; cov(X_B, X_C) = −1, E[X_A X_B] = −4, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.
  [free, sans aide]  E[X]
    = −2 − 2·(3) + 1·(5)
    = −3
  — cov(X_A,X_B)  [juge prob]  départ : cov(X_A,X_B)
    = −4 − (−2)·(3)
    = 2
  — var(X)  [juge prob]  départ : var(X)
    = 6 + (−2)²·4 + 1²·5 + 2·(−2·(2) − 2·1·(−1))
    = 23
  — σ  [juge stat]  départ : σ
    = √23
    = 4,8
  pièges : p_var_sum_cov, p_var_scale, p_var_diff

X et Y sont indépendantes, E[X] = 2, var(X) = 3, E[Y] = 2, var(Y) = 1. Calcule var(XY).
  [free, sans aide]  E[X²]
    = 3 + 2²
    = 7
  — E[Y²]  [juge prob]  départ : E[Y²]
    = 1 + 2²
    = 5
  — var(XY)  [juge prob]  départ : var(XY)
    = 7·5 − (2·2)²
    = 19
  pièges : p_var_xy

```

### Variantes d'examen

```
X et Y sont indépendantes, E[X] = 1, var(X) = 2, E[Y] = 1, var(Y) = 2. Que vaut var(XY) ?
  · 9   ✔ 8   · 4 [p_var_xy]   · 1
  [examen mcq]
  pièges : p_var_xy

Vrai ou faux ?
  « Pour X, Y indépendantes, var(X − Y) = var(X) − var(Y). » → FAUX
    contre-exemple (refute) : u = 1, v = 1
  [examen tf]
  pièges : p_var_diff

X = X_A − X_B − X_C, avec var(X_A) = 8, var(X_B) = 2, var(X_C) = 5, cov(X_A, X_B) = −2, cov(X_B, X_C) = 2, X_A et X_C indépendants. Que vaut var(X) ?
  [free, sans aide, examen coef]  var(X)
    = 23
  pièges : p_var_sum_cov, p_var_scale

```

## Covariance, corrélation ; corrélation et causalité (`p-cov-corr`, BA3)

_Corr(X, Y) = cov(X, Y)/(σ_X σ_Y) ∈ [−1 ; 1]._

### Niveau 1

```
On sait que var X = 1, var Y = 16 et cov(X, Y) = −1. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −2X + 3 et −2Y.
  [guided]  corr(X, Y)
    = (−1)/(□)   (trous : (−1)/(1·4))   ← σ_X = √1 = 1, σ_Y = √16 = 4
    = □   (trous : −0,25)   ← Calculer
  — cov(−2X + 3, −2Y)  [juge prob]  départ : cov(−2X + 3, −2Y)
    = □·(−1)   (trous : (−2)·(−2)·(−1))   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = □   (trous : −4)   ← Calculer
  — corr(−2X + 3, −2Y)  [juge prob]  départ : corr(−2X + 3, −2Y)
    = □   (trous : −0,25)   ← Le signe de a·c = 4 ; la corrélation garde sa taille
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | (-1)/(□×□) | corr(X, Y) = −0,25 ; cov(−2X + 3, −2Y) = −4 ; corr(−2X + 3, −2Y) = −0,25
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 9, var Y = 9 et cov(X, Y) = −1,8. Calcule la corrélation de X et Y, puis la covariance et la corrélation de 3X + 2 et −3Y + 5.
  [guided]  corr(X, Y)
    = (−1,8)/(□)   (trous : (−1,8)/(3·3))   ← σ_X = √9 = 3, σ_Y = √9 = 3
    = □   (trous : −0,2)   ← Calculer
  — cov(3X + 2, −3Y + 5)  [juge prob]  départ : cov(3X + 2, −3Y + 5)
    = □·(−1,8)   (trous : 3·(−3)·(−1,8))   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = □   (trous : 16,2)   ← Calculer
  — corr(3X + 2, −3Y + 5)  [juge prob]  départ : corr(3X + 2, −3Y + 5)
    = □   (trous : 0,2)   ← Le signe de a·c = −9 ; la corrélation garde sa taille
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | (-1,8)/(□×□) | corr(X, Y) = −0,2 ; cov(3X + 2, −3Y + 5) = 16,2 ; corr(3X + 2, −3Y + 5) = 0,2
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 9, var Y = 4 et cov(X, Y) = 4,8. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −X − 2 et −3Y + 1.
  [guided]  corr(X, Y)
    = 4,8/(□)   (trous : 4,8/(3·2))   ← σ_X = √9 = 3, σ_Y = √4 = 2
    = □   (trous : 0,8)   ← Calculer
  — cov(−X − 2, −3Y + 1)  [juge prob]  départ : cov(−X − 2, −3Y + 1)
    = □·4,8   (trous : (−1)·(−3)·4,8)   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = □   (trous : 14,4)   ← Calculer
  — corr(−X − 2, −3Y + 1)  [juge prob]  départ : corr(−X − 2, −3Y + 1)
    = □   (trous : 0,8)   ← Le signe de a·c = 3 ; la corrélation garde sa taille
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | 4,8/(□×□) | corr(X, Y) = 0,8 ; cov(−X − 2, −3Y + 1) = 14,4 ; corr(−X − 2, −3Y + 1) = 0,8
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

```

### Niveau 2

```
On sait que var X = 25, var Y = 4 et E[X] = 5, E[Y] = 4, E[XY] = 28. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −2X + 1 et 2Y + 1.
  [guided]  cov(X, Y)
    = 28 − □   (trous : 28 − 5·4)   ← cov = E[XY] − E[X]E[Y]
    = □   (trous : 8)   ← Calculer
  — corr(X, Y)  [juge prob]  départ : corr(X, Y)
    = 8/(□)   (trous : 8/(5·2))   ← σ_X = √25 = 5, σ_Y = √4 = 2
    = □   (trous : 0,8)   ← Calculer
  — cov(−2X + 1, 2Y + 1)  [juge prob]  départ : cov(−2X + 1,2Y + 1)
    = □·8   (trous : (−2)·2·8)   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = □   (trous : −32)   ← Calculer
  — corr(−2X + 1, 2Y + 1)  [juge prob]  départ : corr(−2X + 1,2Y + 1)
    = □   (trous : −0,8)   ← Le signe de a·c = −4 ; la corrélation garde sa taille
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | 8/(□×□) | corr(X, Y) = 0,8 ; cov(−2X + 1, 2Y + 1) = −32 ; corr(−2X + 1, 2Y + 1) = −0,8
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 9, var Y = 16 et cov(X, Y) = −9. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −2X + 4 et Y − 1.
  [guided]  corr(X, Y)
    = (−9)/(□)   (trous : (−9)/(3·4))   ← σ_X = √9 = 3, σ_Y = √16 = 4
    = □   (trous : −0,75)   ← Calculer
  — cov(−2X + 4, Y − 1)  [juge prob]  départ : cov(−2X + 4, Y − 1)
    = □·(−9)   (trous : (−2)·1·(−9))   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = □   (trous : 18)   ← Calculer
  — corr(−2X + 4, Y − 1)  [juge prob]  départ : corr(−2X + 4, Y − 1)
    = □   (trous : 0,75)   ← Le signe de a·c = −2 ; la corrélation garde sa taille
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | (-9)/(□×□) | corr(X, Y) = −0,75 ; cov(−2X + 4, Y − 1) = 18 ; corr(−2X + 4, Y − 1) = 0,75
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 4, var Y = 1 et cov(X, Y) = 1,2. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −3X + 1 et 2Y − 3.
  [guided]  corr(X, Y)
    = 1,2/(□)   (trous : 1,2/(2·1))   ← σ_X = √4 = 2, σ_Y = √1 = 1
    = □   (trous : 0,6)   ← Calculer
  — cov(−3X + 1, 2Y − 3)  [juge prob]  départ : cov(−3X + 1,2Y − 3)
    = □·1,2   (trous : (−3)·2·1,2)   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = □   (trous : −7,2)   ← Calculer
  — corr(−3X + 1, 2Y − 3)  [juge prob]  départ : corr(−3X + 1,2Y − 3)
    = □   (trous : −0,6)   ← Le signe de a·c = −6 ; la corrélation garde sa taille
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | 1,2/(□×□) | corr(X, Y) = 0,6 ; cov(−3X + 1, 2Y − 3) = −7,2 ; corr(−3X + 1, 2Y − 3) = −0,6
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

```

### Niveau 3

```
On sait que var X = 9, var Y = 1 et E[X] = −2, E[Y] = 2, E[XY] = −6,4. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −2X − 2 et Y − 4.
  [tap, suivre l'erreur, menu menu]  cov(X, Y)
    = −6,4 − (−2)·2   ← cov = E[XY] − E[X]E[Y]
    = −2,4   ← Calculer
  — corr(X, Y)  [juge prob]  départ : corr(X, Y)
    = (−2,4)/(3·1)   ← σ_X = √9 = 3, σ_Y = √1 = 1
    = −0,8   ← Calculer
  — cov(−2X − 2, Y − 4)  [juge prob]  départ : cov(−2X − 2, Y − 4)
    = (−2)·1·(−2,4)   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = 4,8   ← Calculer
  — corr(−2X − 2, Y − 4)  [juge prob]  départ : corr(−2X − 2, Y − 4)
    = 0,8   ← Le signe de a·c = −2 ; la corrélation garde sa taille
  — cov(X + Y, X − Y)  [juge prob]  départ : cov(X + Y, X − Y)
    = 9 − 1   ← Les termes cov(X, Y) s'annulent
    = 8   ← Calculer
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | (-2,4)/(□×□) | corr(X, Y) = −0,8 ; cov(−2X − 2, Y − 4) = 4,8 ; corr(−2X − 2, Y − 4) = 0,8
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 1, var Y = 9 et E[X] = −1, E[Y] = 0, E[XY] = 1,5. Calcule la corrélation de X et Y, puis la covariance et la corrélation de X − 4 et 3Y − 2.
  [tap, suivre l'erreur, menu menu]  cov(X, Y)
    = 1,5 − (−1)·0   ← cov = E[XY] − E[X]E[Y]
    = 1,5   ← Calculer
  — corr(X, Y)  [juge prob]  départ : corr(X, Y)
    = 1,5/(1·3)   ← σ_X = √1 = 1, σ_Y = √9 = 3
    = 0,5   ← Calculer
  — cov(X − 4, 3Y − 2)  [juge prob]  départ : cov(X − 4,3Y − 2)
    = 1·3·1,5   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = 4,5   ← Calculer
  — corr(X − 4, 3Y − 2)  [juge prob]  départ : corr(X − 4,3Y − 2)
    = 0,5   ← Le signe de a·c = 3 ; la corrélation garde sa taille
  — cov(X + Y, X − Y)  [juge prob]  départ : cov(X + Y, X − Y)
    = 1 − 9   ← Les termes cov(X, Y) s'annulent
    = −8   ← Calculer
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | 1,5/(□×□) | corr(X, Y) = 0,5 ; cov(X − 4, 3Y − 2) = 4,5 ; corr(X − 4, 3Y − 2) = 0,5
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 9, var Y = 4 et cov(X, Y) = 3,6. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −X et 2Y − 4.
  [tap, suivre l'erreur, menu menu]  corr(X, Y)
    = 3,6/(3·2)   ← σ_X = √9 = 3, σ_Y = √4 = 2
    = 0,6   ← Calculer
  — cov(−X, 2Y − 4)  [juge prob]  départ : cov(−X, 2Y − 4)
    = (−1)·2·3,6   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = −7,2   ← Calculer
  — corr(−X, 2Y − 4)  [juge prob]  départ : corr(−X, 2Y − 4)
    = −0,6   ← Le signe de a·c = −2 ; la corrélation garde sa taille
  — cov(X + Y, X − Y)  [juge prob]  départ : cov(X + Y, X − Y)
    = 9 − 4   ← Les termes cov(X, Y) s'annulent
    = 5   ← Calculer
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | 3,6/(□×□) | corr(X, Y) = 0,6 ; cov(−X, 2Y − 4) = −7,2 ; corr(−X, 2Y − 4) = −0,6
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

```

### Niveau 4

```
On sait que var X = 16, var Y = 1 et E[X] = 1, E[Y] = −1, E[XY] = 2,2. Calcule la corrélation de X et Y, puis la covariance et la corrélation de 2X + 1 et −3Y + 5.
  [free, suivre l'erreur]  cov(X, Y)
    = 2,2 − 1·(−1)   ← cov = E[XY] − E[X]E[Y]
    = 3,2   ← Calculer
  — corr(X, Y)  [juge prob]  départ : corr(X, Y)
    = 3,2/(4·1)   ← σ_X = √16 = 4, σ_Y = √1 = 1
    = 0,8   ← Calculer
  — cov(2X + 1, −3Y + 5)  [juge prob]  départ : cov(2X + 1, −3Y + 5)
    = 2·(−3)·3,2   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = −19,2   ← Calculer
  — corr(2X + 1, −3Y + 5)  [juge prob]  départ : corr(2X + 1, −3Y + 5)
    = −0,8   ← Le signe de a·c = −6 ; la corrélation garde sa taille
  — cov(X + Y, X − Y)  [juge prob]  départ : cov(X + Y, X − Y)
    = 16 − 1   ← Les termes cov(X, Y) s'annulent
    = 15   ← Calculer
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | 3,2/(□×□) | corr(X, Y) = 0,8 ; cov(2X + 1, −3Y + 5) = −19,2 ; corr(2X + 1, −3Y + 5) = −0,8
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 4, var Y = 16 et E[X] = 0, E[Y] = 0, E[XY] = 1,6. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −2X et 3Y.
  [free, suivre l'erreur]  cov(X, Y)
    = 1,6 − 0·0   ← cov = E[XY] − E[X]E[Y]
    = 1,6   ← Calculer
  — corr(X, Y)  [juge prob]  départ : corr(X, Y)
    = 1,6/(2·4)   ← σ_X = √4 = 2, σ_Y = √16 = 4
    = 0,2   ← Calculer
  — cov(−2X, 3Y)  [juge prob]  départ : cov(−2X, 3Y)
    = (−2)·3·1,6   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = −9,6   ← Calculer
  — corr(−2X, 3Y)  [juge prob]  départ : corr(−2X, 3Y)
    = −0,2   ← Le signe de a·c = −6 ; la corrélation garde sa taille
  — cov(X + Y, X − Y)  [juge prob]  départ : cov(X + Y, X − Y)
    = 4 − 16   ← Les termes cov(X, Y) s'annulent
    = −12   ← Calculer
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | 1,6/(□×□) | corr(X, Y) = 0,2 ; cov(−2X, 3Y) = −9,6 ; corr(−2X, 3Y) = −0,2
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 1, var Y = 4 et E[X] = 1, E[Y] = 0, E[XY] = 0,8. Calcule la corrélation de X et Y, puis la covariance et la corrélation de X + 1 et 2Y + 5.
  [free, suivre l'erreur]  cov(X, Y)
    = 0,8 − 1·0   ← cov = E[XY] − E[X]E[Y]
    = 0,8   ← Calculer
  — corr(X, Y)  [juge prob]  départ : corr(X, Y)
    = 0,8/(1·2)   ← σ_X = √1 = 1, σ_Y = √4 = 2
    = 0,4   ← Calculer
  — cov(X + 1, 2Y + 5)  [juge prob]  départ : cov(X + 1,2Y + 5)
    = 1·2·0,8   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = 1,6   ← Calculer
  — corr(X + 1, 2Y + 5)  [juge prob]  départ : corr(X + 1,2Y + 5)
    = 0,4   ← Le signe de a·c = 2 ; la corrélation garde sa taille
  — cov(X + Y, X − Y)  [juge prob]  départ : cov(X + Y, X − Y)
    = 1 − 4   ← Les termes cov(X, Y) s'annulent
    = −3   ← Calculer
  aides : corr = cov divisée par le produit des écarts-types ; une constante ajoutée ne change rien, un facteur sort de la covariance. | 0,8/(□×□) | corr(X, Y) = 0,4 ; cov(X + 1, 2Y + 5) = 1,6 ; corr(X + 1, 2Y + 5) = 0,4
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

```

### Niveau 5

```
On sait que var X = 1, var Y = 4 et cov(X, Y) = 0,4. Calcule la corrélation de X et Y, puis la covariance et la corrélation de 3X − 5 et −2Y − 5.
  [free, sans aide]  corr(X, Y)
    = 0,4/(1·2)   ← σ_X = √1 = 1, σ_Y = √4 = 2
    = 0,2   ← Calculer
  — cov(3X − 5, −2Y − 5)  [juge prob]  départ : cov(3X − 5, −2Y − 5)
    = 3·(−2)·0,4   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = −2,4   ← Calculer
  — corr(3X − 5, −2Y − 5)  [juge prob]  départ : corr(3X − 5, −2Y − 5)
    = −0,2   ← Le signe de a·c = −6 ; la corrélation garde sa taille
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 4, var Y = 4 et E[X] = 5, E[Y] = −2, E[XY] = −9,2. Calcule la corrélation de X et Y, puis la covariance et la corrélation de 2X − 2 et −2Y + 3.
  [free, sans aide]  cov(X, Y)
    = −9,2 − 5·(−2)   ← cov = E[XY] − E[X]E[Y]
    = 0,8   ← Calculer
  — corr(X, Y)  [juge prob]  départ : corr(X, Y)
    = 0,8/(2·2)   ← σ_X = √4 = 2, σ_Y = √4 = 2
    = 0,2   ← Calculer
  — cov(2X − 2, −2Y + 3)  [juge prob]  départ : cov(2X − 2, −2Y + 3)
    = 2·(−2)·0,8   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = −3,2   ← Calculer
  — corr(2X − 2, −2Y + 3)  [juge prob]  départ : corr(2X − 2, −2Y + 3)
    = −0,2   ← Le signe de a·c = −4 ; la corrélation garde sa taille
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

On sait que var X = 16, var Y = 9 et E[X] = 1, E[Y] = 2, E[XY] = 11. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −X − 2 et 3Y − 5.
  [free, sans aide]  cov(X, Y)
    = 11 − 1·2   ← cov = E[XY] − E[X]E[Y]
    = 9   ← Calculer
  — corr(X, Y)  [juge prob]  départ : corr(X, Y)
    = 9/(4·3)   ← σ_X = √16 = 4, σ_Y = √9 = 3
    = 0,75   ← Calculer
  — cov(−X − 2, 3Y − 5)  [juge prob]  départ : cov(−X − 2,3Y − 5)
    = (−1)·3·9   ← cov(aX + b, cY + d) = ac·cov(X, Y)
    = −27   ← Calculer
  — corr(−X − 2, 3Y − 5)  [juge prob]  départ : corr(−X − 2,3Y − 5)
    = −0,75   ← Le signe de a·c = −3 ; la corrélation garde sa taille
  pièges : p_corr_scale, p_corr_causal, p_corr_slope, p_r2_r

```

### Variantes d'examen

```
var X = 4, var Y = 9, cov(X, Y) = −1,5. Que vaut corr(2X + 3, 3Y − 2) ?
  · 0,25   · −1,5 [p_corr_scale]   ✔ −0,25   · −9 [p_corr_scale]
  [examen mcq]
  pièges : p_corr_scale

Vrai ou faux ?
  « Si var X = 25 et var Y = 1, alors cov(X + Y, X − Y) = 24. » → VRAI
  [examen tf]

On sait que var X = 25, var Y = 25 et E[X] = 2, E[Y] = −1, E[XY] = 13. Calcule la corrélation de X et Y, puis la covariance et la corrélation de −X et Y.
  [free, sans aide, examen coef]  cov(X + Y, X − Y)
    = 25 − 25   ← Les termes cov(X, Y) s'annulent
    = 0   ← Calculer

```

## Espérance et variance totales (`p-total-expect`, BA3)

_E[X] = E[E[X | Y]] = Σ_y E[X | Y = y]·Pr(Y = y)._

### Niveau 1

```
À un oral, Anne interroge avec la probabilité 0,6, Bruno sinon. Avec Anne, chacune des 8 questions est réussie avec la probabilité 0,6 ; avec Bruno, 0,7, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [guided]  E[N | Anne]
    (Quelle est la loi de N quand Anne interroge ? N | Anne ~ B(8 ; 0,6).)
    = 8·□   (trous : 8·0,6)   ← N | Anne ~ B(8 ; 0,6) : E = np
    = □   (trous : 4,8)   ← Calculer
  — E[N | Bruno]  [juge prob]  départ : E[N | Bruno]
    = 8·□   (trous : 8·0,7)   ← N | Bruno ~ B(8 ; 0,7)
    = □   (trous : 5,6)   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = □·4,8 + □·5,6   (trous : 0,6·4,8 + 0,4·5,6)   ← E[N] = Σ E[N | y]·Pr(y)
    = □   (trous : 5,12)   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,6·8·0,6·□ + 0,4·8·0,7·□   (trous : 0,6·8·0,6·0,4 + 0,4·8·0,7·0,3)   ← var(N | y) = np(1 − p), pondérée
    = □   (trous : 1,824)   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,6·0,4·□   (trous : 0,6·0,4·(5,6 − 4,8)²)   ← Deux valeurs : π(1 − π)·(écart)²
    = □   (trous : 0,1536)   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 1,824 + □   (trous : 1,824 + 0,1536)   ← var = E[var(N | ·)] + var(E[N | ·])
    = □   (trous : 1,9776)   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,6×4,8+0,4×□ | E[N] = 5,12 ; var(N) = 1,824 + 0,1536 = 1,9776
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Léa interroge avec la probabilité 0,2, Marc sinon. Avec Léa, chacune des 3 questions est réussie avec la probabilité 0,4 ; avec Marc, 0,3, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [guided]  E[N | Léa]
    (Quelle est la loi de N quand Léa interroge ? N | Léa ~ B(3 ; 0,4).)
    = 3·□   (trous : 3·0,4)   ← N | Léa ~ B(3 ; 0,4) : E = np
    = □   (trous : 1,2)   ← Calculer
  — E[N | Marc]  [juge prob]  départ : E[N | Marc]
    = 3·□   (trous : 3·0,3)   ← N | Marc ~ B(3 ; 0,3)
    = □   (trous : 0,9)   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = □·1,2 + □·0,9   (trous : 0,2·1,2 + 0,8·0,9)   ← E[N] = Σ E[N | y]·Pr(y)
    = □   (trous : 0,96)   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,2·3·0,4·□ + 0,8·3·0,3·□   (trous : 0,2·3·0,4·0,6 + 0,8·3·0,3·0,7)   ← var(N | y) = np(1 − p), pondérée
    = □   (trous : 0,648)   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,2·0,8·□   (trous : 0,2·0,8·(0,9 − 1,2)²)   ← Deux valeurs : π(1 − π)·(écart)²
    = □   (trous : 0,0144)   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 0,648 + □   (trous : 0,648 + 0,0144)   ← var = E[var(N | ·)] + var(E[N | ·])
    = □   (trous : 0,6624)   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,2×1,2+0,8×□ | E[N] = 0,96 ; var(N) = 0,648 + 0,0144 = 0,6624
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Léa interroge avec la probabilité 0,7, Marc sinon. Avec Léa, chacune des 7 questions est réussie avec la probabilité 0,2 ; avec Marc, 0,5, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [guided]  E[N | Léa]
    (Quelle est la loi de N quand Léa interroge ? N | Léa ~ B(7 ; 0,2).)
    = 7·□   (trous : 7·0,2)   ← N | Léa ~ B(7 ; 0,2) : E = np
    = □   (trous : 1,4)   ← Calculer
  — E[N | Marc]  [juge prob]  départ : E[N | Marc]
    = 7·□   (trous : 7·0,5)   ← N | Marc ~ B(7 ; 0,5)
    = □   (trous : 3,5)   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = □·1,4 + □·3,5   (trous : 0,7·1,4 + 0,3·3,5)   ← E[N] = Σ E[N | y]·Pr(y)
    = □   (trous : 2,03)   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,7·7·0,2·□ + 0,3·7·□·0,5   (trous : 0,7·7·0,2·0,8 + 0,3·7·0,5·0,5)   ← var(N | y) = np(1 − p), pondérée
    = □   (trous : 1,309)   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,7·0,3·□   (trous : 0,7·0,3·(3,5 − 1,4)²)   ← Deux valeurs : π(1 − π)·(écart)²
    = □   (trous : 0,9261)   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 1,309 + □   (trous : 1,309 + 0,9261)   ← var = E[var(N | ·)] + var(E[N | ·])
    = □   (trous : 2,2351)   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,7×1,4+0,3×□ | E[N] = 2,03 ; var(N) = 1,309 + 0,9261 = 2,2351
  pièges : p_total_expect_unweighted, p_total_var_forget

```

### Niveau 2

```
À un oral, Anne interroge avec la probabilité 0,5, Bruno sinon. Avec Anne, chacune des 9 questions est réussie avec la probabilité 0,3 ; avec Bruno, 0,9, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [guided]  E[N | Anne]
    ? Quelle est la loi de N quand Anne interroge ? ✔ N | Anne ~ B(9 ; 0,3) / · N | Anne ~ B(9 ; 0,15)
    = 9·□   (trous : 9·0,3)   ← N | Anne ~ B(9 ; 0,3) : E = np
    = □   (trous : 2,7)   ← Calculer
  — E[N | Bruno]  [juge prob]  départ : E[N | Bruno]
    = 9·□   (trous : 9·0,9)   ← N | Bruno ~ B(9 ; 0,9)
    = □   (trous : 8,1)   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = □·2,7 + □·8,1   (trous : 0,5·2,7 + 0,5·8,1)   ← E[N] = Σ E[N | y]·Pr(y)
    = □   (trous : 5,4)   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,5·9·0,3·□ + 0,5·9·0,9·□   (trous : 0,5·9·0,3·0,7 + 0,5·9·0,9·0,1)   ← var(N | y) = np(1 − p), pondérée
    = □   (trous : 1,35)   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,5·0,5·□   (trous : 0,5·0,5·(8,1 − 2,7)²)   ← Deux valeurs : π(1 − π)·(écart)²
    = □   (trous : 7,29)   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 1,35 + □   (trous : 1,35 + 7,29)   ← var = E[var(N | ·)] + var(E[N | ·])
    = □   (trous : 8,64)   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,5×2,7+0,5×□ | E[N] = 5,4 ; var(N) = 1,35 + 7,29 = 8,64
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Mary interroge avec la probabilité 0,8, Frank sinon. Avec Mary, chacune des 9 questions est réussie avec la probabilité 0,6 ; avec Frank, 0,2, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [guided]  E[N | Mary]
    ? Quelle est la loi de N quand Mary interroge ? ✔ N | Mary ~ B(9 ; 0,6) / · N | Mary ~ B(9 ; 0,48)
    = 9·□   (trous : 9·0,6)   ← N | Mary ~ B(9 ; 0,6) : E = np
    = □   (trous : 5,4)   ← Calculer
  — E[N | Frank]  [juge prob]  départ : E[N | Frank]
    = 9·□   (trous : 9·0,2)   ← N | Frank ~ B(9 ; 0,2)
    = □   (trous : 1,8)   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = □·5,4 + □·1,8   (trous : 0,8·5,4 + 0,2·1,8)   ← E[N] = Σ E[N | y]·Pr(y)
    = □   (trous : 4,68)   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,8·9·0,6·□ + 0,2·9·0,2·□   (trous : 0,8·9·0,6·0,4 + 0,2·9·0,2·0,8)   ← var(N | y) = np(1 − p), pondérée
    = □   (trous : 2,016)   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,8·0,2·□   (trous : 0,8·0,2·(1,8 − 5,4)²)   ← Deux valeurs : π(1 − π)·(écart)²
    = □   (trous : 2,0736)   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 2,016 + □   (trous : 2,016 + 2,0736)   ← var = E[var(N | ·)] + var(E[N | ·])
    = □   (trous : 4,0896)   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,8×5,4+0,2×□ | E[N] = 4,68 ; var(N) = 2,016 + 2,0736 = 4,0896
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Anne interroge avec la probabilité 0,8, Bruno sinon. Avec Anne, chacune des 7 questions est réussie avec la probabilité 0,2 ; avec Bruno, 0,4, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [guided]  E[N | Anne]
    ? Quelle est la loi de N quand Anne interroge ? ✔ N | Anne ~ B(7 ; 0,2) / · N | Anne ~ B(7 ; 0,16)
    = 7·□   (trous : 7·0,2)   ← N | Anne ~ B(7 ; 0,2) : E = np
    = □   (trous : 1,4)   ← Calculer
  — E[N | Bruno]  [juge prob]  départ : E[N | Bruno]
    = 7·□   (trous : 7·0,4)   ← N | Bruno ~ B(7 ; 0,4)
    = □   (trous : 2,8)   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = □·1,4 + □·2,8   (trous : 0,8·1,4 + 0,2·2,8)   ← E[N] = Σ E[N | y]·Pr(y)
    = □   (trous : 1,68)   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = □·7·0,2·0,8 + 0,2·7·0,4·□   (trous : 0,8·7·0,2·0,8 + 0,2·7·0,4·0,6)   ← var(N | y) = np(1 − p), pondérée
    = □   (trous : 1,232)   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,8·0,2·□   (trous : 0,8·0,2·(2,8 − 1,4)²)   ← Deux valeurs : π(1 − π)·(écart)²
    = □   (trous : 0,3136)   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 1,232 + □   (trous : 1,232 + 0,3136)   ← var = E[var(N | ·)] + var(E[N | ·])
    = □   (trous : 1,5456)   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,8×1,4+0,2×□ | E[N] = 1,68 ; var(N) = 1,232 + 0,3136 = 1,5456
  pièges : p_total_expect_unweighted, p_total_var_forget

```

### Niveau 3

```
À un oral, Mary interroge avec la probabilité 0,5, Frank sinon. Avec Mary, chacune des 8 questions est réussie avec la probabilité 0,3 ; avec Frank, 0,2, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [tap, suivre l'erreur, menu menu]  E[N | Mary]
    ? Quelle est la loi de N quand Mary interroge ? ✔ N | Mary ~ B(8 ; 0,3) / · N | Mary ~ B(8 ; 0,15)
    = 8·0,3   ← N | Mary ~ B(8 ; 0,3) : E = np
    = 2,4   ← Calculer
  — E[N | Frank]  [juge prob]  départ : E[N | Frank]
    = 8·0,2   ← N | Frank ~ B(8 ; 0,2)
    = 1,6   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,5·2,4 + 0,5·1,6   ← E[N] = Σ E[N | y]·Pr(y)
    = 2   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,5·8·0,3·0,7 + 0,5·8·0,2·0,8   ← var(N | y) = np(1 − p), pondérée
    = 1,48   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,5·0,5·(1,6 − 2,4)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 0,16   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 1,48 + 0,16   ← var = E[var(N | ·)] + var(E[N | ·])
    = 1,64   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,5×2,4+0,5×□ | E[N] = 2 ; var(N) = 1,48 + 0,16 = 1,64
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Léa interroge avec la probabilité 0,2, Marc sinon. Avec Léa, chacune des 3 questions est réussie avec la probabilité 0,5 ; avec Marc, 0,3, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [tap, suivre l'erreur, menu menu]  E[N | Léa]
    ? Quelle est la loi de N quand Léa interroge ? ✔ N | Léa ~ B(3 ; 0,5) / · N | Léa ~ B(3 ; 0,1)
    = 3·0,5   ← N | Léa ~ B(3 ; 0,5) : E = np
    = 1,5   ← Calculer
  — E[N | Marc]  [juge prob]  départ : E[N | Marc]
    = 3·0,3   ← N | Marc ~ B(3 ; 0,3)
    = 0,9   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,2·1,5 + 0,8·0,9   ← E[N] = Σ E[N | y]·Pr(y)
    = 1,02   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,2·3·0,5·0,5 + 0,8·3·0,3·0,7   ← var(N | y) = np(1 − p), pondérée
    = 0,654   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,2·0,8·(0,9 − 1,5)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 0,0576   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 0,654 + 0,0576   ← var = E[var(N | ·)] + var(E[N | ·])
    = 0,7116   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,2×1,5+0,8×□ | E[N] = 1,02 ; var(N) = 0,654 + 0,0576 = 0,7116
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Mary interroge avec la probabilité 0,8, Frank sinon. Avec Mary, chacune des 7 questions est réussie avec la probabilité 0,6 ; avec Frank, 0,4, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [tap, suivre l'erreur, menu menu]  E[N | Mary]
    ? Quelle est la loi de N quand Mary interroge ? ✔ N | Mary ~ B(7 ; 0,6) / · N | Mary ~ B(7 ; 0,48)
    = 7·0,6   ← N | Mary ~ B(7 ; 0,6) : E = np
    = 4,2   ← Calculer
  — E[N | Frank]  [juge prob]  départ : E[N | Frank]
    = 7·0,4   ← N | Frank ~ B(7 ; 0,4)
    = 2,8   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,8·4,2 + 0,2·2,8   ← E[N] = Σ E[N | y]·Pr(y)
    = 3,92   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,8·7·0,6·0,4 + 0,2·7·0,4·0,6   ← var(N | y) = np(1 − p), pondérée
    = 1,68   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,8·0,2·(2,8 − 4,2)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 0,3136   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 1,68 + 0,3136   ← var = E[var(N | ·)] + var(E[N | ·])
    = 1,9936   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,8×4,2+0,2×□ | E[N] = 3,92 ; var(N) = 1,68 + 0,3136 = 1,9936
  pièges : p_total_expect_unweighted, p_total_var_forget

```

### Niveau 4

```
À un oral, Léa interroge avec la probabilité 0,3, Marc sinon. Avec Léa, chacune des 6 questions est réussie avec la probabilité 0,2 ; avec Marc, 0,9, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [free, suivre l'erreur]  E[N | Léa]
    = 6·0,2   ← N | Léa ~ B(6 ; 0,2) : E = np
    = 1,2   ← Calculer
  — E[N | Marc]  [juge prob]  départ : E[N | Marc]
    = 6·0,9   ← N | Marc ~ B(6 ; 0,9)
    = 5,4   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,3·1,2 + 0,7·5,4   ← E[N] = Σ E[N | y]·Pr(y)
    = 4,14   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,3·6·0,2·0,8 + 0,7·6·0,9·0,1   ← var(N | y) = np(1 − p), pondérée
    = 0,666   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,3·0,7·(5,4 − 1,2)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 3,7044   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 0,666 + 3,7044   ← var = E[var(N | ·)] + var(E[N | ·])
    = 4,3704   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,3×1,2+0,7×□ | E[N] = 4,14 ; var(N) = 0,666 + 3,7044 = 4,3704
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Mary interroge avec la probabilité 0,5, Frank sinon. Avec Mary, chacune des 3 questions est réussie avec la probabilité 0,3 ; avec Frank, 0,2, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [free, suivre l'erreur]  E[N | Mary]
    = 3·0,3   ← N | Mary ~ B(3 ; 0,3) : E = np
    = 0,9   ← Calculer
  — E[N | Frank]  [juge prob]  départ : E[N | Frank]
    = 3·0,2   ← N | Frank ~ B(3 ; 0,2)
    = 0,6   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,5·0,9 + 0,5·0,6   ← E[N] = Σ E[N | y]·Pr(y)
    = 0,75   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,5·3·0,3·0,7 + 0,5·3·0,2·0,8   ← var(N | y) = np(1 − p), pondérée
    = 0,555   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,5·0,5·(0,6 − 0,9)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 0,0225   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 0,555 + 0,0225   ← var = E[var(N | ·)] + var(E[N | ·])
    = 0,5775   ← Variance totale
  aides : Calcule tout sachant l'examinateur, puis pondère par ses probabilités ; var(N) = E[var(N | ·)] + var(E[N | ·]). | 0,5×0,9+0,5×□ | E[N] = 0,75 ; var(N) = 0,555 + 0,0225 = 0,5775
  pièges : p_total_expect_unweighted, p_total_var_forget

Le retard R de Jo (en heures) suit U(0, 3). Sachant R, le retard X du bus suit U(0, R). Calcule E[X] et var(X) par les formules totales.
  [free, suivre l'erreur]  E[X]
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
  aides : Conditionne par R : E[X | R] = R/2 et var(X | R) = R²/12 ; puis prends l'espérance et la variance en R. | 0,25+□ | var(X) = 0,4375
  pièges : p_total_var_forget

```

### Niveau 5

```
À un oral, Anne interroge avec la probabilité 0,2, Bruno sinon. Avec Anne, chacune des 3 questions est réussie avec la probabilité 0,6 ; avec Bruno, 0,8, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [free, sans aide]  E[N | Anne]
    = 3·0,6   ← N | Anne ~ B(3 ; 0,6) : E = np
    = 1,8   ← Calculer
  — E[N | Bruno]  [juge prob]  départ : E[N | Bruno]
    = 3·0,8   ← N | Bruno ~ B(3 ; 0,8)
    = 2,4   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,2·1,8 + 0,8·2,4   ← E[N] = Σ E[N | y]·Pr(y)
    = 2,28   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,2·3·0,6·0,4 + 0,8·3·0,8·0,2   ← var(N | y) = np(1 − p), pondérée
    = 0,528   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,2·0,8·(2,4 − 1,8)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 0,0576   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 0,528 + 0,0576   ← var = E[var(N | ·)] + var(E[N | ·])
    = 0,5856   ← Variance totale
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Léa interroge avec la probabilité 0,7, Marc sinon. Avec Léa, chacune des 3 questions est réussie avec la probabilité 0,6 ; avec Marc, 0,1, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [free, sans aide]  E[N | Léa]
    = 3·0,6   ← N | Léa ~ B(3 ; 0,6) : E = np
    = 1,8   ← Calculer
  — E[N | Marc]  [juge prob]  départ : E[N | Marc]
    = 3·0,1   ← N | Marc ~ B(3 ; 0,1)
    = 0,3   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,7·1,8 + 0,3·0,3   ← E[N] = Σ E[N | y]·Pr(y)
    = 1,35   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,7·3·0,6·0,4 + 0,3·3·0,1·0,9   ← var(N | y) = np(1 − p), pondérée
    = 0,585   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,7·0,3·(0,3 − 1,8)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 0,4725   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 0,585 + 0,4725   ← var = E[var(N | ·)] + var(E[N | ·])
    = 1,0575   ← Variance totale
  pièges : p_total_expect_unweighted, p_total_var_forget

À un oral, Mary interroge avec la probabilité 0,6, Frank sinon. Avec Mary, chacune des 8 questions est réussie avec la probabilité 0,8 ; avec Frank, 0,4, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [free, sans aide]  E[N | Mary]
    = 8·0,8   ← N | Mary ~ B(8 ; 0,8) : E = np
    = 6,4   ← Calculer
  — E[N | Frank]  [juge prob]  départ : E[N | Frank]
    = 8·0,4   ← N | Frank ~ B(8 ; 0,4)
    = 3,2   ← Calculer
  — E[N]  [juge prob]  départ : E[N]
    = 0,6·6,4 + 0,4·3,2   ← E[N] = Σ E[N | y]·Pr(y)
    = 5,12   ← Espérance totale
  — E[var(N | ·)]  [juge prob]  départ : E[var(N | ·)]
    = 0,6·8·0,8·0,2 + 0,4·8·0,4·0,6   ← var(N | y) = np(1 − p), pondérée
    = 1,536   ← Moyenne des variances
  — var(E[N | ·])  [juge prob]  départ : var(E[N | ·])
    = 0,6·0,4·(3,2 − 6,4)²   ← Deux valeurs : π(1 − π)·(écart)²
    = 2,4576   ← Variance des moyennes
  — var(N)  [juge prob]  départ : var(N)
    = 1,536 + 2,4576   ← var = E[var(N | ·)] + var(E[N | ·])
    = 3,9936   ← Variance totale
  pièges : p_total_expect_unweighted, p_total_var_forget

```

### Variantes d'examen

```
Mary interroge avec la probabilité 0,6, Frank sinon. Avec Mary, chacune des 6 questions est réussie avec la probabilité 0,7 ; avec Frank, 0,5, indépendamment. N = nombre de bonnes réponses. var(N) = ?
  ✔ 1,7016   · 1,356 [p_total_var_forget]   · 0,3456   · 1,38 [p_total_expect_unweighted]
  [examen mcq]
  pièges : p_total_var_forget, p_total_expect_unweighted

Vrai ou faux ?
  « Si Y prend deux valeurs a et b, alors E[X] = (E[X | Y = a] + E[X | Y = b])/2. » → FAUX
    contre-exemple (refute) : p = 0,8, u = 1, w = 2
  [examen tf]
  pièges : p_total_expect_unweighted

À un oral, Anne interroge avec la probabilité 0,6, Bruno sinon. Avec Anne, chacune des 10 questions est réussie avec la probabilité 0,7 ; avec Bruno, 0,9, indépendamment. N est le nombre de bonnes réponses. Calcule E[N] et var(N).
  [free, sans aide, examen coef]  var(N)
    = 1,62 + 0,96   ← var = E[var(N | ·)] + var(E[N | ·])
    = 2,58   ← Variance totale
  pièges : p_total_var_forget

Le retard R de Jo (en heures) suit U(0, 12). Sachant R, le retard X du bus suit U(0, R). Calcule E[X] et var(X) par les formules totales.
  [problème, examen open, 10 points]
  partie 1 (Début du problème : 2,5 ; E[var(X | R)] : 2,5 ; var(E[X | R]) : 2,5 ; var(X) : 2,5)
  Le retard R de Jo (en heures) suit U(0, 12). Sachant R, le retard X du bus suit U(0, R). Calcule E[X] et var(X) par les formules totales.
    [free, sans aide, suivre l'erreur, examen open]  E[X]
      = (12/2)/2   ← E[X | R] = R/2, et E[R] = a/2
      = 3   ← Espérance totale
    — E[var(X | R)]  [juge prob]  départ : E[var(X | R)]
      = (144/3)/12   ← E[R²/12] = E[R²]/12
      = 4   ← Moyenne des variances
    — var(E[X | R])  [juge prob]  départ : var(E[X | R])
      = (144/12)/4   ← var(R) = a²/12
      = 3   ← Variance des moyennes
    — var(X)  [juge prob]  départ : var(X)
      = 4 + 3   ← Variance totale
      = 7   ← Calculer
  pièges : p_total_var_forget

```

## Densité d'une somme ; mélange de gaussiennes (`p-sum-mixture`, BA4)

_X, Y indépendantes, Z = X + Y : p_Z(z) = Σ_y p_X(z − y)p_Y(y) (discret), f_Z(z) = ∫ f_X(z − y)f_Y(y) dy (continu), bornes tirées des…_

### Niveau 1

```
On lance deux dés équilibrés à 4 faces, indépendants ; S est la somme. Calcule Pr(S = 6) par la convolution p_S(6) = Σ p(i)·p(6 − i).
  [guided]  nombredecouples
    (Couples : (2, 4), (3, 3), (4, 2).)
    = □ + 1 + 1   (trous : 1 + 1 + 1)   ← Un terme 1/f² par couple possible
    = □   (trous : 3)   ← Compter
  — Pr(S=6)  [juge prob]  départ : Pr(S = 6)
    = 3/□   (trous : 3/16)   ← 4² = 16 couples équiprobables
  aides : p_S(z) = Σᵢ p(i)·p(z − i) : un terme par couple (i, z − i) possible. | □/16 | Pr(S = 6) = 0,1875
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
On lance deux dés équilibrés à 6 faces, indépendants ; S est la somme. Calcule Pr(S = 10) par la convolution p_S(10) = Σ p(i)·p(10 − i).
  [guided]  nombredecouples
    (Couples : (4, 6), (5, 5), (6, 4).)
    = □ + 1 + 1   (trous : 1 + 1 + 1)   ← Un terme 1/f² par couple possible
    = □   (trous : 3)   ← Compter
  — Pr(S=10)  [juge prob]  départ : Pr(S = 10)
    = 3/□   (trous : 3/36)   ← 6² = 36 couples équiprobables
    = 1/12   ← Simplifier
  aides : p_S(z) = Σᵢ p(i)·p(z − i) : un terme par couple (i, z − i) possible. | □/36 | Pr(S = 10) = 1/12
  pièges : g7_laplace_not_equiprobable

On lance deux dés équilibrés à 6 faces, indépendants ; S est la somme. Calcule Pr(S = 4) par la convolution p_S(4) = Σ p(i)·p(4 − i).
  [guided]  nombredecouples
    (Couples : (1, 3), (2, 2), (3, 1).)
    = □ + 1 + 1   (trous : 1 + 1 + 1)   ← Un terme 1/f² par couple possible
    = □   (trous : 3)   ← Compter
  — Pr(S=4)  [juge prob]  départ : Pr(S = 4)
    = 3/□   (trous : 3/36)   ← 6² = 36 couples équiprobables
    = 1/12   ← Simplifier
  aides : p_S(z) = Σᵢ p(i)·p(z − i) : un terme par couple (i, z − i) possible. | □/36 | Pr(S = 4) = 1/12
  pièges : g7_laplace_not_equiprobable

On lance deux dés équilibrés à 6 faces, indépendants ; S est la somme. Calcule Pr(S = 8) par la convolution p_S(8) = Σ p(i)·p(8 − i).
  [guided]  nombredecouples
    (Couples : (2, 6), (3, 5), (4, 4), (5, 3), (6, 2).)
    = □ + 1 + 1 + 1 + 1   (trous : 1 + 1 + 1 + 1 + 1)   ← Un terme 1/f² par couple possible
    = □   (trous : 5)   ← Compter
  — Pr(S=8)  [juge prob]  départ : Pr(S = 8)
    = 5/□   (trous : 5/36)   ← 6² = 36 couples équiprobables
  aides : p_S(z) = Σᵢ p(i)·p(z − i) : un terme par couple (i, z − i) possible. | □/36 | Pr(S = 8) = 5/36
  pièges : g7_laplace_not_equiprobable

```

### Niveau 3

```
X et Y sont indépendantes, de loi U(0, 1). Calcule la densité de Z = X + Y en z = 1,4 : f_Z(z) = ∫ f_X(z − y)·f_Y(y) dy.
  [tap, suivre l'erreur, menu menu]  f_Z(1,4)
    ? Pour z = 1,4, sur quel intervalle y doit-il varier ? ✔ y ∈ [0,4 ; 1] : il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 / · y ∈ [0 ; 1], comme f_Y / · Pas d'intégrale : f_Z = f_X + f_Y
    = 1 − 0,4   ← ∫ de 0,4 à 1 de 1 dy
    = 0,6   ← Densité en triangle
  aides : Il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 : y va de max(0, z − 1) à min(1, z). | 1-□ | f_Z(1,4) = 0,6
  pièges : p_conv_bounds, p_sum_density_add

X et Y sont indépendantes, de loi U(0, 1). Calcule la densité de Z = X + Y en z = 1,5 : f_Z(z) = ∫ f_X(z − y)·f_Y(y) dy.
  [tap, suivre l'erreur, menu menu]  f_Z(1,5)
    ? Pour z = 1,5, sur quel intervalle y doit-il varier ? ✔ y ∈ [0,5 ; 1] : il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 / · y ∈ [0 ; 1], comme f_Y / · Pas d'intégrale : f_Z = f_X + f_Y
    = 1 − 0,5   ← ∫ de 0,5 à 1 de 1 dy
    = 0,5   ← Densité en triangle
  aides : Il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 : y va de max(0, z − 1) à min(1, z). | 1-□ | f_Z(1,5) = 0,5
  pièges : p_conv_bounds, p_sum_density_add

X et Y sont indépendantes, de loi U(0, 1). Calcule la densité de Z = X + Y en z = 0,5 : f_Z(z) = ∫ f_X(z − y)·f_Y(y) dy.
  [tap, suivre l'erreur, menu menu]  f_Z(0,5)
    ? Pour z = 0,5, sur quel intervalle y doit-il varier ? ✔ y ∈ [0 ; 0,5] : il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 / · y ∈ [0 ; 1], comme f_Y / · Pas d'intégrale : f_Z = f_X + f_Y
    = 0,5 − 0   ← ∫ de 0 à 0,5 de 1 dy
    = 0,5   ← Densité en triangle
  aides : Il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 : y va de max(0, z − 1) à min(1, z). | 0,5-□ | f_Z(0,5) = 0,5
  pièges : p_conv_bounds, p_sum_density_add

```

### Niveau 4

```
X et Y sont indépendantes, de loi U(0, 1). Calcule la densité de Z = X + Y en z = 1,8 : f_Z(z) = ∫ f_X(z − y)·f_Y(y) dy.
  [free, suivre l'erreur]  f_Z(1,8)
    ? Pour z = 1,8, sur quel intervalle y doit-il varier ? ✔ y ∈ [0,8 ; 1] : il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 / · y ∈ [0 ; 1], comme f_Y / · Pas d'intégrale : f_Z = f_X + f_Y
    = 1 − 0,8   ← ∫ de 0,8 à 1 de 1 dy
    = 0,2   ← Densité en triangle
  aides : Il faut 0 ≤ y ≤ 1 et 0 ≤ z − y ≤ 1 : y va de max(0, z − 1) à min(1, z). | 1-□ | f_Z(1,8) = 0,2
  pièges : p_conv_bounds, p_sum_density_add

X et Y sont indépendantes, de loi exp(2). Calcule la densité de Z = X + Y pour z > 0 (convolution).
  [free, suivre l'erreur]  f_Z(z)
    (f_Z(z) = ∫₀ᶻ f_X(z − y)·f_Y(y) dy : f_X(z − y) > 0 demande y  0 demande y > 0. L'intégrande vaut 4e^(−2z) : elle ne dépend plus de y.)
    = 4z·e^(−2z)   ← Z ~ Γ(2, 1/λ)
  aides : f_Z(z) = ∫ f_X(z − y)·f_Y(y) dy, avec 0 < y < z. | L'intégrande ne dépend pas de y : on intègre une constante de 0 à z. | f_Z(z) = 4z×e^(-2z)
  pièges : p_sum_density_add

X est un mélange : avec la probabilité 0,3 on tire X selon N(2, 4), sinon selon N(4, 4). Calcule E[X], E[X²] et var(X), puis la variance de la somme pondérée 0,3X₁ + 0,7X₂ (X₁ ~ N(2, 4), X₂ ~ N(4, 4) indépendantes).
  [free, suivre l'erreur]  E[X]
    = 0,3·2 + 0,7·4   ← E = Σ πₖμₖ
    = 3,4   ← Calculer
  — E[X²]  [juge prob]  départ : E[X²]
    = 0,3·(4 + 2²) + 0,7·(4 + 4²)   ← E[X²] = Σ πₖ(σₖ² + μₖ²)
    = 16,4   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 16,4 − 3,4²   ← var = E[X²] − E[X]²
    = 4,84   ← Variance du mélange
  — var(0,3X₁ + 0,7X₂)  [juge prob]  départ : var(0,3X_1 + 0,7X_2)
    = 0,3²·4 + 0,7²·4   ← Variables indépendantes : les coefficients au carré
    = 2,32   ← Un autre objet que le mélange
  aides : Un mélange choisit une composante : E[X²] = Σ πₖ(σₖ² + μₖ²), puis var = E[X²] − E[X]². | 0,3×(4+2^2)+□ | var(X) = 4,84
  pièges : p_mixture_vs_sum

```

### Niveau 5

```
X est un mélange : avec la probabilité 0,3 on tire X selon N(5, 1), sinon selon N(0, 4). Calcule E[X], E[X²] et var(X), puis la variance de la somme pondérée 0,3X₁ + 0,7X₂ (X₁ ~ N(5, 1), X₂ ~ N(0, 4) indépendantes).
  [free, sans aide]  E[X]
    = 0,3·5 + 0,7·0   ← E = Σ πₖμₖ
    = 1,5   ← Calculer
  — E[X²]  [juge prob]  départ : E[X²]
    = 0,3·(1 + 5²) + 0,7·(4 + 0²)   ← E[X²] = Σ πₖ(σₖ² + μₖ²)
    = 10,6   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 10,6 − 1,5²   ← var = E[X²] − E[X]²
    = 8,35   ← Variance du mélange
  — var(0,3X₁ + 0,7X₂)  [juge prob]  départ : var(0,3X_1 + 0,7X_2)
    ? Lequel des deux a un histogramme à deux bosses (si les moyennes sont loin) ? ✔ Le mélange : il choisit une composante, puis tire autour de sa moyenne / · La somme pondérée
    = 0,3²·1 + 0,7²·4   ← Variables indépendantes : les coefficients au carré
    = 2,05   ← Un autre objet que le mélange
  pièges : p_mixture_vs_sum

X est un mélange : avec la probabilité 0,5 on tire X selon N(2, 1), sinon selon N(6, 4). Calcule E[X], E[X²] et var(X), puis la variance de la somme pondérée 0,5X₁ + 0,5X₂ (X₁ ~ N(2, 1), X₂ ~ N(6, 4) indépendantes).
  [free, sans aide]  E[X]
    = 0,5·2 + 0,5·6   ← E = Σ πₖμₖ
    = 4   ← Calculer
  — E[X²]  [juge prob]  départ : E[X²]
    = 0,5·(1 + 2²) + 0,5·(4 + 6²)   ← E[X²] = Σ πₖ(σₖ² + μₖ²)
    = 22,5   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 22,5 − 4²   ← var = E[X²] − E[X]²
    = 6,5   ← Variance du mélange
  — var(0,5X₁ + 0,5X₂)  [juge prob]  départ : var(0,5X_1 + 0,5X_2)
    ? Lequel des deux a un histogramme à deux bosses (si les moyennes sont loin) ? ✔ Le mélange : il choisit une composante, puis tire autour de sa moyenne / · La somme pondérée
    = 0,5²·1 + 0,5²·4   ← Variables indépendantes : les coefficients au carré
    = 1,25   ← Un autre objet que le mélange
  pièges : p_mixture_vs_sum

X est un mélange : avec la probabilité 0,2 on tire X selon N(−2, 4), sinon selon N(2, 1). Calcule E[X], E[X²] et var(X), puis la variance de la somme pondérée 0,2X₁ + 0,8X₂ (X₁ ~ N(−2, 4), X₂ ~ N(2, 1) indépendantes).
  [free, sans aide]  E[X]
    = 0,2·(−2) + 0,8·2   ← E = Σ πₖμₖ
    = 1,2   ← Calculer
  — E[X²]  [juge prob]  départ : E[X²]
    = 0,2·(4 + (−2)²) + 0,8·(1 + 2²)   ← E[X²] = Σ πₖ(σₖ² + μₖ²)
    = 5,6   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 5,6 − 1,2²   ← var = E[X²] − E[X]²
    = 4,16   ← Variance du mélange
  — var(0,2X₁ + 0,8X₂)  [juge prob]  départ : var(0,2X_1 + 0,8X_2)
    ? Lequel des deux a un histogramme à deux bosses (si les moyennes sont loin) ? ✔ Le mélange : il choisit une composante, puis tire autour de sa moyenne / · La somme pondérée
    = 0,2²·4 + 0,8²·1   ← Variables indépendantes : les coefficients au carré
    = 0,8   ← Un autre objet que le mélange
  pièges : p_mixture_vs_sum

```

### Variantes d'examen

```
X suit le mélange 0,5·N(3, 4) + 0,5·N(2, 4). Que vaut var(X) ?
  · 2 [p_mixture_vs_sum]   · 10,5   ✔ 4,25   · 4
  [examen mcq]
  pièges : p_mixture_vs_sum

Vrai ou faux ?
  « Si X et Y sont indépendantes de loi U(0, 1), la densité de X + Y est f_X + f_Y, qui vaut 2 sur [0 ; 1]. » → FAUX
    contre-exemple (refute) : z = 1/2
  [examen tf]
  pièges : p_sum_density_add

```

## Markov, Tchebychev, loi des grands nombres (`p-markov-cheb`, BA3)

_Markov : si X ≥ 0, Pr(X ≥ a) ≤ E[X]/a._

### Niveau 1

```
Y a pour moyenne 30 et pour écart-type 5. Majore Pr(|Y − 30| ≥ 10).
  [guided]  k
    (Quelle inégalité ? Tchebychev : on connaît μ et σ.)
    = 10/□   (trous : 10/5)   ← L'écart 10 vaut k écarts-types
    = □   (trous : 2)   ← k = 2
  — Pr(|Y−30|≥10)  [juge prob]  départ : Pr(|Y − 30| ≥ 10)
    = 1/□   (trous : 1/2²)   ← Pr(|Y − μ| ≥ kσ) ≤ 1/k²
    = 1/□   (trous : 1/4)   ← La borne
  aides : Compte combien d'écarts-types fait l'écart, puis 1/k². | 1/□^2 | Pr ≤ 1/4
  pièges : p_chebyshev_k, p_markov_negative, p_gambler, p_lln_count

Y a pour moyenne 70 et pour écart-type 5. Majore Pr(|Y − 70| ≥ 10).
  [guided]  k
    (Quelle inégalité ? Tchebychev : on connaît μ et σ.)
    = 10/□   (trous : 10/5)   ← L'écart 10 vaut k écarts-types
    = □   (trous : 2)   ← k = 2
  — Pr(|Y−70|≥10)  [juge prob]  départ : Pr(|Y − 70| ≥ 10)
    = 1/□   (trous : 1/2²)   ← Pr(|Y − μ| ≥ kσ) ≤ 1/k²
    = 1/□   (trous : 1/4)   ← La borne
  aides : Compte combien d'écarts-types fait l'écart, puis 1/k². | 1/□^2 | Pr ≤ 1/4
  pièges : p_chebyshev_k, p_markov_negative, p_gambler, p_lln_count

Y a pour moyenne 70 et pour écart-type 2. Majore Pr(|Y − 70| ≥ 10).
  [guided]  k
    (Quelle inégalité ? Tchebychev : on connaît μ et σ.)
    = 10/□   (trous : 10/2)   ← L'écart 10 vaut k écarts-types
    = □   (trous : 5)   ← k = 5
  — Pr(|Y−70|≥10)  [juge prob]  départ : Pr(|Y − 70| ≥ 10)
    = 1/□   (trous : 1/5²)   ← Pr(|Y − μ| ≥ kσ) ≤ 1/k²
    = 1/□   (trous : 1/25)   ← La borne
  aides : Compte combien d'écarts-types fait l'écart, puis 1/k². | 1/□^2 | Pr ≤ 1/25
  pièges : p_chebyshev_k, p_markov_negative, p_gambler, p_lln_count

```

### Niveau 2

```
La durée de vie X d'une ampoule (en mois) est positif, d'espérance 15. Majore Pr(X ≥ 60).
  [guided]  Pr(X ≥ 60)
    ? Quelle inégalité ? ✔ Markov : X ≥ 0 et on connaît E[X] / · Tchebychev
    = □/60   (trous : 15/60)   ← Pr(X ≥ a) ≤ E[X]/a
    = □   (trous : 0,25)   ← Calculer
  aides : X ≥ 0 et E[X] connue : Markov, Pr(X ≥ a) ≤ E[X]/a. | □/60 | Pr(X ≥ 60) ≤ 0,25
  pièges : p_gambler, p_lln_count, p_markov_negative

La durée de vie X d'une ampoule (en mois) est positif, d'espérance 20. Majore Pr(X ≥ 40).
  [guided]  Pr(X ≥ 40)
    ? Quelle inégalité ? ✔ Markov : X ≥ 0 et on connaît E[X] / · Tchebychev
    = □/40   (trous : 20/40)   ← Pr(X ≥ a) ≤ E[X]/a
    = □   (trous : 0,5)   ← Calculer
  aides : X ≥ 0 et E[X] connue : Markov, Pr(X ≥ a) ≤ E[X]/a. | □/40 | Pr(X ≥ 40) ≤ 0,5
  pièges : p_gambler, p_lln_count, p_markov_negative

Le temps d'attente X (en minutes) à un guichet est positif, d'espérance 10. Majore Pr(X ≥ 30).
  [guided]  Pr(X ≥ 30)
    ? Quelle inégalité ? ✔ Markov : X ≥ 0 et on connaît E[X] / · Tchebychev
    = □/30   (trous : 10/30)   ← Pr(X ≥ a) ≤ E[X]/a
    = □   (trous : 1/3)   ← Calculer
  aides : X ≥ 0 et E[X] connue : Markov, Pr(X ≥ a) ≤ E[X]/a. | □/30 | Pr(X ≥ 30) ≤ 1/3
  pièges : p_gambler, p_lln_count, p_markov_negative

```

### Niveau 3

```
Des mesures iid ont un écart-type σ = 10. Par Tchebychev, combien en faut-il au moins pour que Pr(|X̄ − μ| ≥ 1) ≤ 0,05 ?
  [tap, suivre l'erreur, menu menu]  σ²/(δε²)
    = 100/(0,05·1²)   ← var(X̄) = σ²/n ; il faut σ²/(nε²) ≤ δ
    = 2000   ← Calculer
  — n  [juge prob]  départ : n
    = 2000   ← n ≥ σ²/(δε²)
  aides : var(X̄) = σ²/n ; Tchebychev donne Pr(|X̄ − μ| ≥ ε) ≤ σ²/(nε²), à rendre ≤ δ. | 100/(0,05×□) | n ≥ 2000
  pièges : p_gambler, p_lln_count, p_markov_negative

Le temps d'attente X (en minutes) à un guichet est positif, d'espérance 13. Majore Pr(X ≥ 26).
  [tap, suivre l'erreur, menu menu]  Pr(X ≥ 26)
    ? Quelle inégalité ? ✔ Markov : X ≥ 0 et on connaît E[X] / · Tchebychev
    = 13/26   ← Pr(X ≥ a) ≤ E[X]/a
    = 0,5   ← Calculer
  aides : X ≥ 0 et E[X] connue : Markov, Pr(X ≥ a) ≤ E[X]/a. | □/26 | Pr(X ≥ 26) ≤ 0,5
  pièges : p_gambler, p_lln_count, p_markov_negative

Y a pour moyenne 20 et pour écart-type 5. Majore Pr(|Y − 20| ≥ 25).
  [tap, suivre l'erreur, menu menu]  k
    ? Quelle inégalité ? ✔ Tchebychev : on connaît μ et σ / · Markov
    = 25/5   ← L'écart 25 vaut k écarts-types
    = 5   ← k = 5
  — Pr(|Y−20|≥25)  [juge prob]  départ : Pr(|Y − 20| ≥ 25)
    = 1/5²   ← Pr(|Y − μ| ≥ kσ) ≤ 1/k²
    = 1/25   ← La borne
  aides : Compte combien d'écarts-types fait l'écart, puis 1/k². | 1/□^2 | Pr ≤ 1/25
  pièges : p_chebyshev_k, p_markov_negative, p_gambler, p_lln_count

```

### Niveau 4

```
Le temps d'attente X (en minutes) à un guichet est positif, d'espérance 7. Majore Pr(X ≥ 42).
  [free, suivre l'erreur]  Pr(X ≥ 42)
    ? Quelle inégalité ? ✔ Markov : X ≥ 0 et on connaît E[X] / · Tchebychev
    = 7/42   ← Pr(X ≥ a) ≤ E[X]/a
    = 1/6   ← Calculer
  aides : X ≥ 0 et E[X] connue : Markov, Pr(X ≥ a) ≤ E[X]/a. | □/42 | Pr(X ≥ 42) ≤ 1/6
  pièges : p_gambler, p_lln_count, p_markov_negative

La durée de vie X d'une ampoule (en mois) est positif, d'espérance 9. Majore Pr(X ≥ 36).
  [free, suivre l'erreur]  Pr(X ≥ 36)
    ? Quelle inégalité ? ✔ Markov : X ≥ 0 et on connaît E[X] / · Tchebychev
    = 9/36   ← Pr(X ≥ a) ≤ E[X]/a
    = 0,25   ← Calculer
  aides : X ≥ 0 et E[X] connue : Markov, Pr(X ≥ a) ≤ E[X]/a. | □/36 | Pr(X ≥ 36) ≤ 0,25
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
Y a pour moyenne 120 et pour écart-type 5. Majore Pr(|Y − 120| ≥ 10), puis compare à la valeur exacte si Y est normale.
  [free, sans aide]  k
    ? Quelle inégalité ? ✔ Tchebychev : on connaît μ et σ / · Markov
    = 10/5   ← L'écart 10 vaut k écarts-types
    = 2   ← k = 2
  — Pr(|Y−120|≥10)  [juge prob]  départ : Pr(|Y − 120| ≥ 10)
    = 1/2²   ← Pr(|Y − μ| ≥ kσ) ≤ 1/k²
    = 1/4   ← La borne
  — Pr si Y ~ N  [juge stat]  départ : Pr si Y ~ N
    = 2·(1 − Φ(2))   ← Si Y est normale, deux queues
    = 0,046   ← La borne de Tchebychev est large
  pièges : p_chebyshev_k, p_markov_negative, p_gambler, p_lln_count

Y a pour moyenne 120 et pour écart-type 10. Majore Pr(|Y − 120| ≥ 30), puis compare à la valeur exacte si Y est normale.
  [free, sans aide]  k
    ? Quelle inégalité ? ✔ Tchebychev : on connaît μ et σ / · Markov
    = 30/10   ← L'écart 30 vaut k écarts-types
    = 3   ← k = 3
  — Pr(|Y−120|≥30)  [juge prob]  départ : Pr(|Y − 120| ≥ 30)
    = 1/3²   ← Pr(|Y − μ| ≥ kσ) ≤ 1/k²
    = 1/9   ← La borne
  — Pr si Y ~ N  [juge stat]  départ : Pr si Y ~ N
    = 2·(1 − Φ(3))   ← Si Y est normale, deux queues
    = 0,0027   ← La borne de Tchebychev est large
  pièges : p_chebyshev_k, p_markov_negative, p_gambler, p_lln_count

Y a pour moyenne 120 et pour écart-type 2. Majore Pr(|Y − 120| ≥ 4), puis compare à la valeur exacte si Y est normale.
  [free, sans aide]  k
    ? Quelle inégalité ? ✔ Tchebychev : on connaît μ et σ / · Markov
    = 4/2   ← L'écart 4 vaut k écarts-types
    = 2   ← k = 2
  — Pr(|Y−120|≥4)  [juge prob]  départ : Pr(|Y − 120| ≥ 4)
    = 1/2²   ← Pr(|Y − μ| ≥ kσ) ≤ 1/k²
    = 1/4   ← La borne
  — Pr si Y ~ N  [juge stat]  départ : Pr si Y ~ N
    = 2·(1 − Φ(2))   ← Si Y est normale, deux queues
    = 0,046   ← La borne de Tchebychev est large
  pièges : p_chebyshev_k, p_markov_negative, p_gambler, p_lln_count

```

### Variantes d'examen

```
Y a pour moyenne 30 et pour écart-type 5. Quelle est la meilleure borne que donne Tchebychev pour Pr(|Y − 30| ≥ 25) ?
  · ≤ 1/5 [p_chebyshev_k]   · ≤ 30/55 [p_markov_negative]   ✔ ≤ 1/25   · ≤ 1/10
  [examen mcq]
  pièges : p_chebyshev_k, p_markov_negative

Vrai ou faux ?
  « Pour toute variable aléatoire X (pas forcément positive) et tout a > 0, Pr(X ≥ a) ≤ E[X]/a. » → FAUX
    contre-exemple (refute) : c = -1, a = 1
  [examen tf]
  pièges : p_markov_negative

Le temps d'attente X (en minutes) à un guichet est positif, d'espérance 7. Majore Pr(X ≥ 42).
  [free, sans aide, examen coef]  Pr(X ≥ 42)
    = 7/42   ← Pr(X ≥ a) ≤ E[X]/a
    = 1/6   ← Calculer

```

## Théorème central limite pour une somme ou une moyenne (`p-clt-sum`, BA3)

_X₁, …, Xₙ iid d'espérance μ et de variance σ² : pour n grand, Sₙ = ΣXᵢ ≈ N(nμ, nσ²) et X̄ ≈ N(μ, σ²/n)._

### Niveau 1

```
Un camion charge 100 colis ; un colis pèse en moyenne 65 kg, avec un écart-type de 10 kg. Par le théorème central limite, quelle est la probabilité approchée que la charge dépasse 6600 kg ?
  [guided]  E[S]
    (Peut-on approcher la loi de la somme par une loi normale ? Oui : n variables indépendantes de même loi, et n est grand.)
    = 100·□   (trous : 100·65)   ← E[S] = nμ
    = □   (trous : 6500)   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = □·10   (trous : √100·10)   ← var(S) = nσ², donc sd(S) = σ√n
    = □   (trous : 100)   ← Calculer
  — z  [juge stat]  départ : z
    = (6600 − □)/100   (trous : (6600 − 6500)/100)   ← z = (s − E[S])/sd(S)
    = □   (trous : 1)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,841)   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − □   (trous : 1 − 0,841)   ← Pr(S > s) ≈ 1 − Φ(z)
    = □   (trous : 0,159)   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (6600-6500)/□ | z = 1 ; Pr ≈ 1 − Φ(1) = 0,159
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un ascenseur transporte 64 personnes ; le poids d'une personne a pour espérance 81 kg et pour écart-type 10 kg. Par le théorème central limite, quelle est la probabilité approchée que le poids total dépasse 5264 kg ?
  [guided]  E[S]
    (Peut-on approcher la loi de la somme par une loi normale ? Oui : n variables indépendantes de même loi, et n est grand.)
    = 64·□   (trous : 64·81)   ← E[S] = nμ
    = □   (trous : 5184)   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = □·10   (trous : √64·10)   ← var(S) = nσ², donc sd(S) = σ√n
    = □   (trous : 80)   ← Calculer
  — z  [juge stat]  départ : z
    = (5264 − □)/80   (trous : (5264 − 5184)/80)   ← z = (s − E[S])/sd(S)
    = □   (trous : 1)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,841)   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − □   (trous : 1 − 0,841)   ← Pr(S > s) ≈ 1 − Φ(z)
    = □   (trous : 0,159)   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (5264-5184)/□ | z = 1 ; Pr ≈ 1 − Φ(1) = 0,159
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un ascenseur transporte 100 personnes ; le poids d'une personne a pour espérance 32 kg et pour écart-type 4 kg. Par le théorème central limite, quelle est la probabilité approchée que le poids total dépasse 3280 kg ?
  [guided]  E[S]
    (Peut-on approcher la loi de la somme par une loi normale ? Oui : n variables indépendantes de même loi, et n est grand.)
    = 100·□   (trous : 100·32)   ← E[S] = nμ
    = □   (trous : 3200)   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = □·4   (trous : √100·4)   ← var(S) = nσ², donc sd(S) = σ√n
    = □   (trous : 40)   ← Calculer
  — z  [juge stat]  départ : z
    = (3280 − □)/40   (trous : (3280 − 3200)/40)   ← z = (s − E[S])/sd(S)
    = □   (trous : 2)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,977)   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − □   (trous : 1 − 0,977)   ← Pr(S > s) ≈ 1 − Φ(z)
    = □   (trous : 0,023)   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (3280-3200)/□ | z = 2 ; Pr ≈ 1 − Φ(2) = 0,023
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

```

### Niveau 2

```
Un serveur traite 36 requêtes ; une requête dure en moyenne 90 ms, avec un écart-type de 10 ms. Par le théorème central limite, quelle est la probabilité approchée que la durée totale dépasse 3375 ms ?
  [guided]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 36·□   (trous : 36·90)   ← E[S] = nμ
    = □   (trous : 3240)   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = □·10   (trous : √36·10)   ← var(S) = nσ², donc sd(S) = σ√n
    = □   (trous : 60)   ← Calculer
  — z  [juge stat]  départ : z
    = (3375 − □)/60   (trous : (3375 − 3240)/60)   ← z = (s − E[S])/sd(S)
    = □   (trous : 2,25)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,988)   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − □   (trous : 1 − 0,988)   ← Pr(S > s) ≈ 1 − Φ(z)
    = □   (trous : 0,012)   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (3375-3240)/□ | z = 2,25 ; Pr ≈ 1 − Φ(2,25) = 0,012
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un serveur traite 64 requêtes ; une requête dure en moyenne 10 ms, avec un écart-type de 2 ms. Par le théorème central limite, quelle est la probabilité approchée que la durée totale dépasse 652 ms ?
  [guided]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 64·□   (trous : 64·10)   ← E[S] = nμ
    = □   (trous : 640)   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = □·2   (trous : √64·2)   ← var(S) = nσ², donc sd(S) = σ√n
    = □   (trous : 16)   ← Calculer
  — z  [juge stat]  départ : z
    = (652 − □)/16   (trous : (652 − 640)/16)   ← z = (s − E[S])/sd(S)
    = □   (trous : 0,75)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,773)   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − □   (trous : 1 − 0,773)   ← Pr(S > s) ≈ 1 − Φ(z)
    = □   (trous : 0,227)   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (652-640)/□ | z = 0,75 ; Pr ≈ 1 − Φ(0,75) = 0,227
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un ascenseur transporte 100 personnes ; le poids d'une personne a pour espérance 27 kg et pour écart-type 2 kg. Par le théorème central limite, quelle est la probabilité approchée que le poids total dépasse 2745 kg ?
  [guided]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 100·□   (trous : 100·27)   ← E[S] = nμ
    = □   (trous : 2700)   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = □·2   (trous : √100·2)   ← var(S) = nσ², donc sd(S) = σ√n
    = □   (trous : 20)   ← Calculer
  — z  [juge stat]  départ : z
    = (2745 − □)/20   (trous : (2745 − 2700)/20)   ← z = (s − E[S])/sd(S)
    = □   (trous : 2,25)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,988)   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − □   (trous : 1 − 0,988)   ← Pr(S > s) ≈ 1 − Φ(z)
    = □   (trous : 0,012)   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (2745-2700)/□ | z = 2,25 ; Pr ≈ 1 − Φ(2,25) = 0,012
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

```

### Niveau 3

```
Un serveur traite 49 requêtes ; une requête dure en moyenne 63 ms, avec un écart-type de 4 ms. Par le théorème central limite, quelle est la probabilité approchée que la durée totale dépasse 3136 ms ?
  [tap, suivre l'erreur, menu menu]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 49·63   ← E[S] = nμ
    = 3087   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √49·4   ← var(S) = nσ², donc sd(S) = σ√n
    = 28   ← Calculer
  — z  [juge stat]  départ : z
    = (3136 − 3087)/28   ← z = (s − E[S])/sd(S)
    = 1,75   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,96   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − 0,96   ← Pr(S > s) ≈ 1 − Φ(z)
    = 0,04   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (3136-3087)/□ | z = 1,75 ; Pr ≈ 1 − Φ(1,75) = 0,04
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un serveur traite 16 requêtes ; une requête dure en moyenne 72 ms, avec un écart-type de 5 ms. Par le théorème central limite, quelle est la probabilité approchée que la durée totale dépasse 1177 ms ?
  [tap, suivre l'erreur, menu menu]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 16·72   ← E[S] = nμ
    = 1152   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √16·5   ← var(S) = nσ², donc sd(S) = σ√n
    = 20   ← Calculer
  — z  [juge stat]  départ : z
    = (1177 − 1152)/20   ← z = (s − E[S])/sd(S)
    = 1,25   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,894   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − 0,894   ← Pr(S > s) ≈ 1 − Φ(z)
    = 0,106   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (1177-1152)/□ | z = 1,25 ; Pr ≈ 1 − Φ(1,25) = 0,106
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un serveur traite 16 requêtes ; une requête dure en moyenne 88 ms, avec un écart-type de 2 ms. Par le théorème central limite, quelle est la probabilité approchée que la durée totale dépasse 1412 ms ?
  [tap, suivre l'erreur, menu menu]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 16·88   ← E[S] = nμ
    = 1408   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √16·2   ← var(S) = nσ², donc sd(S) = σ√n
    = 8   ← Calculer
  — z  [juge stat]  départ : z
    = (1412 − 1408)/8   ← z = (s − E[S])/sd(S)
    = 0,5   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,691   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − 0,691   ← Pr(S > s) ≈ 1 − Φ(z)
    = 0,309   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (1412-1408)/□ | z = 0,5 ; Pr ≈ 1 − Φ(0,5) = 0,309
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

```

### Niveau 4

```
Un serveur traite 100 requêtes ; une requête dure en moyenne 75 ms, avec un écart-type de 4 ms. Par le théorème central limite, quelle est la probabilité approchée que la durée totale dépasse 7550 ms ?
  [free, suivre l'erreur]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 100·75   ← E[S] = nμ
    = 7500   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √100·4   ← var(S) = nσ², donc sd(S) = σ√n
    = 40   ← Calculer
  — z  [juge stat]  départ : z
    = (7550 − 7500)/40   ← z = (s − E[S])/sd(S)
    = 1,25   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,894   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − 0,894   ← Pr(S > s) ≈ 1 − Φ(z)
    = 0,106   ← TCL et table
  aides : La variance d'une somme de n termes indépendants est nσ² ; l'écart-type est σ√n. | (7550-7500)/□ | z = 1,25 ; Pr ≈ 1 − Φ(1,25) = 0,106
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un camion charge 36 colis ; un colis pèse en moyenne 30 kg, avec un écart-type de 2 kg. Quelle charge c (en kg) le camion doit-il supporter pour que Pr(charge > c) = 0,025 ?
  [free, suivre l'erreur]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 36·30   ← E[S] = nμ
    = 1080   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √36·2   ← σ√n
    = 12   ← Calculer
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,975)   ← Φ(z) = 1 − 0,025
    = 1,96   ← Table 2
  — c  [juge stat]  départ : c
    = 1080 + 1,96·12   ← c = E[S] + z·sd(S)
    = 1103,5   ← Capacité
  aides : Pr(S > c) = α veut dire Φ((c − nμ)/(σ√n)) = 1 − α. | 1080+□×12 | c ≈ 1103,5 kg
  pièges : p_clt_sum_sd, p_clt_population, p_clt_needs_normal

Un camion charge 36 colis ; un colis pèse en moyenne 56 kg, avec un écart-type de 5 kg. Quelle charge c (en kg) le camion doit-il supporter pour que Pr(charge > c) = 0,1 ?
  [free, suivre l'erreur]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 36·56   ← E[S] = nμ
    = 2016   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √36·5   ← σ√n
    = 30   ← Calculer
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,9)   ← Φ(z) = 1 − 0,1
    = 1,28   ← Table 2
  — c  [juge stat]  départ : c
    = 2016 + 1,28·30   ← c = E[S] + z·sd(S)
    = 2054,4   ← Capacité
  aides : Pr(S > c) = α veut dire Φ((c − nμ)/(σ√n)) = 1 − α. | 2016+□×30 | c ≈ 2054,4 kg
  pièges : p_clt_sum_sd, p_clt_population, p_clt_needs_normal

```

### Niveau 5

```
Un camion charge 100 colis ; un colis pèse en moyenne 12 kg, avec un écart-type de 4 kg. Quelle charge c (en kg) le camion doit-il supporter pour que Pr(charge > c) = 0,025 ?
  [free, sans aide]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 100·12   ← E[S] = nμ
    = 1200   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √100·4   ← σ√n
    = 40   ← Calculer
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,975)   ← Φ(z) = 1 − 0,025
    = 1,96   ← Table 2
  — c  [juge stat]  départ : c
    = 1200 + 1,96·40   ← c = E[S] + z·sd(S)
    = 1278,4   ← Capacité
  pièges : p_clt_sum_sd, p_clt_population, p_clt_needs_normal

Un ascenseur transporte 64 personnes ; le poids d'une personne a pour espérance 73 kg et pour écart-type 5 kg. Par le théorème central limite, quelle est la probabilité approchée que le poids total dépasse 4742 kg ?
  [free, sans aide]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 64·73   ← E[S] = nμ
    = 4672   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √64·5   ← var(S) = nσ², donc sd(S) = σ√n
    = 40   ← Calculer
  — z  [juge stat]  départ : z
    = (4742 − 4672)/40   ← z = (s − E[S])/sd(S)
    = 1,75   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,96   ← Table 1
  — Pr  [juge stat]  départ : Pr
    = 1 − 0,96   ← Pr(S > s) ≈ 1 − Φ(z)
    = 0,04   ← TCL et table
  pièges : p_clt_sum_sd, p_se_forgot_sqrt_n, p_upper_tail, p_clt_population, p_clt_needs_normal

Un camion charge 49 colis ; un colis pèse en moyenne 25 kg, avec un écart-type de 4 kg. Quelle charge c (en kg) le camion doit-il supporter pour que Pr(charge > c) = 0,04 ?
  [free, sans aide]  E[S]
    ? Peut-on approcher la loi de la somme par une loi normale ? ✔ Oui : n variables indépendantes de même loi, et n est grand / · Seulement si la population est très grande / · Seulement si chaque variable est normale
    = 49·25   ← E[S] = nμ
    = 1225   ← Calculer
  — sd(S)  [juge prob]  départ : sS′
    = √49·4   ← σ√n
    = 28   ← Calculer
  — z  [juge stat]  départ : z
    = Φ⁻¹(0,96)   ← Φ(z) = 1 − 0,04
    = 1,75   ← Table 2
  — c  [juge stat]  départ : c
    = 1225 + 1,75·28   ← c = E[S] + z·sd(S)
    = 1274   ← Capacité
  pièges : p_clt_sum_sd, p_clt_population, p_clt_needs_normal

```

### Variantes d'examen

```
36 variables iid d'espérance 41 et d'écart-type 15. Pr(S > 1701) ≈ ? (S est leur somme)
  · 0,338 [p_clt_sum_sd]   ✔ 0,006   · 0,994 [p_upper_tail]   · 0,106
  [examen mcq]
  pièges : p_upper_tail, p_clt_sum_sd

Vrai ou faux ?
  « La somme de n variables indépendantes d'écart-type σ a pour écart-type n·σ. » → FAUX
    contre-exemple (refute) : n = 4, s = 1
  [examen tf]
  pièges : p_clt_sum_sd

On mesure 16 valeurs iid d'espérance 41 et d'écart-type 4. Quelle est la probabilité approchée que la moyenne X̄ dépasse 43 ?
  [free, sans aide, examen coef]  Pr
    = 1 − 0,977   ← Queue de droite
    = 0,023   ← TCL et table
  pièges : p_upper_tail

```

## Approximation normale de la binomiale et de Poisson (`p-clt-binom`, BA3)

_X ~ B(n, p) est une somme de n Bernoulli ; pour n grand, X ≈ N(np, np(1 − p)) et p̂ = X/n ≈ N(p, p(1 − p)/n)._

### Niveau 1

```
On lance 100 fois une pièce ; X est le nombre de piles, X ~ B(100 ; 0,1). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 16).
  [guided]  E[X]
    (Quelle approximation ? Normale : np = 10 et n(1 − p) = 90 sont grands.)
    = 100·□   (trous : 100·0,1)   ← E = np
    = □   (trous : 10)   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 100·0,1·□   (trous : 100·0,1·0,9)   ← var = np(1 − p)
    = □   (trous : 9)   ← Calculer
  — σ  [juge prob]  départ : σ
    = √□   (trous : √9)   ← σ = √var
    = □   (trous : 3)   ← Écart-type
  — z  [juge stat]  départ : z
    = (16 − □)/3   (trous : (16 − 10)/3)   ← z = (k − μ)/σ
    = □   (trous : 2)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,977)   ← Table 1
  — Pr(X≥16)  [juge stat]  départ : Pr(X ≥ 16)
    = 1 − □   (trous : 1 − 0,977)   ← Complément
    = □   (trous : 0,023)   ← Approximation normale
  aides : np(1 − p) est la variance : prends sa racine. | (16-10)/√□ | z = 2 ; Pr ≈ 0,023
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

On lance 900 fois une pièce ; X est le nombre de piles, X ~ B(900 ; 0,1). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 108).
  [guided]  E[X]
    (Quelle approximation ? Normale : np = 90 et n(1 − p) = 810 sont grands.)
    = 900·□   (trous : 900·0,1)   ← E = np
    = □   (trous : 90)   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 900·0,1·□   (trous : 900·0,1·0,9)   ← var = np(1 − p)
    = □   (trous : 81)   ← Calculer
  — σ  [juge prob]  départ : σ
    = √□   (trous : √81)   ← σ = √var
    = □   (trous : 9)   ← Écart-type
  — z  [juge stat]  départ : z
    = (108 − □)/9   (trous : (108 − 90)/9)   ← z = (k − μ)/σ
    = □   (trous : 2)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,977)   ← Table 1
  — Pr(X≥108)  [juge stat]  départ : Pr(X ≥ 108)
    = 1 − □   (trous : 1 − 0,977)   ← Complément
    = □   (trous : 0,023)   ← Approximation normale
  aides : np(1 − p) est la variance : prends sa racine. | (108-90)/√□ | z = 2 ; Pr ≈ 0,023
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

On lance 400 fois une pièce ; X est le nombre de piles, X ~ B(400 ; 0,5). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 220).
  [guided]  E[X]
    (Quelle approximation ? Normale : np = 200 et n(1 − p) = 200 sont grands.)
    = 400·□   (trous : 400·0,5)   ← E = np
    = □   (trous : 200)   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 400·□·0,5   (trous : 400·0,5·0,5)   ← var = np(1 − p)
    = □   (trous : 100)   ← Calculer
  — σ  [juge prob]  départ : σ
    = √□   (trous : √100)   ← σ = √var
    = □   (trous : 10)   ← Écart-type
  — z  [juge stat]  départ : z
    = (220 − □)/10   (trous : (220 − 200)/10)   ← z = (k − μ)/σ
    = □   (trous : 2)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,977)   ← Table 1
  — Pr(X≥220)  [juge stat]  départ : Pr(X ≥ 220)
    = 1 − □   (trous : 1 − 0,977)   ← Complément
    = □   (trous : 0,023)   ← Approximation normale
  aides : np(1 − p) est la variance : prends sa racine. | (220-200)/√□ | z = 2 ; Pr ≈ 0,023
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

```

### Niveau 2

```
Dans un sondage, 900 personnes répondent ; chacune est favorable avec la probabilité 0,1. X est le nombre de personnes favorables, X ~ B(900 ; 0,1). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≤ 108).
  [guided]  E[X]
    ? Quelle approximation ? ✔ Normale : np = 90 et n(1 − p) = 810 sont grands / · Poisson
    = 900·□   (trous : 900·0,1)   ← E = np
    = □   (trous : 90)   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 900·0,1·□   (trous : 900·0,1·0,9)   ← var = np(1 − p)
    = □   (trous : 81)   ← Calculer
  — σ  [juge prob]  départ : σ
    = √□   (trous : √81)   ← σ = √var
    = □   (trous : 9)   ← Écart-type
  — z  [juge stat]  départ : z
    = (108 − □)/9   (trous : (108 − 90)/9)   ← z = (k − μ)/σ
    = □   (trous : 2)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,977)   ← Table 1
  — Pr(X≤108)  [juge stat]  départ : Pr(X ≤ 108)
    = □   (trous : 0,977)   ← Pr ≈ Φ(z)
  aides : np(1 − p) est la variance : prends sa racine. | (108-90)/√□ | z = 2 ; Pr ≈ 0,977
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

On lance 100 fois une pièce ; X est le nombre de piles, X ~ B(100 ; 0,1). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≤ 13).
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
  — Pr(X≤13)  [juge stat]  départ : Pr(X ≤ 13)
    = □   (trous : 0,841)   ← Pr ≈ Φ(z)
  aides : np(1 − p) est la variance : prends sa racine. | (13-10)/√□ | z = 1 ; Pr ≈ 0,841
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

Dans un sondage, 400 personnes répondent ; chacune est favorable avec la probabilité 0,2. X est le nombre de personnes favorables, X ~ B(400 ; 0,2). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 84).
  [guided]  E[X]
    ? Quelle approximation ? ✔ Normale : np = 80 et n(1 − p) = 320 sont grands / · Poisson
    = 400·□   (trous : 400·0,2)   ← E = np
    = □   (trous : 80)   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 400·0,2·□   (trous : 400·0,2·0,8)   ← var = np(1 − p)
    = □   (trous : 64)   ← Calculer
  — σ  [juge prob]  départ : σ
    = √□   (trous : √64)   ← σ = √var
    = □   (trous : 8)   ← Écart-type
  — z  [juge stat]  départ : z
    = (84 − □)/8   (trous : (84 − 80)/8)   ← z = (k − μ)/σ
    = □   (trous : 0,5)   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = □   (trous : 0,691)   ← Table 1
  — Pr(X≥84)  [juge stat]  départ : Pr(X ≥ 84)
    = 1 − □   (trous : 1 − 0,691)   ← Complément
    = □   (trous : 0,309)   ← Approximation normale
  aides : np(1 − p) est la variance : prends sa racine. | (84-80)/√□ | z = 0,5 ; Pr ≈ 0,309
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

```

### Niveau 3

```
On lance 625 fois une pièce ; X est le nombre de piles, X ~ B(625 ; 0,2). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 145).
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
    = (145 − 125)/10   ← z = (k − μ)/σ
    = 2   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,977   ← Table 1
  — Pr(X≥145)  [juge stat]  départ : Pr(X ≥ 145)
    = 1 − 0,977   ← Complément
    = 0,023   ← Approximation normale
  aides : np(1 − p) est la variance : prends sa racine. | (145-125)/√□ | z = 2 ; Pr ≈ 0,023
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

On lance 400 fois une pièce ; X est le nombre de piles, X ~ B(400 ; 0,1). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 49).
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
    = (49 − 40)/6   ← z = (k − μ)/σ
    = 1,5   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,933   ← Table 1
  — Pr(X≥49)  [juge stat]  départ : Pr(X ≥ 49)
    = 1 − 0,933   ← Complément
    = 0,067   ← Approximation normale
  aides : np(1 − p) est la variance : prends sa racine. | (49-40)/√□ | z = 1,5 ; Pr ≈ 0,067
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

Dans un sondage, 100 personnes répondent ; chacune est favorable avec la probabilité 0,2. X est le nombre de personnes favorables, X ~ B(100 ; 0,2). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 26).
  [tap, suivre l'erreur, menu menu]  E[X]
    ? Quelle approximation ? ✔ Normale : np = 20 et n(1 − p) = 80 sont grands / · Poisson
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
  — Pr(X≥26)  [juge stat]  départ : Pr(X ≥ 26)
    = 1 − 0,933   ← Complément
    = 0,067   ← Approximation normale
  aides : np(1 − p) est la variance : prends sa racine. | (26-20)/√□ | z = 1,5 ; Pr ≈ 0,067
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

```

### Niveau 4

```
On lance 900 fois une pièce ; X est le nombre de piles, X ~ B(900 ; 0,1). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≤ 99).
  [free, suivre l'erreur]  E[X]
    ? Quelle approximation ? ✔ Normale : np = 90 et n(1 − p) = 810 sont grands / · Poisson
    = 900·0,1   ← E = np
    = 90   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 900·0,1·0,9   ← var = np(1 − p)
    = 81   ← Calculer
  — σ  [juge prob]  départ : σ
    = √81   ← σ = √var
    = 9   ← Écart-type
  — z  [juge stat]  départ : z
    = (99 − 90)/9   ← z = (k − μ)/σ
    = 1   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,841   ← Table 1
  — Pr(X≤99)  [juge stat]  départ : Pr(X ≤ 99)
    = 0,841   ← Pr ≈ Φ(z)
  aides : np(1 − p) est la variance : prends sa racine. | (99-90)/√□ | z = 1 ; Pr ≈ 0,841
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

On lance 400 fois une pièce ; X est le nombre de piles, X ~ B(400 ; 0,1). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≤ 46).
  [free, suivre l'erreur]  E[X]
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
    = (46 − 40)/6   ← z = (k − μ)/σ
    = 1   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,841   ← Table 1
  — Pr(X≤46)  [juge stat]  départ : Pr(X ≤ 46)
    = 0,841   ← Pr ≈ Φ(z)
  aides : np(1 − p) est la variance : prends sa racine. | (46-40)/√□ | z = 1 ; Pr ≈ 0,841
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

Le nombre X de clients d'un magasin en un mois suit Poiss(36). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 45).
  [free, suivre l'erreur]  E[X]
    = 36   ← Pour Poisson, E = λ
  — var(X)  [juge prob]  départ : var(X)
    = 36   ← var = λ
  — σ  [juge prob]  départ : σ
    = √36   ← σ = √var
    = 6   ← Écart-type
  — z  [juge stat]  départ : z
    = (45 − 36)/6   ← z = (k − μ)/σ
    = 1,5   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,933   ← Table 1
  — Pr(X≥45)  [juge stat]  départ : Pr(X ≥ 45)
    = 1 − 0,933   ← Complément
    = 0,067   ← Approximation normale
  aides : Poiss(λ) ≈ N(λ, λ) : l'écart-type est √λ. | (45-36)/√□ | z = 1,5 ; Pr ≈ 0,067
  pièges : p_binom_var_as_sd, p_upper_tail

```

### Niveau 5

```
Dans un sondage, 2500 personnes répondent ; chacune est favorable avec la probabilité 0,5. X est le nombre de personnes favorables, X ~ B(2500 ; 0,5). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 1300).
  [free, sans aide]  E[X]
    = 2500·0,5   ← E = np
    = 1250   ← Calculer
  — var(X)  [juge prob]  départ : var(X)
    = 2500·0,5·0,5   ← var = np(1 − p)
    = 625   ← Calculer
  — σ  [juge prob]  départ : σ
    = √625   ← σ = √var
    = 25   ← Écart-type
  — z  [juge stat]  départ : z
    = (1300 − 1250)/25   ← z = (k − μ)/σ
    = 2   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,977   ← Table 1
  — Pr(X≥1300)  [juge stat]  départ : Pr(X ≥ 1300)
    = 1 − 0,977   ← Complément
    = 0,023   ← Approximation normale
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

Le nombre X de clients d'un magasin en un mois suit Poiss(64). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 80).
  [free, sans aide]  E[X]
    = 64   ← Pour Poisson, E = λ
  — var(X)  [juge prob]  départ : var(X)
    = 64   ← var = λ
  — σ  [juge prob]  départ : σ
    = √64   ← σ = √var
    = 8   ← Écart-type
  — z  [juge stat]  départ : z
    = (80 − 64)/8   ← z = (k − μ)/σ
    = 2   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,977   ← Table 1
  — Pr(X≥80)  [juge stat]  départ : Pr(X ≥ 80)
    = 1 − 0,977   ← Complément
    = 0,023   ← Approximation normale
  pièges : p_binom_var_as_sd, p_upper_tail

Dans un sondage, 100 personnes répondent ; chacune est favorable avec la probabilité 0,2. X est le nombre de personnes favorables, X ~ B(100 ; 0,2). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 30).
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
    = (30 − 20)/4   ← z = (k − μ)/σ
    = 2,5   ← Calculer
  — Φ(z)  [juge stat]  départ : Φ(z)
    = 0,994   ← Table 1
  — Pr(X≥30)  [juge stat]  départ : Pr(X ≥ 30)
    = 1 − 0,994   ← Complément
    = 0,006   ← Approximation normale
  pièges : p_binom_var_as_sd, p_upper_tail, p_poisson_approx_bad

```

### Variantes d'examen

```
Le nombre X de clients d'un magasin en un mois suit Poiss(16). Par l'approximation normale (sans correction de continuité), Pr(X ≤ 21) ≈ ?
  ✔ 0,894   · 0,106 [p_upper_tail]   · 0,623 [p_binom_var_as_sd]   · 0,447
  [examen mcq]
  pièges : p_upper_tail, p_binom_var_as_sd

Vrai ou faux ?
  « Si X ~ B(n, p), l'écart-type de X est np(1 − p). » → FAUX
    contre-exemple (refute) : n = 100, p = 1/2
  [examen tf]
  pièges : p_binom_var_as_sd

Dans un sondage, 2500 personnes répondent ; chacune est favorable avec la probabilité 0,5. X est le nombre de personnes favorables, X ~ B(2500 ; 0,5). Par l'approximation normale (sans correction de continuité, comme le cours), calcule Pr(X ≥ 1300).
  [free, sans aide, examen coef]  Pr(X ≥ 1300)
    = 1 − 0,977   ← Complément
    = 0,023   ← Approximation normale
  pièges : p_upper_tail

```

## Méthode des moments (`p-mom`, BA3)

_On égale les moments théoriques aux moments empiriques et on résout en θ : E[X] = x̄ ; avec deux paramètres, var(X) = σ̂² = (1/n)Σ(xᵢ −…_

### Niveau 1

```
X₁, …, Xₙ (n = 50) sont iid de loi exp(λ). On observe Σxᵢ = 25. Estime λ par la méthode des moments.
  [guided]  x̄
    = 25/□   (trous : 25/50)   ← x̄ = Σxᵢ/n
    = □   (trous : 0,5)   ← Calculer
  — λ̂  [juge prob]  départ : λ̂
    (E[X] = 1/λ : on résout 1/λ = x̄.)
    = 1/□   (trous : 1/0,5)   ← 1/λ = x̄, puis isoler λ
    = □   (trous : 2)   ← Calculer
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | 1/λ = 0,5, donc λ = □ | λ̂ = 2
  pièges : p_exp_rate_mean

X₁, …, Xₙ (n = 40) sont iid de loi exp(λ). On observe Σxᵢ = 400. Estime λ par la méthode des moments.
  [guided]  x̄
    = 400/40   ← x̄ = Σxᵢ/n
    = □   (trous : 10)   ← Calculer
  — λ̂  [juge prob]  départ : λ̂
    (E[X] = 1/λ : on résout 1/λ = x̄.)
    = 1/□   (trous : 1/10)   ← 1/λ = x̄, puis isoler λ
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | 1/λ = 10, donc λ = □ | λ̂ = 0,1
  pièges : p_exp_rate_mean

X₁, …, Xₙ (n = 25) sont iid de loi U[0, θ]. On observe Σxᵢ = 50. Estime θ par la méthode des moments.
  [guided]  x̄
    = 50/□   (trous : 50/25)   ← x̄ = Σxᵢ/n
    = □   (trous : 2)   ← Calculer
  — θ̂  [juge prob]  départ : θ̂
    (E[X] = θ/2 : on résout θ/2 = x̄.)
    = □·2   (trous : 2·2)   ← θ/2 = x̄, puis isoler θ
    = □   (trous : 4)   ← Calculer
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | θ/2 = 2, donc θ = □ | θ̂ = 4

```

### Niveau 2

```
Les données 11 ; 17 ; 9 ; 3 viennent d'une loi Γ(k, θ) (forme k, échelle θ : E = kθ, var = kθ²). Estime θ et k par la méthode des moments.
  [guided]  x̄
    = □/4   (trous : 40/4)   ← Somme des données / n
    = □   (trous : 10)   ← x̄
  — σ̂2  [juge prob]  départ : σ̂²
    ? Quelle seconde équation ? ✔ var(X) = σ̂² = (1/n)Σ(xᵢ − x̄)² / · E[X²] = x̄² / · var(X) = s² = Σ(xᵢ − x̄)²/(n − 1)
    = □/4   (trous : 100/4)   ← Σ(xᵢ − x̄)² = 100
    = □   (trous : 25)   ← σ̂²
  — θ̂  [juge prob]  départ : θ̂
    (E[X] = kθ et var(X) = kθ² pour Γ(k, θ).)
    = □/10   (trous : 25/10)   ← kθ = x̄ et kθ² = σ̂², donc θ = σ̂²/x̄
    = □   (trous : 2,5)   ← θ̂
  — k̂  [juge prob]  départ : k̂
    = □/(2,5)   (trous : 10/(2,5))   ← k = x̄/θ̂
    = □   (trous : 4)   ← Calculer
  aides : Deux paramètres : deux équations, E[X] = x̄ et var(X) = σ̂² (diviseur n). | 25/□ | θ̂ = 2,5 ; k̂ = 4
  pièges : p_mom_s2, p_mom_wrong_moment

X₁, …, Xₙ (n = 25) sont iid de loi Poiss(λ). On observe Σxᵢ = 122. Estime λ par la méthode des moments.
  [guided]  x̄
    = 122/□   (trous : 122/25)   ← x̄ = Σxᵢ/n
  — E[X]  [juge prob]  départ : E[X]
    = □   (trous : λ)   ← Espérance de Poiss(λ)
  — λ̂  [juge prob]  départ : λ̂
    = □   (trous : 4,88)   ← λ = x̄, puis isoler λ
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | λ = 4,88, donc λ = □ | λ̂ = 4,88

X₁, …, Xₙ (n = 40) sont iid de loi U[0, θ]. On observe Σxᵢ = 292. Estime θ par la méthode des moments.
  [guided]  x̄
    = 292/□   (trous : 292/40)   ← x̄ = Σxᵢ/n
    = □   (trous : 7,3)   ← Calculer
  — E[X]  [juge prob]  départ : E[X]
    = □   (trous : θ/2)   ← Espérance de U[0, θ]
  — θ̂  [juge prob]  départ : θ̂
    = 2·□   (trous : 2·7,3)   ← θ/2 = x̄, puis isoler θ
    = □   (trous : 14,6)   ← Calculer
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | θ/2 = 7,3, donc θ = □ | θ̂ = 14,6

```

### Niveau 3

```
Les données 5 ; 7 ; 1 ; 4 ; 3 viennent d'une loi Γ(k, θ) (forme k, échelle θ : E = kθ, var = kθ²). Estime θ et k par la méthode des moments.
  [tap, suivre l'erreur, menu menu]  x̄
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
  aides : Deux paramètres : deux équations, E[X] = x̄ et var(X) = σ̂² (diviseur n). | 4/□ | θ̂ = 1 ; k̂ = 4
  pièges : p_mom_s2, p_mom_wrong_moment

X₁, …, Xₙ (n = 20) sont iid de loi exp(λ). On observe Σxᵢ = 40. Estime λ par la méthode des moments.
  [tap, suivre l'erreur, menu menu]  x̄
    = 40/20   ← x̄ = Σxᵢ/n
    = 2   ← Calculer
  — E[X]  [juge prob]  départ : E[X]
    = 1/λ   ← Espérance de exp(λ)
  — λ̂  [juge prob]  départ : λ̂
    = 1/2   ← 1/λ = x̄, puis isoler λ
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | 1/λ = 2, donc λ = □ | λ̂ = 0,5
  pièges : p_exp_rate_mean

X₁, …, Xₙ (n = 24) sont iid de loi la loi de Pareto de densité αx^(−α−1) sur ]1 ; ∞[ (α > 1). On observe Σxᵢ = 30. Estime α par la méthode des moments.
  [tap, suivre l'erreur, menu menu]  x̄
    = 30/24   ← x̄ = Σxᵢ/n
    = 1,25   ← Calculer
  — E[X]  [juge prob]  départ : E[X]
    = α/(α − 1)   ← Espérance de la loi de Pareto de densité αx^(−α−1) sur ]1 ; ∞[ (α > 1)
  — α̂  [juge prob]  départ : α̂
    = 1,25/(1,25 − 1)   ← α/(α−1) = x̄, puis isoler α
    = 5   ← Calculer
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | α/(α−1) = 1,25, donc α = □ | α̂ = 5

```

### Niveau 4

```
Les données 7 ; 5 ; 5 ; 10 ; 7 ; 2 viennent d'une loi Γ(k, θ) (forme k, échelle θ : E = kθ, var = kθ²). Estime θ et k par la méthode des moments.
  [free, suivre l'erreur]  x̄
    = 36/6   ← Somme des données / n
    = 6   ← x̄
  — σ̂2  [juge prob]  départ : σ̂²
    ? Quelle seconde équation ? ✔ var(X) = σ̂² = (1/n)Σ(xᵢ − x̄)² / · E[X²] = x̄² / · var(X) = s² = Σ(xᵢ − x̄)²/(n − 1)
    = 36/6   ← Σ(xᵢ − x̄)² = 36
    = 6   ← σ̂²
  — θ̂  [juge prob]  départ : θ̂
    (E[X] = kθ et var(X) = kθ² pour Γ(k, θ).)
    = 6/6   ← kθ = x̄ et kθ² = σ̂², donc θ = σ̂²/x̄
    = 1   ← θ̂
  — k̂  [juge prob]  départ : k̂
    = 6/1   ← k = x̄/θ̂
    = 6   ← Calculer
  aides : Deux paramètres : deux équations, E[X] = x̄ et var(X) = σ̂² (diviseur n). | 6/□ | θ̂ = 1 ; k̂ = 6
  pièges : p_mom_s2, p_mom_wrong_moment

X₁, …, Xₙ (n = 50) sont iid de loi exp(λ). On observe Σxᵢ = 250. Estime λ par la méthode des moments.
  [free, suivre l'erreur]  x̄
    = 250/50   ← x̄ = Σxᵢ/n
    = 5   ← Calculer
  — E[X]  [juge prob]  départ : E[X]
    = 1/λ   ← Espérance de exp(λ)
  — λ̂  [juge prob]  départ : λ̂
    = 1/5   ← 1/λ = x̄, puis isoler λ
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | 1/λ = 5, donc λ = □ | λ̂ = 0,2
  pièges : p_exp_rate_mean

X₁, …, Xₙ (n = 60) sont iid de loi la loi de densité θx^(θ−1) sur ]0 ; 1[. On observe Σxᵢ = 30. Estime θ par la méthode des moments.
  [free, suivre l'erreur]  x̄
    = 30/60   ← x̄ = Σxᵢ/n
    = 0,5   ← Calculer
  — E[X]  [juge prob]  départ : E[X]
    = θ/(θ + 1)   ← Espérance de la loi de densité θx^(θ−1) sur ]0 ; 1[
  — θ̂  [juge prob]  départ : θ̂
    = 0,5/(1 − 0,5)   ← θ/(θ+1) = x̄, puis isoler θ
    = 1   ← Calculer
  aides : Égale le moment théorique E[X] au moment empirique x̄, puis isole le paramètre. | θ/(θ+1) = 0,5, donc θ = □ | θ̂ = 1

```

### Niveau 5

```
Les données 8 ; 4 ; 6 ; 10 ; 2 viennent d'une loi Γ(k, θ) (forme k, échelle θ : E = kθ, var = kθ²). Estime θ et k par la méthode des moments.
  [free, sans aide]  x̄
    = 30/5   ← Somme des données / n
    = 6   ← x̄
  — σ̂2  [juge prob]  départ : σ̂²
    ? Quelle seconde équation ? ✔ var(X) = σ̂² = (1/n)Σ(xᵢ − x̄)² / · E[X²] = x̄² / · var(X) = s² = Σ(xᵢ − x̄)²/(n − 1)
    = 40/5   ← Σ(xᵢ − x̄)² = 40
    = 8   ← σ̂²
  — θ̂  [juge prob]  départ : θ̂
    (E[X] = kθ et var(X) = kθ² pour Γ(k, θ).)
    = 8/6   ← kθ = x̄ et kθ² = σ̂², donc θ = σ̂²/x̄
    = 4/3   ← θ̂
  — k̂  [juge prob]  départ : k̂
    = 6/(4/3)   ← k = x̄/θ̂
    = 4,5   ← Calculer
  pièges : p_mom_s2, p_mom_wrong_moment

X₁, …, Xₙ (n = 12) sont iid de loi la loi de Pareto de densité αx^(−α−1) sur ]1 ; ∞[ (α > 1). On observe Σxᵢ = 15. Estime α par la méthode des moments.
  [free, sans aide]  x̄
    = 15/12   ← x̄ = Σxᵢ/n
    = 1,25   ← Calculer
  — E[X]  [juge prob]  départ : E[X]
    = α/(α − 1)   ← Espérance de la loi de Pareto de densité αx^(−α−1) sur ]1 ; ∞[ (α > 1)
  — α̂  [juge prob]  départ : α̂
    = 1,25/(1,25 − 1)   ← α/(α−1) = x̄, puis isoler α
    = 5   ← Calculer

Les données 6 ; 5 ; 2 ; 5 ; 3 ; 3 viennent d'une loi Γ(k, θ) (forme k, échelle θ : E = kθ, var = kθ²). Estime θ et k par la méthode des moments.
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
Les données 7 ; 1 ; 3 ; 4 ; 5 viennent d'une loi Γ(k, θ) (forme k, échelle θ : E = kθ, var = kθ²). Que vaut θ̂ par la méthode des moments.
  · 1,25 [p_mom_s2]   · 2   ✔ 1
  [examen mcq]
  pièges : p_mom_s2

Vrai ou faux ?
  « Pour estimer θ = E[X], la moyenne X̄ est l'estimateur des moments, quel que soit le modèle. » → VRAI
  [examen tf]

Les données 3 ; 3 ; 2 ; 6 ; 5 ; 5 viennent d'une loi Γ(k, θ) (forme k, échelle θ : E = kθ, var = kθ²). Estime θ et k par la méthode des moments.
  [free, sans aide, examen coef]  k̂
    = 4/(0,5)   ← k = x̄/θ̂
    = 8   ← Calculer

```

## Maximum de vraisemblance, étape par étape (`p-mle`, BA3)

_L(θ) = Π f(xᵢ ; θ) ; ℓ(θ) = ln L(θ) = Σ ln f(xᵢ ; θ) ; on résout ℓ′(θ̂) = 0 ; on vérifie que c'est un maximum (ℓ″ < 0 partout, ou…_

### Niveau 1

```
X₁, …, Xₙ (n = 25) sont iid de loi Poiss(λ). On observe Σxᵢ = 25. Trouve le maximum de vraisemblance λ̂.
  [guided]  x̄
    = □/25   (trous : 25/25)   ← x̄ = Σxᵢ/n
    = 1   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λ^(xᵢ)e^(−λ)/xᵢ! ∝ λ^25·e^(−nλ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
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

X₁, …, Xₙ (n = 18) sont iid de loi Poiss(λ). On observe Σxᵢ = 36. Trouve le maximum de vraisemblance λ̂.
  [guided]  x̄
    = 36/□   (trous : 36/18)   ← x̄ = Σxᵢ/n
    = 2   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λ^(xᵢ)e^(−λ)/xᵢ! ∝ λ^36·e^(−nλ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = □ln(λ) − 18λ   (trous : 36ln(λ) − 18λ)   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = □/λ − 18   (trous : 36/λ − 18)   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = □/18   (trous : 36/18)   ← ℓ′(λ̂) = 0
    = □   (trous : 2)   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −36/□   (trous : −36/λ²)   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    (ℓ″(λ) < 0 : que peut-on conclure ? ℓ est concave : λ̂ est le maximum global.)
    = 36/2²   ← −ℓ″(λ̂)
    = □   (trous : 9)   ← Information observée
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = 36/λ-18 = 0, donc λ̂ = □ | λ̂ = 2
  pièges : p_mle_solve, p_wald_sign, p_mle_no_check, p_mle_constant_kept

X₁, …, Xₙ (n = 100) sont iid de loi exp(λ), de densité λe^(−λx) pour x > 0. On observe Σxᵢ = 25. Trouve le maximum de vraisemblance λ̂.
  [guided]  x̄
    = 25/□   (trous : 25/100)   ← x̄ = Σxᵢ/n
    = 0,25   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λe^(−λxᵢ) = λ^100·e^(−25λ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = □ln(λ) − 25λ   (trous : 100ln(λ) − 25λ)   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = 100/λ − □   (trous : 100/λ − 25)   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = 100/□   (trous : 100/25)   ← ℓ′(λ̂) = 0
    = □   (trous : 4)   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −100/□   (trous : −100/λ²)   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    (ℓ″(λ) < 0 : que peut-on conclure ? ℓ est concave : λ̂ est le maximum global.)
    = 100/4²   ← −ℓ″(λ̂)
    = □   (trous : 6,25)   ← Information observée
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = 100/λ-25 = 0, donc λ̂ = □ | λ̂ = 4
  pièges : p_mle_solve, p_wald_sign, p_mle_no_check, p_mle_constant_kept

```

### Niveau 2

```
X₁, …, Xₙ (n = 25) sont iid de loi Poiss(λ). On observe Σxᵢ = 25. Trouve le maximum de vraisemblance λ̂.
  [guided]  x̄
    = □/25   (trous : 25/25)   ← x̄ = Σxᵢ/n
    = 1   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λ^(xᵢ)e^(−λ)/xᵢ! ∝ λ^25·e^(−nλ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = □ln(λ) − 25λ   (trous : 25ln(λ) − 25λ)   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = □/λ − 25   (trous : 25/λ − 25)   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = □/25   (trous : 25/25)   ← ℓ′(λ̂) = 0
    = □   (trous : 1)   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −25/□   (trous : −25/λ²)   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    ? ℓ″(λ) < 0 : que peut-on conclure ? ✔ ℓ est concave : λ̂ est le maximum global / · Rien à vérifier : ℓ′(λ̂) = 0 suffit / · λ̂ est un minimum
    = 25/1²   ← −ℓ″(λ̂)
    = □   (trous : 25)   ← Information observée
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = 25/λ-25 = 0, donc λ̂ = □ | λ̂ = 1
  pièges : p_mle_solve, p_wald_sign, p_mle_no_check, p_mle_constant_kept

X₁, …, Xₙ (n = 64) sont iid de loi exp(λ), de densité λe^(−λx) pour x > 0. On observe Σxᵢ = 256. Trouve le maximum de vraisemblance λ̂.
  [guided]  x̄
    = 256/□   (trous : 256/64)   ← x̄ = Σxᵢ/n
    = 4   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λe^(−λxᵢ) = λ^64·e^(−256λ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = □ln(λ) − 256λ   (trous : 64ln(λ) − 256λ)   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = 64/λ − □   (trous : 64/λ − 256)   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = 64/□   (trous : 64/256)   ← ℓ′(λ̂) = 0
    = □   (trous : 0,25)   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −64/□   (trous : −64/λ²)   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    ? ℓ″(λ) < 0 : que peut-on conclure ? ✔ ℓ est concave : λ̂ est le maximum global / · Rien à vérifier : ℓ′(λ̂) = 0 suffit / · λ̂ est un minimum
    = 64/0,25²   ← −ℓ″(λ̂)
    = □   (trous : 1024)   ← Information observée
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = 64/λ-256 = 0, donc λ̂ = □ | λ̂ = 0,25
  pièges : p_mle_solve, p_wald_sign, p_mle_no_check, p_mle_constant_kept

X₁, …, Xₙ (n = 16) sont iid de loi exp(λ), de densité λe^(−λx) pour x > 0. On observe Σxᵢ = 32. Trouve le maximum de vraisemblance λ̂.
  [guided]  x̄
    = 32/□   (trous : 32/16)   ← x̄ = Σxᵢ/n
    = 2   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λe^(−λxᵢ) = λ^16·e^(−32λ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = □ln(λ) − 32λ   (trous : 16ln(λ) − 32λ)   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = 16/λ − □   (trous : 16/λ − 32)   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = 16/□   (trous : 16/32)   ← ℓ′(λ̂) = 0
    = □   (trous : 0,5)   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −16/□   (trous : −16/λ²)   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    ? ℓ″(λ) < 0 : que peut-on conclure ? ✔ ℓ est concave : λ̂ est le maximum global / · Rien à vérifier : ℓ′(λ̂) = 0 suffit / · λ̂ est un minimum
    = 16/0,5²   ← −ℓ″(λ̂)
    = □   (trous : 64)   ← Information observée
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = 16/λ-32 = 0, donc λ̂ = □ | λ̂ = 0,5
  pièges : p_mle_solve, p_wald_sign, p_mle_no_check, p_mle_constant_kept

```

### Niveau 3

```
X₁, …, Xₙ (n = 32) sont iid de loi géométrique Pr(X = x) = (1 − p)ˣp pour x = 0, 1, … (le nombre d'échecs avant le premier succès). On observe Σxᵢ = 32. Trouve le maximum de vraisemblance p̂, puis son erreur standard asymptotique.
  [tap, suivre l'erreur, menu menu]  x̄
    = 32/32   ← x̄ = Σxᵢ/n
    = 1   ← Calculer
  — ℓ(p)  [juge prob]  départ : ℓ(p)
    (L(p) = Π (1 − p)^(xᵢ)p = p^32·(1 − p)^32 (ℓ est comparée à une constante près : les termes sans p peuvent rester ou partir))
    = 32ln(p) + 32ln(1 − p)   ← ℓ = ln L (à une constante près)
  — ℓ′(p)  [juge prob]  départ : ℓ′(p)
    = 32/p − 32/(1 − p)   ← Dériver en p
  — p̂  [juge prob]  départ : p̂
    = 32/(32 + 32)   ← ℓ′(p̂) = 0
    = 0,5   ← Calculer
  — ℓ″(p)  [juge prob]  départ : ℓ″(p)
    = −32/p² − 32/(1 − p)²   ← Dériver encore
  — J(p̂)  [juge prob]  départ : J(p̂)
    ? ℓ″(p) < 0 : que peut-on conclure ? ✔ ℓ est concave : p̂ est le maximum global / · Rien à vérifier : ℓ′(p̂) = 0 suffit / · p̂ est un minimum
    = 32/0,5² + 32/(1 − 0,5)²   ← −ℓ″(p̂)
    = 256   ← Information observée
  — se(p̂)  [juge prob]  départ : se(p̂)
    = 1/√256   ← Var ≈ 1/J
    = 0,0625   ← Erreur standard
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en p seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(p) = 32/p-32/(1-p) = 0, donc p̂ = □ | p̂ = 0,5
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_mle_constant_kept

X₁, …, Xₙ (n = 50) sont iid de loi la loi de densité √θ·e^(−θx)/√(πx) pour x > 0. On observe Σxᵢ = 100. Trouve le maximum de vraisemblance θ̂, puis son erreur standard asymptotique.
  [tap, suivre l'erreur, menu menu]  x̄
    = 100/50   ← x̄ = Σxᵢ/n
    = 2   ← Calculer
  — ℓ(θ)  [juge prob]  départ : ℓ(θ)
    (L(θ) ∝ θ^(50/2)·e^(−100θ) (ℓ est comparée à une constante près : les termes sans θ peuvent rester ou partir))
    = 50/2·ln(θ) − 100θ   ← ℓ = ln L (à une constante près)
  — ℓ′(θ)  [juge prob]  départ : ℓ′(θ)
    = 50/(2θ) − 100   ← Dériver en θ
  — θ̂  [juge prob]  départ : θ̂
    = 50/(2·100)   ← ℓ′(θ̂) = 0
    = 0,25   ← Calculer
  — ℓ″(θ)  [juge prob]  départ : ℓ″(θ)
    = −50/(2θ²)   ← Dériver encore
  — J(θ̂)  [juge prob]  départ : J(θ̂)
    ? ℓ″(θ) < 0 : que peut-on conclure ? ✔ ℓ est concave : θ̂ est le maximum global / · Rien à vérifier : ℓ′(θ̂) = 0 suffit / · θ̂ est un minimum
    = 50/(2·0,25²)   ← −ℓ″(θ̂)
    = 400   ← Information observée
  — se(θ̂)  [juge prob]  départ : se(θ̂)
    = 1/√400   ← Var ≈ 1/J
    = 0,05   ← Erreur standard
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en θ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(θ) = 50/(2θ)-100 = 0, donc θ̂ = □ | θ̂ = 0,25
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_mle_constant_kept

X₁, …, Xₙ (n = 100) sont iid de loi exp(λ), de densité λe^(−λx) pour x > 0. On observe Σxᵢ = 50. Trouve le maximum de vraisemblance λ̂, puis son erreur standard asymptotique.
  [tap, suivre l'erreur, menu menu]  x̄
    = 50/100   ← x̄ = Σxᵢ/n
    = 0,5   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λe^(−λxᵢ) = λ^100·e^(−50λ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = 100ln(λ) − 50λ   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = 100/λ − 50   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = 100/50   ← ℓ′(λ̂) = 0
    = 2   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −100/λ²   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    ? ℓ″(λ) < 0 : que peut-on conclure ? ✔ ℓ est concave : λ̂ est le maximum global / · Rien à vérifier : ℓ′(λ̂) = 0 suffit / · λ̂ est un minimum
    = 100/2²   ← −ℓ″(λ̂)
    = 25   ← Information observée
  — se(λ̂)  [juge prob]  départ : se(λ̂)
    = 1/√25   ← Var ≈ 1/J
    = 0,2   ← Erreur standard
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en λ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(λ) = 100/λ-50 = 0, donc λ̂ = □ | λ̂ = 2
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_mle_constant_kept

```

### Niveau 4

```
X₁, …, Xₙ (n = 50) sont iid de loi la loi de densité √θ·e^(−θx)/√(πx) pour x > 0. On observe Σxᵢ = 100. Trouve le maximum de vraisemblance θ̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
  [free, suivre l'erreur]  x̄
    = 100/50   ← x̄ = Σxᵢ/n
    = 2   ← Calculer
  — ℓ(θ)  [juge prob]  départ : ℓ(θ)
    (L(θ) ∝ θ^(50/2)·e^(−100θ) (ℓ est comparée à une constante près : les termes sans θ peuvent rester ou partir))
    = 50/2·ln(θ) − 100θ   ← ℓ = ln L (à une constante près)
  — ℓ′(θ)  [juge prob]  départ : ℓ′(θ)
    = 50/(2θ) − 100   ← Dériver en θ
  — θ̂  [juge prob]  départ : θ̂
    = 50/(2·100)   ← ℓ′(θ̂) = 0
    = 0,25   ← Calculer
  — ℓ″(θ)  [juge prob]  départ : ℓ″(θ)
    = −50/(2θ²)   ← Dériver encore
  — J(θ̂)  [juge prob]  départ : J(θ̂)
    ? ℓ″(θ) < 0 : que peut-on conclure ? ✔ ℓ est concave : θ̂ est le maximum global / · Rien à vérifier : ℓ′(θ̂) = 0 suffit / · θ̂ est un minimum
    = 50/(2·0,25²)   ← −ℓ″(θ̂)
    = 400   ← Information observée
  — se(θ̂)  [juge prob]  départ : se(θ̂)
    = 1/√400   ← Var ≈ 1/J
    = 0,05   ← Erreur standard
  — IC₉₅  [juge stat]  départ : IC_95
    = [0,152 ; 0,348]   ← 0,25 ± 1,96 · 0,05
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en θ seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(θ) = 50/(2θ)-100 = 0, donc θ̂ = □ | θ̂ = 0,25
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_ci_prob, p_ci_data, p_mle_constant_kept

X₁, …, Xₙ (n = 8) sont iid de loi géométrique Pr(X = x) = (1 − p)ˣp pour x = 0, 1, … (le nombre d'échecs avant le premier succès). On observe Σxᵢ = 8. Trouve le maximum de vraisemblance p̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
  [free, suivre l'erreur]  x̄
    = 8/8   ← x̄ = Σxᵢ/n
    = 1   ← Calculer
  — ℓ(p)  [juge prob]  départ : ℓ(p)
    (L(p) = Π (1 − p)^(xᵢ)p = p^8·(1 − p)^8 (ℓ est comparée à une constante près : les termes sans p peuvent rester ou partir))
    = 8ln(p) + 8ln(1 − p)   ← ℓ = ln L (à une constante près)
  — ℓ′(p)  [juge prob]  départ : ℓ′(p)
    = 8/p − 8/(1 − p)   ← Dériver en p
  — p̂  [juge prob]  départ : p̂
    = 8/(8 + 8)   ← ℓ′(p̂) = 0
    = 0,5   ← Calculer
  — ℓ″(p)  [juge prob]  départ : ℓ″(p)
    = −8/p² − 8/(1 − p)²   ← Dériver encore
  — J(p̂)  [juge prob]  départ : J(p̂)
    ? ℓ″(p) < 0 : que peut-on conclure ? ✔ ℓ est concave : p̂ est le maximum global / · Rien à vérifier : ℓ′(p̂) = 0 suffit / · p̂ est un minimum
    = 8/0,5² + 8/(1 − 0,5)²   ← −ℓ″(p̂)
    = 64   ← Information observée
  — se(p̂)  [juge prob]  départ : se(p̂)
    = 1/√64   ← Var ≈ 1/J
    = 0,125   ← Erreur standard
  — IC₉₅  [juge stat]  départ : IC_95
    = [0,255 ; 0,745]   ← 0,5 ± 1,96 · 0,125
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en p seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(p) = 8/p-8/(1-p) = 0, donc p̂ = □ | p̂ = 0,5
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_ci_prob, p_ci_data, p_mle_constant_kept

X₁, …, Xₙ (n = 32) sont iid de loi géométrique Pr(X = x) = (1 − p)ˣp pour x = 0, 1, … (le nombre d'échecs avant le premier succès). On observe Σxᵢ = 32. Trouve le maximum de vraisemblance p̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
  [free, suivre l'erreur]  x̄
    = 32/32   ← x̄ = Σxᵢ/n
    = 1   ← Calculer
  — ℓ(p)  [juge prob]  départ : ℓ(p)
    (L(p) = Π (1 − p)^(xᵢ)p = p^32·(1 − p)^32 (ℓ est comparée à une constante près : les termes sans p peuvent rester ou partir))
    = 32ln(p) + 32ln(1 − p)   ← ℓ = ln L (à une constante près)
  — ℓ′(p)  [juge prob]  départ : ℓ′(p)
    = 32/p − 32/(1 − p)   ← Dériver en p
  — p̂  [juge prob]  départ : p̂
    = 32/(32 + 32)   ← ℓ′(p̂) = 0
    = 0,5   ← Calculer
  — ℓ″(p)  [juge prob]  départ : ℓ″(p)
    = −32/p² − 32/(1 − p)²   ← Dériver encore
  — J(p̂)  [juge prob]  départ : J(p̂)
    ? ℓ″(p) < 0 : que peut-on conclure ? ✔ ℓ est concave : p̂ est le maximum global / · Rien à vérifier : ℓ′(p̂) = 0 suffit / · p̂ est un minimum
    = 32/0,5² + 32/(1 − 0,5)²   ← −ℓ″(p̂)
    = 256   ← Information observée
  — se(p̂)  [juge prob]  départ : se(p̂)
    = 1/√256   ← Var ≈ 1/J
    = 0,0625   ← Erreur standard
  — IC₉₅  [juge stat]  départ : IC_95
    = [0,378 ; 0,623]   ← 0,5 ± 1,96 · 0,0625
  aides : Le logarithme transforme le produit en somme ; dérive ensuite en p seulement, annule, puis vérifie le signe de ℓ″. | ℓ′(p) = 32/p-32/(1-p) = 0, donc p̂ = □ | p̂ = 0,5
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_ci_prob, p_ci_data, p_mle_constant_kept

```

### Niveau 5

```
X₁, …, Xₙ (n = 20) sont iid de loi géométrique Pr(X = x) = (1 − p)ˣp pour x = 0, 1, … (le nombre d'échecs avant le premier succès). On observe Σxᵢ = 80. Trouve le maximum de vraisemblance p̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
  [free, sans aide]  x̄
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
  — IC₉₅  [juge stat]  départ : IC_95
    = [0,122 ; 0,278]   ← 0,2 ± 1,96 · 0,04
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_ci_prob, p_ci_data, p_mle_constant_kept

X₁, …, Xₙ (n = 64) sont iid de loi exp(λ), de densité λe^(−λx) pour x > 0. On observe Σxᵢ = 32. Trouve le maximum de vraisemblance λ̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
  [free, sans aide]  x̄
    = 32/64   ← x̄ = Σxᵢ/n
    = 0,5   ← Calculer
  — ℓ(λ)  [juge prob]  départ : ℓ(λ)
    (L(λ) = Π λe^(−λxᵢ) = λ^64·e^(−32λ) (ℓ est comparée à une constante près : les termes sans λ peuvent rester ou partir))
    = 64ln(λ) − 32λ   ← ℓ = ln L (à une constante près)
  — ℓ′(λ)  [juge prob]  départ : ℓ′(λ)
    = 64/λ − 32   ← Dériver en λ
  — λ̂  [juge prob]  départ : λ̂
    = 64/32   ← ℓ′(λ̂) = 0
    = 2   ← Calculer
  — ℓ″(λ)  [juge prob]  départ : ℓ″(λ)
    = −64/λ²   ← Dériver encore
  — J(λ̂)  [juge prob]  départ : J(λ̂)
    ? ℓ″(λ) < 0 : que peut-on conclure ? ✔ ℓ est concave : λ̂ est le maximum global / · Rien à vérifier : ℓ′(λ̂) = 0 suffit / · λ̂ est un minimum
    = 64/2²   ← −ℓ″(λ̂)
    = 16   ← Information observée
  — se(λ̂)  [juge prob]  départ : se(λ̂)
    = 1/√16   ← Var ≈ 1/J
    = 0,25   ← Erreur standard
  — IC₉₅  [juge stat]  départ : IC_95
    = [1,51 ; 2,49]   ← 2 ± 1,96 · 0,25
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_ci_prob, p_ci_data, p_mle_constant_kept

X₁, …, Xₙ (n = 400) sont iid de loi Bernoulli de paramètre p. On observe le nombre de succès S = 80. Trouve le maximum de vraisemblance p̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
  [free, sans aide]  x̄
    = 80/400   ← x̄ = S/n
    = 0,2   ← Calculer
  — ℓ(p)  [juge prob]  départ : ℓ(p)
    (L(p) = p^80·(1 − p)^320 (ℓ est comparée à une constante près : les termes sans p peuvent rester ou partir))
    = 80ln(p) + 320ln(1 − p)   ← ℓ = ln L (à une constante près)
  — ℓ′(p)  [juge prob]  départ : ℓ′(p)
    = 80/p − 320/(1 − p)   ← Dériver en p
  — p̂  [juge prob]  départ : p̂
    = 80/400   ← ℓ′(p̂) = 0
    = 0,2   ← Calculer
  — ℓ″(p)  [juge prob]  départ : ℓ″(p)
    = −80/p² − 320/(1 − p)²   ← Dériver encore
  — J(p̂)  [juge prob]  départ : J(p̂)
    ? ℓ″(p) < 0 : que peut-on conclure ? ✔ ℓ est concave : p̂ est le maximum global / · Rien à vérifier : ℓ′(p̂) = 0 suffit / · p̂ est un minimum
    = 80/0,2² + 320/(1 − 0,2)²   ← −ℓ″(p̂)
    = 2500   ← Information observée
  — se(p̂)  [juge prob]  départ : se(p̂)
    = 1/√2500   ← Var ≈ 1/J
    = 0,02   ← Erreur standard
  — IC₉₅  [juge stat]  départ : IC_95
    = [0,161 ; 0,239]   ← 0,2 ± 1,96 · 0,02
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_ci_prob, p_ci_data, p_mle_constant_kept

```

### Variantes d'examen

```
X₁, …, Xₙ (n = 200) iid de loi la loi de densité √θ·e^(−θx)/√(πx) pour x > 0 ; Σxᵢ = 200. Quelle est la log-vraisemblance (à une constante près) ?
  · ℓ(θ) = 200ln(θ)-200 [p_mle_constant_kept]   · ℓ(θ) = ln(θ)^200-200θ [g2_log_power]   ✔ ℓ(θ) = 200/2×ln(θ)-200θ   · ℓ(θ) = 200θ-200ln(θ)
  [examen mcq]
  pièges : g2_log_power, p_mle_constant_kept

Vrai ou faux ?
  « Pour ℓ(θ) = θ³ − 3θ, tout θ où ℓ′(θ) = 0 est un maximum de ℓ. » → FAUX
    contre-exemple (refute) : t = 1
  [examen tf]
  pièges : p_mle_no_check

X₁, …, Xₙ (n = 16) sont iid de loi exp(λ), de densité λe^(−λx) pour x > 0. On observe Σxᵢ = 8. Trouve le maximum de vraisemblance λ̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
  [free, sans aide, examen coef]  λ̂
    = 16/8   ← ℓ′(λ̂) = 0
    = 2   ← Calculer
  pièges : p_mle_solve

X₁, …, Xₙ (n = 50) sont iid de loi la loi de densité √θ·e^(−θx)/√(πx) pour x > 0. On observe Σxᵢ = 25. Trouve le maximum de vraisemblance θ̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
  [problème, examen open, 10 points]
  partie 1 (X₁, …, Xₙ (n = 50) sont iid de loi la loi de densité √θ·e^(−θx)/√(πx) pour x > 0. On observe Σxᵢ = 25. Trouve le maximum de vraisemblance θ̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %. : 1,5 ; ℓ(θ) : 1 ; ℓ′(θ) : 1 ; θ̂ : 1,5 ; ℓ″(θ) : 1 ; J(θ̂) : 1 ; se(θ̂) : 1 ; IC₉₅ : 1)
  X₁, …, Xₙ (n = 50) sont iid de loi la loi de densité √θ·e^(−θx)/√(πx) pour x > 0. On observe Σxᵢ = 25. Trouve le maximum de vraisemblance θ̂, puis son erreur standard asymptotique et l'IC de Wald à 95 %.
    [free, sans aide, suivre l'erreur, examen open]  x̄
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
      = 50/(2·1²)   ← −ℓ″(θ̂)
      = 25   ← Information observée
    — se(θ̂)  [juge prob]  départ : se(θ̂)
      = 1/√25   ← Var ≈ 1/J
      = 0,2   ← Erreur standard
    — IC₉₅  [juge stat]  départ : IC_95
      = [0,608 ; 1,392]   ← 1 ± 1,96 · 0,2
  partie 2 (Interpréter : 1)
  Interpréter : sur quoi repose cet IC de Wald ?
    · 95 % des données sont dans cet intervalle. [p_ci_data]   · Le paramètre est dans cet intervalle avec la probabilité 0,95. [p_ci_prob]   ✔ Il est approché : valable si n est grand et si le modèle est régulier (le support ne dépend pas du paramètre).   · Il est exact pour tout n.
    [examen open]
  pièges : p_mle_solve, p_wald_sign, p_wald_var_inverse, p_mle_no_check, p_ci_prob, p_ci_data, p_mle_constant_kept

```

## MLE au bord du support ; invariance (`p-mle-special`, BA3)

_Si le support dépend de θ, ℓ′ = 0 ne marche pas._

### Niveau 1

```
Les données 7 ; 3 ; 11 ; 2 ; 11 ; 5 ; 6 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂.
  [guided]  θ̂
    (L(θ) = θ^−7 si θ ≥ 11, et 0 sinon.)
    (Peut-on annuler ℓ′ ? Non : ℓ′(θ) = −7/θ ne s'annule pas ; L vaut 0 si θ < 11, puis décroît : le maximum est au bord, en 11.)
    = □   (trous : 11)   ← θ̂ = max xᵢ
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−7 pour θ ≥ □ | θ̂ = 11
  pièges : p_mle_support

Les données 3 ; 4 ; 4 ; 15 ; 1 ; 14 ; 8 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂.
  [guided]  θ̂
    (L(θ) = θ^−7 si θ ≥ 15, et 0 sinon.)
    (Peut-on annuler ℓ′ ? Non : ℓ′(θ) = −7/θ ne s'annule pas ; L vaut 0 si θ < 15, puis décroît : le maximum est au bord, en 15.)
    = □   (trous : 15)   ← θ̂ = max xᵢ
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−7 pour θ ≥ □ | θ̂ = 15
  pièges : p_mle_support

Les données 2 ; 8 ; 4 ; 15 ; 15 ; 6 ; 3 ; 15 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂.
  [guided]  θ̂
    (L(θ) = θ^−8 si θ ≥ 15, et 0 sinon.)
    (Peut-on annuler ℓ′ ? Non : ℓ′(θ) = −8/θ ne s'annule pas ; L vaut 0 si θ < 15, puis décroît : le maximum est au bord, en 15.)
    = □   (trous : 15)   ← θ̂ = max xᵢ
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−8 pour θ ≥ □ | θ̂ = 15
  pièges : p_mle_support

```

### Niveau 2

```
Les données 15 ; 2 ; 6 ; 14 ; 11 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 1).
  [guided]  θ̂
    (L(θ) = θ^−5 si θ ≥ 15, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −5/θ ne s'annule pas ; L vaut 0 si θ < 15, puis décroît : le maximum est au bord, en 15 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = □   (trous : 15)   ← θ̂ = max xᵢ
  — Pr(X≤1)  [juge prob]  départ : Pr(X ≤ 1)
    = 1/□   (trous : 1/15)   ← Pr(X ≤ c) = c/θ, en θ̂
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−5 pour θ ≥ □ | θ̂ = 15
  pièges : p_mle_support, p_mle_invariance_ignored

Les données 11 ; 15 ; 4 ; 6 ; 3 ; 3 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 9).
  [guided]  θ̂
    (L(θ) = θ^−6 si θ ≥ 15, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −6/θ ne s'annule pas ; L vaut 0 si θ < 15, puis décroît : le maximum est au bord, en 15 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = □   (trous : 15)   ← θ̂ = max xᵢ
  — Pr(X≤9)  [juge prob]  départ : Pr(X ≤ 9)
    = 9/□   (trous : 9/15)   ← Pr(X ≤ c) = c/θ, en θ̂
    = □   (trous : 0,6)   ← Calculer
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−6 pour θ ≥ □ | θ̂ = 15
  pièges : p_mle_support, p_mle_invariance_ignored

Les données 13 ; 11 ; 3 ; 12 ; 3 ; 12 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 3).
  [guided]  θ̂
    (L(θ) = θ^−6 si θ ≥ 13, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −6/θ ne s'annule pas ; L vaut 0 si θ < 13, puis décroît : le maximum est au bord, en 13 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = □   (trous : 13)   ← θ̂ = max xᵢ
  — Pr(X≤3)  [juge prob]  départ : Pr(X ≤ 3)
    = 3/□   (trous : 3/13)   ← Pr(X ≤ c) = c/θ, en θ̂
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−6 pour θ ≥ □ | θ̂ = 13
  pièges : p_mle_support, p_mle_invariance_ignored

```

### Niveau 3

```
Les données 7 ; 10 ; 12 ; 11 ; 10 ; 7 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 8).
  [tap, suivre l'erreur, menu menu]  θ̂
    (L(θ) = θ^−6 si θ ≥ 12, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −6/θ ne s'annule pas ; L vaut 0 si θ < 12, puis décroît : le maximum est au bord, en 12 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 12   ← θ̂ = max xᵢ
  — Pr(X≤8)  [juge prob]  départ : Pr(X ≤ 8)
    = 8/12   ← Pr(X ≤ c) = c/θ, en θ̂
    = 2/3   ← Calculer
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−6 pour θ ≥ □ | θ̂ = 12
  pièges : p_mle_support, p_mle_invariance_ignored

Les données 1 ; 1 ; 9 ; 15 ; 8 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 14).
  [tap, suivre l'erreur, menu menu]  θ̂
    (L(θ) = θ^−5 si θ ≥ 15, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −5/θ ne s'annule pas ; L vaut 0 si θ < 15, puis décroît : le maximum est au bord, en 15 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 15   ← θ̂ = max xᵢ
  — Pr(X≤14)  [juge prob]  départ : Pr(X ≤ 14)
    = 14/15   ← Pr(X ≤ c) = c/θ, en θ̂
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−5 pour θ ≥ □ | θ̂ = 15
  pièges : p_mle_support, p_mle_invariance_ignored

Les données 6 ; 14 ; 9 ; 5 ; 4 ; 7 ; 12 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 3).
  [tap, suivre l'erreur, menu menu]  θ̂
    (L(θ) = θ^−7 si θ ≥ 14, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −7/θ ne s'annule pas ; L vaut 0 si θ < 14, puis décroît : le maximum est au bord, en 14 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 14   ← θ̂ = max xᵢ
  — Pr(X≤3)  [juge prob]  départ : Pr(X ≤ 3)
    = 3/14   ← Pr(X ≤ c) = c/θ, en θ̂
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−7 pour θ ≥ □ | θ̂ = 14
  pièges : p_mle_support, p_mle_invariance_ignored

```

### Niveau 4

```
Les données 2 ; 6 ; 8 ; 5 ; 6 ; 7 ; 9 sont iid de densité f(x ; θ) = e^(−(x − θ)) pour x ≥ θ (0 sinon). Trouve le maximum de vraisemblance θ̂.
  [free, suivre l'erreur]  θ̂
    (L(θ) = e^(nθ − Σxᵢ) si θ ≤ min xᵢ = 2, et 0 sinon : L croît jusqu'au bord.)
    ? Où L est-elle maximale ? ✔ Au bord : L croît tant que θ ≤ 2, puis vaut 0 / · ℓ′ = n ne s'annule jamais : pas de maximum
    = 2   ← θ̂ = min xᵢ
  aides : Le support dépend de θ : regarde pour quels θ la vraisemblance n'est pas nulle. | L(θ) croît sur ]−∞ ; □] | θ̂ = 2
  pièges : p_mle_support

Les données 15 ; 1 ; −8 ; 15 ; −7 ; 7 ; 15 ; −10 sont iid de loi U[−θ ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(|X| ≤ 7).
  [free, suivre l'erreur]  θ̂
    (L(θ) = (2θ)^−8 si θ ≥ 15, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −8/θ ne s'annule pas ; L vaut 0 si θ < 15, puis décroît : le maximum est au bord, en 15 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 15   ← θ̂ = max|xᵢ|
  — Pr(|X|≤7)  [juge prob]  départ : Pr(|X| ≤ 7)
    = 7/15   ← Pr(|X| ≤ c) = c/θ, en θ̂
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−8 pour θ ≥ □ | θ̂ = 15
  pièges : p_mle_invariance_ignored, p_mle_support

Les données 13 ; 11 ; 12 ; 4 ; 6 ; 12 ; 7 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 12).
  [free, suivre l'erreur]  θ̂
    (L(θ) = θ^−7 si θ ≥ 13, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −7/θ ne s'annule pas ; L vaut 0 si θ < 13, puis décroît : le maximum est au bord, en 13 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 13   ← θ̂ = max xᵢ
  — Pr(X≤12)  [juge prob]  départ : Pr(X ≤ 12)
    = 12/13   ← Pr(X ≤ c) = c/θ, en θ̂
  aides : Dessine L(θ) : elle vaut 0 tant que θ est plus petit qu'une donnée, puis décroît. | L(θ) = θ^−7 pour θ ≥ □ | θ̂ = 13
  pièges : p_mle_support, p_mle_invariance_ignored

```

### Niveau 5

```
Les données 9 ; 15 ; 9 ; 5 ; 3 ; 3 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 6).
  [free, sans aide]  θ̂
    (L(θ) = θ^−6 si θ ≥ 15, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −6/θ ne s'annule pas ; L vaut 0 si θ < 15, puis décroît : le maximum est au bord, en 15 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 15   ← θ̂ = max xᵢ
  — Pr(X≤6)  [juge prob]  départ : Pr(X ≤ 6)
    = 6/15   ← Pr(X ≤ c) = c/θ, en θ̂
    = 0,4   ← Calculer
  pièges : p_mle_support, p_mle_invariance_ignored

Les données 13 ; 13 ; 7 ; 13 ; 12 ; 6 ; 15 ; 15 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 3).
  [free, sans aide]  θ̂
    (L(θ) = θ^−8 si θ ≥ 15, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −8/θ ne s'annule pas ; L vaut 0 si θ < 15, puis décroît : le maximum est au bord, en 15 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 15   ← θ̂ = max xᵢ
  — Pr(X≤3)  [juge prob]  départ : Pr(X ≤ 3)
    = 3/15   ← Pr(X ≤ c) = c/θ, en θ̂
    = 0,2   ← Calculer
  pièges : p_mle_support, p_mle_invariance_ignored

Les données 9 ; 1 ; 5 ; 1 ; 9 ; 9 ; 3 ; 5 sont iid de loi U[0 ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(X ≤ 8).
  [free, sans aide]  θ̂
    (L(θ) = θ^−8 si θ ≥ 9, et 0 sinon.)
    ? Peut-on annuler ℓ′ ? ✔ Non : ℓ′(θ) = −8/θ ne s'annule pas ; L vaut 0 si θ < 9, puis décroît : le maximum est au bord, en 9 / · ℓ′ ne s'annule jamais : il n'y a pas de maximum de vraisemblance / · On prend l'estimateur des moments 2x̄
    = 9   ← θ̂ = max xᵢ
  — Pr(X≤8)  [juge prob]  départ : Pr(X ≤ 8)
    = 8/9   ← Pr(X ≤ c) = c/θ, en θ̂
  pièges : p_mle_support, p_mle_invariance_ignored

```

### Variantes d'examen

```
X₁, …, Xₙ iid de loi exponentielle de moyenne θ (le MLE de θ est X̄). Quel est le maximum de vraisemblance de Pr(X ≤ 2) ?
  · (1/n)·Σ 1{Xᵢ ≤ 2} [p_mle_invariance_ignored]   · 1 − e^(−2X̄) [p_exp_rate_mean]   ✔ 1 − e^(−2/X̄)   · Il n'existe pas [p_mle_support]
  [examen mcq]
  pièges : p_mle_invariance_ignored, p_exp_rate_mean, p_mle_support

Vrai ou faux ?
  « Pour des données positives de U[0 ; θ], l'estimateur 2x̄ est toujours au moins égal à max xᵢ (la vraisemblance y est donc non nulle). » → FAUX
    contre-exemple (refute) : a = 0, b = 1, c = 9
  [examen tf]
  pièges : p_mle_support

Les données 3 ; 12 ; 4 ; 7 ; 8 sont iid de loi U[−θ ; θ]. Trouve le maximum de vraisemblance θ̂, puis celui de Pr(|X| ≤ 10).
  [free, sans aide, examen coef]  θ̂
    (L(θ) = (2θ)^−5 si θ ≥ 12, et 0 sinon.)
    = 12   ← θ̂ = max|xᵢ|
  pièges : p_mle_support

```

## Biais, variance, erreur quadratique moyenne, consistance (`p-bias-mse`, BA3)

_Biais(θ̂) = E[θ̂] − θ ; EQM = E[(θ̂ − θ)²] = var(θ̂) + biais² ; θ̂ est consistant s'il tend vers θ en probabilité (il suffit que l'EQM…_

### Niveau 1

```
Y₁, …, Yₙ sont iid de densité f(y) = 5y^4/θ^5 sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le.
  [guided]  E[Y]
    = □θ/6   (trous : 5θ/6)   ← ∫₀^θ 5y^5/θ^5 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/6   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = □   (trous : 1,2)   ← c·5/6θ = θ
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (1,2)² · 5/252θ²/□ | var(θ̂) = θ^2/(35n)

Y₁, …, Yₙ sont iid de densité f(y) = 4y^3/θ^4 sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le.
  [guided]  E[Y]
    = □θ/5   (trous : 4θ/5)   ← ∫₀^θ 4y^4/θ^4 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/5   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = □   (trous : 1,25)   ← c·0,8θ = θ
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (1,25)² · 2/75θ²/□ | var(θ̂) = θ^2/(24n)

Y₁, …, Yₙ sont iid de densité f(y) = 4y^3/θ^4 sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le.
  [guided]  E[Y]
    = □θ/5   (trous : 4θ/5)   ← ∫₀^θ 4y^4/θ^4 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/5   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = □   (trous : 1,25)   ← c·0,8θ = θ
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (1,25)² · 2/75θ²/□ | var(θ̂) = θ^2/(24n)

```

### Niveau 2

```
Y₁, …, Yₙ sont iid de densité f(y) = 5y^4/θ^5 sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
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

Y₁, …, Yₙ sont iid de densité f(y) = 5y^4/θ^5 sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
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

Y₁, …, Yₙ sont iid de densité f(y) = 4y^3/θ^4 sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
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
Y₁, …, Yₙ sont iid de densité f(y) = 4y^3/θ^4 sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
  [tap, suivre l'erreur, menu menu]  E[Y]
    = 4θ/5   ← ∫₀^θ 4y^4/θ^4 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/5   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = 1,25   ← c·0,8θ = θ
  — E[Y²]  [juge prob]  départ : E[Y²]
    = 2θ²/3   ← ∫₀^θ 4y^5/θ^4 dy
  — var(Y)  [juge prob]  départ : var(Y)
    = 2θ²/75   ← Simplifier
  — var(θ̂)  [juge prob]  départ : var(θ̂)
    = θ²/(24n)   ← (1,25)² · var(Y)/n
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (1,25)² · 2/75θ²/□ | var(θ̂) = θ^2/(24n)
  pièges : p_var_scale, p_se_forgot_sqrt_n, p_unbiased_better, p_mse_bias_not_squared

Y₁, …, Yₙ sont iid de densité f(y) = 5y^4/θ^5 sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
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

Y₁, …, Yₙ sont iid de densité f(y) = 3y^2/θ^3 sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
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

```

### Niveau 4

```
Y₁, …, Yₙ sont iid de densité f(y) = 5y^4/θ^5 sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
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

Y₁, …, Yₙ sont iid de densité f(y) = 2y^1/θ^2 sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
  [free, suivre l'erreur]  E[Y]
    = 2θ/3   ← ∫₀^θ 2y^2/θ^2 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/3   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = 1,5   ← c·2/3θ = θ
  — E[Y²]  [juge prob]  départ : E[Y²]
    = θ²/2   ← ∫₀^θ 2y^3/θ^2 dy
  — var(Y)  [juge prob]  départ : var(Y)
    = θ²/18   ← Simplifier
  — var(θ̂)  [juge prob]  départ : var(θ̂)
    = θ²/(8n)   ← (1,5)² · var(Y)/n
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (1,5)² · 1/18θ²/□ | var(θ̂) = θ^2/(8n)
  pièges : p_var_scale, p_se_forgot_sqrt_n, p_unbiased_better, p_mse_bias_not_squared

Y₁, …, Yₙ sont iid de densité f(y) = 2y^1/θ^2 sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
  [free, suivre l'erreur]  E[Y]
    = 2θ/3   ← ∫₀^θ 2y^2/θ^2 dy
  — biais(Ȳ)  [juge prob]  départ : biais(Ȳ)
    = −θ/3   ← E[Ȳ] = E[Y]
  — c  [juge prob]  départ : c
    = 1,5   ← c·2/3θ = θ
  — E[Y²]  [juge prob]  départ : E[Y²]
    = θ²/2   ← ∫₀^θ 2y^3/θ^2 dy
  — var(Y)  [juge prob]  départ : var(Y)
    = θ²/18   ← Simplifier
  — var(θ̂)  [juge prob]  départ : var(θ̂)
    = θ²/(8n)   ← (1,5)² · var(Y)/n
  aides : var(cȲ) = c²·var(Y)/n ; le biais est E[Ȳ] − θ. | var(θ̂) = (1,5)² · 1/18θ²/□ | var(θ̂) = θ^2/(8n)
  pièges : p_var_scale, p_se_forgot_sqrt_n, p_unbiased_better, p_mse_bias_not_squared

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

Y₁, …, Yₙ sont iid de densité f(y) = 5y^4/θ^5 sur ]0 ; θ[. L'estimateur Ȳ est-il sans biais pour θ ? Corrige-le et calcule la variance de l'estimateur corrigé θ̂ = c·Ȳ.
  [free, sans aide]  E[Y]
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
  pièges : p_var_scale, p_se_forgot_sqrt_n

X₁, …, Xₙ sont iid de loi U[0 ; θ]. Compare les erreurs quadratiques moyennes de 2X̄ (sans biais) et de M = max Xᵢ, sachant que E[M] = nθ/(n + 1) et var(M) = nθ²/((n + 1)²(n + 2)).
  [free, sans aide]  EQM(2X̄)
    = θ²/(3n)   ← 4 · (θ²/12)/n
  — biais(M)  [juge prob]  départ : biais(M)
    = −θ/(n + 1)   ← nθ/(n + 1) − θ
  — EQM(M)  [juge prob]  départ : EQM(M)
    = 2θ²/((n + 1)(n + 2))   ← var(M) + biais(M)², simplifié
  pièges : p_var_scale, p_mse_bias_not_squared

```

### Variantes d'examen

```
Y₁, …, Yₙ iid de densité 4y^3/θ^4 sur ]0 ; θ[. On pose θ̂ = (1,25)·Ȳ, sans biais. Que vaut var(θ̂) ?
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

_Score s(θ) = ℓ′(θ) ; information par observation I₁(θ) = Var(score d'une observation) = −E[∂²ln f(X ; θ)/∂θ²] ; pour n observations iid,…_

### Niveau 1

```
X₁, …, Xₙ sont iid de loi Poiss(λ). Calcule l'information de Fisher I₁(λ) d'une observation.
  [guided]  ∂ln f/∂λ
    (ln f(x ; λ) = x·ln λ − λ − ln(x!) (à une constante près).)
    = □   (trous : x/λ − 1)   ← Le score d'une observation
  — ∂²ln f/∂λ²  [juge prob]  départ : ∂²ln f/∂λ²
    = −x/λ²   ← Dériver deux fois
  — I₁(λ)  [juge prob]  départ : I_1(λ)
    = 1/λ   ← I₁ = −E[∂² ln f], avec E[X] = λ
  aides : Dérive deux fois ln f en λ, puis prends l'espérance de l'opposé. | I₁(λ) = −E[-x/λ^2] = □ | I₁(λ) = 1/λ
  pièges : p_fisher_sign

X₁, …, Xₙ sont iid de loi Poiss(λ). Calcule l'information de Fisher I₁(λ) d'une observation.
  [guided]  ∂ln f/∂λ
    (ln f(x ; λ) = x·ln λ − λ − ln(x!) (à une constante près).)
    = □   (trous : x/λ − 1)   ← Le score d'une observation
  — ∂²ln f/∂λ²  [juge prob]  départ : ∂²ln f/∂λ²
    = −x/λ²   ← Dériver deux fois
  — I₁(λ)  [juge prob]  départ : I_1(λ)
    = 1/λ   ← I₁ = −E[∂² ln f], avec E[X] = λ
  aides : Dérive deux fois ln f en λ, puis prends l'espérance de l'opposé. | I₁(λ) = −E[-x/λ^2] = □ | I₁(λ) = 1/λ
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
X₁, …, Xₙ sont iid de loi N(μ, 4) (variance connue). Calcule l'information de Fisher I₁(μ) d'une observation, puis la borne de Cramér-Rao.
  [guided]  ∂ln f/∂μ
    (ln f(x ; μ) = −(x − μ)²/8 (à une constante près).)
    = □   (trous : (x − μ)/4)   ← Le score d'une observation
  — ∂²ln f/∂μ²  [juge prob]  départ : ∂²ln f/∂μ²
    = −1/4   ← Dériver deux fois
  — I₁(μ)  [juge prob]  départ : I_1(μ)
    = 1/4   ← I₁ = −E[∂² ln f], avec la dérivée seconde est constante
  — borne de Cramér-Rao  [juge prob]  départ : borne de Cramér-Rao
    ? À quels estimateurs la borne s'applique-t-elle ? ✔ Aux estimateurs sans biais de μ / · À tous les estimateurs, même biaisés
    = 4/□   (trous : 4/n)   ← 1/(n·I₁)
  aides : Dérive deux fois ln f en μ, puis prends l'espérance de l'opposé. | I₁(μ) = −E[-1/4] = □ | I₁(μ) = 1/4
  pièges : p_fisher_sign, p_fisher_per_obs, p_cr_biased

X₁, …, Xₙ sont iid de loi N(μ, 4) (variance connue). Calcule l'information de Fisher I₁(μ) d'une observation, puis la borne de Cramér-Rao.
  [guided]  ∂ln f/∂μ
    (ln f(x ; μ) = −(x − μ)²/8 (à une constante près).)
    = □   (trous : (x − μ)/4)   ← Le score d'une observation
  — ∂²ln f/∂μ²  [juge prob]  départ : ∂²ln f/∂μ²
    = −1/4   ← Dériver deux fois
  — I₁(μ)  [juge prob]  départ : I_1(μ)
    = 1/4   ← I₁ = −E[∂² ln f], avec la dérivée seconde est constante
  — borne de Cramér-Rao  [juge prob]  départ : borne de Cramér-Rao
    ? À quels estimateurs la borne s'applique-t-elle ? ✔ Aux estimateurs sans biais de μ / · À tous les estimateurs, même biaisés
    = 4/□   (trous : 4/n)   ← 1/(n·I₁)
  aides : Dérive deux fois ln f en μ, puis prends l'espérance de l'opposé. | I₁(μ) = −E[-1/4] = □ | I₁(μ) = 1/4
  pièges : p_fisher_sign, p_fisher_per_obs, p_cr_biased

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

X₁, …, Xₙ sont iid de loi exp(λ). Calcule l'information de Fisher I₁(λ) d'une observation, puis la borne de Cramér-Rao.
  [tap, suivre l'erreur, menu menu]  ∂ln f/∂λ
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

### Niveau 4

```
X₁, …, Xₙ sont iid de loi N(0, v) (v = σ² inconnue). Calcule l'information de Fisher I₁(v) d'une observation, puis la borne de Cramér-Rao.
  [free, suivre l'erreur]  ∂ln f/∂v
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

X₁, …, Xₙ sont iid de loi N(0, v) (v = σ² inconnue). Calcule l'information de Fisher I₁(v) d'une observation, puis la borne de Cramér-Rao.
  [free, suivre l'erreur]  ∂ln f/∂v
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

X₁, …, Xₙ sont iid de loi N(0, v) (v = σ² inconnue). Calcule l'information de Fisher I₁(v) d'une observation, puis la borne de Cramér-Rao.
  [free, suivre l'erreur]  ∂ln f/∂v
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

```

### Niveau 5

```
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

X₁, …, Xₙ sont iid de loi Bernoulli de paramètre p. Calcule l'information de Fisher I₁(p) d'une observation, puis la borne de Cramér-Rao.
  [free, sans aide]  ∂ln f/∂p
    (ln f(x ; p) = x·ln p + (1 − x)·ln(1 − p) (à une constante près).)
    = x/p − (1 − x)/(1 − p)   ← Le score d'une observation
  — ∂²ln f/∂p²  [juge prob]  départ : ∂²ln f/∂p²
    = −x/p² − (1 − x)/(1 − p)²   ← Dériver deux fois
  — I₁(p)  [juge prob]  départ : I_1(p)
    = 1/(p(1 − p))   ← I₁ = −E[∂² ln f], avec E[X] = p
  — borne de Cramér-Rao  [juge prob]  départ : borne de Cramér-Rao
    ? À quels estimateurs la borne s'applique-t-elle ? ✔ Aux estimateurs sans biais de p / · À tous les estimateurs, même biaisés
    = p(1 − p)/n   ← 1/(n·I₁)
  pièges : p_fisher_sign, p_fisher_per_obs, p_cr_biased

```

### Variantes d'examen

```
X₁, …, Xₙ iid de loi Bernoulli de paramètre p ; I₁(p) = 1/(p(1-p)). Quelle est la borne de Cramér-Rao pour un estimateur sans biais de p ?
  · 1/(p(1-p))/n   · p(1-p) [p_fisher_per_obs]   ✔ p(1-p)/n   · -p(1-p)/n [p_fisher_sign]
  [examen mcq]
  pièges : p_fisher_per_obs, p_fisher_sign

Vrai ou faux ?
  « Pour X₁, …, Xₙ iid de loi N(μ, 4) (variance connue), tout estimateur de μ, biaisé ou non, a une variance au moins égale à 4/n. » → FAUX
    contre-exemple (refute) : w = 0
  [examen tf]
  pièges : p_cr_biased

```

## IC pour une moyenne : z ou Student (`p-ci-mean`, BA3)

_σ connu : x̄ ± z·σ/√n ; σ inconnu : x̄ ± t·s/√n avec ν = n − 1._

### Niveau 1

```
Un appareil de mesure a un écart-type connu σ = 10. On fait 36 mesures de moyenne x̄ = 300. On suppose les mesures normales. Donne l’intervalle de confiance à 99 % pour μ.
  [guided]  z
    (Quel pivot ? σ est connu : la loi normale.)
    = □   (trous : 2,576)   ← Table 2
  — σ/√n  [juge stat]  départ : σ/√n
    = 10/√(□)   (trous : 10/√(36))   ← Erreur standard
    = □   (trous : 1,667)
  — u  [juge stat]  départ : u
    = 2,576·□   (trous : 2,576·1,667)   ← Demi-largeur
    = □   (trous : 4,294)
  — IC  [juge stat]  départ : IC
    = [300 − □ ; 300 + 4,294]   (trous : [300 − 4,294 ; 300 + 4,294])   ← x̄ ± u
    = [□ ; □]   (trous : [295,706 ; 304,294])
  aides : σ est connu : x̄ ± z·σ/√n, avec z = Φ⁻¹(0,975) = 1,96 pour 95 %. | [300-□ ; 300+□] | IC = [295,706 ; 304,294]
  pièges : p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

Sur n = 31 mesures supposées normales, x̄ = 35 et s² = 31. Donne l’intervalle de confiance à 99 % pour μ.
  [guided]  t
    (Quel quantile ? Student à ν = 30 degrés de liberté, bilatéral : 2,75.)
    = □   (trous : 2,75)   ← Table 3, ν = 30
  — s/√n  [juge stat]  départ : s/√n
    = √(□/31)   (trous : √(31/31))   ← Erreur standard
    = □   (trous : 1)
  — u  [juge stat]  départ : u
    = 2,75·□   (trous : 2,75·1)   ← Demi-largeur
    = □   (trous : 2,75)
  — IC  [juge stat]  départ : IC
    = [35 − □ ; 35 + 2,75]   (trous : [35 − 2,75 ; 35 + 2,75])   ← x̄ ± u
    = [□ ; □]   (trous : [32,25 ; 37,75])
  aides : σ inconnu et n petit : Student à n − 1 = 30 degrés de liberté. | [35-□ ; 35+□] | IC = [32,25 ; 37,75]
  pièges : p_t_vs_z, p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

Sur n = 10 mesures supposées normales, x̄ = 25 et s² = 24. Donne l’intervalle de confiance à 95 % pour μ.
  [guided]  t
    (Quel quantile ? Student à ν = 9 degrés de liberté, bilatéral : 2,262.)
    = □   (trous : 2,262)   ← Table 3, ν = 9
  — s/√n  [juge stat]  départ : s/√n
    = √(24/□)   (trous : √(24/10))   ← Erreur standard
    = □   (trous : 1,549)
  — u  [juge stat]  départ : u
    = 2,262·□   (trous : 2,262·1,549)   ← Demi-largeur
    = □   (trous : 3,504)
  — IC  [juge stat]  départ : IC
    = [25 − □ ; 25 + 3,504]   (trous : [25 − 3,504 ; 25 + 3,504])   ← x̄ ± u
    = [□ ; □]   (trous : [21,496 ; 28,504])
  aides : σ inconnu et n petit : Student à n − 1 = 9 degrés de liberté. | [25-□ ; 25+□] | IC = [21,496 ; 28,504]
  pièges : p_t_vs_z, p_df_wrong, p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

```

### Niveau 2

```
Mesures supposées normales : 5 ; 15 ; 10 ; 5 ; 7 ; 15 ; 13 ; 15 ; 5. Donne l’intervalle de confiance à 95 % pour μ.
  [guided]  x̄
    = (5 + 15 + 10 + 5 + 7 + 15 + 13 + 15 + 5)/□   (trous : (5 + 15 + 10 + 5 + 7 + 15 + 13 + 15 + 5)/9)   ← Moyenne
    = □   (trous : 10)
  — s2  [juge prob]  départ : s²
    = (25 + 25 + 0 + 25 + 9 + 25 + 9 + 25 + 25)/□   (trous : (25 + 25 + 0 + 25 + 9 + 25 + 9 + 25 + 25)/8)   ← Écarts au carré, divisés par n − 1
    = □/8   (trous : 168/8)
    = □   (trous : 21)
  — t  [juge stat]  départ : t
    ? Quel quantile ? ✔ Student à ν = 8 degrés de liberté, bilatéral : 2,306 / · La loi normale : 1,96 / · Student à ν = 9 : 2,262
    = □   (trous : 2,306)   ← Table 3, ν = 8
  — s/√n  [juge stat]  départ : s/√n
    = √(21/□)   (trous : √(21/9))   ← Erreur standard
    = □   (trous : 1,528)
  — u  [juge stat]  départ : u
    = 2,306·□   (trous : 2,306·1,528)   ← Demi-largeur
    = □   (trous : 3,524)
  — IC  [juge stat]  départ : IC
    = [10 − □ ; 10 + 3,524]   (trous : [10 − 3,524 ; 10 + 3,524])   ← x̄ ± u
    = [□ ; □]   (trous : [6,476 ; 13,524])
  aides : σ inconnu et n petit : Student à n − 1 = 8 degrés de liberté. | [10-□ ; 10+□] | IC = [6,476 ; 13,524]
  pièges : p_sd_n, p_t_vs_z, p_df_wrong, p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

Sur n = 9 mesures supposées normales, x̄ = 127 et s² = 36. Donne l’intervalle de confiance à 95 % pour μ.
  [guided]  t
    ? Quel quantile ? ✔ Student à ν = 8 degrés de liberté, bilatéral : 2,306 / · La loi normale : 1,96 / · Student à ν = 9 : 2,262
    = □   (trous : 2,306)   ← Table 3, ν = 8
  — s/√n  [juge stat]  départ : s/√n
    = √(36/□)   (trous : √(36/9))   ← Erreur standard
    = □   (trous : 2)
  — u  [juge stat]  départ : u
    = 2,306·2   ← Demi-largeur
    = □   (trous : 4,612)
  — IC  [juge stat]  départ : IC
    = [127 − □ ; 127 + 4,612]   (trous : [127 − 4,612 ; 127 + 4,612])   ← x̄ ± u
    = [□ ; □]   (trous : [122,388 ; 131,612])
  aides : σ inconnu et n petit : Student à n − 1 = 8 degrés de liberté. | [127-□ ; 127+□] | IC = [122,388 ; 131,612]
  pièges : p_t_vs_z, p_df_wrong, p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

Sur n = 25 mesures supposées normales, x̄ = 90 et s² = 400. Donne l’intervalle de confiance à 95 % pour μ.
  [guided]  t
    ? Quel quantile ? ✔ Student à ν = 24 degrés de liberté, bilatéral : 2,064 / · La loi normale : 1,96 / · Student à ν = 25 : 2,06
    = □   (trous : 2,064)   ← Table 3, ν = 24
  — s/√n  [juge stat]  départ : s/√n
    = √(400/□)   (trous : √(400/25))   ← Erreur standard
    = □   (trous : 4)
  — u  [juge stat]  départ : u
    = 2,064·4   ← Demi-largeur
    = □   (trous : 8,256)
  — IC  [juge stat]  départ : IC
    = [90 − □ ; 90 + 8,256]   (trous : [90 − 8,256 ; 90 + 8,256])   ← x̄ ± u
    = [□ ; □]   (trous : [81,744 ; 98,256])
  aides : σ inconnu et n petit : Student à n − 1 = 24 degrés de liberté. | [90-□ ; 90+□] | IC = [81,744 ; 98,256]
  pièges : p_t_vs_z, p_df_wrong, p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

```

### Niveau 3

```
Mesures supposées normales : 31 ; 33 ; 32 ; 35 ; 32 ; 29. Donne l’intervalle de confiance à 95 % pour μ.
  [tap, suivre l'erreur, menu menu]  x̄
    = (31 + 33 + 32 + 35 + 32 + 29)/6   ← Moyenne
    = 32
  — s2  [juge prob]  départ : s²
    = (1 + 1 + 0 + 9 + 0 + 9)/5   ← Écarts au carré, divisés par n − 1
    = 20/5
    = 4
  — t  [juge stat]  départ : t
    ? Quel quantile ? ✔ Student à ν = 5 degrés de liberté, bilatéral : 2,571 / · La loi normale : 1,96 / · Student à ν = 6 : 2,447
    = 2,571   ← Table 3, ν = 5
  — s/√n  [juge stat]  départ : s/√n
    = √(4/6)   ← Erreur standard
    = 0,816
  — u  [juge stat]  départ : u
    = 2,571·0,816   ← Demi-largeur
    = 2,098
  — IC  [juge stat]  départ : IC
    = [32 − 2,098 ; 32 + 2,098]   ← x̄ ± u
    = [29,902 ; 34,098]
  aides : σ inconnu et n petit : Student à n − 1 = 5 degrés de liberté. | [32-□ ; 32+□] | IC = [29,902 ; 34,098]
  pièges : p_sd_n, p_t_vs_z, p_df_wrong, p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

Sur n = 225 observations (loi inconnue), x̄ = 492 et s = 60. Donne l’intervalle de confiance asymptotique à 95 % pour μ.
  [tap, suivre l'erreur, menu menu]  z
    ? Quel pivot ? ✔ n est grand : la loi normale (ligne ∞ de la table) / · Le quantile unilatéral 1,645
    = 1,96   ← Table 2
  — s/√n  [juge stat]  départ : s/√n
    = 60/√(225)   ← Erreur standard
    = 4
  — u  [juge stat]  départ : u
    = 1,96·4   ← Demi-largeur
    = 7,84
  — IC  [juge stat]  départ : IC
    = [492 − 7,84 ; 492 + 7,84]   ← x̄ ± u
    = [484,16 ; 499,84]
  aides : n est grand : x̄ ± 1,96·s/√n. | [492-□ ; 492+□] | IC = [484,16 ; 499,84]
  pièges : p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

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

```

### Niveau 4

```
Sur n = 5 mesures supposées normales, x̄ = 32 et s² = 5. Donne l’intervalle de confiance à 95 % pour μ.
  [free, suivre l'erreur]  t
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
  [free, suivre l'erreur]  z
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

Sur n = 10 mesures supposées normales, x̄ = 194 et s² = 160. Donne l’intervalle de confiance à 95 % pour μ.
  [free, suivre l'erreur]  t
    = 2,262   ← Table 3, ν = 9
  — s/√n  [juge stat]  départ : s/√n
    = √(160/10)   ← Erreur standard
    = 4
  — u  [juge stat]  départ : u
    = 2,262·4   ← Demi-largeur
    = 9,048
  — IC  [juge stat]  départ : IC
    = [194 − 9,048 ; 194 + 9,048]   ← x̄ ± u
    = [184,952 ; 203,048]
  aides : σ inconnu et n petit : Student à n − 1 = 9 degrés de liberté. | [194-□ ; 194+□] | IC = [184,952 ; 203,048]
  pièges : p_t_vs_z, p_df_wrong, p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

```

### Niveau 5

```
Mesures supposées normales : 20 ; 17 ; 23 ; 21 ; 19 ; 20. Donne l’intervalle de confiance à 95 % pour μ.
  [free, sans aide]  x̄
    = (20 + 17 + 23 + 21 + 19 + 20)/6   ← Moyenne
    = 20
  — s2  [juge prob]  départ : s²
    = (0 + 9 + 9 + 1 + 1 + 0)/5   ← Écarts au carré, divisés par n − 1
    = 20/5
    = 4
  — t  [juge stat]  départ : t
    = 2,571   ← Table 3, ν = 5
  — s/√n  [juge stat]  départ : s/√n
    = √(4/6)   ← Erreur standard
    = 0,816
  — u  [juge stat]  départ : u
    = 2,571·0,816   ← Demi-largeur
    = 2,098
  — IC  [juge stat]  départ : IC
    = [20 − 2,098 ; 20 + 2,098]   ← x̄ ± u
    = [17,902 ; 22,098]
  pièges : p_sd_n, p_t_vs_z, p_df_wrong, p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

Mesures supposées normales : 33 ; 39 ; 41 ; 37 ; 35. Donne l’intervalle de confiance à 95 % pour μ.
  [free, sans aide]  x̄
    = (33 + 39 + 41 + 37 + 35)/5   ← Moyenne
    = 37
  — s2  [juge prob]  départ : s²
    = (16 + 4 + 16 + 0 + 4)/4   ← Écarts au carré, divisés par n − 1
    = 40/4
    = 10
  — t  [juge stat]  départ : t
    = 2,776   ← Table 3, ν = 4
  — s/√n  [juge stat]  départ : s/√n
    = √(10/5)   ← Erreur standard
    = 1,414
  — u  [juge stat]  départ : u
    = 2,776·1,414   ← Demi-largeur
    = 3,925
  — IC  [juge stat]  départ : IC
    = [37 − 3,925 ; 37 + 3,925]   ← x̄ ± u
    = [33,075 ; 40,925]
  pièges : p_sd_n, p_t_vs_z, p_df_wrong, p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

Un appareil de mesure a un écart-type connu σ = 2. On fait 36 mesures de moyenne x̄ = 229. On suppose les mesures normales. Donne l’intervalle de confiance à 95 % pour μ. Puis : combien de mesures faut-il pour une demi-largeur au plus 1,5 ?
  [free, sans aide]  z
    = 1,96   ← Table 2
  — σ/√n  [juge stat]  départ : σ/√n
    = 2/√(36)   ← Erreur standard
    = 0,333
  — u  [juge stat]  départ : u
    = 1,96·0,333   ← Demi-largeur
    = 0,653
  — IC  [juge stat]  départ : IC
    = [229 − 0,653 ; 229 + 0,653]   ← x̄ ± u
    = [228,347 ; 229,653]
  — n  [juge stat]  départ : n
    (n ≥ (1,96 · 2/1,5)² = 6,83 : on arrondit vers le haut.)
    = 7   ← Le plus petit entier qui convient
  pièges : p_one_two_sided, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

```

### Variantes d'examen

```
Sur n = 25 mesures supposées normales, x̄ = 113 et s² = 100. Donne l’intervalle de confiance à 99 % pour μ. On donne les quantiles : t(ν = 24 ; 0,995) = 2,797, t(ν = 24 ; 0,99) = 2,492, t(ν = 25 ; 0,995) = 2,787, z(0,995) = 2,576.
  · [107,848 ; 118,152] [p_t_vs_z]   · [85,03 ; 140,97] [p_se_forgot_sqrt_n]   · [108,016 ; 117,984] [p_one_two_sided]   ✔ [107,406 ; 118,594]
  [examen mcq]
  pièges : p_t_vs_z, p_one_two_sided, p_se_forgot_sqrt_n

Vrai ou faux ?
  « σ connu : avec 4 fois plus d’observations, l’intervalle de confiance pour μ est 2 fois plus étroit. » → VRAI
  [examen tf]

Sur n = 9 mesures supposées normales, x̄ = 146 et s² = 36. Donne l’intervalle de confiance à 95 % pour μ. Donne la borne supérieure.
  [free, sans aide, examen coef]  borne sup.
    = 150,612

```

## IC de Wald (avec −ℓ″) et de Wilson (`p-ci-wald`, BA3)

_θ̂_ML ≈ N(θ, 1/J(θ̂)) avec J(θ̂) = −ℓ″(θ̂) (MATH-234) ou I(θ̂) = n·I₁(θ̂) (EE-209) : IC de Wald θ̂ ± z₁₋α/₂/√J(θ̂)._

### Niveau 1

```
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

On observe 90 succès en n = 900 essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)). Donne l’intervalle de confiance de Wald à 95 % pour p (z = 1,96).
  [guided]  p̂
    = 90/□   (trous : 90/900)   ← p̂ = k/n
    = □   (trous : 0,1)
  — J  [juge prob]  départ : J
    = □/(0,1·0,9)   (trous : 900/(0,1·0,9))   ← J = −ℓ″(θ̂)
    = □   (trous : 10000)
  — se  [juge stat]  départ : se
    = 1/√(□)   (trous : 1/√(10000))   ← Var(θ̂) ≈ 1/J
    = □   (trous : 0,01)
  — IC  [juge stat]  départ : IC
    = [0,1 − 1,96·□ ; 0,1 + 1,96·0,01]   (trous : [0,1 − 1,96·0,01 ; 0,1 + 1,96·0,01])   ← θ̂ ± z·se
    = [□ ; □]   (trous : [0,08 ; 0,12])
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√10000 | se = 0,01, IC = [0,08 ; 0,12]
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
On observe 80 succès en n = 400 essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)). Donne l’intervalle de confiance de Wald à 95 % pour p (z = 1,96).
  [guided]  p̂
    = 80/□   (trous : 80/400)   ← p̂ = k/n
    = □   (trous : 0,2)
  — J  [juge prob]  départ : J
    = □/(0,2·0,8)   (trous : 400/(0,2·0,8))   ← J = −ℓ″(θ̂)
    = □   (trous : 2500)
  — se  [juge stat]  départ : se
    = 1/√(□)   (trous : 1/√(2500))   ← Var(θ̂) ≈ 1/J
    = □   (trous : 0,02)
  — IC  [juge stat]  départ : IC
    = [0,2 − 1,96·□ ; 0,2 + 1,96·0,02]   (trous : [0,2 − 1,96·0,02 ; 0,2 + 1,96·0,02])   ← θ̂ ± z·se
    = [□ ; □]   (trous : [0,161 ; 0,239])
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√2500 | se = 0,02, IC = [0,161 ; 0,239]
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

```

### Niveau 3

```
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

n = 25 observations indépendantes d’une loi de Poisson de paramètre λ, de somme Σxᵢ = 25. ℓ(λ) = Σxᵢ ln λ − nλ + constante, ℓ″(λ) = −Σxᵢ/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96).
  [tap, suivre l'erreur, menu menu]  λ̂
    = 25/25   ← λ̂ = x̄
    = 1
  — J  [juge prob]  départ : J
    = 25/1²   ← J = −ℓ″(θ̂)
    = 25
  — se  [juge stat]  départ : se
    = 1/√(25)   ← Var(θ̂) ≈ 1/J
    = 0,2
  — IC  [juge stat]  départ : IC
    = [1 − 1,96·0,2 ; 1 + 1,96·0,2]   ← θ̂ ± z·se
    = [0,608 ; 1,392]
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√25 | se = 0,2, IC = [0,608 ; 1,392]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

n = 16 durées indépendantes de loi exponentielle de paramètre λ, de somme Σxᵢ = 8. ℓ(λ) = n ln λ − λΣxᵢ, ℓ″(λ) = −n/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96).
  [tap, suivre l'erreur, menu menu]  λ̂
    = 16/8   ← λ̂ = n/Σxᵢ
    = 2
  — J  [juge prob]  départ : J
    = 16/2²   ← J = −ℓ″(θ̂)
    = 4
  — se  [juge stat]  départ : se
    = 1/√(4)   ← Var(θ̂) ≈ 1/J
    = 0,5
  — IC  [juge stat]  départ : IC
    = [2 − 1,96·0,5 ; 2 + 1,96·0,5]   ← θ̂ ± z·se
    = [1,02 ; 2,98]
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√4 | se = 0,5, IC = [1,02 ; 2,98]
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

n = 36 observations indépendantes d’une loi de Poisson de paramètre λ, de somme Σxᵢ = 144. ℓ(λ) = Σxᵢ ln λ − nλ + constante, ℓ″(λ) = −Σxᵢ/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96).
  [free, suivre l'erreur]  λ̂
    = 144/36   ← λ̂ = x̄
    = 4
  — J  [juge prob]  départ : J
    = 144/4²   ← J = −ℓ″(θ̂)
    = 9
  — se  [juge stat]  départ : se
    = 1/√(9)   ← Var(θ̂) ≈ 1/J
    = 0,3333
  — IC  [juge stat]  départ : IC
    = [4 − 1,96·0,3333 ; 4 + 1,96·0,3333]   ← θ̂ ± z·se
    = [3,347 ; 4,653]
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√9 | se = 0,3333, IC = [3,347 ; 4,653]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

On observe 36 succès en n = 100 essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)). Donne l’intervalle de confiance de Wald à 95 % pour p (z = 1,96).
  [free, suivre l'erreur]  p̂
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
  aides : La variance asymptotique est l’inverse de −ℓ″ évaluée en θ̂ ; se = 1/√J. | 1/√(15625/36) | se = 0,048, IC = [0,266 ; 0,454]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data, p_ci_xbar

```

### Niveau 5

```
On observe 80 succès en n = 400 essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)). Donne l’intervalle de Wald à 95 % (z = 1,96), puis celui de Wilson (EE-209 : on prend z = 2).
  [free, sans aide]  p̂
    = 80/400   ← p̂ = k/n
    = 0,2
  — J  [juge prob]  départ : J
    = 400/(0,2·0,8)   ← J = −ℓ″(θ̂)
    = 2500
  — se  [juge stat]  départ : se
    = 1/√(2500)   ← Var(θ̂) ≈ 1/J
    = 0,02
  — IC  [juge stat]  départ : IC
    = [0,2 − 1,96·0,02 ; 0,2 + 1,96·0,02]   ← θ̂ ± z·se
    = [0,161 ; 0,239]
  — p̃  [juge stat]  départ : p̃
    = (80 + 2)/(400 + 4)   ← p̃ = (np̂ + z²/2)/(n + z²), z = 2
    = 0,203
  — ICW  [juge stat]  départ : IC_W
    = [0,163 ; 0,243]   ← demi-largeur z√n/(n + z²)·√(p̂(1 − p̂) + z²/(4n)) = 0,0399
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_wilson_center

On observe 40 succès en n = 400 essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)). Donne l’intervalle de Wald à 95 % (z = 1,96), puis celui de Wilson (EE-209 : on prend z = 2).
  [free, sans aide]  p̂
    = 40/400   ← p̂ = k/n
    = 0,1
  — J  [juge prob]  départ : J
    = 400/(0,1·0,9)   ← J = −ℓ″(θ̂)
    = 40000/9
  — se  [juge stat]  départ : se
    = 1/√(40000/9)   ← Var(θ̂) ≈ 1/J
    = 0,015
  — IC  [juge stat]  départ : IC
    = [0,1 − 1,96·0,015 ; 0,1 + 1,96·0,015]   ← θ̂ ± z·se
    = [0,071 ; 0,129]
  — p̃  [juge stat]  départ : p̃
    = (40 + 2)/(400 + 4)   ← p̃ = (np̂ + z²/2)/(n + z²), z = 2
    = 0,104
  — ICW  [juge stat]  départ : IC_W
    = [0,074 ; 0,134]   ← demi-largeur z√n/(n + z²)·√(p̂(1 − p̂) + z²/(4n)) = 0,0301
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_wilson_center

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

```

### Variantes d'examen

```
On observe 125 succès en n = 625 essais de Bernoulli indépendants de paramètre p. ℓ″(p) = −k/p² − (n − k)/(1 − p)², d’où ℓ″(p̂) = −n/(p̂(1 − p̂)). Quel est l’intervalle de Wald à 95 % pour p (z = 1,96) ?
  · [−0,584 ; 0,984] [p_se_forgot_sqrt_n]   ✔ [0,169 ; 0,231]   · La variance est négative : l’intervalle n’existe pas. [p_wald_sign]   · [−122,3 ; 122,7] [p_wald_var_inverse]
  [examen mcq]
  pièges : p_wald_var_inverse, p_se_forgot_sqrt_n, p_wald_sign

Vrai ou faux ?
  « L’intervalle de Wald θ̂ ± z/√J(θ̂) repose sur la normalité approchée du MLE, valable quand n est grand. » → VRAI
  [examen tf]

n = 100 observations indépendantes d’une loi de Poisson de paramètre λ, de somme Σxᵢ = 100. ℓ(λ) = Σxᵢ ln λ − nλ + constante, ℓ″(λ) = −Σxᵢ/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96). Donne l’erreur standard se = 1/√J.
  [free, sans aide, examen coef]  se
    = 1/√(100)   ← Var(θ̂) ≈ 1/J
    = 0,1
  pièges : p_wald_var_inverse

n = 64 durées indépendantes de loi exponentielle de paramètre λ, de somme Σxᵢ = 32. ℓ(λ) = n ln λ − λΣxᵢ, ℓ″(λ) = −n/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96).
  [problème, examen open, 8 points]
  partie 1 (IC de Wald : 2 ; J : 2 ; se : 1,5 ; IC : 1,5)
  n = 64 durées indépendantes de loi exponentielle de paramètre λ, de somme Σxᵢ = 32. ℓ(λ) = n ln λ − λΣxᵢ, ℓ″(λ) = −n/λ². Donne l’intervalle de confiance de Wald à 95 % pour λ (z = 1,96).
    [free, sans aide, suivre l'erreur, examen open]  λ̂
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
  partie 2 (Interpréter : 1)
  Sous quelles hypothèses cet intervalle est-il valable ?
    · Il est exact pour tout n.   · 95 % des données sont dans l’intervalle. [p_ci_data]   ✔ n grand, et un modèle régulier (le support ne dépend pas du paramètre).   · Il contient λ̂ avec une probabilité de 95 %. [p_ci_prob]
    [examen open]
  pièges : p_wald_sign, p_wald_var_inverse, p_se_forgot_sqrt_n, p_ci_prob, p_ci_data

```

## Arrondir un IC (chiffres significatifs) (`p-ci-round`, BA4)

_Règle EE-209 (partie 3b, rappelée dans les « Tables ») : u avec 2 chiffres significatifs (1 accepté si son premier chiffre est 4 à 9) ;…_

### Niveau 1

```
Un estimateur vaut θ̂ = 42,387336 et la demi-largeur de l’IC est u = 0,04625. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [guided]  u
    = □   (trous : 0,046)   ← 2 chiffres significatifs : précision 10⁻³
  — θ̂  [juge stat]  départ : θ̂
    = □   (trous : 42,387)   ← Même dernière décimale que u
  — IC  [juge stat]  départ : IC
    (Comment arrondir les bornes ? Vers l’extérieur : la borne inférieure vers le bas, la supérieure vers le haut.)
    = [□ ; □]   (trous : [42,341 ; 42,434])   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [42,341 ; □] | IC = [42,341 ; 42,434]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 4,202092 et la demi-largeur de l’IC est u = 0,8282. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [guided]  u
    = □   (trous : 0,83)   ← 2 chiffres significatifs : précision 10⁻²
  — θ̂  [juge stat]  départ : θ̂
    = □   (trous : 4,20)   ← Même dernière décimale que u
  — IC  [juge stat]  départ : IC
    (Comment arrondir les bornes ? Vers l’extérieur : la borne inférieure vers le bas, la supérieure vers le haut.)
    = [□ ; □]   (trous : [3,37 ; 5,04])   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [3,37 ; □] | IC = [3,37 ; 5,04]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 25,165451 et la demi-largeur de l’IC est u = 0,1737. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [guided]  u
    = □   (trous : 0,17)   ← 2 chiffres significatifs : précision 10⁻²
  — θ̂  [juge stat]  départ : θ̂
    = □   (trous : 25,17)   ← Même dernière décimale que u
  — IC  [juge stat]  départ : IC
    (Comment arrondir les bornes ? Vers l’extérieur : la borne inférieure vers le bas, la supérieure vers le haut.)
    = [□ ; □]   (trous : [24,99 ; 25,34])   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [24,99 ; □] | IC = [24,99 ; 25,34]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

```

### Niveau 2

```
Un estimateur vaut θ̂ = 55,586878 et la demi-largeur de l’IC est u = 9,477. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [guided]  u
    = □   (trous : 9,5)   ← 2 chiffres significatifs : précision 10⁻¹
  — θ̂  [juge stat]  départ : θ̂
    = □   (trous : 55,6)   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [□ ; 65,063878]   (trous : [46,109878 ; 65,063878])   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    ? Comment arrondir les bornes ? ✔ Vers l’extérieur : la borne inférieure vers le bas, la supérieure vers le haut / · Chaque borne au plus proche
    = [□ ; □]   (trous : [46,1 ; 65,1])   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [46,1 ; □] | IC = [46,1 ; 65,1]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 15,966545 et la demi-largeur de l’IC est u = 0,03758. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [guided]  u
    = □   (trous : 0,038)   ← 2 chiffres significatifs : précision 10⁻³
  — θ̂  [juge stat]  départ : θ̂
    = □   (trous : 15,967)   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [□ ; 16,004125]   (trous : [15,928965 ; 16,004125])   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    ? Comment arrondir les bornes ? ✔ Vers l’extérieur : la borne inférieure vers le bas, la supérieure vers le haut / · Chaque borne au plus proche
    = [□ ; □]   (trous : [15,928 ; 16,005])   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [15,928 ; □] | IC = [15,928 ; 16,005]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 41,925683 et la demi-largeur de l’IC est u = 3,912. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [guided]  u
    = □   (trous : 3,9)   ← 2 chiffres significatifs : précision 10⁻¹
  — θ̂  [juge stat]  départ : θ̂
    = □   (trous : 41,9)   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [□ ; 45,837683]   (trous : [38,013683 ; 45,837683])   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    ? Comment arrondir les bornes ? ✔ Vers l’extérieur : la borne inférieure vers le bas, la supérieure vers le haut / · Chaque borne au plus proche
    = [□ ; □]   (trous : [38,0 ; 45,9])   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [38,0 ; □] | IC = [38,0 ; 45,9]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

```

### Niveau 3

```
Un estimateur vaut θ̂ = 40,772892 et la demi-largeur de l’IC est u = 0,002686. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [tap, suivre l'erreur, menu menu]  u
    = 0,0027   ← 2 chiffres significatifs : précision 10⁻⁴
  — θ̂  [juge stat]  départ : θ̂
    = 40,7729   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [40,770206 ; 40,775578]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [40,7702 ; 40,7756]   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [40,7702 ; □] | IC = [40,7702 ; 40,7756]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 18,661046 et la demi-largeur de l’IC est u = 0,02358. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [tap, suivre l'erreur, menu menu]  u
    = 0,024   ← 2 chiffres significatifs : précision 10⁻³
  — θ̂  [juge stat]  départ : θ̂
    = 18,661   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [18,637466 ; 18,684626]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [18,637 ; 18,685]   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [18,637 ; □] | IC = [18,637 ; 18,685]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 35,433390 et la demi-largeur de l’IC est u = 0,008205. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [tap, suivre l'erreur, menu menu]  u
    = 0,0082   ← 2 chiffres significatifs : précision 10⁻⁴
  — θ̂  [juge stat]  départ : θ̂
    = 35,4334   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [35,425185 ; 35,441595]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [35,4251 ; 35,4416]   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [35,4251 ; □] | IC = [35,4251 ; 35,4416]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

```

### Niveau 4

```
Un estimateur vaut θ̂ = 31,785850 et la demi-largeur de l’IC est u = 0,0005482. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [free, suivre l'erreur]  u
    = 0,00055   ← 2 chiffres significatifs : précision 10⁻⁵
  — θ̂  [juge stat]  départ : θ̂
    = 31,78585   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [31,7853018 ; 31,7863982]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [31,78530 ; 31,78640]   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [31,78530 ; □] | IC = [31,78530 ; 31,78640]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 52,690210 et la demi-largeur de l’IC est u = 0,08616. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [free, suivre l'erreur]  u
    = 0,086   ← 2 chiffres significatifs : précision 10⁻³
  — θ̂  [juge stat]  départ : θ̂
    = 52,690   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [52,60405 ; 52,77637]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [52,604 ; 52,777]   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [52,604 ; □] | IC = [52,604 ; 52,777]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

Un estimateur vaut θ̂ = 45,002935 et la demi-largeur de l’IC est u = 0,7217. Écris u, θ̂ et l’IC arrondis selon la règle d’EE-209.
  [free, suivre l'erreur]  u
    = 0,72   ← 2 chiffres significatifs : précision 10⁻²
  — θ̂  [juge stat]  départ : θ̂
    = 45,00   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [44,281235 ; 45,724635]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [44,28 ; 45,73]   ← Vers le bas, vers le haut
  aides : La précision vient de u (2 chiffres significatifs) ; on élargit l’IC en arrondissant, jamais on ne le rétrécit. | [44,28 ; □] | IC = [44,28 ; 45,73]
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits

```

### Niveau 5

```
Sur n = 25 mesures normales : x̄ = 37,453813, s = 2,102713, et t₍24₎ ; 0,975 = 2,064 (donné). Calcule la demi-largeur u, puis écris u, x̄ et l’IC à 95 % arrondis selon la règle d’EE-209.
  [free, sans aide]  u_brut
    = 2,064·2,102713/√(25)   ← u = t·s/√n
    = 0,86800
  — u  [juge stat]  départ : u
    = 0,87   ← 2 chiffres significatifs : précision 10⁻²
  — θ̂  [juge stat]  départ : θ̂
    = 37,45   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [36,58581307 ; 38,32181293]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [36,58 ; 38,33]   ← Vers le bas, vers le haut
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits, p_ci_prob, p_ci_data, p_ci_xbar

Sur n = 36 mesures normales : x̄ = 31,575073, s = 0,049064, et t₍35₎ ; 0,975 = 2,03 (donné). Calcule la demi-largeur u, puis écris u, x̄ et l’IC à 95 % arrondis selon la règle d’EE-209.
  [free, sans aide]  u_brut
    = 2,03·0,049064/√(36)   ← u = t·s/√n
    = 0,016600
  — u  [juge stat]  départ : u
    = 0,017   ← 2 chiffres significatifs : précision 10⁻³
  — θ̂  [juge stat]  départ : θ̂
    = 31,575   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [31,55847301 ; 31,59167299]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [31,558 ; 31,592]   ← Vers le bas, vers le haut
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits, p_ci_prob, p_ci_data, p_ci_xbar

Sur n = 16 mesures normales : x̄ = 60,272954, s = 0,001445, et t₍15₎ ; 0,975 = 2,131 (donné). Calcule la demi-largeur u, puis écris u, x̄ et l’IC à 95 % arrondis selon la règle d’EE-209.
  [free, sans aide]  u_brut
    = 2,131·0,001445/√(16)   ← u = t·s/√n
    = 0,00076982
  — u  [juge stat]  départ : u
    = 0,00077   ← 2 chiffres significatifs : précision 10⁻⁵
  — θ̂  [juge stat]  départ : θ̂
    = 60,27295   ← Même dernière décimale que u
  — θ̂ ± u  [juge stat]  départ : θ̂ ± u
    = [60,27218418 ; 60,27372382]   ← Avec les valeurs non arrondies
  — IC  [juge stat]  départ : IC
    = [60,27218 ; 60,27373]   ← Vers le bas, vers le haut
  pièges : p_ci_round_nearest, p_ci_round_from_rounded, p_ci_round_digits, p_ci_prob, p_ci_data, p_ci_xbar

```

### Variantes d'examen

```
θ̂ = 42,918831 et u = 0,0006993. Quel est l’IC arrondi selon la règle d’EE-209 (u à 2 chiffres significatifs, bornes vers l’extérieur) ?
  · [42,918132 ; 42,919530] [p_ci_round_digits]   · [42,918 ; 42,920] [p_ci_round_digits]   ✔ [42,91813 ; 42,91954]   · [42,91813 ; 42,91953] [p_ci_round_nearest]
  [examen mcq]
  pièges : p_ci_round_nearest, p_ci_round_digits

Vrai ou faux ?
  « Pour θ̂ = 34,436191 et u = 8,110, on arrondit chaque borne de l’IC au plus proche, à la précision de u. » → FAUX
    contre-exemple (refute) : a = 42,5, b = 42,6
  [examen tf]
  pièges : p_ci_round_nearest

```

## Maximum d'un échantillon ; IC exact (`p-max-sample`, BA3)

_M = max Xᵢ pour X₁, …, Xₙ iid : F_M(x) = Pr(tous ≤ x) = F(x)ⁿ, f_M = n·F^(n−1)·f._

### Niveau 1

```
X₁, …, X_10 iid de densité f(x) = 1/θ sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [guided]  F(x)
    = □   (trous : x/θ)   ← F(x) = x/θ sur [0 ; θ]
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)^□   (trous : (x/θ)¹⁰)   ← M ≤ x ⇔ les 10 données ≤ x : F(x)^10
  — f_M(x)  [juge prob]  départ : f_M(x)
    = □x^□/θ¹⁰   (trous : 10x⁹/θ¹⁰)   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 10x^9/θ^10
  pièges : p_max_min_swap, p_max_density_power

X₁, …, X_10 iid de densité f(x) = 1/θ sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [guided]  F(x)
    = □   (trous : x/θ)   ← F(x) = x/θ sur [0 ; θ]
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)^□   (trous : (x/θ)¹⁰)   ← M ≤ x ⇔ les 10 données ≤ x : F(x)^10
  — f_M(x)  [juge prob]  départ : f_M(x)
    = □x^□/θ¹⁰   (trous : 10x⁹/θ¹⁰)   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 10x^9/θ^10
  pièges : p_max_min_swap, p_max_density_power

X₁, …, X_20 iid de densité f(x) = 1/θ sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [guided]  F(x)
    = □   (trous : x/θ)   ← F(x) = x/θ sur [0 ; θ]
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)^□   (trous : (x/θ)²⁰)   ← M ≤ x ⇔ les 20 données ≤ x : F(x)^20
  — f_M(x)  [juge prob]  départ : f_M(x)
    = □x^□/θ²⁰   (trous : 20x¹⁹/θ²⁰)   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 20x^19/θ^20
  pièges : p_max_min_swap, p_max_density_power

```

### Niveau 2

```
X₁, …, X_10 iid de densité f(x) = 1/θ sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [guided]  F(x)
    = □   (trous : x/θ)   ← F(x) = x/θ sur [0 ; θ]
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)^□   (trous : (x/θ)¹⁰)   ← M ≤ x ⇔ les 10 données ≤ x : F(x)^10
  — f_M(x)  [juge prob]  départ : f_M(x)
    = □x^□/θ¹⁰   (trous : 10x⁹/θ¹⁰)   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 10x^9/θ^10
  pièges : p_max_min_swap, p_max_density_power

X₁, …, X_10 iid de densité f(x) = 4x^3/θ^4 sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [guided]  F(x)
    = (x/θ)^□   (trous : (x/θ)⁴)   ← F(x) = ∫₀ˣ 4u^3/θ^4 du
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)^□   (trous : (x/θ)⁴⁰)   ← M ≤ x ⇔ les 10 données ≤ x : F(x)^10
  — f_M(x)  [juge prob]  départ : f_M(x)
    = □x^□/θ⁴⁰   (trous : 40x³⁹/θ⁴⁰)   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 40x^39/θ^40
  pièges : p_max_min_swap, p_max_density_power

X₁, …, X_20 iid U[0, θ], et M = max Xᵢ = 8. Donne l’IC exact à 95 % pour θ (deux décimales).
  [guided]  IC
    ? Quel pivot ? ✔ M/θ, de fonction de répartition u^20 sur [0 ; 1] / · Le théorème central limite sur M
    = [8 ; 8·0,05^(−1/□)]   (trous : [8 ; 8·0,05^(−1/20)])   ← Pr(0,05^(1/20) ≤ M/θ ≤ 1) = 0,95
    = [8 ; □]   (trous : [8 ; 9,29])
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont ; M/θ a la fonction de répartition uⁿ. | [8 ; 8×0,05^(-1/□)] | IC = [8 ; 9,29]
  pièges : p_ci_prob, p_ci_data, p_ci_xbar

```

### Niveau 3

```
X₁, …, X_20 iid U[0, θ], et M = max Xᵢ = 27. Donne l’IC exact à 95 % pour θ (deux décimales).
  [tap, suivre l'erreur, menu menu]  IC
    = [27 ; 27·0,05^(−1/20)]   ← Pr(0,05^(1/20) ≤ M/θ ≤ 1) = 0,95
    = [27 ; 31,36]
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont ; M/θ a la fonction de répartition uⁿ. | [27 ; 27×0,05^(-1/□)] | IC = [27 ; 31,36]
  pièges : p_ci_prob, p_ci_data, p_ci_xbar

X₁, …, X_5 iid de densité f(x) = 4x^3/θ^4 sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [tap, suivre l'erreur, menu menu]  F(x)
    = (x/θ)⁴   ← F(x) = ∫₀ˣ 4u^3/θ^4 du
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)²⁰   ← M ≤ x ⇔ les 5 données ≤ x : F(x)^5
  — f_M(x)  [juge prob]  départ : f_M(x)
    = 20x¹⁹/θ²⁰   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 20x^19/θ^20
  pièges : p_max_min_swap, p_max_density_power

X₁, …, X_10 iid de densité f(x) = 2x/θ^2 sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [tap, suivre l'erreur, menu menu]  F(x)
    = (x/θ)²   ← F(x) = ∫₀ˣ 2u^1/θ^2 du
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)²⁰   ← M ≤ x ⇔ les 10 données ≤ x : F(x)^10
  — f_M(x)  [juge prob]  départ : f_M(x)
    = 20x¹⁹/θ²⁰   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 20x^19/θ^20
  pièges : p_max_min_swap, p_max_density_power

```

### Niveau 4

```
X₁, …, X_10 iid U[0, θ], et M = max Xᵢ = 37. Donne l’IC exact à 90 % pour θ (deux décimales).
  [free, suivre l'erreur]  IC
    = [37 ; 37·0,1^(−1/10)]   ← Pr(0,1^(1/10) ≤ M/θ ≤ 1) = 0,9
    = [37 ; 46,58]
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont ; M/θ a la fonction de répartition uⁿ. | [37 ; 37×0,1^(-1/□)] | IC = [37 ; 46,58]
  pièges : p_ci_prob, p_ci_data, p_ci_xbar

X₁, …, X_5 iid de densité f(x) = 1/θ sur [0 ; θ]. Soit M = max Xᵢ. Donne F, F_M et la densité f_M sur [0 ; θ].
  [free, suivre l'erreur]  F(x)
    = x/θ   ← F(x) = x/θ sur [0 ; θ]
  — F_M(x)  [juge prob]  départ : F_M(x)
    = (x/θ)⁵   ← M ≤ x ⇔ les 5 données ≤ x : F(x)^5
  — f_M(x)  [juge prob]  départ : f_M(x)
    = 5x⁴/θ⁵   ← f_M = n·F^(n−1)·f
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont : F_M = Fⁿ, puis on dérive. | (x/θ)^□ | f_M(x) = 5x^4/θ^5
  pièges : p_max_min_swap, p_max_density_power

X₁, …, X_20 iid U[0, θ], et M = max Xᵢ = 24. Donne l’IC exact à 90 % pour θ (deux décimales).
  [free, suivre l'erreur]  IC
    = [24 ; 24·0,1^(−1/20)]   ← Pr(0,1^(1/20) ≤ M/θ ≤ 1) = 0,9
    = [24 ; 26,93]
  aides : Le maximum est ≤ x si et seulement si toutes les données le sont ; M/θ a la fonction de répartition uⁿ. | [24 ; 24×0,1^(-1/□)] | IC = [24 ; 26,93]
  pièges : p_ci_prob, p_ci_data, p_ci_xbar

```

### Niveau 5

```
Sur 5 plaques vaudoises vues au hasard, le plus grand numéro est M = 512. On modélise les numéros par des variables iid U[0, θ]. Donne F_M, puis l’IC exact à 95 % pour θ (deux décimales).
  [free, sans aide]  F_M(x)
    = (x/θ)⁵   ← M ≤ x ⇔ les 5 données ≤ x : F(x)^5
  — IC  [juge stat]  départ : IC
    = [512 ; 512·0,05^(−1/5)]   ← Pr(0,05^(1/5) ≤ M/θ ≤ 1) = 0,95
    = [512 ; 932,13]
  pièges : p_max_min_swap, p_ci_prob, p_ci_data, p_ci_xbar

Sur 20 plaques vaudoises vues au hasard, le plus grand numéro est M = 512. On modélise les numéros par des variables iid U[0, θ]. Donne F_M, puis l’IC exact à 95 % pour θ (deux décimales).
  [free, sans aide]  F_M(x)
    = (x/θ)²⁰   ← M ≤ x ⇔ les 20 données ≤ x : F(x)^20
  — IC  [juge stat]  départ : IC
    = [512 ; 512·0,05^(−1/20)]   ← Pr(0,05^(1/20) ≤ M/θ ≤ 1) = 0,95
    = [512 ; 594,73]
  pièges : p_max_min_swap, p_ci_prob, p_ci_data, p_ci_xbar

Sur 20 plaques vaudoises vues au hasard, le plus grand numéro est M = 689. On modélise les numéros par des variables iid U[0, θ]. Donne F_M, puis l’IC exact à 90 % pour θ (deux décimales).
  [free, sans aide]  F_M(x)
    = (x/θ)²⁰   ← M ≤ x ⇔ les 20 données ≤ x : F(x)^20
  — IC  [juge stat]  départ : IC
    = [689 ; 689·0,1^(−1/20)]   ← Pr(0,1^(1/20) ≤ M/θ ≤ 1) = 0,9
    = [689 ; 773,07]
  pièges : p_max_min_swap, p_ci_prob, p_ci_data, p_ci_xbar

```

### Variantes d'examen

```
X₁, …, X_10 iid de fonction de répartition F(x) = (x/θ)^3 sur [0 ; θ]. Quelle est la densité de M = max Xᵢ sur [0 ; θ] ?
  ✔ 30x^29/θ^30   · (3x^2/θ^3)^10 [p_max_density_power]   · (x/θ)^30   · 10×(1-(x/θ)^3)^9×3x^2/θ^3 [p_max_min_swap]
  [examen mcq]
  pièges : p_max_density_power, p_max_min_swap

X₁, …, X_5 iid U[0, θ], et M = max Xᵢ = 25. Donne la borne supérieure de l’IC exact à 90 % pour θ.
  [free, sans aide, examen coef]  borne sup.
    = 39,62

Sur 20 plaques vaudoises vues au hasard, le plus grand numéro est M = 689. On modélise les numéros par des variables iid U[0, θ]. Donne F_M, puis l’IC exact à 95 % pour θ (deux décimales).
  [problème, examen open, 8 points]
  partie 1 (Maximum et IC exact : 2,5 ; IC : 4,5)
  Sur 20 plaques vaudoises vues au hasard, le plus grand numéro est M = 689. On modélise les numéros par des variables iid U[0, θ]. Donne F_M, puis l’IC exact à 95 % pour θ (deux décimales).
    [free, sans aide, suivre l'erreur, examen open]  F_M(x)
      = (x/θ)²⁰   ← M ≤ x ⇔ les 20 données ≤ x : F(x)^20
    — IC  [juge stat]  départ : IC
      = [689 ; 689·0,05^(−1/20)]   ← Pr(0,05^(1/20) ≤ M/θ ≤ 1) = 0,95
      = [689 ; 800,33]
  partie 2 (Interpréter : 1)
  Interpréter : quelle phrase est juste ?
    ✔ Si l’on refaisait l’expérience souvent, 95 % des intervalles construits ainsi contiendraient θ.   · 95 % des mesures sont dans [689 ; 800,33]. [p_ci_data]   · θ est dans [689 ; 800,33] avec une probabilité de 0,95. [p_ci_prob]   · La moyenne observée est dans l’intervalle avec une probabilité de 0,95. [p_ci_xbar]
    [examen open]
  pièges : p_max_min_swap, p_ci_prob, p_ci_data, p_ci_xbar

```

## Formuler un test : H₀, H₁, région critique, p-valeur (`p-test-setup`, BA3)

_H₀ est l'hypothèse gardée par défaut (souvent une égalité, le statu quo) ; H₁ est ce que l'on cherche à établir._

### Niveau 1

```
Les contrôles radar font-ils baisser la vitesse moyenne μ, qui était de 50 km/h ? On fait un test z au niveau 5 % et on observe t_obs = −2,325. Pose les hypothèses, donne la région critique et la p-valeur.
  [guided]  t_c
    (Quelles hypothèses ? H₀ : μ = 50 contre H₁ : μ < 50.)
    (Le test est… unilatéral à gauche.)
    = □   (trous : 1,645)   ← R = ]−∞ ; −1,645]
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(□)   (trous : 1 − Φ(2,325))   ← Une queue
    = 1 − □   (trous : 1 − 0,99)   ← Table : Φ(2,325) = 0,99
    = □   (trous : 0,01)
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 1-Φ(□) | p_obs = 0,01
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

Le « oui » l’emporte-t-il au référendum (p = part des oui) ? On fait un test z au niveau 5 % et on observe t_obs = 0,875. Pose les hypothèses, donne la région critique et la p-valeur.
  [guided]  t_c
    (Quelles hypothèses ? H₀ : p = 1/2 contre H₁ : p > 1/2.)
    (Le test est… unilatéral à droite.)
    = □   (trous : 1,645)   ← R = [1,645 ; +∞[
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(□)   (trous : 1 − Φ(0,875))   ← Une queue
    = 1 − □   (trous : 1 − 0,809)   ← Table : Φ(0,875) = 0,809
    = □   (trous : 0,191)
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 1-Φ(□) | p_obs = 0,191
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Des compteurs électriques mesurent-ils juste en moyenne (moyenne nominale 1 000 kWh) ? On fait un test z au niveau 5 % et on observe t_obs = 1,45. Pose les hypothèses, donne la région critique et la p-valeur.
  [guided]  t_c
    (Quelles hypothèses ? H₀ : μ = 1 000 contre H₁ : μ ≠ 1 000.)
    (Le test est… bilatéral.)
    = □   (trous : 1,96)   ← R = {|T| > 1,96}
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(□))   (trous : 2(1 − Φ(1,45)))   ← Bilatéral : les deux queues
    = 2(1 − □)   (trous : 2(1 − 0,926))   ← Table : Φ(1,45) = 0,926
    = □   (trous : 0,148)
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 2(1-Φ(□)) | p_obs = 0,148
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 2

```
Des compteurs électriques mesurent-ils juste en moyenne (moyenne nominale 1 000 kWh) ? On fait un test z au niveau 5 % et on observe t_obs = 2,525. Pose les hypothèses, donne la région critique et la p-valeur.
  [guided]  t_c
    ? Quelles hypothèses ? ✔ H₀ : μ = 1 000 contre H₁ : μ ≠ 1 000 / · H₀ : μ = 1 000 contre H₁ : μ > 1 000 / · H₀ : μ ≠ 1 000 contre H₁ : μ = 1 000 / · H₀ : μ = 1 000 contre H₁ : μ < 1 000 / · H₀ : μ > 1 000 contre H₁ : μ ≤ 1 000
    ? Le test est… ✔ bilatéral / · unilatéral
    = □   (trous : 1,96)   ← R = {|T| > 1,96}
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(□))   (trous : 2(1 − Φ(2,525)))   ← Bilatéral : les deux queues
    = 2(1 − □)   (trous : 2(1 − 0,994))   ← Table : Φ(2,525) = 0,994
    = □   (trous : 0,012)
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 2(1-Φ(□)) | p_obs = 0,012
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

La teneur moyenne μ en alcool d’une boisson dépasse-t-elle la limite de 0,5 % ? On fait un test z au niveau 1 % et on observe t_obs = 1,9. Pose les hypothèses, donne la région critique et la p-valeur.
  [guided]  t_c
    ? Quelles hypothèses ? ✔ H₀ : μ = 0,5 contre H₁ : μ > 0,5 / · H₀ : μ > 0,5 contre H₁ : μ = 0,5 / · H₀ : μ = 0,5 contre H₁ : μ ≠ 0,5 / · H₀ : μ = 0,5 contre H₁ : μ < 0,5 / · H₀ : μ ≠ 0,5 contre H₁ : μ = 0,5
    ? Le test est… ✔ unilatéral à droite / · bilatéral
    = □   (trous : 2,326)   ← R = [2,326 ; +∞[
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(□)   (trous : 1 − Φ(1,9))   ← Une queue
    = 1 − □   (trous : 1 − 0,971)   ← Table : Φ(1,9) = 0,971
    = □   (trous : 0,029)
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 1-Φ(□) | p_obs = 0,029
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Des compteurs électriques mesurent-ils juste en moyenne (moyenne nominale 1 000 kWh) ? On fait un test z au niveau 5 % et on observe t_obs = 1,2. Pose les hypothèses, donne la région critique et la p-valeur.
  [guided]  t_c
    ? Quelles hypothèses ? ✔ H₀ : μ = 1 000 contre H₁ : μ ≠ 1 000 / · H₀ : μ = 1 000 contre H₁ : μ > 1 000 / · H₀ : μ ≠ 1 000 contre H₁ : μ = 1 000 / · H₀ : μ = 1 000 contre H₁ : μ < 1 000 / · H₀ : μ > 1 000 contre H₁ : μ ≤ 1 000
    ? Le test est… ✔ bilatéral / · unilatéral
    = □   (trous : 1,96)   ← R = {|T| > 1,96}
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(□))   (trous : 2(1 − Φ(1,2)))   ← Bilatéral : les deux queues
    = 2(1 − □)   (trous : 2(1 − 0,885))   ← Table : Φ(1,2) = 0,885
    = □   (trous : 0,23)
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 2(1-Φ(□)) | p_obs = 0,23
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 3

```
L’alcool allonge-t-il le temps de réaction moyen μ, qui est de 0,8 s à jeun ? On fait un test z au niveau 5 % et on observe t_obs = 0,875. Pose les hypothèses, donne la région critique et la p-valeur.
  [tap, suivre l'erreur, menu menu]  t_c
    ? Quelles hypothèses ? ✔ H₀ : μ = 0,8 contre H₁ : μ > 0,8 / · H₀ : μ > 0,8 contre H₁ : μ = 0,8 / · H₀ : μ = 0,8 contre H₁ : μ ≠ 0,8 / · H₀ : μ = 0,8 contre H₁ : μ < 0,8 / · H₀ : μ ≠ 0,8 contre H₁ : μ = 0,8
    ? Le test est… ✔ unilatéral à droite / · bilatéral
    = 1,645   ← R = [1,645 ; +∞[
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(0,875)   ← Une queue
    = 1 − 0,809   ← Table : Φ(0,875) = 0,809
    = 0,191
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 1-Φ(□) | p_obs = 0,191
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Le filtre anti-spam laisse-t-il passer moins de 5 % des spams (p = part des spams non filtrés) ? On fait un test z au niveau 5 % et on observe t_obs = −2,125. Pose les hypothèses, donne la région critique et la p-valeur.
  [tap, suivre l'erreur, menu menu]  t_c
    ? Quelles hypothèses ? ✔ H₀ : p = 0,05 contre H₁ : p < 0,05 / · H₀ : p < 0,05 contre H₁ : p = 0,05 / · H₀ : p = 0,05 contre H₁ : p ≠ 0,05 / · H₀ : p = 0,05 contre H₁ : p > 0,05 / · H₀ : p ≠ 0,05 contre H₁ : p = 0,05
    ? Le test est… ✔ unilatéral à gauche / · bilatéral
    = 1,645   ← R = ]−∞ ; −1,645]
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(2,125)   ← Une queue
    = 1 − 0,983   ← Table : Φ(2,125) = 0,983
    = 0,017
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 1-Φ(□) | p_obs = 0,017
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

L’alcool allonge-t-il le temps de réaction moyen μ, qui est de 0,8 s à jeun ? On fait un test z au niveau 1 % et on observe t_obs = 1,8. Pose les hypothèses, donne la région critique et la p-valeur.
  [tap, suivre l'erreur, menu menu]  t_c
    ? Quelles hypothèses ? ✔ H₀ : μ = 0,8 contre H₁ : μ > 0,8 / · H₀ : μ > 0,8 contre H₁ : μ = 0,8 / · H₀ : μ = 0,8 contre H₁ : μ ≠ 0,8 / · H₀ : μ = 0,8 contre H₁ : μ < 0,8 / · H₀ : μ ≠ 0,8 contre H₁ : μ = 0,8
    ? Le test est… ✔ unilatéral à droite / · bilatéral
    = 2,326   ← R = [2,326 ; +∞[
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(1,8)   ← Une queue
    = 1 − 0,964   ← Table : Φ(1,8) = 0,964
    = 0,036
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 1-Φ(□) | p_obs = 0,036
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 4

```
La proportion p d’unités défectueuses d’une ligne de production dépasse-t-elle 1/1 000 ? On fait un test z au niveau 5 % et on observe t_obs = 1,225. Pose les hypothèses, donne la région critique et la p-valeur.
  [free, suivre l'erreur]  t_c
    ? Quelles hypothèses ? ✔ H₀ : p = 1/1 000 contre H₁ : p > 1/1 000 / · H₀ : p > 1/1 000 contre H₁ : p = 1/1 000 / · H₀ : p = 1/1 000 contre H₁ : p ≠ 1/1 000 / · H₀ : p = 1/1 000 contre H₁ : p < 1/1 000 / · H₀ : p ≠ 1/1 000 contre H₁ : p = 1/1 000
    ? Le test est… ✔ unilatéral à droite / · bilatéral
    = 1,645   ← R = [1,645 ; +∞[
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(1,225)   ← Une queue
    = 1 − 0,89   ← Table : Φ(1,225) = 0,89
    = 0,11
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 1-Φ(□) | p_obs = 0,11
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Le filtre anti-spam laisse-t-il passer moins de 5 % des spams (p = part des spams non filtrés) ? On fait un test z au niveau 5 % et on observe t_obs = −0,575. Pose les hypothèses, donne la région critique et la p-valeur.
  [free, suivre l'erreur]  t_c
    ? Quelles hypothèses ? ✔ H₀ : p = 0,05 contre H₁ : p < 0,05 / · H₀ : p < 0,05 contre H₁ : p = 0,05 / · H₀ : p = 0,05 contre H₁ : p ≠ 0,05 / · H₀ : p = 0,05 contre H₁ : p > 0,05 / · H₀ : p ≠ 0,05 contre H₁ : p = 0,05
    ? Le test est… ✔ unilatéral à gauche / · bilatéral
    = 1,645   ← R = ]−∞ ; −1,645]
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(0,575)   ← Une queue
    = 1 − 0,717   ← Table : Φ(0,575) = 0,717
    = 0,283
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 1-Φ(□) | p_obs = 0,283
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Des compteurs électriques mesurent-ils juste en moyenne (moyenne nominale 1 000 kWh) ? On fait un test z au niveau 5 % et on observe t_obs = 1,875. Pose les hypothèses, donne la région critique et la p-valeur.
  [free, suivre l'erreur]  t_c
    ? Quelles hypothèses ? ✔ H₀ : μ = 1 000 contre H₁ : μ ≠ 1 000 / · H₀ : μ = 1 000 contre H₁ : μ > 1 000 / · H₀ : μ ≠ 1 000 contre H₁ : μ = 1 000 / · H₀ : μ = 1 000 contre H₁ : μ < 1 000 / · H₀ : μ > 1 000 contre H₁ : μ ≤ 1 000
    ? Le test est… ✔ bilatéral / · unilatéral
    = 1,96   ← R = {|T| > 1,96}
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(1,875))   ← Bilatéral : les deux queues
    = 2(1 − 0,97)   ← Table : Φ(1,875) = 0,97
    = 0,06
  aides : H₁ est ce que l’on veut montrer ; H₀ contient l’égalité. Bilatéral : p = 2(1 − Φ(|t_obs|)). | 2(1-Φ(□)) | p_obs = 0,06
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 5

```
Un radar de détection des tumeurs manque-t-il moins de 10 % des tumeurs (p = part manquée) ? On fait un test z au niveau 5 % et on observe t_obs = −0,625. Pose les hypothèses, donne la région critique et la p-valeur.
  [free, sans aide]  t_c
    ? Quelles hypothèses ? ✔ H₀ : p = 0,1 contre H₁ : p < 0,1 / · H₀ : p < 0,1 contre H₁ : p = 0,1 / · H₀ : p = 0,1 contre H₁ : p ≠ 0,1 / · H₀ : p = 0,1 contre H₁ : p > 0,1 / · H₀ : p ≠ 0,1 contre H₁ : p = 0,1
    ? Le test est… ✔ unilatéral à gauche / · bilatéral
    = 1,645   ← R = ]−∞ ; −1,645]
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(0,625)   ← Une queue
    = 1 − 0,734   ← Table : Φ(0,625) = 0,734
    = 0,266
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_accept_h0, p_pvalue_h0, p_significant_large

La proportion p d’unités défectueuses d’une ligne de production dépasse-t-elle 1/1 000 ? On fait un test z au niveau 5 % et on observe t_obs = 1,15. Pose les hypothèses, donne la région critique et la p-valeur.
  [free, sans aide]  t_c
    ? Quelles hypothèses ? ✔ H₀ : p = 1/1 000 contre H₁ : p > 1/1 000 / · H₀ : p > 1/1 000 contre H₁ : p = 1/1 000 / · H₀ : p = 1/1 000 contre H₁ : p ≠ 1/1 000 / · H₀ : p = 1/1 000 contre H₁ : p < 1/1 000 / · H₀ : p ≠ 1/1 000 contre H₁ : p = 1/1 000
    ? Le test est… ✔ unilatéral à droite / · bilatéral
    = 1,645   ← R = [1,645 ; +∞[
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(1,15)   ← Une queue
    = 1 − 0,875   ← Table : Φ(1,15) = 0,875
    = 0,125
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_accept_h0, p_pvalue_h0, p_significant_large

Une nouvelle méthode augmente-t-elle le taux de réussite p, qui était de 0,7 ? On fait un test z au niveau 5 % et on observe t_obs = 1,3. Pose les hypothèses, donne la région critique et la p-valeur.
  [free, sans aide]  t_c
    ? Quelles hypothèses ? ✔ H₀ : p = 0,7 contre H₁ : p > 0,7 / · H₀ : p > 0,7 contre H₁ : p = 0,7 / · H₀ : p = 0,7 contre H₁ : p ≠ 0,7 / · H₀ : p = 0,7 contre H₁ : p < 0,7 / · H₀ : p ≠ 0,7 contre H₁ : p = 0,7
    ? Le test est… ✔ unilatéral à droite / · bilatéral
    = 1,645   ← R = [1,645 ; +∞[
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(1,3)   ← Une queue
    = 1 − 0,903   ← Table : Φ(1,3) = 0,903
    = 0,097
  pièges : p_one_two_sided, p_pvalue_two_sided, p_upper_tail, p_h0_direction, p_accept_h0, p_pvalue_h0, p_significant_large

```

### Variantes d'examen

```
La proportion p d’unités défectueuses d’une ligne de production dépasse-t-elle 1/1 000 ? Quelles hypothèses tester ?
  · H₀ : p = 1/1 000 contre H₁ : p < 1/1 000 [p_one_two_sided]   · H₀ : p ≠ 1/1 000 contre H₁ : p = 1/1 000 [p_h0_direction]   · H₀ : p > 1/1 000 contre H₁ : p = 1/1 000 [p_h0_direction]   · H₀ : p = 1/1 000 contre H₁ : p ≠ 1/1 000 [p_one_two_sided]   ✔ H₀ : p = 1/1 000 contre H₁ : p > 1/1 000
  [examen mcq]
  pièges : p_h0_direction, p_one_two_sided

Vrai ou faux ?
  « La p-valeur est la plus petite valeur de α pour laquelle on rejette H₀. » → VRAI
  [examen tf]

```

## Erreurs de type 1 et 2, puissance (`p-test-power`, BA3)

_Erreur de type 1 : rejeter H₀ alors qu'elle est vraie (probabilité α)._

### Niveau 1

```
H₀ : μ = 135 contre H₁ : μ = 136 (unilatéral), σ = 5 connu, n = 100, niveau α = 5 %. Calcule β et la puissance du test z.
  [guided]  se
    (On garde H₀ alors que H₁ est vraie : quelle erreur ? Une erreur de type 2 (probabilité β).)
    = 5/√(□)   (trous : 5/√(100))   ← σ/√n
    = □   (trous : 0,5)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 1,645)   ← Unilatéral à 5 % : Φ⁻¹(0,95)
  — δ  [juge stat]  départ : δ
    = (136 − □)/0,5   (trous : (136 − 135)/0,5)   ← Sous H₁, T ~ N(δ, 1)
    = □   (trous : 2)
  — β  [juge stat]  départ : β
    = Φ(1,645 − □)   (trous : Φ(1,645 − 2))   ← β = Φ(t_c − δ)
    = □   (trous : 0,3613)
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − □   (trous : 1 − 0,3613)   ← Puissance
    = □   (trous : 0,6387)
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,645-□) | β = 0,3613, puissance 0,6387
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 164 contre H₁ : μ = 167,125 (unilatéral), σ = 10 connu, n = 64, niveau α = 5 %. Calcule β et la puissance du test z.
  [guided]  se
    (On garde H₀ alors que H₁ est vraie : quelle erreur ? Une erreur de type 2 (probabilité β).)
    = 10/√(□)   (trous : 10/√(64))   ← σ/√n
    = □   (trous : 1,25)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 1,645)   ← Unilatéral à 5 % : Φ⁻¹(0,95)
  — δ  [juge stat]  départ : δ
    = (167,125 − □)/1,25   (trous : (167,125 − 164)/1,25)   ← Sous H₁, T ~ N(δ, 1)
    = □   (trous : 2,5)
  — β  [juge stat]  départ : β
    = Φ(1,645 − □)   (trous : Φ(1,645 − 2,5))   ← β = Φ(t_c − δ)
    = □   (trous : 0,1963)
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − □   (trous : 1 − 0,1963)   ← Puissance
    = □   (trous : 0,8037)
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,645-□) | β = 0,1963, puissance 0,8037
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 83 contre H₁ : μ = 84,5 (unilatéral), σ = 5 connu, n = 100, niveau α = 1 %. Calcule β et la puissance du test z.
  [guided]  se
    (On garde H₀ alors que H₁ est vraie : quelle erreur ? Une erreur de type 2 (probabilité β).)
    = 5/√(□)   (trous : 5/√(100))   ← σ/√n
    = □   (trous : 0,5)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,326)   ← Unilatéral à 1 % : Φ⁻¹(0,99)
  — δ  [juge stat]  départ : δ
    = (84,5 − □)/0,5   (trous : (84,5 − 83)/0,5)   ← Sous H₁, T ~ N(δ, 1)
    = □   (trous : 3)
  — β  [juge stat]  départ : β
    = Φ(2,326 − 3)   ← β = Φ(t_c − δ)
    = □   (trous : 0,2502)
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − □   (trous : 1 − 0,2502)   ← Puissance
    = □   (trous : 0,7498)
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(2,326-□) | β = 0,2502, puissance 0,7498
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

```

### Niveau 2

```
H₀ : μ = 13 contre H₁ : μ = 15,5 (unilatéral), σ = 10 connu, n = 100, niveau α = 5 %. Calcule β et la puissance du test z.
  [guided]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 15,5 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 10/√(□)   (trous : 10/√(100))   ← σ/√n
    = □   (trous : 1)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 1,645)   ← Unilatéral à 5 % : Φ⁻¹(0,95)
  — δ  [juge stat]  départ : δ
    = (15,5 − □)/1   (trous : (15,5 − 13)/1)   ← Sous H₁, T ~ N(δ, 1)
    = □   (trous : 2,5)
  — β  [juge stat]  départ : β
    = Φ(1,645 − □)   (trous : Φ(1,645 − 2,5))   ← β = Φ(t_c − δ)
    = □   (trous : 0,1963)
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − □   (trous : 1 − 0,1963)   ← Puissance
    = □   (trous : 0,8037)
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,645-□) | β = 0,1963, puissance 0,8037
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 60 contre H₁ : μ = 64 (unilatéral), σ = 20 connu, n = 100, niveau α = 10 %. Calcule β et la puissance du test z.
  [guided]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 64 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 20/√(□)   (trous : 20/√(100))   ← σ/√n
    = □   (trous : 2)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 1,282)   ← Unilatéral à 10 % : Φ⁻¹(0,9)
  — δ  [juge stat]  départ : δ
    = (64 − □)/2   (trous : (64 − 60)/2)   ← Sous H₁, T ~ N(δ, 1)
    = □   (trous : 2)
  — β  [juge stat]  départ : β
    = Φ(1,282 − 2)   ← β = Φ(t_c − δ)
    = □   (trous : 0,2364)
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − □   (trous : 1 − 0,2364)   ← Puissance
    = □   (trous : 0,7636)
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,282-□) | β = 0,2364, puissance 0,7636
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 17 contre H₁ : μ = 19,5 (unilatéral), σ = 5 connu, n = 25, niveau α = 10 %. Calcule β et la puissance du test z.
  [guided]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 19,5 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 5/√(□)   (trous : 5/√(25))   ← σ/√n
    = □   (trous : 1)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 1,282)   ← Unilatéral à 10 % : Φ⁻¹(0,9)
  — δ  [juge stat]  départ : δ
    = (19,5 − □)/1   (trous : (19,5 − 17)/1)   ← Sous H₁, T ~ N(δ, 1)
    = □   (trous : 2,5)
  — β  [juge stat]  départ : β
    = Φ(1,282 − □)   (trous : Φ(1,282 − 2,5))   ← β = Φ(t_c − δ)
    = □   (trous : 0,1116)
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − □   (trous : 1 − 0,1116)   ← Puissance
    = □   (trous : 0,8884)
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,282-□) | β = 0,1116, puissance 0,8884
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

```

### Niveau 3

```
H₀ : μ = 15 contre H₁ : μ = 17,5 (unilatéral), σ = 10 connu, n = 100, niveau α = 5 %. Calcule β et la puissance du test z.
  [tap, suivre l'erreur, menu menu]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 17,5 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 10/√(100)   ← σ/√n
    = 1
  — tc  [juge stat]  départ : t_c
    = 1,645   ← Unilatéral à 5 % : Φ⁻¹(0,95)
  — δ  [juge stat]  départ : δ
    = (17,5 − 15)/1   ← Sous H₁, T ~ N(δ, 1)
    = 2,5
  — β  [juge stat]  départ : β
    = Φ(1,645 − 2,5)   ← β = Φ(t_c − δ)
    = 0,1963
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,1963   ← Puissance
    = 0,8037
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,645-□) | β = 0,1963, puissance 0,8037
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 180 contre H₁ : μ = 183,75 (unilatéral), σ = 10 connu, n = 64, niveau α = 10 %. Calcule β et la puissance du test z.
  [tap, suivre l'erreur, menu menu]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 183,75 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 10/√(64)   ← σ/√n
    = 1,25
  — tc  [juge stat]  départ : t_c
    = 1,282   ← Unilatéral à 10 % : Φ⁻¹(0,9)
  — δ  [juge stat]  départ : δ
    = (183,75 − 180)/1,25   ← Sous H₁, T ~ N(δ, 1)
    = 3
  — β  [juge stat]  départ : β
    = Φ(1,282 − 3)   ← β = Φ(t_c − δ)
    = 0,0429
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,0429   ← Puissance
    = 0,9571
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,282-□) | β = 0,0429, puissance 0,9571
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 165 contre H₁ : μ = 165,75 (unilatéral), σ = 5 connu, n = 100, niveau α = 10 %. Calcule β et la puissance du test z.
  [tap, suivre l'erreur, menu menu]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 165,75 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 5/√(100)   ← σ/√n
    = 0,5
  — tc  [juge stat]  départ : t_c
    = 1,282   ← Unilatéral à 10 % : Φ⁻¹(0,9)
  — δ  [juge stat]  départ : δ
    = (165,75 − 165)/0,5   ← Sous H₁, T ~ N(δ, 1)
    = 1,5
  — β  [juge stat]  départ : β
    = Φ(1,282 − 1,5)   ← β = Φ(t_c − δ)
    = 0,4137
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,4137   ← Puissance
    = 0,5863
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,282-□) | β = 0,4137, puissance 0,5863
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

```

### Niveau 4

```
H₀ : μ = 81 contre H₁ : μ = 84,75 (unilatéral), σ = 20 connu, n = 64, niveau α = 5 %. Calcule β et la puissance du test z.
  [free, suivre l'erreur]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 84,75 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 20/√(64)   ← σ/√n
    = 2,5
  — tc  [juge stat]  départ : t_c
    = 1,645   ← Unilatéral à 5 % : Φ⁻¹(0,95)
  — δ  [juge stat]  départ : δ
    = (84,75 − 81)/2,5   ← Sous H₁, T ~ N(δ, 1)
    = 1,5
  — β  [juge stat]  départ : β
    = Φ(1,645 − 1,5)   ← β = Φ(t_c − δ)
    = 0,5576
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,5576   ← Puissance
    = 0,4424
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,645-□) | β = 0,5576, puissance 0,4424
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 76 contre H₁ : μ = 78 (unilatéral), σ = 20 connu, n = 100, niveau α = 5 %. Calcule β et la puissance du test z.
  [free, suivre l'erreur]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 78 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 20/√(100)   ← σ/√n
    = 2
  — tc  [juge stat]  départ : t_c
    = 1,645   ← Unilatéral à 5 % : Φ⁻¹(0,95)
  — δ  [juge stat]  départ : δ
    = (78 − 76)/2   ← Sous H₁, T ~ N(δ, 1)
    = 1
  — β  [juge stat]  départ : β
    = Φ(1,645 − 1)   ← β = Φ(t_c − δ)
    = 0,7405
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,7405   ← Puissance
    = 0,2595
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,645-□) | β = 0,7405, puissance 0,2595
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 33 contre H₁ : μ = 38 (unilatéral), σ = 10 connu, n = 25, niveau α = 10 %. Calcule β et la puissance du test z.
  [free, suivre l'erreur]  se
    ? On garde H₀ alors que H₁ est vraie : quelle erreur ? ✔ Une erreur de type 2 (probabilité β) / · Une erreur de type 1 (probabilité α) / · Aucune erreur
    ? On rejette H₀ et en fait μ = 38 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 10/√(25)   ← σ/√n
    = 2
  — tc  [juge stat]  départ : t_c
    = 1,282   ← Unilatéral à 10 % : Φ⁻¹(0,9)
  — δ  [juge stat]  départ : δ
    = (38 − 33)/2   ← Sous H₁, T ~ N(δ, 1)
    = 2,5
  — β  [juge stat]  départ : β
    = Φ(1,282 − 2,5)   ← β = Φ(t_c − δ)
    = 0,1116
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,1116   ← Puissance
    = 0,8884
  aides : Le seuil se fixe sous H₀ ; la puissance se calcule sous H₁, où T ~ N(δ, 1). | Φ(1,282-□) | β = 0,1116, puissance 0,8884
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

```

### Niveau 5

```
H₀ : μ = 78 contre H₁ : μ = 84,25 (unilatéral), σ = 20 connu, n = 64, niveau α = 1 %. Calcule β et la puissance, puis le plus petit n qui donne une puissance d’au moins 0,9.
  [free, sans aide]  se
    ? On rejette H₀ et en fait μ = 84,25 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 20/√(64)   ← σ/√n
    = 2,5
  — tc  [juge stat]  départ : t_c
    = 2,326   ← Unilatéral à 1 % : Φ⁻¹(0,99)
  — δ  [juge stat]  départ : δ
    = (84,25 − 78)/2,5   ← Sous H₁, T ~ N(δ, 1)
    = 2,5
  — β  [juge stat]  départ : β
    = Φ(2,326 − 2,5)   ← β = Φ(t_c − δ)
    = 0,4309
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,4309   ← Puissance
    = 0,5691
  — n  [juge stat]  départ : n
    (n ≥ ((z₁₋α + z₀,₉)·σ/(μ₁ − μ₀))², avec z₀,₉ = Φ⁻¹(0,9) = 1,28 ; on arrondit vers le haut.)
    = 134   ← ((2,326 + 1,28)·20/6,25)² = 133,15
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 126 contre H₁ : μ = 129,75 (unilatéral), σ = 10 connu, n = 64, niveau α = 10 %. Calcule β et la puissance, puis le plus petit n qui donne une puissance d’au moins 0,9.
  [free, sans aide]  se
    ? On rejette H₀ et en fait μ = 129,75 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 10/√(64)   ← σ/√n
    = 1,25
  — tc  [juge stat]  départ : t_c
    = 1,282   ← Unilatéral à 10 % : Φ⁻¹(0,9)
  — δ  [juge stat]  départ : δ
    = (129,75 − 126)/1,25   ← Sous H₁, T ~ N(δ, 1)
    = 3
  — β  [juge stat]  départ : β
    = Φ(1,282 − 3)   ← β = Φ(t_c − δ)
    = 0,0429
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,0429   ← Puissance
    = 0,9571
  — n  [juge stat]  départ : n
    (n ≥ ((z₁₋α + z₀,₉)·σ/(μ₁ − μ₀))², avec z₀,₉ = Φ⁻¹(0,9) = 1,28 ; on arrondit vers le haut.)
    = 47   ← ((1,282 + 1,28)·10/3,75)² = 46,68
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

H₀ : μ = 187 contre H₁ : μ = 189,5 (unilatéral), σ = 20 connu, n = 64, niveau α = 10 %. Calcule β et la puissance, puis le plus petit n qui donne une puissance d’au moins 0,9.
  [free, sans aide]  se
    ? On rejette H₀ et en fait μ = 189,5 : quelle erreur ? ✔ Aucune : la décision est juste / · Une erreur de type 1 / · Une erreur de type 2
    = 20/√(64)   ← σ/√n
    = 2,5
  — tc  [juge stat]  départ : t_c
    = 1,282   ← Unilatéral à 10 % : Φ⁻¹(0,9)
  — δ  [juge stat]  départ : δ
    = (189,5 − 187)/2,5   ← Sous H₁, T ~ N(δ, 1)
    = 1
  — β  [juge stat]  départ : β
    = Φ(1,282 − 1)   ← β = Φ(t_c − δ)
    = 0,611
  — 1 − β  [juge stat]  départ : 1 − β
    = 1 − 0,611   ← Puissance
    = 0,389
  — n  [juge stat]  départ : n
    (n ≥ ((z₁₋α + z₀,₉)·σ/(μ₁ − μ₀))², avec z₀,₉ = Φ⁻¹(0,9) = 1,28 ; on arrondit vers le haut.)
    = 421   ← ((1,282 + 1,28)·20/2,5)² = 420,09
  pièges : p_one_two_sided, p_upper_tail, p_power_alpha, p_type_errors_swap, p_error_when_correct

```

### Variantes d'examen

```
H₀ : μ = 163 contre H₁ : μ = 170 (unilatéral), σ = 20 connu, n = 100, niveau α = 5 %. Quelle est la puissance du test z (deux décimales) ?
  · 0,03 [p_upper_tail]   · 0,95 [p_power_alpha]   · 1   ✔ 0,97
  [examen mcq]
  pièges : p_power_alpha, p_upper_tail

Vrai ou faux ?
  « À niveau α fixé, la puissance d’un test z augmente avec n. » → VRAI
  [examen tf]

H₀ : μ = 193 contre H₁ : μ = 196,75 (unilatéral), σ = 10 connu, n = 64, niveau α = 1 %. Donne la puissance du test z (deux décimales).
  [free, sans aide, examen coef]  1 − β
    = 0,75

```

## Test z : σ connu, asymptotique, une proportion, Wald (`p-test-z`, BA3)

_σ connu, données normales : T = (X̄ − μ₀)/(σ/√n) ~ N(0, 1) sous H₀._

### Niveau 1

```
Des compteurs de moyenne nominale μ₀ = 1 000 ; σ = 10 connu. Sur n = 16 compteurs (normaux), x̄ = 1005,125. Test z unilatéral (H₁ : μ > 1 000). Niveau 5 %.
  [guided]  se₀
    (Quel test ? Test z : σ est connu.)
    = 10/√(□)   (trous : 10/√(16))   ← Sous H₀
    = □   (trous : 2,5)
  — tobs  [juge stat]  départ : t_obs
    = (1005,125 − □)/2,5   (trous : (1005,125 − 1000)/2,5)   ← T = (estimation − valeur de H₀)/se
    = □   (trous : 2,05)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 1,645)   ← Unilatéral à 5 %
  aides : T = (estimation − valeur de H₀)/(erreur standard). | (1005,125-1000)/□ | t_obs = 2,05
  pièges : p_se_forgot_sqrt_n, p_one_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Des compteurs de moyenne nominale μ₀ = 1 000 ; σ = 15 connu. Sur n = 36 compteurs (normaux), x̄ = 1005,625. Test z unilatéral (H₁ : μ > 1 000). Niveau 5 %.
  [guided]  se₀
    (Quel test ? Test z : σ est connu.)
    = 15/√(□)   (trous : 15/√(36))   ← Sous H₀
    = □   (trous : 2,5)
  — tobs  [juge stat]  départ : t_obs
    = (1005,625 − □)/2,5   (trous : (1005,625 − 1000)/2,5)   ← T = (estimation − valeur de H₀)/se
    = □   (trous : 2,25)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 1,645)   ← Unilatéral à 5 %
  aides : T = (estimation − valeur de H₀)/(erreur standard). | (1005,625-1000)/□ | t_obs = 2,25
  pièges : p_se_forgot_sqrt_n, p_one_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Des compteurs de moyenne nominale μ₀ = 1 000 ; σ = 15 connu. Sur n = 36 compteurs (normaux), x̄ = 998,125. Test z bilatéral. Niveau 5 %.
  [guided]  se₀
    (Quel test ? Test z : σ est connu.)
    = 15/√(□)   (trous : 15/√(36))   ← Sous H₀
    = □   (trous : 2,5)
  — tobs  [juge stat]  départ : t_obs
    = (998,125 − □)/2,5   (trous : (998,125 − 1000)/2,5)   ← T = (estimation − valeur de H₀)/se
    = □   (trous : −0,75)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 1,96)   ← Bilatéral à 5 %
  aides : T = (estimation − valeur de H₀)/(erreur standard). | (998,125-1000)/□ | t_obs = -0,75
  pièges : p_se_forgot_sqrt_n, p_one_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 2

```
Des compteurs de moyenne nominale μ₀ = 1 000 ; σ = 20 connu. Sur n = 25 compteurs (normaux), x̄ = 1008,4. Test z unilatéral (H₁ : μ > 1 000). Niveau 5 %.
  [guided]  se₀
    ? Quel test ? ✔ Test z : σ est connu / · Test t de Student
    = 20/√(□)   (trous : 20/√(25))   ← Sous H₀
    = □   (trous : 4)
  — tobs  [juge stat]  départ : t_obs
    = (1008,4 − □)/4   (trous : (1008,4 − 1000)/4)   ← T = (estimation − valeur de H₀)/se
    = □   (trous : 2,1)
  — tc  [juge stat]  départ : t_c
    = □   (trous : 1,645)   ← Unilatéral à 5 %
  aides : T = (estimation − valeur de H₀)/(erreur standard). | (1008,4-1000)/□ | t_obs = 2,1
  pièges : p_se_forgot_sqrt_n, p_one_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Une pièce est lancée 400 fois ; on obtient 227 piles. Est-elle équilibrée ? Test z bilatéral de H₀ : p = 0,5. Niveau 5 %.
  [guided]  se₀
    ? Quel test ? ✔ Test z d’une proportion / · Test t de Student
    = √(0,5·0,5/□)   (trous : √(0,5·0,5/400))   ← Sous H₀
    = □   (trous : 0,025)
  — tobs  [juge stat]  départ : t_obs
    = (0,5675 − 0,5)/0,025   ← T = (estimation − valeur de H₀)/se
    = □   (trous : 2,7)
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(□))   (trous : 2(1 − Φ(2,7)))   ← Bilatéral
    = □   (trous : 0,006)
  aides : Sous H₀, l’écart-type de p̂ est √(p₀(1 − p₀)/n). | (0,5675-0,5)/□ | t_obs = 2,7
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Une pièce est lancée 100 fois ; on obtient 38 piles. Est-elle équilibrée ? Test z bilatéral de H₀ : p = 0,5. Niveau 5 %.
  [guided]  se₀
    ? Quel test ? ✔ Test z d’une proportion / · Test t de Student
    = √(0,5·0,5/□)   (trous : √(0,5·0,5/100))   ← Sous H₀
    = □   (trous : 0,05)
  — tobs  [juge stat]  départ : t_obs
    = (0,38 − □)/0,05   (trous : (0,38 − 0,5)/0,05)   ← T = (estimation − valeur de H₀)/se
    = □   (trous : −2,4)
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(□))   (trous : 2(1 − Φ(2,4)))   ← Bilatéral
    = □   (trous : 0,016)
  aides : Sous H₀, l’écart-type de p̂ est √(p₀(1 − p₀)/n). | (0,38-0,5)/□ | t_obs = -2,4
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

```

### Niveau 3

```
Un fournisseur annonce 20 % de pièces défectueuses. Sur un lot de n = 400 pièces, on en trouve 56. Test z bilatéral de H₀ : p = 0,2. Niveau 5 %.
  [tap, suivre l'erreur, menu menu]  se₀
    ? Quel test ? ✔ Test z d’une proportion / · Test t de Student
    = √(0,2·0,8/400)   ← Sous H₀
    = 0,02
  — tobs  [juge stat]  départ : t_obs
    = (0,14 − 0,2)/0,02   ← T = (estimation − valeur de H₀)/se
    = −3
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(3))   ← Bilatéral
    = 0,0027
  aides : Sous H₀, l’écart-type de p̂ est √(p₀(1 − p₀)/n). | (0,14-0,2)/□ | t_obs = -3
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Sur n = 625 unités, 96 présentent le caractère. On teste H₀ : p = 0,2 contre H₁ : p < 0,2. Niveau 5 %.
  [tap, suivre l'erreur, menu menu]  se₀
    ? Quel test ? ✔ Test z d’une proportion / · Test t de Student
    = √(0,2·0,8/625)   ← Sous H₀
    = 0,016
  — tobs  [juge stat]  départ : t_obs
    = (0,1536 − 0,2)/0,016   ← T = (estimation − valeur de H₀)/se
    = −2,9
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(2,9)   ← Unilatéral
    = 0,002
  aides : Sous H₀, l’écart-type de p̂ est √(p₀(1 − p₀)/n). | (0,1536-0,2)/□ | t_obs = -2,9
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Des compteurs de moyenne nominale μ₀ = 1 000 ; σ = 10 connu. Sur n = 16 compteurs (normaux), x̄ = 1007,375. Test z unilatéral (H₁ : μ > 1 000). Niveau 5 %.
  [tap, suivre l'erreur, menu menu]  se₀
    ? Quel test ? ✔ Test z : σ est connu / · Test t de Student
    = 10/√(16)   ← Sous H₀
    = 2,5
  — tobs  [juge stat]  départ : t_obs
    = (1007,375 − 1000)/2,5   ← T = (estimation − valeur de H₀)/se
    = 2,95
  — tc  [juge stat]  départ : t_c
    = 1,645   ← Unilatéral à 5 %
  aides : T = (estimation − valeur de H₀)/(erreur standard). | (1007,375-1000)/□ | t_obs = 2,95
  pièges : p_se_forgot_sqrt_n, p_one_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 4

```
Des compteurs de moyenne nominale μ₀ = 1 000 ; σ = 30 connu. Sur n = 100 compteurs (normaux), x̄ = 1005,55. Test z bilatéral. Niveau 5 %.
  [free, suivre l'erreur]  se₀
    = 30/√(100)   ← Sous H₀
    = 3
  — tobs  [juge stat]  départ : t_obs
    = (1005,55 − 1000)/3   ← T = (estimation − valeur de H₀)/se
    = 1,85
  — tc  [juge stat]  départ : t_c
    = 1,96   ← Bilatéral à 5 %
  aides : T = (estimation − valeur de H₀)/(erreur standard). | (1005,55-1000)/□ | t_obs = 1,85
  pièges : p_se_forgot_sqrt_n, p_one_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Sur n = 625 unités, 144 présentent le caractère. On teste H₀ : p = 0,2 contre H₁ : p > 0,2. Niveau 5 %.
  [free, suivre l'erreur]  se₀
    = √(0,2·0,8/625)   ← Sous H₀
    = 0,016
  — tobs  [juge stat]  départ : t_obs
    = (0,2304 − 0,2)/0,016   ← T = (estimation − valeur de H₀)/se
    = 1,9
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(1,9)   ← Unilatéral
    = 0,029
  aides : Sous H₀, l’écart-type de p̂ est √(p₀(1 − p₀)/n). | (0,2304-0,2)/□ | t_obs = 1,9
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

Sur n = 900 observations (loi inconnue), x̄ = 264,025 et s = 45. Test z asymptotique de H₀ : μ = 262 contre H₁ : μ > 262. Niveau 5 %.
  [free, suivre l'erreur]  se₀
    = 45/√(900)   ← Sous H₀
    = 1,5
  — tobs  [juge stat]  départ : t_obs
    = (264,025 − 262)/1,5   ← T = (estimation − valeur de H₀)/se
    = 1,35
  — tc  [juge stat]  départ : t_c
    = 1,645   ← Unilatéral à 5 %
  aides : T = (estimation − valeur de H₀)/(erreur standard). | (264,025-262)/□ | t_obs = 1,35
  pièges : p_se_forgot_sqrt_n, p_one_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 5

```
n = 100 comptages de Poisson, λ̂ = x̄ = 4. Test de Wald (EE-209) de H₀ : λ = 3,45, bilatéral : T = √(I(λ̂))·(λ̂ − λ₀) avec I(λ̂) = n/λ̂. Niveau 5 %.
  [free, sans aide]  se₀
    = √(4/100)   ← se = 1/√I(λ̂) = √(λ̂/n)
    = 0,2
  — tobs  [juge stat]  départ : t_obs
    = (4 − 3,45)/0,2   ← T = (estimation − valeur de H₀)/se
    = 2,75
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,75))   ← Bilatéral
    = 0,006
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

n = 100 comptages de Poisson, λ̂ = x̄ = 1. Test de Wald (EE-209) de H₀ : λ = 0,75, bilatéral : T = √(I(λ̂))·(λ̂ − λ₀) avec I(λ̂) = n/λ̂. Niveau 5 %.
  [free, sans aide]  se₀
    = √(1/100)   ← se = 1/√I(λ̂) = √(λ̂/n)
    = 0,1
  — tobs  [juge stat]  départ : t_obs
    = (1 − 0,75)/0,1   ← T = (estimation − valeur de H₀)/se
    = 2,5
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,5))   ← Bilatéral
    = 0,012
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

Sur n = 100 unités, 7 présentent le caractère. On teste H₀ : p = 0,1 contre H₁ : p < 0,1. Niveau 5 %.
  [free, sans aide]  se₀
    = √(0,1·0,9/100)   ← Sous H₀
    = 0,03
  — tobs  [juge stat]  départ : t_obs
    = (0,07 − 0,1)/0,03   ← T = (estimation − valeur de H₀)/se
    = −1
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(1)   ← Unilatéral
    = 0,159
  pièges : p_se_forgot_sqrt_n, p_pvalue_two_sided, p_upper_tail, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Variantes d'examen

```
Un fournisseur annonce 20 % de pièces défectueuses. Sur un lot de n = 625 pièces, on en trouve 140. Test z bilatéral de H₀ : p = 0,2. Quelle est la p-valeur ?
  ✔ 0,134   · 0,866 [p_upper_tail]   · 0,067 [p_pvalue_two_sided]   · 0,952 [p_se_forgot_sqrt_n]
  [examen mcq]
  pièges : p_pvalue_two_sided, p_upper_tail, p_se_forgot_sqrt_n

Vrai ou faux ?
  « Un test z bilatéral à 5 % rejette H₀ : θ = θ₀ si et seulement si θ₀ est hors de l’IC à 95 % construit avec la même statistique. » → VRAI
  [examen tf]

Un fournisseur annonce 20 % de pièces défectueuses. Sur un lot de n = 625 pièces, on en trouve 112. Test z bilatéral de H₀ : p = 0,2. Donne t_obs (deux décimales).
  [free, sans aide, examen coef]  t_obs
    = −1,3

```

## Test t à un échantillon ; données appariées (`p-test-t1`, BA3)

_Données normales, σ inconnu : T = (X̄ − μ₀)/(S/√n) ~ t_{n−1} sous H₀ ; bilatéral à 5 % : rejet si |t_obs| > s₅(n − 1)._

### Niveau 1

```
Sur n = 5 mesures normales, x̄ = 61 et s² = 10. On teste H₀ : μ = 59 contre H₁ : μ ≠ 59 au niveau 5 %.
  [guided]  s/√n
    = √(10/□)   (trous : √(10/5))   ← Erreur standard
    = □   (trous : 1,414)
  — tobs  [juge stat]  départ : t_obs
    = (61 − □)/1,414   (trous : (61 − 59)/1,414)   ← T = (x̄ − μ₀)/(s/√n)
    = □   (trous : 1,41)
  — ν  [juge prob]  départ : ν
    = □   (trous : 4)   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    (Quel quantile ? Student à ν = 4 degrés de liberté, bilatéral : 2,776.)
    = □   (trous : 2,776)   ← Table 3, ν = 4
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (61-59)/□ | t_obs = 1,41, s₅(4) = 2,776
  pièges : p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Sur n = 9 mesures normales, x̄ = 17 et s² = 3. On teste H₀ : μ = 14 contre H₁ : μ ≠ 14 au niveau 5 %.
  [guided]  s/√n
    = √(3/□)   (trous : √(3/9))   ← Erreur standard
    = □   (trous : 0,577)
  — tobs  [juge stat]  départ : t_obs
    = (17 − □)/0,577   (trous : (17 − 14)/0,577)   ← T = (x̄ − μ₀)/(s/√n)
    = □   (trous : 5,2)
  — ν  [juge prob]  départ : ν
    = □   (trous : 8)   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    (Quel quantile ? Student à ν = 8 degrés de liberté, bilatéral : 2,306.)
    = □   (trous : 2,306)   ← Table 3, ν = 8
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (17-14)/□ | t_obs = 5,2, s₅(8) = 2,306
  pièges : p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Sur n = 10 mesures normales, x̄ = 81 et s² = 6. On teste H₀ : μ = 77 contre H₁ : μ ≠ 77 au niveau 5 %.
  [guided]  s/√n
    = √(6/□)   (trous : √(6/10))   ← Erreur standard
    = □   (trous : 0,775)
  — tobs  [juge stat]  départ : t_obs
    = (81 − □)/0,775   (trous : (81 − 77)/0,775)   ← T = (x̄ − μ₀)/(s/√n)
    = □   (trous : 5,16)
  — ν  [juge prob]  départ : ν
    = □   (trous : 9)   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    (Quel quantile ? Student à ν = 9 degrés de liberté, bilatéral : 2,262.)
    = □   (trous : 2,262)   ← Table 3, ν = 9
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (81-77)/□ | t_obs = 5,16, s₅(9) = 2,262
  pièges : p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 2

```
Mesures supposées normales : 54 ; 49 ; 57 ; 47 ; 50 ; 47 ; 57 ; 49 ; 55 ; 55. On teste H₀ : μ = 54 contre H₁ : μ ≠ 54 au niveau 5 %.
  [guided]  x̄
    = (54 + 49 + 57 + 47 + 50 + 47 + 57 + 49 + 55 + 55)/□   (trous : (54 + 49 + 57 + 47 + 50 + 47 + 57 + 49 + 55 + 55)/10)   ← Moyenne
    = □   (trous : 52)
  — s2  [juge prob]  départ : s²
    = (4 + □ + 25 + 25 + 4 + 25 + 25 + 9 + 9 + 9)/9   (trous : (4 + 9 + 25 + 25 + 4 + 25 + 25 + 9 + 9 + 9)/9)   ← Écarts au carré, ÷ (n − 1)
    = 144/9
    = 16
  — s/√n  [juge stat]  départ : s/√n
    = √(16/□)   (trous : √(16/10))   ← Erreur standard
    = □   (trous : 1,265)
  — tobs  [juge stat]  départ : t_obs
    = (52 − □)/1,265   (trous : (52 − 54)/1,265)   ← T = (x̄ − μ₀)/(s/√n)
    = □   (trous : −1,58)
  — ν  [juge prob]  départ : ν
    = □   (trous : 9)   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    ? Quel quantile ? ✔ Student à ν = 9 degrés de liberté, bilatéral : 2,262 / · La loi normale : 1,96 / · Student à ν = 10 : 2,228
    = □   (trous : 2,262)   ← Table 3, ν = 9
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (52-54)/□ | t_obs = -1,58, s₅(9) = 2,262
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Les mêmes 9 personnes sont mesurées avant et après un traitement (avant ; après) : (6 ; 8), (7 ; 5), (8 ; 12), (12 ; 13), (10 ; 10), (9 ; 11), (11 ; 11), (10 ; 12), (5 ; 5). Données supposées normales. Le traitement change-t-il la mesure ? Test bilatéral à 5 %.
  [guided]  d̄
    ? Comment traiter ces données ? ✔ Mêmes personnes : test t sur les différences après − avant / · Deux échantillons indépendants (avant, après)
    = (2 − 2 + 4 + 1 + 0 + 2 + 0 + 2 + 0)/□   (trous : (2 − 2 + 4 + 1 + 0 + 2 + 0 + 2 + 0)/9)   ← Différences : 2 ; −2 ; 4 ; 1 ; 0 ; 2 ; 0 ; 2 ; 0
    = □   (trous : 1)
  — s_d²  [juge prob]  départ : s_d²
    = (1 + 9 + 9 + 0 + 1 + 1 + 1 + 1 + 1)/□   (trous : (1 + 9 + 9 + 0 + 1 + 1 + 1 + 1 + 1)/8)   ← Écarts au carré, ÷ (n − 1)
    = 24/8
    = 3
  — s/√n  [juge stat]  départ : s/√n
    = √(3/□)   (trous : √(3/9))   ← Erreur standard
    = □   (trous : 0,577)
  — tobs  [juge stat]  départ : t_obs
    = (1 − □)/0,577   (trous : (1 − 0)/0,577)   ← T = (x̄ − μ₀)/(s/√n)
    = □   (trous : 1,73)
  — ν  [juge prob]  départ : ν
    = □   (trous : 8)   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    ? Quel quantile ? ✔ Student à ν = 8 degrés de liberté, bilatéral : 2,306 / · La loi normale : 1,96 / · Student à ν = 9 : 2,262
    = □   (trous : 2,306)   ← Table 3, ν = 8
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (1-0)/□ | t_obs = 1,73, s₅(8) = 2,306
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Mesures supposées normales : 88 ; 85 ; 91 ; 87 ; 89. On teste H₀ : μ = 92 contre H₁ : μ ≠ 92 au niveau 5 %.
  [guided]  x̄
    = (88 + 85 + 91 + 87 + 89)/5   ← Moyenne
    = □   (trous : 88)
  — s2  [juge prob]  départ : s²
    = (0 + 9 + 9 + 1 + 1)/□   (trous : (0 + 9 + 9 + 1 + 1)/4)   ← Écarts au carré, ÷ (n − 1)
    = 20/4
    = 5
  — s/√n  [juge stat]  départ : s/√n
    = √(□/5)   (trous : √(5/5))   ← Erreur standard
    = □   (trous : 1)
  — tobs  [juge stat]  départ : t_obs
    = (88 − □)/1   (trous : (88 − 92)/1)   ← T = (x̄ − μ₀)/(s/√n)
    = □   (trous : −4)
  — ν  [juge prob]  départ : ν
    = □   (trous : 4)   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    ? Quel quantile ? ✔ Student à ν = 4 degrés de liberté, bilatéral : 2,776 / · La loi normale : 1,96 / · Student à ν = 5 : 2,571
    = □   (trous : 2,776)   ← Table 3, ν = 4
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (88-92)/□ | t_obs = -4, s₅(4) = 2,776
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 3

```
Mesures supposées normales : 15 ; 11 ; 11 ; 11 ; 9 ; 9 ; 10 ; 9 ; 5. On teste H₀ : μ = 7 contre H₁ : μ ≠ 7 au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  x̄
    = (15 + 11 + 11 + 11 + 9 + 9 + 10 + 9 + 5)/9   ← Moyenne
    = 10
  — s2  [juge prob]  départ : s²
    = (25 + 1 + 1 + 1 + 1 + 1 + 0 + 1 + 25)/8   ← Écarts au carré, ÷ (n − 1)
    = 56/8
    = 7
  — s/√n  [juge stat]  départ : s/√n
    = √(7/9)   ← Erreur standard
    = 0,882
  — tobs  [juge stat]  départ : t_obs
    = (10 − 7)/0,882   ← T = (x̄ − μ₀)/(s/√n)
    = 3,4
  — ν  [juge prob]  départ : ν
    = 8   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    ? Quel quantile ? ✔ Student à ν = 8 degrés de liberté, bilatéral : 2,306 / · La loi normale : 1,96 / · Student à ν = 9 : 2,262
    = 2,306   ← Table 3, ν = 8
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (10-7)/□ | t_obs = 3,4, s₅(8) = 2,306
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Mesures supposées normales : 44 ; 41 ; 38 ; 38 ; 44. On teste H₀ : μ = 40 contre H₁ : μ ≠ 40 au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  x̄
    = (44 + 41 + 38 + 38 + 44)/5   ← Moyenne
    = 41
  — s2  [juge prob]  départ : s²
    = (9 + 0 + 9 + 9 + 9)/4   ← Écarts au carré, ÷ (n − 1)
    = 36/4
    = 9
  — s/√n  [juge stat]  départ : s/√n
    = √(9/5)   ← Erreur standard
    = 1,342
  — tobs  [juge stat]  départ : t_obs
    = (41 − 40)/1,342   ← T = (x̄ − μ₀)/(s/√n)
    = 0,75
  — ν  [juge prob]  départ : ν
    = 4   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    ? Quel quantile ? ✔ Student à ν = 4 degrés de liberté, bilatéral : 2,776 / · La loi normale : 1,96 / · Student à ν = 5 : 2,571
    = 2,776   ← Table 3, ν = 4
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (41-40)/□ | t_obs = 0,75, s₅(4) = 2,776
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Mesures supposées normales : 29 ; 33 ; 29 ; 25 ; 29. On teste H₀ : μ = 26 contre H₁ : μ ≠ 26 au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  x̄
    = (29 + 33 + 29 + 25 + 29)/5   ← Moyenne
    = 29
  — s2  [juge prob]  départ : s²
    = (0 + 16 + 0 + 16 + 0)/4   ← Écarts au carré, ÷ (n − 1)
    = 32/4
    = 8
  — s/√n  [juge stat]  départ : s/√n
    = √(8/5)   ← Erreur standard
    = 1,265
  — tobs  [juge stat]  départ : t_obs
    = (29 − 26)/1,265   ← T = (x̄ − μ₀)/(s/√n)
    = 2,37
  — ν  [juge prob]  départ : ν
    = 4   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    ? Quel quantile ? ✔ Student à ν = 4 degrés de liberté, bilatéral : 2,776 / · La loi normale : 1,96 / · Student à ν = 5 : 2,571
    = 2,776   ← Table 3, ν = 4
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (29-26)/□ | t_obs = 2,37, s₅(4) = 2,776
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 4

```
Mesures supposées normales : 43 ; 41 ; 39 ; 38 ; 47 ; 37 ; 37 ; 40 ; 44 ; 43 ; 47 ; 41 ; 39 ; 45 ; 46 ; 45. On teste H₀ : μ = 45 contre H₁ : μ ≠ 45 au niveau 5 %.
  [free, suivre l'erreur]  x̄
    = (43 + 41 + 39 + 38 + 47 + 37 + 37 + 40 + 44 + 43 + 47 + 41 + 39 + 45 + 46 + 45)/16   ← Moyenne
    = 42
  — s2  [juge prob]  départ : s²
    = (1 + 1 + 9 + 16 + 25 + 25 + 25 + 4 + 4 + 1 + 25 + 1 + 9 + 9 + 16 + 9)/15   ← Écarts au carré, ÷ (n − 1)
    = 180/15
    = 12
  — s/√n  [juge stat]  départ : s/√n
    = √(12/16)   ← Erreur standard
    = 0,866
  — tobs  [juge stat]  départ : t_obs
    = (42 − 45)/0,866   ← T = (x̄ − μ₀)/(s/√n)
    = −3,46
  — ν  [juge prob]  départ : ν
    = 15   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    = 2,131   ← Table 3, ν = 15
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (42-45)/□ | t_obs = -3,46, s₅(15) = 2,131
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Mesures supposées normales : 57 ; 59 ; 55 ; 59 ; 63 ; 61. On teste H₀ : μ = 63 contre H₁ : μ ≠ 63 au niveau 5 %.
  [free, suivre l'erreur]  x̄
    = (57 + 59 + 55 + 59 + 63 + 61)/6   ← Moyenne
    = 59
  — s2  [juge prob]  départ : s²
    = (4 + 0 + 16 + 0 + 16 + 4)/5   ← Écarts au carré, ÷ (n − 1)
    = 40/5
    = 8
  — s/√n  [juge stat]  départ : s/√n
    = √(8/6)   ← Erreur standard
    = 1,155
  — tobs  [juge stat]  départ : t_obs
    = (59 − 63)/1,155   ← T = (x̄ − μ₀)/(s/√n)
    = −3,46
  — ν  [juge prob]  départ : ν
    = 5   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    = 2,571   ← Table 3, ν = 5
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (59-63)/□ | t_obs = -3,46, s₅(5) = 2,571
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Les mêmes 10 personnes sont mesurées avant et après un traitement (avant ; après) : (6 ; 11), (9 ; 8), (9 ; 8), (7 ; 12), (5 ; 9), (11 ; 15), (7 ; 8), (7 ; 10), (9 ; 9), (10 ; 10). Données supposées normales. Le traitement change-t-il la mesure ? Test bilatéral à 5 %.
  [free, suivre l'erreur]  d̄
    ? Comment traiter ces données ? ✔ Mêmes personnes : test t sur les différences après − avant / · Deux échantillons indépendants (avant, après)
    = (5 − 1 − 1 + 5 + 4 + 4 + 1 + 3 + 0 + 0)/10   ← Différences : 5 ; −1 ; −1 ; 5 ; 4 ; 4 ; 1 ; 3 ; 0 ; 0
    = 2
  — s_d²  [juge prob]  départ : s_d²
    = (9 + 9 + 9 + 9 + 4 + 4 + 1 + 1 + 4 + 4)/9   ← Écarts au carré, ÷ (n − 1)
    = 54/9
    = 6
  — s/√n  [juge stat]  départ : s/√n
    = √(6/10)   ← Erreur standard
    = 0,775
  — tobs  [juge stat]  départ : t_obs
    = (2 − 0)/0,775   ← T = (x̄ − μ₀)/(s/√n)
    = 2,58
  — ν  [juge prob]  départ : ν
    = 9   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    = 2,262   ← Table 3, ν = 9
  aides : σ est inconnu : Student à n − 1 degrés de liberté, et l’erreur standard s/√n. | (2-0)/□ | t_obs = 2,58, s₅(9) = 2,262
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 5

```
Les mêmes 10 personnes sont mesurées avant et après un traitement (avant ; après) : (11 ; 16), (5 ; 5), (8 ; 12), (9 ; 8), (8 ; 9), (6 ; 8), (7 ; 7), (6 ; 10), (10 ; 12), (9 ; 12). Données supposées normales. Le traitement change-t-il la mesure ? Test bilatéral à 5 %.
  [free, sans aide]  d̄
    ? Comment traiter ces données ? ✔ Mêmes personnes : test t sur les différences après − avant / · Deux échantillons indépendants (avant, après)
    = (5 + 0 + 4 − 1 + 1 + 2 + 0 + 4 + 2 + 3)/10   ← Différences : 5 ; 0 ; 4 ; −1 ; 1 ; 2 ; 0 ; 4 ; 2 ; 3
    = 2
  — s_d²  [juge prob]  départ : s_d²
    = (9 + 4 + 4 + 9 + 1 + 0 + 4 + 4 + 0 + 1)/9   ← Écarts au carré, ÷ (n − 1)
    = 36/9
    = 4
  — s/√n  [juge stat]  départ : s/√n
    = √(4/10)   ← Erreur standard
    = 0,632
  — tobs  [juge stat]  départ : t_obs
    = (2 − 0)/0,632   ← T = (x̄ − μ₀)/(s/√n)
    = 3,16
  — ν  [juge prob]  départ : ν
    = 9   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    = 2,262   ← Table 3, ν = 9
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Mesures supposées normales : 26 ; 26 ; 20 ; 22 ; 28 ; 20 ; 18 ; 27 ; 25 ; 24 ; 22 ; 28 ; 18 ; 24 ; 21 ; 19. On teste H₀ : μ = 19 contre H₁ : μ ≠ 19 au niveau 5 %.
  [free, sans aide]  x̄
    = (26 + 26 + 20 + 22 + 28 + 20 + 18 + 27 + 25 + 24 + 22 + 28 + 18 + 24 + 21 + 19)/16   ← Moyenne
    = 23
  — s2  [juge prob]  départ : s²
    = (9 + 9 + 9 + 1 + 25 + 9 + 25 + 16 + 4 + 1 + 1 + 25 + 25 + 1 + 4 + 16)/15   ← Écarts au carré, ÷ (n − 1)
    = 180/15
    = 12
  — s/√n  [juge stat]  départ : s/√n
    = √(12/16)   ← Erreur standard
    = 0,866
  — tobs  [juge stat]  départ : t_obs
    = (23 − 19)/0,866   ← T = (x̄ − μ₀)/(s/√n)
    = 4,62
  — ν  [juge prob]  départ : ν
    = 15   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    = 2,131   ← Table 3, ν = 15
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

Mesures supposées normales : 62 ; 64 ; 61 ; 66 ; 61 ; 60 ; 62 ; 58 ; 60 ; 56. On teste H₀ : μ = 62 contre H₁ : μ ≠ 62 au niveau 5 %.
  [free, sans aide]  x̄
    = (62 + 64 + 61 + 66 + 61 + 60 + 62 + 58 + 60 + 56)/10   ← Moyenne
    = 61
  — s2  [juge prob]  départ : s²
    = (1 + 9 + 0 + 25 + 0 + 1 + 1 + 9 + 1 + 25)/9   ← Écarts au carré, ÷ (n − 1)
    = 72/9
    = 8
  — s/√n  [juge stat]  départ : s/√n
    = √(8/10)   ← Erreur standard
    = 0,894
  — tobs  [juge stat]  départ : t_obs
    = (61 − 62)/0,894   ← T = (x̄ − μ₀)/(s/√n)
    = −1,12
  — ν  [juge prob]  départ : ν
    = 9   ← ν = n − 1
  — tc  [juge stat]  départ : t_c
    = 2,262   ← Table 3, ν = 9
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Variantes d'examen

```
Mesures supposées normales : 77 ; 76 ; 82 ; 72 ; 72 ; 82 ; 82 ; 72 ; 78. On teste H₀ : μ = 74 contre H₁ : μ ≠ 74. Quelle est la valeur de t_obs ?
  · 0,69 [p_se_forgot_sqrt_n]   ✔ 2,06   · 4,13   · 2,19 [p_sd_n]
  [examen mcq]
  pièges : p_sd_n, p_se_forgot_sqrt_n

Vrai ou faux ?
  « Si un test rejette H₀ au niveau 1 %, il la rejette aussi au niveau 5 %. » → VRAI
  [examen tf]

Les mêmes 9 personnes sont mesurées avant et après un traitement (avant ; après) : (8 ; 8), (5 ; 3), (7 ; 7), (7 ; 9), (8 ; 12), (10 ; 12), (8 ; 8), (5 ; 6), (10 ; 12). Données supposées normales. Le traitement change-t-il la mesure ? Test bilatéral à 5 %. Donne t_obs (deux décimales).
  [free, sans aide, examen coef]  t_obs
    = 1,73

Mesures supposées normales : 12 ; 16 ; 10 ; 12 ; 14 ; 8. On teste H₀ : μ = 13 contre H₁ : μ ≠ 13 au niveau 5 %. Puis donne l’IC à 95 % pour μ (deux décimales).
  [problème, examen open, 10 points]
  partie 1 (Test t et IC : 1,5 ; s2 : 1,5 ; s/√n : 1,5 ; tobs : 1,5 ; ν : 1 ; tc : 1 ; IC : 1)
  Mesures supposées normales : 12 ; 16 ; 10 ; 12 ; 14 ; 8. On teste H₀ : μ = 13 contre H₁ : μ ≠ 13 au niveau 5 %. Puis donne l’IC à 95 % pour μ (deux décimales).
    [free, sans aide, suivre l'erreur, examen open]  x̄
      = (12 + 16 + 10 + 12 + 14 + 8)/6   ← Moyenne
      = 12
    — s2  [juge prob]  départ : s²
      = (0 + 16 + 4 + 0 + 4 + 16)/5   ← Écarts au carré, ÷ (n − 1)
      = 40/5
      = 8
    — s/√n  [juge stat]  départ : s/√n
      = √(8/6)   ← Erreur standard
      = 1,155
    — tobs  [juge stat]  départ : t_obs
      = (12 − 13)/1,155   ← T = (x̄ − μ₀)/(s/√n)
      = −0,87
    — ν  [juge prob]  départ : ν
      = 5   ← ν = n − 1
    — tc  [juge stat]  départ : t_c
      = 2,571   ← Table 3, ν = 5
    — IC  [juge stat]  départ : IC
      = [12 − 2,571·1,155 ; 12 + 2,571·1,155]   ← x̄ ± t_c·s/√n
      = [9,03 ; 14,97]
  partie 2 (Interpréter : 1)
  Conclure et interpréter : quelle phrase est juste ?
    · H₀ est vraie avec une probabilité de 0,95. [p_pvalue_h0]   · Les données prouvent que μ vaut 13. [p_accept_h0]   · On rejette H₀ au niveau 5 %. [p_pvalue_alpha_compare]   ✔ On ne rejette pas H₀ au niveau 5 % : les données ne contredisent pas l’hypothèse que μ vaut 13.
    [examen open]
  pièges : p_sd_n, p_se_forgot_sqrt_n, p_df_wrong, p_t_vs_z, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

## Test t à deux échantillons, variance poolée (et test F) (`p-test-t2`, BA3)

_Deux échantillons normaux indépendants de même variance : s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2) ; T = (x̄₁ −…_

### Niveau 1

```
Deux groupes indépendants, supposés normaux : n₁ = 10, x̄₁ = 18, s₁² = 12 ; n₂ = 4, x̄₂ = 16, s₂² = 30. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(9 ; 3) : 0,197 et 14,473.
  [guided]  F
    (Ces deux groupes sont-ils… Deux échantillons indépendants (des individus différents).)
    = 0,4   ← F = s₁²/s₂² = 12/30
  — s_p²  [juge prob]  départ : s_p²
    = (9·□ + 3·30)/12   (trous : (9·12 + 3·30)/12)   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = □   (trous : 33/2)
  — se  [juge stat]  départ : se
    = √(33/2·(1/10 + 1/4))   ← se
    = 2,403
  — tobs  [juge stat]  départ : t_obs
    = (18 − 16)/2,403   ← T = (x̄₁ − x̄₂)/se
    = 0,83
  — ν  [juge prob]  départ : ν
    = □   (trous : 12)   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,179)   ← Table 3, ν = 12
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (9×12+3×30)/□ | s_p² = 33 / 2
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Deux groupes indépendants, supposés normaux : n₁ = 6, x̄₁ = 18, s₁² = 14 ; n₂ = 9, x̄₂ = 17, s₂² = 6. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(5 ; 8) : 0,148 et 4,817.
  [guided]  F
    (Ces deux groupes sont-ils… Deux échantillons indépendants (des individus différents).)
    = 2,333   ← F = s₁²/s₂² = 14/6
  — s_p²  [juge prob]  départ : s_p²
    = (5·14 + 8·6)/□   (trous : (5·14 + 8·6)/13)   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = □   (trous : 118/13)
  — se  [juge stat]  départ : se
    = √(118/13·(1/6 + 1/9))   ← se
    = 1,588
  — tobs  [juge stat]  départ : t_obs
    = (18 − 17)/1,588   ← T = (x̄₁ − x̄₂)/se
    = 0,63
  — ν  [juge prob]  départ : ν
    = □   (trous : 13)   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,16)   ← Table 3, ν = 13
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (5×14+8×6)/□ | s_p² = 118 / 13
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Deux groupes indépendants, supposés normaux : n₁ = 9, x̄₁ = 10, s₁² = 18 ; n₂ = 8, x̄₂ = 13, s₂² = 28. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(8 ; 7) : 0,221 et 4,899.
  [guided]  F
    (Ces deux groupes sont-ils… Deux échantillons indépendants (des individus différents).)
    = 0,643   ← F = s₁²/s₂² = 18/28
  — s_p²  [juge prob]  départ : s_p²
    = (8·18 + 7·28)/□   (trous : (8·18 + 7·28)/15)   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = □   (trous : 68/3)
  — se  [juge stat]  départ : se
    = √(68/3·(1/9 + 1/8))   ← se
    = 2,313
  — tobs  [juge stat]  départ : t_obs
    = (10 − 13)/2,313   ← T = (x̄₁ − x̄₂)/se
    = −1,3
  — ν  [juge prob]  départ : ν
    = □   (trous : 15)   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,131)   ← Table 3, ν = 15
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (8×18+7×28)/□ | s_p² = 68 / 3
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 2

```
Deux groupes indépendants, supposés normaux : n₁ = 10, x̄₁ = 25, s₁² = 16 ; n₂ = 10, x̄₂ = 26, s₂² = 16. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(9 ; 9) : 0,248 et 4,026.
  [guided]  F
    ? Ces deux groupes sont-ils… ✔ Deux échantillons indépendants (des individus différents) / · Des données appariées : on teste les différences groupe par groupe
    = 1   ← F = s₁²/s₂² = 16/16
  — s_p²  [juge prob]  départ : s_p²
    ? F = 1 et l’énoncé donne F(9 ; 9) entre 0,248 et 4,026 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (9·16 + 9·16)/□   (trous : (9·16 + 9·16)/18)   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = □   (trous : 16)
  — se  [juge stat]  départ : se
    = √(16·(1/10 + 1/10))   ← se
    = 1,789
  — tobs  [juge stat]  départ : t_obs
    = (25 − 26)/1,789   ← T = (x̄₁ − x̄₂)/se
    = −0,56
  — ν  [juge prob]  départ : ν
    = □   (trous : 18)   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,101)   ← Table 3, ν = 18
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (9×16+9×16)/□ | s_p² = 16
  pièges : p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0, p_pooled_average

Deux groupes indépendants, supposés normaux : n₁ = 4, x̄₁ = 30, s₁² = 6 ; n₂ = 5, x̄₂ = 28, s₂² = 2. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(3 ; 4) : 0,066 et 9,979.
  [guided]  F
    ? Ces deux groupes sont-ils… ✔ Deux échantillons indépendants (des individus différents) / · Des données appariées : on teste les différences groupe par groupe
    = 3   ← F = s₁²/s₂² = 6/2
  — s_p²  [juge prob]  départ : s_p²
    ? F = 3 et l’énoncé donne F(3 ; 4) entre 0,066 et 9,979 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (3·6 + 4·2)/□   (trous : (3·6 + 4·2)/7)   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = □   (trous : 26/7)
  — se  [juge stat]  départ : se
    = √(26/7·(1/4 + 1/5))   ← se
    = 1,293
  — tobs  [juge stat]  départ : t_obs
    = (30 − 28)/1,293   ← T = (x̄₁ − x̄₂)/se
    = 1,55
  — ν  [juge prob]  départ : ν
    = □   (trous : 7)   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,365)   ← Table 3, ν = 7
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (3×6+4×2)/□ | s_p² = 26 / 7
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Deux groupes indépendants, supposés normaux : n₁ = 5, x̄₁ = 25, s₁² = 10 ; n₂ = 5, x̄₂ = 28, s₂² = 18. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(4 ; 4) : 0,104 et 9,605.
  [guided]  F
    ? Ces deux groupes sont-ils… ✔ Deux échantillons indépendants (des individus différents) / · Des données appariées : on teste les différences groupe par groupe
    = 0,556   ← F = s₁²/s₂² = 10/18
  — s_p²  [juge prob]  départ : s_p²
    ? F = 0,556 et l’énoncé donne F(4 ; 4) entre 0,104 et 9,605 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (4·10 + 4·18)/8   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = □   (trous : 14)
  — se  [juge stat]  départ : se
    = √(14·(1/5 + 1/5))   ← se
    = 2,366
  — tobs  [juge stat]  départ : t_obs
    = (25 − 28)/2,366   ← T = (x̄₁ − x̄₂)/se
    = −1,27
  — ν  [juge prob]  départ : ν
    = □   (trous : 8)   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,306)   ← Table 3, ν = 8
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (4×10+4×18)/□ | s_p² = 14
  pièges : p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0, p_pooled_average

```

### Niveau 3

```
Deux groupes indépendants, supposés normaux : n₁ = 6, x̄₁ = 19, s₁² = 14 ; n₂ = 5, x̄₂ = 17, s₂² = 5. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(5 ; 4) : 0,135 et 9,364.
  [tap, suivre l'erreur, menu menu]  F
    ? Ces deux groupes sont-ils… ✔ Deux échantillons indépendants (des individus différents) / · Des données appariées : on teste les différences groupe par groupe
    = 2,8   ← F = s₁²/s₂² = 14/5
  — s_p²  [juge prob]  départ : s_p²
    ? F = 2,8 et l’énoncé donne F(5 ; 4) entre 0,135 et 9,364 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (5·14 + 4·5)/9   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 10
  — se  [juge stat]  départ : se
    = √(10·(1/6 + 1/5))   ← se
    = 1,915
  — tobs  [juge stat]  départ : t_obs
    = (19 − 17)/1,915   ← T = (x̄₁ − x̄₂)/se
    = 1,04
  — ν  [juge prob]  départ : ν
    = 9   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,262   ← Table 3, ν = 9
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (5×14+4×5)/□ | s_p² = 10
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Deux groupes indépendants, supposés normaux : n₁ = 7, x̄₁ = 27, s₁² = 24 ; n₂ = 7, x̄₂ = 28, s₂² = 8. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(6 ; 6) : 0,172 et 5,82.
  [tap, suivre l'erreur, menu menu]  F
    ? Ces deux groupes sont-ils… ✔ Deux échantillons indépendants (des individus différents) / · Des données appariées : on teste les différences groupe par groupe
    = 3   ← F = s₁²/s₂² = 24/8
  — s_p²  [juge prob]  départ : s_p²
    ? F = 3 et l’énoncé donne F(6 ; 6) entre 0,172 et 5,82 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (6·24 + 6·8)/12   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 16
  — se  [juge stat]  départ : se
    = √(16·(1/7 + 1/7))   ← se
    = 2,138
  — tobs  [juge stat]  départ : t_obs
    = (27 − 28)/2,138   ← T = (x̄₁ − x̄₂)/se
    = −0,47
  — ν  [juge prob]  départ : ν
    = 12   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,179   ← Table 3, ν = 12
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (6×24+6×8)/□ | s_p² = 16
  pièges : p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0, p_pooled_average

Deux groupes indépendants, supposés normaux : n₁ = 7, x̄₁ = 30, s₁² = 15 ; n₂ = 10, x̄₂ = 35, s₂² = 24. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). Quantiles de F(6 ; 9) : 0,181 et 4,32.
  [tap, suivre l'erreur, menu menu]  F
    ? Ces deux groupes sont-ils… ✔ Deux échantillons indépendants (des individus différents) / · Des données appariées : on teste les différences groupe par groupe
    = 0,625   ← F = s₁²/s₂² = 15/24
  — s_p²  [juge prob]  départ : s_p²
    ? F = 0,625 et l’énoncé donne F(6 ; 9) entre 0,181 et 4,32 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (6·15 + 9·24)/15   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 102/5
  — se  [juge stat]  départ : se
    = √(102/5·(1/7 + 1/10))   ← se
    = 2,226
  — tobs  [juge stat]  départ : t_obs
    = (30 − 35)/2,226   ← T = (x̄₁ − x̄₂)/se
    = −2,25
  — ν  [juge prob]  départ : ν
    = 15   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,131   ← Table 3, ν = 15
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (6×15+9×24)/□ | s_p² = 102 / 5
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 4

```
Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 21 ; 31 ; 27 ; 21 ; 26 ; 25 ; 31. Groupe 2 : 23 ; 14 ; 17 ; 26. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(6 ; 3) : 0,152 (2,5 %) et 14,735 (97,5 %).
  [free, suivre l'erreur]  x̄₁
    = (21 + 31 + 27 + 21 + 26 + 25 + 31)/7   ← Groupe 1
    = 26
  — s₁2  [juge prob]  départ : s_1²
    = 102/6   ← Σ(x − x̄)² = 102, ÷ (n − 1)
    = 17
  — x̄₂  [juge prob]  départ : x̄₂
    = (23 + 14 + 17 + 26)/4   ← Groupe 2
    = 20
  — s₂2  [juge prob]  départ : s_2²
    = 90/3   ← Σ(x − x̄)² = 90, ÷ (n − 1)
    = 30
  — F  [juge stat]  départ : F
    = 0,567   ← F = s₁²/s₂² = 17/30
  — s_p²  [juge prob]  départ : s_p²
    ? F = 0,567 et l’énoncé donne F(6 ; 3) entre 0,152 et 14,735 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (6·17 + 3·30)/9   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 64/3
  — se  [juge stat]  départ : se
    = √(64/3·(1/7 + 1/4))   ← se
    = 2,895
  — tobs  [juge stat]  départ : t_obs
    = (26 − 20)/2,895   ← T = (x̄₁ − x̄₂)/se
    = 2,07
  — ν  [juge prob]  départ : ν
    = 9   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,262   ← Table 3, ν = 9
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (6×17+3×30)/□ | s_p² = 64 / 3
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 37 ; 25 ; 31 ; 31. Groupe 2 : 27 ; 32 ; 34 ; 33 ; 25 ; 35 ; 26 ; 24 ; 23 ; 31. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(3 ; 9) : 0,069 (2,5 %) et 5,078 (97,5 %).
  [free, suivre l'erreur]  x̄₁
    = (37 + 25 + 31 + 31)/4   ← Groupe 1
    = 31
  — s₁2  [juge prob]  départ : s_1²
    = 72/3   ← Σ(x − x̄)² = 72, ÷ (n − 1)
    = 24
  — x̄₂  [juge prob]  départ : x̄₂
    = (27 + 32 + 34 + 33 + 25 + 35 + 26 + 24 + 23 + 31)/10   ← Groupe 2
    = 29
  — s₂2  [juge prob]  départ : s_2²
    = 180/9   ← Σ(x − x̄)² = 180, ÷ (n − 1)
    = 20
  — F  [juge stat]  départ : F
    = 1,2   ← F = s₁²/s₂² = 24/20
  — s_p²  [juge prob]  départ : s_p²
    ? F = 1,2 et l’énoncé donne F(3 ; 9) entre 0,069 et 5,078 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (3·24 + 9·20)/12   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 21
  — se  [juge stat]  départ : se
    = √(21·(1/4 + 1/10))   ← se
    = 2,711
  — tobs  [juge stat]  départ : t_obs
    = (31 − 29)/2,711   ← T = (x̄₁ − x̄₂)/se
    = 0,74
  — ν  [juge prob]  départ : ν
    = 12   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,179   ← Table 3, ν = 12
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (3×24+9×20)/□ | s_p² = 21
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 24 ; 23 ; 15 ; 12 ; 16 ; 13 ; 21 ; 20 ; 13 ; 23. Groupe 2 : 17 ; 23 ; 17 ; 23. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(9 ; 3) : 0,197 (2,5 %) et 14,473 (97,5 %).
  [free, suivre l'erreur]  x̄₁
    = (24 + 23 + 15 + 12 + 16 + 13 + 21 + 20 + 13 + 23)/10   ← Groupe 1
    = 18
  — s₁2  [juge prob]  départ : s_1²
    = 198/9   ← Σ(x − x̄)² = 198, ÷ (n − 1)
    = 22
  — x̄₂  [juge prob]  départ : x̄₂
    = (17 + 23 + 17 + 23)/4   ← Groupe 2
    = 20
  — s₂2  [juge prob]  départ : s_2²
    = 36/3   ← Σ(x − x̄)² = 36, ÷ (n − 1)
    = 12
  — F  [juge stat]  départ : F
    = 1,833   ← F = s₁²/s₂² = 22/12
  — s_p²  [juge prob]  départ : s_p²
    ? F = 1,833 et l’énoncé donne F(9 ; 3) entre 0,197 et 14,473 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (9·22 + 3·12)/12   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 39/2
  — se  [juge stat]  départ : se
    = √(39/2·(1/10 + 1/4))   ← se
    = 2,612
  — tobs  [juge stat]  départ : t_obs
    = (18 − 20)/2,612   ← T = (x̄₁ − x̄₂)/se
    = −0,77
  — ν  [juge prob]  départ : ν
    = 12   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,179   ← Table 3, ν = 12
  aides : Pondère chaque s² par ses degrés de liberté ; ν = n₁ + n₂ − 2. | (9×22+3×12)/□ | s_p² = 39 / 2
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 5

```
Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 13 ; 13 ; 9 ; 17 ; 15 ; 11. Groupe 2 : 10 ; 10 ; 12 ; 17 ; 5 ; 12 ; 7 ; 15 ; 11 ; 11. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(5 ; 9) : 0,15 (2,5 %) et 4,484 (97,5 %).
  [free, sans aide]  x̄₁
    = (13 + 13 + 9 + 17 + 15 + 11)/6   ← Groupe 1
    = 13
  — s₁2  [juge prob]  départ : s_1²
    = 40/5   ← Σ(x − x̄)² = 40, ÷ (n − 1)
    = 8
  — x̄₂  [juge prob]  départ : x̄₂
    = (10 + 10 + 12 + 17 + 5 + 12 + 7 + 15 + 11 + 11)/10   ← Groupe 2
    = 11
  — s₂2  [juge prob]  départ : s_2²
    = 108/9   ← Σ(x − x̄)² = 108, ÷ (n − 1)
    = 12
  — F  [juge stat]  départ : F
    = 0,667   ← F = s₁²/s₂² = 8/12
  — s_p²  [juge prob]  départ : s_p²
    ? F = 0,667 et l’énoncé donne F(5 ; 9) entre 0,15 et 4,484 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (5·8 + 9·12)/14   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 74/7
  — se  [juge stat]  départ : se
    = √(74/7·(1/6 + 1/10))   ← se
    = 1,679
  — tobs  [juge stat]  départ : t_obs
    = (13 − 11)/1,679   ← T = (x̄₁ − x̄₂)/se
    = 1,19
  — ν  [juge prob]  départ : ν
    = 14   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,145   ← Table 3, ν = 14
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 15 ; 22 ; 17 ; 14 ; 15 ; 18 ; 17 ; 10. Groupe 2 : 13 ; 15 ; 17 ; 11 ; 11 ; 11 ; 17 ; 14 ; 17. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(7 ; 8) : 0,204 (2,5 %) et 4,529 (97,5 %).
  [free, sans aide]  x̄₁
    = (15 + 22 + 17 + 14 + 15 + 18 + 17 + 10)/8   ← Groupe 1
    = 16
  — s₁2  [juge prob]  départ : s_1²
    = 84/7   ← Σ(x − x̄)² = 84, ÷ (n − 1)
    = 12
  — x̄₂  [juge prob]  départ : x̄₂
    = (13 + 15 + 17 + 11 + 11 + 11 + 17 + 14 + 17)/9   ← Groupe 2
    = 14
  — s₂2  [juge prob]  départ : s_2²
    = 56/8   ← Σ(x − x̄)² = 56, ÷ (n − 1)
    = 7
  — F  [juge stat]  départ : F
    = 1,714   ← F = s₁²/s₂² = 12/7
  — s_p²  [juge prob]  départ : s_p²
    ? F = 1,714 et l’énoncé donne F(7 ; 8) entre 0,204 et 4,529 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (7·12 + 8·7)/15   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 28/3
  — se  [juge stat]  départ : se
    = √(28/3·(1/8 + 1/9))   ← se
    = 1,484
  — tobs  [juge stat]  départ : t_obs
    = (16 − 14)/1,484   ← T = (x̄₁ − x̄₂)/se
    = 1,35
  — ν  [juge prob]  départ : ν
    = 15   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,131   ← Table 3, ν = 15
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 22 ; 22 ; 28 ; 16. Groupe 2 : 28 ; 24 ; 20 ; 24 ; 26 ; 32 ; 24 ; 28 ; 28. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(3 ; 8) : 0,069 (2,5 %) et 5,416 (97,5 %).
  [free, sans aide]  x̄₁
    = (22 + 22 + 28 + 16)/4   ← Groupe 1
    = 22
  — s₁2  [juge prob]  départ : s_1²
    = 72/3   ← Σ(x − x̄)² = 72, ÷ (n − 1)
    = 24
  — x̄₂  [juge prob]  départ : x̄₂
    = (28 + 24 + 20 + 24 + 26 + 32 + 24 + 28 + 28)/9   ← Groupe 2
    = 26
  — s₂2  [juge prob]  départ : s_2²
    = 96/8   ← Σ(x − x̄)² = 96, ÷ (n − 1)
    = 12
  — F  [juge stat]  départ : F
    = 2   ← F = s₁²/s₂² = 24/12
  — s_p²  [juge prob]  départ : s_p²
    ? F = 2 et l’énoncé donne F(3 ; 8) entre 0,069 et 5,416 (95 %) : ✔ Variances compatibles : le test t poolé convient / · Variances différentes : il faudrait le test de Welch
    = (3·24 + 8·12)/11   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 168/11
  — se  [juge stat]  départ : se
    = √(168/11·(1/4 + 1/9))   ← se
    = 2,348
  — tobs  [juge stat]  départ : t_obs
    = (22 − 26)/2,348   ← T = (x̄₁ − x̄₂)/se
    = −1,7
  — ν  [juge prob]  départ : ν
    = 11   ← ν = n₁ + n₂ − 2
  — tc  [juge stat]  départ : t_c
    = 2,201   ← Table 3, ν = 11
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Variantes d'examen

```
Deux groupes indépendants, normaux de même variance : n₁ = 6, x̄₁ = 11, s₁² = 18 ; n₂ = 4, x̄₂ = 17, s₂² = 48. Quelle est la statistique t_obs du test t poolé ?
  ✔ −1,72   · −1,62 [p_pooled_average]   · −0,74 [p_two_sample_se]   · −3,44
  [examen mcq]
  pièges : p_pooled_average, p_two_sample_se

Vrai ou faux ?
  « Le test t poolé à deux échantillons de tailles n₁ et n₂ a n₁ + n₂ − 1 degrés de liberté. » → FAUX
    contre-exemple (refute) : a = 5, b = 5, v = 8
  [examen tf]
  pièges : p_df_wrong

Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 19 ; 22 ; 21 ; 13 ; 15 ; 12 ; 15 ; 19. Groupe 2 : 24 ; 22 ; 14 ; 18 ; 22 ; 14 ; 20 ; 12 ; 16 ; 18. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(7 ; 9) : 0,207 (2,5 %) et 4,197 (97,5 %). Donne la variance poolée s_p².
  [free, sans aide, examen coef]  s_p²
    = (7·14 + 9·16)/16   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
    = 121/8
  pièges : p_pooled_average

Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 19 ; 20 ; 11 ; 8 ; 9 ; 14 ; 17 ; 14. Groupe 2 : 12 ; 24 ; 18 ; 18. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(7 ; 3) : 0,17 (2,5 %) et 14,624 (97,5 %).
  [problème, examen open, 10 points]
  partie 1 (Test t à deux échantillons : 1 ; s₁2 : 1 ; x̄₂ : 1 ; s₂2 : 1 ; F : 1 ; s_p² : 1 ; se : 1 ; tobs : 1 ; ν : 0,5 ; tc : 0,5)
  Deux groupes indépendants, supposés normaux de même variance. Groupe 1 : 19 ; 20 ; 11 ; 8 ; 9 ; 14 ; 17 ; 14. Groupe 2 : 12 ; 24 ; 18 ; 18. On teste H₀ : μ₁ = μ₂ (bilatéral, 5 %). On donne les quantiles de F(7 ; 3) : 0,17 (2,5 %) et 14,624 (97,5 %).
    [free, sans aide, suivre l'erreur, examen open]  x̄₁
      = (19 + 20 + 11 + 8 + 9 + 14 + 17 + 14)/8   ← Groupe 1
      = 14
    — s₁2  [juge prob]  départ : s_1²
      = 140/7   ← Σ(x − x̄)² = 140, ÷ (n − 1)
      = 20
    — x̄₂  [juge prob]  départ : x̄₂
      = (12 + 24 + 18 + 18)/4   ← Groupe 2
      = 18
    — s₂2  [juge prob]  départ : s_2²
      = 72/3   ← Σ(x − x̄)² = 72, ÷ (n − 1)
      = 24
    — F  [juge stat]  départ : F
      = 0,833   ← F = s₁²/s₂² = 20/24
    — s_p²  [juge prob]  départ : s_p²
      = (7·20 + 3·24)/10   ← s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2)
      = 106/5
    — se  [juge stat]  départ : se
      = √(106/5·(1/8 + 1/4))   ← se
      = 2,82
    — tobs  [juge stat]  départ : t_obs
      = (14 − 18)/2,82   ← T = (x̄₁ − x̄₂)/se
      = −1,42
    — ν  [juge prob]  départ : ν
      = 10   ← ν = n₁ + n₂ − 2
    — tc  [juge stat]  départ : t_c
      = 2,228   ← Table 3, ν = 10
  partie 2 (Interpréter : 1)
  Conclure et interpréter : quelle phrase est juste ?
    ✔ On ne rejette pas H₀ au niveau 5 % : les données ne contredisent pas l’hypothèse que les deux moyennes sont égales.   · Les données prouvent que les deux moyennes sont égales. [p_accept_h0]   · H₀ est vraie avec une probabilité de 0,95. [p_pvalue_h0]   · On rejette H₀ au niveau 5 %. [p_pvalue_alpha_compare]
    [examen open]
  pièges : p_pooled_average, p_two_sample_se, p_df_wrong, p_t_vs_z, p_paired_as_two, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

## Comparer deux proportions (`p-test-two-prop`, BA3)

_Proportion commune p̂ = (k₁ + k₂)/(n₁ + n₂) sous H₀, puis un test z._

### Niveau 1

```
50 « oui » dans la région 1 sur n₁ = 100, et 110 dans la région 2 sur n₂ = 200. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [guided]  p̂₁
    = 50/100
    = 0,5
  — p̂₂  [juge prob]  départ : p̂₂
    = 110/200
    = 0,55
  — p̂  [juge prob]  départ : p̂
    (Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? Avec tous les individus : (k₁ + k₂)/(n₁ + n₂).)
    = (50 + 110)/(100 + 200)   ← Proportion poolée
    = □   (trous : 8/15)
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

90 guérisons avec le traitement A sur n₁ = 200, et 30 avec le traitement B sur n₂ = 100. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [guided]  p̂₁
    = 90/200
    = 0,45
  — p̂₂  [juge prob]  départ : p̂₂
    = 30/100
    = 0,3
  — p̂  [juge prob]  départ : p̂
    (Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? Avec tous les individus : (k₁ + k₂)/(n₁ + n₂).)
    = (90 + 30)/(200 + 100)   ← Proportion poolée
    = □   (trous : 2/5)
  — se  [juge stat]  départ : se
    = √(0,4·0,6·(1/200 + 1/100))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,06
  — tobs  [juge stat]  départ : t_obs
    = (0,45 − 0,3)/0,06
    = 2,5
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,5))   ← Bilatéral
    = 0,012
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (90+30)/□ | p̂ = 2/5
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

50 « oui » dans la région 1 sur n₁ = 100, et 35 dans la région 2 sur n₂ = 100. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [guided]  p̂₁
    = 50/100
    = 0,5
  — p̂₂  [juge prob]  départ : p̂₂
    = 35/100
    = 0,35
  — p̂  [juge prob]  départ : p̂
    (Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? Avec tous les individus : (k₁ + k₂)/(n₁ + n₂).)
    = (50 + 35)/(100 + 100)   ← Proportion poolée
    = □   (trous : 17/40)
  — se  [juge stat]  départ : se
    = √(0,425·0,575·(1/100 + 1/100))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0699
  — tobs  [juge stat]  départ : t_obs
    = (0,5 − 0,35)/0,0699
    = 2,15
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,15))   ← Bilatéral
    = 0,032
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (50+35)/□ | p̂ = 17/40
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

```

### Niveau 2

```
15 pièces défectueuses de la machine 1 sur n₁ = 100, et 40 de la machine 2 sur n₂ = 200. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [guided]  p̂₁
    = 15/100
    = 0,15
  — p̂₂  [juge prob]  départ : p̂₂
    = 40/200
    = 0,2
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (15 + 40)/(100 + 200)   ← Proportion poolée
    = □   (trous : 11/60)
  — se  [juge stat]  départ : se
    = √(0,1833·0,8167·(1/100 + 1/200))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0474
  — tobs  [juge stat]  départ : t_obs
    = (0,15 − 0,2)/0,0474
    = −1,05
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(1,05))   ← Bilatéral
    = 0,294
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (15+40)/□ | p̂ = 11/60
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

80 pièces défectueuses de la machine 1 sur n₁ = 200, et 60 de la machine 2 sur n₂ = 200. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [guided]  p̂₁
    = 80/200
    = 0,4
  — p̂₂  [juge prob]  départ : p̂₂
    = 60/200
    = 0,3
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (80 + 60)/(200 + 200)   ← Proportion poolée
    = □   (trous : 7/20)
  — se  [juge stat]  départ : se
    = √(0,35·0,65·(1/200 + 1/200))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0477
  — tobs  [juge stat]  départ : t_obs
    = (0,4 − 0,3)/0,0477
    = 2,1
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,1))   ← Bilatéral
    = 0,036
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (80+60)/□ | p̂ = 7/20
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

65 guérisons avec le traitement A sur n₁ = 100, et 45 avec le traitement B sur n₂ = 100. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [guided]  p̂₁
    = 65/100
    = 0,65
  — p̂₂  [juge prob]  départ : p̂₂
    = 45/100
    = 0,45
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (65 + 45)/(100 + 100)   ← Proportion poolée
    = □   (trous : 11/20)
  — se  [juge stat]  départ : se
    = √(0,55·0,45·(1/100 + 1/100))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0704
  — tobs  [juge stat]  départ : t_obs
    = (0,65 − 0,45)/0,0704
    = 2,84
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,84))   ← Bilatéral
    = 0,004
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (65+45)/□ | p̂ = 11/20
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 3

```
260 pièces défectueuses de la machine 1 sur n₁ = 400, et 50 de la machine 2 sur n₂ = 100. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  p̂₁
    = 260/400
    = 0,65
  — p̂₂  [juge prob]  départ : p̂₂
    = 50/100
    = 0,5
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (260 + 50)/(400 + 100)   ← Proportion poolée
    = 31/50
  — se  [juge stat]  départ : se
    = √(0,62·0,38·(1/400 + 1/100))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0543
  — tobs  [juge stat]  départ : t_obs
    = (0,65 − 0,5)/0,0543
    = 2,76
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,76))   ← Bilatéral
    = 0,006
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (260+50)/□ | p̂ = 31/50
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

70 « oui » dans la région 1 sur n₁ = 200, et 50 dans la région 2 sur n₂ = 100. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  p̂₁
    = 70/200
    = 0,35
  — p̂₂  [juge prob]  départ : p̂₂
    = 50/100
    = 0,5
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (70 + 50)/(200 + 100)   ← Proportion poolée
    = 2/5
  — se  [juge stat]  départ : se
    = √(0,4·0,6·(1/200 + 1/100))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,06
  — tobs  [juge stat]  départ : t_obs
    = (0,35 − 0,5)/0,06
    = −2,5
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,5))   ← Bilatéral
    = 0,012
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (70+50)/□ | p̂ = 2/5
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

240 guérisons avec le traitement A sur n₁ = 400, et 90 avec le traitement B sur n₂ = 200. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  p̂₁
    = 240/400
    = 0,6
  — p̂₂  [juge prob]  départ : p̂₂
    = 90/200
    = 0,45
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (240 + 90)/(400 + 200)   ← Proportion poolée
    = 11/20
  — se  [juge stat]  départ : se
    = √(0,55·0,45·(1/400 + 1/200))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0431
  — tobs  [juge stat]  départ : t_obs
    = (0,6 − 0,45)/0,0431
    = 3,48
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(3,48))   ← Bilatéral
    = 0
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (240+90)/□ | p̂ = 11/20
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 4

```
70 « oui » dans la région 1 sur n₁ = 200, et 120 dans la région 2 sur n₂ = 400. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [free, suivre l'erreur]  p̂₁
    = 70/200
    = 0,35
  — p̂₂  [juge prob]  départ : p̂₂
    = 120/400
    = 0,3
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (70 + 120)/(200 + 400)   ← Proportion poolée
    = 19/60
  — se  [juge stat]  départ : se
    = √(0,3167·0,6833·(1/200 + 1/400))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0403
  — tobs  [juge stat]  départ : t_obs
    = (0,35 − 0,3)/0,0403
    = 1,24
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(1,24))   ← Bilatéral
    = 0,214
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (70+120)/□ | p̂ = 19/60
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

25 guérisons avec le traitement A sur n₁ = 100, et 30 avec le traitement B sur n₂ = 200. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [free, suivre l'erreur]  p̂₁
    = 25/100
    = 0,25
  — p̂₂  [juge prob]  départ : p̂₂
    = 30/200
    = 0,15
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (25 + 30)/(100 + 200)   ← Proportion poolée
    = 11/60
  — se  [juge stat]  départ : se
    = √(0,1833·0,8167·(1/100 + 1/200))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0474
  — tobs  [juge stat]  départ : t_obs
    = (0,25 − 0,15)/0,0474
    = 2,11
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,11))   ← Bilatéral
    = 0,034
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (25+30)/□ | p̂ = 11/60
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5

20 guérisons avec le traitement A sur n₁ = 100, et 40 avec le traitement B sur n₂ = 400. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %.
  [free, suivre l'erreur]  p̂₁
    = 20/100
    = 0,2
  — p̂₂  [juge prob]  départ : p̂₂
    = 40/400
    = 0,1
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (20 + 40)/(100 + 400)   ← Proportion poolée
    = 3/25
  — se  [juge stat]  départ : se
    = √(0,12·0,88·(1/100 + 1/400))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0363
  — tobs  [juge stat]  départ : t_obs
    = (0,2 − 0,1)/0,0363
    = 2,75
  — pobs  [juge stat]  départ : p_obs
    = 2(1 − Φ(2,75))   ← Bilatéral
    = 0,006
  aides : Sous H₀, les deux groupes ont la même proportion : estime-la avec tous les individus. | (20+40)/□ | p̂ = 3/25
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large

```

### Niveau 5

```
60 pièces défectueuses de la machine 1 sur n₁ = 100, et 55 de la machine 2 sur n₂ = 100. On teste H₀ : p₁ = p₂ contre H₁ : p₁ > p₂ au niveau 5 %.
  [free, sans aide]  p̂₁
    = 60/100
    = 0,6
  — p̂₂  [juge prob]  départ : p̂₂
    = 55/100
    = 0,55
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (60 + 55)/(100 + 100)   ← Proportion poolée
    = 23/40
  — se  [juge stat]  départ : se
    = √(0,575·0,425·(1/100 + 1/100))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0699
  — tobs  [juge stat]  départ : t_obs
    = (0,6 − 0,55)/0,0699
    = 0,72
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(0,72)   ← Unilatéral
    = 0,236
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

20 « oui » dans la région 1 sur n₁ = 100, et 60 dans la région 2 sur n₂ = 400. On teste H₀ : p₁ = p₂ contre H₁ : p₁ > p₂ au niveau 5 %.
  [free, sans aide]  p̂₁
    = 20/100
    = 0,2
  — p̂₂  [juge prob]  départ : p̂₂
    = 60/400
    = 0,15
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (20 + 60)/(100 + 400)   ← Proportion poolée
    = 4/25
  — se  [juge stat]  départ : se
    = √(0,16·0,84·(1/100 + 1/400))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,041
  — tobs  [juge stat]  départ : t_obs
    = (0,2 − 0,15)/0,041
    = 1,22
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(1,22)   ← Unilatéral
    = 0,111
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

120 « oui » dans la région 1 sur n₁ = 200, et 220 dans la région 2 sur n₂ = 400. On teste H₀ : p₁ = p₂ contre H₁ : p₁ > p₂ au niveau 5 %.
  [free, sans aide]  p̂₁
    = 120/200
    = 0,6
  — p̂₂  [juge prob]  départ : p̂₂
    = 220/400
    = 0,55
  — p̂  [juge prob]  départ : p̂
    ? Sous H₀ : p₁ = p₂, comment estimer la proportion commune ? ✔ Avec tous les individus : (k₁ + k₂)/(n₁ + n₂) / · Garder p̂₁ et p̂₂ séparément dans l’erreur standard
    = (120 + 220)/(200 + 400)   ← Proportion poolée
    = 17/30
  — se  [juge stat]  départ : se
    = √(0,5667·0,4333·(1/200 + 1/400))   ← se = √(p̂(1 − p̂)(1/n₁ + 1/n₂))
    = 0,0429
  — tobs  [juge stat]  départ : t_obs
    = (0,6 − 0,55)/0,0429
    = 1,17
  — pobs  [juge stat]  départ : p_obs
    = 1 − Φ(1,17)   ← Unilatéral
    = 0,121
  pièges : p_two_prop_no_pool, p_two_sample_se, p_pvalue_two_sided, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Variantes d'examen

```
140 guérisons avec le traitement A sur n₁ = 400, et 160 avec le traitement B sur n₂ = 400. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %. Quelle erreur standard utiliser sous H₀ ?
  · 0,6837 [p_two_sample_se]   · 0,0171   · 0,0685   ✔ 0,0342
  [examen mcq]
  pièges : p_two_sample_se

Vrai ou faux ?
  « Sous H₀ : p₁ = p₂, on estime la proportion commune par la moyenne de p̂₁ = 0,2 et p̂₂ = 0,4, quels que soient n₁ et n₂. » → FAUX
    contre-exemple (refute) : a = 100, b = 300
  [examen tf]
  pièges : p_two_prop_no_pool

100 pièces défectueuses de la machine 1 sur n₁ = 400, et 30 de la machine 2 sur n₂ = 100. On teste H₀ : p₁ = p₂ contre H₁ : p₁ ≠ p₂ au niveau 5 %. Donne la statistique t_obs (deux décimales).
  [free, sans aide, examen coef]  t_obs
    = −1,02

```

## Test χ² d'adéquation (`p-test-chi2-gof`, BA3)

_K classes, effectifs observés oᵢ, effectifs attendus eᵢ = n·pᵢ (des effectifs, pas des proportions)._

### Niveau 1

```
On observe les jours de pannes d'une machine sur 55 cas : lundi 12, mardi 15, mercredi 5, jeudi 6, vendredi 17. Ces effectifs suivent-ils des pannes uniformes sur les 5 jours ? Test χ² d'adéquation au niveau 5 %.
  [guided]  e
    (Que compare le test χ² ? Des effectifs : eᵢ = n·pᵢ.)
    = 55·□   (trous : 55·1/5)   ← Même effectif attendu pour chaque classe
    = □   (trous : 11)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = □ + (15 − 11)²/11 + (5 − 11)²/11 + (6 − 11)²/11 + (17 − 11)²/11   (trous : (12 − 11)²/11 + (15 − 11)²/11 + (5 − 11)²/11 + (6 − 11)²/11 + (17 − 11)²/11)   ← Un terme par classe
    = (1 + 16 + □ + 25 + 36)/11   (trous : (1 + 16 + 36 + 25 + 36)/11)   ← Écarts au carré
    = □   (trous : 10,36)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □ − 1   (trous : 5 − 1)   ← k classes, probabilités fixées
    = □   (trous : 4)   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 9,488)   ← Table 4, ligne r = 4, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    (Décision au niveau 5 % ? Rejeter H₀ : T = 10,36 > 9,488.)
    = □   (trous : 13,277)   ← Table 4, colonne s₁ : T est entre les deux seuils, 0,01 < p < 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (12 − 11)²/11 + … (une classe par terme) | T = 10,36, r = 4, s₅(4) = 9,488
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_reject_10_5, p_pvalue_h0, p_significant_large

Un dé est lancé 60 fois. Effectifs des faces 1 à 6 : 13, 7, 9, 10, 12, 9. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %.
  [guided]  e
    (Que compare le test χ² ? Des effectifs : eᵢ = n·pᵢ.)
    = 60·□   (trous : 60·1/6)   ← Même effectif attendu pour chaque face
    = □   (trous : 10)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = □ + (7 − 10)²/10 + (9 − 10)²/10 + (10 − 10)²/10 + (12 − 10)²/10 + (9 − 10)²/10   (trous : (13 − 10)²/10 + (7 − 10)²/10 + (9 − 10)²/10 + (10 − 10)²/10 + (12 − 10)²/10 + (9 − 10)²/10)   ← Un terme par classe
    = (9 + 9 + □ + 0 + 4 + 1)/10   (trous : (9 + 9 + 1 + 0 + 4 + 1)/10)   ← Écarts au carré
    = □   (trous : 2,4)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □ − 1   (trous : 6 − 1)   ← k classes, probabilités fixées
    = □   (trous : 5)   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 11,07)   ← Table 4, ligne r = 5, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    (Décision au niveau 5 % ? Ne pas rejeter H₀ : T = 2,4 ≤ 11,07.)
    = □   (trous : 15,086)   ← Table 4, colonne s₁ : p > 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (13 − 10)²/10 + … (une classe par terme) | T = 2,4, r = 5, s₅(5) = 11,07
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_pvalue_h0, p_accept_h0, p_reject_10_5

On observe les jours de pannes d'une machine sur 55 cas : lundi 13, mardi 8, mercredi 11, jeudi 9, vendredi 14. Ces effectifs suivent-ils des pannes uniformes sur les 5 jours ? Test χ² d'adéquation au niveau 5 %.
  [guided]  e
    (Que compare le test χ² ? Des effectifs : eᵢ = n·pᵢ.)
    = 55·□   (trous : 55·1/5)   ← Même effectif attendu pour chaque classe
    = □   (trous : 11)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = □ + (8 − 11)²/11 + (11 − 11)²/11 + (9 − 11)²/11 + (14 − 11)²/11   (trous : (13 − 11)²/11 + (8 − 11)²/11 + (11 − 11)²/11 + (9 − 11)²/11 + (14 − 11)²/11)   ← Un terme par classe
    = (4 + □ + 0 + 4 + 9)/11   (trous : (4 + 9 + 0 + 4 + 9)/11)   ← Écarts au carré
    = □   (trous : 2,36)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □ − 1   (trous : 5 − 1)   ← k classes, probabilités fixées
    = □   (trous : 4)   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 9,488)   ← Table 4, ligne r = 4, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    (Décision au niveau 5 % ? Ne pas rejeter H₀ : T = 2,36 ≤ 9,488.)
    = □   (trous : 13,277)   ← Table 4, colonne s₁ : p > 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (13 − 11)²/11 + … (une classe par terme) | T = 2,36, r = 4, s₅(4) = 9,488
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_reject_10_5, p_pvalue_h0, p_accept_h0

```

### Niveau 2

```
Un dé est lancé 60 fois. Effectifs des faces 1 à 6 : 9, 11, 10, 9, 7, 14. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %.
  [guided]  e
    ? Que compare le test χ² ? ✔ Des effectifs : eᵢ = n·pᵢ / · Des proportions : eᵢ = pᵢ
    = 60·□   (trous : 60·1/6)   ← Même effectif attendu pour chaque face
    = □   (trous : 10)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = □ + □ + (10 − 10)²/10 + (9 − 10)²/10 + (7 − 10)²/10 + (14 − 10)²/10   (trous : (9 − 10)²/10 + (11 − 10)²/10 + (10 − 10)²/10 + (9 − 10)²/10 + (7 − 10)²/10 + (14 − 10)²/10)   ← Un terme par classe
    = (1 + 1 + 0 + 1 + 9 + □)/10   (trous : (1 + 1 + 0 + 1 + 9 + 16)/10)   ← Écarts au carré
    = □   (trous : 2,8)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □ − 1   (trous : 6 − 1)   ← k classes, probabilités fixées
    = □   (trous : 5)   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 11,07)   ← Table 4, ligne r = 5, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 2,8 > 11,07 / ✔ Ne pas rejeter H₀ : T = 2,8 ≤ 11,07
    = □   (trous : 15,086)   ← Table 4, colonne s₁ : p > 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (9 − 10)²/10 + … (une classe par terme) | T = 2,8, r = 5, s₅(5) = 11,07
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5, p_accept_h0

On observe les jours de pannes d'une machine sur 35 cas : lundi 12, mardi 4, mercredi 3, jeudi 12, vendredi 4. Ces effectifs suivent-ils des pannes uniformes sur les 5 jours ? Test χ² d'adéquation au niveau 5 %.
  [guided]  e
    ? Que compare le test χ² ? ✔ Des effectifs : eᵢ = n·pᵢ / · Des proportions : eᵢ = pᵢ
    = 35·□   (trous : 35·1/5)   ← Même effectif attendu pour chaque classe
    = □   (trous : 7)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = □ + □ + (3 − 7)²/7 + (12 − 7)²/7 + (4 − 7)²/7   (trous : (12 − 7)²/7 + (4 − 7)²/7 + (3 − 7)²/7 + (12 − 7)²/7 + (4 − 7)²/7)   ← Un terme par classe
    = (25 + □ + 16 + 25 + 9)/7   (trous : (25 + 9 + 16 + 25 + 9)/7)   ← Écarts au carré
    = □   (trous : 12)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □ − 1   (trous : 5 − 1)   ← k classes, probabilités fixées
    = □   (trous : 4)   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 9,488)   ← Table 4, ligne r = 4, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 12 > 9,488 / · Ne pas rejeter H₀ : T = 12 ≤ 9,488
    = □   (trous : 13,277)   ← Table 4, colonne s₁ : T est entre les deux seuils, 0,01 < p < 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (12 − 7)²/7 + … (une classe par terme) | T = 12, r = 4, s₅(4) = 9,488
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_reject_10_5, p_pvalue_h0, p_significant_large

Un dé est lancé 60 fois. Effectifs des faces 1 à 6 : 5, 14, 16, 4, 5, 16. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %.
  [guided]  e
    ? Que compare le test χ² ? ✔ Des effectifs : eᵢ = n·pᵢ / · Des proportions : eᵢ = pᵢ
    = 60·□   (trous : 60·1/6)   ← Même effectif attendu pour chaque face
    = □   (trous : 10)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = □ + □ + (16 − 10)²/10 + (4 − 10)²/10 + (5 − 10)²/10 + (16 − 10)²/10   (trous : (5 − 10)²/10 + (14 − 10)²/10 + (16 − 10)²/10 + (4 − 10)²/10 + (5 − 10)²/10 + (16 − 10)²/10)   ← Un terme par classe
    = (25 + 16 + □ + 36 + 25 + 36)/10   (trous : (25 + 16 + 36 + 36 + 25 + 36)/10)   ← Écarts au carré
    = □   (trous : 17,4)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □ − 1   (trous : 6 − 1)   ← k classes, probabilités fixées
    = □   (trous : 5)   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 11,07)   ← Table 4, ligne r = 5, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 17,4 > 11,07 / · Ne pas rejeter H₀ : T = 17,4 ≤ 11,07
    = □   (trous : 15,086)   ← Table 4, colonne s₁ : T le dépasse aussi, p < 0,01
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (5 − 10)²/10 + … (une classe par terme) | T = 17,4, r = 5, s₅(5) = 11,07
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_significant_large, p_pvalue_h0, p_accept_h0

```

### Niveau 3

```
Un dé est lancé 60 fois. Effectifs des faces 1 à 6 : 10, 6, 10, 10, 10, 14. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  e
    = 60·1/6   ← Même effectif attendu pour chaque face
    = 10   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = (10 − 10)²/10 + (6 − 10)²/10 + (10 − 10)²/10 + (10 − 10)²/10 + (10 − 10)²/10 + (14 − 10)²/10   ← Un terme par classe
    = (0 + 16 + 0 + 0 + 0 + 16)/10   ← Écarts au carré
    = 3,2   ← Statistique observée
  — r  [juge prob]  départ : r
    = 6 − 1   ← k classes, probabilités fixées
    = 5   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 11,07   ← Table 4, ligne r = 5, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 3,2 > 11,07 / ✔ Ne pas rejeter H₀ : T = 3,2 ≤ 11,07
    = 15,086   ← Table 4, colonne s₁ : p > 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (10 − 10)²/10 + … (une classe par terme) | T = 3,2, r = 5, s₅(5) = 11,07
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_accept_h0, p_reject_10_5, p_pvalue_h0

On observe les jours de pannes d'une machine sur 45 cas : lundi 9, mardi 14, mercredi 4, jeudi 14, vendredi 4. Ces effectifs suivent-ils des pannes uniformes sur les 5 jours ? Test χ² d'adéquation au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  e
    = 45·1/5   ← Même effectif attendu pour chaque classe
    = 9   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = (9 − 9)²/9 + (14 − 9)²/9 + (4 − 9)²/9 + (14 − 9)²/9 + (4 − 9)²/9   ← Un terme par classe
    = (0 + 25 + 25 + 25 + 25)/9   ← Écarts au carré
    = 11,11   ← Statistique observée
  — r  [juge prob]  départ : r
    = 5 − 1   ← k classes, probabilités fixées
    = 4   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 9,488   ← Table 4, ligne r = 4, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 11,11 > 9,488 / · Ne pas rejeter H₀ : T = 11,11 ≤ 9,488
    = 13,277   ← Table 4, colonne s₁ : T est entre les deux seuils, 0,01 < p < 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (9 − 9)²/9 + … (une classe par terme) | T = 11,11, r = 4, s₅(4) = 9,488
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_reject_10_5, p_pvalue_h0, p_significant_large

Un dé est lancé 60 fois. Effectifs des faces 1 à 6 : 5, 15, 6, 5, 15, 14. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  e
    = 60·1/6   ← Même effectif attendu pour chaque face
    = 10   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = (5 − 10)²/10 + (15 − 10)²/10 + (6 − 10)²/10 + (5 − 10)²/10 + (15 − 10)²/10 + (14 − 10)²/10   ← Un terme par classe
    = (25 + 25 + 16 + 25 + 25 + 16)/10   ← Écarts au carré
    = 13,2   ← Statistique observée
  — r  [juge prob]  départ : r
    = 6 − 1   ← k classes, probabilités fixées
    = 5   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 11,07   ← Table 4, ligne r = 5, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 13,2 > 11,07 / · Ne pas rejeter H₀ : T = 13,2 ≤ 11,07
    = 15,086   ← Table 4, colonne s₁ : T est entre les deux seuils, 0,01 < p < 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (5 − 10)²/10 + … (une classe par terme) | T = 13,2, r = 5, s₅(5) = 11,07
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_significant_large, p_pvalue_h0, p_reject_10_5

```

### Niveau 4

```
Un dé est lancé 60 fois. Effectifs des faces 1 à 6 : 14, 15, 5, 6, 15, 5. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %.
  [free, suivre l'erreur]  e
    = 60·1/6   ← Même effectif attendu pour chaque face
    = 10   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = (14 − 10)²/10 + (15 − 10)²/10 + (5 − 10)²/10 + (6 − 10)²/10 + (15 − 10)²/10 + (5 − 10)²/10   ← Un terme par classe
    = (16 + 25 + 25 + 16 + 25 + 25)/10   ← Écarts au carré
    = 13,2   ← Statistique observée
  — r  [juge prob]  départ : r
    = 6 − 1   ← k classes, probabilités fixées
    = 5   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 11,07   ← Table 4, ligne r = 5, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 13,2 > 11,07 / · Ne pas rejeter H₀ : T = 13,2 ≤ 11,07
    = 15,086   ← Table 4, colonne s₁ : T est entre les deux seuils, 0,01 < p < 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (14 − 10)²/10 + … (une classe par terme) | T = 13,2, r = 5, s₅(5) = 11,07
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5, p_significant_large

On observe les groupes sanguins d'un échantillon sur 90 cas : O 36, A 29, B 20, AB 5. Ces effectifs suivent-ils la répartition (40 %, 30 %, 20 %, 10 %) ? Test χ² d'adéquation au niveau 5 %.
  [free, suivre l'erreur]  e₁
    = 90·2/5   ← Classe « O »
    = 36   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : O 36, A 27, B 18, AB 9.)
    = (36 − 36)²/36 + (29 − 27)²/27 + (20 − 18)²/18 + (5 − 9)²/9   ← Un terme par classe
    = 0/36 + 4/27 + 4/18 + 16/9   ← Écarts au carré
    = 2,15   ← Statistique observée
  — r  [juge prob]  départ : r
    = 4 − 1   ← k classes, probabilités fixées
    = 3   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 7,815   ← Table 4, ligne r = 3, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 2,15 > 7,815 / ✔ Ne pas rejeter H₀ : T = 2,15 ≤ 7,815
    = 11,345   ← Table 4, colonne s₁ : p > 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (36 − 36)²/36 + … (une classe par terme) | T = 2,15, r = 3, s₅(3) = 7,815
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_pvalue_h0, p_accept_h0, p_reject_10_5

On observe les jours de pannes d'une machine sur 35 cas : lundi 2, mardi 11, mercredi 6, jeudi 4, vendredi 12. Ces effectifs suivent-ils des pannes uniformes sur les 5 jours ? Test χ² d'adéquation au niveau 5 %.
  [free, suivre l'erreur]  e
    = 35·1/5   ← Même effectif attendu pour chaque classe
    = 7   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    = (2 − 7)²/7 + (11 − 7)²/7 + (6 − 7)²/7 + (4 − 7)²/7 + (12 − 7)²/7   ← Un terme par classe
    = (25 + 16 + 1 + 9 + 25)/7   ← Écarts au carré
    = 10,86   ← Statistique observée
  — r  [juge prob]  départ : r
    = 5 − 1   ← k classes, probabilités fixées
    = 4   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 9,488   ← Table 4, ligne r = 4, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 10,86 > 9,488 / · Ne pas rejeter H₀ : T = 10,86 ≤ 9,488
    = 13,277   ← Table 4, colonne s₁ : T est entre les deux seuils, 0,01 < p < 0,05
  aides : Compare des effectifs, pas des fréquences : T = Σ(oᵢ − eᵢ)²/eᵢ ; puis r = k − 1 − (paramètres estimés). | T = (2 − 7)²/7 + … (une classe par terme) | T = 10,86, r = 4, s₅(4) = 9,488
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5, p_significant_large

```

### Niveau 5

```
Nombre de pannes par jour sur 200 jours : 0 panne 68 fois, 1 panne 80 fois, 2 pannes 44 fois, 3 ou plus 8 fois. On ajuste une loi de Poisson (λ̂ = x̄ = 1, estimé sur ces données) ; effectifs attendus : 73,6 ; 73,6 ; 36,8 ; 16,1. La loi de Poisson convient-elle ? Test χ² au niveau 5 %.
  [free, sans aide]  T
    = (68 − 73,6)²/73,6 + (80 − 73,6)²/73,6 + (44 − 36,8)²/36,8 + (8 − 16,1)²/16,1   ← Un terme par classe
    = 31,36/73,6 + 40,96/73,6 + 51,84/36,8 + 65,61/16,1   ← Écarts au carré
    = 6,47   ← Statistique observée
  — r  [juge prob]  départ : r
    = 4 − 1 − 1   ← k classes, un paramètre estimé
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, ligne r = 2, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 6,47 > 5,991 / · Ne pas rejeter H₀ : T = 6,47 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁ : T est entre les deux seuils, 0,01 < p < 0,05
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_significant_large, p_pvalue_h0, p_reject_10_5

Nombre de pannes par jour sur 100 jours : 0 panne 31 fois, 1 panne 41 fois, 2 pannes 16 fois, 3 ou plus 12 fois. On ajuste une loi de Poisson (λ̂ = x̄ = 1,5, estimé sur ces données) ; effectifs attendus : 22,3 ; 33,5 ; 25,1 ; 19,1. La loi de Poisson convient-elle ? Test χ² au niveau 5 %.
  [free, sans aide]  T
    = (31 − 22,3)²/22,3 + (41 − 33,5)²/33,5 + (16 − 25,1)²/25,1 + (12 − 19,1)²/19,1   ← Un terme par classe
    = 75,69/22,3 + 56,25/33,5 + 82,81/25,1 + 50,41/19,1   ← Écarts au carré
    = 11,01   ← Statistique observée
  — r  [juge prob]  départ : r
    = 4 − 1 − 1   ← k classes, un paramètre estimé
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, ligne r = 2, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 11,01 > 5,991 / · Ne pas rejeter H₀ : T = 11,01 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁ : T le dépasse aussi, p < 0,01
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_accept_h0, p_significant_large, p_pvalue_h0

Nombre de pannes par jour sur 100 jours : 0 panne 30 fois, 1 panne 26 fois, 2 pannes 33 fois, 3 ou plus 11 fois. On ajuste une loi de Poisson (λ̂ = x̄ = 1,5, estimé sur ces données) ; effectifs attendus : 22,3 ; 33,5 ; 25,1 ; 19,1. La loi de Poisson convient-elle ? Test χ² au niveau 5 %.
  [free, sans aide]  T
    = (30 − 22,3)²/22,3 + (26 − 33,5)²/33,5 + (33 − 25,1)²/25,1 + (11 − 19,1)²/19,1   ← Un terme par classe
    = 59,29/22,3 + 56,25/33,5 + 62,41/25,1 + 65,61/19,1   ← Écarts au carré
    = 10,26   ← Statistique observée
  — r  [juge prob]  départ : r
    = 4 − 1 − 1   ← k classes, un paramètre estimé
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, ligne r = 2, colonne s₅
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 10,26 > 5,991 / · Ne pas rejeter H₀ : T = 10,26 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁ : T le dépasse aussi, p < 0,01
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_significant_large, p_pvalue_h0, p_accept_h0

```

### Variantes d'examen

```
On observe les jours de pannes d'une machine sur 40 cas : lundi 2, mardi 2, mercredi 14, jeudi 12, vendredi 10. Ces effectifs suivent-ils des pannes uniformes sur les 5 jours ? Test χ² d'adéquation au niveau 5 %. Que vaut la statistique T ?
  · 0,4 [p_chi2_proportions]   · 4   · 40,3 [p_chi2_divide_obs]   ✔ 16
  [examen mcq]
  pièges : p_chi2_proportions, p_chi2_divide_obs

Vrai ou faux ?
  « Pour un test χ² d'adéquation, une grande valeur de T = Σ(oᵢ − eᵢ)²/eᵢ conduit à rejeter H₀. » → VRAI
  [examen tf]

Un dé est lancé 120 fois. Effectifs des faces 1 à 6 : 20, 20, 25, 15, 20, 20. Le dé est-il équilibré ? Test χ² d'adéquation au niveau 5 %. Calcule la statistique T (à 0,01 près).
  [free, sans aide, examen coef]  T
    = (20 − 20)²/20 + (20 − 20)²/20 + (25 − 20)²/20 + (15 − 20)²/20 + (20 − 20)²/20 + (20 − 20)²/20   ← Un terme par classe
    = (0 + 0 + 25 + 25 + 0 + 0)/20   ← Écarts au carré
    = 2,5   ← Statistique observée
  pièges : p_chi2_proportions, p_chi2_divide_obs

On observe les jours de pannes d'une machine sur 40 cas : lundi 13, mardi 8, mercredi 12, jeudi 3, vendredi 4. Ces effectifs suivent-ils des pannes uniformes sur les 5 jours ? Test χ² d'adéquation au niveau 5 %.
  [problème, examen open, 10 points]
  partie 1 (On observe les jours de pannes d'une machine sur 40 cas : lundi 13, mardi 8, mercredi 12, jeudi 3, vendredi 4. Ces effectifs suivent-ils des pannes uniformes sur les 5 jours ? Test χ² d'adéquation au niveau 5 %. : 2 ; Statistique T : 2,5 ; r : 2 ; Seuil à 5 % (Table 4, queue supérieure) : 1,5 ; Seuil à 1 %, pour encadrer la p-valeur : 1)
  On observe les jours de pannes d'une machine sur 40 cas : lundi 13, mardi 8, mercredi 12, jeudi 3, vendredi 4. Ces effectifs suivent-ils des pannes uniformes sur les 5 jours ? Test χ² d'adéquation au niveau 5 %.
    [free, sans aide, suivre l'erreur, examen open]  e
      = 40·1/5   ← Même effectif attendu pour chaque classe
      = 8   ← Effectif attendu
    — Statistique T  [juge stat]  départ : T
      = (13 − 8)²/8 + (8 − 8)²/8 + (12 − 8)²/8 + (3 − 8)²/8 + (4 − 8)²/8   ← Un terme par classe
      = (25 + 0 + 16 + 25 + 16)/8   ← Écarts au carré
      = 10,25   ← Statistique observée
    — r  [juge prob]  départ : r
      = 5 − 1   ← k classes, probabilités fixées
      = 4   ← Degrés de liberté
    — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
      = 9,488   ← Table 4, ligne r = 4, colonne s₅
    — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
      = 13,277   ← Table 4, colonne s₁ : T est entre les deux seuils, 0,01 < p < 0,05
  partie 2 (Interpréter : 1)
  Interpréter : quelle phrase est juste ?
    · La probabilité que des pannes uniformes sur les 5 jours soit vrai est inférieure à 5 %. [p_pvalue_h0]   · On rejetterait aussi H₀ au niveau 1 %. [p_reject_10_5]   · Puisque l'on rejette H₀, l'écart est grand et important en pratique. [p_significant_large]   ✔ Les données sont peu compatibles avec des pannes uniformes sur les 5 jours au niveau 5 %, mais pas au niveau 1 % : 0,01 < p < 0,05.
    [examen open]
  pièges : p_chi2_proportions, p_chi2_divide_obs, p_chi2_df, p_pvalue_alpha_compare, p_reject_10_5, p_pvalue_h0, p_significant_large

```

## Test χ² d'indépendance (`p-test-chi2-indep`, BA3)

_Tableau de contingence h × k ; sous H₀ (indépendance), e_ij = n_i·· n_·j/n ; T = Σ(n_ij − e_ij)²/e_ij ~ χ²((h − 1)(k − 1))._

### Niveau 1

```
Personnes selon la couleur des yeux (lignes) et des cheveux (colonnes) :cheveux blondscheveux brunscheveux rouxtotalyeux clairs2412348yeux foncés723141144total963264192Test χ² d'indépendance au niveau 5 %.
  [guided]  e₁₁
    (Sous H₀ (indépendance), que vaut l'effectif attendu eᵢⱼ ? (total de la ligne i × total de la colonne j)/n.)
    = 48·□/192   (trous : 48·96/192)   ← Marges de la case (1, 1)
    = □   (trous : 24)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 24 ; 8 ; 16 | 72 ; 24 ; 48.)
    = □ + (1 − 8)²/8 + (23 − 16)²/16 + (72 − 72)²/72 + (31 − 24)²/24 + (41 − 48)²/48   (trous : (24 − 24)²/24 + (1 − 8)²/8 + (23 − 16)²/16 + (72 − 72)²/72 + (31 − 24)²/24 + (41 − 48)²/48)   ← Une case par terme
    = □ + 49/16 + 49/24 + 49/48   (trous : 49/8 + 49/16 + 49/24 + 49/48)   ← Les cases sans écart donnent 0
    = □   (trous : 12,25)   ← Statistique observée
  — r  [juge prob]  départ : r
    = (2 − 1)(□ − 1)   (trous : (2 − 1)(3 − 1))   ← 2 lignes, 3 colonnes
    = □   (trous : 2)   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = □   (trous : 5,991)   ← Table 4, r = 2
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    (Décision au niveau 5 % ? Rejeter H₀ : T = 12,25 > 5,991.)
    = □   (trous : 9,21)   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 48 · 96/□ | e₁₁ = 24, T = 12,25, r = 2
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_corr_causal, p_significant_large, p_pvalue_h0

Personnes selon la couleur des yeux (lignes) et des cheveux (colonnes) :cheveux blondscheveux brunscheveux rouxtotalyeux clairs2273463yeux foncés348174189total36108108252Test χ² d'indépendance au niveau 5 %.
  [guided]  e₁₁
    (Sous H₀ (indépendance), que vaut l'effectif attendu eᵢⱼ ? (total de la ligne i × total de la colonne j)/n.)
    = 63·□/252   (trous : 63·36/252)   ← Marges de la case (1, 1)
    = □   (trous : 9)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 9 ; 27 ; 27 | 27 ; 81 ; 81.)
    = □ + (27 − 27)²/27 + (34 − 27)²/27 + (34 − 27)²/27 + (81 − 81)²/81 + (74 − 81)²/81   (trous : (2 − 9)²/9 + (27 − 27)²/27 + (34 − 27)²/27 + (34 − 27)²/27 + (81 − 81)²/81 + (74 − 81)²/81)   ← Une case par terme
    = □ + 49/27 + 49/27 + 49/81   (trous : 49/9 + 49/27 + 49/27 + 49/81)   ← Les cases sans écart donnent 0
    = □   (trous : 9,68)   ← Statistique observée
  — r  [juge prob]  départ : r
    = (2 − 1)(□ − 1)   (trous : (2 − 1)(3 − 1))   ← 2 lignes, 3 colonnes
    = □   (trous : 2)   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = □   (trous : 5,991)   ← Table 4, r = 2
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    (Décision au niveau 5 % ? Rejeter H₀ : T = 9,68 > 5,991.)
    = □   (trous : 9,21)   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 63 · 36/□ | e₁₁ = 9, T = 9,68, r = 2
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_significant_large, p_pvalue_h0, p_corr_causal

Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités155772non traités91524total247296Test χ² d'indépendance au niveau 5 %.
  [guided]  e₁₁
    (Sous H₀ (indépendance), que vaut l'effectif attendu eᵢⱼ ? (total de la ligne i × total de la colonne j)/n.)
    = 72·□/96   (trous : 72·24/96)   ← Marges de la case (1, 1)
    = □   (trous : 18)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 18 ; 54 | 6 ; 18.)
    = □ + (57 − 54)²/54 + (9 − 6)²/6 + (15 − 18)²/18   (trous : (15 − 18)²/18 + (57 − 54)²/54 + (9 − 6)²/6 + (15 − 18)²/18)   ← Une case par terme
    = □ + 9/54 + 9/6 + 9/18   (trous : 9/18 + 9/54 + 9/6 + 9/18)   ← Écarts au carré
    = □   (trous : 2,67)   ← Statistique observée
  — r  [juge prob]  départ : r
    = (□ − 1)(2 − 1)   (trous : (2 − 1)(2 − 1))   ← 2 lignes, 2 colonnes
    = □   (trous : 1)   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = □   (trous : 3,841)   ← Table 4, r = 1
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    (Décision au niveau 5 % ? Ne pas rejeter H₀ : T = 2,67 ≤ 3,841.)
    = □   (trous : 6,635)   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 72 · 24/□ | e₁₁ = 18, T = 2,67, r = 1
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_accept_h0, p_reject_10_5, p_pvalue_h0

```

### Niveau 2

```
Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités201232non traités41216total242448Test χ² d'indépendance au niveau 5 %.
  [guided]  e₁₁
    ? Sous H₀ (indépendance), que vaut l'effectif attendu eᵢⱼ ? ✔ (total de la ligne i × total de la colonne j)/n / · n/4, la même valeur pour chaque case
    = 32·□/48   (trous : 32·24/48)   ← Marges de la case (1, 1)
    = □   (trous : 16)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 16 ; 16 | 8 ; 8.)
    = □ + (12 − 16)²/16 + (4 − 8)²/8 + (12 − 8)²/8   (trous : (20 − 16)²/16 + (12 − 16)²/16 + (4 − 8)²/8 + (12 − 8)²/8)   ← Une case par terme
    = □ + 16/16 + 16/8 + 16/8   (trous : 16/16 + 16/16 + 16/8 + 16/8)   ← Écarts au carré
    = □   (trous : 6)   ← Statistique observée
  — r  [juge prob]  départ : r
    = (□ − 1)(2 − 1)   (trous : (2 − 1)(2 − 1))   ← 2 lignes, 2 colonnes
    = □   (trous : 1)   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = □   (trous : 3,841)   ← Table 4, r = 1
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 6 > 3,841 / · Ne pas rejeter H₀ : T = 6 ≤ 3,841
    = □   (trous : 6,635)   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 32 · 24/□ | e₁₁ = 16, T = 6, r = 1
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_corr_causal, p_pvalue_h0, p_significant_large

Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités443680non traités522880total9664160Test χ² d'indépendance au niveau 5 %.
  [guided]  e₁₁
    ? Sous H₀ (indépendance), que vaut l'effectif attendu eᵢⱼ ? ✔ (total de la ligne i × total de la colonne j)/n / · n/4, la même valeur pour chaque case
    = 80·□/160   (trous : 80·96/160)   ← Marges de la case (1, 1)
    = □   (trous : 48)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 48 ; 32 | 48 ; 32.)
    = □ + (36 − 32)²/32 + (52 − 48)²/48 + (28 − 32)²/32   (trous : (44 − 48)²/48 + (36 − 32)²/32 + (52 − 48)²/48 + (28 − 32)²/32)   ← Une case par terme
    = □ + 16/32 + 16/48 + 16/32   (trous : 16/48 + 16/32 + 16/48 + 16/32)   ← Écarts au carré
    = □   (trous : 1,67)   ← Statistique observée
  — r  [juge prob]  départ : r
    = (□ − 1)(2 − 1)   (trous : (2 − 1)(2 − 1))   ← 2 lignes, 2 colonnes
    = □   (trous : 1)   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = □   (trous : 3,841)   ← Table 4, r = 1
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 1,67 > 3,841 / ✔ Ne pas rejeter H₀ : T = 1,67 ≤ 3,841
    = □   (trous : 6,635)   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 80 · 96/□ | e₁₁ = 48, T = 1,67, r = 1
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0, p_reject_10_5

Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités134760non traités375390total50100150Test χ² d'indépendance au niveau 5 %.
  [guided]  e₁₁
    ? Sous H₀ (indépendance), que vaut l'effectif attendu eᵢⱼ ? ✔ (total de la ligne i × total de la colonne j)/n / · n/4, la même valeur pour chaque case
    = 60·□/150   (trous : 60·50/150)   ← Marges de la case (1, 1)
    = □   (trous : 20)   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 20 ; 40 | 30 ; 60.)
    = □ + (47 − 40)²/40 + (37 − 30)²/30 + (53 − 60)²/60   (trous : (13 − 20)²/20 + (47 − 40)²/40 + (37 − 30)²/30 + (53 − 60)²/60)   ← Une case par terme
    = □ + 49/40 + 49/30 + 49/60   (trous : 49/20 + 49/40 + 49/30 + 49/60)   ← Écarts au carré
    = □   (trous : 6,13)   ← Statistique observée
  — r  [juge prob]  départ : r
    = (□ − 1)(2 − 1)   (trous : (2 − 1)(2 − 1))   ← 2 lignes, 2 colonnes
    = □   (trous : 1)   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = □   (trous : 3,841)   ← Table 4, r = 1
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 6,13 > 3,841 / · Ne pas rejeter H₀ : T = 6,13 ≤ 3,841
    = □   (trous : 6,635)   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 60 · 50/□ | e₁₁ = 20, T = 6,13, r = 1
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_pvalue_h0, p_significant_large, p_corr_causal

```

### Niveau 3

```
Personnes selon la couleur des yeux (lignes) et des cheveux (colonnes) :cheveux blondscheveux brunscheveux rouxtotalyeux clairs2018442yeux foncés16363284total365436126Test χ² d'indépendance au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  e₁₁
    = 42·36/126   ← Marges de la case (1, 1)
    = 12   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 12 ; 18 ; 12 | 24 ; 36 ; 24.)
    = (20 − 12)²/12 + (18 − 18)²/18 + (4 − 12)²/12 + (16 − 24)²/24 + (36 − 36)²/36 + (32 − 24)²/24   ← Une case par terme
    = 64/12 + 64/12 + 64/24 + 64/24   ← Les cases sans écart donnent 0
    = 16   ← Statistique observée
  — r  [juge prob]  départ : r
    = (2 − 1)(3 − 1)   ← 2 lignes, 3 colonnes
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, r = 2
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 16 > 5,991 / · Ne pas rejeter H₀ : T = 16 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 42 · 36/□ | e₁₁ = 12, T = 16, r = 2
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_corr_causal, p_significant_large, p_pvalue_h0

Personnes selon la couleur des yeux (lignes) et des cheveux (colonnes) :cheveux blondscheveux brunscheveux rouxtotalyeux clairs6142040yeux foncés1022840total16164880Test χ² d'indépendance au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  e₁₁
    = 40·16/80   ← Marges de la case (1, 1)
    = 8   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 8 ; 8 ; 24 | 8 ; 8 ; 24.)
    = (6 − 8)²/8 + (14 − 8)²/8 + (20 − 24)²/24 + (10 − 8)²/8 + (2 − 8)²/8 + (28 − 24)²/24   ← Une case par terme
    = 4/8 + 36/8 + 16/24 + 4/8 + 36/8 + 16/24   ← Écarts au carré
    = 11,33   ← Statistique observée
  — r  [juge prob]  départ : r
    = (2 − 1)(3 − 1)   ← 2 lignes, 3 colonnes
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, r = 2
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 11,33 > 5,991 / · Ne pas rejeter H₀ : T = 11,33 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 40 · 16/□ | e₁₁ = 8, T = 11,33, r = 2
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_corr_causal, p_pvalue_h0, p_significant_large

Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités533588non traités5775132total110110220Test χ² d'indépendance au niveau 5 %.
  [tap, suivre l'erreur, menu menu]  e₁₁
    = 88·110/220   ← Marges de la case (1, 1)
    = 44   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 44 ; 44 | 66 ; 66.)
    = (53 − 44)²/44 + (35 − 44)²/44 + (57 − 66)²/66 + (75 − 66)²/66   ← Une case par terme
    = 81/44 + 81/44 + 81/66 + 81/66   ← Écarts au carré
    = 6,14   ← Statistique observée
  — r  [juge prob]  départ : r
    = (2 − 1)(2 − 1)   ← 2 lignes, 2 colonnes
    = 1   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 3,841   ← Table 4, r = 1
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 6,14 > 3,841 / · Ne pas rejeter H₀ : T = 6,14 ≤ 3,841
    = 6,635   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 88 · 110/□ | e₁₁ = 44, T = 6,14, r = 1
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_pvalue_h0, p_corr_causal, p_significant_large

```

### Niveau 4

```
Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités19827non traités11718total301545Test χ² d'indépendance au niveau 5 %.
  [free, suivre l'erreur]  e₁₁
    = 27·30/45   ← Marges de la case (1, 1)
    = 18   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 18 ; 9 | 12 ; 6.)
    = (19 − 18)²/18 + (8 − 9)²/9 + (11 − 12)²/12 + (7 − 6)²/6   ← Une case par terme
    = 1/18 + 1/9 + 1/12 + 1/6   ← Écarts au carré
    = 0,42   ← Statistique observée
  — r  [juge prob]  départ : r
    = (2 − 1)(2 − 1)   ← 2 lignes, 2 colonnes
    = 1   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 3,841   ← Table 4, r = 1
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 0,42 > 3,841 / ✔ Ne pas rejeter H₀ : T = 0,42 ≤ 3,841
    = 6,635   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 27 · 30/□ | e₁₁ = 18, T = 0,42, r = 1
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5, p_accept_h0

Personnes selon le statut (lignes) et l'assurance complémentaire (colonnes) :assurésnon assuréstotalsalariés602080contractuels34640indépendants261440total12040160Test χ² d'indépendance au niveau 5 %.
  [free, suivre l'erreur]  e₁₁
    = 80·120/160   ← Marges de la case (1, 1)
    = 60   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 60 ; 20 | 30 ; 10 | 30 ; 10.)
    = (60 − 60)²/60 + (20 − 20)²/20 + (34 − 30)²/30 + (6 − 10)²/10 + (26 − 30)²/30 + (14 − 10)²/10   ← Une case par terme
    = 16/30 + 16/10 + 16/30 + 16/10   ← Les cases sans écart donnent 0
    = 4,27   ← Statistique observée
  — r  [juge prob]  départ : r
    = (3 − 1)(2 − 1)   ← 3 lignes, 2 colonnes
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, r = 2
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 4,27 > 5,991 / ✔ Ne pas rejeter H₀ : T = 4,27 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 80 · 120/□ | e₁₁ = 60, T = 4,27, r = 2
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_pvalue_h0, p_reject_10_5, p_accept_h0

Personnes selon le statut (lignes) et l'assurance complémentaire (colonnes) :assurésnon assuréstotalsalariés241236contractuels34236indépendants502272total10836144Test χ² d'indépendance au niveau 5 %.
  [free, suivre l'erreur]  e₁₁
    = 36·108/144   ← Marges de la case (1, 1)
    = 27   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 27 ; 9 | 27 ; 9 | 54 ; 18.)
    = (24 − 27)²/27 + (12 − 9)²/9 + (34 − 27)²/27 + (2 − 9)²/9 + (50 − 54)²/54 + (22 − 18)²/18   ← Une case par terme
    = 9/27 + 9/9 + 49/27 + 49/9 + 16/54 + 16/18   ← Écarts au carré
    = 9,78   ← Statistique observée
  — r  [juge prob]  départ : r
    = (3 − 1)(2 − 1)   ← 3 lignes, 2 colonnes
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, r = 2
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 9,78 > 5,991 / · Ne pas rejeter H₀ : T = 9,78 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁
  aides : eᵢⱼ = (total de la ligne × total de la colonne)/n ; puis T = Σ(nᵢⱼ − eᵢⱼ)²/eᵢⱼ et r = (h − 1)(k − 1). | e₁₁ = 36 · 108/□ | e₁₁ = 27, T = 9,78, r = 2
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_significant_large, p_pvalue_h0, p_corr_causal

```

### Niveau 5

```
Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités22830non traités141630total362460Test χ² d'indépendance au niveau 5 %.
  [free, sans aide]  e₁₁
    = 30·36/60   ← Marges de la case (1, 1)
    = 18   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 18 ; 12 | 18 ; 12.)
    = (22 − 18)²/18 + (8 − 12)²/12 + (14 − 18)²/18 + (16 − 12)²/12   ← Une case par terme
    = 16/18 + 16/12 + 16/18 + 16/12   ← Écarts au carré
    = 4,44   ← Statistique observée
  — r  [juge prob]  départ : r
    = (2 − 1)(2 − 1)   ← 2 lignes, 2 colonnes
    = 1   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 3,841   ← Table 4, r = 1
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 4,44 > 3,841 / · Ne pas rejeter H₀ : T = 4,44 ≤ 3,841
    = 6,635   ← Table 4, colonne s₁
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_corr_causal, p_significant_large, p_pvalue_h0

Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités6243105non traités221335total8456140Test χ² d'indépendance au niveau 5 %.
  [free, sans aide]  e₁₁
    = 105·84/140   ← Marges de la case (1, 1)
    = 63   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 63 ; 42 | 21 ; 14.)
    = (62 − 63)²/63 + (43 − 42)²/42 + (22 − 21)²/21 + (13 − 14)²/14   ← Une case par terme
    = 1/63 + 1/42 + 1/21 + 1/14   ← Écarts au carré
    = 0,16   ← Statistique observée
  — r  [juge prob]  départ : r
    = (2 − 1)(2 − 1)   ← 2 lignes, 2 colonnes
    = 1   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 3,841   ← Table 4, r = 1
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 0,16 > 3,841 / ✔ Ne pas rejeter H₀ : T = 0,16 ≤ 3,841
    = 6,635   ← Table 4, colonne s₁
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_reject_10_5, p_pvalue_h0, p_accept_h0

Personnes selon le statut (lignes) et l'assurance complémentaire (colonnes) :assurésnon assuréstotalsalariés201636contractuels322254indépendants32436total8442126Test χ² d'indépendance au niveau 5 %.
  [free, sans aide]  e₁₁
    = 36·84/126   ← Marges de la case (1, 1)
    = 24   ← Effectif attendu
  — Statistique T  [juge stat]  départ : T
    (Effectifs attendus : 24 ; 12 | 36 ; 18 | 24 ; 12.)
    = (20 − 24)²/24 + (16 − 12)²/12 + (32 − 36)²/36 + (22 − 18)²/18 + (32 − 24)²/24 + (4 − 12)²/12   ← Une case par terme
    = 16/24 + 16/12 + 16/36 + 16/18 + 64/24 + 64/12   ← Écarts au carré
    = 11,33   ← Statistique observée
  — r  [juge prob]  départ : r
    = (3 − 1)(2 − 1)   ← 3 lignes, 2 colonnes
    = 2   ← Degrés de liberté
  — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
    = 5,991   ← Table 4, r = 2
  — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 11,33 > 5,991 / · Ne pas rejeter H₀ : T = 11,33 ≤ 5,991
    = 9,21   ← Table 4, colonne s₁
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_corr_causal, p_pvalue_h0, p_significant_large

```

### Variantes d'examen

```
Patients selon le traitement (lignes) et la guérison (colonnes) :guérisnon guéristotaltraités5664120non traités4080120total96144240Test χ² d'indépendance au niveau 5 %. Sous H₀, quel est l'effectif attendu de la case (traités, guéris) ?
  · 49   · 56   · 60 [p_chi2_expected_uniform]   ✔ 48
  [examen mcq]
  pièges : p_chi2_expected_uniform

Vrai ou faux ?
  « Pour un tableau de contingence à h lignes et k colonnes, le test χ² d'indépendance a h·k − 1 degrés de liberté. » → FAUX
    contre-exemple (refute) : h = 2, k = 2
  [examen tf]
  pièges : p_chi2_df_indep

Personnes selon la couleur des yeux (lignes) et des cheveux (colonnes) :cheveux blondscheveux brunscheveux rouxtotalyeux clairs429033165yeux foncés2410833165total6619866330Test χ² d'indépendance au niveau 5 %. Calcule la statistique T (à 0,01 près).
  [free, sans aide, examen coef]  T
    (Effectifs attendus : 33 ; 99 ; 33 | 33 ; 99 ; 33.)
    = (42 − 33)²/33 + (90 − 99)²/99 + (33 − 33)²/33 + (24 − 33)²/33 + (108 − 99)²/99 + (33 − 33)²/33   ← Une case par terme
    = 81/33 + 81/99 + 81/33 + 81/99   ← Les cases sans écart donnent 0
    = 6,55   ← Statistique observée
  pièges : p_chi2_divide_obs

Personnes selon la couleur des yeux (lignes) et des cheveux (colonnes) :cheveux blondscheveux brunscheveux rouxtotalyeux clairs586620144yeux foncés22542096total8012040240Test χ² d'indépendance au niveau 5 %.
  [problème, examen open, 10 points]
  partie 1 (Personnes selon la couleur des yeux (lignes) et des cheveux (colonnes) :cheveux blondscheveux brunscheveux rouxtotalyeux clairs586620144yeux foncés22542096total8012040240Test χ² d'indépendance au niveau 5 %. : 2 ; Statistique T : 2,5 ; r : 2 ; Seuil à 5 % (Table 4) : 1,5 ; Seuil à 1 %, pour encadrer la p-valeur : 1)
  Personnes selon la couleur des yeux (lignes) et des cheveux (colonnes) :cheveux blondscheveux brunscheveux rouxtotalyeux clairs586620144yeux foncés22542096total8012040240Test χ² d'indépendance au niveau 5 %.
    [free, sans aide, suivre l'erreur, examen open]  e₁₁
      = 144·80/240   ← Marges de la case (1, 1)
      = 48   ← Effectif attendu
    — Statistique T  [juge stat]  départ : T
      (Effectifs attendus : 48 ; 72 ; 24 | 32 ; 48 ; 16.)
      = (58 − 48)²/48 + (66 − 72)²/72 + (20 − 24)²/24 + (22 − 32)²/32 + (54 − 48)²/48 + (20 − 16)²/16   ← Une case par terme
      = 100/48 + 36/72 + 16/24 + 100/32 + 36/48 + 16/16   ← Écarts au carré
      = 8,13   ← Statistique observée
    — r  [juge prob]  départ : r
      = (2 − 1)(3 − 1)   ← 2 lignes, 3 colonnes
      = 2   ← Degrés de liberté
    — Seuil à 5 % (Table 4)  [juge stat]  départ : s_5
      = 5,991   ← Table 4, r = 2
    — Seuil à 1 %, pour encadrer la p-valeur  [juge stat]  départ : s_1
      = 9,21   ← Table 4, colonne s₁
  partie 2 (Interpréter : 1)
  Interpréter : quelle phrase est juste ?
    ✔ Les données contredisent l'indépendance des yeux et des cheveux au niveau 5 % : la couleur des yeux et celle des cheveux sont liées.   · Le lien est fort et important en pratique, puisque le test rejette. [p_significant_large]   · La probabilité que les variables soient indépendantes est inférieure à 5 %. [p_pvalue_h0]   · La couleur des yeux cause celle des cheveux. [p_corr_causal]
    [examen open]
  pièges : p_chi2_expected_uniform, p_chi2_divide_obs, p_chi2_df_indep, p_pvalue_alpha_compare, p_corr_causal, p_significant_large, p_pvalue_h0

```

## χ² sur une variance : test et IC (`p-test-chi2-var`, BA4)

_Données normales, μ inconnue : T = (n − 1)S²/σ₀² ~ χ²(n − 1) sous H₀ : σ = σ₀._

### Niveau 1

```
Temps de réaction de conducteurs (données normales, moyenne inconnue) : n = 21 mesures, variance empirique s² = 3. On teste H₀ : σ² = 4 contre H₁ : σ² > 4 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(20) a pour quantiles d'ordre 0,025 et 0,975 les nombres 9,591 et 34,17 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [guided]  T
    = (21 − 1)·□   (trous : (21 − 1)·3/4)   ← Pivot (n − 1)S²/σ₀²
    = □   (trous : 15)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □   (trous : 20)   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 31,41)   ← Table 4, r = 20
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    (Décision au niveau 5 % ? Ne pas rejeter H₀ : T = 15 ≤ 31,41.)
    = 20·3/□   (trous : 20·3/34,17)   ← (n − 1)s² divisé par le grand quantile
    = □   (trous : 1,76)   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 20·3/□   (trous : 20·3/9,591)   ← (n − 1)s² divisé par le petit quantile
    = □   (trous : 6,26)   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 20 · 3/□ | T = 15 ; IC = [1,76 ; 6,26]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_pvalue_h0, p_accept_h0, p_ci_prob

Masse de comprimés (données normales, moyenne inconnue) : n = 11 mesures, variance empirique s² = 10. On teste H₀ : σ² = 5 contre H₁ : σ² > 5 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(10) a pour quantiles d'ordre 0,025 et 0,975 les nombres 3,247 et 20,483 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [guided]  T
    = (11 − 1)·□   (trous : (11 − 1)·10/5)   ← Pivot (n − 1)S²/σ₀²
    = □   (trous : 20)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □   (trous : 10)   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 18,307)   ← Table 4, r = 10
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    (Décision au niveau 5 % ? Rejeter H₀ : T = 20 > 18,307.)
    = 10·10/□   (trous : 10·10/20,483)   ← (n − 1)s² divisé par le grand quantile
    = □   (trous : 4,88)   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 10·10/□   (trous : 10·10/3,247)   ← (n − 1)s² divisé par le petit quantile
    = □   (trous : 30,8)   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 10 · 10/□ | T = 20 ; IC = [4,88 ; 30,8]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_ci_data, p_pvalue_h0, p_ci_prob

Épaisseur de plaques de verre (données normales, moyenne inconnue) : n = 21 mesures, variance empirique s² = 4. On teste H₀ : σ² = 2 contre H₁ : σ² > 2 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(20) a pour quantiles d'ordre 0,025 et 0,975 les nombres 9,591 et 34,17 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [guided]  T
    = (21 − 1)·□   (trous : (21 − 1)·4/2)   ← Pivot (n − 1)S²/σ₀²
    = □   (trous : 40)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □   (trous : 20)   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 31,41)   ← Table 4, r = 20
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    (Décision au niveau 5 % ? Rejeter H₀ : T = 40 > 31,41.)
    = 20·4/□   (trous : 20·4/34,17)   ← (n − 1)s² divisé par le grand quantile
    = □   (trous : 2,34)   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 20·4/□   (trous : 20·4/9,591)   ← (n − 1)s² divisé par le petit quantile
    = □   (trous : 8,34)   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 20 · 4/□ | T = 40 ; IC = [2,34 ; 8,34]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_ci_prob, p_pvalue_h0, p_ci_data

```

### Niveau 2

```
Masse de comprimés (données normales, moyenne inconnue) : n = 21 mesures, variance empirique s² = 1. On teste H₀ : σ² = 2 contre H₁ : σ² > 2 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(20) a pour quantiles d'ordre 0,025 et 0,975 les nombres 9,591 et 34,17 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [guided]  T
    = (21 − 1)·□   (trous : (21 − 1)·1/2)   ← Pivot (n − 1)S²/σ₀²
    = □   (trous : 10)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □   (trous : 20)   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 31,41)   ← Table 4, r = 20
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 10 > 31,41 / ✔ Ne pas rejeter H₀ : T = 10 ≤ 31,41
    = 20·1/□   (trous : 20·1/34,17)   ← (n − 1)s² divisé par le grand quantile
    = □   (trous : 0,59)   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 20·1/□   (trous : 20·1/9,591)   ← (n − 1)s² divisé par le petit quantile
    = □   (trous : 2,09)   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 20 · 1/□ | T = 10 ; IC = [0,59 ; 2,09]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_accept_h0, p_ci_prob, p_pvalue_h0

Diamètre de pièces usinées (données normales, moyenne inconnue) : n = 21 mesures, variance empirique s² = 3. On teste H₀ : σ² = 2 contre H₁ : σ² > 2 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(20) a pour quantiles d'ordre 0,025 et 0,975 les nombres 9,591 et 34,17 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [guided]  T
    = (21 − 1)·□   (trous : (21 − 1)·3/2)   ← Pivot (n − 1)S²/σ₀²
    = □   (trous : 30)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □   (trous : 20)   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 31,41)   ← Table 4, r = 20
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 30 > 31,41 / ✔ Ne pas rejeter H₀ : T = 30 ≤ 31,41
    = 20·3/□   (trous : 20·3/34,17)   ← (n − 1)s² divisé par le grand quantile
    = □   (trous : 1,76)   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 20·3/□   (trous : 20·3/9,591)   ← (n − 1)s² divisé par le petit quantile
    = □   (trous : 6,26)   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 20 · 3/□ | T = 30 ; IC = [1,76 ; 6,26]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_accept_h0, p_ci_prob, p_pvalue_h0

Diamètre de pièces usinées (données normales, moyenne inconnue) : n = 6 mesures, variance empirique s² = 6. On teste H₀ : σ² = 5 contre H₁ : σ² > 5 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(5) a pour quantiles d'ordre 0,025 et 0,975 les nombres 0,831 et 12,833 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [guided]  T
    = (6 − 1)·□   (trous : (6 − 1)·6/5)   ← Pivot (n − 1)S²/σ₀²
    = □   (trous : 6)   ← Statistique observée
  — r  [juge prob]  départ : r
    = □   (trous : 5)   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = □   (trous : 11,07)   ← Table 4, r = 5
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 6 > 11,07 / ✔ Ne pas rejeter H₀ : T = 6 ≤ 11,07
    = 5·6/□   (trous : 5·6/12,833)   ← (n − 1)s² divisé par le grand quantile
    = □   (trous : 2,34)   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 5·6/□   (trous : 5·6/0,831)   ← (n − 1)s² divisé par le petit quantile
    = □   (trous : 36,1)   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 5 · 6/□ | T = 6 ; IC = [2,34 ; 36,1]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_pvalue_h0, p_accept_h0, p_ci_prob

```

### Niveau 3

```
Épaisseur de plaques de verre (données normales, moyenne inconnue) : n = 6 mesures, variance empirique s² = 8. On teste H₀ : σ² = 5 contre H₁ : σ² > 5 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(5) a pour quantiles d'ordre 0,025 et 0,975 les nombres 0,831 et 12,833 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [tap, suivre l'erreur, menu menu]  T
    = (6 − 1)·8/5   ← Pivot (n − 1)S²/σ₀²
    = 8   ← Statistique observée
  — r  [juge prob]  départ : r
    = 5   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 11,07   ← Table 4, r = 5
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 8 > 11,07 / ✔ Ne pas rejeter H₀ : T = 8 ≤ 11,07
    = 5·8/12,833   ← (n − 1)s² divisé par le grand quantile
    = 3,12   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 5·8/0,831   ← (n − 1)s² divisé par le petit quantile
    = 48,13   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 5 · 8/□ | T = 8 ; IC = [3,12 ; 48,13]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_ci_prob, p_accept_h0, p_pvalue_h0

Diamètre de pièces usinées (données normales, moyenne inconnue) : n = 16 mesures, variance empirique s² = 6. On teste H₀ : σ² = 10 contre H₁ : σ² > 10 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(15) a pour quantiles d'ordre 0,025 et 0,975 les nombres 6,262 et 27,488 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [tap, suivre l'erreur, menu menu]  T
    = (16 − 1)·6/10   ← Pivot (n − 1)S²/σ₀²
    = 9   ← Statistique observée
  — r  [juge prob]  départ : r
    = 15   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 24,996   ← Table 4, r = 15
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 9 > 24,996 / ✔ Ne pas rejeter H₀ : T = 9 ≤ 24,996
    = 15·6/27,488   ← (n − 1)s² divisé par le grand quantile
    = 3,27   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 15·6/6,262   ← (n − 1)s² divisé par le petit quantile
    = 14,37   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 15 · 6/□ | T = 9 ; IC = [3,27 ; 14,37]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_accept_h0, p_ci_prob, p_pvalue_h0

Temps de réaction de conducteurs (données normales, moyenne inconnue) : n = 11 mesures, variance empirique s² = 33. On teste H₀ : σ² = 20 contre H₁ : σ² > 20 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(10) a pour quantiles d'ordre 0,025 et 0,975 les nombres 3,247 et 20,483 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [tap, suivre l'erreur, menu menu]  T
    = (11 − 1)·33/20   ← Pivot (n − 1)S²/σ₀²
    = 16,5   ← Statistique observée
  — r  [juge prob]  départ : r
    = 10   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 18,307   ← Table 4, r = 10
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 16,5 > 18,307 / ✔ Ne pas rejeter H₀ : T = 16,5 ≤ 18,307
    = 10·33/20,483   ← (n − 1)s² divisé par le grand quantile
    = 16,11   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 10·33/3,247   ← (n − 1)s² divisé par le petit quantile
    = 101,63   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 10 · 33/□ | T = 16,5 ; IC = [16,11 ; 101,63]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_ci_prob, p_pvalue_h0, p_accept_h0

```

### Niveau 4

```
Diamètre de pièces usinées (données normales, moyenne inconnue) : n = 6 mesures, variance empirique s² = 9. On teste H₀ : σ² = 5 contre H₁ : σ² > 5 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(5) a pour quantiles d'ordre 0,025 et 0,975 les nombres 0,831 et 12,833 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [free, suivre l'erreur]  T
    = (6 − 1)·9/5   ← Pivot (n − 1)S²/σ₀²
    = 9   ← Statistique observée
  — r  [juge prob]  départ : r
    = 5   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 11,07   ← Table 4, r = 5
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 9 > 11,07 / ✔ Ne pas rejeter H₀ : T = 9 ≤ 11,07
    = 5·9/12,833   ← (n − 1)s² divisé par le grand quantile
    = 3,51   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 5·9/0,831   ← (n − 1)s² divisé par le petit quantile
    = 54,15   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 5 · 9/□ | T = 9 ; IC = [3,51 ; 54,15]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_ci_prob, p_accept_h0, p_pvalue_h0

Épaisseur de plaques de verre (données normales, moyenne inconnue) : n = 11 mesures, variance empirique s² = 8. On teste H₀ : σ² = 10 contre H₁ : σ² > 10 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(10) a pour quantiles d'ordre 0,025 et 0,975 les nombres 3,247 et 20,483 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [free, suivre l'erreur]  T
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

Masse de comprimés (données normales, moyenne inconnue) : n = 6 mesures, variance empirique s² = 7. On teste H₀ : σ² = 10 contre H₁ : σ² > 10 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(5) a pour quantiles d'ordre 0,025 et 0,975 les nombres 0,831 et 12,833 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [free, suivre l'erreur]  T
    = (6 − 1)·7/10   ← Pivot (n − 1)S²/σ₀²
    = 3,5   ← Statistique observée
  — r  [juge prob]  départ : r
    = 5   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 11,07   ← Table 4, r = 5
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 3,5 > 11,07 / ✔ Ne pas rejeter H₀ : T = 3,5 ≤ 11,07
    = 5·7/12,833   ← (n − 1)s² divisé par le grand quantile
    = 2,73   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 5·7/0,831   ← (n − 1)s² divisé par le petit quantile
    = 42,12   ← Borne supérieure
  aides : (n − 1)S²/σ₀² suit un χ² à n − 1 degrés de liberté ; pour l'IC, le grand quantile donne la petite borne. | T = 5 · 7/□ | T = 3,5 ; IC = [2,73 ; 42,12]
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_ci_prob, p_accept_h0, p_pvalue_h0

```

### Niveau 5

```
Masse de comprimés (données normales, moyenne inconnue) : n = 21 mesures, variance empirique s² = 20. On teste H₀ : σ² = 10 contre H₁ : σ² > 10 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(20) a pour quantiles d'ordre 0,025 et 0,975 les nombres 9,591 et 34,17 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [free, sans aide]  T
    = (21 − 1)·20/10   ← Pivot (n − 1)S²/σ₀²
    = 40   ← Statistique observée
  — r  [juge prob]  départ : r
    = 20   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 31,41   ← Table 4, r = 20
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : T = 40 > 31,41 / · Ne pas rejeter H₀ : T = 40 ≤ 31,41
    = 20·20/34,17   ← (n − 1)s² divisé par le grand quantile
    = 11,71   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 20·20/9,591   ← (n − 1)s² divisé par le petit quantile
    = 41,71   ← Borne supérieure
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_ci_data, p_ci_prob, p_pvalue_h0

Masse de comprimés (données normales, moyenne inconnue) : n = 6 mesures, variance empirique s² = 13. On teste H₀ : σ² = 10 contre H₁ : σ² > 10 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(5) a pour quantiles d'ordre 0,025 et 0,975 les nombres 0,831 et 12,833 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [free, sans aide]  T
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
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_pvalue_h0, p_accept_h0, p_ci_prob

Épaisseur de plaques de verre (données normales, moyenne inconnue) : n = 21 mesures, variance empirique s² = 7. On teste H₀ : σ² = 5 contre H₁ : σ² > 5 au niveau 5 %, puis on donne l'IC à 95 % pour σ². Quantiles fournis : χ²(20) a pour quantiles d'ordre 0,025 et 0,975 les nombres 9,591 et 34,17 ; le seuil à 5 % (queue supérieure) est dans la Table 4.
  [free, sans aide]  T
    = (21 − 1)·7/5   ← Pivot (n − 1)S²/σ₀²
    = 28   ← Statistique observée
  — r  [juge prob]  départ : r
    = 20   ← Loi χ²(n − 1) sous H₀
  — Seuil à 5 % (Table 4, queue supérieure)  [juge stat]  départ : s_5
    = 31,41   ← Table 4, r = 20
  — IC à 95 % pour σ² : borne inférieure  [juge stat]  départ : σ²_min
    ? Décision au niveau 5 % ? · Rejeter H₀ : T = 28 > 31,41 / ✔ Ne pas rejeter H₀ : T = 28 ≤ 31,41
    = 20·7/34,17   ← (n − 1)s² divisé par le grand quantile
    = 4,1   ← Borne inférieure
  — Borne supérieure  [juge stat]  départ : σ²_max
    = 20·7/9,591   ← (n − 1)s² divisé par le petit quantile
    = 14,6   ← Borne supérieure
  pièges : p_chi2_var_n, p_chi2_var_inverted, p_chi2_ci_swapped, p_pvalue_alpha_compare, p_pvalue_h0, p_ci_prob, p_accept_h0

```

### Variantes d'examen

```
Données normales, n = 21, s² = 1. Pour tester H₀ : σ² = 2, que vaut la statistique T ?
  · 10,5 [p_chi2_var_n]   ✔ 10   · 40 [p_chi2_var_inverted]   · 0,5
  [examen mcq]
  pièges : p_chi2_var_n, p_chi2_var_inverted

Vrai ou faux ?
  « La borne supérieure de l'IC à 95 % pour σ² est (n − 1)s² divisé par le petit quantile (d'ordre 0,025) du χ²(n − 1). » → VRAI
  [examen tf]

```

## Interpréter une p-valeur ou un IC (`p-interpret`, BA3)

_La p-valeur est Pr(données au moins aussi extrêmes | H₀), pas Pr(H₀ | données)._

### Niveau 1

```
IC à 95 % pour la proportion p de « oui » à une votation : [0,51 ; 0,59]. Un test d'une hypothèse H₀ sur p, fait sur d'autres données, donne p_obs = 0,07. Cette phrase est-elle juste ou un contresens ? « Si H₀ était vraie, on observerait un écart au moins aussi grand avec une probabilité de 0,07. »
  ✔ Juste   · Contresens

IC à 95 % pour la proportion p de Suisses qui partent en randonnée le week-end : [0,2 ; 0,6]. Un test d'une hypothèse H₀ sur p, fait sur d'autres données, donne p_obs = 0,45. Cette phrase est-elle juste ou un contresens ? « La probabilité que H₀ soit vraie est 0,45. »
  · Juste [p_pvalue_h0]   ✔ Contresens
  pièges : p_pvalue_h0

IC à 95 % pour la baisse moyenne δ de tension sous un médicament (en mmHg) : [0,5 ; 6,5]. Un test d'une hypothèse H₀ sur δ, fait sur d'autres données, donne p_obs = 0,07. Cette phrase est-elle juste ou un contresens ? « Avec p_obs = 0,07, on ne rejette pas H₀ au niveau 5 % : les données sont compatibles avec H₀. »
  ✔ Juste   · Contresens

```

### Niveau 2

```
IC à 95 % pour la baisse moyenne δ de tension sous un médicament (en mmHg) : [2 ; 8]. Un test d'une hypothèse H₀ sur δ, fait sur d'autres données, donne p_obs = 0,2. Quelle phrase est juste ?
  · L'estimation d̄ est dans [2 ; 8] avec probabilité 0,95. [p_ci_xbar]   · Avec un échantillon dix fois plus grand, un effet significatif serait forcément grand. [p_significant_large]   · Avec p_obs = 0,07, on rejette H₀ à 10 %, donc aussi à 5 %. [p_reject_10_5]   ✔ Si H₀ était vraie, on observerait un écart au moins aussi grand avec une probabilité de 0,2.
  pièges : p_significant_large, p_reject_10_5, p_ci_xbar

IC à 95 % pour la proportion p de Suisses qui partent en randonnée le week-end : [0,2 ; 0,6]. Un test d'une hypothèse H₀ sur p, fait sur d'autres données, donne p_obs = 0,08. Quelle phrase est juste ?
  · La probabilité que H₀ soit vraie est 0,08. [p_pvalue_h0]   · Il y a 95 % de chances que p soit dans [0,2 ; 0,6]. [p_ci_prob]   ✔ Si H₀ était vraie, on observerait un écart au moins aussi grand avec une probabilité de 0,08.   · Sur 20 tests à 5 % faits sur les mêmes données, un seul rejette H₀ : l'effet trouvé est démontré. [p_multiple_tests]
  pièges : p_ci_prob, p_multiple_tests, p_pvalue_h0

IC à 95 % pour la proportion p de Suisses qui partent en randonnée le week-end : [0,25 ; 0,45]. Un test d'une hypothèse H₀ sur p, fait sur d'autres données, donne p_obs = 0,02. Quelle phrase est juste ?
  · La probabilité que H₀ soit vraie est 0,02. [p_pvalue_h0]   · Il y a 95 % de chances que p soit dans [0,25 ; 0,45]. [p_ci_prob]   · Le résultat est significatif, donc l'effet est grand et important en pratique. [p_significant_large]   ✔ Si H₀ était vraie, on observerait un écart au moins aussi grand avec une probabilité de 0,02.
  pièges : p_pvalue_h0, p_significant_large, p_ci_prob

```

### Niveau 3

```
IC à 95 % pour la proportion p de « oui » à une votation : [0,48 ; 0,56]. Un test d'une hypothèse H₀ sur p, fait sur d'autres données, donne p_obs = 0,003. Quelle affirmation est fausse ?
  · Avec p_obs = 0,003, on rejette H₀ au niveau 5 %, donc aussi au niveau 10 %.   ✔ Deux études indépendantes donnent chacune un IC à 95 % : leur intersection est un IC à 95 %.   · 0,44 est hors de l'IC : le test bilatéral à 5 % rejette H₀ : p = 0,44.   · 0,52 est dans l'IC : le test bilatéral à 5 % ne rejette pas H₀ : p = 0,52.
  pièges : p_ci_intersection

IC à 95 % pour la proportion p de « oui » à une votation : [0,48 ; 0,56]. Un test d'une hypothèse H₀ sur p, fait sur d'autres données, donne p_obs = 0,08. Quelle affirmation est fausse ?
  · Avec p_obs = 0,08, on ne rejette pas H₀ au niveau 5 % : les données sont compatibles avec H₀.   · 0,46 est hors de l'IC : le test bilatéral à 5 % rejette H₀ : p = 0,46.   · 0,5 est dans l'IC : le test bilatéral à 5 % ne rejette pas H₀ : p = 0,5.   ✔ Deux études indépendantes donnent chacune un IC à 95 % : leur intersection est un IC à 95 %.
  pièges : p_ci_intersection

IC à 95 % pour la consommation moyenne μ d'un compteur électrique (en kWh) : [101 ; 109]. Un test d'une hypothèse H₀ sur μ, fait sur d'autres données, donne p_obs = 0,003. Quelle affirmation est fausse ?
  · Si on refaisait l'étude un grand nombre de fois, environ 95 % des IC construits de cette façon contiendraient μ.   · Avec p_obs = 0,003, on rejette H₀ au niveau 5 %, donc aussi au niveau 10 %.   ✔ Le résultat est significatif, donc l'effet est grand et important en pratique.   · 113 est hors de l'IC : le test bilatéral à 5 % rejette H₀ : μ = 113.
  pièges : p_significant_large

```

### Niveau 4

```
IC à 95 % pour la consommation moyenne μ d'un compteur électrique (en kWh) : [101 ; 109]. Un test d'une hypothèse H₀ sur μ, fait sur d'autres données, donne p_obs = 0,45. Quelle phrase est juste ?
  · 107 est dans l'IC, donc le test bilatéral à 5 % rejette H₀ : μ = 107.   · Avec un échantillon dix fois plus grand, un effet significatif serait forcément grand. [p_significant_large]   ✔ 107 est dans l'IC : le test bilatéral à 5 % ne rejette pas H₀ : μ = 107.   · L'estimation x̄ est dans [101 ; 109] avec probabilité 0,95. [p_ci_xbar]
  pièges : p_ci_xbar, p_significant_large

IC à 95 % pour la teneur moyenne μ en alcool d'un vin (en %) : [11,6 ; 12,4]. Un test d'une hypothèse H₀ sur μ, fait sur d'autres données, donne p_obs = 0,2. Quelle phrase est juste ?
  ✔ 12,2 est dans l'IC : le test bilatéral à 5 % ne rejette pas H₀ : μ = 12,2.   · 12,2 est dans l'IC, donc le test bilatéral à 5 % rejette H₀ : μ = 12,2.   · Avec un échantillon dix fois plus grand, un effet significatif serait forcément grand. [p_significant_large]   · L'estimation x̄ est dans [11,6 ; 12,4] avec probabilité 0,95. [p_ci_xbar]
  pièges : p_ci_xbar, p_significant_large

IC à 95 % pour la consommation moyenne μ d'un compteur électrique (en kWh) : [96 ; 104]. Un test d'une hypothèse H₀ sur μ, fait sur d'autres données, donne p_obs = 0,45. Quelle phrase est juste ?
  · 102 est dans l'IC, donc le test bilatéral à 5 % rejette H₀ : μ = 102.   ✔ 102 est dans l'IC : le test bilatéral à 5 % ne rejette pas H₀ : μ = 102.   · La probabilité que H₀ soit vraie est 0,45. [p_pvalue_h0]   · L'estimation x̄ est dans [96 ; 104] avec probabilité 0,95. [p_ci_xbar]
  pièges : p_ci_xbar, p_pvalue_h0

```

### Niveau 5

```
IC à 95 % pour la proportion p de Suisses qui partent en randonnée le week-end : [0,25 ; 0,45]. Un test d'une hypothèse H₀ sur p, fait sur d'autres données, donne p_obs = 0,2. Quelle affirmation est fausse ?
  · 0,3 est dans l'IC : le test bilatéral à 5 % ne rejette pas H₀ : p = 0,3.   · Si on refaisait l'étude un grand nombre de fois, environ 95 % des IC construits de cette façon contiendraient p.   · 0,15 est hors de l'IC : le test bilatéral à 5 % rejette H₀ : p = 0,15.   ✔ 95 % des valeurs observées dans l'échantillon sont dans [0,25 ; 0,45].
  pièges : p_ci_data

IC à 95 % pour la teneur moyenne μ en alcool d'un vin (en %) : [11,2 ; 11,8]. Un test d'une hypothèse H₀ sur μ, fait sur d'autres données, donne p_obs = 0,03. Quelle affirmation est fausse ?
  ✔ Il y a 95 % de chances que μ soit dans [11,2 ; 11,8].   · Avec p_obs = 0,03, on rejette H₀ au niveau 5 %, donc aussi au niveau 10 %.   · Si H₀ était vraie, on observerait un écart au moins aussi grand avec une probabilité de 0,03.   · Si on refaisait l'étude un grand nombre de fois, environ 95 % des IC construits de cette façon contiendraient μ.
  pièges : p_ci_prob

IC à 95 % pour la baisse moyenne δ de tension sous un médicament (en mmHg) : [−1 ; 5]. Un test d'une hypothèse H₀ sur δ, fait sur d'autres données, donne p_obs = 0,45. Quelle affirmation est fausse ?
  · 6,5 est hors de l'IC : le test bilatéral à 5 % rejette H₀ : δ = 6,5.   · Avec p_obs = 0,45, on ne rejette pas H₀ au niveau 5 % : les données sont compatibles avec H₀.   · Si H₀ était vraie, on observerait un écart au moins aussi grand avec une probabilité de 0,45.   ✔ Avec un échantillon dix fois plus grand, un effet significatif serait forcément grand.
  pièges : p_significant_large

```

### Variantes d'examen

```
IC à 95 % pour la consommation moyenne μ d'un compteur électrique (en kWh) : [92 ; 99]. Un test d'une hypothèse H₀ sur μ, fait sur d'autres données, donne p_obs = 0,45. Quelle affirmation est fausse ?
  · Si H₀ était vraie, on observerait un écart au moins aussi grand avec une probabilité de 0,45.   · Si on refaisait l'étude un grand nombre de fois, environ 95 % des IC construits de cette façon contiendraient μ.   · 102,5 est hors de l'IC : le test bilatéral à 5 % rejette H₀ : μ = 102,5.   ✔ On ne rejette pas H₀ : c'est la preuve que H₀ est vraie.
  [examen mcq]
  pièges : p_accept_h0

Vrai ou faux ? On fait 20 tests à 5 % sur des hypothèses H₀ toutes vraies : on n'attend aucun rejet.
  · Vrai [p_multiple_tests]   ✔ Faux
  [examen tf]
  pièges : p_multiple_tests

```

## Droite des moindres carrés, r et R² (`p-reg-ls`, BA3)

_Modèle Yᵢ = α + βxᵢ + εᵢ._

### Niveau 1

```
Données (5 points) : x : 2, 3, 4, 5, 6 ; y : 12, 13, 10, 9, 11. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [guided]  x̄
    = (2 + 3 + 4 + □ + 6)/5   (trous : (2 + 3 + 4 + 5 + 6)/5)   ← Moyenne des x
    = □   (trous : 4)
  — ȳ  [juge prob]  départ : ȳ
    = (12 + 13 + 10 + 9 + 11)/□   (trous : (12 + 13 + 10 + 9 + 11)/5)   ← Moyenne des y
    = □   (trous : 11)
  — Sxx  [juge prob]  départ : S_xx
    = □ + (−1)² + 0² + 1² + 2²   (trous : (−2)² + (−1)² + 0² + 1² + 2²)   ← Σ(xᵢ − x̄)²
    = □   (trous : 10)
  — Sxy  [juge prob]  départ : S_xy
    = □ + (−1)·2 + 0·(−1) + 1·(−2) + 2·0   (trous : (−2)·1 + (−1)·2 + 0·(−1) + 1·(−2) + 2·0)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = □   (trous : −6)
  — β̂  [juge prob]  départ : β̂
    = −6/□   (trous : −6/10)   ← S_xy/S_xx
    = □   (trous : −0,6)
  — α̂  [juge prob]  départ : α̂
    = 11 − □·4   (trous : 11 − (−0,6)·4)   ← La droite passe par (x̄, ȳ)
    = □   (trous : 13,4)
  — Syy  [juge prob]  départ : S_yy
    = 1² + 2² + (−1)² + (−2)² + 0²   ← Σ(yᵢ − ȳ)²
    = 10
  — R2  [juge prob]  départ : R²
    = (−6)²/(□·10)   (trous : (−6)²/(10·10))   ← R² = r²
    = 0,36
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = −6/□ | β̂ = −0,6, α̂ = 13,4
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

Données (5 points) : x : 3, 4, 5, 6, 7 ; y : 11, 5, 8, 10, 6. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [guided]  x̄
    = (3 + 4 + □ + 6 + 7)/5   (trous : (3 + 4 + 5 + 6 + 7)/5)   ← Moyenne des x
    = □   (trous : 5)
  — ȳ  [juge prob]  départ : ȳ
    = (11 + □ + 8 + 10 + 6)/5   (trous : (11 + 5 + 8 + 10 + 6)/5)   ← Moyenne des y
    = □   (trous : 8)
  — Sxx  [juge prob]  départ : S_xx
    = □ + (−1)² + 0² + 1² + 2²   (trous : (−2)² + (−1)² + 0² + 1² + 2²)   ← Σ(xᵢ − x̄)²
    = □   (trous : 10)
  — Sxy  [juge prob]  départ : S_xy
    = □ + (−1)·(−3) + 0·0 + 1·2 + 2·(−2)   (trous : (−2)·3 + (−1)·(−3) + 0·0 + 1·2 + 2·(−2))   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = □   (trous : −5)
  — β̂  [juge prob]  départ : β̂
    = −5/□   (trous : −5/10)   ← S_xy/S_xx
    = □   (trous : −0,5)
  — α̂  [juge prob]  départ : α̂
    = 8 − □·5   (trous : 8 − (−0,5)·5)   ← La droite passe par (x̄, ȳ)
    = □   (trous : 10,5)
  — Syy  [juge prob]  départ : S_yy
    = 3² + (−3)² + 0² + 2² + (−2)²   ← Σ(yᵢ − ȳ)²
    = 26
  — R2  [juge prob]  départ : R²
    = (−5)²/(10·□)   (trous : (−5)²/(10·26))   ← R² = r²
    = 5/52
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = −5/□ | β̂ = −0,5, α̂ = 10,5
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

Données (4 points) : x : 1, 2, 3, 4 ; y : 4, 7, 3, 2. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [guided]  x̄
    = (1 + 2 + 3 + □)/4   (trous : (1 + 2 + 3 + 4)/4)   ← Moyenne des x
    = □   (trous : 2,5)
  — ȳ  [juge prob]  départ : ȳ
    = (□ + 7 + 3 + 2)/4   (trous : (4 + 7 + 3 + 2)/4)   ← Moyenne des y
    = □   (trous : 4)
  — Sxx  [juge prob]  départ : S_xx
    = □ + (−0,5)² + 0,5² + 1,5²   (trous : (−1,5)² + (−0,5)² + 0,5² + 1,5²)   ← Σ(xᵢ − x̄)²
    = □   (trous : 5)
  — Sxy  [juge prob]  départ : S_xy
    = □ + (−0,5)·3 + 0,5·(−1) + 1,5·(−2)   (trous : (−1,5)·0 + (−0,5)·3 + 0,5·(−1) + 1,5·(−2))   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = □   (trous : −5)
  — β̂  [juge prob]  départ : β̂
    = −□/5   (trous : −5/5)   ← S_xy/S_xx
    = □   (trous : −1)
  — α̂  [juge prob]  départ : α̂
    = 4 − □·2,5   (trous : 4 − (−1)·2,5)   ← La droite passe par (x̄, ȳ)
    = □   (trous : 6,5)
  — Syy  [juge prob]  départ : S_yy
    = 0² + 3² + (−1)² + (−2)²   ← Σ(yᵢ − ȳ)²
    = 14
  — R2  [juge prob]  départ : R²
    = (−5)²/(5·□)   (trous : (−5)²/(5·14))   ← R² = r²
    = 5/14
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = −5/□ | β̂ = −1, α̂ = 6,5
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

```

### Niveau 2

```
Données (5 points) : x : 3, 4, 5, 6, 7 ; y : 1, 6, 4, 5, 4. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [guided]  x̄
    = (3 + 4 + □ + 6 + 7)/5   (trous : (3 + 4 + 5 + 6 + 7)/5)   ← Moyenne des x
    = □   (trous : 5)
  — ȳ  [juge prob]  départ : ȳ
    = (1 + 6 + 4 + □ + 4)/5   (trous : (1 + 6 + 4 + 5 + 4)/5)   ← Moyenne des y
    = □   (trous : 4)
  — Sxx  [juge prob]  départ : S_xx
    = □ + (−1)² + 0² + 1² + 2²   (trous : (−2)² + (−1)² + 0² + 1² + 2²)   ← Σ(xᵢ − x̄)²
    = □   (trous : 10)
  — Sxy  [juge prob]  départ : S_xy
    = □ + (−1)·2 + 0·0 + 1·1 + 2·0   (trous : (−2)·(−3) + (−1)·2 + 0·0 + 1·1 + 2·0)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = □   (trous : 5)
  — β̂  [juge prob]  départ : β̂
    = 5/□   (trous : 5/10)   ← S_xy/S_xx
    = □   (trous : 0,5)
  — α̂  [juge prob]  départ : α̂
    = 4 − □·5   (trous : 4 − 0,5·5)   ← La droite passe par (x̄, ȳ)
    = □   (trous : 1,5)
  — Syy  [juge prob]  départ : S_yy
    = (−3)² + 2² + 0² + 1² + 0²   ← Σ(yᵢ − ȳ)²
    = 14
  — R2  [juge prob]  départ : R²
    = 5²/(10·□)   (trous : 5²/(10·14))   ← R² = r²
    = 5/28
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = 5/□ | β̂ = 0,5, α̂ = 1,5
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

Données (4 points) : x : 0, 1, 2, 3 ; y : 4, 2, 3, 3. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [guided]  x̄
    = (0 + 1 + 2 + 3)/□   (trous : (0 + 1 + 2 + 3)/4)   ← Moyenne des x
    = □   (trous : 1,5)
  — ȳ  [juge prob]  départ : ȳ
    = (□ + 2 + 3 + 3)/4   (trous : (4 + 2 + 3 + 3)/4)   ← Moyenne des y
    = □   (trous : 3)
  — Sxx  [juge prob]  départ : S_xx
    = □ + (−0,5)² + 0,5² + 1,5²   (trous : (−1,5)² + (−0,5)² + 0,5² + 1,5²)   ← Σ(xᵢ − x̄)²
    = □   (trous : 5)
  — Sxy  [juge prob]  départ : S_xy
    = □ + (−0,5)·(−1) + 0,5·0 + 1,5·0   (trous : (−1,5)·1 + (−0,5)·(−1) + 0,5·0 + 1,5·0)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = □   (trous : −1)
  — β̂  [juge prob]  départ : β̂
    = −1/□   (trous : −1/5)   ← S_xy/S_xx
  — α̂  [juge prob]  départ : α̂
    = 3 − □·1,5   (trous : 3 − (−0,2)·1,5)   ← La droite passe par (x̄, ȳ)
    = □   (trous : 3,3)
  — Syy  [juge prob]  départ : S_yy
    = 1² + (−1)² + 0² + 0²   ← Σ(yᵢ − ȳ)²
    = 2
  — R2  [juge prob]  départ : R²
    = (−1)^□/(5·2)   (trous : (−1)²/(5·2))   ← R² = r²
    = 0,1
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = −1/□ | β̂ = −0,2, α̂ = 3,3
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

Données (5 points) : x : 2, 3, 4, 5, 6 ; y : 14, 9, 9, 12, 11. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [guided]  x̄
    = (2 + 3 + 4 + □ + 6)/5   (trous : (2 + 3 + 4 + 5 + 6)/5)   ← Moyenne des x
    = □   (trous : 4)
  — ȳ  [juge prob]  départ : ȳ
    = (14 + 9 + 9 + 12 + 11)/□   (trous : (14 + 9 + 9 + 12 + 11)/5)   ← Moyenne des y
    = □   (trous : 11)
  — Sxx  [juge prob]  départ : S_xx
    = □ + (−1)² + 0² + 1² + 2²   (trous : (−2)² + (−1)² + 0² + 1² + 2²)   ← Σ(xᵢ − x̄)²
    = □   (trous : 10)
  — Sxy  [juge prob]  départ : S_xy
    = □ + (−1)·(−2) + 0·(−2) + 1·1 + 2·0   (trous : (−2)·3 + (−1)·(−2) + 0·(−2) + 1·1 + 2·0)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = □   (trous : −3)
  — β̂  [juge prob]  départ : β̂
    = −3/□   (trous : −3/10)   ← S_xy/S_xx
  — α̂  [juge prob]  départ : α̂
    = 11 − □·4   (trous : 11 − (−0,3)·4)   ← La droite passe par (x̄, ȳ)
    = □   (trous : 12,2)
  — Syy  [juge prob]  départ : S_yy
    = 3² + (−2)² + (−2)² + 1² + 0²   ← Σ(yᵢ − ȳ)²
    = 18
  — R2  [juge prob]  départ : R²
    = (−3)²/(10·□)   (trous : (−3)²/(10·18))   ← R² = r²
    = 0,05
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = −3/□ | β̂ = −0,3, α̂ = 12,2
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

```

### Niveau 3

```
Données (4 points) : x : 2, 3, 4, 5 ; y : 1, 6, 7, 2. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [tap, suivre l'erreur, menu menu]  x̄
    = (2 + 3 + 4 + 5)/4   ← Moyenne des x
    = 3,5
  — ȳ  [juge prob]  départ : ȳ
    = (1 + 6 + 7 + 2)/4   ← Moyenne des y
    = 4
  — Sxx  [juge prob]  départ : S_xx
    = (−1,5)² + (−0,5)² + 0,5² + 1,5²   ← Σ(xᵢ − x̄)²
    = 5
  — Sxy  [juge prob]  départ : S_xy
    = (−1,5)·(−3) + (−0,5)·2 + 0,5·3 + 1,5·(−2)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = 2
  — β̂  [juge prob]  départ : β̂
    = 2/5   ← S_xy/S_xx
  — α̂  [juge prob]  départ : α̂
    = 4 − 0,4·3,5   ← La droite passe par (x̄, ȳ)
    = 2,6
  — Syy  [juge prob]  départ : S_yy
    = (−3)² + 2² + 3² + (−2)²   ← Σ(yᵢ − ȳ)²
    = 26
  — R2  [juge prob]  départ : R²
    = 2²/(5·26)   ← R² = r²
    = 2/65
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = 2/□ | β̂ = 0,4, α̂ = 2,6
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

Données (4 points) : x : 2, 3, 4, 5 ; y : 5, 6, 4, 1. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [tap, suivre l'erreur, menu menu]  x̄
    = (2 + 3 + 4 + 5)/4   ← Moyenne des x
    = 3,5
  — ȳ  [juge prob]  départ : ȳ
    = (5 + 6 + 4 + 1)/4   ← Moyenne des y
    = 4
  — Sxx  [juge prob]  départ : S_xx
    = (−1,5)² + (−0,5)² + 0,5² + 1,5²   ← Σ(xᵢ − x̄)²
    = 5
  — Sxy  [juge prob]  départ : S_xy
    = (−1,5)·1 + (−0,5)·2 + 0,5·0 + 1,5·(−3)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = −7
  — β̂  [juge prob]  départ : β̂
    = −7/5   ← S_xy/S_xx
  — α̂  [juge prob]  départ : α̂
    = 4 − (−1,4)·3,5   ← La droite passe par (x̄, ȳ)
    = 8,9
  — Syy  [juge prob]  départ : S_yy
    = 1² + 2² + 0² + (−3)²   ← Σ(yᵢ − ȳ)²
    = 14
  — R2  [juge prob]  départ : R²
    = (−7)²/(5·14)   ← R² = r²
    = 0,7
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = −7/□ | β̂ = −1,4, α̂ = 8,9
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

Données (4 points) : x : 1, 2, 3, 4 ; y : 12, 8, 10, 6. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [tap, suivre l'erreur, menu menu]  x̄
    = (1 + 2 + 3 + 4)/4   ← Moyenne des x
    = 2,5
  — ȳ  [juge prob]  départ : ȳ
    = (12 + 8 + 10 + 6)/4   ← Moyenne des y
    = 9
  — Sxx  [juge prob]  départ : S_xx
    = (−1,5)² + (−0,5)² + 0,5² + 1,5²   ← Σ(xᵢ − x̄)²
    = 5
  — Sxy  [juge prob]  départ : S_xy
    = (−1,5)·3 + (−0,5)·(−1) + 0,5·1 + 1,5·(−3)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = −8
  — β̂  [juge prob]  départ : β̂
    = −8/5   ← S_xy/S_xx
  — α̂  [juge prob]  départ : α̂
    = 9 − (−1,6)·2,5   ← La droite passe par (x̄, ȳ)
    = 13
  — Syy  [juge prob]  départ : S_yy
    = 3² + (−1)² + 1² + (−3)²   ← Σ(yᵢ − ȳ)²
    = 20
  — R2  [juge prob]  départ : R²
    = (−8)²/(5·20)   ← R² = r²
    = 0,64
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = −8/□ | β̂ = −1,6, α̂ = 13
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

```

### Niveau 4

```
Données (7 points) : x : 2, 3, 4, 5, 6, 7, 8 ; y : 9, 12, 14, 11, 12, 8, 11. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [free, suivre l'erreur]  x̄
    = (2 + 3 + 4 + 5 + 6 + 7 + 8)/7   ← Moyenne des x
    = 5
  — ȳ  [juge prob]  départ : ȳ
    = (9 + 12 + 14 + 11 + 12 + 8 + 11)/7   ← Moyenne des y
    = 11
  — Sxx  [juge prob]  départ : S_xx
    = (−3)² + (−2)² + (−1)² + 0² + 1² + 2² + 3²   ← Σ(xᵢ − x̄)²
    = 28
  — Sxy  [juge prob]  départ : S_xy
    = (−3)·(−2) + (−2)·1 + (−1)·3 + 0·0 + 1·1 + 2·(−3) + 3·0   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = −4
  — β̂  [juge prob]  départ : β̂
    = −4/28   ← S_xy/S_xx
    = −1/7
  — α̂  [juge prob]  départ : α̂
    = 11 − (−1/7)·5   ← La droite passe par (x̄, ȳ)
    = 82/7
  — Syy  [juge prob]  départ : S_yy
    = (−2)² + 1² + 3² + 0² + 1² + (−3)² + 0²   ← Σ(yᵢ − ȳ)²
    = 24
  — R2  [juge prob]  départ : R²
    = (−4)²/(28·24)   ← R² = r²
    = 1/42
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = −4/□ | β̂ = −1/7, α̂ = 82/7
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

Un ressort s'allonge sous des masses x (en kg) ; y est l'allongement (en mm). Pour n = 5 mesures : Σx = 25, Σy = 45, Σx² = 135, Σxy = 214. Donne la droite des moindres carrés y = α̂ + β̂x.
  [free, suivre l'erreur]  x̄
    = 25/5   ← Σx/n
    = 5
  — ȳ  [juge prob]  départ : ȳ
    = 45/5   ← Σy/n
    = 9
  — Sxx  [juge prob]  départ : S_xx
    = 135 − 5·5²   ← Σx² − n·x̄²
    = 10
  — Sxy  [juge prob]  départ : S_xy
    = 214 − 5·5·9   ← Σxy − n·x̄·ȳ
    = −11
  — β̂  [juge prob]  départ : β̂
    = −11/10   ← S_xy/S_xx
  — α̂  [juge prob]  départ : α̂
    = 9 − (−1,1)·5   ← La droite passe par (x̄, ȳ)
    = 14,5
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = −11/□ | β̂ = −1,1, α̂ = 14,5
  pièges : p_reg_slope_swap, p_reg_sums_raw

Données (6 points) : x : 3, 4, 5, 6, 7, 8 ; y : 3, 6, 9, 5, 8, 5. Calcule la droite des moindres carrés y = α̂ + β̂x et R².
  [free, suivre l'erreur]  x̄
    = (3 + 4 + 5 + 6 + 7 + 8)/6   ← Moyenne des x
    = 5,5
  — ȳ  [juge prob]  départ : ȳ
    = (3 + 6 + 9 + 5 + 8 + 5)/6   ← Moyenne des y
    = 6
  — Sxx  [juge prob]  départ : S_xx
    = (−2,5)² + (−1,5)² + (−0,5)² + 0,5² + 1,5² + 2,5²   ← Σ(xᵢ − x̄)²
    = 17,5
  — Sxy  [juge prob]  départ : S_xy
    = (−2,5)·(−3) + (−1,5)·0 + (−0,5)·3 + 0,5·(−1) + 1,5·2 + 2,5·(−1)   ← Σ(xᵢ − x̄)(yᵢ − ȳ)
    = 6
  — β̂  [juge prob]  départ : β̂
    = 6/17,5   ← S_xy/S_xx
    = 12/35
  — α̂  [juge prob]  départ : α̂
    = 6 − 12/35·5,5   ← La droite passe par (x̄, ȳ)
    = 144/35
  — Syy  [juge prob]  départ : S_yy
    = (−3)² + 0² + 3² + (−1)² + 2² + (−1)²   ← Σ(yᵢ − ȳ)²
    = 24
  — R2  [juge prob]  départ : R²
    = 6²/(17,5·24)   ← R² = r²
    = 3/35
  aides : Centre d'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ). | β̂ = 6/□ | β̂ = 12/35, α̂ = 144/35
  pièges : p_reg_slope_swap, p_reg_sums_raw, p_r2_r

```

### Niveau 5

```
On connaît x̄ = 10, ȳ = 26, s_x = 2, s_y = 6 et r = 0,8. Donne la droite de régression de y sur x (y = α̂ + β̂x), puis celle de x sur y (x = ĉ + d̂y).
  [free, sans aide]  β̂
    = 0,8·6/2   ← β̂ = r·s_y/s_x
    = 2,4
  — α̂  [juge prob]  départ : α̂
    = 26 − 2,4·10   ← Par (x̄, ȳ)
    = 2
  — Droite de x sur y : pente d̂  [juge prob]  départ : d̂
    = 0,8·2/6   ← d̂ = r·s_x/s_y, pas 1/β̂
    = 4/15
  — ĉ  [juge prob]  départ : ĉ
    = 10 − 4/15·26   ← Par (x̄, ȳ) aussi
    = 46/15
  pièges : p_reg_x_on_y

On connaît x̄ = 4, ȳ = 16, s_x = 4, s_y = 10 et r = 0,8. Donne la droite de régression de y sur x (y = α̂ + β̂x), puis celle de x sur y (x = ĉ + d̂y).
  [free, sans aide]  β̂
    = 0,8·10/4   ← β̂ = r·s_y/s_x
    = 2
  — α̂  [juge prob]  départ : α̂
    = 16 − 2·4   ← Par (x̄, ȳ)
    = 8
  — Droite de x sur y : pente d̂  [juge prob]  départ : d̂
    = 0,8·4/10   ← d̂ = r·s_x/s_y, pas 1/β̂
    = 0,32
  — ĉ  [juge prob]  départ : ĉ
    = 4 − 0,32·16   ← Par (x̄, ȳ) aussi
    = −1,12
  pièges : p_reg_x_on_y

On connaît x̄ = 8, ȳ = 25, s_x = 5, s_y = 3 et r = −0,5. Donne la droite de régression de y sur x (y = α̂ + β̂x), puis celle de x sur y (x = ĉ + d̂y).
  [free, sans aide]  β̂
    = −0,5·3/5   ← β̂ = r·s_y/s_x
    = −0,3
  — α̂  [juge prob]  départ : α̂
    = 25 − (−0,3)·8   ← Par (x̄, ȳ)
    = 27,4
  — Droite de x sur y : pente d̂  [juge prob]  départ : d̂
    = −0,5·5/3   ← d̂ = r·s_x/s_y, pas 1/β̂
    = −5/6
  — ĉ  [juge prob]  départ : ĉ
    = 8 − (−5/6)·25   ← Par (x̄, ȳ) aussi
    = 173/6
  pièges : p_reg_x_on_y

```

### Variantes d'examen

```
Données : x : 3, 4, 5, 6, 7, 8 ; y : 13, 9, 14, 9, 12, 15. La droite de y sur x est y = 9,8 + 0,4x. Quelle est la droite de régression de x sur y ?
  · x = 0,7 + 0,4·y   · x = −24,5 + 2,5·y [p_reg_x_on_y]   · x = 3,875 + 0,21875·y   ✔ x = 2,875 + 0,21875·y
  [examen mcq]
  pièges : p_reg_x_on_y

Vrai ou faux ?
  « La droite des moindres carrés de y sur x passe par le point (x̄, ȳ). » → VRAI
  [examen tf]

Données : x : 3, 4, 5, 6, 7, 8, 9 ; y : 10, 13, 10, 15, 12, 15, 16. Calcule la pente β̂ de la droite des moindres carrés.
  [free, sans aide, examen coef]  β̂
    = 24/28   ← S_xy/S_xx
    = 6/7
  pièges : p_reg_slope_swap, p_reg_sums_raw

```

## Tests t et IC sur les coefficients (`p-reg-test`, BA3)

_σ̂² = RSS/(n − 2), puis t = estimation/erreur standard, comparé à Student à n − 2 degrés de liberté._

### Niveau 1

```
Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 6, x̄ = 5,5, ȳ = 9, S_xx = 17,5, S_xy = −12, S_yy = 28, β̂ = −24/35. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [guided]  RSS
    = 28 − □·(−12)   (trous : 28 − (−24/35)·(−12))   ← Somme des carrés des résidus
    = □   (trous : 19,771)
  — σ̂2  [juge stat]  départ : σ̂²
    = 19,771/□   (trous : 19,771/4)   ← Deux paramètres estimés : n − 2
    = 4,943
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(4,943/□)   (trous : √(4,943/17,5))   ← Erreur standard de β̂
    = □   (trous : 0,531)
  — tobs  [juge stat]  départ : t_obs
    = (−24/35)/□   (trous : (−24/35)/0,531)   ← Sous H₀ : β = 0
    = □   (trous : −1,29)
  — ν  [juge prob]  départ : ν
    = □   (trous : 4)   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,776)   ← Table 3, ν = 4, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    (Décision au niveau 5 % ? Ne pas rejeter H₀, car |t_obs| = 1,29 ≤ 2,776.)
    = [−2,16 ; 0,79]   ← β̂ ± 2,776·0,531 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/4, se = √(σ̂²/…) | t_obs = −1,29
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_pvalue_h0, p_accept_h0

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 5, x̄ = 3, ȳ = 9, S_xx = 10, S_xy = 15, S_yy = 26, β̂ = 1,5. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [guided]  RSS
    = 26 − □·15   (trous : 26 − 1,5·15)   ← Somme des carrés des résidus
    = □   (trous : 3,5)
  — σ̂2  [juge stat]  départ : σ̂²
    = 3,5/3   ← Deux paramètres estimés : n − 2
    = 1,167
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(1,167/□)   (trous : √(1,167/10))   ← Erreur standard de β̂
    = □   (trous : 0,342)
  — tobs  [juge stat]  départ : t_obs
    = 1,5/□   (trous : 1,5/0,342)   ← Sous H₀ : β = 0
    = □   (trous : 4,39)
  — ν  [juge prob]  départ : ν
    = □   (trous : 3)   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 3,182)   ← Table 3, ν = 3, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    (Décision au niveau 5 % ? Rejeter H₀ : β = 0, car |t_obs| = 4,39 > 3,182.)
    = [0,41 ; 2,59]   ← β̂ ± 3,182·0,342 ; 0 est hors de l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/3, se = √(σ̂²/…) | t_obs = 4,39
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_significant_large, p_ci_prob, p_pvalue_h0

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 7, x̄ = 6, ȳ = 9, S_xx = 28, S_xy = −2, S_yy = 20, β̂ = −1/14. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [guided]  RSS
    = 20 − □·(−2)   (trous : 20 − (−1/14)·(−2))   ← Somme des carrés des résidus
    = □   (trous : 19,857)
  — σ̂2  [juge stat]  départ : σ̂²
    = 19,857/5   ← Deux paramètres estimés : n − 2
    = 3,971
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(3,971/□)   (trous : √(3,971/28))   ← Erreur standard de β̂
    = □   (trous : 0,377)
  — tobs  [juge stat]  départ : t_obs
    = (−1/14)/□   (trous : (−1/14)/0,377)   ← Sous H₀ : β = 0
    = □   (trous : −0,19)
  — ν  [juge prob]  départ : ν
    = □   (trous : 5)   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,571)   ← Table 3, ν = 5, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    (Décision au niveau 5 % ? Ne pas rejeter H₀, car |t_obs| = 0,19 ≤ 2,571.)
    = [−1,04 ; 0,9]   ← β̂ ± 2,571·0,377 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/5, se = √(σ̂²/…) | t_obs = −0,19
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_pvalue_h0, p_accept_h0

```

### Niveau 2

```
Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 5, x̄ = 4, ȳ = 9, S_xx = 10, S_xy = 5, S_yy = 24, β̂ = 0,5. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [guided]  RSS
    = 24 − □·5   (trous : 24 − 0,5·5)   ← Somme des carrés des résidus
    = □   (trous : 21,5)
  — σ̂2  [juge stat]  départ : σ̂²
    = 21,5/□   (trous : 21,5/3)   ← Deux paramètres estimés : n − 2
    = 7,167
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(7,167/□)   (trous : √(7,167/10))   ← Erreur standard de β̂
    = □   (trous : 0,847)
  — tobs  [juge stat]  départ : t_obs
    = 0,5/□   (trous : 0,5/0,847)   ← Sous H₀ : β = 0
    = □   (trous : 0,59)
  — ν  [juge prob]  départ : ν
    = □   (trous : 3)   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 3,182)   ← Table 3, ν = 3, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    ? Décision au niveau 5 % ? · Rejeter H₀ : β = 0, car |t_obs| = 0,59 > 3,182 / ✔ Ne pas rejeter H₀, car |t_obs| = 0,59 ≤ 3,182
    = [−2,2 ; 3,2]   ← β̂ ± 3,182·0,847 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/3, se = √(σ̂²/…) | t_obs = 0,59
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 5, x̄ = 2, ȳ = 14, S_xx = 10, S_xy = −1, S_yy = 4, β̂ = −0,1. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [guided]  RSS
    = 4 − □·(−1)   (trous : 4 − (−0,1)·(−1))   ← Somme des carrés des résidus
    = □   (trous : 3,9)
  — σ̂2  [juge stat]  départ : σ̂²
    = 3,9/3   ← Deux paramètres estimés : n − 2
    = 1,3
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(1,3/□)   (trous : √(1,3/10))   ← Erreur standard de β̂
    = □   (trous : 0,361)
  — tobs  [juge stat]  départ : t_obs
    = (−0,1)/□   (trous : (−0,1)/0,361)   ← Sous H₀ : β = 0
    = □   (trous : −0,28)
  — ν  [juge prob]  départ : ν
    = □   (trous : 3)   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 3,182)   ← Table 3, ν = 3, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    ? Décision au niveau 5 % ? · Rejeter H₀ : β = 0, car |t_obs| = 0,28 > 3,182 / ✔ Ne pas rejeter H₀, car |t_obs| = 0,28 ≤ 3,182
    = [−1,25 ; 1,05]   ← β̂ ± 3,182·0,361 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/3, se = √(σ̂²/…) | t_obs = −0,28
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 7, x̄ = 6, ȳ = 10, S_xx = 28, S_xy = 16, S_yy = 20, β̂ = 4/7. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [guided]  RSS
    = 20 − □·16   (trous : 20 − (4/7)·16)   ← Somme des carrés des résidus
    = □   (trous : 10,857)
  — σ̂2  [juge stat]  départ : σ̂²
    = 10,857/5   ← Deux paramètres estimés : n − 2
    = 2,171
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(2,171/□)   (trous : √(2,171/28))   ← Erreur standard de β̂
    = □   (trous : 0,278)
  — tobs  [juge stat]  départ : t_obs
    = (4/7)/□   (trous : (4/7)/0,278)   ← Sous H₀ : β = 0
    = □   (trous : 2,06)
  — ν  [juge prob]  départ : ν
    = □   (trous : 5)   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = □   (trous : 2,571)   ← Table 3, ν = 5, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    ? Décision au niveau 5 % ? · Rejeter H₀ : β = 0, car |t_obs| = 2,06 > 2,571 / ✔ Ne pas rejeter H₀, car |t_obs| = 2,06 ≤ 2,571
    = [−0,14 ; 1,29]   ← β̂ ± 2,571·0,278 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/5, se = √(σ̂²/…) | t_obs = 2,05
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 3

```
Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 5, x̄ = 4, ȳ = 11, S_xx = 10, S_xy = 13, S_yy = 24, β̂ = 1,3. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [tap, suivre l'erreur, menu menu]  RSS
    = 24 − 1,3·13   ← Somme des carrés des résidus
    = 7,1
  — σ̂2  [juge stat]  départ : σ̂²
    = 7,1/3   ← Deux paramètres estimés : n − 2
    = 2,367
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(2,367/10)   ← Erreur standard de β̂
    = 0,487
  — tobs  [juge stat]  départ : t_obs
    = 1,3/0,487   ← Sous H₀ : β = 0
    = 2,67
  — ν  [juge prob]  départ : ν
    = 3   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 3,182   ← Table 3, ν = 3, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    ? Décision au niveau 5 % ? · Rejeter H₀ : β = 0, car |t_obs| = 2,67 > 3,182 / ✔ Ne pas rejeter H₀, car |t_obs| = 2,67 ≤ 3,182
    = [−0,25 ; 2,85]   ← β̂ ± 3,182·0,487 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/3, se = √(σ̂²/…) | t_obs = 2,67
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 7, x̄ = 6, ȳ = 3, S_xx = 28, S_xy = −1, S_yy = 22, β̂ = −1/28. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [tap, suivre l'erreur, menu menu]  RSS
    = 22 − (−1/28)·(−1)   ← Somme des carrés des résidus
    = 21,964
  — σ̂2  [juge stat]  départ : σ̂²
    = 21,964/5   ← Deux paramètres estimés : n − 2
    = 4,393
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(4,393/28)   ← Erreur standard de β̂
    = 0,396
  — tobs  [juge stat]  départ : t_obs
    = (−1/28)/0,396   ← Sous H₀ : β = 0
    = −0,09
  — ν  [juge prob]  départ : ν
    = 5   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 2,571   ← Table 3, ν = 5, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    ? Décision au niveau 5 % ? · Rejeter H₀ : β = 0, car |t_obs| = 0,09 > 2,571 / ✔ Ne pas rejeter H₀, car |t_obs| = 0,09 ≤ 2,571
    = [−1,05 ; 0,98]   ← β̂ ± 2,571·0,396 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/5, se = √(σ̂²/…) | t_obs = −0,09
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 5, x̄ = 5, ȳ = 7, S_xx = 10, S_xy = 8, S_yy = 16, β̂ = 0,8. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.
  [tap, suivre l'erreur, menu menu]  RSS
    = 16 − 0,8·8   ← Somme des carrés des résidus
    = 9,6
  — σ̂2  [juge stat]  départ : σ̂²
    = 9,6/3   ← Deux paramètres estimés : n − 2
    = 3,2
  — se(β̂)  [juge stat]  départ : se(β̂)
    = √(3,2/10)   ← Erreur standard de β̂
    = 0,566
  — tobs  [juge stat]  départ : t_obs
    = 0,8/0,566   ← Sous H₀ : β = 0
    = 1,41
  — ν  [juge prob]  départ : ν
    = 3   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 3,182   ← Table 3, ν = 3, colonne s₅
  — IC à 95 % pour β  [juge stat]  départ : IC(β)
    ? Décision au niveau 5 % ? · Rejeter H₀ : β = 0, car |t_obs| = 1,41 > 3,182 / ✔ Ne pas rejeter H₀, car |t_obs| = 1,41 ≤ 3,182
    = [−1 ; 2,6]   ← β̂ ± 3,182·0,566 ; 0 est dans l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/3, se = √(σ̂²/…) | t_obs = 1,41
  pièges : p_reg_sigma_n, p_df_wrong, p_pvalue_alpha_compare, p_accept_h0, p_pvalue_h0

```

### Niveau 4

```
Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 7, x̄ = 4, ȳ = 8, S_xx = 28, S_xy = 9, S_yy = 24, β̂ = 9/28, α̂ = 47/7. Teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour α.
  [free, suivre l'erreur]  RSS
    = 24 − (9/28)·9   ← Somme des carrés des résidus
    = 21,107
  — σ̂2  [juge stat]  départ : σ̂²
    = 21,107/5   ← Deux paramètres estimés : n − 2
    = 4,221
  — se(α̂)  [juge stat]  départ : se(α̂)
    = √(4,221·(1/7 + 4²/28))   ← Erreur standard de α̂
    = 1,736
  — tobs  [juge stat]  départ : t_obs
    = (47/7)/1,736   ← Sous H₀ : α = 0
    = 3,87
  — ν  [juge prob]  départ : ν
    = 5   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 2,571   ← Table 3, ν = 5, colonne s₅
  — IC à 95 % pour α  [juge stat]  départ : IC(α)
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : α = 0, car |t_obs| = 3,87 > 2,571 / · Ne pas rejeter H₀, car |t_obs| = 3,87 ≤ 2,571
    = [2,25 ; 11,18]   ← α̂ ± 2,571·1,736 ; 0 est hors de l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/5, se = √(σ̂²/…) | t_obs = 3,87
  pièges : p_reg_sigma_n, p_reg_se_alpha, p_df_wrong, p_pvalue_alpha_compare, p_ci_prob, p_significant_large, p_pvalue_h0

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 6, x̄ = 2,5, ȳ = 12, S_xx = 17,5, S_xy = 1, S_yy = 28, β̂ = 2/35, α̂ = 83/7. Teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour α.
  [free, suivre l'erreur]  RSS
    = 28 − (2/35)·1   ← Somme des carrés des résidus
    = 27,943
  — σ̂2  [juge stat]  départ : σ̂²
    = 27,943/4   ← Deux paramètres estimés : n − 2
    = 6,986
  — se(α̂)  [juge stat]  départ : se(α̂)
    = √(6,986·(1/6 + 2,5²/17,5))   ← Erreur standard de α̂
    = 1,913
  — tobs  [juge stat]  départ : t_obs
    = (83/7)/1,913   ← Sous H₀ : α = 0
    = 6,2
  — ν  [juge prob]  départ : ν
    = 4   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 2,776   ← Table 3, ν = 4, colonne s₅
  — IC à 95 % pour α  [juge stat]  départ : IC(α)
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : α = 0, car |t_obs| = 6,2 > 2,776 / · Ne pas rejeter H₀, car |t_obs| = 6,2 ≤ 2,776
    = [6,55 ; 17,17]   ← α̂ ± 2,776·1,913 ; 0 est hors de l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/4, se = √(σ̂²/…) | t_obs = 6,2
  pièges : p_reg_sigma_n, p_reg_se_alpha, p_df_wrong, p_pvalue_alpha_compare, p_pvalue_h0, p_ci_prob, p_significant_large

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 7, x̄ = 6, ȳ = 13, S_xx = 28, S_xy = 1, S_yy = 18, β̂ = 1/28, α̂ = 179/14. Teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour α.
  [free, suivre l'erreur]  RSS
    = 18 − (1/28)·1   ← Somme des carrés des résidus
    = 17,964
  — σ̂2  [juge stat]  départ : σ̂²
    = 17,964/5   ← Deux paramètres estimés : n − 2
    = 3,593
  — se(α̂)  [juge stat]  départ : se(α̂)
    = √(3,593·(1/7 + 6²/28))   ← Erreur standard de α̂
    = 2,266
  — tobs  [juge stat]  départ : t_obs
    = (179/14)/2,266   ← Sous H₀ : α = 0
    = 5,64
  — ν  [juge prob]  départ : ν
    = 5   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 2,571   ← Table 3, ν = 5, colonne s₅
  — IC à 95 % pour α  [juge stat]  départ : IC(α)
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : α = 0, car |t_obs| = 5,64 > 2,571 / · Ne pas rejeter H₀, car |t_obs| = 5,64 ≤ 2,571
    = [6,96 ; 18,61]   ← α̂ ± 2,571·2,266 ; 0 est hors de l'IC
  aides : σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2). | σ̂² = RSS/5, se = √(σ̂²/…) | t_obs = 5,64
  pièges : p_reg_sigma_n, p_reg_se_alpha, p_df_wrong, p_pvalue_alpha_compare, p_significant_large, p_ci_prob, p_pvalue_h0

```

### Niveau 5

```
Un ressort s'allonge sous des masses x (en kg) ; y est l'allongement (en mm). Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Données : x : 0, 1, 2, 3, 4, 5 ; y : 11, 9, 14, 15, 13, 10 ; résumés : n = 6, x̄ = 2,5, ȳ = 12, S_xx = 17,5, S_xy = 4, S_yy = 28. Calcule α̂ et β̂, puis teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 % (l'élongation est-elle proportionnelle à la masse ?).
  [free, sans aide]  β̂
    = (4)/(17,5)   ← S_xy/S_xx
    = 0,229
  — α̂  [juge stat]  départ : α̂
    = 12 − 0,229·2,5
    = 11,43
  — RSS  [juge stat]  départ : RSS
    = 28 − 0,229·4   ← Somme des carrés des résidus
    = 27,084
  — σ̂2  [juge stat]  départ : σ̂²
    = 27,084/4   ← Deux paramètres estimés : n − 2
    = 6,771
  — se(α̂)  [juge stat]  départ : se(α̂)
    = √(6,771·(1/6 + 2,5²/17,5))   ← Erreur standard de α̂
    = 1,883
  — tobs  [juge stat]  départ : t_obs
    = 11,43/1,883   ← Sous H₀ : α = 0
    = 6,07
  — ν  [juge prob]  départ : ν
    = 4   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 2,776   ← Table 3, ν = 4, colonne s₅
  — IC à 95 % pour α  [juge stat]  départ : IC(α)
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : α = 0, car |t_obs| = 6,07 > 2,776 / · Ne pas rejeter H₀, car |t_obs| = 6,07 ≤ 2,776
    = [6,2 ; 16,66]   ← α̂ ± 2,776·1,883 ; 0 est hors de l'IC
  pièges : p_reg_sigma_n, p_reg_se_alpha, p_df_wrong, p_pvalue_alpha_compare, p_pvalue_h0, p_ci_prob, p_significant_large

Un ressort s'allonge sous des masses x (en kg) ; y est l'allongement (en mm). Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Données : x : 0, 1, 2, 3, 4 ; y : 9, 9, 12, 9, 11 ; résumés : n = 5, x̄ = 2, ȳ = 10, S_xx = 10, S_xy = 4, S_yy = 8. Calcule α̂ et β̂, puis teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 % (l'élongation est-elle proportionnelle à la masse ?).
  [free, sans aide]  β̂
    = (4)/(10)   ← S_xy/S_xx
    = 0,4
  — α̂  [juge stat]  départ : α̂
    = 10 − 0,4·2
    = 9,2
  — RSS  [juge stat]  départ : RSS
    = 8 − 0,4·4   ← Somme des carrés des résidus
    = 6,4
  — σ̂2  [juge stat]  départ : σ̂²
    = 6,4/3   ← Deux paramètres estimés : n − 2
    = 2,133
  — se(α̂)  [juge stat]  départ : se(α̂)
    = √(2,133·(1/5 + 2²/10))   ← Erreur standard de α̂
    = 1,131
  — tobs  [juge stat]  départ : t_obs
    = 9,2/1,131   ← Sous H₀ : α = 0
    = 8,13
  — ν  [juge prob]  départ : ν
    = 3   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 3,182   ← Table 3, ν = 3, colonne s₅
  — IC à 95 % pour α  [juge stat]  départ : IC(α)
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : α = 0, car |t_obs| = 8,13 > 3,182 / · Ne pas rejeter H₀, car |t_obs| = 8,13 ≤ 3,182
    = [5,6 ; 12,8]   ← α̂ ± 3,182·1,131 ; 0 est hors de l'IC
  pièges : p_reg_sigma_n, p_reg_se_alpha, p_df_wrong, p_pvalue_alpha_compare, p_pvalue_h0, p_ci_prob, p_significant_large

Un ressort s'allonge sous des masses x (en kg) ; y est l'allongement (en mm). Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Données : x : 2, 3, 4, 5, 6, 7, 8 ; y : 10, 10, 14, 9, 14, 9, 11 ; résumés : n = 7, x̄ = 5, ȳ = 11, S_xx = 28, S_xy = 1, S_yy = 28. Calcule α̂ et β̂, puis teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 % (l'élongation est-elle proportionnelle à la masse ?).
  [free, sans aide]  β̂
    = (1)/(28)   ← S_xy/S_xx
    = 0,036
  — α̂  [juge stat]  départ : α̂
    = 11 − 0,036·5
    = 10,82
  — RSS  [juge stat]  départ : RSS
    = 28 − 0,036·1   ← Somme des carrés des résidus
    = 27,964
  — σ̂2  [juge stat]  départ : σ̂²
    = 27,964/5   ← Deux paramètres estimés : n − 2
    = 5,593
  — se(α̂)  [juge stat]  départ : se(α̂)
    = √(5,593·(1/7 + 5²/28))   ← Erreur standard de α̂
    = 2,407
  — tobs  [juge stat]  départ : t_obs
    = 10,82/2,407   ← Sous H₀ : α = 0
    = 4,5
  — ν  [juge prob]  départ : ν
    = 5   ← ν = n − 2
  — tc  [juge stat]  départ : t_c
    = 2,571   ← Table 3, ν = 5, colonne s₅
  — IC à 95 % pour α  [juge stat]  départ : IC(α)
    ? Décision au niveau 5 % ? ✔ Rejeter H₀ : α = 0, car |t_obs| = 4,5 > 2,571 / · Ne pas rejeter H₀, car |t_obs| = 4,5 ≤ 2,571
    = [4,63 ; 17,01]   ← α̂ ± 2,571·2,407 ; 0 est hors de l'IC
  pièges : p_reg_sigma_n, p_reg_se_alpha, p_df_wrong, p_pvalue_alpha_compare, p_ci_prob, p_pvalue_h0, p_significant_large

```

### Variantes d'examen

```
Régression simple sur n = 6 points ; somme des carrés des résidus RSS = 172/7. Quelle est l'estimation σ̂² de la variance des erreurs ?
  ✔ 43/7   · 86/21 [p_reg_sigma_n]   · 172/7   · 172/35 [p_reg_sigma_n]
  [examen mcq]
  pièges : p_reg_sigma_n

Vrai ou faux ?
  « En régression simple sur n = 5 points avec RSS = 2,4, on estime σ² par RSS/n = 0,48. » → FAUX
    contre-exemple (refute) : s = 4/5
  [examen tf]
  pièges : p_reg_sigma_n

Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : n = 5, x̄ = 3, ȳ = 12, S_xx = 10, S_xy = −12, S_yy = 24, β̂ = −1,2, α̂ = 15,6. Teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour α. Donne t_obs (à 0,01 près).
  [free, sans aide, examen coef]  t_obs
    = 15,6/1,876   ← Sous H₀ : α = 0
    = 8,32

Un ressort s'allonge sous des masses x (en kg) ; y est l'allongement (en mm). Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Données : x : 3, 4, 5, 6, 7, 8 ; y : 17, 17, 11, 11, 16, 12 ; résumés : n = 6, x̄ = 5,5, ȳ = 14, S_xx = 17,5, S_xy = −14, S_yy = 44. Calcule α̂ et β̂, puis teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 % (l'élongation est-elle proportionnelle à la masse ?).
  [problème, examen open, 10 points]
  partie 1 (Un ressort s'allonge sous des masses x (en kg) ; y est l'allongement (en mm). Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Données : x : 3, 4, 5, 6, 7, 8 ; y : 17, 17, 11, 11, 16, 12 ; résumés : n = 6, x̄ = 5,5, ȳ = 14, S_xx = 17,5, S_xy = −14, S_yy = 44. Calcule α̂ et β̂, puis teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 % (l'élongation est-elle proportionnelle à la masse ?). : 1 ; α̂ : 1 ; RSS : 1 ; σ̂2 : 1 ; se(α̂) : 1 ; tobs : 1 ; ν : 1 ; tc : 1 ; IC à 95 % pour α : 1)
  Un ressort s'allonge sous des masses x (en kg) ; y est l'allongement (en mm). Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Données : x : 3, 4, 5, 6, 7, 8 ; y : 17, 17, 11, 11, 16, 12 ; résumés : n = 6, x̄ = 5,5, ȳ = 14, S_xx = 17,5, S_xy = −14, S_yy = 44. Calcule α̂ et β̂, puis teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 % (l'élongation est-elle proportionnelle à la masse ?).
    [free, sans aide, suivre l'erreur, examen open]  β̂
      = (−14)/(17,5)   ← S_xy/S_xx
      = −0,8
    — α̂  [juge stat]  départ : α̂
      = 14 − (−0,8)·5,5
      = 18,4
    — RSS  [juge stat]  départ : RSS
      = 44 − (−0,8)·(−14)   ← Somme des carrés des résidus
      = 32,8
    — σ̂2  [juge stat]  départ : σ̂²
      = 32,8/4   ← Deux paramètres estimés : n − 2
      = 8,2
    — se(α̂)  [juge stat]  départ : se(α̂)
      = √(8,2·(1/6 + 5,5²/17,5))   ← Erreur standard de α̂
      = 3,942
    — tobs  [juge stat]  départ : t_obs
      = 18,4/3,942   ← Sous H₀ : α = 0
      = 4,67
    — ν  [juge prob]  départ : ν
      = 4   ← ν = n − 2
    — tc  [juge stat]  départ : t_c
      = 2,776   ← Table 3, ν = 4, colonne s₅
    — IC à 95 % pour α  [juge stat]  départ : IC(α)
      = [7,46 ; 29,34]   ← α̂ ± 2,776·3,942 ; 0 est hors de l'IC
  partie 2 (Interpréter : 1)
  Interpréter : quelle phrase est juste ?
    ✔ Au niveau 5 %, les données demandent une ordonnée à l'origine non nulle.   · α est dans l'IC avec probabilité 0,95. [p_ci_prob]   · La probabilité que α = 0 est inférieure à 5 %. [p_pvalue_h0]   · Le lien est fort et important en pratique, puisque le test rejette. [p_significant_large]
    [examen open]
  pièges : p_reg_sigma_n, p_reg_se_alpha, p_df_wrong, p_pvalue_alpha_compare, p_significant_large, p_ci_prob, p_pvalue_h0

```

## Régression multiple, matrice de design, test F emboîté (`p-reg-multi`, BA3)

_Y = Xβ + ε ; équations normales XᵀXβ̂ = Xᵀy, β̂ = (XᵀX)⁻¹Xᵀy si les colonnes de X sont indépendantes ; S² = ‖y − Xβ̂‖²/(n − p)._

### Niveau 1

```
Le poids y d'un chien dépend de sa taille x, avec une ordonnée propre à chacune de deux races T et H, et la même pente pour les deux races. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  ✔ colonnes [1T, 1H, x]   · colonnes [1, x]   · colonnes [1, 1T, 1H, x] [p_design_collinear]   · colonnes [1T, 1H, x·1T, x·1H] [p_design_separate_slopes]
  pièges : p_design_collinear, p_design_separate_slopes

Le rendement y d'une culture dépend de la dose d'engrais x, avec un effet propre à chacun de deux sols A et B, et la même pente pour les deux sols. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  ✔ colonnes [1, 1B, x]   · colonnes [1, 1B, x, x·1B] [p_design_separate_slopes]   · colonnes [1A, 1B]   · colonnes [1, 1A, 1B, x] [p_design_collinear]
  pièges : p_design_collinear, p_design_separate_slopes

Le poids y d'un chien dépend de sa taille x, avec une ordonnée propre à chacune de deux races T et H, et la même pente pour les deux races. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  ✔ colonnes [1T, 1H, x]   · colonnes [1T, 1H, x·1T, x·1H] [p_design_separate_slopes]   · colonnes [1, 1T, 1H, x] [p_design_collinear]   · colonnes [1, x]
  pièges : p_design_collinear, p_design_separate_slopes

```

### Niveau 2

```
Le prix y d'un appartement dépend de sa surface x, avec une ordonnée propre à chacun de deux quartiers N et S, et une pente commune. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  ✔ colonnes [1, 1S, x]   · colonnes [1, x]   · colonnes [1N, 1S, x·1N, x·1S] [p_design_separate_slopes]   · colonnes [1, 1N, 1S, x] [p_design_collinear]
  pièges : p_design_collinear, p_design_separate_slopes

Le rendement y d'une culture dépend de la dose d'engrais x, avec un effet propre à chacun de deux sols A et B, et la même pente pour les deux sols. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  · colonnes [1A, 1B]   ✔ colonnes [1, 1B, x]   · colonnes [1, 1B, x, x·1B] [p_design_separate_slopes]   · colonnes [1, 1A, 1B, x] [p_design_collinear]
  pièges : p_design_collinear, p_design_separate_slopes

Le rendement y d'une culture dépend de la dose d'engrais x, avec un effet propre à chacun de deux sols A et B, et la même pente pour les deux sols. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  · colonnes [1, 1A, 1B, x] [p_design_collinear]   ✔ colonnes [1, 1B, x]   · colonnes [1, 1B, x, x·1B] [p_design_separate_slopes]   · colonnes [1A, 1B]
  pièges : p_design_collinear, p_design_separate_slopes

```

### Niveau 3

```
Modèle y = a + bx, données x : 1, 2, 3, 4 ; y : 6, 7, 11, 8. Avec X = [1, x] : XᵀX = [[4, 10], [10, 30]] et Xᵀy = (32 ; 85). Résous les équations normales XᵀXβ̂ = Xᵀy.
  [tap, suivre l'erreur, menu menu]  det(XᵀX)
    = 4·30 − 10²   ← n·Σx² − (Σx)²
    = 20
  — b̂  [juge prob]  départ : b̂
    = (4·85 − 10·32)/20   ← Deuxième ligne de (XᵀX)⁻¹Xᵀy
    = 1
  — â  [juge prob]  départ : â
    = (30·32 − 10·85)/20   ← Première ligne
    = 5,5
  aides : (XᵀX)⁻¹ = (1/det)·[[Σx², −Σx], [−Σx, n]] ; β̂ = (XᵀX)⁻¹Xᵀy. | det = 4·30 − 10² = □ | b̂ = 1, â = 5,5

Modèle y = a + bx, données x : 3, 4, 5, 6, 7 ; y : 14, 13, 9, 9, 15. Avec X = [1, x] : XᵀX = [[5, 25], [25, 135]] et Xᵀy = (60 ; 298). Résous les équations normales XᵀXβ̂ = Xᵀy.
  [tap, suivre l'erreur, menu menu]  det(XᵀX)
    = 5·135 − 25²   ← n·Σx² − (Σx)²
    = 50
  — b̂  [juge prob]  départ : b̂
    = (5·298 − 25·60)/50   ← Deuxième ligne de (XᵀX)⁻¹Xᵀy
    = −0,2
  — â  [juge prob]  départ : â
    = (135·60 − 25·298)/50   ← Première ligne
    = 13
  aides : (XᵀX)⁻¹ = (1/det)·[[Σx², −Σx], [−Σx, n]] ; β̂ = (XᵀX)⁻¹Xᵀy. | det = 5·135 − 25² = □ | b̂ = −0,2, â = 13

Modèle y = a + bx, données x : 3, 4, 5, 6 ; y : 5, 4, 9, 10. Avec X = [1, x] : XᵀX = [[4, 18], [18, 86]] et Xᵀy = (28 ; 136). Résous les équations normales XᵀXβ̂ = Xᵀy.
  [tap, suivre l'erreur, menu menu]  det(XᵀX)
    = 4·86 − 18²   ← n·Σx² − (Σx)²
    = 20
  — b̂  [juge prob]  départ : b̂
    = (4·136 − 18·28)/20   ← Deuxième ligne de (XᵀX)⁻¹Xᵀy
    = 2
  — â  [juge prob]  départ : â
    = (86·28 − 18·136)/20   ← Première ligne
    = −2
  aides : (XᵀX)⁻¹ = (1/det)·[[Σx², −Σx], [−Σx, n]] ; β̂ = (XᵀX)⁻¹Xᵀy. | det = 4·86 − 18² = □ | b̂ = 2, â = −2

```

### Niveau 4

```
n = 24 observations. Modèle complet à p = 4 colonnes : SC_p = 20 ; modèle réduit à q = 2 colonnes : SC_q = 36. Test F emboîté au niveau 5 % (H₀ : les 2 coefficients ajoutés sont nuls). Quantile donné : F_{2, 20 ; 0,95} = 3,49.
  [free, suivre l'erreur]  ν_1
    = 4 − 2   ← Paramètres ajoutés
    = 2
  — ν₂  [juge prob]  départ : ν_2
    = 24 − 4   ← Résidus du modèle complet
    = 20
  — F  [juge stat]  départ : F
    = ((36 − 20)/2)/(20/20)   ← Gain par paramètre ajouté, sur la variance résiduelle
    = 8÷1   ← Numérateur et dénominateur
    = 8   ← Comparer à 3,49
  aides : Numérateur : gain de SC par paramètre ajouté ; dénominateur : SC du modèle complet par degré de liberté. | F = (16/2)/(20/□) | F = 8
  pièges : p_f_df_swap, p_f_ratio_inverted, p_pvalue_h0

n = 20 observations. Modèle complet à p = 3 colonnes : SC_p = 34 ; modèle réduit à q = 2 colonnes : SC_q = 48. Test F emboîté au niveau 5 % (H₀ : les 1 coefficients ajoutés sont nuls). Quantile donné : F_{1, 17 ; 0,95} = 4,45.
  [free, suivre l'erreur]  ν_1
    = 3 − 2   ← Paramètres ajoutés
    = 1
  — ν₂  [juge prob]  départ : ν_2
    = 20 − 3   ← Résidus du modèle complet
    = 17
  — F  [juge stat]  départ : F
    = ((48 − 34)/1)/(34/17)   ← Gain par paramètre ajouté, sur la variance résiduelle
    = 14÷2   ← Numérateur et dénominateur
    = 7   ← Comparer à 4,45
  aides : Numérateur : gain de SC par paramètre ajouté ; dénominateur : SC du modèle complet par degré de liberté. | F = (14/1)/(34/□) | F = 7
  pièges : p_f_df_swap, p_f_ratio_inverted, p_pvalue_h0

n = 16 observations. Modèle complet à p = 4 colonnes : SC_p = 12 ; modèle réduit à q = 1 colonne : SC_q = 15. Test F emboîté au niveau 5 % (H₀ : les 3 coefficients ajoutés sont nuls). Quantile donné : F_{3, 12 ; 0,95} = 3,49.
  [free, suivre l'erreur]  ν_1
    = 4 − 1   ← Paramètres ajoutés
    = 3
  — ν₂  [juge prob]  départ : ν_2
    = 16 − 4   ← Résidus du modèle complet
    = 12
  — F  [juge stat]  départ : F
    = ((15 − 12)/3)/(12/12)   ← Gain par paramètre ajouté, sur la variance résiduelle
    = 1÷1   ← Numérateur et dénominateur
    = 1   ← Comparer à 3,49
  aides : Numérateur : gain de SC par paramètre ajouté ; dénominateur : SC du modèle complet par degré de liberté. | F = (3/3)/(12/□) | F = 1
  pièges : p_f_df_swap, p_f_ratio_inverted, p_pvalue_h0, p_accept_h0

```

### Niveau 5

```
n = 16 observations. Modèle complet à p = 4 colonnes : SC_p = 24 ; modèle réduit à q = 3 colonnes : SC_q = 29. Test F emboîté au niveau 5 % (H₀ : les 1 coefficients ajoutés sont nuls). Quantile donné : F_{1, 12 ; 0,95} = 4,75.
  [free, sans aide]  ν_1
    = 4 − 3   ← Paramètres ajoutés
    = 1
  — ν₂  [juge prob]  départ : ν_2
    = 16 − 4   ← Résidus du modèle complet
    = 12
  — F  [juge stat]  départ : F
    = ((29 − 24)/1)/(24/12)   ← Gain par paramètre ajouté, sur la variance résiduelle
    = 5÷2   ← Numérateur et dénominateur
    = 2,5   ← Comparer à 4,75
  pièges : p_f_df_swap, p_f_ratio_inverted, p_accept_h0, p_pvalue_h0

Le poids y d'un chien dépend de sa taille x, avec une ordonnée propre à chacune de deux races T et H, et la même pente pour les deux races. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  · colonnes [1T, 1H, x·1T, x·1H] [p_design_separate_slopes]   ✔ colonnes [1T, 1H, x]   · colonnes [1, x]   · colonnes [1, 1T, 1H, x] [p_design_collinear]
  pièges : p_design_collinear, p_design_separate_slopes

Le prix y d'un appartement dépend de sa surface x, avec une ordonnée propre à chacun de deux quartiers N et S, et une pente commune. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  · colonnes [1N, 1S, x·1N, x·1S] [p_design_separate_slopes]   · colonnes [1, x]   · colonnes [1, 1N, 1S, x] [p_design_collinear]   ✔ colonnes [1, 1S, x]
  pièges : p_design_collinear, p_design_separate_slopes

```

### Variantes d'examen

```
Le prix y d'un appartement dépend de sa surface x, avec une ordonnée propre à chacun de deux quartiers N et S, et une pente commune. Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?
  · colonnes [1, 1N, 1S, x] [p_design_collinear]   · colonnes [1, x]   ✔ colonnes [1, 1S, x]   · colonnes [1N, 1S, x·1N, x·1S] [p_design_separate_slopes]
  [examen mcq]
  pièges : p_design_collinear, p_design_separate_slopes

Vrai ou faux ?
  « Pour le modèle y = a + bx, la matrice XᵀX (X = [1, x]) est toujours inversible. » → FAUX
    contre-exemple (refute) : a = 1, b = 1
  [examen tf]

n = 16 observations. Modèle complet à p = 3 colonnes : SC_p = 26 ; modèle réduit à q = 1 colonne : SC_q = 31. Test F emboîté au niveau 5 % (H₀ : les 2 coefficients ajoutés sont nuls). Quantile donné : F_{2, 13 ; 0,95} = 3,81. Calcule F (à 0,01 près).
  [free, sans aide, examen coef]  F
    = ((31 − 26)/2)/(26/13)   ← Gain par paramètre ajouté, sur la variance résiduelle
    = 2,5÷2   ← Numérateur et dénominateur
    = 1,25   ← Comparer à 3,81
  pièges : p_f_ratio_inverted

```

## Diagnostics d'une régression (`p-reg-diag`, BA3)

_Les hypothèses se vérifient sur les résidus : linéarité (pas de courbure dans résidus contre ŷ), variance constante (pas…_

### Niveau 1

```
Graphique d'une régression linéaire :résidus en fonction de ŷŷrésidusQuel défaut ce graphique montre-t-il ?
  · des résidus liés dans l'ordre (autocorrélation)   ✔ une courbure (relation non linéaire)   · un entonnoir (variance qui grandit)

Graphique d'une régression linéaire :résidus en fonction de ŷŷrésidusQuel défaut ce graphique montre-t-il ?
  ✔ aucun défaut visible   · un entonnoir (variance qui grandit)   · des résidus liés dans l'ordre (autocorrélation)

Graphique d'une régression linéaire :résidus en fonction de ŷŷrésidusQuel défaut ce graphique montre-t-il ?
  ✔ une valeur aberrante   · aucun défaut visible   · un entonnoir (variance qui grandit)

```

### Niveau 2

```
Graphique d'une régression linéaire :QQ-plot des résidusquantiles de N(0, 1)résidus réduitsQuel défaut ce graphique montre-t-il ?
  · des résidus liés dans l'ordre (autocorrélation)   · aucun défaut visible   · une valeur aberrante   · une courbure (relation non linéaire)   ✔ des queues lourdes (QQ-plot en S)

Graphique d'une régression linéaire :résidus en fonction de ŷŷrésidusQuel défaut ce graphique montre-t-il ?
  · aucun défaut visible   ✔ une valeur aberrante   · des queues lourdes (QQ-plot en S)   · une courbure (relation non linéaire)   · des résidus liés dans l'ordre (autocorrélation)

Graphique d'une régression linéaire :résidus en fonction de ŷŷrésidusQuel défaut ce graphique montre-t-il ?
  · des queues lourdes (QQ-plot en S)   · un entonnoir (variance qui grandit)   · une courbure (relation non linéaire)   ✔ aucun défaut visible   · une valeur aberrante

```

### Niveau 3

```
Deux graphiques d'une régression linéaire :résidus en fonction de ŷŷrésidusQQ-plot des résidusquantiles de N(0, 1)résidus réduitsQuelle hypothèse est violée ?
  ✔ La normalité des erreurs   · L'absence de points aberrants   · La linéarité   · La variance constante (homoscédasticité)

Deux graphiques d'une régression linéaire :résidus en fonction de ŷŷrésidusQQ-plot des résidusquantiles de N(0, 1)résidus réduitsQuelle hypothèse est violée ?
  · L'absence de points aberrants   · La linéarité   · La normalité des erreurs   ✔ La variance constante (homoscédasticité)

Deux graphiques d'une régression linéaire :résidus en fonction de ŷŷrésidusQQ-plot des résidusquantiles de N(0, 1)résidus réduitsQuelle hypothèse est violée ?
  ✔ Aucune : les deux graphiques sont sans défaut   · L'absence de points aberrants   · La linéarité   · La normalité des erreurs

```

### Niveau 4

```
Régression linéaire, R² = 0,97. Graphique :résidus en fonction de ŷŷrésidusQue faut-il faire ?
  ✔ Transformer y (par exemple log y)   · Garder le modèle tel quel : R² = 0,97 montre qu'il est adapté [p_r2_high_good]   · Supprimer le point qui s'écarte le plus, puis refaire l'ajustement [p_outlier_delete]   · Tester la normalité de y plutôt que celle des résidus [p_diag_normal_y]
  pièges : p_diag_normal_y, p_r2_high_good, p_outlier_delete

Régression linéaire, R² = 0,97. Graphique :résidus en fonction de ŷŷrésidusQue faut-il faire ?
  · Garder le modèle tel quel : R² = 0,97 montre qu'il est adapté [p_r2_high_good]   · Supprimer le point qui s'écarte le plus, puis refaire l'ajustement [p_outlier_delete]   · Tester la normalité de y plutôt que celle des résidus [p_diag_normal_y]   ✔ Vérifier la mesure de ce point ; ne le retirer que si c'est une erreur, et comparer les deux ajustements
  pièges : p_diag_normal_y, p_r2_high_good, p_outlier_delete

Régression linéaire, R² = 0,91. Graphique :résidus en fonction de ŷŷrésidusQue faut-il faire ?
  · Tester la normalité de y plutôt que celle des résidus [p_diag_normal_y]   ✔ Vérifier la mesure de ce point ; ne le retirer que si c'est une erreur, et comparer les deux ajustements   · Garder le modèle tel quel : R² = 0,91 montre qu'il est adapté [p_r2_high_good]   · Supprimer le point qui s'écarte le plus, puis refaire l'ajustement [p_outlier_delete]
  pièges : p_diag_normal_y, p_r2_high_good, p_outlier_delete

```

### Niveau 5

```
Régression linéaire, R² = 0,93. Graphique :résidus en fonction de ŷŷrésidusQuel diagnostic et quel remède ?
  · Tester la normalité de y plutôt que celle des résidus [p_diag_normal_y]   · Supprimer le point qui s'écarte le plus, puis refaire l'ajustement [p_outlier_delete]   ✔ Hypothèse violée : la variance constante (homoscédasticité). Remède : transformer y (par exemple log y).   · Garder le modèle tel quel : R² = 0,93 montre qu'il est adapté [p_r2_high_good]
  pièges : p_diag_normal_y, p_r2_high_good, p_outlier_delete

Régression linéaire, R² = 0,93. Graphique :QQ-plot des résidusquantiles de N(0, 1)résidus réduitsQuel diagnostic et quel remède ?
  · Garder le modèle tel quel : R² = 0,93 montre qu'il est adapté [p_r2_high_good]   · Vérifier la normalité sur un QQ-plot des valeurs de y, plutôt que des résidus [p_diag_normal_y]   · Supprimer le point qui s'écarte le plus, puis refaire l'ajustement [p_outlier_delete]   ✔ Hypothèse violée : la normalité des erreurs. Remède : ne pas se fier aux tests t ; utiliser plus de données ou une méthode robuste.
  pièges : p_diag_normal_y, p_r2_high_good, p_outlier_delete

Régression linéaire, R² = 0,93. Graphique :résidus en fonction de ŷŷrésidusQuel diagnostic et quel remède ?
  · Tester la normalité de y plutôt que celle des résidus [p_diag_normal_y]   · Garder le modèle tel quel : R² = 0,93 montre qu'il est adapté [p_r2_high_good]   · Supprimer le point qui s'écarte le plus, puis refaire l'ajustement [p_outlier_delete]   ✔ Hypothèse violée : la linéarité. Remède : ajouter un terme en x² (modèle quadratique).
  pièges : p_diag_normal_y, p_r2_high_good, p_outlier_delete

```

### Variantes d'examen

```
Graphique d'une régression linéaire :résidus en fonction de ŷŷrésidusQuel défaut ce graphique montre-t-il ?
  · un entonnoir (variance qui grandit)   ✔ aucun défaut visible   · des résidus liés dans l'ordre (autocorrélation)   · une courbure (relation non linéaire)   · des queues lourdes (QQ-plot en S)
  [examen mcq]

Vrai ou faux ?
  « Des résidus en forme d'entonnoir (écart qui grandit avec ŷ) signalent une variance non constante. » → VRAI
  [examen tf]

```

## Modèle Beta-Bernoulli : a posteriori, PM, MAP (`p-bayes-beta`, BA4)

_A priori θ ~ Beta(α, β) (uniforme = Beta(1, 1)) ; N succès en n essais de Bernoulli ; a posteriori θ | données ~ Beta(α + N, β + n − N)._

### Niveau 1

```
Une pièce donne 11 piles sur 11 lancers. A priori, la probabilité de succès θ suit une loi Beta(4, 5) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [guided]  α′
    (Quelle famille pour la loi a posteriori ? Beta : la loi Beta est conjuguée au modèle de Bernoulli.)
    = 4 + □   (trous : 4 + 11)   ← α′ = α + N (succès)
    = □   (trous : 15)
  — β′  [juge prob]  départ : β′
    = 5 + □   (trous : 5 + 11 − 11)   ← β′ = β + n − N (échecs)
    = □   (trous : 5)
  — PM  [juge prob]  départ : PM
    = 15/(15 + 5)   ← Moyenne d'une Beta(α′, β′)
    = 15/20
    = 3/4
  — MAP  [juge prob]  départ : MAP
    = (□)/(15 + 5 − 2)   (trous : (15 − 1)/(15 + 5 − 2))   ← Mode d'une Beta
    = 14/18
    = 7/9
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(4 + 11, 5 + □) | Beta(15, 5), PM = 0,75, MAP = 7/9
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Une pièce donne 0 piles sur 17 lancers. A priori, la probabilité de succès θ suit une loi Beta(4, 3) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [guided]  α′
    (Quelle famille pour la loi a posteriori ? Beta : la loi Beta est conjuguée au modèle de Bernoulli.)
    = 4 + □   (trous : 4 + 0)   ← α′ = α + N (succès)
    = □   (trous : 4)
  — β′  [juge prob]  départ : β′
    = 3 + □   (trous : 3 + 17 − 0)   ← β′ = β + n − N (échecs)
    = □   (trous : 20)
  — PM  [juge prob]  départ : PM
    = 4/(4 + □)   (trous : 4/(4 + 20))   ← Moyenne d'une Beta(α′, β′)
    = 4/24
    = 1/6
  — MAP  [juge prob]  départ : MAP
    = (□)/(4 + 20 − 2)   (trous : (4 − 1)/(4 + 20 − 2))   ← Mode d'une Beta
    = 3/22
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(4 + 0, 3 + □) | Beta(4, 20), PM = 1/6, MAP = 3/22
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Un joueur de basket réussit 16 tirs sur 19. A priori, la probabilité de succès θ suit une loi Beta(4, 3) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [guided]  α′
    (Quelle famille pour la loi a posteriori ? Beta : la loi Beta est conjuguée au modèle de Bernoulli.)
    = 4 + □   (trous : 4 + 16)   ← α′ = α + N (succès)
    = □   (trous : 20)
  — β′  [juge prob]  départ : β′
    = 3 + □   (trous : 3 + 19 − 16)   ← β′ = β + n − N (échecs)
    = □   (trous : 6)
  — PM  [juge prob]  départ : PM
    = 20/(20 + □)   (trous : 20/(20 + 6))   ← Moyenne d'une Beta(α′, β′)
    = 20/26
    = 10/13
  — MAP  [juge prob]  départ : MAP
    = (□)/(20 + 6 − 2)   (trous : (20 − 1)/(20 + 6 − 2))   ← Mode d'une Beta
    = 19/24
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(4 + 16, 3 + □) | Beta(20, 6), PM = 10/13, MAP = 19/24
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

```

### Niveau 2

```
Un joueur de basket réussit 12 tirs sur 20. A priori, la probabilité de succès θ suit une loi Beta(4, 5) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [guided]  α′
    ? Quelle famille pour la loi a posteriori ? ✔ Beta : la loi Beta est conjuguée au modèle de Bernoulli / · Binomiale, comme les données
    = 4 + □   (trous : 4 + 12)   ← α′ = α + N (succès)
    = □   (trous : 16)
  — β′  [juge prob]  départ : β′
    = 5 + □   (trous : 5 + 20 − 12)   ← β′ = β + n − N (échecs)
    = □   (trous : 13)
  — PM  [juge prob]  départ : PM
    = 16/(16 + □)   (trous : 16/(16 + 13))   ← Moyenne d'une Beta(α′, β′)
    = 16/29
  — MAP  [juge prob]  départ : MAP
    = (□)/(16 + 13 − 2)   (trous : (16 − 1)/(16 + 13 − 2))   ← Mode d'une Beta
    = 15/27
    = 5/9
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(4 + 12, 5 + □) | Beta(16, 13), PM = 16/29, MAP = 5/9
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Une pièce donne 0 piles sur 2 lancers. A priori, la probabilité de succès θ suit une loi Beta(3, 3) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [guided]  α′
    ? Quelle famille pour la loi a posteriori ? ✔ Beta : la loi Beta est conjuguée au modèle de Bernoulli / · Binomiale, comme les données
    = 3 + □   (trous : 3 + 0)   ← α′ = α + N (succès)
    = □   (trous : 3)
  — β′  [juge prob]  départ : β′
    = 3 + □   (trous : 3 + 2 − 0)   ← β′ = β + n − N (échecs)
    = □   (trous : 5)
  — PM  [juge prob]  départ : PM
    = 3/(3 + □)   (trous : 3/(3 + 5))   ← Moyenne d'une Beta(α′, β′)
    = 3/8
  — MAP  [juge prob]  départ : MAP
    = (□)/(3 + 5 − 2)   (trous : (3 − 1)/(3 + 5 − 2))   ← Mode d'une Beta
    = 2/6
    = 1/3
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(3 + 0, 3 + □) | Beta(3, 5), PM = 0,375, MAP = 1/3
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Un capteur détecte l'objet 5 fois sur 9 essais. A priori, la probabilité de succès θ suit une loi Beta(4, 3) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [guided]  α′
    ? Quelle famille pour la loi a posteriori ? ✔ Beta : la loi Beta est conjuguée au modèle de Bernoulli / · Binomiale, comme les données
    = 4 + □   (trous : 4 + 5)   ← α′ = α + N (succès)
    = □   (trous : 9)
  — β′  [juge prob]  départ : β′
    = 3 + □   (trous : 3 + 9 − 5)   ← β′ = β + n − N (échecs)
    = □   (trous : 7)
  — PM  [juge prob]  départ : PM
    = 9/(9 + □)   (trous : 9/(9 + 7))   ← Moyenne d'une Beta(α′, β′)
    = 9/16
  — MAP  [juge prob]  départ : MAP
    = (□)/(9 + 7 − 2)   (trous : (9 − 1)/(9 + 7 − 2))   ← Mode d'une Beta
    = 8/14
    = 4/7
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(4 + 5, 3 + □) | Beta(9, 7), PM = 0,5625, MAP = 4/7
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

```

### Niveau 3

```
Un capteur détecte l'objet 1 fois sur 3 essais. A priori, la probabilité de succès θ suit une loi Beta(1, 5) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [tap, suivre l'erreur, menu menu]  α′
    = 1 + 1   ← α′ = α + N (succès)
    = 2
  — β′  [juge prob]  départ : β′
    = 5 + 3 − 1   ← β′ = β + n − N (échecs)
    = 7
  — PM  [juge prob]  départ : PM
    = 2/(2 + 7)   ← Moyenne d'une Beta(α′, β′)
    = 2/9
  — MAP  [juge prob]  départ : MAP
    = (2 − 1)/(2 + 7 − 2)   ← Mode d'une Beta
    = 1/7
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(1 + 1, 5 + □) | Beta(2, 7), PM = 2/9, MAP = 1/7
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Une pièce donne 4 piles sur 14 lancers. A priori, la probabilité de succès θ suit une loi Beta(3, 4) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [tap, suivre l'erreur, menu menu]  α′
    = 3 + 4   ← α′ = α + N (succès)
    = 7
  — β′  [juge prob]  départ : β′
    = 4 + 14 − 4   ← β′ = β + n − N (échecs)
    = 14
  — PM  [juge prob]  départ : PM
    = 7/(7 + 14)   ← Moyenne d'une Beta(α′, β′)
    = 7/21
    = 1/3
  — MAP  [juge prob]  départ : MAP
    = (7 − 1)/(7 + 14 − 2)   ← Mode d'une Beta
    = 6/19
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(3 + 4, 4 + □) | Beta(7, 14), PM = 1/3, MAP = 6/19
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Un joueur de basket réussit 8 tirs sur 18. A priori, la probabilité de succès θ suit une loi Beta(3, 2) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP).
  [tap, suivre l'erreur, menu menu]  α′
    = 3 + 8   ← α′ = α + N (succès)
    = 11
  — β′  [juge prob]  départ : β′
    = 2 + 18 − 8   ← β′ = β + n − N (échecs)
    = 12
  — PM  [juge prob]  départ : PM
    = 11/(11 + 12)   ← Moyenne d'une Beta(α′, β′)
    = 11/23
  — MAP  [juge prob]  départ : MAP
    = (11 − 1)/(11 + 12 − 2)   ← Mode d'une Beta
    = 10/21
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(3 + 8, 2 + □) | Beta(11, 12), PM = 11/23, MAP = 10/21
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

```

### Niveau 4

```
Une pièce donne 3 piles sur 10 lancers. A priori, la probabilité de succès θ suit une loi Beta(3, 1) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP), puis sa variance.
  [free, suivre l'erreur]  α′
    = 3 + 3   ← α′ = α + N (succès)
    = 6
  — β′  [juge prob]  départ : β′
    = 1 + 10 − 3   ← β′ = β + n − N (échecs)
    = 8
  — PM  [juge prob]  départ : PM
    = 6/(6 + 8)   ← Moyenne d'une Beta(α′, β′)
    = 6/14
    = 3/7
  — MAP  [juge prob]  départ : MAP
    = (6 − 1)/(6 + 8 − 2)   ← Mode d'une Beta
    = 5/12
  — Var  [juge prob]  départ : Var
    = 3/7·(1 − 3/7)/(1 + 6 + 8)   ← PM(1 − PM)/(1 + α′ + β′)
    = 4/245
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(3 + 3, 1 + □) | Beta(6, 8), PM = 3/7, MAP = 5/12
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Une pièce donne 17 piles sur 19 lancers. A priori, la probabilité de succès θ suit une loi Beta(1, 4) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP), puis sa variance.
  [free, suivre l'erreur]  α′
    = 1 + 17   ← α′ = α + N (succès)
    = 18
  — β′  [juge prob]  départ : β′
    = 4 + 19 − 17   ← β′ = β + n − N (échecs)
    = 6
  — PM  [juge prob]  départ : PM
    = 18/(18 + 6)   ← Moyenne d'une Beta(α′, β′)
    = 18/24
    = 3/4
  — MAP  [juge prob]  départ : MAP
    = (18 − 1)/(18 + 6 − 2)   ← Mode d'une Beta
    = 17/22
  — Var  [juge prob]  départ : Var
    = 3/4·(1 − 3/4)/(1 + 18 + 6)   ← PM(1 − PM)/(1 + α′ + β′)
    = 3/400
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(1 + 17, 4 + □) | Beta(18, 6), PM = 0,75, MAP = 17/22
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Un joueur de basket réussit 13 tirs sur 17. A priori, la probabilité de succès θ suit une loi Beta(3, 5) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP), puis sa variance.
  [free, suivre l'erreur]  α′
    = 3 + 13   ← α′ = α + N (succès)
    = 16
  — β′  [juge prob]  départ : β′
    = 5 + 17 − 13   ← β′ = β + n − N (échecs)
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
  aides : Les succès s'ajoutent au premier paramètre, les échecs au second. | Beta(3 + 13, 5 + □) | Beta(16, 9), PM = 0,64, MAP = 15/23
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

```

### Niveau 5

```
Un capteur détecte l'objet 3 fois sur 5 essais. A priori, la probabilité de succès θ suit une loi Beta(2, 5) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP), puis sa variance, et compare au MLE.
  [free, sans aide]  α′
    = 2 + 3   ← α′ = α + N (succès)
    = 5
  — β′  [juge prob]  départ : β′
    = 5 + 5 − 3   ← β′ = β + n − N (échecs)
    = 7
  — PM  [juge prob]  départ : PM
    = 5/(5 + 7)   ← Moyenne d'une Beta(α′, β′)
    = 5/12
  — MAP  [juge prob]  départ : MAP
    = (5 − 1)/(5 + 7 − 2)   ← Mode d'une Beta
    = 4/10
    = 2/5
  — Var  [juge prob]  départ : Var
    = 5/12·(1 − 5/12)/(1 + 5 + 7)   ← PM(1 − PM)/(1 + α′ + β′)
    = 35/1872
  — Comparer : le MLE N/n  [juge prob]  départ : MLE
    = 3/5   ← Le MLE ignore l'a priori
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Un joueur de basket réussit 3 tirs sur 20. A priori, la probabilité de succès θ suit une loi Beta(4, 2) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP), puis sa variance, et compare au MLE.
  [free, sans aide]  α′
    = 4 + 3   ← α′ = α + N (succès)
    = 7
  — β′  [juge prob]  départ : β′
    = 2 + 20 − 3   ← β′ = β + n − N (échecs)
    = 19
  — PM  [juge prob]  départ : PM
    = 7/(7 + 19)   ← Moyenne d'une Beta(α′, β′)
    = 7/26
  — MAP  [juge prob]  départ : MAP
    = (7 − 1)/(7 + 19 − 2)   ← Mode d'une Beta
    = 6/24
    = 1/4
  — Var  [juge prob]  départ : Var
    = 7/26·(1 − 7/26)/(1 + 7 + 19)   ← PM(1 − PM)/(1 + α′ + β′)
    = 133/18252
  — Comparer : le MLE N/n  [juge prob]  départ : MLE
    = 3/20   ← Le MLE ignore l'a priori
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

Un capteur détecte l'objet 8 fois sur 10 essais. A priori, la probabilité de succès θ suit une loi Beta(3, 2) ; les essais sont indépendants. Donne la loi a posteriori Beta(α′, β′), puis sa moyenne (PM) et son mode (MAP), puis sa variance, et compare au MLE.
  [free, sans aide]  α′
    = 3 + 8   ← α′ = α + N (succès)
    = 11
  — β′  [juge prob]  départ : β′
    = 2 + 10 − 8   ← β′ = β + n − N (échecs)
    = 4
  — PM  [juge prob]  départ : PM
    = 11/(11 + 4)   ← Moyenne d'une Beta(α′, β′)
    = 11/15
  — MAP  [juge prob]  départ : MAP
    = (11 − 1)/(11 + 4 − 2)   ← Mode d'une Beta
    = 10/13
  — Var  [juge prob]  départ : Var
    = 11/15·(1 − 11/15)/(1 + 11 + 4)   ← PM(1 − PM)/(1 + α′ + β′)
    = 11/900
  — Comparer : le MLE N/n  [juge prob]  départ : MLE
    = 8/10   ← Le MLE ignore l'a priori
    = 4/5
  pièges : p_beta_prior_not_added, p_beta_swap, p_map_pm_confused

```

### Variantes d'examen

```
Un capteur détecte l'objet 0 fois sur 6 essais. A priori, la probabilité de succès θ suit une loi Beta(4, 4) ; les essais sont indépendants. Quelle est la loi a posteriori de θ ?
  · Beta(10, 4) [p_beta_swap]   ✔ Beta(4, 10)   · Beta(4, 4)   · Beta(0, 6) [p_beta_prior_not_added]
  [examen mcq]
  pièges : p_beta_prior_not_added, p_beta_swap

Vrai ou faux ?
  « Avec un a priori uniforme Beta(1, 1), le MAP du modèle Beta-Bernoulli est égal au MLE N/n. » → VRAI
  [examen tf]

```

## Modèle gaussien-gaussien (`p-bayes-gauss`, BA4)

_A priori θ ~ N(μ₀, τ²) ; données Xᵢ | θ ~ N(θ, σ²), σ² connu._

### Niveau 1

```
A priori θ ~ N(1,7 ; 0,25). Chaque mesure suit N(θ ; 4), les mesures sont indépendantes. On observe 5 mesures de moyenne x̄ = 5,9. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [guided]  1/τ²
    = 1/□   (trous : 1/0,25)   ← Inverse de la variance a priori
    = 4
  — Précision des données  [juge prob]  départ : n/σ²
    = □/4   (trous : 5/4)   ← n mesures de variance σ²
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(4 + □)   (trous : 1/(4 + 5/4))   ← Les précisions s'additionnent
    = □   (trous : 4/21)
  — μpost  [juge prob]  départ : μ_post
    = (4·1,7 + 5/4·□)/(21/4)   (trous : (4·1,7 + 5/4·5,9)/(21/4))   ← Moyenne pondérée de μ₀ et x̄
    = □   (trous : 2,7)
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(4 + □) | σ²_post = 4/21, μ_post = 2,7
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(3,8 ; 2). Chaque mesure suit N(θ ; 4), les mesures sont indépendantes. On observe 4 mesures de moyenne x̄ = 4,5. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [guided]  1/τ²
    = 1/□   (trous : 1/2)   ← Inverse de la variance a priori
  — Précision des données  [juge prob]  départ : n/σ²
    = □/4   (trous : 4/4)   ← n mesures de variance σ²
    = 1
  — σpost2  [juge prob]  départ : σ²_post
    = □/(1/2 + 1)   (trous : 1/(1/2 + 1))   ← Les précisions s'additionnent
    = □   (trous : 2/3)
  — μpost  [juge prob]  départ : μ_post
    = (1/2·3,8 + 1·□)/(3/2)   (trous : (1/2·3,8 + 1·4,5)/(3/2))   ← Moyenne pondérée de μ₀ et x̄
    = □   (trous : 64/15)
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(0,5 + □) | σ²_post = 2/3, μ_post = 64/15
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(2,5 ; 1). Chaque mesure suit N(θ ; 4), les mesures sont indépendantes. On observe 2 mesures de moyenne x̄ = 2,7. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [guided]  1/τ²
    = □/1   (trous : 1/1)   ← Inverse de la variance a priori
    = 1
  — Précision des données  [juge prob]  départ : n/σ²
    = □/4   (trous : 2/4)   ← n mesures de variance σ²
    = 1/2
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1 + □)   (trous : 1/(1 + 1/2))   ← Les précisions s'additionnent
    = □   (trous : 2/3)
  — μpost  [juge prob]  départ : μ_post
    = (1·2,5 + 1/2·□)/(3/2)   (trous : (1·2,5 + 1/2·2,7)/(3/2))   ← Moyenne pondérée de μ₀ et x̄
    = □   (trous : 77/30)
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(1 + □) | σ²_post = 2/3, μ_post = 77/30
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

```

### Niveau 2

```
A priori θ ~ N(5 ; 0,5). Chaque mesure suit N(θ ; 0,25), les mesures sont indépendantes. On observe 5 mesures de moyenne x̄ = 4,3. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [guided]  1/τ²
    = 1/□   (trous : 1/0,5)   ← Inverse de la variance a priori
    = 2
  — Précision des données  [juge prob]  départ : n/σ²
    = □/0,25   (trous : 5/0,25)   ← n mesures de variance σ²
    = 20
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(2 + □)   (trous : 1/(2 + 20))   ← Les précisions s'additionnent
    = □   (trous : 1/22)
  — μpost  [juge prob]  départ : μ_post
    = (2·5 + 20·□)/(22)   (trous : (2·5 + 20·4,3)/(22))   ← Moyenne pondérée de μ₀ et x̄
    = □   (trous : 48/11)
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(2 + □) | σ²_post = 1/22, μ_post = 48/11
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(5 ; 1). Chaque mesure suit N(θ ; 0,25), les mesures sont indépendantes. On observe une mesure x = 2,4. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [guided]  1/τ²
    = □/1   (trous : 1/1)   ← Inverse de la variance a priori
    = 1
  — Précision des données  [juge prob]  départ : n/σ²
    = □/0,25   (trous : 1/0,25)   ← n mesures de variance σ²
    = 4
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1 + □)   (trous : 1/(1 + 4))   ← Les précisions s'additionnent
    = □   (trous : 1/5)
  — μpost  [juge prob]  départ : μ_post
    = (1·5 + 4·□)/(5)   (trous : (1·5 + 4·2,4)/(5))   ← Moyenne pondérée de μ₀ et x̄
    = □   (trous : 2,92)
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(1 + □) | σ²_post = 0,2, μ_post = 2,92
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(4 ; 0,25). Chaque mesure suit N(θ ; 2), les mesures sont indépendantes. On observe 6 mesures de moyenne x̄ = 1,6. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [guided]  1/τ²
    = 1/□   (trous : 1/0,25)   ← Inverse de la variance a priori
    = 4
  — Précision des données  [juge prob]  départ : n/σ²
    = □/2   (trous : 6/2)   ← n mesures de variance σ²
    = 3
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(4 + □)   (trous : 1/(4 + 3))   ← Les précisions s'additionnent
    = □   (trous : 1/7)
  — μpost  [juge prob]  départ : μ_post
    = (4·4 + 3·□)/(7)   (trous : (4·4 + 3·1,6)/(7))   ← Moyenne pondérée de μ₀ et x̄
    = □   (trous : 104/35)
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(4 + □) | σ²_post = 1/7, μ_post = 104/35
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

```

### Niveau 3

```
A priori θ ~ N(2,2 ; 4). Chaque mesure suit N(θ ; 0,5), les mesures sont indépendantes. On observe une mesure x = 4,9. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [tap, suivre l'erreur, menu menu]  1/τ²
    = 1/4   ← Inverse de la variance a priori
  — Précision des données  [juge prob]  départ : n/σ²
    = 1/0,5   ← n mesures de variance σ²
    = 2
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1/4 + 2)   ← Les précisions s'additionnent
    = 4/9
  — μpost  [juge prob]  départ : μ_post
    = (1/4·2,2 + 2·4,9)/(9/4)   ← Moyenne pondérée de μ₀ et x̄
    = 4,6
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(0,25 + □) | σ²_post = 4/9, μ_post = 4,6
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(2,1 ; 0,5). Chaque mesure suit N(θ ; 0,5), les mesures sont indépendantes. On observe 3 mesures de moyenne x̄ = 5. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [tap, suivre l'erreur, menu menu]  1/τ²
    = 1/0,5   ← Inverse de la variance a priori
    = 2
  — Précision des données  [juge prob]  départ : n/σ²
    = 3/0,5   ← n mesures de variance σ²
    = 6
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(2 + 6)   ← Les précisions s'additionnent
    = 1/8
  — μpost  [juge prob]  départ : μ_post
    = (2·2,1 + 6·5)/(8)   ← Moyenne pondérée de μ₀ et x̄
    = 4,275
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(2 + □) | σ²_post = 0,125, μ_post = 4,275
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(3,9 ; 0,25). Chaque mesure suit N(θ ; 1), les mesures sont indépendantes. On observe 2 mesures de moyenne x̄ = 3,6. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [tap, suivre l'erreur, menu menu]  1/τ²
    = 1/0,25   ← Inverse de la variance a priori
    = 4
  — Précision des données  [juge prob]  départ : n/σ²
    = 2/1   ← n mesures de variance σ²
    = 2
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(4 + 2)   ← Les précisions s'additionnent
    = 1/6
  — μpost  [juge prob]  départ : μ_post
    = (4·3,9 + 2·3,6)/(6)   ← Moyenne pondérée de μ₀ et x̄
    = 3,8
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(4 + □) | σ²_post = 1/6, μ_post = 3,8
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

```

### Niveau 4

```
A priori θ ~ N(5,4 ; 2). Chaque mesure suit N(θ ; 0,5), les mesures sont indépendantes. On observe une mesure x = 4,2. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [free, suivre l'erreur]  1/τ²
    = 1/2   ← Inverse de la variance a priori
  — Précision des données  [juge prob]  départ : n/σ²
    = 1/0,5   ← n mesures de variance σ²
    = 2
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1/2 + 2)   ← Les précisions s'additionnent
    = 2/5
  — μpost  [juge prob]  départ : μ_post
    = (1/2·5,4 + 2·4,2)/(5/2)   ← Moyenne pondérée de μ₀ et x̄
    = 4,44
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(0,5 + □) | σ²_post = 0,4, μ_post = 4,44
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(1,8 ; 4). Chaque mesure suit N(θ ; 4), les mesures sont indépendantes. On observe 4 mesures de moyenne x̄ = 2,5. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [free, suivre l'erreur]  1/τ²
    = 1/4   ← Inverse de la variance a priori
  — Précision des données  [juge prob]  départ : n/σ²
    = 4/4   ← n mesures de variance σ²
    = 1
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1/4 + 1)   ← Les précisions s'additionnent
    = 4/5
  — μpost  [juge prob]  départ : μ_post
    = (1/4·1,8 + 1·2,5)/(5/4)   ← Moyenne pondérée de μ₀ et x̄
    = 2,36
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(0,25 + □) | σ²_post = 0,8, μ_post = 2,36
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

A priori θ ~ N(5,2 ; 4). Chaque mesure suit N(θ ; 2), les mesures sont indépendantes. On observe 2 mesures de moyenne x̄ = 1,2. Donne la loi a posteriori N(μ_post ; σ²_post) de θ.
  [free, suivre l'erreur]  1/τ²
    = 1/4   ← Inverse de la variance a priori
  — Précision des données  [juge prob]  départ : n/σ²
    = 2/2   ← n mesures de variance σ²
    = 1
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1/4 + 1)   ← Les précisions s'additionnent
    = 4/5
  — μpost  [juge prob]  départ : μ_post
    = (1/4·5,2 + 1·1,2)/(5/4)   ← Moyenne pondérée de μ₀ et x̄
    = 2
  aides : Additionne les précisions (inverses des variances) ; la moyenne est pondérée par les précisions. | σ²_post = 1/(0,25 + □) | σ²_post = 0,8, μ_post = 2
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg

```

### Niveau 5

```
A priori θ ~ N(3 ; 0,5). Chaque mesure suit N(θ ; 0,25), les mesures sont indépendantes. On observe 4 mesures de moyenne x̄ = 5,1. Donne la loi a posteriori N(μ_post ; σ²_post). Puis, avec le même a priori et le même σ², combien de mesures faut-il au minimum pour que σ²_post < 0,25 ?
  [free, sans aide]  1/τ²
    = 1/0,5   ← Inverse de la variance a priori
    = 2
  — Précision des données  [juge prob]  départ : n/σ²
    = 4/0,25   ← n mesures de variance σ²
    = 16
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(2 + 16)   ← Les précisions s'additionnent
    = 1/18
  — μpost  [juge prob]  départ : μ_post
    = (2·3 + 16·5,1)/(18)   ← Moyenne pondérée de μ₀ et x̄
    = 73/15
  — Nombre minimal de mesures pour σ²_post   [juge prob]  départ : n_min
    = 1   ← 1/(2 + n/0,25) < 0,25
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg, p_precision_n

A priori θ ~ N(5,8 ; 1). Chaque mesure suit N(θ ; 0,25), les mesures sont indépendantes. On observe une mesure x = 2,4. Donne la loi a posteriori N(μ_post ; σ²_post). Puis, avec le même a priori et le même σ², combien de mesures faut-il au minimum pour que σ²_post < 0,05 ?
  [free, sans aide]  1/τ²
    = 1/1   ← Inverse de la variance a priori
    = 1
  — Précision des données  [juge prob]  départ : n/σ²
    = 1/0,25   ← n mesures de variance σ²
    = 4
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1 + 4)   ← Les précisions s'additionnent
    = 1/5
  — μpost  [juge prob]  départ : μ_post
    = (1·5,8 + 4·2,4)/(5)   ← Moyenne pondérée de μ₀ et x̄
    = 3,08
  — Nombre minimal de mesures pour σ²_post   [juge prob]  départ : n_min
    = 5   ← 1/(1 + n/0,25) < 0,05
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg, p_precision_n

A priori θ ~ N(2,9 ; 4). Chaque mesure suit N(θ ; 4), les mesures sont indépendantes. On observe 6 mesures de moyenne x̄ = 5,6. Donne la loi a posteriori N(μ_post ; σ²_post). Puis, avec le même a priori et le même σ², combien de mesures faut-il au minimum pour que σ²_post < 0,1 ?
  [free, sans aide]  1/τ²
    = 1/4   ← Inverse de la variance a priori
  — Précision des données  [juge prob]  départ : n/σ²
    = 6/4   ← n mesures de variance σ²
    = 3/2
  — σpost2  [juge prob]  départ : σ²_post
    = 1/(1/4 + 3/2)   ← Les précisions s'additionnent
    = 4/7
  — μpost  [juge prob]  départ : μ_post
    = (1/4·2,9 + 3/2·5,6)/(7/4)   ← Moyenne pondérée de μ₀ et x̄
    = 73/14
  — Nombre minimal de mesures pour σ²_post   [juge prob]  départ : n_min
    = 40   ← 1/(0,25 + n/4) < 0,1
  pièges : p_gauss_post_var_add, p_gauss_posterior_avg, p_precision_n

```

### Variantes d'examen

```
A priori θ ~ N(10 ; 4) ; chaque mesure suit N(θ ; 1), indépendantes. Nombre minimal n de mesures pour que la variance a posteriori soit < 0,1 ?
  · 11 [p_precision_n]   · 51 [p_gauss_post_var_add]   ✔ 10   · 9 [p_precision_n]
  [examen mcq]
  pièges : p_precision_n, p_gauss_post_var_add

Vrai ou faux ?
  « Dans le modèle gaussien-gaussien, quand le nombre n de mesures tend vers l'infini, la moyenne a posteriori tend vers x̄. » → VRAI
  [examen tf]

```

## Lois conjuguées ; Dirichlet-multinomiale (`p-bayes-conjugate`, BA4)

_Une loi a priori est conjuguée si l'a posteriori reste dans la même famille : Beta–Bernoulli, Dirichlet–multinomiale, normale–normale…_

### Niveau 1

```
Une expérience a 4 issues de probabilités (0,25 ; 0,25 ; 0,25 ; 0,25). On la répète n = 4 fois, indépendamment. Probabilité d'obtenir les comptes (2, 0, 2, 0) ?
  [guided]  coef
    = □/(2!·0!·2!·0!)   (trous : 4!/(2!·0!·2!·0!))   ← Ordres possibles des issues
    = □   (trous : 6)
  — Pr  [juge prob]  départ : Pr
    = □·(1/4)²·(1/4)²   (trous : 6·(1/4)²·(1/4)²)   ← Coefficient × produit des probabilités
    = □   (trous : 3/128)
  aides : Une suite précise a la probabilité Π θₖ^(Nₖ) ; il y a n!/(N₁!···N_K!) suites. | 4!/(2!×0!×2!×0!) × □ | 0,0234375
  pièges : p_multinomial_no_coef

Une expérience a 4 issues de probabilités (0,25 ; 0,25 ; 0,25 ; 0,25). On la répète n = 4 fois, indépendamment. Probabilité d'obtenir les comptes (1, 1, 2, 0) ?
  [guided]  coef
    = □/(1!·1!·2!·0!)   (trous : 4!/(1!·1!·2!·0!))   ← Ordres possibles des issues
    = □   (trous : 12)
  — Pr  [juge prob]  départ : Pr
    = □·(1/4)¹·(1/4)¹·(1/4)²   (trous : 12·(1/4)¹·(1/4)¹·(1/4)²)   ← Coefficient × produit des probabilités
    = □   (trous : 3/64)
  aides : Une suite précise a la probabilité Π θₖ^(Nₖ) ; il y a n!/(N₁!···N_K!) suites. | 4!/(1!×1!×2!×0!) × □ | 0,046875
  pièges : p_multinomial_no_coef

Une expérience a 4 issues de probabilités (0,25 ; 0,25 ; 0,25 ; 0,25). On la répète n = 5 fois, indépendamment. Probabilité d'obtenir les comptes (2, 0, 1, 2) ?
  [guided]  coef
    = □/(2!·0!·1!·2!)   (trous : 5!/(2!·0!·1!·2!))   ← Ordres possibles des issues
    = □   (trous : 30)
  — Pr  [juge prob]  départ : Pr
    = □·(1/4)²·(1/4)¹·(1/4)²   (trous : 30·(1/4)²·(1/4)¹·(1/4)²)   ← Coefficient × produit des probabilités
    = □   (trous : 15/512)
  aides : Une suite précise a la probabilité Π θₖ^(Nₖ) ; il y a n!/(N₁!···N_K!) suites. | 5!/(2!×0!×1!×2!) × □ | 0,029296875
  pièges : p_multinomial_no_coef

```

### Niveau 2

```
3 catégories : pluie, nuages, soleil. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(2, 2, 2). On observe les comptes (1, 4, 1) sur n = 6 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [guided]  α′₁
    (A posteriori : Dir(3, 6, 3).)
    ? Quelle loi a posteriori ? ✔ Dirichlet : on ajoute les comptes aux paramètres (loi conjuguée) / · Multinomiale, comme les données
    = 2 + □   (trous : 2 + 1)   ← α₁ + N₁
    = 3
  — α₀+n  [juge prob]  départ : α_0 + n
    = □ + 6   (trous : 6 + 6)   ← α₀ = 2 + 2 + 2
    = 12
  — PM₁  [juge prob]  départ : PM_1
    = 3/□   (trous : 3/12)   ← Moyenne a posteriori
    = 1/4
  — MAP₁  [juge prob]  départ : MAP_1
    = (□ − 1)/(12 − 3)   (trous : (3 − 1)/(12 − 3))   ← Mode a posteriori
    = 2/9
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (2 + 1)/(6 + □) | PM₁ = 0,25, MAP₁ = 2/9
  pièges : p_dirichlet_alpha0, p_map_pm_confused

3 catégories : rouge, vert, bleu. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(1, 2, 3). On observe les comptes (4, 2, 5) sur n = 11 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [guided]  α′₁
    (A posteriori : Dir(5, 4, 8).)
    ? Quelle loi a posteriori ? ✔ Dirichlet : on ajoute les comptes aux paramètres (loi conjuguée) / · Multinomiale, comme les données
    = 1 + □   (trous : 1 + 4)   ← α₁ + N₁
    = 5
  — α₀+n  [juge prob]  départ : α_0 + n
    = 6 + □   (trous : 6 + 11)   ← α₀ = 1 + 2 + 3
    = 17
  — PM₁  [juge prob]  départ : PM_1
    = 5/□   (trous : 5/17)   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (5 − 1)/(17 − □)   (trous : (5 − 1)/(17 − 3))   ← Mode a posteriori
    = 4/14
    = 2/7
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (1 + 4)/(6 + □) | PM₁ = 5/17, MAP₁ = 2/7
  pièges : p_dirichlet_alpha0, p_map_pm_confused

3 catégories : rouge, vert, bleu. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(2, 2, 1). On observe les comptes (5, 2, 0) sur n = 7 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [guided]  α′₁
    (A posteriori : Dir(7, 4, 1).)
    ? Quelle loi a posteriori ? ✔ Dirichlet : on ajoute les comptes aux paramètres (loi conjuguée) / · Multinomiale, comme les données
    = 2 + □   (trous : 2 + 5)   ← α₁ + N₁
    = 7
  — α₀+n  [juge prob]  départ : α_0 + n
    = 5 + □   (trous : 5 + 7)   ← α₀ = 2 + 2 + 1
    = 12
  — PM₁  [juge prob]  départ : PM_1
    = 7/□   (trous : 7/12)   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (7 − 1)/(12 − □)   (trous : (7 − 1)/(12 − 3))   ← Mode a posteriori
    = 6/9
    = 2/3
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (2 + 5)/(5 + □) | PM₁ = 7/12, MAP₁ = 2/3
  pièges : p_dirichlet_alpha0, p_map_pm_confused

```

### Niveau 3

```
4 catégories : vélo, bus, train, voiture. A priori, θ = (θ₁, θ₂, θ₃, θ₄) suit une loi de Dirichlet Dir(3, 1, 2, 2). On observe les comptes (3, 0, 2, 0) sur n = 5 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [tap, suivre l'erreur, menu menu]  α′₁
    (A posteriori : Dir(6, 1, 4, 2).)
    ? Quelle loi a posteriori ? ✔ Dirichlet : on ajoute les comptes aux paramètres (loi conjuguée) / · Multinomiale, comme les données
    = 3 + 3   ← α₁ + N₁
    = 6
  — α₀+n  [juge prob]  départ : α_0 + n
    = 8 + 5   ← α₀ = 3 + 1 + 2 + 2
    = 13
  — PM₁  [juge prob]  départ : PM_1
    = 6/13   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (6 − 1)/(13 − 4)   ← Mode a posteriori
    = 5/9
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (3 + 3)/(8 + □) | PM₁ = 6/13, MAP₁ = 5/9
  pièges : p_dirichlet_alpha0, p_map_pm_confused

3 catégories : rouge, vert, bleu. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(1, 3, 2). On observe les comptes (1, 5, 4) sur n = 10 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [tap, suivre l'erreur, menu menu]  α′₁
    (A posteriori : Dir(2, 8, 6).)
    ? Quelle loi a posteriori ? ✔ Dirichlet : on ajoute les comptes aux paramètres (loi conjuguée) / · Multinomiale, comme les données
    = 1 + 1   ← α₁ + N₁
    = 2
  — α₀+n  [juge prob]  départ : α_0 + n
    = 6 + 10   ← α₀ = 1 + 3 + 2
    = 16
  — PM₁  [juge prob]  départ : PM_1
    = 2/16   ← Moyenne a posteriori
    = 1/8
  — MAP₁  [juge prob]  départ : MAP_1
    = (2 − 1)/(16 − 3)   ← Mode a posteriori
    = 1/13
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (1 + 1)/(6 + □) | PM₁ = 0,125, MAP₁ = 1/13
  pièges : p_dirichlet_alpha0, p_map_pm_confused

3 catégories : pluie, nuages, soleil. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(2, 1, 1). On observe les comptes (3, 2, 4) sur n = 9 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [tap, suivre l'erreur, menu menu]  α′₁
    (A posteriori : Dir(5, 3, 5).)
    ? Quelle loi a posteriori ? ✔ Dirichlet : on ajoute les comptes aux paramètres (loi conjuguée) / · Multinomiale, comme les données
    = 2 + 3   ← α₁ + N₁
    = 5
  — α₀+n  [juge prob]  départ : α_0 + n
    = 4 + 9   ← α₀ = 2 + 1 + 1
    = 13
  — PM₁  [juge prob]  départ : PM_1
    = 5/13   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (5 − 1)/(13 − 3)   ← Mode a posteriori
    = 4/10
    = 2/5
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (2 + 3)/(4 + □) | PM₁ = 5/13, MAP₁ = 0,4
  pièges : p_dirichlet_alpha0, p_map_pm_confused

```

### Niveau 4

```
3 catégories : rouge, vert, bleu. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(3, 3, 3). On observe les comptes (3, 5, 0) sur n = 8 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [free, suivre l'erreur]  α′₁
    (A posteriori : Dir(6, 8, 3).)
    = 3 + 3   ← α₁ + N₁
    = 6
  — α₀+n  [juge prob]  départ : α_0 + n
    = 9 + 8   ← α₀ = 3 + 3 + 3
    = 17
  — PM₁  [juge prob]  départ : PM_1
    = 6/17   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (6 − 1)/(17 − 3)   ← Mode a posteriori
    = 5/14
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (3 + 3)/(9 + □) | PM₁ = 6/17, MAP₁ = 5/14
  pièges : p_dirichlet_alpha0, p_map_pm_confused

4 catégories : vélo, bus, train, voiture. A priori, θ = (θ₁, θ₂, θ₃, θ₄) suit une loi de Dirichlet Dir(1, 1, 1, 2). On observe les comptes (3, 2, 3, 0) sur n = 8 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [free, suivre l'erreur]  α′₁
    (A posteriori : Dir(4, 3, 4, 2).)
    = 1 + 3   ← α₁ + N₁
    = 4
  — α₀+n  [juge prob]  départ : α_0 + n
    = 5 + 8   ← α₀ = 1 + 1 + 1 + 2
    = 13
  — PM₁  [juge prob]  départ : PM_1
    = 4/13   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (4 − 1)/(13 − 4)   ← Mode a posteriori
    = 3/9
    = 1/3
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (1 + 3)/(5 + □) | PM₁ = 4/13, MAP₁ = 1/3
  pièges : p_dirichlet_alpha0, p_map_pm_confused

4 catégories : vélo, bus, train, voiture. A priori, θ = (θ₁, θ₂, θ₃, θ₄) suit une loi de Dirichlet Dir(2, 2, 1, 3). On observe les comptes (1, 1, 1, 3) sur n = 6 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [free, suivre l'erreur]  α′₁
    (A posteriori : Dir(3, 3, 2, 6).)
    = 2 + 1   ← α₁ + N₁
    = 3
  — α₀+n  [juge prob]  départ : α_0 + n
    = 8 + 6   ← α₀ = 2 + 2 + 1 + 3
    = 14
  — PM₁  [juge prob]  départ : PM_1
    = 3/14   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (3 − 1)/(14 − 4)   ← Mode a posteriori
    = 2/10
    = 1/5
  aides : Chaque compte s'ajoute à son αₖ ; la PM divise par la somme de tous les paramètres a posteriori. | PM₁ = (2 + 1)/(8 + □) | PM₁ = 3/14, MAP₁ = 0,2
  pièges : p_dirichlet_alpha0, p_map_pm_confused

```

### Niveau 5

```
4 catégories : vélo, bus, train, voiture. A priori, θ = (θ₁, θ₂, θ₃, θ₄) suit une loi de Dirichlet Dir(2, 1, 3, 1). On observe les comptes (1, 2, 2, 4) sur n = 9 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [free, sans aide]  α′₁
    (A posteriori : Dir(3, 3, 5, 5).)
    = 2 + 1   ← α₁ + N₁
    = 3
  — α₀+n  [juge prob]  départ : α_0 + n
    = 7 + 9   ← α₀ = 2 + 1 + 3 + 1
    = 16
  — PM₁  [juge prob]  départ : PM_1
    = 3/16   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (3 − 1)/(16 − 4)   ← Mode a posteriori
    = 2/12
    = 1/6
  pièges : p_dirichlet_alpha0, p_map_pm_confused

3 catégories : pluie, nuages, soleil. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(2, 3, 2). On observe les comptes (1, 7, 0) sur n = 8 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [free, sans aide]  α′₁
    (A posteriori : Dir(3, 10, 2).)
    = 2 + 1   ← α₁ + N₁
    = 3
  — α₀+n  [juge prob]  départ : α_0 + n
    = 7 + 8   ← α₀ = 2 + 3 + 2
    = 15
  — PM₁  [juge prob]  départ : PM_1
    = 3/15   ← Moyenne a posteriori
    = 1/5
  — MAP₁  [juge prob]  départ : MAP_1
    = (3 − 1)/(15 − 3)   ← Mode a posteriori
    = 2/12
    = 1/6
  pièges : p_dirichlet_alpha0, p_map_pm_confused

3 catégories : pluie, nuages, soleil. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(2, 2, 3). On observe les comptes (3, 3, 3) sur n = 9 tirages indépendants. Donne la loi a posteriori, puis la moyenne et le mode a posteriori de θ₁.
  [free, sans aide]  α′₁
    (A posteriori : Dir(5, 5, 6).)
    = 2 + 3   ← α₁ + N₁
    = 5
  — α₀+n  [juge prob]  départ : α_0 + n
    = 7 + 9   ← α₀ = 2 + 2 + 3
    = 16
  — PM₁  [juge prob]  départ : PM_1
    = 5/16   ← Moyenne a posteriori
  — MAP₁  [juge prob]  départ : MAP_1
    = (5 − 1)/(16 − 3)   ← Mode a posteriori
    = 4/13
  pièges : p_dirichlet_alpha0, p_map_pm_confused

```

### Variantes d'examen

```
3 catégories : A, B, C. A priori, θ = (θ₁, θ₂, θ₃) suit une loi de Dirichlet Dir(3, 1, 3). On observe les comptes (4, 1, 1) sur n = 6 tirages indépendants. Moyenne a posteriori de θ₁ ?
  ✔ 7/13   · 7/6 [p_dirichlet_alpha0]   · 2/3   · 0,6 [p_map_pm_confused]
  [examen mcq]
  pièges : p_dirichlet_alpha0, p_map_pm_confused

Vrai ou faux ?
  « Pour la moyenne θ d'une loi normale de variance connue, un a priori normal est conjugué. » → VRAI
  [examen tf]

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
