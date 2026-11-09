# Exemples de questions — Suites, sommes, récurrence

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Notation Σ (`g5-sigma`, Gymnase)

_Lire et écrire une somme avec Σ, linéarité, formules du cours._

### Niveau 1

```
Écris les termes de Σ_{k=1}^{5} (3k + 1) un par un, puis calcule.
  [guided]  Σ_{k=1}^{5} (3k + 1)
    = 4 + 7 + 10 + □ + □   (trous : 4 + 7 + 10 + 13 + 16)   ← k = 1, 2, …, 5 : 5 termes
    = 50   ← Additionner
  aides : Remplace k par 1, puis 2, … jusqu'à 5. | Pour k = 1 : 4. Pour k = 5 : … | 4 + 7 + 10 + 13 + 16

Écris les termes de Σ_{k=1}^{3} (k + 1) un par un, puis calcule.
  [guided]  Σ_{k=1}^{3} (k + 1)
    = 2 + □ + □   (trous : 2 + 3 + 4)   ← k = 1, 2, …, 3 : 3 termes
    = 9   ← Additionner
  aides : Remplace k par 1, puis 2, … jusqu'à 3. | Pour k = 1 : 2. Pour k = 3 : … | 2 + 3 + 4

Écris les termes de Σ_{k=2}^{4} (4k + 1) un par un, puis calcule.
  [guided]  Σ_{k=2}^{4} (4k + 1)
    = 9 + □ + □   (trous : 9 + 13 + 17)   ← k = 2, 3, …, 4 : 3 termes
    = 39   ← Additionner
  aides : Remplace k par 2, puis 3, … jusqu'à 4. | Pour k = 2 : 9. Pour k = 4 : … | 9 + 13 + 17

```

### Niveau 2

```
Écris avec Σ (au clavier : sum(terme, k, début, fin)) : S = 3 + 7 + 11 + … + 27.
  [guided]  S
    (On passe de 3 à 7 en ajoutant 4 : le terme est de la forme 4k + …)
    = Σ_{k=□}^{□} □   (trous : Σ_{k=1}^{7} (4k − 1))   ← Terme général et bornes
  aides : Les termes augmentent de 4 : le terme général est 4k + b. Trouve b avec le premier terme. | Avec k = 1 : 4 + b = 3. Combien de termes jusqu'à 27 ? | Σ_{k=1}^{7} (4k − 1)

Écris avec Σ (au clavier : sum(terme, k, début, fin)) : S = 7 + 11 + 15 + … + 43.
  [guided]  S
    (On passe de 7 à 11 en ajoutant 4 : le terme est de la forme 4k + …)
    = Σ_{k=□}^{□} □   (trous : Σ_{k=1}^{10} (4k + 3))   ← Terme général et bornes
  aides : Les termes augmentent de 4 : le terme général est 4k + b. Trouve b avec le premier terme. | Avec k = 1 : 4 + b = 7. Combien de termes jusqu'à 43 ? | Σ_{k=1}^{10} (4k + 3)

Écris avec Σ (au clavier : sum(terme, k, début, fin)) : S = 3 + 5 + 7 + … + 23.
  [guided]  S
    (On passe de 3 à 5 en ajoutant 2 : le terme est de la forme 2k + …)
    = Σ_{k=□}^{□} □   (trous : Σ_{k=1}^{11} (2k + 1))   ← Terme général et bornes
  aides : Les termes augmentent de 2 : le terme général est 2k + b. Trouve b avec le premier terme. | Avec k = 1 : 2 + b = 3. Combien de termes jusqu'à 23 ? | Σ_{k=1}^{11} (2k + 1)

```

### Niveau 3

```
Calcule Σ_{k=1}^{5} (2k² − 3k − 1).
  [tap, suivre l'erreur, menu sigma]  Σ_{k=1}^{5} (2k² − 3k − 1)
    = 2Σ_{k=1}^{5} k² − 3Σ_{k=1}^{5} k − Σ_{k=1}^{5} 1   ← Linéarité
    = 2·(5·6·11/6) − 3·(5·6/2) − 5   ← Formules ; 5 termes
    = 60   ← Calculer
  aides : Sépare la somme en sommes de k², de k et de constantes. Σ d'une constante c vaut c × (nombre de termes). | 2Σ_{k=1}^{5} k² − 3Σ_{k=1}^{5} k − Σ_{k=1}^{5} 1 | 2·(5·6·11/6) − 3·(5·6/2) − 5

Calcule Σ_{k=1}^{6} (3k² + k − 3).
  [tap, suivre l'erreur, menu sigma]  Σ_{k=1}^{6} (3k² + k − 3)
    = 3Σ_{k=1}^{6} k² + Σ_{k=1}^{6} k − Σ_{k=1}^{6} 3   ← Linéarité
    = 3·(6·7·13/6) + (6·7/2) − 3·6   ← Formules ; 6 termes
    = 276   ← Calculer
  aides : Sépare la somme en sommes de k², de k et de constantes. Σ d'une constante c vaut c × (nombre de termes). | 3Σ_{k=1}^{6} k² + Σ_{k=1}^{6} k − Σ_{k=1}^{6} 3 | 3·(6·7·13/6) + (6·7/2) − 3·6

Calcule Σ_{k=1}^{16} (2k + 4).
  [tap, suivre l'erreur, menu sigma]  Σ_{k=1}^{16} (2k + 4)
    = 2Σ_{k=1}^{16} k + Σ_{k=1}^{16} 4   ← Linéarité
    = 2·(16·17/2) + 4·16   ← Formules ; 16 termes
    = 336   ← Calculer
  aides : Sépare la somme en sommes de k², de k et de constantes. Σ d'une constante c vaut c × (nombre de termes). | 2Σ_{k=1}^{16} k + Σ_{k=1}^{16} 4 | 2·(16·17/2) + 4·16

```

### Niveau 4

```
Calcule Σ_{k=1}^{n} (k² − 3k + 2) en fonction de n (polynôme réduit).
  [free, suivre l'erreur]  Σ_{k=1}^{n} (k² − 3k + 2)
    = Σ_{k=1}^{n} k² − 3Σ_{k=1}^{n} k + Σ_{k=1}^{n} 2   ← Linéarité
    = n(n + 1)(2n + 1)/6 − 3n(n + 1)/2 + 2n   ← Formules du cours
    = 1/3·n³ − n² + 2/3·n   ← Développer et réduire
  aides : Sépare la somme en sommes de k², de k et de constantes. Σ d'une constante c vaut c × (nombre de termes). | Σ_{k=1}^{n} k² − 3Σ_{k=1}^{n} k + Σ_{k=1}^{n} 2 | n(n + 1)(2n + 1)/6 − 3n(n + 1)/2 + 2n
  pièges : g5_reindex_half

Calcule Σ_{k=1}^{n} (k + 2) en fonction de n (polynôme réduit).
  [free, suivre l'erreur]  Σ_{k=1}^{n} (k + 2)
    = Σ_{k=1}^{n} k + Σ_{k=1}^{n} 2   ← Linéarité
    = n(n + 1)/2 + 2n   ← Formules du cours
    = 1/2·n² + 5/2·n   ← Développer et réduire
  aides : Sépare la somme en sommes de k², de k et de constantes. Σ d'une constante c vaut c × (nombre de termes). | Σ_{k=1}^{n} k + Σ_{k=1}^{n} 2 | n(n + 1)/2 + 2n
  pièges : g5_reindex_half

Calcule Σ_{k=1}^{n} (k² + 2k + 4) en fonction de n (polynôme réduit).
  [free, suivre l'erreur]  Σ_{k=1}^{n} (k² + 2k + 4)
    = Σ_{k=1}^{n} k² + 2Σ_{k=1}^{n} k + Σ_{k=1}^{n} 4   ← Linéarité
    = n(n + 1)(2n + 1)/6 + 2n(n + 1)/2 + 4n   ← Formules du cours
    = 1/3·n³ + 3/2·n² + 31/6·n   ← Développer et réduire
  aides : Sépare la somme en sommes de k², de k et de constantes. Σ d'une constante c vaut c × (nombre de termes). | Σ_{k=1}^{n} k² + 2Σ_{k=1}^{n} k + Σ_{k=1}^{n} 4 | n(n + 1)(2n + 1)/6 + 2n(n + 1)/2 + 4n
  pièges : g5_reindex_half

```

### Niveau 5

```
Calcule S(n) = Σ_{k=1}^{n} (2k² − 2k − 1) en fonction de n (polynôme réduit), puis S(11).
  [free, sans aide]  Σ_{k=1}^{n} (2k² − 2k − 1)
    = 2Σ_{k=1}^{n} k² − 2Σ_{k=1}^{n} k − Σ_{k=1}^{n} 1   ← Linéarité
    = 2n(n + 1)(2n + 1)/6 − 2n(n + 1)/2 − n   ← Formules du cours
    = 2/3·n³ − 5/3·n   ← Développer et réduire
  — Valeur pour n = 11 :  [juge value]  départ : S_11
    = 869   ← n = 11
  pièges : g5_reindex_half, g5_telescope_ends

Calcule S(n) = Σ_{k=1}^{n} (k² + 2k + 3) en fonction de n (polynôme réduit), puis S(17).
  [free, sans aide]  Σ_{k=1}^{n} (k² + 2k + 3)
    = Σ_{k=1}^{n} k² + 2Σ_{k=1}^{n} k + Σ_{k=1}^{n} 3   ← Linéarité
    = n(n + 1)(2n + 1)/6 + 2n(n + 1)/2 + 3n   ← Formules du cours
    = 1/3·n³ + 3/2·n² + 25/6·n   ← Développer et réduire
  — Valeur pour n = 17 :  [juge value]  départ : S_17
    = 2142   ← n = 17
  pièges : g5_reindex_half

Calcule S(n) = Σ_{k=1}^{n} (3k² − 3k + 5) en fonction de n (polynôme réduit), puis S(13).
  [free, sans aide]  Σ_{k=1}^{n} (3k² − 3k + 5)
    = 3Σ_{k=1}^{n} k² − 3Σ_{k=1}^{n} k + Σ_{k=1}^{n} 5   ← Linéarité
    = 3n(n + 1)(2n + 1)/6 − 3n(n + 1)/2 + 5n   ← Formules du cours
    = n³ + 4n   ← Développer et réduire
  — Valeur pour n = 13 :  [juge value]  départ : S_13
    = 2249   ← n = 13
  pièges : g5_reindex_half

```

### Variantes d'examen

```
Σ_{k=1}^{25} (2k + 1) =
  ✔ 675   · 651 [g5_count_terms]   · 625   · 674 [g5_count_terms]
  [examen mcq]
  pièges : g5_count_terms

Vrai ou faux ?
  « Pour tout n ≥ 1 : Σ_{k=1}^{n} 5 = 5n » → VRAI
  [examen tf]

```

## Changement d'indice, sommes télescopiques (`g5-reindex`, Gymnase)

_Décaler l'indice et les bornes ; il reste le premier et le dernier._

### Niveau 1

```
Pose j = k + 1 pour écrire Σ_{k=0}^{n − 1} (k + 1)² avec une formule du cours.
  [guided]  Σ_{k=0}^{n − 1} (k + 1)²
    = Σ_{j=□}^{□} j²   (trous : Σ_{j=1}^{n} j²)   ← j = k + 1 : k = 0 donne j = 1
    = n(n + 1)(2n + 1)/6   ← Formule du cours
  aides : Le terme change, et les bornes aussi : remplace k par j dans les deux. | Pour k = 0, j = 1. Pour la dernière valeur de k, j = … | Σ_{j=1}^{n} j²
  pièges : g5_sum_product, g5_reindex_half

Pose j = k − 1 pour écrire Σ_{k=2}^{n + 1} (k − 1) avec une formule du cours.
  [guided]  Σ_{k=2}^{n + 1} (k − 1)
    = Σ_{j=□}^{□} j   (trous : Σ_{j=1}^{n} j)   ← j = k − 1 : k = 2 donne j = 1
    = n(n + 1)/2   ← Formule du cours
  aides : Le terme change, et les bornes aussi : remplace k par j dans les deux. | Pour k = 2, j = 1. Pour la dernière valeur de k, j = … | Σ_{j=1}^{n} j
  pièges : g5_hered_wrong_term, g5_reindex_half, g5_telescope_ends

Pose j = k − 1 pour écrire Σ_{k=2}^{n + 1} (k − 1) avec une formule du cours.
  [guided]  Σ_{k=2}^{n + 1} (k − 1)
    = Σ_{j=□}^{□} j   (trous : Σ_{j=1}^{n} j)   ← j = k − 1 : k = 2 donne j = 1
    = n(n + 1)/2   ← Formule du cours
  aides : Le terme change, et les bornes aussi : remplace k par j dans les deux. | Pour k = 2, j = 1. Pour la dernière valeur de k, j = … | Σ_{j=1}^{n} j
  pièges : g5_hered_wrong_term, g5_reindex_half, g5_telescope_ends

```

### Niveau 2

```
Calcule Σ_{k=1}^{n} ln(1 + 1/k). La décomposition est donnée : ln(1 + 1/k) = ln((k + 1)/k) = ln(k + 1) − ln k.
  [guided]  Σ_{k=1}^{n} (ln(k + 1) − ln(k))
    (Les termes : (ln 2 − ln 1) + (ln 3 − ln 2) + … + (ln(n + 1) − ln n))
    = ln(n + 1) − □   (trous : ln(n + 1) − ln(1))   ← Télescoper : il reste le début et la fin
    = ln(n + 1)   ← Réduire
  aides : Écris le terme comme une différence : ln(1 + 1/k) = ln((k + 1)/k) = ln(k + 1) − ln k. | Écris les premiers et les derniers termes : (ln 2 − ln 1) + (ln 3 − ln 2) + … + (ln(n + 1) − ln n). Presque tout s'annule. | ln(n + 1) − ln(1)
  pièges : g5_reindex_half, g5_telescope_ends

Calcule Σ_{k=1}^{n} 1/(√(k + 1) + √(k)). La décomposition est donnée : 1/(√(k + 1) + √k) = √(k + 1) − √k (multiplier par la quantité conjuguée).
  [guided]  Σ_{k=1}^{n} (√(k + 1) − √(k))
    (Les termes : (√2 − √1) + (√3 − √2) + … + (√(n + 1) − √n))
    = √(n + 1) − □   (trous : √(n + 1) − 1)   ← Télescoper : il reste le début et la fin
  aides : Écris le terme comme une différence : 1/(√(k + 1) + √k) = √(k + 1) − √k (multiplier par la quantité conjuguée). | Écris les premiers et les derniers termes : (√2 − √1) + (√3 − √2) + … + (√(n + 1) − √n). Presque tout s'annule. | √(n + 1) − 1
  pièges : g5_reindex_half, g5_telescope_ends

Calcule Σ_{k=1}^{n} 3/(k(k + 1)). La décomposition est donnée : 3/(k(k + 1)) = 3/k − 3/(k + 1).
  [guided]  Σ_{k=1}^{n} (3/k − 3/(k + 1))
    (Les termes : (3 − 3/2) + (3/2 − 3/3) + … + (3/n − 3/(n + 1)))
    = 3 − □   (trous : 3 − 3/(n + 1))   ← Télescoper : il reste le début et la fin
    = 3n/(n + 1)   ← Réduire
  aides : Écris le terme comme une différence : 3/(k(k + 1)) = 3/k − 3/(k + 1). | Écris les premiers et les derniers termes : (3 − 3/2) + (3/2 − 3/3) + … + (3/n − 3/(n + 1)). Presque tout s'annule. | 3 − 3/(n + 1)
  pièges : g5_reindex_half, g5_telescope_ends

```

### Niveau 3

```
Calcule Σ_{k=1}^{n} ln(1 + 1/k) en fonction de n (somme télescopique).
  [tap, suivre l'erreur, menu telescope]  Σ_{k=1}^{n} ln(1 + 1/k)
    = Σ_{k=1}^{n} (ln(k + 1) − ln(k))   ← Décomposer
    (Les termes : (ln 2 − ln 1) + (ln 3 − ln 2) + … + (ln(n + 1) − ln n))
    = ln(n + 1) − ln(1)   ← Télescoper : il reste le début et la fin
    = ln(n + 1)   ← Réduire
  aides : Écris le terme comme une différence : ln(1 + 1/k) = ln((k + 1)/k) = ln(k + 1) − ln k. | Écris les premiers et les derniers termes : (ln 2 − ln 1) + (ln 3 − ln 2) + … + (ln(n + 1) − ln n). Presque tout s'annule. | ln(n + 1) − ln(1)
  pièges : g5_reindex_half

Calcule Σ_{k=1}^{n} 1/(√(k + 1) + √(k)) en fonction de n (somme télescopique).
  [tap, suivre l'erreur, menu telescope]  Σ_{k=1}^{n} 1/(√(k + 1) + √(k))
    = Σ_{k=1}^{n} (√(k + 1) − √(k))   ← Décomposer
    (Les termes : (√2 − √1) + (√3 − √2) + … + (√(n + 1) − √n))
    = √(n + 1) − 1   ← Télescoper : il reste le début et la fin
  aides : Écris le terme comme une différence : 1/(√(k + 1) + √k) = √(k + 1) − √k (multiplier par la quantité conjuguée). | Écris les premiers et les derniers termes : (√2 − √1) + (√3 − √2) + … + (√(n + 1) − √n). Presque tout s'annule. | √(n + 1) − 1
  pièges : g5_reindex_half

Calcule Σ_{k=1}^{n} 2/(k(k + 2)) en fonction de n (somme télescopique).
  [tap, suivre l'erreur, menu telescope]  Σ_{k=1}^{n} 2/(k(k + 2))
    = Σ_{k=1}^{n} (1/k − 1/(k + 2))   ← Décomposer
    (Les termes : (1 − 1/3) + (1/2 − 1/4) + (1/3 − 1/5) + … + (1/(n − 1) − 1/(n + 1)) + (1/n − 1/(n + 2)))
    = 3/2 − 1/(n + 1) − 1/(n + 2)   ← Télescoper : il reste le début et la fin
  aides : Écris le terme comme une différence : 2/(k(k + 2)) = 1/k − 1/(k + 2). | Écris les premiers et les derniers termes : (1 − 1/3) + (1/2 − 1/4) + (1/3 − 1/5) + … + (1/(n − 1) − 1/(n + 1)) + (1/n − 1/(n + 2)). Presque tout s'annule. | 3/2 − 1/(n + 1) − 1/(n + 2)
  pièges : g5_reindex_half

```

### Niveau 4

```
Calcule Σ_{k=1}^{n} 2/(k(k + 2)) en fonction de n (somme télescopique).
  [free, suivre l'erreur]  Σ_{k=1}^{n} 2/(k(k + 2))
    = Σ_{k=1}^{n} (1/k − 1/(k + 2))   ← Décomposer
    (Les termes : (1 − 1/3) + (1/2 − 1/4) + (1/3 − 1/5) + … + (1/(n − 1) − 1/(n + 1)) + (1/n − 1/(n + 2)))
    = 3/2 − 1/(n + 1) − 1/(n + 2)   ← Télescoper : il reste le début et la fin
  aides : Écris le terme comme une différence : 2/(k(k + 2)) = 1/k − 1/(k + 2). | Écris les premiers et les derniers termes : (1 − 1/3) + (1/2 − 1/4) + (1/3 − 1/5) + … + (1/(n − 1) − 1/(n + 1)) + (1/n − 1/(n + 2)). Presque tout s'annule. | 3/2 − 1/(n + 1) − 1/(n + 2)
  pièges : g5_reindex_half

Calcule Σ_{k=1}^{n} 2/(k(k + 2)) en fonction de n (somme télescopique).
  [free, suivre l'erreur]  Σ_{k=1}^{n} 2/(k(k + 2))
    = Σ_{k=1}^{n} (1/k − 1/(k + 2))   ← Décomposer
    (Les termes : (1 − 1/3) + (1/2 − 1/4) + (1/3 − 1/5) + … + (1/(n − 1) − 1/(n + 1)) + (1/n − 1/(n + 2)))
    = 3/2 − 1/(n + 1) − 1/(n + 2)   ← Télescoper : il reste le début et la fin
  aides : Écris le terme comme une différence : 2/(k(k + 2)) = 1/k − 1/(k + 2). | Écris les premiers et les derniers termes : (1 − 1/3) + (1/2 − 1/4) + (1/3 − 1/5) + … + (1/(n − 1) − 1/(n + 1)) + (1/n − 1/(n + 2)). Presque tout s'annule. | 3/2 − 1/(n + 1) − 1/(n + 2)
  pièges : g5_reindex_half

Calcule Σ_{k=1}^{n} 2/(k(k + 2)) en fonction de n (somme télescopique).
  [free, suivre l'erreur]  Σ_{k=1}^{n} 2/(k(k + 2))
    = Σ_{k=1}^{n} (1/k − 1/(k + 2))   ← Décomposer
    (Les termes : (1 − 1/3) + (1/2 − 1/4) + (1/3 − 1/5) + … + (1/(n − 1) − 1/(n + 1)) + (1/n − 1/(n + 2)))
    = 3/2 − 1/(n + 1) − 1/(n + 2)   ← Télescoper : il reste le début et la fin
  aides : Écris le terme comme une différence : 2/(k(k + 2)) = 1/k − 1/(k + 2). | Écris les premiers et les derniers termes : (1 − 1/3) + (1/2 − 1/4) + (1/3 − 1/5) + … + (1/(n − 1) − 1/(n + 1)) + (1/n − 1/(n + 2)). Presque tout s'annule. | 3/2 − 1/(n + 1) − 1/(n + 2)
  pièges : g5_reindex_half

```

### Niveau 5

```
Calcule S(n) = Σ_{k=1}^{n} 3/(k(k + 1)) en fonction de n, puis S(16).
  [free, sans aide]  Σ_{k=1}^{n} 3/(k(k + 1))
    = Σ_{k=1}^{n} (3/k − 3/(k + 1))   ← Décomposer
    (Les termes : (3 − 3/2) + (3/2 − 3/3) + … + (3/n − 3/(n + 1)))
    = 3 − 3/(n + 1)   ← Télescoper : il reste le début et la fin
    = 3n/(n + 1)   ← Réduire
  — Valeur pour n = 16 :  [juge value]  départ : S_16
    = 48/17   ← n = 16
  pièges : g5_reindex_half

Calcule S(n) = Σ_{k=1}^{n} 2/(k(k + 2)) en fonction de n, puis S(19).
  [free, sans aide]  Σ_{k=1}^{n} 2/(k(k + 2))
    = Σ_{k=1}^{n} (1/k − 1/(k + 2))   ← Décomposer
    (Les termes : (1 − 1/3) + (1/2 − 1/4) + (1/3 − 1/5) + … + (1/(n − 1) − 1/(n + 1)) + (1/n − 1/(n + 2)))
    = 3/2 − 1/(n + 1) − 1/(n + 2)   ← Télescoper : il reste le début et la fin
  — Valeur pour n = 19 :  [juge value]  départ : S_19
    = 589/420   ← n = 19
  pièges : g5_reindex_half

Calcule S(n) = Σ_{k=1}^{n} 2/(k(k + 1)) en fonction de n, puis S(9).
  [free, sans aide]  Σ_{k=1}^{n} 2/(k(k + 1))
    = Σ_{k=1}^{n} (2/k − 2/(k + 1))   ← Décomposer
    (Les termes : (2 − 2/2) + (2/2 − 2/3) + … + (2/n − 2/(n + 1)))
    = 2 − 2/(n + 1)   ← Télescoper : il reste le début et la fin
    = 2n/(n + 1)   ← Réduire
  — Valeur pour n = 9 :  [juge value]  départ : S_9
    = 9/5   ← n = 9
  pièges : g5_reindex_half

```

### Variantes d'examen

```
Avec j = k − 1, Σ_{k=2}^{n + 1} (k − 1) =
  · Σ_{j=2}^{n + 1} j [g5_reindex_half]   ✔ Σ_{j=1}^{n} j   · Σ_{j=1}^{n} (j − 1) [g5_reindex_half]   · Σ_{j=1}^{n + 1} j
  [examen mcq]
  pièges : g5_reindex_half

Calcule S(n) = Σ_{k=1}^{n} 3/(k(k + 1)) en fonction de n, puis S(7).
  [free, sans aide, examen open]  Σ_{k=1}^{n} 3/(k(k + 1))
    = Σ_{k=1}^{n} (3/k − 3/(k + 1))   ← Décomposer
    (Les termes : (3 − 3/2) + (3/2 − 3/3) + … + (3/n − 3/(n + 1)))
    = 3 − 3/(n + 1)   ← Télescoper : il reste le début et la fin
    = 3n/(n + 1)   ← Réduire
  — Valeur pour n = 7 :  [juge value]  départ : S_7
    = 21/8   ← n = 7
  pièges : g5_reindex_half

```

## Suites arithmétiques (`g5-arith`, Gymnase)

_uₙ = u₁ + (n − 1)r ; somme = nombre de termes × moyenne._

### Niveau 1

```
Suite arithmétique : u₁ = 10, r = −3. Calcule u₃₁.
  [guided]  u_31
    = 10 + □·(−3)   (trous : 10 + 30·(−3))   ← De u₁ à u₃₁, on ajoute 30 fois r
    = −80   ← Calculer
  aides : De u₁ à u₃₁, on ajoute 30 fois r. Puis : nombre de termes × (premier + dernier)/2. | u₃₁ = 10 + 30·(−3) | 10 + 30·(−3)
  pièges : g5_arith_half

Suite arithmétique : u₁ = 4, r = −3. Calcule u₂₁.
  [guided]  u_21
    = 4 + □·(−3)   (trous : 4 + 20·(−3))   ← De u₁ à u₂₁, on ajoute 20 fois r
    = −56   ← Calculer
  aides : De u₁ à u₂₁, on ajoute 20 fois r. Puis : nombre de termes × (premier + dernier)/2. | u₂₁ = 4 + 20·(−3) | 4 + 20·(−3)
  pièges : g5_arith_half

Suite arithmétique : u₁ = −7, r = 3. Calcule u₁₉.
  [guided]  u_19
    = −7 + □·3   (trous : −7 + 18·3)   ← De u₁ à u₁₉, on ajoute 18 fois r
    = 47   ← Calculer
  aides : De u₁ à u₁₉, on ajoute 18 fois r. Puis : nombre de termes × (premier + dernier)/2. | u₁₉ = −7 + 18·3 | −7 + 18·3
  pièges : g5_arith_half

```

### Niveau 2

```
Suite arithmétique : u₃ = 0 et u₈ = 15. Trouve la raison r, puis u₁.
  [guided]  r
    = (15 − 0)/(□)   (trous : (15 − 0)/(8 − 3))   ← De u₃ à u₈ : 5 fois r
    = 3   ← Calculer
  — u₁ = ?  [juge value]  départ : u_1
    = 0 − 2·3   ← De u₁ à u₃ : 2 fois r
    = −6   ← Calculer
  aides : Entre u₃ et u₈, on ajoute 5 fois r. | r = (15 − 0)/(8 − 3) | (15 − 0)/(8 − 3)

Suite arithmétique : u₃ = −10 et u₅ = −18. Trouve la raison r, puis u₁.
  [guided]  r
    = (−18 − (−10))/(□)   (trous : (−18 − (−10))/(5 − 3))   ← De u₃ à u₅ : 2 fois r
    = −4   ← Calculer
  — u₁ = ?  [juge value]  départ : u_1
    = −10 − 2·(−4)   ← De u₁ à u₃ : 2 fois r
    = −2   ← Calculer
  aides : Entre u₃ et u₅, on ajoute 2 fois r. | r = (−18 − (−10))/(5 − 3) | (−18 − (−10))/(5 − 3)

Suite arithmétique : u₆ = 20 et u₉ = 29. Trouve la raison r, puis u₁.
  [guided]  r
    = (29 − 20)/(□)   (trous : (29 − 20)/(9 − 6))   ← De u₆ à u₉ : 3 fois r
    = 3   ← Calculer
  — u₁ = ?  [juge value]  départ : u_1
    = 20 − 5·3   ← De u₁ à u₆ : 5 fois r
    = 5   ← Calculer
  aides : Entre u₆ et u₉, on ajoute 3 fois r. | r = (29 − 20)/(9 − 6) | (29 − 20)/(9 − 6)

```

### Niveau 3

```
Suite arithmétique : u₁ = 2, r = 1. Calcule u₁₄, puis S = u₁ + u₂ + … + u₁₄.
  [tap, suivre l'erreur]  u_14
    ? Combien de termes dans u₁ + … + u₁₄ ? ✔ 14 / · 13 / · 15
    = 2 + 13·1   ← De u₁ à u₁₄, on ajoute 13 fois r
    = 15   ← Calculer
  — S = u₁ + … + u₁₄ = ?  [juge value]  départ : S
    = 14·(2 + 15)/2   ← 14 termes × (premier + dernier)/2
    = 119   ← Calculer
  aides : De u₁ à u₁₄, on ajoute 13 fois r. Puis : nombre de termes × (premier + dernier)/2. | u₁₄ = 2 + 13·1 | 2 + 13·1
  pièges : g5_arith_half, g5_count_terms

Suite arithmétique : u₁ = −10, r = 4. Calcule u₃₁, puis S = u₁ + u₂ + … + u₃₁.
  [tap, suivre l'erreur]  u_31
    ? Combien de termes dans u₁ + … + u₃₁ ? ✔ 31 / · 30 / · 32
    = −10 + 30·4   ← De u₁ à u₃₁, on ajoute 30 fois r
    = 110   ← Calculer
  — S = u₁ + … + u₃₁ = ?  [juge value]  départ : S
    = 31·(−10 + 110)/2   ← 31 termes × (premier + dernier)/2
    = 1550   ← Calculer
  aides : De u₁ à u₃₁, on ajoute 30 fois r. Puis : nombre de termes × (premier + dernier)/2. | u₃₁ = −10 + 30·4 | −10 + 30·4
  pièges : g5_arith_half, g5_count_terms

Suite arithmétique : u₁ = −4, r = −2. Calcule u₁₉, puis S = u₁ + u₂ + … + u₁₉.
  [tap, suivre l'erreur]  u_19
    ? Combien de termes dans u₁ + … + u₁₉ ? ✔ 19 / · 18 / · 20
    = −4 + 18·(−2)   ← De u₁ à u₁₉, on ajoute 18 fois r
    = −40   ← Calculer
  — S = u₁ + … + u₁₉ = ?  [juge value]  départ : S
    = 19·(−4 + (−40))/2   ← 19 termes × (premier + dernier)/2
    = −418   ← Calculer
  aides : De u₁ à u₁₉, on ajoute 18 fois r. Puis : nombre de termes × (premier + dernier)/2. | u₁₉ = −4 + 18·(−2) | −4 + 18·(−2)
  pièges : g5_arith_half, g5_count_terms

```

### Niveau 4

```
Le premier mois, tu épargnes 100 francs ; chaque mois, 5 francs de plus que le mois précédent. Combien épargnes-tu le 9e mois, et combien en tout après 9 mois ?
  [free, suivre l'erreur]  u_9
    = 100 + 8·5   ← De u₁ à u₉, on ajoute 8 fois r
    = 140   ← Calculer
  — S = u₁ + … + u₉ = ?  [juge value]  départ : S
    = 9·(100 + 140)/2   ← 9 termes × (premier + dernier)/2
    = 1080   ← Calculer
  aides : C'est une suite arithmétique : u₁ = 100, r = 5. | u₉ = 100 + 8·5 | 9·(100 + 140)/2
  pièges : g5_arith_half

Une salle a 18 rangées. La première a 18 sièges, et chaque rangée en a 3 de plus que la précédente. Combien de sièges a la dernière rangée, et combien en tout ?
  [free, suivre l'erreur]  u_18
    = 18 + 17·3   ← De u₁ à u₁₈, on ajoute 17 fois r
    = 69   ← Calculer
  — S = u₁ + … + u₁₈ = ?  [juge value]  départ : S
    = 18·(18 + 69)/2   ← 18 termes × (premier + dernier)/2
    = 783   ← Calculer
  aides : C'est une suite arithmétique : u₁ = 18, r = 3. | u₁₈ = 18 + 17·3 | 18·(18 + 69)/2
  pièges : g5_arith_half

Une salle a 22 rangées. La première a 22 sièges, et chaque rangée en a 3 de plus que la précédente. Combien de sièges a la dernière rangée, et combien en tout ?
  [free, suivre l'erreur]  u_22
    = 22 + 21·3   ← De u₁ à u₂₂, on ajoute 21 fois r
    = 85   ← Calculer
  — S = u₁ + … + u₂₂ = ?  [juge value]  départ : S
    = 22·(22 + 85)/2   ← 22 termes × (premier + dernier)/2
    = 1177   ← Calculer
  aides : C'est une suite arithmétique : u₁ = 22, r = 3. | u₂₂ = 22 + 21·3 | 22·(22 + 85)/2
  pièges : g5_arith_half

```

### Niveau 5

```
Sur 7 ans. Placement A : 120 francs la 1re année, puis 20 de plus chaque année. Placement B : 4 francs la 1re année, puis le double chaque année. Calcule le total de chaque placement, puis S_B − S_A.
  [free, sans aide]  S_A
    = 7·(120 + 240)/2   ← Somme arithmétique
    = 1260   ← Calculer
  — Placement B :  [juge value]  départ : S_B
    = 4(2⁷ − 1)/(2 − 1)   ← Somme géométrique
    = 508   ← Calculer
  — Comparer :  [juge value]  départ : D
    = −752   ← A rapporte plus
  pièges : g5_count_terms, g5_arith_half

Sur 7 ans. Placement A : 50 francs la 1re année, puis 30 de plus chaque année. Placement B : 5 francs la 1re année, puis le double chaque année. Calcule le total de chaque placement, puis S_B − S_A.
  [free, sans aide]  S_A
    = 7·(50 + 230)/2   ← Somme arithmétique
    = 980   ← Calculer
  — Placement B :  [juge value]  départ : S_B
    = 5(2⁷ − 1)/(2 − 1)   ← Somme géométrique
    = 635   ← Calculer
  — Comparer :  [juge value]  départ : D
    = −345   ← A rapporte plus
  pièges : g5_count_terms, g5_arith_half

Sur 9 ans. Placement A : 130 francs la 1re année, puis 30 de plus chaque année. Placement B : 4 francs la 1re année, puis le double chaque année. Calcule le total de chaque placement, puis S_B − S_A.
  [free, sans aide]  S_A
    = 9·(130 + 370)/2   ← Somme arithmétique
    = 2250   ← Calculer
  — Placement B :  [juge value]  départ : S_B
    = 4(2⁹ − 1)/(2 − 1)   ← Somme géométrique
    = 2044   ← Calculer
  — Comparer :  [juge value]  départ : D
    = −206   ← A rapporte plus
  pièges : g5_count_terms, g5_arith_half

```

### Variantes d'examen

```
Suite arithmétique : u₁ = 8, r = 1. Que vaut u₁ + u₂ + … + u₃₅ ?
  · 833 [g5_count_terms]   ✔ 875   · 1750 [g5_arith_half]   · 1785/2 [g5_arith_half]
  [examen mcq]
  pièges : g5_arith_half, g5_count_terms

```

## Suites géométriques (`g5-geom`, Gymnase)

_uₙ = u₀qⁿ ; somme u₀(qᴺ − 1)/(q − 1) ; somme infinie si |q| < 1._

### Niveau 1

```
Suite géométrique : u₀ = 4, q = 2/3. Calcule u₅.
  [guided]  u_5
    = 4·(2/3)^□   (trous : 4·(2/3)⁵)   ← uₙ = u₀qⁿ avec n = 5
    = 128/243   ← Calculer
  aides : De u₀ à u₅, on multiplie 5 fois par q. | u₅ = 4·(2/3)^… | 4·(2/3)⁵
  pièges : g5_geom_offset

Suite géométrique : u₀ = 3, q = 1/2. Calcule u₈.
  [guided]  u_8
    = 3·(1/2)^□   (trous : 3·(1/2)⁸)   ← uₙ = u₀qⁿ avec n = 8
    = 3/256   ← Calculer
  aides : De u₀ à u₈, on multiplie 8 fois par q. | u₈ = 3·(1/2)^… | 3·(1/2)⁸
  pièges : g5_geom_offset

Suite géométrique : u₀ = 3, q = −1/2. Calcule u₈.
  [guided]  u_8
    = 3·(−1/2)^□   (trous : 3·(−1/2)⁸)   ← uₙ = u₀qⁿ avec n = 8
    = 3/256   ← Calculer
  aides : De u₀ à u₈, on multiplie 8 fois par q. | u₈ = 3·(−1/2)^… | 3·(−1/2)⁸
  pièges : g5_geom_offset

```

### Niveau 2

```
Suite géométrique de premier terme u₀ = 5 et de raison q = 2. Calcule S = 5 + 10 + … + 5·2³.
  [guided]  S
    = 5(2^□ − 1)/(2 − 1)   (trous : 5(2⁴ − 1)/(2 − 1))   ← 4 termes : N = 4
    = 75   ← Calculer
  aides : Compte les termes : de q⁰ à q³, il y en a 4. | S = u₀(q^N − 1)/(q − 1) avec N = … | 5(2⁴ − 1)/(2 − 1)
  pièges : g5_geom_offset

Suite géométrique de premier terme u₀ = 2 et de raison q = 1/2. Calcule S = 2 + 1 + … + 2·(1/2)⁶.
  [guided]  S
    = 2((1/2)^□ − 1)/(1/2 − 1)   (trous : 2((1/2)⁷ − 1)/(1/2 − 1))   ← 7 termes : N = 7
    = 127/32   ← Calculer
  aides : Compte les termes : de q⁰ à q⁶, il y en a 7. | S = u₀(q^N − 1)/(q − 1) avec N = … | 2((1/2)⁷ − 1)/(1/2 − 1)
  pièges : g5_geom_offset

Suite géométrique de premier terme u₀ = 5 et de raison q = −1/2. Calcule S = 5 − 5/2 + … + 5·(−1/2)⁷.
  [guided]  S
    = 5((−1/2)^□ − 1)/(−1/2 − 1)   (trous : 5((−1/2)⁸ − 1)/(−1/2 − 1))   ← 8 termes : N = 8
    = 425/128   ← Calculer
  aides : Compte les termes : de q⁰ à q⁷, il y en a 8. | S = u₀(q^N − 1)/(q − 1) avec N = … | 5((−1/2)⁸ − 1)/(−1/2 − 1)
  pièges : g5_geom_offset

```

### Niveau 3

```
Suite géométrique de premier terme u₀ = 4 et de raison q = −2. Calcule S = 4 − 8 + … + 4·(−2)⁵.
  [tap, suivre l'erreur]  S
    ? Quel exposant dans u₀(q^N − 1)/(q − 1) ? ✔ N = 6 / · N = 5 / · N = 7
    = 4((−2)⁶ − 1)/(−2 − 1)   ← 6 termes : N = 6
    = −84   ← Calculer
  aides : Compte les termes : de q⁰ à q⁵, il y en a 6. | S = u₀(q^N − 1)/(q − 1) avec N = … | 4((−2)⁶ − 1)/(−2 − 1)
  pièges : g5_geom_offset

Suite géométrique de premier terme u₀ = 6 et de raison q = 1/3. Calcule S = 6 + 2 + … + 6·(1/3)⁴.
  [tap, suivre l'erreur]  S
    ? Quel exposant dans u₀(q^N − 1)/(q − 1) ? ✔ N = 5 / · N = 4 / · N = 6
    = 6((1/3)⁵ − 1)/(1/3 − 1)   ← 5 termes : N = 5
    = 242/27   ← Calculer
  aides : Compte les termes : de q⁰ à q⁴, il y en a 5. | S = u₀(q^N − 1)/(q − 1) avec N = … | 6((1/3)⁵ − 1)/(1/3 − 1)
  pièges : g5_geom_offset

Suite géométrique de premier terme u₀ = 6 et de raison q = 1/3. Calcule S = 6 + 2 + … + 6·(1/3)⁴.
  [tap, suivre l'erreur]  S
    ? Quel exposant dans u₀(q^N − 1)/(q − 1) ? ✔ N = 5 / · N = 4 / · N = 6
    = 6((1/3)⁵ − 1)/(1/3 − 1)   ← 5 termes : N = 5
    = 242/27   ← Calculer
  aides : Compte les termes : de q⁰ à q⁴, il y en a 5. | S = u₀(q^N − 1)/(q − 1) avec N = … | 6((1/3)⁵ − 1)/(1/3 − 1)
  pièges : g5_geom_offset

```

### Niveau 4

```
Suite géométrique de premier terme u₀ = 6 et de raison q = 3. Calcule S = 6 + 18 + … + 6·3⁴.
  [free, suivre l'erreur]  S
    = 6(3⁵ − 1)/(3 − 1)   ← 5 termes : N = 5
    = 726   ← Calculer
  aides : Compte les termes : de q⁰ à q⁴, il y en a 5. | S = u₀(q^N − 1)/(q − 1) avec N = … | 6(3⁵ − 1)/(3 − 1)
  pièges : g5_geom_offset

Calcule la somme infinie 5 + 15/4 + 45/16 + …
  [free, suivre l'erreur]  S
    = 5/(1 − (3/4))   ← |q| = 3/4 < 1 : u₀/(1 − q)
    = 20   ← Calculer
  aides : Trouve la raison q : le quotient de deux termes qui se suivent. Si |q| < 1, la somme infinie vaut u₀/(1 − q). | q = 3/4, donc S = 5/(1 − …) | 5/(1 − (3/4))

Suite géométrique de premier terme u₀ = 5 et de raison q = 3. Calcule S = 5 + 15 + … + 5·3⁴.
  [free, suivre l'erreur]  S
    = 5(3⁵ − 1)/(3 − 1)   ← 5 termes : N = 5
    = 605   ← Calculer
  aides : Compte les termes : de q⁰ à q⁴, il y en a 5. | S = u₀(q^N − 1)/(q − 1) avec N = … | 5(3⁵ − 1)/(3 − 1)
  pièges : g5_geom_offset

```

### Niveau 5

```
Une balle tombe d'une hauteur de 4 m. Après chaque rebond, elle remonte aux 3/4 de la hauteur précédente. (a) Écris la distance Dₙ parcourue jusqu'au n-ième contact avec le sol, sans Σ. (b) Quelle est la distance totale ?
  [free, sans aide]  4 + 2·Σ_{k=1}^{n − 1} 4·(3/4)^k
    (Descente de 4 m, puis pour chaque rebond k = 1, …, n − 1 : montée et descente de 4·(3/4)ᵏ.)
    = 4 + 2·4·(3/4)·(1 − (3/4)^(n − 1))/(1 − 3/4)   ← Somme géométrique de n − 1 termes
    = 4 + 24(1 − (3/4)^(n − 1))   ← Simplifier
  — (b) Distance totale (n → ∞) :  [juge value]  départ : D
    = 4 + 24   ← |3/4| < 1 : (3/4)ⁿ⁻¹ → 0
    = 28   ← Calculer
  pièges : g5_reindex_half

Une balle tombe d'une hauteur de 4 m. Après chaque rebond, elle remonte aux 3/4 de la hauteur précédente. (a) Écris la distance Dₙ parcourue jusqu'au n-ième contact avec le sol, sans Σ. (b) Quelle est la distance totale ?
  [free, sans aide]  4 + 2·Σ_{k=1}^{n − 1} 4·(3/4)^k
    (Descente de 4 m, puis pour chaque rebond k = 1, …, n − 1 : montée et descente de 4·(3/4)ᵏ.)
    = 4 + 2·4·(3/4)·(1 − (3/4)^(n − 1))/(1 − 3/4)   ← Somme géométrique de n − 1 termes
    = 4 + 24(1 − (3/4)^(n − 1))   ← Simplifier
  — (b) Distance totale (n → ∞) :  [juge value]  départ : D
    = 4 + 24   ← |3/4| < 1 : (3/4)ⁿ⁻¹ → 0
    = 28   ← Calculer
  pièges : g5_reindex_half

Une balle tombe d'une hauteur de 3 m. Après chaque rebond, elle remonte aux 1/2 de la hauteur précédente. (a) Écris la distance Dₙ parcourue jusqu'au n-ième contact avec le sol, sans Σ. (b) Quelle est la distance totale ?
  [free, sans aide]  3 + 2·Σ_{k=1}^{n − 1} 3·(1/2)^k
    (Descente de 3 m, puis pour chaque rebond k = 1, …, n − 1 : montée et descente de 3·(1/2)ᵏ.)
    = 3 + 2·3·(1/2)·(1 − (1/2)^(n − 1))/(1 − 1/2)   ← Somme géométrique de n − 1 termes
    = 3 + 6(1 − (1/2)^(n − 1))   ← Simplifier
  — (b) Distance totale (n → ∞) :  [juge value]  départ : D
    = 3 + 6   ← |1/2| < 1 : (1/2)ⁿ⁻¹ → 0
    = 9   ← Calculer
  pièges : g5_reindex_half

```

### Variantes d'examen

```
Suite géométrique, u₀ = 2, q = 3. S = 2 + 6 + … + 2·3⁵ vaut :
  ✔ 728   · 242 [g5_geom_offset]   · 1458   · 2186 [g5_geom_offset]
  [examen mcq]
  pièges : g5_geom_offset

Une balle tombe d'une hauteur de 3 m. Après chaque rebond, elle remonte aux 3/4 de la hauteur précédente. (a) Écris la distance Dₙ parcourue jusqu'au n-ième contact avec le sol, sans Σ. (b) Quelle est la distance totale ?
  [free, sans aide, examen open]  3 + 2·Σ_{k=1}^{n − 1} 3·(3/4)^k
    (Descente de 3 m, puis pour chaque rebond k = 1, …, n − 1 : montée et descente de 3·(3/4)ᵏ.)
    = 3 + 2·3·(3/4)·(1 − (3/4)^(n − 1))/(1 − 3/4)   ← Somme géométrique de n − 1 termes
    = 3 + 18(1 − (3/4)^(n − 1))   ← Simplifier
  — (b) Distance totale (n → ∞) :  [juge value]  départ : D
    = 3 + 18   ← |3/4| < 1 : (3/4)ⁿ⁻¹ → 0
    = 21   ← Calculer
  pièges : g5_reindex_half

```

## Charpente d'une récurrence (`g5-induction-frame`, Gymnase)

_Initialisation, hérédité, conclusion. On ne suppose jamais P(n + 1)._

### Niveau 1

```
Récurrence : Σk=1^(n) (2k − 1) = n² pour tout n ≥ 1.Initialisation : pour n = 1, Σk=1^1 (2k − 1) = 1 = 1². ✓Hérédité : supposons Σk=1^(n) (2k − 1) = n² pour un n ≥ 1.…n² + 2n + 1 = (n + 1)² : P(n + 1) est vraie.Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.Quelle ligne manque ?
  · Hérédité : supposons Σk=1^(n+1) (2k − 1) = (n + 1)². [g5_induction_circular]   ✔ Alors Σk=1^(n+1) (2k − 1) = n² + (2(n + 1) − 1) = n² + 2n + 1.
  pièges : g5_induction_circular

Récurrence : Σk=1^(n) (2k − 1) = n² pour tout n ≥ 1.Initialisation : pour n = 1, Σk=1^1 (2k − 1) = 1 = 1². ✓Hérédité : supposons Σk=1^(n) (2k − 1) = n² pour un n ≥ 1.…n² + 2n + 1 = (n + 1)² : P(n + 1) est vraie.Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.Quelle ligne manque ?
  ✔ Alors Σk=1^(n+1) (2k − 1) = n² + (2(n + 1) − 1) = n² + 2n + 1.   · Hérédité : supposons Σk=1^(n+1) (2k − 1) = (n + 1)². [g5_induction_circular]
  pièges : g5_induction_circular

Récurrence : Σk=1^(n) (2k − 1) = n² pour tout n ≥ 1.Initialisation : pour n = 1, Σk=1^1 (2k − 1) = 1 = 1². ✓Hérédité : supposons Σk=1^(n) (2k − 1) = n² pour un n ≥ 1.…n² + 2n + 1 = (n + 1)² : P(n + 1) est vraie.Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.Quelle ligne manque ?
  ✔ Alors Σk=1^(n+1) (2k − 1) = n² + (2(n + 1) − 1) = n² + 2n + 1.   · Hérédité : supposons Σk=1^(n+1) (2k − 1) = (n + 1)². [g5_induction_circular]
  pièges : g5_induction_circular

```

### Niveau 2

```
Montre par récurrence : Σk=1^(n) k = n(n + 1)/2 pour tout n ≥ 1. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Initialisation : pour n = 1, Σk=1^1 k = 1 = 1·2/2. ✓
    2. Hérédité : supposons Σk=1^(n) k = n(n + 1)/2 pour un n ≥ 1.
    3. Alors Σk=1^(n+1) k = n(n + 1)/2 + (n + 1).
    4. n(n + 1)/2 + (n + 1) = (n + 1)(n + 2)/2 : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
  pièges : g5_induction_no_base

Montre par récurrence : 2ⁿ ≥ n + 1 pour tout n ≥ 0. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Initialisation : pour n = 0, 2⁰ = 1 ≥ 0 + 1. ✓
    2. Hérédité : supposons 2ⁿ ≥ n + 1 pour un n ≥ 0.
    3. Alors 2ⁿ⁺¹ = 2·2ⁿ ≥ 2(n + 1).
    4. 2(n + 1) = 2n + 2 ≥ n + 2 : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
  pièges : g5_induction_no_base

Montre par récurrence : 2ⁿ ≥ n + 1 pour tout n ≥ 0. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Initialisation : pour n = 0, 2⁰ = 1 ≥ 0 + 1. ✓
    2. Hérédité : supposons 2ⁿ ≥ n + 1 pour un n ≥ 0.
    3. Alors 2ⁿ⁺¹ = 2·2ⁿ ≥ 2(n + 1).
    4. 2(n + 1) = 2n + 2 ≥ n + 2 : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.
    ✗ C'est vrai pour n = 0, 1 et 2, donc pour tout n. [g9_proof_by_example]
  pièges : g9_proof_by_example

```

### Niveau 3

```
Montre par récurrence : Σk=1^(n) k = n(n + 1)/2 pour tout n ≥ 1. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Que suppose-t-on dans l'hérédité ? ✔ P(n), pour un n ≥ n₀ / · P(n + 1) / · P(n) pour tout n
    1. Initialisation : pour n = 1, Σk=1^1 k = 1 = 1·2/2. ✓
    2. Hérédité : supposons Σk=1^(n) k = n(n + 1)/2 pour un n ≥ 1.
    3. Alors Σk=1^(n+1) k = n(n + 1)/2 + (n + 1).
    4. n(n + 1)/2 + (n + 1) = (n + 1)(n + 2)/2 : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.
    ✗ Hérédité : supposons Σk=1^(n+1) k = (n + 1)(n + 2)/2. [g5_induction_circular]
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
  pièges : g5_induction_circular, g5_induction_no_base

Montre par récurrence : Σk=1^(n) k = n(n + 1)/2 pour tout n ≥ 1. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Que suppose-t-on dans l'hérédité ? ✔ P(n), pour un n ≥ n₀ / · P(n + 1) / · P(n) pour tout n
    1. Initialisation : pour n = 1, Σk=1^1 k = 1 = 1·2/2. ✓
    2. Hérédité : supposons Σk=1^(n) k = n(n + 1)/2 pour un n ≥ 1.
    3. Alors Σk=1^(n+1) k = n(n + 1)/2 + (n + 1).
    4. n(n + 1)/2 + (n + 1) = (n + 1)(n + 2)/2 : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
    ✗ Hérédité : supposons Σk=1^(n+1) k = (n + 1)(n + 2)/2. [g5_induction_circular]
  pièges : g5_induction_no_base, g5_induction_circular

Montre par récurrence : Σk=1^(n) k = n(n + 1)/2 pour tout n ≥ 1. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Que suppose-t-on dans l'hérédité ? ✔ P(n), pour un n ≥ n₀ / · P(n + 1) / · P(n) pour tout n
    1. Initialisation : pour n = 1, Σk=1^1 k = 1 = 1·2/2. ✓
    2. Hérédité : supposons Σk=1^(n) k = n(n + 1)/2 pour un n ≥ 1.
    3. Alors Σk=1^(n+1) k = n(n + 1)/2 + (n + 1).
    4. n(n + 1)/2 + (n + 1) = (n + 1)(n + 2)/2 : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
    ✗ Hérédité : supposons Σk=1^(n+1) k = (n + 1)(n + 2)/2. [g5_induction_circular]
  pièges : g5_induction_no_base, g5_induction_circular

```

### Niveau 4

```
Montre par récurrence : Σk=1^(n) k = n(n + 1)/2 pour tout n ≥ 1. Touche les blocs dans l'ordre de la preuve et complète le calcul.
  [blocs frame]
    1. Initialisation : pour n = 1, Σk=1^1 k = 1 = 1·2/2. ✓
    2. Hérédité : supposons Σk=1^(n) k = n(n + 1)/2 pour un n ≥ 1.
    3. Alors Σk=1^(n+1) k = n(n + 1)/2 + (n + 1).
    4. n(n + 1)/2 + (n + 1) = (n + 1)(n + 2)/2 : P(n + 1) est vraie.   [à écrire : n(n + 1)/2 + (n + 1) = (factorise) (n+1)(n+2)/2]
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.
    ✗ C'est vrai pour n = 1, 2 et 3, donc pour tout n. [g9_proof_by_example]
    ✗ Hérédité : supposons Σk=1^(n+1) k = (n + 1)(n + 2)/2. [g5_induction_circular]
  pièges : g9_proof_by_example, g5_induction_circular

Montre par récurrence : n ≤ n² pour tout n ≥ 1. Touche les blocs dans l'ordre de la preuve et complète le calcul.
  [blocs frame]
    1. Initialisation : pour n = 1, 1 ≤ 1². ✓
    2. Hérédité : supposons n ≤ n² pour un n ≥ 1.
    3. Alors (n + 1)² = n² + 2n + 1 ≥ n + 2n + 1.   [à écrire : (n + 1)² = n^2+2n+1]
    4. n + 2n + 1 ≥ n + 1 : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
    ✗ C'est vrai pour n = 1, 2 et 3, donc pour tout n. [g9_proof_by_example]
  pièges : g5_induction_no_base, g9_proof_by_example

Montre par récurrence : Σk=1^(n) k = n(n + 1)/2 pour tout n ≥ 1. Touche les blocs dans l'ordre de la preuve et complète le calcul.
  [blocs frame]
    1. Initialisation : pour n = 1, Σk=1^1 k = 1 = 1·2/2. ✓
    2. Hérédité : supposons Σk=1^(n) k = n(n + 1)/2 pour un n ≥ 1.
    3. Alors Σk=1^(n+1) k = n(n + 1)/2 + (n + 1).
    4. n(n + 1)/2 + (n + 1) = (n + 1)(n + 2)/2 : P(n + 1) est vraie.   [à écrire : n(n + 1)/2 + (n + 1) = (factorise) (n+1)(n+2)/2]
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.
    ✗ C'est vrai pour n = 1, 2 et 3, donc pour tout n. [g9_proof_by_example]
    ✗ Hérédité : supposons Σk=1^(n+1) k = (n + 1)(n + 2)/2. [g5_induction_circular]
  pièges : g9_proof_by_example, g5_induction_circular

```

### Niveau 5

```
Montre par récurrence : n ≤ n² pour tout n ≥ 1. Touche les blocs dans l'ordre de la preuve et complète le calcul.
  [blocs frame, sans aide]
    1. Initialisation : pour n = 1, 1 ≤ 1². ✓
    2. Hérédité : supposons n ≤ n² pour un n ≥ 1.
    3. Alors (n + 1)² = n² + 2n + 1 ≥ n + 2n + 1.   [à écrire : (n + 1)² = n^2+2n+1]
    4. n + 2n + 1 ≥ n + 1 : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
    ✗ Hérédité : supposons n + 1 ≤ (n + 1)². [g5_induction_circular]
    ✗ C'est vrai pour n = 1, 2 et 3, donc pour tout n. [g9_proof_by_example]
  pièges : g5_induction_no_base, g5_induction_circular, g9_proof_by_example

Montre par récurrence : n ≤ n² pour tout n ≥ 1. Touche les blocs dans l'ordre de la preuve et complète le calcul.
  [blocs frame, sans aide]
    1. Initialisation : pour n = 1, 1 ≤ 1². ✓
    2. Hérédité : supposons n ≤ n² pour un n ≥ 1.
    3. Alors (n + 1)² = n² + 2n + 1 ≥ n + 2n + 1.   [à écrire : (n + 1)² = n^2+2n+1]
    4. n + 2n + 1 ≥ n + 1 : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
    ✗ Hérédité : supposons n + 1 ≤ (n + 1)². [g5_induction_circular]
    ✗ C'est vrai pour n = 1, 2 et 3, donc pour tout n. [g9_proof_by_example]
  pièges : g5_induction_no_base, g5_induction_circular, g9_proof_by_example

Montre par récurrence : Σk=1^(n) k = n(n + 1)/2 pour tout n ≥ 1. Touche les blocs dans l'ordre de la preuve et complète le calcul.
  [blocs frame, sans aide]
    1. Initialisation : pour n = 1, Σk=1^1 k = 1 = 1·2/2. ✓
    2. Hérédité : supposons Σk=1^(n) k = n(n + 1)/2 pour un n ≥ 1.
    3. Alors Σk=1^(n+1) k = n(n + 1)/2 + (n + 1).
    4. n(n + 1)/2 + (n + 1) = (n + 1)(n + 2)/2 : P(n + 1) est vraie.   [à écrire : n(n + 1)/2 + (n + 1) = (factorise) (n+1)(n+2)/2]
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.
    ✗ Hérédité : supposons Σk=1^(n+1) k = (n + 1)(n + 2)/2. [g5_induction_circular]
    ✗ C'est vrai pour n = 1, 2 et 3, donc pour tout n. [g9_proof_by_example]
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
  pièges : g5_induction_circular, g9_proof_by_example, g5_induction_no_base

```

### Variantes d'examen

```
Montre par récurrence : Σk=1^(n) (2k − 1) = n² pour tout n ≥ 1. Touche les blocs dans l'ordre de la preuve et complète le calcul.
  [blocs frame, sans aide]
    1. Initialisation : pour n = 1, Σk=1^1 (2k − 1) = 1 = 1². ✓
    2. Hérédité : supposons Σk=1^(n) (2k − 1) = n² pour un n ≥ 1.
    3. Alors Σk=1^(n+1) (2k − 1) = n² + (2(n + 1) − 1) = n² + 2n + 1.   [à écrire : n² + (2(n + 1) − 1) = n^2+2n+1]
    4. n² + 2n + 1 = (n + 1)² : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.
    ✗ C'est vrai pour n = 1, 2 et 3, donc pour tout n. [g9_proof_by_example]
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
    ✗ Hérédité : supposons Σk=1^(n+1) (2k − 1) = (n + 1)². [g5_induction_circular]
  [examen open]
  pièges : g9_proof_by_example, g5_induction_no_base, g5_induction_circular

On montre par récurrence : 2ⁿ ≥ n + 1 pour tout n ≥ 0. Quelle phrase commence l'hérédité ?
  ✔ Supposons P(n) vraie pour un n ≥ 0.   · Vérifions P(0).   · Supposons P(n) vraie pour tout n. [g5_induction_circular]   · Supposons P(n + 1) vraie. [g5_induction_circular]
  [examen mcq]
  pièges : g5_induction_circular

```

## Récurrence : formules de sommes (`g5-induction-sum`, Gymnase)

_Séparer le dernier terme, utiliser l'hypothèse, factoriser._

### Niveau 1

```
On montre par récurrence que Σ_{k=1}^{n} k(k + 1) = n(n + 1)(n + 2)/3 pour tout n ≥ 1. Hérédité : on suppose la formule vraie au rang n. Écris Σ_{k=1}^{n + 1} k(k + 1) jusqu'à la formule au rang n + 1, (n + 1)(n + 2)(n + 3)/3.
  [guided]  Σ_{k=1}^{n} k(k + 1) + (n + 1)(n + 2)
    (Le dernier terme est séparé : Σ_{k=1}^{n + 1} k(k + 1) = Σ_{k=1}^{n} k(k + 1) + (n + 1)(n + 2).)
    = □ + (n + 1)(n + 2)   (trous : n(n + 1)(n + 2)/3 + (n + 1)(n + 2))   ← Hypothèse de récurrence
    = (n + 1)(n + 2)(n/3 + 1)   ← Mettre en facteur
    = (n + 1)(n + 2)(n + 3)/3   ← C'est la formule au rang n + 1
  aides : Sépare le terme k = n + 1, puis remplace la somme jusqu'à n par la formule supposée. | Σ_{k=1}^{n + 1} k(k + 1) = Σ_{k=1}^{n} k(k + 1) + (n + 1)(n + 2), puis mets en facteur ce qui est commun. | (n + 1)(n + 2)(n/3 + 1)
  pièges : g5_sum_product, g5_reindex_half

On montre par récurrence que Σ_{k=1}^{n} k(k + 1) = n(n + 1)(n + 2)/3 pour tout n ≥ 1. Hérédité : on suppose la formule vraie au rang n. Écris Σ_{k=1}^{n + 1} k(k + 1) jusqu'à la formule au rang n + 1, (n + 1)(n + 2)(n + 3)/3.
  [guided]  Σ_{k=1}^{n} k(k + 1) + (n + 1)(n + 2)
    (Le dernier terme est séparé : Σ_{k=1}^{n + 1} k(k + 1) = Σ_{k=1}^{n} k(k + 1) + (n + 1)(n + 2).)
    = □ + (n + 1)(n + 2)   (trous : n(n + 1)(n + 2)/3 + (n + 1)(n + 2))   ← Hypothèse de récurrence
    = (n + 1)(n + 2)(n/3 + 1)   ← Mettre en facteur
    = (n + 1)(n + 2)(n + 3)/3   ← C'est la formule au rang n + 1
  aides : Sépare le terme k = n + 1, puis remplace la somme jusqu'à n par la formule supposée. | Σ_{k=1}^{n + 1} k(k + 1) = Σ_{k=1}^{n} k(k + 1) + (n + 1)(n + 2), puis mets en facteur ce qui est commun. | (n + 1)(n + 2)(n/3 + 1)
  pièges : g5_sum_product, g5_reindex_half

On montre par récurrence que Σ_{k=1}^{n} (2k − 1) = n² pour tout n ≥ 1. Hérédité : on suppose la formule vraie au rang n. Écris Σ_{k=1}^{n + 1} (2k − 1) jusqu'à la formule au rang n + 1, (n + 1)².
  [guided]  Σ_{k=1}^{n} (2k − 1) + (2n + 1)
    (Le dernier terme est séparé : Σ_{k=1}^{n + 1} (2k − 1) = Σ_{k=1}^{n} (2k − 1) + (2n + 1).)
    = □ + 2n + 1   (trous : n² + 2n + 1)   ← Hypothèse de récurrence
    = (n + 1)²   ← C'est la formule au rang n + 1
  aides : Sépare le terme k = n + 1, puis remplace la somme jusqu'à n par la formule supposée. | Σ_{k=1}^{n + 1} (2k − 1) = Σ_{k=1}^{n} (2k − 1) + (2n + 1), puis mets en facteur ce qui est commun. | n² + 2n + 1
  pièges : g5_reindex_half, g5_telescope_ends

```

### Niveau 2

```
On montre par récurrence que Σ_{k=1}^{n} k = n(n + 1)/2 pour tout n ≥ 1. Hérédité : on suppose la formule vraie au rang n. Écris Σ_{k=1}^{n + 1} k jusqu'à la formule au rang n + 1, (n + 1)(n + 2)/2.
  [guided]  Σ_{k=1}^{n + 1} k
    ? Quel terme sépare-t-on de <math alttext="Σ_{k=1}^{n + 1} k"><mrow><munderover><mo>∑</mo><mrow><mi>k</mi><mo>=</mo><mn>1</mn></mrow><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow></munderover><mi>k</mi></mrow></math> ? ✔ Celui de k = n + 1 : (n + 1) / · Celui de k = n : n
    = Σ_{k=1}^{n} k + □   (trous : Σ_{k=1}^{n} k + (n + 1))   ← Séparer le dernier terme (k = n + 1)
    = n(n + 1)/2 + (n + 1)   ← Hypothèse de récurrence
    = (n + 1)(n/2 + 1)   ← Mettre en facteur
    = (n + 1)(n + 2)/2   ← C'est la formule au rang n + 1
  aides : Sépare le terme k = n + 1, puis remplace la somme jusqu'à n par la formule supposée. | Σ_{k=1}^{n + 1} k = Σ_{k=1}^{n} k + (n + 1), puis mets en facteur ce qui est commun. | (n + 1)(n/2 + 1)
  pièges : g5_hered_wrong_term, g5_reindex_half

On montre par récurrence que Σ_{k=1}^{n} (2k + 1) = n(n + 2) pour tout n ≥ 1. Hérédité : on suppose la formule vraie au rang n. Écris Σ_{k=1}^{n + 1} (2k + 1) jusqu'à la formule au rang n + 1, (n + 1)(n + 3).
  [guided]  Σ_{k=1}^{n + 1} (2k + 1)
    ? Quel terme sépare-t-on de <math alttext="Σ_{k=1}^{n + 1} (2k + 1)"><mrow><munderover><mo>∑</mo><mrow><mi>k</mi><mo>=</mo><mn>1</mn></mrow><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow></munderover><mrow><mo stretchy="false">(</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>k</mi></mrow><mo>+</mo><mn>1</mn></mrow><mo stretchy="false">)</mo></mrow></mrow></math> ? ✔ Celui de k = n + 1 : (2n + 3) / · Celui de k = n : (2n + 1)
    = Σ_{k=1}^{n} (2k + 1) + □   (trous : Σ_{k=1}^{n} (2k + 1) + (2n + 3))   ← Séparer le dernier terme (k = n + 1)
    = n(n + 2) + 2n + 3   ← Hypothèse de récurrence
    = n² + 4n + 3   ← Mettre en facteur
    = (n + 1)(n + 3)   ← C'est la formule au rang n + 1
  aides : Sépare le terme k = n + 1, puis remplace la somme jusqu'à n par la formule supposée. | Σ_{k=1}^{n + 1} (2k + 1) = Σ_{k=1}^{n} (2k + 1) + (2n + 3), puis mets en facteur ce qui est commun. | n² + 4n + 3
  pièges : g5_hered_wrong_term, g5_reindex_half

On montre par récurrence que Σ_{k=1}^{n} k = n(n + 1)/2 pour tout n ≥ 1. Hérédité : on suppose la formule vraie au rang n. Écris Σ_{k=1}^{n + 1} k jusqu'à la formule au rang n + 1, (n + 1)(n + 2)/2.
  [guided]  Σ_{k=1}^{n + 1} k
    ? Quel terme sépare-t-on de <math alttext="Σ_{k=1}^{n + 1} k"><mrow><munderover><mo>∑</mo><mrow><mi>k</mi><mo>=</mo><mn>1</mn></mrow><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow></munderover><mi>k</mi></mrow></math> ? ✔ Celui de k = n + 1 : (n + 1) / · Celui de k = n : n
    = Σ_{k=1}^{n} k + □   (trous : Σ_{k=1}^{n} k + (n + 1))   ← Séparer le dernier terme (k = n + 1)
    = n(n + 1)/2 + (n + 1)   ← Hypothèse de récurrence
    = (n + 1)(n/2 + 1)   ← Mettre en facteur
    = (n + 1)(n + 2)/2   ← C'est la formule au rang n + 1
  aides : Sépare le terme k = n + 1, puis remplace la somme jusqu'à n par la formule supposée. | Σ_{k=1}^{n + 1} k = Σ_{k=1}^{n} k + (n + 1), puis mets en facteur ce qui est commun. | (n + 1)(n/2 + 1)
  pièges : g5_hered_wrong_term, g5_reindex_half

```

### Niveau 3

```
On montre par récurrence que Σ_{k=1}^{n} k² = n(n + 1)(2n + 1)/6 pour tout n ≥ 1. Hérédité : on suppose la formule vraie au rang n. Écris Σ_{k=1}^{n + 1} k² jusqu'à la formule au rang n + 1, (n + 1)(n + 2)(2n + 3)/6.
  [tap, suivre l'erreur, menu induction]  Σ_{k=1}^{n + 1} k²
    = Σ_{k=1}^{n} k² + (n + 1)²   ← Séparer le dernier terme (k = n + 1)
    = n(n + 1)(2n + 1)/6 + (n + 1)²   ← Hypothèse de récurrence
    = (n + 1)(2n² + 7n + 6)/6   ← Mettre en facteur
    = (n + 1)(n + 2)(2n + 3)/6   ← C'est la formule au rang n + 1
  aides : Sépare le terme k = n + 1, puis remplace la somme jusqu'à n par la formule supposée. | Σ_{k=1}^{n + 1} k² = Σ_{k=1}^{n} k² + (n + 1)², puis mets en facteur ce qui est commun. | (n + 1)(2n² + 7n + 6)/6
  pièges : g5_sum_product, g5_hered_wrong_term, g5_reindex_half

On montre par récurrence que Σ_{k=1}^{n} (2k − 1) = n² pour tout n ≥ 1. Hérédité : on suppose la formule vraie au rang n. Écris Σ_{k=1}^{n + 1} (2k − 1) jusqu'à la formule au rang n + 1, (n + 1)².
  [tap, suivre l'erreur, menu induction]  Σ_{k=1}^{n + 1} (2k − 1)
    = Σ_{k=1}^{n} (2k − 1) + (2n + 1)   ← Séparer le dernier terme (k = n + 1)
    = n² + 2n + 1   ← Hypothèse de récurrence
    = (n + 1)²   ← C'est la formule au rang n + 1
  aides : Sépare le terme k = n + 1, puis remplace la somme jusqu'à n par la formule supposée. | Σ_{k=1}^{n + 1} (2k − 1) = Σ_{k=1}^{n} (2k − 1) + (2n + 1), puis mets en facteur ce qui est commun. | n² + 2n + 1
  pièges : g5_hered_wrong_term, g5_reindex_half, g5_telescope_ends

On montre par récurrence que Σ_{k=1}^{n} (2k − 1) = n² pour tout n ≥ 1. Hérédité : on suppose la formule vraie au rang n. Écris Σ_{k=1}^{n + 1} (2k − 1) jusqu'à la formule au rang n + 1, (n + 1)².
  [tap, suivre l'erreur, menu induction]  Σ_{k=1}^{n + 1} (2k − 1)
    = Σ_{k=1}^{n} (2k − 1) + (2n + 1)   ← Séparer le dernier terme (k = n + 1)
    = n² + 2n + 1   ← Hypothèse de récurrence
    = (n + 1)²   ← C'est la formule au rang n + 1
  aides : Sépare le terme k = n + 1, puis remplace la somme jusqu'à n par la formule supposée. | Σ_{k=1}^{n + 1} (2k − 1) = Σ_{k=1}^{n} (2k − 1) + (2n + 1), puis mets en facteur ce qui est commun. | n² + 2n + 1
  pièges : g5_hered_wrong_term, g5_reindex_half, g5_telescope_ends

```

### Niveau 4

```
Montre par récurrence que Σ_{k=1}^{n} k³ = (n(n + 1)/2)² pour tout n ≥ 1.
  [free, suivre l'erreur]  Σ_{k=1}^{1} k³
    (Initialisation : calcule Σ_{k=1}^{1} k³, puis compare avec la formule pour n = 1.)
    = 1   ← Initialisation : la formule donne aussi 1 pour n = 1
  — Hérédité : on suppose Σ_{k=1}^{n} k³ = (n(n + 1)/2)² pour un n ≥ 1. Écris la somme jusqu'à n + 1 jusqu'à ((n + 1)(n + 2)/2)².  [juge equiv]  départ : Σ_{k=1}^{n + 1} k³
    = Σ_{k=1}^{n} k³ + (n + 1)³   ← Séparer le dernier terme (k = n + 1)
    = (n(n + 1)/2)² + (n + 1)³   ← Hypothèse de récurrence
    = (n + 1)²(n² + 4n + 4)/4   ← Mettre en facteur
    = ((n + 1)(n + 2)/2)²   ← C'est la formule au rang n + 1
    (Conclusion : par récurrence, la formule est vraie pour tout n ≥ 1.)
  aides : Sépare le terme k = n + 1, puis remplace la somme jusqu'à n par la formule supposée. | Σ_{k=1}^{n + 1} k³ = Σ_{k=1}^{n} k³ + (n + 1)³, puis mets en facteur ce qui est commun. | (n + 1)²(n² + 4n + 4)/4
  pièges : g5_sum_product

Montre par récurrence que Σ_{k=1}^{n} k² = n(n + 1)(2n + 1)/6 pour tout n ≥ 1.
  [free, suivre l'erreur]  Σ_{k=1}^{1} k²
    (Initialisation : calcule Σ_{k=1}^{1} k², puis compare avec la formule pour n = 1.)
    = 1   ← Initialisation : la formule donne aussi 1 pour n = 1
  — Hérédité : on suppose Σ_{k=1}^{n} k² = n(n + 1)(2n + 1)/6 pour un n ≥ 1. Écris la somme jusqu'à n + 1 jusqu'à (n + 1)(n + 2)(2n + 3)/6.  [juge equiv]  départ : Σ_{k=1}^{n + 1} k²
    = Σ_{k=1}^{n} k² + (n + 1)²   ← Séparer le dernier terme (k = n + 1)
    = n(n + 1)(2n + 1)/6 + (n + 1)²   ← Hypothèse de récurrence
    = (n + 1)(2n² + 7n + 6)/6   ← Mettre en facteur
    = (n + 1)(n + 2)(2n + 3)/6   ← C'est la formule au rang n + 1
    (Conclusion : par récurrence, la formule est vraie pour tout n ≥ 1.)
  aides : Sépare le terme k = n + 1, puis remplace la somme jusqu'à n par la formule supposée. | Σ_{k=1}^{n + 1} k² = Σ_{k=1}^{n} k² + (n + 1)², puis mets en facteur ce qui est commun. | (n + 1)(2n² + 7n + 6)/6
  pièges : g5_sum_product

Montre par récurrence que Σ_{k=1}^{n} k² = n(n + 1)(2n + 1)/6 pour tout n ≥ 1.
  [free, suivre l'erreur]  Σ_{k=1}^{1} k²
    (Initialisation : calcule Σ_{k=1}^{1} k², puis compare avec la formule pour n = 1.)
    = 1   ← Initialisation : la formule donne aussi 1 pour n = 1
  — Hérédité : on suppose Σ_{k=1}^{n} k² = n(n + 1)(2n + 1)/6 pour un n ≥ 1. Écris la somme jusqu'à n + 1 jusqu'à (n + 1)(n + 2)(2n + 3)/6.  [juge equiv]  départ : Σ_{k=1}^{n + 1} k²
    = Σ_{k=1}^{n} k² + (n + 1)²   ← Séparer le dernier terme (k = n + 1)
    = n(n + 1)(2n + 1)/6 + (n + 1)²   ← Hypothèse de récurrence
    = (n + 1)(2n² + 7n + 6)/6   ← Mettre en facteur
    = (n + 1)(n + 2)(2n + 3)/6   ← C'est la formule au rang n + 1
    (Conclusion : par récurrence, la formule est vraie pour tout n ≥ 1.)
  aides : Sépare le terme k = n + 1, puis remplace la somme jusqu'à n par la formule supposée. | Σ_{k=1}^{n + 1} k² = Σ_{k=1}^{n} k² + (n + 1)², puis mets en facteur ce qui est commun. | (n + 1)(2n² + 7n + 6)/6
  pièges : g5_sum_product

```

### Niveau 5

```
Montre par récurrence que Σ_{k=1}^{n} k³ = (n(n + 1)/2)² pour tout n ≥ 1.
  [free, sans aide]  Σ_{k=1}^{1} k³
    (Initialisation : calcule Σ_{k=1}^{1} k³, puis compare avec la formule pour n = 1.)
    = 1   ← Initialisation : la formule donne aussi 1 pour n = 1
  — Hérédité : on suppose Σ_{k=1}^{n} k³ = (n(n + 1)/2)² pour un n ≥ 1. Écris la somme jusqu'à n + 1 jusqu'à ((n + 1)(n + 2)/2)².  [juge equiv]  départ : Σ_{k=1}^{n + 1} k³
    = Σ_{k=1}^{n} k³ + (n + 1)³   ← Séparer le dernier terme (k = n + 1)
    = (n(n + 1)/2)² + (n + 1)³   ← Hypothèse de récurrence
    = (n + 1)²(n² + 4n + 4)/4   ← Mettre en facteur
    = ((n + 1)(n + 2)/2)²   ← C'est la formule au rang n + 1
    (Conclusion : par récurrence, la formule est vraie pour tout n ≥ 1.)
  pièges : g5_sum_product

Montre par récurrence que Σ_{k=1}^{n} k² = n(n + 1)(2n + 1)/6 pour tout n ≥ 1.
  [free, sans aide]  Σ_{k=1}^{1} k²
    (Initialisation : calcule Σ_{k=1}^{1} k², puis compare avec la formule pour n = 1.)
    = 1   ← Initialisation : la formule donne aussi 1 pour n = 1
  — Hérédité : on suppose Σ_{k=1}^{n} k² = n(n + 1)(2n + 1)/6 pour un n ≥ 1. Écris la somme jusqu'à n + 1 jusqu'à (n + 1)(n + 2)(2n + 3)/6.  [juge equiv]  départ : Σ_{k=1}^{n + 1} k²
    = Σ_{k=1}^{n} k² + (n + 1)²   ← Séparer le dernier terme (k = n + 1)
    = n(n + 1)(2n + 1)/6 + (n + 1)²   ← Hypothèse de récurrence
    = (n + 1)(2n² + 7n + 6)/6   ← Mettre en facteur
    = (n + 1)(n + 2)(2n + 3)/6   ← C'est la formule au rang n + 1
    (Conclusion : par récurrence, la formule est vraie pour tout n ≥ 1.)
  pièges : g5_sum_product

Montre par récurrence que Σ_{k=1}^{n} 1/(k(k + 1)) = n/(n + 1) pour tout n ≥ 1.
  [free, sans aide]  Σ_{k=1}^{1} 1/(k(k + 1))
    (Initialisation : calcule Σ_{k=1}^{1} 1/(k(k + 1)), puis compare avec la formule pour n = 1.)
    = 1/2   ← Initialisation : la formule donne aussi 1/2 pour n = 1
  — Hérédité : on suppose Σ_{k=1}^{n} 1/(k(k + 1)) = n/(n + 1) pour un n ≥ 1. Écris la somme jusqu'à n + 1 jusqu'à (n + 1)/(n + 2).  [juge equiv]  départ : Σ_{k=1}^{n + 1} 1/(k(k + 1))
    = Σ_{k=1}^{n} 1/(k(k + 1)) + 1/((n + 1)(n + 2))   ← Séparer le dernier terme (k = n + 1)
    = n/(n + 1) + 1/((n + 1)(n + 2))   ← Hypothèse de récurrence
    = (n² + 2n + 1)/((n + 1)(n + 2))   ← Mettre en facteur
    = (n + 1)/(n + 2)   ← C'est la formule au rang n + 1
    (Conclusion : par récurrence, la formule est vraie pour tout n ≥ 1.)

```

### Variantes d'examen

```
Montre par récurrence que Σ_{k=1}^{n} 1/(k(k + 1)) = n/(n + 1) pour tout n ≥ 1.
  [free, sans aide, examen open]  Σ_{k=1}^{1} 1/(k(k + 1))
    (Initialisation : calcule Σ_{k=1}^{1} 1/(k(k + 1)), puis compare avec la formule pour n = 1.)
    = 1/2   ← Initialisation : la formule donne aussi 1/2 pour n = 1
  — Hérédité : on suppose Σ_{k=1}^{n} 1/(k(k + 1)) = n/(n + 1) pour un n ≥ 1. Écris la somme jusqu'à n + 1 jusqu'à (n + 1)/(n + 2).  [juge equiv]  départ : Σ_{k=1}^{n + 1} 1/(k(k + 1))
    = Σ_{k=1}^{n} 1/(k(k + 1)) + 1/((n + 1)(n + 2))   ← Séparer le dernier terme (k = n + 1)
    = n/(n + 1) + 1/((n + 1)(n + 2))   ← Hypothèse de récurrence
    = (n² + 2n + 1)/((n + 1)(n + 2))   ← Mettre en facteur
    = (n + 1)/(n + 2)   ← C'est la formule au rang n + 1
    (Conclusion : par récurrence, la formule est vraie pour tout n ≥ 1.)

```

## Récurrence : inégalités, divisibilité, suites et itérées (`g5-induction-more`, CMS)

_Majorer, écrire le rang n + 1 avec le rang n, composer._

### Niveau 1

```
Récurrence : u₀ = 1 et uₙ₊₁ = 2uₙ + 1 : uₙ = 2ⁿ⁺¹ − 1 pour tout n ≥ 0.Initialisation : u₀ = 1 = 2¹ − 1. ✓Hérédité : supposons uₙ = 2ⁿ⁺¹ − 1 pour un n ≥ 0.…= 2ⁿ⁺² − 1 : P(n + 1) est vraie.Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.Quelle ligne manque ?
  · Hérédité : supposons uₙ₊₁ = 2ⁿ⁺² − 1. [g5_induction_circular]   ✔ Alors uₙ₊₁ = 2uₙ + 1 = 2(2ⁿ⁺¹ − 1) + 1.
  pièges : g5_induction_circular

Récurrence : 2ⁿ ≥ 1 + n pour tout n ≥ 0 (Bernoulli).Initialisation : pour n = 0, 2⁰ = 1 ≥ 1 + 0. ✓Hérédité : supposons 2ⁿ ≥ 1 + n pour un n ≥ 0.…2 + 2n ≥ 2 + n = 1 + (n + 1) : P(n + 1) est vraie.Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.Quelle ligne manque ?
  · Hérédité : supposons 2ⁿ⁺¹ ≥ 1 + (n + 1). [g5_induction_circular]   ✔ Alors 2ⁿ⁺¹ = 2·2ⁿ ≥ 2(1 + n) = 2 + 2n.
  pièges : g5_induction_circular

Récurrence : n! ≥ 2ⁿ⁻¹ pour tout n ≥ 1.Initialisation : pour n = 1, 1! = 1 ≥ 2⁰ = 1. ✓Hérédité : supposons n! ≥ 2ⁿ⁻¹ pour un n ≥ 1.…Comme n + 1 ≥ 2 : (n + 1)·2ⁿ⁻¹ ≥ 2·2ⁿ⁻¹ = 2ⁿ : P(n + 1) est vraie.Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.Quelle ligne manque ?
  ✔ Alors (n + 1)! = (n + 1)·n! ≥ (n + 1)·2ⁿ⁻¹.   · Hérédité : supposons (n + 1)! ≥ 2ⁿ. [g5_induction_circular]
  pièges : g5_induction_circular

```

### Niveau 2

```
Récurrence : f(x) = x³, f₁ = f et fₙ₊₁ = f ∘ fₙ : fₙ(x) = x^(3ⁿ) pour tout n ≥ 1 et tout x > 0.Initialisation : f₁(x) = x³ = x^(3¹). ✓Hérédité : supposons fₙ(x) = x^(3ⁿ) pour un n ≥ 1.…(x^(3ⁿ))³ = x^(3·3ⁿ) = x^(3ⁿ⁺¹) : P(n + 1) est vraie.Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.Quelle ligne manque ?
  ✔ Alors fₙ₊₁(x) = f(fₙ(x)) = (x^(3ⁿ))³.   · Alors fₙ₊₁(x) = f(fₙ(x)) = x^(3ⁿ + 3).   · Hérédité : supposons fₙ₊₁(x) = x^(3ⁿ⁺¹). [g5_induction_circular]
  pièges : g5_induction_circular

Récurrence : 3ⁿ ≥ 1 + 2n pour tout n ≥ 0 (Bernoulli).Initialisation : pour n = 0, 3⁰ = 1 ≥ 1 + 0. ✓Hérédité : supposons 3ⁿ ≥ 1 + 2n pour un n ≥ 0.…3 + 6n ≥ 3 + 2n = 1 + 2(n + 1) : P(n + 1) est vraie.Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.Quelle ligne manque ?
  · Hérédité : supposons 3ⁿ⁺¹ ≥ 1 + 2(n + 1). [g5_induction_circular]   ✔ Alors 3ⁿ⁺¹ = 3·3ⁿ ≥ 3(1 + 2n) = 3 + 6n.   · Alors 3ⁿ⁺¹ = 3ⁿ + 3 ≥ 1 + 2n + 3.
  pièges : g5_induction_circular

Récurrence : n! ≥ 2ⁿ⁻¹ pour tout n ≥ 1.Initialisation : pour n = 1, 1! = 1 ≥ 2⁰ = 1. ✓Hérédité : supposons n! ≥ 2ⁿ⁻¹ pour un n ≥ 1.…Comme n + 1 ≥ 2 : (n + 1)·2ⁿ⁻¹ ≥ 2·2ⁿ⁻¹ = 2ⁿ : P(n + 1) est vraie.Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.Quelle ligne manque ?
  ✔ Alors (n + 1)! = (n + 1)·n! ≥ (n + 1)·2ⁿ⁻¹.   · Hérédité : supposons (n + 1)! ≥ 2ⁿ. [g5_induction_circular]   · Alors (n + 1)! = n! + 1 ≥ 2ⁿ⁻¹ + 1.
  pièges : g5_induction_circular

```

### Niveau 3

```
Montre par récurrence : 2ⁿ ≥ 1 + n pour tout n ≥ 0 (Bernoulli). Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Quel outil pour l'hérédité ? ✔ Majorer ou minorer avec l'hypothèse / · Écrire le rang n + 1 avec le rang n / · Composer : fₙ₊₁ = f ∘ fₙ
    1. Initialisation : pour n = 0, 2⁰ = 1 ≥ 1 + 0. ✓
    2. Hérédité : supposons 2ⁿ ≥ 1 + n pour un n ≥ 0.
    3. Alors 2ⁿ⁺¹ = 2·2ⁿ ≥ 2(1 + n) = 2 + 2n.
    4. 2 + 2n ≥ 2 + n = 1 + (n + 1) : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
    ✗ Hérédité : supposons 2ⁿ⁺¹ ≥ 1 + (n + 1). [g5_induction_circular]
  pièges : g5_induction_no_base, g5_induction_circular

Montre par récurrence : n! ≥ 2ⁿ⁻¹ pour tout n ≥ 1. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Quel outil pour l'hérédité ? ✔ Majorer ou minorer avec l'hypothèse / · Écrire le rang n + 1 avec le rang n / · Composer : fₙ₊₁ = f ∘ fₙ
    1. Initialisation : pour n = 1, 1! = 1 ≥ 2⁰ = 1. ✓
    2. Hérédité : supposons n! ≥ 2ⁿ⁻¹ pour un n ≥ 1.
    3. Alors (n + 1)! = (n + 1)·n! ≥ (n + 1)·2ⁿ⁻¹.
    4. Comme n + 1 ≥ 2 : (n + 1)·2ⁿ⁻¹ ≥ 2·2ⁿ⁻¹ = 2ⁿ : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
    ✗ Hérédité : supposons (n + 1)! ≥ 2ⁿ. [g5_induction_circular]
  pièges : g5_induction_no_base, g5_induction_circular

Montre par récurrence : 3ⁿ ≥ 1 + 2n pour tout n ≥ 0 (Bernoulli). Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Quel outil pour l'hérédité ? ✔ Majorer ou minorer avec l'hypothèse / · Écrire le rang n + 1 avec le rang n / · Composer : fₙ₊₁ = f ∘ fₙ
    1. Initialisation : pour n = 0, 3⁰ = 1 ≥ 1 + 0. ✓
    2. Hérédité : supposons 3ⁿ ≥ 1 + 2n pour un n ≥ 0.
    3. Alors 3ⁿ⁺¹ = 3·3ⁿ ≥ 3(1 + 2n) = 3 + 6n.
    4. 3 + 6n ≥ 3 + 2n = 1 + 2(n + 1) : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
    ✗ Hérédité : supposons 3ⁿ⁺¹ ≥ 1 + 2(n + 1). [g5_induction_circular]
  pièges : g5_induction_no_base, g5_induction_circular

```

### Niveau 4

```
Montre par récurrence : 3ⁿ ≥ 1 + 2n pour tout n ≥ 0 (Bernoulli). Touche les blocs dans l'ordre de la preuve et complète le calcul.
  [blocs frame]
    1. Initialisation : pour n = 0, 3⁰ = 1 ≥ 1 + 0. ✓
    2. Hérédité : supposons 3ⁿ ≥ 1 + 2n pour un n ≥ 0.
    3. Alors 3ⁿ⁺¹ = 3·3ⁿ ≥ 3(1 + 2n) = 3 + 6n.   [à écrire : 3(1 + 2n) = 3+6n]
    4. 3 + 6n ≥ 3 + 2n = 1 + 2(n + 1) : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.
    ✗ C'est vrai pour n = 0, 1 et 2, donc pour tout n. [g9_proof_by_example]
    ✗ Hérédité : supposons 3ⁿ⁺¹ ≥ 1 + 2(n + 1). [g5_induction_circular]
  pièges : g9_proof_by_example, g5_induction_circular

Montre par récurrence : n³ − n est divisible par 6 pour tout n ≥ 0. Touche les blocs dans l'ordre de la preuve et complète le calcul.
  [blocs frame]
    1. Initialisation : pour n = 0, 0³ − 0 = 0 = 6·0. ✓
    2. Hérédité : supposons n³ − n = 6m, avec m entier, pour un n ≥ 0.
    3. Alors (n + 1)³ − (n + 1) = n³ − n + 3n(n + 1).   [à écrire : (n + 1)³ − (n + 1) = (écris-le avec n³ − n) n^3-n+3n(n+1)]
    4. n(n + 1) est pair, donc 3n(n + 1) = 6p ; (n + 1)³ − (n + 1) = 6(m + p) : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.
    ✗ C'est vrai pour n = 0, 1 et 2, donc pour tout n. [g9_proof_by_example]
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
  pièges : g9_proof_by_example, g5_induction_no_base

Montre par récurrence : n! ≥ 2ⁿ⁻¹ pour tout n ≥ 1. Touche les blocs dans l'ordre de la preuve et complète le calcul.
  [blocs frame]
    1. Initialisation : pour n = 1, 1! = 1 ≥ 2⁰ = 1. ✓
    2. Hérédité : supposons n! ≥ 2ⁿ⁻¹ pour un n ≥ 1.
    3. Alors (n + 1)! = (n + 1)·n! ≥ (n + 1)·2ⁿ⁻¹.
    4. Comme n + 1 ≥ 2 : (n + 1)·2ⁿ⁻¹ ≥ 2·2ⁿ⁻¹ = 2ⁿ : P(n + 1) est vraie.   [à écrire : 2·2ⁿ⁻¹ = 2^n]
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.
    ✗ C'est vrai pour n = 1, 2 et 3, donc pour tout n. [g9_proof_by_example]
    ✗ Hérédité : supposons (n + 1)! ≥ 2ⁿ. [g5_induction_circular]
  pièges : g9_proof_by_example, g5_induction_circular

```

### Niveau 5

```
Montre par récurrence : 4ⁿ − 1 est divisible par 3 pour tout n ≥ 0. Touche les blocs dans l'ordre de la preuve et complète le calcul.
  [blocs frame, sans aide]
    1. Initialisation : pour n = 0, 4⁰ − 1 = 0 = 3·0. ✓
    2. Hérédité : supposons 4ⁿ − 1 = 3m, avec m entier, pour un n ≥ 0.
    3. Alors 4ⁿ⁺¹ − 1 = 4(4ⁿ − 1) + 3.   [à écrire : 4ⁿ⁺¹ − 1 = (écris-le avec 4ⁿ − 1) 4(4^n-1)+3]
    4. = 4·3m + 3 = 3(4m + 1) : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.
    ✗ C'est vrai pour n = 0, 1 et 2, donc pour tout n. [g9_proof_by_example]
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
    ✗ Hérédité : supposons 4ⁿ⁺¹ − 1 divisible par 3. [g5_induction_circular]
  pièges : g9_proof_by_example, g5_induction_no_base, g5_induction_circular

Montre par récurrence : u₀ = 1 et uₙ₊₁ = 2uₙ + 1 : uₙ = 2ⁿ⁺¹ − 1 pour tout n ≥ 0. Touche les blocs dans l'ordre de la preuve et complète le calcul.
  [blocs frame, sans aide]
    1. Initialisation : u₀ = 1 = 2¹ − 1. ✓
    2. Hérédité : supposons uₙ = 2ⁿ⁺¹ − 1 pour un n ≥ 0.
    3. Alors uₙ₊₁ = 2uₙ + 1 = 2(2ⁿ⁺¹ − 1) + 1.   [à écrire : 2(2ⁿ⁺¹ − 1) + 1 = 2^(n+2)-1]
    4. = 2ⁿ⁺² − 1 : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 0.
    ✗ Hérédité : supposons uₙ₊₁ = 2ⁿ⁺² − 1. [g5_induction_circular]
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
    ✗ C'est vrai pour n = 0, 1 et 2, donc pour tout n. [g9_proof_by_example]
  pièges : g5_induction_circular, g5_induction_no_base, g9_proof_by_example

Montre par récurrence : f(x) = 3x + 2, f₁ = f et fₙ₊₁ = f ∘ fₙ : fₙ(x) = 3ⁿx + 3ⁿ − 1 pour tout n ≥ 1. Touche les blocs dans l'ordre de la preuve et complète le calcul.
  [blocs frame, sans aide]
    1. Initialisation : f₁(x) = 3x + 2 = 3¹x + 3¹ − 1. ✓
    2. Hérédité : supposons fₙ(x) = 3ⁿx + 3ⁿ − 1 pour un n ≥ 1.
    3. Alors fₙ₊₁(x) = f(fₙ(x)) = 3(3ⁿx + 3ⁿ − 1) + 2.   [à écrire : f(fₙ(x)) = 3(3ⁿx + 3ⁿ − 1) + 2 = 3^(n+1)×x+3^(n+1)-1]
    4. = 3ⁿ⁺¹x + 3ⁿ⁺¹ − 1 : P(n + 1) est vraie.
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.
    ✗ Hérédité : supposons fₙ₊₁(x) = 3ⁿ⁺¹x + 3ⁿ⁺¹ − 1. [g5_induction_circular]
    ✗ C'est vrai pour n = 1, 2 et 3, donc pour tout n. [g9_proof_by_example]
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
  pièges : g5_induction_circular, g9_proof_by_example, g5_induction_no_base

```

### Variantes d'examen

```
Montre par récurrence : f(x) = x², f₁ = f et fₙ₊₁ = f ∘ fₙ : fₙ(x) = x^(2ⁿ) pour tout n ≥ 1 et tout x > 0. Touche les blocs dans l'ordre de la preuve et complète le calcul.
  [blocs frame, sans aide]
    1. Initialisation : f₁(x) = x² = x^(2¹). ✓
    2. Hérédité : supposons fₙ(x) = x^(2ⁿ) pour un n ≥ 1.
    3. Alors fₙ₊₁(x) = f(fₙ(x)) = (x^(2ⁿ))².
    4. (x^(2ⁿ))² = x^(2·2ⁿ) = x^(2ⁿ⁺¹) : P(n + 1) est vraie.   [à écrire : (x^(2ⁿ))² = x^(2^(n+1))]
    5. Conclusion : par récurrence, P(n) est vraie pour tout n ≥ 1.
    ✗ C'est vrai pour n = 1, 2 et 3, donc pour tout n. [g9_proof_by_example]
    ✗ L'hérédité suffit : P(n) est donc vraie pour tout n, sans initialisation. [g5_induction_no_base]
    ✗ Hérédité : supposons fₙ₊₁(x) = x^(2ⁿ⁺¹). [g5_induction_circular]
  [examen open]
  pièges : g9_proof_by_example, g5_induction_no_base, g5_induction_circular

Vrai ou faux ?
  « Si P(n) ⇒ P(n + 1) pour tout n ≥ 0, alors P(n) est vraie pour tout n ≥ 0. » → FAUX
    contre-exemple (heredity) : P = n>n+1
  [examen tf]
  pièges : g5_induction_no_base

```

## Pièges de cette unité

- **Nombre de termes faux d'une somme** (`g5_count_terms`, E) : Σ_{k=1}^{20} 2 = 2·19 au lieu de Σ_{k=1}^{20} 2 = 2·20
- **Σ distribuée sur un produit ou un carré** (`g5_sum_product`, E) : Σ k² = (Σ k)² au lieu de Σ k² = n(n + 1)(2n + 1)/6
- **Dernier terme de la somme jusqu'à n + 1 mal séparé** (`g5_hered_wrong_term`, E) : Σ_{k=1}^{n+1} k(k + 1) = Σ_{k=1}^{n} k(k + 1) + n(n + 1) au lieu de Σ_{k=1}^{n} k(k + 1) + (n + 1)(n + 2)
- **Changement d'indice à moitié fait** (`g5_reindex_half`, E) : Σ_{k=2}^{n+1} (k − 1)² = Σ_{j=2}^{n+1} j² au lieu de Σ_{j=1}^{n} j²
- **Mauvais termes gardés après un télescopage** (`g5_telescope_ends`, E) : Σ_{k=1}^{n} (1/k − 1/(k + 1)) = 1 − 1/n au lieu de 1 − 1/(n + 1)
- **Somme arithmétique sans le /2, ou n au lieu de n − 1** (`g5_arith_half`, E) : S = 20·(3 + 79) = 1640 au lieu de S = 20·(3 + 79)/2 = 820
- **Exposant décalé dans la somme géométrique** (`g5_geom_offset`, E) : 5 + 10 + … + 5·2⁵ = 5(2⁷ − 1) au lieu de 5(2⁶ − 1) = 315
- **Récurrence : on suppose ce qu'on veut montrer** (`g5_induction_circular`, E) : Supposons P(n + 1). au lieu de Supposons P(n), montrons P(n + 1).
- **Récurrence sans initialisation** (`g5_induction_no_base`, E) : L'hérédité suffit. au lieu de Initialisation, puis hérédité.
